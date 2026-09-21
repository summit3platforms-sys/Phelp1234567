const fs = require('fs');

function transformHtml(html) {
  // 1. Replace wordy openers (case insensitive)
  let text = html;
  text = text.replace(/\bIn order to\b/gi, "To");
  text = text.replace(/\bDue to the fact that\b/gi, "Because");
  text = text.replace(/\bAt this point in time\b/gi, "Now");

  // 2. Replace jargon
  text = text.replace(/\bbidirectional communication\b/gi, "two-way connection");
  text = text.replace(/\binitialization\b/gi, "setup");
  text = text.replace(/\bproprietary\b/gi, "built-in");
  text = text.replace(/\bcalibration protocol\b/gi, "calibration process");
  text = text.replace(/\bfirmware\b/gi, "firmware (internal software)");
  text = text.replace(/\bconfiguration\b/gi, "settings");

  // 3. Action verbs: replace "You should open" with "Open"
  text = text.replace(/\bYou should (open|click|press|check|make sure)\b/gi, (match, verb) => {
    return verb.charAt(0).toUpperCase() + verb.slice(1);
  });
  text = text.replace(/\bPlease (open|click|press|check|make sure)\b/gi, (match, verb) => {
    return verb.charAt(0).toUpperCase() + verb.slice(1);
  });

  // 4. Break sentences over 20 words.
  // We need to parse HTML and only process text nodes.
  return text;
}

const html = fs.readFileSync('canon-printer-support-code-306.html', 'utf8');
const transformed = transformHtml(html);
console.log(transformed.substring(0, 500));
