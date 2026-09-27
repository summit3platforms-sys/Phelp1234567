import { PrismaClient, SourceType } from '@prisma/client';
const prisma = new PrismaClient();

function countWords(html: string): number {
  return html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
}

async function updateBrotherArticle() {
  console.log('\n--- 1. Updating Brother HL-L2370DW Article ---');
  const slug = 'brother-hl-l2370dw-wifi-connection-deep-sleep-fix';
  const article = await prisma.article.findUnique({
    where: { slug },
    include: { revisions: { orderBy: { version: 'desc' }, take: 1 } }
  });
  if (!article) return;

  const content = `<h2>The Quick Answer</h2>
<p>When your Brother HL-L2370DW or HL-L2390DW enters Deep Sleep, its wireless card powers down and drops off your Wi-Fi network. The most reliable fix is disabling Deep Sleep via the control panel shortcut, assigning a reserved static IP address, and switching Windows from a WSD port to a Standard TCP/IP port.</p>

<h2>Understanding Brother Deep Sleep vs. Auto Power Off</h2>
<p>Brother monochrome laser printers operate through three power states: Ready, Sleep, and Deep Sleep. In standard Sleep mode, the fuser heater powers down while the internal network interface remains active, listening for incoming print spool broadcasts. In Deep Sleep, the machine enters a low-power standby mode, and the wireless transceiver reduces polling activity, which can cause network disconnects on certain routers.</p>

<p>For Auto Power Off, Brother notes that the machine does not enter Power Off mode while it is actively connected to a wired or wireless network, or when there are secure print jobs stored in memory.</p>

<h2>Control Panel Fix: Disabling Deep Sleep</h2>
<p>Both models allow you to disable Deep Sleep using a button shortcut. <em>Note: This menu isn't in Brother's manual; it's a hidden setting technicians use, and may not appear on every firmware version.</em></p>

<h3>For Brother HL-L2370DW (1-Line LCD Display)</h3>
<ol>
  <li>Press <strong>▲</strong> or <strong>▼</strong> to scroll to <strong>General Setup</strong>, then press <strong>OK</strong>.</li>
  <li>Scroll to <strong>Ecology</strong>, then press <strong>OK</strong>.</li>
  <li>Scroll to <strong>Sleep Time</strong>, then press <strong>OK</strong>.</li>
  <li>While the sleep time is displayed, press <strong>▼</strong> and <strong>Back</strong> at the exact same time. The screen will display <strong>Deep Sleep: On</strong>.</li>
  <li>Press <strong>▼</strong> to select <strong>Deep Sleep: Off</strong>, then press <strong>OK</strong>.</li>
  <li>Press <strong>Go</strong> to return to the Ready screen.</li>
</ol>

<h3>For Brother HL-L2390DW (2-Line LCD Display with Scan/Copy Keys)</h3>
<ol>
  <li>Press <strong>Menu</strong> on the control panel.</li>
  <li>Press <strong>▲</strong> or <strong>▼</strong> to select <strong>General Setup</strong>, then press <strong>OK</strong>.</li>
  <li>Select <strong>Ecology</strong>, then press <strong>OK</strong>.</li>
  <li>Select <strong>Sleep Time</strong>, then press <strong>OK</strong>.</li>
  <li>While inside the <strong>Sleep Time</strong> menu, press <strong>▼</strong> and <strong>Back</strong> simultaneously. The screen will display <strong>Deep Sleep</strong>.</li>
  <li>Press <strong>▼</strong> to select <strong>Off</strong>, then press <strong>OK</strong>.</li>
  <li>Scroll to <strong>Auto Power Off</strong> in the Ecology menu and verify it is set to <strong>Off</strong>.</li>
  <li>Press <strong>Stop/Exit</strong> to return to Ready status.</li>
</ol>

<p>To verify the printer's current network settings after changing these options, <a href="/brother/connectivity-issues/brother-printer-network-configuration-page-how-to-print">print a Brother network configuration report</a> directly from the machine.</p>

<h2>Configuring a Static IP via Web Based Management</h2>
<p>Dynamic Host Configuration Protocol (DHCP) allows routers to lease temporary IP addresses to connected hardware. When a Brother printer sleeps, routers may reassign its IP address. Assigning a permanent static IP ensures your computer always knows where to direct print traffic.</p>
<ol>
  <li>Find the printer's current IP address from your router client list or printed network configuration page.</li>
  <li>Open any web browser on a computer connected to the same network and type <code>http://[printer-ip-address]</code>.</li>
  <li>Log in using the administrator password. On newer units, look for the password printed on the machine's rear label marked "Pwd". On older models, use <code>initpass</code>.</li>
  <li>Navigate to the <strong>Network</strong> tab, then click <strong>Wireless</strong> (or <strong>Wired</strong> if using Ethernet).</li>
  <li>Select <strong>TCP/IP</strong>.</li>
  <li>Change the <strong>Boot Method</strong> from <strong>AUTO</strong> or <strong>DHCP</strong> to <strong>STATIC</strong>.</li>
  <li>Confirm that the IP Address, Subnet Mask, and Gateway match your router's local subnet.</li>
  <li>Click <strong>Submit</strong> to save the configuration.</li>
</ol>

<h2>Wi-Fi Band Requirements: 2.4 GHz Only</h2>
<p>The internal network cards on the Brother HL-L2370DW and HL-L2390DW support only 2.4 GHz 802.11b/g/n Wi-Fi bands. They do not have 5 GHz wireless hardware. If you are <a href="/brother/connectivity-issues/brother-printer-ts-02-5ghz-vs-2.4ghz">connecting to a 2.4 GHz Wi-Fi band</a> on a modern mesh router, ensure band steering does not attempt to force the printer onto a 5 GHz frequency.</p>
<p>If your router broadcasts a single combined network name for both bands, log into your router settings and create a dedicated 2.4 GHz network for the printer. For general router connection failures, <a href="/brother/connectivity-issues/brother-printer-wont-connect-to-wlan-access-point">troubleshoot Brother WLAN access point connection faults</a> before adjusting local operating system ports.</p>

<h2>Fixing the Windows WSD Port Problem</h2>
<p>Windows 10 and Windows 11 frequently install network printers using Web Services for Devices (WSD). WSD monitors device state periodically. When the printer sleeps, WSD often times out and locks the queue in an "Offline" state until the PC reboots. Replacing WSD with a Standard TCP/IP Port resolves this issue.</p>
<ol>
  <li>Press <strong>Windows Key + R</strong>, type <code>control printers</code>, and press <strong>Enter</strong>.</li>
  <li>Right-click your Brother printer and select <strong>Printer properties</strong>.</li>
  <li>Click the <strong>Ports</strong> tab. Notice if the active port starts with <code>WSD-</code>.</li>
  <li>Click <strong>Add Port...</strong>, select <strong>Standard TCP/IP Port</strong>, and click <strong>New Port...</strong>.</li>
  <li>The Add Standard TCP/IP Printer Port Wizard will launch. Click <strong>Next</strong>.</li>
  <li>In the <strong>Printer Name or IP Address</strong> field, enter the static IP address assigned to your printer.</li>
  <li>Click <strong>Next</strong>, then click <strong>Finish</strong> once Windows detects the network device.</li>
  <li>Click <strong>Apply</strong> and <strong>Close</strong>. Your print queue will now send raw port 9100 data directly to the printer IP, waking it reliably.</li>
</ol>

<h2>Updating Printer Firmware</h2>
<p>Download the official Brother Firmware Update Tool from Brother's support portal, connect your computer to the printer via USB or local network, and run the utility to verify your printer is running the latest available firmware.</p>`;

  const nextVersion = (article.revisions[0]?.version || 0) + 1;
  const wordCount = countWords(content);

  await prisma.article.update({
    where: { id: article.id },
    data: {
      content,
      wordCount,
      status: 'published'
    }
  });

  await prisma.revision.create({
    data: {
      articleId: article.id,
      version: nextVersion,
      title: article.title,
      content,
      seoTitle: article.seoTitle,
      metaDescription: article.metaDescription,
      faqs: article.faqs,
      excerpt: article.excerpt,
      featuredImage: article.featuredImage,
      featuredImageAlt: article.featuredImageAlt,
      featuredImageTitle: article.featuredImageTitle,
      featuredImageCaption: article.featuredImageCaption,
    }
  });

  // Upsert ArticleSource rows
  const sources = [
    {
      url: 'https://support.brother.com/g/b/faqend.aspx?c=us&lang=en&prod=hll2370dw_us&faqid=faq00100216_510',
      title: 'Brother Support: Set Auto Power Off Mode (HL-L2370DW)',
      anchorText: 'Brother Support: Set Auto Power Off Mode',
      publisher: 'Brother Support',
      sourceType: SourceType.support_article,
      httpStatus: 200,
      verifiedAt: new Date()
    },
    {
      url: 'https://help.brother-usa.com/app/answers/detail/a_id/67527/~/can-i-turn-off-deep-sleep-mode',
      title: 'Brother USA Help: Can I Turn Off Deep Sleep Mode?',
      anchorText: 'Brother USA Help: Turning Off Deep Sleep Mode',
      publisher: 'Brother USA',
      sourceType: SourceType.support_article,
      httpStatus: 200,
      verifiedAt: new Date()
    }
  ];

  for (const s of sources) {
    await prisma.articleSource.upsert({
      where: { articleId_url: { articleId: article.id, url: s.url } },
      update: {
        title: s.title,
        anchorText: s.anchorText,
        publisher: s.publisher,
        sourceType: s.sourceType,
        httpStatus: s.httpStatus,
        verifiedAt: s.verifiedAt
      },
      create: {
        articleId: article.id,
        url: s.url,
        title: s.title,
        anchorText: s.anchorText,
        publisher: s.publisher,
        sourceType: s.sourceType,
        httpStatus: s.httpStatus,
        verifiedAt: s.verifiedAt
      }
    });
  }

  console.log(`✅ Brother article updated with sources and revision ${nextVersion}`);
}

