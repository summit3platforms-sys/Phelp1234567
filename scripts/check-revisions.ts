import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const ids = [
    '3eab560a-be9e-425f-aac5-18a61e2d5c08',
    '9256c197-8f0d-413a-9361-1d0df30d1a89',
    '053e2694-3bc9-49a4-a438-eba0bf4498b9',
    '905cd518-9183-4a75-89fc-e19cbcd83ed8',
    '5e2e5134-8e09-44c9-a783-16c4cad513b2'
  ];

  for (const articleId of ids) {
    const revs = await prisma.revision.findMany({
      where: { articleId },
      orderBy: { version: 'desc' },
      take: 1
    });
    console.log(articleId, 'latest revision:', revs[0] ? revs[0].version : 'none');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
