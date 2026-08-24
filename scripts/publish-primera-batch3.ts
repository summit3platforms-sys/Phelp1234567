import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';
const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';
const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Primera Bravo Disc Publisher Not Printing & Burns Disc But Won't Print",
    slug: 'primera-bravo-disc-publisher-not-printing-burns-disc-but-wont',
    seoTitle: "Fix Primera Bravo Disc Publisher Burns Disc But Won't Print",
    metaDescription: "Is your Primera Bravo disc publisher successfully burning CDs/DVDs but refusing to print the label? Learn how to fix alignment software and inner-hub dimensions.",
    excerpt: "When a Bravo disc publisher successfully burns data but skips the inkjet printing phase, the issue is almost always a mismatch in the disc layout software dimensions.",
    errorCode: 'Skip Print Phase',
    tags: 'Primera, Bravo Disc Publisher Not Printing, Burns Disc But Wont Print, CD DVD Label Printing, PTPublisher, SureThing',
    wordCount: 1050,
    difficultyLevel: 'Intermediate',
    timeToFix: '5 minutes',
    categoryId: softwareCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix a Primera Bravo that burns a disc but won't print the label: 1) Check the Layout Dimensions: Open SureThing Disc Labeler or your design software. If your design overlaps the clear inner plastic hub of the disc, the printer will reject the job to prevent spraying ink onto un-coated plastic. Adjust your inner diameter settings (e.g., set the inner hub to 22mm instead of 15mm). 2) Check PTPublisher Queue: Ensure the job was submitted as 'Print and Burn', not 'Burn Only'. 3) Clear the Spooler: A corrupted print file can freeze the inkjet engine while allowing the optical drive to function. Restart the Windows Print Spooler.",
    content: `<h2>Understanding the Bravo Two-Step Process</h2>
<p>The Primera Bravo series (including the SE, Pro, and 4100) are robotic disc publishers that combine a high-speed optical burner (CD/DVD/Blu-ray) with a thermal inkjet print engine. The PTPublisher software orchestrates this dance: burn first, then move the disc to the print tray.</p>

<h2>Why it Burns but Ignores the Print Job</h2>
<p>If the robotic arm successfully moves a blank disc to the burner drive, completes the data burn, and then drops the disc directly into the output bin <em>without</em> moving it to the inkjet printer tray, the software has silently rejected the print file.</p>

<h3>Fix 1: The Inner Hub Dimension Trap</h3>
<p>Inkjet printable CDs and DVDs have a white, absorbent coating on the top. However, the exact size of the clear plastic hole in the center (the hub) varies by manufacturer. Some discs are coated all the way to the center (Hub Printable), while others leave a wide clear plastic ring.</p>
<ul>
  <li>If your design software (like SureThing) is set to print a full-bleed image (e.g., inner diameter of 15mm), but the printer detects you loaded a standard disc (inner diameter of 22mm), the printer knows it will spray wet ink onto clear plastic.</li>
  <li>That wet ink will pool, smear into the drive gears, and ruin the machine.</li>
  <li><strong>Solution:</strong> Open your design software, go to Page Setup, and change the template to <strong>Standard Non-Hub Printable</strong> or manually increase the Inner Diameter setting.</li>
</ul>

<h3>Fix 2: Color Profiling Rejection</h3>
<p>If you import a massive, layered Adobe Illustrator PDF in CMYK color mode directly into PTPublisher, the older 32-bit rendering engine might crash silently in the background, skipping the print phase. Always export your disc artwork as a flattened, high-resolution <strong>RGB JPG or PNG</strong> file before importing it into the Primera software.</p>`
  },
  {
    title: "Fix Primera Bravo Printhead Defective & 4100 Printhead Replacement",
    slug: 'primera-bravo-printhead-cartridge-defective-4100-replacement',
    seoTitle: "Fix Primera Bravo Printhead Defective & Replacement Guide",
    metaDescription: "Is your Primera Bravo 4100 displaying a 'Printhead Cartridge Defective' error? Learn how to clean the contacts, reset the logic board, and replace the printhead.",
    excerpt: "The Bravo 4100 series uses a semi-permanent printhead that sits separate from the individual CMYK ink tanks. When it fails, you must diagnose copper contact corrosion.",
    errorCode: 'Defective Printhead',
    tags: 'Primera, Bravo Printhead Cartridge Defective, Bravo 4100 Printhead Replacement, Printhead Error, Copper Contacts, Inkjet',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: hardwareCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "To fix a 'Printhead Defective' error on a Primera Bravo 4100: 1) Remove the individual CMYK ink cartridges. 2) Unlatch the grey retaining clip and pull out the primary printhead assembly. 3) Inspect the back of the printhead for ink leaks. Wipe the flat copper contact pads with a coffee filter moistened with 99% rubbing alcohol. 4) Wipe the spring-loaded gold pins inside the printer carriage. 5) Reinstall the printhead. If the error remains, the internal heating elements have burned out. You must purchase a replacement OEM Primera 4100-series printhead and perform a software alignment via PTStatus.",
    content: `<h2>Diagnosing 'Printhead Defective' on the Bravo 4100</h2>
<p>Unlike older Bravo SE models that use a combined tri-color cartridge (where the printhead is built into the ink tank), the <strong>Bravo 4100 and 4200 series</strong> utilize a separate, semi-permanent printhead plate and four individual CMYK ink tanks. This saves money on ink, but introduces a new point of failure.</p>

<h2>Fix 1: Cleaning the Electrical Contacts</h2>
<p>The printer communicates with the printhead via an array of flat copper pads on the back of the printhead, which press against spring-loaded gold pogo pins in the carriage. <strong>This is the #1 cause of defective errors.</strong></p>
<ol>
  <li>Open the printer cover and wait for the carriage to move to the center.</li>
  <li>Remove the four ink tanks and set them aside.</li>
  <li>Flip up the grey latch and lift out the black printhead chassis.</li>
  <li>Look at the rear copper pads. If you see blue or magenta ink smeared across them, the circuit is shorting out.</li>
  <li>Gently wipe the pads with <strong>99% Isopropyl Alcohol</strong>. Do the same for the gold pins inside the carriage.</li>
  <li>Allow to dry completely, reinstall, and reboot the printer.</li>
</ol>

<h2>Fix 2: Replacing the Bravo 4100 Printhead</h2>
<p>If cleaning the contacts does not resolve the error, or if you run a nozzle check and entire colors are permanently missing despite multiple deep-cleaning flushes, the thermal resistors inside the printhead have burned out. The printhead has reached the end of its consumable lifespan.</p>

<h3>Installation Steps:</h3>
<ul>
  <li>Purchase a genuine Primera 53471 Printhead.</li>
  <li>Install the new printhead and lock the grey latch.</li>
  <li>Install fresh ink cartridges.</li>
  <li>Open the <strong>PTStatus</strong> software and run the <strong>Align Printhead</strong> utility immediately. Failing to align a new printhead will result in blurry text and misaligned graphics on your CDs.</li>
</ul>`
  },
  {
    title: "Fix Primera Robotic Arm Stuck, ADL-MAX Not Picking Discs & Tray Ejects",
    slug: 'primera-robotic-arm-stuck-adl-max-not-picking-discs-tray-ejects',
    seoTitle: "Fix Primera Robotic Arm Stuck & ADL-MAX Disc Picking",
    metaDescription: "Is your Primera Bravo robotic arm stuck, dropping discs, or is the ADL-MAX failing to pick up CDs? Learn how to clean the picking mechanism and align the input bins.",
    excerpt: "Robotic disc publishers rely on precise optical alignment and mechanical grippers to move media. When the arm gets stuck, it is usually a calibration or friction issue.",
    errorCode: 'Robotic Arm Error',
    tags: 'Primera, Bravo Disc Publisher Robotic Arm Stuck, ADL-MAX Not Picking Discs, Bravo Tray Ejects Unexpectedly, Disc Dropping, Picker Mechanism',
    wordCount: 1150,
    difficultyLevel: 'Advanced',
    timeToFix: '15 minutes',
    categoryId: hardwareCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredSnippet: "To fix a Primera Bravo robotic arm that is stuck or dropping discs: 1) Clean the Picker Fingers: The robotic arm uses 3 small rubber or plastic 'fingers' that expand inside the hole of the CD to pick it up. Over time, plastic dust from the discs coats these fingers, causing them to slip and drop discs. Clean them with an alcohol swab. 2) Unstick the Arm: If the arm grinds and gets stuck on the left or right rail, turn the printer OFF. Manually slide the arm back and forth along the metal rail to free it. Apply a tiny drop of white lithium grease to the rail. 3) ADL-MAX Alignment: If the arm misses the bin entirely, the input bins are not seated correctly in their alignment pegs.",
    content: `<h2>Troubleshooting the Primera Robotic Arm</h2>
<p>The robotic arm in a Primera Bravo disc publisher is an incredible piece of automation, but it operates in a dusty environment. If the arm freezes, grinds against the sides, or drops discs midway to the printer tray, mechanical friction is the culprit.</p>

<h2>Fix 1: Cleaning the Picker Fingers</h2>
<p>The arm picks up discs by lowering into the center hole of the CD/DVD and expanding three small "fingers" outward to grip the inner plastic ring.</p>
<ul>
  <li><strong>The Problem:</strong> Blank discs often have microscopic burrs of plastic left over from the manufacturing mold. As the picker grabs them, this plastic dust sheds, coating the picker fingers. They lose friction and drop the disc.</li>
  <li><strong>The Fix:</strong> With the printer off, manually pull the arm to the center. Use a cotton swab dipped in rubbing alcohol to thoroughly clean the three expandable fingers on the bottom of the picker mechanism.</li>
</ul>

<h2>Fix 2: Sticking on the Guide Rail</h2>
<p>If the arm attempts to move but emits a loud grinding or clicking sound and halts, the stepper motor is fighting too much resistance on the metal guide rail.</p>
<ol>
  <li>Power off the unit.</li>
  <li>Gently grab the robotic arm and slide it from the far left to the far right. If you feel a "sticky" or rough patch, the rail has accumulated dust or dried grease.</li>
  <li>Wipe the metal rail clean with a dry cloth.</li>
  <li>Apply a very small amount of <strong>white lithium grease or sewing machine oil</strong> to the rail. Slide the arm back and forth 10 times to distribute it evenly.</li>
</ol>

<h2>Fix 3: ADL-MAX Auto Disc Loader Misalignment</h2>
<p>If you use the high-capacity ADL-MAX attachment and the arm descends but crashes into the edge of the disc instead of entering the center hole, the input bin is misaligned.</p>
<ul>
  <li>Remove all discs from the bin.</li>
  <li>Lift the plastic bin out completely. Look at the bottom; there are specific alignment pegs that must seat deeply into the holes on the base plate. If a cable or a dropped disc is wedged under the bin, it will sit at an angle, causing the robotic arm to miss the target coordinates.</li>
</ul>`
  },
  {
    title: "Primera Bravo SE vs Pro, Firmware Update Failed & Signature Composer",
    slug: 'primera-bravo-se-vs-pro-firmware-update-failed-signature-composer',
    seoTitle: "Primera Bravo SE vs Pro & Signature Composer Troubleshooting",
    metaDescription: "Comparing the Primera Bravo SE and Bravo Pro disc publishers? Learn the differences, how to recover from a failed firmware update, and fix Signature Composer.",
    excerpt: "The Bravo SE is for low-volume desktop use, while the Bravo Pro handles massive throughput. Learn how to troubleshoot legacy software and recover bricked firmware.",
    errorCode: 'Firmware Update Failed',
    tags: 'Primera, Bravo SE vs Bravo Pro Difference, Bravo Firmware Update Failed, Signature Composer Combo Troubleshooting, Disc Publisher, Firmware Flash',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: setupCategory,
    authorId: authors.david,
    reviewerId: authors.elena,
    featuredSnippet: "Primera Bravo SE vs Bravo Pro Difference: The Bravo SE is the entry-level desktop model, featuring a 20-disc capacity, one burner drive, and a single tri-color ink cartridge. The Bravo Pro (and 4100/4200 series) is the industrial model, featuring a 100-disc capacity, dual burner drives for twice the throughput, and separate CMYK high-capacity ink tanks. If a Firmware Update Failed and the printer is unresponsive (bricked): Unplug the USB and power cables. Wait 30 seconds. Plug power back in while holding the front panel button to force the logic board into 'Bootloader Mode', then re-run the firmware update utility.",
    content: `<h2>Choosing the Right Disc Publisher: SE vs. Pro</h2>
<p>Primera dominates the optical disc publishing market, but choosing between the entry-level SE and the flagship Pro (or 4200 series) depends entirely on your production volume.</p>

<h3>The Bravo SE (Standard Edition)</h3>
<ul>
  <li><strong>Capacity:</strong> 20 discs per run.</li>
  <li><strong>Hardware:</strong> 1 optical burner drive.</li>
  <li><strong>Ink System:</strong> Uses a single, combined tri-color (Cyan/Magenta/Yellow) cartridge. If you run out of Cyan, you must throw the whole cartridge away.</li>
  <li><strong>Best For:</strong> Small churches, independent musicians, and low-volume data archiving.</li>
</ul>

<h3>The Bravo Pro / 4200 Series</h3>
<ul>
  <li><strong>Capacity:</strong> 100 discs per run (using the included Kiosk kit).</li>
  <li><strong>Hardware:</strong> 2 optical burner drives operating simultaneously.</li>
  <li><strong>Ink System:</strong> Uses 4 separate, high-capacity CMYK ink tanks.</li>
  <li><strong>Best For:</strong> Video production houses, software distributors, and high-volume medical imaging centers.</li>
</ul>

<h2>Recovering from a "Firmware Update Failed" Error</h2>
<p>Updating the firmware on a robotic publisher is risky. If your Windows PC goes to sleep, or the USB cable is bumped during the flash process, the printer's logic board will be corrupted (bricked). The printer will flash all its lights and refuse to connect to PTStatus.</p>
<ol>
  <li>Unplug both the Power cable and the USB cable from the back of the printer.</li>
  <li>Wait 60 seconds to let the capacitors drain.</li>
  <li><strong>Bootloader Mode:</strong> Press and hold the main button on the front of the printer. While continuing to hold the button down, plug the power cable back in.</li>
  <li>Keep holding the button for 5 seconds, then release. The printer should now be in emergency bootloader mode.</li>
  <li>Plug the USB cable in. Open the Primera Firmware Update Utility on your PC and run the flash process again. <strong>Do not touch the PC until it finishes.</strong></li>
</ol>

<h2>Legacy Signature Composer Troubleshooting</h2>
<p>If you are using a 15-year-old Primera Signature series printer and the <strong>Signature Composer</strong> software won't detect the COM port on a modern Windows 10/11 machine, you must run the software in Compatibility Mode. Right-click the shortcut, select Properties &gt; Compatibility, and check "Run this program in compatibility mode for: Windows XP (Service Pack 3)". Furthermore, ensure you are using a high-quality USB-to-Parallel or USB-to-Serial adapter with an FTDI chipset, as cheap adapters will drop data packets.</p>`
  }
];

async function main() {
  const brandSlug = 'primera-technology';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 3 (Cluster D: Bravo Disc Publishers) for brand: ${brand.name}`);

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
