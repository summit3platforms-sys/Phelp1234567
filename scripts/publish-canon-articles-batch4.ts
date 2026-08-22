import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const canonBrandId = 'aa9e42c5-e0f0-4b60-b776-c39f46748c33';
const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
const inkCategory = '9af9508c-4517-47bc-9084-8ab635b1283b';
const maintenanceCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Canon MegaTank Not Printing (Air Bubbles & Clogged Printhead Fix)",
    slug: 'canon-megatank-not-printing-air-in-tubes',
    seoTitle: "Fix Canon MegaTank Not Printing (Air in Tubes & Faded Prints)",
    metaDescription: "Is your Canon MegaTank or G-Series printing blank pages or faded colors? Learn how to purge air bubbles from the silicone ink tubes and unclog the printhead.",
    excerpt: "The most common issue with Canon MegaTank (G-series) printers is air entering the silicone ink tubes. This causes faded prints or completely blank pages.",
    errorCode: null,
    tags: 'Canon, MegaTank, G-Series, Air Bubbles, Clogged Printhead, Not Printing, Faded Prints, Ink Flow',
    wordCount: 1400,
    difficultyLevel: 'Intermediate',
    timeToFix: '20 minutes',
    categoryId: inkCategory,
    authorId: authors.alex,
    reviewerId: authors.elena,
    featuredSnippet: "To fix a Canon MegaTank that is not printing due to air in the tubes: 1) Open the printer cover and look at the clear silicone tubes. If they are mostly empty (filled with air), normal cleaning cycles will not fix them. 2) You must run an 'Ink Flush' (or System Cleaning). Go to the printer's Maintenance menu, select 'Ink Flush', and choose 'All Colors'. 3) This process takes 10 minutes and uses a massive amount of ink to forcibly suck the air out of the tubes and re-prime the printheads. 4) If a specific color is still faded, the printhead itself is clogged and must be soaked in warm water.",
    content: `<h2>The MegaTank Air Lock Problem</h2>
<p>Canon MegaTank printers (such as the G2260, G3200, G4210, and others in the G-series) save you a fortune on ink by using refillable tanks instead of cartridges. However, this system relies on long, clear silicone tubes to carry ink from the tanks at the front of the printer to the moving printhead carriage.</p>
<p>If you lift the top cover of your printer and look at those tubes, they should be solid black, cyan, magenta, and yellow. If you see large gaps of clear space, or if the tubes are completely empty, your printer has an <strong>air lock</strong>.</p>
<p>Because ink cannot flow through air, the printhead starves. This results in prints that are streaky, faded, missing a specific color, or completely blank.</p>

<h2>Cause 1: Letting the Tanks Run Dry</h2>
<p>The most common way air enters the system is by letting the physical ink tanks drop below the bottom line. The pump sucks in air instead of ink. <strong>Never let your MegaTank ink levels drop below the lower limit line.</strong></p>

<h2>Fix 1: The 'Ink Flush' (System Cleaning)</h2>
<p>A standard "Head Cleaning" from the printer menu is not strong enough to pull air out of the tubes. You must use the heavy-duty <strong>Ink Flush</strong> (sometimes called System Cleaning or Deep Cleaning, depending on your model).</p>
<p><em>Warning: An Ink Flush consumes a massive amount of ink. Ensure your tanks are at least 50% full before starting, or you risk damaging the printer.</em></p>
<ol>
    <li>On the printer's screen (or via the Canon software on your computer), go to <strong>Setup &gt; Maintenance</strong>.</li>
    <li>Select <strong>Ink Flush</strong>.</li>
    <li>Choose <strong>All Colors</strong> (or select just Black or Color if only one tube is empty).</li>
    <li>Confirm the prompt. The printer will make loud pumping noises for 10 to 12 minutes.</li>
</ol>
<p>Once it finishes, open the cover and check the tubes. They should be completely solid with ink again. Print a nozzle check pattern to confirm.</p>

<h2>Fix 2: The Printhead Soak</h2>
<p>If the tubes are solid with ink, but the printer is still printing blank pages or streaky lines, the printhead itself is clogged.</p>
<p>Unlike standard cartridges, MegaTank printheads (often labeled 'C' and 'B' for Color and Black) can be removed and cleaned manually.</p>
<ul>
    <li>Open the cover. Wait for the carriage to center.</li>
    <li><strong>Crucial Step:</strong> Before doing anything, open the blue ink tank caps at the front of the printer. This closes the internal valves. If you don't do this, all the ink in the tubes will immediately drain backward into the tanks when you remove the printhead.</li>
    <li>Lift the blue locking cover over the printheads.</li>
    <li>Remove the problem printhead (B or C).</li>
    <li>Soak the bottom nozzle plate in 1 cm of warm distilled water for 15 minutes.</li>
    <li>Dry it completely, reinstall it, close the blue locking cover, and <strong>close the ink tank caps</strong>.</li>
    <li>Run one standard cleaning cycle and print a test page.</li>
</ul>`
  },
  {
    title: "Canon MAXIFY GX Error Code Guide: Troubleshooting Business Inkjets",
    slug: 'canon-maxify-gx-error-code',
    seoTitle: "Canon MAXIFY GX Error Code List & Troubleshooting",
    metaDescription: "A comprehensive guide to troubleshooting Canon MAXIFY GX series business MegaTank printers. Learn how to clear paper jams, fix ink delivery errors, and resolve network codes.",
    excerpt: "The Canon MAXIFY GX series (GX6020, GX7020) are high-volume business printers. When they throw an error code, productivity stops. Here is how to fix them.",
    errorCode: null,
    tags: 'Canon, MAXIFY, GX Series, Error Code, Business Printer, Troubleshooting',
    wordCount: 1000,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: errorCategory,
    authorId: authors.david,
    reviewerId: authors.marcus,
    featuredSnippet: "Common Canon MAXIFY GX Error Codes: Error 1000/1003 means paper is out or the cassette is not fully inserted. Error 1300/1303/1304 indicates a paper jam in the rear, front, or duplexer. Error 1430/1470 means an ink bottle was left inserted or the ink tank cap is open. Error 5100/5200 are carriage jams and overheating (clear the carriage path and let it cool). Error 5B00/1700 means the maintenance cartridge (waste ink) is full and must be replaced.",
    content: `<h2>Troubleshooting the MAXIFY GX Series</h2>
<p>The Canon MAXIFY GX series (such as the GX6020 and GX7020) combines MegaTank refillable ink technology with heavy-duty business printer mechanics. Because they are designed for high volume, they have unique error codes and maintenance requirements compared to standard PIXMA models.</p>

<h2>The 1000 Series: Paper and Tray Errors</h2>
<ul>
    <li><strong>Error 1000 / 1003 (Paper Out):</strong> The printer didn't detect paper. On MAXIFY models, this is frequently caused by the paper cassette not being pushed in all the way. Push the drawer firmly until it clicks flush with the printer face.</li>
    <li><strong>Error 1300 / 1303 / 1304 (Paper Jam):</strong> A paper jam has occurred. Because MAXIFY printers have an automatic duplexer, jams often occur in the rear. Remove the rear cover panel completely to inspect the rollers. If you were using the ADF (Automatic Document Feeder) on top, flip open the ADF cover to remove the stuck original.</li>
</ul>

<h2>The 1400 Series: Ink Delivery Errors</h2>
<ul>
    <li><strong>Error 1430 / 1470:</strong> You left an ink bottle squeezed into the filling port, or you forgot to close the blue ink tank caps securely. The printer has sensors on these caps; if they are not snapped down tight, the printer will not initialize.</li>
    <li><strong>Error 1471:</strong> The printhead cannot be recognized. Open the printer, press down firmly on the blue printhead locking cover to ensure the printhead is seated, and close the machine.</li>
</ul>

<h2>The 5000 Series: Mechanical and Thermal Errors</h2>
<ul>
    <li><strong>Error 5100 (Carriage Jam):</strong> A piece of torn paper or a paperclip is blocking the printhead's path. Open the front cover and shine a flashlight along the metal rail.</li>
    <li><strong>Error 5200 (Overheating):</strong> The printer is too hot. Because MAXIFYs are built for speed, printing 500 pages continuously can trigger this. Turn the printer off and let it cool for 45 minutes.</li>
</ul>

<h2>The Maintenance Cartridge: User-Replaceable Waste Ink</h2>
<p>Unlike standard PIXMA models where the waste ink sponge is buried deep inside the printer (requiring a messy disassembly and a software reset for a 5B00 error), the MAXIFY GX series features a <strong>user-replaceable Maintenance Cartridge (MC-G01)</strong>.</p>
<p>If you get an error stating the maintenance cartridge is full, simply pull it out from the back of the printer, slide a new $25 cartridge in, and the printer automatically resets itself. No software hacks required.</p>`
  },
  {
    title: "Canon G7020 Error 1700 (Why MegaTank Absorbers Can't Be Reset)",
    slug: 'canon-g7020-error-1700-megatank-absorber',
    seoTitle: "Canon G7020 Error 1700 / 5B00 (The MegaTank EEPROM Lockout)",
    metaDescription: "Getting Error 1700 or 5B00 on a Canon G7020 or G-series MegaTank? Learn why the standard Service Tool won't work, and why the EEPROM chip is locked by Canon.",
    excerpt: "If your Canon G7020 or similar G-series MegaTank throws a 1700 or 5B00 waste ink error, you are in for a shock: Canon locked the motherboard to prevent software resets.",
    errorCode: '1700',
    tags: 'Canon, G7020, 1700, 5B00, MegaTank, EEPROM, Service Tool Lockout',
    wordCount: 1100,
    difficultyLevel: 'Expert',
    timeToFix: 'N/A',
    categoryId: maintenanceCategory,
    authorId: authors.elena,
    reviewerId: authors.alex,
    featuredSnippet: "If you have a Canon G7020 (or similar modern G-series MegaTank) with a 1700 or 5B00 'Ink Absorber Full' error, standard software reset tools (like Service Tool v3400) will NOT work. Canon has hardware-locked the EEPROM chips on modern MegaTanks. When you try to use the software, it crashes or the printer freezes with a solid green light. To fix this, you must either replace the motherboard entirely, or physically desolder the EEPROM chip from the motherboard and flash it with a hardware programmer.",
    content: `<h2>The MegaTank Waste Ink Crisis</h2>
<p>If you own a Canon G7020, G3200, G4210, or almost any modern G-series MegaTank printer, and you receive <strong>Error 1700</strong> (Waste ink almost full) or <strong>Error 5B00</strong> (Waste ink full), you have hit a massive roadblock.</p>
<p>For decades, users could put their Canon printers into Service Mode and use a free software tool to reset the digital waste ink counter. However, with the release of the MegaTank series, Canon changed the hardware architecture.</p>

<h2>The EEPROM Lockout</h2>
<p>On modern G-series printers, the EEPROM (the memory chip that stores the waste ink counter) is hardware-locked against unauthorized software flashing.</p>
<p>If you attempt to use the standard Canon Service Tool on a G7020, one of two things will happen:</p>
<ol>
    <li>The software tool will freeze, crash, or return "Error 006" or "Error 002".</li>
    <li>The printer will enter a state called <strong>"Service Mode Lock."</strong> The green power light stays on solid, but the printer refuses to accept any commands. You literally cannot turn it off without pulling the power cord.</li>
</ol>
<p>Once a printer is in Service Mode Lock, it is permanently bricked from accepting software resets. <strong>Do not pay for eBay software reset keys for G-series printers; they are scams.</strong></p>

<h2>The Only Three Solutions</h2>
<p>Because the software route is blocked, you only have three physical options to get your G7020 printing again.</p>

<h3>1. Professional Repair / Motherboard Replacement</h3>
<p>You can send the printer to Canon. They will replace the physical ink sponges and install a brand-new motherboard with a factory-zero EEPROM chip. Alternatively, you can buy a replacement motherboard online (ensure it is the exact same region and model) and swap it yourself. This usually costs between $60 and $90.</p>

<h3>2. The Hardware Flasher (Advanced Micro-Soldering)</h3>
<p>If you are skilled with a soldering iron, you can physically remove the EEPROM chip (usually an 8-pin SPI chip labeled 25Q16 or similar) from the motherboard.</p>
<p>Using a CH341A USB hardware programmer connected to a PC, you can flash a clean, 0% waste ink BIN file directly onto the chip, and then solder the chip back onto the motherboard. This costs about $15 in tools but requires extreme precision.</p>

<h3>3. Buy a New Printer</h3>
<p>For many users, micro-soldering is out of the question, and paying $90 for a motherboard makes no economic sense. Unfortunately, the EEPROM lockout on the G-series forces many of these excellent printers into early retirement.</p>`
  },
  {
    title: "Canon MAXIFY GX Ink Not Detected: Fix Continuous Supply Issues",
    slug: 'canon-maxify-gx-ink-not-detected',
    seoTitle: "Fix Canon MAXIFY GX Ink Not Detected (CISS Troubleshooting)",
    metaDescription: "Canon MAXIFY GX printer not detecting ink? Learn how the optical ink sensors work on MegaTank business printers and how to fix false empty readings.",
    excerpt: "The MAXIFY GX uses an advanced optical sensor to detect ink levels in its massive tanks. If it falsely reports 'Ink Not Detected', here is how to troubleshoot the system.",
    errorCode: null,
    tags: 'Canon, MAXIFY, GX Series, Ink Not Detected, Optical Sensor, CISS, MegaTank',
    wordCount: 850,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: inkCategory,
    authorId: authors.marcus,
    reviewerId: authors.david,
    featuredSnippet: "To fix a Canon MAXIFY GX reporting 'Ink Not Detected' when the tank is full: 1) Ensure the printer is on a perfectly flat, level surface. The optical sensors rely on gravity and fluid levels to read correctly. 2) Open the blue ink tank cap and close it firmly. The printer uses a micro-switch on the cap to trigger a re-check of the fluid level. 3) If using third-party ink, it may lack the specific optical density (opacity) required by Canon's infrared sensors. You must use high-opacity pigment ink. 4) Gently tap the front of the ink tank to dislodge any air bubbles trapped against the sensor prism inside the tank.",
    content: `<h2>How MAXIFY GX Ink Sensors Work</h2>
<p>Standard PIXMA MegaTanks don't actually know how much ink is in them; they just count the pages you print and guess. The <strong>MAXIFY GX series (GX6020, GX7020, etc.)</strong> is different. Because these are business printers, Canon installed actual hardware sensors inside the ink tanks.</p>
<p>These are <strong>optical prism sensors</strong>. They shine an infrared beam through the bottom of the tank. If the tank is full of ink, the light is absorbed. If the tank is empty, the light reflects off the clear plastic prism back to a detector, triggering the "Ink Not Detected" or "Refill Ink" error.</p>

<h2>Fix 1: The Leveling Issue</h2>
<p>Because these sensors rely on the physical fluid level of the ink, the printer must be perfectly level. If your printer is sitting on a desk that leans slightly backward, the ink pools at the back of the tank, exposing the sensor prism at the front. Move the printer to a flat, hard surface.</p>

<h2>Fix 2: Forcing a Sensor Re-Check</h2>
<p>Sometimes the printer's software gets out of sync with the hardware sensor.</p>
<ol>
    <li>Open the printer's front cover to expose the ink tanks.</li>
    <li>Pop open the blue rubber cap for the color that is reporting empty.</li>
    <li>Wait 3 seconds, then press the cap firmly back down.</li>
    <li>Close the front cover.</li>
</ol>
<p>There is a micro-switch on the hinge of the blue cap. Opening and closing it tells the motherboard, <em>"The user just refilled the ink; run a fresh optical scan."</em></p>

<h2>Fix 3: The Third-Party Ink Trap</h2>
<p>If you refilled your MAXIFY GX with cheap, third-party dye ink, you will almost certainly trigger this error.</p>
<p>MAXIFY printers use high-density <strong>pigment ink</strong> for all four colors to ensure text is waterproof and highlighter-resistant. Pigment ink is highly opaque. Cheap dye ink is translucent. If you put dye ink in a MAXIFY tank, the infrared sensor beam shines right through it as if it were water, reflects off the prism, and falsely tells the printer the tank is empty.</p>
<p>If you did this, you must drain the dye ink and refill the tanks with proper high-opacity pigment ink formulated specifically for the GX series.</p>`
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
