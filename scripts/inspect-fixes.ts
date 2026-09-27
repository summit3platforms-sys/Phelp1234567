import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';
const prisma = new PrismaClient();

async function main() {
  console.log('--- 1. Brother FAQ ---');
  const brother = await prisma.article.findFirst({
    where: { slug: 'brother-printer-error-51-laser-unit' },
    select: { id: true, content: true, faqs: true }
  });
  if (brother) {
    const $ = cheerio.load('<div id="root">' + brother.content + '</div>', null, false);
    console.log('H2s:', $('#root h2').map((_, el) => $(el).text()).get());
    console.log('Details count:', $('#root details').length);
  }

  console.log('\n--- 2. Mesh Router Padding ---');
  const mesh = await prisma.article.findFirst({
    where: { slug: 'printer-wont-connect-mesh-router-band-steering' },
    select: { id: true, content: true }
  });
  if (mesh) {
    const count = (mesh.content.match(/This section provides additional technical context/gi) || []).length;
    console.log('Repeated occurrences count:', count);
  }

  console.log('\n--- 3. Five Boilerplate Articles ---');
  const slugs5 = [
    'dascom-pos-printer-cash-drawer-not-opening',
    'dymo-labelwriter-printing-blank-labels-skipping',
    'fix-xerox-024-toner-codes-third-party-chips-developer-errors',
    'zebra-label-roll-guides-fanfold-linerless-printing-setup',
    'instax-link-wont-turn-on-charge-battery-fix'
  ];
  for (const slug of slugs5) {
    const a = await prisma.article.findFirst({ where: { slug }, select: { content: true } });
    if (a) {
      const $ = cheerio.load('<div id="root">' + a.content + '</div>', null, false);
      const lis = $('#root ol li').map((_, el) => $(el).text()).get();
      console.log(`[${slug}] total steps: ${lis.length}`);
      if (lis.length > 0) {
        console.log(` Sample step 1:\n`, lis[0].substring(0, 200) + '...');
      }
    }
  }

  console.log('\n--- 4. Empty H2s ---');
  const slugs4 = [
    'hp-officejet-pro-9015e-error-0x610000f6',
    'phomemo-m02-vs-m02-pro-t02-comparison-m02s-fixes',
    'zebra-zq520-setup-gk420d-driver-windows-11',
    'dymo-printer-error-printing-message-not-printing'
  ];
  for (const slug of slugs4) {
    const a = await prisma.article.findFirst({ where: { slug }, select: { content: true } });
    if (a) {
      const emptyH2 = (a.content.match(/<h2[^>]*>\s*<\/h2>/gi) || []).length;
      console.log(`[${slug}] empty H2s: ${emptyH2}`);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
