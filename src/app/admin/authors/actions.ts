"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

function generateSlug(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export async function createAuthor(formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const bio = formData.get("bio") as string;
  const image = formData.get("image") as string;

  if (!name) {
    throw new Error("Author name is required");
  }

  const baseSlug = generateSlug(name);
  let slug = baseSlug;
  let counter = 1;

  // Ensure unique slug
  while (true) {
    const existing = await prisma.author.findUnique({ where: { slug } });
    if (!existing) break;
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  await prisma.author.create({
    data: {
      name,
      slug,
      role: role || "Technical Expert",
      bio: bio || null,
      image: image || null
    }
  });

  revalidatePath("/admin/authors");
}

export async function deleteAuthor(id: string) {
  await prisma.author.delete({
    where: { id }
  });
  revalidatePath("/admin/authors");
}
