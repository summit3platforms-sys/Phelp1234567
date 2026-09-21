import * as cheerio from 'cheerio';
const html = "<p>Brother printer <strong>error 40</strong> is the mirror image of the too cold error, and it stops itself before that becomes a real problem.</p>";
const $ = cheerio.load(html, null, false);

function processTextNode(node) {
    if (node.type === 'text') {
        let text = node.data;
        // logic to rewrite
        text = text.replace(/, and /g, '. And ');
        node.data = text;
    } else if (node.children) {
        node.children.forEach(processTextNode);
    }
}
$.root().contents().each((_, el) => processTextNode(el));
console.log($.html());
