import { prisma } from '../src/lib/prisma';

const EPSON_BRAND_ID = 'bb9c3e02-79fa-454d-a084-854b38f41af9';
const CAT_PRINTING = '0e7ca2ba-24ae-4bf9-9ca7-072b36154911';     // Printing Problems
const CAT_MAINT = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';        // Hardware & Maintenance
const CAT_ERRORS = '9fb9d26b-661e-4284-a4a7-d86d38e853df';       // Error Codes & Alerts
const CAT_SETUP = 'e6768bbb-1696-4f92-8499-7eb45f540edd';        // Setup & Installation

const AUTHOR_MARCUS = 'fba87e7e-2ed7-465e-bab3-875aaaecbf81'; // Marcus Vance
const AUTHOR_ELENA = '88de9646-6fd4-4e5d-817c-a8a1c0230866';  // Elena Rodriguez
const AUTHOR_DAVID = '1feb6d39-93c0-406c-818c-40dd1428aca6';  // David Chen
const AUTHOR_ALEX = '88e8d061-e1be-406d-8fa1-a53f108cc624';   // Alex Carter

const articles = [
  // 1. Epson L1250 Not Printing
  {
    title: "Epson L1250 Not Printing: Wi-Fi, Blank Pages & Nozzle Clog Fix",
    slug: "epson-l1250-not-printing-fix",
    metaDescription: "Fix Epson EcoTank L1250 single-function printers that won't print, feed blank pages, or show Wi-Fi errors. Clear air locks, prime ink, and reset spoolers.",
    brandId: EPSON_BRAND_ID,
    categoryId: CAT_PRINTING,
    authorId: AUTHOR_ALEX,
    featuredImage: "/images/printers/epson.webp",
    content: `<h2>Troubleshooting Epson L1250 Output Failures</h2>
<p>The Epson EcoTank L1250 is an ultra-compact single-function refillable ink tank printer equipped with Wi-Fi and Wi-Fi Direct. Because it lacks a display screen, diagnosing communication drops or blank output relies on LED indicator codes.</p>
<p>Common failures include dried ink in Micro Piezo nozzles, trapped air in the supply lines, or print jobs held in a paused Windows or macOS spooler queue.</p>

<h2>Step 1: Check Front LED Warning Lights</h2>
<p>The L1250 control panel communicates internal states through its power, Wi-Fi, paper, and ink LEDs:</p>
<ol>
  <li><strong>Power LED flashing rapidly:</strong> The printer is processing data or charging ink. Wait until the green light stays solid.</li>
  <li><strong>Orange paper LED on:</strong> Paper has run out or fed improperly. Reload the rear tray and tap the <strong>Paper</strong> button.</li>
  <li><strong>Orange ink LED on:</strong> Ink levels have dropped below the lower line. Refill the 003 ink tanks immediately.</li>
  <li><strong>Paper and ink LEDs flashing alternately:</strong> The internal waste ink pad is nearing saturation. Service the pad counter using Epson maintenance utilities.</li>
</ol>

<h2>Step 2: Clear Dried Nozzles and Air Locks</h2>
<p>When the carriage moves across the page but ejects completely blank paper, the printhead nozzles are starved of ink:</p>
<ol>
  <li><strong>Print a nozzle check pattern:</strong> Turn off the printer. Press and hold the <strong>Stop</strong> button, then press <strong>Power</strong> until the power light flashes to print a nozzle test sheet.</li>
  <li><strong>Execute standard head cleaning:</strong> With the printer powered on, press and hold the <strong>Stop</strong> button for 3 seconds until the power light flashes to initiate a cleaning cycle.</li>
  <li><strong>Allow ink to rest:</strong> Wait 15 minutes after cleaning to let micro-bubbles dissipate before retesting.</li>
  <li><strong>Perform Power Cleaning (if needed):</strong> If standard cleanings fail, run a Power Ink Flushing cycle through the Epson Printer Utility on your PC.</li>
</ol>

<h2>Step 3: Clear Stalled Print Queues and Spoolers</h2>
<p>Corrupted print spooler files hold the L1250 in a perpetual busy state:</p>
<ol>
  <li><strong>Open Windows Services:</strong> Press <strong>Win + R</strong>, type <code>services.msc</code>, and hit Enter.</li>
  <li><strong>Stop Print Spooler:</strong> Scroll to <strong>Print Spooler</strong>, right-click, and select <strong>Stop</strong>.</li>
  <li><strong>Purge spooler files:</strong> Open File Explorer, navigate to <code>C:\\Windows\\System32\\spool\\PRINTERS</code>, and delete all files inside.</li>
  <li><strong>Restart Print Spooler:</strong> Return to Services, right-click <strong>Print Spooler</strong>, and click <strong>Start</strong>.</li>
</ol>

<h2>Step 4: Restore Wi-Fi and Wi-Fi Direct Connection</h2>
<p>IP conflicts or router band handshakes prevent computers from reaching the printer:</p>
<ol>
  <li><strong>Verify Wi-Fi LED status:</strong> The top Wi-Fi light should glow solid green. If amber or unlit, connection to your router is lost.</li>
  <li><strong>Print network status sheet:</strong> Press and hold the <strong>Network Status (i)</strong> button for 7 seconds to print the IP address and signal strength.</li>
  <li><strong>Reconfigure via Epson Smart Panel:</strong> Open the Epson Smart Panel app on your smartphone, tap <strong>Find Printer</strong>, and reconnect to your 2.4 GHz network.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why is my Epson L1250 printing blank pages after refilling ink?</summary>
  <p>Air pockets entered the printhead tubes during refilling; perform one power cleaning cycle to draw liquid ink into the nozzles.</p>
</details>
<details>
  <summary>How do I reset the Wi-Fi settings on the Epson L1250?</summary>
  <p>Turn off the printer, then hold down the Wi-Fi button while powering on until the Wi-Fi and Wi-Fi Direct lights flash alternately.</p>
</details>
<details>
  <summary>Does the Epson L1250 support 5 GHz Wi-Fi networks?</summary>
  <p>No, the L1250 only operates on 2.4 GHz wireless frequency bands.</p>
</details>`,
  },

  // 2. Epson L3260 vs L3250 Difference
  {
    title: "Epson L3260 vs L3250: Key Differences & Comparison Guide",
    slug: "epson-l3260-vs-l3250-difference",
    metaDescription: "Detailed comparison between Epson EcoTank L3260 and L3250 all-in-one printers. Compare LCD screens, copy controls, Wi-Fi setup, and print speeds.",
    brandId: EPSON_BRAND_ID,
    categoryId: CAT_MAINT,
    authorId: AUTHOR_ELENA,
    featuredImage: "/images/printers/epson.webp",
    content: `<h2>EcoTank Showdown: Epson L3260 vs L3250</h2>
<p>The Epson EcoTank L3250 and L3260 are high-efficiency all-in-one tank printers designed for home offices, students, and small businesses. Both models feature integrated front-facing ink reservoirs and identical Micro Piezo printing engines.</p>
<p>However, their user interfaces, standalone copying capabilities, and on-device configuration menus differ significantly.</p>

<h2>Feature Comparison Table</h2>
<p>Compare technical specifications, interface hardware, and operational metrics between both models:</p>

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Epson EcoTank L3260</th>
      <th>Epson EcoTank L3250</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Display Screen</strong></td>
      <td>1.44-inch color LCD screen</td>
      <td>None (LED indicator icons only)</td>
    </tr>
    <tr>
      <td><strong>Control Panel</strong></td>
      <td>Directional keypad + OK + Menu buttons</td>
      <td>Basic push buttons (Power, Wi-Fi, B&amp;W/Color Copy)</td>
    </tr>
    <tr>
      <td><strong>Standalone Copy Quantity</strong></td>
      <td>Up to 99 copies (set via screen)</td>
      <td>Up to 20 copies (press button repeatedly)</td>
    </tr>
    <tr>
      <td><strong>Copy Zoom / Scaling</strong></td>
      <td>25% to 400% auto-fit on device</td>
      <td>Fixed 100% scale only</td>
    </tr>
    <tr>
      <td><strong>Network Setup Method</strong></td>
      <td>Direct Wi-Fi setup wizard on screen</td>
      <td>WPS button or Epson Smart Panel app</td>
    </tr>
    <tr>
      <td><strong>Print Resolution</strong></td>
      <td>5760 x 1440 optimized dpi</td>
      <td>5760 x 1440 optimized dpi</td>
    </tr>
    <tr>
      <td><strong>Ink Bottle Family</strong></td>
      <td>Epson 003 (Black, Cyan, Magenta, Yellow)</td>
      <td>Epson 003 (Black, Cyan, Magenta, Yellow)</td>
    </tr>
    <tr>
      <td><strong>ISO Print Speed</strong></td>
      <td>10 ipm black / 5 ipm color</td>
      <td>10 ipm black / 5 ipm color</td>
    </tr>
  </tbody>
</table>

<h2>The Display Screen Advantage: L3260</h2>
<p>The presence of a color LCD screen defines the operational gap between these two models:</p>
<ol>
  <li><strong>Epson L3260 Screen Navigation:</strong> The 1.44-inch color display provides clear menus for nozzle checks, head alignment, Wi-Fi password entry, and maintenance box monitoring without opening a computer.</li>
  <li><strong>Epson L3250 Blind Indicators:</strong> The L3250 relies on blinking LED combinations. Interpreting paper jams, low ink warnings, or Wi-Fi drops requires deciphering light patterns or checking the smartphone app.</li>
</ol>

<h2>Standalone Copying and Duplication Features</h2>
<p>If you regularly make photocopies without turning on a PC, the interface makes a substantial difference:</p>
<ol>
  <li><strong>Advanced Copy Control (L3260):</strong> Set exact copy counts up to 99, adjust density, reduce or enlarge documents from 25% to 400%, and select ID card copy mode directly from the screen.</li>
  <li><strong>Basic Push-Button Copy (L3250):</strong> Copying is limited to pressing the Black or Color copy button up to 20 times in rapid succession, with zero on-device zoom control.</li>
</ol>

<h2>Ink Yield, Operating Cost, and Print Performance</h2>
<p>Beneath the control panel, both models share the exact same print and scan hardware:</p>
<ol>
  <li><strong>Identical Print Quality:</strong> Both models produce crisp text and borderless photo prints up to 4R using genuine Epson 003 dye-based ink bottles.</li>
  <li><strong>Identical Page Yields:</strong> Up to 4,500 black-and-white pages and 7,500 color pages per bottle set, delivering ultra-low per-page costs.</li>
</ol>

<h2>Which Model Should You Buy?</h2>
<p>Choose the model that fits your preferred workflow and budget:</p>
<ol>
  <li><strong>Choose Epson L3260 if:</strong> You want standalone ease of use, frequently photocopy multipage sets, or prefer entering Wi-Fi passwords directly on the printer screen.</li>
  <li><strong>Choose Epson L3250 if:</strong> You want the most affordable purchase price, primarily trigger prints from your phone/laptop, and don't mind using the Epson Smart Panel app for maintenance.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Do both the Epson L3260 and L3250 support automatic double-sided printing?</summary>
  <p>No, neither model has an auto-duplexer; double-sided printing requires manually flipping the pages.</p>
</details>
  <details>
  <summary>Can I use the Epson Smart Panel mobile app with both models?</summary>
  <p>Yes, both the L3260 and L3250 connect seamlessly to iOS and Android devices via the Epson Smart Panel app.</p>
</details>
<details>
  <summary>Do the L3260 and L3250 use the same ink bottles?</summary>
  <p>Yes, both models use standard Epson 003 series ink bottles.</p>
</details>`,
  },

  // 3. Epson L4260 Error Code
  {
    title: "Epson L4260 Error Codes: Causes, Meaning & Step-by-Step Fixes",
    slug: "epson-l4260-error-code-fix",
    metaDescription: "Diagnose and fix Epson EcoTank L4260 error codes (031008, 000041, 000021, 000031). Clear paper jams, scanner errors, and maintenance box warnings.",
    brandId: EPSON_BRAND_ID,
    categoryId: CAT_ERRORS,
    authorId: AUTHOR_MARCUS,
    featuredImage: "/images/printers/epson.webp",
    content: `<h2>Decoding Epson L4260 Error Codes</h2>
<p>The Epson EcoTank L4260 features automatic two-sided printing, Wi-Fi Direct, and an integrated 1.44-inch color LCD. When internal sensors detect a mechanical obstruction or electronic fault, a 6-digit alphanumeric error code appears.</p>
<p>Most L4260 error codes relate to carriage movement restrictions, scanner optical stalls, duplex paper feed jams, or maintenance box exhaustion.</p>

<h2>Error Code 031008: Printhead Carriage Jam</h2>
<p>Code <code>031008</code> indicates the printhead carriage cannot traverse the guide shaft smoothly:</p>
<ol>
  <li><strong>Power down the printer:</strong> Turn off the printer and disconnect the power cord immediately.</li>
  <li><strong>Open the scanner unit:</strong> Lift the scanner top assembly and secure the support prop.</li>
  <li><strong>Inspect the carriage path:</strong> Look for torn paper fragments, paper clips, or dislodged packing tape along the carriage rails.</li>
  <li><strong>Check the CR encoder strip:</strong> Inspect the clear plastic timing strip running behind the carriage. If smudged with grease, wipe it gently with a dry microfiber cloth.</li>
  <li><strong>Manually move carriage:</strong> Gently slide the printhead carriage toward the center to ensure free travel, then close the unit and power on.</li>
</ol>

<h2>Error Code 000041: Scanner CIS Sensor Error</h2>
<p>Code <code>000041</code> triggers when the scanner optical carriage fails to initialize or reach its home position:</p>
<ol>
  <li><strong>Open the document lid:</strong> Ensure no heavy objects are pressing down on the flatbed glass.</li>
  <li><strong>Check flatbed glass calibration area:</strong> Inspect the left border of the glass for white-point calibration obstructions.</li>
  <li><strong>Inspect scanner ribbon cable:</strong> If the unit was recently serviced, ensure the white flat flexible cable connecting the scanner to the mainboard is firmly seated.</li>
  <li><strong>Perform a hard restart:</strong> Unplug the printer for 60 seconds to reset the optical stepping motor controller.</li>
</ol>

<h2>Error Code 000021 &amp; 000024: Paper Feed Roller Errors</h2>
<p>These codes signify feed roller timing slip or paper jam inside the auto-duplex unit:</p>
<ol>
  <li><strong>Remove the rear duplex cover:</strong> Squeeze the tabs on the rear duplex module and pull it straight out.</li>
  <li><strong>Clear jammed paper inside:</strong> Gently remove any crumpled sheets trapped between the dual reversing rollers.</li>
  <li><strong>Clean the feed rollers:</strong> Wipe the rubber pickup rollers inside the rear paper slot with a slightly damp lint-free cloth.</li>
  <li><strong>Reinstall duplex unit firmly:</strong> Push the rear module back in until both side retention latches click.</li>
</ol>

<h2>Error Code 034004 &amp; Maintenance Box End of Life</h2>
<p>The L4260 features a user-replaceable maintenance box (C13T04D100) that collects waste ink:</p>
<ol>
  <li><strong>Inspect the LCD alert:</strong> When the screen displays "Maintenance box is at the end of its service life", printing is halted.</li>
  <li><strong>Unscrew rear maintenance door:</strong> Remove the single screw holding the lower rear maintenance hatch.</li>
  <li><strong>Slide out saturated box:</strong> Pull out the full maintenance cartridge and discard it safely.</li>
  <li><strong>Install fresh maintenance box:</strong> Insert a new Epson T04D1 maintenance box and tighten the screw. The printer automatically detects the new chip.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I clean and reuse the Epson L4260 maintenance box?</summary>
  <p>No, the maintenance box has a cryptographic one-time microchip; you must replace it with a new T04D1 cartridge.</p>
</details>
<details>
  <summary>What does error code 000031 mean on the L4260?</summary>
  <p>Code 000031 indicates a purge unit or ink pump mechanical failure, typically caused by hardened dried ink in the maintenance capping station.</p>
</details>
<details>
  <summary>How do I clear persistent error codes after removing jammed paper?</summary>
  <p>Disconnect the AC power cord for 2 minutes, press and hold the Power button for 10 seconds to drain residual charge, then plug back in.</p>
</details>`,
  },

  // 4. Epson L6270 Setup Guide
  {
    title: "Epson L6270 Setup Guide: Unboxing, Ink Charging, Wi-Fi & ADF",
    slug: "epson-l6270-setup-guide",
    metaDescription: "Step-by-step setup guide for the Epson EcoTank L6270 all-in-one printer. Learn how to fill 001 ink tanks, run initial charging, connect Wi-Fi, and scan via ADF.",
    brandId: EPSON_BRAND_ID,
    categoryId: CAT_SETUP,
    authorId: AUTHOR_DAVID,
    featuredImage: "/images/printers/epson.webp",
    content: `<h2>Getting Started with the Epson EcoTank L6270</h2>
<p>The Epson EcoTank L6270 is a high-volume duplex all-in-one printer powered by PrecisionCore Heat-Free technology. It features a 30-sheet Automatic Document Feeder (ADF), high-capacity 001 pigment black and dye color ink tanks, and Ethernet networking.</p>
<p>Following proper initial setup ensures air-free ink line priming, correct printhead calibration, and seamless network connectivity across all office computers.</p>

<h2>Step 1: Unboxing and Removing Shipping Restraints</h2>
<p>Shipping tape and internal spacers must be completely removed before applying AC power:</p>
<ol>
  <li><strong>Remove exterior blue tape:</strong> Peel away all blue packing tape from the exterior housing, paper cassettes, and ADF lid.</li>
  <li><strong>Open the scanner unit:</strong> Lift the scanner bed assembly and remove the protective cardboard block and internal carriage tape.</li>
  <li><strong>Check the rear duplexer:</strong> Ensure the rear duplex cover is locked securely into position.</li>
  <li><strong>Connect power cord:</strong> Plug the power cord directly into the printer and a wall outlet. Turn on the printer and select your language and country on the LCD screen.</li>
</ol>

<h2>Step 2: Fill the Ink Tanks with 001 Ink Bottles</h2>
<p>The L6270 uses keyed, spill-free 001 ink bottles that automatically stop filling when each reservoir reaches capacity:</p>
<ol>
  <li><strong>Open the ink tank cover:</strong> Unlatch the ink compartment cover on the front right of the chassis.</li>
  <li><strong>Open the blue tank cap:</strong> Lift the cap for the specific color you are filling (Black, Cyan, Magenta, or Yellow).</li>
  <li><strong>Insert the bottle vertically:</strong> Position the bottle straight onto the keyed filling port without squeezing. Ink flows automatically into the tank.</li>
  <li><strong>Wait for auto-stop:</strong> When ink reaches the top fill line, remove the bottle and snap the blue cap closed.</li>
  <li><strong>Repeat for all colors:</strong> Fill the remaining color tanks until all four reservoirs are completely filled.</li>
</ol>

<h2>Step 3: Perform Initial Ink Charging (10 Minutes)</h2>
<p>Initial ink charging draws liquid ink through internal damper tubes into the PrecisionCore printhead:</p>
<ol>
  <li><strong>Initiate ink charge on screen:</strong> When prompted on the LCD display, press and hold the <strong>OK</strong> button for 3 seconds.</li>
  <li><strong>Confirm ink tanks are filled:</strong> Select <strong>Yes</strong> to confirm all tanks contain ink.</li>
  <li><strong>Wait for priming cycle:</strong> The printer initiates a mechanical pumping cycle lasting approximately 10 minutes. Do not turn off power or open covers.</li>
  <li><strong>Print alignment pattern:</strong> Once charging completes, follow the on-screen prompts to print and evaluate printhead alignment sheets.</li>
</ol>

<h2>Step 4: Connect to Wi-Fi, Ethernet, or USB</h2>
<p>Connect the L6270 to your local office subnet for multi-device printing:</p>
<ol>
  <li><strong>Connect via Wi-Fi Wizard:</strong> On the control panel, go to <strong>Settings</strong> &gt; <strong>Network Settings</strong> &gt; <strong>Wi-Fi Setup</strong> &gt; <strong>Wi-Fi Setup Wizard</strong>.</li>
  <li><strong>Select your SSID:</strong> Choose your 2.4 GHz wireless network and enter your WPA/WPA2 password using the screen keypad.</li>
  <li><strong>Connect via Gigabit Ethernet:</strong> Alternatively, plug a Cat6 Ethernet cable into the rear RJ-45 port for instant wired network discovery.</li>
  <li><strong>Install Epson Smart Panel:</strong> Download the Epson Smart Panel app on your mobile device for direct phone scanning and remote diagnostics.</li>
</ol>

<h2>Step 5: Load Paper and Configure the ADF Scanner</h2>
<p>Prepare the front paper cassette and top feeder for daily office workflow:</p>
<ol>
  <li><strong>Load front paper cassette:</strong> Pull out the lower 250-sheet cassette, adjust the side paper guides to Letter or A4, and insert plain paper print-side down.</li>
  <li><strong>Load the ADF feeder:</strong> Place up to 30 sheets of multi-page documents face-up into the top automatic document feeder.</li>
  <li><strong>Install Epson ScanSmart:</strong> Install Epson ScanSmart on Windows or Mac to enable single-click scan-to-PDF, OCR text search, and scan-to-cloud workflows.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the ink level drop slightly right after initial setup?</summary>
  <p>The initial charging cycle pumps ink into internal tubing, dampers, and the printhead, consuming a small portion of the first tank fill.</p>
</details>
<details>
  <summary>Does the Epson L6270 support automatic two-sided ADF scanning?</summary>
  <p>No, the ADF is single-pass simplex; automatic two-sided scanning requires manually reinserting the stack, though printing supports full auto-duplex.</p>
</details>
<details>
  <summary>What ink bottles does the Epson L6270 use?</summary>
  <p>The L6270 uses Epson 001 pigment black ink and 001 dye-based color ink bottles.</p>
</details>`,
  },
];

async function publishEpsonLSeriesHub() {
  console.log(`Publishing ${articles.length} Epson L-Series Hub articles...`);

  for (const item of articles) {
    const wordCount = item.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    const excerpt = item.metaDescription;

    const published = await prisma.article.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        metaDescription: item.metaDescription,
        excerpt,
        content: item.content,
        wordCount,
        brandId: item.brandId,
        categoryId: item.categoryId,
        authorId: item.authorId,
        featuredImage: item.featuredImage,
        status: 'published',
        publishedAt: new Date(),
      },
      create: {
        title: item.title,
        slug: item.slug,
        metaDescription: item.metaDescription,
        excerpt,
        content: item.content,
        wordCount,
        brandId: item.brandId,
        categoryId: item.categoryId,
        authorId: item.authorId,
        featuredImage: item.featuredImage,
        status: 'published',
        publishedAt: new Date(),
      },
    });

    console.log(`✓ Published: [${published.slug}] "${published.title}" (${wordCount} words)`);
  }

  console.log('All Epson L-Series Hub articles published successfully!');
}

publishEpsonLSeriesHub()
  .catch((err) => {
    console.error('Error publishing articles:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
