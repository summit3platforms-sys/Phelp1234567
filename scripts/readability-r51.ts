import { prisma } from '../src/lib/prisma';

function processHtml(html: string): string {
    // Rule 2 & 4: Replace jargon and wordy openers
    let processed = html;
    processed = processed.replace(/\bbidirectional communication\b/gi, "two-way connection");
    processed = processed.replace(/\binitialization\b/gi, "setup");
    processed = processed.replace(/\bproprietary\b/gi, "built-in");
    processed = processed.replace(/\bcalibration protocol\b/gi, "calibration process");
    // Only replace firmware if not already followed by (internal software) to avoid duplication
    processed = processed.replace(/\bfirmware\b(?!\s*\(internal software\))/gi, "firmware (internal software)");
    processed = processed.replace(/\bconfiguration\b/gi, "settings");

    processed = processed.replace(/\bIn order to\b/gi, "To");
    processed = processed.replace(/\bDue to the fact that\b/gi, "Because");
    processed = processed.replace(/\bAt this point in time\b/gi, "Now");

    // Rule 3: Start sentences with action verbs where possible
    processed = processed.replace(/You should open/gi, "Open");
    processed = processed.replace(/You need to open/gi, "Open");
    processed = processed.replace(/You must open/gi, "Open");
    
    processed = processed.replace(/You should click/gi, "Click");
    processed = processed.replace(/You need to click/gi, "Click");
    
    processed = processed.replace(/You should press/gi, "Press");
    processed = processed.replace(/You need to press/gi, "Press");
    
    processed = processed.replace(/It is recommended to check/gi, "Check");
    processed = processed.replace(/You should check/gi, "Check");
    
    processed = processed.replace(/It is important to make sure/gi, "Make sure");
    processed = processed.replace(/You must make sure/gi, "Make sure");

    // Rule 1: Break any sentence over 20 words into 2 shorter sentences.
    const parts = processed.split(/(<[^>]+>)/g);
    for (let i = 0; i < parts.length; i++) {
        if (parts[i].startsWith('<') && parts[i].endsWith('>')) {
            continue;
        }
        
        let text = parts[i];
        // Split text by sentence endings
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
        
        const splitSentences = sentences.map(sentence => {
            let s = sentence;
            // Iterate splitting if still > 20 words
            let iter = 0;
            while (s.trim().split(/\s+/).length > 20 && iter < 3) {
                iter++;
                let bestIdx = -1;
                let glue = '. ';
                let cutLen = 0;
                
                const lower = s.toLowerCase();
                
                const options = [
                    { token: ', and ', rep: '. Additionally, ' },
                    { token: ', but ', rep: '. However, ' },
                    { token: ', because ', rep: '. This is because ' },
                    { token: ' which ', rep: '. This ' },
                    { token: ' that ', rep: '. It ' },
                    { token: ', while ', rep: '. Meanwhile, ' },
                    { token: ' and ', rep: '. Furthermore, ' }
                ];
                
                for (const opt of options) {
                    const idx = lower.indexOf(opt.token);
                    if (idx > 15 && s.length - idx > 15) {
                        bestIdx = idx;
                        glue = opt.rep;
                        cutLen = opt.token.length;
                        break;
                    }
                }
                
                if (bestIdx !== -1) {
                    const firstHalf = s.substring(0, bestIdx).trim();
                    let secondHalf = s.substring(bestIdx + cutLen).trim();
                    secondHalf = secondHalf.charAt(0).toUpperCase() + secondHalf.slice(1);
                    s = firstHalf + glue + secondHalf;
                } else {
                    break;
                }
            }
            return s;
        });
        
        parts[i] = splitSentences.join(' ');
    }
    
    return parts.join('');
}

async function main() {
    const slugs = [
        "epson-ecotank-et-2800-wifi-setup-connection-fixes",
        "epson-ecotank-et-2750-wifi-setup-connection-fixes",
        "epson-ecotank-et-4760-wifi-setup-connection-fixes",
        "polaroid-hi-print-cartridge-not-recognized-paper-out-fix",
        "hp-sprocket-wont-connect-bluetooth-fix"
    ];

    const articles = await prisma.article.findMany({
        where: { slug: { in: slugs } }
    });

    for (const article of articles) {
        if (!article.content) continue;
        
        const oldWordCount = article.content.split(/\s+/).length;
        const newContent = processHtml(article.content);
        const newWordCount = newContent.split(/\s+/).length;
        
        await prisma.article.update({
            where: { id: article.id },
            data: { content: newContent, wordCount: newWordCount }
        });
        
        console.log(`Updated ${article.slug}: ${oldWordCount} -> ${newWordCount} words.`);
    }
}

main().catch(console.error);
