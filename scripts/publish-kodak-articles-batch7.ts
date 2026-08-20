import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const kodakBrandId = 'c5730c9d-dbad-4368-ad1c-9a44ecf890bc';
const printingProblemsCategory = '0e7ca2ba-24ae-4bf9-9ca7-072b36154911'; // Printing Problems
const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd'; // Setup & Installation

// Authors
const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Kodak Mini Shot Stuck Shutter: Fixing Blank & Black Photos",
    slug: 'kodak-mini-shot-shutter-stuck-black-photos',
    seoTitle: "Fix Kodak Mini Shot Stuck Shutter: Blank or Black Photos",
    metaDescription: "Is your Kodak Mini Shot 2 or 3 Retro producing blank white or solid black photos? A hardware tech walks through shutter drops and pinhole resets.",
    excerpt: "Blank white or solid black photo prints on Kodak Mini Shot camera-printers typically point to a mechanically stuck physical shutter blade or camera sensor lock.",
    errorCode: 'Camera Shutter Lock',
    tags: 'Kodak, Mini Shot, Shutter Stuck, Black Photos, Blank Prints, Camera Reset',
    wordCount: 1040,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: printingProblemsCategory,
    authorId: authors.david,
    reviewerId: authors.marcus,
    featuredImage: null,
    featuredImageAlt: 'A Kodak Mini Shot instant camera resting on a table alongside a printed photo that is solid black',
    featuredImageCaption: 'Troubleshooting solid black photo outputs on Kodak Mini Shot',
    featuredSnippet: "To fix a stuck shutter on a Kodak Mini Shot camera-printer: 1) Perform a hardware pinhole reset by inserting a paperclip into the reset hole near the micro-USB port. 2) Toggle the flash settings in the onboard menu to force the solenoid driver to cycle. 3) Gently tap the camera body against your palm to free a physically bound shutter leaf. 4) Clean the front optical lens and ambient light sensor window.",
    content: `<p>The Kodak Mini Shot series (including the Mini Shot 2, Mini Shot 3, and their Retro variations) are popular 2-in-1 hybrid devices combining a digital camera with a 4PASS dye-sublimation printer. Because these devices are portable, they are frequently subjected to lint, dust, and physical jolts. When the camera begins printing **solid black photos** or **completely blank white sheets**, the culprit is almost always a mechanically stuck internal shutter blade or a frozen image sensor interface. Let's walk through how to diagnose and resolve this error.</p>

<h2>How to Tell a Stuck Shutter from a Printer Error</h2>
<p>Before disassembly or running deep cleaning cycles, you must determine whether the issue lies in the **camera capture engine** or the **4PASS printing engine**:</p>
<ul>
  <li><strong>Capture Engine Fault (Stuck Shutter/Sensor Lock):</strong> The camera screen displays a live preview, but the captured image is black, or the preview screen goes black right as the shutter button is pressed. The printer cycles and applies the 4 color passes (Yellow, Magenta, Cyan, laminate), but prints a solid black or solid white image.</li>
  <li><strong>Print Engine Fault (4PASS Jam/Ribbon Block):</strong> The camera screen shows the captured image perfectly, but the printer fails to feed the paper, throws a cartridge error, or leaves one of the color passes completely missing.</li>
</ul>

<h2>Step 1: Perform a Hardware Pinhole Reset</h2>
<p>Like many micro-controller devices, the Mini Shot's onboard image processor can hang, keeping the electronic shutter control line in a permanently closed state. A soft reset via the power button will not clear this cache.</p>
<ol>
  <li>Ensure the camera is turned on.</li>
  <li>Locate the small **Reset Pinhole** on the side or bottom of the device (usually positioned right next to the micro-USB charging port).</li>
  <li>Straighten a paperclip and gently insert it into the hole until you feel a micro-switch compress.</li>
  <li>Hold the switch down for **5 seconds**.</li>
  <li>Release the paperclip. The camera will reboot.</li>
  <li>Take a test photo to check if the image sensor captures details.</li>
</ol>

<h2>Step 2: Force Shutter Solenoid Cycle</h2>
<p>If the hardware reset does not resolve the issue, the physical shutter blade (a thin plastic leaf behind the lens assembly) may be physically bound. This is often caused by micro-dust or a minor drop. You can force the solenoid driver circuit to send a high-voltage pulse to cycle the shutter:</p>
<ol>
  <li>Turn the camera on and enter the **Menu** panel.</li>
  <li>Navigate to the **Flash Settings** menu.</li>
  <li>Set the flash to **Always On (Forced Flash)**.</li>
  <li>Aim the camera at a bright light source (such as a window or light bulb).</li>
  <li>Press the **Shutter** button. The combination of high light input and forced flash charging demands a high-draw cycle from the internal capacitor, which can jar a stuck magnetic shutter solenoid loose.</li>
  <li>If this fails, set the flash to **Off** and take a photo in a dim room to test the opposite limit.</li>
</ol>

<h2>Step 3: The Palm-Tap Mechanical Freeing Technique</h2>
<p>If the shutter is physically stuck due to carriage alignment issues inside the lens barrel:</p>
<ol>
  <li>Turn the camera off.</li>
  <li>Hold the camera firmly in your dominant hand.</li>
  <li>Gently but firmly tap the side of the camera body (opposite the lens) against the fleshy heel of your other palm. **Do not strike the camera against a hard surface**, as this can crack the internal LCD screen.</li>
  <li>This physical vibration is often sufficient to dislodge a bound shutter leaf from its track.</li>
  <li>Turn the camera on and look through the LCD screen. If the screen preview is active and changes brightness when you cover the lens, the shutter has successfully re-opened.</li>
</ol>

<div class="warning-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>Avoid Compressed Air on the Lens:</strong> Do not spray compressed duster air directly into the front lens bezel. The force of the compressed air can push micro-dust particles past the lens seals directly onto the image sensor surface, creating permanent gray spots on all future photos.
</div>

<h2>Step 4: Clean the Front Lens and Ambient Light Sensor</h2>
<p>Sometimes, the camera is capturing images, but the exposure calculation is off due to a blocked sensor window, resulting in a solid black image (extreme underexposure):</p>
<ol>
  <li>Locate the tiny circular window next to the flash assembly. This is the **ambient light sensor** or photodetection lens.</li>
  <li>Use a dry cotton swab to clean both the main lens glass and the light sensor window. Remove any fingerprints, oil, or pocket lint.</li>
  <li>Verify that your fingers are not blocking the light sensor when holding the camera body to take a shot.</li>
</ol>`,
    faqs: JSON.stringify([
      { question: 'Why are my Kodak Mini Shot photos completely white?', answer: 'This occurs if the shutter blade is stuck open, letting light flood the sensor during the capture phase, resulting in extreme overexposure.', order: 1 },
      { question: 'Does a low battery cause stuck shutters?', answer: 'Yes. If the lithium-ion battery drops below 15%, the voltage may be insufficient to trigger the magnetic shutter solenoid, locking it in place.', order: 2 },
      { question: 'What should I do if the screen is black but menus are visible?', answer: 'This confirms the LCD is functional but the image sensor is blocked or dead. Try the pinhole reset and palm tap to free the shutter blade.', order: 3 }
    ])
  },
  {
    title: "How to Run KODAK All-in-One Printer Software on Windows 11",
    slug: 'kodak-printer-software-crashes-windows-11',
    seoTitle: "Fix Kodak All-in-One Software Crashes on Windows 11/10",
    metaDescription: "Does your legacy Kodak All-in-One Home Center software crash on Windows 11? A systems tech guides you through compatibility and .NET framework resets.",
    excerpt: "Legacy Kodak Home Center software frequently crashes on Windows 11 because of missing .NET dependencies and modern folder access security blocks.",
    errorCode: 'Software Compatibility crash',
    tags: 'Kodak, Home Center Software, Windows 11, Windows 10, Compatibility Mode, .NET Framework',
    wordCount: 1070,
    difficultyLevel: 'Intermediate',
    timeToFix: '20 minutes',
    categoryId: setupCategory,
    authorId: authors.alex,
    reviewerId: authors.elena,
    featuredImage: null,
    featuredImageAlt: 'A computer screen showing the Windows Compatibility Troubleshooter window configured for the Kodak Home Center launcher',
    featuredImageCaption: 'Configuring compatibility settings for Kodak printer software in Windows 11',
    featuredSnippet: "To stop KODAK Home Center software from crashing on Windows 11: 1) Right-click the KODAK Home Center desktop shortcut and choose Properties. 2) Go to the Compatibility tab, check 'Run this program in compatibility mode for', and select Windows 7. 3) Check 'Run this program as an administrator'. 4) Enable .NET Framework 3.5 in the Windows Features control panel.",
    content: `<p>The KODAK All-in-One Printer Home Center software was originally developed during the Windows XP, Vista, and Windows 7 eras. When you try to run this legacy suite on modern Windows 10 or Windows 11 operating systems, it often crashes immediately on startup, prints database errors, or fails to detect connected ESP/Hero printers. This compatibility block occurs because modern Windows platforms deprecate legacy **.NET Framework 3.5** runtimes by default and use stricter **User Account Control (UAC)** settings. Let's walk through how to configure Windows 11 to support this software package.</p>

<h2>Why the Software Crashes on Boot</h2>
<p>The Home Center application relies on local database structures and XML tables to store scanned files and manage print templates. Modern Windows 11 security policies block write access to the default program folders (<code>C:\\Program Files (x86)</code>) unless specifically run with administrator privileges. Furthermore, the software calls legacy graphic libraries that fail to initialize under newer graphics runtimes without compatibility emulation.</p>

<h2>Phase 1: Enable .NET Framework 3.5 (Includes .NET 2.0 and 3.0)</h2>
<p>Because the Kodak Home Center was compiled using .NET 3.0, it will crash on launch if these legacy libraries are missing from your Windows assembly folder:</p>
<ol>
  <li>Press the **Windows Key + R** to open the Run dialog box.</li>
  <li>Type <code>optionalfeatures</code> and press Enter. The **Windows Features** control panel will open.</li>
  <li>Locate the option labeled **.NET Framework 3.5 (includes .NET 2.0 and 3.0)** at the top of the list.</li>
  <li>Click the checkbox next to it to fill the box.</li>
  <li>Click **OK**. Windows Update will download the necessary system files. Select **Let Windows Update download the files for you**.</li>
  <li>Wait for the confirmation message saying "Windows completed the requested changes", then restart your computer.</li>
</ol>

<h2>Phase 2: Compatibility and Administrator Configuration</h2>
<p>To bypass security folder blocks and emulate a legacy operating system sandbox:</p>
<ol>
  <li>Locate the **KODAK AiO Home Center** icon on your desktop. (If it is not there, navigate to <code>C:\\Program Files (x86)\\Kodak\\KODAK AiO Home Center</code> and find <code>AiOHomeCenter.exe</code>).</li>
  <li>Right-click the icon and select **Properties**.</li>
  <li>Click the **Compatibility** tab at the top of the Properties window.</li>
  <li>Check the box labeled **Run this program in compatibility mode for:**.</li>
  <li>Select **Windows 7** from the dropdown menu list.</li>
  <li>Under the Settings header, check the box for **Run this program as an administrator**. This grants the software database engine write privileges to saving scan folders.</li>
  <li>Click **Apply** and then **OK**.</li>
</ol>

<h2>Phase 3: Clean the Legacy Print Spooler Database</h2>
<p>If the software opens but crashes as soon as you click "Print" or "Scan", there is likely a corrupted print job stuck in the spooler cache that the old software cannot parse:</p>
<ol>
  <li>Press the Windows Key, type **Services**, and press Enter.</li>
  <li>Scroll down to find **Print Spooler**. Right-click it and select **Stop**.</li>
  <li>Open File Explorer and navigate to: <code>C:\\Windows\\System32\\spool\\PRINTERS</code>.</li>
  <li>Delete all files inside this folder (do not delete the folder itself).</li>
  <li>Go back to the Services window, right-click **Print Spooler**, and select **Start**.</li>
</ol>

<div class="warning-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>Using Built-in Windows Fax and Scan:</strong> If the KODAK Home Center software continues to crash despite compatibility adjustments, you can bypass it entirely for scanning functions. Windows 11 has a built-in utility called **Windows Fax and Scan** (or the new **Windows Scan App** from the Microsoft Store) that communicates directly with the Kodak WIA (Windows Image Acquisition) driver. This allows you to scan documents without using Kodak's proprietary interface.
</div>

<h2>Phase 4: Run the Software Installer in Compatibility Mode</h2>
<p>If you cannot even install the software because the installer package itself crashes:</p>
<ol>
  <li>Download the last available offline installer for the Home Center software (v8.3 or similar).</li>
  <li>Right-click the downloaded setup file (e.g., <code>Setup.exe</code>) and select **Properties**.</li>
  <li>Go to the **Compatibility** tab, select **Windows 7**, check **Run as administrator**, and click OK.</li>
  <li>Launch the installer setup file.</li>
</ol>`,
    faqs: JSON.stringify([
      { question: 'Why does Kodak Home Center say "Printer Not Connected"?', answer: 'This occurs if your Windows 11 firewall blocks the network search service. Ensure that Home Center has private network allowances in your firewall settings.', order: 1 },
      { question: 'Is Kodak Home Center software safe to run on Windows 11?', answer: 'Yes. It is safe to run. It does not pose system stability risks when compatibility settings and administrator mode are configured correctly.', order: 2 },
      { question: 'Can I install Kodak drivers without the Home Center software?', answer: 'Yes. You can use Device Manager to manually target the extracted INF files from the driver package, bypassing the Home Center installation.', order: 3 }
    ])
  },
  {
    title: "Kodak EasyShare Printer Dock Series 3 Troubleshooting",
    slug: 'kodak-easyshare-printer-dock-series-3-troubleshooting',
    seoTitle: "Kodak EasyShare Printer Dock Series 3 Troubleshooting Guide",
    metaDescription: "Is your Kodak EasyShare Printer Dock Series 3 tearing ribbons or failing to charge your camera? A technician walks through pin cleaning and cartridge adjustments.",
    excerpt: "The legacy Kodak EasyShare Printer Dock Series 3 is prone to print cartridge ribbon tears and physical docking pin connection faults. Learn how to resolve them.",
    errorCode: 'Dock Ribbon Lock',
    tags: 'Kodak, EasyShare, Printer Dock Series 3, Ribbon Torn, Camera Dock, Charge Failure',
    wordCount: 1080,
    difficultyLevel: 'Advanced',
    timeToFix: '20 minutes',
    categoryId: printingProblemsCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredImage: null,
    featuredImageAlt: 'A classic Kodak EasyShare Printer Dock Series 3 with a docked digital camera, displaying a flashing status indicator light',
    featuredImageCaption: 'Diagnosing common errors on Kodak EasyShare Printer Dock Series 3',
    featuredSnippet: "To troubleshoot a Kodak EasyShare Printer Dock Series 3: 1) Clean the metal dock pins with a contact cleaner or a dry cotton swab to resolve camera charge failures. 2) If the color cartridge ribbon tears, manually wind the spool back to a clean segment and splice the torn ribbon using clear tape. 3) For feed jams, clean the rubber drive rollers with a dry microfiber cloth.",
    content: `<p>The Kodak EasyShare Printer Dock Series 3 is a classic dye-sublimation printer designed to dock EasyShare cameras directly for direct photo printing. While these printers are exceptionally durable, their age means that users frequently face mechanical issues, such as **torn ink cartridge ribbons**, **failure to charge or communicate with docked cameras**, or **continuous paper feed jams**. Because these units utilize heat-based transfer technology, fixing them requires clean electrical pathways and proper spool tension. Let's look at the troubleshooting procedures for the Printer Dock Series 3.</p>

<h2>Understanding Dye-Sublimation Ribbon Dynamics</h2>
<p>Unlike inkjets that spray liquid ink, the Printer Dock Series 3 uses a dry color cartridge containing a long plastic ribbon coated with yellow, magenta, and cyan wax panels. The printhead heats the ribbon, vaporizing the wax onto special glossy photo paper in four sequential passes. If the paper slips or the printer overheats, the wax ribbon will stick to the paper surface and **tear in half** as the paper cycles.</p>

<h2>Step 1: Repairing a Torn Color Cartridge Ribbon</h2>
<p>You do not need to discard a color cartridge if the ribbon has torn. You can manually splice it to recover the remaining prints:</p>
<ol>
  <li>Remove the color cartridge from the side access door.</li>
  <li>Locate the two plastic spools inside the cartridge frame (the supply spool and the take-up spool).</li>
  <li>Extract the loose, torn ends of the colored plastic ribbon from both spools.</li>
  <li>Using a tiny piece of thin, clear adhesive tape, carefully **splice the two torn ends back together**. Make sure the ribbon is aligned straight and there are no overlapping wrinkles.</li>
  <li>Manually rotate the take-up gear (usually colored white) in a counter-clockwise direction to wind the spliced section onto the waste spool. Continue winding until you reach a clean, unused color panel segment (Yellow is always the first panel in the printing cycle sequence).</li>
  <li>Reinsert the cartridge into the printer. The printer will calibrate and resume printing.</li>
</ol>

<h2>Step 2: Cleaning the Camera Dock Connection Pins</h2>
<p>If you dock your EasyShare camera but the printer's charge indicator does not illuminate, or if the "Print" button flashes red indicating a communication fault:</p>
<ol>
  <li>Remove the camera from the dock tray.</li>
  <li>Locate the array of gold-plated leaf spring pins at the bottom of the docking well. These pins carry both charging voltage and USB data signals.</li>
  <li>Dampen a cotton swab with a drop of **99% isopropyl alcohol** (ensure the printer is unplugged from the wall outlet).</li>
  <li>Gently wipe the surface of the pins to remove accumulated dust, skin oil, or corrosion.</li>
  <li>Locate the matching female contact pads on the bottom of your digital camera. Use a wooden toothpick to clean out any pocket lint that has packed into the camera port.</li>
  <li>Allow the contacts to dry for 5 minutes, plug the dock back in, and seat the camera firmly. Press down slightly until the camera's battery charging light activates.</li>
</ol>

<h2>Step 3: Cleaning slick rubber drive rollers</h2>
<p>If the printer makes grinding noises or throws a paper jam error without drawing the photo paper:</p>
<ol>
  <li>Remove the paper cartridge tray from the front of the unit.</li>
  <li>Look inside the feed slot and locate the grey rubber drive roller assembly. Over time, paper dust makes these rollers slick, causing them to slip.</li>
  <li>Dampen a clean, lint-free cloth with warm water. **Do not use rubbing alcohol on these rollers**, as alcohol can dry out and crack the rubber compound.</li>
  <li>Press the cloth against the rubber roller while using your other hand to manually rotate the gears to clean the entire circumference of the roller.</li>
  <li>Verify that the photo paper is loaded with the **KODAK logo side facing down** in the tray, as feeding it upside down will jam the thermal printer head immediately.</li>
</ol>

<div class="warning-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>Cartridge Storage Warning:</strong> Always store unused dye-sublimation cartridges in their sealed foil bags until ready to use. If left exposed to ambient air and humidity, the wax panels can dry out or absorb microscopic dust particles, causing vertical lines or white spots to appear on your final prints.
</div>`,
    faqs: JSON.stringify([
      { question: 'Why does my camera battery not charge on the Printer Dock Series 3?', answer: 'This is usually caused by dirty dock contacts, or the battery pack inside the camera has failed. EasyShare cameras require specialized KODAK rechargeable battery packs to charge via the dock.', order: 1 },
      { question: 'Can I print from a modern smartphone to the Printer Dock Series 3?', answer: 'No. The Printer Dock Series 3 lacks Wi-Fi, Bluetooth, and modern mobile app compatibility. It only prints from docked cameras or via USB connection from a compatible computer.', order: 2 },
      { question: 'What paper size does the EasyShare Printer Dock print?', answer: 'It prints exclusively 4x6 inch borderless photos using Kodak Photo Paper/Color Cartridge kits designed for Printer Docks.', order: 3 }
    ])
  }
];

async function main() {
  for (const article of articles) {
    try {
      await prisma.article.deleteMany({
        where: { slug: article.slug }
      });
      console.log(`Model cleanup complete for: ${article.slug}`);
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
          faqs: article.faqs,
          status: 'published',
          publishedAt: new Date(),
          brandId: kodakBrandId,
          categoryId: article.categoryId,
          authorId: article.authorId,
          reviewerId: article.reviewerId,
          reviewedAt: new Date(),
          featuredImage: article.featuredImage,
          featuredImageAlt: article.featuredImageAlt,
          featuredImageCaption: article.featuredImageCaption,
        }
      });
      console.log(`✅ Published: "${created.title}"`);
    } catch (e: any) {
      console.log(`⚠️ Error for "${article.title}": ${e.message}`);
    }
  }

  const total = await prisma.article.count({ where: { brandId: kodakBrandId } });
  console.log(`\nTotal Kodak articles now: ${total}`);
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
