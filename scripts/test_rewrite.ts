const text = "In order to fix this, you must check the bidirectional communication. Due to the fact that the configuration is wrong, it fails. The calibration protocol is starting. The firmware needs an update. At this point in time, open the printer. This is a very long sentence that has more than twenty words and it just keeps going on and on without stopping, which is really bad for readability and needs to be split up right now.";

function rewriteSentence(sentence: string): string {
    let s = sentence;
    s = s.replace(/\bbidirectional communication\b/gi, "two-way connection");
    s = s.replace(/\binitialization\b/gi, "setup");
    s = s.replace(/\bproprietary\b/gi, "built-in");
    s = s.replace(/\bcalibration protocol\b/gi, "calibration process");
    s = s.replace(/\bfirmware\b(?! \(internal software\))/gi, "firmware (internal software)");
    s = s.replace(/\bconfiguration\b/gi, "settings");

    s = s.replace(/^In order to /i, "To ");
    s = s.replace(/^Due to the fact that /i, "Because ");
    s = s.replace(/^At this point in time,? /i, "Now, ");

    const words = s.split(/\s+/);
    if (words.length > 20) {
        // Try to find a conjunction or comma
        const splitRegex = /(, and |, but |; | because |, which | that )/i;
        const parts = s.split(splitRegex);
        if (parts.length > 1) {
            let bestSplitIdx = -1;
            let minDiff = 9999;
            for(let i=1; i<parts.length; i+=2) {
                const left = parts.slice(0, i).join('').split(' ').length;
                const right = parts.slice(i+1).join('').split(' ').length;
                if (Math.abs(left - right) < minDiff) {
                    minDiff = Math.abs(left - right);
                    bestSplitIdx = i;
                }
            }
            if (bestSplitIdx !== -1) {
                let leftStr = parts.slice(0, bestSplitIdx).join('').trim();
                let delimiter = parts[bestSplitIdx].toLowerCase();
                let rightStr = parts.slice(bestSplitIdx+1).join('').trim();
                
                if (delimiter === ', and ' || delimiter === ' and ') {
                    s = leftStr + ". And " + rightStr.charAt(0).toUpperCase() + rightStr.slice(1);
                } else if (delimiter === ', but ' || delimiter === ' but ') {
                    s = leftStr + ". But " + rightStr.charAt(0).toUpperCase() + rightStr.slice(1);
                } else if (delimiter === '; ') {
                    s = leftStr + ". " + rightStr.charAt(0).toUpperCase() + rightStr.slice(1);
                } else if (delimiter === ' because ') {
                    s = leftStr + ". This happens because " + rightStr.charAt(0).toUpperCase() + rightStr.slice(1);
                } else if (delimiter === ', which ') {
                    s = leftStr + ". This " + rightStr.charAt(0).toUpperCase() + rightStr.slice(1);
                } else if (delimiter === ' that ') {
                    s = leftStr + ". This means that " + rightStr.charAt(0).toUpperCase() + rightStr.slice(1);
                }
            }
        } else {
            const commaParts = s.split(', ');
            if (commaParts.length > 1) {
                let leftStr = commaParts[0];
                let rightStr = commaParts.slice(1).join(', ');
                s = leftStr + ". " + rightStr.charAt(0).toUpperCase() + rightStr.slice(1);
            }
        }
    }
    
    // Convert openers to action verbs
    s = s.replace(/^You should open /i, "Open ");
    s = s.replace(/^You need to click /i, "Click ");
    s = s.replace(/^Please press /i, "Press ");
    s = s.replace(/^It is important to check /i, "Check ");
    s = s.replace(/^Be sure to make sure /i, "Make sure ");
    
    return s;
}

const sentences = text.split(/(?<=[.?!])\s+(?=[A-Z])/);
console.log(sentences.map(rewriteSentence).join(' '));