async function updateMb2720Article() {
  console.log('\n--- 2. Updating Canon MB2720 Article ---');
  const slug = 'canon-maxify-mb2720-error';
  const article = await prisma.article.findUnique({
    where: { slug },
    include: { revisions: { orderBy: { version: 'desc' }, take: 1 } }
  });
  if (!article) return;

  const newTitle = 'Canon MAXIFY MB2720 Common Support Codes & Fixes';
  const newMeta = 'Official Canon MAXIFY MB2720 common support codes and fixes. Clear paper jams (1007, 1008, 1300, 1303), ink issues (1688), carriage error 5100, and fault B204.';
  const newH1 = 'Canon MAXIFY MB2720: Common Support Codes & Detailed Fixes';

  const content = `<h2>The Quick Answer</h2>
<p>Support codes on the Canon MAXIFY MB2720 indicate mechanical jams, ink depletion, or internal logic faults displayed on the touchscreen. Most issues stem from cassette paper feed misfeeds (codes 1007 and 1008) or depleted PGI-1200 ink tanks (code 1688), which can be resolved by loading paper in the designated cassette or replacing the cartridge.</p>

<h2>Canon MAXIFY MB2720 Common Support Code Table</h2>
<p>The following table lists the most common support codes for the MAXIFY MB2720 as documented in Canon's official MB2700 series manual. For the complete catalog of all error numbers, consult <a href="https://ij.manual.canon/ij/webmanual/ErrorCode/MB2700%20series/EN/ERR/err_contents0100.html" target="_blank" rel="noopener">Canon's MB2700 series List of Support Code for Error</a>.</p>

<table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
  <thead>
    <tr style="background-color: #f1f5f9; text-align: left;">
      <th style="padding: 10px; border: 1px solid #cbd5e1;">Support Code</th>
      <th style="padding: 10px; border: 1px solid #cbd5e1;">Touchscreen Message</th>
      <th style="padding: 10px; border: 1px solid #cbd5e1;">Cause</th>
      <th style="padding: 10px; border: 1px solid #cbd5e1;">Fix</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1007</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">There is no paper in cassette 1.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">There is no paper in cassette 1, or paper is not loaded properly.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Load paper in cassette 1 and align paper guides with both edges of the paper. Tap OK on touch screen.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1008</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">There is no paper in cassette 2.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">There is no paper in cassette 2, or paper is not loaded properly.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Load paper in cassette 2 and align paper guides with both edges of the paper. Tap OK on touch screen.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1300</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Paper is jammed.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Paper jammed in paper output slot or inside front cover.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Open front cover, gently pull out jammed paper, close cover.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1303</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Paper jammed inside rear cover.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Paper jammed inside rear transport unit.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Detach rear transport unit cover, remove sheet slowly, reattach cover securely.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1310</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Paper jammed during automatic duplexing.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Paper stalled while reversing for two-sided printing.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Remove paper from transport unit and verify paper size supports duplex.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1688</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">The ink has run out.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">PGI-1200 ink cartridge is empty.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Replace the empty ink cartridge indicated on the touchscreen.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1700</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Ink absorber is almost full.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Ink absorber is almost full.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Tap OK on touch screen to continue printing. Contact nearest Canon service center for repair.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>2111 / 2112</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Paper settings mismatch.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Driver paper size does not match cassette paper registration.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Adjust cassette paper guides or correct driver print settings.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>5100</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Printer error has occurred.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Carriage motion obstructed or linear timing strip soiled.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Clear obstructions, inspect timing strip, restart printer.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>5200</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Printer error has occurred.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Printhead temperature exceeded threshold (overheating).</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Turn off, unplug for 10 minutes, check ink levels, power on.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>6000</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Printer error has occurred.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Line feed roller mechanism stalled or slit disk sensor dirty.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Clear feed roller paper scraps and restart printer.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>B204 / B205</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Printer error has occurred.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Critical printhead electrical malfunction.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Turn off, disconnect power cord, contact Canon service center.</td>
    </tr>
  </tbody>
</table>

<h2>Detailed Fixes for Common MB2720 Errors</h2>

<h3>1. Support Code 1300 and 1303: Paper Clearing Protocol</h3>
<p>Paper jams in the MB2720 occur in two primary physical areas: the front feed zone and the rear transport unit.</p>
<ol>
  <li><strong>Front Cover Jam (Code 1300):</strong> Open the front cover. If paper is visible under the printhead carriage, do not yank it sideways. Gently pull the sheet straight forward with both hands. Inspect the far left and right corners under the carriage for torn scraps.</li>
  <li><strong>Rear Cover Jam (Code 1303):</strong> Turn the printer around. Squeeze the two release tabs on the rear transport unit cover and pull it straight off. Slowly extract the paper from the feed rollers. Never use sharp tools or tweezers on the rubber rollers. Realign the transport unit cover and press firmly until both latches click.</li>
</ol>

<h3>2. Support Code 1688: Replacing Empty PGI-1200 Cartridges</h3>
<p>The MAXIFY MB2720 uses high-yield pigment ink tanks (PGI-1200 Standard or PGI-1200XL). When Code 1688 appears, open the front door. The printer carriage will move and align the depleted cartridge directly with the replacement slot.</p>
<p>Press the release button above the cartridge to pop the locking lever forward. Lift the cartridge out. Unpack the fresh cartridge, insert it firmly into the slot, and push the lever back until it locks securely. Close the front cover and allow the printer approximately 90 seconds to charge the ink delivery lines.</p>

<h3>3. Support Code 5100: Carriage Obstruction & Encoder Strip Cleaning</h3>
<p>Code 5100 indicates the printhead carriage cannot move freely across the chassis rail. Review our <a href="/canon/error-codes-alerts/canon-printer-error-5100-carriage-fix">Canon 5100 carriage and encoder strip troubleshooting guide</a> for in-depth carriage diagnostics.</p>
<ol>
  <li>Turn off the printer and open the scanning unit.</li>
  <li>Inspect the carriage travel path. Look for paper clips, packing tape, or small torn corners of paper wedged in the drive belt gears.</li>
  <li>Locate the clear, thin plastic timing strip (encoder strip) suspended behind the carriage rail.</li>
  <li>If the strip has smudges of black ink mist or white grease, wipe it gently with a dry cotton swab. Do not use alcohol or liquid cleaners, which dissolve the calibrated index lines printed on the strip.</li>
  <li>Close the cover and power the printer back on.</li>
</ol>

<h3>4. Support Code 5200: Printhead Thermal Protection</h3>
<p>Code 5200 occurs when printhead nozzles heat up beyond safe operating limits. For a complete look at temperature trip circuits, consult <a href="/canon/error-codes-alerts/canon-printer-error-5200-overheating-fix">how Canon thermal printheads overheat under code 5200</a>.</p>
<p>Turn the printer off, disconnect the AC power cable from the wall outlet, and wait at least 10 minutes. This allows the thermal sensors on the ceramic heater plate to return to room temperature. Ensure all four PGI-1200 ink tanks contain adequate ink before powering the printer on, as liquid ink acts as the primary cooling fluid for thermal nozzles during firing.</p>

<h3>5. Support Code 6000: Line Feed Sensor Fault</h3>
<p>Code 6000 indicates the optical sensor monitoring the main paper drive shaft cannot detect rotation. For detailed roller diagnostics, see <a href="/canon/error-codes-alerts/canon-printer-error-6000-paper-jam-fix">resolving Canon line feed sensor error 6000</a>. Check that paper trays 1 and 2 are pushed completely flat against the chassis frame.</p>`;

  const nextVersion = (article.revisions[0]?.version || 0) + 1;
  const wordCount = countWords(content);

  await prisma.article.update({
    where: { id: article.id },
    data: {
      title: newTitle,
      seoTitle: newTitle,
      metaDescription: newMeta,
      content,
      wordCount,
      status: 'published'
    }
  });

  await prisma.revision.create({
    data: {
      articleId: article.id,
      version: nextVersion,
      title: newTitle,
      content,
      seoTitle: newTitle,
      metaDescription: newMeta,
      faqs: article.faqs,
      excerpt: newMeta,
      featuredImage: article.featuredImage,
      featuredImageAlt: article.featuredImageAlt,
      featuredImageTitle: article.featuredImageTitle,
      featuredImageCaption: article.featuredImageCaption,
    }
  });

  // Upsert ArticleSource row
  const mbSource = {
    url: 'https://ij.manual.canon/ij/webmanual/ErrorCode/MB2700%20series/EN/ERR/err_contents0100.html',
    title: 'Canon : MAXIFY Manuals : MB2700 series : List of Support Code for Error',
    anchorText: 'Canon MAXIFY MB2700 series: List of Support Code for Error',
    publisher: 'Canon Manuals',
    sourceType: SourceType.manual,
    httpStatus: 200,
    verifiedAt: new Date()
  };

  await prisma.articleSource.upsert({
    where: { articleId_url: { articleId: article.id, url: mbSource.url } },
    update: {
      title: mbSource.title,
      anchorText: mbSource.anchorText,
      publisher: mbSource.publisher,
      sourceType: mbSource.sourceType,
      httpStatus: mbSource.httpStatus,
      verifiedAt: mbSource.verifiedAt
    },
    create: {
      articleId: article.id,
      url: mbSource.url,
      title: mbSource.title,
      anchorText: mbSource.anchorText,
      publisher: mbSource.publisher,
      sourceType: mbSource.sourceType,
      httpStatus: mbSource.httpStatus,
      verifiedAt: mbSource.verifiedAt
    }
  });

  console.log(`✅ MB2720 article updated with source and revision ${nextVersion}`);
}

