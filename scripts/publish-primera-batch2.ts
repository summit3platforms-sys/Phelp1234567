import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const paperCategory = '9a42c554-2b4f-47f8-887e-5996fb83cbad';
const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';
const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix Primera Label Vertically Offset, Skipping & Size Not Recognized",
    slug: 'primera-label-vertically-offset-skipping-size-not-recognized',
    seoTitle: "Fix Primera Label Vertically Offset & Skipping Labels",
    metaDescription: "Are your Primera labels printing off-center, skipping blank labels, or showing 'size not recognized'? Learn how to fix Top of Form offset and sensor calibration.",
    excerpt: "When the image drifts off the edge of the label or the printer feeds 3 blank labels before printing one, the media sensor is failing to find the top-of-form gap.",
    errorCode: 'Label Skipping / Offset',
    tags: 'Primera, LX900 Label Vertically Offset, Label Printer Skipping Labels, Label Size Not Recognized, Top of Form, TOF Offset, Sensor Calibration',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: paperCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "To fix a Primera printer that is skipping labels or printing vertically offset: 1) Check Page Size: Ensure the page size in your design software (e.g., BarTender or Illustrator) EXACTLY matches the physical label size (e.g., 4.00 x 3.00 inches) and matches the driver preferences. 2) Adjust TOF Offset: If the print is consistently drifting 2mm too high or too low, open PTStatus > Printer Settings > Advanced > adjust the 'Top of Form (TOF) Offset' slightly to move the image up or down. 3) Move the Sensor: For circular or custom-shaped labels, you must slide the movable media sensor inside the printer so it scans the deepest part of the die-cut gap.",
    content: `<h2>Understanding Top-Of-Form (TOF) Calibration</h2>
<p>Unlike continuous receipt printers, Primera LX color label printers print on pre-cut (die-cut) sticker rolls. The printer must precisely detect the 1/8-inch gap between each label. When this fails, the printer will either print halfway off the label (vertical offset) or panic and spit out multiple blank labels (skipping).</p>

<h2>Fix 1: The Triple Size Match Rule</h2>
<p>If you get a "Label Size Not Recognized" error, it means the printer's optical sensor measured a physical label of 4 inches, but the Windows Spooler sent a document of 6 inches. The software refuses to print to prevent spraying ink onto the bare rubber roller.</p>
<ol>
  <li><strong>The Design Software:</strong> Check your artboard in Adobe Illustrator, BarTender, or NiceLabel. It must be set exactly to the label dimensions (e.g., W: 3", H: 4").</li>
  <li><strong>The Windows Driver:</strong> Go to Control Panel &gt; Devices and Printers &gt; right-click the Primera &gt; Printing Preferences. Ensure the paper size here is also set to 3x4.</li>
  <li><strong>The Physical Media:</strong> Use a ruler. If your label is 3.125" instead of 3", you must input the exact decimal into the custom driver settings.</li>
</ol>

<h2>Fix 2: Adjusting Vertical Offset</h2>
<p>If the label size is correct, but the entire image is shifted uniformly 1/4-inch too high or too low:</p>
<ul>
  <li>Open <strong>PTStatus</strong>.</li>
  <li>Navigate to the <strong>Printer Settings</strong> or <strong>Advanced</strong> tab.</li>
  <li>Locate the <strong>Top of Form (TOF) Offset</strong> or <strong>Vertical Offset</strong> setting.</li>
  <li>Enter a positive value (e.g., <code>+10</code>) to move the print down, or a negative value (e.g., <code>-10</code>) to move the print up. Print a single test label, adjust again, and save the settings.</li>
</ul>

<h2>Fix 3: Sliding the Moveable Media Sensor</h2>
<p>If you are printing on circular labels, oval labels, or labels with a notch, the default sensor position might be looking at the side of the circle rather than the top gap. Open the printer cover. Look under the paper path for a small sliding tab (often blue or black). Slide this sensor so it aligns exactly with the deepest part of the die-cut gap.</p>`
  },
  {
    title: "Primera Die Cut vs Black Mark Sensing & Media Sensor Dust Fix",
    slug: 'primera-die-cut-vs-black-mark-sensing-media-sensor-dust-fix',
    seoTitle: "Primera Die Cut vs Black Mark Sensing & Sensor Dust Fix",
    metaDescription: "Learn the difference between Die-Cut and Black Mark sensing on Primera label printers. Fix paper feed errors caused by paper dust blocking the optical sensor.",
    excerpt: "Choosing the wrong media sensing type in the Primera driver will cause the printer to blindly feed an entire roll of labels. Here is how to clean the sensor and configure tracking.",
    errorCode: 'Wont Feed / Out of Paper',
    tags: 'Primera, Die Cut vs Black Mark Sensing, Label Printer Wont Feed Stock, Media Sensor Dust, Reflective Sensor, Transmissive Sensor',
    wordCount: 1050,
    difficultyLevel: 'Intermediate',
    timeToFix: '5 minutes',
    categoryId: paperCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix a Primera printer that won't feed stock or runs continuously: 1) Clean the Sensor: Paper dust coats the optical sensor over time, blinding it. Use a can of compressed air to blast out the sensor channel located under the paper path. 2) Set Tracking Mode: If your labels are on a standard waxy backing with gaps between them, go to Printing Preferences > Sensor Type > select 'Die-Cut' (Transmissive). 3) If your labels are clear/transparent, or have a solid black line printed on the back of the liner, you MUST select 'Reflective' (Black Mark) sensing. Transparent labels will not work with Die-Cut sensing.",
    content: `<h2>Why the Printer Won't Feed (Or Feeds Non-Stop)</h2>
<p>If you load a fresh roll of labels, press the feed button, and the printer either refuses to pull the stock in, or it spins wildly pulling 10 feet of blank labels onto the floor, the optical media sensor has failed to establish a baseline.</p>

<h2>Fix 1: Clearing Media Sensor Dust</h2>
<p>Primera printers generate high-speed friction against paper backing, creating microscopic paper dust. Over time, this dust accumulates on the clear plastic lens of the optical sensor.</p>
<ol>
  <li>Power off the printer and remove the label roll.</li>
  <li>Locate the media sensor array (usually a small sliding tab located under the paper feed path).</li>
  <li>Use a can of compressed air (keep it perfectly upright so it doesn't spray liquid freezing propellant) to blow out the sensor channel.</li>
  <li>If the dust is caked on, dampen a cotton swab with a tiny drop of rubbing alcohol and gently wipe the sensor eye.</li>
</ol>

<h2>Fix 2: Die-Cut (Transmissive) vs. Black Mark (Reflective)</h2>
<p>The Primera driver gives you a choice of how the sensor looks for the next label. Selecting the wrong one guarantees a feed error.</p>

<h3>Die-Cut (Transmissive / Gap)</h3>
<ul>
  <li><strong>How it works:</strong> The printer shines a light <em>through</em> the paper. It knows a label has ended when the light hits the 1/8-inch gap (which is just thin backing paper) and suddenly gets brighter.</li>
  <li><strong>Use for:</strong> Standard opaque paper, gloss, or matte labels.</li>
  <li><strong>Fails on:</strong> Clear/transparent labels (the light shines straight through the label and the gap equally).</li>
</ul>

<h3>Black Mark (Reflective)</h3>
<ul>
  <li><strong>How it works:</strong> The printer shines a light and waits for it to bounce back. It looks for a solid black timing mark printed on the back of the label liner to absorb the light.</li>
  <li><strong>Use for:</strong> Clear/transparent labels, foil labels, or heavily pre-printed custom stocks. <em>Note: Your label supplier must specifically manufacture the roll with black timing marks on the back.</em></li>
</ul>`
  },
  {
    title: "Fix Primera Label Jam & Label Cut But Not Printed Error",
    slug: 'primera-label-jam-label-cut-not-printed-error',
    seoTitle: "Fix Primera Label Jam & Label Cut But Not Printed",
    metaDescription: "Is your Primera printer jamming constantly, or is the built-in cutter firing before the label is printed? Learn how to clear jams and configure the cutter driver.",
    excerpt: "Paper jams in the LX series are usually caused by adhesive buildup on the platen roller, while premature cutting is a simple driver configuration error.",
    errorCode: 'Paper Jam',
    tags: 'Primera, Label Printer Jam Fix, Label Cut But Not Printed, Pizza Wheels, Cutter Settings, Adhesive Buildup',
    wordCount: 1050,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: hardwareCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "To fix Primera label jams and cutter errors: 1) Clear the Jam: Turn the printer off. Gently pull the jammed paper backward out of the feed slot. NEVER pull it forward aggressively, as this strips the plastic gears. 2) Clean the Roller: Use an alcohol swab to clean sticky label adhesive off the thick black rubber platen roller and the spiked 'pizza wheel' output rollers. 3) Fix Premature Cutting: If the printer cuts a blank label before printing, open Printing Preferences. Change the Cutter setting from 'Cut after every label' to 'Cut at end of job', or disable it entirely if using a rewinder.",
    content: `<h2>Clearing and Preventing Primera Label Jams</h2>
<p>Because Primera printers use wet inkjet technology, the paper path utilizes specialized "pizza wheel" spiked rollers to pull the wet label out without smudging the ink. If a label peels up inside the printer, it creates a disastrous jam.</p>

<h3>How to Safely Remove a Jam</h3>
<ol>
  <li><strong>Turn the power off immediately.</strong> Continuing to run the motor against a jammed label will strip the nylon drive gears.</li>
  <li>Open the top cover and remove the label supply roll.</li>
  <li>Gently pull the paper <em>backward</em> toward the supply spindle. Do not yank it forward through the front exit slot, as you risk damaging the fragile pizza wheels and the cutter blade.</li>
  <li>If the label is wrapped around the thick black rubber platen roller, use tweezers to carefully peel it away. <strong>Never use a knife or razor blade</strong> to cut it off; slicing the rubber roller will permanently ruin the printer.</li>
</ol>

<h3>Preventing Future Jams</h3>
<p>Jams are almost always caused by adhesive. If a label was previously peeled off inside the machine, it left sticky glue on the rollers. Every subsequent label will catch on this glue. You must aggressively clean all internal rollers with 99% isopropyl alcohol until they are completely smooth and free of tackiness.</p>

<h2>Fixing the "Cut But Not Printed" Error</h2>
<p>Many Primera models feature a built-in guillotine or rotary cutter. If the printer feeds a blank label, chops it off, and then refuses to print the image, the driver logic is inverted.</p>
<ul>
  <li>Open Windows <strong>Printers &amp; Scanners &gt; Printing Preferences</strong>.</li>
  <li>Navigate to the <strong>Cutter Options</strong> tab.</li>
  <li>If you are printing a batch of 100 labels, ensure the setting is <strong>Cut at end of job</strong> or <strong>Do not cut</strong>.</li>
  <li>If the setting is "Cut after every label" and the label length in the software is shorter than the physical distance from the printhead to the cutter blade, the printer will advance the label to cut it, thereby missing the print zone entirely.</li>
</ul>`
  },
  {
    title: "Primera Windows 11 Driver, Logo Testing & USB Communication Fixes",
    slug: 'primera-windows-11-driver-logo-testing-usb-communication',
    seoTitle: "Primera Windows 11 Driver & USB Communication Fix",
    metaDescription: "Trouble installing Primera printer drivers on Windows 11? Fix 'Not passing Windows Logo testing', USB communication errors, and advanced printing features.",
    excerpt: "Installing older Primera drivers on modern Windows 11 PCs often triggers digital signature warnings and USB communication failures. Here is how to force the installation.",
    errorCode: 'Driver Install Error',
    tags: 'Primera, Printer Driver Windows 11, Enable Advanced Printing Features USB Error, Not Passing Windows Logo, USB Communication Error, Driver Signature',
    wordCount: 1100,
    difficultyLevel: 'Advanced',
    timeToFix: '10 minutes',
    categoryId: softwareCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "To install a Primera printer on Windows 11 and fix USB errors: 1) Windows Logo Warning: If Windows halts the install saying the driver 'has not passed Windows Logo testing', this is just a digital signature warning for older legacy drivers. Click 'Continue Anyway' or 'Install this driver software anyway'. 2) USB Communication Error: Do not plug the printer into a blue USB 3.0 port. Use a black USB 2.0 port on the back of the motherboard. 3) Advanced Printing Features: If jobs stall, right-click the printer > Properties > Advanced > Uncheck 'Enable advanced printing features' to force the spooler to send raw data.",
    content: `<h2>Installing Legacy Primera Drivers on Windows 11</h2>
<p>Upgrading your warehouse PC to Windows 11 often breaks older Primera LX400, LX810, or Bravo disc publisher drivers. Windows 11 has strict driver isolation and digital signature enforcement policies.</p>

<h3>The "Not Passing Windows Logo Testing" Warning</h3>
<p>During the installation of older Primera drivers downloaded from the legacy support site, Windows may throw a red or yellow warning stating that the driver is unsigned or has not passed WHQL (Windows Hardware Quality Labs) testing.</p>
<ul>
  <li><strong>The Fix:</strong> This is a false alarm for trusted OEM software. Simply click <strong>Continue Anyway</strong> or <strong>Install this driver software anyway</strong>.</li>
  <li><em>Note:</em> If Windows 11 completely blocks the installation and hides the "Continue" button, you must reboot Windows into <strong>Disable Driver Signature Enforcement</strong> mode (Hold Shift while clicking Restart &gt; Troubleshoot &gt; Advanced Options &gt; Startup Settings &gt; Press F7).</li>
</ul>

<h2>Fixing USB Communication Errors</h2>
<p>If PTStatus constantly flashes "Printer Offline" or drops the connection halfway through printing a batch of 500 labels, the USB bus is unstable.</p>
<ol>
  <li><strong>Avoid USB 3.0:</strong> Older Primera mainboards use USB 2.0 (or even USB 1.1) controllers. Plugging them into modern high-speed USB 3.0 (Blue) or USB-C hubs causes polling rate desynchronization. Always use a native, black USB 2.0 port directly on the rear I/O shield of the desktop PC.</li>
  <li><strong>Cable Length:</strong> Never use a USB cable longer than 6 feet (2 meters). High-res inkjet data requires massive bandwidth; long cables cause voltage drop and data packet loss.</li>
</ol>

<h2>The 'Enable Advanced Printing Features' Bug</h2>
<p>If the printer driver installs successfully, but print jobs sit in the queue forever without printing, the Windows EMF (Enhanced Metafile) spooling system is failing to render the label.</p>
<ul>
  <li>Go to <strong>Printers &amp; Scanners</strong>.</li>
  <li>Right-click the Primera printer and select <strong>Printer Properties</strong>.</li>
  <li>Navigate to the <strong>Advanced</strong> tab.</li>
  <li>Uncheck the box that says <strong>Enable advanced printing features</strong>.</li>
  <li>Click Apply. This forces Windows to spool the print job as RAW data, bypassing the buggy EMF renderer and sending the file directly to the Primera print engine.</li>
</ul>`
  },
  {
    title: "Fix Primera Print Job Disappears, PTPublisher Not Printing & Firmware",
    slug: 'primera-print-job-disappears-ptpublisher-not-printing-firmware',
    seoTitle: "Fix Primera Print Job Disappears & PTPublisher Not Printing",
    metaDescription: "Does your Primera print job flash in the queue and disappear without printing? Learn how to fix PTPublisher software, find your firmware version, and clear stuck status monitors.",
    excerpt: "When a print job vanishes from the Windows queue instantly but the printer does nothing, the driver's port configuration is usually pointed to a nonexistent LPT or Null port.",
    errorCode: 'Spooler Drop',
    tags: 'Primera, Print Job Disappears From Queue, PTPublisher Not Printing, Printer Status Monitor No Activity, Firmware Version How To Find, Spooler',
    wordCount: 1050,
    difficultyLevel: 'Intermediate',
    timeToFix: '5 minutes',
    categoryId: softwareCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    featuredSnippet: "To fix a Primera print job that disappears from the queue without printing: 1) Check the Port: Right-click the printer > Printer Properties > Ports. Ensure it is checked on a 'USB Virtual Printer Port' (e.g., USB001), not LPT1, COM1, or FILE. 2) Re-add the Printer: If it's on the correct port, the driver is corrupted. Remove the printer from Windows and run the Primera installer again. 3) PTPublisher Not Printing: Ensure you are running PTPublisher as Administrator. 4) Find Firmware: Open PTStatus, click the 'Information' or 'About' tab (the 'i' icon) to view the current Firmware and Software version numbers.",
    content: `<h2>The "Vanishing Print Job" Phenomenon</h2>
<p>One of the most frustrating errors in Windows occurs when you click Print, the document appears in the print queue for one second, and then disappears completely. The printer sits silently, doing absolutely nothing, and no error message is generated.</p>

<h3>Why it Happens: Port Misalignment</h3>
<p>When a print job disappears, the Windows Print Spooler thinks it successfully delivered the file. However, it delivered it to a "black hole" port.</p>
<ol>
  <li>Open <strong>Control Panel &gt; Devices and Printers</strong>.</li>
  <li>Right-click your Primera printer and select <strong>Printer Properties</strong> (not the bottom 'Properties' option).</li>
  <li>Click the <strong>Ports</strong> tab.</li>
  <li>Look at which box is checked. If it is assigned to <code>LPT1</code>, <code>COM1</code>, or <code>FILE</code>, Windows is dumping the data into a legacy parallel port that doesn't exist on your PC.</li>
  <li>Scroll down and check the box for <strong>USB001</strong> (or the highest numbered Virtual printer port for USB). Click Apply. Try printing again.</li>
</ol>

<h2>PTPublisher Not Printing (Bravo Series)</h2>
<p>If you are using a Primera Bravo Disc Publisher and the <strong>PTPublisher</strong> software refuses to burn or print discs:</p>
<ul>
  <li><strong>Admin Rights:</strong> Burning optical media requires direct low-level access to the SATA/USB controllers. Right-click the PTPublisher icon and select <strong>Run as Administrator</strong>.</li>
  <li><strong>Status Monitor Conflict:</strong> If the Status Monitor shows "No Activity" while PTPublisher says it is printing, ensure no other software (like SureThing Disc Labeler) is holding the printer port open simultaneously.</li>
</ul>

<h2>How to Find Your Primera Firmware Version</h2>
<p>If you are calling Primera Tech Support, they will immediately ask for your firmware version. Do not confuse the <em>Software Driver</em> version with the <em>Hardware Firmware</em>.</p>
<ul>
  <li>Open the <strong>PTStatus</strong> application.</li>
  <li>Click the <strong>Information (i)</strong> icon, or navigate to the <strong>About</strong> tab.</li>
  <li>Look for <strong>Firmware Version:</strong> (e.g., v1.23).</li>
  <li>If your firmware is heavily outdated, you can download the Firmware Update Utility from the Primera website to flash the logic board to the newest version.</li>
</ul>`
  }
];

async function main() {
  const brandSlug = 'primera-technology';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 2 (Clusters C & E: Media & Software) for brand: ${brand.name}`);

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
