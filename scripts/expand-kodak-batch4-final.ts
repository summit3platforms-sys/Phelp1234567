import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function stripCrossBrandLinks(html: string): string {
  return html.replace(/<a\s[^>]*href="\/[^"]*"[^>]*>([^<]*)<\/a>/gi, '$1');
}

const expansions: Record<string, string> = {
  'kodak-printer-offline-windows-11': `
<h2>Why Kodak Printers Randomly Drop Offline in Windows 11</h2>
<p>Windows 11 utilizes the modern Web Services for Devices (WSD) discovery protocol by default for network printers. Older Kodak ESP and HERO printers (designed before WSD was standardized) do not respond reliably to WSD keep-alive polling packets. When Windows 11 sends a polling query and the printer does not respond within 3 seconds, Windows instantly marks the printer status as "Offline", blocking all incoming print jobs.</p>

<h2>Fixing the Offline Bug: Switching from WSD to Standard TCP/IP Port</h2>
<ol>
  <li><strong>Locate the Printer's Current Local IP Address:</strong>
    <p>Print a Network Configuration page from the printer control panel or look at your router's connected devices table (e.g., <code>192.168.1.145</code>).</p>
  </li>
  <li><strong>Open Classic Print Properties in Windows 11:</strong>
    <ul>
      <li>Press <strong>Windows Key + R</strong>, type <code>control printers</code>, and press Enter.</li>
      <li>Right-click your Kodak printer and select <strong>Printer Properties</strong> (not standard "Properties").</li>
      <li>Click on the <strong>Ports</strong> tab at the top.</li>
    </ul>
  </li>
  <li><strong>Create a New Standard TCP/IP Port:</strong>
    <ul>
      <li>Click the <strong>Add Port...</strong> button.</li>
      <li>Select <strong>Standard TCP/IP Port</strong> from the list and click <strong>New Port...</strong>.</li>
      <li>The Add Standard TCP/IP Printer Port Wizard will launch. Click Next.</li>
      <li>In the <strong>Printer Name or IP Address</strong> field, type your Kodak printer's exact IP address (e.g., <code>192.168.1.145</code>). The Port Name will auto-fill.</li>
      <li>Click Next and allow Windows to detect the port. Click Finish and Close.</li>
      <li>Verify the new TCP/IP port is checked with a checkmark, then click <strong>Apply</strong>.</li>
    </ul>
  </li>
  <li><strong>Disable "Use Printer Offline" Toggle:</strong>
    <p>In the Devices and Printers window, double-click your Kodak printer. Click the <strong>Printer</strong> menu at the top-left corner and ensure there is NO checkmark next to <strong>"Use Printer Offline"</strong> or <strong>"Pause Printing"</strong>.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the printer go offline every time I reboot my Wi-Fi router?</summary>
  <p>If your router assigns dynamic IP addresses via DHCP, the printer gets a new IP when the router restarts, breaking the old port mapping. Log into your router admin panel and set a permanent DHCP Reservation for the printer's MAC address.</p>
</details>
<details>
  <summary>Can I connect via USB to avoid all offline issues?</summary>
  <p>Yes. A direct USB 2.0 cable connection completely bypasses all network polling, WSD timeout drops, and Wi-Fi interference.</p>
</details>
`,

  'kodak-mini-2-retro-cartridge-stuck': `
<h2>Why 4PASS Cartridges Get Stuck in the Kodak Mini 2 Retro</h2>
<p>The Kodak Mini 2 Retro utilizes an all-in-one cartridge containing both photo paper and an ultra-thin 4-color dye ribbon. The cartridge is held in place by an internal mechanical catch lever and driven by a multi-gear stepper motor. If the printer loses battery power mid-print, suffers a paper jam, or overheats, the thermal printhead remains locked down against the dye film, mechanically trapping the cartridge inside the bay.</p>

<h2>Step-by-Step Manual Cartridge Release Protocol</h2>
<ol>
  <li><strong>Never Force or Pry the Cartridge with Screwdrivers:</strong>
    <p>Prying with metal tools will snap the plastic guide rails or crack the delicate thermal printhead glass. The cartridge can be released safely using the methods below.</p>
  </li>
  <li><strong>The Power-Cycle Head Release:</strong>
    <ul>
      <li>Connect the Mini 2 Retro to a certified 5V/2A wall charger.</li>
      <li>Turn on the printer. The startup initialization will command the stepper motor to cycle, raising the thermal printhead to its home resting position.</li>
      <li>Once the power LED turns solid, open the side door and pull the cartridge out smoothly using its finger grip.</li>
    </ul>
  </li>
  <li><strong>The Gear Slack Reset (Manual De-tensioning):</strong>
    <p>If the ribbon film melted onto a photo sheet during an overheating event, the film is acting like tape holding the cartridge inside. Look inside the exit slot with a flashlight. If paper is visible, use tweezers to gently peel the paper away from the ribbon. Turn the exposed white drive cog on the cartridge clockwise with your fingertip to take up ribbon slack, then pull the cartridge free.</p>
  </li>
  <li><strong>Hardware Pin-Hole Reset:</strong>
    <p>Press the pin-hole reset switch next to the Micro-USB/USB-C charging port with a paperclip for 5 seconds to force the firmware to reset motor registers.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I reuse a cartridge if the ribbon torn while stuck?</summary>
  <p>Yes. If the ribbon tore cleanly, splice the two ends together using a small piece of clear Scotch tape, rotate the take-up spool gear clockwise until the taped joint is wound securely onto the internal spool, and reinsert.</p>
</details>
<details>
  <summary>How many photos are included in each Kodak Mini 2 cartridge?</summary>
  <p>Standard Kodak Mini 2 cartridges come in 20-print, 30-print, or 50-print packs (with 10 photo sheets loaded per individual cartridge module).</p>
</details>
`,

  'kodak-printer-wont-feed-photo-paper-slips': `
<h2>Why Kodak Photo Printers Slip on Glossy Media</h2>
<p>Kodak Premium Glossy Photo Paper features a specialized resin-coated high-gloss finish that provides laboratory-grade photo clarity. However, the smooth high-gloss surface provides significantly less mechanical friction than standard matte copy paper. When the rubber feed rollers accumulate microscopic paper dust or skin oils, the rollers spin on top of the photo sheet without grabbing it, resulting in "Paper Out" or "Feed Failure" errors.</p>

<h2>Exhaustive Roller Cleaning & Media Conditioning Guide</h2>
<ol>
  <li><strong>Clean the Rubber Feed & Retard Rollers:</strong>
    <p>Dampen a clean microfiber cloth with warm distilled water. Wipe the rubber feed rollers inside the bottom cassette or rear feed slot. Rotate the rollers manually while cleaning to ensure the entire 360-degree circumference is treated. Allow 10 minutes to air dry completely before loading media.</p>
  </li>
  <li><strong>Condition the Photo Paper Stack:</strong>
    <ul>
      <li>Do not load photo paper straight from a cold mailbox or humid room. Allow the paper to acclimate to room temperature for 1 hour.</li>
      <li>Fan the edges of the photo paper stack before loading to break the electrostatic vacuum between sheets.</li>
      <li>Never load more than 15-20 sheets of glossy photo paper at a time in consumer desktop trays.</li>
    </ul>
  </li>
  <li><strong>Proper Sheet Orientation in Kodak Trays:</strong>
    <p>In bottom-loading cassette trays (ESP and HERO series), load photo paper with the glossy print side facing <strong>DOWN</strong>. In top-loading portable models, load paper with the glossy side facing UP.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I use non-Kodak glossy photo paper?</summary>
  <p>Yes, but ensure the paper weight does not exceed 250 g/m². Very thick 300+ g/m² commercial photo paper is too rigid to negotiate the 180-degree U-turn feed path in Kodak desktop printers.</p>
</details>
<details>
  <summary>Why does the printer leave black roller marks on the back of my photos?</summary>
  <p>Ink mist and dust on the lower idler rollers can transfer to the backside of the paper during transport. Clean the white plastic idler wheels in the bottom feed tray with water.</p>
</details>
`,

  'kodak-easyshare-printer-dock-series-3-troubleshooting': `
<h2>Complete Diagnostics for the Classic Kodak EasyShare Printer Dock Series 3</h2>
<p>The Kodak EasyShare Printer Dock Series 3 is a dedicated 4x6 dye-sublimation snapshot printer featuring the classic Kodak camera docking connector. It uses specialized thermal color ribbon cartridges and Kodak snapshot paper. Common field issues include docking pin misalignments, ribbon cartridge jams, and modern operating system driver compatibility.</p>

<h2>Comprehensive Troubleshooting Workflow</h2>
<ol>
  <li><strong>Cleaning the 30-Pin Camera Dock Connector:</strong>
    <p>The top camera docking connector contains 30 gold-plated leaf pins. Dust, lint, or bent pins prevent the docked EasyShare digital camera from communicating. Blow compressed air into the dock connector and clean with an alcohol swab.</p>
  </li>
  <li><strong>Fixing Color Ribbon Cartridge Errors:</strong>
    <ul>
      <li>Open the side door and remove the ribbon cartridge.</li>
      <li>Inspect the ultra-thin yellow, magenta, and cyan film panels.</li>
      <li>If the ribbon is sagging, turn the drive gear clockwise with your thumb to tighten the film until smooth and taut.</li>
      <li>Reinsert the cartridge firmly until the blue plastic release latch snaps forward.</li>
    </ul>
  </li>
  <li><strong>Paper Tray (Feeder Cassette) Alignment:</strong>
    <p>The paper tray must be pushed firmly into the front slot until it clicks into its metal catches. Load Kodak Color Cartridge &amp; Paper Kit sheets with the Kodak watermark on the back and glossy side facing UP in the dock cassette.</p>
  </li>
  <li><strong>Printing from Modern Windows 10 & 11 PCs via USB:</strong>
    <p>Connect the Printer Dock via the rear USB-B port. Because official drivers stopped at Windows Vista/7, install the generic <strong>"Microsoft IPP Class Driver"</strong> or use Windows 7 Compatibility Mode on the legacy EasyShare software installer.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the EasyShare Dock print 4 times for a single photo?</summary>
  <p>This is the standard dye-sublimation process: Pass 1 applies Yellow dye, Pass 2 applies Magenta, Pass 3 applies Cyan, and Pass 4 applies a clear protective lamination layer (UV and water resistant).</p>
</details>
<details>
  <summary>Can I print without a docked camera?</summary>
  <p>Yes. You can print from a PC connected via the rear USB port, or insert an SD/MMC memory card into the side card slot on compatible EasyShare Dock models.</p>
</details>
`,

  'how-to-print-from-macos-to-legacy-kodak-printer': `
<h2>How to Connect & Print to Legacy Kodak Printers on Modern macOS (Sonoma, Ventura, Monterey)</h2>
<p>Apple completely removed legacy 32-bit driver architecture and deprecated classic CUPS driver plugins starting with macOS Catalina (10.15). Because Kodak discontinued Mac driver updates years prior, modern Mac computers running Apple Silicon (M1, M2, M3, M4) or recent Intel macOS builds will display "Driver is unavailable" or "Printer software not found" when connecting a Kodak printer via USB or Wi-Fi.</p>

<h2>3 Working Methods to Print on Modern macOS</h2>
<ol>
  <li><strong>Method 1: Generic PCL / PostScript / IPP Driver Setup (Recommended):</strong>
    <ul>
      <li>Ensure the Kodak printer is connected to your Wi-Fi network and has a valid local IP address (e.g., <code>192.168.1.50</code>).</li>
      <li>On your Mac, open <strong>System Settings &gt; Printers &amp; Scanners</strong>.</li>
      <li>Click <strong>Add Printer, Scanner, or Fax...</strong> (the <code>+</code> button).</li>
      <li>Click the <strong>IP</strong> tab (globe icon) at the top.</li>
      <li>In the <strong>Address</strong> field, enter the printer's IP address.</li>
      <li>Set <strong>Protocol</strong> to <code>Line Printer Daemon - LPD</code> or <code>AirPrint / Generic IPP</code>.</li>
      <li>In the <strong>Use</strong> dropdown, select <strong>"Generic PCL Printer"</strong> or <strong>"Generic PostScript Printer"</strong>.</li>
      <li>Click Add. This allows standard document printing directly from macOS without any proprietary Kodak software.</li>
    </ul>
  </li>
  <li><strong>Method 2: Using the Open-Source Gutenberg / CUPS Driver Stack:</strong>
    <p>Install the community-maintained <strong>Gutenprint for macOS</strong> package. Gutenprint contains open-source CUPS raster drivers supporting numerous legacy inkjet and dye-sublimation printer command sets.</p>
  </li>
  <li><strong>Method 3: Virtual Machine Printing (For Scanning & Maintenance):</strong>
    <p>If you need full Kodak Home Center access (printhead alignment, nozzle cleans, scan utilities), run a free Windows 10/7 virtual machine using UTM or VMware Fusion on your Mac and pass the USB connection through to the VM.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Does Apple Silicon (M1/M2/M3) support Kodak printer drivers natively?</summary>
  <p>Native proprietary Kodak drivers were 32-bit x86 and will not run on ARM64 Apple Silicon. Using the Generic IPP/PCL protocol or Gutenprint is required on modern Mac hardware.</p>
</details>
<details>
  <summary>How can I scan documents from a Kodak all-in-one to Mac?</summary>
  <p>If the printer is networked, type its IP into Safari to open the Embedded Web Server (EWS). Many Kodak models support <strong>WebScan</strong> directly through the browser without needing any Mac scanning software.</p>
</details>
`,

  'kodak-dock-plus-flashing-lights-error-codes': `
<h2>Decoding Status LED Indicators on the Kodak Dock Plus (PD460 / PD460P)</h2>
<p>The Kodak Dock Plus is a popular 4x6 4PASS dye-sublimation home photo printer featuring a direct top smartphone docking cradle and Bluetooth connectivity. The multi-color LED indicator next to the power button communicates all operational states and error alarms.</p>

<h2>Kodak Dock Plus LED Diagnostic Table</h2>
<table style="width:100%; border-collapse: collapse; margin: 20px 0;">
  <thead>
    <tr style="background-color: #f3f4f6; text-align: left;">
      <th style="padding: 10px; border: 1px solid #d1d5db;">LED Color & Pattern</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">System State</th>
      <th style="padding: 10px; border: 1px solid #d1d5db;">Diagnostic & Fix Protocol</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Solid White / Blue</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Standby / Ready</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Printer is online, paired, and ready to receive photo print jobs.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Pulsing White / Blue</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Printing in Progress</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Normal operation; paper is cycling through the 4 dye passes.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Flashing Amber / Orange</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Paper Feeder Jam or Cassette Empty</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Verify paper cassette is clicked in; ensure photo paper is loaded glossy-side UP.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Flashing Red</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Cartridge Ribbon Depleted or Missing</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Open side door; install new Kodak Dock 4PASS cartridge (PHC-40 / 80 / 120).</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #d1d5db;"><strong>Rapid Blinking Red (Thermal)</strong></td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Thermal Overheat Protection</td>
      <td style="padding: 10px; border: 1px solid #d1d5db;">Printhead is saturated; allow 15 minutes of passive cooldown.</td>
    </tr>
  </tbody>
</table>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I dock modern iPhones with USB-C (iPhone 15/16) on the Dock Plus?</summary>
  <p>Yes. The Kodak Dock Plus includes interchangeable Lightning and USB-C dock adapters. Ensure the correct adapter is seated firmly in the top connector well.</p>
</details>
<details>
  <summary>Why does the Dock Plus lose Bluetooth pairing after printing one photo?</summary>
  <p>Disable "Auto Sleep" in the Kodak Photo Printer app settings to keep the Bluetooth connection active between print jobs.</p>
</details>
`,

  'kodak-dock-plus-paper-jam': `
<h2>Why Paper Jams Occur in the Kodak Dock Plus 4PASS Mechanism</h2>
<p>The Kodak Dock Plus moves 4x6 photo paper forward and backward through the print engine four times (Yellow, Magenta, Cyan, Laminate). Because the sheet passes through the open rear slot and front tray multiple times, paper jams are triggered by physical obstructions behind the printer, bent paper corners, or loose ribbon film.</p>

<h2>Step-by-Step Clearing & Jam Prevention Protocol</h2>
<ol>
  <li><strong>Maintain Required 4-Inch Rear Clearance:</strong>
    <p>During dye transfer passes, the 4x6 photo sheet extends out the <strong>back</strong> of the printer by up to 4 inches before reversing. If the printer is placed against a wall, books, or cables, the paper collides with the wall and buckles inside the roller track. Always keep 4 inches of clear space behind the printer.</p>
  </li>
  <li><strong>Clearing a Stuck Sheet Safely:</strong>
    <ul>
      <li>Do NOT violently yank the paper from the front tray.</li>
      <li>Turn off the printer power switch. Unplug the 24V DC power brick.</li>
      <li>Gently pull the paper in the direction of the roller feed (whichever direction offers less resistance).</li>
      <li>Open the side door, remove the cartridge, and inspect for ribbon tears.</li>
    </ul>
  </li>
  <li><strong>Proper Paper Loading in the Detachable Cassette:</strong>
    <ul>
      <li>Open the paper cassette lid.</li>
      <li>Load a maximum of 10 sheets of genuine Kodak Dock Plus photo paper. Overfilling causes double-feeding jams.</li>
      <li>Load paper with the glossy print side facing <strong>UP</strong> and the Kodak watermark facing DOWN.</li>
      <li>Snap the cassette firmly into the front dock slot until both side locking pins engage.</li>
    </ul>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>What should I do if the photo paper is stuck inside with the ribbon melted to it?</summary>
  <p>Let the printer cool down for 15 minutes. Once cool, the dye bonds solidify and the paper will peel away cleanly from the ribbon film without shredding.</p>
</details>
<details>
  <summary>Can I reuse a sheet of photo paper that jammed during the first yellow pass?</summary>
  <p>No. Re-feeding a partially printed or creased photo sheet will damage the micro-heaters on the thermal printhead. Discard creased sheets.</p>
</details>
`,

  'kodak-printer-driver-unavailable-fix': `
<h2>Why Windows 10 & 11 Report "Driver is Unavailable" for Kodak Printers</h2>
<p>When Windows displays the "Driver is unavailable" error under Printers &amp; Scanners, it signifies that Windows detected the hardware plug-and-play ID over USB or Wi-Fi, but the Windows Update driver repository lacks a certified signed driver package for your specific legacy Kodak model.</p>

<h2>Complete 4-Step Driver Restoration Protocol</h2>
<ol>
  <li><strong>Install the Official Kodak Driver in Windows 7 Compatibility Mode:</strong>
    <ul>
      <li>Download the final release of the Kodak All-in-One Software suite (v8.3).</li>
      <li>Right-click the downloaded setup file &gt; <strong>Properties &gt; Compatibility</strong>.</li>
      <li>Check <strong>"Run this program in compatibility mode for Windows 7"</strong>.</li>
      <li>Check <strong>"Run as administrator"</strong>. Click Apply and execute the installer.</li>
    </ul>
  </li>
  <li><strong>Manually Select the Microsoft Generic WIA/IPP Class Driver:</strong>
    <ul>
      <li>Open Control Panel &gt; Devices and Printers &gt; <strong>Add Printer</strong>.</li>
      <li>Click "The printer that I want isn't listed".</li>
      <li>Select "Add a local printer or network printer with manual settings".</li>
      <li>Choose the USB001 virtual printer port or your TCP/IP port.</li>
      <li>Under Manufacturer, select <strong>Generic</strong>, and under Printers, select <strong>Generic / Text Only</strong> or <strong>Microsoft IPP Class Driver</strong>.</li>
    </ul>
  </li>
  <li><strong>Clear Corrupted Driver Packages from Print Management:</strong>
    <p>Press <strong>Windows Key + R</strong>, type <code>printmanagement.msc</code>, and press Enter. Under Custom Filters &gt; All Drivers, right-click any ghosted or corrupted Kodak driver packages and select <strong>Remove Driver Package</strong>.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Does Kodak still update drivers for new Windows 11 updates?</summary>
  <p>Official software updates ended when Kodak restructured its consumer printing division. However, existing drivers run reliably on Windows 11 using Compatibility Mode settings.</p>
</details>
<details>
  <summary>Can I print using third-party software like VueScan?</summary>
  <p>Yes. For scanning, the popular third-party utility <strong>VueScan</strong> contains built-in reverse-engineered reverse drivers for almost all Kodak ESP and HERO all-in-one scanners without needing any Kodak drivers installed.</p>
</details>
`,

  'kodak-printer-low-ink-warning-override': `
<h2>How to Override and Bypass Low Ink Warnings on Kodak Printers</h2>
<p>Kodak printers monitor ink levels through a combination of optical drop-counting microchips on the cartridges and infrared light sensors inside the carriage. When ink reaches an estimated 10% capacity, the printer displays continuous warning prompts on your computer and printer display.</p>

<h2>Step-by-Step Low Ink Override Workflow</h2>
<ol>
  <li><strong>The On-Screen Confirmation Override:</strong>
    <p>When the "Low Ink" dialog appears on your printer's LCD screen, press the <strong>OK</strong> or <strong>Continue</strong> button on the control panel. The printer will acknowledge that you understand ink is low and will continue executing incoming print jobs until the cartridge physically runs out of liquid ink.</p>
  </li>
  <li><strong>Disabling the Kodak Status Monitor in Windows:</strong>
    <ul>
      <li>Open the Windows System Tray (near the clock).</li>
      <li>Right-click the Kodak Printer Status Monitor icon.</li>
      <li>Select <strong>Properties / Preferences</strong>.</li>
      <li>Uncheck <strong>"Show low ink pop-up alerts"</strong>. This prevents annoying full-screen interruption dialogs while you finish printing.</li>
    </ul>
  </li>
  <li><strong>Physical Inspection of the Cartridge Ink Window:</strong>
    <p>Unlike many competitors, genuine Kodak Series 10 and 30 cartridges feature a translucent plastic casing. You can remove the cartridge and gently rock it to visually confirm how much liquid ink remains in the chamber regardless of what the digital software estimate says.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I continue printing if the printer says "Ink Cartridge Depleted"?</summary>
  <p>Once a cartridge is marked 100% empty, the printer firmware will lock printing to prevent the thermal nozzle resistors from firing dry, which would burn out the printhead.</p>
</details>
<details>
  <summary>Does overriding low ink warnings damage the printer?</summary>
  <p>Printing with low ink is completely safe as long as ink is still visibly flowing onto the page. Once you see text fading, replace the cartridge immediately to prevent air locks.</p>
</details>
`,

  'kodak-printer-making-grinding-noise': `
<h2>Diagnosing Grinding, Clicking, and Ratcheting Noises in Kodak Printers</h2>
<p>Loud mechanical grinding or rapid clicking sounds from a Kodak printer indicate mechanical gear tooth slippage, carriage belt skipping, or purge pump binding. Identifying the physical location of the noise pinpoints the required repair.</p>

<h2>Exhaustive Noise Diagnostic & Repair Protocol</h2>
<ol>
  <li><strong>Grinding from the Left or Right (Carriage Collision):</strong>
    <p>If the printhead carriage slams violently into the left or right wall with a loud ratcheting buzz, the optical encoder strip is dirty. Clean the clear encoder strip behind the carriage with warm distilled water on a microfiber cloth.</p>
  </li>
  <li><strong>Rapid Clicking from the Far Right (Purge Station Jam):</strong>
    <p>The maintenance purge unit on the far right houses plastic cam gears that raise and lower the rubber capping station. If dried ink crust binds the capping carriage, the drive gear slips over the teeth, producing a loud clicking noise during bootup. Clean the purge station tracks with warm water.</p>
  </li>
  <li><strong>Grinding from the Bottom Paper Tray (Feed Gear Slippage):</strong>
    <p>If grinding occurs specifically when the printer attempts to pick up paper, inspect the pickup roller drive gear cluster on the left side of the bottom tray cavity. Ensure no foreign objects (coins, paperclips, staples) are lodged between the gear teeth.</p>
  </li>
  <li><strong>Guide Rod Lubrication:</strong>
    <p>Clean the steel carriage rail and apply 2 drops of synthetic silicone lubricant across the rod to eliminate metal-on-bushing friction squeaks.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Should I use WD-40 on printer gears?</summary>
  <p>NEVER use WD-40, mineral oil, or cooking oil on a printer. WD-40 degrades plastic gears and attracts paper dust into an abrasive sludge. Use only synthetic silicone or PTFE grease.</p>
</details>
<details>
  <summary>Can a stripped gear be replaced?</summary>
  <p>Yes. Replacement drive gears and encoder strips for Kodak ESP and HERO models are readily available from printer parts suppliers.</p>
</details>
`,

  'hp-officejet-pro-8025e-not-printing-color': `
<h2>Deep-Dive Troubleshooting for Missing Color on HP OfficeJet Pro 8025e</h2>
<p>The HP OfficeJet Pro 8025e utilizes four separate HP 910/910XL ink cartridges and an integrated multi-channel thermal printhead. When color output fails, systematic isolation of the print driver, ink supply tubes, and nozzle firing chambers is essential.</p>

<h2>Advanced Color Restoration Protocol</h2>
<ol>
  <li><strong>Perform a Triple-Stage Level 2 Printhead Cleaning:</strong>
    <p>From the HP Smart app or printer touchscreen, navigate to <strong>Tools &gt; Clean Printhead</strong>. If the initial cycle does not restore cyan, magenta, or yellow, execute the deeper "Level 2" cleaning cycle. Allow the printer 10 minutes between cycles to let ink saturate the internal manifold.</p>
  </li>
  <li><strong>Inspect Cartridge Vent Ports:</strong>
    <p>Ensure the protective tape has been cleanly removed from the top air vents of the 910 color cartridges. A blocked vent creates a vacuum that starves the color nozzles.</p>
  </li>
  <li><strong>Check Windows Driver Print Quality Settings:</strong>
    <p>In Windows Printer Properties, verify that <strong>"Print in Grayscale"</strong> or <strong>"Black &amp; White Only"</strong> is NOT toggled on by default in your printing preferences.</p>
  </li>
</ol>
`,

  'hp-printer-802-1x-authentication-failed': `
<h2>Enterprise 802.1x Network Authentication Deep Dive for HP Printers</h2>
<p>In corporate, healthcare, and educational network environments, IEEE 802.1x Network Access Control (NAC) enforces port-based authentication before granting IP access. When an HP printer fails 802.1x authentication, the switch port remains in an unauthorized blocking state.</p>

<h2>Advanced 802.1x Configuration Protocol</h2>
<ol>
  <li><strong>Select the Correct EAP Authentication Method in EWS:</strong>
    <p>Access the HP Embedded Web Server (EWS) &gt; <strong>Networking &gt; Security &gt; 802.1x Authentication</strong>. Select between <strong>EAP-TLS</strong> (requires device certificate), <strong>PEAP-MSCHAPv2</strong> (username/password), or <strong>EAP-TTLS</strong>.</p>
  </li>
  <li><strong>Import Root CA & Client Certificates:</strong>
    <p>If using EAP-TLS, generate a Certificate Signing Request (CSR) in EWS, have your enterprise CA sign it, and import the signed certificate and trusted Root CA into the printer's certificate store.</p>
  </li>
  <li><strong>Configure RADIUS Server Identity:</strong>
    <p>Ensure the username, domain, and password configured in the printer match the RADIUS/NPS server active directory policy.</p>
  </li>
</ol>
`,

  'hp-web-jetadmin-not-discovering-printers': `
<h2>Advanced Troubleshooting for HP Web Jetadmin Fleet Discovery</h2>
<p>HP Web Jetadmin (WJA) manages enterprise printer fleets across multiple subnets. When devices fail discovery, network firewalls, SNMP community mismatches, or SLP multicast routing blocks are usually responsible.</p>

<h2>Exhaustive WJA Discovery Diagnostic Workflow</h2>
<ol>
  <li><strong>Verify SNMPv1/v2/v3 Configuration:</strong>
    <p>Ensure the target printer's SNMP community name (e.g., <code>public</code> or custom) matches the WJA communication profile. If using SNMPv3, verify user credentials and encryption algorithms.</p>
  </li>
  <li><strong>Configure Cross-Subnet Directed IP Range Scans:</strong>
    <p>Because broadcast discovery (UDP 161/427) does not cross Layer 3 routers, configure WJA to run <strong>Directed IP Range Scans</strong> specifying the exact CIDR block (e.g., <code>10.20.30.0/24</code>) of the remote printer VLAN.</p>
  </li>
  <li><strong>Check Firewall Port Approvals:</strong>
    <p>Verify that network firewalls permit bidirectional traffic on <strong>UDP 161 (SNMP)</strong>, <strong>UDP 427 (SLP)</strong>, <strong>TCP 9100 (RAW)</strong>, and <strong>TCP 443 (HTTPS)</strong> between the WJA server and client subnets.</p>
  </li>
</ol>
`
};

async function main() {
  console.log('🚀 Expanding Kodak Batch 4 + Remaining HP (13 articles)...\n');

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

  console.log('\n🎉 Kodak Batch 4 + HP Complete!');
}

main().then(async () => prisma.$disconnect()).catch(async e => { console.error(e); prisma.$disconnect(); process.exit(1); });
