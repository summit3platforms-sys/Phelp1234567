import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const mesh = await prisma.article.findFirst({
    where: { slug: 'printer-wont-connect-mesh-router-band-steering' },
    select: { content: true }
  });
  if (mesh) {
    const matches = [...mesh.content.matchAll(/this section provides additional technical context/gi)];
    console.log('Matches length:', matches.length);
    if (matches.length > 0) {
      console.log('Match 0 index:', matches[0].index);
      console.log('Match 0 string:', matches[0][0]);
      console.log('Surrounding HTML:\n', mesh.content.substring(matches[0].index! - 50, matches[0].index! + 300));
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
