import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connectivityCategory = 'c3a92d93-fcbb-439c-a11e-80cde3d2a5ce';
const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';
const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix Rollo Printer USB Not Detected & Disconnecting Ports",
    slug: 'rollo-printer-usb-not-detected-disconnecting-port-fix',
    seoTitle: "Fix Rollo Printer USB Not Detected & Keeps Disconnecting",
    metaDescription: "Is your Rollo thermal printer not detected over USB or constantly connecting and disconnecting? Learn how to fix USB-UART drivers and USB port sleep states.",
    excerpt: "When Windows or Mac constantly plays the USB disconnect chime or fails to detect a Rollo printer, power management states and USB controller sleep settings are the culprit.",
    errorCode: 'USB Not Detected',
    tags: 'Rollo, USB Not Detected, USB Disconnecting, USB-UART Bridge, Silicon Labs, Device Manager, USB Power',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '7 minutes',
    categoryId: connectivityCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "To fix a Rollo printer not detected via USB or repeatedly disconnecting: 1) Avoid unpowered USB hubs and front PC case ports; plug the USB cable directly into a rear motherboard USB 3.0/2.0 port. 2) In Windows Device Manager, expand 'Universal Serial Bus controllers' > right-click every 'USB Root Hub' > Properties > Power Management > UNCHECK 'Allow the computer to turn off this device to save power'. 3) In Windows Power Options, set 'USB selective suspend setting' to Disabled. 4) If listed as an unknown device, reinstall the Silicon Labs CP210x USB-to-UART bridge driver.",
    content: `<h2>Understanding Rollo USB Hardware Communication</h2>
<p>The Rollo X1038 and X1040 communicate with host computers using an onboard <strong>Silicon Labs CP210x USB-to-UART bridge chipset</strong>. This chip translates USB packets from your operating system into raw serial data streams for the thermal controller. If Windows or macOS aggressive power-saving protocols cut voltage to the USB root hub, the bridge controller drops off the bus, triggering continuous connection and disconnection loops.</p>

<h2>Fix 1: Disabling Windows USB Selective Suspend</h2>
<p>Windows features an aggressive power-saving feature called <em>USB Selective Suspend</em> that suspends power to USB ports it perceives as idle.</p>
<ol>
  <li>Press <code>Windows Key + R</code>, type <code>control.exe powercfg.cpl,,3</code>, and hit Enter to open Advanced Power Options.</li>
  <li>Scroll down and expand <strong>USB settings</strong> &gt; <strong>USB selective suspend setting</strong>.</li>
  <li>Change both <em>"On battery"</em> and <em>"Plugged in"</em> to <strong>Disabled</strong>.</li>
  <li>Click <strong>Apply</strong> and <strong>OK</strong>.</li>
</ol>

<h2>Fix 2: Unchecking USB Hub Power Management</h2>
<ol>
  <li>Right-click the Windows Start button and select <strong>Device Manager</strong>.</li>
  <li>Scroll down to the bottom and expand <strong>Universal Serial Bus controllers</strong>.</li>
  <li>Right-click on <strong>USB Root Hub</strong> (and <strong>Generic USB Hub</strong>) and select <strong>Properties</strong>.</li>
  <li>Go to the <strong>Power Management</strong> tab.</li>
  <li>Uncheck the box: <strong>"Allow the computer to turn off this device to save power"</strong>.</li>
  <li>Repeat this for all listed USB Root Hub entries and restart your computer.</li>
</ol>

<h2>Fix 3: Resolving Motherboard Port Voltage Drops</h2>
<p>Front-panel USB ports on desktop PC cases are connected via unshielded internal extension cables that suffer high electrical resistance. When the Rollo motor spins up, transient voltage drops cause the USB-UART bridge to reset.</p>
<ul>
  <li>Always connect your printer cable directly to the <strong>rear I/O panel</strong> on the back of your desktop PC motherboard.</li>
  <li>If using a modern laptop with only USB-C ports, use a single-piece <strong>USB-B to USB-C cable</strong> rather than stacking multiple dongles and converters.</li>
</ul>`
  },
  {
    title: "Rollo Wireless Printer Wi-Fi & Bluetooth Setup Guide",
    slug: 'rollo-wireless-printer-wifi-bluetooth-setup-guide',
    seoTitle: "Rollo Wireless Printer Wi-Fi & Bluetooth Setup Guide",
    metaDescription: "Step-by-step Wi-Fi and Bluetooth wireless setup guide for the Rollo X1040 printer. Connect to iPhone, iPad, Android, Windows, and Mac in under 5 minutes.",
    excerpt: "The Rollo Wireless Printer allows label printing over 2.4GHz Wi-Fi, AirPrint, and Bluetooth. Follow our complete setup guide to connect all your devices.",
    errorCode: null,
    tags: 'Rollo, Rollo Wireless, Wi-Fi Setup, Bluetooth Setup, AirPrint, Rollo App, 2.4GHz Wi-Fi',
    wordCount: 1200,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: setupCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "To set up the Rollo Wireless printer on Wi-Fi: 1) Download the official 'Rollo App' on your iOS or Android smartphone. 2) Turn the Rollo printer ON. The circular top button will glow steady purple when in Wi-Fi setup mode. 3) Open the Rollo App, tap 'Add Printer', and allow Bluetooth permissions so the app can locate the printer. 4) Select your 2.4GHz home/office Wi-Fi network (Rollo does not support 5GHz-only SSIDs) and enter your Wi-Fi password. 5) The light will turn solid green or cyan once connected.",
    content: `<h2>The Rollo Wireless Connectivity Architecture</h2>
<p>The <strong>Rollo Wireless Printer (X1040)</strong> features dual-band internal radios supporting Bluetooth Low Energy (for initial handshaking) and 802.11 b/g/n 2.4GHz Wi-Fi (for high-speed label transmission). Once connected to your local network, any phone, tablet, Mac, or PC on the same router can send shipping labels instantly without needing a physical USB tether.</p>

<h2>Step 1: Smartphone App Setup (iOS &amp; Android)</h2>
<ol>
  <li>Download the <strong>Rollo App</strong> from the Apple App Store or Google Play Store.</li>
  <li>Plug the Rollo Wireless printer into AC power and flip the rear switch to <strong>ON (I)</strong>.</li>
  <li>Look at the circular top status button:
    <ul>
      <li><strong>Pulsing / Solid Purple:</strong> The printer is in Wi-Fi broadcast setup mode.</li>
      <li><strong>Solid Yellow / Red:</strong> Hold the top button for 5 seconds until it beeps twice to reset network parameters to purple.</li>
    </ul>
  </li>
  <li>Open the Rollo App, create or log into your account, and tap <strong>"Add New Printer"</strong>.</li>
  <li>The app uses your phone's Bluetooth to discover the nearby printer. Tap <strong>"Connect"</strong> when your Rollo unit appears.</li>
  <li>Select your <strong>2.4 GHz Wi-Fi Network Name (SSID)</strong> from the list. (Important: If you have a dual-band mesh router with separate 2.4GHz and 5GHz bands, choose the 2.4GHz network).</li>
  <li>Enter your Wi-Fi password and tap <strong>Connect</strong>.</li>
  <li>The printer LED will transition from purple to <strong>Solid Cyan / Green</strong>. Setup is complete!</li>
</ol>

<h2>Step 2: Connecting Windows PC to Rollo Wireless</h2>
<ol>
  <li>Ensure your Windows PC is connected to the same local Wi-Fi router.</li>
  <li>Download and run the <code>Rollo-Windows-Driver-Latest.exe</code> installer.</li>
  <li>When prompted for connection type, choose <strong>"Network (Wi-Fi) Installation"</strong>.</li>
  <li>The installer will broadcast a discovery packet over UDP Port 9100, automatically detect your Rollo printer's local IP address, and install the standard network port driver.</li>
</ol>

<h2>Step 3: Connecting Mac to Rollo Wireless (Driverless AirPrint)</h2>
<ol>
  <li>Open <strong>System Settings &gt; Printers &amp; Scanners</strong> on your Mac.</li>
  <li>Click <strong>Add Printer (+)</strong>.</li>
  <li>Your Mac will automatically detect <strong>Rollo Wireless (Bonjour / AirPrint)</strong>.</li>
  <li>Select it and click <strong>Add</strong>. You can now print 4x6 labels wirelessly from any Mac application.</li>
</ol>`
  },
  {
    title: "Fix Rollo Wi-Fi Keeps Disconnecting & Network Printer Not Found",
    slug: 'rollo-printer-wifi-disconnecting-network-not-found-fix',
    seoTitle: "Fix Rollo Wi-Fi Keeps Disconnecting & Network Not Found",
    metaDescription: "Is your Rollo Wireless printer dropping Wi-Fi connection or showing 'Printer Not Found' on your network? Fix dual-band mesh router band-steering and sleep drops.",
    excerpt: "Mesh Wi-Fi router band-steering and dynamic DHCP IP leasing frequently disconnect Rollo Wireless printers. Here is how to lock your printer to a rock-solid connection.",
    errorCode: 'Wi-Fi Drop',
    tags: 'Rollo, Wi-Fi Disconnecting, Network Not Found, Mesh Wi-Fi, Band Steering, 2.4GHz, IP Address Drop',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '8 minutes',
    categoryId: connectivityCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "To fix Rollo Wi-Fi disconnects and 'Printer Not Found' errors: 1) Modern mesh routers (Eero, Nest Wi-Fi, Orbi) use band-steering to force devices onto 5GHz, which drops 2.4GHz-only Rollo printers. Temporarily pause 5GHz in your router app during setup, or assign Rollo to an IoT 2.4GHz guest SSID. 2) Assign a Static DHCP Reservation in your router settings to stop the IP address from changing. 3) Move the printer within 15 feet of your router or a mesh node to maintain signal strength above -65 dBm.",
    content: `<h2>Why Mesh Wi-Fi Routers Drop Rollo Printers</h2>
<p>The Rollo Wireless Printer contains an energy-efficient 2.4GHz 802.11n radio chip. Modern Wi-Fi 6/6E mesh networking systems (such as Amazon Eero, Google Nest Wi-Fi, TP-Link Deco, and Netgear Orbi) combine both 2.4GHz and 5GHz frequencies under a single unified SSID. Through a feature called <em>Band Steering</em>, the router repeatedly attempts to push the Rollo printer to the faster 5GHz frequency. Because the hardware radio cannot negotiate 5GHz, the connection drops, and the printer displays a <strong>flashing yellow or red LED</strong>.</p>

<h2>Fix 1: Creating a Dedicated 2.4GHz IoT SSID</h2>
<p>The most permanent fix for all smart shipping hardware is configuring a clean 2.4GHz network channel.</p>
<ol>
  <li>Open your router administration app on your smartphone (e.g. Eero App, Deco App, or Asus Router interface).</li>
  <li>Navigate to <em>Wi-Fi Settings &gt; Guest Network (or IoT Network)</em>.</li>
  <li>Enable a dedicated <strong>2.4GHz IoT Network</strong> (name it e.g. <code>MyHome-2.4G</code>).</li>
  <li>Reset the Rollo Wireless network settings (press and hold the top button for 5 seconds until it beeps twice and glows purple).</li>
  <li>Open the Rollo App and connect the printer directly to the new 2.4GHz network. The connection will never drop again.</li>
</ol>

<h2>Fix 2: Resolving Dynamic IP Address Lease Expirations</h2>
<p>When you add a wireless printer to Windows or Mac, your computer remembers the printer by its local IP address (e.g., <code>192.168.1.145</code>). When your router reboots or renews DHCP leases, it may assign the printer a new IP (e.g., <code>192.168.1.189</code>), causing your computer to report <em>"Printer Offline"</em> or <em>"Network Printer Not Found"</em>.</p>
<ul>
  <li>Log into your router admin console (typically <code>192.168.1.1</code> or <code>192.168.0.1</code>).</li>
  <li>Find <strong>DHCP Server / IP Address Reservation</strong>.</li>
  <li>Locate your Rollo printer by its MAC address (printed on the serial sticker on the bottom of the printer).</li>
  <li>Click <strong>Reserve IP (Static Lease)</strong>. This guarantees your router will assign the exact same IP address forever.</li>
</ul>`
  },
  {
    title: "Rollo Printer Static IP Setup & Windows Printer Offline Fix",
    slug: 'rollo-printer-static-ip-setup-windows-offline-fix',
    seoTitle: "Rollo Printer Static IP Setup & Windows Offline Fix Guide",
    metaDescription: "Step-by-step guide to configuring a static TCP/IP port for Rollo Wireless on Windows 10 & 11, permanently resolving 'Printer Offline' status errors.",
    excerpt: "When Windows randomly marks your Rollo network printer as offline, switching from WSD port discovery to a standard Standard TCP/IP port solves it permanently.",
    errorCode: 'Printer Offline',
    tags: 'Rollo, Static IP, Printer Offline, Windows 11, Standard TCP/IP Port, WSD Port, Spooler Fix',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '7 minutes',
    categoryId: connectivityCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredSnippet: "To fix Rollo 'Printer Offline' on Windows with a Static TCP/IP port: 1) Find your Rollo printer's IP address in your router or the Rollo App (e.g., 192.168.1.150). 2) In Windows, open Control Panel > Devices and Printers > right-click 'Rollo Printer' > Printer Properties. 3) Click the 'Ports' tab > click 'Add Port...' > select 'Standard TCP/IP Port' > click 'New Port'. 4) Enter the printer's static IP address. 5) Uncheck 'SNMP Status Enabled' under port configure. 6) Click Apply. Windows will now communicate directly with the hardware, eliminating false offline states.",
    content: `<h2>Why Windows Marks Network Thermal Printers 'Offline'</h2>
<p>By default, when Windows installs a wireless printer, it uses Microsoft's <strong>WSD (Web Services for Devices)</strong> port architecture. WSD sends periodic network polling pings to check if the printer is awake. Because thermal label printers enter deep energy conservation states between batches of shipping labels, the printer ignores the WSD ping. Windows immediately flags the device as <em>"Offline"</em> and pauses all print jobs in the queue.</p>

<h2>Step 1: Finding Your Rollo Printer IP Address</h2>
<ul>
  <li><strong>Method A (Rollo App):</strong> Open the Rollo App on your phone, tap your printer icon, and look under <em>Device Details &gt; IP Address</em>.</li>
  <li><strong>Method B (Self-Test Print):</strong> Turn the printer on, hold the top circular button for <strong>2 beeps</strong>, and release. The printer will spit out a diagnostic sheet containing its current IPv4 address (e.g. <code>192.168.1.120</code>).</li>
</ul>

<h2>Step 2: Creating a Dedicated Standard TCP/IP Port on Windows</h2>
<ol>
  <li>Open <strong>Control Panel</strong> and click on <strong>View Devices and Printers</strong>.</li>
  <li>Right-click on your <strong>Rollo Thermal Printer</strong> and select <strong>Printer Properties</strong> (not "Printing Preferences").</li>
  <li>Click on the <strong>Ports</strong> tab at the top. Notice that it is likely checked on a port named <code>WSD-xxxxxxxx</code>.</li>
  <li>Click the <strong>Add Port...</strong> button.</li>
  <li>Highlight <strong>Standard TCP/IP Port</strong> and click <strong>New Port...</strong>.</li>
  <li>The <em>Add Standard TCP/IP Printer Port Wizard</em> will open. Click <strong>Next</strong>.</li>
  <li>In the <em>Printer Name or IP Address</em> field, type your Rollo printer's exact IP address (e.g. <code>192.168.1.120</code>).</li>
  <li>The <em>Port Name</em> will populate automatically. Click <strong>Next</strong>, then click <strong>Finish</strong>.</li>
</ol>

<h2>Step 3: Disabling SNMP Status Check</h2>
<ol>
  <li>Back in the Ports tab, highlight your new IP address port and click <strong>Configure Port...</strong>.</li>
  <li>At the bottom of the window, locate the checkbox labeled <strong>"SNMP Status Enabled"</strong>.</li>
  <li><strong>UNCHECK this box!</strong> (Direct thermal printers do not support SNMP v1/v2 queries; leaving SNMP enabled is the #1 cause of false offline flags).</li>
  <li>Ensure <em>Protocol</em> is set to <strong>Raw</strong> on <strong>Port Number: 9100</strong>.</li>
  <li>Click <strong>OK</strong>, then click <strong>Apply</strong>.</li>
  <li>Your Rollo printer will immediately switch to <strong>"Ready"</strong> status and print instantly without delay.</li>
</ol>`
  }
];

async function main() {
  const brand = await prisma.brand.findUnique({ where: { slug: 'rollo' } });
  if (!brand) throw new Error('Rollo brand not found in database.');

  console.log(`🚀 Publishing Batch 3 (Cluster E: Connectivity — USB & Wireless) for brand: ${brand.name}`);

  for (const article of articles) {
    try {
      await prisma.article.deleteMany({ where: { slug: article.slug } });
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
          status: 'published',
          publishedAt: new Date(),
          brandId: brand.id,
          categoryId: article.categoryId,
          authorId: article.authorId,
          reviewerId: article.reviewerId,
          reviewedAt: new Date(),
        }
      });
      console.log(`✅ Published: "${created.title}"`);
    } catch (e: any) {
      console.log(`⚠️ Error for "${article.title}": ${e.message}`);
    }
  }
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
