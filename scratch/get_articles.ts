import { prisma } from '../src/lib/prisma';
import fs from 'fs';

async function main() {
  const slugs = [
    "hp-officejet-pro-9015e-error-0x610000f6", 
    "dymo-printer-error-printing-message-not-printing", 
    "phomemo-m02-vs-m02-pro-t02-comparison-m02s-fixes", 
    "fix-xerox-016-error-web-server-cloud-connections", 
    "zebra-zq520-setup-gk420d-driver-windows-11"
  ];
  const articles = await prisma.article.findMany({
    where: { slug: { in: slugs } },
    select: { slug: true, content: true }
  });
  fs.writeFileSync('scratch/articles.json', JSON.stringify(articles, null, 2));
  console.log("Done");
}

main().catch(console.error);
