import { prisma } from './src/lib/prisma';

async function main() {
  const alexId = '88e8d061-e1be-406d-8fa1-a53f108cc624';

  // 1. Fetch the Mesh Router article and add author
  await prisma.article.update({
    where: { slug: 'printer-wont-connect-mesh-router-band-steering' },
    data: { authorId: alexId }
  });
  console.log("Updated Mesh Router article with author.");

  // 2. Fetch the Epson article
  const epsonArticle = await prisma.article.findUnique({
    where: { slug: 'epson-ecotank-wifi-setup-connection-fixes' }
  });
  
  if (epsonArticle) {
    const models = ['ET-2750', 'ET-2800', 'ET-4760'];
    for (const model of models) {
      await prisma.article.create({
        data: {
          title: `Epson EcoTank ${model} Wi-Fi Setup & Connection Fixes`,
          slug: `epson-ecotank-${model.toLowerCase()}-wifi-setup-connection-fixes`,
          content: epsonArticle.content.replace(/ET-2750, ET-2800, ET-4760/g, model).replace(/ET-2750, ET-2800, and ET-4760/g, model),
          brandId: epsonArticle.brandId,
          categoryId: epsonArticle.categoryId,
          status: 'published',
          wordCount: epsonArticle.wordCount,
          publishedAt: epsonArticle.publishedAt,
          excerpt: epsonArticle.excerpt,
          metaDescription: epsonArticle.metaDescription,
          authorId: alexId,
        }
      });
      console.log(`Created separate Epson article for ${model}`);
    }
    await prisma.article.delete({ where: { id: epsonArticle.id } });
    console.log("Deleted the grouped Epson article.");
  }

  // 3. Fetch the Brother article
  const brotherArticle = await prisma.article.findUnique({
    where: { slug: 'brother-hl-l2300-wifi-connection-deep-sleep-fix' }
  });

  if (brotherArticle) {
    const models = ['HL-L2390DW', 'HL-L2370DW'];
    for (const model of models) {
      await prisma.article.create({
        data: {
          title: `Brother ${model} Wi-Fi Connection & Deep Sleep Offline Fix`,
          slug: `brother-${model.toLowerCase()}-wifi-connection-deep-sleep-fix`,
          content: brotherArticle.content.replace(/HL-L2300 Series/g, model).replace(/HL-L2390DW, HL-L2370DW/g, model),
          brandId: brotherArticle.brandId,
          categoryId: brotherArticle.categoryId,
          status: 'published',
          wordCount: brotherArticle.wordCount,
          publishedAt: brotherArticle.publishedAt,
          excerpt: brotherArticle.excerpt,
          metaDescription: brotherArticle.metaDescription,
          authorId: alexId,
        }
      });
      console.log(`Created separate Brother article for ${model}`);
    }
    await prisma.article.delete({ where: { id: brotherArticle.id } });
    console.log("Deleted the grouped Brother article.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
