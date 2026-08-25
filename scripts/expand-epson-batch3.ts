import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function stripCrossBrandLinks(html: string): string {
  return html.replace(/<a\s[^>]*href="\/[^"]*"[^>]*>([^<]*)<\/a>/gi, '$1');
}

const expansions: Record<string, string> = {
  'epson-xp-4100-et-2400-wifi-setup-problems': `
<h2>Why the Epson XP-4100 and ET-2400 Struggle with Wi-Fi Pairing</h2>
<p>The Epson Expression Home XP-4100 and EcoTank ET-2400 are popular compact wireless all-in-ones. Because they utilize single-band <strong>2.4GHz 802.11b/g/n</strong> wireless adapters without 5GHz support, pairing them to modern dual-band mesh Wi-Fi networks (such as eero, Google Nest WiFi, and Netgear Orbi) frequently fails due to automatic 5GHz band steering.</p>

<h2>Step-by-Step Wireless Recovery for XP-4100 and ET-2400</h2>
<ol>
  <li><strong>Use the Epson Smart Panel Mobile App (Direct Bluetooth Setup):</strong>
    <ul>
      <li>Download <strong>Epson Smart Panel</strong> on your iOS or Android smartphone.</li>
      <li>Enable Bluetooth and Location on your phone.</li>
      <li>Turn on the printer. Open the app and tap the <code>+</code> icon.</li>
      <li>The app uses Bluetooth to discover the printer and automatically injects your phone's 2.4GHz Wi-Fi credentials into the printer memory.</li>
    </ul>
  </li>
  <li><strong>Temporarily Disable 5GHz on Your Mesh Router:</strong>
    <p>In your mesh router app, pause or turn off the 5GHz frequency for 15 minutes during printer setup. Once the Epson printer establishes a stable 2.4GHz link, re-enable the 5GHz radio.</p>
  </li>
  <li><strong>Run the On-Screen Wi-Fi Setup Wizard (XP-4100):</strong>
    <p>On the XP-4100 color LCD: Navigate to <strong>Settings &gt; Network Settings &gt; Wi-Fi Setup &gt; Wi-Fi Setup Wizard</strong>. Select your network name and enter the WPA2 key. Note: password entry is case-sensitive.</p>
  </li>
  <li><strong>Push-Button Wi-Fi Setup for ET-2400 (Non-Screen Model):</strong>
    <p>Press and hold the physical <strong>Wi-Fi</strong> button on the ET-2400 for 5 seconds until the Wi-Fi and Wi-Fi Direct LEDs flash alternately. Within 2 minutes, press the <strong>WPS button</strong> on your router.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the Wi-Fi light flash green and orange alternately?</summary>
  <p>Alternating green/orange Wi-Fi flashing indicates an authentication rejection (wrong Wi-Fi password) or an unsupported security mode (such as WPA3-only).</p>
</details>
<details>
  <summary>Can I set a Static IP on the XP-4100 and ET-2400?</summary>
  <p>Yes. Access the printer's Embedded Web Server (type its IP into a browser), navigate to Basic Settings &gt; Network, and change IP settings from DHCP to Manual.</p>
</details>
`,

  'epson-power-ink-light-blinking-together': `
<h2>Understanding Simultaneous Power and Ink Light Flashing on Epson Printers</h2>
<p>When the green/blue Power LED and the amber/red Ink drop LED flash together in unison, the printer's microcontroller has triggered a <strong>Mechanical Carriage Stall / Printhead Positioning Interruption</strong>. The carriage motor attempted to move the printhead across the platen, but encountered physical resistance, excessive guide rail drag, or a dislodged encoder timing strip.</p>

<h2>Step-by-Step Recovery Workflow</h2>
<ol>
  <li><strong>Check the Entire Carriage Path with a Bright Light:</strong>
    <p>Unplug the AC power cord. Open the top printer cover. Gently slide the printhead carriage by hand from the far left to the far right. Use a flashlight to inspect both ends of the track. Look for torn paper fragments, dropped staples, or dislodged packing tape.</p>
  </li>
  <li><strong>Clean the Clear Linear Encoder Timing Strip:</strong>
    <p>Behind the carriage is the thin, transparent plastic encoder strip. Aerosolized ink mist and carriage grease smudge this strip, blinding the optical reader. Gently wipe the strip with a microfiber cloth dampened with warm distilled water. <em>(Never use alcohol).</em></p>
  </li>
  <li><strong>Inspect the Purge Capping Station (Far Right Side):</strong>
    <p>Ensure the rubber capping station and plastic wiper blade can move up and down freely without sticking on dried ink sludge.</p>
  </li>
  <li><strong>Execute a Hard Power Reset:</strong>
    <p>Unplug the printer from the wall for 15 minutes. Hold down the physical Power button for 20 seconds while unplugged to discharge volatile motherboard memory.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>What is the difference between simultaneous flashing and alternating flashing?</summary>
  <p><strong>Simultaneous flashing</strong> (Power + Ink together) indicates a physical carriage stall. <strong>Alternating flashing</strong> (Power then Ink back and forth) indicates the Waste Ink Pad is saturated.</p>
</details>
<details>
  <summary>Can low ink cause both lights to flash simultaneously?</summary>
  <p>No. Low ink causes only the ink light to illuminate solid or blink alone, while the power light remains steady.</p>
</details>
`,

  'epson-fatal-error-printer-wont-start-power-supply': `
<h2>Diagnosing Fatal Startup Failures and Power Supply Faults on Epson Printers</h2>
<p>When an Epson printer completely refuses to power on (no lights, no sounds, no LCD display) or immediately trips a "Fatal Error" shutdown upon pressing the power button, the issue is electrical: a failed AC/DC internal switch-mode power supply, a blown surface-mount pico-fuse (F1/F2), or an ink leak shorting the printhead high-voltage DC rail.</p>

<h2>Exhaustive Electrical Diagnostic Protocol</h2>
<ol>
  <li><strong>Test the AC Power Outlet & Power Cable:</strong>
    <p>Disconnect the power cable from the back of the printer. Test the wall outlet with a lamp. Verify that the power cable fits tightly into the printer socket without wiggling. Avoid battery backup UPS units or loose extension cords.</p>
  </li>
  <li><strong>The 60-Second Capacitor Discharge Test:</strong>
    <p>Unplug the printer from the wall. Press and hold the physical <strong>Power button</strong> for a full 60 seconds while completely disconnected from AC power. This drains all residual charge from the high-voltage electrolytic capacitors on the internal power board. Reconnect directly to a known-working outlet and attempt power-on.</p>
  </li>
  <li><strong>Inspect for Internal Printhead Ink Leaks:</strong>
    <p>Open the printer lid. Look at the white flat flexible ribbon cables (FFC) plugging into the back of the printhead. If ink has pooled around the ribbon connectors, fluid has bridged the high-voltage +42V piezo pins to ground, causing the power supply to enter over-current protection shutdown.</p>
  </li>
  <li><strong>Mainboard F1 / F2 Fuse Inspection:</strong>
    <p>On Epson motherboards, tiny surface-mount fuses (labeled F1 or F2) protect the power supply from printhead shorts. If a multimeter shows open circuit across these fuses, replacing the fuse or board is required.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can a clogged printhead prevent the printer from powering on?</summary>
  <p>No. Physical nozzle clogs have no impact on electrical power startup. Only electrical shorts or power supply component failures prevent power-on.</p>
</details>
<details>
  <summary>Is the internal power supply module replaceable on Epson printers?</summary>
  <p>Yes. The internal AC/DC power supply board can be unscrewed from the chassis base and replaced as an individual modular component.</p>
</details>
`,

  'epson-error-031006-paper-feed-gear-l3110': `
<h2>Understanding Error 031006 on Epson L3110 / L3210 EcoTank Printers</h2>
<p>Error code <strong>031006</strong> (or <strong>0x031006</strong>) is a dedicated <strong>Paper Feed / Line Feed (LF) Drive Gear De-synchronization Error</strong> specific to the Epson EcoTank L3110, L3150, L3210, and L3250 chassis architecture. When the paper pickup roller fails to complete its rotational cycle, or when the white plastic gear cluster on the left chassis wall jumps a tooth, Error 031006 locks the machine.</p>

<h2>Step-by-Step Gear Re-timing & Clearing Guide</h2>
<ol>
  <li><strong>Inspect the Left-Side Paper Feed Gear Train:</strong>
    <p>Unplug the printer and open the top casing. Look at the far left side of the paper feed roller mechanism. You will see a cluster of white plastic gears and a semi-circular pickup roller cam gear. Check for broken gear teeth or foreign objects jammed between the cogs.</p>
  </li>
  <li><strong>Manually Re-index the Paper Pickup Roller:</strong>
    <p>Using your thumb, rotate the large white drive gear forward (toward the front of the printer) until the D-shaped pickup roller rotates completely around and locks back into its flat, horizontal resting position.</p>
  </li>
  <li><strong>Clean the Circular LF Encoder Disc:</strong>
    <p>Next to the left gear train sits a 2-inch transparent plastic timing disc. Clean any ink mist or grease off this disc using a clean microfiber cloth dampened with warm distilled water.</p>
  </li>
  <li><strong>Perform a Hard Power Cycle:</strong>
    <p>Unplug the AC power cord for 10 minutes to reset the paper feed motor driver registers on the mainboard.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does Error 031006 happen right after clearing a paper jam?</summary>
  <p>If jammed paper was yanked backward out of the rear feed tray, the force rotates the pickup gear backward, throwing it out of mechanical synchronization with the optical sensor flag.</p>
</details>
<details>
  <summary>Can a worn separation pad cause Error 031006?</summary>
  <p>Yes. A worn separation pad allows the pickup roller to slip, failing to complete its timed rotation and generating 031006.</p>
</details>
`,

  'epson-printer-stopped-working-suddenly': `
<h2>Emergency Troubleshooting When Your Epson Printer Stops Working Suddenly</h2>
<p>When an Epson printer abruptly stops responding in the middle of a workday — freezing mid-page, ignoring incoming print jobs, or failing to communicate over Wi-Fi — the failure falls into one of three distinct categories: Windows print spooler corruption, dynamic IP address changes, or internal firmware buffer overfill.</p>

<h2>Complete 4-Step Emergency Recovery Protocol</h2>
<ol>
  <li><strong>Flush the Windows Print Queue & Restart the Spooler Service:</strong>
    <ul>
      <li>Press <strong>Windows Key + R</strong>, type <code>services.msc</code>, and press Enter.</li>
      <li>Right-click <strong>Print Spooler</strong> and select <strong>Stop</strong>.</li>
      <li>Press <strong>Windows Key + R</strong>, type <code>%systemroot%\\System32\\Spool\\Printers</code>, and delete all stuck files in this folder.</li>
      <li>Return to Services, right-click <strong>Print Spooler</strong>, and select <strong>Start</strong>.</li>
    </ul>
  </li>
  <li><strong>Execute a 15-Minute Hardware Power Disconnect:</strong>
    <p>Unplug the AC power cord from the wall. Press and hold the physical Power button on the printer for 30 seconds. Leave unplugged for 15 minutes to fully discharge volatile RAM and clear corrupt print buffers.</p>
  </li>
  <li><strong>Check the Printer's Network Port in Windows:</strong>
    <p>Open Control Panel &gt; Devices and Printers &gt; right-click your Epson printer &gt; <strong>Printer Properties &gt; Ports</strong> tab. Verify that the printer is assigned to a Standard TCP/IP Port matching its current IP, NOT a disconnected WSD port.</p>
  </li>
  <li><strong>Test with Direct USB Cable:</strong>
    <p>Connect a USB cable directly from your PC to the printer to confirm whether the issue is network-related or a physical driver/hardware fault.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the printer accept print jobs but print nothing on the paper?</summary>
  <p>If the carriage moves but prints blank pages, the nozzles have air-locked or lost prime. Run two Head Cleaning cycles from the printer maintenance menu.</p>
</details>
<details>
  <summary>Can a Windows Update cause an Epson printer to stop working?</summary>
  <p>Yes. Major Windows 10/11 cumulative updates often replace certified Epson manufacturer drivers with generic Microsoft IPP class drivers, disabling scanning and status monitoring.</p>
</details>
`,

  'epson-scanner-error-0x10-fix': `
<h2>Understanding Epson Scanner Error 0x10 (CIS Home Position & Motor Fault)</h2>
<p>Error <strong>0x10</strong> is a dedicated <strong>Scanner Subsystem Fatal Malfunction</strong> on Epson multifunction all-in-one printers. During power-on bootup, the scanner's Contact Image Sensor (CIS) carriage travels across the flatbed glass to find the home positioning optical interrupter and calibrate white balance against the reference tile. If the scanner carriage is physically blocked, if the drive belt slips, or if the CIS sensor fails, Error 0x10 locks the entire machine.</p>

<h2>Step-by-Step Diagnostic & Scanner Clearing Workflow</h2>
<ol>
  <li><strong>Check the Scanner Transit Lock Switch:</strong>
    <p>Look underneath or on the side of the scanner flatbed assembly. Ensure the sliding mechanical transit lock (padlock icon) is set to the <strong>Unlocked</strong> position.</p>
  </li>
  <li><strong>Clean the White Calibration Reference Strip:</strong>
    <p>Lift the scanner lid. Look at the narrow glass strip on the far left beneath the plastic bezel. Clean this area with optical glass cleaner and a microfiber cloth. If dust, tape adhesive, or correction fluid clouds this white strip, the CIS sensor cannot calibrate white balance and trips 0x10.</p>
  </li>
  <li><strong>Inspect the Scanner Drive Belt & Rail:</strong>
    <p>Open the scanner casing if accessible. Ensure the small ribbed rubber drive belt is seated properly on the stepper motor cog and that the optical carriage slides freely along its guide rail.</p>
  </li>
  <li><strong>Perform a Full 15-Minute Hardware Power Drain:</strong>
    <p>Unplug the AC power cord from the wall. Hold down the Power button for 30 seconds. Leave unplugged for 15 minutes to reset the scanner motor driver IC registers.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I print documents when Error 0x10 is displayed?</summary>
  <p>Because Epson firmware requires all subsystems to pass boot diagnostics, an active 0x10 scanner error locks the entire printer, preventing document printing until the scanner issue is cleared.</p>
</details>
<details>
  <summary>Does cold room temperature cause Error 0x10?</summary>
  <p>Yes. In rooms below 50°F (10°C), the CIS sensor lamp takes longer to warm up to operating brightness, triggering a timeout 0x10 error on boot.</p>
</details>
`,

  'epson-printer-banding-lines-fix': `
<h2>Why Horizontal and Vertical Banding Ruins Epson Prints</h2>
<p>Banding refers to unwanted visible lines or stripes appearing at regular intervals across printed photos and text documents. <strong>Horizontal white lines</strong> indicate clogged Micro Piezo nozzles. <strong>Horizontal dark overlapping lines</strong> indicate paper feed timing calibration errors. <strong>Vertical streaks</strong> indicate physical roller drag or ink buildup on the ejection star wheels.</p>

<h2>Exhaustive 4-Step Banding Elimination Protocol</h2>
<ol>
  <li><strong>Print and Evaluate a Nozzle Check Pattern:</strong>
    <p>Go to <strong>Maintenance &gt; Nozzle Check</strong>. If any color staircase pattern contains gaps or missing lines, execute 1-2 standard <strong>Head Cleaning</strong> cycles. Let the printer rest for 30 minutes to allow fresh ink to dissolve nozzle crusts.</p>
  </li>
  <li><strong>Execute Print Head Alignment (Horizontal & Vertical):</strong>
    <ul>
      <li>Load fresh, bright white paper.</li>
      <li>Select <strong>Maintenance &gt; Print Head Alignment</strong>.</li>
      <li>The printer prints numbered alignment blocks. Select the box with the smoothest, most solid pattern in each set. This synchronizes bidirectional dot placement timing.</li>
    </ul>
  </li>
  <li><strong>Clean the Linear Optical Encoder Strip:</strong>
    <p>If horizontal banding is irregular or wavy, ink mist on the clear plastic encoder strip behind the carriage is causing positioning jitter. Clean the strip gently with warm distilled water on a microfiber cloth.</p>
  </li>
  <li><strong>Clean the Exit Star Wheels (Fixing Vertical Scratch Lines):</strong>
    <p>At the front paper exit slot sits a row of spiky metal star wheels. Clean each wheel with a damp cotton swab to remove wet ink buildup that tracks across drying photos.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does banding appear only in Standard quality mode but disappears in High quality mode?</summary>
  <p>High quality mode uses multi-pass overlapping dot patterns that physically mask minor nozzle clogs. Running a Head Cleaning will fix the underlying clogs so Standard mode prints cleanly.</p>
</details>
<details>
  <summary>Can low ink levels cause banding?</summary>
  <p>Yes. When ink reservoirs drop below 15%, air bubbles enter the printhead manifold, causing intermittent starvation during wide print sweeps.</p>
</details>
`,

  'epson-error-e-01-printer-error-fix': `
<h2>Understanding Epson Error E-01 (Fatal Hardware Error / Mechanical Stop)</h2>
<p>Epson Error <strong>E-01</strong> is a general fatal hardware stop code displayed on compact LCD models. It signifies that the printer encountered an unexpected mechanical resistance during initial self-test: the carriage cannot complete its sweep, the paper feed rollers cannot rotate, or a foreign object is wedged in the print platen.</p>

<h2>Step-by-Step Diagnostic & Clearing Guide</h2>
<ol>
  <li><strong>The Flashlight Foreign Object Sweep:</strong>
    <p>Unplug the AC power cord. Open the scanner cover. Slide the printhead carriage gently by hand from the far left to the far right. Use a flashlight to inspect both ends of the track. Look for torn paper fragments, dropped paperclips, coins, or dislodged packing tape.</p>
  </li>
  <li><strong>Clean the Linear Optical Encoder Strip:</strong>
    <p>Behind the carriage is the thin, clear plastic encoder timing strip. Ink mist and carriage grease smudge this strip, blinding the optical reader. Gently wipe the strip with a microfiber cloth dampened with warm distilled water.</p>
  </li>
  <li><strong>Check the Purge Unit (Right Side):</strong>
    <p>Ensure the rubber capping station and plastic wiper blade on the far right can move up and down freely without sticking on dried ink sludge.</p>
  </li>
  <li><strong>Perform a Full 15-Minute Power Reset:</strong>
    <p>Unplug the power cord for 15 minutes. Hold the Power button for 20 seconds while unplugged to clear the mechanical error flag from volatile memory.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does Error E-01 occur immediately when I turn on the printer?</summary>
  <p>During bootup, the printer sweeps the carriage across its full width. If the carriage cannot complete this test sweep within 3 seconds, Error E-01 is generated on startup.</p>
</details>
<details>
  <summary>Can a dry carriage rail cause Error E-01?</summary>
  <p>Yes. If the steel guide rod is dry, bushing friction will overload the drive motor. Apply 2 drops of synthetic silicone oil across the guide rod.</p>
</details>
`,

  'epson-maintenance-box-replacement-cost-diy': `
<h2>The Economics & Engineering of the Epson Maintenance Box</h2>
<p>Modern Epson EcoTank and WorkForce printers utilize a dedicated, user-replaceable <strong>Maintenance Box (Waste Ink Box)</strong> equipped with absorbent porous felt pads and an integrated microchip (e.g., T04D1, T6716, T04D0). The maintenance box captures waste ink flushed during nozzle cleaning cycles and borderless printing.</p>

<h2>DIY Maintenance vs. OEM Box Replacement Comparison</h2>
<table style="width:100%; border-collapse: collapse; margin: 20px 0;">
  <thead>
    <tr style="background-color: #f3f4f6; text-align: left;">
      <th style="padding: 10px; border: 1px solid #d1d5db;">Attribute</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">OEM Maintenance Box Replacement</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">DIY Sponge Wash & Chip Reset</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Average Cost</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">$12 - $25 (Genuine Epson OEM)</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">$0 (Washing) + $10 (One-time Chip Resetter tool)</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Installation Time</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">2 minutes (Single flathead screw on rear/side)</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">48 hours (Required drying time for washed sponges)</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Mess & Risk</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Zero mess; sealed disposable plastic cartridge</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">High ink stain risk; gloves and protective apron required</td>
    </tr>
  </tbody>
</table>

<h2>Step-by-Step Maintenance Box Replacement Protocol</h2>
<ol>
  <li>Turn off the printer power.</li>
  <li>Locate the maintenance box access cover on the rear or side of the machine.</li>
  <li>Loosen the single flathead or Phillips screw holding the plastic cover and remove the door.</li>
  <li>Slide out the old maintenance box cartridge.</li>
  <li>Insert the brand-new maintenance box until it clicks into its guide rails.</li>
  <li>Reattach the access door and tighten the screw. Turn on the printer — the maintenance counter will reset to 0% automatically via the new box's microchip.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I wash and dry the felt pads inside the maintenance box?</summary>
  <p>Yes. You can wear rubber gloves, remove the felt pads, wash them thoroughly in warm running water until the water runs clear, squeeze them out, let them dry completely in the sun for 48 hours, and reinstall them. However, you must also use an electronic chip resetter tool to reset the microchip pins.</p>
</details>
<details>
  <summary>How many pages does a typical Epson maintenance box last?</summary>
  <p>Under standard office printing conditions, an Epson maintenance box lasts between 15,000 and 30,000 pages or approximately 2 to 3 years of automated cleaning cycles.</p>
</details>
`,

  'epson-all-lights-blinking-at-once-fatal-error': `
<h2>Understanding the "All Lights Blinking at Once" Fatal Error on Epson Printers</h2>
<p>When every LED indicator on your Epson printer (Power, Wi-Fi, Paper, Ink) flashes simultaneously in a rapid, synchronized pulse, the printer's mainboard has triggered a <strong>Fatal System Exception / Emergency Engine Halt</strong>. The printer has shut down to protect high-voltage circuits, prevent motor driver burnout, or halt an unrecoverable mechanical collision.</p>

<h2>Step-by-Step 4-Stage Fatal Error Recovery Protocol</h2>
<ol>
  <li><strong>Stage 1: Complete 30-Minute Hardware Power Disconnect:</strong>
    <ul>
      <li>Disconnect the power cord from the wall outlet and the rear of the printer.</li>
      <li>Press and hold the physical Power button for 30 seconds while unplugged.</li>
      <li>Leave the printer disconnected for at least 30 minutes to allow logic board cache registers and driver IC capacitors to fully discharge.</li>
      <li>Reconnect AC power directly to a wall socket (no surge protectors or extension cords).</li>
    </ul>
  </li>
  <li><strong>Stage 2: Check the Entire Carriage Path:</strong>
    <p>Open the top cover. Slide the printhead carriage gently by hand from far left to far right. Look for foreign objects, paper clips, torn paper scraps, or loose packaging materials lodged in the carriage rails.</p>
  </li>
  <li><strong>Stage 3: Clean the Linear Optical Encoder Timing Strip:</strong>
    <p>Behind the carriage is the thin, transparent plastic encoder strip. Aerosolized ink mist and carriage grease smudge this strip, blinding the optical reader. Gently wipe the strip with a microfiber cloth dampened with warm distilled water.</p>
  </li>
  <li><strong>Stage 4: Check the Waste Ink Pad Counter Status:</strong>
    <p>If the lights flash after power-on initialization, check whether the waste ink counter has reached 100% saturation. Use the free Epson Status Monitor utility on your PC to verify if "Parts inside your printer are at the end of their service life" is reported.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>What is the difference between simultaneous flashing and alternating flashing?</summary>
  <p><strong>Simultaneous flashing</strong> (all lights pulsing together) indicates a fatal mechanical carriage stall or electrical fault. <strong>Alternating flashing</strong> (lights blinking back and forth like railroad crossing lights) indicates the Waste Ink Pad Counter is saturated.</p>
</details>
<details>
  <summary>Can a blown motherboard fuse cause all lights to flash?</summary>
  <p>Yes. If ink leaked into the printhead ribbon cable and shorted the +42V piezo rail, the mainboard F1/F2 fuse blows, causing the firmware to flash all lights on startup.</p>
</details>
`
};

async function main() {
  console.log('🚀 Expanding Epson Articles (Batch 3 - 10 articles)...\n');

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

  console.log('\n🎉 Epson Batch 3 Complete!');
}

main().then(async () => prisma.$disconnect()).catch(async e => { console.error(e); prisma.$disconnect(); process.exit(1); });
