import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Supported Printer Brands - PrinterFix DB",
  description: "Browse all supported printer brands for troubleshooting guides and error codes, including HP, Canon, Epson, Brother, and more.",
};

export default async function BrandsPage() {
  const brands = await prisma.brand.findMany({
    orderBy: { name: 'asc' }
  });

  const getBrandEmoji = (name: string): string => {
    const key = name.toLowerCase();
    if (key.includes('hp')) return '🖨️';
    if (key.includes('canon')) return '📷';
    if (key.includes('epson')) return '🎨';
    if (key.includes('brother')) return '🏢';
    if (key.includes('lexmark')) return '💼';
    if (key.includes('xerox')) return '⚡';
    if (key.includes('kodak')) return '🖼️';
    if (key.includes('polaroid')) return '📸';
    if (key.includes('fujifilm')) return '📷';
    if (key.includes('dymo') || key.includes('rollo') || key.includes('munbyn') || key.includes('nelko') || key.includes('phomemo') || key.includes('niimbot') || key.includes('bixolon')) return '🏷️';
    if (key.includes('zebra')) return '🦓';
    if (key.includes('star')) return '⭐';
    if (key.includes('citizen')) return '🏙️';
    if (key.includes('seiko')) return '⌚';
    if (key.includes('primera')) return '💿';
    if (key.includes('samsung')) return '📱';
    return '🖨️';
  };

  return (
    <div>
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>
          All Printer Brands
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Showing all {brands.length} supported printer manufacturers. Select a brand to browse troubleshooting guides.
        </p>
      </div>

      <div className="brand-grid">
        {brands.map(brand => (
          <Link href={`/brand/${brand.slug}`} key={brand.id}>
            <div className="card">
              <div className="card-emoji">{getBrandEmoji(brand.name)}</div>
              <div className="card-info">
                <h3 className="card-title">{brand.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
