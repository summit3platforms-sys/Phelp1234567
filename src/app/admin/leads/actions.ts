"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteLead(id: string) {
  if (!id) return;
  await prisma.lead.delete({
    where: { id },
  });
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function updateLeadStatus(id: string, status: string) {
  if (!id || !status) return;
  await prisma.lead.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}
