import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const qualityCategory = 'e3d26347-33bf-41a7-9cbf-c3d821850f98';
const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix Pantum Blank Spots, Faded Print & Charging Roller Damage",
    slug: 'fix-pantum-blank-spots-faded-print-charging-roller-damage',
    seoTitle: "Fix Pantum Periodic Blank Spots & Charging Roller Issues",
    metaDescription: "Is your Pantum printer fading on one side or leaving periodic blank spots on the page? Learn how to identify charging roller damage and fix faded laser prints.",
    excerpt: "Periodic blank spots and fading on one side of the page are classic signs of a damaged primary charging roller inside the Pantum drum unit.",
    errorCode: null,
    tags: 'pantum periodic blank spots print, pantum charging roller damage print quality, pantum print quality troubleshooting guide, pantum faded print one side',
    wordCount: 950,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: qualityCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix Pantum faded print or periodic blank spots: 1) Fading entirely on one side usually means the toner powder inside the cartridge has clumped to one side due to static. Take the cartridge out and rock it side-to-side 5 times to level the powder. 2) If you see perfectly spaced blank circles running down the page, your Primary Charging Roller (PCR) is damaged. The PCR is the thin, spongy black roller resting against the drum cylinder. If it gets nicked by a paperclip or a staple on a jammed page, it cannot charge the drum in that specific spot, resulting in a repeating blank hole on your printout. You must replace the drum unit.",
    content: `<h2>Troubleshooting Pantum Print Quality</h2>
<p>Because Pantum printers are heavily utilized in budget-conscious small businesses, print quality degradation is often tied to maximizing the lifespan of a single toner cartridge. However, certain defects require hardware replacement rather than toner refills.</p>

<h3>Fading on One Side</h3>
<p>If the left side of your document is pitch black, but the text on the right side fades to a light gray, the toner hopper is physically imbalanced. Over time, the internal agitator may push toner to one side, or the printer might be sitting on an uneven desk. Remove the cartridge, hold it level, and gently rock it side to side. Also, ensure your printer sits on a perfectly flat surface.</p>

<h3>Periodic Blank Spots & Charging Roller Damage</h3>
<p>Laser printers use a <strong>Primary Charging Roller (PCR)</strong> to apply a uniform blanket of negative electrical charge to the imaging drum. If the PCR is damaged, you will see highly specific defects:</p>
<ul>
  <li>Take a ruler and measure the exact distance between the blank spots running down the page.</li>
  <li>If the spots are exactly <strong>38mm</strong> apart (the circumference of the Pantum PCR), the roller has a gouge in it. This happens when someone uses a sharp tool (like scissors or a letter opener) to pry a jammed piece of paper out of the printer, scratching the spongy roller.</li>
  <li>You cannot repair a gouged PCR. You must purchase a new drum unit (or an all-in-one cartridge, depending on your model).</li>
</ul>`
  },
  {
    title: "Fix Pantum Streaky Lines, Drum Marks & Heavy Paper Settings",
    slug: 'fix-pantum-streaky-lines-drum-marks-heavy-paper',
    seoTitle: "Fix Pantum Streaky Lines, Drum Marks & Light Print",
    metaDescription: "Does your Pantum printer leave streaky black lines or repeating drum marks on the page? Learn how to fix transfer belt contamination and adjust heavy paper settings.",
    excerpt: "Black streaks, repeating toner marks, and light print on cardstock can all be fixed by cleaning the imaging drum and adjusting the fuser heat settings.",
    errorCode: null,
    tags: 'pantum transfer belt skin oil contamination, pantum printer light print heavy paper setting, pantum drum periodic marks fix, pantum printer streaky lines',
    wordCount: 1000,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: qualityCategory,
    authorId: authors.alex,
    reviewerId: authors.elena,
    featuredSnippet: "To fix Pantum streaky lines and drum marks: 1) Measure the distance between repeating black marks. If the marks are roughly 75mm apart, the large green Imaging Drum cylinder has a smudge on it. 2) Remove the drum unit. WARNING: Never touch the shiny green cylinder with your bare hands. Skin oils permanently destroy the drum's ability to hold a charge, resulting in permanent black thumbprints on every page. 3) Gently wipe the drum with a dry, lint-free microfiber cloth. If there is a stubborn speck of toner, use a tiny drop of 99% isopropyl alcohol on a Q-tip. Do not expose the drum to direct room light for more than 2 minutes.",
    content: `<h2>Diagnosing Pantum Streaky Lines</h2>
<p>If your printouts have vertical black streaks running the entire length of the page, the "Wiper Blade" inside the toner cartridge has failed. The wiper blade's job is to scrape leftover toner off the drum after each rotation. If it wears out, that excess toner gets dragged down the next page as a streak. The only fix is a new cartridge.</p>

<h3>Skin Oil Contamination on the Drum</h3>
<p>The core component of a laser printer is the OPC (Organic Photo-Conductor) Drum. It is a highly sensitive aluminum cylinder coated in a green or blue photo-reactive polymer.</p>
<ul>
  <li>If you touch the green cylinder while clearing a paper jam, the natural oils from your fingers will coat the drum. Toner sticks aggressively to skin oil.</li>
  <li>This results in perfect, repeating black thumbprints running down your documents (usually 3 or 4 times per page).</li>
  <li>If you accidentally touched it, immediately wipe the area with a microfiber cloth. If left on the drum for too long, the oil degrades the polymer and the drum must be replaced.</li>
</ul>

<h2>Light Print on Cardstock (Heavy Paper Setting)</h2>
<p>If you print a document on standard 20lb copy paper and it looks great, but you print the exact same document on thick cardstock or labels and it comes out extremely light or rubs off on your fingers, the <strong>Fuser isn't hot enough</strong>.</p>
<p>Thick paper absorbs massive amounts of heat. By default, the printer spins the paper through the fuser too fast for the heat to penetrate the cardstock. Open the Pantum print dialog on your PC, click "Preferences" or "Properties," go to the Paper tab, and change the Paper Type from "Plain" to <strong>"Heavy" or "Cardstock"</strong>. This slows the printer down, allowing the fuser to bake the toner properly.</p>`
  },
  {
    title: "Pantum P2500W & M6600NW: Blinking Lights, Wi-Fi & Error 05",
    slug: 'pantum-p2500w-m6600nw-blinking-lights-wifi-error-05',
    seoTitle: "Pantum P2500W & M6600NW Troubleshooting: Blinking Lights",
    metaDescription: "Learn what the blinking lights mean on the Pantum P2500W. Troubleshoot M6600NW Error 05 scanner failures and P1000/M5005 setup errors.",
    excerpt: "Entry-level Pantum models like the P2500W use a simple LED light system instead of an LCD screen. Learn how to decode the flashes and fix Wi-Fi connection drops.",
    errorCode: 'Blinking Lights',
    tags: 'pantum p2500w wireless connection error, pantum p2500 blinking lights meaning, pantum m6600nw error 05, pantum m5005 error message guide, pantum p1000 series error codes',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: setupCategory,
    authorId: authors.david,
    reviewerId: authors.marcus,
    featuredSnippet: "To decode Pantum P2500W Blinking Lights: 1) Slow blinking Green Light (once per second): The printer is receiving data or sleeping. 2) Fast blinking Orange/Red Light: The printer is out of paper, the toner is empty, or the front cover is open. 3) Solid Red Light: A fatal hardware error has occurred, such as a fuser failure or a severe paper jam. 4) Blue Wi-Fi Light Blinking: The printer has lost its connection to your router. Press the Wi-Fi button on the printer, then quickly press the WPS button on your router to re-establish the wireless connection.",
    content: `<h2>Decoding the P2500W / P1000 LED System</h2>
<p>The Pantum P2500W is incredibly popular for home offices due to its small footprint and low cost, but troubleshooting relies entirely on two LED lights (Status and Wi-Fi).</p>

<h3>P2500W Wireless Connection Errors</h3>
<p>If the blue Wi-Fi light is blinking rapidly or is completely off, the printer is disconnected from the network. The most common cause is your router switching Wi-Fi channels (auto-channel optimization) or a change in your Wi-Fi password.</p>
<ul>
  <li><strong>The One-Click Fix (WPS):</strong> Look at the back of your internet router for a button labeled "WPS". Press it once. Then, walk over to the Pantum printer and press its "Wi-Fi" button. The blue light will blink for 60 seconds and turn solid blue when connected.</li>
  <li><strong>The USB Setup Method:</strong> If your router lacks a WPS button, plug the printer into your PC via the USB cable. Run the Pantum driver installer tool, select "Wi-Fi connection", and the setup tool will push your PC's Wi-Fi password through the USB cable into the printer. You can unplug the USB cable afterward.</li>
</ul>

<h2>M6600NW & M5005 Error Messages</h2>
<p>The M-Series (M6600, M5005) feature an LCD screen and an Auto Document Feeder (ADF) for scanning.</p>
<p>If you see <strong>Error 05</strong> on the screen, this means the flatbed scanner motor is jammed. If you recently moved the printer, you likely engaged the shipping lock to prevent the glass from breaking. Lift the scanner lid. Look for a sliding plastic switch near the hinge. Slide it to the "Unlock" (open padlock) position and reboot the printer. If the error persists, the scanner ribbon cable may have become disconnected internally.</p>`
  },
  {
    title: "Pantum M6700, BM5200 & CM2100 Troubleshooting & Language Reset",
    slug: 'pantum-m6700-bm5200-cm2100-troubleshooting-language-reset',
    seoTitle: "Pantum M6700, BM5200, CM2100 Errors & Language Reset",
    metaDescription: "Troubleshooting advanced Pantum models. Learn the difference between the BM2300 and CM2100, how to clear complex paper jams, and reset the LCD language to English.",
    excerpt: "Higher-end Pantum models have complex menus. Learn how to navigate a Chinese language interface back to English and troubleshoot the BM5200 and CM2100.",
    errorCode: null,
    tags: 'pantum m6700 m7100 language reset english, pantum bm5200 bm5300 error codes, pantum cm2100 paper jam clear, pantum bm2300 vs cm2100 difference, pantum m6800 m7200 troubleshooting',
    wordCount: 950,
    difficultyLevel: 'Intermediate',
    timeToFix: '5 minutes',
    categoryId: setupCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredSnippet: "To reset a Pantum M6700 or M7100 LCD Language back to English: If someone accidentally changed your printer menu to Chinese or another language, you can navigate back blindly using the button sequences. 1) Press the 'Menu' button on the control panel. 2) Press the 'Down' arrow exactly 3 times (This highlights the System Settings gear icon). Press OK. 3) Press the 'Down' arrow exactly 2 times (This highlights the Language menu). Press OK. 4) Use the up/down arrows to find 'English' (which will usually be written in English characters regardless of the current setting) and press OK to save.",
    content: `<h2>Pantum BM vs CM Series Differences</h2>
<p>If you are upgrading your office printer, understanding Pantum's nomenclature is critical:</p>
<ul>
  <li><strong>BM Series (e.g., BM2300, BM5200):</strong> The "B" stands for Black and White (Monochrome). The "M" stands for Multifunction (Print, Copy, Scan). These are fast, high-yield document workhorses.</li>
  <li><strong>CM Series (e.g., CM2100):</strong> The "C" stands for Color. The "M" stands for Multifunction. The CM2100 uses four separate toner cartridges (Cyan, Magenta, Yellow, Black) and is significantly heavier and more complex than the BM series.</li>
</ul>

<h2>Clearing CM2100 Paper Jams</h2>
<p>Because the CM2100 is a color laser printer, the paper path is twice as long as a monochrome printer (the paper must pass under four separate drums instead of one). If you get a paper jam error on the CM2100:</p>
<ol>
  <li>Open the front door and pull the entire toner drawer completely out. The paper is usually trapped under the transfer belt.</li>
  <li><strong>Crucial step:</strong> The fuser is located at the top rear of the machine. If the paper is stuck in the back, open the rear door. There are two green levers on the fuser unit called "Pressure Release Levers." You MUST pull these levers down before pulling the paper out, or the tight rollers will rip the paper in half, leaving a scrap inside the machine forever.</li>
</ol>

<h2>BM5200 / BM5300 Error Codes</h2>
<p>These heavy-duty printers often display "Drum End of Life" or "Toner End of Life" messages. Unlike the P2500, the BM5200 uses a high-capacity two-piece system. When replacing the toner, do not throw away the drum unit! Only replace the drum unit when the printer specifically requests it (usually every 30,000 pages). If you replace the drum but the message remains, ensure you leave the front door open, hold the "Cancel" button for 5 seconds until the screen says "Resetting," and then close the door.</p>`
  }
];

async function main() {
  const brandSlug = 'pantum';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 2 (Clusters C & D: Quality & Models) for brand: ${brand.name}`);

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
