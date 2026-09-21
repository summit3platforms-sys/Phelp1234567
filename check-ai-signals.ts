import { prisma } from './src/lib/prisma';

async function main() {
  const articles = await prisma.article.findMany({
    select: { slug: true, title: true, content: true, excerpt: true }
  });

  const aiPhrases = [
    "As an AI",
    "language model",
    "I cannot fulfill",
    "Here is the article",
    "Certainly!",
    "Sure thing",
    "Delve into",
    "A testament to",
    "In conclusion",
    "It is important to note",
    "It's important to remember",
    "When it comes to",
    "Navigating the world of",
    "Demystify",
    "Unleash"
  ];

  let foundSignals = false;

  for (const article of articles) {
    const textToCheck = (article.content + " " + article.excerpt).toLowerCase();
    
    const matchedPhrases = aiPhrases.filter(phrase => 
      textToCheck.includes(phrase.toLowerCase())
    );

    if (matchedPhrases.length > 0) {
      foundSignals = true;
      console.log(`[${article.slug}] contained AI phrases: ${matchedPhrases.join(", ")}`);
    }
  }

  if (!foundSignals) {
    console.log("No common AI textual footprints found in article bodies.");
  }
}

main().finally(() => prisma.$disconnect());
