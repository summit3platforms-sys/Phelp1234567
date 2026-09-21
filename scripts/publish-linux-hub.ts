import { prisma } from '../src/lib/prisma';

const HP_BRAND_ID = '47b0fd4a-2254-48f1-92c8-eb9e7a8657c6';
const CAT_DRIVERS = '019baf04-4a41-4df3-9c1e-466564565d92'; // Drivers, Software & Firmware
const CAT_CONNECT = 'c3a92d93-fcbb-439c-a11e-80cde3d2a5ce'; // Connectivity Issues
const CAT_SCAN = '773cb788-7cd5-4a7b-93d9-5e1c8448aa7a'; // Scanning Issues
const CAT_SETUP = 'e6768bbb-1696-4f92-8499-7eb45f540edd'; // Setup & Installation

const AUTHOR_DAVID = '1feb6d39-93c0-406c-818c-40dd1428aca6'; // David Chen
const AUTHOR_ALEX = '88e8d061-e1be-406d-8fa1-a53f108cc624'; // Alex Carter

const articles = [
  // 1. Ubuntu Linux Driver Install
  {
    title: "How to Install HP Printer Drivers on Ubuntu Linux (HPLIP Setup Guide)",
    slug: "hp-printer-linux-driver-install-ubuntu",
    metaDescription: "Step-by-step guide to installing HP printer drivers on Ubuntu using HPLIP, installing the proprietary binary plugin, and setting up CUPS.",
    brandId: HP_BRAND_ID,
    categoryId: CAT_DRIVERS,
    authorId: AUTHOR_DAVID,
    featuredImage: "/images/printers/hp.webp",
    content: `<h2>HP Linux Printing Architecture on Ubuntu</h2>
<p>HP printers on Ubuntu and Debian-based distributions rely on HPLIP (HP Linux Imaging and Printing). HPLIP provides printing, scanning, and fax support.</p>
<p>While basic printing works out of the box through driverless IPP-Everywhere, multi-function features and LaserJet engines require HPLIP's proprietary binary plugin.</p>

<h2>Step 1: Install HPLIP and GUI Utilities via APT</h2>
<p>Ubuntu includes HPLIP in its official universe repository:</p>
<ol>
  <li><strong>Update your package list:</strong> Open terminal (Ctrl+Alt+T) and run <code>sudo apt update</code>.</li>
  <li><strong>Install HPLIP and the Toolbox GUI:</strong> Run <code>sudo apt install hplip hplip-gui -y</code> to install the core drivers and system tray utility.</li>
  <li><strong>Install CUPS print daemon:</strong> Ensure the printing service is active by running <code>sudo systemctl enable --now cups</code>.</li>
  <li><strong>Add your user account to the lpadmin group:</strong> Run <code>sudo usermod -aG lpadmin,scanner $USER</code> to grant printer management rights without constant root prompts.</li>
  <li><strong>Log out and log back in:</strong> The new group permissions only take effect after starting a fresh user session.</li>
</ol>

<h2>Step 2: Run the HP Setup Wizard</h2>
<p>Use the interactive terminal or GUI tool to detect and configure the printer:</p>
<ol>
  <li><strong>For USB connections:</strong> Plug the USB cable directly into your PC and run <code>hp-setup</code>.</li>
  <li><strong>For Network / Wi-Fi printers:</strong> Run <code>hp-setup -i</code> and choose option 1 (Network/Ethernet/Wireless).</li>
  <li><strong>Manual IP specification:</strong> If auto-discovery does not find your printer, pass the static IP directly: <code>hp-setup 192.168.1.150</code>.</li>
  <li><strong>Select the PPD file:</strong> Accept the recommended PPD driver description suggested by the installer.</li>
  <li><strong>Send a test page:</strong> Confirm the print test page prompt on your screen to verify communication.</li>
</ol>

<h2>Step 3: Install the HP Proprietary Plugin (LaserJet & Scan Engines)</h2>
<p>Many HP LaserJet and Color LaserJet models require a proprietary binary blob to render print files:</p>
<ol>
  <li><strong>Launch the plugin installer:</strong> In your terminal, run <code>hp-plugin</code>.</li>
  <li><strong>Select download source:</strong> Choose option 1: <strong>Download and install the plugin from an HP authorized server</strong>.</li>
  <li><strong>Accept the license agreement:</strong> Read and accept the driver terms by typing <code>y</code>.</li>
  <li><strong>Verify installation:</strong> Run <code>hp-check -t</code>. Confirm that the "Plugin status" line shows as installed.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Do I need to download the .run file from HP's website?</summary>
  <p>No. We strongly recommend using Ubuntu's official apt repository package. The third-party .run script from HP frequently fails on modern Python 3.10+ environments.</p>
</details>
<details>
  <summary>Can I manage my HP printer via the browser on Ubuntu?</summary>
  <p>Yes. Navigate to <code>http://localhost:631</code> to access the CUPS web administration console for queue pausing, ink monitoring, and default paper tray settings.</p>
</details>
<details>
  <summary>Why does my HP printer show as "Paused" in Ubuntu settings?</summary>
  <p>This happens after a print job error. Open terminal and run <code>cupsenable &lt;printer-name&gt; &amp;&amp; cupsaccept &lt;printer-name&gt;</code> to unpause the queue.</p>
</details>`
  },

  // 2. HPLIP Not Detecting Printer
  {
    title: "HPLIP Not Detecting HP Printer? USB & Network Discovery Fix",
    slug: "hplip-not-detecting-printer-fix",
    metaDescription: "Troubleshoot HPLIP not detecting HP printers on Linux. Fix USB udev permission errors, avahi-daemon network discovery, and firewall blockage.",
    brandId: HP_BRAND_ID,
    categoryId: CAT_CONNECT,
    authorId: AUTHOR_DAVID,
    featuredImage: "/images/printers/hp.webp",
    content: `<h2>Why HPLIP Fails to Detect Your HP Printer</h2>
<p>When <code>hp-setup</code> reports "No devices found," the problem is almost never a dead printer.</p>
<p>On USB connections, Linux udev rules often block unprivileged user access. On Wi-Fi connections, missing mDNS (Avahi) multicast packets or strict local firewalls hide the printer.</p>

<h2>Step 1: Troubleshoot USB Detection and Udev Rules</h2>
<p>Verify that the Linux kernel recognizes the hardware before checking HPLIP:</p>
<ol>
  <li><strong>Check USB bus status:</strong> Run <code>lsusb</code> in terminal. Look for a line containing "Hewlett-Packard" or "HP, Inc."</li>
  <li><strong>Bypass USB hubs:</strong> Plug the printer directly into a rear motherboard USB 2.0 port. Avoid USB 3.0 blue ports or unpowered external hubs.</li>
  <li><strong>Verify HPLIP udev rules:</strong> Ensure the HP device rules file exists: <code>ls -l /etc/udev/rules.d/*hpmud* /lib/udev/rules.d/*hpmud*</code>.</li>
  <li><strong>Reload udev rules:</strong> Run <code>sudo udevadm control --reload-rules &amp;&amp; sudo udevadm trigger</code> to apply hardware permissions.</li>
  <li><strong>Run manual probe:</strong> Run <code>hp-probe -b usb</code>. If the printer appears, launch <code>hp-setup -b usb</code>.</li>
</ol>

<h2>Step 2: Troubleshoot Wi-Fi and Network Discovery</h2>
<p>Network discovery depends on mDNS broadcasts through the Avahi daemon:</p>
<ol>
  <li><strong>Ping the printer:</strong> Print a network config sheet from the printer panel. Run <code>ping -c 3 &lt;printer-ip&gt;</code> to verify local reachability.</li>
  <li><strong>Restart the mDNS daemon:</strong> Run <code>sudo systemctl restart avahi-daemon</code> to refresh local zero-conf name resolution.</li>
  <li><strong>Unblock firewall ports:</strong> If using UFW, allow mDNS and SNMP traffic: <code>sudo ufw allow 5353/udp &amp;&amp; sudo ufw allow 161/udp</code>.</li>
  <li><strong>Bypass network discovery with direct IP:</strong> Run <code>hp-setup &lt;printer-ip&gt;</code> directly. This skips broadcast scanning and connects immediately via TCP socket.</li>
</ol>

<h2>Step 3: Run the Automated HPLIP Diagnostic Tool</h2>
<p>HPLIP includes a comprehensive dependency checker that pinpoints missing packages:</p>
<ol>
  <li><strong>Run the diagnostic command:</strong> In terminal, type <code>hp-check -t</code>.</li>
  <li><strong>Review the summary table:</strong> The report flags missing libraries in red under REQUIRED DEPENDENCIES.</li>
  <li><strong>Install common missing packages:</strong> On Debian/Ubuntu, run <code>sudo apt install libsnmp-dev libcupsimage2-dev python3-pyqt5</code>.</li>
  <li><strong>Restart the CUPS service:</strong> Run <code>sudo systemctl restart cups</code> after installing dependencies.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does hp-setup say "error: No device selected" on network?</summary>
  <p>This occurs when network discovery times out. Pass your printer's IP address directly using <code>hp-setup -i &lt;IP-Address&gt;</code> in interactive terminal mode.</p>
</details>
<details>
  <summary>Can I add the printer through standard system settings instead of HPLIP?</summary>
  <p>Yes. Go to Settings &gt; Printers &gt; Add Printer. Modern HP printers support driverless IPP-Everywhere, which works independently of HPLIP.</p>
</details>
<details>
  <summary>What should I do if lsusb does not show the printer at all?</summary>
  <p>If lsusb does not show Hewlett-Packard, the USB cable is defective or the printer's USB interface port is powered down. Replace the cable and test on a different PC.</p>
</details>`
  },

  // 3. Scanning Not Working Linux
  {
    title: "HP Printer Scanning Not Working on Linux? SANE, HPLIP & Permissions Fix",
    slug: "hp-printer-scanning-not-working-linux-fix",
    metaDescription: "Fix HP scanner not working or not detected on Linux. Resolve SANE backend errors, missing proprietary plugin, and scanner group permissions.",
    brandId: HP_BRAND_ID,
    categoryId: CAT_SCAN,
    authorId: AUTHOR_ALEX,
    featuredImage: "/images/printers/hp.webp",
    content: `<h2>Understanding Linux Scanner Architecture (SANE & HPLIP)</h2>
<p>Scanning on Linux operates through the SANE (Scanner Access Now Easy) framework. For HP multi-function printers, SANE communicates through the <code>hpaio</code> backend.</p>
<p>If your HP printer prints fine but the scanner displays "No scanners found" or "Device I/O error", the issue is almost always a missing binary plugin or user group permission fault.</p>

<h2>Step 1: Check SANE Backend Detection</h2>
<p>Determine if SANE can communicate with the optical hardware:</p>
<ol>
  <li><strong>Test basic scanner visibility:</strong> Open terminal and execute <code>scanimage -L</code>.</li>
  <li><strong>Evaluate the terminal output:</strong> A working setup returns: <code>device 'hpaio:/net/...' is a Hewlett-Packard ... all-in-one</code>.</li>
  <li><strong>Check low-level USB scanner hardware:</strong> If on USB, run <code>sudo sane-find-scanner</code> to see if the USB chip is accessible.</li>
</ol>

<h2>Step 2: Install the Mandatory HP Proprietary Plugin</h2>
<p>Over 70% of HP multi-function scan units require HP's proprietary binary plugin to operate under SANE:</p>
<ol>
  <li><strong>Run the plugin installer:</strong> Open terminal and run <code>hp-plugin -i</code>.</li>
  <li><strong>Choose server download:</strong> Select option 1 to automatically download the matching plugin version from HP's server.</li>
  <li><strong>Confirm successful install:</strong> Run <code>hp-check -t | grep -i plugin</code>. Ensure the status reads "Installed".</li>
</ol>

<h2>Step 3: Fix User Group Permissions</h2>
<p>Your user account must belong to the system groups authorized to access raw scanner hardware:</p>
<ol>
  <li><strong>Check your current groups:</strong> Run <code>groups</code> in terminal.</li>
  <li><strong>Add missing scanner groups:</strong> Run <code>sudo usermod -aG scanner,lp,saned $USER</code>.</li>
  <li><strong>Fix udev device node permissions:</strong> For USB scanners, run <code>sudo chmod -R 666 /dev/bus/usb/</code> to test if permissions are the blocker.</li>
  <li><strong>Log out and reboot:</strong> Group changes require a fresh session to become active.</li>
</ol>

<h2>Step 4: Use Driverless AirScan (eSCL / WSD Alternative)</h2>
<p>If the legacy HPAIO backend continues to fail, use modern driverless AirScan:</p>
<ol>
  <li><strong>Install sane-airscan:</strong> On Ubuntu/Debian, run <code>sudo apt install sane-airscan</code>. On Fedora, run <code>sudo dnf install sane-airscan</code>.</li>
  <li><strong>Verify network scanner detection:</strong> Run <code>airscan-discover</code>. Modern HP Wi-Fi scanners appear as eSCL devices.</li>
  <li><strong>Launch Simple Scan (Document Scanner):</strong> Open your document scanner app. Choose the eSCL network scanner option instead of HPAIO.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does Simple Scan work as root but not as my regular user?</summary>
  <p>This confirms a user group permission issue. Add your user account to the scanner and lp groups using <code>sudo usermod -aG scanner,lp $USER</code> and reboot.</p>
</details>
<details>
  <summary>Can I scan directly from the HP printer's web interface?</summary>
  <p>Yes. Enter the printer's IP address in your browser, navigate to <strong>Webscan</strong> under the Scan or Tools tab, and scan directly to your browser without local drivers.</p>
</details>
<details>
  <summary>What causes error "Device I/O error" during scan initiation?</summary>
  <p>This indicates the scanner motor timed out or the HP proprietary plugin version does not match your installed HPLIP package. Re-run <code>hp-plugin -i</code> to resync versions.</p>
</details>`
  },

  // 4. Fedora Setup Guide
  {
    title: "How to Install & Configure HP Printers on Fedora Linux (DNF & HPLIP Guide)",
    slug: "hp-printer-fedora-setup-guide",
    metaDescription: "Complete setup guide for HP printers on Fedora Linux using DNF, firewall configuration for mDNS, CUPS daemon setup, and SELinux adjustments.",
    brandId: HP_BRAND_ID,
    categoryId: CAT_SETUP,
    authorId: AUTHOR_DAVID,
    featuredImage: "/images/printers/hp.webp",
    content: `<h2>HP Printing Architecture on Fedora Workstation</h2>
<p>Fedora Linux uses modern printing standards including CUPS, DNF package management, and strict firewalld rules.</p>
<p>Configuring an HP printer on Fedora requires installing HPLIP via DNF, enabling the CUPS service, and opening network ports in firewalld for mDNS discovery.</p>

<h2>Step 1: Install HPLIP and SANE via DNF</h2>
<p>Install the necessary driver packages from Fedora's official repositories:</p>
<ol>
  <li><strong>Update your system:</strong> Open terminal and run <code>sudo dnf upgrade --refresh</code>.</li>
  <li><strong>Install HPLIP packages:</strong> Run <code>sudo dnf install hplip hplip-gui -y</code> to install the driver framework and graphical toolbox.</li>
  <li><strong>Install scanning backends:</strong> Run <code>sudo dnf install sane-backends sane-backends-drivers-scanners sane-airscan -y</code>.</li>
  <li><strong>Enable the CUPS printing service:</strong> Run <code>sudo systemctl enable --now cups</code> to ensure print queues start on boot.</li>
</ol>

<h2>Step 2: Configure firewalld for Network Printer Discovery</h2>
<p>Fedora's default firewall configuration blocks incoming mDNS and SNMP printer broadcasts:</p>
<ol>
  <li><strong>Allow mDNS service:</strong> Run <code>sudo firewall-cmd --add-service=mdns --permanent</code>.</li>
  <li><strong>Allow IPP printing service:</strong> Run <code>sudo firewall-cmd --add-service=ipp --permanent</code>.</li>
  <li><strong>Allow HP discovery service:</strong> Run <code>sudo firewall-cmd --add-service=ipp-client --permanent</code>.</li>
  <li><strong>Reload the firewall:</strong> Run <code>sudo firewall-cmd --reload</code> to apply the new rules immediately.</li>
</ol>

<h2>Step 3: Run HP Setup and Install the Proprietary Plugin</h2>
<p>Configure the printer queue and install the required proprietary binary blobs:</p>
<ol>
  <li><strong>Launch the setup wizard:</strong> In terminal, run <code>hp-setup</code>.</li>
  <li><strong>Select connection type:</strong> Choose Network/Wireless or USB depending on your connection.</li>
  <li><strong>Install the proprietary plugin:</strong> When prompted, select <strong>Download and install plugin from HP server</strong>.</li>
  <li><strong>Check GPG key validation:</strong> If prompted to accept the HP driver key, press <code>y</code> to confirm.</li>
  <li><strong>Print test page:</strong> Confirm the print test prompt to verify driver installation.</li>
</ol>

<h2>Step 4: Driverless IPP-Everywhere Setup (Zero-Driver Option)</h2>
<p>Modern HP printers manufactured after 2015 support driverless printing natively in Fedora:</p>
<ol>
  <li><strong>Open GNOME Settings:</strong> Navigate to <strong>Settings</strong> &gt; <strong>Printers</strong>.</li>
  <li><strong>Unlock panel:</strong> Click <strong>Unlock</strong> in the top-right corner and enter your sudo password.</li>
  <li><strong>Add Printer:</strong> Click <strong>Add Printer</strong>. Fedora will automatically discover the printer via AirPrint / IPP-Everywhere.</li>
  <li><strong>Select Driverless:</strong> Choose the driverless profile. This bypasses HPLIP entirely and requires zero maintenance during Fedora OS version upgrades.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Does SELinux block HP printer drivers on Fedora?</summary>
  <p>In rare cases, SELinux restricts third-party binary plugins. If printing fails, check <code>sudo ausearch -m avc -ts recent</code> to see if audit denials are logged.</p>
</details>
<details>
  <summary>Why does hp-setup fail with Python errors on Fedora?</summary>
  <p>This happens if PyQt dependencies are missing. Run <code>sudo dnf install python3-pyqt5 python3-dbus</code> to install the required graphical libraries.</p>
</details>
<details>
  <summary>Can I print from Flatpak applications on Fedora?</summary>
  <p>Yes. Flatpak apps use the XDG Desktop Portal to communicate with CUPS. As long as the printer is configured in system CUPS, all Flatpaks can print.</p>
</details>`
  }
];

async function main() {
  console.log(`Publishing ${articles.length} HP Linux articles to the database...`);

  for (const art of articles) {
    const cleanText = art.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const wordCount = cleanText.split(/\s+/).filter(Boolean).length;

    const record = await prisma.article.upsert({
      where: { slug: art.slug },
      update: {
        title: art.title,
        metaDescription: art.metaDescription,
        excerpt: art.metaDescription,
        content: art.content,
        wordCount,
        status: "published",
        publishedAt: new Date(),
        brandId: art.brandId,
        categoryId: art.categoryId,
        authorId: art.authorId,
        featuredImage: art.featuredImage
      },
      create: {
        title: art.title,
        slug: art.slug,
        metaDescription: art.metaDescription,
        excerpt: art.metaDescription,
        content: art.content,
        wordCount,
        status: "published",
        publishedAt: new Date(),
        brandId: art.brandId,
        categoryId: art.categoryId,
        authorId: art.authorId,
        featuredImage: art.featuredImage
      }
    });

    console.log(`✅ [${record.slug}] Published successfully (${record.wordCount} words) - Author: ${art.authorId}`);
  }

  console.log("\nAll 4 HP Linux articles are now live in the database!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
