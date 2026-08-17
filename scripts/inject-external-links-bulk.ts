import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const additionalResourcesHtml = `
<h3 id="additional-resources">Additional Resources</h3>
<p>If you are still experiencing issues after trying the steps above, you may need to consult the official documentation or download the latest firmware for your specific printer model. We recommend checking the following official resources:</p>
<ul>
  <li><a href="https://support.hp.com/" target="_blank" rel="noopener noreferrer">Official HP Customer Support Knowledge Base</a></li>
  <li><a href="https://support.hp.com/us-en/drivers/printers" target="_blank" rel="noopener noreferrer">HP Printer Drivers & Official Software Downloads</a></li>
</ul>
`;

(async () => {
  const hpBrand = await prisma.brand.findUnique({ where: { slug: 'hp' } });
  if (!hpBrand) throw new Error('HP brand not found');
  
  const articles = await prisma.article.findMany({
    where: { 
      brandId: hpBrand.id,
      NOT: {
        content: {
          contains: 'href=\"http'
        }
      }
    },
    select: { id: true, slug: true, title: true, content: true }
  });

  console.log(`Found ${articles.length} articles without external links.`);

  let updatedCount = 0;
  for (const article of articles) {
    const newContent = article.content + '\n\n' + additionalResourcesHtml;
    
    await prisma.article.update({
      where: { id: article.id },
      data: { content: newContent }
    });
    
    updatedCount++;
    console.log(`✅ Added external links to: ${article.slug}`);
  }

  console.log(`\nSuccessfully updated ${updatedCount} articles.`);
  await prisma.$disconnect();
})();
