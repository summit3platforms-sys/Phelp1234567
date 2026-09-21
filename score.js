const fs = require('fs');

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!word) return 0;
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  let syllables = word.match(/[aeiouy]{1,2}/g);
  return syllables ? syllables.length : 1;
}

function getFleschScore(text) {
  let sentences = text.split(/[.!?]+(?:\s|$)/).filter(s => s.trim().length > 0);
  let words = text.split(/\s+/).filter(w => w.trim().length > 0);
  let numSentences = sentences.length || 1;
  let numWords = words.length || 1;
  let numSyllables = words.reduce((acc, word) => acc + countSyllables(word), 0);
  
  let score = 206.835 - 1.015 * (numWords / numSentences) - 84.6 * (numSyllables / numWords);
  return score;
}

let textBefore = fs.readFileSync('canon-printer-support-code-306.html', 'utf8').replace(/<[^>]+>/g, ' ');
console.log('Before:', getFleschScore(textBefore));

let textAfter = fs.readFileSync('canon-printer-support-code-306.html', 'utf8');

// same transform
textAfter = textAfter.replace(/\bIn order to\b/gi, "To");
textAfter = textAfter.replace(/\bDue to the fact that\b/gi, "Because");
textAfter = textAfter.replace(/\bAt this point in time\b/gi, "Now");
textAfter = textAfter.replace(/\bbidirectional communication\b/gi, "two-way connection");
textAfter = textAfter.replace(/\binitialization\b/gi, "setup");
textAfter = textAfter.replace(/\bproprietary\b/gi, "built-in");
textAfter = textAfter.replace(/\bcalibration protocol\b/gi, "calibration process");
textAfter = textAfter.replace(/\bfirmware\b/gi, "firmware (internal software)");
textAfter = textAfter.replace(/\bconfiguration\b/gi, "settings");

textAfter = textAfter.replace(/\bYou should (open|click|press|check|make sure|examine|restart|disconnect)\b/gi, (m, v) => v.charAt(0).toUpperCase() + v.slice(1));
textAfter = textAfter.replace(/\bPlease (open|click|press|check|make sure|examine|restart|disconnect)\b/gi, (m, v) => v.charAt(0).toUpperCase() + v.slice(1));
textAfter = textAfter.replace(/\bIt is necessary to (open|click|press|check|make sure|examine|restart|disconnect)\b/gi, (m, v) => v.charAt(0).toUpperCase() + v.slice(1));

// Aggressive sentence splitting in text
const { JSDOM } = require('jsdom');
const dom = new JSDOM(textAfter);
const document = dom.window.document;

function processNode(node) {
  if (node.nodeType === 3) {
    let str = node.textContent;
    
    // basic word count check
    if (str.split(/\s+/).length > 10) {
      str = str.replace(/, and /g, '. And ');
      str = str.replace(/ because /g, '. Because ');
      str = str.replace(/ which /g, '. This ');
      str = str.replace(/, but /g, '. But ');
      str = str.replace(/ resulting in /g, '. This results in ');
      str = str.replace(/, allowing /g, '. This allows ');
      str = str.replace(/, preventing /g, '. This prevents ');
      str = str.replace(/, ensuring /g, '. This ensures ');
      str = str.replace(/ moreover, /gi, '. Moreover, ');
      str = str.replace(/ additionally, /gi, '. Additionally, ');
      str = str.replace(/ furthermore, /gi, '. Furthermore, ');
      str = str.replace(/ therefore, /gi, '. Therefore, ');
      str = str.replace(/ consequently, /gi, '. Consequently, ');
      str = str.replace(/ however, /gi, '. However, ');
      str = str.replace(/, as /g, '. As ');
      str = str.replace(/, so /g, '. So ');
      str = str.replace(/, thereby /g, '. Thereby ');
      str = str.replace(/, thus /g, '. Thus ');
      
      // additional aggressive splits
      str = str.replace(/\b(This implies|This means)\b/gi, ". $1");
      str = str.replace(/; /g, '. ');
    }
    node.textContent = str;
  } else {
    for (let child of node.childNodes) {
      if (child.tagName && child.tagName.toLowerCase() === 'a') continue; // don't split inside links
      processNode(child);
    }
  }
}
processNode(document.body);

let finalHtml = document.body.innerHTML;
let textAfterClean = finalHtml.replace(/<[^>]+>/g, ' ');
console.log('After:', getFleschScore(textAfterClean));
