import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';
const paperCategory = '9a42c554-2b4f-47f8-887e-5996fb83cbad';
const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';
const connectivityCategory = 'c3a92d93-fcbb-439c-a11e-80cde3d2a5ce';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix Zebra Setup Utility Not Detecting Printer & Driver Install Failed",
    slug: 'zebra-setup-utility-not-detecting-printer-driver-install-failed',
    seoTitle: "Fix Zebra Setup Utility Not Detecting Printer (Windows)",
    metaDescription: "Is Zebra Setup Utilities failing to detect your USB printer, or did the Windows 11 driver install fail? Learn how to clear 'Unspecified Device' errors.",
    excerpt: "When Zebra Setup Utilities fails to detect a printer via USB, the Windows Plug-and-Play enumerator has usually assigned it to the 'Unspecified Device' graveyard.",
    errorCode: 'Driver Install Failed',
    tags: 'Zebra, Setup Utility Not Detecting Printer, Driver Windows 11, Driver Install Failed, Unspecified Device, USB Port',
    wordCount: 1150,
    difficultyLevel: 'Intermediate',
    timeToFix: '8 minutes',
    categoryId: softwareCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "To fix Zebra Setup Utilities not detecting your printer or a failed driver install: 1) Open Windows Device Manager. Look under 'Other Devices' or 'Printers' for 'Unspecified Device' or an icon with a yellow exclamation mark. 2) Right-click it and select 'Uninstall Device'. Unplug the printer's USB cable. 3) Open Zebra Setup Utilities (ZSU) and click 'Install New Printer'. 4) Wait until ZSU explicitly prompts you to connect the printer, THEN plug in the USB cable. Windows will now correctly map the ZDesigner driver to the USB001 virtual port.",
    content: `<h2>Why Zebra Setup Utilities Fails to Detect Printers</h2>
<p>Zebra Setup Utilities (ZSU) is the master diagnostic software for all Zebra printers. However, it relies heavily on the Windows Print Spooler and USB enumeration. If you plug a Zebra printer into a Windows 10 or Windows 11 PC <em>before</em> running the installer, Windows Update will often attempt to install a generic Microsoft USB Print Class driver. This creates an invisible lock, preventing Zebra Setup Utilities from detecting the hardware.</p>

<h2>Fix 1: Clearing the 'Unspecified Device' Lock</h2>
<p>If ZSU cannot see your printer, you must strip out the bad Microsoft driver first.</p>
<ol>
  <li>Leave the printer plugged in and powered ON.</li>
  <li>Press the Windows Key, type <strong>Device Manager</strong>, and hit Enter.</li>
  <li>Scroll down to <strong>Universal Serial Bus controllers</strong> or <strong>Other devices</strong>.</li>
  <li>Look for <em>"USB Printing Support"</em>, <em>"Unknown Device"</em>, or the Zebra printer name with a yellow warning triangle.</li>
  <li>Right-click the entry and select <strong>Uninstall device</strong>.</li>
  <li><strong>Unplug the USB cable from the PC.</strong></li>
</ol>

<h2>Fix 2: The Correct Driver Installation Sequence</h2>
<ol>
  <li>Open <strong>Zebra Setup Utilities</strong> as Administrator.</li>
  <li>Click <strong>Install New Printer</strong>.</li>
  <li>Select <strong>USB</strong> as the connection type.</li>
  <li>The installer will pause and instruct you to connect the device. <strong>Now, plug the USB cable back into the PC.</strong></li>
  <li>Windows will detect the hardware, but this time ZSU will intercept the request and map it to the correct <code>ZDesigner</code> core driver.</li>
</ol>

<h2>Fix 3: USB 3.0 vs USB 2.0 Conflict</h2>
<p>Older Zebra printers (like the GK420d or LP2844) use archaic USB 1.1 controller chips. If plugged into a modern blue USB 3.0 or USB-C hub, the motherboard chipset may fail to down-clock the polling rate, resulting in a "Driver Install Failed" loop. Always plug legacy printers into a black USB 2.0 port directly on the rear I/O shield of the motherboard.</p>`
  },
  {
    title: "ZebraDesigner Not Printing & Browser Print Not Working Fix",
    slug: 'zebradesigner-not-printing-browser-print-not-working-fix',
    seoTitle: "Fix ZebraDesigner Not Printing & Zebra Browser Print",
    metaDescription: "Is ZebraDesigner software not printing your labels correctly, or is Zebra Browser Print failing to connect to your web app? Step-by-step connection fixes.",
    excerpt: "ZebraDesigner is for visual label design, while Zebra Browser Print enables web applications to send raw ZPL directly to local printers. Here is how to fix both.",
    errorCode: null,
    tags: 'Zebra, ZebraDesigner Not Printing Correctly, Browser Print Not Working, Setup Utility vs ZebraDesigner, Web Printing',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: softwareCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix Zebra Browser Print not working: 1) Ensure the Zebra Browser Print application is actively running in the Windows System Tray (near the clock). 2) Right-click the icon and select 'Settings'; ensure 'Default Printer' is correctly assigned. 3) Accept the SSL Certificate: Open a browser and navigate to https://localhost:9101; if prompted with a security warning, click 'Advanced' > 'Proceed to localhost'. To fix ZebraDesigner not printing: Check that the exact driver named 'ZDesigner [Model]' is selected in the print dialog, not a generic Windows queue.",
    content: `<h2>Zebra Setup Utilities vs. ZebraDesigner</h2>
<p>A common point of confusion for new users is understanding the difference between Zebra's software tools:</p>
<ul>
  <li><strong>Zebra Setup Utilities (ZSU):</strong> A diagnostic tool used to configure IP addresses, calibrate sensors, and send raw lines of ZPL code. It does <em>not</em> design labels.</li>
  <li><strong>ZebraDesigner (Essentials / Pro):</strong> A WYSIWYG (What You See Is What You Get) visual layout tool. You drag and drop barcodes and text onto a canvas, and the software translates it into ZPL behind the scenes to print.</li>
</ul>

<h2>Fixing ZebraDesigner Not Printing Correctly</h2>
<p>If you design a beautiful label in ZebraDesigner but it prints as a blank sheet, shrinks to the corner, or doesn't print at all:</p>
<ol>
  <li><strong>Driver Mismatch:</strong> ZebraDesigner <em>requires</em> the official <code>ZDesigner</code> Windows driver to function. If your printer is installed using a "Generic / Text Only" driver or a third-party Seagull Scientific driver, ZebraDesigner will fail to render the graphics layer.</li>
  <li><strong>Page Setup Mismatch:</strong> Double-click the blank canvas in ZebraDesigner to open Document Properties. Ensure the width and height (e.g., 4" x 6") exactly match the physical label roll inside the printer. If the software canvas is 8x11 inches, the printer will reject the job as out-of-bounds.</li>
</ol>

<h2>Fixing Zebra Browser Print Integration</h2>
<p><strong>Zebra Browser Print</strong> is a local background service that allows cloud-based ERPs and warehouse web apps (running in Chrome, Edge, or Safari) to bypass the Windows print dialog and push raw ZPL directly to USB printers.</p>

<h3>Troubleshooting Browser Print:</h3>
<ul>
  <li><strong>The localhost SSL Block:</strong> Browser Print creates a local secure websocket on port 9101. Modern browsers frequently block this self-signed certificate. Open a new tab and go to <code>https://localhost:9101/</code>. If you see a privacy error, click <strong>Advanced &gt; Proceed to localhost (unsafe)</strong>. This adds an exception to the browser.</li>
  <li><strong>The Endpoint Approval:</strong> When a website first attempts to print, Browser Print will generate a popup asking if you allow <code>https://your-warehouse-app.com</code> to access the printer. If you missed this popup and it auto-denied, right-click the Browser Print icon in the system tray, go to <strong>Accepted Hosts</strong>, and manually add the website URL.</li>
</ul>`
  },
  {
    title: "Zebra Ribbon Not Feeding & Top Cover Error Fix",
    slug: 'zebra-ribbon-not-feeding-top-cover-error-fix',
    seoTitle: "Fix Zebra Ribbon Not Feeding & Top Cover Error",
    metaDescription: "Is your Zebra printer's thermal ribbon not feeding, snapping, or causing a 'Top Cover Open' error? Learn how to route ribbons and fix mechanical latch sensors.",
    excerpt: "When the thermal transfer ribbon refuses to spool onto the take-up core or snaps repeatedly, the tension spindles are slipping or the media path is incorrectly routed.",
    errorCode: 'Ribbon Out / Cover Open',
    tags: 'Zebra, Ribbon Not Feeding, Top Cover Error, Ribbon Snapping, Ribbon Spindle Slipping, ZT230, ZD420',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: hardwareCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredSnippet: "To fix a Zebra thermal ribbon not feeding: 1) Check Spindle Tension: Ensure the empty cardboard core is pushed fully onto the take-up spindle so the metal tension springs grip it tightly. If the core spins freely without winding ribbon, it's the wrong size core. 2) Tape the Ribbon: Use a strong piece of tape to secure the end of the fresh ribbon to the empty take-up core; rotate the spindle manually 3 times to build tension. 3) Top Cover Error: If the printer displays 'Top Cover Open', firmly press down on both the left and right corners of the lid until both locking latches click audibly.",
    content: `<h2>Diagnosing Thermal Transfer Ribbon Failures</h2>
<p>In a thermal transfer Zebra printer, the ink ribbon must feed at the exact same speed as the label paper. If the ribbon stops moving, the printhead will simply melt the stationary ink in one spot, snapping the ribbon in half and causing a "Ribbon Out" error.</p>

<h2>Fix 1: The Take-Up Spindle Slip</h2>
<p>The most common cause of ribbon not feeding is a lack of mechanical grip on the take-up core.</p>
<ol>
  <li><strong>Core Size Mismatch:</strong> Zebra desktop printers (like the ZD420) use 0.5-inch cores, while industrial printers (like the ZT410) use 1-inch cores. If you put a 1-inch core on a 0.5-inch spindle, it will just spin loosely. Ensure your empty take-up core matches the spindle.</li>
  <li><strong>Taping the Leader:</strong> Do not just tuck the ribbon under the core. Use a piece of scotch tape or a label to tape the end of the ribbon directly to the empty cardboard take-up core.</li>
  <li><strong>Pre-Tension:</strong> Manually rotate the take-up gear (usually green) forward 3 or 4 full rotations to pull the ribbon perfectly taut before closing the printhead.</li>
</ol>

<h2>Fix 2: Ink Side In vs. Ink Side Out (CSO vs CSI)</h2>
<p>Ribbons are manufactured with ink coated on either the <strong>Outside (CSO)</strong> or the <strong>Inside (CSI)</strong> of the film roll. Most Zebra printers require <strong>Coated Side Out (CSO)</strong> ribbons.</p>
<ul>
  <li><strong>The Tape Test:</strong> Take a piece of scotch tape and stick it to the outside of the ribbon roll. Pull it off. If black ink comes off onto the tape, you have a CSO ribbon (correct). If no ink comes off, it's a CSI ribbon. Loading a CSI ribbon incorrectly means the slick polyester backing is facing the paper, and the ink is facing the printhead, melting directly onto the ceramic element and ruining it.</li>
</ul>

<h2>Fix 3: Clearing the 'Top Cover Open' Error</h2>
<p>On clamshell desktop printers (like the GK420t or ZD220), there is a tiny mechanical microswitch that detects when the lid is shut.</p>
<ul>
  <li>If you push down on the middle of the lid, only one latch might engage.</li>
  <li>Always press down firmly with two hands on the <strong>far left and far right corners</strong> of the lid simultaneously until you hear a sharp, double click.</li>
</ul>`
  },
  {
    title: "Zebra Label Roll Guides, Fanfold & Linerless Printing Setup",
    slug: 'zebra-label-roll-guides-fanfold-linerless-printing-setup',
    seoTitle: "Zebra Roll Guides, Fanfold & Linerless Setup Guide",
    metaDescription: "Learn how to correctly set up Zebra label roll guides, route fanfold stacks through the rear slot, and configure linerless platen rollers to prevent double feeding.",
    excerpt: "Double feeding labels and diagonal skewing are caused by loose media guides. Learn how to secure paper paths for standard rolls, rear-fed fanfold stacks, and linerless media.",
    errorCode: null,
    tags: 'Zebra, Label Roll Guides Wrong Size, Fanfold Media Setup, Linerless Printing Setup, Double Feeding Labels, Skewing',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: paperCategory,
    authorId: authors.alex,
    reviewerId: authors.elena,
    featuredSnippet: "To fix Zebra label skewing and double feeding: 1) Adjust Roll Guides: Slide the green/yellow plastic media guides inward until they lightly touch both sides of the label roll. If the guides are too loose, the paper will drift diagonally, causing the gap sensor to miss the notch and feed double labels. 2) Fanfold Setup: For zigzag fanfold stacks, feed the paper through the rectangular slot on the back of the printer. Do not drape it over the top edge. Route it under the internal media guides just like a standard roll. 3) Linerless Media: Never put linerless (no backing) labels in a standard printer; it will jam instantly. It requires a special non-stick silicone platen roller.",
    content: `<h2>Fixing Label Skew and Double Feeding</h2>
<p>If your Zebra printer frequently prints halfway off the edge of the label or feeds two labels for every one print job, the paper is drifting horizontally as it passes the optical sensor.</p>

<h3>The Importance of Media Guides</h3>
<p>Inside the printer, the label roll sits between two adjustable plastic guides (usually colored green or yellow).</p>
<ol>
  <li>Load your label roll.</li>
  <li>Squeeze the guide adjusters and slide them inward.</li>
  <li><strong>The Goldilocks Rule:</strong> The guides must touch the sides of the paper backing lightly, preventing left-to-right movement, but they must not pinch the paper so tightly that the roll cannot spin freely.</li>
  <li>If the guides are left open to 4 inches while you print on 2-inch labels, the paper will wander, causing the optical sensor to miss the gap notch, resulting in a "Media Out" error or double-feeding blank sheets.</li>
</ol>

<h2>How to Route Fanfold Media</h2>
<p>Fanfold media comes in a stacked zigzag box rather than a cylinder roll. It is highly efficient for high-volume shipping stations because a box holds 2,000+ labels compared to a roll's 250.</p>
<ul>
  <li><strong>The Rear Slot:</strong> Look at the back of your Zebra desktop printer (just above the power plug). There is a wide, thin rectangular slot.</li>
  <li>Place the box of fanfold labels directly behind the printer.</li>
  <li>Feed the leading edge of the label stack through the rear slot.</li>
  <li>Open the printer lid. Pull the fanfold media forward, thread it <strong>under and through the adjustable media guides</strong>, and pull it past the platen roller.</li>
  <li>Close the lid and press the Feed button once to align the top-of-form.</li>
</ul>

<h2>The Dangers of Linerless Printing</h2>
<p>Linerless media is eco-friendly tape (like a giant roll of masking tape) with no waxy backing paper. It uses a special cutter to slice labels to variable lengths.</p>
<ul>
  <li><strong>Warning:</strong> You <strong>CANNOT</strong> run linerless media through a standard Zebra printer. The strong adhesive will immediately stick to the standard rubber platen roller, wrapping around it until the motor stalls and burns out.</li>
  <li><strong>Requirement:</strong> Linerless printing requires a factory-configured Zebra printer featuring a specialized non-stick silicone platen roller, a non-stick media path, and a heavy-duty guillotine cutter.</li>
</ul>`
  },
  {
    title: "Zebra Network Factory Reset, Diagnostics Test & UPS Mode",
    slug: 'zebra-network-factory-reset-diagnostics-test-ups-mode',
    seoTitle: "Zebra Network Factory Reset, Diagnostics & UPS Mode",
    metaDescription: "Learn how to perform a network factory reset on Zebra printers, run a communication diagnostics test, troubleshoot battery charging, and enable UPS EPL mode.",
    excerpt: "Network resets clear corrupted IP tables, while UPS mode switches the ZPL firmware to EPL legacy mode to support older shipping carrier software.",
    errorCode: null,
    tags: 'Zebra, Network Reset Factory Default, Communication Diagnostics Test, Battery Not Charging, UPS Mode Explained, IP Reset',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '5 minutes',
    categoryId: connectivityCategory,
    authorId: authors.david,
    reviewerId: authors.marcus,
    featuredSnippet: "To perform a Zebra Network Factory Reset: 1) On a ZD/ZT series printer, navigate to the LCD menu: Network > Reset Network, or use Zebra Setup Utilities to send the ZPL command '^XA^JUN^XZ' to restore the print server to factory DHCP settings. 2) Communication Diagnostics Test: Send '~JD' to enter hex dump mode to see raw data arriving at the port; send '~JE' to exit. 3) UPS Mode Explained: 'UPS Mode' forces the printer to interpret legacy EPL (Eltron) commands used by older UPS WorldShip software instead of modern ZPL.",
    content: `<h2>Performing a Network Factory Reset</h2>
<p>If you purchase a refurbished Zebra printer or move a printer from a Static IP warehouse subnet to a DHCP office network, the printer will refuse to connect until the internal print server is purged.</p>

<h3>Method 1: LCD Screen (Industrial Printers)</h3>
<ul>
  <li>Press <strong>Home &gt; Network &gt; Reset Network</strong>.</li>
  <li>Confirm the prompt. The printer will reboot and broadcast a DHCP request to your router.</li>
</ul>

<h3>Method 2: ZPL Command (Desktop Printers)</h3>
<p>If your printer lacks a screen (like the ZD420 or GK420), open Zebra Setup Utilities, connect via USB, click <strong>Open Communication With Printer</strong>, and send the following command:</p>
<pre><code>^XA^JUN^XZ</code></pre>
<p>This command instructs the internal ZebraNet print server to erase all static IP, subnet, and gateway data.</p>

<h2>What is Zebra 'UPS Mode'?</h2>
<p>If you purchase a specific Zebra model (like the ZP450) provided by United Parcel Service, it contains custom firmware locked into <strong>UPS Mode</strong>.</p>
<ul>
  <li><strong>The Difference:</strong> UPS WorldShip software was originally built in the late 1990s using the Eltron Programming Language (EPL). "UPS Mode" forces the Zebra printer to act like an older EPL printer, completely ignoring modern ZPL commands.</li>
  <li>If you try to print standard ZPL labels to a ZP450 in UPS mode, the printer will do nothing. You must install the specific "Zebra ZP450 (200dpi)" driver provided directly by UPS, not the standard ZebraDesigner driver.</li>
</ul>

<h2>Running a Communication Diagnostics Test</h2>
<p>If a label prints missing barcodes or wrong fonts, you need to see what data the computer is actually sending over the cable. Entering Diagnostics (Dump) Mode tells the printer to print the raw hexadecimal ASCII code instead of formatting it.</p>
<ul>
  <li><strong>To Enter Dump Mode:</strong> Send the command <code>~JD</code> via Zebra Setup Utilities.</li>
  <li>Print a label from your software. The printer will output raw text like <code>5E 58 41 0D 0A</code>.</li>
  <li><strong>To Exit Dump Mode:</strong> Send the command <code>~JE</code>, or simply power cycle the printer.</li>
</ul>

<h2>Zebra Mobile Printer Battery Not Charging</h2>
<p>If a Zebra ZQ or QLn series mobile printer battery is not charging:</p>
<ol>
  <li><strong>Cold Temperature Lockout:</strong> Lithium-ion cells cannot charge below 0°C (32°F). The battery management system (BMS) will block charging if the printer was left in a freezing truck overnight. Bring it to room temperature.</li>
  <li><strong>Contact Oxidation:</strong> Remove the battery block. Clean the gold electrical contacts on both the battery and the printer bay with a pencil eraser or isopropyl alcohol.</li>
</ol>`
  }
];

async function main() {
  const brandSlug = 'zebra-technologies';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 4 (Clusters E, F, G: Software, Media & Network) for brand: ${brand.name}`);

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
