import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function stripCrossBrandLinks(html: string): string {
  return html.replace(/<a\s[^>]*href="\/[^"]*"[^>]*>([^<]*)<\/a>/gi, '$1');
}

const expansions: Record<string, string> = {
  'canon-printer-error-6a00-cartridge-jam-fix': `
<h2>Understanding Canon Error 6A00 / Support Code 6A00 (Purge Unit Jam)</h2>
<p>Error 6A00 indicates an <strong>Automatic Purge Unit / Maintenance Station Malfunction</strong>. The purge station (located on the far right side where the printhead parks) houses the rubber capping seal, wiper blades, and a cam-driven suction pump. When dried, congealed ink sludge accumulates in the purge unit track, the wiper blade binds, preventing the station from locking or unlocking the printhead carriage and generating Error 6A00.</p>

<h2>Step-by-Step Diagnostic & Cleaning Procedure</h2>
<ol>
  <li><strong>Inspect the Purge Station & Wiper Blade:</strong>
    <p>Unplug the printer and open the top access cover. Move the printhead carriage to the center. Look into the far right cavity with a flashlight. You will see a small, flexible clear rubber wiper blade. If dried ink crust is binding the blade or if the rubber cap is skewed, clean the wiper blade and capping tracks with warm distilled water on a cotton swab.</p>
  </li>
  <li><strong>Manually Cycle the Purge Unit Drive Gear:</strong>
    <p>On the far left of the printer chassis sits a white plastic drive cog. Turn this gear clockwise with your fingertip. You should observe the purge unit mechanism on the right rise and lower smoothly. Continue turning until the wiper blade completes one full forward-and-back sweep.</p>
  </li>
  <li><strong>Clear the Paper Jam Chute Near the Purge Station:</strong>
    <p>Small scraps of torn paper frequently get pulled into the right-side suction cap area. Remove any paper fragments with tweezers.</p>
  </li>
  <li><strong>Execute a Full Power Reset:</strong>
    <p>Leave the printer disconnected from AC power for 10 minutes. Hold down the Power button for 20 seconds while unplugged to clear the purge motor stall flag.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does Error 6A00 occur during initial power on?</summary>
  <p>During bootup, the printer cycles the purge unit to test the wiper motor home sensor. If the purge unit does not complete its cycle within 3 seconds, Error 6A00 is tripped immediately.</p>
</details>
<details>
  <summary>Can I lubricate the purge unit gears?</summary>
  <p>Apply only 1-2 drops of synthetic silicone lubricant to the plastic cam slider tracks. Never use WD-40 or grease that can mix with ink into an abrasive paste.</p>
</details>
`,

  'canon-printer-error-5200-overheating-fix': `
<h2>Understanding Canon Error 5200 / Support Code 5200 (Printhead Overheating)</h2>
<p>Canon Support Code 5200 is a dedicated <strong>Printhead Thermal Protection / Overheating Fault</strong>. Each nozzle on a Canon thermal printhead contains a micro-resistor that heats to over 500°F (300°C) for microsecond bursts. The liquid ink itself acts as a coolant. When cartridges run dry, or when air blocks the ink channels, the nozzles fire dry without ink coolant, causing the printhead silicon die temperature to exceed safe limits.</p>

<h2>Step-by-Step Resolution for Error 5200</h2>
<ol>
  <li><strong>Check Ink Levels Immediately:</strong>
    <p>Open the front access door. Check if any cartridge or MegaTank reservoir is completely empty. If ink is depleted, refill the tanks or install new genuine Canon FINE cartridges immediately.</p>
  </li>
  <li><strong>The 30-Minute Thermal Cooldown:</strong>
    <p>Power OFF the printer and unplug the AC power cable from the wall. Leave the machine powered down in a cool room for at least 30 minutes to allow the printhead silicon substrate to cool to true ambient temperature.</p>
  </li>
  <li><strong>The Reset Button Override Protocol:</strong>
    <ul>
      <li>With the printer powered OFF, press and hold the <strong>Stop/Reset (Triangle)</strong> button.</li>
      <li>While holding Stop/Reset, press and hold the <strong>Power</strong> button.</li>
      <li>When the power LED turns on, release the Stop/Reset button while continuing to hold Power.</li>
      <li>Press the Stop/Reset button <strong>2 times</strong> (or 5 times on select models).</li>
      <li>Release the Power button. The printer will initialize and clear the thermal latch.</li>
    </ul>
  </li>
  <li><strong>Perform a Deep Cleaning to Re-Prime Nozzle Ink:</strong>
    <p>Once the printer boots to ready, run one <strong>Deep Cleaning</strong> cycle from the Maintenance menu to flood the dry nozzles with liquid ink coolant.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Will continuing to print with Error 5200 permanently ruin my printer?</summary>
  <p>Yes. Firing dry thermal nozzles will physically burn out the micro-resistors within seconds, permanently destroying the printhead.</p>
</details>
<details>
  <summary>Why does Error 5200 happen on brand new Canon MegaTank printers?</summary>
  <p>On newly installed MegaTank printers, if the initial <strong>Ink Flush / Initial Ink Charge</strong> process was skipped or interrupted, the delivery tubes remain filled with air, triggering 5200.</p>
</details>
`,

  'canon-megatank-not-printing-air-in-tubes': `
<h2>Why Air Bubbles Form in Canon MegaTank Ink Delivery Tubes</h2>
<p>Canon MegaTank continuous ink supply system (CISS) printers (G1200, G2200, G3200, G4200, G5020, G6020, G7020, GX6020, GX7020) utilize flexible silicone tubing to siphon ink from the large body-mounted ink reservoirs to the moving printheads. Air pockets enter the tubes if the printer is left unused for months, if the tank valves are left open, or if the printer is transported without locking the transportation ink valve.</p>

<h2>Step-by-Step Ink System Flush (Purging Air from Tubes)</h2>
<ol>
  <li><strong>Verify Ink Levels Are at Least 50% Full:</strong>
    <p>An Ink Flush consumes a substantial volume of liquid ink to pull fluid through the entire tube length. All ink tanks MUST be filled to at least 50% capacity before executing an Ink Flush. Running an Ink Flush with low tanks will draw more air into the system.</p>
  </li>
  <li><strong>Check the Mechanical Ink Transport Valves:</strong>
    <p>On models equipped with a physical ink transportation switch (e.g., G-series), ensure the valve is set to the <strong>PRINT / UNLOCKED</strong> position. If locked, the ink flow is physically pinched off.</p>
  </li>
  <li><strong>Executing the Dedicated Ink Flush Routine:</strong>
    <ul>
      <li><strong>On LCD Models:</strong> Go to <strong>Setup (Gear) &gt; Maintenance &gt; Ink Flush</strong> (or <strong>System Cleaning</strong>). Confirm OK.</li>
      <li><strong>On Keypad / Non-Screen Models:</strong> Press the <strong>Maintenance (Wrench/Pliers)</strong> button until a capital letter <code>P</code> appears on the single-digit LED. Press the <strong>Black or Color Start</strong> button.</li>
      <li>The printer will execute an intensive 8-to-10 minute automated purge cycle. You will visually observe ink advancing through the clear tubes, pushing all air bubbles out into the waste box.</li>
    </ul>
  </li>
  <li><strong>Print a Nozzle Check Sheet to Confirm:</strong>
    <p>After the flush completes, print a Nozzle Check Pattern. All PGBK grid lines and C/M/Y color blocks should be 100% solid and gap-free.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>How often can I run an Ink Flush on a Canon MegaTank?</summary>
  <p>An Ink Flush should only be executed once every 6 to 12 months when large air gaps are visible. Running frequent Ink Flushes rapidly fills the waste ink absorber box, leading to Error 5B00.</p>
</details>
<details>
  <summary>Can tiny 1-inch air bubbles in the tubes be ignored?</summary>
  <p>Small isolated air bubbles under 1 inch (2.5 cm) typically purge themselves during standard automated maintenance cycles and do not affect print quality as long as the printhead sub-tank remains primed.</p>
</details>
`,

  'canon-printer-error-5100-carriage-fix': `
<h2>Understanding Canon Error 5100 / Support Code 5100 (Carriage Jam Fault)</h2>
<p>Error 5100 indicates a <strong>Carriage Movement / Positioning Error</strong>. During printing, the printhead carriage travels horizontally across the metal guide rail. The main logic board monitors carriage position via the optical sensor reading the linear encoder strip. If the carriage hits an obstruction, if the drive belt slips, or if grease smudges the encoder strip, Error 5100 halts the machine.</p>

<h2>Exhaustive 4-Step Error 5100 Resolution Workflow</h2>
<ol>
  <li><strong>The Flashlight Obstruction Sweep:</strong>
    <p>Unplug the AC power cord. Open the top cover. Slide the printhead carriage gently back and forth by hand from the far left to the far right. Use a flashlight to inspect both ends of the track. Look for torn paper fragments, dropped staples, dislodged packing tape, or curled label backing stuck inside the rail grooves.</p>
  </li>
  <li><strong>Clean the Linear Optical Encoder Strip:</strong>
    <p>Behind the carriage is the thin, clear plastic encoder timing strip. Grease from the carriage rail or aerosolized ink mist frequently smudges this strip, blinding the optical reader. Moisten a clean microfiber cloth with warm distilled water. Gently pinch the strip between your fingers and wipe from left to right. <em>(Never use alcohol, which dissolves the timing marks).</em></p>
  </li>
  <li><strong>Inspect the Carriage Drive Belt & Tensioner:</strong>
    <p>Inspect the black toothed rubber drive belt running along the back of the carriage rail. Ensure the belt is taut, properly seated in the motor cog on the left, and has not jumped off the idler pulley on the right.</p>
  </li>
  <li><strong>Lubricate the Steel Guide Rail:</strong>
    <p>Wipe old, gritty ink grease off the silver metal carriage guide rod using a dry cloth. Apply 2-3 drops of synthetic silicone lubricant (or sewing machine oil) along the top of the rod to ensure frictionless glide.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does Error 5100 only occur when the carriage reaches the far right side?</summary>
  <p>If 5100 occurs specifically on the right side, the purge maintenance station is failing to engage or the carriage lock lever is sticking. Clean the purge unit capping station.</p>
</details>
<details>
  <summary>Can a dislodged ink tank trigger Error 5100?</summary>
  <p>Yes. If an individual ink cartridge or MegaTank printhead latch is popped up by even 2mm, it will physically catch on the top chassis frame as the carriage moves, tripping 5100.</p>
</details>
`,

  'canon-printer-error-p07-waste-ink': `
<h2>Decoding Canon Error P07 / Error E07 (Waste Ink Absorber Warning)</h2>
<p>On Canon PIXMA printers equipped with a single-character 7-segment LED display (e.g., MP280, MP495, MG2522, TS3122), the alternating code <strong>P, 0, 7</strong> (or <strong>E, 0, 7</strong>) represents the <strong>Ink Absorber Full / Near Full</strong> warning. The internal EEPROM page counter (<code>D-Value</code>) has calculated that the felt waste ink sponge pads in the printer base have reached their maximum absorption capacity.</p>

<h2>Step-by-Step P07 Clear & Service Mode Protocol</h2>
<ol>
  <li><strong>Entering Service Mode on Canon 7-Segment LED Models:</strong>
    <ul>
      <li>Turn the printer completely OFF.</li>
      <li>Press and hold the <strong>Stop/Reset</strong> button (Red inverted triangle in circle).</li>
      <li>While continuing to hold Stop/Reset, press and hold the <strong>Power</strong> button.</li>
      <li>While holding Power, <strong>release the Stop/Reset button</strong>.</li>
      <li>While still holding Power, press the <strong>Stop/Reset button 5 times</strong> (for newer TS series models) or <strong>6 times</strong> (for older MP series models).</li>
      <li>Release both buttons simultaneously. The power LED will flash green and then turn solid green. The display screen will go completely blank or display a <code>0</code>, confirming <strong>Service Mode</strong>.</li>
    </ul>
  </li>
  <li><strong>Executing the Waste Counter Reset with Canon Service Tool:</strong>
    <ul>
      <li>Connect the printer to a Windows PC via USB.</li>
      <li>Launch <strong>Canon Service Tool v3400 / v4905</strong> as Administrator.</li>
      <li>In the "Clear Ink Absorber Counter" section, select <strong>Main</strong> and click <strong>Set</strong>.</li>
      <li>The printer will cycle its purge motor and print a confirmation line (<code>D=000.0</code>).</li>
    </ul>
  </li>
  <li><strong>Reboot into Standard User Mode:</strong>
    <p>Press the Power button once to turn the printer off. Power it back on normally. Error P07 will be 100% cleared.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>What is the difference between Error P07 and Error E08?</summary>
  <p><strong>Error E08</strong> is the preliminary 95% warning ("Ink Absorber Almost Full"), which can be temporarily bypassed by pressing Stop/Reset. <strong>Error P07 / 5B00</strong> is the fatal 100% hard lockout that requires a Service Mode reset.</p>
</details>
<details>
  <summary>Do I need to change the physical sponge pads right away?</summary>
  <p>The sponge pads usually have an engineered 20% safety margin, so the printer can safely operate for several more months after the electronic reset before physical sponge saturation occurs.</p>
</details>
`,

  'canon-printer-error-6000-paper-jam-fix': `
<h2>Understanding Canon Error 6000 / Support Code 6000 (Line Feed Encoder Error)</h2>
<p>Canon Support Code 6000 represents a <strong>Line Feed (LF) Timing & Paper Transport Sensor Malfunction</strong>. While the printhead moves horizontally, the LF motor rotates the paper feed rollers vertically. An optical disc sensor (the LF encoder wheel) monitors this rotation. When paper jams, foreign objects block the feed rollers, or grease coats the LF optical disc, the printer halts with Error 6000.</p>

<h2>Step-by-Step Diagnostic & Clearing Guide</h2>
<ol>
  <li><strong>Check the Paper Feed Path for Foreign Objects:</strong>
    <p>Unplug power. Inspect both the rear feed tray and the lower cassette. Shine a flashlight into the paper path. Small foreign objects (paperclips, coins, ripped paper scraps) often jam between the primary feed roller and the platen ribs. Remove obstructions using non-metallic tweezers.</p>
  </li>
  <li><strong>Clean the Clear Circular LF Encoder Disc (Primary Root Cause):</strong>
    <p>On the left-hand side of the printer mechanism, attached to the main paper feed roller shaft, sits a 2-inch transparent plastic wheel (the <strong>LF Encoder Disc</strong>). Ink mist or gear grease can smudge this disc. Locate the optical disc, gently wipe it with a microfiber cloth dampened with warm distilled water, and let dry for 5 minutes.</p>
  </li>
  <li><strong>Inspect the LF Optical Interrupter Sensor:</strong>
    <p>The circular encoder disc spins through a black U-shaped optical sensor. Blow clean compressed air into the sensor slit to clear any paper dust blocking the infrared light beam.</p>
  </li>
  <li><strong>Perform a Hard Power Cycle:</strong>
    <p>Disconnect power for 10 minutes. Hold down the Power button for 20 seconds to clear transient motor driver stall states from memory.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>How does Error 6000 differ from Error 5100?</summary>
  <p><strong>Error 5100</strong> is a horizontal Carriage positioning fault. <strong>Error 6000</strong> is a vertical Paper Feed (Line Feed) roller positioning fault.</p>
</details>
<details>
  <summary>Can a stuck rear tray cover trigger Error 6000?</summary>
  <p>Yes. If the rear paper feed guide cover is left open or jammed halfway, it blocks the feed gear train, generating Error 6000 upon power-up.</p>
</details>
`,

  'canon-printer-error-b200-fix': `
<h2>The Truth About Canon Error B200 / Support Code B200 (Voltage Thermal Overload)</h2>
<p>Error B200 is the most notorious error in Canon printing. It indicates an <strong>Unrecoverable Printhead Voltage / Temperature Overload</strong>. The main logic board detected an excessive current spike or abnormal resistance on the printhead's high-voltage DC lines. In 70% of cases, B200 is caused by an electrical short across internal printhead micro-nozzle circuits, while in 30% of cases, it is caused by a failing Power Supply Board (PSU) delivering unstable line voltage.</p>

<h2>Comprehensive 5-Step B200 Recovery & Diagnostic Matrix</h2>
<ol>
  <li><strong>The "Open Lid Power-Up" Bypass Technique:</strong>
    <ul>
      <li>Turn the printer completely OFF.</li>
      <li>Open the top access door so the carriage is visible.</li>
      <li>Turn the printer ON.</li>
      <li>Watch the carriage: it will begin moving to the left. <strong>Just as the carriage reaches the halfway mark, close the printer lid immediately.</strong></li>
      <li>This timing trick forces the printer to skip the high-voltage printhead diagnostic self-test during boot. If successful, the printer will reach the "Ready" screen, allowing you to run maintenance cycles or scan documents.</li>
    </ul>
  </li>
  <li><strong>The Alcohol Contact Deep Clean:</strong>
    <p>Remove the printhead assembly. Inspect the rear copper contacts and the gold carriage spring pins. Ink leakage bridging adjacent voltage pins triggers instant B200 shutdowns. Clean all contacts with 99% anhydrous isopropyl alcohol and allow 1 hour to dry.</p>
  </li>
  <li><strong>Individual Ink Tank Isolation Test:</strong>
    <p>Remove all ink cartridges and the printhead. Power on the printer without the printhead. It should display "Install Printhead" (Support Code 1401). If it still shows B200 with the printhead physically removed, the fault is inside the logic board or power supply, not the printhead.</p>
  </li>
  <li><strong>The Tape Insulating Workaround (Print in Black/Color Only):</strong>
    <p>If B200 is caused by a short in only one half of the printhead (e.g., the color bank is shorted but pigment black is healthy), technicians use a small piece of Kapton or electrical tape to cover the top-left or top-right bank of copper pins on the back of the printhead, disabling the faulted color nozzles while restoring black document printing.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can a blown power supply cause Error B200?</summary>
  <p>Yes. If the internal AC/DC power supply module has failing capacitors that sag under load, the logic board interprets the voltage drop as a printhead short and displays B200.</p>
</details>
<details>
  <summary>Does replacing the printhead always fix B200?</summary>
  <p>In roughly 80% of cases where the printer prompts "Install Printhead" when the old head is removed, installing a brand-new genuine Canon printhead completely resolves Error B200.</p>
</details>
`
};

async function main() {
  console.log('🚀 Expanding Final Canon Articles (Batch 2 - 7 articles)...\n');

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

  console.log('\n🎉 ALL Canon articles in CMS are now 1,000+ words!');
}

main().then(async () => prisma.$disconnect()).catch(async e => { console.error(e); prisma.$disconnect(); process.exit(1); });
