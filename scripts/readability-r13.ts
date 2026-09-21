import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

function countWords(str: string) {
  return str.replace(/<[^>]*>/g, '').split(/\s+/).filter(w => w.length > 0).length;
}

function countWordsInText(str: string) {
  return str.replace(/__TAG_\d+__/g, '').split(/\s+/).filter(w => w.length > 0).length;
}

function processBlockElement(htmlStr: string): string {
  const tagRegex = /(<[^>]+>)/g;
  const parts = htmlStr.split(tagRegex);
  
  let plainText = '';
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      plainText += parts[i];
    } else {
      plainText += `__TAG_${i}__`;
    }
  }
  
  const JARGON_MAP = [
    [/bidirectional communication/gi, 'two-way connection'],
    [/initialization/gi, 'setup'],
    [/proprietary/gi, 'built-in'],
    [/calibration protocol/gi, 'calibration process'],
    [/firmware(?!\s*\(internal software\))/gi, 'firmware (internal software)'],
    [/configuration/gi, 'settings'],
  ];
  for (const [regex, replacement] of JARGON_MAP) {
    plainText = plainText.replace(regex, replacement as string);
  }
  
  plainText = plainText.replace(/(?:You should|You need to|You must|You can|We recommend that you)\s+(open|click|press|check|make sure)/gi, (match, p1, offset, string) => {
    const before = string.substring(0, offset).trim();
    const isStart = before.length === 0 || /[.!?]$/.test(before) || /__TAG_\d+__$/.test(before);
    return isStart ? p1.charAt(0).toUpperCase() + p1.slice(1) : p1.toLowerCase();
  });
  
  plainText = plainText.replace(/In order to/gi, (match, offset, string) => {
    const before = string.substring(0, offset).trim();
    const isStart = before.length === 0 || /[.!?]$/.test(before) || /__TAG_\d+__$/.test(before);
    return isStart ? 'To' : 'to';
  });
  
  plainText = plainText.replace(/Due to the fact that/gi, (match, offset, string) => {
    const before = string.substring(0, offset).trim();
    const isStart = before.length === 0 || /[.!?]$/.test(before) || /__TAG_\d+__$/.test(before);
    return isStart ? 'Because' : 'because';
  });
  
  plainText = plainText.replace(/At this point in time/gi, (match, offset, string) => {
    const before = string.substring(0, offset).trim();
    const isStart = before.length === 0 || /[.!?]$/.test(before) || /__TAG_\d+__$/.test(before);
    return isStart ? 'Now' : 'now';
  });
  
  const sentences = plainText.match(/[^.!?]+[.!?]*\s*/g) || [plainText];
  const processedSentences = sentences.map(sentence => {
    let current = sentence;
    let iterations = 0;
    while (countWordsInText(current) > 20 && iterations < 3) {
      iterations++;
      const splitPoints = [
        { sep: '; ', replace: '. ' },
        { sep: ' — ', replace: '. ' },
        { sep: ' - ', replace: '. ' },
        { sep: ': ', replace: '. ' },
        { sep: ', which ', replace: '. This ' },
        { sep: ', where ', replace: '. There ' },
        { sep: ', because ', replace: '. Because ' },
        { sep: ', so ', replace: '. So ' },
        { sep: ', and ', replace: '. And ' },
        { sep: ', but ', replace: '. But ' },
        { sep: ', or ', replace: '. Or ' },
        { sep: ' because ', replace: '. Because ' },
        { sep: ' so ', replace: '. So ' },
        { sep: ' and ', replace: '. And ' },
        { sep: ' but ', replace: '. But ' }
      ];
      
      let splitDone = false;
      for (const sp of splitPoints) {
        const idx = current.indexOf(sp.sep);
        if (idx > 30 && idx < current.length - 30) {
          const part1 = current.substring(0, idx);
          const part2 = current.substring(idx + sp.sep.length);
          current = `${part1}${sp.replace}${part2.charAt(0).toUpperCase() + part2.slice(1)}`;
          splitDone = true;
          break;
        }
      }
      if (!splitDone) break;
    }
    return current;
  });
  
  let resultText = processedSentences.join('');
  
  for (let i = 1; i < parts.length; i += 2) {
    resultText = resultText.replace(`__TAG_${i}__`, parts[i]);
  }
  
  return resultText;
}

async function main() {
  const slugs = [
    "hp-printer-double-feeding-adf", 
    "bixolon-printer-not-showing-up-in-devices", 
    "polaroid-hi-print-pairs-wont-print-keeps-disconnecting", 
    "nelko-battery-drains-fast-overheating-charging-light-meaning", 
    "hp-officejet-4650-scanner-not-working-mac"
  ];
  
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  
  console.log(`Found ${articles.length} articles.`);
  
  const updatePromises = articles.map(async (article) => {
    const beforeCount = countWords(article.content);
    
    const $ = cheerio.load(`<div id="root">${article.content}</div>`, null, false);
    
    $('#root').find('p, h1, h2, h3, h4, h5, h6, td, th, li, span, strong, em').each((_, el) => {
      const hasBlockChild = $(el).find('p, h1, h2, h3, h4, h5, h6, td, th, li, span, strong, em').length > 0;
      if (!hasBlockChild) {
        const inner = $(el).html();
        if (inner) {
          $(el).html(processBlockElement(inner));
        }
      }
    });
    
    let processedContent = $('#root').html() || '';
    
    const afterCount = countWords(processedContent);
    
    await prisma.article.update({
      where: { id: article.id },
      data: { content: processedContent }
    });
    
    console.log(`Updated ${article.slug}: ${beforeCount} words -> ${afterCount} words`);
  });
  
  await Promise.all(updatePromises);
  
  console.log('All articles updated successfully.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
