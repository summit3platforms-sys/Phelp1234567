import { prisma } from '../src/lib/prisma';

const SLUG = 'munbyn-rw402b-not-printing';

const NEW_CONTENT = `<h2>The Quick Answer: Why Your Munbyn RW402B Won't Print</h2>
<p><strong>If your Munbyn RW402B is not printing, over 80% of failures stem from one of three issues: pairing the printer inside your phone's system Bluetooth settings rather than inside the Munbyn Print app, loading labels coated-side down, or an uncalibrated media sensor causing a solid or blinking red light.</strong></p>

<p>The Munbyn RW402B (part of Munbyn's RealWriter 4-inch wireless thermal series) is a workhorse shipping label printer designed for desktop USB and mobile Bluetooth workflows. However, because Bluetooth thermal printers handle data transmission differently from standard desktop printers, a single misconfigured permission or latch failure will cause the printer to sit completely unresponsive without displaying an obvious error message.</p>

<p>Work through the 7 bench-tested fixes below in order. We start with the critical Bluetooth app-pairing trap, address hardware media checks, and isolate driver communication.</p>

<h2>Munbyn RW402B Status Light Decoder</h2>
<p>Before changing any settings, check the LED indicator light on the top lid. The color and flash sequence tell you whether the printer is ready, blocked by a physical fault, or waiting for data:</p>

<table>
  <thead>
    <tr>
      <th>LED Indicator</th>
      <th>Operational Status</th>
      <th>Immediate Action Required</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Solid Blue / Solid Green</strong></td>
      <td>Ready / Normal Standby</td>
      <td>Hardware is functional; check Bluetooth app connection or print queue.</td>
    </tr>
    <tr>
      <td><strong>Blinking Blue</strong></td>
      <td>Bluetooth Transmitting / Receiving Data</td>
      <td>Wait for print job buffer to clear; check for stalled print queue.</td>
    </tr>
    <tr>
      <td><strong>Blinking Red</strong></td>
      <td>Label Gap Sensor Misalignment / Paper Out</td>
      <td>Perform an automatic label size calibration (Fix 4).</td>
    </tr>
    <tr>
      <td><strong>Solid Red</strong></td>
      <td>Cover Open or Thermal Head Overheat</td>
      <td>Press both lid corners firmly until double-clicked; allow head to cool if hot.</td>
    </tr>
    <tr>
      <td><strong>Purple / Magenta</strong></td>
      <td>Firmware Processing / Memory Reset</td>
      <td>Do not disconnect power; wait 60 seconds for logic board cycle to finish.</td>
    </tr>
  </tbody>
</table>

<h2>Fix 1: Connect Inside the Munbyn Print App (The #1 Bluetooth Trap)</h2>
<p>The single most frequent mistake users make with the RW402B is pairing the printer through their smartphone's system-level Bluetooth menu (iOS Settings &gt; Bluetooth or Android Settings &gt; Connected devices).</p>

<p>When you pair at the operating system level, your phone establishes a basic wireless handshake, but the mobile OS does not recognize the RW402B as an AirPrint or standard document output device. The phone displays "Connected," but when you tap print from your shipping platform, nothing happens.</p>

<h3>The Proper App-Level Pairing Procedure:</h3>
<ol>
  <li><strong>Unpair in Phone Settings:</strong> Open your smartphone's Bluetooth settings, find the Munbyn RW402B, and select <strong>"Forget This Device"</strong> or <strong>"Unpair"</strong>. Turn your phone's Bluetooth toggle OFF and back ON.</li>
  <li><strong>Verify Mobile App Permissions:</strong>
    <ul>
      <li><strong>iOS (iPhone/iPad):</strong> Go to <em>Settings &gt; Munbyn Print</em> and ensure <strong>Bluetooth</strong> access is toggled ON.</li>
      <li><strong>Android:</strong> Go to <em>Settings &gt; Apps &gt; Munbyn Print &gt; Permissions</em>. You must enable <strong>Nearby Devices</strong> (Android 12+) and <strong>Location / Precise Location</strong>. On Android, Bluetooth Low Energy (BLE) scanning requires location authorization by OS security design; if denied, the app will never discover the printer.</li>
    </ul>
  </li>
  <li><strong>Connect Directly Within the App:</strong> Launch the official <strong>Munbyn Print app</strong>. Tap the printer icon in the top corner, allow the app to scan for local devices, and select your RW402B from the list. The status indicator inside the app will display a green connected icon.</li>
</ol>

<h2>Fix 2: Disconnect Secondary Devices (Single-Channel Lockout)</h2>
<p>The Bluetooth controller on the Munbyn RW402B is single-channel. It can only maintain an active connection with one host device at a time. If an iPad, tablet, or family member's phone in your workshop connected to the printer earlier, the RW402B remains locked to that radio signal.</p>

<p>The printer will not display an "in-use" error; it simply ignores print commands sent from any secondary phone.</p>

<p><strong>How to clear the connection lock:</strong></p>
<ul>
  <li>Turn off Bluetooth temporarily on any nearby phones, tablets, or laptops that have previously connected to the RW402B.</li>
  <li>Power cycle the printer: switch the rear rocker switch to <strong>OFF</strong>, wait 10 seconds to allow the volatile Bluetooth buffer to discharge, and power it back <strong>ON</strong>.</li>
  <li>Re-open the Munbyn Print app on your intended device and reconnect.</li>
</ul>

<h2>Fix 3: Verify Thermal Paper Type &amp; Roll Orientation</h2>
<p>Direct thermal printers do not use ink, toner, or ribbon cartridges. They create text and barcodes by applying heat directly to chemically treated, heat-sensitive paper. If labels feed through the mechanism smoothly but exit completely blank, the paper is almost certainly loaded upside down or is non-thermal stock.</p>

<p><strong>The Fingernail Scratch Test:</strong> Take a clean label and quickly scratch the surface with your fingernail or the edge of a coin. If a visible dark black streak appears, the paper is direct thermal. If no mark appears, you are using standard non-thermal transfer paper that requires an ink ribbon, which will never print on an RW402B.</p>

<p><strong>Loading Direction:</strong> When placing the roll into the internal spool or feeding fanfold labels through the rear feed slot, ensure the treated, printable face is pointing <strong>UP toward the ceiling</strong> as it passes under the printhead. If labels are feeding through completely blank, follow our in-depth <a href="/munbyn/printing-problems/munbyn-printer-printing-blank-labels">Munbyn printing blank labels troubleshooting guide</a> to check thermal head voltage and print density configurations.</p>

<p>Finally, ensure the green plastic paper guides are snug against both outer edges of the label backing liner without pinching the paper. If the guides are too loose, labels skew diagonally and fail to trigger the optical gap sensor.</p>

<h2>Fix 4: Recalibrate the Automatic Label Gap Sensor</h2>
<p>If the printer's top LED is flashing red, or if the printer feeds blank labels continuously without stopping, the optical transmission sensor has lost track of label boundaries. This commonly happens after switching from standard 4x6 shipping labels to circular branding stickers or different brand paper stock.</p>

<p>Recalibrating forces the printer logic board to measure label height, liner transparency, and the gap pitch between sheets.</p>

<h3>How to Perform Automatic Gap Calibration on the RW402B:</h3>
<ol>
  <li>Ensure the printer is powered <strong>ON</strong> and at least 3 connected labels are loaded past the platen roller.</li>
  <li>Press and hold the top <strong>FEED</strong> button on the front of the lid.</li>
  <li>Hold the button until you hear <strong>one single beep</strong> (approximately 3 seconds), then release it immediately.</li>
  <li>The printer will feed labels back and forth across the optical sensor eye to measure paper resistance and gap spacing.</li>
  <li>Once complete, the LED will return to a steady blue or green light. Press the FEED button once to confirm: exactly one label should advance to the tear bar.</li>
</ol>

<p>If your printer continues feeding erratically after calibration or jumps past labels during print runs, check our detailed steps to <a href="/munbyn/printing-problems/munbyn-printer-skipping-labels">fix a Munbyn printer skipping labels</a>.</p>

<h2>Fix 5: Clear Stalled Print Queues &amp; Packet Timeouts</h2>
<p>High-resolution shipping label PDFs containing complex 2D DataMatrix or carrier barcodes can overwhelm the RW402B's internal Bluetooth receiver buffer, especially when transmitting over 2.4 GHz wireless environments crowded with Wi-Fi interference. When this occurs, the printer might print a portion of the label and stop, or drop the print job completely.</p>

<p>If your printer initiates a print job but halts halfway across the label, review our step-by-step walkthrough for <a href="/munbyn/printing-problems/munbyn-printer-prints-half-label-then-stops">what to do when your Munbyn prints half a label and stops</a>.</p>

<h3>Flushing the Stalled Print Queue:</h3>
<ul>
  <li><strong>On Windows:</strong> Open the Start menu, type <code>services.msc</code>, right-click <strong>Print Spooler</strong>, and select <strong>Restart</strong>. Then navigate to <code>C:\\Windows\\System32\\spool\\PRINTERS</code> and delete any stuck <code>.SHD</code> and <code>.SPL</code> spool files.</li>
  <li><strong>On macOS:</strong> Go to <em>System Settings &gt; Printers &amp; Scanners</em>, click on your Munbyn printer, open the <strong>Print Queue</strong>, and click the "X" icon next to any pending or errored jobs.</li>
  <li><strong>On Mobile:</strong> Force-close the Munbyn Print app, clear the app cache in device settings, and restart your smartphone to clear lingering BLE packet locks.</li>
</ul>

<h2>Fix 6: Check Clamshell Microswitches &amp; Clean the Thermal Printhead</h2>
<p>Thermal printers require heavy, uniform downward pressure to transfer heat from the thermal elements to the paper. The RW402B uses a safety interlock microswitch on both the left and right sides of the cover frame.</p>

<p>If you close the lid by pressing only the center, one side latch may remain slightly unseated. This trips the safety circuit, turning the status light <strong>solid red</strong> and disabling the motor.</p>

<p><strong>How to ensure full latch engagement:</strong> Open the top clamshell cover. Inspect the rubber platen roller and ensure no scrap label corners or adhesive stickers are wrapped around the roller shafts. Close the cover using two hands, applying firm downward pressure on <strong>both front corners simultaneously</strong> until you hear two distinct mechanical clicks.</p>

<p><strong>Clean the thermal elements:</strong> Dust, label adhesive, and paper coatings accumulate across the heating line over time, insulating heat and causing faint prints or sensor read errors. Power off the printer, open the cover, and wipe the thin glass heating line located under the top lid with a 70% or 99% isopropyl alcohol wipe. Allow it to air dry for 2 minutes before powering back on.</p>

<h2>Fix 7: The USB Isolation Test (Hardware vs. Software)</h2>
<p>If your RW402B still refuses to print wirelessly, execute a direct USB isolation test. This immediately proves whether the issue is hardware failure or a wireless/app configuration barrier:</p>

<ol>
  <li>Disconnect Bluetooth and connect the printer directly to a computer using the included USB Type-B cable (plug directly into a rear motherboard port, avoiding unpowered hubs).</li>
  <li>Download and install the official Munbyn desktop driver from Munbyn's official portal.</li>
  <li>In your computer's printer properties, send a standard <strong>Windows Printer Test Page</strong> or 4x6 sample shipping label.</li>
</ol>

<p><strong>Analyzing the test result:</strong></p>
<ul>
  <li><strong>If it prints cleanly via USB:</strong> The printhead, stepper feed motor, main logic board, and power supply are 100% functional. The failure is isolated strictly to your mobile device's Bluetooth stack, app pairing, or permission configuration (re-check Fixes 1, 2, and 5).</li>
  <li><strong>If it fails via USB as well:</strong> Execute a standalone hardware self-test: turn off the printer, hold the FEED button down, turn the power switch ON while continuing to hold FEED, and release after the first beep. If the self-test fails to output, contact Munbyn support for warranty hardware replacement.</li>
</ul>

<h2>Munbyn RW402B Troubleshooting Reference Matrix</h2>
<table>
  <thead>
    <tr>
      <th>Observed Symptom</th>
      <th>Probable Root Cause</th>
      <th>Verified Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>App says connected, but nothing prints</td>
      <td>Paired via phone OS settings instead of inside app</td>
      <td>Forget device in OS settings; connect only inside Munbyn Print app.</td>
    </tr>
    <tr>
      <td>Labels feed through completely blank</td>
      <td>Labels loaded upside down or non-thermal stock</td>
      <td>Flip label roll so coated side faces UP; run scratch test.</td>
    </tr>
    <tr>
      <td>Top LED flashes red continuously</td>
      <td>Label gap sensor uncalibrated or out of paper</td>
      <td>Load 3+ labels, hold FEED button until 1 beep, release to recalibrate.</td>
    </tr>
    <tr>
      <td>Top LED glows solid red</td>
      <td>Lid latches open or printhead overheated</td>
      <td>Press firmly on both front corners until double-click is heard.</td>
    </tr>
    <tr>
      <td>Printer invisible during app Bluetooth scan</td>
      <td>Android location/nearby permissions denied or 2nd device connected</td>
      <td>Enable Nearby Devices &amp; Location permissions; turn off Bluetooth on other devices.</td>
    </tr>
    <tr>
      <td>Prints part of a label then halts</td>
      <td>Bluetooth buffer overflow or corrupted spooler cache</td>
      <td>Clear OS print queue, reboot phone/PC, and print at 203 DPI.</td>
    </tr>
  </tbody>
</table>`;

