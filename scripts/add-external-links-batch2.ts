import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─── Verified URLs ─────────────────────────────────────────────────────────────
// support.apple.com/en-us/102509           ✅ Apple Private Wi-Fi Address
// support.apple.com/en-us/HT201311         ✅ Apple AirPrint
// support.apple.com/kb/dl999              ✅ Apple Bonjour Print Services for Windows
// support.google.com/chromebook/answer/7225252  ✅ ChromeOS printing setup
// support.google.com/accounts/answer/185833     ✅ Google App Passwords
// support.google.com/android/answer/9075925     ✅ Android Bluetooth setup
// support.microsoft.com/en-us/windows/windows-update-faq-8a903416-6f45-0718-f5c7-375e92dddeb2  ✅ Windows Update FAQ
// support.microsoft.com/en-us/windows/get-the-latest-windows-update-7d20e88c-0568-483a-37bc-c3885390d212  ✅ Get latest Windows Update
// hp.com/learn/ds                          ✅ HP Dynamic Security
// hp.com/us-en/printers/instant-ink.html   ✅ HP Instant Ink
// www.cloudflare.com/learning/network-layer/what-is-dhcp/  ✅ Cloudflare DHCP
// www.color.org/index.xalter              ✅ ICC International Color Consortium

interface PatchJob {
  slug: string;
  // rawSearch: exact substring to find in raw HTML content
  rawSearch: string;
  // replacement: full replacement HTML for the rawSearch substring
  replacement: string;
  description: string;
}

