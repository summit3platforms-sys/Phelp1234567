import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const slugs = [
    "rollo-printer-driver-download-install-guide",
    "dascom-printer-skipping-characters-grinding",
    "lexmark-fuser-kits-128-121-errors-overheating",
    "bixolon-sdk-printer-open-error",
    "hp-officejet-6500-wireless-setup-windows-11"
  ];

  const updatePromises = slugs.map(async (slug) => {
    const filePath = path.join(process.cwd(), 'working', `${slug}_new.html`);
    const oldFilePath = path.join(process.cwd(), 'working', `${slug}.html`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping ${slug} - new file not found`);
      return;
    }
    
    const newContent = fs.readFileSync(filePath, 'utf-8');
    const oldContent = fs.readFileSync(oldFilePath, 'utf-8');
    
    // Count words roughly
    const countWords = (str: string) => str.replace(/<[^>]*>?/gm, '').split(/\s+/).filter(Boolean).length;
    
    const oldWordCount = countWords(oldContent);
    const newWordCount = countWords(newContent);

    await prisma.article.update({
      where: { slug },
      data: { content: newContent }
    });

    console.log(`Updated ${slug}: Word count ${oldWordCount} -> ${newWordCount}`);
  });

  await Promise.all(updatePromises);
  console.log("All articles updated successfully.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
