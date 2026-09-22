import { prisma } from '../src/lib/prisma';

async function enrichBrotherArticles() {
  console.log('Enriching Brother articles for E50 toner trigger and TS-04 flashing loop...');

  // 1. Enrich brother-error-code-e50-vs-e51-difference
  const e50Article = await prisma.article.findUnique({
    where: { slug: 'brother-error-code-e50-vs-e51-difference' }
  });

  if (e50Article) {
    let content = e50Article.content;

    const tonerSection = `
<h2>Why Brother Printer Shows E50 Right After Changing Toner</h2>
<p><strong>Opening the front cover to replace toner or the drum assembly is the single most common trigger for a sudden E50 fuser error.</strong></p>

<p>While the fuser is located at the rear of the machine and the toner cartridge sits in the front cavity, three mechanical and electrical factors connect them during cartridge maintenance:</p>

<ol>
  <li><strong>Fuser Thermal Drop & Warm-Up Timeout:</strong> Opening the front cover trips a physical interlock switch that immediately cuts high-voltage power to the fuser heater lamp. If the cover remains open for more than a minute while you unpack and prepare the cartridge, the ceramic roller cools down completely. When you shut the door, the printer initiates an aggressive high-current warm-up cycle. If your wall outlet voltage is slightly low, the thermistor fails to reach 180°C within the 30-second timeout window, throwing error E50.</li>
  <li><strong>Green Corona Wire Slider Left Unlocked:</strong> When installing a new toner cartridge into the drum unit, you must slide the green cleaning tab back and forth. You must return this tab to its home position (marked with a molded arrow on the left). If left in the center or right, high-voltage corona leakage overloads the power supply board, creating false E50 thermal fault signals.</li>
  <li><strong>Drum Bias Ground Spring Misalignment:</strong> The drum assembly has metal grounding springs on its left and right chassis rails. If the cartridge was forced in unevenly, the grounding contact disconnects, producing unstable ground loops across the DC controller board.</li>
</ol>

<p><strong>How to resolve E50 after changing toner:</strong></p>
<ol>
  <li><strong>Remove the drum and toner assembly:</strong> Pull the entire cartridge assembly out of the printer.</li>
  <li><strong>Verify the corona wire tab:</strong> Ensure the green slide tab is snapped securely into its resting arrow notch on the far left side.</li>
  <li><strong>Inspect the metal side contacts:</strong> Wipe the brass drum ground contacts on the left side of the cartridge and inside the printer cavity with a dry lint-free cloth.</li>
  <li><strong>Firmly reinsert and latch:</strong> Slide the assembly straight in until both sides click, then firmly shut the front cover.</li>
  <li><strong>Power cycle directly from the wall:</strong> Unplug the AC power cord for 60 seconds (bypassing any surge protector) and reconnect directly to a dedicated wall outlet.</li>
</ol>
`;

    // Insert tonerSection before FAQ or before Deep-Dive
    if (!content.includes('Why Brother Printer Shows E50 Right After Changing Toner')) {
      content = content.replace(
        '<h2>Frequently Asked Questions</h2>',
        `${tonerSection}\n<h2>Frequently Asked Questions</h2>`
      );

      const tonerFaq = `
<details>
  <summary>Why did Brother error E50 appear right after changing the toner?</summary>
  <p>Leaving the front door open allows the fuser to cool completely. Closing it demands peak warm-up current that can timeout on shared power strips. Also verify the green corona wire slider is fully clicked to its home arrow position.</p>
</details>`;

      content = content.replace(
        '<h2>Frequently Asked Questions</h2>',
        `<h2>Frequently Asked Questions</h2>${tonerFaq}`
      );
    }

    const wordCount = content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    await prisma.article.update({
      where: { slug: 'brother-error-code-e50-vs-e51-difference' },
      data: {
        content,
        wordCount,
        excerpt: 'Brother error E50 vs E51 explained by a technician: why changing toner triggers E50 fuser faults, green corona wire fixes, and laser scanner recovery.'
      }
    });
    console.log(`✓ Enriched brother-error-code-e50-vs-e51-difference (${wordCount} words)`);
  }

  // 2. Enrich brother-printer-error-ts-04
  const ts04Article = await prisma.article.findUnique({
    where: { slug: 'brother-printer-error-ts-04' }
  });

  if (ts04Article) {
    let content = ts04Article.content;

    const flashingSection = `
<h2>Brother Printer Stuck Flashing Wi-Fi Light After TS-04: How to Cancel Loop</h2>
<p><strong>When error TS-04 occurs, Brother printers often get locked in an infinite cryptographic retry loop, causing the Wi-Fi LED or Attention light to flash continuously.</strong></p>

<p>Because TS-04 is a security protocol mismatch (typically your router demanding WPA3-Personal SAE while the printer only speaks WPA2-PSK AES), the printer's wireless card keeps broadcasting authentication beacons, getting rejected, and immediately re-attempting.</p>

<p>While stuck in this loop, the printer ignores local print jobs and may refuse to open configuration menus. Follow these steps to break the flashing retry cycle:</p>

<ol>
  <li><strong>Cancel the active wireless handshake:</strong> Press and hold the physical <strong>Wi-Fi button</strong> (or <strong>Go</strong> button on compact models) on the printer control panel for 3 to 5 seconds until the flashing light goes out or turns steady amber.</li>
  <li><strong>Perform a Network Reset:</strong>
    <ul>
      <li>On LCD menu models: Press <strong>Menu &gt; Network &gt; Network Reset</strong>. Press <strong>1 (Yes)</strong> to confirm, then press <strong>1 (Yes)</strong> to reboot.</li>
      <li>On touchscreen models: Tap <strong>Settings (Wrench/Screwdriver) &gt; All Settings &gt; Network &gt; Network Reset</strong>. Press <strong>Yes</strong> for 2 seconds.</li>
      <li>On single-button models (e.g., HL-L2300D series): Turn off the printer, hold down the <strong>Go</strong> button, turn the printer on, keep holding until all LEDs light up, release Go, then press Go 6 times.</li>
    </ul>
  </li>
  <li><strong>Drain logic board capacitance:</strong> Disconnect the AC power cord from the printer while the unit is on. Leave it unplugged for 45 seconds to clear the active connection cache from temporary NVRAM.</li>
  <li><strong>Adjust router security before reconnecting:</strong> Log into your router admin panel and set the 2.4GHz security mode to <strong>WPA2-PSK (AES)</strong> or <strong>WPA2/WPA3 Mixed</strong> before running the Setup Wizard again.</li>
</ol>
`;

    if (!content.includes('Brother Printer Stuck Flashing Wi-Fi Light After TS-04')) {
      content = content.replace(
        '<h2>Frequently Asked Questions</h2>',
        `${flashingSection}\n<h2>Frequently Asked Questions</h2>`
      );

      const flashingFaq = `
<details>
  <summary>Why is my Brother printer Wi-Fi light stuck flashing after a TS-04 error?</summary>
  <p>The printer is trapped in an infinite association retry loop with an incompatible WPA3 router. Hold the Wi-Fi button for 3 seconds to cancel the handshake, or perform a control panel Network Reset.</p>
</details>`;

      content = content.replace(
        '<h2>Frequently Asked Questions</h2>',
        `<h2>Frequently Asked Questions</h2>${flashingFaq}`
      );
    }

    const wordCount = content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    await prisma.article.update({
      where: { slug: 'brother-printer-error-ts-04' },
      data: {
        content,
        wordCount,
        excerpt: 'Brother printer error TS-04 and stuck flashing Wi-Fi light fix: how to cancel the WPA3 handshake retry loop, router cipher configuration, and network reset.'
      }
    });
    console.log(`✓ Enriched brother-printer-error-ts-04 (${wordCount} words)`);
  }

  console.log('Brother article enrichment complete!');
}

enrichBrotherArticles().catch(console.error).finally(() => prisma.$disconnect());
