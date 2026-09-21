const { JSDOM } = require('jsdom');
const fs = require('fs');

function transformHtml(html) {
  // First do regex on the whole HTML for jargon and openers, since those don't break structure (mostly).
  let text = html;
  text = text.replace(/\bIn order to\b/g, "To");
  text = text.replace(/\bDue to the fact that\b/gi, "Because");
  text = text.replace(/\bAt this point in time\b/gi, "Now");
  text = text.replace(/\bbidirectional communication\b/gi, "two-way connection");
  text = text.replace(/\binitialization\b/gi, "setup");
  text = text.replace(/\bproprietary\b/gi, "built-in");
  text = text.replace(/\bcalibration protocol\b/gi, "calibration process");
  text = text.replace(/\bfirmware( \([^)]+\))?\b/gi, "firmware (internal software)"); 
  text = text.replace(/\bconfiguration\b/gi, "settings");
  
  // Action verbs
  text = text.replace(/\bYou should (open|click|press|check|make sure|examine|restart|disconnect)\b/gi, (match, verb) => verb.charAt(0).toUpperCase() + verb.slice(1));
  text = text.replace(/\bPlease (open|click|press|check|make sure|examine|restart|disconnect)\b/gi, (match, verb) => verb.charAt(0).toUpperCase() + verb.slice(1));

  // Now parse with JSDOM
  const dom = new JSDOM(text);
  const document = dom.window.document;

  function processNode(node) {
    if (node.nodeType === 3) { // Text node
      let str = node.textContent;
      // We only want to split long sentences. 
      // But text nodes might just be fragments of a sentence if there's a <strong> tag.
      // This is a known hard problem. 
      // Let's do a simple regex on the textContent if it has many words.
      let words = str.split(/\s+/);
      if (words.length > 20) {
        // replace some conjunctions with '. '
        str = str.replace(/, and /g, '. And ');
        str = str.replace(/ because /g, '. Because ');
        str = str.replace(/ which /g, '. This ');
        str = str.replace(/, but /g, '. But ');
        str = str.replace(/ resulting in /g, '. This results in ');
      }
      node.textContent = str;
    } else {
      for (let child of node.childNodes) {
        processNode(child);
      }
    }
  }

  processNode(document.body);
  return document.body.innerHTML;
}

const html = fs.readFileSync('canon-printer-support-code-306.html', 'utf8');
const transformed = transformHtml(html);
console.log(transformed.substring(0, 500));
