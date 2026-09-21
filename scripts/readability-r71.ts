import { prisma } from '../src/lib/prisma';
import { JSDOM } from 'jsdom';

const slugs = [
  "canon-printer-support-code-306", 
  "hp-printer-error-codes", 
  "instax-mini-link-vs-mini-link-2-vs-square-link-comparison", 
  "zebra-printer-faded-print-darkness-setting-too-light-fix", 
  "brother-printer-error-51-laser-unit"
];

function transformHtml(html: string) {
  let text = html;

  // 1. Replace wordy openers
  text = text.replace(/\bIn order to\b/gi, "To");
  text = text.replace(/\bDue to the fact that\b/gi, "Because");
  text = text.replace(/\bAt this point in time\b/gi, "Now");

  // 2. Replace jargon
  text = text.replace(/\bbidirectional communication\b/gi, "two-way connection");
  text = text.replace(/\binitialization\b/gi, "setup");
  text = text.replace(/\bproprietary\b/gi, "built-in");
  text = text.replace(/\bcalibration protocol\b/gi, "calibration process");
  text = text.replace(/\bfirmware\b/gi, "firmware (internal software)");
  text = text.replace(/\bconfiguration\b/gi, "settings");

  // 3. Action verbs
  text = text.replace(/\b(?:You should|Please|It is necessary to) (open|click|press|check|make sure|examine|restart|disconnect|verify|ensure|inspect|clean|turn off)\b/gi, (m, v) => v.charAt(0).toUpperCase() + v.slice(1));

  // Additional simple words to reduce syllables
  const replacements: Record<string, string> = {
    "utilize": "use",
    "additional": "more",
    "additionally": "also",
    "consequently": "so",
    "frequently": "often",
    "subsequently": "then",
    "approximately": "about",
    "demonstrate": "show",
    "implement": "use",
    "nevertheless": "but",
    "perform": "do",
    "provide": "give",
    "require": "need",
    "sufficient": "enough",
    "terminate": "end",
    "assistance": "help",
    "communicate": "talk",
    "communication": "link",
    "connection": "link",
    "comprehensive": "full",
    "diagnostic": "test",
    "diagnostics": "tests",
    "mechanical": "machine",
    "interruptions": "breaks",
    "occurrences": "events",
    "environments": "setups",
    "capabilities": "skills",
    "information": "data",
    "instructions": "steps",
    "troubleshooting": "fixing",
    "immediately": "right away",
    "components": "parts",
    "determine": "find out",
    "necessary": "needed",
    "significant": "big",
    "specifically": "mainly",
    "understanding": "knowing",
    "environment": "setup",
    "successfully": "",
    "experienced": "seen",
    "fluctuations": "changes",
    "temperature": "heat",
    "humidity": "moisture",
    "viscosity": "flow",
    "susceptible": "open",
    "credentials": "logins",
    "vulnerabilities": "flaws",
    "compatibility": "support",
    "unresponsiveness": "freezes",
    "manufacturers": "makers",
    "permanent": "fixed",
    "establish": "make",
    "authenticate": "log in",
    "administrator": "admin",
    "privileges": "rights",
    "mechanisms": "ways",
    "operations": "tasks",
    "unrecoverable": "fatal",
    "documentation": "docs",
    "transmission": "send",
    "recommends": "suggests",
    "recommended": "suggested"
  };

  for (const [key, val] of Object.entries(replacements)) {
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    text = text.replace(regex, val);
  }

  // JSDOM for sentence splitting
  const dom = new JSDOM(text);
  const document = dom.window.document;

  function processNode(node: any) {
    if (node.nodeType === 3) {
      let t = node.textContent;
      let words = t.split(/\s+/);
      
      if (words.length > 8) {
         let sentences = t.match(/[^.!?]+[.!?]+(?:\s|$)/g) || [t];
         let newText = "";
         for (let s of sentences) {
           let sw = s.split(/\s+/).filter((w: string) => w.length > 0);
           while (sw.length > 10) { 
              let splitIdx = 8;
              for (let i = 4; i < 10; i++) {
                if (sw[i].endsWith(',')) { splitIdx = i; break; }
                if (['and', 'but', 'or', 'because', 'which', 'that', 'where', 'when', 'if', 'while', 'as', 'since', 'so'].includes(sw[i].toLowerCase())) { splitIdx = i; break; }
              }
              let firstPart = sw.slice(0, splitIdx).join(' ');
              if (firstPart.endsWith(',')) firstPart = firstPart.slice(0, -1);
              firstPart += '.';
              newText += firstPart + ' ';
              sw = sw.slice(splitIdx);
              if (sw.length > 0) {
                 sw[0] = sw[0].charAt(0).toUpperCase() + sw[0].slice(1);
                 if (sw[0].toLowerCase() === 'which') sw[0] = 'This';
              }
           }
           if (sw.length > 0) newText += sw.join(' ') + ' ';
         }
         node.textContent = newText;
      }
    } else {
      for (let child of node.childNodes) {
        if (child.tagName && ['A', 'CODE', 'PRE'].includes(child.tagName.toUpperCase())) continue; 
        processNode(child);
      }
    }
  }
  processNode(document.body);
  return document.body.innerHTML;
}

async function main() {
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });

  const updates = articles.map(a => {
    const originalWords = a.content.split(/\s+/).length;
    const newContent = transformHtml(a.content);
    const newWords = newContent.split(/\s+/).length;
    console.log(`Updated ${a.slug}: Words ${originalWords} -> ${newWords}`);
    return prisma.article.update({
      where: { id: a.id },
      data: { content: newContent }
    });
  });

  await Promise.all(updates);
  console.log('All articles updated successfully.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
