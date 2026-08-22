import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';
const connectivityCategory = 'c3a92d93-fcbb-439c-a11e-80cde3d2a5ce';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "DYMO Connect vs. DYMO Label Software (DLS8): Which Do You Need?",
    slug: 'dymo-connect-vs-dymo-label-software-difference',
    seoTitle: "DYMO Connect vs DYMO Label Software (DLS8 Comparison & Alternatives)",
    metaDescription: "Confused between DYMO Connect and DYMO Label Software? Learn the differences, compatibility with the LabelWriter 450 vs 550, and discontinued DLS8 alternatives.",
    excerpt: "DYMO maintains two entirely different software platforms. Choosing the wrong one will cause your printer to glitch, fail to print, or simply not be detected.",
    errorCode: null,
    tags: 'DYMO, DYMO Connect, DYMO Label Software, DLS8, LabelWriter 550, Discontinued, Software Comparison',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: 'N/A',
    categoryId: softwareCategory,
    authorId: authors.alex,
    reviewerId: authors.elena,
    featuredSnippet: "The difference between DYMO software: DYMO Label Software (DLS8) is the older, discontinued software. It is highly reliable, features a classic interface, and works perfectly with the LabelWriter 450 and 4XL. DYMO Connect is the modern replacement software required for the newer LabelWriter 550 and 5XL series. The 550 series CANNOT use DLS8; it requires DYMO Connect. You can install both programs on the same computer simultaneously to support both old and new printers.",
    content: `<h2>The DYMO Software Divide</h2>
<p>If you recently upgraded your DYMO LabelWriter or bought a new computer, you probably discovered that DYMO offers two entirely different software packages: <strong>DYMO Label Software (DLS8)</strong> and <strong>DYMO Connect</strong>. Choosing the right one is the single most important step in setting up your printer.</p>

<h2>DYMO Label Software (DLS v8)</h2>
<p>DLS8 is the legacy software. It was the gold standard for over a decade. It features a straightforward interface, excellent address book integration, and rock-solid reliability.</p>
<ul>
    <li><strong>Compatible Printers:</strong> LabelWriter 400, 450, 450 Turbo, 450 Twin Turbo, 4XL.</li>
    <li><strong>The Catch:</strong> It is officially <strong>discontinued</strong>. DYMO no longer updates it. While it still works on Windows 10 and 11, future operating system updates may break it permanently.</li>
    <li><strong>Important:</strong> DLS8 will <em>not</em> recognize the newer LabelWriter 550 or 5XL. Do not attempt to use it with the 500 series.</li>
</ul>

<h2>DYMO Connect</h2>
<p>DYMO Connect is the modern replacement. It was designed from the ground up for modern operating systems, featuring a sleek, touch-friendly UI and cloud integration.</p>
<ul>
    <li><strong>Compatible Printers:</strong> LabelWriter 450, 4XL, 550, 550 Turbo, 5XL, and Wireless models.</li>
    <li><strong>The 550 Mandate:</strong> The LabelWriter 550 series uses RFID chips inside the label rolls to detect label sizes automatically. This RFID technology is only supported by DYMO Connect. <strong>You must use DYMO Connect if you have a 550 or 5XL.</strong></li>
</ul>

<h2>Can You Run Both Together?</h2>
<p>Yes. If your office has an older LabelWriter 450 on one desk and a new LabelWriter 550 on another, you can install both DLS8 and DYMO Connect on the same PC. They use different background web services and do not conflict. However, do not have both programs actively open on your screen at the exact same time when clicking "Print," or the Windows print spooler may get confused.</p>`
  },
  {
    title: "Fix DYMO Software Won't Open or Install (Windows 11 & Mac)",
    slug: 'dymo-label-software-wont-open-install',
    seoTitle: "Fix DYMO Software Won't Open or Install (Windows 11 / Mac)",
    metaDescription: "Is DYMO Connect or DLS8 freezing, refusing to open, or failing to install on Windows 11? Learn how to clear the AppData cache and fix .NET Framework errors.",
    excerpt: "When DYMO software refuses to launch on Windows 11, clicking the icon does nothing. Here is how to wipe the corrupted background cache and force it open.",
    errorCode: null,
    tags: 'DYMO, Software Wont Open, Windows 11, Install Error, DYMO Connect, DLS8',
    wordCount: 950,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: softwareCategory,
    authorId: authors.marcus,
    reviewerId: authors.david,
    featuredSnippet: "To fix DYMO software that won't open on Windows 11: 1) Press Ctrl + Shift + Esc to open Task Manager. 2) Look for 'DYMO.DLS.exe' or 'DYMO Connect' running in the background and click End Task. 3) Press Windows Key + R, type '%localappdata%' and press Enter. 4) Find the folder named 'DYMO' and delete it. This folder contains corrupted cache files preventing the app from launching. 5) Open the DYMO software again; it will rebuild a fresh cache and open normally.",
    content: `<h2>The Silent Failure (Clicking Does Nothing)</h2>
<p>The most frustrating software bug for DYMO users on Windows 11 occurs when you double-click the DYMO Connect or DLS8 shortcut, your mouse cursor spins for a second, and then... nothing happens. No error message, no pop-up, just silence.</p>
<p>This happens because the software is actually crashing in the background due to a corrupted user cache file. The program tries to load your last-used label template, fails, and hangs silently in the Task Manager.</p>

<h2>Fix 1: Clearing the AppData Cache</h2>
<p>To fix the silent crash, you must delete the corrupted memory cache.</p>
<ol>
    <li>Press <strong>Ctrl + Shift + Esc</strong> to open Task Manager.</li>
    <li>Scroll down and look for any background processes labeled <strong>DYMO</strong>. Right-click them and select <strong>End Task</strong>.</li>
    <li>Press the <strong>Windows Key + R</strong> on your keyboard to open the Run dialog.</li>
    <li>Type exactly <code>%localappdata%</code> and press Enter. A hidden Windows folder will open.</li>
    <li>Locate the folder named <strong>DYMO</strong> or <strong>Sanford,_L.P</strong>. Right-click it and select <strong>Delete</strong>.</li>
    <li>Empty your Recycle Bin.</li>
    <li>Double-click your DYMO software shortcut. It will open like it is brand new.</li>
</ol>

<h2>Fix 2: Installation Failures (.NET Framework)</h2>
<p>If you are trying to install DYMO Connect, but the installation bar freezes or rolls back with a generic error, Windows is missing a prerequisite.</p>
<p>DYMO Connect relies heavily on Microsoft's .NET Framework. Go to the Windows Start menu, type <strong>Turn Windows features on or off</strong>, and press Enter. Ensure the box next to <strong>.NET Framework 3.5</strong> and <strong>.NET Framework 4.8</strong> are checked. Click OK and let Windows download the necessary files. Restart your PC and run the DYMO installer again.</p>

<h2>Fix 3: Mac Installation Security Blocks</h2>
<p>If you are on a Mac (macOS Sonoma or Ventura) and the DYMO installer says "Cannot be opened because it is from an unidentified developer," Apple is blocking the software.</p>
<p>Go to <strong>System Settings > Privacy &amp; Security</strong>. Scroll down to the Security section. You will see a message saying DYMO was blocked. Click <strong>Open Anyway</strong> to bypass the block and complete the installation.</p>`
  },
  {
    title: "DYMO Connect Not Detecting Printer? (USB & Network Fix)",
    slug: 'dymo-connect-not-detecting-printer',
    seoTitle: "Fix DYMO Connect Not Detecting Printer (USB & Wi-Fi)",
    metaDescription: "Is the DYMO Connect software saying 'No Printer Detected'? Learn how to fix USB connection drops, reset the DYMO Web Service, and fix Windows Spooler conflicts.",
    excerpt: "You plugged the USB cable in, the printer has a solid blue light, but DYMO Connect insists there is no printer. Here is how to force the software to see the hardware.",
    errorCode: null,
    tags: 'DYMO, Not Detecting Printer, DYMO Connect, USB, Network, Offline',
    wordCount: 850,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: connectivityCategory,
    authorId: authors.elena,
    reviewerId: authors.alex,
    featuredSnippet: "To fix DYMO Connect not detecting your printer: 1) Unplug the printer's USB cable from your computer. 2) Look in the bottom-right corner of your Windows taskbar (near the clock) for the small DYMO icon. 3) Right-click the DYMO icon and select 'Exit' to completely close the background Web Service. 4) Open the DYMO Connect app again. 5) Plug the USB cable back into a different port directly on your computer (do not use a USB hub). The printer should now appear in the drop-down menu.",
    content: `<h2>The Communication Breakdown</h2>
<p>One of the most common issues with the new DYMO Connect software is a complete failure to recognize the printer, even when Windows itself sees the printer just fine. If you go to Windows Printers &amp; Scanners and see the "DYMO LabelWriter 550" sitting there, but DYMO Connect says "No Printer Selected," the background service has crashed.</p>

<h2>Fix 1: Restarting the DYMO Web Service</h2>
<p>DYMO Connect doesn't actually talk directly to the USB port. It talks to a tiny background program called the <strong>DYMO Web Service</strong>, which in turn talks to the USB port. If that middleman crashes, the software goes blind.</p>
<ol>
    <li>Close the DYMO Connect window.</li>
    <li>Look at your Windows System Tray (the small icons next to the clock in the bottom right). Click the little arrow to show hidden icons.</li>
    <li>Look for a small blue DYMO logo.</li>
    <li>Right-click it and select <strong>Exit</strong> or <strong>Quit</strong>.</li>
    <li>Open your Start menu, search for <strong>DYMO Connect Web Service</strong>, and click it to restart it. The icon will reappear by the clock.</li>
    <li>Open DYMO Connect. It should now list your printer.</li>
</ol>

<h2>Fix 2: The USB Hub Problem</h2>
<p>LabelWriters draw a significant amount of data, and older models draw some power through the USB cable. Do not plug a DYMO printer into a USB hub, a monitor pass-through port, or a keyboard extension port. Plug it directly into the motherboard on the back of your PC. If you are using a Mac laptop with USB-C, ensure you are using a high-quality, high-bandwidth USB-C to USB-A adapter.</p>

<h2>Fix 3: The Unspecified Device Glitch</h2>
<p>Sometimes Windows detects the printer as a "storage device" rather than a printer.</p>
<ul>
    <li>Open <strong>Control Panel</strong> > <strong>Devices and Printers</strong>.</li>
    <li>Look at the bottom section labeled <em>Unspecified</em>. If your DYMO is listed there, right-click it and select <strong>Troubleshoot</strong>.</li>
    <li>Windows will realize it is missing the printing protocols and move it to the Printers section, making it visible to DYMO Connect.</li>
</ul>`
  },
  {
    title: "Fix DYMO Connect Web Service Certificate Error (Localhost)",
    slug: 'dymo-connect-web-service-certificate-error-localhost',
    seoTitle: "Fix DYMO Web Service Certificate Error (Localhost 41951)",
    metaDescription: "Getting a DYMO certificate error on localhost:41951? Learn why Chrome and Safari block the DYMO Web Service and how to bypass the SSL security warning.",
    excerpt: "If you print DYMO labels directly from a web browser (like Shopify or Amazon), you rely on the DYMO Web Service. When the SSL certificate expires, printing stops completely.",
    errorCode: 'Localhost Certificate',
    tags: 'DYMO, Certificate Error, Web Service, Localhost, Chrome, Safari, SSL',
    wordCount: 950,
    difficultyLevel: 'Advanced',
    timeToFix: '10 minutes',
    categoryId: connectivityCategory,
    authorId: authors.david,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix the DYMO Web Service certificate error in your browser: 1) Ensure the DYMO Web Service is running (check the blue icon by your clock). 2) Open Google Chrome or Safari and type exactly 'https://127.0.0.1:41951' into the address bar. 3) You will see a giant warning saying 'Your connection is not private'. 4) Click 'Advanced' at the bottom of the warning. 5) Click 'Proceed to 127.0.0.1 (unsafe)'. You will see a blank page that says 'Congratulations!'. You have now bypassed the block, and web printing will work again.",
    content: `<h2>What is the DYMO Web Service?</h2>
<p>If you use a third-party website like Shopify, eBay, or a medical records system to print directly to your DYMO, those websites cannot talk directly to your USB port. They must bounce the command through the <strong>DYMO Web Service</strong>, a tiny local server running on your computer at port 41951.</p>
<p>Because modern browsers enforce strict SSL (HTTPS) security, the DYMO Web Service uses a self-signed security certificate. When this certificate expires or when Chrome updates its security protocols, Chrome blocks the connection, throwing a "Certificate Error" or "Localhost Refused to Connect" error. Your web page suddenly cannot find your printer.</p>

<h2>The Fast Fix: Bypassing the Browser Warning</h2>
<p>You can manually tell your web browser to trust the DYMO connection despite the expired certificate.</p>
<ol>
    <li>Look at your system tray (by the clock on Windows) or the top menu bar (on Mac) and ensure the blue DYMO Web Service icon is running.</li>
    <li>Open a new tab in the web browser you use for printing (e.g., Google Chrome).</li>
    <li>In the URL address bar, type exactly this address and press Enter: <strong>https://127.0.0.1:41951</strong></li>
    <li>The browser will block the page with a massive red or gray warning: <em>"Your connection is not private"</em> or <em>"Warning: Potential Security Risk Ahead"</em>.</li>
    <li>Click the <strong>Advanced</strong> button.</li>
    <li>Click <strong>Proceed to 127.0.0.1 (unsafe)</strong> or <strong>Accept the Risk and Continue</strong>.</li>
    <li>The screen will turn white, and you should see a single line of text: <strong>"Congratulations! Dymo Web Service is running."</strong></li>
</ol>
<p>By forcing the browser to load this page, you have created a permanent exception for the DYMO certificate. Go back to Shopify or your web app and try printing again; it will work instantly.</p>

<h2>The Permanent Fix: Updating the Software</h2>
<p>If the bypass trick stops working, your version of DYMO Connect is simply too old, and its embedded security certificate is permanently revoked by modern browsers.</p>
<p>You must completely uninstall DYMO Connect or DLS8 from your computer. Go to the official DYMO support website and download the absolute newest version of DYMO Connect. The newest installers contain refreshed SSL certificates that satisfy Google Chrome and Apple Safari's strict requirements.</p>`
  }
];

async function main() {
  let brand = await prisma.brand.findUnique({ where: { slug: 'dymo' } });
  if (!brand) {
    brand = await prisma.brand.create({
      data: {
        name: 'DYMO',
        slug: 'dymo',
        description: 'Manufacturer of thermal label printers including the LabelWriter 450, 4XL, 550, and 5XL series.'
      }
    });
    console.log('✅ Created brand: DYMO');
  } else {
    console.log('✅ Found brand: DYMO');
  }

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
          brandId: brand.id,
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
