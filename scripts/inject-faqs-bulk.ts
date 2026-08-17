import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async () => {
  const articles = await prisma.article.findMany({
    where: { 
      OR: [
        { faqs: null },
        { faqs: '' },
        { faqs: '[]' }
      ]
    },
    select: { id: true, slug: true, title: true, brand: true }
  });

  console.log(`Found ${articles.length} articles without FAQs.`);

  let updatedCount = 0;
  for (const article of articles) {
    const brandName = article.brand?.name || 'Printer';
    
    // Generate dynamic generic FAQs based on the title and brand
    const faqsArray = [
      {
        question: `How do I fix issues related to ${article.title.replace(/\?.*$/, '')}?`,
        answer: `The most common fixes involve checking your connections, updating your firmware, and following the specific troubleshooting steps outlined in this guide. Always ensure your ${brandName} device is connected to a stable network.`
      },
      {
        question: `How do I perform a hard reset on my ${brandName} printer?`,
        answer: `To perform a hard reset, turn on the printer, unplug the power cord from the back of the printer and the wall outlet, wait 60 seconds, and plug it back in. Turn the printer back on if it doesn't power up automatically.`
      },
      {
        question: `Where can I find official drivers and software for my ${brandName} printer?`,
        answer: `Always download the latest drivers, firmware, and software directly from the official ${brandName} customer support website to ensure compatibility and security.`
      }
    ];
    
    await prisma.article.update({
      where: { id: article.id },
      data: { faqs: JSON.stringify(faqsArray) }
    });
    
    updatedCount++;
    console.log(`✅ Added FAQs to: ${article.slug}`);
  }

  console.log(`\nSuccessfully updated ${updatedCount} articles with FAQ schema.`);
  await prisma.$disconnect();
})();
