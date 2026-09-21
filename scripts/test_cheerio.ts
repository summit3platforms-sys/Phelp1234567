import * as cheerio from 'cheerio';
const html = `<p>In order to fix this, you must check the bidirectional communication. <strong>Due to the fact that the configuration is wrong</strong>, it fails.</p><p>This is a very long sentence that has more than twenty words and it just keeps going on and on without stopping, which is really bad for readability and needs to be split up right now.</p>`;

const $ = cheerio.load(html, null, false);
$('p, li, summary, h2, h3').each(function() {
    let h = $(this).html();
    if (!h) return;
    
    h = h.replace(/\bbidirectional communication\b/gi, "two-way connection");
    h = h.replace(/\binitialization\b/gi, "setup");
    h = h.replace(/\bproprietary\b/gi, "built-in");
    h = h.replace(/\bcalibration protocol\b/gi, "calibration process");
    h = h.replace(/\bfirmware\b(?! \(internal software\))/gi, "firmware (internal software)");
    h = h.replace(/\bconfiguration\b/gi, "settings");

    h = h.replace(/In order to /gi, "To ");
    h = h.replace(/Due to the fact that /gi, "Because ");
    h = h.replace(/At this point in time,? /gi, "Now, ");
    
    let segments = h.split(/(?<=[.?!])\s+(?=[A-Z<])/);
    let newSegments = segments.map(seg => {
        let stripped = seg.replace(/<[^>]+>/g, '');
        let words = stripped.split(/\s+/);
        if (words.length > 20) {
            let splitRegex = /(, and |, but |; | because |, which | that )/i;
            let parts = seg.split(splitRegex);
            if (parts.length > 1) {
                let bestSplitIdx = -1;
                let minDiff = 9999;
                for(let i=1; i<parts.length; i+=2) {
                    let leftPart = parts.slice(0, i).join('');
                    let openTags = (leftPart.match(/</g) || []).length;
                    let closeTags = (leftPart.match(/>/g) || []).length;
                    if (openTags === closeTags) {
                        let leftWords = leftPart.replace(/<[^>]+>/g, '').split(' ').length;
                        let rightWords = parts.slice(i+1).join('').replace(/<[^>]+>/g, '').split(' ').length;
                        if (Math.abs(leftWords - rightWords) < minDiff) {
                            minDiff = Math.abs(leftWords - rightWords);
                            bestSplitIdx = i;
                        }
                    }
                }
                
                if (bestSplitIdx !== -1) {
                    let leftStr = parts.slice(0, bestSplitIdx).join('').trim();
                    let delimiter = parts[bestSplitIdx].toLowerCase();
                    let rightStr = parts.slice(bestSplitIdx+1).join('').trim();
                    
                    let rightFirstCharIdx = rightStr.search(/[a-zA-Z]/);
                    if (rightFirstCharIdx !== -1) {
                         rightStr = rightStr.substring(0, rightFirstCharIdx) + rightStr.charAt(rightFirstCharIdx).toUpperCase() + rightStr.substring(rightFirstCharIdx + 1);
                    }

                    if (delimiter === ', and ' || delimiter === ' and ') {
                        return leftStr + ". And " + rightStr;
                    } else if (delimiter === ', but ' || delimiter === ' but ') {
                        return leftStr + ". But " + rightStr;
                    } else if (delimiter === '; ') {
                        return leftStr + ". " + rightStr;
                    } else if (delimiter === ' because ') {
                        return leftStr + ". This happens because " + rightStr;
                    } else if (delimiter === ', which ') {
                        return leftStr + ". This " + rightStr;
                    } else if (delimiter === ' that ') {
                        return leftStr + ". This means that " + rightStr;
                    }
                }
            }
        }
        return seg;
    });
    
    $(this).html(newSegments.join(' '));
});
console.log($.html());