const jobs: PatchJob[] = [
  // ── Dynamic Security: 0xC4EB827F article ──────────────────────────────────
  {
    slug: 'hp-printer-error-0xc4eb827f-ink-system-failure-fix',
    rawSearch: "Consider Dynamic Security if you're using third-party or refilled cartridges",
    replacement: `Consider <a href="https://hp.com/learn/ds" target="_blank" rel="noopener noreferrer">Dynamic Security</a> if you're using third-party or refilled cartridges`,
    description: 'HP Dynamic Security → 0xC4EB827F article',
  },

  // ── HP Instant Ink articles ────────────────────────────────────────────────
  {
    slug: 'instant-ink-cartridge-shows-empty-but-full',
    rawSearch: 'Check your Instant Ink account status for billing or enrollment issues.',
    replacement: `Check your <a href="https://www.hp.com/us-en/printers/instant-ink.html" target="_blank" rel="noopener noreferrer">Instant Ink</a> account status for billing or enrollment issues.`,
    description: 'HP Instant Ink → instant-ink-cartridge-shows-empty-but-full',
  },
  {
    slug: 'uninstall-hp-smart-app-without-breaking-printer',
    rawSearch: 'Do I lose Instant Ink if I uninstall the app?',
    replacement: `Do I lose <a href="https://www.hp.com/us-en/printers/instant-ink.html" target="_blank" rel="noopener noreferrer">Instant Ink</a> if I uninstall the app?`,
    description: 'HP Instant Ink → uninstall-hp-smart-app article',
  },

  // ── DHCP: Disconnecting from Wi-Fi ────────────────────────────────────────
  {
    slug: 'hp-printer-keeps-disconnecting-from-wifi',
    rawSearch: "Give the printer a fixed spot in your router's DHCP so its address never gets reassigned mid-print.",
    replacement: `Give the printer a fixed spot in your router's <a href="https://www.cloudflare.com/learning/network-layer/what-is-dhcp/" target="_blank" rel="noopener noreferrer">DHCP</a> so its address never gets reassigned mid-print.`,
    description: 'Cloudflare DHCP → hp-printer-keeps-disconnecting-from-wifi',
  },

  // ── mDNS/Bonjour: Two devices on network ──────────────────────────────────
  {
    slug: 'hp-printer-showing-two-devices-network',
    rawSearch: 'through discovery protocols like mDNS/Bonjour',
    replacement: `through discovery protocols like <a href="https://support.apple.com/kb/dl999" target="_blank" rel="noopener noreferrer">mDNS/Bonjour</a>`,
    description: 'Apple Bonjour → hp-printer-showing-two-devices-network',
  },

  // ── DHCP: Two devices (same article, 2nd link on different concept) ───────
  {
    slug: 'hp-printer-showing-two-devices-network',
    rawSearch: 'Fix 4: Set Up a DHCP Reservation',
    replacement: `Fix 4: Set Up a <a href="https://www.cloudflare.com/learning/network-layer/what-is-dhcp/" target="_blank" rel="noopener noreferrer">DHCP Reservation</a>`,
    description: 'Cloudflare DHCP → hp-printer-showing-two-devices-network',
  },

  // ── Windows 11 network Private profile ────────────────────────────────────
  {
    slug: 'hp-smart-app-cant-find-printer-windows-11',
    rawSearch: "Fix 3: Set Your Network to Private (My Uncommon Tip)",
    replacement: `Fix 3: Set Your Network to Private (My Uncommon Tip)`,
    description: 'SKIP — no good authoritative primary source for Windows network profile',
  },

  // ── Windows Update: HP Smart App can't find printer ───────────────────────
  {
    slug: 'hp-smart-app-cant-find-printer-windows-11',
    rawSearch: 'Why did this suddenly start happening after a Windows update?',
    replacement: `Why did this suddenly start happening after a <a href="https://support.microsoft.com/en-us/windows/windows-update-faq-8a903416-6f45-0718-f5c7-375e92dddeb2" target="_blank" rel="noopener noreferrer">Windows update</a>?`,
    description: 'Microsoft Windows Update FAQ → hp-smart-app-cant-find-printer-windows-11',
  },

  // ── Windows Update: HP Smart App Scan to PC ───────────────────────────────
  {
    slug: 'hp-smart-app-scan-to-pc-not-showing',
    rawSearch: 'can corrupt over time, particularly across major Windows updates',
    replacement: `can corrupt over time, particularly across major <a href="https://support.microsoft.com/en-us/windows/get-the-latest-windows-update-7d20e88c-0568-483a-37bc-c3885390d212" target="_blank" rel="noopener noreferrer">Windows updates</a>`,
    description: 'Microsoft Windows Update → hp-smart-app-scan-to-pc-not-showing',
  },

  // ── Apple Private Wi-Fi: HP Smart App can't find ──────────────────────────
  {
    slug: 'hp-smart-app-cant-find-printer-windows-11',
    rawSearch: "Set your network to Private — the buried Windows 11 setting that blocks discov",
    replacement: `Set your network to Private — the buried Windows 11 setting that blocks discov`,
    description: 'SKIP — Windows 11 network profile, not Apple private Wi-Fi',
  },

  // ── HP Error 79: PCL driver ────────────────────────────────────────────────
  {
    slug: 'hp-printer-error-79-service-error-real-fix',
    rawSearch: 'Replace it with the genuine HP PCL-6 (v4) driver, or HP Universal Print Drive',
    replacement: `Replace it with the genuine HP PCL-6 (v4) driver, or HP Universal Print Drive`,
    description: 'SKIP — HP driver download page, no permanent stable deep link',
  },

  // ── AirPrint: Munbyn not showing on Mac ───────────────────────────────────
  {
    slug: 'munbyn-printer-not-showing-up-on-mac',
    rawSearch: 'macOS loves to default to AirPrint or a generic PostScript driver',
    replacement: `macOS loves to default to <a href="https://support.apple.com/en-us/HT201311" target="_blank" rel="noopener noreferrer">AirPrint</a> or a generic PostScript driver`,
    description: 'Apple AirPrint → munbyn-printer-not-showing-up-on-mac',
  },

  // ── AirPrint: Munbyn not connecting to iPhone ─────────────────────────────
  {
    slug: 'munbyn-printer-not-connecting-to-iphone',
    rawSearch: "or it's a Wi-Fi/AirPrint model like the RW402 family",
    replacement: `or it's a Wi-Fi/<a href="https://support.apple.com/en-us/HT201311" target="_blank" rel="noopener noreferrer">AirPrint</a> model like the RW402 family`,
    description: 'Apple AirPrint → munbyn-printer-not-connecting-to-iphone',
  },

  // ── ChromeOS printing: Munbyn Chromebook extension ────────────────────────
  {
    slug: 'munbyn-chromebook-extension-not-printing',
    rawSearch: "Try the native ChromeOS print path as a fallback.",
    replacement: `Try the native <a href="https://support.google.com/chromebook/answer/7225252" target="_blank" rel="noopener noreferrer">ChromeOS print path</a> as a fallback.`,
    description: 'Google ChromeOS printing → munbyn-chromebook-extension-not-printing',
  },

  // ── ChromeOS printing: Munbyn ITPP941 ─────────────────────────────────────
  {
    slug: 'munbyn-itpp941-troubleshooting',
    rawSearch: "If printing stops after a ChromeOS update, remove the extension and reinstall it",
    replacement: `If printing stops after a <a href="https://support.google.com/chromebook/answer/7225252" target="_blank" rel="noopener noreferrer">ChromeOS</a> update, remove the extension and reinstall it`,
    description: 'Google ChromeOS printing → munbyn-itpp941-troubleshooting',
  },

  // ── ChromeOS: Munbyn stopped after Chromebook update ─────────────────────
  {
    slug: 'munbyn-printer-stopped-working-after-chromebook-update',
    rawSearch: 'ChromeOS updates have a habit of resetting or breaking printer confi',
    replacement: `<a href="https://support.google.com/chromebook/answer/7225252" target="_blank" rel="noopener noreferrer">ChromeOS</a> updates have a habit of resetting or breaking printer confi`,
    description: 'Google ChromeOS printing → munbyn-printer-stopped-working-after-chromebook-update',
  },

  // ── Munbyn Windows Update driver ──────────────────────────────────────────
  {
    slug: 'munbyn-printer-driver-wont-install-windows',
    rawSearch: 'pulls more from Windows Update on demand',
    replacement: `pulls more from <a href="https://support.microsoft.com/en-us/windows/get-the-latest-windows-update-7d20e88c-0568-483a-37bc-c3885390d212" target="_blank" rel="noopener noreferrer">Windows Update</a> on demand`,
    description: 'Microsoft Windows Update → munbyn-printer-driver-wont-install-windows',
  },

  // ── HP Wireless Direct: Apple Private Wi-Fi  ──────────────────────────────
  {
    slug: 'hp-wireless-direct-not-appearing-on-phone',
    rawSearch: 'Confirm Wireless Direct is actually enabled on the printer itself.',
    replacement: `Confirm <a href="https://support.apple.com/en-us/102509" target="_blank" rel="noopener noreferrer">Wireless Direct</a> is actually enabled on the printer itself.`,
    description: 'SKIP — Wireless Direct is HP-specific, not Apple',
  },

  // ── Munbyn Bluetooth: Android docs ────────────────────────────────────────
  {
    slug: 'munbyn-p44s-bluetooth-pairing-problem',
    rawSearch: 'Bluetooth on phones has quietly gotten more complicated',
    replacement: `<a href="https://support.google.com/android/answer/9075925" target="_blank" rel="noopener noreferrer">Bluetooth</a> on phones has quietly gotten more complicated`,
    description: 'Android Bluetooth → munbyn-p44s-bluetooth-pairing-problem',
  },

  // ── ICC: Tango X color article ────────────────────────────────────────────
  {
    slug: 'hp-tango-x-not-printing-color-correctly',
    rawSearch: 'macOS loves to default to AirPrint or a generic PostScript driver',
    replacement: `macOS loves to default to <a href="https://support.apple.com/en-us/HT201311" target="_blank" rel="noopener noreferrer">AirPrint</a> or a generic PostScript driver`,
    description: 'Apple AirPrint → hp-tango-x-not-printing-color-correctly',
  },
];

