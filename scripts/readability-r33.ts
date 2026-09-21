import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const slugs = [
  "hp-printer-wont-print-from-chromebook-2026", 
  "instax-mini-link-setup-guide-film-loading", 
  "hp-printer-printing-very-slowly", 
  "bixolon-printer-wont-connect-to-wi-fi", 
  "hp-officejet-3830-carriage-jam-fix"
];

const jargonMap: Record<string, string> = {
  "bidirectional communication": "two-way connection",
  "initialization": "setup",
  "proprietary": "built-in",
  "calibration protocol": "calibration process",
  "firmware": "firmware (internal software)",
  "configuration": "settings",
  "In order to": "To",
  "Due to the fact that": "Because",
  "At this point in time": "Now",
};

function rewriteContent(html: string): string {
  let rewritten = html;
  
  // Replace jargon and openers (case-insensitive)
  for (const [jargon, replacement] of Object.entries(jargonMap)) {
    const regex = new RegExp(jargon, "gi");
    rewritten = rewritten.replace(regex, replacement);
  }

  // A very rudimentary way to break long sentences > 20 words.
  // We will split by ". " and if a sentence is too long, we try to split at " and ", " but ", " because ", " which ".
  const splitLongSentences = (text: string) => {
    // split text into paragraphs/tags to avoid messing up HTML too much
    // This is a naive approach, but better than nothing
    return text.replace(/<p>(.*?)<\/p>/gs, (match, p1) => {
      let sentences = p1.split(/(?<=\.)\s+/);
      let newSentences = sentences.map((s: string) => {
        let words = s.split(/\s+/);
        if (words.length > 20) {
          // try to split
          let parts = s.split(/, and | and |, but | but |, because | because |, which | which /i);
          if (parts.length > 1) {
            // join the first part, add a period, capitalize the next part
            let result = parts[0] + ".";
            for (let i = 1; i < parts.length; i++) {
              let part = parts[i].trim();
              if (part.length > 0) {
                result += " " + part.charAt(0).toUpperCase() + part.slice(1);
                if (!result.endsWith(".")) result += ".";
              }
            }
            return result;
          }
        }
        return s;
      });
      return `<p>${newSentences.join(" ")}</p>`;
    });
  };

  rewritten = splitLongSentences(rewritten);
  
  // Action verbs (rudimentary replace at start of list items)
  rewritten = rewritten.replace(/<li>(You should|You must|It is necessary to)\s+(\w+)/gi, (match, p1, p2) => {
    return `<li>${p2.charAt(0).toUpperCase() + p2.slice(1)}`;
  });

  return rewritten;
}

async function main() {
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  console.log(`Found ${articles.length} articles to update.`);

  const updates = articles.map(article => {
    const originalCount = article.content.split(/\s+/).length;
    const newContent = rewriteContent(article.content);
    const newCount = newContent.split(/\s+/).length;
    
    console.log(`[${article.slug}] Words before: ${originalCount}, Words after: ${newCount}`);

    return prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
  });

  await Promise.all(updates);
  console.log("All articles updated successfully.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
