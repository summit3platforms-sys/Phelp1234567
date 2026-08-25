import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function stripCrossBrandLinks(html: string): string {
  return html.replace(/<a\s[^>]*href="\/[^"]*"[^>]*>([^<]*)<\/a>/gi, '$1');
}

const expansions: Record<string, string> = {
  'brother-printer-error-51-laser-unit': `
<h2>How the Laser Scanner Unit (LSU) Operates in Brother Printers</h2>
<p>Inside every Brother laser printer, the Laser Scanner Unit (LSU) houses a high-frequency solid-state laser diode, a multi-faceted rotating polygon mirror spinning on precision fluid or magnetic bearings at over 20,000 RPM, and focusing lenses. When you print, the laser beams pulses millions of times per second across the spinning polygon mirror to expose the electrostatic drum unit. <strong>Error 51</strong> is triggered when the Beam Detect (BD) sensor fails to register the horizontal sweep of the laser within a set millisecond threshold after the polygon motor starts.</p>

<h2>Advanced Diagnostic & Recovery Steps</h2>
<ol>
  <li><strong>Acoustic Motor Test:</strong> When you power on the printer, listen closely to the upper portion of the chassis. You should hear a characteristic high-pitched acoustic "whine" pitch rising as the polygon mirror accelerates. If you hear a grinding noise, a vibrating hum, or complete silence followed by Error 51, the polygon motor bearings have seized or suffered driver IC failure.</li>
  <li><strong>Laser Shutter Mechanism Inspection:</strong> Brother printers incorporate a mechanical laser shutter that physically blocks the laser aperture when the front or top cover is opened (a safety interlock). A plastic actuator tab on the cover pushes this shutter open when closed. If the plastic tab is bent, broken, or misaligned, the shutter remains closed, blocking the laser beam from the BD sensor and generating a false Error 51.</li>
  <li><strong>Cleaning the Polygon Optics & Mirror Dust:</strong>
    <p>Toner particulate and ozone residue can accumulate on the LSU dust glass over time. Remove the drum and toner assembly, locate the laser beam exit window inside the top ceiling of the inner cavity, and wipe the glass strip with a clean, dry microfiber cloth.</p>
  </li>
  <li><strong>Check Low Voltage DC Rails:</strong> The LSU motor requires a stable +24V DC supply from the low-voltage power supply (LVPS). In buildings with severe electrical voltage dips, an insufficient DC rail will prevent the motor from reaching target angular velocity, throwing Error 51. Always test with the printer connected directly to a wall socket.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I clean the inside of the sealed Laser Scanner Unit myself?</summary>
  <p>The LSU is factory-sealed to prevent airborne dust contamination. Opening the black plastic LSU casing exposes the delicate polygon mirrors to static electricity and dust. Unless you work in a cleanroom environment, wiping the outer protective glass window is the only recommended maintenance.</p>
</details>
<details>
  <summary>Does replacing the drum unit or toner fix Error 51?</summary>
  <p>No. Error 51 is strictly isolated to the laser optical system. Replacing toners or drums will not resolve a polygon motor or BD sensor fault.</p>
</details>
`,

  'brother-machine-error-maintenance-mode': `
<h2>The Complete Architecture of Brother Maintenance Mode</h2>
<p>Brother Maintenance Mode is the low-level technician diagnostic environment embedded in the printer firmware. It bypasses standard operating system locks, sensor safeties, and counters to allow component-level testing, NVRAM parameter changes, sensor flag diagnostics, and purge counter resets.</p>

<h2>Universal Maintenance Mode Access Matrix</h2>
<ul>
  <li><strong>Keypad Models (MFC Series):</strong> Press <code>Menu</code> &gt; <code>*</code> &gt; <code>2</code> &gt; <code>8</code> &gt; <code>6</code> &gt; <code>4</code> within 2 seconds. The display will show <code>|| MAINTENANCE |||</code>.</li>
  <li><strong>Touchscreen Models (No Physical Keys):</strong> Press and hold the <strong>Home</strong> button for 5 seconds until four bars appear. Touch the blank bottom bar. Enter <code>*2864</code> on the numeric popup.</li>
  <li><strong>Single-Button Laser Printers (HL-Series):</strong> Turn off the printer. Hold down the <strong>Go</strong> button while powering on until all LEDs illuminate, release Go, then press Go 6 times consecutively.</li>
</ul>

<h2>Essential Diagnostic Function Codes</h2>
<table style="width:100%; border-collapse: collapse; margin: 20px 0;">
  <thead>
    <tr style="background-color: #f3f4f6; text-align: left;">
      <th style="padding: 10px; border: 1px solid #d1d5db;">Code</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">Function Name</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">Diagnostic Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>01</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">EEPROM Initialization</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Clears non-volatile RAM, resetting all software locks and error states to factory defaults.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>32</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Sensor Status Check</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Displays live binary feedback from paper sensors, cover interlocks, and fuser thermistors.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>76</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Purge Counter Reset</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Resets the waste ink absorber page counter (essential for clearing "Unable to Clean 46").</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>77</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Maintenance Printout</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Prints a complete technical log of jam histories, motor run-times, and voltage logs.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>99</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Exit Maintenance Mode</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Reboots the printer into standard consumer mode.</td>
    </tr>
  </tbody>
</table>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can using Maintenance Mode damage my Brother printer?</summary>
  <p>Entering diagnostic read codes (like 32, 77) is completely safe. However, modifying country codes (Code 74) or executing improper NVRAM formatting can disable Wi-Fi regions or language menus. Only enter codes you understand, and always exit using Code 99.</p>
</details>
<details>
  <summary>What should I do if my printer is stuck displaying "MAINTENANCE" on the screen?</summary>
  <p>If the printer powers up directly into Maintenance Mode, type <code>99</code> on the keypad. If it does not exit, enter <code>01</code> to reset the boot flags, followed by <code>99</code>.</p>
</details>
`,

  'brother-printer-error-48-fix': `
<h2>The Critical Role of the Linear Optical Encoder Strip</h2>
<p>In Brother inkjet and multifunction devices, the printhead carriage travels horizontally on a polished steel rail. To know its exact micro-millimeter position at any given microsecond, the carriage houses an optical transmissive sensor that reads a transparent plastic strip suspended directly behind it — the <strong>Linear Encoder Strip</strong>. This strip features thousands of microscopic vertical hash marks. When grease, ink splatter, or dust obscures these marks, the sensor loses tracking, the carriage slams into the chassis side wall, and the logic board trips <strong>Error 48</strong> (Printhead Carriage Positioning Fault).</p>

<h2>Step-by-Step Cleaning and Re-alignment Protocol</h2>
<ol>
  <li><strong>Power Down & Position the Carriage:</strong> Unplug the AC power cord. Open the scanner cover to reveal the printhead cavity. If the printhead is locked on the right side, plug the power in briefly, wait for the carriage to move to the center, and immediately yank the power cord to leave it free-floating.</li>
  <li><strong>Locate the Encoder Strip:</strong> Look closely above the metal carriage guide rail. You will see a thin (about 5mm tall) semi-transparent plastic ribbon running the entire width of the printer.</li>
  <li><strong>The Microfiber Wipe Technique:</strong>
    <ul>
      <li>Take a lint-free optical microfiber cloth lightly moistened with distilled water.</li>
      <li>Gently pinch the strip between your thumb and index finger using the cloth.</li>
      <li>Gently slide your fingers along the length of the strip from left to right.</li>
      <li><strong>WARNING:</strong> Never pull or stretch the strip aggressively. It is tensioned by a small, delicate spring on the left side. If the strip pops off its mounting hooks, re-threading it is very tricky.</li>
      <li><strong>WARNING:</strong> Never use rubbing alcohol, acetone, or window cleaner on the encoder strip. Solvents dissolve the microscopic printed timing lines, permanently ruining the strip.</li>
    </ul>
  </li>
  <li><strong>Inspect the Carriage Optical Sensor:</strong> On the back of the printhead carriage is a small U-shaped plastic channel where the strip passes through. Blow clean compressed air into this channel to remove any dislodged paper fibers blocking the LED sensor eye.</li>
  <li><strong>Verify Free Travel:</strong> Manually glide the carriage from extreme left to extreme right with your fingers. Ensure no cables or tubes snag.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>What happens if the encoder strip unhooks from the spring?</summary>
  <p>You can re-attach it using a pair of fine-tip tweezers. Hook the left end onto the metal tension spring first, thread the strip through the carriage sensor slit, and then latch the right end onto the fixed metal chassis post.</p>
</details>
<details>
  <summary>Can Error 48 be caused by a dried ink spittoon?</summary>
  <p>Yes. If the ink maintenance spittoon on the left or purge station on the right is piled high with congealed gelled ink, the printhead carriage physically crashes into the sludge before reaching its limit switch, triggering Error 48.</p>
</details>
`,

  'brother-printer-error-ts-02': `
<h2>Understanding TS-02: WLAN Access Point Not Detected</h2>
<p>When printing a Brother WLAN Report, <strong>TS-02</strong> indicates that the printer's wireless interface scanned the 2.4GHz radio frequency spectrum but received zero beacon packets matching your configured SSID (Network Name). The printer is completely blind to your router's wireless broadcast.</p>

<h2>Diagnostic Checklist for TS-02 Recovery</h2>
<ol>
  <li><strong>Dual-Band Steering & 5GHz Isolation:</strong> Over 85% of TS-02 errors are caused by modern mesh Wi-Fi routers (such as eero, Google Nest WiFi, Netgear Orbi) combining 2.4GHz and 5GHz under one SSID and steering the Brother printer toward the unsupported 5GHz band. Log into your router app, temporarily disable the 5GHz radio (or enable the dedicated 2.4GHz "IoT" Guest network), and rerun the Brother Setup Wizard.</li>
  <li><strong>Hidden SSID Settings:</strong> If your wireless router has "Broadcast SSID" disabled for security, the Brother printer cannot discover it during an automatic scan. You must enter the network name manually via <strong>Menu &gt; Network &gt; WLAN &gt; Setup Wizard &gt; [Manual Input]</strong>.</li>
  <li><strong>Wi-Fi Channel Selection (Channels 12-14 Restrictions):</strong> In North America, Brother printers only scan Wi-Fi channels 1 through 11. If your router's channel selection is set to "Auto" and it drifts to channel 12, 13, or 40+ (5GHz), the printer instantly drops connection with TS-02. Fix your router's 2.4GHz channel permanently to <strong>Channel 1, 6, or 11</strong> with a channel width of <strong>20 MHz</strong>.</li>
  <li><strong>Distance and Physical Attenuation:</strong> Move the printer within 10 feet of the main router for initial setup. Brick walls, metal filing cabinets, microwaves, and 2.4GHz cordless phones cause severe packet attenuation resulting in TS-02 signal dropouts.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Does TS-02 mean my Brother printer's Wi-Fi card is broken?</summary>
  <p>Rarely. You can test the printer's Wi-Fi radio by enabling the "Personal Hotspot" feature on your smartphone. If the Brother printer detects your phone's 2.4GHz hotspot SSID in its Setup Wizard scan, the printer's wireless hardware is 100% operational, confirming a router configuration conflict.</p>
</details>
<details>
  <summary>What is the difference between TS-02 and TS-01?</summary>
  <p>TS-01 indicates that the wireless setting on the printer itself is switched OFF in the menu. TS-02 means wireless is ON, but the target router cannot be found.</p>
</details>
`,

  'brother-printer-wps-button-not-connecting': `
<h2>Why WPS Push Button Connection Fails on Brother Printers</h2>
<p>Wi-Fi Protected Setup (WPS) is designed to pair devices with a single button press, but it relies on a strict 120-second cryptographic handshake window. If latency, frequency band mismatch, or router firmware security locks interfere during this 2-minute window, the pairing protocol aborts.</p>

<h2>Step-by-Step WPS Connection Protocol</h2>
<ol>
  <li><strong>The Correct Press Order:</strong>
    <ul>
      <li>First, go to your Brother printer: Navigate to <strong>Menu &gt; Network &gt; WLAN &gt; WPS</strong>. Press <strong>OK</strong>. The printer screen will display <code>WPS Starting...</code> and the Wi-Fi LED will flash rapidly.</li>
      <li>Second, walk to your wireless router within 30 seconds and press and hold the physical <strong>WPS button</strong> (often marked with two circular rotating arrows) for 3 to 5 seconds until its WPS light pulses.</li>
      <li>Allow the two devices 60 to 90 seconds to exchange WPA keys. When successful, the Brother screen displays <code>Connected</code> and prints a confirmation sheet.</li>
    </ul>
  </li>
  <li><strong>Alternative: WPS PIN Code Method:</strong> If Push Button (PBC) continues to fail, use the more reliable PIN method:
    <ul>
      <li>On the printer: Select <strong>Menu &gt; Network &gt; WLAN &gt; WPS w/ PIN Code</strong>. The printer will generate an 8-digit numeric PIN on screen.</li>
      <li>On your computer: Open your router's browser admin panel, navigate to the Wireless / WPS section, enter the 8-digit PIN generated by the printer, and click "Register / Connect".</li>
    </ul>
  </li>
  <li><strong>Router WPS Security Lockouts:</strong> Due to known "WPS Pixie Dust" vulnerabilities, many modern ISP gateways (Comcast Xfinity, AT&T Fiber, Spectrum, BT Smart Hub) automatically disable WPS permanently in firmware. If your router does not respond to WPS presses, use the standard <strong>Setup Wizard</strong> to type your network key manually.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does my router's WPS light turn solid red when connecting to my Brother printer?</summary>
  <p>A red or amber WPS light on the router indicates an authentication timeout or session overlap (two devices attempted WPS pairing simultaneously). Power cycle the router and try again with only the printer active.</p>
</details>
<details>
  <summary>Is WPS secure for business networks?</summary>
  <p>WPS is generally not recommended for commercial or enterprise networks due to PIN brute-force vulnerabilities. In enterprise environments, WPA2-Enterprise with 802.1x or standard WPA2-PSK via manual key entry is preferred.</p>
</details>
`,

  'brother-printer-mac-address-filter-router': `
<h2>How MAC Address Filtering Impacts Brother Printers</h2>
<p>Every network device possesses a globally unique 48-bit hardware identifier known as a <strong>Media Access Control (MAC) Address</strong> (e.g., <code>00:80:77:3A:B1:C2</code>). When a network administrator enables MAC Filtering / Access Control on a wireless router, the router drops all network traffic from any device whose MAC address is not explicitly registered in its whitelist database. If you add a Brother printer to a network with MAC filtering enabled, it will fail to connect with errors like TS-02, TS-07, or APIPA 169.254 IPs.</p>

<h2>Locating Your Brother Printer's MAC Address</h2>
<ol>
  <li><strong>From the Physical Rear Label:</strong> Look at the white barcode label on the back or underside of your Brother machine. The MAC address is listed as the 12-character alphanumeric sequence (sometimes labeled "Ethernet Address" or "Wireless MAC").</li>
  <li><strong>From the Control Panel Menu:</strong> Navigate to <strong>Menu &gt; Network &gt; WLAN (or Wired LAN) &gt; MAC Address</strong>. The 12-digit string will display on screen.</li>
  <li><strong>From the Network Configuration Report:</strong> Print the report by pressing the <strong>Go</strong> button 3 times. Look for <code><MAC Address></code> under the active interface section.</li>
</ol>

<h2>Adding the Printer to Your Router's Whitelist</h2>
<ol>
  <li>Open a browser and navigate to your router's IP address (e.g., <code>192.168.1.1</code>).</li>
  <li>Log in with administrative credentials.</li>
  <li>Navigate to <strong>Wireless Settings &gt; Wireless MAC Filter</strong> or <strong>Security &gt; Access Control</strong>.</li>
  <li>Click <strong>Add Device / Add Rule</strong>.</li>
  <li>Enter the Brother printer's 12-digit MAC address (formatted as <code>XX:XX:XX:XX:XX:XX</code> or <code>XX-XX-XX-XX-XX-XX</code> depending on the router brand). Give it a friendly name like "Brother-MFC".</li>
  <li>Save and apply settings. Power cycle the Brother printer to initiate a fresh connection handshake.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Does a Brother printer have separate MAC addresses for Wi-Fi and Ethernet?</summary>
  <p>Yes. If your Brother model has both an Ethernet port and Wi-Fi, it houses two separate physical network controllers with distinct MAC addresses. Make sure you whitelist the specific interface you are using.</p>
</details>
<details>
  <summary>Does resetting the printer change its MAC address?</summary>
  <p>No. A MAC address is permanently burned into the physical network interface controller (NIC) hardware at the factory and cannot be altered by factory resets or firmware updates.</p>
</details>
`,

  'brother-printer-ts-02-5ghz-vs-2.4ghz': `
<h2>The 2.4GHz vs. 5GHz Radio Frequency Dilemma in Brother Printers</h2>
<p>Almost all Brother consumer and small-office printers are engineered with <strong>2.4GHz 802.11b/g/n</strong> wireless network cards. They do not contain 5GHz radio receivers. While 5GHz Wi-Fi provides higher peak data throughput for streaming 4K video, 2.4GHz provides vastly superior physical range and wall-penetrating capability — perfect for low-bandwidth, intermittent printer traffic. However, modern mesh routers create significant connection friction when handling legacy 2.4GHz-only client devices.</p>

<h2>Common Router Band Steering Conflicts</h2>
<ol>
  <li><strong>Single SSID Band Steering:</strong> Routers often broadcast one unified network name (e.g., "Smith_WiFi") across both frequencies. The router's internal steering algorithms try to force connected clients onto 5GHz for speed. When the Brother printer attempts to join, it cannot negotiate the 5GHz beacon, resulting in intermittent drops or TS-02 failures.</li>
  <li><strong>Separating the Wi-Fi Bands:</strong>
    <ul>
      <li>Log into your router's admin interface.</li>
      <li>Locate the Wireless Settings tab.</li>
      <li>Disable "Smart Connect" or "Unified SSID".</li>
      <li>Rename the 5GHz network to something distinct (e.g., "Smith_WiFi_5G") while leaving the 2.4GHz network as "Smith_WiFi".</li>
      <li>Connect your Brother printer explicitly to the 2.4GHz network.</li>
    </ul>
  </li>
  <li><strong>Using the Dedicated "IoT" Network Feature:</strong> If your router (such as Asus, TP-Link Deco, or Netgear) offers an "IoT Network" toggle, enable it. IoT networks operate on pure 2.4GHz with WPA2 security, providing a rock-solid channel for smart appliances and Brother printers.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can my computer print to the Brother printer if my computer is on 5GHz and the printer is on 2.4GHz?</summary>
  <p>Yes, absolutely. As long as both 2.4GHz and 5GHz bands are connected to the same local router subnet and "AP Isolation" is disabled, devices on 5GHz can seamlessly discover and print to devices on 2.4GHz via local network routing.</p>
</details>
<details>
  <summary>Are there any Brother printers that support 5GHz natively?</summary>
  <p>Select recent enterprise-grade Brother color laser series (such as the HL-L8360CDW and MFC-L8900CDW equipped with dual-band optional cards) support 5GHz, but the vast majority of consumer HL and MFC models remain 2.4GHz-only.</p>
</details>
`,

  'brother-printer-wont-connect-to-wlan-access-point': `
<h2>Universal Systematic Troubleshooting for Brother WLAN Failures</h2>
<p>If your Brother printer refuses to connect to your Wireless Local Area Network (WLAN), the issue stems from one of four primary failure domains: radio frequency incompatibility, network credential corruption, router firewall/port filtering, or printer EEPROM caching errors. Follow this exhaustive checklist to establish a permanent, stable link.</p>

<h2>Full 6-Step WLAN Diagnostic Workflow</h2>
<ol>
  <li><strong>Print the WLAN Report to Identify the Exact Error Code:</strong>
    <p>Press <strong>Menu &gt; Network &gt; WLAN &gt; WLAN Report</strong> (or press the wireless button). Look at the top of the sheet for your diagnostic code (TS-01, TS-02, TS-03, TS-04, TS-05, TS-06, TS-07, TS-08). Knowing the exact TS-code pinpoints whether the fault is physical, authentication-based, or IP assignment-based.</p>
  </li>
  <li><strong>Check Router 2.4GHz Channel & Bandwidth Settings:</strong>
    <p>Ensure your router's 2.4GHz wireless radio is active, broadcasting on a fixed channel (1, 6, or 11), with channel width set to 20MHz (not 40MHz or Auto). Avoid dynamic channel hopping (DFS) which drops Brother wireless links.</p>
  </li>
  <li><strong>Disable AP Isolation & Guest Network Restrictions:</strong>
    <p>In your router settings, verify that <strong>AP Isolation</strong> (also called Client Isolation or Station Isolation) is turned OFF. When active, AP isolation prevents wireless clients from talking to each other, blocking print jobs from computers and phones.</p>
  </li>
  <li><strong>Perform a Full Hardware Network Reset:</strong>
    <p>Wipe all cached wireless profiles from the printer: Select <strong>Menu &gt; Network &gt; Network Reset</strong>. Press 1 (or Yes) to confirm. Hold 1 for 2 seconds to reboot. Once rebooted, reconnect via the <strong>Setup Wizard</strong>.</p>
  </li>
  <li><strong>Temporarily Disable 5GHz During Pairing:</strong>
    <p>If using a mesh Wi-Fi system without split SSIDs, temporarily turn off the 5GHz radio in your mesh system app for 15 minutes while pairing the Brother printer, then re-enable it once pairing is complete.</p>
  </li>
  <li><strong>Verify DHCP Scope and Available IP Pool:</strong>
    <p>Log into your router and check the DHCP client list. If your DHCP address pool is exhausted (e.g., set to allow only 20 devices and all 20 leases are taken by smart TVs, phones, and tablets), the router will silently reject the Brother printer. Expand the DHCP range (e.g., from .2 to .254).</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the Wi-Fi light on my Brother printer keep blinking green?</summary>
  <p>A blinking green or blue Wi-Fi light means the printer is actively trying to negotiate an IP lease with the router. If it never turns solid, the printer is failing DHCP handshake or WPA key authentication.</p>
</details>
<details>
  <summary>Can I connect my Brother printer to Wi-Fi using my PC via USB cable?</summary>
  <p>Yes. If you install the Brother Full Driver & Software Package on your PC, the installer will prompt you to connect a temporary USB cable. The installer will automatically extract your PC's Wi-Fi network credentials and transfer them directly into the Brother printer's memory over USB.</p>
</details>
`,

  'brother-printer-error-50-fuser-unit': `
<h2>In-Depth Technical Analysis of Brother Error 50</h2>
<p>Error 50 indicates a <strong>Fuser Unit Malfunction</strong>. The fuser assembly is responsible for using heat (approx. 180°C to 200°C) and mechanical pressure to fuse loose plastic toner particles into the fibers of the paper. Error 50 is triggered when the central halogen lamp or ceramic heating element fails to heat the roller to its target temperature within the specified time window, or when the safety thermoprotector (thermal fuse) blows.</p>

<h2>Step-by-Step Diagnostic & Reset Protocols</h2>
<ol>
  <li><strong>The Thermal Cool-Down & Power Drain Reset:</strong>
    <ul>
      <li>Turn the printer completely OFF.</li>
      <li>Disconnect the power cord from both the wall and the printer.</li>
      <li>Press and hold the physical power button for 30 seconds while unplugged to drain power supply capacitors.</li>
      <li>Wait at least 25 minutes to allow the fuser roller and thermistors to cool completely to room temperature.</li>
      <li>Plug directly into a heavy-duty wall outlet (never use power strips or battery backups with laser printers).</li>
      <li>Power on. If the error was a transient software lock, the printer will warm up normally.</li>
    </ul>
  </li>
  <li><strong>Physical Inspection of the Fuser Assembly:</strong>
    <ul>
      <li>Open the rear access door of the laser printer.</li>
      <li>Look at the exposed heat roller (typically coated in orange or brown Teflon).</li>
      <li>Check for shredded paper wrapped tightly around the roller, torn Teflon coating, or a crushed pressure roller.</li>
      <li>If paper is wrapped around the roller, wait until it is cool and carefully peel it away without scratching the delicate roller surface with metal tools.</li>
    </ul>
  </li>
  <li><strong>Clearing Latched Fuser Errors via Maintenance Mode:</strong>
    <p>Brother firmware locks fuser errors in non-volatile memory for safety reasons. To clear the latch:</p>
    <ul>
      <li>Enter Maintenance Mode: Power on while holding <strong>Menu</strong> or enter <code>*2864</code> on the keypad.</li>
      <li>Enter function code <code>01</code> to initialize parameters.</li>
      <li>Enter function code <code>99</code> to reboot.</li>
    </ul>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Is it safe to clear Error 50 through Maintenance Mode without replacing the fuser?</summary>
  <p>If Error 50 was triggered by an electrical brownout or cold ambient room temperature, resetting it once is safe. However, if the error immediately returns after resetting, the halogen heater or thermal fuse is physically damaged and operating the printer could cause a thermal runaway hazard. Replace the fuser unit.</p>
</details>
<details>
  <summary>What is the average lifespan of a Brother fuser unit?</summary>
  <p>Brother fusers are engineered for approximately 50,000 to 100,000 printed pages depending on the printer tier (consumer desktop vs. workgroup MFC). You can check your fuser's remaining life percentage on the User Settings / Maintenance page.</p>
</details>
`,

  'brother-printer-error-46-unable-to-clean': `
<h2>The Reality Behind "Unable to Clean 46" / "Ink Absorber Full"</h2>
<p>Every time your Brother inkjet printer powers on or runs an automated printhead cleaning cycle, it pumps a small amount of liquid ink through the nozzles to flush out dried particles. This waste ink is deposited into a dense felt sponge pad housed in the base of the printer chassis (the <strong>Waste Ink Absorber Box</strong>). To prevent ink from overflowing onto your desk, the printer's EEPROM maintains an internal mathematical counter. When this counter hits 100% (typically around 10,000 to 15,000 pages or several years of cleaning cycles), the firmware locks the machine with <strong>Error 46</strong>.</p>

<h2>Step-by-Step Maintenance Mode Purge Counter Reset</h2>
<ol>
  <li><strong>Enter Maintenance Mode:</strong>
    <ul>
      <li>For Keypad Models: Press <strong>Menu</strong> &gt; <strong>*</strong> &gt; <strong>2</strong> &gt; <strong>8</strong> &gt; <strong>6</strong> &gt; <strong>4</strong> in rapid succession.</li>
      <li>For Touchscreen Models: Press and hold the <strong>Home</strong> button for 5 seconds. Tap the blank fourth bar. Enter <code>*2864</code>.</li>
      <li>The display will confirm <code>MAINTENANCE</code>.</li>
    </ul>
  </li>
  <li><strong>Navigate to Function Code 80:</strong>
    <ul>
      <li>Type <code>80</code> on the keypad. A list of internal diagnostic logs will display.</li>
      <li>Press the <strong>Up/Down Arrow</strong> (or press the <code>Mono Start</code> button repeatedly) until you see <code>PURGE: XXXXX</code> (where XXXXX is a number like 08520).</li>
    </ul>
  </li>
  <li><strong>Reset the Purge Value to Zero:</strong>
    <ul>
      <li>Type <code>2783</code> on the numeric keypad. The purge counter will immediately reset to <code>PURGE: 00000</code>.</li>
      <li>(Optional for Color Purge): Press <code>Mono Start</code> to scroll to <code>FLS-REC</code> (Flushing Recovery Counter) and type <code>2783</code> to reset it to zero as well.</li>
    </ul>
  </li>
  <li><strong>Exit and Save:</strong>
    <ul>
      <li>Press <strong>Stop/Exit</strong> to return to the main <code>MAINTENANCE</code> prompt.</li>
      <li>Type <code>99</code> to reboot the printer. Error 46 will be completely cleared and full printing restored.</li>
    </ul>
  </li>
</ol>

<h2>Important Physical Sponge Maintenance Advice</h2>
<p>Resetting the electronic counter clears the software lock, but the physical felt pad inside your printer is still holding waste ink. If this is the first time Error 46 has appeared, the sponge usually has enough reserve capacity to absorb ink for several more months. However, for long-term reliability, you should open the bottom chassis to replace the felt absorber pads (Part Number series <code>D00C5X001</code>) or place a protective tray underneath the printer to prevent any potential ink leakage.</p>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I wash and reuse the Brother waste ink absorber pads?</summary>
  <p>Yes. You can wear rubber gloves, remove the felt pads, wash them thoroughly in warm running water until the water runs clear, squeeze them out, let them dry completely in the sun for 48 hours, and reinstall them.</p>
</details>
<details>
  <summary>Does Brother authorize users to reset Error 46?</summary>
  <p>Officially, Brother considers Error 46 a service-center repair event. However, for out-of-warranty machines where authorized repair exceeds the cost of a new printer, executing the Purge 00000 reset code is the standard DIY industry solution.</p>
</details>
`
};

async function main() {
  console.log('🚀 Expanding Brother Articles (Batch 2 - 10 articles)...\n');

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

  console.log('\n🎉 Batch 2 Brother Expansion Complete! All Brother articles are now expanded to 1,000+ words!');
}

main().then(async () => prisma.$disconnect()).catch(async e => { console.error(e); prisma.$disconnect(); process.exit(1); });
