import { prisma } from '../src/lib/prisma';

const CANON_BRAND_ID = 'aa9e42c5-e0f0-4b60-b776-c39f46748c33';
const CAT_SCAN = '773cb788-7cd5-4a7b-93d9-5e1c8448aa7a'; // Scanning Issues
const CAT_ERRORS = '9fb9d26b-661e-4284-a4a7-d86d38e853df'; // Error Codes & Alerts
const CAT_PAPER = '9a42c554-2b4f-47f8-887e-5996fb83cbad'; // Paper Handling Issues
const CAT_CONNECT = 'c3a92d93-fcbb-439c-a11e-80cde3d2a5ce'; // Connectivity Issues
const CAT_MOBILE = '29cd3e5e-9873-48e6-bd83-6d2bdd8c531d'; // Mobile & Cloud Printing

const AUTHOR_DAVID = '1feb6d39-93c0-406c-818c-40dd1428aca6'; // David Chen
const AUTHOR_MARCUS = 'fba87e7e-2ed7-465e-bab3-875aaaecbf81'; // Marcus Vance
const AUTHOR_ALEX = '88e8d061-e1be-406d-8fa1-a53f108cc624'; // Alex Carter

const articles = [
  // 1. Scan to Email Setup
  {
    title: "Canon imageCLASS Scan to Email Setup Guide: SMTP, Gmail & Remote UI",
    slug: "canon-imageclass-scan-to-email-setup-guide",
    metaDescription: "Step-by-step guide to configuring Scan to Email on Canon imageCLASS laser printers using SMTP, Gmail app passwords, and the Remote UI portal.",
    brandId: CANON_BRAND_ID,
    categoryId: CAT_SCAN,
    authorId: AUTHOR_DAVID,
    featuredImage: "/images/printers/canon.webp",
    content: `<h2>Understanding Canon imageCLASS Scan to Email</h2>
<p>Canon imageCLASS multi-function laser printers can dispatch scanned PDF documents directly to recipient email addresses without a computer.</p>
<p>Because the printer acts as its own email client, you must configure SMTP server credentials, SSL/TLS encryption, and authentication tokens via the Canon Remote UI web portal.</p>

<h2>Step 1: Access the Canon Remote UI Web Portal</h2>
<p>Log into your printer's embedded web server using a computer on the same local network:</p>
<ol>
  <li><strong>Find your printer's IP address:</strong> On the imageCLASS touchscreen, tap <strong>Status Monitor</strong> &gt; <strong>Network Information</strong> &gt; <strong>IPv4</strong>.</li>
  <li><strong>Open Remote UI in your browser:</strong> Type <code>http://&lt;printer-ip&gt;</code> into Chrome, Firefox, or Safari.</li>
  <li><strong>Log in as System Manager:</strong> Select <strong>System Manager Mode</strong>. The factory default System Manager ID and PIN are both <code>7654321</code>.</li>
  <li><strong>Navigate to Email Settings:</strong> Click <strong>Settings/Registration</strong> &gt; <strong>Network Settings</strong> &gt; <strong>E-Mail/I-Fax Settings</strong>.</li>
</ol>

<h2>Step 2: Configure SMTP Server and Gmail App Passwords</h2>
<p>Standard email passwords are rejected by Gmail and Microsoft due to mandatory multi-factor authentication (MFA):</p>
<ol>
  <li><strong>Generate an App Password:</strong> For Gmail, go to Google Account Security &gt; 2-Step Verification &gt; App Passwords. Generate a 16-character token for "Canon Printer".</li>
  <li><strong>Enter SMTP Server Name:</strong> Type <code>smtp.gmail.com</code> (or <code>smtp.office365.com</code> for Microsoft 365).</li>
  <li><strong>Set the SMTP Port:</strong> Enter <strong>587</strong> (with STARTTLS) or <strong>465</strong> (with SSL/TLS).</li>
  <li><strong>Enable SMTP Authentication:</strong> Check <strong>Use SMTP Authentication (SMTP AUTH)</strong>. Enter your full email address and the 16-character App Password.</li>
  <li><strong>Set Default Sender Address:</strong> Enter your full email in the <strong>E-Mail Address</strong> box so receiving servers do not flag scans as spam.</li>
</ol>

<h2>Step 3: Configure DNS and Gateway Addresses</h2>
<p>The printer must resolve domain names over the internet to connect to Google's mail servers:</p>
<ol>
  <li><strong>Open TCP/IP Settings:</strong> In Remote UI, go to <strong>Network Settings</strong> &gt; <strong>TCP/IP Settings</strong> &gt; <strong>DNS Settings</strong>.</li>
  <li><strong>Set Primary DNS Server:</strong> Enter <code>8.8.8.8</code> (Google Public DNS) or <code>1.1.1.1</code> (Cloudflare).</li>
  <li><strong>Set Secondary DNS Server:</strong> Enter <code>8.8.4.4</code>.</li>
  <li><strong>Reboot the printer:</strong> Click <strong>OK</strong> and power cycle the printer so the new network routes take effect.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why do I get error #801 or #806 during scan to email?</summary>
  <p>Error #801 indicates incorrect SMTP authentication credentials. Error #806 indicates the recipient email address is blocked by the destination server or typed incorrectly.</p>
</details>
<details>
  <summary>Can I save frequent email recipients directly on the printer?</summary>
  <p>Yes. Go to Address Book in Remote UI or on the touchscreen to register one-touch speed dial buttons for frequent email contacts.</p>
</details>
<details>
  <summary>What causes error #753 when scanning to email?</summary>
  <p>Error #753 indicates the printer cannot reach the SMTP server. Verify your primary DNS address is set to 8.8.8.8 and your gateway IP address is correct.</p>
</details>`
  },

  // 2. Fax Error
  {
    title: "Canon imageCLASS Fax Error: Line Busy, Dialing & Transmission Faults",
    slug: "canon-imageclass-fax-error-fix",
    metaDescription: "Troubleshoot Canon imageCLASS fax transmission failures, error #0005, #0018, line busy errors, and VoIP digital phone line compatibility issues.",
    brandId: CANON_BRAND_ID,
    categoryId: CAT_ERRORS,
    authorId: AUTHOR_MARCUS,
    featuredImage: "/images/printers/canon.webp",
    content: `<h2>Understanding Canon imageCLASS Fax Transmission Errors</h2>
<p>Canon imageCLASS laser all-in-ones use an internal analog modem to send and receive faxes over telephone copper lines or VoIP adapters.</p>
<p>When faxes fail with error codes like <code>#0005</code> or <code>#0018</code>, the cause usually traces to incorrect jack wiring, VoIP packet jitter, or enabled Error Correction Mode (ECM).</p>

<h2>Step 1: Check Physical Phone Jack Wiring (LINE vs EXT)</h2>
<p>Plugging telephone cords into the wrong rear jack halts all communication:</p>
<ol>
  <li><strong>Inspect rear ports:</strong> Locate the two RJ-11 phone jacks on the rear panel of your imageCLASS unit.</li>
  <li><strong>Verify the LINE port:</strong> Connect the telephone line cord from your wall telephone jack directly into the port labeled <strong>LINE</strong>.</li>
  <li><strong>Check the EXT port:</strong> The <strong>EXT</strong> port is only for daisy-chaining an external telephone handset or answering machine. Never plug the wall line into EXT.</li>
  <li><strong>Use a 2-wire phone cord:</strong> Ensure you are using a standard 2-conductor RJ-11 phone cable rather than a 4-conductor digital PBX cord.</li>
</ol>

<h2>Step 2: Adjust Settings for VoIP and Digital Phone Lines</h2>
<p>Modern cable and fiber internet phone lines (VoIP) compress analog modem tones, causing handshake failures:</p>
<ol>
  <li><strong>Access Fax Settings:</strong> On the printer touchscreen, tap <strong>Menu</strong> &gt; <strong>Function Settings</strong> &gt; <strong>Fax Settings</strong>.</li>
  <li><strong>Lower the Baud Rate:</strong> Navigate to <strong>Transmission Settings</strong> &gt; <strong>TX Start Speed</strong>. Lower the speed from 33.6 kbps (V.34) down to <strong>9.6 kbps (V.29)</strong>.</li>
  <li><strong>Disable ECM (Error Correction Mode):</strong> Set <strong>ECM TX</strong> to <strong>OFF</strong>. VoIP latency frequently trips ECM checksum verification, aborting calls prematurely.</li>
  <li><strong>Adjust RX Start Speed:</strong> In Reception Settings, set <strong>RX Start Speed</strong> to 9.6 kbps as well.</li>
</ol>

<h2>Step 3: Decode Common imageCLASS Fax Error Codes</h2>
<p>Use the error number on the transmission report to isolate the fault:</p>
<ol>
  <li><strong>#0005 (Busy / No Answer):</strong> The recipient line is off the hook or busy. Increase Redial Count in Fax Settings.</li>
  <li><strong>#0018 (No Line Signal):</strong> The printer detects zero dial tone. Verify the phone cable is plugged into the LINE port and test dial tone with an analog phone.</li>
  <li><strong>#0001 (Paper Jam during Fax):</strong> Document feeder or paper cassette jammed mid-transmission. Clear paper and re-send.</li>
  <li><strong>#0003 (Document Too Long):</strong> Outgoing document exceeded transmission buffer size (over 20 pages). Send pages in smaller batches.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the printer fail to dial out when I press Send?</summary>
  <p>Check the Dialing Line Type setting. If your phone provider requires Touch-Tone, ensure the printer is set to Tone (not Pulse) in Menu &gt; Fax Settings.</p>
</details>
<details>
  <summary>Do I need a DSL filter for my Canon fax machine?</summary>
  <p>Yes. If your phone line carries broadband DSL internet, you must plug a microfilter into the wall jack and connect the printer to the phone side of the filter.</p>
</details>
<details>
  <summary>Can I receive faxes automatically without picking up a phone?</summary>
  <p>Yes. Set Receive Mode to "Auto" in Fax Settings. The printer will answer after a preset number of rings without requiring manual intervention.</p>
</details>`
  },

  // 3. Duplex Not Working
  {
    title: "Canon imageCLASS Duplex Printing Not Working? 2-Sided Driver & Sensor Fix",
    slug: "canon-imageclass-duplex-not-working-fix",
    metaDescription: "Fix Canon imageCLASS duplex printing not working or grayed out. Troubleshoot UFR II driver settings, paper tray limits, and duplex reversal jams.",
    brandId: CANON_BRAND_ID,
    categoryId: CAT_PAPER,
    authorId: AUTHOR_MARCUS,
    featuredImage: "/images/printers/canon.webp",
    content: `<h2>Why Canon imageCLASS Duplex Printing Fails</h2>
<p>Canon imageCLASS laser printers feature an internal paper turnaround unit that flips sheets for automatic two-sided (duplex) printing.</p>
<p>When the 2-Sided option is grayed out on your computer or paper jams immediately during sheet reversal, the issue stems from driver feature defaults or unsupported paper weights.</p>

<h2>Step 1: Enable the Duplexing Unit in Windows Printer Properties</h2>
<p>When Windows installs generic class drivers, it frequently disables the hardware duplex module by default:</p>
<ol>
  <li><strong>Open Printers &amp; Scanners:</strong> In Windows 11/10, open Settings &gt; Bluetooth &amp; devices &gt; <strong>Printers &amp; scanners</strong>.</li>
  <li><strong>Open Printer Properties:</strong> Click your Canon imageCLASS printer and select <strong>Printer properties</strong> (not Printing preferences).</li>
  <li><strong>Click Device Settings tab:</strong> Navigate to the <strong>Device Settings</strong> tab at the top.</li>
  <li><strong>Enable Duplexing Unit:</strong> Under Configuration Options, find <strong>Duplexing Unit</strong> and change it from "Not Installed" to <strong>Installed</strong>.</li>
  <li><strong>Apply changes:</strong> Click <strong>Apply</strong> and <strong>OK</strong>. The 2-Sided printing option will now appear active in all print dialogs.</li>
</ol>

<h2>Step 2: Check Supported Paper Weights and Dimensions</h2>
<p>The internal duplex turnaround flapper requires specific paper flexibility:</p>
<ol>
  <li><strong>Check paper weight:</strong> Duplex printing only supports standard paper between 16 lb bond and 28 lb bond (60 g/m² to 105 g/m²).</li>
  <li><strong>Unsupported duplex media:</strong> Never attempt two-sided printing on envelopes, labels, index cards, or heavy cardstock. These cause severe reversal roller jams.</li>
  <li><strong>Standard paper sizes only:</strong> Automatic duplexing is mechanically restricted to Letter, Legal, and A4. Custom dimensions or A5 sizes disable duplexing automatically.</li>
</ol>

<h2>Step 3: Inspect the Internal Duplex Reversal Flapper</h2>
<p>Paper dust or torn fragments can stick the internal reversal gate:</p>
<ol>
  <li><strong>Turn off the printer:</strong> Power down the unit and unplug the power cord.</li>
  <li><strong>Open the rear access door:</strong> Lower the rear cover and check the duplex reversal path.</li>
  <li><strong>Inspect the plastic flapper gate:</strong> Gently push the spring-loaded black plastic flapper with your finger. It should spring back freely without sticking.</li>
  <li><strong>Clean rubber feed rollers:</strong> Wipe the small gray rubber duplex transport rollers with a lint-free cloth dampened with water to remove slick paper powder.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why is the 2-Sided checkbox grayed out on my Mac?</summary>
  <p>If the printer was added via generic AirPrint rather than the official Canon UFR II driver, duplex options may not be communicated. Re-add the printer using the Canon driver.</p>
</details>
<details>
  <summary>Why does page 2 print upside down when duplexing?</summary>
  <p>In your print dialog, verify the Binding Edge setting. Use "Flip on Long Edge" for standard portrait orientation and "Flip on Short Edge" for landscape booklets.</p>
</details>
<details>
  <summary>Can I copy 2-sided documents using the scanner glass?</summary>
  <p>Yes. Select 2-Sided Copying on the screen. The printer will prompt you to scan side 1, flip the original on the glass, scan side 2, and print both sides automatically.</p>
</details>`
  },

  // 4. PictBridge Not Connecting
  {
    title: "Canon PictBridge Not Connecting to Camera? USB, Wi-Fi & Mode Fix",
    slug: "canon-pictbridge-not-connecting-camera-fix",
    metaDescription: "Troubleshoot Canon PictBridge camera connection failures. Fix USB communication modes, wireless DPS over IP pairing, and camera cable recognition.",
    brandId: CANON_BRAND_ID,
    categoryId: CAT_CONNECT,
    authorId: AUTHOR_DAVID,
    featuredImage: "/images/printers/canon.webp",
    content: `<h2>Understanding Canon PictBridge Communication</h2>
<p>PictBridge allows Canon digital cameras (EOS DSLR, Mirrorless, and PowerShot) to print directly to compatible PIXMA and SELPHY photo printers without a PC.</p>
<p>When the camera displays "Cannot connect to printer" or the direct print icon fails to illuminate, the fault is almost always camera USB mode configuration or conflicting wireless radios.</p>

<h2>Step 1: Switch Camera USB Mode to PTP / PictBridge</h2>
<p>By default, modern Canon cameras configure their USB port for computer file transfer or webcam streaming:</p>
<ol>
  <li><strong>Open Camera Menu:</strong> Turn on your Canon camera and press the <strong>Menu</strong> button.</li>
  <li><strong>Navigate to Set-Up (Wrench) Menu:</strong> Scroll to the Set-Up tab (yellow wrench icon).</li>
  <li><strong>Select USB Connection App:</strong> Find <strong>Choose USB connection app</strong> or <strong>Communication Method</strong>.</li>
  <li><strong>Switch from PC/Mac to Print (PTP):</strong> Change the setting from "Photo Import/Remote" to <strong>Print/PTP</strong> or <strong>PictBridge</strong>.</li>
  <li><strong>Reconnect the cable:</strong> Unplug the USB cable and reconnect it to re-initialize the PictBridge handshake.</li>
</ol>

<h2>Step 2: Disable Camera Wi-Fi and Bluetooth Radios</h2>
<p>Canon EOS cameras automatically disable their physical USB data ports while wireless functions are active:</p>
<ol>
  <li><strong>Open Wireless Settings:</strong> In the camera menu, navigate to <strong>Wi-Fi/Bluetooth settings</strong>.</li>
  <li><strong>Disable Wi-Fi:</strong> Set Wi-Fi to <strong>Disable</strong>. The camera's physical USB port cannot transmit print data while searching for smartphones.</li>
  <li><strong>Turn off Airplane Mode toggles:</strong> Ensure communication channels are clear of background smartphone sync attempts.</li>
</ol>

<h2>Step 3: Use a Dedicated USB Data Cable (Not Charge-Only)</h2>
<p>Generic charging cables lack the internal data lines needed for PTP print commands:</p>
<ol>
  <li><strong>Verify cable pins:</strong> Use the original Canon IFC cable or a certified 4-wire USB data cable (USB-A to USB Mini-B or USB-C).</li>
  <li><strong>Connect to dedicated PictBridge port:</strong> On PIXMA and SELPHY printers, plug the camera directly into the front USB port with the camera icon, not the square rear PC port.</li>
  <li><strong>Avoid USB hubs:</strong> Never connect the camera through USB extension cables or unpowered desktop hubs.</li>
</ol>

<h2>Step 4: Troubleshoot Wireless PictBridge (DPS over IP)</h2>
<p>If connecting your camera to the printer wirelessly over local Wi-Fi:</p>
<ol>
  <li><strong>Connect to the same 2.4 GHz network:</strong> Ensure both camera and printer are on the same 2.4 GHz Wi-Fi SSID.</li>
  <li><strong>Disable AP Isolation on router:</strong> Wireless Client Isolation on guest networks prevents the camera from discovering the printer's IP address.</li>
  <li><strong>Use Direct Ad-Hoc Connection:</strong> If router discovery fails, set the printer to Direct Connection mode and join the camera to the printer's direct Wi-Fi network.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does the printer say "No paper" when paper is loaded in PictBridge mode?</summary>
  <p>The paper size selected on the camera menu must match the paper cassette loaded in the printer. If the camera requests 4x6 but Letter paper is loaded, the job halts.</p>
</details>
<details>
  <summary>Can I print RAW camera files via PictBridge?</summary>
  <p>Most Canon printers only accept JPEG images. If shooting in RAW (.CR2/.CR3), use the camera's internal RAW Processing menu to export a JPEG before printing.</p>
</details>
<details>
  <summary>What does the blue direct print button on older Canon cameras do?</summary>
  <p>The blue button lights up when a PictBridge printer is detected. Pressing it immediately sends the currently viewed photo to the printer with default settings.</p>
</details>`
  },

  // 5. How to Print Directly from Canon Camera
  {
    title: "How to Print Directly from a Canon Camera: Cable, Wi-Fi & Settings Guide",
    slug: "how-to-print-directly-from-canon-camera-guide",
    metaDescription: "Step-by-step guide to printing photos directly from Canon EOS and PowerShot cameras to PIXMA and SELPHY printers using USB cable and Wi-Fi.",
    brandId: CANON_BRAND_ID,
    categoryId: CAT_MOBILE,
    authorId: AUTHOR_ALEX,
    featuredImage: "/images/printers/canon.webp",
    content: `<h2>Overview: Direct Camera-to-Printer Printing</h2>
<p>Canon digital cameras allow photographers to print high-resolution photos straight from camera playback mode to PIXMA and SELPHY printers without a computer or phone.</p>
<p>You can connect using a standard USB interface cable or over wireless Wi-Fi (Wireless PictBridge), adjusting cropping, borders, and color profiles directly on the camera LCD.</p>

<h2>Method 1: Print Directly via USB Cable</h2>
<p>The fastest and most reliable direct printing method requires only a USB cable:</p>
<ol>
  <li><strong>Power on both devices:</strong> Turn on your Canon printer and ensure paper and ink are loaded.</li>
  <li><strong>Connect USB cable:</strong> Connect your camera to the printer's front USB PictBridge port using the appropriate Canon interface cable.</li>
  <li><strong>Turn on the camera in Playback mode:</strong> Press the Playback button (triangle icon) to view your photos.</li>
  <li><strong>Look for the Print icon:</strong> A small printer icon will appear on the top-left of the camera screen, confirming a successful link.</li>
  <li><strong>Press the Set button:</strong> Press <strong>SET</strong> or tap the print icon to open the Print Settings menu.</li>
  <li><strong>Adjust print options:</strong> Select Paper Size (e.g. 4x6" or Letter), Bordered/Borderless, and Date Stamp.</li>
  <li><strong>Select Print:</strong> Highlight <strong>Print</strong> and press <strong>SET</strong>. The photo prints immediately.</li>
</ol>

<h2>Method 2: Print Wirelessly (Wi-Fi Camera Direct)</h2>
<p>Print without wires by pairing your Wi-Fi enabled EOS camera to the printer:</p>
<ol>
  <li><strong>Set printer to Direct Connection mode:</strong> On the printer, open Wi-Fi Settings and select <strong>Direct Connection</strong>. Note the SSID and password.</li>
  <li><strong>Open Camera Wireless Menu:</strong> In the camera menu, go to <strong>Wi-Fi function</strong> &gt; <strong>Print from Wi-Fi printer</strong>.</li>
  <li><strong>Select the printer network:</strong> Choose the printer's SSID from the list of detected networks and enter the password.</li>
  <li><strong>Select photos in playback:</strong> View the image you wish to print and press <strong>SET</strong>.</li>
  <li><strong>Confirm print parameters:</strong> Choose your paper layout and press <strong>Print</strong>.</li>
</ol>

<h2>In-Camera Image Cropping and Adjustments</h2>
<p>Canon cameras allow basic adjustments before sending the print payload:</p>
<ol>
  <li><strong>Cropping Tool:</strong> Press the zoom button while in the print settings screen to frame the exact portion of the image to print.</li>
  <li><strong>Paper Layout:</strong> Choose between Borderless, Bordered, or Multi-Image index prints (2-up, 4-up, 8-up on a single sheet).</li>
  <li><strong>Paper Type:</strong> Match the setting to your paper (e.g., Photo, Fast Photo, or Semi-Gloss) to ensure correct ink density.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I print unedited RAW files directly from my Canon camera?</summary>
  <p>Direct printing requires JPEG data. If you shoot RAW only, use the camera's built-in "RAW image processing" feature to convert the file to JPEG before printing.</p>
</details>
<details>
  <summary>Why does the printer crop off the top and bottom of my photo?</summary>
  <p>Most Canon DSLR and mirrorless sensors shoot at a 3:2 aspect ratio. If printing on standard Letter (8.5x11) paper (which is roughly 4:3), the edges will be cropped unless you choose "Bordered" layout.</p>
</details>
<details>
  <summary>Can I print photos from an SD card inserted directly into the printer?</summary>
  <p>Yes. If your Canon PIXMA or SELPHY printer has a built-in SD card slot, insert the memory card directly and select photos using the printer touchscreen.</p>
</details>`
  }
];

async function main() {
  console.log(`Publishing ${articles.length} Canon imageCLASS & Camera articles to the database...`);

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

  console.log("\nAll 5 new Canon articles are now live in the database!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
