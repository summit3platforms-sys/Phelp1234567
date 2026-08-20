import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Full URL map for all 47 Kodak articles
const urlMap: Record<string, { url: string; title: string }> = {
  // Connectivity
  'kodak-printer-offline-windows-11': { url: '/kodak/connectivity-issues/kodak-printer-offline-windows-11', title: 'How to Fix a Kodak Printer Showing Offline on Windows 11' },
  'kodak-printer-blinking-wifi-light': { url: '/kodak/connectivity-issues/kodak-printer-blinking-wifi-light', title: 'Kodak Printer Blinking Wi-Fi Light: Network & Setup Guide' },
  'kodak-photo-printer-bluetooth-pairing-failed': { url: '/kodak/connectivity-issues/kodak-photo-printer-bluetooth-pairing-failed', title: 'Kodak Photo Printer Bluetooth Pairing Failed? Android & iOS Resets' },
  'kodak-verite-printer-troubleshooting-offline-setup': { url: '/kodak/connectivity-issues/kodak-verite-printer-troubleshooting-offline-setup', title: 'Kodak Verite Printer Troubleshooting: Offline & Wireless Setup' },
  'kodak-luma-projector-wifi-connection-fix': { url: '/kodak/connectivity-issues/kodak-luma-projector-wifi-connection-fix', title: 'Kodak Luma Projector Wi-Fi Connection & Mirroring Fix' },
  'kodak-printer-scanner-not-working': { url: '/kodak/connectivity-issues/kodak-printer-scanner-not-working', title: 'Kodak Printer Scanner Not Working? WIA Driver & Firewall Fixes' },
  'kodak-scan-to-email-not-working': { url: '/kodak/connectivity-issues/kodak-scan-to-email-not-working', title: 'Kodak Scan to Email Stopped Working: SMTP & App Password Fix' },
  'kodak-instant-printer-app-not-connecting': { url: '/kodak/connectivity-issues/kodak-instant-printer-app-not-connecting', title: 'Kodak Instant Printer App Not Connecting: Android & iOS Fix' },
  // Error Codes
  'kodak-printer-error-code-105-3513': { url: '/kodak/error-codes-alerts/kodak-printer-error-code-105-3513', title: 'Kodak Printer Error Code 105-3513: Printhead Fix' },
  'kodak-printer-printhead-error-fix': { url: '/kodak/error-codes-alerts/kodak-printer-printhead-error-fix', title: 'Kodak Printer Printhead Error Fix' },
  'kodak-printer-error-code-3528': { url: '/kodak/error-codes-alerts/kodak-printer-error-code-3528', title: 'Kodak Printer Error Code 3528: Paper Jam & Sensor Fixes' },
  'kodak-printer-error-3802': { url: '/kodak/error-codes-alerts/kodak-printer-error-3802', title: 'Kodak Printer Error 3802: Quick Reset & Fixes' },
  'kodak-printer-error-6102': { url: '/kodak/error-codes-alerts/kodak-printer-error-6102', title: 'Kodak Printer Error 6102 (Document Feeder Jam)' },
  'kodak-printer-error-3501': { url: '/kodak/error-codes-alerts/kodak-printer-error-3501', title: 'Kodak Printer Error 3501 (Access Door Open)' },
  'kodak-printer-spooler-error-windows': { url: '/kodak/error-codes-alerts/kodak-printer-spooler-error-windows', title: 'Resolving Kodak Printer Spooler Errors on Windows' },
  'kodak-printer-flashing-red-light-error': { url: '/kodak/error-codes-alerts/kodak-printer-flashing-red-light-error', title: 'Kodak Printer Flashing Red Light Error: Diagnostic Guide' },
  'kodak-step-printer-orange-light-flashing': { url: '/kodak/error-codes-alerts/kodak-step-printer-orange-light-flashing', title: 'Kodak Step Printer Orange Light Flashing: Diagnostic Guide' },
  'kodak-dock-plus-flashing-lights-error-codes': { url: '/kodak/error-codes-alerts/kodak-dock-plus-flashing-lights-error-codes', title: 'Kodak Dock Plus Flashing Lights: Decoding LED Error Patterns' },
  'kodak-portable-printer-overheating-fix': { url: '/kodak/error-codes-alerts/kodak-portable-printer-overheating-fix', title: 'Kodak Portable Printer Overheating? Thermal Protection Guide' },
  // Ink
  'kodak-printer-ink-cartridge-not-recognized': { url: '/kodak/ink-toner-issues/kodak-printer-ink-cartridge-not-recognized', title: 'Kodak Printer Ink Cartridge Not Recognized? Technical Fixes' },
  'kodak-printer-missing-or-faulty-cartridge-error': { url: '/kodak/ink-toner-issues/kodak-printer-missing-or-faulty-cartridge-error', title: "Kodak Printer Missing or Faulty Cartridge Error" },
  'kodak-printer-not-printing-black-ink': { url: '/kodak/ink-toner-issues/kodak-printer-not-printing-black-ink', title: 'Kodak Printer Not Printing Black Ink? Nozzle & Vent Fixes' },
  'kodak-ink-cartridge-compatibility-guide-series-10-vs-30': { url: '/kodak/ink-toner-issues/kodak-ink-cartridge-compatibility-guide-series-10-vs-30', title: 'Kodak Ink Cartridge Compatibility Guide: Series 10 vs 30 vs Verite 5' },
  'kodak-printer-low-ink-warning-override': { url: '/kodak/ink-toner-issues/kodak-printer-low-ink-warning-override', title: 'How to Override Low Ink Warnings on Kodak Printers' },
  // Paper
  'kodak-printer-paper-feed-jam-fix': { url: '/kodak/paper-handling-issues/kodak-printer-paper-feed-jam-fix', title: 'Kodak Printer Paper Feed Jam: Step-by-Step Clearing Guide' },
  'kodak-printer-loading-paper-error': { url: '/kodak/paper-handling-issues/kodak-printer-loading-paper-error', title: 'Kodak Printer Loading Paper Error: Clean the Roller Assembly' },
  'kodak-printer-calibration-sheet-error': { url: '/kodak/paper-handling-issues/kodak-printer-calibration-sheet-error', title: 'Fixing a Kodak Printer Calibration Sheet Error' },
  'kodak-dock-plus-paper-jam': { url: '/kodak/paper-handling-issues/kodak-dock-plus-paper-jam', title: 'Kodak Dock Plus Paper Jam: Dye-Sublimation Troubleshooting' },
  'kodak-mini-2-retro-cartridge-stuck': { url: '/kodak/paper-handling-issues/kodak-mini-2-retro-cartridge-stuck', title: 'Kodak Mini 2 Retro Cartridge Stuck? Manual Release & Ribbon Fixes' },
  // Printing
  'kodak-printer-printing-blank-pages': { url: '/kodak/printing-problems/kodak-printer-printing-blank-pages', title: 'Kodak Printer Printing Blank Pages? How to Restore Ink Flow' },
  'kodak-printer-printing-double-lines-text-shadow': { url: '/kodak/printing-problems/kodak-printer-printing-double-lines-text-shadow', title: 'Why is My Kodak Printer Printing Double Lines or Shadowed Text?' },
  'how-to-clean-kodak-printhead-clogged': { url: '/kodak/printing-problems/how-to-clean-kodak-printhead-clogged', title: 'How to Clean a Clogged Kodak Printhead Safely' },
  'how-to-clean-kodak-printer-encoder-strip': { url: '/kodak/printing-problems/how-to-clean-kodak-printer-encoder-strip', title: 'How to Clean a Kodak Printer Encoder Strip Safely' },
  'kodak-printer-alignment-failed': { url: '/kodak/printing-problems/kodak-printer-alignment-failed', title: 'How to Fix Calibration/Alignment Failed Error on Kodak Printers' },
  'kodak-printer-prints-only-yellow-color-contamination': { url: '/kodak/printing-problems/kodak-printer-prints-only-yellow-color-contamination', title: 'Kodak Printer Prints Only Yellow? Ink Contamination Fix' },
  'kodak-mini-shot-shutter-stuck-black-photos': { url: '/kodak/printing-problems/kodak-mini-shot-shutter-stuck-black-photos', title: 'Kodak Mini Shot Stuck Shutter: Fixing Blank & Black Photos' },
  'kodak-easyshare-printer-dock-series-3-troubleshooting': { url: '/kodak/printing-problems/kodak-easyshare-printer-dock-series-3-troubleshooting', title: 'Kodak EasyShare Printer Dock Series 3 Troubleshooting' },
  'kodak-printer-wont-feed-photo-paper-slips': { url: '/kodak/printing-problems/kodak-printer-wont-feed-photo-paper-slips', title: "Kodak Portable Printer Won't Feed Paper: Roller Slip Fixes" },
  'kodak-printer-lines-on-photos-printhead-cleaning': { url: '/kodak/printing-problems/kodak-printer-lines-on-photos-printhead-cleaning', title: 'How to Fix Lines and Streaks on Kodak Portable Photos' },
  'kodak-mini-3-retro-stops-printing-halfway': { url: '/kodak/printing-problems/kodak-mini-3-retro-stops-printing-halfway', title: 'Kodak Mini 3 Retro Stops Printing Halfway: 4PASS Cycle Fix' },
  'kodak-printer-making-grinding-noise': { url: '/kodak/printing-problems/kodak-printer-making-grinding-noise', title: 'Kodak Printer Making Grinding or Clicking Noise: Gear Fixes' },
  // Setup
  'kodak-printer-driver-unavailable-fix': { url: '/kodak/setup-installation/kodak-printer-driver-unavailable-fix', title: 'Kodak Printer Driver Unavailable? Windows 10 & 11 Installation Guide' },
  'how-to-reset-kodak-printer-to-factory-settings': { url: '/kodak/setup-installation/how-to-reset-kodak-printer-to-factory-settings', title: 'How to Reset a Kodak Printer to Factory Settings' },
  'how-to-print-from-macos-to-legacy-kodak-printer': { url: '/kodak/setup-installation/how-to-print-from-macos-to-legacy-kodak-printer', title: 'How to Print from macOS to a Legacy Kodak Printer' },
  'kodak-printer-software-crashes-windows-11': { url: '/kodak/setup-installation/kodak-printer-software-crashes-windows-11', title: 'How to Run KODAK All-in-One Printer Software on Windows 11' },
  'kodak-printer-firmware-update-failed-loop': { url: '/kodak/setup-installation/kodak-printer-firmware-update-failed-loop', title: 'How to Fix Kodak Printer Firmware Update Failures & Loops' },
  'kodak-esp-hero-printer-models-comparison': { url: '/kodak/setup-installation/kodak-esp-hero-printer-models-comparison', title: 'Kodak ESP vs Hero Printer Models: Complete Comparison Guide' },
};

