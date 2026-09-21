import { prisma } from '../src/lib/prisma';
import * as cheerio from 'cheerio';

function processText(text: string) {
    let t = text;

    // 1. Vocabulary Replacements
    t = t.replace(/\bbidirectional communication\b/gi, "two-way connection");
    t = t.replace(/\binitialization\b/gi, "setup");
    t = t.replace(/\bproprietary\b/gi, "built-in");
    t = t.replace(/\bcalibration protocol\b/gi, "calibration process");
    
    // Prevent double replacing firmware
    t = t.replace(/\bfirmware \(internal software\)\b/gi, "firmware");
    t = t.replace(/\bfirmware\b/gi, "firmware (internal software)");
    
    t = t.replace(/\bconfiguration\b/gi, "settings");
    t = t.replace(/\bconfigurations\b/gi, "settings");

    // Wordy openers
    t = t.replace(/\bIn order to\b/gi, "To");
    t = t.replace(/\bDue to the fact that\b/gi, "Because");
    t = t.replace(/\bAt this point in time\b/gi, "Now");
    
    // Action verbs
    t = t.replace(/\bIt is recommended to open\b/gi, "Open");
    t = t.replace(/\bYou should click\b/gi, "Click");
    t = t.replace(/\bBe sure to press\b/gi, "Press");
    t = t.replace(/\bIt is necessary to check\b/gi, "Check");
    t = t.replace(/\bMake sure to\b/gi, "Make sure");
    t = t.replace(/\bEnsure that you\b/gi, "Make sure to");
    t = t.replace(/\bPlease ensure that\b/gi, "Make sure");

    // Further simplification
    t = t.replace(/\butilize\b/gi, "use");
    t = t.replace(/\butilizing\b/gi, "using");
    t = t.replace(/\badditional\b/gi, "more");
    t = t.replace(/\bfurthermore\b/gi, "Also");
    t = t.replace(/\bConsequently\b/gi, "So");
    t = t.replace(/\bAdditionally\b/gi, "Also");
    t = t.replace(/\bsignificantly\b/gi, "much");
    t = t.replace(/\bsubsequently\b/gi, "then");
    t = t.replace(/\bdemonstrate\b/gi, "show");
    t = t.replace(/\bassistance\b/gi, "help");
    t = t.replace(/\bencountered\b/gi, "found");
    t = t.replace(/\brequire\b/gi, "need");
    t = t.replace(/\brequires\b/gi, "needs");

    const sentences = t.match(/[^.!?]+(?:[.!?]+(?:'|")?|$)/g) || [];
    let out = [];
    
    for (let s of sentences) {
        let trimmed = s.trim();
        if (!trimmed) {
            out.push(s);
            continue;
        }

        let leading = s.match(/^\s*/)?.[0] || "";
        let trailing = s.match(/\s*$/)?.[0] || "";

        let words = trimmed.split(/\s+/);
        
        // Safety counter to prevent infinite loop
        let safety = 10;
        
        while (words.length > 18 && safety > 0) {
            safety--;
            let splitDone = false;

            const splitPatterns = [
                { match: "; ", replace: ". " },
                { match: ", which ", replace: ". This " },
                { match: ", and ", replace: ". " },
                { match: ", but ", replace: ". However, " },
                { match: " because ", replace: ". This is because " },
                { match: ", so ", replace: ". So, " },
                { match: ", as ", replace: ". This is as " },
                { match: " to prevent ", replace: ". This prevents " },
                { match: " resulting in ", replace: ". This results in " },
                { match: " causing ", replace: ". This causes " },
                { match: " allow ", replace: ". This allows " },
                { match: " and ", replace: ". " },
                { match: " but ", replace: ". But " }
            ];

            for (let pat of splitPatterns) {
                if (trimmed.includes(pat.match)) {
                    let parts = trimmed.split(pat.match);
                    
                    let splitIdx = -1;
                    for (let i = 1; i < parts.length; i++) {
                        let leftWords = parts.slice(0, i).join(pat.match).split(/\s+/).length;
                        let rightWords = parts.slice(i).join(pat.match).split(/\s+/).length;
                        if (leftWords >= 6 && rightWords >= 6) {
                            splitIdx = i;
                            break;
                        }
                    }
                    
                    if (splitIdx !== -1) {
                        let left = parts.slice(0, splitIdx).join(pat.match);
                        let right = parts.slice(splitIdx).join(pat.match);
                        
                        right = right.charAt(0).toUpperCase() + right.slice(1);
                        trimmed = left + pat.replace + right;
                        words = trimmed.split(/\s+/);
                        splitDone = true;
                        break; 
                    }
                }
            }
            if (!splitDone) break; 
        }
        
        out.push(leading + trimmed + trailing);
    }
    
    return out.join("");
}

async function main() {
  const slugs = [
    "rollo-printer-calibration-guide-skewed-label-size-fix",
    "xerox-workcentre-versalink-errors-c405-6515-altalink",
    "hp-neverstop-laser-refill-not-printing",
    "dymo-connect-not-detecting-printer",
    "rollo-printer-label-jam-not-feeding-platen-roller-cleaning"
  ];

  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  for (const article of articles) {
      if (!article.content) continue;
      
      const beforeWordCount = article.content.split(/\s+/).length;
      
      const $ = cheerio.load(article.content, null, false);
      
      function traverse(node: any) {
          if (node.type === 'text') {
              node.data = processText(node.data);
          } else if (node.type === 'tag') {
              node.children.forEach(traverse);
          }
      }
      
      $.root().contents().each((_, el) => traverse(el));
      
      const newContent = $.html();
      const afterWordCount = newContent.split(/\s+/).length;
      
      await prisma.article.update({
          where: { id: article.id },
          data: { content: newContent }
      });
      
      console.log(`Updated ${article.slug}: Words before: ${beforeWordCount}, Words after: ${afterWordCount}`);
  }
  
  console.log("All done.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
