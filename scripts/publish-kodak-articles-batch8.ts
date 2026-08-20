import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const kodakBrandId = 'c5730c9d-dbad-4368-ad1c-9a44ecf890bc';
const errorCodesCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df'; // Error Codes & Alerts
const printingProblemsCategory = '0e7ca2ba-24ae-4bf9-9ca7-072b36154911'; // Printing Problems
const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd'; // Setup & Installation

// Authors
const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Kodak Dock Plus Flashing Lights: Decoding LED Error Patterns",
    slug: 'kodak-dock-plus-flashing-lights-error-codes',
    seoTitle: "Kodak Dock Plus Flashing Lights LED Patterns Decoded",
    metaDescription: "Is your Kodak Dock Plus or Mini Retro flashing red or yellow? A hardware tech decodes blinking LED error codes and how to resolve them.",
    excerpt: "Modern Kodak portable printers have no screens. Learn what blinking red, white, and yellow LED sequences mean and how to fix the underlying hardware locks.",
    errorCode: 'Blinking LED Error',
    tags: 'Kodak, Dock Plus, Mini Retro, Flashing Lights, Red Light, LED Codes, Troubleshooting',
    wordCount: 1060,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: errorCodesCategory,
    authorId: authors.david,
    reviewerId: authors.elena,
    featuredImage: null,
    featuredImageAlt: 'A Kodak Dock Plus photo printer on a counter with its status LED light flashing red',
    featuredImageCaption: 'Decoding flashing LED status indicator lights on a Kodak printer dock',
    featuredSnippet: "To decode flashing lights on a Kodak Dock Plus or Mini printer: 1) Red flashing for 10 seconds indicates a media error—check for an empty paper cassette or missing ink cartridge. 2) Red flashing continuously means a firmware update is running; do not unplug the device. 3) Blinking yellow/green means the printer is cooling down or processing print jobs. 4) Solid red indicates an internal carriage jam or motor block.",
    content: `<p>Modern Kodak portable printers — such as the Kodak Dock Plus, Dock Era, Mini 2 Retro, and Mini 3 Retro — are designed with a minimalist interface. By omitting a graphical LCD screen to conserve battery and reduce size, these printers rely entirely on a single multi-color LED indicator to communicate status and faults. When this indicator starts flashing red or cycling colors, it can be frustrating to identify the issue. Let's walk through the decoded LED flash sequences and the technical steps to clear them.</p>

<h2>The Kodak LED Diagnostic Index</h2>
<p>Refer to this diagnostic table to match the LED flash pattern on your Kodak portable or dock printer to the correct hardware status:</p>

<table class="diagnostic-table">
  <thead>
    <tr>
      <th>LED Color &amp; Pattern</th>
      <th>Indicated Device State</th>
      <th>Required Action / Fix</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Red (Flashing for 10 seconds, then White)</strong></td>
      <td>Media or Cassette Missing / Empty</td>
      <td>Check cartridge ink ribbon, verify paper is loaded in cassette, re-insert tray.</td>
    </tr>
    <tr>
      <td><strong>Red (Flashing Continuously)</strong></td>
      <td>Firmware Update in Progress</td>
      <td>Do not turn off. Keep the smartphone app active nearby until the light turns solid white.</td>
    </tr>
    <tr>
      <td><strong>Red (Solid)</strong></td>
      <td>Severe Hardware Jam / Carriage Block</td>
      <td>Unplug power, open access door, clear ribbon loop, perform pinhole reset.</td>
    </tr>
    <tr>
      <td><strong>Yellow (Solid / Slow Pulse)</strong></td>
      <td>Thermal Limit Reached (Overheating)</td>
      <td>Allow printer to sit idle for 10 minutes to cool down printhead block.</td>
    </tr>
    <tr>
      <td><strong>Blue (Solid)</strong></td>
      <td>Bluetooth Connected &amp; Idle</td>
      <td>Ready for print job transmission from app.</td>
    </tr>
    <tr>
      <td><strong>White (Slow Pulse / Breathing)</strong></td>
      <td>Processing Print Job / Heating Element</td>
      <td>Wait for dye-sub pass to cycle paper. Do not pull paper while moving.</td>
    </tr>
  </tbody>
</table>

<h2>Resolving a 10-Second Flashing Red Light (Media Fault)</h2>
<p>If the printer flashes red for 10 seconds when you send a print job, the internal sensors are failing to detect your paper or ink ribbon:</p>
<ol>
  <li><strong>Check the Paper Cassette:</strong> Ensure the plastic paper tray is clicked firmly into the front slot. If it is off-center by even a millimeter, the optical feed sensor will flag a media fault.</li>
  <li><strong>Verify Paper Loading:</strong> Remove the paper stack from the cassette. Fan the sheets to eliminate static cling, and reload them with the **glossy printing side facing up**. Do not load more than 10 sheets at once.</li>
  <li><strong>Reseat the 4PASS Cartridge:</strong> Open the side door, press the plastic lock tab to eject the cartridge, inspect the film ribbon for slack, and slide it back in until you hear it click.</li>
</ol>

<h2>Resolving a Solid Red Light (Carriage or Gear Lock)</h2>
<p>A solid red light means the mechanical motor has detected resistance and locked to prevent gear teeth from stripping. This is usually caused by a paper wrap jam or a slack ribbon ribbon:</p>
<ol>
  <li>Unplug the power cord immediately (or hold the power button for 10 seconds to force shutdown).</li>
  <li>Open the cartridge door. Check if the colored print ribbon has wrapped around the internal drive roller.</li>
  <li>If the ribbon is wrapped, **do not pull it forcefully**. Use a pair of tweezers to carefully snip the ribbon, slide the spools out, and manually clear any plastic strands from the metal capstan roller.</li>
  <li>Locate the tiny **Reset Pinhole** next to the power button or micro-USB port. Insert a paperclip for 5 seconds to reset the printer's mainboard state.</li>
  <li>Turn the printer back on. The status LED should return to solid white or flashing blue.</li>
</ol>

<div class="warning-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>Important Firmware Update Warning:</strong> If your printer is flashing red continuously, a firmware update is running. Unplugging the power or closing the Kodak Instant Printer app during this phase can corrupt the boot sector of the EEPROM chip, rendering the printer permanently unresponsive (bricked). Always ensure the battery is above 50% or plugged into power before initiating an update.
</div>

<h2>Handling Yellow LED Pulses (Thermal Protection Mode)</h2>
<p>Because dye-sublimation printing relies on a thermal printhead that reaches high temperatures to vaporize ink panels, printing multiple photos in rapid succession will heat the chassis up. If the yellow thermal protection light triggers:</p>
<ol>
  <li>Leave the printer turned on. The internal cooling fan (if equipped) or natural heat dissipation requires the printer to remain in idle mode.</li>
  <li>Wait **10 to 15 minutes**. The LED status indicator will return to solid white once the thermal sensors detect the printhead temperature is below 45°C.</li>
</ol>`,
    faqs: JSON.stringify([
      { question: 'Why is my Kodak printer flashing red even though a new cartridge is inside?', answer: 'This occurs if the chip reader pins inside the cartridge bay fail to read the cartridge chip. Clean the chip contacts with dry cloth and re-seat.', order: 1 },
      { question: 'What does a solid yellow light mean on older EasyShare Docks?', answer: 'On legacy EasyShare docks, a solid yellow light indicates the docked camera battery is currently charging.', order: 2 },
      { question: 'How do I clear a dynamic error light block?', answer: 'Perform a power cycle: Turn the printer off, remove the paper tray, unplug power for 60 seconds, reconnect, and insert the tray firmly.', order: 3 }
    ])
  },
  {
    title: "Kodak Portable Printer Won't Feed Paper: Roller Slip Fixes",
    slug: 'kodak-printer-wont-feed-photo-paper-slips',
    seoTitle: "Kodak Printer Won't Feed Paper: Rubber Roller Slipping Fix",
    metaDescription: "Is your Kodak Mini Retro or Dock Plus failing to feed paper? A technician explains how to clean micro-rubber rollers and prevent slips.",
    excerpt: "Paper feed slips and 'No Paper' errors on Kodak pocket printers occur when the small rubber pickup rollers get coated in paper dust. Learn how to restore traction.",
    errorCode: 'Paper Feed Slip',
    tags: 'Kodak, Feed Failure, Paper Slip, Pickup Rollers, Mini Retro, Dock Plus, Cleaning',
    wordCount: 1040,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: printingProblemsCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredImage: null,
    featuredImageAlt: 'Close-up of a hand using a swab to clean the small rubber pick roller inside a portable printer slot',
    featuredImageCaption: 'Cleaning the paper pickup rollers on a Kodak portable printer',
    featuredSnippet: "To resolve paper feed slipping on a Kodak portable printer: 1) Turn off the printer and remove the paper cassette. 2) Look inside the feed slot and locate the small grey rubber pickup rollers. 3) Dampen a lint-free cotton swab with warm distilled water. 4) Wipe the roller tires while manually rotating them to remove paper dust. 5) Let dry, reload paper, and ensure the glossy side faces up.",
    content: `<p>One of the most common complaints among users of Kodak portable photo printers (like the Kodak Mini 3 Retro and Dock Plus) is the "Paper Feed Failure" or "No Paper" warning. The printer gears will spin, but the sheet stays in the tray, or the printer grabs the sheet, slips, and throws an error light. Because these printers are small, their rubber rollers are tiny. A small amount of paper dust or fingerprint oil on the rollers can cause them to lose traction on the glossy sheets. Let's look at the cleaning and calibration steps to restore traction.</p>

<h2>The Physics of Miniaturized Paper Feeding</h2>
<p>Unlike desktop printers that use heavy-duty spring-loaded pickup assemblies, Kodak portable printers use small, low-torque rubber drive rollers. The print paper has a highly polished glossy coating. If dust, hair, or oil from your fingers gets onto the sheets or the rollers, the friction coefficient drops. The rollers spin against the paper without pulling it, causing the sensor timing to expire and trigger a feed error.</p>

<h2>Step 1: Clean the Rubber Pickup Rollers</h2>
<p>To restore friction to the rubber roller surfaces:</p>
<ol>
  <li>Power down the printer and unplug the charger.</li>
  <li>Remove the paper cassette (or open the rear paper door for Mini models).</li>
  <li>Shine a flashlight into the paper entry slot. You will see one or two small, grey rubber wheels mounted on a metal drive shaft.</li>
  <li>Dampen a cotton swab with **distilled water**. **Do not use rubbing alcohol on these specific rollers**, as alcohol degrades and hardens the soft rubber compound used in portable devices over time.</li>
  <li>Press the damp swab against the rubber roller. Use your other hand to manually rotate the gears (visible on the side of the slot) to roll the wheel under the swab.</li>
  <li>Repeat this process with a dry cotton swab to clean off any remaining water. Let the rollers air dry for 5 minutes.</li>
</ol>

<h2>Step 2: Clean and Fan the Photo Paper</h2>
<p>Photo paper is often packed tightly, creating static cling that locks the sheets together:</p>
<ol>
  <li>Remove the paper stack from the cassette tray.</li>
  <li>**Avoid touching the glossy print surface.** Hold the sheets only by the edges or the perforated tab strips. Fingerprint oils on the gloss coating will prevent both paper feeding and proper ink transfer.</li>
  <li>Gently fan the stack of sheets like a deck of cards to break any vacuum locks or static electricity between them.</li>
  <li>Inspect the edges for minor bends. If a sheet has a curled corner, discard it, as the low-clearance feed path of the portable printer will block it immediately.</li>
  <li>Reload the paper into the tray. For **Dock Plus**, ensure the glossy side is facing **up**. For **Mini Retro**, ensure the glossy side is facing **down** inside the slot.</li>
</ol>

<h2>Step 3: Clean the Front Alignment Plate</h2>
<p>The plastic paper tray (cassette) has small alignment hooks that guide the paper sheet into the nip of the feed rollers. If these hooks are dusty or bent:</p>
<ol>
  <li>Wipe the internal plastic guide rails of the cassette with a dry microfiber cloth.</li>
  <li>Inspect the paper tray door. Ensure the latch is undamaged and snaps into the printer chassis with a firm click. If the tray sits loose, the rollers will not reach the paper stack.</li>
</ol>

<div class="warning-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>Avoid Third-Party Paper Kits:</strong> Third-party paper and ink cassettes often use slightly different paper thickness specs and gloss coefficients. Kodak printers calibrate their feed rollers based on the exact weight of genuine Kodak paper. Using cheaper third-party alternatives is a major cause of roller slippage.
</div>

<h2>Step 4: Perform a Hard Power Reset</h2>
<p>If the printer continues to report a paper jam or feed error when the rollers are clean, the internal sensor flags may need resetting:</p>
<ol>
  <li>With the printer turned on, locate the reset pinhole near the charging port.</li>
  <li>Use a paperclip to hold the reset switch down for 5 seconds.</li>
  <li>The printer will run a self-test cycle, spinning the rollers to verify the paper path is clear, and resetting the optical sensor values.</li>
</ol>`,
    faqs: JSON.stringify([
      { question: 'Why does my printer print half a photo and then slip?', answer: 'This occurs if the paper rollers slip during one of the dye passes. Clean the rollers and verify the cartridge film has sufficient tension.', order: 1 },
      { question: 'Can I reuse photo paper that failed to print?', answer: 'If the paper has run through a single color pass, it cannot be reused. If it slipped before printing started, you can reload it as long as the glossy coating is clean.', order: 2 },
      { question: 'Why does the printer grab multiple sheets at once?', answer: 'This is caused by static electricity holding the sheets together. Remove the stack, fan the sheets, and reload them.', order: 3 }
    ])
  },
  {
    title: "How to Fix Kodak Printer Firmware Update Failures & Loops",
    slug: 'kodak-printer-firmware-update-failed-loop',
    seoTitle: "Fix Kodak Printer Firmware Update Frozen or Failed Loop",
    metaDescription: "Did your Kodak printer firmware update freeze at 50% or 99%? A systems tech guides you through Bluetooth stack clears and firmware recovery.",
    excerpt: "Firmware update failures on Kodak portable printers often leave them bricked or blinking. Learn how to recover your device using Bluetooth reset sequences.",
    errorCode: 'Firmware Update Hang',
    tags: 'Kodak, Firmware, Update Failed, Frozen Update, Bluetooth Reset, Portable Printer',
    wordCount: 1020,
    difficultyLevel: 'Advanced',
    timeToFix: '20 minutes',
    categoryId: setupCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredImage: null,
    featuredImageAlt: 'A smartphone displaying the Kodak Instant Printer app showing a firmware update progress bar frozen at 99%',
    featuredImageCaption: 'Troubleshooting a frozen firmware update on a Kodak portable printer',
    featuredSnippet: "To recover a Kodak printer stuck in a firmware update loop: 1) Ensure the printer is plugged into power and your phone is within 2 feet of the printer. 2) Force-close the Kodak app, turn off Bluetooth on your phone, and perform a pinhole reset on the printer. 3) Clear the Bluetooth cache in your phone settings. 4) Turn Bluetooth back on, launch the app, and re-initiate the firmware update.",
    content: `<p>Portable Kodak printers rely on firmware updates transmitted via Bluetooth from the **Kodak Photo Printer** or **Kodak Instant Printer** app. These updates resolve app compatibility issues and optimize thermal printing colors. However, because Bluetooth is prone to interference, firmware updates frequently freeze (typically at 50% or 99%) or fail mid-transfer. This can leave the printer stuck in a blinking red loop or completely unresponsive (bricked). Let's look at the troubleshooting flow to recover your printer's firmware.</p>

<h2>Why Firmware Updates Freeze</h2>
<p>Unlike USB updates, wireless firmware updates are sent in small data packets over a Bluetooth RFCOMM channel. If your phone moves too far away, receives a phone call, or switches Wi-Fi networks mid-transfer, the data stream drops. If the printer receives an incomplete firmware block, its bootloader program locks to prevent a corrupt boot, leaving the status LED blinking rapidly.</p>

<h2>Phase 1: The Pinhole Bootloader Force-Reset</h2>
<p>If the printer's status light is blinking continuously and it refuses to turn off using the power button, you must force-clear the cached update block:</p>
<ol>
  <li>Ensure the printer is connected to its USB charging cable (plugged into a wall adapter, not a computer port, to ensure stable current).</li>
  <li>Locate the tiny **Reset Pinhole** next to the power button or charging port.</li>
  <li>Insert a straightened paperclip into the pinhole and **hold the switch down for a full 10 seconds**.</li>
  <li>Release the paperclip. The LED light should turn off.</li>
  <li>Press the power button for 3 seconds to turn the printer back on. If the LED turns solid white, the printer has successfully reverted to its last stable firmware version. If it continues to flash red, proceed to Phase 2.</li>
</ol>

<h2>Phase 2: Clear the Phone's Bluetooth Cache</h2>
<p>A failed update often leaves a corrupt pairing profile in your phone's Bluetooth transceiver cache, blocking any new firmware transfers:</p>
<h3>For Android Devices:</h3>
<ol>
  <li>Open **Settings** &gt; **Apps** &gt; **See all apps**.</li>
  <li>Tap the three dots in the top-right corner and select **Show system apps**.</li>
  <li>Scroll down and select **Bluetooth** (or Bluetooth Legacy Link).</li>
  <li>Tap **Storage &amp; Cache**, then tap **Clear Cache** and **Clear Data**.</li>
  <li>Restart your phone.</li>
</ol>
<h3>For iOS Devices (iPhone/iPad):</h3>
<ol>
  <li>Go to **Settings** &gt; **Bluetooth**.</li>
  <li>Find your Kodak printer in the list of My Devices.</li>
  <li>Tap the **"i" info icon** next to it and select **Forget This Device**.</li>
  <li>Toggle the main Bluetooth switch **Off**, wait 10 seconds, and turn it back **On**.</li>
</ol>

<h2>Phase 3: Re-establish the Firmware Link</h2>
<p>With the caches cleared, rerun the firmware write process under optimal conditions:</p>
<ol>
  <li>Move the printer and your phone to a room away from other active Bluetooth devices, microwave ovens, or baby monitors to reduce network noise.</li>
  <li>Launch the **Kodak Instant Printer** app.</li>
  <li>Connect the printer via the app connection menu.</li>
  <li>If the app prompts you that a firmware update is available, tap **OK**.</li>
  <li>**Do not lock your phone screen or switch to another app** during the update process. Keep the app open in the foreground and place the phone directly next to the printer until the progress bar reaches 100% and the printer automatically reboots.</li>
</ol>

<div class="warning-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>Do Not Update on Low Battery:</strong> Kodak portable printers block firmware updates if the internal lithium-ion battery is below 30%. However, if the battery sensor is miscalibrated, the update may start and fail mid-transfer as the voltage drops. Always perform updates while the printer is plugged into a live wall charger.
</div>`,
    faqs: JSON.stringify([
      { question: 'What do I do if my Kodak printer won\'t turn on after an update?', answer: 'Perform a hard reset by plugging the printer into power and holding the reset pinhole switch for 15 seconds. If this fails, the firmware is bricked and the mainboard must be replaced.', order: 1 },
      { question: 'Why does the Kodak app fail to find my printer?', answer: 'This occurs if location permissions are disabled. Android and iOS require active Location Services for apps to scan for low-energy Bluetooth (BLE) devices.', order: 2 },
      { question: 'How long does a firmware update take?', answer: 'A typical firmware update over Bluetooth takes between 2 to 4 minutes depending on connection speeds and phone processing power.', order: 3 }
    ])
  },
  {
    title: "How to Fix Lines and Streaks on Kodak Portable Photos",
    slug: 'kodak-printer-lines-on-photos-printhead-cleaning',
    seoTitle: "Fix Lines and Streaks on Kodak Portable Photo Prints",
    metaDescription: "Are your Kodak Mini or Dock Plus photos showing horizontal white lines or color streaks? A hardware tech explains thermal printhead cleaning.",
    excerpt: "Streaks, vertical white lines, and color bands on Kodak portable prints are caused by dust on the thermal printhead or slack spools. Learn how to clean it.",
    errorCode: 'Line Streaks',
    tags: 'Kodak, Lines on Photos, Streaks, Thermal Printhead, 4PASS, ZINK, Cleaning Card',
    wordCount: 1090,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: printingProblemsCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    featuredImage: null,
    featuredImageAlt: 'A photo printed from a Kodak Dock showing distinct horizontal white lines across the middle of the print',
    featuredImageCaption: 'Horizontal line banding error on a Kodak dye-sub photo print',
    featuredSnippet: "To resolve lines and streaks on Kodak portable prints: 1) Open the side cartridge door and eject the 4PASS cartridge. 2) Look inside the upper cavity to locate the copper-colored line of the thermal printhead. 3) Dampen a lint-free cotton swab with 99% isopropyl alcohol. 4) Gently wipe the printhead strip from left to right. 5) Tighten any slack in the cartridge ribbon spools before reinserting.",
    content: `<p>Kodak portable printers (using either 4PASS dye-sublimation cartridges or ZINK zero-ink thermal sheets) produce beautiful, smudge-resistant photos. However, because they are designed for portable use, they are prone to capturing lint and dust. When dust particles settle on the internal **thermal printhead strip** or the cartridge spools lose tension, your printed photos will show **horizontal white lines**, **vertical color streaks**, or **missing color bands**. Let's walk through how to clean and calibrate the thermal print path.</p>

<h2>The Difference Between 4PASS and ZINK Line Faults</h2>
<p>To target your troubleshooting, identify the type of line print issue you are experiencing:</p>
<ul>
  <li><strong>Horizontal White Lines (4PASS):</strong> A continuous white line running across the short edge of the photo. This indicates a speck of dust is blocking a specific thermal pixel on the printhead, preventing it from heating the wax ribbon at that point.</li>
  <li><strong>Vertical Color Streaks (4PASS):</strong> A solid cyan, magenta, or yellow line running the long edge. This indicates a scratch on the cartridge ribbon film or a wrinkled ribbon panel.</li>
  <li><strong>Faded Color Banding (ZINK):</strong> Horizontal bands of color mismatch. This is caused by dirty optical sensors failing to read the blue calibration sheet barcode correctly, resulting in wrong heat profiles.</li>
</ul>

<h2>Step 1: Clean the Thermal Printhead Strip</h2>
<p>The thermal printhead contains a high-density line of tiny heating resistors. To clean this strip safely:</p>
<ol>
  <li>Power off the printer and remove the ink cartridge (for 4PASS) or the paper stack (for ZINK).</li>
  <li>Locate the printhead: Look inside the upper ceiling of the cartridge compartment. You will see a long, thin, copper-colored metallic strip (approx. 2 inches long). **Do not touch it with your bare fingers**, as skin oils can cause hot-spots that burn out the resistors.</li>
  <li>Dampen a cotton swab with **99% Isopropyl Alcohol**. (Do not use 70% rubbing alcohol, as the remaining water content can short the heating elements).</li>
  <li>Gently wipe the swab along the copper strip from left to right. **Do not use scrubbing pressure** or metal tools, as scratches on the protective glass coating are permanent.</li>
  <li>Allow the alcohol to evaporate completely (approx. 3 minutes) before reassembling.</li>
</ol>

<h2>Step 2: Tighten and Adjust the Cartridge Spools</h2>
<p>Loose ribbon spools cause the film to wrinkle as it passes over the printhead, creating vertical color lines:</p>
<ol>
  <li>Remove the cartridge from the printer.</li>
  <li>Locate the round gears on the side of the cartridge body.</li>
  <li>Using your thumb or a flat tool, turn the spools **counter-clockwise** to wind the spools until the ribbon film is tight and flat against the cartridge frame.</li>
  <li>If the ribbon is damaged or shows deep scratches, discard the cartridge and replace it, as these film defects will repeat on every print pass.</li>
</ol>

<div class="warning-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>Never Use Abrasive Materials:</strong> Do not use paper towels or rough cloths to clean the thermal printhead. The wood pulp fibers in paper towels can scratch the micro-resistors on the printhead assembly, leading to permanent, unrepairable white line streaks on all future photo prints.
</div>

<h2>Step 3: Run the ZINK Cleaning/Calibration Sheet</h2>
<p>If you are using a ZINK-based model (like the Kodak Step or Kodak Smile) and see faded color banding:</p>
<ol>
  <li>Locate the blue **ZINK Smart Sheet** (calibration sheet) that came in your photo paper pack. It has a barcode on the bottom side.</li>
  <li>Load the blue sheet into the paper compartment with the **barcode facing down** (and the glossy blue side facing up).</li>
  <li>Send a print job. The printer will feed the blue sheet out first, cleaning the optical reader lens and updating the thermal alignment profiles.</li>
  <li>Follow this immediately by printing a photo to verify color correction.</li>
</ol>

<h2>Step 4: Clean the Exit Gate and Roller Shaft</h2>
<p>Sometimes, dust gathers on the exit rollers, dragging across the freshly laminated photo print and leaving fine scratch marks:</p>
<ol>
  <li>Open the paper exit slot cover.</li>
  <li>Use a clean, dry microfiber cloth to wipe the rubber rollers and the plastic exit gate.</li>
  <li>Ensure no paper fragments or lint are caught in the exit path.</li>
</ol>`,
    faqs: JSON.stringify([
      { question: 'Why does my printer leave a white border line at the edge?', answer: 'This is normal for models using perforated paper tabs. If the line is inside the photo boundary, it is caused by printhead dust. Clean the heating element.', order: 1 },
      { question: 'Can I clean the printhead with water?', answer: 'No. Water does not dissolve wax/oil residues and evaporates slowly, posing a corrosion risk to the printhead electronics. Always use 99% isopropyl alcohol.', order: 2 },
      { question: 'What does a missing color band mean?', answer: 'If an entire color (e.g. Cyan) is missing, the cartridge ribbon has torn or the printhead control cable has lost connection. Check the ribbon spool first.', order: 3 }
    ])
  }
];

async function main() {
  for (const article of articles) {
    try {
      await prisma.article.deleteMany({
        where: { slug: article.slug }
      });
      console.log(`Model cleanup complete for: ${article.slug}`);
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
