import * as cheerio from 'cheerio';

function processText(text: string): string {
  // Replace wordy openers
  let newText = text.replace(/In order to/gi, "To")
                    .replace(/Due to the fact that/gi, "Because")
                    .replace(/At this point in time/gi, "Now");
                    
  // Replace jargon
  newText = newText.replace(/bidirectional communication/gi, "two-way connection")
                   .replace(/initialization/gi, "setup")
                   .replace(/proprietary/gi, "built-in")
                   .replace(/calibration protocol/gi, "calibration process")
                   .replace(/\bfirmware\b(?! \(internal software\))/gi, "firmware (internal software)")
                   .replace(/configuration/gi, "settings");
                   
  // Break sentences > 20 words
  // First, safely split into sentences (naively by ". ")
  const sentences = newText.split(/(?<=[.?!])\s+/);
  const processedSentences = sentences.map(sentence => {
      const words = sentence.trim().split(/\s+/);
      if (words.length > 20) {
          const mid = Math.floor(words.length / 2);
          // try to find a conjunction near the middle
          let splitIdx = mid;
          const conjunctions = ['and', 'but', 'or', 'because', 'since', 'while', 'as', 'although'];
          for (let i = mid - 5; i <= mid + 5; i++) {
              if (i > 0 && i < words.length - 1) {
                  const wordRaw = words[i].toLowerCase().replace(/[^a-z]/g, '');
                  if (conjunctions.includes(wordRaw)) {
                      splitIdx = i;
                      break;
                  }
              }
          }
          
          // Apply split
          words[splitIdx - 1] = words[splitIdx - 1].replace(/,$/, '') + '.';
          // If the split word is a conjunction, we capitalize it or remove it? Let's just capitalize.
          words[splitIdx] = words[splitIdx].charAt(0).toUpperCase() + words[splitIdx].slice(1);
          
          return words.join(' ');
      }
      return sentence;
  });
  
  return processedSentences.join(' ');
}

console.log(processText("In order to begin the initialization, the proprietary firmware needs bidirectional communication, due to the fact that the configuration uses a calibration protocol."));
