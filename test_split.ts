function processText(text: string) {
  const sentenceRegex = /([^.!?]+[.!?]+)(\s+|$)/g;
  let newText = '';
  let lastIndex = 0;
  
  let match;
  while ((match = sentenceRegex.exec(text)) !== null) {
    let before = text.substring(lastIndex, match.index);
    newText += before;
    
    let s = match[1];
    let trailing = match[2];
    
    let words = s.trim().split(/\s+/);
    if (words.length > 20) {
      let splitIdx = -1;
      let mid = Math.floor(words.length / 2);
      for (let offset = 0; offset < mid; offset++) {
        for (let sign of [1, -1]) {
           let idx = mid + (offset * sign);
           if (idx > 5 && idx < words.length - 5) {
             let w = words[idx].toLowerCase().trim();
             if (['and', 'but', 'or', 'so', 'because', 'although', 'while'].includes(w) || w.endsWith(',')) {
               splitIdx = idx;
               break;
             }
           }
        }
        if (splitIdx !== -1) break;
      }
      
      if (splitIdx !== -1) {
        let splitWord = words[splitIdx];
        let part1 = words.slice(0, splitIdx).join(' ');
        let part2 = words.slice(splitIdx + 1).join(' ');
        
        if (splitWord.endsWith(',')) {
           part1 += splitWord.slice(0, -1) + '.';
        } else {
           part1 += '.';
        }
        
        part2 = part2.charAt(0).toUpperCase() + part2.slice(1);
        s = part1 + ' ' + part2;
      }
    }
    newText += s + trailing;
    lastIndex = sentenceRegex.lastIndex;
  }
  newText += text.substring(lastIndex);
  
  // Replacements
  newText = newText.replace(/\bIn order to\b/gi, "To");
  newText = newText.replace(/\bDue to the fact that\b/gi, "Because");
  newText = newText.replace(/\bAt this point in time\b/gi, "Now");
  newText = newText.replace(/\bbidirectional communication\b/gi, "two-way connection");
  newText = newText.replace(/\binitialization\b/gi, "setup");
  newText = newText.replace(/\bproprietary\b/gi, "built-in");
  newText = newText.replace(/\bcalibration protocol\b/gi, "calibration process");
  newText = newText.replace(/\bfirmware\b/gi, "firmware (internal software)");
  newText = newText.replace(/\bconfiguration\b/gi, "settings");

  return newText;
}

let sample = "This is a very long sentence that has more than twenty words and it is designed to test if the split logic works properly and correctly.";
console.log(processText(sample));
