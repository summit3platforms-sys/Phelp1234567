import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function run() {
  console.log("=== Step 1: Updating fake avatar URLs to local images ===");
  
  await prisma.author.update({
    where: { slug: "marcus-vance" },
    data: { image: "/images/authors/marcus-vance.jpg" }
  });
  console.log("Updated Marcus Vance avatar");

  await prisma.author.update({
    where: { slug: "elena-rodriguez" },
    data: { image: "/images/authors/elena-rodriguez.jpg" }
  });
  console.log("Updated Elena Rodriguez avatar");

  await prisma.author.update({
    where: { slug: "david-chen" },
    data: { image: "/images/authors/david-chen.jpg" }
  });
  console.log("Updated David Chen avatar");

  console.log("\n=== Step 2: Staggering publishedAt timestamps ===");
  
  const articles = await prisma.article.findMany({
    select: { id: true },
    orderBy: [{ brand: { slug: "asc" } }, { createdAt: "asc" }]
  });

  console.log(`Found ${articles.length} articles to stagger`);

  const startDate = new Date("2025-09-15T08:00:00Z");
  const endDate = new Date("2026-09-08T18:00:00Z");
  const totalMs = endDate.getTime() - startDate.getTime();

  function nextSlot(index: number): Date {
    const baseIntervalMs = totalMs / articles.length;
    const jitterMs = (Math.random() - 0.5) * baseIntervalMs * 0.4;
    let d = new Date(startDate.getTime() + baseIntervalMs * index + jitterMs);
    while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
    d.setUTCHours(8 + Math.floor(Math.random() * 9), Math.floor(Math.random() * 60), 0, 0);
    if (d < startDate) return startDate;
    if (d > endDate) return endDate;
    return d;
  }

  let updated = 0;
  for (let i = 0; i < articles.length; i++) {
    await prisma.article.update({
      where: { id: articles[i].id },
      data: { publishedAt: nextSlot(i) }
    });
    updated++;
    if (updated % 50 === 0) console.log(`  Staggered ${updated}/${articles.length}...`);
  }
  console.log(`Staggered all ${updated} publishedAt timestamps`);

  console.log("\n=== Step 3: Clearing fake review metadata ===");
  const cleared = await prisma.article.updateMany({
    data: { difficultyLevel: null, timeToFix: null }
  });
  console.log(`Cleared fake difficulty/timeToFix from ${cleared.count} articles`);

  console.log("\n=== Verification ===");
  const authors = await prisma.author.findMany({ select: { name: true, image: true } });
  authors.forEach(a => console.log(`  ${a.name}: ${a.image}`));
  
  const earliest = await prisma.article.findMany({ take: 3, orderBy: { publishedAt: "asc" }, select: { publishedAt: true } });
  const latest = await prisma.article.findMany({ take: 3, orderBy: { publishedAt: "desc" }, select: { publishedAt: true } });
  console.log("  Earliest dates:", earliest.map(a => a.publishedAt));
  console.log("  Latest dates:", latest.map(a => a.publishedAt));
}

run()
  .then(() => { console.log("\nAll DB AI signals removed!"); prisma.$disconnect(); })
  .catch((e) => { console.error("Error:", e); prisma.$disconnect(); process.exit(1); });
