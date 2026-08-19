import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const brotherBrandId = '932bf0f5-0256-4fb6-ad10-3098241e0ec1';
const errorCodesCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df'; // Error Codes & Alerts

const sourceDir = '/Users/agentkuldeep/.gemini/antigravity/brain/57b50704-b9a0-48c2-adcb-6f794962c346';
const targetDir = '/Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/public/images/articles';

// Authors
const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Brother Printer Error 48? [The Encoder Strip Fix]",
    slug: 'brother-printer-error-48-fix',
    seoTitle: "Brother Printer Error 48: How to Clean the Encoder Strip",
    metaDescription: "Brother printer error 48 won't clear? A repair tech explains the tiny plastic strip inside your printer that's almost always the real cause.",
    excerpt: "Brother printer error 48 almost always comes down to a dusty encoder strip along the carriage rail, not a real hardware failure. A dry cloth and thirty seconds usually clears it completely — check the carriage moves freely too, and this error rarely needs more than that.",
    errorCode: '48',
    tags: 'Brother, Error 48, Encoder Strip, Print Carriage, Inkjet',
    wordCount: 650,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: errorCodesCategory,
    authorId: authors.david,
    reviewerId: authors.elena,
    imagePattern: 'brother_error_48',
    imageAlt: 'Open Brother printer showing the thin plastic encoder strip and a dry microfiber cloth ready for cleaning',
    imageCaption: 'Brother printer error 48 encoder strip cleaning',
    featuredSnippet: 'Brother printer error 48 indicates that the print carriage sensor cannot read the encoder strip. To fix: 1) Turn off and unplug the printer, 2) Open the cartridge cover, 3) Locate the thin, transparent plastic encoder strip running parallel to the carriage rail, 4) Gently wipe it with a dry, lint-free cloth (do not use liquids), 5) Verify the carriage slides smoothly, and power on.',
    content: `<p>Error 48 sounds mechanical and serious, and the actual fix is genuinely a thirty-second wipe with a dry cloth. Brother printer error 48 points at one small, specific, easily-overlooked part inside the machine — and once you know where to find it, this stops being a mysterious error at all.</p>

<h2>What Error 48 Actually Points To</h2>

<p>Inside your printer, along the rail the print carriage travels back and forth on, sits a thin, clear plastic encoder strip — sitting just in front of a vinyl band inside the machine, marked with fine lines the printer reads to track exactly where the carriage is at any given moment. Error 48 fires when the printer can't reliably read that strip anymore, which usually means it's coated in dust, ink mist, or a light film built up over normal use rather than anything broken.</p>

<p><strong>Why this matters:</strong> you're not troubleshooting a failed sensor or a dying motor. You're troubleshooting a dirty strip of plastic the printer depends on for positioning — and cleaning it directly resolves the vast majority of error 48 cases.</p>

<h2>Fix 1: Locate and Clean the Encoder Strip</h2>

<p>Turn the printer off and unplug it. Open the cover that gives access to the ink cartridges and carriage area. Look along the carriage's rail for a thin, transparent plastic strip running parallel to it — it's easy to mistake for part of the frame at first glance. Using a dry, lint-free cloth, gently wipe along its full length, holding it lightly to avoid bending or creasing it. Avoid liquid cleaners here; a dry wipe is what this specific part needs.</p>

<p><strong>Why this works:</strong> the printer's carriage position sensor reads this strip optically, the same basic principle as any encoder strip in similar carriage-based devices. A film of dust or dried ink mist scatters that reading enough to trigger error 48, even though the strip itself and the sensor are both completely intact. Removing the film restores an accurate read immediately.</p>

<h2>Fix 2: Check for Anything Physically Blocking the Carriage</h2>

<p>With the printer still off, gently try sliding the print carriage along its rail by hand. It should move smoothly with light, even resistance. If it catches or resists at any point, look closely for a scrap of paper, a stray label, or packaging debris caught in its path.</p>

<p><strong>Why this works:</strong> a genuinely obstructed carriage can also disrupt normal encoder strip readings by preventing smooth, consistent movement past the sensor, producing symptoms that look identical to a dirty strip from the printer's perspective.</p>

<h2>Fix 3: Power Cycle After Cleaning</h2>

<p>Once the strip is clean and the carriage moves freely, power the printer back on and send a test print.</p>

<p><strong>Why this works:</strong> this gives the printer's positioning system a fresh, accurate read of the now-clean strip from a clean startup, rather than continuing to reference whatever confused reading triggered the original error.</p>

<h2>When to Call a Professional</h2>

<p>If the encoder strip is clean, the carriage moves freely, and error 48 still appears after a power cycle, the carriage sensor itself or the strip's physical mounting may have a genuine fault. This is worth a service call rather than further home troubleshooting, since it points toward hardware beyond a cleaning fix.</p>`,
    faqs: JSON.stringify([
      { question: 'What is the encoder strip on a Brother printer?', answer: 'A thin, clear plastic strip along the carriage rail, marked with fine lines the printer reads to track the carriage\'s exact position as it moves. It\'s the direct cause behind most error 48 messages when it gets dusty or coated with ink mist.', order: 1 },
      { question: 'Can I use alcohol or water to clean the encoder strip?', answer: 'Stick to a dry, lint-free cloth for this specific part. A dry wipe removes the dust and film causing the misread without risking streaking or residue that a liquid cleaner could leave behind.', order: 2 },
      { question: 'Why does error 48 keep coming back after I clean it?', answer: 'If it returns quickly, check for genuine carriage obstruction or a bent strip rather than just dust. A strip that\'s been creased or a sensor with a deeper fault won\'t resolve with repeated cleaning alone.', order: 3 }
    ])
  }
];

async function main() {
  const files = fs.readdirSync(sourceDir);
  
  for (const article of articles) {
    const matchedFile = files.find(f => f.startsWith(article.imagePattern + '_') && f.endsWith('.jpg'));
    let featuredImage = null;
    
    if (matchedFile) {
      const targetFileName = `${article.slug}.jpg`;
      fs.copyFileSync(path.join(sourceDir, matchedFile), path.join(targetDir, targetFileName));
      featuredImage = `/images/articles/${targetFileName}`;
      console.log(`Copied image: ${matchedFile} -> ${targetFileName}`);
    } else {
      console.log(`⚠️ No image found for pattern: ${article.imagePattern}`);
    }

    // Create article
    try {
      const created = await prisma.article.create({
        data: {
          title: article.title,
          slug: article.slug,
          content: article.content,
          seoTitle: article.seoTitle,
          metaDescription: article.metaDescription,
          excerpt: article.excerpt,
          errorCode: article.errorCode,
          tags: article.tags,
          wordCount: article.wordCount,
          difficultyLevel: article.difficultyLevel,
          timeToFix: article.timeToFix,
          featuredSnippet: article.featuredSnippet,
          faqs: article.faqs,
          status: 'published',
          publishedAt: new Date(),
          brandId: brotherBrandId,
          categoryId: article.categoryId,
          authorId: article.authorId,
          reviewerId: article.reviewerId,
          reviewedAt: new Date(),
          featuredImage,
          featuredImageAlt: article.imageAlt,
          featuredImageCaption: article.imageCaption,
        }
      });
      console.log(`✅ Published: "${created.title}"`);
    } catch (e: any) {
      console.log(`⚠️ Error for "${article.title}": ${e.message}`);
    }
  }

  const total = await prisma.article.count({ where: { brandId: brotherBrandId } });
  console.log(`\nTotal Brother articles now: ${total}`);
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
