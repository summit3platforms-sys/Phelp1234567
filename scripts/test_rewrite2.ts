import * as cheerio from 'cheerio';
import fs from 'fs';

const replacements = [
  { regex: /bidirectional communication/gi, replacement: "two-way connection" },
  { regex: /\binitialization\b/gi, replacement: "setup" },
  { regex: /\bproprietary\b/gi, replacement: "built-in" },
  { regex: /calibration protocol/gi, replacement: "calibration process" },
  { regex: /\bfirmware\b/gi, replacement: "firmware (internal software)" },
  { regex: /\bconfiguration\b/gi, replacement: "settings" },
  { regex: /In order to/gi, replacement: "To" },
  { regex: /Due to the fact that/gi, replacement: "Because" },
  { regex: /At this point in time/gi, replacement: "Now" },
];

function rewriteText(text: string): string {
  let newText = text;
  for (const { regex, replacement } of replacements) {
    newText = newText.replace(regex, (match) => {
      if (match[0] === match[0].toUpperCase()) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
      }
      return replacement;
    });
  }

  // Active verbs start
  newText = newText.replace(/(?:You should|You need to|You must|It is recommended to)\s+(open|click|press|check|make sure)\b/gi, (match, p1) => {
    return p1.charAt(0).toUpperCase() + p1.slice(1);
  });
  
  // Sentence splitting
  const sentenceRegex = /([^.?!]+[.?!]+)/g;
  newText = newText.replace(sentenceRegex, (sentence) => {
    let words = sentence.trim().split(/\s+/);
    if (words.length > 20) {
      let splitIdx = -1;
      for (let i = 10; i < words.length - 5; i++) {
        let w = words[i].toLowerCase();
        let prev = words[i-1];
        if (prev && prev.endsWith(',') && ["and", "but", "so", "because", "which", "while", "or"].includes(w)) {
            splitIdx = i;
            break;
        }
      }
      if (splitIdx === -1) {
        for (let i = 12; i < words.length - 5; i++) {
            let w = words[i].toLowerCase();
            if (["and", "but", "so", "because", "while"].includes(w)) {
                splitIdx = i;
                break;
            }
        }
      }
      if (splitIdx !== -1) {
        words[splitIdx - 1] = words[splitIdx - 1].replace(/,$/, '') + ".";
        words[splitIdx] = words[splitIdx].charAt(0).toUpperCase() + words[splitIdx].slice(1);
        return words.join(" ") + " ";
      }
    }
    return sentence;
  });

  return newText;
}

function processHtml(html: string): string {
  const $ = cheerio.load(html, null, false);
  
  function traverse(node: any) {
    if (node.type === 'text') {
      if (node.data.trim()) {
        node.data = rewriteText(node.data);
      }
    } else if (node.type === 'tag') {
      if (node.name !== 'script' && node.name !== 'style') {
        $(node).contents().each((_, child) => traverse(child));
      }
    }
  }

  const root = $.root();
  root.contents().each((_, child) => traverse(child));
  return root.html() || '';
}

const html = fs.readFileSync('article_0_brother-error-code-e50-vs-e51-difference.html', 'utf-8');
const processed = processHtml(html);
fs.writeFileSync('article_0_processed2.html', processed);
console.log('Original length:', html.length, 'Processed length:', processed.length);
