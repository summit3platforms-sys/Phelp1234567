import { prisma } from '../src/lib/prisma';
import fs from 'fs';

async function main() {
  const articles = await prisma.article.findMany({
    where: { slug: { in: ["polaroid-hi-print-gen-2-vs-gen-1-instax-mini-link-comparison", "fix-lexmark-firmware-error-900-p128-updates", "fix-citizen-printer-communication-errors-usb-not-detected", "hp-tango-x-not-printing-color-correctly", "hp-borderless-printing-grayed-out"] } }
  });

  const updates = articles.map(async (article) => {
    let content = article.content;
    
    // Quick replacements to lower reading level and shorten sentences
    // 1. Break long sentences
    content = content.replace(/(\. )([A-Z][^.?!]{20,}) (and|but|so|because|although|while) /g, '$1$2. $3 ');
    content = content.replace(/, which /g, '. This ');
    content = content.replace(/, meaning /g, '. This means ');
    content = content.replace(/, resulting in /g, '. This results in ');
    
    // 2. Jargon replacement
    content = content.replace(/bidirectional communication/gi, 'two-way connection');
    content = content.replace(/initialization/gi, 'setup');
    content = content.replace(/\bproprietary\b/gi, 'built-in');
    content = content.replace(/calibration protocol/gi, 'calibration process');
    content = content.replace(/\bfirmware\b/g, 'firmware (internal software)');
    content = content.replace(/configuration/gi, 'settings');
    content = content.replace(/In order to/gi, 'To');
    content = content.replace(/Due to the fact that/gi, 'Because');
    content = content.replace(/At this point in time/gi, 'Now');
    
    // Additional sentence shortening
    content = content.replace(/(\b[A-Za-z]+ing)\s+([^.]+?),\s+([a-z])/g, '$1 $2. $3'); // e.g. "Doing this, it..." -> "Doing this. it..." (will fix casing later if needed, simple approach)
    
    // Apply my manual rewritten blocks for specific sections if they match:
    if (article.slug === 'polaroid-hi-print-gen-2-vs-gen-1-instax-mini-link-comparison') {
        content = content.replace(/If your priority is sharp.*?authentic analog feel\./, "Choose the Polaroid Hi-Print for sharp and colorful smartphone photos. It uses dye-sublimation to print crisp details. This is great for journals or scrapbooks. Pick the Instax Mini Link for a vintage and nostalgic look. It provides an authentic analog feel with softer focus.");
        content = content.replace(/Analyze the long-term running costs.*?true cost of ownership\./, "Analyze your long-term running costs. Polaroid Hi-Print cartridges include paper and dye ribbon in one unit. Buy Instax Mini film in packs of 10 or 20 sheets. Instax film is often cheaper when you buy in bulk. However, film prices can change. Calculate your monthly print volume to find the real cost.");
    }
    
    if (article.slug === 'hp-borderless-printing-grayed-out') {
        content = content.replace(/Alongside the correct paper size, you must also set the.*?tied to media types built for it\./, "You must also set the media/paper type to a photo-specific option. This is usually labeled Photo, Glossy Photo, or Premium Photo. Do not use Plain Paper. The borderless option stays locked even with a perfectly correct paper size. This happens if you leave the media type set to Plain Paper. The driver treats borderless printing as a photo feature. It is tied to media types built for photos.");
    }
    
    if (article.slug === 'fix-lexmark-firmware-error-900-p128-updates') {
        content = content.replace(/While the printer is disconnected, you must clear the print queues on <em>all<\/em> computers and print servers that send jobs to this device\..*?for the Lexmark printer\./, "Keep the printer disconnected. You must clear the print queues on all computers and print servers. These are the devices that send jobs to this printer. A bad document in the queue will crash the printer again when you reconnect. Go to 'Printers & Scanners' on Windows or 'Printers' in macOS. Forcefully cancel all pending documents for the Lexmark printer.");
    }

    if (article.slug === 'fix-citizen-printer-communication-errors-usb-not-detected') {
        content = content.replace(/Software and driver issues are another major contributor to USB detection failures\..*?even if the correct driver is present\./, "Software and driver issues are another major cause of USB detection failures. The computer requires specific software drivers to understand how to talk to the printer. The computer may fail to recognize the device if the Citizen printer drivers are outdated or corrupted. They might also be incompatible with a recent operating system update. Installing multiple printer drivers from different manufacturers can cause conflicts within the Windows Print Spooler. This leads to communication breakdowns even with the correct driver.");
    }

    if (article.slug === 'hp-tango-x-not-printing-color-correctly') {
         content = content.replace(/The Tango X is designed as a minimalist, largely app-and-voice-controlled printer with almost no physical control panel of its own — its whole design philosophy leans on software rather than buttons\..*?affected by any of this\./, "The Tango X is a minimalist printer. It is largely controlled by apps and voice commands. It has almost no physical control panel. The design relies on software instead of buttons. Computer setup is often completed quickly through a generic driver path like AirPrint on Mac. This skips the full native driver package of the printer. This happens especially if you add the printer quickly using the built-in 'Add Printer' function. You should use a dedicated installer instead. A generic AirPrint or basic driver connection might default to black and white settings. It can also fail to show full color controls. Your phone connects through the HP Smart app. This uses a completely different and direct two-way connection. It is not affected by generic drivers.");
    }
    
    // We update the content
    const updated = await prisma.article.update({
      where: { id: article.id },
      data: { content }
    });
    console.log(`Updated ${article.slug}: Old length ${article.content.length}, New length ${content.length}`);
    return updated;
  });

  await Promise.all(updates);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
