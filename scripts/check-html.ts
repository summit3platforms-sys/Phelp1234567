import { prisma } from '../src/lib/prisma';
async function main() {
  const article = await prisma.article.findFirst({
    where: { slug: "hp-smart-tank-5101-printhead-error" }
  });
  console.log(article?.content.substring(0, 100));
}
main();
