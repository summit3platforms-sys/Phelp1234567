import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const printQualityCategory = 'e3d26347-33bf-41a7-9cbf-c3d821850f98';
const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Zebra Printer Faded Print & Darkness Setting Too Light Fix",
    slug: 'zebra-printer-faded-print-darkness-setting-too-light-fix',
    seoTitle: "Fix Zebra Printer Faded Print & Darkness Settings",
    metaDescription: "Is your Zebra thermal printer producing faded, light, or unreadable barcodes? Learn how to adjust print darkness, speed, and clean the printhead.",
    excerpt: "Faded prints on a Zebra printer are caused by three main factors: printhead darkness set too low, print speed set too high, or a dirty printhead.",
    errorCode: null,
    tags: 'Zebra, Faded Print Fix, Darkness Setting Too Light, Print Density, Thermal Head Cleaning, ZD420, ZT230',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: printQualityCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "To fix faded printing on a Zebra printer: 1) Increase Darkness: Open Zebra Setup Utilities, select your printer, click 'Configure Print Quality', and increase the darkness setting (scale of 0-30). A setting of 15-20 is ideal for most paper labels. 2) Lower Print Speed: High speeds (e.g., 6+ inches per second) don't give the printhead enough time to heat the label. Lower the speed to 3 or 4 ips. 3) Clean the Printhead: Power off the printer and gently wipe the dark ceramic printhead line with a Zebra cleaning pen or a lint-free swab dipped in 99% isopropyl alcohol.",
    content: `<h2>Understanding Zebra Thermal Print Density</h2>
<p>Zebra printers create images by pulsing heat through a ceramic element against either chemically treated paper (Direct Thermal) or a wax/resin ribbon (Thermal Transfer). If your printed labels look <strong>faded, washed out, or have light grey text instead of solid black</strong>, the thermal reaction is incomplete.</p>

<h2>Fix 1: Adjusting the Darkness Setting</h2>
<p>The printhead darkness (heat) is adjustable from 0 to 30. If it's set too low (e.g., 5), the printhead won't get hot enough to transfer the image fully.</p>
<ol>
  <li><strong>Via Zebra Setup Utilities:</strong>
    <ul>
      <li>Open Zebra Setup Utilities on your PC.</li>
      <li>Select your printer and click <strong>Configure Print Quality</strong>.</li>
      <li>Follow the wizard and increase the <strong>Darkness</strong> slider. For standard paper labels, 15 is a good baseline. For synthetic labels with resin ribbon, you may need 20-25.</li>
    </ul>
  </li>
  <li><strong>Via LCD Screen (Industrial Printers):</strong>
    <ul>
      <li>Press the <strong>Home</strong> button on the printer's display.</li>
      <li>Navigate to <strong>Settings &gt; Darkness</strong>.</li>
      <li>Use the arrows to increase the value and press OK to save.</li>
    </ul>
  </li>
</ol>

<h2>Fix 2: Slowing Down the Print Speed</h2>
<p>Heat requires time to transfer. If your printer is racing at 8 inches per second (ips), the heating elements might not reach target temperature before the paper moves past them.</p>
<ul>
  <li>In Zebra Setup Utilities, navigate to the Speed setting and reduce it to <strong>3 or 4 ips</strong>. Slower speeds drastically improve barcode crispness and solid black fills.</li>
</ul>

<h2>Fix 3: Cleaning the Printhead</h2>
<p>Adhesive residue, paper dust, and airborne contaminants form an insulating barrier over the printhead, blocking heat transfer.</p>
<ol>
  <li>Turn the printer <strong>OFF</strong>.</li>
  <li>Open the media cover and release the printhead latch.</li>
  <li>Lightly rub the dark glass line on the underside of the printhead using a Zebra cleaning pen or a swab saturated with <strong>99% Isopropyl Alcohol</strong>.</li>
  <li>Allow 1 minute to dry before closing the printhead and resuming printing.</li>
</ol>`
  },
  {
    title: "Fix Zebra ZD420 Streaky Lines, Inconsistent Quality & Ribbon Wrinkles",
    slug: 'zebra-zd420-streaky-lines-inconsistent-quality-ribbon-wrinkle-fix',
    seoTitle: "Fix Zebra Streaky Lines, Inconsistent Quality & Ribbon Wrinkles",
    metaDescription: "Are you seeing vertical white lines, diagonal streaks, or inconsistent print quality on your Zebra ZD420 or ZT printer? Fix ribbon wrinkles and printhead failure.",
    excerpt: "Vertical white lines indicate a dead printhead pixel or dirt, while diagonal unprinted streaks indicate a wrinkled thermal transfer ribbon.",
    errorCode: null,
    tags: 'Zebra, ZD420, Streaky Print Lines, Inconsistent Print Quality, Ribbon Wrinkle Fix, Dead Pixel, Printhead',
    wordCount: 1150,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: printQualityCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "To fix Zebra printer streaky lines and inconsistent quality: 1) Diagonal unprinted streaks: This is a Ribbon Wrinkle. Ensure the ribbon is threaded smoothly around all tension guides. Ensure the ribbon width is equal to or slightly wider than the label media. Adjust the printhead pressure toggles evenly. 2) Vertical straight white lines: This is either a piece of stuck debris or a blown printhead pixel. Clean the printhead with 99% isopropyl alcohol. If the white line remains exactly in the same place after cleaning, the printhead element is dead and the printhead must be replaced.",
    content: `<h2>Diagnosing Streaky Lines on Zebra Labels</h2>
<p>When diagnosing print quality issues on Zebra printers like the ZD420, ZT230, or GK420t, the direction and shape of the unprinted lines tell you exactly what component is failing.</p>

<h2>Problem 1: Diagonal Blank Streaks (Ribbon Wrinkle)</h2>
<p>If you see sharp, unprinted diagonal lines resembling lightning bolts slashing across your barcodes, the <strong>thermal transfer ribbon is folding over on itself (wrinkling)</strong> as it passes under the printhead.</p>
<h3>How to Fix Ribbon Wrinkles:</h3>
<ol>
  <li><strong>Check Ribbon Width:</strong> The ribbon must be the exact same width or slightly wider than the label backing. If you use a 4-inch wide ribbon for a 2-inch wide label, the excess ribbon lacks tension and will wrinkle.</li>
  <li><strong>Adjust Printhead Pressure Toggles:</strong> On industrial printers (ZT series), there are two pressure toggles on top of the printhead. Ensure both are positioned directly over the media and set to equal pressure. Uneven pressure forces the ribbon to skew diagonally.</li>
  <li><strong>Lower Darkness Settings:</strong> Excessive heat can cause the ribbon film to stretch and warp. Lower the darkness setting from 25 down to 15.</li>
  <li><strong>Check Ribbon Path:</strong> Ensure the ribbon goes *over* the tension rollers, not straight from supply to take-up.</li>
</ol>

<h2>Problem 2: Vertical Straight White Lines (Dead Pixels)</h2>
<p>A perfectly straight white line running vertically from the top of the label to the bottom is caused by a failure in the thermal printhead line.</p>
<ul>
  <li><strong>Step 1: Clean thoroughly.</strong> A tiny speck of adhesive or paper dust acts as thermal insulation. Wipe the printhead vigorously with an alcohol swab.</li>
  <li><strong>Step 2: The scratch test.</strong> If cleaning doesn't work, gently drag your fingernail horizontally across the ceramic line (printer OFF). If you feel a tiny chip or nick, a pixel has blown.</li>
  <li><strong>Resolution:</strong> Printheads are consumable items rated for 1 million inches. If a pixel is dead, you must purchase and install a replacement Zebra printhead.</li>
</ul>

<h2>Problem 3: Inconsistent, Blotchy, or Faded Edges</h2>
<p>If the print is dark on the left but faded on the right side of the label, the printhead is not pressing down evenly. Adjust the right-side pressure toggle to apply slightly more downward force.</p>`
  },
  {
    title: "Zebra Thermal Transfer vs Direct Thermal & Smudging Fix",
    slug: 'zebra-thermal-transfer-vs-direct-thermal-smudging-fix',
    seoTitle: "Zebra Thermal Transfer vs Direct Thermal & Smudging Fix",
    metaDescription: "Understand the difference between Zebra Direct Thermal and Thermal Transfer printing. Fix print smudging, fading labels, and printing too dark.",
    excerpt: "Direct thermal uses heat-sensitive paper and fades over time, while Thermal Transfer uses a ribbon for permanent archiving. Mixing the two causes smudging.",
    errorCode: null,
    tags: 'Zebra, Thermal Transfer vs Direct Thermal, Print Too Dark, Smudging, Label Fading, Wax Resin Ribbon',
    wordCount: 1050,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: printQualityCategory,
    authorId: authors.elena,
    reviewerId: authors.alex,
    featuredSnippet: "To fix Zebra print smudging and understand printing types: 1) Direct Thermal (DT): Requires NO ribbon. The label itself is chemically treated to turn black when heated. Scratches easily and fades in sunlight. 2) Thermal Transfer (TT): Requires a ribbon. The printer melts ink from the ribbon onto the label. 3) Fixing Smudging: If your print smudges easily, you are likely using a Wax ribbon on a synthetic/polypropylene label. Switch to a Wax/Resin or full Resin ribbon. If printing is too dark and bleeding, lower the Darkness setting to 10-15.",
    content: `<h2>Direct Thermal vs. Thermal Transfer Explained</h2>
<p>Zebra desktop and industrial printers support two fundamentally different chemical processes for creating images. Using the wrong media type for your printer's configuration is the leading cause of blank labels or severe smudging.</p>

<h3>1. Direct Thermal (DT)</h3>
<ul>
  <li><strong>How it works:</strong> The printer applies heat directly to chemically treated, heat-sensitive label paper. No ink ribbon is installed.</li>
  <li><strong>Pros:</strong> Simpler setup, lower cost (no ribbon to replace).</li>
  <li><strong>Cons:</strong> The labels are highly sensitive to UV light, heat, and friction. They will fade or turn completely black if left in a hot warehouse or exposed to direct sunlight.</li>
  <li><strong>Best for:</strong> Short-term applications (e.g., shipping labels, food delivery receipts).</li>
</ul>

<h3>2. Thermal Transfer (TT)</h3>
<ul>
  <li><strong>How it works:</strong> The printer heats a thin polyester ribbon coated in ink (wax, resin, or a blend), melting the ink permanently onto the label surface.</li>
  <li><strong>Pros:</strong> Archival quality, immune to fading, highly durable, waterproof (if using resin on synthetic paper).</li>
  <li><strong>Cons:</strong> Requires matching the correct ribbon type to the label stock.</li>
  <li><strong>Best for:</strong> Asset tracking, product identification, outdoor labels, and medical records.</li>
</ul>

<h2>Why Are My Zebra Labels Smudging?</h2>
<p>If you run your finger across a freshly printed Thermal Transfer label and the black ink smears off, you have a material mismatch.</p>
<ol>
  <li><strong>Wax Ribbon on Glossy/Synthetic Paper:</strong> Standard wax ribbons are designed for matte paper labels. If you print wax onto glossy polypropylene or polyester, the ink cannot absorb into the fibers. You must upgrade to a <strong>Wax/Resin</strong> or full <strong>Resin</strong> ribbon.</li>
  <li><strong>Darkness Too High:</strong> If the darkness is set to 30, the printer is boiling the ribbon ink, causing it to pool and bleed beyond the barcode edges. This causes "print too dark" smudging. Lower the darkness to 15.</li>
</ol>`
  },
  {
    title: "Zebra Printer Won't Calibrate Labels & Gap Not Detected Fix",
    slug: 'zebra-printer-wont-calibrate-labels-gap-not-detected-fix',
    seoTitle: "Zebra Printer Won't Calibrate Labels & Gap Not Detected",
    metaDescription: "Is your Zebra printer flashing red, feeding multiple blank labels, or failing to detect the label gap? Learn how to fix calibration disabled errors.",
    excerpt: "When a Zebra printer won't calibrate or skips over gaps, the media sensor is either physically misaligned, dirty, or the software configuration is set to Continuous instead of Web Sensing.",
    errorCode: 'Media Out / Gap Not Detected',
    tags: 'Zebra, Wont Calibrate Labels, Label Gap Not Detected, Calibration Disabled, Red Flashing Light, Sensor Alignment',
    wordCount: 1200,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: hardwareCategory,
    authorId: authors.david,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix a Zebra printer that won't calibrate or detect the label gap: 1) Align the Sensor: Open the printer and locate the movable media sensor (a glowing red or yellow light under the paper path). Slide it so it sits directly in the center of the label web, passing clearly through the gaps. 2) Set Media Type: In the Zebra driver or LCD menu, ensure 'Media Type' is set to 'Gap/Notch' or 'Web Sensing', NOT 'Continuous'. 3) Run Auto-Calibration: Hold down the Pause and Cancel buttons simultaneously for 2 seconds (or run calibration from the printer's LCD menu).",
    content: `<h2>Understanding Zebra Media Sensing</h2>
<p>Zebra printers rely on an internal optical sensor to detect where one label ends and the next begins. When this system fails, the printer will either feed 5 blank labels and flash a red "Media Out" error, or the printed image will gradually drift up or down across the label gap.</p>

<h2>Fix 1: Physically Aligning the Transmissive Sensor</h2>
<p>Most Zebra printers feature an adjustable media sensor to accommodate different label shapes (like circles or jewelry tags). If you are using standard rectangular labels, the sensor must be positioned to "see" through the paper backing.</p>
<ol>
  <li>Open the printer cover and remove the label roll.</li>
  <li>Look at the bottom of the paper path. You will see a small plastic slider assembly containing a sensor (often emitting a faint red or yellow light).</li>
  <li><strong>Slide the sensor to the exact center of the media path.</strong></li>
  <li>If you are printing circular labels or labels with a side notch, slide the sensor so the light passes directly over the notch or the deepest part of the gap.</li>
  <li>Reload the labels and close the printhead.</li>
</ol>

<h2>Fix 2: Software Configuration (Gap vs. Continuous)</h2>
<p>The printer cannot calibrate if it's programmed to expect the wrong type of paper.</p>
<ul>
  <li><strong>Continuous Media:</strong> Used for receipt paper (no gaps). The printer turns the gap sensor off.</li>
  <li><strong>Gap / Notch / Web Sensing:</strong> Used for standard die-cut labels on a liner.</li>
  <li><strong>Mark / Black Mark:</strong> Used for labels with a printed black line on the back of the liner.</li>
</ul>
<p>Open <strong>Printer Properties &gt; Preferences &gt; Advanced Setup</strong> in Windows, or the printer's LCD menu, and ensure <strong>Tracking Mode</strong> is set to <strong>Web Sensing (Gap)</strong>.</p>

<h2>Fix 3: Bypassing 'Calibration Disabled' Errors</h2>
<p>If you press the calibration button and the printer ignores you, calibration might be locked out by software.</p>
<ol>
  <li>Open Zebra Setup Utilities.</li>
  <li>Select your printer, click <strong>Open Communication With Printer</strong>.</li>
  <li>Type the following ZPL command to force a length calibration: <code>~JC</code></li>
  <li>Press Enter, then click <strong>Send to Printer</strong>. The printer will feed a few labels and re-establish the top-of-form alignment.</li>
</ol>`
  },
  {
    title: "Zebra Sensor Profile Explained, Cleaning & Manual Calibration",
    slug: 'zebra-sensor-profile-explained-cleaning-manual-calibration',
    seoTitle: "Zebra Sensor Profile Explained, Cleaning & Manual Calibration",
    metaDescription: "Learn how to read a Zebra sensor profile printout, when to use manual calibration vs auto calibration, and how to clean the optical media sensors.",
    excerpt: "If auto-calibration fails to detect custom label backing, you must perform a manual calibration and print a sensor profile graph to diagnose sensor degradation.",
    errorCode: null,
    tags: 'Zebra, Sensor Profile Explained, Sensor Cleaning Guide, Manual Calibration vs Auto Calibration, Measuring Label Length Wrong',
    wordCount: 1100,
    difficultyLevel: 'Advanced',
    timeToFix: '15 minutes',
    categoryId: hardwareCategory,
    authorId: authors.alex,
    reviewerId: authors.elena,
    featuredSnippet: "To run manual calibration and understand the Zebra Sensor Profile: 1) Manual Calibration vs Auto: Auto-calibration just measures length. Manual calibration asks you to remove labels from the backing so the printer can learn the exact optical density of the bare liner vs the label+liner. Use manual when auto fails. 2) Print Sensor Profile: In the LCD menu, select 'Print: Sensor Profile'. 3) Reading the Profile: The printed graph shows a spike (the gap/liner) and a baseline (the label). If the gap spike is weak or erratic, clean the sensor with compressed air and an alcohol swab.",
    content: `<h2>Auto Calibration vs. Manual Calibration</h2>
<p>Zebra printers offer two types of media calibration. Understanding when to use each is critical for specialized label stock.</p>

<h3>Auto Calibration</h3>
<p>Triggered by pressing Pause + Cancel or holding the Feed button. The printer feeds a few labels, measuring the distance between gaps to determine label length. It uses its existing optical baseline values. <strong>Use this 90% of the time for standard white paper labels.</strong></p>

<h3>Manual Calibration</h3>
<p>A guided, multi-step process. The printer will prompt you to remove the labels from the backing (the liner), close the printhead, and scan <em>only the bare liner</em>. It then asks you to reload the full label+liner. This teaches the printer the exact optical delta between the two materials. <strong>Use this when using thick synthetic labels, pre-printed labels, or labels with thick colored liners where auto-calibration fails.</strong></p>

<h2>How to Read a Zebra Sensor Profile</h2>
<p>If the printer is measuring the label length wrong (e.g., printing half a label, then skipping one), printing a Sensor Profile will diagnose the hardware.</p>
<ol>
  <li>Go to the printer's LCD menu: <strong>Sensors &gt; Print: Sensor Profile</strong>.</li>
  <li>The printer will output a graphical waveform resembling an EKG chart.</li>
</ol>

<h3>Interpreting the Graph:</h3>
<ul>
  <li><strong>The Baseline (Label):</strong> The flat, lower part of the graph represents the density of the label + liner.</li>
  <li><strong>The Spike (Gap):</strong> You should see a distinct, tall spike at regular intervals. This is the gap (bare liner), which lets more light through.</li>
  <li><strong>The Threshold Line:</strong> The printer draws a horizontal line labeled "Threshold". This line <em>must</em> sit cleanly between the baseline and the peak of the gap spike.</li>
  <li>If the graph looks like erratic static noise with no distinct spikes, the sensor is blind.</li>
</ul>

<h2>Zebra Printer Sensor Cleaning Guide</h2>
<p>If the sensor profile is flat or erratic, the optical sensor is covered in paper dust.</p>
<ol>
  <li>Power off the printer and open the media cover.</li>
  <li>Remove the labels and the ribbon.</li>
  <li>Locate the upper and lower sensor arrays (usually marked by a yellow slider).</li>
  <li>Use a can of compressed air to blow out loose dust.</li>
  <li>Dampen a cotton swab with <strong>99% Isopropyl Alcohol</strong> and gently wipe the clear plastic domes of the sensors. Do not use sharp tools, as scratching the optical dome ruins the sensor.</li>
</ol>`
  }
];

async function main() {
  const brandSlug = 'zebra-technologies';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 2 (Clusters B & C: Quality & Calibration) for brand: ${brand.name}`);

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
