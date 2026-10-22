import { prisma } from '../src/lib/prisma';

const SLUG = 'munbyn-rw402b-not-printing';

const NEW_CONTENT = `<h2>Why Your RW402B Isn't Printing</h2>
<p>If your Munbyn RW402B won't print, don't worry—nine times out of ten, the printer isn't broken. Most of the time, it comes down to one of two things: pairing through your phone's general Bluetooth settings instead of the Munbyn app, or loading your labels upside down.</p>

<p>The RW402B is a direct thermal shipping printer. It doesn't use ink or toner, and it handles Bluetooth differently than a regular desktop printer or wireless headphones. When something isn't set up quite right, it won't pop up a helpful error message on your screen—it just sits there silently.</p>

<p>Here's how to troubleshoot it step by step, starting with the Bluetooth issue that catches almost everyone.</p>

<h2>Check the Status Light First</h2>
<p>Take a look at the LED on top of the printer before touching any settings. The color tells you what the machine is waiting on:</p>

<table>
  <thead>
    <tr>
      <th>Light</th>
      <th>What It Means</th>
      <th>What to Do</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Solid Blue or Green</strong></td>
      <td>Ready to print</td>
      <td>The hardware is fine. The issue is your app connection or print queue.</td>
    </tr>
    <tr>
      <td><strong>Flashing Blue</strong></td>
      <td>Receiving data</td>
      <td>Give it a few seconds. If it stays flashing, your print job is stuck in the queue.</td>
    </tr>
    <tr>
      <td><strong>Flashing Red</strong></td>
      <td>Label size or sensor issue</td>
      <td>The printer lost track of the label gap. Run a quick recalibration.</td>
    </tr>
    <tr>
      <td><strong>Solid Red</strong></td>
      <td>Cover unlatched or overheated</td>
      <td>Push down firmly on both front corners of the lid until both sides click shut.</td>
    </tr>
  </tbody>
</table>

<h2>1. Connect Through the Munbyn App, Not Your Phone's Settings</h2>
<p>This is the most common reason people think their RW402B is broken.</p>

<p>When you get a new Bluetooth device, your instinct is to open your phone's Bluetooth settings, find the printer, and tap pair. Your phone says "Connected," so you think you're ready. But when you try to print from Shopify, Pirate Ship, or Etsy, nothing happens.</p>

<p>Here's why: your phone's operating system doesn't know how to send shipping label data to a thermal printer over standard Bluetooth. It needs the <strong>Munbyn Print app</strong> to act as the bridge.</p>

<p><strong>How to fix it:</strong></p>
<ol>
  <li>Open your phone's Bluetooth settings, find the RW402B, and tap <strong>Forget This Device</strong> (or Unpair).</li>
  <li>Download and open the official <strong>Munbyn Print app</strong>.</li>
  <li>Tap the connect button in the top corner of the app and let it search for the printer.</li>
  <li>Select your RW402B right inside the app.</li>
</ol>

<p><em>Android note:</em> Make sure you grant the app <strong>Location</strong> (or <strong>Nearby Devices</strong> on Android 12+) permissions. Android requires location access to scan for Bluetooth Low Energy devices. If you decline it, the app will never find your printer.</p>

<h2>2. Make Sure Another Device Isn't Hogging the Connection</h2>
<p>The RW402B can only talk to one phone, tablet, or computer at a time. It doesn't support multi-device switching.</p>

<p>If you paired your iPad yesterday and you're trying to print from your iPhone today, the printer might still be linked to your iPad. It won't give you a busy signal—it will just ignore your iPhone completely.</p>

<p>Turn off Bluetooth on any other devices in your room that have ever connected to the printer. Then flip the power switch on the back of the RW402B off for 5 seconds and back on. Now try connecting from your phone.</p>

<h2>3. Check Your Paper (The Scratch Test)</h2>
<p>Because thermal printers don't use ink, they rely on heat-sensitive chemicals inside the paper. If heat hits the wrong surface, nothing shows up.</p>

<p>Two quick checks:</p>
<ul>
  <li><strong>Is the paper upside down?</strong> The smooth, printable side must face <strong>UP</strong> toward the ceiling as it feeds out through the slot. If it's face down, the printhead heats bare backing paper and spits out blank white sheets.</li>
  <li><strong>Is it direct thermal paper?</strong> Run your fingernail quickly across a label with some pressure. If you see a dark streak, it's direct thermal paper. If nothing happens, you have regular paper or thermal transfer stock that requires a ribbon—which won't work in this printer.</li>
</ul>

<p>If your printer keeps spitting out blank sheets even when loaded correctly, take a look at our guide on <a href="/munbyn/printing-problems/munbyn-printer-printing-blank-labels">fixing Munbyn printers printing blank labels</a> for sensor and voltage checks.</p>

<h2>4. Recalibrate the Label Gap (Fixes Flashing Red Lights)</h2>
<p>Whenever you change label rolls, switch sizes, or see a flashing red light, the printer usually just lost track of where one label ends and the next begins.</p>

<p>Recalibrating takes about 10 seconds:</p>
<ol>
  <li>Make sure the printer is turned on with at least 3 labels loaded.</li>
  <li>Press and hold the round <strong>FEED</strong> button on top of the lid.</li>
  <li>Wait until you hear <strong>one beep</strong>, then let go immediately.</li>
  <li>The printer will feed a couple of labels back and forth to measure the gap between them.</li>
</ol>
<p>When it stops, the light should turn blue or green. Press the FEED button once—exactly one label should feed out and stop right at the tear bar.</p>

<h2>5. Click Both Lid Latches Shut (Fixes Solid Red Lights)</h2>
<p>The RW402B has two separate safety latches, one on each side of the lid. If you close the cover by pressing down in the middle with one hand, one side often stays slightly loose.</p>

<p>Even if the lid looks closed to your eye, the internal safety switch knows it isn't making full contact. When that happens, the light turns solid red and the motor won't turn.</p>

<p>Open the lid, check that no stray label is stuck around the black rubber roller, and close it using two hands. Press firmly down on <strong>both front corners</strong> until you hear a clear click on both the left and right sides.</p>

<h2>6. Clean the Printhead If Prints Are Faint or Spotty</h2>
<p>Label adhesive, paper lint, and dust love to stick to the heating line on thermal printers. Over time, that buildup acts like an insulator and stops the heat from reaching your labels cleanly.</p>

<p>Turn the printer off, open the cover, and look at the thin glass strip on the underside of the top lid. Grab an alcohol prep pad (or a lint-free cloth with 70%+ isopropyl alcohol) and gently wipe across the strip. Let it dry for a minute or two before turning the printer back on.</p>

<h2>7. Test with a USB Cable to Narrow It Down</h2>
<p>If you've tried everything above and the printer still won't budge wirelessly, plug it directly into a PC or Mac using the included USB cable.</p>

<p>Install the Munbyn driver and try printing a test page. This simple test splits your problem right in half:</p>
<ul>
  <li><strong>If it prints fine over USB:</strong> Your printer hardware, roller, and heating elements are in great shape. The problem is 100% in your phone's Bluetooth settings, permissions, or the app.</li>
  <li><strong>If it won't print over USB either:</strong> Run a self-test: turn the machine off, hold the FEED button down, turn the power switch back on, and release FEED after the first beep. If nothing prints on a self-test, the hardware or power supply has an issue and you should reach out to Munbyn support for a replacement.</li>
</ul>`;

