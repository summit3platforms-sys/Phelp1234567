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
    title: "Xerox Error Code Format Explained: How to Read XXX-YYY Faults",
    slug: 'xerox-error-code-format-explained-how-to-read-xxx-yyy-faults',
    seoTitle: "Xerox Error Code Format Explained: XXX-YYY Fault Codes",
    metaDescription: "Demystify Xerox error codes. Learn how to read the XXX-YYY fault code format on VersaLink and WorkCentre printers, and what the first three digits mean.",
    excerpt: "Xerox printers use a very specific six-digit XXX-YYY fault code system. Understanding the first three digits is the key to identifying the broken component instantly.",
    errorCode: 'XXX-YYY Fault',
    tags: 'xerox error code format explained, how to read xerox fault codes, xerox error code first three digits meaning, xerox printer fault code lookup guide, xerox versalink vs workcentre error codes',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: errorCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredSnippet: "How to read Xerox Error Codes (XXX-YYY): The first three digits (XXX) represent the hardware subsystem or chain. For example: 010 (Paper Transport/Jams), 016 (Network/Software), 024 (Toner/Developer), 042 (Fuser), 077 (Finisher/Stapler), and 092 (Imaging Drum). The second three digits (YYY) represent the specific sensor or software flag that failed within that subsystem. By looking at the first three digits, you can instantly know if you need to check the network settings, replace a drum, or clear a paper jam.",
    content: `<h2>The Xerox Chain-Link Fault Code System</h2>
<p>Unlike HP or Brother printers which often display vague text warnings like "Paper Jam" or generic alphanumeric strings, Xerox Enterprise printers (including the VersaLink, AltaLink, and WorkCentre lines) use a highly structured diagnostic system called the <strong>Chain-Link</strong> code (Format: <code>XXX-YYY</code>).</p>

<h3>What the First Three Digits Mean (The Chain)</h3>
<p>The first three digits identify the physical subsystem (or "Chain") where the error occurred. If you memorize the most common chains, you can diagnose a Xerox machine from across the room:</p>
<ul>
  <li><strong>010:</strong> Paper Transport. This indicates a physical paper jam somewhere between the paper tray and the exit roller.</li>
  <li><strong>016:</strong> Network and Software. This indicates a failure to communicate with a PC, a DNS error, or a scan-to-email configuration failure.</li>
  <li><strong>024:</strong> Toner and Developer. This indicates a missing toner cartridge, an unrecognized third-party chip, or an empty developer tank.</li>
  <li><strong>041 / 042 / 053:</strong> Fuser and Transfer Belt. These are high-heat, high-voltage components. 042 specifically points to the fuser failing to reach target temperature.</li>
  <li><strong>077:</strong> Finisher. Errors with the external stapler, hole-puncher, or output sorter trays.</li>
  <li><strong>091 / 092 / 093:</strong> Imaging Systems. This points to the Drum (Photoreceptor), Charge Corotron, or waste toner bottle.</li>
</ul>

<h3>VersaLink vs WorkCentre Error Codes</h3>
<p>While the user interfaces drastically changed between the older WorkCentre models and the newer tablet-like VersaLink/AltaLink models, the underlying <code>XXX-YYY</code> logic board architecture remains identical. A 010-333 paper jam on a 10-year-old WorkCentre means the exact same sensor is blocked on a brand new VersaLink.</p>

<h2>How to Look Up a Specific Code</h2>
<p>Because there are thousands of specific <code>YYY</code> suffix codes, you should always type the exact six-digit code into the Xerox Support knowledge base or this site's search bar. A 010-100 error might mean "Tray 1 empty," while a 010-200 error might mean "Fuser exit sensor blocked."</p>`
  },
  {
    title: "Fix Xerox 041, 042 & 053 Codes: Fuser & Transfer Belt Errors",
    slug: 'fix-xerox-041-042-053-codes-fuser-transfer-belt-errors',
    seoTitle: "Fix Xerox 041, 042 & 053 Codes: Fuser & Transfer Errors",
    metaDescription: "Does your Xerox display a 042-326 fuser error, a 041 code, or a 053 transfer belt error? Learn how to clear overheating faults and replace the fuser unit.",
    excerpt: "Codes starting with 041, 042, and 053 indicate a critical failure in the Xerox high-voltage transfer belt or the extreme-heat fuser unit.",
    errorCode: '042-326 Fuser Error',
    tags: 'xerox fuser error 042 fix, xerox printer 041 error code, xerox transfer belt error 053, xerox printer fuser overheating error',
    wordCount: 950,
    difficultyLevel: 'Advanced',
    timeToFix: '20 minutes',
    categoryId: errorCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    featuredSnippet: "To fix a Xerox 042 Fuser Error (e.g., 042-326): The 042 chain means the Fuser Unit has failed to reach its target operating temperature (or has dangerously overheated). Turn the printer OFF and unplug it from the wall for 30 minutes to let the thermistors reset. Open the side door and inspect the orange/grey fuser rollers. If the orange roller is torn, wrinkled, or peeling, the fuser is physically destroyed and must be replaced. If the fuser looks perfect, a sudden power surge may have tripped the software thermal fuse, which requires a technician to reset via the hidden diagnostic menu.",
    content: `<h2>Understanding Xerox Fuser Codes (041 / 042)</h2>
<p>The fuser is the component that uses intense heat and pressure to melt toner powder permanently into the paper. It operates at hundreds of degrees.</p>

<h3>Xerox 042 Fuser Errors</h3>
<p>If you see a code starting with 042 (most commonly 042-326 or 042-327), the logic board has detected abnormal temperatures.</p>
<ul>
  <li><strong>Under-temperature:</strong> The fuser's halogen heating lamp has burned out, or a cold draft is preventing it from reaching 400°F. The printer halts to prevent printing powder that will wipe right off the page.</li>
  <li><strong>Over-temperature:</strong> The thermistor (temperature sensor) is caked in melted toner and cannot read the heat properly. The printer shuts down instantly to prevent a fire.</li>
  <li><strong>The Fix:</strong> Unplug the printer for 30 minutes. If the code returns upon boot, you almost certainly need to purchase a replacement Fuser Unit.</li>
</ul>

<h2>Understanding Transfer Belt Errors (053)</h2>
<p>Code chains starting with 053 (or sometimes 041 depending on the model year) point to the <strong>Intermediate Transfer Belt (ITB)</strong> or the Transfer Roller.</p>
<p>The ITB is a wide black belt that collects the CMYK toner from the four individual drums and aligns it perfectly before slapping it onto the paper.</p>
<ol>
  <li>Open the front and side covers. Look at the shiny black transfer belt.</li>
  <li>If there is a massive streak of toner on it, the belt's cleaning blade has failed.</li>
  <li>If the code indicates a "rotation error," the motor driving the belt is jammed. Ensure you haven't dropped a paperclip or a torn piece of paper into the belt gears.</li>
</ol>`
  },
  {
    title: "Xerox Maintenance Kits: Fuser Replacement & Transfer Rollers",
    slug: 'xerox-maintenance-kits-fuser-replacement-transfer-rollers',
    seoTitle: "Xerox Maintenance Kits: Fuser & Transfer Roller Guide",
    metaDescription: "What is the difference between a Xerox fuser kit and a maintenance kit? Learn how to replace transfer rollers, calculate fuser costs, and clear errors after replacement.",
    excerpt: "When your Xerox prompts you to 'Replace Maintenance Kit', it usually means the fuser and transfer rollers have reached their page limits. Here is how to swap them.",
    errorCode: 'Replace Maintenance Kit',
    tags: 'xerox fuser replacement cost, xerox printer transfer roller error, xerox fuser kit vs maintenance kit difference, xerox printer error after fuser replacement',
    wordCount: 1050,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: hardwareCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "Xerox Fuser Kit vs. Maintenance Kit: A 'Fuser Kit' usually contains just the bare heating unit (the fuser). A 'Maintenance Kit' is a comprehensive package that contains the Fuser Unit PLUS the Bias Transfer Roller (BTR) and new rubber feed rollers for the paper trays. If you get a 'Transfer Roller Error' or print quality is faded on one side, you need the full Maintenance Kit. If the printer still shows an error after replacing the fuser, you must log in as the Administrator on the touch panel, go to Supplies, and manually select 'Reset Fuser Life Counter'.",
    content: `<h2>Fuser Kits vs Maintenance Kits</h2>
<p>Enterprise Xerox machines track the exact number of pages that pass through them. When a component nears its designed lifespan (often 100,000 to 200,000 pages), the printer will display a persistent warning to order replacement parts.</p>
<ul>
  <li><strong>The Fuser Kit:</strong> Includes only the hot fusing assembly. Replacing this fixes 042 errors, smudged toner, and wrinkled paper.</li>
  <li><strong>The Maintenance Kit:</strong> Includes the Fuser, but also includes the <strong>Transfer Roller</strong> (the spongy roller that sits directly under the paper, using static electricity to pull toner down from the belt) and several rubber pickup rollers for the paper cassettes.</li>
  <li><strong>Cost:</strong> Because they are industrial components, a genuine Xerox maintenance kit for an AltaLink or VersaLink typically costs between $200 and $400 depending on the model's speed rating.</li>
</ul>

<h2>Fixing Printer Error After Fuser Replacement</h2>
<p>If you purchase a brand new $300 fuser, slide it into the machine, and the printer <em>still</em> says "Replace Fuser" or throws an 042 error, the machine does not automatically recognize the new part.</p>
<ol>
  <li>Unlike toner cartridges, most Xerox fusers do not have an RFID chip to alert the logic board that a new part was installed.</li>
  <li>You must log in to the printer's touchscreen as an Admin (Default passcode is usually <code>1111</code> or the printer's serial number).</li>
  <li>Navigate to <strong>Device &gt; Supplies &gt; Fuser</strong>.</li>
  <li>Tap <strong>Reset Counter</strong> or <strong>Acknowledge Replacement</strong>.</li>
  <li>Reboot the printer.</li>
</ol>

<h2>Transfer Roller Errors</h2>
<p>If the printer throws a transfer roller fault, or your pages look perfectly sharp on the left side but faint and washed out on the right side, the Bias Transfer Roller has lost its static charge capabilities. You must replace the roller; it cannot be cleaned or repaired.</p>`
  }
];

async function main() {
  const brandSlug = 'xerox';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  
  if (!brand) {
    brand = await prisma.brand.create({
      data: {
        name: 'Xerox',
        slug: brandSlug,
        description: 'Xerox is a global leader in enterprise document management, producing heavy-duty WorkCentre, AltaLink, and VersaLink laser printers and MFPs.'
      }
    });
  }

  console.log(`🚀 Publishing Batch 1 (Clusters A & B: XXX-YYY Codes & Fusers) for brand: ${brand.name}`);

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
