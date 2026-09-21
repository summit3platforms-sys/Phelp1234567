import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

const slugs = [
  "primera-print-job-disappears-ptpublisher-not-printing-firmware",
  "seiko-slp-networking-serial-adapters-baud-rates-multi-printer",
  "phomemo-printhead-cleaning-guide-faint-lines-residue",
  "hp-photosmart-c4780-troubleshooting",
  "brother-printer-error-ts-01"
];

function processText(text: string): string {
  // 4. Wordy openers
  text = text.replace(/\bIn order to\b/ig, "To");
  text = text.replace(/\bDue to the fact that\b/ig, "Because");
  text = text.replace(/\bAt this point in time\b/ig, "Now");
  
  // 3. Action verbs
  text = text.replace(/\b(You should|You need to|It is necessary to|You can|You must|We recommend that you)\s+open\b/ig, "Open");
  text = text.replace(/\b(You should|You need to|It is necessary to|You can|You must)\s+click\b/ig, "Click");
  text = text.replace(/\b(You should|You need to|It is necessary to|You can|You must)\s+press\b/ig, "Press");
  text = text.replace(/\b(You should|You need to|It is necessary to|You can|You must)\s+check\b/ig, "Check");
  text = text.replace(/\b(It is important to|You should|You need to|You must)\s+make sure\b/ig, "Make sure");

  // 2. Jargon
  text = text.replace(/\bbidirectional communication\b/ig, "two-way connection");
  text = text.replace(/\binitialization\b/ig, "setup");
  text = text.replace(/\bproprietary\b/ig, "built-in");
  text = text.replace(/\bcalibration protocol\b/ig, "calibration process");
  
  // Avoid double replacing firmware (internal software)
  text = text.replace(/\bfirmware(?!\s*\(internal software\))/ig, "firmware (internal software)");
  text = text.replace(/\bconfiguration\b/ig, "settings");

  // 1. Break sentences over 20 words
  let sentences = text.split(/(?<=[.?!])\s+(?=[A-Z])/);
  sentences = sentences.map(s => {
    let words = s.split(/\s+/);
    if (words.length > 20) {
      const splitMatches = [
        /(,\s+and\s+)/i,
        /(,\s+but\s+)/i,
        /(,\s+so\s+)/i,
        /(,\s+which\s+)/i,
        /(\s+because\s+)/i,
        /(,\s+or\s+)/i,
        /(,\s+)/
      ];

      for (let regex of splitMatches) {
        let parts = s.split(regex);
        if (parts.length > 2) {
          for (let i = 1; i < parts.length; i += 2) {
            let before = parts.slice(0, i).join('');
            let match = parts[i];
            let after = parts.slice(i + 1).join('');
            
            if (before.split(/\s+/).length > 5 && after.split(/\s+/).length > 5) {
                let newStart = after.trim();
                newStart = newStart.charAt(0).toUpperCase() + newStart.slice(1);
                
                if (match.toLowerCase().includes('which')) {
                    newStart = 'This ' + newStart;
                } else if (match.toLowerCase().includes('and')) {
                    newStart = 'And ' + newStart;
                } else if (match.toLowerCase().includes('but')) {
                    newStart = 'But ' + newStart;
                } else if (match.toLowerCase().includes('so')) {
                    newStart = 'So ' + newStart;
                } else if (match.toLowerCase().includes('or')) {
                    newStart = 'Or ' + newStart;
                } else if (match.toLowerCase().includes('because')) {
                    newStart = 'Because ' + newStart;
                }
                
                return before.trim().replace(/,$/, '') + '. ' + newStart;
            }
          }
        }
      }
      
      let firstPart = words.slice(0, 12).join(' ');
      let secondPart = words.slice(12).join(' ');
      secondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
      return firstPart + '. ' + secondPart;
    }
    return s;
  });

  return sentences.join(' ');
}

function processHTML(html: string): string {
    const $ = cheerio.load(html, null, false);
    
    function processNode(node: any) {
        if (node.type === 'text') {
            if (node.data && /[a-zA-Z]/.test(node.data)) {
                node.data = processText(node.data);
            }
        } else if (node.type === 'tag' || node.type === 'root') {
            if (node.name !== 'script' && node.name !== 'style') {
                if (node.children) {
                    for (let child of node.children) {
                        processNode(child);
                    }
                }
            }
        }
    }

    if ($.root()[0] && $.root()[0].children) {
        for (let child of $.root()[0].children) {
            processNode(child);
        }
    }
    
    return $.html();
}

async function run() {
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  const updates = articles.map(article => {
    const originalContent = article.content || '';
    const beforeWordCount = originalContent.split(/\s+/).length;
    
    const newContent = processHTML(originalContent);
    const afterWordCount = newContent.split(/\s+/).length;

    console.log(`[${article.slug}] Before: ${beforeWordCount} words | After: ${afterWordCount} words`);

    return prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
  });

  await Promise.all(updates);
  console.log('Successfully updated all articles.');
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
