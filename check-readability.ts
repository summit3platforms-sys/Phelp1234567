import { prisma } from './src/lib/prisma';

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!word) return 0;
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function countComplexWords(words: string[]): number {
  return words.filter(w => countSyllables(w) >= 3).length;
}

function fleschReadingEase(words: string[], sentences: number, syllables: number): number {
  const avgSentenceLength = words.length / sentences;
  const avgSyllablesPerWord = syllables / words.length;
  return 206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord;
}

function gunningFog(words: string[], sentences: number): number {
  const avgSentenceLength = words.length / sentences;
  const percentComplex = (countComplexWords(words) / words.length) * 100;
  return 0.4 * (avgSentenceLength + percentComplex);
}

function fleschLabel(score: number): string {
  if (score >= 90) return '5th grade (Very Easy)';
  if (score >= 80) return '6th grade (Easy)';
  if (score >= 70) return '7th grade (Fairly Easy)';
  if (score >= 60) return '8th-9th grade (Standard) ✅ IDEAL';
  if (score >= 50) return '10th-12th grade (Fairly Difficult) ⚠️';
  if (score >= 30) return 'College Level (Difficult) ❌';
  return 'College Graduate (Very Difficult) ❌';
}

async function main() {
  const articles = await prisma.article.findMany({
    take: 30,
    orderBy: { createdAt: 'desc' },
    include: { brand: true }
  });

  let totalFlesch = 0;
  let totalFog = 0;
  let totalAvgSentenceLength = 0;
  let results: { slug: string; title: string; flesch: number; fog: number; avgSentLen: number }[] = [];

  for (const article of articles) {
    const text = stripHtml(article.content);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 5);
    const words = text.split(/\s+/).filter(w => w.length > 0);
    if (sentences.length < 3 || words.length < 50) continue;

    const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);
    const flesch = fleschReadingEase(words, sentences.length, syllables);
    const fog = gunningFog(words, sentences.length);
    const avgSentLen = words.length / sentences.length;

    totalFlesch += flesch;
    totalFog += fog;
    totalAvgSentenceLength += avgSentLen;
    results.push({ slug: article.slug, title: article.title, flesch: Math.round(flesch), fog: Math.round(fog * 10) / 10, avgSentLen: Math.round(avgSentLen * 10) / 10 });
  }

  const count = results.length;
  const avgFlesch = totalFlesch / count;
  const avgFog = totalFog / count;
  const avgSentLen = totalAvgSentenceLength / count;

  console.log(`\n=== READABILITY REPORT (${count} articles sampled) ===\n`);
  console.log(`Average Flesch Reading Ease: ${Math.round(avgFlesch)} — ${fleschLabel(avgFlesch)}`);
  console.log(`  (100=Easiest, 0=Hardest. Target for tech help: 60-70)`);
  console.log(`Average Gunning Fog Index:   ${Math.round(avgFog * 10) / 10} (Target: under 12)`);
  console.log(`Average Sentence Length:     ${Math.round(avgSentLen * 10) / 10} words (Target: under 20)\n`);

  results.sort((a, b) => a.flesch - b.flesch);
  console.log("=== TOP 10 HARDEST TO READ (lowest Flesch = worst) ===");
  results.slice(0, 10).forEach((a, i) => {
    console.log(`${i + 1}. Flesch:${a.flesch} Fog:${a.fog} SentLen:${a.avgSentLen}w — ${a.title.slice(0, 70)}`);
  });
  console.log("\n=== TOP 5 EASIEST TO READ ===");
  results.slice(-5).reverse().forEach((a, i) => {
    console.log(`${i + 1}. Flesch:${a.flesch} Fog:${a.fog} SentLen:${a.avgSentLen}w — ${a.title.slice(0, 70)}`);
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
