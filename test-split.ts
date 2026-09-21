function splitSentence(s: string): string {
    const words = s.trim().split(/\s+/);
    if (words.length <= 20) return s;

    let splitIdx = -1;
    for (let i = 10; i < words.length - 5; i++) {
        if (words[i].match(/^(and|but|or|because|so),?$/i) || words[i].endsWith(',')) {
            splitIdx = i;
            break;
        }
    }
    if (splitIdx === -1) {
        splitIdx = Math.floor(words.length / 2);
    }

    let first = words.slice(0, splitIdx + 1).join(' ');
    let second = words.slice(splitIdx + 1).join(' ');

    first = first.replace(/,$/, '') + '.';
    second = second.replace(/^(and|but|or|because|so)\s/i, '');
    second = second.charAt(0).toUpperCase() + second.slice(1);

    return first + ' ' + splitSentence(second);
}

function rewriteText(text: string): string {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    let newText = "";
    for (let s of sentences) {
        // preserve leading whitespace
        const matchWhitespace = s.match(/^\s*/);
        const leading = matchWhitespace ? matchWhitespace[0] : "";
        newText += leading + splitSentence(s.trim());
    }
    if (sentences.length === 1 && !text.match(/[.!?]$/)) {
         return splitSentence(text.trim());
    }
    return newText;
}

const test1 = "HP Sprocket printers utilize ZINK (Zero Ink) technology, an innovative printing method that completely eliminates the need for liquid ink cartridges, ribbons, or toner.";
console.log(rewriteText(test1));

