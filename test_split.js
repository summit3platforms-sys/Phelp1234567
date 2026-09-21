const fs = require('fs');
const data = require('./articles_dump.json');

const jargons = [
  { from: /bidirectional communication/gi, to: 'two-way connection' },
  { from: /initialization/gi, to: 'setup' },
  { from: /proprietary/gi, to: 'built-in' },
  { from: /calibration protocol/gi, to: 'calibration process' },
  { from: /\bfirmware\b(?! \(internal software\))/gi, to: 'firmware (internal software)' },
  { from: /configuration/gi, to: 'settings' },
  { from: /In order to/gi, to: 'To' },
  { from: /Due to the fact that/gi, to: 'Because' },
  { from: /At this point in time/gi, to: 'Now' }
];

function processHtml(html) {
  let modified = html;
  
  // Replace jargons
  for (const j of jargons) {
    modified = modified.replace(j.from, j.to);
  }
  
  // Split long sentences. We need to avoid splitting HTML tags.
  // A simple way: find text outside tags and process it.
  let result = '';
  let inTag = false;
  let currentText = '';
  
  function processText(text) {
    if (!text.trim()) return text;
    // basic sentence splitting
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    let newText = '';
    for (let s of sentences) {
      let words = s.trim().split(/\s+/);
      if (words.length > 20) {
        // Find a good split point
        const splitWords = [' and ', ', and ', ' because ', ', but ', ' but ', ' which ', ', which ', ' while '];
        let splitFound = false;
        for (const sw of splitWords) {
          const idx = s.toLowerCase().indexOf(sw);
          if (idx > 10 && idx < s.length - 10) {
            let p1 = s.substring(0, idx).trim();
            let p2 = s.substring(idx + sw.length).trim();
            if (p2.length > 0) {
              p2 = p2.charAt(0).toUpperCase() + p2.slice(1);
              s = p1 + '. ' + p2;
              splitFound = true;
              break;
            }
          }
        }
        if (!splitFound) {
            // Force split at the 15th word
            const firstPart = words.slice(0, 15).join(' ');
            let secondPart = words.slice(15).join(' ');
            secondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
            s = firstPart + '. ' + secondPart;
        }
      }
      newText += s + ' ';
    }
    return newText;
  }

  // Tokenize HTML
  const tokens = modified.split(/(<[^>]+>)/g);
  for (let token of tokens) {
    if (token.startsWith('<')) {
      result += token;
    } else {
      result += processText(token);
    }
  }

  // Action verbs start: Try to replace some common non-action starts in list items
  // Since it's hard to do perfectly, we will just use the replacements above for readability.

  return result;
}

data.forEach(d => {
  const newContent = processHtml(d.content);
  console.log('SLUG:', d.slug);
  console.log('Original word count:', d.content.split(/\s+/).length);
  console.log('New word count:', newContent.split(/\s+/).length);
});
