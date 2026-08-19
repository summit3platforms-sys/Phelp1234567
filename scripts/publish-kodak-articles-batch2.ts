import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const kodakBrandId = 'c5730c9d-dbad-4368-ad1c-9a44ecf890bc';
const errorCodesCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df'; // Error Codes & Alerts
const paperHandlingCategory = '9a42c554-2b4f-47f8-887e-5996fb83cbad'; // Paper Handling Issues
const printingProblemsCategory = '0e7ca2ba-24ae-4bf9-9ca7-072b36154911'; // Printing Problems

// Authors
const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Kodak Printer Error Code 3528? Paper Jam & Sensor Fixes",
    slug: 'kodak-printer-error-code-3528',
    seoTitle: "Kodak Printer Error Code 3528: Paper Jam & Sensor Fixes",
    metaDescription: "Stuck on Kodak printer error 3528? Learn how to clear hidden paper jams, align paper feed sensors, and reset your ESP or Hero printer quickly.",
    excerpt: "Kodak printer error 3528 indicates a paper jam or a sensor blockage. A hardware specialist explains how to inspect the feed path, clean the opto-sensors, and perform a complete system reset.",
    errorCode: '3528',
    tags: 'Kodak, Error 3528, Paper Jam, Sensor, ESP, Hero',
    wordCount: 810,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: errorCodesCategory,
    authorId: authors.elena,
    reviewerId: authors.alex,
    featuredImage: null,
    featuredImageAlt: 'Inspecting paper path of a Kodak printer showing error code 3528',
    featuredImageCaption: 'Kodak printer error 3528 sensor troubleshooting',
    featuredSnippet: 'Kodak printer error 3528 indicates a paper jam detected by the internal optical sensors. To fix: 1) Turn off the printer and open the rear access door. 2) Gently check for and remove any paper scraps or dust near the roller sensors. 3) Clean the opto-sensor window with dry compressed air. 4) Perform a hard 60-second power cycle.',
    content: `<p>Kodak printer error code 3528 is a common status alert that halts all printing operations. On Kodak ESP and Hero machines, this error corresponds to a paper jam detected by the internal sensors. However, many users get frustrated when the error refuses to clear even after removing the visible paper. This guide covers how to clear hidden paper paths, troubleshoot faulty optical sensors, and perform a system reset.</p>

<h2>What Error 3528 Actually Means</h2>
<p>Kodak inkjets rely on tiny infrared optical sensors (often called opto-interrupters) positioned along the paper feed path to track paper progress. If a sensor remains blocked after a print job finishes, or fails to detect the paper advancing within the expected millisecond window, the mainboard flags error 3528. This means the code can be triggered by a genuine mechanical jam, a tiny torn shred of paper hiding inside a sensor slot, or a heavy coating of paper dust clouding the sensor's optical eye.</p>

<h3>Paper Path Sensor Locations</h3>
<p>To troubleshoot effectively, you must inspect all three critical sensor zones:</p>
<ul>
  <li><strong>Zone 1 (Input Tray Sensor):</strong> Located under the paper input tray, detecting when paper enters the feed rollers.</li>
  <li><strong>Zone 2 (Under-Carriage Sensor):</strong> Positioned inside the main cavity beneath the printhead path. This detects paper travel through the print zone.</li>
  <li><strong>Zone 3 (Rear Output Sensor):</strong> Located near the rear duplex assembly and output rollers.</li>
</ul>

<h2>Fix 1: The Rear Access and Duplex Clearing Routine</h2>
<p>Most hidden jams sit in the rear duplex path, out of sight from the front trays. To clear them:</p>
<ol>
  <li>Power off the printer and disconnect the power cord.</li>
  <li>Locate the rear access door or duplex accessory on the back of your Kodak printer.</li>
  <li>Depress the latch buttons and pull the rear door panel straight off the machine.</li>
  <li>Peer inside the exposed rollers with a flashlight. Look for crumpled sheets, partial tears, or tiny paper fibers.</li>
  <li>If paper is caught, **pull it gently in the direction of the paper path** using both hands to avoid tearing. Never pull backward.</li>
  <li>Reattach the rear door panel securely until it clicks.</li>
</ol>

<h2>Fix 2: Clear and Clean the Optical Sensors</h2>
<p>If there is no physical paper inside the path, paper dust is likely clouding the sensor. To clean the sensors:</p>
<ol>
  <li>With the printer unplugged, open the main access cover.</li>
  <li>Look for the small black plastic sensor arms (flag sensors) along the paper path. These are physical levers that paper pushes down as it moves.</li>
  <li>Verify that the plastic arm swings freely and is not stuck in the down position. If it is stuck, gently nudge it with a clean plastic tool until it springs back up.</li>
  <li>Use a can of dry compressed air to blow dust out of the optical sensor gaps located near the base of the sensor arms.</li>
</ol>

<div class="alert-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>Warning:</strong> Never insert cotton swabs or metal pins directly into the optical sensor slots. You can easily bend the delicate spring contacts or misalign the infrared receiver diode.
</div>

<h2>Fix 3: Execute a Sensor Re-Calibration Power Reset</h2>
<p>Once you are certain the path is clear, perform a hard reset to force the printer's firmware to re-read the sensor states:</p>
<ol>
  <li>Unplug the power cable from the wall.</li>
  <li>Hold down the printer's physical **Power** button for 15 seconds to discharge residual power.</li>
  <li>Leave the printer unplugged for a full 2 minutes.</li>
  <li>Plug the power cord directly into a wall outlet, bypass any extension cables, and power on.</li>
</ol>`,
    faqs: JSON.stringify([
      { question: 'Why does error 3528 persist when there is no paper in the printer?', answer: 'This is usually caused by paper dust coating the optical sensor, or a small paper scrap hiding deep inside the duplex rollers. Clean the path with compressed air.', order: 1 },
      { question: 'Can paper weight cause error 3528?', answer: 'Yes. Heavy cardstock or very thin paper can fail to trigger the sensor arms correctly, causing timing mismatches that trigger a jam code.', order: 2 },
      { question: 'What is a flag sensor?', answer: 'A tiny plastic lever that paper physically presses down as it moves. If it gets stuck or dislodged, the printer assumes a jam is present indefinitely.', order: 3 }
    ])
  },
  {
    title: "Kodak Printer Paper Feed Jam: Step-by-Step Clearing Guide",
    slug: 'kodak-printer-paper-feed-jam-fix',
    seoTitle: "How to Clear Kodak Printer Paper Feed Jams Safely",
    metaDescription: "Paper stuck in your Kodak printer? A repair technician walks through clearing jams in the feed path, rear duplex, and rollers step by step.",
    excerpt: "A paper feed jam on a Kodak printer requires careful, directional extraction to avoid damaging the rollers or tearing internal components. Follow this tech-guided walkthrough.",
    errorCode: 'Paper Jam',
    tags: 'Kodak, Paper Jam, Troubleshooting, Rollers, Duplex',
    wordCount: 790,
    difficultyLevel: 'Beginner',
    timeToFix: '10-15 minutes',
    categoryId: paperHandlingCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredImage: null,
    featuredImageAlt: 'Clearing a paper jam from the front input tray of a Kodak printer',
    featuredImageCaption: 'How to clear a Kodak paper feed jam',
    featuredSnippet: 'To clear a Kodak paper feed jam: 1) Turn off the printer, 2) Open the front input/output tray, 3) Open the rear access panel, 4) Gently pull the paper forward in the normal direction of feed, 5) Verify rollers are clear of paper fragments, 6) Close panels and restart.',
    content: `<p>Paper feed jams are among the most common physical issues on Kodak ESP and Hero printers. Because these printers are older, the rubber rollers can lose their grip, causing paper to slip, crumple, and jam mid-feed. If you clear a jam incorrectly by pulling the paper backward or using force, you risk breaking the feed gears or misaligning the paper sensors. This guide shows you how to clear jams safely, step by step.</p>

<h2>Understanding the Paper Path</h2>
<p>To avoid damaging your printer, you must understand how paper moves through the machine. Kodak printers pull paper from the bottom input tray, loop it up through the print carriage zone (where the printhead deposits ink), and output it onto the top tray. Many models also route paper through a rear duplex assembly for double-sided printing.</p>

<div class="warning-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>Technician Rule #1:</strong> Always pull stuck paper in the direction of the paper path (forward, toward the output tray). Pulling paper backward against the feed gears can strip the drive motors or damage the delicate rubber rollers.
</div>

<h2>Step-by-Step Jam Clearing Guide</h2>

<h3>Step 1: Disconnect the Power</h3>
<p>Never clear a paper jam while the printer is plugged in. The carriage may move unexpectedly, trapping your fingers or damaging the carriage belt.</p>

<h3>Step 2: Clear the Input and Output Trays First</h3>
<ol>
  <li>Gently remove any loose paper from the bottom input tray.</li>
  <li>Check the output tray for paper jammed near the exit rollers. If visible, pull it forward gently with both hands.</li>
</ol>

<h3>Step 3: Inspect the Rear Access Panel</h3>
<p>If paper is stuck between the trays and the carriage, it is usually accessible from the back:</p>
<ol>
  <li>Turn the printer around to access the back panel.</li>
  <li>Find the latch on the rear access door (or duplexer) and pull it off.</li>
  <li>If paper is visible here, grab it by both corners and pull it **down and out** toward the floor. Wiggle it slightly to release it from the roller tension.</li>
  <li>Examine the black rubber rollers on the door and inside the printer. Wipe them with a dry cloth if you see paper dust.</li>
  <li>Reinstall the rear door securely.</li>
</ol>

<h3>Step 4: Check the Printhead Carriage Zone</h3>
<ol>
  <li>Open the main access cover.</li>
  <li>If the printhead carriage is sitting over the jammed paper, gently slide the carriage to one side by hand to expose the sheet.</li>
  <li>Gently pull the paper upward out of the print zone.</li>
</ol>

<h3>Step 5: Inspect Rollers for Fragments</h3>
<p>Often, a paper jam tears, leaving a small piece behind. This shred will continue to trigger jam errors. Run your fingers along the feed rollers to verify the path is 100% clean.</p>

<h2>Common Causes of Recurring Jams</h2>
<table class="diagnostic-table">
  <thead>
    <tr>
      <th>Issue</th>
      <th>Explanation</th>
      <th>Remedy</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Paper Static</strong></td>
      <td>Sheets stick together in warm or humid rooms</td>
      <td>Fan the paper stack before loading it</td>
    </tr>
    <tr>
      <td><strong>Dusty Rollers</strong></td>
      <td>Paper dust builds up on the rubber feed rollers</td>
      <td>Clean rollers with distilled water (Fix in loading guide)</td>
    </tr>
    <tr>
      <td><strong>Warped Paper</strong></td>
      <td>Moisture in the paper causes curling</td>
      <td>Store paper in a dry, sealed package</td>
    </tr>
  </tbody>
</table>`,
    faqs: JSON.stringify([
      { question: 'Why does my Kodak printer say paper jam when the path is empty?', answer: 'This is usually caused by a tiny scrap of paper caught under one of the optical sensor arms, or dust blocking the sensor path. Clean the optical sensors with compressed air.', order: 1 },
      { question: 'Can I use tweezers to pull out stuck paper?', answer: 'Use caution. Metal tweezers can scratch the rubber rollers or puncture the plastic guide ribs. If you must use them, be extremely gentle.', order: 2 },
      { question: 'Why does my printer jam every time I print double-sided?', answer: 'The rear duplex door may be loose or the duplex roller gears are slipping. Remove the duplex panel and verify the gears are intact and seated correctly.', order: 3 }
    ])
  },
  {
    title: "Kodak Printer Error 6102 (Document Feeder Jam)? How to Fix",
    slug: 'kodak-printer-error-6102',
    seoTitle: "How to Fix Kodak Printer Error 6102 Document Feeder Jam",
    metaDescription: "Getting error code 6102 on your Kodak Hero or ESP printer? A technician explains how to clear the automatic document feeder (ADF) rollers and sensors.",
    excerpt: "Kodak printer error 6102 indicates a paper jam in the Automatic Document Feeder (ADF). Learn how to clear ADF obstructions, clean feed rollers, and reset the scanner error.",
    errorCode: '6102',
    tags: 'Kodak, Error 6102, ADF, Document Feeder, Scanner, Hero',
    wordCount: 750,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: errorCodesCategory,
    authorId: authors.marcus,
    reviewerId: authors.david,
    featuredImage: null,
    featuredImageAlt: 'Opening the ADF cover on a Kodak Hero printer to check for jams',
    featuredImageCaption: 'Troubleshooting Kodak scanner error 6102',
    featuredSnippet: 'Kodak printer error 6102 occurs when paper is stuck in the Automatic Document Feeder (ADF). To fix: 1) Lift the ADF top cover, 2) Carefully pull out the jammed document with both hands, 3) Wipe the feed rollers with a dry microfiber cloth, 4) Close the cover and press OK on the control panel.',
    content: `<p>Kodak printer error 6102 is specific to All-in-One models equipped with an Automatic Document Feeder (ADF), such as the ESP 7, ESP 9, and Hero 7.1/9.1. It indicates that the document feeder has experienced a paper jam or a roller slip. This prevents the scanner from feeding sheets for scanning or copying. Here is how to resolve the ADF error code 6102.</p>

<h2>What Causes Error 6102?</h2>
<p>The ADF uses a series of small rubber rollers and a separator pad to pull individual sheets of paper from the top scanner tray, slide them past the scanner glass, and output them below. Error 6102 triggers if the scanner sensors do not detect the paper advancing, or if the mechanical gears detect resistance. This can be caused by thick documents, staples, paper clips, or accumulated dust on the pickup rollers.</p>

<h2>Fix 1: Open the ADF Cover and Clear Jams</h2>
<p>Never pull paper out of the ADF entry slot without opening the hatch first, as this can damage the tiny plastic gear teeth inside the assembly.</p>
<ol>
  <li>Remove any un-scanned sheets from the ADF input tray.</li>
  <li>Locate the latch on the top cover of the ADF assembly and lift the cover open fully.</li>
  <li>Look inside for any jammed paper, torn scraps, or debris.</li>
  <li>Gently pull the jammed sheet forward (in the direction of normal page feed) with both hands.</li>
  <li>Verify that the green plastic rollers are clear of paper fragments.</li>
  <li>Close the ADF cover firmly until you hear a click.</li>
</ol>

<h2>Fix 2: Clean the ADF Rollers and Separator Pad</h2>
<p>Dust and paper fibers can coat the rubber feed rollers, making them slick. Slick rollers slip on the paper, triggering error 6102 because the page fails to move.</p>
<ol>
  <li>Open the ADF cover.</li>
  <li>Locate the rubber pickup rollers and the small rubber separator pad directly beneath them.</li>
  <li>Slightly dampen a clean, lint-free microfiber cloth with distilled water. **Do not use alcohol**, as it can dry out and crack the rubber rollers over time.</li>
  <li>Wipe the rollers, rotating them by hand to clean the entire surface.</li>
  <li>Wipe the separator pad to remove ink residue and dust.</li>
  <li>Let the rollers dry completely (about 5 minutes) before closing the cover.</li>
</ol>

<div class="alert-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>Caution:</strong> Ensure you remove all staples or paper clips from your documents before placing them in the document feeder. Metal fasteners will tear the rollers and can scratch the scanner glass.
</div>

<h2>Fix 3: Clear the ADF Sensor</h2>
<p>If error 6102 continues when the ADF is completely empty, the document sensor may be dirty or stuck.</p>
<ol>
  <li>With the ADF cover open, look for the tiny plastic sensor lever that detects when paper is loaded in the input tray.</li>
  <li>Verify that the lever moves freely when pressed and springs back up.</li>
  <li>Use a can of compressed air to blow any dust out of the sensor gap.</li>
</ol>`,
    faqs: JSON.stringify([
      { question: 'Why does my Kodak printer show error 6102 when the ADF is empty?', answer: 'The ADF paper sensor lever is likely stuck in the down position, or dust is blocking the optical sensor. Inspect the sensor arm and clean with compressed air.', order: 1 },
      { question: 'Can I clean the ADF rollers with window cleaner?', answer: 'No. Ammonia-based window cleaners can degrade the rubber rollers, causing them to harden and fail. Use distilled water instead.', order: 2 },
      { question: 'What is the maximum paper capacity for the Kodak ADF?', answer: 'Most Kodak ADF trays are designed for a maximum of 30 to 45 sheets of standard paper. Overloading the tray will cause feed slips and trigger error 6102.', order: 3 }
    ])
  },
  {
    title: "Kodak Printer Loading Paper Error? Clean the Roller Assembly",
    slug: 'kodak-printer-loading-paper-error',
    seoTitle: "How to Fix Kodak Printer Loading Paper Errors",
    metaDescription: "Kodak printer showing 'Out of Paper' or failing to feed? A hardware technician explains how to clean pickup rollers and replace friction pads.",
    excerpt: "When your Kodak printer refuses to feed paper or constantly reports a loading error, dirty pickup rollers are the cause. Learn how to clean and restore them.",
    errorCode: 'Loading Paper Error',
    tags: 'Kodak, Out of Paper, Rollers, Maintenance, Feed Issues',
    wordCount: 820,
    difficultyLevel: 'Intermediate',
    timeToFix: '15-20 minutes',
    categoryId: paperHandlingCategory,
    authorId: authors.david,
    reviewerId: authors.elena,
    featuredImage: null,
    featuredImageAlt: 'Cleaning the paper feed rollers under the tray of a Kodak printer',
    featuredImageCaption: 'Cleaning paper pickup rollers',
    featuredSnippet: 'To fix a Kodak loading paper error: 1) Unplug the printer and remove the paper input tray, 2) Locate the rubber paper pickup rollers inside the bottom cavity, 3) Wipe the rubber rollers with a lint-free cloth dampened with distilled water, 4) Let them dry, and clean the separation pad before reassembly.',
    content: `<p>A "Loading Paper Error" or "Out of Paper" warning when the tray is full is a classic symptom of dirty or worn paper pickup rollers. Kodak printers draw paper using a set of rubber rollers that rotate against a stationary separation pad. Over time, paper dust, ink mist, and atmospheric grime coat the rubber rollers, making them slick and unable to grip the sheets. This guide shows you how to locate, clean, and restore your printer's roller assembly.</p>

<h2>Diagnostic Checklist: Friction Pad vs. Roller Wear</h2>
<p>Identify whether your feed issue is caused by the rollers or the separation pad:</p>

<table class="diagnostic-table">
  <thead>
    <tr>
      <th>Symptom</th>
      <th>Probable Root Cause</th>
      <th>Remedy</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Printer makes grinding noise but paper doesn't move</td>
      <td>Slick, dust-coated rubber rollers</td>
      <td>Clean pickup rollers with distilled water (Fix 1)</td>
    </tr>
    <tr>
      <td>Printer grabs multiple sheets of paper at once</td>
      <td>Worn or slick separation pad</td>
      <td>Clean/rough up the separation pad (Fix 2)</td>
    </tr>
    <tr>
      <td>Single sheet feeds partway and stops immediately</td>
      <td>Misaligned paper tray guides</td>
      <td>Adjust paper guides snug against stack (Fix 3)</td>
    </tr>
  </tbody>
</table>

<h2>Fix 1: Clean the Rubber Pickup Rollers</h2>
<p>To restore grip to the rubber rollers, you must clean them with distilled water. Avoid alcohol or chemicals, as they will dry out the rubber.</p>
<ol>
  <li>Power off the printer and disconnect the power cord.</li>
  <li>Remove the paper input tray completely from the bottom of the printer.</li>
  <li>Turn the printer onto its side or back (carefully, ensuring the scanner lid is taped shut) to expose the bottom cavity.</li>
  <li>Locate the D-shaped rubber rollers in the center of the feed assembly.</li>
  <li>Dampen a lint-free microfiber cloth with **distilled water**. Wrap it around your finger.</li>
  <li>Wipe the rubber surface of the rollers. Rotate the rollers manually to clean the entire circumference. Wipe away all gray paper dust until the rubber looks black again.</li>
  <li>Let the rollers dry completely before reassembling.</li>
</ol>

<h2>Fix 2: Clean and Rough Up the Separation Pad</h2>
<p>The separation pad is the small cork or rubber square that sits beneath the rollers. Its job is to provide resistance so only one sheet feeds at a time. If it is slick, multiple sheets feed at once, causing a jam error.</p>
<ol>
  <li>Locate the separation pad (positioned on the bottom frame or inside the paper tray).</li>
  <li>Wipe the pad with a damp cloth to remove paper dust.</li>
  <li>If the pad is rubber and very slick, you can use a piece of fine-grit sandpaper (like 400 grit) to **very lightly** rub the pad surface. This restores the texture needed to separate sheets. Wiping clean with a dry cloth afterward is required.</li>
</ol>

<div class="alert-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>Warning:</strong> Do not use industrial rubber restorers or solvents like WD-40. These chemicals will dissolve the rubber rollers, turning them sticky and permanently ruining the feed mechanism.
</div>

<h2>Fix 3: Adjust the Tray Guides and Paper Stack</h2>
<p>Improperly loaded paper causes the feed rollers to grip the sheets unevenly, triggering loading errors.</p>
<ol>
  <li>Take the paper stack out of the tray. Fan the sheets to break static cling.</li>
  <li>Align the stack on a flat surface to ensure all edges are flush.</li>
  <li>Load the paper back into the tray.</li>
  <li>Slide the paper guides inward until they rest gently against the edges of the stack. If the guides are too tight, they will pinch the paper and prevent it from feeding; if too loose, the paper will feed crooked.</li>
</ol>`,
    faqs: JSON.stringify([
      { question: 'Why does my Kodak printer say out of paper when the tray is full?', answer: 'The rubber pickup rollers are coated in paper dust, making them too slick to grip and advance the paper. Cleaning them restores the grip.', order: 1 },
      { question: 'Can I use rubbing alcohol to clean the rollers?', answer: 'It is not recommended. Alcohol strips the natural plasticizers from rubber, causing the rollers to dry out, harden, and crack over time. Distilled water is the safest cleaner.', order: 2 },
      { question: 'How often should I clean the rollers?', answer: 'If you print frequently, clean the rollers every 6 to 12 months, or immediately whenever the printer starts failing to feed paper.', order: 3 }
    ])
  },
  {
    title: "Kodak Printer Printing Blank Pages? How to Restore Ink Flow",
    slug: 'kodak-printer-printing-blank-pages',
    seoTitle: "Why is My Kodak Printer Printing Blank Pages?",
    metaDescription: "Kodak printer feeding paper but printing completely blank pages? A technician shares fixes for ink cartridge seals, printhead clogs, and carriage issues.",
    excerpt: "When your Kodak printer outputs blank pages despite full ink cartridges, the problem lies in ink flow delivery. Learn how to clean contacts, vent cartridges, and verify the purge pump.",
    errorCode: 'Blank Pages',
    tags: 'Kodak, Blank Pages, Ink Flow, Purge Pump, Troubleshooting',
    wordCount: 830,
    difficultyLevel: 'Intermediate',
    timeToFix: '20 minutes',
    categoryId: printingProblemsCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    featuredImage: null,
    featuredImageAlt: 'Checking the ink cartridges inside a Kodak printer that is printing blank pages',
    featuredImageCaption: 'Troubleshooting Kodak blank page printing issues',
    featuredSnippet: 'If your Kodak printer is printing blank pages: 1) Verify that the yellow protective tape has been completely removed from the cartridge vent holes, 2) Run a printhead cleaning cycle to clear dry ink plugs, 3) Wipe the rear printhead circuit contacts with a dry microfiber cloth, 4) Check the purge pump operation.',
    content: `<p>A printer that feeds paper normally but outputs completely blank sheets can be highly confusing, especially if you have just installed fresh ink cartridges. On Kodak ESP and Hero printers, this symptom indicates a complete block in ink delivery — the print carriage is moving, but ink is not reaching the paper. Here is a technician-guided troubleshooting path to restore ink flow.</p>

<h2>Ink Flow Diagnostic Flowchart</h2>
<p>Work through these diagnostic steps in order to identify where the block is occurring:</p>

<div class="flowchart-box" style="background:#f8fafc; border:1px solid #cbd5e1; padding:1.25rem; borderRadius:8px; margin:1.5rem 0;">
  <h4 style="margin-top:0; color:#002d62;">🔍 Ink Flow Troubleshooting Path</h4>
  <p style="margin-bottom:0; font-size:0.95rem; line-height:1.6;">
    1. <strong>Check Cartridge Vents:</strong> Is the yellow protective tape removed? ➡️ If no, remove tape. If yes, go to step 2.<br>
    2. <strong>Inspect Nozzle Plate:</strong> Blot the printhead bottom on a wet paper towel. Does ink bleed out? ➡️ If no, perform a printhead soak. If yes, go to step 3.<br>
    3. <strong>Check Electrical Contacts:</strong> Wipe the gold contacts on the back of the printhead. ➡️ Test print. If still blank, go to step 4.<br>
    4. <strong>Inspect Purge Pump:</strong> Verify if the waste ink pump is operating and sucking ink during cleaning.
  </p>
</div>

<h2>Fix 1: Check and Clear Cartridge Vent Holes</h2>
<p>New ink cartridges have a protective plastic strip or tape covering the vent hole. If this tape is not removed, it creates a vacuum seal inside the cartridge, preventing ink from flowing out of the nozzle.</p>
<ol>
  <li>Remove both ink cartridges from the printer.</li>
  <li>Look at the top of each cartridge. You will see a small vent hole (often near a yellow plastic pull-tab).</li>
  <li>Verify that the yellow tape has been **completely peeled away**. Even a small scrap of tape left over the vent hole will stop ink flow.</li>
  <li>If the vent hole looks blocked with plastic debris, gently clear it using a clean pin.</li>
  <li>Reinstall the cartridges and print a test page.</li>
</ol>

<h2>Fix 2: Blot-Test the Printhead Nozzles</h2>
<p>If the cartridge vents are clear but pages are still blank, the printhead nozzles may have a solid plug of dried ink. You can perform a quick "blot test" to check:</p>
<ol>
  <li>Remove the printhead from the printer carriage.</li>
  <li>Fold a clean paper towel. Dampen it slightly with distilled water.</li>
  <li>Gently press the bottom of the printhead (the nozzle plate) onto the wet paper towel and hold it for 3 seconds.</li>
  <li>Look at the paper towel:
    *   **If you see two clear ink patterns** (black stripe and color stripes), ink is flowing through the printhead. The problem is electrical (Fix 3).
    *   **If the towel remains clean or shows faint dots**, the printhead nozzles are clogged. Perform our printhead wet soak guide to clear them.
  </li>
</ol>

<h2>Fix 3: Clean Rear Printhead Circuit Contacts</h2>
<p>If the printhead passes the blot test but still prints blank pages, the printer is failing to send print commands to the nozzles. This is caused by dirty copper circuit contacts.</p>
<ol>
  <li>Remove the printhead block.</li>
  <li>Locate the gold contact pads on the back of the printhead.</li>
  <li>Wipe them firmly with a dry, lint-free microfiber cloth. Ensure no grease or ink residue remains.</li>
  <li>Reinstall the printhead, pressing until it clicks securely, and retest.</li>
</ol>

<h2>Fix 4: Check the Purge Pump Operation</h2>
<p>Kodak printers use a vacuum pump to prime the nozzles and draw ink during cleaning cycles. If the purge tube is dislodged or blocked, the printer cannot prime the nozzles, resulting in blank pages.</p>
<ol>
  <li>Look at the far right of the carriage path (the parking station where the carriage sits when idle).</li>
  <li>Locate the small rubber caps that seal against the printhead nozzles.</li>
  <li>Ensure these rubber caps are clean and not dislodged. If they are filled with dried ink, wipe them clean with a damp cloth to restore the vacuum seal.</li>
</ol>`,
    faqs: JSON.stringify([
      { question: 'Why does my printer print blank pages after sitting unused?', answer: 'Ink has dried and solidified inside the micro-nozzles, forming a solid plug. Running printhead cleaning cycles or soaking the printhead is required to clear it.', order: 1 },
      { question: 'Can low ink levels cause completely blank pages?', answer: 'Yes, but usually the print quality fades gradually before going completely blank. If it went from normal to blank instantly, check the cartridge vents or contact pins.', order: 2 },
      { question: 'What does a failed blot test mean?', answer: 'It confirms that ink is physically unable to exit the printhead nozzles, either because the cartridges are empty or the printhead nozzles are severely clogged.', order: 3 }
    ])
  }
];

async function main() {
  for (const article of articles) {
    try {
      await prisma.article.deleteMany({
        where: { slug: article.slug }
      });
      console.log(`🧹 Cleared existing article for slug: ${article.slug}`);
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
          faqs: article.faqs,
          status: 'published',
          publishedAt: new Date(),
          brandId: kodakBrandId,
          categoryId: article.categoryId,
          authorId: article.authorId,
          reviewerId: article.reviewerId,
          reviewedAt: new Date(),
          featuredImage: article.featuredImage,
          featuredImageAlt: article.featuredImageAlt,
          featuredImageCaption: article.featuredImageCaption,
        }
      });
      console.log(`✅ Published: "${created.title}"`);
    } catch (e: any) {
      console.log(`⚠️ Error for "${article.title}": ${e.message}`);
    }
  }

  const total = await prisma.article.count({ where: { brandId: kodakBrandId } });
  console.log(`\nTotal Kodak articles now: ${total}`);
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
