import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';
const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Primera LX400 vs LX900 Comparison & LX2000 Error Codes",
    slug: 'primera-lx400-vs-lx900-comparison-lx2000-error-codes',
    seoTitle: "Primera LX400 vs LX900 Comparison & LX2000 Error Codes",
    metaDescription: "Comparing the Primera LX400 and LX900 label printers? Learn the differences in ink systems. Plus, how to decode and fix common LX2000 hardware error codes.",
    excerpt: "The LX400 and LX900 revolutionized short-run color label printing. Learn how they differ and how to troubleshoot the industrial LX2000's internal error codes.",
    errorCode: 'LX2000 Error Code',
    tags: 'Primera, LX400 vs LX900 Comparison, LX2000 Error Code, Color Label Printer, Tri-color Cartridge, Individual CMYK',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: setupCategory,
    authorId: authors.alex,
    reviewerId: authors.elena,
    featuredSnippet: "Primera LX400 vs LX900 Difference: 1) The LX400 is an entry-level desktop printer featuring a 4-inch max print width and a single tri-color (CMY) ink cartridge. If you run out of Cyan, you must replace the entire cartridge. 2) The LX900 is a faster, wider (8-inch) commercial printer featuring four individual CMYK high-capacity ink tanks, making it much more cost-effective for large production runs. Fixing LX2000 Error Codes: If the LX2000 LCD displays a generic hardware error code, reboot the printer. If the error persists, open the front door and inspect the vast internal ink tubing system for air bubbles or dried ink blockages.",
    content: `<h2>The Evolution of Primera Color Label Printers</h2>
<p>Primera Technology single-handedly created the "short-run color label" market. Before the LX series, businesses had to order 10,000 pre-printed flexo labels from a massive print house. The LX400 and LX900 brought professional photo-quality printing to the desktop.</p>

<h3>Primera LX400 (The Desktop Standard)</h3>
<ul>
  <li><strong>Print Width:</strong> Up to 4.25 inches.</li>
  <li><strong>Ink System:</strong> Uses a single, combined Tri-Color cartridge (Cyan, Magenta, Yellow). It uses a composite black (mixing all three colors) rather than a dedicated black ink tank.</li>
  <li><strong>Pros:</strong> Small footprint, extremely easy to maintain (changing the cartridge also changes the printhead).</li>
  <li><strong>Cons:</strong> High cost-per-label because you waste ink if you only print heavily in one color.</li>
</ul>

<h3>Primera LX900 (The Production Workhorse)</h3>
<ul>
  <li><strong>Print Width:</strong> Up to 8.25 inches.</li>
  <li><strong>Ink System:</strong> Uses a semi-permanent printhead with four individual, high-capacity CMYK ink tanks.</li>
  <li><strong>Pros:</strong> Fast print speeds, true deep black text (using the dedicated K tank), and much lower cost-per-label.</li>
  <li><strong>Cons:</strong> Requires more maintenance. If left unused for weeks, the separate printhead can clog.</li>
</ul>

<h2>Decoding Primera LX2000 Error Codes</h2>
<p>The <strong>LX2000</strong> is an industrial beast. Unlike the LX900 which moves the ink tanks back and forth on the carriage, the LX2000 features massive stationary ink tanks mounted in the front of the printer, which pump ink through long flexible tubes to the printhead.</p>
<ul>
  <li><strong>Error Code 0xXXXXXXXX (Hex Codes):</strong> The front LCD panel may display a fatal hex code. This usually indicates a pump failure or a carriage stall.</li>
  <li><strong>The Fix:</strong> Open the top cover. Ensure the flexible ink tubes are not kinked, twisted, or catching on the carriage mechanism.</li>
  <li><strong>Air in the Lines:</strong> If the tubes look empty or have massive air gaps, the printer has lost its vacuum prime. You must use the maintenance menu to run a "System Prime" to suck ink from the front tanks back into the printhead.</li>
</ul>`
  },
  {
    title: "Primera Setup Guide: LX610, Craft Beer, Small Business & Church Media",
    slug: 'primera-setup-guide-lx610-craft-beer-small-business-church-media',
    seoTitle: "Primera Setup Guide: Craft Beer, Small Business & LX610",
    metaDescription: "Setup guide for the Primera LX610 with built-in contour cutter. Plus, best practices for printing craft beer labels, church media CDs, and small business packaging.",
    excerpt: "From the revolutionary LX610 with a built-in die cutter to mass-producing church media on a Bravo publisher, here is how to deploy Primera tech in your business.",
    errorCode: null,
    tags: 'Primera, LX610 Setup Guide, Label Printer For Craft Beer Setup, Disc Publisher For Church Media, Color Label Printer Small Business Setup',
    wordCount: 1050,
    difficultyLevel: 'Beginner',
    timeToFix: '15 minutes',
    categoryId: setupCategory,
    authorId: authors.marcus,
    reviewerId: authors.david,
    featuredSnippet: "Setting up a Primera printer for a small business: 1) Craft Beer Labels: Use the Primera LX900 or LX2000 with synthetic Polypropylene (BOPP) glossy media. Standard paper labels will disintegrate in a cooler. You must also use Pigment ink (standard on LX2000) for waterproofing, rather than Dye ink. 2) Church Media: Use a Bravo SE disc publisher. Buy 'WaterShield' or glossy inkjet-printable CDs to prevent the ink from smudging when congregants touch the discs. 3) LX610 Setup: The LX610 features a built-in X/Y contour cutter. You must use PTCreate software to draw the digital cut-line around your artwork.",
    content: `<h2>Primera LX610: The Game Changer</h2>
<p>The <strong>Primera LX610</strong> is unique in the industry. It combines a high-resolution color inkjet printer with a <strong>digital contour die-cutter</strong>. Instead of buying pre-cut circles or squares, you load a continuous roll of blank sticker paper, print your design, and the printer physically cuts out any custom shape (stars, jagged logos, ovals) instantly.</p>

<h3>LX610 Setup Tips</h3>
<ol>
  <li><strong>PTCreate Pro:</strong> To utilize the contour cutter, you must use the included PTCreate software. Do not just hit "Print" from Microsoft Word.</li>
  <li><strong>The Cut Line:</strong> In PTCreate, you must define a specific vector path (the "Cut Line"). Ensure the cut line is placed on the dedicated Cut Layer, otherwise the printer will just print a black line instead of physically cutting it.</li>
  <li><strong>Blade Depth:</strong> The knife blade is adjustable. If it cuts entirely through the waxy backing paper (causing a massive jam), you must retract the blade slightly using the dial on the blade holder.</li>
</ol>

<h2>Craft Beer & Small Business Setup</h2>
<p>If you are a microbrewery, a hot sauce vendor, or a candle maker, the Primera LX series is the perfect fit. However, you must choose the right ink and media combination.</p>
<ul>
  <li><strong>The Condensation Problem:</strong> If you print a beautiful beer label on standard high-gloss paper using Dye ink, the label will bleed and melt the second the can sweats in a cooler.</li>
  <li><strong>The Solution:</strong> You must purchase <strong>BOPP (Biaxially Oriented Polypropylene)</strong> or Polyester label stock. Furthermore, you should use <strong>Pigment Ink</strong>. Pigment ink acts like liquid plastic, sitting on top of the media and drying completely waterproof.</li>
</ul>

<h2>Church Media & Disc Publishing</h2>
<p>Many churches use the Bravo SE or Bravo 4200 to mass-produce weekly sermon CDs or DVDs for elderly congregants or community outreach.</p>
<ul>
  <li><strong>Media Selection:</strong> Do not buy cheap, matte-white inkjet CDs. The ink will soak in and look faded. Purchase "Glossy White" or "WaterShield" inkjet-printable discs. They have a ceramic coating that makes the colors pop and prevents the ink from smudging on wet hands.</li>
  <li><strong>Template Setup:</strong> Keep your artwork simple. Do not place critical text over the inner 22mm clear hub, as the printer will not spray ink there.</li>
</ul>`
  }
];

async function main() {
  const brandSlug = 'primera-technology';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 4 (Cluster F: Model-Specific & Business Setup) for brand: ${brand.name}`);

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
