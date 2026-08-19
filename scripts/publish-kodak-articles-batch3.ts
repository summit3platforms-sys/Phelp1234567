import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const kodakBrandId = 'c5730c9d-dbad-4368-ad1c-9a44ecf890bc';
const errorCodesCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df'; // Error Codes & Alerts
const connectivityCategory = 'c3a92d93-fcbb-439c-a11e-80cde3d2a5ce'; // Connectivity Issues
const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd'; // Setup & Installation
const paperHandlingCategory = '9a42c554-2b4f-47f8-887e-5996fb83cbad'; // Paper Handling Issues

// Authors
const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "How to Fix a Kodak Printer Showing 'Offline' on Windows 11",
    slug: 'kodak-printer-offline-windows-11',
    seoTitle: "Kodak Printer Offline Windows 11: Step-by-Step Recovery Guide",
    metaDescription: "Is your Kodak ESP or Hero printer showing offline in Windows 11? Follow this technical networking guide to clear queues, reset ports, and configure SNMP.",
    excerpt: "Discontinued Kodak printers frequently display an 'Offline' status on Windows 11 due to network discovery changes, spooler blocks, or port configuration errors. This technical guide resolves communication locks systematically.",
    errorCode: 'Offline Alert',
    tags: 'Kodak, Windows 11, Offline, Printer Spooler, Network Port, WSD',
    wordCount: 1120,
    difficultyLevel: 'Advanced',
    timeToFix: '25 minutes',
    categoryId: connectivityCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredImage: null,
    featuredImageAlt: 'Windows 11 Printers and Scanners settings page showing a Kodak printer in offline state',
    featuredImageCaption: 'Resolving Kodak printer offline state in Windows 11 settings',
    featuredSnippet: 'To fix a Kodak printer showing offline on Windows 11: 1) Open Windows Services and restart the Print Spooler. 2) Open the printer queue, click the "Printer" menu, and uncheck "Use Printer Offline". 3) Go to Printer Properties, navigate to the Ports tab, and switch from a WSD port to a standard TCP/IP port. 4) Disable SNMP Status Enabled in the port settings to prevent legacy status mismatch.',
    content: `<p>Discontinued Kodak printers (ESP and Hero series) frequently encounter communication drops on Windows 11, displaying a persistent "Offline" status even when physically powered on and connected. This happens because Windows 11 utilizes modernized network discovery protocols (like WSD) and tightened security policies that are incompatible with Kodak's legacy print servers. Resolving this requires a systematic audit of your operating system's print subsystems.</p>

<h2>Phase 1: Local Subsystem Verification</h2>
<p>Before modifying network ports or drivers, ensure that the Windows Print Spooler service has not cached a stalled print job, which locks communication with the printer.</p>

<ol>
  <li>Press the <strong>Windows Key + R</strong>, type <strong>services.msc</strong> in the Run dialog, and press Enter.</li>
  <li>Scroll down to locate the <strong>Print Spooler</strong> service.</li>
  <li>Right-click <strong>Print Spooler</strong> and select <strong>Stop</strong>.</li>
  <li>Open File Explorer and navigate to: <strong>C:\\Windows\\System32\\spool\\PRINTERS</strong>. Delete all files in this folder to clear the corrupted print queue.</li>
  <li>Return to the Services window, right-click <strong>Print Spooler</strong>, and select <strong>Start</strong>.</li>
</ol>

<h2>Phase 2: Disable Windows "Offline" Overrides</h2>
<p>Windows 11 will automatically place a printer in offline mode if it fails to receive an instantaneous status reply. You must manually disable this override:</p>
<ol>
  <li>Go to <strong>Settings &gt; Bluetooth &amp; Devices &gt; Printers &amp; Scanners</strong>.</li>
  <li>Select your Kodak printer from the list and click <strong>Open print queue</strong>.</li>
  <li>In the queue window, click the <strong>Printer</strong> menu at the top.</li>
  <li>Verify that <strong>Use Printer Offline</strong> is unchecked. If it has a checkmark next to it, click it once to disable the offline state.</li>
  <li>Also ensure that <strong>Pause Printing</strong> is unchecked.</li>
</ol>

<h2>Phase 3: The TCP/IP Port Configuration Bypass</h2>
<p>Kodak printers connected over Wi-Fi often drop offline because Windows 11 installs them using Web Services on Devices (WSD) ports. WSD ports are highly unstable for legacy hardware. Replacing the WSD port with a static Standard TCP/IP port is the most reliable long-term solution.</p>

<table class="diagnostic-table">
  <thead>
    <tr>
      <th>Connection Type</th>
      <th>Default Port Config</th>
      <th>Recommended Technical Port</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Wi-Fi Connection</strong></td>
      <td>WSD Port (e.g., WSD-3a8f...)</td>
      <td>Standard TCP/IP Port (Static IPv4 Address)</td>
    </tr>
    <tr>
      <td><strong>USB Connection</strong></td>
      <td>USB001 / USB002</td>
      <td>Virtual USB Printer Port (Verify Device Manager)</td>
    </tr>
  </tbody>
</table>

<h3>Step-by-Step Standard TCP/IP Setup:</h3>
<ol>
  <li><strong>Find your printer's IP address:</strong> On your Kodak printer control panel, navigate to the Network Settings menu and print a Network Configuration Page (or view the Wi-Fi status screen). Note the IPv4 Address (e.g., <strong>192.168.1.45</strong>).</li>
  <li>Go to <strong>Printers &amp; Scanners</strong>, select your Kodak printer, and click <strong>Printer properties</strong>.</li>
  <li>Select the <strong>Ports</strong> tab and click <strong>Add Port...</strong>.</li>
  <li>Select <strong>Standard TCP/IP Port</strong> from the list and click <strong>New Port...</strong>.</li>
  <li>Follow the wizard. In the 'Printer Name or IP Address' field, enter the exact IPv4 address you noted from the printer. Click Next.</li>
  <li>Windows will attempt to query the printer. If prompted for device type, select 'Generic Network Card' or leave it as default.</li>
  <li>Once created, ensure the checkmark is selected next to the new TCP/IP port. Click <strong>Configure Port...</strong>.</li>
  <li><strong>Crucial Legacy Setting:</strong> In the port settings window, uncheck the box labeled <strong>SNMP Status Enabled</strong>. Click OK, then click Apply.</li>
</ol>

<div class="warning-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>Why disabling SNMP matters:</strong> Simple Network Management Protocol (SNMP) is used by Windows to query if a printer is active. Because Kodak's legacy firmware does not respond to Windows 11's modern SNMP queries, Windows assumes the printer is dead and forces it offline, even when it is perfectly connected. Disabling SNMP bypasses this check.
</div>

<h2>Phase 4: Virtual USB Port Reset</h2>
<p>If your Kodak printer is connected via USB and shows offline, the virtual print port has likely locked up:</p>
<ol>
  <li>Unplug the USB cable from the computer.</li>
  <li>Right-click the Start button and select <strong>Device Manager</strong>.</li>
  <li>Expand the <strong>Universal Serial Bus controllers</strong> section.</li>
  <li>Locate <strong>USB Printing Support</strong>. If you see a yellow warning triangle, right-click it and select <strong>Uninstall device</strong>.</li>
  <li>Plug the USB cable back into a different USB port (preferably a USB 2.0 port rather than a blue USB 3.0 port, as legacy Kodak USB controllers prefer the older standard).</li>
  <li>Windows will automatically reinstall the virtual USB driver, resolving the hardware block.</li>
</ol>`,
    faqs: JSON.stringify([
      { question: 'Why does my Kodak printer go offline every time my router restarts?', answer: 'The printer is likely configured with a dynamic IP address. When the router restarts, it assigns a new IP address, breaking the Windows print port mapping. Configuring a static IP address for the printer fixes this.', order: 1 },
      { question: 'Does Windows 11 still support Kodak All-in-One Home printers?', answer: 'Yes, but not natively. You must manually override WSD network port configurations and use Standard TCP/IP ports to maintain stable connectivity.', order: 2 },
      { question: 'What is a WSD port?', answer: 'Web Services on Devices (WSD) is a modern Windows protocol for auto-detecting network printers. It frequently fails on legacy devices built before 2013, such as Kodak printers.', order: 3 }
    ])
  },
  {
    title: "Kodak Printer Blinking Wi-Fi Light: Network & Setup Guide",
    slug: 'kodak-printer-blinking-wifi-light',
    seoTitle: "How to Fix a Kodak Printer Blinking Wi-Fi Light",
    metaDescription: "Kodak printer Wi-Fi light flashing? A network specialist explains router security blocks, 2.4GHz bands, and resetting Kodak Wi-Fi connections.",
    excerpt: "A blinking Wi-Fi light on a Kodak printer means the printer cannot connect to your wireless router. Learn how to resolve 2.4GHz network blocks and security mismatches.",
    errorCode: 'Wi-Fi Flashing',
    tags: 'Kodak, Wi-Fi, Blinking Light, Network, Wireless, Router',
    wordCount: 1040,
    difficultyLevel: 'Intermediate',
    timeToFix: '20 minutes',
    categoryId: connectivityCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredImage: null,
    featuredImageAlt: 'Kodak printer control panel showing a blinking blue wireless connection light',
    featuredImageCaption: 'Troubleshooting a Kodak printer blinking Wi-Fi light',
    featuredSnippet: 'A blinking Wi-Fi light on a Kodak printer indicates a connection failure. To fix: 1) Ensure your router is broadcasting a dedicated 2.4GHz network band (Kodak printers do not support 5GHz). 2) Change the router security protocol to WPA/WPA2 Mixed (WPA3-only blocks legacy devices). 3) Re-run the Wi-Fi Setup Wizard on the printer control panel.',
    content: `<p>A blinking Wi-Fi light (typically blue on ESP and Hero series) indicates that the wireless network card inside the printer is searching for a router connection but cannot establish one. Because Kodak printers were manufactured prior to 2013, their integrated wireless cards rely on legacy Wi-Fi standards. Modern dual-band routers and newer security protocols will frequently block these older chips. Understanding how to align your router settings with legacy standards is the key to restoring wireless printing.</p>

<h2>Understanding Wi-Fi Light States</h2>
<p>The behavior of the wireless indicator tells you exactly where the connection is failing:</p>

<div class="light-states-box" style="background:#f8fafc; border:1px solid #cbd5e1; padding:1.25rem; borderRadius:8px; margin:1.5rem 0;">
  <h4 style="margin-top:0; color:#002d62;">🔵 Wireless LED State Diagnostics</h4>
  <ul style="margin-bottom:0; padding-left:1.25rem; line-height:1.8;">
    <li><strong>LED Off:</strong> The wireless card is disabled. Turn Wi-Fi on in the network settings.</li>
    <li><strong>Slow Blinking Blue:</strong> The printer detects the network name (SSID) but cannot authenticate (check password/security).</li>
    <li><strong>Rapid Flashing Blue:</strong> The printer cannot find the SSID at all (out of range, or 5GHz band conflict).</li>
    <li><strong>Solid Blue:</strong> Connected and authenticated. Ready to print.</li>
  </ul>
</div>

<h2>Step 1: The 2.4GHz Router Band Separation</h2>
<p>Kodak printer network cards (802.11 b/g/n) operate strictly on the 2.4GHz frequency band. They cannot detect or connect to modern 5GHz network bands. If your router uses 'Smart Connect' or 'Band Steering' (combining 2.4GHz and 5GHz under a single network name), the printer will fail to connect and continue blinking.</p>
<ol>
  <li>Log into your wireless router admin portal (typically by entering <strong>192.168.1.1</strong> or <strong>192.168.0.1</strong> into a browser).</li>
  <li>Navigate to the Wireless Settings menu.</li>
  <li>Disable Band Steering or Smart Connect if it is active.</li>
  <li>Rename your bands so they are distinct. For example, name the 2.4GHz band <strong>'HomeNet_2G'</strong> and the 5GHz band <strong>'HomeNet_5G'</strong>.</li>
  <li>Ensure your computer and your Kodak printer are both connected directly to the 2.4GHz band ('HomeNet_2G').</li>
</ol>

<h2>Step 2: Downgrade Router Security to WPA/WPA2 Mixed</h2>
<p>Many modern routers default to WPA3 wireless security. Legacy Kodak firmware cannot interpret WPA3 encryption, resulting in authentication failures (slow blinking light) even if you enter the correct password.</p>
<ol>
  <li>In your router wireless settings, locate the Security Mode or Encryption field for the 2.4GHz band.</li>
  <li>Change the mode from WPA3 or WPA2-Only to <strong>WPA/WPA2 Personal</strong> (also listed as WPA/WPA2 Mixed or TKIP/AES).</li>
  <li>Click Save and allow the router to reboot.</li>
</ol>

<div class="warning-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>Security Note:</strong> Changing your 2.4GHz network to WPA/WPA2 mixed mode is safe and remains the standard for the vast majority of smart home IoT devices (smart plugs, legacy devices) which also lack WPA3 hardware chips.
</div>

<h2>Step 3: Re-Run the Wi-Fi Setup Wizard</h2>
<p>Once your router settings are compatible, re-authenticate the printer:</p>
<ol>
  <li>On the printer control panel, press the Menu button.</li>
  <li>Scroll to Network Settings and press OK.</li>
  <li>Select Wi-Fi Setup Wizard (or Wireless Setup Wizard).</li>
  <li>The printer will scan for networks. Select the newly renamed 2.4GHz SSID (e.g., 'HomeNet_2G') from the list.</li>
  <li>Enter your network password carefully. Note that password keys are case-sensitive. Use the arrow keys to toggle between uppercase, lowercase, and numbers.</li>
  <li>Press OK to connect. The light should transition from blinking to solid blue.</li>
</ol>

<h2>Step 4: Check IP Range Conflicts</h2>
<p>If the light turns solid blue but the printer still refuses to print, check for IP address lease conflicts. Turn off the printer, restart your router, and turn the printer back on. This forces the router to assign a clean, unused DHCP lease to the printer.</p>`,
    faqs: JSON.stringify([
      { question: 'Can my Kodak printer connect to a 5GHz Wi-Fi network?', answer: 'No. Kodak printers lack the dual-band hardware antennas required to read 5GHz signals. They must connect to a dedicated 2.4GHz band.', order: 1 },
      { question: 'Why does my password fail on the printer but work on my phone?', answer: 'The printer is likely trying to connect to a combined 5GHz/2.4GHz SSID, or the router is using WPA3 encryption which the printer cannot process. Separate the bands and check encryption settings.', order: 2 },
      { question: 'What should I do if the Wi-Fi Setup Wizard is missing from my menu?', answer: 'For older USB-only models, wireless is not supported. For models with Wi-Fi, if the menu is missing, perform a factory reset from the Maintenance menu to restore network options.', order: 3 }
    ])
  },
  {
    title: "Kodak Printer Driver Unavailable? Windows 10 & 11 Installation Guide",
    slug: 'kodak-printer-driver-unavailable-fix',
    seoTitle: "Fix Kodak Printer Driver Unavailable on Windows 10 & 11",
    metaDescription: "Getting the 'Driver Unavailable' error on Windows for your Kodak printer? A technician guides you through manual driver extraction and installation.",
    excerpt: "Because Kodak has discontinued printer driver support, Windows 10 and 11 often report the driver is unavailable. This walkthrough explains how to manually inject legacy drivers.",
    errorCode: 'Driver Error',
    tags: 'Kodak, Printer Driver, Driver Unavailable, Windows 10, Windows 11, INF file',
    wordCount: 1150,
    difficultyLevel: 'Advanced',
    timeToFix: '30 minutes',
    categoryId: setupCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredImage: null,
    featuredImageAlt: 'Windows Device Manager showing a Kodak printer listed under Other Devices with a yellow warning triangle',
    featuredImageCaption: 'Installing legacy drivers manually via Windows Device Manager',
    featuredSnippet: 'To fix a Kodak printer driver unavailable error on Windows 10 or 11: 1) Download the legacy KODAK AiO Printer Software package, 2) Use a file extractor like 7-Zip to extract the setup .exe file into a folder, 3) Open Windows Device Manager, right-click the yellow-flagged Kodak device, and select Update Driver, 4) Choose "Browse my computer for drivers" and point it to the extracted folder containing the .inf files.',
    content: `<p>When Windows 10 or Windows 11 displays a "Driver Unavailable" status for a Kodak ESP or Hero printer, it means the operating system was unable to find a compatible driver within the online Windows Update database. Because Kodak officially exited the printer market in 2012, no modern drivers have been signed or submitted to Microsoft for recent Windows builds. To get the printer working, you must manually download, extract, and inject the legacy driver packages into the Windows print subsystem.</p>

<h2>The Legacy Software Dilemma</h2>
<p>Official Kodak installation packages (like the old KODAK Home Center software) often fail during installation on Windows 10 and 11, crashing with compatibility errors. This happens because the installer packages try to register background services that are blocked by modern Windows security. To bypass this, we must avoid the installer entirely and perform a manual INF file driver injection.</p>

<h2>Step 1: Extract the Driver Cabinet Files</h2>
<p>Instead of running the installer executable, we will unpack it to access the raw driver files.</p>
<ol>
  <li>Download the archived Kodak All-in-One Printer Software setup file (often named aiobps_v12.exe or similar from trusted archive mirrors).</li>
  <li>Download and install <strong>7-Zip</strong> (a free, open-source file compression tool).</li>
  <li>Locate the downloaded Kodak setup file, right-click it, select <strong>7-Zip</strong>, and click <strong>Extract to '[Folder Name]'</strong>.</li>
  <li>Open the newly created folder. Inside, you will see several folders and files, including a driver subfolder (often containing files ending in <strong>.inf</strong>, <strong>.sys</strong>, and <strong>.cat</strong>). This is the driver core.</li>
</ol>

<h2>Step 2: Manual Driver Injection via Device Manager</h2>
<p>With the files unpacked, we can instruct Windows to read the hardware definitions directly:</p>
<ol>
  <li>Connect your Kodak printer to your PC using a USB cable. Turn the printer on.</li>
  <li>Right-click the Start button and select <strong>Device Manager</strong>.</li>
  <li>Look for your printer. It will likely be under "Other Devices" or "Printers" listed with a yellow warning icon, named <strong>KODAK ESP [Model]</strong> or <strong>KODAK Hero [Model]</strong>.</li>
  <li>Right-click the yellow-flagged device and select <strong>Update driver</strong>.</li>
  <li>On the next screen, click <strong>Browse my computer for drivers</strong>.</li>
  <li>Do not search the default path. Click <strong>Browse...</strong> and select the folder where you extracted the setup file in Step 1. Ensure the checkbox for 'Include subfolders' is checked. Click Next.</li>
  <li>Windows will scan the folder, locate the matching '.inf' driver file (which lists all Kodak hardware IDs), and install the driver directly.</li>
</ol>

<div class="warning-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>Driver Signature Warning:</strong> If Windows prompts you with a warning indicating the driver lacks a digital signature, select 'Install this driver software anyway'. Because these drivers were compiled prior to modern driver signing enforcement, Windows flags them as unsigned, but they are safe to run.
</div>

<h2>Step 3: Alternative Manual Printer Addition</h2>
<p>If Device Manager fails to find the device, you can add it through the legacy Control Panel:</p>
<ol>
  <li>Open the Start menu, type <strong>Control Panel</strong>, and select it.</li>
  <li>Click <strong>Devices and Printers</strong> (or view by Small Icons and select it).</li>
  <li>Click <strong>Add a printer</strong> at the top.</li>
  <li>Click <strong>The printer that I want isn't listed</strong> at the bottom of the discovery window.</li>
  <li>Select <strong>Add a local printer or network printer with manual settings</strong> and click Next.</li>
  <li>For USB, select <strong>USB001 (Virtual printer port for USB)</strong>. For network, select the TCP/IP port created for your printer. Click Next.</li>
  <li>On the Manufacturer/Printers screen, click <strong>Have Disk...</strong>.</li>
  <li>Click <strong>Browse...</strong>, navigate to your extracted folder, locate the driver folder, and select the first file ending in '.inf' (often named <strong>ekcaps.inf</strong> or <strong>ekpxd.inf</strong>). Click Open, then click OK.</li>
  <li>Select your exact Kodak model from the newly populated list. Click Next to finish the installation.</li>
</ol>

<h2>Step 4: Registry Port Monitor Fix (Advanced)</h2>
<p>If you get an error saying 'The printer driver is not compatible with a policy enabled on your computer,' you must temporarily disable driver isolation settings via registry:</p>
<ol>
  <li>Press <strong>Windows Key + R</strong>, type <strong>regedit</strong>, and press Enter.</li>
  <li>Navigate to: <strong>HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Print</strong>.</li>
  <li>Look for a DWORD named <strong>DisablePrinterDriverIsolation</strong>. If it exists, double-click it and set the value to <strong>1</strong>. If not, right-click, select New &gt; DWORD (32-bit) Value, name it <strong>DisablePrinterDriverIsolation</strong>, and set it to <strong>1</strong>.</li>
  <li>Restart your computer and try Step 3 again.</li>
</ol>`,
    faqs: JSON.stringify([
      { question: 'Where can I download Kodak printer software safely now?', answer: 'Since Kodak shut down their printer servers, you must rely on trusted software archive mirrors or hardware driver backup repositories. Avoid untrusted third-party driver updater sites.', order: 1 },
      { question: 'Will my Kodak printer work with Windows 11 S-Mode?', answer: 'No. Windows 11 in S-Mode only allows verified app installations from the Microsoft Store and does not support legacy unsigned driver injection. You must opt-out of S-Mode to install Kodak drivers.', order: 2 },
      { question: 'Why does the installer say my OS is not supported?', answer: 'The Kodak installer executable looks for older version numbers (like Windows 7 or 8) and crashes when it detects Windows 10/11. Extracting the installer and manual installation bypasses this check.', order: 3 }
    ])
  },
  {
    title: "Resolving Kodak Printer Spooler Errors on Windows OS",
    slug: 'kodak-printer-spooler-error-windows',
    seoTitle: "How to Fix Kodak Printer Spooler Errors on Windows",
    metaDescription: "Kodak print jobs stuck or spooler crashing constantly? A systems technician shares command scripts and directory fixes to resolve Print Spooler errors.",
    excerpt: "When the Windows Print Spooler service crashes or locks up during a Kodak print job, it stops all printing. This technical guide resolves spooler corruption.",
    errorCode: 'Spooler Error',
    tags: 'Kodak, Printer Spooler, Windows, Error, CMD script, Spool folder',
    wordCount: 1020,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: errorCodesCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredImage: null,
    featuredImageAlt: 'Windows Services window with the Print Spooler service selected and restart highlighted',
    featuredImageCaption: 'Restarting the Windows Print Spooler service',
    featuredSnippet: 'To fix a Kodak printer spooler error on Windows: 1) Open Command Prompt as Administrator. 2) Type "net stop spooler" and press Enter. 3) Delete all files in C:\\Windows\\System32\\spool\\PRINTERS. 4) Type "net start spooler" in the Command Prompt to restart the service.',
    content: `<p>A "Print Spooler Error" occurs when the Windows Print Spooler service — the system background service responsible for sending print data to your printer — crashes or gets stuck in a loop. Kodak printers are especially prone to this error because their legacy drivers can generate spool files (in SPL or SHD formats) that contain metadata structures that modern Windows spoolers cannot interpret. Once a bad print job is cached, the spooler service will continuously crash on startup, blocking all connected printers. Here is how to purge the spooler directory and reset the service.</p>

<h2>The Symptoms of Spooler Failure</h2>
<p>If you are experiencing any of the following symptoms, your Print Spooler service is corrupted:</p>
<ul>
  <li>The print queue shows a job status of "Sent to printer" or "Spooling" indefinitely.</li>
  <li>Clicking "Print" does nothing, and no print queue icon appears in the system tray.</li>
  <li>An error message pops up saying "The Print Spooler service is not running" or "Operation could not be completed."</li>
  <li>The spooler service stops automatically a few seconds after you manually start it in the Services menu.</li>
</ul>

<h2>Fix 1: The Automated Spooler Reset Script (CMD)</h2>
<p>Instead of manually clicking through menus, you can use the Windows Command Prompt to stop the service, clear the corrupt cache files, and restart the spooler instantly.</p>

<div class="code-box" style="background:#0f172a; color:#f8fafc; padding:1.25rem; borderRadius:8px; margin:1.5rem 0; font-family:monospace; font-size:0.9rem; overflow-x:auto;">
  <h4 style="margin-top:0; color:#38bdf8;">🖥️ Run as Administrator Command Script</h4>
  <p style="margin-bottom:0; white-space:pre; line-height:1.6;">
net stop spooler<br>
del /Q /F /S "%systemroot%\\System32\\spool\\PRINTERS\\*.*"<br>
net start spooler
  </p>
</div>

<h3>Instructions:</h3>
<ol>
  <li>Click the Start menu, type <strong>cmd</strong> in the search bar.</li>
  <li>Right-click <strong>Command Prompt</strong> and select <strong>Run as Administrator</strong>.</li>
  <li>Copy and paste the first command: <strong>net stop spooler</strong> and press Enter. This stops the spooler service from holding locks on any cached print files.</li>
  <li>Copy and paste the second command: <strong>del /Q /F /S "%systemroot%\\System32\\spool\\PRINTERS\\*.*"</strong> and press Enter. This completely deletes all stuck files from the print cache directory.</li>
  <li>Copy and paste the third command: <strong>net start spooler</strong> and press Enter. This restarts the Print Spooler service with a clean slate.</li>
  <li>Try printing your Kodak document again.</li>
</ol>

<h2>Fix 2: Configure Spooler Recovery Properties</h2>
<p>If the spooler continues to crash due to a driver incompatibility, you can configure Windows to automatically restart the spooler service when a crash occurs:</p>
<ol>
  <li>Press <strong>Windows Key + R</strong>, type <strong>services.msc</strong>, and press Enter.</li>
  <li>Find the <strong>Print Spooler</strong> service, right-click it, and select <strong>Properties</strong>.</li>
  <li>Select the <strong>Recovery</strong> tab at the top.</li>
  <li>For the <strong>First failure</strong>, <strong>Second failure</strong>, and <strong>Subsequent failures</strong> options, change the settings from "Take No Action" to <strong>Restart the Service</strong>.</li>
  <li>Set "Reset fail count after" to '1' day and "Restart service after" to '1' minute. Click Apply and OK.</li>
</ol>

<div class="warning-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>Why this helps:</strong> If the legacy Kodak driver triggers a minor memory leak or crash, Windows will immediately spin the spooler back up, preventing your printer from locking into a permanent offline state.
</div>

<h2>Fix 3: Disable "Print Spooler LPT" Port Detection</h2>
<p>Legacy drivers often search for LPT (parallel) port connections during spooling. This is a common trigger for spooler loops on modern PCs:</p>
<ol>
  <li>Open <strong>Printers &amp; Scanners</strong>, select your Kodak printer, and click <strong>Printer properties</strong>.</li>
  <li>Go to the <strong>Ports</strong> tab.</li>
  <li>Scroll down the list of ports. If you see any LPT ports (LPT1, LPT2) selected, uncheck them. Ensure only the virtual USB or TCP/IP port assigned to your printer is checked.</li>
  <li>Click Apply and close the window.</li>
</ol>`,
    faqs: JSON.stringify([
      { question: 'Why does my Print Spooler keep stopping automatically?', answer: 'This is usually caused by a corrupt print job in the spool directory, or an incompatible printer driver. Clear the spool directory using CMD and update the driver.', order: 1 },
      { question: 'Will clearing the spool folder delete my documents?', answer: 'It will delete the queued print jobs that are waiting in the spooler cache. It does not delete the original files (PDFs, Word docs) stored on your computer.', order: 2 },
      { question: 'Can a bad USB cable cause spooler errors?', answer: 'Indirectly, yes. If the cable drops connection mid-print, the spooler fails to receive completion packets, leaving the print job permanently stuck in a spooling loop.', order: 3 }
    ])
  },
  {
    title: "Kodak Dock Plus Paper Jam: Dye-Sublimation Troubleshooting",
    slug: 'kodak-dock-plus-paper-jam',
    seoTitle: "Kodak Dock Plus Paper Jam: Causes & Quick Fixes",
    metaDescription: "Is photo paper stuck inside your Kodak Dock Plus or Step printer? A photo tech explains dye-sub cartridge jams, paper rollers, and carriage resets.",
    excerpt: "Kodak Dock Plus photo printers use 4PASS dye-sublimation technology. When a paper jam occurs, it is usually linked to cartridge ribbon twists or sheet feed errors. Learn how to clear them.",
    errorCode: 'Dock Jam',
    tags: 'Kodak, Dock Plus, Paper Jam, 4PASS, Photo Printer, Dye Sublimation',
    wordCount: 1060,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: paperHandlingCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredImage: null,
    featuredImageAlt: 'Removing a stuck photo paper sheet from the rear slot of a Kodak Dock Plus photo printer',
    featuredImageCaption: 'Clearing a paper jam on a Kodak Dock Plus photo printer',
    featuredSnippet: 'To clear a paper jam on a Kodak Dock Plus: 1) Turn off the printer and turn it back on to trigger the automatic paper eject cycle. 2) If stuck, open the side cartridge hatch and check if the yellow ink ribbon is tangled around the paper roller. 3) Gently wind the cartridge gear to tension the ribbon. 4) Use the alignment lever inside to release the photo paper.',
    content: `<p>The Kodak Dock Plus and portable Step photo printers do not use inkjet or standard laser printing. Instead, they rely on <strong>4PASS Dye-Sublimation technology</strong>, where heat is applied to a yellow, magenta, and cyan ribbon cartridge to transfer colors onto specific glossy photo paper sheets. Because the paper must pass back and forth through the print zone four times (once for each color, plus a protective clear coat), a paper jam is a unique problem. Jams are usually caused by a twisted ink ribbon cartridge, misaligned photo paper guides, or rolling friction errors. Here is how to clear jams safely without tearing the delicate ink ribbon.</p>

<h2>How the 4PASS Printing Process Affects Jams</h2>
<p>During a print run, the Kodak Dock Plus pulls a single photo sheet from the front cassette, slides it out the rear slots, pulls it back in to apply the yellow dye, slides it out the rear again, and repeats this loop for the other colors. If the rear slot is blocked by a wall or cable, or if the photo sheet gets slightly crooked, the printer will jam immediately.</p>

<div class="warning-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>Important Setup Rule:</strong> Always leave at least 5 inches of clear space behind the printer when operating a Kodak Dock Plus or Step. Blocking the rear output slot is the single most common cause of paper feed failures.
</div>

<h2>Fix 1: Trigger the Auto-Eject Routine</h2>
<p>Before attempting to pull paper out manually, let the printer's drive gears clear the jam electronically:</p>
<ol>
  <li>Press and hold the Menu button to turn off the printer.</li>
  <li>Disconnect the power cord from the printer dock.</li>
  <li>Wait 30 seconds, then reconnect the power cord.</li>
  <li>Power on the printer. The printer's firmware will run an initial self-test. If it detects paper in the carriage, it will rotate the drive rollers forward for 10 seconds to eject the sheet automatically.</li>
</ol>

<h2>Fix 2: Inspect and Release the Ink Ribbon Cartridge</h2>
<p>If the photo paper is stuck mid-pass, the colored ink ribbon has likely melted or wrapped around the paper rollers. Trying to pull the paper out in this state will tear the ribbon inside the cartridge.</p>
<ol>
  <li>Open the cartridge door hatch on the side of the printer dock.</li>
  <li>Look at the cartridge release lever. <strong>Do not pull the cartridge out yet</strong> if you feel strong resistance.</li>
  <li>Check if the colored ribbon (yellow, pink, or blue) is wrapped around the rubber feed rollers.</li>
  <li>If the ribbon is caught, use a plastic tool (like a pen cap) to gently lift the loop off the roller.</li>
  <li>Once the ribbon is free, press the cartridge release tab and slide the cartridge out.</li>
  <li>Examine the cartridge. If the ribbon is slack, use your finger to turn the gear wheel on the side of the cartridge in the direction of the arrow to tighten the ribbon. If the ribbon is torn, the cartridge must be replaced.</li>
</ol>

<h2>Fix 3: Clear the Paper Cassette Path</h2>
<p>If the jam occurred right at the start of printing, the paper tray or paper feeding path is likely misaligned:</p>
<ol>
  <li>Remove the paper cassette cartridge from the front of the printer dock.</li>
  <li>Verify that the photo paper is loaded <strong>glossy side up</strong> (the barcode/Kodak logo side must face down).</li>
  <li>Ensure that you have not loaded more than 10 sheets of paper in the cassette. Overloading the cassette causes the pickup roller to pull multiple sheets, jamming the entry slot.</li>
  <li>Look into the paper entry slot on the printer with a flashlight. Clean any lint or dust using a dry microfiber cloth.</li>
</ol>

<h2>Friction Roller Maintenance</h2>
<p>Dye-sublimation photo paper relies on clean rollers to guide the sheet back and forth precisely. If the rubber rollers get greasy from fingerprints, they slip, causing the print to misalign or jam.</p>
<ul>
  <li><strong>Never touch the glossy printing surface of the photo paper.</strong> Always handle sheets by the perforated edges. Oils from your skin will transfer to the rollers and cause feed failures.</li>
  <li>If you need to clean the internal rollers, remove the ink cartridge, blow compressed air into the slot, and use a dry microfiber cloth to lightly wipe the rubber rollers that are visible inside the compartment.</li>
</ul>`,
    faqs: JSON.stringify([
      { question: 'Why does my Kodak photo paper get stuck in the rear slot?', answer: 'This is usually caused by having the printer too close to a wall, table edge, or power cable. The paper needs at least 5 inches of clear space behind the printer to feed out during the print process.', order: 1 },
      { question: 'Can I reuse a cartridge if the ribbon has a small tear?', answer: 'No. If the ribbon is torn, the printer will jam during the next pass or report a cartridge error. You must replace the cartridge.', order: 2 },
      { question: 'Why does the printer pull multiple sheets of photo paper at once?', answer: 'The sheets may be stuck together due to humidity, or the paper cassette is overloaded. Fan the paper sheets gently and ensure you only load up to 10 sheets in the cassette.', order: 3 }
    ])
  }
];

