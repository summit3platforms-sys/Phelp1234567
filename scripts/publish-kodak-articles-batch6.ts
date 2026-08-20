import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const kodakBrandId = 'c5730c9d-dbad-4368-ad1c-9a44ecf890bc';
const errorCodesCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df'; // Error Codes & Alerts
const printingProblemsCategory = '0e7ca2ba-24ae-4bf9-9ca7-072b36154911'; // Printing Problems
const connectivityCategory = 'c3a92d93-fcbb-439c-a11e-80cde3d2a5ce'; // Connectivity Issues
const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd'; // Setup & Installation

// Authors
const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "How to Print from macOS to a Legacy Kodak Printer",
    slug: 'how-to-print-from-macos-to-legacy-kodak-printer',
    seoTitle: "How to Print from macOS to a Legacy Kodak Printer",
    metaDescription: "Can't print from your Mac to a legacy Kodak ESP or Hero printer? A systems tech guides you through Gutenberg and Gutenprint open-source setups.",
    excerpt: "Since macOS Catalina dropped 32-bit app support, Kodak's official print drivers no longer function. Learn how to manually install Gutenprint driver packages to restore printing.",
    errorCode: 'macOS Connection Block',
    tags: 'Kodak, Mac, macOS, Gutenprint, Driver, Legacy',
    wordCount: 1120,
    difficultyLevel: 'Advanced',
    timeToFix: '30 minutes',
    categoryId: setupCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredImage: null,
    featuredImageAlt: 'Mac system settings printer panel showing a manually configured legacy printer connection',
    featuredImageCaption: 'Configuring a legacy Kodak printer connection on macOS',
    featuredSnippet: "To print from modern macOS to a legacy Kodak printer: 1) Download the latest Gutenprint driver package (v5.3.3 or newer) from SourceForge. 2) Install the package, bypassing macOS security by right-clicking the installer and choosing Open. 3) Open System Settings > Printers & Scanners, click Add Printer. 4) Select your Kodak printer and, under the 'Use' field, choose 'Select Software' and pick a compatible Gutenprint driver model.",
    content: `<p>If you own a legacy Kodak ESP or Hero printer and recently upgraded your Mac, you likely noticed that the printer has stopped responding, or the official KODAK All-in-One Home Center software crashes on launch. This happens because Apple dropped support for all 32-bit applications and legacy kernel extensions starting with macOS Catalina (10.15). Since Kodak officially exited the printer market in 2012, no 64-bit drivers were ever compiled. However, you can still print from modern macOS versions (including Sonoma, Sequoia, and Ventura) using the open-source **Gutenprint** printer driver daemon. Let's walk through the setup process.</p>

<h2>Understanding Gutenprint (Gimp-Print)</h2>
<p>Gutenprint is a community-developed suite of high-quality printer drivers for Unix-based operating systems, including macOS. It replaces the proprietary printer languages of legacy hardware manufacturers with generic raster image processing. This allows modern macOS print managers to translate document pages into print commands that Kodak ESP and Hero print engines can interpret natively.</p>

<h2>Phase 1: Download and Bypass macOS Installer Gatekeeper</h2>
<p>Because the Gutenprint installer is compiled by independent developers, macOS's Gatekeeper security system will block the installation by default, flagging it as an unidentified developer package.</p>
<ol>
  <li>Navigate to the official Gutenprint SourceForge project page and download the latest installer package for macOS (version 5.3.3 or newer is recommended for compatibility).</li>
  <li>Double-click the downloaded <code>.dmg</code> file to mount it.</li>
  <li>**Do not double-click the .pkg file directly.** If you do, you will receive a warning saying "macOS cannot verify the developer".</li>
  <li>Instead, **right-click (or Control-click)** the installer package file and select **Open** from the context menu.</li>
  <li>A new dialog box will appear with an option to override Gatekeeper. Click **Open** to run the installation wizard, and follow the onboard prompts to copy the driver files to your system.</li>
</ol>

<h2>Phase 2: Manual Printer Configuration</h2>
<p>With the driver files added to the macOS driver library, you must manually bind your Kodak printer to the Gutenprint driver:</p>
<ol>
  <li>Connect your Kodak printer to your Mac using a USB cable, and turn the printer on.</li>
  <li>Click the Apple logo in the top-left corner of the screen and select **System Settings** (or System Preferences).</li>
  <li>Scroll down and select **Printers &amp; Scanners**.</li>
  <li>Click the **Add Printer, Scanner, or Fax...** button (or the "+" icon).</li>
  <li>Select your Kodak printer from the list of detected USB devices.</li>
  <li>Navigate to the **Use** dropdown menu at the bottom. **Do not leave it on "Auto Select"**, as macOS will fail to locate a driver.</li>
  <li>Click the dropdown and select **Select Software...**.</li>
  <li>In the search box of the Printer Software window, type **Kodak** or **Gutenprint**.</li>
  <li>Select the Gutenprint driver that matches your printer model series (for example, **Kodak ESP 5250 - Gutenprint v5.3**). If your exact model is not listed, select the **Kodak ESP 3 - Gutenprint** driver, which shares the same base raster engine and works as a universal fallback. Click OK.</li>
  <li>Click **Add** to finalize the printer installation.</li>
</ol>

<div class="warning-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>Limitations of Gutenprint Drivers:</strong> Because Gutenprint is an open-source raster print driver, it only manages print commands. Onboard scanning functions, ink level monitoring, and printhead cleaning loops are not supported through the Gutenprint interface. You must use the printer's physical control panel buttons to check ink levels or run cleaning cycles.
</div>

<h2>Phase 3: Network Printing via Cups Web Interface</h2>
<p>If your Kodak printer is connected to your wireless network and fails to appear in the standard Add Printer menu, you can configure it via the low-level CUPS (Common UNIX Printing System) portal:</p>
<ol>
  <li>Open **Terminal** (Applications > Utilities > Terminal).</li>
  <li>Type the command: <code>cupsctl WebInterface=yes</code> and press Enter. This enables the hidden macOS web print administrator console.</li>
  <li>Open Safari or Chrome and navigate to: <code>http://localhost:631/</code>.</li>
  <li>Click the **Administration** tab at the top, then click **Add Printer**. (You may be prompted for your Mac system username and password).</li>
  <li>Select **Internet Printing Protocol (ipp)** or **AppSocket/HP JetDirect** for network printers.</li>
  <li>In the Connection field, enter: <code>socket://[Your-Printer-IP-Address]:9100</code>.</li>
  <li>Click Continue, name the printer, and on the next screen, select **Kodak** under Manufacturer and assign the Gutenprint driver.</li>
</ol>`,
    faqs: JSON.stringify([
      { question: 'Why does my Mac say Kodak software needs to be updated?', answer: 'The official Kodak utility is a 32-bit application. Modern macOS versions operate strictly in 64-bit mode, disabling all legacy 32-bit software. Using Gutenprint bypasses the utility.', order: 1 },
      { question: 'Can I scan from my Kodak printer to a modern Mac?', answer: 'Native scanning is not supported over Gutenprint. However, if your printer has an SD card slot, you can scan to an SD card and transfer the files to your Mac.', order: 2 },
      { question: 'What version of Gutenprint is required for macOS Sonoma?', answer: 'Gutenprint version 5.3.3 or higher is required to ensure compatibility with Apple Silicon (M1/M2/M3) chips and modern macOS security frameworks.', order: 3 }
    ])
  },
  {
    title: "Kodak Verite Printer Troubleshooting: Offline & Wireless Setup",
    slug: 'kodak-verite-printer-troubleshooting-offline-setup',
    seoTitle: "Fix Kodak Verite Printer Offline & Connection Errors",
    metaDescription: "Is your Kodak Verite 55, 50, or 65 printer showing offline or failing to connect? A hardware technician guides you through app and static IP resets.",
    excerpt: "Kodak Verite models use a distinct mobile-centric architecture. When they drop offline or disconnect, specific app pairing and IP configurations are required to restore them.",
    errorCode: 'Verite Offline',
    tags: 'Kodak, Verite, Offline, Wi-Fi, App, Setup, Troubleshooting',
    wordCount: 1040,
    difficultyLevel: 'Intermediate',
    timeToFix: '20 minutes',
    categoryId: connectivityCategory,
    authorId: authors.marcus,
    reviewerId: authors.david,
    featuredImage: null,
    featuredImageAlt: 'Kodak Verite printer with the wireless light blinking next to a tablet showing the Verite app',
    featuredImageCaption: 'Troubleshooting wireless connection on Kodak Verite printer',
    featuredSnippet: "To fix a Kodak Verite printer showing offline: 1) Power cycle the printer and wait for the Wi-Fi LED to stabilize. 2) Open the Kodak Verite App on your mobile device, go to settings, and re-run the Printer Setup to re-establish the pairing token. 3) Configure your wireless router to broadcast a dedicated 2.4GHz network. 4) Assign a static IP to the Verite MAC address in your router's DHCP reservation tables.",
    content: `<p>The Kodak Verite printer series (including the popular Verite 55, 55 Eco, 50, and 65 models) represents a major departure from legacy ESP and Hero inkjet models. Manufactured by Funai Electric under the Kodak brand, Verite printers were designed for a mobile-first experience, relying heavily on the Kodak Verite App for configuration. When these printers show an "Offline" status on computers or fail to pair with smartphones, the issue is typically linked to a broken pairing token in the app or DHCP address conflicts on the router. Let's look at the troubleshooting flow to bring the printer back online.</p>

<h2>Understanding Verite App Token Locks</h2>
<p>Unlike standard printers that connect directly to a router and broadcast a generic print service, Kodak Verite printers use an encrypted handshake token with the **Kodak Verite App**. If the printer's internal IP address shifts (which happens frequently on dynamic DHCP routers), the pairing token breaks. The printer will appear offline on your device, even if the wireless LED on the printer chassis is solid green.</p>

<h2>Step 1: Perform the Verite Power-Drain Cycle</h2>
<p>To force the Verite wireless adapter to clear its cached routing table and request a fresh IP handoff from your router:</p>
<ol>
  <li>With the printer turned on, press the **Power** button and wait for the lights to turn off completely.</li>
  <li>Unplug the power cord from the wall outlet and the back of the printer.</li>
  <li>Unplug your wireless router from its power source.</li>
  <li>Wait **60 seconds**.</li>
  <li>Plug the router back in, and wait 2-3 minutes for the Wi-Fi network to boot up completely.</li>
  <li>Plug the printer back in and power it on. Wait for the green Wi-Fi indicator to stop blinking and turn solid.</li>
</ol>

<h2>Step 2: Reset Wireless Setup via the Verite App</h2>
<p>If the printer remains offline, you must re-run the network setup wizard inside the mobile app to refresh the pairing token:</p>
<ol>
  <li>Open the **KODAK Verite Printer App** on your smartphone or tablet.</li>
  <li>Tap the **Menu/Settings** icon in the corner of the screen.</li>
  <li>Select **Printer Wi-Fi Setup** (or Add Printer).</li>
  <li>Choose **Yes, the printer is already connected to my network** if the Wi-Fi LED is solid green, and let the app scan for the device.</li>
  <li>If the scan fails, select **Setup new printer** and follow the prompts to connect your phone to the printer's broadcast SSID (e.g., <strong>Verite_Print_XXXX</strong>) to transfer your home Wi-Fi credentials directly.</li>
</ol>

<h2>Step 3: Assign a DHCP Reservation (Static IP)</h2>
<p>To prevent the printer from dropping offline in the future when your router rotates DHCP leases, you should lock the printer's IP address:</p>
<ol>
  <li>Print a network configuration sheet from the printer: Press and hold the **Information (i)** button on the printer panel for 3 seconds. Note the MAC Address and the current IP Address (e.g., <code>192.168.1.15</code>).</li>
  <li>Log into your router's administration portal by entering the gateway address (e.g., <code>192.168.1.1</code>) in a browser.</li>
  <li>Navigate to the **DHCP Server** or **IP Reservation** section.</li>
  <li>Click Add New, enter the printer's MAC address, and assign it a permanent IP address (e.g., <code>192.168.1.200</code>). Click Save.</li>
  <li>Restart the printer to apply the permanent IP address.</li>
</ol>

<h2>Step 4: Update Verite Print Drivers on Windows</h2>
<p>If the printer works from your phone but shows offline on a Windows PC:</p>
<ol>
  <li>Open **Printers &amp; Scanners** on your computer.</li>
  <li>Select the Verite printer and click **Remove**.</li>
  <li>Go to the official Verite download page and install the **Kodak Verite Printer Driver Software Package** (do not use generic Windows update drivers, as they lack Funai's network communication layer).</li>
  <li>Run the installer and choose "Network Connection". The installer will search the network for the printer's MAC address and set up the connection port correctly.</li>
</ol>`,
    faqs: JSON.stringify([
      { question: 'Why does the Wi-Fi light on my Verite printer blink constantly?', answer: 'This indicates the printer cannot authenticate with your router. Verify that your network password is correct, and that your router broadcasts a 2.4GHz band.', order: 1 },
      { question: 'Can I print to a Kodak Verite printer without the mobile app?', answer: 'Yes. Once connected to the network, the printer supports AirPrint for iOS and Mopria for Android, allowing app-free printing.', order: 2 },
      { question: 'What ink cartridges do Kodak Verite printers use?', answer: 'They use Kodak Verite Series 5 cartridges (Black and Color). They are not compatible with Kodak Series 10 or 30 cartridges used in ESP/Hero models.', order: 3 }
    ])
  },
  {
    title: "Kodak Luma Projector Wi-Fi Connection & Mirroring Fix",
    slug: 'kodak-luma-projector-wifi-connection-fix',
    seoTitle: "Kodak Luma Projector Wi-Fi & Screen Mirroring Problems Fix",
    metaDescription: "Kodak Luma projector failing to connect to Wi-Fi or screen mirroring dropping? A technician explains network parameters, AirPlay, and firmware resets.",
    excerpt: "Kodak Luma pocket projectors frequently face Wi-Fi drops and screen mirroring failures due to network band conflicts or HDCP locks. Learn how to resolve them.",
    errorCode: 'Mirroring Failure',
    tags: 'Kodak, Luma, Projector, Wi-Fi, Mirroring, AirPlay, Miracast, HDMI',
    wordCount: 1060,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: connectivityCategory,
    authorId: authors.david,
    reviewerId: authors.elena,
    featuredImage: null,
    featuredImageAlt: 'Kodak Luma pocket projector projecting a screen mirroring connection error page onto a wall',
    featuredImageCaption: 'Troubleshooting screen mirroring on Kodak Luma projector',
    featuredSnippet: "To resolve Kodak Luma projector Wi-Fi and mirroring failures: 1) Ensure the projector and your streaming device are connected to the exact same Wi-Fi band (5GHz is recommended for mirroring stability). 2) Disable AP Isolation (Access Point Isolation) in your router settings. 3) Restart the projector and toggle screen mirroring (AirPlay/Miracast) off and back on. 4) Use a physical HDMI adapter for HDCP-protected apps like Netflix.",
    content: `<p>The Kodak Luma series of pocket projectors (Luma 150, 350, and 450) are popular portable entertainment devices running Android OS. While they offer convenient wireless screen mirroring (via AirPlay and Miracast) and Wi-Fi streaming, users frequently encounter connection drops, lag, or a black screen when trying to mirror content from iPhones, Androids, or laptops. These issues are typically caused by router band mismatches, wireless security settings, or DRM (Digital Rights Management) blocks on premium streaming services. Let's walk through the diagnostic and configuration steps to resolve these errors.</p>

<h2>The Screen Mirroring Compatibility Matrix</h2>
<p>Understand the mirroring standards supported by each Kodak Luma model to select the correct connection path:</p>

<table class="diagnostic-table">
  <thead>
    <tr>
      <th>Projector Model</th>
      <th>Primary Casting Standard</th>
      <th>DRM Streaming (Netflix, Hulu, Prime)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Luma 150</strong></td>
      <td>AirPlay / Miracast (Basic Screen Mirroring)</td>
      <td>Blocked over wireless mirroring. **Requires HDMI Cable.**</td>
    </tr>
    <tr>
      <td><strong>Luma 350 / 450</strong></td>
      <td>Onboard Android Apps / AirPlay / Miracast</td>
      <td>Supported natively through onboard apps. (Wireless mirroring is blocked by DRM).</td>
    </tr>
  </tbody>
</table>

<h2>Step 1: Eliminate Band Steering &amp; Match SSID</h2>
<p>For wireless screen mirroring to work, your sending device (phone/tablet) and the Kodak Luma projector must be connected to the **same wireless frequency band**. If your router has "Smart Connect" enabled, it will dynamically move the phone to the 5GHz band and the projector to the 2.4GHz band, breaking the peer-to-peer casting path.</p>
<ol>
  <li>Log into your wireless router admin portal.</li>
  <li>Separate your Wi-Fi bands into distinct names (e.g., **"HomeNet_2.4G"** and **"HomeNet_5G"**).</li>
  <li>Connect the Kodak Luma projector to the **5G band** ("HomeNet_5G") via the Luma Wi-Fi settings. Screen mirroring requires high data throughput, and the 2.4GHz band is too slow, causing lag and pixelation.</li>
  <li>Connect your phone to the same 5G network. Try casting again.</li>
</ol>

<h2>Step 2: Disable Router AP Isolation Settings</h2>
<p>AP Isolation (also known as Client Isolation or Guest Mode) is a security setting on wireless routers that prevents connected Wi-Fi devices from communicating with one another. If active, your phone cannot detect the Luma projector on the network.</p>
<ol>
  <li>In your router settings, navigate to the **Wireless Settings** (or Advanced Security) menu.</li>
  <li>Locate the setting labeled **AP Isolation**, **Access Point Isolation**, or **Device Isolation**.</li>
  <li>Change the setting to **Disabled**.</li>
  <li>Click Save and restart your router.</li>
</ol>

<div class="warning-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>Why Netflix prints a black screen:</strong> If you use screen mirroring (AirPlay or Miracast) to cast Netflix, Hulu, Disney+, or Prime Video, the video will display as a black screen with audio only. This is not a hardware fault. It is caused by **HDCP (High-bandwidth Digital Content Protection)** copy protection laws. You must use a physical HDMI adapter cable connected to your phone, or stream directly using the projector's onboard Android apps (on Luma 350/450).
</div>

<h2>Step 3: Update Luma System Firmware</h2>
<p>Outdated system firmware on the Luma projector will cause casting services to crash due to compatibility conflicts with modern iOS and Android updates.</p>
<ol>
  <li>Go to the Luma projector main screen and select **Settings**.</li>
  <li>Navigate to **System Update** (or About > Update).</li>
  <li>Select **Online Update** and let the projector search for updates. (Ensure the projector is connected to a charger, as it will block updates if the battery is below 30%).</li>
  <li>If the online update fails, download the firmware file from the Kodak support page, copy it to the root directory of a FAT32-formatted USB flash drive, insert the drive into the projector's USB port, and select **Local Update** from the settings menu.</li>
</ol>

<h2>Step 4: Restart Wireless Casting Services</h2>
<p>If the mirroring screen freezes, clear the casting cache:</p>
<ol>
  <li>For iOS, swipe down to open the Control Center, tap Screen Mirroring, and select Stop Mirroring. Tap it again to search and reconnect.</li>
  <li>For Android, turn off Wi-Fi, turn it back on, and select the Cast button in the quick settings shade.</li>
</ol>`,
    faqs: JSON.stringify([
      { question: 'Can I mirror my phone to Luma 150 without Wi-Fi?', answer: 'Yes. The Luma 150 broadcasts its own local ad-hoc Wi-Fi network. Connect your phone to the projector\'s SSID listed on the home screen, then open Screen Mirroring.', order: 1 },
      { question: 'Why does my Luma projector say connected, no internet?', answer: 'This happens if you connect to the projector\'s ad-hoc Wi-Fi network instead of your home router. Connect to your home router to enable internet streaming.', order: 2 },
      { question: 'What format should my USB drive be for Luma projectors?', answer: 'The USB drive must be formatted in FAT32. ExFAT and NTFS formats are not read correctly by the projector\'s Android kernel.', order: 3 }
    ])
  },
  {
    title: "Kodak Printer Prints Only Yellow? Ink Contamination Fix",
    slug: 'kodak-printer-prints-only-yellow-color-contamination',
    seoTitle: "Kodak Printer Prints Only Yellow or Contaminated Colors Fix",
    metaDescription: "Is your Kodak printer outputting only yellow or contaminated colors? A technician explains printhead gasket leaks, ink migration, and nozzle purges.",
    excerpt: "When a Kodak printer prints only yellow or mixes ink colors, it indicates ink contamination inside the printhead assembly or cap station. Follow this guide to clear it.",
    errorCode: 'Color Contamination',
    tags: 'Kodak, Prints Only Yellow, Ink Contamination, Printhead, Purging, Cap Station',
    wordCount: 1050,
    difficultyLevel: 'Intermediate',
    timeToFix: '25 minutes',
    categoryId: printingProblemsCategory,
    authorId: authors.elena,
    reviewerId: authors.alex,
    featuredImage: null,
    featuredImageAlt: 'A test print page showing contaminated color bands where cyan is mixing with yellow',
    featuredImageCaption: 'Diagnosing color ink contamination on a Kodak printer',
    featuredSnippet: "To fix a Kodak printer printing only yellow or contaminated colors: 1) Run 2-3 printhead cleaning cycles to purge contaminated ink from the nozzles. 2) Remove the printhead assembly and inspect the rubber gasket seals between the ink intake ports (damaged seals allow ink to bleed between channels). 3) Clean the parking station cap pad using a damp microfiber cloth to remove pooled waste ink. 4) Print a solid color block purge sheet.",
    content: `<p>A printer that outputs pages with incorrect colors — such as printing only in shades of yellow, or producing muddy green output where cyan should be — is experiencing **color ink contamination**. On Kodak ESP and Hero printers, this occurs when liquid ink from one cartridge channel migrates into another channel. This happens inside the printhead assembly or at the maintenance parking station. It is a physical ink-flow issue, not a driver bug or low ink problem. Let's walk through how to isolate, clean, and resolve color contamination.</p>

<h2>How Color Contamination Occurs</h2>
<p>The Kodak printhead block has separate intake ports for black, cyan, magenta, and yellow ink. These ports are sealed against the bottom of the cartridges by small rubber gaskets. Ink migration can occur in two primary locations:</p>
<ol>
  <li><strong>The Parking Station (Cap Pad):</strong> When the printer is idle, the printhead carriage sits on a rubber cup pad (the parking station) to prevent the nozzles from drying out. If this pad becomes saturated with waste ink, the different colors pool together. The printhead then sucks this mixed ink back up into the nozzles via capillary action.</li>
  <li><strong>Printhead Gasket Leaks:</strong> If the rubber gaskets on the printhead intake ports are dislodged or damaged, ink from one cartridge will leak sideways into the neighboring chamber.</li>
</ol>

<h2>Phase 1: Clean the Maintenance Parking Station</h2>
<p>If pooled waste ink is causing the contamination, cleaning the parking station is required to prevent re-contamination after cleaning cycles.</p>
<ol>
  <li>Turn the printer on and open the access cover.</li>
  <li>Wait for the printhead carriage to move to the center, then **unplug the power cord** to keep it locked in the center.</li>
  <li>Look at the far right side of the printer cavity. Locate the small rubber parking cap assembly (a rectangular black rubber frame surrounding a felt pad).</li>
  <li>Slightly dampen a microfiber cloth with warm distilled water.</li>
  <li>Gently wipe the rubber seals and the internal felt pad. Press down lightly to absorb any pooled, liquid waste ink. Ensure the rubber borders are clean and free of dried ink crust.</li>
  <li>Allow the parking station to dry.</li>
</ol>

<h2>Phase 2: Purge the Printhead Nozzles</h2>
<p>Once the parking station is clean, you must clear the contaminated ink that is trapped inside the printhead chambers:</p>
<ol>
  <li>Reconnect the power cord and turn the printer on.</li>
  <li>Load standard paper into the tray.</li>
  <li>On the printer control panel, navigate to **Maintenance &gt; Clean Printhead** and press OK.</li>
  <li>The cleaning cycle will pump a small amount of ink through the nozzles to clear obstructions.</li>
  <li>After the cycle completes, print a **Nozzle Test Page**.</li>
  <li>If the colors look improved but are still slightly muddy, perform a second cleaning cycle. **Do not run more than 3 cycles consecutively**, as this pumps excessive ink into the waste pads, increasing the pool. If 3 cycles fail to clear it, proceed to Phase 3.</li>
</ol>

<h2>Phase 3: Inspect Printhead Gaskets</h2>
<p>If the ink continues to bleed immediately after purging, the internal printhead gaskets are likely failing to seal:</p>

<table class="diagnostic-table">
  <thead>
    <tr>
      <th>Inspection Target</th>
      <th>Pass Condition</th>
      <th>Fail Condition (Leak Cause)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Rubber Port Gaskets</strong></td>
      <td>Seals are soft, round, and seated flush around the intake mesh.</td>
      <td>Gaskets are flattened, cracked, or dislodged from their slots.</td>
    </tr>
    <tr>
      <td><strong>Cartridge Outlets</strong></td>
      <td>Felt ink pads are clean and flat.</td>
      <td>Cartridge outlet is leaking excessive liquid ink.</td>
    </tr>
    <tr>
      <td><strong>Printhead Bottom</strong></td>
      <td>Nozzle plate is clean with no liquid pools.</td>
      <td>Excessive ink pooling across the entire metal face.</td>
    </tr>
  </tbody>
</table>

<h3>Gasket Cleaning and Alignment:</h3>
<ol>
  <li>Remove the ink cartridges.</li>
  <li>Release the carriage latch and lift the printhead block out of the printer.</li>
  <li>Examine the circular rubber gaskets surrounding the ink intake mesh screens.</li>
  <li>If a gasket is dislodged, use a clean plastic tool (like a toothpick) to gently push it back into its circular seat.</li>
  <li>Wipe the area with a dry, lint-free cloth to remove any ink pools that have bridged the gaps between the ports.</li>
  <li>Reinstall the printhead, snap it in firmly, reinsert the cartridges, and run a final cleaning cycle.</li>
</ol>

<h2>Phase 4: Print a Solid Color Purge Sheet</h2>
<p>If the nozzle test page is mostly clear but the colors still look slightly faded, you can force the printer to draw ink through the specific contaminated channel by printing a full page of that solid color:</p>
<ol>
  <li>On your computer, open a word processor or image editor.</li>
  <li>Create a full-page rectangle. Fill it with **solid Cyan** (if cyan was mixing with yellow) or **solid Magenta**.</li>
  <li>Print this page on plain paper using "Normal" or "Draft" quality.</li>
  <li>This forces the printer to feed ink continuously through that single color channel, quickly flushing out any residual yellow ink that was drawn up into the nozzle chamber.</li>
</ol>`,
    faqs: JSON.stringify([
      { question: 'Why does my Kodak printer only print yellow after sitting idle?', answer: 'Yellow ink has the thinnest pigment density and is closest to the printhead purge cap. During idle periods, capillary draw can pull yellow ink into the adjacent cyan and magenta nozzles.', order: 1 },
      { question: 'Can low color ink levels cause color contamination?', answer: 'Yes. If one color cartridge (e.g. Cyan) is empty, the vacuum inside the printhead during cleaning cycles can suck ink from the adjacent full cartridge (e.g. Yellow) into the empty nozzle chamber.', order: 2 },
      { question: 'Do I need a new printhead if color bleed continues?', answer: 'If the internal plastic walls separating the ink chambers inside the printhead have cracked, yes, the printhead must be replaced as ink will leak internally.', order: 3 }
    ])
  }
];

async function main() {
  for (const article of articles) {
    try {
      await prisma.article.deleteMany({
        where: { slug: article.slug }
      });
      console.log(`Model cleanup complete for: ${article.slug}`);
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
          featuredImageAlt: article.featuredImageAlt,
          featuredImageCaption: article.featuredImageCaption,
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
