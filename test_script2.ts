import * as cheerio from 'cheerio';

function countWords(str: string) {
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
  
  // Replace jargon
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
  
  // Action verbs and openers
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
  
  // Sentence Splitting
  const sentences = plainText.match(/[^.!?]+[.!?]*\s*/g) || [plainText];
  const processedSentences = sentences.map(sentence => {
    let current = sentence;
    let iterations = 0;
    while (countWords(current) > 20 && iterations < 3) {
      iterations++;
      const splitPoints = [
        { sep: ', which ', replace: '. This ' },
        { sep: ', where ', replace: '. There ' },
        { sep: ', and ', replace: '. And ' },
        { sep: ', but ', replace: '. But ' },
        { sep: ', or ', replace: '. Or ' },
        { sep: '; ', replace: '. ' },
        { sep: ' — ', replace: '. ' },
        { sep: ' - ', replace: '. ' },
        { sep: ' and ', replace: '. And ' },
        { sep: ' but ', replace: '. But ' }
      ];
      
      let splitDone = false;
      for (const sp of splitPoints) {
        const idx = current.indexOf(sp.sep);
        // Only split if reasonably in the middle (e.g., > 30 chars from start/end)
        if (idx > 30 && idx < current.length - 30) {
          const part1 = current.substring(0, idx);
          const part2 = current.substring(idx + sp.sep.length);
          current = `${part1}${sp.replace}${part2.charAt(0).toUpperCase() + part2.slice(1)}`;
          splitDone = true;
          break; // break the for loop, while loop will check word count again
        }
      }
      if (!splitDone) {
        // If we couldn't find a good split point, just break out of while
        break;
      }
    }
    return current;
  });
  
  let resultText = processedSentences.join('');
  
  for (let i = 1; i < parts.length; i += 2) {
    resultText = resultText.replace(`__TAG_${i}__`, parts[i]);
  }
  
  return resultText;
}

const html = `<p>If you're setting up a brand-new <a href="/hp/error-codes-alerts/hp-printer-error-79-service-error-real-fix" title="HP Printer Error 79 Service Error? [Real Fix]">HP LaserJet</a> Tank and searching for help, you'll notice something odd fairly quickly: half the troubleshooting content out there talks about a printer called "Neverstop" instead.</p>`;
const $ = cheerio.load(html, null, false);
$('p, li, h1, h2, h3, h4, h5, h6, div, span').each((_, el) => {
  const inner = $(el).html();
  if (inner) {
    const processed = processBlockElement(inner);
    $(el).html(processed);
  }
});
console.log($.html());
