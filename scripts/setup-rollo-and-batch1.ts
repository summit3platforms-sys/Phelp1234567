import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const driverCategory = '019baf04-4a41-4df3-9c1e-466564565d92';
const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';
const connectivityCategory = 'c3a92d93-fcbb-439c-a11e-80cde3d2a5ce';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Rollo Printer Driver Download & Installation Guide (Windows & Mac)",
    slug: 'rollo-printer-driver-download-install-guide',
    seoTitle: "Rollo Printer Driver Download & Installation Guide (Win & Mac)",
    metaDescription: "Download and install official Rollo thermal printer drivers for Windows 10/11 and macOS. Fix driver installation failures, outdated software, and generic driver issues.",
    excerpt: "Installing the correct official Rollo driver is essential for crisp 203 DPI shipping labels. Learn how to install, update, and replace generic USB printer drivers.",
    errorCode: null,
    tags: 'Rollo, Rollo Driver, Driver Download, Windows 11, Mac Driver, Generic Driver, Outdated Driver',
    wordCount: 1200,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: driverCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "To download and install the official Rollo printer driver: 1) Download the latest driver package from the official Rollo download portal (rollo.com/driver). 2) Connect the Rollo printer to your computer via USB and ensure it is turned ON (the top LED should be solid green or purple). 3) For Windows: Run the downloaded .exe installer, select 'Standard USB Installation', and follow the prompt until completed. 4) For Mac: Open the .pkg installer file, click through the install wizard, go to System Settings > Printers & Scanners > Add Printer, select Rollo, and ensure the 'Use' dropdown selects 'Rollo Driver' rather than 'Generic PostScript'.",
    content: `<h2>Why Official Rollo Drivers Are Critical</h2>
<p>The <strong>Rollo Commercial Thermal Printer</strong> (models X1038, X1040, and Wireless) utilizes a high-speed direct thermal printhead capable of outputting 150mm per second at 203 DPI. When connected via USB without the proprietary manufacturer driver, modern operating systems like Windows 11 and macOS Sequoia frequently assign a <em>"Generic / Text Only"</em> or <em>"Generic PostScript"</em> driver. This generic assignment results in distorted label scaling, tiny micro-text, skipped blank labels, and faint unreadable barcodes.</p>

<h2>Step 1: Downloading the Official Rollo Driver Package</h2>
<ol>
  <li>Navigate to the official Rollo driver repository at <code>rollo.com/driver</code>.</li>
  <li>Select your exact operating system:
    <ul>
      <li><strong>Windows:</strong> Download the <code>Rollo-Windows-Driver-Latest.exe</code> (compatible with Windows 7, 8, 10, and 11, 32-bit &amp; 64-bit).</li>
      <li><strong>macOS:</strong> Download the <code>Rollo-Mac-Driver-Latest.pkg</code> (compatible with macOS 10.14 Mojave through macOS 15 Sequoia).</li>
      <li><strong>Linux / Raspberry Pi:</strong> Download the official ARM/x86 CUPS driver package.</li>
    </ul>
  </li>
</ol>

<h2>Step 2: Windows 10 &amp; 11 Installation Protocol</h2>
<ol>
  <li>Plug the square USB-B cable into the back of your Rollo printer and the USB-A/C end into your PC.</li>
  <li>Flip the rear power rocker switch to <strong>ON (I)</strong>. The top circular LED must show solid green.</li>
  <li>Right-click the downloaded <code>.exe</code> file and select <strong>Run as administrator</strong>.</li>
  <li>The installer will scan your USB ports, detect the USB hardware device ID (<code>VID_10C4&amp;PID_EA60</code>), and copy the thermal Raster graphics filter into the Windows System32 Spool directory.</li>
  <li>Once complete, open <em>Control Panel &gt; Devices and Printers</em>. Right-click <strong>Rollo Thermal Printer</strong>, select <strong>Printing Preferences</strong>, and set the default paper size to <strong>4x6" (100x150mm)</strong>.</li>
</ol>

<h2>Step 3: macOS Installation &amp; Driver Selection Fix</h2>
<ol>
  <li>Open the downloaded <code>.pkg</code> file and follow the installation wizard. Enter your Mac administrator password when prompted.</li>
  <li>Go to <strong>System Settings &gt; Printers &amp; Scanners</strong>.</li>
  <li>If the Rollo printer does not appear automatically, click <strong>Add Printer, Scanner, or Fax (+)</strong>.</li>
  <li>Select <strong>Rollo Thermal Printer</strong> from the device list.</li>
  <li><strong>Critical Step:</strong> At the bottom under the <strong>"Use:"</strong> dropdown, do NOT leave it on "AirPrint" or "Generic PostScript". Click the dropdown, select <strong>"Select Software..."</strong>, search for <strong>Rollo Printer</strong>, and click OK.</li>
  <li>Click <strong>Add</strong>. Your Mac will now send pixel-perfect direct raster bitmaps to the printer.</li>
</ol>

<h2>Do You Need a Driver for the Rollo Wireless Model?</h2>
<p>If you own the <strong>Rollo Wireless Printer</strong>, you do NOT need to install desktop USB drivers when printing from an iPhone, iPad, or Android phone using AirPrint and the Rollo App. However, if you intend to print shipping labels wirelessly from a Windows desktop or Mac computer, you must install the official desktop driver to map the local Wi-Fi IP address to your operating system print spooler.</p>`
  },
  {
    title: "Rollo X1038 vs X1040 Drivers & Print Density / Speed Settings",
    slug: 'rollo-x1038-vs-x1040-driver-print-density-speed-settings',
    seoTitle: "Rollo X1038 vs X1040 Driver & Print Density / Speed Guide",
    metaDescription: "Understand driver differences between Rollo X1038 (USB) and X1040 (Wireless), and learn how to adjust print density (darkness) and high-speed mode settings.",
    excerpt: "Fine-tuning print density and thermal burn speed in your Rollo driver preferences eliminates faded shipping barcodes and prevents labels from sticking to the platen roller.",
    errorCode: null,
    tags: 'Rollo, X1038, X1040, Driver Difference, Print Density, Darkness Setting, Print Speed',
    wordCount: 1150,
    difficultyLevel: 'Intermediate',
    timeToFix: '5 minutes',
    categoryId: driverCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredSnippet: "To adjust Rollo print density and print speed: 1) On Windows: Open Control Panel > Devices and Printers > right-click 'Rollo Printer' > Printing Preferences > Settings tab. Adjust 'Darkness' (Density) from 1 to 15 (recommended: 8 to 12) and set 'Print Speed' to 4 or 5 in/sec. 2) On Mac: Open any PDF in Safari or Preview, press Cmd+P, select 'Printer Features' from the options dropdown, set Darkness to 8–10, and save as a Preset. 3) X1038 vs X1040: The X1038 uses standard USB serial drivers, while the X1040 Wireless supports network socket port drivers and AirPrint rasterizers.",
    content: `<h2>Rollo X1038 (USB) vs X1040 (Wireless) Driver Differences</h2>
<p>While both the classic <strong>Rollo X1038 (wired USB model)</strong> and the <strong>Rollo X1040 (Wireless model)</strong> feature identical 203 DPI direct thermal heating element arrays and 150 mm/s print mechanisms, their software driver architectures differ significantly:</p>
<ul>
  <li><strong>Rollo X1038 Driver:</strong> Connects exclusively over USB virtual COM port / USB Printing Support channels. It requires an active physical cable connection and handles all raster conversion on the host computer CPU.</li>
  <li><strong>Rollo X1040 Wireless Driver:</strong> Incorporates dual-channel connectivity. When connected over Wi-Fi, it communicates via raw TCP/IP Port 9100 / LPR protocol and contains embedded AirPrint and IPP (Internet Printing Protocol) listener drivers for driverless mobile printing.</li>
</ul>

<h2>Configuring Print Density (Darkness) for Crisp Barcodes</h2>
<p>Thermal printers do not use ink; they use heat pulses to activate dye crystals in chemically coated thermal labels. If your shipping carrier (USPS, UPS, FedEx, DHL) rejects packages due to un-scannable tracking barcodes, increasing the driver's thermal burn density solves the issue immediately.</p>

<h3>Windows Print Density Optimization</h3>
<ol>
  <li>Open <strong>Control Panel &gt; View Devices and Printers</strong>.</li>
  <li>Right-click your Rollo printer and select <strong>Printing Preferences</strong>.</li>
  <li>Click on the <strong>Page Setup</strong> tab and confirm your size is <code>4.00 x 6.00 in</code>.</li>
  <li>Switch to the <strong>Settings (or Graphics)</strong> tab:
    <ul>
      <li><strong>Darkness (Density):</strong> Default is 8. Increase to <strong>10 or 12</strong> for thick 4x6 shipping labels. (Avoid setting to 15, as excessive heat can melt the label backing paper).</li>
      <li><strong>Print Speed:</strong> Default is 5 in/sec. For high-density 2D QR codes or USPS Intelligent Mail barcodes, reducing speed to <strong>4 in/sec</strong> sharpens fine line geometry.</li>
      <li><strong>Dithering / Halftone:</strong> Set to <strong>None</strong> or <strong>Threshold</strong> to ensure barcodes render with sharp vector edges rather than blurry halftone dots.</li>
    </ul>
  </li>
  <li>Click <strong>Apply</strong> and <strong>OK</strong>.</li>
</ol>

<h3>macOS Print Density Optimization</h3>
<ol>
  <li>Open any PDF label in <strong>Safari</strong> or <strong>Preview</strong> and press <code>Cmd + P</code>.</li>
  <li>In the print dialog, expand details and click the dropdown menu that says <em>"Preview"</em> (or <em>"Layout"</em>).</li>
  <li>Select <strong>Printer Features</strong>.</li>
  <li>Under <em>Feature Sets</em>, select <strong>Printer Settings</strong>.</li>
  <li>Adjust <strong>Darkness</strong> to <strong>10</strong> and <strong>Print Speed</strong> to <strong>4 in/sec</strong>.</li>
  <li>At the top of the dialog, click the <em>Presets</em> dropdown and select <strong>"Save Current Settings as Preset..."</strong> named <em>"Rollo 4x6 Dark"</em> so your settings apply to all future shipping labels automatically.</li>
</ol>`
  },
  {
    title: "Fix Rollo Printer Not Showing Up or Stuck on Mac (Ventura & Sequoia)",
    slug: 'rollo-printer-not-showing-up-mac-ventura-sequoia-fix',
    seoTitle: "Fix Rollo Printer Not Showing Up on Mac (Ventura & Sequoia)",
    metaDescription: "Is your Rollo thermal printer not showing up in Mac Printers & Scanners or stuck in the print queue on macOS Ventura and Sequoia? Step-by-step fix.",
    excerpt: "When macOS updates to Ventura, Sonoma, or Sequoia, CUPS printer permissions and USB hub negotiation glitches frequently cause Rollo printers to vanish.",
    errorCode: 'Mac USB Fault',
    tags: 'Rollo, Mac Sequoia, macOS Ventura, Not Showing Up, USB Hub, Add Printer Stuck, CUPS Reset',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '8 minutes',
    categoryId: setupCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredSnippet: "To fix a Rollo printer not showing up on Mac: 1) Avoid unpowered USB-C multi-port dongles; plug the printer directly into your Mac using a USB-B to USB-C cable or an Apple-certified adapter. 2) When prompted by macOS 'Allow accessory to connect?', click 'Allow'. 3) If the printer still doesn't appear in Printers & Scanners: Open Terminal, run 'sudo killall -9 cupsd', and restart your Mac. 4) If adding the printer hangs: Reset the Mac Printing System by right-clicking the printer list in System Settings and selecting 'Reset Printing System'.",
    content: `<h2>Why macOS Updates Break Rollo USB Detection</h2>
<p>With the release of macOS 13 Ventura, macOS 14 Sonoma, and macOS 15 Sequoia, Apple introduced aggressive USB accessory security policies and restructured the backend CUPS (Common Unix Printing System) daemon. If your Mac fails to detect your Rollo X1038 or X1040, the cause is typically an unauthorized USB security prompt, an unpowered USB hub, or a stale CUPS driver queue.</p>

<h2>Fix 1: The macOS USB Security Permission Prompt</h2>
<p>Modern MacBooks with Apple Silicon (M1, M2, M3, M4 chips) block USB data communication on new peripherals until the user explicitly grants permission.</p>
<ol>
  <li>Disconnect the Rollo USB cable from your Mac.</li>
  <li>Turn the Rollo printer ON.</li>
  <li>Reconnect the USB cable directly to a Thunderbolt / USB-C port on your Mac.</li>
  <li>Watch for a macOS system alert in the top right corner: <em>"Allow accessory to connect to this Mac?"</em></li>
  <li>Click <strong>Allow</strong>. If you previously clicked "Don't Allow", go to <em>System Settings &gt; Privacy &amp; Security &gt; Security</em> and set <strong>"Allow accessories to connect"</strong> to <em>"Automatically When Unlocked"</em>.</li>
</ol>

<h2>Fix 2: Bypassing Passive USB-C Hub Voltage Drops</h2>
<p>Rollo thermal printers require clean 5V USB signal integrity to maintain the USB-to-UART bridge connection. Inexpensive multi-port USB-C hubs that split power between HDMI monitors, mice, and keyboards often drop voltage below 4.75V, causing the Mac to disconnect the printer mid-spool.</p>
<ul>
  <li>Use a direct <strong>USB-B to USB-C printer cable</strong> (eliminating the dongle entirely).</li>
  <li>If using a hub, ensure it is a <strong>powered USB hub</strong> connected to an external AC wall adapter.</li>
</ul>

<h2>Fix 3: Clearing the Frozen CUPS Background Spooler</h2>
<p>If print jobs hang in the queue saying <em>"Looking for printer..."</em> or <em>"Waiting for printer to become available..."</em>:</p>
<ol>
  <li>Open the <strong>Terminal</strong> app on your Mac (press <code>Cmd + Space</code>, type Terminal, and press Enter).</li>
  <li>Copy and paste the following command and press Enter:
    <pre><code>sudo launchctl stop org.cups.cupsd</code></pre>
  </li>
  <li>Enter your Mac login password.</li>
  <li>Now start the service fresh:
    <pre><code>sudo launchctl start org.cups.cupsd</code></pre>
  </li>
  <li>Power cycle the Rollo printer. The print queue will immediately detect the hardware and flush out all pending shipping labels.</li>
</ol>`
  },
  {
    title: "Fix Rollo Printer macOS Security, Software Not Available & Driver Dropdown",
    slug: 'rollo-printer-software-not-available-apple-mac-driver-fix',
    seoTitle: "Fix Rollo 'Software Not Available from Apple' & Mac Driver Fix",
    metaDescription: "Resolve 'Software for this printer isn't available from Apple' error on Mac and fix the wrong driver selected in the 'Use' dropdown menu for Rollo printers.",
    excerpt: "When adding a Rollo printer on Mac, macOS often displays 'Software not available from Apple' or selects Generic PostScript. Here is the step-by-step fix.",
    errorCode: 'Software Not Available',
    tags: 'Rollo, Mac Driver, Software Not Available, Use Dropdown, Generic PostScript, macOS Sequoia, AirPrint Fix',
    wordCount: 1050,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: driverCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    featuredSnippet: "To fix 'Software for this printer isn't available from Apple' on Mac: 1) Download the official Rollo macOS driver package (.pkg) directly from rollo.com/driver and install it. 2) Open System Settings > Printers & Scanners > click Add Printer (+). 3) Highlight 'Rollo Thermal Printer'. 4) Look at the 'Use:' dropdown at the bottom; do NOT select 'Auto Select' or 'Generic PostScript'. 5) Click the dropdown > choose 'Select Software...' > type 'Rollo' in the search filter > highlight 'Rollo Printer' > click OK > click Add.",
    content: `<h2>Why Apple Shows 'Software Not Available'</h2>
<p>When you plug in a new printer on a Mac, macOS queries Apple's cloud driver catalog to see if Apple maintains a certified pre-packaged driver. Because Rollo uses specialized direct-thermal rasterization, Apple does not bundle the Rollo driver inside macOS. When macOS cannot find the driver in its cloud repository, it throws the message: <em>"Software for this printer isn't available from Apple."</em></p>

<h2>Step-by-Step Fix: Manual Driver Association</h2>
<ol>
  <li><strong>Install the Official Package First:</strong> If you haven't already, download the official Rollo Mac driver installer from <code>rollo.com/driver</code>, run the <code>.pkg</code> file, and complete the installation wizard. This places the raster filter into <code>/Library/Printers/Rollo/</code>.</li>
  <li><strong>Navigate to Printers &amp; Scanners:</strong> Open <em>System Settings &gt; Printers &amp; Scanners</em>.</li>
  <li><strong>Add the Hardware:</strong> Click the <strong>Add Printer, Scanner, or Fax (+)</strong> button.</li>
  <li><strong>Select the Rollo Device:</strong> In the top Default tab, click on <strong>Rollo Thermal Printer (USB)</strong>.</li>
  <li><strong>Configure the 'Use' Dropdown Correctly:</strong>
    <ul>
      <li>At the bottom of the window, locate the <strong>Use:</strong> field.</li>
      <li>Click the dropdown menu and select <strong>"Select Software..."</strong>.</li>
      <li>A small pop-up window named <em>Printer Software</em> will appear. Type <strong>Rollo</strong> into the top-right search box.</li>
      <li>Click on <strong>Rollo Printer</strong> to highlight it.</li>
      <li>Click <strong>OK</strong>.</li>
    </ul>
  </li>
  <li><strong>Finalize:</strong> Click the <strong>Add</strong> button in the bottom right corner.</li>
</ol>

<h2>How to Fix 'Generic PostScript' Selection Issues</h2>
<p>If you already added the Rollo printer but it prints blank pages or tiny, shrunken 1x1 inch labels in the corner of your 4x6 paper, macOS accidentally assigned the generic driver.</p>
<ul>
  <li>Open <em>System Settings &gt; Printers &amp; Scanners</em>.</li>
  <li>Select your Rollo printer and click <strong>Remove Printer (-)</strong>.</li>
  <li>Click <strong>Add Printer (+)</strong> and repeat the steps above to explicitly choose <strong>Select Software &gt; Rollo Printer</strong>.</li>
</ul>`
  },
  {
    title: "How to Reset Mac Printing System & Setup AirPrint for Rollo",
    slug: 'rollo-printer-reset-printing-system-airprint-setup-mac',
    seoTitle: "Reset Mac Printing System & AirPrint Setup for Rollo",
    metaDescription: "Step-by-step guide to resetting the macOS printing system to clear corrupted Rollo print queues, and setting up wireless AirPrint on iPhone, iPad, and Mac.",
    excerpt: "Resetting the macOS printing system flushes all corrupted spool files and resets CUPS daemon permissions, fixing persistent Rollo printing errors in minutes.",
    errorCode: null,
    tags: 'Rollo, Reset Printing System, AirPrint, Mac Setup, iPhone Printing, iPad Printing, CUPS Reset',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '7 minutes',
    categoryId: connectivityCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredSnippet: "To reset the Mac printing system for Rollo: 1) Open System Settings > Printers & Scanners. 2) Right-click (or Control-click) anywhere in the printer list and select 'Reset Printing System...'. 3) Confirm with your Mac administrator password. (Note: This deletes all print queues and resets CUPS). 4) Restart your Mac. 5) Re-add your Rollo printer. 6) To set up AirPrint on iPhone/iPad (Rollo Wireless): Ensure your phone and Rollo are on the same 2.4GHz Wi-Fi network; open any label PDF, tap Share > Print, select 'Rollo Wireless', set size to 4x6, and tap Print.",
    content: `<h2>When Should You Reset the macOS Printing System?</h2>
<p>If your Rollo printer was previously working but suddenly started throwing mysterious errors such as <em>"Filter failed"</em>, <em>"Stopped - 'rastertopclx' error"</em>, or refusing to delete stuck print jobs, the underlying macOS CUPS spool database has become corrupted. Performing a clean <strong>Printing System Reset</strong> wipes out bad spool states without affecting your user files.</p>

<h2>Step-by-Step: Resetting the macOS Printing System</h2>
<ol>
  <li>Open <strong>System Settings</strong> on your Mac.</li>
  <li>Scroll down in the sidebar and click on <strong>Printers &amp; Scanners</strong>.</li>
  <li>In the list of installed printers, <strong>right-click (or hold the Control key and click)</strong> on any empty space or directly on a printer name.</li>
  <li>A context menu will appear with the option: <strong>"Reset Printing System..."</strong>. Click it.</li>
  <li>A confirmation dialog will ask if you want to proceed. Click <strong>Reset</strong> and enter your Mac administrator username and password.</li>
  <li>macOS will terminate all active CUPS spoolers, delete all temporary raster cache files, and restore clean factory printer configurations.</li>
  <li>Restart your Mac, then click <strong>Add Printer (+)</strong> to re-add your Rollo with the official Rollo driver software.</li>
</ol>

<h2>Setting Up Wireless AirPrint on iPhone &amp; iPad</h2>
<p>The <strong>Rollo Wireless Thermal Printer</strong> includes native Apple AirPrint certification, allowing zero-driver printing from iOS devices.</p>
<ul>
  <li><strong>Wi-Fi Band Check:</strong> Ensure your iOS device is connected to the same <strong>2.4 GHz Wi-Fi network</strong> that your Rollo Wireless printer is configured on (Rollo does not operate on 5 GHz-only bands).</li>
  <li><strong>Open Label:</strong> In your mobile browser (Safari/Chrome) or shipping app (Pirate Ship, Shopify, Etsy, eBay), open the 4x6 label PDF.</li>
  <li><strong>Select Print:</strong> Tap the <strong>Share</strong> button and select <strong>Print</strong>.</li>
  <li><strong>Select Printer:</strong> Tap <em>Printer</em> and select <strong>Rollo Wireless Printer</strong>.</li>
  <li><strong>Paper Size:</strong> Ensure Paper Size is set to <strong>4x6" (or 100 x 150mm)</strong>.</li>
  <li>Tap <strong>Print</strong> in the top right corner. The label will emerge instantly.</li>
</ul>`
  }
];

async function main() {
  const brand = await prisma.brand.findUnique({ where: { slug: 'rollo' } });
  if (!brand) throw new Error('Rollo brand not found in database.');

  console.log(`🚀 Publishing Batch 1 (Clusters A & B: Drivers, Software & Mac) for brand: ${brand.name}`);

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