// Interlinking map: each article slug -> array of related article slugs
const interlinks: Record<string, string[]> = {
  // --- Connectivity ---
  'kodak-printer-offline-windows-11': [
    'kodak-printer-blinking-wifi-light',
    'kodak-printer-driver-unavailable-fix',
    'kodak-printer-spooler-error-windows',
    'how-to-reset-kodak-printer-to-factory-settings',
  ],
  'kodak-printer-blinking-wifi-light': [
    'kodak-printer-offline-windows-11',
    'kodak-photo-printer-bluetooth-pairing-failed',
    'how-to-reset-kodak-printer-to-factory-settings',
    'kodak-verite-printer-troubleshooting-offline-setup',
  ],
  'kodak-photo-printer-bluetooth-pairing-failed': [
    'kodak-instant-printer-app-not-connecting',
    'kodak-printer-firmware-update-failed-loop',
    'kodak-step-printer-orange-light-flashing',
    'kodak-dock-plus-flashing-lights-error-codes',
  ],
  'kodak-verite-printer-troubleshooting-offline-setup': [
    'kodak-printer-offline-windows-11',
    'kodak-printer-blinking-wifi-light',
    'kodak-ink-cartridge-compatibility-guide-series-10-vs-30',
    'kodak-esp-hero-printer-models-comparison',
  ],
  'kodak-luma-projector-wifi-connection-fix': [
    'kodak-printer-blinking-wifi-light',
    'kodak-printer-firmware-update-failed-loop',
    'kodak-photo-printer-bluetooth-pairing-failed',
  ],
  'kodak-printer-scanner-not-working': [
    'kodak-scan-to-email-not-working',
    'kodak-printer-software-crashes-windows-11',
    'kodak-printer-driver-unavailable-fix',
    'kodak-printer-offline-windows-11',
  ],
  'kodak-scan-to-email-not-working': [
    'kodak-printer-scanner-not-working',
    'kodak-printer-offline-windows-11',
    'kodak-printer-software-crashes-windows-11',
  ],
  'kodak-instant-printer-app-not-connecting': [
    'kodak-photo-printer-bluetooth-pairing-failed',
    'kodak-printer-firmware-update-failed-loop',
    'kodak-dock-plus-flashing-lights-error-codes',
    'kodak-step-printer-orange-light-flashing',
  ],

  // --- Error Codes ---
  'kodak-printer-error-code-105-3513': [
    'kodak-printer-printhead-error-fix',
    'how-to-clean-kodak-printhead-clogged',
    'kodak-printer-error-3802',
    'kodak-printer-flashing-red-light-error',
  ],
  'kodak-printer-printhead-error-fix': [
    'kodak-printer-error-code-105-3513',
    'how-to-clean-kodak-printhead-clogged',
    'kodak-printer-printing-blank-pages',
    'kodak-printer-not-printing-black-ink',
  ],
  'kodak-printer-error-code-3528': [
    'kodak-printer-paper-feed-jam-fix',
    'kodak-printer-loading-paper-error',
    'kodak-printer-error-6102',
    'kodak-printer-flashing-red-light-error',
  ],
  'kodak-printer-error-3802': [
    'kodak-printer-error-code-105-3513',
    'kodak-printer-printhead-error-fix',
    'kodak-printer-ink-cartridge-not-recognized',
    'how-to-reset-kodak-printer-to-factory-settings',
  ],
  'kodak-printer-error-6102': [
    'kodak-printer-error-code-3528',
    'kodak-printer-paper-feed-jam-fix',
    'kodak-printer-error-3501',
    'kodak-printer-loading-paper-error',
  ],
  'kodak-printer-error-3501': [
    'kodak-printer-error-6102',
    'kodak-printer-flashing-red-light-error',
    'kodak-printer-error-code-3528',
    'how-to-reset-kodak-printer-to-factory-settings',
  ],
  'kodak-printer-spooler-error-windows': [
    'kodak-printer-offline-windows-11',
    'kodak-printer-driver-unavailable-fix',
    'kodak-printer-software-crashes-windows-11',
    'how-to-reset-kodak-printer-to-factory-settings',
  ],
  'kodak-printer-flashing-red-light-error': [
    'kodak-dock-plus-flashing-lights-error-codes',
    'kodak-step-printer-orange-light-flashing',
    'kodak-printer-error-code-105-3513',
    'kodak-printer-error-3501',
  ],
  'kodak-step-printer-orange-light-flashing': [
    'kodak-dock-plus-flashing-lights-error-codes',
    'kodak-printer-flashing-red-light-error',
    'kodak-printer-calibration-sheet-error',
    'kodak-portable-printer-overheating-fix',
  ],
  'kodak-dock-plus-flashing-lights-error-codes': [
    'kodak-step-printer-orange-light-flashing',
    'kodak-printer-flashing-red-light-error',
    'kodak-dock-plus-paper-jam',
    'kodak-portable-printer-overheating-fix',
  ],
  'kodak-portable-printer-overheating-fix': [
    'kodak-dock-plus-flashing-lights-error-codes',
    'kodak-step-printer-orange-light-flashing',
    'kodak-printer-lines-on-photos-printhead-cleaning',
    'kodak-mini-3-retro-stops-printing-halfway',
  ],

  // --- Ink ---
  'kodak-printer-ink-cartridge-not-recognized': [
    'kodak-ink-cartridge-compatibility-guide-series-10-vs-30',
    'kodak-printer-missing-or-faulty-cartridge-error',
    'kodak-printer-not-printing-black-ink',
    'kodak-printer-low-ink-warning-override',
  ],
  'kodak-printer-missing-or-faulty-cartridge-error': [
    'kodak-printer-ink-cartridge-not-recognized',
    'kodak-ink-cartridge-compatibility-guide-series-10-vs-30',
    'kodak-printer-error-code-105-3513',
    'kodak-printer-printhead-error-fix',
  ],
  'kodak-printer-not-printing-black-ink': [
    'how-to-clean-kodak-printhead-clogged',
    'kodak-printer-printing-blank-pages',
    'kodak-printer-ink-cartridge-not-recognized',
    'kodak-printer-low-ink-warning-override',
  ],
  'kodak-ink-cartridge-compatibility-guide-series-10-vs-30': [
    'kodak-esp-hero-printer-models-comparison',
    'kodak-printer-ink-cartridge-not-recognized',
    'kodak-printer-missing-or-faulty-cartridge-error',
    'kodak-printer-low-ink-warning-override',
  ],
  'kodak-printer-low-ink-warning-override': [
    'kodak-printer-not-printing-black-ink',
    'kodak-printer-ink-cartridge-not-recognized',
    'kodak-ink-cartridge-compatibility-guide-series-10-vs-30',
    'kodak-printer-printing-blank-pages',
  ],

  // --- Paper ---
  'kodak-printer-paper-feed-jam-fix': [
    'kodak-printer-loading-paper-error',
    'kodak-printer-error-code-3528',
    'kodak-printer-error-6102',
    'kodak-dock-plus-paper-jam',
  ],
  'kodak-printer-loading-paper-error': [
    'kodak-printer-paper-feed-jam-fix',
    'kodak-printer-error-code-3528',
    'kodak-printer-wont-feed-photo-paper-slips',
    'kodak-printer-making-grinding-noise',
  ],
  'kodak-printer-calibration-sheet-error': [
    'kodak-printer-alignment-failed',
    'kodak-printer-lines-on-photos-printhead-cleaning',
    'kodak-step-printer-orange-light-flashing',
    'kodak-dock-plus-flashing-lights-error-codes',
  ],
  'kodak-dock-plus-paper-jam': [
    'kodak-printer-paper-feed-jam-fix',
    'kodak-dock-plus-flashing-lights-error-codes',
    'kodak-mini-2-retro-cartridge-stuck',
    'kodak-portable-printer-overheating-fix',
  ],
  'kodak-mini-2-retro-cartridge-stuck': [
    'kodak-dock-plus-paper-jam',
    'kodak-mini-3-retro-stops-printing-halfway',
    'kodak-printer-lines-on-photos-printhead-cleaning',
    'kodak-printer-wont-feed-photo-paper-slips',
  ],

  // --- Printing ---
  'kodak-printer-printing-blank-pages': [
    'kodak-printer-not-printing-black-ink',
    'how-to-clean-kodak-printhead-clogged',
    'kodak-printer-ink-cartridge-not-recognized',
    'kodak-printer-alignment-failed',
  ],
  'kodak-printer-printing-double-lines-text-shadow': [
    'kodak-printer-alignment-failed',
    'how-to-clean-kodak-printer-encoder-strip',
    'kodak-printer-making-grinding-noise',
    'how-to-clean-kodak-printhead-clogged',
  ],
  'how-to-clean-kodak-printhead-clogged': [
    'kodak-printer-not-printing-black-ink',
    'kodak-printer-printing-blank-pages',
    'kodak-printer-prints-only-yellow-color-contamination',
    'kodak-printer-printhead-error-fix',
  ],
  'how-to-clean-kodak-printer-encoder-strip': [
    'kodak-printer-printing-double-lines-text-shadow',
    'kodak-printer-alignment-failed',
    'kodak-printer-making-grinding-noise',
    'how-to-clean-kodak-printhead-clogged',
  ],
  'kodak-printer-alignment-failed': [
    'kodak-printer-calibration-sheet-error',
    'kodak-printer-printing-double-lines-text-shadow',
    'how-to-clean-kodak-printer-encoder-strip',
    'how-to-clean-kodak-printhead-clogged',
  ],
  'kodak-printer-prints-only-yellow-color-contamination': [
    'how-to-clean-kodak-printhead-clogged',
    'kodak-printer-not-printing-black-ink',
    'kodak-printer-printing-blank-pages',
    'kodak-printer-ink-cartridge-not-recognized',
  ],
  'kodak-mini-shot-shutter-stuck-black-photos': [
    'kodak-printer-calibration-sheet-error',
    'kodak-dock-plus-flashing-lights-error-codes',
    'kodak-printer-firmware-update-failed-loop',
    'kodak-instant-printer-app-not-connecting',
  ],
  'kodak-easyshare-printer-dock-series-3-troubleshooting': [
    'kodak-esp-hero-printer-models-comparison',
    'kodak-ink-cartridge-compatibility-guide-series-10-vs-30',
    'kodak-printer-lines-on-photos-printhead-cleaning',
    'kodak-printer-making-grinding-noise',
  ],
  'kodak-printer-wont-feed-photo-paper-slips': [
    'kodak-mini-3-retro-stops-printing-halfway',
    'kodak-dock-plus-paper-jam',
    'kodak-printer-lines-on-photos-printhead-cleaning',
    'kodak-dock-plus-flashing-lights-error-codes',
  ],
  'kodak-printer-lines-on-photos-printhead-cleaning': [
    'kodak-printer-calibration-sheet-error',
    'kodak-printer-printing-double-lines-text-shadow',
    'kodak-printer-wont-feed-photo-paper-slips',
    'kodak-mini-3-retro-stops-printing-halfway',
  ],
  'kodak-mini-3-retro-stops-printing-halfway': [
    'kodak-printer-wont-feed-photo-paper-slips',
    'kodak-portable-printer-overheating-fix',
    'kodak-mini-2-retro-cartridge-stuck',
    'kodak-printer-lines-on-photos-printhead-cleaning',
  ],
  'kodak-printer-making-grinding-noise': [
    'how-to-clean-kodak-printer-encoder-strip',
    'kodak-printer-printing-double-lines-text-shadow',
    'kodak-printer-paper-feed-jam-fix',
    'kodak-printer-alignment-failed',
  ],

  // --- Setup ---
  'kodak-printer-driver-unavailable-fix': [
    'kodak-printer-offline-windows-11',
    'kodak-printer-software-crashes-windows-11',
    'how-to-print-from-macos-to-legacy-kodak-printer',
    'kodak-esp-hero-printer-models-comparison',
  ],
  'how-to-reset-kodak-printer-to-factory-settings': [
    'kodak-printer-offline-windows-11',
    'kodak-printer-spooler-error-windows',
    'kodak-printer-error-3802',
    'kodak-printer-flashing-red-light-error',
  ],
  'how-to-print-from-macos-to-legacy-kodak-printer': [
    'kodak-printer-driver-unavailable-fix',
    'kodak-esp-hero-printer-models-comparison',
    'kodak-ink-cartridge-compatibility-guide-series-10-vs-30',
    'kodak-printer-scanner-not-working',
  ],
  'kodak-printer-software-crashes-windows-11': [
    'kodak-printer-driver-unavailable-fix',
    'kodak-printer-scanner-not-working',
    'kodak-printer-spooler-error-windows',
    'kodak-esp-hero-printer-models-comparison',
  ],
  'kodak-printer-firmware-update-failed-loop': [
    'kodak-instant-printer-app-not-connecting',
    'kodak-photo-printer-bluetooth-pairing-failed',
    'kodak-dock-plus-flashing-lights-error-codes',
    'how-to-reset-kodak-printer-to-factory-settings',
  ],
  'kodak-esp-hero-printer-models-comparison': [
    'kodak-ink-cartridge-compatibility-guide-series-10-vs-30',
    'kodak-printer-driver-unavailable-fix',
    'how-to-print-from-macos-to-legacy-kodak-printer',
    'kodak-printer-software-crashes-windows-11',
  ],
};

