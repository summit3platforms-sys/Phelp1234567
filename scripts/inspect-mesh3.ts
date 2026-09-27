import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const mesh = await prisma.article.findFirst({
    where: { slug: 'printer-wont-connect-mesh-router-band-steering' },
    select: { content: true }
  });
  if (mesh) {
    const idx = mesh.content.indexOf('This section provides additional technical context');
    const lastIdx = mesh.content.lastIndexOf('This section provides additional technical context');
    console.log('First index:', idx);
    console.log('Last index:', lastIdx);
    console.log('Total length:', mesh.content.length);
    console.log('Content after the repeated padding block:\n', mesh.content.substring(lastIdx + 150));
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
