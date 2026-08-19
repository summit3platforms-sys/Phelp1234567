import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const brotherBrandId = '932bf0f5-0256-4fb6-ad10-3098241e0ec1';
const errorCodesCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df'; // Error Codes & Alerts
const paperHandlingCategory = '9a42c554-2b4f-47f8-887e-5996fb83cbad'; // Paper Handling Issues

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
    title: "Brother Error Code E50 vs E51: What's the Difference?",
    slug: 'brother-error-code-e50-vs-e51-difference',
    seoTitle: "Brother Error Code E50 vs E51: What's the Difference?",
    metaDescription: "Confused between Brother error codes E50 and E51? A repair tech explains the distinction and why exact meanings can shift by model.",
    excerpt: "Brother error codes E50 and E51 point at genuinely different components — the fuser and the laser unit respectively — not two versions of the same problem. Know which one you're facing before troubleshooting, since the right first steps differ meaningfully between them.",
    errorCode: 'E50, E51',
    tags: 'Brother, Error E50, Error E51, Fuser, Laser Unit, Diagnostics',
    wordCount: 630,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: errorCodesCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    imagePattern: 'brother_e50_vs_e51',
    imageAlt: 'Brother laser printer diagram highlighting the fuser unit and laser unit assembly components',
    imageCaption: 'Brother error code E50 vs E51 component comparison',
    featuredSnippet: 'Brother error code E50 indicates a fuser unit fault (heating/power issue), while E51 indicates a laser unit fault (position/reseating issue). To fix E50: power cycle directly from the wall. To fix E51: remove and reseat the toner/drum assembly and ensure the cover latches securely.',
    content: `<p>E50 and E51 look nearly identical on screen, one digit apart, and it's genuinely easy to assume they're minor variations of the same problem. They're not — they point at two different components entirely, and mixing them up means troubleshooting the wrong part of the machine.</p>

<h2>The Core Difference</h2>

<p>On most current Brother laser printers and multifunction units, E50 relates to the fuser unit — the component that heats and bonds toner permanently onto paper — while E51 relates to the laser unit, the component responsible for drawing the image onto the drum before toner is even applied. These are two entirely separate systems doing different jobs at different stages of the print process, and a fault in one doesn't imply anything about the other.</p>

<p><strong>Why this matters:</strong> treating E51 as "basically the same as E50" and troubleshooting the fuser when the laser system is actually flagged (or the reverse) wastes time chasing the wrong component.</p>

<h2>A Note on Model Variation</h2>

<p>Brother's E-series codes aren't perfectly identical across every product generation and line — some older or business-class multifunction models use overlapping number ranges for genuinely different purposes than current consumer laser printers do. If your exact model's documentation or display gives a description alongside the code, trust that specific wording over a general guide, since it reflects what that particular machine's firmware actually assigns to that number.</p>

<p><strong>Why this matters:</strong> rather than assuming E50 and E51 mean the exact same thing on every Brother machine ever made, treat the fuser/laser distinction as the reliable general pattern for current consumer and small-office laser models, while double-checking your specific unit's own documentation if anything seems inconsistent with that.</p>

<h2>What to Do for E50 (Fuser-Related)</h2>

<p>Start with a full power cycle — off, unplugged for 60 seconds, then back on — and connect the printer directly to a wall outlet rather than a surge protector or power strip, since fuser-related faults are sometimes tied to power delivery rather than genuine component failure. Give the printer time to cool if it just finished a large job before retesting.</p>

<p><strong>Why this works:</strong> these steps address the most common non-hardware causes of a fuser-related fault before you consider it a genuine part failure.</p>

<h2>What to Do for E51 (Laser-Related)</h2>

<p>Start by reopening the printer, removing and firmly reseating the toner and drum assembly, and confirming the cover latches fully closed on both sides. This error shows up disproportionately often right after a cartridge change, and reseating resolves the majority of those specific cases.</p>

<p><strong>Why this works:</strong> the laser system's normal operation depends on the drum and toner assembly sitting in an exact position, and an improperly seated assembly or a cover that isn't fully latched can trigger this error without the laser component itself being faulty at all.</p>

<h2>When to Call a Professional</h2>

<p>If the appropriate fixes above for your specific code don't resolve it, both E50 and E51 can indicate genuine component failure requiring professional replacement — the fuser for E50, the laser unit for E51. These are different parts with different costs, so knowing which one you're actually dealing with before calling for service or ordering a part saves you from the wrong purchase.</p>`,
    faqs: JSON.stringify([
      { question: 'Are E50 and E51 both serious errors?', answer: 'Both can indicate genuine hardware faults, but each has non-hardware causes worth ruling out first — power delivery issues for E50, seating and cover-latch issues for E51.', order: 1 },
      { question: 'Can I fix either of these myself?', answer: 'The preliminary checks (power cycling, reseating, direct wall connection) are safe to try yourself. Actual component replacement, especially for the laser unit, is a more involved repair better suited to a professional.', order: 2 },
      { question: 'Why do some sources describe E50 and E51 differently than this?', answer: 'Brother\'s exact code assignments can vary slightly across product generations and lines. This fuser/laser distinction reflects the pattern for current consumer and small-office laser printers — check your specific model\'s own documentation if something seems inconsistent.', order: 3 }
    ])
  },
  {
    title: "Brother Printer Error 35? What the Number Range Tells You",
    slug: 'brother-printer-error-35-fix',
    seoTitle: "Brother Printer Error 35 stuck on screen? How to Fix It",
    metaDescription: "Brother printer error 35 stuck on screen? A repair tech explains what this specific jam-family number tells you about where to look.",
    excerpt: "Brother printer error 35 belongs to a jam-code family, and knowing that narrows your search meaningfully. Check the main paper path first, then the rear and duplex areas if needed, and always pull stuck paper forward in its feed direction — pulling backward is how a simple jam turns into a persistent sensor problem.",
    errorCode: '35',
    tags: 'Brother, Error 35, Paper Jam, Diagnostics, Troubleshooting',
    wordCount: 640,
    difficultyLevel: 'Intermediate',
    timeToFix: '10-15 minutes',
    categoryId: paperHandlingCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    imagePattern: 'brother_error_35',
    imageAlt: 'Brother printer rear access panel open checking for paper jams',
    imageCaption: 'Brother printer error 35 paper jam troubleshooting',
    featuredSnippet: 'Brother printer error 35 indicates a paper jam detected within a specific section of the paper path. To fix: 1) Open the front cover, remove toner/drum, and clear main path, 2) Open rear access cover/duplex tray to check for hidden paper, 3) Gently pull caught paper in the feed direction (never backward), 4) Power cycle.',
    content: `<p>Brother groups its paper jam errors into a numbered range rather than one single code, and where your specific number falls inside that range is genuinely useful information — it points you toward a particular zone inside the machine instead of leaving you to search the entire paper path blind.</p>

<h2>What Error 35 Actually Means</h2>

<p>Errors in the 30 through 36 range on Brother printers all indicate some form of paper jam, but they're not identical — each specific number within that range corresponds to a different physical location or stage in the paper's path through the machine. Error 35 falling within this family tells you a jam has been detected, and knowing it's specifically 35 rather than 30 or 33 is a clue toward which section to check first, even though the printer's own display doesn't spell that mapping out for you directly.</p>

<p><strong>Why this matters:</strong> rather than blindly opening every panel and hunting everywhere at once, you can work through the paper path in the order paper actually travels, checking the areas most consistent with a jam at this stage of the family range first.</p>

<h2>Fix 1: Check the Main Paper Path First</h2>

<p>Open the front cover and remove the toner and drum assembly to get a clear, unobstructed view down the main paper path. Look closely for any torn paper, folded corners, or debris caught between rollers, running your fingers gently along accessible sections where a scrap might be hiding out of direct sight.</p>

<p><strong>Why this works:</strong> the majority of jam-family errors originate somewhere along this main path, and clearing the toner and drum assembly out of the way gives you the clearest possible view to find and remove what's actually stuck.</p>

<h2>Fix 2: Check the Rear and Duplex Areas</h2>

<p>If the main path looks clear, open the rear access panel (and the duplex tray, if your model has one) and check there specifically, since jams in these rear sections don't always show from the front.</p>

<p><strong>Why this works:</strong> not every jam sits in the obvious front-facing path. Paper that's partway through a rear exit or a duplex (two-sided printing) pass can trigger a jam error while remaining invisible from the front cover alone, and this is a commonly missed spot on a first pass.</p>

<h2>Fix 3: Pull Stuck Paper in Its Feed Direction, Never Backward</h2>

<p>If you find paper caught mid-path, pull it gently in the direction it was already traveling through the machine, not backward toward where it entered.</p>

<p><strong>Why this works:</strong> pulling backward against the normal feed direction risks damaging internal sensors that detect paper position, which can leave you with a phantom jam error that persists even after every scrap of paper is genuinely gone — turning a simple jam into a more complicated, sensor-level problem.</p>

<h2>When to Call a Professional</h2>

<p>If you've thoroughly checked the main path, the rear panel, and any duplex tray, and error 35 persists with no paper or debris found anywhere, a jam sensor may be stuck rather than genuinely detecting paper. This is worth professional attention rather than continued searching for paper that isn't actually there.</p>`,
    faqs: JSON.stringify([
      { question: 'Is error 35 more serious than other jam-family codes on Brother printers?', answer: 'Not necessarily more serious — it simply points toward a different stage or location in the paper path than other numbers in the same jam-error family. The severity comes down to what\'s actually causing it, not the specific number itself.', order: 1 },
      { question: 'Why should I check the rear panel if the jam seems to be near the front?', answer: 'Because jams in the duplex or rear exit path aren\'t always visible from the front cover, and error 35 specifically can originate from areas that require checking beyond the obvious main path.', order: 2 },
      { question: 'I found and removed paper but error 35 won\'t clear. What now?', answer: 'Confirm you pulled it in the paper\'s natural feed direction rather than backward, since backward removal can damage a jam sensor and leave a phantom error even after the paper is gone. If that\'s not it, professional inspection is the next step.', order: 3 }
    ])
  },
  {
    title: "Brother Printer Error 30 (Unable to Print)? Quick Fix",
    slug: 'brother-printer-error-30-unable-to-print',
    seoTitle: "Brother Printer Error 30: Unable to Print? How to Fix",
    metaDescription: "Brother printer error 30 or \"Unable to Print\"? A repair tech explains where to look inside the machine and why lifting the scanner matters.",
    excerpt: "Brother printer error 30 (Unable to Print) is almost always a physical obstruction, not a broken component. Lift the scanner cover fully, search thoroughly for anything small that shouldn't be there, and a power cycle after clearing it usually gets you printing again immediately.",
    errorCode: '30',
    tags: 'Brother, Error 30, Unable to Print, Mechanical Obstruction, Flatbed',
    wordCount: 600,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: errorCodesCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    imagePattern: 'brother_error_30',
    imageAlt: 'Brother printer with scanner cover fully raised showing the inner print carriage area',
    imageCaption: 'Brother printer error 30 physical obstruction search',
    featuredSnippet: 'Brother printer error 30 or "Unable to Print" is caused by a physical mechanical block. To fix: 1) Fully raise and lock the scanner cover, 2) Perform a detailed, corner-to-corner visual check for foreign objects (clips, staples, paper scraps), 3) Clear the obstruction and fully close the cover, 4) Restart the printer.',
    content: `<p>Brother printer error 30, shown as "Unable to Print," is a mechanical stop sign — something is physically preventing normal movement inside the machine, and in nearly every case it's smaller and simpler than the alarming message makes it sound.</p>

<h2>What Error 30 Actually Means</h2>

<p>This error signals a mechanical malfunction somewhere in the printer's normal operation, most commonly caused by something physically stuck where it shouldn't be — a paper clip, a torn scrap of paper, a stray label, or any small foreign object interfering with internal movement. It's rarely a sign of a genuinely broken part on its own.</p>

<p><strong>Why this matters:</strong> the fix is almost always a physical search, not a settings change or a reset.</p>

<h2>Fix 1: Lift the Scanner Cover Fully</h2>

<p>Using both hands, lift the scanner cover into its fully open position until it locks and stays open on its own support, rather than just tilting it partway. This gives you clear access to look down into the internal mechanism beneath, which a partially raised cover won't expose.</p>

<p><strong>Why this works:</strong> most people check the obvious paper path — trays, output area — and miss the internal area only visible with the scanner cover fully raised and supported. A lot of what triggers error 30 is hiding exactly there, out of sight during a quick glance.</p>

<h2>Fix 2: Search Thoroughly for Foreign Objects</h2>

<p>With the cover fully open, look carefully along the visible mechanism for anything that doesn't belong — a paper clip, staple, torn label backing, or paper scrap. Check corners and edges specifically, not just the center of your view, since small objects tend to end up pushed to one side rather than sitting in plain sight.</p>

<p><strong>Why this works:</strong> even something as small as a paper clip can physically block a moving part enough to trigger this error, and it's often small enough to miss on a fast look. A deliberate, corner-to-corner search is what actually finds it.</p>

<h2>Fix 3: Power Cycle After Clearing Anything</h2>

<p>Once you've removed any object you find, close the scanner cover fully until it clicks, then power the printer off and back on.</p>

<p><strong>Why this works:</strong> this gives the printer a fresh start to confirm its internal path is genuinely clear, rather than continuing to display an error state that was set before you removed the obstruction.</p>

<h2>When to Call a Professional</h2>

<p>If you've thoroughly checked with the scanner cover fully raised and found nothing, and error 30 persists after a power cycle, this points toward a genuine mechanical fault rather than an obstruction — worth professional diagnosis rather than continued searching.</p>`,
    faqs: JSON.stringify([
      { question: 'What kind of objects typically cause error 30?', answer: 'Small things people don\'t expect to find inside a printer — paper clips, staples, torn label backing, or scraps of paper from a previous jam. Anything metal or oddly shaped is worth checking for specifically.', order: 1 },
      { question: 'Do I need to fully open the scanner cover, or is a quick look enough?', answer: 'Fully open and locked. A partial lift doesn\'t expose the internal area where most obstructions causing this error actually sit, so a quick glance often misses the actual cause.', order: 2 },
      { question: 'Will error 30 go away on its own if I just restart the printer?', answer: 'Only if the underlying obstruction is already gone. A restart without actually finding and removing the physical cause typically brings the same error right back.', order: 3 }
    ])
  },
  {
    title: "Brother Printer Error 51 (Laser Unit)? Check This First",
    slug: 'brother-printer-error-51-laser-unit',
    seoTitle: "Brother Printer Error 51 (Laser Unit) Troubleshooting Guide",
    metaDescription: "Brother printer error 51 laser unit error? A repair tech explains why this usually isn't the laser at all, and the real cause to check first.",
    excerpt: "Brother printer error 51 (laser unit) is worth treating as a reseating problem first, not a hardware failure — especially if it appeared right after a cartridge change. Reinstall the toner and drum assembly carefully, confirm the cover is fully latched, and a genuine laser fault only becomes the likely explanation once those simple checks don't resolve it.",
    errorCode: '51',
    tags: 'Brother, Error 51, Laser Unit, Reseating, Maintenance',
    wordCount: 660,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: errorCodesCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    imagePattern: 'brother_error_51',
    imageAlt: 'Brother laser printer front cover open showing drum unit being slid inside',
    imageCaption: 'Brother printer error 51 laser unit troubleshooting',
    featuredSnippet: 'Brother printer error 51 indicates a laser unit registration or system issue, but is most commonly caused by improper seating. To fix: 1) Reopen front cover, remove the toner and drum assembly, and slide it back in straight until it clicks, 2) Confirm both sides of front cover are latched securely, 3) Perform a full 60-second power cycle.',
    content: `<p>"Laser unit" sounds like a component you can't do anything about yourself, and that's exactly why Brother printer error 51 causes more panic than it should. In my experience, this error shows up most often right after someone changes a toner cartridge — and the actual cause is almost never the laser itself.</p>

<h2>What Error 51 Actually Means</h2>

<p>The laser unit inside your Brother printer is responsible for drawing the image onto the drum before toner ever gets applied, and error 51 fires when the printer detects something wrong with that system's normal operation. But here's the pattern worth knowing: this error is disproportionately common right after a cartridge change, and in that specific timing, it's almost always about how the cartridge or the cover was reseated, not a genuinely failed laser component.</p>

<p><strong>Why this matters:</strong> if this happened right after you opened the printer for any reason, start with reseating before assuming you need a repair.</p>

<h2>Fix 1: Reopen and Properly Reseat Everything</h2>

<p>Open the front cover fully, remove the toner and drum assembly completely, and reinstall it — making sure it slides in straight and clicks fully into its seated position, not just resting partway in. Close the cover firmly until you feel and hear it latch on both sides, not just the middle.</p>

<p><strong>Why this works:</strong> the laser unit's beam path and related sensors depend on the drum and toner assembly sitting in an exact position, and a cover that's not fully latched, or an assembly that's sitting even slightly crooked, can trigger error 51 even though the laser component itself is completely fine. This single fix resolves the majority of error 51 cases that appear right after a cartridge swap.</p>

<h2>Fix 2: Full Power Cycle</h2>

<p>Turn the printer off, unplug it from the wall for a full 60 seconds, then plug back in and power on.</p>

<p><strong>Why this works:</strong> this clears a temporary confused state in the printer's internal monitoring, giving it a genuine fresh read on the laser system rather than continuing to display an error that was triggered by a momentary glitch during the last power-on sequence.</p>

<h2>Fix 3: Check the Cover Latches Specifically</h2>

<p>Even if the cover looks closed, press firmly on both front corners to confirm it's genuinely latched on each side, not just appearing shut.</p>

<p><strong>Why this works:</strong> several Brother models won't allow the laser system to operate normally with the cover in anything but a fully confirmed closed state, as a safety measure — a cover that's closed on one side but not fully seated on the other can produce exactly this error with no other symptom pointing you toward the actual cause.</p>

<h2>When to Call a Professional</h2>

<p>If you've reseated the toner and drum assembly, confirmed the cover is genuinely latched on both sides, and performed a full power cycle — and error 51 still appears, particularly if it wasn't triggered by a recent cartridge change at all — a genuine laser unit fault becomes the more likely explanation. This is a component-level repair, not something to attempt at home; get a repair quote and weigh it against your printer's age and a replacement unit's cost before committing.</p>`,
    faqs: JSON.stringify([
      { question: 'Why does error 51 always seem to happen after I change the toner?', answer: 'Because the most common trigger isn\'t the laser failing — it\'s the toner and drum assembly, or the cover, not being fully reseated after the change. Reopening and reinstalling everything carefully resolves this in most cases.', order: 1 },
      { question: 'Is the laser unit something I can replace myself?', answer: 'It\'s a more involved repair than a toner or drum swap, and on most consumer Brother models it isn\'t designed as a simple user-replaceable part the way toner and drum units are. This is better handled by a professional if reseating doesn\'t resolve it.', order: 2 },
      { question: 'Could a firmware issue cause error 51 instead of a hardware problem?', answer: 'It\'s less common than a seating issue, but checking for an available firmware update through Brother\'s support site is a reasonable step if reseating and a power cycle don\'t clear the error.', order: 3 }
    ])
  },
  {
    title: "Brother Printer Error 50 (Fuser Unit)? What to Do",
    slug: 'brother-printer-error-50-fuser-unit',
    seoTitle: "Brother Printer Error 50 Fuser Unit: Troubleshooting & Fixes",
    metaDescription: "Brother printer error 50 fuser unit warning? A repair tech explains what this actually means and the checks to run before replacing anything.",
    excerpt: "Brother printer error 50 points at the fuser unit, but a genuine failure is only one of several possible causes. Power cycle properly, connect directly to the wall, and give a hot printer time to cool before assuming you need a replacement part.",
    errorCode: '50',
    tags: 'Brother, Error 50, Fuser Unit, Overheating, Power Cycle',
    wordCount: 680,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: errorCodesCategory,
    authorId: authors.marcus,
    reviewerId: authors.david,
    imagePattern: 'brother_error_50',
    imageAlt: 'Unplugging a Brother printer directly from the wall outlet to power cycle',
    imageCaption: 'Brother printer error 50 fuser unit power cycle check',
    featuredSnippet: 'Brother printer error 50 indicates a fuser unit temperature anomaly. To fix: 1) Unplug the printer for a full 60 seconds to reset temperature monitoring, 2) Plug directly into a wall outlet (avoid power strips which limit current), 3) Let the printer cool for 15-20 minutes, 4) Check rear panel for fuser area obstructions.',
    content: `<p>The fuser is the part of your laser printer that permanently bonds toner to paper using heat, and Brother printer error 50 is the machine telling you something's off with that specific component. Before you assume the worst, there's a real order of checks worth running, because this error covers a range of possible causes, not all of which mean the fuser itself has failed.</p>

<h2>What Error 50 Actually Means</h2>

<p>Your printer's fuser has to reach and hold a precise operating temperature to work correctly, and it monitors this closely because a fuser running too hot or too cold — or one that isn't heating at the expected rate — creates both quality problems and a genuine safety concern. Error 50 fires when the fuser's temperature reading falls outside what the printer expects, which can stem from a temporary glitch, a power delivery issue, or a genuinely failing heating element inside the unit.</p>

<p><strong>Why this matters:</strong> treating this as an automatic "buy a new fuser" signal skips several free, fast checks that resolve a real share of error 50 cases without spending anything.</p>

<h2>Fix 1: Full Power Cycle</h2>

<p>Turn the printer off, unplug it from the wall completely, and wait a full 60 seconds before plugging back in and powering on.</p>

<p><strong>Why this works:</strong> this clears a transient temperature-reading glitch that a simple power-button restart doesn't always fully reset, giving the fuser's monitoring system a genuine fresh start rather than continuing from whatever confused state triggered the error.</p>

<h2>Fix 2: Plug Directly Into the Wall</h2>

<p>If the printer is running through a surge protector, power strip, or extension cord, connect it directly to a wall outlet instead and test again.</p>

<p><strong>Why this works:</strong> the fuser draws a significant burst of current the moment it starts heating, and some surge protectors and power strips limit or smooth current flow in ways that can interfere with that demand, producing exactly the kind of temperature-reading inconsistency error 50 describes — without anything inside the fuser actually being broken.</p>

<h2>Fix 3: Let It Cool, Then Retest</h2>

<p>If the printer has just finished a large, sustained print job, give it 15 to 20 minutes to cool completely before powering back on and testing again.</p>

<p><strong>Why this works:</strong> a fuser that's been running hard for an extended stretch can briefly report a temperature reading outside normal range as it's cooling, and this settles on its own with time — testing immediately after heavy use risks catching the fuser mid-transition rather than in a genuinely faulty state.</p>

<h2>Fix 4: Check for Obstruction Near the Fuser</h2>

<p>With the printer powered off and the area confirmed cool, open the rear access panel if your model has one, and check for any paper scraps or debris near the fuser rollers specifically.</p>

<p><strong>Why this works:</strong> debris resting against the fuser can interfere with its normal heat cycling and produce a related temperature fault, and clearing it removes a physical cause that has nothing to do with the fuser's own internal health.</p>

<h2>When to Call a Professional</h2>

<p>If you've power cycled properly, confirmed a direct wall connection, allowed cooldown time, and checked for obstruction — and error 50 persists or returns consistently — the fuser's heating element has likely genuinely failed. Fusers are a normal wear item on laser printers and are sold as standalone replacement parts for most Brother models. Search your exact model plus "fuser unit replacement" to check part cost, and weigh that against the price of a comparable new printer before committing, particularly on an older machine.</p>`,
    faqs: JSON.stringify([
      { question: 'Does error 50 always mean I need a new fuser?', answer: 'No. A meaningful share of error 50 cases clear with a proper power cycle, a direct wall connection, or letting the printer cool after heavy use. Genuine fuser failure is the explanation only after those checks don\'t resolve it.', order: 1 },
      { question: 'Can a power strip really cause a fuser error?', answer: 'Yes. The fuser demands a real current spike to heat up, and some surge protectors and power strips limit that flow enough to produce exactly this kind of temperature-related fault.', order: 2 },
      { question: 'Is the fuser a part I can replace myself?', answer: 'On most Brother laser models, yes — it\'s designed as a user-replaceable part, sold individually. Check your specific model\'s service documentation for the exact removal and installation steps before attempting it.', order: 3 }
    ])
  }
];

async function main() {
  const files = fs.readdirSync(sourceDir);
  
  for (const article of articles) {
    // Find dynamic filename for this article
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
