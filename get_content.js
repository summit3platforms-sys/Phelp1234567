const fs = require('fs');
const articles = JSON.parse(fs.readFileSync('articles.json', 'utf8'));
articles.forEach((a, i) => {
  fs.writeFileSync(`article_${i}.html`, a.content);
  console.log(`Article ${i}: ${a.slug} (Word count: ${a.content.split(/\s+/).length})`);
});
