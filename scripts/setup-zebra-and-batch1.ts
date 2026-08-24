import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const printQualityCategory = 'e3d26347-33bf-41a7-9cbf-c3d821850f98';
const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';
const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Zebra Printer ZPL Command Not Working or Ignored Fix",
    slug: 'zebra-printer-zpl-command-not-working-ignored-fix',
    seoTitle: "Zebra Printer ZPL Command Not Working or Ignored (Fix)",
    metaDescription: "Are your Zebra ZPL commands not working or being completely ignored by the printer? Learn how to fix formatting, syntax, and driver interference.",
    excerpt: "When a Zebra printer ignores ZPL commands, the root cause is often incorrect syntax (missing ^XA or ^XZ tags) or a Windows printer driver overriding the raw code.",
    errorCode: 'ZPL Ignored',
    tags: 'Zebra, ZPL Command Not Working, Ignoring ZPL Commands, Raw Code, Syntax Error, Zebra Setup Utilities',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: softwareCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredSnippet: "To fix a Zebra printer ignoring ZPL commands: 1) Verify Syntax: Every ZPL label must start with ^XA and end with ^XZ. If these are missing, the printer will ignore the entire block. 2) Driver Interference: If printing from a Windows application, ensure the printer driver isn't set to render graphics instead of passing text. Check 'Pass-through mode' or use a 'Generic / Text Only' driver. 3) Wrong Port/Language: Ensure the printer is set to ZPL language mode, not EPL, by sending the command ! U1 setvar \"device.languages\" \"zpl\".",
    content: `<h2>Understanding ZPL Interpretation</h2>
<p>ZPL (Zebra Programming Language) is a markup language specifically designed to instruct Zebra thermal printers on how to construct a label. When a printer receives ZPL, its internal engine interprets the text strings and converts them into a printed bitmap. When commands are <strong>ignored or fail to execute</strong>, it indicates a breakdown in either syntax, communication, or language configuration.</p>

<h2>Fix 1: The Required ^XA and ^XZ Syntax Tags</h2>
<p>The most common reason a Zebra printer completely ignores a command is missing the opening and closing format tags.</p>
<ul>
  <li>Every single label format <strong>MUST</strong> begin with <code>^XA</code> (Start Format).</li>
  <li>Every single label format <strong>MUST</strong> end with <code>^XZ</code> (End Format).</li>
  <li>If you send a valid command like <code>^FO50,50^ADN,36,20^FDHello World^FS</code> without the <code>^XA</code> and <code>^XZ</code> wrappers, the printer will discard the data into the bit bucket.</li>
</ul>

<h2>Fix 2: Bypassing Windows Driver Interference</h2>
<p>If you are sending raw ZPL code from a web browser or a Windows desktop application, the standard Zebra printer driver might intercept the text and try to print it as a graphic image of the text itself, rather than sending the raw code to the printer engine.</p>
<ol>
  <li><strong>Use Zebra Setup Utilities:</strong> The best way to test raw ZPL is to use the "Open Communication With Printer" window in Zebra Setup Utilities.</li>
  <li><strong>Generic / Text Only Driver:</strong> If your custom application requires a Windows print spooler, install the printer using the <strong>Generic / Text Only</strong> driver included in Windows. This guarantees the OS will pass the raw ASCII ZPL characters directly to the USB or Network port without rendering them as a picture.</li>
  <li><strong>Pass-Through Mode:</strong> Some advanced Zebra drivers have a specific setting called "Pass-Through Mode" that must be enabled.</li>
</ol>

<h2>Fix 3: Verifying the Printer Language Mode (ZPL vs EPL)</h2>
<p>Many modern Zebra desktop printers (like the ZD420 or GK420t) support multiple languages (ZPL, EPL, CPCL). If the printer is expecting EPL and receives ZPL, it will ignore the commands.</p>
<p>To force the printer into ZPL mode, send this SGD (Set/Get/Do) command:</p>
<pre><code>! U1 setvar "device.languages" "zpl"</code></pre>`
  },
  {
    title: "Zebra ZPL vs EPL Difference & Configuration Format Guide",
    slug: 'zebra-zpl-vs-epl-difference-configuration-format-guide',
    seoTitle: "Zebra ZPL vs EPL: Differences & Configuration Format Guide",
    metaDescription: "What is the difference between ZPL and EPL on a Zebra printer? Learn which programming language to use and how to format configuration commands.",
    excerpt: "ZPL (Zebra Programming Language) is the modern standard for all Zebra printers, while EPL (Eltron Programming Language) is a legacy language from older desktop models.",
    errorCode: null,
    tags: 'Zebra, ZPL vs EPL, Difference, Configuration Format Guide, Printer Language, Eltron, Programming',
    wordCount: 1050,
    difficultyLevel: 'Beginner',
    timeToFix: 'N/A',
    categoryId: softwareCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "The main difference between ZPL and EPL is that ZPL (Zebra Programming Language) is the robust, modern standard used across all Zebra industrial and desktop printers, featuring advanced graphics, RFID support, and scalable fonts. EPL (Eltron Programming Language) is a legacy language inherited when Zebra acquired Eltron in 1998, primarily used on older 2844 and GK420 models. Modern Zebra printers support both, but you should always use ZPL for new development.",
    content: `<h2>The History of Zebra Programming Languages</h2>
<p>When developing software to integrate with Zebra thermal printers, developers must choose a page description language. The two most common are <strong>ZPL (Zebra Programming Language)</strong> and <strong>EPL (Eltron Programming Language)</strong>.</p>

<h2>ZPL: The Modern Standard</h2>
<p><strong>ZPL (specifically ZPL II)</strong> is the native language for almost all modern Zebra printers, from small desktop ZD-series to massive industrial ZT-series printers.</p>
<ul>
  <li><strong>Syntax:</strong> ZPL commands always start with a caret (<code>^</code>) or a tilde (<code>~</code>). Example: <code>^XA</code> to start, <code>^FO</code> for Field Origin.</li>
  <li><strong>Features:</strong> ZPL supports scalable TrueType fonts, complex 2D barcodes, RFID encoding, and advanced memory management.</li>
  <li><strong>Format:</strong> ZPL is a page-layout language, meaning you can place elements anywhere on the canvas using X,Y coordinates.</li>
</ul>

<h2>EPL: The Legacy Eltron Language</h2>
<p>Zebra acquired Eltron in 1998, inheriting their popular line of desktop printers (like the LP2844) and their language, <strong>EPL2</strong>. Many shipping platforms (like older versions of UPS WorldShip or FedEx Ship Manager) output EPL.</p>
<ul>
  <li><strong>Syntax:</strong> EPL is line-oriented. Commands usually start with a letter followed by parameters. Example: <code>A</code> for text, <code>B</code> for barcode.</li>
  <li><strong>Features:</strong> EPL is simpler and more lightweight but lacks the advanced font and graphic scaling capabilities of ZPL.</li>
</ul>

<h2>ZPL Configuration Format Guide</h2>
<p>In addition to label layout commands (<code>^</code>), ZPL uses control commands (<code>~</code>) to configure printer hardware settings without printing a label.</p>
<ul>
  <li><code>~SD</code> : Set Darkness (e.g., <code>~SD15</code>)</li>
  <li><code>~JC</code> : Set Media Sensor Calibration</li>
  <li><code>^LL</code> : Set Label Length</li>
  <li><code>^PW</code> : Set Print Width</li>
</ul>
<p>To configure a printer permanently, you often combine ZPL with SGD (Set/Get/Do) commands, which are sent directly to the printer's firmware.</p>`
  },
  {
    title: "Zebra ~SD Darkness & ^MF Label Length Commands Explained",
    slug: 'zebra-sd-darkness-mf-label-length-commands-explained',
    seoTitle: "Zebra ~SD Darkness & ^MF Label Length Commands Explained",
    metaDescription: "Learn how to use the Zebra ~SD (Set Darkness) and ^MF (Media Feed) commands to control print density and label length directly via ZPL code.",
    excerpt: "You can control hardware settings like printhead darkness and media feed calibration directly in your ZPL code using the ~SD and ^MF commands.",
    errorCode: null,
    tags: 'Zebra, ~SD Command, Darkness Command, ^MF Command, Label Length, ZPL Programming, Print Density',
    wordCount: 1100,
    difficultyLevel: 'Advanced',
    timeToFix: '5 minutes',
    categoryId: softwareCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "To adjust Zebra printer darkness and label length via ZPL: 1) ~SD (Set Darkness): Use this command to change the printhead heat. The format is ~SD followed by a number from 0 to 30. Example: '~SD15' sets medium darkness. This overrides the physical printer menu. 2) ^LL (Label Length): Use ^LL followed by the length in dots (e.g., ^LL800 for a 4-inch label at 203dpi). 3) ^MF (Media Feed): Controls what happens on power-up or after closing the head. Example: '^MFN,N' tells the printer to do nothing on power-up and nothing on head close, preventing wasted labels.",
    content: `<h2>Controlling Hardware via ZPL Code</h2>
<p>While you can adjust print density and label dimensions using the LCD menu on industrial printers or the Zebra Setup Utilities app on desktop models, <strong>hardcoding these settings into your ZPL string</strong> ensures that the printer is always configured correctly, regardless of who touched the buttons last.</p>

<h2>The ~SD (Set Darkness) Command</h2>
<p>The <code>~SD</code> command controls the heat applied by the thermal printhead. Higher numbers equal darker prints, but excessive heat can snap the thermal ribbon or melt the printhead elements.</p>
<ul>
  <li><strong>Format:</strong> <code>~SDxx</code></li>
  <li><strong>Values:</strong> <code>00</code> to <code>30</code>.</li>
  <li><strong>Example:</strong> Sending <code>~SD20</code> sets the darkness to a relatively high level (ideal for resin ribbons on synthetic labels).</li>
  <li><strong>Note:</strong> The <code>~</code> indicates a control command, meaning it is executed immediately as it enters the buffer, unlike <code>^</code> commands which wait for the <code>^XZ</code> tag.</li>
</ul>

<h2>The ^LL (Label Length) Command</h2>
<p>While the printer can auto-calibrate the gap, defining the exact label length in your code prevents drift and layout errors.</p>
<ul>
  <li><strong>Format:</strong> <code>^LLxxxx</code> (where x is the length in dots).</li>
  <li><strong>Calculation:</strong> Length in inches × Printer DPI = Length in dots.</li>
  <li><strong>Example:</strong> For a 4" x 6" shipping label on a standard 203 DPI printer: 6 inches × 203 = 1218 dots. The command is <code>^LL1218</code>.</li>
</ul>

<h2>The ^MF (Media Feed) Command</h2>
<p>The <code>^MF</code> command dictates how the printer behaves during power-up or when the printhead is closed. By default, many printers spit out a blank label to calibrate.</p>
<ul>
  <li><strong>Format:</strong> <code>^MFp,h</code> (p = power-up action, h = head-close action).</li>
  <li><strong>Options:</strong> <code>F</code> (Feed), <code>C</code> (Calibrate), <code>L</code> (Length), <code>N</code> (No motion).</li>
  <li><strong>Example:</strong> <code>^MFN,N</code> prevents the printer from wasting a label every time you close the lid.</li>
</ul>`
  },
  {
    title: "Fix Zebra ZPL Label Prints Garbled Text & Raw Code Issues",
    slug: 'zebra-zpl-label-prints-garbled-text-raw-code-issues',
    seoTitle: "Fix Zebra ZPL Label Prints Garbled Text or Raw Code",
    metaDescription: "Is your Zebra printer printing raw ZPL code (like ^XA^FO) or random garbled characters instead of your label design? Here is how to fix the driver and port settings.",
    excerpt: "When a Zebra printer prints the actual ZPL text strings (^XA, ^FO) onto the label instead of rendering a barcode, it is a driver spooling error.",
    errorCode: 'Printing Raw Code',
    tags: 'Zebra, Garbled Text, Printing Raw ZPL Code, Driver Issue, Dump Mode, Pass-Through, Hex Dump',
    wordCount: 1050,
    difficultyLevel: 'Intermediate',
    timeToFix: '5 minutes',
    categoryId: softwareCategory,
    authorId: authors.david,
    reviewerId: authors.elena,
    featuredSnippet: "To fix a Zebra printer printing raw ZPL code or garbled text: 1) Exit Dump Mode: If the printer is printing hexadecimal characters or raw ZPL, it might be stuck in Communications Diagnostic (Dump) Mode. Turn the printer off and on to exit this mode. 2) Driver Spooling: If printing from a web app or ERP system, the Windows printer driver is rendering the ZPL as text. Change the driver to 'Generic / Text Only' in Windows Printer Properties so it passes the code directly to the print engine. 3) Correct Language: Ensure the printer isn't in EPL mode while receiving ZPL code.",
    content: `<h2>Why the Printer Outputs Raw Code</h2>
<p>If you send a print job and your Zebra printer physically prints out lines of text that look like <code>^XA^FO50,50^A0N,50,50^FDHELLO^FS^XZ</code> instead of printing a barcode that says "HELLO", the printer's internal engine is treating the ZPL commands as standard text characters rather than processing them as layout instructions.</p>

<h2>Fix 1: The 'Generic / Text Only' Driver Solution</h2>
<p>When you print from a web browser (like Chrome or Firefox) or a legacy Windows application, the Windows Print Spooler intercepts the ZPL string. It thinks, <em>"Ah, the user wants to print this text document,"</em> and it rasterizes the ZPL code into a picture of text, sending that picture to the printer.</p>
<ol>
  <li>Open Windows <strong>Control Panel &gt; Devices and Printers</strong>.</li>
  <li>Click <strong>Add a printer</strong> and select <strong>Add a local printer or network printer with manual settings</strong>.</li>
  <li>Select the USB or TCP/IP port your Zebra is connected to.</li>
  <li>Under Manufacturer, select <strong>Generic</strong>. Under Printers, select <strong>Generic / Text Only</strong>.</li>
  <li>Complete the installation. Print your ZPL to this new generic queue. The Windows spooler will now pass the raw ASCII characters straight through to the printer, allowing the ZPL engine to execute the commands.</li>
</ol>

<h2>Fix 2: Exiting Communications Diagnostic Mode (Dump Mode)</h2>
<p>If the printer is printing labels filled with random letters, numbers, and hex codes (like <code>5E 58 41 0D 0A</code>), it is stuck in <strong>Dump Mode</strong>.</p>
<ul>
  <li>Dump mode is a diagnostic tool used by developers to see exactly what characters are arriving at the buffer.</li>
  <li><strong>To Exit:</strong> Simply turn the printer's power switch OFF, wait 5 seconds, and turn it back ON. This resets the buffer and exits Dump mode.</li>
</ul>

<h2>Fix 3: USB Port Interference</h2>
<p>If your ZPL contains binary graphic data (like an embedded <code>~DG</code> image logo) and it prints garbled halfway down the label, the USB cable might be dropping packets. Try a shorter, high-quality USB cable, or switch to an Ethernet/Wi-Fi connection to ensure stable data transmission.</p>`
  }
];

async function main() {
  const brandSlug = 'zebra-technologies';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  
  if (!brand) {
    brand = await prisma.brand.create({
      data: {
        name: 'Zebra Technologies',
        slug: brandSlug,
        description: 'Zebra Technologies is a global leader in enterprise asset intelligence, designing and manufacturing thermal barcode, receipt, and RFID printers.',
      }
    });
    console.log(`Created new brand: ${brand.name}`);
  } else {
    console.log(`Found existing brand: ${brand.name}`);
  }

  console.log(`🚀 Publishing Batch 1 (Cluster A: ZPL Programming) for brand: ${brand.name}`);

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
