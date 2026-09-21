import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const slugs = [
    "primera-bravo-se-vs-pro-firmware-update-failed-signature-composer",
    "hp-sprocket-vs-instax-mini-link-comparison",
    "kodak-easyshare-printer-dock-series-3-troubleshooting",
    "dymo-labelwriter-550-not-printing-power-adapter",
    "epson-controller-error-printer-fix"
  ];
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } }
  });
  console.log(JSON.stringify(articles, null, 2));
}
main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
