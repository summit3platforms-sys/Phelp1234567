"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getRedirects() {
  return prisma.redirect.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export async function createRedirect(formData: FormData) {
  const oldUrl = formData.get("oldUrl") as string;
  const newUrl = formData.get("newUrl") as string;
  
  if (!oldUrl || !newUrl) {
    throw new Error("Both Old URL and New URL are required");
  }

  const formatUrl = (u: string) => {
    let formatted = u.trim().toLowerCase();
    if (!formatted.startsWith("/")) {
      formatted = "/" + formatted;
    }
    return formatted;
  };

  const formattedOld = formatUrl(oldUrl);
  const formattedNew = formatUrl(newUrl);

  if (formattedOld === formattedNew) {
    throw new Error("Old URL and New URL cannot be identical");
  }

  const existing = await prisma.redirect.findUnique({
    where: { oldUrl: formattedOld }
  });
  if (existing) {
    throw new Error(`A redirect for '${formattedOld}' already exists.`);
  }

  await prisma.redirect.create({
    data: {
      oldUrl: formattedOld,
      newUrl: formattedNew
    }
  });

  revalidatePath("/admin/redirects");
}

export async function updateRedirect(id: string, formData: FormData) {
  const oldUrl = formData.get("oldUrl") as string;
  const newUrl = formData.get("newUrl") as string;

  if (!oldUrl || !newUrl) {
    throw new Error("Both Old URL and New URL are required");
  }

  const formatUrl = (u: string) => {
    let formatted = u.trim().toLowerCase();
    if (!formatted.startsWith("/")) {
      formatted = "/" + formatted;
    }
    return formatted;
  };

  const formattedOld = formatUrl(oldUrl);
  const formattedNew = formatUrl(newUrl);

  if (formattedOld === formattedNew) {
    throw new Error("Old URL and New URL cannot be identical");
  }

  const existing = await prisma.redirect.findFirst({
    where: {
      oldUrl: formattedOld,
      NOT: { id }
    }
  });
  if (existing) {
    throw new Error(`A redirect for '${formattedOld}' already exists.`);
  }

  await prisma.redirect.update({
    where: { id },
    data: {
      oldUrl: formattedOld,
      newUrl: formattedNew
    }
  });

  revalidatePath("/admin/redirects");
}

export async function deleteRedirect(id: string) {
  await prisma.redirect.delete({
    where: { id }
  });
  revalidatePath("/admin/redirects");
}
