import fs from 'fs';

function rewrite(html: string): string {
    const jargons = [
        { regex: /\bbidirectional communication\b/gi, replacement: 'two-way connection' },
        { regex: /\binitialization\b/gi, replacement: 'setup' },
        { regex: /\bproprietary\b/gi, replacement: 'built-in' },
        { regex: /\bcalibration protocol\b/gi, replacement: 'calibration process' },
        { regex: /\bfirmware\b/gi, replacement: 'firmware (internal software)' },
        { regex: /\bconfiguration\b/gi, replacement: 'settings' },
        { regex: /\bIn order to\b/gi, replacement: 'To' },
        { regex: /\bDue to the fact that\b/gi, replacement: 'Because' },
        { regex: /\bAt this point in time\b/gi, replacement: 'Now' }
    ];

    let result = html;
    for (const rule of jargons) {
        result = result.replace(rule.regex, rule.replacement);
    }

    result = result.replace(/\b(?:You should|It is important to|You need to|Be sure to)\s+(open|click|press|check|make sure)\b/gi, (match, verb) => {
        return verb.charAt(0).toUpperCase() + verb.slice(1);
    });

    return splitLongSentences(result);
}

function splitLongSentences(html: string): string {
    let out = '';
    let inTag = false;
    let currentText = '';
    
    for (let i = 0; i < html.length; i++) {
        if (html[i] === '<') {
            if (currentText) {
                out += processText(currentText);
                currentText = '';
            }
            inTag = true;
            out += '<';
        } else if (html[i] === '>') {
            inTag = false;
            out += '>';
        } else {
            if (inTag) {
                out += html[i];
            } else {
                currentText += html[i];
            }
        }
    }
    if (currentText) {
        out += processText(currentText);
    }
    return out;
}

function processText(text: string): string {
    const sentenceRegex = /([^.?!]+[.?!]+[\s]*)/g;
    let sentences = [];
    let match;
    let lastIndex = 0;
    while ((match = sentenceRegex.exec(text)) !== null) {
        sentences.push(match[0]);
        lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
        sentences.push(text.substring(lastIndex));
    }

    if (sentences.length === 0) return text;

    let result = '';
    for (let s of sentences) {
        const words = s.trim().split(/\s+/);
        if (words.length > 20) {
            const splitRegex = /,\s+(and|but|which|because|so|however)\s+/i;
            const splitMatch = s.match(splitRegex);
            if (splitMatch) {
                const index = splitMatch.index;
                const firstPart = s.substring(0, index);
                let secondPart = s.substring(index + splitMatch[0].length);
                secondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
                s = firstPart + ". " + secondPart;
            } else {
                const splitRegex2 = /\s+(and|but|because|so|while|where|as)\s+/i;
                const splitMatch2 = s.match(splitRegex2);
                if (splitMatch2) {
                    const index = splitMatch2.index;
                    const firstPart = s.substring(0, index);
                    let secondPart = s.substring(index + splitMatch2[0].length);
                    secondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
                    s = firstPart + ". " + secondPart;
                }
            }
        }
        result += s;
    }
    return result;
}

const html = fs.readFileSync('article_instax-mini-link-blank-overexposed-dark-prints-fix.html', 'utf8');
const rewritten = rewrite(html);
console.log('Original word count:', html.split(/\s+/).length);
console.log('Rewritten word count:', rewritten.split(/\s+/).length);
fs.writeFileSync('rewritten_instax.html', rewritten);
