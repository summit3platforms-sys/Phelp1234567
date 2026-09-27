import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Article data definitions
const articlesData = [
  {
    slug: 'brother-hl-l2370dw-wifi-connection-deep-sleep-fix',
    title: 'Brother HL-L2370DW / HL-L2390DW Deep Sleep Wi-Fi Fix',
    seoTitle: 'Brother HL-L2370DW/L2390DW Deep Sleep Wi-Fi Fix',
    metaDescription: 'Fix Brother HL-L2370DW and HL-L2390DW going offline in Deep Sleep. Step-by-step menu commands, static IP setup, and Windows TCP/IP port configuration.',
    h1: 'Brother HL-L2370DW / HL-L2390DW Goes Offline After Sleep: Wi-Fi Fix',
    tags: 'Brother, Wi-Fi, Deep Sleep, HL-L2370DW, HL-L2390DW, Offline Fix',
    faqs: [
      {
        question: 'Why does my Brother printer wake up for USB printing but not over Wi-Fi?',
        answer: 'USB connections send a direct 5-volt hardware signal through the cable that interrupts the printer controller immediately. Over Wi-Fi, the printer relies on its low-power wireless transceiver listening for network packets. If Deep Sleep powers down that transceiver or network routers drop the ARP table entry, wake packets never reach the logic board.'
      },
      {
        question: 'What is the default password for the Brother Web Based Management interface?',
        answer: 'On newer HL-L2370DW and HL-L2390DW models, the default login password is printed on the machine label located on the rear or inside the front access door, labeled "Pwd". On earlier production units, the default password is "initpass".'
      },
      {
        question: 'Does disabling Deep Sleep increase my electricity bill significantly?',
        answer: 'No. Standard Sleep mode draws approximately 1.2 watts of power, while Deep Sleep draws roughly 0.5 to 0.6 watts. The difference amounts to less than 1 kilowatt-hour over an entire year, costing just a few cents annually in exchange for continuous network availability.'
      }
    ],
    content: `<h2>The Quick Answer</h2>
<p>When your Brother HL-L2370DW or HL-L2390DW enters Deep Sleep, its wireless card powers down and drops off your Wi-Fi network. The most reliable fix is disabling Deep Sleep using the control panel button shortcut, assigning a reserved static IP address, and switching Windows from a WSD port to a Standard TCP/IP port.</p>

<h2>Understanding Brother Deep Sleep vs. Auto Power Off</h2>
<p>Brother monochrome laser printers operate through three distinct power states: Ready, Sleep, and Deep Sleep. In standard Sleep mode, the fuser heater powers down while the internal network interface remains fully active, listening for incoming print spool broadcasts. In Deep Sleep, power consumption drops to roughly 0.5 watts, and the wireless transceiver powers down into a low-polling state.</p>

<p>If your wireless router does not keep active Address Resolution Protocol (ARP) tables for low-polling devices, the router forgets where the printer is located. When a computer sends a print job, the router cannot route the packets to the sleeping printer, and your operating system displays an "Offline" status.</p>

<h2>Control Panel Fix: Disabling Deep Sleep</h2>
<p>Both models allow you to disable Deep Sleep directly on the machine. Because their physical control panels differ, follow the exact sequence for your specific model.</p>

<h3>For Brother HL-L2370DW (1-Line LCD Display)</h3>
<ol>
  <li>Press <strong>▲</strong> or <strong>▼</strong> to scroll to <strong>General Setup</strong>, then press <strong>OK</strong>.</li>
  <li>Scroll to <strong>Ecology</strong>, then press <strong>OK</strong>.</li>
  <li>Scroll to <strong>Sleep Time</strong>, then press <strong>OK</strong>.</li>
  <li>While the current sleep time is displayed, press <strong>▼</strong> and <strong>Back</strong> at the exact same time. The screen will display <strong>Deep Sleep: On</strong>.</li>
  <li>Press <strong>▼</strong> to select <strong>Deep Sleep: Off</strong>, then press <strong>OK</strong>.</li>
  <li>Press <strong>Go</strong> to return to the Ready screen.</li>
</ol>

<h3>For Brother HL-L2390DW (2-Line LCD Display with Scan/Copy Keys)</h3>
<ol>
  <li>Press <strong>Menu</strong> on the control panel.</li>
  <li>Press <strong>▲</strong> or <strong>▼</strong> to select <strong>General Setup</strong>, then press <strong>OK</strong>.</li>
  <li>Select <strong>Ecology</strong>, then press <strong>OK</strong>.</li>
  <li>Select <strong>Sleep Time</strong>, then press <strong>OK</strong>.</li>
  <li>While inside the <strong>Sleep Time</strong> menu, press <strong>▼</strong> and <strong>Back</strong> simultaneously. The LCD screen will display <strong>Deep Sleep</strong>.</li>
  <li>Press <strong>▼</strong> to switch the option to <strong>Off</strong>, then press <strong>OK</strong>.</li>
  <li>Scroll down to <strong>Auto Power Off</strong> in the Ecology menu and ensure it is also set to <strong>Off</strong>.</li>
  <li>Press <strong>Stop/Exit</strong> to return to Ready status.</li>
</ol>

<p>To verify the printer's current network settings after changing these options, <a href="/brother/connectivity-issues/brother-printer-network-configuration-page-how-to-print">print a Brother network configuration report</a> directly from the machine.</p>

<h2>Configuring a Static IP via Web Based Management</h2>
<p>Dynamic Host Configuration Protocol (DHCP) allows routers to lease temporary IP addresses to connected hardware. When a Brother printer enters a sleep cycle, routers may reassign its IP address or allow the lease to expire. Assigning a permanent static IP ensures your computer always knows where to direct print traffic.</p>
<ol>
  <li>Find the printer's current IP address from your router client list or printed network configuration page.</li>
  <li>Open any web browser on a computer connected to the same network and type <code>http://[printer-ip-address]</code>.</li>
  <li>Log in using the administrator password. On newer units, look for the password printed on the machine's rear label marked "Pwd". On older models, use <code>initpass</code>.</li>
  <li>Navigate to the <strong>Network</strong> tab, then click <strong>Wireless</strong> (or <strong>Wired</strong> if using Ethernet).</li>
  <li>Select <strong>TCP/IP</strong>.</li>
  <li>Change the <strong>Boot Method</strong> from <strong>AUTO</strong> or <strong>DHCP</strong> to <strong>STATIC</strong>.</li>
  <li>Confirm that the IP Address, Subnet Mask, and Gateway match your router's local subnet.</li>
  <li>Click <strong>Submit</strong> to save the configuration.</li>
</ol>

<h2>Wi-Fi Band Requirements: 2.4 GHz Only</h2>
<p>The internal network cards on the Brother HL-L2370DW and HL-L2390DW support only 2.4 GHz 802.11b/g/n Wi-Fi bands. They do not have 5 GHz wireless hardware. If you are <a href="/brother/connectivity-issues/brother-printer-ts-02-5ghz-vs-2.4ghz">connecting to a 2.4 GHz Wi-Fi band</a> on a modern mesh router, ensure band steering does not attempt to force the printer onto a 5 GHz frequency.</p>
<p>If your router broadcasts a single combined network name for both bands, log into your router settings and create a dedicated 2.4 GHz guest network or IoT network for the printer. For general router connection failures, <a href="/brother/connectivity-issues/brother-printer-wont-connect-to-wlan-access-point">troubleshoot Brother WLAN access point connection faults</a> before adjusting local operating system ports.</p>

<h2>Fixing the Windows WSD Port Problem</h2>
<p>Windows 10 and Windows 11 frequently install network printers using Web Services for Devices (WSD). WSD monitors the device state periodically. When the printer sleeps, WSD often times out and locks the queue in an "Offline" state until the PC reboots. Replacing WSD with a Standard TCP/IP Port eliminates this issue permanently.</p>
<ol>
  <li>Press <strong>Windows Key + R</strong>, type <code>control printers</code>, and press <strong>Enter</strong>.</li>
  <li>Right-click your Brother printer and select <strong>Printer properties</strong>.</li>
  <li>Click the <strong>Ports</strong> tab. Notice if the active port starts with <code>WSD-</code>.</li>
  <li>Click <strong>Add Port...</strong>, select <strong>Standard TCP/IP Port</strong>, and click <strong>New Port...</strong>.</li>
  <li>The Add Standard TCP/IP Printer Port Wizard will launch. Click <strong>Next</strong>.</li>
  <li>In the <strong>Printer Name or IP Address</strong> field, enter the static IP address assigned to your printer.</li>
  <li>Click <strong>Next</strong>, then click <strong>Finish</strong> once Windows detects the network device.</li>
  <li>Click <strong>Apply</strong> and <strong>Close</strong>. Your print queue will now send raw port 9100 data directly to the printer IP, waking it reliably regardless of sleep state.</li>
</ol>

<h2>Updating Printer Firmware</h2>
<p>Brother has released multiple firmware revisions addressing wireless sleep disconnects. Download the official Brother Firmware Update Tool from Brother's support portal, connect your computer to the printer via USB or local network, and allow the utility to flash the latest ROM version.</p>`
  },
  {
    slug: 'canon-maxify-mb2720-error',
    title: 'Canon MAXIFY MB2720 Support Code List & Fixes',
    seoTitle: 'Canon MAXIFY MB2720 Support Code List & Fixes',
    metaDescription: 'Official Canon MAXIFY MB2720 support code list. Detailed fixes for paper jams (1300, 1303), ink issues (1688), carriage error 5100, and hardware fault B204.',
    h1: 'Canon MAXIFY MB2720 Support Code List & Troubleshooting Guide',
    tags: 'Canon, MAXIFY, MB2720, Support Code, Error Code, Paper Jam, 5100, B204',
    faqs: [
      {
        question: 'Can I override Support Code 1688 and keep printing on the MB2720?',
        answer: 'Support Code 1688 occurs when an ink cartridge is completely empty. While some consumer PIXMA models allow pressing Stop for five seconds to bypass empty ink warnings, the MAXIFY MB2720 physically locks the cartridge lever and pauses the print engine to prevent dry-firing the thermal printhead. You must install a replacement PGI-1200 cartridge to continue.'
      },
      {
        question: 'What is the physical difference between Support Code 1300 and 1303 on the MB2720?',
        answer: 'Support Code 1300 indicates paper jammed inside the front output tray or under the printhead carriage. Support Code 1303 indicates the jam occurred inside the rear transport unit located on the back panel of the printer.'
      },
      {
        question: 'Can the Canon MB2720 ink absorber warning (Support Code 1700) be reset manually?',
        answer: 'Support Code 1700 is an advisory warning that the internal waste ink absorber is approaching full capacity. Pressing the touchscreen OK button temporarily dismisses code 1700 and permits printing, but when the pads reach 100% capacity (code 5B00), service is required.'
      }
    ],
    content: `<h2>The Quick Answer</h2>
<p>Support codes on the Canon MAXIFY MB2720 indicate mechanical jams, ink depletion, or internal logic faults displayed on the touchscreen. Most issues stem from cassette paper feed misfeeds (codes 1003 and 1300) or depleted PGI-1200 ink tanks (code 1688), which can be resolved by clearing the transport path or replacing the cartridge.</p>

<h2>Official Canon MAXIFY MB2720 Support Code Table</h2>
<p>The following table lists support codes documented in Canon's official MB2700 series online reference manual, along with their causes and immediate remedies.</p>

<table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
  <thead>
    <tr style="background-color: #f1f5f9; text-align: left;">
      <th style="padding: 10px; border: 1px solid #cbd5e1;">Support Code</th>
      <th style="padding: 10px; border: 1px solid #cbd5e1;">Touchscreen Message / Condition</th>
      <th style="padding: 10px; border: 1px solid #cbd5e1;">Probable Cause</th>
      <th style="padding: 10px; border: 1px solid #cbd5e1;">Official Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1003</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">There is no paper in cassette.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Cassette 1 or Cassette 2 is empty or unseated.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Load paper into the designated cassette and align side guides.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1300</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Paper is jammed.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Paper jammed in paper output slot or inside front cover.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Open front cover, gently pull out jammed paper, close cover.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1303</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Paper jammed inside rear cover.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Sheet stalled in rear transport unit rollers.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Detach rear transport cover, pull out sheet slowly, reattach cover.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1310</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Paper jammed during automatic duplexing.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Paper stalled while reversing for two-sided printing.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Remove paper from transport unit and verify paper size supports duplex.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1688</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">The ink has run out.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">PGI-1200 ink cartridge is empty.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Replace the empty ink cartridge indicated on the touchscreen.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1700</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Ink absorber almost full.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Internal waste ink pad absorption capacity approaching 95%.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Press OK on touchscreen to resume printing; prepare for service.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>2111 / 2112</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Paper settings mismatch.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Driver paper size does not match cassette paper size registration.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Adjust cassette paper guides or correct driver print settings.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>5100</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Printer error has occurred.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Carriage motion obstructed or linear encoder strip soiled.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Clear obstructions, inspect timing strip, restart printer.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>5200</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Printer error has occurred.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Printhead temperature exceeded threshold (overheating).</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Turn off, unplug for 10 minutes, check ink levels, power on.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>6000</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Printer error has occurred.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Line feed roller mechanism stalled or slit disk sensor dirty.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Clear feed roller paper scraps and restart printer.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>B204 / B205</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Printer error has occurred.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Critical printhead electrical malfunction.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Turn off, disconnect power cord, contact Canon service.</td>
    </tr>
  </tbody>
</table>

<h2>Detailed Fixes for Common MB2720 Errors</h2>

<h3>1. Support Code 1300 and 1303: Paper Clearing Protocol</h3>
<p>Paper jams in the MB2720 occur in two primary physical areas: the front feed zone and the rear transport unit.</p>
<ol>
  <li><strong>Front Cover Jam (Code 1300):</strong> Open the front cover. If paper is visible under the printhead carriage, do not yank it sideways. Gently pull the sheet straight forward with both hands. Inspect the far left and right corners under the carriage for torn scraps.</li>
  <li><strong>Rear Cover Jam (Code 1303):</strong> Turn the printer around. Squeeze the two release tabs on the rear transport unit cover and pull it straight off. Slowly extract the paper from the feed rollers. Never use sharp tools or tweezers on the rubber rollers. Realign the transport unit cover and press firmly until both latches click.</li>
</ol>

<h3>2. Support Code 1688: Replacing Empty PGI-1200 Cartridges</h3>
<p>The MAXIFY MB2720 uses high-yield pigment ink tanks (PGI-1200 Standard or PGI-1200XL). When Code 1688 appears, open the front door. The printer carriage will move and align the depleted cartridge directly with the replacement slot.</p>
<p>Press the release button above the cartridge to pop the locking lever forward. Lift the cartridge out. Unpack the fresh cartridge, insert it firmly into the slot, and push the lever back until it locks securely. Close the front cover and allow the printer approximately 90 seconds to charge the ink delivery lines.</p>

<h3>3. Support Code 5100: Carriage Obstruction & Encoder Strip Cleaning</h3>
<p>Code 5100 indicates the printhead carriage cannot move freely across the stainless steel chassis rail. Review our <a href="/canon/error-codes-alerts/canon-printer-error-5100-carriage-fix">Canon 5100 carriage and encoder strip troubleshooting guide</a> for in-depth carriage diagnostics.</p>
<ol>
  <li>Turn off the printer and open the scanning unit.</li>
  <li>Inspect the carriage travel path. Look for paper clips, packing tape, or small torn corners of paper wedged in the drive belt gears.</li>
  <li>Locate the clear, thin plastic timing strip (encoder strip) suspended behind the carriage rail.</li>
  <li>If the strip has smudges of black ink mist or white grease, wipe it gently with a dry cotton swab. Do not use alcohol or liquid cleaners, which dissolve the calibrated index lines printed on the strip.</li>
  <li>Close the cover and power the printer back on.</li>
</ol>

<h3>4. Support Code 5200: Printhead Thermal Protection</h3>
<p>Code 5200 occurs when printhead nozzles heat up beyond safe operating limits. For a complete look at temperature trip circuits, consult <a href="/canon/error-codes-alerts/canon-printer-error-5200-overheating-fix">how Canon thermal printheads overheat under code 5200</a>.</p>
<p>Turn the printer off, disconnect the AC power cable from the wall outlet, and wait at least 10 minutes. This allows the thermal sensors on the ceramic heater plate to return to room temperature. Ensure all four PGI-1200 ink tanks contain adequate ink before powering the printer on, as liquid ink acts as the primary cooling fluid for thermal nozzles during firing.</p>

<h3>5. Support Code 6000: Line Feed Sensor Fault</h3>
<p>Code 6000 indicates the optical sensor monitoring the main paper drive shaft cannot detect rotation. For detailed roller diagnostics, see <a href="/canon/error-codes-alerts/canon-printer-error-6000-paper-jam-fix">resolving Canon line feed sensor error 6000</a>. Check that paper trays 1 and 2 are pushed completely flat against the chassis frame.</p>`
  },
  {
    slug: 'canon-printer-support-code-306',
    title: 'Canon Support Code 306: Communication Error Fix',
    seoTitle: 'Canon Support Code 306: Communication Error Fix',
    metaDescription: 'Fix Canon Support Code 306 communication errors on Windows and Mac. Official steps for printer queue clearing, USB/Wi-Fi connection resets, and CUPS drivers.',
    h1: 'Canon Printer Support Code 306: How to Fix Communication Errors',
    tags: 'Canon, Support Code 306, Communication Error, Offline, Mac, Windows, USB, Wi-Fi',
    faqs: [
      {
        question: 'Why does Support Code 306 appear only when printing large photos or multi-page documents?',
        answer: 'High-resolution photos and multi-page PDFs generate large spool files that take longer to transmit across the network. If your Wi-Fi connection experiences packet drop or router channel interference during the transmission, the print spooler reaches its timeout limit before the entire file transfers, triggering Code 306.'
      },
      {
        question: 'Can third-party firewall software cause Canon Support Code 306?',
        answer: 'Yes. Security suites frequently block Canon network broadcast ports, specifically UDP port 8611 (Canon IJ Network Discovery) and TCP port 9100. Adding an exception for Canon network services in your security suite restores communication.'
      },
      {
        question: 'Does Support Code 306 mean the Canon printer has a hardware failure?',
        answer: 'No. Support Code 306 is almost exclusively an environmental or software communication fault between the operating system print spooler and the printer interface. Hardware failure is rare and only suspected if the error persists across multiple distinct computers using new cables.'
      }
    ],
    content: `<h2>The Quick Answer</h2>
<p>Canon Support Code 306 indicates a computer-to-printer data transmission failure during a print job. The computer sends print spool data, but the printer fails to acknowledge receipt within the timeout threshold. Resolving it requires power-cycling the print spooler, checking network or USB handshake integrity, and resetting the printer driver connection.</p>

<h2>What Canon Support Code 306 Means</h2>
<p>In Canon's official technical documentation, Support Code 306 is designated as a communication timeout error. It appears when your computer's print subsystem initiates a job, opens an input/output channel to the printer, but does not receive an expected acknowledgment packet.</p>
<p>This code surfaces across Canon PIXMA, MAXIFY, and imagePROGRAF consumer and small-office models. It is particularly common on macOS systems running the Common Unix Printing System (CUPS) architecture, as well as Windows workstations experiencing spooler deadlocks.</p>

<h2>Step 1: Check Printer Hardware and Clear Pending Errors</h2>
<p>Before adjusting computer software, ensure the printer is ready to accept data.</p>
<ol>
  <li>Check the printer's LCD screen or status LEDs. If an alarm lamp is flashing or the screen displays an active paper jam or ink warning, the printer will reject incoming network print jobs.</li>
  <li>Cancel all current jobs directly on the printer by pressing the <strong>Stop</strong> button once.</li>
  <li>Turn the printer off using its physical <strong>Power</strong> button.</li>
  <li>Disconnect the AC power cord from the wall outlet, wait 60 seconds, reconnect the cable, and turn the printer back on.</li>
</ol>

<h2>Step 2: Verify Network and Cable Connections</h2>
<p>The physical or wireless data channel between the host computer and the printer must be stable.</p>

<h3>For USB Connections</h3>
<ul>
  <li>Disconnect the USB cable from both ends. Inspect the gold pins on the USB-B connector for lint, corrosion, or physical damage.</li>
  <li>Plug the cable directly into a motherboard USB port on the computer. Avoid unpowered USB hubs, extension cords, or monitor pass-through ports.</li>
  <li>Ensure the USB cable does not exceed 6 feet (2 meters) in length. Longer passive cables degrade high-speed USB signaling.</li>
</ul>

<h3>For Wi-Fi Connections</h3>
<ul>
  <li>Confirm your printer and computer are connected to the exact same Wi-Fi network name (SSID). Dual-band routers often isolate devices on a 5 GHz band from 2.4 GHz hardware.</li>
  <li>If your printer dropped off the wireless network, follow our <a href="/canon/connectivity-issues/canon-pixma-mg3620-offline">guide to reconnecting Canon PIXMA printers to Wi-Fi</a>.</li>
  <li>If needed, use our <a href="/canon/setup-installation/canon-printer-wireless-setup-wps">Canon printer wireless WPS setup guide</a> to reconnect without entering long passphrases.</li>
</ul>

<h2>Step 3: Resolve Operating System Print Spooler Conflicts</h2>
<p>If physical connections are intact, the communication failure resides in your operating system's print spooling queue.</p>

<h3>On Windows 10 and Windows 11</h3>
<ol>
  <li>Press <strong>Windows Key + R</strong>, type <code>services.msc</code>, and hit <strong>Enter</strong>.</li>
  <li>Scroll down to find the <strong>Print Spooler</strong> service. Right-click it and select <strong>Stop</strong>.</li>
  <li>Open File Explorer and navigate to <code>C:\\Windows\\System32\\spool\\PRINTERS</code>. Delete all files in this directory to purge stuck print jobs.</li>
  <li>Return to the Services window, right-click <strong>Print Spooler</strong>, and select <strong>Start</strong>.</li>
  <li>If the printer still shows offline, consult our steps to <a href="/canon/connectivity-issues/canon-printer-offline-windows-11">fix Canon printer offline status in Windows 11</a>.</li>
</ol>

<h3>On macOS (Apple CUPS System)</h3>
<ol>
  <li>Click the <strong>Apple menu</strong> &gt; <strong>System Settings</strong> (or <strong>System Preferences</strong>).</li>
  <li>Select <strong>Printers &amp; Scanners</strong>.</li>
  <li>Right-click (or Control-click) inside the printer list pane on the left, then select <strong>Reset Printing System...</strong>.</li>
  <li>Confirm the prompt. This clears all active queues and re-initializes the CUPS printing daemon.</li>
  <li>Click <strong>Add Printer, Scanner, or Fax...</strong>.</li>
  <li>Select your Canon printer. Under the <strong>Use</strong> dropdown, select <strong>AirPrint</strong> or the dedicated <strong>Canon IJ Printer</strong> driver rather than Secure AirPrint, then click <strong>Add</strong>.</li>
</ol>

<h2>Step 4: When to Contact Canon Support</h2>
<p>If Support Code 306 persists after completing all previous steps, test printing from a secondary device (such as a smartphone via Canon PRINT app). If no computer or mobile device can communicate with the printer via USB or Wi-Fi, the network interface controller on the printer's main logic board has failed and requires professional repair.</p>`
  },
  {
    slug: 'canon-maxify-gx-error-code',
    title: 'Canon MAXIFY GX Support Codes & Error 5200 Fix',
    seoTitle: 'Canon MAXIFY GX Support Codes & Error 5200 Fix',
    metaDescription: 'Official Canon MAXIFY GX support code list. Detailed fixes for GX7020, GX6020, GX5020, GX4020, and GX3020 errors, including 5200 printhead thermal faults.',
    h1: 'Canon MAXIFY GX Series Error Codes: Support Code List & Fixes',
    tags: 'Canon, MAXIFY GX, GX7020, GX6020, GX5020, GX4020, GX3020, Support Code, 5200, 1726',
    faqs: [
      {
        question: 'Why did Support Code 5200 appear immediately after refilling my MAXIFY GX ink tanks?',
        answer: 'Support Code 5200 is triggered by printhead thermal overload. If you allowed an ink tank to run dry before refilling it, air entered the internal ink delivery tubes. When the printhead fires without liquid ink present to dissipate heat, the thermal sensors immediately register an overheat condition. Performing an Ink Flush clears the air and restores ink cooling.'
      },
      {
        question: 'Which replacement maintenance cartridge does my Canon MAXIFY GX model use?',
        answer: 'The Canon MAXIFY GX6020 and GX7020 use the MC-G01 maintenance cartridge. The MAXIFY GX3020, GX4020, and GX5020 use the MC-G03 maintenance cartridge. The compact MAXIFY GX1020 and GX2020 use the MC-G05 maintenance cartridge.'
      },
      {
        question: 'Can I clean out and reuse an MC-G01 maintenance cartridge to clear Support Code 1726?',
        answer: 'No. Canon maintenance cartridges contain an integrated electronic memory chip (EEPROM) that counts absorption cycles. Even if you wash and dry the internal felt pads, the printer reads the exhausted counter on the chip and will not clear Support Code 1726 until a new cartridge with an unread chip is installed.'
      }
    ],
    content: `<h2>The Quick Answer</h2>
<p>Support codes on Canon MAXIFY GX MegaTank printers signal cassette feed jams, maintenance cartridge saturation, or printhead thermal protection events. Most errors stem from exhausted maintenance cartridges (code 1726) or printhead overheating (code 5200), which occurs when empty ink tanks cause nozzles to fire dry without liquid coolant.</p>

<h2>Canon MAXIFY GX Series Models Covered</h2>
<p>This troubleshooting guide applies to Canon's official commercial MegaTank lineup:</p>
<ul>
  <li><strong>Heavy-Duty Enterprise Series:</strong> MAXIFY GX7020, GX7021, GX6020, GX6021</li>
  <li><strong>Single-Function Production Units:</strong> MAXIFY GX5020</li>
  <li><strong>Medium-Volume Office Series:</strong> MAXIFY GX4020, GX3020</li>
  <li><strong>Compact Office Series:</strong> MAXIFY GX2020, GX1020</li>
</ul>

<h2>Official Canon MAXIFY GX Support Code Reference Table</h2>
<p>The following table details support codes documented in Canon's official MAXIFY GX online technical manuals.</p>

<table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
  <thead>
    <tr style="background-color: #f1f5f9; text-align: left;">
      <th style="padding: 10px; border: 1px solid #cbd5e1;">Support Code</th>
      <th style="padding: 10px; border: 1px solid #cbd5e1;">Screen Message</th>
      <th style="padding: 10px; border: 1px solid #cbd5e1;">Root Cause</th>
      <th style="padding: 10px; border: 1px solid #cbd5e1;">Official Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1007 / 1008</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">No paper in cassette.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Paper cassette 1 (1007) or cassette 2 (1008) is empty.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Load paper into designated cassette, adjust guides, push firmly.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1070</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Paper feed roller is dirty.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Dust accumulation on rubber pickup rollers preventing grip.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Run Roller Cleaning routine via Setup &gt; Maintenance.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1300</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Paper is jammed.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Sheet stalled in the internal paper transport channel.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Open front cover, remove paper slowly with both hands.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1303</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Paper jammed in rear cover.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Paper caught in the rear feed or duplex unit rollers.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Detach rear transport unit, extract jammed sheet, reattach securely.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1725</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Maintenance cartridge almost full.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Waste ink box capacity has reached roughly 90%.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Press OK on touchscreen to continue; prepare a replacement cartridge.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1726</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Maintenance cartridge is full.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Waste ink box is 100% full. Printing halted.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Replace maintenance cartridge (MC-G01 / MC-G03 / MC-G05).</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1890</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Protective material remains.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Orange packing tape or shipping bracket not removed during setup.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Open scanning unit, remove all orange tape and plastic clips.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>5100</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Printer error has occurred.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Printhead carriage blocked or optical encoder strip dirty.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Clear carriage path obstruction; gently clean encoder strip.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>5200</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Printer error has occurred.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Printhead thermal overload (running dry without ink).</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Refill tanks, perform 10-minute power drain, execute Ink Flush.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>6000</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Printer error has occurred.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Paper feed roller sensor obstructed or timing disk error.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Inspect paper feed gears, clear scraps, cycle power.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>B200 / B204</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Printer error has occurred.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Critical printhead voltage fault or logic board failure.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Turn off, disconnect power cord, contact Canon service center.</td>
    </tr>
  </tbody>
</table>

<h2>Resolving Support Code 5200 on MAXIFY GX Printers</h2>
<p>Unlike standard cartridge printers, MAXIFY GX models continuously draw ink from large internal reservoirs through silicone tubes into a permanent printhead. Liquid ink dissipates the intense thermal energy produced by the microscopic resistor nozzles during firing.</p>
<p>If you have questions regarding continuous supply faults, review our guide to <a href="/canon/ink-toner-issues/canon-maxify-gx-ink-not-detected">Canon MAXIFY GX ink detection and continuous supply troubleshooting</a>.</p>

<h3>Step-by-Step Code 5200 Resolution</h3>
<ol>
  <li><strong>Check Tank Ink Levels:</strong> Look directly at the clear front windows on all four ink tanks (Black, Cyan, Magenta, Yellow). If any tank has dropped below the lower limit dot, refill it immediately with genuine Canon GI-26 pigment ink. Never allow ink to fall below this safety marker.</li>
  <li><strong>Execute the 10-Minute Power Cool-Down:</strong> Turn off the printer using the front <strong>Power</strong> button. Disconnect the power cord from the electrical outlet. Wait a full 10 minutes to allow the printhead ceramic plate and thermistor sensors to cool back to ambient room temperature.</li>
  <li><strong>Inspect Ink Tubes for Air Gaps:</strong> Plug the printer back in and open the scanning unit. Inspect the transparent tubes leading to the printhead carriage. If you observe continuous air bubbles or empty sections, follow our instructions for <a href="/canon/ink-toner-issues/canon-megatank-not-printing-air-in-tubes">purging air bubbles and ink tube clogs in Canon MegaTank printers</a>.</li>
  <li><strong>Perform an Ink Flush:</strong> On the touchscreen, tap <strong>Setup (gear icon)</strong> &gt; <strong>Maintenance</strong> &gt; <strong>Ink Flush</strong>. Select all colors and confirm. This forces the purge pump to pull fresh ink through the delivery lines, restoring the liquid thermal buffer to the nozzles.</li>
  <li><strong>Verify Temperature Stabilization:</strong> Print a nozzle check pattern. If all lines print cleanly without gaps, code 5200 is resolved. If the error returns immediately upon heating up, consult our technical breakdown of <a href="/canon/error-codes-alerts/canon-printer-error-5200-overheating-fix">Canon error 5200 overheating diagnostics</a>.</li>
</ol>

<h2>Replacing the Maintenance Cartridge (Support Code 1726)</h2>
<p>Support Code 1726 halts all printing operations when the user-serviceable waste ink maintenance box is saturated.</p>
<ol>
  <li>Power on the printer and open the maintenance cartridge access door (located on the right side on GX6020/GX7020, or on the rear on GX3020/GX4020).</li>
  <li>Loosen the coin screw securing the cartridge retaining cover.</li>
  <li>Slide the saturated maintenance cartridge straight out. Place it inside the plastic disposal bag included with your new cartridge.</li>
  <li>Slide the new maintenance cartridge into the guide rails until it clicks securely into place.</li>
  <li>Replace the retaining cover and tighten the screw. The printer will recognize the new EEPROM chip immediately and clear Code 1726 without requiring any service tools.</li>
</ol>`
  }
];

