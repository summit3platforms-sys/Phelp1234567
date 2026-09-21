const cheerio = require('cheerio');

function processHtmlBlock(html) {
    // We split block into sentences. A crude way is splitting by ". "
    const parts = html.split(/(?<=\.)\s+/);
    let newParts = [];
    for (let part of parts) {
        let textOnly = part.replace(/<[^>]+>/g, '').trim();
        let words = textOnly.split(/\s+/);
        if (words.length > 20) {
            // Find a place to split
            // Let's look for " and ", " but ", " or ", " because ", ", "
            // We want it outside of tags if possible, or just string replace on the HTML.
            // A simple regex to replace the first suitable conjunction in the middle of the string:
            let replaced = false;
            // try conjunctions
            part = part.replace(/\b(and|but|or|because|so)\s/i, (match) => {
                if (replaced) return match;
                replaced = true;
                return ". ";
            });
            // if still not replaced, try comma
            if (!replaced) {
                part = part.replace(/,\s/, (match) => {
                    if (replaced) return match;
                    replaced = true;
                    return ". ";
                });
            }
            
            // capitalize letter after ". "
            part = part.replace(/\.\s+([a-z])/g, (m, p1) => ". " + p1.toUpperCase());
            newParts.push(part);
        } else {
            newParts.push(part);
        }
    }
    return newParts.join(" ");
}

console.log(processHtmlBlock('TS-07 is refreshingly specific once you know what it means: your printer found your network and attempted to connect, and the <strong>network key you entered was incorrect</strong>. No detection issue, no security mismatch — just a password that didn\'t match.'));
