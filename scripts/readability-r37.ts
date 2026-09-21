import { prisma } from '../src/lib/prisma';
import fs from 'fs';

async function processArticle(slug: string, newContent: string) {
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article) {
    console.log(`Not found: ${slug}`);
    return;
  }
  const beforeCount = article.content.split(/\s+/).length;
  await prisma.article.update({
    where: { slug },
    data: { content: newContent }
  });
  const afterCount = newContent.split(/\s+/).length;
  console.log(`Updated ${slug}: words ${beforeCount} -> ${afterCount}`);
}

async function main() {
  const updates = [
    {
      slug: "phomemo-bluetooth-permissions-qr-code-pairing-android-12",
      content: `<h2>Introduction</h2>
<p>Connect your Phomemo thermal printer to an Android device easily. On Android 12 or newer, you must grant specific Bluetooth permissions. You also need to follow the correct pairing process, like using a QR code. Mobile operating systems change their security models over time. This affects how devices talk to phones and tablets. Google added new Bluetooth permissions in Android 12. These permissions separate Bluetooth access from location access. This change boosts user privacy but confuses many users. This guide explains Bluetooth connectivity on Android 12+. We focus on the Phomemo app's QR code pairing method. We also help you troubleshoot common connection problems.</p>
<p>Before Android 12, apps needed location permissions to scan for Bluetooth devices. People could use Bluetooth scanning to find a user's location. Now, apps must ask for permission to scan for nearby devices. Deny these permissions, and the Phomemo app cannot find your printer. The printer might be on and right next to your phone. The QR code pairing method makes this process simpler. It passes the connection details right to the app. This skips the manual search step. But it still needs the correct OS permissions to work.</p>
<p>This article explains Android Bluetooth permissions. We show why the Phomemo app needs them and how to set them up. We also look at how QR code pairing works. This feature helps you skip the tricky Bluetooth search process. Read this guide to learn how to connect your Phomemo printer. You will get reliable results on any Android version.</p>
<p>We also cover specific error messages you might see during pairing. You might see a "Device Not Found" error or an endless loading spinner. Sometimes a connection drops right after it starts. We have the solutions for these issues. Check each possible failure point one by one. Start at the OS level and move down to the printer hardware. Learn this order to fix many Bluetooth devices, not just Phomemo printers.</p>

<h2>Why This Happens</h2>
<p>Most Phomemo Bluetooth pairing issues on Android 12 start with the Nearby Devices permission. Open the Phomemo app for the first time, and it asks for this permission. Tap "Deny" or "Only this time", and the app loses its Bluetooth access. Then, it cannot find the printer's signal.</p>
<p>Another issue is pairing through the Android system settings instead of the app. Phomemo printers use Bluetooth Low Energy (BLE). Classic Bluetooth devices require pairing through the phone's main menu. BLE devices need a direct connection inside their companion app. Pair the printer through Android settings first, and the app might fail to connect. The system might block the app from making its own connection.</p>
<p>The QR code pairing method skips the manual search. It gives the app the exact MAC address of the printer. But deny the camera permission, and the QR scan will fail. A low printer battery or an old app version can also cause pairing failures. A weak battery reduces the Bluetooth signal strength. This leads to drops or a missing device in the scan list.</p>

<h2>Step-by-Step Fix</h2>
<ol>
  <li><strong>Forget Existing Pairings:</strong> Open Settings on your Android device. Go to Connected devices, then Bluetooth. Find the Phomemo printer in the list. Tap the gear icon next to it. Select "Forget" or "Unpair". You must connect through the app, not the system menu.</li>
  <li><strong>Check App Permissions:</strong> Open Settings. Go to Apps, then See all apps. Find the Phomemo app. Tap on "Permissions".</li>
  <li><strong>Grant Nearby Devices Permission:</strong> Find the "Nearby devices" or "Bluetooth" permission. Tap it and choose "Allow". This is very important for Android 12+.</li>
  <li><strong>Grant Camera Permission (for QR Code):</strong> Stay in the Permissions menu. Make sure the "Camera" permission is granted. You need this to scan the pairing QR code.</li>
  <li><strong>Enable Bluetooth and Location:</strong> Turn on Bluetooth. Android 12 separates Bluetooth and Location permissions. But some apps still need Location services to scan for BLE devices. Turn on Location just to be safe.</li>
  <li><strong>Restart the Printer:</strong> Turn the Phomemo printer off. Wait 5 seconds, and turn it back on. Make sure the battery is fully charged. A low battery weakens the Bluetooth signal.</li>
  <li><strong>Open App and Scan:</strong> Open the Phomemo app. Go to the connection screen. You usually find this icon in the top right corner.</li>
  <li><strong>Use QR Code Pairing:</strong> Choose the option to scan a QR code. Print the info page from your printer. Double-click the power button to print it. Scan the QR code on that page with your phone. The app will recognize and connect to the printer.</li>
</ol>

<h2>Advanced Troubleshooting</h2>
<p>Does the standard fix fail? You might need to look deeper into the system settings. A corrupted Bluetooth cache is a common cause. Android stores temporary data for Bluetooth connections. Bad data causes persistent pairing problems. Clear the Bluetooth cache to fix this. Enable Developer Options first. Go to Settings, then System, then Reset options. Choose Reset Wi-Fi, mobile & Bluetooth. Warning: This will delete all saved Wi-Fi networks and Bluetooth pairings. You must reconnect to everything again.</p>
<p>Check for interfering apps next. Apps that manage Bluetooth connections can block the Phomemo app. Boot your phone into Safe Mode to test this. Hold the power button, then long-press the "Power off" option on the screen. Safe Mode turns off third-party apps. Does the printer connect in Safe Mode? Then an app is causing the conflict.</p>
<p>Check the printer's firmware (internal software) as well. A firmware bug can cause connectivity issues. Look for firmware updates on the Phomemo website or in the app. You need a stable connection to update the firmware. If you connect briefly, update the firmware right away. Make sure your Android OS is up to date too. Google often releases patches to improve Bluetooth stability.</p>

<h2>FAQ</h2>
<details>
  <summary>Why does the app say "Device not found" even when the printer is on?</summary>
  <p>This means you have a permission issue on Android 12+. Grant the "Nearby devices" permission to the Phomemo app in your settings. Make sure you did not pair the printer in the main Android Bluetooth menu.</p>
</details>
<details>
  <summary>Can I connect multiple phones to one Phomemo printer?</summary>
  <p>No. Most portable thermal printers use a one-to-one connection. If phone A connects, phone B cannot find the printer. Disconnect phone A first. Then phone B can connect.</p>
</details>
<details>
  <summary>What if I lost the paper with the QR code?</summary>
  <p>You can reprint the info page with the QR code. Turn the printer on and load paper. Double-click the power button. This works for most Phomemo models.</p>
</details>
<details>
  <summary>Why does it disconnect randomly while printing?</summary>
  <p>Random drops often mean a low battery or physical interference. Keep the printer fully charged. Keep the phone and printer close together. Stay away from microwaves or 2.4GHz Wi-Fi routers.</p>
</details>`
    },
    {
      slug: "fix-xerox-scan-to-email-connectkey-smb-share-errors",
      content: `<h1>Fix Xerox Scan to Email and ConnectKey SMB Share Errors</h1>
<p>Offices rely heavily on multifunction printers (MFPs) like the Xerox VersaLink and AltaLink series. These printers use the ConnectKey ecosystem. Scan to Email and Scan to Network Folder (SMB Share) are critical features. When these features fail, office work stops. Users see cryptic error codes on the screen. Common errors include "016-772," "027-504," "DNS Error," or "Login Failure." Troubleshooting these errors can be hard for IT admins. The causes involve network infrastructure, DNS resolution, and SMTP mail server authentication. Complex SMB settings also play a role. This guide breaks down Xerox ConnectKey network scanning. We identify common points of failure. We provide a step-by-step fix to restore Scan to Email and SMB Share. This ensures secure document routing across your network.</p>

<h2>Why This Happens</h2>
<p>Scan to Email failures often trace back to SMTP (Simple Mail Transfer Protocol) authentication or network routing issues. The Xerox machine acts as an email client during a scan. It contacts an SMTP server to send the message. This server might be Microsoft 365, Google Workspace, or a local Exchange server. Incorrect DNS settings prevent the printer from finding the server's IP address. Modern email providers require strict security protocols. They demand TLS 1.2 or TLS 1.3 encryption and specific port settings. Outdated firmware (internal software) might only support older protocols. The server will reject the connection in this case. Also, Microsoft 365 and Google Workspace no longer use simple username and password logins. They require OAuth 2.0 or App Passwords. Using standard credentials without an App Password causes a "016-772" error.</p>
<p>SMB Share errors often stem from the old SMBv1 protocol. Older Xerox machines used SMBv1 by default. Modern Windows servers disable SMBv1 to prevent ransomware. The server drops the connection if the copier tries to use SMBv1. Even with SMBv2/SMBv3, authentication can fail. The copier must use the correct domain format (like DOMAIN\\Username). The user account must also have write permissions on the target network folder. Finally, time synchronization is very important. The copier's internal clock must match the domain controller's clock. A time drift of over five minutes causes Kerberos and NTLMv2 authentication to fail.</p>

<h2>Step-by-Step Fix</h2>
<ol>
<li><strong>Access the Embedded Web Server (EWS):</strong> Do not use the printer's touch screen to fix these issues. Find the printer's IP address. Type it into a web browser on a connected computer. Log in as the administrator.</li>
<li><strong>Verify Network & DNS Settings:</strong> Go to Properties > Connectivity > Setup > Network. Check the IPv4 settings. Ensure the DNS settings are correct. Point the primary and secondary DNS servers to your internal domain controllers. Use public DNS (like 8.8.8.8) if you are in a workgroup. Bad DNS causes most SMTP hostname failures.</li>
<li><strong>Update the Firmware:</strong> Check the firmware version before changing advanced settings. Go to Properties > General Setup > Software Upgrade. Compare your version with the latest release on the Xerox support site. Update the firmware to add support for TLS 1.2 and modern SMBv3.</li>
<li><strong>Configure NTP (Network Time Protocol):</strong> Go to Properties > General Setup > Date and Time. Set the machine to sync with an NTP server. Use time.windows.com or your internal domain controller. Accurate time is critical for secure SMB and SMTP authentication.</li>
<li><strong>Fixing Scan to Email (SMTP Setup):</strong> Go to Properties > Connectivity > Setup > SMTP Server. Enter the correct hostname (like smtp.office365.com). Set the port to 587.</li>
<li><strong>Configure SMTP Encryption:</strong> Select "STARTTLS" or "TLS/SSL" in the encryption settings. Do not leave it on "Off" or "Auto" if the server needs encryption.</li>
<li><strong>Implement App Passwords:</strong> Generate an "App Password" for the copier in Microsoft 365 or Google. Use the licensed email address as the username. Enter the 16-character App Password in the copier's SMTP settings. Do not use the normal account password.</li>
<li><strong>Test SMTP Configuration:</strong> Click the "Test Configuration" button in the EWS. Check the detailed error log if it fails. A "resolution failed" error means bad DNS. An "authentication failed" error points to wrong credentials.</li>
<li><strong>Fixing SMB Shares (Network Folders):</strong> Go to Properties > Services > Network Scanning > File Repository Setup. Edit the existing folder or create a new one.</li>
<li><strong>Force Modern SMB Protocols:</strong> Set the protocol to SMBv2 or SMBv3 in the SMB setup. Disable SMBv1 in the copier's security settings. This forces the device to use higher protocols.</li>
<li><strong>Configure the Share Path Correctly:</strong> Use the server's IP address instead of the hostname. This bypasses DNS resolution issues. Enter the exact share name (like Scans).</li>
<li><strong>Set Domain Credentials:</strong> Enter the username as <code>DOMAIN\\Username</code> in the authentication section. Ensure this account has "Modify" permissions on the target folder. Test the connection.</li>
</ol>

<h2>Advanced Troubleshooting</h2>
<p>Analyze network traffic and security policies if basic fixes fail. Your firewall or ISP might block traffic on port 587 or 25. Create a firewall rule to allow the Xerox MFP to use these ports. For enterprise Microsoft 365, configure a direct SMTP Relay Connector. Lock it down to your office's public IP address. This bypasses multifactor authentication (MFA) and is more reliable.</p>
<p>Check the Local Security Policy on the destination Windows Server for persistent SMB issues. Go to Security Settings > Local Policies > Security Options. Set "Network security: LAN Manager authentication level" to "Send NTLMv2 response only." The server will reject older NTLMv1 responses from old Xerox firmware. Check the Windows Event Viewer on the file server during a failed scan. Look for Event ID 4625 (Logon Failure). The code will explain the failure reason. Also, ensure Windows Defender Firewall does not block "SMB Direct" and "SMB over TCP (Port 445)".</p>

<h2>FAQ</h2>
<details>
<summary>What does Xerox error 016-772 mean?</summary>
<p>Error code 016-772 is a general SMTP routing or DNS error. The Xerox device cannot find the IP address of the SMTP server. Incorrect DNS server settings often cause this. Typing the SMTP server address incorrectly is another common cause.</p>
</details>
<details>
<summary>Can I use a free Gmail account for Scan to Email?</summary>
<p>Yes, but Google blocks "Less Secure Apps." You cannot use a standard Gmail password. Go to Google Account security settings and enable 2-Step Verification. Generate a 16-character "App Password." Use your Gmail address and this App Password in the Xerox settings. Use smtp.gmail.com on port 587 with STARTTLS encryption.</p>
</details>
<details>
<summary>Why does the SMB scan work with an IP address but not the server name?</summary>
<p>This means the Xerox machine cannot resolve the hostname. The printer is likely using a public DNS instead of your internal DNS server. Public DNS servers do not know your local network hostnames. Update the primary DNS on the printer to fix this.</p>
</details>
<details>
<summary>Does Xerox ConnectKey support scanning to SharePoint or OneDrive?</summary>
<p>Yes, but not natively through basic SMB or SMTP protocols. Install Xerox ConnectKey Apps from the Xerox App Gallery to scan to Microsoft 365 cloud services. These apps use OAuth 2.0 to authenticate the user securely. They transfer documents directly via Microsoft Graph APIs.</p>
</details>`
    },
    {
      slug: "phomemo-wont-turn-on-wont-charge-battery-drain-fix",
      content: `<h2>Fix Phomemo Won't Turn On or Charge</h2>
<p>Phomemo thermal printers are great portable devices. They run on internal lithium-ion batteries. But sometimes the device refuses to turn on or hold a charge. This turns a fun gadget into a heavy paperweight. Users often report the printer is plugged in, but no lights turn on. Sometimes the device appears to charge but dies when unplugged. You cannot bypass the battery with an external power brick. You must resolve the power delivery issue directly. The problem usually involves a degraded battery, a bad charging cable, or physical damage to the USB port. The charging port is vulnerable to wear, dust, and bending. This guide will help you diagnose why your Phomemo is dead. We provide practical solutions to restore power.</p>

<h2>Why This Happens</h2>
<p>Power failures in portable electronics often start at the charging port. Plugging and unplugging the cable bends or breaks the small metal pins inside. The pins must make solid contact with the charging cable to let electricity flow. Lint, dust, and dirt can compact inside the port. This dirt acts as an insulator and blocks the connection.</p>
<p>Charging accessories also fail often. USB cables contain fragile wires that fray internally. Using a cheap, low-quality power adapter might not supply enough power. A weak adapter cannot charge the internal battery properly. This leads to slow charging or no charging at all.</p>
<p>The internal lithium-ion battery has a limited lifespan. Lithium-ion chemistry breaks down over time. If you leave the printer fully discharged for months, the battery voltage drops. The internal battery management system (BMS) steps in. It stops the battery from accepting a charge to keep you safe. Extreme heat can also ruin the battery chemistry. This reduces its capacity or causes complete failure.</p>

<h2>Step-by-Step Fix</h2>
<ol>
<li><strong>Inspect the charging port visually:</strong> Shine a flashlight into the charging port of the Phomemo printer. Look for pocket lint, dust, or debris. Check the small central tongue inside the port. Make sure it is not bent or broken.</li>
<li><strong>Clean the charging port:</strong> Turn the device off if it has any power left. Use a wooden or plastic toothpick to gently scrape out dirt. Never use a metal pin. A metal pin can cause a short circuit. Be very careful not to bend the delicate internal pins.</li>
<li><strong>Use a known-working cable and adapter:</strong> Change your charging setup. Use a high-quality USB cable that works with another device. Connect it to a strong USB wall adapter. Avoid low-power USB ports on laptops or cheap hubs.</li>
<li><strong>Perform the "wiggle test":</strong> Plug the cable in and gently wiggle the connector. Does the charging light flicker? The charging port is likely loose or damaged. This requires a deeper hardware repair.</li>
<li><strong>Leave it on charge for an extended period:</strong> A deeply discharged battery needs time to recover. The BMS trickles power to raise the voltage safely. Plug the printer into a strong charger and leave it alone for 4 to 6 hours. The LED might take hours to illuminate.</li>
<li><strong>Perform a hard reset:</strong> Look for a tiny reset pinhole on the printer. Use a paperclip to press and hold the hidden button for 10 seconds. This resets the internal computer. Do this while the printer is plugged in.</li>
<li><strong>Attempt to power on while plugged in:</strong> Let the printer charge for a few hours. Try pressing the power button for 3-5 seconds while it remains connected. Does it turn on but die instantly when unplugged? The battery has failed and needs replacement.</li>
<li><strong>Check the ambient temperature:</strong> Keep the printer at room temperature. The BMS blocks charging in extreme cold or heat to prevent fires. Let it reach a normal indoor temperature before charging.</li>
</ol>

<h2>Advanced Troubleshooting</h2>
<p>You might face a hardware failure if standard steps do not work. Ensure your charger and cable function correctly first. The most common hardware issue is a broken charging port. Repeated stress cracks the tiny solder joints inside. You must open the printer and use a micro-soldering iron to fix this. You can reflow the solder joints or replace the port entirely. This is a delicate job that needs technical skill.</p>
<p>If the port looks fine, the internal battery might be dead. Replacing the battery means prying open the plastic casing. Disconnect the old battery from the mainboard. Splice in a compatible replacement battery of the same voltage and size. Finding exact replacement batteries for Phomemo printers can be hard. You might need to buy a generic battery and solder the wires manually.</p>
<p>Warning: Opening the device voids your warranty. Lithium-ion batteries are dangerous if punctured. If you lack electronics repair skills, contact Phomemo support. You can also take it to a local electronics repair shop.</p>

<h2>FAQ</h2>
<details>
<summary>My printer's light blinks red when plugged in, what does that mean?</summary>
<p>A blinking red light usually means a charging error. The charger might be too weak. The temperature might be too high. Or the internal battery is damaged. Try a different, more powerful wall adapter first.</p>
</details>
<details>
<summary>Can I just replace the battery easily like in an old digital camera?</summary>
<p>No, the Phomemo does not have an easy battery door. The battery is sealed inside to keep the device small. You need special tools to open the shell and basic electronics skills to replace it.</p>
</details>
<details>
<summary>Is it safe to leave the printer plugged in overnight?</summary>
<p>Yes. Modern electronics stop charging when the battery reaches 100%. But storing it fully charged in a hot room for months will ruin the battery faster.</p>
</details>
<details>
<summary>The port looks completely broken inside. Is the printer trash?</summary>
<p>Not necessarily. A broken port prevents charging, but a repair shop can fix it. A skilled tech can solder on a generic replacement port for a low fee. This saves the device from the trash.</p>
</details>`
    },
    {
      slug: "fix-xerox-imaging-drum-codes-091-092-093-errors",
      content: `<h2>Fix Xerox Imaging Drum Codes (091, 092, 093 Errors)</h2>
<p>Xerox laser printers produce crisp text and vibrant images using complex internal parts. The imaging drum, transfer belt, and toner supply system work together closely. When one part fails, the printer stops and shows an error code. Xerox uses specific code families for these errors. The 091, 092, and 093 error series point to the xerographic subsystem. These codes mean the printer cannot form or transfer the image to the paper. This guide explains these three error families. We explain what each code means and how to fix the underlying hardware issues. You will learn how to get your Xerox printer running again.</p>

<h2>Why This Happens</h2>
<p>Each error code family points to a different stage of the printing process. Error codes in the 091 range indicate a problem with the imaging drum unit. The drum holds the electrostatic charge that attracts the toner. The printer tracks the drum's life using a smart chip and a page counter. A 091 error often means the drum has reached its end of life and needs replacement. A 091 error on a new drum means a bad electrical connection. The high-voltage bias charge cannot reach the drum cylinder.</p>
<p>Error codes in the 092 range are sensor-related. The printer lays down small patches of toner on the transfer belt during setup. It uses optical sensors to read their density and alignment. Paper dust or stray toner can cover these sensors. A damaged transfer belt can also cause this. The calibration process fails, and the printer throws a 092 error. Finally, 093 errors point to a toner supply problem. The internal toner auger might be jammed. The sub-hopper might be empty, or the waste toner auger might be clogged. High humidity makes toner clump together. This worsens dispensing and waste removal issues, leading to 093 alerts.</p>

<h2>Step-by-Step Fix</h2>
<ol>
  <li><strong>Identify the Specific Faulty Component:</strong> The error code includes a three-digit number (like 091-402) that specifies the exact color drum or sensor. Check your Xerox manual to translate the code. Numbers ending in 1 relate to Cyan, 2 to Magenta, 3 to Yellow, and 4 to Black. Identifying the exact part helps you avoid replacing good parts.</li>
  <li><strong>Power Cycle and Reseat the Components:</strong> Turn the printer off completely. Unplug it from the wall for two minutes. Open the front cover and remove the imaging drum cartridge related to the error. Inspect the electrical contacts on the cartridge and inside the printer. Wipe them gently with a dry, lint-free cloth. Reinstall the drum firmly until it clicks. Power the machine back on.</li>
  <li><strong>Clean the Optical Density Sensors:</strong> For a 092 error, you must clean the CTD (Color Toner Density) or ADC (Automatic Density Control) sensors. These sit under the transfer belt. Some models have a built-in cleaning rod you pull in and out. For others, open a hatch and wipe the glass sensors with a dry microfiber cloth. Do not use chemical cleaners here.</li>
  <li><strong>Check the Toner Dispense and Waste System:</strong> For 093 errors, remove the toner cartridge. Check the gear on the side that drives the internal auger. Make sure it spins freely. Tap the cartridge gently to loosen clumped toner. Check the waste toner bottle. The system will back up if it is full or clogged. Replace the waste bottle if needed. Vacuum loose toner with a toner-safe vacuum (never use a normal household vacuum).</li>
  <li><strong>Perform a Software Reset/NVM Initialization:</strong> If cleaning fails, the error might be stuck in the printer's Non-Volatile Memory (NVM). Enter diagnostic mode (hold '0' for 5 seconds, press Start, enter passcode '6789' or '1111'). This lets you reset specific NVM values for drum faults. Be very careful. Only change the specific NVM links for your exact model. Wrong changes can break the machine.</li>
</ol>

<h2>Advanced Troubleshooting</h2>
<p>Investigate the high-voltage power supply (HVPS) and internal drive motors if basic fixes fail. A persistent 091 error on a new drum means broken pins inside the machine. Shine a flashlight inside and check the pins connecting to the drum's smart chip. You might need a dental pick to realign them. If the pins are fine, the wiring harness might have a short. The HVPS board might fail to provide the needed voltage. You must test this with a multimeter and maybe replace the board.</p>
<p>For stubborn 092 errors, the intermediate transfer belt (ITB) might be torn or slipping. The color patches will misalign if the belt moves at uneven speeds. Inspect the ITB for physical damage or baked-on toner. Replacing the whole ITB assembly is often the only fix for severe 092 errors. For persistent 093 errors, the toner auger motor might be burned out. Run a component test in diagnostic mode to check the motor. If it fails, a certified technician must replace the main drive assembly or the motor.</p>

<h2>FAQ</h2>
<details>
  <summary>Can I bypass a 091 drum life error and keep printing?</summary>
  <p>Some older Xerox models let you bypass a drum warning in the diagnostic menu. We do not recommend this. The drum coating wears off over time. Using a bad drum causes gray pages and dropped text. Spilled toner can ruin the developer unit and transfer belt.</p>
</details>
<details>
  <summary>Why do I get a 092-310 error after installing a new toner cartridge?</summary>
  <p>Error 092-310 is a color calibration failure. A new toner cartridge can dump too much toner at first. This coats the sensors or transfer belt unevenly. Remove the transfer belt and clean the density sensors well. Use OEM Xerox toner, as third-party toners often fail calibration.</p>
</details>
<details>
  <summary>What should I do if my waste toner container is empty but I still get a 093 error?</summary>
  <p>If the printer reports a full waste bottle but it is empty, the sensor or chute is bad. The optical sensor might be dusty. Remove the waste container and use compressed air to clean the sensor lenses inside. Check that the spring-loaded trap door opens correctly when inserted.</p>
</details>
<details>
  <summary>Are 091, 092, and 093 errors covered under the Xerox maintenance agreement?</summary>
  <p>Yes, an active Xerox full-service maintenance agreement covers these issues. The contract usually includes drums and toner. A 091 code means you need to order a replacement part. However, repairs caused by third-party supplies or physical damage might cost extra. Contact your service provider to check.</p>
</details>`
    }
  ];
  
  await Promise.all(updates.map(u => processArticle(u.slug, u.content)));
}
main().catch(console.error).finally(() => prisma.$disconnect());
