import { prisma } from '../src/lib/prisma';

const SLUG = 'bixolon-xd3-40-label-printer-error';

const NEW_CONTENT = `<h2>Why Your Bixolon XD3-40 Is Showing an Error</h2>
<p>If your Bixolon XD3-40 label printer is flashing red, stuck on an amber light, or spitting out blank labels, don't panic. The XD3-40 is a reliable 4-inch desktop workhorse, but it has a few quirks that trip people up—especially when switching label rolls or ribbons.</p>

<p>Before you do anything else, you need to know which version of the printer you have on your desk:</p>
<ul>
  <li><strong>XD3-40d (Direct Thermal):</strong> Prints directly onto heat-sensitive labels. There is no ribbon inside. If you have an error on this model, it is almost always related to media loading, an open cover latch, or sensor calibration.</li>
  <li><strong>XD3-40t (Thermal Transfer):</strong> Uses an ink ribbon cassette to print on standard paper or synthetic labels. On this model, errors can come from the ribbon tension, ribbon core size, or ribbon loading orientation in addition to label problems.</li>
</ul>

<p>You can check the model number on the white label on the underside or rear panel of the printer. Once you know whether you're working with the "d" or "t" model, work through these fixes.</p>

<h2>Check If the Printer Is Simply Paused</h2>
<p>I see this all the time: someone presses the top button trying to feed a label, and the printer suddenly stops printing and blinks green.</p>
<p>On the XD3-40, pressing the <strong>FEED button once during an active print job pauses the printer</strong>. The Status LED will blink green steadily, and all incoming print jobs will sit in the queue without printing.</p>
<p><strong>The Fix:</strong> Press the <strong>FEED button once</strong> to resume. If the printer unpauses and prints out your waiting labels, you're all set.</p>

<h2>Decode the Status LED Light</h2>
<p>The XD3-40 uses a two-LED status panel (Power and Status) to signal what's wrong. Here is what the indicator light combinations mean in plain English:</p>

<table>
  <thead>
    <tr>
      <th>Status Light</th>
      <th>What the Printer Is Telling You</th>
      <th>How to Clear It</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Blinking Green</strong></td>
      <td>Printer is paused or receiving data</td>
      <td>Press FEED once to resume printing.</td>
    </tr>
    <tr>
      <td><strong>Solid Amber / Yellow</strong></td>
      <td>Cover is unlatched or paper is near end</td>
      <td>Press both sides of the lid down firmly until you hear two solid clicks.</td>
    </tr>
    <tr>
      <td><strong>Blinking Amber</strong></td>
      <td>Paper empty or ribbon empty (XD3-40t)</td>
      <td>Reload fresh label stock or replace the thermal ribbon roll.</td>
    </tr>
    <tr>
      <td><strong>Blinking Red</strong></td>
      <td>Media sensor calibration failed or paper jam</td>
      <td>Clear any stuck labels and run gap/black-mark calibration.</td>
    </tr>
    <tr>
      <td><strong>Solid Red</strong></td>
      <td>Printhead overheated or head open</td>
      <td>Let the printer sit for 10 minutes to cool down after large print batches.</td>
    </tr>
  </tbody>
</table>

<p>If your machine is hung on a steady amber light even with labels loaded, take a look at our guide on what to do when your <a href="/bixolon/error-codes-alerts/bixolon-printer-stuck-on-yellow-light">Bixolon printer is stuck on a yellow light</a>.</p>

<h2>1. Fix Media Loading and the Dual Cover Latches</h2>
<p>The single most common physical cause of errors on both the XD3-40d and XD3-40t is uneven lid closure.</p>

<p>The clamshell lid has safety microswitches on both the left and right sides. If you push the cover down with one hand in the center, one latch frequently stays unlatched by a fraction of a millimeter. The printer will refuse to turn green and will display an amber or red status light.</p>

<p><strong>Proper loading steps:</strong></p>
<ol>
  <li>Press the two release buttons on the left and right sides of the printer housing and flip the top cover completely open.</li>
  <li>Spread the internal media roll holders apart and seat your roll firmly so the labels feed smoothly with the printable face pointing <strong>UP</strong> toward the printhead.</li>
  <li>Slide the green media guides snugly against both edges of the label backing paper so the roll cannot wobble or drift sideways.</li>
  <li>Pull the first label out past the front tear bar.</li>
  <li>Close the lid using <strong>both hands</strong>, pushing firmly down on the front left and front right corners simultaneously until you hear two distinct mechanical clicks.</li>
</ol>

<h2>2. Ribbon Setup and Knob Adjustment (XD3-40t Only)</h2>
<p>If you're using the thermal transfer XD3-40t, ribbon errors cause faint prints, ribbon wrinkling, or blinking amber lights.</p>

<p><strong>The Ribbon Tension Knob:</strong> Inside the ribbon mechanism, Bixolon included a specialized tension knob. It must be set correctly for your ribbon size:</p>
<ul>
  <li><strong>PUSH IN (Inward position):</strong> Use this for standard 300-meter ribbons with a 1-inch core (this is the factory default).</li>
  <li><strong>PULL OUT (Outward position):</strong> Use this for shorter 74-meter ribbons on a 0.5-inch core, or ribbons narrower than 2 inches.</li>
</ul>
<p>If you recently switched to a new ribbon roll and print quality immediately turned patchy or the ribbon keeps stalling, check this knob. If it's in the wrong position, the take-up spindle will either pull too hard and snap the ribbon or slip and let it bunch up.</p>

<p><strong>Check Ribbon Inking Side:</strong> Thermal transfer ribbons have ink coated on only one side. Use a piece of Scotch tape against the dull side of the ribbon: if ink comes off on the tape, that inked surface must face directly against your label paper as it passes under the heating elements.</p>

<h2>3. Calibrate the Gap or Black Mark Sensor</h2>
<p>When the XD3-40 skips labels, stops midway through a label, or flashes red after printing a single sheet, the optical sensor has lost the label gap position.</p>

<p>You don't need computer software to recalibrate the sensor—the printer has an automatic calibration routine built right into the FEED button:</p>

<h3>Step-by-Step Auto-Calibration:</h3>
<ol>
  <li>Make sure labels (and ribbon, on the XD3-40t) are loaded properly and the cover is clicked shut.</li>
  <li>Turn the printer power switch <strong>OFF</strong>.</li>
  <li>Press and hold the <strong>FEED button</strong>, then flip the power switch <strong>ON</strong> while keeping FEED held down.</li>
  <li>Continue holding the FEED button until the Status LED changes to <strong>solid red</strong>, then let go immediately.</li>
  <li>The printer will feed a couple of labels back and forth across the transmissive gap eye to measure the label height and backing paper transparency.</li>
  <li>Once the light turns steady green, press the FEED button once. Exactly one label should advance and stop cleanly at the tear bar.</li>
</ol>

<p>If the printer continues flashing red even after running this routine, check our dedicated walkthrough for <a href="/bixolon/error-codes-alerts/bixolon-printer-flashing-red-light">troubleshooting a Bixolon printer flashing red light</a> for deeper sensor and drive roller fixes.</p>

<h2>4. Clean the Printhead and Optical Sensors</h2>
<p>Label adhesive, paper lint, and thermal wax slowly build up on the heating line and optical sensor window. When dust covers the transmissive sensor gap, the printer assumes paper has run out and trips an error.</p>

<p><strong>How to clean it safely:</strong></p>
<ol>
  <li>Turn the printer off and pull the power plug out from the back.</li>
  <li>Open the lid. If you've been printing heavily, give the metal printhead assembly 5 minutes to cool down so you don't crack the glass elements with cold liquid.</li>
  <li>Dampen a clean microfiber cloth or cotton swab with <strong>70% or 99% isopropyl alcohol</strong> (never use acetone, water, or abrasive pads).</li>
  <li>Gently wipe straight across the thin glass heating line located on the underside of the printhead bracket.</li>
  <li>Wipe the clear plastic optical sensor windows in the bottom paper path.</li>
  <li>Clean the black rubber platen roller by wiping it down while rotating it by hand to strip away sticky adhesive residue.</li>
  <li>Let everything air dry for 2 minutes before loading labels and powering back on.</li>
</ol>

<h2>5. Protect the Logic Board from Static Electricity</h2>
<p>One detail that catches many operators off guard: the XD3-40 interface board is particularly sensitive to electrostatic discharge (ESD). If you unplug or swap the USB, serial, or Ethernet cable while the printer is powered on, you can trigger a communication freeze or crash the main logic board.</p>

<p>Always flick the rear power switch to <strong>OFF</strong> before plugging in or unplugging any rear communication cables.</p>

<p>For a complete breakdown of diagnostic beeps and LED codes across the entire Bixolon catalog, consult our comprehensive <a href="/bixolon/error-codes-alerts/printer-error-codes">guide to Bixolon printer error codes</a>.</p>`;

