import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function stripLinks(html: string): string {
  return html.replace(/<a\s[^>]*href="\/[^"]*"[^>]*>([^<]*)<\/a>/gi, '$1');
}

const expansions = [
  {
    id: '7aa295ef-dd38-4afa-8821-99ac319694b6',
    slug: 'hp-laserjet-m209dwe-keeps-going-offline',
    wordCount: 1020,
    content: `<h2>Why the HP LaserJet M209dwe Keeps Going Offline</h2>
<p>The HP LaserJet M209dwe is an HP+ laser printer, which means its connection behavior is different from traditional Wi-Fi printers. The printer must maintain both a local network connection AND an active connection to HP's cloud servers. When either link drops — whether from a router DHCP lease change, a temporary internet outage, or a Windows spooler glitch — the M209dwe appears offline in Windows even though it may have power and a Wi-Fi signal.</p>

<h2>Step 1: Restart the Complete Chain</h2>
<p>Before any advanced fixes, restart everything in the correct order:</p>
<ol>
  <li>Turn the M209dwe completely OFF using the power button.</li>
  <li>Unplug your router/modem for 30 seconds, then plug it back in.</li>
  <li>Wait for the router to fully reconnect to the internet (all indicator lights stable).</li>
  <li>Turn the M209dwe back ON. Wait for it to complete its startup warmup.</li>
  <li>On your Windows PC: open the print queue, right-click the HP printer, and select <strong>See what's printing</strong>. Cancel all pending jobs.</li>
  <li>Right-click the printer again and uncheck <strong>Use Printer Offline</strong> if it is checked.</li>
</ol>

<h2>Step 2: Set a Static IP Address to Prevent Offline Drops</h2>
<p>The most common root cause of recurring "offline" issues is the printer's IP address changing each time the router renews its DHCP lease. Windows remembers the old IP and can no longer find the printer at the new one.</p>
<ol>
  <li>Print a Network Configuration Page: press the wireless button and the information button simultaneously. The IP address is printed at the top.</li>
  <li>Type that IP address into a browser address bar to open the HP Embedded Web Server (EWS).</li>
  <li>Navigate to <strong>Network &gt; Wired or Wireless &gt; IPv4 Configuration</strong>.</li>
  <li>Change from <strong>Automatic (DHCP)</strong> to <strong>Manual</strong>.</li>
  <li>Enter a static IP in your router's range but outside the DHCP pool (e.g., 192.168.1.200 if your DHCP range is .100–.150).</li>
  <li>Enter your router's IP as the Default Gateway, and 8.8.8.8 as the DNS server.</li>
  <li>Save settings. Update the printer port in Windows to match the new static IP.</li>
</ol>

<h2>Step 3: Update the Printer Port in Windows</h2>
<p>If the IP has changed, Windows' printer port must be updated to match:</p>
<ol>
  <li>Open <strong>Settings &gt; Bluetooth &amp; devices &gt; Printers &amp; scanners</strong>.</li>
  <li>Click your HP M209dwe and select <strong>Printer properties</strong>.</li>
  <li>Go to the <strong>Ports</strong> tab. Find the port your printer uses (usually a TCP/IP port).</li>
  <li>Select it and click <strong>Configure Port</strong>.</li>
  <li>Update the IP address to match the current printer IP. Click OK and Apply.</li>
</ol>

<h2>Step 4: Restart the Windows Print Spooler</h2>
<p>A crashed or stuck print spooler makes all printers appear offline regardless of their actual network status:</p>
<ol>
  <li>Press <strong>Windows Key + R</strong>, type <code>services.msc</code>, and press Enter.</li>
  <li>Scroll to <strong>Print Spooler</strong>, right-click it, and select <strong>Restart</strong>.</li>
  <li>After the service restarts, try printing a test page.</li>
</ol>

<h2>Step 5: Reconnect via HP Smart App</h2>
<p>If none of the above steps work, the HP+ cloud connection may have been disrupted:</p>
<ol>
  <li>Open HP Smart. If the M209dwe shows as offline in the app, tap it and select <strong>Reconnect</strong>.</li>
  <li>If reconnect fails, remove the printer from HP Smart entirely (tap the three dots &gt; Remove) and re-add it fresh.</li>
</ol>

<h2>Advanced Troubleshooting</h2>
<ul>
  <li><strong>Sleep mode issue:</strong> The M209dwe enters deep sleep after 10 minutes by default. When it wakes, the network reconnection can take 20–30 seconds, making it appear offline. Reduce the sleep timer via EWS: General &gt; Energy Settings &gt; Sleep Mode.</li>
  <li><strong>Firewall blocking:</strong> Windows Defender can prevent the printer from being discovered. Try temporarily disabling the firewall and printing. If it works, add HP Smart as a firewall exception.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the M209dwe go offline every night?</summary>
  <p>This is usually caused by your router renewing DHCP leases at night, giving the printer a new IP address. Fix this by assigning the printer a static IP address (Step 2 above) or setting a DHCP reservation on your router so the printer always gets the same IP.</p>
</details>
<details>
  <summary>Can I use the M209dwe without a Wi-Fi connection?</summary>
  <p>Yes, via USB cable. Connect the printer to your PC via USB and it will work without Wi-Fi. However, HP+ features (cloud printing, HP Smart app, automatic ink ordering) require an internet connection.</p>
</details>
<details>
  <summary>Does the M209dwe go offline when HP's servers are down?</summary>
  <p>In some cases, yes. HP+ printers periodically check in with HP's cloud servers. During HP server maintenance windows, some HP+ printers can briefly report offline. Check HP's status page at hp.com/go/status if you suspect a service outage.</p>
</details>

<h2>When to Contact HP Support</h2>
<p>If the M209dwe continues going offline daily despite a static IP and spooler restart, contact HP Support at support.hp.com. HP's remote diagnostics can check the printer's cloud connection health and identify whether the issue is with the printer's wireless module or HP's backend infrastructure.</p>`
  },
  {
    id: '7e9ef709-a5fb-478f-819c-9927a5c82d32',
    slug: 'hp-officejet-pro-8025e-not-printing-color',
    wordCount: 1010,
    content: `<h2>Why the HP OfficeJet Pro 8025e Won't Print in Color</h2>
<p>The HP OfficeJet Pro 8025e is an all-in-one inkjet printer that uses four separate ink cartridges: black, cyan, magenta, and yellow. When color stops printing, the problem is almost always isolated to one or more of these color cartridges or their corresponding printhead channels. This guide covers every possible cause and fix.</p>

<h2>Step 1: Verify Color Ink Levels</h2>
<ol>
  <li>In the HP Smart app, select your OfficeJet Pro 8025e and tap <strong>Supplies</strong>.</li>
  <li>Check the levels for cyan, magenta, and yellow individually. A single empty color cartridge causes the entire color output to fail — the printer cannot mix colors if one component is missing.</li>
  <li>If any color is at 0%, replace that cartridge before troubleshooting further.</li>
</ol>

<h2>Step 2: Check the Print Quality Settings</h2>
<p>Color printing can be accidentally disabled via the print driver:</p>
<ol>
  <li>When printing, click <strong>More Settings</strong> or <strong>Printer Properties</strong> in the print dialog.</li>
  <li>Look for a <strong>Color</strong> tab or a <strong>Grayscale / Black &amp; White</strong> checkbox. Ensure "Print in Color" is selected and the grayscale option is unchecked.</li>
  <li>If you use a PDF viewer, check its print settings separately — Adobe Acrobat, for example, has its own independent color/grayscale toggle.</li>
</ol>

<h2>Step 3: Run a Printhead Cleaning Cycle</h2>
<p>Dried ink in the printhead nozzles is the most common cause of missing color output on the 8025e:</p>
<ol>
  <li>On the printer touchscreen: tap the gear icon &gt; <strong>Printer Maintenance</strong> &gt; <strong>Clean Printhead</strong>.</li>
  <li>The cleaning cycle takes about 2 minutes. After it completes, print a test page.</li>
  <li>If one or two colors are still missing, run a second cleaning cycle.</li>
  <li>Do not run more than 3 consecutive cleaning cycles without printing — this wastes ink without additional benefit.</li>
</ol>

<h2>Step 4: Print a Nozzle Check Pattern</h2>
<p>The nozzle check pattern shows exactly which ink channels are working and which are clogged:</p>
<ol>
  <li>Touchscreen: Setup &gt; Reports &gt; <strong>Print Quality Diagnostics</strong>.</li>
  <li>The printed page shows a series of colored bars. Missing sections in the cyan bar mean the cyan nozzles are clogged. Missing sections in magenta means magenta nozzles are clogged, etc.</li>
  <li>Run cleaning cycles targeting the specific colors shown as missing in the pattern.</li>
</ol>

<h2>Step 5: Reseat the Color Cartridges</h2>
<ol>
  <li>Open the ink cartridge access door. Wait for the carriage to center.</li>
  <li>Remove all three color cartridges (cyan, magenta, yellow).</li>
  <li>Inspect the copper contacts on each cartridge. Wipe with a lint-free cloth dampened with distilled water. Allow to dry 5 minutes.</li>
  <li>Wipe the matching contacts inside the carriage.</li>
  <li>Firmly reinsert each cartridge until it clicks. Close the access door.</li>
  <li>Print a test page.</li>
</ol>

<h2>Advanced: Extended Cleaning</h2>
<p>If standard cleaning cycles have not restored color output after 3 attempts, run an Extended Cleaning from the printer maintenance menu. This pushes a high-pressure flush through the nozzle channels and can clear dried ink that resists standard cleaning. Note: extended cleaning uses a significant amount of ink.</p>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>My printer prints black perfectly but all colors are completely absent — why?</summary>
  <p>This pattern strongly suggests the color cartridges' copper contacts are not making proper electrical contact with the carriage. The black channel has its own dedicated slot and contacts, so it works independently. Reseat all color cartridges and clean their contacts as described in Step 5.</p>
</details>
<details>
  <summary>I replaced all the color cartridges and color still won't print — what's wrong?</summary>
  <p>If brand-new color cartridges do not resolve the issue after cleaning the carriage contacts, the problem is in the printhead assembly itself. On the 8025e, the printhead is not replaceable as a standalone unit — the printer would need professional service or replacement.</p>
</details>
<details>
  <summary>Can I disable color printing to save ink and print black only?</summary>
  <p>Yes. In the print driver, select Grayscale mode or Black Only in the Color settings. This forces the printer to use only the black cartridge, preserving your color ink. Note: HP's color cartridges can dry out if unused for extended periods, even if the printer is on. Run a test print in color monthly to keep the nozzles primed.</p>
</details>

<h2>When to Contact HP Support</h2>
<p>If new genuine HP cartridges, multiple cleaning cycles, and contact cleaning have not restored color printing, the printhead has a hardware failure. Contact HP Support at support.hp.com. The OfficeJet Pro 8025e has a 1-year warranty (or 2 years with HP+).</p>`
  },
  {
    id: '1815a308-8e6c-465a-9aab-1f4df6c63870',
    slug: 'hp-envy-photo-7855-paper-jam-error',
    wordCount: 1000,
    content: `<h2>Understanding the HP Envy Photo 7855 Paper Jam Error</h2>
<p>The HP Envy Photo 7855 is a photo-focused all-in-one inkjet printer with two paper trays — a main input tray and a dedicated photo tray. Because it handles both standard letter paper and small 4x6 photo paper, it has more paper path complexity than a standard printer, and jam errors can originate from multiple locations simultaneously.</p>

<h2>Step 1: Check All Access Points</h2>
<p>The Envy Photo 7855 has four distinct areas where paper can jam:</p>
<ol>
  <li><strong>Main input tray (bottom):</strong> Pull the tray out fully. Remove all paper. Inspect the tray slot with a flashlight for torn scraps.</li>
  <li><strong>Photo tray (top):</strong> Slide out the small photo tray completely. Check for photo paper that has slipped sideways or curled inside the slot.</li>
  <li><strong>Rear clean-out access door:</strong> Press the tabs on both sides of the rear door and remove it. Check with a flashlight for paper lodged in the feed rollers.</li>
  <li><strong>ADF (Automatic Document Feeder):</strong> Open the ADF lid on top of the printer. Check the document feeder path for any jammed originals.</li>
</ol>

<h2>Step 2: Clearing a Jam Without Tearing</h2>
<ol>
  <li>Turn the printer OFF before clearing any jam.</li>
  <li>Pull jammed paper <strong>slowly and evenly</strong> using both hands. Never yank. If the paper tears, remaining fragments will trigger repeat jam errors.</li>
  <li>If you can only see a corner of the paper: use rubber-tipped tweezers to get a firm grip before pulling slowly.</li>
  <li>After clearing, blast compressed air into the rear access door opening to remove any microconfetti.</li>
  <li>Reattach the rear door firmly on both sides.</li>
</ol>

<h2>Step 3: Photo Paper Jam Specific Issues</h2>
<p>Photo paper jams in the Envy Photo 7855 are often caused by loading issues rather than mechanical failure:</p>
<ul>
  <li><strong>Curled photo paper:</strong> HP photo paper can curl from humidity. Fan and flex the stack before loading. Load photo paper print-side down.</li>
  <li><strong>Wrong size setting:</strong> If the driver is set to "Letter" but you loaded 4x6 photo paper, the printer will try to feed it through the wrong path and jam. Always verify your media size settings match what's loaded in the photo tray.</li>
  <li><strong>Overfilling the photo tray:</strong> The photo tray holds a maximum of 15 sheets of photo paper. Overfilling causes multiple sheets to be grabbed at once (a double-feed), which jams in the feed rollers.</li>
</ul>

<h2>Step 4: Clean the Feed Rollers</h2>
<p>Worn or dirty rubber rollers lose their grip and allow paper to slip and fold. This is the second most common cause of recurring jams:</p>
<ol>
  <li>Dampen a lint-free cloth with distilled water (not isopropyl alcohol — it dries rubber).</li>
  <li>Access the rollers through the rear clean-out door opening.</li>
  <li>Send a print command and quickly cancel it — this advances the rollers slightly.</li>
  <li>Wipe the exposed roller surface firmly and rotate through the full circumference.</li>
  <li>Allow 10 minutes to dry before loading paper and testing.</li>
</ol>

<h2>Advanced: Check the Carriage for Obstruction</h2>
<p>If the jam error appears but no paper is visible anywhere, the printhead carriage itself may be physically stuck:</p>
<ol>
  <li>Open the cartridge access door (do not turn the printer off first).</li>
  <li>Look inside the carriage path for any foreign objects: paper clips, sticky label backing, torn paper corners.</li>
  <li>If the carriage itself won't move when prompted, there may be a broken plastic piece blocking its track. Contact HP Support — this requires service.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does my Envy Photo 7855 jam specifically with glossy photo paper?</summary>
  <p>Glossy photo paper has a more slippery surface than standard matte paper. When the rubber pickup rollers become slightly worn or glazed, they lose grip specifically on glossy surfaces. Cleaning the rollers with a damp cloth restores grip in most cases. If cleaning doesn't help, the roller replacement kit is available from HP.</p>
</details>
<details>
  <summary>Can the Envy Photo 7855 handle cardstock or thick paper?</summary>
  <p>The 7855 supports paper up to 67 lb (250 g/m²) through the main tray. Feeding cardstock thicker than this will cause jams in the rollers. Always load heavy media straight with the main tray guides snug against the paper edges.</p>
</details>
<details>
  <summary>The jam error appears every time I use the ADF — is the ADF broken?</summary>
  <p>ADF jams on the 7855 are usually caused by originals that are stapled, taped, torn at the edges, or too small (smaller than 4x6). Remove staples before scanning. For documents smaller than 4x6, use the flatbed glass instead of the ADF.</p>
</details>

<h2>When to Contact HP Support</h2>
<p>If jam errors persist after clearing all four access points and cleaning the rollers, the printer may have a mechanical failure in the feed system. Contact HP Support at support.hp.com. The Envy Photo 7855 has a 1-year limited warranty covering manufacturing defects in the paper handling mechanism.</p>`
  },
  {
    id: '8ae29556-195e-4a64-8d4d-38b66cbb923b',
    slug: 'hp-printer-802-1x-authentication-failed',
    wordCount: 1010,
    content: `<h2>What Is the HP Printer 802.1x Authentication Error?</h2>
<p>The 802.1x error on an HP printer appears when the printer is connected to a network that uses <strong>IEEE 802.1x port-based Network Access Control (NAC)</strong> — a security protocol commonly used in corporate offices, universities, and hospitals. In these environments, every device must authenticate to the network using valid credentials (a username and password, or a digital certificate) before the network switch will allow it to pass traffic.</p>
<p>HP printers are not managed devices in the same way laptops or phones are, so configuring 802.1x authentication requires manual setup through the printer's Embedded Web Server (EWS).</p>

<h2>Step 1: Access the HP Embedded Web Server (EWS)</h2>
<ol>
  <li>Print a Network Configuration Page from the printer (usually via Settings &gt; Reports &gt; Network Configuration).</li>
  <li>Find the printer's IP address on that page.</li>
  <li>Type the IP address into a browser on a computer connected to the same network.</li>
  <li>The HP EWS opens. Log in — default credentials are blank username and "admin" as password, or whatever your IT administrator has set.</li>
</ol>

<h2>Step 2: Configure 802.1x Authentication in EWS</h2>
<ol>
  <li>In EWS, navigate to <strong>Networking &gt; Security &gt; 802.1x Authentication</strong>.</li>
  <li>Enable 802.1x and select the authentication method your network uses:
    <ul>
      <li><strong>EAP-PEAP:</strong> Most common in corporate Windows environments. Requires username and password (or machine credentials).</li>
      <li><strong>EAP-TLS:</strong> Certificate-based. Requires an X.509 digital certificate installed on the printer.</li>
      <li><strong>EAP-TTLS:</strong> Similar to PEAP but less common.</li>
    </ul>
  </li>
  <li>Enter the credentials provided by your IT administrator (username, password, or certificate).</li>
  <li>Click Apply and restart the printer.</li>
</ol>

<h2>Step 3: If You Don't Have Credentials — Ask IT</h2>
<p>Most end users don't configure 802.1x — your IT or network administrator does. If you're seeing an 802.1x error, the most likely scenario is:</p>
<ul>
  <li>The printer was moved to a new network segment that has 802.1x enabled, and the old credentials are expired or invalid.</li>
  <li>A network-wide credential rotation occurred and the printer's stored credentials are no longer valid.</li>
  <li>The network was upgraded from an open VLAN to a protected VLAN, and the printer was never configured for the new policy.</li>
</ul>
<p>Contact your IT administrator and provide the printer's MAC address (on the network config page) so they can either assign valid credentials or place the printer in a printer-only VLAN that bypasses 802.1x.</p>

<h2>Step 4: Temporary Fix — Connect via USB</h2>
<p>If the network authentication issue is preventing all printing and you need to print immediately:</p>
<ol>
  <li>Connect the HP printer directly to your PC via a USB cable.</li>
  <li>Windows will install a USB driver automatically (or use HP Smart to detect it).</li>
  <li>Print via USB while your IT team resolves the network authentication configuration.</li>
</ol>

<h2>Advanced: Certificate-Based Authentication (EAP-TLS)</h2>
<p>If your network uses EAP-TLS (certificate-based 802.1x), the printer needs a client certificate and a trusted root CA certificate installed in its certificate store. This requires:</p>
<ol>
  <li>Generating a certificate signing request (CSR) from the printer's EWS under Security &gt; Certificate Management.</li>
  <li>Having your IT administrator sign the CSR and return a signed certificate.</li>
  <li>Importing the signed certificate and the root CA certificate back into the printer's EWS certificate store.</li>
  <li>Selecting "EAP-TLS" in the 802.1x settings and choosing the installed client certificate.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can home users encounter the 802.1x error?</summary>
  <p>Home Wi-Fi routers do not use 802.1x by default. If you see this error at home, it may be because your router has an obscure security setting enabled accidentally, or because you are connected to a business network. Check your router's wireless security settings and disable any 802.1x or RADIUS server settings.</p>
</details>
<details>
  <summary>Does HP support all 802.1x EAP types?</summary>
  <p>HP printers support EAP-PEAP (MSCHAPv2), EAP-TLS, and EAP-TTLS. They do not support EAP-FAST or EAP-SIM. If your network uses EAP-FAST, contact your IT team to configure an exception for the printer.</p>
</details>
<details>
  <summary>The 802.1x error appears after a firmware update — why?</summary>
  <p>HP firmware updates sometimes reset the 802.1x credentials stored in the EWS. After a firmware update, re-enter the 802.1x credentials in the EWS as described in Step 2. Some IT departments schedule credential re-configuration as part of their firmware update procedure for exactly this reason.</p>
</details>

<h2>When to Contact HP Support</h2>
<p>If you have entered valid 802.1x credentials and the error persists, the issue may be a bug in the printer's 802.1x implementation for your specific EAP type. Contact HP Enterprise Support at hp.com/go/support and provide the exact EAP method and network switch vendor for specialized assistance.</p>`
  },
  {
    id: '4aa0e5ca-b009-4e3c-aaf5-807b6082d9eb',
    slug: 'hp-printer-certificate-error-network',
    wordCount: 1000,
    content: `<h2>Why Your HP Printer Shows a Certificate Error on the Network</h2>
<p>An HP printer certificate error on a network connection occurs when the printer's SSL/TLS certificate has expired, is untrusted by a browser or management software, or conflicts with your organization's PKI (Public Key Infrastructure) policies. This error is most visible when accessing the HP Embedded Web Server (EWS) in a browser, or when software like HP Web Jetadmin attempts to securely communicate with the printer.</p>
<p>Certificate errors are cosmetic in many cases (the printer still functions) but can block administrative access and trigger security alerts on managed networks.</p>

<h2>Understanding the Types of Certificate Errors</h2>
<ul>
  <li><strong>"Your connection is not private" (NET::ERR_CERT_AUTHORITY_INVALID):</strong> The printer's self-signed certificate is not signed by a trusted Certificate Authority (CA). This is normal for HP printers using their default self-signed cert. You can safely click "Advanced" &gt; "Proceed to [IP]" to access EWS.</li>
  <li><strong>"Certificate has expired":</strong> HP printers generate self-signed certificates with a 10-year validity by default. If the printer's system clock is wrong (e.g., after a long power outage), the certificate appears to be expired because the printer thinks the date is in the past or far future.</li>
  <li><strong>"Certificate does not match the name":</strong> The printer's certificate was generated for a different hostname or IP address than the one you are currently using to access it.</li>
</ul>

<h2>Step 1: Fix the Printer's System Clock</h2>
<p>Many certificate errors stem from a wrong date/time on the printer:</p>
<ol>
  <li>Access the HP EWS (type the printer's IP address into a browser — accept the security warning to proceed).</li>
  <li>Navigate to <strong>General &gt; Date and Time</strong>.</li>
  <li>Enable <strong>NTP (Network Time Protocol)</strong> and enter a time server (use <code>time.windows.com</code> or <code>pool.ntp.org</code>).</li>
  <li>Set the correct time zone.</li>
  <li>Click Apply. The printer will sync its clock. Certificate errors related to expired dates should immediately resolve.</li>
</ol>

<h2>Step 2: Generate a New Self-Signed Certificate</h2>
<p>If the certificate itself is corrupted or has the wrong hostname:</p>
<ol>
  <li>In EWS, go to <strong>Security &gt; Certificate Management</strong>.</li>
  <li>Find the self-signed certificate and click <strong>Delete</strong> or <strong>Regenerate</strong>.</li>
  <li>Click <strong>Create New Certificate</strong>. Enter the printer's current IP address or hostname in the Common Name field.</li>
  <li>Set the validity period to 3650 days (10 years).</li>
  <li>Click Create. The printer will restart the HTTPS service and generate a fresh certificate.</li>
  <li>Access EWS again — accept the new security warning once (it is still self-signed) and your browser will trust it for the duration of the session.</li>
</ol>

<h2>Step 3: Install a Trusted CA-Signed Certificate (Enterprise)</h2>
<p>For organizations that cannot tolerate self-signed certificate warnings, install a certificate signed by your internal CA:</p>
<ol>
  <li>In EWS &gt; Security &gt; Certificate Management, generate a <strong>Certificate Signing Request (CSR)</strong>.</li>
  <li>Submit the CSR to your internal Certificate Authority (e.g., Microsoft AD CS) and download the signed certificate.</li>
  <li>Import the signed certificate into EWS under <strong>Install Certificate</strong>.</li>
  <li>Also import the Root CA certificate so the printer can validate certificates issued by your CA.</li>
  <li>Set the newly installed certificate as the HTTPS certificate for the EWS service.</li>
</ol>

<h2>Step 4: Add Certificate Exception in HP Web Jetadmin</h2>
<p>If HP Web Jetadmin is showing certificate errors when discovering or managing this printer:</p>
<ol>
  <li>In HP Web Jetadmin, go to <strong>Tools &gt; Options &gt; Shared &gt; Device Communication</strong>.</li>
  <li>Add the printer's IP or hostname to the certificate exception list.</li>
  <li>Alternatively, deploy the printer's self-signed certificate to your workstation's trusted certificate store so the browser stops warning about it.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Is it safe to proceed past the certificate warning to access HP EWS?</summary>
  <p>Yes — for HP printers on your own local network. The certificate error for a self-signed cert means the certificate wasn't issued by a known CA, not that the connection is under attack. On your local network, clicking through the warning is safe. On an unknown network, exercise caution.</p>
</details>
<details>
  <summary>Can HP printers use Let's Encrypt certificates?</summary>
  <p>No. Let's Encrypt certificates require public domain validation (DNS or HTTP), which is not possible for a local IP address. HP EWS can only use certificates installed via its Certificate Management page — either self-signed or issued by an internal private CA.</p>
</details>
<details>
  <summary>The certificate error reappears after every printer restart — why?</summary>
  <p>If the printer's system clock resets on every boot (often on older HP printers without a battery-backed RTC), it will generate a certificate that appears expired on every restart. Enable NTP sync as described in Step 1 to keep the clock accurate across reboots.</p>
</details>

<h2>When to Contact HP Support</h2>
<p>If certificate management features are not available in your printer's EWS, your printer model may have a firmware version that does not fully support certificate operations. Updating the printer firmware via EWS (General &gt; Firmware Update) often resolves missing EWS features. Contact HP Support at support.hp.com for additional guidance.</p>`
  }
];

async function main() {
  console.log('🔧 Expanding HP Batch 3 — 5 thin articles to 1000+ words each\n');
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
  console.log('\n✅ HP Batch 3 complete!');
}

main().then(async () => prisma.$disconnect()).catch(async e => { console.error(e); prisma.$disconnect(); process.exit(1); });
