import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix Xerox Imaging Drum Codes: 091, 092 & 093 Errors",
    slug: 'fix-xerox-imaging-drum-codes-091-092-093-errors',
    seoTitle: "Fix Xerox Imaging Drum Codes: 091, 092 & 093 Errors",
    metaDescription: "Does your Xerox show a 091, 092, or 093 fault code? Learn how to replace the imaging unit (drum), fix premature drum errors, and check replacement costs.",
    excerpt: "Codes starting with 091, 092, and 093 point to the Xerox imaging subsystem. Learn how to diagnose a failing photoreceptor drum and clear replacement alerts.",
    errorCode: '091-092-093 Drum Error',
    tags: 'xerox drum replacement alert, xerox imaging unit error 092, xerox drum error before replacement due, xerox drum kit cost guide, xerox printer 093 error meaning',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: errorCategory,
    authorId: authors.alex,
    reviewerId: authors.elena,
    featuredSnippet: "To fix Xerox 091, 092, or 093 Imaging Drum errors: 1) The 092 fault code (e.g., 092-310) means the CTD (Color Toner Density) sensor is dirty or the imaging drum has reached the end of its life. Open the front door and pull out the drum unit. 2) Look for a small plastic wand (the cleaning rod) attached to the inside of the door. Slide this wand in and out of the designated slot under the drum 4-5 times to clean the laser window. 3) If the error occurs 'before replacement due', a power surge may have corrupted the drum's smart chip. You must replace the drum. Genuine Xerox drum kits typically cost between $150 and $300 depending on the model.",
    content: `<h2>Understanding Xerox Imaging Codes (091-093)</h2>
<p>The imaging unit (often called the drum, photoreceptor, or simply 'R1-R4' in Xerox manuals) is responsible for drawing the image using a laser before the toner is applied. When it fails, you get <strong>091, 092, or 093</strong> fault codes.</p>

<h3>091 Codes: Charge Corotron</h3>
<p>The Corotron applies a massive blanket of static electricity (up to 5,000 volts) to the drum. If a 091 code appears, the high-voltage power supply has shorted, or the corotron wire is snapped. This usually requires replacing the drum cartridge entirely.</p>

<h3>092 Codes: CTD Sensor & Toner Density</h3>
<p>The 092 chain usually means the printer cannot properly measure how much toner is sticking to the drum.</p>
<ul>
  <li>This is almost always caused by a dirty laser window or CTD (Color Toner Density) sensor.</li>
  <li><strong>The Fix:</strong> Open the front cover. Look for a long, thin plastic wand with a sponge on the tip (the cleaning rod). Insert it fully into the 3 or 4 marked slots beneath the drum units and pull it out several times. This wipes the glass laser lenses clean.</li>
</ul>

<h3>093 Codes: Waste Toner</h3>
<p>As the drum spins, a small rubber blade scrapes leftover toner off the belt and dumps it into a Waste Toner Bottle. A 093 code means the waste bottle is completely full and the auger can no longer spin. Do not try to empty it in the trash—it is highly toxic and will create a massive cloud. Simply buy a new $30 waste bottle.</p>

<h2>Drum Error "Before Replacement Due"</h2>
<p>Xerox drums are rated for a specific number of pages (e.g., 60,000 pages). If the printer demands a replacement at 30,000 pages, the drum's physical surface has likely been scratched by a staple left in a piece of recycled paper, causing a permanent streak. The logic board detects the constant streak and fails the drum early. You must replace it.</p>`
  },
  {
    title: "Fix Xerox 010 Paper Jams, Duplex Errors & Door Jams",
    slug: 'fix-xerox-010-paper-jams-duplex-errors-door-jams',
    seoTitle: "Fix Xerox 010 Paper Jam Errors: Door A, B, C & Duplex",
    metaDescription: "Is your Xerox flashing a 010 paper jam code? Learn how to clear jams in Door A, B, and C, fix phantom 'no paper found' jams, and troubleshoot duplex errors.",
    excerpt: "The 010 chain represents the paper transport system. Learn how to locate hidden torn paper in the duplex module and fix phantom sensor jams.",
    errorCode: '010 Paper Jam',
    tags: 'xerox paper jam error 010, xerox printer jam door a b c, xerox paper transport error fix, xerox printer jam no paper found, xerox printer tray error code, xerox duplex jam error',
    wordCount: 1000,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: hardwareCategory,
    authorId: authors.marcus,
    reviewerId: authors.david,
    featuredSnippet: "To fix a Xerox 010 Paper Jam (or phantom 'no paper found' jam): 1) The 010 fault code chain points to the physical paper path. Follow the screen's diagram to open Door A, B, or C. 2) Phantom Jams: If you open the door and see absolutely no paper, a tiny optical sensor flag (a small black plastic lever) is likely stuck in the 'down' position. Check the paper path for a tiny scrap of torn paper holding the lever down. 3) Duplex Jams: If the printer only jams when printing double-sided, pull the entire paper tray out. Look inside the dark cavity of the printer; the duplex reversal path is often located underneath the fuser.",
    content: `<h2>Understanding Xerox 010 Paper Jams</h2>
<p>Every fault code starting with <strong>010</strong> indicates a mechanical stoppage in the paper feed path. Xerox printers are highly modular, dividing the paper path into specific labeled zones (usually Doors A, B, and C).</p>

<h3>Decoding the Doors</h3>
<ul>
  <li><strong>Door A (Left or Right Side):</strong> Usually the main transport path leading from the paper trays up toward the imaging drum. If a jam happens here, the rubber feed rollers in the paper tray (Tray Error) may be bald and slipping.</li>
  <li><strong>Door B (Fuser/Exit):</strong> Located near the top or side. This is the fuser exit. Paper here is extremely hot. Pull it slowly to avoid tearing it, as removing melted toner paper from a fuser is very difficult.</li>
  <li><strong>Door C (Duplex/Reversal):</strong> If the printer needs to print double-sided, it pulls the paper back inside through Door C to flip it over.</li>
</ul>

<h2>Fixing Phantom "No Paper Found" Jams</h2>
<p>If the printer insists there is a jam in Door A, but you have opened it five times and there is nothing there:</p>
<ol>
  <li>The printer does not actually "see" the paper. It uses tiny spring-loaded plastic levers (sensor flags). When paper hits the lever, it pushes it down, triggering an optical eye.</li>
  <li>If you yanked a jammed piece of paper out forcefully yesterday, a tiny corner of that paper may have torn off and wedged itself under the plastic lever, holding it permanently down.</li>
  <li>The logic board thinks a giant sheet of paper is stuck there. Get a flashlight and a pair of tweezers. Look closely along the plastic guide ribs for a tiny scrap of white paper and remove it.</li>
</ol>

<h2>Tray Errors & Feed Rollers</h2>
<p>If the 010 error occurs before the paper even leaves the cassette, pull the tray entirely out of the machine. Look up into the ceiling of the slot. You will see three rubber tires on a shaft. If these tires are smooth, gray, and dusty, they cannot grip the paper. Scrub them with a damp cloth, or order a $20 feed roller replacement kit.</p>`
  },
  {
    title: "Fix Xerox 077 Finisher Errors: Stapler Jams & Sorter Faults",
    slug: 'fix-xerox-077-finisher-errors-stapler-jams-sorter-faults',
    seoTitle: "Fix Xerox 077 Finisher Errors: Stapler & Sorter Jams",
    metaDescription: "Does your Xerox display a 077-xxx code? Learn how to troubleshoot the external Office Finisher, clear staple jams, and fix sorting tray elevator faults.",
    excerpt: "The 077 fault chain is reserved entirely for external finishing accessories. Learn how to fix staple jams, hole-punch errors, and sorter tray faults.",
    errorCode: '077 Finisher Error',
    tags: 'xerox stapler error code 077, xerox finisher jam fix, xerox printer sorter error',
    wordCount: 850,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: hardwareCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "To fix a Xerox 077 Finisher or Stapler Error: The 077 fault chain means the external accessory attached to the side of the printer (the Office Finisher) has failed. 1) Stapler Jam: Open the front door of the finisher. Pull out the stapler cartridge (it usually has a green handle). Lift the metal tab on the cartridge to expose the staple track. Use pliers to pull out the mangled staple blocking the exit. 2) Sorter Error: The output trays move up and down on a motorized elevator track. If you place a heavy box on the tray, or push down on it while it's printing, you will strip the elevator gears, triggering a 077 sorter fault.",
    content: `<h2>Understanding Xerox 077 Finisher Codes</h2>
<p>The <strong>077</strong> fault chain only appears on large, floor-standing WorkCentre or AltaLink models that have a dedicated Finisher attached to the output side of the machine. If the printer cannot staple, hole-punch, or stack the paper, it will throw a 077 error.</p>

<h3>Fixing Stapler Jams (077-909)</h3>
<p>If the printer prints the document perfectly but halts before stapling, the staple cartridge is jammed.</p>
<ol>
  <li>Open the front door of the Finisher unit (not the main printer).</li>
  <li>Locate the stapler head. It usually has a prominent green handle or release lever.</li>
  <li>Pull the staple cartridge out of the machine.</li>
  <li>Look at the nose of the cartridge. You will see a small metal lever marked with a green arrow. Lift this lever up.</li>
  <li>This opens the firing track. You will almost certainly see a crumpled, flattened staple stuck in the jaws. Remove it with a pair of needle-nose pliers.</li>
  <li>Snap the track closed and push the cartridge back in. The printer will automatically cycle a few blank staples to test the mechanism.</li>
</ol>

<h2>Fixing Sorter Tray Errors</h2>
<p>Advanced finishers have multiple output trays that act as an elevator, moving up and down to catch large stacks of paper without them spilling onto the floor.</p>
<ul>
  <li><strong>The Problem:</strong> The elevator motor is very sensitive. If an employee leans their hand on the tray while talking, or places a heavy box of paper on the tray, the motor detects the resistance and throws a 077 error to prevent the gears from stripping.</li>
  <li><strong>The Fix:</strong> Clear any obstructions below the tray. Turn the printer OFF, unplug the heavy umbilical cable connecting the finisher to the main printer, wait 30 seconds, plug it back in, and turn the printer on. The tray will perform a "home seek" operation, moving to the top and bottom limits to recalibrate its position.</li>
</ul>`
  }
];

async function main() {
  const brandSlug = 'xerox';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 3 (Clusters E, F, G: Drums, Jams & Finishers) for brand: ${brand.name}`);

  for (const article of articles) {
    try {
      await prisma.article.deleteMany({ where: { slug: article.slug } });
    } catch (e) {}

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
          status: 'published',
          publishedAt: new Date(),
          brandId: brand.id,
          categoryId: article.categoryId,
          authorId: article.authorId,
          reviewerId: article.reviewerId,
          reviewedAt: new Date(),
        }
      });
      console.log(`✅ Published: "${created.title}"`);
    } catch (e: any) {
      console.log(`⚠️ Error for "${article.title}": ${e.message}`);
    }
  }
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
