const fs = require('fs');
const arts = JSON.parse(fs.readFileSync('articles.json'));
arts.forEach((a, i) => {
  fs.writeFileSync(`article_${i}.json`, JSON.stringify(a, null, 2));
});
