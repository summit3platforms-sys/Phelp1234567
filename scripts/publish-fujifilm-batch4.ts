import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';
const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';
const paperCategory = '9a42c554-2b4f-47f8-887e-5996fb83cbad';
const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Instax Link Won't Turn On, Charge, or Hold Battery: Power Fix",
    slug: 'instax-link-wont-turn-on-charge-battery-fix',
    seoTitle: "Fix Instax Link Won't Turn On or Charge (Battery Guide)",
    metaDescription: "Is your Fujifilm Instax Link printer completely dead, refusing to charge, or shutting off immediately? Learn how to revive deep-discharged lithium batteries.",
    excerpt: "When an Instax Link printer sits in storage for months, the built-in lithium-ion battery enters deep sleep protection mode. Here is how to wake it up safely.",
    errorCode: 'No Power',
    tags: 'Fujifilm, Instax Link, Wont Turn On, Wont Charge, Battery Dead, Deep Discharge, USB Charging',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: hardwareCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredSnippet: "To revive an Instax Link printer that won't turn on or charge: 1) Avoid high-wattage USB-C laptop chargers (65W+); use a dedicated 5V/1A or 5V/2A standard wall adapter with the original cable. 2) If the battery is deeply discharged from months in storage, leave it plugged in for 20 minutes without touching any buttons; the battery BMS protection circuit takes several minutes to initiate trickle charging before the LED illuminates. 3) If unresponsive, press the recessed pinhole reset button beside the charging port for 5 seconds.",
    content: `<h2>Understanding Instax Lithium-Ion Power Architecture</h2>
<p>Fujifilm Instax Link printers (Mini Link, Mini Link 2, Mini Link 3, Square Link, and Link WIDE) are powered by internal high-discharge lithium-ion battery cells. To prevent thermal runaway or cell damage, the internal Battery Management System (BMS) incorporates strict low-voltage cutoffs. If left in a drawer uncharged for several months, cell voltage drops below 2.5V, triggering a <strong>deep-sleep lockout</strong> that makes the unit appear completely dead.</p>

<h2>Fix 1: The Trickle-Charge Revival Procedure</h2>
<p>When an Instax printer is in deep discharge, connecting a fast charger will cause the BMS to reject the high-voltage inrush, resulting in no LED illumination.</p>
<ol>
  <li>Find a standard, low-wattage <strong>5V/1A or 5V/2A USB wall adapter</strong> (such as an older Apple 5W cube, an Amazon Kindle plug, or a computer USB-A port).</li>
  <li>Connect the printer using a high-quality USB cable.</li>
  <li><strong>Do not press the power button or disconnect the cable.</strong> Leave the printer completely alone on the charger for <strong>at least 30 minutes</strong>.</li>
  <li>The BMS will slowly deliver micro-amp trickle currents to revive the battery chemistry. Once voltage safely crosses the 3.0V threshold, the central LED will suddenly illuminate solid red to signify normal charging.</li>
  <li>Allow it to reach 100% full charge (approximately 90 to 120 minutes) until the LED turns off or switches to green.</li>
</ol>

<h2>Fix 2: Clearing Thermal Power Cutout Locks</h2>
<p>If you recently printed multiple film packs back-to-back, the mechanical drive motor and thermal exposure strip generate internal heat. If internal temperatures exceed 45°C (113°F), the thermal fuse cuts all power to prevent warping the optical elements.</p>
<ul>
  <li>Unplug the charger and place the printer on a cool, hard surface (away from direct sunlight).</li>
  <li>Wait 20 minutes for internal heat dissipation.</li>
  <li>Press and hold the power button for 3 full seconds. The printer will boot normally.</li>
</ul>

<h2>Fix 3: Pinhole Hardware Power Reset</h2>
<p>If the printer displays a solid light but is completely frozen and refuses to respond to the power button:</p>
<ol>
  <li>Locate the tiny pinhole reset switch next to the USB port.</li>
  <li>Insert a paperclip or SIM tool and gently press the internal tactile switch for <strong>5 seconds</strong>.</li>
  <li>Release the paperclip. Connect the USB charger; the printer will perform a full cold hardware reboot.</li>
</ol>`
  },
  {
    title: "Instax Link LED Charging Lights & Blinking Color Meanings",
    slug: 'instax-link-charging-light-led-colors-meaning',
    seoTitle: "Instax Link LED Charging Lights & Blinking Colors Explained",
    metaDescription: "Complete guide to Instax Link LED light indicators. Learn how long to charge for the first time, what solid red means, and how to decode blinking status codes.",
    excerpt: "Decode every LED color, pulse rate, and battery indicator on your Fujifilm Instax Link smartphone printer to know exact charging times and health status.",
    errorCode: null,
    tags: 'Fujifilm, Instax Link, Charging Light, LED Colors, Battery Indicator, Charge Time, Status Lights',
    wordCount: 1000,
    difficultyLevel: 'Beginner',
    timeToFix: '2 minutes',
    categoryId: hardwareCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "Instax Link charging and LED status breakdown: 1) Initial First-Time Charge: Requires approximately 80 to 120 minutes using a 5V/1A USB power source. 2) Solid Red LED: Battery is actively charging. 3) LED Turns Completely Off (or Solid Green on Link 3): Battery is 100% full. 4) Flashing Red while in use: Battery has dropped below 10% and will power down shortly. 5) Solid Cyan/White: Printer is on and ready to print. 6) Rainbow Rotating Loop: Active image processing and film ejection.",
    content: `<h2>Mastering the Instax Status LED</h2>
<p>Because Instax Link portable printers do not feature an LCD screen, all battery levels, connection statuses, charging states, and hardware faults are communicated through the multi-color illuminated ring on the central power button.</p>

<h2>Charging Times &amp; Battery Benchmarks</h2>
<ul>
  <li><strong>First-Time Out-of-the-Box Charge:</strong> 90 to 120 minutes.</li>
  <li><strong>Standard Recharge Time:</strong> 80 to 90 minutes from 0% to 100%.</li>
  <li><strong>Expected Print Yield per Charge:</strong> Approximately <strong>80 to 100 consecutive instant prints</strong> (equivalent to 8 to 10 full packs of Instax film) under normal room temperatures.</li>
</ul>

<h2>Comprehensive LED Color &amp; Pattern Reference Guide</h2>
<table style="width:100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1; text-align: left;">
      <th style="padding: 0.75rem;">Color / Pattern</th>
      <th style="padding: 0.75rem;">Operating State</th>
      <th style="padding: 0.75rem;">Status Meaning</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold; color: #dc2626;">Solid Red (Plugged In)</td>
      <td style="padding: 0.75rem;">Charging</td>
      <td style="padding: 0.75rem;">Battery is actively charging</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold; color: #16a34a;">LED Turns Off / Solid Green</td>
      <td style="padding: 0.75rem;">Charging Complete</td>
      <td style="padding: 0.75rem;">Battery is 100% fully charged</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold; color: #0284c7;">Solid White / Cyan</td>
      <td style="padding: 0.75rem;">Ready / Paired</td>
      <td style="padding: 0.75rem;">Connected to smartphone app</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold; color: #7c3aed;">Rainbow Rotating Circle</td>
      <td style="padding: 0.75rem;">Printing</td>
      <td style="padding: 0.75rem;">Exposing and ejecting photo</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold; color: #dc2626;">Pulsing / Blinking Red (Unplugged)</td>
      <td style="padding: 0.75rem;">Low Battery</td>
      <td style="padding: 0.75rem;">Less than 10% charge remaining</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold; color: #dc2626;">Rapid Blinking Red</td>
      <td style="padding: 0.75rem;">Error / Jam</td>
      <td style="padding: 0.75rem;">Out of film, door open, or film jammed</td>
    </tr>
  </tbody>
</table>`
  },
  {
    title: "Instax Film Compatibility Guide: Mini vs Square vs WIDE Film",
    slug: 'instax-mini-vs-square-vs-wide-film-compatibility-guide',
    seoTitle: "Instax Film Compatibility Guide (Mini vs Square vs WIDE)",
    metaDescription: "Can you use Square or WIDE film in an Instax Mini Link? Complete compatibility guide explaining physical dimensions, cartridge keys, and film errors.",
    excerpt: "Instant film cartridges look similar, but physical dimensions and mechanical guide rails make each Instax format strictly dedicated to its corresponding printer.",
    errorCode: 'Out of Film',
    tags: 'Fujifilm, Instax Film Compatibility, Mini vs Square, Link WIDE, Cartridge Size, Out of Film Error',
    wordCount: 1050,
    difficultyLevel: 'Beginner',
    timeToFix: '3 minutes',
    categoryId: paperCategory,
    authorId: authors.elena,
    reviewerId: authors.alex,
    featuredSnippet: "Instax film compatibility breakdown: 1) Instax Mini Film (86x54mm) ONLY works in Instax Mini cameras and Mini Link 1/2/3 printers. 2) Instax Square Film (86x72mm) ONLY works in Square cameras and the SQUARE Link printer. 3) Instax WIDE Film (86x108mm) ONLY works in WIDE cameras and the Link WIDE printer. Film packs are NOT interchangeable; each cartridge has unique molded plastic keying notches that prevent inserting the wrong size. 4) If you receive a false 'Out of Film' error on a fresh pack, the micro-lever switch inside the bay is stuck; gently tap the lever with a cotton swab.",
    content: `<h2>The Three Distinct Instax Film Formats</h2>
<p>Fujifilm manufactures three different formats of Instax instant photographic film. While the underlying chemical emulsion and developer pods are identical, the <strong>physical cartridge geometry, sheet dimensions, and roller widths are entirely incompatible across printer models</strong>.</p>

<h2>Film Size &amp; Aspect Ratio Specifications</h2>
<table style="width:100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1; text-align: left;">
      <th style="padding: 0.75rem;">Format</th>
      <th style="padding: 0.75rem;">Total Sheet Size</th>
      <th style="padding: 0.75rem;">Picture Area</th>
      <th style="padding: 0.75rem;">Compatible Printers</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold;">Instax Mini</td>
      <td style="padding: 0.75rem;">86 x 54 mm (Credit Card)</td>
      <td style="padding: 0.75rem;">62 x 46 mm (3:4 Ratio)</td>
      <td style="padding: 0.75rem;">Mini Link, Mini Link 2, Mini Link 3, Instax Share SP-2</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold;">Instax Square</td>
      <td style="padding: 0.75rem;">86 x 72 mm</td>
      <td style="padding: 0.75rem;">62 x 62 mm (1:1 Ratio)</td>
      <td style="padding: 0.75rem;">SQUARE Link, Instax Share SP-3</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 0.75rem; font-weight: bold;">Instax WIDE</td>
      <td style="padding: 0.75rem;">86 x 108 mm (Double Size)</td>
      <td style="padding: 0.75rem;">62 x 99 mm (Landscape)</td>
      <td style="padding: 0.75rem;">instax Link WIDE</td>
    </tr>
  </tbody>
</table>

<h2>Why You Cannot Force Cross-Compatibility</h2>
<p>Each plastic cartridge has precision molded guide tabs (plastic keying ribs) along the sides and back. Even if you attempted to trim the plastic, inserting a smaller Mini cartridge into a Square or WIDE printer will cause the sheet pick-arm to misalign, jamming the steel rollers and causing fatal motor gear slippage.</p>

<h2>Fixing False 'Out of Film' Errors on Fresh Packs</h2>
<p>If you insert a brand-new 10-pack of genuine film but the app still reports <em>"Out of Film (0/10 Remaining)"</em>:</p>
<ol>
  <li>Open the film door in a dark environment and remove the cartridge.</li>
  <li>Look into the bottom corner of the film bay for the small black mechanical feeler arm (the counter microswitch).</li>
  <li>If lint or dust is causing the spring lever to stick in the depressed position, gently flick it with a dry cotton swab to restore its spring action.</li>
  <li>Reinsert the cartridge firmly and close the door until the latch clicks.</li>
</ol>`
  },
  {
    title: "Instax Link Factory Reset, Stuck Firmware Update & Overheating Fix",
    slug: 'instax-link-factory-reset-stuck-firmware-update-overheating',
    seoTitle: "Instax Link Factory Reset & Stuck Firmware Update Fix",
    metaDescription: "How to perform a factory reset on Fujifilm Instax Link printers, recover from frozen firmware updates, resolve overheating errors, and fix stuck print queues.",
    excerpt: "If your Instax Link is completely unresponsive, frozen mid-firmware-update, or throwing thermal warnings, follow our technical recovery steps.",
    errorCode: 'FW-Error',
    tags: 'Fujifilm, Instax Link, Factory Reset, Firmware Update Stuck, Overheating, Print Queue, BLE Recovery',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: softwareCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "To perform a factory reset and recover a stuck Instax Link printer: 1) Hardware Pinhole Reset: Locate the recessed reset hole beside the USB charging port. Use a SIM ejector tool to press and hold the internal switch for 5 seconds until the LED turns off. 2) Recover from Stuck Firmware Update: If the printer LED rapidly blinks blue and the app freezes at 50%, force-quit the Instax app, restart your phone, keep the phone within 6 inches of the printer, and reopen the app; it will automatically resume the BLE over-the-air firmware recovery mode.",
    content: `<h2>When is a Hard Reset Required?</h2>
<p>While Instax Link printers are robust, micro-controller crashes can occur if a Bluetooth Low Energy packet is corrupted mid-transfer, an over-the-air (OTA) firmware update is interrupted by a dead phone battery, or consecutive continuous printing drives internal temperatures beyond safe thresholds.</p>

<h2>Step 1: The Pinhole Hardware Master Reset</h2>
<p>The hardware pinhole switch cuts direct circuit board power, clearing all volatile RAM buffers, active print queues, and frozen micro-controller loops without damaging your loaded film.</p>
<ol>
  <li>Ensure the printer is disconnected from the USB charging cable.</li>
  <li>Find the micro pinhole located beside the USB port (on Mini Link and Square Link) or near the lower corner (on Link WIDE).</li>
  <li>Insert a straightened paperclip or smartphone SIM eject tool straight into the hole.</li>
  <li>Press gently until you feel a distinct mechanical click. Hold for <strong>5 seconds</strong> and release.</li>
  <li>Press the main power button for 2 seconds to reboot the printer.</li>
</ol>

<h2>Step 2: Recovering from a Bricked / Stuck Firmware Update</h2>
<p>If your phone ran out of battery or Bluetooth dropped while installing a firmware update, the printer will display a <strong>fast blinking blue or red LED</strong> and refuse to print standard photos.</p>
<ul>
  <li>Do NOT power off the printer.</li>
  <li>Place your smartphone within <strong>15 cm (6 inches)</strong> of the printer to eliminate radio interference.</li>
  <li>Restart your smartphone and reopen the official Instax app.</li>
  <li>The application will automatically detect that the printer is trapped in <em>Bootloader / DFU Mode</em> and display: <strong>"Firmware update interrupted. Resume update?"</strong></li>
  <li>Tap <strong>Yes / Resume</strong> and leave both devices untouched for 2 minutes until the update reaches 100%.</li>
</ul>

<h2>Step 3: Thermal Overheating Protection (Pulsing Orange)</h2>
<p>If you print 15 or 20 photos consecutively at a wedding or party, the internal LED thermal exposure bars heat up. The printer will pause, pulse orange, and reject incoming Bluetooth print jobs.</p>
<p><em>Fix:</em> Power off the printer and allow it to rest for 15 minutes in a well-ventilated room. Do not place the printer in a refrigerator, as sudden temperature drops cause condensation inside the optical chambers that will ruin future film sheets.</p>`
  }
];

async function main() {
  const brand = await prisma.brand.findUnique({ where: { slug: 'fujifilm' } });
  if (!brand) throw new Error('Fujifilm brand not found in database.');

  console.log(`🚀 Publishing Batch 4 (Clusters E & F: Battery, Film & Firmware) for brand: ${brand.name}`);

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
          status: 'published',
          publishedAt: new Date(),
          brandId: brand.id,
          categoryId: article.categoryId,
          authorId: article.authorId,
          reviewerId: article.reviewerId,
          reviewedAt: new Date(),
        }
      });
      console.log(`✅ Published: "${created.title}"`);
    } catch (e: any) {
      console.log(`⚠️ Error for "${article.title}": ${e.message}`);
    }
  }
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
