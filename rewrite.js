const fs = require('fs');
const cheerio = require('cheerio');

const jargonMap = {
  "bidirectional communication": "two-way connection",
  "initialization": "setup",
  "proprietary": "built-in",
  "calibration protocol": "calibration process",
  "firmware": "firmware (internal software)",
  "configuration": "settings",
  "In order to": "To",
  "Due to the fact that": "Because",
  "At this point in time": "Now"
};

function processText(text) {
  let newText = text;
  
  // Replace jargon and wordy openers
  for (const [jargon, replacement] of Object.entries(jargonMap)) {
    const regex = new RegExp("\\b" + jargon + "\\b", "gi");
    newText = newText.replace(regex, replacement);
  }
  
  // Split long sentences
  const sentences = newText.match(/[^.!?]+[.!?]+/g) || [newText];
  const processedSentences = sentences.map(sentence => {
    const words = sentence.trim().split(/\s+/);
    if (words.length > 20) {
      // Find a good place to split: ", and ", ", but ", ", which "
      const splitters = [", and ", " and ", ", but ", " but ", ", which "];
      for (const splitter of splitters) {
        if (sentence.includes(splitter)) {
          const parts = sentence.split(splitter);
          if (parts.length === 2) {
            let part2 = parts[1].trim();
            if (part2) {
              part2 = part2.charAt(0).toUpperCase() + part2.slice(1);
            }
            return parts[0] + ". " + part2;
          }
        }
      }
      
      // If no splitter found, just return original (hard to split arbitrarily without breaking grammar)
      // We will try another one: split by commas if it's very long
      if (sentence.includes(", ")) {
         const parts = sentence.split(", ");
         if (parts.length >= 2) {
            let part2 = parts.slice(1).join(", ").trim();
            part2 = part2.charAt(0).toUpperCase() + part2.slice(1);
            return parts[0] + ". " + part2;
         }
      }
    }
    return sentence;
  });
  
  return processedSentences.join(" ");
}

function rewriteHtml(html) {
  const $ = cheerio.load(html, null, false);
  
  function walk(node) {
    if (node.type === 'text') {
      node.data = processText(node.data);
    } else if (node.children) {
      node.children.forEach(walk);
    }
  }
  
  $.root().children().each((i, el) => walk(el));
  return $.html();
}

const slugs = [
  "zebra-sd-darkness-mf-label-length-commands-explained",
  "seiko-slp-650-vs-650se-slp-620-differences-setup",
  "bixolon-srp-275iii-not-printing",
  "bixolon-printer-stuck-on-yellow-light",
  "seiko-slp-legacy-support-windows-7-mac-compatibility"
];

slugs.forEach(slug => {
  const filename = slug + '.html';
  if (fs.existsSync(filename)) {
    const html = fs.readFileSync(filename, 'utf-8');
    const newHtml = rewriteHtml(html);
    fs.writeFileSync('rewritten_' + filename, newHtml);
    console.log('Rewrote ' + filename);
  }
});
