import { prisma } from '../src/lib/prisma';
async function main() {
  const articles = await prisma.article.findMany({
    where: {
      slug: {
        in: [
          "hp-printer-error-13-20-paper-jam",
          "dascom-pos-printer-cash-drawer-not-opening",
          "dymo-labelwriter-printing-blank-labels-skipping",
          "hp-officejet-pro-9130e-error",
          "canon-maxify-mb2720-error"
        ]
      }
    }
  });
  console.log(JSON.stringify(articles, null, 2));
}
main().catch(console.error);
