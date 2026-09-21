import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

function rewriteHtml(html: string): string {
  let text = html;
  
  // Rule 4: Replace wordy openers
  text = text.replace(/In order to/gi, "To");
  text = text.replace(/Due to the fact that/gi, "Because");
  text = text.replace(/At this point in time/gi, "Now");
  
  // Rule 2: Replace jargon
  text = text.replace(/bidirectional communication/gi, "two-way connection");
  text = text.replace(/initialization/gi, "setup");
  text = text.replace(/proprietary/gi, "built-in");
  text = text.replace(/calibration protocol/gi, "calibration process");
  text = text.replace(/\bfirmware\b/gi, "firmware (internal software)");
  text = text.replace(/\bconfiguration\b/gi, "settings");
  
  // Rule 3: Start sentences with action verbs where possible
  text = text.replace(/You should open/gi, "Open");
  text = text.replace(/You need to click/gi, "Click");
  text = text.replace(/You must press/gi, "Press");
  text = text.replace(/It is important to check/gi, "Check");
  text = text.replace(/It is recommended to make sure/gi, "Make sure");
  
  // Load into cheerio to manipulate elements safely
  const $ = cheerio.load(text, null, false);
  
  // Rule 1: Break sentences over 20 words
  $('p, li, td, div').each((_, el) => {
    // We extract text nodes to avoid splitting HTML tags
    let inner = $(el).html() || '';
    
    // We split by common punctuation that ends a sentence
    let sentences = inner.split(/([.?!]\s+)/);
    let newInner = '';
    
    for (let i = 0; i < sentences.length; i++) {
        let sentence = sentences[i];
        
        // Skip purely punctuation/space elements
        if (sentence.match(/^[.?!]\s+$/)) {
            newInner += sentence;
            continue;
        }
        
        // Strip html tags for word counting
        let textOnly = sentence.replace(/<[^>]+>/g, '');
        let wordCount = (textOnly.match(/\b\w+\b/g) || []).length;
        
        if (wordCount > 20) {
            // Replace first occurrence of ", and ", ", but ", " because " etc.
            let replaced = false;
            sentence = sentence.replace(/,\s+(and|but|so|because|which|while|although)\s+/i, (match, p1) => {
                if (replaced) return match;
                replaced = true;
                let capitalized = p1.charAt(0).toUpperCase() + p1.slice(1);
                return `. ${capitalized} `;
            });
            
            if (!replaced) {
                sentence = sentence.replace(/\s+(and|but|so|because|which|while|although)\s+/i, (match, p1) => {
                    if (replaced) return match;
                    replaced = true;
                    let capitalized = p1.charAt(0).toUpperCase() + p1.slice(1);
                    return `. ${capitalized} `;
                });
            }
        }
        newInner += sentence;
    }
    
    $(el).html(newInner);
  });
  
  return $.html();
}

async function main() {
  const slugs = [
    "xerox-maintenance-kits-fuser-replacement-transfer-rollers",
    "star-micronics-network-setup-utility-app-static-ip-multiple-printers",
    "troubleshooting-legacy-seiko-slp-440-420-240-100-200",
    "nelko-p21-wont-print-bluetooth-errors-app-compatibility",
    "polaroid-hi-print-stuck-on-yellow-print-half-printed-fix"
  ];

  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  console.log(`Found ${articles.length} articles to update.`);

  const updates = articles.map(async (article) => {
    const originalContent = article.content || '';
    const originalWordCount = (originalContent.replace(/<[^>]+>/g, '').match(/\b\w+\b/g) || []).length;
    
    const newContent = rewriteHtml(originalContent);
    const newWordCount = (newContent.replace(/<[^>]+>/g, '').match(/\b\w+\b/g) || []).length;

    await prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });

    console.log(`Updated ${article.slug}: ${originalWordCount} words -> ${newWordCount} words`);
  });

  await Promise.all(updates);
  console.log('All updates complete.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
