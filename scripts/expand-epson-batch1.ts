import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function stripCrossBrandLinks(html: string): string {
  return html.replace(/<a\s[^>]*href="\/[^"]*"[^>]*>([^<]*)<\/a>/gi, '$1');
}

const expansions: Record<string, string> = {
  'epson-et-2760-not-printing-fix': `
<h2>Understanding Why the Epson EcoTank ET-2760 Stops Printing</h2>
<p>The Epson EcoTank ET-2760 is a cartridge-free supertank printer utilizing a Micro Piezo permanent printhead. When the printer stops printing (spitting out blank pages, missing black text, or faint lines), the problem is never an empty cartridge. Instead, the failure stems from dried pigment or dye in the micro-piezo nozzles, air locks in the silicone ink supply tubes, or a depleted internal damper reservoir.</p>

<h2>Exhaustive 4-Step ET-2760 Restoration Protocol</h2>
<ol>
  <li><strong>Check Tank Ink Levels Visually (Do Not Trust the Screen):</strong>
    <p>Look at the actual physical ink windows on the front of the ET-2760. If ink is below the lower fill line, air will be sucked into the internal delivery lines. Fill all four ink tanks with genuine Epson 502 ink bottles before troubleshooting.</p>
  </li>
  <li><strong>Run a Nozzle Check and Staged Head Cleaning:</strong>
    <ul>
      <li>On the LCD screen, go to <strong>Maintenance &gt; Print Head Nozzle Check &gt; Print</strong>.</li>
      <li>If the pattern has gaps or missing color staircases, select <strong>Clean Print Head</strong>.</li>
      <li>Run up to 2 cleaning cycles. <em>Important:</em> After 2 cycles, let the printer sit idle for 30 minutes. The capillary action of fresh ink will naturally dissolve softened clogs.</li>
    </ul>
  </li>
  <li><strong>Execute a Power Cleaning (The Deep Flush):</strong>
    <p>If standard cleanings fail after 12 hours, execute a <strong>Power Cleaning</strong> (Maintenance &gt; Power Cleaning). The printer engages an internal motorized pump to pull a massive volume of ink through the tubes, flushing stubborn air bubbles and hardened ink into the maintenance box.</p>
  </li>
  <li><strong>Manual Damper Priming (For Persistent Air Locks):</strong>
    <p>If clear air gaps are visible in the ink lines, remove the internal damper modules from the carriage, insert a blunt plastic syringe into the bottom damper valve, and draw 2ml of ink until all air is evacuated from the line.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>How much ink does ET-2760 Power Cleaning consume?</summary>
  <p>Power Cleaning uses approximately 1/3 of an ink tank and requires at least 30% capacity in the waste ink maintenance box. Only run Power Cleaning once every 12 hours.</p>
</details>
<details>
  <summary>Why does the ET-2760 print color but no black text?</summary>
  <p>The black ink in the ET-2760 is pigment-based, while color inks are dye-based. Pigment ink dries faster and forms tougher clogs if the printer is left unused. Running a Power Clean resolves pigment clogs.</p>
</details>
`,

  'epson-l5290-error-reset-factory-default': `
<h2>When to Perform a Full Reset on the Epson EcoTank L5290</h2>
<p>The Epson EcoTank L5290 is a wireless multifunction all-in-one printer with fax and ADF capabilities. Performing a factory reset restores all network routing tables, clears corrupted fax memory buffers, resets administrator passwords, and re-initializes scan-to-cloud profiles.</p>

<h2>Method 1: Control Panel LCD Soft Reset</h2>
<ol>
  <li>On the L5290 home screen, scroll to <strong>Settings (Gear Icon)</strong> and press <strong>OK</strong>.</li>
  <li>Navigate to <strong>Restore Default Settings</strong>.</li>
  <li>Choose your desired reset level:
    <ul>
      <li><strong>Network Settings:</strong> Resets Wi-Fi, IP configuration, and Wi-Fi Direct passwords to factory defaults without erasing fax contacts.</li>
      <li><strong>Clear All Data and Settings:</strong> Wipes all user data, address book contacts, fax logs, and restores out-of-the-box factory defaults.</li>
    </ul>
  </li>
  <li>Confirm by pressing <strong>OK / Yes</strong>. The printer will reboot automatically.</li>
</ol>

<h2>Method 2: Hard Button Power-On NVRAM Reset</h2>
<ol>
  <li>Turn the printer completely OFF.</li>
  <li>Press and hold the physical <strong>Cancel (Stop / Triangle)</strong> button and the <strong>Power</strong> button simultaneously.</li>
  <li>Hold both buttons until the status LED flashes, then release. The printer will re-flash default NVRAM tables.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Does a factory reset clear the Waste Ink Pad Counter on the L5290?</summary>
  <p>No. The waste ink pad counter is stored in protected flash memory and cannot be reset through standard menu resets. Resetting waste ink counters requires Epson Adjustment Program software.</p>
</details>
<details>
  <summary>What is the default administrator password after a factory reset?</summary>
  <p>On modern Epson L-series printers, the default administrator password is the printer's unique <strong>Serial Number</strong> (printed on the barcode sticker on the back of the machine).</p>
</details>
`,

  'epson-printer-error-light-stays-on-solid': `
<h2>Decoding a Solid Red / Amber Error Light on Epson Printers</h2>
<p>When the red or orange exclamation/error LED stays on solid (without blinking), the printer is indicating a permanent hardware stop condition. The printer has suspended all operations because a required consumable is missing or exhausted, a physical access door is open, or paper has jammed during initial load.</p>

<h2>Exhaustive Diagnostic Checklist for Solid Red Error Light</h2>
<ol>
  <li><strong>Check the Paper Tray and Paper Path:</strong>
    <p>Ensure paper is loaded straight in the rear or bottom feed tray. If paper is loaded, verify that the edge guides are snug. If paper ran out mid-job, load at least 10 sheets and press the physical <strong>Paper / Start</strong> button to clear the solid red light.</p>
  </li>
  <li><strong>Verify All Scanner & Access Covers Are Fully Latched:</strong>
    <p>A solid red light is immediately triggered if the scanner unit, cartridge access door, or rear cleanout panel is open by even 1mm. Lift and firmly close all outer covers until both left and right latches click shut.</p>
  </li>
  <li><strong>Check for Empty Ink Levels / Chipped Bottle Errors:</strong>
    <p>On EcoTank and cartridge-based models, if an ink tank is registered as 100% empty, the printer illuminates the solid ink LED and locks the carriage. Refill the ink tank or replace the depleted cartridge and confirm on-screen.</p>
  </li>
  <li><strong>Check for Transportation Lock Switches:</strong>
    <p>If you recently moved or unboxed the printer, verify that the blue plastic transportation lock lever (near the ink tank or scanner) is switched to the <strong>Unlocked / Print</strong> position.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>What is the difference between a solid red light and a blinking red light on an Epson printer?</summary>
  <p>A <strong>solid red light</strong> indicates a simple operator-correctable state (out of paper, door open, empty ink). A <strong>blinking red light</strong> indicates an active mechanical jam, carriage stall, or fatal hardware component failure.</p>
</details>
<details>
  <summary>Can a full maintenance box cause a solid red light?</summary>
  <p>Yes. When the maintenance box (waste ink tank) reaches 100% saturation, the error light turns solid and the LCD prompts "Maintenance Box is at the end of its service life".</p>
</details>
`,

  'epson-l3250-red-light-blinking-fix': `
<h2>Understanding the LED Blink Combinations on the Epson EcoTank L3250</h2>
<p>The Epson EcoTank L3250 is a compact Wi-Fi printer featuring dedicated LED icons for Wi-Fi, Wi-Fi Direct, Paper, and Ink. When red lights begin blinking, the combination of which specific LEDs are flashing identifies the exact hardware fault.</p>

<h2>L3250 LED Diagnostic Matrix</h2>
<table style="width:100%; border-collapse: collapse; margin: 20px 0;">
  <thead>
    <tr style="background-color: #f3f4f6; text-align: left;">
      <th style="padding: 10px; border: 1px solid #d1d5db;">Blinking LED Pattern</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">Hardware Error State</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">Required Resolution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Paper Light Blinking</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Paper Jam or Paper Size Mismatch</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Clear jammed paper; press Paper button to resume.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Ink Light Blinking</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Ink Levels Low / Initial Charge Required</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Refill tanks; hold Stop/Cancel button for 5 seconds to reset ink counter.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Paper & Ink Blinking Alternately</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Waste Ink Pad Counter Near End of Life</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Service is required; reset waste counter with Epson Adjustment Tool.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Paper & Ink Blinking Simultaneously</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Fatal Hardware Error / Carriage Jam</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Clear foreign objects; clean encoder strip; perform power drain reset.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Wi-Fi & Wi-Fi Direct Blinking Together</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Wi-Fi Connection Error / Wrong Password</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Rerun Wi-Fi setup via Epson Smart Panel app.</td>
    </tr>
  </tbody>
</table>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>How do I reset the ink light on the Epson L3250 after refilling?</summary>
  <p>Press and hold the physical <strong>Stop (Triangle)</strong> button for 5 seconds until the power light flashes. The printer will reset its ink level tracking state.</p>
</details>
<details>
  <summary>Why do all lights flash on the L3250 when powered on?</summary>
  <p>Simultaneous flashing of all lights (Power, Paper, Ink, Wi-Fi) indicates a fatal error — usually a foreign object lodged in the carriage path or a detached encoder strip.</p>
</details>
`,

  'epson-printer-power-light-blinking-wont-print': `
<h2>Why the Epson Power Light Keeps Blinking Indefinitely</h2>
<p>When an Epson printer powers on, the green or blue Power LED pulses while the internal firmware performs hardware initialization: cycling the carriage motor, homing the scanner CIS bar, pumping the purge station, and checking thermistors. If the power light blinks continuously without settling on a solid "Ready" state, one of these mandatory startup self-tests is failing to complete.</p>

<h2>Step-by-Step Diagnostic & Startup Recovery</h2>
<ol>
  <li><strong>Check for Stuck Print Spooler Jobs on Your PC:</strong>
    <p>If your computer sent a corrupted 500MB PDF document, the printer buffer can freeze mid-spool, causing the power light to blink endlessly as it waits for missing packets. Open Windows Print Queue, click <strong>Printer &gt; Cancel All Documents</strong>, and restart your PC.</p>
  </li>
  <li><strong>Inspect the Carriage Lock & Rail Freedom:</strong>
    <p>Unplug the printer. Open the top cover. Gently move the printhead carriage by hand across the steel guide rail. If it meets resistance or is jammed against a piece of packing tape on the far right, clear the obstruction.</p>
  </li>
  <li><strong>The 60-Second Full Power Capacitor Drain:</strong>
    <p>Disconnect the AC power cord from both the wall and the back of the printer. Press and hold the physical Power button for 30 seconds while unplugged. Leave disconnected for 15 minutes before plugging back in directly to a wall socket.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the power light blink during firmware updates?</summary>
  <p>During automated firmware updates, the power light pulses rapidly. Do NOT unplug the printer during this process, as cutting power during a ROM write will brick the logic board.</p>
</details>
<details>
  <summary>Can a clogged printhead make the power light blink?</summary>
  <p>No. Clogged nozzles affect print quality but do not prevent the printer from reaching a solid "Ready" power state.</p>
</details>
`,

  'epson-printer-beeping-and-blinking': `
<h2>Understanding Acoustic Beeps and LED Alarm Codes on Epson Printers</h2>
<p>Many commercial and desktop Epson printers (including WorkForce, SureColor, and POS receipt models) incorporate an internal piezo speaker to emit acoustic beeps when hardware errors occur. Combining the beep cadence with LED indicator patterns provides immediate diagnostic insight.</p>

<h2>Acoustic Beep Diagnostic Matrix</h2>
<ul>
  <li><strong>3 Rapid Beeps:</strong> Paper Jam or Cover Open. Check the paper feed chute and ensure all scanner lids are closed.</li>
  <li><strong>5 Beeps + Blinking Ink LED:</strong> Ink Cartridge Unrecognized or Empty. Clean chip contacts or replace cartridge.</li>
  <li><strong>Continuous Rapid Beeping + All LEDs Flashing:</strong> Fatal Hardware Component Failure (Carriage motor stall, power supply over-voltage, or motherboard fuse blow).</li>
  <li><strong>1 Long Beep:</strong> Print job received successfully or initialization complete.</li>
</ul>

<h2>Step-by-Step Recovery Workflow</h2>
<ol>
  <li>Turn off the printer immediately to silence the piezo buzzer.</li>
  <li>Open the cover and use a flashlight to check for mechanical obstructions in the carriage track and paper rollers.</li>
  <li>Verify that ink cartridges/tanks are properly seated and locked down.</li>
  <li>Unplug power for 10 minutes to reset the alarm register on the controller board.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I disable the beeping sound on my Epson printer?</summary>
  <p>On printers equipped with LCD screens, navigate to <strong>Settings &gt; Basic Settings &gt; Sound &gt; Button Press / Error Warning</strong> and adjust the volume or toggle to Silent Mode.</p>
</details>
<details>
  <summary>Why does my Epson POS receipt printer beep constantly?</summary>
  <p>On Epson TM-series receipt printers, continuous beeping indicates the roll paper cover is open or the thermal paper roll is completely exhausted.</p>
</details>
`,

  'epson-controller-error-printer-fix': `
<h2>Technical Breakdown of Epson "Controller Error / System Error"</h2>
<p>When an Epson printer displays "Controller Error" or fatal hex code <strong>0x000041 / 0x000020 / 0x2000020A</strong>, the main microprocessor on the formatter board has encountered an unhandled exception: corrupted internal firmware, RAM buffer parity error, blown surface-mount pico-fuse (F1/F2), or a shorted ASIC driver IC.</p>

<h2>Step-by-Step Formatter Recovery Protocol</h2>
<ol>
  <li><strong>Disconnect All External Data Interfaces:</strong>
    <p>Disconnect all USB cables, Ethernet cables, and SD cards from the printer. If a corrupted network packet or faulty USB host controller is sending malformed data, it can cause the printer's controller to crash on boot.</p>
  </li>
  <li><strong>Hard NVRAM Cold Reset:</strong>
    <ul>
      <li>Unplug the power cord from the wall.</li>
      <li>Press and hold the physical Power button for 30 seconds.</li>
      <li>Leave the printer unplugged for a full 30 minutes to allow all on-board capacitors and volatile cache registers to discharge completely.</li>
      <li>Reconnect AC power directly to a clean wall outlet without any USB or network cables connected. Power on.</li>
    </ul>
  </li>
  <li><strong>Reflash Firmware via USB Recovery Mode:</strong>
    <p>If the controller boots to a recovery screen, connect via USB to a Windows PC and run the official <strong>Epson Firmware Update Utility</strong> to re-flash the system ROM image.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>What causes mainboard F1/F2 fuses to blow on Epson printers?</summary>
  <p>When ink leaks from the printhead into the ribbon cable connector, it creates a short circuit between the high-voltage +42V piezo firing rail and ground, instantly blowing the board's protective pico-fuses.</p>
</details>
<details>
  <summary>Is a Controller Error repairable at home?</summary>
  <p>If the error clears after a 30-minute power drain, it was a transient cache fault. If the error is permanent and caused by a blown motherboard fuse, micro-soldering replacement fuses or swapping the mainboard is required.</p>
</details>
`,

  'epson-ecotank-ink-tank-not-detected': `
<h2>Understanding "Ink Tank Not Detected / Chipped Bottle" Errors</h2>
<p>While most EcoTank models use simple gravity-fed ink bottles, select commercial EcoTank and WorkForce models (such as ET-5800, ET-8550, and L-series Pro) incorporate electronic RFID or optical microchips on the ink bottle nozzles and tank caps to verify ink authenticity, prevent color cross-filling, and track consumable batch dates.</p>

<h2>Step-by-Step Fix for Undetected Tanks & Fill Errors</h2>
<ol>
  <li><strong>Inspect the Tank Fill Port Keying Mechanism:</strong>
    <p>Epson EcoTank bottles feature unique mechanical keying shapes for each color (Cyan, Magenta, Yellow, Black). If you attempt to force the wrong color bottle into a port, the mechanical key will not engage, preventing the bottle valve from opening and triggering an alert.</p>
  </li>
  <li><strong>Manual Ink Level Override via LCD Menu:</strong>
    <ul>
      <li>On the printer display, navigate to <strong>Maintenance &gt; Fill Ink &gt; Next</strong>.</li>
      <li>Select the specific ink color you refilled (e.g., Black or Cyan).</li>
      <li>Use the on-screen prompts to confirm that the tank is filled to the upper line. This manually updates the firmware's software counter to 100%.</li>
    </ul>
  </li>
  <li><strong>Clean the Optical Tank Level Prism (On Sensor-Equipped Models):</strong>
    <p>High-end EcoTank models use an optical prism inside the tank to detect fluid level. If dried ink crust coats the optical window, clean the exterior transparent tank wall with a damp cloth.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I use generic bottled ink in my Epson EcoTank?</summary>
  <p>Yes, standard EcoTank reservoirs will accept compatible bulk ink. However, ensure the ink matches the correct chemical formulation (pigment black for documents, dye colors for photos) to prevent printhead clogging.</p>
</details>
<details>
  <summary>Why does the printer still show low ink after I filled the tank to the top?</summary>
  <p>EcoTank printers calculate ink levels mathematically based on drop counts, not physical float sensors. You must confirm the refill on the printer's LCD screen (Maintenance &gt; Reset Ink Level) to update the software gauge.</p>
</details>
`,

  'epson-ecotank-prints-one-color-only': `
<h2>Why Epson EcoTank Printers Suddenly Print Only One Color</h2>
<p>When an EcoTank printer prints only yellow, only black, or fails to print composite colors, the issue is physical air intrusion in the silicone ink delivery lines, a clogged color damper, or an unseated printhead ribbon cable.</p>

<h2>Complete 4-Step Color Subsystem Restoration</h2>
<ol>
  <li><strong>Visual Inspection of Ink Lines (The Air Bubble Check):</strong>
    <p>Lift the scanner bed to inspect the clear silicone tubes running from the front ink reservoirs to the moving carriage. If you see large clear air gaps (several inches long) in the Cyan or Magenta tubes, no liquid ink is reaching the printhead nozzles.</p>
  </li>
  <li><strong>Execute a Power Cleaning Cycle:</strong>
    <p>Go to <strong>Settings &gt; Maintenance &gt; Power Cleaning</strong>. The printer will run an intensive 8-minute pump cycle that draws ink through all four tubes simultaneously, purging air pockets into the waste box.</p>
  </li>
  <li><strong>Manual Damper Syringe Priming (Direct Line Purge):</strong>
    <ul>
      <li>Unplug power and remove the carriage cover.</li>
      <li>Gently unclip the four color damper cartridges.</li>
      <li>Insert the tip of a blunt plastic syringe into the circular outlet valve of the missing color damper.</li>
      <li>Gently pull the plunger back until 1-2ml of solid, bubble-free ink flows into the syringe.</li>
      <li>Re-clip the damper into the carriage.</li>
    </ul>
  </li>
  <li><strong>Check Print Driver Color Settings:</strong>
    <p>In Windows Print Preferences, verify that the color management setting is not accidentally locked to "Monochrome" or a corrupted custom ICC profile.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the missing color return for one page after cleaning and then disappear again?</summary>
  <p>This classic symptom indicates a clogged damper filter or a pinched ink supply tube. The small amount of ink pulled into the damper prints one sheet, but restricted flow prevents the damper from refilling during printing.</p>
</details>
<details>
  <summary>Can mixing dye and pigment ink cause color blockage?</summary>
  <p>Yes. Mixing pigment and dye inks inside the same reservoir can cause chemical precipitation, creating gelatinous clumps that completely seal the damper mesh.</p>
</details>
`,

  'epson-et-4760-error-code-guide': `
<h2>Master Diagnostic Error Code Guide for the Epson EcoTank ET-4760</h2>
<p>The Epson EcoTank ET-4760 is an all-in-one wireless office printer with duplexing and ADF. When hardware faults occur, the touchscreen displays 6-digit hex error codes. Below is the complete decoding and resolution reference.</p>

<h2>ET-4760 Error Code Matrix</h2>
<table style="width:100%; border-collapse: collapse; margin: 20px 0;">
  <thead>
    <tr style="background-color: #f3f4f6; text-align: left;">
      <th style="padding: 10px; border: 1px solid #d1d5db;">Error Code</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">Hardware Fault Identified</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">Technical Fix Procedure</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>0x9A / 0x97</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Printhead / Mainboard Circuitry Short</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Clean printhead ribbon cable contacts; perform 30-min power drain.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>0x000041</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Carriage Jam / Foreign Object Obstruction</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Clear paper scraps from carriage rail; clean linear optical encoder strip.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>0x000031</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Scanner Motor / CIS Home Position Fault</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Unlock scanner carriage; clean white calibration reference strip.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>0x000021</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Paper Feed (Line Feed) Roller Motor Stall</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Clean circular LF encoder disc on the left side of feed roller shaft.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>0x000010</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">ADF Document Feeder Paper Sensor Jam</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Open ADF top cover; clean ADF pickup and separation rollers.</td>
    </tr>
  </tbody>
</table>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>What is the user-replaceable maintenance box part number for the ET-4760?</summary>
  <p>The ET-4760 uses the <strong>Epson T04D100 (T04D1)</strong> maintenance box, which is easily replaced via the rear access slot with a single flathead screw.</p>
</details>
<details>
  <summary>How do I clear error 0x97 on the ET-4760?</summary>
  <p>Error 0x97 is often triggered by an internal voltage surge. Disconnect all cables, hold the power button for 30 seconds, and let the printer rest unplugged for 1 hour before reconnecting directly to a wall outlet.</p>
</details>
`
};

async function main() {
  console.log('🚀 Expanding Epson Articles (Batch 1 - 10 articles)...\n');

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

  console.log('\n🎉 Epson Batch 1 Complete!');
}

main().then(async () => prisma.$disconnect()).catch(async e => { console.error(e); prisma.$disconnect(); process.exit(1); });
