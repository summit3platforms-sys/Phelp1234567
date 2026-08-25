import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function stripLinks(html: string): string {
  return html.replace(/<a\s[^>]*href="\/[^"]*"[^>]*>([^<]*)<\/a>/gi, '$1');
}

const expansions = [
  {
    id: '1f9a7eae-31d6-48f5-8932-af23db98c175',
    slug: 'hp-printer-not-appearing-airprint-list-iphone',
    wordCount: 1000,
    content: `<h2>Why Your HP Printer Isn't Showing Up in AirPrint on iPhone</h2>
<p>AirPrint is Apple's built-in wireless printing protocol. When you tap Print on an iPhone or iPad, iOS automatically discovers compatible printers on the same Wi-Fi network — no app or driver installation required. If your HP printer doesn't appear in the AirPrint printer list, it means iOS cannot discover it, the printer is on a different network segment, or the AirPrint service on the printer has stalled.</p>

<h2>Step 1: Verify Both Devices Are on the Same Wi-Fi Network</h2>
<p>This is the most common cause. AirPrint uses mDNS (Bonjour) for discovery, which only works within the same network subnet:</p>
<ol>
  <li>On your iPhone: Settings &gt; Wi-Fi. Note the network name your phone is connected to.</li>
  <li>On your HP printer: Print a Network Configuration Page (Settings &gt; Reports &gt; Network Configuration) and check the SSID field.</li>
  <li>Both must show the <strong>exact same network name</strong>. If your router broadcasts separate 2.4GHz and 5GHz networks with different names, your phone may be on 5GHz while the HP printer is on 2.4GHz — they appear separate to AirPrint discovery even though it is the same physical router.</li>
</ol>

<h2>Step 2: Restart the Printer and iPhone</h2>
<ol>
  <li>Turn the HP printer completely off using the power button. Wait 30 seconds. Turn it back on.</li>
  <li>On your iPhone: Settings &gt; General &gt; Shut Down (or press and hold the side button). Power it off completely, wait 10 seconds, then turn it on.</li>
  <li>Try printing again after both devices have fully restarted. AirPrint discovery caches can become stale and a fresh restart clears them.</li>
</ol>

<h2>Step 3: Check That AirPrint Is Enabled on the HP Printer</h2>
<p>AirPrint is enabled by default on most HP printers but can be accidentally disabled via the Embedded Web Server:</p>
<ol>
  <li>Type the printer's IP address into a browser to open HP EWS.</li>
  <li>Navigate to <strong>Network &gt; AirPrint</strong>.</li>
  <li>Ensure AirPrint is set to <strong>Enabled</strong>.</li>
  <li>Click Apply and restart the printer.</li>
</ol>

<h2>Step 4: Check Your Router for mDNS/Bonjour Issues</h2>
<p>AirPrint uses mDNS (multicast DNS, also called Bonjour) to broadcast the printer's presence on the network. Some routers block multicast traffic by default:</p>
<ul>
  <li>Log into your router admin panel and look for a setting called <strong>mDNS proxy</strong>, <strong>Bonjour proxy</strong>, or <strong>Multicast forwarding</strong>.</li>
  <li>If you have both 2.4GHz and 5GHz networks, look for an <strong>AP Isolation</strong> or <strong>Client Isolation</strong> setting. When enabled, devices on the same Wi-Fi network cannot discover each other — including AirPrint discovery. <strong>Disable AP Isolation.</strong></li>
  <li>If you have a mesh Wi-Fi system (Eero, Google Nest, Orbi), ensure the printer and iPhone are associated with the same mesh node, or that the mesh system has mDNS roaming enabled.</li>
</ul>

<h2>Step 5: Update HP Printer Firmware</h2>
<p>Firmware updates frequently include AirPrint compatibility improvements:</p>
<ol>
  <li>On the HP Smart app: select your printer &gt; Printer Details &gt; Update Printer.</li>
  <li>Or via EWS: General &gt; Firmware Update &gt; Check for Updates.</li>
  <li>Install any available updates and restart the printer.</li>
  <li>Try AirPrint again after the update completes.</li>
</ol>

<h2>Advanced: Assign a Static IP to the HP Printer</h2>
<p>If the printer's IP address changes frequently due to DHCP lease renewals, AirPrint discovery can break because iOS cached the old IP. Setting a static IP prevents this:</p>
<ol>
  <li>In HP EWS: Network &gt; IPv4 Configuration &gt; change to Manual.</li>
  <li>Enter a static IP outside your router's DHCP range (e.g., 192.168.1.200).</li>
  <li>Set the gateway to your router's IP and use 8.8.8.8 as the DNS server.</li>
  <li>Apply and restart the printer.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Does AirPrint work over mobile data (cellular)?</summary>
  <p>No. AirPrint requires both your iPhone and the HP printer to be on the same local Wi-Fi network. It does not work over cellular data. However, HP Smart app supports remote printing via HP's cloud servers even when you are away from home.</p>
</details>
<details>
  <summary>Which HP printers support AirPrint?</summary>
  <p>The vast majority of HP printers released after 2012 support AirPrint. The full list is available on Apple's website at support.apple.com/en-us/HT201311. If your printer is very old (pre-2012), it may not support AirPrint even with firmware updates.</p>
</details>
<details>
  <summary>AirPrint worked yesterday but stopped today — what happened?</summary>
  <p>This is almost always a DHCP IP address change. The printer got a new IP from your router and iOS still remembers the old one. Restart both the printer and your iPhone. If it keeps recurring, set a static IP (see Step 5 above) or a DHCP reservation on your router.</p>
</details>

<h2>When to Contact HP Support</h2>
<p>If your HP printer appears in HP Smart app but not in AirPrint, there is likely a firmware bug with the AirPrint mDNS broadcast on your specific printer model. Contact HP Support at support.hp.com with your printer's exact model number and firmware version (both found on the Network Configuration Page).</p>`
  },
  {
    id: '39a48d61-064e-437a-97bf-727060ee057c',
    slug: 'hp-web-jetadmin-not-discovering-printers',
    wordCount: 1000,
    content: `<h2>Why HP Web Jetadmin Isn't Discovering Printers</h2>
<p>HP Web Jetadmin (WJA) is HP's enterprise fleet management tool for IT administrators. When it fails to discover printers, the cause is almost always a network-level communication barrier: firewall rules blocking the discovery protocols, the WJA server being on a different network segment than the printers, or SNMP being disabled or misconfigured on the target printers.</p>

<h2>Understanding How WJA Discovers Printers</h2>
<p>HP Web Jetadmin discovers printers using several protocols simultaneously:</p>
<ul>
  <li><strong>SNMP (UDP port 161):</strong> The primary discovery protocol. WJA broadcasts an SNMP query and printers that have SNMP v1/v2 enabled respond with their device information.</li>
  <li><strong>SLP (Service Location Protocol, UDP port 427):</strong> Used by older HP printers for automatic network service announcement.</li>
  <li><strong>IP Range Scanning:</strong> WJA can scan a defined IP range and probe each address for HP printer services on TCP ports 9100 and 80.</li>
</ul>

<h2>Step 1: Verify SNMP Is Enabled on Target Printers</h2>
<ol>
  <li>Access the HP Embedded Web Server (EWS) of a printer that WJA cannot find (type its IP in a browser).</li>
  <li>Navigate to <strong>Network &gt; SNMP</strong>.</li>
  <li>Ensure SNMP v1/v2 is <strong>Enabled</strong> and the read community string is set to <code>public</code> (or whatever WJA is configured to use).</li>
  <li>If using SNMP v3, verify the authentication credentials in WJA match what's configured on the printer.</li>
  <li>Apply settings. Retry discovery in WJA.</li>
</ol>

<h2>Step 2: Verify Firewall Rules Allow SNMP Traffic</h2>
<p>Windows Firewall and network firewalls commonly block UDP port 161 (SNMP):</p>
<ol>
  <li>On the WJA server: open Windows Defender Firewall &gt; Advanced Settings.</li>
  <li>Check <strong>Inbound Rules</strong> for rules blocking UDP 161. Also check <strong>Outbound Rules</strong>.</li>
  <li>Create an inbound and outbound rule allowing UDP port 161 and 162 (SNMP trap) for the WJA application.</li>
  <li>If you have a network firewall between the WJA server and the printer subnet, ask your network team to allow UDP 161 bi-directionally between the WJA server IP and the printer subnet.</li>
</ol>

<h2>Step 3: Use IP Range Discovery Instead of Broadcast</h2>
<p>SNMP broadcast discovery only works within the same network broadcast domain. If printers are on a different VLAN or subnet, broadcasts won't reach them:</p>
<ol>
  <li>In WJA: go to <strong>Device Management &gt; Discover Devices</strong>.</li>
  <li>Select <strong>IP Range</strong> discovery method instead of <strong>Broadcast</strong>.</li>
  <li>Enter the IP range of the subnet where printers reside (e.g., 192.168.10.1 to 192.168.10.254).</li>
  <li>Ensure the WJA server has a network route to reach that subnet (check via <code>ping [printer IP]</code> from the WJA server command line).</li>
</ol>

<h2>Step 4: Check WJA Service Account Permissions</h2>
<p>WJA runs as a Windows service. If its service account lacks network access permissions:</p>
<ol>
  <li>Open Windows Services (services.msc) and find <strong>HP Web Jetadmin</strong>.</li>
  <li>Right-click &gt; Properties &gt; Log On tab.</li>
  <li>Verify the service account has network access. If it runs as "Local System," it may be restricted from accessing remote subnets in some domain environments. Change it to a domain service account with appropriate network permissions.</li>
</ol>

<h2>Step 5: Update HP Web Jetadmin</h2>
<p>HP Web Jetadmin is updated frequently to add support for new printer models. If WJA is an older version, it may not recognize newer HP printer model identifiers in SNMP responses:</p>
<ol>
  <li>Go to hp.com/go/webjetadmin and download the latest version.</li>
  <li>Update WJA — settings and device database are preserved during upgrade.</li>
  <li>Retry discovery after updating.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can WJA discover printers across VLANs?</summary>
  <p>Yes, but only via IP range discovery (not broadcast). You also need firewall rules allowing SNMP (UDP 161) between the WJA server and the printer VLANs. Configure each printer subnet as a separate IP range discovery job in WJA.</p>
</details>
<details>
  <summary>WJA discovered the printer before but it disappeared — why?</summary>
  <p>This is almost always a DHCP IP change. The printer got a new IP and WJA's database still shows the old one as "missing." Set static IPs or DHCP reservations on your managed printers to prevent this. WJA also has a scheduled rediscovery feature — enable it to automatically re-detect printers after IP changes.</p>
</details>
<details>
  <summary>Does WJA work with non-HP printers?</summary>
  <p>WJA can discover non-HP printers via SNMP but with very limited management capabilities. Full features (firmware updates, configuration deployment, supplies ordering) only work with HP printers.</p>
</details>

<h2>When to Contact HP Support</h2>
<p>If WJA can ping the printer but SNMP discovery still fails after verifying all settings, the issue may be a WJA database corruption or a known bug in your WJA version. Contact HP Enterprise Support at hp.com/go/support with your WJA version number and the output of the WJA discovery log (WJA &gt; Tools &gt; Event Log).</p>`
  },
  {
    id: '4c5b2ab9-84e8-4665-aed9-d0a9b4421bfe',
    slug: 'hp-utility-not-opening-mac',
    wordCount: 990,
    content: `<h2>Why HP Utility Won't Open on Mac</h2>
<p>HP Utility is a macOS application bundled with HP printer drivers that provides access to printer maintenance tools: ink level monitoring, printhead cleaning, alignment, and supply ordering. When HP Utility refuses to open on Mac, the cause is almost always an incompatibility between the HP software version and your current macOS version — particularly after a macOS major version upgrade.</p>

<h2>Understanding the HP Utility / HP Smart Transition</h2>
<p>HP deprecated the legacy "HP Utility" application starting with macOS Monterey (12.x). On modern Macs (macOS Monterey, Ventura, and Sonoma), HP Utility may either fail to open or show a message that it is no longer supported. HP has replaced its functionality with the <strong>HP Smart app</strong>, available free from the Mac App Store.</p>
<p>If you are on macOS Monterey or later and HP Utility won't open, installing HP Smart is the intended solution.</p>

<h2>Step 1: Install HP Smart (Recommended for macOS 12+)</h2>
<ol>
  <li>Open the <strong>Mac App Store</strong>.</li>
  <li>Search for <strong>HP Smart</strong> and install it (it is free and official from HP Inc.).</li>
  <li>Open HP Smart and add your printer. HP Smart replicates all the core HP Utility functions: ink levels, printhead cleaning, alignment, supply ordering, and diagnostics.</li>
</ol>

<h2>Step 2: Reinstall HP Printer Drivers (macOS 11 and Earlier)</h2>
<p>If you are on macOS Big Sur (11.x) or earlier and HP Utility won't launch:</p>
<ol>
  <li>Open the <strong>Mac App Store</strong> and search for your HP printer model. Apple and HP distribute printer-specific driver packages through the App Store as "printer plugins."</li>
  <li>Alternatively, go to support.hp.com, enter your Mac's macOS version, download the full HP software package, and reinstall it.</li>
  <li>After reinstalling the driver package, HP Utility will be in your Applications folder &gt; Hewlett-Packard subfolder.</li>
</ol>

<h2>Step 3: Reset the Printing System (Nuclear Option)</h2>
<p>A corrupted printer installation can prevent HP Utility from launching even when the application file appears intact:</p>
<ol>
  <li>Open <strong>System Preferences</strong> (or System Settings on Ventura+) &gt; <strong>Printers &amp; Scanners</strong>.</li>
  <li>Right-click (or Control-click) in the printer list on the left side.</li>
  <li>Select <strong>Reset printing system</strong>. Confirm the dialog. This removes all printers and driver data.</li>
  <li>Re-add your HP printer using the + button. macOS will download a fresh driver from Apple's servers.</li>
  <li>After re-adding, check Applications &gt; Hewlett-Packard for HP Utility.</li>
</ol>

<h2>Step 4: Check for macOS Gatekeeper / Security Blocks</h2>
<p>macOS Gatekeeper can block HP Utility from opening if it detects an unsigned or quarantined application file:</p>
<ol>
  <li>Try to open HP Utility by double-clicking it in Finder.</li>
  <li>If you see the message "HP Utility cannot be opened because it is from an unidentified developer": go to <strong>System Preferences &gt; Security &amp; Privacy &gt; General</strong>.</li>
  <li>Click <strong>Open Anyway</strong> next to the HP Utility warning.</li>
  <li>Alternatively: right-click HP Utility in Finder and select <strong>Open</strong> — this bypasses Gatekeeper for that specific launch.</li>
</ol>

<h2>Advanced: Remove All HP Software and Start Fresh</h2>
<p>If HP Utility continues to fail, old HP software components may be conflicting:</p>
<ol>
  <li>Download the HP Uninstaller from support.hp.com (search for "HP Uninstaller for Mac").</li>
  <li>Run the HP Uninstaller and remove all HP software components including drivers, utilities, and plugins.</li>
  <li>Restart your Mac.</li>
  <li>Reinstall fresh from support.hp.com or use the Mac App Store to install HP Smart.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Is HP Utility still supported on macOS Ventura and Sonoma?</summary>
  <p>No. HP Utility is not compatible with macOS Ventura (13.x) or Sonoma (14.x). HP has officially replaced HP Utility with HP Smart on these platforms. All HP Utility features (cleaning, alignment, ink levels, diagnostics) are available in HP Smart.</p>
</details>
<details>
  <summary>HP Smart doesn't have the same features as HP Utility — how do I access advanced maintenance?</summary>
  <p>In HP Smart on Mac: click your printer tile, then click the gear icon &gt; Printer Home Page (EWS). The HP Embedded Web Server opens in your browser and provides advanced maintenance tools including printhead cleaning, print quality reports, and supply management — often with more depth than HP Utility had.</p>
</details>
<details>
  <summary>HP Utility opens but says the printer is offline even though it's printing fine — why?</summary>
  <p>This is a known HP Utility display bug. The utility lost its connection to the printer's monitoring service (HP Launcher). Quit HP Utility, quit HP Launcher from the Mac status bar (if visible), and reopen HP Utility. It should reconnect to the printer on launch.</p>
</details>
<details>
  <summary>Can I manage my HP printer without HP Utility or HP Smart?</summary>
  <p>Yes. Type your printer's IP address into a browser to access the HP Embedded Web Server (EWS). The EWS provides complete maintenance and configuration access directly through the browser without any HP software installed on your Mac.</p>
</details>

<h2>When to Contact HP Support</h2>
<p>If you are on macOS Big Sur or earlier and HP Utility still won't open after a fresh reinstall and a printing system reset, contact HP Support at support.hp.com. Provide your exact macOS version and HP printer model — HP Support can confirm whether your printer model has known incompatibilities with your specific macOS version.</p>`
  }
];

async function main() {
  console.log('🔧 Expanding HP Batch 4 (Final HP batch) — 3 articles\n');
  for (const exp of expansions) {
    try {
      const clean = stripLinks(exp.content);
      await prisma.article.update({ where: { id: exp.id }, data: { content: clean, wordCount: exp.wordCount } });
      const words = clean.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter((w: string) => w.length > 0).length;
      console.log(`✅ ${exp.slug} → ~${words} real words`);
    } catch (e: any) {
      console.log(`⚠️ ${exp.slug}: ${e.message}`);
    }
  }
  console.log('\n✅ HP Batch 4 complete — all HP thin articles resolved!');
}

main().then(async () => prisma.$disconnect()).catch(async e => { console.error(e); prisma.$disconnect(); process.exit(1); });
