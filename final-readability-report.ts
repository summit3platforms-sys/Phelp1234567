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

function fleschReadingEase(words: string[], sentences: number, syllables: number): number {
  const avgSentenceLength = words.length / sentences;
  const avgSyllablesPerWord = syllables / words.length;
  return 206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord;
}

function gunningFog(words: string[], sentences: number): number {
  const complexWords = words.filter(w => countSyllables(w) >= 3).length;
  return 0.4 * ((words.length / sentences) + (complexWords / words.length) * 100);
}

function fleschLabel(score: number): string {
  if (score >= 70) return '7th grade (Fairly Easy) ✅ IDEAL';
  if (score >= 60) return '8th-9th grade (Standard) ✅ IDEAL';
  if (score >= 50) return '10th-12th grade (Fairly Difficult) ⚠️';
  if (score >= 30) return 'College Level (Difficult) ❌';
  return 'College Graduate (Very Difficult) ❌';
}

async function main() {
  const articles = await prisma.article.findMany({ select: { slug: true, title: true, content: true } });

  let totalFlesch = 0; let totalFog = 0; let count = 0;
  let above60 = 0; let above50 = 0; let below50 = 0;

  for (const article of articles) {
    const text = stripHtml(article.content);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 5);
    const words = text.split(/\s+/).filter(w => w.length > 0);
    if (sentences.length < 3 || words.length < 50) continue;

    const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);
    const flesch = fleschReadingEase(words, sentences.length, syllables);
    const fog = gunningFog(words, sentences.length);

    totalFlesch += flesch;
    totalFog += fog;
    count++;

    if (flesch >= 60) above60++;
    else if (flesch >= 50) above50++;
    else below50++;
  }

  const avgFlesch = totalFlesch / count;
  const avgFog = totalFog / count;

  console.log(`\n=== FINAL READABILITY REPORT (${count} articles) ===\n`);
  console.log(`Average Flesch Reading Ease: ${Math.round(avgFlesch)} — ${fleschLabel(avgFlesch)}`);
  console.log(`Average Gunning Fog Index:   ${Math.round(avgFog * 10) / 10} (Target: under 12)`);
  console.log(`\nScore Distribution:`);
  console.log(`  ✅ Flesch 60+  (Ideal):       ${above60} articles (${Math.round(above60/count*100)}%)`);
  console.log(`  ⚠️  Flesch 50-59 (OK):         ${above50} articles (${Math.round(above50/count*100)}%)`);
  console.log(`  ❌ Flesch <50  (Too Hard):    ${below50} articles (${Math.round(below50/count*100)}%)`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
