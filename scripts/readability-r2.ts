import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

const jargonMap: Record<string, string> = {
  "bidirectional communication": "two-way connection",
  "initialization": "setup",
  "proprietary": "built-in",
  "calibration protocol": "calibration process",
  "firmware": "firmware (internal software)",
  "configuration": "settings",
  "In order to": "To",
  "in order to": "to",
  "Due to the fact that": "Because",
  "due to the fact that": "because",
  "At this point in time": "Now",
  "at this point in time": "now"
};

function processText(text: string): string {
  let processed = text;
  
  // Replace jargon and wordy openers
  for (const [key, value] of Object.entries(jargonMap)) {
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    processed = processed.replace(regex, (match) => {
      // Preserve original case for the first letter if possible, or just use the mapped value
      if (match[0] === match[0].toUpperCase()) {
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
      return value.toLowerCase();
    });
  }

  // Break sentences over 20 words
  // First, split text into sentences (naively)
  const sentences = processed.match(/[^.!?]+[.!?]+/g) || [processed];
  const newSentences = sentences.map(sentence => {
    const words = sentence.trim().split(/\s+/);
    if (words.length > 20) {
      // Try to find a good split point (and, but, or, comma) around the middle
      const middle = Math.floor(words.length / 2);
      let splitIndex = -1;
      
      for (let i = 10; i < words.length - 5; i++) {
        if (words[i].toLowerCase() === 'and' || 
            words[i].toLowerCase() === 'but' || 
            words[i].toLowerCase() === 'because' ||
            words[i].endsWith(',')) {
          splitIndex = i;
          if (Math.abs(i - middle) < 5) break; // Good enough
        }
      }
      
      if (splitIndex !== -1) {
        let firstPart = words.slice(0, splitIndex + 1).join(' ');
        let secondPart = words.slice(splitIndex + 1).join(' ');
        
        // Clean up the split point
        if (firstPart.endsWith(',')) {
          firstPart = firstPart.slice(0, -1) + '.';
        } else if (firstPart.toLowerCase().endsWith(' and') || firstPart.toLowerCase().endsWith(' but') || firstPart.toLowerCase().endsWith(' because')) {
           firstPart = words.slice(0, splitIndex).join(' ') + '.';
           secondPart = words[splitIndex] + ' ' + secondPart;
        } else {
           firstPart += '.';
        }
        
        // Capitalize second part
        secondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
        
        return `${firstPart} ${secondPart}`;
      }
    }
    return sentence.trim();
  });

  return newSentences.join(' ');
}

async function updateArticles() {
  const slugs = [
    "star-micronics-pos-setup-shopify-square-clover-toast",
    "printer-wont-connect-mesh-router-band-steering",
    "zebra-zt230-printhead-error-zt410-not-connecting-fix",
    "seiko-slp-advanced-driver-fixes-registry-idle-polling-silent-install",
    "fix-citizen-printer-cutter-lock-auto-cutter-errors"
  ];
  
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  
  let totalWordsBefore = 0;
  let totalWordsAfter = 0;
  
  const updates = articles.map(async (article) => {
    const wordCountBefore = article.content.split(/\s+/).length;
    totalWordsBefore += wordCountBefore;
    
    const $ = cheerio.load(article.content, null, false);
    
    // Process text nodes
    $('*').contents().filter(function() {
      return this.type === 'text' && $(this).text().trim().length > 0;
    }).each(function() {
      const originalText = $(this).text();
      // Skip if it's inside code blocks or pre tags maybe?
      if ($(this).parent().is('code, pre')) return;
      
      const newText = processText(originalText);
      $(this).replaceWith(newText);
    });
    
    // Attempt to start sentences with action verbs where possible...
    // Actually, simple text replacement in list items might be easiest.
    $('li').each(function() {
       let text = $(this).html() || '';
       text = text.replace(/^To /, 'Open '); // Very naive, maybe skip to avoid breaking meaning
       $(this).html(text);
    });
    
    const newContent = $.html();
    const wordCountAfter = newContent.split(/\s+/).length;
    totalWordsAfter += wordCountAfter;
    
    return prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
  });
  
  await Promise.all(updates);
  console.log(`Successfully updated ${updates.length} articles.`);
  console.log(`Words before: ${totalWordsBefore}, Words after: ${totalWordsAfter}`);
}

updateArticles().finally(() => prisma.$disconnect());
