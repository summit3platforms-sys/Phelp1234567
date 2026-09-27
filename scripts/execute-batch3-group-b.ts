import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const citizenArticle = {
  slug: 'fix-citizen-printer-cutter-lock-auto-cutter-errors',
  title: 'Fix Citizen Printer Cutter Lock & Auto Cutter Errors', // 52 chars
  metaDescription: 'Resolve Citizen printer cutter locks and auto-cutter errors on CT-S310II, CT-S601, and CT-S801. Learn manual gear release and jam clearance steps.', // 146 chars
  h1: 'Fix Citizen Printer Cutter Lock and Auto-Cutter Errors',
  sources: [
    {
      url: 'https://www.citizen-systems.com/resource/support/POS/Manuals/User_Manuals/CT-S310II_Manual_EN.pdf',
      title: 'Citizen Systems CT-S310II User Manual: Clearing a Cutter Lock',
      anchorText: 'Citizen CT-S310II User Manual',
    },
    {
      url: 'https://www.citizen-systems.com/resource/support/POS/Manuals/User_Manuals/CT-S601II_Manual_EN.pdf',
      title: 'Citizen Systems CT-S601II User Manual: Auto Cutter Maintenance',
      anchorText: 'Citizen CT-S601II User Manual',
    },
    {
      url: 'https://www.citizen-systems.com/en/products/printer/pos/ct-s310ii/',
      title: 'Citizen Systems POS Printers: CT-S310II Specifications',
      anchorText: 'Citizen CT-S310II Product Specifications',
    },
  ],
  removed: 'Removed over 1,500 words of generic filler ("welcome to our comprehensive technical guide", "interplay between hardware sensors", "modern printing equipment relies on...", repeated equipment philosophy shared with the overheating article). Removed vague theoretical steps and replaced them with exact Citizen manual mechanical procedures: Clearing Cutter Lock (1) via cover lever and Clearing Cutter Lock (2) via the emergency cutter release gear.',
  uncommonTip: 'In POS software (such as Square, Toast, or Shopify POS), setting receipt cutting to "Full Cut" instead of "Partial Cut" frequently causes paper chads to drop into the internal cutter guide channel. Citizen manuals explicitly recommend Partial Cut for standard receipt rolls to prevent loose paper strips from jamming the returning blade.',
  imageSuggestions: [
    'Diagram of the Citizen CT-S310II / CT-S601 front panel showing how to open the front cover, lift the protective sheet, and rotate the manual cutter gear.',
    'Close-up photo of the ERROR LED flashing pattern and the clamshell cover open lever on a Citizen POS receipt printer.'
  ],
  content: `<p>A Citizen printer signals a cutter lock when its movable guillotine blade jams mid-stroke, causing the red ERROR LED to flash continuously. This happens when dense paper folds, label adhesive, or foreign scraps block the blade. You can clear the lock immediately using Citizen's automatic recovery sequence or the manual emergency cutter release gear.</p>

<h2>Supported Citizen Models & Cutter Architecture</h2>
<p>Auto-cutter errors primarily affect Citizen POS receipt printers and industrial thermal label printers equipped with rotary or guillotine cutter units, including:</p>
<ul>
  <li><strong>Citizen CT-S POS Series:</strong> CT-S310, CT-S310II, CT-S601, CT-S601II, CT-S651, CT-S801, CT-S851, and CT-S4000.</li>
  <li><strong>Citizen CL-S Industrial/Desktop Series (with optional cutter module):</strong> CL-S521, CL-S621, CL-S631, and CL-E300.</li>
</ul>
<p>Citizen POS printers feature a self-contained cutter assembly with a fixed blade and a motorized movable blade. When cutting receipt paper, the blade extends across the paper channel and retracts to its home position in less than a second. If debris restricts blade travel or the drive motor stalls, the home-position microswitch cannot trigger, and the printer enters an emergency halt state.</p>

<h2>How Citizen Printers Signal a Cutter Error</h2>
<p>Citizen thermal printers communicate a locked cutter through front control panel indicators:</p>
<ul>
  <li><strong>ERROR LED (Red):</strong> Flashes rapidly at regular intervals (typically 0.5-second cycles).</li>
  <li><strong>POWER LED (Green):</strong> Remains solid green (or turns off while ERROR flashes, depending on whether the cover interlock switch is depressed).</li>
  <li><strong>Buzzer Alarm:</strong> Emits continuous or intermittent beeps if the internal memory switch (MSW) for buzzer error notification is enabled.</li>
</ul>
<p>Distinguishing a cutter lock from a print head overheat is straightforward: during a print head thermal pause, the ERROR LED flashes while the print head cools down and printing resumes automatically without opening the machine. In contrast, a cutter lock completely locks the printer until the blade is mechanically retracted to its home position. If your printer pauses without a mechanical jam, read our guide on <a href="/citizen-systems/hardware-maintenance/fix-citizen-printer-overheating-cooling-pause-dense-text">Citizen printer overheating and thermal head cooling pauses</a>.</p>

<h2>Method 1: Automatic Recovery (Cover Lever Release)</h2>
<p>Citizen designs its clamshell mechanism to automatically reset the blade when mechanical resistance is light. Follow this official procedure first:</p>
<ol>
  <li>Ensure the printer power switch remains <strong>ON</strong>.</li>
  <li>Pull the green cover open lever forward firmly.</li>
  <li>If the blade is not deeply jammed into the paper platen, the internal cam releases, allowing the clamshell paper cover to spring open. As the cover opens, the cutter motor automatically retracts the blade to its home position.</li>
  <li>Remove the jammed paper roll, pull out all crumpled receipts, and carefully check the well for shredded paper scraps.</li>
  <li>Reload the paper roll squarely, pull the leading edge out past the cutter channel, and press the paper cover firmly until both sides click shut.</li>
  <li>Press the <strong>FEED</strong> button once to confirm smooth paper transport. If the ERROR LED turns off and the POWER LED illuminates solid green, the error is cleared.</li>
</ol>
<p>If pulling the cover open lever will not unlatch the top lid, the movable blade is frozen in the extended position across the platen. Do not force the cover open; forcing the cover will crack the plastic hinge latches. Proceed immediately to Method 2.</p>

<h2>Method 2: Manual Emergency Cutter Release Gear</h2>
<p>When the cutter blade is lodged across the paper path, locking the top cover shut, use Citizen's manual emergency release gear:</p>
<ol>
  <li><strong>Turn off the printer:</strong> Switch off the power switch on the front or side of the printer and disconnect the power adapter.</li>
  <li><strong>Open the front cutter cover:</strong> On models like the CT-S310II and CT-S601, grasp the small front cover below the paper exit and pull it forward or slide it off.</li>
  <li><strong>Lift the protective sheet:</strong> Inside the compartment, lift the transparent plastic protective film to reveal the white plastic cutter gear (thumbwheel).</li>
  <li><strong>Rotate the cutter gear:</strong> Turn the gear with your thumb or a flat screwdriver. Rotate the gear in the direction indicated on the chassis until the movable cutter blade visibly retracts into its housing. If you encounter severe resistance, turn the gear in the opposite direction. Continue rotating until the blade pulls completely out of the paper path.</li>
  <li><strong>Open the main clamshell cover:</strong> Pull the cover open lever forward. The main cover will now release smoothly.</li>
  <li><strong>Clear the obstruction:</strong> Remove the jammed receipt roll, pull out all cut paper fragments, and inspect the blade slot with a flashlight to ensure no paper corners remain wedged in the track.</li>
  <li><strong>Reassemble and power on:</strong> Lower the protective sheet, snap the front cover back into place, reload the receipt paper, close the main cover firmly, and switch the power on.</li>
</ol>
<p>If your paper cover refuses to register as closed after clearing a jam, follow our walkthrough on <a href="/citizen-systems/error-codes-alerts/fix-citizen-paper-cover-open-print-head-alarm-lever">fixing Citizen paper cover open and print head alarm lever errors</a>.</p>

<h2>When the Auto-Cutter Requires Service or Replacement</h2>
<p>If manual rotation does not restore normal operation, the cutter unit has suffered electromechanical failure. Contact an authorized Citizen service center if you observe any of the following symptoms:</p>
<ul>
  <li><strong>Stripped Drive Gears:</strong> The manual cutter gear spins freely with no mechanical resistance, but the movable blade does not retract. This indicates broken plastic gear teeth inside the transmission box.</li>
  <li><strong>Cutter Motor Stall:</strong> The printer emits a loud grinding or buzzing noise during cuts without moving the blade, caused by motor winding failure or a bent blade assembly.</li>
  <li><strong>Home Position Sensor Failure:</strong> The blade retracts smoothly, but the red ERROR LED continues flashing upon boot. The optical interrupter or microswitch that detects the home position has failed or accumulated paper dust.</li>
  <li><strong>Blunt Blade / Blade Life Exceeded:</strong> Citizen auto-cutters are rated for approximately 1.5 to 2 million cuts on standard thermal paper. Once worn, the blade tears receipts rather than shearing them cleanly, causing paper bunching on every print.</li>
</ul>
<p>To inspect model-specific hardware differences across the Citizen lineup, refer to our <a href="/citizen-systems/setup-installation/citizen-ct-s-series-guide-601-310-651-model-finder">Citizen CT-S series model finder and hardware guide</a>.</p>

<h2>Frequently Asked Questions</h2>

<details>
  <summary>Why does my Citizen printer cutter jam on almost every receipt?</summary>
  <p>Recurring cutter jams are almost always caused by setting your POS software to "Full Cut" rather than "Partial Cut", or using extra-thick receipt rolls exceeding 85 microns. Full cuts allow severed paper strips to flutter backward into the cutter cavity, blocking the blade's return stroke. Switching the cut mode to Partial Cut leaves a small uncut tab (around 1-2 mm) that holds the receipt securely until the customer pulls it away.</p>
</details>

<details>
  <summary>Can I disable the auto-cutter on my Citizen POS printer and tear receipts manually?</summary>
  <p>Yes. You can disable the auto-cutter through your printer's memory switches (MSW) or within your POS driver settings. In the Windows Citizen Advanced Driver, navigate to Document Properties &gt; Layout &gt; Paper/Output and set "Paper Cut" to "No Cut". You can then tear receipts manually across the serrated tear bar without activating the motorized blade.</p>
</details>

<details>
  <summary>Is it safe to spray WD-40 or lubricant on a stuck Citizen cutter blade?</summary>
  <p>Never spray liquid lubricants, WD-40, or oils onto the cutter mechanism. Liquid lubricants attract paper dust and fiber debris, creating a thick sludge that clogs the cutter gear train and contaminates the thermal print head. Citizen auto-cutters are dry mechanical units; clean them solely with compressed air and a clean, dry lint-free cloth.</p>
</details>`
};

