const fs = require('fs');
const cheerio = require('cheerio');

let data = JSON.parse(fs.readFileSync('r67_articles.json', 'utf8'));

const jargon = [
  [/bidirectional communication/gi, "two-way connection"],
  [/initialization/gi, "setup"],
  [/proprietary/gi, "built-in"],
  [/calibration protocol/gi, "calibration process"],
  [/\bfirmware\b/gi, "firmware (internal software)"],
  [/configuration/gi, "settings"]
];

const openers = [
  [/In order to/gi, "To"],
  [/Due to the fact that/gi, "Because"],
  [/At this point in time/gi, "Now"],
  [/If you want to (open|click|press|check|make sure)\b/gi, (match, p1) => p1.charAt(0).toUpperCase() + p1.slice(1)],
  [/You should (open|click|press|check|make sure)\b/gi, (match, p1) => p1.charAt(0).toUpperCase() + p1.slice(1)],
  [/It is recommended to (open|click|press|check|make sure)\b/gi, (match, p1) => p1.charAt(0).toUpperCase() + p1.slice(1)]
];

function rewriteText(text) {
  let newText = text;
  
  for (let [pattern, replacement] of jargon) {
    newText = newText.replace(pattern, replacement);
  }
  for (let [pattern, replacement] of openers) {
    newText = newText.replace(pattern, replacement);
  }
  
  // Sentence splitting
  // Split into sentences using regex
  const sentenceRegex = /[^.!?\n]+[.!?]*\s*/g;
  let sentences = newText.match(sentenceRegex) || [newText];
  
  let finalSentences = sentences.map(sentence => {
    let words = sentence.trim().split(/\s+/);
    if (words.length > 20) {
      // try to split on conjunctions
      const splitPoints = [
        /(,\s*and\s+)/i,
        /(,\s*but\s+)/i,
        /(,\s*so\s+)/i,
        /(\s+because\s+)/i,
        /(,\s*which\s+)/i
      ];
      
      for (let sp of splitPoints) {
        let parts = sentence.split(sp);
        if (parts.length >= 3) { // parts[0] is before, parts[1] is the separator, parts[2] is after
          // Reconstruct
          let firstPart = parts[0].trim() + ".";
          let secondPart = parts.slice(2).join('').trim();
          secondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
          return firstPart + " " + secondPart + (sentence.endsWith(" ") ? " " : "");
        }
      }
      
      // if no conjunction found, try to split at 'that' or 'to' after 10 words
      if (words.length > 20) {
        for (let i = 10; i < words.length - 5; i++) {
          if (words[i].toLowerCase() === 'that' || words[i].toLowerCase() === 'to') {
            let firstPart = words.slice(0, i).join(" ") + ".";
            let secondPart = words.slice(i).join(" ");
            secondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
            return firstPart + " " + secondPart + (sentence.endsWith(" ") ? " " : "");
          }
        }
      }
    }
    return sentence;
  });
  
  return finalSentences.join("");
}

function processHtml(html) {
  const $ = cheerio.load(html, { decodeEntities: false }, false);
  
  // Traverse text nodes
  $('*').contents().each(function() {
    if (this.nodeType === 3) { // text node
      let text = this.data;
      if (text.trim().length > 0) {
        this.data = rewriteText(text);
      }
    }
  });
  
  return $.html();
}

data.forEach(item => {
  item.newContent = processHtml(item.content);
});

fs.writeFileSync('r67_articles_rewritten.json', JSON.stringify(data, null, 2));
