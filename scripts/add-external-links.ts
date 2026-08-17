import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─── Verified External URLs ────────────────────────────────────────────────────
// hp.com/learn/ds                              ✅ Verified live (HP's own docs)
// support.google.com/accounts/answer/185833    ✅ Verified live (App Passwords)
// support.google.com/android/answer/9075925   ✅ Verified live (Bluetooth setup)
// support.apple.com/en-us/102509              ✅ Verified live (Private Wi-Fi Address)
// support.apple.com/kb/dl999                  ✅ Verified live (Bonjour for Windows)
// support.apple.com/en-us/HT201311            ✅ Verified live (AirPrint)
// support.google.com/chromebook/answer/7225252 ✅ Verified live (ChromeOS printing)
// support.microsoft.com/en-us/windows/windows-update-faq-8a903416-6f45-0718-f5c7-375e92dddeb2  ✅ Verified live
// www.color.org/index.xalter                  ✅ Verified live (ICC)
// www.cloudflare.com/learning/network-layer/what-is-dhcp/  ✅ Confirmed via search (403 to crawlers = bot protection, page live)

// ─── Helper ───────────────────────────────────────────────────────────────────
function injectLink(
  content: string,
  searchText: string,
  anchorText: string,
  href: string
): { content: string; injected: boolean } {
  if (content.includes(href)) {
    return { content, injected: false }; // already has this link
  }
  // Find the search text and wrap the anchorText portion within it as a link
  const linkHtml = `<a href="${href}" target="_blank" rel="noopener noreferrer">${anchorText}</a>`;
  if (content.includes(anchorText)) {
    const updated = content.replace(anchorText, linkHtml);
    return { content: updated, injected: updated !== content };
  }
  return { content, injected: false };
}

// ─── Link Definitions ─────────────────────────────────────────────────────────
// Anchor text strings are matched exactly against article content
const linkJobs: Array<{
  slugs: string[];
  anchorText: string;
  href: string;
  description: string;
}> = [
  // 1a. Dynamic Security — DeskJet 2755e (uses "Dynamic Security" many times; target the FAQ heading phrase)
  {
    slugs: ['hp-deskjet-2755e-cartridge-not-recognized'],
    anchorText: 'What is Dynamic Security and why does it matter here?',
    href: 'https://hp.com/learn/ds',
    description: "HP Dynamic Security policy page — DeskJet 2755e FAQ",
  },

  // 1b. Dynamic Security — Third-party ink blocked article
  {
    slugs: ['hp-plus-third-party-ink-blocked-after-update'],
    anchorText: 'HP+ printers run Dynamic Security, a firmware-level system',
    href: 'https://hp.com/learn/ds',
    description: "HP Dynamic Security policy page — third-party ink article",
  },

  // 2. Google App Passwords — Gmail setup (inject into Step 2 heading or key phrase)
  {
    slugs: ['hp-printer-scan-to-email-gmail-setup'],
    anchorText: 'Step 2: Generate a Gmail App Password',
    href: 'https://support.google.com/accounts/answer/185833',
    description: "Google App Passwords documentation",
  },

  // 3. Apple Private Wi-Fi Address — Envy 5055 offline (DHCP reservation sentence)
  {
    slugs: ['hp-envy-5055-offline-but-connected'],
    anchorText: 'consider setting a DHCP reservation for the printer',
    href: 'https://support.apple.com/en-us/102509',
    description: "Apple Private Wi-Fi Address — Envy 5055",
  },

  // 4. Apple Bonjour Print Services — HP Smart App stuck
  {
    slugs: ['hp-smart-app-stuck-searching-for-printer'],
    anchorText: 'Fix 5: Check for Bonjour Print Services on Windows',
    href: 'https://support.apple.com/kb/dl999',
    description: "Apple Bonjour Print Services for Windows",
  },

  // 5. ChromeOS printing guide — Chromebook article
  {
    slugs: ['hp-printer-wont-print-from-chromebook-2026'],
    anchorText: 'printing system built directly into ChromeOS',
    href: 'https://support.google.com/chromebook/answer/7225252',
    description: "Google ChromeOS printing setup guide",
  },

  // 6. Apple AirPrint — macOS Sequoia (uses "AirPrint" many times; target precise sentence)
  {
    slugs: ['hp-printer-not-showing-up-on-macos-sequoia'],
    anchorText: 'through its own built-in AirPrint and Bonjour support instead',
    href: 'https://support.apple.com/en-us/HT201311',
    description: "Apple AirPrint support page",
  },

  // 7. Microsoft Windows Update — driver missing article
  {
    slugs: ['hp-printer-driver-missing-after-windows-update'],
    anchorText: 'Windows updates and printer drivers have a genuinely complicated relationship',
    href: 'https://support.microsoft.com/en-us/windows/windows-update-faq-8a903416-6f45-0718-f5c7-375e92dddeb2',
    description: "Microsoft Windows Update documentation",
  },

  // 8. DHCP reservation — Static IP guide
  {
    slugs: ['hp-printer-static-ip-setup-guide'],
    anchorText: 'Most people should use a DHCP reservation, not a true static',
    href: 'https://www.cloudflare.com/learning/network-layer/what-is-dhcp/',
    description: "Cloudflare DHCP explainer",
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
async function addExternalLinks() {
  let totalUpdated = 0;
  let totalSkipped = 0;
  let totalNotFound = 0;

  for (const job of linkJobs) {
    for (const slug of job.slugs) {
      const article = await prisma.article.findUnique({
        where: { slug },
        select: { id: true, title: true, content: true },
      });

      if (!article) {
        console.log(`⚠️  Article not found: ${slug}`);
        totalNotFound++;
        continue;
      }

      if (!article.content) {
        console.log(`⚠️  No content in: ${slug}`);
        totalSkipped++;
        continue;
      }

      const { content: newContent, injected } = injectLink(
        article.content,
        job.anchorText,
        job.anchorText,
        job.href
      );

      if (!injected) {
        console.log(`⏭️  Skipped (anchor not found or link already present): ${slug} → "${job.anchorText}"`);
        totalSkipped++;
        continue;
      }

      await prisma.article.update({
        where: { slug },
        data: { content: newContent },
      });

      console.log(`✅ Linked [${job.description}] in: ${slug}`);
      totalUpdated++;
    }
  }

  console.log(`\n📊 Done! Updated: ${totalUpdated} | Skipped: ${totalSkipped} | Not found: ${totalNotFound}`);
}

addExternalLinks()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
