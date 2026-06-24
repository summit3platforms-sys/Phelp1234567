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

  async function handleUpdate(id: string, formData: FormData) {
    "use server";
    await updateArticle(id, formData);
    redirect("/admin/articles");
  }

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Edit Article</h1>
      <EditArticleForm article={article} authors={authors} updateAction={handleUpdate} />
    </div>
  );
}
