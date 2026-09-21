import { prisma } from './src/lib/prisma';
import fs from 'fs';

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

async function main() {
  const articles = await prisma.article.findMany({
    select: { slug: true, title: true, content: true }
  });

  const poor: { slug: string; title: string; flesch: number }[] = [];
  let totalFlesch = 0;
  let count = 0;

  for (const article of articles) {
    const text = stripHtml(article.content);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 5);
    const words = text.split(/\s+/).filter(w => w.length > 0);
    if (sentences.length < 3 || words.length < 50) continue;

    const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);
    const flesch = fleschReadingEase(words, sentences.length, syllables);

    totalFlesch += flesch;
    count++;

    if (flesch < 55) {
      poor.push({ slug: article.slug, title: article.title, flesch: Math.round(flesch) });
    }
  }

  poor.sort((a, b) => a.flesch - b.flesch);

  console.log(`Total articles analysed: ${count}`);
  console.log(`Average Flesch: ${Math.round(totalFlesch / count)}`);
  console.log(`Articles with Flesch < 55 (need fixing): ${poor.length}`);
  console.log(`\nSlugs to fix:`);
  poor.forEach(a => console.log(`${a.flesch}\t${a.slug}`));

  // Write slugs list to file for batching
  const slugList = poor.map(a => a.slug);
  fs.writeFileSync('readability-fix-list.json', JSON.stringify(slugList, null, 2));
  console.log(`\nWritten ${slugList.length} slugs to readability-fix-list.json`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
