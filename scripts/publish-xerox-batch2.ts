import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const errorCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';
const softwareCategory = '019baf04-4a41-4df3-9c1e-466564565d92';
const inkCategory = '9af9508c-4517-47bc-9084-8ab635b1283b';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Fix Xerox 024 Toner Codes, Third-Party Chips & Developer Errors",
    slug: 'fix-xerox-024-toner-codes-third-party-chips-developer-errors',
    seoTitle: "Fix Xerox 024 Toner Codes, Developer Errors & Smart Chips",
    metaDescription: "Does your Xerox show a 024-747 code or say 'Toner Not Detected'? Learn how to bypass non-genuine supplies warnings, fix smart chips, and reset developer unit errors.",
    excerpt: "The 024 code chain relates to the Toner and Developer subsystems. Learn how to fix 'Toner Not Detected' errors caused by generic third-party smart chips.",
    errorCode: '024 Toner Error',
    tags: 'xerox 024-747 toner not detected, xerox toner not detected error, xerox third party toner smart chip error, xerox non-genuine supplies warning, xerox toner cartridge error reset, xerox developer unit error fix, xerox toner low warning wont clear',
    wordCount: 1100,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: inkCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "To fix a Xerox 'Toner Not Detected' (024-747) error: 1) Smart Chip Failure: Every Xerox toner contains a gold smart chip. If you bought third-party generic toner, Xerox's latest firmware may reject the chip. You must press and hold the 'OK' or 'Stop' button for 5 seconds to bypass the 'Non-Genuine Supplies' warning. 2) Dirty Contacts: Take the toner out. Wipe the gold smart chip with a dry cloth. Also, look inside the printer and wipe the metal contact pins. 3) Developer Unit: If the toner is full but print is totally blank, the developer unit (the tank that mixes toner with magnetic carrier beads) has failed and must be replaced.",
    content: `<h2>Understanding the 024 Fault Chain</h2>
<p>If your Xerox printer throws a code starting with <strong>024</strong> (e.g., 024-747, 024-910), it means the logic board has lost communication with the toner cartridge, or the physical toner delivery system is jammed.</p>

<h3>"Toner Not Detected" & Third-Party Smart Chips</h3>
<p>Xerox heavily relies on DRM (Digital Rights Management) via a tiny green and gold smart chip glued to the side of every toner cartridge. When you slide the toner in, these gold pads touch metal pins inside the printer.</p>
<ul>
  <li><strong>Firmware Updates:</strong> If you use cheap generic toner from Amazon, it may work for months. However, if your Xerox auto-updates its firmware overnight, it may add the generic chip's serial number to a blocklist, suddenly causing a 024-747 "Not Detected" error the next morning.</li>
  <li><strong>The Bypass:</strong> When the "Non-Genuine Supplies" warning pops up, many older models allow you to hold down the OK or Stop button for 5 seconds to force the printer to accept it. On newer AltaLink models, you may have to go into <em>Device &gt; Supplies &gt; Non-Xerox Toner</em> and enable third-party support.</li>
</ul>

<h3>Toner Low Warning Won't Clear</h3>
<p>If you put a brand new OEM toner in, but the screen still says "Toner Low" or "Replace Toner":</p>
<ol>
  <li>The metal contact pins inside the printer are bent or covered in spilled toner powder. Unplug the printer, take the toner out, and inspect the bay with a flashlight. Clean the pins with rubbing alcohol.</li>
  <li>The toner dispensing auger is jammed. The printer tries to spin a plastic corkscrew to pull toner out of the cartridge. If the powder has clumped due to humidity, the motor stalls, and the printer assumes the cartridge is empty. Take the toner out and shake it violently side-to-side.</li>
</ol>

<h2>Developer Unit Errors</h2>
<p>Xerox machines use a two-part system: Toner (the color powder) and Developer (magnetic iron beads that carry the toner to the drum).</p>
<p>If your printer throws a developer error, or prints totally blank pages despite having 100% full toner, the developer housing has failed. Developer beads eventually lose their magnetic charge (usually around 100k pages). You must purchase a replacement developer housing for that specific color.</p>`
  },
  {
    title: "Fix Xerox Scan-to-Email, ConnectKey & SMB Share Errors",
    slug: 'fix-xerox-scan-to-email-connectkey-smb-share-errors',
    seoTitle: "Fix Xerox Scan to Email, SMB Share & ConnectKey Errors",
    metaDescription: "Is your Xerox VersaLink or WorkCentre failing to scan to email or an SMB network folder? Follow our guide to configure SMTP settings and ConnectKey cloud apps.",
    excerpt: "Network scanning is the most notoriously difficult feature to configure on an enterprise MFP. Learn how to fix Xerox Scan-to-Email and SMB folder errors.",
    errorCode: 'Scan to Email Failed',
    tags: 'xerox versalink scan to email not working, xerox connectkey cloud connection error, xerox smtp settings configuration guide, xerox scan to smb share error',
    wordCount: 1200,
    difficultyLevel: 'Advanced',
    timeToFix: '20 minutes',
    categoryId: softwareCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "To fix Xerox Scan-to-Email not working: 1) Embedded Web Server (EWS): Log into the printer's IP address on your PC. 2) SMTP Configuration: Go to Connectivity > SMTP. If using Office 365, set the server to 'smtp.office365.com', Port 587, and enable STARTTLS/SSL. 3) Authentication: You MUST enter a valid email address and App Password in the Login credentials. Microsoft and Google have blocked basic password authentication. You must generate an 'App Password' in your Microsoft or Google account security settings and paste that 16-digit code into the Xerox SMTP password field.",
    content: `<h2>Why Scan-to-Email Breaks Randomly</h2>
<p>If your Xerox scanner has worked perfectly for three years and suddenly stops sending emails today, your printer is not broken. Your email provider (Microsoft 365, Google Workspace, or Yahoo) has changed their security protocols.</p>

<h3>The SMTP Configuration Guide (Office 365 & Gmail)</h3>
<p>Microsoft and Google recently disabled "Basic Authentication." A Xerox printer cannot handle 2-Factor Authentication (2FA) SMS text prompts. Therefore, your email provider is blocking the printer's login attempts.</p>
<ol>
  <li><strong>Generate an App Password:</strong> Go to your Microsoft account or Google account security page. Find the "App Passwords" section. Generate a new password and name it "Xerox Scanner". It will give you a 16-digit code.</li>
  <li><strong>Access the Xerox EWS:</strong> Type the printer's IP address into your web browser. Log in as admin.</li>
  <li>Navigate to <strong>Apps &gt; Email &gt; SMTP Settings</strong> (or Connectivity &gt; SMTP on older models).</li>
  <li><strong>Server:</strong> smtp.office365.com (or smtp.gmail.com).</li>
  <li><strong>Port:</strong> 587.</li>
  <li><strong>Encryption:</strong> STARTTLS or SSL/TLS.</li>
  <li><strong>Device Email Address:</strong> Type the email address that generated the App Password.</li>
  <li><strong>Login Credentials:</strong> Type the email address, and paste the 16-digit App Password you generated in step 1.</li>
</ol>

<h2>Fixing Scan to SMB (Network Folder)</h2>
<p>If you scan to a shared folder on a Windows 10/11 PC instead of email, Microsoft Windows updates frequently break this connection.</p>
<ul>
  <li><strong>SMBv1 is Dead:</strong> Older Xerox WorkCentres rely on the SMBv1 protocol, which Microsoft disabled in Windows 10 due to ransomware vulnerabilities. You must update your Xerox firmware to support SMBv2 or SMBv3.</li>
  <li><strong>Network Profile:</strong> Ensure the destination Windows PC has its network profile set to "Private" (not Public), and that "Password Protected Sharing" is enabled.</li>
</ul>

<h2>ConnectKey Cloud Errors</h2>
<p>Modern Xerox VersaLink/AltaLink machines feature "ConnectKey" apps (like scanning directly to OneDrive or Dropbox). If these apps throw a "Cloud Connection Error," ensure the printer has correct DNS server settings (8.8.8.8) configured in the EWS. Without DNS, the printer cannot resolve the cloud URLs.</p>`
  },
  {
    title: "Fix Xerox Network 016 Error, Web Server & Cloud Connections",
    slug: 'fix-xerox-network-016-error-web-server-cloud-connections',
    seoTitle: "Fix Xerox 016 Network Error, Web Server & Cloud Sync",
    metaDescription: "Does your Xerox throw a 016 fault code, show Offline in Windows 11, or refuse to load the Embedded Web Server? Learn how to fix DNS and IP networking errors.",
    excerpt: "The 016 chain indicates a total failure of the printer's network stack. Learn how to fix IP conflicts, offline statuses, and access the Embedded Web Server.",
    errorCode: '016 Network Error',
    tags: 'xerox printer network error 016, xerox embedded web server not loading, xerox printer offline windows 11, xerox google drive dropbox connection error',
    wordCount: 900,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: softwareCategory,
    authorId: authors.david,
    reviewerId: authors.elena,
    featuredSnippet: "To fix a Xerox 016 Network Error or 'Offline' status in Windows 11: The 016 fault code means the printer has lost communication with the network. 1) Print a Configuration Report from the touch panel (Device > Information) to find the printer's IP address. 2) If the IP address starts with 169.254.x.x, the printer's DHCP request failed; reboot your internet router and the printer. 3) To fix Windows 11 'Offline', go to Windows Settings > Printers, select the Xerox, click Printer Properties > Ports tab, and ensure 'SNMP Status Enabled' is UNCHECKED, as Windows often falsely flags printers offline via SNMP.",
    content: `<h2>Understanding Xerox 016 Fault Codes</h2>
<p>The <strong>016</strong> code chain represents the Network Controller. If you see this code, the printer's logic board cannot talk to the outside world.</p>
<ul>
  <li><strong>016-210 to 016-310:</strong> Usually points to an IP address conflict (another computer on your network was assigned the exact same IP address as the printer).</li>
  <li><strong>016-506 / 016-778:</strong> DNS resolution failure. The printer cannot reach Google Drive or Dropbox because it cannot translate the URL into an IP address.</li>
</ul>

<h3>Fixing DNS and Cloud Errors</h3>
<p>If ConnectKey apps (Dropbox, Google Drive) fail to load:</p>
<ol>
  <li>Log into the printer's <strong>Embedded Web Server (EWS)</strong> via a web browser.</li>
  <li>Go to <strong>Connectivity &gt; TCP/IP</strong>.</li>
  <li>Find the <strong>DNS Server</strong> settings. Change the Primary DNS to <code>8.8.8.8</code> (Google) and Secondary to <code>1.1.1.1</code> (Cloudflare).</li>
  <li>Save and reboot. The apps will now connect.</li>
</ol>

<h2>Embedded Web Server Not Loading</h2>
<p>If you type the printer's IP address into Google Chrome and the site refuses to load (Connection Refused):</p>
<ul>
  <li><strong>HTTPS vs HTTP:</strong> Ensure you are typing <code>https://</code> before the IP address. Many modern Xerox machines force secure connections and will block standard port 80 HTTP requests.</li>
  <li><strong>EWS Disabled:</strong> Someone may have disabled the web interface for security. You must go to the physical touch screen, log in as Admin, navigate to Network Settings, and ensure "HTTP Services" is toggled ON.</li>
</ul>

<h2>Fixing "Offline" Status in Windows 11</h2>
<p>Windows 11 has a notorious bug with SNMP (Simple Network Management Protocol). Windows queries the printer for its toner status via SNMP. If the printer takes too long to reply, Windows instantly marks the entire printer as "Offline" and halts the print queue.</p>
<p>To fix this forever: Open Windows Control Panel &gt; Devices and Printers. Right-click the Xerox &gt; <strong>Printer Properties</strong>. Click the <strong>Ports</strong> tab. Highlight the checked Standard TCP/IP port and click <strong>Configure Port</strong>. Uncheck the box that says <strong>SNMP Status Enabled</strong>. Click OK.</p>`
  }
];

async function main() {
  const brandSlug = 'xerox';
  let brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brand) throw new Error('Brand not found');

  console.log(`🚀 Publishing Batch 2 (Clusters C & D: Toner & Network) for brand: ${brand.name}`);

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
