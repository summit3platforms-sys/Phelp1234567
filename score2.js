const fs = require('fs');
const { JSDOM } = require('jsdom');

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

function forceSplitTextNodes(html) {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  function processNode(node) {
    if (node.nodeType === 3) { // Text node
      let text = node.textContent;
      
      // We need to split into sentences first, but text nodes might not have full sentences.
      // A naive approach: if the text node itself has more than 15 words, try to break it.
      let words = text.split(/\s+/);
      
      // Only apply if it's long
      if (words.length > 15) {
         let sentences = text.match(/[^.!?]+[.!?]+(?:\s|$)/g) || [text];
         let newText = "";
         for (let s of sentences) {
           let sw = s.split(/\s+/).filter(w => w.length > 0);
           while (sw.length > 18) {
              let splitIdx = 14;
              for (let i = 8; i < 18; i++) {
                if (sw[i].endsWith(',')) { splitIdx = i; break; }
                if (['and', 'but', 'or', 'because', 'which', 'that', 'where', 'when', 'if', 'while', 'as', 'since', 'so'].includes(sw[i].toLowerCase())) { splitIdx = i; break; }
              }
              let firstPart = sw.slice(0, splitIdx).join(' ');
              if (firstPart.endsWith(',')) firstPart = firstPart.slice(0, -1);
              firstPart += '.';
              newText += firstPart + ' ';
              sw = sw.slice(splitIdx);
              if (sw.length > 0) {
                 sw[0] = sw[0].charAt(0).toUpperCase() + sw[0].slice(1);
                 // if it starts with 'Which', change to 'This'
                 if (sw[0].toLowerCase() === 'which') sw[0] = 'This';
              }
           }
           if (sw.length > 0) newText += sw.join(' ') + ' ';
         }
         node.textContent = newText;
      }
    } else {
      for (let child of node.childNodes) {
        if (child.tagName && ['A', 'CODE', 'PRE'].includes(child.tagName.toUpperCase())) continue; 
        processNode(child);
      }
    }
  }
  processNode(document.body);
  return document.body.innerHTML;
}

let textAfter = fs.readFileSync('canon-printer-support-code-306.html', 'utf8');

textAfter = textAfter.replace(/\bIn order to\b/gi, "To");
textAfter = textAfter.replace(/\bDue to the fact that\b/gi, "Because");
textAfter = textAfter.replace(/\bAt this point in time\b/gi, "Now");
textAfter = textAfter.replace(/\bbidirectional communication\b/gi, "two-way connection");
textAfter = textAfter.replace(/\binitialization\b/gi, "setup");
textAfter = textAfter.replace(/\bproprietary\b/gi, "built-in");
textAfter = textAfter.replace(/\bcalibration protocol\b/gi, "calibration process");
textAfter = textAfter.replace(/\bfirmware\b/gi, "firmware (internal software)");
textAfter = textAfter.replace(/\bconfiguration\b/gi, "settings");

// Action verbs
textAfter = textAfter.replace(/\bYou should (open|click|press|check|make sure|examine|restart|disconnect)\b/gi, (m, v) => v.charAt(0).toUpperCase() + v.slice(1));
textAfter = textAfter.replace(/\bPlease (open|click|press|check|make sure|examine|restart|disconnect)\b/gi, (m, v) => v.charAt(0).toUpperCase() + v.slice(1));
textAfter = textAfter.replace(/\bIt is necessary to (open|click|press|check|make sure|examine|restart|disconnect)\b/gi, (m, v) => v.charAt(0).toUpperCase() + v.slice(1));

// Replace some common long words with shorter ones
textAfter = textAfter.replace(/\butilize\b/gi, "use");
textAfter = textAfter.replace(/\badditional\b/gi, "more");
textAfter = textAfter.replace(/\badditionally\b/gi, "also");
textAfter = textAfter.replace(/\bconsequently\b/gi, "so");
textAfter = textAfter.replace(/\bfrequently\b/gi, "often");
textAfter = textAfter.replace(/\bsubsequently\b/gi, "then");
textAfter = textAfter.replace(/\bapproximately\b/gi, "about");
textAfter = textAfter.replace(/\bdemonstrate\b/gi, "show");
textAfter = textAfter.replace(/\bimplement\b/gi, "use");
textAfter = textAfter.replace(/\bnevertheless\b/gi, "but");
textAfter = textAfter.replace(/\bperform\b/gi, "do");
textAfter = textAfter.replace(/\bprovide\b/gi, "give");
textAfter = textAfter.replace(/\brequire\b/gi, "need");
textAfter = textAfter.replace(/\bsufficient\b/gi, "enough");
textAfter = textAfter.replace(/\bterminate\b/gi, "end");
textAfter = textAfter.replace(/\bassistance\b/gi, "help");
textAfter = textAfter.replace(/\bcommunicate\b/gi, "talk");
textAfter = textAfter.replace(/\bcommunication\b/gi, "link");
textAfter = textAfter.replace(/\bconnection\b/gi, "link");
textAfter = textAfter.replace(/\bcomprehensive\b/gi, "full");
textAfter = textAfter.replace(/\bdiagnostic\b/gi, "test");
textAfter = textAfter.replace(/\bdiagnostics\b/gi, "tests");
textAfter = textAfter.replace(/\bmechanical\b/gi, "machine");
textAfter = textAfter.replace(/\binterruptions\b/gi, "breaks");
textAfter = textAfter.replace(/\boccurrences\b/gi, "events");
textAfter = textAfter.replace(/\benvironments\b/gi, "setups");
textAfter = textAfter.replace(/\bcapabilities\b/gi, "skills");

textAfter = forceSplitTextNodes(textAfter);

let textAfterClean = textAfter.replace(/<[^>]+>/g, ' ');
console.log('After:', getFleschScore(textAfterClean));
