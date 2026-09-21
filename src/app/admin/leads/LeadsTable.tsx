'use client';

import { useState, useTransition } from 'react';
import { deleteLead, updateLeadStatus } from './actions';

type LeadItem = {
  id: string;
  name: string;
  email: string;
  phone: string;
  printerBrand: string;
  status: string;
  createdAt: Date;
  country: string | null;
  ipAddress: string | null;
  issueDescription: string | null;
};

export default function LeadsTable({ leads }: { leads: LeadItem[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<LeadItem | null>(null);
  const [isPending, startTransition] = useTransition();

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.printerBrand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.issueDescription && lead.issueDescription.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, newStatus: string) => {
    startTransition(async () => {
      await updateLeadStatus(id, newStatus);
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the lead from ${name}?`)) {
      startTransition(async () => {
        await deleteLead(id);
      });
    }
  };

  return (
    <div>
      {/* Controls Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', gap: '0.75rem', flex: 1, minWidth: '280px' }}>
          <input
            type="text"
            placeholder="Search by name, email, brand, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: '0.6rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              fontSize: '0.9rem',
              outline: 'none',
              background: '#fff',
            }}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '0.6rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              fontSize: '0.9rem',
              outline: 'none',
              background: '#fff',
              color: '#334155',
            }}
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {isPending && (
          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Updating...</span>
        )}
      </div>

      {/* Leads Table */}
      <div
        style={{
          background: '#fff',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
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
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                  {leads.length === 0
                    ? 'No support leads or contact messages captured yet.'
                    : 'No leads match your search criteria.'}
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr key={lead.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem', whiteSpace: 'nowrap', verticalAlign: 'top' }}>
                    {new Date(lead.createdAt).toLocaleDateString()}<br />
                    <small style={{ color: '#64748b' }}>
                      {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </small>
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
                    <span
                      style={{
                        background: lead.printerBrand === 'General Inquiry' ? '#f1f5f9' : '#e0f2fe',
                        color: lead.printerBrand === 'General Inquiry' ? '#475569' : '#0369a1',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                      }}
                    >
                      {lead.printerBrand}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', maxWidth: '300px', verticalAlign: 'top' }}>
                    {lead.issueDescription ? (
                      <div>
                        <p
                          style={{
                            fontSize: '0.9rem',
                            color: '#334155',
                            margin: 0,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {lead.issueDescription}
                        </p>
                        <button
                          onClick={() => setSelectedMessage(lead)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--primary-color)',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            padding: '4px 0 0 0',
                            textDecoration: 'underline',
                          }}
                        >
                          Read full message
                        </button>
                      </div>
                    ) : (
                      <span style={{ color: '#aaa', fontStyle: 'italic', fontSize: '0.85rem' }}>No message</span>
                    )}
                  </td>
                  <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                    <select
                      value={lead.status}
                      disabled={isPending}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '999px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        border: '1px solid #cbd5e1',
                        background:
                          lead.status === 'new'
                            ? '#dbeafe'
                            : lead.status === 'contacted'
                            ? '#fef3c7'
                            : '#dcfce7',
                        color:
                          lead.status === 'new'
                            ? '#1e40af'
                            : lead.status === 'contacted'
                            ? '#92400e'
                            : '#166534',
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                        outline: 'none',
                      }}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right', verticalAlign: 'top' }}>
                    <button
                      onClick={() => handleDelete(lead.id, lead.name)}
                      disabled={isPending}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#d32f2f',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        textDecoration: 'underline',
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for viewing full message */}
      {selectedMessage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            zIndex: 1000,
          }}
          onClick={() => setSelectedMessage(null)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 'var(--radius-md)',
              padding: '2rem',
              maxWidth: '560px',
              width: '100%',
              boxShadow: 'var(--shadow-xl)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a' }}>Message from {selectedMessage.name}</h3>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                  {selectedMessage.email} • {selectedMessage.phone}
                </p>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  lineHeight: '1',
                  cursor: 'pointer',
                  color: '#94a3b8',
                }}
              >
                ×
              </button>
            </div>

            <div
              style={{
                background: '#f8fafc',
                padding: '1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                fontSize: '0.95rem',
                lineHeight: '1.6',
                color: '#334155',
                whiteSpace: 'pre-wrap',
                maxHeight: '350px',
                overflowY: 'auto',
                marginBottom: '1.5rem',
              }}
            >
              {selectedMessage.issueDescription}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <a
                href={`mailto:${selectedMessage.email}?subject=Regarding your printer support request`}
                style={{
                  background: 'var(--primary-color)',
                  color: '#fff',
                  padding: '0.6rem 1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Reply via Email
              </a>
              <button
                onClick={() => setSelectedMessage(null)}
                style={{
                  background: '#e2e8f0',
                  color: '#334155',
                  border: 'none',
                  padding: '0.6rem 1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
