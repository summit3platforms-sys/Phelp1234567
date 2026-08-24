import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';
const paperCategory = '9a42c554-2b4f-47f8-887e-5996fb83cbad';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix Star Micronics WiFi Disconnecting, MAC Address & Offline Errors",
    slug: 'fix-star-micronics-wifi-disconnecting-mac-address-offline-errors',
    seoTitle: "Fix Star Micronics WiFi Disconnecting & Offline Errors",
    metaDescription: "Does your Star Micronics printer constantly go offline during rush hour? Learn how to fix Wi-Fi dropouts, find the printer's MAC address, and secure your POS connection.",
    excerpt: "A wireless receipt printer that constantly disconnects is a nightmare for a busy restaurant. Here is how to fix the TSP143IIIW Wi-Fi dropouts permanently.",
    errorCode: 'Printer Offline',
    tags: 'star micronics printer mac address find, star micronics printer wifi keeps disconnecting, star micronics printer offline pos system',
    wordCount: 1000,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: softwareCategory,
    authorId: authors.david,
    reviewerId: authors.elena,
    featuredSnippet: "To fix a Star Micronics Wi-Fi printer that keeps disconnecting: 1) Thermal printers possess extremely weak Wi-Fi antennas compared to a laptop. If the printer is next to a microwave or a metal refrigerator, the signal will drop. Move the router closer. 2) Band Steering Issue: The TSP143IIIW only supports 2.4GHz Wi-Fi. If your modern router uses 'Band Steering' (combining 5GHz and 2.4GHz into one network name), the router will aggressively try to force the printer onto the 5GHz band, causing it to crash and go offline. You must log into your router settings and split the 2.4GHz network into its own separate SSID.",
    content: `<h2>Why Your Star Printer Keeps Going Offline</h2>
<p>If your iPad POS system constantly displays a red "Printer Offline" banner during your busiest hours, the issue is almost always related to Wi-Fi stability.</p>

<h3>1. The 5GHz Band Steering Problem</h3>
<p>Modern mesh routers (like Eero, Google Nest, or Comcast gateways) combine both the 2.4GHz and 5GHz Wi-Fi bands into a single network name. They use "Band Steering" to automatically push devices to the faster 5GHz band.</p>
<ul>
  <li>The Star Micronics TSP143IIIW (and most POS hardware) only has a <strong>2.4GHz</strong> Wi-Fi chip.</li>
  <li>When the router tries to steer the printer to 5GHz, the printer gets confused, drops the connection, and goes offline.</li>
  <li><strong>The Fix:</strong> Log into your router's admin panel. Find the Wi-Fi settings and turn off Band Steering. Rename the 2.4GHz network to something distinct (e.g., "Cafe_Network_2G") and connect the printer exclusively to that network.</li>
</ul>

<h3>2. Finding the MAC Address for DHCP Reservations</h3>
<p>Another way to stabilize the connection is to reserve the printer's IP address on your router. To do this, your router needs the printer's MAC address.</p>
<ol>
  <li>Turn the printer off. Hold the FEED button, and turn it back on.</li>
  <li>The printer will print the Network Configuration Sheet.</li>
  <li>Look for the line that says <strong>MAC Address:</strong> (It will look like <code>00:11:62:XX:XX:XX</code>). Star Micronics MAC addresses almost always start with <code>00:11:62</code>.</li>
  <li>Enter this MAC address into your router's "DHCP Reservation" or "Static IP Assignment" table.</li>
</ol>`
  },
  {
    title: "Fix Star Micronics Printer Blank Receipts, Faded Print & Paper Errors",
    slug: 'fix-star-micronics-printer-blank-receipts-faded-print-paper-errors',
    seoTitle: "Fix Star Micronics Blank Receipts & Faded Thermal Print",
    metaDescription: "Is your Star Micronics printer printing blank receipts? Learn how to identify upside-down thermal paper, clean the printhead to fix faded text, and buy compatible rolls.",
    excerpt: "If your TSP143 is churning out perfectly sized, but completely blank receipts, the printer isn't broken—you loaded the paper upside down.",
    errorCode: 'Blank Print',
    tags: 'star micronics printer faded receipt print, star micronics thermal paper compatibility, star micronics printer prints blank receipt',
    wordCount: 900,
    difficultyLevel: 'Beginner',
    timeToFix: '2 minutes',
    categoryId: paperCategory,
    authorId: authors.elena,
    reviewerId: authors.alex,
    featuredSnippet: "To fix a Star Micronics printer that prints blank receipts: 1) Thermal printers do not use ink. They use heat-sensitive paper. The paper only has a chemical coating on ONE side. If you load the paper roll upside down, the ceramic printhead will apply heat to the uncoated back of the paper, resulting in a completely blank receipt. 2) Open the printer cover. Take the roll out and flip it over so the paper feeds from underneath the roll (not over the top), with the glossy/smooth side facing the front of the printer. Close the lid and hit the feed button.",
    content: `<h2>Why the Printer Prints Blank Receipts</h2>
<p>The most common support call for the Star Micronics TSP100 series is "the printer is going through the motions, but the paper comes out totally blank." This is almost never a hardware failure.</p>
<ul>
  <li><strong>Upside-Down Paper:</strong> Thermal paper is only chemically treated on the glossy side. If loaded upside down, the heat hits the matte paper backing, which does not react. Flip the roll over. The paper must pull from the bottom of the roll, up towards the ceiling.</li>
  <li><strong>Wrong Paper Type (Bond Paper):</strong> If you accidentally bought standard "Bond" receipt paper (designed for impact kitchen printers), it will never print in a thermal printer because it lacks the chemical coating. Scratch the paper with your fingernail; if it doesn't leave a dark black line, it is not thermal paper.</li>
</ul>

<h2>Fixing Faded or Ghosting Print</h2>
<p>If the text is printing, but it is extremely light, washed out, or missing vertical lines:</p>
<ol>
  <li><strong>Clean the Printhead:</strong> Open the cover. The thermal printhead is the thin black/green ceramic strip located under the cutting blade. Wipe it firmly with a Q-tip dipped in isopropyl alcohol. Do this when the printer is turned off and cooled down.</li>
  <li><strong>Check the Platen Roller:</strong> The thick black rubber roller attached to the lid pushes the paper against the printhead. If it is covered in sticky residue (from sticker labels), it won't apply enough pressure. Clean it with alcohol.</li>
</ol>

<h2>Star Micronics Thermal Paper Compatibility</h2>
<p>The standard TSP100/143/650 series requires <strong>3 1/8 inch (80mm) wide Thermal Receipt Paper</strong>. The roll diameter should not exceed 83mm. Do not buy paper wider than 80mm, as it will physically jam the chassis.</p>`
  }
];

async function main() {
  const brandSlug = 'star-micronics';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 4 (Clusters F & G: Offline & Paper) for brand: ${brand.name}`);

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
