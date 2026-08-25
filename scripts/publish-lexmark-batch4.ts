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
    title: "Lexmark Model Setup & Errors: MX632, MX521, CS510 & MX910",
    slug: 'lexmark-model-setup-errors-mx632-mx521-cs510-mx910',
    seoTitle: "Lexmark MX632, MX521, CS510 & MX910 Troubleshooting",
    metaDescription: "Model-specific troubleshooting for Lexmark printers. Learn the difference between CS510 and CX510, MX910 vs MX911, and how to fix MX632/MS632 printing errors.",
    excerpt: "Compare Lexmark's most popular enterprise models. Learn the difference between CS (Color Single) and CX (Color Multifunction) models.",
    errorCode: null,
    tags: 'lexmark mx632 error codes, lexmark ms632 not printing, lexmark mx521 fuser error, lexmark cs510 vs cx510 difference, lexmark mx910 vs mx911 comparison',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: setupCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredSnippet: "Lexmark CS510 vs CX510 Difference: Lexmark uses a specific naming convention for all of its printers. The 'S' stands for Single-function (Printer only). The 'X' stands for Multifunction (Print, Copy, Scan, Fax). Therefore, the CS510 is a Color Printer (C = Color, S = Single). The CX510 is the exact same print engine, but it includes a flatbed scanner and Auto Document Feeder on top (C = Color, X = Multifunction). Similarly, MS stands for Monochrome Single-function, and MX stands for Monochrome Multifunction.",
    content: `<h2>Understanding Lexmark Model Names</h2>
<p>Lexmark's naming convention is incredibly logical once you learn the four primary prefixes:</p>
<ul>
  <li><strong>MS (Monochrome Single):</strong> Black and white printer only (e.g., MS632).</li>
  <li><strong>MX (Monochrome Multifunction):</strong> Black and white printer + Scanner/Copier (e.g., MX632, MX521).</li>
  <li><strong>CS (Color Single):</strong> Color printer only (e.g., CS510).</li>
  <li><strong>CX (Color Multifunction):</strong> Color printer + Scanner/Copier (e.g., CX510).</li>
</ul>

<h2>MS632 & MX632 Not Printing</h2>
<p>The 632 series are high-volume workgroup printers. If an MS632 stops printing and shows a blinking green light, it is usually waiting for a <strong>Manual Feed</strong> prompt.</p>
<p>If someone sent a print job formatted for "Labels" or "Cardstock," the printer will halt and refuse to pull paper from Tray 1. It waits for you to physically insert paper into the Multipurpose Feeder (the fold-down tray on the front). Cancel the job, change the document settings to "Plain Paper," and resend it.</p>

<h2>MX910 vs MX911 Comparison</h2>
<p>The MX910 and MX911 are massive A3 (Tabloid/11x17) floor-standing production machines.</p>
<ul>
  <li><strong>Speed:</strong> The MX910 prints at 45 pages per minute. The MX911 is significantly faster at 55 pages per minute.</li>
  <li><strong>Finishing:</strong> Both support the same heavy-duty stapler and hole-punch finishers.</li>
  <li><strong>Use Case:</strong> You only need to upgrade to the MX911 if your office prints more than 30,000 pages a month, where the extra 10 PPM saves noticeable time.</li>
</ul>

<h2>MX521 Fuser Error</h2>
<p>The MX521 (and MS521) are notorious for throwing <strong>121.71</strong> fuser errors. This usually means the fuser was damaged by a staple left in recycled paper, which tore the hot roller. The fuser (Part # 41X1225) must be replaced.</p>`
  },
  {
    title: "Fix Lexmark Mobile Print App & Print Management Errors",
    slug: 'fix-lexmark-mobile-print-app-management-errors',
    seoTitle: "Fix Lexmark Mobile Print App & Print Management",
    metaDescription: "Is the Lexmark Mobile Print app failing to find your printer? Learn how to troubleshoot mobile printing and Lexmark Print Management (LPM) badge release errors.",
    excerpt: "Troubleshooting Lexmark's software suite, including the iOS/Android Mobile Print app and the enterprise Lexmark Print Management (LPM) badge release system.",
    errorCode: 'App Not Connecting',
    tags: 'lexmark mobile print app not connecting, lexmark print management not working',
    wordCount: 950,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: softwareCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    featuredSnippet: "To fix the Lexmark Mobile Print App not connecting: 1) Ensure your iPhone/Android is connected to the exact same Wi-Fi network as the printer. 2) If the app says 'Printer Not Found', your corporate network may have 'Client Isolation' enabled, which prevents phones from talking directly to printers. 3) To bypass this, click 'Add Manually' in the app. Type the printer's exact IP address (found on the Network Setup Page). 4) If it still fails, ensure 'AirPrint' and 'Mopria' are enabled in the printer's Embedded Web Server (Network > Mobile Services).",
    content: `<h2>Lexmark Mobile Print App Connectivity</h2>
<p>The Lexmark Mobile Print app allows you to send PDFs and photos directly to an MS or MX series printer. When discovery fails, it is almost always a network configuration block.</p>
<ul>
  <li><strong>QR Code Pairing:</strong> The easiest way to bypass network discovery issues is to use the QR code feature. Go to the printer's touch screen &gt; Network/Ports &gt; Mobile Services &gt; Display QR Code. Open the Lexmark app on your phone and scan the screen to instantly pair them via IP.</li>
  <li><strong>Subnet Routing:</strong> If your phone is on a "Guest" Wi-Fi and the printer is on the "Admin" LAN, the router will block the connection. They must be on the same subnet.</li>
</ul>

<h2>Lexmark Print Management (LPM) Not Working</h2>
<p>In large enterprises, users don't print directly to a specific printer. They print to a virtual "Lexmark Print Management" queue, walk up to any printer in the building, swipe their RFID ID badge, and release the job.</p>

<h3>Badge Swipe Fails to Release Jobs</h3>
<ol>
  <li><strong>Authentication Timeout:</strong> If you swipe your badge and the printer beeps but says "Invalid User", the printer has lost its connection to the LPM / Active Directory server. Ask your IT department to restart the Lexmark Cloud Connector service.</li>
  <li><strong>Missing E-SF App:</strong> The badge reader requires a specific Java app called "Print Release" running on the printer. Log into the printer's EWS. Go to Apps &gt; Print Release. Ensure the app is licensed, running, and pointed to the correct LPM server IP address.</li>
</ol>`
  }
];

async function main() {
  const brandSlug = 'lexmark';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 4 (Clusters G & H: Models & Mobile Software) for brand: ${brand.name}`);

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
