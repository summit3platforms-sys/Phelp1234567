import * as cheerio from 'cheerio';

const html = `<p>In order to fix the bidirectional communication, you need to open the configuration. The firmware must be updated due to the fact that the proprietary calibration protocol failed.</p>`;

const JARGON_MAP = [
  [/bidirectional communication/gi, 'two-way connection'],
  [/initialization/gi, 'setup'],
  [/proprietary/gi, 'built-in'],
  [/calibration protocol/gi, 'calibration process'],
  [/firmware(?!\s*\(internal software\))/gi, 'firmware (internal software)'],
  [/configuration/gi, 'settings'],
  [/In order to/gi, 'To'],
  [/Due to the fact that/gi, 'Because'],
  [/At this point in time/gi, 'Now'],
  [/You should open/gi, 'Open'],
  [/You need to open/gi, 'Open'],
  [/You must open/gi, 'Open'],
  [/You can open/gi, 'Open']
];

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
  
  for (const [regex, replacement] of JARGON_MAP) {
    plainText = plainText.replace(regex, replacement as string);
  }
  
  const sentences = plainText.match(/[^.!?]+[.!?]*\s*/g) || [plainText];
  const processedSentences = sentences.map(sentence => {
    const trimmed = sentence.trim();
    if (!trimmed) return sentence;
    
    const cleanWordCount = trimmed.replace(/__TAG_\d+__/g, '').split(/\s+/).filter(w => w.length > 0).length;
    
    if (cleanWordCount > 20) {
      const splitPoints = [
        { sep: ', which ', replace: '. This ' },
        { sep: ', and ', replace: '. And ' },
        { sep: ', but ', replace: '. But ' },
        { sep: '; ', replace: '. ' },
        { sep: ' and ', replace: '. And ' }
      ];
      
      for (const sp of splitPoints) {
        const idx = sentence.indexOf(sp.sep);
        if (idx > 20 && idx < sentence.length - 20) {
          const part1 = sentence.substring(0, idx);
          const part2 = sentence.substring(idx + sp.sep.length);
          return `${part1}${sp.replace}${part2.charAt(0).toUpperCase() + part2.slice(1)}`;
        }
      }
    }
    return sentence;
  });
  
  let resultText = processedSentences.join('');
  
  for (let i = 1; i < parts.length; i += 2) {
    resultText = resultText.replace(`__TAG_${i}__`, parts[i]);
  }
  
  return resultText;
}

const $ = cheerio.load(html, null, false);
$('p, li').each((_, el) => {
  const inner = $(el).html();
  if (inner) {
    const processed = processBlockElement(inner);
    $(el).html(processed);
  }
});
console.log($.html());
