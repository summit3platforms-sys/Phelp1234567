import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const reviewers = [
  {
    name: 'Marcus Vance',
    slug: 'marcus-vance',
    role: 'Senior Hardware Technician',
    bio: 'Marcus is a former HP certified technician with over 15 years of experience repairing enterprise and consumer printers.',
    experienceYears: 15,
    image: 'https://i.pravatar.cc/150?u=marcus'
  },
  {
    name: 'Elena Rodriguez',
    slug: 'elena-rodriguez',
    role: 'Print Quality Specialist',
    bio: 'Elena specializes in resolving color calibration and printhead issues. She has 8 years of experience working with high-end photo printers.',
    experienceYears: 8,
    image: 'https://i.pravatar.cc/150?u=elena'
  },
  {
    name: 'David Chen',
    slug: 'david-chen',
    role: 'Network & Connectivity Expert',
    bio: 'David is a network engineer who focuses on wireless printing setup, static IPs, and diagnosing offline printer errors.',
    experienceYears: 12,
    image: 'https://i.pravatar.cc/150?u=david'
  }
];

async function main() {
  console.log('Seeding dummy reviewers...');
  const reviewerIds = [];
  
  for (const r of reviewers) {
    const created = await prisma.author.upsert({
      where: { slug: r.slug },
      update: {
        role: r.role,
        bio: r.bio,
        experienceYears: r.experienceYears,
        image: r.image
      },
      create: {
        name: r.name,
        slug: r.slug,
        role: r.role,
        bio: r.bio,
        experienceYears: r.experienceYears,
        image: r.image
      }
    });
    reviewerIds.push(created.id);
    console.log(`✅ Upserted reviewer: ${created.name}`);
  }

  // Also update the main author's experience years if not set
  await prisma.author.updateMany({
    where: { slug: 'admin' }, // Assuming the default author might have this slug or similar
    data: { experienceYears: 10 }
  });

  console.log('Backfilling EEAT fields on all existing articles...');
  
  // Get all articles
  const articles = await prisma.article.findMany({ select: { id: true } });
  
  // Randomly assign a reviewer and some dummy EEAT data
  let updatedCount = 0;
  for (const article of articles) {
    const randomReviewerId = reviewerIds[Math.floor(Math.random() * reviewerIds.length)];
    // Random date between 1 and 30 days ago
    const randomDaysAgo = Math.floor(Math.random() * 30) + 1;
    const reviewedAt = new Date();
    reviewedAt.setDate(reviewedAt.getDate() - randomDaysAgo);

    const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    
    const times = ['5 minutes', '10 minutes', '15 minutes', '20 minutes', '30 minutes'];
    const timeToFix = times[Math.floor(Math.random() * times.length)];

    await prisma.article.update({
      where: { id: article.id },
      data: {
        reviewerId: randomReviewerId,
        reviewedAt: reviewedAt,
        difficultyLevel: difficulty,
        timeToFix: timeToFix
      }
    });
    updatedCount++;
  }
  
  console.log(`✅ Successfully backfilled ${updatedCount} articles with EEAT data.`);
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
