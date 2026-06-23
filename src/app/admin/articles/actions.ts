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

  await prisma.article.update({
    where: { id },
    data: {
      title,
      content,
      seoTitle,
      metaDescription,
      status,
      authorId: authorId || null,
    },
  });
  revalidatePath("/admin/articles");
}