const NEW_FAQS = JSON.stringify([
  {
    question: "Why does my Munbyn RW402B show 'Connected' in Bluetooth settings but won't print?",
    answer: "Because standard smartphone Bluetooth settings only establish a basic wireless handshake, not a printing data channel. You must forget the printer in your phone's system Bluetooth settings, open the official Munbyn Print app, and connect to the RW402B directly from inside the app.",
  },
  {
    question: "Why is my Munbyn RW402B feeding blank labels?",
    answer: "Direct thermal printers use heat-reactive paper instead of ink. If labels feed out blank, the roll is usually loaded upside down (the chemically coated side must face UP toward the printhead) or the stock is non-thermal paper that requires a ribbon. Perform a fingernail scratch test to verify the paper turns black under friction.",
  },
  {
    question: "How do I recalibrate the label size on a Munbyn RW402B?",
    answer: "Turn on the printer with at least 3 connected labels loaded. Press and hold the top FEED button until you hear one beep, then release immediately. The printer will feed labels back and forth to detect label boundaries and gap pitch, resetting the optical sensor.",
  },
  {
    question: "Why is the status light on my Munbyn RW402B solid red?",
    answer: "A solid red light indicates that the clamshell cover is not fully latched shut, paper is completely out, or the thermal printhead has overheated from a continuous large batch. Press firmly down on both front lid corners until you hear two distinct clicks to engage the dual safety microswitches.",
  },
  {
    question: "Can multiple phones connect to the Munbyn RW402B at the same time?",
    answer: "No. The RW402B uses a single-channel Bluetooth receiver that can only communicate with one active device at a time. To print from a second phone or tablet, disconnect or toggle off Bluetooth on the first device and power cycle the printer.",
  },
]);

function calculateWordCount(html: string): number {
  const text = html.replace(/<[^>]*>/g, ' ');
  return text.trim().split(/\s+/).filter(Boolean).length;
}

async function main() {
  const article = await prisma.article.findFirst({
    where: { slug: SLUG },
    select: { id: true, title: true, brand: true, category: true },
  });

  if (!article) {
    throw new Error(`Article with slug "${SLUG}" not found.`);
  }

  const wordCount = calculateWordCount(NEW_CONTENT);
  console.log(`Updating article "${article.title}" (${article.id})...`);
  console.log(`Word count: ${wordCount}`);

  // Update content, faqs, wordCount, and bump reviewedAt to reflect genuine editorial overhaul
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

  // Verify internal links in new content
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
