import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function stripCrossBrandLinks(html: string): string {
  return html.replace(/<a\s[^>]*href="\/[^"]*"[^>]*>([^<]*)<\/a>/gi, '$1');
}

const expansions: Record<string, string> = {
  'dymo-printer-out-of-paper-error-label-loaded': `
<h2>Why DYMO LabelWriter Printers Report "Out of Paper" With Labels Loaded</h2>
<p>DYMO LabelWriter printers (LabelWriter 450, 450 Turbo, 4XL, 550, 5XL) utilize an optical transmissive sensor positioned on the label feed path to detect label gaps and index holes. When the printer flashes a blue or red status LED and insists it is out of paper despite a full roll loaded, sensor calibration failure, label dust, or RFID authentication issues (on 550-series) are responsible.</p>

<h2>Exhaustive 4-Step Resolution Guide</h2>
<ol>
  <li><strong>Clean the Optical Index Gap Sensor:</strong>
    <p>Unplug the power and USB cables. Open the top label cover. Remove the label roll. Look down into the label feed throat. You will see a small, rectangular optical sensor opening. Dust from thermal label backing accumulates here. Use a can of clean compressed air to blow out the sensor opening, then wipe the sensor glass with a dry foam swab.</p>
  </li>
  <li><strong>Verify Label Spool Guide Flange Positioning:</strong>
    <p>The plastic label spool consists of a spindle and a sliding side flange. If the sliding flange is loose, the label roll will wobble sideways, causing the index holes to drift away from the optical sensor beam. Push the sliding flange snugly against the side of the label roll so it rotates with zero lateral play.</p>
  </li>
  <li><strong>Understanding the DYMO 550 / 5XL RFID Requirement:</strong>
    <p>DYMO 550-series printers feature integrated RFID readers that authenticate an RFID microchip embedded in the cardboard core of genuine DYMO label rolls. If you load third-party (non-RFID) labels into a DYMO 550 or 5XL, the printer will permanently report "Out of Paper" or "Invalid Media". Using genuine DYMO rolls is required on 550 models.</p>
  </li>
  <li><strong>Re-feed Labels Using the Form Feed Button:</strong>
    <p>Thread the leading edge of the label roll into the feed slot until the motorized roller automatically grabs and advances the label to the tear bar. Press the physical <strong>Form Feed button</strong> on the front once to synchronize the top-of-form index mark.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the printer feed 3 blank labels every time I press Form Feed?</summary>
  <p>If the printer feeds multiple labels without stopping at the tear line, the optical gap sensor is blinded by label dust or the label stock does not have standard die-cut gaps.</p>
</details>
<details>
  <summary>Can I clean the rubber platen roller inside a DYMO LabelWriter?</summary>
  <p>Yes. Feed an official DYMO Cleaning Card (or a business card lightly moistened with 99% isopropyl alcohol) through the feed path while pressing Form Feed to remove adhesive residue.</p>
</details>
`,

  'fix-dymo-web-service-shopify-amazon-ebay-chrome': `
<h2>Fixing the DYMO Web Service for Chrome, Shopify, Amazon, and eBay</h2>
<p>The <strong>DYMO Web Service</strong> (DLS Web Service / DYMO Connect Web Service) is a local lightweight HTTP server (running on ports 41951 - 41960) that acts as a secure cryptographic bridge between web browsers (Google Chrome, Microsoft Edge, Firefox, Safari) and your local DYMO LabelWriter driver. When shipping platforms (Shopify Admin, Amazon Seller Central, eBay, ShipStation) report "DYMO Web Service Not Running", local SSL certificate trust or port binding collisions are responsible.</p>

<h2>Step-by-Step DYMO Web Service Restoration Protocol</h2>
<ol>
  <li><strong>Verify the Service is Running in the System Tray:</strong>
    <p>Look at your Windows System Tray (bottom right near clock) or macOS Menu Bar. Locate the small blue and white DYMO icon. If missing, open your Start menu and search for <strong>"DYMO Connect"</strong> or <strong>"DYMO Label Web Service"</strong> to launch it.</p>
  </li>
  <li><strong>Diagnose Localhost SSL Certificate Trust in Chrome:</strong>
    <ul>
      <li>Open Google Chrome.</li>
      <li>In the URL address bar, navigate to: <code>https://127.0.0.1:41951/DYMO/DLS/Printing/Check</code>.</li>
      <li>If Chrome displays "Your connection is not private" (<code>NET::ERR_CERT_AUTHORITY_INVALID</code>), the self-signed local SSL certificate used by DYMO has expired or was rejected by Chrome.</li>
      <li>Click <strong>Advanced &gt; Proceed to 127.0.0.1 (unsafe)</strong>. This forces Chrome to trust the local DYMO web service port for the active session.</li>
    </ul>
  </li>
  <li><strong>Regenerate the DYMO SSL Root Certificate:</strong>
    <p>Right-click the DYMO icon in the system tray and select <strong>Diagnose...</strong>. When prompted "Do you want to test the certificate?", click <strong>Yes</strong>. This automatically generates a fresh X.509 certificate and imports it into the Windows Trusted Root Certificate Authorities store.</p>
  </li>
  <li><strong>Resolve Port Conflicts:</strong>
    <p>Ensure other local development servers (Node.js, Docker, IIS) are not occupying ports 41951 through 41960. Restart the DYMO service.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why did the DYMO Web Service stop working after a Chrome browser update?</summary>
  <p>Google Chrome security updates frequently tighten local network private access policies, blocking uncertified localhost web sockets. Installing DYMO Connect v1.4.5 or later provides updated secure WebSockets.</p>
</details>
<details>
  <summary>Does DYMO Connect replace the legacy DYMO Label Software (DLS)?</summary>
  <p>Yes. DYMO Connect is the modern, 64-bit software suite that fully replaces legacy DLS v8.x on Windows 10, Windows 11, and macOS Sonoma.</p>
</details>
`,

  'dymo-printer-prints-faint-blurry-streaks': `
<h2>Why DYMO Thermal Label Printers Print Faint, Blurry, or Streaky Barcodes</h2>
<p>DYMO LabelWriter printers are <strong>Direct Thermal</strong> devices. They contain no ink, toner, or ribbons. Instead, a micro-thermal printhead containing a line of heating elements applies heat directly to heat-sensitive dye coating on the thermal paper. When text appears faint, washed out, or contains vertical white lines through barcodes, thermal element burnout, adhesive contamination, or low voltage is responsible.</p>

<h2>Exhaustive 4-Step Thermal Quality Restoration Protocol</h2>
<ol>
  <li><strong>Clean the Thermal Printhead with 99% Isopropyl Alcohol:</strong>
    <p>Unplug the printer. Open the top cover. Look at the underside of the printhead assembly above the rubber platen. You will see a narrow, dark horizontal ceramic strip (the thermal line). Adhesive dust and heat glaze accumulate here. Clean the thermal strip firmly using a cotton swab moistened with 99% anhydrous isopropyl alcohol. Let dry for 2 minutes.</p>
  </li>
  <li><strong>Clean the Rubber Platen Drive Roller:</strong>
    <p>If the rubber roller beneath the printhead is coated with adhesive from peeled labels, the roller slips, compressing text and creating blurry double-lines. Wipe the rubber roller with an alcohol wipe while manually rotating the roller gear.</p>
  </li>
  <li><strong>Increase Print Density / Darkness in Driver Properties:</strong>
    <ul>
      <li>Open Control Panel &gt; Devices and Printers &gt; right-click DYMO LabelWriter &gt; <strong>Printing Preferences</strong>.</li>
      <li>Click on the <strong>Advanced</strong> tab &gt; <strong>Print Quality / Darkness</strong>.</li>
      <li>Increase print density from "Normal" to <strong>"Barcodes and Graphics"</strong> or <strong>"Dark"</strong>. This increases the microsecond thermal dwell time, producing deep, scan-ready black lines.</li>
    </ul>
  </li>
  <li><strong>Check the 24V DC External Power Supply Brick:</strong>
    <p>DYMO printers require a certified 24V DC / 1.75A - 2.5A power adapter. Using an incorrect 12V or 19V laptop charger will power the logic board and LEDs, but will starve the thermal printhead, producing ultra-faint gray prints.</p>
  </li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>What causes a solid vertical white line running through my printed labels?</summary>
  <p>A solid vertical white line indicates a physically burned-out thermal element on the printhead die. If cleaning with alcohol does not remove the line, the printhead has suffered pixel burnout and must be replaced.</p>
</details>
<details>
  <summary>Why do thermal labels turn completely black when exposed to heat?</summary>
  <p>Direct thermal paper is chemically coated with leuco dyes that react to heat. Storing printed labels near sunny windows, car dashboards, or heat sources will darken the entire label surface.</p>
</details>
`,

  'brother-printer-error-ts-01': `
<h2>Advanced RF Antenna Diagnostics for Brother TS-01</h2>
<p>When TS-01 appears, the printer's wireless subsystem is in an unpowered sleep state. In addition to menu toggling, on commercial Brother MFC workgroup printers, verify that the <strong>Physical Ethernet Cable</strong> is disconnected from the rear RJ-45 jack. Brother mainboards contain a mechanical sensing switch inside the Ethernet port: plugging in a network cable physically disables line power to the Wi-Fi RF amplifier chip.</p>

<h2>Network EEPROM Flash Procedure for TS-01</h2>
<ol>
  <li>Enter <strong>Menu &gt; Network &gt; Network Reset</strong>.</li>
  <li>Press <strong>1</strong> (or select <strong>Yes</strong>).</li>
  <li>Hold down the <strong>1</strong> button for 2 seconds to execute an EEPROM flash reset. The machine will reboot and initialize the wireless radio into its default factory state.</li>
  <li>Navigate to <strong>Menu &gt; Network &gt; WLAN &gt; Setup Wizard</strong> to reconnect to your 2.4GHz network.</li>
</ol>
`,

  'brother-printer-error-ts-04': `
<h2>Deep Protocol Analysis of Brother TS-04 Cipher Collisions</h2>
<p>Code TS-04 is frequently triggered on corporate and educational Wi-Fi networks where <strong>802.11w Protected Management Frames (PMF)</strong> are enforced as "Mandatory". Legacy Brother wireless chips cannot negotiate encrypted management beacons. In your router or access point settings (UniFi, Cisco, Aruba), configure PMF from "Required" to <strong>"Optional / Supported"</strong> to allow the Brother printer to complete association.</p>

<h2>Router Wireless Configuration Checklist for TS-04</h2>
<ul>
  <li><strong>Band:</strong> 2.4 GHz only (802.11b/g/n)</li>
  <li><strong>Channel Width:</strong> 20 MHz (Never 40 MHz or Dynamic Auto)</li>
  <li><strong>Security Mode:</strong> WPA2-PSK (AES)</li>
  <li><strong>Protected Management Frames (PMF):</strong> Optional / Disabled</li>
</ul>
`
};

async function main() {
  console.log('🚀 Expanding Dymo (3) + Brother (2) Articles...\n');

  for (const [slug, additionalContent] of Object.entries(expansions)) {
    const article = await prisma.article.findUnique({
      where: { slug }
    });

    if (!article) {
      console.log(`⚠️ Article not found: ${slug}`);
      continue;
    }

    const cleanExisting = stripCrossBrandLinks(article.content || '');
    const combinedContent = cleanExisting + '\n' + additionalContent;
    const cleanFull = stripCrossBrandLinks(combinedContent);

    const text = cleanFull.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const realWords = text.split(' ').filter(w => w.length > 0).length;

    await prisma.article.update({
      where: { id: article.id },
      data: {
        content: cleanFull,
        wordCount: realWords
      }
    });

    console.log(`✅ [${realWords}w] Updated ${slug}`);
  }

  console.log('\n🎉 Dymo + Brother Expansion Complete!');
}

main().then(async () => prisma.$disconnect()).catch(async e => { console.error(e); prisma.$disconnect(); process.exit(1); });
