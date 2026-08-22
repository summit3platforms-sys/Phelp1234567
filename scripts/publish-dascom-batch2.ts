import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
const maintenanceCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';
const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Dascom 2600 & 2610 Troubleshooting: Error Codes & Not Printing",
    slug: 'dascom-2600-2610-error-not-printing',
    seoTitle: "Fix Dascom 2600+ Plus Errors & 2610 Not Printing",
    metaDescription: "A complete troubleshooting guide for the Dascom 2600, 2600+, and 2610 dot matrix printers. Fix blinking error lights, paper jams, and print failures.",
    excerpt: "The Dascom 2600 series is a staple in logistics and warehousing. When the alarm light flashes, here is how to decode the error and get it printing again.",
    errorCode: null,
    tags: 'Dascom, 2600, 2600 Plus, 2610, Error Code, Not Printing, Alarm Light',
    wordCount: 950,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: errorCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "To decode Dascom 2600 and 2610 errors: If the ALARM light flashes continuously, the printer is out of paper or the paper is jammed in the tractor. If the ALARM light flashes along with the PITCH light, there is a Print Head Hot error; turn the printer off and let the metal print head cool for 15 minutes. If the printer receives data but is not printing, check the 'ON LINE' light. The printer must be online to print. Press the ON LINE button once so the green light stays solid.",
    content: `<h2>Decoding Dascom 2600 Blinking Lights</h2>
<p>Unlike modern LCD screens, the Dascom 2600, 2600+, and 2610 printers communicate their errors through a series of LED flashes on the front control panel. Understanding these flashes is the key to fixing the printer.</p>

<h3>1. Alarm Light Flashing (Paper Out / Jam)</h3>
<p>The most common error is a simple flashing red <strong>ALARM</strong> light. This indicates a paper feed error.</p>
<ul>
    <li>The continuous form paper has run out.</li>
    <li>The paper is jammed under the platen.</li>
    <li>The paper path selector lever is in the wrong position (e.g., it is set to Friction Feed while you are trying to use the Tractor).</li>
</ul>
<p><strong>Fix:</strong> Clear any jammed paper, reload the paper into the tractor, ensure the selector lever is on Tractor, and press the <strong>LOAD/EJECT</strong> button.</p>

<h3>2. Alarm + Pitch Lights Flashing (Print Head Overheating)</h3>
<p>If you are printing thousands of invoices consecutively without a break, the heavy metal print head generates massive friction and heat. To prevent melting the ribbon or damaging the coils, the printer's thermal sensor triggers a halt.</p>
<p><strong>Fix:</strong> Do not use compressed air to cool it rapidly, as this can crack the metal. Simply turn the printer off, step away for 15 to 20 minutes to let it air cool, and turn it back on to resume the job.</p>

<h2>Dascom 2610 Not Printing (Offline Glitch)</h2>
<p>If you send a print job from Windows, but the Dascom 2610 just sits silently without flashing any error lights, the printer is likely offline or experiencing a data buffer lock.</p>
<ol>
    <li>Check the <strong>ON LINE</strong> light on the far left of the control panel. If it is off or flashing, the printer is ignoring the computer. Press the <strong>ON LINE</strong> button once to turn the green light solid.</li>
    <li>If the light is solid but it still won't print, the internal memory buffer is jammed with a corrupted print job. Turn the printer off. On your computer, open the Windows Print Spooler and cancel all pending documents. Turn the printer back on and try again.</li>
    <li>Ensure the interface cable (USB, Parallel, or Serial) is securely screwed into the back of the printer. A loose parallel port clip is the number one cause of silent data failures on legacy systems.</li>
</ol>`
  },
  {
    title: "Tally Dascom 2800 Series Setup Guide (2810, 2820 & Windows 11)",
    slug: 'tally-dascom-2800-series-setup-guide',
    seoTitle: "Tally Dascom 2810 / 2820 / LA2800 Setup & Driver Guide",
    metaDescription: "Learn how to set up the heavy-duty Tally Dascom 2800 series (2810, 2820, LA2800), download Windows 11 drivers, and configure the automatic gap adjustment.",
    excerpt: "The Tally Dascom 2800 series are premium, high-speed impact printers. Setting them up correctly requires specific Windows 11 driver configurations and tractor adjustments.",
    errorCode: null,
    tags: 'Dascom, 2800, 2810, 2820, LA2800, Setup, Driver, Windows 11, Automatic Gap',
    wordCount: 1050,
    difficultyLevel: 'Beginner',
    timeToFix: '15 minutes',
    categoryId: setupCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "To set up the Tally Dascom 2810/2820 in Windows 11: 1) Do not plug the USB cable in yet. Go to the official Dascom website and download the 'Dascom 2800 Series Windows Driver'. 2) Run the installer as Administrator. 3) When prompted by the software, connect the USB or Ethernet cable to the printer and turn it on. 4) Windows will detect the printer. 5) Go to Printers & Scanners in Windows, select the Dascom 2800, click Printer Properties > Advanced, and ensure 'Print directly to the printer' is checked for faster throughput.",
    content: `<h2>The Heavy-Duty 2800 Series</h2>
<p>The Tally Dascom 2800 family—which includes the 2810, the wide-carriage 2820, and the DEC-compatible LA2800—are designed for brutal, 24/7 industrial environments. Because they process massive volumes of data, proper driver installation and interface setup are critical.</p>

<h2>Step 1: Driver Installation (Windows 10 & 11)</h2>
<p>Impact printers do not rely on standard Windows Plug-and-Play as smoothly as modern laser printers do. You must use the manufacturer's specific driver to enable advanced features like Automatic Gap Adjustment and specific barcoding fonts.</p>
<ol>
    <li>Leave the printer unplugged from the computer.</li>
    <li>Navigate to the official Dascom regional website (e.g., dascomamericas.com or dascom.com).</li>
    <li>Go to Support &gt; Drivers, and search for the <strong>2800 Series</strong>.</li>
    <li>Download the Windows 10/11 x64 driver package.</li>
    <li>Run the setup executable. Choose your connection type (USB, Ethernet, or Parallel).</li>
    <li>When the installer prompts you, plug the cable into the printer and power it on. The installer will bind the port.</li>
</ol>

<h2>Step 2: Windows Spooler Optimization</h2>
<p>By default, Windows attempts to spool dot matrix print jobs as high-resolution graphic images, which causes massive delays (the printer will print a few lines, pause for 10 seconds, and print a few more).</p>
<ul>
    <li>Open Windows <strong>Printers &amp; Scanners</strong>.</li>
    <li>Select the Dascom 2810/2820 and click <strong>Printer Properties</strong>.</li>
    <li>Go to the <strong>Advanced</strong> tab.</li>
    <li>Select the radial button for <strong>"Print directly to the printer"</strong> instead of "Spool print documents". This forces Windows to send raw ASCII text data to the printer, resulting in lightning-fast, continuous printing.</li>
</ul>

<h2>Step 3: Understanding Automatic Gap Adjustment (AGA)</h2>
<p>Unlike the cheaper 1140 or 2600 models, the 2810 and 2820 feature <strong>Automatic Gap Adjustment</strong>. There is no manual lever to move when switching between a single sheet of paper and a thick 6-part form.</p>
<p>When the printer pulls the paper in, the print head will slowly slide over the edge of the paper, optical sensors will measure the thickness, and motorized gears will adjust the carriage rail automatically. <strong>Do not try to force the carriage forward or backward manually</strong>, as you will strip the AGA gears.</p>`
  },
  {
    title: "Dascom 1140 Paper Feed Issues & Error Diagnostics",
    slug: 'dascom-1140-not-feeding-paper-error',
    seoTitle: "Fix Dascom 1140 Not Feeding Paper (Jam & Setup Guide)",
    metaDescription: "Is your Dascom 1140 dot matrix printer not feeding paper, jamming, or flashing an error light? Learn how to fix friction and tractor feed issues on the 1140.",
    excerpt: "The Dascom 1140 is a compact, reliable 9-pin printer, but incorrect paper lever settings can cause immediate paper jams and feed failures.",
    errorCode: null,
    tags: 'Dascom, 1140, Paper Feed, Jam, Not Feeding, Tractor, Friction',
    wordCount: 850,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: maintenanceCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "To fix a Dascom 1140 that is not feeding paper: Look at the green Paper Release Lever on the top right side of the printer. If you are using continuous form paper (with holes on the sides), push the lever backward toward the 'Tractor' icon. If you are feeding single sheets of paper through the top slot, pull the lever forward toward the 'Friction' (single sheet) icon. If this lever is in the wrong position, the printer's gears will not grab the paper, resulting in a feed error.",
    content: `<h2>The #1 Cause of Dascom 1140 Feed Failures</h2>
<p>The Dascom 1140 is highly versatile because it can accept paper from the rear tractor (for continuous forms) or from the top slot (for single cut sheets). However, it uses the exact same motor to drive both paths. It relies on a mechanical clutch, controlled by the user, to switch between the two.</p>
<p>If you press print and the printer whirs but the paper doesn't move, you have the <strong>Paper Release Lever</strong> in the wrong position.</p>

<h3>How to Set the Lever Correctly</h3>
<p>Locate the green lever on the right side of the printer casing.</p>
<ul>
    <li><strong>For Continuous Paper (Tractor):</strong> Push the lever toward the rear of the printer (the icon showing paper with holes in it). This disengages the rubber platen rollers and engages the rear sprocket wheels.</li>
    <li><strong>For Single Sheets (Friction):</strong> Pull the lever toward the front of the printer (the icon showing a single, solid sheet of paper). This engages the rubber platen rollers to grab the paper from the top slot.</li>
</ul>

<h2>Fixing Deep Paper Jams</h2>
<p>If the lever is in the correct position but the paper is physically jammed and crumpled under the black rubber roller (platen):</p>
<ol>
    <li>Turn the printer off.</li>
    <li>Pull the green Paper Release Lever forward (to the Friction setting) to release the pressure from the tractor.</li>
    <li>Open the top cover and remove the ribbon cartridge to give yourself a clear view of the print head.</li>
    <li>Locate the large green platen knob on the right side of the printer. Turn it manually to roll the jammed paper forward and out of the printer. <strong>Never pull jammed paper backwards out of the rear slot</strong>, as this bends the fragile paper sensors under the platen.</li>
    <li>Once clear, replace the ribbon and reset the lever to your desired paper type.</li>
</ol>`
  },
  {
    title: "Tally Dascom T2250 Error Codes & Blinking Lights Explained",
    slug: 'dascom-t2250-error-code-lights',
    seoTitle: "Fix Tally Dascom T2250 Error Codes (Blinking Lights)",
    metaDescription: "Decode the blinking lights and error codes on the Tally Dascom T2250 dot matrix printer. Fix paper out, head hot, and fatal mechanical errors.",
    excerpt: "The Tally Dascom T2250 is a legendary workhorse, but its LED error light system can be cryptic. Here is the master cheat sheet to decode T2250 errors.",
    errorCode: null,
    tags: 'Dascom, T2250, Error Code, Blinking Lights, Troubleshooting, Paper Jam',
    wordCount: 800,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: errorCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "Tally Dascom T2250 Blinking Light Codes: 1) ALARM flashing slowly (once per second): The printer is out of paper or a jam has triggered the paper sensor. 2) ALARM flashing rapidly (twice per second): Fatal mechanical error, usually a carriage jam. Check for obstructions on the silver rail. 3) ONLINE and ALARM flashing together: The print head is overheating. The printer will pause automatically to let the metal cool down, and will resume printing on its own after 10-15 minutes.",
    content: `<h2>Decoding the T2250 Control Panel</h2>
<p>The Tally Dascom T2250 is one of the most durable impact printers ever manufactured, but it occasionally needs user intervention. When a problem occurs, the printer halts, beeps, and flashes specific lights on its control panel.</p>

<h3>1. Slow Flashing ALARM Light</h3>
<p>If the red ALARM light flashes slowly (about 1 flash per second), this is a routine <strong>Paper Error</strong>.</p>
<ul>
    <li>The continuous paper supply is empty.</li>
    <li>The paper is jammed and covering the optical sensor.</li>
    <li>The paper is loaded, but it has not been advanced past the internal sensor. (Press the LOAD/EJECT button to advance the paper into the ready position).</li>
</ul>

<h3>2. Rapid Flashing ALARM Light</h3>
<p>If the red ALARM light flashes rapidly (2 to 3 flashes per second), this is a <strong>Fatal Hardware Error</strong>.</p>
<p>The printer has detected that a motor is stalled. This is almost always a carriage jam. Turn the printer off. Open the lid and inspect the silver metal carriage rail. Look for a torn piece of paper wedged under the print head, or check if the carriage rail is coated in thick, sticky, dried oil that is preventing the print head from moving. Clean and lubricate the rail if necessary.</p>

<h3>3. ONLINE and ALARM Flashing Simultaneously</h3>
<p>This is a <strong>Print Head Hot</strong> warning. The T2250 is a 24-pin printer; if it fires those pins rapidly for an hour straight on a dense graphics or barcode job, the magnetic coils get dangerously hot.</p>
<p>Do not turn the printer off, and do not cancel the job. The printer has paused itself intentionally to allow the internal fans to cool the print head. Leave the printer alone; once the thermistor registers a safe temperature, it will automatically resume the print job exactly where it left off.</p>`
  },
  {
    title: "Dascom 1140 vs 2600: Which Dot Matrix Printer Do You Need?",
    slug: 'tally-dascom-1140-vs-dascom-2600',
    seoTitle: "Dascom 1140 vs 2600: Dot Matrix Printer Comparison",
    metaDescription: "Comparing the Dascom 1140 (9-pin compact) vs the Dascom 2600 (24-pin heavy duty). Which impact printer is better for your warehouse, logistics, or invoice needs?",
    excerpt: "If your business needs a reliable impact printer for carbonless forms, Dascom offers two distinct paths: the compact 1140 or the heavy-duty 2600. Here is the breakdown.",
    errorCode: null,
    tags: 'Dascom, 1140, 2600, Comparison, Buying Guide, Dot Matrix, Impact Printer',
    wordCount: 950,
    difficultyLevel: 'Beginner',
    timeToFix: 'N/A',
    categoryId: setupCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredSnippet: "Dascom 1140 vs 2600 comparison: The Dascom 1140 is a budget-friendly 9-pin printer designed for low-volume, single-copy or 3-part forms in tight office spaces. It prints up to 400 characters per second (cps). The Dascom 2600 is a heavy-duty 24-pin industrial printer built for warehouses and continuous 24/7 use. It is much faster (up to 680 cps), produces higher resolution text/barcodes, and can punch through thicker 6-part forms, but costs significantly more.",
    content: `<h2>The Role of Impact Printers in Modern Business</h2>
<p>While inkjets and lasers dominate home offices, industrial sectors like logistics, aviation, and warehousing still rely heavily on dot matrix impact printers. They are the only printers capable of printing on carbonless multi-part forms (like bills of lading and shipping manifests). If you are upgrading your logistics desk, you are likely looking at the <strong>Dascom 1140</strong> and the <strong>Dascom 2600</strong>.</p>

<h2>Dascom 1140: The Compact 9-Pin</h2>
<p>The Dascom 1140 is designed for front-desk use, retail counters, and small offices.</p>
<ul>
    <li><strong>Print Head:</strong> 9-pin. This means the text is legible but distinctly "dotted." It is not ideal for printing complex, high-density barcodes.</li>
    <li><strong>Speed:</strong> Up to 400 characters per second (cps). Fast enough for occasional invoices.</li>
    <li><strong>Paper Handling:</strong> It can handle 1 original plus 3 or 4 carbon copies (up to a 5-part form).</li>
    <li><strong>Footprint:</strong> It is small, lightweight, and easily fits on a cramped retail desk.</li>
    <li><strong>Verdict:</strong> Choose the 1140 if you only print a few dozen invoices a day and need to save desk space and money.</li>
</ul>

<h2>Dascom 2600 (and 2600+): The Industrial 24-Pin</h2>
<p>The Dascom 2600 series is a completely different beast. It is built for punishing warehouse environments and non-stop continuous printing.</p>
<ul>
    <li><strong>Print Head:</strong> 24-pin. With more than double the pins of the 1140, the 2600 prints at "Near Letter Quality." The text is smooth, and it can accurately print high-density barcodes that shipping scanners can easily read.</li>
    <li><strong>Speed:</strong> Up to 680 characters per second (cps). It will blast through a 50-page manifest in seconds.</li>
    <li><strong>Paper Handling:</strong> Features a much stronger impact coil. It can easily punch through thick 6-part carbonless forms without fading on the bottom copy.</li>
    <li><strong>Durability:</strong> Built with a metal chassis and oversized motors to prevent overheating during massive 1,000-page print runs.</li>
    <li><strong>Verdict:</strong> Choose the 2600 if your printer is running constantly in a warehouse, if you need to print scannable barcodes, or if you use thick 6-part forms.</li>
</ul>`
  }
];

async function main() {
  const dascomBrand = await prisma.brand.findUnique({ where: { slug: 'dascom' } });
  if (!dascomBrand) throw new Error('Dascom brand not found. Run setup script first.');

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
          faqs: (article as any).faqs,
          status: 'published',
          publishedAt: new Date(),
          brandId: dascomBrand.id,
          categoryId: article.categoryId,
          authorId: article.authorId,
          reviewerId: article.reviewerId,
          reviewedAt: new Date(),
        }
      });
      console.log('✅ Published: "' + created.title + '"');
    } catch (e: any) {
      console.log('⚠️ Error for "' + article.title + '": ' + e.message);
    }
  }
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
