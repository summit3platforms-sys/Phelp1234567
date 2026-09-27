import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const slugs = [
    'dascom-pos-printer-cash-drawer-not-opening',
    'dymo-labelwriter-printing-blank-labels-skipping',
    'fix-xerox-024-toner-codes-third-party-chips-developer-errors',
    'zebra-label-roll-guides-fanfold-linerless-printing-setup',
    'instax-link-wont-turn-on-charge-battery-fix'
  ];
  for (const slug of slugs) {
    const a = await prisma.article.findFirst({ where: { slug }, select: { content: true } });
    if (a) {
      const words = a.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
      console.log(`${slug}: ${words} words`);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