function buildRelatedSection(slugs: string[]): string {
  const items = slugs
    .filter(s => urlMap[s])
    .map(s => `<li><a href="${urlMap[s].url}">${urlMap[s].title}</a></li>`)
    .join('\n    ');

  return `\n\n<h2>Related Kodak Troubleshooting Guides</h2>\n<ul class="related-articles">\n    ${items}\n</ul>`;
}

async function main() {
  let updated = 0;
  let skipped = 0;

  for (const [slug, relatedSlugs] of Object.entries(interlinks)) {
    try {
      const article = await prisma.article.findUnique({
        where: { slug },
        select: { id: true, content: true, title: true }
      });

      if (!article) {
        console.log('⚠️ Article not found: ' + slug);
        skipped++;
        continue;
      }

      // Skip if already interlinked
      if (article.content.includes('related-articles')) {
        console.log('⏭️ Already interlinked: ' + slug);
        skipped++;
        continue;
      }

      const relatedHtml = buildRelatedSection(relatedSlugs);
      const updatedContent = article.content + relatedHtml;

      await prisma.article.update({
        where: { slug },
        data: { content: updatedContent }
      });

      console.log('✅ Interlinked (' + relatedSlugs.length + ' links): ' + slug);
      updated++;
    } catch (e: any) {
      console.log('⚠️ Error for ' + slug + ': ' + e.message);
    }
  }

  console.log('\n--- Summary ---');
  console.log('Updated: ' + updated);
  console.log('Skipped: ' + skipped);
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