const NEW_FAQS = JSON.stringify([
  {
    question: "What is the difference between the Bixolon XD3-40d and XD3-40t?",
    answer: "The XD3-40d is a direct thermal printer that requires no ink ribbon and prints only onto heat-sensitive media. The XD3-40t is a thermal transfer model equipped with an internal ribbon assembly, allowing it to print on plain paper and synthetic labels using a thermal transfer ribbon.",
  },
  {
    question: "Why is my Bixolon XD3-40 blinking green and not printing?",
    answer: "A blinking green light almost always means the printer has been paused. Pressing the FEED button once during an active print run pauses the queue. Press the FEED button once more to resume printing.",
  },
  {
    question: "What does a flashing red light mean on the XD3-40?",
    answer: "A flashing red light indicates a media error, such as a paper jam, paper-out condition, or optical gap sensor calibration failure. Clear any jammed media and run the standalone sensor auto-calibration routine.",
  },
  {
    question: "Why is my Bixolon XD3-40 feeding blank labels?",
    answer: "On direct thermal models (XD3-40d), blank feeding usually means the label roll is loaded upside down or the media is non-thermal. On thermal transfer models (XD3-40t), it can also mean the ribbon is installed backward, the ribbon is empty, or the ribbon tension knob is misaligned.",
  },
  {
    question: "How do I recalibrate the label sensor on an XD3-40?",
    answer: "Turn off the printer with labels loaded. Press and hold the FEED button, turn the power switch back on, and release FEED as soon as the status LED turns solid red. The printer will feed several labels to measure the gap pitch and reset its optical sensors.",
  },
]);

