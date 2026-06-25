import { getRedirects, createRedirect, deleteRedirect, updateRedirect } from "./actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function RedirectsPage() {
  const redirects = await getRedirects();

  async function handleCreate(formData: FormData) {
    "use server";
    try {
      await createRedirect(formData);
    } catch (e: any) {
      // Direct server-side error return via action is easier with client-side forms, 
      // but for this simple admin page we can use standard form submission or state.
      // Let's implement a simple, beautiful UI.
    }
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", fontFamily: "inherit" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "700", color: "#111", margin: 0 }}>URL Redirects Manager</h1>
          <p style={{ margin: "0.25rem 0 0 0", color: "#666" }}>Manage 301/308 relative redirects when slugs or structure changes.</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "350px 1fr", gap: "2rem", alignItems: "start" }}>
        {/* Create Redirect Card */}
        <div style={{
          background: "#fff",
          borderRadius: "8px",
          border: "1px solid var(--border-color)",
          padding: "1.5rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
        }}>
          <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.1rem", fontWeight: "600" }}>Create New Redirect</h3>
          <form action={createRedirect} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "500", color: "#444", marginBottom: "0.35rem" }}>
                Old URL Path
              </label>
              <input
                type="text"
                name="oldUrl"
                placeholder="/hp/connectivity/old-slug"
                required
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "4px",
                  border: "1px solid var(--border-color)",
                  fontSize: "0.9rem"
                }}
              />
              <span style={{ fontSize: "0.75rem", color: "#888" }}>Must start with /</span>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "500", color: "#444", marginBottom: "0.35rem" }}>
                New URL Path
              </label>
              <input
                type="text"
                name="newUrl"
                placeholder="/hp/connectivity/new-slug"
                required
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "4px",
                  border: "1px solid var(--border-color)",
                  fontSize: "0.9rem"
                }}
              />
              <span style={{ fontSize: "0.75rem", color: "#888" }}>Must start with /</span>
            </div>

            <button
              type="submit"
              style={{
                background: "#0070f3",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "0.6rem 1rem",
                fontWeight: "500",
                cursor: "pointer",
                fontSize: "0.9rem",
                marginTop: "0.5rem"
              }}
            >
              Add Redirect
            </button>
          </form>
        </div>

        {/* Redirects List */}
        <div style={{
          background: "#fff",
          borderRadius: "8px",
          border: "1px solid var(--border-color)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          overflow: "hidden"
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ background: "#f9f9f9", borderBottom: "1px solid var(--border-color)" }}>
                <th style={{ padding: "1rem", fontWeight: "600", color: "#444" }}>Old Path (Matches)</th>
                <th style={{ padding: "1rem", fontWeight: "600", color: "#444" }}>New Path (Redirects To)</th>
                <th style={{ padding: "1rem", fontWeight: "600", color: "#444", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {redirects.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ padding: "2rem", textAlign: "center", color: "#888" }}>
                    No redirects configured yet.
                  </td>
                </tr>
              ) : (
                redirects.map((r) => (
                  <tr key={r.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "1rem", fontFamily: "monospace", color: "#d91d5a" }}>{r.oldUrl}</td>
                    <td style={{ padding: "1rem", fontFamily: "monospace", color: "#0070f3" }}>{r.newUrl}</td>
                    <td style={{ padding: "1rem", textAlign: "right" }}>
                      <form action={async () => {
                        "use server";
                        await deleteRedirect(r.id);
                      }} style={{ display: "inline" }}>
                        <button
                          type="submit"
                          style={{
                            background: "transparent",
                            color: "#ff0000",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "0.85rem"
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
    </div>
  );
}
