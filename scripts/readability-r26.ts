import { prisma } from '../src/lib/prisma';

const replacements: Record<string, string> = {
  "canon-ij-scan-utility-not-working": `<h2>Why the IJ Scan Utility Fails</h2>
<p>The <strong>Canon IJ Scan Utility</strong> is the central hub for scanning documents. It also scans photos to your computer. When it fails, you might see an error. The error may say <em>"Cannot communicate with scanner."</em> You might click the application icon and nothing happens.</p>
<p>This is usually caused by a breakdown in the TWAIN driver. Windows might also re-assign the printer network IP address.</p>

<h2>Fix 1: The "Network" Dropdown Mistake</h2>
<p>This is the most common scanning mistake for Wi-Fi users.</p>
<p>Open the IJ Scan Utility. Look at the very top of the small window. There is a dropdown menu labeled <strong>Product Name</strong>. You might have plugged your printer in via USB before. If you now use Wi-Fi, your printer is listed twice.</p>
<ul>
    <li>Example: <strong>Canon MG3600 series</strong> (This is the USB driver).</li>
    <li>Example: <strong>Canon MG3600 series Network</strong> (This is the Wi-Fi driver).</li>
</ul>
<p>You might connect via Wi-Fi but select the USB driver. If so, the scanner will fail to respond. Select the "Network" version from the dropdown. Try again.</p>

<h2>Fix 2: Restarting the WIA Service</h2>
<p>Windows relies on a background service called Windows Image Acquisition (WIA). This service processes your scans. If this service crashes, the Canon software cannot access the hardware.</p>
<ol>
    <li>Press <strong>Windows Key + R</strong>.</li>
    <li>Type <code>services.msc</code> and hit Enter.</li>
    <li>Scroll down to <strong>Windows Image Acquisition (WIA)</strong>.</li>
    <li>Right-click it and select <strong>Restart</strong>. (If it says "Start," click Start).</li>
    <li>Try opening the IJ Scan Utility again.</li>
</ol>

<h2>Fix 3: Complete Driver Wipe and Reinstall</h2>
<p>If the utility refuses to open, the core DLL files are corrupted.</p>
<p>Do not install the software over the old one. Uninstall it completely first. Go to Windows Settings &gt; Apps. Uninstall the <strong>Canon MP Drivers</strong> and the <strong>Canon IJ Scan Utility</strong>. Restart your computer.</p>
<p>Go to the official Canon Support website. Type your exact printer model. Download the full <strong>Driver and Software Package</strong>. Reinstall this fresh package. It will rebuild the necessary TWAIN drivers. This links the utility back to the scanner hardware.</p>

<h2>Fixing Canon IJ Scan Utility Crashes, Freezes, and Scanner Driver Errors</h2>
<p>The <strong>Canon IJ Scan Utility</strong> is the official scanning suite. It comes with Canon PIXMA and MAXIFY all-in-ones. The software might report "Cannot communicate with scanner" (Code <code>2,156,50</code> / <code>5,156,69</code>). It might crash upon launch. Local WIA service stalls or USB communication drops cause this.</p>

<h2>Step-by-Step Scan Utility Diagnostic Protocol</h2>
<ol>
  <li><strong>Restart the Windows Image Acquisition (WIA) Service:</strong>
    <ul>
      <li>Press <strong>Windows Key + R</strong>, type <code>services.msc</code>, and press Enter.</li>
      <li>Scroll down to find <strong>Windows Image Acquisition (WIA)</strong>.</li>
      <li>Right-click WIA and select <strong>Restart</strong>.</li>
      <li>Check that <strong>Remote Procedure Call (RPC)</strong> and <strong>Shell Hardware Detection</strong> are running.</li>
    </ul>
  </li>
  <li><strong>Select the Correct Scanner Driver in IJ Scan Utility Settings:</strong>
    <p>Open IJ Scan Utility. Click the <strong>Settings...</strong> button at the bottom right. Look under the <strong>Product Name</strong> dropdown. Make sure your printer is selected with the <strong>"Network"</strong> suffix for Wi-Fi scanning. Example: <code>Canon TS6400 series (Network)</code>. Use no suffix for USB scanning. Selecting the wrong interface causes instant communication timeouts.</p>
  </li>
  <li><strong>Reinstall the Certified Canon MP Driver Package:</strong>
    <p>Download the full <strong>MP Drivers</strong> package from usa.canon.com/support. The MP Drivers package contains the scanner drivers. The IJ Scan Utility requires these drivers.</p>
  </li>
  <li><strong>Test with Native Windows Scan / Fax & Scan:</strong>
    <p>Press Windows Key, type <code>wfs</code> (Windows Fax and Scan). Click "New Scan". This confirms whether the scanner hardware responds to native OS scan commands.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the scanner work over USB but fail over Wi-Fi?</summary>
  <p>Third-party firewalls often block UDP port 8611 (Canon IJ Network Scanner discovery). Add an exception for <code>IJScanUt.exe</code> in Windows Defender Firewall.</p>
</details>
<details>
  <summary>Can I scan to Mac without IJ Scan Utility?</summary>
  <p>Yes. On macOS, open <strong>System Settings &gt; Printers &amp; Scanners &gt; [Your Canon] &gt; Open Scanner</strong>. You can scan natively via Apple AirPrint / Image Capture.</p>
</details>`,
  "hp-envy-6055e-blinking-purple-light": `<h2>What Does the Blinking Purple Light Mean on the HP Envy 6055e?</h2>
<p>The HP Envy 6055e communicates its status through its front edge lighting strip. It has no LCD screen. A blinking or pulsing <strong>purple light</strong> is not an error. It means the printer is in <strong>Wi-Fi Setup Mode</strong>. It broadcasts a temporary wireless signal. It waits for you to complete the setup process. Use the HP Smart app for this.</p>
<p>This guide explains every light color on the Envy 6055e. It walks you through every method to complete the wireless setup successfully.</p>

<h2>HP Envy 6055e Edge Lighting Color Guide</h2>
<ul>
  <li><strong>Pulsing Purple:</strong> Setup Mode. The printer is waiting to connect on a Wi-Fi network.</li>
  <li><strong>Spinning Cyan:</strong> Connecting. The printer is trying to join your Wi-Fi network.</li>
  <li><strong>Solid Blue:</strong> Connected and Ready. The printer is online and ready for print jobs.</li>
  <li><strong>Blinking Orange:</strong> Error. It could be low ink or a paper jam. Check the HP Smart app for details.</li>
  <li><strong>Solid White / Pulsing White:</strong> Printing or Processing. The printer is actively working.</li>
  <li><strong>Alternating Purple and Cyan:</strong> The printer is registered to HP+. It is syncing firmware (internal software) or checking for updates.</li>
</ul>

<h2>Step-by-Step: Completing Wi-Fi Setup via HP Smart App</h2>
<p>The HP+ setup process requires the HP Smart app. You can use your smartphone or PC. The printer will not work without completing this registration.</p>
<ol>
  <li><strong>Download HP Smart:</strong> Install it from your app store. Do not use third-party HP app clones. Use only the official HP Smart app.</li>
  <li><strong>Enable Bluetooth and Wi-Fi on your phone:</strong> The app uses Bluetooth to discover the printer. It uses Wi-Fi to set up the connection. Both must be on. Stand within 3 feet of the printer.</li>
  <li><strong>Open HP Smart and sign in:</strong> Create or log into your HP account. HP+ is mandatory. The 6055e will not print without an HP account registration.</li>
  <li><strong>Tap the + icon to add a printer:</strong> The app will scan for devices using Bluetooth. Your Envy 6055e should appear within 30 seconds.</li>
  <li><strong>Follow the in-app prompts:</strong> The app will ask for your Wi-Fi network name and password. Double-check your password for your 2.4GHz network. The 6055e does not support 5GHz.</li>
  <li><strong>Wait for the light to turn solid blue:</strong> After entering your password, the printer light will spin cyan. Then it will turn solid blue. This takes 30 to 90 seconds. A solid blue light confirms successful connection.</li>
</ol>

<h2>What If the Setup Window Has Expired?</h2>
<p>The HP Envy 6055e remains in Setup Mode for exactly <strong>2 hours</strong>. After that, the purple light disappears. You cannot complete setup until you manually restart Setup Mode.</p>
<p>To force the printer back into Setup Mode:</p>
<ol>
  <li>Find the <strong>Wi-Fi button</strong> on the back of the printer.</li>
  <li>Press and hold the Wi-Fi button for <strong>5 seconds</strong>. The edge light will flash white.</li>
  <li>Release the button. The printer will reset its wireless settings. It will return to pulsing purple.</li>
  <li>Open HP Smart and complete setup again. You have a 2-hour window.</li>
</ol>

<h2>Advanced: Factory Network Reset</h2>
<p>You might have configured the printer on a different network before. If you need a fresh start:</p>
<ol>
  <li>Turn the printer on and wait for it to be ready. It should show a solid color light.</li>
  <li>Press and hold the <strong>Wi-Fi button</strong> on the back for <strong>10 seconds</strong>.</li>
  <li>The light will flash. It will go dark and then restart. The printer has wiped its network memory. It will boot into Setup Mode automatically.</li>
</ol>

<h2>Understanding the HP+ Requirement</h2>
<p>HP+ is a subscription ecosystem for "e-series" printers. You must register with HP and use genuine HP ink. HP offers an extended warranty and free months of HP Instant Ink. Cloud printing features are included.</p>
<p>You must use genuine HP ink. If you install non-HP cartridges, the printer displays a warning. Some features will be disabled. The printer will print basic documents. HP+ benefits will be suspended.</p>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I use the HP Envy 6055e without an HP account?</summary>
  <p>No. The HP+ program requires HP account registration. Without this, the 6055e will not accept print jobs. This is true even if it appears connected to Wi-Fi.</p>
</details>
<details>
  <summary>What does alternating purple and cyan light mean?</summary>
  <p>This means the printer is performing a firmware (internal software) update. Do not unplug the printer during this state. Wait for it to complete. It usually takes 3 to 5 minutes.</p>
</details>
<details>
  <summary>Can I set up the HP Envy 6055e via USB instead of Wi-Fi?</summary>
  <p>Yes. If your Wi-Fi setup keeps failing, connect the printer to your PC via USB. Open the HP Smart app on your PC. The app will detect the printer. It will walk you through Wi-Fi credentials. This is a very reliable setup method.</p>
</details>
<details>
  <summary>What if the HP Smart app says "Printer not found" during setup?</summary>
  <p>Make sure Bluetooth is enabled on your phone. Stand within 3 feet of the printer. Ensure the printer is actively in Setup Mode. If the app cannot find the printer, restart the app and printer. Try again.</p>
</details>

<h2>When to Contact HP Support</h2>
<p>The printer's light might never turn purple. Even after a factory reset, this indicates a failure. The wireless module may be broken. Contact HP Support at support.hp.com. The Envy 6055e carries a 2-year HP+ warranty.</p>`,
  "hp-laserjet-m209dwe-keeps-going-offline": `<h2>Why the HP LaserJet M209dwe Keeps Going Offline</h2>
<p>The HP LaserJet M209dwe is an HP+ laser printer. Its connection behavior is different from traditional Wi-Fi printers. The printer must maintain a local network connection. It must also have an active connection to HP's cloud servers. When either link drops, the M209dwe appears offline in Windows. It may still have power and a Wi-Fi signal.</p>

<h2>Step 1: Restart the Complete Chain</h2>
<p>Before any advanced fixes, restart everything in the correct order:</p>
<ol>
  <li>Turn the M209dwe completely OFF using the power button.</li>
  <li>Unplug your router or modem for 30 seconds. Plug it back in.</li>
  <li>Wait for the router to fully reconnect to the internet.</li>
  <li>Turn the M209dwe back ON. Wait for it to complete its startup warmup.</li>
  <li>On your Windows PC, open the print queue. Right-click the HP printer and select <strong>See what's printing</strong>. Cancel all pending jobs.</li>
  <li>Right-click the printer again. Uncheck <strong>Use Printer Offline</strong> if it is checked.</li>
</ol>

<h2>Step 2: Set a Static IP Address to Prevent Offline Drops</h2>
<p>The most common cause of offline issues is a changing IP address. Windows remembers the old IP. It cannot find the printer at the new one.</p>
<ol>
  <li>Print a Network Configuration Page. Press the wireless button and the information button at the same time. The IP address is printed at the top.</li>
  <li>Type that IP address into a browser address bar. This opens the HP Embedded Web Server (EWS).</li>
  <li>Navigate to <strong>Network &gt; Wired or Wireless &gt; IPv4 Configuration</strong>.</li>
  <li>Change from <strong>Automatic (DHCP)</strong> to <strong>Manual</strong>.</li>
  <li>Enter a static IP in your router's range. Keep it outside the DHCP pool.</li>
  <li>Enter your router's IP as the Default Gateway. Use 8.8.8.8 as the DNS server.</li>
  <li>Save settings. Update the printer port in Windows to match the new static IP.</li>
</ol>

<h2>Step 3: Update the Printer Port in Windows</h2>
<p>If the IP has changed, you must update the printer port in Windows:</p>
<ol>
  <li>Open <strong>Settings &gt; Bluetooth &amp; devices &gt; Printers &amp; scanners</strong>.</li>
  <li>Click your HP M209dwe and select <strong>Printer properties</strong>.</li>
  <li>Go to the <strong>Ports</strong> tab. Find the port your printer uses.</li>
  <li>Select it and click <strong>Configure Port</strong>.</li>
  <li>Update the IP address to match the current printer IP. Click OK and Apply.</li>
</ol>

<h2>Step 4: Restart the Windows Print Spooler</h2>
<p>A crashed print spooler makes all printers appear offline. This happens regardless of their actual network status:</p>
<ol>
  <li>Press <strong>Windows Key + R</strong>. Type <code>services.msc</code> and press Enter.</li>
  <li>Scroll to <strong>Print Spooler</strong>. Right-click it and select <strong>Restart</strong>.</li>
  <li>After the service restarts, try printing a test page.</li>
</ol>

<h2>Step 5: Reconnect via HP Smart App</h2>
<p>If the above steps fail, the HP+ cloud connection may be disrupted:</p>
<ol>
  <li>Open HP Smart. If the M209dwe shows as offline, tap it and select <strong>Reconnect</strong>.</li>
  <li>If reconnect fails, remove the printer from HP Smart entirely. Re-add it fresh.</li>
</ol>

<h2>Advanced Troubleshooting</h2>
<ul>
  <li><strong>Sleep mode issue:</strong> The M209dwe enters deep sleep after 10 minutes. When it wakes, the network reconnection takes 20 to 30 seconds. This makes it appear offline. Reduce the sleep timer via EWS.</li>
  <li><strong>Firewall blocking:</strong> Windows Defender can prevent printer discovery. Try disabling the firewall temporarily. If it works, add HP Smart as a firewall exception.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the M209dwe go offline every night?</summary>
  <p>This is usually caused by your router renewing DHCP leases. The printer gets a new IP address. Fix this by assigning a static IP address to the printer.</p>
</details>
<details>
  <summary>Can I use the M209dwe without a Wi-Fi connection?</summary>
  <p>Yes, via USB cable. Connect the printer to your PC via USB. It will work without Wi-Fi. HP+ features require an internet connection.</p>
</details>
<details>
  <summary>Does the M209dwe go offline when HP's servers are down?</summary>
  <p>In some cases, yes. HP+ printers check in with HP's cloud servers periodically. Check HP's status page if you suspect a service outage.</p>
</details>

<h2>When to Contact HP Support</h2>
<p>The M209dwe might continue going offline daily. If a static IP and spooler restart fail, contact HP Support. Their remote diagnostics can check the cloud connection health.</p>`,
  "zebradesigner-not-printing-browser-print-not-working-fix": `<p>Zebra printers integrate smoothly into web-based workflows. You use Zebra Browser Print for this. This helps logistics, healthcare, and retail applications. It lets web applications talk directly to local hardware. You avoid messy print dialogs. Sometimes a user designs a flawless label in ZebraDesigner. However, it refuses to print via the web application. This bottleneck hurts productivity. The failure scenario involves multiple layers. It involves label design software and the local print spooler. It also includes the background daemon and web browser security rules. This guide helps you diagnose and resolve these issues. We fix ZebraDesigner templates failing through Zebra Browser Print.</p>

<h2>Why This Happens</h2>
<p>To fix this, you must understand the data flow. ZebraDesigner creates a visual label. It ultimately generates raw ZPL (Zebra Programming Language) code. The web application sends an HTTP POST request. This contains the ZPL data. It goes to a local web server on the user machine. This local server is the Zebra Browser Print application. Browser Print takes the ZPL payload. It pushes it directly to the connected printer. This bypasses the standard Windows print spooler.</p>
<p>Failures happen when any link breaks. The most prevalent cause is security restrictions. Modern web browsers block cross-origin resource sharing (CORS). Your web application might try to make a background request. If the app is HTTPS, it cannot communicate with an HTTP local endpoint. Second, Browser Print requires explicit user approval. A popup appears asking the user to accept the connection. If you miss this popup, all print jobs fail silently. Finally, incorrect settings cause failures. You might send a 300dpi template to a 203dpi printer. The printer receives the data but fails to render it.</p>

<h2>Step-by-Step Fix</h2>
<ol>
  <li><strong>Verify Zebra Browser Print is Running:</strong> Check that the program is active. Look for the Zebra icon in the Windows system tray. Launch "Zebra Browser Print" from the Start menu if missing. Right-click the icon and select "Settings". Ensure it recognizes your connected printer.</li>
  <li><strong>Check the Browser Console for Errors:</strong> Open your web application. Press F12 to open Developer Tools. Navigate to the "Console" tab. Attempt to trigger a print job. You might see red errors mentioning "CORS policy blocked". The browser is blocking the local server.</li>
  <li><strong>Accept the Browser Print Security Prompt:</strong> Users often miss this critical step. The app generates a popup on the first connection. You MUST click "Yes" or "Accept." If you clicked "No" previously, right-click the tray icon. Go to "Settings," then "Accepted Hosts," and add your domain.</li>
  <li><strong>Resolve HTTPS Issues:</strong> If your web app uses HTTPS, Browser Print must too. Browser Print installs a local certificate for this. Browsers often flag this certificate as invalid. Instruct the browser to trust it. Navigate directly to <code>https://localhost:9141</code>. Click "Advanced" and then "Proceed to localhost (unsafe)."</li>
  <li><strong>Export Raw ZPL from ZebraDesigner:</strong> Do not print a PDF generated by ZebraDesigner. Browser Print handles raw ZPL strings. Select "Print to File" or "Export as ZPL" in ZebraDesigner. Open the file in Notepad. Your web application needs this raw text code.</li>
  <li><strong>Validate Printer Resolution:</strong> Open your ZPL code. Check formatting commands. Coordinates are scaled for specific dots per inch. Ensure the printer model in ZebraDesigner perfectly matches the physical hardware.</li>
  <li><strong>Test with the Zebra Sample Page:</strong> Navigate to the official Zebra Browser Print sample page. Try to print the test label. If it works here but not in your app, your web app integration is flawed.</li>
</ol>

<h2>Advanced Troubleshooting</h2>
<p>When standard fixes fail, check network settings. IT environments often use strict firewall rules. Browser Print binds to ports 9100, 9101, and 9141. Antivirus software might block these local servers. Review the firewall logs. Add exceptions for the <code>browserprint.exe</code> process.</p>
<p>Another diagnostic technique involves intercepting the raw data. The web application might modify the ZPL string incorrectly. Use Wireshark or Fiddler to capture the HTTP POST request. Inspect the payload body. The data must be pure ZPL. Incorrect JSON formatting causes the printer to reject commands silently.</p>
<p>Finally, check the Browser Print API version. Zebra occasionally updates the API endpoints. Your web application might use an older JavaScript library. It could be making bad calls to a newer background daemon. Ensure the JavaScript SDK matches the installed Browser Print version.</p>

<h2>FAQ</h2>
<details>
  <summary>Why does Chrome say "net::ERR_CERT_AUTHORITY_INVALID" when trying to print?</summary>
  <p>This is a security issue. Chrome does not trust the self-signed SSL certificate. You must manually navigate to <code>https://localhost:9141</code>. Tell Chrome to proceed past the security warning.</p>
</details>
<details>
  <summary>Can I print a PDF generated by my web app using Browser Print?</summary>
  <p>Newer versions can handle PDFs. However, sending raw ZPL code is much better. Converting your output to ZPL increases speed and accuracy.</p>
</details>
<details>
  <summary>The Browser Print icon is red instead of white. What does this mean?</summary>
  <p>A red icon indicates the daemon is running. However, it cannot detect a compatible Zebra printer. Check the USB cable and ensure the printer is on.</p>
</details>
<details>
  <summary>My web app sends the job, but the printer prints raw text. Why?</summary>
  <p>The printer driver is intercepting the text. It treats it as a standard document. Ensure the web application sends the data as a "raw" payload.</p>
</details>
<details>
  <summary>Do I have to accept the security popup every time I print?</summary>
  <p>No. The security prompt only appears the very first time. Click "Accept" once. Future print jobs will process silently in the background.</p>
</details>`
};

function getWordCount(text: string): number {
  return text.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(w => w.length > 0).length;
}

async function main() {
  const targetSlugs = ["hp-laserjet-m209dwe-keeps-going-offline", "zebradesigner-not-printing-browser-print-not-working-fix", "hp-envy-6055e-blinking-purple-light", "canon-ij-scan-utility-not-working", "bixolon-spp-r310-bluetooth-pairing"];
  
  const articles = await prisma.article.findMany({
    where: { slug: { in: targetSlugs } }
  });

  const updatePromises = articles.map(async (article) => {
    const slug = article.slug;
    if (replacements[slug]) {
      const beforeCount = getWordCount(article.content);
      const afterContent = replacements[slug];
      const afterCount = getWordCount(afterContent);
      
      await prisma.article.update({
        where: { id: article.id },
        data: { 
          content: afterContent,
          wordCount: afterCount
        }
      });
      console.log(`Updated ${slug}: ${beforeCount} words -> ${afterCount} words`);
    } else {
      console.log(`Skipped ${slug}: No replacement found (may not exist)`);
    }
  });

  await Promise.all(updatePromises);
  console.log("Done running batch updates.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
