import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Fixing articles where author and reviewer are the same...');
  
  // 1. Fetch all authors
  const authors = await prisma.author.findMany();
  
  if (authors.length < 2) {
    console.error('Need at least 2 authors to make author and reviewer different.');
    process.exit(1);
  }

  // 2. Find all articles where authorId == reviewerId
  // Prisma doesn't have a direct way to compare two columns in a single where clause for equality without raw SQL,
  // so we'll fetch all articles with reviewers and filter in memory since the dataset is small (~150).
  const articles = await prisma.article.findMany({
    where: {
      reviewerId: {
        not: null
      }
    },
    select: {
      id: true,
      slug: true,
      authorId: true,
      reviewerId: true,
    }
  });

  const conflicts = articles.filter(a => a.authorId === a.reviewerId);
  console.log(`Found ${conflicts.length} articles with the same author and reviewer.`);

  // 3. Fix conflicts
  for (const article of conflicts) {
    // Find authors who are not the author of this article
    const eligibleReviewers = authors.filter(author => author.id !== article.authorId);
    
    // Pick a random eligible reviewer
    const randomReviewer = eligibleReviewers[Math.floor(Math.random() * eligibleReviewers.length)];
    
    await prisma.article.update({
      where: { id: article.id },
      data: {
        reviewerId: randomReviewer.id
      }
    });
    
    console.log(`✅ Fixed article: ${article.slug}`);
    console.log(`   Author: ${article.authorId}`);
    console.log(`   New Reviewer: ${randomReviewer.id}`);
  }

  console.log('Done!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
