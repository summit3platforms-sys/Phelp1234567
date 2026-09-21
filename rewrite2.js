const fs = require('fs');
const cheerio = require('cheerio');

const jargonMap = {
    "bidirectional communication": "two-way connection",
    "initialization": "setup",
    "proprietary": "built-in",
    "calibration protocol": "calibration process",
    "firmware": "firmware (internal software)",
    "configuration": "settings",
    "In order to": "To",
    "in order to": "to",
    "Due to the fact that": "Because",
    "due to the fact that": "because",
    "At this point in time": "Now",
    "at this point in time": "now"
};

function splitSentence(s) {
    const words = s.trim().split(/\s+/);
    if (words.length <= 20) return s;

    let splitIdx = -1;

    // Pass 1: Look for punctuation to split on (comma, semicolon)
    for (let i = 5; i < words.length - 5; i++) {
        if (words[i].match(/[,;]$/)) {
            splitIdx = i;
            break;
        }
    }

    // Pass 2: Look for conjunctions
    if (splitIdx === -1) {
        for (let i = 5; i < words.length - 5; i++) {
            if (words[i].match(/^(and|but|or|because|so|however|therefore|which|that|when|where)$/i)) {
                splitIdx = i;
                break;
            }
        }
    }

    // Fallback: mid point
    if (splitIdx === -1) {
        splitIdx = Math.floor(words.length / 2);
    }

    let first = words.slice(0, splitIdx).join(' ');
    let splitWord = words[splitIdx].replace(/[,;]$/, '');
    let second = words.slice(splitIdx + 1).join(' ');

    if (splitWord.match(/^(and|but|or|because|so|however|therefore|which|that|when|where)$/i)) {
        first = first + '.';
        second = second.charAt(0).toUpperCase() + second.slice(1);
    } else {
        first = first + ' ' + splitWord + '.';
        second = second.charAt(0).toUpperCase() + second.slice(1);
    }

    return first + ' ' + splitSentence(second);
}

function processText(text) {
    let result = text;
    for (const [k, v] of Object.entries(jargonMap)) {
        const regex = new RegExp(`\\b${k}\\b`, 'g');
        result = result.replace(regex, v);
    }

    result = result.replace(/You should (open|click|press|check|make sure|verify|run)/gi, (m, p1) => {
        return p1.charAt(0).toUpperCase() + p1.slice(1);
    });
    result = result.replace(/You must (open|click|press|check|make sure|verify|run)/gi, (m, p1) => {
        return p1.charAt(0).toUpperCase() + p1.slice(1);
    });
    result = result.replace(/It is recommended to (open|click|press|check|make sure|verify|run)/gi, (m, p1) => {
        return p1.charAt(0).toUpperCase() + p1.slice(1);
    });
    result = result.replace(/We recommend that you (open|click|press|check|make sure|verify|run)/gi, (m, p1) => {
        return p1.charAt(0).toUpperCase() + p1.slice(1);
    });

    // We split by standard sentence endings, being careful not to split e.g. "U.S." but good enough for this context
    // A simple regex to split sentences:
    const sentences = result.match(/[^.!?]+[.!?]+|\s+/g) || [result];
    let finalStr = "";
    for (let s of sentences) {
        if (s.trim().length === 0) {
            finalStr += s;
        } else {
            // Reattach punctuation correctly
            const puncMatch = s.match(/[.!?]+$/);
            const punc = puncMatch ? puncMatch[0] : '';
            const core = s.replace(/[.!?]+$/, '');
            finalStr += splitSentence(core) + punc;
        }
    }
    return finalStr;
}

function rewriteFile(inputFile, outputFile) {
    const html = fs.readFileSync(inputFile, 'utf-8');
    const $ = cheerio.load(html, null, false);
    $('*').contents().each(function() {
        if (this.type === 'text') {
            const txt = $(this).text();
            if (txt.trim().length > 0) {
                $(this).replaceWith(processText(txt));
            }
        }
    });
    fs.writeFileSync(outputFile, $.html());
}

const files = [
    ['scratch_hp-sprocket-prints-blank-fix.html', 'rewritten_hp.html'],
    ['scratch_zebra-network-factory-reset-diagnostics-test-ups-mode.html', 'rewritten_zebra.html'],
    ['scratch_brother-printer-error-ts-07.html', 'rewritten_brother.html'],
    ['scratch_nelko-pm220-vs-pm230-small-business-setup-bluetooth-pairing.html', 'rewritten_nelko.html'],
    ['scratch_dymo-connect-web-service-certificate-error-localhost.html', 'rewritten_dymo.html']
];

files.forEach(([inf, outf]) => rewriteFile(inf, outf));
console.log('Rewrote all files cleanly.');
