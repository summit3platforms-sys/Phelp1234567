import fs from 'fs';

function processText(text: string): string {
    text = text.replace(/\bbidirectional communication\b/gi, 'two-way connection');
    text = text.replace(/\binitialization\b/gi, 'setup');
    text = text.replace(/\bproprietary\b/gi, 'built-in');
    text = text.replace(/\bcalibration protocol\b/gi, 'calibration process');
    text = text.replace(/\bfirmware\b/g, 'firmware (internal software)');
    text = text.replace(/\bFirmware\b/g, 'Firmware (internal software)');
    text = text.replace(/\bconfiguration\b/gi, 'settings');
    
    text = text.replace(/\bIn order to\b/gi, 'To');
    text = text.replace(/\bDue to the fact that\b/gi, 'Because');
    text = text.replace(/\bAt this point in time\b/gi, 'Now');
    
    text = text.replace(/\b(You should |We recommend that you |It is necessary to )(open|click|press|check|make sure)\b/gi, (match, p1, p2) => {
        return p2.charAt(0).toUpperCase() + p2.slice(1);
    });

    const sentences = text.match(/[^.!?]+[.!?]+/g);
    if (!sentences) return text;
    
    let result = '';
    for (let s of sentences) {
        let ws = s.trim();
        const words = ws.split(/\s+/);
        if (words.length > 20) {
            let bestIndex = -1;
            let splitLen = 0;
            const splitTokens = [', and ', ', but ', ' because ', ', which ', ', so ', ' and ', ' but ', ' which '];
            for (let token of splitTokens) {
                const idx = s.indexOf(token, Math.floor(s.length * 0.25));
                if (idx !== -1 && idx < s.length * 0.75) {
                    if (bestIndex === -1 || Math.abs(idx - s.length/2) < Math.abs(bestIndex - s.length/2)) {
                        bestIndex = idx;
                        splitLen = token.length;
                    }
                }
            }
            
            if (bestIndex !== -1) {
                let firstPart = s.substring(0, bestIndex).trim();
                let secondPart = s.substring(bestIndex + splitLen).trim();
                if (firstPart.endsWith(',')) firstPart = firstPart.slice(0, -1);
                secondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
                s = firstPart + '. ' + secondPart;
            }
        }
        result += s + (s.endsWith(' ') ? '' : ' ');
    }
    return result;
}

const file = fs.readFileSync('scripts/hp-envy-6055e-paper-jam-no-paper.html', 'utf-8');
const newFile = file.replace(/(>)([^<]+)(<)/g, (match, p1, p2, p3) => {
    return p1 + processText(p2) + p3;
});

console.log(newFile);
