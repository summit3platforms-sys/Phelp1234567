import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const mesh = await prisma.article.findFirst({
    where: { slug: 'printer-wont-connect-mesh-router-band-steering' },
    select: { content: true }
  });
  if (mesh) {
    const lines = mesh.content.split('\n');
    console.log('Total lines:', lines.length);
    const matches = lines.filter(l => l.includes('this section provides additional technical context'));
    console.log('Lines containing the sentence:', matches.length);
    console.log('Sample matching lines:');
    matches.slice(0, 5).forEach(m => console.log(' ->', m.trim().substring(0, 100)));
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
