import Link from "next/link";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard - LibertyPrinterFix",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', minHeight: '80vh', borderTop: '1px solid var(--border-color)' }}>
      <aside style={{ width: '250px', background: 'var(--secondary-color)', padding: '2rem 1rem', borderRight: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: '#555' }}>Admin Panel</h2>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <li><Link href="/admin" style={{ display: 'block', padding: '0.5rem', background: '#fff', borderRadius: '4px', border: '1px solid var(--border-color)' }}>Dashboard</Link></li>
          <li><Link href="/admin/articles" style={{ display: 'block', padding: '0.5rem', background: '#fff', borderRadius: '4px', border: '1px solid var(--border-color)' }}>Articles</Link></li>
          <li><Link href="/admin/brands" style={{ display: 'block', padding: '0.5rem', background: '#fff', borderRadius: '4px', border: '1px solid var(--border-color)' }}>Brands</Link></li>
          <li><Link href="/admin/categories" style={{ display: 'block', padding: '0.5rem', background: '#fff', borderRadius: '4px', border: '1px solid var(--border-color)' }}>Categories</Link></li>
          <li><Link href="/admin/leads" style={{ display: 'block', padding: '0.5rem', background: '#fff', borderRadius: '4px', border: '1px solid var(--border-color)', fontWeight: 'bold' }}>Leads</Link></li>
        </ul>
      </aside>
      <main style={{ flex: 1, padding: '2rem' }}>
        {children}
      </main>
    </div>
  );
}
