import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { updateArticle } from "../../actions";

import EditArticleForm from "@/components/EditArticleForm";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const article = await prisma.article.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!article) {
    notFound();
  }

  const authors = await prisma.author.findMany({
    orderBy: { name: 'asc' },
  });

  const brands = await prisma.brand.findMany({
    orderBy: { name: 'asc' },
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });

  const allArticles = await prisma.article.findMany({
    where: { NOT: { id: resolvedParams.id } },
    select: {
      id: true,
      title: true,
      slug: true,
      brandId: true,
      categoryId: true,
      brand: { select: { slug: true, name: true } },
      category: { select: { slug: true, name: true } }
    }
  });

  async function handleUpdate(id: string, formData: FormData) {
    "use server";
    await updateArticle(id, formData);
    redirect("/admin/articles");
  }

  return (
    <div>
      <EditArticleForm
        article={article}
        authors={authors}
        brands={brands}
        categories={categories}
        allArticles={allArticles}
        updateAction={handleUpdate}
      />
    </div>
  );
}

