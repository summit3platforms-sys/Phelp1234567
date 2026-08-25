import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';
const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix Lexmark Service Engine, Controller Card (980) & Scanner Lamp (820) Errors",
    slug: 'fix-lexmark-service-engine-controller-card-980-scanner-lamp-820',
    seoTitle: "Fix Lexmark 133.00, 980 Controller Card & 820 Scanner Errors",
    metaDescription: "Learn how to fix Lexmark Service Engine errors (133.00), reset Image Stabilization, and troubleshoot 980 Controller Card and 820 Scanner Lamp failures.",
    excerpt: "Fatal errors involving the logic board (Controller Card) or the scanner carriage require deep diagnostic resets before replacing expensive hardware.",
    errorCode: '980 Controller Card',
    tags: 'lexmark error 133.00 service engine, lexmark restore factory toner density, lexmark error 980 controller card, lexmark reset image stabilisation guide, lexmark error 820.00 scanner lamp, lexmark cxlbl error code meaning',
    wordCount: 1150,
    difficultyLevel: 'Advanced',
    timeToFix: '20 minutes',
    categoryId: errorCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "To fix a Lexmark 980 Controller Card or 133.00 Service Engine error: 1) The 980 error means the main logic board experienced a fatal communications fault, often caused by a power surge or a failed firmware update. Turn the printer OFF, unplug it for 15 minutes, and remove any USB thumb drives or network cables. 2) Turn it back on. If the error clears, the network card was overwhelmed by a corrupted print job. If the error remains, the logic board is fried. 3) For 820.00 Scanner Lamp errors, the glass scanning carriage failed to initialize. Ensure the physical lock switch on the side of the scanner bed is set to 'Unlocked'.",
    content: `<h2>Diagnosing Lexmark 980 and 133.00 Errors</h2>
<p>Unlike paper jams, errors in the 980 and 133 ranges are deeply embedded in the printer's brain (the Controller Card).</p>
<ul>
  <li><strong>133.00 Service Engine:</strong> The engine control board cannot talk to the main logic board. This is frequently caused by a loose ribbon cable inside the printer (usually after moving the printer to a new desk).</li>
  <li><strong>980 Controller Card:</strong> A catastrophic failure of the main logic board. Sometimes, bad RAM causes this. If your printer has a removable RAM stick in the side formatter cage, power off, pull the RAM out, rub the gold contacts with an eraser, and reseat it.</li>
  <li><strong>CXLBL Code:</strong> This is a rare code indicating a failure to parse a specific printer language (usually caused by sending a raw PostScript file to a PCL-only driver). Cancel the print job on the PC and reboot the printer.</li>
</ul>

<h2>Fixing 820.00 Scanner Lamp Errors</h2>
<p>If you own an MFP (Multifunction Printer) and get an <strong>820.00</strong> error upon boot, the scanner carriage cannot move.</p>
<ol>
  <li><strong>The Shipping Lock:</strong> Every scanner has a physical lock switch (usually a sliding tab near the glass) to prevent the delicate lamp from shattering during transit. If someone accidentally slid this lock over, the motor will grind and throw an 820 error. Unlock it.</li>
  <li><strong>Burned Out Lamp:</strong> If the carriage moves, but the LED lamp never illuminates, the lamp is dead. The entire flatbed scanner module must be replaced.</li>
</ol>

<h2>Resetting Image Stabilization & Toner Density</h2>
<p>If your color prints look washed out, or the calibration constantly fails, you may need to reset the image stabilization.</p>
<p>Boot into the <strong>Configuration Menu</strong> (Hold 2 &amp; 6 while powering on). Scroll to <strong>Restore Factory Toner Density</strong> or <em>Color Trapping</em>. Execute the reset, then run a full Color Calibration from the normal menus.</p>`
  },
  {
    title: "Fix Lexmark Network Errors: Offline in Windows 11 & Web Server Not Loading",
    slug: 'fix-lexmark-network-errors-offline-windows-11-web-server',
    seoTitle: "Fix Lexmark Offline in Windows 11 & Network Errors",
    metaDescription: "Is your Lexmark printer showing as 'Offline' in Windows 11? Learn how to fix 'Document Failed to Print' errors and access a blocked Embedded Web Server (EWS).",
    excerpt: "Network dropouts are the most common complaint for Lexmark printers on Windows 11. Learn how to bypass SNMP bugs and fix USB vs Network conflicts.",
    errorCode: 'Printer Offline',
    tags: 'lexmark printer offline windows 11, lexmark document failed to print error, lexmark printer network vs usb error, lexmark embedded web server not loading',
    wordCount: 1000,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: softwareCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "To fix a Lexmark printer showing 'Offline' in Windows 11: 1) Windows 11 uses a protocol called SNMP to check if the printer is awake. If the Lexmark goes into Deep Sleep mode, it stops responding to SNMP pings, causing Windows to permanently mark it Offline. 2) To fix this, open Windows Control Panel > Devices and Printers. 3) Right-click the Lexmark and choose 'Printer Properties'. 4) Go to the 'Ports' tab. Highlight the checked Standard TCP/IP port and click 'Configure Port'. 5) Uncheck the box that says 'SNMP Status Enabled' and hit OK. The printer will instantly come back online.",
    content: `<h2>Lexmark "Offline" and "Document Failed to Print"</h2>
<p>If your PC says the printer is offline, but you can walk up to the Lexmark touch screen and successfully copy a document, the printer is perfectly fine. The issue is your Windows print spooler.</p>

<h3>The WSD vs TCP/IP Conflict</h3>
<p>When you plug a Lexmark into a network, Windows 11 will auto-discover it using WSD (Web Services for Devices). <strong>WSD is notoriously unstable.</strong> If the printer's IP address changes by even one digit, the WSD port breaks, resulting in a "Document Failed to Print" popup.</p>
<ul>
  <li><strong>The Fix:</strong> Delete the auto-installed WSD printer. Click "Add Printer", but select "The printer I want isn't listed".</li>
  <li>Choose <strong>Add a printer using an IP address</strong>.</li>
  <li>Type the exact IP address found on the Lexmark's Network Setup Page (e.g., 192.168.1.50). This forces a rock-solid Standard TCP/IP port connection.</li>
</ul>

<h2>Embedded Web Server Not Loading</h2>
<p>If you type the Lexmark's IP address into Chrome, but get a "Connection Refused" or timeout error:</p>
<ol>
  <li><strong>HTTPS vs HTTP:</strong> Ensure you type <code>https://</code> before the IP address. Newer Lexmark firmware blocks standard HTTP port 80 for security.</li>
  <li><strong>EWS Disabled:</strong> Go to the physical printer screen. Navigate to Settings &gt; Network/Ports &gt; HTTP/FTP Settings. Ensure "Enable HTTP Server" is turned ON.</li>
  <li><strong>VPN Conflict:</strong> If your laptop is connected to a corporate VPN (like Cisco AnyConnect), it will block all local network traffic, preventing you from reaching the printer's EWS. Disconnect the VPN temporarily.</li>
</ol>`
  },
  {
    title: "Fix Lexmark Firmware Error 900 & P128 Updates",
    slug: 'fix-lexmark-firmware-error-900-p128-updates',
    seoTitle: "Fix Lexmark Error 900 & P128 Firmware Updates",
    metaDescription: "Does your Lexmark printer freeze with an Error 900? Learn how to recover a bricked Lexmark logic board, flash a P128 firmware update, and clear corrupted memory.",
    excerpt: "The dreaded Lexmark Error 900 is a Software RIP (Raster Image Processor) crash. Learn how to recover the firmware and stop corrupted print jobs from crashing the machine.",
    errorCode: '900 Firmware Error',
    tags: 'lexmark error 900 firmware, lexmark firmware update p128 level',
    wordCount: 850,
    difficultyLevel: 'Advanced',
    timeToFix: '15 minutes',
    categoryId: softwareCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix a Lexmark Error 900 (Firmware / Software RIP Crash): 1) The 900 error occurs when the printer's logic board receives a corrupted print file (like a massive PDF) that it cannot translate, causing the internal software to crash. 2) Turn the printer OFF. Unplug the network (Ethernet) cable. Turn the printer back ON. 3) If the printer boots up normally to 'Ready', the hardware is fine. A PC on your network is stuck trying to send a corrupted file. 4) Go to every PC on the network, open the Print Queue, and cancel all stuck jobs. Then, plug the ethernet cable back in.",
    content: `<h2>Understanding Lexmark Error 900</h2>
<p>An <strong>Error 900</strong> is the Lexmark equivalent of a Windows "Blue Screen of Death". It means the firmware (the operating system running the printer) experienced a fatal exception and panicked.</p>

<h3>Isolating the Cause (Hardware vs Network)</h3>
<p>When a 900 error flashes, the first step is determining if the firmware itself is corrupted, or if it simply choked on a bad print job.</p>
<ul>
  <li>Unplug the printer from the network and reboot.</li>
  <li>If the 900 error still appears while disconnected from everything, the firmware on the flash drive is corrupted (or the logic board is dead). You must attempt an emergency firmware flash.</li>
  <li>If the printer boots fine when disconnected, the firmware is healthy. Someone in the office is trying to print a highly complex graphical PDF using the wrong driver (e.g., using a PCL driver for a PostScript document). Clear the print spoolers on all PCs.</li>
</ul>

<h2>Performing a P128 Firmware Update</h2>
<p>If Lexmark Support advises you to update to the "P128" (or similar) firmware level to fix a known bug:</p>
<ol>
  <li>Download the <code>.fls</code> firmware file from the Lexmark support site.</li>
  <li>Log into the printer's Embedded Web Server (type its IP address into your browser).</li>
  <li>Navigate to <strong>Settings &gt; Update Firmware</strong> (or Device &gt; Update Firmware).</li>
  <li>Click "Browse", select the <code>.fls</code> file, and click Submit.</li>
  <li><strong>CRITICAL:</strong> Do NOT turn off the printer for at least 15 minutes. The screen will flash, go black, and reboot several times. If you cut power during a flash, the printer will be permanently bricked.</li>
</ol>`
  }
];

async function main() {
  const brandSlug = 'lexmark';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 3 (Clusters E & F: Service Engine & Firmware) for brand: ${brand.name}`);

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
