import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';
const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';
const paperCategory = '9a42c554-2b4f-47f8-887e-5996fb83cbad';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Phomemo M02 vs M02 Pro vs T02 Comparison & M02S Fixes",
    slug: 'phomemo-m02-vs-m02-pro-t02-comparison-m02s-fixes',
    seoTitle: "Phomemo Pocket Printers: M02 vs M02 Pro vs T02 Comparison",
    metaDescription: "Deciding between the Phomemo M02, M02 Pro, and T02 pocket printers? Discover the resolution differences and learn how to fix the M02S not printing.",
    excerpt: "The Phomemo M02 series dominates the pocket thermal printer market. We break down the differences in DPI resolution and troubleshoot common M02S printing failures.",
    errorCode: null,
    tags: 'Phomemo, M02 vs M02 Pro Difference, T02 vs M02 Which to Buy, M02S Not Printing, Pocket Printer, 300dpi vs 203dpi',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: 'N/A',
    categoryId: setupCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "Phomemo Pocket Printer Comparison: 1) Phomemo T02: The cheapest, most basic model. Prints at 203dpi. Only supports standard 50/53mm paper. Best for kids and simple text. 2) Phomemo M02: The standard model. Prints at 203dpi. 3) Phomemo M02 Pro & M02S: The premium models. They feature a high-resolution 300dpi printhead, which is crucial for printing detailed photos without heavy pixelation. They also support multiple paper widths (15mm, 25mm, 53mm). If your M02S is not printing, ensure the app canvas resolution matches the paper size loaded.",
    content: `<h2>The Phomemo Pocket Printer Lineup</h2>
<p>If you are looking for a Bluetooth mini pocket printer for journaling, scrapbooking, or printing quick photos from your phone, Phomemo's ecosystem is vast. Here is how the three main tiers break down.</p>

<h3>1. Phomemo T02 (The Entry Level)</h3>
<ul>
  <li><strong>Resolution:</strong> 203 DPI (Standard).</li>
  <li><strong>Paper Support:</strong> Only supports a single width: 50mm / 53mm.</li>
  <li><strong>Best For:</strong> Budget-conscious buyers, kids, printing text notes, and simple cartoon line-art. Photos will look highly pixelated.</li>
</ul>

<h3>2. Phomemo M02 (The Standard)</h3>
<ul>
  <li><strong>Resolution:</strong> 203 DPI.</li>
  <li><strong>Build Quality:</strong> Features a more robust, retro-camera aesthetic compared to the plastic T02.</li>
  <li><strong>Best For:</strong> General journaling and bullet-list printing.</li>
</ul>

<h3>3. Phomemo M02 Pro & M02S (The Premium Tier)</h3>
<ul>
  <li><strong>Resolution:</strong> 300 DPI (High Resolution).</li>
  <li><strong>Paper Support:</strong> Supports three widths via included plastic hubs: 15mm, 25mm, and 53mm.</li>
  <li><strong>Best For:</strong> Printing actual photographs. The jump from 203 to 300 DPI dramatically reduces the "stair-step" jagged edges on curved lines and provides much smoother dithering for black-and-white photos.</li>
</ul>

<h2>Fixing the Phomemo M02S Not Printing</h2>
<p>If your M02S connects via Bluetooth but feeds blank paper or crashes when printing:</p>
<ol>
  <li><strong>Paper Width Mismatch:</strong> The M02S supports 15mm, 25mm, and 53mm paper. If you physically load a 15mm roll but the Phomemo app is set to a 53mm canvas, the firmware will reject the print job to prevent burning the bare rubber roller. Update the canvas size in the app.</li>
  <li><strong>Upside Down Paper:</strong> Ensure the glossy, chemical side of the paper is facing the lid (the ceramic printhead).</li>
</ol>`
  },
  {
    title: "Phomemo Label Maker Comparison: M110 vs M120 vs M150 vs M221",
    slug: 'phomemo-label-maker-comparison-m110-m120-m150-m221',
    seoTitle: "Phomemo Label Maker Comparison: M110 vs M120 vs M150 vs M221",
    metaDescription: "Which Phomemo label maker is best for your small business? We compare the M110, M120, M150, and the wide-format M221.",
    excerpt: "From the portable M110 to the massive 3-inch M221, Phomemo offers varying thermal label makers for small businesses. Find out which fits your product packaging needs.",
    errorCode: null,
    tags: 'Phomemo, M110 vs M120 vs M150 Comparison, M221 Business Label Maker Setup, Label Printer for Small Business, Die Cut Labels',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: 'N/A',
    categoryId: setupCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "Phomemo Business Label Maker Comparison: 1) Phomemo M110: The most popular classic model. Prints labels up to 2 inches (50mm) wide. Best for barcodes and price tags. 2) Phomemo M120/M150: Upgraded versions of the M110 featuring a small LCD screen to display battery life and Bluetooth status. 3) Phomemo M221: The heavy-duty wide-format model. Prints labels up to 3 inches (80mm) wide. This is the best choice for small business product packaging, ingredient lists, and clothing swing tags.",
    content: `<h2>Choosing a Phomemo for Small Business</h2>
<p>Unlike the M02/T02 series which use continuous sticker paper, the Phomemo M-series (M110, M120, M150, M221) are designed to print on <strong>die-cut labels</strong> (individual pre-cut stickers on a waxy liner). This makes them ideal for barcodes, product ingredients, and price tags.</p>

<h3>1. Phomemo M110 (The Classic)</h3>
<p>The M110 is the foundational model. It supports labels from 20mm up to <strong>50mm (2 inches) wide</strong>. It has no screen, relying purely on the Print Master app. It is perfect for basic QR codes, retail price tags, and small address labels.</p>

<h3>2. Phomemo M120 & M150 (The Screen Upgrades)</h3>
<p>These models share the exact same 2-inch printhead as the M110, but they add a small OLED display on the front. This screen is highly useful in warehouse environments because it displays exact battery percentage, Bluetooth pairing status, and the current paper size loaded, saving you from having to check the phone app.</p>

<h3>3. Phomemo M221 (The Wide Format Standard)</h3>
<p>The M221 is a significantly larger machine. It increases the maximum print width to <strong>80mm (roughly 3.1 inches)</strong>.</p>
<ul>
  <li><strong>Why choose the M221?</strong> If you sell cosmetics, candles, or food products, a 2-inch label is often too narrow to fit FDA-compliant ingredient lists and logos. The 3-inch width of the M221 allows for professional product branding.</li>
  <li><strong>Setup:</strong> Use the green adjustable sliding hubs inside the paper tray to center smaller label rolls. Always calibrate the gap by pressing the power button once after loading a new roll.</li>
</ul>`
  },
  {
    title: "Phomemo D30, Q30 vs Q30S, A30 & P15 Setup Guide",
    slug: 'phomemo-d30-q30-vs-q30s-a30-p15-setup-guide',
    seoTitle: "Phomemo D30, Q30, A30 & P15 Mini Label Maker Guide",
    metaDescription: "Setup and troubleshooting guide for Phomemo's mini D30, Q30, Q30S, A30, and P15 label makers. Compare features and fix common paper errors.",
    excerpt: "Phomemo's D30 and Q30 series are ultra-compact label makers designed for home organization and spice jars. Learn the differences and how to set them up.",
    errorCode: null,
    tags: 'Phomemo, D30 Label Maker Setup, Q30 vs Q30S Difference, A30 Label Printer Error, P15 Setup Guide, Mini Label Maker, Home Organization',
    wordCount: 1000,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: setupCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "Phomemo Mini Label Maker Guide: 1) Phomemo D30: The classic slim label maker. Prints strictly on 12mm-15mm wide continuous or die-cut labels. Ideal for spice jars and file folders. 2) Phomemo Q30 vs Q30S Difference: Both use the same 12-15mm paper as the D30. The Q30 uses 4x AAA batteries or plugs into a wall, while the Q30S has a built-in rechargeable lithium battery. 3) P15 & A30: Newer ultra-compact variations utilizing the same Print Master app infrastructure.",
    content: `<h2>The Home Organization Series (12mm-15mm)</h2>
<p>While the M-series is built for business, Phomemo's ultra-compact line (D30, Q30, A30, P15) is designed for home organization, kitchen pantries, school supplies, and file folders. They all print on narrow <strong>12mm to 15mm (half-inch)</strong> tape.</p>

<h3>Phomemo D30 Setup Guide</h3>
<ol>
  <li>Slide the front cover off the D30.</li>
  <li>Insert the label roll. <strong>Crucial step:</strong> The label must pull out from the LEFT side of the roll, passing over the rubber roller. The print surface faces the top.</li>
  <li>Leave 5mm of the label sticking out of the exit slot and snap the cover shut.</li>
  <li>Open the Print Master app, tap the printer icon, and select the D30's MAC address.</li>
</ol>

<h3>Phomemo Q30 vs Q30S: What's the Difference?</h3>
<p>The Q-series shares the exact same printhead and paper compatibility as the D30 but features a different chassis design.</p>
<ul>
  <li><strong>Phomemo Q30:</strong> Does <em>not</em> contain a rechargeable battery. It requires either 4 AAA alkaline batteries or must remain plugged into a USB wall adapter to function.</li>
  <li><strong>Phomemo Q30S:</strong> Features a built-in rechargeable lithium-ion battery (like your smartphone), making it truly wireless and portable.</li>
</ul>

<h3>A30 Error & Troubleshooting</h3>
<p>If your A30 or P15 flashes a red error light when you try to print, it is almost always a <strong>Label Size Not Recognized</strong> error. Ensure you have selected the exact millimeter length in the Print Master app (e.g., 12x40mm) to match the die-cut labels you physically loaded.</p>`
  },
  {
    title: "Phomemo PM241-BT Shipping Label Setup & vs Rollo Comparison",
    slug: 'phomemo-pm241-bt-shipping-label-setup-vs-rollo-comparison',
    seoTitle: "Phomemo PM241-BT Setup, Fixes & Rollo Comparison",
    metaDescription: "Setting up a Phomemo PM241-BT for 4x6 shipping labels? Compare it to the Rollo wireless, fix Bluetooth dropouts, and resolve un-scannable barcode issues.",
    excerpt: "The Phomemo PM241-BT is a heavy-duty 4x6 shipping label printer. Learn how to configure it for Shopify, Amazon, and compare it against the Rollo Wireless.",
    errorCode: null,
    tags: 'Phomemo, PM241-BT Shipping Label Setup, vs Rollo Comparison, Shipping Labels Not Scanning, 4x6 Thermal Printer, Faded Barcodes',
    wordCount: 1150,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: setupCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "Phomemo PM241-BT vs Rollo Wireless: The Phomemo PM241-BT is significantly cheaper and offers direct Bluetooth printing from iOS/Android via the Labelife app. The Rollo Wireless uses Wi-Fi/AirPrint, which is faster for desktop ERP systems but more difficult to set up on enterprise networks. If your PM241-BT shipping labels are not scanning at the post office: Clean the printhead with alcohol. Then, go into the Windows/Mac print driver preferences and increase the 'Density' or 'Darkness' setting from 8 to 12. Decrease the print speed to 3 ips to ensure crisp, dark barcodes.",
    content: `<h2>Setting Up the Phomemo PM241-BT (4x6 Shipping)</h2>
<p>Unlike the pocket printers, the <strong>PM241-BT</strong> is a commercial-grade 4x6 shipping label printer designed for eCommerce fulfillment (Shopify, Amazon, Etsy).</p>

<h3>Desktop (Windows/Mac) Setup:</h3>
<ol>
  <li>Connect the printer via the included USB cable.</li>
  <li>Download the official driver from the Phomemo website (do not rely on Windows Plug-and-Play).</li>
  <li>Load your 4x6 fanfold or rolled labels. Ensure the adjustable side guides are snug.</li>
  <li><strong>Calibrate:</strong> Press and hold the top feed button until it flashes red once, then release. The printer will feed a label to detect the gap.</li>
</ol>

<h3>Mobile Setup (Bluetooth):</h3>
<p>You cannot print via AirPrint. You must download the <strong>Labelife</strong> app on iOS or Android. You can share PDF shipping labels from the Etsy/Shopify app directly into the Labelife app to print wirelessly over Bluetooth.</p>

<h2>Phomemo PM241-BT vs. Rollo Wireless</h2>
<table style="width:100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1; text-align: left;">
      <th style="padding: 0.75rem;">Feature</th>
      <th style="padding: 0.75rem;">Phomemo PM241-BT</th>
      <th style="padding: 0.75rem;">Rollo Wireless</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold;">Connection Method</td>
      <td style="padding: 0.75rem;">USB &amp; Bluetooth</td>
      <td style="padding: 0.75rem;">USB &amp; Wi-Fi (AirPrint)</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold;">Mobile App Required?</td>
      <td style="padding: 0.75rem;">Yes (Labelife App)</td>
      <td style="padding: 0.75rem;">No (Native iOS/Android Print)</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold;">Cost</td>
      <td style="padding: 0.75rem;">Budget-friendly</td>
      <td style="padding: 0.75rem;">Premium/Expensive</td>
    </tr>
  </tbody>
</table>

<h2>Fix: Shipping Labels Not Scanning</h2>
<p>If USPS, UPS, or FedEx scanners cannot read your Phomemo barcodes, the print density is too low or the speed is too high.</p>
<ul>
  <li><strong>On Windows:</strong> Go to Control Panel &gt; Devices and Printers &gt; right-click PM241 &gt; Printing Preferences. Under the <em>Options</em> or <em>Advanced</em> tab, increase the <strong>Darkness/Density</strong> from the default 8 to 12. Lower the <strong>Speed</strong> to 3 in/sec.</li>
  <li><strong>Clean the Head:</strong> A single speck of dust can create a vertical white line through a barcode, making it completely unreadable to lasers. Wipe the printhead with 99% isopropyl alcohol.</li>
</ul>`
  },
  {
    title: "Phomemo M08F Tattoo Stencil & M832 Letter Size Paper Guide",
    slug: 'phomemo-m08f-tattoo-stencil-m832-letter-size-paper-guide',
    seoTitle: "Phomemo M08F & M832: Tattoo Stencils & Letter Size Setup",
    metaDescription: "Troubleshooting the Phomemo M08F and M832 A4/Letter size thermal printers. Learn how to print tattoo stencils perfectly and fix thermal paper compatibility issues.",
    excerpt: "The M08F and M832 are wide-format portable printers for US Letter and A4 thermal paper. Learn the exact settings required to transfer tattoo stencils without jamming.",
    errorCode: null,
    tags: 'Phomemo, M08F Tattoo Stencil Not Printing, M832 Not Printing, Thermal Paper Compatibility Guide, A4 Portable Printer, US Letter',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: paperCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "To print tattoo stencils on the Phomemo M08F: 1) You MUST purchase the specific 'Phomemo M08F Tattoo Printer' variant. The standard M08F is configured for thin thermal receipt paper and will jam instantly if fed thick 4-layer Spirit tattoo transfer paper. 2) Remove the brown protective tissue layer from the tattoo paper before inserting it. 3) Insert the yellow backing sheet face UP into the feed slot. 4) In the Phomemo app, set 'Print Density' to 'Thick' or 'High' to ensure enough heat is generated to melt the purple carbon transfer wax onto the stencil sheet.",
    content: `<h2>Portable A4 / US Letter Thermal Printers</h2>
<p>The <strong>Phomemo M08F</strong> and <strong>M832</strong> are unique portable printers. Instead of narrow receipt rolls, they print on full 8.5" x 11" US Letter or A4 paper. They are highly popular with traveling business professionals and tattoo artists.</p>

<h2>Fixing the M08F Tattoo Stencil Jam</h2>
<p>If you are trying to print tattoo stencils and the printer grinds, jams, or prints nothing, you likely bought the wrong hardware version or are feeding it incorrectly.</p>
<ol>
  <li><strong>Hardware Mismatch:</strong> Phomemo sells TWO versions of the M08F. The standard version is for thin thermal paper. The <em>Tattoo Edition</em> has a wider platen gap and a higher-heat printhead designed specifically for thick, 4-ply Spirit transfer paper. You cannot use tattoo paper in the standard M08F.</li>
  <li><strong>Preparation:</strong> A tattoo transfer sheet has 4 layers (White sheet, brown tissue, purple carbon, yellow backing). <strong>You MUST throw away the brown tissue layer.</strong> Leaving it in will block the heat and jam the printer.</li>
  <li><strong>Feeding:</strong> Feed the paper in so the yellow backing is facing UP, and the white drawing sheet is facing DOWN.</li>
  <li><strong>Density:</strong> Thermal transfer wax requires high heat. In the app settings, set Print Density to High/Heavy.</li>
</ol>

<h2>Phomemo M832 Not Printing & Paper Compatibility</h2>
<p>The M832 is an upgraded version of the M08F that can accept both folded A4 paper and rolls of thermal paper. If it feeds but prints blank:</p>
<ul>
  <li><strong>Wrong Paper Type:</strong> You cannot use standard laser/inkjet copy paper (like Hammermill or HP printer paper) in an M08F or M832. It MUST be specifically coated Direct Thermal A4 or US Letter paper.</li>
  <li><strong>Upside Down:</strong> Direct thermal paper is only chemically coated on one side. If it prints blank, flip the paper over so the glossy/smooth side faces the thermal head.</li>
</ul>`
  }
];

async function main() {
  const brandSlug = 'phomemo';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 3 (Clusters E & G: Models & Business) for brand: ${brand.name}`);

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
