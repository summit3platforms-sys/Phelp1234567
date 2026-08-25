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
    title: "Fix Lexmark Fuser Errors: 920.06, 921, 922, 923 & 925 Codes",
    slug: 'fix-lexmark-fuser-errors-920-921-922-923-925',
    seoTitle: "Fix Lexmark Fuser Errors: 920.06, 921, 922 & 925 Codes",
    metaDescription: "Is your Lexmark printer flashing a 920.06 or 923 service fuser error? Learn how to diagnose under-temperature faults and clear persistent fuser errors.",
    excerpt: "The 92X series of fault codes on Lexmark printers points directly to the Fuser heating element failing to reach optimal temperatures.",
    errorCode: '920 Fuser Error',
    tags: 'lexmark 920.06 service fuser error, lexmark error 921 922 923 fix, lexmark error 925 meaning, lexmark service fuser error wont clear',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: errorCategory,
    authorId: authors.alex,
    reviewerId: authors.elena,
    featuredSnippet: "To fix a Lexmark 920.06 or 922 Fuser Error: The 92X family of codes (920, 921, 922, 923) indicates the fuser is failing to reach the target operating temperature. First, turn the printer OFF and unplug it from the wall, NOT a surge protector. Lexmark fusers require massive amperage; a power strip can starve the printer of voltage, causing under-temperature faults. Wait 30 minutes, plug it directly into a wall outlet, and turn it ON. If the 'Service Fuser Error' won't clear, the fuser's halogen lamp has burned out or the thermistor is blown, requiring a full fuser replacement.",
    content: `<h2>Understanding Lexmark 92X Fuser Codes</h2>
<p>Lexmark enterprise printers rely on a highly structured fault code system. Any code beginning with <strong>92X</strong> (e.g., 920.00, 923.01) is a critical stop related to the Fusing Assembly, the extremely hot rollers that melt toner powder into the paper.</p>

<h3>920.06, 921, and 922: Under-Temperature</h3>
<p>These codes mean the fuser is too cold. The logic board waits a specific number of seconds for the fuser to reach 400&deg;F. If it doesn't make it, the printer halts.</p>
<ul>
  <li><strong>Power Supply Issues:</strong> The #1 cause of a false 920.06 error is plugging the printer into a UPS battery backup or a cheap surge protector. Laser printers draw up to 10 Amps during warmup. A surge protector throttles this current, causing the fuser to warm up too slowly. Always plug laser printers directly into the wall.</li>
  <li><strong>Cold Environments:</strong> If the printer was left in a freezing warehouse overnight, the internal thermistors will register a baseline temperature that is too low, throwing a 921 error. Let the printer acclimate to room temperature.</li>
</ul>

<h3>923 and 925: Over-Temperature and Thermistor Failure</h3>
<p>A <strong>923</strong> or <strong>925</strong> code is much more dangerous. This means the fuser is dangerously overheating, or the temperature sensor (thermistor) has completely short-circuited.</p>
<p>To prevent a fire, the logic board permanently locks out the printer. Even if you turn it off and on, the <em>"Service Fuser Error Won't Clear"</em> message will remain. You must replace the fuser unit entirely. Attempting to bypass a 923 code by resetting the NVRAM is a massive fire hazard.</p>`
  },
  {
    title: "Lexmark Fuser Kits: 128.28 & 121.10a Errors & Overheating",
    slug: 'lexmark-fuser-kits-128-121-errors-overheating',
    seoTitle: "Lexmark Fuser Kit Guide: Fix 128.28 & 121.10a Errors",
    metaDescription: "What's the difference between a Lexmark fuser and a maintenance kit? Learn how to fix 128.28 fuser malfunction codes and reset the counter after replacement.",
    excerpt: "When replacing a Lexmark fuser to clear a 128.28 or 121.10a error, you must ensure you reset the internal page counter to clear the 'replace maintenance kit' warning.",
    errorCode: '121.10 Fuser Malfunction',
    tags: 'lexmark 128.28 fuser error, lexmark 121.10a fuser malfunction, lexmark fuser replacement guide, lexmark printer overheating fuser, lexmark fuser error after replacement, lexmark fuser vs maintenance kit difference',
    wordCount: 1050,
    difficultyLevel: 'Advanced',
    timeToFix: '20 minutes',
    categoryId: hardwareCategory,
    authorId: authors.david,
    reviewerId: authors.marcus,
    featuredSnippet: "Lexmark Fuser vs. Maintenance Kit: A 'Fuser Unit' is just the hot roller assembly itself. A 'Maintenance Kit' is a complete overhaul package that includes a brand new Fuser Unit, PLUS the Transfer Roller, and new rubber pickup rollers for all paper trays. If you buy a maintenance kit and install it, but still get a 'Fuser Error After Replacement', you must reset the counter. Turn the printer off. Hold the 2 and 6 buttons simultaneously while turning it back on to enter the Configuration Menu. Scroll to 'Reset Maintenance Counter' and execute the reset.",
    content: `<h2>Lexmark Fuser Malfunctions: 121.10a & 128.28</h2>
<p>On newer generation Lexmark devices (like the MS/MX series), fuser errors are often displayed with a three-digit prefix like <strong>121</strong> or <strong>128</strong>.</p>
<ul>
  <li><strong>121.10a:</strong> This specific sub-code indicates a physical fuser motor rotation failure. The gears driving the hot roller are jammed. Open the rear door and look at the fuser. If a sheet of paper is wrapped tightly around the orange roller like an accordion, the gears cannot spin.</li>
  <li><strong>128.28:</strong> This indicates a failure of the fuser's internal logic chip. Lexmark fusers have tiny microchips that track exactly how many pages they have printed. If a power surge fries this chip, the printer assumes the fuser is missing or unauthorized.</li>
</ul>

<h2>Overheating Fusers</h2>
<p>If you smell burning paper or your printer displays an overheating warning, immediately unplug it. This is usually caused by running heavy cardstock or labels through the printer with the tray settings configured to "Plain Paper". The printer applies maximum heat assuming it's thick paper, but if you actually put thin 20lb copy paper in, it scorches the paper and overheats the rollers. Always ensure your paper type setting matches the physical paper in the tray.</p>

<h2>Resetting the Counter After Replacement</h2>
<p>If you swap the fuser out but the error remains:</p>
<ol>
  <li>Power the printer OFF.</li>
  <li>Press and hold the <strong>2 and 6</strong> buttons on the keypad (or the screen corners on touch-only models).</li>
  <li>Turn the printer ON while holding the buttons until the progress bar loads.</li>
  <li>You are now in the <strong>Configuration Menu</strong>.</li>
  <li>Navigate to <em>Reset Maintenance Counter</em> and confirm. Reboot normally.</li>
</ol>`
  },
  {
    title: "Fix Lexmark Paper Jam Codes: Error 200, 243, 244 & Tray Jams",
    slug: 'fix-lexmark-paper-jam-codes-error-200-243-244-tray',
    seoTitle: "Fix Lexmark Error 200, 243, 244 & Paper Jams",
    metaDescription: "Is your Lexmark printer showing a 200 or 244 paper jam error with no paper found? Learn how to clean tray sensors and replace worn rubber pickup rollers.",
    excerpt: "Lexmark paper jam codes in the 200-range indicate failures during the initial paper pickup phase from the bottom trays. Learn how to diagnose phantom jams.",
    errorCode: '200 Paper Jam',
    tags: 'lexmark error 200 paper jam, lexmark error 243 paper jam, lexmark error 244 tray sensor, lexmark paper jam no paper found',
    wordCount: 950,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: hardwareCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredSnippet: "To fix Lexmark 'Phantom' Paper Jams (Error 200 / No Paper Found): 1) Error 200 and 243 indicate a failure of the paper to leave the cassette tray. Pull the paper tray completely out of the printer. 2) Look up into the empty slot with a flashlight. You will see 2 or 3 rubber 'pickup tires' on a shaft. If these tires are smooth, shiny, and covered in gray paper dust, they cannot grip the paper. Scrub them vigorously with a cloth dampened with water or rubbing alcohol. 3) If the error persists, check the tiny black plastic sensor flags in the paper path. A torn scrap of paper is likely wedging a sensor flag down, tricking the logic board into thinking a full sheet is stuck.",
    content: `<h2>Understanding Lexmark 200-Series Jams</h2>
<p>Lexmark uses the <strong>2XX</strong> fault code family to map the physical path of the paper. Jams in the 200 to 244 range happen at the very beginning of the journey: the paper trays.</p>
<ul>
  <li><strong>Error 200:</strong> The standard Tray 1 pickup jam. The paper never reached the first input sensor.</li>
  <li><strong>Error 243 / 244:</strong> These specify jams in the add-on expansion trays (Tray 2, Tray 3, or Tray 4). The 244 code specifically flags the tray sensor failing to detect the leading edge of the paper.</li>
</ul>

<h2>The "No Paper Found" Phantom Jam</h2>
<p>If you open every single door on the printer and cannot find a single sheet of paper, but the screen refuses to clear the 200-series jam:</p>
<ol>
  <li><strong>Torn Scraps:</strong> A user previously yanked a jammed paper out too aggressively. A 1-inch triangle of paper tore off and is currently wedged under the <em>input sensor flag</em> (a small spring-loaded piece of plastic). Get a flashlight and tweezers.</li>
  <li><strong>Bald Feed Rollers:</strong> The printer tried to spin its rubber tires to grab the paper, but the tires are so worn out they just spun in place. The printer waited 3 seconds, didn't see the paper cross the sensor, and threw a jam code. You must replace the rubber pickup tires (usually a $15 kit).</li>
  <li><strong>Damp Paper:</strong> If you leave paper in the tray over a humid weekend, the sheets stick together. The printer tries to pull one sheet but grabs five, wedging them instantly. Fan the stack of paper before loading it.</li>
</ol>`
  },
  {
    title: "Fix Lexmark Tray Gears & Duplex Jams: Error 943 & Upper Cover",
    slug: 'fix-lexmark-tray-gears-duplex-jams-error-943',
    seoTitle: "Fix Lexmark Error 943 Tray Gears & Duplex Jams",
    metaDescription: "Does your Lexmark throw a 943 gear error or jam constantly during duplex two-sided printing? Learn how to replace lift sector gears and clear upper cover jams.",
    excerpt: "If your Lexmark printer makes a terrible grinding noise when you insert a paper tray, you have likely stripped the lift sector gears.",
    errorCode: '943 Tray Gear',
    tags: 'lexmark error 943 tray gear, lexmark tray 3 lift sector gear damaged, lexmark printer jam upper cover, lexmark duplex jam error',
    wordCount: 900,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: hardwareCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    featuredSnippet: "To fix a Lexmark 943 Tray Gear Error and loud grinding noises: 1) The 943 error means the 'Lift Sector Gear' has snapped. This gear lifts the stack of paper up to meet the rubber rollers. 2) This happens when users slam the paper tray shut violently. Pull the tray completely out. Look at the back left or right corner of the tray mechanism for white plastic half-moon gears. If the teeth are stripped or the gear is cracked in half, it must be replaced. 3) You can temporarily fix the printer by removing the broken expansion tray (like Tray 3) and only printing from Tray 1 until the replacement gear arrives.",
    content: `<h2>Lexmark 943 Error: The Lift Sector Gear</h2>
<p>When you slide a paper tray into a Lexmark printer, a motor engages a set of gears that physically lifts the metal plate holding the paper upward until the top sheet touches the pickup rollers. This is called the <strong>Lift Sector Gear</strong>.</p>
<ul>
  <li><strong>Why they break:</strong> If an employee fills the tray with an entire ream of heavy cardstock, and then violently slams the tray shut with their hip, the kinetic energy slams the delicate plastic lift gears into the metal chassis, snapping the teeth off.</li>
  <li><strong>The Diagnosis:</strong> You will hear a horrific ratcheting/grinding noise for 5 seconds when you close the tray, followed by a <strong>943 Tray Failure</strong> code.</li>
  <li><strong>The Fix:</strong> You must disassemble the side cover of the paper tray module and replace the white plastic lift gears. The part costs about $10, but installation requires removing several C-clips.</li>
</ul>

<h2>Duplex Jams and Upper Cover Jams</h2>
<p>If the printer prints single-sided pages perfectly, but jams 100% of the time when you select double-sided (duplex) printing:</p>
<ol>
  <li>The Duplex module reverses the paper back through the printer. This path is located in the <strong>Upper Cover</strong> or rear access door depending on the model.</li>
  <li>Open the duplex access door. Because the paper is extremely hot from exiting the fuser right before it is reversed, it tends to curl. If the paper curls too much, it catches on the plastic ribs of the duplex tray.</li>
  <li><strong>Solution:</strong> Ensure your paper settings are correct. If printing on thin paper, set the printer to "Lightweight Paper" to lower the fuser temperature, reducing the curl and preventing the jam.</li>
</ol>`
  }
];

async function main() {
  const brandSlug = 'lexmark';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  
  if (!brand) {
    brand = await prisma.brand.create({
      data: {
        name: 'Lexmark',
        slug: brandSlug,
        description: 'Lexmark International is an American manufacturer of heavy-duty enterprise laser printers and imaging products.'
      }
    });
  }

  console.log(`🚀 Publishing Batch 1 (Clusters A & B: Fusers & Jams) for brand: ${brand.name}`);

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