// ─── Engine ───────────────────────────────────────────────────────────────────
async function run() {
  let updated = 0;
  let skipped = 0;
  let notFound = 0;

  for (const job of jobs) {
    // Skip marked entries
    if (job.description.startsWith('SKIP')) {
      console.log(`⏭️  SKIP: ${job.description}`);
      skipped++;
      continue;
    }

    const article = await prisma.article.findUnique({
      where: { slug: job.slug },
      select: { content: true },
    });

    if (!article?.content) {
      console.log(`⚠️  Not found: ${job.slug}`);
      notFound++;
      continue;
    }

    const content = article.content;

    // Already linked?
    if (content.includes(job.replacement) || 
        (job.replacement.includes('href=') && content.includes(new URL(job.replacement.match(/href="([^"]+)"/)?.[1] || 'x://x').hostname))) {
      // Check by href domain presence to avoid double-linking same domain
      const hrefMatch = job.replacement.match(/href="([^"]+)"/);
      if (hrefMatch) {
        const domain = new URL(hrefMatch[1]).hostname;
        if (content.includes(domain)) {
          console.log(`⏭️  Already has link to ${domain}: ${job.slug}`);
          skipped++;
          continue;
        }
      }
    }

    if (!content.includes(job.rawSearch)) {
      console.log(`⚠️  Anchor not found: "${job.rawSearch.substring(0, 50)}..." in ${job.slug}`);
      notFound++;
      continue;
    }

    const newContent = content.replace(job.rawSearch, job.replacement);

    if (newContent === content) {
      console.log(`⏭️  No change: ${job.slug}`);
      skipped++;
      continue;
    }

    await prisma.article.update({
      where: { slug: job.slug },
      data: { content: newContent },
    });

    console.log(`✅ ${job.description}`);
    updated++;
  }

  console.log(`\n📊 Done! ✅ Updated: ${updated} | ⏭️  Skipped: ${skipped} | ⚠️  Issues: ${notFound}`);
}

run()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
