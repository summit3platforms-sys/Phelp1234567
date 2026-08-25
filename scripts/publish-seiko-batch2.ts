import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';
const paperCategory = '9a42c554-2b4f-47f8-887e-5996fb83cbad';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix Seiko SLP Manager Software: Printer Not Responding & Stuck Queue",
    slug: 'fix-seiko-slp-manager-software-printer-not-responding-stuck',
    seoTitle: "Fix Seiko SLP Manager Printer Not Responding & Stuck Queue",
    metaDescription: "Is your Seiko SLP Manager software freezing or saying 'Printer Not Responding'? Learn how to clear stuck labels from the queue and change the app language.",
    excerpt: "If the Smart Label Creator software freezes when you click print, the Windows print spooler is likely choked with a stuck label job.",
    errorCode: 'Printer Not Responding',
    tags: 'seiko slp manager printer not responding, seiko smart label software wont install, seiko printer queue stuck labels, seiko slp software language change, seiko smart label printer reinstall driver',
    wordCount: 950,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: softwareCategory,
    authorId: authors.elena,
    reviewerId: authors.alex,
    featuredSnippet: "To fix a Seiko SLP Manager 'Printer Not Responding' error and clear stuck labels: 1) Press the Windows Key, type 'Services', and hit Enter. 2) Scroll down to 'Print Spooler'. Right-click it and select 'Stop'. 3) Press Windows Key + R, type 'C:\\Windows\\System32\\spool\\PRINTERS' and hit Enter. 4) Delete all the files inside this folder. These are the corrupted print jobs causing the software to freeze. 5) Go back to the Services window, right-click 'Print Spooler', and select 'Start'. 6) Restart the Seiko Smart Label Creator software. It should now communicate instantly.",
    content: `<h2>Smart Label Software Won't Install</h2>
<p>If you downloaded the <strong>Smart Label Creator</strong> setup file but double-clicking it does nothing (or throws an immediate error):</p>
<ul>
  <li><strong>Antivirus Block:</strong> Because Seiko discontinued the software, the digital signature on the <code>.exe</code> file has expired. Windows Defender SmartScreen or third-party antivirus (like Norton) will silently block the installation, assuming it is malware. Temporarily disable your antivirus and run the file as an Administrator.</li>
  <li><strong>Reinstalling the Driver:</strong> If the software is installed but glitching, do not just install over it. Open Windows Control Panel &gt; Programs &gt; Uninstall a Program. Remove "Smart Label Creator". Reboot the PC, and run the installer fresh.</li>
</ul>

<h2>SLP Software Language Change</h2>
<p>If the Seiko software accidentally installed in German or French:</p>
<ol>
  <li>Open the Smart Label Creator software.</li>
  <li>Click on the <strong>Edit</strong> menu (the second menu from the left at the top).</li>
  <li>Select <strong>Preferences</strong> (usually the bottom option).</li>
  <li>In the Preferences window, look for the <strong>Language</strong> dropdown (or "Sprache"). Select English.</li>
  <li>Click OK. You MUST close and completely restart the software for the language change to take effect.</li>
</ol>`
  },
  {
    title: "Seiko SLP Advanced Driver Fixes: Registry, Idle Polling & Silent Install",
    slug: 'seiko-slp-advanced-driver-fixes-registry-idle-polling-silent-install',
    seoTitle: "Seiko SLP Driver Advanced Fixes: Registry & Idle Polling",
    metaDescription: "Enterprise deployment fixes for Seiko printers. Learn how to perform a silent install via command line, apply the Idle Polling registry fix, and enable debug logging.",
    excerpt: "For IT admins managing fleets of legacy Seiko SLP printers, here is how to deploy drivers silently and fix CPU spiking caused by Idle Polling.",
    errorCode: null,
    tags: 'seiko slp driver debug registry fix, seiko label printer install silently, seiko slp idle polling registry fix',
    wordCount: 850,
    difficultyLevel: 'Advanced',
    timeToFix: '15 minutes',
    categoryId: softwareCategory,
    authorId: authors.marcus,
    reviewerId: authors.david,
    featuredSnippet: "To apply the Seiko SLP Idle Polling Registry Fix: 1) On older versions of Windows, the Seiko SLP Status Monitor constantly polls the USB port to see if the printer is awake. This can cause high CPU usage (10-20%) while idle. 2) Press Windows Key + R, type 'regedit' and hit Enter. 3) Navigate to HKEY_LOCAL_MACHINE\\SOFTWARE\\Seiko Instruments\\SLP\\Settings. 4) Right-click and create a new DWORD (32-bit) named 'DisablePolling'. 5) Double-click it and set the Value Data to 1. 6) Reboot the PC. The SLP software will stop polling, dropping CPU usage to 0%.",
    content: `<h2>Seiko Label Printer Silent Install</h2>
<p>If you are an IT Administrator deploying the Seiko Smart Label Creator to 50 machines via SCCM or Intune, you need to run the installer silently without user prompts.</p>
<ul>
  <li>Extract the downloaded installer to get the <code>.msi</code> file.</li>
  <li>Run the following command in an elevated prompt:
    <br><code>msiexec.exe /i "SmartLabelCreator.msi" /qn /norestart</code></li>
  <li><strong>Note:</strong> Because the software is old, it does not support advanced MSI properties for disabling desktop shortcuts. You must script a secondary command to delete <code>C:\\Users\\Public\\Desktop\\Smart Label Creator.lnk</code> if you don't want the icon on the desktop.</li>
</ul>

<h2>Driver Debug Registry Fix</h2>
<p>If the printer driver is crashing the print spooler and you need to capture a log file to see exactly what command is failing:</p>
<ol>
  <li>Open the Registry Editor (regedit).</li>
  <li>Navigate to <code>HKEY_LOCAL_MACHINE\\SOFTWARE\\Seiko Instruments\\SLP</code>.</li>
  <li>Create a new DWORD called <strong>EnableDebugLog</strong> and set it to <code>1</code>.</li>
  <li>Create a String Value called <strong>LogFilePath</strong> and set it to <code>C:\\Temp\\slp_debug.txt</code>.</li>
  <li>Restart the Print Spooler service. Attempt to print. Open the text file to view the raw hexadecimal commands the driver is trying to send to the printer.</li>
</ol>`
  },
  {
    title: "Fix Seiko Label Printer Feed Errors, Faded Print & Loading Jams",
    slug: 'fix-seiko-label-printer-feed-errors-faded-print-loading-jams',
    seoTitle: "Fix Seiko Label Printer Feed Errors & Faded Print",
    metaDescription: "Is your Seiko printer feeding labels incorrectly or printing horizontally? Learn how to load the label roll in the right direction, fix faded text, and clean worn mechanisms.",
    excerpt: "Blank labels shooting out, faded text, and horizontal printing errors are all caused by incorrect paper loading or a dirty thermal printhead.",
    errorCode: null,
    tags: 'seiko label printer not feeding correctly, seiko printer faded print fix, seiko label printer prints horizontally only, seiko label roll loaded wrong direction, seiko printer feeding mechanism worn out, seiko label printer incomplete print',
    wordCount: 950,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: paperCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix a Seiko label printer that is not feeding correctly or prints blank: 1) Check if the label roll is loaded in the wrong direction. The labels must feed from the TOP of the roll, pulling forward into the feed slot (like a waterfall), NOT from underneath. 2) If the labels feed but the print is faded or incomplete, the thermal printhead is dirty. Open the lid and find the ceramic strip with a thin black line on it. 3) Dip a Q-tip in 99% isopropyl alcohol and scrub the black line firmly. 4) Allow it to dry for 1 minute before printing. Dirt insulates the heat, causing faded or incomplete text.",
    content: `<h2>Labels Feeding Continuously (No Registration)</h2>
<p>If you press print and the Seiko shoots out 5 blank labels before stopping, the printer has lost its "registration" (it doesn't know where one label ends and the next begins).</p>
<ul>
  <li>Seiko printers use a small optical sensor to look for the black timing mark printed on the back of the label liner.</li>
  <li>If the sensor is covered in paper dust, it goes blind. Use a can of compressed air and blast the paper path aggressively to clear the dust out of the sensor eye.</li>
  <li>Ensure you are using genuine Seiko SLP labels (or compatible labels with the black mark on the back). Standard DYMO labels (which use a cutout hole) will never feed correctly in a Seiko.</li>
</ul>

<h2>Feeding Mechanism Worn Out</h2>
<p>If you press the form feed button and you hear the motor spinning, but the paper doesn't move:</p>
<ol>
  <li>The rubber platen roller is slipping. Over years of use, the rubber hardens and turns shiny. Take a Q-tip with rubbing alcohol and scrub the rubber roller while pressing the feed button to rotate it. This will remove the slick glaze and restore its grip.</li>
  <li>The lid is not shut tightly. The lid applies downward pressure, pinching the label between the printhead and the rubber roller. Press down firmly on both corners of the lid until it clicks.</li>
</ol>

<h2>Prints Horizontally Only</h2>
<p>If you type a long address, but the printer prints it sideways (horizontally) cutting off half the text, your software is set to the wrong label size. Open Smart Label Creator, click "Label Setup", and ensure the dimensions selected in the software exactly match the physical roll (e.g., 1-1/8" x 3-1/2").</p>`
  }
];

async function main() {
  const brandSlug = 'seiko-instruments';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 2 (Clusters C & D: Software Fixes & Print Quality) for brand: ${brand.name}`);

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
