import fs from 'fs';

let html = fs.readFileSync('epson-error-code-2000020a-initialization-fault.html', 'utf-8');

function processText(html: string): string {
    // 2. Jargon replacement
    html = html.replace(/bidirectional communication/gi, 'two-way connection');
    html = html.replace(/initialization/gi, 'setup');
    html = html.replace(/proprietary/gi, 'built-in');
    html = html.replace(/calibration protocol/gi, 'calibration process');
    html = html.replace(/firmware \(internal software\)/gi, 'firmware');
    html = html.replace(/firmware/gi, 'firmware (internal software)');
    html = html.replace(/configuration/gi, 'settings');

    // 4. Wordy openers
    html = html.replace(/In order to/gi, 'To');
    html = html.replace(/Due to the fact that/gi, 'Because');
    html = html.replace(/At this point in time/gi, 'Now');

    // 3. Action verbs
    html = html.replace(/(?:You need to|You should|It is recommended to|Please)\s+(open|click|press|check|make sure)/gi, (m, v) => {
        return v.charAt(0).toUpperCase() + v.slice(1);
    });

    const parts = html.split(/(<[^>]+>)/g);
    for (let i = 0; i < parts.length; i++) {
        if (!parts[i].startsWith('<')) {
            parts[i] = parts[i].replace(/([^.!?]+[.!?]+(\s+|$))/g, (match) => {
                const words = match.trim().split(/\s+/);
                if (words.length > 20) {
                    let splitIndex = Math.floor(words.length / 2);
                    
                    const conjunctions = ["and", "but", "because", "or", "so", "if", "while"];
                    for (let j = 8; j < words.length - 8; j++) {
                        const w = words[j].toLowerCase().replace(/[^a-z]/g, '');
                        if (conjunctions.includes(w) || words[j].endsWith(',')) {
                            splitIndex = j;
                            if (words[j].endsWith(',')) {
                                words[j] = words[j].slice(0, -1);
                            }
                            break;
                        }
                    }

                    const first = words.slice(0, splitIndex).join(' ');
                    let second = words.slice(splitIndex).join(' ');
                    second = second.charAt(0).toUpperCase() + second.slice(1);
                    
                    const space = match.match(/\s+$/) ? match.match(/\s+$/)![0] : '';
                    return first + ". " + second + space;
                }
                return match;
            });
        }
    }
    return parts.join('');
}

const out = processText(html);
console.log("Original words:", html.split(/\s+/).length);
console.log("New words:", out.split(/\s+/).length);
fs.writeFileSync('out_epson.html', out);
