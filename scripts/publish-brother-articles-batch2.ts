import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const brotherBrandId = '932bf0f5-0256-4fb6-ad10-3098241e0ec1';
const errorCodesCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df'; // Error Codes & Alerts
const scanningCategory = '773cb788-7cd5-4a7b-93d9-5e1c8448aa7a'; // Scanning Issues
const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f'; // Hardware & Maintenance

const sourceDir = '/Users/agentkuldeep/.gemini/antigravity/brain/3ac9eeeb-02cb-4176-b1a6-586aed1faecc';
const targetDir = '/Users/agentkuldeep/.gemini/antigravity/scratch/printer-kb-cms/public/images/articles';

// Authors - rotate writer/reviewer pairs so they're always different
const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: 'Brother MFC Scanner Error E52? What It Means',
    slug: 'brother-mfc-scanner-error-e52',
    seoTitle: 'Brother MFC Scanner Error E52: What It Means & How to Fix',
    metaDescription: 'Brother MFC scanner error E52? Learn what it means, how to check the ADF, power cycle, update firmware, and when to call a professional.',
    excerpt: 'Brother MFC scanner error E52 points specifically at the scanner assembly, not the print engine. Check the document feeder for obstruction first, then power cycle and confirm firmware is current.',
    errorCode: 'E52',
    tags: 'Brother, MFC, Scanner, Error E52, ADF',
    wordCount: 610,
    difficultyLevel: 'Intermediate',
    timeToFix: '15-30 minutes',
    categoryId: scanningCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    imagePattern: 'brother_scanner_e52',
    imageAlt: 'Brother MFC multifunction printer with ADF feeder open showing a scanner error',
    imageCaption: 'Brother MFC scanner error E52 troubleshooting',
    featuredSnippet: 'Brother MFC scanner error E52 indicates a fault in the scanner assembly, not the print engine. To fix: 1) Check the ADF for jammed paper or debris, 2) Power cycle by unplugging for 60 seconds, 3) Check for firmware updates, 4) Enter maintenance mode for specific diagnostic codes.',
    content: `<p>Brother MFC scanner error E52 is a scanner-specific fault code that appears on multifunction models. It indicates a problem detected within the scanner assembly itself — separate from the print engine — and understanding that distinction narrows your troubleshooting considerably.</p>

<h2>What Error E52 Actually Means</h2>

<p>E52 is a general scanner assembly fault code on Brother's multifunction (MFC) printers. It indicates that the scanner's internal monitoring has detected an issue — this could involve the scanner motor, a sensor, or a mechanical obstruction in the feed path. Importantly, this is separate from the print engine: toner, drum, and fuser are unrelated systems.</p>

<h2>Fix 1: Check the Automatic Document Feeder for Obstruction</h2>

<p>If your model has an ADF (automatic document feeder), open it and check for any jammed paper, a torn scrap, or debris caught in the feed mechanism, checking both the top and underside of the feed path.</p>

<p><strong>Why this works:</strong> a physically obstructed scanner feed path is one of the more straightforward causes of a scanner-related fault, and it's often invisible from a quick glance at the closed feeder — opening it fully to check is worth doing before assuming anything more serious.</p>

<h2>Fix 2: Full Power Cycle</h2>

<p>Turn the printer off, unplug it from the wall for a full 60 seconds, then reconnect and power back on.</p>

<p><strong>Why this works:</strong> this gives the scanner's internal monitoring system a genuine fresh start, clearing a transient glitch that a simple power-button restart doesn't always fully reset.</p>

<h2>Fix 3: Check for a Pending Firmware Update</h2>

<p>Through the printer's network settings or Brother's support site for your exact model, check for and install any available firmware update.</p>

<p><strong>Why this works:</strong> scanner-related firmware bugs on multifunction models do get addressed in updates over a printer's supported lifetime, and a machine running older firmware may simply lack a fix for the specific issue triggering this error.</p>

<h2>Fix 4: Enter Maintenance Mode for the Specific Internal Code</h2>

<p>If E52 persists, enter maintenance mode for your exact model to see whether a more specific internal diagnostic code accompanies the general E52 message.</p>

<p><strong>Why this works:</strong> the more specific code, if your model displays one, narrows down exactly which part of the scanner system is flagged, which is considerably more useful information than the general E52 label alone if you end up needing professional help.</p>

<h2>When to Call a Professional</h2>

<p>If the ADF is confirmed clear, a power cycle doesn't resolve it, and firmware is current, E52 likely points toward a genuine scanner assembly fault — a motor, sensor, or connection issue inside that unit. This is a component-level repair worth professional diagnosis, and if you were able to retrieve a more specific internal code through maintenance mode, bring that detail with you.</p>`,
    faqs: JSON.stringify([
      { question: 'Does E52 mean my whole printer is broken, or just the scanner?', answer: 'Just the scanner side, on multifunction models. The print engine — toner, drum, fuser — is a separate system, and E52 specifically indicates a fault detected within the scanner assembly.', order: 1 },
      { question: 'Can I still print if I\'m seeing E52?', answer: 'Often yes, since printing and scanning use largely separate systems on multifunction machines. If printing works normally while E52 persists, that confirms the fault is isolated to the scanner specifically.', order: 2 },
      { question: 'Is this worth checking the ADF for even if I mostly use the flatbed glass?', answer: 'Yes — check it regardless of which scanning method you typically use, since an obstruction there can still trigger the scanner system\'s internal fault detection even if you weren\'t actively using the feeder at the time.', order: 3 }
    ])
  },
  {
    title: 'Brother Machine Error Maintenance Mode: What It Actually Shows You',
    slug: 'brother-machine-error-maintenance-mode',
    seoTitle: 'Brother Maintenance Mode: How to Enter & What Error Codes Mean',
    metaDescription: 'Confused by Brother\'s maintenance mode message during an error? A repair tech explains what it is, how to enter it, and why it matters.',
    excerpt: 'Brother machine error maintenance mode is the diagnostic layer sitting behind every simplified error message your printer shows. Learn to enter it for your specific model to get the actual internal error code.',
    errorCode: null,
    tags: 'Brother, Maintenance Mode, Diagnostics, Error Codes, Service Menu',
    wordCount: 640,
    difficultyLevel: 'Advanced',
    timeToFix: '10 minutes',
    categoryId: hardwareCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    imagePattern: 'brother_maintenance_mode',
    imageAlt: 'Brother laser printer LCD display showing maintenance mode diagnostic screen with error codes',
    imageCaption: 'Brother printer maintenance mode diagnostic screen',
    featuredSnippet: 'To enter Brother maintenance mode: unplug the printer completely, hold down the Menu/Set button (or Start on simpler models), plug the power cord back in while holding the button, and keep holding until a maintenance-specific message appears. This reveals the specific internal error code behind simplified external messages.',
    content: `<p>Almost every specific numbered error covered elsewhere on this site — 46, 48, 50, 51, and the rest — sits behind one shared diagnostic layer: maintenance mode. If you've seen this term appear during troubleshooting and weren't sure what it actually is or why you'd want to enter it deliberately, this explains the whole system in one place.</p>

<h2>What Maintenance Mode Actually Is</h2>

<p>The messages your Brother printer shows during normal operation — "Unable to Clean," "Unable to Print," general error banners — are simplified, external-facing labels. Underneath them sits a more specific internal diagnostic code that maintenance mode reveals directly. It's essentially the printer's own hidden service menu, built for technicians but fully accessible to anyone who knows the entry sequence for their specific model.</p>

<p><strong>Why this matters:</strong> the external message alone often isn't specific enough to troubleshoot accurately. "Unable to Clean" could mean several different things internally, and maintenance mode is how you find out which one you're actually dealing with, rather than guessing from a vague label.</p>

<h2>How to Enter Maintenance Mode</h2>

<p>The exact sequence varies by model and control panel type, but the general pattern is consistent: unplug the printer completely, hold down a specific button (commonly Menu/Set, or Start on simpler button-only models), and plug the power cord back in while continuing to hold that button. Keep holding until a maintenance-specific message appears on the display, distinct from the printer's normal startup screen.</p>

<p><strong>Why this works:</strong> holding the button through power-on interrupts the printer's normal boot sequence and routes it into this diagnostic layer instead, revealing internal codes and options that never appear during regular use.</p>

<h2>What You'll Find Once You're In</h2>

<p>Inside maintenance mode, you'll typically see the specific internal error code behind whatever general message prompted you to look — the real number, distinct from the simplified external label. Depending on your model, you may also find options like counter resets (for toner, drum, or purge counts) and other diagnostic functions, though these vary considerably between models and product generations.</p>

<p><strong>Why this matters:</strong> this is exactly how counter resets for errors like 46 (purge count) work — you're not guessing at a fix, you're using the same internal tools Brother's own service technicians would use, just made accessible directly to you.</p>

<h2>A Word of Caution</h2>

<p>Maintenance mode gives you access to settings that go beyond normal user controls, and using the wrong sequence, or navigating incorrectly once inside, can affect settings you didn't intend to touch. Confirm the exact steps for your specific model before entering, rather than guessing at a sequence you've seen referenced for a different machine.</p>

<p><strong>Why this matters:</strong> the button combinations and available options genuinely differ across Brother's product lines — a sequence that works on one model can do something unexpected, or simply nothing at all, on another.</p>

<h2>When to Call a Professional</h2>

<p>If you've entered maintenance mode correctly and found an internal code you can't identify, or if a reset performed inside maintenance mode doesn't resolve your original issue, this is a reasonable point to involve Brother support or a technician directly — you now have the specific internal code to give them, which considerably speeds up getting real help.</p>`,
    faqs: JSON.stringify([
      { question: 'Is maintenance mode safe to use on my own?', answer: 'Generally yes, as long as you follow the correct entry sequence and reset steps for your exact model rather than guessing. It\'s designed to be accessible, not exclusively for technicians.', order: 1 },
      { question: 'Why doesn\'t the printer just show me the real error code normally?', answer: 'The simplified external messages are meant to be understandable at a glance during everyday use. Maintenance mode exists specifically to expose the more technical, specific detail underneath when you actually need it.', order: 2 },
      { question: 'Does entering maintenance mode reset any of my settings automatically?', answer: 'No — simply entering maintenance mode doesn\'t change anything on its own. Changes only happen if you deliberately navigate to and trigger a specific reset or option once inside.', order: 3 }
    ])
  },
  {
    title: 'Brother Printer Error 40 (Overheating)? What to Do',
    slug: 'brother-printer-error-40-overheating',
    seoTitle: 'Brother Printer Error 40 Overheating Fix | What to Do',
    metaDescription: 'Brother printer error 40 overheating warning? A repair tech explains why this is protection, not failure, and when to actually worry.',
    excerpt: 'Brother printer error 40 (overheating) is protection working as intended, not a failure to fix. Let the printer cool undisturbed, check its surroundings for excess heat, and break up large print jobs.',
    errorCode: '40',
    tags: 'Brother, Error 40, Overheating, Temperature, Fuser',
    wordCount: 590,
    difficultyLevel: 'Beginner',
    timeToFix: '15-30 minutes',
    categoryId: errorCodesCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    imagePattern: 'brother_error_40_overheat',
    imageAlt: 'Brother laser printer in a warm office environment showing an overheating warning on its screen',
    imageCaption: 'Brother printer error 40 overheating warning',
    featuredSnippet: 'Brother printer error 40 means the printer\'s internal temperature has exceeded its safe operating range. To fix: 1) Leave it powered on for 15-30 minutes to cool naturally, 2) Check room temperature and ventilation around the printer, 3) Break large print jobs into smaller batches with pauses between them.',
    content: `<p>Brother printer error 40 is the mirror image of the "too cold" error — instead of running too cool, the printer's internal temperature has climbed past what it considers safe, and it's stopping itself before that becomes a real problem rather than just a warning.</p>

<h2>What Error 40 Actually Means</h2>

<p>Internal components, especially the fuser, generate real heat during normal operation, and Brother printers monitor this closely because running too hot risks component damage, poor print quality, or in rare cases, a genuine safety concern. Error 40 is the printer pausing operation specifically to let that internal temperature come back down to a safe range.</p>

<p><strong>Why this matters:</strong> this is almost always a temporary, self-resolving protective pause — not a sign of a broken part — and understanding that distinction saves you from unnecessary troubleshooting on a printer that's doing exactly what it's supposed to do.</p>

<h2>Fix 1: Let It Cool Down Undisturbed</h2>

<p>Leave the printer powered on but don't attempt to print again immediately. Give it 15 to 30 minutes to cool naturally, especially if this followed a large, sustained print job.</p>

<p><strong>Why this works:</strong> the internal temperature genuinely needs time to drop, and this happens on its own as long as you're not continuing to push print jobs through during the cooldown. Most error 40 situations resolve completely with nothing more than patience.</p>

<h2>Fix 2: Check the Room Temperature and Ventilation</h2>

<p>Confirm the printer isn't sitting somewhere unusually warm — direct sunlight, next to a heating vent, or in an enclosed space with poor airflow around it.</p>

<p><strong>Why this works:</strong> a printer working normally can still trigger this error if its surrounding environment is already hot, since it has less margin before hitting its internal limit. Moving it to a cooler spot with better airflow around its vents addresses the actual contributing factor rather than just waiting out one occurrence.</p>

<h2>Fix 3: Reduce Print Job Size for Heavy Sessions</h2>

<p>If this error tends to appear specifically during long, continuous print runs, split large jobs into smaller batches with a short rest between them going forward.</p>

<p><strong>Why this works:</strong> sustained heavy printing is exactly what pushes internal temperature toward its limit fastest, and giving the printer brief pauses between large batches keeps it comfortably under that threshold rather than repeatedly bumping against it.</p>

<h2>When to Call a Professional</h2>

<p>If error 40 appears during light, ordinary use with no large print jobs involved, or if it doesn't clear even after a genuine cooldown period, an internal temperature sensor or cooling-related component may have a real fault. That's worth professional diagnosis rather than continuing to wait it out.</p>`,
    faqs: JSON.stringify([
      { question: 'Is error 40 dangerous?', answer: 'No — it\'s the printer\'s protective system working correctly, stopping operation before internal temperature becomes a genuine problem. The error itself is the safety feature functioning, not a sign of danger.', order: 1 },
      { question: 'How long should I wait before trying to print again?', answer: 'Give it 15 to 30 minutes minimum, longer if it followed an unusually large print job. Attempting to print again too soon can simply trigger the same protective pause.', order: 2 },
      { question: 'Why does this happen more in summer or in a warm room?', answer: 'Because the printer\'s own internal heat is added on top of an already warmer starting point, giving it less room before hitting its limit. Cooler surroundings and good airflow around the printer meaningfully reduce how often this happens.', order: 3 }
    ])
  },
  {
    title: 'Brother Printer Error 49? Why It\'s Too Cold to Print',
    slug: 'brother-printer-error-49-too-cold',
    seoTitle: 'Brother Printer Error 49: Too Cold to Print? What to Do',
    metaDescription: 'Brother printer error 49 telling you it\'s too cold? A repair tech explains why laser printers have a minimum temperature and what to do.',
    excerpt: 'Brother printer error 49 means it\'s too cold to run safely. Give it time in a normal-temperature room, and if this keeps happening, it\'s telling you something real about where the printer lives.',
    errorCode: '49',
    tags: 'Brother, Error 49, Cold, Temperature, Environment',
    wordCount: 590,
    difficultyLevel: 'Beginner',
    timeToFix: '30-60 minutes',
    categoryId: errorCodesCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    imagePattern: 'brother_error_49_cold',
    imageAlt: 'Brother laser printer sitting in a cold room near a frosty window showing a temperature error',
    imageCaption: 'Brother printer error 49 - too cold to print',
    featuredSnippet: 'Brother printer error 49 means the room or the printer itself is too cold for safe operation. To fix: 1) Leave the printer powered on in a normal room-temperature space for 30-60 minutes, 2) Move it away from cold areas like unheated garages or drafty windows, 3) Don\'t power on immediately after moving from a cold environment to avoid condensation.',
    content: `<p>Brother printer error 49 is one of the more literal errors your machine can display: it's genuinely telling you the room, or the printer itself, is too cold for it to operate safely. This isn't a malfunction to troubleshoot — it's a built-in protection working exactly as designed.</p>

<h2>What Error 49 Actually Means</h2>

<p>Laser printers rely on toner that needs to be within a specific temperature range to behave correctly during the fusing process, and running a cold printer risks poor fusing, internal condensation, or genuine damage to components not designed to operate below a certain temperature. Error 49 is your printer refusing to run until conditions warm up enough to do so safely.</p>

<p><strong>Why this matters:</strong> there's no setting to override this, and you shouldn't want to — it's protecting the printer, and forcing it to run cold risks a worse problem than waiting a few minutes.</p>

<h2>Fix 1: Let the Printer Sit and Warm Up</h2>

<p>If the printer has recently come from a cold environment — shipped in winter, stored in an unheated garage, or sitting in a cold room overnight — leave it powered on in a normal room-temperature space for at least 30 minutes to an hour before trying again.</p>

<p><strong>Why this works:</strong> this gives the printer's internal components genuine time to reach a safe operating temperature naturally, rather than forcing operation before it's actually ready, which is exactly the risk this error exists to prevent.</p>

<h2>Fix 2: Check Where the Printer Is Actually Located</h2>

<p>If this error happens repeatedly rather than as a one-time event, consider whether the printer's regular location is genuinely too cold for consistent operation — an unheated room, near a drafty window, or a garage or basement without climate control.</p>

<p><strong>Why this works:</strong> a printer that throws this error occasionally in winter but never in warmer months is telling you something real about its environment, not experiencing a random malfunction. Moving it to a consistently heated space is the permanent fix, not something to work around repeatedly.</p>

<h2>Fix 3: Avoid Powering On Immediately After Moving It</h2>

<p>If you've just brought the printer in from a cold car or a cold storage space, don't power it on right away — let it sit unplugged in a normal-temperature room for a while first.</p>

<p><strong>Why this works:</strong> a cold printer powering on immediately can also risk condensation forming inside as it warms unevenly, which is a separate concern from the temperature error itself but worth avoiding for the same underlying reason — cold electronics need time to acclimate before running.</p>

<h2>When to Call a Professional</h2>

<p>This almost never requires professional service — error 49 is a protective response, not a hardware fault. If it appears in a genuinely normal-temperature room with no reasonable explanation, a temperature sensor inside the printer may be misreading, which would be worth checking with support.</p>`,
    faqs: JSON.stringify([
      { question: 'Can I just ignore error 49 and print anyway?', answer: 'No — there\'s no way to override it, and you shouldn\'t want to. It\'s protecting the printer from operating in conditions that could cause real damage or poor output.', order: 1 },
      { question: 'How long should I wait before trying again?', answer: 'At least 30 minutes to an hour in a normal room-temperature space, longer if the printer came from a genuinely cold environment like an unheated garage or a cold vehicle.', order: 2 },
      { question: 'Why does this only happen in winter for me?', answer: 'That pattern is your printer accurately reflecting its environment. If it\'s consistently too cold where the printer sits during colder months, moving it to a heated space is the real fix, not repeatedly waiting it out.', order: 3 }
    ])
  }
];

async function main() {
  const files = fs.readdirSync(sourceDir);
  
  for (const article of articles) {
    // Copy image
    const matchedFile = files.find(f => f.startsWith(article.imagePattern + '_') && f.endsWith('.jpg'));
    let featuredImage = null;
    
    if (matchedFile) {
      const targetFileName = `${article.slug}.jpg`;
      fs.copyFileSync(path.join(sourceDir, matchedFile), path.join(targetDir, targetFileName));
      featuredImage = `/images/articles/${targetFileName}`;
      console.log(`Copied image: ${matchedFile} -> ${targetFileName}`);
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
