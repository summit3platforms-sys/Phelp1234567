function split(text: string) {
    return text.replace(/([^.!?\n]+(?:[.!?]+|$)(?:\s+|$))/g, (match) => {
        const matchObj = match.match(/^(\s*)(.*?)(\s*)$/);
        if (!matchObj) return match;
        const [, leadingSpace, coreText, trailingSpace] = matchObj;
        const words = coreText.split(/\s+/);
        if (words.length > 20) {
            let splitIndex = Math.floor(words.length / 2);
            let dropWord = false;
            const conjunctions = ["and", "but", "because", "or", "so", "if", "while"];
            for (let j = 8; j < words.length - 8; j++) {
                const w = words[j].toLowerCase().replace(/[^a-z]/g, '');
                if (conjunctions.includes(w)) {
                    splitIndex = j;
                    dropWord = true;
                    break;
                }
                if (words[j].endsWith(',')) {
                    splitIndex = j;
                    words[j] = words[j].slice(0, -1);
                    break;
                }
            }
            let first, second;
            if (dropWord) {
                first = words.slice(0, splitIndex).join(' ');
                second = words.slice(splitIndex + 1).join(' ');
            } else {
                first = words.slice(0, splitIndex + 1).join(' ');
                second = words.slice(splitIndex + 1).join(' ');
            }
            second = second.charAt(0).toUpperCase() + second.slice(1);
            return leadingSpace + first + ". " + second + trailingSpace;
        }
        return match;
    });
}
console.log(split("This is a very long sentence that has no punctuation at the end and it should be split into two because it is over twenty words long."));
console.log(split("This is a very long sentence that has no punctuation at the end, which means it should be split into two because it is over twenty words long."));
