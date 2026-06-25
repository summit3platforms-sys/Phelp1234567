import { prisma } from "@/lib/prisma";
import ImportForm from "./ImportForm";

export const dynamic = "force-dynamic";

export default async function ImportArticlesPage() {
  const brands = await prisma.brand.findMany({
    orderBy: { name: "asc" }
  });
  
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" }
  });

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "700", color: "#111", margin: 0 }}>Import Article from File</h1>
        <p style={{ margin: "0.25rem 0 0 0", color: "#666" }}>Upload a PDF, DOCX, TXT, or MD document to extract and cleanup its content before saving.</p>
      </div>
      
      <ImportForm brands={brands} categories={categories} />
    </div>
  );
}
