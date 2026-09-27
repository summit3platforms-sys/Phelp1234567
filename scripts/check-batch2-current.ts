import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const slugs = [
    'epson-ecotank-et-4760-wifi-setup-connection-fixes',
    'epson-ecotank-et-2800-wifi-setup-connection-fixes',
    'epson-ecotank-et-2750-wifi-setup-connection-fixes',
    'canon-printer-5b00-vs-1700-difference',
    'canon-pixma-ts3522-not-printing',
    'instax-connect-ar-print-not-working-troubleshooting',
    'instax-link-app-crashing-compatibility-permissions-fix',
    'fix-seiko-slp-manager-software-printer-not-responding-stuck',
    'seiko-slp-advanced-driver-fixes-registry-idle-polling-silent-install',
    'fix-citizen-printer-overheating-cooling-pause-dense-text'
  ];

  for (const slug of slugs) {
    const a = await prisma.article.findUnique({
      where: { slug },
      select: { id: true, slug: true, status: true, title: true, wordCount: true }
    });
    console.log(slug, '->', a ? { id: a.id, status: a.status, wordCount: a.wordCount, title: a.title } : 'NOT FOUND');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
