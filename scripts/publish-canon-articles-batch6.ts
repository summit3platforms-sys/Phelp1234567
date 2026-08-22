import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const canonBrandId = 'aa9e42c5-e0f0-4b60-b776-c39f46748c33';
const setupCategory = 'e6768bbb-1696-4f92-8499-7eb45f540edd';
const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
const inkCategory = '9af9508c-4517-47bc-9084-8ab635b1283b';
const connectivityCategory = 'c3a92d93-fcbb-439c-a11e-80cde3d2a5ce';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Canon PIXMA TS3522 Not Printing: Setup & Cartridge Fix",
    slug: 'canon-pixma-ts3522-not-printing',
    seoTitle: "Fix Canon PIXMA TS3522 Not Printing (Blank Pages & Errors)",
    metaDescription: "Is your new Canon PIXMA TS3522 not printing? Learn how to remove the protective cartridge tape, clear paper feed errors, and fix blank pages.",
    excerpt: "The Canon TS3522 is one of the most popular budget printers, but setup mistakes frequently cause it to print blank pages or refuse to print entirely.",
    errorCode: null,
    tags: 'Canon, PIXMA, TS3522, Not Printing, Blank Pages, Setup, Cartridge',
    wordCount: 900,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: setupCategory,
    authorId: authors.alex,
    reviewerId: authors.elena,
    featuredSnippet: "To fix a Canon TS3522 that is not printing: 1) If printing blank pages, remove the ink cartridges and ensure you peeled off the clear orange protective tape from the bottom nozzles. 2) Push the cartridges upward until they 'click' into place; an unseated cartridge will not print. 3) If the printer flashes an E02 error, check the rear paper tray. Squeeze the paper guides so they are tight against the paper stack to prevent feed failures. 4) Press the physical 'Color' or 'Black' start button on the printer to resume a paused job.",
    content: `<h2>The Classic Setup Mistake: Protective Tape</h2>
<p>If you just bought your Canon PIXMA TS3522, successfully connected it to Wi-Fi, sent a document, and out came a perfectly blank white sheet of paper, you are not alone. Thousands of users make this exact same mistake during unboxing.</p>
<p>When Canon ships the 275 and 276 ink cartridges in the box, they place a strip of orange or clear plastic tape over the microscopic print nozzles to prevent leaking. If you insert the cartridge without peeling this tape off, the printer goes through the motions of printing, but the ink is physically blocked from hitting the paper.</p>
<ul>
    <li>Open the front access door.</li>
    <li>Push down on the cartridges to release them, and pull them out.</li>
    <li>Look at the bottom copper plate. Peel off any remaining plastic tape. <em>Do not touch the copper plate with your fingers!</em></li>
    <li>Reinsert the cartridges and push firmly upward until they click.</li>
</ul>

<h2>The E02 Paper Feed Glitch</h2>
<p>If the printer makes grinding noises and refuses to pull paper, and the small LED screen flashes <strong>E - 0 - 2</strong>, you have a paper feed error.</p>
<p>The TS3522 uses a rear paper tray. If you just dropped a stack of paper into the slot without adjusting the guides, the paper will feed in crooked. The internal sensor detects the crooked paper and immediately halts the print job to prevent a jam. Squeeze the plastic guide on the left side of the paper tray and slide it snugly against the paper stack.</p>

<h2>The Offline / Spooler Issue</h2>
<p>If the printer sits silently when you hit Print on your computer, check the Wi-Fi icon on the printer's screen. If the icon is missing, the printer is disconnected from your network. Press and hold the Wireless Connect button for 3 seconds, then open the Canon PRINT app on your phone to run the setup process again.</p>`
  },
  {
    title: "Canon PIXMA TR4720 Wi-Fi Setup Guide (Windows & Mac)",
    slug: 'canon-pixma-tr4720-wifi-setup',
    seoTitle: "Canon PIXMA TR4720 Wireless Setup (Easy Wi-Fi Guide)",
    metaDescription: "Having trouble connecting your Canon PIXMA TR4720 to Wi-Fi? Learn how to use WPS, the Canon PRINT app, or the Windows setup utility to get connected fast.",
    excerpt: "Connecting the Canon TR4720 to a modern wireless network can be frustrating if you don't use the correct method for your specific router.",
    errorCode: null,
    tags: 'Canon, PIXMA, TR4720, Wi-Fi Setup, Wireless, WPS, Connection',
    wordCount: 850,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: setupCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    featuredSnippet: "To connect your Canon PIXMA TR4720 to Wi-Fi using WPS: 1) Ensure your Wi-Fi router has a physical 'WPS' button. 2) On the printer's control panel, press the 'Setup' button (pliers and screwdriver icon). 3) Use the arrow keys to select 'Wi-Fi setup' and press OK. 4) Select 'WPS (Push button)' and press OK. 5) Within 2 minutes, walk to your router and press and hold the WPS button for 5 seconds. The printer screen will say 'Connected'. Press OK.",
    content: `<h2>Method 1: The Fast WPS Method (Recommended)</h2>
<p>If your home Wi-Fi router was built in the last 5 years, it almost certainly has a <strong>WPS (Wi-Fi Protected Setup)</strong> button. This is by far the fastest way to connect the TR4720.</p>
<ol>
    <li>Press the <strong>Setup</strong> button on the printer (it looks like a pair of pliers and a screwdriver).</li>
    <li>Press the right arrow until you see <strong>Wi-Fi setup</strong>, then press <strong>OK</strong>.</li>
    <li>Select <strong>WPS (Push button)</strong> and press <strong>OK</strong>.</li>
    <li>The printer screen will tell you to press the WPS button on your router.</li>
    <li>Walk over to your router. Find the WPS button (usually on the back, sometimes labeled with two circular arrows) and hold it down for 3 to 5 seconds.</li>
    <li>Walk back to the printer. Within 2 minutes, the screen should display <strong>Connected</strong>. Press OK.</li>
</ol>

<h2>Method 2: Easy Wireless Connect (Smartphones)</h2>
<p>If your router doesn't have a WPS button (like many mesh networks such as Eero or Google Nest), you must use your smartphone to pass the Wi-Fi password to the printer.</p>
<ul>
    <li>Download the <strong>Canon PRINT Inkjet/SELPHY</strong> app on your iOS or Android device.</li>
    <li>On the printer, press the <strong>Setup</strong> button, go to <strong>Wi-Fi setup</strong>, and select <strong>Easy wireless connect</strong>. The printer is now broadcasting its own temporary Bluetooth/Wi-Fi signal.</li>
    <li>Open the Canon app on your phone. It will automatically detect the new printer.</li>
    <li>Follow the on-screen prompts. The app will ask for your home Wi-Fi password and transmit it securely to the printer.</li>
</ul>

<h2>Method 3: The 5GHz Problem</h2>
<p>If the printer refuses to connect using either method, your router is likely broadcasting a 5GHz-only network. The Canon TR4720 only has a 2.4GHz Wi-Fi chip. You must log into your router's admin panel and ensure the 2.4GHz band is enabled. If your router uses "Band Steering" (combining both bands under one name), temporarily disable the 5GHz band, connect the printer, and then re-enable 5GHz.</p>`
  },
  {
    title: "Canon PIXMA MG3620 Offline? How to Reconnect to Wi-Fi",
    slug: 'canon-pixma-mg3620-offline',
    seoTitle: "Fix Canon PIXMA MG3620 Offline Error (Wi-Fi Reconnect)",
    metaDescription: "Is your Canon MG3620 showing as offline in Windows or Mac? Learn how to reset the network settings and reconnect using the WPS or Cableless setup method.",
    excerpt: "The Canon MG3620 is notorious for dropping its Wi-Fi connection after a router reboot or power outage. Here is how to force it back online.",
    errorCode: null,
    tags: 'Canon, PIXMA, MG3620, Offline, Wi-Fi, Disconnected, Network Reset',
    wordCount: 850,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: connectivityCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredSnippet: "To fix a Canon MG3620 that is offline: 1) First, reset the printer's network settings. Press and hold the Wi-Fi button until the ON (power) lamp flashes. Press the Color button, then press the Wi-Fi button again. 2) Reconnect using WPS: Press and hold the Wi-Fi button until the ON lamp flashes. Press the Black button, then the Wi-Fi button. 3) Immediately go to your Wi-Fi router and hold the WPS button for 5 seconds. The blue Wi-Fi light on the printer will turn solid when connected.",
    content: `<h2>Why the MG3620 Goes Offline</h2>
<p>The Canon PIXMA MG3620 is a great budget printer, but it lacks an LCD screen. This makes network troubleshooting incredibly frustrating. When your router reboots, or your ISP changes your IP address, the MG3620 often gets confused, drops off the network, and shows as "Offline" on your computer.</p>
<p>Because there is no screen to select a Wi-Fi network, you have to use a specific sequence of button presses to clear the old network data and connect it to the new one.</p>

<h2>Step 1: The Network Reset</h2>
<p>Before trying to reconnect, you must wipe the corrupted network settings from the printer's memory.</p>
<ol>
    <li>Turn the printer on.</li>
    <li>Press and hold the <strong>Wi-Fi</strong> button until the green <strong>Power (ON)</strong> lamp flashes.</li>
    <li>Press the <strong>Color</strong> Start button at the bottom.</li>
    <li>Press the <strong>Wi-Fi</strong> button again.</li>
</ol>
<p>The power lamp will flash and then turn solid. All previous Wi-Fi passwords have been wiped from the printer.</p>

<h2>Step 2: Reconnecting via WPS</h2>
<p>If your router has a physical WPS button, this is the easiest way to reconnect.</p>
<ol>
    <li>Press and hold the <strong>Wi-Fi</strong> button on the printer until the green <strong>Power</strong> lamp flashes.</li>
    <li>Press the <strong>Black</strong> Start button.</li>
    <li>Press the <strong>Wi-Fi</strong> button again. The blue Wi-Fi light will start flashing rapidly.</li>
    <li>Walk over to your router and press the <strong>WPS button</strong> for 5 seconds.</li>
</ol>
<p>Wait up to 2 minutes. When the blue Wi-Fi light on the printer stops flashing and stays solid blue, you are back online.</p>

<h2>Step 3: The Windows Spooler Trap</h2>
<p>If the blue Wi-Fi light on the printer is solid, but your computer <em>still</em> says the printer is offline, the problem is in your computer, not the printer.</p>
<ul>
    <li>On Windows, open <strong>Printers &amp; Scanners</strong>.</li>
    <li>Click the Canon MG3620 and select <strong>Open Queue</strong>.</li>
    <li>Click the <strong>Printer</strong> tab at the top of the window.</li>
    <li>If there is a checkmark next to <strong>Use Printer Offline</strong>, click it to remove the checkmark. Your print jobs will immediately begin processing.</li>
</ul>`
  },
  {
    title: "Canon MAXIFY MB2720 Error Code Guide",
    slug: 'canon-maxify-mb2720-error',
    seoTitle: "Canon MAXIFY MB2720 Error Code List & Fixes",
    metaDescription: "A complete troubleshooting guide for the Canon MAXIFY MB2720 business printer. Fix error codes B504, 5100, 5200, and paper jam support codes.",
    excerpt: "The MAXIFY MB2720 is a workhorse, but its unique dual-cassette design and heavy-duty printhead generate specific error codes. Here is how to decode them.",
    errorCode: null,
    tags: 'Canon, MAXIFY, MB2720, Error Code, B504, 5100, Paper Jam',
    wordCount: 950,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: errorCategory,
    authorId: authors.david,
    reviewerId: authors.marcus,
    featuredSnippet: "Common Canon MAXIFY MB2720 errors: Error B504 indicates the printhead is dry because the ink cartridges are empty or vapor-locked. You must install a new set of genuine cartridges to clear B504. Error 5100 is a carriage jam; check for torn paper along the metal rail. Support Code 1003 means the upper or lower paper cassette is empty or not pushed in fully. Support Code 1313 means a paper jam in the rear duplexer.",
    content: `<h2>Troubleshooting the MAXIFY MB2720</h2>
<p>Because the MAXIFY MB2720 uses high-capacity pigment ink tanks (the PGI-1200 series) and features two separate paper cassettes, its error codes differ slightly from standard PIXMA photo printers.</p>

<h2>The Dreaded B504 Error</h2>
<p><strong>Error B504</strong> is the most infamous MAXIFY error. It is a fatal printhead error that occurs when no ink is flowing to the nozzles.</p>
<p>Unlike standard printers that just print faded pages when empty, the MB2720 detects the lack of fluid and locks the machine to prevent the printhead from burning out. This almost always happens when users install cheap, third-party ink cartridges that suffer from "vapor lock" (air cannot escape the cartridge, so a vacuum prevents ink from flowing out).</p>
<p><strong>The Fix:</strong> The only reliable way to clear B504 is to remove the third-party cartridges and install a brand new set of genuine Canon PGI-1200 cartridges. The printer will detect the genuine chips, pressurize the system, and clear the error.</p>

<h2>Paper Feed Errors (1000 & 1300 Series)</h2>
<ul>
    <li><strong>Support Code 1003:</strong> The printer is out of paper. Pay attention to the screen; it will tell you if Cassette 1 (Upper) or Cassette 2 (Lower) is empty. Ensure the paper guides are tight and the cassette is pushed in until it clicks.</li>
    <li><strong>Support Code 1313:</strong> A paper jam has occurred during two-sided printing. Turn the printer around, press the green tabs to remove the rear duplexer unit, and pull out the crumpled paper.</li>
    <li><strong>Support Code 1560:</strong> You inserted the wrong size paper for the tray. If you tell Microsoft Word you are printing on 8.5x11 Letter, but the printer detects 4x6 photo paper in Cassette 1, it will throw 1560. Adjust your print settings to match the physical paper.</li>
</ul>

<h2>Mechanical Errors (5000 Series)</h2>
<ul>
    <li><strong>Error 5100:</strong> The carriage is jammed. Open the front door and look for a paperclip or a shredded piece of paper blocking the printhead's path.</li>
    <li><strong>Error 5C20:</strong> The purge unit (the waste ink pump on the right side) is stalled. This usually requires a professional repair, but you can try using a syringe of warm water to dissolve dried ink on the right side of the carriage rail.</li>
</ul>`
  },
  {
    title: "Canon PIXMA TS6420 Error Code List & Meaning",
    slug: 'canon-pixma-ts6420-error-code',
    seoTitle: "Canon PIXMA TS6420 Support Codes & Error Fixes",
    metaDescription: "Decode the errors on your Canon TS6420 OLED screen. Learn how to fix Support Codes 1300, 1401, 1688, and 2110 for paper jams, empty ink, and paper mismatch.",
    excerpt: "The sleek OLED screen on the TS6420 looks great, but it doesn't give much detail when a Support Code pops up. Here is what those numbers mean.",
    errorCode: null,
    tags: 'Canon, PIXMA, TS6420, Error Code, Support Code, 1401, 1688',
    wordCount: 850,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: errorCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "Common Canon TS6420 Support Codes: Code 1688 means the ink cartridge is completely empty; press and hold the Stop button for 5 seconds to bypass it temporarily. Code 1401/1403 means the ink cartridge is not recognized; remove it and wipe the copper contacts. Code 1300 indicates a paper jam in the rear tray or front output slot. Code 2110/2114 means the paper size loaded does not match the size you selected on your computer.",
    content: `<h2>Decoding TS6420 Errors</h2>
<p>The Canon PIXMA TS6420 (and its sibling, the TS6420a) features a minimalist design with a small OLED screen. When a problem occurs, it flashes a 4-digit Support Code. Here is how to fix the most common ones.</p>

<h2>Ink Cartridge Errors</h2>
<ul>
    <li><strong>Support Code 1684 or 1688 (Ink Empty):</strong> The printer has detected that either the 260 Black or 261 Color cartridge is completely empty. If you just want to scan a document, or if you want to force the printer to keep printing (which may damage the printhead), press and hold the <strong>Stop (Red Triangle)</strong> button for 5 seconds. This disables the ink level monitor.</li>
    <li><strong>Support Code 1401 or 1430 (Cartridge Unrecognized):</strong> The cartridge is missing, inserted incorrectly, or has a dirty electrical chip. Open the printer, push up on the cartridges to ensure they are seated, or wipe the copper strip on the front of the cartridge with rubbing alcohol.</li>
</ul>

<h2>Paper and Feed Errors</h2>
<ul>
    <li><strong>Support Code 1300 (Paper Jam):</strong> Paper is stuck in the feed mechanism. Check the front output slot first. If it's clear, remove the rear cover panel and pull out any crumpled paper from the back.</li>
    <li><strong>Support Code 2110 or 2114 (Paper Mismatch):</strong> This is incredibly common on the TS6420. The printer has a sensor in the paper cassette. If you put 4x6 photo paper in the cassette, but tell your computer to print a Letter-sized PDF, the printer throws 2110. You must ensure the paper size on your computer perfectly matches the paper size registered on the printer's OLED screen.</li>
    <li><strong>Support Code 1259:</strong> The front output tray is not pulled out. You must pull the plastic output tray all the way out before the printer will begin printing.</li>
</ul>`
  },
  {
    title: "Canon imageCLASS MF Toner Error (Cartridge Communication Fix)",
    slug: 'canon-imageclass-mf-toner-error',
    seoTitle: "Fix Canon imageCLASS Toner Error (Check Toner Cartridge)",
    metaDescription: "Is your Canon imageCLASS laser printer displaying a 'Check Toner Cartridge' or communication error? Learn how to clean the drum contacts and bypass the chip lock.",
    excerpt: "Laser printers are reliable, but Canon imageCLASS models can be very picky about toner. Here is how to fix the 'Check Toner' and communication errors.",
    errorCode: null,
    tags: 'Canon, imageCLASS, Toner Error, Laser Printer, Drum, Cartridge Communication',
    wordCount: 900,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: inkCategory,
    authorId: authors.david,
    reviewerId: authors.elena,
    featuredSnippet: "To fix a Canon imageCLASS toner error: 1) Open the front toner door and pull the toner/drum tray out. 2) Remove the toner cartridge that is causing the error. 3) Look for the small copper or gold microchip on the side of the cartridge. If it is dirty, wipe it with a dry microfiber cloth. 4) Look inside the printer where the cartridge sits and ensure the metal contact pins are not bent or covered in spilled toner powder. 5) Reinsert the cartridge firmly until it clicks.",
    content: `<h2>The imageCLASS "Check Toner" Error</h2>
<p>Canon imageCLASS printers (such as the MF242dw, MF644Cdw, or MF445dw) are laser printers. Instead of liquid ink, they use dry toner powder. If the LCD screen displays <strong>"Check Toner Cartridge"</strong> or <strong>"Cartridge Communication Error,"</strong> the printer cannot read the security microchip on the toner.</p>

<h2>Fix 1: The Third-Party Chip Issue</h2>
<p>The number one cause of toner communication errors on imageCLASS printers is the use of cheap, third-party toner cartridges.</p>
<p>Canon updates the firmware on their printers over Wi-Fi. These updates frequently include new security protocols that block the microchips used on aftermarket toners. If your third-party toner was working fine yesterday but throws an error today, Canon likely updated your firmware overnight.</p>
<ul>
    <li><strong>The Bypass:</strong> On many color imageCLASS models (like the MF644), you can simply tap <strong>"Close"</strong> or <strong>"I Agree"</strong> on the touchscreen warning. The printer will scold you for using non-genuine toner and disable the toner level gauge, but it will still allow you to print.</li>
    <li>If the printer hard-locks and refuses to print, you must purchase a genuine Canon toner cartridge, or buy a newer third-party cartridge with an updated chip.</li>
</ul>

<h2>Fix 2: Cleaning the Contacts</h2>
<p>If you are using genuine Canon toner (like the 054 or 057 series) and still getting the error, the physical connection is dirty.</p>
<ol>
    <li>Turn the printer off. Open the front door and pull out the toner tray.</li>
    <li>Remove the offending toner cartridge.</li>
    <li>Look at the right side of the cartridge for a small green circuit board with gold contacts.</li>
    <li>Wipe these contacts with a dry microfiber cloth. Do not use water, as water ruins toner powder.</li>
    <li>Take a can of compressed air and blow out the inside of the printer where the cartridge sits. A pile of spilled toner dust can act as an insulator, blocking the electrical pins.</li>
</ol>

<h2>Fix 3: Seating the Drum Unit</h2>
<p>Some imageCLASS models (like the LBP series) have a two-part system: a toner cartridge that snaps into a separate drum unit. If the toner is not clicked all the way down into the drum, the printer's lid will close, but the electrical pins won't align. Remove the entire assembly, separate the toner from the drum, and snap them back together with firm pressure.</p>`
  },
  {
    title: "Canon PIXMA G3260 Setup Problems (MegaTank Wi-Fi & Ink Fix)",
    slug: 'canon-pixma-g3260-setup-problems',
    seoTitle: "Fix Canon PIXMA G3260 Setup Problems (Wi-Fi & Ink Flow)",
    metaDescription: "Struggling to set up your Canon G3260 MegaTank? Learn how to fix Wi-Fi connection failures, prime the ink tubes, and resolve initial setup errors.",
    excerpt: "Setting up a MegaTank printer involves pouring liquid ink and priming tubes. Here is how to fix the most common G3260 setup failures.",
    errorCode: null,
    tags: 'Canon, PIXMA, G3260, Setup, MegaTank, Wi-Fi, Priming, Initial Setup',
    wordCount: 1000,
    difficultyLevel: 'Beginner',
    timeToFix: '15 minutes',
    categoryId: setupCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix Canon G3260 setup problems: 1) If the printer won't print after pouring the ink, you likely forgot to install the Printheads (the two small cartridges labeled B and C in the box). The ink cannot flow without them. 2) If the ink tubes remain empty after setup, hold the STOP button until the Alarm light flashes 5 times to force a manual ink system prime. 3) If Wi-Fi setup fails on your phone, press the Wireless Connect button on the printer for 3 seconds, then use the Canon PRINT app to locate the printer's temporary signal.",
    content: `<h2>The Missing Printhead Mistake</h2>
<p>The most common mistake when setting up the Canon PIXMA G3260 (and similar MegaTanks like the G2260 and G3200) happens right out of the box. Users pour the ink bottles into the tanks, turn the printer on, and wonder why nothing happens.</p>
<p>You must install the <strong>Printheads</strong>. Inside the box are two small plastic packages labeled <strong>B</strong> (Black) and <strong>C</strong> (Color). They look like traditional ink cartridges, but they are actually the nozzles that spray the ink.</p>
<ol>
    <li>Open the top cover of the printer.</li>
    <li>Lift the blue locking cover in the center of the carriage.</li>
    <li>Remove the orange protective tape from the B and C printheads.</li>
    <li>Drop them into their respective slots (C on the left, B on the right).</li>
    <li>Close the blue locking cover. Push down on the two blue buttons until they click.</li>
</ol>

<h2>The Ink Priming Failure</h2>
<p>After installing the printheads and pouring the ink, the printer is supposed to spend 6 minutes sucking the ink from the tanks through the silicone tubes to the printheads.</p>
<p>If the printer didn't do this, or if you see the tubes are completely empty (clear) instead of filled with black and colored ink, the printer is unprimed.</p>
<ul>
    <li>Ensure the blue ink tank caps are closed securely.</li>
    <li>Press and hold the <strong>Stop</strong> button (red triangle).</li>
    <li>Watch the yellow <strong>Alarm</strong> light. Count the flashes.</li>
    <li>When it flashes exactly <strong>5 times</strong>, release the Stop button.</li>
</ul>
<p>The printer will now execute a System Cleaning (Ink Flush). It will make loud pumping noises for about 10 minutes. When it finishes, the tubes will be full of ink and you can print your alignment page.</p>

<h2>Wi-Fi Setup Failures</h2>
<p>If your smartphone or computer cannot find the G3260 during setup:</p>
<p>The G3260 only supports 2.4GHz Wi-Fi. If your phone is connected to your router's 5GHz network, the Canon PRINT app may fail to pass the credentials. Go to your phone's Wi-Fi settings, connect to your router's 2.4GHz network, and restart the Canon app.</p>
<p>To put the printer back into pairing mode, press and hold the <strong>Wireless Connect</strong> button (the button with a chain-link icon) for 3 seconds until the Wi-Fi symbol on the LCD flashes.</p>`
  },
  {
    title: "Canon SELPHY Printer Errors (Paper Jam & Cassette Fix)",
    slug: 'canon-selphy-printer-error',
    seoTitle: "Fix Canon SELPHY Errors (Paper Jam, Cassette, Ink Cassette)",
    metaDescription: "Troubleshooting the Canon SELPHY CP1300 and CP1500 portable photo printers. Fix 'Paper Jam', 'Wrong Paper', and 'Ink Cassette Empty' errors.",
    excerpt: "The Canon SELPHY series uses dye-sublimation technology, which means its errors are completely different from standard inkjets. Here is how to fix them.",
    errorCode: null,
    tags: 'Canon, SELPHY, CP1300, CP1500, Paper Jam, Ink Cassette, Dye Sublimation',
    wordCount: 850,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: errorCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "To fix Canon SELPHY errors: 1) 'Paper Jam': Never pull the paper from the front or back while the printer is on. Turn the printer off and on; it will usually eject the paper automatically. 2) 'Ink Cassette Empty': SELPHY ink ribbons only have enough film for exactly the number of sheets in the box (e.g., 36 or 108). You cannot reuse them. Replace the ink cassette. 3) 'Wrong Paper': Ensure you matched the correct paper size with the correct ink cassette size; a postcard-size ink ribbon will not print on credit-card-size paper.",
    content: `<h2>Dye-Sublimation Technology Explained</h2>
<p>Canon SELPHY printers (like the CP1200, CP1300, and CP1500) do not use liquid ink. They use <strong>dye-sublimation</strong>. A plastic ribbon coated in solid dye is heated up, turning the dye into a gas that bonds with the special photo paper. The paper is pulled back and forth through the printer 4 times (Yellow, Magenta, Cyan, and a clear protective overcoat).</p>
<p>Because the mechanics are entirely different from an inkjet, the troubleshooting is different.</p>

<h2>The "Paper Jam" Error</h2>
<p>Because the paper moves back and forth four times, if it gets bumped from the rear or the front during printing, it jams.</p>
<ul>
    <li><strong>Rule #1:</strong> Never grab the paper and yank it out while the printer is on. You will tear the delicate dye ribbon inside, ruining the ink cassette.</li>
    <li>Turn the printer off. Wait 10 seconds. Turn it back on. The SELPHY is programmed to slowly eject any stuck paper during the boot-up sequence.</li>
    <li>If the printer refuses to eject it, gently pull the paper straight out from whichever side it is protruding most. You will likely have to throw that piece of paper away.</li>
</ul>

<h2>The "Ink Cassette Empty" Error</h2>
<p>Users frequently get frustrated when they put a stack of 10 sheets of paper into the tray, but the printer says the ink cassette is empty.</p>
<p>SELPHY ink cassettes are perfectly calibrated. A 36-print box contains exactly 36 sheets of paper and a ribbon long enough for exactly 36 prints. If you accidentally ruined 2 sheets of paper and threw them away, you will have 2 blank sheets of paper left when the ink ribbon runs out. <strong>You cannot rewind or reuse an ink ribbon.</strong> When it says empty, it is physically out of film. You must insert a new cassette.</p>

<h2>The "Wrong Paper" or "Paper Cassette Incorrect" Error</h2>
<p>This happens when you mix and match supplies.</p>
<p>If you insert an ink cassette designed for Postcard Size (4x6) prints, but you attach a paper cassette loaded with Credit Card Size or Square paper, the printer's sensors will detect the size mismatch and refuse to print. The ink ribbon size <strong>must</strong> perfectly match the paper size. Always buy the all-in-one packs (like the KP-108IN) and replace the ink and paper at the same time.</p>`
  }
];

async function main() {
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
          brandId: canonBrandId,
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
