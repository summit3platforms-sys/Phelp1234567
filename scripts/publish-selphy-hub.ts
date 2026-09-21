import { prisma } from '../src/lib/prisma';

const CANON_BRAND_ID = 'aa9e42c5-e0f0-4b60-b776-c39f46748c33';
const CAT_PRINTING = '0e7ca2ba-24ae-4bf9-9ca7-072b36154911'; // Printing Problems
const CAT_INK = '9af9508c-4517-47bc-9084-8ab635b1283b'; // Ink & Toner Issues
const CAT_MAINT = 'f8e1387d-7604-4fa7-9f87-7a58c960818f'; // Hardware & Maintenance
const CAT_SETUP = 'e6768bbb-1696-4f92-8499-7eb45f540edd'; // Setup & Installation
const CAT_QUALITY = 'e3d26347-33bf-41a7-9cbf-c3d821850f98'; // Print Quality Issues

const AUTHOR_ALEX = '88e8d061-e1be-406d-8fa1-a53f108cc624'; // Alex Carter
const AUTHOR_MARCUS = 'fba87e7e-2ed7-465e-bab3-875aaaecbf81'; // Marcus Vance
const AUTHOR_ELENA = '88de9646-6fd4-4e5d-817c-a8a1c0230866'; // Elena Rodriguez
const AUTHOR_DAVID = '1feb6d39-93c0-406c-818c-40dd1428aca6'; // David Chen

