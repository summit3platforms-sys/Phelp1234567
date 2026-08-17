import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const patches = [
  {
    slug: 'hp-borderless-printing-grayed-out',
    from: "AirPrint on Mac",
    to: "<a href=\"https://support.apple.com/en-us/HT201387\" target=\"_blank\" rel=\"noopener noreferrer\">AirPrint on Mac</a>",
    desc: 'Apple AirPrint → hp-borderless-printing-grayed-out',
  },
  {
    slug: 'hp-printer-printing-very-slowly',
    from: "Print Spooler",
    to: "<a href=\"https://support.microsoft.com/en-us/windows/fix-printer-connection-and-printing-problems-in-windows-fb830bff-7702-6349-33cd-9443fe985050\" target=\"_blank\" rel=\"noopener noreferrer\">Print Spooler</a>",
    desc: 'Microsoft Print Spooler → hp-printer-printing-very-slowly',
  },
];

(async () => {
  for (const p of patches) {
    const a = await prisma.article.findUnique({ where: { slug: p.slug }, select: { content: true } });
    if (!a?.content) { console.log('⚠️ Not found: ' + p.slug); continue; }

    const linkDomain = p.to.match(/href=\"https?:\/\/([^\/\"]+)/)?.[1];
    if (linkDomain && a.content.includes(linkDomain)) {
      console.log('⏭️ Already linked (' + linkDomain + '): ' + p.slug);
      continue;
    }

    if (!a.content.includes(p.from)) {
      console.log('⚠️ Anchor not found: ' + p.from + ' in ' + p.slug);
      continue;
    }

    const newContent = a.content.replace(p.from, p.to);
    await prisma.article.update({ where: { slug: p.slug }, data: { content: newContent } });
    console.log('✅ ' + p.desc);
  }
  await prisma.$disconnect();
})();
