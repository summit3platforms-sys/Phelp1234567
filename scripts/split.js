const fs = require('fs');
const articles = JSON.parse(fs.readFileSync('articles.json', 'utf8'));
articles.forEach(a => {
  fs.writeFileSync(a.slug + '.html', a.content);
});
console.log("Done");
