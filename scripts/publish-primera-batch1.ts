import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';
const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';
const printQualityCategory = 'e3d26347-33bf-41a7-9cbf-c3d821850f98';
const inkTonerCategory = '9af9508c-4517-47bc-9084-8ab635b1283b';
const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix Primera PTStatus Invalid Cartridge, Missing Printhead & RFID Errors",
    slug: 'primera-ptstatus-invalid-cartridge-missing-printhead-rfid-errors',
    seoTitle: "Fix Primera PTStatus Invalid Cartridge & Missing Printhead",
    metaDescription: "Is PTStatus showing an 'Invalid Cartridge', 'Missing Printhead', or RFID sensor error on your Primera LX series printer? Learn how to clean copper contacts and reset the carriage.",
    excerpt: "The Primera PTStatus monitor relies on copper contacts and RFID chips to verify ink cartridges. When communication breaks, the printer halts with invalid cartridge errors.",
    errorCode: 'Invalid Cartridge / Missing Printhead',
    tags: 'Primera, PTStatus Invalid Cartridge Error, Missing Printhead Error, Cartridge Not Connected Error, RFID Sensor Error Cartridge, Missing Cartridge Error LX900',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: errorCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "To fix a Primera 'Invalid Cartridge' or 'Missing Printhead' error in PTStatus: 1) Remove the ink cartridges and the printhead carriage. 2) Look at the copper contact pads on the back of the printhead and inside the printer carriage. 3) Gently wipe these copper contacts with a coffee filter slightly dampened with 99% isopropyl alcohol to remove dried ink spray. 4) For RFID errors, verify you are using genuine Primera OEM ink. Third-party inks often have cloned RFID chips that are blocked by modern firmware updates. 5) Reinstall the printhead and cartridges, pressing down firmly until they click.",
    content: `<h2>Understanding PTStatus and Hardware Handshakes</h2>
<p>The <strong>PTStatus</strong> (Primera Technology Status) monitor is the software bridge between your computer and your Primera LX-series color label printer (like the LX900 or LX2000). Every time you turn the printer on, the logic board performs a hardware handshake with the copper contacts on the printhead and reads the RFID tags embedded in the ink cartridges.</p>

<h2>Fix 1: The 'Missing Printhead' Error</h2>
<p>If PTStatus reports the printhead is missing, but it is physically installed in the machine, the logic board cannot detect electrical continuity.</p>
<ol>
  <li>Open the top cover. Wait for the carriage to center.</li>
  <li>Remove all individual ink cartridges and set them aside on a paper towel.</li>
  <li>Unlatch and remove the primary printhead assembly.</li>
  <li><strong>Clean the Contacts:</strong> Inspect the gold/copper pogo pins inside the printer carriage, and the flat copper pads on the back of the printhead. Dried ink acts as an insulator. Wipe both sets of contacts with a lint-free swab dipped in rubbing alcohol.</li>
  <li>Reinstall the printhead, ensuring the latch locks down completely.</li>
</ol>

<h2>Fix 2: 'Invalid Cartridge' & RFID Sensor Errors</h2>
<p>Unlike basic desktop printers, Primera LX-series printers use RFID (Radio Frequency Identification) tags on the bottom of the ink tanks to track ink levels and prevent counterfeit cartridges.</p>
<ul>
  <li><strong>The Genuine Ink Requirement:</strong> If you recently purchased cheap third-party remanufactured ink, the RFID chip is likely a cloned serial number. If your printer's firmware recently updated, it will permanently blacklist that cloned RFID tag, resulting in an "Invalid Cartridge" or "RFID Sensor Error". You must replace it with a genuine Primera OEM cartridge.</li>
  <li><strong>Physical Misalignment:</strong> Sometimes the cartridge isn't seated deeply enough for the RFID reader to detect the tag. Press down firmly on the top of the offending cartridge until you feel a distinct mechanical click.</li>
</ul>`
  },
  {
    title: "Troubleshoot Primera Printer Offline, Error State & PTStatus Won't Open",
    slug: 'primera-printer-offline-error-state-ptstatus-wont-open',
    seoTitle: "Troubleshoot Primera Printer Offline & PTStatus Won't Open",
    metaDescription: "Is your Primera printer stuck offline, in an error state, or is the PTStatus application refusing to open on Windows? Learn how to restart the spooler and fix USB comms.",
    excerpt: "When the Primera printer goes offline or PTStatus won't launch, the USB communication port in Windows has locked up or the print spooler has crashed.",
    errorCode: 'Printer Offline / Software Freeze',
    tags: 'Primera, Printer Offline PTStatus, Printer Error State PTStatus, PTStatus Wont Open, Windows Print Spooler, USB Connection',
    wordCount: 1050,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: softwareCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix a Primera printer stuck offline or PTStatus not opening: 1) Restart the Print Spooler: Press the Windows Key, type 'Services', and hit enter. Scroll down to 'Print Spooler', right-click it, and select 'Restart'. 2) Force Quit PTStatus: Press Ctrl+Shift+Esc to open Task Manager. Look for 'PTStatus' or 'PTStatus_Monitor' running in the background. Right-click and 'End Task'. 3) Reset the USB Port: Unplug the USB cable from the printer. Turn the printer OFF, wait 10 seconds, and turn it back ON. Open PTStatus, then plug the USB cable back into the computer.",
    content: `<h2>Diagnosing 'Printer Offline' in PTStatus</h2>
<p>The <strong>PTStatus</strong> application is a bi-directional monitor. It not only sends print jobs but constantly asks the printer for ink levels and sensor statuses. If Windows loses its grip on the USB port, PTStatus will freeze, crash, or report the printer as <strong>Offline</strong> or in an <strong>Error State</strong>.</p>

<h2>Fix 1: Clearing Background PTStatus Processes</h2>
<p>If you click the PTStatus icon on your desktop and absolutely nothing happens, the application is likely stuck in a silent crash loop in the background.</p>
<ol>
  <li>Press <strong>Ctrl + Shift + Esc</strong> to open the Windows Task Manager.</li>
  <li>Click <strong>More details</strong> at the bottom.</li>
  <li>Scroll through the "Background processes" list and look for <code>PTStatus.exe</code> or <code>StatusMonitor</code>.</li>
  <li>Right-click the process and select <strong>End task</strong>.</li>
  <li>Wait a few seconds, then double-click the PTStatus icon on your desktop again. It should now launch correctly.</li>
</ol>

<h2>Fix 2: Resolving the Windows 'Error State'</h2>
<p>If Windows Settings says the Primera printer is in an "Error State", it usually means there is a corrupt document stuck in the print queue that the printer rejected.</p>
<ul>
  <li>Open the Windows Start menu and type <strong>Printers &amp; Scanners</strong>.</li>
  <li>Select your Primera LX printer and click <strong>Open queue</strong>.</li>
  <li>If there are documents listed, click <strong>Printer &gt; Cancel All Documents</strong>.</li>
  <li>If the documents say "Deleting..." but never disappear, you must restart the Windows Print Spooler service. Press <code>Win + R</code>, type <code>services.msc</code>, locate "Print Spooler", and click Restart.</li>
</ul>

<h2>Fix 3: USB Port Suspension</h2>
<p>Windows has a power-saving feature called "USB Selective Suspend" which turns off USB ports to save electricity. This wreaks havoc on label printers. Go to <strong>Power Options &gt; Change plan settings &gt; Change advanced power settings &gt; USB settings</strong> and <strong>Disable</strong> USB selective suspend setting.</p>`
  },
  {
    title: "Primera Printhead Life Percentage & Damaged Cartridge Contacts Fix",
    slug: 'primera-printhead-life-percentage-damaged-cartridge-contacts-fix',
    seoTitle: "Primera Printhead Life Percentage & Damaged Contacts Fix",
    metaDescription: "What does the Printhead Life Percentage mean in PTStatus? Learn when to replace the printhead and how to fix damaged copper cartridge contacts.",
    excerpt: "The Primera printhead is a consumable part. PTStatus tracks its life percentage based on ink droplets fired, but physical damage to copper contacts can end it prematurely.",
    errorCode: null,
    tags: 'Primera, Printhead Life Percentage Explained, Cartridge Contacts Damaged Fix, Thermal Inkjet Printhead, LX900 Printhead, Maintenance',
    wordCount: 1000,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: inkTonerCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredSnippet: "Understanding Primera Printhead Life: The Printhead Life Percentage in PTStatus is a software calculation of how many million microscopic ink droplets have been fired. A printhead at 0% life might still print perfectly, while a damaged printhead at 80% life might fail. The printhead is a consumable part (like tires on a car) and typically lasts for 4 to 8 full sets of ink cartridges. If you get a hardware error, check the copper contacts on the back of the printhead. If the gold pins are bent, scratched, or missing, the printhead is permanently damaged and must be replaced.",
    content: `<h2>Understanding Primera Printhead Life Percentage</h2>
<p>In the PTStatus application, you will notice a progress bar labeled <strong>Printhead Life</strong>. Many users panic when they see this number drop rapidly. Here is exactly what it means:</p>

<h3>How the Percentage is Calculated</h3>
<ul>
  <li>The printer does not have a magical sensor that analyzes the physical wear on the microscopic ceramic nozzles.</li>
  <li>Instead, the logic board keeps a strict tally of exactly how many millions of ink droplets have been fired through the nozzles.</li>
  <li>It compares this tally against the engineering lifespan rating of the printhead to give you a percentage.</li>
</ul>

<h3>When Do I Actually Need to Replace It?</h3>
<p>The percentage is a <em>guideline</em>, not a hard rule. A printhead can reach 0% and continue to print flawlessly for another 6 months. Conversely, a printhead at 90% life can be destroyed instantly by a severe paper jam or a physical scratch. <strong>Do not replace the printhead based on the percentage alone. Replace it only when print quality degrades (banding/streaking) and deep cleaning cycles no longer fix the issue.</strong></p>

<h2>Fixing Damaged Cartridge Contacts</h2>
<p>The back of the printhead features dozens of flat copper/gold squares. These align with spring-loaded pogo pins inside the printer carriage.</p>
<ol>
  <li><strong>Corrosion from Ink Leaks:</strong> If a third-party cartridge leaks ink down the back of the printhead, it can short circuit these copper pads. This is the leading cause of sudden printhead death. Clean the pads immediately with 99% isopropyl alcohol.</li>
  <li><strong>Scratched Pads:</strong> If a user aggressively scrubs the contacts with a rough cloth or a screwdriver to clean them, the thin copper plating will scratch off, breaking the electrical circuit permanently. Always use a soft coffee filter or lint-free swab.</li>
  <li>If the contacts are physically gouged or burned (black scorch marks), the printhead cannot be repaired. A new OEM printhead must be ordered.</li>
</ol>`
  },
  {
    title: "Fix Primera LX900 Missing Colors, Banding Streaks & Faded Print",
    slug: 'primera-lx900-missing-colors-banding-streaks-faded-print',
    seoTitle: "Fix Primera Missing Colors, Banding Streaks & Faded Print",
    metaDescription: "Is your Primera LX900 or LX2000 printing faded labels, missing colors (only black/yellow), or leaving horizontal white streaks? Learn how to unclog the nozzles.",
    excerpt: "Horizontal white lines (banding) and missing colors are caused by dried ink clogging the microscopic nozzles in the thermal inkjet printhead. Here is how to deep clean it.",
    errorCode: 'Poor Print Quality',
    tags: 'Primera, LX900 Printing Black And Yellow Only, Printer Banding Streaks Fix, Missing Colors Label, Faded Print, Poor Print Quality Troubleshooting, Clogged Nozzles',
    wordCount: 1200,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: printQualityCategory,
    authorId: authors.david,
    reviewerId: authors.elena,
    featuredSnippet: "To fix missing colors, banding, and faded prints on a Primera label printer: 1) Run a Clean Cycle: Open PTStatus and run the 'Clean Printhead' utility 2-3 times. 2) Manual Printhead Flush: If software cleaning fails, remove the printhead. Dampen a folded paper towel with hot distilled water. Firmly press the bottom of the printhead against the wet towel and hold for 30 seconds to wick out dried ink. 3) Missing Colors (e.g., only black/yellow printing): This means the Cyan or Magenta nozzles are completely blocked, or the cartridge is air-locked. Ensure the orange tape covering the cartridge vent hole is completely removed.",
    content: `<h2>Diagnosing Poor Print Quality on Primera Printers</h2>
<p>Primera LX-series color label printers utilize high-resolution thermal inkjet technology. While they produce stunning, photo-quality product labels, they are susceptible to clogged nozzles if the printer sits idle for several weeks.</p>

<h2>Problem 1: Missing Colors (e.g., Only Printing Black and Yellow)</h2>
<p>If your full-color label design prints, but the blue sky is missing (no Cyan) or the red apples look orange/yellow (no Magenta), an entire ink channel is failing to flow.</p>
<ol>
  <li><strong>The Vent Hole Seal:</strong> When installing a new ink cartridge, you must pull off the yellow/orange tape tab. This uncovers a microscopic vent hole at the top of the cartridge. If this hole is blocked, a vacuum forms inside the tank, preventing ink from flowing down to the printhead. Double-check that the tape is completely removed and no adhesive residue is blocking the hole.</li>
  <li><strong>Empty Cartridge False Reading:</strong> Occasionally, the RFID chip will tell PTStatus the cartridge is 30% full, but the tank is actually bone dry. If a color is entirely missing, replace that specific cartridge to test.</li>
</ol>

<h2>Problem 2: Banding Streaks (Horizontal White Lines)</h2>
<p>If you see perfectly straight, horizontal white lines cutting through solid blocks of color, individual microscopic nozzles are clogged with dried ink.</p>

<h3>Step 1: Software Cleaning</h3>
<p>Open <strong>PTStatus</strong> and click <strong>Clean Printhead</strong>. Run this utility up to 3 times. Do not run it more than 3 times back-to-back, as you will waste a massive amount of ink.</p>

<h3>Step 2: The Manual "Hot Towel" Flush</h3>
<p>If software cleaning fails, you must manually unclog the printhead plate.</p>
<ol>
  <li>Remove the printhead from the printer.</li>
  <li>Fold a thick, lint-free paper towel (or a coffee filter) into a square.</li>
  <li>Soak the center of the towel with <strong>Hot Distilled Water</strong>. Do not use tap water (minerals will clog the nozzles) and do not use rubbing alcohol on the bottom nozzle plate (it degrades the sealants).</li>
  <li>Press the bottom nozzle plate of the printhead firmly against the wet, hot towel. Hold it there for 30 to 60 seconds.</li>
  <li>You should see four distinct stripes of ink (Cyan, Magenta, Yellow, Black) wick out onto the towel. If a color is missing from the towel stripe, that channel is severely clogged. Repeat until all 4 colors wick freely.</li>
</ol>

<h2>Problem 3: Faded Print & Poor Saturation</h2>
<p>If the entire label looks washed out or pastel, you are printing on the wrong media type. Primera dye-based inks require an inkjet-coated top layer. If you try to print on standard untreated glossy paper or thermal transfer paper, the ink will puddle on the surface and appear incredibly faded. Ensure your driver settings match the paper type (e.g., High Gloss vs. Matte).</p>`
  },
  {
    title: "Primera LX Series Nozzle Check, Printhead Alignment & Calibration",
    slug: 'primera-lx-series-nozzle-check-printhead-alignment-calibration',
    seoTitle: "Primera Nozzle Check, Printhead Alignment & Calibration",
    metaDescription: "Learn how to print and read a nozzle check pattern, align a new printhead, and calibrate your Primera LX series color label printer for perfect registration.",
    excerpt: "Every time you install a new printhead or experience blurry text, you must perform a nozzle check and a printhead alignment to ensure sharp, professional labels.",
    errorCode: null,
    tags: 'Primera, Nozzle Check Pattern LX Series, Print Head Alignment Guide, Color Label Printer Calibration, Blurry Text, Color Shifting',
    wordCount: 1050,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: printQualityCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredSnippet: "To perform a Printhead Alignment and Nozzle Check on a Primera LX-series printer: 1) Open PTStatus on your computer. 2) Click on the 'Cartridge/Printhead' tab. 3) Click 'Print Nozzle Check'. The printer will output a stair-step grid of lines in Cyan, Magenta, Yellow, and Black. If the lines are broken or missing, you must clean the printhead. 4) To fix blurry text or color ghosting, click 'Align Printhead'. The printer will print a sheet with various letter/number blocks. Select the block in the PTStatus software where the lines overlap perfectly without white gaps.",
    content: `<h2>The Importance of Nozzle Checks</h2>
<p>A <strong>Nozzle Check Pattern</strong> is a diagnostic printout that tests every single microscopic nozzle on the thermal inkjet printhead. It is the only definitive way to prove whether a print quality issue is caused by a hardware clog or a software setting.</p>

<h3>How to Read the Nozzle Check</h3>
<ol>
  <li>Open <strong>PTStatus</strong>. Navigate to the maintenance tab and click <strong>Print Nozzle Check</strong>.</li>
  <li>The printer will print a diagonal "stair-step" grid of lines for each of the four colors (C, M, Y, K).</li>
  <li>Examine the grid closely under bright light.</li>
  <li><strong>Perfect:</strong> The grid looks like a continuous, unbroken staircase.</li>
  <li><strong>Clogged:</strong> There are missing rungs in the staircase, or entire sections are blank. You must perform a manual hot-water flush on the printhead.</li>
</ol>

<h2>How to Align the Printhead</h2>
<p>If your labels are printing with "ghosting", fuzzy/blurry small text, or colors bleeding outside the lines (e.g., the red ink prints slightly to the left of the black outline), the printhead is physically misaligned. This must be done every time you install a brand-new printhead.</p>
<ol>
  <li>Load standard 4x6 or continuous label stock.</li>
  <li>In PTStatus, click <strong>Align Printhead</strong>.</li>
  <li>The printer will output a calibration sheet featuring several rows of lines or boxes labeled with letters and numbers.</li>
  <li>Look at the printed sheet. Find the specific box in each row where the lines align perfectly, with no overlap and no white gaps between them.</li>
  <li>Enter the corresponding letter/number into the PTStatus prompt and click Apply. The printer's firmware will now compensate for the microscopic manufacturing tolerances of that specific printhead.</li>
</ol>

<h2>Color Calibration vs Paper Type</h2>
<p>If your colors look perfectly sharp but the shades are wrong (e.g., Coca-Cola red looks slightly orange), you need to calibrate the color profile in the Windows driver, not the hardware. Open the Primera Printing Preferences and change the <strong>Media Type</strong>. Changing from "Glossy" to "Matte" drastically alters how the driver mixes cyan and magenta to achieve reds.</p>`
  }
];

async function main() {
  const brandSlug = 'primera-technology';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 1 (Clusters A & B: Errors & Print Quality) for brand: ${brand.name}`);

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
