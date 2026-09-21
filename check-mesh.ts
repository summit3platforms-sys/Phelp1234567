import { prisma } from './src/lib/prisma';
async function main() {
  const mesh = await prisma.article.findUnique({ where: { slug: 'printer-wont-connect-mesh-router-band-steering' } });
  console.log(mesh ? "Found Mesh article" : "Mesh article NOT found");

  const brother = await prisma.article.findUnique({ where: { slug: 'brother-hl-l2300-wifi-connection-deep-sleep-fix' } });
  console.log(brother ? "Found Brother article" : "Brother article NOT found");
}
main().finally(() => prisma.$disconnect());
