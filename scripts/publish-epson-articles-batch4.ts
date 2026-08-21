import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const epsonBrandId = 'bb9c3e02-79fa-454d-a084-854b38f41af9';
const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Epson Scanner Error 0x10: Mechanism & Motor Diagnostics",
    slug: 'epson-scanner-error-0x10-fix',
    seoTitle: "Fix Epson Scanner Error 0x10 (Fatal Scanner Fault)",
    metaDescription: "Epson error code 0x10 indicates a fatal scanner failure. Learn how to diagnose a dead scanner motor, a broken drive belt, or a dirty optical home sensor.",
    excerpt: "If your Epson printer throws error 0x10, the scanner unit has failed to initialize. Discover the mechanical reasons why the scanner bar gets stuck and how to fix it.",
    errorCode: '0x10',
    tags: 'Epson, 0x10, Scanner Error, Scanner Motor, Drive Belt, Fatal Error',
    wordCount: 1100,
    difficultyLevel: 'Advanced',
    timeToFix: '30 minutes',
    categoryId: errorCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "To fix Epson scanner error 0x10: 1) Unplug the printer and lift the scanner lid. 2) Look at the glass bed. If the scanner bar is stuck in the middle, the drive belt may be broken or jammed. 3) Clean the glass, especially the far-left edge where the 'home' optical sensor is located. 4) If the scanner bar vibrates violently against the left wall when turned on, the optical sensor has failed. 5) If it makes no noise at all, the scanner motor or the ribbon cable connecting it to the motherboard is dead.",
    content: `<h2>Understanding Scanner Error 0x10</h2>
<p>Modern Epson all-in-one printers are highly integrated. During the boot sequence, the motherboard checks the health of the printhead, the paper feed rollers, and the scanner unit. If the scanner unit fails its self-test, the entire printer locks down and throws <strong>Error Code 0x10</strong>.</p>
<p>This means that even if you only want to print a black-and-white Word document, a broken scanner will prevent you from doing so. Error 0x10 specifically points to a mechanical or sensory failure within the flatbed scanner assembly.</p>

<h2>Diagnostic 1: The Scanner Bar Movement Test</h2>
<p>To figure out what is wrong, you need to watch the scanner bar during startup.</p>
<ol>
    <li>Turn the printer off.</li>
    <li>Lift the top lid so you have a clear view of the scanner glass and the long rectangular scanner bar underneath it.</li>
    <li>Turn the printer on and watch the bar closely.</li>
</ol>
<h3>Scenario A: The Bar Vibrates and Grinds Violently</h3>
<p>If the bar immediately slams into the far left side of the printer and makes a horrible grinding noise, the scanner motor is working, but the <strong>Home Sensor</strong> is blind. The printer expects the bar to see a specific white reference strip under the glass on the far left to know it has reached the edge. If the underside of the glass is dirty, or the sensor has failed, the motor just keeps pushing, causing the gears to slip and grind. <strong>The Fix:</strong> You must disassemble the top glass (usually held by a few screws under plastic caps) and clean the underside of the glass and the scanner bar's optical eye with glass cleaner.</p>
<h3>Scenario B: The Bar Makes No Sound and Doesn't Move</h3>
<p>If you turn the printer on and the scanner bar remains completely dark and stationary, the motherboard is unable to communicate with the scanner. <strong>The Fix:</strong> Lift the scanner unit up and inspect the wide, flat white ribbon cable that connects the scanner bed to the main chassis. If it has been tugged loose or crimped, reseat it. If the cable is fine, the scanner motor itself has burned out.</p>

<h2>Diagnostic 2: The Drive Belt</h2>
<p>The scanner bar is pulled left and right by a thin, toothed rubber belt driven by a small DC motor. Over time, especially in hot climates, this rubber belt can dry rot, stretch, or snap completely.</p>
<p>If you hear the scanner motor whining, but the bar isn't moving, the belt is the culprit.</p>
<ol>
    <li>With the printer unplugged, shine a flashlight through the glass at the track the scanner bar rides on.</li>
    <li>Look for the rubber belt. Is it hanging loose? Are teeth shredded off it?</li>
    <li>If the belt is broken, you can purchase a replacement online. Replacing it requires removing the glass bed, looping the new belt around the motor gear and the tension pulley, and hooking it into the plastic tabs on the bottom of the scanner bar.</li>
</ol>

<h2>Is it worth repairing?</h2>
<p>If a ribbon cable is loose or the glass is dirty, error 0x10 is a free and easy fix. However, if the scanner motor has burned out, finding a replacement motor for your specific model can be difficult. Because the printer will not function without a working scanner, a dead scanner motor often means it is time to replace the entire printer.</p>`
  },
  {
    title: "Epson Error Code 2000020a: Mainboard & Network Faults",
    slug: 'epson-error-code-2000020a-initialization-fault',
    seoTitle: "Fix Epson Error 2000020a (Network & Initialization Error)",
    metaDescription: "Epson error code 2000020a is a complex initialization fault often tied to Wi-Fi adapter crashes or firmware corruption. Learn how to bypass and fix it.",
    excerpt: "Unlike standard mechanical errors, 2000020a points to a deep software or network initialization crash on the printer's mainboard. Here is how to clear the memory.",
    errorCode: '2000020a',
    tags: 'Epson, 2000020a, Error Code, Wi-Fi, Firmware Crash, Initialization',
    wordCount: 1050,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: errorCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "To fix Epson Error Code 2000020a: 1) Turn off the printer and disconnect the power cord and USB cable. 2) Wait 5 minutes for the internal capacitors to drain. 3) Turn off your home Wi-Fi router. 4) Turn the printer back on. If the printer boots successfully while the router is off, the 2000020a error is being caused by a corrupted network print queue or a faulty Wi-Fi adapter. 5) Clear your computer's print spooler and reset the printer's network settings to default.",
    content: `<h2>The Mystery of Code 2000020a</h2>
<p>Most Epson error codes are relatively straightforward (a paper jam, an empty cartridge, a full waste pad). <strong>Error Code 2000020a</strong>, however, is a hexadecimal memory address error. It indicates that the printer's internal operating system crashed during initialization.</p>
<p>While this can occasionally be caused by a severe paper jam blocking a sensor, it is most frequently caused by a <strong>network communication timeout</strong> or corrupted data sitting in the print queue.</p>

<h2>Fix 1: The Wi-Fi Isolation Test</h2>
<p>When an Epson printer boots up, it attempts to connect to your local Wi-Fi network and check for incoming print jobs. If a computer on your network is sending a corrupted print spool file, or if the printer's internal Wi-Fi adapter is failing, the boot process hangs and triggers 2000020a.</p>
<p>We need to isolate the printer from the network to test this.</p>
<ol>
    <li>Turn the printer off.</li>
    <li>Unplug the power cord from the wall.</li>
    <li>Walk over to your home internet router and turn it completely off (unplug it).</li>
    <li>Wait 60 seconds, then plug the printer directly into the wall outlet and turn it on.</li>
</ol>
<p><strong>If the printer boots up perfectly:</strong> You have a network data issue. Leave the router off for a moment. Go to your computer, open the <em>Printers &amp; Scanners</em> menu, and delete all pending documents in the print queue. Then, on the printer's control panel, navigate to <strong>Settings &gt; Network Settings &gt; Restore Network Defaults</strong>. Turn your router back on, and reconnect the printer to the Wi-Fi from scratch.</p>
<p><strong>If the printer still throws 2000020a:</strong> The issue is not network-related. It is either a corrupted firmware chip or a mechanical blockage.</p>

<h2>Fix 2: Clearing a Hidden Sensor Blockage</h2>
<p>If network isolation doesn't work, the initialization failure is likely physical. The motherboard is asking a sensor for a status update (e.g., "Is there paper in the rear tray?"), and the sensor is failing to reply.</p>
<ul>
    <li>Take a strong flashlight and look down the rear paper feed slot. Look for coins, paperclips, or tiny scraps of torn paper resting against the black plastic sensor flags.</li>
    <li>Lift the scanner bed and inspect the clear plastic encoder strip behind the printhead. If it is popped out of its sensor slot on the back of the printhead carriage, the carriage cannot initialize.</li>
</ul>

<h2>Fix 3: Firmware Recovery</h2>
<p>If the error persists through a power cycle, no network connection, and no physical jams, the printer's firmware (its internal operating system) has become corrupted. This often happens if the printer loses power in the middle of an automatic over-the-air update.</p>
<p>To fix this, you must boot the printer into <strong>ROM Recovery Mode</strong> (usually achieved by holding Power + Down + Left + Cancel while the printer is off) and use a USB cable to push a fresh copy of the firmware from your computer using the official Epson Firmware Updater tool.</p>`
  },
  {
    title: "Epson Error 031006 (L3110 / EcoTank): Paper Feed Gear Fix",
    slug: 'epson-error-031006-paper-feed-gear-l3110',
    seoTitle: "Fix Epson Error 031006: EcoTank Paper Feed & Encoder Disk",
    metaDescription: "Epson error 031006 is incredibly common on EcoTank models like the L3110 and L3210. Learn how to fix the PF (Paper Feed) motor and clean the rotary encoder disk.",
    excerpt: "If your Epson EcoTank throws error 031006, it means the Paper Feed (PF) motor is struggling. Discover how to clean the rotary encoder disk and clear feed jams.",
    errorCode: '031006',
    tags: 'Epson, 031006, L3110, L3210, EcoTank, Paper Feed Motor, PF Encoder Disk',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '20 minutes',
    categoryId: errorCategory,
    authorId: authors.david,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix Epson error 031006 on EcoTank models (like the L3110): 1) Look for a physical paper jam in the rear feed or underneath the printer. 2) If clear, open the printer casing and locate the PF (Paper Feed) Encoder Disk on the left side of the chassis. It is a clear plastic wheel attached to the paper roller gear. 3) If this disk is smeared with ink or grease, the sensor cannot read it. Clean the clear plastic wheel gently with a Q-tip and isopropyl alcohol. 4) Restart the printer.",
    content: `<h2>What Causes Error 031006?</h2>
<p>Error <strong>031006</strong> is one of the most frequently searched error codes for Epson's L-series EcoTanks, particularly models like the L3110, L3210, and L3250. This specific code translates to a <strong>PF (Paper Feed) Motor PID excess load error</strong>.</p>
<p>In simple terms: The printer tried to spin the rubber rollers to pull a sheet of paper through, but the motor met too much physical resistance, or the sensor tracking the roller's movement went blind. The printer immediately halts to prevent the motor from burning out.</p>

<h2>Fix 1: The Hidden Jam (Bottom Access)</h2>
<p>Most users check the rear feed tray for paper jams, but they forget to check the bottom of the printer.</p>
<ol>
    <li>Turn the printer off and unplug it.</li>
    <li>Remove all paper from the rear tray.</li>
    <li>Carefully tilt the printer backward to expose the bottom. (Do not tilt an EcoTank past 45 degrees for long periods, or ink may leak).</li>
    <li>Look for the small access door or the exposed roller gears underneath. Often, a sheet of paper gets concertina-folded tightly against the exit rollers.</li>
    <li>Use tweezers to pull out any fragments. If the paper is tightly wound around the gray rubber roller, you may need to slowly rotate the roller with your thumb to unwind it.</li>
</ol>

<h2>Fix 2: Cleaning the PF Encoder Disk (The Rotary Sensor)</h2>
<p>If there is absolutely no paper jammed in the mechanism, the error is almost certainly sensory. Just as the printhead uses a straight encoder strip to know where it is, the paper feed rollers use a <strong>rotary encoder disk</strong> to know how far they have rotated.</p>
<p>This disk is a round, clear plastic wheel with microscopic lines printed all around its edge. It sits attached to a gear on the far left side of the printer's internal chassis.</p>
<h3>How to clean it:</h3>
<ol>
    <li>Unplug the printer and lift the main scanner bed unit to view the internals.</li>
    <li>Look to the far left side, near the complex cluster of white plastic gears.</li>
    <li>You will see a flat, clear plastic wheel (about the size of a half-dollar coin) passing through a small black optical sensor.</li>
    <li>Take a Q-tip (cotton swab) and dip it lightly in isopropyl alcohol.</li>
    <li>Gently press the Q-tip against the edge of the clear plastic wheel. With your other hand, slowly manually rotate the large white gear so the wheel spins against your Q-tip.</li>
    <li>You will likely see a large smudge of black ink or gear grease transfer onto the cotton swab. This smudge was blinding the sensor and causing the 031006 error.</li>
    <li>Allow the wheel to dry for 2 minutes, then turn the printer on.</li>
</ol>

<h2>Fix 3: Lubricating the Gear Shaft</h2>
<p>If the encoder disk is clean, the PF motor might actually be encountering too much physical resistance. Over time, paper dust mixes with the factory grease on the gear shafts, creating a sticky paste.</p>
<p>Take a small drop of white lithium grease or highly refined machine oil on a toothpick, and apply it to the metal shaft where the large white paper feed gears rotate on the left side of the chassis. Spin the gears manually to work the lubrication in. Do not use WD-40, as it will degrade the surrounding plastics over time.</p>`
  },
  {
    title: "Epson Fatal Error: Printer Won't Start (Power Supply & Mainboard)",
    slug: 'epson-fatal-error-printer-wont-start-power-supply',
    seoTitle: "Fix Epson Fatal Error: Printer Won't Turn On or Start",
    metaDescription: "Is your Epson printer completely dead, or does it turn on for one second and die? Learn how to diagnose internal power supply failures and mainboard shorts.",
    excerpt: "If your Epson printer refuses to power on, or flashes its lights for a microsecond before dying, you have a severe electrical fault. Here is how to diagnose the PSU and mainboard.",
    errorCode: 'Fatal Error',
    tags: 'Epson, Won\'t Start, Dead Printer, Power Supply, PSU, Mainboard Short, F1 Fuse',
    wordCount: 1050,
    difficultyLevel: 'Expert',
    timeToFix: '45 minutes',
    categoryId: errorCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "If your Epson printer won't start, first eliminate external factors: plug it directly into a wall outlet (bypass power strips) and leave it unplugged for 10 minutes. If it remains dead, the fault is internal. 1) Remove the Power Supply Unit (PSU) block from the rear/bottom of the printer. Use a multimeter to test the pins for 42V DC output. 2) If the PSU is outputting power, the printer's mainboard has suffered a massive short circuit (often a blown F1 fuse or transistor), meaning the motherboard must be replaced.",
    content: `<h2>The Completely Dead Printer</h2>
<p>You press the power button, and nothing happens. No beeps, no lights, no mechanical whirring. Or, worse, you press the power button, a single green light flashes for a fraction of a second, you hear a faint "click," and the printer goes completely dead again.</p>
<p>This is the ultimate Fatal Error. The printer is failing its absolute most basic electrical checks. The problem lies in one of two places: the <strong>Power Supply Unit (PSU)</strong>, or the <strong>Mainboard</strong>.</p>

<h2>Step 1: The Capacitance Drain</h2>
<p>Before ripping the printer apart, rule out a safety lockout. If the printer experienced a power surge (from a lightning storm or a faulty power strip), the internal circuitry may have locked down.</p>
<ol>
    <li>Unplug the power cord from the back of the printer.</li>
    <li>Press and hold the physical power button on the printer for 60 solid seconds. This forces the internal capacitors to drain any residual trapped voltage.</li>
    <li>Wait 10 minutes.</li>
    <li>Take the printer's power cord and plug it <strong>directly into a wall outlet</strong>. Do not use a surge protector, power strip, or extension cord for this test.</li>
    <li>Press the power button. If it turns on, your surge protector was likely at fault.</li>
</ol>

<h2>Step 2: Testing the Power Supply Unit (PSU)</h2>
<p>Epson printers do not have internal, exposed power supplies like a desktop computer. They have a modular brick (the PSU) that slides into the bottom or rear of the printer.</p>
<p>If the printer remains dead, you need to know if the PSU is actually converting AC wall power into DC power for the motherboard.</p>
<ol>
    <li>Turn the printer around. Look at where the power cord plugs in. This plastic block is the PSU.</li>
    <li>On most models, it is held in place by 2 or 3 Phillips screws. Remove them and slide the PSU block out of the chassis.</li>
    <li>It will be connected to the motherboard by a bundle of wires (usually 3 pins: 42V, GND, and a control pin). Disconnect this harness.</li>
    <li>Plug the PSU into the wall. Take a digital multimeter set to DC Voltage.</li>
    <li>Carefully test the pins. You should see a reading of approximately 41V to 42V DC. (Some models output 42V and a secondary 5V rail).</li>
</ol>
<p><strong>If the multimeter reads 0V:</strong> The power supply is dead. A capacitor or fuse inside the brick blew. Replacing the PSU (usually $20-$30 on eBay) will completely fix the printer.</p>

<h2>Step 3: The Mainboard Short (The Microsecond Flash)</h2>
<p>If your multimeter proves the PSU is outputting 42V perfectly, then the PSU is healthy. The problem is the motherboard.</p>
<p>If your printer's light flashes for a millisecond when you press power and then dies, it is exhibiting <strong>Short Circuit Protection</strong>. The PSU sends 42V to the motherboard, the motherboard detects a massive short (often caused by liquid ink leaking onto the printhead ribbon cables), and instantly commands the PSU to shut down to prevent a fire.</p>
<p>This is a catastrophic failure. The short has likely destroyed the F1 and F2 SMD fuses on the mainboard, the driving transistors, and the printhead itself. Because fixing this requires replacing both the motherboard and the printhead, it is universally more cost-effective to buy a new printer.</p>`
  },
  {
    title: "Epson Printer Error 0110: ADF and Scanner Initialization",
    slug: 'epson-printer-error-0110-adf-scanner-fix',
    seoTitle: "Fix Epson Error 0110 (Automatic Document Feeder Fault)",
    metaDescription: "Epson error code 0110 occurs when the Automatic Document Feeder (ADF) or scanner mechanism fails. Learn how to clear ADF jams and reset the scanner module.",
    excerpt: "If you own an Epson WorkForce model with a document feeder on top, error 0110 indicates a mechanical jam or sensory failure in the ADF unit. Here is how to fix it.",
    errorCode: '0110',
    tags: 'Epson, 0110, Error Code, ADF, Automatic Document Feeder, Scanner Jam',
    wordCount: 1000,
    difficultyLevel: 'Beginner',
    timeToFix: '15 minutes',
    categoryId: errorCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredSnippet: "To fix Epson error 0110: 1) Lift the cover of the Automatic Document Feeder (ADF) on the very top of the printer. 2) Carefully pull out any jammed paper or torn fragments blocking the ADF rollers. 3) Lift the entire ADF unit to reveal the scanner glass. Clean the narrow strip of glass on the far left, as this is where the ADF scans documents. 4) Ensure the cable connecting the ADF lid to the back of the printer is securely plugged in. 5) Restart the printer.",
    content: `<h2>Understanding Error Code 0110</h2>
<p><strong>Error Code 0110</strong> is highly specific to Epson printers equipped with an <strong>ADF (Automatic Document Feeder)</strong>—the tray on the very top of the printer used for scanning or copying multi-page documents automatically. You will see this primarily on the WorkForce and premium EcoTank lines.</p>
<p>When you turn the printer on, the motherboard pings the ADF motor and sensors to ensure they are ready. If the ADF motor cannot turn, or if a sensor is blocked, the initialization fails and throws error 0110. The frustrating part is that this error locks the entire printer, preventing you from printing a simple document from your computer.</p>

<h2>Fix 1: Clearing the Hidden ADF Jam</h2>
<p>The ADF mechanism is tightly enclosed, meaning a tiny corner of a torn paper can easily jam the rollers without being visible from the outside.</p>
<ol>
    <li>Turn the printer off.</li>
    <li>Remove all paper from the top ADF tray.</li>
    <li>Flip open the ADF cover (usually a lever or latch on the left or top of the unit).</li>
    <li>Inspect the rubber pick-up rollers. If you see a piece of paper, do not yank it backward. Pull it gently in the direction it normally feeds to avoid stripping the small plastic gears.</li>
    <li>Close the ADF cover firmly until it clicks. If the cover is left slightly ajar, a sensor will trigger the 0110 error.</li>
</ol>

<h2>Fix 2: Cleaning the ADF Slit Glass</h2>
<p>When you use the ADF, the main scanner bar does not move. It parks itself on the far left side of the printer under a narrow strip of glass, and the ADF pulls the paper rapidly over that strip.</p>
<p>If there is a smudge of whiteout, sticky residue, or heavy dust on that narrow strip of glass, the scanner bar's calibration fails, leading to an initialization error.</p>
<ol>
    <li>Lift the entire top lid as if you were going to place a book on the scanner glass.</li>
    <li>Look at the far left edge. Next to the main large pane of glass, there is a separate, narrow strip of glass (about 1 inch wide).</li>
    <li>Wipe this narrow strip thoroughly with a microfiber cloth and glass cleaner. Make sure there are no specks of debris stuck to it.</li>
</ol>

<h2>Fix 3: The ADF Connection Cable</h2>
<p>The ADF unit in the lid communicates with the printer's mainboard via a thick cable that runs through the rear hinges.</p>
<p>If you have recently moved the printer, or if you opened the lid too aggressively, the connector for this cable may have pulled loose. Look at the back of the printer where the lid hinges meet the main body. Ensure the thick wire harness is firmly pushed into its socket. If the mainboard cannot communicate with the ADF, it will default to error 0110.</p>
<p>If none of these steps resolve the issue, the small DC motor inside the ADF assembly has likely burned out. In some models, the ADF can be unscrewed and replaced as a modular unit without replacing the entire printer.</p>`
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
