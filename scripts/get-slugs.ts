import { prisma } from '../src/lib/prisma';
async function main() {
  const slugs = [
    "hp-color-laserjet-m283fdw-error-59",
    "citizen-cl-s-series-guide-521-621-631-700",
    "epson-xp-4100-et-2400-wifi-setup",
    "hp-smart-tank-5101-printhead-error",
    "fix-xerox-010-paper-jams-duplex-errors-door-jams"
  ];
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } },
    select: { slug: true, content: true }
  });
  console.log(JSON.stringify(articles.map(a => a.slug)));
}
main();
