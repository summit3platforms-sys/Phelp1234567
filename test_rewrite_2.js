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
  [/\bIn order to\b/gi, "To"],
  [/\bDue to the fact that\b/gi, "Because"],
  [/\bAt this point in time\b/gi, "Now"],
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
  
  const sentenceRegex = /[^.!?\n]+[.!?]*\s*/g;
  let sentences = newText.match(sentenceRegex) || [newText];
  
  let finalSentences = sentences.map(sentence => {
    let words = sentence.trim().split(/\s+/);
    if (words.length > 20) {
      const splitPoints = [
        /(,\s*and\s+)/i,
        /(,\s*but\s+)/i,
        /(,\s*so\s+)/i,
        /(,\s*because\s+)/i,
        /(,\s*which\s+)/i,
        /(\s+and\s+)/i,
        /(\s+but\s+)/i,
        /(\s+because\s+)/i
      ];
      
      for (let sp of splitPoints) {
        let parts = sentence.split(sp);
        if (parts.length >= 3) {
          // If we split by " and " or " but ", make sure both sides have a decent amount of words.
          let firstHalfWords = parts[0].trim().split(/\s+/).length;
          let secondHalfWords = parts.slice(2).join('').trim().split(/\s+/).length;
          if (firstHalfWords > 5 && secondHalfWords > 5) {
            let firstPart = parts[0].trim() + ".";
            let secondPart = parts.slice(2).join('').trim();
            // Start with pronoun if it's "which" or just capitalize
            if (sp.toString().includes('which')) {
                secondPart = "This " + secondPart;
            } else {
                secondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
            }
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
  const $ = cheerio.load(html, null, false);
  
  // Custom tree traversal to replace text nodes
  function traverse(node) {
    if (node.type === 'text') {
      if (node.data.trim().length > 0) {
        node.data = rewriteText(node.data);
      }
    } else if (node.children) {
      node.children.forEach(child => traverse(child));
    }
  }
  
  $.root().contents().each((i, el) => traverse(el));
  
  return $.html();
}

data.forEach(item => {
  item.newContent = processHtml(item.content);
});

fs.writeFileSync('r67_articles_rewritten_2.json', JSON.stringify(data, null, 2));
