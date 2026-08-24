import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const printQualityCategory = 'e3d26347-33bf-41a7-9cbf-c3d821850f98';
const paperCategory = '9a42c554-2b4f-47f8-887e-5996fb83cbad';
const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix Nelko Printer Faint Print, Streaky Lines & Garbled Text",
    slug: 'nelko-printer-faint-print-streaky-lines-garbled-text',
    seoTitle: "Fix Nelko Printer Faint Print, Streaky Lines & Garbled Text",
    metaDescription: "Are your Nelko labels printing too light, showing streaky white lines, or printing garbled text? Learn how to clean the thermal printhead and fix driver glitches.",
    excerpt: "Faint or streaky prints are caused by dirt blocking the thermal printhead or low battery voltage, while garbled text indicates a driver communication error.",
    errorCode: 'Poor Print Quality',
    tags: 'nelko printer faint print fix, nelko printer prints garbled text, nelko printer streaky print lines',
    wordCount: 950,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: printQualityCategory,
    authorId: authors.alex,
    reviewerId: authors.elena,
    featuredSnippet: "To fix a Nelko printer printing faint or streaky labels: 1) Clean the Printhead: Open the paper bay. Locate the green/black ceramic strip (the thermal printhead). Use a Q-tip dipped in 99% isopropyl alcohol to wipe away invisible paper dust and adhesive residue. Let it dry for 1 minute. 2) Increase Density: In the Nelko App (or Windows driver), increase the 'Print Density' or 'Concentration' setting from the default to 'High' or 'Dark'. 3) Charge It: Thermal printing requires high power. If the battery drops below 20%, the printhead cannot get hot enough, resulting in faded text.",
    content: `<h2>Why Are My Nelko Labels Faint and Streaky?</h2>
<p>Thermal printers like Nelko do not use ink. They generate intense heat to turn chemically treated paper black. If the heat transfer is interrupted, the text will be light or streaky.</p>

<h3>Fix 1: Thermal Printhead Cleaning</h3>
<p>Every time a label passes over the printhead, it leaves behind microscopic paper dust. Over time, this dust acts as thermal insulation. The heat cannot reach the paper, resulting in faint text and vertical white streaks.</p>
<ol>
  <li>Turn the printer off.</li>
  <li>Open the paper compartment and remove the label roll.</li>
  <li>Locate the ceramic printhead (a thin glass-like strip).</li>
  <li>Wipe it firmly with a cotton swab soaked in rubbing alcohol. You will likely see black/grey dirt on the swab.</li>
</ol>

<h3>Fix 2: App Density and Battery Level</h3>
<p>If the printhead is perfectly clean but the print is still light, go into the Nelko app settings right before you print and change the <strong>Print Density</strong> to High. Additionally, if the printer's battery is low, it cannot supply enough voltage to heat the ceramic element fully. Plug it in for 30 minutes.</p>

<h2>Fixing Garbled Text and Chinese Characters</h2>
<p>If your Nelko shipping printer suddenly spits out miles of labels covered in random symbols, wingdings, or Chinese characters, the printer has received corrupted RAW data.</p>
<ul>
  <li>This happens when the wrong driver is installed, or a USB communication error occurs mid-print.</li>
  <li><strong>The Fix:</strong> Turn the printer off immediately. Clear the Windows/Mac print spooler. Uninstall the printer, download the official Nelko driver from their website, and reinstall it.</li>
</ul>`
  },
  {
    title: "Nelko Third-Party Labels, Size Errors & Authentication Stickers",
    slug: 'nelko-third-party-labels-size-errors-authentication-stickers',
    seoTitle: "Nelko Third-Party Labels, Size Errors & Auth Stickers",
    metaDescription: "Does the Nelko printer require proprietary labels with authentication stickers? Learn how to fix 'Wrong Label Size' errors and use third-party label rolls.",
    excerpt: "Some portable Nelko printers use RFID or authentication stickers to detect paper size automatically. Learn how to bypass size errors and use third-party labels.",
    errorCode: 'Wrong Label Size',
    tags: 'nelko printer using third party labels, nelko label paper authentication sticker, nelko printer wrong label size',
    wordCount: 1000,
    difficultyLevel: 'Intermediate',
    timeToFix: '5 minutes',
    categoryId: paperCategory,
    authorId: authors.marcus,
    reviewerId: authors.david,
    featuredSnippet: "Can you use third-party labels in a Nelko printer? Yes, but with caveats. Nelko 4x6 shipping printers accept ANY direct thermal label brand. However, some newer portable Nelko label makers (like the PM220 series) use an RFID authentication sticker located on the plastic core of the official Nelko paper roll to automatically detect the label size in the app. If you use a cheap third-party roll without this sticker, the app may throw a 'Wrong Label Size' error. To fix this, manually select the exact millimeter dimensions of your third-party label in the Nelko App's template menu.",
    content: `<h2>The "Authentication Sticker" Debate</h2>
<p>Like many thermal printer manufacturers, Nelko employs strategies to encourage users to buy official, branded paper. On some of their portable models, official Nelko paper rolls feature a small RFID chip or an optical authentication sticker on the side of the plastic core.</p>

<h3>What Does the Sticker Do?</h3>
<p>When you load an official roll, the printer reads the sticker and instantly tells the Nelko app exactly what size paper is loaded (e.g., 50x30mm). This auto-formats your canvas perfectly.</p>

<h3>Using Third-Party Labels</h3>
<p>If you purchase a generic brand of thermal labels on Amazon to save money, the Nelko printer will not find the authentication sticker.</p>
<ol>
  <li>The app might default to a standard size or throw a "Wrong Label Size" warning.</li>
  <li>To bypass this, you must tap the label dimensions at the top of the Nelko app and <strong>manually input</strong> the exact width and height (in millimeters) of the third-party labels you purchased.</li>
  <li><strong>Crucial:</strong> Ensure the third-party labels are Direct Thermal (not Thermal Transfer) and that they have black timing marks or standard gaps on the backing.</li>
</ol>

<h2>Fixing "Wrong Label Size" on 4x6 Printers</h2>
<p>If you get a size error on the Nelko desktop shipping printer, it has nothing to do with authentication stickers. The printer's optical sensor has lost calibration.</p>
<ul>
  <li>Turn the printer on.</li>
  <li>Press and hold the top button until it beeps once, then release.</li>
  <li>The printer will feed labels back and forth to measure the exact length of the new roll and update its internal memory.</li>
</ul>`
  },
  {
    title: "Fix Nelko Printer Won't Turn On, Won't Charge & Fast Charger Fix",
    slug: 'nelko-printer-wont-turn-on-wont-charge-fast-charger-fix',
    seoTitle: "Fix Nelko Printer Won't Turn On or Charge (Fast Charger Fix)",
    metaDescription: "Is your portable Nelko printer dead, refusing to charge, or won't turn on? Learn why modern laptop fast-chargers cause Nelko printers to reject power.",
    excerpt: "If your Nelko P21 or PM220 refuses to turn on or charge, the internal battery protection circuit is likely rejecting your high-wattage fast charger.",
    errorCode: 'No Power',
    tags: 'nelko printer wont charge, nelko printer fast charger not working, nelko printer wont turn on',
    wordCount: 950,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: hardwareCategory,
    authorId: authors.elena,
    reviewerId: authors.alex,
    featuredSnippet: "To fix a Nelko printer that won't charge or turn on: 1) Stop using Fast Chargers. Nelko printers lack the advanced PD (Power Delivery) handshake chips required by modern Apple MacBook or Samsung high-wattage USB-C fast chargers. If you plug a Nelko into a 45W/65W charger, the printer's safety circuit will block the current entirely, and the charging light will remain off. 2) The Fix: Use an old, basic 5V/1A or 5V/2A USB-A power brick (like an old iPhone cube) and a standard USB-A to USB-C cable. Leave it plugged in for 30 minutes to revive the deeply discharged battery.",
    content: `<h2>Why Your Nelko Printer Won't Charge</h2>
<p>The most common complaint from new Nelko users is that they unbox the printer, plug it in to charge, and the charging LED remains completely dark. The printer seems dead on arrival. In 95% of cases, the hardware is fine; the charger is the problem.</p>

<h3>The "Fast Charger" Rejection</h3>
<p>Modern USB-C chargers (like those included with iPads, MacBooks, and Samsung Galaxy phones) are "smart" chargers. They use a protocol called Power Delivery (PD) to negotiate voltage (5V, 9V, 15V, 20V) with the device.</p>
<ul>
  <li>Budget portable printers like the Nelko P21 or PM220 do not have the expensive microchip required to perform this PD handshake.</li>
  <li>When the smart charger asks the printer "How much power do you want?" the printer stays silent.</li>
  <li>For safety, the smart charger refuses to output any power at all.</li>
  <li><strong>The Solution:</strong> You must use a "dumb" charger. Dig an old 5V/1A USB-A wall cube out of your drawer. Connect it to the Nelko using a USB-A to USB-C cable. The charging light will instantly turn on.</li>
</ul>

<h2>Reviving a "Dead" Nelko Printer (Won't Turn On)</h2>
<p>If the printer has been sitting in a closet for a year, the lithium-ion battery has dropped below its minimum safe voltage threshold (deep sleep mode).</p>
<ol>
  <li>Plug the printer into a 5V/1A USB-A charger.</li>
  <li>The charging light may <em>not</em> turn on immediately. This is normal. The battery management system is trickling a tiny amount of power to safely wake the cells.</li>
  <li>Wait 30 to 45 minutes. The charging light should eventually illuminate, and the power button will become responsive again.</li>
</ol>`
  },
  {
    title: "Nelko Battery Drains Fast, Overheating & Charging Light Meaning",
    slug: 'nelko-battery-drains-fast-overheating-charging-light-meaning',
    seoTitle: "Nelko Battery Drain, Overheating & Charging Lights",
    metaDescription: "Does your Nelko printer battery drain incredibly fast, overheat, or flash a warning light? Learn how to maximize battery life and decode the charging indicators.",
    excerpt: "Thermal printing draws massive bursts of power. Learn why printing solid black images causes fast battery drain and thermal overheating in Nelko label makers.",
    errorCode: 'Overheating / Battery',
    tags: 'nelko printer battery draining fast, nelko printer charging light meaning, nelko printer overheating shutdown',
    wordCount: 950,
    difficultyLevel: 'Beginner',
    timeToFix: 'N/A',
    categoryId: hardwareCategory,
    authorId: authors.david,
    reviewerId: authors.marcus,
    featuredSnippet: "Decoding Nelko Charging Lights: A flashing green or red light (depending on the model) indicates the printer is actively charging. A solid green light means the battery is 100% full. If the battery drains very fast (e.g., dying after 10 prints), it is usually caused by printing highly dense images. Heating the ceramic printhead to 200°C requires massive battery current. To prevent fast drain and 'Overheating Shutdown' errors, avoid printing large blocks of solid black. Stick to thin line art and text. If the printer overheats, it will flash a red warning light and lock up for 15 minutes to cool down.",
    content: `<h2>Understanding the Nelko Charging Indicator</h2>
<p>While models vary slightly (P21 vs PM220 vs PL70E), the charging logic is standard across Nelko's portable line:</p>
<ul>
  <li><strong>Flashing Green (or Flashing Red):</strong> The printer is plugged in and actively receiving a charge.</li>
  <li><strong>Solid Green:</strong> The lithium-ion battery has reached 100% capacity. You should unplug the printer to avoid degrading the battery cells over time.</li>
  <li><strong>Rapid Flashing Red (while unplugged):</strong> The battery is critically low (under 10%) and the printer will shut down momentarily.</li>
</ul>

<h2>Why Does the Battery Drain So Fast?</h2>
<p>Many users complain that their Nelko battery dies after only 15 or 20 prints, despite the marketing claiming it lasts for hundreds of labels.</p>
<p>Thermal printers do not use ink; they use heat. The battery must generate instantaneous, massive bursts of electricity to heat hundreds of microscopic ceramic dots to roughly 200°C.</p>
<ul>
  <li><strong>Text vs. Images:</strong> If you print a simple text label (like a name or a barcode), only 5% of the printhead heats up. The battery will last for months.</li>
  <li><strong>Dense Images:</strong> If you import a dark photograph or a label with a solid black background, 95% of the printhead must heat up simultaneously. This drains the battery incredibly fast.</li>
</ul>

<h2>Preventing Overheating Shutdowns</h2>
<p>If you are printing 50 highly dense labels back-to-back, the ceramic printhead will become dangerously hot. To prevent the internal plastic chassis from melting, the Nelko firmware has a thermal cutoff switch.</p>
<p>If the printer suddenly stops mid-batch and flashes a red light, it has <strong>overheated</strong>. Do not try to force it to print. Leave the lid open and wait 10 to 15 minutes for the ceramic plate to cool down naturally. Once safe, the light will turn green and printing will resume.</p>`
  }
];

async function main() {
  const brandSlug = 'nelko';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 3 (Clusters F & G: Print Quality & Power) for brand: ${brand.name}`);

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
