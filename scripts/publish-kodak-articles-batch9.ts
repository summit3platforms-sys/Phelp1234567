import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const kodakBrandId = 'c5730c9d-dbad-4368-ad1c-9a44ecf890bc';
const inkCategory = '9af9508c-4517-47bc-9084-8ab635b1283b'; // Ink & Toner Issues
const printingProblemsCategory = '0e7ca2ba-24ae-4bf9-9ca7-072b36154911'; // Printing Problems
const connectivityCategory = 'c3a92d93-fcbb-439c-a11e-80cde3d2a5ce'; // Connectivity Issues

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Kodak Printer Not Printing Black Ink? Nozzle & Vent Fixes",
    slug: 'kodak-printer-not-printing-black-ink',
    seoTitle: "Kodak Printer Not Printing Black Ink: Troubleshooting Guide",
    metaDescription: "Is your Kodak printer refusing to print black? A technician walks through dried nozzle clearing, vent unblocking, and printhead priming to restore black ink output.",
    excerpt: "When a Kodak printer stops printing black ink while color still works, the black ink nozzles are usually clogged with dried pigment or the cartridge air vent is sealed.",
    errorCode: 'No Black Output',
    tags: 'Kodak, Not Printing Black, Black Ink, Clogged Nozzle, Printhead, Vent',
    wordCount: 1120,
    difficultyLevel: 'Intermediate',
    timeToFix: '20 minutes',
    categoryId: inkCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredImage: null,
    featuredImageAlt: 'A printed test page from a Kodak printer showing missing black text while color blocks print correctly',
    featuredImageCaption: 'Diagnosing missing black ink output on a Kodak inkjet printer',
    featuredSnippet: "To fix a Kodak printer not printing black: 1) Run 2-3 printhead cleaning cycles from the Maintenance menu. 2) Remove the black cartridge and check that the orange tape and air vent seal have been fully removed. 3) Dampen a lint-free cloth with warm water and gently dab the printhead nozzle plate to dissolve dried pigment. 4) If using a third-party cartridge, try a genuine Kodak Series 10 or 30 cartridge.",
    content: `<p>One of the most common complaints from Kodak ESP and Hero printer owners is that the printer suddenly stops printing black ink. Color images and graphics may print correctly, but any text or black elements appear as blank white areas on the page. In the majority of cases, this is not an electrical failure or a driver issue — it is a physical blockage inside the black ink nozzle channel of the printhead. Let's walk through the full diagnostic and repair sequence.</p>

<h2>Why Black Ink Fails First</h2>
<p>Black pigment ink has a fundamentally different chemical composition than color dye inks. While cyan, magenta, and yellow inks are dye-based (fully dissolved in liquid), black ink on Kodak printers is <strong>pigment-based</strong> — meaning the colorant consists of microscopic solid particles suspended in a carrier fluid. When the printer sits idle for extended periods, the carrier fluid evaporates through the nozzle openings, leaving behind a dense residue of dried pigment particles that physically plug the nozzle orifices. Color dye inks, being true solutions, resist this drying effect much longer.</p>

<h2>Phase 1: Run Multiple Software Cleaning Cycles</h2>
<p>Before any manual intervention, use the printer's built-in cleaning function to pump fresh ink through the nozzles:</p>
<ol>
  <li>On the printer control panel, navigate to <strong>Maintenance</strong> or <strong>Settings &gt; Printhead Maintenance</strong>.</li>
  <li>Select <strong>Clean Printhead</strong> and press OK.</li>
  <li>The printer will draw ink through the nozzles and deposit it onto the waste ink pad.</li>
  <li>After the cycle completes, print a <strong>Nozzle Test Pattern</strong> (usually available under the same Maintenance menu).</li>
  <li>Examine the test pattern: if the black bars are missing or show gaps, run a second cleaning cycle.</li>
  <li><strong>Do not run more than 3 consecutive cycles.</strong> Each cycle consumes ink and floods the waste pad. If 3 cycles fail, proceed to manual cleaning.</li>
</ol>

<h2>Phase 2: Inspect the Cartridge Air Vent</h2>
<p>Every inkjet cartridge has a tiny air vent hole that allows atmospheric pressure to push ink down toward the printhead. If this vent is blocked, the ink cannot flow:</p>
<ol>
  <li>Remove the black ink cartridge from the printer.</li>
  <li>Look at the top surface of the cartridge body. Locate the small circular vent hole (approximately 1mm in diameter).</li>
  <li>Verify that <strong>all protective tape</strong> has been completely removed. New cartridges ship with orange or yellow pull-tabs — even a thin strip of residual adhesive over the vent can create a vacuum lock.</li>
  <li>If the vent appears clear, use a straight pin to gently probe the opening. Dried ink can form a skin over the vent interior. <strong>Do not push the pin deep into the cartridge</strong> — a light poke at the surface is sufficient to break the dried film.</li>
  <li>Reinstall the cartridge and run a test print.</li>
</ol>

<h2>Phase 3: Manual Printhead Priming (Warm Water Dab)</h2>
<p>If cleaning cycles and vent checks fail, the dried pigment plug inside the nozzle channel is too thick for the printer's suction pump to clear. You can dissolve it manually:</p>
<ol>
  <li>Remove both the black and color cartridges from the printer.</li>
  <li>Lift the printhead latch and carefully remove the printhead assembly from the carriage.</li>
  <li>Fold a paper towel into a small pad. Dampen it with <strong>warm distilled water</strong> (not tap water, which contains minerals that can deposit on the nozzle plate).</li>
  <li>Place the printhead <strong>nozzle-side down</strong> onto the damp paper towel.</li>
  <li>Let it sit for <strong>10 to 15 minutes</strong>. The warm water will slowly dissolve the dried pigment through capillary action.</li>
  <li>Lift the printhead and inspect the paper towel — you should see black ink stains where the pigment has dissolved and wicked through.</li>
  <li>Gently dab (do not rub) the nozzle plate with a clean, dry lint-free cloth.</li>
  <li>Reinstall the printhead and cartridges, and run a cleaning cycle followed by a test print.</li>
</ol>

<div class="warning-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>Never Use Rubbing Alcohol on Nozzle Plates:</strong> While isopropyl alcohol is safe for cleaning electrical contacts and encoder strips, it should <strong>not</strong> be applied directly to the nozzle plate surface. Alcohol can dissolve the hydrophobic coating that prevents ink from pooling on the metal face, permanently degrading print quality.
</div>

<h2>Phase 4: Verify Cartridge Authenticity</h2>
<p>Third-party and remanufactured cartridges are a frequent cause of black ink failure on Kodak printers:</p>

<table class="diagnostic-table">
  <thead>
    <tr>
      <th>Cartridge Type</th>
      <th>Common Black Ink Issues</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Genuine Kodak (Series 10/30)</strong></td>
      <td>Rare nozzle clogs after extended idle periods. Standard cleaning cycles resolve most cases.</td>
    </tr>
    <tr>
      <td><strong>Third-Party Compatible</strong></td>
      <td>Ink viscosity may differ from Kodak specs, causing rapid drying or air bubbles in the nozzle chamber. Chip firmware may cause "Not Recognized" errors.</td>
    </tr>
    <tr>
      <td><strong>Refilled/Remanufactured</strong></td>
      <td>Ink formulations may not match pigment density requirements, causing faded or missing black output even when the cartridge reports full ink levels.</td>
    </tr>
  </tbody>
</table>`,
    faqs: JSON.stringify([
      { question: 'Why does black ink fail but color still prints?', answer: 'Black pigment ink dries faster than color dye inks because pigment particles are suspended solids, not dissolved dyes. When the carrier fluid evaporates, the solid particles clog the nozzle orifices.', order: 1 },
      { question: 'How long can a Kodak printer sit idle before black ink clogs?', answer: 'In dry climates, black ink can begin drying inside the nozzles after as little as 2 weeks of inactivity. Print a test page at least once a week to keep the channels flushed.', order: 2 },
      { question: 'Can I soak the entire printhead in water?', answer: 'You can soak the nozzle plate end in warm distilled water for up to 30 minutes. Do not submerge the electrical contacts or the ink intake ports on the top of the printhead.', order: 3 }
    ])
  },
  {
    title: "Kodak Ink Cartridge Compatibility Guide: Series 10 vs 30 vs Verite 5",
    slug: 'kodak-ink-cartridge-compatibility-guide-series-10-vs-30',
    seoTitle: "Kodak Ink Cartridge Compatibility Chart: Series 10, 30, Verite 5",
    metaDescription: "Which Kodak ink cartridge fits your printer? A complete compatibility chart for Series 10, 10XL, 30, 30XL, and Verite 5 cartridges with printer model lookups.",
    excerpt: "Kodak used three distinct cartridge families across its printer lines. This reference guide maps every cartridge to its compatible printer models.",
    errorCode: null,
    tags: 'Kodak, Ink Cartridge, Compatibility, Series 10, Series 30, Verite 5, XL, Guide',
    wordCount: 1050,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: inkCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    featuredImage: null,
    featuredImageAlt: 'Three Kodak ink cartridges from different series laid side by side for comparison',
    featuredImageCaption: 'Comparing Kodak Series 10, Series 30, and Verite 5 ink cartridges',
    featuredSnippet: "Kodak printers use three cartridge families: Series 10/10XL for older EasyShare and ESP models (ESP 3, 5, 7, 9, 3250, 5210, 5250, 7250, 9250), Series 30/30XL for newer ESP C-Series and Hero models (ESP C110, C310, C315, Hero 3.1, 5.1), and Verite Series 5 for Verite 55/65 models. These are NOT cross-compatible.",
    content: `<p>One of the most confusing aspects of owning a Kodak printer is determining which ink cartridge is compatible with your specific model. Unlike brands that use a single cartridge line across generations, Kodak manufactured <strong>three completely separate cartridge families</strong> during its consumer printer era. Installing the wrong series will not physically fit in the carriage slot, and attempting to force it can damage the electrical contacts or the printhead alignment pins. This reference guide provides a definitive compatibility matrix.</p>

<h2>The Three Kodak Cartridge Families</h2>

<table class="diagnostic-table">
  <thead>
    <tr>
      <th>Cartridge Family</th>
      <th>Standard Yield</th>
      <th>High Yield (XL)</th>
      <th>Colors Available</th>
      <th>Approx. Page Yield (Standard / XL)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Series 10</strong></td>
      <td>Kodak 10B (Black), Kodak 10C (Color)</td>
      <td>Kodak 10XL (Black only)</td>
      <td>Black, Tri-Color (C/M/Y)</td>
      <td>~425 / ~770 pages (Black)</td>
    </tr>
    <tr>
      <td><strong>Series 30</strong></td>
      <td>Kodak 30B (Black), Kodak 30C (Color)</td>
      <td>Kodak 30XL (Black only)</td>
      <td>Black, Tri-Color (C/M/Y)</td>
      <td>~335 / ~550 pages (Black)</td>
    </tr>
    <tr>
      <td><strong>Verite Series 5</strong></td>
      <td>Kodak ALK (Black), Kodak ALC (Color)</td>
      <td>Kodak XLALK (Black), Kodak XLALC (Color)</td>
      <td>Black, Tri-Color (C/M/Y)</td>
      <td>~200 / ~400 pages (Black)</td>
    </tr>
  </tbody>
</table>

<h2>Series 10 / 10XL — Compatible Printer Models</h2>
<p>The Series 10 cartridge was used in the <strong>original EasyShare and early ESP lines</strong>. These printers were among Kodak's first consumer inkjets:</p>
<ul>
  <li>Kodak EasyShare 5100</li>
  <li>Kodak EasyShare 5300</li>
  <li>Kodak EasyShare 5500</li>
  <li>Kodak ESP 3</li>
  <li>Kodak ESP 5</li>
  <li>Kodak ESP 7</li>
  <li>Kodak ESP 9</li>
  <li>Kodak ESP 3250</li>
  <li>Kodak ESP 5210</li>
  <li>Kodak ESP 5250</li>
  <li>Kodak ESP 7250</li>
  <li>Kodak ESP 9250</li>
  <li>Kodak ESP Office 6150</li>
</ul>

<h2>Series 30 / 30XL — Compatible Printer Models</h2>
<p>The Series 30 was introduced for the <strong>ESP C-Series, Office 2100 Series, and Hero lines</strong>. These represent Kodak's second-generation consumer printers with updated printhead designs:</p>
<ul>
  <li>Kodak ESP C110</li>
  <li>Kodak ESP C115</li>
  <li>Kodak ESP C310</li>
  <li>Kodak ESP C315</li>
  <li>Kodak ESP 1.2</li>
  <li>Kodak ESP 3.2</li>
  <li>Kodak ESP Office 2150</li>
  <li>Kodak ESP Office 2170</li>
  <li>Kodak Hero 3.1</li>
  <li>Kodak Hero 5.1</li>
  <li>Kodak Hero 7.1</li>
  <li>Kodak Hero 9.1</li>
</ul>

<h2>Verite Series 5 — Compatible Printer Models</h2>
<p>The Verite line was manufactured by <strong>Funai Electric</strong> under the Kodak brand license after Kodak exited direct printer manufacturing. These cartridges use a completely different chip architecture:</p>
<ul>
  <li>Kodak Verite 50</li>
  <li>Kodak Verite 55</li>
  <li>Kodak Verite 55 Eco</li>
  <li>Kodak Verite 55W Eco</li>
  <li>Kodak Verite 65</li>
  <li>Kodak Verite 65 Eco</li>
  <li>Kodak Verite 65 Plus</li>
</ul>

<div class="warning-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>Cross-Compatibility Warning:</strong> Series 10, Series 30, and Verite 5 cartridges are <strong>not interchangeable</strong>. Each family uses different physical dimensions, chip firmware protocols, and ink delivery mechanisms. Forcing a wrong cartridge into the carriage slot can bend the electrical contact pins or crack the cartridge housing.
</div>

<h2>How to Identify Your Current Cartridge Series</h2>
<p>If you are unsure which cartridge your printer uses:</p>
<ol>
  <li>Open the printer's front access door to expose the cartridge carriage.</li>
  <li>Remove the currently installed cartridge.</li>
  <li>Look at the label printed on the cartridge body. It will clearly state <strong>"Kodak 10B"</strong>, <strong>"Kodak 30C"</strong>, or <strong>"Kodak ALK"</strong>, etc.</li>
  <li>If no cartridge is installed, check the sticker on the inside of the access door or the underside of the printer, where the recommended cartridge numbers are often printed by the manufacturer.</li>
</ol>

<h2>Standard vs XL: What's the Difference?</h2>
<p>Within each series, the XL (high-yield) cartridge is physically the same size as the standard cartridge and fits into the same slot. The only difference is the volume of ink inside the sponge reservoir. XL cartridges contain approximately 60-80% more ink, offering a significantly lower cost-per-page. You can freely interchange Standard and XL within the same series.</p>`,
    faqs: JSON.stringify([
      { question: 'Can I use a Series 30 cartridge in an ESP 7250?', answer: 'No. The ESP 7250 uses Series 10 cartridges. Series 30 cartridges have a different physical form factor and will not seat in the Series 10 carriage.', order: 1 },
      { question: 'Are Kodak Verite cartridges still available?', answer: 'Yes, but availability is declining. Check online retailers like Amazon and eBay for genuine or compatible Verite Series 5 cartridges while stock lasts.', order: 2 },
      { question: 'Can I use third-party cartridges safely?', answer: 'Third-party cartridges work in many cases but may trigger "Cartridge Not Recognized" errors if the chip firmware does not match Kodak specifications. Genuine cartridges are recommended for reliability.', order: 3 }
    ])
  },
  {
    title: "How to Override Low Ink Warnings on Kodak Printers",
    slug: 'kodak-printer-low-ink-warning-override',
    seoTitle: "Override Kodak Printer Low Ink Warning: Keep Printing Guide",
    metaDescription: "Is your Kodak printer blocking prints due to low ink? A technician explains how to bypass low ink warnings and keep printing until the cartridge is truly empty.",
    excerpt: "Kodak printers often block printing when ink levels drop below a threshold. Learn how to override the warning and continue printing until the cartridge is actually empty.",
    errorCode: 'Low Ink Block',
    tags: 'Kodak, Low Ink, Override, Warning, Continue Printing, Bypass',
    wordCount: 1030,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: inkCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredImage: null,
    featuredImageAlt: 'A Kodak printer control panel displaying a low ink warning message with an option to continue printing',
    featuredImageCaption: 'Bypassing the low ink alert on a Kodak ESP printer',
    featuredSnippet: "To override low ink warnings on a Kodak printer: 1) When the 'Low Ink' dialog appears on the LCD, press OK or Continue to dismiss it and keep printing. 2) On a computer, click 'Continue Printing' or 'Print in Black Only' in the software dialog. 3) Tape over the ink level sensor window on refilled cartridges. 4) Replace the cartridge only when print quality visibly degrades.",
    content: `<p>Kodak inkjet printers use an electronic ink level monitoring system built into each cartridge's microchip. When the estimated ink supply drops below a pre-set threshold (usually around 10-15% remaining), the printer displays a <strong>"Low Ink"</strong> warning on the LCD panel or sends a popup notification to your computer screen. On some models, this warning can escalate to a <strong>full print block</strong>, refusing to print until the cartridge is replaced — even though usable ink remains inside the reservoir. Let's look at how to bypass these warnings and keep printing.</p>

<h2>Understanding Kodak's Ink Level Detection</h2>
<p>Unlike printers that use optical sensors to physically measure ink levels, Kodak printers estimate remaining ink using a <strong>page-count algorithm</strong>. The cartridge's onboard chip tracks the number of pages printed and the estimated ink consumption per page. This means the "Low Ink" warning is a <strong>statistical estimate, not a direct measurement</strong>. In practice, cartridges often contain 15-30% more ink than the algorithm predicts, especially if you primarily print text documents (which use far less ink than photos).</p>

<h2>Method 1: Dismiss the LCD Warning</h2>
<p>On most Kodak ESP and Hero printers, the low ink warning is a <strong>dismissible alert</strong>, not a hard block:</p>
<ol>
  <li>When the "Low Ink" or "Ink Low" message appears on the printer's LCD control panel, press the <strong>OK</strong> or <strong>Continue</strong> button.</li>
  <li>The printer will acknowledge the warning and resume the current print job.</li>
  <li>The warning may reappear before each subsequent print job. Simply dismiss it each time.</li>
  <li>Continue printing until you notice visible quality degradation (faded text, missing color bands, or white streaks), which indicates the cartridge is genuinely running dry.</li>
</ol>

<h2>Method 2: Bypass the Computer Software Dialog</h2>
<p>If you print from a Windows or Mac computer using the Kodak print driver, a software dialog box may appear before each print job:</p>
<ol>
  <li>When the dialog appears, look for options labeled <strong>"Continue Printing"</strong>, <strong>"OK"</strong>, or <strong>"Print Anyway"</strong>.</li>
  <li>Some Kodak driver versions offer a checkbox: <strong>"Don't show this message again"</strong>. Check this box to permanently suppress the warning until the cartridge is replaced.</li>
  <li>If one color cartridge is low but the black cartridge is full, select <strong>"Print in Black Only"</strong> (also called Grayscale mode) to continue printing documents without the color cartridge.</li>
</ol>

<h2>Method 3: Reset the Cartridge Page Counter</h2>
<p>If you have refilled a cartridge with aftermarket ink, the onboard chip still retains the original page count and may report "Empty" even though the cartridge is physically full:</p>
<ol>
  <li>Remove the cartridge from the printer.</li>
  <li>Locate the <strong>gold electrical contacts</strong> on the face of the cartridge.</li>
  <li>Using a small piece of opaque tape (electrical tape works well), cover the <strong>smallest contact pad</strong> on the chip array. This is typically the ink level reporting pin.</li>
  <li>Reinstall the cartridge. The printer may display "Unknown Ink Level" or simply stop showing the ink gauge — but it will allow printing to continue.</li>
</ol>

<div class="warning-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>Print Quality Risk:</strong> Running a cartridge until it is completely empty can introduce air into the printhead ink channels. Once air enters the nozzle assembly, it may require multiple cleaning cycles (or manual priming) to re-establish ink flow. Replace the cartridge when you first notice faded output rather than waiting for total depletion.
</div>

<h2>Method 4: Use Grayscale Mode to Bypass Color Warnings</h2>
<p>If only the color cartridge is low but you need to print text documents:</p>
<ol>
  <li>Open the print dialog on your computer (File &gt; Print).</li>
  <li>Click <strong>Printer Properties</strong> or <strong>Preferences</strong>.</li>
  <li>Look for a setting labeled <strong>"Color"</strong> or <strong>"Output Color"</strong>.</li>
  <li>Change the setting from <strong>Color</strong> to <strong>Grayscale</strong> or <strong>Black &amp; White</strong>.</li>
  <li>Click OK and print. The printer will use only the black cartridge, completely bypassing the color ink level check.</li>
</ol>

<h2>When to Actually Replace the Cartridge</h2>
<p>Rather than relying on the software estimate, watch for these physical signs that the ink is genuinely depleted:</p>
<ul>
  <li><strong>Faded or light text:</strong> Characters appear washed out instead of solid black.</li>
  <li><strong>Horizontal white lines:</strong> Gaps appear in solid color fills where nozzles are starving for ink.</li>
  <li><strong>Missing colors:</strong> One color drops out entirely (e.g., photos look pink because cyan is depleted).</li>
  <li><strong>Streaking:</strong> Vertical lines appear as the printhead draws air instead of ink from the empty reservoir.</li>
</ul>`,
    faqs: JSON.stringify([
      { question: 'Will printing on low ink damage my printhead?', answer: 'Printing with very low ink can introduce air into the nozzle chambers, which may require cleaning cycles to clear. It will not physically damage the printhead, but print quality will degrade.', order: 1 },
      { question: 'Can I refill Kodak cartridges with third-party ink?', answer: 'Yes, but the onboard chip will still report the original ink level. Use the tape method on the level-reporting contact to bypass the empty cartridge warning.', order: 2 },
      { question: 'Why does my Kodak printer say ink is empty right after installing a new cartridge?', answer: 'This usually means the chip contacts are dirty or the cartridge is not fully seated. Remove the cartridge, wipe the gold contacts with a dry cloth, and reseat it firmly.', order: 3 }
    ])
  },
  {
    title: "Kodak Printer Scanner Not Working? WIA Driver & Firewall Fixes",
    slug: 'kodak-printer-scanner-not-working',
    seoTitle: "Fix Kodak Printer Scanner Not Working: WIA Driver & Firewall Guide",
    metaDescription: "Is your Kodak ESP or Hero scanner failing to scan? A systems tech explains WIA vs TWAIN drivers, firewall blocks, and scan-to-computer workarounds.",
    excerpt: "When the scan function on a Kodak All-in-One printer stops responding, it is usually caused by a missing WIA driver, a firewall block, or discontinued Kodak software.",
    errorCode: 'Scanner Not Detected',
    tags: 'Kodak, Scanner, Not Working, WIA Driver, TWAIN, Firewall, Scan to PC',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: connectivityCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredImage: null,
    featuredImageAlt: 'A Kodak all-in-one printer with the scanner lid open and a document placed on the glass platen',
    featuredImageCaption: 'Troubleshooting scan function failures on Kodak AIO printers',
    featuredSnippet: "To fix a Kodak scanner not working: 1) Verify the WIA (Windows Image Acquisition) service is running in Services.msc. 2) Check that your firewall allows the Kodak Home Center or Windows Fax and Scan to communicate on the local network. 3) Try scanning from your computer rather than the printer panel. 4) Use the built-in Windows Scan app as a fallback if Kodak software is no longer supported.",
    content: `<p>Kodak ESP and Hero All-in-One printers include a built-in flatbed scanner (and on some models, an Automatic Document Feeder). When the scanner stops working — either refusing to respond to the "Scan" button on the printer panel or failing to appear in scanning software on your computer — the issue is typically related to a broken communication pathway between the printer and the PC. Since Kodak ceased active software development for consumer printers, many scanning functions that relied on the legacy <strong>KODAK Home Center</strong> application have degraded on modern Windows versions. Let's diagnose and restore the scan capability.</p>

<h2>Understanding WIA vs TWAIN Scanning Protocols</h2>
<p>Windows communicates with scanners using two different driver protocols:</p>
<ul>
  <li><strong>WIA (Windows Image Acquisition):</strong> A modern Microsoft-native protocol. WIA drivers are typically installed automatically via Windows Update and are compatible with Windows Fax and Scan, Paint, and the Windows Scan app.</li>
  <li><strong>TWAIN:</strong> An older, vendor-specific protocol. Kodak's Home Center software used TWAIN to access scanner features. TWAIN drivers must be manually installed and are often incompatible with modern applications.</li>
</ul>
<p>If your Kodak scanner worked previously but stopped after a Windows update, the TWAIN driver was likely removed or replaced by Windows Update with a basic WIA driver that lacks full feature support.</p>

<h2>Phase 1: Verify the WIA Service Is Running</h2>
<p>The Windows Image Acquisition service must be active for any scanner to function:</p>
<ol>
  <li>Press <strong>Windows Key + R</strong>, type <code>services.msc</code>, and press Enter.</li>
  <li>Scroll down to find <strong>Windows Image Acquisition (WIA)</strong>.</li>
  <li>Check the Status column. It should say <strong>Running</strong>.</li>
  <li>If it is stopped, right-click it and select <strong>Start</strong>.</li>
  <li>Double-click the service, set the <strong>Startup type</strong> to <strong>Automatic</strong>, and click OK.</li>
  <li>Also verify that <strong>Shell Hardware Detection</strong> is running, as WIA depends on this service.</li>
</ol>

<h2>Phase 2: Check Firewall and Network Discovery</h2>
<p>If your Kodak printer is connected via Wi-Fi, the scan-to-computer function requires open network ports between the printer and your PC:</p>
<ol>
  <li>Open <strong>Windows Security</strong> (or your third-party firewall application).</li>
  <li>Navigate to <strong>Firewall &amp; network protection</strong> &gt; <strong>Allow an app through firewall</strong>.</li>
  <li>Look for <strong>KODAK AiO Home Center</strong> or <strong>KODAK Network Scanner</strong> in the list. Ensure both Private and Public checkboxes are checked.</li>
  <li>If neither is listed, click <strong>Allow another app</strong>, browse to <code>C:\\Program Files (x86)\\Kodak</code>, and add the Home Center executable.</li>
  <li>Also verify that <strong>Network Discovery</strong> is turned on: Open Control Panel &gt; Network and Sharing Center &gt; Advanced sharing settings &gt; Turn on network discovery.</li>
</ol>

<h2>Phase 3: Scan from the Computer Instead of the Printer</h2>
<p>The "Scan" button on the printer panel relies on a software listener running on your computer (the Kodak Home Center agent). If the software is not installed or has crashed, pressing the button does nothing:</p>
<ol>
  <li>Instead of pressing the physical Scan button, open scanning software on your computer.</li>
  <li>Open the <strong>Windows Fax and Scan</strong> application (search for it in the Start menu).</li>
  <li>Click <strong>New Scan</strong>. Select your Kodak scanner from the device dropdown list.</li>
  <li>Choose the scan source (Flatbed or Document Feeder), set your resolution and color mode, and click <strong>Scan</strong>.</li>
</ol>

<h2>Phase 4: Use the Modern Windows Scan App</h2>
<p>If Windows Fax and Scan does not detect your Kodak scanner, try the modern <strong>Windows Scan</strong> app from the Microsoft Store:</p>
<ol>
  <li>Open the Microsoft Store and search for <strong>"Windows Scan"</strong> (published by Microsoft Corporation).</li>
  <li>Install and launch the app.</li>
  <li>The app will automatically detect WIA-compatible scanners on your network or USB connection.</li>
  <li>Select your Kodak scanner, choose the file format (PDF, JPEG, PNG), and click Scan.</li>
</ol>

<div class="warning-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>USB vs Network Scanning:</strong> If your Kodak scanner works over USB but not over Wi-Fi, the issue is a network firewall or mDNS/Bonjour discovery block. USB scanning bypasses all network layers and communicates directly via the WIA driver.
</div>

<h2>Phase 5: Reinstall the Scanner Driver Manually</h2>
<p>If no scanning application detects your Kodak device:</p>
<ol>
  <li>Open <strong>Device Manager</strong> (right-click the Start button and select Device Manager).</li>
  <li>Expand the <strong>Imaging Devices</strong> category.</li>
  <li>If your Kodak scanner appears with a yellow warning triangle, right-click it and select <strong>Update driver</strong> &gt; <strong>Search automatically for drivers</strong>.</li>
  <li>If the scanner does not appear at all, click <strong>Action</strong> &gt; <strong>Scan for hardware changes</strong> to force Windows to re-detect connected devices.</li>
</ol>`,
    faqs: JSON.stringify([
      { question: 'Why does the Scan button on my Kodak printer do nothing?', answer: 'The physical Scan button relies on a software listener (Kodak Home Center) running on your computer. If the software is not installed or has crashed, the button press has nothing to communicate with.', order: 1 },
      { question: 'Can I scan from my Kodak printer to a Mac?', answer: 'Yes, if the printer is connected via USB. Open the Image Capture app (in Applications > Utilities) to access the scanner directly without Kodak software.', order: 2 },
      { question: 'Why does my scan have vertical lines or streaks?', answer: 'Clean the scanner glass and the narrow contact image sensor (CIS) glass strip with a soft, lint-free cloth. Dust or fingerprints on these surfaces cause consistent vertical artifacts.', order: 3 }
    ])
  },
  {
    title: "Kodak Scan to Email Stopped Working: SMTP & App Password Fix",
    slug: 'kodak-scan-to-email-not-working',
    seoTitle: "Fix Kodak Scan to Email Not Working: SMTP Authentication Guide",
    metaDescription: "Did your Kodak printer's scan-to-email feature stop working? A systems tech explains why Gmail and Outlook killed basic authentication and how to fix it.",
    excerpt: "Kodak printers that previously scanned directly to email now fail because major email providers disabled legacy 'Less Secure Apps' authentication in 2022.",
    errorCode: 'SMTP Auth Failure',
    tags: 'Kodak, Scan to Email, SMTP, Gmail, Outlook, App Password, Authentication',
    wordCount: 1040,
    difficultyLevel: 'Advanced',
    timeToFix: '15 minutes',
    categoryId: connectivityCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredImage: null,
    featuredImageAlt: 'A Kodak printer control panel showing a scan-to-email authentication error message',
    featuredImageCaption: 'Troubleshooting SMTP authentication failures on Kodak scan-to-email',
    featuredSnippet: "To fix Kodak scan-to-email failures: 1) Gmail and Outlook removed 'Less Secure Apps' support. Generate an App Password from your Google Account security settings. 2) Enter the 16-character App Password into the printer's SMTP password field instead of your regular password. 3) Verify SMTP server settings: smtp.gmail.com, Port 587, TLS enabled.",
    content: `<p>If your Kodak All-in-One printer previously scanned documents directly to your email inbox but has suddenly stopped working, you are not alone. This feature broke for millions of printer owners worldwide when Google, Microsoft, and Yahoo <strong>permanently disabled "Less Secure Apps" (Basic Authentication)</strong> for their email services. Kodak printers that relied on sending scans through a plain username/password SMTP login can no longer authenticate with these modernized servers. The good news is that you can restore the functionality using <strong>App Passwords</strong> — special 16-character tokens that bypass the need for modern OAuth2 authentication.</p>

<h2>Why Scan to Email Stopped Working</h2>
<p>When you configured "Scan to Email" on your Kodak printer, you entered your Gmail or Outlook email address and password into the printer's SMTP (Simple Mail Transfer Protocol) settings. The printer used this login to send the scanned document as an email attachment. This worked because email providers allowed <strong>Basic Authentication</strong> — a simple username + password handshake.</p>
<p>In 2022, Google removed support for Basic Authentication entirely, requiring all third-party apps to use <strong>OAuth2</strong> — a modern token-based system. Since Kodak printers cannot perform OAuth2 handshakes (they lack the firmware and display interface), the SMTP login permanently fails with an authentication error.</p>

<h2>Solution A: Generate a Google App Password (Gmail Users)</h2>
<p>Google provides a workaround called <strong>App Passwords</strong> — unique 16-character codes that allow legacy devices to authenticate without OAuth2:</p>
<ol>
  <li>On your computer, navigate to <a href="https://myaccount.google.com/security">https://myaccount.google.com/security</a>.</li>
  <li><strong>Important:</strong> You must have <strong>2-Step Verification</strong> enabled on your Google account. If it is not enabled, turn it on first under the "Signing in to Google" section.</li>
  <li>Once 2-Step Verification is active, search for <strong>"App passwords"</strong> in the Security settings page.</li>
  <li>Under "Select app", choose <strong>Other (Custom name)</strong> and type <strong>"Kodak Printer"</strong>.</li>
  <li>Click <strong>Generate</strong>. Google will display a 16-character password (e.g., <code>abcd efgh ijkl mnop</code>).</li>
  <li>Copy this password immediately — it will only be shown once.</li>
</ol>

<h2>Solution B: Generate a Microsoft App Password (Outlook/Hotmail Users)</h2>
<ol>
  <li>Navigate to <a href="https://account.microsoft.com/security">https://account.microsoft.com/security</a>.</li>
  <li>Enable <strong>Two-Step Verification</strong> if not already active.</li>
  <li>Go to <strong>Security &gt; Advanced security options &gt; App passwords</strong>.</li>
  <li>Click <strong>Create a new app password</strong>.</li>
  <li>Microsoft will generate and display a one-time password. Copy it.</li>
</ol>

<h2>Entering the App Password into Your Kodak Printer</h2>
<p>Now configure the printer's SMTP settings with the new App Password:</p>
<ol>
  <li>On the Kodak printer control panel, navigate to <strong>Network Settings &gt; Email Settings</strong> (or <strong>Scan Settings &gt; Scan to Email</strong>).</li>
  <li>Enter the following SMTP parameters:</li>
</ol>

<table class="diagnostic-table">
  <thead>
    <tr>
      <th>Setting</th>
      <th>Gmail Value</th>
      <th>Outlook Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>SMTP Server</strong></td>
      <td>smtp.gmail.com</td>
      <td>smtp-mail.outlook.com</td>
    </tr>
    <tr>
      <td><strong>Port</strong></td>
      <td>587</td>
      <td>587</td>
    </tr>
    <tr>
      <td><strong>Security / Encryption</strong></td>
      <td>TLS (or STARTTLS)</td>
      <td>TLS (or STARTTLS)</td>
    </tr>
    <tr>
      <td><strong>Username</strong></td>
      <td>your.email@gmail.com</td>
      <td>your.email@outlook.com</td>
    </tr>
    <tr>
      <td><strong>Password</strong></td>
      <td><strong>The 16-character App Password</strong> (not your regular Gmail password)</td>
      <td><strong>The App Password</strong> (not your regular Outlook password)</td>
    </tr>
  </tbody>
</table>

<ol start="3">
  <li>Save the settings and send a test scan to your own email address to verify.</li>
</ol>

<div class="warning-box warning" style="background:#fffbeb; border-left:4px solid #d97706; padding:1rem; margin:1.5rem 0;">
  <strong>Workaround if Your Printer Lacks SMTP Settings:</strong> If your Kodak model does not have an onboard SMTP configuration menu, use the <strong>"Scan to Computer"</strong> function instead. Scan the document to your PC, then attach it to an email manually. You can also use the <strong>"Scan to USB"</strong> feature if your printer has a USB port.
</div>`,
    faqs: JSON.stringify([
      { question: 'Why did my Kodak scan-to-email suddenly stop working in 2022?', answer: 'Google, Microsoft, and Yahoo permanently disabled Basic Authentication (simple username/password logins) for SMTP in 2022. Kodak printers cannot perform the newer OAuth2 authentication required.', order: 1 },
      { question: 'Is an App Password safe to use?', answer: 'Yes. App Passwords are unique, revocable tokens that only grant email-sending access. They do not expose your full Google or Microsoft account.', order: 2 },
      { question: 'Can I use Yahoo Mail for scan-to-email?', answer: 'Yes. Generate a Yahoo App Password at login.yahoo.com under Account Security. Use smtp.mail.yahoo.com, Port 587, TLS enabled.', order: 3 }
    ])
  }
];

async function main() {
  for (const article of articles) {
    try {
      await prisma.article.deleteMany({ where: { slug: article.slug } });
      console.log('Model cleanup complete for: ' + article.slug);
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
      console.log('✅ Published: "' + created.title + '"');
    } catch (e: any) {
      console.log('⚠️ Error for "' + article.title + '": ' + e.message);
    }
  }

  const total = await prisma.article.count({ where: { brandId: kodakBrandId } });
  console.log('\nTotal Kodak articles now: ' + total);
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
