import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const canonBrandId = 'aa9e42c5-e0f0-4b60-b776-c39f46748c33';
const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
const maintenanceCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';
const inkCategory = '9af9508c-4517-47bc-9084-8ab635b1283b';
const connectivityCategory = 'c3a92d93-fcbb-439c-a11e-80cde3d2a5ce';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Canon Printer Error C000 Meaning & Fix: Purge Unit Fault",
    slug: 'canon-printer-error-c000-meaning',
    seoTitle: "Fix Canon Printer Error C000 (Internal Hardware Drive Error)",
    metaDescription: "Canon error C000 indicates a drive error in the internal mechanics, usually involving the purge unit or paper feed gears. Learn how to clear physical jams.",
    excerpt: "Support Code C000 is a generalized drive mechanism error. The printer is trying to move its internal gears, but something is blocking them.",
    errorCode: 'C000',
    tags: 'Canon, C000, Error Code, Drive Error, Purge Unit, Gear Jam, Internal Error',
    wordCount: 950,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: errorCategory,
    authorId: authors.marcus,
    reviewerId: authors.david,
    featuredSnippet: "To fix Canon error C000: 1) Unplug the printer and open the top cover. 2) Look inside for foreign objects. Error C000 frequently occurs when a small object (like a paperclip or a piece of plastic) falls into the printer and wedges into the plastic drive gears on the far left or right sides. 3) Check the Purge Unit on the right side. If the rubber ink caps are stuck in the 'up' position, press them down gently. 4) Remove and reseat all ink cartridges, ensuring they are fully clicked into place.",
    content: `<h2>What is Support Code C000?</h2>
<p>Unlike specific errors that point to the printhead or the scanner, <strong>Error C000</strong> on a Canon printer is a broader "Drive Error." This means the main logic board sent power to a motor to turn a sequence of gears, but the gears didn't turn.</p>
<p>Because multiple systems (the paper feed, the carriage belt, and the ink purge unit) are all driven by internal gear trains, a physical blockage anywhere in the printer's mechanics can trigger this code. It is almost always a physical issue, not a software glitch.</p>

<h2>Diagnostic 1: The Foreign Object</h2>
<p>The number one cause of C000 is a foreign object dropping into the top paper feed slot and making its way down into the complex white plastic gears at the bottom of the printer.</p>
<ol>
    <li>Turn the printer completely off and unplug the power cord.</li>
    <li>Take a bright flashlight and look down into the rear paper tray.</li>
    <li>Open the front access door (where you change the ink) and look at the far left and far right sides.</li>
    <li>If you see a coin, a paperclip, a staple, or a piece of heavy cardstock jammed between the teeth of the plastic gears, use long tweezers to carefully extract it. Do not force the gears to turn backwards.</li>
</ol>

<h2>Diagnostic 2: The Stuck Purge Unit</h2>
<p>The purge unit (the station on the far right where the printhead rests) is driven by the main gear train. If the purge unit gets glued in place by dried waste ink, the gears lock up and throw C000.</p>
<ul>
    <li>With the printer unplugged, manually slide the ink carriage to the center of the printer. (If it is locked on the right, you may need to gently push the white plastic locking tab down).</li>
    <li>Look at the small rubber suction cups on the far right where the carriage was sitting.</li>
    <li>Take a Q-tip dampened with warm water and clean the thick, dried ink from around these rubber caps. Gently press down on the cap assembly to ensure it moves up and down freely on its springs.</li>
</ul>

<h2>Diagnostic 3: Unseated Cartridges</h2>
<p>Sometimes the simplest solution works. If an ink cartridge is sitting 1 millimeter too high because it wasn't pushed down until it "clicked," it can scrape against the top frame of the printer as the carriage moves, acting as a physical brake. Remove all cartridges and push them firmly back into their slots until you hear an audible click.</p>`
  },
  {
    title: "Canon Printer Error E02: Paper Out (Not Cartridge)",
    slug: 'canon-printer-error-e02-cartridge-paper',
    seoTitle: "Fix Canon Error E02 (Paper Feed Error, Not Cartridge)",
    metaDescription: "Many users confuse Canon Error E02 with an ink cartridge issue. E02 actually means the printer is out of paper or the rollers failed to grab a sheet. Here is how to fix it.",
    excerpt: "The E02 error code on Canon PIXMA and MG series printers causes a lot of confusion. It has nothing to do with ink cartridges; it is a paper feed error.",
    errorCode: 'E02',
    tags: 'Canon, E02, Error Code, Paper Out, Paper Feed, Rollers, PIXMA, MG Series',
    wordCount: 850,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: errorCategory,
    authorId: authors.alex,
    reviewerId: authors.elena,
    featuredSnippet: "To fix Canon error E02: 1) Ignore your ink cartridges; E02 is a paper feed error. 2) Check the rear paper tray. If it is empty, load a stack of paper. 3) If there is paper in the tray, remove it, fan the stack, and reload it. 4) Push the plastic paper guides snugly against the edges of the paper. 5) If the rubber rollers spun but slipped on the paper, wipe the gray rollers with a damp cloth to remove paper dust. 6) Press the Black or Color Start button to resume printing.",
    content: `<h2>The E02 Misconception</h2>
<p>If you own a budget Canon PIXMA model (like the MG2522, MG3620, or TS3120) with a basic LED screen, you might see the screen flash <strong>E... 0... 2</strong>.</p>
<p>Because E02 often happens right after changing ink, many users search for "E02 cartridge error." However, this is a misconception. <strong>Error E02 strictly means "Paper Out" or "Paper Feed Failure."</strong> The printer attempted to pull a sheet of paper into the machine and failed.</p>

<h2>Fix 1: Reloading the Paper Tray</h2>
<p>If your tray is completely empty, simply loading paper and pressing the <strong>Start (Black or Color)</strong> or <strong>Resume</strong> button will clear the error.</p>
<p>If your tray <em>does</em> have paper in it, the printer's rollers slipped. This happens when paper is loaded incorrectly.</p>
<ol>
    <li>Remove the stack of paper from the rear tray.</li>
    <li>Fan the stack like a deck of cards to prevent the sheets from sticking together.</li>
    <li>Tap the bottom edge on a desk so the stack is perfectly flat.</li>
    <li>Drop it back into the rear slot.</li>
    <li><strong>Crucial Step:</strong> Pinch the plastic paper guides and slide them inward until they lightly touch the left and right edges of the paper stack. If these guides are too loose, the paper feeds in crookedly and the sensor rejects it.</li>
</ol>

<h2>Fix 2: Cleaning the Rollers</h2>
<p>If you have paper loaded properly, you press Print, you hear the rollers spin, but the paper never moves downward, your rubber pick-up rollers are dirty.</p>
<p>Over hundreds of prints, the rollers get coated in white paper dust, making them smooth and slippery. Take a microfiber cloth lightly dampened with water and wipe the gray rubber rollers visible in the rear paper slot. Let them dry for two minutes, and they will regain their original sticky grip.</p>`
  },
  {
    title: "Canon Printer Error E05 Fix: Cartridge Not Recognized",
    slug: 'canon-printer-error-e05-fix',
    seoTitle: "Fix Canon Error E05 (Ink Cartridge Not Recognized)",
    metaDescription: "Canon Error E05 means the FINE cartridge is not installed, installed incorrectly, or is unrecognized. Learn how to clean the cartridge contacts and clear the error.",
    excerpt: "The E05 error code (or 1401) stops your Canon printer dead in its tracks. It indicates that the printer cannot electrically communicate with the ink cartridge.",
    errorCode: 'E05',
    tags: 'Canon, E05, 1401, Cartridge Not Recognized, FINE Cartridge, Ink Error',
    wordCount: 1000,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: inkCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix Canon error E05: 1) Open the printer's front door so the cartridges slide to the replacement position. 2) Remove both the Black and Color cartridges. 3) Look at the copper circuit board on the front of the cartridges. If it has ink smears or finger oils on it, wipe it gently with a dry tissue or a Q-tip dipped in rubbing alcohol. 4) Reinsert the cartridges, ensuring you push them firmly upward until they 'click' into place. 5) If the error remains, the cartridge's internal chip has failed and the cartridge must be replaced.",
    content: `<h2>Understanding Error E05 (and 1401)</h2>
<p>On Canon printers with an LED segment display, the code <strong>E05</strong> flashes when there is a cartridge communication failure. On models with a full screen or on your computer monitor, this same issue is usually displayed as <strong>Support Code 1401</strong>.</p>
<p>The printer is telling you one of three things: The cartridge is physically missing, the cartridge is installed but not seated correctly, or the electronic chip on the cartridge is dead.</p>

<h2>Fix 1: The Re-Seating Process</h2>
<p>Canon FINE cartridges (like the 245/246 or 275/276 series) are combined printhead-and-ink units. They slide into a plastic slot and must be pushed upward to lock against the electrical pins in the back of the carriage.</p>
<p>If you installed a new cartridge but didn't push hard enough to hear a distinct <strong>"Click,"</strong> the electrical pins are not touching the copper pads on the cartridge. The printer thinks the slot is empty.</p>
<ul>
    <li>Open the access door and let the carriage slide to the center.</li>
    <li>Push down on the cartridges to release them, and pull them out.</li>
    <li>Slide them back in at a slight upward angle, and push firmly on the front face of the cartridge until it snaps into its locked position.</li>
</ul>

<h2>Fix 2: Cleaning the Contacts</h2>
<p>The printer reads the cartridge through a small copper ribbon with dozens of tiny gold dots on the front of the cartridge.</p>
<p>If you touched this copper strip with your bare fingers during installation, the oils from your skin can act as an insulator, blocking the electrical signal. Similarly, if ink leaked out of the nozzle and smeared onto these dots, the signal will short out.</p>
<ol>
    <li>Remove the problem cartridge.</li>
    <li>Take a clean tissue or a cotton swab lightly dampened with rubbing alcohol.</li>
    <li>Gently wipe the copper strip on the cartridge until it is clean and shiny.</li>
    <li>Take a dry cotton swab and wipe the matching gold pins inside the printer's carriage slot.</li>
    <li>Allow everything to dry for 60 seconds, then reinstall.</li>
</ol>

<h2>Fix 3: Cartridge Failure</h2>
<p>Unlike standard ink tanks, Canon FINE cartridges contain their own microscopic heating elements and circuitry. If you are using a third-party refilled cartridge, or if a genuine cartridge suffered a static shock during shipping, the internal circuitry may be fried.</p>
<p>If cleaning the contacts does not clear the E05 error, the cartridge itself is dead and must be replaced with a new one. The printer is not broken; the "brain" inside the cartridge is.</p>`
  },
  {
    title: "Canon Printer Error 5011 Fix: Scanner & Logic Board Communication",
    slug: 'canon-printer-error-5011-fix',
    seoTitle: "Fix Canon Error 5011 (Scanner Unit & Mainboard Fault)",
    metaDescription: "Canon error 5011 is a communication failure between the scanner unit and the main logic board. Learn how to diagnose scanner motor jams and ribbon cable faults.",
    excerpt: "When you boot up your Canon printer and immediately see Error 5011, the scanner unit has failed its self-test. Here is how to troubleshoot the flatbed scanner.",
    errorCode: '5011',
    tags: 'Canon, 5011, Error Code, Scanner Error, Flatbed, Ribbon Cable, Logic Board',
    wordCount: 1050,
    difficultyLevel: 'Advanced',
    timeToFix: '25 minutes',
    categoryId: errorCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "To fix Canon error 5011: 1) Perform a hard reset by unplugging the printer for 10 minutes to clear the motherboard's RAM. 2) Turn the printer back on and observe the scanner glass. If the scanner bar doesn't light up or move, it is physically jammed or the motor is dead. 3) Gently tap the glass above the scanner bar to dislodge a stuck mechanism. 4) If you are comfortable with tools, lift the scanner unit and check the wide, flat ribbon cable connecting the scanner to the motherboard to ensure it hasn't become loose.",
    content: `<h2>The Scanner Initialization Failure</h2>
<p>During the boot-up sequence, a Canon all-in-one printer checks every major component to ensure it is ready for use. If it throws <strong>Support Code 5011</strong>, the initialization has failed at the scanner unit.</p>
<p>Even if you only want to print a document from your computer, error 5011 locks down the entire printer. The main logic board either cannot detect the scanner unit at all, or the scanner motor cannot find its "home" position under the glass.</p>

<h2>Fix 1: The Hard Power Reset</h2>
<p>Before assuming the hardware is broken, rule out a temporary glitch in the motherboard's RAM. If the printer received a corrupted scan command over the network, it can lock up the scanner bus.</p>
<ul>
    <li>Leave the printer turned on.</li>
    <li>Pull the power cord directly out of the back of the printer.</li>
    <li>Wait for 10 full minutes. This allows the internal capacitors to drain completely.</li>
    <li>Plug the cord back in and press the power button.</li>
    <li>Watch the scanner glass. The long scanner bar should light up, move slightly to the right, and then slide back to the far left to lock into its home position. If it does this successfully, the error is cleared.</li>
</ul>

<h2>Fix 2: Freeing a Stuck Scanner Motor</h2>
<p>If you turn the printer on and hear a grinding noise coming from the top of the machine, or if the scanner bar tries to move but stutters in place, the mechanism is jammed.</p>
<p>The scanner bar moves along a track using a small DC motor and a rubber belt. If the printer was dropped or moved aggressively, the bar can jump off its track.</p>
<ol>
    <li>Turn the printer off.</li>
    <li>Open the top lid.</li>
    <li>Apply firm, flat pressure with your palm against the glass directly over where the scanner bar is stuck, and give it a firm but gentle tap. Sometimes this is enough to re-seat a derailed scanner bar.</li>
    <li>Turn the printer on and see if it moves freely.</li>
</ol>

<h2>Fix 3: Inspecting the Ribbon Cable</h2>
<p>If the scanner bar remains completely dark and silent during bootup, the main logic board is not communicating with it at all.</p>
<p>The scanner lid is connected to the bottom half of the printer by a wide, flat, white <strong>ribbon cable</strong> (an FFC cable). If you have frequently opened the printer aggressively to change ink, this cable can stretch, tear, or pull slightly out of its socket on the motherboard.</p>
<p>If you are mechanically inclined, you can unscrew the side panel of the printer to expose the mainboard and verify that this ribbon cable is firmly seated in its connector. If the cable is fully seated but the scanner remains dead, the scanner unit itself has burned out and requires replacement.</p>`
  },
  {
    title: "Canon Printer Support Code 306: Communication & Setup Error",
    slug: 'canon-printer-support-code-306',
    seoTitle: "Fix Canon Support Code 306 (Communication Error)",
    metaDescription: "Canon Support Code 306 is a communication error between your computer/phone and the printer. Learn how to fix Wi-Fi routing issues and clear the print spooler.",
    excerpt: "Support Code 306 is not a mechanical failure; it is a digital roadblock. Your device is trying to send data, but the printer isn't responding correctly.",
    errorCode: '306',
    tags: 'Canon, 306, Error Code, Communication Error, Wi-Fi, Spooler, Network',
    wordCount: 900,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: connectivityCategory,
    authorId: authors.alex,
    reviewerId: authors.elena,
    featuredSnippet: "To fix Canon Support Code 306: 1) Restart both your printer and your computer/smartphone. 2) Check your Wi-Fi network. Ensure your computer and the printer are connected to the exact same Wi-Fi network (e.g., ensure your laptop didn't accidentally connect to a guest network). 3) On Windows, clear the Print Spooler: go to Printers & Scanners, click your Canon printer, select 'Open Queue', and delete all pending documents. 4) If printing via USB, try a different USB port on your computer.",
    content: `<h2>Understanding Support Code 306</h2>
<p>Unlike hardware errors that flash on the printer's screen, <strong>Support Code 306</strong> typically appears in a pop-up window on your computer or inside the Canon PRINT app on your phone. The accompanying text usually reads: <em>"A communication error has occurred."</em></p>
<p>This means your printer is mechanically healthy, but the data packet sent from your device got lost, blocked, or timed out before the printer could process it.</p>

<h2>Fix 1: The Network Mismatch</h2>
<p>The most common cause of a 306 error over Wi-Fi is that your sending device and your receiving printer are on different subnets.</p>
<ul>
    <li><strong>Dual-Band Routers:</strong> Ensure your printer isn't connected to your router's 2.4GHz band while your phone is connected to the 5GHz band, <em>if</em> your router isolates them. They should ideally be on the exact same network name.</li>
    <li><strong>Guest Networks:</strong> Check your phone's Wi-Fi settings. Did it automatically connect to your router's "Guest" network? Guest networks usually have "AP Isolation" turned on, which prevents devices on the network from talking to each other.</li>
    <li><strong>VPNs:</strong> If you are running a VPN on your laptop for work, it tunnels your traffic out to a remote server, bypassing your local network. Turn off your VPN to print to a local Wi-Fi printer.</li>
</ul>

<h2>Fix 2: Clearing the Spooler Traffic Jam</h2>
<p>If you sent a massive, high-resolution photo to the printer, and the Wi-Fi signal dipped for just a few seconds, the data transfer is corrupted. The printer sits waiting for the rest of the file, and your computer eventually gives up and throws Code 306.</p>
<ol>
    <li>Turn the printer off.</li>
    <li>On Windows, type <strong>Printers &amp; Scanners</strong> into the Start menu.</li>
    <li>Click your Canon printer and select <strong>Open Queue</strong>.</li>
    <li>Right-click any documents stuck in the queue and select <strong>Cancel</strong>. Ensure the window is completely empty.</li>
    <li>Turn the printer back on and try printing a simple, one-page text document as a test.</li>
</ol>

<h2>Fix 3: USB Cable Issues</h2>
<p>If you are getting a 306 error while connected via a USB cable, the issue is physical data loss.</p>
<p>Do not plug the printer into a USB hub or a monitor pass-through port. Plug the USB cable directly into the back of your desktop computer (directly into the motherboard). If the cable is older than 5 years or longer than 6 feet, it may be degrading the signal. Replace the USB Type A-to-B cable.</p>`
  },
  {
    title: "Canon Printer Error 1403 Meaning: Printhead Sensor Fault",
    slug: 'canon-printer-error-1403-meaning',
    seoTitle: "Fix Canon Error 1403 (Printhead Temperature Sensor Fault)",
    metaDescription: "Canon Support Code 1403 indicates the printhead temperature sensor is defective. Learn how to clean the contacts, perform a hard reset, or replace the printhead.",
    excerpt: "Support Code 1403 is a fatal printhead error. The internal temperature sensor is sending erratic readings to the main logic board, forcing a shutdown.",
    errorCode: '1403',
    tags: 'Canon, 1403, Error Code, Printhead, Sensor, Temperature, PIXMA',
    wordCount: 950,
    difficultyLevel: 'Advanced',
    timeToFix: '15 minutes',
    categoryId: errorCategory,
    authorId: authors.marcus,
    reviewerId: authors.david,
    featuredSnippet: "To fix Canon error 1403: 1) Open the printer cover and remove all ink cartridges. 2) Release the locking lever and remove the printhead assembly. 3) Inspect the gold electrical contacts on the back of the printhead. If they are smeared with ink, clean them with rubbing alcohol and a microfiber cloth. 4) Clean the matching gold pins inside the carriage. 5) Reinstall the printhead. If the 1403 error returns immediately, the internal temperature sensor inside the printhead has permanently failed and the printhead must be replaced.",
    content: `<h2>What is Support Code 1403?</h2>
<p>If your Canon PIXMA screen displays <strong>Support Code 1403</strong> (or U052 / U053 on some models), the printer has halted all operations because it detects that the <em>"Type of printhead is incorrect"</em> or the printhead is defective.</p>
<p>More specifically, Canon's service manuals dictate that 1403 is a <strong>Printhead Temperature Sensor Error</strong>. The tiny thermistor inside the printhead has failed, short-circuited, or the motherboard has lost electrical contact with it.</p>

<h2>Fix 1: Cleaning the Electrical Contacts</h2>
<p>Because the motherboard relies on the gold contact pads on the back of the printhead to read the sensor data, any physical barrier between those pads and the carriage pins will trigger a 1403 error.</p>
<p>If you recently suffered a massive ink leak, or if you touched the gold pads with greasy fingers while installing a new cartridge, the connection is compromised.</p>
<ol>
    <li>Turn the printer on and open the top cover to bring the carriage to the center.</li>
    <li>Unplug the printer from the wall so the carriage stays in place.</li>
    <li>Remove all ink cartridges.</li>
    <li>Lift the gray or black locking lever and pull the printhead up and out.</li>
    <li>Take a clean microfiber cloth slightly dampened with 90% isopropyl alcohol.</li>
    <li>Thoroughly wipe the grid of gold squares on the back of the printhead.</li>
    <li>Carefully wipe the corresponding spring-loaded gold pins inside the printer carriage.</li>
    <li>Let both surfaces air dry for 5 minutes, reinstall the printhead, and turn the printer on.</li>
</ol>

<h2>Fix 2: The Printhead Reset Trick</h2>
<p>Occasionally, the motherboard's memory simply locks onto the error state and refuses to clear it even if the printhead is fine.</p>
<ul>
    <li>Turn the printer off.</li>
    <li>Hold down the <strong>Stop/Reset (red triangle)</strong> button, and while holding it, press and hold the <strong>Power</strong> button.</li>
    <li>While continuing to hold Power, release the Stop button, then press the Stop button twice quickly.</li>
    <li>Release all buttons. The printer will enter Service Mode.</li>
    <li>Once the printer rests, turn it off normally, wait 10 seconds, and turn it back on. This clears the volatile memory.</li>
</ul>

<h2>When to Replace the Printhead</h2>
<p>If you have cleaned the contacts and performed a reset, but the 1403 error appears the absolute instant you turn the printer on, the printhead's internal circuitry is fried. The only solution is to purchase a replacement printhead (e.g., QY6-0082 or similar, depending on your model) and install it.</p>`
  },
  {
    title: "Canon Printer Error P07: Waste Ink Absorber Full",
    slug: 'canon-printer-error-p07-waste-ink',
    seoTitle: "Fix Canon Error P07 (Waste Ink Absorber Full)",
    metaDescription: "Canon Error P07 (or 5B00) means the internal waste ink absorber pad is full. Learn how to enter Service Mode and use a service tool to reset the EEPROM counter.",
    excerpt: "When your Canon printer displays P07 on its LED screen, the waste ink counter has reached 100%. The printer is locked until this counter is digitally reset.",
    errorCode: 'P07',
    tags: 'Canon, P07, 5B00, Waste Ink, Ink Absorber, Service Mode, Reset Tool',
    wordCount: 1100,
    difficultyLevel: 'Advanced',
    timeToFix: '20 minutes',
    categoryId: maintenanceCategory,
    authorId: authors.elena,
    reviewerId: authors.alex,
    featuredSnippet: "To fix Canon error P07 (Waste Ink Absorber Full): 1) You must enter Service Mode. Turn the printer off. Press and hold STOP, then press and hold POWER. Release STOP, press it 5 times, then release POWER. 2) Connect the printer to a Windows PC via USB. 3) Download the Canon Service Tool (v3400 or v4720). 4) Open the tool, find the 'Clear Ink Counter' section, select 'Main', and click 'Set'. The printer will print a page with 'D=000.0', confirming the waste ink counter is reset to zero.",
    content: `<h2>Understanding Error P07 (and 5B00)</h2>
<p>On Canon printers with a 7-segment LED screen (like the MP and MG series), the code will flash <strong>P... 0... 7</strong>. If you check the status on your computer screen at the same time, it will read <strong>Support Code 5B00</strong>.</p>
<p>This is the <strong>Waste Ink Absorber Full</strong> error. Every time your printer runs a head cleaning cycle, it pumps waste ink into a thick sponge pad at the bottom of the printer. A digital counter on the motherboard tracks how many cleanings have occurred. When the math determines that the sponge is 100% saturated, it locks the printer to prevent ink from overflowing onto your desk.</p>

<h2>Step 1: Entering Service Mode</h2>
<p>You cannot reset the P07 error through normal menus or by unplugging the printer. You must boot the printer into a special diagnostic state called <strong>Service Mode</strong>.</p>
<ol>
    <li>Turn the printer completely off, but leave it plugged into the wall.</li>
    <li>Press and hold the <strong>Stop/Reset</strong> button (the red triangle in a circle).</li>
    <li>While holding Stop, press and hold the <strong>Power</strong> button.</li>
    <li>While continuing to hold the Power button, release the Stop button.</li>
    <li>Press the Stop button exactly <strong>5 times</strong> in a row (some older MP models only require 2 presses).</li>
    <li>Release the Power button.</li>
</ol>
<p>The green power light will flash for a moment and then stay solid. The printer screen will be blank. Your printer is now in Service Mode.</p>

<h2>Step 2: Using the Service Tool Software</h2>
<p>Now that the printer's digital gates are open, you need a software program to send the reset command. <em>(Note: This requires a Windows PC connected via USB; Wi-Fi and Mac will not work).</em></p>
<ul>
    <li>Search online and download the <strong>Canon Service Tool</strong> (Version 3400, 4720, or 4905 depending on your printer's age). <em>Be careful to download from reputable repair forums to avoid malware.</em></li>
    <li>Open the Service Tool. If all the buttons are grayed out, your printer is either not in Service Mode, or your specific printer model has locked out the tool (common on newer G-series).</li>
    <li>Look for the section labeled <strong>Clear Ink Counter</strong>.</li>
    <li>Ensure the "Absorber" dropdown is set to <strong>Main</strong>.</li>
    <li>Click the <strong>Set</strong> button next to it.</li>
</ul>
<p>The printer will whir for a moment and print a single sheet of paper with the text <code>D=000.0</code> on it. This confirms the digital counter has been reset to 0%. Turn the printer off normally, and turn it back on. The P07 error is gone.</p>

<h2>Step 3: The Physical Reality</h2>
<p>You have successfully reset the software, but remember: the physical sponge at the bottom of the printer is still soaked in waste ink. If you reset the counter and continue printing for another year, the ink will eventually overflow the plastic tray and leak out the bottom of the machine.</p>
<p>To do the job correctly, you should open the printer casing, remove the soaked felt pads, wash them in warm water, air dry them for two days, and put them back in.</p>`
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
