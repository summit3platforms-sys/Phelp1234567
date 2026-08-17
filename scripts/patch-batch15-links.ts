import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const patches = [
  // HP Envy 6455e Setup Problems -> Dynamic Security
  {
    slug: 'hp-envy-6455e-setup-problems',
    from: "HP's official Dynamic Security information",
    to: "<a href=\"https://hp.com/learn/ds\" target=\"_blank\" rel=\"noopener noreferrer\">HP's official Dynamic Security information</a>",
    desc: 'HP Dynamic Security → hp-envy-6455e-setup-problems',
  },
  // HP DeskJet 4155e Wi-Fi Setup -> Google Public DNS
  {
    slug: 'hp-deskjet-4155e-wifi-setup-guide',
    from: "Google's public DNS",
    to: "<a href=\"https://developers.google.com/speed/public-dns/\" target=\"_blank\" rel=\"noopener noreferrer\">Google's public DNS</a>",
    desc: 'Google Public DNS → hp-deskjet-4155e-wifi-setup-guide',
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
