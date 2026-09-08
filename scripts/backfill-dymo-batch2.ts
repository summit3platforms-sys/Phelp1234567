import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const brainDir = "/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346";
const pubDir = path.join(process.cwd(), "public/images/articles");

const map = [
  { slug: "dymo-printer-error-printing-message-not-printing", prefix: "dymo_error_printing" },
  { slug: "dymo-labelwriter-550-not-printing-power-adapter", prefix: "dymo_550_power" },
  { slug: "dymo-labelwriter-calibration-feed-size-mismatch", prefix: "dymo_calibration" },
  { slug: "dymo-connect-not-detecting-printer", prefix: "dymo_connect_not_detecting" },
  { slug: "dymo-labelwriter-label-jam-removal-clean-sensor", prefix: "dymo_label_jam" },
  { slug: "dymo-discontinued-400-turbo-se450-wireless-setup", prefix: "dymo_discontinued" }
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
