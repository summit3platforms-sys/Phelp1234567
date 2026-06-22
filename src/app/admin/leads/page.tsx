import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Support Leads</h1>
      </div>

      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '1rem', fontWeight: '600' }}>Date</th>
              <th style={{ padding: '1rem', fontWeight: '600' }}>Name</th>
              <th style={{ padding: '1rem', fontWeight: '600' }}>Contact</th>
              <th style={{ padding: '1rem', fontWeight: '600' }}>Printer Brand</th>
              <th style={{ padding: '1rem', fontWeight: '600' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                  No leads captured yet.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem' }}>
                    {new Date(lead.createdAt).toLocaleDateString()}<br/>
                    <small style={{ color: '#666' }}>{new Date(lead.createdAt).toLocaleTimeString()}</small>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: '500' }}>{lead.name}</td>
                  <td style={{ padding: '1rem' }}>
                    <div><a href={`mailto:${lead.email}`} style={{ color: 'var(--primary-color)' }}>{lead.email}</a></div>
                    <div style={{ fontSize: '0.9em', color: '#666', marginTop: '4px' }}>{lead.phone}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontSize: '0.9em' }}>
                      {lead.printerBrand}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      background: lead.status === 'new' ? '#dbeafe' : '#f1f5f9', 
                      color: lead.status === 'new' ? '#1e40af' : '#475569',
                      padding: '4px 8px', 
                      borderRadius: '999px', 
                      fontSize: '0.85em',
                      fontWeight: 'bold',
                      textTransform: 'capitalize'
                    }}>
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
