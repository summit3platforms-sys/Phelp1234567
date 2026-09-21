import { prisma } from '../src/lib/prisma';

async function main() {
  const slugs = ["bixolon-printer-toast-pos-error", "fix-lexmark-toner-errors-code-32-88-cartridge-not-recognized", "is-dascom-a-good-printer-brand-vs-printronix", "hp-photosmart-c4780-driver-windows-10", "fix-lexmark-mobile-print-app-management-errors"];
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  let words = 0;
  articles.forEach(a => {
    words += a.content.split(/\s+/).length;
  });
  console.log('Words after: ' + words);
}

main().catch(console.error).finally(() => prisma.$disconnect());
