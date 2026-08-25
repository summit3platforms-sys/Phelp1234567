import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function stripCrossBrandLinks(html: string): string {
  return html.replace(/<a\s[^>]*href="\/[^"]*"[^>]*>([^<]*)<\/a>/gi, '$1');
}

const expansions: Record<string, string> = {
  'epson-error-code-list-by-model-master-index': `
<h2>Epson Master Hex Error Code Reference Guide</h2>
<p>Modern Epson inkjet, EcoTank, and WorkForce printers utilize a standardized hexadecimal error telemetry system. When a hardware fault or mechanical exception occurs, the controller logs a 6-digit hex code (or 2-digit alphanumeric code). Below is the comprehensive master diagnostic index.</p>

<h2>Complete Hex Error Diagnostic Matrix</h2>
<table style="width:100%; border-collapse: collapse; margin: 20px 0;">
  <thead>
    <tr style="background-color: #f3f4f6; text-align: left;">
      <th style="padding: 10px; border: 1px solid #d1d5db;">Hex Code</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">Subsystem & Description</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">Recommended Technical Fix</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>0x97</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Motherboard &amp; Printhead Power Over-Current Fault</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Disconnect all cables; discharge power capacitors for 30 mins; clean head FFC contacts.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>0x9A</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Carriage Motor Overload / Driver IC Overheat</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Clear debris from carriage guide rail; lubricate steel shaft with synthetic silicone.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>0x000041</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Paper Jam / Carriage Obstruction / CR Sensor Fault</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Inspect paper path; clean clear linear optical encoder strip behind carriage.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>0x000031</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Scanner Motor / CIS Unit Home Position Failure</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Unlock flatbed scanner transit lock; clean white optical calibration strip.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>0x000021</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Paper Feed (Line Feed) Roller Motor Stall</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Clean circular transparent LF encoder disc on the left end of main feed roller shaft.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>0x031002</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Carriage Encoder Read Error (CR PID Failure)</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Wipe encoder strip with distilled water; check carriage optical sensor for dust.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>0x031006</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Paper Feed Gear Train De-synchronization (L3110 / L3210)</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Re-align the white plastic pickup roller timing gear cluster on the left chassis.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>E-01</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Fatal Hardware Stop / Foreign Object Interruption</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Check for dropped staples, paperclips, or packing tape; complete 10-minute power reset.</td>
    </tr>
  </tbody>
</table>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>How do I clear error codes that persist after removing a paper jam?</summary>
  <p>Epson firmware latches mechanical sensor errors in volatile memory. Disconnect the power cord from the wall for at least 15 minutes to allow the mainboard capacitors to fully discharge and reset the error registers.</p>
</details>
<details>
  <summary>What is the difference between an "E" error and a "0x" error?</summary>
  <p><strong>"E" errors</strong> (e.g., E-01, E-02) are simplified consumer alerts displayed on basic LCD screens. <strong>"0x" hex codes</strong> are low-level engineering error registers accessed via the diagnostic log or PC driver.</p>
</details>
`,

  'epson-nozzle-check-failed-gaps-pattern': `
<h2>How to Interpret an Epson Micro Piezo Nozzle Check Pattern</h2>
<p>Unlike thermal inkjets that boil ink, Epson printers use <strong>Micro Piezo Technology</strong>. Microscopic piezoelectric crystals flex when energized, mechanically ejecting ink droplets. When a Nozzle Check Pattern exhibits missing segments or staggered gaps, dried ink crystals are blocking the physical nozzle plate holes, or air pockets are trapped inside the printhead chamber.</p>

<h2>Diagnostic Pattern Analysis & Recovery Protocol</h2>
<ol>
  <li><strong>Analyzing the Staircase Grid Pattern:</strong>
    <p>The printed sheet displays a series of stepped horizontal and diagonal lines for each color (Black, Cyan, Magenta, Yellow):</p>
    <ul>
      <li><strong>Solid, unbroken staircase:</strong> The printhead is 100% healthy.</li>
      <li><strong>1-2 missing horizontal lines:</strong> Minor dried surface ink. Run a single standard Head Cleaning cycle.</li>
      <li><strong>Entire color band missing (e.g., all Cyan missing):</strong> The damper has air-locked or lost prime. A Power Cleaning or manual syringe damper prime is required.</li>
      <li><strong>Deflected / Crooked lines:</strong> Dried ink partially obstructs the nozzle rim, causing the ink droplet to fire at an angle. Requires soaking the nozzle plate in printhead cleaning solution.</li>
    </ul>
  </li>
  <li><strong>The "2-Cycle & 2-Hour Rest" Rule:</strong>
    <p>Never run more than 2 consecutive cleaning cycles. Running 5+ cleanings in a row overheats the piezo crystals and whips the liquid ink into a frothy foam of micro-bubbles, making the gaps worse. Run 2 cleaning cycles, then let the printer sit idle for 2 to 4 hours to allow micro-bubbles to settle.</p>
  </li>
  <li><strong>The Warm Paper Towel Printhead Park Soak:</strong>
    <p>Fold a paper towel to the width of the carriage. Moisten it with warm distilled water or dedicated printhead cleaning solution. Unplug the printer when the carriage moves to the center. Place the wet towel across the platen and gently slide the carriage directly over the wet towel. Let it sit for 1 hour to soften stubborn crusts on the nozzle face.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why do different gaps appear in different places after every cleaning cycle?</summary>
  <p>If missing lines move randomly from one nozzle to another after each cleaning, you have air bubbles circulating inside the printhead manifold, not a permanent clog. Let the printer rest for 6 hours without cleaning to allow the air to rise and escape.</p>
</details>
<details>
  <summary>Can low-quality sublimation ink permanently clog an Epson printhead?</summary>
  <p>Yes. Sublimation inks contain large dye particles. If low-grade sublimation ink dries inside an EcoTank, the particles can permanently bake onto the piezo crystal surfaces.</p>
</details>
`,

  'epson-workforce-wf-3640-offline-fix': `
<h2>Why the Epson WorkForce WF-3640 Drops Offline in Windows 10 & 11</h2>
<p>The Epson WorkForce WF-3640 is a high-volume workgroup multifunction printer equipped with PrecisionCore printhead technology, dual paper trays, and duplex scanning. The most common cause of the WF-3640 appearing "Offline" on Windows 10/11 PCs is Windows defaulting to a Web Services for Devices (WSD) port, coupled with dynamic IP lease renewals from your router.</p>

<h2>Step-by-Step Port Reconfiguration (Switching to Standard TCP/IP)</h2>
<ol>
  <li><strong>Print the Network Status Sheet:</strong>
    <p>On the WF-3640 touchscreen, navigate to <strong>Setup &gt; Network Status &gt; Print Status Sheet</strong>. Note the printer's active IP address (e.g., <code>192.168.1.180</code>).</p>
  </li>
  <li><strong>Create a Permanent TCP/IP Port in Windows:</strong>
    <ul>
      <li>Press <strong>Windows Key + R</strong>, type <code>control printers</code>, and press Enter.</li>
      <li>Right-click the Epson WF-3640 icon and select <strong>Printer Properties</strong>.</li>
      <li>Go to the <strong>Ports</strong> tab. Click <strong>Add Port...</strong>.</li>
      <li>Select <strong>Standard TCP/IP Port</strong> and click <strong>New Port...</strong>.</li>
      <li>Enter the printer's exact IP address into the Printer Name or IP Address field.</li>
      <li>Complete the wizard, verify the new TCP/IP port is checked with a checkmark, and click <strong>Apply</strong>.</li>
    </ul>
  </li>
  <li><strong>Disable SNMP Status Checking:</strong>
    <p>While in the Ports tab, highlight your new TCP/IP port and click <strong>Configure Port...</strong>. At the bottom of the window, <strong>UNCHECK "SNMP Status Enabled"</strong>. When SNMP polling fails across network routers, Windows falsely marks the printer as offline. Disabling SNMP keeps the printer permanently available.</p>
  </li>
  <li><strong>Uncheck "Use Printer Offline":</strong>
    <p>Double-click the printer in Control Panel to open the print queue. Click the <strong>Printer</strong> menu at the top left and ensure there is no checkmark next to "Use Printer Offline".</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the WF-3640 drop offline only when entering Sleep Mode?</summary>
  <p>In the WF-3640 Embedded Web Server (access via typing its IP into a browser), go to <strong>Network Settings &gt; Energy Save &gt; Sleep Timer</strong>. Adjust the Wi-Fi power-saving mode from "Low Power" to "Standard" to keep the wireless antenna awake.</p>
</details>
<details>
  <summary>Does the WF-3640 support both 2.4GHz and 5GHz Wi-Fi?</summary>
  <p>No. The WF-3640 features a 2.4GHz 802.11b/g/n wireless card. If your router uses dual-band mesh steering, connect the printer to the dedicated 2.4GHz band.</p>
</details>
`,

  'epson-ink-light-blinking-new-cartridge-installed': `
<h2>Why the Epson Ink Light Blinks After Installing a Brand New Cartridge</h2>
<p>When an Epson cartridge-based printer (WorkForce, Expression Home, Stylus series) continues to blink or illuminate the ink drop LED after you insert a fresh cartridge, the printer has failed to establish an electronic handshake with the cartridge microchip, or the carriage latch has not locked down completely.</p>

<h2>Exhaustive Fix for Unrecognized New Cartridges</h2>
<ol>
  <li><strong>Remove the Yellow Air Vent Pull-Tab:</strong>
    <p>Before installing a new Epson cartridge, you MUST peel off the yellow plastic tape labeled "PULL" from the top of the cartridge. If this tape remains, the vacuum inside the ink chamber prevents ink from priming, and the carriage sensor triggers an ink starvation alert.</p>
  </li>
  <li><strong>Clean the Microchip Contact Pads:</strong>
    <p>Remove the new cartridge. Locate the green circuit board on the back with small gold contact pads. Skin oils from handling can create electrical resistance. Wipe the gold pads with a microfiber cloth moistened with 99% isopropyl alcohol. Let dry for 2 minutes.</p>
  </li>
  <li><strong>Inspect the Carriage Spring Pins:</strong>
    <p>Look inside the carriage bay where the cartridge docks. You will see small, gold-plated wire spring contacts. If one pin is bent down flat or coated in dried ink sludge, it cannot read the chip. Gently lift bent pins using non-conductive fine tweezers.</p>
  </li>
  <li><strong>The Firm Latching Push:</strong>
    <p>Press downward on the center of the cartridge with your thumb until you hear and feel a loud, distinct mechanical <strong>CLICK</strong>. If the plastic retaining tab is not fully engaged, the cartridge sits 1mm too high, breaking electrical contact.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the printer reject third-party / compatible cartridges?</summary>
  <p>Epson frequently releases automatic background firmware updates that alter the cryptographic handshake with cartridge microchips. If you use third-party cartridges, disable automatic firmware updates in the printer settings.</p>
</details>
<details>
  <summary>Can I bypass the ink light to print with remaining colors?</summary>
  <p>On most Epson desktop printers, when one cartridge is recognized as missing or empty, all printing is suspended to protect the Micro Piezo printhead from dry firing.</p>
</details>
`,

  'epson-et-8550-foreign-material-error': `
<h2>Understanding the Epson EcoTank Photo ET-8550 "Foreign Material Error"</h2>
<p>The Epson EcoTank ET-8550 is a wide-format 6-color photo printer equipped with specialized front paper cassettes, a rear straight-through paper feed path, and an automatic motorized output tray. When the touchscreen displays "Foreign Material Error" or error code <strong>0x000041 / 0x000044</strong>, an optical or mechanical sensor in the paper path has detected an obstruction, or the motorized tray mechanism is bound.</p>

<h2>Step-by-Step Diagnostic & Clearing Guide</h2>
<ol>
  <li><strong>Inspect the Rear Straight-Through Paper Chute:</strong>
    <p>The ET-8550 features a rear feed slot for thick media (up to 1.3mm posterboard). Lift the rear cover. Shine a bright flashlight down the rear paper chute. Check for torn photo paper corners, craft vinyl backing, or dropped small items caught in the wide feed rollers.</p>
  </li>
  <li><strong>Inspect the Motorized Output Tray Track:</strong>
    <p>The output tray on the ET-8550 extends and retracts automatically using a motorized rack-and-pinion gear. If an object is resting in front of the tray (preventing it from extending), or if paper is jammed inside the motorized tray track, the printer trips a Foreign Material Error. Never force the output tray in or out by hand.</p>
  </li>
  <li><strong>Clean the Linear Optical Encoder Strip:</strong>
    <p>Open the top printer cover. Locate the clear plastic timing strip suspended behind the printhead carriage. Ink mist or photo paper dust on this strip causes the carriage motor to stutter, which the firmware misinterprets as a physical foreign object collision. Clean gently with warm distilled water on a microfiber cloth.</p>
  </li>
  <li><strong>Check the Front Cassette 1 & Cassette 2 Seating:</strong>
    <p>Remove both lower paper cassettes. Check the bottom cavity with a flashlight. Push both trays in firmly until their front bezels sit flush with the printer chassis.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the Foreign Material Error occur during motorized tray movement?</summary>
  <p>If the gear tracks of the motorized output tray accumulate dust, the motor draws excess current. Clean the plastic tray sliders and ensure no cables are obstructing tray movement.</p>
</details>
<details>
  <summary>Can heavy velvet fine art paper cause this error?</summary>
  <p>Yes. Heavy fine art papers shed microscopic cotton rag fibers. Clean the internal paper sensors regularly when using textured fine art media.</p>
</details>
`,

  'epson-error-code-2000020a-initialization-fault': `
<h2>Technical Diagnostics for Epson Error 2000020A (Network & Mainboard Init Fault)</h2>
<p>Error code <strong>2000020A</strong> is an unhandled initialization exception generated during the bootloader sequence. It indicates that the printer's mainboard failed to initialize the embedded network controller (Wi-Fi/Ethernet MAC layer) or encountered a memory buffer parity error while parsing stored network certificates.</p>

<h2>Step-by-Step Mainboard & Network Recovery Protocol</h2>
<ol>
  <li><strong>Disconnect All Data Cables & SD Cards:</strong>
    <p>Unplug the Ethernet cable, USB cable, and remove any memory cards or USB flash drives inserted into the printer. If a corrupted file on an SD card or a broadcast storm on the network occurs during boot, the controller halts with 2000020A.</p>
  </li>
  <li><strong>The 30-Minute Complete Power Disconnect:</strong>
    <ul>
      <li>Unplug the power cord from the wall outlet.</li>
      <li>Press and hold the physical Power button on the printer for 30 seconds.</li>
      <li>Leave the machine unplugged for at least 30 minutes to allow the on-board flash cache and PHY network controller to discharge completely.</li>
      <li>Reconnect power directly to a wall socket without any data cables attached.</li>
    </ul>
  </li>
  <li><strong>Perform a Factory Network Reset via Control Panel:</strong>
    <p>Once the printer boots to its home screen: Navigate to <strong>Settings &gt; Restore Default Settings &gt; Network Settings</strong>. Confirm the reset. This clears any corrupted WPA3 security certificates or malformed IP tables from NVRAM.</p>
  </li>
  <li><strong>Reflash Firmware via USB:</strong>
    <p>Connect the printer to a PC via USB and run the latest Epson Firmware Update Utility to rewrite any corrupted bootloader sectors.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Is Error 2000020A a fatal motherboard hardware failure?</summary>
  <p>In roughly 85% of cases, 2000020A is a transient network buffer crash that resolves after a full 30-minute power drain and network reset.</p>
</details>
<details>
  <summary>Can a router firmware update trigger Error 2000020A?</summary>
  <p>Yes. If a new router begins broadcasting incompatible IPv6 router advertisement packets that the printer's older network stack cannot parse, the printer will crash on boot with 2000020A.</p>
</details>
`,

  'epson-error-code-000041-fix': `
<h2>Understanding Epson Error Code 000041 (Carriage Obstruction / CR Motor Fault)</h2>
<p>Epson Error Code <strong>000041</strong> (or <strong>0x41</strong>) is an emergency carriage motor shutdown. When the printhead carriage attempts to travel across the platen, the logic board monitors carriage velocity via the linear optical encoder strip. If the carriage encounters physical resistance, collides with a jammed paper corner, or if the drive belt slips, Error 000041 is tripped immediately to protect the carriage motor from burning out.</p>

<h2>Step-by-Step Mechanical Diagnostic & Clearing Workflow</h2>
<ol>
  <li><strong>The Flashlight Carriage Path Sweep:</strong>
    <p>Unplug the AC power cable. Open the top scanner cover. Slide the printhead carriage gently by hand from the far left to the far right. Use a flashlight to inspect both ends of the track. Look for torn paper fragments, dropped paperclips, or dislodged blue packing tape.</p>
  </li>
  <li><strong>Clean the Clear Optical Encoder Strip:</strong>
    <p>Suspended directly behind the carriage is the thin, transparent plastic encoder strip. Aerosolized ink mist and carriage grease smudge this strip, blinding the optical reader and making the printer believe the carriage is jammed. Gently wipe the strip with a microfiber cloth dampened with warm distilled water. <em>(Never use alcohol).</em></p>
  </li>
  <li><strong>Inspect the Carriage Drive Belt & Pulley:</strong>
    <p>Check the black toothed rubber drive belt. Ensure it is taut and properly seated in the motor gear on the left and the tensioner pulley on the right.</p>
  </li>
  <li><strong>Check the Maintenance Purge Station (Right Side):</strong>
    <p>On the far right side where the carriage parks, ensure the rubber capping station and plastic wiper blade can move up and down freely without sticking on dried ink sludge.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does Error 000041 happen immediately when I turn on the printer?</summary>
  <p>During bootup, the printer sweeps the carriage across its full width to test the end-stop limits. If the carriage cannot complete this test sweep within 3 seconds, Error 000041 is generated on boot.</p>
</details>
<details>
  <summary>Can a lack of rail lubrication cause Error 000041?</summary>
  <p>Yes. If the steel carriage guide rod is bone-dry, bushing friction will overload the drive motor. Apply 2 drops of synthetic silicone oil across the guide rod.</p>
</details>
`,

  'epson-printer-error-031002-fix': `
<h2>Technical Diagnostics for Epson Error 031002 (Carriage PID Read Failure)</h2>
<p>Epson Error Code <strong>031002</strong> (or <strong>0x031002</strong>) is a low-level <strong>Carriage Optical Encoder Reading Failure / PID Position Error</strong>. During carriage movement, the carriage optical sensor reads the microscopic vertical hash marks on the linear encoder strip to calculate real-time velocity and acceleration. If the optical sensor encounters a section of the strip where marks are unreadable (due to ink smudges, physical scratches, or paper dust), the feedback loop fails, triggering Error 031002.</p>

<h2>Step-by-Step Resolution Protocol</h2>
<ol>
  <li><strong>Clean the Linear Encoder Strip with Warm Distilled Water:</strong>
    <ul>
      <li>Unplug the printer and lift the top lid.</li>
      <li>Locate the thin, clear plastic ribbon running horizontally behind the carriage.</li>
      <li>Moisten a clean microfiber cloth with warm distilled water.</li>
      <li>Gently pinch the strip between your thumb and index finger and wipe along its entire length from left to right.</li>
      <li>Inspect the cloth for black ink mist or yellow grease transfer. Repeat until the strip is crystal clear.</li>
    </ul>
  </li>
  <li><strong>Blow Clean Compressed Air into the Carriage Sensor Eye:</strong>
    <p>Behind the carriage body is the U-shaped black plastic photodiode sensor through which the encoder strip passes. Blow dry compressed air into the sensor slit to clear any dislodged paper dust fibers blocking the infrared beam.</p>
  </li>
  <li><strong>Verify the Tension Spring is Connected:</strong>
    <p>Check the far left mounting post of the encoder strip. Ensure the small metal tension spring has not unhooked or broken. The strip must be taut and perfectly level.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>What should I do if the encoder strip is physically scratched?</summary>
  <p>If the timing hash marks have been physically scratched off by a foreign object, the strip cannot be cleaned and must be replaced with a new OEM encoder strip.</p>
</details>
<details>
  <summary>Does cleaning the encoder strip with alcohol damage it?</summary>
  <p>YES. Chemical solvents like rubbing alcohol, acetone, and glass cleaner dissolve the printed timing lines, instantly ruining the strip.</p>
</details>
`,

  'epson-printer-error-0110-adf-scanner-fix': `
<h2>Understanding Epson Error 0110 (ADF & Scanner Initialization Fault)</h2>
<p>Error <strong>0110</strong> (or <strong>0x0110</strong>) is a dedicated <strong>Scanner / Automatic Document Feeder (ADF) Hardware Error</strong> on Epson multifunction printers. During startup, the printer powers the scanner lamp, moves the CIS carriage to the home reference sensor, and tests the ADF document feed motor. If the scanner carriage is locked, if the ADF paper sensor is jammed, or if the scanner ribbon cable is loose, Error 0110 halts the machine.</p>

<h2>Step-by-Step Clearing & Diagnostic Workflow</h2>
<ol>
  <li><strong>Check the Scanner Transit Lock Switch:</strong>
    <p>Examine the underside or rear of the scanner assembly for a physical sliding transportation lock switch (often marked with a padlock icon). Ensure it is set to the <strong>Unlocked</strong> position so the optical carriage can move freely.</p>
  </li>
  <li><strong>Clean the White Calibration Reference Strip:</strong>
    <p>Lift the scanner lid. Look at the narrow glass strip on the far left beneath the plastic bezel. Clean this area with optical glass cleaner and a microfiber cloth. If dust or tape residue clouds this white reference strip, the CIS sensor cannot calibrate white balance and trips 0110.</p>
  </li>
  <li><strong>Inspect the ADF Paper Sensors:</strong>
    <p>Open the top ADF access door. Check for tiny torn paper scraps wedged under the input and exit sensor flags. Blow compressed air through the ADF paper chute.</p>
  </li>
  <li><strong>Reseat the Flat Flexible Cable (FFC):</strong>
    <p>If comfortable, check the white flat ribbon cable connecting the scanner unit to the mainboard. Reseat both ends firmly in their sockets.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I bypass Error 0110 to print documents?</summary>
  <p>Because Epson firmware performs a unified boot check, an unresolved 0110 scanner error locks the entire printer, preventing printing until the scanner fault is cleared.</p>
</details>
<details>
  <summary>Does cold weather cause Error 0110?</summary>
  <p>Yes. In rooms below 50°F (10°C), the CIS optical sensor lamp takes longer to warm up, triggering an optical timeout error on startup.</p>
</details>
`,

  'epson-printer-grainy-print-quality-fix': `
<h2>Why Epson Inkjet and EcoTank Prints Look Grainy or Pixelated</h2>
<p>When printed photos or graphics display noticeable graininess, horizontal banding, or rough pixelation, the cause is an uncalibrated Micro Piezo printhead, incorrect print driver media profiles, or low source image resolution.</p>

<h2>Exhaustive 4-Step Print Quality Restoration Protocol</h2>
<ol>
  <li><strong>Perform Bidirectional Printhead Alignment:</strong>
    <ul>
      <li>Load fresh, bright white paper in the tray.</li>
      <li>On the printer display: Go to <strong>Maintenance &gt; Print Head Alignment &gt; Vertical / Horizontal Alignment</strong>.</li>
      <li>The printer prints numbered alignment patterns. Examine each column and choose the box with the smoothest, most continuous pattern with zero visible vertical or horizontal white lines.</li>
      <li>This synchronizes the microsecond firing timing between left-to-right and right-to-left carriage sweeps.</li>
    </ul>
  </li>
  <li><strong>Configure Correct Media Type in Print Driver:</strong>
    <p>When printing from your PC, open Printer Preferences. Never leave Media Type set to "Plain Paper" when printing photos. Explicitly select <strong>"Epson Premium Glossy"</strong>, <strong>"Ultra Glossy"</strong>, or <strong>"Matte Paper"</strong>. Selecting the proper media type tells the driver to use smaller picoliter dot sizes and higher screening frequency, eliminating grain.</p>
  </li>
  <li><strong>Verify Source Image Resolution (DPI):</strong>
    <p>Ensure the image file resolution is at least <strong>300 DPI</strong> at the final physical print size. Printing a small 72 DPI web thumbnail on 8.5x11 paper will result in severe digital pixelation regardless of printer hardware settings.</p>
  </li>
  <li><strong>Execute a Nozzle Check:</strong>
    <p>Run a Nozzle Check Pattern. If even 5% of nozzles are clogged, the printer cannot lay down fine shading dots, resulting in visible grain.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>What is the difference between "Standard" and "High" quality print modes?</summary>
  <p>"High" quality mode enables multi-pass printing with smaller 1.5 to 3.0 picoliter droplet sizes, producing photo-lab smoothness at the expense of slower printing speed.</p>
</details>
<details>
  <summary>Does glossy photo paper eliminate grain?</summary>
  <p>Yes. High-gloss photographic paper holds ink droplets on the surface without fiber bleeding, resulting in sharper dots and smoother color gradients.</p>
</details>
`
};

async function main() {
  console.log('🚀 Expanding Epson Articles (Batch 2 - 10 articles)...\n');

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

  console.log('\n🎉 Epson Batch 2 Complete!');
}

main().then(async () => prisma.$disconnect()).catch(async e => { console.error(e); prisma.$disconnect(); process.exit(1); });
