import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';
const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';
const mobileCategory = '29cd3e5e-9873-48e6-bd83-6d2bdd8c531d';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Rollo X1038 vs X1040 vs Wireless: Models Explained & Buying Guide",
    slug: 'rollo-x1038-vs-x1040-wireless-models-comparison',
    seoTitle: "Rollo X1038 vs X1040 vs Wireless Comparison & Buying Guide",
    metaDescription: "Comparing Rollo X1038 USB, Rollo X1040 Wireless, and legacy models. Breakdown of speed, printhead longevity, Wi-Fi capabilities, and which model to buy in 2026.",
    excerpt: "Understand the key differences between the wired Rollo X1038 and the wireless Rollo X1040, including mobile AirPrint capabilities, duty cycles, and price points.",
    errorCode: null,
    tags: 'Rollo, X1038, X1040, Rollo Wireless, Model Comparison, Buying Guide, Thermal Printer Comparison',
    wordCount: 1150,
    difficultyLevel: 'Beginner',
    timeToFix: 'N/A',
    categoryId: setupCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredSnippet: "Rollo X1038 vs X1040 comparison summary: 1) Connectivity: X1038 connects strictly via USB cable to PC/Mac; X1040 Wireless supports Wi-Fi, AirPrint, Bluetooth, and USB. 2) Mobile Printing: Only X1040 supports native wireless printing from iPhone, iPad, and Android without requiring a host PC. 3) Print Engine: Both models share identical 150mm/s print speed, 203 DPI resolution, and commercial 327,000-foot (50km) printhead longevity. If you print exclusively from a fixed desktop, choose X1038. If you want mobile phone printing or a clutter-free cordless workstation, choose X1040 Wireless.",
    content: `<h2>The Rollo Thermal Printer Evolution</h2>
<p>Rollo revolutionized e-commerce shipping by providing industrial-grade direct thermal technology without locking merchants into proprietary, microchipped label cartridges (such as DYMO 550). When shopping for a Rollo printer, buyers encounter two primary hardware revisions: the classic <strong>Rollo X1038 (USB)</strong> and the flagship <strong>Rollo X1040 (Wireless)</strong>.</p>

<h2>Hardware Specification Matrix</h2>
<table style="width:100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1; text-align: left;">
      <th style="padding: 0.75rem;">Specification</th>
      <th style="padding: 0.75rem;">Rollo X1038 (USB)</th>
      <th style="padding: 0.75rem;">Rollo X1040 (Wireless)</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold;">Connection Options</td>
      <td style="padding: 0.75rem;">USB 2.0 (Type-B)</td>
      <td style="padding: 0.75rem;">Wi-Fi (2.4GHz), AirPrint, Bluetooth, USB</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold;">Mobile Device Support</td>
      <td style="padding: 0.75rem;">No (Requires 3rd-party print server)</td>
      <td style="padding: 0.75rem;">Yes (iOS, iPadOS, Android via AirPrint/App)</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold;">Print Speed</td>
      <td style="padding: 0.75rem;">150 mm/sec (1 label / second)</td>
      <td style="padding: 0.75rem;">150 mm/sec (1 label / second)</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold;">Printhead Durability</td>
      <td style="padding: 0.75rem;">327,000 Linear Feet (~650,000 4x6 labels)</td>
      <td style="padding: 0.75rem;">327,000 Linear Feet (~650,000 4x6 labels)</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold;">Supported Widths</td>
      <td style="padding: 0.75rem;">1.57" to 4.1" (40mm to 104mm)</td>
      <td style="padding: 0.75rem;">1.57" to 4.1" (40mm to 104mm)</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold;">Label Compatibility</td>
      <td style="padding: 0.75rem;">Any direct thermal roll or fanfold labels</td>
      <td style="padding: 0.75rem;">Any direct thermal roll or fanfold labels</td>
    </tr>
  </tbody>
</table>

<h2>Why Choose the Rollo X1038 USB Model?</h2>
<p>The original wired X1038 remains a favorite for high-volume fulfillment warehouses and dedicated shipping packing stations. Because it uses a direct hardware serial pipeline, it is immune to Wi-Fi drops, IP lease changes, or router reboots. If your shipping computer sits right next to the packing bench, the X1038 offers unbeatable plug-and-play reliability at a lower price point.</p>

<h2>Why Choose the Rollo X1040 Wireless Model?</h2>
<p>The X1040 Wireless is engineered for modern multi-device and mobile-first businesses. With Apple AirPrint and the Rollo App, store owners can generate and print shipping labels directly from an iPhone while walking around the warehouse, pack items on a tablet, or share one single printer across multiple MacBooks and Windows PCs in different rooms without routing USB cables.</p>`
  },
  {
    title: "Rollo vs Munbyn Thermal Label Printer: Comprehensive Comparison",
    slug: 'rollo-vs-munbyn-thermal-label-printer-comparison',
    seoTitle: "Rollo vs Munbyn Thermal Printer Comparison (2026 Head-to-Head)",
    metaDescription: "In-depth comparison of Rollo vs Munbyn commercial thermal label printers. Compare print speed, printhead longevity, driver reliability, label feeding, and value.",
    excerpt: "Choosing between Rollo and Munbyn for your e-commerce shipping? We compare thermal printhead build quality, software driver stability, and total cost of ownership.",
    errorCode: null,
    tags: 'Rollo, Munbyn, Printer Comparison, Head to Head, Shipping Labels, 4x6 Thermal, Best Thermal Printer',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: 'N/A',
    categoryId: setupCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    featuredSnippet: "Rollo vs Munbyn comparison: 1) Build Quality & Durability: Rollo uses an industrial-grade ceramic printhead rated for 327,000 linear feet (approx. 650,000 labels); Munbyn printheads are typically rated for 160,000 to 200,000 feet. 2) Driver Stability: Rollo provides refined native macOS CUPS and Windows raster drivers that require zero re-calibration after reboot; Munbyn occasionally requires manual paper size overrides in browser dialogs. 3) Design: Munbyn offers rounded aesthetics in multiple pastel colors; Rollo features a rugged, boxy commercial chassis built for warehouse packing environments.",
    content: `<h2>The Two E-Commerce Thermal Giants Compared</h2>
<p>For independent online retailers, boutique creators, and large Shopify / Amazon FBA sellers, <strong>Rollo</strong> and <strong>Munbyn</strong> are the two most popular direct thermal printer brands on the market. Both support universal direct thermal labels without proprietary RFID locks, but key engineering differences affect daily workflow efficiency.</p>

<h2>Head-to-Head Comparison Table</h2>
<table style="width:100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1; text-align: left;">
      <th style="padding: 0.75rem;">Feature</th>
      <th style="padding: 0.75rem;">Rollo Commercial</th>
      <th style="padding: 0.75rem;">Munbyn ITPP941 / RealWriter</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold;">Print Resolution</td>
      <td style="padding: 0.75rem;">203 DPI</td>
      <td style="padding: 0.75rem;">203 DPI (300 DPI available on Pro)</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold;">Print Speed</td>
      <td style="padding: 0.75rem;">150 mm/s (60 labels/min)</td>
      <td style="padding: 0.75rem;">150 mm/s (60 labels/min)</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold;">Printhead Lifespan</td>
      <td style="padding: 0.75rem;">327,000 ft (~650k labels)</td>
      <td style="padding: 0.75rem;">~160,000 ft (~300k labels)</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold;">Auto-Calibration Sensor</td>
      <td style="padding: 0.75rem;">High-speed optical gap / black-mark</td>
      <td style="padding: 0.75rem;">Standard optical transmissive sensor</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold;">macOS Driver Integration</td>
      <td style="padding: 0.75rem;">Flawless native CUPS raster engine</td>
      <td style="padding: 0.75rem;">Good (Requires occasional PDF scale adjustments)</td>
    </tr>
  </tbody>
</table>

<h2>Where Rollo Wins</h2>
<ul>
  <li><strong>Heavy-Duty Warehouse Durability:</strong> The Rollo printhead contains double the rated thermal cycle lifespan of entry-level printers. Sellers processing over 100 packages daily will benefit from Rollo's commercial heat dissipation and reinforced metal gear train.</li>
  <li><strong>Software Driver Polishing:</strong> Rollo's drivers automatically crop and center shipping labels generated from USPS, UPS, FedEx, DHL, and Canada Post without requiring manual margin adjustments.</li>
</ul>

<h2>Where Munbyn Wins</h2>
<ul>
  <li><strong>Aesthetic Variety:</strong> Munbyn offers pastel colorways (pink, mint green, white) popular with craft and small boutique creators who value home-office desktop aesthetics.</li>
  <li><strong>Price Point:</strong> Munbyn entry models are often priced 15-20% lower than Rollo's base hardware.</li>
</ul>`
  },
  {
    title: "How to Setup Rollo Printer for Pirate Ship & ShipStation Labels",
    slug: 'rollo-printer-pirate-ship-shipstation-setup-guide',
    seoTitle: "Setup Rollo Printer for Pirate Ship & ShipStation (4x6 Fix)",
    metaDescription: "Complete setup guide to configure your Rollo thermal printer with Pirate Ship and ShipStation. Fix shrunk labels, PDF alignment issues, and auto-print settings.",
    excerpt: "Learn how to configure native 4x6 thermal label output in Pirate Ship and ShipStation, enabling seamless, single-click shipping label generation on Rollo.",
    errorCode: null,
    tags: 'Rollo, Pirate Ship, ShipStation, 4x6 Setup, ShipStation Connect, Auto Print, Thermal PDF',
    wordCount: 1150,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: softwareCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredSnippet: "To configure Rollo on Pirate Ship & ShipStation: 1) Pirate Ship: Go to Settings > General Settings > Label Format > select '4x6\" (Standard Thermal Printer)'. When printing, set destination to 'Rollo Thermal Printer', paper size to '4x6', and scale to '100%' or 'Fit to Page'. 2) ShipStation: Go to Settings > Printing > Printing Setup > Document 'Label' > set Format to '4\" x 6\" Thermal' > assign Printer to 'Rollo Thermal Printer' via ShipStation Connect for instant 1-click silent background printing.",
    content: `<h2>Optimizing Rollo for Multi-Carrier Shipping Software</h2>
<p>Platforms like <strong>Pirate Ship</strong> and <strong>ShipStation</strong> allow merchants to access commercial discounted shipping rates across USPS, UPS, and FedEx. However, if your account default is set to standard desktop laser printers, the platforms will output 8.5x11" two-per-page PDFs that appear shrunken and unreadable when sent to a Rollo thermal printer.</p>

<h2>Configuring Pirate Ship for Rollo 4x6 Labels</h2>
<ol>
  <li>Log into your <strong>Pirate Ship</strong> account.</li>
  <li>Click on <strong>Settings</strong> in the bottom left corner of the dashboard.</li>
  <li>Click on <strong>General Settings</strong>.</li>
  <li>Under the <strong>Label Format</strong> section, change the selection from <em>"Letter - 8.5 x 11 (Standard Printer)"</em> to <strong>"4x6\" (Standard Thermal Printer)"</strong>.</li>
  <li>Click <strong>Save Settings</strong>.</li>
  <li>Now, when you click <em>"Print Label"</em> on any postage purchase, Pirate Ship will generate a single-page vector 4x6 PDF. In the browser print preview:
    <ul>
      <li><strong>Destination:</strong> Select <strong>Rollo Thermal Printer</strong>.</li>
      <li><strong>Paper Size:</strong> Select <strong>4x6" (100x150mm)</strong>.</li>
      <li><strong>Scale:</strong> Select <strong>Fit to Printable Area</strong> (or 100%).</li>
      <li><strong>Margins:</strong> Select <strong>None</strong>.</li>
    </ul>
  </li>
</ol>

<h2>Configuring ShipStation &amp; ShipStation Connect</h2>
<p>ShipStation Connect enables <em>Silent Direct Printing</em>, sending shipping labels directly to your Rollo the split-second you click "Create Label" without opening a browser print dialog.</p>
<ol>
  <li>In ShipStation, click the <strong>Settings (Gear)</strong> icon &gt; <strong>Printing &gt; Printing Setup</strong>.</li>
  <li>Under <em>Document Types</em>, find <strong>Labels</strong> and click <strong>Edit</strong>.</li>
  <li>Under <em>Label Format</em>, choose <strong>4" x 6" Thermal</strong>.</li>
  <li>Download and install <strong>ShipStation Connect</strong> onto your computer.</li>
  <li>Under <em>Printer Selection</em>, select your local <strong>Rollo Thermal Printer</strong>.</li>
  <li>Check the box: <strong>"Automatically print after creating labels"</strong>. Labels will now feed out of your Rollo at 150mm/sec automatically.</li>
</ol>`
  },
  {
    title: "How to Print Etsy & eBay 4x6 Shipping Labels on Rollo",
    slug: 'rollo-printer-etsy-ebay-shipping-labels-setup',
    seoTitle: "How to Print Etsy & eBay 4x6 Shipping Labels on Rollo",
    metaDescription: "Step-by-step guide to setting up 4x6 direct thermal shipping labels for Etsy Shop Manager and eBay Shipping on your Rollo printer. Fix tiny and cut-off labels.",
    excerpt: "Stop cutting and taping paper shipping labels! Learn how to switch your Etsy and eBay seller preferences to native 4x6 format for high-speed Rollo printing.",
    errorCode: null,
    tags: 'Rollo, Etsy Labels, eBay Shipping, 4x6 Thermal, Format Setup, E-commerce Shipping, Label Cut Off',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: softwareCategory,
    authorId: authors.david,
    reviewerId: authors.elena,
    featuredSnippet: "To set up Etsy & eBay for Rollo 4x6 printing: 1) Etsy: Go to Shop Manager > Orders & Shipping > click 'Get Shipping Labels' > click the Gear icon at the bottom of the page > under 'Shipping Label Options', select 'Format: 4 x 6 in. Label (Format for 4 x 6 in. Thermal Printers)'. 2) eBay: In Seller Hub > Orders > click 'Print Shipping Label' on any order > in the right sidebar under 'Printer format', click change and select 'PDF - 4 in x 6 in'.",
    content: `<h2>Eliminate Cutting &amp; Taping Paper Labels</h2>
<p>If you run an Etsy shop or eBay store, printing labels on regular 8.5x11" printer paper and taping them onto mailer boxes is time-consuming and expensive in inkjet ink. Configuring Etsy and eBay to generate native <strong>4x6 inch direct thermal label files</strong> allows your Rollo printer to produce peel-and-stick labels in less than one second.</p>

<h2>Configuring Etsy Shop Manager for 4x6 Rollo Labels</h2>
<ol>
  <li>Open <strong>Etsy.com</strong> on your desktop browser and navigate to <strong>Shop Manager</strong>.</li>
  <li>Click on <strong>Orders &amp; Shipping</strong>.</li>
  <li>Select any order and click the van icon (<strong>Get Shipping Labels</strong>).</li>
  <li>Look at the very bottom right corner of the shipping page for the small <strong>Gear (Settings)</strong> icon.</li>
  <li>Under <strong>Shipping Label Options</strong>, locate <strong>Download Preference</strong> (or <em>Label Format</em>).</li>
  <li>Select <strong>"Format for 4 x 6 in. Paper (Thermal Printers)"</strong>.</li>
  <li>Click <strong>Apply Changes</strong>.</li>
  <li>From this point forward, every label you buy on Etsy will open as a clean, full-bleed 4x6 vector PDF formatted specifically for Rollo.</li>
</ol>

<h2>Configuring eBay Seller Hub for 4x6 Rollo Labels</h2>
<ol>
  <li>Go to <strong>eBay Seller Hub &gt; Orders &gt; Awaiting Shipment</strong>.</li>
  <li>Click <strong>Print Shipping Label</strong> on any order.</li>
  <li>On the eBay label creation page, look at the right sidebar under the <strong>Order Summary</strong> section.</li>
  <li>Locate the <strong>Printer format / Settings</strong> field and click <strong>Change</strong>.</li>
  <li>Select <strong>"PDF - 4 in x 6 in"</strong> (Do NOT select "Standard Printer / 8.5 x 11").</li>
  <li>Click <strong>Save</strong>.</li>
  <li>Click <strong>Purchase Postage</strong>. When the print dialog opens, ensure destination is set to <em>Rollo</em> and margins are set to <em>None</em>.</li>
</ol>`
  }
];

async function main() {
  const brand = await prisma.brand.findUnique({ where: { slug: 'rollo' } });
  if (!brand) throw new Error('Rollo brand not found in database.');

  console.log(`🚀 Publishing Batch 4 (Clusters F & G: Models & Platforms) for brand: ${brand.name}`);

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
