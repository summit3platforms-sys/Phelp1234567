import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const epsonBrandId = 'bb9c3e02-79fa-454d-a084-854b38f41af9';
const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
const inkCategory = '9af9508c-4517-47bc-9084-8ab635b1283b';
const printQualityCategory = 'e3d26347-33bf-41a7-9cbf-c3d821850f98';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Epson Error 0x9A Meaning and Fix: Carriage Motor and Printhead Diagnostics",
    slug: 'epson-error-0x9a-meaning-and-fix',
    seoTitle: "Fix Epson Error 0x9A: What it Means and How to Repair It",
    metaDescription: "Epson error code 0x9A indicates a fatal error with the carriage motor or printhead. Learn how to diagnose a blown motor vs a shorted mainboard.",
    excerpt: "Similar to the dreaded 0x97 error, 0x9A is a fatal hardware failure. However, 0x9A often points to the Carriage Motor or the CR scale. Learn how to test these components.",
    errorCode: '0x9A',
    tags: 'Epson, 0x9A, Error Code, Carriage Motor, Printhead, Hardware Failure',
    wordCount: 1100,
    difficultyLevel: 'Expert',
    timeToFix: '45 minutes',
    categoryId: errorCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "To fix Epson error 0x9A: 1) Unplug the printer for 10 minutes to drain residual power. 2) Open the printer and check the CR Scale (the clear encoder strip) for heavy grease or ink; clean it with isopropyl alcohol. 3) Inspect the Carriage Motor. If the motor is incredibly hot to the touch or smells like ozone, it has burned out. 4) If the motor is fine, the error may indicate a blown F1/F2 fuse on the mainboard caused by a shorted printhead.",
    content: `<h2>The Reality of Epson Error 0x9A</h2>
<p>If your Epson printer has suddenly stopped dead in its tracks and displayed <strong>Error Code 0x9A</strong>, you are dealing with a severe hardware fault. Much like its cousin, the infamous 0x97 error, 0x9A is a fatal code. However, where 0x97 almost always points to a blown mainboard and shorted printhead, 0x9A has a slightly broader diagnostic scope: it frequently involves the <strong>Carriage Motor</strong> and the printer's ability to track the printhead's physical location.</p>
<p>While standard support guides will tell you to turn the printer off and back on again, this rarely provides a permanent fix. This guide will walk you through the actual mechanical checks required to identify what failed inside your machine.</p>

<h2>Diagnostic 1: The CR Scale (Encoder Strip)</h2>
<p>Before assuming a motor or motherboard is fried, you must rule out the CR Scale (Carriage Return Scale, also known as the encoder strip). This is the thin, semi-transparent plastic strip that runs parallel to the metal rail the printhead slides on.</p>
<p>If this strip becomes heavily coated in aerosolized ink, paper dust, or gear grease, the optical sensor on the back of the printhead goes completely blind. When the printer commands the carriage motor to move, the sensor doesn't register the movement. The motherboard assumes the motor is jammed or burned out, throwing error 0x9A.</p>
<ol>
    <li>Unplug the printer from the wall.</li>
    <li>Lift the scanner bed to expose the printhead carriage.</li>
    <li>Locate the encoder strip just behind the carriage.</li>
    <li>Take a microfiber cloth, apply a single drop of glass cleaner or isopropyl alcohol, and gently wipe the strip from left to right.</li>
    <li>If the cloth comes away black with ink, wait 5 minutes for the strip to dry, then turn the printer on. If it was just a sensory blind spot, the error will clear.</li>
</ol>

<h2>Diagnostic 2: The Carriage Motor</h2>
<p>If the encoder strip is clean, the next most likely culprit is the Carriage Motor. This is the small DC motor (usually located on the far left or right side of the chassis) that drives the rubber belt attached to the printhead.</p>
<p>Epson printers, especially older WorkForce models, are notorious for running these motors extremely hard during power cleaning cycles. Over time, the internal brushes wear out, or the motor simply overheats and burns out.</p>
<h3>How to test the motor:</h3>
<ul>
    <li><strong>The Heat Test:</strong> Turn the printer on, let it throw the 0x9A error, then immediately unplug it. Touch the metal casing of the carriage motor. If it is scorching hot to the touch, it is failing. It is drawing massive amounts of current trying to spin, overheating, and triggering the mainboard's safety cutoff.</li>
    <li><strong>The Resistance Test:</strong> With the printer unplugged, manually push the printhead carriage left and right. It should move smoothly with slight, even resistance. If it feels extremely stiff, or if it grinds, the motor bearings or the gear assembly are seized.</li>
</ul>
<p><strong>The Fix:</strong> Carriage motors are relatively inexpensive (usually $15-$25 online). Replacing one involves unscrewing it from the chassis, detaching the rubber belt, and plugging the new motor's 2-pin harness into the motherboard.</p>

<h2>Diagnostic 3: The Mainboard / Printhead Short</h2>
<p>If the encoder strip is clean and the carriage motor is functioning properly, 0x9A can unfortunately act as a catch-all code for a motherboard failure.</p>
<p>Just like error 0x97, if liquid ink has leaked onto the printhead's ribbon cables, it will cause a short circuit. This short travels to the motherboard and blows the surface-mount fuses (F1 or F2) or the driving transistors. When the motherboard attempts to send power to the carriage and fails, it triggers 0x9A.</p>
<p>If you have reached this stage, repairing the printer requires micro-soldering a new fuse onto the motherboard and replacing the printhead entirely. For most consumers, a 0x9A error that persists after cleaning the encoder strip and checking the motor means it is time to purchase a new printer.</p>`
  },
  {
    title: "Epson Error E-01: Printer Error Fix (Carriage & Paper Jams)",
    slug: 'epson-error-e-01-printer-error-fix',
    seoTitle: "Fix Epson Error E-01: Fatal Printer Error Diagnostics",
    metaDescription: "Epson error E-01 means your printer's carriage cannot move. Learn how to clear hidden paper jams, fix the encoder strip, and resolve fatal errors.",
    excerpt: "Error E-01 on Epson printers signifies a fatal error, usually caused by a physical obstruction in the print carriage path. Here is how to find and remove the hidden jam.",
    errorCode: 'E-01',
    tags: 'Epson, E-01, Fatal Error, Paper Jam, Carriage Jam, Encoder Strip',
    wordCount: 1050,
    difficultyLevel: 'Beginner',
    timeToFix: '15 minutes',
    categoryId: errorCategory,
    authorId: authors.elena,
    reviewerId: authors.alex,
    featuredSnippet: "To fix Epson Error E-01: 1) Turn off the printer and unplug it from the wall. 2) Open the scanner unit to view the printhead carriage. 3) Gently push the carriage to the left and right; if it is stuck, look for a crumpled piece of paper, a stray paperclip, or a dislodged rubber belt blocking its path. 4) Remove any foreign objects with tweezers. 5) Plug the printer back in and turn it on.",
    content: `<h2>Understanding Epson Error E-01</h2>
<p>Error <strong>E-01</strong> is a highly common code on Epson EcoTank, Expression, and WorkForce printers. The printer's screen will usually accompany this code with a terrifying message like <em>"Printer Error. Turn power off and on again. For details, see your documentation."</em></p>
<p>Despite the severe wording, E-01 is almost always a mechanical issue, not an electronic one. Specifically, it means the printer attempted to move the printhead carriage, and the carriage hit something, got stuck, or failed to register its movement. The printer shuts down to prevent the motors from burning out.</p>

<h2>Fix 1: The Hidden Obstruction</h2>
<p>In 90% of E-01 cases, there is a physical object blocking the carriage path. This isn't always a massive, obvious paper jam. Often, it's a tiny, torn scrap of paper, a staple, or a rogue paperclip that fell into the top feed tray.</p>
<ol>
    <li>Turn the printer off and completely unplug the power cord. (Never reach into the printer while it has power).</li>
    <li>Lift the entire scanner bed assembly to look down into the mechanical guts of the printer.</li>
    <li>Take a flashlight and shine it into the far right and far left corners. The far right side is the "parking station," where the printhead rests. Scraps of paper love to hide under this station.</li>
    <li>Gently grasp the printhead carriage and try to slide it side to side. It should move freely. If it hits a hard stop before reaching the edge, investigate that exact spot with your flashlight.</li>
    <li>Use a pair of long tweezers to extract any debris you find.</li>
</ol>

<h2>Fix 2: The Scanner Lid Cable</h2>
<p>On some Epson models, lifting the scanner lid too forcefully can pull the white ribbon cable that connects the scanner to the motherboard slightly out of its socket. If the motherboard cannot communicate with the scanner during the boot sequence, it will throw an E-01 error, halting the entire boot process.</p>
<p>Look at the hinges of your scanner lid. You will see a flat white cable routing down into the chassis. Ensure this cable is not torn, crimped, or sitting crooked. If you are comfortable taking off the side panel, reseating this cable on the motherboard often cures phantom E-01 errors.</p>

<h2>Fix 3: The Dislocated Encoder Strip</h2>
<p>Behind the printhead carriage is a thin, clear plastic ribbon called the encoder strip. The carriage has an optical sensor that reads this strip to know where it is. If you recently reached into the printer to pull out a paper jam, you may have accidentally bumped this strip and knocked it off its spring hooks.</p>
<p>If the strip is dangling loosely, the printer is completely blind. When it turns on, the carriage will slam violently into the left or right wall, make a terrible grinding noise, and immediately throw Error E-01.</p>
<p>To fix this, you must carefully reattach the encoder strip. It hooks onto a small metal tab on the left side, and a tiny metal spring on the right side. Ensure the strip passes exactly through the optical slot on the back of the printhead carriage, not just resting against it.</p>

<h2>When to Call a Professional</h2>
<p>If there are absolutely no obstructions, the encoder strip is perfectly clean and attached, and the scanner cable is seated, but the printer still throws E-01 immediately upon startup, the carriage motor itself may have died, or the motherboard has suffered a short. At this point, the repair requires parts replacement and deeper electronic diagnostics.</p>`
  },
  {
    title: "Epson EcoTank Not Printing Black Ink (Deep Fixes)",
    slug: 'epson-ecotank-not-printing-black-ink',
    seoTitle: "Fix Epson EcoTank Not Printing Black Ink",
    metaDescription: "Is your Epson EcoTank printing colors perfectly but skipping black ink entirely? Learn how to fix pigment clogs, prime dampers, and restore black printing.",
    excerpt: "Epson EcoTanks are notorious for suddenly refusing to print black ink while colors work fine. This is due to the physical differences between pigment black and dye colors.",
    errorCode: null,
    tags: 'Epson, EcoTank, Black Ink, Not Printing, Blank Pages, Pigment Ink, Clog, Syringe',
    wordCount: 1200,
    difficultyLevel: 'Intermediate',
    timeToFix: '30 minutes',
    categoryId: inkCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "To fix an Epson EcoTank not printing black ink: 1) Verify the black ink tank isn't physically empty. 2) Run a standard Head Cleaning cycle, but do not run more than two in a row. 3) If it still fails, the black pigment ink is likely clogged in the printhead. Turn the printer off, place a paper towel under the printhead, and use a syringe with a silicone tube to gently push Windex or printhead cleaner directly into the black ink port. Let it sit for 30 minutes, then run a cleaning cycle.",
    content: `<h2>Why Only the Black Ink Fails</h2>
<p>It is incredibly frustrating: your Epson EcoTank is full of ink, your color photos print gorgeously, but any Word document you try to print comes out completely blank. The printer goes through all the motions, makes all the right sounds, but no black ink hits the page.</p>
<p>This happens because Epson uses two entirely different types of ink in the same machine. Cyan, Magenta, and Yellow are usually <strong>Dye-based inks</strong> (they are water-soluble liquids). The Black ink, however, is usually <strong>Pigment-based</strong>. Pigment ink is made of microscopic solid plastic particles suspended in liquid, designed to make text look crisp and waterproof. Because it contains solids, pigment ink dries incredibly hard. If you don't print a black text document for a few weeks, the pigment particles settle, dry out, and form a cement-like plug in the microscopic printhead nozzles.</p>

<h2>Fix 1: The Windex Soak (Dissolving the Pigment)</h2>
<p>Standard head cleaning cycles use suction to pull ink through the nozzles. If the pigment has hardened into a plug, suction won't break it. You must chemically dissolve the plug. Ammonia-based glass cleaners (like Windex) are highly effective at breaking down Epson pigment ink.</p>
<ol>
    <li>Unplug the printer and open the main lid.</li>
    <li>Manually slide the printhead carriage to the center of the rail.</li>
    <li>Look at the far right side of the printer where the carriage normally rests. You will see a small, rectangular sponge pad. This is the <strong>capping station</strong>.</li>
    <li>Take a syringe or a medicine dropper, and drip Windex directly onto that sponge until it forms a small puddle.</li>
    <li>Slide the printhead carriage back to the far right, parking it directly over the puddle of Windex.</li>
    <li>Leave the printer unplugged for at least 12 hours (overnight is best). The ammonia fumes will rise into the printhead nozzles and dissolve the hardened pigment.</li>
    <li>The next day, plug the printer in, run <strong>one</strong> standard Head Cleaning cycle, and print a nozzle check.</li>
</ol>

<h2>Fix 2: Manually Flushing the Black Channel</h2>
<p>If the overnight soak didn't work, the clog is deep inside the channel. You must force cleaner through it manually.</p>
<div class="alert alert-warning">
<strong>Warning:</strong> Pushing too hard with a syringe can permanently burst the internal walls of the printhead. You must use gentle, steady pressure.
</div>
<ol>
    <li>Purchase a printhead cleaning kit online (it consists of a syringe, a piece of silicone tubing, and cleaning fluid).</li>
    <li>Unplug the printer and slide the carriage to the center.</li>
    <li>Remove the plastic cover over the printhead carriage and unclip the Black ink damper (the small plastic cartridge the tube attaches to). Lift it out of the way.</li>
    <li>You will now see a small plastic spike sticking up from the printhead. This is the ink intake port for the black channel.</li>
    <li>Fold a piece of paper towel and slide it underneath the printhead carriage to catch the mess.</li>
    <li>Attach the silicone tube to the syringe, fill the syringe with 3ml of warm cleaning fluid or Windex, and slide the other end of the tube securely over the black ink intake port.</li>
    <li><strong>Gently</strong> push the plunger down. You should feel slight resistance, followed by a steady flow. If it is completely bricked and you cannot push the plunger, do not force it. Let the fluid sit in the tube for 10 minutes to dissolve the top of the plug, then try again.</li>
    <li>Once the fluid goes through, reassemble the damper, run a Head Cleaning cycle to re-prime the black ink from the tank into the head, and print a test page.</li>
</ol>

<h2>Fix 3: Priming the Damper (Air in the Lines)</h2>
<p>If there is no clog, your black ink line might simply be full of air. Look at the translucent silicone tube carrying the black ink from the tank to the printhead. If you see massive air gaps, the printhead is starving for ink.</p>
<p>To fix this, unclip the black damper from the printhead. Insert a blunt syringe tip into the bottom valve of the damper and pull the plunger back. You will suck the air out of the tube and draw black ink from the tank into the damper. Once the damper is full of liquid, reseat it on the printhead.</p>`
  },
  {
    title: "Epson Printer Error Code 000041: Foreign Object & Encoder Strip",
    slug: 'epson-error-code-000041-fix',
    seoTitle: "Fix Epson Error 000041: Paper Jam & Encoder Strip",
    metaDescription: "Epson error code 000041 prevents your printer from operating. Learn how to clear hidden obstructions and clean the encoder strip to fix this fatal error.",
    excerpt: "Error 000041 is a common Epson initialization error. It occurs when the printhead carriage cannot confirm its home position due to a jam or a dirty sensor.",
    errorCode: '000041',
    tags: 'Epson, 000041, Error Code, Paper Jam, Encoder Strip, Initialization',
    wordCount: 1000,
    difficultyLevel: 'Beginner',
    timeToFix: '15 minutes',
    categoryId: errorCategory,
    authorId: authors.david,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix Epson error code 000041: 1) Turn off the printer. 2) Open the scanner bed and check the far-right side (the parking station) for crumpled paper or debris blocking the printhead from returning home. 3) Clean the clear plastic encoder strip running behind the printhead carriage with a lint-free cloth and isopropyl alcohol. 4) Restart the printer.",
    content: `<h2>What Causes Error 000041?</h2>
<p>When you turn your Epson printer on, it runs through a self-diagnostic routine. The printhead carriage slides to the left, slides to the right, and parks itself at its "home" station. If the printer cannot complete this exact sequence in the expected amount of time, it throws <strong>Error Code 000041</strong> and halts all operations.</p>
<p>This code specifically means there is a physical impedance preventing the carriage from moving, or a sensory failure preventing the printer from knowing where the carriage is.</p>

<h2>Fix 1: The Hidden "Home Station" Jam</h2>
<p>The most common cause of 000041 is a small piece of paper jammed in the worst possible spot: the far-right parking station.</p>
<p>When paper jams, users pull it out from the front or rear. Often, a tiny corner of the page tears off and falls into the capping station mechanics on the far right. When the printhead tries to park, it hits this scrap of paper, fails to lock in, and triggers 000041.</p>
<ol>
    <li>Turn the printer off and unplug it.</li>
    <li>Open the main access lid.</li>
    <li>If the printhead is locked on the right, you may need to gently rotate the plastic gear on the far left of the printer to unlock it, then slide the carriage to the center.</li>
    <li>Take a strong flashlight and illuminate the far right docking area. Use tweezers to extract any torn paper, staples, or heavy dust bunnies you see down in the mechanics.</li>
</ol>

<h2>Fix 2: Cleaning the Encoder Strip</h2>
<p>If the path is completely clear, the printer might be blind. The printhead uses an optical sensor to read the <strong>encoder strip</strong> (a clear plastic ribbon with microscopic vertical lines spanning the width of the printer).</p>
<p>If ink mist or grease covers a section of this strip, the sensor loses its place. It suddenly thinks the carriage is in the middle of the printer when it is actually hitting the wall, triggering an immediate 000041 fault.</p>
<ol>
    <li>Locate the clear plastic strip directly behind the metal carriage rail.</li>
    <li>Moisten a microfiber cloth with isopropyl alcohol or window cleaner.</li>
    <li>Pinch the strip gently with the cloth and wipe from one end to the other.</li>
    <li>Wait a few minutes for it to dry, plug the printer in, and turn it on.</li>
</ol>

<h2>Fix 3: The Pump Assembly Gear</h2>
<p>On older Epson models, error 000041 can be triggered by a failing ink pump assembly. On the far left of the printer, there is a complex set of white plastic gears that drive the paper feed and the ink suction pump. If a tooth shears off one of these gears, or if the mechanism binds up due to dried ink, the initialization sequence fails.</p>
<p>With the printer unplugged, try manually turning the large gear on the left side. It should turn with moderate resistance. If it is completely seized, the pump assembly has failed and requires replacement or deep cleaning.</p>`
  },
  {
    title: "Epson Printer Banding Lines Fix (Horizontal & Vertical)",
    slug: 'epson-printer-banding-lines-fix',
    seoTitle: "Fix Epson Printer Banding Lines (Horizontal & Vertical)",
    metaDescription: "Are your Epson prints ruined by white horizontal lines or blurry vertical banding? Learn the difference between clogged nozzles and encoder strip timing issues.",
    excerpt: "Banding is the most common print quality issue on Epson printers. Discover why horizontal lines mean ink starvation, and vertical lines mean alignment failures.",
    errorCode: null,
    tags: 'Epson, Banding, White Lines, Print Quality, Printhead Alignment, Encoder Strip, Clog',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: '15 minutes',
    categoryId: printQualityCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "To fix banding lines on an Epson printer, first determine the direction of the lines. For Horizontal Banding (lines crossing left to right), the issue is clogged printhead nozzles; run a Nozzle Check and perform a Head Cleaning cycle to restore ink flow. For Vertical Banding (lines running top to bottom, or wavy text), the issue is mechanical timing; clean the clear plastic encoder strip inside the printer with isopropyl alcohol and run the Printhead Alignment utility.",
    content: `<h2>Diagnosing the Type of Banding</h2>
<p>Nothing ruins a photo print faster than banding—those distinct, repeating lines that cut across your image. To fix banding on an Epson printer, you first have to diagnose what kind of banding you have, because the solutions are entirely different.</p>
<ul>
    <li><strong>Horizontal Banding:</strong> These lines run parallel to the way the printhead moves (left to right). They usually manifest as distinct white streaks or gaps in solid colors. This is almost always an <strong>ink flow problem</strong>.</li>
    <li><strong>Vertical Banding:</strong> These lines run perpendicular to the printhead (top to bottom). They usually manifest as blurry, wavy, or misaligned vertical edges in photos, or shadow text. This is a <strong>mechanical timing problem</strong>.</li>
</ul>

<h2>Fixing Horizontal Banding (White Streaks)</h2>
<p>Horizontal white lines mean that specific microscopic nozzles on your printhead are not firing ink. As the carriage moves across the page, the dead nozzles leave a blank trail.</p>
<h3>Step 1: The Nozzle Check</h3>
<p>Go to your printer's maintenance menu and print a <strong>Nozzle Check Pattern</strong>. This will print a staggered grid of lines for every color. Look closely at the grid. If you see breaks, gaps, or missing steps in the stair-step pattern, you have clogged nozzles.</p>
<h3>Step 2: Standard Head Cleaning</h3>
<p>Run a standard Head Cleaning cycle from the menu. This uses suction to pull fresh ink through the nozzles, blasting out dried clogs. Print another Nozzle Check. If it improves, run one more cleaning.</p>
<div class="alert alert-warning">
<strong>Warning:</strong> Never run more than 3 head cleanings in a row. It wastes massive amounts of ink, fills your maintenance box, and can actually introduce air bubbles into the printhead. If 3 cleanings don't fix it, let the printer sit idle for 12 hours to let the cleaning solvent dissolve the clog, then try again.
</div>
<h3>Step 3: Power Ink Flushing (EcoTanks)</h3>
<p>If you have an EcoTank and your tubes are full of air bubbles, a standard cleaning won't work. You must run the <strong>Power Cleaning</strong> (or Power Ink Flushing) utility to aggressively pump the air out of the lines. Note that this consumes up to 20% of your ink tanks in one go.</p>

<h2>Fixing Vertical Banding (Wavy Lines & Blurry Edges)</h2>
<p>If your vertical lines look wavy, or if straight architectural lines in photos look like they have jagged edges, the printer is firing ink at the wrong microsecond.</p>
<h3>Step 1: Clean the Encoder Strip</h3>
<p>The printhead knows exactly when to fire ink by reading a clear plastic ribbon with microscopic vertical lines running behind the carriage rail (the Encoder Strip). If this strip has a smudge of fingerprint grease or ink mist on it, the optical sensor gets confused and fires the ink a millimeter too late, causing jagged vertical banding.</p>
<ol>
    <li>Unplug the printer and lift the lid.</li>
    <li>Locate the clear plastic ribbon behind the metal rail.</li>
    <li>Wipe it gently from left to right using a microfiber cloth and a drop of isopropyl alcohol.</li>
</ol>
<h3>Step 2: Printhead Alignment</h3>
<p>Epson printers print bi-directionally (they lay down ink moving left, and also moving right). If the software timing between these two passes drifts out of sync, vertical lines will misalign.</p>
<ol>
    <li>Go to the printer's maintenance menu.</li>
    <li>Select <strong>Printhead Alignment</strong>.</li>
    <li>The printer will print several rows of numbered boxes with vertical lines in them.</li>
    <li>Select the number of the box in each row that has the straightest, most seamless vertical lines. This recalibrates the printer's software timing and eliminates vertical banding.</li>
</ol>`
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
          brandId: epsonBrandId,
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
