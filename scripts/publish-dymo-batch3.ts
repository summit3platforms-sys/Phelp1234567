import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';
const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';
const maintenanceCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "DYMO LabelWriter 450 Turbo Setup & Not Printing Fix",
    slug: 'dymo-labelwriter-450-turbo-setup-not-printing',
    seoTitle: "DYMO LabelWriter 450 Turbo Setup & Not Printing Fix",
    metaDescription: "Learn how to set up the legendary DYMO LabelWriter 450 Turbo, install the DLS8 software, and fix common 'Not Printing' driver issues.",
    excerpt: "The DYMO 450 Turbo is an absolute workhorse, but because it is officially discontinued, setting it up on modern operating systems requires specific legacy drivers.",
    errorCode: null,
    tags: 'DYMO, LabelWriter 450, Turbo, Setup, Not Printing, DLS8',
    wordCount: 950,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: setupCategory,
    authorId: authors.alex,
    reviewerId: authors.elena,
    featuredSnippet: "To set up a DYMO LabelWriter 450 Turbo and fix not printing errors: 1) Do not use the newest DYMO Connect software, as it frequently drops connection to the older 450 models. 2) Go to the DYMO support site and download the legacy 'DYMO Label Software (DLS) v8.7.4'. 3) Install the software BEFORE plugging the printer's USB cable into your computer. 4) If the printer sits silently when you hit print, check the Windows Print Spooler and ensure the selected label size exactly matches the physical roll inside the 450 Turbo.",
    content: `<h2>The Legendary 450 Turbo</h2>
<p>The DYMO LabelWriter 450 Turbo is widely considered the most reliable label printer ever manufactured. However, because it has been discontinued and replaced by the 550 series, getting it to work on a brand new Windows 11 or macOS computer requires a specific setup sequence.</p>

<h2>Step 1: The Software Secret (Use DLS8)</h2>
<p>DYMO wants you to download their newest software, "DYMO Connect". While Connect technically supports the 450, it is incredibly buggy when paired with older hardware. The secret to a flawless 450 Turbo setup is using the legacy software.</p>
<ul>
    <li>Search Google for <strong>DYMO Label Software (DLS) v8.7.4</strong> for Windows, or v8.7.5 for Mac.</li>
    <li>Download and run the installer.</li>
    <li><strong>Crucial Step:</strong> Leave the printer's USB cable unplugged while the software installs. Only plug it in when the installer prompts you. This ensures Windows installs the DYMO driver, not a generic generic USB storage driver.</li>
</ul>

<h2>Step 2: Fixing the "Not Printing" Glitch</h2>
<p>If you have installed the software, the blue light on the front of the 450 is solid, but the printer refuses to print, check the following:</p>
<ol>
    <li><strong>Label Size Mismatch:</strong> The 450 does not have the smart RFID chips found in the 550. It has no idea what paper you put inside it. If you load 1" x 2" address labels, but your software template is set to print a 2" x 4" shipping label, the Windows spooler will silently crash and refuse to print. Ensure your template matches the physical roll.</li>
    <li><strong>Left-Justification:</strong> The optical sensor in the 450 is on the far left. If you put the label roll loosely on the spool, the labels will slide to the right, blinding the sensor. Push the roll hard against the left edge of the spool.</li>
</ol>`
  },
  {
    title: "DYMO LabelWriter 4XL & 5XL Setup & Driver Guide",
    slug: 'dymo-labelwriter-4xl-5xl-setup-driver-guide',
    seoTitle: "DYMO LabelWriter 4XL & 5XL Driver Download & Setup",
    metaDescription: "Setup guide for the wide-format DYMO 4XL and 5XL shipping label printers. Learn how to install drivers, fix print errors, and decide if you need to upgrade.",
    excerpt: "The 4XL and 5XL are designed for massive 4x6 shipping labels. Here is how to install the correct drivers and integrate them with Shopify and Amazon.",
    errorCode: null,
    tags: 'DYMO, 4XL, 5XL, Setup, Driver, Download, Shipping Labels, 450',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: setupCategory,
    authorId: authors.marcus,
    reviewerId: authors.david,
    featuredSnippet: "Setting up a DYMO 4XL or 5XL for shipping labels: If you have the older 4XL, download DYMO Label Software (DLS8) for maximum reliability, as you can use cheap third-party 4x6 labels. If you have the new 5XL, you MUST download DYMO Connect. The 5XL uses an RFID reader to verify the label roll; if you insert third-party labels without a DYMO RFID chip, the 5XL will refuse to print. In your browser (Shopify/Etsy), ensure the print size is set to exactly 4x6, and Scale is set to 100%.",
    content: `<h2>The Wide Format Workhorses</h2>
<p>While the standard LabelWriter 450 and 550 max out at 2.2 inches wide, the <strong>4XL and 5XL</strong> are wide-format (4-inch) printers designed specifically for USPS, FedEx, and UPS shipping labels.</p>

<h2>DYMO 4XL: The Legacy King</h2>
<p>If you own the 4XL, you own a highly sought-after machine. Because it was manufactured before DYMO implemented DRM (Digital Rights Management), you can buy massive rolls of third-party 4x6 labels on Amazon for pennies.</p>
<ul>
    <li><strong>Driver Download:</strong> Go to the DYMO support page and download DLS8 (DYMO Label Software v8.7.4). Avoid DYMO Connect if possible.</li>
    <li><strong>Not Printing Fix:</strong> If the 4XL feeds blank labels when printing from a browser, your PDF viewer is shrinking the label. When the print dialog opens, set the paper size to <strong>1744907 4 in x 6 in</strong> and ensure "Fit to Page" is unchecked.</li>
</ul>

<h2>DYMO 5XL: The Modern Replacement</h2>
<p>The 5XL is faster and offers LAN (Ethernet) networking, but it comes with a massive catch: <strong>RFID DRM</strong>.</p>
<ul>
    <li><strong>Software:</strong> You MUST use the DYMO Connect software. The 5XL is not compatible with DLS8.</li>
    <li><strong>The Label Lockout:</strong> The 5XL features a microchip reader inside the paper bay. Genuine DYMO 4x6 labels have a tiny RFID chip embedded in the cardboard core. If you insert a roll of cheap third-party labels, the 5XL will refuse to print and display a "Labels Not Detected" error on your screen. You have to factor the cost of official DYMO labels into your shipping margins.</li>
</ul>

<h2>DYMO 450 vs 4XL: Which to Buy?</h2>
<p>If you are deciding between a standard 450/550 and a 4XL/5XL, the decision is entirely based on your business model. If you print barcodes, address labels, or file folder stickers, buy the cheaper 450/550. If you print USPS/UPS shipping labels for an e-commerce store, you must buy the 4XL/5XL. A 450 physically cannot fit a standard 4x6 shipping label.</p>`
  },
  {
    title: "Fix DYMO LabelWriter 550 Not Printing & Power Issues",
    slug: 'dymo-labelwriter-550-not-printing-power-adapter',
    seoTitle: "Fix DYMO LabelWriter 550 Not Printing (RFID & Power Adapter)",
    metaDescription: "Is your DYMO 550 not printing, flashing a blue light, or completely dead? Learn how to fix RFID label lockouts and diagnose 24V power adapter failures.",
    excerpt: "The DYMO 550 is packed with new RFID technology. While this enables automatic label detection, it also introduces frustrating DRM lockouts and power issues.",
    errorCode: null,
    tags: 'DYMO, 550, Not Printing, Power Adapter, Blue Light, RFID',
    wordCount: 850,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: errorCategory,
    authorId: authors.elena,
    reviewerId: authors.alex,
    featuredSnippet: "To fix a DYMO 550 that is not printing: 1) If the blue light is flashing rapidly, the printer's RFID reader is rejecting your labels. The 550 series strictly requires genuine DYMO labels with an RFID chip in the cardboard core. Third-party labels will not work. 2) If the printer is completely dead (no blue light), check the power adapter. The 550 requires a specific 24V DC DYMO adapter. Using an older 450 power adapter (which is 24V but lower amperage) will cause the 550 to randomly shut off or fail to pull the paper.",
    content: `<h2>The 550 "Not Printing" RFID Lockout</h2>
<p>If you hit print on your computer and the DYMO 550 simply flashes its blue light and does nothing, you are almost certainly the victim of DYMO's new DRM (Digital Rights Management) system.</p>
<p>Unlike every previous generation of LabelWriter, the 550 series uses an RFID scanner located on the right side of the label spool. It looks for a microchip hidden inside the cardboard core of the label roll.</p>
<ul>
    <li><strong>The Symptom:</strong> The DYMO Connect software will display "Out of Paper" or "Unknown Label", even if the roll is completely full.</li>
    <li><strong>The Fix:</strong> You cannot bypass the RFID reader with tape or software hacks. You must remove your third-party labels and purchase genuine DYMO branded labels. Once the chip is read, the printer will instantly recognize the size and allow printing.</li>
</ul>

<h2>Power Adapter Failures (No Light / Dying during print)</h2>
<p>If the printer is completely dead, or if it turns on but instantly shuts off the moment the motor tries to pull a label, your power adapter is failing.</p>
<p>Because the 550 uses a high-draw ceramic thermal heater and a stepper motor simultaneously, it requires a very specific flow of electricity.</p>
<ol>
    <li>Check the brick on your power cable. It must output exactly <strong>24 Volts DC</strong>.</li>
    <li><strong>The Mix-Up:</strong> Do not use a power adapter from a laptop or a router just because the barrel plug fits. Furthermore, while the older DYMO 450 adapter is also 24V, it provides slightly less amperage than the 550 requires. If you use a 450 adapter on a 550, the printer will brown-out and reboot in the middle of a print job.</li>
    <li>If your 550 adapter is clicking, buzzing, or warm to the touch without the printer being on, the internal capacitors are blown and it must be replaced.</li>
</ol>`
  },
  {
    title: "DYMO 550 Turbo vs 450 Turbo: Should You Upgrade?",
    slug: 'dymo-550-turbo-vs-450-turbo-upgrade',
    seoTitle: "DYMO 550 Turbo vs 450 Turbo (Comparison & Warning)",
    metaDescription: "Comparing the new DYMO LabelWriter 550 Turbo against the classic 450 Turbo. Before you upgrade, read our warning about third-party label compatibility and RFID.",
    excerpt: "Upgrading from the legendary 450 Turbo to the shiny new 550 Turbo seems like a no-brainer—until you realize you have to throw away all your generic labels.",
    errorCode: null,
    tags: 'DYMO, 550 Turbo, 450 Turbo, Upgrade, Comparison, Review, RFID',
    wordCount: 1000,
    difficultyLevel: 'Beginner',
    timeToFix: 'N/A',
    categoryId: softwareCategory,
    authorId: authors.david,
    reviewerId: authors.marcus,
    featuredSnippet: "DYMO 550 Turbo vs 450 Turbo comparison: The new 550 Turbo features an Ethernet port for network printing, automatic label size recognition, and prints up to 90 labels per minute. However, the 550 Turbo uses RFID DRM, meaning you CANNOT use cheap third-party labels; you must buy expensive genuine DYMO labels. The older 450 Turbo prints 71 labels per minute, lacks a network port, but allows you to use any third-party labels you want. If you rely on cheap labels, do not upgrade to the 550.",
    content: `<h2>The LabelWriter Evolution</h2>
<p>For over a decade, the DYMO LabelWriter 450 Turbo was the default label printer for small businesses, medical offices, and schools. When DYMO discontinued it and released the 550 Turbo, many users rushed to upgrade. Unfortunately, many were met with a severe case of buyer's remorse.</p>

<h2>The 450 Turbo: The Legacy Champion</h2>
<p>The 450 Turbo is a simple, dumb, incredibly reliable machine.</p>
<ul>
    <li><strong>Speed:</strong> 71 labels per minute.</li>
    <li><strong>Software:</strong> Uses the rock-solid DLS8 software (though it also supports DYMO Connect).</li>
    <li><strong>The Advantage:</strong> It uses a simple optical sensor. This means you can buy massive, cheap rolls of unbranded generic labels on Amazon. This keeps your printing costs incredibly low.</li>
    <li><strong>The Downside:</strong> It only has a USB port. You cannot plug it directly into a network router.</li>
</ul>

<h2>The 550 Turbo: The Networked DRM Machine</h2>
<p>The 550 Turbo is an aesthetic and technological upgrade, but it fundamentally changes the cost of ownership.</p>
<ul>
    <li><strong>Speed:</strong> 90 labels per minute (a noticeable improvement).</li>
    <li><strong>Networking:</strong> Features a built-in Ethernet (LAN) port. You can plug it directly into your network switch, allowing any computer in the office to print to it without leaving a "host" PC turned on.</li>
    <li><strong>Automatic Recognition:</strong> The printer reads an RFID chip in the label core to tell your software exactly what size label is currently loaded, preventing formatting errors.</li>
    <li><strong>The Massive Disadvantage (DRM):</strong> Because of that RFID chip, the 550 Turbo <strong>will absolutely not print on third-party labels.</strong> If you try, it locks up. Genuine DYMO labels can cost up to 3x more than generic labels.</li>
</ul>

<h2>The Verdict</h2>
<p>If you absolutely need to network the printer across an entire office, the 550 Turbo is an excellent piece of hardware. However, if you run a small business that prints hundreds of labels a day and relies on cheap generic rolls to maintain profit margins, <strong>do not upgrade.</strong> Keep your 450 Turbo running for as long as humanly possible.</p>`
  },
  {
    title: "DYMO Discontinued Models: 400 Turbo, SE450 & Wireless",
    slug: 'dymo-discontinued-400-turbo-se450-wireless-setup',
    seoTitle: "DYMO 400 Turbo, SE450 & Wireless Setup (Discontinued Fixes)",
    metaDescription: "Troubleshooting guide for legacy, discontinued DYMO printers including the 400 Turbo, the serial-port SE450, and the DYMO LabelWriter Wireless.",
    excerpt: "DYMO has a long graveyard of discontinued printers. If you found a 400 Turbo, an SE450, or a LabelWriter Wireless in a closet, here is how to make them work today.",
    errorCode: null,
    tags: 'DYMO, 400 Turbo, SE450, Wireless, Discontinued, Setup, Wi-Fi',
    wordCount: 950,
    difficultyLevel: 'Advanced',
    timeToFix: '15 minutes',
    categoryId: setupCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "To set up discontinued DYMO models on Windows 11: 1) For the DYMO 400 Turbo, do not install DYMO Connect. You must download the legacy 'DYMO Label Software v8.7.4'. It will still work on Windows 11 if installed in compatibility mode. 2) For the DYMO SE450, this is a specialized serial-port printer. You cannot use a standard USB cable; you must use an RS-232 serial cable and configure the baud rate (usually 9600 or 115200) in your host software. 3) For the DYMO LabelWriter Wireless, connect to its temporary Wi-Fi network first to configure it for your main office router.",
    content: `<h2>Resurrecting the DYMO 400 Turbo</h2>
<p>The DYMO LabelWriter 400 Turbo was released in the Windows XP era. Astonishingly, the hardware rarely fails. If you try to plug a 400 Turbo into a Windows 11 PC, Windows will have no idea what it is.</p>
<p>The modern DYMO Connect software will not recognize the 400 series. You must go to DYMO's support archive and download <strong>DLS v8.7.4</strong>. Run the installer. If it fails, right-click the installer, select Properties > Compatibility, and run it in Windows 8 compatibility mode. Once installed, the 400 Turbo will print just as well today as it did 20 years ago.</p>

<h2>The Obscure DYMO SE450</h2>
<p>The LabelWriter SE450 looks like a standard 450, but it is an entirely different beast on the inside. The "SE" stands for Serial Edition.</p>
<p>It was built specifically for legacy industrial equipment, medical devices, and scales that output raw ASCII text data over an RS-232 serial connection. It has a built-in font engine, meaning it does not need a Windows driver to generate text.</p>
<ul>
    <li>You must connect it using an RS-232 serial cable.</li>
    <li>By default, the SE450 communicates at a baud rate of <strong>115200 bps</strong> (or 9600 on older firmware). You must match this baud rate on your host equipment, or the printer will print lines of gibberish symbols.</li>
</ul>

<h2>The DYMO LabelWriter Wireless</h2>
<p>Before the 550 series introduced Ethernet, DYMO released a standalone Wi-Fi model simply called the "LabelWriter Wireless." Setting it up requires a specific sequence.</p>
<ol>
    <li>Plug the printer into power (do not use USB).</li>
    <li>Wait 30 seconds. The printer broadcasts its own temporary Wi-Fi network (SSID: Dymo_LW_Wireless).</li>
    <li>Use your laptop or phone to connect to this Wi-Fi network.</li>
    <li>Open a web browser and go to the IP address printed on the bottom of the machine (usually 192.168.1.1).</li>
    <li>Log into the web portal. Here, you will select your main office Wi-Fi network and enter your password.</li>
    <li>The printer will reboot and connect to your office router, making it visible to any PC running DYMO Connect.</li>
</ol>`
  },
  {
    title: "Fix DYMO LetraTag Not Printing (Tape Jam & Battery Issues)",
    slug: 'dymo-letratag-not-printing-tape-jam',
    seoTitle: "Fix DYMO LetraTag Not Printing & Tape Jams",
    metaDescription: "Is your DYMO LetraTag handheld label maker not printing, fading out, or jamming the tape? Learn how to clean the thermal head and fix battery power drops.",
    excerpt: "The handheld LetraTag is perfect for home organization, but weak batteries and sticky tape residue will quickly cause it to stop printing and jam.",
    errorCode: null,
    tags: 'DYMO, LetraTag, Not Printing, Tape Jam, Battery, Faint Print',
    wordCount: 800,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: maintenanceCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "To fix a DYMO LetraTag that is not printing or feeding faintly: 1) Replace all 4 AA batteries with brand new, high-quality Alkaline batteries (like Duracell or Energizer). Do not use rechargeable batteries; they only output 1.2V instead of 1.5V, which is not enough power to heat the thermal print head. 2) If the tape is jamming, open the back cover and remove the cassette. 3) Take a Q-tip dipped in rubbing alcohol and gently wipe the small green ceramic print head and the black rubber roller to remove sticky adhesive residue.",
    content: `<h2>The Power Problem (Faint or No Print)</h2>
<p>Unlike the desktop LabelWriters that plug into the wall, the handheld DYMO LetraTag runs on 4 AA batteries. Thermal printing requires a massive burst of heat to burn the text onto the plastic tape. This drains batteries incredibly fast.</p>
<p>If your LetraTag's screen turns on, but the printed tape comes out faint, blank, or the machine shuts off the moment you press "Print", <strong>you have a voltage drop</strong>.</p>
<ul>
    <li>Remove all old batteries.</li>
    <li>Insert 4 brand-new, premium Alkaline batteries.</li>
    <li><strong>Warning on Rechargeables:</strong> Do not use rechargeable NiMH batteries (like Eneloops). Standard AA batteries output 1.5 Volts (6 Volts total). Rechargeables only output 1.2 Volts (4.8 Volts total). The LetraTag will turn on, but it simply does not have enough voltage to heat the thermal head, resulting in blank tape.</li>
</ul>

<h2>Fixing Tape Jams</h2>
<p>If the motor whirs but the tape doesn't come out (and instead wraps around the inside of the machine), the rubber feed roller is coated in sticky adhesive.</p>
<ol>
    <li>Open the back cover and pull the plastic tape cassette out.</li>
    <li>Use a pair of tweezers to carefully pull out the jammed, crumpled tape. Do not yank it violently, or you will snap the plastic gears.</li>
    <li>Look closely at the black rubber roller. You will likely see white sticky residue on it.</li>
    <li>Dip a cotton swab in rubbing alcohol and scrub the rubber roller while rotating it.</li>
    <li>Also wipe the small, green, ceramic print head located directly opposite the roller.</li>
    <li>Before putting the cassette back in, manually pull a quarter-inch of tape out of the cassette slit so the roller can grab it immediately.</li>
</ol>`
  }
];

async function main() {
  const brand = await prisma.brand.findUnique({ where: { slug: 'dymo' } });
  if (!brand) throw new Error('DYMO brand not found. Run setup script first.');

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
          brandId: brand.id,
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
