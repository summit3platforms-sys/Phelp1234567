import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const articlesData = [
  {
    title: "How to Set Up Scan to Email on an HP Printer (Gmail)",
    slug: "hp-printer-scan-to-email-gmail-setup",
    metaDescription: "Setting up scan to email on your HP printer with Gmail? A repair tech covers the exact SMTP settings and the 2-Step Verification prerequisite.",
    seoTitle: "How to Set Up Scan to Email on an HP Printer (Gmail)",
    wordCount: 1180,
    categorySlug: "setup-installation",
    content: `<p>Gmail is one of the more particular email providers to configure for scan to email, not because HP's setup process is complicated, but because Gmail has specific security requirements that trip people up in a very specific, avoidable way — usually right at the step where you're supposed to generate a special password and simply can't find where to do it.</p>

<h2>Quick Summary</h2>
<ol>
  <li><strong>Enable 2-Step Verification on your Google account first</strong> — this is a hidden prerequisite. My uncommon tip.</li>
  <li><strong>Generate a Gmail app password</strong> specifically for your printer.</li>
  <li><strong>Enter Gmail's exact SMTP server settings</strong> in your printer's configuration.</li>
  <li><strong>Use the app password, not your regular Gmail password</strong>, in the printer's authentication field.</li>
  <li><strong>Send a test scan</strong> before considering setup complete.</li>
</ol>

<h2>Step 1: Enable 2-Step Verification First (My Uncommon Tip)</h2>
<p>Here's the step that causes more confusion than anything else in this entire setup process, and it happens before you've even reached your printer's settings — it's a prerequisite on Google's side that most people don't realize exists until they're already stuck.</p>
<p>Gmail requires an <strong>app password</strong> for third-party devices like printers to send email on your behalf — this is a separate, dedicated password distinct from your regular Gmail login, and it's the credential your printer will actually use. However, <strong>Google will not let you generate an app password at all unless 2-Step Verification is already enabled on your account.</strong> If 2-Step Verification isn't turned on, the app password option is either completely missing from your account settings or appears grayed out and unusable, with no clear explanation directly on that screen telling you why it's unavailable — you simply can't find or use the feature you're looking for, and it's easy to assume something's broken rather than realizing a prerequisite step is missing entirely.</p>
<p>To fix this: go to your <strong>Google Account settings</strong> (myaccount.google.com), navigate to the <strong>Security</strong> section, and turn on <strong>2-Step Verification</strong> if it isn't already active — this requires setting up a phone number or authenticator app for the verification step itself. Once that's genuinely enabled and confirmed, go back to the Security section and look for <strong>App passwords</strong> — it should now be visible and usable, whereas before it may not have appeared at all.</p>
<p><strong>Why this matters so much:</strong> this single prerequisite explains a huge share of "I can't find app passwords in my Gmail settings" confusion. It's not that the feature is hidden in an obscure menu — it's that the feature is deliberately unavailable until you've completed a different security step first, and Google's own interface doesn't always make that connection obvious to someone who doesn't already know to look for it. Confirming 2-Step Verification is active before you go looking for app passwords saves you from searching through menus for a feature that was never going to appear.</p>

<h2>Step 2: Generate a Gmail App Password</h2>
<p>With 2-Step Verification confirmed active, go to <strong>Google Account → Security → App passwords</strong>. You may need to select an app type or simply provide a custom label — enter something like "HP Printer" so you can identify it later. Google will generate a <strong>16-character password</strong> specifically for this purpose. Copy it exactly, and keep it accessible for the next step, since you typically can't view it again after leaving this screen (though you can always generate a new one if needed).</p>
<p><strong>Why this works:</strong> this password is scoped narrowly to just this one application, can be revoked independently at any time without affecting your main Gmail password, and it's exactly the credential type Gmail expects from a device like a printer rather than your actual account login, which Google's security policies now block from this kind of third-party use.</p>

<h2>Step 3: Enter Gmail's SMTP Settings on the Printer</h2>
<p>Through your printer's control panel or its Embedded Web Server (accessible by typing the printer's IP address into a browser), find the <strong>Scan to Email</strong> or <strong>Email Setup</strong> section, and enter Gmail's outgoing mail server details exactly:</p>
<ul>
  <li><strong>Outgoing (SMTP) server:</strong> smtp.gmail.com</li>
  <li><strong>Port:</strong> 587 (with TLS/STARTTLS encryption) or 465 (with SSL encryption) — check which your specific printer model supports, since not all printers offer both options</li>
  <li><strong>Encryption:</strong> TLS or SSL, matching whichever port you selected</li>
  <li><strong>Username:</strong> your full Gmail address</li>
  <li><strong>Password:</strong> the 16-character app password generated in Step 2, not your regular Gmail password</li>
</ul>
<p><strong>Why this works:</strong> these are Gmail's standard, publicly documented server settings for third-party device access, and entering them precisely — including the correct port-and-encryption pairing — is what allows your printer to actually establish a connection with Gmail's mail servers in the first place, before authentication with your app password even comes into play.</p>

<h2>Step 4: Use the App Password, Not Your Regular Password</h2>
<p>Double-check that the password field in your printer's email settings contains the app password from Step 2, not your everyday Gmail login password.</p>
<p><strong>Why this works:</strong> even with correct SMTP server settings, Gmail will reject the connection if it receives your regular account password from a third-party device — this is precisely the security policy that made Step 1 necessary in the first place. This is a common point of confusion because both are technically "your Gmail password" in a loose sense, and it's an easy field to fill in with the wrong one out of habit.</p>

<h2>Step 5: Send a Test Scan</h2>
<p>Once everything is entered and saved, use your printer's scan-to-email function to send a test scan to yourself, and confirm it arrives — checking your spam or junk folder if it doesn't appear in your main inbox within a few minutes.</p>
<p><strong>Why this works:</strong> this confirms the entire chain actually functions end to end, rather than assuming success just because the settings were entered and accepted without an immediate error message. Some configuration issues only reveal themselves at the actual sending stage rather than during initial setup.</p>

<h2>When to Call a Professional</h2>
<p>If you've confirmed 2-Step Verification is active, generated a genuine app password, entered Gmail's exact SMTP settings with matching port and encryption, and used the app password correctly in the printer's authentication field — and scan to email still fails — check whether your specific printer model's firmware is current, since older firmware occasionally lacks support for Gmail's current required encryption standards. If firmware is current and it still fails, contact HP support with your printer's model and the specific error message shown, if any, since a persistent failure despite correct settings on the Gmail side points toward something worth their direct diagnostic attention.</p>

<h2>FAQ</h2>
<h3>Why can't I find "App passwords" in my Google account settings?</h3>
<p>This option only appears once 2-Step Verification is enabled on your Google account. If you haven't turned that on yet, enable it first under Security settings, and the app passwords option should then become available.</p>

<h3>Can I just use my regular Gmail password instead of generating an app password?</h3>
<p>No — Gmail's security policies block third-party devices like printers from authenticating with your regular account password. An app password is specifically required and is the only credential type that will work for this purpose.</p>

<h3>What port and encryption should I use for Gmail's SMTP server?</h3>
<p>Port 587 with TLS/STARTTLS, or port 465 with SSL — check which options your specific printer model supports, since not every printer offers both, and the port must match the encryption type you select.</p>

<h3>My test scan never arrived. What should I check first?</h3>
<p>Check your spam or junk folder first, since automated scan emails occasionally get filtered there. If it's genuinely not arriving anywhere, double-check that you entered the app password correctly rather than your regular Gmail password, since this is the most common setup mistake.</p>

<p>Setting up scan to email on an HP printer with Gmail comes down to one prerequisite most guides skip entirely: enable 2-Step Verification on your Google account before you go looking for an app password, or that option simply won't be there. Generate the app password, enter Gmail's exact SMTP settings, and use that app password — not your regular login — in the printer's authentication field. Get that order right, and Gmail setup goes from confusing to completely routine.</p>`,
  },
  {
    title: "HP Wireless Direct Not Showing Up on Your Phone? Fix",
    slug: "hp-wireless-direct-not-appearing-on-phone",
    metaDescription: "HP Wireless Direct not showing up on your phone's Wi-Fi list? A repair tech explains the phone setting that auto-hides networks without internet.",
    seoTitle: "HP Wireless Direct Not Showing Up on Your Phone? Fix",
    wordCount: 1170,
    categorySlug: "connectivity",
    content: `<p>Wireless Direct is supposed to be the simple fallback option — no router required, your phone connects straight to the printer's own signal. So when that signal doesn't even show up in your phone's Wi-Fi list at all, or appears briefly and then disconnects on its own, it defeats the entire point of a feature designed specifically to be the easy, no-fuss option.</p>

<h2>Quick-Fix Summary</h2>
<p>Fast version:</p>
<ol>
  <li><strong>Confirm Wireless Direct is actually enabled</strong> on the printer itself.</li>
  <li><strong>Move closer</strong> — this signal is genuinely short-range by design.</li>
  <li><strong>Refresh your phone's Wi-Fi scan</strong> rather than assuming the list is current.</li>
  <li><strong>Disable your phone's smart network switching feature</strong> — my uncommon tip, and a common but invisible cause.</li>
  <li><strong>Restart both devices</strong> if the network appears but won't connect reliably.</li>
</ol>

<h2>Fix 1: Confirm Wireless Direct Is Enabled</h2>
<p>Through your printer's control panel, check its network or wireless settings menu specifically for a <strong>Wireless Direct</strong> or <strong>Wi-Fi Direct</strong> option, and confirm it's turned on. Some printers disable this by default, or it can get turned off during a factory reset or firmware update.</p>
<p><strong>Why this works:</strong> if this feature isn't active on the printer's side, your phone will never see any signal to connect to at all, regardless of anything correct happening on the phone itself — this is worth confirming directly rather than assuming it's simply always available.</p>

<h2>Fix 2: Move Closer to the Printer</h2>
<p>Bring your phone within a few feet of the printer and try scanning for networks again.</p>
<p><strong>Why this works:</strong> Wireless Direct creates a direct, printer-generated Wi-Fi signal that's typically much shorter range than your home router's broadcast, specifically because it's designed for close-proximity, occasional use rather than whole-house coverage. A signal that seems to not exist at all from across a room can appear immediately once you're standing near the printer.</p>

<h2>Fix 3: Refresh Your Phone's Wi-Fi Scan</h2>
<p>Toggle your phone's Wi-Fi off and back on, or navigate away from the Wi-Fi settings screen and back into it, to force a fresh scan rather than relying on a list that may not have updated recently.</p>
<p><strong>Why this works:</strong> phones don't necessarily continuously re-scan for available networks in real time while you're looking at the settings screen, and a list that was accurate a minute ago may not reflect a network that just became available, particularly if you just turned Wireless Direct on within the last few moments.</p>

<h2>Fix 4: Disable Smart Network Switching (My Uncommon Tip)</h2>
<p>Here's the fix for the specific, maddening pattern where Wireless Direct briefly appears, or even connects successfully for a moment, and then your phone seems to abandon it or it vanishes from the active connection shortly after — and it has nothing to do with the printer at all.</p>
<p>Both Android and iPhone include smart networking features designed to automatically avoid Wi-Fi networks that don't provide a working internet connection, switching your phone back to cellular data or a different, internet-connected Wi-Fi network instead — a genuinely sensible feature for everyday use, since nobody wants their phone silently stuck on a dead Wi-Fi network unable to load anything. <strong>The problem is that Wireless Direct, by design, has no internet connection at all</strong> — it's a direct connection specifically for communicating with your printer, nothing more — which means your phone's smart switching feature can identify it as exactly the kind of "bad" network it's designed to actively avoid or abandon, sometimes before you've even had a chance to use it for printing.</p>
<p>On <strong>iPhone</strong>: go to <strong>Settings → Cellular</strong> (or <strong>Mobile Data</strong>), scroll down, and turn off <strong>Wi-Fi Assist</strong>. On <strong>Android</strong>: the exact setting name varies by manufacturer, but look in <strong>Settings → Network & internet → Wi-Fi → Wi-Fi preferences</strong> (or similar) for something called <strong>Smart Network Switch, Avoid poor connections</strong>, or <strong>Auto-switch network</strong>, and disable it.</p>
<p><strong>Why this works:</strong> disabling this feature tells your phone to trust your manual network selection and stay connected to Wireless Direct even though it correctly recognizes there's no internet access available through it — which is exactly the behavior you want in this specific situation, since you're intentionally connecting for local printing, not general internet browsing. This is precisely the kind of background phone feature that never occurs to people troubleshooting a printer connection problem, because it operates silently and its entire purpose is usually genuinely helpful — right up until it actively works against a legitimate no-internet connection you're trying to use on purpose.</p>

<h2>Fix 5: Restart Both Devices</h2>
<p>If Wireless Direct appears in your phone's list but connection attempts fail or drop repeatedly even after checking the above, restart both your phone and the printer completely, then attempt the connection fresh.</p>
<p><strong>Why this works:</strong> both devices can accumulate a stale network connection state over time that a simple reconnection attempt doesn't fully clear, and a full restart on both ends forces each to establish the connection from a genuinely clean starting point.</p>

<h2>When to Call a Professional</h2>
<p>If Wireless Direct is confirmed enabled on the printer, you're standing close enough that range isn't a factor, your phone's Wi-Fi list has been freshly refreshed, smart network switching is disabled, and both devices have been restarted — and the signal still never appears — try checking whether a second phone or tablet can see it. If another device sees the signal fine, the issue is specific to your original phone's Wi-Fi hardware or settings, worth checking with your phone's manufacturer. If no device can find the signal at all, contact HP support with your printer's model and serial number, since a failing wireless radio inside the printer becomes the more likely explanation at that point.</p>

<h2>FAQ</h2>
<h3>Why does Wireless Direct disconnect right after I connect to it?</h3>
<p>Your phone's smart network switching feature — Wi-Fi Assist on iPhone, Smart Network Switch or similar on Android — may be detecting that Wireless Direct has no internet access and automatically abandoning it in favor of a connection that does. Disable this feature to stay connected reliably.</p>

<h3>How close do I need to be to the printer for Wireless Direct to work?</h3>
<p>Considerably closer than a typical home Wi-Fi router's range — this feature is designed for close-proximity use. If you're across a room or on a different floor, try standing directly next to the printer instead.</p>

<h3>Is Wireless Direct supposed to have internet access?</h3>
<p>No, by design — it's a direct connection specifically for communicating with the printer for printing purposes, not a general internet connection. This is exactly why phone features designed to avoid internet-less networks can interfere with it.</p>

<h3>Do I need to turn smart network switching back on afterward?</h3>
<p>You can, once you're done using Wireless Direct specifically — it's a generally useful feature for everyday Wi-Fi use. Just remember to disable it again if you plan to use Wireless Direct regularly, or leave it off if you use this connection method often enough that the inconvenience of re-enabling it repeatedly isn't worth it.</p>

<p>If HP Wireless Direct isn't showing up on your phone, or vanishes moments after you connect, check whether the feature is genuinely enabled on the printer and whether you're close enough — but don't overlook your phone's own smart network switching feature. It's designed to protect you from dead Wi-Fi connections, and Wireless Direct, having no internet access by design, looks exactly like the kind of network it's built to abandon.</p>`,
  },
  {
    title: "Why Your HP Printer Shows Up Twice on the Network",
    slug: "hp-printer-showing-two-devices-network",
    metaDescription: "HP printer showing up twice on your network or in your printer list? A repair tech explains the dual-connection cause most people never suspect.",
    seoTitle: "Why Your HP Printer Shows Up Twice on the Network",
    wordCount: 1160,
    categorySlug: "connectivity",
    content: `<p>One printer, two entries — sitting in your device list, your printer list, or your network scanner's results looking like a pair of identical twins. It's confusing precisely because you only own one printer, and the natural assumption is that something's gone wrong somewhere in software. Sometimes it has. But there's a specific, physical explanation that catches a lot of people off guard, and it comes down to a feature many HP printers offer that you might not even realize is currently active.</p>

<h2>Quick-Fix Summary</h2>
<p>Fast version:</p>
<ol>
  <li><strong>Check for a stale duplicate entry</strong> left behind after a network change.</li>
  <li><strong>Confirm your printer isn't connected via both Wi-Fi and Ethernet simultaneously</strong> — my uncommon tip, and the physical cause behind genuine duplicates.</li>
  <li><strong>Remove the outdated entry</strong>, keeping only the active one.</li>
  <li><strong>Set up a DHCP reservation</strong> to prevent future duplication from address changes.</li>
  <li><strong>Restart your router</strong> if duplicates keep reappearing after cleanup.</li>
</ol>

<h2>Fix 1: Check for a Stale Software Duplicate</h2>
<p>Look closely at both entries in your printer list — compare their exact names, and if possible, their listed IP addresses or connection details. If one entry looks slightly different (a "(Copy 1)" tag, a different suffix, or a different IP address than the other), you're likely looking at an old, outdated entry alongside a current, working one.</p>
<p><strong>Why this works:</strong> Windows and macOS both sometimes create a new printer entry automatically when a printer's connection details change — a new IP address, a different USB port, or a reconnection under slightly different circumstances — without automatically cleaning up the old, now-inactive entry first. This is the more common, purely software-side explanation, and it's worth ruling out before assuming anything more complicated is happening.</p>

<h2>Fix 2: Check for Simultaneous Wi-Fi and Ethernet Connections (My Uncommon Tip)</h2>
<p>Here's the physical explanation that catches people who've already ruled out the simple software duplicate above, and it's specific to printers that support more than one type of network connection at the same time.</p>
<p>Many HP all-in-one and business printers support both <strong>Wi-Fi</strong> and <strong>wired Ethernet</strong> connectivity, and on some models, both can be <strong>active simultaneously</strong> rather than one automatically disabling when the other is connected. When this happens, your printer effectively announces itself on your network <strong>twice</strong> — once through its Wi-Fi connection, and separately through its Ethernet connection — with each interface broadcasting its own network presence (through discovery protocols like mDNS/Bonjour) independently of the other. From your computer's perspective, or from any network scanning tool, this can genuinely look like two separate physical devices, because in a real sense, two separate network interfaces are each independently announcing themselves, even though they're both part of the exact same physical printer.</p>
<p>To check: go into your printer's network settings through its control panel, and look at both the <strong>Wireless</strong> and <strong>Wired/Ethernet</strong> status sections separately. If both show as connected and active at the same time, you've very likely found your explanation.</p>
<p><strong>Why this works as an explanation:</strong> this genuinely isn't a software glitch or an error at all — it's the printer accurately doing exactly what it's configured to do, maintaining two live network connections simultaneously, each behaving as its own legitimate network citizen. Most people never think to check this, because it doesn't occur to them that a single physical printer might genuinely be present on the network twice over, in a technical sense, rather than appearing twice due to some kind of mistake. The fix is straightforward once you understand the cause: decide which connection method you actually want to use going forward — Ethernet is generally the more stable, reliable choice if a cable run is practical for your setup — and disable the other one through the printer's network settings menu. With only one active interface remaining, the duplicate announcement stops, and you're left with a single, accurate entry.</p>

<h2>Fix 3: Remove the Outdated Entry</h2>
<p>Once you've identified which entry is stale, outdated, or (per Fix 2) redundant, remove it from your device or printer list, keeping only the current, active entry — and set that remaining one as your default printer going forward.</p>
<p><strong>Why this works:</strong> this cleans up the confusion at the source, ensuring future print jobs and any saved shortcuts consistently reach the correct, currently active connection rather than potentially landing on a duplicate that may stop working or already has.</p>

<h2>Fix 4: Set Up a DHCP Reservation</h2>
<p>Through your router's settings, set up a DHCP reservation for your printer's MAC address, ensuring it always receives the same IP address rather than one that changes periodically.</p>
<p><strong>Why this works:</strong> if the software-side duplication in Fix 1 was caused by the printer's address changing over time, prompting your computer to create a fresh entry rather than recognizing the printer as the same device it already knew, a fixed address removes that specific trigger going forward, preventing the same duplication pattern from recurring after this cleanup.</p>

<h2>Fix 5: Restart Your Router if Duplicates Persist</h2>
<p>If you've cleaned up entries and confirmed only one network interface is active on the printer, but duplicates keep reappearing, try restarting your router completely.</p>
<p><strong>Why this works:</strong> routers maintain their own internal tables of connected devices and their addresses, and this table can occasionally hold onto stale or conflicting information that a restart clears, forcing every device on the network, printer included, to freshly re-announce itself and re-register cleanly.</p>

<h2>When to Call a Professional</h2>
<p>If you've confirmed only one network interface is active on the printer, cleaned up stale entries, set up a DHCP reservation, and restarted your router — and duplicate entries still keep appearing — contact HP support with your printer's model and describe the specific pattern you're seeing, since this may point toward a printer-side networking fault worth their direct diagnostic attention. In business or more complex network environments with multiple access points or network segments, this pattern can also sometimes relate to broader network configuration rather than anything specific to the printer itself, worth raising with whoever manages your network infrastructure.</p>

<h2>FAQ</h2>
<h3>Why would my printer show up twice if I only have one physical unit?</h3>
<p>Two main explanations: a stale, outdated software entry left over after a connection change, or — if your printer supports both Wi-Fi and Ethernet simultaneously — the printer genuinely announcing itself twice over, once through each active network interface.</p>

<h3>How do I know if my printer has both Wi-Fi and Ethernet active at once?</h3>
<p>Check the printer's own network settings menu on its control panel, and look at the Wireless and Wired/Ethernet status sections separately. If both show as currently connected, that's very likely causing the duplicate appearance.</p>

<h3>Which connection should I keep if both are active — Wi-Fi or Ethernet?</h3>
<p>Ethernet is generally more stable and reliable if running a cable to the printer's location is practical for your setup. Wi-Fi offers more placement flexibility. Either is fine functionally — the key is disabling one so only a single interface remains active.</p>

<h3>Will setting up a DHCP reservation prevent this from happening again?</h3>
<p>It helps prevent the software-side duplication specifically caused by changing IP addresses, but if your printer has both Wi-Fi and Ethernet active simultaneously, you'll still need to disable one of those interfaces directly to fully resolve the duplication.</p>

<p>An HP printer showing up twice on your network is usually either a leftover software entry from a past connection change, or — more surprising to most people — a single printer genuinely running both Wi-Fi and Ethernet at the same time, announcing itself twice over as a result. Check both network interfaces on the printer itself, disable the one you don't need, clean up any stale entries, and the duplicate disappears for good.</p>`,
  },
  {
    title: "How to Set a Static IP on Your HP Printer",
    slug: "hp-printer-static-ip-setup-guide",
    metaDescription: "Setting a static IP on your HP printer? A repair tech explains why DHCP reservation is usually the smarter choice, and how to do both properly.",
    seoTitle: "How to Set a Static IP on Your HP Printer",
    wordCount: 1180,
    categorySlug: "connectivity",
    content: `<p>Before you dive into your printer's network menu and start typing numbers, there's a decision worth making first that most guides skip entirely: do you actually want a true static IP configured directly on the printer, or do you want what most people who search this term actually need, which is a DHCP reservation set up through your router instead? They solve the same practical problem — a printer that never changes address — but one of them is considerably safer to set up correctly, and understanding the difference upfront will save you a genuine headache later.</p>

<h2>Quick Summary</h2>
<ul>
  <li><strong>Most people should use a DHCP reservation</strong>, not a true static IP — safer, achieves the same result. My uncommon tip explains why.</li>
  <li><strong>A true static IP requires careful attention</strong> to your network's existing address range to avoid conflicts.</li>
  <li><strong>Either method requires knowing your printer's MAC address</strong> and your router's IP range first.</li>
  <li><strong>Test thoroughly after setup</strong> — a mistake here can knock the printer off your network entirely.</li>
</ul>

<h2>Why You Might Want a Fixed Address At All</h2>
<p>By default, most home and office networks assign IP addresses dynamically through DHCP, meaning your printer's address can change periodically, usually without you noticing — until something that depends on that address, like a saved printer connection on your computer, suddenly can't find it anymore, showing up as offline or unreachable. Giving your printer a fixed, unchanging address prevents this specific category of problem entirely.</p>
<p><strong>Why this matters:</strong> this is a genuinely worthwhile thing to set up, particularly for a printer that multiple computers connect to regularly, or one integrated into other systems like scan-to-email or scan-to-folder functions that reference its address directly. The question is really about which method to use to achieve it.</p>

<h2>The Right Way vs. the Risky Way (My Uncommon Tip)</h2>
<p>Here's the distinction almost every quick guide glosses over, treating "give it a static IP" as a single, simple instruction — when in practice there are two meaningfully different ways to accomplish this, with real consequences for getting it wrong.</p>
<p><strong>A true static IP</strong>, configured directly in the printer's own network settings menu, means manually typing a specific IP address into the printer itself, completely independent of your router's automatic address management. This works, but it carries a real risk: if you choose an address that falls within the range your router still actively hands out to other devices through DHCP, you can create an <strong>IP conflict</strong> — a future laptop, phone, or smart device joins the network, your router assigns it the same address you manually gave your printer, and now two devices are fighting over one address, with unpredictable and often confusing results for both.</p>
<p><strong>A DHCP reservation</strong>, set up through your router's own settings rather than the printer's, tells your router specifically "always give this particular device, identified by its MAC address, this same IP address, every time it connects" — while keeping that address properly excluded from the pool your router hands out to everything else. The printer still technically receives its address dynamically through DHCP, so it's compatible with your router's own address management system by design, but the practical result is identical to a static IP: the same address, every single time, indefinitely.</p>
<p><strong>Why DHCP reservation is almost always the smarter choice:</strong> it achieves exactly what you actually want — a printer address that never changes — while letting your router's own conflict-prevention system continue doing its job correctly. A true static IP set directly on the printer bypasses that system entirely, and the safety of your setup then depends entirely on you correctly understanding and staying outside your router's DHCP range, forever, including if that range ever changes during a future router replacement or reconfiguration you might not even be present for. I recommend DHCP reservation to essentially everyone asking this question, and reserve true static IP configuration for specific situations — certain business network configurations, for instance — where there's a genuine technical reason to bypass DHCP entirely rather than just wanting a fixed address.</p>

<h2>Setting Up a DHCP Reservation (Recommended)</h2>
<ol>
  <li>Find your printer's <strong>MAC address</strong> — usually listed on its network settings screen, or on a printed network configuration page from the control panel.</li>
  <li>Log into your <strong>router's administration page</strong> (typically by typing your router's IP address, often something like 192.168.1.1 or 192.168.0.1, into a browser).</li>
  <li>Find the <strong>DHCP settings</strong> section, often under LAN or Network settings, and look for a <strong>DHCP reservation, static lease, or address reservation option</strong> — naming varies by router brand.</li>
  <li>Locate your printer in the list of currently connected devices, or manually enter its MAC address, and assign it a specific IP address — ideally one outside your router's normal dynamic range, though the reservation itself typically handles this correctly by design.</li>
  <li>Save the settings, and if prompted, restart your printer or router to ensure the new reservation takes effect.</li>
</ol>
<p><strong>Why this works:</strong> the router now permanently associates that MAC address with that IP address in its own memory, so every time the printer requests an address through the normal DHCP process, it receives the same one, while the router's built-in conflict management continues to work exactly as intended for every other device on your network.</p>

<h2>Setting Up a True Static IP (If You Have a Specific Reason To)</h2>
<ol>
  <li>Determine your router's DHCP range (often shown in the same router settings area) and choose an address clearly <strong>outside</strong> that range.</li>
  <li>On the printer's own control panel, find the network settings menu, and look for an option to switch from <strong>DHCP/Automatic</strong> to <strong>Manual</strong> or <strong>Static</strong>.</li>
  <li>Enter the chosen IP address, along with the subnet mask and gateway address (usually matching your router's own address) exactly as required.</li>
  <li>Save and test the connection thoroughly.</li>
</ol>
<p><strong>Why this requires more caution:</strong> you're now personally responsible for avoiding every future conflict this address might create, indefinitely, with no automatic system helping you — which is exactly the risk the DHCP reservation method avoids entirely while achieving the same practical outcome.</p>

<h2>When to Call a Professional</h2>
<p>If you're setting this up in a business or more complex network environment with multiple subnets, VLANs, or existing static address assignments already in place, involve whoever manages your network before assigning anything yourself, since conflicts in more complex environments can affect considerably more than just this one printer. For home networks, if a DHCP reservation doesn't seem to be holding — the printer's address keeps changing despite the reservation being set up — double-check that you've correctly identified the printer's MAC address, since a typo here is a common and easy-to-make mistake that silently prevents the reservation from ever actually applying to the right device.</p>

<h2>FAQ</h2>
<h3>What's the actual difference between a DHCP reservation and a true static IP?</h3>
<p>A DHCP reservation is set up on your router and still uses the DHCP system, just guaranteeing the same address every time. A true static IP is configured directly on the printer, bypassing DHCP entirely, and requires you to manually avoid conflicts with your router's dynamic address range yourself.</p>

<h3>Which one should I actually use?</h3>
<p>For the vast majority of home and small office setups, a DHCP reservation is the safer, equally effective choice. Reserve true static IP configuration for specific situations with a genuine technical reason to bypass your router's DHCP system entirely.</p>

<h3>How do I find my printer's MAC address?</h3>
<p>Check the printer's own network settings menu on its control panel, or print a network configuration page, usually available under a Reports or Setup menu — the MAC address is typically listed clearly on either.</p>

<h3>What happens if I accidentally create an IP conflict?</h3>
<p>Both devices sharing the same address can experience unpredictable connectivity problems, sometimes affecting one, sometimes both, and sometimes other devices on the network as well. This is exactly the risk a properly configured DHCP reservation avoids, since the router's own system prevents handing out that address to anything else.</p>

<p>Setting up a fixed address for your HP printer usually means choosing DHCP reservation over a true static IP — same practical result, considerably less ongoing risk, since your router's own conflict prevention keeps working exactly as designed. Find the MAC address, set the reservation through your router rather than the printer itself, and your printer's address becomes something you never have to think about again.</p>`,
  },
  {
    title: "HP Printhead Alignment Keeps Failing? The Real Fix",
    slug: "hp-printhead-alignment-failed-repeatedly",
    metaDescription: "HP printhead alignment keeps failing? A repair tech explains the scanner glass connection almost nobody knows about, plus 4 other real fixes.",
    seoTitle: "HP Printhead Alignment Keeps Failing? The Real Fix",
    wordCount: 1130,
    categorySlug: "troubleshooting",
    content: `<p>You run alignment. It fails. You run it again. It fails again — sometimes with the exact same result, sometimes with a slightly different failure, but never actually succeeding. Repeated printhead alignment failures are genuinely frustrating specifically because the process feels like it should be simple, and there's a piece of how it actually works on multifunction printers that almost nobody explains, which turns out to be the answer more often than you'd expect.</p>

<h2>Quick-Fix Summary</h2>
<p>Fast version:</p>
<ol>
  <li><strong>Check paper type and loading</strong> — plain paper matters more here than people realize.</li>
  <li><strong>Confirm ink or toner levels</strong> are adequate across every color.</li>
  <li><strong>Clean the printhead</strong> before attempting alignment again.</li>
  <li><strong>Clean the scanner glass</strong> — my uncommon tip, and the connection almost nobody knows exists.</li>
  <li><strong>Try alignment through a different interface</strong> if one method keeps failing.</li>
</ol>

<h2>Fix 1: Check Your Paper</h2>
<p>Make sure you're using plain, standard white paper for alignment — not photo paper, cardstock, or anything textured or colored. Confirm it's loaded straight in the tray, without skewing to one side.</p>
<p><strong>Why this works:</strong> the alignment process depends on the printer being able to clearly read specific printed patterns, and unusual paper surfaces or a page that's feeding in crooked can interfere with that reading process in ways that have nothing to do with your actual ink or printhead health.</p>

<h2>Fix 2: Confirm Adequate Ink or Toner</h2>
<p>Check actual reported levels through the HP Smart app or your printer's status display for every color, not just the ones you assume might be running low.</p>
<p><strong>Why this works:</strong> alignment specifically requires printing a clear, complete test pattern across every color channel, and if any single color is running critically low, the resulting pattern can come out incomplete or inconsistent enough that the printer's own alignment process fails to read it successfully, even though regular printing might still look acceptable to your eye.</p>

<h2>Fix 3: Clean the Printhead Before Realigning</h2>
<p>Run the printhead cleaning cycle through HP Smart or your printer's maintenance menu, and only attempt alignment again after confirming a clean cycle completed successfully.</p>
<p><strong>Why this works:</strong> a printhead with partially clogged nozzles produces an incomplete or uneven alignment test pattern, and the printer's alignment process needs a genuinely clean, fully-formed pattern to read and calculate proper adjustments from. Attempting alignment before addressing an underlying clog is often working against yourself.</p>

<h2>Fix 4: Clean the Scanner Glass (My Uncommon Tip)</h2>
<p>Here's the connection that resolves more repeated alignment failures than anything else on this list, and it sounds completely unrelated to printing until you understand the actual mechanism behind it.</p>
<p>On many HP all-in-one printers, the alignment process doesn't just print a test pattern — it also <strong>scans that pattern back in using the flatbed scanner</strong> to automatically read and calculate the correct adjustments, rather than requiring you to manually judge and select the best-aligned option yourself. This means alignment success depends on <strong>both the printhead's ability to print clearly and the scanner's ability to read that print back accurately</strong> — and if the scanner glass is dirty, smudged, or has debris on it, the scan-back step can fail or produce inaccurate readings, causing the entire alignment process to report as failed, even when the actual printed test pattern was perfectly fine.</p>
<p>To check and fix this: open the printer's lid and clean the flatbed scanner glass thoroughly with a soft, lint-free cloth — a microfiber cloth works well, lightly dampened with water if needed for stubborn marks, never any harsh chemical cleaner directly on the glass. Pay particular attention to the edges and corners, where dust and fingerprints commonly accumulate and are easy to miss during a quick glance. Once clean, attempt alignment again.</p>
<p><strong>Why this works:</strong> this is precisely the kind of dependency that never occurs to people troubleshooting an alignment failure, because scanning and printing feel like two completely separate functions of the printer — you print documents, you separately scan documents, and it's not obvious that one internal process would need both working together. But because alignment specifically closes the loop by scanning its own printed output back in for automatic reading, a scanner glass that's simply dusty or smudged, something with zero effect on your regular printing or copying, can be the entire reason alignment keeps failing. I've seen this resolve alignment problems that survived multiple printhead cleanings and cartridge replacements, simply because nobody thought to look at the scanner glass specifically in the context of a printing problem.</p>

<h2>Fix 5: Try a Different Alignment Interface</h2>
<p>If your printer offers alignment through more than one interface — the printer's own control panel menu, the HP Smart app, or your computer's printer utility software — try running the process through a different one than you've been using.</p>
<p><strong>Why this works:</strong> different interfaces occasionally use slightly different versions of the alignment process or communicate with the printer through different pathways, and if one interface is experiencing a software-level hiccup specifically, trying an alternate can sometimes succeed even without you changing anything about the physical printer itself.</p>

<h2>When to Call a Professional</h2>
<p>If you've confirmed correct plain paper, adequate ink or toner across every color, a genuinely clean printhead, a clean scanner glass, and tried alignment through more than one available interface — and alignment still consistently fails — this points toward a possible hardware issue with the printhead itself or the printer's internal alignment sensors. Contact HP support with your printer's serial number and describe specifically that alignment fails consistently despite addressing paper, ink, cleaning, and scanner glass, since ruling out those common causes helps direct their diagnostic more efficiently toward genuine hardware possibilities.</p>

<h2>FAQ</h2>
<h3>Why would my scanner affect printhead alignment at all?</h3>
<p>On many HP all-in-one printers, alignment works by printing a test pattern and then scanning it back in automatically to calculate the correct adjustments. A dirty scanner glass can cause that reading step to fail, making alignment report as failed even when the actual print was fine.</p>

<h3>How do I clean the scanner glass safely?</h3>
<p>Use a soft, lint-free cloth, lightly dampened with water if needed for stubborn marks. Avoid harsh chemical cleaners directly on the glass, and pay particular attention to the edges and corners where dust commonly collects unnoticed.</p>

<h3>Does low ink really affect alignment even if my regular prints still look fine?</h3>
<p>Yes — alignment needs a complete, evenly printed test pattern across every color to read accurately, and a color running low enough to affect that specific pattern might not be low enough to visibly affect your everyday printing yet.</p>

<h3>What if cleaning the scanner glass doesn't fix it?</h3>
<p>Work through the other fixes in order — confirming paper type, ink levels, and a clean printhead — and try alignment through a different available interface if your printer offers more than one. If it still consistently fails after all of that, it's worth contacting HP support directly.</p>

<p>When printhead alignment keeps failing on an HP all-in-one, don't overlook the scanner glass — on printers where alignment works by scanning its own printed test pattern back in, a smudge or bit of dust there can cause the entire process to fail with no obvious connection to what you'd normally think of as a printing problem. Clean it, confirm your paper and ink, and alignment usually succeeds on the very next attempt.</p>`,
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
