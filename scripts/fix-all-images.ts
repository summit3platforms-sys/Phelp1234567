import { prisma } from '../src/lib/prisma';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function fixAllImages() {
  console.log('--- STARTING COMPREHENSIVE IMAGE FIX ---');

  const publicDir = path.join(process.cwd(), 'public');
  const brandsDir = path.join(publicDir, 'images', 'brands');
  const printersDir = path.join(publicDir, 'images', 'printers');
  const articlesDir = path.join(publicDir, 'images', 'articles');

  // Ensure directories exist
  if (!fs.existsSync(printersDir)) {
    fs.mkdirSync(printersDir, { recursive: true });
    console.log('✓ Created directory:', printersDir);
  }
  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir, { recursive: true });
  }

  // 1. Generate all brand assets in public/images/printers/
  console.log('\n1. Generating assets in public/images/printers/...');
  const brandFiles = fs.readdirSync(brandsDir);

  for (const file of brandFiles) {
    if (file.startsWith('.')) continue;
    const baseName = path.parse(file).name.toLowerCase();
    const srcPath = path.join(brandsDir, file);

    try {
      // Create .webp version
      const destWebp = path.join(printersDir, `${baseName}.webp`);
      await sharp(srcPath)
        .webp({ quality: 90 })
        .toFile(destWebp);

      // Also create .png version
      const destPng = path.join(printersDir, `${baseName}.png`);
      await sharp(srcPath)
        .png()
        .toFile(destPng);

      console.log(`  ✓ Generated printers/${baseName}.webp and .png`);
    } catch (err: any) {
      console.warn(`  ⚠ Error converting ${file}:`, err.message);
    }
  }

  // 2. Extract and optimize the 18 Base64 Data URI images into actual files
  console.log('\n2. Extracting base64 featured images to files...');
  const base64Articles = await prisma.article.findMany({
    where: {
      featuredImage: {
        startsWith: 'data:'
      }
    },
    select: { id: true, slug: true, featuredImage: true }
  });

  console.log(`Found ${base64Articles.length} articles with base64 data URIs.`);

  for (const a of base64Articles) {
    if (!a.featuredImage) continue;
    try {
      const match = a.featuredImage.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
      if (match) {
        const buffer = Buffer.from(match[2], 'base64');
        const filename = `${a.slug}.jpg`;
        const destPath = path.join(articlesDir, filename);

        await sharp(buffer)
          .jpeg({ quality: 85 })
          .toFile(destPath);

        const newPath = `/images/articles/${filename}`;
        await prisma.article.update({
          where: { id: a.id },
          data: { featuredImage: newPath }
        });
        console.log(`  ✓ Saved base64 to ${newPath} (${(buffer.length / 1024).toFixed(1)} KB -> optimized file)`);
      }
    } catch (err: any) {
      console.warn(`  ⚠ Failed to process base64 for ${a.slug}:`, err.message);
    }
  }

  // 3. Assign featured images to the 13 articles with missing/null images
  console.log('\n3. Fixing 13 articles with missing/null featuredImage...');
  const nullArticles = await prisma.article.findMany({
    where: {
      OR: [
        { featuredImage: null },
        { featuredImage: '' }
      ]
    },
    include: { brand: true }
  });

  for (const a of nullArticles) {
    let brandImg = '/logo.png';
    const brandSlug = a.brand?.slug?.toLowerCase();

    if (brandSlug === 'hp') brandImg = '/images/brands/hp.webp';
    else if (brandSlug === 'epson') brandImg = '/images/brands/epson.webp';
    else if (brandSlug === 'brother') brandImg = '/images/brands/brother.png';
    else if (brandSlug === 'canon') brandImg = '/images/brands/canon.png';
    else if (brandSlug && fs.existsSync(path.join(brandsDir, `${brandSlug}.png`))) {
      brandImg = `/images/brands/${brandSlug}.png`;
    } else if (brandSlug && fs.existsSync(path.join(brandsDir, `${brandSlug}.webp`))) {
      brandImg = `/images/brands/${brandSlug}.webp`;
    }

    await prisma.article.update({
      where: { id: a.id },
      data: { featuredImage: brandImg }
    });
    console.log(`  ✓ Assigned ${brandImg} to [${a.slug}]`);
  }

  // 4. Verification Scan
  console.log('\n4. Verifying all articles in DB...');
  const allArticles = await prisma.article.findMany({
    select: { id: true, slug: true, title: true, featuredImage: true }
  });

  let brokenCount = 0;
  let missingCount = 0;

  for (const a of allArticles) {
    if (!a.featuredImage || a.featuredImage.trim() === '') {
      missingCount++;
      continue;
    }
    const feat = a.featuredImage.trim();
    if (feat.startsWith('http://') || feat.startsWith('https://') || feat.startsWith('data:')) {
      continue;
    }
    const local = path.join(publicDir, feat.startsWith('/') ? feat.slice(1) : feat);
    if (!fs.existsSync(local)) {
      brokenCount++;
      console.warn(`  ❌ Still broken: [${a.slug}] -> ${feat}`);
    }
  }

  console.log('\n=== FINAL VERIFICATION ===');
  console.log('Total articles scanned:', allArticles.length);
  console.log('Broken featured images:', brokenCount);
  console.log('Missing/null featured images:', missingCount);

  if (brokenCount === 0 && missingCount === 0) {
    console.log('🎉 ALL IMAGES ACROSS ENTIRE KNOWLEDGE BASE ARE 100% HEALTHY!');
  }
}

fixAllImages().catch(console.error).finally(() => prisma.$disconnect());
