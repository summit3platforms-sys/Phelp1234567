import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/admin", "/admin/:path*", "/((?!api|_next/static|_next/image|favicon.ico|icon.png|logo.png|robots.txt|sitemap).*)"],
};

// SHA-256 hash of "Simple@#123"
const ADMIN_PASSWORD_HASH =
  "8e00642239f719bfd7c72b5d895e765287c6cb24f04ec6e04ed5b1b75c5a6511";

// SHA-256 via Web Crypto API (available in Edge runtime)
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// In-memory redirect cache (populated on first request, refreshed every 5 minutes)
let redirectCache: Map<string, string> | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

async function getRedirects(): Promise<Map<string, string>> {
  const now = Date.now();
  if (redirectCache && (now - cacheTimestamp) < CACHE_TTL_MS) {
    return redirectCache;
  }

  try {
    // Fetch redirects from the database via an internal API-like fetch
    // Since middleware runs at the edge, we use fetch to our own API
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      redirectCache = new Map();
      cacheTimestamp = now;
      return redirectCache;
    }

    // Use Supabase REST API to query redirects table directly
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const res = await fetch(`${supabaseUrl}/rest/v1/Redirect?select=oldUrl,newUrl`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
      });

      if (res.ok) {
        const rows: { oldUrl: string; newUrl: string }[] = await res.json();
        redirectCache = new Map(rows.map(r => [r.oldUrl, r.newUrl]));
      } else {
        redirectCache = new Map();
      }
    } else {
      redirectCache = new Map();
    }

    cacheTimestamp = now;
    return redirectCache;
  } catch {
    redirectCache = redirectCache || new Map();
    return redirectCache;
  }
}

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // --- Admin Basic Auth ---
  if (pathname.startsWith("/admin")) {
    const authHeader = req.headers.get("authorization");

    if (authHeader && authHeader.startsWith("Basic ")) {
      const base64 = authHeader.slice(6);
      const decoded = atob(base64);
      const colonIndex = decoded.indexOf(":");
      if (colonIndex !== -1) {
        const password = decoded.slice(colonIndex + 1);
        const hash = await sha256(password);
        if (hash === ADMIN_PASSWORD_HASH) {
          return NextResponse.next();
        }
      }
    }

    return new NextResponse("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Admin Panel", charset="UTF-8"',
      },
    });
  }

  // --- Global Redirect Handling (moved from individual page components) ---
  const redirects = await getRedirects();
  const target = redirects.get(pathname);
  if (target) {
    return NextResponse.redirect(new URL(target, req.url), 301);
  }

  return NextResponse.next();
}
