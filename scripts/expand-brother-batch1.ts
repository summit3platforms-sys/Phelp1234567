import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function stripCrossBrandLinks(html: string): string {
  return html.replace(/<a\s[^>]*href="\/[^"]*"[^>]*>([^<]*)<\/a>/gi, '$1');
}

const expansions: Record<string, string> = {
  'brother-printer-network-configuration-page-how-to-print': `
<h2>How to Decode the Network Configuration Report</h2>
<p>Once your Brother printer spits out the 2-page or 3-page Network Configuration Report, don't just stare at the wall of technical jargon. Here are the five mission-critical fields you must locate:</p>

<ol>
  <li><strong><Node Name> or <Host Name>:</strong> This is the internal network name of your printer (typically formatted like <code>BRN30055C82A1B4</code>). You can use this hostname in your browser or ping utilities instead of an IP address.</li>
  <li><strong>IP Address:</strong> Look under the <code><IP Settings></code> or <code><TCP/IP></code> section. If you see <code>169.254.x.x</code>, this is an APIPA (Automatic Private IP Addressing) address, meaning your Brother printer failed to receive an IP from your router's DHCP pool. If it reads <code>0.0.0.0</code>, the network interface is completely disconnected.</li>
  <li><strong>Subnet Mask & Default Gateway:</strong> The Default Gateway must match your router's local IP address (usually <code>192.168.1.1</code> or <code>192.168.0.1</code>). If the gateway is blank or wrong, your printer cannot communicate across subnets or receive cloud print jobs.</li>
  <li><strong>Wireless Link Status & Signal Strength:</strong> Under the <code><Wireless></code> section, check <strong>Link Status</strong> (must say <code>Active</code> or <code>OK</code>) and <strong>Signal Strength</strong>. If signal strength is below 40% or marked <code>Weak</code>, intermittent offline drops will occur regardless of your PC settings.</li>
  <li><strong>MAC Address (Ethernet / Wireless):</strong> A 12-digit hexadecimal identifier (e.g., <code>30:05:5C:82:A1:B4</code>). This is required if you want to configure a DHCP reservation on your router or if your network uses MAC address filtering.</li>
</ol>

<h2>Assigning a Static IP Using the Configuration Data</h2>
<p>Dynamic DHCP leases frequently expire, causing Windows and macOS to report the Brother printer as "Offline" because the printer silently hopped to a new IP address. Use the data from your printed report to lock in a permanent Static IP:</p>

<ol>
  <li>Open a web browser on a computer connected to the same network.</li>
  <li>Type the printer's current <strong>IP Address</strong> into the URL bar and press Enter to open the Brother Embedded Web Server (EWS).</li>
  <li>Log in with the administrator password (on modern Brother machines, this is printed on the serial number label on the back of the chassis).</li>
  <li>Navigate to the <strong>Administrator</strong> or <strong>Network</strong> tab &gt; <strong>Wireless</strong> or <strong>Wired</strong> &gt; <strong>TCP/IP</strong>.</li>
  <li>Change the <strong>Boot Method</strong> or <strong>IP Config</strong> from <code>Auto / DHCP</code> to <code>Static</code>.</li>
  <li>Enter an IP address outside your router's active DHCP range (e.g., if DHCP gives out .2 to .100, set the printer to <code>.210</code>). Copy the Subnet Mask, Gateway, and DNS servers directly from your printed report.</li>
  <li>Click <strong>Submit</strong> to save. Your printer will never change IP addresses again.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why is my Brother printer's IP address showing 169.254.x.x on the report?</summary>
  <p>An IP starting with 169.254 indicates an APIPA self-assigned address. The printer's physical network adapter is functioning, but your router's DHCP server did not respond to its request. Check router connectivity, restart the router, or assign a manual static IP within your router's actual subnet.</p>
</details>
<details>
  <summary>How many pages is a Brother Network Configuration report?</summary>
  <p>Depending on the model (basic mono laser vs. multifunction color MFC), the report is between 1 and 3 pages. Page 1 contains core TCP/IP and wireless status, while subsequent pages detail security protocols, IPv6 tables, and active ports.</p>
</details>
<details>
  <summary>Can I print the network configuration sheet if my touchscreen is unresponsive?</summary>
  <p>Yes. On most Brother machines without screens or with locked screens, pressing the physical <strong>Go</strong> button 3 times consecutively within 2 seconds will force the printer engine to print the configuration and status sheets directly from internal ROM.</p>
</details>
`,

  'brother-mfc-scanner-error-e52': `
<h2>Understanding the Mechanical Anatomy of Brother MFC Error E52</h2>
<p>Error E52 specifically indicates that the scanner unit's optical sensor carriage failed to detect its reference position or that the flatbed home sensor did not trip during the initial boot calibration. When you power on a Brother MFC, the scanner head moves slightly to find a white calibration strip located beneath the glass border. If it encounters physical resistance, optical obstruction, or electrical failure, the motherboard halts the machine with E52.</p>

<h2>Detailed Step-by-Step Recovery Workflow</h2>
<ol>
  <li><strong>Inspect the White Calibration Reference Strip:</strong> Lift the scanner lid. Look at the very left edge of the glass bed (underneath the plastic bezel). You will see a narrow white strip. If dirt, correction fluid (Wite-Out), or glass adhesive haze has clouded this strip, the optical sensor cannot calibrate white balance and triggers E52. Clean the glass thoroughly with a microfiber cloth and 99% isopropyl alcohol.</li>
  <li><strong>Check the Scanner Carriage Lock Switch:</strong> Many Brother MFC machines have a physical mechanical slide lock on the bottom or side of the scanner flatbed (designed for transport). If this switch is in the "Locked" padlock position, the scanner motor cannot drive the optical carriage, causing an instant motor stall and E52 alarm.</li>
  <li><strong>Inspect the Scanner Drive Belt & Rail:</strong> Open the top scanner housing if accessible. Ensure the rubber ribbed timing belt has not slipped off the stepper motor cog. Apply a drop of synthetic silicone lubricant (never WD-40) to the metallic guide rod if the carriage is sticking.</li>
  <li><strong>Reseat the Flat Flexible Cable (FFC):</strong> A very common cause of E52 following years of lifting and lowering the scanner bed is ribbon cable fatigue. The flat white ribbon cable connecting the scanner assembly to the main logic board can become unseated or develop micro-fractures. Reseat both ends of the ribbon cable firmly in their ZIF (Zero Insertion Force) sockets.</li>
</ol>

<h2>Entering Brother Maintenance Mode to Clear Scanner Cache</h2>
<ol>
  <li>On touchscreen models, press and hold the <strong>Home</strong> button for 5 seconds until the display changes to the diagnostic screen.</li>
  <li>Touch the blank rectangle at the bottom of the screen.</li>
  <li>Enter <code>*2864</code> on the keypad. The screen will flash "MAINTENANCE".</li>
  <li>Type <code>01</code> to execute parameter initialization, or type <code>55</code> to run a dedicated scanner motor sweep test.</li>
  <li>Type <code>99</code> to exit Maintenance Mode and reboot the MFC back into normal operating mode.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I still print if my Brother MFC has an E52 scanner error?</summary>
  <p>On some models, E52 creates a fatal machine lock. However, you can often bypass this by putting the machine into "Print Only" mode: enter Maintenance Mode (*2864), enter function code 32 to set sensor bypass, and restart. This allows PC printing while the scanner hardware is serviced.</p>
</details>
<details>
  <summary>Does cold weather trigger Brother E52 errors?</summary>
  <p>Yes. If the printer is stored in an unheated room or near an air conditioner, the cold CIS (Contact Image Sensor) lamp takes longer to warm up, failing the exposure timeout threshold. Let the machine warm to room temperature (above 65°F / 18°C) before turning it on.</p>
</details>
`,

  'brother-printer-error-42-temperature': `
<h2>Thermal Circuitry: How Error 42 Differs from Error 40 and Error 50</h2>
<p>Brother laser and LED engines employ multiple negative temperature coefficient (NTC) thermistors to measure ambient chassis temperature as well as fuser roller heat. While <strong>Error 50</strong> indicates a catastrophic fuser heater circuit breakdown and <strong>Error 40</strong> represents excessive internal operating heat, <strong>Error 42</strong> specifically signals that the internal temperature sensor detected an abnormal rate of temperature rise or a thermal fluctuation that exceeds safe operating parameters.</p>

<h2>Step-by-Step Diagnostic & Reset Procedure</h2>
<ol>
  <li><strong>Check Room Ambient Temperature:</strong> If the printer is operating in an environment below 50°F (10°C) or above 90°F (32°C), the baseline resistance of the internal thermistor will be skewed, causing false Error 42 trips. Relocate the machine to a climate-controlled room.</li>
  <li><strong>Inspect the Exhaust Cooling Fan:</strong> On the side or rear of your Brother laser printer is a cooling fan. If dust bunnies or paper fragments have jammed the fan blades, heat builds up rapidly in the fuser chamber. Power down, blow compressed air through the fan grille, and verify the fan spins freely.</li>
  <li><strong>Cold Reset (Power Cycle with Capacitor Discharge):</strong>
    <ul>
      <li>Turn the printer power switch OFF.</li>
      <li>Unplug the AC power cord from the wall outlet and from the rear of the machine.</li>
      <li>Press and hold the physical <strong>Power</strong> button for 30 seconds while unplugged to drain the high-voltage capacitors on the power supply board.</li>
      <li>Leave the printer disconnected for at least 20 minutes to allow the fuser thermistor to stabilize at true ambient temperature.</li>
      <li>Plug directly into a dedicated wall outlet (avoid battery backup UPS units or surge protectors that can introduce voltage drops).</li>
    </ul>
  </li>
  <li><strong>Inspect Fuser Thermistor Wiring:</strong> If comfortable opening the rear access panel, inspect the two-wire harness connecting the fuser unit to the low-voltage power supply. Check for pinched wires or scorched connectors.</li>
</ol>

<h2>Clearing Thermal Errors via Maintenance Mode</h2>
<ol>
  <li>Enter Maintenance Mode: Power on while holding the <strong>Menu</strong> or <strong>Set</strong> button, or enter <code>*2864</code> on keypad models.</li>
  <li>Type <code>74</code> to view the thermal log.</li>
  <li>Type <code>01</code> to reset NVRAM error counters.</li>
  <li>Type <code>99</code> to exit and reboot.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Is Error 42 dangerous or a fire hazard?</summary>
  <p>No. Brother printers are engineered with secondary thermal cutoffs (thermal fuses) that physically disconnect line voltage if dangerous temperatures are reached. Error 42 is an electronic safety pause that protects the plastic chassis and roller sleeves from melting.</p>
</details>
<details>
  <summary>Can a failing toner cartridge cause Error 42?</summary>
  <p>Indirectly, yes. If a low-quality third-party toner cartridge is dumping excessive toner powder into the machine, the toner dust can coat the thermistor glass bead, insulating it and causing erratic temperature readings.</p>
</details>
`,

  'brother-printer-error-30-unable-to-print': `
<h2>Mechanical Analysis of Brother Error 30</h2>
<p>Error 30 ("Unable to Print 30") is a mechanical movement fault. The main DC drive motor or the carriage motor is attempting to rotate, but the internal optical rotation sensor (encoder wheel or tachometer) is reporting zero movement or abnormal drag. Something is physically blocking the gear train, the paper feed rollers, or the printhead carriage.</p>

<h2>Systematic Inspection & Clearing Guide</h2>
<ol>
  <li><strong>The Flashlight Inspection (The "Torn Paper Corner" Check):</strong>
    <p>90% of Error 30 occurrences are caused by a scrap of paper no larger than a postage stamp jammed beneath the paper feed roller or inside the purge unit (the ink cleaning station on the far right). Turn off the printer, lift the scanner or cover, and use a bright flashlight to inspect both the extreme left and right corners of the printhead track.</p>
  </li>
  <li><strong>Check the Clear Plastic Encoder Strip:</strong>
    <p>Behind the printhead carriage runs a thin, clear plastic ribbon marked with microscopic vertical lines (the encoder strip). If grease from the carriage guide rail or ink mist has smudged this strip, the optical sensor cannot read carriage position, stalls out, and triggers Error 30. Gently clean the strip using a dry microfiber cloth (or very lightly moistened with water — never use alcohol as it strips the printed timing marks).</p>
  </li>
  <li><strong>Inspect the Purge Unit / Maintenance Station:</strong>
    <p>On inkjet models, look at the far right side where the printhead parks. The wiper blade and rubber suction caps can get stuck in the raised position if dried ink forms a hardened crust. Gently push the rubber cap assembly downward to confirm it springs back smoothly.</p>
  </li>
  <li><strong>Manually Check Carriage Movement:</strong>
    <p>With power completely disconnected, gently slide the printhead carriage back and forth across its metal rail by hand. It should glide with smooth, uniform resistance. If it hits a hard stop before reaching either wall, locate and remove the obstruction.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>What should I do if the carriage is locked on the right side and won't move?</summary>
  <p>The carriage is locked by a mechanical cam to prevent drying. Turn the large white plastic gear on the left side of the paper path clockwise by hand. This will lower the maintenance station lock and release the carriage freely.</p>
</details>
<details>
  <summary>Can Error 30 be caused by foreign objects like paperclips?</summary>
  <p>Yes. Staples, paper clips, and label backing paper frequently fall into the top paper feed slot. Use a stiff piece of cardstock slid through the paper path to push out any hidden foreign objects.</p>
</details>
`,

  'brother-printer-error-ts-07': `
<h2>Technical Explanation of TS-07 Authentication Rejection</h2>
<p>On Brother wireless diagnostics, <strong>TS-07</strong> indicates an active WPA/WPA2/WPA3 4-Way Handshake Failure. The printer successfully detected the SSID, negotiated the beacon frame, and transmitted the Pre-Shared Key (PSK), but the wireless router explicitly sent back an "Authentication Rejected" packet. Unlike TS-02 (no signal) or TS-03 (DHCP failure), TS-07 means your credentials or encryption handshakes failed.</p>

<h2>Advanced Troubleshooting: Key Mismatches & Security Protocols</h2>
<ol>
  <li><strong>WPA3-SAE vs. WPA2-PSK Incompatibility:</strong> Many modern Wi-Fi 6 routers default to WPA3-Personal (SAE) mode. Older Brother network cards (manufactured before 2021) do not support WPA3 cryptographic handshakes. Log into your router admin panel and set the 2.4GHz security mode to <strong>WPA2-PSK (AES)</strong> or <strong>WPA2/WPA3 Mixed Mode</strong>.</li>
  <li><strong>Case Sensitivity and Hexadecimal Passwords:</strong> Brother keypad input requires special attention. If your password contains numbers, symbols, or capital letters, verify each character on the Brother screen before confirming. Note that leading/trailing spaces in router passwords will trigger TS-07 immediately.</li>
  <li><strong>Guest Networks & AP Client Isolation:</strong> If you are connecting the Brother printer to a router's "Guest" network, guest isolation policies may terminate local authentication handshakes. Always connect to the primary private SSID.</li>
  <li><strong>Full Wireless Network Reset on Brother:</strong>
    <p>Clear corrupted cached keys from the printer's EEPROM:</p>
    <ul>
      <li>Press <strong>Menu</strong> or <strong>Settings</strong> &gt; <strong>Network</strong> &gt; <strong>Network Reset</strong>.</li>
      <li>Press <strong>1</strong> (or select <strong>Yes</strong>) to confirm.</li>
      <li>The machine will restart. Rerun the <strong>Setup Wizard</strong> to input the Wi-Fi key fresh.</li>
    </ul>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does TS-07 persist even when I am 100% sure my password is correct?</summary>
  <p>Special characters (such as $, %, &, or spaces) in your Wi-Fi password can be misinterpreted by Brother's internal ASCII character mapping table. If possible, test with a temporary alphanumeric password to confirm.</p>
</details>
<details>
  <summary>Will changing my router's channel resolve TS-07?</summary>
  <p>While channel congestion causes TS-02 packet drops, setting your router's 2.4GHz channel width to <strong>20 MHz</strong> (instead of 40 MHz or Auto) helps older Brother network adapters complete the timing-critical 4-way WPA handshake without timeout rejections.</p>
</details>
`,

  'brother-printer-error-35-fix': `
<h2>Understanding the Error 35 Sub-Category Jam</h2>
<p>In the Brother paper transport hierarchy, Error 35 specifically points to the <strong>Center / Registration Sensor</strong>. The paper was successfully picked up from the main tray (Tray 1) by the pickup roller, but the leading edge of the sheet failed to reach the registration sensor within the expected millisecond timing window, or the trailing edge never cleared it.</p>

<h2>Detailed Recovery & Cleaning Procedures</h2>
<ol>
  <li><strong>Clean the Paper Pickup & Separation Rollers:</strong>
    <p>Pull Tray 1 completely out of the machine. Look inside the bottom cavity to locate the rubber pickup rollers. Over time, paper dust coats the rubber, causing it to slip on the paper surface. Clean the rollers thoroughly with a lint-free cloth dampened with distilled water. Check the rubber separation pad inside the tray as well.</p>
  </li>
  <li><strong>Inspect the Registration Sensor Flag:</strong>
    <p>Inside the paper cavity, just before the drum/toner cavity, sits a small black plastic actuator lever (the sensor flag). When paper passes, it pushes this flag down. If a torn scrap of paper has wedged the flag in the down position, or if the tiny spring has detached, Error 35 will persist even with no paper present.</p>
  </li>
  <li><strong>Adjust Paper Tray Side Guides:</strong>
    <p>Ensure the green plastic paper guides in Tray 1 are locked firmly against the edges of the paper stack. If the guides are too loose, the paper feeds crooked (skewed) and jams against the registration chute.</p>
  </li>
  <li><strong>Clear the Duplex Path (For 2-Sided Printing):</strong>
    <p>Open the back cover (face-up output tray) and pull out the duplex tray if equipped. Inspect the reversing rollers for any folded paper concertinas.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does Error 35 happen only when printing double-sided (duplex)?</summary>
  <p>During duplex printing, the sheet must reverse direction and travel through the lower duplex feed channel. If the duplex feed rollers are dusty or the rear flap isn't snapped closed tightly, the paper stalls in the return path, triggering Error 35.</p>
</details>
<details>
  <summary>What paper weight is supported to prevent Error 35?</summary>
  <p>Standard Brother paper trays are calibrated for 16 to 28 lb (60 to 105 g/m²) bond paper. Heavy cardstock (over 43 lb / 163 g/m²) should be fed individually through the Manual Feed Slot to prevent registration timing errors.</p>
</details>
`,

  'brother-error-code-e50-vs-e51-difference': `
<h2>Deep-Dive Engineering Comparison: E50 (Fuser) vs. E51 (Laser Unit)</h2>
<p>While their codes sound interchangeable, confusing E50 and E51 will lead you to replace the wrong expensive subassembly. Here is the technical breakdown of how each subsystem operates and fails:</p>

<table style="width:100%; border-collapse: collapse; margin: 20px 0;">
  <thead>
    <tr style="background-color: #f3f4f6; text-align: left;">
      <th style="padding: 10px; border: 1px solid #d1d5db;">Attribute</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">Error E50 (Fuser Unit)</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">Error E51 (Laser / Polygon Motor)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Core Component</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Halogen heater lamp / ceramic heating element & thermistor</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Polygon mirror scanner motor & laser diode assembly</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Physical Symptom</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Printer rear feels cold, or distinct burning smell; toner rubs off printed paper</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">High-pitched whining noise that suddenly cuts out; blank white pages</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Root Mechanism</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Fuser failed to reach ~180°C within the warm-up timeout window</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Polygon scanner mirror failed to lock onto target RPM (typically 20,000+ RPM)</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Typical Fix</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Replace fuser assembly or reset fuser error via maintenance mode</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Clean laser glass window; replace laser scanner unit (LSU)</td>
    </tr>
  </tbody>
</table>

<h2>Troubleshooting E50: Fuser Failure Recovery</h2>
<ol>
  <li>Turn off the machine and unplug for 15 minutes.</li>
  <li>Open the rear cover. Inspect the orange/brown heat roller. If the roller sleeve is torn, wrinkled, or locked, the fuser unit must be replaced.</li>
  <li>Check wall voltage: Laser fusers require 110-120V / 15A clean power. Powering a Brother laser printer through an undersized UPS battery backup or daisy-chained extension cord will starve the heating element and trigger false E50 codes.</li>
</ol>

<h2>Troubleshooting E51: Laser Scanner Recovery</h2>
<ol>
  <li>Listen to the machine during boot. When the engine starts, you should hear a rising acoustic whine as the polygon mirror spins up to speed. If you hear a stuttering chattering sound followed immediately by E51, the polygon motor bearings have seized.</li>
  <li>Open the top cover and remove the toner and drum unit. Look into the top cavity to locate the elongated laser scanner exit glass. Wipe this glass gently with a clean dry microfiber cloth to clear any toner dust blocking the beam detector sensor.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can a firmware update fix E50 or E51?</summary>
  <p>Brother firmware updates sometimes adjust the polygon motor startup acceleration curve to compensate for aging bearings, which can clear intermittent E51 errors. However, true E50 errors are almost always hardware component failures.</p>
</details>
<details>
  <summary>How much does it cost to replace a Brother fuser vs. laser unit?</summary>
  <p>A replacement Brother fuser assembly typically costs between $60 and $110 depending on the model, and is easily replaced via the rear panel. A replacement laser scanner unit costs $75 to $140 and requires significant chassis disassembly.</p>
</details>
`
};

async function main() {
  console.log('🚀 Expanding Brother Articles (Batch 1 - 7 articles)...\n');

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

  console.log('\n🎉 Batch 1 Brother Expansion Complete!');
}

main().then(async () => prisma.$disconnect()).catch(async e => { console.error(e); prisma.$disconnect(); process.exit(1); });
