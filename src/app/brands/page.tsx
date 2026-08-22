import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Metadata } from "next";

export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: "All Supported Printer Brands - LibertyPrinterFix",
  description: "Browse all supported printer brands for troubleshooting guides and error codes, including HP, Canon, Epson, Brother, and more.",
  alternates: {
    canonical: "https://libertyprinterfix.com/brands",
  },
};

export default async function BrandsPage() {
  const brands = await prisma.brand.findMany({
    orderBy: { name: 'asc' }
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://libertyprinterfix.com/" },
          { "@type": "ListItem", "position": 2, "name": "All Brands", "item": "https://libertyprinterfix.com/brands" }
        ]
      },
      {
        "@type": "CollectionPage",
        "name": "All Supported Printer Brands",
        "description": "Browse all supported printer brands for troubleshooting guides and error codes.",
        "url": "https://libertyprinterfix.com/brands",
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": brands.map((brand, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": brand.name,
            "url": `https://libertyprinterfix.com/${brand.slug}`
          }))
        }
      }
    ]
  };

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
    <div className="page-top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        <Link href="/">Home</Link> &gt; 
        <span style={{ color: 'var(--text-muted)' }}> All Brands</span>
      </nav>

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
          <Link href={`/${brand.slug}`} key={brand.id}>
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
