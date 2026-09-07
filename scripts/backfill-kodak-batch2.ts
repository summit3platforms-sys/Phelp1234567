import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const brainDir = "/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346";
const pubDir = path.join(process.cwd(), "public/images/articles");

const map = [
  { slug: "kodak-printer-firmware-update-failed-loop", prefix: "kodak_firmware_loop" },
  { slug: "kodak-printer-software-crashes-windows-11", prefix: "kodak_software_crash" },
  { slug: "kodak-scan-to-email-not-working", prefix: "kodak_scan_email" },
  { slug: "kodak-esp-hero-printer-models-comparison", prefix: "kodak_hero_comparison" },
  { slug: "kodak-printer-wont-feed-photo-paper-slips", prefix: "kodak_paper_feed" },
  { slug: "kodak-luma-projector-wifi-connection-fix", prefix: "kodak_luma_wifi" },
  { slug: "kodak-printer-not-printing-black-ink", prefix: "kodak_black_ink" },
  { slug: "kodak-portable-printer-overheating-fix", prefix: "kodak_overheating" },
  { slug: "kodak-printer-blinking-wifi-light", prefix: "kodak_blinking_wifi" },
  { slug: "kodak-easyshare-printer-dock-series-3-troubleshooting", prefix: "kodak_easyshare" },
  { slug: "kodak-printer-driver-unavailable-fix", prefix: "kodak_driver_unavailable" },
  { slug: "kodak-printer-low-ink-warning-override", prefix: "kodak_low_ink" },
  { slug: "kodak-printer-making-grinding-noise", prefix: "kodak_grinding_noise" },
  { slug: "kodak-printer-prints-only-yellow-color-contamination", prefix: "kodak_prints_yellow" },
  { slug: "how-to-print-from-macos-to-legacy-kodak-printer", prefix: "kodak_macos_legacy" }
];

async function run() {
  const files = fs.readdirSync(brainDir);
  let updated = 0;
  
  for (const item of map) {
    const file = files.find(f => f.startsWith(item.prefix) && f.endsWith(".jpg"));
    if (file) {
      const src = path.join(brainDir, file);
      const dest = path.join(pubDir, item.slug + ".jpg");
      fs.copyFileSync(src, dest);
      console.log(`Copied ${file} -> ${item.slug}.jpg`);
      
      const dbPath = `/images/articles/${item.slug}.jpg`;
      await prisma.article.updateMany({
        where: { slug: item.slug },
        data: { featuredImage: dbPath }
      });
      updated++;
    } else {
      console.log(`Missing image for prefix: ${item.prefix}`);
    }
  }
  
  console.log(`Updated ${updated} Kodak articles.`);
}

run().then(() => prisma.$disconnect());
