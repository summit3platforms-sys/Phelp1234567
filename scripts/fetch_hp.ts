import { PrismaClient } from '@prisma/client';
import fs from 'fs';
const prisma = new PrismaClient();
async function main() {
  const article = await prisma.article.findUnique({
    where: { slug: "hp-laserjet-pro-m15w-fuser-error" },
    select: { slug: true, content: true }
  });
  if (article) {
    const existing = JSON.parse(fs.readFileSync('articles_5.json', 'utf8'));
    existing.push(article);
    fs.writeFileSync('articles_5.json', JSON.stringify(existing, null, 2));
    console.log("Appended HP article");
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
