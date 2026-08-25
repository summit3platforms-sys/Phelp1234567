import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const ids = [
    '98774757-42fc-41c8-aec9-b6f7f45ecedf', // hp-officejet-pro-6978-wont-print-black
    '3a1cfe71-8f04-45e7-b5dd-b7121aa054b1', // hp-laserjet-pro-m404dn-fuser-error
    '23107cb8-e7f0-4fe0-bd78-c4e625718ea3', // hp-deskjet-4155e-wont-connect-wifi
    'c1488774-ef8e-4f63-b6cb-bdd99ab22e65', // hp-smart-tank-5101-printhead-error
    '6aaac349-3b7b-466b-a9d3-016fa2a301be', // hp-printer-driver-unavailable-windows-11
    '509d3955-9e0a-4011-bdb3-c69920443849', // hp-envy-6055e-blinking-purple-light
    'c0b11c70-80eb-4fae-9a00-ecbd8f3012ee', // hp-deskjet-2755e-paper-jam-no-paper
    '442c4415-be5a-4d7c-b366-ec8a0ec2823c', // hp-deskjet-3755-flashing-lights-meaning
    '817f9f71-3ac6-41a0-afd4-3bea3ea1fa01', // hp-envy-6055e-paper-jam-no-paper
    '76017856-ea9d-4b86-81ad-7c9765b37d7e', // hp-officejet-pro-9015e-printhead-missing-failed
  ];

  const articles = await prisma.article.findMany({
    where: { id: { in: ids } },
    select: { id: true, slug: true, title: true, content: true, tags: true, metaDescription: true }
  });

  for (const a of articles) {
    const text = a.content ? a.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
    const words = text.split(' ').filter(w => w.length > 0).length;
    console.log(`\n${'='.repeat(70)}`);
    console.log(`TITLE: ${a.title}`);
    console.log(`SLUG:  ${a.slug}`);
    console.log(`ID:    ${a.id}`);
    console.log(`WORDS: ${words}`);
    console.log(`TAGS:  ${a.tags}`);
    console.log(`META:  ${a.metaDescription}`);
    console.log(`\nCONTENT (raw HTML):\n${a.content}`);
  }
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
