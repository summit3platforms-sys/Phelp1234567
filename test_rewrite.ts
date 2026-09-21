import * as cheerio from 'cheerio';

export function rewriteHtml(html: string): string {
  const $ = cheerio.load(html, null, false);
  
  const replacements: Record<string, string> = {
    "bidirectional communication": "two-way connection",
    "initialization": "setup",
    "proprietary": "built-in",
    "calibration protocol": "calibration process",
    "firmware": "firmware (internal software)",
    "configuration": "settings",
    "In order to": "To",
    "Due to the fact that": "Because",
    "At this point in time": "Now",
    "It is necessary to open": "Open",
    "You should click": "Click",
    "You will need to press": "Press",
    "It is recommended to check": "Check",
    "It is important to make sure": "Make sure"
  };

  function processText(text: string): string {
    let newText = text;
    // Apply exact phrase replacements (case insensitive for the first letter if needed, but let's do global replace with case insensitivity)
    for (const [key, value] of Object.entries(replacements)) {
      const regex = new RegExp(key, 'gi');
      newText = newText.replace(regex, (match) => {
        // preserve casing for the first letter
        if (match[0] === match[0].toUpperCase()) {
          return value.charAt(0).toUpperCase() + value.slice(1);
        }
        return value;
      });
    }

    // Sentence breaking (very rudimentary, just for sentences > 20 words)
    // We split by sentence boundaries (., !, ?) followed by space
    const sentences = newText.match(/[^.!?]+[.!?]+(?:\s|$)/g) || [newText];
    const processedSentences = sentences.map(s => {
      const words = s.trim().split(/\s+/);
      if (words.length > 20) {
        // Find a good place to split: " and ", " but ", " because ", " which "
        const splitWords = [' and ', ' but ', ' because ', ' which ', ', and ', ', but '];
        let bestSplitIndex = -1;
        let splitStr = '';
        for (const sw of splitWords) {
          const idx = s.indexOf(sw);
          if (idx > 10 && idx < s.length - 10) {
            bestSplitIndex = idx;
            splitStr = sw;
            break;
          }
        }
        if (bestSplitIndex !== -1) {
          const part1 = s.substring(0, bestSplitIndex).trim();
          let part2 = s.substring(bestSplitIndex + splitStr.length).trim();
          part2 = part2.charAt(0).toUpperCase() + part2.slice(1);
          return `${part1}. ${part2} `;
        }
      }
      return s;
    });

    return processedSentences.join('');
  }

  // Iterate over all text nodes
  $('*').contents().filter(function() {
    return this.nodeType === 3; // Text node
  }).each(function() {
    if (this.data && this.data.trim().length > 0) {
      this.data = processText(this.data);
    }
  });

  return $.html();
}

const sample = `<p>Due to the fact that the proprietary firmware requires initialization, you must use bidirectional communication in order to start the calibration protocol. It is necessary to open the configuration.</p>`;
console.log(rewriteHtml(sample));
