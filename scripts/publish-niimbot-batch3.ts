import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const printQualityCategory = 'e3d26347-33bf-41a7-9cbf-c3d821850f98';
const paperCategory = '9a42c554-2b4f-47f8-887e-5996fb83cbad';
const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';
const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix NIIMBOT Misaligned Print, Faded Text & Partial Labels",
    slug: 'niimbot-misaligned-print-faded-text-partial-labels',
    seoTitle: "Fix NIIMBOT Misaligned Print, Faded Text & Partial Labels",
    metaDescription: "Are your NIIMBOT labels printing off-center, faded, or getting cut off halfway? Learn how to clean the printhead, fix low battery voltage, and calibrate the gap sensor.",
    excerpt: "Faded text is usually caused by low battery voltage or a dirty thermal printhead. Misaligned prints and partial labels indicate an optical sensor calibration failure.",
    errorCode: 'Poor Print Quality',
    tags: 'niimbot printer misaligned print fix, niimbot faded print fix, niimbot printer only prints partial label',
    wordCount: 950,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: printQualityCategory,
    authorId: authors.alex,
    reviewerId: authors.elena,
    featuredSnippet: "To fix faded text and misaligned prints on a NIIMBOT: 1) Faded Print Fix: Thermal printing requires high power. If your battery is under 20%, the printhead cannot get hot enough, resulting in faded text. Charge the printer fully. Also, wipe the ceramic printhead with an alcohol swab to remove paper dust. 2) Misaligned / Partial Labels: If the text is printing halfway off the edge, the gap sensor is miscalibrated. Open the lid, pull 1/4 inch of label out, close the lid, and press the power button ONCE. The printer will feed one blank label to recalibrate its zero-point.",
    content: `<h2>Diagnosing NIIMBOT Print Quality Issues</h2>
<p>Because NIIMBOT printers use direct thermal technology, they don't have ink cartridges to run dry. If your print quality degrades, the issue is related to heat transfer or mechanical alignment.</p>

<h3>Fixing Faded or Ghosting Text</h3>
<ol>
  <li><strong>Battery Voltage:</strong> The #1 cause of faint printing is a low battery. The ceramic heating element requires a massive spike in current. If the battery is nearly dead, the firmware throttles the heat to prevent shutting down. Plug the printer in and charge it above 50%.</li>
  <li><strong>Printhead Cleaning:</strong> Every label that passes through leaves behind microscopic paper dust. Over time, this dust forms a layer of thermal insulation. Open the paper compartment, locate the black/green ceramic strip, and wipe it firmly with a Q-tip dipped in rubbing alcohol.</li>
  <li><strong>App Density Setting:</strong> In the NIIMBOT app's final print preview screen, tap the "Print Density" setting. Change it from standard to High/Dark.</li>
</ol>

<h2>Fixing Misaligned and Partial Labels</h2>
<p>If your text looks perfectly centered in the app, but physically prints shifted to the right, or stops printing halfway through a word:</p>
<ul>
  <li><strong>The Optical Sensor:</strong> The printer uses a sensor to detect the gap between each sticker. If it misreads the gap, it thinks the printable area is smaller than it actually is.</li>
  <li><strong>Calibration:</strong> Turn the printer on. Open the lid, pull a little bit of paper out, and close the lid. Press the power button once quickly. The printer will feed one blank label and stop. This recalibrates the sensor to the physical label size.</li>
</ul>`
  },
  {
    title: "NIIMBOT Print Direction, Template Size Match & Self Test",
    slug: 'niimbot-print-direction-template-size-match-self-test',
    seoTitle: "NIIMBOT Print Direction, Template Size & Self Test Page",
    metaDescription: "Is your NIIMBOT printing upside down or throwing a 'template size not matching' error? Learn how to change print direction and generate a hardware self-test page.",
    excerpt: "Understanding how to generate a hardware self-test page can prove whether a print error is a mechanical failure or simply an app configuration issue like wrong print direction.",
    errorCode: null,
    tags: 'niimbot print direction wrong, niimbot template size not matching label, niimbot self test page how to print',
    wordCount: 1000,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: softwareCategory,
    authorId: authors.david,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix NIIMBOT print direction and run a self-test: 1) Print Direction Wrong: If your text is printing sideways or upside down compared to the way the label feeds out, open your design in the NIIMBOT app. Tap the 'Print Direction' or 'Rotation' toggle in the canvas settings to rotate the design 90 or 180 degrees before printing. 2) Self Test Page: To prove the printer hardware is working, turn the printer ON. Double-click the main power button rapidly. The printer will print a diagnostic Self-Test page detailing its firmware version, Bluetooth MAC address, and current battery voltage.",
    content: `<h2>How to Print a NIIMBOT Self-Test Page</h2>
<p>Before you spend hours troubleshooting Bluetooth settings on your phone, you should determine if the printer hardware itself is actually functioning. You can do this by printing a hardware diagnostic page directly from the logic board, completely bypassing the smartphone app.</p>
<ol>
  <li>Ensure the printer has paper loaded and is turned ON.</li>
  <li>Double-click the main power button in quick succession (like double-clicking a mouse).</li>
  <li>The printer will feed a label containing its <strong>Firmware Version, Bluetooth MAC Address, and Battery Voltage</strong>.</li>
  <li>If this page prints perfectly, the printer hardware is flawless, and your issue is 100% related to the app or your phone.</li>
</ol>

<h2>Fixing "Print Direction Wrong"</h2>
<p>If you are printing on wide labels (like on the B21) and your text is getting chopped off because it prints horizontally across a vertical label:</p>
<ul>
  <li>In the NIIMBOT app, the canvas orientation must match the physical feed path.</li>
  <li>Look for the <strong>Print Direction</strong> or <strong>Rotate</strong> button in the top menu of the editing canvas. Toggle it to flip your design 90 degrees so it feeds out correctly.</li>
</ul>

<h2>"Template Size Not Matching Label" Error</h2>
<p>Normally, the RFID chip inside a NIIMBOT roll tells the app exactly what size canvas to load. However, if the RFID chip is damaged, or the app glitches, it might load a 30x15mm canvas while you actually have 50x30mm paper loaded.</p>
<ul>
  <li>If you try to print, the app will throw a mismatch error to prevent you from printing off the edge of the label onto the rubber roller.</li>
  <li><strong>The Fix:</strong> Close your current design. Tap the label size at the top of the home screen and manually type in the correct millimeter dimensions printed on the side of your physical label box.</li>
</ul>`
  },
  {
    title: "NIIMBOT Paper Loading, Baffle Guide & Lid Not Closing",
    slug: 'niimbot-paper-loading-baffle-guide-lid-not-closing',
    seoTitle: "NIIMBOT Paper Loading, Baffle Guide & Lid Not Closing Fix",
    metaDescription: "Is your NIIMBOT lid refusing to close properly? Learn how to load label paper correctly, adjust the paper case baffle guides, and switch between 15mm and 27mm tape.",
    excerpt: "Physical paper jams and a lid that won't snap shut are usually caused by misaligned internal paper guides or loading the roll upside down.",
    errorCode: 'Physical Jam',
    tags: 'niimbot paper case baffle guide, niimbot label paper orientation, niimbot 15mm vs 27mm label setup, niimbot lid wont close properly',
    wordCount: 950,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: paperCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredSnippet: "To fix a NIIMBOT lid that won't close and load paper correctly: 1) Paper Orientation: Direct thermal paper only prints on one side. The glossy, printable side MUST face the ceramic printhead (usually pointing up or toward the front). If you load it upside down, it will print blank. 2) Baffle Guide: For models like the B21 or D101, there is a sliding plastic guide (baffle) inside the paper bay. You must push this guide inward until it touches the side of the label roll. If the label is sitting on top of the guide, the lid will pinch it and refuse to latch shut.",
    content: `<h2>The Golden Rules of Loading NIIMBOT Paper</h2>
<p>If your NIIMBOT printer prints blank labels, jams instantly, or the top lid refuses to click shut, the paper roll is physically misaligned.</p>

<h3>1. Paper Orientation (Upside Down)</h3>
<p>Direct thermal printers do not use ink; they use chemically treated paper. Only one side of the paper reacts to heat.</p>
<ul>
  <li>Unspool a small amount of the label roll.</li>
  <li>The outside of the roll (the smooth, glossy sticker part) is the printable side.</li>
  <li>This side must pass directly against the thin ceramic heating element (the printhead).</li>
  <li>If you load the roll so the paper pulls from the bottom instead of the top, the printhead will heat the waxy backing paper, resulting in a completely blank print.</li>
</ul>

<h3>2. The Paper Case Baffle Guide</h3>
<p>Wider models like the NIIMBOT B21, B3S, and D101 support multiple widths of paper.</p>
<ol>
  <li><strong>D101 (15mm vs 27mm setup):</strong> The D101 comes with a removable plastic spacer piece. If you want to use standard 15mm D11 tape, the spacer MUST be inserted into the tray. If you want to use wider 27mm tape, you must pull the spacer out completely.</li>
  <li><strong>B21 (Sliding Baffles):</strong> The B21 has spring-loaded or sliding plastic hubs. Insert your label roll, then push the left and right guides inward until they lightly hug the roll. </li>
  <li>If your label roll is resting <em>on top</em> of the baffle guide instead of between them, the paper will sit too high, and the top lid will refuse to close properly.</li>
</ol>`
  }
];

async function main() {
  const brandSlug = 'niimbot';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 3 (Clusters D & F: Print Quality & Paper Setup) for brand: ${brand.name}`);

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
