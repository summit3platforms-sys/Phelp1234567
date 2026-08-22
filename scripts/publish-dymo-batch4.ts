import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';
const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';
const maintenanceCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';
const connectivityCategory = 'c3a92d93-fcbb-439c-a11e-80cde3d2a5ce';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "How to Safely Remove a Label Jam in a DYMO LabelWriter",
    slug: 'dymo-labelwriter-label-jam-removal-clean-sensor',
    seoTitle: "Fix DYMO Label Jam (Reverse Feed Button & Sensor Clean)",
    metaDescription: "Is a sticky label jammed inside your DYMO LabelWriter? Learn how to safely use the reverse feed button, remove the front cover, and clean the optical sensor.",
    excerpt: "If a label peels off the backing and wraps itself around the black rubber roller, your printer will completely lock up. Do not pry it with a knife.",
    errorCode: null,
    tags: 'DYMO, Label Jam, Reverse Feed Button, Clean Sensor, Stuck Label, Roller',
    wordCount: 850,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: maintenanceCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    featuredSnippet: "To fix a label jam in a DYMO LabelWriter: 1) First, try the reverse feed button. Look at the front face of the printer; there is a small blue or black button with an arrow pointing backward. Press it to back the label out. 2) If the label is wrapped around the rubber roller, UNPLUG the printer. 3) Take a small Phillips-head screwdriver and remove the two screws on the front plastic faceplate. 4) Pop the faceplate off. 5) Use tweezers and a cotton swab soaked in rubbing alcohol (or 'Goo Gone') to slowly peel the sticky label off the roller without cutting the rubber.",
    content: `<h2>The Danger of Label Jams</h2>
<p>Because DYMO printers use heat and friction to pull labels through a very tight paper path, a slightly curled label can easily peel off its paper backing and wrap itself completely around the black rubber platen roller. When this happens, the motor stalls, and the printer freezes.</p>
<p><strong>Warning:</strong> Never stick a pocket knife, exacto blade, or scissors into the printer to cut the jammed label. The ceramic print head and rubber roller are incredibly fragile. One scratch will permanently destroy the print head, leaving a white line on every future label.</p>

<h2>Step 1: The Reverse Feed Button</h2>
<p>Many users don't know this button exists. On the front of the LabelWriter (usually near the blue flashing status light or the main feed button), there is a secondary, smaller button with an arrow pointing backward. This is the <strong>Reverse Feed</strong> button.</p>
<p>Cut the label roll from the back so it is free. Press and hold the reverse feed button. If the label is just slightly stuck, the motor will push it backward and out of the top slot.</p>

<h2>Step 2: Manual Disassembly</h2>
<p>If the label has wrapped around the roller multiple times, the motor cannot reverse it. You must open the casing.</p>
<ol>
    <li>Unplug the power and USB cables.</li>
    <li>Look at the front face of the printer (where the labels come out). There are usually two small Phillips screws located near the bottom corners. Remove them.</li>
    <li>Gently pull the front faceplate forward and off. You now have full access to the black rubber roller.</li>
    <li>Use tweezers to grab the corner of the jammed label. <strong>Do not pull hard.</strong> Dip a Q-tip in 99% isopropyl alcohol or adhesive remover and rub the label until the glue dissolves. Peel it off slowly.</li>
    <li>While the printer is open, blast the small optical sensor hole on the left side with compressed air. Reattach the faceplate.</li>
</ol>`
  },
  {
    title: "How to Calibrate a DYMO LabelWriter (Fix Feed & Size Errors)",
    slug: 'dymo-labelwriter-calibration-feed-size-mismatch',
    seoTitle: "DYMO LabelWriter Calibration (Fix Continuous Feed & Misaligned Prints)",
    metaDescription: "Is your DYMO printer feeding continuously, skipping labels, or printing off-center? Learn how to calibrate the optical sensor and fix label size mismatches.",
    excerpt: "If your DYMO is printing text across the gaps between labels, or spitting out five blank labels before stopping, the internal calibration is out of sync.",
    errorCode: null,
    tags: 'DYMO, Calibration, Continuous Feed, Size Mismatch, Misaligned Print, Skipping Labels',
    wordCount: 800,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: setupCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredSnippet: "To calibrate a DYMO LabelWriter: 1) Ensure the label roll is pushed tightly against the LEFT side of the spool so it aligns with the optical sensor. 2) Feed the paper into the slot until the printer grabs it. 3) Press the blue 'Form Feed' button on the front of the printer ONCE. 4) The printer will advance the roll until it detects the gap, and stop perfectly on the tear line. If it feeds continuously, the sensor is dirty and needs compressed air. 5) In your software (like DYMO Connect), ensure the selected label template size matches the physical roll.",
    content: `<h2>What Causes Calibration Loss?</h2>
<p>Calibration is simply the printer's ability to know exactly where one label ends and the next begins. Older DYMO LabelWriters (450 and 4XL) do not know what size labels are loaded; they just look for the physical gap between them.</p>

<h2>Hardware Calibration (The Feed Button)</h2>
<p>If you insert a new roll of labels and the printer stops halfway through a label (so you have to tear it in the middle of a sticker), it is not calibrated.</p>
<ol>
    <li>Open the lid and verify the black retaining disc on the right side of the spool is pushed flush against the paper roll. If the roll can slide left and right, calibration is impossible.</li>
    <li>Press the blue button on the front of the printer exactly one time.</li>
    <li>The printer should feed one label and stop with the gap perfectly aligned with the plastic tear teeth. If it does, hardware calibration is complete.</li>
</ol>

<h2>Software Calibration (Fixing Misaligned Prints)</h2>
<p>If the hardware is calibrated (stopping perfectly on the gaps), but when you print from your computer, the text prints too high, too low, or bleeds onto the second label, the software is sending the wrong dimensions.</p>
<ul>
    <li>Open <strong>DYMO Connect</strong> or <strong>DLS8</strong>.</li>
    <li>Look at the label part number (e.g., 30252, 30334, 30256) printed on the inside of the cardboard core of your label roll.</li>
    <li>In the software, click the "Labels" tab and select that exact part number. <strong>Do not guess the size.</strong> If you select 1-1/8" x 3-1/2" but load 1" x 2-5/8" labels, the text will print entirely misaligned.</li>
    <li>If you are printing from a third-party app (like a web browser), you must go to the Windows Print Preferences and manually select the correct paper size in the advanced printer settings before clicking Print.</li>
</ul>`
  },
  {
    title: "Fix DYMO Printer Not Showing Up on Mac (Sonoma & Ventura)",
    slug: 'dymo-printer-not-showing-up-mac-os-fix',
    seoTitle: "Fix DYMO Printer Not Showing Up on Mac (Driver & CUPS Setup)",
    metaDescription: "Is your DYMO printer missing from your Mac's printer list? Learn how to fix macOS Sonoma/Ventura compatibility, bypass security blocks, and install CUPS drivers.",
    excerpt: "Apple's relentless macOS updates frequently break legacy USB printer drivers. If your DYMO is invisible on your Mac, here is how to force macOS to see it.",
    errorCode: null,
    tags: 'DYMO, Mac, macOS, Not Showing Up, Offline, Sonoma, Ventura, CUPS',
    wordCount: 900,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: connectivityCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "To fix a DYMO printer not showing up on a Mac: 1) Go to System Settings > Privacy & Security, scroll down, and see if Apple blocked the DYMO software installation. Click 'Open Anyway'. 2) Unplug the USB cable. 3) Download and install 'DYMO Label Software v8.7.5' (for older 450 models) or 'DYMO Connect v1.4.4+' (for 550 models) from the official DYMO site. 4) Go to System Settings > Printers & Scanners. Click 'Add Printer'. 5) Plug the USB cable directly into the Mac (avoid cheap USB-C hubs). The DYMO should appear in the list.",
    content: `<h2>The macOS Driver Blacklist</h2>
<p>When you upgrade your Mac to a new operating system (like Ventura, Sonoma, or Sequoia), Apple enforces strict new security protocols. Often, Apple silently flags the older DYMO background services as "incompatible" and disables them, causing the printer to vanish from your Printers &amp; Scanners list.</p>

<h2>Fix 1: Bypass the Security Block</h2>
<p>If you just installed the DYMO software, but the printer still isn't showing up when you plug it in, macOS likely blocked the USB driver (kext) from loading.</p>
<ol>
    <li>Open the Apple Menu and select <strong>System Settings</strong>.</li>
    <li>Navigate to <strong>Privacy &amp; Security</strong>.</li>
    <li>Scroll down to the Security section. Look for a message that says, <em>"System software from developer Sanford, L.P. was blocked from loading."</em></li>
    <li>Click <strong>Allow</strong> (you will need to enter your Mac password).</li>
    <li>Restart your Mac and plug the printer back in.</li>
</ol>

<h2>Fix 2: The USB-C Dongle Issue</h2>
<p>Modern MacBooks only have USB-C ports, requiring users to use dongles or hubs to connect the traditional USB-B to USB-A cable that comes with the DYMO printer.</p>
<p>Cheap, unpowered USB-C hubs frequently drop the data connection. If the printer is randomly disconnecting, bypass the hub entirely by purchasing a direct <strong>USB-C to USB-B printer cable</strong> from Amazon. Plug it directly from the Mac into the back of the DYMO. This solves 90% of connectivity drops.</p>

<h2>Fix 3: Manually Adding the Printer (CUPS)</h2>
<p>If the printer is plugged in but missing from the list:</p>
<ul>
    <li>Go to <strong>System Settings > Printers &amp; Scanners</strong>.</li>
    <li>Click <strong>Add Printer, Scanner, or Fax</strong>.</li>
    <li>Click the <strong>Default</strong> tab (the printer icon).</li>
    <li>If the DYMO appears, click it. At the bottom, next to "Use:", do not leave it on "Auto Select". Click the dropdown, choose <strong>Select Software...</strong>, and search for your specific DYMO model (e.g., DYMO LabelWriter 450) to force the Mac to use the correct driver.</li>
</ul>`
  },
  {
    title: "Fix DYMO Web Service: Not Printing from Shopify, Amazon & eBay",
    slug: 'fix-dymo-web-service-shopify-amazon-ebay-chrome',
    seoTitle: "Fix DYMO Not Printing from Shopify, Amazon, eBay (Chrome Plugin)",
    metaDescription: "Cannot print shipping labels from Shopify, Amazon Seller Central, eBay, or PayPal to your DYMO? Learn how to fix the DYMO Web Service and Chrome plugin.",
    excerpt: "E-commerce platforms rely on the background DYMO Web Service to print directly from your browser. When it crashes, your entire shipping operation grinds to a halt.",
    errorCode: null,
    tags: 'DYMO, Shopify, Amazon, eBay, PayPal, Web Service, Chrome Plugin, Not Printing',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: softwareCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "To fix DYMO not printing from Shopify, eBay, or Amazon: 1) Check your system tray (by the clock) for the small blue DYMO icon. This is the 'DYMO Web Service' required for browser printing. 2) If it is missing, search your computer for 'DYMO Web Service' and open it. 3) Right-click the icon and select 'Diagnose'. It should say 'DYMO Web Service is running on port 41951'. 4) In your browser (Chrome), verify the label size in the print dialog exactly matches your loaded labels (usually 4x6 for shipping).",
    content: `<h2>The Middleman: DYMO Web Service</h2>
<p>When you click "Print Label" inside Shopify, Amazon Seller Central, eBay, or PayPal Shipping, Google Chrome does not know how to speak directly to the DYMO hardware. It sends the command to a tiny local server running in the background of your computer called the <strong>DYMO Web Service</strong>, which then translates the command to the printer.</p>
<p>If you hit print on Shopify and nothing happens, the Web Service has either crashed, has been blocked by your antivirus, or has an expired SSL certificate.</p>

<h2>Fix 1: Restarting the Web Service</h2>
<p>This fixes 80% of e-commerce printing failures.</p>
<ol>
    <li>Look in your Windows system tray (bottom right, near the clock) or your Mac menu bar (top right). Look for the blue DYMO logo.</li>
    <li>If you see it, right-click it and select <strong>Exit</strong>.</li>
    <li>Open your Start menu (or Spotlight on Mac), search for <strong>DYMO Connect Web Service</strong>, and open it to restart it.</li>
    <li>Right-click the icon and click <strong>Diagnose</strong>. A webpage will open saying "Congratulations! Dymo Web Service is running on port 41951."</li>
    <li>Go back to Shopify/eBay, refresh the page, and try printing again.</li>
</ol>

<h2>Fix 2: Fixing Chrome / Safari Certificate Blocking</h2>
<p>If you clicked "Diagnose" and Chrome threw a massive red warning saying <em>"Your connection is not private"</em> instead of the Congratulations message, Chrome is blocking the web service due to an expired internal security certificate.</p>
<ul>
    <li>On the red warning screen, click the <strong>Advanced</strong> button at the bottom.</li>
    <li>Click the link that says <strong>Proceed to 127.0.0.1 (unsafe)</strong>.</li>
    <li>The Congratulations page will load. By forcing Chrome to load it, you have white-listed the connection. Shopify and Amazon will now be able to communicate with the printer again.</li>
    <li><em>Note: To permanently fix this, you must download the newest version of DYMO Connect from their website, which contains updated certificates.</em></li>
</ul>

<h2>Fix 3: PDF Scaling Issues (Amazon & eBay)</h2>
<p>If the printer feeds the label, but the barcode is shrunk down to the size of a postage stamp in the corner of a 4x6 label, the browser is shrinking the PDF.</p>
<p>When the Chrome print dialog box opens, click <strong>More Settings</strong>. Change the <strong>Scale</strong> setting from "Fit to Printable Area" to <strong>Custom: 100%</strong>. Ensure the Paper Size is set to exactly <strong>4 in x 6 in</strong> (or 1744907). Print the label.</p>`
  },
  {
    title: "DYMO 550 RFID DRM vs Third-Party Labels (Compatibility Guide)",
    slug: 'dymo-550-rfid-drm-third-party-labels-compatibility',
    seoTitle: "DYMO 550 RFID DRM & Third-Party Labels Compatibility",
    metaDescription: "Does the DYMO LabelWriter 550 accept third-party or generic labels? Learn everything about DYMO's new RFID DRM lockout and how to tell which printers allow cheap labels.",
    excerpt: "If you buy generic labels on Amazon for your new DYMO 550, you are in for a rude awakening. The printer will completely lock you out until you insert an authentic roll.",
    errorCode: 'Labels Not Detected',
    tags: 'DYMO, 550, 5XL, RFID, DRM, Third-Party Labels, Compatibility, Generic',
    wordCount: 1000,
    difficultyLevel: 'Beginner',
    timeToFix: 'N/A',
    categoryId: softwareCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "Can you use third-party labels in a DYMO printer? If you have an older DYMO LabelWriter 450, 4XL, or Twin Turbo, YES—you can use any cheap third-party or generic labels you want. However, if you have the newer LabelWriter 550, 550 Turbo, or 5XL, NO—you cannot use third-party labels. The 500 series uses an RFID chip embedded in the cardboard core of authentic DYMO labels to verify authenticity. If the chip is missing, the printer will display 'Labels Not Detected' and refuse to print.",
    content: `<h2>The Introduction of DYMO DRM</h2>
<p>For decades, small businesses loved DYMO printers because, although the printer cost $150, you could buy massive rolls of generic thermal labels on Amazon for $5. DYMO made very little money on the supplies.</p>
<p>To change this, DYMO introduced the <strong>LabelWriter 550, 550 Turbo, and 5XL</strong>. These printers look almost identical to the older 450 series, but they contain a hidden, highly controversial feature: <strong>RFID Digital Rights Management (DRM).</strong></p>

<h2>How the 550 RFID System Works</h2>
<p>Inside the right spool mount of a 550 printer is a small RFID antenna. When you load a roll of genuine DYMO labels, the printer reads a microchip embedded directly inside the cardboard core of the roll.</p>
<p>This chip tells the DYMO Connect software exactly what size label is loaded (e.g., 1" x 2-5/8" Address), preventing you from accidentally printing a massive shipping label onto tiny barcode stickers. It also tells the software exactly how many labels are left on the roll.</p>

<h2>The Lockout (Third-Party Labels)</h2>
<p>If you purchase a roll of third-party, generic, or off-brand labels and insert them into a 550 or 5XL, the printer will scan for the RFID chip. <strong>When it fails to find the chip, the blue light will flash rapidly, the software will say "Labels Not Detected," and the printer will completely refuse to print.</strong></p>
<p>You cannot bypass this by taping an old chip to the side of the machine. The chip tracks the exact number of labels printed; once the roll reaches zero, that specific chip is permanently deactivated.</p>

<h2>Which Printer Should You Buy?</h2>
<ul>
    <li><strong>If you already own a large supply of generic labels:</strong> Do not buy a 550. Look for a refurbished <strong>DYMO LabelWriter 450</strong> or <strong>4XL</strong> on eBay. They have optical sensors and accept any label brand.</li>
    <li><strong>If you only print a few labels a month:</strong> The 550 is a great printer, and the automatic label recognition makes it incredibly user-friendly for beginners. Just be prepared to pay a premium for genuine DYMO branded labels.</li>
</ul>`
  },
  {
    title: "DYMO LabelWriter LAN & Network Setup Guide",
    slug: 'dymo-labelwriter-network-setup-lan-wi-fi',
    seoTitle: "DYMO LabelWriter Network Setup (LAN & Print Server Guide)",
    metaDescription: "Learn how to set up your DYMO LabelWriter on a network. A complete guide to configuring the Ethernet port on the 550 Turbo, 5XL, and older Wireless models.",
    excerpt: "Sharing a single DYMO printer across an entire office is highly efficient, provided you bypass Windows printer sharing and connect it directly to the network.",
    errorCode: null,
    tags: 'DYMO, Network Setup, LAN, Ethernet, 550 Turbo, 5XL, Print Server, Wi-Fi',
    wordCount: 850,
    difficultyLevel: 'Advanced',
    timeToFix: '15 minutes',
    categoryId: connectivityCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "To set up a DYMO 550 Turbo or 5XL on a network: 1) Plug an Ethernet (LAN) cable from the back of the DYMO directly into your network switch or router. 2) Turn the printer on. 3) Open the DYMO Connect software on any computer connected to that same network. 4) Go to File > Add Network Printer. 5) The software will scan the local network, locate the DYMO's IP address, and automatically add it. You do not need to install complex Windows Print Server drivers.",
    content: `<h2>The Advantage of Network Printing</h2>
<p>In the past, sharing a DYMO LabelWriter 450 meant plugging it via USB into a "Host" PC, and using Windows Printer Sharing to allow other computers to print to it. If the host PC went to sleep, the entire office lost access to the printer.</p>
<p>The <strong>LabelWriter 550 Turbo</strong> and <strong>5XL</strong> solve this by including a built-in Ethernet (RJ45) port, turning the printer into a standalone print server on your network.</p>

<h2>Step 1: Physical LAN Connection</h2>
<ol>
    <li>Do not plug the USB cable in.</li>
    <li>Plug a standard Ethernet cable into the back of the 550 Turbo/5XL and plug the other end into a wall jack or directly into your network switch/router.</li>
    <li>Plug in the power adapter and wait 60 seconds for the printer to pull an IP address from your router's DHCP server.</li>
</ol>

<h2>Step 2: Adding the Printer in DYMO Connect</h2>
<p>Unlike standard office laser printers, you do not need to mess with Windows IP configurations.</p>
<ul>
    <li>Open the <strong>DYMO Connect</strong> software on your PC or Mac. (Ensure the computer is on the same network subnet as the printer).</li>
    <li>Click <strong>File</strong> > <strong>Add Network Printer</strong>.</li>
    <li>The software will broadcast a discovery packet across your network. Within a few seconds, the DYMO 550 Turbo will appear in the list along with its IP address.</li>
    <li>Select the printer and click Add. It is now ready to use from that computer. Repeat this process on any other PC in the office.</li>
</ul>

<h2>Alternative: The DYMO LabelWriter Print Server</h2>
<p>If you have an older USB-only 450 or 4XL, you can buy a small external device called the <strong>DYMO Print Server</strong>. You plug the 450 into the Print Server via USB, and plug the Print Server into your router via Ethernet. You then use the DYMO Connect software to discover the Print Server on the network, essentially upgrading your old 450 to full network capabilities without replacing the printer.</p>`
  }
];

async function main() {
  const brand = await prisma.brand.findUnique({ where: { slug: 'dymo' } });
  if (!brand) throw new Error('DYMO brand not found. Run setup script first.');

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
