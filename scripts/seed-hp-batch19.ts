import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const articles = [
  {
    slug: 'hp-officejet-pro-6978-wont-print-black',
    title: 'HP OfficeJet Pro 6978 Won\'t Print Black? [Fixed]',
    categoryId: 'print-quality-issues',
    metaDescription: 'Is your HP OfficeJet Pro 6978 printing blank pages or missing black ink? Learn how to unclog the printhead and restore black printing immediately.',
    faqs: JSON.stringify([
      { question: "Why is my HP OfficeJet Pro 6978 not printing black?", answer: "This is typically caused by a clogged black printhead nozzle due to infrequent printing, a depleted black ink cartridge, or a blocked cartridge vent." },
      { question: "How do I fix an HP 6978 that prints blank pages?", answer: "Run the automated printhead cleaning tool from the printer's control panel or the HP Smart app up to three times. If that fails, manually clean the cartridge vents." },
      { question: "Can a clogged printhead be fixed?", answer: "Yes. Most clogged printheads can be cleared using the printer's built-in cleaning cycle. Severe clogs may require removing the printhead and soaking it in warm distilled water." }
    ]),
    content: `
      <h2>The Quick Answer</h2>
      <p><strong>If your HP OfficeJet Pro 6978 won't print black ink, the black printhead nozzle is likely clogged with dried ink. To fix it, swipe down on the printer's control panel, select the Setup (gear) icon, go to Printer Maintenance, and select "Clean Printhead". You may need to run this tool up to three times to fully clear the blockage.</strong></p>
      
      <h2>Why Black Ink Stops Printing</h2>
      <p>The HP 6978 uses liquid ink. When the printer sits idle for several weeks without printing, the microscopic drop of ink resting at the tip of the printhead nozzle dries out and forms a physical crust. The printer still thinks it is spraying ink, which is why it goes through the motions but produces a blank page.</p>

      <h2>Step 1: Check the Cartridge Vent</h2>
      <p>Before running a cleaning cycle, ensure the cartridge itself isn't the problem.</p>
      <ul>
        <li>Remove the black ink cartridge (HP 902).</li>
        <li>Inspect the top of the cartridge. Ensure the orange pull-tab was completely removed during installation. If plastic film is still covering the tiny vent hole, ink cannot flow out.</li>
        <li>Use a pin to gently clear the vent hole if it appears blocked by adhesive.</li>
      </ul>

      <h2>Step 2: Run the Printhead Cleaning Tool</h2>
      <p>The automated cleaning tool forces a heavy surge of fresh ink through the nozzles to dissolve the dried crust.</p>
      <ol>
        <li>Load plain white paper into the input tray.</li>
        <li>On the printer's touchscreen, swipe down from the top to open the Dashboard.</li>
        <li>Touch the <strong>Setup</strong> (gear) icon.</li>
        <li>Scroll down and select <strong>Printer Maintenance</strong>.</li>
        <li>Select <strong>Clean Printhead</strong>.</li>
      </ol>
      <p>The printer will print a Print Quality Diagnostic Page. If the black text is still missing or faded, follow the on-screen prompt to proceed to the Level 2 and Level 3 cleanings.</p>

      <h3 id="additional-resources">Additional Resources</h3>
      <ul>
        <li><a href="https://support.hp.com/us-en/document/c05072619" target="_blank" rel="noopener noreferrer">HP Guide: Fixing Print Quality Problems on the 6978</a></li>
        <li><a href="https://www.hp.com/us-en/shop" target="_blank" rel="noopener noreferrer">Buy Authentic HP 902 Ink</a></li>
      </ul>
    `
  },
  {
    slug: 'hp-envy-photo-7855-paper-jam-error',
    title: 'HP Envy Photo 7855 Paper Jam Error: The Real Fix',
    categoryId: 'paper-handling-issues',
    metaDescription: 'Is your HP Envy Photo 7855 displaying a paper jam error? Learn how to clear physical jams from the duplexer and reset false jam sensors.',
    faqs: JSON.stringify([
      { question: "Where is the paper jam on an HP Envy Photo 7855?", answer: "Jams most commonly occur in the rear duplexer, under the carriage in the main access area, or inside the photo tray." },
      { question: "Why does my HP 7855 say paper jam when there is no paper?", answer: "This is a false jam caused by dirty paper feed rollers, a tiny scrap of paper blocking an optical sensor, or a software glitch." },
      { question: "How do I remove a stuck paper from the back of my HP Envy?", answer: "Squeeze the tabs on the rear access door (duplexer) to remove it. Gently pull the jammed paper straight out to avoid tearing it." }
    ]),
    content: `
      <h2>The Quick Answer</h2>
      <p><strong>To fix a paper jam on the HP Envy Photo 7855, squeeze the tabs on the rear access door to remove the duplexer and pull out any stuck paper. If the error persists but no paper is visible, you have a "false jam"—unplug the printer for 60 seconds to reset it, and clean the rubber feed rollers with a damp cloth.</strong></p>

      <h2>Locating the Hidden Jam</h2>
      <p>The HP Envy Photo 7855 has a complex paper path to support automatic double-sided printing and a separate photo tray. Check these three critical areas:</p>
      
      <h3>1. The Rear Duplexer (Most Common)</h3>
      <p>Go to the back of the printer. Push the two tabs on the rear access door toward each other and pull the door off. Gently pull any jammed paper completely out. Check the rollers on the door itself for tiny torn scraps.</p>

      <h3>2. The Main Carriage Area</h3>
      <p>Open the top cartridge access door. Shine a flashlight inside and look to the far right and far left. If the carriage is stuck, do not force it. Remove any paper blocking its path. If the carriage is free to move, gently push it to the right to check for paper hiding underneath it.</p>

      <h3>3. The Photo Tray</h3>
      <p>Pull out the main paper tray. Check the smaller photo tray sitting on top. Paper can sometimes misfeed between the two trays. Remove all paper, ensure the guides are snug, and reinsert the tray.</p>

      <h2>Fixing a "False" Paper Jam</h2>
      <p>If you've checked everywhere and the printer still insists there is a jam, the optical sensors are either dirty or experiencing a glitch.</p>
      <ul>
        <li><strong>Hard Reset:</strong> With the printer turned on, unplug the power cord from the wall. Wait 60 seconds. Plug it back in. This clears software-induced false jams.</li>
        <li><strong>Clean the Rollers:</strong> Dust on the gray rubber feed rollers causes them to slip. When they slip, the printer assumes a jam has occurred. Wipe them down with a lint-free cloth lightly dampened with distilled water.</li>
      </ul>

      <h3 id="additional-resources">Additional Resources</h3>
      <ul>
        <li><a href="https://support.hp.com/us-en/document/c05629168" target="_blank" rel="noopener noreferrer">HP Document: Clearing Paper Jams on the Envy Photo 7800 Series</a></li>
        <li><a href="https://support.hp.com/" target="_blank" rel="noopener noreferrer">Official HP Customer Support</a></li>
      </ul>
    `
  },
  {
    slug: 'hp-laserjet-pro-m404dn-fuser-error',
    title: 'HP LaserJet Pro M404dn 50.xx Fuser Error: Explained',
    categoryId: 'error-codes-alerts',
    metaDescription: 'Seeing a 50.xx Fuser Error on your HP LaserJet Pro M404dn? Learn what this hardware failure means and how to safely troubleshoot it.',
    faqs: JSON.stringify([
      { question: "What is a 50.xx Fuser Error on an HP LaserJet?", answer: "A 50.xx error indicates a hardware malfunction with the fuser assembly, the component that uses heat and pressure to melt toner onto the paper." },
      { question: "How do I fix a fuser error on my HP M404dn?", answer: "First, perform a hard reset by unplugging the printer for 10 minutes to let the fuser cool. Ensure the printer is plugged directly into a wall outlet, not a surge protector." },
      { question: "Can I replace the fuser on an HP LaserJet Pro M404dn?", answer: "Yes, the fuser can be replaced, but it requires disassembling the printer covers. If the printer is under warranty, contact HP support." }
    ]),
    content: `
      <h2>The Quick Answer</h2>
      <p><strong>A 50.xx Fuser Error on the HP LaserJet Pro M404dn means the heating element (fuser) is failing to reach or maintain the correct temperature. To troubleshoot, unplug the printer for 15 minutes to let it cool down, and ensure it is plugged directly into a wall outlet rather than a power strip or UPS.</strong></p>

      <h2>What is the Fuser?</h2>
      <p>Laser printers don't use liquid ink; they use dry plastic toner powder. The fuser is a pair of heated rollers at the back of the printer that melts the toner powder and presses it permanently into the paper. It requires a massive amount of electricity to heat up instantly.</p>

      <h2>Step 1: The Power Supply Check</h2>
      <p>Because the fuser draws so much power, surge protectors, extension cords, and uninterruptible power supplies (UPS) can restrict the electrical current. If the fuser doesn't get enough voltage, it takes too long to heat up, triggering the 50.xx error.</p>
      <ol>
        <li>Turn off the printer.</li>
        <li>Unplug the power cord from the surge protector or UPS.</li>
        <li>Plug the power cord <strong>directly into a wall outlet</strong>.</li>
        <li>Turn the printer back on and see if the error clears.</li>
      </ol>

      <h2>Step 2: Let it Cool Down (Hard Reset)</h2>
      <p>Sometimes the fuser overheats, or the thermistor (temperature sensor) gets confused. Unplug the printer from the wall and let it sit completely powered down for 15 to 30 minutes. This allows the fuser to return to room temperature and resets the logic board.</p>

      <h2>When to Replace the Fuser</h2>
      <p>If the error returns immediately after a hard reset and a direct wall connection, the fuser heating element or its thermistor has suffered a hardware failure. Common sub-codes include 50.1 (low temperature) or 50.2 (warm-up failure). You will need to replace the fuser assembly (part number RM2-5399 for 110V models).</p>

      <h3 id="additional-resources">Additional Resources</h3>
      <ul>
        <li><a href="https://support.hp.com/us-en/document/c01831818" target="_blank" rel="noopener noreferrer">HP Document: Resolving 50.x Fuser Errors</a></li>
        <li><a href="https://partsurfer.hp.com/" target="_blank" rel="noopener noreferrer">HP PartSurfer (Lookup Replacement Parts)</a></li>
      </ul>
    `
  },
  {
    slug: 'hp-deskjet-3755-flashing-lights-meaning',
    title: 'HP DeskJet 3755 Flashing Lights Meaning (Decoded)',
    categoryId: 'error-codes-alerts',
    metaDescription: 'Are the lights blinking on your HP DeskJet 3755? Learn how to decode the flashing lights and resolve paper, ink, and network errors.',
    faqs: JSON.stringify([
      { question: "Why is the resume button blinking on my HP DeskJet 3755?", answer: "A blinking Resume button usually indicates a paper jam, an empty paper tray, or a carriage stall. Check for jammed paper in the input tray and print zone." },
      { question: "What does it mean when the ink cartridge lights flash on an HP 3755?", answer: "Flashing ink level icons indicate a cartridge error. The cartridge may be empty, improperly seated, or unrecognized by the printer." },
      { question: "How do I fix all lights flashing on my HP DeskJet?", answer: "If all lights are flashing simultaneously, the printer is in a fatal error state. Unplug the power cord for 60 seconds to perform a hard reset." }
    ]),
    content: `
      <h2>The Quick Answer</h2>
      <p><strong>To decode flashing lights on the HP DeskJet 3755: A flashing "Resume" button means a paper jam or empty tray. Flashing ink drop icons mean a cartridge is empty or unrecognized. A flashing Wi-Fi light means the printer is disconnected from the network. If ALL lights flash, unplug the printer for 60 seconds to reset a fatal error.</strong></p>

      <h2>Decoding Common Light Patterns</h2>
      <p>The compact DeskJet 3755 lacks a text display, so it uses combinations of blinking lights on its control panel to tell you what's wrong.</p>

      <h3>1. The Resume Light is Blinking</h3>
      <p>The Resume light (an arrow pointing down) flashes when the printer needs your attention to continue a physical task.</p>
      <ul>
        <li><strong>Out of Paper:</strong> Load paper into the rear input tray and press the Resume button.</li>
        <li><strong>Paper Jam:</strong> Open the front cartridge access door and remove any jammed paper.</li>
        <li><strong>Carriage Stall:</strong> The cartridge carriage is stuck. Check for obstructions inside the printer.</li>
      </ul>

      <h3>2. The Ink Level Icons are Flashing</h3>
      <p>Look at the small LCD screen. If the ink drop icons are blinking, there is an issue with the ink cartridges.</p>
      <ul>
        <li>If one drop is flashing, that specific cartridge is critically low or empty.</li>
        <li>If the drop and the E (Error) are flashing, the cartridge is missing, installed incorrectly, or is a counterfeit cartridge blocked by HP Dynamic Security. Remove and reseat the cartridges.</li>
      </ul>

      <h3>3. The Wireless Light is Blinking</h3>
      <p>A blinking blue Wi-Fi light means the printer's wireless radio is on, but it is not connected to a network. If it is pulsing slowly, it is in Setup Mode. Open the HP Smart app to reconnect the printer to your Wi-Fi.</p>

      <h3>4. All Lights are Flashing</h3>
      <p>If every light on the control panel is blinking rapidly, the printer has encountered a fatal hardware or firmware error. Disconnect the power cord from the wall outlet, wait one full minute, and plug it back in.</p>

      <h3 id="additional-resources">Additional Resources</h3>
      <ul>
        <li><a href="https://support.hp.com/us-en/document/c05367675" target="_blank" rel="noopener noreferrer">HP Document: Blinking Lights on the DeskJet 3700 Series</a></li>
        <li><a href="https://support.hp.com/" target="_blank" rel="noopener noreferrer">Official HP Customer Support</a></li>
      </ul>
    `
  },
  {
    slug: 'hp-printer-driver-unavailable-windows-11',
    title: 'HP Printer "Driver is Unavailable" in Windows 11? Fix',
    categoryId: 'drivers-software-firmware',
    metaDescription: 'Is Windows 11 showing a "Driver is unavailable" error for your HP printer? Learn how to completely uninstall old drivers and install the correct HP Smart software.',
    faqs: JSON.stringify([
      { question: "Why does Windows 11 say driver is unavailable for my HP printer?", answer: "This happens when Windows Update installs a generic, incompatible driver over the official HP driver, or when upgrading from Windows 10 corrupts the existing printer spooler files." },
      { question: "How do I fix the driver is unavailable error on Windows 11?", answer: "You must completely remove the printer from 'Printers & Scanners', uninstall all HP software from the Control Panel, and reinstall the printer using the HP Easy Start tool or HP Smart app." },
      { question: "Where do I download HP printer drivers for Windows 11?", answer: "Always download official drivers directly from support.hp.com/drivers. Avoid third-party driver update websites." }
    ]),
    content: `
      <h2>The Quick Answer</h2>
      <p><strong>To fix the "Driver is unavailable" error in Windows 11, you must completely remove the corrupted driver. Go to Settings > Bluetooth & devices > Printers & scanners, select your HP printer, and click "Remove". Then, download and run the "HP Print and Scan Doctor" tool, or reinstall the driver from the official HP website.</strong></p>

      <h2>Why This Happens in Windows 11</h2>
      <p>This error is incredibly common after upgrading to Windows 11 or after a major Windows Update. Microsoft often attempts to push "class drivers" (generic drivers) to devices. If the generic driver conflicts with the proprietary HP driver, the Windows print spooler crashes and reports the driver as "unavailable."</p>

      <h2>Step 1: Clean Up the Old Drivers</h2>
      <p>You cannot simply reinstall the driver on top of a corrupted one. You must wipe the slate clean.</p>
      <ol>
        <li>Unplug the USB cable from the printer (if using one).</li>
        <li>Press the <strong>Windows Key + I</strong> to open Settings.</li>
        <li>Navigate to <strong>Bluetooth & devices &gt; Printers & scanners</strong>.</li>
        <li>Click on your HP printer and select <strong>Remove</strong>.</li>
        <li>Press the Windows Key, type <strong>Control Panel</strong>, and open it.</li>
        <li>Go to <strong>Programs and Features</strong>. Uninstall any software that begins with "HP [Your Printer Model]".</li>
        <li>Restart your computer.</li>
      </ol>

      <h2>Step 2: Reinstall the Official Software</h2>
      <p>Now that the corrupted files are gone, reinstall the printer correctly.</p>
      <ol>
        <li>Go to <strong>support.hp.com/drivers</strong> in your web browser.</li>
        <li>Enter your exact printer model.</li>
        <li>Expand the "Driver-Product Installation Software" section.</li>
        <li>Download the <strong>HP Easy Start Printer Setup Software</strong> (or the Full Feature Software package if you prefer not to use the HP Smart App).</li>
        <li>Run the installer and do not plug in the USB cable until the software explicitly asks you to.</li>
      </ol>

      <h2>Alternative Fix: Windows Update</h2>
      <p>If the official installer fails, Windows Update might have a patch. Go to Settings > Windows Update > Advanced options > Optional updates. Check if there is an HP Printer driver listed under optional updates, select it, and install it.</p>

      <h3 id="additional-resources">Additional Resources</h3>
      <ul>
        <li><a href="https://support.hp.com/us-en/drivers/printers" target="_blank" rel="noopener noreferrer">Download Official HP Printer Drivers</a></li>
        <li><a href="https://support.hp.com/us-en/help/printscandoctor" target="_blank" rel="noopener noreferrer">HP Print and Scan Doctor Tool</a></li>
      </ul>
    `
  }
];

(async () => {
  const hpBrand = await prisma.brand.findUnique({ where: { slug: 'hp' } });
  if (!hpBrand) throw new Error('HP brand not found');
  const author = await prisma.author.findFirst();
  if (!author) throw new Error('No author found');

  for (const a of articles) {
    const category = await prisma.category.findUnique({ where: { slug: a.categoryId } });
    if (!category) throw new Error('Category not found: ' + a.categoryId);

    await prisma.article.upsert({
      where: { slug: a.slug },
      update: {},
      create: {
        title: a.title,
        slug: a.slug,
        excerpt: a.metaDescription, // Use metaDescription as excerpt fallback
        content: a.content,
        metaDescription: a.metaDescription,
        faqs: a.faqs,
        status: 'published',
        publishedAt: new Date(),
        brandId: hpBrand.id,
        categoryId: category.id,
        authorId: author.id
      }
    });
    console.log('✅ Created:', a.slug);
  }
  await prisma.$disconnect();
})();
