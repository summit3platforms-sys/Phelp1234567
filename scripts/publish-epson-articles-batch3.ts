import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const epsonBrandId = 'bb9c3e02-79fa-454d-a084-854b38f41af9';
const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
const maintenanceCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';
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
    title: "Epson Printer Blinking Red Light (No Display): Decoding the Pattern",
    slug: 'epson-printer-blinking-red-light-no-display',
    seoTitle: "Fix Epson Printer Blinking Red Light (No Display Models)",
    metaDescription: "Is your Epson printer blinking a red light with no display screen? Learn how to decode the flash patterns for the Ink and Paper lights to fix the exact error.",
    excerpt: "On basic Epson models without LCD screens, the printer communicates entirely through red and green blinking lights. Here is the master key to decoding exactly what the printer wants.",
    errorCode: null,
    tags: 'Epson, Blinking Red Light, LED Codes, No Display, Paper Light, Ink Light',
    wordCount: 1150,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: errorCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix an Epson printer blinking a red light with no display, decode the pattern: 1) Paper light solid red: Out of paper or paper didn't feed correctly. 2) Paper light blinking red: A paper jam has occurred. 3) Ink light solid red: One or more cartridges are completely empty or not recognized. 4) Ink light blinking red: Ink is low, but you can still print. 5) Both lights blinking alternately: The internal waste ink pad is full and requires a software reset.",
    content: `<h2>The Secret Language of Blinking Lights</h2>
<p>If you own an entry-level Epson printer (like the L-series EcoTanks or basic XP-series Expression Home models), you don't have the luxury of an LCD screen telling you exactly what is wrong. Instead, you are faced with a cryptic combination of a green power button and a blinking red light next to an icon of a <strong>Drop of Ink</strong> or a <strong>Sheet of Paper</strong>.</p>
<p>These lights are not random. Epson has programmed specific blink frequencies and solid states to tell you exactly what error the printer has encountered. You just need the decoder ring.</p>

<h2>Pattern 1: The Paper Light (Sheet Icon)</h2>
<h3>Solid Red Paper Light</h3>
<p><strong>What it means:</strong> The printer is out of paper, or the paper feed rollers failed to grip the top sheet.</p>
<p><strong>The Fix:</strong> Load a neat stack of paper into the rear feed. Do not overfill it. Ensure the plastic paper edge guides are snug against the sides of the paper stack. Press the physical paper button (or the start copy button) once to force the printer to try grabbing the paper again.</p>

<h3>Fast Blinking Red Paper Light</h3>
<p><strong>What it means:</strong> A paper jam has occurred. The printer detected the paper entering the mechanism, but the sensor at the exit did not detect it leaving.</p>
<p><strong>The Fix:</strong> Turn the printer off. Open the main cover and the rear access panel (if your model has one). Carefully pull out any crumpled paper. <em>Always pull the paper in the direction it naturally flows through the printer to avoid stripping the plastic gears.</em> Turn the printer back on to clear the error state.</p>

<h2>Pattern 2: The Ink Light (Drop Icon)</h2>
<h3>Solid Red Ink Light</h3>
<p><strong>What it means:</strong> A fatal ink error. Either a cartridge is 100% empty, the cartridge chip is not recognized, or (on EcoTanks) the software has determined the tank must be refilled.</p>
<p><strong>The Fix:</strong> If you use cartridges, press the ink button once. The printhead will move to the center and point to the empty cartridge. Replace it. If you use third-party cartridges and the light remains solid, the printer's firmware has rejected the chip. You must use an older firmware or an official Epson cartridge.</p>

<h3>Slow Blinking Red Ink Light</h3>
<p><strong>What it means:</strong> Ink is running low. This is a warning, not a stoppage.</p>
<p><strong>The Fix:</strong> You can continue printing. The printer is simply letting you know you should order a replacement soon.</p>

<h2>Pattern 3: The Fatal Alternating Blink</h2>
<h3>Ink and Paper Lights Blinking Alternately (Back and Forth)</h3>
<p><strong>What it means:</strong> The Waste Ink Pad counter has reached its maximum limit. This is a hard software lock designed to prevent waste ink from overflowing onto your desk.</p>
<p><strong>The Fix:</strong> You cannot clear this by unplugging the printer or holding buttons. You must connect the printer to a PC via USB and use a utility like the <strong>WIC Reset Utility</strong> to reset the EEPROM counter to 0%. You should also physically replace the sponge pads at the bottom of the printer.</p>

<h2>Pattern 4: All Lights Blinking Simultaneously</h2>
<h3>Power, Ink, and Paper Lights Flashing Very Fast at the Same Time</h3>
<p><strong>What it means:</strong> General Fatal Error. The motherboard has detected a severe hardware failure. This could be a jammed printhead carriage, a disconnected scanner cable, or a blown fuse on the motherboard.</p>
<p><strong>The Fix:</strong> Turn the printer off and unplug it. Open the lid and ensure there is absolutely nothing blocking the printhead from moving left to right. If the path is clear, plug it back in. If the lights flash instantly upon power up before the printer even tries to move, the motherboard or scanner unit is dead and requires professional repair.</p>`,
    faqs: JSON.stringify([
      { question: 'Why does the red light stay on even after I added paper?', answer: 'You must press the physical Paper or Resume button on the control panel after adding paper to tell the printer it is safe to try feeding again.', order: 1 },
      { question: 'Can I bypass a solid red ink light if I only want to print in black?', answer: 'No. Epson printers physically lock you out of all printing if even a single color cartridge is completely empty to prevent air from getting into the printhead nozzles.', order: 2 },
      { question: 'What does it mean if only the power button flashes green?', answer: 'A flashing green power button is normal. It means the printer is currently receiving data, processing a print job, charging ink, or powering down. Just wait for it to turn solid.', order: 3 }
    ])
  },
  {
    title: "Epson All Lights Blinking At Once: Fatal Error Diagnosis",
    slug: 'epson-all-lights-blinking-at-once-fatal-error',
    seoTitle: "Fix Epson Printer All Lights Blinking Simultaneously",
    metaDescription: "Is your Epson printer flashing all its lights at once? This signifies a General Fatal Error. Learn how to diagnose motherboard failures, scanner issues, and carriage jams.",
    excerpt: "When every single LED on your Epson printer flashes rapidly at the same time, the motherboard has initiated an emergency stop. Here is how to diagnose the root cause.",
    errorCode: 'General Error',
    tags: 'Epson, All Lights Blinking, Fatal Error, Motherboard, Scanner Error, Hardware Failure',
    wordCount: 1100,
    difficultyLevel: 'Advanced',
    timeToFix: '20 minutes',
    categoryId: errorCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "To fix an Epson printer where all lights are blinking simultaneously: 1) Unplug the printer for 60 seconds to clear temporary memory. 2) Open the scanner bed and check for foreign objects (like paperclips) blocking the printhead carriage. 3) Check the clear plastic encoder strip for grease or dislodgement. 4) If the lights flash instantly when turned on, without the printer making any movement noise, the scanner motor or motherboard has failed.",
    content: `<h2>The "Christmas Tree" Error</h2>
<p>There is perhaps no more stressful sight for an Epson owner than turning on the printer and immediately seeing every single LED on the control panel—Power, Wi-Fi, Ink, and Paper—flashing rapidly and aggressively at the same time. In the repair industry, this is known as the <strong>General Fatal Error</strong>.</p>
<p>Unlike alternating lights (which point to a waste ink pad issue), simultaneous rapid flashing means the motherboard has detected a critical mechanical or electronic failure that makes operation unsafe. The printer enters an emergency halt to prevent further damage to its motors.</p>

<h2>Diagnostic 1: The Timing of the Flashing</h2>
<p>The key to diagnosing a General Fatal Error is observing exactly <em>when</em> the lights start flashing after you press the power button.</p>

<h3>Scenario A: The printer makes noise, moves the carriage, THEN flashes.</h3>
<p>If you turn the printer on, hear the gears turn, see the printhead move left and right, and <em>then</em> the printer locks up with all lights flashing, you are dealing with a <strong>Carriage Impedance Error</strong>.</p>
<ul>
    <li><strong>The Cause:</strong> The printhead carriage bumped into something, or the optical sensor failed to read the encoder strip. The motherboard thinks the carriage is jammed.</li>
    <li><strong>The Fix:</strong> Unplug the printer. Take a flashlight and look deep into the far-right parking station. Look for crumpled paper, a staple, or a dislodged piece of plastic. Next, inspect the clear plastic encoder strip running behind the printhead. If it is popped off its spring hook or smeared with grease, the printer goes blind and crashes. Reattach or wipe it down with isopropyl alcohol.</li>
</ul>

<h3>Scenario B: The lights flash INSTANTLY upon pressing power.</h3>
<p>If you press power and the lights immediately begin flashing with absolutely zero mechanical noise or gear movement, you are dealing with a <strong>Pre-Boot Electronic Failure</strong>.</p>
<ul>
    <li><strong>The Cause:</strong> During the first millisecond of bootup, the motherboard checks for continuity across all its major components. If the scanner cable is disconnected, the mainboard F1 fuse is blown, or the printhead is catastrophically shorted, the boot process halts instantly.</li>
    <li><strong>The Fix:</strong> Open the side panel of the printer and check the flat white ribbon cable connecting the scanner unit to the motherboard. If it was tugged loose during a paper jam removal, reseating it will fix the printer instantly. If the cable is fine, your motherboard has likely suffered a short circuit (similar to an 0x97 error) and the printer is effectively dead.</li>
</ul>

<h2>Diagnostic 2: The Scanner Assembly Check</h2>
<p>Epson all-in-one printers will completely refuse to print if the scanner unit on top fails. The printer requires a successful self-test of the scanner bulb before it will unlock the printhead.</p>
<p>When you turn the printer on, lift the scanner lid and watch the glass bed. You should see the scanner bar light up briefly and move a millimeter to find its "home" position. If the scanner bar does not light up, or if it grinds violently against the side of the glass, the scanner motor is dead. Because the scanner failed its boot check, the motherboard throws the General Error (all lights flashing). You cannot bypass this to use the printer just as a printer.</p>

<h2>Is it the Waste Ink Pad?</h2>
<p>Many users confuse this error with the Waste Ink Pad error. To be absolutely clear: <strong>If all lights flash AT THE SAME TIME, it is a hardware fault. If the Ink and Paper lights flash ALTERNATELY (one, then the other, back and forth), it is the Waste Ink Pad software lock.</strong> Do not pay for a WIC Reset key if your lights are flashing simultaneously; a software reset cannot fix a hardware failure.</p>`
  },
  {
    title: "Epson Power Cleaning vs Head Cleaning: What is the Difference?",
    slug: 'epson-power-cleaning-vs-head-cleaning-difference',
    seoTitle: "Epson Power Cleaning vs Head Cleaning: When to Use Which",
    metaDescription: "What is the difference between a standard Head Cleaning and a Power Cleaning on an Epson printer? Learn the risks, ink waste, and mechanical differences.",
    excerpt: "Should you run a Head Cleaning or a Power Cleaning? Understanding the mechanical difference between these two utilities can save you massive amounts of ink and protect your printhead.",
    errorCode: null,
    tags: 'Epson, Power Cleaning, Head Cleaning, Ink Waste, Printhead, Maintenance',
    wordCount: 1200,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: maintenanceCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "The difference between Epson Head Cleaning and Power Cleaning lies in intensity and purpose. A standard Head Cleaning uses a small amount of suction to pull fresh ink through the nozzles, clearing minor clogs. A Power Cleaning (or Power Ink Flushing) uses maximum pump pressure to aggressively suck up to 20% of your total ink through the system, specifically designed to purge massive air gaps inside the silicone tubes of EcoTank models.",
    content: `<h2>Understanding Epson's Built-In Maintenance Tools</h2>
<p>If you own an Epson printer and suddenly experience banding, faded colors, or blank pages, your first instinct is to go into the maintenance menu and run a cleaning cycle. However, Epson gives you two options: <strong>Head Cleaning</strong> and <strong>Power Cleaning</strong> (sometimes called Power Ink Flushing).</p>
<p>Many users assume Power Cleaning is just a "better" version of Head Cleaning and run it immediately. This is a costly mistake. Understanding the mechanical difference between these two processes will save you ink, money, and potentially the lifespan of your printer.</p>

<h2>The Standard Head Cleaning</h2>
<p>A standard Head Cleaning is your first line of defense against poor print quality.</p>
<h3>How it works mechanically:</h3>
<p>When you trigger this cycle, the printhead carriage moves to the far right side of the printer and docks onto the <strong>capping station</strong> (a small rubber pad connected to a suction pump). The pump engages lightly, creating a small vacuum that pulls a few drops of fresh ink from the cartridges, down through the microscopic printhead nozzles, and out into the waste pad.</p>
<h3>When to use it:</h3>
<ul>
    <li>When a nozzle check shows a few missing breaks or gaps in the grid.</li>
    <li>When the printer has been sitting unused for a week or two and prints look slightly faded.</li>
    <li>When you just installed a brand new ink cartridge and need to prime it.</li>
</ul>
<p><strong>The Cost:</strong> A standard Head Cleaning uses a very minimal amount of ink. You can safely run 2 or 3 of these cycles in a row without draining your wallet or overflowing your internal waste pad.</p>

<h2>The Power Cleaning (Power Ink Flushing)</h2>
<p>A Power Cleaning is a massive, aggressive mechanical operation. Epson actually hides this option deep in the settings or limits you to running it only once every 12 hours, and for good reason.</p>
<h3>How it works mechanically:</h3>
<p>The printhead docks on the capping station, but instead of a light vacuum, the printer's pump goes into overdrive. It forcefully sucks massive amounts of ink through the system at high velocity. On EcoTank models, this is designed to literally pull the ink all the way from the external tanks, through the long silicone tubes, through the dampers, and out the printhead.</p>
<h3>When to use it:</h3>
<ul>
    <li><strong>On EcoTanks:</strong> When you look at the translucent ink tubes inside the printer and see massive <strong>air bubbles</strong> or completely empty tubes. (A standard cleaning does not have the suction power to pull air through a 12-inch tube).</li>
    <li>When a standard cleaning has been run 3 times with zero improvement, and the printer sat unused for several months.</li>
</ul>
<h3>The Massive Risks:</h3>
<p>You should avoid Power Cleaning unless absolutely necessary due to three massive drawbacks:</p>
<ol>
    <li><strong>Extreme Ink Waste:</strong> A single Power Cleaning can consume anywhere from 10% to 20% of your total ink tank capacity in one go. You are literally flushing dollars down the drain.</li>
    <li><strong>The Waste Pad Limit:</strong> All that purged ink goes directly into the printer's internal Maintenance Box (Waste Ink Pad). Running just two Power Cleanings is often enough to fill the pad, triggering the fatal "Parts inside your printer are at the end of their service life" error and bricking the printer until serviced.</li>
    <li><strong>Printhead Strain:</strong> Forcing thick fluid through microscopic ceramic nozzles at high velocity generates pressure and heat, which can damage older printheads.</li>
</ol>

<h2>The 12-Hour Rule</h2>
<p>If you run a standard cleaning and the nozzles are still clogged, <strong>do not immediately run a Power Cleaning</strong>. Epson pigment ink dries hard. A standard cleaning pulls fresh, wet ink down onto the hard clog. If you let the printer sit turned off for 12 hours, the fresh wet ink will chemically dissolve the hard clog on its own. Often, simply waiting overnight and printing a test page the next morning completely resolves the issue without wasting any more ink.</p>`
  },
  {
    title: "Epson L3210 Not Printing Black: Model-Specific Troubleshooting",
    slug: 'epson-l3210-not-printing-black',
    seoTitle: "Fix Epson L3210 Not Printing Black Ink (EcoTank Guide)",
    metaDescription: "Epson L3210 not printing black ink? This EcoTank model requires specific troubleshooting for air in the damper and pigment ink clogs. Learn the exact fix.",
    excerpt: "The Epson L3210 is one of the most popular EcoTanks in the world, but it suffers from a common issue: the black ink simply stops printing. Here is how to fix this specific model.",
    errorCode: null,
    tags: 'Epson, L3210, EcoTank, Black Ink, Not Printing, Damper, Air Bubbles',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '20 minutes',
    categoryId: inkCategory,
    authorId: authors.david,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix an Epson L3210 not printing black: 1) Lift the scanner bed and check the ink tubes. If the black tube has large air bubbles, the printhead is starving for ink. 2) Remove the plastic cover over the printhead using a Phillips screwdriver. 3) Unclip the black ink damper. 4) Use a blunt syringe inserted into the bottom of the damper to suck the air out of the tube and pull fresh black ink from the tank. 5) Reinstall the damper and run a Head Cleaning cycle.",
    content: `<h2>The L3210 Black Ink Problem</h2>
<p>The Epson L3210 (and its sister models like the L3110 and L3250) is an incredibly popular entry-level EcoTank. It is cost-effective and reliable, but it has one Achilles' heel: after a few months of light use, it will often stop printing black ink entirely, while the cyan, magenta, and yellow continue to print perfectly.</p>
<p>Because the black ink on this model is used exclusively for text documents and is thicker than the dye-based colors, it is significantly more prone to clogging and air-lock issues.</p>

<h2>Check 1: Visual Inspection of the Tubes</h2>
<p>Unlike cartridge printers, you can physically see the ink delivery system on the L3210.</p>
<ol>
    <li>Turn the printer on and lift the entire scanner bed unit up so you can see the internal mechanics.</li>
    <li>Look at the bundle of four translucent silicone tubes traveling from the ink tanks on the right to the moving printhead carriage.</li>
    <li>Locate the tube carrying the black ink. Is it solid black, or do you see massive pockets of clear air?</li>
</ol>
<p>If the tube is full of air, the black printhead is starved. Running a standard Head Cleaning will not fix this, as it lacks the suction to pull a massive air bubble through the system. You have two choices: run a Power Cleaning (which wastes massive amounts of color ink alongside the black), or manually prime the damper.</p>

<h2>Fix 1: Manually Priming the L3210 Damper</h2>
<p>This is the most effective fix for the L3210 that saves your ink and your maintenance pad.</p>
<ol>
    <li>When the printhead carriage is in the center of the printer, unplug the power cord from the wall to freeze it in place.</li>
    <li>Look at the top of the printhead carriage. There is a small, clear plastic cover holding the tubes down, secured by a single small Phillips-head screw. Remove this screw and lift the cover off.</li>
    <li>You will see four plastic cartridges (dampers) plugged into the printhead. Squeeze the plastic tab on the back of the Black damper and lift it straight up.</li>
    <li>Take a standard 10ml plastic syringe (without a sharp needle). Insert the plastic tip into the round valve at the bottom of the black damper.</li>
    <li>Slowly pull the syringe plunger back. You will see the air bubble travel through the tube, into the damper, and into your syringe, followed by solid black ink.</li>
    <li>Once you draw solid black ink, remove the syringe, push the damper back down onto the printhead until it clicks, and screw the cover back on.</li>
    <li>Plug the printer in and run one standard Head Cleaning to finish the job.</li>
</ol>

<h2>Fix 2: The Warm Water / Windex Flush</h2>
<p>If your black tube is perfectly solid with no air bubbles, but the L3210 still prints blank pages, the black pigment ink has dried and crystallized inside the microscopic ceramic nozzles of the printhead.</p>
<p>Because pigment ink dries like a hard plastic, standard suction won't break it. You must dissolve it.</p>
<ol>
    <li>Unplug the printer and move the carriage to the center.</li>
    <li>Fold a paper towel into a long strip and slide it underneath the printhead carriage to catch liquid.</li>
    <li>Unclip and remove the black damper just like in Fix 1.</li>
    <li>You will see a small plastic spike sticking up from the printhead where the damper used to sit. This is the ink intake port.</li>
    <li>Fill a syringe with 2ml of Windex (or a 50/50 mix of warm distilled water and isopropyl alcohol). Attach a short piece of silicone tubing to the syringe, and push the other end over the plastic spike.</li>
    <li><strong>Gently</strong> push the plunger to inject the fluid into the printhead. Let it sit for 15 minutes to dissolve the clog, then gently push the rest through.</li>
    <li>Remove the syringe, reseat the damper, and remove the wet paper towel. Run a Head Cleaning cycle to pull fresh ink back into the newly cleared nozzles.</li>
</ol>`
  },
  {
    title: "Epson Printer Colors Printing Wrong: Fixing Contaminated Ink Tanks",
    slug: 'epson-printer-colors-printing-wrong-contaminated-ink',
    seoTitle: "Fix Epson Printer Colors Printing Wrong (Wrong Ink in Tank)",
    metaDescription: "Are your Epson printer colors printing wrong? If you accidentally poured the wrong ink color into an EcoTank, learn how to drain the tank and flush the lines.",
    excerpt: "If your Epson printer is printing greens as muddy browns or skies as purple, you may have contaminated ink. Here is how to fix an EcoTank if you poured the wrong color in the wrong tank.",
    errorCode: null,
    tags: 'Epson, Wrong Color, Contaminated Ink, EcoTank, Print Quality, Wrong Tank, Flush Lines',
    wordCount: 1250,
    difficultyLevel: 'Expert',
    timeToFix: '1 hour',
    categoryId: printQualityCategory,
    authorId: authors.elena,
    reviewerId: authors.alex,
    featuredSnippet: "If you accidentally poured the wrong color ink into an Epson EcoTank (e.g., Yellow into the Cyan tank), you must extract the contaminated ink immediately. 1) Do not run a cleaning cycle, as this pulls the bad ink into the printhead. 2) Buy a large syringe with a long flexible silicone tube. 3) Insert the tube deep into the top of the contaminated ink tank and extract all the mixed liquid into a waste bottle. 4) Refill the tank with the correct color. 5) Unclip the damper on the printhead and use the syringe to pull the remaining bad ink out of the silicone lines.",
    content: `<h2>The EcoTank Nightmare: The Wrong Bottle</h2>
<p>Epson EcoTanks are incredibly convenient, but they rely entirely on user diligence during the refill process. Epson designed keyed bottle nozzles for newer models (where the cyan bottle physically won't fit onto the yellow tank port), but on older models, or when using third-party squeeze bottles, it is incredibly easy to accidentally squirt magenta ink into the cyan tank.</p>
<p>If you realize your mistake instantly, or if you notice your skies are printing purple and your grass is printing brown, you have <strong>Contaminated Ink</strong>. The severity of the fix depends entirely on what you did <em>after</em> pouring the wrong ink.</p>

<h2>Scenario A: You Realized Immediately (Before Printing)</h2>
<p>If you just poured yellow into the cyan tank, stopped, and <strong>have not printed or run a cleaning cycle yet</strong>, you are in luck. The contaminated ink is sitting in the tank, but the long silicone tube and the printhead are still full of pure, correct cyan ink.</p>
<div class="alert alert-important">
<strong>CRITICAL:</strong> Do not turn the printer on, and absolutely do not run a Power Cleaning. If you do, the printer will suck the contaminated ink from the tank into the tubes and printhead, multiplying the work required to fix it by ten.
</div>

<h3>The Extraction Process:</h3>
<ol>
    <li>Buy a large 50ml plastic syringe and a 12-inch length of flexible silicone tubing (aquarium airline tubing works well).</li>
    <li>Attach the tubing to the syringe.</li>
    <li>Open the cap of the contaminated ink tank on the printer. Feed the silicone tube down into the port until it hits the bottom of the tank.</li>
    <li>Pull the syringe plunger back to suck all the mixed ink out of the tank. Eject this bad ink into a waste bottle. Repeat until the tank is completely bone dry.</li>
    <li>Take your correct bottle of ink (e.g., the actual Cyan) and refill the tank.</li>
    <li>Since the tubes were never compromised, you can now turn the printer on and print normally. The new correct ink will naturally flow into the tubes behind the old correct ink.</li>
</ol>

<h2>Scenario B: You Already Printed (The Ink is in the Lines)</h2>
<p>If you didn't realize your mistake until your photos came out the wrong color, the contaminated mixture has already been pumped from the tank, all the way through the silicone tubes, and into the printhead. Fixing this requires a full system flush.</p>

<h3>Step 1: Empty the Tank</h3>
<p>Follow the extraction process in Scenario A to use a syringe and long tube to suck the contaminated tank completely dry. Once empty, fill it with the correct color ink.</p>

<h3>Step 2: Purge the Silicone Lines and Damper</h3>
<p>Even though the tank is now holding the correct color, the long silicone tube stretching to the printhead is still full of the bad mix. If you just run cleaning cycles to push it through, you will overflow your internal waste pad instantly.</p>
<ol>
    <li>Unplug the printer and slide the printhead carriage to the center.</li>
    <li>Unscrew the plastic cover over the printhead to expose the dampers.</li>
    <li>Unclip the damper for the contaminated color (e.g., the Cyan damper) and lift it up.</li>
    <li>Take a clean syringe (no needle, no long tube). Insert the plastic tip directly into the round valve at the bottom of the damper.</li>
    <li>Pull the plunger back. You are now sucking the bad ink out of the damper, out of the silicone line, and drawing the fresh, correct ink from the tank.</li>
    <li>Keep pulling until you see the color of the liquid entering your syringe change from the muddy contaminated mix to the pure, bright correct color.</li>
    <li>Discard the bad ink from your syringe. Push the damper back onto the printhead.</li>
</ol>

<h3>Step 3: Flush the Printhead</h3>
<p>The tank is clean, and the lines are clean, but the microscopic printhead nozzles still hold a few drops of the bad mix.</p>
<p>Plug the printer in and run <strong>two standard Head Cleaning cycles</strong>. This will purge the last remaining drops of bad ink out of the printhead itself and replace it with the pure ink now sitting in the damper. Print a nozzle check. The color grid should be pure and bright again.</p>

<h2>Alternative: Color Clogs (Not Contamination)</h2>
<p>If you are certain you didn't mix up the bottles, but a color is completely missing or printing faintly, you do not have contaminated ink. You simply have a clogged printhead nozzle. In this case, do not empty the tanks. Run a standard Nozzle Check, identify which color grid is missing lines, and perform a Head Cleaning or use Windex on a paper towel under the printhead to dissolve the dried dye.</p>`
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
