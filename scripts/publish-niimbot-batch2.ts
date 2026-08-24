import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';
const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "NIIMBOT D11 vs D110 vs D101 & Setup Guides",
    slug: 'niimbot-d11-vs-d110-d101-setup-guides',
    seoTitle: "NIIMBOT D11 vs D110 vs D101 Comparison & Setup Guide",
    metaDescription: "Comparing the NIIMBOT D11, D110, and D101 half-inch label makers. Learn the differences in paper width support and how to fix the D110 not printing.",
    excerpt: "The D-Series is NIIMBOT's most popular line of ultra-compact portable label makers. Learn the differences between the D11, D110, and D101 and how to set them up.",
    errorCode: null,
    tags: 'niimbot d101 vs d11 difference, niimbot d11 plus setup guide, niimbot d110 not printing, niimbot d11_h setup guide',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: setupCategory,
    authorId: authors.elena,
    reviewerId: authors.alex,
    featuredSnippet: "NIIMBOT D-Series Comparison: 1) NIIMBOT D11 & D110: Both print on 12mm to 15mm (half-inch) label tape. They are functionally identical internally, but the D110 features a slightly more compact, modern chassis design and uses a USB-C port, whereas older D11 models used Micro-USB. 2) NIIMBOT D101: The D101 is slightly wider. It supports the same 15mm tape as the D11, but also supports wider 25mm (1-inch) tape, making it better for larger fonts. If your D110 is not printing, open the lid and ensure the printable (glossy) side of the tape is facing the printhead, not the rubber roller.",
    content: `<h2>The NIIMBOT D-Series Lineup</h2>
<p>If you need a pocket-sized label maker for home organization, spice jars, and cables, the D-Series is the starting point. However, the naming conventions can be confusing.</p>

<h3>D11 vs D110 Difference</h3>
<ul>
  <li><strong>NIIMBOT D11 (and D11_H):</strong> The original classic model. It has a rounded, retro design. Max paper width is 15mm.</li>
  <li><strong>NIIMBOT D110:</strong> A refresh of the D11. It uses the exact same 15mm paper and the same printhead, but features a flat, minimalist design and an upgraded USB-C charging port. It is usually slightly cheaper than the D11.</li>
</ul>

<h3>The D101 (The 1-Inch Upgrade)</h3>
<p>The <strong>NIIMBOT D101</strong> is a slightly wider version of the D11. It includes a removable plastic spacer inside the paper bay. With the spacer inserted, it prints on standard 15mm D11 tape. Remove the spacer, and it can accept wider 25mm (1-inch) tape.</p>

<h2>Fixing the D110 / D11 Not Printing</h2>
<p>If your D-series connects to Bluetooth successfully but spits out blank tape when you press print, the paper is loaded backward.</p>
<ol>
  <li>Open the top hatch.</li>
  <li>Pull the tape out. The glossy/smooth side must face the ceramic heating element (usually facing the top or front of the machine).</li>
  <li>Leave about 5mm (1/4 inch) of tape sticking out of the exit slot before snapping the lid shut.</li>
  <li>Press the power button once. The printer will feed one label to calibrate the gap sensor.</li>
</ol>`
  },
  {
    title: "NIIMBOT B1 vs B21 vs B3s & B4 Comparison & Troubleshooting",
    slug: 'niimbot-b1-vs-b21-b3s-b4-comparison-troubleshooting',
    seoTitle: "NIIMBOT B1 vs B21 vs B3s & B4 Comparison & Troubleshooting",
    metaDescription: "Which NIIMBOT B-Series printer is best for your small business? Compare the B1, B21, B3S, and B4 desktop models and learn how to troubleshoot paper jams.",
    excerpt: "The B-Series is designed for small business barcodes, clothing tags, and wide-format labels. Learn how to fix a B21 not printing and choose the right model.",
    errorCode: null,
    tags: 'niimbot b21 not printing, niimbot b1 vs b21 comparison, niimbot b3s error fix, niimbot b4 desktop printer troubleshooting',
    wordCount: 1150,
    difficultyLevel: 'Intermediate',
    timeToFix: 'N/A',
    categoryId: setupCategory,
    authorId: authors.david,
    reviewerId: authors.marcus,
    featuredSnippet: "NIIMBOT B-Series Comparison: 1) NIIMBOT B1 vs B21: Both print on 50mm (2-inch) wide labels, perfect for retail barcodes and price tags. The B21 features a retro, typewriter-style design with a heavy metal aesthetic, while the B1 is a modern, rugged, utilitarian plastic block. They share the same print engine. 2) NIIMBOT B3S: A massive upgrade that prints up to 75mm (3-inch) wide labels, featuring an LCD screen for battery status. 3) NIIMBOT B4: A desktop shipping label printer supporting 4x6 labels, unlike the portable battery-powered models.",
    content: `<h2>Choosing a NIIMBOT for Small Business (B-Series)</h2>
<p>While the D-series is for home pantries, the <strong>B-Series</strong> supports much wider 2-inch and 3-inch die-cut labels, making it the go-to for retail stores, bakeries, and clothing boutiques.</p>

<h3>NIIMBOT B1 vs B21</h3>
<p>These two printers are functionally identical. They both print at 203 DPI, they both max out at 50mm (2 inches) wide, and they both use the same RFID paper rolls.</p>
<ul>
  <li><strong>The B21:</strong> Focuses heavily on aesthetics. It has a beautiful retro design with a chrome lever to open the paper bay. It looks great sitting on the front counter of a boutique.</li>
  <li><strong>The B1:</strong> Focuses on durability. It is a rugged, square plastic block. It is better suited for a warehouse or back-office where it might get dropped.</li>
</ul>

<h3>The Wider Options: B3S and B4</h3>
<ul>
  <li><strong>NIIMBOT B3S:</strong> Expands the print width to 75mm (roughly 3 inches). It also adds an LCD screen to monitor battery life and connection status without needing to check the app. Ideal for ingredient labels.</li>
  <li><strong>NIIMBOT B4:</strong> This is not a portable pocket printer. It is a heavy desktop thermal printer designed to print 4x6 inch shipping labels for Shopify/Amazon fulfillment.</li>
</ul>

<h2>Fixing the B21 & B3S Not Printing</h2>
<p>If your B21 connects but refuses to print, or the B3S throws a "Paper Error":</p>
<ol>
  <li><strong>Loose Baffles:</strong> Inside the paper compartment are adjustable sliding guides (baffles). If these are not pushed firmly against the sides of the label roll, the paper will drift diagonally and blind the optical sensor.</li>
  <li><strong>RFID Error:</strong> Ensure the paper roll has an RFID sticker on the core. The B21 is extremely strict about rejecting third-party paper.</li>
</ol>`
  },
  {
    title: "NIIMBOT Model Comparison: M2 vs M3, K2 vs K3 & C1 Tube Printer",
    slug: 'niimbot-model-comparison-m2-m3-k2-k3-c1-tube',
    seoTitle: "NIIMBOT M2, M3, K2, K3 & C1 Tube Printer Comparison",
    metaDescription: "Exploring NIIMBOT's niche and specialty label makers. Compare the M2 vs M3, the K2 vs K3, and learn how to set up the C1 wire/tube printer for electricians.",
    excerpt: "Beyond basic labels, NIIMBOT offers specialty printers for industrial wire marking and high-resolution commercial printing. Here is our guide to the M, K, and C series.",
    errorCode: null,
    tags: 'niimbot m2 vs m3 difference, niimbot c1 tube printer setup, niimbot k2 vs k3 comparison, niimbot which model to buy comparison',
    wordCount: 1000,
    difficultyLevel: 'Intermediate',
    timeToFix: 'N/A',
    categoryId: setupCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "NIIMBOT Specialty Printer Comparison: 1) NIIMBOT M2 vs M3: The M-series offers high-end 300 DPI resolution (compared to the standard 203 DPI). The M2 prints up to 50mm wide, while the M3 prints up to 75mm wide. They are ideal for high-density, tiny barcodes. 2) NIIMBOT K2 vs K3: The K-series are desktop models designed with full QWERTY physical keyboards, allowing you to print labels without needing a smartphone app. 3) NIIMBOT C1 Tube Printer: An industrial tool for electricians that prints directly onto heat-shrink tubing and PVC wire sleeves for server rack management.",
    content: `<h2>Navigating NIIMBOT's Specialty Printers</h2>
<p>If the D-Series and B-Series don't fit your needs, NIIMBOT produces several niche models for specific industrial or commercial use cases.</p>

<h3>M-Series: High Resolution (300 DPI)</h3>
<p>Most thermal printers operate at 203 DPI (Dots Per Inch). If you are printing a microscopic QR code for a jewelry tag, 203 DPI can look pixelated and fail to scan.</p>
<ul>
  <li><strong>NIIMBOT M2:</strong> Supports 50mm paper but uses a 300 DPI printhead for razor-sharp text and graphics.</li>
  <li><strong>NIIMBOT M3:</strong> Supports 75mm paper at 300 DPI.</li>
</ul>

<h3>K-Series: The Standalone Labelers</h3>
<p>In many corporate or hospital environments, employees are not allowed to use their personal smartphones to download third-party apps for Bluetooth pairing.</p>
<ul>
  <li><strong>NIIMBOT K2 and K3:</strong> These feature full, physical QWERTY keyboards and small LCD screens built directly into the device. You type your label directly on the machine and hit print, bypassing the need for a phone completely.</li>
</ul>

<h3>C-Series: The C1 Tube Printer (Electricians)</h3>
<p>The <strong>NIIMBOT C1</strong> is not a standard paper sticker printer. It is a heavy-duty industrial tool used by electricians, IT networking professionals, and HVAC technicians.</p>
<ol>
  <li>It prints directly onto PVC tubing, heat-shrink tubes, and heavy-duty cable wraps.</li>
  <li><strong>Setup:</strong> You must feed the PVC tube through the specialized front guide slots. The internal cutter will automatically perform a "half-cut" so you can print 50 wire labels in a row and easily snap them apart on the job site.</li>
</ol>`
  }
];

async function main() {
  const brandSlug = 'niimbot';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 2 (Cluster C: Model-Specific) for brand: ${brand.name}`);

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
