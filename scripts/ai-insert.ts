import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

function generateSlug(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Please provide a path to the JSON file.');
    process.exit(1);
  }

  const jsonPath = path.resolve(args[0]);
  if (!fs.existsSync(jsonPath)) {
    console.error(`File not found: ${jsonPath}`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  const {
    title,
    brand,
    category,
    errorCode,
    printerModel,
    content,
    featuredImage,
    tags,
    seoTitle,
    metaDescription,
  } = data;

  if (!title || !brand || !category || !content) {
    console.error('Missing required fields: title, brand, category, content.');
    process.exit(1);
  }

  // 1. Check if brand exists, else create
  const brandSlug = generateSlug(brand);
  let brandRecord = await prisma.brand.findUnique({ where: { slug: brandSlug } });
  if (!brandRecord) {
    brandRecord = await prisma.brand.create({
      data: { name: brand, slug: brandSlug },
    });
    console.log(`Created new brand: ${brand}`);
  }

  // 2. Check if category exists, else create
  const categorySlug = generateSlug(category);
  let categoryRecord = await prisma.category.findUnique({ where: { slug: categorySlug } });
  if (!categoryRecord) {
    categoryRecord = await prisma.category.create({
      data: { name: category, slug: categorySlug },
    });
    console.log(`Created new category: ${category}`);
  }

  // 3. Create article entry
  const articleSlug = generateSlug(title);

  // Generate SEO data if missing
  const finalSeoTitle = seoTitle || title;
  const finalMetaDesc = metaDescription || content.substring(0, 160).replace(/<[^>]+>/g, '');

  let articleRecord = await prisma.article.findUnique({ where: { slug: articleSlug } });
  
  if (articleRecord) {
    console.log(`Article with slug '${articleSlug}' already exists. Updating...`);
    articleRecord = await prisma.article.update({
      where: { id: articleRecord.id },
      data: {
        title,
        content,
        brandId: brandRecord.id,
        categoryId: categoryRecord.id,
        errorCode,
        printerModel,
        tags,
        featuredImage,
        seoTitle: finalSeoTitle,
        metaDescription: finalMetaDesc,
        status: 'published',
        publishedAt: new Date(),
      },
    });
    console.log(`Updated article: ${title}`);
  } else {
    articleRecord = await prisma.article.create({
      data: {
        title,
        slug: articleSlug,
        content,
        brandId: brandRecord.id,
        categoryId: categoryRecord.id,
        errorCode,
        printerModel,
        tags,
        featuredImage,
        seoTitle: finalSeoTitle,
        metaDescription: finalMetaDesc,
        status: 'published',
        publishedAt: new Date(),
      },
    });
    console.log(`Published new article: ${title}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
