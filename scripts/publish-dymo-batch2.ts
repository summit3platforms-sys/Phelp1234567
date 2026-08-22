import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
const maintenanceCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';
const printQualityCategory = 'e3d26347-33bf-41a7-9cbf-c3d821850f98';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix DYMO LabelWriter Printing Blank Labels & Skipping",
    slug: 'dymo-labelwriter-printing-blank-labels-skipping',
    seoTitle: "Fix DYMO LabelWriter Printing Blank Labels (Sensor Clean)",
    metaDescription: "Is your DYMO LabelWriter printing blank labels or skipping labels between prints? Learn how to clean the optical sensor and load the roll correctly.",
    excerpt: "If your DYMO spits out 5 blank labels for every 1 printed label, the optical sensor that detects the gaps between labels is blind or misaligned.",
    errorCode: null,
    tags: 'DYMO, LabelWriter, Blank Labels, Skipping Labels, Stuck on one label, Sensor',
    wordCount: 950,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: maintenanceCategory,
    authorId: authors.elena,
    reviewerId: authors.alex,
    featuredSnippet: "To fix a DYMO LabelWriter printing blank labels or skipping: 1) Remove the label roll from the printer. 2) Look inside the left side of the paper path feed. You will see a small rectangular hole—this is the optical gap sensor. 3) Blow compressed air into this hole to remove white paper dust. If dust covers the sensor, the printer cannot 'see' the gaps between the labels, causing it to feed continuously. 4) Reload the labels, ensuring the roll is pushed all the way to the LEFT side of the spool so it aligns perfectly with the sensor.",
    content: `<h2>Why the Printer Skips Labels</h2>
<p>Unlike standard paper printers, DYMO LabelWriters do not print continuously; they must print perfectly within the borders of a die-cut sticker. To do this, they shine an optical beam (or infrared light) through the paper to detect the black index marks or the physical gaps between the labels.</p>
<p>If the printer cannot "see" the gap, it assumes the label is infinitely long. It will keep advancing the roll, spitting out blank labels until it finally errors out or gets stuck.</p>

<h2>Fix 1: The Left-Alignment Rule</h2>
<p>The most common cause of skipping labels is user error during loading. The optical sensor on almost all DYMO LabelWriters (like the 450 and 550) is fixed in position on the <strong>left side</strong> of the paper path.</p>
<ul>
    <li>Remove the black plastic spool holding your label roll.</li>
    <li>Take the roll off the spool. Ensure the labels are feeding from underneath the roll, not over the top.</li>
    <li>Place the roll back onto the spool spindle. <strong>Push the roll as hard as you can against the left side of the spool.</strong></li>
    <li>Slide the right retaining disc onto the spool and push it flush against the paper roll. If there is even a 2-millimeter gap allowing the roll to wobble left and right, the labels will slide away from the optical sensor, causing blank prints.</li>
</ul>

<h2>Fix 2: Cleaning the Optical Sensor</h2>
<p>Because the printer feeds thousands of feet of paper, white chalky paper dust builds up inside the machine. Eventually, this dust coats the optical sensor.</p>
<ol>
    <li>Unplug the printer and remove the label roll entirely.</li>
    <li>Take a flashlight and look into the black plastic feed path where you insert the labels.</li>
    <li>On the left side of the path, you will see a small cutout or slot containing the sensor.</li>
    <li>Take a can of compressed air and blast the dust out of this slot. (Do not poke a Q-tip blindly into the hole, as you may knock the sensor out of alignment).</li>
    <li>Reload the labels. Press the blue feed button on the front of the printer once. It should feed exactly one label and stop perfectly on the gap.</li>
</ol>`
  },
  {
    title: "Fix DYMO Prints Faint, Blurry Barcodes & Streaky Lines",
    slug: 'dymo-printer-prints-faint-blurry-streaks',
    seoTitle: "Fix DYMO Prints Faint, Blurry & Streaky (Mac CUPS Fix)",
    metaDescription: "Are your DYMO labels printing too light, or are the barcodes too blurry to scan? Learn how to clean the thermal print head and adjust Mac CUPS print density.",
    excerpt: "Because DYMO uses direct thermal printing without ink, faint text and streaky lines are caused by dirt blocking the heat or incorrect software density settings.",
    errorCode: null,
    tags: 'DYMO, Faint Print, Blurry Barcode, Streaks, Print Density, Mac CUPS',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: printQualityCategory,
    authorId: authors.marcus,
    reviewerId: authors.david,
    featuredSnippet: "To fix faint or streaky prints on a DYMO LabelWriter: 1) Unplug the printer and remove the labels. 2) The most common cause is a dirty print head. Use the official DYMO Cleaning Card (run it through the printer 2-3 times) or use a Q-tip dipped in 99% isopropyl alcohol to wipe the ceramic heater line inside the paper path. 3) If the print is uniformly light, especially on a Mac, you must increase the Print Density. Go to localhost:631 in your browser to access the CUPS menu, find your DYMO printer, and change the Print Density setting from 'Normal' to 'Dark'.",
    content: `<h2>Understanding Direct Thermal Quality</h2>
<p>Your DYMO LabelWriter does not use ink or toner. It uses a ceramic print head that heats up to hundreds of degrees, burning the image into chemically treated thermal paper. Therefore, if the print is faint, streaky, or blurry, there are only two possible causes: the heat is not reaching the paper (physical barrier), or the printer is not generating enough heat (software density).</p>

<h2>Fix 1: Cleaning the Ceramic Print Head</h2>
<p>If you see a perfectly straight, vertical white line running down the entire length of your printed label, a microscopic piece of dirt, adhesive, or label backing is stuck to the print head. This dirt blocks the heat from touching the paper.</p>
<ol>
    <li>Unplug the printer and remove the label roll.</li>
    <li><strong>The Cleaning Card:</strong> If you kept the white cardboard cleaning card that came with the printer, push it into the feed path. Manually pull it back and forth a few times to scrub the print head.</li>
    <li><strong>The Manual Clean:</strong> If you don't have the card, wrap a lint-free cloth over a thin piece of plastic (like a credit card), dip it in rubbing alcohol, and gently scrub the thermal head located directly above the rubber platen roller. Let it dry for 5 minutes before printing.</li>
</ol>

<h2>Fix 2: Adjusting Print Density (Windows)</h2>
<p>If your labels are completely free of streaks, but the text is just uniformly light grey instead of pitch black, you need to increase the heat output.</p>
<ul>
    <li>Open Windows <strong>Printers &amp; Scanners</strong>.</li>
    <li>Click your DYMO printer and select <strong>Printing Preferences</strong>.</li>
    <li>Click the <strong>Advanced</strong> button.</li>
    <li>Look for the <strong>Print Density</strong> slider. Move it from Normal to Dark (or Light to Medium, depending on your driver version). Apply the settings.</li>
</ul>

<h2>Fix 3: Adjusting Print Density (Mac CUPS Method)</h2>
<p>On macOS, adjusting the DYMO print density is notoriously difficult because Apple hides the advanced printer options. If your shipping barcodes are printing too lightly to scan on a Mac, you must use the hidden CUPS interface.</p>
<ol>
    <li>Open the <strong>Terminal</strong> app on your Mac. Type <code>cupsctl WebInterface=yes</code> and press Enter. (This unlocks the hidden menu).</li>
    <li>Open the Safari web browser and type <code>http://localhost:631</code> into the address bar.</li>
    <li>Click the <strong>Printers</strong> tab at the top.</li>
    <li>Click on your DYMO LabelWriter.</li>
    <li>Click the <strong>Administration</strong> dropdown menu and select <strong>Set Default Options</strong>.</li>
    <li>Find the <strong>Print Density</strong> or <strong>Darkness</strong> setting. Change it from Normal/Medium to <strong>Dark</strong>.</li>
    <li>Click Save (you may be prompted for your Mac administrator password). Your barcodes will now print dark and scannable.</li>
</ol>`
  },
  {
    title: "DYMO Printer 'Error Printing' Message (Windows Fix)",
    slug: 'dymo-printer-error-printing-message-not-printing',
    seoTitle: "Fix DYMO 'Error Printing' Message (Windows 11 / 10)",
    metaDescription: "Are you getting a generic 'Error Printing' message when trying to use your DYMO LabelWriter? Learn how to clear the corrupted Windows print spooler and reset the queue.",
    excerpt: "You hit print, and a tiny Windows notification pops up saying 'Error Printing on DYMO'. The printer sits silently. Here is how to clear the corrupted queue.",
    errorCode: 'Error Printing',
    tags: 'DYMO, Error Printing, Not Printing, Windows, Print Spooler, Queue',
    wordCount: 800,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: errorCategory,
    authorId: authors.david,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix the 'Error Printing' message on a DYMO LabelWriter in Windows: 1) Type 'Printers & Scanners' into your Windows search bar and open it. 2) Click your DYMO printer and select 'Open Queue'. 3) You will see a list of stuck print jobs. Click the three dots (or the Printer menu) and select 'Cancel All Documents'. 4) If they refuse to delete, unplug the USB cable from the printer. 5) Restart your computer to clear the Windows Print Spooler memory. 6) Plug the USB cable back in and try printing a new label.",
    content: `<h2>The Generic Windows Spooler Crash</h2>
<p>If you are using DYMO Connect or a third-party app, click print, and instantly receive a Windows notification stating <strong>"Error Printing on DYMO LabelWriter,"</strong> the printer hardware is usually fine. The issue is a digital traffic jam in the Windows Print Spooler.</p>
<p>Windows tries to convert the image of the label into raw data the printer can understand. If the data gets corrupted (often due to mismatched label sizes in the software), the data gets stuck in the queue, blocking all future prints.</p>

<h2>Fix 1: Clearing the Print Queue</h2>
<p>You cannot print anything else until you delete the corrupted file.</p>
<ol>
    <li>Click the Windows Start button, type <strong>Printers &amp; Scanners</strong>, and open the menu.</li>
    <li>Click on your DYMO printer and select <strong>Open Queue</strong>.</li>
    <li>Right-click anywhere in the white space (or click the Printer tab at the top) and select <strong>Cancel All Documents</strong>.</li>
    <li>Wait for the window to become completely empty.</li>
</ol>
<p><em>If the documents say "Deleting..." but never actually disappear, the Spooler service is frozen. Unplug the printer's USB cable, restart your computer completely, and check the queue again. It should be empty upon reboot.</em></p>

<h2>Fix 2: The Label Size Mismatch</h2>
<p>The most common reason the Spooler crashes in the first place is a mismatch between the software and the hardware.</p>
<p>If you load a 1" x 2" label roll into the printer, but your DYMO software template is set to print a massive 4" x 6" shipping label, the Windows driver will detect the mismatch and instantly throw the "Error Printing" message to prevent wasting labels.</p>
<p>Always double-check that the label size selected in DYMO Connect perfectly matches the physical roll currently loaded in the machine.</p>`
  },
  {
    title: "Fix DYMO Out of Paper Error (When Labels Are Loaded)",
    slug: 'dymo-printer-out-of-paper-error-label-loaded',
    seoTitle: "Fix DYMO 'Out of Paper' Error When Labels Are Loaded",
    metaDescription: "Is your DYMO LabelWriter flashing an 'Out of Paper' error even though the label roll is fully loaded? Learn how to fix the gap sensor and the 550 RFID reader.",
    excerpt: "There is nothing more frustrating than a printer demanding paper when you can clearly see a brand new roll of labels sitting inside it.",
    errorCode: 'Out of Paper',
    tags: 'DYMO, Out of Paper, Error, Labels Loaded, 550 RFID, Sensor',
    wordCount: 850,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: errorCategory,
    authorId: authors.alex,
    reviewerId: authors.elena,
    featuredSnippet: "To fix a false 'Out of Paper' error on a DYMO LabelWriter: 1) Verify the labels are pushed entirely to the LEFT side of the spool; if they slide to the right, the optical sensor thinks the machine is empty. 2) If using a new LabelWriter 550, verify you are using genuine DYMO labels. The 550 uses an RFID chip inside the cardboard core; if you use third-party labels without a chip, the printer will falsely report 'Out of Paper' because it cannot read the chip. 3) Clean the black optical sensor slot on the left side of the paper path with compressed air.",
    content: `<h2>Why the Printer Thinks It's Empty</h2>
<p>A DYMO LabelWriter relies on physical and optical sensors to know if paper is loaded. If you are receiving an <strong>"Out of Paper"</strong> error on your computer screen (or the blue light on the front of the printer is flashing), a sensor is being blocked or bypassed.</p>

<h2>Fix 1: The LabelWriter 550 RFID Trap</h2>
<p>If you recently upgraded from an older LabelWriter 450 to a new <strong>LabelWriter 550 or 5XL</strong>, you must understand DYMO's new DRM (Digital Rights Management) system.</p>
<p>The 500 series uses a small RFID reader inside the right side of the label spool mount. Genuine DYMO labels now have an RFID microchip embedded in the cardboard core. The printer reads this chip to know exactly how many labels are left on the roll.</p>
<p><strong>If you insert third-party, aftermarket labels (which do not have the chip), the printer will flash and throw an "Out of Paper" or "Labels Not Detected" error.</strong> It is not broken; it is intentionally locking you out. You must buy genuine DYMO labels for the 550 series.</p>

<h2>Fix 2: Left-Side Alignment (For Older Models)</h2>
<p>If you are using an older 450, 4XL, or a Dymo Twin Turbo, the printer uses a simple optical sensor located on the far left side of the paper feed path.</p>
<p>If you loaded the roll onto the spool, but failed to push the black retaining disc tightly against the roll, the paper can slide to the right. As soon as the paper slides away from the left wall, it uncovers the optical sensor. The sensor sees empty space and immediately triggers the "Out of Paper" error, halting your print job.</p>
<p>Remove the spool, push the roll tight against the left wall, secure it with the retaining disc, and feed the paper straight down.</p>

<h2>Fix 3: The Black Index Mark</h2>
<p>Some specialty DYMO labels (like clear plastic labels or jewelry tags) do not have physical gaps between them. Instead, they have a thick black line printed on the back of the liner.</p>
<p>If you insert these labels upside down, the optical sensor cannot see the black index mark. Ensure the labels are feeding from underneath the roll, with the label face pointing up, and the black marks pointing down toward the sensor.</p>`
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
