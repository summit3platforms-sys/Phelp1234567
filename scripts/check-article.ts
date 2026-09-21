import { prisma } from '../src/lib/prisma';
async function main() {
  const a = await prisma.article.findUnique({where: {slug: "brother-printer-wont-connect-to-wlan-access-point"}});
  console.log(a.content.substring(0, 1000));
}
main();
