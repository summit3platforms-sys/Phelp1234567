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
    title: "Brother Printer Error 46 (Unable to Clean)? Real Fix",
    slug: 'brother-printer-error-46-unable-to-clean',
    seoTitle: "Brother Printer Error 46: Unable to Clean? Real Fix Guide",
    metaDescription: "Brother printer error 46 'Unable to Clean'? A repair tech explains what's really full inside your printer, and the fix that doesn't cost a service call.",
    excerpt: "Brother printer error 46 (Unable to Clean) is almost always a full internal purge counter, not a dead printer. Check the real code in maintenance mode, reset the counter for your specific model, and only consider a physical pad replacement if the error returns fast or you see actual ink inside the machine.",
    errorCode: '46',
    tags: 'Brother, Error 46, Unable to Clean, Ink Absorber, Maintenance Mode, Purge Counter',
    wordCount: 700,
    difficultyLevel: 'Advanced',
    timeToFix: '15-20 minutes',
    categoryId: errorCodesCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    imagePattern: 'brother_error_46',
    imageAlt: 'Open Brother printer showing the saturated ink absorber pad being checked by a technician',
    imageCaption: 'Brother printer error 46 ink absorber pad inspection',
    featuredSnippet: 'Brother printer error 46 or "Unable to Clean" indicates the internal purge counter has hit its maximum limit (usually 6,400 purges), locking the printer. To fix: 1) Enter maintenance mode by holding Menu/Set while plugging in the power, 2) Look for the purge counter value, 3) Reset the purge counter to zero using your model\'s specific code sequence, 4) Restart the printer to resume normal operation.',
    content: `<p>"Unable to Clean" is a strange way to describe what's actually wrong, and it's exactly why Brother printer error 46 confuses so many owners. Your printer isn't struggling to clean anything on the outside. It's telling you an internal counter has run out of room, and once you understand what that counter is tracking, the fix stops feeling like a mystery.</p>

<h2>What Error 46 Actually Means</h2>

<p>Every time your Brother inkjet runs a cleaning cycle — automatically or because you triggered one — it purges a small amount of ink through the print head and into an internal ink absorber pad, a sponge-like component that catches this waste ink so it doesn't leak inside the machine. The printer counts every purge internally, and once that count reaches its built-in limit (commonly cited around 6,400 cycles), it assumes the absorber pad is full and locks itself out of further cleaning to prevent an overflow. That lockout is what you're seeing as error 46.</p>

<p><strong>Why this matters:</strong> the pad might not actually be full. The printer is going by a counter, not a sensor reading actual saturation, so a printer that's run a lot of cleaning cycles over its life can hit this limit even if the pad has some capacity left. This is exactly why a counter reset, not a physical replacement, clears the error for a meaningful share of people.</p>

<h2>Fix 1: Check the Real Internal Code First</h2>

<p>The on-screen "Unable to Clean" message is a general external label — the actual internal fault code behind it can vary. Enter maintenance mode to see the specific number: unplug the printer, hold down the Menu/Set button (or Start button on models without a Menu/Set key), plug the power back in while still holding the button, and keep holding until a maintenance message appears on the display.</p>

<p><strong>Why this works:</strong> maintenance mode shows you Brother's internal diagnostic code directly, rather than the simplified message shown during normal operation. If you land on a genuine "Machine Error 46," you're dealing with the purge counter specifically, and the reset below applies. A different internal code points somewhere else entirely, and you'd want to search that specific number instead.</p>

<h2>Fix 2: Reset the Purge Counter</h2>

<p>From maintenance mode, the reset sequence varies by model — machines with a numeric fax keypad typically use a specific key combination (often involving the Menu/Set key plus a short number sequence), while simpler button-only models use a different combination of Scan, Copy, or arrow keys pressed together. Check your exact model's reset sequence before attempting this, since the wrong sequence in maintenance mode can affect other settings.</p>

<p><strong>Why this works:</strong> this directly zeroes the internal counter the printer is using to decide the pad is full, letting normal operation resume immediately without touching anything physical inside the machine. For a printer where the pad genuinely still has capacity left, this is a complete, permanent fix — not a temporary workaround.</p>

<h2>Fix 3: Know When You Genuinely Need the Pad Replaced</h2>

<p>If you've reset the counter and error 46 returns within a short stretch of normal use, or if you notice actual ink leaking inside the printer when you open it, the absorber pad may be genuinely saturated. Replacing it means partially disassembling the printer to access and swap the pad — a real repair job, not a settings change.</p>

<p><strong>Why this matters:</strong> be honest with yourself about which situation you're in. A printer that's thrown this error once after years of light use is very likely a counter limit, not a soaked pad. A printer that's run heavy cleaning cycles constantly, or shows visible ink pooling, is more likely facing a genuine full pad.</p>

<h2>When to Call a Professional</h2>

<p>If a counter reset doesn't hold, or you see actual ink inside the printer's housing, this becomes a physical repair rather than a maintenance-mode fix. Weigh the cost of professional pad replacement against your printer's age and a new unit's price — on an older consumer inkjet, replacement often makes more financial sense than a teardown repair.</p>`,
    faqs: JSON.stringify([
      { question: 'Does error 46 mean my Brother printer is broken?', answer: 'Not usually. It most often means an internal purge counter has hit its limit, not that a critical part has failed. A counter reset resolves it for many owners.', order: 1 },
      { question: 'Is it safe to reset the counter myself?', answer: 'Yes, if you follow the correct sequence for your exact model. Using the wrong maintenance mode sequence can affect unrelated settings, so confirm your model\'s specific steps first.', order: 2 },
      { question: 'Will error 46 come back after I reset it?', answer: 'It can, especially if the absorber pad is genuinely saturated rather than just counter-limited. If it returns quickly after a reset, that\'s your signal the pad needs physical attention.', order: 3 }
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
