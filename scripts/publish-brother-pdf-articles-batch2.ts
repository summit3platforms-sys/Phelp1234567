import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const brotherBrandId = '932bf0f5-0256-4fb6-ad10-3098241e0ec1';
const errorCodesCategory = '9fb9d26b-661e-4284-a4a7-d86d38e853df';

const authors = {
  alex: '88e8d061-e1be-406d-8fa1-a53f108cc624',
  marcus: 'fba87e7e-2ed7-465e-bab3-875aaaecbf81',
  elena: '88de9646-6fd4-4e5d-817c-a8a1c0230866',
  david: '1feb6d39-93c0-406c-818c-40dd1428aca6'
};

const articles = [
  {
    title: "Brother Printer Error TS-08? Too Many Routers at Once",
    slug: 'brother-printer-error-ts-08',
    seoTitle: "Brother Printer Error TS-08: WPS Multiple Routers Fix",
    metaDescription: "Brother printer error TS-08? A repair tech explains why this happens with WPS and the simple timing fix that clears it.",
    excerpt: "TS-08 means the printer detected two or more wireless access points with WPS actively enabled at the same time. Here is how to fix it.",
    errorCode: 'TS-08',
    tags: 'Brother, TS-08, WPS, Multiple Routers, Connection Issue',
    wordCount: 560,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: errorCodesCategory,
    authorId: authors.elena,
    reviewerId: authors.david,
    featuredSnippet: "To fix Brother printer error TS-08: 1) Wait two to five minutes for any nearby router's WPS window to close, then start the setup process fresh. 2) Ensure you haven't accidentally activated WPS on a secondary mesh node or extender in your own home. 3) If TS-08 keeps recurring in a dense apartment building, skip WPS entirely and enter your Wi-Fi password manually.",
    content: `<p>TS-08 is one of the more specific, almost funny wireless errors Brother uses: your printer isn't confused about your network at all. It's confused because it's picking up <strong>too many networks trying to talk to it at once</strong>.</p>

<h2>What TS-08 Actually Means</h2>
<p>This error appears specifically during <strong>WPS</strong> (Wi-Fi Protected Setup) or AOSS setup — the one-touch connection method where you press a button on your router and a corresponding button or menu option on the printer to pair them automatically without typing a password. TS-08 means the printer detected <strong>two or more wireless access points with WPS actively enabled at the same time</strong>, and it can't tell which one you actually want to connect to.</p>
<p><strong>Why this matters:</strong> this usually happens in denser environments — apartment buildings, offices, or homes with a mesh Wi-Fi system where multiple nodes or nearby neighbors' routers all have WPS active simultaneously, creating genuine ambiguity for the printer.</p>

<h2>Fix 1: Confirm Only Your Router Has WPS Active</h2>
<p>Check that you (or whoever might have pressed a WPS button recently) haven't accidentally left WPS mode active on more than one device — including any secondary router, mesh node, or extender you own.</p>
<p><strong>Why this works:</strong> if your own network setup includes multiple access points, more than one might have WPS mode currently triggered, which alone can produce this error without any neighboring network being involved at all.</p>

<h2>Fix 2: Try Again After a Few Minutes</h2>
<p>WPS mode on most routers only stays active for a short window — typically two to five minutes — after you press the button. Wait a few minutes to let any nearby network's WPS window close, then start the process fresh on your printer and router together.</p>
<p><strong>Why this works:</strong> this is Brother's own recommended approach, and it directly addresses the actual cause — you're not fixing a setting, you're simply waiting for a temporary overlap in active WPS sessions to clear on its own.</p>

<h2>Fix 3: Skip WPS and Enter the Password Manually</h2>
<p>If TS-08 keeps recurring, particularly in an apartment or office with many nearby networks, skip the WPS method entirely and set up the wireless connection manually instead — selecting your network by name and entering the password directly, either through the printer's control panel or the Brother iPrint&amp;Scan app.</p>
<p><strong>Why this works:</strong> manual setup doesn't depend on WPS detection at all, sidestepping the entire category of problem TS-08 describes. In a dense wireless environment where multiple WPS sessions are a recurring nuisance, this is often simply the more reliable setup method going forward.</p>

<h2>When to Call a Professional</h2>
<p>TS-08 rarely points to anything wrong with your printer or router — it's almost always a timing or environmental overlap. If manual setup (Fix 3) also fails to connect your printer to your network, that points toward a different underlying issue worth troubleshooting separately, rather than continuing to fight WPS in a crowded wireless environment.</p>`,
    faqs: JSON.stringify([
      { question: 'Does TS-08 mean someone is trying to hack my network?', answer: 'No — it simply means the printer detected multiple active WPS sessions nearby at the same moment, which is common in apartment buildings or offices with many networks in range. It\'s not a security concern.', order: 1 },
      { question: 'Why does this happen more in apartments or offices?', answer: 'Because WPS broadcasts are detectable by any nearby printer or device attempting the same setup method, and in dense environments, it\'s genuinely common for more than one router\'s WPS window to be active at the same time by coincidence.', order: 2 },
      { question: 'Is manual setup less secure than WPS?', answer: 'No — manual setup using your actual Wi-Fi password is equally secure, and in many cases simpler to get right the first time in an environment where WPS conflicts are a recurring problem.', order: 3 }
    ])
  },
  {
    title: "Brother Printer Error TS-07? Check Your Password First",
    slug: 'brother-printer-error-ts-07',
    seoTitle: "Fix Brother Printer Error TS-07: Incorrect Password",
    metaDescription: "Brother printer error TS-07? A repair tech explains why this means your Wi-Fi password is wrong, and the hyphen mistake that trips people up.",
    excerpt: "TS-07 means your printer found your network, but the network key you entered was incorrect. Learn how to verify and re-enter your Wi-Fi password accurately.",
    errorCode: 'TS-07',
    tags: 'Brother, TS-07, Incorrect Password, Network Key, Wi-Fi',
    wordCount: 570,
    difficultyLevel: 'Beginner',
    timeToFix: '5 minutes',
    categoryId: errorCodesCategory,
    authorId: authors.marcus,
    reviewerId: authors.alex,
    featuredSnippet: "To fix Brother printer error TS-07 (Incorrect Password): 1) Verify you are using the actual Wi-Fi network key, not the router's admin login password. 2) Watch for case-sensitivity, hyphens, and special characters. 3) Log into your router to check the current password, as it may have been changed recently. 4) Use the Brother iPrint&Scan app to enter the password via your phone's full keyboard.",
    content: `<p>TS-07 is refreshingly specific once you know what it means: your printer found your network and attempted to connect, and the <strong>network key you entered was incorrect</strong>. No detection issue, no security mismatch — just a password that didn't match.</p>

<h2>What TS-07 Actually Means</h2>
<p>Your printer successfully detected your router and tried to authenticate using the Wi-Fi password (network key) you entered during setup, and that password didn't work. This is usually a straightforward typing issue, but there's a specific, common source of confusion worth knowing about before you assume you're typing your real password correctly.</p>

<h2>Fix 1: Confirm You're Using the Right Password</h2>
<p>Many routers display two different pieces of information on their label or in their settings — a general "network password" and a separate Wi-Fi-specific password that can differ from it. Confirm you're entering the actual <strong>Wi-Fi network key</strong>, not an admin login password or a different credential entirely.</p>
<p><strong>Why this works:</strong> it's a genuinely common mix-up, especially on routers provided by internet service providers that print multiple different credentials on the same label, and entering the wrong one produces exactly this "incorrect network key" result even though you typed something correctly.</p>

<h2>Fix 2: Watch for Hyphens and Special Characters</h2>
<p>If your Wi-Fi password includes hyphens, symbols, or a mix of characters that are easy to mistype, enter it carefully and deliberately, checking character by character rather than typing quickly from memory. Case matters too — many passwords are case-sensitive.</p>
<p><strong>Why this works:</strong> this specific confusion comes up often enough to be worth calling out directly — some router-provided passwords include hyphens as separators that are easy to miss or mistype, especially when entering a long, unfamiliar string of characters on a printer's small control panel rather than a full keyboard.</p>

<h2>Fix 3: Re-Check the Password Directly From the Router</h2>
<p>Rather than relying on a password you have written down or remembered, log into your router's admin page or check its physical label directly, and copy the current password exactly as shown.</p>
<p><strong>Why this works:</strong> passwords sometimes get changed — by an internet provider during a service visit, by another household member, or during a router replacement — and a password that worked previously may simply no longer be current. Checking the source directly removes any doubt.</p>

<h2>Fix 4: Try Entering the Password via Brother iPrint&amp;Scan</h2>
<p>If your printer's control panel makes entering a long or complex password error-prone, try running wireless setup through the <strong>Brother iPrint&amp;Scan</strong> app on your phone or computer instead, where a full keyboard makes accurate entry considerably easier.</p>
<p><strong>Why this works:</strong> small printer control panels, especially button-based navigation without a full keyboard, are a common source of entry mistakes on long passwords. A proper keyboard removes that friction entirely.</p>

<h2>When to Call a Professional</h2>
<p>If you've confirmed the exact current password directly from the router and entered it carefully through both the control panel and the app, and TS-07 still appears consistently, this is worth checking with Brother support, since it may point toward a deeper wireless authentication issue beyond a simple password mismatch.</p>`,
    faqs: JSON.stringify([
      { question: 'Does TS-07 mean something is wrong with my router?', answer: 'No — it specifically means the password entered on the printer didn\'t match what your router expects. The router and network detection itself already worked correctly at this point.', order: 1 },
      { question: 'Why would my Wi-Fi password have hyphens in it?', answer: 'Many router-generated default passwords include hyphens or dashes as visual separators for readability. They\'re part of the actual password and need to be entered exactly as shown.', order: 2 },
      { question: 'Is it easier to enter my password through an app instead of the printer\'s screen?', answer: 'Often, yes — Brother iPrint&Scan gives you a proper keyboard for entry, which reduces the mistyping that\'s common on a printer\'s small control panel, especially for long or complex passwords.', order: 3 }
    ])
  },
  {
    title: "Brother Printer Error TS-04? The WPA3 Problem",
    slug: 'brother-printer-error-ts-04',
    seoTitle: "Fix Brother Printer Error TS-04: WPA3 Security Mismatch",
    metaDescription: "Brother printer error TS-04? A repair tech explains the WPA3 security mismatch behind this code and how to fix it on your router.",
    excerpt: "TS-04 indicates a wireless security type mismatch. Many newer routers use WPA3, while older Brother printers only support WPA2. Here is the fix.",
    errorCode: 'TS-04',
    tags: 'Brother, TS-04, WPA3, WPA2, Security, Router Settings',
    wordCount: 530,
    difficultyLevel: 'Intermediate',
    timeToFix: '10 minutes',
    categoryId: errorCodesCategory,
    authorId: authors.alex,
    reviewerId: authors.marcus,
    featuredSnippet: "To fix Brother printer error TS-04: 1) Log into your router's admin settings using a web browser. 2) Check the wireless security mode currently active. 3) If it is set to WPA3-only, change it to WPA2 or a mixed WPA2/WPA3 mode. 4) Save the settings and reattempt printer setup. 5) Alternatively, check Brother's site for a firmware update that might add WPA3 support.",
    content: `<p>TS-04 is a genuinely different kind of failure than most Brother wireless errors: your printer actually found your network this time. The problem is what happens next — the security method your router is using and what your printer's wireless hardware can actually speak don't match.</p>

<h2>What TS-04 Actually Means</h2>
<p>TS-04 indicates the printer detected your network successfully but couldn't join it because the <strong>wireless security type doesn't match</strong> what the printer supports. This has become considerably more common as routers have modernized: many newer routers now default to <strong>WPA3</strong> security, and a meaningful number of Brother printers, particularly older or budget models, only support <strong>WPA2</strong> or earlier standards.</p>
<p><strong>Why this matters:</strong> this isn't a printer malfunction or a password problem — it's a genuine compatibility gap between your router's current security setting and what your specific printer's wireless chip was built to handle.</p>

<h2>Fix 1: Check Your Router's Current Security Mode</h2>
<p>Log into your router's admin settings (usually through a browser at your router's IP address) and check what wireless security standard is currently active — look for WPA3, WPA2, or a mixed/transitional mode.</p>
<p><strong>Why this works:</strong> confirming exactly what your router is currently running tells you whether a mismatch is genuinely the cause before you change anything, rather than guessing.</p>

<h2>Fix 2: Switch to WPA2 or a Mixed Mode</h2>
<p>If your router is set to WPA3-only, change it to <strong>WPA2</strong>, or to a <strong>mixed WPA2/WPA3 mode</strong> if your router offers that option, then attempt printer setup again.</p>
<p><strong>Why this works:</strong> WPA2 remains widely supported across nearly all Wi-Fi hardware, including older printers, while a mixed mode lets modern devices use WPA3 and older devices fall back to WPA2 automatically — giving your Brother printer a security standard it can actually speak, without forcing every other device on your network to downgrade.</p>

<h2>Fix 3: Check for a Firmware Update on the Printer</h2>
<p>Before changing router settings, check whether a firmware update is available for your exact printer model through Brother's support site — some models have received updates adding WPA3 support after their initial release.</p>
<p><strong>Why this works:</strong> if your specific printer has since gained WPA3 compatibility through firmware, this avoids needing to weaken your router's security setting at all, keeping WPA3 active for every device on your network.</p>

<h2>When to Call a Professional</h2>
<p>If switching your router to WPA2 or mixed mode doesn't resolve TS-04, or if you're not comfortable adjusting your router's security settings yourself, contact whoever manages your network, or Brother support to confirm definitively whether your exact printer model supports WPA3 at all, with or without a firmware update.</p>`,
    faqs: JSON.stringify([
      { question: 'Does TS-04 mean my printer is broken?', answer: 'No — it means a security standard mismatch between your router and printer, not a fault with either device individually. It\'s a compatibility issue, not a malfunction.', order: 1 },
      { question: 'Is switching to WPA2 a security risk?', answer: 'WPA2 remains a solid, widely-used security standard, though WPA3 is newer and stronger. A mixed WPA2/WPA3 mode, where your router supports it, is often the better middle ground, letting capable devices use WPA3 while older ones like some printers still connect via WPA2.', order: 2 },
      { question: 'Will a firmware update definitely add WPA3 support to my printer?', answer: 'Not necessarily — it depends entirely on your specific model and whether Brother released such an update for it. Check your model\'s support page directly rather than assuming an update exists.', order: 3 }
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
