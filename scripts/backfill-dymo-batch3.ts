import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const brainDir = "/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346";
const pubDir = path.join(process.cwd(), "public/images/articles");

const map = [
  { slug: "dymo-labelwriter-network-setup-lan-wi-fi", prefix: "dymo_lan_setup" },
  { slug: "dymo-connect-web-service-certificate-error-localhost", prefix: "dymo_localhost_error" },
  { slug: "dymo-550-turbo-vs-450-turbo-upgrade", prefix: "dymo_550_vs_450" },
  { slug: "dymo-550-rfid-drm-third-party-labels-compatibility", prefix: "dymo_rfid" },
  { slug: "dymo-labelwriter-450-turbo-setup-not-printing", prefix: "dymo_450_setup" },
  { slug: "dymo-connect-vs-dymo-label-software-difference", prefix: "dymo_software_comparison" },
  { slug: "dymo-letratag-not-printing-tape-jam", prefix: "dymo_letratag" },
  { slug: "fix-dymo-web-service-shopify-amazon-ebay-chrome", prefix: "dymo_web_service" }
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
