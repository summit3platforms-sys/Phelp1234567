import { prisma } from '../src/lib/prisma';

const SLUG = 'bixolon-printer-usb-not-detected';

const NEW_CONTENT = `<h2>The Quick Answer</h2>
<p><strong>If your Bixolon printer is not detected when connected via USB, the issue stems from one of four layers: a faulty USB cable, an unpowered USB hub or dead computer port, missing or corrupted virtual COM/USB drivers, or a suspended Windows USB root hub power state.</strong></p>

<p>When a Bixolon receipt or label printer connects via USB but fails to appear in Windows or macOS, all four failure points present identically: no chime sounds, no printer icon appears, and print jobs refuse to send. If you are dealing with broader communication dropouts across multiple connection types, see our guide on what to do when your <a href="/bixolon/connectivity-issues/printer-wont-connect">Bixolon printer won't connect via USB, Wi-Fi, or Bluetooth</a>.</p>

<p>Follow the systematic isolation steps below to identify the exact failing layer and restore your connection.</p>

<h2>The Fastest Isolation: Try Another Computer</h2>
<p>If you have access to a second PC or laptop, plug the Bixolon printer into it before changing software settings. This 60-second test isolates hardware from software immediately:</p>
<ul>
  <li><strong>Printer detected on the second computer:</strong> The printer hardware, USB cable, and printer USB receptacle are functioning properly. The root cause is on your primary computer (driver conflict, port assignment, or USB controller glitch).</li>
  <li><strong>Printer not detected on the second computer either:</strong> The failure is physical—either a broken USB cable, an unpowered USB port, or a damaged USB interface board on the printer itself.</li>
</ul>
<p>If you do not have another computer available, follow the four layers below in order.</p>

<h2>Layer 1: The Physical Layer (Cables, Ports &amp; Hubs)</h2>
<p><strong>Swap the USB cable directly:</strong> Standard USB Type-A to Type-B printer cables suffer internal wire fatigue from counter vibration and frequent movement in POS environments. Always test with a known-working, shielded USB 2.0 cable under 6 feet (1.8 m) before troubleshooting software.</p>

<p><strong>Connect directly to the motherboard:</strong> Avoid front-panel case ports and unpowered desktop hubs. Front ports often connect via loose internal header cables that drop data packets or fail to deliver adequate bus voltage. Plug the Bixolon USB cable directly into a rear I/O port on the back of your desktop computer or a powered docking station.</p>

<p><strong>Bypass unpowered USB splitters:</strong> Bixolon thermal receipt printers (such as the SRP-350 and SRP-330 series) and label printers require stable 5V signaling across the USB D+ and D- lines. Passive, unpowered multi-port splitters often cause USB handshake timeouts or drop the connection when other peripherals draw current.</p>

<p><strong>Inspect the printer's USB Type-B port:</strong> Use a flashlight to examine the square USB receptacle on the back panel of your Bixolon unit. Ensure the center plastic tab is not snapped and none of the four copper contact pins are bent, pushed back, or obstructed with paper dust.</p>

<h2>Layer 2: Windows Device Manager Inspection</h2>
<p>Windows Device Manager reveals whether the operating system registers the printer at the raw hardware bus layer, independent of print drivers:</p>
<ol>
  <li>Press <strong>Windows Key + X</strong> and select <strong>Device Manager</strong>.</li>
  <li>Expand the <strong>Universal Serial Bus controllers</strong>, <strong>Ports (COM &amp; LPT)</strong>, and <strong>Other devices</strong> sections.</li>
  <li>Unplug the Bixolon USB cable, wait 3 seconds, and plug it back in while watching the screen.</li>
  <li><strong>If the list refreshes or a device appears</strong> (even as "Unknown Device", "USB Printing Support", or with a yellow exclamation mark): Windows recognizes the hardware connection. Proceed to Layer 3 for driver resolution.</li>
  <li><strong>If nothing refreshes at all:</strong> Windows is not receiving an electrical signal from the printer. Check physical connections, try another USB port, or verify printer power.</li>
</ol>
<p>If Windows detects the hardware in Device Manager but your system still cannot find the printer when attempting to print or add it through Windows Settings, consult our detailed walkthrough for <a href="/bixolon/connectivity-issues/bixolon-printer-not-showing-up-in-devices">resolving Bixolon printers not showing up in Devices and Printers</a>.</p>

<p><strong>Clear Yellow Warning Triangles:</strong> If an entry appears with a yellow exclamation point under "Other devices" or "Universal Serial Bus controllers", right-click the item, select <strong>Uninstall device</strong>, disconnect the USB cable, and reboot your computer before reinstalling the driver.</p>

<h2>Layer 3: Driver Installation &amp; Virtual COM Configuration</h2>
<p>Unlike standard desktop inkjet printers, Bixolon POS and thermal label printers rely on specialized drivers and virtual port handlers. If Windows assigns a generic driver or the wrong model package, communication fails completely.</p>

<h3>Performing a Clean Driver Reinstall</h3>
<ol>
  <li><strong>Disconnect the printer's USB cable</strong> from your computer.</li>
  <li>Go to <strong>Settings &gt; Apps &gt; Installed Apps</strong> and uninstall any existing Bixolon Windows Driver or Seagull Scientific driver packages.</li>
  <li>Open <strong>Control Panel &gt; Devices and Printers</strong>. If any old or inactive Bixolon printer icons remain, right-click and select <strong>Remove device</strong>.</li>
  <li><strong>Restart your PC</strong> to clear locked spooler handles.</li>
  <li><strong>Download the matched driver:</strong> Visit Bixolon's official download portal and select the exact driver designed for your model series (e.g., SRP-350III vs. SRP-350plusIII, or XD3-40) and your exact Windows version (Windows 11 / Windows 10 64-bit).</li>
  <li>Run the installer as Administrator.</li>
  <li><strong>Reattach the USB cable only when prompted by the installer</strong>, or after installation has finished, so Windows correctly binds the USB print monitor port.</li>
</ol>

<h3>Windows USB Power Management Fix</h3>
<p>Windows frequently turns off USB ports to save power, which can cause Bixolon printers to disconnect or fail detection after sleep:</p>
<ol>
  <li>In <strong>Device Manager</strong>, expand <strong>Universal Serial Bus controllers</strong>.</li>
  <li>Right-click <strong>USB Root Hub</strong> (and USB Root Hub 3.0) and choose <strong>Properties</strong>.</li>
  <li>Click the <strong>Power Management</strong> tab.</li>
  <li>Uncheck <strong>"Allow the computer to turn off this device to save power"</strong> and click <strong>OK</strong>.</li>
</ol>

<h2>Layer 4: Printer Self-Test &amp; Hardware Health</h2>
<p>If the printer is not detected on any computer despite a good cable and working ports, verify internal printer electronics:</p>

<p><strong>Execute a standalone self-test:</strong> Power off the printer. Press and hold the <strong>FEED</strong> button, then flip the power switch on while continuing to hold FEED. Release the button when the mechanism starts printing. If the self-test prints cleanly with dark, uniform text, the printhead, main logic board, and mechanical transport are operational. If the printer will not print a self-test or exhibits warning lights, the problem is hardware-level rather than USB detection.</p>

<p><strong>Verify Power Supply Rating:</strong> Ensure you are using the original Bixolon 24V AC adapter. Using a mismatched 12V or generic third-party adapter will illuminate the power LED, but lacks the necessary current to power both the USB interface controller and the thermal mechanism simultaneously.</p>

<h2>Mac-Specific USB Detection (macOS Sequoia, Sonoma &amp; Ventura)</h2>
<p>On macOS, thermal printer detection operates differently than Windows Plug-and-Play:</p>
<ul>
  <li>macOS does not include built-in plug-and-play drivers for POS receipt printers. You must download and install the official Bixolon macOS CUPS driver package before macOS can identify the device.</li>
  <li>After installing the driver package, navigate to <strong>System Settings &gt; Printers &amp; Scanners</strong>, click <strong>Add Printer, Scanner, or Fax (+)</strong>, select your Bixolon USB printer from the list, and in the "Use" dropdown, choose the installed Bixolon CUPS driver rather than Generic PostScript.</li>
  <li>If macOS asks for permission to connect an external USB accessory, ensure you click <strong>Allow</strong>.</li>
</ul>

<h2>USB Detected But Printing Fails or Says Offline?</h2>
<p>If Windows confirms USB detection and Device Manager shows the device without errors, but documents remain stuck in the print queue or the status shows offline, the hardware link is working while the logical spooler port is misconfigured. In this situation, review our dedicated guide on <a href="/bixolon/connectivity-issues/bixolon-printer-showing-offline">how to fix a Bixolon printer showing offline in Windows</a>.</p>

<h2>Quick Isolation Matrix</h2>
<table>
  <thead>
    <tr>
      <th>Observed Symptom</th>
      <th>Probable Root Cause</th>
      <th>Recommended Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>No response at all in Device Manager upon plug/unplug</td>
      <td>Physical layer (broken cable, dead USB port, unpowered hub)</td>
      <td>Swap to a known-good USB cable and plug directly into motherboard rear I/O port.</td>
    </tr>
    <tr>
      <td>Device appears with yellow exclamation mark</td>
      <td>Missing or corrupt Bixolon USB driver</td>
      <td>Uninstall the device, download the correct model driver from Bixolon, and reinstall as Admin.</td>
    </tr>
    <tr>
      <td>Printer connects then randomly drops out</td>
      <td>Windows USB power saving or unpowered hub</td>
      <td>Disable USB selective suspend and plug directly into computer without hubs.</td>
    </tr>
    <tr>
      <td>Detected on second PC but not primary PC</td>
      <td>Port driver corruption or Windows spooler conflict</td>
      <td>Perform a clean driver reinstall and reset USB root hub controllers.</td>
    </tr>
    <tr>
      <td>Not detected on any PC and self-test fails</td>
      <td>Printer power supply failure or faulty interface card</td>
      <td>Verify 24V power supply and check internal interface card seating.</td>
    </tr>
  </tbody>
</table>`;

