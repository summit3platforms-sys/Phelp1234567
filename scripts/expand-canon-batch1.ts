import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function stripCrossBrandLinks(html: string): string {
  return html.replace(/<a\s[^>]*href="\/[^"]*"[^>]*>([^<]*)<\/a>/gi, '$1');
}

const expansions: Record<string, string> = {
  'canon-printer-error-e05-fix': `
<h2>Understanding Canon Error E05 / Support Code 1401 / 1403</h2>
<p>On Canon PIXMA inkjet printers (such as the MG, TS, TR, and MP series), <strong>Error E05</strong> (alternating "E", "0", "5" on the 7-segment LED or displaying Support Code 1401 / 1403 / 1485) indicates that the printer's FINE (Full-photolithography Inkjet Nozzle Engineering) cartridge is not recognized, is installed in the wrong carriage slot, or has dirty copper contact pads.</p>

<h2>Exhaustive 4-Step E05 Fix Workflow</h2>
<ol>
  <li><strong>The 99% Isopropyl Alcohol Contact Cleanse:</strong>
    <p>Remove both the black (PG-series) and color (CL-series) FINE cartridges. On the rear of each cartridge is a vertical grid of copper electrical contact pads. Ink mist, dust, or skin oils create electrical resistance that prevents the carriage board from reading the cartridge's internal EEPROM. Clean the copper pads and the spring pins inside the carriage with a microfiber cloth dipped in 99% isopropyl alcohol. Let dry for 3 minutes.</p>
  </li>
  <li><strong>Verify Correct Slot Assignment & Color Keying:</strong>
    <p>Canon cartridges are keyed: the <strong>Black cartridge (e.g., PG-245 / PG-260) MUST be installed in the LEFT slot</strong>, and the <strong>Color cartridge (e.g., CL-246 / CL-261) MUST be installed in the RIGHT slot</strong>. Swapping their positions triggers instant Error E05.</p>
  </li>
  <li><strong>Check the Cartridge Locking Cover Lever:</strong>
    <p>When seating Canon FINE cartridges, push the cartridge firmly into the slot and push the gray/black locking cover upward until it clicks securely into its detent. If the cover is not locked 100%, the cartridge sits at a slight angle, breaking electrical contact.</p>
  </li>
  <li><strong>Execute a Hardware Power Cycle & Buffer Drain:</strong>
    <p>Unplug the AC power cord for 5 minutes. Hold down the Power button for 20 seconds while unplugged to drain the motherboard memory. Reconnect power and reinstall the cartridges one at a time.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>What is the difference between Canon Error E05 and Support Code 1403?</summary>
  <p><strong>E05</strong> is the two-digit LED display code on entry-level models without LCD screens. <strong>Support Code 1403</strong> is the exact same error displayed on color LCD screens and Windows error dialogs, signifying "Print head is damaged or not recognized".</p>
</details>
<details>
  <summary>Can a remanufactured Canon cartridge cause Error E05?</summary>
  <p>Yes. Remanufactured third-party cartridges use recycled OEM circuit boards. If the micro-circuitry was damaged during the refilling or testing process, the printer will reject the cartridge with E05.</p>
</details>
`,

  'canon-printer-error-5400-temperature-fix': `
<h2>Technical Explanation of Canon Support Code 5400</h2>
<p>Canon Error 5400 (Support Code 5400) represents an <strong>Abnormal Internal Temperature / Thermistor Circuit Fault</strong>. Canon PIXMA printheads incorporate integrated semiconductor temperature sensors on the silicon die. When the logic board detects that the printhead temperature is rising at an uncontrolled rate, or if the ambient thermistor sensor reads temperatures exceeding safety parameters (above 140°F / 60°C), Error 5400 is triggered to prevent printhead burnout and melting.</p>

<h2>Step-by-Step Diagnostic & Recovery Protocol</h2>
<ol>
  <li><strong>Environmental Cooling & Relocation:</strong>
    <p>Turn the printer OFF immediately. Unplug the AC cord. If the printer is positioned near a sun-drenched window, heat vent, or enclosed cabinet, move it to a cool, shaded room with ambient temperature between 65°F and 75°F (18°C - 24°C).</p>
  </li>
  <li><strong>Check for Dry Nozzle Firing (Air in Lines):</strong>
    <p>On Canon MegaTank models (G-series: G1200, G2200, G3200, G4200, G6020, G7020), if ink is empty and air fills the delivery tubes, the thermal heaters fire dry without liquid ink to dissipate the heat. This causes the silicon die temperature to spike instantly, tripping 5400. Ensure all ink tanks are at least half full before proceeding.</p>
  </li>
  <li><strong>The 30-Minute Complete Power Drain:</strong>
    <p>Leave the printer completely unplugged for at least 30 minutes to allow the printhead assembly to equalize with room temperature. Reconnect power directly to a wall outlet.</p>
  </li>
  <li><strong>Inspect Printhead Electrical Terminals:</strong>
    <p>Remove the printhead assembly and inspect for ink leakage bridging adjacent high-voltage and thermistor pins. Clean all gold pads with 99% isopropyl alcohol.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Is Error 5400 a permanent hardware death sentence?</summary>
  <p>Not always. If caused by an environmental heat wave or temporary thermal spike from dry firing, allowing the printer to cool completely and refilling ink tanks resolves the issue in roughly 50% of cases.</p>
</details>
<details>
  <summary>What should I do if Error 5400 returns immediately upon power-on?</summary>
  <p>If 5400 appears within 5 seconds of a cold boot in a cool room, the thermistor circuit on the printhead die is permanently shorted or open, requiring printhead replacement.</p>
</details>
`,

  'canon-printer-colors-printing-wrong-nozzle-check': `
<h2>Why Canon Printers Print Wrong Colors (e.g., Pink Instead of Orange, Yellow Missing)</h2>
<p>When printed colors look completely distorted — such as photos having a heavy magenta/pink cast, green turning brown, or blue printing as purple — the issue is never a digital software color profile bug. It is a physical ink delivery failure: one or more color nozzle channels (Cyan, Magenta, or Yellow) are either completely blocked by dried ink or cross-contaminated.</p>

<h2>Exhaustive 4-Step Color Diagnostic & Restoration Guide</h2>
<ol>
  <li><strong>Print and Analyze the Nozzle Check Pattern:</strong>
    <ul>
      <li>Load plain white paper.</li>
      <li>On the printer menu: Select <strong>Maintenance &gt; Nozzle Check Pattern</strong> (or from Windows Printer Properties &gt; Maintenance tab).</li>
      <li>Examine the printed pattern:
        <ul>
          <li><strong>PGBK (Pigment Black):</strong> Must show a solid, clean grid with zero missing horizontal lines.</li>
          <li><strong>C (Cyan) / M (Magenta) / Y (Yellow):</strong> Must show continuous, even horizontal color bars without horizontal white stripes or gaps.</li>
        </ul>
      </li>
      <li>If the <strong>Cyan bar is completely missing</strong>, all blue tones will print as magenta/pink. If the <strong>Yellow bar is missing</strong>, greens will print as blue and reds will print as pink.</li>
    </ul>
  </li>
  <li><strong>Execute Targeted Printhead Cleaning:</strong>
    <p>From the Maintenance menu, select <strong>Cleaning</strong>. After the 2-minute cycle, print another nozzle check. If bars remain broken, select <strong>Deep Cleaning</strong>. Deep cleaning uses high-pressure pump suction to dislodge hardened pigment.</p>
  </li>
  <li><strong>Check for Ink Cross-Contamination in Sponge Chambers:</strong>
    <p>If you refilled individual ink tanks with bottled ink, verify that you didn't accidentally inject yellow ink into the magenta port or vice versa. If color cross-contamination occurred, the entire cartridge must be replaced or flushed with distilled water.</p>
  </li>
  <li><strong>Inspect Ink Tank Air Vents:</strong>
    <p>Ensure the orange tape was cleanly removed from the top air breather hole on each cartridge. A vacuum inside the tank will starve the color channels after the first 2 inches of printing.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does my Canon printer print green when I try to print yellow?</summary>
  <p>Cyan ink has back-siphoned into the yellow nozzle chamber due to a damaged rubber seal on the capping station. Running two standard cleaning cycles will flush the contaminated ink out of the nozzle bank.</p>
</details>
<details>
  <summary>How much ink does Canon Deep Cleaning use?</summary>
  <p>Deep Cleaning consumes approximately 20% to 25% of a standard cartridge's ink volume. Never run Deep Cleaning more than twice in 24 hours.</p>
</details>
`,

  'canon-printer-streaky-prints-horizontal-lines': `
<h2>Understanding Horizontal Streaks and White Lines in Canon Prints</h2>
<p>Horizontal white lines spaced at regular intervals across printed text and photos (often called <strong>Horizontal Banding</strong>) occur when individual microscopic ink nozzles fail to fire as the printhead carriage sweeps across the page. This is caused by dried ink clogs, air pockets in the printhead manifold, or bidirectional alignment drift.</p>

<h2>Complete 4-Step Banding Elimination Protocol</h2>
<ol>
  <li><strong>Execute Automated Printhead Cleaning & Nozzle Verification:</strong>
    <p>Navigate to <strong>Maintenance &gt; Cleaning</strong>. Print a Nozzle Check Pattern. If you see broken grid lines or white streaks running through the color bars, run a second Cleaning cycle. Allow the printer to sit idle for 15 minutes between cleanings to let fresh ink dissolve the dried blockage.</p>
  </li>
  <li><strong>Perform Precision Printhead Alignment:</strong>
    <ul>
      <li>Load fresh, bright white paper in the tray.</li>
      <li>Select <strong>Maintenance &gt; Print Head Alignment</strong> (Automatic or Manual).</li>
      <li>On Automatic models, the printer prints a multi-column pattern and scans it via the flatbed.</li>
      <li>On Manual models, examine each numbered column (A through K) and enter the number of the box with the smoothest, least streaky pattern. This synchronizes left-to-right and right-to-left dot placement.</li>
    </ul>
  </li>
  <li><strong>Clean the Linear Optical Encoder Strip:</strong>
    <p>If horizontal lines appear irregular, wavy, or jagged, grease on the clear plastic encoder strip behind the carriage is causing the carriage to jitter mid-pass. Clean the clear strip gently with a microfiber cloth dampened with warm distilled water.</p>
  </li>
  <li><strong>Change Paper Quality Settings to "High":</strong>
    <p>In Windows Print Preferences, change Print Quality from "Standard" to <strong>"High"</strong>. High quality mode slows carriage velocity and prints in overlapping multipass patterns, which masks minor nozzle clogs.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>What is the difference between horizontal and vertical streaks?</summary>
  <p><strong>Horizontal streaks</strong> (in the direction of carriage travel) indicate clogged nozzles or alignment drift. <strong>Vertical streaks</strong> (in the direction of paper feed) indicate dirty paper feed rollers, scratched drum surfaces, or ink buildup on the star wheels.</p>
</details>
<details>
  <summary>Can low ink levels cause streaky horizontal lines?</summary>
  <p>Yes. When ink drops below 10%, air bubbles enter the printhead manifold, resulting in intermittent ink starvation during wide print sweeps.</p>
</details>
`,

  'canon-printer-print-head-alignment-failed': `
<h2>Technical Diagnostics for Canon "Print Head Alignment Failed"</h2>
<p>When a Canon PIXMA printer finishes printing the alignment test pattern and displays "Print Head Alignment Failed", Support Code <strong>2500</strong>, or flashes an orange alarm light 11 times, the optical sensor mounted underneath the carriage was unable to detect the printed test bars with sufficient optical contrast.</p>

<h2>Exhaustive 4-Step Calibration Recovery</h2>
<ol>
  <li><strong>Verify Nozzle Firing Health on the Alignment Pattern:</strong>
    <p>Look at the alignment sheet that was just ejected. If the black or cyan blocks are faint, streaky, or completely missing, the carriage optical sensor reads a blank sheet, triggering an instant 2500 failure. Run a <strong>Printhead Cleaning Cycle</strong> through the Maintenance menu to ensure solid ink flow before re-attempting alignment.</p>
  </li>
  <li><strong>Use Standard Bright White 20 lb Copy Paper:</strong>
    <p>The optical calibration sensor is calibrated strictly for standard 20 lb or 24 lb bright white bond paper (minimum 92 brightness). Attempting alignment using colored paper, recycled gray paper, lined notebook paper, or glossy photo paper alters the surface reflectance, causing the contrast measurement to fail.</p>
  </li>
  <li><strong>Clean the Carriage Optical Sensor Lens:</strong>
    <p>On the bottom of the moving printhead carriage is a miniature optical reflective sensor. Paper fibers and ink mist can coat the lens. Turn off the printer, unplug it, slide the carriage to the center, and wipe the sensor lens on the bottom of the carriage with a clean, dry cotton swab.</p>
  </li>
  <li><strong>Switch to Manual Print Head Alignment:</strong>
    <p>If automated alignment continues to fail due to ambient light or sensor age, switch to Manual Alignment: Open Windows Printer Properties &gt; Maintenance tab &gt; <strong>Custom Settings &gt; Check "Align heads manually"</strong>. The printer will print a manual numbered sheet allowing you to pick the best alignment values with your own eyes.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the printer fail alignment when the room is brightly lit?</summary>
  <p>Direct sunlight or intense overhead fluorescent light shining through the paper exit tray can blind the carriage's optical reflective sensor during its scanning pass. Close the paper output tray cover or shield the printer from direct light during alignment.</p>
</details>
<details>
  <summary>Can I skip the alignment process?</summary>
  <p>Yes. Press the <strong>Stop/Reset</strong> button to cancel the prompt. The printer will function normally, although high-resolution photo prints may show slight horizontal banding.</p>
</details>
`,

  'canon-printer-error-5700-sheet-feeder-fix': `
<h2>Understanding Canon Error 5700 / Support Code 5700 (Sheet Feeder Cam Sensor Fault)</h2>
<p>Error 5700 indicates an <strong>ASF (Auto Sheet Feeder) Cam Sensor Error</strong>. Inside the rear paper feed mechanism, a plastic cam gear rotates to lower the pickup roller onto the paper stack and return it to its resting home position. An optical interrupter sensor monitors the rotation of this cam. When the cam gear fails to reach its home position within a specific millisecond window, the logic board halts the machine with Error 5700.</p>

<h2>Step-by-Step Mechanical Diagnostic & Clearing Guide</h2>
<ol>
  <li><strong>Check for Foreign Objects in the Rear Feed Tray:</strong>
    <p>90% of Error 5700 occurrences are caused by small foreign objects (paperclips, pens, coins, staples) falling into the open vertical rear feed slot and jamming the ASF cam gear teeth. Unplug the printer, open the feed lid, shine a bright flashlight down the paper chute, and use tweezers to remove any foreign debris.</p>
  </li>
  <li><strong>Manually Rotate the ASF Drive Gears:</strong>
    <p>With power disconnected, look at the left side of the rear feed slot. You will see the white plastic ASF drive gear train. Use your finger to gently rotate the largest gear downward. The paper feed pickup roller should lower and return smoothly. If the gear is locked solid, a foreign object is wedged between the teeth.</p>
  </li>
  <li><strong>Inspect the Cam Sensor Optical Flag:</strong>
    <p>The ASF cam gear features a small black plastic actuator blade that passes through an optical photodiode sensor. If dust or paper fibers have clogged the sensor eye, blow clean compressed air into the left side of the rear feed assembly.</p>
  </li>
  <li><strong>Perform a Hard Power Drain:</strong>
    <p>Unplug the AC power cord for 10 minutes. Press and hold the Power button for 30 seconds while unplugged to reset the logic board's motor driver IC registers.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can a paper jam trigger Error 5700?</summary>
  <p>Yes. If a thick piece of cardstock jammed in the rear tray and was forcefully yanked out backward, the ASF cam gear can be forced past its optical stop, sticking in the locked position.</p>
</details>
<details>
  <summary>Is Error 5700 repairable without opening the printer casing?</summary>
  <p>In most cases, yes. Clearing foreign objects from the top feed chute and manually freeing the drive gears clears 5700 without full chassis disassembly.</p>
</details>
`,

  'how-to-reset-canon-waste-ink-counter': `
<h2>Understanding the Canon Waste Ink Absorber Full Error (5B00 / P07 / 1700)</h2>
<p>Every time your Canon printer executes an automated nozzle cleaning cycle or initial ink charge, liquid ink is pumped through the printhead and dumped into large porous felt sponge pads housed in the bottom base of the printer chassis (the <strong>Waste Ink Absorber</strong>). To prevent ink from overflowing onto your desk, the printer's EEPROM maintains an internal mathematical counter (<code>D-Value</code>). When this counter reaches 100% (typically after 10,000 to 15,000 pages), the printer locks with <strong>Error 5B00</strong> (Support Code 5B00 / 1700 / P07).</p>

<h2>Step-by-Step Canon Service Mode Reset Workflow</h2>
<ol>
  <li><strong>Enter Canon Service Mode:</strong>
    <ul>
      <li>Turn the printer completely OFF.</li>
      <li>Press and hold the physical <strong>Stop / Reset (Red Triangle)</strong> button.</li>
      <li>While still holding Stop, press and hold the <strong>Power</strong> button. The power LED will illuminate green.</li>
      <li>While continuing to hold Power, <strong>release the Stop button</strong>.</li>
      <li>While still holding Power, press the <strong>Stop button 5 times</strong> consecutively (for newer TS/G models, press 5 times; for older MP models, press 6 times).</li>
      <li>Release both buttons simultaneously. The power LED will flash green and then turn solid green, confirming the printer is in <strong>Service Mode</strong>.</li>
    </ul>
  </li>
  <li><strong>Using Canon Service Tool Software (v3400 / v4905 / v5103):</strong>
    <ul>
      <li>Connect the printer to a Windows PC via USB cable (Service Mode does not work over Wi-Fi).</li>
      <li>Launch the official <strong>Canon Service Tool</strong> executable as Administrator.</li>
      <li>Under the <strong>"Ink Absorber Counter"</strong> section, ensure <strong>Absorber: Main</strong> is selected.</li>
      <li>Set <strong>Counter Value (%)</strong> to <code>0%</code>.</li>
      <li>Click the <strong>Set</strong> button. The printer will make a mechanical clicking sound and print a confirmation line reading <code>D=000.0</code>.</li>
    </ul>
  </li>
  <li><strong>Exit Service Mode:</strong>
    <p>Press the Power button on the printer once to turn it off. Turn it back on normally. Error 5B00 will be completely cleared.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Do I need to physically replace the waste ink sponges?</summary>
  <p>If this is the first time 5B00 has appeared, the physical felt pads typically have enough reserve capacity to absorb ink for several more months. However, for permanent reliability, you should replace the bottom felt pads or install an external waste ink tank modification kit.</p>
</details>
<details>
  <summary>What should I do if Service Tool displays Error Code 006?</summary>
  <p>Error Code 006 in Canon Service Tool means the printer is not in true Service Mode or the USB port is occupied by a background print job. Close all Canon apps, enter Service Mode carefully, and re-run.</p>
</details>
`,

  'canon-printer-error-5011-fix': `
<h2>Technical Breakdown of Canon Error 5011 / Support Code 5011</h2>
<p>On Canon PIXMA multifunction all-in-one printers, <strong>Error 5011</strong> (Support Code 5011) indicates a <strong>Scanner Unit Hardware Malfunction / Home Position Failure</strong>. During power-on bootup, the scanner's Contact Image Sensor (CIS) carriage moves along its track to find the home positioning sensor and white calibration reference. If the scanner carriage fails to move, encounters physical resistance, or if the scanner motor driver fails, Error 5011 is tripped, locking all print and scan functions.</p>

<h2>Step-by-Step Diagnostic & Recovery Protocol</h2>
<ol>
  <li><strong>Check for Physical Scanner Lock or Obstruction:</strong>
    <p>Lift the scanner lid. Inspect the flatbed glass. Ensure no foreign objects are resting on the glass and that the scanner carriage is not physically jammed against one side. Look closely through the glass to see if the flat ribbon cable is twisted or disconnected.</p>
  </li>
  <li><strong>Inspect the Scanner Flat Flexible Cable (FFC):</strong>
    <p>Years of opening and closing the scanner lid can cause the white multi-pin ribbon cable connecting the scanner assembly to the logic board to become loose or develop internal conductor fractures. If comfortable, reseat both ends of the scanner ribbon cable into their logic board sockets.</p>
  </li>
  <li><strong>Clean the White Calibration Reference Tile:</strong>
    <p>Underneath the top plastic glass bezel at the extreme left sits a narrow white calibration strip. If glass adhesive haze, dust, or correction fluid has clouded this strip, the CIS optical sensor cannot calibrate white balance and triggers 5011. Clean the glass with optical lens cleaner.</p>
  </li>
  <li><strong>Execute a Full Hardware Power Drain:</strong>
    <p>Disconnect the AC power cord from the wall. Press and hold the Power button for 30 seconds to discharge the logic board capacitors. Leave unplugged for 15 minutes to reset the scanner motor driver IC.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I print when my Canon printer has Error 5011?</summary>
  <p>Because Canon firmware runs a mandatory hardware self-test on both the scanner and printer during boot, Error 5011 halts the entire machine, blocking printing as well. Resolving the scanner fault or replacing the scanner unit is required.</p>
</details>
<details>
  <summary>Does cold room temperature trigger Error 5011?</summary>
  <p>Yes. In unheated rooms below 55°F (13°C), the CIS optical sensor lamp takes longer to warm up and reach operating luminance, which can trigger an optical timeout 5011 error. Allow the printer to warm to room temperature before powering on.</p>
</details>
`
};

async function main() {
  console.log('🚀 Expanding Canon Articles (Batch 1 - 8 articles)...\n');

  for (const [slug, additionalContent] of Object.entries(expansions)) {
    const article = await prisma.article.findUnique({
      where: { slug }
    });

    if (!article) {
      console.log(`⚠️ Article not found: ${slug}`);
      continue;
    }

    const cleanExisting = stripCrossBrandLinks(article.content || '');
    const combinedContent = cleanExisting + '\n' + additionalContent;
    const cleanFull = stripCrossBrandLinks(combinedContent);

    const text = cleanFull.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const realWords = text.split(' ').filter(w => w.length > 0).length;

    await prisma.article.update({
      where: { id: article.id },
      data: {
        content: cleanFull,
        wordCount: realWords
      }
    });

    console.log(`✅ [${realWords}w] Updated ${slug}`);
  }

  console.log('\n🎉 Canon Batch 1 Complete!');
}

main().then(async () => prisma.$disconnect()).catch(async e => { console.error(e); prisma.$disconnect(); process.exit(1); });
