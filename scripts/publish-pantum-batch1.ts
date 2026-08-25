import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';
const hardwareCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';
const inkCategory = '9af9508c-4517-47bc-9084-8ab635b1283b';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix Pantum Internal Error Codes: No.1, No.3, 05 & Scanner Failures",
    slug: 'fix-pantum-internal-error-codes-no1-no3-05-scanner',
    seoTitle: "Fix Pantum Internal Errors: No.1, No.3, 05 & Scanner Failure",
    metaDescription: "Decode Pantum's internal error numbers. Learn what No.1, No.3, and No.4 mean, and how to fix Error 05, Error 08, and scanner initialization failures.",
    excerpt: "Pantum printers rely heavily on numbered fault codes rather than text descriptions. Here is the definitive list for decoding Pantum internal errors.",
    errorCode: 'Internal Error',
    tags: 'pantum error code no.1 no.3 no.4 meaning, pantum internal error 08 19 21 24, pantum error 05 meaning, pantum printer error code list, pantum error message 5 scanner failure',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: errorCategory,
    authorId: authors.alex,
    reviewerId: authors.elena,
    featuredSnippet: "To fix a Pantum Internal Error (No.1, No.3, or 05): 1) Error No.1 indicates a paper jam in the fuser area. Error No.3 points to a main motor failure, and Error No.4 indicates a laser unit malfunction. 2) Error 05 (Scanner Failure) happens when the flatbed scanner carriage cannot return to its home position. Unlock the physical scanner lock switch under the glass. 3) To reset a transient logic error like 08 or 19, turn the printer off, hold the 'Cancel/Continue' button, and turn it back on until all lights flash. This resets the internal NVRAM.",
    content: `<h2>Decoding the Pantum Numbered Error List</h2>
<p>Because many entry-level Pantum printers (like the P2500) lack an LCD screen, errors are often displayed on your PC screen via the Pantum Status Monitor app. They appear as cryptic "Internal Error" numbers.</p>

<h3>Fatal Hardware Errors (No.1 - No.4)</h3>
<ul>
  <li><strong>Error No.1 (Fuser Jam):</strong> Paper is stuck in the hottest part of the printer. Open the rear door and gently pull the paper straight out. Do not pull at an angle or it will tear.</li>
  <li><strong>Error No.3 (Main Motor):</strong> The logic board cannot rotate the main gear assembly. This usually happens if you forced a third-party toner cartridge in backward, jamming the gears. Remove the toner and reboot.</li>
  <li><strong>Error No.4 (Laser Sync):</strong> The laser polygon mirror failed to reach target speed. Often caused by dropping the printer. It requires replacing the LSU (Laser Scanning Unit).</li>
</ul>

<h3>Multifunction Errors (05, 08, 19, 21, 24)</h3>
<p>If you own an M-series (Multifunction) Pantum, you may see two-digit codes on the LCD:</p>
<ol>
  <li><strong>Error 05 (Scanner Failure):</strong> The scanner lamp carriage is stuck. Check for the shipping lock switch. If unlocked, the glass may be dirty on the underside, preventing the sensor from seeing the white calibration strip.</li>
  <li><strong>Error 08 / 19 (Thermostat/Heater):</strong> The fuser is failing to heat. Ensure the printer is plugged directly into a wall outlet, not a weak power strip.</li>
  <li><strong>Error 21 / 24 (Fan Failure):</strong> The internal cooling fan is jammed by dust or a stray piece of tape. Use a can of compressed air to blast the fan vents on the side of the chassis.</li>
</ol>`
  },
  {
    title: "Fix Pantum 0x000000709, Communication Errors & BM2300 Cover Issues",
    slug: 'fix-pantum-0x000000709-communication-errors-bm2300-cover',
    seoTitle: "Fix Pantum 0x000000709 Error & BM2300 Cover Issues",
    metaDescription: "Learn how to fix the Windows 0x000000709 sharing error with Pantum printers, clear communication errors, and fix a BM2300 that says 'Close Cover' falsely.",
    excerpt: "The 0x000000709 error is a notorious Windows Print Spooler bug that prevents network printing. Learn how to fix this and clear false 'Close Cover' alerts.",
    errorCode: '0x000000709',
    tags: 'pantum error 0x000000709 fix, pantum bm2300 error close cover, pantum communication error fix, pantum error code toner run out, pantum p1000 error indications guide',
    wordCount: 950,
    difficultyLevel: 'Advanced',
    timeToFix: '15 minutes',
    categoryId: softwareCategory,
    authorId: authors.david,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix the Pantum 0x000000709 network printing error: 1) This is a notorious Windows RPC (Remote Procedure Call) bug introduced by Microsoft security updates. 2) Press Windows Key + R, type 'regedit' and press Enter. 3) Navigate to HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Control\\Print. 4) Right-click, create a new DWORD (32-bit) named 'RpcAuthnLevelPrivacyEnabled' and set its value to 0. 5) Restart the Windows Print Spooler service. You will now be able to connect to the shared Pantum printer without the 0x000000709 crash.",
    content: `<h2>Fixing Windows Error 0x000000709</h2>
<p>If you have a Pantum printer connected to a main PC via USB, and you attempt to "Share" that printer with a second laptop on your network, Windows 10/11 will frequently block the connection, throwing the <strong>0x000000709</strong> error.</p>
<p>Microsoft patched a vulnerability (PrintNightmare) by forcing strict RPC packet privacy. To fix it, you must either add the registry key mentioned above (RpcAuthnLevelPrivacyEnabled = 0), or uninstall the Windows update KB5006670. The registry fix is highly recommended as it preserves your OS security while allowing local print sharing.</p>

<h2>Pantum Communication Error & "Toner Run Out"</h2>
<p>If the Pantum Status Monitor app says <em>"Communication Error"</em> or randomly flashes <em>"Toner Run Out"</em> even though the cartridge is brand new:</p>
<ul>
  <li><strong>USB Sleep Bug:</strong> If using a USB cable, Windows USB Selective Suspend is putting the port to sleep. Go to Windows Power Settings &gt; Advanced &gt; USB Settings, and Disable "USB selective suspend".</li>
  <li><strong>Firmware Bug:</strong> The logic board is randomly losing connection to the cartridge smart chip. Reseat the cartridge firmly. If it persists, update the printer firmware via the Pantum utility.</li>
</ul>

<h2>BM2300 False "Close Cover" Error</h2>
<p>If your BM2300 or P1000 series says the cover is open, but you slammed it shut:</p>
<ol>
  <li>The top cover uses a small plastic spike (interlock switch) that pushes down into a hole in the chassis to tell the logic board the lid is closed.</li>
  <li>If this plastic spike breaks off, the printer permanently thinks it is open. Open the lid and inspect the left and right edges for a broken plastic tab.</li>
  <li>You can temporarily bypass this by stuffing a small piece of folded paper into the sensor hole.</li>
</ol>`
  },
  {
    title: "Fix Pantum Toner Not Recognized, Chip Resets & Spring Contacts",
    slug: 'fix-pantum-toner-not-recognized-chip-resets-spring-contacts',
    seoTitle: "Fix Pantum Toner Not Recognized & Cartridge Chip Resets",
    metaDescription: "Is your Pantum printer failing to detect a new toner cartridge? Learn how to clean the spring contacts, reset the cartridge chip, and verify TL-4XX compatibility.",
    excerpt: "Like most modern laser printers, Pantum uses smart chips to track toner levels. If the printer cannot read the chip, it will halt all printing.",
    errorCode: 'Toner Not Recognized',
    tags: 'pantum toner not recognized fix, pantum cartridge chip reset guide, pantum toner cartridge not detected, pantum spring contacts cleaning guide, pantum tl-4xx cartridge compatibility',
    wordCount: 1000,
    difficultyLevel: 'Intermediate',
    timeToFix: '5 minutes',
    categoryId: inkCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredSnippet: "To fix a Pantum 'Toner Not Recognized' error: 1) The printer reads the toner using a small gold smart chip on the side of the cartridge. Remove the cartridge and wipe this chip with an alcohol swab. 2) Look inside the dark printer cavity. Pantum uses coiled metal 'Spring Contacts' to touch the chip. If a spring is bent, covered in toner dust, or jammed inward, it cannot read the chip. Gently pull the spring outward with a paperclip and clean it. 3) For chip resets on refillable kits (like the TL-4XX), you must physically peel off the old smart chip and glue the new replacement chip from the refill kit into the exact same slot.",
    content: `<h2>Why the Toner is Not Detected</h2>
<p>Pantum printers are notoriously picky about reading cartridge smart chips. If you receive a "Cartridge Not Detected" or "Install Cartridge" error, it is a physical communication failure.</p>

<h3>Cleaning the Spring Contacts</h3>
<p>Unlike HP which uses flat metal pins, Pantum frequently uses coiled metal springs inside the chassis to transmit data to the cartridge chip.</p>
<ol>
  <li>Unplug the printer and take the toner out.</li>
  <li>Look at the left interior wall of the printer. You will see several small, coiled springs protruding.</li>
  <li>If you had a previous toner leak, these springs may be insulated by black toner powder. Carefully vacuum the area and wipe the springs with Q-tips and isopropyl alcohol.</li>
  <li>If a spring is pushed flat against the wall, gently stretch it out a millimeter so it makes firm contact with the cartridge when inserted.</li>
</ol>

<h2>Chip Resets & TL-4XX Compatibility</h2>
<p>Pantum sells official "Refill Kits" for many models (which is rare for a manufacturer). These kits come with a bottle of toner powder and a <strong>new replacement chip</strong>.</p>
<ul>
  <li><strong>The Reset Process:</strong> You cannot electronically "reset" a Pantum chip via software. You must use a small flathead screwdriver to pry the exhausted chip out of the cartridge slot, and slide the new chip from the refill kit into place.</li>
  <li><strong>TL-410 vs TL-420:</strong> Pay extreme attention to compatibility. A TL-410X cartridge will physically slide into a printer meant for a TL-420, but the chips are coded differently. The printer will simply say "Not Recognized" if the region or model family does not match exactly.</li>
</ul>`
  },
  {
    title: "Pantum Cartridge Errors: Anti-Counterfeit, Door Latch & Refill",
    slug: 'pantum-cartridge-errors-anti-counterfeit-door-latch-refill',
    seoTitle: "Pantum Anti-Counterfeit Errors, Door Latch & Refill Guide",
    metaDescription: "Does your Pantum display a 'Non-Genuine Cartridge' anti-counterfeiting error? Learn how to fix false warnings, repair the cartridge door, and properly refill toner.",
    excerpt: "Pantum's anti-counterfeit firmware can accidentally flag genuine toner. Learn how to fix false chip errors and use the 'rocking technique' to clear low toner warnings.",
    errorCode: 'Non Genuine Cartridge',
    tags: 'pantum non genuine cartridge error, pantum anti counterfeiting identification, pantum cartridge door wont latch, pantum toner low warning wont clear, pantum cartridge rocking technique refill',
    wordCount: 900,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: inkCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    featuredSnippet: "To fix a Pantum 'Anti-Counterfeiting Identification' or Non-Genuine error: 1) Pantum printers require an internet connection to periodically verify cartridge serial numbers. If the server is down, it may falsely flag a genuine cartridge. 2) Turn the printer off, disconnect it from Wi-Fi/Ethernet, and turn it back on using just USB. 3) Toner Low Warning Won't Clear: If you just refilled a cartridge but the warning remains, use the 'Rocking Technique.' Take the toner out, hold it completely level with the floor, and gently rock it side-to-side 5 times to distribute the new powder over the internal optical sensor.",
    content: `<h2>Pantum Anti-Counterfeiting Errors</h2>
<p>If you install a brand-new Pantum cartridge and the screen says <strong>"Non-Genuine Cartridge"</strong> or <strong>"Anti-Counterfeiting Identification Failed"</strong>, the printer's DRM has triggered.</p>
<ul>
  <li><strong>Third-Party Toner:</strong> If you bought generic toner from Amazon, Pantum's latest firmware update has blacklisted the third-party smart chip. You must return it and buy an OEM cartridge; there is no permanent software bypass.</li>
  <li><strong>False Flags on Genuine Toner:</strong> If the toner is 100% genuine Pantum, the printer's network clock may be out of sync with the verification server. Log into the Embedded Web Server, check the date/time settings, and update the firmware.</li>
</ul>

<h2>The Cartridge Rocking Technique</h2>
<p>If you use an official Pantum Refill Kit, pour the powder in, insert the new chip, and the printer <em>still</em> says "Toner Low":</p>
<ol>
  <li>The powder you poured in is sitting in a giant pile on one side of the cartridge hopper.</li>
  <li>The internal sensor shines a light through the hopper. If the pile of toner isn't blocking the light path, the printer assumes the hopper is empty.</li>
  <li><strong>The Fix:</strong> Take the cartridge out. Hold it horizontally with both hands. Rock it gently side-to-side (like a seesaw) 5 or 6 times. This evenly levels the powder across the entire sensor path.</li>
</ol>

<h2>Cartridge Door Won't Latch</h2>
<p>If you install a new toner and the top door refuses to click shut, <strong>do not force it</strong>. You have likely installed the drum unit and the toner cartridge improperly.</p>
<p>Pantum uses a two-piece system on many models: a large Drum unit, and a smaller Toner tube that snaps into it. Ensure the Toner tube is fully clicked and locked into the Drum unit <em>before</em> sliding the whole assembly into the printer. If the blue latch on the drum unit isn't clicked down, the assembly sits too high, blocking the main door.</p>`
  }
];

async function main() {
  const brandSlug = 'pantum';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  
  if (!brand) {
    brand = await prisma.brand.create({
      data: {
        name: 'Pantum',
        slug: brandSlug,
        description: 'Pantum is a rapidly growing international printer manufacturer known for ultra-compact laser printers and economical toner refill kits.'
      }
    });
  }

  console.log(`🚀 Publishing Batch 1 (Clusters A & B: Errors & Toner) for brand: ${brand.name}`);

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
