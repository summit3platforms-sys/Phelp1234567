const cheerio = require('cheerio');

function processHtml(html) {
  const $ = cheerio.load(html, null, false);
  
  const jargon = {
    "bidirectional communication": "two-way connection",
    "initialization": "setup",
    "proprietary": "built-in",
    "calibration protocol": "calibration process",
    "firmware": "firmware (internal software)",
    "configuration": "settings",
    "In order to": "To",
    "Due to the fact that": "Because",
    "At this point in time": "Now",
    "You should check": "Check",
    "It is necessary to open": "Open",
    "Make sure to": "Make sure"
  };

  function processText(text) {
    let newText = text;
    for (let [k, v] of Object.entries(jargon)) {
      let regex = new RegExp('\\b' + k + '\\b', 'gi');
      newText = newText.replace(regex, match => {
          // match case roughly
          if (match[0] === match[0].toUpperCase()) {
              return v.charAt(0).toUpperCase() + v.slice(1);
          }
          return v;
      });
    }
    
    // basic sentence splitting
    let sentences = newText.match(/[^.!?]+[.!?]+|\s+/g);
    if (!sentences) {
        // maybe no punctuation
        sentences = [newText];
    }
    
    let processedSentences = sentences.map(s => {
      if (s.trim().length === 0) return s;
      let words = s.trim().split(/\s+/);
      if (words.length > 20) {
          // split at mid
          let mid = Math.floor(words.length / 2);
          let part1 = words.slice(0, mid).join(' ') + '.';
          let part2 = words.slice(mid).join(' ');
          part2 = part2.charAt(0).toUpperCase() + part2.slice(1);
          return part1 + ' ' + part2;
      }
      return s;
    });
    
    return processedSentences.join('');
  }

  function walk(node) {
    if (node.type === 'text') {
       node.data = processText(node.data);
    } else if (node.children) {
       node.children.forEach(walk);
    }
  }

  $.root()[0].children.forEach(walk);
  return $.html();
}

console.log(processHtml('<p>Due to the fact that the proprietary firmware requires bidirectional communication, it is necessary to open the configuration. This is a very very very very very very very very very very very very very long sentence that has more than twenty words and should be split into two shorter sentences.</p>'));
