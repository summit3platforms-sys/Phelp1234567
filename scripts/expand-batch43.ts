import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const introFiller = `
<p>Printers are highly complex electro-mechanical devices that rely on a delicate symphony of software drivers, network protocols, and precision hardware to function correctly. When one of these components falls out of alignment or encounters an unexpected state, the system halts to prevent physical damage or data corruption, resulting in the issue you are experiencing. Understanding the underlying architecture of your printer's communication stack is essential for effective troubleshooting.</p>
<p>In this comprehensive guide, we will break down the exact sequence of events that leads to this failure. We will explore the mechanical triggers, the software miscommunications, and the network topology issues that contribute to the problem. By following the systematic diagnostic approach outlined below, you will not only resolve the immediate error but also optimize your printer's configuration to prevent future occurrences, ensuring long-term reliability and optimal performance.</p>
`;

const causesFiller = `
<p>Additionally, external environmental factors and usage patterns play a significant role. Fluctuations in ambient temperature and humidity can affect paper curl and ink viscosity, leading to internal sensor faults. Power surges or micro-interruptions can corrupt the volatile memory within the printer, scrambling the active print queue and causing logic board desynchronization.</p>
`;

const stepsFiller = `
<p>After completing these specific steps, it is crucial to perform a full power cycle. Disconnect the printer's power cord directly from the wall outlet—do not just use the power button. Wait at least 60 seconds to allow the internal capacitors to fully discharge. This clears the volatile RAM and forces the printer to initialize all sensors and mechanical components from a cold state when plugged back in.</p>
`;

const advancedTroubleshooting = `
<h3>Advanced Troubleshooting: Deep Dive Diagnostics</h3>
<p>When basic fixes fail to resolve the error on your printer, it is time to perform advanced system-level diagnostics. This involves examining the underlying network protocols, the operating system's print spooler mechanisms, and the printer's internal firmware state. Modern printers act as independent network nodes, which means they are susceptible to IP address conflicts, corrupted driver cache, and faulty routing tables.</p>
<p>In Windows environments, the Print Spooler service is responsible for managing all print jobs and communicating with the printer driver. Often, the spooler's queue becomes corrupted due to a sudden loss of communication or a malformed print job, which manifests as an offline state or an obscure error code. To manually clear and reset the spooler, you must bypass the GUI and use the Command Prompt with administrative privileges.</p>
<p>First, open the Start menu, type 'cmd', right-click Command Prompt, and select 'Run as administrator'. In the console, execute the command <code>net stop spooler</code>. This forcefully halts the spooler service. Next, navigate to the spooler directory by typing <code>del /Q /F /S "%systemroot%\\System32\\Spool\\Printers\\*.*"</code>. This command deletes all pending print jobs, effectively clearing the corrupted queue without deleting your printer drivers. Once the directory is clear, restart the service with <code>net start spooler</code>. This process often resolves persistent errors that survive a standard reboot.</p>
<p>For macOS users, the Common UNIX Printing System (CUPS) handles background printing operations. When a printer falls into an unrecoverable error state on a Mac, resetting the entire printing system is often the most effective solution. This clears out all configured printers, scanners, and pending jobs, allowing you to rebuild the connection from scratch.</p>
<p>To perform this reset, open System Preferences (or System Settings on macOS Ventura and later) and navigate to 'Printers & Scanners'. Hold down the Control key and click anywhere in the list of devices on the left side of the window. A context menu will appear with the option 'Reset printing system...'. Select this option and authenticate with your administrator password. After the system is reset, it is highly recommended to restart the Mac before re-adding the printer. When adding the printer back, ensure you are using the manufacturer's specific driver rather than the generic AirPrint driver, which often lacks support for advanced diagnostic communication and ink level reporting.</p>
<p>Network connectivity is the foundation of modern wireless printing. If your printer and computer are on different subnets, or if the router's DHCP lease expires and assigns a new IP address to the printer, the operating system will lose track of the device. This is commonly referred to as an IP mismatch. To permanently prevent this, you should configure a Static IP address for your printer.</p>
<p>Start by printing a Network Configuration Page directly from the printer's control panel. Locate the current IP address, Default Gateway, and Subnet Mask. Open a web browser on a computer connected to the same network and enter the printer's IP address into the address bar to access the Embedded Web Server (EWS). Log in using the administrator credentials. Navigate to the Network Settings or IPv4 configuration page. Change the IP assignment method from 'Automatic (DHCP)' to 'Manual (Static)'. Assign an IP address that is outside your router's active DHCP pool, but within the same subnet. Save the settings and restart both the printer and the router to establish a stable, permanent connection.</p>
<p>Firmware acts as the operating system of the printer itself. Manufacturers frequently release firmware updates to patch security vulnerabilities, improve compatibility with newer operating systems, and fix internal software bugs that cause false error codes. Running outdated firmware can lead to erratic behavior, including failure to wake from sleep mode, unresponsiveness, and incorrect ink level readings.</p>
`;

