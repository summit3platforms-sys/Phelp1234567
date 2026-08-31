import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Generating 5,200+ Word HP Windows Update Master Pillar Guide...\n');

  const hpBrand = await prisma.brand.findUnique({ where: { slug: 'hp' } });
  if (!hpBrand) throw new Error('HP brand not found in DB');

  const category = await prisma.category.findUnique({ where: { slug: 'drivers-software-firmware' } });
  if (!category) throw new Error('drivers-software-firmware category not found in DB');

  const author = await prisma.author.findFirst();

  const title = 'HP Printer Not Working After Windows Update? 10 Ways to Fix It';
  const slug = 'hp-printer-not-working-after-windows-update';
  const seoTitle = 'HP Printer Not Working After Windows Update? 10 Ways to Fix It [2026]';
  const metaDescription = 'HP printer stopped working after a Windows Update? Master step-by-step engineering guide to fix spooler crashes, driver conflicts, offline states, and 0x0000011b errors.';
  const excerpt = 'Comprehensive master engineering guide to restore HP printing functionality after Windows 11 and Windows 10 updates. Detailed step-by-step fixes for Print Spooler crashes, WSD port drift, generic IPP driver overrides, Point-and-Print RPC 0x0000011b errors, and KB update rollbacks.';

  const fullContent = `
<h2>The Master Engineering Guide to Restoring HP Printers After Windows Updates</h2>
<p>Windows updates—ranging from monthly cumulative quality patches (such as Patch Tuesday rollouts) to annual feature updates (e.g., Windows 11 23H2/24H2 and Windows 10 22H2)—are essential for operating system security, kernel stability, and feature enhancements. However, Windows updates are also the single most frequent cause of catastrophic printing pipeline failures in enterprise, commercial, and residential environments. When an update deploys, it modifies critical OS printing subsystem binaries (<code>spoolsv.exe</code>, <code>winspool.drv</code>, <code>localspl.dll</code>), reconfigures Remote Procedure Call (RPC) authentication levels, replaces third-party kernel-mode driver shims, and resets local network port bindings.</p>

<p>When this happens, your HP printer may suddenly disappear from <em>Printers & Scanners</em>, display a persistent <strong>"Driver is Unavailable"</strong> alert, freeze on <strong>"Spooling..."</strong> or <strong>"Error - Printing"</strong>, fail across local network shares with error <code>0x0000011b</code>, or stay permanently in an <strong>"Offline"</strong> status despite having active Wi-Fi and power. If your printer is displaying specific on-screen text warnings, see our dedicated handbook on <a href="/hp/error-codes-alerts/hp-printer-error-messages">HP Printer Error Messages: What They Mean & How to Fix Them</a>, or consult our hardware code directory at <a href="/hp/error-codes-alerts/hp-printer-error-codes">HP Printer Error Codes: Complete List, Meanings & Solutions</a>.</p>

<p>This master guide provides a technical breakdown of the 10 proven engineering fixes required to diagnose, repair, and permanently stabilize HP printing engines following any Windows update. Whether managing a single desktop LaserJet or an enterprise fleet across Active Directory, these solutions will restore full printing functionality.</p>

<h2>30-Second Fast Triage Protocol</h2>
<div style="background: #f8fafc; border-left: 4px solid #0284c7; padding: 1.25rem; margin: 1.5rem 0; border-radius: 0 8px 8px 0;">
  <p style="margin: 0 0 0.5rem 0; font-weight: 700; color: #0369a1; font-size: 1.05rem;">⚡ Emergency 60-Second Recovery Checklist for Post-Update Printer Lockups:</p>
  <ol style="margin: 0; padding-left: 1.25rem; color: #334155; line-height: 1.6;">
    <li><strong>Restart the Windows Print Spooler:</strong> Open Command Prompt as Administrator and run: <code>net stop spooler && net start spooler</code>.</li>
    <li><strong>Perform a Complete DC Power Drain:</strong> Disconnect the AC power cord from the rear of the printer while powered on. Press and hold the physical <strong>Power button for 30 seconds</strong> to discharge internal switch-mode power supply capacitors and reset frozen motor controller registers. Reconnect directly to a wall socket.</li>
    <li><strong>Uncheck "Use Printer Offline":</strong> Open <em>Control Panel &gt; Devices and Printers</em>, double-click your HP printer, click the <em>Printer</em> menu, and ensure <strong>Use Printer Offline</strong> is unchecked.</li>
  </ol>
</div>

<h2>Windows Update Quality vs. Feature Update Impact Matrix</h2>
<p>Understanding which type of Windows update triggered your printer failure determines the most effective remediation vector:</p>

<table style="width:100%; border-collapse: collapse; margin: 20px 0; font-size: 0.95rem;">
  <thead>
    <tr style="background-color: #0f172a; color: #ffffff; text-align: left;">
      <th style="padding: 12px; border: 1px solid #334155;">Windows Update Type</th>
      <th style="padding: 12px; border: 1px solid #334155;">Examples / Cadence</th>
      <th style="padding: 12px; border: 1px solid #334155;">Printing Subsystems Modified</th>
      <th style="padding: 12px; border: 1px solid #334155;">Typical Failure Symptom</th>
      <th style="padding: 12px; border: 1px solid #334155;">Primary Fix Strategy</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: #ffffff;">
      <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Cumulative Quality Update (LCU)</strong></td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Monthly "Patch Tuesday" (e.g., KB5005565)</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">RPC authentication, <code>spoolsv.exe</code> security shims, Point-and-Print ACLs.</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Network print error <code>0x0000011b</code>, shared printer mapping drops.</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Configure <code>RpcAuthnLevelPrivacyEnabled</code> in registry or roll back specific KB.</td>
    </tr>
    <tr style="background-color: #f8fafc;">
      <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Feature Update / OS Upgrade</strong></td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Annual build upgrades (e.g., Windows 11 23H2 to 24H2)</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Driver Store migration, INF binding tables, WSD device pairing.</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">"Driver is Unavailable", printer vanishes, generic Microsoft IPP override.</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Clean driver removal via <code>printmanagement.msc</code> and full-feature OEM install.</td>
    </tr>
    <tr style="background-color: #ffffff;">
      <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Optional Driver Quality Update</strong></td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Windows Update Optional Updates</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Specific vendor class drivers (HP Inc. - Printing - x.x.x).</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Loss of custom tray selection, duplexing disabled, scanner broken.</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Roll back driver in Device Manager; install HP offline full software suite.</td>
    </tr>
    <tr style="background-color: #f8fafc;">
      <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Windows Defender Security Patch</strong></td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Weekly security definitions</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Firewall inbound/outbound rules, mDNS/Bonjour UDP 5353 filtering.</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Printer permanently "Offline", HP Smart app cannot discover printer.</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Switch from WSD to Standard TCP/IP Port; unblock ports 9100 and 5353.</td>
    </tr>
  </tbody>
</table>

<h2>The 10 Proven Fixes for HP Printers After Windows Update</h2>

<h3>Fix 1: The Nuclear Windows Print Spooler Deep Purge</h3>
<p>When Windows installs an update while documents reside in the print queue, the temporary spool buffer files become corrupted. The Windows Print Spooler service (<code>spoolsv.exe</code>) locks these damaged files into memory, causing the spooler to crash repeatedly or enter an infinite hang state. Standard "Cancel All Documents" clicks in the GUI fail because the OS kernel holds an active file lock. If your driver files were also displaced during the patch, refer to our guide on <a href="/hp/setup-installation/hp-printer-driver-missing-after-windows-update">HP Printer Driver Missing After a Windows Update? Fixed</a>.</p>

<p>To execute a deep, un-lockable spooler scrub:</p>
<ol>
  <li>Press <code>Win + S</code>, type <strong>cmd</strong>, right-click <strong>Command Prompt</strong>, and select <strong>Run as Administrator</strong>.</li>
  <li>Execute the following commands sequentially to stop the spooler, eliminate all locks, and purge disk buffers:
    <pre><code>net stop spooler
taskkill /F /IM spoolsv.exe
del /Q /F /S "%systemroot%\\System32\\Spool\\Printers\\*.*"
del /Q /F /S "%systemroot%\\System32\\Spool\\SERVERS\\*.*"
net start spooler</code></pre>
  </li>
  <li><strong>Verify Spooler Service Startup Type & Recovery Triggers:</strong> Run <code>services.msc</code>, locate <strong>Print Spooler</strong>, double-click it, ensure the <em>Startup type</em> is set to <strong>Automatic</strong>, and verify that the <em>Recovery</em> tab is set to <strong>Restart the Service</strong> on First, Second, and Subsequent failures with a reset counter of 1 day.</li>
</ol>

<h3>Fix 2: Eliminating WSD Port Drift with a Fixed Standard TCP/IP Port</h3>
<p>By default, Windows uses <strong>Web Services for Devices (WSD)</strong> to connect to network printers. WSD relies on dynamic device polling and multicast beaconing. Following Windows updates, the local WSD monitor frequently loses synchronization with your router's DHCP lease table, causing the printer to show as permanently <strong>"Offline"</strong> even though its IP address is reachable. For detailed wireless recovery steps, see <a href="/hp/connectivity-issues/hp-envy-5055-offline-but-connected">HP Envy 5055 Offline But Connected? [Real Fix]</a> and <a href="/hp/connectivity-issues/hp-laserjet-m209dwe-keeps-going-offline">HP LaserJet M209dwe Keeps Going Offline? Fixed</a>.</p>

<p>Migrating to a fixed <strong>Standard TCP/IP Port</strong> eliminates WSD layer instability entirely:</p>
<ol>
  <li><strong>Locate the Printer's Fixed IP Address:</strong> On the printer touchscreen, tap the Wireless / Network icon to view its IPv4 address (e.g., <code>192.168.1.150</code>). Alternatively, print a Network Configuration Report from the setup menu.</li>
  <li><strong>Open Printer Properties:</strong> Press <code>Win + R</code>, type <code>control printers</code>, right-click your HP printer, and select <strong>Printer properties</strong> (do not select generic "Properties").</li>
  <li><strong>Add Standard TCP/IP Port:</strong>
    <ul>
      <li>Navigate to the <strong>Ports</strong> tab and click <strong>Add Port...</strong>.</li>
      <li>Select <strong>Standard TCP/IP Port</strong> and click <strong>New Port...</strong> to launch the wizard.</li>
      <li>Enter your printer's static IP address into the <em>Printer Name or IP Address</em> field.</li>
      <li>Uncheck <em>"Query the printer and automatically select the driver to use"</em> to avoid driver confusion, then click <strong>Next</strong> and <strong>Finish</strong>.</li>
    </ul>
  </li>
  <li><strong>Disable SNMP Status Polling:</strong> Select the newly created TCP/IP port, click <strong>Configure Port...</strong>, and <strong>uncheck SNMP Status Enabled</strong>. In Windows 11, transient network latency causes SNMP polling timeouts, which trigger false offline states. Official troubleshooting protocols are documented in <a href="https://support.microsoft.com/en-us/windows/fix-printer-connection-and-printing-problems-in-windows-fb830ffd-2e5f-46fe-a7ee-58f49e83c23b" target="_blank" rel="noopener noreferrer">Microsoft Support: Fix printer connection and printing problems in Windows</a>.</li>
</ol>

<h3>Fix 3: Complete Driver Package Removal via Print Management Console</h3>
<p>When a Windows Feature Update deploys, it migrates existing driver packages into the new OS build's DriverStore directory. If this migration experiences an interrupted checksum verification, the printer becomes corrupted, displaying <strong>"Driver is Unavailable"</strong>. Simply clicking "Uninstall Device" in Settings does not delete the corrupted core driver binary files from the disk.</p>

<p>To purge and reinstall the driver stack completely:</p>
<ol>
  <li><strong>Open Print Management:</strong> Press <code>Win + R</code>, type <code>printmanagement.msc</code>, and hit Enter. (If on Windows 11 Home edition without Print Management, run <code>printui /s /t2</code>).</li>
  <li><strong>Delete Printer Instance:</strong> Under <em>Custom Filters &gt; All Printers</em>, right-click the HP printer and select <strong>Delete</strong>.</li>
  <li><strong>Remove the Driver Package:</strong> Under <em>Custom Filters &gt; All Drivers</em>, locate all HP driver entries. Right-click each and select <strong>Remove Driver Package...</strong>. Choose <strong>"Delete driver and driver package"</strong> and click <strong>Delete</strong>. If an error states the driver is in use, restart the Print Spooler service and retry.</li>
  <li><strong>Install the Official Offline Full-Feature Driver:</strong> Visit the <a href="https://support.hp.com/us-en/drivers" target="_blank" rel="noopener noreferrer">Official HP Software & Driver Downloads</a> portal, download the offline Full Feature Software package (avoiding the basic web installer), and execute the installation. For a step-by-step walk-through, see our dedicated guide on <a href="/hp/drivers-software-firmware/hp-printer-driver-unavailable-windows-11">HP Printer "Driver is Unavailable" in Windows 11? Fix</a>.</li>
</ol>

<h3>Fix 4: Resolving Microsoft Generic IPP Class Driver Overrides</h3>
<p>A frequent post-update bug occurs when Windows Update automatically replaces your proprietary HP full-feature driver with a generic <strong>Microsoft IPP Class Driver</strong> or <strong>Microsoft Enhanced Point and Print Driver</strong>. While this generic driver allows basic single-sided monochrome printing, it breaks advanced printer hardware features, including automatic duplexing, multi-tray selection, borderless photo printing, and integrated flatbed scanning.</p>

<p>To restore the native HP manufacturer driver:</p>
<ol>
  <li>Open <strong>Device Manager</strong> (press <code>Win + X</code> and select Device Manager).</li>
  <li>Expand the <strong>Print queues</strong> and <strong>Printers</strong> categories.</li>
  <li>Right-click your HP printer and select <strong>Update driver</strong>.</li>
  <li>Choose <strong>"Browse my computer for drivers"</strong>, then select <strong>"Let me pick from a list of available drivers on my computer"</strong>.</li>
  <li>Look for the entry that contains the explicit model name with manufacturer attribution (e.g., <em>"HP Color LaserJet Pro M283fdw PCL-6"</em> or <em>"HP OfficeJet Pro 9010 series"</em>) rather than <em>"IPP Class Driver"</em>.</li>
  <li>Select the manufacturer driver, click <strong>Next</strong>, and complete the wizard.</li>
</ol>

<h3>Fix 5: Fixing RPC Point-and-Print Security Hardening (Error 0x0000011b / 0x0000007c)</h3>
<p>Following Microsoft security updates designed to mitigate the "PrintNightmare" vulnerability (CVE-2021-34481), Windows enforces strict Remote Procedure Call (RPC) packet privacy encryption for shared network printers. If your HP printer is connected to a host desktop PC or Windows Print Server and shared across your local network, client computers will fail to connect, throwing error codes <code>0x0000011b</code>, <code>0x0000007c</code>, or <code>0x00000bcb</code>.</p>

<p>To resolve this communication block on the host machine sharing the printer:</p>
<ol>
  <li>Press <code>Win + R</code>, type <code>regedit</code>, and press Enter to launch the Registry Editor.</li>
  <li>Navigate to the following key:
    <code>HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Control\\Print</code>
  </li>
  <li>Right-click in the right-hand pane, select <strong>New &gt; DWORD (32-bit) Value</strong>, and name it:
    <code>RpcAuthnLevelPrivacyEnabled</code>
  </li>
  <li>Double-click the new value and set its <strong>Value data to 0</strong>.</li>
  <li>Restart the Print Spooler service on both the server and client machines. Comprehensive enterprise RPC security policies are detailed in <a href="https://learn.microsoft.com/en-us/troubleshoot/windows-client/printing/windows-11-rpc-point-and-print-guidance" target="_blank" rel="noopener noreferrer">Microsoft Learn: Manage Point and Print restrictions and RPC authentication in Windows</a>.</li>
</ol>

<h3>Fix 6: Clearing Windows Defender Firewall & Network Port Blocks</h3>
<p>Major Windows updates frequently reset Windows Defender Firewall inbound rules to default factory profiles, blocking bidirectional network traffic between the PC and the HP printer. For wireless network printing to function seamlessly, several dedicated network ports must be open:</p>
<ul>
  <li><strong>RAW Print Port (Port 9100 TCP):</strong> Used by HP Jetdirect and standard TCP/IP direct printing.</li>
  <li><strong>Line Printer Remote (LPR Port 515 TCP):</strong> Legacy network spooling.</li>
  <li><strong>Internet Printing Protocol (IPP Port 631 TCP):</strong> Modern IPP and secure AirPrint traffic.</li>
  <li><strong>mDNS / Bonjour (Port 5353 UDP):</strong> Required for HP Smart and network printer broadcast discovery.</li>
  <li><strong>SNMP Polling (Port 161 UDP):</strong> Bi-directional status monitoring.</li>
</ul>

<p>To verify and unblock these ports via PowerShell:</p>
<ol>
  <li>Open <strong>PowerShell as Administrator</strong>.</li>
  <li>Execute the following commands to create firewall pass-through rules for HP printing:
    <pre><code>New-NetFirewallRule -DisplayName "HP Direct Print (RAW 9100)" -Direction Inbound -LocalPort 9100 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "HP Discovery (mDNS 5353)" -Direction Inbound -LocalPort 5353 -Protocol UDP -Action Allow
New-NetFirewallRule -DisplayName "HP IPP Printing (631)" -Direction Inbound -LocalPort 631 -Protocol TCP -Action Allow</code></pre>
  </li>
</ol>

<h3>Fix 7: Re-Registering Windows Printing Subsystem DLLs & WMI Components</h3>
<p>If the Windows update process experienced a file lock during installation, the core COM/OLE dynamic link libraries (DLLs) responsible for the printing user interface and Windows Management Instrumentation (WMI) status reporting can lose their system registration. This leads to crashes whenever you click <em>Print</em> inside desktop applications.</p>

<p>To re-register all printing subsystem components:</p>
<ol>
  <li>Open <strong>Command Prompt as Administrator</strong>.</li>
  <li>Run the following batch of system registration commands:
    <pre><code>regsvr32 /s winspool.drv
regsvr32 /s spoolss.dll
regsvr32 /s prnfldr.dll
regsvr32 /s printui.dll
regsvr32 /s ole32.dll
regsvr32 /s oleaut32.dll</code></pre>
  </li>
  <li><strong>Rebuild WMI Repository:</strong> If printer status queries hang, rebuild the WMI repository by running:
    <pre><code>winmgmt /salvagerepository
winmgmt /resetrepository</code></pre>
  </li>
  <li>Restart your computer.</li>
</ol>

<h3>Fix 8: Fixing HP Smart Windows Store App & UWP Sandboxing Failures</h3>
<p>Windows updates frequently break the Universal Windows Platform (UWP) permissions for the <strong>HP Smart</strong> app downloaded from the Microsoft Store. When this occurs, the app becomes stuck on <em>"Searching for printer"</em> or fails to authenticate your HP account. If you are experiencing these app discovery bugs, consult our step-by-step solutions in <a href="/hp/setup-installation/hp-smart-app-cant-find-printer-windows-11">HP Smart App Can't Find Your Printer on Windows 11? Fix</a> and <a href="/hp/setup-installation/uninstall-hp-smart-app-without-breaking-printer">How to Uninstall HP Smart App Without Breaking Your Printer</a>.</p>
<ol>
  <li><strong>Reset the HP Smart App:</strong> Go to <em>Settings &gt; Apps &gt; Installed apps</em>. Locate <strong>HP Smart</strong>, click the three dots, select <strong>Advanced options</strong>, and click <strong>Reset</strong>.</li>
  <li><strong>Transition to Standalone Offline Drivers:</strong> Enterprise and professional environments should avoid relying on the UWP HP Smart app. Instead, download the standalone <strong>HP Universal Print Driver (UPD)</strong> or the model-specific <strong>HP Full Feature Software and Drivers</strong> from HP Support, which run as native Win32 services without UWP sandbox constraints.</li>
</ol>

<h3>Fix 9: Uninstalling the Specific Problematic Windows Quality Update (KB Rollback)</h3>
<p>If your HP printer stopped functioning immediately following a specific monthly Quality Update, and all software fixes have failed, the update may contain a known regression bug documented in Microsoft's Windows Release Health dashboard. Rolling back the specific KB patch restores immediate printing while waiting for Microsoft to issue an out-of-band hotfix.</p>

<p>To identify and uninstall a breaking Windows update:</p>
<ol>
  <li><strong>Review Update History:</strong> Go to <em>Settings &gt; Windows Update &gt; Update history</em>. Check the most recent updates installed under <em>Quality Updates</em>. Note the KB number (e.g., <code>KB5005565</code>).</li>
  <li><strong>Uninstall via Command Line:</strong> Open Command Prompt as Administrator and run:
    <pre><code>wusa /uninstall /kb:XXXXXXX /quiet /norestart</code></pre>
    *(Replace XXXXXXX with your specific KB number)*.
  </li>
  <li><strong>Uninstall via Windows Recovery Environment (WinRE):</strong> If Windows refuses to uninstall the update within the desktop session, hold the <code>Shift</code> key while clicking <strong>Restart</strong>. In the blue recovery menu, go to <em>Troubleshoot &gt; Advanced options &gt; Uninstall Updates &gt; Uninstall latest quality update</em>.</li>
</ol>

<h3>Fix 10: Hardware Firmware Alignment & Pre-Boot NVRAM Synchronization</h3>
<p>When major Windows kernel updates modify the bi-directional USB or network protocol handshake, older printer onboard firmware may fail to decode incoming print packets, resulting in blank pages, infinite paper feeds, or Error 79 control panel crashes. Synchronizing the printer's onboard firmware ensures protocol compatibility.</p>
<ol>
  <li><strong>Update Printer Firmware via Embedded Web Server (EWS):</strong> Open a web browser, enter your printer's IP address, navigate to the <strong>Tools / Management</strong> tab, select <strong>Printer Updates / Firmware Update</strong>, and click <strong>Check Now</strong>.</li>
  <li><strong>Execute a Cold NVRAM Reset:</strong> If the printer's internal controller remains locked in an invalid communication state, perform a cold hardware initialization. On touchscreen LaserJets and OfficeJets, turn the printer OFF, press and hold the <strong>Right Arrow + Cancel (X)</strong> buttons, power the printer ON, and hold until the screen displays <em>"Permanent Storage Init"</em>.</li>
</ol>

<h2>Deep Technical Analysis: Why Windows Updates Break Printing Subsystems</h2>
<p>To build long-term operational resilience across corporate networks and home offices, IT professionals must understand the low-level architectural changes introduced during Windows Updates:</p>

<h3>1. Driver Isolation Model & Process Separation</h3>
<p>Historically, Windows loaded printer drivers directly inside the address space of <code>spoolsv.exe</code>. A crash in a third-party vendor driver DLL would immediately bring down the entire Windows spooling service for all connected devices. Modern Windows 11 and Windows 10 versions enforce <strong>Print Driver Isolation</strong>, executing driver rendering in an external process named <code>PrintIsolationHost.exe</code>. When Windows updates update the isolation policy shims, legacy Type 3 (user-mode) drivers fail to instantiate inside the host wrapper, causing silent job drops.</p>

<h3>2. The Transition from Type 3/4 Drivers to Mopria IPP Class Drivers</h3>
<p>Microsoft is actively deprecating legacy v3 and v4 vendor-supplied printer drivers in favor of the universal Mopria / IPP standards. During major build upgrades, Windows Setup scans your driver inventory. If an older HP driver lacks modern WHQL cryptographic metadata for the current Windows kernel revision, Windows quietly unbinds the HP driver and attaches the generic Microsoft IPP driver. This transition frequently strips proprietary features like secure PIN printing, booklet creation, job accounting, and automatic media sensing.</p>

<h3>3. WSD Dynamic Enumeration vs. Socket Architecture</h3>
<p>Web Services for Devices (WSD) operates over WS-Discovery (UDP port 3702). When a Windows PC enters sleep or when an update reboots the system, Windows broadcasts a probe packet across the subnet. If your Wi-Fi router isolates multicast traffic between 2.4 GHz and 5 GHz bands, or if IGMP snooping is throttled, the PC receives no response and immediately shifts the printer into an offline state. Standard TCP/IP RAW Port 9100, by contrast, opens a direct unicast socket directly to the printer's network interface card (NIC), bypassing broadcast discovery completely.</p>

<h2>Section 11: Windows Driver Signature Enforcement (DSE) & Legacy HP Devices</h2>
<p>On 64-bit editions of Windows 11 and Windows 10, the Windows kernel enforces strict <strong>Driver Signature Enforcement (DSE)</strong>. When a feature update upgrades the core kernel security policies, older legacy HP printers (such as LaserJet 1018, 1020, P1102w, or Photosmart C4780) whose driver certificates have expired are automatically blocked from loading in ring 0/ring 3:</p>
<ol>
  <li><strong>Verify Signature Errors in Event Viewer:</strong> Open Event Viewer (<code>eventvwr.msc</code>) and check <em>Applications and Services Logs &gt; Microsoft &gt; Windows &gt; PrintService &gt; Admin</em>. Look for Event ID 370 or Event ID 808 ("The print spooler failed to load a plug-in module").</li>
  <li><strong>Deploy the HP Universal Print Driver (UPD) in PCL 6 or PostScript:</strong> Instead of fighting legacy driver signatures, install the modern HP Universal Print Driver, which is signed with current Microsoft Authenticode cryptographic certificates and supports older PCL5/PCL6 hardware engines.</li>
</ol>

<h2>Section 12: Resolving the "Print to PDF / Generic Text Fallback" Bug</h2>
<p>A frequent glitch following Windows cumulative updates is the sudden loss of printer assignment in web browsers (Google Chrome, Microsoft Edge). When users press <code>Ctrl + P</code>, the destination printer reverts to <em>"Save as PDF"</em> or a phantom <em>"Generic / Text Only"</em> device:</p>
<ul>
  <li><strong>Disable "Let Windows Manage My Default Printer":</strong> Open <em>Settings &gt; Bluetooth & Devices &gt; Printers & Scanners</em>. Scroll down to Printer preferences and toggle <strong>"Let Windows manage my default printer" to OFF</strong>. This prevents Windows from switching your default output device to the last used virtual printer.</li>
  <li><strong>Set Explicit System Default:</strong> Select your physical HP printer from the list and click <strong>Set as default</strong>.</li>
</ul>

<h2>Section 13: System File Checker (SFC) & DISM Component Store Repair</h2>
<p>If the Windows Update package itself suffered bit corruption during download, core Windows printing system DLLs (such as <code>localspl.dll</code>, <code>winspool.drv</code>, or <code>gdi32.dll</code>) can remain in a corrupted state on disk:</p>
<ol>
  <li>Open <strong>Command Prompt as Administrator</strong>.</li>
  <li>Execute the DISM image health cleanup:
    <pre><code>DISM /Online /Cleanup-Image /RestoreHealth</code></pre>
  </li>
  <li>Execute the System File Checker scan to replace corrupted printing binaries from the component store:
    <pre><code>sfc /scannow</code></pre>
  </li>
  <li>Restart the computer once the scan reaches 100% completion.</li>
</ol>

<h2>Section 14: USB Controller Power Management & Selective Suspend</h2>
<p>For HP printers connected directly via USB cable (such as LaserJet Pro M15w, DeskJet 2755e, or OfficeJet 8025e), Windows updates frequently re-enable aggressive <strong>USB Selective Suspend</strong> power-saving policies on motherboard root hubs:</p>
<ul>
  <li><strong>Symptom:</strong> The printer prints immediately after boot, but after 15 minutes of inactivity, Windows puts the USB hub to sleep and never wakes it when a print job arrives, causing the print job to freeze in the queue.</li>
  <li><strong>Fix:</strong> Open <em>Device Manager &gt; Universal Serial Bus controllers</em>. Right-click each <strong>USB Root Hub</strong> and <strong>Generic USB Hub</strong>, select <em>Properties &gt; Power Management</em>, and <strong>uncheck "Allow the computer to turn off this device to save power"</strong>.</li>
</ul>

<h2>Section 15: Windows 11 24H2 on ARM64 (Snapdragon X Elite) Emulation Shims</h2>
<p>With the rise of ARM-powered Windows Copilot+ PCs running Snapdragon X Elite processors, Windows 11 24H2 introduces the PRISM emulation engine. Legacy x86/x64 kernel printer drivers cannot execute inside PRISM emulation mode:</p>
<ol>
  <li><strong>ARM64 Driver Binding:</strong> When installing an HP printer on an ARM64 Windows 11 PC, avoid standard 32-bit/64-bit EXE installers. Use the native <strong>ARM64 HP Universal Print Driver</strong> or configure the printer via native Mopria/IPP over standard TCP/IP.</li>
  <li><strong>Print Spooler 64-bit Thunking:</strong> Ensure the <code>SplWOW64.exe</code> 32-to-64 bit thunking layer is running in Task Manager if printing from legacy 32-bit desktop business applications.</li>
</ol>

<h2>Section 16: Active Directory Kerberos Ticket Expiration on Print Queues</h2>
<p>In enterprise Windows domain environments, Windows Cumulative Updates enforce stricter PAC (Privilege Attribute Certificate) validation on Kerberos tickets during printer access (CVE-2022-37967):</p>
<ul>
  <li><strong>Symptom:</strong> Users can authenticate to file shares but receive "Access Denied" when sending print jobs to shared HP LaserJet network queues.</li>
  <li><strong>Remediation:</strong> Purge stale Kerberos tickets on the client workstation by opening Command Prompt and running <code>klist purge</code>. Ensure print server SPNs (Service Principal Names) are properly registered with <code>setspn -A HOST/printserver01 domain\\printserver01$</code>.</li>
</ul>

<h2>Section 17: Remote Desktop Services (RDS) & Citrix Printer Redirection</h2>
<p>When connecting to virtual desktops or Remote Desktop Servers (RDS) after a host Windows update, client-side HP printers often fail to redirect or appear with a generic <em>"Redirected (Port PRN)"</em> label that produces blank pages:</p>
<ol>
  <li><strong>Enable Easy Print Driver Policy:</strong> On the RDS Session Host, open <code>gpedit.msc</code> and navigate to <em>Computer Configuration &gt; Administrative Templates &gt; Windows Components &gt; Remote Desktop Services &gt; Remote Desktop Session Host &gt; Printer Redirection</em>.</li>
  <li>Set <strong>"Use Remote Desktop Easy Print printer driver first"</strong> to <strong>Enabled</strong>. This forces the server to use Microsoft's built-in XPS rasterizer, eliminating the need to install matching vendor driver binaries on the terminal server.</li>
</ol>

<h2>Section 18: IPv6 Link-Local Addressing & SLAAC Routing Conflicts</h2>
<p>When Windows updates re-initialize the TCP/IP network stack (<code>tcpip.sys</code>), the operating system gives preference to Stateless Address Autoconfiguration (SLAAC) IPv6 addresses over IPv4. Many older HP Jetdirect and integrated wireless print cards have incomplete IPv6 routing tables. When Windows sends print jobs to the printer's link-local IPv6 address (<code>fe80::...</code>), the printer drops packets silently:</p>
<ol>
  <li><strong>Disable IPv6 on the Printer Embedded Web Server (EWS):</strong> Open your browser, navigate to the printer's IPv4 address, click <em>Networking &gt; Network Protocols</em>, and uncheck <strong>Enable IPv6</strong>.</li>
  <li><strong>Enforce IPv4 in Windows Port Configuration:</strong> In Windows <em>Printer Properties &gt; Ports</em>, ensure the port points strictly to the IPv4 decimal string (e.g. <code>192.168.1.150</code>) rather than a hostname that resolves to IPv6.</li>
</ol>

<h2>Section 19: Windows Subsystem for Linux (WSL2) & CUPS Direct Printing</h2>
<p>Developers running Linux distributions (Ubuntu, Debian) inside Windows Subsystem for Linux 2 (WSL2) often discover that Windows updates break network bridge routing to local HP network printers:</p>
<ul>
  <li><strong>Mirrored Networking Mode:</strong> In Windows 11 23H2/24H2, edit your <code>.wslconfig</code> file located at <code>C:\\Users\\&lt;Username&gt;\\.wslconfig</code> and add:
    <pre><code>[wsl2]
networkingMode=mirrored</code></pre>
  </li>
  <li><strong>Direct CUPS IPP Routing:</strong> Inside the WSL2 terminal, add the HP printer using native IPP over localhost socket forwarding: <code>lpadmin -p HP_Printer -E -v ipp://192.168.1.150/ipp/print -m everywhere</code>.</li>
</ul>

<h2>Section 20: Virtualization-Based Security (VBS) & Print Spooler Hardening</h2>
<p>Modern Windows 11 installations enforce <strong>Virtualization-Based Security (VBS)</strong> and <strong>Hypervisor-Enforced Code Integrity (HVCI)</strong>. When Windows updates strengthen hypervisor page protections, older third-party print monitor DLLs trying to execute unsigned code in memory are terminated immediately by Windows Defender:</p>
<ol>
  <li><strong>Audit Print Monitor Registry Keys:</strong> Open Registry Editor and navigate to <code>HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Print\\Monitors</code>.</li>
  <li><strong>Clean Orphaned Monitors:</strong> Remove legacy third-party port monitor entries from decommissioned printers (such as old Lexmark or Canon shims), leaving only standard Microsoft monitors (<code>BJ Language Monitor</code>, <code>Local Port</code>, <code>Standard TCP/IP Port</code>, <code>USB Monitor</code>, <code>WSD Port</code>).</li>
  <li>Restart the Print Spooler service to apply clean memory allocations.</li>
</ol>

<h2>Section 21: Enabling Print Management Console on Windows 11 Home</h2>
<p>By default, Windows 11 Home edition does not include the GUI <code>printmanagement.msc</code> snap-in. However, users on Home edition can install the complete management package using DISM:</p>
<ol>
  <li>Open <strong>Command Prompt as Administrator</strong>.</li>
  <li>Run: <code>DISM /Online /Add-Capability /CapabilityName:Print.Management.Console~~~~0.0.1.0</code>.</li>
  <li>Once completed, you can launch <code>printmanagement.msc</code> directly from the Run dialog to manage printer drivers, isolated driver processes, and print queues with professional-grade controls.</li>
</ol>

<h2>Section 22: HP Print and Scan Doctor Automated Diagnostics</h2>
<p>HP provides a specialized diagnostic utility called <strong>HP Print and Scan Doctor</strong> designed to automate spooler recovery and port reassignment on Windows:</p>
<ul>
  <li><strong>Automated Spooler Reset:</strong> The utility checks registry keys under <code>HKLM\\SYSTEM\\CurrentControlSet\\Control\\Print\\Monitors</code> and automatically deletes third-party port monitor shims that crash the spooler.</li>
  <li><strong>Firewall Auto-Repair:</strong> The tool creates necessary outbound and inbound firewall exceptions for HP communication binaries in a single click.</li>
</ul>

<h2>Section 23: Windows Print Spooler Architecture & Data Flow Diagram</h2>
<p>Understanding the exact software pipeline helps isolate whether a post-update failure is happening at the application layer, the spooler buffering layer, or the network port monitor:</p>

<div style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 1.25rem; border-radius: 8px; margin: 1.5rem 0;">
  <p style="margin: 0 0 0.5rem 0; font-weight: 700; color: #0f172a;">Print Subsystem Pipeline Data Flow:</p>
  <ul style="margin: 0; padding-left: 1.25rem; color: #334155; line-height: 1.6;">
    <li><strong>Application Layer:</strong> Application calls Win32 GDI (<code>gdi32.dll</code>) or Direct2D/XPS print APIs.</li>
    <li><strong>Graphics Driver (PCL6 / PostScript Engine):</strong> <code>hpz91xxx.dll</code> or universal driver converts vector commands to raw raster pages.</li>
    <li><strong>Print Spooler Subsystem (<code>spoolsv.exe</code>):</strong> Allocates job ID, manages thread priority, and writes to <code>%systemroot%\\System32\\Spool\\Printers</code>.</li>
    <li><strong>Local Spooler Router (<code>localspl.dll</code>):</strong> Determines destination port type (Local, Standard TCP/IP, or WSD).</li>
    <li><strong>Port Monitor (<code>tcpmon.dll</code>):</strong> Opens raw socket on port 9100 and streams packets to HP printer network adapter.</li>
    <li><strong>Printer Formatter Board:</strong> Onboard ASIC decodes PCL stream into bitmap memory and triggers physical electrophotographic or thermal ink engine.</li>
  </ul>
</div>

<h2>Advanced PowerShell Diagnostic Toolkit for Windows Print Environments</h2>
<p>System administrators can execute this comprehensive PowerShell diagnostic script to inspect the health of all local print queues, port bindings, and driver isolation settings:</p>

<pre><code><#
.SYNOPSIS
    Deep Diagnostic Script for HP Printers Post-Windows Update.
.DESCRIPTION
    Audits print queues, port monitors, driver versions, and registry security flags.
#>

Write-Host "=========================================" -ForegroundColor Green
Write-Host "  HP WINDOWS PRINT SUBSYSTEM DIAGNOSTIC  " -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green

# 1. Audit Spooler Service Status
$Spooler = Get-Service -Name "Spooler"
Write-Host "Spooler Status: $($Spooler.Status) (Startup: $($Spooler.StartType))" -ForegroundColor Yellow

# 2. Enumerate Installed HP Printers and Ports
Write-Host ""
Write-Host "Installed HP Printers and Port Bindings:" -ForegroundColor Cyan
Get-Printer | Where-Object { $_.Name -like "*HP*" -or $_.DriverName -like "*HP*" } | Select-Object Name, DriverName, PortName, PrinterStatus, Shared | Format-Table -AutoSize

# 3. Check for Generic IPP Driver Overrides
$IppPrinters = Get-Printer | Where-Object { $_.DriverName -like "*IPP*" -or $_.DriverName -like "*Enhanced Point and Print*" }
if ($IppPrinters) {
    Write-Host "WARNING: Generic IPP Driver override detected on:" -ForegroundColor Red
    $IppPrinters | Select-Object Name, DriverName | Format-Table -AutoSize
} else {
    Write-Host "No generic IPP overrides detected." -ForegroundColor Green
}

# 4. Check Point-and-Print Registry RPC Privacy Flag
$RegPath = "HKLM:\System\CurrentControlSet\Control\Print"
$RpcVal = Get-ItemProperty -Path $RegPath -Name "RpcAuthnLevelPrivacyEnabled" -ErrorAction SilentlyContinue
if ($RpcVal) {
    Write-Host "RpcAuthnLevelPrivacyEnabled is set to: $($RpcVal.RpcAuthnLevelPrivacyEnabled)" -ForegroundColor Yellow
} else {
    Write-Host "RpcAuthnLevelPrivacyEnabled is NOT configured (Default Windows enforcement active)." -ForegroundColor Gray
}

# 5. Test Raw Network Port 9100 Socket
$HpPrinters = Get-Printer | Where-Object { $_.Name -like "*HP*" }
foreach ($P in $HpPrinters) {
    if ($P.PortName -match "^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$") {
        $SocketTest = Test-NetConnection -ComputerName $P.PortName -Port 9100 -WarningAction SilentlyContinue
        Write-Host "Network Socket (9100) Test for $($P.Name) ($($P.PortName)): $($SocketTest.TcpTestSucceeded)" -ForegroundColor ($SocketTest.TcpTestSucceeded ? "Green" : "Red")
    }
}

Write-Host ""
Write-Host "Diagnostic Audit Complete." -ForegroundColor Green
</code></pre>

<h2>Group Policy (GPO) Deployment for Enterprise Point-and-Print Stabilization</h2>
<p>For domain administrators managing Active Directory environments where Windows updates break shared printer connections across hundreds of client workstations, configure these Group Policy Objects (GPOs) to permanently stabilize Point-and-Print behavior:</p>

<ol>
  <li>Open the <strong>Group Policy Management Console (GPMC)</strong> on your Domain Controller.</li>
  <li>Navigate to <em>Computer Configuration &gt; Policies &gt; Administrative Templates &gt; Printers</em>.</li>
  <li>Configure the following policies:
    <ul>
      <li><strong>Point and Print Restrictions:</strong> Set to <strong>Enabled</strong>. Check <em>"Users can only point and print to these servers"</em> and enter your fully qualified print server hostnames (e.g., <code>printserver01.corp.domain.com</code>). Under security prompts, select <em>"Do not show warning or elevation prompt"</em> for both new connections and existing connections.</li>
      <li><strong>Package Point and Print - Approved Servers:</strong> Set to <strong>Enabled</strong> and add your trusted print server list.</li>
      <li><strong>Configure RPC Connection Settings:</strong> Set to <strong>RPC over named pipes</strong> or <strong>RPC over TCP</strong> depending on your firewall traversal requirements.</li>
    </ul>
  </li>
  <li>Link the GPO to your target Workstation Organizational Units (OUs) and execute <code>gpupdate /force</code> across endpoints.</li>
</ol>

<h2>Frequently Asked Questions (FAQ)</h2>
<details class="faq-disclosure">
  <summary class="faq-summary">Why does a Windows update break my HP printer?</summary>
  <div class="faq-answer">
    <p>Windows updates frequently replace manufacturer printer drivers with generic Microsoft IPP class drivers, reset custom TCP/IP ports to unstable dynamic WSD ports, alter RPC security authentication settings (causing error 0x0000011b), or lock corrupted temporary spool files in the Windows printing directory.</p>
  </div>
</details>

<details class="faq-disclosure">
  <summary class="faq-summary">How do I fix an HP printer that says "Driver is Unavailable" after a Windows 11 update?</summary>
  <div class="faq-answer">
    <p>Remove the printer from Settings, open Print Management (printmanagement.msc), delete the corrupted HP driver package from the system DriverStore, and install the official offline full-feature software suite downloaded directly from HP Support.</p>
  </div>
</details>

<details class="faq-disclosure">
  <summary class="faq-summary">Why does my HP printer show "Offline" after every Windows update?</summary>
  <div class="faq-answer">
    <p>Windows updates often re-enable WSD (Web Services for Devices) port monitoring and SNMP polling. When dynamic IP addresses change or transient network packet delays occur, Windows falsely flags the printer as offline. Switching the printer to a Standard TCP/IP Port with a static IP and disabling SNMP resolves this permanently.</p>
  </div>
</details>

<details class="faq-disclosure">
  <summary class="faq-summary">What is error 0x0000011b on shared HP printers after a Windows update?</summary>
  <div class="faq-answer">
    <p>Error 0x0000011b is caused by Microsoft security updates that enforce RPC authentication level privacy on shared network print queues. Creating the 32-bit DWORD registry key RpcAuthnLevelPrivacyEnabled with a value of 0 in HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Print on the host machine resolves the error.</p>
  </div>
</details>

<details class="faq-disclosure">
  <summary class="faq-summary">How do I clear a document that is stuck "Spooling" or "Deleting" after an update?</summary>
  <div class="faq-answer">
    <p>Open Command Prompt as Administrator and run: "net stop spooler", then delete all files in "C:\Windows\System32\Spool\Printers", and finally run "net start spooler". This forces the Windows print subsystem to release file locks on damaged temporary documents.</p>
  </div>
</details>

<details class="faq-disclosure">
  <summary class="faq-summary">Why did Windows Update disable duplex printing on my HP printer?</summary>
  <div class="faq-answer">
    <p>When Windows Update overrides your proprietary HP driver with a generic Microsoft IPP Class driver, advanced hardware capabilities like automatic duplexing (two-sided printing) and photo trays are disabled. Reverting to the official HP PCL 6 or full-feature driver restores duplex functionality.</p>
  </div>
</details>

<details class="faq-disclosure">
  <summary class="faq-summary">Can I uninstall a Windows update that broke my printer?</summary>
  <div class="faq-answer">
    <p>Yes. Open Settings > Windows Update > Update history, identify the recent Quality Update KB number, open Command Prompt as Administrator, and run "wusa /uninstall /kb:XXXXXXX" (replacing XXXXXXX with the specific update number) to roll back the patch.</p>
  </div>
</details>

<details class="faq-disclosure">
  <summary class="faq-summary">Why does the HP Smart app say "Printer Not Found" on Windows 11?</summary>
  <div class="faq-answer">
    <p>Windows updates can break UWP app sandboxing permissions or reset Windows Defender Firewall rules that block mDNS (Bonjour UDP port 5353) discovery packets. Resetting the app in Windows Settings or migrating to standalone offline HP drivers restores connectivity.</p>
  </div>
</details>

<details class="faq-disclosure">
  <summary class="faq-summary">How do I prevent Windows Update from replacing my working HP printer driver in the future?</summary>
  <div class="faq-answer">
    <p>In Windows, press Win + R, type "sysdm.cpl", go to the Hardware tab, click "Device Installation Settings", and select "No (your device might not work as expected)" to prevent Windows from automatically overwriting OEM drivers with generic Microsoft packages.</p>
  </div>
</details>

<details class="faq-disclosure">
  <summary class="faq-summary">What should I do if my HP printer fails to print after trying all software fixes?</summary>
  <div class="faq-answer">
    <p>Perform an unfiltered 30-second DC power drain, update the printer's onboard firmware via its Embedded Web Server (EWS), and execute a cold NVRAM reset to clear corrupted internal registers on the printer's DC controller board.</p>
  </div>
</details>
`;

  // Compute exact word count
  const plainText = fullContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = plainText.split(' ').filter(w => w.length > 0).length;

  console.log(`Generated content word count: ${wordCount} words.`);

  const faqs = JSON.stringify([
    {
      question: "Why does a Windows update break my HP printer?",
      answer: "Windows updates frequently replace manufacturer printer drivers with generic Microsoft IPP class drivers, reset custom TCP/IP ports to unstable dynamic WSD ports, alter RPC security authentication settings (causing error 0x0000011b), or lock corrupted temporary spool files in the Windows printing directory."
    },
    {
      question: "How do I fix an HP printer that says \"Driver is Unavailable\" after a Windows 11 update?",
      answer: "Remove the printer from Settings, open Print Management (printmanagement.msc), delete the corrupted HP driver package from the system DriverStore, and install the official offline full-feature software suite downloaded directly from HP Support."
    },
    {
      question: "Why does my HP printer show \"Offline\" after every Windows update?",
      answer: "Windows updates often re-enable WSD (Web Services for Devices) port monitoring and SNMP polling. When dynamic IP addresses change or transient network packet delays occur, Windows falsely flags the printer as offline. Switching the printer to a Standard TCP/IP Port with a static IP and disabling SNMP resolves this permanently."
    },
    {
      question: "What is error 0x0000011b on shared HP printers after a Windows update?",
      answer: "Error 0x0000011b is caused by Microsoft security updates that enforce RPC authentication level privacy on shared network print queues. Creating the 32-bit DWORD registry key RpcAuthnLevelPrivacyEnabled with a value of 0 in HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Control\\Print on the host machine resolves the error."
    },
    {
      question: "How do I clear a document that is stuck \"Spooling\" or \"Deleting\" after an update?",
      answer: "Open Command Prompt as Administrator and run: \"net stop spooler\", then delete all files in \"C:\\Windows\\System32\\Spool\\Printers\", and finally run \"net start spooler\". This forces the Windows print subsystem to release file locks on damaged temporary documents."
    },
    {
      question: "Why did Windows Update disable duplex printing on my HP printer?",
      answer: "When Windows Update overrides your proprietary HP driver with a generic Microsoft IPP Class driver, advanced hardware capabilities like automatic duplexing (two-sided printing) and photo trays are disabled. Reverting to the official HP PCL 6 or full-feature driver restores duplex functionality."
    },
    {
      question: "Can I uninstall a Windows update that broke my printer?",
      answer: "Yes. Open Settings > Windows Update > Update history, identify the recent Quality Update KB number, open Command Prompt as Administrator, and run \"wusa /uninstall /kb:XXXXXXX\" (replacing XXXXXXX with the specific update number) to roll back the patch."
    },
    {
      question: "Why does the HP Smart app say \"Printer Not Found\" on Windows 11?",
      answer: "Windows updates can break UWP app sandboxing permissions or reset Windows Defender Firewall rules that block mDNS (Bonjour UDP port 5353) discovery packets. Resetting the app in Windows Settings or migrating to standalone offline HP drivers restores connectivity."
    },
    {
      question: "How do I prevent Windows Update from replacing my working HP printer driver in the future?",
      answer: "In Windows, press Win + R, type \"sysdm.cpl\", go to the Hardware tab, click \"Device Installation Settings\", and select \"No (your device might not work as expected)\" to prevent Windows from automatically overwriting OEM drivers with generic Microsoft packages."
    },
    {
      question: "What should I do if my HP printer fails to print after trying all software fixes?",
      answer: "Perform an unfiltered 30-second DC power drain, update the printer's onboard firmware via its Embedded Web Server (EWS), and execute a cold NVRAM reset to clear corrupted internal registers on the printer's DC controller board."
    }
  ]);

  const article = await prisma.article.upsert({
    where: { slug },
    update: {
      title,
      seoTitle,
      metaDescription,
      excerpt,
      content: fullContent,
      faqs,
      wordCount,
      brandId: hpBrand.id,
      categoryId: category.id,
      difficultyLevel: 'Intermediate',
      timeToFix: '15 mins',
      printerModel: 'All HP LaserJet, OfficeJet, DeskJet & Envy Models',
      status: 'published',
      publishedAt: new Date(),
    },
    create: {
      title,
      slug,
      seoTitle,
      metaDescription,
      excerpt,
      content: fullContent,
      faqs,
      wordCount,
      brandId: hpBrand.id,
      categoryId: category.id,
      authorId: author?.id,
      difficultyLevel: 'Intermediate',
      timeToFix: '15 mins',
      printerModel: 'All HP LaserJet, OfficeJet, DeskJet & Envy Models',
      status: 'published',
      publishedAt: new Date(),
    }
  });

  console.log(`\n🎉 HP Windows Update Master Pillar Guide Published Successfully!`);
  console.log(`ID: ${article.id}`);
  console.log(`URL: /hp/${category.slug}/${article.slug}`);
  console.log(`Word Count: ${article.wordCount} words`);
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
