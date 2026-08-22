import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
const maintenanceCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';
const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';
const connectivityCategory = 'c3a92d93-fcbb-439c-a11e-80cde3d2a5ce';
const printQualityCategory = 'e3d26347-33bf-41a7-9cbf-c3d821850f98';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Dascom Thermal Receipt Printer Not Cutting Paper",
    slug: 'dascom-thermal-printer-not-cutting-paper-cutter-jam',
    seoTitle: "Fix Dascom Thermal Receipt Printer Not Cutting Paper",
    metaDescription: "Is your Dascom thermal receipt printer failing to cut paper, or is the auto-cutter jammed? Learn how to clear paper jams and manually reset the cutter blade.",
    excerpt: "The auto-cutter on Dascom thermal printers is essential for fast retail checkouts. When it gets jammed or stops firing, your POS system grinds to a halt.",
    errorCode: null,
    tags: 'Dascom, Thermal Printer, Receipt, Not Cutting, Cutter Jam, POS',
    wordCount: 850,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: maintenanceCategory,
    authorId: authors.alex,
    reviewerId: authors.elena,
    featuredSnippet: "To fix a jammed auto-cutter on a Dascom thermal receipt printer: 1) Turn the printer off. 2) If the printer cover will not open because the cutter blade is locked across the paper path, do not force it. 3) Look for a small plastic panel on the front or side of the printer (the cutter cover). 4) Remove the panel to expose a small manual gear wheel. 5) Turn this gear wheel manually to retract the stuck V-shaped blade. Once retracted, the top cover will open, allowing you to clear the paper jam.",
    content: `<h2>Understanding Thermal Auto-Cutters</h2>
<p>Dascom thermal POS printers feature an integrated auto-cutter. After printing a receipt, a small motor drives a V-shaped or straight guillotine blade across the paper, leaving a tiny uncut sliver (a partial cut) so the receipt doesn't fall on the floor.</p>

<h2>Fix 1: The Cutter Jam (Lid Won't Open)</h2>
<p>If the printer suddenly stops, flashes a red error light, and you cannot pull the top lid open, <strong>the cutter blade is deployed and stuck</strong>.</p>
<p>When the blade deploys, it locks the lid shut. If a crumpled receipt got caught in the blade, the motor cannot pull the blade back. If you try to pry the lid open with a screwdriver, you will permanently destroy the printer.</p>
<ol>
    <li>Turn the power switch off.</li>
    <li>Look at the front face of the printer (below the paper exit slot). There is usually a small, removable plastic panel. Pop it off with your fingernail.</li>
    <li>Behind the panel, you will see a small white or metal gear.</li>
    <li>Turn this gear with your thumb (or a small Phillips screwdriver if it has a slot). As you turn it, look closely at the paper slot. You will see the metal blade slowly retracting back into its housing.</li>
    <li>Once the blade is fully retracted, press the main release button. The lid will easily pop open.</li>
    <li>Remove the crumpled paper dust and close the lid.</li>
</ol>

<h2>Fix 2: Software Cut Commands</h2>
<p>If the printer prints the receipt perfectly and the lid opens easily, but it just <em>won't cut</em>, your POS software is not sending the cut command.</p>
<p>Dascom printers use standard ESC/POS command languages. In your Point of Sale software (Square, Toast, Vend, etc.), go to the Hardware/Printer settings. Look for a setting called "Cut Paper at End of Receipt" or "Send Cut Command." If you are using the Windows driver, go to Printer Properties > Device Settings, and ensure "Cash Drawer/Cutter" is set to "Cut at End of Document."</p>`
  },
  {
    title: "Dascom POS Printer Offline & Driver Setup (ESC/POS Network)",
    slug: 'dascom-pos-printer-offline-esc-pos-driver',
    seoTitle: "Fix Dascom POS Printer Offline (Driver & Network Setup)",
    metaDescription: "Is your Dascom POS receipt printer showing as offline? Learn how to configure ESC/POS drivers, set static IP addresses, and fix Windows connection drops.",
    excerpt: "POS printers must be perfectly reliable. When a Dascom thermal printer goes offline, you need to troubleshoot the ESC/POS driver and the network configuration.",
    errorCode: null,
    tags: 'Dascom, POS Printer, Offline, Driver, ESC/POS, Network, Setup',
    wordCount: 950,
    difficultyLevel: 'Advanced',
    timeToFix: '15 minutes',
    categoryId: connectivityCategory,
    authorId: authors.david,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix a Dascom POS printer showing Offline in Windows: 1) Go to Printers & Scanners, click your Dascom printer, and select Printer Properties. 2) Go to the Ports tab. 3) If you are using a USB connection, ensure the port selected is 'USB001' (Virtual printer port for USB). If it got switched to LPT1 or COM1, it will show offline. 4) If connected via Ethernet (LAN), click Configure Port and ensure 'SNMP Status Enable' is UNCHECKED, as this Windows feature frequently misreports POS printers as offline.",
    content: `<h2>The "Offline" Driver Problem</h2>
<p>Dascom POS thermal printers (and their Tally counterparts) are heavily reliant on the <strong>ESC/POS</strong> command protocol. If your iPad or Windows POS terminal says the printer is offline, there is a breakdown in how the commands are being routed.</p>

<h2>Fix 1: The USB Virtual Port (Windows)</h2>
<p>Unlike standard office printers, thermal receipt printers don't always use standard Windows spoolers. They often use Virtual COM ports.</p>
<ul>
    <li>If you unplugged the Dascom printer and plugged it into a different USB port on your computer, Windows may have created a new port (USB002 instead of USB001), leaving your POS software trying to send data to an empty port.</li>
    <li>Open Windows <strong>Printers &amp; Scanners</strong> > <strong>Printer Properties</strong> > <strong>Ports</strong>.</li>
    <li>Check the list of ports. Ensure the box checked is a <strong>USB Virtual Printer Port</strong>. If it is checked on LPT1, COM1, or FILE, the printer will immediately show as offline.</li>
</ul>

<h2>Fix 2: Ethernet IP Address Mismatch</h2>
<p>If you are using a LAN (Ethernet) connection to run a kitchen printer from a front-of-house iPad:</p>
<ol>
    <li>Turn the printer off. Hold down the <strong>FEED</strong> button on the front, and turn the power switch back on. Keep holding FEED for 3 seconds.</li>
    <li>The printer will print a long <strong>Self-Test Configuration Page</strong>.</li>
    <li>Look at the bottom of the page for the <strong>IP Address</strong> (e.g., 192.168.1.50).</li>
    <li>Compare this IP address to the one programmed into your POS software. If your router rebooted and assigned the printer a new IP address, the POS software is talking to a dead end.</li>
    <li><strong>Permanent Fix:</strong> You must log into your Wi-Fi router and set a <strong>Static IP Address</strong> (DHCP Reservation) using the MAC address printed on that same self-test page. This ensures the IP never changes.</li>
</ol>

<h2>Fix 3: Generic Text-Only Drivers</h2>
<p>If the official Dascom driver is glitching and freezing, you can often bypass it entirely. In Windows, install a new printer, select "Generic", and choose <strong>"Generic / Text Only"</strong>. Since thermal printers natively understand raw text, this generic driver is often much more stable than heavy manufacturer drivers, and rarely goes offline.</p>`
  },
  {
    title: "Dascom Thermal Printer Paper Feed Error (Red Light Blinking)",
    slug: 'dascom-thermal-printer-paper-feed-error',
    seoTitle: "Fix Dascom Thermal Printer Paper Feed Error (Red Light)",
    metaDescription: "Is your Dascom thermal printer flashing a red error light and refusing to feed paper? Learn how to fix sensor errors, wrong paper types, and platen roller issues.",
    excerpt: "A blinking red light on a Dascom thermal receipt printer usually points to a paper feed error. Here is how to diagnose the sensors and the paper roll.",
    errorCode: null,
    tags: 'Dascom, Thermal Printer, Paper Feed, Red Light, Blinking, Error',
    wordCount: 800,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: errorCategory,
    authorId: authors.elena,
    reviewerId: authors.alex,
    featuredSnippet: "To fix a red blinking light (Paper Feed Error) on a Dascom thermal printer: 1) Ensure you are using Thermal Paper, not regular bond paper. Scratch the paper with your fingernail; it should leave a black mark. 2) Ensure the paper is loaded correctly: the paper must feed from the BOTTOM of the roll, not the top. 3) Open the lid and wipe the small black optical sensor in the paper well with a dry Q-tip to remove paper dust. 4) Close the lid firmly until it clicks on both sides.",
    content: `<h2>Decoding the Blinking Red Light</h2>
<p>On Dascom POS printers, the green light indicates Power/Ready. If the red <strong>ERROR</strong> or <strong>PAPER</strong> light is blinking, the internal optical sensors have detected a fault in the paper path.</p>

<h2>Fix 1: The Backwards Roll Mistake</h2>
<p>Thermal printers do not use ink. They use a heated print head that presses against chemically treated paper. However, <strong>only one side of the paper is treated.</strong></p>
<p>If you put the roll in backwards, the printer will go through the motions of printing, but the paper will come out completely blank. Furthermore, the paper-out sensor might misread the shiny side of the paper and throw a red light error.</p>
<p><strong>The Rule:</strong> The paper must feed from the <em>underneath</em> (bottom) of the roll toward the front of the printer, not over the top.</p>

<h2>Fix 2: Sensor Dust Blindness</h2>
<p>There is a tiny optical sensor sitting at the bottom of the plastic well where the paper roll rests. This sensor looks for the physical presence of paper. When the roll runs out, light bounces differently, and the printer stops.</p>
<p>Over thousands of receipts, white chalky paper dust collects at the bottom of this well. If a clump of dust covers the sensor, the printer thinks it is out of paper, even with a brand new roll installed.</p>
<ul>
    <li>Turn the printer off and remove the paper roll.</li>
    <li>Take a can of compressed air and blow out the paper well, focusing on any small glass or plastic lenses at the bottom.</li>
    <li>Wipe the sensor with a dry cotton swab.</li>
</ul>

<h2>Fix 3: Unlatched Platen Roller</h2>
<p>The thick black rubber roller that pulls the paper is actually mounted to the top lid, while the print head is mounted to the base.</p>
<p>If you close the lid, but only press down on one side, only one side of the latch clicks. The printer's micro-switch will detect that the lid is ajar, instantly flashing a red error light and halting all printing. Push down firmly on the center of the lid (or on both corners simultaneously) until you hear a sharp, solid "click."</p>`
  },
  {
    title: "Dascom POS Printer Cash Drawer Not Opening",
    slug: 'dascom-pos-printer-cash-drawer-not-opening',
    seoTitle: "Fix Dascom POS Printer Cash Drawer Not Opening (RJ11 Fix)",
    metaDescription: "Is your POS cash drawer not popping open when the Dascom printer prints a receipt? Learn how to troubleshoot RJ11/RJ12 cables and configure the Kick Code.",
    excerpt: "In a retail environment, the receipt printer acts as the brain for the cash drawer. If the drawer won't open, the communication between the two has failed.",
    errorCode: null,
    tags: 'Dascom, POS, Cash Drawer, Not Opening, Kick Code, RJ11, Software',
    wordCount: 900,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: connectivityCategory,
    authorId: authors.marcus,
    reviewerId: authors.david,
    featuredSnippet: "To fix a cash drawer not opening with your Dascom POS printer: 1) Verify the physical connection. The cash drawer must be connected to the DK (Drawer Kick) port on the back of the Dascom printer using an RJ11/RJ12 cable (looks like a phone cord). 2) In Windows, go to Printers & Scanners > Dascom Printer > Printer Properties > Device Settings. 3) Look for 'Cash Drawer' or 'Peripheral Unit'. 4) Change the setting to 'Open before printing' or 'Open after printing'. If it is set to 'No Use', the drawer will never open.",
    content: `<h2>The Printer-to-Drawer Connection</h2>
<p>Your POS software (like Square or Windows-based registers) does not talk directly to your cash drawer. The software talks to the Dascom printer, and the Dascom printer sends a 24-volt electrical pulse to the cash drawer to trigger the solenoid that pops it open.</p>

<h2>Fix 1: The Physical RJ11 Cable</h2>
<p>The cable connecting the drawer to the printer looks exactly like a standard landline telephone cable (RJ11 or RJ12).</p>
<ul>
    <li>Check the back of the Dascom printer. The cable must be plugged into the port labeled <strong>DK (Drawer Kick)</strong> or surrounded by a cash drawer icon. (Do not plug it into an Ethernet/LAN port, which looks similar but is slightly larger).</li>
    <li>Ensure the cable is not frayed or pinched under the heavy metal cash drawer.</li>
    <li>Test the drawer manually: Use the physical key to unlock the drawer. If the key doesn't pop it open, the mechanical spring inside the drawer is broken, and the printer is not the problem.</li>
</ul>

<h2>Fix 2: Setting the Kick Code (Windows)</h2>
<p>If the printer prints the receipt but the drawer remains shut, the printer is not receiving the "Kick Code" (a specific ESC/POS command) from the computer.</p>
<ol>
    <li>On your Windows PC, open <strong>Printers &amp; Scanners</strong>.</li>
    <li>Click your Dascom thermal printer and select <strong>Printer Properties</strong>.</li>
    <li>Navigate to the <strong>Device Settings</strong> or <strong>Advanced Options</strong> tab (this varies slightly depending on the exact Dascom driver version).</li>
    <li>Look for a drop-down menu labeled <strong>Cash Drawer</strong>, <strong>Peripheral Unit Type</strong>, or <strong>Drawer Kick</strong>.</li>
    <li>Change the setting from "Disabled" to <strong>"Document Top" (Open before printing)</strong> or <strong>"Document Bottom" (Open after printing)</strong>.</li>
    <li>Click Apply. Run a test transaction.</li>
</ol>

<h2>Fix 3: Cloud POS Software Settings</h2>
<p>If you are using an iPad or Android tablet with cloud POS software, the Windows driver fix above does not apply. You must configure the kick code inside the app itself.</p>
<p>Open your POS app's Hardware or Printer settings. Select the Dascom printer. You will usually see a toggle switch labeled <strong>"Enable Cash Drawer"</strong> or "Pop Drawer on Cash Sale." If this is toggled off, the tablet will not send the ESC/POS kick command to the printer.</p>`
  },
  {
    title: "Dascom DC-2300 & Kiosk Card Printer Error Codes",
    slug: 'dascom-dc-2300-kiosk-card-printer-error',
    seoTitle: "Fix Dascom DC-2300 ID Card Printer Errors & Blinking Lights",
    metaDescription: "Troubleshooting the Dascom DC-2300 and Kiosk card printers. Fix card feed errors, ribbon breakages, and 'Card Not Found' blinking light errors.",
    excerpt: "ID card printers like the Dascom DC-2300 require extreme mechanical precision. When they fail, it's usually due to dirty rollers or misaligned ribbons.",
    errorCode: null,
    tags: 'Dascom, DC-2300, Card Printer, Kiosk, ID Card, Error, Not Printing',
    wordCount: 850,
    difficultyLevel: 'Advanced',
    timeToFix: '15 minutes',
    categoryId: errorCategory,
    authorId: authors.david,
    reviewerId: authors.elena,
    featuredSnippet: "To fix a Dascom DC-2300 card printer error: 1) If the printer shows a 'Card Empty' or feed error but cards are loaded, the rubber pick rollers are dirty. Wipe them with an alcohol-soaked cleaning card. 2) If the printer flashes a 'Ribbon Error', open the lid and inspect the YMCKO ribbon. If it is snapped, tape the two ends back together, wind it forward manually on the take-up spool, and close the lid. The printer will automatically recalibrate the ribbon.",
    content: `<h2>Troubleshooting Dascom ID Card Printers</h2>
<p>Dascom’s line of Direct-to-Card (DTC) printers, such as the DC-2300 and various self-service kiosk modules, use thermal sublimation to print directly onto PVC plastic cards. Because PVC cards are stiff and heavy compared to paper, feed errors are the most common issue.</p>

<h2>Error: Card Feed Failure (Card Empty)</h2>
<p>If the input hopper is full of blank PVC cards, but the printer spins its motors, fails to grab a card, and throws a feed error, the pick roller has lost its grip.</p>
<p>PVC cards inherently carry a static charge that attracts microscopic dust. Over time, this dust coats the rubber pick roller at the bottom of the hopper, making it slippery.</p>
<ul>
    <li>Remove all blank cards from the hopper.</li>
    <li>Run a manufacturer-approved <strong>Cleaning Card</strong> (a long, alcohol-soaked card) through the printer's cleaning cycle.</li>
    <li><strong>Manual Fix:</strong> If you don't have a cleaning card, wrap a lint-free wipe around your finger, soak it in 99% isopropyl alcohol, and gently rub the rubber pick roller while manually rotating it.</li>
    <li>Before reloading the PVC cards, fan the edges of the stack to break the static cling holding the cards together.</li>
</ul>

<h2>Error: Ribbon Jam or Breakage</h2>
<p>The DC-2300 uses a multi-panel YMCKO ribbon. The print head heats up to hundreds of degrees to melt the colored panels onto the plastic card.</p>
<p>If you accidentally print on a card with a raised edge (like an embossed chip card inserted incorrectly), or if the print head gets too hot, the thin plastic ribbon will melt and snap.</p>
<ol>
    <li>Open the top cover and remove the ribbon cartridge.</li>
    <li>If the ribbon is snapped, pull a few inches of fresh ribbon from the supply spool.</li>
    <li>Use a piece of scotch tape to attach the broken end to the used ribbon on the take-up spool.</li>
    <li>Turn the take-up spool manually to wind the taped section securely onto the roll.</li>
    <li>Reinsert the cartridge and close the lid. The Dascom printer will use its optical sensors to automatically wind the ribbon forward to the next fresh Yellow panel.</li>
</ol>`
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
