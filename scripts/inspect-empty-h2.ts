import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const slugs = [
    'hp-officejet-pro-9015e-error-0x610000f6',
    'phomemo-m02-vs-m02-pro-t02-comparison-m02s-fixes',
    'zebra-zq520-setup-gk420d-driver-windows-11',
    'dymo-printer-error-printing-message-not-printing'
  ];

  for (const slug of slugs) {
    const a = await prisma.article.findFirst({
      where: { slug },
      select: { content: true }
    });
    if (a) {
      const emptyH2 = (a.content.match(/<h2[^>]*>\s*<\/h2>/gi) || []).length;
      console.log(`${slug}: ${emptyH2} empty <h2> tags`);
      const idx = a.content.indexOf('<h2></h2>');
      if (idx !== -1) {
        console.log('Snippet around first empty <h2>:\n', a.content.substring(Math.max(0, idx - 50), idx + 100));
      }
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
