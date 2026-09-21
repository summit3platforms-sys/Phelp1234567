import * as cheerio from 'cheerio';

function wordCount(str: string) {
  return str.split(/\s+/).filter(w => w.length > 0).length;
}

function processText(text: string): string {
  let modified = text;
  
  // Replace Jargon
  modified = modified.replace(/bidirectional communication/gi, "two-way connection");
  modified = modified.replace(/initialization/gi, "setup");
  modified = modified.replace(/proprietary/gi, "built-in");
  modified = modified.replace(/calibration protocol/gi, "calibration process");
  modified = modified.replace(/\bfirmware\b/gi, "firmware (internal software)");
  modified = modified.replace(/configuration/gi, "settings");
  
  // Replace Wordy Openers
  modified = modified.replace(/In order to/gi, "To");
  modified = modified.replace(/Due to the fact that/gi, "Because");
  modified = modified.replace(/At this point in time/gi, "Now");
  modified = modified.replace(/You should (open|click|press|check|make sure)/gi, "$1");
  modified = modified.replace(/You need to (open|click|press|check|make sure)/gi, "$1");
  
  // Basic sentence splitting (keep punctuation and whitespace)
  const sentenceRegex = /([^.!?]+[.!?]+)(\s*)/g;
  let result = "";
  let match;
  let lastIndex = 0;
  
  while ((match = sentenceRegex.exec(modified)) !== null) {
    let sentence = match[1];
    let trailingSpace = match[2];
    
    if (wordCount(sentence) > 20) {
      const words = sentence.trim().split(/\s+/);
      const mid = Math.floor(words.length / 2);
      let splitIndex = mid;
      
      // Look for a good split point
      for (let i = mid - 5; i <= mid + 5; i++) {
        if (i > 0 && i < words.length - 1) {
          const w = words[i].toLowerCase();
          if (w.endsWith(',') || w === 'and' || w === 'but' || w === 'or' || w === 'because' || w === 'which' || w === 'while') {
            splitIndex = i;
            break;
          }
        }
      }
      
      let p1 = words.slice(0, splitIndex + 1).join(' ');
      let p2 = words.slice(splitIndex + 1).join(' ');
      
      // Fix p1 ending
      if (p1.endsWith(',')) {
        p1 = p1.slice(0, -1) + '.';
      } else if (p1.match(/\b(and|but|or|because|which|while)$/i)) {
        p1 = p1.replace(/\s*\b(and|but|or|because|which|while)$/i, '.');
      } else {
        p1 += '.';
      }
      
      // Capitalize p2
      p2 = p2.charAt(0).toUpperCase() + p2.slice(1);
      result += p1 + ' ' + p2 + trailingSpace;
    } else {
      result += sentence + trailingSpace;
    }
    lastIndex = sentenceRegex.lastIndex;
  }
  
  // Add any remaining text
  if (lastIndex < modified.length) {
    result += modified.substring(lastIndex);
  }
  
  return result;
}

const html = "<p>Due to the fact that the proprietary firmware requires bidirectional communication, initialization is slow and you need to check the configuration before attempting to use the calibration protocol.</p>";
const $ = cheerio.load(html, null, false);
$('*').contents().each(function() {
  if (this.type === 'text') {
    this.data = processText(this.data);
  }
});
console.log($.html());
