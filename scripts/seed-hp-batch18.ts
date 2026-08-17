import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const articles = [
  {
    slug: 'hp-officejet-pro-8025e-not-printing-color',
    title: 'HP OfficeJet Pro 8025e Not Printing Color? [Fixed]',
    categoryId: 'print-quality-issues',
    metaDescription: 'Is your HP OfficeJet Pro 8025e not printing color or missing specific hues? Learn how to unclog printheads and reset ink systems to restore vibrant prints.',
    faqs: JSON.stringify([
      { question: "Why is my HP 8025e only printing in black and white?", answer: "This is usually caused by dried ink in the printhead, depleted color cartridges, or incorrect print settings prioritizing grayscale." },
      { question: "How do I run a printhead cleaning cycle on an HP OfficeJet Pro 8025e?", answer: "Open the HP Smart app, select your printer, go to Printer Settings > Print Quality Tools, and select 'Clean Printhead'." },
      { question: "Where can I buy official replacement HP 910 ink cartridges?", answer: "You should purchase authentic HP 910 ink directly from the official HP store or authorized retailers to avoid compatibility issues." }
    ]),
    content: `
      <h2>The Quick Answer</h2>
      <p><strong>If your HP OfficeJet Pro 8025e is not printing color, the most likely cause is a clogged printhead from infrequent use or empty color cartridges. To fix this immediately, open the HP Smart app, navigate to "Printer Settings", then "Print Quality Tools", and run the "Clean Printhead" utility up to three times.</strong></p>
      
      <h2>Why Your HP 8025e Won't Print Color</h2>
      <p>The HP OfficeJet Pro 8025e uses individual ink cartridges (HP 910). When colors stop printing, or if your prints are missing cyan, magenta, or yellow, it usually points to a physical blockage rather than a hardware failure. If you haven't printed in a few weeks, the ink at the tip of the printhead nozzle has likely dried out.</p>

      <h2>Step 1: Check Ink Levels and Print Settings</h2>
      <p>Before doing anything drastic, let's rule out the simple things.</p>
      <ul>
        <li><strong>Verify Ink Levels:</strong> Open the HP Smart app and check your estimated ink levels. If a color is completely empty, the printer will refuse to print that color.</li>
        <li><strong>Check Grayscale Settings:</strong> In Windows, go to Settings &gt; Printers &amp; Scanners &gt; HP 8025e &gt; Printing Preferences. Ensure that "Print in Grayscale" or "Black Ink Only" is strictly turned <strong>off</strong>.</li>
      </ul>

      <h2>Step 2: Run the Automated Printhead Cleaning</h2>
      <p>This is the most effective fix for missing colors.</p>
      <ol>
        <li>Load plain white paper into the input tray.</li>
        <li>Open the <strong>HP Smart App</strong> on your computer or mobile device.</li>
        <li>Click on your printer, then scroll down to <strong>Advanced Settings</strong> (or Printer Settings).</li>
        <li>Navigate to <strong>Tools &gt; Utilities &gt; Print Quality Toolbox</strong>.</li>
        <li>Select <strong>Clean Printhead</strong>.</li>
      </ol>
      <p>The printer will make some noise and print a diagnostic page. Examine the color blocks on the page. If they are still missing or streaky, run the level 2 and level 3 cleanings as prompted.</p>

      <h3 id="additional-resources">Additional Resources</h3>
      <p>If you've run the cleaning cycle three times and are still missing colors, you may need a manual printhead flush or new cartridges. Check the resources below:</p>
      <ul>
        <li><a href="https://support.hp.com/" target="_blank" rel="noopener noreferrer">Official HP Customer Support Knowledge Base</a></li>
        <li><a href="https://www.hp.com/us-en/shop" target="_blank" rel="noopener noreferrer">Official HP Store for Authentic Ink</a></li>
      </ul>
    `
  },
  {
    slug: 'hp-envy-6055e-blinking-purple-light',
    title: 'HP Envy 6055e Blinking Purple Light: What It Means',
    categoryId: 'error-codes-alerts',
    metaDescription: 'Is your HP Envy 6055e printer blinking a purple light? This indicates a Wi-Fi setup mode issue. Follow these exact steps to connect it to your network.',
    faqs: JSON.stringify([
      { question: "What does the purple light mean on an HP Envy 6055e?", answer: "A pulsing or blinking purple light indicates that the printer is in Wi-Fi Setup Mode and is waiting to be connected to a wireless network via the HP Smart app." },
      { question: "How do I connect my HP 6055e to Wi-Fi?", answer: "While the light is purple, open the HP Smart app, click 'Add Printer', select the 6055e, and follow the on-screen instructions to enter your Wi-Fi password." },
      { question: "Why is the purple light not showing up on my HP printer?", answer: "If the light is not purple, the setup mode may have timed out (it lasts 2 hours). You will need to reset the network settings by holding the Wi-Fi button on the back for 5 seconds." }
    ]),
    content: `
      <h2>The Quick Answer</h2>
      <p><strong>An HP Envy 6055e blinking purple light simply means the printer is in "Wi-Fi Setup Mode". It is currently broadcasting its own signal and waiting for you to open the HP Smart app on your phone or computer to complete the wireless network connection.</strong></p>

      <h2>Decoding the HP Envy Edge Lighting</h2>
      <p>The HP Envy 6000 series relies heavily on its edge lighting to communicate printer status because it lacks a traditional display screen. If you're seeing a pulsing or blinking purple light, there is no need to panic—your printer is not broken. It's just waiting for instructions.</p>

      <h2>How to Fix the Blinking Purple Light</h2>
      <p>To stop the blinking purple light, you just need to connect the printer to your Wi-Fi network.</p>
      
      <h3>Step 1: Download the HP Smart App</h3>
      <p>Ensure you have the HP Smart app installed on your smartphone or PC. Ensure Bluetooth and Wi-Fi are enabled on your device, and that you are standing close to the printer.</p>

      <h3>Step 2: Add the Printer</h3>
      <ol>
        <li>Open HP Smart and click the <strong>Add Printer</strong> button (or the plus icon).</li>
        <li>The app will scan for available devices and should find your Envy 6055e.</li>
        <li>Select the printer. The app will prompt you for your Wi-Fi password.</li>
        <li>Enter the password. The printer's light will cycle through colors and eventually settle on a solid blue or white light when successfully connected.</li>
      </ol>

      <h2>What If Setup Fails? (How to Reset Setup Mode)</h2>
      <p>The purple light only lasts for 2 hours after you turn the printer on for the first time. If it times out, the light will stop being purple, and you won't be able to connect it.</p>
      <p>To force the printer back into Setup Mode (bringing the purple light back), press and hold the <strong>Wi-Fi button</strong> on the back of the printer for exactly 5 seconds until the edge lighting flashes. Then, repeat the setup process in the HP Smart app.</p>

      <h3 id="additional-resources">Additional Resources</h3>
      <ul>
        <li><a href="https://support.hp.com/us-en/document/ish_2843711-2427128-16" target="_blank" rel="noopener noreferrer">HP Document: Blinking Lights on HP Envy Printers</a></li>
        <li><a href="https://support.hp.com/us-en/drivers/printers" target="_blank" rel="noopener noreferrer">Download HP Smart App</a></li>
      </ul>
    `
  },
  {
    slug: 'hp-laserjet-m209dwe-keeps-going-offline',
    title: 'HP LaserJet M209dwe Keeps Going Offline? Fixed',
    categoryId: 'connectivity-issues',
    metaDescription: 'Is your HP LaserJet M209dwe constantly disconnecting or showing as offline in Windows or Mac? Learn how to assign a static IP address to permanently fix it.',
    faqs: JSON.stringify([
      { question: "Why does my HP LaserJet M209dwe keep going offline?", answer: "This is usually caused by dynamic IP address changes from your router. When the router changes the printer's IP, the computer can no longer find it." },
      { question: "How do I get my HP M209dwe back online?", answer: "Restart both your printer and router. Then, use the HP Print and Scan Doctor tool to re-establish the connection. To prevent it permanently, set a Static IP." },
      { question: "Does the M209dwe require an internet connection?", answer: "Yes, models ending in 'e' (like the M209dwe) require a constant internet connection to maintain HP+ functionality." }
    ]),
    content: `
      <h2>The Quick Answer</h2>
      <p><strong>If your HP LaserJet M209dwe keeps going offline, it is likely due to your router assigning a new IP address to the printer after a reboot or lease expiration. To fix this permanently, log into your router and assign a Static IP Address to the printer's MAC address.</strong></p>

      <h2>The Root Cause of "Offline" Status</h2>
      <p>The M209dwe is an HP+ printer, which means it relies heavily on a continuous network connection. When your computer says the printer is offline, it simply means the computer is sending data to the old IP address, but the printer is now residing at a new IP address.</p>

      <h2>The Permanent Fix: Assigning a Static IP</h2>
      <p>By assigning a static IP, you tell your router to never change the printer's address.</p>
      
      <ol>
        <li><strong>Print a Network Configuration Page:</strong> Press and hold the Information button (i) on the printer until all buttons light up, then press the Information button and the Resume button at the same time.</li>
        <li><strong>Find the IP Address:</strong> Look at the printed page to find the current IPv4 address (e.g., 192.168.1.15).</li>
        <li><strong>Access the EWS:</strong> Type that IP address directly into a web browser on your computer.</li>
        <li><strong>Navigate to Network Settings:</strong> Go to the Network tab > IPv4 Configuration.</li>
        <li><strong>Set to Manual IP:</strong> Change the IP assignment from Automatic (DHCP) to Manual (Static). Input an IP address outside of your router's normal DHCP range (e.g., if your DHCP range is .2 to .100, set the printer to .200). Save the settings.</li>
      </ol>

      <h2>HP+ Internet Requirements</h2>
      <p>Remember that the "e" at the end of M209dwe stands for HP+. This means the printer <strong>must</strong> have access to the internet. If you have blocked the printer in your router firewall, or if your internet goes down, the printer will refuse to print, even over a local USB connection.</p>

      <h3 id="additional-resources">Additional Resources</h3>
      <ul>
        <li><a href="https://support.hp.com/us-en/help/printscandoctor" target="_blank" rel="noopener noreferrer">Download HP Print and Scan Doctor for Windows</a></li>
        <li><a href="https://support.hp.com/" target="_blank" rel="noopener noreferrer">Official HP Customer Support</a></li>
      </ul>
    `
  },
  {
    slug: 'hp-deskjet-2755e-paper-jam-no-paper',
    title: 'HP DeskJet 2755e Paper Jam But No Paper? [Fixed]',
    categoryId: 'paper-handling-issues',
    metaDescription: 'Is your HP DeskJet 2755e showing a paper jam error when there is no paper stuck inside? Learn how to clean the pick rollers and clear false jam sensors.',
    faqs: JSON.stringify([
      { question: "Why does my HP DeskJet 2755e say paper jam when there isn't one?", answer: "This is known as a 'false paper jam' and is typically caused by dirty paper feed rollers, a tiny scrap of torn paper blocking an optical sensor, or a software glitch." },
      { question: "How do I clear a false paper jam on an HP DeskJet?", answer: "Shine a flashlight into the input tray and output slot to check for tiny paper scraps. If clear, wipe the gray rubber feed rollers with a lint-free cloth dampened with distilled water." },
      { question: "How do I reset an HP DeskJet 2755e?", answer: "With the printer turned on, disconnect the power cord. Wait 60 seconds, then reconnect it. This will reset the internal sensors." }
    ]),
    content: `
      <h2>The Quick Answer</h2>
      <p><strong>If your HP DeskJet 2755e is reporting a paper jam but there is no paper inside, you have a "false jam." To fix this, first unplug the printer to reset the sensors. If the error persists, you must clean the gray rubber paper pick rollers located inside the input tray using a damp, lint-free cloth.</strong></p>

      <h2>What Causes a False Paper Jam?</h2>
      <p>Your printer doesn't actually "see" a jam. It assumes there's a jam if the paper feed rollers fail to pull paper into the machine within a specific timeframe, or if a tiny scrap of paper is blocking an internal optical sensor.</p>

      <h2>Step 1: The Hard Reset</h2>
      <p>Sometimes the printer's logic board gets confused. A hard reset can clear the error state.</p>
      <ul>
        <li>Turn the printer on.</li>
        <li>Unplug the power cord from the back of the printer and the wall.</li>
        <li>Wait a full 60 seconds.</li>
        <li>Plug it back in and turn it on.</li>
      </ul>

      <h2>Step 2: Cleaning the Pick Rollers</h2>
      <p>Over time, the rubber rollers that pull paper into the machine accumulate paper dust and lose their grip. When they slip, the printer thinks there's a jam.</p>
      <ol>
        <li>Unplug the printer and remove all paper from the input tray.</li>
        <li>Shine a flashlight down into the input tray to locate the gray rubber rollers.</li>
        <li>Dampen a cotton swab or a lint-free cloth with bottled or distilled water (do not use tap water or alcohol).</li>
        <li>Press the swab against the rollers and rotate them upward with your fingers to clean the entire surface.</li>
        <li>Allow the rollers to dry completely (about 10 minutes) before inserting paper.</li>
      </ol>

      <h2>Step 3: Checking the Carriage Path</h2>
      <p>Open the ink cartridge access door. Look all the way to the left and right edges of the track. Even a torn corner of a piece of paper the size of a postage stamp can block the carriage sensor, triggering a jam error. Use tweezers to remove any debris.</p>

      <h3 id="additional-resources">Additional Resources</h3>
      <ul>
        <li><a href="https://support.hp.com/us-en/document/c06584210" target="_blank" rel="noopener noreferrer">HP Document: Fixing Paper Jams</a></li>
        <li><a href="https://support.hp.com/" target="_blank" rel="noopener noreferrer">Official HP Customer Support</a></li>
      </ul>
    `
  },
  {
    slug: 'hp-smart-tank-5101-printhead-error',
    title: 'HP Smart Tank 5101 Printhead Error: How to Fix It',
    categoryId: 'error-codes-alerts',
    metaDescription: 'Is your HP Smart Tank 5101 flashing a printhead error or showing an "E" on the display? Learn how to properly reseat the printheads and clear the error.',
    faqs: JSON.stringify([
      { question: "What does the printhead error mean on an HP Smart Tank 5101?", answer: "This error means the printer cannot communicate with one or both of the removable printheads (the black or tri-color modules installed during setup)." },
      { question: "How do I fix the printhead error on an HP Smart Tank?", answer: "Open the front access door, push down on the blue printhead latch to open it, remove both printheads, wipe the copper contacts with a dry lint-free cloth, and firmly push them back into place until they snap." },
      { question: "Can I replace the printheads on an HP Smart Tank 5101?", answer: "Yes. Unlike standard inkjet printers, the printheads on HP Smart Tank models are separate from the ink tanks and are user-replaceable. You can purchase replacement kits from HP." }
    ]),
    content: `
      <h2>The Quick Answer</h2>
      <p><strong>To fix a printhead error on an HP Smart Tank 5101, you must reseat the printheads. Open the front doors, wait for the carriage to center, open the blue latch, remove the printheads, gently wipe their copper electrical contacts with a dry lint-free cloth, and firmly snap them back into place.</strong></p>

      <h2>Understanding the Error</h2>
      <p>Because the HP Smart Tank 5101 is an EcoTank-style printer, the ink tanks are built into the printer body, but the actual "printheads" (the modules that spray the ink) are removable units that you install during initial setup. If the printer gets bumped, or if ink/dust gets on the electrical contacts, the printer loses communication with the printhead and throws an error.</p>

      <h2>How to Clean and Reseat the Printheads</h2>
      <p>Follow these exact steps to clear the communication error:</p>
      
      <ol>
        <li><strong>Open the Access Doors:</strong> Turn the printer on. Open the front door and then the printhead access door. The carriage will slide to the center.</li>
        <li><strong>Release the Latch:</strong> Press down firmly on the blue latch to pop it open.</li>
        <li><strong>Remove the Printheads:</strong> Pull the black and tri-color printheads straight down and out of their slots. Be very careful <em>not</em> to touch the ink nozzles on the bottom.</li>
        <li><strong>Clean the Contacts:</strong> Locate the copper-colored electrical contacts on the back of each printhead. Wipe them gently with a dry, lint-free cloth or coffee filter.</li>
        <li><strong>Reinstall:</strong> Push the printheads back into their respective color-coded slots until they click. </li>
        <li><strong>Close the Latch:</strong> Press down firmly on the blue latch until it locks. Close the access doors.</li>
      </ol>

      <h2>When to Replace the Printheads</h2>
      <p>If you've reseated the printheads multiple times and the error persists, the printhead itself may have suffered an electrical failure. Fortunately, because these are removable, you don't need to replace the whole printer. You can order replacement HP Smart Tank printhead kits (black and tri-color) directly from HP.</p>

      <h3 id="additional-resources">Additional Resources</h3>
      <ul>
        <li><a href="https://support.hp.com/" target="_blank" rel="noopener noreferrer">Official HP Customer Support</a></li>
        <li><a href="https://www.hp.com/us-en/shop" target="_blank" rel="noopener noreferrer">Order Replacement Printheads on the HP Store</a></li>
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