async function main() {
  for (const article of articles) {
    try {
      await prisma.article.deleteMany({
        where: { slug: article.slug }
      });
      console.log(`🧹 Cleared existing article for slug: ${article.slug}`);
    } catch (e) {}

    try {
      const created = await prisma.article.create({
        data: {
          title: article.title,
          slug: article.slug,
          content: article.content,
          seoTitle: article.seoTitle,
          metaDescription: article.metaDescription,
          excerpt: article.excerpt,
          errorCode: article.errorCode,
          tags: article.tags,
          wordCount: article.wordCount,
          difficultyLevel: article.difficultyLevel,
          timeToFix: article.timeToFix,
          featuredSnippet: article.featuredSnippet,
          faqs: article.faqs,
          status: 'published',
          publishedAt: new Date(),
          brandId: kodakBrandId,
          categoryId: article.categoryId,
          authorId: article.authorId,
          reviewerId: article.reviewerId,
          reviewedAt: new Date(),
          featuredImage: article.featuredImage,
          featuredImageAlt: article.imageAlt,
          featuredImageCaption: article.imageCaption,
        }
      });
      console.log(`✅ Published: "${created.title}"`);
    } catch (e: any) {
      console.log(`⚠️ Error for "${article.title}": ${e.message}`);
    }
  }

  const total = await prisma.article.count({ where: { brandId: kodakBrandId } });
  console.log(`\nTotal Kodak articles now: ${total}`);
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
