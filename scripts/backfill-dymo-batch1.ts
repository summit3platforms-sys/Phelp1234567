import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const brainDir = "/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346";
const pubDir = path.join(process.cwd(), "public/images/articles");

const map = [
  { slug: "dymo-labelwriter-4xl-5xl-setup-driver-guide", prefix: "dymo_setup" },
  { slug: "dymo-printer-not-showing-up-mac-os-fix", prefix: "dymo_mac_fix" },
  { slug: "dymo-printer-out-of-paper-error-label-loaded", prefix: "dymo_out_of_paper" },
  { slug: "dymo-printer-prints-faint-blurry-streaks", prefix: "dymo_faint_blurry" },
  { slug: "dymo-label-software-wont-open-install", prefix: "dymo_software_wont_open" },
  { slug: "dymo-labelwriter-printing-blank-labels-skipping", prefix: "dymo_blank_labels" }
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
  
  console.log(`Updated ${updated} DYMO articles.`);
}

run().then(() => prisma.$disconnect());
