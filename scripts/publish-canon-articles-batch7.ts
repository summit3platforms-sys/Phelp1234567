import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const canonBrandId = 'aa9e42c5-e0f0-4b60-b776-c39f46748c33';
const connectivityCategory = 'c3a92d93-fcbb-439c-a11e-80cde3d2a5ce';
const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';
const scannerCategory = '773cb788-7cd5-4a7b-93d9-5e1c8448aa7a';
const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Canon Printer Offline in Windows 11 (SNMP & IP Address Fix)",
    slug: 'canon-printer-offline-windows-11',
    seoTitle: "Fix Canon Printer Offline in Windows 11 (100% Working)",
    metaDescription: "Is your Canon printer showing as Offline in Windows 11? Learn how to disable SNMP, set a static IP address, and clear the Windows Print Spooler to bring it online.",
    excerpt: "Windows 11 frequently struggles to maintain a steady connection with networked Canon printers. Here is how to fix the dreaded 'Offline' status permanently.",
    errorCode: null,
    tags: 'Canon, Offline, Windows 11, SNMP, IP Address, Spooler, Network',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: connectivityCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "To fix a Canon printer showing Offline in Windows 11: 1) Open Windows Settings > Bluetooth & Devices > Printers & Scanners. 2) Click your Canon printer and select 'Printer Properties'. 3) Go to the 'Ports' tab and click 'Configure Port'. 4) Uncheck the box that says 'SNMP Status Enable' and click OK. Windows 11 frequently misinterprets SNMP network traffic, falsely labeling the printer as offline. 5) If that fails, restart the Print Spooler service in the Windows Services app.",
    content: `<h2>The Windows 11 Offline Glitch</h2>
<p>You turn on your Canon printer. The blue Wi-Fi light is solid. You can even print to it from your iPhone. But when you try to print a Microsoft Word document from your Windows 11 PC, it says the printer is <strong>Offline</strong>.</p>
<p>This is a notoriously common issue in Windows 11. The operating system uses specific network protocols to constantly "ping" the printer to check its status. If the printer goes to sleep to save power, it stops responding to those pings, and Windows permanently marks it as Offline.</p>

<h2>Fix 1: Disable SNMP Status</h2>
<p>SNMP (Simple Network Management Protocol) is a tool Windows uses to check ink levels and printer status over a network. Unfortunately, it is highly prone to false negatives on Canon printers.</p>
<ol>
    <li>Click the Windows Start button and type <strong>Printers &amp; Scanners</strong>.</li>
    <li>Click on your Canon printer in the list.</li>
    <li>Click <strong>Printer Properties</strong> (not just Properties).</li>
    <li>Click the <strong>Ports</strong> tab at the top.</li>
    <li>Look at the list of ports. The one currently in use will have a checkmark next to it (usually a WSD or Standard TCP/IP port). Click <strong>Configure Port</strong>.</li>
    <li>Look at the bottom of the window. If there is a checkbox for <strong>SNMP Status Enable</strong>, uncheck it.</li>
    <li>Click OK, and close the properties window. In many cases, the printer will immediately jump back Online.</li>
</ol>

<h2>Fix 2: Clearing the Print Spooler</h2>
<p>If a corrupted print job is stuck in the background, Windows will freeze the connection and mark the printer offline.</p>
<ul>
    <li>Press the <strong>Windows Key + R</strong> to open the Run dialog box.</li>
    <li>Type <code>services.msc</code> and press Enter.</li>
    <li>Scroll down the alphabetical list until you find <strong>Print Spooler</strong>.</li>
    <li>Right-click on it and select <strong>Restart</strong>. The screen will flash for a second as the service restarts. Check if the printer is online.</li>
</ul>

<h2>Fix 3: The WSD Port Problem</h2>
<p>When you install a printer wirelessly in Windows 11, Microsoft automatically uses a WSD (Web Services for Devices) port. WSD is notoriously unstable.</p>
<p>The permanent fix is to assign your Canon printer a static IP address via your Wi-Fi router, and then manually add a Standard TCP/IP port in Windows using that exact IP address. This bypasses WSD entirely and creates a rock-solid, permanent pathway between your PC and your printer.</p>`
  },
  {
    title: "Canon IJ Scan Utility Not Working? Fix Scanner Driver & Network Glitches",
    slug: 'canon-ij-scan-utility-not-working',
    seoTitle: "Fix Canon IJ Scan Utility Not Working (Windows & Mac)",
    metaDescription: "Is the Canon IJ Scan Utility freezing, failing to open, or saying the scanner is not found? Learn how to fix Twain driver conflicts and network scanner issues.",
    excerpt: "The Canon IJ Scan Utility is a powerful piece of software, but driver conflicts and network changes can cause it to freeze or fail to detect your scanner.",
    errorCode: null,
    tags: 'Canon, IJ Scan Utility, Scanner, Not Working, Twain Driver, Network Scan',
    wordCount: 1000,
    difficultyLevel: 'Intermediate',
    timeToFix: '20 minutes',
    categoryId: softwareCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "To fix the Canon IJ Scan Utility: 1) Open the utility. Look at the 'Product Name' dropdown menu at the top. If your printer is listed twice (once normally, and once with the word 'Network' next to it), ensure you have the 'Network' version selected if you are scanning over Wi-Fi. 2) If the utility won't open at all, press Windows Key + R, type 'services.msc', and ensure the 'Windows Image Acquisition (WIA)' service is running. 3) Reinstall the specific MP Drivers for your printer from the Canon website.",
    content: `<h2>Why the IJ Scan Utility Fails</h2>
<p>The <strong>Canon IJ Scan Utility</strong> is the central hub for scanning documents and photos to your computer. When it fails, you might get an error saying <em>"Cannot communicate with scanner,"</em> or you might click the application icon and absolutely nothing happens.</p>
<p>This is usually caused by a breakdown in the TWAIN driver architecture, or Windows accidentally re-assigning the printer's network IP address.</p>

<h2>Fix 1: The "Network" Dropdown Mistake</h2>
<p>This is the most common scanning mistake for Wi-Fi users.</p>
<p>When you open the IJ Scan Utility, look at the very top of the small window. There is a dropdown menu labeled <strong>Product Name</strong>. If you previously plugged your printer in via USB, but now you use Wi-Fi, your printer will be listed twice.</p>
<ul>
    <li>Example: <strong>Canon MG3600 series</strong> (This is the USB driver).</li>
    <li>Example: <strong>Canon MG3600 series Network</strong> (This is the Wi-Fi driver).</li>
</ul>
<p>If you are connected via Wi-Fi but have the USB driver selected, the scanner will completely fail to respond. Select the "Network" version from the dropdown and try again.</p>

<h2>Fix 2: Restarting the WIA Service</h2>
<p>Windows relies on a background service called Windows Image Acquisition (WIA) to process scans. If this service crashes, the Canon software cannot access the hardware.</p>
<ol>
    <li>Press <strong>Windows Key + R</strong>.</li>
    <li>Type <code>services.msc</code> and hit Enter.</li>
    <li>Scroll down to <strong>Windows Image Acquisition (WIA)</strong>.</li>
    <li>Right-click it and select <strong>Restart</strong>. (If it says "Start," click Start).</li>
    <li>Try opening the IJ Scan Utility again.</li>
</ol>

<h2>Fix 3: Complete Driver Wipe and Reinstall</h2>
<p>If the utility refuses to open, the core DLL files are likely corrupted.</p>
<p>Do not just install the software again over the old one. You must completely uninstall it first. Go to Windows Settings > Apps, and uninstall the <strong>Canon MP Drivers</strong> and the <strong>Canon IJ Scan Utility</strong>. Restart your computer.</p>
<p>Go to the official Canon Support website, type in your exact printer model, and download the full <strong>Driver and Software Package</strong>. Reinstalling this fresh package will rebuild the necessary TWAIN drivers and link the utility back to the scanner hardware.</p>`
  },
  {
    title: "Canon PRINT App Not Detecting Printer (Bluetooth & Wi-Fi Fix)",
    slug: 'canon-print-app-not-detecting-printer',
    seoTitle: "Fix Canon PRINT App Not Finding Printer (iOS & Android)",
    metaDescription: "Is your smartphone failing to find your Canon printer in the PRINT app? Learn how to fix Bluetooth pairing, 5GHz network conflicts, and iOS local network settings.",
    excerpt: "The Canon PRINT Inkjet/SELPHY app is supposed to make mobile printing easy, but it frequently fails to detect the printer on the network. Here is how to fix it.",
    errorCode: null,
    tags: 'Canon, PRINT App, Mobile Printing, iPhone, Android, Not Detecting, Wi-Fi',
    wordCount: 950,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: connectivityCategory,
    authorId: authors.elena,
    reviewerId: authors.alex,
    featuredSnippet: "To fix the Canon PRINT app not detecting your printer: 1) On an iPhone (iOS 14+), go to your iPhone's main Settings app. Scroll all the way down to the 'Canon PRINT' app. Ensure the 'Local Network' toggle is turned ON. If it is off, the app is blocked from seeing your printer. 2) Ensure your phone is connected to your router's 2.4GHz Wi-Fi network, not the 5GHz network or cellular data. 3) Force the printer into pairing mode by holding the 'Wireless Connect' button for 3 seconds.",
    content: `<h2>Why the App Fails to Find the Printer</h2>
<p>You downloaded the <strong>Canon PRINT Inkjet/SELPHY</strong> app, you turned your printer on, and you tapped "Add Printer." The app spins for a minute and then says <em>"Printer could not be found."</em></p>
<p>This happens due to strict smartphone privacy settings blocking local network scans, or because your phone and printer are on different Wi-Fi bands.</p>

<h2>Fix 1: The iOS "Local Network" Privacy Block</h2>
<p>If you are using an iPhone or iPad, Apple introduced a privacy feature that prevents apps from scanning your home network for devices without your explicit permission.</p>
<ol>
    <li>Open the main <strong>Settings</strong> app on your iPhone (not the Canon app).</li>
    <li>Scroll all the way down to the bottom of your installed apps list.</li>
    <li>Tap on <strong>Canon PRINT</strong>.</li>
    <li>Look for the toggle switch labeled <strong>Local Network</strong>.</li>
    <li>If it is gray (off), toggle it to green (on).</li>
    <li>Force-close the Canon app and reopen it. It should instantly find your printer.</li>
</ol>

<h2>Fix 2: The 5GHz Band Conflict</h2>
<p>Most modern Wi-Fi routers are dual-band (they broadcast both 2.4GHz and 5GHz signals). Almost all consumer Canon printers only have a 2.4GHz antenna.</p>
<p>While some advanced routers can bridge these two networks seamlessly, many do not. If your iPhone is connected to your 5GHz network, and your printer is on the 2.4GHz network, the Canon app cannot bridge the gap.</p>
<p>Open your phone's Wi-Fi settings and connect to the 2.4GHz version of your home Wi-Fi (often labeled with a -2.4 or -2G suffix). Try adding the printer again.</p>

<h2>Fix 3: Forcing Broadcast Mode</h2>
<p>If you are trying to set up a brand new printer, it doesn't know your Wi-Fi password yet. It must broadcast its own temporary Bluetooth or Wi-Fi Direct signal for your phone to find.</p>
<ul>
    <li>Press and hold the <strong>Wireless Connect</strong> button (the button with a smartphone and a chain-link icon) on your printer for 3 seconds.</li>
    <li>The Wi-Fi icon on the printer's screen will begin to flash rapidly.</li>
    <li>Now, open the Canon PRINT app and tap Add Printer. The app will detect the flashing printer, connect to it, and ask you for your home Wi-Fi password to complete the setup.</li>
</ul>`
  },
  {
    title: "How to Connect Any Canon Printer to Wi-Fi Using WPS",
    slug: 'canon-printer-wireless-setup-wps',
    seoTitle: "Canon Printer WPS Setup (Fastest Wireless Connection)",
    metaDescription: "Learn how to use the WPS (Wi-Fi Protected Setup) button on your router to connect your Canon PIXMA, MAXIFY, or imageCLASS printer to Wi-Fi in under 2 minutes.",
    excerpt: "Forget typing complicated Wi-Fi passwords on tiny printer screens. WPS is the fastest, easiest way to connect your Canon printer to your wireless network.",
    errorCode: null,
    tags: 'Canon, WPS, Wi-Fi Setup, Wireless, Router Connection, Push Button',
    wordCount: 800,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: setupCategory,
    authorId: authors.david,
    reviewerId: authors.marcus,
    featuredSnippet: "To connect your Canon printer using WPS: 1) Locate the WPS button on your Wi-Fi router (it usually has two circular arrows or says 'WPS'). 2) On your printer, press and hold the Wi-Fi button until the power or alarm light flashes. 3) Within 2 minutes, walk to your router and hold the WPS button for 5 seconds until its light flashes. 4) The blue Wi-Fi light on the printer will blink rapidly while they negotiate, and then turn solid blue when successfully connected.",
    content: `<h2>What is WPS?</h2>
<p><strong>WPS (Wi-Fi Protected Setup)</strong> is a network security standard that allows you to connect a device to your router without typing in a password. When you press the WPS button on your router, it temporarily drops its security firewall for exactly 2 minutes and broadcasts an invitation to any device looking to connect.</p>
<p>If your Canon printer is listening for that invitation at the same time, they pair up instantly like Bluetooth devices. It is the fastest way to get a printer online.</p>

<h2>Step 1: Check Your Router</h2>
<p>Before you begin, ensure your router actually has a physical WPS button. It is usually located on the back panel, near the ethernet ports. It might be a tiny button labeled "WPS", or it might just be an icon featuring two circular arrows. <em>(Note: Some modern mesh routers, like Eero, have removed physical WPS buttons for security reasons).</em></p>

<h2>Step 2: Start the Printer's WPS Mode</h2>
<p>The method to start WPS on the printer depends on whether it has a screen.</p>
<p><strong>If your Canon printer has an LCD Screen:</strong></p>
<ol>
    <li>Press the <strong>Setup</strong> button (pliers icon) or the Home button.</li>
    <li>Navigate to <strong>Wireless LAN Setup</strong> or <strong>Wi-Fi Setup</strong>.</li>
    <li>Select <strong>WPS (Push button method)</strong>.</li>
    <li>The screen will instruct you to press the button on the router.</li>
</ol>
<p><strong>If your Canon printer has NO Screen (Buttons only):</strong></p>
<ol>
    <li>Turn the printer on.</li>
    <li>Press and hold the <strong>Wi-Fi</strong> button until the green Power (ON) lamp flashes once.</li>
    <li>Press the <strong>Black</strong> Start button.</li>
    <li>Press the <strong>Wi-Fi</strong> button again. The blue Wi-Fi indicator will start flashing quickly.</li>
</ol>

<h2>Step 3: Press the Router Button</h2>
<p>You now have exactly 2 minutes to complete the connection.</p>
<ul>
    <li>Walk over to your router.</li>
    <li>Press and hold the <strong>WPS button</strong> for about 3 to 5 seconds. The light on the router should start flashing, indicating it is in pairing mode.</li>
    <li>Walk back to the printer. The blue Wi-Fi light will continue to flash as the two devices negotiate security keys.</li>
    <li>When the blue Wi-Fi light on the printer turns <strong>solid</strong> (and the screen says "Connected"), the setup is complete.</li>
</ul>`
  }
];

async function main() {
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
          brandId: canonBrandId,
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
