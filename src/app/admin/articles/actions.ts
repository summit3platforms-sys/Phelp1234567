"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

export async function deleteArticle(id: string) {
  await prisma.article.delete({
    where: { id },
  });
  revalidatePath("/admin/articles");
}

export async function updateArticle(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const seoTitle = formData.get("seoTitle") as string;
  const metaDescription = formData.get("metaDescription") as string;
  const status = formData.get("status") as string;
  const authorId = formData.get("authorId") as string;
  const rawSlug = formData.get("slug") as string;
  const featuredImageText = formData.get("featuredImage") as string;
  const file = formData.get("featuredImageFile") as File | null;

  if (!rawSlug) {
    throw new Error("URL Slug is required");
  }

  const slug = rawSlug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  // Check if slug is already used by another article
  const existing = await prisma.article.findFirst({
    where: {
      slug,
      NOT: { id }
    }
  });

  if (existing) {
    throw new Error(`The slug '${slug}' is already in use by another article.`);
  }

  let featuredImage = featuredImageText || null;

  if (file && file.size > 0 && file.name) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename
    const fileExt = path.extname(file.name) || ".jpg";
    const filename = `${slug}-${Date.now()}${fileExt}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    await fs.promises.writeFile(filePath, buffer);
    featuredImage = `/uploads/${filename}`;
  }

  await prisma.article.update({
    where: { id },
    data: {
      title,
      slug,
      content,
      seoTitle,
      metaDescription,
      status,
      featuredImage,
      authorId: authorId || null,
    },
  });
  revalidatePath("/admin/articles");
  revalidatePath("/[brandSlug]/[categorySlug]/[articleSlug]");
}
