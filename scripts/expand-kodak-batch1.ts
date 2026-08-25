import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function stripCrossBrandLinks(html: string): string {
  return html.replace(/<a\s[^>]*href="\/[^"]*"[^>]*>([^<]*)<\/a>/gi, '$1');
}

const expansions: Record<string, string> = {
  'kodak-printer-error-6102': `
<h2>Understanding Kodak Error 6102 (Document Feeder & Scan Carriage Jam)</h2>
<p>On Kodak all-in-one printers (including the ESP and HERO series), <strong>Error 6102</strong> specifically designates an optical scan carriage obstruction or an Automatic Document Feeder (ADF) paper feed stall. The printer's mainboard monitors the current draw of the scan motor and the state of the ADF entrance optical sensor. When the CIS (Contact Image Sensor) bar encounters physical drag or cannot return to the home docking position, the printer halts with Error 6102.</p>

<h2>Step-by-Step Diagnostic & Clearing Guide</h2>
<ol>
  <li><strong>Check the Scan Glass Bed & Calibration Strip:</strong>
    <p>Lift the scanner lid. Inspect the narrow glass strip on the left side (used by the ADF) and the main flatbed glass. If white correction fluid, tape adhesive, or sticky paper residue is present, the scan head will snag or fail calibration. Clean the entire glass surface with 99% isopropyl alcohol and a lint-free optical cloth.</p>
  </li>
  <li><strong>Inspect the Automatic Document Feeder (ADF) Rollers:</strong>
    <p>Open the top ADF access hatch. Check for folded or torn original documents caught between the separation pad and the pickup roller. Clean the gray rubber pickup rollers with a damp cloth to remove built-up ink and paper glaze.</p>
  </li>
  <li><strong>Check the Scanner Carriage Lock Mechanism:</strong>
    <p>Ensure the physical scan carriage lock switch (if present on the underside of your model) is set to the unlocked position. Power down the machine and look through the glass with a flashlight to verify the scanner carriage is not caught on a dislodged ribbon cable.</p>
  </li>
  <li><strong>Execute a Hard Power Drain:</strong>
    <p>Kodak printers maintain sensor error flags in volatile buffer memory. Disconnect the power adapter from the back of the printer, unplug it from the wall outlet, wait a full 60 seconds while holding down the physical Power button to drain board capacitors, and reconnect directly to AC power.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does Error 6102 appear even when I am only trying to print, not scan?</summary>
  <p>During initial power-on startup, Kodak all-in-one printers run a mandatory hardware self-test that cycles both the printhead and the scanner carriage. If the scanner carriage fails its calibration sweep, the printer halts the entire system, blocking print jobs as well.</p>
</details>
<details>
  <summary>Can a noisy scanner motor cause Error 6102?</summary>
  <p>Yes. If the plastic gears driving the scanner belt are stripped or clogged with dust, the motor will slip, failing to position the CIS sensor within the firmware's timed window and tripping 6102.</p>
</details>
`,

  'kodak-printer-error-3802': `
<h2>Technical Explanation of Kodak Error 3802 (Printhead Resistance / Voltage Error)</h2>
<p>Error 3802 is an electronic safety fault indicating an abnormal voltage reading or thermal resistance mismatch across the printhead's micro-resistors. Kodak printheads utilize microscopic heating resistors to boil ink and create droplets. If ink leaks onto the rear copper contact pads, or if a short-circuit occurs across adjacent nozzle circuits, the DC controller detects an over-current condition and trips <strong>Error 3802</strong> to prevent logic board damage.</p>

<h2>Step-by-Step Contact Restoration & Recovery</h2>
<ol>
  <li><strong>Remove Cartridges and Printhead:</strong>
    <p>Open the top access door. When the carriage slides to the center, remove both the black and color Series 10 or Series 30 ink cartridges. Lift the orange or black printhead latch lever and lift the entire printhead assembly out of the carriage cradle.</p>
  </li>
  <li><strong>The 99% Isopropyl Alcohol Contact Cleanse:</strong>
    <p>Examine the back of the printhead. You will see a grid of copper contact pads. Ink mist and dried pigment often bridge the microscopic gaps between pads. Dampen a lint-free cloth or foam swab with 99% isopropyl alcohol (never water) and gently scrub the copper pads. Clean the matching spring-loaded gold pins inside the printer carriage as well.</p>
  </li>
  <li><strong>Inspect for Burn Marks or Pinched Pins:</strong>
    <p>Look at the spring pins inside the carriage with a magnifying glass or flashlight. If any pin is bent flat, pushed in, or charred black, electrical connection is lost. Carefully straighten bent pins using a pair of non-conductive fine tweezers.</p>
  </li>
  <li><strong>Reseat Firmly and Power Cycle:</strong>
    <p>Allow the contacts to dry for 5 minutes. Lower the printhead back into the carriage, snap the latch down with firm pressure, reinstall the ink cartridges, and power cycle the machine.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Does Error 3802 mean my Kodak printhead is permanently dead?</summary>
  <p>In roughly 60% of cases, Error 3802 is caused by surface ink contamination across the electrical contacts and can be resolved by thorough alcohol cleaning. However, if cleaning fails after multiple attempts, the internal nozzle heating resistors have burned out, requiring printhead replacement.</p>
</details>
<details>
  <summary>Are Series 10 and Series 30 printheads interchangeable?</summary>
  <p>No. Series 10 printheads (used in older ESP 3, 5, 7, 9 models) and Series 30 printheads (used in ESP C310, Hero 3.1, 5.1 models) have different electrical pinouts and physical dimensions. Installing the wrong series will trigger immediate voltage errors like 3802.</p>
</details>
`,

  'kodak-printer-paper-feed-jam-fix': `
<h2>Anatomy of Kodak Paper Feed & Transport Failures</h2>
<p>Kodak all-in-one printers feature a bottom-loading cassette tray that feeds paper upward around a 180-degree U-turn feed roller assembly. Because the paper path has a tight radius, any loss of roller friction, paper curl, or misalignment in the side tension guides results in paper feed stalls, accordion folds, or false "Out of Paper" alarms.</p>

<h2>Exhaustive 5-Step Paper Transport Restoration</h2>
<ol>
  <li><strong>Clean the Lower D-Shaped Rubber Pickup Rollers:</strong>
    <p>Remove the paper cassette tray completely. Turn the printer on its back or side to access the bottom paper feed chute. You will see two semi-circular (D-shaped) rubber rollers. Over months of printing, paper clay coating and dust smooth out the rubber's textured tread. Clean the rollers vigorously with a lint-free cloth dampened with warm distilled water. Rotate the rollers manually to clean all 360 degrees.</p>
  </li>
  <li><strong>Inspect the Rear Cleanout Door & Reversing Assembly:</strong>
    <p>Locate the duplexer or rear access door on the back of the printer. Press the two plastic release latches and pull the door off. Inspect the smaller white and black plastic idler rollers inside this door. Make sure all springs are intact and that no shredded paper corners are wedged beneath the sensor flag.</p>
  </li>
  <li><strong>Proper Paper Loading & Tray Adjustment:</strong>
    <p>Do not overload the paper tray. Fan the paper stack before loading to introduce air between sheets. Push the green side and front width guides snug against the edges of the paper without bowing or bending the stack. If using glossy photo paper, load it with the glossy print side facing DOWN in the tray.</p>
  </li>
  <li><strong>Clear the Registration Sensor Flag:</strong>
    <p>Inside the paper path, just before the printhead, sits an optical sensor flag. If paper was previously pulled backward out of the front output slot, this plastic flag can be bent or dislodged from its optical interrupter slot. Gently verify that the flag swings freely with a light touch.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does my Kodak printer grab multiple sheets at once (double-feeding)?</summary>
  <p>Double-feeding is caused by a worn or dirty cork/rubber Separation Pad located at the bottom front edge of the paper cassette. Clean the pad with water. If the pad's textured surface is worn smooth, replace the separation pad.</p>
</details>
<details>
  <summary>Can I use heavy cardstock in Kodak ESP or Hero printers?</summary>
  <p>Standard Kodak desktop trays handle up to 24 lb (90 g/m²) bond paper and official Kodak photo paper up to 280 g/m². Non-Kodak heavy cardstock over 65 lb often struggles to negotiate the tight 180-degree bottom feed curve.</p>
</details>
`,

  'kodak-step-printer-orange-light-flashing': `
<h2>Decoding LED Light Codes on the Kodak Step Instant Photo Printer</h2>
<p>The Kodak Step is a portable, battery-powered 2x3 ZINK (Zero Ink) photo printer. Unlike full-size desktop inkjets, it contains no liquid ink cartridges; instead, it uses thermal pulses to activate cyan, magenta, and yellow dye crystals embedded inside specialized ZINK paper. The LED status light on the top/front provides critical diagnostic feedback regarding battery health, paper orientation, thermal safety, and Bluetooth pairing.</p>

<h2>Complete Kodak Step LED Diagnostic Matrix</h2>
<table style="width:100%; border-collapse: collapse; margin: 20px 0;">
  <thead>
    <tr style="background-color: #f3f4f6; text-align: left;">
      <th style="padding: 10px; border: 1px solid #d1d5db;">LED Indicator State</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">Hardware Status</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">Required Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Flashing Orange / Amber</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Blue Smartsheet calibration error, out of paper, or paper jam</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Reload ZINK paper pack with blue barcode sheet facing DOWN; clear jam</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Solid Red</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Battery critically low (&lt; 10%) or charging in progress</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Connect Micro-USB charger (5V / 1.0A or higher); wait for solid green</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Flashing Red</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Thermal Printhead Overheating Protection</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Allow the printer to cool down for 10 minutes in a shaded room</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Solid Green</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Fully charged and ready to print</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Normal operational state; send print job via Kodak Step Prints app</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Flashing Blue</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Bluetooth Pairing Mode</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Open iOS or Android Bluetooth settings to pair device</td>
    </tr>
  </tbody>
</table>

<h2>Fixing the Flashing Orange Light: The Blue Smartsheet Protocol</h2>
<ol>
  <li><strong>Ensure Paper is Genuine Kodak ZINK Paper:</strong> Third-party paper (such as HP Sprocket or Canon Ivy sheets) contains different barcode calibrations and thermal activation curves. Kodak Step printers will flash orange and reject non-Kodak packs.</li>
  <li><strong>Load the Blue Barcode Sheet Correctly:</strong>
    <ul>
      <li>Slide open the top paper lid.</li>
      <li>Load a maximum of 10 photo sheets plus the blue calibration Smartsheet.</li>
      <li>The <strong>Blue Smartsheet MUST be placed at the very bottom of the stack with the barcode facing DOWN</strong>.</li>
      <li>Close the lid. The printer will automatically feed and eject the blue calibration sheet, recalibrating the optical color sensors. The light will turn solid green.</li>
    </ul>
  </li>
  <li><strong>Hardware Pin-Hole Reset:</strong> If the orange light continues flashing despite correct paper loading, locate the tiny pin-hole reset button next to the USB charging port. Insert a paperclip and hold for 3 seconds to reset the internal microcontroller.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I reuse a blue calibration Smartsheet from an older paper pack?</summary>
  <p>No. Each pack of 10 ZINK sheets is manufactured in a specific chemical batch. The blue Smartsheet in that specific pouch contains calibration data matching the precise dye emulsion of those 10 sheets. Always use the blue sheet that came in the same foil pouch.</p>
</details>
<details>
  <summary>Why does the printer get hot when printing multiple photos?</summary>
  <p>ZINK printing uses precise high-temperature heating pulses to activate colors. Printing 4 or 5 photos back-to-back causes heat buildup in the compact plastic body, triggering the thermal safety pause (flashing red light) until the thermal head cools down.</p>
</details>
`,

  'kodak-photo-printer-bluetooth-pairing-failed': `
<h2>Why Bluetooth Pairing Fails on Kodak Portable Photo Printers</h2>
<p>Kodak portable printers (including Kodak Mini 2, Mini 3 Retro, Step, and Dock Plus) utilize Bluetooth Classic and Bluetooth Low Energy (BLE) protocols to pair with mobile devices. When Bluetooth pairing fails or the printer constantly disconnects, the cause is typically Bluetooth cache corruption, missing GPS location permissions on Android, or background battery optimization killing the Kodak app process.</p>

<h2>Comprehensive Bluetooth Pairing Checklist & Recovery</h2>
<ol>
  <li><strong>Enable Android Location (GPS) Permissions:</strong>
    <p>On Android 6.0 through Android 14, Google requires Bluetooth scanning apps to have active <strong>Location Services (GPS)</strong> enabled. If location is disabled or set to "Only while using app," the Kodak app cannot discover nearby Bluetooth Low Energy beacons. Enable Location on your phone and grant the Kodak app "Precise Location" permission.</p>
  </li>
  <li><strong>Forget & Re-Pair in System Bluetooth Settings:</strong>
    <p>Go to your phone's Settings &gt; Bluetooth. Look for devices named <code>KODAK-Instant-XXXX</code> or <code>KODAK Step-XXXX</code>. Tap the gear icon or "i" next to the printer and select <strong>Forget This Device</strong>. Turn your phone's Bluetooth toggle OFF for 10 seconds, then turn it back ON.</p>
  </li>
  <li><strong>Reset the Printer's Bluetooth Module:</strong>
    <p>Locate the pin-hole reset button on the side or rear of your Kodak printer. With the printer turned ON, press and hold the pin-hole button with a paperclip for 5 seconds until the power LED flashes or changes color. This purges the printer's internal paired device memory.</p>
  </li>
  <li><strong>Disable Battery Optimization for the Kodak App:</strong>
    <p>Modern Android and iOS power management systems frequently terminate background Bluetooth connections. In your phone's App Settings, find the Kodak app (Kodak Photo Printer or Kodak Step Prints), tap <strong>Battery</strong>, and set it to <strong>Unrestricted / Do Not Optimize</strong>.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can multiple phones be connected to a Kodak portable printer simultaneously?</summary>
  <p>No. Kodak portable printers support a 1-to-1 active Bluetooth connection. If another smartphone in the house is already paired and in range, the printer will be invisible to your phone. Turn off Bluetooth on other nearby devices before pairing.</p>
</details>
<details>
  <summary>What is the default Bluetooth PIN if prompted on my phone?</summary>
  <p>If your phone prompts for a pairing PIN code, enter <code>0000</code> or <code>1234</code>.</p>
</details>
`,

  'kodak-scan-to-email-not-working': `
<h2>Technical Diagnostics for Kodak Scan-to-Email SMTP Failures</h2>
<p>When Kodak all-in-one printers (ESP 7250, ESP 9250, HERO 7.1, HERO 9.1) fail to send scans via email, the issue is almost always tied to modern email security protocols. In recent years, major email providers (Google Gmail, Microsoft Outlook/Office 365, Yahoo) disabled legacy Basic Authentication (plain username/password) in favor of OAuth 2.0. Because legacy Kodak printer firmware only supports standard SMTP Basic Auth, email connections are rejected at the server level.</p>

<h2>How to Configure Kodak Scan-to-Email with Modern Email Providers</h2>
<ol>
  <li><strong>Creating a Dedicated App Password (For Gmail & Yahoo):</strong>
    <ul>
      <li>Log into your Google or Yahoo account settings via a web browser.</li>
      <li>Navigate to <strong>Security &gt; 2-Step Verification</strong> (must be enabled).</li>
      <li>Click on <strong>App Passwords</strong>.</li>
      <li>Generate a new app password named "Kodak Printer". Google will generate a 16-character code (e.g., <code>abcd efgh ijkl mnop</code>).</li>
      <li>Use this 16-character code as your SMTP password inside the Kodak printer settings, NOT your regular account password.</li>
    </ul>
  </li>
  <li><strong>Accessing the Kodak Embedded Web Server (EWS):</strong>
    <ul>
      <li>Find your printer's IP address on the Network Configuration sheet.</li>
      <li>Enter the IP address into a web browser on your computer.</li>
      <li>Navigate to <strong>Settings &gt; Email / Scan to Email Settings</strong>.</li>
    </ul>
  </li>
  <li><strong>Configuring Correct SMTP Server Parameters:</strong>
    <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
      <thead>
        <tr style="background-color: #f3f4f6; text-align: left;">
          <th style="padding: 10px; border: 1px solid #d1d5db;">Provider</th>
          <th style="padding: 10px; border: 1px solid #d1d5db;">SMTP Server</th>
          <th style="padding: 10px; border: 1px solid #d1d5db;">Port & Encryption</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Gmail</strong></td>
          <td style="padding: 10px; border: 1px solid #d1d5db;"><code>smtp.gmail.com</code></td>
          <td style="padding: 10px; border: 1px solid #d1d5db;">Port <code>587</code> (STARTTLS) or Port <code>465</code> (SSL)</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Outlook / Hotmail</strong></td>
          <td style="padding: 10px; border: 1px solid #d1d5db;"><code>smtp.office365.com</code></td>
          <td style="padding: 10px; border: 1px solid #d1d5db;">Port <code>587</code> (STARTTLS)</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Yahoo Mail</strong></td>
          <td style="padding: 10px; border: 1px solid #d1d5db;"><code>smtp.mail.yahoo.com</code></td>
          <td style="padding: 10px; border: 1px solid #d1d5db;">Port <code>465</code> (SSL) or Port <code>587</code></td>
        </tr>
      </tbody>
    </table>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the printer say "Authentication Failed" with my correct Gmail password?</summary>
  <p>Google blocks standard login attempts from third-party legacy devices. You must generate an App Password in your Google Account Security settings and enter that specific code into the printer.</p>
</details>
<details>
  <summary>Can I scan to my computer instead if email remains blocked?</summary>
  <p>Yes. You can scan directly to your PC via USB or Wi-Fi using the Kodak Home Center software or the native Windows Scan app via standard WIA/TWAIN drivers.</p>
</details>
`,

  'how-to-reset-kodak-printer-to-factory-settings': `
<h2>When to Perform a Full Factory Reset on a Kodak Printer</h2>
<p>Performing a factory reset clears corrupted network configurations, flushes stuck print spooler buffers from NVRAM, resets print quality calibration tables, and restores the machine's initial out-of-the-box software parameters. A reset is recommended when the printer is unresponsive to Wi-Fi setup, constantly displays false error messages, or before selling or gifting the machine.</p>

<h2>Method 1: Menu-Based Soft Reset (ESP & Hero All-in-Ones)</h2>
<ol>
  <li>Press the <strong>Home</strong> button on the printer's front control panel.</li>
  <li>Use the arrow keys to scroll to <strong>Maintenance</strong> (or the gear icon) and press <strong>OK</strong>.</li>
  <li>Scroll down to <strong>Reset All Settings</strong> or <strong>Restore Factory Defaults</strong>.</li>
  <li>Press <strong>OK</strong>. The screen will prompt for confirmation. Press <strong>OK</strong> or <strong>Start</strong> to confirm.</li>
  <li>The printer will reboot automatically with cleared network and user settings.</li>
</ol>

<h2>Method 2: Hard Button Power Drain (For Frozen or Unresponsive Printers)</h2>
<ol>
  <li>Disconnect the AC power cable from the rear of the printer while the machine is powered on.</li>
  <li>Unplug the power brick from the AC wall outlet.</li>
  <li>Press and hold the physical <strong>Power button</strong> on the control panel for 30 seconds to discharge the high-voltage internal capacitors.</li>
  <li>Leave the machine unplugged for a minimum of 15 minutes to allow volatile memory buffers to fully clear.</li>
  <li>Plug directly into a wall outlet and power on.</li>
</ol>

<h2>Method 3: Pin-Hole Reset for Kodak Portable & Instant Printers</h2>
<ol>
  <li>Ensure the portable printer (Kodak Step, Mini 2, Mini 3 Retro, Dock Plus) has at least 50% battery or is plugged into a charger.</li>
  <li>Locate the tiny recessed reset pin-hole on the side or bottom of the casing.</li>
  <li>Insert a straightened paperclip into the hole until you feel a soft tactile switch click.</li>
  <li>Hold for 5 to 8 seconds until the LED indicators turn off and restart.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Does a factory reset erase the page count or printhead life counters?</summary>
  <p>No. Total lifetime page counts, total ink consumed, and printhead serial registrations are stored in permanent ROM and are retained across all resets.</p>
</details>
<details>
  <summary>Will I need to reinstall the ink cartridges after a factory reset?</summary>
  <p>No, you do not need to remove the physical cartridges. However, the printer may execute a short 2-minute printhead alignment and calibration sweep following the reboot.</p>
</details>
`,

  'kodak-esp-hero-printer-models-comparison': `
<h2>The Architectural Evolution: Kodak ESP Series vs. Kodak HERO Series</h2>
<p>Kodak disrupted the desktop consumer printer market by pioneering the "cheap ink" model, offering replacement pigment ink cartridges at a fraction of the cost of competitors. The product lineup was divided into two distinct technological generations: the foundational <strong>ESP Series</strong> (introduced 2007-2010) and the refined <strong>HERO Series</strong> (introduced 2011-2013).</p>

<h2>Detailed Engineering Comparison Matrix</h2>
<table style="width:100%; border-collapse: collapse; margin: 20px 0;">
  <thead>
    <tr style="background-color: #f3f4f6; text-align: left;">
      <th style="padding: 10px; border: 1px solid #d1d5db;">Feature / Specification</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">Kodak ESP Series (e.g., 3, 5, 7, 9, 3250, 5250)</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">Kodak HERO Series (e.g., 3.1, 5.1, 7.1, 9.1, Office 6.1)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Ink Cartridge Family</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Kodak Series 10</strong> (10B Black, 10C Color)</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Kodak Series 30</strong> (30B Black, 30C Color, 30XL)</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Printhead Technology</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Generation 1 thermal printhead with wide copper contacts</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Generation 2 micro-nozzle printhead with enhanced clogging resistance</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Cloud & Mobile Printing</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Local Wi-Fi / USB only (No native Google Cloud Print)</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Native Kodak Email Print & Google Cloud Print integration</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Display & Interface</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Small 1.5" - 2.4" low-res LCD with physical D-pad</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Large 2.4" - 3.5" high-resolution LCD with capacitive touch panels</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Paper Handling</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Single main cassette tray; manual photo paper loading</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Auto-engaging dedicated 4x6 photo tray on 7.1/9.1 models; duplexing</td>
    </tr>
  </tbody>
</table>

<h2>Cartridge & Printhead Cross-Compatibility Warning</h2>
<p>A critical source of user confusion is attempting to use <strong>Series 10</strong> cartridges in <strong>HERO</strong> series printers or vice versa. The physical keying tabs and electronic microchip contacts are completely different. Series 10 cartridges will physically not lock into a Series 30 printhead, and forcing them will break the carriage latching mechanism.</p>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Are Kodak ESP and HERO drivers compatible with Windows 11?</summary>
  <p>While official Kodak Home Center software updates ceased around Windows 8/10, both ESP and HERO printers function flawlessly on Windows 11 64-bit using the built-in Microsoft WIA/IPP basic driver or by installing the legacy driver package in Windows 7 Compatibility Mode.</p>
</details>
<details>
  <summary>Which series had better photo print quality?</summary>
  <p>The HERO series featured smaller droplet sizes (down to 2.7 picoliters vs 3.5 picoliters in early ESP models), resulting in smoother skin tones and less noticeable dot grain in high-resolution photo prints.</p>
</details>
`,

  'kodak-printer-blinking-wifi-light': `
<h2>Understanding the Kodak Wi-Fi Status LED States</h2>
<p>The Wi-Fi indicator LED on the front bezel of your Kodak ESP or HERO printer displays the exact real-time status of the internal 802.11 b/g/n network adapter. When this light transitions from solid to blinking, your printer has lost its connection handshake with the local wireless access point.</p>

<h2>Kodak Wireless LED Status Matrix</h2>
<ul>
  <li><strong>Solid Blue:</strong> The printer is connected to your wireless network and has received a valid IP address via DHCP. Ready for printing.</li>
  <li><strong>Blinking Blue (Slow - 1 second interval):</strong> The printer is actively searching for the configured SSID or is negotiating WPA encryption keys with the router.</li>
  <li><strong>Blinking Blue (Rapid - 3 flashes per second):</strong> Wi-Fi Protected Setup (WPS) discovery mode is active.</li>
  <li><strong>Blinking Amber / Orange:</strong> Wireless communication error; DHCP IP assignment failure (APIPA 169.254.x.x) or security key rejected.</li>
  <li><strong>LED Off:</strong> Wireless radio is disabled in the menu or the physical network adapter has lost power.</li>
</ul>

<h2>Step-by-Step Recovery for Blinking Wi-Fi LED</h2>
<ol>
  <li><strong>Check the 2.4GHz Band Constraint:</strong> Kodak printers only support the legacy <strong>2.4GHz frequency band</strong>. If your modern router uses single-SSID band steering or has disabled the 2.4GHz radio, the printer will blink blue indefinitely. Ensure your router broadcasts a dedicated 2.4GHz network.</li>
  <li><strong>Run the On-Screen Wi-Fi Setup Wizard:</strong>
    <ul>
      <li>Press <strong>Home</strong> on the printer.</li>
      <li>Select <strong>Network Settings</strong> &gt; <strong>Wi-Fi Setup Wizard</strong>.</li>
      <li>Select your network name from the discovered list.</li>
      <li>Carefully input your WPA2 password. Note that Kodak password entry is strictly case-sensitive.</li>
    </ul>
  </li>
  <li><strong>Set a Static IP to Stop Intermittent Disconnects:</strong>
    <p>When the printer connects, type its IP into a browser to open the Embedded Web Server. Under Network &gt; IP Configuration, change from DHCP to Static IP. This prevents the printer from blinking and disconnecting every time the router renews DHCP leases.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the Wi-Fi light start blinking whenever my microwave is running?</summary>
  <p>Microwave ovens, older cordless phones, and baby monitors operate on the exact same 2.45 GHz radio frequency as 2.4GHz Wi-Fi. Heavy RF interference will overwhelm the unshielded antenna on older Kodak printers, dropping the connection.</p>
</details>
<details>
  <summary>Can I connect my Kodak printer using WPS?</summary>
  <p>Yes. In the printer's Network Settings menu, choose <strong>WPS (Wi-Fi Protected Setup)</strong>. When the blue light flashes rapidly, press the physical WPS button on your router within 2 minutes.</p>
</details>
`,

  'kodak-printer-loading-paper-error': `
<h2>Why Kodak Printers Display "Loading Paper Error" or "Out of Paper" With a Full Tray</h2>
<p>When your Kodak all-in-one insists the paper tray is empty despite a full stack of clean paper, the issue is physical: the rubber pickup roller is slipping on the paper surface, the paper sensor switch has failed to trigger, or the paper cassette tray is not fully seated into its lock detent.</p>

<h2>Complete Mechanical Repair & Cleaning Workflow</h2>
<ol>
  <li><strong>Inspect the Rubber Pickup Roller Tread:</strong>
    <p>Remove the paper cassette. Look into the lower feed cavity. The rubber roller that grabs the top sheet can become glazed with microscopic paper fibers over time, losing its tacky grip. Clean the rubber with a cotton cloth dampened with warm water. If the rubber is severely glazed, gently scuff the surface with fine 400-grit sandpaper to restore friction.</p>
  </li>
  <li><strong>Verify the Paper Tray Lift Mechanism:</strong>
    <p>The bottom of the Kodak paper cassette contains a spring-loaded metal pressure plate that pushes the paper stack up against the feed rollers. If the plastic retaining catch on the bottom of the tray is cracked or stuck, the plate will not lift, preventing the roller from touching the paper.</p>
  </li>
  <li><strong>Check the Paper Tray Sensor Switch:</strong>
    <p>Inside the right side of the paper tray housing is a tiny mechanical micro-switch or optical flag that confirms the tray is pushed all the way in. If the tray is pushed in 95% of the way but not clicked firmly into the latch, the printer assumes the tray is missing or empty.</p>
  </li>
  <li><strong>Reduce the Stack Size:</strong>
    <p>Loading more than 75-100 sheets of paper creates excessive downward weight that binds the feed mechanism. Load a neat stack of 25-30 sheets of fresh, uncurled 20 lb copy paper to test.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the printer feed the paper 2 inches and then stop with a Loading Paper Error?</summary>
  <p>If the paper moves forward slightly and stops, the leading edge reached the first roller but failed to trip the optical registration sensor within the expected millisecond timeframe. Clean the transparent optical sensor flag located inside the paper path.</p>
</details>
<details>
  <summary>Does humidity affect paper feeding in Kodak printers?</summary>
  <p>Yes. High humidity causes paper sheets to stick together via static and moisture cohesion. Store paper in a dry cabinet and fan the stack thoroughly before loading.</p>
</details>
`
};

async function main() {
  console.log('🚀 Expanding Kodak Articles (Batch 1 - 10 articles)...\n');

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

    // Calculate real word count
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

  console.log('\n🎉 Batch 1 Kodak Expansion Complete!');
}

main().then(async () => prisma.$disconnect()).catch(async e => { console.error(e); prisma.$disconnect(); process.exit(1); });
