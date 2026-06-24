import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Liberty Printer Fix",
  description: "Learn more about Liberty Printer Fix, your independent online resource for printer troubleshooting, setup assistance, maintenance, and technical solutions.",
};

export default function AboutPage() {
  const headingStyle = { fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', marginTop: '2rem', marginBottom: '1rem', letterSpacing: '-0.02em' };
  const subHeadingStyle = { fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' };
  const paragraphStyle = { color: '#334155', lineHeight: '1.75', marginBottom: '1.25rem' };
  const listStyle = { color: '#334155', lineHeight: '1.75', paddingLeft: '1.5rem', marginBottom: '1.25rem' };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.03em', color: '#0f172a' }}>
        About Liberty Printer Fix
      </h1>
      
      <p style={{ ...paragraphStyle, fontSize: '1.1rem', fontWeight: 500, color: '#1e293b' }}>
        Helping Businesses and Individuals Solve Printer Problems
      </p>

      <p style={paragraphStyle}>
        Welcome to Liberty Printer Fix, an independent online resource dedicated to printer troubleshooting, setup assistance, maintenance guides, driver support, and technical solutions.
      </p>

      <p style={paragraphStyle}>
        Our goal is simple: make printer troubleshooting easier for everyone.
      </p>

      <p style={paragraphStyle}>
        From home users struggling with a printer that suddenly stops working to businesses relying on receipt printers, label printers, barcode printers, and office printing systems, we provide practical, step-by-step solutions designed to save time and reduce frustration.
      </p>

      <p style={paragraphStyle}>
        Whether you're dealing with printer offline errors, blank pages, connectivity issues, driver conflicts, paper jams, wireless setup problems, or hardware-related faults, Liberty Printer Fix aims to provide clear and actionable guidance that helps you get back to work quickly.
      </p>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '2.5rem 0' }} />

      <h2 style={headingStyle}>Our Mission</h2>
      <p style={paragraphStyle}>
        Printers remain essential tools across homes, offices, retail stores, warehouses, healthcare facilities, educational institutions, and hospitality businesses. Despite advances in technology, printer issues continue to be among the most common technical problems users face.
      </p>
      <p style={paragraphStyle}>
        Professional support can often be expensive, difficult to access, or involve lengthy wait times. Liberty Printer Fix was created to bridge this gap by providing reliable troubleshooting resources that empower users to diagnose and resolve printer issues independently.
      </p>
      <p style={paragraphStyle}>
        Our mission is to create one of the web's most comprehensive knowledge bases for printer troubleshooting and technical support.
      </p>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '2.5rem 0' }} />

      <h2 style={headingStyle}>What We Cover</h2>
      <p style={paragraphStyle}>
        Our content focuses on helping users understand, configure, maintain, and troubleshoot a wide variety of printing devices and systems.
      </p>

      <h3 style={subHeadingStyle}>Printer Troubleshooting</h3>
      <ul style={listStyle}>
        <li>Printer not printing</li>
        <li>Printer offline errors</li>
        <li>Slow printing issues</li>
        <li>Print quality problems</li>
        <li>Blank pages and faded output</li>
        <li>Connection failures</li>
      </ul>

      <h3 style={subHeadingStyle}>Printer Setup & Installation</h3>
      <ul style={listStyle}>
        <li>Wireless printer setup</li>
        <li>Driver installation guides</li>
        <li>Initial printer configuration</li>
        <li>Network printer deployment</li>
        <li>Mobile printing setup</li>
      </ul>

      <h3 style={subHeadingStyle}>Error Code Solutions</h3>
      <ul style={listStyle}>
        <li>HP printer errors</li>
        <li>Canon printer errors</li>
        <li>Epson printer errors</li>
        <li>Brother printer errors</li>
        <li>Lexmark printer errors</li>
        <li>Zebra and Bixolon printer issues</li>
      </ul>

      <h3 style={subHeadingStyle}>Business Printing Systems</h3>
      <ul style={listStyle}>
        <li>POS receipt printers</li>
        <li>Thermal printers</li>
        <li>Barcode printers</li>
        <li>Label printers</li>
        <li>Retail and warehouse printing solutions</li>
      </ul>

      <h3 style={subHeadingStyle}>Maintenance & Optimization</h3>
      <ul style={listStyle}>
        <li>Printhead cleaning</li>
        <li>Firmware updates</li>
        <li>Preventive maintenance</li>
        <li>Performance optimization</li>
        <li>Hardware troubleshooting</li>
      </ul>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '2.5rem 0' }} />

      <h2 style={headingStyle}>Our Editorial Standards</h2>
      <p style={paragraphStyle}>
        At Liberty Printer Fix, we believe technical content should be accurate, practical, and easy to understand.
      </p>
      <p style={paragraphStyle}>
        Every article is developed using a combination of:
      </p>
      <ul style={listStyle}>
        <li>Manufacturer documentation</li>
        <li>Product manuals</li>
        <li>Technical support resources</li>
        <li>Industry best practices</li>
        <li>Troubleshooting methodologies</li>
        <li>Product research and testing data</li>
      </ul>
      <p style={paragraphStyle}>
        Before publication, content is reviewed for:
      </p>
      <ul style={listStyle}>
        <li>Technical accuracy</li>
        <li>User-friendliness</li>
        <li>Clarity of instructions</li>
        <li>Relevance to current devices</li>
        <li>Search intent alignment</li>
      </ul>
      <p style={paragraphStyle}>
        We regularly update articles to reflect firmware updates, software changes, newly discovered fixes, and evolving technologies.
      </p>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '2.5rem 0' }} />

      <h2 style={headingStyle}>Meet Our Team</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
        {[
          { name: "Michael Anderson", role: "Founder & Editor-in-Chief", desc: "Michael leads the editorial direction of Liberty Printer Fix and oversees content quality, publishing standards, and long-term growth initiatives." },
          { name: "Sarah Mitchell", role: "Senior Technical Writer", desc: "Sarah specializes in creating detailed troubleshooting guides, installation tutorials, and printer maintenance resources." },
          { name: "David Thompson", role: "Printer Support Specialist", desc: "David researches printer hardware issues, common faults, and manufacturer troubleshooting procedures." },
          { name: "Jennifer Roberts", role: "Content Editor", desc: "Jennifer reviews all published content to ensure consistency, readability, and editorial quality." },
          { name: "Robert Wilson", role: "Research Analyst", desc: "Robert monitors manufacturer updates, support documentation, and announcements to ensure accuracy." },
          { name: "Emily Carter", role: "Network & Connectivity Expert", desc: "Emily specializes in printer networking, wireless printing systems, and connectivity troubleshooting." },
          { name: "Daniel Garcia", role: "POS & Thermal Printer Specialist", desc: "Daniel focuses on receipt printers, barcode printers, and POS printing systems used in retail." },
          { name: "Olivia Martinez", role: "Technical Content Reviewer", desc: "Olivia performs technical validation and quality assurance reviews of troubleshooting content." },
          { name: "Christopher Evans", role: "Knowledge Base Manager", desc: "Christopher organizes and manages the site's growing library of printer support resources." },
          { name: "Jessica Moore", role: "Community & Support Coordinator", desc: "Jessica manages reader feedback, content suggestions, and communication channels." }
        ].map((member, index) => (
          <div key={index} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '6px', background: '#f8fafc' }}>
            <h4 style={{ margin: '0 0 0.25rem 0', color: '#0f172a', fontWeight: 'bold' }}>{member.name}</h4>
            <p style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-color)', fontSize: '0.85rem', fontWeight: 600 }}>{member.role}</p>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.85rem', lineHeight: '1.5' }}>{member.desc}</p>
          </div>
        ))}
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '2.5rem 0' }} />

      <h2 style={headingStyle}>Why Readers Trust Liberty Printer Fix</h2>
      <p style={paragraphStyle}>
        Thousands of users search for printer solutions every day. Our goal is to become a trusted destination by providing:
      </p>
      <ul style={listStyle}>
        <li>Clear step-by-step instructions</li>
        <li>Independent troubleshooting guidance</li>
        <li>Brand-neutral recommendations</li>
        <li>Regularly updated content</li>
        <li>Practical solutions for real-world issues</li>
      </ul>
      <p style={paragraphStyle}>
        We strive to explain not only how to fix a problem but also why it occurs, helping users better understand their devices and avoid future issues.
      </p>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '2.5rem 0' }} />

      <h2 style={headingStyle}>Independent Resource Disclaimer</h2>
      <p style={paragraphStyle}>
        Liberty Printer Fix is an independent informational website and is not affiliated with, endorsed by, sponsored by, or officially associated with any printer manufacturer.
      </p>
      <p style={paragraphStyle}>
        All trademarks, product names, company names, logos, and registered trademarks mentioned on this website are the property of their respective owners and are used strictly for identification and informational purposes.
      </p>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '2.5rem 0' }} />

      <h2 style={headingStyle}>Contact Us</h2>
      <p style={paragraphStyle}>
        We value feedback from our readers and continuously work to improve our content.
      </p>
      <p style={paragraphStyle}>
        If you have questions, suggestions, corrections, or would like to report an issue with any article, please visit our Contact page.
      </p>
      <p style={paragraphStyle}>
        Thank you for visiting Liberty Printer Fix. Our mission remains simple: provide reliable, practical, and easy-to-understand printer troubleshooting information that helps users solve problems quickly and confidently.
      </p>
    </div>
  );
}