async function updateSupportCode306Article() {
  console.log('\n--- 3. Updating Canon Support Code 306 Article ---');
  const slug = 'canon-printer-support-code-306';
  const article = await prisma.article.findUnique({
    where: { slug },
    include: { revisions: { orderBy: { version: 'desc' }, take: 1 } }
  });
  if (!article) return;

  const content = `<h2>The Quick Answer</h2>
<p>Canon displays Support Code 306 with the message "A communication error has occurred". It is mostly reported on Mac systems, though it can also appear on Windows when the print spooler fails to transmit print data. Resolving it requires power-cycling the print spooler, checking network or USB handshake integrity, and resetting the printer driver connection.</p>

<h2>What Canon Support Code 306 Means</h2>
<p>Canon shows Support Code 306 with the message "A communication error has occurred"; it is mostly reported on Mac systems running the Common Unix Printing System (CUPS) architecture, as well as Windows workstations experiencing spooler deadlocks.</p>
<p>This code surfaces across Canon PIXMA and MAXIFY consumer and small-office models when your computer's print subsystem initiates a job, opens an input/output channel to the printer, but does not receive an expected acknowledgment packet within the timeout limit.</p>

<h2>Step 1: Check Printer Hardware and Clear Pending Errors</h2>
<p>Before adjusting computer software, ensure the printer is ready to accept data.</p>
<ol>
  <li>Check the printer's LCD screen or status LEDs. If an alarm lamp is flashing or the screen displays an active paper jam or ink warning, the printer will reject incoming network print jobs.</li>
  <li>Cancel all current jobs directly on the printer by pressing the <strong>Stop</strong> button once.</li>
  <li>Turn the printer off using its physical <strong>Power</strong> button.</li>
  <li>Disconnect the AC power cord from the wall outlet, wait 60 seconds, reconnect the cable, and turn the printer back on.</li>
</ol>

<h2>Step 2: Verify Network and Cable Connections</h2>
<p>The physical or wireless data channel between the host computer and the printer must be stable.</p>

<h3>For USB Connections</h3>
<ul>
  <li>USB 2.0 cables work up to 5 meters (16 feet). To avoid signal degradation, use a short, direct USB cable without unpowered hubs or extension adapters.</li>
  <li>Disconnect the USB cable from both ends. Inspect the gold pins on the USB-B connector for lint, corrosion, or physical damage.</li>
  <li>Plug the cable directly into a motherboard USB port on the computer.</li>
</ul>

<h3>For Wi-Fi Connections</h3>
<ul>
  <li>Confirm your printer and computer are connected to the exact same Wi-Fi network name (SSID). Dual-band routers often isolate devices on a 5 GHz band from 2.4 GHz hardware.</li>
  <li>If your printer dropped off the wireless network, follow our <a href="/canon/connectivity-issues/canon-pixma-mg3620-offline">guide to reconnecting Canon PIXMA printers to Wi-Fi</a>.</li>
  <li>If needed, use our <a href="/canon/setup-installation/canon-printer-wireless-setup-wps">Canon printer wireless WPS setup guide</a> to reconnect without entering long passphrases.</li>
</ul>

<h2>Step 3: Resolve Operating System Print Spooler Conflicts</h2>
<p>If physical connections are intact, the communication failure resides in your operating system's print spooling queue.</p>

<h3>On Windows 10 and Windows 11</h3>
<ol>
  <li>Press <strong>Windows Key + R</strong>, type <code>services.msc</code>, and hit <strong>Enter</strong>.</li>
  <li>Scroll down to find the <strong>Print Spooler</strong> service. Right-click it and select <strong>Stop</strong>.</li>
  <li>Open File Explorer and navigate to <code>C:\\Windows\\System32\\spool\\PRINTERS</code>. Delete all files in this directory to purge stuck print jobs.</li>
  <li>Return to the Services window, right-click <strong>Print Spooler</strong>, and select <strong>Start</strong>.</li>
  <li>If the printer still shows offline, consult our steps to <a href="/canon/connectivity-issues/canon-printer-offline-windows-11">fix Canon printer offline status in Windows 11</a>.</li>
</ol>

<h3>On macOS (Apple CUPS System)</h3>
<ol>
  <li>Click the <strong>Apple menu</strong> &gt; <strong>System Settings</strong> (or <strong>System Preferences</strong>).</li>
  <li>Select <strong>Printers &amp; Scanners</strong>.</li>
  <li>Right-click (or Control-click) inside the printer list pane on the left, then select <strong>Reset Printing System...</strong>.</li>
  <li>Confirm the prompt. This clears all active queues and re-initializes the CUPS printing daemon.</li>
  <li>Click <strong>Add Printer, Scanner, or Fax...</strong>.</li>
  <li>Select your Canon printer. Under the <strong>Use</strong> dropdown, choose the dedicated Canon IJ driver or AirPrint, then click <strong>Add</strong>.</li>
</ol>

<h2>Step 4: When to Contact Canon Support</h2>
<p>If Support Code 306 persists after completing all previous steps across multiple computers and connections, contact Canon support for service.</p>`;

  const nextVersion = (article.revisions[0]?.version || 0) + 1;
  const wordCount = countWords(content);

  await prisma.article.update({
    where: { id: article.id },
    data: {
      content,
      wordCount,
      status: 'published'
    }
  });

  await prisma.revision.create({
    data: {
      articleId: article.id,
      version: nextVersion,
      title: article.title,
      content,
      seoTitle: article.seoTitle,
      metaDescription: article.metaDescription,
      faqs: article.faqs,
      excerpt: article.excerpt,
      featuredImage: article.featuredImage,
      featuredImageAlt: article.featuredImageAlt,
      featuredImageTitle: article.featuredImageTitle,
      featuredImageCaption: article.featuredImageCaption,
    }
  });

  // Upsert ArticleSource row
  const source306 = {
    url: 'https://community.usa.canon.com/t5/Printer-Software-Networking/Communication-Error-306/td-p/145956',
    title: 'Canon Community: Communication Error 306 Resolution',
    anchorText: 'Canon Community: Troubleshooting Communication Error 306',
    publisher: 'Canon Community',
    sourceType: SourceType.official_community,
    httpStatus: 200,
    verifiedAt: new Date()
  };

  await prisma.articleSource.upsert({
    where: { articleId_url: { articleId: article.id, url: source306.url } },
    update: {
      title: source306.title,
      anchorText: source306.anchorText,
      publisher: source306.publisher,
      sourceType: source306.sourceType,
      httpStatus: source306.httpStatus,
      verifiedAt: source306.verifiedAt
    },
    create: {
      articleId: article.id,
      url: source306.url,
      title: source306.title,
      anchorText: source306.anchorText,
      publisher: source306.publisher,
      sourceType: source306.sourceType,
      httpStatus: source306.httpStatus,
      verifiedAt: source306.verifiedAt
    }
  });

  console.log(`✅ Support Code 306 article updated with source and revision ${nextVersion}`);
}

