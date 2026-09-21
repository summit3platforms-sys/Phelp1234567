const { PrismaClient } = require('@prisma/client');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const fakeDbPath = path.resolve('../dev.db');
const db = new sqlite3.Database(fakeDbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the fake database.');
});

db.get(`SELECT * FROM Article WHERE slug = 'brother-hl-l2300-wifi-connection-deep-sleep-fix'`, async (err, row) => {
  if (err) {
    console.error(err.message);
  }
  if (!row) {
    console.log("Brother article not found in fake DB!");
    return;
  }
  console.log("Found Brother article in fake DB.");
  
  const prisma = new PrismaClient();
  const alexId = '88e8d061-e1be-406d-8fa1-a53f108cc624';
  const brotherId = '932bf0f5-0256-4fb6-ad10-3098241e0ec1';
  const catId = 'c3a92d93-fcbb-439c-a11e-80cde3d2a5ce';

  const models = ['HL-L2390DW', 'HL-L2370DW'];
  for (const model of models) {
    await prisma.article.create({
      data: {
        title: `Brother ${model} Wi-Fi Connection & Deep Sleep Offline Fix`,
        slug: `brother-${model.toLowerCase()}-wifi-connection-deep-sleep-fix`,
        content: row.content.replace(/HL-L2300 Series/gi, model).replace(/HL-L2390DW, HL-L2370DW/gi, model),
        brandId: brotherId,
        categoryId: catId,
        status: 'published',
        wordCount: row.wordCount,
        publishedAt: new Date(row.publishedAt),
        excerpt: row.excerpt,
        metaDescription: row.metaDescription,
        authorId: alexId,
      }
    });
    console.log(`Created separate Brother article for ${model} in REAL DB.`);
  }

  await prisma.$disconnect();
  db.close();
});
