import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';
const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix Star Micronics Cutter Locked, Paper Jam & Cover Won't Open",
    slug: 'star-micronics-cutter-locked-paper-jam-cover-wont-open',
    seoTitle: "Fix Star Micronics Cutter Locked & Cover Won't Open",
    metaDescription: "Is your Star Micronics printer cover locked shut? Learn how to fix a guillotine cutter jam and use the manual cutter release knob on the TSP100/143 series.",
    excerpt: "The most terrifying sound a POS printer makes is grinding gears followed by a locked cover. Here is how to manually release a jammed Star Micronics cutter.",
    errorCode: 'Cutter Locked',
    tags: 'star micronics printer cutter locked wont open, star micronics printer cover wont open, star micronics cutter knob release guide, star micronics printer paper jam cutter, star micronics tsp143 cover locked',
    wordCount: 1050,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: hardwareCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "To fix a Star Micronics printer with a locked cover and jammed cutter: Do NOT pry the lid open with a screwdriver, as you will snap the plastic hinges. The printer lid is locked because the V-shaped guillotine cutter blade failed to retract after a cut, physically hooking the lid shut. Turn the printer OFF. On the front of the printer (below the paper exit slot), pull off the front plastic bezel. Underneath, you will find a small silver or white plastic gear knob. Spin this knob downward/forward until you see the metal cutter blade retract back inside the casing. The cover will now pop open easily.",
    content: `<h2>Why Your Star Micronics Cover is Locked</h2>
<p>In high-volume restaurant and retail environments, the Star Micronics TSP100 and TSP143 series are legendary for their durability. However, the most common physical failure is the <strong>Guillotine Cutter Jam</strong>.</p>
<p>When the printer cuts a receipt, a metal blade shoots forward, slices the paper, and retracts in a fraction of a second. If paper dust or a thick crumpled receipt jams the blade while it is extended, it physically hooks the top cover to the bottom chassis. You cannot open the lid to clear the jam because the blade is acting like a deadbolt lock.</p>

<h2>The Manual Cutter Knob Release Guide</h2>
<p>If you force the lid open while the blade is extended, you will destroy the cutting assembly and void your warranty. You must retract the blade manually.</p>
<ol>
  <li><strong>Power Off:</strong> Turn off the physical power switch on the side of the printer to prevent the motor from fighting you.</li>
  <li><strong>Remove the Front Bezel:</strong> Below the paper exit slot (where the receipt normally comes out), there is a plastic front cover. Pull it firmly toward you. It will pop off.</li>
  <li><strong>Locate the Gear:</strong> You will see the exposed metal chassis. Look for a small plastic gear or a knob (usually white or silver, depending on the model year).</li>
  <li><strong>Spin the Gear:</strong> Spin the gear downward (towards the counter) continuously. As you spin it, look into the paper exit slot. You should see the sharp metal V-blade slowly retracting.</li>
  <li><strong>Open the Lid:</strong> Once the blade is fully retracted, press the main cover release latch on the right side of the printer. The lid will spring open.</li>
</ol>

<h2>Preventing Future Paper Jams</h2>
<p>After clearing the jam, you must clean the cutter track. Blow a can of compressed air into the cutter mechanism to remove accumulated paper dust. Ensure you are using high-quality 80mm thermal paper; very cheap, thick paper can overwhelm the cutter motor.</p>`
  },
  {
    title: "Fix Star Micronics Printer Won't Cut, Double Cut & Half Cuts",
    slug: 'star-micronics-printer-wont-cut-double-cut-half-cuts',
    seoTitle: "Fix Star Micronics Printer Won't Cut or Double Cuts",
    metaDescription: "Is your Star Micronics printer printing a continuous receipt without cutting? Or is it cutting receipts in half? Learn how to fix POS software cutter settings.",
    excerpt: "If your printer blade isn't physically jammed, but it simply refuses to cut at the end of a transaction, the issue is almost always a software misconfiguration.",
    errorCode: 'Cutter Disabled',
    tags: 'star micronics printer wont cut receipt, star micronics printer cutting receipt in half, star micronics printer double cutting',
    wordCount: 950,
    difficultyLevel: 'Intermediate',
    timeToFix: '5 minutes',
    categoryId: softwareCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "To fix a Star Micronics printer that won't cut the receipt: If the blade isn't physically broken, the POS software is failing to send the 'cut command' at the end of the print job. In Windows, go to Control Panel > Devices and Printers. Right-click your Star Micronics printer and select Printer Properties. Go to the Device Settings tab. Find the 'Page Cut Type' or 'Peripheral Unit' setting. Change it from 'No Cut' to 'Partial Cut' or 'Document Cut'. For iPad POS systems like Square or Shopify, open the POS app settings, select the printer, and ensure 'Auto-Cut' is toggled ON.",
    content: `<h2>Why the Printer Refuses to Cut (Continuous Roll)</h2>
<p>If your Star Micronics TSP143 churns out a 3-foot long receipt for three different customers without ever cutting between them, the internal blade is likely fine. The printer simply never received the <strong>Cut Command</strong>.</p>
<ul>
  <li>POS software sends raw hex commands (like <code>ESC d</code>) to trigger the cutter.</li>
  <li>If you recently updated your Windows driver or reinstalled your iPad POS app, the cutter setting often defaults to "No Cut".</li>
</ul>

<h3>Windows Driver Fix</h3>
<ol>
  <li>Open Windows Settings &gt; Devices &gt; Printers &amp; Scanners.</li>
  <li>Click your Star printer &gt; Manage &gt; Printer Properties.</li>
  <li>Click the <strong>Device Settings</strong> tab.</li>
  <li>Scroll down to "Cut Type" or "Page Cut". Change it to <strong>Partial Cut</strong>.</li>
  <li>Click Apply and print a test page.</li>
</ol>

<h2>Cutting Receipts in Half or Double Cutting</h2>
<p>If the printer cuts the receipt directly through the middle of the customer's barcode, or if it cuts twice per transaction (leaving a tiny sliver of paper on the floor):</p>
<ul>
  <li><strong>Double Cutting:</strong> This happens when <em>both</em> the Windows Print Driver and the POS Software are sending a cut command. The printer receives two commands back-to-back. You must disable the cutter in the Windows driver, allowing the POS software to manage the cuts.</li>
  <li><strong>Cutting in Half:</strong> Your POS software is formatting the receipt for an A4 printer instead of an 80mm continuous roll. It thinks the page ended, cuts it, and prints the rest on page two. Check your POS receipt template settings and ensure the page height is set to "Continuous" or "Roll Paper".</li>
</ul>`
  },
  {
    title: "Star Micronics LED Error Codes, Beeping & Factory Reset Guide",
    slug: 'star-micronics-led-error-codes-beeping-factory-reset-guide',
    seoTitle: "Star Micronics LED Error Codes & Factory Reset Guide",
    metaDescription: "Decode Star Micronics LED flashing lights (red and blue). Learn how to fix beeping errors, power issues, and perform a factory reset on the TSP143.",
    excerpt: "The Star Micronics TSP100/TSP143 series communicates hardware and network faults via flashing red and blue LEDs. Learn what they mean and how to perform a network reset.",
    errorCode: 'Flashing Red LED',
    tags: 'star micronics printer led flashing meaning, star micronics factory reset tsp143, star micronics blue and red light flashing, star micronics printer error led solid, star micronics printer power led not on, star micronics reset network settings, star micronics printer beeping error, star micronics led display troubleshooting guide',
    wordCount: 1150,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: errorCategory,
    authorId: authors.elena,
    reviewerId: authors.alex,
    featuredSnippet: "To Factory Reset a Star Micronics TSP143 (Network/LAN Reset): 1) Turn the printer's physical power switch OFF. 2) Using a pen or paperclip, press and HOLD the tiny recessed 'RST' (Reset) button located on the back of the printer near the ethernet port. 3) While holding the reset button down, turn the printer power switch ON. 4) Continue holding the reset button for 10-15 seconds until the Network LED on the back flashes rapidly. 5) Release the button. The printer will reboot and print a self-test page confirming the IP address is wiped back to DHCP default.",
    content: `<h2>Decoding Star Micronics LED Lights</h2>
<p>Because the TSP143 and mc-Print3 lack an LCD screen, you must diagnose connection and hardware issues by interpreting the flashing LED lights on the front control panel.</p>

<h3>The "Power" LED (Blue/Green)</h3>
<ul>
  <li><strong>Solid Blue:</strong> Normal operation. The printer is ready.</li>
  <li><strong>Flashing Blue:</strong> The printer is receiving data over the network, or it is in Bluetooth pairing mode.</li>
  <li><strong>Power LED Not On:</strong> The printer is dead. Check the thick black AC power cord in the back. Star printers use internal power supplies, so if the cord is secure and the switch is on, but there are no lights, the internal PSU has blown (often due to a power surge).</li>
</ul>

<h3>The "Error" LED (Red)</h3>
<ul>
  <li><strong>Solid Red:</strong> Hardware Interlock. The printer is completely out of paper, or the top cover is not pushed down hard enough to latch on both sides.</li>
  <li><strong>Flashing Red (Slow):</strong> Printhead Overheat. If you just printed 200 receipts in a row, the thermal ceramic head is too hot. The printer will lock out for 5-10 minutes to cool down.</li>
  <li><strong>Flashing Red & Blue Alternatively:</strong> A critical firmware error or network failure. This often requires a hard reset.</li>
</ul>

<h2>The Beeping Error</h2>
<p>Star printers feature an internal buzzer (and sometimes an external kitchen buzzer attached to the cash drawer port). If the printer starts beeping continuously, it is warning you that the paper is about to run out (the roll is getting thin), or a print job was sent but the cover is currently popped open.</p>

<h2>How to Factory Reset the TSP143 / TSP100</h2>
<p>If you changed your router, or a previous IT guy assigned a Static IP address that you can no longer access, you must wipe the printer's network card.</p>
<ol>
  <li>Power off the printer.</li>
  <li>Locate the <strong>RST (Reset)</strong> pinhole on the back panel (next to the LAN port).</li>
  <li>Press the button in with a paperclip and <strong>hold it</strong>.</li>
  <li>Turn the printer on while continuing to hold the button.</li>
  <li>When the network LEDs on the back flash, release the button. A long diagnostic receipt will print confirming the reset to DHCP.</li>
</ol>`
  }
];

async function main() {
  const brandSlug = 'star-micronics';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  
  if (!brand) {
    brand = await prisma.brand.create({
      data: {
        name: 'Star Micronics',
        slug: brandSlug,
        description: 'Star Micronics is a leading manufacturer of POS (Point of Sale) receipt printers, kitchen printers, and cash drawers used globally in retail and hospitality.'
      }
    });
  }

  console.log(`🚀 Publishing Batch 1 (Clusters A & B: Cutters & LEDs) for brand: ${brand.name}`);

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
