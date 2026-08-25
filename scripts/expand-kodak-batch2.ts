import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function stripCrossBrandLinks(html: string): string {
  return html.replace(/<a\s[^>]*href="\/[^"]*"[^>]*>([^<]*)<\/a>/gi, '$1');
}

const expansions: Record<string, string> = {
  'kodak-instant-printer-app-not-connecting': `
<h2>Why the Kodak Instant Printer App Fails to Discover or Connect</h2>
<p>The Kodak Instant Printer / Kodak Photo Printer companion app (for Kodak Mini 2, Mini 3 Retro, and Dock Plus 4PASS models) establishes a bidirectional Bluetooth Classic and BLE communication channel to transmit bitmap image packets. When the app sits on an infinite "Searching for Printer..." spinner, the root cause is usually OS permission restrictions, stale Bluetooth bonding keys in the phone's cache, or the printer's power-saving auto-shutoff timer.</p>

<h2>Complete Troubleshooting Checklist for iOS & Android</h2>
<ol>
  <li><strong>Grant All Required Runtime App Permissions:</strong>
    <ul>
      <li><strong>On Android (Android 10 - 14):</strong> Go to Settings &gt; Apps &gt; Kodak Photo Printer &gt; Permissions. Ensure <strong>Location / Nearby Devices</strong> is set to "Allow all the time" or "Allow while using app" with <strong>Use precise location</strong> enabled. Under Photos and Videos, select "Always allow".</li>
      <li><strong>On iOS (iPhone / iPad):</strong> Go to Settings &gt; Kodak App. Ensure <strong>Bluetooth</strong>, <strong>Local Network</strong>, and <strong>All Photos</strong> access are toggled ON.</li>
    </ul>
  </li>
  <li><strong>Clear the Mobile Bluetooth Stack Cache:</strong>
    <ul>
      <li>On Android: Settings &gt; Apps &gt; System Apps &gt; Bluetooth &gt; Storage &gt; <strong>Clear Cache</strong> and <strong>Clear Data</strong>. Restart the smartphone.</li>
      <li>On iOS: Toggle Airplane Mode ON for 15 seconds, then toggle OFF.</li>
    </ul>
  </li>
  <li><strong>Perform a Hardware Pin-Hole Reset on the Kodak Printer:</strong>
    <p>Locate the pin-hole reset switch near the charging port. Use a paperclip to hold the switch for 5 seconds until the power LED flashes yellow/green. This clears the printer's volatile pairing table.</p>
  </li>
  <li><strong>Direct In-App Pairing (Do Not Pair Through Phone Bluetooth First):</strong>
    <p>For many 4PASS Kodak models, pairing directly through the phone's native Bluetooth settings menu causes a handshake conflict with the app. Open the Kodak app, tap the printer icon in the top corner, and let the <em>app itself</em> discover and pair the printer.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the Kodak app crash immediately when I select a photo?</summary>
  <p>App crashes during photo selection are typically caused by HEIC image format decoding errors or huge RAW files. Convert the photo to standard JPEG format or edit it in your native gallery before printing.</p>
</details>
<details>
  <summary>Does the Kodak app require an active internet or cellular connection to print?</summary>
  <p>No. Local photo printing over Bluetooth is entirely offline. An internet connection is only needed when checking for printer firmware updates or downloading app-based borders and stickers.</p>
</details>
`,

  'kodak-printer-spooler-error-windows': `
<h2>How the Windows Print Spooler Interacts with Kodak Drivers</h2>
<p>The Windows Print Spooler (<code>spoolsv.exe</code>) is the core OS service that buffers print jobs from applications into temporary Enhanced Metafile (EMF) or RAW format and feeds them sequentially to the printer driver. Kodak's legacy print drivers (developed during the Windows 7/8 era) can generate malformed spooler files when handling modern Windows 10/11 PDF print streams, resulting in the print spooler service crashing or hanging indefinitely.</p>

<h2>Step-by-Step Spooler Purge and Service Reset</h2>
<ol>
  <li><strong>Stop the Windows Print Spooler Service:</strong>
    <ul>
      <li>Press <strong>Windows Key + R</strong>, type <code>services.msc</code>, and press Enter.</li>
      <li>Scroll down to find <strong>Print Spooler</strong>.</li>
      <li>Right-click on Print Spooler and select <strong>Stop</strong>.</li>
    </ul>
  </li>
  <li><strong>Delete Corrupted Print Spool Files:</strong>
    <ul>
      <li>Press <strong>Windows Key + R</strong>, type <code>%systemroot%\\System32\\Spool\\Printers</code>, and press Enter.</li>
      <li>If prompted for administrator permission, click Continue.</li>
      <li>Select all files in this folder (these are the stuck <code>.SHD</code> and <code>.SPL</code> files) and press <strong>Delete</strong>.</li>
    </ul>
  </li>
  <li><strong>Restart the Spooler Service:</strong>
    <ul>
      <li>Return to the Services window, right-click <strong>Print Spooler</strong>, and select <strong>Start</strong>.</li>
      <li>Right-click Print Spooler &gt; Properties. Ensure the <strong>Startup type</strong> is set to <code>Automatic</code>.</li>
    </ul>
  </li>
  <li><strong>Change Driver Spooling Properties:</strong>
    <ul>
      <li>Open Control Panel &gt; Devices and Printers.</li>
      <li>Right-click your Kodak printer &gt; <strong>Printer Properties</strong> &gt; <strong>Advanced</strong> tab.</li>
      <li>Select <strong>"Print directly to the printer"</strong> (this bypasses the spooler queue entirely for single-page documents) or select <strong>"Start printing after last page is spooled"</strong> to avoid mid-stream memory timeouts.</li>
    </ul>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the Print Spooler service keep stopping automatically every few minutes?</summary>
  <p>An automated spooler service crash is caused by an incompatible or corrupted third-party printer driver in the Windows registry. Use the Print Management console (<code>printmanagement.msc</code>) to remove any obsolete printer driver packages.</p>
</details>
<details>
  <summary>Can I run Kodak Home Center on Windows 11 without spooler errors?</summary>
  <p>Yes. Right-click the Kodak Home Center installer or executable, select <strong>Properties &gt; Compatibility</strong>, and check "Run this program in compatibility mode for Windows 7" and "Run this program as an administrator".</p>
</details>
`,

  'kodak-ink-cartridge-compatibility-guide-series-10-vs-30': `
<h2>The Ultimate Kodak Ink Cartridge Compatibility Master Guide</h2>
<p>Kodak desktop inkjet printers utilize two primary cartridge architectures: <strong>Series 10</strong> and <strong>Series 30</strong>. Using the incorrect series will cause physical latch failure, microchip read errors, or severe printhead damage. Below is the complete model compatibility reference.</p>

<h2>Series 10 vs. Series 30 Model Compatibility Matrix</h2>
<table style="width:100%; border-collapse: collapse; margin: 20px 0;">
  <thead>
    <tr style="background-color: #f3f4f6; text-align: left;">
      <th style="padding: 10px; border: 1px solid #d1d5db;">Specification</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">Kodak Series 10 (10B Black / 10C Color / 10XL)</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">Kodak Series 30 (30B Black / 30C Color / 30XL)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Compatible ESP Models</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">ESP 3, ESP 5, ESP 7, ESP 9, ESP 3250, ESP 5210, ESP 5250, ESP 7250, ESP 9250, ESP Office 2150, 2170</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">ESP C110, ESP C310, ESP C315, ESP Office 2150, ESP Office 6150</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Compatible HERO Models</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">None (No HERO models use Series 10)</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">HERO 2.2, HERO 3.1, HERO 4.2, HERO 5.1, HERO 6.1, HERO 7.1, HERO 9.1, Office HERO 6.1</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Compatible EasyShare Models</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">EasyShare 5100, EasyShare 5300, EasyShare 5500</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">None</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Chip Architecture</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Wide-pad Generation 1 EEPROM smart chip</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Miniaturized Generation 2 encoded security microchip</td>
    </tr>
  </tbody>
</table>

<h2>Standard Yield vs. XL High-Yield Capacity</h2>
<ul>
  <li><strong>Kodak 10B Black:</strong> ~425 standard ISO text pages | <strong>10XL Black:</strong> ~770 pages</li>
  <li><strong>Kodak 10C Color:</strong> ~420 composite color pages</li>
  <li><strong>Kodak 30B Black:</strong> ~335 standard text pages | <strong>30XL Black:</strong> ~670 pages</li>
  <li><strong>Kodak 30C Color:</strong> ~275 composite color pages | <strong>30XL Color:</strong> ~550 pages</li>
</ul>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>What is Kodak Verité ink and does it work in ESP or HERO printers?</summary>
  <p>Kodak Verité printers (such as Verité 55, 65) were manufactured under license by Funai and use completely different integrated-printhead ink cartridges (Kodak Verité 5, 5XL, 5XXL). They are 100% incompatible with ESP and HERO printers.</p>
</details>
<details>
  <summary>Can I install a 10XL cartridge in an ESP 3250 printer?</summary>
  <p>Yes. XL cartridges have the exact same physical exterior form factor as standard cartridges; they simply contain higher-density internal sponge reservoirs and more ink volume.</p>
</details>
`,

  'kodak-printer-error-code-3528': `
<h2>Understanding Kodak Error 3528 (Paper Jam in Feed Chute)</h2>
<p>On Kodak ESP and HERO multifunction printers, <strong>Error 3528</strong> is triggered when the optical paper feed timing sensor (located beneath the platen) fails to detect paper trailing edge clearance within a specific rotational step count of the main drive motor. The printer assumes paper has crumpled, accordioned, or become jammed inside the internal feed rollers.</p>

<h2>Step-by-Step Resolution for Error 3528</h2>
<ol>
  <li><strong>Power Off and Inspect the Duplexer Rear Cleanout Panel:</strong>
    <p>Disconnect power. Remove the rear duplex door assembly by pressing the release tabs. Look into the feed rollers with a flashlight. Remove any accordion-pleated sheets by pulling slowly with both hands. Inspect the plastic roller idler gears for any broken teeth.</p>
  </li>
  <li><strong>Check the Optical Flag Sensor:</strong>
    <p>Inside the paper channel is a tiny, delicate black plastic sensor actuator (flag). If previous paper jams were pulled out aggressively toward the front, this flag can be forced past its optical stop, sticking in the "tripped" position. Use a dry foam swab to verify the flag springs freely back and forth.</p>
  </li>
  <li><strong>Clean the Lower Pickup and Registration Rollers:</strong>
    <p>Dust and paper fibers coat the rubber rollers, causing them to slip. When the rollers slip, the paper advances too slowly, violating the firmware's timing window and generating Error 3528. Wipe the rollers with distilled water and let dry for 10 minutes.</p>
  </li>
  <li><strong>Execute a Hardware NVRAM Reset:</strong>
    <p>Unplug the printer from the wall for 10 minutes. While unplugged, hold down the Power button for 20 seconds. Reconnect power to clear the latched error code from buffer memory.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does Error 3528 occur when there is no visible paper inside?</summary>
  <p>A tiny torn corner of paper (as small as 3mm) wedged directly inside the optical sensor slot will permanently block the infrared beam, making the printer report Error 3528 even though the main paper path looks completely clear.</p>
</details>
<details>
  <summary>Does curling photo paper cause Error 3528?</summary>
  <p>Yes. Heavy photo paper that has curled due to humidity will catch on the entrance ribs of the print platen, stalling the transport motor and triggering Error 3528.</p>
</details>
`,

  'kodak-printer-ink-cartridge-not-recognized': `
<h2>Why Kodak Printers Display "Ink Cartridge Not Recognized"</h2>
<p>Each Kodak ink cartridge incorporates a small smart microchip on its rear or side that communicates cartridge model, color coding, batch validation, and estimated ink volume to the carriage interface. When the printer displays "Cartridge Missing", "Not Recognized", or an orange warning LED, the communication circuit between the smart chip and the carriage sensor board has failed.</p>

<h2>Exhaustive Fix for Unrecognized Cartridges</h2>
<ol>
  <li><strong>Clean the Smart Chip Contacts with Isopropyl Alcohol:</strong>
    <p>Remove the unrecognized cartridge. Locate the copper/gold contact pads on the cartridge. Skin oils, dust, or dried ink droplets create an insulating barrier. Wipe the contacts thoroughly with a microfiber cloth moistened with 99% isopropyl alcohol. Allow 2 minutes to dry.</p>
  </li>
  <li><strong>Inspect and Clean the Carriage Spring Contact Pins:</strong>
    <p>Look inside the printhead carriage slot where the cartridge sits. You will see small, flexible gold-plated wire pins. Inspect for dried ink accumulation or pins that have been bent down flat. Clean with a dry cotton swab.</p>
  </li>
  <li><strong>Verify the Cartridge Locking Latch:</strong>
    <p>When inserting Kodak Series 10 or 30 cartridges, push downward firmly until you hear and feel a distinct mechanical <strong>snap / click</strong>. If the plastic retaining tab is weak or unlatched, the cartridge will sit 1mm too high, breaking contact with the microchip reader.</p>
  </li>
  <li><strong>Third-Party Chip Incompatibility Workaround:</strong>
    <p>Remanufactured or third-party compatible cartridges often feature recycled smart chips that have reached their maximum write cycles. If the printer rejects a third-party cartridge, installing a genuine Kodak cartridge will instantly verify whether the fault lies in the printer hardware or the third-party microchip.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I bypass the "Cartridge Not Recognized" error to print in black only?</summary>
  <p>No. Kodak desktop printers require both valid black and color cartridges with communicating microchips installed to operate. The printer will lock printing if either cartridge is unrecognized.</p>
</details>
<details>
  <summary>Why does the printer recognize the cartridge but still show empty ink?</summary>
  <p>The chip contains the serial number and page estimate. Once a chip records that its ink volume has been fully consumed, refilling the cartridge with liquid ink will not reset the digital chip counter unless a dedicated chip resetter is used.</p>
</details>
`,

  'kodak-printer-firmware-update-failed-loop': `
<h2>Recovering a Kodak Printer Stuck in a Firmware Boot Loop</h2>
<p>When a Kodak printer experiences a power interruption, Wi-Fi disconnect, or host computer crash during a firmware flashing routine, the flash EEPROM can be left with corrupted or incomplete boot code. The printer often becomes stuck in an endless reboot cycle, displays a flashing power light, or shows an error screen reading "Firmware Update Failed - Connect USB".</p>

<h2>Step-by-Step Firmware Recovery Protocol</h2>
<ol>
  <li><strong>Direct USB Recovery Connection:</strong>
    <p>Never attempt firmware recovery over Wi-Fi. Connect the Kodak printer directly to a Windows PC using a high-quality USB 2.0 cable (under 6 feet in length). Disconnect all other USB devices from the computer to prevent port bus conflicts.</p>
  </li>
  <li><strong>Download the Standalone Firmware Utility:</strong>
    <p>Obtain the official Kodak Firmware Update utility for your specific ESP or HERO model. Right-click the utility and select <strong>"Run as administrator"</strong>.</p>
  </li>
  <li><strong>Force Hardware Bootloader Mode:</strong>
    <ul>
      <li>Unplug the power cable from the back of the printer.</li>
      <li>Press and hold the physical <strong>Power</strong> and <strong>Cancel</strong> (or Color Start) buttons simultaneously.</li>
      <li>While holding the buttons, plug the AC power cable back into the printer.</li>
      <li>Continue holding for 10 seconds until the display flashes or the LED enters a steady recovery blink pattern.</li>
    </ul>
  </li>
  <li><strong>Execute the Firmware Flash:</strong>
    <p>Run the Kodak Firmware Update tool on your PC. It will detect the printer in Emergency Recovery / Bootloader Mode and re-flash the complete firmware binary image to the ROM. Do not touch or unplug the machine until the printer fully reboots to its home screen.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can a bricked Kodak printer be recovered on macOS?</summary>
  <p>The low-level firmware recovery tools for Kodak printers were developed for Windows (XP through Windows 10). Performing the firmware recovery on a Windows PC is significantly more reliable than macOS virtual machines.</p>
</details>
<details>
  <summary>What should I do if the update halts at 99%?</summary>
  <p>If the updater stalls at 99%, wait at least 15 minutes before touching anything, as the printer may be verifying checksum blocks. If it remains completely frozen, restart the PC and repeat the force bootloader recovery steps above.</p>
</details>
`,

  'kodak-printer-calibration-sheet-error': `
<h2>Why Kodak Printers Fail Printhead Calibration and Alignment</h2>
<p>Following the installation of a new printhead or ink cartridge, Kodak printers automatically feed a sheet of paper and print a series of black and color test blocks (the <strong>Alignment / Calibration Sheet</strong>). An optical sensor on the underside of the printhead carriage scans these printed marks to calibrate bidirectional dot placement and color registration. When the scan fails, the printer alerts with "Calibration Failed" or "Alignment Error".</p>

<h2>Step-by-Step Troubleshooting for Calibration Errors</h2>
<ol>
  <li><strong>Inspect the Calibration Print Quality:</strong>
    <p>Look closely at the printed alignment pattern. If the black bars are broken, streaky, or completely missing, the optical carriage sensor cannot read the contrast lines. Run a <strong>Printhead Cleaning Cycle</strong> through the Maintenance menu to ensure all nozzles are firing crisp, solid ink lines before recalibrating.</p>
  </li>
  <li><strong>Use Standard Bright White Paper:</strong>
    <p>The optical calibration sensor is calibrated for standard 20 lb bright white bond paper (92+ brightness rating). If you attempt alignment using colored paper, recycled gray paper, lined notebook paper, or glossy photo paper, the optical sensor cannot detect the baseline contrast, causing instant calibration failure.</p>
  </li>
  <li><strong>Clean the Optical Calibration Sensor Lens:</strong>
    <p>On the bottom left of the printhead carriage is a miniature optical reflective sensor. Paper dust and ink mist can coat the clear sensor lens. Move the carriage to the center, inspect the underside with a flashlight, and gently wipe the sensor lens with a dry cotton swab.</p>
  </li>
  <li><strong>Manually Load the Alignment Sheet onto the Flatbed Scanner (On Dual-Scan Models):</strong>
    <p>On select Kodak all-in-one models (such as the ESP 5250 and Hero 5.1), after the alignment page prints, you must place the printed sheet face-down on the flatbed scanner glass and press <strong>Start</strong> to complete alignment. Ensure the top-left corner of the page is aligned with the guide arrow on the glass.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I skip the alignment process and continue printing?</summary>
  <p>Yes. You can press the <strong>Cancel</strong> or <strong>Back</strong> button on the control panel to bypass the calibration prompt. However, high-resolution photo prints and fine text may show slight horizontal banding or blurry edges until calibration is completed.</p>
</details>
<details>
  <summary>Why does the printer print a calibration sheet every single time I turn it on?</summary>
  <p>If the printer forces an alignment sheet on every boot, the previous calibration was never successfully completed and saved to NVRAM. Complete a successful alignment once with fresh white paper to clear the recurring startup prompt.</p>
</details>
`,

  'kodak-printer-printing-double-lines-text-shadow': `
<h2>Causes of Double Lines, Ghosting, and Text Shadows on Kodak Printers</h2>
<p>When printed text appears with a secondary "ghost" image directly beside or beneath the letters, or when straight vertical lines look jagged and doubled, the issue stems from two root causes: an uncalibrated bidirectional printhead or a contaminated <strong>Linear Optical Timing Strip (Encoder Strip)</strong>.</p>

<h2>Exhaustive Alignment & Encoder Restoration Workflow</h2>
<ol>
  <li><strong>Clean the Linear Encoder Strip (Primary Cause):</strong>
    <p>The clear plastic encoder strip runs horizontally behind the printhead carriage. It is marked with thousands of microscopic vertical positioning lines. Grease or ink mist smudges cause the carriage optical sensor to miscalculate its exact position during the bidirectional pass, firing droplets a fraction of a millimeter off-target and creating a double image.</p>
    <ul>
      <li>Unplug the printer and open the access door.</li>
      <li>Moisten a clean microfiber cloth with distilled water.</li>
      <li>Gently pinch the clear strip between your fingers and wipe from left to right.</li>
      <li><strong>CAUTION:</strong> Do not use alcohol, as it dissolves the printed timing marks. Do not pull aggressively to avoid unhooking the tension spring.</li>
    </ul>
  </li>
  <li><strong>Execute Bidirectional Printhead Alignment:</strong>
    <ul>
      <li>Load fresh, bright white paper in the tray.</li>
      <li>On the printer display: Navigate to <strong>Maintenance &gt; Calibrate / Align Printhead</strong>.</li>
      <li>Allow the printer to print and scan the calibration pattern. This recalibrates the microsecond timing between left-to-right and right-to-left carriage passes.</li>
    </ul>
  </li>
  <li><strong>Check for Carriage Guide Rail Friction:</strong>
    <p>If the steel carriage guide rail is bone dry or coated in sticky dust, the carriage will stutter mid-sweep. Clean the metal rod with a lint-free cloth and apply 2 drops of synthetic silicone lubricant (or sewing machine oil) across the rod.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does text shadow appear only in High Quality mode but not Draft mode?</summary>
  <p>Draft mode often prints unidirectionally (in one direction only), masking timing errors. High-quality mode prints bidirectionally at high speed, exposing any misalignment in the encoder strip or carriage timing.</p>
</details>
<details>
  <summary>Can a loose printhead cause double lines?</summary>
  <p>Yes. If the printhead latch lever is not clicked down 100% securely, the printhead assembly can rock slightly as the carriage changes direction, creating double-line artifacts.</p>
</details>
`,

  'kodak-portable-printer-overheating-fix': `
<h2>Thermal Dynamics of Kodak 4PASS & ZINK Portable Photo Printers</h2>
<p>Kodak portable photo printers (including Kodak Step, Mini 2 Retro, Mini 3 Retro, and Dock Plus) operate using either direct thermal dye-crystal activation (ZINK) or thermal dye-sublimation transfer (4PASS). In both technologies, a micro-thermal printhead reaches temperatures over 300°F (150°C) to vaporize and bond color layers. Because these portable devices are housed in ultra-compact plastic bodies without cooling fans, thermal saturation occurs quickly during continuous printing.</p>

<h2>Preventing and Resolving Thermal Safety Shutdowns</h2>
<ol>
  <li><strong>Understanding the Thermal Cooldown Pause:</strong>
    <p>When the internal thermistor detects that printhead or battery temperatures have exceeded safe thresholds (typically after printing 3 to 5 photos continuously), the firmware will halt printing and flash a <strong>Red / Amber LED</strong>. This is a built-in safety cutoff designed to prevent the internal lithium-ion battery from swelling and to protect the thermal head from burnout.</p>
  </li>
  <li><strong>Optimal Operating Environment:</strong>
    <ul>
      <li>Never operate portable Kodak photo printers in direct sunlight, inside parked cars, or in unventilated bags.</li>
      <li>Place the printer on a hard, flat surface (desk or table) rather than a bed, rug, or cloth surface that traps radiated heat.</li>
      <li>Allow a <strong>60 to 90-second resting interval</strong> between consecutive photo prints to allow ambient heat dissipation.</li>
    </ul>
  </li>
  <li><strong>Do Not Charge and Print Simultaneously:</strong>
    <p>Charging the internal lithium-ion battery via USB generates substantial heat within the same confined casing as the thermal printhead. If you print while connected to a fast charger, the combined thermal load will trigger overheating alarms almost immediately. Charge the printer fully first, unplug it, and print on battery power.</p>
  </li>
  <li><strong>Allow a 15-Minute Passive Cooldown:</strong>
    <p>If an overheating halt occurs, power off the device and leave it in a cool, air-conditioned room for 15 minutes. Do not attempt to force-reset or restart the print job until the chassis feels completely cool to the touch.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Will overheating damage my 4PASS ink ribbon cartridge?</summary>
  <p>Excessive heat inside the chamber can cause the ultra-thin yellow, magenta, or cyan dye ribbon film to melt or adhere directly to the photo paper, causing ribbon tears. Keeping the printer cool prevents cartridge jams.</p>
</details>
<details>
  <summary>Why does the printed photo have color streaks when the printer is hot?</summary>
  <p>When the thermal head is overheated, the heat spreads unevenly across adjacent thermal elements, transferring excessive dye and creating dark horizontal streaks or color saturation bands across the image.</p>
</details>
`,

  'how-to-clean-kodak-printer-encoder-strip': `
<h2>The Vital Function of the Kodak Linear Encoder Strip</h2>
<p>Suspended horizontally across the entire width of the printhead carriage path is a 5mm-tall flexible optical timing strip (the <strong>Linear Encoder Strip</strong>). This transparent strip is etched with thousands of microscopic vertical hash marks that an optical photodiode sensor on the back of the carriage reads to calculate printhead speed, acceleration, and dot placement. If ink mist, aerosolized grease, or paper dust obscures these hash marks, the printer loses horizontal tracking, resulting in printhead carriage collisions, grinding noises, text ghosting, or fatal carriage jam errors.</p>

<h2>Step-by-Step Safe Cleaning Procedure</h2>
<ol>
  <li><strong>Power Off and Unplug the Printer:</strong>
    <p>Safety is paramount. Unplug the AC power cord from the wall. Lift the top printer lid to access the carriage chamber.</p>
  </li>
  <li><strong>Locate the Clear Strip:</strong>
    <p>Look directly above the silver steel carriage guide rod. You will see the thin, clear plastic ribbon suspended between two metal tension brackets on the far left and far right walls of the chassis.</p>
  </li>
  <li><strong>The Two-Finger Microfiber Wipe:</strong>
    <ul>
      <li>Take a lint-free optical microfiber cloth or lens wipe.</li>
      <li>Moisten the cloth slightly with <strong>warm distilled water</strong>.</li>
      <li><strong>CRITICAL WARNING:</strong> Never use isopropyl alcohol, acetone, ammonia, or glass cleaner. Chemical solvents will instantly dissolve the microscopic printed emulsion lines, permanently destroying the encoder strip.</li>
      <li>Gently pinch the strip between your thumb and forefinger with the damp cloth.</li>
      <li>Slide your fingers smoothly from left to right along the strip. You will see black ink mist and amber grease transfer onto the cloth.</li>
      <li>Repeat with a dry section of the microfiber cloth to remove all moisture.</li>
    </ul>
  </li>
  <li><strong>Clean the Optical Sensor Eye:</strong>
    <p>Behind the printhead carriage is a small black plastic bracket holding the optical sensor reader. Use a gentle puff of dry compressed air to clear any loose dust fibers lodged inside the sensor slot.</p>
  </li>
  <li><strong>Inspect Mounting Springs:</strong>
    <p>Verify that the strip has not detached from the tension spring on the left chassis wall. The strip should be taut and level across the entire print width.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>What happens if the encoder strip unhooks during cleaning?</summary>
  <p>If the strip pops off its mount, use needle-nose tweezers to hook the rectangular slot on the left end back onto the metal spring, feed the strip through the optical sensor slot on the carriage, and latch the right end onto the fixed post.</p>
</details>
<details>
  <summary>How often should I clean the encoder strip?</summary>
  <p>For regular household use, cleaning the encoder strip once every 12 to 18 months (or whenever double text lines appear) is sufficient to maintain pinpoint print registration.</p>
</details>
`
};

async function main() {
  console.log('🚀 Expanding Kodak Articles (Batch 2 - 10 articles)...\n');

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

  console.log('\n🎉 Batch 2 Kodak Expansion Complete!');
}

main().then(async () => prisma.$disconnect()).catch(async e => { console.error(e); prisma.$disconnect(); process.exit(1); });
