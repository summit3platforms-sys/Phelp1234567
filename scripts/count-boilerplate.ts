import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    select: { slug: true, content: true, brand: { select: { name: true } } },
    where: { status: 'published' }
  });

  const boilerplateA = "directly addressing a common point of failure";
  const boilerplateB = "wait for at least 60 seconds to allow the internal capacitors to discharge";
  
  const matchesA = articles.filter(a => a.content.includes(boilerplateA));
  const matchesB = articles.filter(a => a.content.includes(boilerplateB));

  console.log(`Articles with boilerplate phrase A ("directly addressing a common point of failure"): ${matchesA.length}`);
  console.log(`Articles with boilerplate phrase B ("wait for at least 60 seconds..."): ${matchesB.length}`);

  const union = new Set([...matchesA.map(a => a.slug), ...matchesB.map(a => a.slug)]);
  console.log(`Total unique articles containing expand template step boilerplate: ${union.size}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
