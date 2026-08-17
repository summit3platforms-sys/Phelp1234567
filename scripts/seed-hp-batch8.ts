import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const articlesData = [
  {
    title: "HP OfficeJet 4650 Scanner Not Working on Mac? Fix",
    slug: "hp-officejet-4650-scanner-not-working-mac",
    metaDescription: "HP OfficeJet 4650 scanner not working on Mac? A repair tech explains why printing can work while scanning fails, and the missing driver piece.",
    seoTitle: "HP OfficeJet 4650 Scanner Not Working on Mac? Fix",
    wordCount: 1170,
    printerModel: "HP OfficeJet 4650",
    categorySlug: "setup-installation",
    content: `<p>Printing works fine. Scanning does nothing — no error, no image, sometimes not even an attempt, just silence from a scanner that used to work. This split symptom on the HP OfficeJet 4650 has a specific explanation that most general troubleshooting guides skip entirely, because they treat "the printer" as one thing when your Mac actually sees it as two separate functions running on two separate pieces of software.</p>

<h2>Quick-Fix Summary</h2>
<p>Fast version:</p>
<ol>
  <li><strong>Confirm the printer works for printing</strong> — this narrows the problem significantly.</li>
  <li><strong>Try scanning through Apple's own Image Capture app</strong> as a diagnostic step.</li>
  <li><strong>Reinstall the full driver package</strong>, not just a basic print driver.</li>
  <li><strong>Check macOS's Printers & Scanners list</strong> for the scanner specifically, not just the printer.</li>
  <li><strong>Understand the separate scanner driver component</strong> — my uncommon tip, and the real explanation for this exact pattern.</li>
</ol>

<h2>Fix 1: Confirm Printing Still Works</h2>
<p>Try printing a simple test page first, before assuming the entire printer connection is broken.</p>
<p><strong>Why this matters:</strong> if printing works but scanning doesn't, you've already learned something important — the printer's basic network or USB connection to your Mac is fine, which means the problem is specifically isolated to the scanning function rather than the connection as a whole. This completely changes where you should be looking next.</p>

<h2>Fix 2: Try Scanning Through Apple's Image Capture</h2>
<p>Open <strong>Image Capture</strong>, a built-in Mac application (search for it with Spotlight if you don't see it in Applications), and check whether your OfficeJet 4650 appears in the device list on the left side of the window. If it does, try scanning directly through this app rather than through HP's own software.</p>
<p><strong>Why this works:</strong> Image Capture uses macOS's own built-in scanning framework rather than depending on HP's software at all, so this test tells you clearly whether the printer's actual scanning hardware and its basic communication with your Mac are functioning, separate from any issue that might be specific to HP's own driver or app software.</p>

<h2>Fix 3: Reinstall the Full Driver Package</h2>
<p>Go to HP's official support site, search for the OfficeJet 4650, and download the <strong>Full Feature Software and Driver</strong> package for your specific macOS version — not a basic or print-only driver option if one is separately offered.</p>
<p><strong>Why this works:</strong> basic driver packages sometimes include only print functionality, deliberately excluding scanning components to keep the download smaller and simpler for people who only need to print. If scanning was never fully installed in the first place, or a "basic" reinstall replaced a more complete previous installation, the scanning function will appear broken even though nothing actually failed — it just was never there to begin with in this particular install.</p>

<h2>Fix 4: Check Printers & Scanners for the Scanner Entry Specifically</h2>
<p>Open <strong>System Settings → Printers & Scanners</strong> and look closely at your printer's entry. Some HP all-in-ones show up as a single combined entry, while others show separate print and scan components, or require the scanner to be added as its own device alongside the printer. Confirm there's a genuine scanner component listed and associated with your device, not just the printer function alone.</p>
<p><strong>Why this works:</strong> depending on how the driver installed and how macOS is currently representing the device, the scanning function needs its own recognized presence in this list to be usable by any application, HP's own software included. If it's missing here, no amount of troubleshooting within HP's app will fix something that macOS itself doesn't currently see as available.</p>

<h2>Fix 5: Understand the Separate Scanner Driver Component (My Uncommon Tip)</h2>
<p>Here's the explanation that clarifies this entire category of problem, and it's the piece almost no general troubleshooting article walks through clearly.</p>
<p>On many multifunction HP printers, including the OfficeJet 4650, <strong>printing and scanning are handled by genuinely separate driver components on a Mac</strong> — a standard print driver for sending documents to the printer, and a distinct scanner driver, often built around Apple's own <strong>ICA (Image Capture Architecture)</strong> framework, specifically for pulling images back from the device's scanner hardware. These two components can be installed, updated, or broken independently of each other, even though they both live under the same printer's name in your Applications folder and System Settings.</p>
<p><strong>This explains the exact symptom pattern you're likely experiencing:</strong> a macOS update, a partial driver reinstall, or simply an older installation that predates a later macOS version can leave the print component fully functional while the scanner component becomes orphaned, outdated, or disconnected from what the current macOS version expects — without any error message specifically telling you that scanning, and only scanning, is the broken half.</p>
<p>To address this directly: after reinstalling the Full Feature package (Fix 3), specifically verify in Image Capture (Fix 2) that the scanner shows as an available device — this confirms the scanner component specifically, not just the print component, installed and registered correctly this time. If Image Capture still doesn't see it after a full reinstall, remove the printer entirely from Printers & Scanners, restart your Mac, and add it back fresh, watching during setup for scanning to be explicitly listed as one of the detected features rather than assuming it installed silently in the background.</p>
<p><strong>Why this works:</strong> once you understand these are genuinely separate components under one shared name, "printing works, scanning doesn't" stops looking like a contradiction and starts looking like exactly what it is — one half of a two-part driver system that didn't survive whatever changed recently, while the other half did. This reframing is what turns a confusing, seemingly inconsistent problem into a specific, addressable one.</p>

<h2>When to Call a Professional</h2>
<p>If Image Capture never shows the scanner as an available device even after a complete driver reinstall and re-adding the printer fresh, and printing continues to work normally throughout, the scanner hardware itself inside the OfficeJet 4650 may have a genuine fault, or this specific printer-and-macOS-version combination may have reached the end of active driver support from HP for full scanning compatibility. Contact HP support with your printer's serial number and current macOS version to confirm current support status — older multifunction printers do eventually reach a point where scanning support on the newest Mac operating systems isn't actively maintained, even while basic printing continues working through Apple's more universally supported AirPrint standard.</p>

<h2>FAQ</h2>
<h3>Why does my HP OfficeJet 4650 print fine but won't scan on my Mac?</h3>
<p>Printing and scanning are handled by separate driver components on macOS — a standard print driver and a distinct scanner driver often built around Apple's Image Capture framework. One can break or go missing while the other keeps working normally.</p>

<h3>How do I test if the scanning hardware itself is working?</h3>
<p>Open Apple's built-in Image Capture app and check whether your printer appears as an available scanning device there. This bypasses HP's own software and tests the connection more directly.</p>

<h3>Do I need special software beyond the basic driver to scan?</h3>
<p>Yes — make sure you download and install the "Full Feature Software and Driver" package from HP's support site rather than a basic print-only driver, which may not include full scanning components at all.</p>

<h3>Could this be a macOS version compatibility issue rather than something I can fix?</h3>
<p>Possibly, especially on an older printer like the 4650. If a complete reinstall and fresh setup still doesn't restore scanning while printing keeps working, it's worth checking directly with HP support whether your current macOS version is still fully supported for scanning on this specific model.</p>

<p>HP OfficeJet 4650 scanner not working on Mac while printing works fine comes down to one key fact: these are separate driver components under one shared name, and one of them didn't survive whatever changed recently on your system. Reinstall the full package, confirm the scanner shows up specifically in Image Capture, and you'll usually restore the half that went missing.</p>`,
  },
  {
    title: "HP Printer Driver Missing After a Windows Update? Fixed",
    slug: "hp-printer-driver-missing-after-windows-update",
    metaDescription: "HP printer driver missing after a Windows update? A repair tech explains why, and the hidden Optional Updates section most people never check.",
    seoTitle: "HP Printer Driver Missing After a Windows Update? Fixed",
    wordCount: 1180,
    categorySlug: "setup-installation",
    content: `<p>Everything was working fine before the update ran. Now your printer is either completely gone from your printer list, or it's there but throws errors the moment you try to print — and the timing lines up exactly with whatever Windows update installed itself recently. This isn't a coincidence, and it's more common than you'd expect, because Windows updates and printer drivers have a genuinely complicated relationship that most people never have a reason to learn about until it breaks something.</p>

<h2>Quick-Fix Summary</h2>
<p>Fast version:</p>
<ol>
  <li><strong>Check Printers & Scanners</strong> to confirm whether the printer is truly gone or just malfunctioning.</li>
  <li><strong>Run Windows Update again</strong> — sometimes a driver reinstalls automatically on a second pass.</li>
  <li><strong>Check the hidden Optional Updates section</strong> — my uncommon tip, and where manufacturer drivers often hide.</li>
  <li><strong>Download and reinstall the driver manually</strong> from HP's site if automatic methods don't help.</li>
  <li><strong>Roll back the update</strong> as a last resort if it's clearly the direct cause and a fix isn't yet available.</li>
</ol>

<h2>Fix 1: Confirm What's Actually Missing</h2>
<p>Open <strong>Settings → Bluetooth & devices → Printers & scanners</strong> and check whether your HP printer is listed at all. If it's not there, the driver itself was likely removed. If it's still listed but won't print, showing errors or an offline status, the driver may be partially broken rather than fully gone — a meaningfully different problem with a different starting fix.</p>
<p><strong>Why this matters:</strong> these two symptoms point toward different next steps, and confirming which one you're actually dealing with before proceeding saves you from troubleshooting the wrong scenario entirely.</p>

<h2>Fix 2: Run Windows Update Again</h2>
<p>Go to <strong>Settings → Windows Update</strong> and check for updates, even if you believe you're fully current. Let any pending updates install completely, including a restart if prompted.</p>
<p><strong>Why this works:</strong> driver removal during a major Windows update is sometimes followed, on a subsequent update check, by an automatic driver reinstallation that Microsoft pushes out separately once compatibility issues are identified and resolved on their end. This is a passive fix that costs you nothing but a few minutes, and it resolves more of these cases than people expect.</p>

<h2>Fix 3: Check the Hidden Optional Updates Section (My Uncommon Tip)</h2>
<p>Here's the fix that solves the case Fix 2 leaves behind, and it hides in a section of Windows Update that a large share of users have genuinely never opened, because nothing prompts you to look there.</p>
<p>Go to <strong>Settings → Windows Update</strong>, and look for a link or section labeled <strong>Advanced options</strong>. Within that, find <strong>Optional updates</strong> (sometimes shown as a small text link rather than a prominent button). Click into it, and look specifically under a category like <strong>Driver updates</strong>.</p>
<p><strong>What you're looking for:</strong> manufacturer-submitted drivers, including HP printer drivers, are frequently distributed through Windows Update but classified as <strong>optional</strong> rather than automatically installed — meaning Windows knows a compatible driver exists for your hardware, but won't install it without you actively finding this section and checking the box yourself. If your printer's driver got removed during a major update and a replacement exists, it's very often sitting right here, waiting, completely unnoticed.</p>
<p><strong>Why this works:</strong> Microsoft deliberately doesn't push every available driver automatically, partly to avoid unwanted or unnecessary driver changes for users who didn't ask for them — but this means genuinely needed replacement drivers, like one that just got removed from your system during an update, can sit in this optional category indefinitely unless you go looking. This is precisely the kind of "it's technically available but nobody finds it" problem that explains why so many people conclude a driver is permanently gone when it's actually one checkbox away, hidden behind a section of Windows Update that most people have simply never had a reason to open before.</p>

<h2>Fix 4: Manually Download and Reinstall From HP</h2>
<p>If Windows Update, including the Optional updates section, doesn't turn up anything useful, go directly to HP's official support site, search for your exact printer model, and download the <strong>Full Feature Software and Driver</strong> package for your current Windows version. Run the installer, and if your printer is still listed in Printers & Scanners despite not working, remove that broken entry first before reinstalling fresh.</p>
<p><strong>Why this works:</strong> this bypasses Windows' automatic driver distribution system entirely and installs directly from the source, which is the most reliable path when the more passive automatic methods haven't turned anything up — it guarantees you're working with a current, complete driver package rather than waiting for Windows to surface one on its own timeline.</p>

<h2>Fix 5: Roll Back the Update as a Last Resort</h2>
<p>If you're confident a specific recent Windows update caused this, and no working driver is available yet through any of the methods above, go to <strong>Settings → Windows Update → Update history → Uninstall updates</strong>, and remove the specific update you suspect, if it's still within the uninstall window Windows allows.</p>
<p><strong>Why this works:</strong> this directly undoes whatever change broke driver compatibility, restoring your previous working state while you wait for either Microsoft or HP to release a proper fix. It's a genuinely last-resort option though — you'll also lose whatever legitimate improvements and security fixes that update included, and Windows only allows uninstalling certain updates within a limited window after they install, so this isn't always available depending on how much time has passed.</p>

<h2>When to Call a Professional</h2>
<p>If none of the above restores your driver — Windows Update shows nothing new, Optional updates has no relevant entry, a manual HP download doesn't resolve it, and rolling back isn't available or doesn't help — contact HP support directly and describe exactly which Windows update coincided with the problem, since driver compatibility issues following specific major Windows releases are a recognized category HP actively tracks and responds to. In the meantime, if you urgently need to print, connecting the printer to a different, currently-working computer, or printing via a phone through the HP Smart app, can serve as a temporary bridge while a permanent fix is sorted out.</p>

<h2>FAQ</h2>
<h3>Why would a Windows update remove my printer driver in the first place?</h3>
<p>Major Windows updates occasionally clean up or replace drivers system-wide as part of their installation process, and if a compatible updated driver for your specific printer isn't immediately available or properly flagged, the old one can be removed without an immediate replacement being installed.</p>

<h3>What's the difference between regular Windows Update and the Optional updates section?</h3>
<p>Regular Windows Update installs security patches and system updates automatically. The Optional updates section, found under Advanced options, contains additional items — frequently including manufacturer drivers — that Windows has identified as compatible but won't install without your explicit action.</p>

<h3>Is it safe to manually install a driver from HP's website instead of waiting for Windows?</h3>
<p>Yes — downloading directly from HP's official support site is a reliable, safe method, and it's often faster than waiting for Windows to surface a replacement driver on its own automatic schedule.</p>

<h3>Should I just roll back the Windows update instead of troubleshooting the driver?</h3>
<p>Only as a last resort, since you'll lose other improvements from that update, and Windows only allows this within a limited time window. Try the driver-focused fixes first — checking Optional updates and manually reinstalling from HP resolve the vast majority of cases without needing to roll back anything.</p>

<p>An HP printer driver missing after a Windows update is a more common, better-understood problem than it feels like in the moment. Run Windows Update again, but don't stop there — check the Optional updates section specifically, since that's where replacement drivers often sit completely unused. If that comes up empty, a manual download straight from HP closes the gap reliably every time.</p>`,
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
