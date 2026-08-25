import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function stripCrossBrandLinks(html: string): string {
  return html.replace(/<a\s[^>]*href="\/[^"]*"[^>]*>([^<]*)<\/a>/gi, '$1');
}

const expansions: Record<string, string> = {
  'canon-ink-absorber-almost-full-press-ok': `
<h2>Understanding the Canon "Ink Absorber Almost Full" (Error 1700 / E08) Warning</h2>
<p>When your Canon PIXMA printer displays "Ink Absorber Almost Full", Support Code <strong>1700</strong>, or flashes an orange alarm light 8 times (Error E08), the internal software counter calculating waste ink volume has reached approximately <strong>95% capacity</strong>. At this stage, the printer has not locked permanently — it is providing an advisory warning before reaching the fatal 100% hard lockout (Error 5B00 / P07).</p>

<h2>How to Bypass the 1700 / E08 Warning and Resume Printing</h2>
<ol>
  <li><strong>The Physical Stop/Reset Button Bypass:</strong>
    <p>When the "Ink Absorber Almost Full" warning dialog appears on your computer screen or the printer LCD, simply press the physical <strong>Stop / Reset (Red inverted triangle)</strong> or <strong>OK</strong> button on the printer control panel. The printer will dismiss the alert, acknowledge your confirmation, and execute your incoming print job normally.</p>
  </li>
  <li><strong>Disabling the Canon Status Monitor Popup in Windows:</strong>
    <ul>
      <li>Open Control Panel &gt; Devices and Printers.</li>
      <li>Right-click your Canon printer &gt; <strong>Printing Preferences</strong>.</li>
      <li>Go to the <strong>Maintenance</strong> tab and click <strong>View Printer Status</strong>.</li>
      <li>In the status window, click <strong>Option &gt; Enable Status Monitor &gt; Uncheck</strong>. This prevents annoying full-screen interruption dialogs while you finish printing.</li>
    </ul>
  </li>
  <li><strong>Planning for the 100% Lockout (Error 5B00):</strong>
    <p>Pressing OK allows you to continue printing for roughly 500 to 1,000 additional pages. Once the counter hits 100%, pressing OK will no longer work, and a full Service Mode reset using the Canon Service Tool software will be required.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Will ink leak out of the printer if I bypass the warning?</summary>
  <p>The porous felt pads in the base of the printer are engineered with an intentional 20% safety margin. Bypassing the 95% warning will not cause ink to overflow immediately, but you should avoid placing the printer on valuable furniture.</p>
</details>
<details>
  <summary>Can I reset the counter back to 0% before it reaches 100%?</summary>
  <p>Yes. You can place the printer into Service Mode at any time and use Canon Service Tool (v3400/v4905) to clear the main ink absorber counter back to 0%.</p>
</details>
`,

  'canon-pixma-ts6420-error-code': `
<h2>Master Diagnostic Error Code Guide for the Canon PIXMA TS6420 / TS6420a</h2>
<p>The Canon PIXMA TS6420 is an ultra-compact wireless all-in-one printer featuring an OLED front display and an automatic expanding output tray. When errors occur, the OLED screen displays 4-digit Support Codes. Below is the comprehensive troubleshooting matrix.</p>

<h2>TS6420 Support Code Diagnostic Matrix</h2>
<table style="width:100%; border-collapse: collapse; margin: 20px 0;">
  <thead>
    <tr style="background-color: #f3f4f6; text-align: left;">
      <th style="padding: 10px; border: 1px solid #d1d5db;">Support Code</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">Hardware Fault Identified</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">Immediate Technical Resolution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>1000 / 1003</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">No Paper in Front Cassette or Rear Tray</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Load plain paper in cassette; ensure side edge guides are snug.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>1300 / 1303</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Paper Jam Inside Transport Unit</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Open rear cleanout cover; remove jammed sheets slowly with both hands.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>1401 / 1403</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">FINE Cartridge Unrecognized (PG-260 / CL-261)</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Clean rear copper contacts with 99% isopropyl alcohol; reseat firmly.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>5100</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Carriage Jam / Foreign Object Obstruction</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Clear debris from carriage path; clean clear optical encoder strip.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>5B00 / 1700</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Waste Ink Absorber Full / Near Full</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Reset waste counter via Service Mode and Canon Service Tool.</td>
    </tr>
  </tbody>
</table>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>How do I connect the TS6420 to Wi-Fi without entering a password?</summary>
  <p>Press and hold the physical <strong>Wireless Connect (Phone/Wi-Fi icon)</strong> button on the front panel for 3 seconds. Open the Canon PRINT app on your smartphone to complete the wireless pairing in under 60 seconds.</p>
</details>
<details>
  <summary>Why does the TS6420 display an error when printing photos from the front cassette?</summary>
  <p>The front cassette is engineered strictly for plain letter/A4 paper. Small photo paper (4x6, 5x7) MUST be loaded into the <strong>Rear Paper Tray</strong>.</p>
</details>
`,

  'canon-printer-error-e02-cartridge-paper': `
<h2>Understanding Canon Error E02 (Paper Out / Tray Feed Failure)</h2>
<p>On Canon PIXMA printers featuring a 7-segment LED screen (e.g., MG2522, TS3122, MP280), the code <strong>E02</strong> (alternating E, 0, 2) signifies a <strong>Paper Out / Paper Feed Failure</strong>. A widespread misconception among printer users is that E02 indicates a cartridge error; in reality, E02 is strictly a paper transport sensor fault.</p>

<h2>Exhaustive 4-Step Resolution for Error E02</h2>
<ol>
  <li><strong>Proper Paper Loading & Alignment in the Rear Tray:</strong>
    <p>Ensure paper is loaded straight in the vertical rear feed chute. Fan the paper stack before loading to break static cling. Slide the green or black paper width guide firmly against the edge of the stack without bowing the sheets.</p>
  </li>
  <li><strong>Clean the Rubber Paper Pickup Rollers:</strong>
    <p>Dust and microscopic paper glaze coat the rubber pickup rollers over time, causing them to slip on the paper surface. Moisten a lint-free cloth with warm distilled water. Reach into the rear paper slot and wipe the rubber roller tread vigorously. Rotate the roller by hand to clean all 360 degrees.</p>
  </li>
  <li><strong>Check for Foreign Objects in the Vertical Feed Slot:</strong>
    <p>Because the rear feed slot is open vertically, pens, paperclips, staples, and coins frequently fall into the chute, physically blocking the pickup roller from lowering. Shine a bright flashlight down the paper slot and remove any debris with tweezers.</p>
  </li>
  <li><strong>Press the Black or Color Start Button to Clear:</strong>
    <p>After reloading paper, press the physical <strong>Black Start</strong> or <strong>Color Start</strong> button on the control panel to command the printer to retry feeding the sheet.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does E02 happen when the paper tray is full?</summary>
  <p>Overloading the tray with more than 50-60 sheets creates excessive downward weight that binds the pickup roller. Reduce the paper stack to 20-25 sheets of fresh 20 lb copy paper.</p>
</details>
<details>
  <summary>What is the difference between Error E02 and Error E03?</summary>
  <p><strong>Error E02</strong> means paper failed to enter the printer (Paper Out / Pickup Slip). <strong>Error E03</strong> means paper entered the printer but got stuck inside (Paper Jam).</p>
</details>
`,

  'canon-pixma-ts3522-not-printing': `
<h2>Troubleshooting the Canon PIXMA TS3522 / TS3520 (Not Printing & Setup Issues)</h2>
<p>The Canon PIXMA TS3522 is an affordable wireless all-in-one utilizing PG-275 black and CL-276 color FINE cartridges. When the TS3522 halts all printing, the root cause is almost always unremoved cartridge protective tape, a frozen Wi-Fi Direct connection, or Windows printer spooler stalling.</p>

<h2>Exhaustive 4-Step Recovery Workflow</h2>
<ol>
  <li><strong>Verify the Protective Orange Tape is Removed:</strong>
    <p>Open the front cartridge access cover. Remove both the PG-275 and CL-276 cartridges. Ensure the bright orange protective tape covering the gold electrical contacts and bottom nozzles has been peeled off 100%. Reinsert cartridges until the locking latch clicks.</p>
  </li>
  <li><strong>Execute a Hardware Wireless Reset:</strong>
    <ul>
      <li>Turn the TS3522 on.</li>
      <li>Press the <strong>Settings (Wrench/Pliers)</strong> button repeatedly until a number <code>17</code> appears on the 1.5" LCD screen.</li>
      <li>Press the <strong>Color Start</strong> button. The network settings will reset to factory defaults.</li>
      <li>Press and hold the physical <strong>Wireless Connect (Phone)</strong> button for 3 seconds to re-enter pairing mode. Connect via the Canon PRINT mobile app.</li>
    </ul>
  </li>
  <li><strong>Clear the Windows Print Queue:</strong>
    <p>Stop the Windows Print Spooler service, delete stuck <code>.SPL</code> files in <code>C:\\Windows\\System32\\spool\\PRINTERS</code>, and restart the spooler service.</p>
  </li>
  <li><strong>Switch Driver Port to Standard TCP/IP:</strong>
    <p>In Windows Printer Properties &gt; Ports tab, assign the printer to a Standard TCP/IP port matching the printer's current IP address to prevent WSD offline drops.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the TS3522 print blank pages?</summary>
  <p>If the cartridge nozzles are clogged from sitting idle, navigate to Settings &gt; Maintenance &gt; Clean Print Head (or icon with gear and droplet) to run two cleaning cycles.</p>
</details>
<details>
  <summary>Does the TS3522 support 5GHz Wi-Fi?</summary>
  <p>No. The TS3522 supports 2.4GHz 802.11b/g/n only. Connect your smartphone/PC to your router's 2.4GHz Wi-Fi band during initial pairing.</p>
</details>
`,

  'canon-pixma-tr4720-wifi-setup': `
<h2>Complete Wi-Fi Setup Guide for the Canon PIXMA TR4720 / TR4700 Series</h2>
<p>The Canon PIXMA TR4720 is a compact home-office wireless all-in-one featuring an Automatic Document Feeder (ADF), faxing, and auto-duplexing. Connecting it to modern mesh and dual-band Wi-Fi networks is seamless when following the proper wireless pairing methods.</p>

<h2>Method 1: Easy Wireless Connect via Canon PRINT Mobile App (Fastest)</h2>
<ol>
  <li>Turn on the TR4720 printer.</li>
  <li>Press and hold the physical <strong>Wireless Connect (Phone/Wi-Fi icon)</strong> button on the front panel for 3 seconds until the display confirms "Processing...".</li>
  <li>Open the <strong>Canon PRINT Inkjet/SELPHY</strong> app on your smartphone (ensure Bluetooth and Location are ON).</li>
  <li>Tap <strong>Add Printer &gt; Register Printer</strong>.</li>
  <li>Select <strong>"Perform Wireless Setup"</strong>. The app will automatically transfer your smartphone's 2.4GHz Wi-Fi credentials to the TR4720 in under 60 seconds.</li>
</ol>

<h2>Method 2: Manual Wi-Fi Setup via Printer Control Panel</h2>
<ol>
  <li>Press the physical <strong>Setup (Gear/Wrench)</strong> button on the TR4720.</li>
  <li>Select <strong>Device settings &gt; LAN settings &gt; Wi-Fi &gt; Wi-Fi setup &gt; Manual connect</strong>.</li>
  <li>Select your wireless network name (SSID) from the list.</li>
  <li>Enter your WPA2 password using the alphanumeric keypad. Press OK. The screen will confirm "Connected".</li>
</ol>

<h2>Method 3: WPS Push Button Pairing</h2>
<ol>
  <li>In the Wi-Fi setup menu, select <strong>WPS (Push button method)</strong>. Press OK.</li>
  <li>Within 2 minutes, press and hold the physical <strong>WPS button</strong> on your router for 3 to 5 seconds. The TR4720 will pair automatically.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the TR4720 drop offline in Windows 11?</summary>
  <p>In Windows Printer Properties &gt; Ports tab, switch from a WSD port to a <strong>Standard TCP/IP Port</strong> using the printer's local IP address.</p>
</details>
<details>
  <summary>Does the TR4720 support Apple AirPrint?</summary>
  <p>Yes. Once connected to the same local Wi-Fi network, the TR4720 appears automatically in the iOS and macOS AirPrint dialogs without needing any drivers.</p>
</details>
`,

  'canon-pixma-mg3620-offline': `
<h2>Why the Canon PIXMA MG3620 Goes Offline in Windows & How to Reconnect</h2>
<p>The Canon PIXMA MG3620 is one of the most popular budget wireless all-in-ones. Because it lacks an LCD display and uses a basic 2.4GHz network card, router DHCP lease renewals and Windows WSD port timeouts frequently cause the printer status to change to "Offline".</p>

<h2>Exhaustive 4-Step Reconnection Workflow</h2>
<ol>
  <li><strong>Hardware Power Cycle & Network Wakeup:</strong>
    <p>Turn off the MG3620. Unplug your Wi-Fi router for 30 seconds, then plug it back in. Once the router is fully online, power on the MG3620. The blue Wi-Fi LED should illuminate solid blue.</p>
  </li>
  <li><strong>Re-Pairing Wi-Fi Using the Cableless Setup Method:</strong>
    <ul>
      <li>Press and hold the physical <strong>Wi-Fi button</strong> on the top left of the MG3620 until the Power lamp flashes once.</li>
      <li>Release the button. Verify the blue Wi-Fi lamp flashes rapidly.</li>
      <li>Press the <strong>Color Start</strong> button, then press the <strong>Wi-Fi button</strong> once. The Power lamp will flash and the Wi-Fi lamp will stay lit.</li>
      <li>Launch the Canon setup utility on your PC or open the Canon PRINT app on your phone to complete pairing.</li>
    </ul>
  </li>
  <li><strong>Create a Standard TCP/IP Port in Windows:</strong>
    <ul>
      <li>Open Control Panel &gt; Devices and Printers &gt; right-click Canon MG3620 &gt; <strong>Printer Properties &gt; Ports</strong>.</li>
      <li>Add a <strong>Standard TCP/IP Port</strong> with the printer's IP address.</li>
      <li>Uncheck "SNMP Status Enabled" in port configuration. Click Apply.</li>
    </ul>
  </li>
  <li><strong>Uncheck "Use Printer Offline":</strong>
    <p>Open the print queue, click the Printer menu at the top-left, and ensure "Use Printer Offline" is unchecked.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>How do I find the IP address of a Canon MG3620 without a screen?</summary>
  <p>Press and hold the physical <strong>Network Information (or Wi-Fi)</strong> button until the power light flashes 15 times, then release. The printer will print a network configuration sheet displaying its IP address.</p>
</details>
<details>
  <summary>Can I connect the MG3620 via USB if Wi-Fi continues to fail?</summary>
  <p>Yes. A standard USB-A to USB-B cable provides an instant, rock-solid connection that is immune to Wi-Fi disconnects.</p>
</details>
`,

  'canon-printer-5b00-vs-1700-difference': `
<h2>Engineering Comparison: Canon Error 5B00 vs. Error 1700 vs. Error 5800</h2>
<p>Canon PIXMA printers utilize a mathematical waste ink telemetry system. As the internal porous felt absorber pads absorb purged ink from nozzle cleanings, the firmware tracks the percentage of saturation (<code>D-Value</code>). Understanding the distinction between 1700, 5B00, and 5800 determines whether the printer can be operated or requires a service lockout reset.</p>

<h2>Detailed Comparison Matrix</h2>
<table style="width:100%; border-collapse: collapse; margin: 20px 0;">
  <thead>
    <tr style="background-color: #f3f4f6; text-align: left;">
      <th style="padding: 10px; border: 1px solid #d1d5db;">Error Code</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">Saturation Level</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">Hardware State & Behavior</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">Resolution Method</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>1700 / E08</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>95% Full</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Advisory Warning; printer continues printing after pressing Stop/Reset or OK.</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Press OK on printer or computer; prepare for eventual counter reset.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>5B00 / P07</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>100% Full</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Hard Lockout:</strong> All printing and scanning suspended to prevent physical ink overflow.</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Enter Service Mode; reset main absorber counter to 0% with Canon Service Tool.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>5800</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>100% Full (Platen Absorber)</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Secondary sponge under platen (used during borderless printing) is saturated.</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Reset "Platen Absorber Counter" using Canon Service Tool.</td>
    </tr>
  </tbody>
</table>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can Error 5B00 be cleared without a computer?</summary>
  <p>On select older Canon models, a sequence of button presses in Service Mode clears the counter. On modern models (2018+), using Canon Service Tool over a USB connection is required.</p>
</details>
<details>
  <summary>Do Canon MegaTank printers have user-replaceable maintenance cartridges?</summary>
  <p>Newer MegaTank models (e.g., G6020, G7020, GX6020, GX7020) feature user-replaceable <strong>MC-G01 / MC-G02</strong> maintenance cartridges with integrated chips that require no software resets.</p>
</details>
`,

  'canon-ij-scan-utility-not-working': `
<h2>Fixing Canon IJ Scan Utility Crashes, Freezes, and Scanner Driver Errors</h2>
<p>The <strong>Canon IJ Scan Utility</strong> (and modern IJ Scan Utility Lite) is the official scanning suite bundled with Canon PIXMA and MAXIFY all-in-ones. When the software reports "Cannot communicate with scanner" (Code <code>2,156,50</code> / <code>5,156,69</code>) or crashes upon launch, local WIA service stalls or USB communication drops are responsible.</p>

<h2>Step-by-Step Scan Utility Diagnostic Protocol</h2>
<ol>
  <li><strong>Restart the Windows Image Acquisition (WIA) Service:</strong>
    <ul>
      <li>Press <strong>Windows Key + R</strong>, type <code>services.msc</code>, and press Enter.</li>
      <li>Scroll down to find <strong>Windows Image Acquisition (WIA)</strong>.</li>
      <li>Right-click WIA and select <strong>Restart</strong>.</li>
      <li>Also verify that <strong>Remote Procedure Call (RPC)</strong> and <strong>Shell Hardware Detection</strong> are running.</li>
    </ul>
  </li>
  <li><strong>Select the Correct Scanner Driver in IJ Scan Utility Settings:</strong>
    <p>Open IJ Scan Utility. Click the <strong>Settings...</strong> button at the bottom right. Under the <strong>Product Name</strong> dropdown, ensure your printer is selected with the <strong>"Network"</strong> suffix for Wi-Fi scanning (e.g., <code>Canon TS6400 series (Network)</code>) or without suffix for USB scanning. Selecting the wrong interface causes instant communication timeouts.</p>
  </li>
  <li><strong>Reinstall the Certified Canon MP Driver Package:</strong>
    <p>Download the full <strong>MP Drivers</strong> package from usa.canon.com/support. The MP Drivers package contains the low-level TWAIN and WIA scanner drivers required by IJ Scan Utility.</p>
  </li>
  <li><strong>Test with Native Windows Scan / Fax & Scan:</strong>
    <p>Press Windows Key, type <code>wfs</code> (Windows Fax and Scan), and click "New Scan" to confirm whether the scanner hardware responds to native OS scan commands.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the scanner work over USB but fail over Wi-Fi?</summary>
  <p>Third-party firewalls often block UDP port 8611 (Canon IJ Network Scanner discovery). Add an exception for <code>IJScanUt.exe</code> in Windows Defender Firewall.</p>
</details>
<details>
  <summary>Can I scan to Mac without IJ Scan Utility?</summary>
  <p>Yes. On macOS, open <strong>System Settings &gt; Printers &amp; Scanners &gt; [Your Canon] &gt; Open Scanner</strong> to scan natively via Apple AirPrint / Image Capture.</p>
</details>
`,

  'canon-printer-wireless-setup-wps': `
<h2>How to Connect Any Canon Printer to Wi-Fi Using WPS (Push Button & PIN)</h2>
<p>Wi-Fi Protected Setup (WPS) allows you to pair your Canon PIXMA or MAXIFY printer to your home wireless router without manually typing long encryption keys. Canon printers support both <strong>WPS Push Button (PBC)</strong> and <strong>WPS PIN Code</strong> methods.</p>

<h2>Method 1: WPS Push Button Setup (With Physical Buttons)</h2>
<ol>
  <li>Ensure your wireless router is powered on and has an accessible <strong>WPS button</strong> (marked with two circular rotating arrows or labeled "WPS").</li>
  <li>On the Canon printer: Press and hold the physical <strong>Wi-Fi</strong> button on the control panel until the Power lamp flashes once, then release.</li>
  <li>Verify that the blue Wi-Fi lamp flashes rapidly.</li>
  <li>Within 2 minutes, walk to your router and press and hold the <strong>WPS button</strong> for 3 to 5 seconds until its WPS light begins blinking.</li>
  <li>The blue Wi-Fi light and green Power light on the Canon printer will flash while negotiating keys, then settle on a solid blue Wi-Fi LED, confirming successful connection.</li>
</ol>

<h2>Method 2: WPS Setup on LCD Touchscreen Models (TS & MAXIFY Series)</h2>
<ol>
  <li>On the printer touchscreen, tap the <strong>Gear (Setup)</strong> icon &gt; <strong>Device settings &gt; LAN settings &gt; Wi-Fi &gt; Wi-Fi setup</strong>.</li>
  <li>Select <strong>WPS (Push button method)</strong>. Press OK.</li>
  <li>Press the WPS button on your router within 2 minutes. Tap OK on the printer screen when "Connected" appears.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the Canon Wi-Fi light flash orange during WPS?</summary>
  <p>An orange flashing error during WPS indicates a session timeout (more than 2 minutes elapsed between pressing the router and printer buttons) or a security collision. Power-cycle the router and retry.</p>
</details>
<details>
  <summary>Does WPS work on 5GHz Wi-Fi networks?</summary>
  <p>Most Canon consumer printers support 2.4GHz Wi-Fi only. Ensure your router's WPS feature pairs the printer to the 2.4GHz radio band.</p>
</details>
`,

  'canon-maxify-mb2720-error': `
<h2>Master Error Code Guide for the Canon MAXIFY MB2720 / MB2120 / MB5420</h2>
<p>The Canon MAXIFY MB2720 is a heavy-duty business inkjet printer utilizing Dual Resistant High Density (DRHD) pigment ink tanks (PGI-1200 / PGI-2200). When hardware exceptions occur, the color touchscreen displays 4-digit Support Codes. Below is the master diagnostic matrix.</p>

<h2>MAXIFY MB2720 Support Code Matrix</h2>
<table style="width:100%; border-collapse: collapse; margin: 20px 0;">
  <thead>
    <tr style="background-color: #f3f4f6; text-align: left;">
      <th style="padding: 10px; border: 1px solid #d1d5db;">Support Code</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">Hardware Fault Identified</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">Immediate Technical Resolution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>1660 / 1688</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">PGI-1200 Ink Tank Not Installed or Empty</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Install genuine Canon PGI-1200 cartridge; press down firmly until locked.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>5100</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Carriage Jam / Foreign Object in Platen</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Clear jammed paper; clean linear optical encoder strip behind carriage.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>6000</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Line Feed (Paper Feed) Timing Roller Error</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Clean circular LF encoder disc on left side of feed roller shaft.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>6A00</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Purge Unit / Wiper Blade Jam</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Clean dried ink from right-side maintenance capping station.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>5B00 / 1700</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Waste Ink Absorber Full</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Reset waste counter via Service Mode and Canon Service Tool.</td>
    </tr>
  </tbody>
</table>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the MB2720 lock the cartridge door and refuse to let me change ink?</summary>
  <p>MAXIFY printers feature motorized cartridge locks. The printer will only release the cartridge door when a tank is 100% physically empty. You cannot replace partially full cartridges until the printer prompts for replacement.</p>
</details>
<details>
  <summary>What is DRHD pigment ink on the MAXIFY series?</summary>
  <p>DRHD pigment ink provides highlighter-resistant, smudge-proof document text that will not bleed when highlighted or exposed to moisture.</p>
</details>
`,

  'canon-print-app-not-detecting-printer': `
<h2>Why the Canon PRINT Inkjet/SELPHY App Fails to Detect Your Printer</h2>
<p>The <strong>Canon PRINT App</strong> (for iOS and Android) utilizes Bluetooth Low Energy (BLE) and local mDNS Bonjour broadcast packets to discover Canon printers. When the app searches endlessly without finding your printer, mobile permission blocks, Wi-Fi band mismatch, or AP Client Isolation on the router are responsible.</p>

<h2>Exhaustive 4-Step App Discovery Resolution Guide</h2>
<ol>
  <li><strong>Grant Location & Nearby Device Permissions (Android & iOS):</strong>
    <ul>
      <li><strong>On Android (Android 10 - 14):</strong> Go to Settings &gt; Apps &gt; Canon PRINT &gt; Permissions. Ensure <strong>Location</strong> (with "Precise Location") and <strong>Nearby Devices</strong> are set to "Allow". Without Location, Android blocks Bluetooth BLE beacon discovery.</li>
      <li><strong>On iOS (iPhone / iPad):</strong> Go to Settings &gt; Canon PRINT. Ensure <strong>Local Network</strong> and <strong>Bluetooth</strong> toggles are ON.</li>
    </ul>
  </li>
  <li><strong>Verify Both Phone and Printer are on the Same 2.4GHz Band:</strong>
    <p>If your smartphone is connected to your router's 5GHz network while the Canon printer is connected to 2.4GHz, and your router enforces AP Band Isolation, the app cannot discover the printer. Connect your phone to the 2.4GHz network.</p>
  </li>
  <li><strong>Disable AP Isolation / Client Isolation in Router Settings:</strong>
    <p>Log into your router admin panel. Under Wireless Security, ensure <strong>"AP Isolation"</strong> or <strong>"Guest Mode Isolation"</strong> is disabled. When enabled, AP isolation prevents Wi-Fi clients from discovering each other.</p>
  </li>
  <li><strong>Manual IP Address Addition in Canon PRINT App:</strong>
    <p>If automated discovery continues to fail: Open Canon PRINT app &gt; Add Printer &gt; <strong>Manual Setup / Add by IP Address</strong>. Enter the printer's local IP address (e.g., <code>192.168.1.150</code>) to establish a direct TCP connection.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I print from the Canon app without a Wi-Fi router?</summary>
  <p>Yes. Enable <strong>Wi-Fi Direct / Direct Connection</strong> on the Canon printer. Connect your phone directly to the printer's own broadcasting Wi-Fi network.</p>
</details>
<details>
  <summary>Does the Canon PRINT app support scanning to smartphone?</summary>
  <p>Yes. Tap the <strong>Scan</strong> button in the app to initiate flatbed or ADF scanning directly to your phone's photo library or PDF files.</p>
</details>
`,

  'canon-maxify-gx-ink-not-detected': `
<h2>Understanding "Ink Not Detected" Errors on Canon MAXIFY GX MegaTank Series</h2>
<p>The Canon MAXIFY GX series (GX5020, GX6020, GX7020) are high-volume commercial MegaTank printers utilizing 4-color pigment ink tanks (GI-26). When the printer displays "Ink Level Not Detected", Support Code <strong>1688</strong>, or an orange tank alert, the optical fluid level prism or mechanical keying float inside the reservoir has failed to register.</p>

<h2>Step-by-Step Resolution for MAXIFY GX Ink Detection</h2>
<ol>
  <li><strong>Visually Inspect Physical Ink Levels:</strong>
    <p>Look at the clear windows on the front of the GX chassis. Verify all four tanks (Black, Cyan, Magenta, Yellow) are filled above the lower limit line. Fill with genuine Canon GI-26 pigment ink bottles.</p>
  </li>
  <li><strong>Confirm Ink Refill on the Touchscreen:</strong>
    <p>When you refill a tank on MAXIFY GX printers, you MUST confirm the refill on the screen: Navigate to <strong>Setup (Gear) &gt; Maintenance &gt; Remaining ink level notification &gt; Reset remaining ink level count</strong>. Select the refilled color to reset the software gauge to 100%.</p>
  </li>
  <li><strong>Bypass Code 1688 (Ink Level Unknown Override):</strong>
    <p>If you refilled the tank but the printer locks with Support Code 1688: Press and hold the physical <strong>Stop (Triangle)</strong> button on the control panel for at least <strong>5 seconds</strong>. This commands the printer to disable automated ink level detection, allowing printing to proceed uninterrupted.</p>
  </li>
  <li><strong>Check the MC-G01 Maintenance Cartridge:</strong>
    <p>If the printer reports a general ink delivery error, check the user-replaceable MC-G01 maintenance box on the rear. If full, replace the cartridge.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Does disabling ink level detection void my Canon warranty?</summary>
  <p>Disabling ink level tracking allows you to continue printing, but Canon is not responsible for printhead damage caused by running tanks completely dry without ink coolant.</p>
</details>
<details>
  <summary>What ink bottles do MAXIFY GX printers use?</summary>
  <p>MAXIFY GX models use <strong>Canon GI-26 pigment ink bottles</strong> (GI-26 BK, GI-26 C, GI-26 M, GI-26 Y). Never use dye-based G-series inks (GI-20/GI-290) in MAXIFY GX models.</p>
</details>
`
};

async function main() {
  console.log('🚀 Expanding Canon Articles (Batch 3 - 12 articles)...\n');

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

  console.log('\n🎉 Canon Batch 3 Complete!');
}

main().then(async () => prisma.$disconnect()).catch(async e => { console.error(e); prisma.$disconnect(); process.exit(1); });