const NEW_FAQS = JSON.stringify([
  {
    question: "Why does my phone say 'Connected' in Bluetooth settings, but my shipping app won't print?",
    answer: "Smartphones don't recognize thermal label printers as standard printers through general Bluetooth settings. You have to open the Munbyn Print app and connect directly inside the app so it can handle the label data.",
  },
  {
    question: "Why is my Munbyn RW402B feeding blank labels?",
    answer: "The most common cause is loading the roll upside down. The coated side of direct thermal paper must face upward toward the printhead. Also verify with a fingernail scratch test that your labels are direct thermal, not standard paper.",
  },
  {
    question: "How do I stop the red light from flashing on my RW402B?",
    answer: "A flashing red light means the label gap sensor needs recalibration. With paper loaded, hold the top FEED button until you hear one beep, then release. The printer will measure the labels and return to a steady blue or green light.",
  },
  {
    question: "Why is the light on my printer solid red?",
    answer: "A solid red light usually means the lid is not clicked shut on both sides. Press down firmly on both front corners until you hear two distinct clicks. If you just finished a huge batch of labels, it could also mean the printhead needs a few minutes to cool down.",
  },
  {
    question: "Can two people print to the RW402B at the same time?",
    answer: "No. The RW402B only connects to one device at a time. If someone else in your workspace connected to it earlier, turn off Bluetooth on their device or restart the printer so your phone can link up.",
  },
]);

function calculateWordCount(html: string): number {
  const text = html.replace(/<[^>]*>/g, ' ');
  return text.trim().split(/\s+/).filter(Boolean).length;
}

async function main() {
  const article = await prisma.article.findFirst({
    where: { slug: SLUG },
    select: { id: true, title: true },
  });

  if (!article) {
    throw new Error(`Article with slug "${SLUG}" not found.`);
  }

  const wordCount = calculateWordCount(NEW_CONTENT);
  console.log(`Updating article "${article.title}" (${article.id})...`);
  console.log(`Word count: ${wordCount}`);

  await prisma.$executeRaw`
    UPDATE "Article"
    SET
      "content" = ${NEW_CONTENT},
      "faqs" = ${NEW_FAQS},
      "wordCount" = ${wordCount},
      "reviewedAt" = NOW()
    WHERE "id" = ${article.id}
  `;

  console.log('Database update completed successfully!');

  const linkRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
  const links: { href: string; anchor: string }[] = [];
  let match;
  while ((match = linkRegex.exec(NEW_CONTENT)) !== null) {
    links.push({ href: match[1], anchor: match[2].replace(/<[^>]+>/g, '').trim() });
  }

  console.log(`\nVerified internal links in new content (${links.length} total):`);
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
