import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const articlesData = [
  {
    title: "HP Printer Fax Error: No Dial Tone Detected? Fix",
    slug: "hp-printer-fax-error-no-dial-tone",
    metaDescription: "HP printer fax error saying no dial tone detected, even though the line works fine? A repair tech explains the PBX dial tone detection issue.",
    seoTitle: "HP Printer Fax Error: No Dial Tone Detected? Fix",
    wordCount: 1170,
    printerModel: "HP Printer",
    categorySlug: "troubleshooting",
    content: `<p>You pick up a regular phone on the same line, and there's a perfectly normal dial tone right there. Your printer insists otherwise, refusing to dial and reporting that it can't detect one at all. This particular contradiction has a specific, well-understood explanation once you know that your printer's fax modem isn't simply listening for "any sound that resembles a dial tone" — it's checking for something considerably more precise, and there are several genuine reasons that precise check can fail on a line that's otherwise working perfectly.</p>

<h2>Quick-Fix Summary</h2>
<p>Fast version:</p>
<ol>
  <li><strong>Confirm you're using the correct port</strong> on the back of the printer.</li>
  <li><strong>Remove any splitters or extra devices</strong> from the line temporarily.</li>
  <li><strong>Test with a standard phone</strong> on the exact same line and port.</li>
  <li><strong>Check for a non-standard dial tone</strong> on office or PBX phone systems — my uncommon tip.</li>
  <li><strong>Disable dial tone detection</strong> in the printer's fax settings if you've confirmed a non-standard tone.</li>
</ol>

<h2>Fix 1: Confirm the Correct Port</h2>
<p>Look at the back of your printer near the fax connections. Most HP printers with fax capability have two ports — one typically labeled <strong>1-LINE</strong> (the connection to your actual incoming phone line) and another labeled <strong>2-EXT</strong> (for connecting an additional phone or answering machine downstream of the printer). Confirm your phone line cable is plugged into the 1-LINE port specifically, not 2-EXT.</p>
<p><strong>Why this works:</strong> plugging your incoming phone line into the wrong port is a genuinely easy mistake to make, especially if you've ever unplugged and reconnected cables for any reason, and it produces exactly this symptom — the printer has no functional connection to the actual phone line, so naturally it detects no dial tone at all, regardless of anything else being correctly configured.</p>

<h2>Fix 2: Remove Splitters and Extra Devices</h2>
<p>Disconnect any phone line splitters, surge protectors, or additional devices sharing the line, and connect the printer's fax port directly to the <strong>wall jack</strong> instead, at least temporarily for testing purposes.</p>
<p><strong>Why this works:</strong> every additional device or splitter in the line introduces a small amount of signal degradation, and while this rarely causes a problem for normal voice calls, dial tone detection specifically can be sensitive enough that a degraded signal fails to register as a recognizable tone even though a human ear on the same line hears something that sounds completely normal.</p>

<h2>Fix 3: Test With a Standard Phone</h2>
<p>Connect a regular telephone directly to the exact same wall jack and line the printer is using, and listen carefully — not just for the presence of a dial tone, but for anything unusual about its sound, pattern, or timing compared to what you might expect.</p>
<p><strong>Why this works:</strong> this confirms whether the line itself is fundamentally working, which narrows the problem toward either the printer's specific connection or, as covered next, the particular characteristics of your dial tone rather than a completely dead line.</p>

<h2>Fix 4: Check for a Non-Standard Dial Tone (My Uncommon Tip)</h2>
<p>Here's the explanation for cases that survive everything above — a correctly connected printer, on a confirmed working line, still reporting no dial tone detected, and it's particularly common in office environments or on certain phone systems.</p>
<p>Your printer's fax modem doesn't recognize a dial tone by simply detecting "some sound is present." It's listening for a <strong>specific frequency and pattern</strong> that matches standard telephone dial tone specifications. Most residential phone lines produce exactly this standard tone, and the printer detects it without any issue. However, <strong>office phone systems running through a PBX (Private Branch Exchange), certain VoIP configurations, and some international or non-standard phone systems generate a dial tone that sounds essentially normal to a human ear but doesn't precisely match the standard frequency pattern the printer's detection circuitry is specifically listening for.</strong> The line works. The tone is real. It's simply not the exact standard your printer's modem was built to recognize automatically.</p>
<p><strong>This is exactly why testing with a regular phone in Fix 3 can be misleading</strong> — a human ear is remarkably forgiving about minor variations in dial tone characteristics, easily interpreting anything tone-like as "normal," while your printer's detection circuitry is considerably stricter and more literal about what qualifies.</p>
<p>To address this directly: through your printer's control panel, find the <strong>Fax Setup</strong> menu, and look for a setting related to <strong>Dial Tone Detection</strong> (sometimes phrased as "detect dial tone before dialing"). <strong>Disable this setting.</strong> With detection turned off, the printer will pause for a brief, fixed period of time and then dial blind, without waiting to confirm a recognized tone first — which works perfectly well on a line that's genuinely functional, even if its specific tone characteristics don't match what automatic detection expects.</p>
<p><strong>Why this works:</strong> you're not fixing anything broken — the line was never actually broken. You're simply telling the printer to stop performing a verification check that its own detection circuitry isn't equipped to pass correctly on this particular phone system, while trusting that the line is genuinely ready to dial after the pause, which it is. This single setting resolves the majority of "no dial tone detected" complaints specifically in office environments and on phone systems that aren't standard residential lines, and it's a setting almost nobody thinks to look for because the error message itself sounds like a hardware or connection problem rather than a detection-sensitivity one.</p>

<h2>Fix 5: Confirm With a Test Fax</h2>
<p>Once dial tone detection is disabled, send a test fax to a known-working fax number, or have someone send one to you, to confirm the printer now dials and connects successfully.</p>
<p><strong>Why this works:</strong> this verifies the actual fix worked end to end, rather than just confirming the setting was changed without confirming that blind dialing genuinely succeeds on your specific line.</p>

<h2>When to Call a Professional</h2>
<p>If you've confirmed the correct port, removed splitters, verified the line works with a standard phone, and disabled dial tone detection — and the printer still won't successfully dial or complete a fax — contact HP support with your printer's serial number, since a failing fax modem inside the printer itself becomes the more likely remaining explanation. If you're on a business phone system and disabling dial tone detection doesn't help, it's also worth checking with whoever manages your phone system directly, since certain PBX configurations may require additional adjustments beyond what's controllable from the printer's own settings.</p>

<h2>FAQ</h2>
<h3>Why does my printer say no dial tone when I can clearly hear one on a regular phone?</h3>
<p>Your printer's fax modem checks for a specific standard dial tone frequency, which is stricter than what a human ear judges as "normal." Office PBX systems, VoIP setups, and some non-standard phone systems produce a functional but slightly different tone that fails this automatic detection even though the line works fine.</p>

<h3>Is it safe to disable dial tone detection?</h3>
<p>Yes — this simply tells the printer to dial after a brief pause rather than waiting to confirm a recognized tone first. On a genuinely working line, this works reliably and is a standard, supported setting specifically for situations like this.</p>

<h3>Which port should my phone line connect to on the printer?</h3>
<p>The port labeled 1-LINE, which connects to your actual incoming phone line. The 2-EXT port is for an additional phone or answering machine connected downstream of the printer, not your primary line connection.</p>

<h3>Could this be a VoIP compatibility issue instead?</h3>
<p>It's possible, though that typically causes fax transmissions to fail partway through rather than failing to detect a dial tone at all. If disabling dial tone detection doesn't resolve things and you're on VoIP service, a deeper compatibility issue with fax technology generally may be the underlying cause.</p>

<p>An HP printer fax error reporting no dial tone despite a perfectly normal-sounding line is usually a detection sensitivity issue, not a real connection problem — confirm the correct port and a clean connection, then check whether you're on an office or non-standard phone system where disabling dial tone detection lets the printer dial confidently on a line its own circuitry simply couldn't verify automatically.</p>`,
  },
  {
    title: "HP Printer Double-Feeding From the ADF? [Fixed]",
    slug: "hp-printer-double-feeding-adf",
    metaDescription: "HP printer double-feeding pages from the ADF? A repair tech explains the difference between a dirty separation pad and a worn one, and how to tell.",
    seoTitle: "HP Printer Double-Feeding From the ADF? [Fixed]",
    wordCount: 1190,
    categorySlug: "troubleshooting",
    content: `<p>Two pages go in together, scanned or copied as one, and now you're missing content or dealing with a jam partway through what should have been a simple multi-page job. Double-feeding from the automatic document feeder is one of the more common ADF complaints, and while cleaning solves it a large share of the time, there's an important distinction most guides never make clearly — between a problem that cleaning fixes and one that cleaning genuinely can't, no matter how thoroughly you do it.</p>

<h2>Quick-Fix Summary</h2>
<p>Fast version:</p>
<ol>
  <li><strong>Fan your paper stack</strong> before loading it into the ADF.</li>
  <li><strong>Check for mismatched paper</strong> — different sizes or types in the same stack.</li>
  <li><strong>Clean the ADF rollers and separation pad</strong> thoroughly.</li>
  <li><strong>Understand wear versus dirt</strong> — my uncommon tip, and the distinction that determines whether cleaning will actually work.</li>
  <li><strong>Reduce the stack size</strong> as a practical workaround if the pad is genuinely worn.</li>
</ol>

<h2>Fix 1: Fan the Paper Before Loading</h2>
<p>Before placing your document stack into the ADF, fan the pages by flexing the stack slightly and riffling through the edges with your thumb, the way you'd shuffle a deck of cards, then tap the edges square against a flat surface before loading.</p>
<p><strong>Why this works:</strong> freshly stacked or recently printed paper can cling together very slightly through static or residual pressure from handling, particularly in low-humidity conditions, and fanning separates individual sheets enough that the feed mechanism has a genuinely easier time grabbing just one at a time rather than starting with pages that are already lightly adhered to each other.</p>

<h2>Fix 2: Check for Mismatched Paper</h2>
<p>Confirm every page in your stack is the same size, weight, and type — a mix of different paper weights, or even a single page of glossier or thicker stock mixed into an otherwise uniform stack, is worth checking for specifically.</p>
<p><strong>Why this works:</strong> the ADF's feed mechanism is calibrated to handle a fairly consistent range of paper characteristics, and a stack with inconsistent thickness or surface texture can behave unpredictably through the feed path, sometimes causing exactly the kind of grip failure that results in two sheets moving through together.</p>

<h2>Fix 3: Clean the Rollers and Separation Pad</h2>
<p>Open the ADF cover (check your printer's manual for the exact release mechanism, since this varies by model) and locate both the <strong>feed rollers</strong> and the <strong>separation pad</strong> — a small, usually rubber or textured pad, often spring-loaded, that sits opposite the rollers. Clean both thoroughly with a lint-free cloth lightly dampened with water, removing visible dust, paper fiber buildup, and any shine or residue you can see. Let everything dry fully before closing the cover and testing.</p>
<p><strong>Why this works:</strong> dust and paper fiber accumulate on both components over time from normal use, and this buildup reduces the friction each part needs to do its job — the rollers need grip to pull paper through, and the separation pad needs grip to hold back every sheet except the one actually being fed. Cleaning restores that friction when the underlying issue is genuinely just accumulated dirt.</p>

<h2>Fix 4: Understand Wear Versus Dirt (My Uncommon Tip)</h2>
<p>Here's the distinction that determines whether Fix 3 actually solves your problem permanently, or only helps temporarily before the exact same double-feeding returns within days or weeks — and it's a distinction almost no general troubleshooting guide draws clearly, treating "clean the separation pad" as the complete and permanent answer regardless of the pad's actual condition.</p>
<p>The separation pad isn't just a surface that gets dirty. It's a <strong>consumable, wearable component</strong>, functionally similar to a brake pad in your car — it works specifically because its surface material has a certain texture and friction coefficient, and <strong>that surface material physically wears down and smooths out over months or years of use</strong>, the same way any friction surface degrades with repeated contact over time. A pad that's genuinely worn doesn't just look dirty; it's lost the actual physical texture that gave it grip in the first place, and no amount of cleaning restores material that's been worn away, any more than wiping down a bald tire restores its tread.</p>
<p><strong>How to tell the difference:</strong> after a thorough cleaning per Fix 3, run several test jobs. If double-feeding stops completely and stays resolved over the following weeks of normal use, you were dealing with dirt, and cleaning was the correct and complete fix. If double-feeding returns within days, or never fully stopped despite a genuinely thorough cleaning, you're very likely dealing with a worn pad rather than a dirty one — and at that point, the separation pad needs <strong>replacement</strong>, not another round of cleaning. Many HP printers sell this as a specific, individually purchasable replacement part (sometimes bundled with the roller as a maintenance kit), precisely because manufacturers know it's a wear item with a finite lifespan, not something meant to be cleaned indefinitely forever.</p>
<p><strong>Why this distinction matters so much:</strong> without understanding it, people can cycle through cleaning the same worn pad repeatedly for months, getting brief temporary improvement each time as cleaning removes surface dust on top of an already-worn material, followed by the same double-feeding returning shortly after — never realizing the actual fix was a five-dollar replacement part rather than an endless cleaning routine. Search your exact printer model plus "separation pad replacement" to find the correct part and installation instructions specific to your unit.</p>

<h2>Fix 5: Reduce Stack Size as a Temporary Workaround</h2>
<p>If you're waiting on a replacement pad or dealing with occasional double-feeding that hasn't fully committed to being a wear issue yet, try loading smaller batches of pages into the ADF at a time rather than a full stack.</p>
<p><strong>Why this works:</strong> a partially worn pad may still have enough remaining grip to handle occasional single-sheet separation reliably, even if it struggles more consistently under the weight and pressure of a larger, fuller stack — reducing the load can buy you reliable functionality in the short term while you source a proper replacement part.</p>

<h2>When to Call a Professional</h2>
<p>If you've cleaned both the rollers and separation pad thoroughly, confirmed uniform paper, fanned your stack properly, and double-feeding still occurs consistently or returns quickly after cleaning, you're very likely dealing with a genuinely worn separation pad needing replacement — this is typically a straightforward, user-replaceable part rather than something requiring a technician visit, so check HP's parts store or your printer's manual for the specific replacement procedure before assuming you need professional service. If replacing the pad doesn't resolve it, contact HP support with your printer's serial number, since a deeper feed mechanism issue may be involved.</p>

<h2>FAQ</h2>
<h3>How do I know if my ADF problem is dirt or a worn separation pad?</h3>
<p>Clean thoroughly first and test over the following days. If double-feeding stops and stays resolved, it was dirt. If it returns quickly or never fully stopped despite thorough cleaning, the pad is very likely worn and needs replacement rather than further cleaning.</p>

<h3>Can I replace the separation pad myself?</h3>
<p>On most HP printers, yes — it's typically designed as a user-replaceable maintenance part specifically because manufacturers expect it to wear out over time. Check your printer's manual or HP's parts store for the exact part and replacement instructions for your model.</p>

<h3>Why does fanning the paper before loading actually help?</h3>
<p>Freshly handled or printed paper can cling together slightly through static or residual pressure, and fanning separates individual sheets enough for the feed mechanism to grab just one at a time more reliably.</p>

<h3>Is double-feeding always a sign something needs replacing?</h3>
<p>Not necessarily — dirt, static, mismatched paper, or overfull stacks can all cause occasional double-feeding without any worn parts involved. It's specifically when double-feeding persists or quickly returns despite thorough cleaning that a worn separation pad becomes the likely explanation.</p>

<p>HP printer double-feeding from the ADF usually starts with cleaning the rollers and separation pad, and that genuinely resolves most cases. But if the problem keeps coming back despite thorough cleaning, remember that the separation pad is a wear item with a finite lifespan, not a surface that stays effective forever just because it's clean — at that point, replacement, not another cleaning session, is the actual fix.</p>`,
  },
  {
    title: "HP Photosmart C4780 Driver for Windows 10: Where to Find It",
    slug: "hp-photosmart-c4780-driver-windows-10",
    metaDescription: "Looking for an HP Photosmart C4780 driver for Windows 10? A repair tech explains why one may not exist, and how to print anyway using generic drivers.",
    seoTitle: "HP Photosmart C4780 Driver for Windows 10: Where to Find It",
    wordCount: 1180,
    printerModel: "HP Photosmart C4780",
    categorySlug: "setup-installation",
    content: `<p>I want to be honest with you before you spend more time searching: the Photosmart C4780 was discontinued years before Windows 10 was ever released, and HP's official support for this printer likely ended before Windows 10 existed as something a driver would even need to be built for. That's not the end of the story, though — it just means the answer looks different than "download the official driver," and there's a genuinely workable path forward that most people troubleshooting this exact printer never discover.</p>

<h2>Quick Summary</h2>
<ol>
  <li><strong>Confirm officially what HP offers</strong> — expect this to come up empty, and that's useful information.</li>
  <li><strong>Understand what a print language is</strong> — the concept that makes the rest of this possible. My uncommon tip.</li>
  <li><strong>Use Windows' built-in generic driver</strong> matching your printer's print language.</li>
  <li><strong>Connect via USB for the most reliable results</strong> on hardware this old.</li>
  <li><strong>Accept realistic limitations</strong> — basic printing works; advanced features likely won't.</li>
</ol>

<h2>Step 1: Confirm What HP Actually Offers (Expect Nothing)</h2>
<p>Search HP's official support site for "Photosmart C4780" and check what drivers are listed. Given this printer's age, don't be surprised if Windows 10 isn't listed as a supported operating system at all, or if the page shows only very old driver versions clearly built for Windows XP, Vista, or early Windows 7 — with nothing built anywhere near Windows 10's actual release timeframe.</p>
<p><strong>Why this matters:</strong> confirming this clearly, rather than continuing to search hopefully, tells you decisively that you're not looking for a missing download you simply haven't found yet — you're dealing with a genuine, permanent gap in official support that no amount of searching will fill, because HP never built anything for this specific combination in the first place.</p>

<h2>Step 2: Understand Print Languages (My Uncommon Tip)</h2>
<p>Here's the concept that turns "no official driver exists" from a dead end into a solvable problem, and it's genuinely useful to understand even beyond this one printer, because it applies to legacy hardware broadly.</p>
<p>A printer driver's job is essentially translation — converting whatever your computer and applications want printed into instructions the printer's actual physical engine understands. But underneath that translation, most printers, including consumer models from the Photosmart C4780's era, communicate using a standardized <strong>printer language</strong> or <strong>Page Description Language (PDL)</strong> — common examples include PCL (Printer Command Language) or, on some models, a form of PostScript compatibility. <strong>This underlying language is what the printer's hardware actually speaks, and it typically survives long after manufacturer-specific driver software has been abandoned, discontinued, and forgotten.</strong></p>
<p>This matters enormously for your situation because Windows itself includes <strong>generic, built-in drivers</strong> for these standard printer languages — drivers Microsoft maintains directly, independent of any specific manufacturer's ongoing support. These generic drivers don't know anything specific about your particular Photosmart model, its exact button layout, or any HP-specific software features, but they know how to speak the underlying standard language your printer's engine actually understands, well enough to accomplish genuinely functional basic printing.</p>
<p><strong>Why this works as a strategy:</strong> you're not trying to resurrect abandoned HP software or find an impossible official driver. You're recognizing that your printer's hardware speaks a standard language that outlived HP's specific software support for it, and connecting to that underlying language directly through Windows' own built-in generic tools instead.</p>

<h2>Step 3: Use Windows' Generic Driver</h2>
<p>Connect the printer to your Windows 10 computer (via USB is the most reliable method for hardware this old — see Step 4). Go to <strong>Settings → Devices → Printers & scanners → Add a printer or scanner</strong>. If Windows doesn't automatically detect and offer a specific driver, click <strong>The printer that I want isn't listed</strong>, then choose the option to add a <strong>local printer</strong> and select it manually.</p>
<p>When prompted to choose a manufacturer and printer model from Windows' own built-in list, if no exact HP Photosmart C4780 entry appears, look for a <strong>generic option</strong> — something like "HP" paired with a generic PCL-compatible entry, or a broadly generic "Generic / Text Only" or "Generic PCL" driver if a closer match isn't available. Select the closest reasonable match and complete the installation.</p>
<p><strong>Why this works:</strong> you're deliberately choosing a generic driver that speaks the same underlying print language your printer's engine understands, rather than searching for an exact model match that Windows' built-in library was never going to contain for a printer this specific and this old. This won't give you every feature the original HP software once offered, but it establishes genuine, functional communication between Windows and your printer's actual hardware.</p>

<h2>Step 4: Connect via USB for Best Results</h2>
<p>If your Photosmart C4780 has both USB and network connectivity, use a direct <strong>USB connection</strong> for this setup, particularly given the printer's age.</p>
<p><strong>Why this works:</strong> wireless setup and network printing protocols have evolved considerably since this printer's era, and older printers can sometimes struggle to communicate reliably with modern network security and discovery standards. A direct USB connection sidesteps that entire category of complication, offering a more straightforward and more likely to succeed path for genuinely old hardware like this.</p>

<h2>Step 5: Test and Set Realistic Expectations</h2>
<p>Print a simple test document to confirm basic functionality. Understand upfront that scanning, advanced photo printing features the C4780 was originally marketed around, ink level monitoring, and any HP-specific software conveniences are unlikely to be available through this generic approach — you're specifically restoring basic print functionality, not the full original feature set.</p>
<p><strong>Why this matters:</strong> setting this expectation from the start prevents frustration with what will genuinely feel like a more limited experience than the printer originally offered when it launched with dedicated HP software years ago. For many people's actual current need — occasionally printing a document from an old but still physically functional printer rather than buying something new — this trade-off is completely reasonable.</p>

<h2>When to Call a Professional</h2>
<p>Given the genuine age of this printer, if a generic driver connection doesn't produce working prints at all — not just missing advanced features, but a complete inability to print anything — the printer's hardware itself may have failed, which is a realistic possibility on a unit this old regardless of driver or software considerations. At that point, given the printer's age and the cost of professional repair relative to its age and the price of a current replacement, it's genuinely worth weighing whether repairing decade-plus-old consumer hardware makes practical sense compared to replacing it with something built for and actively supported on current systems.</p>

<h2>FAQ</h2>
<h3>Does HP make a Windows 10 driver for the Photosmart C4780?</h3>
<p>Almost certainly not — this printer was discontinued years before Windows 10's release, and official HP support ended well before there was any reason to build a driver for that operating system. Check HP's support site to confirm for your specific unit, but don't expect to find one.</p>

<h3>How can old hardware work with Windows 10 if there's no official driver?</h3>
<p>Most printers from this era communicate using a standardized print language that Windows itself includes generic, built-in driver support for, independent of the manufacturer. This lets you establish basic functional printing even without any manufacturer-specific software.</p>

<h3>Will I be able to scan or use advanced features without an official driver?</h3>
<p>Likely not through this generic method — you're restoring basic print functionality specifically, not the full original feature set that came with HP's dedicated software when this printer was new and actively supported.</p>

<h3>Should I try USB or wireless setup on a printer this old?</h3>
<p>USB is generally more reliable for hardware this age, since wireless and network security standards have evolved considerably since this printer was designed, and older wireless hardware can struggle with modern network environments.</p>

<p>Finding an HP Photosmart C4780 driver for Windows 10 the traditional way — searching HP's site for an official download — is very likely a dead end, and that's worth accepting early rather than continuing to search. The real path forward is Windows' own generic printer drivers, connecting to the standard print language this printer's hardware still speaks underneath, years after HP's own software support for it ended.</p>`,
  }
];

async function seed() {
  const brand = await prisma.brand.findUnique({ where: { slug: 'hp' } });
  
  if (!brand) {
    console.error("HP brand not found!");
    process.exit(1);
  }

  const categories = await prisma.category.findMany();
  
  for (const articleData of articlesData) {
    const { categorySlug, ...rest } = articleData;
    
    let category = categories.find(c => c.slug === categorySlug);
    if (!category) {
       category = categories[0];
    }

    const created = await prisma.article.upsert({
      where: { slug: rest.slug },
      update: {
        ...rest,
        status: 'published',
        brandId: brand.id,
        categoryId: category.id,
        publishedAt: new Date()
      },
      create: {
        ...rest,
        status: 'published',
        brandId: brand.id,
        categoryId: category.id,
        publishedAt: new Date()
      }
    });

    console.log(`Created/Updated: \${created.title}`);
  }
}

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
