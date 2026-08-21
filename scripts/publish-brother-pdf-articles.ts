import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const brotherBrandId = '932bf0f5-0256-4fb6-ad10-3098241e0ec1';
const connectivityCategory = 'c3a92d93-fcbb-439c-a11e-80cde3d2a5ce';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "How to Print a Brother Network Configuration Page",
    slug: 'brother-printer-network-configuration-page-how-to-print',
    seoTitle: "How to Print a Brother Network Configuration Page",
    metaDescription: "Need to print your Brother printer's network configuration page? A repair tech shows the exact steps and what each key detail actually tells you.",
    excerpt: "Nearly every piece of network troubleshooting advice for a Brother printer eventually asks for the same thing: your printer's network configuration page.",
    errorCode: null,
    tags: 'Brother, Network Configuration Page, IP Address, MAC Address, Setup',
    wordCount: 570,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: connectivityCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "To print a Brother network configuration page: On models with a display, navigate to Settings > All Settings > Print Reports > Network Configuration, and select print. On button-only models, check your quick reference guide for a specific sequence (often holding the Go or Menu button). This page will list the printer's IP address, MAC Address, and Wireless status.",
    content: `<p>Nearly every piece of network troubleshooting advice for a Brother printer eventually asks for the same thing: your printer's network configuration page. It's the single most useful diagnostic printout your machine can produce, and it takes about ten seconds once you know where the option lives.</p>

<h2>What This Page Actually Shows You</h2>
<p>A network configuration page is a printout generated directly by the printer itself, listing its current network status in detail — IP address, MAC (Ethernet) address, wireless network name it's connected to (if any), signal status, and several other technical details that live nowhere else in the printer's normal display.</p>
<p><strong>Why this matters:</strong> whether you're troubleshooting a wireless connection, checking for a MAC address filtering issue, confirming the printer's current IP address for manual setup, or working with Brother support, this page is almost always the first thing you'll be asked to check or provide.</p>

<h2>How to Print It</h2>
<p><strong>On models with a menu display:</strong> navigate to <strong>Settings &rarr; All Settings &rarr; Print Reports &rarr; Network Configuration</strong> (menu wording and exact path can vary slightly by model), and select print.</p>
<p><strong>On button-only models without a display:</strong> the specific button combination varies by model — commonly a held combination involving the <strong>Go</strong> or <strong>Menu</strong> button, sometimes paired with a specific number of presses. Check your exact model's quick reference guide for the precise sequence, since this differs meaningfully across Brother's product lines.</p>
<p><strong>Why this works:</strong> either method triggers the printer's internal system to generate and print its own current network status report immediately, independent of any computer or app.</p>

<h2>What to Look For Once You Have It</h2>
<ul>
  <li><strong>MAC Address (or Node Name):</strong> the unique hardware identifier you'd need if setting up MAC address filtering on your router.</li>
  <li><strong>IP Address:</strong> the printer's current network address, useful for manual printer setup on a computer or for confirming whether it's successfully joined your network at all (an address starting with 169.254 typically indicates it hasn't obtained a proper address from your router).</li>
  <li><strong>Wireless status/SSID:</strong> confirms which network name the printer currently believes it's connected to, useful for catching a printer that's connected to the wrong network entirely, such as an old network name that hasn't been updated.</li>
  <li><strong>Signal strength/quality:</strong> gives you a general sense of connection strength, useful context if you're troubleshooting intermittent drops rather than a complete failure to connect.</li>
</ul>
<p><strong>Why this matters:</strong> having this specific information in hand before troubleshooting further — or before contacting Brother support — considerably speeds up diagnosing what's actually happening, rather than working from guesses about the printer's current network state.</p>

<h2>When to Call a Professional</h2>
<p>This page itself doesn't require any professional involvement to obtain, but if it reveals something you're unsure how to interpret — an unexpected IP address range, a signal quality reading that seems consistently poor, or a MAC address you need help correctly entering into router settings — bringing this printout to Brother support or whoever manages your network gives them exactly the detail they need to help quickly.</p>`,
    faqs: JSON.stringify([
      { question: 'Do I need a computer connected to print this page?', answer: 'No — it\'s generated entirely by the printer itself, independent of any computer, network, or app. You can print it even while troubleshooting a printer with no working network connection at all.', order: 1 },
      { question: 'Why does my printer\'s IP address start with 169.254?', answer: 'This specific range indicates the printer assigned itself a fallback address because it couldn\'t obtain a proper one from your router, which usually points toward a connection that hasn\'t fully succeeded yet.', order: 2 },
      { question: 'How is this different from checking network settings on the printer\'s own screen?', answer: 'The configuration page is more comprehensive, showing details like MAC address and signal quality that aren\'t always visible in the printer\'s regular on-screen menus, and it gives you something physical to reference or hand to support.', order: 3 }
    ])
  },
  {
    title: "Brother Printer WPS Button Not Connecting? [Fixed]",
    slug: 'brother-printer-wps-button-not-connecting',
    seoTitle: "Fix Brother Printer WPS Button Not Connecting",
    metaDescription: "Brother printer WPS button not connecting to your router? A repair tech explains the timing window most people miss, and when to skip WPS entirely.",
    excerpt: "WPS is supposed to be the easy option, but when it fails, the issue usually comes down to timing or router-side support. Here's how to fix it.",
    errorCode: 'TS-08',
    tags: 'Brother, WPS, Not Connecting, Wi-Fi Protected Setup, Router',
    wordCount: 580,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: connectivityCategory,
    authorId: authors.alex,
    reviewerId: authors.david,
    featuredSnippet: "If your Brother printer WPS button is not connecting: 1) Press the WPS button on your router first. 2) Within the 2-minute active window, trigger the WPS function on your printer's control panel (Network > WLAN > WPS/AOSS). 3) If it still fails, check for nearby overlapping WPS sessions (Error TS-08), or skip WPS and set up the connection manually via your Wi-Fi password.",
    content: `<p>WPS is supposed to be the easy option — press one button on the router, one on the printer, done. When it doesn't work, the frustration is real, because there's no password to double-check and no obvious setting to blame. Almost always, the actual issue comes down to timing or router-side support, not anything you're doing wrong.</p>

<h2>How WPS Is Supposed to Work</h2>
<p>WPS (Wi-Fi Protected Setup), sometimes labeled AOSS on certain routers, is a one-touch pairing method: you press a physical WPS button on your router, then trigger the corresponding function on your printer within a short window, and the two devices exchange connection details automatically without you typing a password at all.</p>

<h2>Fix 1: Press the Router Button First, Printer Second, Within the Window</h2>
<p>Press the WPS button on your router first. Most routers keep WPS mode active for only about two minutes after pressing it. Within that window, trigger WPS on the printer — through its control panel's network menu (<strong>Network &rarr; WLAN &rarr; WPS/AOSS</strong>) or a dedicated button, depending on your model.</p>
<p><strong>Why this works:</strong> this timing window is the single most common reason WPS fails — people press the router's button, get distracted navigating the printer's menu, and miss the active window entirely. Doing this deliberately, with the printer's WPS option already navigated to and ready before you press the router button, gives you the best chance of success.</p>

<h2>Fix 2: Confirm Your Router Actually Supports WPS</h2>
<p>Check your router's specifications or admin settings to confirm it genuinely has WPS functionality. Not every router does, and some ISP-provided routers disable WPS by default for security reasons even if the hardware technically supports it.</p>
<p><strong>Why this works:</strong> if WPS isn't active or available on the router's side at all, no amount of correctly timed button presses on the printer will succeed, since there's nothing for it to connect to.</p>

<h2>Fix 3: Check for Multiple Active WPS Sessions Nearby</h2>
<p>If you're in an apartment, office, or any location with several nearby networks, another router's WPS session might be active at the same moment, causing your printer to detect more than one and fail to connect to either (this specifically produces error <strong>TS-08</strong> on display models). Wait a few minutes and try again.</p>
<p><strong>Why this works:</strong> this rules out interference from nearby networks rather than anything wrong with your own setup, and simply retrying after the overlapping window closes often resolves it without changing anything.</p>

<h2>Fix 4: Skip WPS and Connect Manually Instead</h2>
<p>If WPS continues to fail after confirming timing, router support, and ruling out nearby interference, set up the wireless connection manually — selecting your network by name and entering the password directly through the printer's control panel or the Brother iPrint&amp;Scan app.</p>
<p><strong>Why this works:</strong> manual setup doesn't depend on WPS working at all, and it's every bit as secure. For some router and printer combinations, manual entry is simply more reliable than troubleshooting WPS further.</p>

<h2>When to Call a Professional</h2>
<p>If manual setup also fails to connect your printer to the network, that points toward a different underlying wireless issue beyond WPS specifically, worth troubleshooting separately (check for TS-series error codes if your model has a display) rather than continuing to focus on the WPS button itself.</p>`,
    faqs: JSON.stringify([
      { question: 'Why does WPS work sometimes and not others on the same router?', answer: 'Timing is the most common variable — the active window after pressing the router\'s button is short, and missing it produces an inconsistent, seemingly random failure pattern that\'s really just a matter of seconds.', order: 1 },
      { question: 'Is manual Wi-Fi setup harder than WPS?', answer: 'Not meaningfully — you\'re just selecting your network name and typing your password, the same as setting up a phone or laptop on Wi-Fi. It\'s a reliable fallback when WPS itself is being uncooperative.', order: 2 },
      { question: 'Does my router definitely support WPS if it has a WPS button?', answer: 'Almost certainly, though some ISP routers ship with WPS disabled by default even with the button present. Check your router\'s admin settings to confirm it\'s actually active.', order: 3 }
    ])
  },
  {
    title: "Brother Printer Blocked by Router MAC Filtering? Fix",
    slug: 'brother-printer-mac-address-filter-router',
    seoTitle: "Fix Brother Printer Blocked by Router MAC Filtering",
    metaDescription: "Brother printer being blocked by your router's MAC address filter? A repair tech explains exactly how to find and allow it in minutes.",
    excerpt: "If your router's MAC filtering is enabled, your Brother printer simply won't connect. Here is how to find your printer's MAC address and allow it.",
    errorCode: null,
    tags: 'Brother, MAC Filtering, Blocked, Router, Connection Issue',
    wordCount: 590,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: connectivityCategory,
    authorId: authors.elena,
    reviewerId: authors.marcus,
    featuredSnippet: "To unblock a Brother printer from MAC filtering: 1) Print a Network Configuration page from the printer to locate its MAC Address (Node Name). 2) Log into your router's admin settings (e.g., 192.168.1.1). 3) Locate the MAC filtering or Access Control section. 4) Add the printer's MAC address to the 'Allow' list. 5) Save settings and reconnect the printer.",
    content: `<p>This is a genuinely easy cause to overlook, because there's nothing wrong with your printer, your Wi-Fi password, or your signal strength at all. Your router itself has a list of specifically approved devices, and your Brother printer simply isn't on it.</p>

<h2>What MAC Address Filtering Actually Does</h2>
<p>Every network device — your printer included — has a unique hardware identifier called a MAC address, permanently assigned to its network hardware. Some routers offer a security feature that restricts network access to only devices whose MAC address appears on an approved list, rejecting everything else automatically, regardless of whether the correct Wi-Fi password was entered.</p>
<p><strong>Why this matters:</strong> if this feature is enabled on your router and your printer's MAC address was never added, the printer will fail to connect no matter how correctly everything else is configured — producing symptoms that look identical to a range or detection problem, with no obvious clue pointing toward the filter as the actual cause.</p>

<h2>Fix 1: Find Your Printer's MAC Address</h2>
<p>Print a <strong>Network Configuration page</strong> from your printer (commonly accessed through a menu option, or on button-only models via a specific button combination — check your model's manual for the exact steps). This page lists the printer's MAC address (sometimes labeled "Node Name" or "Ethernet Address") clearly.</p>
<p><strong>Why this works:</strong> you need this exact address before you can add it to your router's allowed list, and the printer's own configuration page is the most reliable source for it.</p>

<h2>Fix 2: Log Into Your Router's Settings</h2>
<p>Open a browser and enter your router's IP address (commonly something like <code>192.168.1.1</code> or <code>192.168.0.1</code>, though this varies by manufacturer) to reach its admin login page.</p>
<p><strong>Why this works:</strong> MAC filtering is configured entirely on the router's side, so this is where the actual fix happens — nothing on the printer itself can override a router-side filter.</p>

<h2>Fix 3: Add Your Printer's MAC Address to the Allowed List</h2>
<p>Find the MAC filtering section (commonly under wireless security or access control settings), and add your printer's MAC address to the allowed list, exactly as printed on the configuration page.</p>
<p><strong>Why this works:</strong> this explicitly grants your printer permission to join the network, resolving the block directly at its source rather than working around it.</p>

<h2>Fix 4: Confirm the Filter Setting Is Set to "Allow," Not "Deny"</h2>
<p>Check whether your router's MAC filtering is configured as an allow-list (only listed devices can connect) or a deny-list (only listed devices are blocked). Make sure you're adding your printer to the correct list for how your specific router is configured.</p>
<p><strong>Why this works:</strong> adding your printer's address to the wrong type of list — a deny-list, for instance — would actually make the problem worse rather than better, so confirming which mode your router uses before making changes matters.</p>

<h2>When to Call a Professional</h2>
<p>If you've added your printer's MAC address to your router's allowed list correctly and the printer still can't connect, MAC filtering likely isn't your actual cause, and it's worth revisiting other TS-02-related troubleshooting — distance, obstruction, or a router that's genuinely not broadcasting properly. If you're not comfortable accessing your router's admin settings at all, whoever manages your network or your internet provider's support line can typically walk you through this specific step.</p>`,
    faqs: JSON.stringify([
      { question: 'How do I know if MAC filtering is even enabled on my router?', answer: 'Log into your router\'s admin settings and look under wireless security or access control options. If you don\'t see any MAC filtering section at all, your router likely doesn\'t have this feature, or it isn\'t currently active.', order: 1 },
      { question: 'Will adding my printer\'s MAC address affect any other devices?', answer: 'No — you\'re only adding your printer\'s specific address to the list. Other devices already connected or already on the allowed list are unaffected.', order: 2 },
      { question: 'Where exactly do I find my printer\'s MAC address?', answer: 'Print a Network Configuration page from the printer itself, usually available through a menu or a specific button combination depending on your model. It\'s listed clearly on that printout.', order: 3 }
    ])
  },
  {
    title: "Brother Printer Won't Connect to Your WLAN Access Point? Fix",
    slug: 'brother-printer-wont-connect-to-wlan-access-point',
    seoTitle: "Fix Brother Printer Won't Connect to WLAN Access Point",
    metaDescription: "Brother printer won't connect to your WLAN access point, with no error code shown at all? A repair tech covers troubleshooting for LED-only models.",
    excerpt: "If your Brother printer has no text screen, you won't see specific error codes when WLAN connection fails. Learn how to diagnose based on LED light behavior.",
    errorCode: null,
    tags: 'Brother, WLAN, Access Point, LED, Wont Connect, Wireless',
    wordCount: 600,
    difficultyLevel: 'Beginner',
    timeToFix: '10 minutes',
    categoryId: connectivityCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "To fix an LED-only Brother printer that won't connect to WLAN: 1) Check the wireless light: off means radio is disabled, blinking means attempting to connect, solid is connected. 2) Hold the GO button for 10 seconds to activate the wireless radio if off. 3) Move the printer closer to the router. 4) Use the Brother iPrint&Scan app on your phone for a guided setup instead of relying on the printer's buttons.",
    content: `<p>If your Brother printer has no text screen, only a wireless status light, you won't see anything like "TS-02" when a connection fails — just a light that stays off, blinks in a pattern, or simply never turns solid. This guide covers exactly that situation, working from light behavior rather than an on-screen code.</p>

<h2>Why This Is Different From Code-Based Troubleshooting</h2>
<p>Brother's TS-series error codes appear on models with an LCD or similar display, giving you a specific number to search for. Simpler, button-and-LED-only models — common on entry-level HL laser printers — can't display that same information. You're working from the wireless light's behavior instead, which is less specific but still tells you something useful.</p>

<h2>Fix 1: Check What the Light Is Actually Doing</h2>
<p>A wireless light that's <strong>completely off</strong> generally means the wireless radio isn't active yet. A light that's <strong>blinking</strong> during setup generally means the printer is actively attempting to connect. A light that <strong>stays solid</strong> means a successful connection. If your light is blinking and never settles to solid, the printer is trying and failing repeatedly, which points toward the same underlying causes as TS-02 on display models — the printer can't detect or complete a connection to your access point.</p>
<p><strong>Why this matters:</strong> even without a specific code, this pattern tells you whether you're dealing with a radio-activation issue (light never comes on at all) or a detection/connection issue (light blinks but never completes), which changes where you focus next.</p>

<h2>Fix 2: Activate the Wireless Setting</h2>
<p>On most button-only models, hold down the <strong>GO</strong> button for about 10 seconds to activate the wireless setting, releasing when the printer prints a Network Configuration page. If an Ethernet cable is connected, disconnect it first, since some models won't activate wireless while wired.</p>
<p><strong>Why this works:</strong> this addresses the light-never-comes-on scenario directly, activating the radio hardware itself before any actual network detection can even begin.</p>

<h2>Fix 3: Move the Printer Close to the Router for Setup</h2>
<p>Temporarily position the printer within about a meter of your router while running setup, even if this isn't its permanent location.</p>
<p><strong>Why this works:</strong> a strong, close signal removes distance and obstruction as variables during the sensitive initial connection process, giving the printer its best chance to complete a handshake it might fail from farther away.</p>

<h2>Fix 4: Confirm the Router Is On and Check MAC Filtering</h2>
<p>Verify your router is powered on and working with another device, and check whether MAC address filtering is enabled and might be blocking your printer specifically.</p>
<p><strong>Why this works:</strong> these are the same underlying causes behind the TS-02 code on display models — a light-only printer is experiencing the identical failure, it just can't tell you the specific number.</p>

<h2>Fix 5: Use the Brother iPrint&amp;Scan App for Setup</h2>
<p>Rather than relying entirely on button presses and light-watching, try running wireless setup through the <strong>Brother iPrint&amp;Scan</strong> app on your phone, which can guide the process with clearer feedback than button-only hardware provides on its own.</p>
<p><strong>Why this works:</strong> the app gives you a considerably more informative setup experience than a single status light can, even on a printer that has no display of its own.</p>

<h2>When to Call a Professional</h2>
<p>If the wireless light activates and blinks correctly during setup attempts, the router is confirmed working, distance and MAC filtering have been ruled out, and the light still never settles to solid, contact Brother support with your exact model — a genuine wireless hardware fault becomes the more likely explanation at that point.</p>`,
    faqs: JSON.stringify([
      { question: 'How do I know if my Brother printer has a display or is LED-only?', answer: 'Check whether your control panel has any text screen at all, even a small one. Entry-level HL laser models commonly rely on lights and buttons only, without any display.', order: 1 },
      { question: 'Can I still see a specific error code on an LED-only printer?', answer: 'Not directly on the printer itself, but printing a Network Configuration page (usually via a button combination like holding GO) can sometimes reveal more detail about the last connection attempt.', order: 2 },
      { question: 'Is the Brother iPrint&Scan app worth using even without a printer display?', answer: 'Yes — it can guide wireless setup with considerably clearer feedback than a single status light provides, making it a genuinely useful tool specifically for LED-only models.', order: 3 }
    ])
  },
  {
    title: "Brother Printer Can't See Your Wi-Fi? Check the Band",
    slug: 'brother-printer-ts-02-5ghz-vs-2.4ghz',
    seoTitle: "Brother Printer Can't See Wi-Fi: TS-02 2.4GHz vs 5GHz Fix",
    metaDescription: "Brother printer TS-02 error, and your network doesn't even show in the list? A repair tech explains the 2.4GHz-only limitation many models have.",
    excerpt: "Many Brother printers only support the 2.4GHz Wi-Fi band. If your router is broadcasting exclusively on 5GHz, the printer physically cannot detect your network.",
    errorCode: 'TS-02',
    tags: 'Brother, Wi-Fi Band, 2.4GHz, 5GHz, Not Seeing Network, TS-02',
    wordCount: 610,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: connectivityCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "To fix a Brother printer that can't see your Wi-Fi: 1) Many entry-level Brother printers only support the 2.4GHz band. 2) If your router combines 2.4GHz and 5GHz under one name (Band Steering), log into your router settings and temporarily disable band steering. 3) Select the 2.4GHz network name specifically during the printer setup. 4) Once connected, you can usually re-enable band steering.",
    content: `<p>If you've already worked through the general TS-02 checklist — router's on, printer's close, no obstruction — and your network still doesn't show up in the printer's list of available networks at all, there's a specific hardware limitation worth checking before anything else: <strong>a real share of Brother printers only support the 2.4GHz Wi-Fi band, and can't see a 5GHz-only network no matter how strong the signal is.</strong></p>

<h2>Why This Happens</h2>
<p>Most home routers today broadcast on two separate bands — 2.4GHz and 5GHz — sometimes under the same network name, sometimes as two visibly different names. 5GHz offers faster speeds but shorter range; 2.4GHz reaches farther and penetrates walls better. <strong>Many Brother printers, particularly entry-level and older models, only have hardware capable of detecting and joining the 2.4GHz band.</strong> If your router is broadcasting your main network exclusively on 5GHz, or if you've set your printer's default network to a 5GHz-only broadcast, the printer isn't failing to connect — it genuinely cannot see that network exists at all.</p>
<p><strong>Why this matters:</strong> this isn't a settings problem or a range problem. No amount of moving the printer closer or removing obstructions fixes a band the printer's hardware was never built to detect.</p>

<h2>How to Check if This Is Your Situation</h2>
<p>On your phone or computer, look at your list of available Wi-Fi networks. If your router broadcasts two separate names — often something like "HomeNetwork" and "HomeNetwork-5G" — that's a strong sign you have distinct bands available separately. If you only see one combined network name, your router may be using "band steering," automatically assigning devices to whichever band it decides is best, which can sometimes push your printer toward 5GHz without your explicit choice.</p>

<h2>Fix 1: Connect to the 2.4GHz Network Specifically</h2>
<p>If your router broadcasts separate network names for each band, select the 2.4GHz one specifically during printer setup, even if your other devices default to the 5GHz option.</p>
<p><strong>Why this works:</strong> this directly gives the printer a network its hardware can actually detect and join, sidestepping the band limitation entirely rather than fighting it.</p>

<h2>Fix 2: Temporarily Disable Band Steering</h2>
<p>If your router combines both bands under one name using band steering, log into your router's settings and look for an option to disable this feature, or to separate the bands into two distinct network names, at least temporarily during printer setup.</p>
<p><strong>Why this works:</strong> band steering can prevent a 2.4GHz-only device from cleanly selecting the band it needs, since the router is making that choice on the device's behalf. Splitting the bands into separate names gives you direct, explicit control during setup.</p>

<h2>Fix 3: Confirm Your Exact Model's Band Support</h2>
<p>Check your specific printer model's specification sheet on Brother's support site to confirm definitively whether it supports 2.4GHz only, or both bands.</p>
<p><strong>Why this works:</strong> this removes any guesswork. If your model is confirmed 2.4GHz-only, you know with certainty that connecting to a 5GHz-only network was never going to work, and you can stop troubleshooting range or obstruction entirely and focus on band selection instead.</p>

<h2>When to Call a Professional</h2>
<p>If you've confirmed your printer supports 2.4GHz, connected specifically to that band (disabling band steering if needed), and the network still doesn't appear at all, this points toward a genuine wireless hardware issue rather than a band mismatch, worth contacting Brother support about directly.</p>`,
    faqs: JSON.stringify([
      { question: 'How do I know if my Brother printer only supports 2.4GHz?', answer: 'Check your exact model\'s specification sheet on Brother\'s official support site — band support is listed clearly there, and it varies by model, so don\'t assume based on a different printer you\'ve owned.', order: 1 },
      { question: 'Why would my router hide the 2.4GHz network from me?', answer: 'Some routers use "band steering" to combine both bands under one network name, automatically choosing which band each device connects to. This can be disabled or split into separate names in your router\'s settings if it\'s interfering with printer setup.', order: 2 },
      { question: 'Does this mean I need to buy a new printer?', answer: 'Not necessarily — if your router can broadcast 2.4GHz separately (most can), connecting to that band specifically resolves this completely without needing new hardware.', order: 3 }
    ])
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
          faqs: article.faqs,
          status: 'published',
          publishedAt: new Date(),
          brandId: brotherBrandId,
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
