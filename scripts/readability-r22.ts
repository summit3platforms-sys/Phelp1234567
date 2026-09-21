import { prisma } from '../src/lib/prisma';
import * as cheerio from 'cheerio';

function processHtml(html: string): string {
  const $ = cheerio.load(html, null, false);
  
  $('p, li').each((_, el) => {
    let text = $(el).html() || '';
    
    // Replace jargon
    text = text.replace(/\bbidirectional communication\b/gi, 'two-way connection')
               .replace(/\binitialization\b/gi, 'setup')
               .replace(/\bproprietary\b/gi, 'built-in')
               .replace(/\bcalibration protocol\b/gi, 'calibration process')
               .replace(/\bfirmware\b/gi, 'firmware (internal software)')
               .replace(/firmware \(internal software\) \(internal software\)/gi, 'firmware (internal software)')
               .replace(/\bconfiguration\b/gi, 'settings');
               
    text = text.replace(/\bIn order to\b/gi, 'To')
               .replace(/\bDue to the fact that\b/gi, 'Because')
               .replace(/\bAt this point in time\b/gi, 'Now');
               
    text = text.replace(/\bYou should (open|click|press|check|make sure)\b/gi, (match, p1) => {
        return p1.charAt(0).toUpperCase() + p1.slice(1);
    });

    // sentence splitter
    const sentences = text.match(/[^.!?]+[.!?]+/g);
    if (sentences) {
        let newHtml = '';
        for (let s of sentences) {
            // strip tags just for word counting
            const plainText = s.replace(/<[^>]+>/g, '');
            const words = plainText.trim().split(/\s+/);
            
            if (words.length > 20) {
                // Try to split at a good conjunction outside tags
                // We'll avoid splitting inside HTML tags by replacing them temporarily or just using regex carefully
                // A safe heuristic: split at ", and " or ", but " or " - "
                if (s.includes(', and ')) {
                    s = s.replace(/, and /, '. And ');
                } else if (s.includes(', but ')) {
                    s = s.replace(/, but /, '. But ');
                } else if (s.includes(', which ')) {
                    s = s.replace(/, which /, '. This ');
                } else if (s.includes(' - ')) {
                    s = s.replace(/ - /, '. ');
                } else if (s.includes(' — ')) {
                    s = s.replace(/ — /, '. ');
                } else {
                    // split at first comma after 50 chars
                    const match = s.match(/(.{50,}?),\s+(?=[^<]*(?:<|$))/);
                    if (match) {
                        s = s.replace(/(.{50,}?),\s+/, '$1. ');
                    }
                }
                
                // Capitalize the first letter after the new period if needed (simple hack)
                s = s.replace(/\.\s+([a-z])/g, (m, p1) => '. ' + p1.toUpperCase());
            }
            newHtml += s;
        }
        text = newHtml;
    }
    
    $(el).html(text);
  });
  
  return $.html();
}

async function main() {
  const slugs = ["hp-smart-app-cant-find-printer-windows-11", "hp-deskjet-2755e-paper-jam-no-paper", "niimbot-label-recognition-errors-exceeded-chip-limits", "hp-printer-banding-horizontal-stripes", "brother-machine-error-maintenance-mode"];
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  
  const updates = articles.map(article => {
      const originalCount = (article.content.replace(/<[^>]+>/g, '').match(/\S+/g) || []).length;
      const newContent = processHtml(article.content);
      const newCount = (newContent.replace(/<[^>]+>/g, '').match(/\S+/g) || []).length;
      
      console.log(`Article: ${article.slug}`);
      console.log(`Words before: ${originalCount}, Words after: ${newCount}`);
      
      return prisma.article.update({
          where: { id: article.id },
          data: { content: newContent }
      });
  });
  
  await Promise.all(updates);
  console.log("Successfully updated all articles!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
