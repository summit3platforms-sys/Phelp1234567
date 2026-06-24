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

  const removeFeaturedImage = formData.get("removeFeaturedImage") === "true";

  // Get current article to preserve the base64 image if no new file is uploaded
  const article = await prisma.article.findUnique({ where: { id } });
  let featuredImage = article?.featuredImage || null;

  if (removeFeaturedImage) {
    featuredImage = null;
  } else if (file && file.size > 0 && file.name) {
    // New file uploaded - convert to base64 Data URL
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64String = buffer.toString("base64");
    const mimeType = file.type || "image/jpeg";
    featuredImage = `data:${mimeType};base64,${base64String}`;
  } else {
    // No new file uploaded, check the text input
    if (featuredImageText.trim() !== "") {
      featuredImage = featuredImageText.trim();
    } else {
      // If the text input is cleared, and the old image was NOT base64, they wanted to remove it.
      // (If it was base64, the text input was blank by default, so they didn't touch it).
      if (article?.featuredImage && !article.featuredImage.startsWith("data:")) {
        featuredImage = null;
      }
    }
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
