import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
const inkCategory = '9af9508c-4517-47bc-9084-8ab635b1283b'; // used for ribbon
const maintenanceCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';
const printQualityCategory = 'e3d26347-33bf-41a7-9cbf-c3d821850f98';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix Dascom Dot Matrix Ribbon & Faint Print Issues",
    slug: 'dascom-dot-matrix-printer-ribbon-faint-print',
    seoTitle: "Fix Dascom Dot Matrix Printer Ribbon Not Feeding & Faint Print",
    metaDescription: "Is your Dascom dot matrix printer producing faint, faded prints or is the ribbon cartridge not feeding? Learn how to replace and troubleshoot Dascom ribbons.",
    excerpt: "Dot matrix printers are built like tanks, but their most common failure point is the ribbon. Here is how to fix faint prints and jammed ribbon cartridges.",
    errorCode: null,
    tags: 'Dascom, Dot Matrix, Ribbon, Faint Print, Faded Copy, Cartridge Replacement',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: printQualityCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredSnippet: "To fix faint prints or a ribbon not feeding on a Dascom printer: 1) Open the top cover and inspect the ribbon cartridge. If the ribbon is slack, turn the manual feed knob on the cartridge clockwise to pull it taut. 2) If the ribbon is advancing but the print is still faint, the ink on the ribbon has dried out and you must replace the ribbon cartridge. 3) When replacing a Dascom ribbon cartridge, ensure the ribbon mask (a thin plastic or metal shield) is correctly positioned between the print head and the paper, not catching on the ribbon itself.",
    content: `<h2>The Anatomy of Dot Matrix Printing</h2>
<p>Unlike modern inkjet printers that spray liquid, Dascom (and Tally Dascom) dot matrix printers are impact printers. A metal print head containing a matrix of tiny pins fires outward, physically striking an ink-soaked cloth ribbon against the paper. When the print is faint or missing entirely, the issue almost always lies with the ribbon mechanism.</p>

<h2>Fix 1: The Slack Ribbon (Not Feeding)</h2>
<p>As the print head moves left and right across the paper, a small gear on the print carriage connects to a gear on the bottom of the ribbon cartridge, slowly winding fresh ribbon across the print head.</p>
<p>If your Dascom printer's <strong>ribbon is not feeding</strong>, it will repeatedly strike the exact same spot on the cloth ribbon until it shreds a hole in it, causing the print to become faint instantly.</p>
<ul>
    <li>Open the acoustic cover.</li>
    <li>Look at the ribbon cartridge. You will see a small, usually blue or green knob.</li>
    <li>Turn the knob in the direction of the arrow (usually clockwise). If the ribbon feels stuck or jammed inside the plastic casing, the cartridge gears are stripped. You must replace the cartridge.</li>
    <li>If the knob turns easily but the ribbon is loose, wind it until the ribbon is perfectly taut across the print head gap.</li>
</ul>

<h2>Fix 2: Faint Print on Multi-Part Forms</h2>
<p>If you are printing on standard paper and the print is crisp, but the 3rd or 4th copy of a multi-part carbonless form is completely faded, your ribbon is <strong>not the problem</strong>.</p>
<p>The print head is simply not hitting the paper hard enough to transfer the pressure through all 4 sheets. You need to adjust the <strong>Print Head Gap</strong> (discussed in detail in our Head Gap guide) to bring the pins closer to the thicker paper stack, increasing the impact force.</p>

<h2>Fix 3: Proper Ribbon Replacement</h2>
<p>If your print quality is just a faded, light grey copy across single-sheet paper, the ink embedded in the cloth ribbon has dried out.</p>
<ol>
    <li>Turn the printer off. (Warning: The print head gets extremely hot during operation. Let it cool for 5 minutes).</li>
    <li>Pull the blue/green tabs on the sides of the old ribbon cartridge to lift it straight up.</li>
    <li>Unbox the new Dascom ribbon cartridge. <strong>Do not remove the plastic tension clip yet.</strong></li>
    <li>Seat the cartridge down onto the mounting pins. Ensure the small gear on the bottom of the cartridge aligns with the drive gear on the printer.</li>
    <li>Carefully guide the exposed ribbon <strong>between</strong> the print head and the ribbon mask (the thin protective shield). If you put the ribbon behind the mask, it will not hit the paper.</li>
    <li>Remove the plastic tension clip and turn the winding knob to pull the ribbon taut.</li>
</ol>`
  },
  {
    title: "Dascom Tractor Feed & Continuous Paper Troubleshooting",
    slug: 'dascom-tractor-feed-paper-jam-alignment',
    seoTitle: "Fix Dascom Tractor Feed Paper Jams & Alignment Issues",
    metaDescription: "Troubleshoot Dascom tractor feed paper jams, continuous form paper that won't feed, and paper alignment issues on heavy-duty impact printers.",
    excerpt: "Continuous form paper requires precise mechanical alignment. When the tractor feed gets out of sync, paper jams and skewed text are inevitable.",
    errorCode: null,
    tags: 'Dascom, Tractor Feed, Paper Jam, Continuous Form, Alignment Off, Paper Feed',
    wordCount: 1200,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: maintenanceCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    featuredSnippet: "To fix Dascom tractor feed jams and continuous paper alignment: 1) Release the tractor locking levers on both the left and right tractor units. 2) Adjust the left tractor so the paper aligns with the zero mark on the printer's ruler, then lock it. 3) Adjust the right tractor to pull the paper flat. Do not pull it too tight, or the feed holes will tear; do not leave it too loose, or the paper will skew and jam. 4) Lock the right tractor. 5) Ensure the paper path selector lever is set to 'Tractor' (continuous), not 'Friction' (cut sheet).",
    content: `<h2>Understanding the Tractor Feed System</h2>
<p>Dascom dot matrix printers excel at high-volume printing using <strong>continuous form paper</strong> (paper with perforated edges containing holes). The paper is driven by sprockets on a "tractor" mechanism. While incredibly reliable, the tractor feed requires exact manual calibration. If your paper alignment is off, or if the paper won't feed, the tractor units are misconfigured.</p>

<h2>Fix 1: The Tension Balance (Paper Tearing/Jamming)</h2>
<p>If your continuous form paper is jamming, tearing at the feed holes, or slipping off the sprockets, the tension between the left and right tractor units is wrong.</p>
<ol>
    <li>Pull the locking levers forward to unlock both the left and right tractor units so they can slide left and right freely.</li>
    <li>Slide the left tractor to align with the margin you want (usually marked by a '0' on the metal ruler rail). Push the lever back to lock the left tractor in place.</li>
    <li>Open the sprocket covers and lay the paper holes over the pins on both tractors. Close the covers.</li>
    <li><strong>The Critical Step:</strong> Slide the right tractor outward to pull the paper flat. If you pull it too tight, the holes will stretch into ovals and tear during printing. If it is too loose, the paper will buckle in the middle and cause a head jam. The paper should be perfectly flat but without lateral stress.</li>
    <li>Lock the right tractor.</li>
</ol>

<h2>Fix 2: Paper Selector Lever Position</h2>
<p>If the printer makes grinding noises but the continuous form paper won't move at all, check the paper path selector lever.</p>
<p>Most Dascom printers have a physical lever (usually on the right side) that switches the printer's internal drive gears between <strong>Friction Feed</strong> (for single cut sheets of paper, like standard letter paper) and <strong>Tractor Feed</strong> (for continuous paper).</p>
<p>If this lever is set to Friction, the printer is trying to use the rubber rollers to pull paper, and the tractor sprockets are physically disengaged from the motor. Flip the lever to the Tractor icon.</p>

<h2>Fix 3: Vertical Alignment (Top of Form)</h2>
<p>If your Dascom printer is printing perfectly, but the text is printing over the perforated line between pages, your <strong>Top of Form (TOF)</strong> alignment is off.</p>
<ul>
    <li>Turn the printer on and load the paper into the tractor.</li>
    <li>Press the <strong>Load/Eject</strong> button to feed the paper to the starting position.</li>
    <li>Look closely at the print head. The bottom edge of the print head should align exactly with the perforation line of the paper.</li>
    <li>If it does not align, you must use the printer's control panel (usually by holding the <strong>Micro Feed Up</strong> or <strong>Micro Feed Down</strong> buttons) to step the paper precisely into position. Once set, the printer will remember this TOF setting for subsequent pages.</li>
</ul>`
  },
  {
    title: "Dascom Print Head Gap & Multi-Part Form Fixes",
    slug: 'dascom-print-head-gap-adjustment',
    seoTitle: "Dascom Print Head Gap Adjustment (Fix Multi-Part Forms)",
    metaDescription: "Learn how to adjust the print head gap on a Dascom printer to successfully print on 4-part, 6-part, or 7-part carbonless continuous forms without smudging.",
    excerpt: "Dot matrix printers can print through multiple carbon copies, but only if the mechanical head gap is adjusted perfectly for the paper's thickness.",
    errorCode: null,
    tags: 'Dascom, Print Head Gap, Multi-Part Form, Impact Force, Adjustment, Smudging',
    wordCount: 950,
    difficultyLevel: 'Intermediate',
    timeToFix: '5 minutes',
    categoryId: printQualityCategory,
    authorId: authors.david,
    reviewerId: authors.marcus,
    featuredSnippet: "To adjust the Dascom print head gap for multi-part forms: 1) Locate the Head Gap Lever inside the printer, usually on the left or right side of the print carriage rail. 2) Move the lever based on your paper thickness. For single-sheet paper, set the lever to 1 or 2. 3) For a 3-part or 4-part carbonless form, set the lever to 3 or 4. 4) For thick 6-part or 7-part forms, set the lever to 6 or 7. If the gap is too tight, the ribbon will smear ink all over the paper. If the gap is too wide, the bottom copies will be blank.",
    content: `<h2>What is the Print Head Gap?</h2>
<p>The primary reason businesses use impact dot matrix printers like the Dascom 2600 or 2800 series is their ability to print on <strong>multi-part forms</strong> (carbonless copy paper). Because the pins strike the paper with physical force, the pressure transfers the text through the top sheet onto the yellow and pink copies underneath.</p>
<p>However, 1 sheet of paper is much thinner than a 6-part form. To prevent the heavy metal print head from ripping through thick forms or smudging ink everywhere, Dascom printers feature a manual <strong>Print Head Gap Adjustment Lever</strong>.</p>

<h2>The Symptoms of an Incorrect Gap</h2>
<p>If the gap is set incorrectly, you will experience two distinct problems:</p>
<ul>
    <li><strong>Gap Too Narrow (Lever at 1 for a 6-part form):</strong> The metal print head is pressing directly against the thick paper. The ribbon will drag across the page, causing massive black ink smudges. Worse, the paper can jam against the print head, tearing the form and potentially bending the printing pins.</li>
    <li><strong>Gap Too Wide (Lever at 6 for single-sheet paper):</strong> The print head is too far away. The pins have to travel further, hitting the paper with a weaker impact. The top copy will look fine, but the 3rd or 4th carbon copies will be completely blank or illegible.</li>
</ul>

<h2>How to Adjust the Lever</h2>
<ol>
    <li>Open the top acoustic cover of the printer.</li>
    <li>Look to the extreme left or right of the silver carriage rail (the metal bar the print head slides on). You will find a lever with numbers, usually ranging from 1 to 9.</li>
    <li>Move the lever to match your paper. A general rule of thumb for Dascom printers is:
        <ul>
            <li><strong>Single sheet (standard 20lb paper):</strong> Setting 1 or 2</li>
            <li><strong>2-part form:</strong> Setting 2 or 3</li>
            <li><strong>3-part to 4-part form:</strong> Setting 4 or 5</li>
            <li><strong>5-part to 6-part form:</strong> Setting 6 or 7</li>
            <li><strong>Envelopes:</strong> Setting 8 or 9</li>
        </ul>
    </li>
</ol>
<p><strong>Note on Automatic Head Gap:</strong> Premium heavy-duty models like the Tally Dascom 2810/2820 feature an <em>Automatic Gap Adjustment (AGA)</em> system. On these models, there is no manual lever; a motorized sensor detects the paper thickness and moves the carriage rail back and forth automatically. If an AGA model fails to print through multi-part forms, the optical thickness sensor is dirty and must be cleaned with compressed air.</p>`
  },
  {
    title: "Dascom Dot Matrix Errors: Skipping Characters & Grinding Noises",
    slug: 'dascom-printer-skipping-characters-grinding',
    seoTitle: "Fix Dascom Skipping Characters & Grinding Noises (Print Head Error)",
    metaDescription: "Is your Dascom dot matrix printer making a loud grinding noise or skipping letters? Learn how to clean the carriage rail, fix broken pins, and lubricate the shaft.",
    excerpt: "When a heavy-duty impact printer starts making terrifying grinding noises or dropping characters, the mechanical drive system is failing.",
    errorCode: null,
    tags: 'Dascom, Skipping Characters, Grinding Noise, Print Head, Carriage Rail, Lubrication',
    wordCount: 1050,
    difficultyLevel: 'Advanced',
    timeToFix: '25 minutes',
    categoryId: errorCategory,
    authorId: authors.alex,
    reviewerId: authors.elena,
    featuredSnippet: "To fix a Dascom printer skipping characters or making grinding noises: 1) Turn the printer off. The loud grinding is usually caused by a dry or dirty carriage rail causing the print head to stutter. 2) Wipe the silver metal carriage rail with a clean microfiber cloth to remove black, gritty dust. 3) Apply 2-3 drops of light machine oil (like 3-in-One oil or sewing machine oil) to the rail. Do not use WD-40. 4) Manually slide the print head back and forth to distribute the oil. If it is skipping characters silently, individual pins inside the print head have broken and the head must be replaced.",
    content: `<h2>The Grinding Noise (Carriage Stutter)</h2>
<p>Dascom printers use a heavy print head that slides back and forth on a thick, silver, cylindrical metal bar called the <strong>carriage rail</strong> or shaft. A high-torque stepper motor pulls the carriage using a rubber belt.</p>
<p>Over millions of passes, paper dust mixes with the oil on the carriage rail, creating a sticky, black sludge. Eventually, this sludge causes the print head to physically stick to the rail. The motor keeps pulling, but the head won't move, resulting in a terrifying, loud, machine-gun-like grinding noise. The printer will often stall and throw an error light.</p>

<h3>The Lubrication Fix</h3>
<ol>
    <li>Turn the printer off and unplug it.</li>
    <li>Take a clean paper towel or microfiber cloth and thoroughly wipe the silver carriage rail from end to end. You will see thick black sludge come off.</li>
    <li>Continue wiping until the metal is shiny and completely clean.</li>
    <li>Take a high-quality light machine oil (like Platenclene, sewing machine oil, or synthetic PTFE lubricant). <strong>Never use WD-40</strong>, as it evaporates and leaves a sticky residue that will destroy the printer faster.</li>
    <li>Apply exactly 2 to 3 drops of oil to the top of the rail.</li>
    <li>Grab the print head with your hand and manually slide it all the way to the left, and all the way to the right, a dozen times to spread the oil evenly. The grinding noise will vanish completely.</li>
</ol>

<h2>Skipping Characters (Missing Pins)</h2>
<p>If your Dascom is printing quietly and smoothly, but random letters are missing pieces (for example, the letter 'E' prints out looking like an 'F' or an 'L', or there is a horizontal white line running straight through a line of text), you have a completely different problem: <strong>Broken Pins</strong>.</p>
<p>A 24-pin dot matrix print head fires tiny tungsten wires into the ribbon to create letters. If the printer hits a severe paper jam, or if you run the printer for years with the Head Gap set too tight, these tiny metal pins snap off inside the print head housing.</p>
<p>If you run a self-test and see a persistent horizontal blank line through all the text, one or more pins are broken, or the magnetic coil that fires the pin has burned out.</p>
<p><strong>The Fix:</strong> You cannot repair individual pins in the field. You must purchase a replacement Dascom print head for your specific model (e.g., Dascom 2600 Print Head), unscrew the two mounting screws, unclip the ribbon cable, and drop the new print head into the carriage.</p>`
  }
];

async function main() {
  // First, check or create Dascom brand
  let dascomBrand = await prisma.brand.findUnique({ where: { slug: 'dascom' } });
  if (!dascomBrand) {
    dascomBrand = await prisma.brand.create({
      data: {
        name: 'Dascom',
        slug: 'dascom',
        description: 'Manufacturer of industrial dot matrix, thermal, POS, and card printers under the Dascom and Tally Dascom brands.'
      }
    });
    console.log('✅ Created brand: Dascom');
  } else {
    console.log('✅ Found brand: Dascom');
  }

  // Insert articles
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
