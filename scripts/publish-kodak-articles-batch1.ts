import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const kodakBrandId = 'c5730c9d-dbad-4368-ad1c-9a44ecf890bc';
const errorCodesCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df'; // Error Codes & Alerts

// Authors
const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Kodak Printer Error Code 105-3513? How to Fix the Printhead",
    slug: 'kodak-printer-error-code-105-3513',
    seoTitle: "Kodak Printer Error Code 105-3513: Reseat & Fix Printhead",
    metaDescription: "Kodak printer error code 105-3513 showing printhead missing or loose? A repair tech explains how to snap it back in and clean the contacts.",
    excerpt: "Kodak printer error code 105-3513 is a clear indicator that your printhead is loose, missing, or dirty. Follow these technician tips to safely unlatch, clean, and snap the printhead back into place.",
    errorCode: '105-3513',
    tags: 'Kodak, Error 105-3513, Printhead, Carriage, Cleaning',
    wordCount: 630,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: errorCodesCategory,
    authorId: authors.marcus,
    reviewerId: authors.david,
    featuredImage: null, // Queued for AI image backfill campaign
    featuredImageAlt: 'Latching the printhead carriage inside an open Kodak ESP inkjet printer',
    featuredImageCaption: 'Kodak printer error code 105-3513 printhead reseating',
    featuredSnippet: 'Kodak printer error code 105-3513 indicates a connection failure between the carriage and printhead. To fix: 1) Open access door, remove ink cartridges, and unlatch the printhead. 2) Remove printhead and wipe the gold copper contacts on the back with a dry, lint-free cloth. 3) Reinstall printhead, pressing firmly until you hear a loud snap. 4) Reinsert inks and close door.',
    content: `<p>Kodak printer error code 105-3513 is one of the most common error messages on legacy ESP and Hero all-in-one models. It is a printhead registration fault, meaning the printer’s firmware cannot detect the printhead unit or detects that it has come loose from its carriage. Fortunately, this is usually a physical seating issue rather than a component failure, and it can often be cleared in a few minutes without tools.</p>

<h2>What Error 105-3513 Actually Means</h2>

<p>The printhead is the carriage component that houses the ink cartridges and contains the delicate nozzles that spray ink onto the paper. It connects to the printer via a row of gold-plated copper contacts on the back. Error 105-3513 triggers when these contacts lose connection, which can happen due to micro-vibrations over years of printing, a slight ink spill coating the contacts, or because the printhead latch wasn't fully snapped down after a cartridge swap.</p>

<p><strong>Why this matters:</strong> do not assume you need a new printhead right away. Reseating and cleaning the contacts resolves the vast majority of 105-series errors.</p>

<h2>Fix 1: Reseat the Printhead (The Snap Test)</h2>

<p>The most common cause of error 105-3513 is a printhead that has slightly shifted out of alignment. To reseat it:</p>
<ol>
  <li>Open the printer access door and wait for the carriage to glide to the center.</li>
  <li>Remove both the black and color ink cartridges and set them aside face-up.</li>
  <li>Locate the latch in the center of the carriage (on most ESP models) or press the button in the upper-left corner of the carriage (on older 5000-series models) to unlock the printhead.</li>
  <li>Lift the printhead out of the printer carriage.</li>
  <li>Reinstall the printhead: lower it back into the carriage slot, and push firmly against the target label on the printhead until you hear a <strong>loud, distinct snap</strong>. If you do not hear it snap, it is not fully seated.</li>
  <li>Click the ink cartridges back into place and close the printer door.</li>
</ol>

<p><strong>Why this works:</strong> the printhead requires substantial physical pressure to latch correctly. A gentle push might hold it in place temporarily, but it won't establish the precise contact needed for the electric signals to flow.</p>

<h2>Fix 2: Clean the Electrical Contacts</h2>

<p>If reseating does not clear the code, microscopic dust or ink mist may be blocking the electrical connection.</p>
<ol>
  <li>Remove the printhead again following the steps in Fix 1.</li>
  <li>Locate the gold contact pins on the back of the printhead, and the matching contacts inside the carriage assembly.</li>
  <li>Using a dry, lint-free microfiber cloth, gently wipe the gold contacts to remove any residue. Do not use water, alcohol, or abrasive cleaners, as these can permanently damage the copper traces.</li>
  <li>Reinstall the printhead, ensuring the snap sound occurs, reinsert the inks, and close the cover.</li>
</ol>

<p><strong>Why this works:</strong> cleaning removes invisible barriers like oil or dried ink that create electrical resistance between the carriage and the printhead contacts.</p>

<h2>Fix 3: Power Reset the Printer</h2>

<p>If the error persists, clear the printer's temporary cache memory to force it to re-detect the hardware.</p>
<ol>
  <li>With the printer turned on, pull the power cord directly out of the back of the machine.</li>
  <li>Unplug the power adapter from the wall outlet.</li>
  <li>Wait a full 60 seconds to allow the internal capacitors to discharge completely.</li>
  <li>Plug the power cord back into the wall (avoid surge protectors for this test) and reconnect it to the printer. Turn the printer on.</li>
</ol>

<h2>When to Call a Professional</h2>

<p>If you have reseated the printhead multiple times, cleaned the contacts, and performed a hard reset, but error 105-3513 refuses to clear, the printhead's internal circuitry has likely failed. Because Kodak has discontinued its inkjet printer lines, replacement parts are scarce. Weigh the cost of a refurbished printhead from third-party sellers against upgrading to a modern printer before purchasing a replacement.</p>`,
    faqs: JSON.stringify([
      { question: 'Does error 105-3513 mean I need to buy a new printhead?', answer: 'Not necessarily. A large majority of cases are caused by a loose latch or slightly dirty contact pins. Always try unlatching, wiping with a dry microfiber cloth, and snapping it back in firmly first.', order: 1 },
      { question: 'What does a loud snap mean during installation?', answer: 'It confirms the printhead carriage springs are fully compressed and the unit is securely latched. A quiet or soft insertion usually means the pins are not touching the circuit board.', order: 2 },
      { question: 'Can I clean the printhead with alcohol?', answer: 'No. Alcohol or liquid cleaning solutions can damage the carriage circuit board contacts. Stick to a dry, clean microfiber wipe.', order: 3 }
    ])
  }
];

async function main() {
  for (const article of articles) {
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
          brandId: kodakBrandId,
          categoryId: article.categoryId,
          authorId: article.authorId,
          reviewerId: article.reviewerId,
          reviewedAt: new Date(),
          featuredImage: article.featuredImage,
          featuredImageAlt: article.featuredImageAlt,
          featuredImageCaption: article.featuredImageCaption,
        }
      });
      console.log(`✅ Published: "${created.title}"`);
    } catch (e: any) {
      console.log(`⚠️ Error for "${article.title}": ${e.message}`);
    }
  }

  const total = await prisma.article.count({ where: { brandId: kodakBrandId } });
  console.log(`\nTotal Kodak articles now: ${total}`);
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
