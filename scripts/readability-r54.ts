import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const slugs = [
  "kodak-luma-projector-wifi-connection-fix",
  "dascom-thermal-printer-paper-feed-error",
  "star-micronics-led-error-codes-beeping-factory-reset-guide",
  "hp-envy-inspire-7255e-setup-stuck",
  "phomemo-label-off-center-size-not-recognized-roller-guide"
];

function rewriteContent(html: string): string {
  let text = html;
  
  // Replace jargon
  text = text.replace(/bidirectional communication/gi, "two-way connection");
  text = text.replace(/\binitialization\b/gi, "setup");
  text = text.replace(/\bproprietary\b/gi, "built-in");
  text = text.replace(/calibration protocol/gi, "calibration process");
  // Only replace firmware if it doesn't already have (internal software)
  text = text.replace(/\bfirmware\b(?!\s*\(internal software\))/gi, "firmware (internal software)");
  text = text.replace(/\bconfiguration\b/gi, "settings");
  
  // Replace wordy openers
  text = text.replace(/\bIn order to /gi, "To ");
  text = text.replace(/\bDue to the fact that /gi, "Because ");
  text = text.replace(/\bAt this point in time\b/gi, "Now");

  // Action verbs replacements
  text = text.replace(/You should open /gi, "Open ");
  text = text.replace(/It is necessary to click /gi, "Click ");
  text = text.replace(/You will need to press /gi, "Press ");
  text = text.replace(/It is important to check /gi, "Check ");
  text = text.replace(/Be sure to make sure /gi, "Make sure ");
  text = text.replace(/You must make sure /gi, "Make sure ");
  text = text.replace(/You need to check /gi, "Check ");
  text = text.replace(/Make sure to check /gi, "Check ");

  // Break long sentences safely (outside HTML tags)
  let parts = text.split(/(<[^>]*>)/);
  for (let i = 0; i < parts.length; i++) {
    if (!parts[i].startsWith('<')) {
      let sentences = parts[i].split(/(?<=\.|\?|\!)\s+/);
      for (let j = 0; j < sentences.length; j++) {
        let s = sentences[j];
        if (!s) continue;
        
        let wordCount = s.split(/\s+/).length;
        if (wordCount > 20) {
          const splitRegex = /(,\s*and\s+|\s+and\s+|,\s*but\s+|\s+but\s+|,\s*because\s+|\s+because\s+|\s+so\s+)/gi;
          const splitMatches = [...s.matchAll(splitRegex)];
          
          if (splitMatches.length > 0) {
            // Find one near the middle
            let match = splitMatches[Math.floor(splitMatches.length / 2)];
            let before = s.substring(0, match.index);
            let after = s.substring(match.index! + match[0].length);
            // Capitalize after
            after = after.charAt(0).toUpperCase() + after.slice(1);
            sentences[j] = before + ". " + after;
            
            // Re-evaluate if still > 20? No need to over-engineer, one split is good enough for most.
          }
        }
      }
      parts[i] = sentences.join(" ");
    }
  }
  return parts.join("");
}

async function main() {
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  const updates = articles.map(async (article) => {
    // Basic word count
    const oldWordCount = article.content.split(/\s+/).length;
    const newContent = rewriteContent(article.content);
    const newWordCount = newContent.split(/\s+/).length;
    
    await prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });

    console.log(`Updated ${article.slug}: ${oldWordCount} words -> ${newWordCount} words`);
  });

  await Promise.all(updates);
  console.log("Success: Readability improvements applied.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