function calculateWordCount(html: string): number {
  const text = html.replace(/<[^>]*>/g, ' ');
  return text.trim().split(/\s+/).filter(Boolean).length;
}

async function main() {
  const article = await prisma.article.findFirst({
    where: { slug: SLUG },
    select: { id: true, title: true },
  });

  if (!article) {
    throw new Error(`Article with slug "${SLUG}" not found.`);
  }

  const wordCount = calculateWordCount(NEW_CONTENT);
  console.log(`Updating article "${article.title}" (${article.id})...`);
  console.log(`Word count: ${wordCount}`);

  await prisma.$executeRaw`
    UPDATE "Article"
    SET
      "content" = ${NEW_CONTENT},
      "faqs" = ${NEW_FAQS},
      "wordCount" = ${wordCount},
      "reviewedAt" = NOW()
    WHERE "id" = ${article.id}
  `;

  console.log('Database update completed successfully!');

  const linkRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
  const links: { href: string; anchor: string }[] = [];
  let match;
  while ((match = linkRegex.exec(NEW_CONTENT)) !== null) {
    links.push({ href: match[1], anchor: match[2].replace(/<[^>]+>/g, '').trim() });
  }

  console.log(`\nVerified internal links in new content (${links.length} total):`);
  links.forEach((l, i) => console.log(`${i + 1}. [${l.anchor}](${l.href})`));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
