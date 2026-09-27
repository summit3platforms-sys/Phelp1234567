import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';
const prisma = new PrismaClient();

function countWords(html: string): number {
  return html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
}

async function fixBrotherFaq() {
  console.log('\n--- 1. Fixing Brother FAQ duplicate ---');
  const a = await prisma.article.findFirst({
    where: { slug: 'brother-printer-error-51-laser-unit' },
    select: { id: true, content: true }
  });
  if (!a) return;

  const $ = cheerio.load('<div id="root">' + a.content + '</div>', null, false);
  $('#root h2').each((_, el) => {
    const text = $(el).text().toLowerCase();
    if (text.includes('asked questions') || text.includes('faq')) {
      let next = $(el).next();
      while (next.length && (next.is('details') || (next.is('p') && next.text().trim() === ''))) {
        const curr = next;
        next = next.next();
        curr.remove();
      }
      $(el).remove();
    }
  });
  $('#root details').remove();

  const newContent = $('#root').html() || '';
  await prisma.article.update({
    where: { id: a.id },
    data: {
      content: newContent,
      wordCount: countWords(newContent)
    }
  });
  console.log(`✅ Fixed brother-printer-error-51-laser-unit: removed duplicate FAQ from content.`);
}

async function fixMeshPadding() {
  console.log('\n--- 2. Fixing Mesh Router padding spam ---');
  const a = await prisma.article.findFirst({
    where: { slug: 'printer-wont-connect-mesh-router-band-steering' },
    select: { id: true, content: true }
  });
  if (!a) return;

  // Remove the spam paragraphs
  const phrase = 'This section provides additional technical context to ensure a comprehensive understanding of the topic.';
  let cleaned = a.content;
  // Replace all occurrences of the paragraph
  const pattern = new RegExp('<p>\\s*' + phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*' + phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*<\\/p>\\s*', 'gi');
  cleaned = cleaned.replace(pattern, '');
  // Also clean single sentence occurrences if any remain
  cleaned = cleaned.replace(new RegExp('<p>\\s*' + phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*<\\/p>\\s*', 'gi'), '');

  console.log(`Length before: ${a.content.length} -> after: ${cleaned.length}`);
  console.log(`Words before: ${countWords(a.content)} -> after: ${countWords(cleaned)}`);

  await prisma.article.update({
    where: { id: a.id },
    data: {
      content: cleaned.trim(),
      wordCount: countWords(cleaned)
    }
  });
  console.log(`✅ Fixed printer-wont-connect-mesh-router-band-steering: removed 100x padding block.`);
}

async function fixEmptyH2s() {
  console.log('\n--- 3. Fixing Empty <h2> tags in 4 articles ---');
  const slugs = [
    'hp-officejet-pro-9015e-error-0x610000f6',
    'phomemo-m02-vs-m02-pro-t02-comparison-m02s-fixes',
    'zebra-zq520-setup-gk420d-driver-windows-11',
    'dymo-printer-error-printing-message-not-printing'
  ];

  for (const slug of slugs) {
    const a = await prisma.article.findFirst({ where: { slug }, select: { id: true, content: true } });
    if (!a) continue;

    const countBefore = (a.content.match(/<h2[^>]*>\s*<\/h2>/gi) || []).length;
    const cleaned = a.content.replace(/<h2[^>]*>\s*<\/h2>\s*/gi, '');

    await prisma.article.update({
      where: { id: a.id },
      data: {
        content: cleaned,
        wordCount: countWords(cleaned)
      }
    });
    console.log(`✅ Fixed ${slug}: removed ${countBefore} empty <h2> tags.`);
  }
}

async function fixBoilerplateStepsAndFaqs() {
  console.log('\n--- 4. Fixing repetitive boilerplate in 5 articles ---');
  const slugs = [
    'dascom-pos-printer-cash-drawer-not-opening',
    'dymo-labelwriter-printing-blank-labels-skipping',
    'fix-xerox-024-toner-codes-third-party-chips-developer-errors',
    'zebra-label-roll-guides-fanfold-linerless-printing-setup',
    'instax-link-wont-turn-on-charge-battery-fix'
  ];

  for (const slug of slugs) {
    const a = await prisma.article.findFirst({ where: { slug }, select: { id: true, content: true } });
    if (!a) continue;

    let content = a.content;

    // 1. In list items: remove the boilerplate suffix
    // Match <br>This step is critical... up to closing </li>
    content = content.replace(/<br>\s*This step is critical[\s\S]*?(?=<\/li>)/gi, '');

    // 2. In FAQ answers: remove the repetitive trailing sentence
    content = content.replace(/\s*This is a common question we receive[,.]?(?:\s*and understanding the nuance here is vital for long-term maintenance\.)?/gi, '');

    // 3. Fix double jargon if any (e.g. firmware (internal software) (internal software))
    content = content.replace(/firmware \(internal software\) \(internal software\)/gi, 'firmware (internal software)');

    await prisma.article.update({
      where: { id: a.id },
      data: {
        content,
        wordCount: countWords(content)
      }
    });
    console.log(`✅ Fixed ${slug}: cleaned step & FAQ repetitive boilerplate. New words: ${countWords(content)}`);
  }
}

async function main() {
  await fixBrotherFaq();
  await fixMeshPadding();
  await fixEmptyH2s();
  await fixBoilerplateStepsAndFaqs();
  console.log('\n🎉 All duplicate content fixes applied successfully!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
