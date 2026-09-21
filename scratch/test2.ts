import * as cheerio from 'cheerio';

function processText(text: string): string {
  // Replace wordy openers
  let newText = text.replace(/In order to/gi, "To")
                    .replace(/Due to the fact that/gi, "Because")
                    .replace(/At this point in time/gi, "Now");
                    
  // Replace jargon
  newText = newText.replace(/bidirectional communication/gi, "two-way connection")
                   .replace(/initialization/gi, "setup")
                   .replace(/proprietary/gi, "built-in")
                   .replace(/calibration protocol/gi, "calibration process")
                   .replace(/\bfirmware\b(?! \(internal software\))/gi, "firmware (internal software)")
                   .replace(/configuration/gi, "settings");
                   
  // Break sentences > 20 words
  // First, safely split into sentences (naively by ". ")
  const sentences = newText.split(/(?<=[.?!])\s+/);
  const processedSentences = sentences.map(sentence => {
      const words = sentence.trim().split(/\s+/);
      if (words.length > 20) {
          const mid = Math.floor(words.length / 2);
          // try to find a conjunction near the middle
          let splitIdx = mid;
          const conjunctions = ['and', 'but', 'or', 'because', 'since', 'while', 'as', 'although'];
          for (let i = mid - 5; i <= Math.min(mid + 5, words.length - 2); i++) {
              if (i > 0 && i < words.length - 1) {
                  const wordRaw = words[i].toLowerCase().replace(/[^a-z]/g, '');
                  if (conjunctions.includes(wordRaw)) {
                      splitIdx = i;
                      break;
                  }
              }
          }
          
          words[splitIdx - 1] = words[splitIdx - 1].replace(/,$/, '') + '.';
          words[splitIdx] = words[splitIdx].charAt(0).toUpperCase() + words[splitIdx].slice(1);
          
          return words.join(' ');
      }
      return sentence;
  });
  
  // Rejoin preserving spacing if possible, but for text nodes simple join is fine
  return processedSentences.join(' ');
}

function processHTML(html: string): string {
  const $ = cheerio.load(html, null, false);
  
  function traverse(node: any) {
    if (node.type === 'text') {
      if (node.data.trim().length > 0) {
        // preserve leading and trailing whitespace
        const leadingSpace = node.data.match(/^\s*/)?.[0] || '';
        const trailingSpace = node.data.match(/\s*$/)?.[0] || '';
        const processed = processText(node.data);
        node.data = leadingSpace + processed + trailingSpace;
      }
    } else if (node.children) {
      node.children.forEach(traverse);
    }
  }

  $.root()[0].children.forEach(traverse);

  return $.html();
}

const html = `<p>In order to begin the initialization, the proprietary firmware needs bidirectional communication, due to the fact that the configuration uses a calibration protocol.</p> <a href="#">Link</a>`;
console.log(processHTML(html));
