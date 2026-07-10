import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/admin", "/admin/:path*"],
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

export default async function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (authHeader && authHeader.startsWith("Basic ")) {
    const base64 = authHeader.slice(6);
    const decoded = atob(base64);
    // decoded format: "username:password"
    const colonIndex = decoded.indexOf(":");
    if (colonIndex !== -1) {
      const password = decoded.slice(colonIndex + 1);
      const hash = await sha256(password);
      if (hash === ADMIN_PASSWORD_HASH) {
        return NextResponse.next();
      }
    }
  }

  // Return 401 to trigger the browser's native Basic Auth dialog
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Panel", charset="UTF-8"',
    },
  });
}
