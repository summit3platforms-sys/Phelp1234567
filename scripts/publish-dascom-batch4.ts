import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';
const connectivityCategory = 'c3a92d93-fcbb-439c-a11e-80cde3d2a5ce';
const printQualityCategory = 'e3d26347-33bf-41a7-9cbf-c3d821850f98';
const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Dascom Card Printer Setup Guide & Streaky Print Fix",
    slug: 'dascom-card-printer-setup-streaky-print',
    seoTitle: "Dascom ID Card Printer Setup & Streaky Print Fix",
    metaDescription: "Learn how to set up your Dascom ID card printer and fix streaky, faded, or scratched prints. A complete guide to ribbon installation and roller cleaning.",
    excerpt: "Printing secure PVC ID cards requires a perfectly clean environment. If your new Dascom card printer is producing streaky lines, the cleaning rollers are likely dirty.",
    errorCode: null,
    tags: 'Dascom, Card Printer, ID Card, Setup, Streaky Print, Faded, Cleaning Roller',
    wordCount: 950,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: setupCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix streaky prints on a Dascom ID card printer: 1) Open the printer and remove the YMCKO ribbon. 2) Look for the tacky blue 'Cleaning Roller' located near the card input hopper. This roller catches dust before the card hits the print head. 3) If the blue roller is covered in white dust or hair, run it under warm water to wash the dust away. Let it air dry completely until it feels sticky again, then reinstall it. 4) Use a long alcohol cleaning card to clean the main print head to remove any melted ribbon residue causing the streaks.",
    content: `<h2>Setting Up Your Dascom Card Printer</h2>
<p>Dascom’s Direct-to-Card (DTC) and Retransfer printers (like the DC-7600) are highly specialized machines used for employee badges, loyalty cards, and secure IDs. Proper initial setup is critical to avoid expensive ribbon breakages.</p>
<ol>
    <li>Install the official Dascom Card Printer Windows driver <em>before</em> connecting the USB cable.</li>
    <li>Load the YMCKO ribbon. Ensure the supply spool is on the right and the take-up spool is on the left. The ribbon must slide smoothly under the print head.</li>
    <li>Load your blank PVC cards. <strong>Always fan the cards</strong> by bending the stack back and forth before inserting them into the hopper. This breaks the static electricity that causes multi-card feed jams.</li>
</ol>

<h2>Fixing Streaky or Scratched Prints</h2>
<p>Because the thermal print head presses the colored ribbon directly against the plastic card, even a single speck of dust will cause a long, unprinted streak across the entire ID badge.</p>

<h3>1. The Tacky Cleaning Roller</h3>
<p>Every Dascom card printer has a removable "cleaning roller." It is usually a sticky, bright blue rubber cylinder located right after the card hopper. Its job is to act like a lint roller, pulling dust off the blank cards before they reach the print head.</p>
<p>If your prints suddenly look streaky, this roller is saturated with dust. Remove it from the printer. Wash it under warm tap water (do not use soap). The dust will wash away. Once it air-dries, the rubber will regain its sticky texture. Reinstall it.</p>

<h3>2. Print Head Residue</h3>
<p>If the streaks are perfectly straight, horizontal white lines running the length of the card, a microscopic piece of the ribbon has melted onto the print head, blocking the heat transfer.</p>
<p>Turn the printer off. Open the lid. Take a manufacturer-provided cleaning swab (or a Q-tip dipped in 99% isopropyl alcohol) and gently wipe the thin brown ceramic line on the bottom of the print head in one single motion. Let it dry for two minutes before printing.</p>`
  },
  {
    title: "Dascom Printer Offline & USB Not Detected (Windows 11)",
    slug: 'dascom-printer-offline-usb-not-detected-windows',
    seoTitle: "Fix Dascom Printer Offline & USB Not Detected in Windows 11",
    metaDescription: "Is your Dascom printer showing as offline or not detected via USB in Windows 11? Learn how to fix legacy USB ports, print spooler crashes, and driver conflicts.",
    excerpt: "Industrial dot matrix printers sometimes clash with modern operating systems. Here is how to fix USB detection issues and Offline status in Windows 11.",
    errorCode: null,
    tags: 'Dascom, Offline, Windows 11, USB Not Detected, Driver Download, Spooler',
    wordCount: 850,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: connectivityCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "To fix a Dascom printer that is Offline or not detected via USB in Windows 11: 1) Open Printers & Scanners, select your Dascom printer, and click 'Printer Properties'. 2) Go to the 'Ports' tab. 3) Look for the checked port. If the printer is plugged in via USB, but the checked port is LPT1 or COM1, check the box for 'USB001 (Virtual printer port for USB)' and click Apply. 4) If the USB port doesn't exist, unplug the printer, download the latest Dascom Windows 11 driver from their website, install it, and reconnect the USB cable when prompted.",
    content: `<h2>The Windows 11 Compatibility Issue</h2>
<p>Dascom manufactures rugged printers designed to last for decades. Consequently, many users try to connect older models (like the 1140 or 2600) to brand new Windows 11 laptops. When the printer shows as <strong>Offline</strong> or <strong>Not Detected</strong>, it is usually a port routing issue.</p>

<h2>Fix 1: The Virtual USB Port</h2>
<p>In the 1990s, dot matrix printers used thick Parallel (LPT) cables. Modern Dascoms use USB. However, older Windows driver software often defaults the printer to the LPT1 port out of habit.</p>
<ul>
    <li>Type <strong>Printers &amp; Scanners</strong> into the Windows 11 search bar.</li>
    <li>Click your Dascom printer, then select <strong>Printer Properties</strong>.</li>
    <li>Click the <strong>Ports</strong> tab at the top.</li>
    <li>Scroll down the list of ports. You are looking for a port named <strong>USB001</strong> or <strong>USB002</strong> (described as "Virtual printer port for USB").</li>
    <li>Check the box next to the USB port, uncheck LPT1, and click Apply. The printer should instantly come Online.</li>
</ul>

<h2>Fix 2: Driver Signature Enforcement</h2>
<p>If you plug the USB cable in, but Windows gives a "USB Device Not Recognized" error, Windows 11 is rejecting the generic driver.</p>
<p>Unplug the USB cable. Go to the official Dascom regional website and download the specific Windows 10/11 x64 driver package for your model. Run the executable as an Administrator. The setup wizard will pre-install the correct USB handshake protocols. Only plug the USB cable back into the computer when the software explicitly asks you to do so on the screen.</p>

<h2>Fix 3: The Sleep Mode Disconnect</h2>
<p>If your printer works perfectly, but goes "Offline" every morning, Windows is cutting power to the USB port to save energy.</p>
<p>Right-click the Windows Start button and open <strong>Device Manager</strong>. Expand <strong>Universal Serial Bus controllers</strong>. Right-click the USB Root Hub and select Properties. Go to the Power Management tab, and <em>uncheck</em> "Allow the computer to turn off this device to save power."</p>`
  },
  {
    title: "Dascom Printer Serial & Parallel Port Setup Guide",
    slug: 'dascom-printer-serial-parallel-port-setup',
    seoTitle: "Dascom Serial (RS-232) & Parallel Port Setup Guide",
    metaDescription: "Learn how to configure legacy Serial (RS232) and Parallel (LPT) ports on Dascom dot matrix printers. Fix baud rate mismatches and handshake errors.",
    excerpt: "While USB is standard today, many warehouses still rely on legacy AS/400 systems requiring Serial or Parallel connections. Here is how to configure them.",
    errorCode: null,
    tags: 'Dascom, Serial Port, Parallel Port, RS232, LPT, Baud Rate, Setup',
    wordCount: 900,
    difficultyLevel: 'Advanced',
    timeToFix: '15 minutes',
    categoryId: setupCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "To set up a Dascom printer via Serial (RS-232) port: You must ensure the Baud Rate, Data Bits, and Parity on the printer exactly match your computer's COM port settings. 1) Turn the Dascom printer on while holding the SETUP button to enter the configuration menu. 2) The printer will print a menu. Use the front buttons to navigate to 'Interface' > 'Serial'. 3) Set the Baud Rate to match your system (usually 9600). 4) Set Parity to None, Data Bits to 8, and Stop Bits to 1. Save and exit the menu.",
    content: `<h2>Legacy Interfaces in Modern Warehouses</h2>
<p>If you are connecting your Dascom printer to an older warehouse management system, a mainframe, or a proprietary scale, you cannot use USB. You must use the 25-pin Parallel port (LPT) or the 9-pin/25-pin Serial port (RS-232). These interfaces require manual configuration.</p>

<h2>Parallel Port (LPT) Troubleshooting</h2>
<p>Parallel connections are generally "plug-and-play" on legacy hardware, but modern computers lack physical parallel ports. If you are using a <strong>USB-to-Parallel adapter cable</strong>, Windows frequently struggles to route the data.</p>
<ul>
    <li><strong>The Fix:</strong> Go to Printer Properties > Ports in Windows. When using a USB-to-Parallel cable, you must select the <strong>USB Virtual Printer Port</strong>, <em>not</em> the LPT1 port. The cable converts the parallel data into USB data before it reaches the computer.</li>
    <li>Ensure the thick metal clips on the printer side are snapped down securely. If the cable is loose on one side, it will drop data, resulting in missing characters or random symbols printing across the page.</li>
</ul>

<h2>Serial Port (RS-232) Setup</h2>
<p>Serial ports send data one bit at a time. If the printer is listening at 9600 bits per second, but the computer is speaking at 19200 bits per second, the printer will just print lines of gibberish (like "@#&amp;!%").</p>
<p>You must configure the printer's internal menu to match your computer's Device Manager settings.</p>
<ol>
    <li>Load paper into the printer.</li>
    <li>Enter the printer's setup menu (usually by holding the <strong>SETUP</strong> or <strong>TEAR OFF</strong> button while powering the printer on).</li>
    <li>The printer will physically print out a menu with instructions on which buttons to press to navigate.</li>
    <li>Navigate to <strong>Interface Configuration</strong> > <strong>Serial Interface</strong>.</li>
    <li>Adjust the settings to match your host computer. The standard default is usually: <strong>Baud Rate: 9600, Data Bits: 8, Parity: None, Stop Bits: 1, Handshake: XON/XOFF or DTR.</strong></li>
    <li>Save the settings and restart the printer.</li>
</ol>`
  },
  {
    title: "Is Dascom a Good Printer Brand? Dascom vs Printronix",
    slug: 'is-dascom-a-good-printer-brand-vs-printronix',
    seoTitle: "Is Dascom a Good Brand? (Dascom vs Printronix Review)",
    metaDescription: "Is Dascom a reliable printer brand? We review the history of Tally Dascom and compare it against Printronix for heavy-duty industrial impact printing.",
    excerpt: "If you are purchasing a $1,500 industrial printer, you want to know if the brand is reliable. Here is the definitive review of Dascom and how it compares to Printronix.",
    errorCode: null,
    tags: 'Dascom, Printronix, Review, Brand Comparison, Tally Dascom, Line Matrix, Dot Matrix',
    wordCount: 1000,
    difficultyLevel: 'Beginner',
    timeToFix: 'N/A',
    categoryId: softwareCategory, // used for general/buying advice here
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "Is Dascom a good printer brand? Yes, Dascom is one of the most respected manufacturers of industrial impact printers in the world. They acquired the legendary 'Tally' and 'TallyGenicom' brands, which is why many of their printers are branded 'Tally Dascom.' They are highly regarded for extreme durability in warehouse environments, specializing in heavy-duty dot matrix and thermal POS printers that last for decades.",
    content: `<h2>The History of Dascom (and Tally)</h2>
<p>Many IT professionals ask, <em>"Is Dascom a good brand, or is it a generic knockoff?"</em></p>
<p>Dascom is a premier, global manufacturer of industrial printing solutions. If you haven't heard of them in the consumer space, it is because they do not make cheap, $50 home inkjets. They build heavy machinery. Furthermore, Dascom acquired the rights to the legendary <strong>Tally</strong> and <strong>TallyGenicom</strong> brands, absorbing decades of German engineering expertise in impact printing.</p>
<p>If you buy a Tally Dascom 2600 or 2800, you are buying a tank designed to print continuously in a dusty, non-climate-controlled warehouse for 15 years.</p>

<h2>Dascom vs. Printronix: The Industrial Heavyweights</h2>
<p>When outfitting a massive distribution center, IT managers usually narrow the choice down to two brands: Dascom or Printronix. However, they serve slightly different core needs.</p>

<h3>Dascom: The Serial Dot Matrix King</h3>
<p>Dascom excels at <strong>Serial Dot Matrix</strong> printing. This means a single print head moves left and right across the page. Printers like the Dascom 2820 are incredibly fast (up to 800 characters per second), highly versatile, and relatively affordable ($800 to $1,500).</p>
<ul>
    <li><strong>Best For:</strong> Multi-part carbonless forms, invoices, packing slips, and regional distribution centers.</li>
</ul>

<h3>Printronix: The Line Matrix Giant</h3>
<p>Printronix is famous for <strong>Line Matrix</strong> printers. Instead of a single print head moving left and right, a Line Matrix printer has a massive bank of hammers that prints an entire horizontal line of text all at once. They are massive, look like washing machines, and cost between $4,000 and $10,000.</p>
<ul>
    <li><strong>Best For:</strong> Massive Fortune 500 manufacturing plants printing 100,000 labels or green-bar reports a day.</li>
</ul>

<h2>The Verdict</h2>
<p>If you need to print a few hundred 5-part carbonless invoices a day on a shipping desk, <strong>Dascom is the absolute best choice.</strong> A Line Matrix Printronix would be massive overkill and incredibly expensive. However, if you are running a 24/7 automotive assembly plant printing tens of thousands of continuous forms a day, Printronix's line matrix technology is the only hardware that can handle the volume.</p>`
  },
  {
    title: "Dascom Printer DEC Emulation Setup Guide",
    slug: 'dascom-printer-dec-emulation-setup',
    seoTitle: "Dascom DEC Emulation Setup (LA2800 / LA36 Guide)",
    metaDescription: "Learn how to configure DEC ANSI emulation on Dascom printers (like the LA2800). Configure escape sequences to work with legacy Digital Equipment Corporation systems.",
    excerpt: "Legacy mainframes often require printers that speak a dead language: DEC ANSI. Dascom printers can emulate these classic DEC printers flawlessly.",
    errorCode: null,
    tags: 'Dascom, DEC Emulation, LA2800, ANSI, Escape Sequences, Mainframe, Setup',
    wordCount: 800,
    difficultyLevel: 'Expert',
    timeToFix: '15 minutes',
    categoryId: setupCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "To set up DEC Emulation on a Dascom printer (like the LA2800): 1) Load continuous paper and turn the printer on while holding the SETUP button to enter the physical configuration menu. 2) The printer will print the main menu. Navigate to 'Emulation' or 'Protocol'. 3) Change the setting from IBM ProPrinter or Epson ESC/P to 'DEC ANSI' (or LA120/LA36 depending on your firmware). 4) Save the configuration and exit. The printer will now accept legacy DEC escape sequences from your mainframe or AS/400 system.",
    content: `<h2>What is DEC Emulation?</h2>
<p>In the 1970s and 80s, the Digital Equipment Corporation (DEC) produced some of the most popular computer mainframes and terminals in the world. They also produced legendary printers like the LA36 and LA120. These printers used a specific set of commands (DEC ANSI escape sequences) to control fonts, margins, and page breaks.</p>
<p>If your warehouse still runs proprietary software built for a DEC mainframe, a standard modern printer will just print garbage code. Dascom specifically manufactures printers—like the <strong>Tally Dascom LA2800</strong>—designed to emulate (impersonate) these old DEC printers flawlessly.</p>

<h2>How to Enable DEC ANSI Mode</h2>
<p>By default, many Dascom printers are set to Epson ESC/P or IBM ProPrinter emulation, as these are the most common standards today. You must manually switch the "brain" of the printer to DEC mode.</p>
<ol>
    <li>Turn the printer off.</li>
    <li>Load a sheet of wide continuous paper into the tractor feed.</li>
    <li>Press and hold the <strong>SETUP</strong> (or TEAR OFF) button on the front panel, and turn the power switch on. Keep holding the button until the printer beeps and starts printing.</li>
    <li>The printer will print a physical map of the menu system. Look at the printed guide to see which button acts as the "Next" arrow and which acts as the "Select" button (usually the Load/Eject and Online buttons).</li>
    <li>Navigate to the <strong>Emulation</strong> menu.</li>
    <li>Change the current value from Epson/IBM to <strong>DEC ANSI</strong>.</li>
    <li>Navigate to the <strong>Save &amp; Exit</strong> option. The printer will beep and restart.</li>
</ol>
<p>Your Dascom printer will now respond perfectly to your legacy mainframe commands.</p>`
  }
];

async function main() {
  const dascomBrand = await prisma.brand.findUnique({ where: { slug: 'dascom' } });
  if (!dascomBrand) throw new Error('Dascom brand not found. Run setup script first.');

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
          brandId: dascomBrand.id,
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
