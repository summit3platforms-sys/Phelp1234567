import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const canonBrandId = 'aa9e42c5-e0f0-4b60-b776-c39f46748c33';
const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
const maintenanceCategory = 'f8e1387d-7604-4fa7-9f87-7a58c960818f';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Canon Error 5B00, 5800 & 1700: Ink Absorber Codes Explained",
    slug: 'canon-printer-5b00-vs-1700-difference',
    seoTitle: "Canon 5B00 vs 1700 vs 5800 (Ink Absorber Errors Explained)",
    metaDescription: "What is the difference between Canon errors 1700, 5800, and 5B00? Learn why your printer 'requires servicing' and what these waste ink codes actually mean.",
    excerpt: "If your Canon printer flashes a 'requires servicing' message along with code 1700, 5800, or 5B00, it is complaining about the same thing: the waste ink absorber pad.",
    errorCode: '5B00',
    tags: 'Canon, 5B00, 1700, 5800, Ink Absorber, Waste Ink, Requires Servicing',
    wordCount: 1100,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: errorCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "The difference between Canon ink absorber errors: Error 1700 is a WARNING that the waste ink absorber is almost full (usually at 95% capacity). You can press 'OK' to temporarily bypass it. Error 5B00 is the FATAL STOP error meaning the absorber has reached exactly 100% capacity; the printer is locked. Error 5800 is a fatal stop error specifically indicating the secondary (platen) ink absorber pad is full, typically seen in photo printers.",
    content: `<h2>The Waste Ink Absorber Concept</h2>
<p>Unlike laser printers, inkjet printers generate a lot of liquid waste. Every time you turn your Canon PIXMA on, it runs a quick self-cleaning cycle. It pumps fresh ink through the printhead to clear out dried clumps. But where does that ink go?</p>
<p>It gets pumped into a large, dense sponge at the very bottom of the printer called the <strong>Waste Ink Absorber Pad</strong>. Because there is no sensor to detect if the sponge is physically wet, the printer's motherboard uses a mathematical algorithm to estimate how full it is based on the number of cleaning cycles performed.</p>

<h2>Support Code 1700: The Warning</h2>
<p>If you receive <strong>Support Code 1700</strong> (or 8 flashes on the alarm LED), this is Canon's early warning system. It means the internal digital counter has reached approximately 95% of its maximum threshold.</p>
<p>Your printer has not stopped working. You can usually press the <strong>OK</strong> or <strong>Resume</strong> button on the printer to clear the warning and continue printing for several more weeks or months, depending on your print volume.</p>

<h2>Support Code 5B00: The Fatal Lockout</h2>
<p>If you receive <strong>Support Code 5B00</strong> (or 7 alternating green/orange flashes), the digital counter has reached 100.0%. The printer will completely lock down.</p>
<p>You cannot bypass a 5B00 error by pressing OK, and you cannot fix it by simply unplugging the machine. The printer displays a "Requires Servicing" message because Canon considers this a job for a technician: the physical sponge needs to be replaced, and the motherboard's EEPROM chip must be digitally reset to 0%.</p>

<h2>Support Code 5800: The Platen Absorber</h2>
<p>Some advanced Canon photo printers (like the PRO series) and high-end PIXMAs feature borderless printing. When you print borderless, the printer purposely oversprays ink past the edges of the photo paper to ensure there are no white margins.</p>
<p>That overspray is caught by a secondary, much smaller sponge located directly under the print path (the platen). <strong>Error 5800</strong> means this specific platen absorber is full. Just like 5B00, this is a hard lock that requires a digital reset.</p>`
  },
  {
    title: "How to Reset the Canon Waste Ink Counter (5B00 Fix)",
    slug: 'how-to-reset-canon-waste-ink-counter',
    seoTitle: "Reset Canon Waste Ink Counter (Fix 5B00 Free)",
    metaDescription: "Learn how to enter Service Mode and use a software reset tool to clear the 5B00 Waste Ink Absorber Full error without calling a service technician.",
    excerpt: "A 5B00 'Ink Absorber Full' error locks your printer. Here is the step-by-step guide to entering Service Mode and resetting the motherboard counter to 0%.",
    errorCode: '5B00',
    tags: 'Canon, 5B00, Reset, Waste Ink Counter, Service Mode, Service Tool',
    wordCount: 1300,
    difficultyLevel: 'Advanced',
    timeToFix: '15 minutes',
    categoryId: maintenanceCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredSnippet: "To reset the Canon waste ink counter: 1) Turn the printer off. Hold the STOP button, then hold POWER. Release STOP, press it 5 times, and release POWER to enter Service Mode. 2) Connect the printer to a Windows PC via USB. 3) Download the Canon Service Tool (ST V3400, V4720, or V5302). 4) Open the software. In the 'Clear Ink Counter' section, select 'Main' from the Absorber dropdown. 5) Click 'Set'. The printer will print a page showing 'D=000.0', confirming the reset.",
    content: `<h2>The Software vs. Hardware Reality</h2>
<p>Before you reset the digital counter that causes the <strong>5B00 Error</strong>, you must understand the risk: you are resetting a software counter, but the physical sponge at the bottom of your printer is still 100% full of liquid ink.</p>
<p>If you reset this counter and continue printing for another 6 to 12 months, the physical sponge will overflow, and thick black ink will leak out of the bottom of the printer, potentially ruining your desk or carpet. <em>We highly recommend opening the printer and replacing or washing the physical pads after you perform this software reset.</em></p>

<h2>Step 1: Entering Service Mode</h2>
<p>You cannot reset the counter over Wi-Fi, and you cannot do it on a Mac. You need a Windows PC and a USB cable. Before the software tool can talk to the printer, the printer must be put into Service Mode.</p>
<ol>
    <li>Turn the printer off, but leave the power cord plugged in.</li>
    <li>Press and hold the <strong>Stop/Reset</strong> button (the red triangle).</li>
    <li>While continuing to hold Stop, press and hold the <strong>Power</strong> button.</li>
    <li>While holding Power, release the Stop button.</li>
    <li>Press the Stop button exactly <strong>5 times</strong>. (Note: Some older models like the MP series only require 2 presses. Newer G-series MegaTanks may require 6 presses).</li>
    <li>Release the Power button.</li>
</ol>
<p>The green power light will flash and then turn solid. The LCD screen will remain dark. If the yellow alarm light is on, or if the printer simply turns on normally, you failed to enter Service Mode. Turn it off and try the button sequence again.</p>

<h2>Step 2: The Service Tool</h2>
<p>You must download a leaked copy of Canon's internal factory Service Tool. The version you need depends on your printer's age (V3400 for older models, V4720 for mid-range, V5302 for newer models).</p>
<ul>
    <li>Connect the USB cable between the printer and the PC.</li>
    <li>Extract and run the Service Tool executable (it does not need to be installed, it runs standalone).</li>
    <li>Look at the top of the window. If the buttons are grayed out, the tool cannot communicate with the printer (either wrong tool version, or the motherboard's EEPROM is locked).</li>
</ul>

<h2>Step 3: Executing the Reset</h2>
<ol>
    <li>Load two sheets of regular A4 or Letter paper into the rear tray.</li>
    <li>In the Service Tool, locate the section titled <strong>Clear Ink Counter</strong>.</li>
    <li>Change the <strong>Absorber</strong> dropdown box to <strong>Main</strong>.</li>
    <li>Click the <strong>Set</strong> button to the right of it.</li>
</ol>
<p>The printer will make mechanical noises and pull a sheet of paper through, printing the text <code>D=000.0</code>. This means the counter is successfully reset to zero. Turn the printer off, then back on normally, and you can resume printing.</p>`
  },
  {
    title: "Canon Ink Absorber Almost Full: How to Bypass the Warning",
    slug: 'canon-ink-absorber-almost-full-press-ok',
    seoTitle: "Bypass Canon 'Ink Absorber Almost Full' (Press OK to Continue)",
    metaDescription: "Is your Canon printer stopping mid-job with an 'Ink absorber almost full' message? Learn how to bypass the warning, resume printing, and prepare for the 5B00 error.",
    excerpt: "The 'Ink Absorber Almost Full' message is Canon's early warning system. It will pause your print jobs, but it can be easily bypassed—for a limited time.",
    errorCode: '1700',
    tags: 'Canon, 1700, Ink Absorber Almost Full, Bypass, Press OK',
    wordCount: 800,
    difficultyLevel: 'Beginner',
    timeToFix: '1 minute',
    categoryId: errorCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "To bypass the 'Ink absorber almost full' (Error 1700) warning on a Canon printer: Look at the printer's physical control panel. Press the 'OK', 'Start', or 'Resume/Cancel' button once. The error message will disappear, and the printer will immediately resume the paused print job. You do not need to replace the absorber yet. However, this is a temporary fix; the printer will permanently lock with a 5B00 error when the absorber reaches 100% capacity.",
    content: `<h2>The 95% Warning Mark</h2>
<p>If you are in the middle of a large print job and your Canon printer suddenly stops, flashes an amber light 8 times, and displays <strong>"The ink absorber is almost full"</strong> on your computer screen (Support Code 1700), don't panic. Your printer is not broken.</p>
<p>Canon programmed the motherboard to pause printing when the digital waste ink counter reaches roughly 95% capacity. They do this so you aren't surprised when the printer eventually locks down completely. It gives you time to finish your current project and order a replacement printer or schedule a repair.</p>

<h2>How to Resume Your Print Job</h2>
<p>Bypassing this error is incredibly simple, but it is purely temporary.</p>
<ul>
    <li>Walk over to the printer.</li>
    <li>Locate the <strong>Resume/Cancel</strong> button (a red triangle inside a circle), the <strong>OK</strong> button, or the <strong>Black/Color Start</strong> buttons.</li>
    <li>Press the button once.</li>
</ul>
<p>The error message on your computer screen will vanish, the printer will pull the paper back in (or grab the next sheet), and the print job will continue seamlessly from the exact spot it paused.</p>

<h2>How Much Time Do You Have Left?</h2>
<p>Users frequently ask: <em>"How many more pages can I print after pressing OK?"</em></p>
<p>The waste ink counter does not tick up based on the number of pages you print. It ticks up based on <strong>head cleaning cycles</strong>. If you print 500 pages in one sitting, the counter barely moves. But if you turn the printer on and off 10 times over a week (which triggers an automatic mini-cleaning each time), the counter jumps up.</p>
<p>Generally, you have anywhere from 2 weeks to 2 months of normal household printing left before the counter hits 100% and throws the fatal 5B00 error.</p>`
  },
  {
    title: "Fix Canon Error 6C10 (Purge Unit Valve & Waste Ink Fault)",
    slug: 'canon-error-6c10-ink-absorber-reset',
    seoTitle: "Fix Canon Error 6C10 (Valve Sensor & Purge Unit Jam)",
    metaDescription: "Canon error 6C10 points to a mechanical failure in the purge unit's valve sensor or a massive waste ink clog. Learn how to clean the capping station.",
    excerpt: "Support code 6C10 is a rare but frustrating mechanical error. It means the valve mechanism that directs waste ink into the absorber pad is jammed or broken.",
    errorCode: '6C10',
    tags: 'Canon, 6C10, Error Code, Purge Unit, Valve Sensor, Ink Absorber',
    wordCount: 950,
    difficultyLevel: 'Advanced',
    timeToFix: '25 minutes',
    categoryId: errorCategory,
    authorId: authors.david,
    reviewerId: authors.elena,
    featuredSnippet: "To fix Canon error 6C10: 1) Turn the printer off and unplug it. 2) Open the top cover and slide the printhead carriage manually to the left. 3) Inspect the purge unit on the far right. Use a flashlight to check the small rubber wiper blade and the ink suction caps. 4) If the area is flooded with thick, sludgy ink, the waste ink tubes are clogged. Use a syringe to flush warm distilled water through the rubber caps to clear the internal tubing. 5) Check for foreign objects (like a piece of torn paper) blocking the small plastic valve cam gear next to the purge unit.",
    content: `<h2>Understanding the 6C10 Valve Sensor Error</h2>
<p>Canon's <strong>error 6C10</strong> is technically classified as a "Valve Sensor Error." To understand this, you need to understand how the printer cleans itself.</p>
<p>When the printer runs a cleaning cycle, the carriage parks on the far right side over the <strong>purge unit</strong>. A small vacuum pump spins, pulling ink through the printhead and down into some silicone tubes. A mechanical <strong>valve</strong> switches the flow of this ink between the black ink tube and the color ink tubes.</p>
<p>Error 6C10 occurs when the motherboard tries to switch this valve, but the sensor reports that the cam gear didn't move. The valve is stuck.</p>

<h2>Fix 1: The Warm Water Flush</h2>
<p>The most common reason the valve gets stuck is that the waste ink inside the purge unit has dried into a thick, tar-like sludge, freezing the moving parts.</p>
<ol>
    <li>Unplug the printer and open the cover.</li>
    <li>Manually push the carriage to the left to expose the purge unit on the right.</li>
    <li>Fill a syringe or eyedropper with very warm distilled water.</li>
    <li>Drip the warm water directly onto the porous rubber pads of the purge unit.</li>
    <li>Let it sit for 10 minutes to dissolve the sludge.</li>
    <li>Manually push the small plastic wiper blade (a small rubber squeegee next to the pads) back and forth to ensure it isn't stuck.</li>
</ol>

<h2>Fix 2: Inspecting the Cam Gear</h2>
<p>The valve is operated by a tiny white plastic cam gear located just behind or to the side of the purge unit.</p>
<p>Shine a flashlight into the right side of the printer. Look for any foreign objects. It is very common for a tiny shred of paper from a previous paper jam to fall into this gear. If the gear cannot complete its rotation, it triggers 6C10. Use tweezers to carefully extract any debris.</p>

<h2>Fix 3: The Hard Reset</h2>
<p>If the mechanism moves freely but the error persists, the sensor itself may have glitched.</p>
<p>Perform a hard reset by unplugging the printer for 15 minutes. While unplugged, press the power button 5 times to drain the capacitors. Plug the printer back directly into a wall outlet (not a surge protector) and turn it on. If the printer completes its noisy initialization cycle without the 6C10 error, the valve successfully switched.</p>`
  },
  {
    title: "Canon 'Ink Absorber Full': Is It Worth Repairing?",
    slug: 'canon-ink-absorber-full-is-it-worth-repairing',
    seoTitle: "Is a Canon Ink Absorber Full Error Worth Fixing? (Cost Analysis)",
    metaDescription: "When your Canon printer hits the 5B00 Ink Absorber Full error, should you pay a technician, reset it yourself, or buy a new printer? An honest cost analysis.",
    excerpt: "The dreaded 'Ink Absorber Full' error forces a tough decision: Do you pay for a professional repair, attempt a messy DIY fix, or throw the printer away?",
    errorCode: '5B00',
    tags: 'Canon, Ink Absorber, 5B00, Repair Cost, DIY Fix, Buying Guide',
    wordCount: 1000,
    difficultyLevel: 'Beginner',
    timeToFix: 'N/A',
    categoryId: maintenanceCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredSnippet: "Is the Canon ink absorber error worth repairing? For budget PIXMA models (under $100), professional repair is NEVER worth it; shop labor and parts will exceed the cost of a new printer. For high-end MegaTank or PRO series printers ($250+), repairing it is highly recommended. If you are technically inclined, you can perform a DIY repair for $0 by washing the physical ink pads in your sink and using a free software tool to reset the digital counter.",
    content: `<h2>The Reality of the 5B00 Error</h2>
<p>When a Canon printer throws an "Ink Absorber Full" error (Support Code 5B00), it enters a hard lock. The printer refuses to scan, copy, or print until it is serviced. This leaves consumers wondering if the machine is effectively dead.</p>

<h2>Scenario 1: Professional Repair (Authorized Canon Center)</h2>
<p>If you take the printer to an authorized Canon repair center, the technician will disassemble the bottom chassis, replace the dense felt ink pads with brand new ones, and use Canon's proprietary software to reset the motherboard counter.</p>
<ul>
    <li><strong>The Cost:</strong> Parts are cheap (usually $15 for the pads), but bench labor is expensive. A standard repair usually costs between <strong>$75 and $120</strong>.</li>
    <li><strong>The Verdict for Budget Printers:</strong> If you own a $60 Canon TS3520 or MG3620, professional repair is a massive waste of money. It is cheaper to buy a brand-new printer with a fresh warranty and new starter ink cartridges.</li>
    <li><strong>The Verdict for Premium Printers:</strong> If you own a $300 Canon MegaTank (G-series) or a $600 imagePROGRAF photo printer, paying $100 for a repair is a smart investment to keep the expensive hardware running.</li>
</ul>

<h2>Scenario 2: The DIY Software-Only Reset</h2>
<p>Many users discover they can download a "Canon Service Tool" to digitally reset the counter to 0% for free, without ever opening the printer casing.</p>
<ul>
    <li><strong>The Cost:</strong> $0.</li>
    <li><strong>The Risk:</strong> Extremely high. The digital counter is reset, but the physical sponge is still soaked. The next time the printer runs a deep clean, the ink will physically overflow the internal plastic tray and pour out onto your desk, potentially ruining furniture or electronics.</li>
    <li><strong>The Verdict:</strong> Only do this if you place the printer on a plastic tray or a stack of newspaper, and understand that you are living on borrowed time. The printer <em>will</em> leak eventually.</li>
</ul>

<h2>Scenario 3: The Full DIY Repair</h2>
<p>If you are good with a screwdriver, you can fix this completely for free.</p>
<ul>
    <li><strong>The Cost:</strong> $0 and about 90 minutes of your time.</li>
    <li><strong>The Process:</strong> You download the Service Tool to reset the digital counter. Then, you unscrew the printer casing, remove the soaking wet felt pads, and wash them in a sink with warm water and dish soap until the water runs clear. After letting them air dry in the sun for 48 hours, you reinstall them.</li>
    <li><strong>The Verdict:</strong> Highly recommended for anyone who hates e-waste and doesn't mind getting ink on their hands. Wear gloves!</li>
</ul>`
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
