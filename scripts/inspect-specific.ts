import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const mesh = await prisma.article.findFirst({
    where: { slug: 'printer-wont-connect-mesh-router-band-steering' },
    select: { content: true }
  });
  if (mesh) {
    console.log('Mesh article content length:', mesh.content.length);
    const count = (mesh.content.match(/this section provides additional technical context/gi) || []).length;
    console.log('Repeated phrase count in mesh article:', count);
    const idx = mesh.content.indexOf('this section provides additional technical context');
    console.log('Snippet around repeated phrase:\n', mesh.content.substring(idx - 100, idx + 400));
  }

  const brother = await prisma.article.findFirst({
    where: { slug: 'brother-printer-error-51-laser-unit' },
    select: { content: true, faqs: true }
  });
  if (brother) {
    console.log('\nBrother article details count in content:', (brother.content.match(/<details/gi) || []).length);
    console.log('Brother faqs field:', brother.faqs ? JSON.parse(brother.faqs as string).length : 0);
    const idx = brother.content.indexOf('<details');
    if (idx !== -1) {
      console.log('Brother content around <details>:\n', brother.content.substring(idx - 100, idx + 300));
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