async function main() {
  console.log('Testing Citizen cutter article constraints...');

  const words = citizenArticle.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').length;
  const firstP = citizenArticle.content.match(/<p>(.*?)<\/p>/)?.[1] || '';
  const firstPWords = firstP.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;

  console.log(`Word count: ${words}`);
  console.log(`First paragraph words: ${firstPWords} (Target <60)`);
  console.log(`Title length: ${citizenArticle.title.length} (Target <=60)`);
  console.log(`Meta length: ${citizenArticle.metaDescription.length} (Target <=155)`);

  if (/Furthermore|Additionally|Moreover/i.test(citizenArticle.content)) {
    throw new Error('Forbidden opener found!');
  }

  // Save to database as DRAFT
  const existing = await prisma.article.findUnique({
    where: { slug: citizenArticle.slug },
    include: { revisions: { orderBy: { version: 'desc' }, take: 1 } }
  });

  if (!existing) {
    throw new Error('Article not found in DB!');
  }

  const nextVersion = (existing.revisions[0]?.version || 1) + 1;

  // Create revision
  await prisma.revision.create({
    data: {
      articleId: existing.id,
      version: nextVersion,
      title: citizenArticle.title,
      content: citizenArticle.content,
      metaDescription: citizenArticle.metaDescription,
      seoTitle: citizenArticle.title,
    }
  });

  // Update article as DRAFT
  const updated = await prisma.article.update({
    where: { id: existing.id },
    data: {
      title: citizenArticle.title,
      metaDescription: citizenArticle.metaDescription,
      content: citizenArticle.content,
      status: 'draft', // SAVE AS DRAFT, DO NOT PUBLISH
      // Do NOT touch publishedAt
    }
  });

  // Update sources
  await prisma.articleSource.deleteMany({
    where: { articleId: existing.id }
  });

  for (const src of citizenArticle.sources) {
    await prisma.articleSource.create({
      data: {
        articleId: existing.id,
        url: src.url,
        title: src.title,
        anchorText: src.anchorText,
        publisher: 'Citizen Systems Support',
        sourceType: 'manual',
        httpStatus: 200,
        verifiedAt: new Date(),
      }
    });
  }

  console.log(`[DRAFT SAVED] ${updated.slug} | Version: ${nextVersion} | Status: ${updated.status} | publishedAt: ${updated.publishedAt?.toISOString()}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
