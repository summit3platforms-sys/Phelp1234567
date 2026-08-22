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
    title: "Canon Printer Error B200: Printhead Voltage Failure Explained",
    slug: 'canon-printer-error-b200-fix',
    seoTitle: "Fix Canon Printer Error B200 (Printhead Voltage Failure)",
    metaDescription: "Canon error B200 means the printhead has suffered a catastrophic voltage failure. Learn how to clean, reseat, or replace the printhead to fix this fatal error.",
    excerpt: "Error B200 is the most feared Canon error code. It indicates a critical electrical failure in the printhead assembly. Here is a complete diagnostic guide.",
    errorCode: 'B200',
    tags: 'Canon, B200, Error Code, Printhead, Voltage Failure, Fatal Error, PIXMA',
    wordCount: 1200,
    difficultyLevel: 'Advanced',
    timeToFix: '30 minutes',
    categoryId: errorCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "To fix Canon error B200: 1) Turn off the printer. Open the top cover and remove all ink cartridges. 2) Lift the gray locking lever and slide the printhead out of the carriage. 3) Soak the bottom of the printhead (the nozzle plate) in 1 cm of warm distilled water for 10 minutes. 4) Dry the printhead thoroughly with lint-free towels. 5) Reinstall the printhead and cartridges. If the error persists, the printhead's internal electrical contacts are burned out and a replacement printhead is required.",
    content: `<h2>Why B200 is Canon's Most Feared Error</h2>
<p>If your Canon PIXMA printer displays <strong>Error B200</strong> (or Support Code B200) on its screen, the printer's motherboard has detected a catastrophic electrical anomaly in the printhead assembly. Unlike paper jams or empty ink warnings, B200 is a <em>hardware-level safety shutoff</em> designed to prevent damage to the printer's main logic board.</p>
<p>Canon's internal documentation classifies B200 as a "VH monitor error," meaning the voltage being drawn by the printhead's heating elements is outside the acceptable range. This can happen because the printhead's microscopic resistors have burned out, the electrical contacts are corroded, or a short circuit has occurred due to ink leaking onto the connector pins.</p>

<h2>Understanding the Printhead Architecture</h2>
<p>Unlike Epson printers that use piezoelectric crystals, Canon PIXMA printers use <strong>thermal inkjet</strong> technology. Tiny resistors inside each nozzle heat up to over 300°C in microseconds, creating a vapor bubble that forces a droplet of ink onto the paper. There are thousands of these resistors inside a single printhead.</p>
<p>When one or more of these resistors burns out (often from running the printer with an empty cartridge, which forces the resistor to fire without ink to cool it), the electrical resistance of the entire printhead changes. The motherboard detects this abnormal resistance and throws B200 to prevent the remaining resistors from overloading and potentially causing a fire.</p>

<h2>Fix 1: The Deep Clean Method</h2>
<p>Before buying a new printhead, there is a chance that the B200 error is caused by dried ink bridging two electrical contacts, creating a false short circuit reading.</p>
<ol>
    <li>Turn the printer off. Open the top cover so the carriage moves to the center.</li>
    <li>Remove every ink cartridge and set them aside on a paper towel.</li>
    <li>Locate the gray plastic locking lever at the front of the carriage. Lift it up.</li>
    <li>Grasp the printhead by its plastic sides (never touch the gold contacts or the nozzle plate on the bottom) and slide it straight up and out of the carriage.</li>
    <li>Fill a shallow dish with 1 cm of warm (not hot) <strong>distilled water</strong>. Do not use tap water, as the minerals can permanently clog the nozzles.</li>
    <li>Place the printhead nozzle-side down in the dish. Let it soak for 10 to 15 minutes. You will see clouds of ink dissolving into the water.</li>
    <li>Lift the printhead out, and use a lint-free cloth to gently dab the gold electrical contacts on the back of the printhead <em>and</em> the matching gold contacts inside the carriage slot.</li>
    <li>Let the printhead air dry for 30 minutes. Reinstall it, lock the lever, insert the cartridges, and turn the printer on.</li>
</ol>

<h2>Fix 2: The Power Cycle Sequence</h2>
<p>Some users have reported success with a specific power cycle sequence that forces the motherboard to re-read the printhead's voltage signature.</p>
<ol>
    <li>With the printer turned on and the B200 error displayed, open the top cover.</li>
    <li>Wait for the carriage to move to the center.</li>
    <li>While the cover is still open, unplug the power cord from the back of the printer (not from the wall).</li>
    <li>Wait 30 seconds. Plug the cord back in.</li>
    <li>Press the Power button while the cover is still open. The printer will attempt to initialize without running the full printhead voltage check.</li>
    <li>While the printer is initializing, close the top cover.</li>
</ol>
<p>This sequence works in approximately 30% of cases and is worth trying before purchasing a new printhead.</p>

<h2>When Replacement is the Only Option</h2>
<p>If the deep clean and power cycle sequence both fail, the printhead's internal resistors are permanently damaged. Canon sells replacement printheads (such as the QY6-0082 for the MG5420 series or QY6-0087 for the MB2020), but they typically cost between $40 and $80. For budget printers under $100, this often makes replacement uneconomical, and purchasing a new printer may be more cost-effective.</p>`
  },
  {
    title: "Canon Printer Error 5100: Carriage Jam & Encoder Strip Fix",
    slug: 'canon-printer-error-5100-carriage-fix',
    seoTitle: "Fix Canon Error 5100 (Carriage Jam & Encoder Strip)",
    metaDescription: "Canon error 5100 means the printhead carriage is stuck. Learn how to clear physical obstructions, clean the encoder strip, and lubricate the carriage rail.",
    excerpt: "Error 5100 is a carriage motor error. The printer has detected that the printhead cannot move freely across the rail. Here is a step-by-step fix.",
    errorCode: '5100',
    tags: 'Canon, 5100, Error Code, Carriage Jam, Encoder Strip, Carriage Motor, PIXMA',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: errorCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    featuredSnippet: "To fix Canon error 5100: 1) Turn off and unplug the printer. 2) Open the top cover and manually slide the printhead carriage left and right. If it is stuck, look for crumpled paper, a dislodged cartridge, or a foreign object blocking the track. 3) Locate the clear plastic encoder strip running behind the carriage rail. Wipe it clean with a microfiber cloth and isopropyl alcohol. 4) Apply a thin film of white lithium grease to the metal carriage rail.",
    content: `<h2>What Triggers Error 5100?</h2>
<p>Canon's <strong>Support Code 5100</strong> is one of the most common errors across the entire PIXMA range. It indicates that the carriage motor attempted to move the printhead, but encountered excessive resistance or lost its positional tracking.</p>
<p>The printer tracks the carriage's exact position using a thin, clear plastic ribbon called the <strong>encoder strip</strong> (also called the timing strip). This strip has microscopic vertical lines printed on it. An optical sensor on the carriage reads these lines to calculate speed and position. If the strip is dirty, cracked, or dislodged, the printer loses track of where the carriage is and immediately halts.</p>

<h2>Fix 1: Clearing Physical Obstructions</h2>
<p>The most common cause of 5100 is a physical jam. Something is physically preventing the carriage from sliding.</p>
<ol>
    <li>Turn the printer off and unplug it from the wall.</li>
    <li>Open the top cover to expose the carriage.</li>
    <li>With your hand, gently push the carriage from left to right across the full width of the printer. It should glide smoothly with minimal resistance.</li>
    <li>If it stops at a certain point, shine a flashlight at that exact location. Common culprits include:
        <ul>
            <li>A small piece of crumpled paper wedged under the carriage.</li>
            <li>A paperclip or staple that fell into the printer.</li>
            <li>An ink cartridge that has popped partially out of its slot and is hitting the side wall.</li>
            <li>A piece of packing tape or protective material left inside the printer from the initial unboxing.</li>
        </ul>
    </li>
    <li>Remove the obstruction with tweezers and test the carriage movement again.</li>
</ol>

<h2>Fix 2: Cleaning the Encoder Strip</h2>
<p>If the carriage moves freely but the error persists, the encoder strip is likely dirty.</p>
<ol>
    <li>With the printer unplugged, look behind the metal carriage rail. You will see a thin, almost invisible, clear plastic strip running horizontally across the full width of the printer.</li>
    <li>Take a clean microfiber cloth and apply a small amount of isopropyl alcohol (90% or higher) to it.</li>
    <li>Gently pinch the encoder strip with the damp cloth and wipe from one end to the other. Do not pull hard or twist the strip; it is held by delicate spring clips.</li>
    <li>You will likely see a gray or black smudge transfer onto the cloth. This is aerosolized ink mist that has settled on the strip over months of printing, blinding the optical sensor.</li>
    <li>Let the strip air dry for 5 minutes before turning the printer back on.</li>
</ol>

<h2>Fix 3: Lubricating the Carriage Rail</h2>
<p>If the carriage glides freely when pushed by hand, but the motor still cannot pull it, the factory grease on the metal rail has hardened into a sticky paste.</p>
<p>Wipe the old grease off the top and front surfaces of the metal rail with a paper towel. Apply a very thin line of <strong>white lithium grease</strong> or sewing machine oil along the rail. Slide the carriage back and forth manually a dozen times to distribute the lubricant evenly. <em>Never use WD-40, as it evaporates quickly and damages the surrounding plastic components.</em></p>`
  },
  {
    title: "Canon Printer Error 5200: Overheating & Power Board Diagnostics",
    slug: 'canon-printer-error-5200-overheating-fix',
    seoTitle: "Fix Canon Error 5200 (Printer Overheating & Power Fault)",
    metaDescription: "Canon error 5200 indicates the printer's internal temperature has exceeded safe limits. Learn how to diagnose overheating caused by ink levels, ventilation, and power board issues.",
    excerpt: "Error 5200 is a thermal protection error. Canon's motherboard has detected that the printhead or power supply is dangerously overheating.",
    errorCode: '5200',
    tags: 'Canon, 5200, Error Code, Overheating, Temperature, Power Board, Thermal Protection',
    wordCount: 1050,
    difficultyLevel: 'Intermediate',
    timeToFix: '20 minutes',
    categoryId: errorCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix Canon error 5200: 1) Turn the printer off and let it cool for 30 minutes in a well-ventilated area. 2) Check all ink cartridges. An empty cartridge forces the printhead resistors to fire without ink to absorb the heat, causing overheating. Replace any empty or low cartridges. 3) Clean the printhead nozzles with warm distilled water to restore ink flow. 4) Ensure the printer is not placed in direct sunlight or next to a heat source.",
    content: `<h2>Understanding Thermal Protection Error 5200</h2>
<p>Canon printers use thermal inkjet technology, meaning the printhead generates extreme, localized heat (over 300°C at each nozzle) to vaporize ink and force droplets onto paper. Under normal conditions, the liquid ink flowing through the nozzle channels acts as a coolant, absorbing the heat and carrying it away.</p>
<p><strong>Error 5200</strong> is triggered when the motherboard's temperature monitoring circuit detects that the printhead assembly, the power supply board, or the internal chassis temperature has exceeded safe operational limits. This is a safety feature designed to prevent component damage or fire risk.</p>

<h2>Cause 1: Printing with Empty or Low Cartridges</h2>
<p>The single most common cause of error 5200 is running the printer with one or more ink cartridges that are nearly or completely empty.</p>
<p>When a cartridge runs dry, the thermal resistors inside the printhead continue firing at 300°C, but there is no liquid ink flowing through the channel to absorb the heat. Within minutes, the accumulated thermal energy causes the printhead temperature to spike, triggering the 5200 shutoff.</p>
<ul>
    <li>Remove all cartridges and visually inspect them. If any cartridge feels noticeably lighter than the others, it is likely empty.</li>
    <li>Replace the empty cartridge. Even if you only print in black and white, a single dry color cartridge will overheat its corresponding nozzle bank and trigger 5200.</li>
</ul>

<h2>Cause 2: Clogged Nozzles Restricting Ink Flow</h2>
<p>Even if your cartridges are full, the ink might not be flowing. If the printhead nozzles are severely clogged with dried ink, the resistors fire, but the ink cannot reach them to provide cooling.</p>
<ol>
    <li>Remove the printhead from the carriage (lift the gray locking lever).</li>
    <li>Soak the nozzle plate in warm distilled water for 15 minutes.</li>
    <li>Gently blot the nozzle plate with a damp paper towel. You should see ink colors bleeding onto the towel, confirming the channels are open.</li>
    <li>Reinstall the printhead, refill or replace the cartridges, and run a cleaning cycle.</li>
</ol>

<h2>Cause 3: Environmental Overheating</h2>
<p>Canon printers have an operating temperature range of approximately 5°C to 35°C (41°F to 95°F). If the printer is placed in direct sunlight near a window, or right next to a space heater or radiator, the ambient temperature can push the internal temperature past the safety threshold.</p>
<p>Move the printer to a cooler, well-ventilated location. Ensure there is at least 6 inches of clearance behind the rear vent. Turn the printer off and let it cool for 30 minutes before attempting to print again.</p>

<h2>Cause 4: Power Board Failure (Rare)</h2>
<p>In rare cases, the 5200 error is caused by a failing voltage regulator on the printer's internal power supply board. If the board is sending excessive voltage to the printhead, the resistors are forced to generate more heat than designed. This typically requires professional repair or board replacement.</p>`
  },
  {
    title: "Canon Printer Error 5400: Temperature Sensor Fault Guide",
    slug: 'canon-printer-error-5400-temperature-fix',
    seoTitle: "Fix Canon Error 5400 (Temperature Sensor & Thermal Fault)",
    metaDescription: "Canon error 5400 is closely related to 5200 but specifically points to a temperature sensor or thermal shutdown event. Learn how to diagnose and fix it.",
    excerpt: "Error 5400 is a thermal sensor variant of the overheating family. Unlike 5200 which warns of general heat, 5400 points to a specific sensor reading failure.",
    errorCode: '5400',
    tags: 'Canon, 5400, Error Code, Temperature Sensor, Thermal Shutdown, Overheating',
    wordCount: 950,
    difficultyLevel: 'Intermediate',
    timeToFix: '20 minutes',
    categoryId: errorCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "To fix Canon error 5400: 1) Turn off the printer and unplug it for 15 minutes to allow it to fully cool down. 2) Ensure all ink cartridges are at least 25% full, as dry nozzles overheat. 3) Remove and reseat the printhead to ensure the temperature sensor contacts are making a clean connection with the carriage. 4) If the error appears immediately upon power-on (before any printing), the onboard thermistor has failed and the printhead must be replaced.",
    content: `<h2>Error 5400 vs 5200: The Difference</h2>
<p>Both <strong>error 5200</strong> and <strong>error 5400</strong> belong to Canon's thermal protection family, but they have a subtle technical difference. Error 5200 is a general thermal overload warning (the printer got too hot). Error 5400, however, is specifically triggered when the <strong>printhead's onboard temperature sensor (thermistor)</strong> returns a reading that is either impossibly high, impossibly low, or completely absent.</p>
<p>In other words, 5200 means "it IS too hot," while 5400 means "the sensor SAYS something is wrong with the temperature reading." The sensor itself might be faulty, or the electrical connection between the sensor and the motherboard might be dirty.</p>

<h2>Fix 1: Reseat the Printhead Contacts</h2>
<p>The thermistor embedded in the printhead communicates its temperature reading to the motherboard through the gold electrical contacts on the back of the printhead. If these contacts are corroded, smeared with ink, or not making firm contact with the carriage pins, the motherboard receives a garbled temperature reading and throws 5400.</p>
<ol>
    <li>Turn the printer off. Open the cover and remove all cartridges.</li>
    <li>Lift the gray locking lever and remove the printhead.</li>
    <li>Take a lint-free cloth dampened with isopropyl alcohol. Gently wipe the gold contacts on the back of the printhead.</li>
    <li>Use the same cloth to wipe the matching gold spring-loaded pins inside the carriage slot.</li>
    <li>Reinstall the printhead firmly. Push down until the locking lever clicks into place with a solid snap.</li>
</ol>

<h2>Fix 2: The Cooling Period</h2>
<p>If the error appeared during a long, continuous print run (such as printing 50 pages of full-color photos), the printhead has genuinely overheated and the thermistor is doing its job correctly.</p>
<p>Unplug the printer. Open the top cover to allow airflow. Let it sit undisturbed for at least 15 to 20 minutes. When you plug it back in and turn it on, the thermistor will read a safe ambient temperature and allow the printer to proceed.</p>

<h2>Fix 3: Cartridge Check</h2>
<p>An empty cartridge is the number one indirect cause of 5400. When a nozzle bank fires without ink, the nozzle heats uncontrollably. The thermistor detects the spike and triggers the error. Check all cartridges (not just the one your document uses) and replace any that are empty.</p>

<h2>When the Thermistor is Dead</h2>
<p>If the printer throws 5400 the instant it turns on—before any printing occurs and while the printhead is at room temperature—the thermistor itself has failed. This tiny component is embedded inside the printhead and cannot be individually replaced. The entire printhead unit must be swapped.</p>`
  },
  {
    title: "Canon Printer Error 5700: Sheet Feeder Mechanism & Roller Fix",
    slug: 'canon-printer-error-5700-sheet-feeder-fix',
    seoTitle: "Fix Canon Error 5700 (Sheet Feeder & ASF Motor Failure)",
    metaDescription: "Canon error 5700 means the Automatic Sheet Feeder (ASF) motor has failed or the paper pick-up rollers are slipping. Learn how to clean and fix the feed mechanism.",
    excerpt: "Error 5700 points directly to the Automatic Sheet Feeder (ASF) motor. The printer tried to grab a sheet of paper and the motor either stalled or got no feedback.",
    errorCode: '5700',
    tags: 'Canon, 5700, Error Code, Sheet Feeder, ASF Motor, Paper Feed, Roller Cleaning',
    wordCount: 1050,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: errorCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix Canon error 5700: 1) Turn the printer off. Remove all paper from the rear tray and the front cassette. 2) Look for any jammed or torn paper inside the feed path. 3) Use a damp, lint-free cloth to wipe the gray rubber pick-up rollers visible in the rear feed slot. Paper dust makes the rollers smooth and unable to grip. 4) Fan the paper stack to separate the sheets and reload it. If the rollers are visibly cracked or hardened, they must be replaced.",
    content: `<h2>The ASF Motor and Error 5700</h2>
<p>Canon's <strong>error 5700</strong> is an ASF (Automatic Sheet Feeder) motor error. When you send a print job, the first thing the printer does is spin a small motor connected to rubber rollers. These rollers reach into the paper tray, press against the top sheet, and pull it down into the print mechanism.</p>
<p>Error 5700 is triggered when the motherboard detects one of two conditions: either the ASF motor is stalled (it cannot spin at all), or the motor is spinning but the paper sensor downstream is not detecting any paper arriving. In other words, the rollers are spinning in thin air.</p>

<h2>Fix 1: Cleaning the Pick-Up Rollers</h2>
<p>The number one cause of 5700 is dirty rollers. Over time, microscopic paper fibers and dust coat the rubber rollers, making them perfectly smooth. When the rollers are too smooth, they spin against the paper without gripping it—like a bald tire on wet asphalt.</p>
<ol>
    <li>Turn the printer off and unplug it.</li>
    <li>Remove all paper from the rear tray.</li>
    <li>Look into the rear paper feed slot. You will see one or two gray rubber rollers.</li>
    <li>Dampen a lint-free cloth with water (or isopropyl alcohol for stubborn buildup).</li>
    <li>Press the damp cloth firmly against one roller. With your other hand, manually rotate the roller by reaching behind it or by gently spinning the visible gear mechanism. Wipe the entire circumference of each roller.</li>
    <li>Let the rollers dry for 5 minutes. Reload paper and test.</li>
</ol>

<h2>Fix 2: Paper Stack Preparation</h2>
<p>If the rollers are clean but the error persists, the paper sheets might be stuck together. Humidity causes sheets to cling.</p>
<ul>
    <li>Take the entire stack of paper out of the tray.</li>
    <li>Fan the stack by holding one edge and riffling through it like a deck of cards. This introduces air between each sheet.</li>
    <li>Tap the bottom edge of the stack firmly on a flat table to perfectly align all edges.</li>
    <li>Reload the stack and adjust the paper guides so they are snug (but not crushing) against the edges of the paper.</li>
</ul>

<h2>Fix 3: The Worn Roller Problem</h2>
<p>Rubber rollers have a finite lifespan. After approximately 10,000 to 15,000 pages, the rubber begins to harden and crack. A hardened roller cannot generate enough friction to grip paper, regardless of how clean it is.</p>
<p>If the gray rubber looks shiny, cracked, or feels hard to the touch (instead of soft and tacky), the rollers must be replaced. Canon sells replacement roller kits for most PIXMA models, typically priced between $10 and $20. Installation usually involves removing a single clip or screw to slide the old roller off a metal shaft and sliding the new one on.</p>`
  },
  {
    title: "Canon Printer Error 6000: Internal Paper Jam Sensor Fix",
    slug: 'canon-printer-error-6000-paper-jam-fix',
    seoTitle: "Fix Canon Error 6000 (Paper Jam Sensor & Feed Fault)",
    metaDescription: "Canon error 6000 is a paper jam or paper feed error. Learn how to clear hidden jams in the duplexer, clean the paper sensors, and fix phantom jam errors.",
    excerpt: "Error 6000 means the paper feed mechanism has detected a jam, but the jam isn't always where you expect it. Discover hidden jam locations and phantom sensor triggers.",
    errorCode: '6000',
    tags: 'Canon, 6000, Error Code, Paper Jam, Paper Feed, Duplexer, Sensor',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: errorCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredSnippet: "To fix Canon error 6000: 1) Turn the printer off and open the rear access panel. Pull out any crumpled or torn paper slowly and evenly. 2) Check the front output tray for paper stuck between the exit rollers. 3) If using duplex (two-sided) printing, pop open the rear duplexer unit and check for paper folded inside the reversing mechanism. 4) If no paper is found, a tiny scrap of paper may be blocking the internal paper width sensor. Use compressed air to blow debris out of the feed path.",
    content: `<h2>Paper Jams and Phantom Jams</h2>
<p>Canon's <strong>error 6000</strong> (also displayed as Support Code 6000 on touchscreen models) is a paper feed error. The printer attempted to pull a sheet of paper through the mechanism, and the paper either didn't arrive at the expected sensor, arrived too slowly, or got physically jammed between the rollers.</p>
<p>The frustrating part of error 6000 is that it frequently appears even when there is <em>no visible paper jam</em>. This is because Canon printers have multiple small optical sensors along the paper path, and even a tiny fragment of torn paper (smaller than a postage stamp) can block one of these sensors.</p>

<h2>Fix 1: The Rear Access Panel</h2>
<p>Most Canon PIXMA printers have a removable rear panel that provides access to the paper path.</p>
<ol>
    <li>Turn the printer off.</li>
    <li>Turn the printer around. You will see a rectangular plastic panel with a small handle or indentation. Press the release tabs and pull it straight off.</li>
    <li>Look inside the exposed roller mechanism. If you see crumpled paper, grip it with both hands and pull it <strong>slowly and evenly downward</strong>. Do not yank it quickly, as this can tear the paper and leave fragments behind.</li>
    <li>Snap the rear panel back into place.</li>
</ol>

<h2>Fix 2: The Front Exit Jam</h2>
<p>Paper can also jam as it exits the printer from the front output tray.</p>
<ul>
    <li>Look at the front output slot. If you see the edge of a sheet of paper poking out, grasp it firmly and pull it straight outward. Do not pull it backward into the printer.</li>
    <li>If the paper is mostly inside the printer but won't come out from the front, turn the printer off, open the top cover, and look down at the platen. You may be able to see the paper curled around the exit rollers. Gently pull it free.</li>
</ul>

<h2>Fix 3: The Duplexer Trap</h2>
<p>If you were printing two-sided (duplex) when the error occurred, the jam is almost certainly inside the rear duplexer mechanism. After printing the first side of the page, the printer pulls the sheet backward into the duplexer unit, flips it, and feeds it through again. Paper frequently crumples inside this tight U-turn.</p>
<p>Remove the rear access panel. Some models have a secondary inner flap or duplexer cassette that pulls outward separately. Open this inner mechanism to find the stuck sheet.</p>

<h2>Fix 4: Clearing the Phantom Jam</h2>
<p>If you have searched every accessible area and found absolutely no paper, you are dealing with a phantom jam caused by a sensor obstruction.</p>
<ol>
    <li>Use a can of compressed air and blast short bursts into the rear feed slot, the front output slot, and any accessible openings in the paper path.</li>
    <li>You are trying to dislodge a tiny scrap of paper, a piece of a sticky label's backing, or a clump of paper dust that is resting on top of one of the small black plastic sensor flags inside the mechanism.</li>
    <li>After blowing, turn the printer on. If the error clears, the debris has been displaced.</li>
</ol>`
  },
  {
    title: "Canon Printer Error 6A00: Cartridge Carriage Jam Explained",
    slug: 'canon-printer-error-6a00-cartridge-jam-fix',
    seoTitle: "Fix Canon Error 6A00 (Cartridge & Purge Unit Jam)",
    metaDescription: "Canon error 6A00 means the ink purge unit (the waste ink pump mechanism) is jammed or the cartridge carriage is blocked during its parking sequence.",
    excerpt: "Error 6A00 is often confused with 5100, but it specifically points to the purge unit and parking mechanism, not the main carriage motor.",
    errorCode: '6A00',
    tags: 'Canon, 6A00, Error Code, Purge Unit, Cartridge Jam, Parking Station, Waste Ink Pump',
    wordCount: 1000,
    difficultyLevel: 'Advanced',
    timeToFix: '20 minutes',
    categoryId: errorCategory,
    authorId: authors.david,
    reviewerId: authors.elena,
    featuredSnippet: "To fix Canon error 6A00: 1) Turn the printer off and unplug it. 2) Open the top cover and slide the printhead carriage to the center manually. 3) Look at the far right side of the printer where the carriage parks. You will see the purge unit (a small rubber cap assembly with tubing). If this mechanism is stuck or blocked by dried ink, manually push it down with a cotton swab. 4) Clean the rubber capping pads with warm water to remove dried ink buildup.",
    content: `<h2>What is Error 6A00?</h2>
<p>Canon's <strong>error 6A00</strong> is distinct from the more common 5100 carriage jam. While 5100 means the carriage motor is struggling to move the printhead left and right across the page, 6A00 specifically targets the <strong>purge unit</strong> (also called the ink absorber cap station or service station).</p>
<p>The purge unit is the small mechanical assembly on the far right side of the printer where the printhead "parks" when not in use. It consists of small rubber suction cups, a vacuum pump, and tubing that connects to the waste ink pad. Its job is to cap the printhead nozzles to prevent them from drying out, and to periodically suction-clean clogged nozzles by pulling ink through them with negative pressure.</p>

<h2>Why the Purge Unit Jams</h2>
<p>Over time, waste ink passes through the purge unit's tubing and accumulates in and around the rubber caps. This dried ink creates a sticky, gummy residue that can physically jam the purge unit's vertical movement (it needs to lift up to cap the printhead and drop down when the carriage needs to move). If the purge unit is stuck in the "up" position, the carriage crashes into it when trying to park, triggering 6A00.</p>

<h2>Fix 1: Manual Release of the Purge Unit</h2>
<ol>
    <li>Turn the printer off and unplug it.</li>
    <li>Open the top cover. The carriage may be stuck against the right wall. Gently push it to the center to expose the purge unit.</li>
    <li>Look at the far right corner. You will see a small platform with rubber caps (usually white or dark gray) and some plastic tubing.</li>
    <li>Take a cotton swab or a wooden toothpick and gently press down on the rubber cap platform. It should move downward smoothly. If it resists, dried ink is gluing it in place.</li>
    <li>Apply a few drops of warm water or isopropyl alcohol around the base of the purge unit to dissolve the dried ink. Wait 5 minutes, then try pressing it down again.</li>
</ol>

<h2>Fix 2: Cleaning the Rubber Caps</h2>
<p>If the purge unit moves freely but the error persists, the rubber capping pads themselves may be coated in dried ink so thick that they are physically taller than designed, causing the carriage to hit them.</p>
<ul>
    <li>Dampen a cotton swab with warm water.</li>
    <li>Gently clean the top surface of each rubber cap. You will see thick, crusty ink dissolving away.</li>
    <li>Dry the caps with a lint-free cloth.</li>
</ul>

<h2>Fix 3: The Gear Train</h2>
<p>The purge unit is driven by a small set of plastic gears. If one of these gears has cracked or lost a tooth, the motor cannot lift or lower the purge unit. This requires partial disassembly of the printer's right side panel to inspect the gear train—a task best left to experienced users or repair shops.</p>`
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
