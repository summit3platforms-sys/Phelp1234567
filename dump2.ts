import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();
const slugs = ["epson-error-code-2000020a-initialization-fault", "hp-deskjet-3755-wifi-setup-without-app", "hp-sprocket-cartridge-not-recognized-fix", "hp-web-jetadmin-not-discovering-printers", "kodak-dock-plus-flashing-lights-error-codes"];

async function run() {
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  
  for (const article of articles) {
    fs.writeFileSync(`${article.slug}.html`, article.content);
  }
}
run();
