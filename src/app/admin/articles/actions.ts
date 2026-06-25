"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Helper to calculate word count by stripping HTML tags
function calculateWordCount(html: string): number {
  if (!html) return 0;
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  return words.length;
}

// Helper to format slugs
function formatSlug(rawSlug: string): string {
  if (!rawSlug) return "";
  return rawSlug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function deleteArticle(id: string) {
  await prisma.article.delete({
    where: { id },
  });
  revalidatePath("/admin/articles");
}

export async function createArticle(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const seoTitle = formData.get("seoTitle") as string;
  const metaDescription = formData.get("metaDescription") as string;
  const canonicalUrl = formData.get("canonicalUrl") as string;
  const excerpt = formData.get("excerpt") as string;
  const featuredSnippet = formData.get("featuredSnippet") as string;
  const faqs = formData.get("faqs") as string; // JSON string
  const status = (formData.get("status") as string) || "draft";
  const authorId = formData.get("authorId") as string;
  const rawSlug = formData.get("slug") as string;
  const featuredImage = formData.get("featuredImage") as string;
  const featuredImageAlt = formData.get("featuredImageAlt") as string;
  const featuredImageTitle = formData.get("featuredImageTitle") as string;
  const featuredImageCaption = formData.get("featuredImageCaption") as string;
  const brandId = formData.get("brandId") as string;
  const categoryId = formData.get("categoryId") as string;

  if (!title) {
    throw new Error("Title is required");
  }

  const slugBase = rawSlug || title;
  let slug = formatSlug(slugBase);
  if (!slug) {
    slug = `article-${Date.now()}`;
  }

  // Ensure slug uniqueness
  const existing = await prisma.article.findFirst({
    where: { slug }
  });
  if (existing) {
    throw new Error(`The slug '${slug}' is already in use by another article.`);
  }

  const wordCount = calculateWordCount(content);

  const article = await prisma.article.create({
    data: {
      title,
      slug,
      content,
      seoTitle: seoTitle || null,
      metaDescription: metaDescription || null,
      canonicalUrl: canonicalUrl || null,
      excerpt: excerpt || null,
      featuredSnippet: featuredSnippet || null,
      faqs: faqs || null,
      status,
      featuredImage: featuredImage || null,
      featuredImageAlt: featuredImageAlt || null,
      featuredImageTitle: featuredImageTitle || null,
      featuredImageCaption: featuredImageCaption || null,
      brandId: brandId || null,
      categoryId: categoryId || null,
      authorId: authorId || null,
      wordCount,
      publishedAt: status === "published" ? new Date() : null,
    }
  });

  revalidatePath("/admin/articles");
  return article;
}

export async function updateArticle(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const seoTitle = formData.get("seoTitle") as string;
  const metaDescription = formData.get("metaDescription") as string;
  const canonicalUrl = formData.get("canonicalUrl") as string;
  const excerpt = formData.get("excerpt") as string;
  const featuredSnippet = formData.get("featuredSnippet") as string;
  const faqs = formData.get("faqs") as string; // JSON string
  const status = formData.get("status") as string;
  const authorId = formData.get("authorId") as string;
  const rawSlug = formData.get("slug") as string;
  const featuredImage = formData.get("featuredImage") as string;
  const featuredImageAlt = formData.get("featuredImageAlt") as string;
  const featuredImageTitle = formData.get("featuredImageTitle") as string;
  const featuredImageCaption = formData.get("featuredImageCaption") as string;
  const brandId = formData.get("brandId") as string;
  const categoryId = formData.get("categoryId") as string;

  if (!rawSlug) {
    throw new Error("URL Slug is required");
  }

  const slug = formatSlug(rawSlug);

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

  // Get current article to compare and save revision
  const oldArticle = await prisma.article.findUnique({
    where: { id },
    include: { brand: true, category: true }
  });

  if (!oldArticle) {
    throw new Error("Article not found");
  }

  // Calculate word count
  const wordCount = calculateWordCount(content);

  // Check for changes to avoid empty revisions
  const hasChanges =
    oldArticle.title !== title ||
    oldArticle.content !== content ||
    oldArticle.seoTitle !== seoTitle ||
    oldArticle.metaDescription !== metaDescription ||
    oldArticle.faqs !== faqs ||
    oldArticle.featuredImage !== featuredImage ||
    oldArticle.featuredImageAlt !== featuredImageAlt ||
    oldArticle.featuredImageTitle !== featuredImageTitle ||
    oldArticle.featuredImageCaption !== featuredImageCaption ||
    oldArticle.excerpt !== excerpt ||
    oldArticle.featuredSnippet !== featuredSnippet;

  if (hasChanges) {
    const lastRevision = await prisma.revision.findFirst({
      where: { articleId: id },
      orderBy: { version: "desc" }
    });
    const nextVersion = lastRevision ? lastRevision.version + 1 : 1;

    await prisma.revision.create({
      data: {
        articleId: id,
        version: nextVersion,
        title: oldArticle.title,
        content: oldArticle.content,
        seoTitle: oldArticle.seoTitle,
        metaDescription: oldArticle.metaDescription,
        faqs: oldArticle.faqs,
        featuredImage: oldArticle.featuredImage,
        featuredImageAlt: oldArticle.featuredImageAlt,
        featuredImageTitle: oldArticle.featuredImageTitle,
        featuredImageCaption: oldArticle.featuredImageCaption,
        excerpt: oldArticle.excerpt,
        featuredSnippet: oldArticle.featuredSnippet,
      }
    });
  }

  // Get new brand and category slugs to compute redirects if published
  const newBrand = brandId ? await prisma.brand.findUnique({ where: { id: brandId } }) : null;
  const newCategory = categoryId ? await prisma.category.findUnique({ where: { id: categoryId } }) : null;

  const oldBrandSlug = oldArticle.brand?.slug || "uncategorized";
  const oldCategorySlug = oldArticle.category?.slug || "uncategorized";
  const newBrandSlug = newBrand?.slug || "uncategorized";
  const newCategorySlug = newCategory?.slug || "uncategorized";

  const oldPath = `/${oldBrandSlug}/${oldCategorySlug}/${oldArticle.slug}`;
  const newPath = `/${newBrandSlug}/${newCategorySlug}/${slug}`;

  // If URL changed and the article was or is being published, create redirect
  if (oldPath !== newPath && (oldArticle.status === "published" || status === "published")) {
    await prisma.redirect.upsert({
      where: { oldUrl: oldPath },
      update: { newUrl: newPath },
      create: { oldUrl: oldPath, newUrl: newPath }
    });
  }

  await prisma.article.update({
    where: { id },
    data: {
      title,
      slug,
      content,
      seoTitle: seoTitle || null,
      metaDescription: metaDescription || null,
      canonicalUrl: canonicalUrl || null,
      wordCount,
      excerpt: excerpt || null,
      featuredSnippet: featuredSnippet || null,
      faqs: faqs || null,
      status,
      featuredImage: featuredImage || null,
      featuredImageAlt: featuredImageAlt || null,
      featuredImageTitle: featuredImageTitle || null,
      featuredImageCaption: featuredImageCaption || null,
      brandId: brandId || null,
      categoryId: categoryId || null,
      authorId: authorId || null,
      publishedAt: status === "published" && !oldArticle.publishedAt ? new Date() : oldArticle.publishedAt,
    },
  });

  revalidatePath("/admin/articles");
  revalidatePath(`/${oldBrandSlug}/${oldCategorySlug}/${oldArticle.slug}`);
  revalidatePath(`/${newBrandSlug}/${newCategorySlug}/${slug}`);
}

export async function importBulkArticles(articles: Array<{
  title: string;
  content: string;
  excerpt?: string;
  wordCount?: number;
  featuredSnippet?: string;
  faqs?: string;
  seoTitle?: string;
  metaDescription?: string;
}>) {
  const created = [];
  for (const art of articles) {
    const slugBase = formatSlug(art.title) || `draft-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    
    // Ensure uniqueness
    let slug = slugBase;
    let counter = 1;
    while (true) {
      const existing = await prisma.article.findFirst({ where: { slug } });
      if (!existing) break;
      slug = `${slugBase}-${counter++}`;
    }

    const wordCount = art.wordCount || calculateWordCount(art.content);

    const doc = await prisma.article.create({
      data: {
        title: art.title,
        slug,
        content: art.content,
        excerpt: art.excerpt || null,
        wordCount,
        featuredSnippet: art.featuredSnippet || null,
        faqs: art.faqs || null,
        seoTitle: art.seoTitle || null,
        metaDescription: art.metaDescription || null,
        status: "needs_review", // Bulk drafts status is needs_review
        brandId: null, // Uncategorized
        categoryId: null,
      }
    });
    created.push(doc);
  }
  revalidatePath("/admin/articles");
  return created;
}

export async function rollbackRevision(articleId: string, revisionId: string) {
  const revision = await prisma.revision.findUnique({
    where: { id: revisionId }
  });
  if (!revision) {
    throw new Error("Revision not found");
  }

  // Create a revision of the current state before rolling back
  const currentArticle = await prisma.article.findUnique({
    where: { id: articleId }
  });
  if (currentArticle) {
    const lastRevision = await prisma.revision.findFirst({
      where: { articleId },
      orderBy: { version: "desc" }
    });
    const nextVersion = lastRevision ? lastRevision.version + 1 : 1;
    await prisma.revision.create({
      data: {
        articleId,
        version: nextVersion,
        title: currentArticle.title,
        content: currentArticle.content,
        seoTitle: currentArticle.seoTitle,
        metaDescription: currentArticle.metaDescription,
        faqs: currentArticle.faqs,
        featuredImage: currentArticle.featuredImage,
        featuredImageAlt: currentArticle.featuredImageAlt,
        featuredImageTitle: currentArticle.featuredImageTitle,
        featuredImageCaption: currentArticle.featuredImageCaption,
        excerpt: currentArticle.excerpt,
        featuredSnippet: currentArticle.featuredSnippet,
      }
    });
  }

  const wordCount = calculateWordCount(revision.content);

  await prisma.article.update({
    where: { id: articleId },
    data: {
      title: revision.title,
      content: revision.content,
      seoTitle: revision.seoTitle,
      metaDescription: revision.metaDescription,
      faqs: revision.faqs,
      featuredImage: revision.featuredImage,
      featuredImageAlt: revision.featuredImageAlt,
      featuredImageTitle: revision.featuredImageTitle,
      featuredImageCaption: revision.featuredImageCaption,
      excerpt: revision.excerpt,
      featuredSnippet: revision.featuredSnippet,
      wordCount,
    }
  });

  revalidatePath("/admin/articles");
}

export async function getRevisions(articleId: string) {
  return prisma.revision.findMany({
    where: { articleId },
    orderBy: { version: "desc" }
  });
}
