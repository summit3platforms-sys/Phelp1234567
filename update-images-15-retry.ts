import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const updates = [
  { slug: 'fix-pantum-internal-error-codes-no1-no3-05-scanner', file: 'fix-pantum-internal-error-codes-no1-no3-05-scanner.jpg' },
  { slug: 'pantum-m6700-bm5200-cm2100-troubleshooting-language-reset', file: 'pantum-m6700-bm5200-cm2100-troubleshooting-language-reset.jpg' },
  { slug: 'seiko-slp-legacy-support-windows-7-mac-compatibility', file: 'seiko-slp-legacy-support-windows-7-mac-compatibility.jpg' },
  { slug: 'how-to-print-star-micronics-self-test-diagnostic-page', file: 'how-to-print-star-micronics-self-test-diagnostic-page.jpg' },
  { slug: 'star-micronics-tsp650-vs-tsp700-which-pos-models-buy', file: 'star-micronics-tsp650-vs-tsp700-which-pos-models-buy.jpg' },
  { slug: 'instax-link-printer-jammed-film-ejection-failure', file: 'instax-link-printer-jammed-film-ejection-failure.jpg' },
  { slug: 'polaroid-hi-print-cartridge-not-recognized-paper-out-fix', file: 'polaroid-hi-print-cartridge-not-recognized-paper-out-fix.jpg' },
  { slug: 'citizen-printer-network-reset-static-ip-configuration', file: 'citizen-printer-network-reset-static-ip-configuration.jpg' },
  { slug: 'rollo-vs-munbyn-thermal-label-printer-comparison', file: 'rollo-vs-munbyn-thermal-label-printer-comparison.jpg' },
  { slug: 'nelko-d810-tattoo-stencil-printer-setup-vs-phomemo-m08f', file: 'nelko-d810-tattoo-stencil-printer-setup-vs-phomemo-m08f.jpg' }
];

async function main() {
  await Promise.all(updates.map(update => 
    prisma.article.update({
      where: { slug: update.slug },
      data: { featuredImage: `/images/articles/${update.file}` }
    })
  ));
  console.log("Updated all 10.");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
