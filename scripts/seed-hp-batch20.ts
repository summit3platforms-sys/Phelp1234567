import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const articles = [
  {
    slug: 'hp-web-jetadmin-not-discovering-printers',
    title: 'HP Web Jetadmin Not Discovering Printers? [Fixed]',
    categoryId: 'connectivity-issues',
    metaDescription: 'HP Web Jetadmin not discovering printers on your network? A repair tech explains the SNMP community name mismatch that\'s the real cause most often.',
    faqs: JSON.stringify([
      { question: "Why does Web Jetadmin say 'Device Not Found' even though I can ping the printer?", answer: "This is a strong signal pointing toward an SNMP community name mismatch — the printer is reachable on the network, but Jetadmin's SNMP credential doesn't match what the printer is configured to accept." },
      { question: "What is an SNMP community name and why does it need to match?", answer: "It functions like a shared password between Web Jetadmin and the printer for SNMP communication. If they don't match exactly, discovery attempts will be rejected." },
      { question: "Could a firewall really be the cause if my local firewall is already disabled?", answer: "Yes — check firewalls anywhere along the network path between the Jetadmin server and the printer, not just on the server itself." }
    ]),
    content: `
      <h2>Quick-Fix Summary</h2>
      <ol>
        <li>Confirm basic network reachability to the printer's IP address.</li>
        <li>Check for firewalls between the Jetadmin server and the printer, not just on the server itself.</li>
        <li>Verify the SNMP community name matches exactly — my uncommon tip, and the most common specific cause.</li>
        <li>Check whether WS-Discovery is disabled on the printer.</li>
        <li>Confirm SNMP is enabled on the printer at all.</li>
      </ol>

      <h2>Fix 1: Confirm Basic Network Reachability</h2>
      <p>From the Web Jetadmin server itself, try pinging the printer's IP address, or use a basic network tool to confirm a connection can be established at all before troubleshooting anything Jetadmin-specific.</p>
      <p><strong>Why this works:</strong> this rules out the most fundamental possible cause first — if the server genuinely can't reach the printer's IP address at any level, no Jetadmin-specific configuration will matter until that's resolved.</p>

      <h2>Fix 2: Check for Firewalls Between the Server and Printer</h2>
      <p>Check not just the local firewall on the Jetadmin server itself, but any firewalls sitting between the server and the printer, particularly if they're on different subnets with network infrastructure in between. Confirm the specific ports Web Jetadmin relies on for discovery (commonly including SNMP on port 161) are open along the entire path.</p>
      <p><strong>Why this works:</strong> this is a genuinely common real-world cause. A firewall anywhere along a multi-hop network path can silently block exactly the traffic Jetadmin needs.</p>

      <h2>Fix 3: Verify the SNMP Community Name Matches Exactly (My Uncommon Tip)</h2>
      <p>Here's the specific mismatch that explains a large share of "Device Not Found" results when the network path itself is actually fine, and it's genuinely easy to overlook because it lives in two separate places that need to agree with each other.</p>
      <p>Web Jetadmin discovers and communicates with printers largely through SNMP (Simple Network Management Protocol), and SNMP uses a community name — essentially a shared password — that must match exactly between what's configured on the printer itself and what Web Jetadmin is using when it attempts to discover that device. If your printer has a custom SNMP community name set, and Web Jetadmin is still configured with the default, discovery will fail cleanly and consistently.</p>
      <p><strong>To check and fix this:</strong> on the printer's own Embedded Web Server, look under network or SNMP settings for the currently configured SNMP community name. In Web Jetadmin, check your discovery settings or device credentials for the community name it's using to attempt discovery, and confirm it matches the printer's setting exactly, case-sensitive and character-for-character.</p>

      <h2>Fix 4: Check Whether WS-Discovery Is Disabled on the Printer</h2>
      <p>On certain HP printer families — DesignJet, LaserJet Pro, OfficeJet Pro, and PageWide XL models specifically — check whether WS-Discovery is enabled in the printer's own network settings.</p>

      <h2>Fix 5: Confirm SNMP Is Enabled on the Printer at All</h2>
      <p>Through the printer's EWS, verify that SNMP itself hasn't been disabled entirely as part of a broader network security hardening configuration.</p>
      <p><strong>Why this works:</strong> some organizations disable SNMP fleet-wide as a security measure, and if this has happened to your printer specifically, no amount of correcting community names or checking firewalls will help, since the protocol Web Jetadmin depends on for discovery isn't running on the device at all.</p>

      <h2>When to Call a Professional</h2>
      <p>If you've confirmed basic network reachability, checked every firewall along the path, verified the SNMP community name matches exactly on both sides, checked WS-Discovery status for the relevant printer families, and confirmed SNMP is genuinely enabled — and discovery still fails, this points toward something worth deeper investigation with whoever manages your broader network infrastructure.</p>
    `
  },
  {
    slug: 'hp-printer-certificate-error-network',
    title: 'HP Printer Certificate Error on Network? Check This First',
    categoryId: 'connectivity-issues',
    metaDescription: 'HP printer showing a certificate error or "certificate expired" on your network? A repair tech explains the internal clock check almost nobody tries.',
    faqs: JSON.stringify([
      { question: "Why would my printer's clock being wrong cause a certificate error?", answer: "Certificates are validated against a specific date range, checked against the printer's own current date and time. If that internal clock is wrong, a genuinely valid certificate can appear expired." },
      { question: "How do I check my printer's date and time settings?", answer: "Access the printer's Embedded Web Server by typing its IP address into a browser, then look under Network or General settings for a Date and Time section." },
      { question: "Can I prevent this from happening again?", answer: "Yes — if your printer supports NTP (Network Time Protocol), enable automatic time synchronization rather than relying on a manually set clock that can drift or reset over time." }
    ]),
    content: `
      <h2>Quick-Fix Summary</h2>
      <ol>
        <li>Check the printer's internal date and time — my uncommon tip, and the fix that resolves this more often than replacing anything.</li>
        <li>Try accessing the printer's web page directly, acknowledging the security warning.</li>
        <li>Power cycle the printer as a genuine reset.</li>
        <li>Verify the printer's IP address hasn't unexpectedly changed.</li>
        <li>Reissue or reinstall the certificate if the clock genuinely isn't the cause.</li>
      </ol>

      <h2>Fix 1: Check the Printer's Internal Date and Time (My Uncommon Tip)</h2>
      <p>Here's the fix that resolves a meaningful share of "certificate expired" errors, and it's something almost nobody thinks to check because the error message itself points so directly at the certificate rather than anything else.</p>
      <p><strong>Digital certificates are validated against a specific date range</strong> — a "not valid before" and "not valid after" date — and that validation is checked against whatever date and time the printer itself currently believes it is. If your printer's internal clock has drifted, reset itself (sometimes following a power outage, a firmware update, or simply a battery backup component reaching end of life), or was affected by a daylight saving time transition incorrectly, the printer can conclude a completely valid, unexpired certificate has "expired".</p>
      <p>To check and fix this: access the printer's Embedded Web Server if you're able to, and look under Network or General settings for Date and Time. Compare the currently displayed date and time against what it should actually be right now. If it's wrong — even by a surprising amount — correct it manually, or better yet, enable automatic time synchronization via NTP (Network Time Protocol).</p>

      <h2>Fix 2: Access the Printer's Web Page Despite the Warning</h2>
      <p>Type the printer's IP address directly into a browser. If you see a security warning about the certificate, look for an option like Advanced or Show Details, and choose to proceed anyway.</p>
      <p><strong>Why this works:</strong> browsers warn about certificate issues by design, but for a printer on your own trusted local network, this warning doesn't mean the connection itself is compromised — it typically just means the certificate has an issue, which might be exactly the date problem in Fix 1.</p>

      <h2>Fix 3: Power Cycle the Printer</h2>
      <p>Turn the printer off, unplug it from the wall for about 30 seconds, then reconnect and power back on. In some cases, a printer's clock can desync due to a temporary internal glitch that a genuine power cycle clears.</p>

      <h2>Fix 4: Verify the Printer's IP Address Hasn't Changed</h2>
      <p>Check the printer's currently displayed IP address against what you expect it to be. A printer's IP address can occasionally shift unexpectedly, and if you're trying to reach the printer using an outdated or incorrect address, you might encounter what looks like a certificate error but is actually a connection reaching the wrong destination entirely.</p>

      <h2>Fix 5: Reissue or Reinstall the Certificate</h2>
      <p>If you've confirmed the printer's date and time are genuinely correct, and the certificate is still showing as invalid or expired, the certificate itself may actually need to be reissued or reinstalled — through your organization's certificate authority if this is a business network, or through the printer's own self-signed certificate regeneration option.</p>
    `
  },
  {
    slug: 'hp-printer-802-1x-authentication-failed',
    title: 'HP Printer 802.1x Authentication Failed? [Real Fix]',
    categoryId: 'connectivity-issues',
    metaDescription: 'HP printer 802.1x authentication failed on your enterprise network? A repair tech explains the hard limitation most consumer printers have.',
    faqs: JSON.stringify([
      { question: "Does my HP printer support 802.1x authentication at all?", answer: "It depends entirely on the model. Most consumer printers — DeskJet, entry OfficeJet, consumer Envy — genuinely do not support it, and HP's own software tells you this directly during setup. Business-class printers generally do support it." },
      { question: "I only imported the root certificate and authentication still fails. What am I missing?", answer: "Check whether your certificate chain includes an intermediate certificate, and import that as well. This is a specific, documented cause of authentication failures that only importing the root certificate doesn't resolve." },
      { question: "What does an unsupported EAP protocol error actually mean?", answer: "It means the authentication method your printer is configured to use (like PEAP) doesn't match what your network's authentication server expects (like EAP-TLS)." }
    ]),
    content: `
      <h2>Quick Summary</h2>
      <ul>
        <li>Check your printer class first — this determines everything else. My uncommon tip explains the distinction.</li>
        <li>Consumer printers (most DeskJet, OfficeJet, basic Envy models) generally can't do this at all — no setting fixes it.</li>
        <li>Business-class printers (LaserJet Pro, Enterprise, most MFP series) support it through the Embedded Web Server.</li>
        <li>Import both the root AND intermediate certificates — the specific mistake that fails authentication most often.</li>
        <li>EAP protocol mismatches between your printer and your network's RADIUS server are the second most common cause.</li>
      </ul>

      <h2>Check Your Printer Class First (My Uncommon Tip)</h2>
      <p>Here's the step that saves you the most time, and it's worth doing before anything else on this page.</p>
      <p>If you're seeing a message specifically like "Your computer is connected to a wireless network which uses enterprise level authentication (802.1x or WPA-Enterprise). This type of authentication is not supported by this HP software" during setup through the HP Smart app or HP app, this is HP telling you directly and explicitly that your specific printer model doesn't support this authentication type at all. This message shows up consistently across consumer models — DeskJet, entry-level OfficeJet, and consumer Envy printers — and it's not a bug or a misconfiguration on your end. It's a genuine hardware and firmware limitation.</p>
      <p>If instead you're working with a business-class printer — a LaserJet Pro, Enterprise-tier model, or a multifunction printer with a full Embedded Web Server (EWS) interface — genuine 802.1x support is there, and the fixes below apply to you directly.</p>

      <h2>Fix 1: Import Both the Root and Intermediate Certificates</h2>
      <p>Through the printer's EWS (type its IP address into a browser), navigate to Certificates → CA Certificate → Configure, and confirm you've installed <strong>both the root certificate and any intermediate certificate</strong> in your certificate chain — not just the root certificate alone.</p>
      <p><strong>Why this works:</strong> this is a documented, real-world fix for exactly this kind of authentication failure. Certificate chains often include an intermediate certificate that bridges your specific server certificate to the trusted root, and skipping it is an easy, common mistake.</p>

      <h2>Fix 2: Check for an EAP Protocol Mismatch</h2>
      <p>If your printer's authentication attempt is being rejected with an error mentioning an unsupported or unexpected EAP protocol, confirm the EAP type configured on the printer — commonly PEAP or EAP-TLS — matches exactly what your network's RADIUS or authentication server expects.</p>

      <h2>Fix 3: Verify Firmware Is Current</h2>
      <p>Check for and install the latest firmware for your business-class printer through the EWS or HP Smart app before troubleshooting certificate details further. 802.1x and certificate handling capabilities have improved across firmware versions on business-class printers.</p>

      <h2>Fix 4: Confirm You're Not Missing a Simpler Fallback</h2>
      <p>Some network setups allow devices to fall back to MAC-based authentication (MAB) if 802.1x fails, rather than being rejected from the network entirely. If your printer is successfully connecting despite 802.1x failures, check whether your network switch is configured to allow this fallback.</p>
    `
  },
  {
    slug: 'hp-printer-not-appearing-airprint-list-iphone',
    title: 'HP Printer Not in Your AirPrint List on iPhone? Fix',
    categoryId: 'mobile-cloud-printing',
    metaDescription: 'HP printer not showing up in your AirPrint list on iPhone, even though it works on another Apple device? A repair tech explains the real cause.',
    faqs: JSON.stringify([
      { question: "Why would the printer show up on my iPad but not my iPhone, on the same network?", answer: "This points to something specific to your iPhone's own network stack, cached discovery information, or settings, rather than a problem with the printer or network broadly." },
      { question: "Will forgetting my Wi-Fi network and rejoining fix a device-specific AirPrint problem?", answer: "It's worth trying if a restart alone hasn't resolved it — this more thoroughly resets your iPhone's stored relationship with that specific network." },
      { question: "Should I check if AirPrint is enabled on the printer itself?", answer: "Yes, always worth confirming directly through the printer's own network settings menu — this can get disabled unintentionally during a factory reset or firmware update." }
    ]),
    content: `
      <h2>Quick-Fix Summary</h2>
      <ol>
        <li>Confirm the same network, watching for separate Wi-Fi bands.</li>
        <li>Restart the printer and your iPhone fully.</li>
        <li>Test on a second Apple device — my uncommon tip, and the fastest way to isolate a device-specific cause.</li>
        <li>Check that AirPrint is enabled on the printer itself.</li>
        <li>Update iOS, since compatibility issues follow version mismatches closely.</li>
      </ol>

      <h2>Fix 1: Confirm You're on the Same Network</h2>
      <p>Check the exact Wi-Fi network name shown on your printer's own display or control panel against what your iPhone shows under Settings → Wi-Fi, paying particular attention if your router broadcasts separate 2.4GHz and 5GHz networks under different names.</p>
      <p><strong>Why this works:</strong> AirPrint discovery only works within the same local network segment. A printer and iPhone on different bands of the same router are effectively on separate networks for discovery purposes, even sitting in the same room.</p>

      <h2>Fix 2: Restart Both Devices Fully</h2>
      <p>Power the printer completely off and back on. On your iPhone, do a genuine restart — hold the side button and a volume button until the power slider appears, rather than just closing apps. Both the printer's network broadcast and your iPhone's own discovery cache can hold onto stale information that a simple reconnection attempt doesn't clear.</p>

      <h2>Fix 3: Test on a Second Apple Device (My Uncommon Tip)</h2>
      <p>Here's the diagnostic step that instantly narrows down where your actual problem lives, and it's genuinely one of the fastest, most useful tests available for this specific complaint.</p>
      <p>If you have access to a second Apple device — another iPhone, an iPad, a family member's phone — connect it to the exact same Wi-Fi network your printer is on, and check whether the printer appears in its AirPrint list when printing something.</p>
      <p><strong>If the printer appears normally on the second device but not on your original iPhone:</strong> this is a strong, direct signal that the cause is specific to that one iPhone — something in its own network stack, cached discovery data, or a privacy setting — rather than anything wrong with the printer, the network, or AirPrint broadly.</p>
      <p><strong>If the printer doesn't appear on either device:</strong> the cause is more likely genuinely tied to the printer or the network itself, and you should focus your troubleshooting there instead — checking AirPrint is enabled on the printer, confirming network settings, and so on.</p>

      <h2>Fix 4: Confirm AirPrint Is Enabled on the Printer</h2>
      <p>Through the printer's own control panel, check its network or wireless settings menu for anything related to AirPrint or Web Services, and confirm it's turned on rather than disabled.</p>

      <h2>Fix 5: Update iOS</h2>
      <p>Go to Settings → General → Software Update on your iPhone and install anything available. AirPrint discovery compatibility issues sometimes follow specific iOS version releases.</p>

      <h2>When to Try the Full Reconnection Path</h2>
      <p>If your Fix 3 test confirmed the problem is specific to your iPhone, and a restart and iOS update haven't resolved it, try forgetting the Wi-Fi network entirely on your iPhone (Settings → Wi-Fi → tap the info icon next to your network → Forget This Network) and rejoining it fresh with the password. This forces your iPhone to rebuild its entire network relationship from scratch.</p>
    `
  },
  {
    slug: 'hp-utility-not-opening-mac',
    title: 'HP Utility Not Opening on Mac? Try This Workaround',
    categoryId: 'drivers-software-firmware',
    metaDescription: 'HP Utility or HP app won\'t open on your Mac? A repair tech shares a hidden path to printer maintenance tools that skips the app entirely.',
    faqs: JSON.stringify([
      { question: "Can I really clean my printhead without the HP app working at all?", answer: "Yes, on most network-connected models — access your printer's IP address directly in a browser to reach its Embedded Web Server, then look for a Tools or Print Quality Toolbox section offering cleaning and diagnostic functions independent of any app." },
      { question: "Why does testing with a guest account help diagnose this?", answer: "It cleanly separates whether the problem is specific to your user profile — often a corrupted preference or cache file — versus something affecting the app installation or your Mac system more broadly." },
      { question: "Is losing app features a big deal if I switch to AirPrint instead?", answer: "For basic, reliable printing, no — AirPrint handles that well and is maintained directly by Apple. You'd lose some convenience features like in-app ink monitoring, but many of those same functions remain accessible through the printer's own web page regardless." }
    ]),
    content: `
      <h2>Quick-Fix Summary</h2>
      <ol>
        <li>Check for macOS updates, since compatibility issues follow OS version mismatches closely.</li>
        <li>Test with a new guest user account to isolate whether it's your user profile specifically.</li>
        <li>Access maintenance tools directly through the printer's own web page — my uncommon tip, and a complete workaround for an app that won't open at all.</li>
        <li>Reinstall using the correct driver path, not just the app store version.</li>
        <li>Know when AirPrint alone is the more reliable path forward.</li>
      </ol>

      <h2>Fix 1: Check for macOS Updates</h2>
      <p>Click the Apple menu → About This Mac → Software Update, and install anything available. App compatibility issues frequently trail behind macOS version updates.</p>

      <h2>Fix 2: Test With a New Guest or Test User Account</h2>
      <p>Create a new user account on your Mac (Apple menu → System Settings → Users & Groups → add a new user), log into that account, and try opening the HP app or Utility from there.</p>
      <p><strong>Why this works:</strong> this is a clean, direct diagnostic split. If the app opens fine under a fresh user account, the problem is specific to something in your original user profile — often a corrupted preference file or cache — rather than anything wrong with the app installation itself.</p>

      <h2>Fix 3: Access Maintenance Tools Directly Through the Printer's Web Page (My Uncommon Tip)</h2>
      <p>Here's the workaround that solves the actual underlying need for a meaningful share of people searching for this problem, and it completely sidesteps the app rather than continuing to troubleshoot why it won't open.</p>
      <p>Every network-connected HP printer runs its own built-in web interface — the <strong>Embedded Web Server (EWS)</strong> — reachable directly from any browser, with no app installation required at all. You can access most of the maintenance functions people typically open the HP Utility or app for directly through this page instead.</p>
      <p><strong>To reach it:</strong> find your printer's IP address (check its own display or control panel, or print a network configuration page), and type that IP address directly into Safari or any browser's address bar. This opens the printer's own web dashboard. From here, look for a Tools tab, or in some cases a View Printer Webpage option available directly within the printer's entry in System Settings → Printers & Scanners on your Mac. Inside, you'll typically find a Print Quality Toolbox or similar section, letting you run printhead cleaning cycles, check ink levels, and run diagnostic pages, all without the HP app or Utility ever needing to open successfully.</p>
      <p><strong>Why this works:</strong> the HP app and Utility are really just friendlier front-end interfaces layered on top of functionality the printer's own web server already provides directly. When that front-end app won't launch, you're not actually locked out of the underlying maintenance features — you're only locked out of one particular, convenient way of reaching them.</p>

      <h2>Fix 4: Reinstall Using the Correct Driver Path</h2>
      <p>If you want the app itself working rather than relying on the EWS workaround long-term, remove the app completely (drag it to Trash, and also check ~/Library/Application Support for a leftover HP folder to remove), restart your Mac, then reinstall using <strong>HP Easy Start</strong> from HP's official support site for your exact model, rather than only the App Store version.</p>

      <h2>Fix 5: Know When AirPrint Alone Is the More Reliable Path</h2>
      <p>If the app continues to fail regardless of what you try, and your printer supports AirPrint, you can add and use the printer through System Settings → Printers & Scanners using AirPrint directly, bypassing HP's software entirely for basic printing.</p>
    `
  },
  {
    slug: 'hp-deskjet-4155e-wont-connect-wifi',
    title: 'HP DeskJet 4155e Won\'t Connect to Wi-Fi? (Quick Fix)',
    categoryId: 'connectivity-issues',
    metaDescription: 'Is your HP DeskJet 4155e failing to connect to Wi-Fi? Learn how to fix the blinking blue light and get your printer connected to your home network fast.',
    faqs: JSON.stringify([
      { question: "Why is the blue Wi-Fi light blinking on my HP 4155e?", answer: "A blinking blue light means the printer is in setup mode and is waiting for you to complete the network connection using the HP Smart app." },
      { question: "How do I connect my HP DeskJet 4155e to Wi-Fi?", answer: "Open the HP Smart app on your phone or computer, select 'Add Printer', choose the DeskJet 4155e, and follow the prompts to enter your Wi-Fi password." },
      { question: "Why won't the HP Smart app find my printer?", answer: "Ensure Bluetooth and Wi-Fi are enabled on your device. Also, ensure your router is broadcasting a 2.4GHz network, as many budget printers cannot connect to 5GHz bands." }
    ]),
    content: `
      <h2>The Quick Answer</h2>
      <p><strong>If your HP DeskJet 4155e won't connect to Wi-Fi, the most common reason is that it's trying to connect to a 5GHz network instead of a 2.4GHz network. To fix this, ensure your phone or PC is connected to your router's 2.4GHz Wi-Fi band, then open the HP Smart app and select "Add Printer" to complete the setup.</strong></p>
      
      <h2>Why the Wi-Fi Setup Fails</h2>
      <p>Many modern routers broadcast a single, merged network name for both 2.4GHz and 5GHz bands (known as band steering). Because the HP DeskJet 4155e primarily relies on 2.4GHz to communicate during setup, it can get confused if your phone is forcing a 5GHz connection.</p>

      <h2>Step 1: Put the Printer in Setup Mode</h2>
      <p>If the printer isn't even showing up in the HP Smart app, it might not be in setup mode.</p>
      <ol>
        <li>Turn the printer on.</li>
        <li>Press and hold the <strong>Cancel (X)</strong> button and the <strong>Wireless</strong> button at the same time for about 3 seconds.</li>
        <li>The power button will blink, and then the blue Wireless light will start pulsing. This means the printer is broadcasting its setup signal.</li>
      </ol>

      <h2>Step 2: Connect via the HP Smart App</h2>
      <p>With the blue light pulsing, bring your smartphone or laptop close to the printer.</p>
      <ul>
        <li>Ensure Bluetooth is turned ON on your phone/PC.</li>
        <li>Ensure you are connected to your home Wi-Fi network.</li>
        <li>Open the HP Smart app and click <strong>Add Printer</strong>.</li>
        <li>Select the DeskJet 4155e when it appears and enter your Wi-Fi password.</li>
      </ul>

      <h2>Step 3: Temporarily Separate Your Wi-Fi Bands</h2>
      <p>If the HP Smart app consistently fails at the "Sending Network Information" step, log into your home router's admin panel. Temporarily disable the 5GHz band, or give the 2.4GHz band a slightly different name (like "HomeNetwork_24"). Connect the printer to the 2.4GHz network. Once it is connected and the blue light is solid, you can turn the 5GHz band back on.</p>
    `
  },
  {
    slug: 'hp-envy-6055e-paper-jam-no-paper',
    title: 'HP Envy 6055e Paper Jam But No Paper? (Solved)',
    categoryId: 'paper-handling-issues',
    metaDescription: 'Is your HP Envy 6055e showing an E4 paper jam error but there is no paper stuck inside? Learn how to clear a false jam and clean the feed rollers.',
    faqs: JSON.stringify([
      { question: "What does the E4 error mean on an HP Envy 6055e?", answer: "An E4 error on the HP Envy 6000 series indicates a paper jam. The printer's sensors have detected an obstruction in the paper path." },
      { question: "Why does my printer say there is a paper jam when there isn't?", answer: "False paper jams occur when the rubber paper feed rollers become dirty and lose their grip, or when a tiny scrap of torn paper blocks the carriage sensor." },
      { question: "How do I fix a false paper jam on an HP Envy?", answer: "Unplug the printer for 60 seconds to perform a hard reset. Then, use a damp lint-free cloth to thoroughly clean the gray rubber paper feed rollers." }
    ]),
    content: `
      <h2>The Quick Answer</h2>
      <p><strong>If your HP Envy 6055e displays an E4 error (Paper Jam) but there is no paper stuck inside, you are experiencing a "false jam." This is almost always caused by dirty paper feed rollers. Unplug the printer, remove the input tray, and use a lint-free cloth dampened with distilled water to clean the gray rubber rollers underneath the printer.</strong></p>
      
      <h2>What Causes a False Paper Jam?</h2>
      <p>The HP Envy 6055e doesn't have eyes; it relies on mechanical resistance and optical sensors. If the rubber feed rollers are coated in paper dust, they slip instead of grabbing the paper. When the paper doesn't move forward in the expected amount of time, the printer's logic board assumes a jam has occurred.</p>

      <h2>Step 1: Perform a Hard Reset</h2>
      <p>Sometimes the error state gets stuck in the printer's memory.</p>
      <ol>
        <li>Leave the printer turned ON.</li>
        <li>Unplug the power cord from the back of the printer.</li>
        <li>Wait a full 60 seconds.</li>
        <li>Plug the power cord back in and let the printer initialize.</li>
      </ol>

      <h2>Step 2: Clean the Pick Rollers (The Real Fix)</h2>
      <p>If the hard reset doesn't clear the E4 error, you must clean the rollers.</p>
      <ul>
        <li>Unplug the printer and remove all paper from the tray.</li>
        <li>Carefully flip the printer over or tilt it backward to access the bottom cleanout door.</li>
        <li>Open the cleanout door. You will see several gray rubber rollers.</li>
        <li>Lightly dampen a lint-free cloth with distilled or bottled water (do not use alcohol).</li>
        <li>Wipe the rollers thoroughly, rotating them with your fingers to clean the entire surface.</li>
        <li>Let the rollers dry for 10 minutes, close the cleanout door, and test the printer.</li>
      </ul>

      <h2>Step 3: Check the Carriage Path</h2>
      <p>Lift the cartridge access door. Shine a flashlight into the extreme left and right corners of the carriage track. Sometimes a tiny, postage-stamp-sized scrap of torn paper will wedge itself against the carriage sensor, triggering an E4 error. Use tweezers to remove any debris.</p>
    `
  },
  {
    slug: 'hp-officejet-pro-9015e-printhead-missing-failed',
    title: 'HP OfficeJet Pro 9015e Printhead Missing or Failed',
    categoryId: 'error-codes-alerts',
    metaDescription: 'Is your HP OfficeJet Pro 9015e displaying a "Printhead appears to be missing, not detected, or incorrectly installed" error? Learn how to fix it.',
    faqs: JSON.stringify([
      { question: "What does 'printhead missing or failed' mean on an HP 9015e?", answer: "This error means the printer has lost electrical communication with the printhead assembly, which is the component that holds the ink cartridges and sprays the ink onto the paper." },
      { question: "How do I fix a failed printhead on my HP OfficeJet Pro?", answer: "First, perform a hard reset by unplugging the printer. Next, open the cartridge access door, remove all ink cartridges, and lift the latch to reseat the entire printhead assembly. Clean the copper contacts if necessary." },
      { question: "Can you replace the printhead on an HP OfficeJet Pro 9015e?", answer: "Yes, the printhead assembly is removable and replaceable. However, it is an expensive part, and if the printer is out of warranty, replacing the whole printer is sometimes more cost-effective." }
    ]),
    content: `
      <h2>The Quick Answer</h2>
      <p><strong>If your HP OfficeJet Pro 9015e shows a "Printhead Missing or Failed" error, the printer has lost electrical contact with the printhead. To fix it, lift the cartridge access door, remove the ink cartridges, lift the latch on the right side of the carriage, lift the printhead out, and then firmly snap it back into place to re-establish the connection.</strong></p>
      
      <h2>Understanding the Printhead Error</h2>
      <p>The printhead is the carriage block that holds your four HP 962 ink cartridges. It communicates with the printer's main board via a ribbon cable and a set of gold electrical contacts. If the printer gets bumped, or if a power surge occurs, the printhead can momentarily lose contact, triggering a fatal error.</p>

      <h2>Step 1: The Hard Reset</h2>
      <p>Before disassembling anything, clear the printer's memory cache.</p>
      <ul>
        <li>With the printer turned ON, unplug the power cord from the wall.</li>
        <li>Wait 60 seconds.</li>
        <li>Plug the cord back directly into a wall outlet (bypass any surge protectors, as they can restrict the high voltage needed to initialize the printhead).</li>
      </ul>

      <h2>Step 2: Reseat the Printhead Assembly</h2>
      <p>If the reset fails, you need to physically reseat the part to scrape any oxidation off the electrical contacts.</p>
      <ol>
        <li>Open the front door and lift the cartridge access door. The carriage will slide to the center.</li>
        <li>Unplug the printer so the carriage stays in the center.</li>
        <li>Remove all four ink cartridges and set them aside.</li>
        <li>Lift the latch handle on the right side of the carriage.</li>
        <li>Grab the sides of the printhead and lift it slightly up and out of the printer.</li>
        <li>Using a dry, lint-free cloth, gently wipe the gold electrical contacts on the back of the printhead.</li>
        <li>Lower the printhead back into the carriage, lower the latch handle to lock it, and reinstall the cartridges.</li>
      </ol>

      <h2>When to Replace the Printhead</h2>
      <p>If you've reseated the printhead multiple times and the error persists, the circuitry inside the printhead has likely blown out. If your printer is still under its 1-year warranty (or 2-year HP+ warranty), contact HP Support immediately for a free replacement part. If it is out of warranty, you can purchase a replacement printhead, but weigh the cost against buying a new printer.</p>
    `
  }
];

async function main() {
  console.log('Seeding 8 new HP articles (Batch 20)...');
  
  const hpBrand = await prisma.brand.findUnique({ where: { slug: 'hp' } });
  if (!hpBrand) throw new Error('HP brand not found');
  
  const author = await prisma.author.findFirst();
  if (!author) throw new Error('No author found');

  for (const a of articles) {
    const category = await prisma.category.findUnique({ where: { slug: a.categoryId } });
    if (!category) throw new Error('Category not found: ' + a.categoryId);

    await prisma.article.upsert({
      where: { slug: a.slug },
      update: {},
      create: {
        title: a.title,
        slug: a.slug,
        excerpt: a.metaDescription, // Use metaDescription as excerpt fallback
        content: a.content,
        metaDescription: a.metaDescription,
        faqs: a.faqs,
        status: 'published',
        publishedAt: new Date(),
        brandId: hpBrand.id,
        categoryId: category.id,
        authorId: author.id,
        reviewerId: author.id,
        reviewedAt: new Date(),
        difficultyLevel: 'Intermediate',
        timeToFix: '15 minutes'
      }
    });
    console.log('✅ Created:', a.slug);
  }
  
  console.log('All 8 articles created successfully.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
