import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function getShingles(text: string, k = 6): Set<string> {
  const words = text
    .toLowerCase()
    .replace(/<[^>]+>/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
  const shingles = new Set<string>();
  for (let i = 0; i <= words.length - k; i++) {
    shingles.add(words.slice(i, i + k).join(' '));
  }
  return shingles;
}

function calcOverlap(setA: Set<string>, setB: Set<string>) {
  let inter = 0;
  for (const s of setA) {
    if (setB.has(s)) inter++;
  }
  const jaccard = (inter / (setA.size + setB.size - inter)) * 100;
  const contA = (inter / setA.size) * 100;
  const contB = (inter / setB.size) * 100;
  return {
    inter,
    jaccard: jaccard.toFixed(2) + '%',
    contA: contA.toFixed(2) + '%',
    contB: contB.toFixed(2) + '%',
    maxCont: Math.max(contA, contB).toFixed(2) + '%'
  };
}

export const groupAArticles = [
  {
    slug: 'rollo-printer-blank-faint-light-uneven-print-density-fix',
    title: 'Fix Rollo Printer Blank, Faint & Uneven Print Density', // 54 chars
    metaDescription: 'Fix blank, faint, or faded shipping labels on Rollo printers. Learn how to verify thermal paper, adjust density and speed, and clean the print head.', // 149 chars
    h1: 'Fix Rollo Printer Blank, Faint, Light & Uneven Print Density',
    sources: [
      {
        url: 'https://support.rollo.com/support/solutions/articles/29000000881-i-m-printing-blank-labels',
        title: 'Rollo Support: I am printing blank labels',
      },
      {
        url: 'https://support.rollo.com/support/solutions/articles/29000040950-my-labels-are-not-dark-enough',
        title: 'Rollo Support: My labels are not dark enough',
      },
      {
        url: 'https://support.rollo.com/support/solutions/articles/29000000914-there-are-white-spots-in-my-print',
        title: 'Rollo Support: There are white spots in my print',
      },
      {
        url: 'https://support.rollo.com/support/solutions/articles/29000050961-which-labels-work-with-rollo-direct-thermal-only-no-ink-or-ribbon-and-recommended-sizes',
        title: 'Rollo Support: Which labels work with Rollo',
      },
    ],
    removed: 'Removed ~700 words of generic filler ("printers are complex", "ripples of failure", "invest in consumables"), repetitive copy-pasted maintenance paragraphs, and sentence fragments ("forming an. Insulating layer"). Shifted roller cleaning to a single cross-reference link to Article #3.',
    uncommonTip: 'Run a direct thermal scratch test using a thumbnail or the edge of a coin across the label face. Direct thermal coatings immediately form a black friction streak, whereas thermal transfer media (which requires ribbons and will never print in a Rollo) remains completely white.',
    imageSuggestions: [
      'Close-up photo of the underside of the opened Rollo top cover highlighting the glass thermal print head strip and where to apply a 70% isopropyl alcohol wipe.',
      'Screenshot of Windows Printing Preferences Settings tab highlighting the Print Speed (4-5 in/sec) and Density (Darkness) slider controls.'
    ],
    content: `<p>If your Rollo printer outputs completely blank labels or faint, washed-out text, the labels are almost always inserted upside down or the direct thermal print head is coated in adhesive residue. Checking label orientation, cleaning the thermal heating elements with 70% isopropyl alcohol, and adjusting print darkness resolves almost all print clarity failures.</p>

<h2>Quick Diagnostics: Upside-Down Paper & The Scratch Test</h2>
<p>Rollo printers use direct thermal printing technology. They contain no toner, ink cartridges, or thermal transfer ribbons. The printer creates text and barcodes entirely by activating microscopic heating elements that react chemically with heat-sensitive dye embedded in the label face.</p>
<p>Because the thermal coating exists on only one side of the paper liner, feeding labels upside down will result in entirely blank labels exiting the machine. The printable peel-off label must face upward toward the ceiling as it passes through the output slot. If the silicone backing paper faces upward, the thermal print head transfers heat directly into the slick liner backing where no chemical reaction can occur.</p>
<p>To verify whether your label roll or fanfold pack is direct thermal compatible, perform a fast physical scratch test:</p>
<ol>
  <li>Place a sample label on a firm, flat surface.</li>
  <li>Firmly swipe your thumbnail or the edge of a metal coin across the label face in a fast motion.</li>
  <li>Inspect the surface for a dark gray or black line. Direct thermal coatings react immediately to frictional heat and leave a clear mark.</li>
  <li>If no mark appears on either side of the paper, the material is standard thermal transfer paper. Thermal transfer stock requires an ink ribbon and cannot be printed by any Rollo model.</li>
</ol>

<h2>How to Clean the Thermal Print Head</h2>
<p>During normal shipping operations, paper dust, loose cardboard fibers, and microscopic adhesive bleed accumulate across the thermal print head glass. As heat pulses continuously through the elements, this debris bakes into an insulating crust that physically blocks heat transfer to the paper. This creates faded barcodes, faint lettering, or thin vertical white voids across the label.</p>
<p>Follow these steps to clean the heating strip safely:</p>
<ol>
  <li>Power off the printer using the rocker switch on the rear panel and disconnect the power adapter from the electrical outlet.</li>
  <li>Allow the internal print mechanism to cool down for 2 to 3 minutes. Printing generates high surface temperatures on the heating array.</li>
  <li>Press the two side release latches forward and swing the top cover upward until it latches open.</li>
  <li>Locate the narrow, metallic-backed glass strip positioned along the underside of the top lid. This is the thermal print head.</li>
  <li>Take a standard 70% isopropyl alcohol prep pad or a clean lint-free microfiber wipe dampened with 70% or higher isopropyl alcohol.</li>
  <li>Gently wipe across the entire length of the print head glass strip from left to right, paying close attention to any darkened streaks of baked-on adhesive.</li>
  <li>Allow the alcohol film to evaporate completely for 2 minutes before closing the cover and reconnecting power.</li>
</ol>
<p>If you notice that labels are feeding sluggishly or slipping rather than printing faintly, inspect the rubber roller beneath the head; see our guide on <a href="/rollo/paper-handling-issues/rollo-printer-label-jam-not-feeding-platen-roller-cleaning">how to fix Rollo label jams and clean the platen roller</a>.</p>

<h2>Adjusting Print Darkness (Density) and Speed Settings</h2>
<p>Print darkness controls the duration and heat level of the micro-resistors as paper moves beneath the print head. Slower print speeds give the thermal coating longer exposure to heat, producing significantly darker blacks without pushing density to extreme levels.</p>

<h3>Windows Configuration (X1038 and USB Connections)</h3>
<ol>
  <li>Open Windows Settings and navigate to <strong>Bluetooth &amp; devices &gt; Printers &amp; scanners</strong>.</li>
  <li>Select your <strong>Rollo Printer</strong> and click <strong>Printing preferences</strong>.</li>
  <li>Click on the <strong>Settings</strong> tab.</li>
  <li>Locate the <strong>Print Speed</strong> setting and set it to <strong>4</strong> or <strong>5 in/sec</strong>. Lowering the speed prevents skipped heating cycles on heavy barcode bars.</li>
  <li>Adjust the <strong>Darkness (Density)</strong> slider. Rollo recommends starting around 4 to 8. Increase the value in small increments if text remains gray. Avoid setting density to maximum (12 or above), as excessive heat can melt label coatings and cause labels to stick to the head.</li>
  <li>Click <strong>Apply</strong> and <strong>OK</strong> to save changes.</li>
</ol>

<h3>macOS Configuration</h3>
<ol>
  <li>Open the PDF label in Preview or your browser and choose <strong>File &gt; Print</strong>.</li>
  <li>Select the Rollo printer in the destination menu.</li>
  <li>In the print options drop-down menu (usually titled "Preview" or "Layout"), select <strong>Printer Features</strong>.</li>
  <li>Set <strong>Print Speed</strong> to <strong>4 in/sec</strong> and increase the <strong>Darkness</strong> level.</li>
  <li>Save the configuration as a print preset for consistent future label runs.</li>
</ol>

<h3>Rollo Wireless (X1040) Settings</h3>
<p>For the wireless model, open the <strong>Rollo App</strong> on your mobile device or computer. Navigate to <strong>Menu &gt; Rollo Printer &gt; Default Rollo Printer &gt; Settings &gt; Printing Defaults</strong>. Adjust the Darkness slider downward if labels stick, or upward if graphics appear faded.</p>

<h2>Resolving Low-Resolution Source PDFs and Graphic Artifacts</h2>
<p>A frequent reason for washed-out barcodes is printing low-resolution raster images. When shipping platforms generate 72 DPI screen captures rather than vector PDFs, the printer driver applies a halftone dithering pattern to render the image. This produces jagged, gray-dotted lines that fail barcode scanners at the post office.</p>
<p>Always download shipping labels in native 4x6 inch (100mm x 150mm) PDF format rather than standard letter size (8.5x11 inches) scaled down. If your labels print skewed or cut off at the margins, follow our walkthrough on <a href="/rollo/paper-handling-issues/rollo-printer-calibration-guide-skewed-label-size-fix">Rollo printer calibration and label size setup</a>.</p>

<h2>Running the Built-in Diagnostic Hardware Test Print</h2>
<p>To isolate whether poor print density is caused by computer software drivers or the physical printer hardware, run the printer's standalone hardware test page:</p>
<ol>
  <li>Ensure direct thermal labels are loaded into the rear paper slot.</li>
  <li>Power the printer on and wait for the status light to turn solid green.</li>
  <li>Press and hold the top circular feed button until you hear <strong>two beeps</strong>, then immediately release the button.</li>
  <li>The Rollo printer will automatically output a diagnostic pattern showing test blocks, grid alignments, and printer specifications.</li>
</ol>
<p>If the built-in diagnostic test print is solid black, crisp, and dark, your printer hardware, power supply, and print head are operating perfectly. Any faintness on your actual shipping labels is caused by the source document file resolution or the print density settings configured on your computer.</p>

<h2>Frequently Asked Questions</h2>

<details>
  <summary>Why are there vertical white lines running straight down my printed labels?</summary>
  <p>Thin vertical white voids indicate that specks of adhesive, paper dust, or label coating are blocking heat on specific elements of the print head. Cleaning the glass print head strip with a 70% isopropyl alcohol wipe removes the residue. If a white line persists in the exact same pixel position after thorough cleaning, a thermal heating element has permanently burned out and the print head requires replacement.</p>
</details>

<details>
  <summary>Why did my printed shipping labels fade to blank after a few weeks?</summary>
  <p>Direct thermal labels react to heat, ultraviolet sunlight, and volatile chemicals. Applying clear packing tape directly over thermal labels causes the plasticizers and acrylic adhesives in the tape to break down the thermal dye, making barcodes disappear. Store direct thermal labels away from direct sunlight, heaters, and avoid placing adhesive shipping tape across printed areas.</p>
</details>

<details>
  <summary>Can increasing print density damage the Rollo printer?</summary>
  <p>Operating continuously at maximum darkness (density) causes excessive heat buildup across the print head resistors. This shortens the operational lifespan of the heating elements and can melt the surface coating of low-grade labels, causing labels to stick to the print head mid-print. Keep density set to the lowest level that produces crisp, readable barcodes.</p>
</details>`
  },
  {
    slug: 'rollo-printer-calibration-guide-skewed-label-size-fix',
    title: 'Calibrate Rollo Printer: Fix Skewed Labels & Sizing', // 51 chars
    metaDescription: 'Calibrate your Rollo printer to stop skipped labels, crooked feeding, and sizing errors. Step-by-step automatic gap identification and driver setup.', // 147 chars
    h1: 'How to Calibrate Rollo Printer & Fix Label Skewing / Wrong Size',
    sources: [
      {
        url: 'https://support.rollo.com/support/solutions/articles/29000000887-rollo-is-skipping-labels-or-continuously-feeding',
        title: 'Rollo Support: Rollo is skipping labels or continuously feeding',
      },
      {
        url: 'https://support.rollo.com/support/solutions/articles/29000040979-red-light-is-flashing',
        title: 'Rollo Support: Red light is flashing',
      },
      {
        url: 'https://support.rollo.com/support/solutions/articles/29000014405-mac-select-default-label-size-for-rollo',
        title: 'Rollo Support: Mac select default label size for Rollo',
      },
    ],
    removed: 'Removed ~650 words of shared boilerplate regarding office disruptions, equipment philosophy, and repeated printer maintenance. Removed copy-pasted firmware corruption troubleshooting. Isolated calibration and media alignment into concrete steps.',
    uncommonTip: 'Unplug the USB cable from the back of the Rollo printer or pause your operating system print queue before initiating the one-beep hardware calibration. If an active print job is lingering in the spooler while the printer attempts to measure label dimensions, the incoming print command cancels gap detection mid-cycle and triggers continuous blank feeding.',
    imageSuggestions: [
      'Illustration showing the location of the top circular multi-function button and pressing it until the single beep sounds.',
      'Diagram showing the green adjustable media guides at the rear feed opening aligning flush against a 4x6 label liner.'
    ],
    content: `<p>If your Rollo printer skips blank labels, feeds continuously without stopping, or prints crooked text that drifts off the edge, its optical media sensor has lost its gap alignment. Running Rollo's one-beep Automatic Label Identification and adjusting the physical side guides immediately restores proper label boundary tracking and straight feeding.</p>

<h2>What Triggers Label Skipping, Skewing, and Misalignment</h2>
<p>Rollo thermal printers use a transmissive optical sensor positioned beneath the paper path. This sensor emits infrared light through the label stock to measure opacity differences between the dense label paper and the thinner, semi-transparent liner gap separating individual labels.</p>
<p>When you switch between different label brands, change from fanfold stacks to roll media, or introduce new label dimensions, the physical thickness and gap spacing change. Without running a calibration cycle, the printer cannot calculate where each label begins and ends. As a result, the printer treats the media as continuous receipt paper, printing across perforations or ejecting two to three blank labels after every print job.</p>
<p>Crooked or skewed feeding occurs when the rear green media guides are set too wide. Even a two-millimeter gap allows labels to enter the feed channel at an angle. As the cylindrical roller pulls the paper forward, the rotational skew compounds over the six-inch length of the label, causing barcodes to clip off the margins.</p>

<h2>Step-by-Step Automatic Label Identification (One-Beep Calibration)</h2>
<p>Rollo includes an automated hardware routine called Automatic Label Identification. During this process, the internal stepper motor shuttles labels back and forth while the optical sensor samples opacity values and stores the precise label length in internal memory.</p>
<p>Follow these steps to run the calibration routine:</p>
<ol>
  <li><strong>Clear the print queue:</strong> Unplug the USB cable from the back of the printer. If the printer receives pending print commands from Windows or macOS while trying to calibrate, the hardware routine will abort and cause continuous feeding.</li>
  <li><strong>Load your media:</strong> Insert your label strip into the rear entry slot until the leading edge rests against the internal feed roller. Ensure the peel-off label surface faces upward toward the ceiling.</li>
  <li><strong>Power on:</strong> Turn on the power switch on the back of the printer. The circular indicator light on the top lid should illuminate.</li>
  <li><strong>Trigger calibration:</strong> Press and hold the circular button on the top lid. Listen carefully for <strong>one distinct beep</strong>, then immediately release the button.</li>
  <li><strong>Let the cycle complete:</strong> The printer will feed one to two labels forward, pull them backward, and pause. Once the status indicator turns solid green and the label rests squarely at the tear bar, calibration is complete.</li>
  <li><strong>Reconnect:</strong> Plug the USB cable back into the printer. Press the top button once briefly; the printer should advance exactly one label and stop cleanly at the perforation.</li>
</ol>
<p>If your printer continues to flash red after running calibration, the sensor may be obscured by dust or paper lint; wipe the sensor lens with a dry cotton swab. If labels print too lightly once calibrated, see our troubleshooting guide on <a href="/rollo/print-quality-issues/rollo-printer-blank-faint-light-uneven-print-density-fix">fixing Rollo blank, faint, and uneven print density</a>.</p>

<h2>Adjusting Green Media Guides to Prevent Crooked (Skewed) Feeding</h2>
<p>Crooked printing is a mechanical alignment issue caused by loose paper guides or uneven tension at the media intake.</p>
<ol>
  <li>Locate the green plastic guide tabs at the rear feed opening of the Rollo printer.</li>
  <li>Gently slide both guides inward until they touch the outer edges of the label backing paper.</li>
  <li>Confirm that the guides are snug against the paper edges without crimping, bending, or bowing the liner upward. If the guides pinch the paper too tightly, the excessive drag will cause the stepper motor to lose steps, resulting in vertically compressed or squashed labels.</li>
  <li>Ensure your label stack or roll holder sits directly behind the printer on the same flat surface, aligned with the intake slot. If the roll feeds at an angle from the side, the paper will pull unevenly against the platen roller.</li>
</ol>
<p>If labels still track sideways despite properly adjusted guides, inspect the rubber roller for uneven adhesive buildup; follow our walkthrough on <a href="/rollo/paper-handling-issues/rollo-printer-label-jam-not-feeding-platen-roller-cleaning">how to fix Rollo label jams and clean the platen roller</a>.</p>

<h2>Setting Correct Label Dimensions in Windows and macOS Drivers</h2>
<p>A hardware-calibrated printer will still print incorrectly if your computer's operating system driver specifies the wrong canvas dimensions. If your labels print shrunken into the upper-left corner or span across two labels, configure your paper size settings:</p>

<h3>Windows Label Size Setup</h3>
<ol>
  <li>Navigate to <strong>Settings &gt; Bluetooth &amp; devices &gt; Printers &amp; scanners</strong> and select your <strong>Rollo Printer</strong>.</li>
  <li>Click <strong>Printing preferences</strong>.</li>
  <li>Under the <strong>Page Setup</strong> tab, verify that the paper size matches your media. For standard shipping labels, select <strong>4" x 6"</strong> (or <strong>100mm x 150mm</strong>).</li>
  <li>If printing Amazon FBA product barcodes or small inventory tags, click <strong>New</strong> to create a custom dimension matching your exact physical label width and height.</li>
  <li>Click <strong>Apply</strong> and close the window.</li>
</ol>

<h3>macOS Label Size Setup</h3>
<ol>
  <li>Open any document or PDF and press <strong>Command + P</strong> to launch the print dialog.</li>
  <li>Select your <strong>Rollo Printer</strong>.</li>
  <li>In the <strong>Paper Size</strong> drop-down menu, choose <strong>4x6"</strong> (100 x 150 mm).</li>
  <li>If the standard 4x6" preset is unavailable, choose <strong>Manage Custom Sizes</strong>, click the <strong>+</strong> button, set Width to 4.0 inches and Height to 6.0 inches, and set all four margins (Top, Bottom, Left, Right) to 0.0 inches.</li>
</ol>

<h2>Frequently Asked Questions</h2>

<details>
  <summary>Why does my Rollo printer feed 3 or 4 blank labels after every single print?</summary>
  <p>Feeding multiple blank labels after a job indicates that the operating system page size is configured for standard Letter paper (8.5x11 inches) instead of a 4x6 inch label. The printer processes the extra blank digital space of the document and advances physical paper to match the requested height. Changing the paper size to 4x6 inches in both your computer driver and your shipping software resolves the issue.</p>
</details>

<details>
  <summary>Why is the status light on my Rollo printer flashing red after calibration?</summary>
  <p>A flashing red light indicates that the optical gap sensor could not detect a valid gap or notch between labels during calibration. Check that your labels have distinct gaps or perforations between them, verify the paper is not loaded backward, and ensure no jammed paper remnants are covering the optical sensor in the feed path.</p>
</details>

<details>
  <summary>Does the Rollo Wireless (X1040) model require the one-beep calibration?</summary>
  <p>The Rollo Wireless model features automatic label detection built into its rear feed mechanism. When you slide labels into the back slot of an X1040, the printer automatically grips the paper, moves it back and forth to calibrate dimensions, and stops at the tear line without requiring you to hold the top circular button.</p>
</details>`
  },
  {
    slug: 'rollo-printer-label-jam-not-feeding-platen-roller-cleaning',
    title: 'Fix Rollo Label Jams, Feeding Errors & Clean Roller', // 51 chars
    metaDescription: 'Clear accordion label jams, stop labels wrapping around the platen roller, and safely clean sticky rubber rollers on your Rollo thermal printer.', // 144 chars
    h1: 'How to Fix Rollo Label Jams, Feeding Issues & Clean Platen Roller',
    sources: [
      {
        url: 'https://support.rollo.com/support/solutions/articles/29000040978-label-is-getting-stuck-prints-only-half-and-stops',
        title: 'Rollo Support: Label is getting stuck / prints only half and stops',
      },
      {
        url: 'https://support.rollo.com/support/solutions/articles/29000000887-rollo-is-skipping-labels-or-continuously-feeding',
        title: 'Rollo Support: Rollo is skipping labels or continuously feeding',
      },
      {
        url: 'https://support.rollo.com/support/solutions/articles/29000040979-red-light-is-flashing',
        title: 'Rollo Support: Red light is flashing',
      },
    ],
    removed: 'Removed ~700 words of redundant filler text ("printers require a comprehensive understanding", "proactive maintenance philosophy", "intricate dance between mechanical force"). Transferred print head cleaning and darkness configuration to Article #1. Kept focus strictly on roller cleaning, unjamming, adhesive removal, and preventing thermal sticking.',
    uncommonTip: 'If a label has curled completely around the platen roller and won\'t peel, apply 2 to 3 drops of 70% isopropyl alcohol directly along the exposed seam of the label backing. Wait 60 seconds; the alcohol will dissolve the tacky adhesive layer so you can peel the label away in one complete strip without tearing or scraping.',
    imageSuggestions: [
      'Top-down view of the open Rollo cavity showing the black cylindrical rubber platen roller and cleaning it with a lint-free alcohol cloth.',
      'Close-up showing the green cover release latches on both sides of the chassis being pushed forward.'
    ],
    content: `<p>When a Rollo printer jams or wraps labels tightly around its roller, adhesive residue from label edges has bonded with the rubber platen. Clearing jammed paper safely without blades, cleaning the platen roller with 70% isopropyl alcohol, and lowering thermal density prevents paper bunching and restores smooth label transport.</p>

<h2>Why Thermal Labels Wrap Around the Platen Roller</h2>
<p>Direct thermal shipping labels rely on strong, pressure-sensitive acrylic adhesives. As labels pass through the narrow channel between the heated print head and the rubber platen roller, extreme mechanical pressure and thermal energy cause microscopic beads of adhesive to ooze out along the die-cut edges of the label backing.</p>
<p>Over hundreds of label runs, this tacky residue accumulates across the cylindrical rubber platen roller. If print density (darkness) is set excessively high, the thermal print head can reach temperatures that soften the adhesive and melt label topcoats. During heavy barcode passes, the hot label sticks to the print head or roller, causing the leading edge to curl downward into the internal cavity and wrap repeatedly around the spinning platen cylinder.</p>
<p>Once a single label adheres to the rubber, subsequent labels accordion behind it, forming a tight, dense paper jam that halts the internal stepper motor.</p>

<h2>How to Safely Clear Wrapped and Accordion Label Jams</h2>
<p>Attempting to remove jammed labels with metal tools can permanently ruin your printer. Never use knives, scissors, box cutters, razor blades, or metal tweezers to scrape or cut labels off the rubber roller. Gouging the rubber creates flat spots and divots, causing permanent paper slipping, clicking noises, and distorted printouts that require a full platen assembly replacement.</p>
<p>Follow this safe extraction method instead:</p>
<ol>
  <li><strong>Power down immediately:</strong> Switch off the rocker power switch on the rear panel and disconnect the power cable.</li>
  <li><strong>Open the top cover:</strong> Push the two green release latches located on the left and right sides of the printer forward, then swing the top cover upward until it rests fully open.</li>
  <li><strong>Detach trailing media:</strong> Tear or cut the unprinted label stock behind the printer so no extra paper enters the feed channel.</li>
  <li><strong>Release the wrapped label:</strong> Locate the edge of the label wrapped around the black rubber roller. If the label is firmly stuck, dampen a cotton swab or cloth with 70% isopropyl alcohol and rub it along the exposed seam. Wait approximately 60 seconds for the alcohol to soften the adhesive, then gently peel the label away by hand in one continuous strip.</li>
  <li><strong>Check internal passages:</strong> Inspect the paper chute behind the roller for stray scraps of paper or adhesive balls, and remove them using your fingers.</li>
</ol>

<h2>Complete Platen Roller Cleaning Procedure</h2>
<p>The platen roller is the cylindrical black rubber roller situated in the lower base of the printer. It provides the traction required to pull labels off the roll and exerts counter-pressure against the print head during printing. Cleaning the roller removes accumulated glue, paper dust, and slick spots.</p>
<ol>
  <li>Ensure the printer remains powered off and unplugged.</li>
  <li>Take a clean lint-free cloth or an isopropyl alcohol wipe dampened with 70% or higher isopropyl alcohol. Do not use household cleaners, acetone, or abrasive scrub pads, as harsh chemicals break down and harden natural rubber.</li>
  <li>Firmly wipe the exposed upper curve of the rubber platen roller from side to side to lift off adhesive residue and black paper dust.</li>
  <li>Use your thumb to manually rotate the platen roller forward a quarter turn, exposing the next section of rubber.</li>
  <li>Wipe the newly exposed section thoroughly with the alcohol cloth.</li>
  <li>Repeat this process until you have scrubbed the entire 360-degree circumference of the cylinder. The rubber should feel clean and grippy, with a uniform matte black appearance.</li>
  <li>Allow the roller to air-dry completely for 2 to 3 minutes before closing the lid and powering the machine back on.</li>
</ol>
<p>While the lid is open, check the glass thermal heating strip directly above the roller for baked-on residue; see our guide on <a href="/rollo/print-quality-issues/rollo-printer-blank-faint-light-uneven-print-density-fix">how to clean the thermal print head and fix faint print density</a>.</p>

<h2>Preventing Future Jams: Density Settings & Roll Slack</h2>
<p>After clearing a jam and cleaning the platen roller, take these preventative measures to stop recurring feed failures:</p>

<h3>1. Lower Print Density (Darkness)</h3>
<p>When labels repeatedly stick to the head or roller during heavy black printing, reduce the darkness setting. In Windows, go to <strong>Printers &amp; scanners &gt; Rollo Printer &gt; Printing preferences &gt; Settings</strong> and reduce Darkness from high numbers down to 4 or 5. On the Rollo Wireless (X1040), open the Rollo App and decrease the Darkness setting in Printing Defaults.</p>

<h3>2. Maintain Media Slack</h3>
<p>If you use an external roll holder or fanfold stand, position it 2 to 3 inches directly behind the printer on a level surface. Avoid heavy friction on the roll; if the roll does not spin freely, the sudden jerk of pulling paper into the printer can cause the roller to slip, misaligning the label edges.</p>

<h3>3. Re-Calibrate Media Boundaries</h3>
<p>Any time paper has jammed or been forcibly pulled from the printer, the optical sensor loses its tracking count. Always run an automatic calibration cycle before resuming printing; follow our step-by-step instructions on <a href="/rollo/paper-handling-issues/rollo-printer-calibration-guide-skewed-label-size-fix">Rollo printer calibration and label size setup</a>.</p>

<h2>Frequently Asked Questions</h2>

<details>
  <summary>Why does my Rollo printer make a loud clicking or grinding noise while printing?</summary>
  <p>A loud clicking or grinding sound occurs when the rubber platen roller is slipping against stuck labels, or when a piece of torn label is wedged inside the internal gear assembly. Turn off the printer, open the top lid, and inspect both ends of the platen roller to ensure labels or adhesive strands are not wound around the drive gears.</p>
</details>

<details>
  <summary>Can I use Goo Gone or adhesive remover on the Rollo platen roller?</summary>
  <p>Never use petroleum-based adhesive removers like Goo Gone, WD-40, or acetone on the platen roller. These solvents dissolve and soften the rubber compound, leaving an oily film that ruins paper traction and degrades the roller permanently. Use only 70% or higher isopropyl alcohol to dissolve adhesive safely.</p>
</details>

<details>
  <summary>Why do my labels stop halfway through printing and stick to the machine?</summary>
  <p>Labels stopping halfway through a print job typically happen when printing solid black barcodes or dark graphics with density set too high. The intense heat causes the label face to stick to the hot print head elements. Lowering the print density and slightly reducing print speed resolves this issue.</p>
</details>`
  }
];

async function main() {
  console.log('Testing shingles and overlap across Group A articles...');

  const s1 = getShingles(groupAArticles[0].content);
  const s2 = getShingles(groupAArticles[1].content);
  const s3 = getShingles(groupAArticles[2].content);

  const o12 = calcOverlap(s1, s2);
  const o13 = calcOverlap(s1, s3);
  const o23 = calcOverlap(s2, s3);

  console.log('Overlap 1 & 2:', o12);
  console.log('Overlap 1 & 3:', o13);
  console.log('Overlap 2 & 3:', o23);

  for (const art of groupAArticles) {
    const words = art.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').length;
    const firstP = art.content.match(/<p>(.*?)<\/p>/)?.[1] || '';
    const firstPWords = firstP.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
    console.log(`\nSlug: ${art.slug}`);
    console.log(`Total word count: ${words}`);
    console.log(`First paragraph word count: ${firstPWords} (Target <60)`);
    console.log(`Title length: ${art.title.length} (Target <=60)`);
    console.log(`Meta length: ${art.metaDescription.length} (Target <=155)`);

    // Check for broken sentences or banned words
    if (/forming an\.\s*Insulating/i.test(art.content)) console.error('Broken sentence found!');
    if (/Furthermore|Additionally|Moreover/i.test(art.content)) console.error('Banned opener found!');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
