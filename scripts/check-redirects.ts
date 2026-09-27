import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const redirs = await prisma.redirect.findMany({
    where: {
      oldUrl: {
        contains: 'brother-hl-l2390dw-wifi-connection-deep-sleep-fix'
      }
    }
  });
  console.log('Redirects for #2:', redirs);
}

main().catch(console.error).finally(() => prisma.$disconnect());