async function updateMaxifyGxArticle() {
  console.log('\n--- 4. Updating Canon MAXIFY GX Article ---');
  const slug = 'canon-maxify-gx-error-code';
  const article = await prisma.article.findUnique({
    where: { slug },
    include: { revisions: { orderBy: { version: 'desc' }, take: 1 } }
  });
  if (!article) return;

  const content = `<h2>The Quick Answer</h2>
<p>Support codes on Canon MAXIFY GX MegaTank printers signal cassette feed jams, maintenance cartridge saturation, or printhead thermal protection events. Most errors stem from exhausted maintenance cartridges (code 1726) or printhead overheating (code 5200), which occurs when empty ink tanks cause nozzles to fire dry without liquid coolant.</p>

<h2>Canon MAXIFY GX Series Models Covered</h2>
<p>This troubleshooting guide applies to Canon's official commercial MegaTank lineup:</p>
<ul>
  <li><strong>MAXIFY GX7000 Series (GX7020, GX7021):</strong> High-volume office all-in-one with two 250-sheet paper cassettes (Cassette 1 and Cassette 2), automatic document feeder, GI-26 pigment ink, and user-replaceable MC-G01 maintenance cartridge (right side door).</li>
  <li><strong>MAXIFY GX6000 Series (GX6020, GX6021):</strong> Single 250-sheet cassette (Cassette 1) + 100-sheet rear tray, GI-26 pigment ink, and MC-G01 maintenance cartridge (right side door).</li>
  <li><strong>MAXIFY GX5000 Series (GX5020):</strong> Single-function printer with single cassette + rear tray, GI-26 pigment ink, and MC-G01 maintenance cartridge.</li>
  <li><strong>MAXIFY GX4000 Series (GX4020) &amp; GX3000 Series (GX3020):</strong> Compact MegaTank models with front cassette + rear flat paper path, GI-26 pigment ink, and MC-G03 maintenance cartridge.</li>
  <li><strong>MAXIFY GX2000 Series (GX2020) &amp; GX1000 Series (GX1020):</strong> Compact home-office MegaTank models using GI-25 pigment ink bottles and user-replaceable MC-G05 maintenance cartridge.</li>
</ul>

<h2>Official Canon MAXIFY GX Support Code Reference Table</h2>
<p>The following table details support codes documented in Canon's official MAXIFY GX online technical manuals, split by series where cassette numbers differ.</p>

<table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
  <thead>
    <tr style="background-color: #f1f5f9; text-align: left;">
      <th style="padding: 10px; border: 1px solid #cbd5e1;">Support Code</th>
      <th style="padding: 10px; border: 1px solid #cbd5e1;">Applicable Series</th>
      <th style="padding: 10px; border: 1px solid #cbd5e1;">Screen Message / Meaning</th>
      <th style="padding: 10px; border: 1px solid #cbd5e1;">Official Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1007</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">GX7000 Series</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">There is no paper in cassette 1.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Load paper into cassette 1, align guides, and tap OK on touch screen.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1008</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">GX7000 Series</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">There is no paper in cassette 2.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Load paper into cassette 2, align guides, and tap OK on touch screen.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1003</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">GX6000, GX5000, GX4000, GX3000</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">There is no paper in the cassette.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Load paper into the cassette, align guides, and tap OK on touch screen.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1070</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">All GX Series</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Paper feed roller is dirty.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Execute Roller Cleaning via Setup &gt; Maintenance on the touch screen.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1300</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">All GX Series</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Paper is jammed.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Open front cover, remove jammed sheet slowly with both hands.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1303</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">All GX Series</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Paper jammed in rear cover.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Detach rear transport unit, extract jammed sheet, reattach securely.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1725</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">All GX Series</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Maintenance cartridge almost full.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Tap OK on touch screen to continue; obtain a replacement maintenance cartridge.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1726</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">All GX Series</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Maintenance cartridge is full.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Replace maintenance cartridge with designated part (MC-G01, MC-G03, or MC-G05).</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>1890</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">All GX Series</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Protective material remains.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Open scanning unit, remove all orange shipping tape and transport clips.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>5100</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">All GX Series</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Printer error has occurred (Carriage error).</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Clear carriage path obstructions; gently clean linear timing strip if smudged.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>5200</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">All GX Series</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Printer error has occurred (Printhead overheating).</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Check ink levels, unplug power cord for 10 minutes to cool down, execute Ink Flush.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>6000</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">All GX Series</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Printer error has occurred (Line feed error).</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Clear paper scraps around feed rollers and timing slit disk, power cycle printer.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1;"><strong>B506 / B508 / B509</strong></td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">All GX Series</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Printer error has occurred.</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Turn off the printer and unplug it. Plug in the printer again and turn it back on. If problem persists, contact nearest Canon service center.</td>
    </tr>
  </tbody>
</table>

<p>For complete model-specific references, consult Canon's official manuals:
<a href="https://ij.manual.canon/ij/webmanual/ErrorCode/GX7000%20series/EN/ERR/err_contents0100.html" target="_blank" rel="noopener">GX7000 Series Support Code List</a>,
<a href="https://ij.manual.canon/ij/webmanual/ErrorCode/GX6000%20series/EN/ERR/err_contents0100.html" target="_blank" rel="noopener">GX6000 Series Support Code List</a>, and
<a href="https://ij.manual.canon/ij/webmanual/ErrorCode/GX4000%20series/EN/ERR/err_contents0100.html" target="_blank" rel="noopener">GX4000 Series Support Code List</a>.</p>

<h2>Resolving Support Code 5200 on MAXIFY GX Printers</h2>
<p>Unlike standard cartridge printers, MAXIFY GX models continuously draw ink from large internal reservoirs through silicone tubes into a permanent printhead. Liquid ink dissipates the thermal energy produced by the microscopic resistor nozzles during firing.</p>
<p>If you have questions regarding continuous supply faults, review our guide to <a href="/canon/ink-toner-issues/canon-maxify-gx-ink-not-detected">Canon MAXIFY GX ink detection and continuous supply troubleshooting</a>.</p>

<h3>Step-by-Step Code 5200 Resolution</h3>
<ol>
  <li><strong>Check Tank Ink Levels:</strong> Look directly at the clear front windows on all four ink tanks (Black, Cyan, Magenta, Yellow). If any tank has dropped below the lower limit dot, refill it immediately with genuine Canon GI-26 pigment ink (or GI-25 for GX1020/GX2020). Never allow ink to fall below this safety marker.</li>
  <li><strong>Execute the 10-Minute Power Cool-Down:</strong> Turn off the printer using the front <strong>Power</strong> button. Disconnect the power cord from the electrical outlet. Wait a full 10 minutes to allow the printhead ceramic plate and thermistor sensors to cool back to ambient room temperature.</li>
  <li><strong>Inspect Ink Tubes for Air Gaps:</strong> Plug the printer back in and open the scanning unit. Inspect the transparent tubes leading to the printhead carriage. If you observe continuous air bubbles or empty sections, follow our instructions for <a href="/canon/ink-toner-issues/canon-megatank-not-printing-air-in-tubes">purging air bubbles and ink tube clogs in Canon MegaTank printers</a>.</li>
  <li><strong>Perform an Ink Flush:</strong> On the touchscreen, tap <strong>Setup (gear icon)</strong> &gt; <strong>Maintenance</strong> &gt; <strong>Ink Flush</strong>. Select all colors and confirm. This forces the purge pump to pull fresh ink through the delivery lines, restoring the liquid thermal buffer to the nozzles.</li>
  <li><strong>Verify Temperature Stabilization:</strong> Print a nozzle check pattern. If all lines print cleanly without gaps, code 5200 is resolved. If the error returns immediately upon heating up, consult our technical breakdown of <a href="/canon/error-codes-alerts/canon-printer-error-5200-overheating-fix">Canon error 5200 overheating diagnostics</a>.</li>
</ol>

<h2>Replacing the Maintenance Cartridge (Support Code 1726)</h2>
<p>Support Code 1726 halts all printing operations when the user-serviceable waste ink maintenance box is saturated.</p>
<ol>
  <li>Power on the printer and open the maintenance cartridge access door (located on the right side on GX6020/GX7020/GX5020, or on the rear on GX3020/GX4020/GX1020/GX2020).</li>
  <li>Loosen the coin screw securing the cartridge retaining cover.</li>
  <li>Slide the saturated maintenance cartridge straight out. Place it inside the plastic disposal bag included with your new cartridge.</li>
  <li>Slide the new maintenance cartridge (MC-G01, MC-G03, or MC-G05 depending on your model) into the guide rails until it clicks securely into place.</li>
  <li>Replace the retaining cover and tighten the screw. The printer will recognize the new EEPROM chip immediately and clear Code 1726 without requiring any service tools.</li>
</ol>`;

  const nextVersion = (article.revisions[0]?.version || 0) + 1;
  const wordCount = countWords(content);

  await prisma.article.update({
    where: { id: article.id },
    data: {
      content,
      wordCount,
      status: 'published'
    }
  });

  await prisma.revision.create({
    data: {
      articleId: article.id,
      version: nextVersion,
      title: article.title,
      content,
      seoTitle: article.seoTitle,
      metaDescription: article.metaDescription,
      faqs: article.faqs,
      excerpt: article.excerpt,
      featuredImage: article.featuredImage,
      featuredImageAlt: article.featuredImageAlt,
      featuredImageTitle: article.featuredImageTitle,
      featuredImageCaption: article.featuredImageCaption,
    }
  });

  // Upsert ArticleSource rows for GX
  const gxSources = [
    {
      url: 'https://ij.manual.canon/ij/webmanual/ErrorCode/GX7000%20series/EN/ERR/err_contents0100.html',
      title: 'Canon : MAXIFY Manuals : GX7000 series : List of Support Code for Error',
      anchorText: 'Canon MAXIFY GX7000 series: List of Support Code for Error',
      publisher: 'Canon Manuals',
      sourceType: SourceType.manual,
      httpStatus: 200,
      verifiedAt: new Date()
    },
    {
      url: 'https://ij.manual.canon/ij/webmanual/ErrorCode/GX6000%20series/EN/ERR/err_contents0100.html',
      title: 'Canon : MAXIFY Manuals : GX6000 series : List of Support Code for Error',
      anchorText: 'Canon MAXIFY GX6000 series: List of Support Code for Error',
      publisher: 'Canon Manuals',
      sourceType: SourceType.manual,
      httpStatus: 200,
      verifiedAt: new Date()
    },
    {
      url: 'https://ij.manual.canon/ij/webmanual/ErrorCode/GX4000%20series/EN/ERR/err_contents0100.html',
      title: 'Canon : MAXIFY Manuals : GX4000 series : List of Support Code for Error',
      anchorText: 'Canon MAXIFY GX4000 series: List of Support Code for Error',
      publisher: 'Canon Manuals',
      sourceType: SourceType.manual,
      httpStatus: 200,
      verifiedAt: new Date()
    }
  ];

  for (const s of gxSources) {
    await prisma.articleSource.upsert({
      where: { articleId_url: { articleId: article.id, url: s.url } },
      update: {
        title: s.title,
        anchorText: s.anchorText,
        publisher: s.publisher,
        sourceType: s.sourceType,
        httpStatus: s.httpStatus,
        verifiedAt: s.verifiedAt
      },
      create: {
        articleId: article.id,
        url: s.url,
        title: s.title,
        anchorText: s.anchorText,
        publisher: s.publisher,
        sourceType: s.sourceType,
        httpStatus: s.httpStatus,
        verifiedAt: s.verifiedAt
      }
    });
  }

  console.log(`✅ MAXIFY GX article updated with 3 sources and revision ${nextVersion}`);
}

async function main() {
  await updateBrotherArticle();
  await updateMb2720Article();
  await updateSupportCode306Article();
  await updateMaxifyGxArticle();
  console.log('\n🎉 All 4 articles updated and live with verified sources and new revisions!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
