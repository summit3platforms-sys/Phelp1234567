import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper to strip old cross-brand interlinks from content
function stripCrossBrandLinks(html: string): string {
  // Remove <a href="/brand/..."> injected by old interlinker, replace with inner text
  return html.replace(/<a\s[^>]*href="\/[^"]*"[^>]*>([^<]*)<\/a>/gi, '$1');
}

const expansions = [
  {
    id: '98774757-42fc-41c8-aec9-b6f7f45ecedf',
    slug: 'hp-officejet-pro-6978-wont-print-black',
    wordCount: 1100,
    content: `<h2>Why the HP OfficeJet Pro 6978 Won't Print Black</h2>
<p>The HP OfficeJet Pro 6978 is a thermal inkjet printer. When black ink stops printing, the cause is almost always one of three things: depleted ink, a clogged printhead nozzle, or dirty electrical contacts. This guide walks through every fix in order from easiest to most advanced.</p>

<h2>Step 1: Check Ink Levels</h2>
<p>Before doing anything else, verify the black ink level is not empty.</p>
<ol>
  <li>Open the <strong>HP Smart app</strong> on your phone or PC and select your 6978 printer.</li>
  <li>Tap <strong>Printer Details</strong> or <strong>Supplies</strong>. The app shows a bar for each ink color.</li>
  <li>Alternatively, press the <strong>ink drop icon</strong> on the printer's touchscreen to display ink levels directly.</li>
  <li>If the black cartridge is below 10%, replace it before troubleshooting further — you may simply be out of ink.</li>
</ol>

<h2>Step 2: Run HP Print and Scan Doctor</h2>
<p>HP's free diagnostic tool often resolves this issue automatically on Windows.</p>
<ol>
  <li>Download <strong>HP Print and Scan Doctor</strong> from hp.com/go/tools.</li>
  <li>Run it and select your OfficeJet Pro 6978 from the list.</li>
  <li>Click <strong>Fix Printing</strong>. The tool checks for driver conflicts, stuck print jobs, and communication errors.</li>
  <li>Follow the on-screen prompts. The tool will restart the print spooler and run a test print automatically.</li>
</ol>

<h2>Step 3: Run a Printhead Cleaning Cycle</h2>
<p>If ink is present but black still won't print, the printhead nozzles are clogged. Dried ink blocks the microscopic nozzle openings.</p>
<ol>
  <li>On the printer touchscreen, tap the <strong>gear icon</strong> (Setup).</li>
  <li>Go to <strong>Printer Maintenance</strong> &gt; <strong>Clean Printhead</strong>.</li>
  <li>The printer will use ink to flush the nozzle channels. This takes about 2 minutes.</li>
  <li>After cleaning completes, print a test page. If black is still absent, proceed to Step 4.</li>
  <li>You can run a second <strong>Clean Printhead</strong> cycle. Do not run more than 3 cycles — excessive cleaning wastes ink without additional benefit.</li>
</ol>

<h2>Step 4: Clean the Printhead Contacts Manually</h2>
<p>Electrical contacts between the cartridge and the printer carriage carry the signal that tells the nozzles when to fire. If these contacts are smudged with ink or oxidized, black ink will not print even if the cartridge is full.</p>
<ol>
  <li>Turn the printer off and unplug the power cord.</li>
  <li>Open the ink cartridge access door. Wait for the carriage to stop moving, then gently slide it to the center.</li>
  <li>Press the tab on the <strong>black cartridge</strong> and lift it out.</li>
  <li>Find the <strong>copper-colored contacts</strong> on the back of the cartridge (the small rectangular metallic pads).</li>
  <li>Dampen a lint-free cloth or coffee filter with <strong>distilled water</strong> (not tap water — minerals leave residue).</li>
  <li>Gently wipe the copper contacts in one direction. Do not scrub back and forth.</li>
  <li>Also wipe the matching contacts <em>inside the printer carriage</em> using a fresh part of the cloth.</li>
  <li>Allow both sets of contacts to air dry for 10 minutes before reinserting the cartridge.</li>
  <li>Print a test page after reinserting.</li>
</ol>

<h2>Step 5: Re-Seat the Black Cartridge</h2>
<p>A cartridge that isn't fully clicked into its slot won't make proper contact with the carriage.</p>
<ol>
  <li>Remove the black cartridge completely.</li>
  <li>Check that the small locking tab on the cartridge is not bent or broken.</li>
  <li>Push the cartridge firmly back into the black slot until you hear and feel a distinct <strong>click</strong>.</li>
  <li>Close the access door and print a test page.</li>
</ol>

<h2>Advanced Troubleshooting: Extended Cleaning</h2>
<p>If a standard clean cycle did not clear the clog, try the Extended Cleaning procedure. This pushes a much larger volume of ink through the nozzles to dislodge stubborn dried ink.</p>
<ol>
  <li>On the touchscreen: Setup &gt; Printer Maintenance &gt; <strong>Extended Cleaning</strong>.</li>
  <li>This process takes about 5 minutes and uses a significant amount of ink.</li>
  <li>After extended cleaning, run an alignment page: Setup &gt; Printer Maintenance &gt; <strong>Align Printhead</strong>.</li>
  <li>Print a diagnostic test page to verify results.</li>
</ol>

<p>If even Extended Cleaning does not restore black ink output, the printhead is permanently clogged or electrically failed. At this point, replacing the black ink cartridge with a fresh genuine HP cartridge (not refilled or remanufactured) is the recommended next step, as sometimes what appears to be a clogged printhead is actually a defective cartridge with a blocked nozzle array at the factory.</p>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I use third-party or refilled black cartridges in the OfficeJet Pro 6978?</summary>
  <p>Technically yes, but HP's firmware actively works against third-party cartridges. The 6978 may display a "non-HP cartridge detected" warning, or it may silently refuse to print black after a firmware update. For reliable operation, use genuine HP 902 or 902XL black cartridges.</p>
</details>
<details>
  <summary>The nozzle check pattern shows black nozzles are missing — what does that mean?</summary>
  <p>A nozzle check pattern (Settings &gt; Reports &gt; Nozzle Check Pattern) shows which nozzles are firing. If you see white streaks through the black section of the pattern, those specific nozzles are clogged. Run two cleaning cycles and reprint the nozzle check. If the streaks persist in the same positions, the nozzle array is permanently blocked and the cartridge should be replaced.</p>
</details>
<details>
  <summary>My 6978 prints perfectly in color but not black at all — is that a printhead or a cartridge issue?</summary>
  <p>When color prints but black does not, the issue is 100% isolated to the black ink system — either the black cartridge, the black-channel printhead nozzles, or the black carriage contacts. Start with a fresh genuine black cartridge and clean contacts as described in Step 4 above.</p>
</details>
<details>
  <summary>How do I know if the printhead itself (not the cartridge) needs replacing?</summary>
  <p>On the OfficeJet Pro 6978, the printhead is integrated into the cartridge. You cannot replace the printhead separately. If a brand new genuine HP black cartridge still refuses to print after cleaning the carriage contacts, the electrical contacts inside the printer carriage may be damaged. Contact HP Support at this point.</p>
</details>

<h2>When to Contact HP Support</h2>
<p>If you have tried all the steps above including replacing the black cartridge and the printer still won't print black, the issue is likely a hardware failure in the carriage assembly. Contact HP Support at <strong>support.hp.com</strong> or call 1-800-HP-INVENT. If the printer is within its 1-year warranty, HP will repair or replace it free of charge.</p>`
  },
  {
    id: '3a1cfe71-8f04-45e7-b5dd-b7121aa054b1',
    slug: 'hp-laserjet-pro-m404dn-fuser-error',
    wordCount: 1080,
    content: `<h2>What Is a 50.xx Fuser Error on HP LaserJet Pro M404dn?</h2>
<p>The HP LaserJet Pro M404dn is a monochrome laser printer. The fuser is the component that melts toner powder onto the paper using heat and pressure. When the fuser's temperature falls outside its operational window — either too cold to melt toner or too hot and at risk of damage — the printer halts and displays a 50.xx error code.</p>
<p>This error is a self-protection mechanism, not a random software glitch. It means the printer's thermistor has detected a real temperature problem.</p>

<h2>Decoding the 50.xx Sub-Codes</h2>
<p>The two digits after "50." tell you exactly which fuser fault was detected:</p>
<ul>
  <li><strong>50.1 — Low Fuser Temperature:</strong> The fuser is not heating up to the target temperature (around 200°C). Usually caused by a failing fuser heating element or a weak power supply.</li>
  <li><strong>50.2 — Slow Fuser Warm-Up:</strong> The fuser reached operating temperature, but took too long. Can be caused by a dying power supply or a weak heating element early in its failure curve.</li>
  <li><strong>50.3 — High Fuser Temperature:</strong> The fuser exceeded its maximum safe temperature. The thermistor detected a runaway heating event. Most commonly caused by a shorted or stuck relay on the fuser control board.</li>
  <li><strong>50.4 — Fuser Drive Circuit Error:</strong> The logic board cannot communicate with the fuser's drive circuit. May indicate a loose connection or a failed fuser control board.</li>
  <li><strong>50.5 — Fuser Open Circuit:</strong> An electrical open circuit was detected in the fuser. This is usually a broken heating element — the fuser is physically dead.</li>
</ul>

<h2>Step-by-Step Fix Procedure</h2>
<ol>
  <li><strong>Turn the printer completely off.</strong> Do not just press the power button — switch off the physical power switch (if your model has one) or pull the power cord from the wall outlet.</li>
  <li><strong>Wait a full 30 minutes.</strong> The fuser operates at near 200°C. Allowing it to cool fully is mandatory before attempting any troubleshooting. Rushing this step can make the problem appear worse.</li>
  <li><strong>Check your power outlet.</strong> Laser printers draw very high amperage during fuser warm-up (the M404dn draws up to 8.8 amps at 120V). If plugged into a power strip shared with other high-draw devices (monitors, space heaters, computers), the voltage may sag enough to trigger a 50.2 error. Plug the printer directly into a dedicated 15-amp wall outlet.</li>
  <li><strong>Remove and reseat the fuser.</strong> If you recently cleared a paper jam, the fuser may not have been re-engaged properly. Open the rear door, press the two green fuser-release levers downward, and slide the fuser out. Slide it back in firmly until it clicks into the locked position.</li>
  <li><strong>Power on and test.</strong> Reconnect the power cord and turn the printer on. Allow it to go through the full warm-up cycle. If the error does not return on a fresh print, the issue was likely a thermal anomaly or loose seating.</li>
</ol>

<h2>If the Error Returns After Resetting</h2>
<p>If the 50.xx code comes back after the reset procedure, the fuser assembly needs to be replaced. The M404dn uses a specific fuser kit designed for its engine.</p>
<ul>
  <li><strong>Compatible fuser kit part numbers:</strong> RM2-5679 (110V) or RM2-5683 (220V). Always verify voltage when ordering.</li>
  <li><strong>Cost:</strong> Typically $80–$130 for a genuine HP fuser kit, or $40–$70 for a compatible third-party kit.</li>
  <li><strong>Replacement difficulty:</strong> The M404dn fuser is a tool-free replacement — no screwdrivers needed. The entire procedure takes under 10 minutes.</li>
</ul>

<h2>Repair vs Replace: The Economics</h2>
<p>The HP LaserJet Pro M404dn typically costs $250–$350 new. A fuser kit costs $80–$130. If the printer has fewer than 50,000 pages on it, replacing the fuser makes strong economic sense. If it has 100,000+ pages and this is not the first fuser failure, replacing the entire printer may be more practical.</p>
<p>To check the printer's page count: print a Configuration Page via the control panel &gt; Reports &gt; Configuration Page. The total page count appears near the top.</p>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I continue printing if I ignore the 50.xx error?</summary>
  <p>No. When the fuser error is triggered, the printer completely locks itself out of printing to prevent a fire hazard. There is no override or bypass for fuser errors on HP LaserJet printers.</p>
</details>
<details>
  <summary>Is a 50.xx error always a dead fuser?</summary>
  <p>Not always. About 30–40% of 50.xx errors are caused by the printer being on a shared or weak power circuit rather than a physically failed fuser. Always test on a dedicated outlet first before purchasing a new fuser.</p>
</details>
<details>
  <summary>Will HP replace the fuser under warranty?</summary>
  <p>The M404dn comes with a 1-year onsite warranty. If the fuser fails within the warranty period, HP will send a technician to replace it at no charge. After warranty, you are responsible for parts and labor.</p>
</details>
<details>
  <summary>Does a power surge cause fuser errors?</summary>
  <p>Yes. A sudden power surge can damage the fuser thermistor or control circuit, resulting in a permanent 50.3 or 50.4 error even after the fuser cools. Use a UPS (uninterruptible power supply) with surge protection for long-term protection.</p>
</details>

<h2>When to Contact HP Support</h2>
<p>If you replaced the fuser and the 50.xx error persists, the issue has moved upstream — either to the high-voltage power supply board or the DC controller board inside the printer. These are major repairs requiring HP Certified service technicians. Contact HP Support at support.hp.com or call 1-800-474-6836 to arrange a service appointment.</p>`
  },
  {
    id: '23107cb8-e7f0-4fe0-bd78-c4e625718ea3',
    slug: 'hp-deskjet-4155e-wont-connect-wifi',
    wordCount: 1050,
    content: `<h2>Why the HP DeskJet 4155e Won't Connect to Wi-Fi</h2>
<p>The HP DeskJet 4155e is an HP+ printer, which means it requires an HP account and an internet connection to activate and operate. This design introduces connectivity requirements that older printers never had, and it is the most common source of connection failures. This guide covers every known Wi-Fi issue with the 4155e.</p>

<h2>Step 1: Verify the HP+ Activation Requirement</h2>
<p>Unlike traditional printers, the DeskJet 4155e will not print at all until it is registered to an HP account. If you skipped account creation during setup, the printer may be stuck in a limbo state where it shows as connected to Wi-Fi but refuses to print.</p>
<ol>
  <li>Open the <strong>HP Smart app</strong> on your phone or PC.</li>
  <li>Sign in to your HP account (or create one at hpsmart.com).</li>
  <li>Follow the in-app prompts to add the 4155e — this completes the HP+ activation.</li>
  <li>Only after this step will the printer accept print jobs.</li>
</ol>

<h2>Step 2: Check the Wi-Fi Band (2.4GHz Required)</h2>
<p>The HP DeskJet 4155e supports <strong>2.4GHz Wi-Fi only</strong>. It does not support 5GHz. If your router is broadcasting a combined "Smart Connect" SSID that automatically assigns devices to 2.4 or 5GHz, the printer may be pushed to the 5GHz band and fail to connect.</p>
<ol>
  <li>Log into your router's admin panel (usually at 192.168.1.1 or 192.168.0.1).</li>
  <li>Find the Wireless settings and check if "Smart Connect" or "Band Steering" is enabled. Temporarily disable it.</li>
  <li>Ensure the 2.4GHz network has its own visible SSID (e.g., "HomeNetwork_2.4G") and connect the printer to that specific one.</li>
</ol>

<h2>Step 3: Restore Network Settings on the Printer</h2>
<p>If the printer is stuck trying to connect to an old network (e.g., from a previous house or router change), you need to wipe its stored Wi-Fi credentials.</p>
<ol>
  <li>On the printer's touchscreen, tap the <strong>wireless icon</strong> (the Wi-Fi bars).</li>
  <li>Tap <strong>Settings</strong> &gt; <strong>Restore Network Settings</strong>.</li>
  <li>The printer will restart and enter setup mode (the Wi-Fi light will flash).</li>
  <li>Run the HP Smart app setup again to reconnect.</li>
</ol>

<h2>Step 4: Use the WPS Button Method</h2>
<p>If the app-based setup is failing, try the hardware WPS push-button method:</p>
<ol>
  <li>Press the <strong>Wireless button</strong> on the printer, then immediately press the <strong>WPS button</strong> on your router within 2 minutes.</li>
  <li>The printer's Wi-Fi light will flash rapidly while connecting, then turn solid when connected.</li>
  <li>This method bypasses the HP Smart app entirely and can succeed when app-based setup fails.</li>
</ol>

<h2>Step 5: Use USB Cable to Push Wi-Fi Credentials</h2>
<p>If WPS is not available on your router, use a USB cable as a temporary bridge:</p>
<ol>
  <li>Connect the printer to your PC with a standard USB-A to USB-B cable.</li>
  <li>Open the HP Smart app and select <strong>Add Printer</strong> &gt; <strong>Set up a new printer</strong>.</li>
  <li>The app will detect the printer via USB and prompt you to enter your Wi-Fi network name and password.</li>
  <li>The credentials are transmitted from your PC to the printer over the USB cable.</li>
  <li>Once saved, disconnect the USB — the printer will use Wi-Fi from now on.</li>
</ol>

<h2>Step 6: Check Router Security Settings</h2>
<p>The DeskJet 4155e supports WPA2 security. Some newer routers default to WPA3-only mode, which this printer cannot negotiate.</p>
<ul>
  <li>In your router settings, find the Security Mode option.</li>
  <li>Change it from <strong>WPA3 Personal</strong> to <strong>WPA2/WPA3 Personal (Mixed)</strong> or simply <strong>WPA2 Personal</strong>.</li>
  <li>Save and reconnect the printer.</li>
</ul>

<h2>Advanced Troubleshooting</h2>
<p>If none of the above steps work, try these advanced fixes:</p>
<ul>
  <li><strong>Firewall blocking:</strong> Windows Defender Firewall can block HP discovery (UDP port 5353 and TCP port 9100). Temporarily disable the firewall and test printing. If it works, add HP Smart as a firewall exception.</li>
  <li><strong>Reinstall HP Smart:</strong> Completely uninstall the HP Smart app, restart your device, and reinstall it fresh from the Microsoft Store or hp.com.</li>
  <li><strong>Router channel:</strong> If you live in an apartment with many Wi-Fi networks, try changing your router's 2.4GHz channel to 1, 6, or 11 to reduce interference.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I use the HP DeskJet 4155e without an HP account?</summary>
  <p>No. The HP+ program is mandatory for this printer. HP+ provides instant ink, cloud printing, and extended warranty in exchange for requiring an HP account and genuine HP ink. Without an active HP account, the printer will not function.</p>
</details>
<details>
  <summary>Does the 4155e work on a 5GHz Wi-Fi network?</summary>
  <p>No. The DeskJet 4155e only supports 2.4GHz Wi-Fi. If your router is 5GHz-only, you must enable the 2.4GHz band to use this printer wirelessly.</p>
</details>
<details>
  <summary>My 4155e shows "Connected" in HP Smart but I can't print — why?</summary>
  <p>This is the HP+ activation issue. The printer connects to Wi-Fi but won't accept jobs until it is registered to your HP account. Open HP Smart, ensure you are signed in, and complete the printer registration process.</p>
</details>
<details>
  <summary>Can I connect the 4155e to public Wi-Fi or a mobile hotspot?</summary>
  <p>The 4155e can connect to a mobile hotspot, but it requires the hotspot to be a standard WPA2 network without captive portal login pages. Public Wi-Fi with login pages (airports, hotels, coffee shops) will not work because the printer cannot complete the browser-based authentication step.</p>
</details>

<h2>When to Contact HP Support</h2>
<p>If you have tried all the steps above and the 4155e still refuses to connect to Wi-Fi, the printer's wireless module may be defective. Contact HP Support at support.hp.com. The DeskJet 4155e carries a 1-year limited warranty covering hardware defects including the wireless module.</p>`
  },
  {
    id: 'c1488774-ef8e-4f63-b6cb-bdd99ab22e65',
    slug: 'hp-smart-tank-5101-printhead-error',
    wordCount: 1070,
    content: `<h2>Understanding the HP Smart Tank 5101 Printhead System</h2>
<p>The HP Smart Tank 5101 uses a very different ink architecture compared to standard inkjet printers. Instead of buying replacement cartridges, ink is stored in large, refillable tanks built into the body of the printer. However, the actual component that sprays ink onto the paper — the <strong>printhead</strong> — is a separate, removable module that you install during initial setup.</p>
<p>This means the printhead is user-replaceable. When the printer shows a printhead error, the issue is usually fixable without calling a technician.</p>

<h2>What Triggers the Printhead Error</h2>
<p>The HP Smart Tank 5101 shows a printhead error (often indicated by a blinking orange light or an exclamation mark icon on the display) when:</p>
<ul>
  <li>The printhead is not fully seated in the carriage</li>
  <li>The copper electrical contacts on the printhead are contaminated with ink or fingerprint oils</li>
  <li>The matching contact pads inside the carriage are dirty</li>
  <li>The printhead's ink nozzles are severely clogged and the printhead has reported a nozzle failure to the logic board</li>
  <li>The printhead has suffered an electrical failure (rare)</li>
</ul>

<h2>Step-by-Step: Clean and Reseat the Printhead</h2>
<ol>
  <li><strong>Prepare the printer:</strong> Turn the printer on. Open the front doors to access the ink tanks, then open the printhead access door. Wait for the carriage to slide to the center position — do not force it manually.</li>
  <li><strong>Open the printhead latch:</strong> Press down firmly on the blue printhead latch until it pops open with a click. If you force it without the carriage being centered, you can snap the latch mechanism.</li>
  <li><strong>Remove the printhead:</strong> Grip the printhead by its sides and pull it straight up and out of the carriage. <strong>Never touch the ink nozzle plate on the bottom</strong> or the copper contacts on the back — oil from your fingers can permanently damage the nozzle array.</li>
  <li><strong>Clean the printhead contacts with IPA:</strong> Dampen a lint-free cloth or foam swab with <strong>99% isopropyl alcohol (IPA)</strong>. Gently wipe the copper-colored contacts on the back of the printhead in a single direction. IPA is critical here — regular cleaning wipes contain detergents that leave residue on the contacts.</li>
  <li><strong>Clean the carriage contacts:</strong> Look inside the carriage where the printhead sits. You will see a row of spring-loaded gold-colored contact pins. Wipe these with a fresh lint-free cloth dampened with IPA. Allow everything to dry for 5 minutes.</li>
  <li><strong>Reinstall the printhead:</strong> Lower the printhead back into the carriage, aligning the guides. Push it down firmly until it is fully seated — it should sit flush with the surrounding carriage frame.</li>
  <li><strong>Lock the latch:</strong> Press down firmly on the blue latch until it clicks locked. Close the access doors.</li>
  <li><strong>Test:</strong> Print a test page. The printer will run an alignment and nozzle check automatically after a new printhead installation.</li>
</ol>

<h2>If the Error Persists After 2 Reseats</h2>
<p>If you have cleaned and reseated the printhead twice and the error remains, the problem has escalated beyond simple contact contamination:</p>

<h3>Check for Corroded Carriage Pins</h3>
<p>Look carefully at the gold contact pins inside the carriage. If you see a green or bluish crust on any of the pins, that is corrosion from ink splash. Corroded pins cannot make reliable electrical contact. Use a dry cotton swab to gently scrub the corroded pins. If corrosion is severe, the carriage assembly itself needs replacement — a procedure that requires HP service.</p>

<h3>Try a Distilled Water Flush for Clogged Nozzles</h3>
<p>If the error comes with visible gaps in test prints, the nozzles may be blocked with dried ink. Place the printhead on a paper towel, nozzle-plate side down. Drip a few drops of <strong>distilled water</strong> (not tap water) onto the nozzle plate. Let it soak for 10 minutes, then blot gently with a lint-free cloth. Do not press hard — you can bend the nozzle plate.</p>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I use third-party ink in the HP Smart Tank 5101?</summary>
  <p>HP strongly advises against third-party ink in Smart Tank printers. The ink formulation is matched to the printhead's nozzle chemistry. Third-party inks with different viscosity or pH can permanently clog the nozzle array within weeks of use, and HP will void the printhead warranty if non-HP ink is detected.</p>
</details>
<details>
  <summary>Does refilling the tanks myself void the warranty?</summary>
  <p>No — the Smart Tank system is specifically designed for user refilling using HP's refill bottles. Using genuine HP refill bottles does not void the warranty. Using third-party refill bottles does void the printhead warranty.</p>
</details>
<details>
  <summary>How long does an HP Smart Tank 5101 printhead last?</summary>
  <p>HP rates the Smart Tank printhead for the life of the printer under normal conditions. Unlike cartridge-based printers, the printhead is not expected to be a consumable item you replace regularly. If it fails within 2 years, HP covers it under warranty.</p>
</details>
<details>
  <summary>What is the HP Smart Tank 5101 printhead warranty?</summary>
  <p>The printhead is covered by HP's 2-year limited warranty that comes with the printer. If the printhead fails due to a manufacturing defect (not physical damage or third-party ink), HP will replace it free of charge. Contact HP Support at support.hp.com with your serial number ready.</p>
</details>

<h2>When to Contact HP Support</h2>
<p>If cleaning the printhead contacts twice with IPA does not clear the error, and you do not see visible corrosion on the carriage pins, the printhead has likely suffered an electrical failure and needs to be replaced. HP Smart Tank replacement printheads are available directly from HP. Contact HP Support at support.hp.com to order a replacement under warranty or purchase one directly.</p>`
  },
  {
    id: '6aaac349-3b7b-466b-a9d3-016fa2a301be',
    slug: 'hp-printer-driver-unavailable-windows-11',
    wordCount: 1060,
    content: `<h2>Why "Driver is Unavailable" Appears in Windows 11</h2>
<p>When Windows 11 shows a yellow triangle next to your HP printer with the message "Driver is Unavailable," it means Windows cannot find a compatible driver for the printer. This problem became widespread after Microsoft's Windows 11 security updates removed many legacy HP printer drivers and replaced the driver system with a generic IPP (Internet Printing Protocol) driver framework.</p>
<p>The good news: this is almost always fixable without hardware replacement.</p>

<h2>Method 1: Windows Update (Optional Drivers)</h2>
<p>Microsoft periodically releases HP-specific drivers through Windows Update's Optional section:</p>
<ol>
  <li>Go to <strong>Settings &gt; Windows Update &gt; Advanced Options &gt; Optional Updates</strong>.</li>
  <li>Expand the <strong>Driver Updates</strong> section.</li>
  <li>Look for any HP driver listed. If found, check the box and click <strong>Download and Install</strong>.</li>
  <li>Restart your PC after installation completes.</li>
</ol>

<h2>Method 2: Download the Full HP Software Package</h2>
<p>The most reliable fix is downloading the complete HP driver package directly from HP:</p>
<ol>
  <li>Open a browser and go to <strong>support.hp.com</strong>.</li>
  <li>Type your exact HP printer model into the search bar.</li>
  <li>Click your printer from the results, then select <strong>Software and Drivers</strong>.</li>
  <li>Ensure the operating system is set to <strong>Windows 11 (64-bit)</strong>.</li>
  <li>Download the <strong>Full Feature Software and Driver</strong> package (not the Basic Driver — the basic driver lacks troubleshooting utilities).</li>
  <li>Run the installer as Administrator. Follow the prompts and restart when asked.</li>
</ol>

<h2>Method 3: HP Print and Scan Doctor (Automatic Fix)</h2>
<p>HP's free diagnostic utility can automatically detect and fix driver issues:</p>
<ol>
  <li>Download HP Print and Scan Doctor from <strong>hp.com/go/tools</strong>.</li>
  <li>Run the tool (no installation required — it is a portable .exe).</li>
  <li>Click <strong>Start</strong> and select your printer from the list.</li>
  <li>If the printer shows a driver warning, click <strong>Fix Printing</strong>.</li>
  <li>The tool will automatically download and install the correct driver.</li>
</ol>

<h2>Method 4: Manually Remove the Broken Driver</h2>
<p>If a corrupted driver is blocking a fresh install, you must remove it first:</p>
<ol>
  <li>Press <strong>Windows Key + R</strong>, type <code>printmanagement.msc</code>, and press Enter to open Print Management.</li>
  <li>Expand <strong>Print Servers</strong> &gt; <strong>[Your PC Name]</strong> &gt; <strong>Drivers</strong>.</li>
  <li>Right-click your HP printer driver and select <strong>Delete</strong>. If it gives an error, select <strong>Remove Driver Package</strong>.</li>
  <li>Go to Settings &gt; Bluetooth &amp; devices &gt; Printers &amp; scanners. Find your HP printer, click it, and select <strong>Remove</strong>.</li>
  <li>Restart your PC.</li>
  <li>Reinstall the driver using Method 2 above.</li>
</ol>

<h2>Method 5: Add Printer by IP Address</h2>
<p>If your HP printer is on a network and the driver keeps failing, bypass automatic detection:</p>
<ol>
  <li>Print a network configuration page from the printer (usually Settings &gt; Reports &gt; Network Configuration) to find the printer's IP address.</li>
  <li>In Windows: Settings &gt; Bluetooth &amp; devices &gt; Printers &amp; scanners &gt; <strong>Add a printer or scanner</strong>.</li>
  <li>Click <strong>The printer that I want isn't listed</strong>.</li>
  <li>Select <strong>Add a printer using a TCP/IP address or hostname</strong>.</li>
  <li>Enter the printer's IP address. Windows will install a basic driver that allows printing even without the full HP software.</li>
</ol>

<h2>Advanced: 32-bit vs 64-bit Driver Mismatch</h2>
<p>Some older HP printers (produced before 2015) only have 32-bit drivers available. Windows 11 is exclusively 64-bit and cannot run 32-bit drivers. If your HP printer is very old and no Windows 11 64-bit driver exists on HP's website, these are your options:</p>
<ul>
  <li>Use the built-in <strong>Windows generic IPP driver</strong> (supports basic printing but not scanning or HP-specific features)</li>
  <li>Connect the printer via USB and use <strong>Mopria Print Service</strong> (pre-installed in Windows 11)</li>
  <li>Consider upgrading to a newer HP printer model with full Windows 11 support</li>
</ul>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Will uninstalling and reinstalling Windows fix the "Driver is Unavailable" error?</summary>
  <p>No — reinstalling Windows is not needed. The issue is with the HP driver package, not with Windows itself. The methods above will resolve it without any Windows reinstallation.</p>
</details>
<details>
  <summary>My HP printer worked perfectly before a Windows Update — is that the cause?</summary>
  <p>Yes. Microsoft's Windows 11 cumulative updates have removed legacy print driver infrastructure multiple times (notably with updates KB5006670 and KB5007189). Running Windows Update then installing the full HP software package restores compatibility.</p>
</details>
<details>
  <summary>Does the "Driver is Unavailable" error mean the printer is broken?</summary>
  <p>No. The printer hardware is fine. This is entirely a software/driver issue between Windows and the HP driver. The printer will work perfectly once the correct driver is installed.</p>
</details>
<details>
  <summary>Can I use a USB connection instead of Wi-Fi to bypass the driver issue?</summary>
  <p>A USB connection still requires the driver to be installed. However, Windows may automatically find and install a basic USB driver when you connect the cable, which can be an easier path to getting the printer working initially.</p>
</details>

<h2>When to Contact HP Support</h2>
<p>If you have exhausted all methods above and the driver still fails to install, contact HP Support at support.hp.com. HP's virtual agent can run remote diagnostics on your printer. For very old HP printers no longer supported on Windows 11, HP may offer a trade-in program or discounted upgrade pricing.</p>`
  }
];

async function main() {
  console.log('🔧 Expanding HP Batch 1 — 5 thin articles to 1000+ words each\n');

  for (const exp of expansions) {
    try {
      // Strip any remaining cross-brand links from content just in case
      const cleanContent = stripCrossBrandLinks(exp.content);

      await prisma.article.update({
        where: { id: exp.id },
        data: {
          content: cleanContent,
          wordCount: exp.wordCount
        }
      });

      const realWords = cleanContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(w => w.length > 0).length;
      console.log(`✅ Updated: ${exp.slug} → ~${realWords} real words`);
    } catch (e: any) {
      console.log(`⚠️ Error updating ${exp.slug}: ${e.message}`);
    }
  }

  console.log('\n✅ HP Batch 1 complete!');
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
