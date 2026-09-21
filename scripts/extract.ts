import fs from 'fs';
const data = JSON.parse(fs.readFileSync('scripts/dump.json', 'utf8'));
data.forEach((article: any) => {
  fs.writeFileSync(`scripts/${article.slug}.html`, article.content);
});
