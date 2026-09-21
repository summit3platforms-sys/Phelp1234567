import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const authors = await prisma.author.findMany();
  if (authors.length === 0) return;

  const noAuthorArticles = await prisma.article.findMany({
    where: { authorId: null }
  });

  console.log(`Assigning authors to ${noAuthorArticles.length} articles...`);

  for (let i = 0; i < noAuthorArticles.length; i++) {
    const article = noAuthorArticles[i];
    // Randomly select an author
    const author = authors[i % authors.length];
    
    // Optionally assign a reviewer
    const reviewer = authors[(i + 1) % authors.length];

    // Give it a reviewedAt date sometime in the last 2 months
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 60));

    await prisma.article.update({
      where: { id: article.id },
      data: {
        authorId: author.id,
        reviewerId: reviewer.id,
        reviewedAt: date
      }
    });
  }
  
  console.log('Done assigning authors and reviewers!');
}

main().finally(() => prisma.$disconnect());
