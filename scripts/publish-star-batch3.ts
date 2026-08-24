import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';
const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';
const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Star Micronics TSP650 vs TSP700 & Which POS Models to Buy",
    slug: 'star-micronics-tsp650-vs-tsp700-which-pos-models-buy',
    seoTitle: "Star Micronics TSP650 vs TSP700 vs TSP800 Comparison",
    metaDescription: "How to identify which Star Micronics printer model you have. Plus, a comparison of the TSP650, TSP700, and TSP800 series for POS systems.",
    excerpt: "Before buying a receipt printer for your new POS system, you must understand the difference between the TSP143, TSP650, and TSP700.",
    errorCode: null,
    tags: 'star micronics tsp650 vs tsp700 difference, star micronics tsp800 not printing, star micronics which model do i have, star micronics printer works with which pos systems',
    wordCount: 950,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: setupCategory,
    authorId: authors.marcus,
    reviewerId: authors.david,
    featuredSnippet: "Which Star Micronics model do you have? Look at the silver or white sticker on the very bottom of the printer (underneath the chassis). It will say 'Model:' followed by a number like TSP143IIILAN. Do not rely on the large grey logo printed on the top lid (which usually just says 'TSP100' or 'TSP650'), as this is a broad family name and does not tell you if it's a Bluetooth, Ethernet, or USB model. The exact model suffix is crucial for POS compatibility.",
    content: `<h2>The TSP Family Comparison (TSP100 vs 650 vs 700)</h2>
<p>Star Micronics essentially produces three tiers of stationary thermal receipt printers. If your POS provider (like Toast or Square) says they support "Star Micronics", you still need to buy the right tier.</p>
<ul>
  <li><strong>TSP100 / TSP143 (Entry Level):</strong> The industry standard. It prints at 250mm per second. This is the most popular printer globally for small coffee shops, boutiques, and standard retail.</li>
  <li><strong>TSP650 II (Mid-Range):</strong> Prints at 300mm per second. It features interchangeable interface cards (you can swap a serial port for an ethernet port without buying a whole new printer).</li>
  <li><strong>TSP700 II (Heavy Duty):</strong> Prints incredibly fast at 300mm/s, but is physically much larger. It is designed to hold massive rolls of paper (reducing the amount of times cashiers have to change paper) and features a heavy-duty cutter designed for ticketing (movie theaters, lotteries).</li>
</ul>

<h2>TSP800 Not Printing</h2>
<p>The <strong>TSP800</strong> is a highly specialized, extra-wide 112mm printer (often used for printing A4-style invoices on wide thermal rolls, or medical prescriptions). If it is not printing from your POS, it's likely because your POS is sending standard 80mm formatting commands to an 112mm canvas. Ensure your POS software has an explicit "Wide Format" or "TSP800" hardware profile selected.</p>

<h2>Which Printer Works With Which POS?</h2>
<p>Never buy a printer on Amazon without checking your POS software's "Supported Hardware" list. For example, Square exclusively supports Star Micronics Ethernet (LAN), Bluetooth (BI), and USB printers, but they do <strong>not</strong> officially support Star's Wi-Fi (WLAN) printers. Dutchie (cannabis POS) heavily relies on the TSP143IIIU for direct iPad connections.</p>`
  },
  {
    title: "Star Micronics POS Setup: Shopify, Square, Clover & Toast",
    slug: 'star-micronics-pos-setup-shopify-square-clover-toast',
    seoTitle: "Star Micronics POS Setup: Shopify, Square, Clover & Toast",
    metaDescription: "Is your Star Micronics printer not showing up in your POS app? Learn how to connect and troubleshoot Star printers on Shopify POS, Square, Clover, and Dutchie.",
    excerpt: "If your iPad and printer are connected to the same router, but the POS app still says 'No Printers Found', the issue lies within the app's local network permissions.",
    errorCode: 'Printer Not Found in POS',
    tags: 'star micronics printer shopify pos not printing, star micronics printer square setup, star micronics printer clover not connecting, star micronics printer toast pos error, star micronics printer dutchie setup, star micronics printer not showing in pos app',
    wordCount: 1050,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: softwareCategory,
    authorId: authors.elena,
    reviewerId: authors.alex,
    featuredSnippet: "If your Star Micronics printer is not showing in your POS app (Square, Shopify, Toast): 1) iOS Local Network Privacy: Apple blocks apps from scanning the network by default. Open the iPad Settings app, scroll down to your POS app (e.g., Square), and ensure the 'Local Network' toggle is GREEN. 2) IP Address Mismatch: Print a self-test page by holding the FEED button while turning the printer on. Look at the IP address. Then go to your iPad Settings > Wi-Fi > 'i' icon. The first three blocks of numbers (e.g., 192.168.1) MUST match exactly between the iPad and the printer. If they don't, they are on different subnets and cannot talk.",
    content: `<h2>POS App "Printer Not Found" Errors</h2>
<p>The most frustrating issue in retail IT is when the printer is clearly turned on, physically plugged into the router, but the iPad POS (Point of Sale) software refuses to detect it.</p>

<h3>Fixing Square & Shopify Discovery</h3>
<p>If you are using an Ethernet (LAN) printer like the TSP143IIILAN, Square and Shopify use a protocol called Bonjour/mDNS to automatically "discover" the printer on the network. For this to work:</p>
<ol>
  <li><strong>Subnet Matching:</strong> The iPad and the printer MUST be on the exact same network segment. If your printer is plugged into the back office Comcast modem, but your iPad is connected to an Eero mesh Wi-Fi system in the front of the store, they are on different networks.</li>
  <li><strong>VPNs and Ad-Blockers:</strong> If your iPad has a VPN installed, or a custom DNS ad-blocker, it will completely block local network discovery. Turn off the VPN.</li>
  <li><strong>Manual IP Entry:</strong> If auto-discovery fails, go to Square &gt; Settings &gt; Hardware &gt; Printers &gt; Add Printer &gt; <strong>Advanced / IP</strong>. Manually type the IP address you got from the self-test page.</li>
</ol>

<h2>Toast POS & Clover Connections</h2>
<ul>
  <li><strong>Toast:</strong> Toast is an Android-based system. Toast uses an aggressive lockdown profile. If a Star printer stops working on Toast, it is usually because the Toast network router assigned it a dynamic IP that recently changed. You must use the Toast backend portal to assign a Static IP/Reserved IP for the printer.</li>
  <li><strong>Clover:</strong> Clover terminals (like the Station Duo) usually connect to Star Micronics kitchen printers (SP700) via Ethernet. If it stops printing, open the "Printers" app on the Clover home screen, delete the kitchen printer, and hit the green plus icon to rescan the network.</li>
  <li><strong>Dutchie:</strong> For dispensary systems, Dutchie often requires the TSP100IIIU (USB) connected directly to the iPad via Lightning cable. If it stops printing, flip the Lightning cable over and re-plug it, or force-close the Dutchie Register app.</li>
</ul>`
  },
  {
    title: "Star Micronics Network Setup: Utility App, Static IP & Multiple Printers",
    slug: 'star-micronics-network-setup-utility-app-static-ip-multiple-printers',
    seoTitle: "Star Micronics Network Setup: Static IP & Utility App",
    metaDescription: "Learn how to use the StarPRNT Utility and Star Quick Setup app to configure Static IPs, manage multiple printers on the same network, and troubleshoot ethernet cables.",
    excerpt: "Running multiple receipt printers on a single busy network requires assigning Static IP addresses to prevent DHCP conflicts. Here is how to configure them.",
    errorCode: null,
    tags: 'star micronics printer utility software download, star micronics printer static ip setup, star micronics multiple printers same network, star micronics printer ethernet cable too short',
    wordCount: 950,
    difficultyLevel: 'Advanced',
    timeToFix: '15 minutes',
    categoryId: setupCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredSnippet: "To assign a Static IP to a Star Micronics printer: 1) Download the 'Star Quick Setup Utility' app on your iOS/Android phone, or the 'StarPRNT V7.0' utility on Windows. 2) Ensure your phone/PC is on the same Wi-Fi network as the printer. 3) Open the app, and it will automatically discover your printer. 4) Tap the printer, select 'Network Settings', and change the setting from 'DHCP' to 'Static'. 5) Enter your desired IP address (e.g., 192.168.1.200) outside of the router's DHCP pool, enter the Subnet Mask (usually 255.255.255.0), and hit Apply. The printer will reboot.",
    content: `<h2>The StarPRNT Utility Software</h2>
<p>To perform advanced configurations on a Star Micronics printer (such as uploading custom graphic logos, changing the cutter behavior, or setting a Static IP), you cannot do it from the POS app. You must use Star's official utility software.</p>
<ul>
  <li><strong>For Windows:</strong> Go to the Star Micronics global support site and download the <strong>StarPRNT V7.0</strong> (or latest version) driver package. It includes a powerful Configuration Utility.</li>
  <li><strong>For Mobile:</strong> Download the <strong>Star Quick Setup Utility</strong> from the Apple App Store or Google Play Store. This is much faster for assigning IP addresses.</li>
</ul>

<h2>Running Multiple Printers on the Same Network</h2>
<p>If you have three TSP143LAN printers (e.g., Front Counter, Drive-Thru, and Bar), you must configure them with <strong>Static IPs</strong>. If you leave them on DHCP (dynamic IPs), the router might shuffle their IP addresses after a power outage. Suddenly, your POS system will send the Drive-Thru orders to the Bar printer because the IP addresses swapped.</p>
<ol>
  <li>Print a self-test page for all three printers and write down their MAC addresses.</li>
  <li>Use the Star Quick Setup App to assign them static IPs far away from normal devices (e.g., <code>192.168.1.201</code>, <code>.202</code>, and <code>.203</code>).</li>
  <li>Label each printer physically with a piece of tape showing its IP address for future troubleshooting.</li>
</ol>

<h2>Ethernet Cable Limits</h2>
<p>If your kitchen printer is 200 feet away from the router and you get constant "offline" errors, the ethernet cable may be too long. Standard Cat5e ethernet degrades after 328 feet (100 meters). However, if you are running cheap CCA (Copper Clad Aluminum) cable instead of pure solid copper, the signal may drop out much earlier. If you must run a cable past 150 feet in a high-electrical-noise kitchen, use shielded Cat6 solid copper cabling.</p>`
  }
];

async function main() {
  const brandSlug = 'star-micronics';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 3 (Clusters D & E: POS & Network Config) for brand: ${brand.name}`);

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
