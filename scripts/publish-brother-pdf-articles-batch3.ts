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
    title: "Brother Printer Error TS-01? Here's the One-Step Fix",
    slug: 'brother-printer-error-ts-01',
    seoTitle: "Fix Brother Printer Error TS-01: Wireless Setting Not Activated",
    metaDescription: "Brother printer error TS-01? A repair tech explains why this is the simplest wireless code Brother has, and the exact button sequence to fix it.",
    excerpt: "TS-01 means your printer's wireless radio is currently turned off. Here is the exact button sequence to activate it and clear the error.",
    errorCode: 'TS-01',
    tags: 'Brother, TS-01, Wireless Setting, Wi-Fi, Network Error',
    wordCount: 510,
    difficultyLevel: 'Beginner',
    timeToFix: '2 minutes',
    categoryId: errorCodesCategory,
    authorId: authors.david,
    reviewerId: authors.alex,
    featuredSnippet: "To fix Brother printer error TS-01: 1) Disconnect any Ethernet cable from the printer. 2) On button-only models, hold the GO button for 10 seconds until a Network Configuration page prints. 3) On models with a display, navigate to Network > WLAN > Network I/F and set it to WLAN. 4) Once the radio is activated, run the wireless setup wizard again.",
    content: `<p>Of every wireless error code Brother uses, TS-01 is genuinely the simplest one to understand and the fastest to fix. It doesn't mean anything is wrong with your network, your router, or your password — it means your printer's own wireless radio isn't switched on yet.</p>

<h2>What TS-01 Actually Means</h2>
<p>Brother's official explanation is direct: <strong>the wireless setting is not activated</strong>. Your printer has a Wi-Fi radio built in, but that radio has its own on/off state separate from the printer's power button, and TS-01 appears specifically when you're attempting wireless setup while that radio is still switched off.</p>
<p><strong>Why this matters:</strong> there's no network troubleshooting to do here at all. This is a single setting on the printer itself, and turning it on resolves TS-01 completely.</p>

<h2>Fix: Turn On the Wireless Setting</h2>
<p>If your printer has an Ethernet cable currently plugged in, disconnect it first — some models won't activate wireless while a wired connection is present. Then, on button-only models without a full display, hold down the <strong>GO</strong> button for 10 seconds. Release it once the printer prints a Network Configuration page confirming the new wireless setting. On models with a menu display, navigate to <strong>Network &rarr; WLAN &rarr; Network I/F</strong> (or similarly named network interface setting) and set it to WLAN or Wireless instead of Wired or Off.</p>
<p><strong>Why this works:</strong> this directly switches on the radio hardware that wireless setup depends on. Once it's active, the printer can move on to actually detecting and connecting to your network, which is a separate step entirely from this one.</p>

<h2>After Turning It On</h2>
<p>Once the wireless setting is confirmed active, run through your printer's wireless setup wizard again from the beginning, either through the control panel or the Brother iPrint&amp;Scan app, to select your network and enter your password.</p>
<p><strong>Why this works:</strong> TS-01 only addresses whether the radio is on, not the actual connection itself. Completing setup from here is a normal wireless configuration process, no different from setting up any other printer once its wireless hardware is confirmed active.</p>

<h2>When to Call a Professional</h2>
<p>If you've disconnected any Ethernet cable, confirmed the wireless setting is switched to WLAN, and TS-01 still appears immediately every time you attempt setup, the printer's wireless radio itself may have a genuine hardware fault. This is uncommon for what's normally a simple setting, but worth raising with Brother support if the setting genuinely won't hold.</p>`,
    faqs: JSON.stringify([
      { question: 'Is TS-01 the same as TS-02?', answer: 'No — TS-01 means the wireless radio itself isn\'t turned on yet. TS-02 means the radio is on but can\'t detect your router. They\'re sequential: you need to resolve TS-01 before TS-02 is even a relevant next step.', order: 1 },
      { question: 'Why would my printer\'s wireless be off by default?', answer: 'Some Brother printers default to a wired (Ethernet) connection mode, or the wireless setting simply hasn\'t been activated yet during a fresh setup. This isn\'t unusual and doesn\'t indicate a fault.', order: 2 },
      { question: 'Do I need to disconnect Ethernet permanently, or just during setup?', answer: 'Just during the wireless activation and setup process on models that require it. Once wireless is successfully configured, you can decide whether to use wireless or Ethernet going forward, though most printers only actively use one connection type at a time.', order: 3 }
    ])
  },
  {
    title: "Brother Printer Error TS-02? [Complete Fix]",
    slug: 'brother-printer-error-ts-02',
    seoTitle: "Fix Brother Printer Error TS-02: Cannot Detect Router",
    metaDescription: "Brother printer error TS-02 can't find your router? A repair tech walks through every real cause, from distance to MAC filtering, in order.",
    excerpt: "TS-02 means the printer cannot detect your wireless router at all. Walk through these steps to fix the detection issue.",
    errorCode: 'TS-02',
    tags: 'Brother, TS-02, Router Detection, Wi-Fi, MAC Filtering, Signal',
    wordCount: 630,
    difficultyLevel: 'Intermediate',
    timeToFix: '15 minutes',
    categoryId: errorCodesCategory,
    authorId: authors.marcus,
    reviewerId: authors.elena,
    featuredSnippet: "To fix Brother printer error TS-02: 1) Ensure the router is powered on and broadcasting. 2) Move the printer temporarily within 3 feet (1 meter) of the router during setup to rule out range issues. 3) Remove physical obstructions like metal cabinets or thick walls. 4) Log into your router and disable MAC address filtering, or add the printer's MAC address to the allowed list.",
    content: `<p>TS-02 has one specific meaning, and Brother says it plainly on the wireless report itself: <strong>your printer can't detect your WLAN access point or router at all</strong>. Not a wrong password, not a security mismatch — the printer simply isn't seeing your network in the air. That narrows your troubleshooting considerably.</p>

<h2>What TS-02 Actually Means</h2>
<p>Before your printer can even attempt to join your network, it has to detect the router broadcasting it — the same way your phone shows a list of nearby Wi-Fi names before you pick one and enter a password. TS-02 means that detection step itself is failing, which points toward power, distance, obstruction, or a router-side filter blocking the printer specifically, rather than anything about your actual Wi-Fi password.</p>

<h2>Fix 1: Confirm the Router Is Actually On and Broadcasting</h2>
<p>Check that your WLAN access point or router is genuinely powered on and working normally — connect another device to confirm it's broadcasting and providing internet access as expected.</p>
<p><strong>Why this works:</strong> this rules out the simplest possible explanation first. A router that's off, restarting, or having its own issue will produce TS-02 regardless of anything correct on the printer's side.</p>

<h2>Fix 2: Move the Printer Temporarily Close to the Router</h2>
<p>For initial setup specifically, place the printer within about one meter (3.3 feet) of the router while configuring wireless settings, even if this isn't where it'll permanently live.</p>
<p><strong>Why this works:</strong> this is Brother's own recommended setup distance for a reason — getting a strong, unambiguous signal during the initial detection and handshake removes distance as a variable while you're establishing the connection. You can move the printer to its normal location once setup completes successfully.</p>

<h2>Fix 3: Remove Obstructions Between Printer and Router</h2>
<p>If moving the printer permanently closer isn't practical, at minimum check what's between the printer and router — thick walls, metal cabinets, or large appliances can meaningfully weaken a Wi-Fi signal.</p>
<p><strong>Why this works:</strong> Wi-Fi signal strength drops with both distance and physical obstruction, and a printer sitting on the far side of several walls from the router may simply never detect a strong enough signal to register during the connection process.</p>

<h2>Fix 4: Check MAC Address Filtering on Your Router</h2>
<p>If your router has MAC address filtering enabled — a security feature that only allows specifically approved devices onto the network — confirm your Brother printer's MAC address is included in that allowed list.</p>
<p><strong>Why this works:</strong> MAC filtering is a router-side setting that has nothing to do with the printer's own wireless hardware working correctly, and it's a commonly overlooked cause specifically because it produces the exact same "can't detect" symptom as a genuine range or power issue, with no obvious clue pointing toward the router's filter list as the actual cause.</p>

<h2>When to Call a Professional</h2>
<p>If the router is confirmed on and working, the printer has been tested at close range with no obstruction, and MAC filtering has been checked or disabled for testing — and TS-02 still appears — the printer's own wireless radio may have a genuine hardware fault. Contact Brother support with your exact model and the TS-02 code, since a wireless module failure at that point is a legitimate warranty or repair conversation.</p>`,
    faqs: JSON.stringify([
      { question: 'Does TS-02 mean my Wi-Fi password is wrong?', answer: 'No — TS-02 specifically means the printer can\'t detect the router at all, a step that happens before password entry. A wrong password produces a different code (TS-07) once the network has actually been found.', order: 1 },
      { question: 'Why does moving the printer closer to the router actually help during setup?', answer: 'It gives the printer the strongest possible signal during the initial detection and handshake process, removing distance and obstruction as variables while the connection is first being established. You can relocate it afterward.', order: 2 },
      { question: 'Could my router\'s settings really be blocking my printer specifically?', answer: 'Yes — MAC address filtering is a real router feature that allows only approved devices to connect, and it\'s easy to forget it\'s enabled until a new device like a printer runs into it.', order: 3 }
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
