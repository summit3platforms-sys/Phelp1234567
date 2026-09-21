import * as cheerio from 'cheerio';

const html = `<h2>Why This Happens</h2><p>The root causes of calibration and label sizing issues with thermal printers like the Rollo usually stem from a mismatch between the physical labels inserted into the device and the digital settings configured within your operating system or printing software.</p>`;

const $ = cheerio.load(html, null, false); // false for no html/head/body wrapper

function processText(text: string) {
    // just a test
    return text.replace(/mismatch/g, "HUGE MISMATCH");
}

function traverse(node: any) {
    if (node.type === 'text') {
        node.data = processText(node.data);
    } else if (node.type === 'tag') {
        node.children.forEach(traverse);
    }
}

$.root().contents().each((_, el) => traverse(el));

console.log($.html());