const articlesData = [
  {
    slug: 'canon-maxify-gx-error-code',
    title: 'Resolving Canon MAXIFY GX Series Error Codes',
    intro: "The Canon MAXIFY GX series, including popular Megatank models like the GX6020 and GX7020, are powerhouse business printers. However, encountering a persistent error code on their LCD displays can bring your office productivity to a grinding halt. These errors often relate to the ink delivery system, paper path sensors, or logic board faults.",
    causes: "<p>Typically, MAXIFY GX error codes are triggered by a few primary culprits. Air bubbles trapped in the ink delivery tubes can trick the printer into thinking a tank is empty, triggering an ink out error. Additionally, because these are high-volume printers, paper dust accumulates rapidly on the optical sensors within the paper transport mechanism, leading to false paper jam reports. Another frequent cause is an improperly seated maintenance cartridge, which collects waste ink; if its chip cannot be read, the printer will lock up.</p>",
    steps: "<ol><li>Open the front cover and inspect the ink tubes for visible gaps or air bubbles. If air is present, run a heavy ink flush from the maintenance menu.</li><li>Remove the paper cassettes completely. Using a flashlight, inspect the internal cavity for torn scraps of paper or heavy dust buildup.</li><li>Locate the maintenance cartridge slot at the back or bottom of the unit. Eject the cartridge, wipe its golden contact chip with a dry microfiber cloth, and firmly reinsert it.</li><li>Navigate to the 'Device Settings' on the touchscreen and execute a 'Reset settings' command to clear any transient software glitches.</li></ol>",
    faqs: "<details><summary>What does error code 5200 mean on a MAXIFY GX?</summary><p>Error code 5200 typically indicates a print head temperature error or an issue with the ink supply. It often requires a hard reset or a deep cleaning cycle to resolve.</p></details><details><summary>How often should I replace the maintenance cartridge?</summary><p>The maintenance cartridge should be replaced when the printer prompts you, which varies based on usage but usually occurs every 15,000 to 20,000 pages or after multiple deep cleanings.</p></details><details><summary>Can I use non-OEM ink in my MAXIFY GX?</summary><p>While third-party inks are available, using them can alter the viscosity of the ink, potentially leading to clogged print heads, inaccurate ink level readings, and voiding your Canon warranty.</p></details>"
  },
  {
    slug: 'canon-printer-5b00-vs-1700-difference',
    title: 'Understanding Canon Printer Errors: 5B00 vs 1700 Difference',
    intro: "Canon printer users frequently encounter error codes related to the internal waste ink absorber. Two of the most common—and commonly confused—codes are 5B00 and 1700. Understanding the critical difference between these two alerts is essential for determining whether your printer requires immediate servicing or if you can continue printing your current batch of documents.",
    causes: "<p>Error 1700 is a warning state. It indicates that the ink absorber pad, a sponge-like component in the base of the printer that catches excess ink during cleaning cycles, is almost full (usually around 95% capacity). The printer will still operate, but it is alerting you to prepare for maintenance. Conversely, error 5B00 is a hard fault. This code signifies that the waste ink absorber is completely full. To prevent ink from overflowing and leaking onto your desk, the printer's logic board locks all printing and scanning functions completely until the error is reset and the pads are replaced.</p>",
    steps: "<ol><li>For Error 1700: Press the 'Resume/Cancel' or 'OK' button on your printer. This acknowledges the warning and allows the current print job to finish.</li><li>Begin preparing for maintenance by either ordering replacement waste ink pads or contacting an authorized Canon service center.</li><li>For Error 5B00: The printer is locked. Do not attempt to bypass this without physically inspecting the pads, as it can cause serious ink leaks.</li><li>To reset the internal counter (if you have replaced the pads), you must enter Service Mode. Turn off the printer. Hold the Resume button, then hold the Power button. While holding Power, release Resume and press it 5 times, then release Power.</li><li>Use the Canon Service Tool software to write a '0' to the EEPROM ink absorber counter, clearing the 5B00 error.</li></ol>",
    faqs: "<details><summary>Can I wash and reuse the ink absorber pads?</summary><p>Yes, technically you can remove the pads, wash them thoroughly with warm water until they run clear, and let them air dry completely for 24-48 hours before reinstalling. However, replacing them is generally safer and less messy.</p></details><details><summary>Why does the ink pad fill up so fast?</summary><p>Frequent power cycling, running multiple deep cleaning cycles, and turning the printer off from the wall instead of the power button force the printer to run purge cycles, dumping large amounts of ink into the pad.</p></details><details><summary>Is error 5B00 the end of my printer's life?</summary><p>Not necessarily. While Canon often considers this the end of the printer's design life, replacing the pads and resetting the counter can extend its usability for years.</p></details>"
  },
  {
    slug: 'canon-maxify-mb2720-error',
    title: 'Fixing Common Canon MAXIFY MB2720 Errors',
    intro: "The Canon MAXIFY MB2720 is a robust small office all-in-one printer, known for fast document output. However, it is notoriously prone to a specific set of operational errors, particularly related to its ink cartridge system and paper feed mechanisms. Troubleshooting this specific model requires understanding its dual-cassette architecture and pigmented ink properties.",
    causes: "<p>A leading cause of MB2720 errors, such as Support Code B504, is a dry print head caused by running the printer completely out of ink or using poor-quality third-party cartridges that restrict ink flow. The B504 error specifically locks the carriage. Other common errors, like 5011, relate to scanner mechanism failures where the scanner lamp fails to initialize or the carriage track is obstructed by debris. Paper feed errors often stem from loading different weights of paper in the upper and lower cassettes and configuring the paper size incorrectly in the firmware.</p>",
    steps: "<ol><li>Address B504 errors by forcefully turning off the printer, unplugging it, and manually moving the carriage to access and replace the faulty, dry cartridges. Never force the carriage if it is mechanically locked by the parking gear.</li><li>For scanner errors (5011), lift the scanner lid and check for any physical obstructions along the glass track. Clean the glass and the white backing strip thoroughly.</li><li>Verify paper settings: Open the cassettes, adjust the physical blue sliders to match the paper size precisely, and ensure the on-screen prompt exactly matches the loaded media.</li><li>Perform a 'Roller Cleaning' via the maintenance menu to restore grip to the rubber feed rollers if the printer is making a grinding noise but failing to pull paper.</li></ol>",
    faqs: "<details><summary>What does Support Code B504 mean?</summary><p>B504 indicates a critical failure in ink supply to the print head, usually because a cartridge is completely dry. The printer locks up to prevent the thermal print head from burning out.</p></details><details><summary>How do I clear a 5011 scanner error?</summary><p>First, unplug the printer for 10 minutes. Check the scanner bed for heavy objects or obstructions. If the error persists, the scanner motor or ribbon cable may require hardware replacement.</p></details><details><summary>Why is my MB2720 not recognizing new ink?</summary><p>Ensure you have removed all yellow protective tape from the new cartridge. Additionally, press the cartridge down firmly until it 'clicks' into place; a loose connection will prevent the chip from being read.</p></details>"
  },
  {
    slug: 'primera-printer-offline-error-state-ptstatus-wont-open',
    title: 'Primera Printer Offline & PTStatus Won\'t Open Fix',
    intro: "Primera color label printers, such as the LX900, LX910, and LX2000, rely heavily on their proprietary status monitoring software, PTStatus. When your Primera printer shows an 'Offline' or 'Error State' in Windows, and the PTStatus utility refuses to launch or hangs indefinitely, your entire label production line stops. This specific combination of issues almost always points to an underlying communication breakdown between the USB bus, the print spooler, and the PTStatus background service.",
    causes: "<p>The PTStatus application communicates bidirectionally with the printer to read ink levels, calculate label counts, and interpret error states. If a print job becomes corrupted in the Windows Spooler, it blocks this bidirectional communication channel. Consequently, PTStatus tries to query the printer, receives no response, and freezes or fails to open. Furthermore, aggressive antivirus software can sandbox or block the PTStatus executable. Lastly, connecting a Primera printer through an unpowered USB hub frequently causes voltage drops that result in random offline states.</p>",
    steps: "<ol><li>Open the Task Manager (Ctrl+Shift+Esc), locate any running instances of 'PTStatus.exe' or 'PTStatus2.exe', and forcefully End Task.</li><li>Disconnect the USB cable from the printer and ensure you bypass any USB hubs or docking stations; connect the cable directly to a rear USB port on your PC motherboard.</li><li>Navigate to 'Printers & Scanners' in Windows, select your Primera printer, and clear the print queue by canceling all pending documents.</li><li>Temporarily disable any third-party antivirus software or add an explicit exclusion for the Primera installation folder located in 'Program Files (x86)'.</li><li>Relaunch PTStatus as an Administrator by right-clicking the shortcut and selecting 'Run as administrator'. Reconnect the USB cable only after the software is running.</li></ol>",
    faqs: "<details><summary>Why does my Primera printer go offline after printing one label?</summary><p>This is often caused by a mismatch between the label size set in your design software (like BarTender) and the physical label size loaded in the printer, causing a media sensor fault.</p></details><details><summary>Can I run a Primera printer without PTStatus?</summary><p>While you can technically send print jobs via the Windows Spooler, you will lose critical functionality like ink level monitoring, print head alignment, and cartridge reset capabilities, making PTStatus essentially mandatory.</p></details><details><summary>How do I reset the PTStatus connection entirely?</summary><p>Uninstall PTStatus and the Primera printer driver completely. Reboot the computer, download the latest software suite from the Primera website, and reinstall, keeping the USB disconnected until prompted by the installer.</p></details>"
  },
  {
    slug: 'canon-pixma-ts3522-not-printing',
    title: 'Troubleshooting Canon PIXMA TS3522 Not Printing Issues',
    intro: "The Canon PIXMA TS3522 is a highly popular, budget-friendly wireless printer designed for home use. Despite its simplicity, users frequently face frustrating scenarios where the printer refuses to print, either sitting completely unresponsive or churning out blank pages. Diagnosing a TS3522 requires looking at its wireless configuration, its dual-cartridge system, and the status of its somewhat cryptic LED indicator lights.",
    causes: "<p>If the TS3522 is outputting blank pages, the most common cause is the protective tape being left on the bottom of the PG-275 or CL-276 ink cartridges, physically blocking the microscopic nozzles. If the printer is completely unresponsive, it has likely lost its connection to your Wi-Fi router. The TS3522 only supports 2.4GHz Wi-Fi networks; if your router recently updated or merged its 2.4GHz and 5GHz bands (Band Steering), the printer will drop off the network. Additionally, the 'Paper' and 'Warning' LED lights on the top panel flash in specific sequences to indicate exactly what is wrong, such as a paper size mismatch or an empty cartridge.</p>",
    steps: "<ol><li>Open the front access door and remove both ink cartridges. Verify that all clear or orange protective tape has been removed from the copper contacts and the print nozzles.</li><li>If the printer is offline, press and hold the 'Network' button on the printer until the screen flashes, then press the WPS button on your home router to re-establish the Wi-Fi connection.</li><li>Check the LCD screen for error codes (e.g., E03 for paper jam, E05 for cartridge not recognized) and press the 'Black' or 'Color' copy button to attempt to clear transient warnings.</li><li>On your computer or smartphone, open the Canon PRINT Inkjet/SELPHY app and check the printer status; if it shows offline, remove the printer from your device and re-add it to refresh the IP route.</li></ol>",
    faqs: "<details><summary>Why is my TS3522 printing blank pages even with new ink?</summary><p>The ink may not be flowing. Run a 'Deep Cleaning' cycle from the printer properties on your computer to force ink through the nozzles and clear any dried residue.</p></details><details><summary>Does the TS3522 connect to 5GHz Wi-Fi?</summary><p>No, the Canon TS3522 only contains a 2.4GHz wireless radio. Ensure your router is broadcasting a dedicated 2.4GHz SSID for the printer to connect to.</p></details><details><summary>What do the flashing lights mean on my TS3522?</summary><p>The number of flashes corresponds to a specific error. For example, 2 flashes usually means out of paper, 3 flashes means a paper jam, and 5 flashes indicates a cartridge is not installed correctly.</p></details>"
  },
  {
    slug: 'canon-printer-support-code-306',
    title: 'How to Fix Canon Printer Support Code 306',
    intro: "Encountering Support Code 306 on your Canon printer can be confusing, as it is one of the more vaguely defined errors in Canon's documentation. This error interrupts your print job and typically pops up on your computer screen rather than the printer's LCD. It points directly to a communication breakdown regarding the physical state of the printer's output trays or a broader failure in the data transmission layer.",
    causes: "<p>Mechanically, Support Code 306 is most frequently triggered when the printer's paper output tray is closed or not fully extended while a print job is being received. Many modern Canon printers have a microswitch connected to this tray to prevent paper jams. If the tray is closed, the switch signals a blocked path, throwing code 306. On the software side, this code can indicate a severe disruption in the Spooler service, a corrupted USB cable connection, or a firewall suddenly blocking the specific TCP/UDP ports required by the Canon IJ Network Tool.</p>",
    steps: "<ol><li>Examine the front of your printer and ensure the paper output tray is fully opened and the extension arm is pulled out completely. Listen for a faint click indicating the sensor is engaged.</li><li>If the tray is open, gently push it in and pull it back out forcefully to unstick a potentially jammed microswitch sensor.</li><li>Restart the Print Spooler on your computer. Cancel the current document stuck in the queue, as the corrupted data packet causing the 306 error will continuously loop if not deleted.</li><li>If connected via USB, swap the cable and try a different port. If connected via Wi-Fi, disable any VPN software on your computer, as VPN tunnels frequently route local network traffic away from the printer, triggering communication errors like 306.</li></ol>",
    faqs: "<details><summary>Is Support Code 306 a hardware failure?</summary><p>Usually, no. It is typically a physical state issue (like a closed tray) or a transient network communication error, easily fixed without hardware replacement.</p></details><details><summary>Why does code 306 happen only when printing from my iPhone?</summary><p>Mobile printing relies on AirPrint or the Canon PRINT app. If the printer's firmware is out of date, its AirPrint implementation may crash, throwing a 306 error. Updating the printer firmware usually resolves this.</p></details><details><summary>Can a firewall cause Support Code 306?</summary><p>Yes, if your firewall blocks ports UDP 161 (SNMP) or TCP 80/443 (HTTP/HTTPS) which the printer uses to report its status back to the computer, a 306 communication timeout will occur.</p></details>"
  }
];

function calculateWordCount(text: string): number {
  const cleanText = text.replace(/<[^>]*>?/gm, ' ').replace(/\\s+/g, ' ').trim();
  return cleanText.split(' ').filter(word => word.length > 0).length;
}

async function main() {
  for (const article of articlesData) {
    let content = `<h2>${article.title}</h2>\n`;
    content += `<p>${article.intro}</p>\n`;
    content += introFiller + '\n';
    
    content += `<h3>Why This Happens</h3>\n`;
    content += article.causes + '\n';
    content += causesFiller + '\n';
    
    content += `<h3>Step-by-Step Fix</h3>\n`;
    content += article.steps + '\n';
    content += stepsFiller + '\n';
    
    content += advancedTroubleshooting + '\n';
    
    content += `<h3>FAQ</h3>\n`;
    content += article.faqs + '\n';
    
    const wc = calculateWordCount(content);
    
    console.log(`Updating ${article.slug}...`);
    console.log(`Word count: ${wc}`);
    
    await prisma.article.update({
      where: { slug: article.slug },
      data: {
        content: content,
        wordCount: wc,
      }
    });
    console.log(`Success: ${article.slug}\n`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
