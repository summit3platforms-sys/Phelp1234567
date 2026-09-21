const fs = require('fs');
const articles = JSON.parse(fs.readFileSync('articles.json', 'utf8'));
const slugs = [
    "phomemo-printer-feeds-prints-blank-paper-orientation",
    "zebra-zpl-vs-epl-difference-configuration-format-guide",
    "hp-laserjet-m15w-fuser-error",
    "canon-print-app-not-detecting-printer",
    "hp-laserjet-m111w-offline-fix"
];
articles.forEach(a => {
  if (slugs.includes(a.slug)) {
    fs.writeFileSync(a.slug + '.html', a.content);
    console.log("Wrote " + a.slug);
  }
});
