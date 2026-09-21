import { prisma } from '../src/lib/prisma';

const HP_BRAND_ID = '47b0fd4a-2254-48f1-92c8-eb9e7a8657c6';
const CAT_EMAIL_PRINTING = 'bc923b23-65f7-4c0e-87d6-aef5337f9f4e'; // Email Printing

const AUTHOR_MARCUS = 'fba87e7e-2ed7-465e-bab3-875aaaecbf81'; // Marcus Vance
const AUTHOR_ELENA = '88de9646-6fd4-4e5d-817c-a8a1c0230866';  // Elena Rodriguez
const AUTHOR_DAVID = '1feb6d39-93c0-406c-818c-40dd1428aca6';  // David Chen
const AUTHOR_ALEX = '88e8d061-e1be-406d-8fa1-a53f108cc624';   // Alex Carter

const articles = [
  // 1. How to Print Multiple Gmail Emails at Once
  {
    title: "How to Print Multiple Gmail Emails at Once: Batch Printing Guide",
    slug: "print-multiple-gmail-emails-at-once-guide",
    metaDescription: "Learn how to batch print multiple Gmail emails at once without opening them individually. Use Google Drive PDF merges, browser extensions, and mail clients.",
    brandId: HP_BRAND_ID,
    categoryId: CAT_EMAIL_PRINTING,
    authorId: AUTHOR_ALEX,
    featuredImage: "/images/printers/hp.webp",
    content: `<h2>Overcoming Gmail's Native Printing Limit</h2>
<p>Gmail is built for screen reading and lacks a single native button to bulk print selected messages. Checking multiple boxes in your inbox only reveals bulk actions for archiving, labeling, or deleting.</p>
<p>When legal discovery, tax auditing, or business travel demands printing dozens of emails, opening each message individually wastes hours. Several reliable workflows bypass this interface bottleneck.</p>

<h2>Method 1: Connect Gmail to Thunderbird or Outlook Desktop</h2>
<p>Syncing your Gmail account with a standard desktop email client enables native multi-select batch printing:</p>
<ol>
  <li><strong>Enable IMAP in Gmail:</strong> Open Gmail settings in your browser, navigate to <strong>Forwarding and POP/IMAP</strong>, and ensure <strong>Enable IMAP</strong> is checked.</li>
  <li><strong>Add account to Thunderbird:</strong> Open Mozilla Thunderbird or Microsoft Outlook and sign in with your Google credentials via OAuth.</li>
  <li><strong>Select multiple messages:</strong> Hold the <strong>Ctrl</strong> key (or <strong>Cmd</strong> on Mac) and click each email you need to print.</li>
  <li><strong>Execute batch print:</strong> Right-click the highlighted emails and choose <strong>Print</strong>. The desktop client spools every message sequentially to your physical printer.</li>
</ol>

<h2>Method 2: Export and Merge Multiple Emails via Google Drive</h2>
<p>Consolidating messages into a single merged PDF file allows one-click printing without third-party desktop software:</p>
<ol>
  <li><strong>Apply a dedicated label:</strong> Create a temporary label in Gmail (e.g., <code>BatchPrint</code>) and tag all target emails.</li>
  <li><strong>Use Google Workspace Marketplace Add-on:</strong> Install an add-on such as "Save Emails and Attachments" to export labeled emails to Google Drive as separate PDFs.</li>
  <li><strong>Merge files in Drive:</strong> Highlight the exported PDFs in your Drive folder, right-click, and select <strong>Merge to Single PDF</strong>.</li>
  <li><strong>Print the consolidated file:</strong> Open the merged PDF document in your browser or Acrobat and send the full job to your printer.</li>
</ol>

<h2>Method 3: Use Chrome Extensions for One-Click Batch Printing</h2>
<p>Browser add-ons automate the background spooling of multiple Gmail conversations directly inside Chrome:</p>
<ol>
  <li><strong>Install a verified extension:</strong> Add "Multi Email Forward &amp; Print for Gmail" from the Chrome Web Store.</li>
  <li><strong>Select messages via checkboxes:</strong> Select the checkboxes next to the target emails in your Gmail inbox view.</li>
  <li><strong>Click the batch print icon:</strong> Click the new printer icon added to the top Gmail toolbar.</li>
  <li><strong>Configure page margins:</strong> In the generated print preview window, review formatting and send the consolidated document to your printer.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Can I print multiple Gmail emails natively without add-ons?</summary>
  <p>No, the native Gmail web interface requires opening each message or conversation thread individually to access the print button.</p>
</details>
<details>
  <summary>Why does Thunderbird print duplicate headers on each email?</summary>
  <p>Thunderbird treats each message as an independent document; you can disable header printing in Thunderbird page setup preferences.</p>
</details>
<details>
  <summary>Does batch printing include attached PDF files automatically?</summary>
  <p>Standard email printing only prints the body text; attachments must be batch printed through an attachment workflow.</p>
</details>`,
  },

  // 2. How to Print an Entire Email Thread in Gmail & Outlook
  {
    title: "How to Print an Entire Email Thread in Gmail & Outlook: Complete Guide",
    slug: "print-entire-email-thread-gmail-outlook-guide",
    metaDescription: "Print full email conversation threads in Gmail and Outlook without missing replies. Learn the single-email vs thread print icon and clean pagination tricks.",
    brandId: HP_BRAND_ID,
    categoryId: CAT_EMAIL_PRINTING,
    authorId: AUTHOR_MARCUS,
    featuredImage: "/images/printers/hp.webp",
    content: `<h2>Understanding Email Thread Printing</h2>
<p>Modern webmail clients automatically group related messages into unified conversation threads. However, clicking the wrong print icon often results in printing only the latest reply instead of the full chain.</p>
<p>To capture the complete conversation history for contracts, disputes, or documentation, you must use the top-level conversation print trigger.</p>

<h2>Step 1: Print Full Threads in Gmail Web</h2>
<p>Gmail features two distinct print icons that produce entirely different print outputs:</p>
<ol>
  <li><strong>Open the conversation thread:</strong> Click on the email subject in your inbox to open the multi-message discussion.</li>
  <li><strong>Expand all folded replies:</strong> Click the <strong>Expand All</strong> icon (two small overlapping arrows) at the top right so no collapsed messages are omitted.</li>
  <li><strong>Click the top-level printer icon:</strong> Click the dedicated printer icon in the upper-right corner next to "In new window". Do not use the 3-dots menu inside an individual message box.</li>
  <li><strong>Confirm all replies appear:</strong> Verify in the browser print preview that every response in the chain appears sequentially.</li>
</ol>

<h2>Step 2: Print Full Email Threads in Outlook Web (OWA)</h2>
<p>Outlook on the web organizes conversations chronologically inside the reading pane:</p>
<ol>
  <li><strong>Select the conversation header:</strong> Click the parent conversation header in your message list.</li>
  <li><strong>Click the top toolbar More menu:</strong> Click the three horizontal dots (<strong>...</strong>) on the main ribbon toolbar above the message view.</li>
  <li><strong>Select Print Conversation:</strong> Choose <strong>Print</strong> &gt; <strong>Print Conversation</strong> to spool the entire back-and-forth chain.</li>
  <li><strong>Avoid single message print:</strong> Clicking the three dots inside an individual reply bubble will only print that single message.</li>
</ol>

<h2>Step 3: Print Message Chains in Outlook Desktop (Windows &amp; Mac)</h2>
<p>Desktop Outlook provides powerful layout customization for full conversation histories:</p>
<ol>
  <li><strong>Open the full message:</strong> Double-click the conversation to open it in a dedicated Outlook window.</li>
  <li><strong>Navigate to Print Options:</strong> Click <strong>File</strong> &gt; <strong>Print</strong> in the top menu bar.</li>
  <li><strong>Select Memo Style:</strong> Under Print Settings, choose <strong>Memo Style</strong> to format the message and all attached replies with clean date dividers.</li>
  <li><strong>Preview page breaks:</strong> Check the preview window to ensure reply text does not break awkwardly across page edges before printing.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why did my printout only show the last email reply?</summary>
  <p>You clicked the print option inside the individual reply bubble rather than the global "Print All" icon on the conversation header.</p>
</details>
<details>
  <summary>How do I prevent printing 10 pages of repeated quoted text?</summary>
  <p>Before printing, collapse quoted text blocks using the three horizontal dots at the bottom of each reply in Gmail.</p>
</details>
<details>
  <summary>Can I print a thread in reverse chronological order?</summary>
  <p>Gmail prints threads strictly chronologically from oldest to newest; reversing the order requires using desktop Outlook sorting rules.</p>
</details>`,
  },

  // 3. How to Print Emails Without Headers, Footers, or Ads
  {
    title: "How to Print Emails Without Headers, Footers, or Ads: Clean Print Guide",
    slug: "print-emails-without-headers-footers-ads-guide",
    metaDescription: "Learn how to print clean emails without top header URLs, timestamps, page footers, or sidebar ads. Configure Chrome, Safari, Edge, and email clients.",
    brandId: HP_BRAND_ID,
    categoryId: CAT_EMAIL_PRINTING,
    authorId: AUTHOR_ELENA,
    featuredImage: "/images/printers/hp.webp",
    content: `<h2>Eliminating Unwanted Clutter from Email Printouts</h2>
<p>When you print an email from a web browser, the default layout engine frequently stamps distracting clutter onto the page. This includes web addresses, timestamps, page numbering, and sidebar graphics.</p>
<p>Disabling these browser injections produces clean, professional documents suitable for court submissions, client presentations, and permanent filing.</p>

<h2>Step 1: Disable Browser Headers and Footers</h2>
<p>Web browsers automatically add page URLs and date stamps in the margin borders of print jobs:</p>
<ol>
  <li><strong>Open the email print dialog:</strong> In Gmail, Outlook, or Yahoo, click the in-app <strong>Print</strong> button to launch your system print window.</li>
  <li><strong>Expand More Settings:</strong> In Google Chrome, Microsoft Edge, or Brave, click <strong>More settings</strong> in the print preview sidebar.</li>
  <li><strong>Uncheck Headers and footers:</strong> Deselect the <strong>Headers and footers</strong> checkbox. This immediately removes the top URL and bottom date/time stamps.</li>
  <li><strong>Uncheck Background graphics:</strong> Ensure <strong>Background graphics</strong> is unchecked so colored webmail backgrounds do not waste expensive color toner.</li>
</ol>

<h2>Step 2: Strip Webmail Interface Banners Using Print Selection</h2>
<p>If printing directly from a webmail window attempts to print navigation folders and sidebars:</p>
<ol>
  <li><strong>Highlight target text:</strong> Use your mouse cursor to highlight only the specific email text, subject, and sender information you need.</li>
  <li><strong>Open browser print:</strong> Press <strong>Ctrl + P</strong> (or <strong>Cmd + P</strong> on Mac) to open the browser print dialog.</li>
  <li><strong>Select Selection Only:</strong> Under print options, check <strong>Selection only</strong> (or choose <em>Print Selection</em>).</li>
  <li><strong>Inspect preview:</strong> Verify that only the highlighted email content is rendered, omitting all surrounding web page navigation elements.</li>
</ol>

<h2>Step 3: Remove Email Signature Disclaimers and Privacy Notes</h2>
<p>Long corporate legal disclaimers often add an entire blank or near-empty extra sheet of paper:</p>
<ol>
  <li><strong>Open print preview:</strong> Check the page count in your print preview window.</li>
  <li><strong>Specify page range:</strong> If a multi-paragraph privacy disclaimer spans onto page 3, set the <strong>Pages</strong> option from "All" to custom (e.g., <code>1-2</code>).</li>
  <li><strong>Save paper and toner:</strong> Limiting the page range excludes unnecessary legal boilerplate without modifying the original email.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>How do I remove the web URL printed at the bottom of the page?</summary>
  <p>In your browser print dialog, expand More Settings and uncheck the "Headers and footers" checkbox.</p>
</details>
<details>
  <summary>Why is my printer using black toner for white background areas?</summary>
  <p>Disable "Background graphics" in the print settings to prevent the browser from rasterizing web backgrounds.</p>
</details>
<details>
  <summary>Can I print an email in Safari on Mac without the date stamp?</summary>
  <p>Yes, in the Safari print dialog, uncheck "Print headers and footers" in the options pane.</p>
</details>`,
  },

  // 4. How to Batch Print Email PDF Attachments Without Opening Each One
  {
    title: "How to Batch Print Email PDF Attachments Without Opening Each One",
    slug: "batch-print-email-pdf-attachments-guide",
    metaDescription: "Batch print multiple PDF email attachments from Gmail and Outlook without downloading each file. Use desktop rules, Google Drive bulk print, and Windows spoolers.",
    brandId: HP_BRAND_ID,
    categoryId: CAT_EMAIL_PRINTING,
    authorId: AUTHOR_DAVID,
    featuredImage: "/images/printers/hp.webp",
    content: `<h2>The Challenge of Multi-Attachment Printing</h2>
<p>Receiving multiple purchase orders, invoices, or signed contracts across multiple emails requires opening and printing each PDF individually. This repetitive process is slow and introduces human error.</p>
<p>Using desktop automated spooling, email client rules, or cloud storage workflows allows you to queue dozens of PDF attachments to your printer in seconds.</p>

<h2>Method 1: Use Outlook Quick Print on Multiple Messages</h2>
<p>Microsoft Outlook Desktop includes a native command to print attachments across multiple highlighted emails:</p>
<ol>
  <li><strong>Highlight target messages:</strong> Hold the <strong>Ctrl</strong> key and select each email containing the PDF attachments you need to print.</li>
  <li><strong>Right-click selection:</strong> Right-click on any of the highlighted emails in your message list.</li>
  <li><strong>Select Quick Print:</strong> Click <strong>Quick Print</strong> from the context menu.</li>
  <li><strong>Confirm attachment prompt:</strong> Outlook prompts: "Do you want to open or print attachments?" Click <strong>Print</strong> to send every PDF attachment to your default printer without opening viewer windows.</li>
</ol>

<h2>Method 2: Batch Print via Windows Print Queue Drag-and-Drop</h2>
<p>If you use Gmail or webmail, downloading attachments into a single folder enables fast system-level spooling:</p>
<ol>
  <li><strong>Download attachments to a folder:</strong> Save all incoming email attachments into a temporary desktop folder.</li>
  <li><strong>Open your printer queue:</strong> In Windows, go to <strong>Settings</strong> &gt; <strong>Bluetooth &amp; devices</strong> &gt; <strong>Printers &amp; scanners</strong>, select your printer, and click <strong>Open queue</strong>.</li>
  <li><strong>Select all PDF files:</strong> In your downloads folder, press <strong>Ctrl + A</strong> to highlight all PDF documents.</li>
  <li><strong>Drag into the queue window:</strong> Drag the highlighted files and drop them directly into the open printer queue window. Windows automatically spools and prints each PDF sequentially.</li>
</ol>

<h2>Method 3: Batch Print via Google Drive Sync</h2>
<p>For Chromebook and Google Workspace users without desktop email clients:</p>
<ol>
  <li><strong>Save attachments to Google Drive:</strong> In Gmail, click the <strong>Save all to Drive</strong> icon on each message to pool PDFs into a dedicated Drive folder.</li>
  <li><strong>Select all files in Drive:</strong> Open Google Drive, hold <strong>Shift</strong>, and select all stored PDF attachments.</li>
  <li><strong>Click Print:</strong> Press <strong>Ctrl + P</strong>. Google Drive automatically merges the selected PDFs into a single unified print preview job for seamless output.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Will Outlook Quick Print also print the body of the email?</summary>
  <p>Outlook prompts you to print either the attachment only or both the message body and the attached document.</p>
</details>
<details>
  <summary>How many PDFs can I drag into the Windows print queue at once?</summary>
  <p>You can drag up to 15 PDFs at a time; larger batches should be queued in smaller groups to prevent memory buffer overruns.</p>
</details>
<details>
  <summary>Can I batch print password-protected PDF attachments?</summary>
  <p>No, encrypted PDFs require entering the password in a viewer before the print stream can be decrypted and sent to the printer.</p>
</details>`,
  },

  // 5. Print Emails from iPhone Mail & Android Gmail to Any Wireless Printer
  {
    title: "Print Emails from iPhone Mail & Android Gmail to Any Wireless Printer",
    slug: "print-emails-from-iphone-android-wireless-printer-guide",
    metaDescription: "Step-by-step guide to print emails and attachments from Apple Mail on iPhone/iPad and Gmail on Android. Connect via AirPrint, Mopria, and Wi-Fi Direct.",
    brandId: HP_BRAND_ID,
    categoryId: CAT_EMAIL_PRINTING,
    authorId: AUTHOR_ALEX,
    featuredImage: "/images/printers/hp.webp",
    content: `<h2>Wireless Email Printing from Smartphones</h2>
<p>Modern mobile operating systems make printing emails, receipts, and boarding passes straightforward without turning on a computer. Both iOS and Android feature built-in driverless printing standards.</p>
<p>Apple devices utilize native AirPrint technology, while Android devices use the Mopria Alliance Print Service to discover and print to almost any modern Wi-Fi printer.</p>

<h2>Step 1: Print from Apple Mail on iPhone and iPad</h2>
<p>Apple Mail integrates directly with AirPrint-certified network printers:</p>
<ol>
  <li><strong>Open the target email:</strong> Open the Apple Mail app and tap the message you wish to print.</li>
  <li><strong>Tap the Reply / Share arrow:</strong> Tap the curved arrow icon at the bottom right corner of the screen.</li>
  <li><strong>Select Print:</strong> Scroll down the action sheet and tap <strong>Print</strong>.</li>
  <li><strong>Choose your printer:</strong> Tap <strong>Select Printer</strong> and tap your wireless printer from the discovered AirPrint list.</li>
  <li><strong>Adjust settings:</strong> Set your copy count, color mode, and page range, then tap <strong>Print</strong> in the upper-right corner.</li>
</ol>

<h2>Step 2: Print from the Gmail App on iOS (iPhone / iPad)</h2>
<p>The Gmail iOS app uses an in-message action menu rather than the system share sheet:</p>
<ol>
  <li><strong>Open the email message:</strong> Navigate to the email you need inside the Gmail app.</li>
  <li><strong>Tap the three dots:</strong> Tap the horizontal three dots (<strong>...</strong>) located in the upper-right corner of the email card.</li>
  <li><strong>Select Print:</strong> Tap <strong>Print</strong> &gt; <strong>AirPrint</strong>.</li>
  <li><strong>Send to printer:</strong> Choose your AirPrint-enabled printer and tap <strong>Print</strong>.</li>
</ol>

<h2>Step 3: Print from Gmail on Android Devices</h2>
<p>Android devices discover local network printers using the Default Print Service or Mopria plugin:</p>
<ol>
  <li><strong>Open the email in Gmail:</strong> Open the specific email you want to print in the Android Gmail app.</li>
  <li><strong>Open the message menu:</strong> Tap the vertical three dots (<strong>⋮</strong>) in the top-right corner of the message header (next to the reply icon).</li>
  <li><strong>Tap Print:</strong> Select <strong>Print</strong> from the dropdown list.</li>
  <li><strong>Select your printer:</strong> Tap the top printer dropdown (which may initially say "Save as PDF") and select your active Wi-Fi printer.</li>
  <li><strong>Tap the Printer icon:</strong> Confirm your paper size and orientation, then tap the yellow/blue circular printer icon to print.</li>
</ol>

<h2>Step 4: Print Without a Wi-Fi Router via Wi-Fi Direct</h2>
<p>If you are away from home or your office Wi-Fi router is offline:</p>
<ol>
  <li><strong>Enable Wi-Fi Direct on printer:</strong> Press the Wi-Fi Direct button on your printer control panel to turn on its local wireless beacon.</li>
  <li><strong>Connect your phone to printer network:</strong> Open Wi-Fi settings on your phone and join the printer's direct SSID (e.g., <code>DIRECT-xx-HP DeskJet</code>).</li>
  <li><strong>Enter default password:</strong> Enter the Wi-Fi Direct password shown on the printer display or printed network test sheet (typically <code>12345678</code>).</li>
  <li><strong>Print normally:</strong> Return to Mail or Gmail and send your print job directly across the direct peer-to-peer connection.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<details>
  <summary>Why does my iPhone say "No AirPrint Printers Found"?</summary>
  <p>Ensure your iPhone and printer are connected to the exact same Wi-Fi network and that the printer is on a 2.4 GHz network band.</p>
</details>
<details>
  <summary>How do I print an attachment from an email on my phone?</summary>
  <p>Tap the attachment to open its full preview, tap the Share or Three Dots icon, and select Print directly from the document viewer.</p>
</details>
<details>
  <summary>Do I need to install a special manufacturer app to print emails from Android?</summary>
  <p>No, standard Android devices include the Default Print Service; manufacturer apps (like HP Smart or Canon PRINT) are optional.</p>
</details>`,
  },
];

async function publishEmailPrintingHub() {
  console.log(`Publishing ${articles.length} Email Printing Hub articles...`);

  for (const item of articles) {
    const wordCount = item.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    const excerpt = item.metaDescription;

    const published = await prisma.article.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        metaDescription: item.metaDescription,
        excerpt,
        content: item.content,
        wordCount,
        brandId: item.brandId,
        categoryId: item.categoryId,
        authorId: item.authorId,
        featuredImage: item.featuredImage,
        status: 'published',
        publishedAt: new Date(),
      },
      create: {
        title: item.title,
        slug: item.slug,
        metaDescription: item.metaDescription,
        excerpt,
        content: item.content,
        wordCount,
        brandId: item.brandId,
        categoryId: item.categoryId,
        authorId: item.authorId,
        featuredImage: item.featuredImage,
        status: 'published',
        publishedAt: new Date(),
      },
    });

    console.log(`✓ Published: [${published.slug}] "${published.title}" (${wordCount} words)`);
  }

  console.log('All Email Printing Hub articles published successfully!');
}

publishEmailPrintingHub()
  .catch((err) => {
    console.error('Error publishing articles:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