const NEW_FAQS = JSON.stringify([
  {
    question: "Why is my Bixolon printer not detected when connected via USB?",
    answer: "The most common causes are a faulty USB cable, connecting through an unpowered USB hub, plugging into a loose front-panel port, or missing the official Bixolon Windows/CUPS driver. Testing with a direct connection to a rear motherboard USB port using a known-working cable will quickly isolate the issue.",
  },
  {
    question: "How do I check if Windows detects my Bixolon printer at the hardware level?",
    answer: "Open Device Manager (Windows Key + X > Device Manager) and observe the list while unplugging and reconnecting the USB cable. If the list refreshes or a device appears under Universal Serial Bus controllers or Other devices, Windows recognizes the hardware connection.",
  },
  {
    question: "Can I use a USB hub with a Bixolon thermal printer?",
    answer: "Unpowered passive USB hubs frequently cause connection drops or prevent detection because Bixolon thermal and label printers require steady 5V signaling. Always connect the printer directly to your computer or use an externally powered industrial USB hub.",
  },
]);

function calculateWordCount(html: string): number {
  const text = html.replace(/<[^>]*>/g, ' ');
  return text.trim().split(/\s+/).filter(Boolean).length;
}

async function main() {
  const article = await prisma.article.findFirst({
    where: { slug: SLUG },
    select: { id: true, title: true, reviewedAt: true, publishedAt: true },
  });

  if (!article) {
    throw new Error(`Article with slug "${SLUG}" not found.`);
  }

  const wordCount = calculateWordCount(NEW_CONTENT);
  console.log(`Updating article "${article.title}" (${article.id})...`);
  console.log(`Word count: ${wordCount}`);

  // Use raw SQL or update to preserve reviewedAt/publishedAt/updatedAt
  await prisma.$executeRaw`
    UPDATE "Article"
    SET
      "content" = ${NEW_CONTENT},
      "faqs" = ${NEW_FAQS},
      "wordCount" = ${wordCount}
    WHERE "id" = ${article.id}
  `;

  console.log('Database update completed successfully!');

  // Verify links in updated content
  const linkRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
  const links: { href: string; anchor: string }[] = [];
  let match;
  while ((match = linkRegex.exec(NEW_CONTENT)) !== null) {
    links.push({ href: match[1], anchor: match[2].replace(/<[^>]+>/g, '').trim() });
  }

  console.log(`\nVerified links in new content (${links.length} total):`);
  links.forEach((l, i) => console.log(`${i + 1}. [${l.anchor}](${l.href})`));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
