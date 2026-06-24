"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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

  const featuredImage = featuredImageText && featuredImageText.trim() !== "" ? featuredImageText.trim() : null;

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
