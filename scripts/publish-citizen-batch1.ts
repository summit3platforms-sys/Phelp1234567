import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';
const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';
const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix Citizen Printer Cutter Lock & Auto Cutter Errors",
    slug: 'fix-citizen-printer-cutter-lock-auto-cutter-errors',
    seoTitle: "Fix Citizen Cutter Lock Stuck & Auto Cutter Errors",
    metaDescription: "Is your Citizen CT-S601 or CT-S310 flashing an error LED due to a stuck cutter? Learn how to manually unlock the auto cutter and clear guillotine blade jams.",
    excerpt: "When the guillotine blade on a Citizen receipt printer jams midway through a cut, it locks the top cover and triggers a flashing error LED. Here is how to fix it.",
    errorCode: 'Cutter Lock',
    tags: 'citizen printer cutter lock stuck, citizen ct-s601 error led flashing, citizen auto cutter not operating, citizen ct-s310 error light meaning, citizen printer error led colors explained',
    wordCount: 950,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: hardwareCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "To fix a Citizen printer Cutter Lock Error (Flashing Error LED): 1) If the auto-cutter jams on a thick receipt, the blade will stop halfway out, physically locking the top cover shut. DO NOT force the cover open. 2) Turn the printer OFF. 3) Push upward on the front panel (the faceplate with the Citizen logo) to remove it. 4) Behind the faceplate, you will see a small white or gray gear. Turn this gear manually with your thumb or a Phillips-head screwdriver until it stops. 5) This manually retracts the guillotine blade. You can now safely pop the top cover open and remove the jammed paper.",
    content: `<h2>Decoding Citizen Error LEDs</h2>
<p>Citizen POS printers (like the CT-S601 and CT-S310) communicate hardware faults via flashing LED patterns. If the <strong>ERROR</strong> LED is flashing rapidly (usually red or orange), the printer has halted to prevent motor damage.</p>
<ul>
  <li><strong>Flashing Error, Paper LED off:</strong> Usually indicates a cutter lock or print head overheat.</li>
  <li><strong>Flashing Error, Paper LED on:</strong> Out of paper or cover open.</li>
</ul>

<h2>The Auto Cutter Lockout</h2>
<p>The Citizen auto-cutter is a highly precise V-shaped guillotine blade. It is designed to cut thin thermal receipt paper. If a cashier prints a receipt over a folded piece of paper, a staple, or thick backing paper, the blade will embed itself in the material and the motor will stall.</p>
<p>When the motor stalls, it triggers a <strong>Cutter Lock</strong> error. Because the blade is extended through the paper path, a mechanical interlock prevents you from opening the top lid. You must remove the front faceplate and manually spin the cutter gear backward (as described above) to retract the blade. Once retracted, the lid will pop open easily.</p>`
  },
  {
    title: "Fix Citizen Paper Cover Open, Print Head Alarm & Lever A",
    slug: 'fix-citizen-paper-cover-open-print-head-alarm-lever',
    seoTitle: "Fix Citizen Paper Cover Open, Lever A & Print Head Alarm",
    metaDescription: "Does your Citizen CL-S621 printer have a 'Cover Open' or 'Print Head Open' alarm? Learn how to lock Lever A, fix cover sensors, and resume printing via memory switch.",
    excerpt: "Industrial Citizen printers use heavy-duty latching mechanisms. If Lever A isn't locked down completely, the printer will refuse to print.",
    errorCode: 'Cover Open',
    tags: 'citizen printer paper cover open error, citizen printer wont resume after cover open, citizen printer memory switch resume printing, citizen printer print head open alarm, citizen cls621 lever a unlock guide',
    wordCount: 1000,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: errorCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix a Citizen CL-S621 'Print Head Open' or 'Cover Open' Alarm: 1) Industrial Citizen printers use a massive blue latch called 'Lever A' to lock the heavy metal printhead down onto the paper. 2) If Lever A is not pushed down until it loudly clicks, the internal microswitch will not engage, and the printer will flash an error. 3) Push down firmly on the blue head-lock lever (Lever A) with the palm of your hand until it snaps into the locked position. 4) If the printer still won't resume, press the 'Pause' or 'Feed' button once to clear the error state and resume the print queue.",
    content: `<h2>Understanding Lever A on the CL-S Series</h2>
<p>On Citizen's industrial label printers (like the CL-S521 and CL-S621), simply closing the plastic outer shell is not enough. The internal metal chassis housing the printhead (often referred to as the clamshell) must be physically locked down.</p>
<p><strong>Lever A</strong> is the large, usually blue, handle. When loading new labels or ribbon, you push Lever A to pop the printhead up. After threading the labels, you must slam it back down. If it is only 99% closed, the optical sensor detects the gap and throws a <strong>Print Head Open Alarm</strong>.</p>

<h2>Won't Resume After Cover Open</h2>
<p>If you ran out of paper, opened the cover, inserted a new roll, locked the cover, but the printer just sits there doing nothing:</p>
<ul>
  <li><strong>Manual Resume:</strong> By default, Citizen printers pause when the cover is opened during a job. You must press the <strong>Pause</strong> button on the control panel to tell the printer you are finished loading paper.</li>
  <li><strong>Memory Switch Configuration:</strong> If you want the printer to automatically resume printing the exact second the cover is closed (without pressing a button), you must alter the <strong>Memory Switch</strong> settings. Hold the MODE button while powering on the printer to enter the setup menu, navigate to "System Setup," and change "Auto Resume" to ON.</li>
</ul>`
  },
  {
    title: "Fix Citizen Printer Communication Errors & USB Not Detected",
    slug: 'fix-citizen-printer-communication-errors-usb-not-detected',
    seoTitle: "Fix Citizen Communication Errors & USB Not Detected",
    metaDescription: "Is your Citizen CL-S521ii failing to communicate with your PC? Learn how to fix 'USB not detected', driver installation failures, and Device Manager errors.",
    excerpt: "If Windows Device Manager refuses to recognize your Citizen printer via USB, you likely have a damaged cable, a port conflict, or a missing driver.",
    errorCode: 'Communication Error',
    tags: 'citizen cl-s521ii communication error, citizen printer cannot connect to pr, citizen printer not appearing device manager, citizen printer usb not detected, citizen printer driver not installing',
    wordCount: 1050,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: softwareCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "To fix a Citizen printer not appearing in Device Manager (USB Not Detected): 1) Do not use a USB hub, docking station, or USB extension cable. Plug the printer directly into the back of the desktop motherboard (USB 2.0 port if possible). 2) Open Windows Device Manager. 3) Look for 'Other Devices' or 'Unknown Device' with a yellow exclamation mark. 4) If found, right-click and select 'Uninstall device'. Unplug the printer. 5) Run the official Citizen Windows Driver Installer executable FIRST. Only plug the USB cable back in when the installer prompts you to do so.",
    content: `<h2>Citizen Printer Cannot Connect to PC</h2>
<p>A "Communication Error" when trying to print to a Citizen CL-S521ii usually stems from the Windows Print Spooler sending data to the wrong virtual USB port.</p>

<h3>The Virtual USB Port Mismatch</h3>
<p>If you unplugged your Citizen printer and plugged it into a different USB port on your computer, Windows often creates a new virtual port (e.g., USB002 instead of USB001).</p>
<ol>
  <li>Go to Windows Settings &gt; Devices &gt; Printers &amp; Scanners.</li>
  <li>Select your Citizen printer and click "Printer properties".</li>
  <li>Click the <strong>Ports</strong> tab.</li>
  <li>Look at the port that is currently checked. If it says "LPT1" or "COM1", it is wrong. Scroll down and check the highest numbered "USBxxx (Virtual printer port for USB)".</li>
  <li>Click Apply and print a test page.</li>
</ol>

<h2>Driver Not Installing</h2>
<p>If the Seagull Scientific or Citizen driver package hangs during installation:</p>
<ul>
  <li><strong>Pending Reboot:</strong> Windows may have a pending core update that is locking the spooler subsystem. Reboot your PC before attempting the installation.</li>
  <li><strong>Corrupted Queue:</strong> If there is a stuck print job in the queue from a previous failed installation attempt, the new driver cannot overwrite the old one. Stop the Print Spooler service, clear the <code>C:\\Windows\\System32\\spool\\PRINTERS</code> folder, and try again.</li>
</ul>`
  },
  {
    title: "Citizen Printer Network Reset, Static IP & Configuration",
    slug: 'citizen-printer-network-reset-static-ip-configuration',
    seoTitle: "Citizen Printer Network Reset & Static IP Setup Guide",
    metaDescription: "Learn how to configure a Citizen CL-S621 network card, assign a Static IP address, and perform a network reset to fix IP conflicts on your POS system.",
    excerpt: "If your Citizen receipt or label printer stops talking to your network, you likely need to reset the Ethernet card and assign a Static IP.",
    errorCode: null,
    tags: 'citizen cl-s621 configuration issues, citizen printer network reset guide, citizen printer static ip setup',
    wordCount: 850,
    difficultyLevel: 'Advanced',
    timeToFix: '15 minutes',
    categoryId: setupCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "To assign a Static IP to a Citizen Printer: 1) Connect the printer directly to your router via Ethernet cable. 2) Press and hold the 'Feed' button while turning the printer ON to print a self-test page, which displays its current DHCP IP address. 3) Type that IP address into a web browser on a PC connected to the same network. 4) When the Citizen Web Interface loads, navigate to the Network or TCP/IP configuration page. 5) Change the IP Assignment method from DHCP to 'Static' or 'Manual'. 6) Enter your desired IP address, Subnet Mask, and Gateway. Click Save and reboot the printer.",
    content: `<h2>Network Reset Guide</h2>
<p>If you purchased a used Citizen printer, or moved it from a different office building, it is likely holding onto an old network IP address that does not match your current router. You must factory reset the network card.</p>
<ol>
  <li>Ensure the printer is turned ON and in a ready state.</li>
  <li>On the back of the printer, locate the Ethernet (LAN) module. Next to the ethernet port, there is a tiny recessed button (often labeled "Reset" or "Init").</li>
  <li>Use a paperclip to press and hold this button for exactly <strong>5 seconds</strong>, then release.</li>
  <li>The network card will reboot, wipe its memory, and request a new IP address via DHCP from your router. Wait 30 seconds, then print a self-test page to see the new IP.</li>
</ol>

<h2>Configuration Issues & The Utility Tool</h2>
<p>If you are struggling to configure the printer via the Web Interface, you can use the <strong>Citizen Printer Utility</strong> software on a Windows PC. Connect the printer via USB temporarily. Open the Utility, navigate to the "Interface" or "Network" tab, and push the Static IP settings directly to the printer over the USB cable. Once saved, disconnect the USB and plug the Ethernet cable back in.</p>`
  }
];

async function main() {
  const brandSlug = 'citizen-systems';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  
  if (!brand) {
    brand = await prisma.brand.create({
      data: {
        name: 'Citizen Systems',
        slug: brandSlug,
        description: 'Citizen Systems produces high-performance industrial barcode label printers, POS receipt printers, and mobile printing solutions.'
      }
    });
  }

  console.log(`🚀 Publishing Batch 1 (Clusters A & B: Hardware Errors & Networking) for brand: ${brand.name}`);

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
