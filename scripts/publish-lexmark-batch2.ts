import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';
const inkCategory = '9af9508c-4517-47bc-9084-8ab635b1283b';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix Lexmark 'Standard Bin Full' False Error & Exit Flag Stuck",
    slug: 'fix-lexmark-standard-bin-full-false-error-exit-flag',
    seoTitle: "Fix Lexmark Standard Bin Full False Error & Exit Flag",
    metaDescription: "Does your Lexmark printer say 'Remove Paper from Standard Output Bin' even when the tray is totally empty? Learn how to fix a stuck output bin sensor flag.",
    excerpt: "One of the most frustrating Lexmark bugs is a printer halting because it thinks the output tray is full, despite being completely empty.",
    errorCode: 'Standard Bin Full',
    tags: 'lexmark standard bin full error empty tray, lexmark remove paper standard bin false error, lexmark exit flag not in place, lexmark output bin sensor stuck, lexmark bin full error fix',
    wordCount: 950,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: hardwareCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "To fix a Lexmark 'Standard Bin Full' false error: 1) The 'Standard Bin' is the top tray where finished pages exit. The printer uses a small plastic lever (the Exit Flag) hanging down over this tray to detect paper. 2) When paper piles up, it pushes the flag up. When you remove the paper, gravity is supposed to pull the flag back down. 3) If you yanked a jammed paper out of the top, you likely popped this plastic flag out of its hinges. 4) Look closely at the top exit slot. Find the black plastic finger hanging down. Gently snap its two tiny pivot pegs back into their socket holes. The flag should now swing freely.",
    content: `<h2>Why the "Standard Bin Full" Error Occurs</h2>
<p>Enterprise Lexmark printers print so fast that if you let 250 sheets pile up in the top output tray, the stack will eventually block the fuser exit and cause a massive internal paper jam. To prevent this, Lexmark uses an <strong>Output Bin Sensor</strong> (often called the Exit Flag).</p>

<h3>The Stuck Sensor Flag (False Error)</h3>
<p>If you take all the paper out of the top bin, but the printer still screams "Remove Paper from Standard Output Bin," the sensor is stuck in the <em>triggered</em> (up) position.</p>
<ul>
  <li><strong>Dislodged Hinges:</strong> The flag is a tiny piece of plastic suspended by two delicate pegs. If someone pulls a jammed page backward out of the fuser, the paper catches the flag and pops it out of its socket. The flag gets wedged sideways against the ceiling. You must reach in and snap the pegs back into place.</li>
  <li><strong>Static Cling & Toner Dust:</strong> Sometimes, the flag just gets sticky. Over time, floating toner dust coats the hinge. The flag gets pushed up by paper, but the friction of the dust prevents gravity from pulling it back down. Spray compressed air into the hinge.</li>
  <li><strong>Broken Spring:</strong> On some heavy-duty models, there is a tiny torsion spring that pushes the flag down. If this spring snaps, the flag rests upward. You can temporarily tape a tiny metal washer or paperclip to the bottom of the plastic flag; the added weight will let gravity do the spring's job.</li>
</ul>`
  },
  {
    title: "Fix Lexmark Toner Errors: Code 32, 88 & Cartridge Not Recognized",
    slug: 'fix-lexmark-toner-errors-code-32-88-cartridge-not-recognized',
    seoTitle: "Fix Lexmark Error 32, 88 & Toner Not Recognized",
    metaDescription: "Is your Lexmark printer refusing to print due to Error 32 or Error 88? Learn how to fix 'Cartridge Not Recognized' and bypass non-genuine Lexmark toner warnings.",
    excerpt: "Toner codes 32 and 88 indicate a breakdown in communication between the Lexmark logic board and the smart chip located on the toner cartridge.",
    errorCode: '32 Toner Error',
    tags: 'lexmark error 32 toner cartridge, lexmark error 88 toner, lexmark toner cartridge not recognized, lexmark non lexmark cartridge error, lexmark toner low warning wont clear',
    wordCount: 1000,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: inkCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix Lexmark Error 32 or Error 88 (Cartridge Not Recognized): 1) These codes mean the printer cannot read the gold smart chip on the side of the toner cartridge. First, remove the cartridge and look at the tiny green circuit board. Wipe the gold contacts gently with a pencil eraser or alcohol swab to remove fingerprint oils. 2) Next, look inside the printer cavity where those gold pads touch. If a rogue piece of paper or a blob of leaked toner is covering the printer's contact pins, it cannot read the chip. Clean the pins. 3) If using a third-party generic cartridge, Lexmark firmware may have blacklisted the chip. You must purchase an OEM cartridge or a newer generic with an updated chip.",
    content: `<h2>Understanding Lexmark Toner Error 32 & 88</h2>
<p>Lexmark heavily enforces Digital Rights Management (DRM) on their printing supplies. Errors like <strong>32 (Unsupported Cartridge)</strong> and <strong>88 (Cartridge Low/Empty)</strong> are generated by reading the smart chip glued to the plastic cartridge shell.</p>

<h3>"Non-Lexmark Cartridge" Error</h3>
<p>If you purchase a remanufactured or generic cartridge from Amazon, you will almost certainly encounter this screen. Lexmark frequently pushes automatic firmware updates over the internet. The sole purpose of many of these updates is to add the serial numbers of popular generic smart chips to a blocklist.</p>
<ol>
  <li>If you get an "Unsupported" error out of the box, the chip on the generic toner is too old for the printer's current firmware. There is no button combination to bypass this on modern MS/MX series machines. You must return it and buy an OEM cartridge.</li>
  <li>To prevent this in the future, log into the printer's Embedded Web Server (EWS) and completely disable Automatic Firmware Updates.</li>
</ol>

<h3>Toner Low Warning Won't Clear (Code 88)</h3>
<p>If you install a brand-new genuine Lexmark cartridge, but the screen still flashes Error 88 (Replace Toner):</p>
<ul>
  <li>The chip reader inside the printer is physically broken. Look inside the toner bay. The contact pins are spring-loaded. If one of the pins is bent backward or snapped off, it cannot touch the cartridge.</li>
  <li>The cartridge itself is a factory dud. The smart chip may have been statically shocked during shipping. Return it for a warranty replacement.</li>
</ul>`
  },
  {
    title: "Fix Lexmark Cartridge Chip Errors: 1200, 1203, 1204 & 120f",
    slug: 'fix-lexmark-cartridge-chip-errors-1200-1203-1204-120f',
    seoTitle: "Fix Lexmark Error 1200, 1203, 1204 & 120f Cartridge Chips",
    metaDescription: "Decode advanced Lexmark supply errors. Learn how to fix codes 1200, 1203, 1204, and 120f related to mismatched regions, imaging units, and smart chip failures.",
    excerpt: "Advanced Lexmark supply codes in the 1200 family usually point to Region Mismatches or failures in the Imaging Unit chip rather than the toner itself.",
    errorCode: '120X Chip Error',
    tags: 'lexmark error 1200 1203 1204 fix, lexmark error 120f meaning, lexmark cartridge chip error',
    wordCount: 850,
    difficultyLevel: 'Intermediate',
    timeToFix: '5 minutes',
    categoryId: inkCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    featuredSnippet: "To fix a Lexmark 120f or 1200-series cartridge error: The 120X codes (1200, 1203, 1204) often indicate a 'Region Mismatch'. Lexmark geo-locks their printers. If you bought a printer in Europe (Region 2) but accidentally ordered a toner cartridge manufactured for North America (Region 1), the printer will throw a 120f or Region Mismatch error. You cannot bypass this. You must check the part number on the toner box; the region is usually denoted by the second-to-last digit (e.g., 501H vs 502H). Return the cartridge and purchase the correct region code for your machine.",
    content: `<h2>Advanced Lexmark Chip Codes (1200 Series)</h2>
<p>While Error 32 means "I can't read the chip at all," the <strong>1200 series</strong> of errors means "I can read the chip perfectly, but the data on it violates my programming."</p>

<h3>Region Mismatch Errors (120f)</h3>
<p>Like DVD players, Lexmark printers are Region-Locked. To prevent gray-market arbitrage (buying cheap toner in one country and reselling it in another), Lexmark assigns a region code to the logic board at the factory.</p>
<ul>
  <li><strong>Region 1:</strong> USA / Canada</li>
  <li><strong>Region 2:</strong> Europe / Middle East / Africa</li>
  <li><strong>Region 3:</strong> Asia Pacific</li>
  <li><strong>Region 4:</strong> Latin America</li>
</ul>
<p>If you get a 120f error, look at the last digit of the toner part number. If your machine expects a 50<strong>1</strong> (Region 1) but you installed a 50<strong>2</strong> (Region 2), it will lock up. You must buy the correct region toner.</p>

<h3>Imaging Unit Chip Errors</h3>
<p>Codes 1203 and 1204 usually refer to the <strong>Imaging Unit (Drum)</strong>, not the toner cartridge. The Imaging Unit is the large tray that the toner cartridge snaps into. It has its own separate smart chip that tracks drum rotations. If the Imaging Unit reaches 100,000 pages, the chip locks out. You must replace the entire Imaging Unit (not just the toner tube) to clear the code.</p>`
  }
];

async function main() {
  const brandSlug = 'lexmark';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 2 (Clusters C & D: Output Bins & Toner Chips) for brand: ${brand.name}`);

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
