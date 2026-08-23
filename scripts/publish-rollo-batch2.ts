import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const printQualityCategory = 'e3d26347-33bf-41a7-9cbf-c3d821850f98';
const paperCategory = '9a42c554-2b4f-47f8-887e-5996fb83cbad';
const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';
const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix Rollo Printer Blank, Faint, Light & Uneven Print Density",
    slug: 'rollo-printer-blank-faint-light-uneven-print-density-fix',
    seoTitle: "Fix Rollo Printer Blank, Faint & Light Prints (Density Fix)",
    metaDescription: "Are your Rollo shipping labels printing completely blank, faint, or too light? Learn how to fix backwards thermal paper, increase density, and clean the printhead.",
    excerpt: "Blank and faint prints on a Rollo thermal printer are almost always caused by upside-down label rolls, thermal transfer paper incompatibility, or low driver darkness.",
    errorCode: 'Blank / Faint Print',
    tags: 'Rollo, Blank Labels, Faint Print, Print Density, Too Light, Thermal Paper, Printhead Clean',
    wordCount: 1200,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: printQualityCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix blank or faint prints on a Rollo printer: 1) Verify Thermal Paper Orientation: Direct thermal labels only have heat-sensitive chemistry on one side. Scratch the label with your fingernail; if a black line appears, that side must face UP towards the ceiling. 2) Ensure you are using 'Direct Thermal' labels (Rollo cannot print on thermal transfer or standard paper that requires ink ribbons). 3) Increase Print Density: In Windows Printing Preferences > Settings, raise 'Darkness' from 8 to 11 or 12. On Mac, set Darkness to 10 under Printer Features. 4) Clean the Printhead: Wipe the ceramic thermal heating line with a 99% isopropyl alcohol swab.",
    content: `<h2>How Direct Thermal Printing Works</h2>
<p>Unlike standard inkjet or laser printers, the <strong>Rollo Thermal Printer</strong> uses zero ink, toner, or ribbons. The ceramic printhead contains a micro-row of 832 miniature heating elements (203 dots per inch) that generate precise heat pulses up to 200°C. When these elements press against <strong>direct thermal paper</strong>, a chemical reaction occurs within the leuco dye coating, turning the paper pitch black instantaneously.</p>

<h2>Fix 1: The 'Fingernail Scratch' Paper Test (Blank Labels)</h2>
<p>If the printer feeds labels smoothly through the slot but outputs completely blank white paper:</p>
<ol>
  <li><strong>Check Paper Side:</strong> Direct thermal labels only react to heat on one coated side. If the label roll is loaded upside down (backing paper facing up), the heat will apply to inert silicone, resulting in 100% blank output.</li>
  <li><strong>The Scratch Test:</strong> Take a label and quickly scratch the surface with your fingernail using moderate pressure.
    <ul>
      <li>If a visible <strong>black streak appears</strong>, the label is genuine direct thermal paper. Ensure this black-streaking side is loaded facing <strong>UP</strong> towards the printhead.</li>
      <li>If <strong>no black mark appears</strong>, you have accidentally loaded <em>Thermal Transfer Paper</em> (which requires a thermal ribbon) or standard non-thermal paper. Rollo cannot print on non-thermal paper.</li>
    </ul>
  </li>
</ol>

<h2>Fix 2: Increasing Thermal Burn Density (Faint / Light Print)</h2>
<p>If text and barcodes appear grey, washed out, or broken:</p>
<ul>
  <li><strong>Windows:</strong> Open <em>Control Panel &gt; Devices and Printers</em>, right-click <strong>Rollo Printer</strong> &gt; <strong>Printing Preferences</strong> &gt; <strong>Settings</strong> tab. Change <strong>Darkness (Density)</strong> from the default of 8 up to <strong>11 or 12</strong>. Lower <strong>Print Speed</strong> from 5 in/sec to <strong>4 in/sec</strong> to allow the ceramic heating line a longer dwell time per raster dot.</li>
  <li><strong>Mac:</strong> In the print dialog, go to <em>Printer Features &gt; Printer Settings</em>, set <strong>Darkness</strong> to <strong>10</strong>, and save as a custom preset.</li>
</ul>

<h2>Fix 3: Cleaning Uneven Heat Element Voids</h2>
<p>If print density is dark on the left side of the shipping label but fades to nearly invisible on the right side:</p>
<ol>
  <li>Turn the printer OFF and open the top lid by pulling the two green release latches toward you.</li>
  <li>Locate the thin, dark ceramic line on the underside of the top lid (the thermal printhead).</li>
  <li>Inspect the line for adhesive residue, paper dust, or sticky label fragments.</li>
  <li>Gently wipe the ceramic strip back and forth using a sterile alcohol pad or cotton swab saturated with <strong>99% Isopropyl Alcohol</strong>.</li>
  <li>Allow to dry for 60 seconds, close the lid firmly until both latches click, and run a test print.</li>
</ol>`
  },
  {
    title: "Fix Rollo Printer Streaky Lines, Ghosting & Barcode Scanning Errors",
    slug: 'rollo-printer-streaky-lines-ghosting-barcode-scan-fix',
    seoTitle: "Fix Rollo Streaky Lines, Ghosting & Barcode Scanning Fix",
    metaDescription: "Resolve vertical white streak lines, ghosting double images, and unscannable USPS/UPS shipping barcodes on Rollo thermal label printers.",
    excerpt: "Vertical white voids through tracking barcodes prevent carrier scanners from reading packages. Learn how to clean thermal heating elements and eliminate image ghosting.",
    errorCode: null,
    tags: 'Rollo, Streaky Lines, Ghosting, Barcode Not Scanning, Thermal Printhead, White Lines, Dithering',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '7 minutes',
    categoryId: printQualityCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    featuredSnippet: "To fix streaky lines, ghosting, and unscannable barcodes on Rollo: 1) Vertical White Lines: Caused by a speck of dust or adhesive glue insulating one of the micro-heating dots on the ceramic printhead. Clean the ceramic printhead using 99% isopropyl alcohol. 2) Ghosting / Double Images: Caused by excessive darkness settings causing thermal bleed across adjacent raster lines. Lower darkness by 2 points. 3) Unscannable Barcodes: In your shipping platform (Pirate Ship, ShipStation, Etsy), set label format to '4x6 Thermal (PDF / 203 DPI)' rather than standard 8.5x11 letter paper to prevent raster dithering.",
    content: `<h2>Diagnosing Thermal Printhead Defects</h2>
<p>Because thermal printheads operate using direct physical contact under mechanical spring pressure, environmental contaminants like paper lint, airborne dust, and adhesive bleed from fanfold labels can insulate individual heating pins, resulting in distinct cosmetic flaws across your 4x6 labels.</p>

<h2>Defect 1: Razor-Thin Vertical White Streak Lines</h2>
<p>A crisp, continuous vertical white line that runs from the top of the label to the bottom indicates that <strong>one or more micro-heating pins are blocked</strong>.</p>
<ol>
  <li>Power off the Rollo printer and disconnect the power adapter.</li>
  <li>Open the top cover.</li>
  <li>Look at the dark ceramic printhead strip. You will likely see a tiny speck of label adhesive or paper lint stuck directly across the line where the streak appears on your labels.</li>
  <li>Rub the spot firmly with an alcohol prep swab (99% Isopropyl Alcohol).</li>
  <li>If the adhesive is hardened, gently scrape it using the flat edge of a plastic gift card (never use metal knives or razor blades, which will permanently crack the ceramic glass coating).</li>
</ol>

<h2>Defect 2: Ghosting &amp; Blurred Double Images</h2>
<p>Ghosting occurs when thermal energy from previous print lines lingers in the ceramic elements, causing faint dark shadows to appear beneath bold text and tracking numbers.</p>
<ul>
  <li><strong>Excessive Density:</strong> Your darkness setting is set too high (&gt; 13), saturating the thermal capacity of the printhead. Lower darkness to <strong>9 or 10</strong>.</li>
  <li><strong>Cheap Thermal Paper:</strong> Low-grade thermal paper with thin protective topcoats bleeds heat sideways into adjacent chemical crystals. Use high-grade commercial fanfold direct thermal labels with moisture and grease resistance.</li>
</ul>

<h2>Defect 3: Shipping Carrier Barcode Rejection Fix</h2>
<p>If USPS, UPS, or FedEx delivery drivers cannot scan your shipping labels:</p>
<ul>
  <li><strong>Format Mismatch:</strong> Never print an 8.5x11" two-per-page shipping label scaled down to 4x6" using your PDF viewer's "Fit to Page" option. This downsampling turns crisp 1-pixel vector barcode lines into fuzzy, dithered grey dots.</li>
  <li><strong>Native 4x6 Configuration:</strong> In your carrier settings (USPS Click-N-Ship, eBay, Pirate Ship, Shopify), change the label output format from <em>"Desktop / Letter / Laser"</em> to <strong>"4x6 / Thermal / Rollo"</strong>. This generates raw 203 DPI 1-bit monochrome vector barcodes that scan instantly.</li>
</ul>`
  },
  {
    title: "How to Calibrate Rollo Printer & Fix Label Skewing / Wrong Size",
    slug: 'rollo-printer-calibration-guide-skewed-label-size-fix',
    seoTitle: "How to Calibrate Rollo Printer (Fix Skewing & Label Size)",
    metaDescription: "Step-by-step automatic label calibration guide for Rollo printers. Fix crooked skewed feeding, skipped extra blank labels, and wrong page size dimensions.",
    excerpt: "When your Rollo printer skips a blank label after every print or feeds crooked, automatic optical gap calibration and guide rail adjustments fix the problem in 10 seconds.",
    errorCode: 'Calibration Fault',
    tags: 'Rollo, Calibration Guide, Skewed Labels, Label Size Wrong, Feeds Blank Label, Gap Sensor',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: '3 minutes',
    categoryId: paperCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredSnippet: "To automatically calibrate a Rollo printer: 1) Load your thermal labels into the rear slot until the printer grabs the first label. 2) Press and HOLD the circular top button until you hear ONE BEEP, then immediately release your finger. 3) The printer will rapidly feed several labels forward and backward to measure label gap height and black-mark boundaries with its transmissive optical sensor. 4) Once it stops, calibration is complete and the LED will glow solid green.",
    content: `<h2>Why Rollo Needs Automatic Label Calibration</h2>
<p>Rollo thermal printers do not require you to manually enter label dimensions for every different brand of paper. Instead, the printer features a high-speed <strong>transmissive optical gap sensor</strong> located beneath the paper path. Whenever you change label rolls, switch sizes (e.g., from 4x6" shipping labels to 2x1" barcode stickers), or experience skipped blank labels, running an <strong>Automatic Label Identification Calibration</strong> recalculates label boundaries instantly.</p>

<h2>Step-by-Step: The One-Beep Automatic Calibration Procedure</h2>
<ol>
  <li>Ensure the Rollo printer is plugged into power and turned <strong>ON</strong> (rocker switch to I).</li>
  <li>Insert your fanfold or roll thermal labels into the rear feeder slot with the printable side facing <strong>UP</strong>.</li>
  <li>Slide the paper in until the internal drive rollers sense the paper edge and grab the sheet automatically.</li>
  <li><strong>Press and HOLD the top circular button.</strong></li>
  <li>Listen carefully: within 3 to 4 seconds, the printer will emit <strong>ONE SHORT BEEP</strong>.</li>
  <li><strong>Release your finger immediately after the beep!</strong> (Do not keep holding, or it will enter factory diagnostic mode).</li>
  <li>The printer will feed 2 to 3 labels back and forth at high speed, measuring the exact distance between the die-cut gaps.</li>
  <li>The paper will stop perfectly aligned at the tear-off bar, and the top status LED will turn steady solid green.</li>
</ol>

<h2>Fixing Label Skewing &amp; Crooked Feeding</h2>
<p>If labels feed diagonally or wander toward the left or right edge during high-speed printing:</p>
<ul>
  <li><strong>Adjust Green Width Guides:</strong> Inside the rear loading slot, adjust the two green sliding plastic guides so they sit snug against the outer edges of the label backing paper. The paper must slide freely without buckling or having excess lateral wiggle room.</li>
  <li><strong>Check Roll Resistance:</strong> If using a roll holder, ensure the roll spins freely on its spindle without snagging or dragging on the tabletop.</li>
</ul>

<h2>Fixing 'Feeds an Extra Blank Label Every Time'</h2>
<p>If your Rollo prints one perfect label and immediately spits out a second blank label after it:</p>
<ol>
  <li>This is caused by a paper size mismatch in your operating system driver (e.g. your computer thinks the label is 7 inches long instead of 6 inches, triggering a page overflow).</li>
  <li><strong>On Windows:</strong> Go to <em>Printers &gt; Rollo &gt; Printing Preferences &gt; Page Setup</em>. Ensure Page Size is set strictly to <strong>4.00 x 6.00 in</strong>.</li>
  <li><strong>On Mac:</strong> In the print preview window, check that <em>Paper Size</em> is set to <strong>4x6" (100x150mm)</strong> and that <em>Scale</em> is set to <strong>100%</strong> (not "Fit to Printable Area").</li>
</ol>`
  },
  {
    title: "How to Fix Rollo Label Jams, Feeding Issues & Clean Platen Roller",
    slug: 'rollo-printer-label-jam-not-feeding-platen-roller-cleaning',
    seoTitle: "Fix Rollo Label Jams, Not Feeding & Clean Platen Roller",
    metaDescription: "Learn how to safely clear accordion label jams, fix paper feeding failures, and clean the rubber platen roller on Rollo thermal shipping printers.",
    excerpt: "When thermal labels wrap around the internal drive roller or the printer refuses to pull paper, cleaning adhesive buildup from the rubber platen roller fixes it.",
    errorCode: 'Paper Jam',
    tags: 'Rollo, Label Jam, Not Feeding, Platen Roller, Roller Cleaning, Sticky Label, Feeding Issue',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '8 minutes',
    categoryId: paperCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix a label jam and clean the Rollo platen roller: 1) Turn the printer OFF. 2) Pull the two green release latches on the sides of the printer forward to pop open the top lid. 3) Gently peel any jammed or accordion-folded labels off the black rubber platen roller (do NOT use sharp metal knives which will cut the rubber). 4) Clean sticky adhesive residue from the black rubber roller using a cotton swab saturated with 99% isopropyl alcohol while manually rotating the roller. 5) Allow to dry, close the lid firmly until both latches click, and re-feed paper.",
    content: `<h2>Why Rollo Printers Jam</h2>
<p>The Rollo printer relies on a single high-traction <strong>rubber platen roller</strong> situated directly beneath the thermal printhead. If a label peels off its silicone backing inside the machine, it can wrap tightly around the spinning rubber roller. Additionally, accumulated adhesive dust reduces roller friction, causing the feed mechanism to slip and fail to pull fresh labels from the rear tray.</p>

<h2>Step 1: Safely Clearing an Accordion Label Jam</h2>
<ol>
  <li>Immediately turn off the power rocker switch on the back of the printer to stop motor rotation.</li>
  <li>Locate the two green plastic release latches on the left and right sides of the machine.</li>
  <li>Pull both green latches forward simultaneously to pop open the top cover.</li>
  <li>If labels are bunched up like an accordion, gently grasp the paper bundle and pull it backward out through the rear slot.</li>
  <li>If a label has adhered itself around the black rubber roller:
    <ul>
      <li>Gently find the edge of the label with your fingernail.</li>
      <li>Peel the label slowly while rotating the roller forward with your thumb.</li>
      <li><strong>WARNING:</strong> Never use screwdrivers, utility knives, scissors, or tweezers to cut labels off the roller. Piercing or gouging the soft rubber platen roller will cause permanent repeating blank spots on all future labels and requires a full platen replacement.</li>
    </ul>
  </li>
</ol>

<h2>Step 2: Deep Cleaning the Black Rubber Platen Roller</h2>
<p>Over thousands of shipping labels, adhesive bleed deposits a sticky chemical film onto the platen roller that attracts airborne cardboard lint.</p>
<ol>
  <li>Keep the printer lid open.</li>
  <li>Saturate a clean lint-free cloth or cotton swab with <strong>99% Isopropyl Alcohol</strong>.</li>
  <li>Wipe the surface of the black rubber roller vigorously from left to right.</li>
  <li>Use your thumb to manually rotate the rubber cylinder 45 degrees and clean the next section until the entire 360-degree surface is matte black and non-sticky.</li>
  <li>Clean the clear optical sensor glass located in the center of the paper bed.</li>
  <li>Close the lid firmly. Press down on both outer edges of the top cover until you hear two audible clicks confirming the lid is locked.</li>
</ol>

<h2>Step 3: What to Do If the Printer Won't Grab Fresh Paper</h2>
<p>If you insert labels into the rear slot but the motorized feeder does not activate:</p>
<ul>
  <li>Ensure the paper is inserted straight and pushed in until it touches the rubber roller.</li>
  <li>Verify the status LED is <strong>solid green</strong>. If the LED is flashing red, the lid is unlatched or the printer is in error mode.</li>
  <li>Perform a quick power cycle (turn switch OFF, wait 5 seconds, turn ON).</li>
</ul>`
  },
  {
    title: "Rollo Printer Won't Stop Printing & Beeping Sound Meanings",
    slug: 'rollo-printer-wont-stop-printing-beeping-error-meanings',
    seoTitle: "Rollo Printer Won't Stop Printing & Beeping Meanings Guide",
    metaDescription: "Is your Rollo printer spitting out endless blank labels or beeping repeatedly? Learn what 1, 2, 3, and 5 beeps mean and how to flush runaway print spool queues.",
    excerpt: "When a Rollo printer goes rogue and prints hundreds of continuous blank sheets or beeps constantly, corrupted Windows spoolers and uncalibrated gap sensors are the cause.",
    errorCode: 'Runaway Spool / Beeps',
    tags: 'Rollo, Wont Stop Printing, Beeping Meaning, Continuous Printing, Spooler Jam, Flush Queue, Beep Codes',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '5 minutes',
    categoryId: errorCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "To stop a runaway Rollo printer that won't stop spitting labels: 1) Turn the power switch OFF immediately. 2) Open Windows Run (Win+R) > type 'services.msc' > find 'Print Spooler' > click Stop. 3) Open File Explorer, navigate to C:\\Windows\\System32\\spool\\PRINTERS, and delete all files inside. 4) Start the Print Spooler service. 5) Rollo Beeping Meanings: 1 Beep = Calibration completed; 2 Beeps = Label gap / black mark sensor error (run calibration); 3 Beeps = Out of paper or lid unlatched; 5 Beeps = Printhead overheating (allow 15 mins cooling).",
    content: `<h2>Why Thermal Printers Enter 'Runaway' Print Loops</h2>
<p>Because direct thermal label printers process print jobs as continuous roll-feed streams rather than fixed cut-sheet pages, a corrupted spooler payload from an internet browser (such as sending a multi-page HTML receipt instead of a vector 4x6 PDF) can cause the print spooler to send an infinite line-feed command, resulting in the printer spitting out dozens of blank labels without stopping.</p>

<h2>Step 1: Emergency Stop &amp; Flushing the Windows Print Queue</h2>
<ol>
  <li><strong>Immediate Cutoff:</strong> Flip the power rocker switch on the back of the Rollo printer to <strong>OFF (O)</strong>. Remove the label roll from the rear slot.</li>
  <li><strong>Stop the Print Spooler:</strong> Press <code>Windows Key + R</code>, type <code>services.msc</code>, and hit Enter. Scroll down to <strong>Print Spooler</strong>, right-click it, and click <strong>Stop</strong>.</li>
  <li><strong>Purge Spool Directory:</strong> Press <code>Windows Key + R</code>, paste the following path, and press Enter:
    <pre><code>C:\\Windows\\System32\\spool\\PRINTERS</code></pre>
  </li>
  <li>Select all files inside this folder (e.g. <code>.SHD</code> and <code>.SPL</code> files) and <strong>Delete</strong> them permanently.</li>
  <li><strong>Restart Spooler:</strong> In the Services window, right-click <strong>Print Spooler</strong> and click <strong>Start</strong>.</li>
  <li>Turn the Rollo printer back ON. It will boot cleanly without memory loops.</li>
</ol>

<h2>Step 2: Emergency Flush on macOS</h2>
<ol>
  <li>Power off the Rollo printer.</li>
  <li>Open <strong>Terminal</strong> on your Mac.</li>
  <li>Run the following command to cancel all active CUPS print jobs:
    <pre><code>cancel -a -x</code></pre>
  </li>
  <li>Power the Rollo printer back on.</li>
</ol>

<h2>Rollo Beep Sound Diagnostic Reference Matrix</h2>
<table style="width:100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1; text-align: left;">
      <th style="padding: 0.75rem;">Beep Pattern</th>
      <th style="padding: 0.75rem;">Underlying Hardware State</th>
      <th style="padding: 0.75rem;">Corrective Action</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold; color: #16a34a;">1 Short Beep</td>
      <td style="padding: 0.75rem;">Automatic Calibration Successful</td>
      <td style="padding: 0.75rem;">Normal operation; ready to print</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold; color: #dc2626;">2 Beeps</td>
      <td style="padding: 0.75rem;">Label Gap / Media Sensor Error</td>
      <td style="padding: 0.75rem;">Run automatic calibration (hold button until 1 beep)</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold; color: #dc2626;">3 Beeps</td>
      <td style="padding: 0.75rem;">Out of Paper or Lid Ajar</td>
      <td style="padding: 0.75rem;">Insert fresh labels; push lid down until both latches click</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold; color: #ea580c;">5 Continuous Beeps</td>
      <td style="padding: 0.75rem;">Printhead Overheating (Thermal Limit)</td>
      <td style="padding: 0.75rem;">Turn printer off; allow 15 minutes of cooling before resuming</td>
    </tr>
  </tbody>
</table>`
  }
];

async function main() {
  const brand = await prisma.brand.findUnique({ where: { slug: 'rollo' } });
  if (!brand) throw new Error('Rollo brand not found in database.');

  console.log(`🚀 Publishing Batch 2 (Clusters C & D: Quality & Physical) for brand: ${brand.name}`);

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