const articles = [
  // 1. CP1500 Not Printing
  {
    title: "Canon SELPHY CP1500 Not Printing? Queue, Cassette & Connection Fix",
    slug: "canon-selphy-cp1500-not-printing-fix",
    metaDescription: "Fix Canon SELPHY CP1500 not printing, print queue errors, paper cassette feed jams, and rear clearance stalls on iOS, Android, and PC.",
    brandId: CANON_BRAND_ID,
    categoryId: CAT_PRINTING,
    authorId: AUTHOR_ALEX,
    featuredImage: "/images/printers/canon.webp",
    content: `<h2>Understanding Canon SELPHY CP1500 Print Mechanics</h2>
<p>The Canon SELPHY CP1500 uses a 4-pass dye-sublimation process. The photo sheet feeds in and out of the printer 4 times: Yellow, Magenta, Cyan, and clear protective overcoat.</p>
<p>If anything obstructs the front cassette or the rear ejection slot, the CP1500 halts the print cycle immediately to prevent tearing the delicate ink ribbon.</p>

<h2>Step 1: Verify Rear Clearance and Flat Surface Placement</h2>
<p>Because the photo sheet travels completely through the back of the unit during each color pass, physical clearance is mandatory:</p>
<ol>
  <li><strong>Clear at least 4 inches behind the printer:</strong> Ensure the printer is not placed directly against a wall, books, or cables.</li>
  <li><strong>Clear 4 inches in front:</strong> The paper cassette must sit completely flat on the desk without hanging over edges.</li>
  <li><strong>Keep the printer level:</strong> Operating the SELPHY on an angled or soft surface (like a couch or carpet) causes roller feed misalignment.</li>
</ol>

<h2>Step 2: Inspect Paper Cassette Size and Sheet Capacity</h2>
<p>Loading the paper cassette incorrectly prevents the pickup roller from grabbing sheets:</p>
<ol>
  <li><strong>Check sheet capacity:</strong> Never load more than 18 sheets of photo paper into the cassette at once. Overfilling causes double-feeding.</li>
  <li><strong>Check paper orientation:</strong> Load paper with the glossy side facing UP. Do not touch the glossy printable surface with bare fingers.</li>
  <li><strong>Insert cassette firmly:</strong> Slide the paper cassette into the front compartment until it clicks audibly into place.</li>
  <li><strong>Open the output flap:</strong> Ensure the middle cover of the paper cassette is flipped open to receive the finished photo.</li>
</ol>

<h2>Step 3: Reset the Print Queue and Mobile App</h2>
<p>A corrupted print job in the mobile queue will block all subsequent prints:</p>
<ol>
  <li><strong>Force close the app:</strong> Swipe away the Canon SELPHY Photo Layout app from your phone's multitasking view.</li>
  <li><strong>Power cycle the CP1500:</strong> Press and hold the power button until the screen turns off. Wait 15 seconds and turn it back on.</li>
  <li><strong>Reconnect via QR code:</strong> Open the SELPHY Photo Layout app, tap the printer icon, and scan the QR code displayed on the CP1500 LCD screen.</li>
  <li><strong>Send a single test print:</strong> Try printing a single photo directly from your camera roll rather than a complex multi-photo collage.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the CP1500 say "Paper and ink do not match"?</summary>
  <p>This happens if you load postcard paper (KP-108IN) while a card-size ink cassette (KC-36IP) is installed. The paper cassette and ribbon cassette sizes must match exactly.</p>
</details>
<details>
  <summary>Why does the paper feed out the back and stop during printing?</summary>
  <p>This is normal operation. The paper must extend out the rear slot between passes as the printer applies each individual color layer (Yellow, Magenta, Cyan, Gloss).</p>
</details>
<details>
  <summary>Can I print from a USB flash drive on the CP1500?</summary>
  <p>Yes. Insert a FAT32-formatted USB flash drive or SD card directly into the slot on the front of the CP1500 and select photos using the LCD menu.</p>
</details>`
  },

  // 2. Ink Cartridge Not Recognized
  {
    title: "Canon SELPHY Ink Cartridge Not Recognized? Ribbon Slack & Sensor Fix",
    slug: "canon-selphy-ink-cartridge-not-recognized-fix",
    metaDescription: "Troubleshoot Canon SELPHY ink cassette not recognized, cartridge errors, loose dye-sub ribbon film, and sensor faults on CP1500, CP1300, and CP1200.",
    brandId: CANON_BRAND_ID,
    categoryId: CAT_INK,
    authorId: AUTHOR_MARCUS,
    featuredImage: "/images/printers/canon.webp",
    content: `<h2>How the Canon SELPHY Ink Cassette Works</h2>
<p>Canon SELPHY printers do not use liquid ink cartridges. They use a plastic cassette containing a tri-color thermal transfer ribbon (Yellow, Magenta, Cyan, and Clear overcoat).</p>
<p>When the printer displays "No ink cassette" or "Cannot recognize ink cartridge," the cause is almost always film slack, a microswitch sensor glitch, or mismatched cassette sizing.</p>

<h2>Step 1: Tighten Ribbon Slack on the Ink Cassette</h2>
<p>If the ribbon film is loose or wrinkled, the printer's optical sensor cannot confirm cassette presence:</p>
<ol>
  <li><strong>Remove the ink cassette:</strong> Slide the compartment latch on the right side of the printer and slide the cassette out.</li>
  <li><strong>Inspect the orange take-up gear:</strong> Look at the bottom of the cassette where the orange plastic cog is located.</li>
  <li><strong>Turn the cog clockwise:</strong> Rotate the gear gently in the direction of the arrow to take up any slack in the ribbon.</li>
  <li><strong>Ensure the film is flat:</strong> The ribbon should be completely taut without sag, folds, or creases across the open window.</li>
  <li><strong>Reinsert the cassette:</strong> Push the cassette straight in until the colored lock lever clicks shut.</li>
</ol>

<h2>Step 2: Match Ink Cassette Code with Paper Type</h2>
<p>The SELPHY reads mechanical key notches on the cassette body to determine size compatibility:</p>
<ol>
  <li><strong>Check the cassette label:</strong> Locate the model code stamped on the cassette (e.g., KP-108IN, RP-108, or KC-36IP).</li>
  <li><strong>Check the paper cassette:</strong> Look at the paper tray loaded in the front slot. Postcard trays (P) require "P" size ink. Card trays (C) require "C" size ink.</li>
  <li><strong>Never force mismatched cassettes:</strong> Installing a card cassette with postcard paper will trigger "Ink and paper size mismatch" every time.</li>
</ol>

<h2>Step 3: Clean the Internal Optical Sensor and Door Contacts</h2>
<p>Dust inside the ink compartment can blind the optical presence sensor:</p>
<ol>
  <li><strong>Power off the printer:</strong> Turn off the SELPHY and unplug the AC power adapter.</li>
  <li><strong>Open the side compartment:</strong> Remove the ink cassette and look inside with a flashlight.</li>
  <li><strong>Inspect the sensor window:</strong> Locate the small black sensor recess and the metal microswitch finger on the inner wall.</li>
  <li><strong>Clear dust with compressed air:</strong> Blow 2 short bursts of clean compressed air into the compartment to dislodge paper fibers and lint.</li>
  <li><strong>Inspect the door latch:</strong> Ensure the outer door closes completely flush against the chassis to depress the safety interlock switch.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the printer say the ink is empty when there is still film on the roll?</summary>
  <p>Canon SELPHY ink cassettes are calibrated to print an exact number of sheets (e.g., 36 sheets per cassette). Once the chip counter reaches zero, the cassette cannot be reused even if film remains.</p>
</details>
<details>
  <summary>Can I splice a torn SELPHY ink ribbon back together?</summary>
  <p>Yes. If the film snapped during a paper jam, tape the two torn ends together with clear Scotch tape, wind the take-up gear past the taped section, and reinsert the cassette.</p>
</details>
<details>
  <summary>Are third-party compatible ink cassettes safe to use in SELPHY?</summary>
  <p>Third-party cassettes often use thinner film that wrinkles easily under heat. We recommend genuine Canon KP-108IN or RP-108 kits for reliable sensor detection.</p>
</details>`
  },

  // 3. Canon SELPHY vs Instax Square Link
  {
    title: "Canon SELPHY vs Fujifilm Instax Square Link: Full Comparison & Buyer Guide",
    slug: "canon-selphy-vs-instax-square-link-comparison",
    metaDescription: "Canon SELPHY CP1500 vs Fujifilm Instax Square Link comparison: dye-sublimation vs instant film, print size, cost per photo, image quality, and durability.",
    brandId: CANON_BRAND_ID,
    categoryId: CAT_MAINT,
    authorId: AUTHOR_ELENA,
    featuredImage: "/images/printers/canon.webp",
    content: `<h2>Dye-Sublimation vs Instant Chemical Film</h2>
<p>The Canon SELPHY CP1500 and Fujifilm Instax Square Link are both popular portable photo printers, but they use completely different printing technologies.</p>
<p>The Canon SELPHY uses thermal dye-sublimation to produce true lab-quality 4x6 continuous-tone prints. The Instax Square Link exposes analog silver-halide chemistry to create nostalgic retro prints with instant borders.</p>

<h2>Core Architectural Comparison</h2>
<p>Here is how the two portable photo printing systems compare across key technical specifications:</p>
<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Canon SELPHY CP1500</th>
      <th>Fujifilm Instax Square Link</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Printing Technology</strong></td>
      <td>Thermal Dye-Sublimation (4-pass YMC + Overcoat)</td>
      <td>Chemical Silver Halide Instant Film (OLED exposure)</td>
    </tr>
    <tr>
      <td><strong>Print Resolution</strong></td>
      <td>300 x 300 DPI (Continuous tone, 16.8M colors)</td>
      <td>318 DPI (Analog continuous tonal gradation)</td>
    </tr>
    <tr>
      <td><strong>Photo Dimensions</strong></td>
      <td>Full 4x6" Postcard (100 x 148 mm)</td>
      <td>2.4 x 2.4" Square (62 x 62 mm inside border)</td>
    </tr>
    <tr>
      <td><strong>Cost per Print</strong></td>
      <td>~$0.35 per photo (KP-108IN ink + paper kit)</td>
      <td>~$0.90 to $1.15 per photo (Instax Square packs)</td>
    </tr>
    <tr>
      <td><strong>Print Durability</strong></td>
      <td>100-Year Life (Laminated clear thermal overcoat)</td>
      <td>Sensitive to light, heat, and moisture over time</td>
    </tr>
    <tr>
      <td><strong>Power Source</strong></td>
      <td>AC Wall Power standard (optional NB-CP2LI battery)</td>
      <td>Built-in rechargeable Li-ion battery (USB-C)</td>
    </tr>
    <tr>
      <td><strong>Print Time</strong></td>
      <td>~41 seconds (4 passes)</td>
      <td>~12 seconds print + 90 seconds chemical develop</td>
    </tr>
  </tbody>
</table>

<h2>When to Choose the Canon SELPHY</h2>
<p>The Canon SELPHY is ideal for home archiving, photo albums, and frame-ready prints:</p>
<ol>
  <li><strong>Standard 4x6 album size:</strong> Prints standard postcard photos that fit directly into traditional photo albums and desktop frames.</li>
  <li><strong>Accurate color fidelity:</strong> Continuous tone reproduction matches DSLR and smartphone screens far more accurately than chemical instant film.</li>
  <li><strong>Water and smudge proof:</strong> The clear protective overcoat seals each photo immediately, protecting against fingerprints, water drops, and UV fade.</li>
  <li><strong>Lowest operating cost:</strong> At roughly 35 cents per print, the SELPHY is over 60% cheaper to operate than instant film packs.</li>
</ol>

<h2>When to Choose the Instax Square Link</h2>
<p>The Instax Square Link is engineered for on-the-go social fun, parties, and scrapbooking:</p>
<ol>
  <li><strong>Pocket portability:</strong> The printer weighs only 390 grams and slips easily into a jacket pocket or small purse.</li>
  <li><strong>Built-in rechargeable battery:</strong> Prints anywhere on battery power without needing expensive optional battery attachments.</li>
  <li><strong>Retro instant aesthetic:</strong> Delivers authentic vintage colors, soft focus tones, and classic white border margins perfect for journaling.</li>
  <li><strong>AR Print features:</strong> The Instax app embeds QR codes into prints that link to videos, web links, and hidden messages.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Which printer has sharper details for portraits and landscapes?</summary>
  <p>The Canon SELPHY produces significantly sharper details. Its continuous-tone thermal dye process renders crisp skin textures and sharp text, whereas Instax film has a softer analog look.</p>
</details>
<details>
  <summary>Can the Canon SELPHY print without being plugged into the wall?</summary>
  <p>Only if you purchase the optional Canon NB-CP2LI rechargeable battery pack. Out of the box, the SELPHY must be plugged into an AC wall outlet.</p>
</details>
<details>
  <summary>Do Instax Square prints need to dry like old Polaroid photos?</summary>
  <p>No. Instax photos develop chemically under an internal sealed pod. You do not need to shake or fan the print; it develops fully within 90 seconds.</p>
</details>`
  },

  // 4. Wi-Fi Setup Guide
  {
    title: "Canon SELPHY Wi-Fi Setup Guide: Direct Connection, Router & App Pairing",
    slug: "canon-selphy-wifi-setup-guide",
    metaDescription: "Complete Canon SELPHY Wi-Fi setup guide. Connect via Direct Connection hotspot mode, home router Wi-Fi, and the SELPHY Photo Layout app on iOS & Android.",
    brandId: CANON_BRAND_ID,
    categoryId: CAT_SETUP,
    authorId: AUTHOR_DAVID,
    featuredImage: "/images/printers/canon.webp",
    content: `<h2>Understanding Canon SELPHY Wireless Modes</h2>
<p>Canon SELPHY printers support two wireless operating modes: **Direct Connection** (the printer broadcasts its own Wi-Fi network) and **Via Wi-Fi Network** (the printer joins your home router).</p>
<p>Direct Connection is ideal for parties and outdoor events where no router is available. Connecting via home Wi-Fi lets multiple phones and PCs print without switching networks.</p>

<h2>Method 1: Direct Connection (No Router Required)</h2>
<p>Use Direct Connection when printing on the go or away from home:</p>
<ol>
  <li><strong>Open Wi-Fi Settings on printer:</strong> On the SELPHY screen, navigate to <strong>Wi-Fi Settings</strong> &gt; <strong>Connection Settings</strong>.</li>
  <li><strong>Select Direct Connection:</strong> Choose <strong>Direct Connection</strong>. The printer screen will display an SSID (printer network name) and Wi-Fi password.</li>
  <li><strong>Connect your smartphone:</strong> Open Wi-Fi settings on your phone and tap the SELPHY network. Enter the password shown on the printer LCD.</li>
  <li><strong>Open the SELPHY app:</strong> Launch the <strong>Canon SELPHY Photo Layout</strong> app. The printer will connect immediately for printing.</li>
</ol>

<h2>Method 2: Connect to Your Home Wi-Fi Router (Infrastructure Mode)</h2>
<p>Connect the SELPHY to your home network so any device on your Wi-Fi can print:</p>
<ol>
  <li><strong>Select Network Mode:</strong> Tap <strong>Wi-Fi Settings</strong> &gt; <strong>Connection Settings</strong> &gt; <strong>Via Wi-Fi Network</strong>.</li>
  <li><strong>Search for your network:</strong> Choose <strong>Search for an access point</strong>. The printer scans for local networks.</li>
  <li><strong>Select 2.4 GHz network:</strong> Select your home Wi-Fi SSID. Note that Canon SELPHY only supports 2.4 GHz networks (it does not connect to 5 GHz).</li>
  <li><strong>Enter router password:</strong> Use the arrow buttons on the printer panel to enter your Wi-Fi password and press OK.</li>
  <li><strong>Verify connection:</strong> The Wi-Fi antenna icon in the top-left corner of the screen will show solid signal bars.</li>
</ol>

<h2>Method 3: Quick Pairing via QR Code (CP1500 Only)</h2>
<p>The CP1500 offers streamlined pairing using your phone's camera:</p>
<ol>
  <li><strong>Display QR Code:</strong> Press the Wi-Fi button on the CP1500 panel. Select <strong>QR Code Connection</strong>.</li>
  <li><strong>Open SELPHY Photo Layout app:</strong> On your smartphone, open the app and tap <strong>Connect Printer</strong> &gt; <strong>Scan QR Code</strong>.</li>
  <li><strong>Scan the screen:</strong> Point your camera at the LCD screen. Accept the prompt to join the Wi-Fi network automatically.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why can't my Canon SELPHY find my home 5 GHz Wi-Fi network?</summary>
  <p>Canon SELPHY hardware only has a 2.4 GHz Wi-Fi radio. If your router uses separate 2.4 GHz and 5 GHz networks, ensure your printer connects to the 2.4 GHz band.</p>
</details>
<details>
  <summary>Can I print from an iPhone without downloading the app?</summary>
  <p>Yes. Canon SELPHY supports Apple AirPrint natively. Connect to the printer's Wi-Fi network, open any photo in Apple Photos, tap Share, and select Print.</p>
</details>
<details>
  <summary>Why does the Wi-Fi icon on my SELPHY flash continuously?</summary>
  <p>A flashing Wi-Fi icon indicates the printer is searching for its access point or negotiating an IP address. Check that your router is powered on and within range.</p>
</details>`
  },

  // 5. Prints Faded
  {
    title: "Canon SELPHY Prints Faded or Washed Out? Thermal Head & Film Fix",
    slug: "canon-selphy-prints-faded-fix",
    metaDescription: "Fix Canon SELPHY faded, washed-out, or pale photos. Troubleshoot thermal printhead temperature, damaged dye-sub ribbons, and app color correction settings.",
    brandId: CANON_BRAND_ID,
    categoryId: CAT_QUALITY,
    authorId: AUTHOR_ELENA,
    featuredImage: "/images/printers/canon.webp",
    content: `<h2>Why Canon SELPHY Photos Look Faded or Washed Out</h2>
<p>Dye-sublimation produces vivid, highly saturated colors by heating solid dye into gas. If the thermal printhead is dirty or the ribbon film has degraded from heat exposure, prints appear pale and desaturated.</p>
<p>Faded prints can also stem from disabled glossy overcoats, counterfeit ribbon kits, or aggressive automatic exposure settings in smartphone photo apps.</p>

<h2>Step 1: Clean the Thermal Printhead Line</h2>
<p>Paper dust and airborne residue insulate the heating elements on the thermal printhead:</p>
<ol>
  <li><strong>Power off and unplug the printer:</strong> Ensure the printer has been powered down for at least 10 minutes so the thermal head cools completely.</li>
  <li><strong>Remove the ink cassette:</strong> Slide out the ink ribbon cassette from the right side.</li>
  <li><strong>Locate the printhead heating bar:</strong> Look inside the top roof of the ink compartment. You will see a narrow glass-like ceramic bar.</li>
  <li><strong>Clean with a dry cleaning sheet or microfiber:</strong> Wipe the heating bar gently with a dry lens-cleaning microfiber cloth. Never touch the heating line with metal tools or harsh solvents.</li>
  <li><strong>Reinsert the cassette:</strong> Reseat the ink ribbon and test print a high-contrast photo.</li>
</ol>

<h2>Step 2: Check for Expired or Heat-Damaged Ink Film</h2>
<p>Dye-sublimation ribbons are sensitive to ambient temperature and moisture:</p>
<ol>
  <li><strong>Inspect ribbon film:</strong> Pull out the ribbon cassette and look at the colored panels. The film should look semi-transparent and vibrant.</li>
  <li><strong>Avoid hot storage:</strong> Never leave spare SELPHY paper and ink packs in hot car trunks, direct sunlight, or humid basements. Excess heat prematurely sublimates the dye.</li>
  <li><strong>Check for counterfeit supplies:</strong> Genuine Canon paper packs (KP-108IN, RP-108) feature the watermarked "Canon" logo on the backside of each sheet. Counterfeit packs produce washed-out colors.</li>
</ol>

<h2>Step 3: Adjust App Image Optimizer Settings</h2>
<p>The default image optimization in mobile apps can over-brighten already well-lit photos:</p>
<ol>
  <li><strong>Open SELPHY Photo Layout app:</strong> Select the image you want to print.</li>
  <li><strong>Tap Print Settings:</strong> Scroll down to the <strong>Image Optimize</strong> toggle.</li>
  <li><strong>Disable Image Optimize:</strong> If your photo looks washed out with blown-out highlights, turn Image Optimize <strong>OFF</strong> to print the raw image data.</li>
  <li><strong>Adjust Color Finish:</strong> Ensure the finish is set to <strong>Glossy</strong> (Finish 1). Semi-gloss finishes (Finish 2/3) have a slightly softer matte appearance.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why do dark shadows look grainy or pale on my SELPHY prints?</summary>
  <p>Dye-sublimation requires significant heat to achieve deep black densities. If your room temperature is below 50°F (10°C), allow the printer to warm up to room temperature before printing.</p>
</details>
<details>
  <summary>Can I reuse paper that already fed through the printer once?</summary>
  <p>No. Re-running previously printed sheets through the SELPHY melts the existing overcoat layer, damaging the thermal printhead and leaving faded color streaks.</p>
</details>
<details>
  <summary>Will changing the power source make SELPHY prints brighter?</summary>
  <p>If printing on a third-party battery pack with low charge, the thermal head may not reach optimal sublimation temperatures. Test with the original AC wall adapter.</p>
</details>`
  }
];

async function main() {
  console.log(`Publishing ${articles.length} Canon SELPHY articles to the database...`);

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

  console.log("\nAll 5 Canon SELPHY articles are now live in the database!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
