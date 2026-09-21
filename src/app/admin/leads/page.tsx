import { prisma } from "@/lib/prisma";
import LeadsTable from "./LeadsTable";

export const dynamic = 'force-dynamic';

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const newLeadsCount = leads.filter((l) => l.status === 'new').length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Support Leads &amp; Contact Messages</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Total: <strong>{leads.length}</strong> | Unhandled: <strong style={{ color: '#16a34a' }}>{newLeadsCount} new</strong>
          </p>
        </div>
      </div>

      <LeadsTable leads={leads} />
    </div>
  );
}
