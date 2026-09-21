import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
const prisma = new PrismaClient();
async function main() {
  const slugs = [
    "bixolon-printer-self-test",
    "bixolon-printer-showing-offline",
    "phomemo-printer-connected-wont-print-app-crashing-fix",
    "epson-printer-beeping-and-blinking",
    "kodak-step-printer-orange-light-flashing"
  ];
  for (const s of slugs) {
    const a = await prisma.article.findUnique({ where: { slug: s } });
    if (a) fs.writeFileSync(s + '.html', a.content);
  }
}
main().finally(() => prisma.$disconnect());
