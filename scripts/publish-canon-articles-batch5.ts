import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const canonBrandId = 'aa9e42c5-e0f0-4b60-b776-c39f46748c33';
const printQualityCategory = 'e3d26347-33bf-41a7-9cbf-c3d821850f98';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix Canon Printer Streaky Prints & Horizontal Lines",
    slug: 'canon-printer-streaky-prints-horizontal-lines',
    seoTitle: "Fix Canon Printer Streaky Prints & Horizontal White Lines",
    metaDescription: "Are your Canon prints covered in white horizontal lines or streaks? Learn how to unclog the printhead nozzles, clean the timing strip, and fix paper feed settings.",
    excerpt: "Streaky prints and horizontal white lines are the most common print quality issues on Canon PIXMA printers. Fortunately, they are almost always fixable.",
    errorCode: null,
    tags: 'Canon, Streaky Prints, Horizontal Lines, Print Quality, Printhead Cleaning, Deep Clean',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: '15 minutes',
    categoryId: printQualityCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix horizontal white lines and streaks on a Canon printer: 1) Run a Nozzle Check from the maintenance menu to identify which specific color is clogged. 2) Run a standard Printhead Cleaning cycle. 3) If streaks remain, run a 'Deep Cleaning' cycle (note: this uses a lot of ink). 4) If printing on glossy photo paper, ensure your paper settings in the print dialog are set to 'Photo Paper' and 'High Quality'. Printing on plain paper settings forces the printhead to move too fast, causing visible banding.",
    content: `<h2>Why Do Horizontal White Lines Appear?</h2>
<p>Inkjet printers build an image by moving the printhead left and right across the page, laying down horizontal bands of microscopic ink dots. If a specific section of the printhead is clogged, it fails to lay down ink during that pass, leaving a perfectly straight, horizontal white line (or a lighter streak) across the paper. This is known in the industry as <strong>banding</strong>.</p>

<h2>Fix 1: The Deep Cleaning Cycle</h2>
<p>Your first line of defense is the printer's built-in maintenance routines. The printer has a small vacuum pump that can physically suck dried ink out of the nozzles.</p>
<ol>
    <li>Navigate to the <strong>Maintenance</strong> or <strong>Setup</strong> menu on your printer's LCD screen (or via the Canon IJ Printer Utility on your computer).</li>
    <li>First, select <strong>Print Nozzle Check Pattern</strong>. Look at the grid. If any horizontal lines in the grid are broken or missing, you have a clog.</li>
    <li>Select <strong>Cleaning</strong>. It takes about 2 minutes. Print another nozzle check.</li>
    <li>If the grid is still broken, select <strong>Deep Cleaning</strong>. <em>Warning: Deep Cleaning consumes approximately 5 to 10 times more ink than a standard cleaning. Only run it if a standard cleaning fails.</em></li>
</ol>
<p>If you run two Deep Cleanings and the streaks persist, do not run a third. Turn the printer off and let it sit for 24 hours. The fresh ink pulled into the printhead needs time to dissolve the hardened clogs.</p>

<h2>Fix 2: Changing Your Print Settings</h2>
<p>If your nozzle check is absolutely perfect, but your photos still have horizontal banding, your hardware is fine—your software settings are wrong.</p>
<p>When you set your printer to "Plain Paper" and "Standard Quality," the printhead moves across the page as fast as possible to save time. This fast movement often leaves microscopic gaps between passes.</p>
<p>When printing photos or high-quality graphics, always open the Print Dialog box on your computer. Change the Media Type to <strong>Glossy Photo Paper</strong> (even if you are using premium matte) and change the Print Quality to <strong>High</strong> or <strong>Best</strong>. This forces the printhead to slow down and overlap its passes, completely eliminating horizontal banding.</p>

<h2>Fix 3: Cleaning the Encoder Strip</h2>
<p>If the streaks are not perfectly white, but rather look like blurry, jagged, or misaligned vertical blocks along a horizontal path, the printer has lost its positional tracking.</p>
<p>Look behind the ink carriage rail for a clear plastic ribbon (the encoder strip). If it is smeared with grease or ink, the optical sensor gets confused. Wipe it gently with a dry microfiber cloth from left to right to restore crisp, streak-free printing.</p>`
  },
  {
    title: "Canon Printer Colors Wrong? How to Read a Nozzle Check",
    slug: 'canon-printer-colors-printing-wrong-nozzle-check',
    seoTitle: "Fix Canon Printer Colors Wrong (Pink, Green, or Missing)",
    metaDescription: "Is your Canon printer printing pink, missing blue, or producing completely wrong colors? Learn how to read a nozzle check pattern and fix ink cross-contamination.",
    excerpt: "When a printer turns blue skies into pink clouds, or skin tones into green alien flesh, the color balance is fundamentally broken. Here is how to diagnose it.",
    errorCode: null,
    tags: 'Canon, Wrong Colors, Nozzle Check, Cross Contamination, Printhead, Color Mix',
    wordCount: 1050,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: printQualityCategory,
    authorId: authors.alex,
    reviewerId: authors.elena,
    featuredSnippet: "To fix a Canon printer printing the wrong colors: 1) Print a Nozzle Check Pattern from the maintenance menu. 2) Look at the colored bars. If the Cyan (Blue) bar is completely missing, your printer is using Magenta and Yellow to compensate, making everything look pink/orange. 3) If the Yellow bar looks green, black ink has leaked into the yellow nozzles (cross-contamination). 4) Run two standard cleaning cycles. 5) If a cartridge is empty, replace it immediately; you cannot print accurate colors if one of the primary colors is dry.",
    content: `<h2>The CMYK Color Triangle</h2>
<p>Your Canon printer creates millions of colors using only four basic inks: <strong>C</strong>yan (Blue), <strong>M</strong>agenta (Red/Pink), <strong>Y</strong>ellow, and blac<strong>K</strong>.</p>
<p>If just one of those colors stops flowing, every color on the page shifts violently. For example, green grass is made by mixing Cyan and Yellow. If your Cyan nozzle is clogged, the printer still sprays the Yellow. Suddenly, your lush green lawn prints out bright, sickly yellow. If your yellow is clogged, skin tones (which rely heavily on yellow and magenta) will look ghostly or violently pink.</p>

<h2>Step 1: The Nozzle Check Test</h2>
<p>You cannot fix color issues blindly. You must print a diagnostic map.</p>
<ol>
    <li>Go to your printer's <strong>Maintenance</strong> menu and select <strong>Print Nozzle Check Pattern</strong>.</li>
    <li>Look closely at the printed page. You should see a black grid, and solid horizontal bars of Cyan, Magenta, and Yellow.</li>
</ol>

<h2>Diagnosis A: The Missing Color</h2>
<p>If one of the color bars is completely invisible or severely broken up, that specific color is clogged or empty. The printer is trying to mix colors without it, resulting in the strange hues you see on your photos.</p>
<ul>
    <li>Remove that specific ink cartridge and check if it feels empty. Replace if necessary.</li>
    <li>If the cartridge is full, run a <strong>Cleaning</strong> cycle to force ink through the clogged nozzles of that specific color.</li>
</ul>

<h2>Diagnosis B: Cross-Contamination (Muddy Colors)</h2>
<p>Look at the Yellow bar on your nozzle check. Does it look green? Does the Magenta bar look dark purple?</p>
<p>This is called cross-contamination. If a tiny hair or piece of dust gets stuck on the bottom of the printhead, it acts like a bridge. Black or Cyan ink will bleed across the bottom of the printhead and get sucked up into the Yellow nozzles. When you try to print yellow, it sprays out a dirty green mix.</p>
<p>To fix cross-contamination, remove the printhead, turn it upside down, and gently wipe the bottom nozzle plate with a lint-free cloth dampened with rubbing alcohol to remove the debris bridge. Then run a deep clean to flush the contaminated ink out of the yellow chamber.</p>

<h2>Diagnosis C: Refill Mistakes</h2>
<p>If you own a MegaTank printer or if you refill your own cartridges, verify that you didn't accidentally pour Cyan ink into the Magenta tank. It sounds silly, but it happens thousands of times a day. If you mixed the inks in the tank, you must use a syringe to drain the tank completely, flush it with distilled water, and refill it with the correct color.</p>`
  },
  {
    title: "Canon Printer Faded on One Side (Cartridge Alignment & Flow Fix)",
    slug: 'canon-printer-faded-printing-one-side',
    seoTitle: "Fix Canon Printer Faded on One Side (Uneven Print Quality)",
    metaDescription: "If your Canon printer is printing faded text on only the left or right side of the page, you have an ink flow or mechanical alignment issue. Learn how to fix it.",
    excerpt: "Uneven fading—where text is dark on the left but fades to invisible on the right—is a unique physical problem. It is rarely a software glitch.",
    errorCode: null,
    tags: 'Canon, Faded Print, Uneven Print, One Side, Cartridge, Printhead, Platen',
    wordCount: 850,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: printQualityCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "To fix a Canon printer that is faded on one side: 1) Verify the paper is loaded evenly and the paper guides are snug. If paper enters diagonally, it curves away from the printhead, causing fading. 2) Remove the ink cartridges and reseat them; an improperly seated cartridge may sit too high on one side. 3) Open the printer and check the metal carriage rail. If the rail is knocked out of alignment, the printhead will be farther away from the paper on the right side, resulting in faded, blurry text.",
    content: `<h2>The Geometry of Uneven Fading</h2>
<p>When an inkjet printer works perfectly, the printhead moves back and forth exactly 1 to 2 millimeters above the surface of the paper. It maintains this exact distance across the entire width of the page.</p>
<p>If your text is crisp on the left side of the page, but blurry, faded, or missing on the right side, the geometry of your printer has been compromised. The printhead is physically farther away from the paper on the right side than it is on the left.</p>

<h2>Fix 1: The Crooked Paper Feed</h2>
<p>The most common reason for uneven fading is that the paper itself is not sitting flat against the platen.</p>
<p>If your paper guides (the plastic sliders in the rear tray or bottom cassette) are too loose, the paper can feed into the printer slightly diagonally. This causes the paper to buckle and bulge in the middle, curving away from the printhead on one edge.</p>
<ul>
    <li>Remove all paper from the printer.</li>
    <li>Reload a fresh, flat stack of paper (do not use paper that has curled from humidity).</li>
    <li>Squeeze the plastic paper guides and slide them inward until they lightly pinch the edges of the paper. The paper should slide down smoothly, but not have room to twist sideways.</li>
</ul>

<h2>Fix 2: Unseated Cartridges</h2>
<p>On budget PIXMA models that use two FINE cartridges (one black, one color), the cartridges must be pushed upward into their slots until they snap into place.</p>
<p>If you push a cartridge in, but it doesn't fully click on the right side, the cartridge will sit at a slight angle. The nozzles on the right side will be farther away from the paper, causing the ink droplets to scatter in the air before hitting the page, creating a faded, blurry look.</p>
<p>Open the front access door, push down on both cartridges to release them, and push them firmly back into place, ensuring they are perfectly level.</p>

<h2>Fix 3: The Derailed Carriage Rail</h2>
<p>If the printer was dropped during moving, or if you violently ripped a severe paper jam out of the machine, you may have bent the metal carriage rail.</p>
<p>The printhead slides along this thick metal bar. If the bar is bent upward on the right side, the printhead lifts away from the paper as it moves right. Unfortunately, if the internal metal chassis of the printer is bent, the printer is permanently damaged and usually cannot be repaired economically.</p>`
  },
  {
    title: "Canon Print Head Alignment Failed? (Scanner & Pattern Fix)",
    slug: 'canon-printer-print-head-alignment-failed',
    seoTitle: "Fix Canon Print Head Alignment Failed (Auto Alignment Error)",
    metaDescription: "Does your Canon printer say 'Print Head Alignment Failed'? Learn how to fix scanner errors, use the correct paper, and bypass to Manual Alignment.",
    excerpt: "Auto Print Head Alignment is a neat feature until it fails. When the printer rejects the alignment sheet, you need to troubleshoot the scanner and the paper.",
    errorCode: '2500',
    tags: 'Canon, Print Head Alignment, Failed, Scanner, Manual Alignment, Error 2500',
    wordCount: 950,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: printQualityCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "To fix 'Print Head Alignment Failed' (Error 2500) on a Canon printer: 1) Ensure you are placing the printed alignment sheet face down on the glass scanner bed, with the black triangle mark aligned with the arrow in the corner of the glass. 2) Ensure you printed the sheet on clean, white A4 or Letter paper; colored or recycled paper confuses the scanner. 3) If the automatic alignment keeps failing, switch to Manual Alignment: go to the printer's setup menu > Maintenance > Custom Settings, and turn on 'Align heads manually'.",
    content: `<h2>How Auto-Alignment Works (And Fails)</h2>
<p>When you install new ink cartridges, Canon recommends a Print Head Alignment to ensure vertical lines print straight. On modern models, this process is automated: the printer prints a page of blue and black grids, asks you to place it on the scanner glass, and presses a button. The printer scans the page, calculates the microscopic offsets, and adjusts the printhead.</p>
<p>If the printer beeps and displays <strong>"Print Head Alignment Failed"</strong> (or Error 2500 / 2900), the scanner could not read the grid pattern.</p>

<h2>Fix 1: Correct Placement on the Glass</h2>
<p>The number one reason for alignment failure is user error during placement.</p>
<ul>
    <li>The printed alignment page has a bold black triangle or arrow printed in one of the corners.</li>
    <li>Open the scanner lid. Look at the glass. There is an engraved arrow on the plastic frame around the glass (usually the front-left or back-left corner).</li>
    <li>Place the paper <strong>face down</strong> on the glass, making sure the printed triangle on the paper points directly at the engraved arrow on the glass.</li>
    <li>Close the lid completely so ambient room light doesn't blind the scanner. Press the Copy or OK button.</li>
</ul>

<h2>Fix 2: The Paper and Ink Problem</h2>
<p>The scanner is looking for high-contrast blue and black lines against a stark white background.</p>
<p>If you used colored paper, cream-colored recycled paper, or paper with a watermark, the scanner cannot differentiate the grid from the background, and it fails. Always use bright white, standard 20lb copy paper for alignment.</p>
<p>Additionally, look at the alignment sheet that printed out. Are the black grids faint, streaky, or missing sections? If your printhead is clogged, the alignment sheet will print poorly. The scanner reads this poor printout, realizes the grid is corrupt, and fails the alignment. You must run a standard <strong>Printhead Cleaning</strong> cycle to fix the clogs before attempting to align the heads.</p>

<h2>Fix 3: Bypassing to Manual Alignment</h2>
<p>If your scanner glass is scratched, or the automatic process simply refuses to work, you can force the printer to use the old-school manual alignment method.</p>
<ol>
    <li>On your computer, open the <strong>Canon IJ Printer Assistant Tool</strong> (Windows) or the Canon Utility (Mac).</li>
    <li>Click on <strong>Custom Settings</strong>.</li>
    <li>Check the box that says <strong>"Align heads manually"</strong> and click OK.</li>
    <li>Now, click <strong>Print Head Alignment</strong>.</li>
</ol>
<p>Instead of using the scanner, the printer will print a page with multiple columns of boxes labeled with numbers (e.g., Column A, B, C, with boxes 1 through 5). The software will ask you to look at the page and type in the number of the box that has the least amount of white streaks. You become the scanner, completely bypassing the error.</p>`
  }
];

async function main() {
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
          faqs: (article as any).faqs,
          status: 'published',
          publishedAt: new Date(),
          brandId: canonBrandId,
          categoryId: article.categoryId,
          authorId: article.authorId,
          reviewerId: article.reviewerId,
          reviewedAt: new Date(),
        }
      });
      console.log('✅ Published: "' + created.title + '"');
    } catch (e: any) {
      console.log('⚠️ Error for "' + article.title + '": ' + e.message);
    }
  }
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