async function main() {
  for (const art of articlesData) {
    console.log(`Processing draft update for: ${art.slug}`);

    const existing = await prisma.article.findUnique({
      where: { slug: art.slug },
      include: { revisions: { orderBy: { version: 'desc' }, take: 1 } }
    });

    if (!existing) {
      console.log(`❌ Article not found: ${art.slug}`);
      continue;
    }

    const nextVersion = (existing.revisions[0]?.version || 0) + 1;
    const faqsString = JSON.stringify(art.faqs);
    const wordCount = art.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

    // Update article as draft (preserving publishedAt, setting content, etc.)
    await prisma.article.update({
      where: { id: existing.id },
      data: {
        title: art.title,
        seoTitle: art.seoTitle,
        metaDescription: art.metaDescription,
        content: art.content,
        wordCount,
        status: 'draft',
        tags: art.tags,
        faqs: faqsString,
        excerpt: art.metaDescription,
      }
    });

    // Create a new Revision record (since this is a genuine content update)
    await prisma.revision.create({
      data: {
        articleId: existing.id,
        version: nextVersion,
        title: art.title,
        content: art.content,
        seoTitle: art.seoTitle,
        metaDescription: art.metaDescription,
        faqs: faqsString,
        excerpt: art.metaDescription,
        featuredImage: existing.featuredImage,
        featuredImageAlt: existing.featuredImageAlt,
        featuredImageTitle: existing.featuredImageTitle,
        featuredImageCaption: existing.featuredImageCaption,
      }
    });

    console.log(`✅ ${art.slug} saved as draft (version ${nextVersion}, words: ${wordCount})`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
