import * as cheerio from 'cheerio';
const html = "<p>Brother printer error 40 is the mirror image of the too cold error and it stops itself before that becomes a real problem.</p>";
const $ = cheerio.load(html);
$('p').each((i, el) => {
    let text = $(el).text();
    text = text.replace(/(\w+)(\s+and\s+)(\w+)/, (match, p1, p2, p3) => {
        return p1 + '. ' + p3.charAt(0).toUpperCase() + p3.slice(1);
    });
    $(el).text(text);
});
console.log($.html());
