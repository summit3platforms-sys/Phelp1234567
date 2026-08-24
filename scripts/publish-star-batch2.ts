import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';
const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "How to Print a Star Micronics Self-Test & Diagnostic Page",
    slug: 'how-to-print-star-micronics-self-test-diagnostic-page',
    seoTitle: "How to Print a Star Micronics Self-Test Page & Find IP",
    metaDescription: "Learn how to use the feed button to print a Star Micronics hardware self-test page. Check your printer's firmware version, IP address, and test internet connectivity.",
    excerpt: "Before troubleshooting POS software, print a hardware self-test page to confirm the printer's thermal head is working and to retrieve its IP address.",
    errorCode: null,
    tags: 'star micronics printer self test page, star micronics feed button diagnostic print, star micronics printer network configuration sheet, star micronics firmware version how to check, star micronics printer wont connect to internet test',
    wordCount: 900,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: softwareCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredSnippet: "To print a self-test page on a Star Micronics printer: 1) Turn the printer's power switch OFF. 2) Press and hold the FEED button on the front of the printer. 3) While continuing to hold the FEED button, turn the power switch back ON. 4) Release the FEED button as soon as the printer begins printing. The printer will print two receipts. The first is a hardware diagnostic showing the Firmware Version and checking the thermal printhead. The second is the Network Configuration sheet, which will display the printer's IP address and MAC address.",
    content: `<h2>Why You Need the Self-Test Page</h2>
<p>If your iPad POS system suddenly cannot find your Star Micronics printer, the very first step in troubleshooting is printing the <strong>Self-Test Page</strong> (often called the Network Configuration Sheet). This physically proves that the printer's mechanical components are working, and it gives you the exact IP address the printer is currently using on your network.</p>

<h3>The "Feed Button" Trick</h3>
<ol>
  <li>Ensure the printer has plenty of thermal paper loaded and the cover is closed.</li>
  <li>Turn the printer <strong>OFF</strong> using the switch on the side.</li>
  <li>Press and hold down the <strong>FEED</strong> button on the front panel.</li>
  <li>While holding FEED, turn the printer <strong>ON</strong>.</li>
  <li>Release the FEED button once the gears start turning.</li>
</ol>

<h2>Reading the Diagnostic Sheets</h2>
<p>The printer will usually output two long receipts (with a slight pause in between). Do not pull the first receipt immediately; wait for it to finish.</p>
<ul>
  <li><strong>Hardware Sheet (1st Page):</strong> This page tests the thermal head by printing a block of text. It also displays the <strong>Firmware Version</strong>. If your POS provider says your printer needs a firmware update, check this number against their requirements.</li>
  <li><strong>Network Sheet (2nd Page):</strong> Look for the section labeled <strong>IP Address</strong> (e.g., 192.168.1.102). If the IP Address says <code>0.0.0.0</code>, the printer is failing the "Connect to Internet Test." It is not receiving an IP address from your router. You either have a bad ethernet cable, or the router's DHCP server is turned off.</li>
</ul>`
  },
  {
    title: "Star Micronics TSP143 Series: III vs IV, WiFi & Ethernet Setup",
    slug: 'star-micronics-tsp143-series-iii-vs-iv-wifi-ethernet-setup',
    seoTitle: "Star Micronics TSP143 III vs IV: WiFi & Ethernet Setup",
    metaDescription: "Comparing the Star Micronics TSP100 / TSP143 series. What is the difference between TSP143III and TSP143IV? Learn how to set up the WiFi, LAN, and USB models.",
    excerpt: "The TSP143 is the industry standard POS receipt printer. We break down the complicated model numbers (IIIW, IIILAN, IVUE) and explain how to set them up.",
    errorCode: null,
    tags: 'star micronics tsp143 iii vs iv difference, star micronics tsp143iiiw wifi setup, star micronics tsp143iiilan ethernet setup, star micronics tsp143ivue not printing',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: setupCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    featuredSnippet: "Star Micronics TSP143 III vs IV Difference: The TSP143III is the classic older generation. It had separate, distinct models for each connection type (e.g., TSP143IIILAN for Ethernet only, TSP143IIIW for WiFi only). The new TSP143IV is a massive upgrade because it is 'multi-interface.' The TSP143IVUE model includes both a standard USB port for a PC AND an Ethernet LAN port for network/cloud printing, eliminating the need to buy different models. It is also 20% smaller and prints significantly faster.",
    content: `<h2>Understanding TSP143 Model Suffixes</h2>
<p>Star Micronics uses letters at the end of their model names to dictate how the printer connects. Buying the wrong model means it won't work with your iPad POS.</p>
<ul>
  <li><strong>TSP143IIIU (USB):</strong> Connects directly to a Windows/Mac PC via a standard USB cable, OR can connect directly to an iPad using an Apple Lightning cable.</li>
  <li><strong>TSP143IIILAN (Ethernet):</strong> Plugs directly into your internet router via an Ethernet cable. Best for Square/Shopify on iPads where Wi-Fi drops are a concern.</li>
  <li><strong>TSP143IIIW (Wi-Fi):</strong> Connects wirelessly to your router.</li>
  <li><strong>TSP143IIIBI (Bluetooth):</strong> Pairs directly to a single tablet via Bluetooth.</li>
</ul>

<h2>TSP143IIIW WiFi Setup (WPS Method)</h2>
<p>Setting up the wireless model without a screen can be tricky. The easiest method is using WPS (Wi-Fi Protected Setup).</p>
<ol>
  <li>Ensure your internet router has a physical "WPS" button on the back.</li>
  <li>Turn the printer ON.</li>
  <li>Press and hold the red <strong>PAIR</strong> button on the back of the printer until the blue Ready light starts blinking.</li>
  <li>Walk over to your router and press the <strong>WPS</strong> button.</li>
  <li>Wait 60 seconds. The printer will print a network sheet showing its new IP address, and the blue light will turn solid.</li>
</ol>

<h2>Fixing the TSP143IVUE Not Printing</h2>
<p>The new TSP143IVUE features "AOA" (Android Open Accessory) and standard USB. If it is not printing from your PC, ensure you have downloaded the <strong>StarPRNT V7.0</strong> (or newer) driver utility. Older V6.0 drivers designed for the TSP143III will not recognize the new IV generation logic board.</p>`
  },
  {
    title: "Star Micronics Bluetooth & Kitchen Setup: mc-Print3, SM-L200 & SM-T300i",
    slug: 'star-micronics-bluetooth-kitchen-setup-mc-print3-sm-l200-sm-t300i',
    seoTitle: "Star Micronics mc-Print3, SM-L200 & Kitchen Printer Setup",
    metaDescription: "Setup guides for Star Micronics specialty printers. Learn how to pair the SM-L200 and SM-T300i mobile printers, and set up the mc-Print3 or SP700 for kitchen tickets.",
    excerpt: "From mobile Bluetooth belt-clip printers to heavy-duty impact kitchen printers, learn how to configure Star Micronics specialty hardware.",
    errorCode: null,
    tags: 'star micronics tsp143iiibi2 bluetooth pairing, star micronics mc-print3 setup guide, star micronics sm-l200 mobile printer setup, star micronics sm-t300i setup, star micronics kitchen printer setup',
    wordCount: 1150,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: setupCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "To pair a Star Micronics Bluetooth printer (TSP143IIIBi2, SM-L200, SM-T300i): 1) Turn the printer ON. 2) Press and hold the PAIR button on the back (or hold the Power/Mode button on mobile units) for 5 seconds until the green LED flashes. 3) Open your iPad or Android Bluetooth Settings. Tap the printer name (e.g., 'Star Micronics') to pair. NOTE for SM-L200: It uses Bluetooth Low Energy (BLE). Do NOT pair it in your iPad's Bluetooth settings. Instead, open your POS App (like Square), go to Hardware > Printers, and pair it directly inside the app.",
    content: `<h2>The mC-Print3 (mCP31) Setup Guide</h2>
<p>The <strong>mC-Print3</strong> is Star's modern, cubic, front-exit printer. It is highly popular in sleek cafes and boutiques because it hides all cables inside the chassis.</p>
<ul>
  <li><strong>Front Exit Advantage:</strong> Because the paper shoots out the front (not the top), the mC-Print3 is highly resistant to water spills and falling debris, making it excellent for food-prep areas.</li>
  <li><strong>Setup:</strong> The mCP31L model includes Ethernet, USB, and Lightning. Simply plug your iPad directly into the "iPad 2.4A" USB port on the back. The printer will charge the iPad while simultaneously receiving print data over the cable (a massive upgrade over unreliable Wi-Fi).</li>
</ul>

<h2>Mobile Bluetooth Printers: SM-L200 & SM-T300i</h2>
<p>If you run a food truck or do tableside ordering, you need a battery-powered mobile printer.</p>
<ul>
  <li><strong>SM-T300i (Heavy Duty):</strong> This uses classic Bluetooth. You must go to your iPad's Settings &gt; Bluetooth to pair it. It requires Apple MFi certification to work with iOS.</li>
  <li><strong>SM-L200 (BLE):</strong> This uses Bluetooth Low Energy. It does not require Apple MFi pairing. If you try to pair it in the iPad's main Bluetooth menu, it will fail or say "Not Supported." You must open your POS software (like Square or Shopify) and pair the printer directly from the app's hardware settings.</li>
</ul>

<h2>Kitchen Printer Setup (Impact vs Thermal)</h2>
<p>A standard thermal receipt printer (like the TSP143) uses heat to print. <strong>Do not use a thermal printer as a Kitchen ticket printer.</strong> If placed near a hot grill or heat lamps, the entire thermal receipt will turn black, destroying the order.</p>
<p>For kitchen setup, you must purchase the <strong>Star Micronics SP700</strong> (or SP742). This is an <em>Impact Printer</em>. It uses a physical ink ribbon (red and black) to smash ink into standard bond paper, which is completely immune to heat. It is incredibly loud, which is actually a feature, as chefs can hear the orders coming in over the noise of the kitchen.</p>`
  }
];

async function main() {
  const brandSlug = 'star-micronics';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 2 (Clusters C & D: Diagnostics & Models) for brand: ${brand.name}`);

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
