import { prisma } from '../src/lib/prisma';

const HP_BRAND_ID = '47b0fd4a-2254-48f1-92c8-eb9e7a8657c6';
const CAT_PAPER = '9a42c554-2b4f-47f8-887e-5996fb83cbad'; // Paper Handling Issues
const CAT_QUALITY = 'e3d26347-33bf-41a7-9cbf-c3d821850f98'; // Print Quality Issues
const CAT_MAINT = 'f8e1387d-7604-4fa7-9f87-7a58c960818f'; // Hardware & Maintenance

const AUTHOR_MARCUS = 'fba87e7e-2ed7-465e-bab3-875aaaecbf81'; // Marcus Vance
const AUTHOR_ELENA = '88de9646-6fd4-4e5d-817c-a8a1c0230866'; // Elena Rodriguez
const AUTHOR_ALEX = '88e8d061-e1be-406d-8fa1-a53f108cc624'; // Alex Carter

const articles = [
  // 1. Roll Loading Fix
  {
    title: "HP DesignJet Paper Roll Won't Load? Spindle, Skew & Sensor Fix",
    slug: "hp-designjet-paper-roll-wont-load-fix",
    metaDescription: "Troubleshoot HP DesignJet paper roll loading failures, constant skew errors, and media sensor rejections on T-series and Z-series plotters.",
    brandId: HP_BRAND_ID,
    categoryId: CAT_PAPER,
    authorId: AUTHOR_MARCUS,
    featuredImage: "/images/printers/hp.webp",
    content: `<h2>Why Your HP DesignJet Rejects Paper Rolls</h2>
<p>HP DesignJet plotters use an automated roll-feed sequence. The printer checks roll alignment, leading edge straightness, and media width using optical line sensors.</p>
<p>When the roll is loaded with uneven tension or a jagged cut edge, the printer rejects the paper immediately. In our workshop, over 80% of loading rejections trace back to spindle hub misalignment or torn leading edges.</p>

<h2>Step 1: Check the Spindle Hub and Blue Stop Collar</h2>
<p>The roll must be correctly seated against the fixed hub stop before loading:</p>
<ol>
  <li><strong>Remove the spindle from the plotter:</strong> Lift both ends of the spindle out of the printer carriage brackets simultaneously.</li>
  <li><strong>Inspect the blue removable stop:</strong> Slide the blue collar firmly against the paper core. Ensure there is zero gap between the collar and the roll.</li>
  <li><strong>Check roll orientation:</strong> The paper must feed over the top of the roll toward the printer, not from underneath.</li>
  <li><strong>Verify core diameter adapters:</strong> If using a 3-inch core roll on a 2-inch spindle, ensure both blue 3-inch core adapters are securely latched.</li>
  <li><strong>Seat the spindle into the brackets:</strong> Insert the blue hub into the right-hand bracket first, then seat the black end into the left bracket.</li>
</ol>

<h2>Step 2: Trim a Perfectly Square Leading Edge</h2>
<p>DesignJet line sensors scan the leading paper edge as it enters the platen. A crooked or frayed edge triggers an immediate skew rejection:</p>
<ol>
  <li><strong>Do not tear paper by hand:</strong> Never feed a hand-torn edge into the feed slot.</li>
  <li><strong>Use the manual cutter guide:</strong> Pull 6 inches of paper past the cutting groove on the platen.</li>
  <li><strong>Cut with a fresh blade:</strong> Use a straight edge and utility blade or the printer's built-in form-feed cut function to create a 90-degree square edge.</li>
  <li><strong>Remove dog-eared corners:</strong> Ensure both left and right corners are completely flat with no wrinkles or folds.</li>
</ol>

<h2>Step 3: Feed Paper into the Roll Slot</h2>
<p>Follow the front panel prompt carefully during insertion:</p>
<ol>
  <li><strong>Select Paper on the touchscreen:</strong> Tap the Paper icon, select <strong>Roll</strong>, and choose <strong>Load</strong>.</li>
  <li><strong>Select your exact paper type:</strong> Choose Bond, Coated, or Heavyweight. Matching the media profile determines feed motor tension.</li>
  <li><strong>Slide paper into the feed slot:</strong> Push the leading edge straight into the slot until you feel resistance and hear a beep.</li>
  <li><strong>Allow the motor to grab the sheet:</strong> Keep holding the sides of the roll lightly until the feed rollers take over the paper advance.</li>
</ol>

<h2>Step 4: Clean the Carriage Optical Line Sensor</h2>
<p>If the printer repeatedly displays "Paper not detected" or "Skew detected" with straight paper, the carriage optical sensor is coated in paper dust:</p>
<ol>
  <li><strong>Turn off the plotter:</strong> Power down the unit and disconnect the power cable.</li>
  <li><strong>Open the top window:</strong> Slide the printhead carriage to the center of the platen manually.</li>
  <li><strong>Locate the line sensor:</strong> The optical sensor is located on the underside of the carriage assembly, next to the printhead latch.</li>
  <li><strong>Clean the sensor lens:</strong> Gently wipe the small optical glass window using a dry, lint-free microfiber swab. Never use alcohol or liquid cleaners on this optical sensor.</li>
  <li><strong>Close the window and reboot:</strong> Reconnect power and restart the roll loading procedure.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does my DesignJet say "Paper skew detected" even when loaded straight?</summary>
  <p>This happens when the paper roll's leading edge is not cut at a precise 90-degree angle. Recut the leading edge using a straight blade and verify the blue spindle collar is pressed tight against the core.</p>
</details>
<details>
  <summary>Can I load third-party bond paper rolls on HP DesignJets?</summary>
  <p>Yes. Ensure the paper is wound on a standard 2-inch core and select "Generic Bond Paper" or "HP Universal Bond" on the front panel.</p>
</details>
<details>
  <summary>What should I do if the roll motor makes a grinding noise during feed?</summary>
  <p>A grinding noise indicates the spindle is seated backward or the paper roll is binding against the spindle housing. Remove the spindle and ensure the blue end matches the blue carriage gear.</p>
</details>`
  },

  // 2. Banding on Long Prints
  {
    title: "HP DesignJet Banding on Long Prints? Paper Advance & Line Sensor Calibration",
    slug: "hp-designjet-banding-on-long-prints-fix",
    metaDescription: "Fix horizontal and vertical banding across long CAD drawings and large format posters on HP DesignJet plotters with calibration and nozzle checks.",
    brandId: HP_BRAND_ID,
    categoryId: CAT_QUALITY,
    authorId: AUTHOR_ELENA,
    featuredImage: "/images/printers/hp.webp",
    content: `<h2>Understanding Banding on Large Format Plots</h2>
<p>Banding appears in two distinct patterns: horizontal bands across the width of the page, or vertical streaks running down the length of the roll.</p>
<p>Horizontal white lines are caused by misaligned paper advance steps or clogged nozzles. Dark horizontal overlaps indicate the paper feed motor is advancing too slowly between printhead passes.</p>

<h2>Step 1: Distinguish Between Scan and Feed Banding</h2>
<p>Identifying the direction of the lines reveals the exact mechanical cause:</p>
<ol>
  <li><strong>Horizontal banding (across page width):</strong> Indicates nozzle dropouts in the printhead or incorrect paper advance step calibration.</li>
  <li><strong>Vertical banding (down roll length):</strong> Caused by uneven roll drag, platen vacuum suction errors, or damaged carriage drive belt teeth.</li>
  <li><strong>Periodic gaps matching roll rotation:</strong> Points to an eccentric spindle or bent core inside the paper roll.</li>
</ol>

<h2>Step 2: Run the Diagnostic Print and Clean Printheads</h2>
<p>Check for blocked nozzles across all color channels:</p>
<ol>
  <li><strong>Load standard white bond paper:</strong> Ensure at least 24-inch wide roll media is loaded.</li>
  <li><strong>Open the Setup Menu:</strong> Tap <strong>Setup</strong> &gt; <strong>Image Quality Maintenance</strong> on the front panel.</li>
  <li><strong>Select Print Diagnostic Image:</strong> The plotter prints test blocks for Cyan, Magenta, Yellow, and Matte Black.</li>
  <li><strong>Examine the grid patterns:</strong> Look for missing horizontal lines or breaks in the color swatches.</li>
  <li><strong>Execute Printhead Cleaning:</strong> If lines are missing, select <strong>Clean Printheads</strong> &gt; <strong>Level 1</strong>. Run Level 2 only if nozzle gaps persist.</li>
</ol>

<h2>Step 3: Run Paper Advance Calibration (OMAS / Manual)</h2>
<p>The paper advance motor must step media forward by microscopic increments between each carriage sweep:</p>
<ol>
  <li><strong>Access Paper Advance Calibration:</strong> From the front panel, navigate to <strong>Settings</strong> &gt; <strong>Image Quality Maintenance</strong> &gt; <strong>Paper Advance Calibration</strong>.</li>
  <li><strong>Select Calibrate Paper Advance:</strong> The printer prints a series of numbered overlapping line patterns.</li>
  <li><strong>Allow automatic optical measurement:</strong> On plotters equipped with an Optical Media Advance Sensor (OMAS), the printer measures the pattern automatically.</li>
  <li><strong>Manual selection (if prompted):</strong> If prompted on older models (T120/T520), identify the numbered block with the cleanest continuous tone and enter that value on the touchscreen.</li>
  <li><strong>Save and apply:</strong> Confirm the calibration. This permanently adjusts step timing for the currently loaded paper type.</li>
</ol>

<h2>Step 4: Adjust Platen Vacuum and Drying Time</h2>
<p>Heavy ink saturation on coated or glossy media can cause paper cockle (rippling) that rubs against the printhead:</p>
<ol>
  <li><strong>Select correct paper profile:</strong> Never print high-density graphics with the "Plain Paper" profile. Choose "Heavyweight Coated" or "Photo Glossy".</li>
  <li><strong>Increase drying time:</strong> In the driver print dialog, set Drying Time to <strong>Automatic</strong> or <strong>Optimal</strong> to prevent the cutter from dragging wet ink.</li>
  <li><strong>Check room humidity:</strong> Excessive humidity softens bond paper, causing uneven expansion and feed banding during multi-meter banner runs.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does banding only appear halfway through a long 30-foot print?</summary>
  <p>As the roll unwinds, roll weight and spindle friction decrease. Run the Paper Advance Calibration with the roll at half capacity to set a balanced tension profile.</p>
</details>
<details>
  <summary>Will increasing print quality in the driver remove banding?</summary>
  <p>Yes. Switching from "Fast/Draft" to "Best" increases the number of printhead passes from 1-pass to 4-pass, masking minor nozzle dropouts through shingling.</p>
</details>
<details>
  <summary>How often should I calibrate paper advance on my DesignJet?</summary>
  <p>Calibrate whenever switching to a new paper brand, different paper weight (e.g. from 20lb bond to 36lb coated), or after clearing a severe paper jam.</p>
</details>`
  },

  // 3. Printhead Alignment Failed
  {
    title: "HP DesignJet Printhead Alignment Failed? Sensor, Ink & Pattern Solution",
    slug: "hp-designjet-printhead-alignment-failed-fix",
    metaDescription: "Resolve HP DesignJet printhead alignment failed errors, optical line sensor read faults, and calibration pattern errors on T and Z series plotters.",
    brandId: HP_BRAND_ID,
    categoryId: CAT_QUALITY,
    authorId: AUTHOR_ELENA,
    featuredImage: "/images/printers/hp.webp",
    content: `<h2>Why DesignJet Printhead Alignment Fails</h2>
<p>Unlike desktop printers that scan an alignment page on glass, an HP DesignJet uses an optical sensor mounted under the printhead carriage to read printed test patches in real time.</p>
<p>If ink nozzles are missing, if the wrong paper type is loaded, or if the carriage optical sensor lens is dirty, the printer cannot calculate alignment offsets and aborts with an error.</p>

<h2>Step 1: Verify Correct Paper Type for Alignment</h2>
<p>Optical sensors require specific media reflectivity to register calibration marks:</p>
<ol>
  <li><strong>Do not use transparent or colored paper:</strong> Never attempt alignment on vellum, tracing paper, canvas, or colored craft roll.</li>
  <li><strong>Do not use high-gloss photographic paper:</strong> Specular glare from high-gloss paper blinds the optical line sensor during scanning.</li>
  <li><strong>Load white opaque bond paper:</strong> Use standard 20lb to 24lb bright white bond paper with a minimum width of 24 inches.</li>
  <li><strong>Check roll width:</strong> The alignment pattern requires at least 24 inches of width to print the complete diagnostic color array.</li>
</ol>

<h2>Step 2: Inspect Ink Cartridge Levels and Drop Detector</h2>
<p>The printer will fail alignment if any individual color channel cannot lay down continuous lines:</p>
<ol>
  <li><strong>Check all ink levels:</strong> Tap the Ink icon on the touchscreen. Ensure all cartridges have at least 20% ink remaining.</li>
  <li><strong>Run a Nozzle Health Check:</strong> Navigate to <strong>Setup</strong> &gt; <strong>Print Quality Maintenance</strong> &gt; <strong>Print Diagnostic Image</strong>.</li>
  <li><strong>Replace severely depleted printheads:</strong> If an entire color bar is completely blank, clean the printhead once. If nozzles do not return, replace that printhead module before attempting alignment.</li>
</ol>

<h2>Step 3: Clean the Carriage Line Sensor Lens</h2>
<p>Aerosol ink mist coats the underside optical sensor over months of high-volume plotting:</p>
<ol>
  <li><strong>Turn off the printer:</strong> Power down using the front button, then flip the rear rocker switch.</li>
  <li><strong>Open the main window:</strong> Slide the carriage assembly gently toward the center of the platen track.</li>
  <li><strong>Locate the optical line sensor:</strong> Look at the lower-left underside of the printhead carriage. You will see a small rectangular lens.</li>
  <li><strong>Wipe the lens clean:</strong> Use a dry, lint-free cotton swab. Wipe gently to remove ink haze and paper dust. Do not apply liquid solvent.</li>
  <li><strong>Slide carriage back:</strong> Return the carriage to the right-hand service station cap position.</li>
</ol>

<h2>Step 4: Trigger Printhead Alignment from the Front Panel</h2>
<p>With clean optics and bond paper loaded, restart the calibration cycle:</p>
<ol>
  <li><strong>Power on the plotter:</strong> Let the printer complete its initial boot and carriage home check.</li>
  <li><strong>Navigate to Alignment:</strong> Tap <strong>Settings</strong> &gt; <strong>Image Quality Maintenance</strong> &gt; <strong>Align Printhead</strong>.</li>
  <li><strong>Select Auto Alignment:</strong> Choose <strong>Align Printhead (Auto)</strong>. The printer will print a two-phase color patch array.</li>
  <li><strong>Allow the carriage sensor to scan:</strong> The carriage will sweep back and forth over the wet ink patches with an illuminated blue/green optical LED.</li>
  <li><strong>Confirm completion:</strong> The screen will display "Printhead alignment successful." The plotter automatically cuts and drops the test sheet.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I bypass printhead alignment and continue printing?</summary>
  <p>Yes. If you need urgent CAD line drawings, cancel the prompt. Vector line drawings print legibly without alignment, but full-color rendering will show color registration shifts.</p>
</details>
<details>
  <summary>What does error code "Alignment aborted: Nozzle check failed" mean?</summary>
  <p>This means one of the printhead nozzles is completely blocked and cannot print the reference line required by the optical sensor. Perform a Level 2 printhead clean and retest.</p>
</details>
<details>
  <summary>Why does the printer fail alignment right after installing a brand new printhead?</summary>
  <p>New printheads require an ink priming charge. If ink tubes contain air pockets, ink cannot reach the thermal chamber. Run the "Prime Printhead" utility from the Service Menu.</p>
</details>`
  },

  // 4. T-Series vs Z-Series
  {
    title: "HP DesignJet T-Series vs Z-Series: Full Comparison & Model Selection Guide",
    slug: "hp-designjet-t-series-vs-z-series-difference",
    metaDescription: "Compare HP DesignJet T-Series (Technical/CAD) versus Z-Series (Graphics/Photo) plotters: ink types, print speeds, spectrophotometers, and use cases.",
    brandId: HP_BRAND_ID,
    categoryId: CAT_MAINT,
    authorId: AUTHOR_ALEX,
    featuredImage: "/images/printers/hp.webp",
    content: `<h2>HP DesignJet T-Series vs Z-Series: Architectural Purpose</h2>
<p>HP splits its large-format DesignJet lineup into two distinct families: the **T-Series** (Technical) and the **Z-Series** (Graphics and Production).</p>
<p>Choosing the wrong series can result in faded outdoor banners or unnecessarily high ink costs on simple CAD line blueprints. Understanding ink chemistry and carriage hardware is essential before purchasing.</p>

<h2>Core Architectural Differences</h2>
<p>The differences between T-Series and Z-Series plotters center on ink chemistry, color gamut, and optical calibration hardware:</p>
<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>DesignJet T-Series (e.g. T650, T730, T1600)</th>
      <th>DesignJet Z-Series (e.g. Z6, Z9+, Z6810)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Target Audience</strong></td>
      <td>Architects, Engineers, Construction (AEC), GIS</td>
      <td>Photographers, Fine Art, Signage, Print Shops</td>
    </tr>
    <tr>
      <td><strong>Ink Configuration</strong></td>
      <td>4 Colors: Matte Black (Pigment) + CMY (Dye)</td>
      <td>6 to 9 Colors: All Pigment Inks + Gloss Enhancer</td>
    </tr>
    <tr>
      <td><strong>Fade Resistance</strong></td>
      <td>Indoor plan sets (Dye color inks fade in UV light)</td>
      <td>Archival 200+ years (Wilhelm Imaging Research certified)</td>
    </tr>
    <tr>
      <td><strong>Color Calibration</strong></td>
      <td>Automatic Line Sensor (optical density only)</td>
      <td>Built-in X-Rite Spectrophotometer (ICC profiling)</td>
    </tr>
    <tr>
      <td><strong>Line Speed (D-size/A1)</strong></td>
      <td>Ultra-fast: 21 to 26 seconds per page</td>
      <td>Moderate: 55 to 90 seconds (high pass density)</td>
    </tr>
    <tr>
      <td><strong>Integrated Trimmer</strong></td>
      <td>Single horizontal cross-cutter</td>
      <td>Vertical Trimmer on select Z9+ models (dual-axis)</td>
    </tr>
  </tbody>
</table>

<h2>When to Choose the T-Series</h2>
<p>The T-Series is built for high-throughput line work and everyday technical documentation:</p>
<ol>
  <li><strong>Architectural CAD blueprints:</strong> Crisp 0.02 mm minimum line width rendering with sharp black text.</li>
  <li><strong>GIS and topographical maps:</strong> Clear line delineation with fast turnaround for field teams.</li>
  <li><strong>Low running cost on bond paper:</strong> Dye color inks absorb instantly into inexpensive 20lb uncoated bond paper without cockling.</li>
  <li><strong>Compact studio footprints:</strong> Models like the T230 and T650 fit on desks or compact mobile stands in small offices.</li>
</ol>

<h2>When to Choose the Z-Series</h2>
<p>The Z-Series is engineered for color-critical display graphics and long-term archival permanence:</p>
<ol>
  <li><strong>Gallery fine art and photography:</strong> Expanded color gamut with Chromatic Red and Photo Black delivers deep Dmax values.</li>
  <li><strong>Trade show banners and retail displays:</strong> Pigment inks resist moisture and UV sunlight without immediate lamination.</li>
  <li><strong>Automated ICC color profiling:</strong> The integrated spectrophotometer creates custom profiles for third-party canvas, vinyl, and rag paper in minutes.</li>
  <li><strong>Dual-axis trimming:</strong> High-end Z9+ models cut poster borders vertically and horizontally in one automated pass.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I print photos on an HP DesignJet T-series plotter?</summary>
  <p>Yes, but with limitations. Photos on glossy paper look vibrant initially, but the dye-based color inks will fade within months under direct sunlight.</p>
</details>
<details>
  <summary>Can I use pigment inks in a T-series plotter?</summary>
  <p>No. T-series printheads are thermal nozzles tuned for dye ink viscosity. Loading third-party pigment ink into color channels causes immediate nozzle clogging.</p>
</details>
<details>
  <summary>Do Z-series printers take longer to print simple CAD drawings?</summary>
  <p>Yes. Z-series plotters use heavier multi-pass print algorithms designed for dot placement accuracy rather than raw draft line velocity.</p>
</details>`
  },

  // 5. Cutter Not Cutting Cleanly
  {
    title: "HP DesignJet Cutter Not Cutting Cleanly or Jammed: Rotary Blade & Track Fix",
    slug: "hp-designjet-cutter-not-cutting-cleanly-fix",
    metaDescription: "Troubleshoot HP DesignJet automatic cutter jams, ragged cut edges, cutter carriage disconnects, and media thickness limits on large format plotters.",
    brandId: HP_BRAND_ID,
    categoryId: CAT_MAINT,
    authorId: AUTHOR_MARCUS,
    featuredImage: "/images/printers/hp.webp",
    content: `<h2>Understanding HP DesignJet Automatic Cutters</h2>
<p>HP DesignJet plotters utilize a motorized rotary blade assembly that travels horizontally across the platen channel to cut paper rolls after each job.</p>
<p>When the blade becomes dull, filled with paper lint, or derailed from its drive track, the cutter tears the paper or jams completely, halting all further plotting.</p>

<h2>Step 1: Check Media Thickness and Weight Limits</h2>
<p>Attempting to cut unsupported media is the most frequent cause of broken cutter carriages:</p>
<ol>
  <li><strong>Standard cutter capacity:</strong> Built-in rotary cutters are designed for media between 60 g/m² and 280 g/m².</li>
  <li><strong>Unsupported cutter media:</strong> Never use the automatic cutter on canvas, heavy banner vinyl, magnetic media, or self-adhesive film.</li>
  <li><strong>Disable the cutter for heavy media:</strong> On the front panel, tap <strong>Paper</strong> &gt; <strong>Roll</strong> &gt; <strong>Cutter Option</strong> and select <strong>OFF</strong>.</li>
  <li><strong>Cut thick media manually:</strong> Advance paper past the platen groove and use a utility knife along the integrated manual cutting track.</li>
</ol>

<h2>Step 2: Clear Paper Lint from the Cutter Track Groove</h2>
<p>Paper dust accumulates in the aluminum cutter channel over time, preventing the rotary wheel from spinning freely:</p>
<ol>
  <li><strong>Turn off the printer:</strong> Power off the plotter and unplug the power cord.</li>
  <li><strong>Open the top access window:</strong> Locate the cutter carriage parked on the far left or right end of the track.</li>
  <li><strong>Inspect the cutting channel:</strong> Use a bright flashlight to inspect the narrow groove spanning the full width of the platen.</li>
  <li><strong>Clear packed debris:</strong> Use a compressed air can and a thin plastic shim to gently clear compacted paper lint and tiny torn scraps from the groove.</li>
  <li><strong>Check blade rotation:</strong> Manually rotate the circular metal blade with a gloved finger to ensure it spins without binding.</li>
</ol>

<h2>Step 3: Reseat a Derailed Cutter Carriage</h2>
<p>A severe paper jam can force the cutter carriage off its guide rails:</p>
<ol>
  <li><strong>Inspect the carriage guide wheels:</strong> Look at the rear of the cutter block. It has two small plastic guide rollers that ride in a metal groove.</li>
  <li><strong>Check the drive engagement pin:</strong> The cutter connects to the printhead carriage via a mechanical latch pin on select T-series models.</li>
  <li><strong>Reseat onto the rail:</strong> Gently press the carriage downward and tilt backward until the rollers snap cleanly back into the metal guide channel.</li>
  <li><strong>Manually test travel:</strong> Slide the cutter carriage across the width of the printer by hand. It should glide smoothly with slight rolling resistance.</li>
  <li><strong>Return to park position:</strong> Park the cutter fully against the left stop bracket before powering the printer on.</li>
</ol>

<h2>Step 4: Enable or Test the Cutter from the Front Panel</h2>
<p>Verify motor operation through the printer menu:</p>
<ol>
  <li><strong>Turn on the plotter:</strong> Allow the plotter to finish its startup carriage diagnostic sweep.</li>
  <li><strong>Access Paper Options:</strong> Tap <strong>Paper</strong> &gt; <strong>Roll</strong> &gt; <strong>Form Feed and Cut</strong> on the touchscreen.</li>
  <li><strong>Observe the cut motion:</strong> The paper should advance 2 inches, and the cutter carriage should cross the platen in a single smooth sweep without hesitation.</li>
  <li><strong>Inspect the cut edge:</strong> The cut must be clean and straight with zero fraying, ragged burs, or partial attachments.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can the rotary blade on an HP DesignJet cutter be sharpened?</summary>
  <p>No. The cutter is a precision sealed rotary unit. If the hardened steel blade becomes dull or nicked, the modular cutter assembly must be replaced.</p>
</details>
<details>
  <summary>Why does my cutter leave the last inch of paper uncut?</summary>
  <p>This happens when the paper roll shifts rightward or the cutter carriage stops before reaching the full end of the guide rail. Clean the end-stop sensor and recalibrate carriage travel.</p>
</details>
<details>
  <summary>What error code indicates a jammed cutter on HP DesignJet?</summary>
  <p>Error code 42:10 or 42.1:10 directly indicates an electrical failure or mechanical stall in the cutter motor assembly.</p>
</details>`
  }
];

async function main() {
  console.log(`Publishing ${articles.length} HP DesignJet articles to the database...`);

  for (const art of articles) {
    const cleanText = art.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const wordCount = cleanText.split(/\s+/).filter(Boolean).length;

    const record = await prisma.article.upsert({
      where: { slug: art.slug },
      update: {
        title: art.title,
        metaDescription: art.metaDescription,
        excerpt: art.metaDescription,
        content: art.content,
        wordCount,
        status: "published",
        publishedAt: new Date(),
        brandId: art.brandId,
        categoryId: art.categoryId,
        authorId: art.authorId,
        featuredImage: art.featuredImage
      },
      create: {
        title: art.title,
        slug: art.slug,
        metaDescription: art.metaDescription,
        excerpt: art.metaDescription,
        content: art.content,
        wordCount,
        status: "published",
        publishedAt: new Date(),
        brandId: art.brandId,
        categoryId: art.categoryId,
        authorId: art.authorId,
        featuredImage: art.featuredImage
      }
    });

    console.log(`✅ [${record.slug}] Published successfully (${record.wordCount} words) - Author: ${art.authorId}`);
  }

  console.log("\nAll 5 HP DesignJet articles are now live in the database!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
