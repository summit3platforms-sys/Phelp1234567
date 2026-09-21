import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const newLeadsCount = leads.filter((l) => l.status === 'new').length;

  async function deleteLead(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (id) {
      await prisma.lead.delete({
        where: { id },
      });
      revalidatePath("/admin/leads");
    }
  }

  async function updateStatus(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const nextStatus = formData.get("status") as string;
    if (id && nextStatus) {
      await prisma.lead.update({
        where: { id },
        data: { status: nextStatus },
      });
      revalidatePath("/admin/leads");
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Support Leads &amp; Contact Messages</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Total: <strong>{leads.length}</strong> | Unhandled: <strong style={{ color: '#16a34a' }}>{newLeadsCount} new</strong>
          </p>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '1rem', fontWeight: '600' }}>Date</th>
              <th style={{ padding: '1rem', fontWeight: '600' }}>Name</th>
              <th style={{ padding: '1rem', fontWeight: '600' }}>Contact</th>
              <th style={{ padding: '1rem', fontWeight: '600' }}>Location / IP</th>
              <th style={{ padding: '1rem', fontWeight: '600' }}>Brand / Topic</th>
              <th style={{ padding: '1rem', fontWeight: '600' }}>Message / Issue</th>
              <th style={{ padding: '1rem', fontWeight: '600' }}>Status</th>
              <th style={{ padding: '1rem', fontWeight: '600', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: '2.5rem', textAlign: 'center', color: '#666' }}>
                  No messages or leads captured yet.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem', whiteSpace: 'nowrap', verticalAlign: 'top' }}>
                    {new Date(lead.createdAt).toLocaleDateString()}<br/>
                    <small style={{ color: '#666' }}>{new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: '600', verticalAlign: 'top' }}>
                    {lead.name}
                  </td>
                  <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                    <div>
                      <a href={`mailto:${lead.email}`} style={{ color: 'var(--primary-color)', fontWeight: 500 }}>
                        {lead.email}
                      </a>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: lead.phone === 'Not provided' ? '#94a3b8' : '#334155', marginTop: '4px' }}>
                      {lead.phone}
                    </div>
                  </td>
                  <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                    <div style={{ fontWeight: '500' }}>{lead.country || 'N/A'}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{lead.ipAddress || 'No IP'}</div>
                  </td>
                  <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                    <span style={{ 
                      background: lead.printerBrand === 'General Inquiry' ? '#f1f5f9' : '#e0f2fe',
                      color: lead.printerBrand === 'General Inquiry' ? '#475569' : '#0369a1',
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '0.85rem',
                      fontWeight: 600
                    }}>
                      {lead.printerBrand}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', maxWidth: '320px', verticalAlign: 'top' }}>
                    {lead.issueDescription ? (
                      <details style={{ cursor: 'pointer' }}>
                        <summary style={{ 
                          fontSize: '0.9rem', 
                          color: '#334155',
                          display: '-webkit-box', 
                          WebkitLineClamp: 2, 
                          WebkitBoxOrient: 'vertical', 
                          overflow: 'hidden',
                          outline: 'none'
                        }}>
                          {lead.issueDescription}
                        </summary>
                        <div style={{ 
                          marginTop: '0.5rem', 
                          padding: '0.5rem', 
                          background: '#f8fafc', 
                          borderRadius: '4px', 
                          border: '1px solid #e2e8f0',
                          fontSize: '0.85rem',
                          whiteSpace: 'pre-wrap',
                          lineHeight: '1.4'
                        }}>
                          {lead.issueDescription}
                        </div>
                      </details>
                    ) : (
                      <span style={{ color: '#aaa', fontStyle: 'italic', fontSize: '0.85rem' }}>No message</span>
                    )}
                  </td>
                  <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                    <form action={updateStatus} style={{ display: 'inline-block' }}>
                      <input type="hidden" name="id" value={lead.id} />
                      <select
                        name="status"
                        defaultValue={lead.status}
                        onChange={(e) => e.target.form?.requestSubmit()}
                        style={{
                          padding: '4px 8px',
                          borderRadius: '999px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          border: '1px solid #cbd5e1',
                          background: lead.status === 'new' ? '#dbeafe' : lead.status === 'contacted' ? '#fef3c7' : '#dcfce7',
                          color: lead.status === 'new' ? '#1e40af' : lead.status === 'contacted' ? '#92400e' : '#166534',
                          cursor: 'pointer',
                          textTransform: 'capitalize'
                        }}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </form>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right', verticalAlign: 'top' }}>
                    <form action={deleteLead} style={{ display: 'inline' }}>
                      <input type="hidden" name="id" value={lead.id} />
                      <button 
                        type="submit" 
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          color: '#d32f2f', 
                          cursor: 'pointer', 
                          fontSize: '0.85rem',
                          textDecoration: 'underline' 
                        }}
                      >
                        Delete
                      </button>
                    </form>
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
