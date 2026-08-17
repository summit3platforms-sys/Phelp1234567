import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const articlesData = [
  {
    title: "HP M428fdw Scan to Email Not Working? Fixed",
    slug: "hp-laserjet-m428fdw-scan-to-email-not-working",
    metaDescription: "HP M428fdw scan to email not working? A repair tech explains the SMTP authentication setting that breaks this feature most often, and 4 other fixes.",
    seoTitle: "HP M428fdw Scan to Email Not Working? Fixed",
    wordCount: 1190,
    printerModel: "HP LaserJet M428fdw",
    categorySlug: "connectivity",
    content: `<p>Scan to email is one of those features that works perfectly for months and then, seemingly overnight, just stops — no error you can point to, no obvious cause, just documents that scan fine but never arrive in anyone's inbox. If your HP LaserJet M428fdw's scan to email has stopped working, there's a good chance the actual cause isn't the printer at all, but a change on your email provider's side that broke a setting the printer depends on quietly, in the background, without telling you.</p>

<h2>Quick-Fix Summary</h2>
<p>Fast version:</p>
<ol>
  <li><strong>Confirm the printer's network connection</strong> is genuinely active.</li>
  <li><strong>Recheck your outgoing (SMTP) server settings</strong> for accuracy.</li>
  <li><strong>Verify email authentication</strong> — this is the fix that solves it most often. My uncommon tip.</li>
  <li><strong>Check the recipient's spam folder</strong> before assuming nothing sent.</li>
  <li><strong>Update the printer's firmware</strong> if authentication settings seem correct but still fail.</li>
</ol>

<h2>Fix 1: Confirm the Network Connection</h2>
<p>Print a network configuration page from the M428fdw's control panel (usually under Setup or Reports) and confirm it shows an active IP address and successful connection status.</p>
<p><strong>Why this works:</strong> scan to email requires the printer to actively reach out over your network to an outgoing mail server — if the printer's own network connection has dropped or changed, that entire chain breaks at the very first step, before authentication or email settings even come into play.</p>

<h2>Fix 2: Recheck Your SMTP Server Settings</h2>
<p>From the printer's control panel or its Embedded Web Server (accessible by typing the printer's IP address into a browser), navigate to the <strong>Scan to Email</strong> setup section and review your outgoing mail server (SMTP) settings — server address, port number, and encryption type (often SSL or TLS).</p>
<p><strong>Why this works:</strong> these settings were entered once during initial setup and then largely forgotten, but email providers do occasionally change their required server addresses, ports, or encryption requirements over time, particularly as they tighten security standards. A setting that was correct when scan to email was first configured can quietly become outdated without any notification reaching you directly — the printer just starts failing silently instead.</p>

<h2>Fix 3: Verify Email Authentication (My Uncommon Tip)</h2>
<p>Here's the fix that resolves the most common version of this complaint, and it's almost always the actual root cause when scan to email was working fine for a long stretch and then suddenly stopped with no obvious explanation.</p>
<p>Major email providers — Gmail, Outlook/Microsoft 365, Yahoo, and others — have progressively tightened their security requirements over recent years, specifically around <strong>allowing basic username-and-password authentication from third-party devices</strong> like a scanner or printer. Many providers now require either an <strong>app-specific password</strong> (a separate, dedicated password generated specifically for a device like your printer, distinct from your normal account password) or have disabled basic authentication entirely in favor of more modern authentication methods that older printer firmware often can't use at all.</p>
<p><strong>What this means practically:</strong> if your scan to email was configured using your regular email password, and it worked for a while before suddenly failing, your email provider very likely rolled out a security policy change that silently rejected the printer's login attempt going forward — the printer keeps trying to send with credentials that used to work and no longer do, often without displaying a clear, specific error explaining why.</p>
<p>To fix it: sign into your email account's security settings directly (search "[your email provider] app password" for exact steps, since the process varies by provider) and generate an <strong>app-specific password</strong>. Enter this new app password into the M428fdw's scan to email authentication settings in place of your regular account password.</p>
<p><strong>Why this works:</strong> an app-specific password satisfies the provider's stricter security requirements — it's scoped narrowly to just this one purpose, can be revoked independently without affecting your main account password, and it's exactly the credential type most modern email providers now expect from a device like a printer rather than a full account login. This single change resolves the overwhelming majority of "scan to email suddenly stopped working" cases I encounter, because it addresses a security policy shift that happens on your email provider's end — something the printer had absolutely no way to warn you about in advance.</p>

<h2>Fix 4: Check the Spam Folder Before Assuming Total Failure</h2>
<p>Before concluding scan to email has failed completely, check the <strong>spam or junk folder</strong> of the recipient email address, including your own if you're testing by sending to yourself.</p>
<p><strong>Why this works:</strong> automated emails from office equipment sending as an unfamiliar or generic address can occasionally get flagged by spam filters even when the sending process itself worked perfectly — this isn't the same problem as the authentication failures above, and confirming this possibility first prevents you from troubleshooting a "failure" that was actually a successful send landing somewhere unexpected.</p>

<h2>Fix 5: Update the Printer's Firmware</h2>
<p>If your authentication settings appear correct and current but scan to email still fails, check for and install the latest firmware for the M428fdw through the printer's Embedded Web Server or the HP Smart app.</p>
<p><strong>Why this works:</strong> firmware updates occasionally include revised support for newer authentication standards and security protocols that major email providers have shifted toward, and a printer running old firmware may simply lack the technical capability to complete a login method your email provider now requires, regardless of how correctly you've entered your credentials.</p>

<h2>When to Call a Professional</h2>
<p>If the network connection is confirmed active, SMTP settings are current, you've set up and correctly entered an app-specific password, spam folders show nothing, and firmware is current — and scan to email still fails, the issue may involve firewall or network security settings blocking outgoing mail traffic on your specific network (particularly relevant in office environments with stricter IT policies), which is worth raising with whoever manages your network configuration. If you've confirmed it's not a network-blocking issue, contact HP support with your printer's serial number and firmware version, since a persistent failure despite correct settings on all sides points toward something worth their direct diagnostic attention.</p>

<h2>FAQ</h2>
<h3>Why did scan to email suddenly stop working after months of no problems?</h3>
<p>The most common cause is your email provider tightening its authentication security, no longer accepting your regular account password from a device like a printer. Setting up an app-specific password in the printer's email settings resolves this in most cases.</p>

<h3>What is an app-specific password and how do I get one?</h3>
<p>It's a separate password generated specifically for one device or application, distinct from your main account password, required by many email providers for third-party device logins. Generate one in your email account's security settings — search your specific provider's name plus "app password" for exact steps.</p>

<h3>Could my company's network settings be blocking this instead?</h3>
<p>Yes, particularly in office environments — outgoing mail traffic can be restricted by firewall or network security policy independent of anything wrong with your printer or email settings. If personal troubleshooting doesn't resolve it, this is worth checking with your network administrator.</p>

<h3>Does the scan itself fail, or does the scan work but the email never arrives?</h3>
<p>Usually the scan completes successfully and only the email sending step fails — check the printer's control panel for any error message specifically about the email send, and check spam folders before assuming complete failure.</p>

<p>HP LaserJet M428fdw scan to email not working almost always traces back to your email provider's authentication requirements changing quietly in the background, not a problem with the printer itself. Confirm your network connection and SMTP settings, but put real effort into setting up an app-specific password — it's the fix that resolves this exact complaint more often than everything else on this list combined.</p>`,
  },
  {
    title: "HP LaserJet M1136 Driver for Windows 11 [Install Guide]",
    slug: "hp-laserjet-m1136-driver-windows-11",
    metaDescription: "Installing the HP LaserJet M1136 driver on Windows 11? A repair tech explains the Full Feature vs Basic driver trap that causes silent install failures.",
    seoTitle: "HP LaserJet M1136 Driver for Windows 11 [Install Guide]",
    wordCount: 1150,
    printerModel: "HP LaserJet M1136",
    categorySlug: "setup-installation",
    content: `<p>Old workhorse printers like the M1136 have a way of outliving several computers, and getting one talking to a brand-new Windows 11 machine can feel like introducing two generations that don't quite speak the same language. The good news up front: HP does provide a genuine Windows 11 driver for this printer, and it's not one of the models that's been fully abandoned. The trouble usually isn't availability — it's a specific, easy-to-make choice during download that causes the installation to fail silently.</p>

<h2>Quick-Fix Summary</h2>
<p>Fast version:</p>
<ol>
  <li><strong>Download from HP's official driver page</strong>, not a third-party mirror site.</li>
  <li><strong>Choose "Full Feature Software and Driver"</strong> — not the basic option. My uncommon tip, and the most common mistake.</li>
  <li><strong>Run the installer before connecting the USB cable.</strong></li>
  <li><strong>Clear temp files</strong> if the installer behaves strangely or hangs.</li>
  <li><strong>Run HP Print and Scan Doctor</strong> as a backup diagnostic and fix tool.</li>
</ol>

<h2>Fix 1: Get the Driver From HP Directly</h2>
<p>Go to HP's official support and driver download site and search specifically for "HP LaserJet Pro M1136." Select <strong>Windows 11</strong> as your operating system when prompted. If HP's automatic detection tool fails to find a driver list (a known quirk on some regional versions of the support site), manually select Windows 11 from the operating system dropdown rather than giving up on the search.</p>
<p><strong>Why this works:</strong> third-party driver aggregator sites, even ones that appear legitimate, can host outdated, modified, or incorrectly packaged versions of a driver. Going directly to HP's own page guarantees you're getting the genuine, current package specifically built and tested for this exact printer and OS combination.</p>

<h2>Fix 2: Choose "Full Feature Software and Driver," Not the Basic Option (My Uncommon Tip)</h2>
<p>Here's the choice that trips up more people than anything else on this page, and it's easy to make without realizing you're making it at all.</p>
<p>On HP's driver download page, you'll typically see more than one download option — something like a <strong>Basic Driver</strong> (sometimes labeled as an INF-only or print-only driver) and a <strong>Full Feature Software and Driver</strong> package. The basic option is smaller, faster to download, and looks perfectly sufficient if all you want to do is print. <strong>Choose the Full Feature Software and Driver package instead, even if you only need basic printing.</strong></p>
<p><strong>Why this works:</strong> Windows 11 enforces considerably stricter driver signing and validation requirements than older Windows versions did, and a bare-bones basic driver package for an older printer like the M1136 sometimes lacks the fully signed, properly bundled components that Windows 11 insists on before it will install and trust a print driver. The Full Feature package includes the complete, properly signed software bundle — print driver, scan components, and supporting utilities all packaged together — which tends to install cleanly where the stripped-down basic driver silently fails, gets rejected partway through, or installs but never actually appears as a usable printer. This is precisely the kind of failure that looks like "the driver just won't install" when what's really happening is that an incomplete package is running into a validation wall you can't see happening. If you've tried installing before and it seemed to go nowhere, this is very likely why.</p>

<h2>Fix 3: Install Before You Connect</h2>
<p>Run the downloaded installer <strong>before</strong> plugging in the USB cable. When the installer prompts you to connect the printer, that's your cue — not before.</p>
<p><strong>Why this works:</strong> if Windows detects an unrecognized USB printer before the proper driver is installed, it will attempt to install its own generic driver automatically, and that generic driver can conflict with or block the real HP installer from completing correctly afterward. Installing first gives the real driver a clear run, and lets it take over cleanly the moment the printer is detected.</p>

<h2>Fix 4: Clear Temp Files If the Installer Misbehaves</h2>
<p>If the installer hangs, crashes, or behaves unpredictably partway through: press <strong>Windows key + R</strong>, type <strong>temp</strong>, and delete the contents of that folder. Repeat with <strong>%temp%</strong> and clear out the <strong>prefetch</strong> folder as well. Then try running the installer again.</p>
<p><strong>Why this works:</strong> installer processes on Windows rely on temporary files during setup, and leftover fragments from a previous failed attempt — this driver or an unrelated one — can occasionally interfere with a fresh install attempt in ways that produce confusing, inconsistent failures. Clearing this out gives the installer a clean slate to work from.</p>

<h2>Fix 5: Run HP Print and Scan Doctor</h2>
<p>Download and run <strong>HP Print and Scan Doctor</strong> from HP's support site. It's a free official diagnostic tool that can detect driver issues, connection problems, and several other common causes automatically, sometimes resolving them without further manual steps.</p>
<p><strong>Why this works:</strong> this tool was built by the people who wrote the driver, so it recognizes failure patterns specific to HP printers that a generic troubleshooting checklist can't anticipate. It's worth running either as your first step for a quick automated attempt, or as a backup if manual installation continues to give you trouble.</p>

<h2>When to Call a Professional</h2>
<p>If you've downloaded the Full Feature package directly from HP, installed before connecting the cable, cleared temp files, and run Print and Scan Doctor — and the printer still won't install or print correctly on Windows 11 — try a different USB cable and port first, since cable failures are common on older hardware and cost nothing to rule out. If that doesn't help, this specific printer-and-OS combination may have a genuine compatibility limitation worth confirming directly with HP support, since official support windows for older printer models do eventually narrow over time even when a driver technically still exists.</p>

<h2>FAQ</h2>
<h3>Does HP still make a Windows 11 driver for the M1136?</h3>
<p>Yes — this model has an official Windows 11 driver available directly from HP's support site, unlike some older printers that have been fully discontinued from driver support.</p>

<h3>Why did my driver installation seem to complete but the printer doesn't work?</h3>
<p>You may have downloaded the Basic or INF-only driver rather than the Full Feature Software and Driver package. Windows 11's stricter driver validation can silently reject the incomplete basic package. Reinstall using the Full Feature option specifically.</p>

<h3>Should I connect the printer before or after running the installer?</h3>
<p>After. Run the installer first and connect the USB cable only when prompted — connecting early can let Windows install its own generic driver first, which conflicts with the proper HP installation.</p>

<h3>Is HP Print and Scan Doctor worth running even if I install manually first?</h3>
<p>Yes, it's worth running either way — as a first quick attempt, or as a diagnostic backup if manual installation runs into trouble. It catches some driver and connection issues automatically that manual troubleshooting can miss.</p>

<p>Getting the HP LaserJet M1136 driver working on Windows 11 almost always comes down to one choice: download the Full Feature Software and Driver package, not the stripped-down basic option, directly from HP's own site, and install before you connect the cable. That one substitution — full package instead of basic — resolves more silent installation failures on this printer than anything else on this list.</p>`,
  },
  {
    title: "How to Uninstall HP Smart App Without Breaking Your Printer",
    slug: "uninstall-hp-smart-app-without-breaking-printer",
    metaDescription: "Want to uninstall the HP Smart app without losing your ability to print? A repair tech explains the driver-bundling trap on Windows 11 and the safe order.",
    seoTitle: "How to Uninstall HP Smart App Without Breaking Your Printer",
    wordCount: 1170,
    categorySlug: "setup-installation",
    content: `<p>Not everyone wants an extra app running in the background just to print documents, and that's a completely reasonable position to have. But before you uninstall HP Smart, there's one thing worth understanding clearly: on some Windows 11 setups, the app and your actual print driver aren't as separate as you'd expect, and removing one carelessly can genuinely take out the other. Here's how to do this cleanly, without losing the ability to print at all.</p>

<h2>Quick Summary</h2>
<ol>
  <li><strong>Check whether your printer setup used "driver via app" architecture</strong> — this determines your risk level entirely.</li>
  <li><strong>Install a traditional standalone driver first</strong>, as a safety net, before removing anything.</li>
  <li><strong>Uninstall HP Smart through normal Windows uninstall</strong>, not by deleting files manually.</li>
  <li><strong>Test printing immediately afterward</strong>, before you assume everything's fine.</li>
  <li><strong>Know how to reinstall quickly</strong> if something breaks anyway.</li>
</ol>

<h2>Why This Isn't Always a Simple Uninstall</h2>
<p>On many traditional Windows setups, the printer driver and the HP Smart app are genuinely separate pieces of software — you could uninstall one and the other would keep functioning independently, the same way removing a manufacturer's bundled utility software doesn't usually stop your webcam or keyboard from working.</p>
<p><strong>However, on Windows 11 specifically, many HP printers are set up through what's sometimes called a "driver via app" or Microsoft Store-based architecture</strong>, where the print driver itself is delivered and maintained as a component tied to the HP Smart app installation, rather than as a fully independent traditional driver package. On setups like this, uninstalling HP Smart can genuinely remove or disable the underlying print functionality along with it — not because anything went wrong, but because that's how the two were actually bundled together from the start on this specific installation path.</p>
<p><strong>Why this matters enormously for what you do next:</strong> the safe removal process is different depending on which type of setup you have, and there's no way to visually tell just by looking at your printer in the Devices and Printers list. You need to actively check, or take a precaution that works regardless of which type you have.</p>

<h2>Step 1: Install a Traditional Standalone Driver First (The Safety Net)</h2>
<p>Before removing HP Smart, go to HP's official driver download page, search for your exact printer model, and download the <strong>Full Feature Software and Driver</strong> package or a basic standalone driver — specifically choosing a traditional installer rather than being redirected toward the Microsoft Store app version. Install this, ensuring it completes and shows your printer working correctly, before you touch HP Smart at all.</p>
<p><strong>Why this works:</strong> this step effectively guarantees you have a genuinely independent, traditional driver installation in place regardless of how your printer was originally set up. If your original setup was the app-bundled kind, this creates a proper fallback that doesn't depend on HP Smart continuing to exist on your computer. If your original setup was already a traditional independent driver, this step causes no harm — you may simply end up with a refreshed version of the same driver you already had.</p>

<h2>Step 2: Uninstall HP Smart Through Windows' Normal Process</h2>
<p>Go to <strong>Settings → Apps → Installed apps</strong>, find <strong>HP Smart</strong> in the list, and select <strong>Uninstall</strong>. Let the process complete fully rather than interrupting it partway through.</p>
<p><strong>Why this works:</strong> using Windows' built-in uninstall process ensures the app removes itself cleanly according to its own defined uninstall routine, rather than leaving orphaned files or registry entries behind that manually deleting folders would risk creating. This is meaningfully safer than trying to delete the app's files directly through File Explorer.</p>

<h2>Step 3: Test Printing Immediately</h2>
<p>As soon as the uninstall finishes, open any document and try to print it — don't wait until the next time you actually need to print something important to discover whether this worked.</p>
<p><strong>Why this works:</strong> testing immediately, while the situation is fresh and you clearly remember what you just did, makes any problem far easier to diagnose and reverse than discovering an issue days later when you've forgotten the exact sequence of steps that led to it.</p>

<h2>Step 4: If Printing Breaks, Reinstall the Standalone Driver</h2>
<p>If your printer disappears from your printer list, shows an error, or simply won't print after uninstalling HP Smart, go back to the standalone driver you installed in Step 1 and run it again — sometimes a repair or reinstall of that same package restores full functionality even if the app-bundled version of the driver was affected by the uninstall.</p>
<p><strong>Why this works:</strong> this confirms directly whether your printer was on the app-bundled architecture, and reinstalling the genuinely independent driver package re-establishes printing capability without needing HP Smart present at all. If this resolves it, you're now running on the traditional driver architecture going forward — which was your goal from the start.</p>

<h2>What You Lose (and Don't Lose) by Uninstalling HP Smart</h2>
<p>You'll lose convenient in-app ink level monitoring, one-touch scanning shortcuts from your phone, in-app supply ordering, and Instant Ink account management access through the app specifically — though Instant Ink itself, if you're enrolled, continues functioning at the account level through hpconnected.com regardless of whether the app is installed on this particular computer. You <strong>do not</strong> lose your ability to print, so long as you've followed the standalone driver safety net above — basic printing through your normal print dialog remains completely available.</p>
<p><strong>Why this distinction matters:</strong> many people assume uninstalling HP Smart means losing print functionality entirely, when really it means losing a specific set of convenience features layered on top of core printing — features you may not have wanted running in the background anyway, which is presumably why you're uninstalling in the first place.</p>

<h2>When to Call a Professional</h2>
<p>If printing breaks after uninstalling HP Smart and reinstalling the standalone driver doesn't restore it, your printer may need a more complete removal and fresh reinstall — go to <strong>Devices and Printers</strong>, remove the printer entry entirely, then reinstall using the standalone driver package from scratch as if setting it up for the first time. If that still doesn't resolve it, contact HP support with your printer's model and describe exactly what happened — that the issue began specifically after uninstalling HP Smart — since that detail helps them identify whether your printer was on the bundled architecture and guide you through their specific recommended recovery steps for that setup type.</p>

<h2>FAQ</h2>
<h3>Will uninstalling HP Smart definitely break my printer?</h3>
<p>Not necessarily — it depends on whether your specific Windows 11 setup used a traditional independent driver or an app-bundled driver architecture. Installing a standalone driver first as a safety net protects you either way.</p>

<h3>How do I know which type of setup I have before uninstalling?</h3>
<p>There's no reliable way to tell just by looking, which is exactly why installing a traditional standalone driver first, before removing HP Smart, is worth doing regardless — it removes the guesswork and the risk at the same time.</p>

<h3>Do I lose Instant Ink if I uninstall the app?</h3>
<p>No — if you're enrolled in Instant Ink, the subscription itself continues working at the account and cloud level. You'd just lose convenient in-app access to manage it from this specific computer; you can still manage it through hpconnected.com.</p>

<h3>What if I already uninstalled HP Smart and now printing is broken?</h3>
<p>Download and install the Full Feature Software and Driver package for your exact printer model directly from HP's support site — this often restores printing even after an app-bundled driver was removed along with the app.</p>

<p>To uninstall HP Smart app without breaking your printer, don't just remove it and hope for the best — install a traditional standalone driver first as insurance, then uninstall through Windows' normal process, and test printing right away. That one extra step at the start is the difference between a clean removal and an afternoon spent restoring something you didn't mean to lose.</p>`,
  },
  {
    title: "HP Smart App Scan to PC Not Showing Up? Fix",
    slug: "hp-smart-app-scan-to-pc-not-showing",
    metaDescription: "HP Smart app scan to PC option missing or not showing your computer? A repair tech explains the Windows Scan service dependency behind this.",
    seoTitle: "HP Smart App Scan to PC Not Showing Up? Fix",
    wordCount: 1190,
    categorySlug: "connectivity",
    content: `<p>You want to scan a document from your printer's control panel straight to your computer, but when you go looking for that option, your PC simply isn't listed as a destination — or the "Scan to Computer" feature seems to have vanished from the HP Smart app entirely. This is a more layered problem than it first appears, because scanning to a PC through HP Smart actually depends on a separate Windows service working correctly behind the scenes, not just the app itself.</p>

<h2>Quick-Fix Summary</h2>
<p>Fast version:</p>
<ol>
  <li><strong>Confirm the printer and computer are on the same network.</strong></li>
  <li><strong>Check that HP Smart is fully updated</strong>, not running an older cached version.</li>
  <li><strong>Look for "Scan to Computer" as a separate enable/disable setting</strong> — it's often off by default.</li>
  <li><strong>Restart the Windows Image Acquisition service</strong> — my uncommon tip, and the background dependency almost nobody checks.</li>
  <li><strong>Reinstall HP Smart</strong> as a clean last resort.</li>
</ol>

<h2>Fix 1: Confirm the Same Network</h2>
<p>Check the exact Wi-Fi network the printer is connected to (through its own control panel or display) against what your computer is currently using, paying particular attention if your router broadcasts separate 2.4GHz and 5GHz networks under different names.</p>
<p><strong>Why this works:</strong> scan-to-computer discovery works the same way printer discovery does — it depends on both devices being reachable within the same local network segment. A printer and computer on different Wi-Fi bands of the same router won't be able to see each other for this purpose, even sitting in the same room.</p>

<h2>Fix 2: Make Sure HP Smart Is Actually Updated</h2>
<p>Open the app store relevant to your system (Microsoft Store on Windows) and check specifically whether HP Smart has a pending update, rather than assuming it's current just because you use it regularly.</p>
<p><strong>Why this works:</strong> scan-to-computer functionality has been refined across various HP Smart releases, and a version that's several updates behind may be missing scanning destination features that were added or fixed more recently — the app doesn't always prominently announce that it's out of date.</p>

<h2>Fix 3: Look for a Separate "Scan to Computer" Toggle</h2>
<p>Within HP Smart, check your printer's settings specifically for a <strong>Scan to Computer</strong> or <strong>Scan</strong> activation option — on many HP printers, this needs to be explicitly enabled and isn't necessarily on by default, separate from the app simply being installed and connected. This setting sometimes lives in the printer's own control panel menu (under Scan or Setup) rather than exclusively within the app.</p>
<p><strong>Why this works:</strong> HP treats scan-to-computer as a distinct feature that needs its own activation, likely for privacy and security reasons — enabling any computer on the network to receive a scan directly from the printer's physical control panel is a meaningful permission to grant, so it's designed to require a deliberate opt-in rather than defaulting to on. If this toggle was never enabled, or got reset by an app update or reinstall, your PC won't appear as a scan destination no matter how well everything else is configured.</p>

<h2>Fix 4: Restart the Windows Image Acquisition Service (My Uncommon Tip)</h2>
<p>Here's the fix for the case that survives all the obvious checks above — network confirmed, app updated, scan-to-computer enabled in settings, and your PC still doesn't show up as a destination, or scans initiated from the printer's panel simply fail to arrive.</p>
<p>Windows has a built-in background service called <strong>Windows Image Acquisition (WIA)</strong>, which handles communication between scanning devices and imaging software on your computer — including the connection HP Smart relies on for scan-to-computer functionality. If this service has stopped, crashed, or is set to a startup type that doesn't launch it reliably, your computer can be completely unreachable as a scan destination even though every visible setting looks correct.</p>
<p>To check and fix it: press the <strong>Windows key</strong>, type <strong>services</strong>, and open the Services app. Scroll to find <strong>Windows Image Acquisition (WIA)</strong>. Right-click it and choose <strong>Start</strong> if it's not currently running. If you want it to launch automatically going forward without needing to check manually again, right-click, choose <strong>Properties</strong>, and set the <strong>Startup type</strong> to <strong>Automatic</strong>, then click OK.</p>
<p><strong>Why this works:</strong> this service operates entirely in the background, with no visible indicator in HP Smart or anywhere else suggesting it's the reason your PC isn't showing up — from the app's perspective, it's simply unable to reach a working scan destination on your computer, and there's no clear error message pointing specifically to WIA as the cause. This is precisely the kind of underlying Windows service dependency that a printer-specific troubleshooting guide easily overlooks, because it lives entirely outside HP's own software and only becomes visible once you know to look for it directly in the Services app.</p>

<h2>Fix 5: The Clean Reinstall</h2>
<p>If the WIA service is running correctly and every setting checks out, uninstall HP Smart completely, restart your computer, then reinstall it fresh from the Microsoft Store.</p>
<p><strong>Why this works:</strong> app-level configuration and cached device information can corrupt over time, particularly across major Windows updates, leaving behind broken local settings that persist even when the underlying services are healthy. A clean reinstall clears that slate entirely and lets the app rebuild its scan destination list from scratch.</p>

<h2>When to Call a Professional</h2>
<p>If the network match is confirmed, the app is current, scan-to-computer is enabled, WIA is running, and a fresh reinstall still doesn't resolve it — test with a different computer on the same network as a split test. If scanning to that second computer works, the issue is specific to your original machine's configuration, worth a deeper look at security software that might be blocking WIA or related network traffic. If no computer on the network can receive a scan, contact HP support with your printer's model and serial number, since this points toward the printer's own scanning hardware or network communication rather than anything on the computer side.</p>

<h2>FAQ</h2>
<h3>Why doesn't my PC show up as a scan destination in HP Smart?</h3>
<p>Common causes include a network mismatch between devices, scan-to-computer not being enabled as its own separate setting, or — often overlooked — the Windows Image Acquisition service not running in the background on your computer.</p>

<h3>What is Windows Image Acquisition and why does it matter for scanning?</h3>
<p>It's a built-in Windows service that manages communication between imaging devices, like your printer's scanner, and software on your computer, including HP Smart's scan-to-computer feature. If it's stopped or not set to start automatically, your PC can become invisible as a scan destination with no clear error explaining why.</p>

<h3>Do I need to enable scan-to-computer separately from installing HP Smart?</h3>
<p>Often yes — many HP printers treat it as a distinct feature requiring its own activation, either within the app's printer settings or the printer's own control panel menu, rather than turning on automatically just because the app is installed.</p>

<h3>Will reinstalling HP Smart fix this if the Windows service is the actual problem?</h3>
<p>No — if Windows Image Acquisition isn't running, reinstalling the app alone won't resolve it, since the app depends on that service working correctly in the background. Check and start the service first before assuming a reinstall is your answer.</p>

<p>When the HP Smart app's scan to PC option isn't showing up, work through the visible settings first — network match, app updates, the scan-to-computer toggle — but don't stop there if everything looks right. Check that the Windows Image Acquisition service is actually running in the background. It's invisible from inside HP Smart entirely, and it's very often the real reason your computer isn't appearing at all.</p>`,
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
