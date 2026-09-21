const fs = require('fs');
const articles = JSON.parse(fs.readFileSync('articles_my_dump.json'));
articles.forEach(a => fs.writeFileSync(a.slug + '.html', a.content));
