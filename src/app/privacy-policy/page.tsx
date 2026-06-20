import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - LibertyPrinterFix",
  description: "Read the Privacy Policy for LibertyPrinterFix, outlining how we handle data and user privacy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
        Privacy Policy
      </h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#334155', lineHeight: '1.75' }}>
        <p>
          At libertyprinterfix.com, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by libertyprinterfix.com and how we use it.
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '1rem' }}>Log Files</h2>
        <p>
          libertyprinterfix.com follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '1rem' }}>Cookies and Web Beacons</h2>
        <p>
          Like any other website, libertyprinterfix.com uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '1rem' }}>Privacy Policies</h2>
        <p>
          You may consult this list to find the Privacy Policy for each of the advertising partners of libertyprinterfix.com. Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on libertyprinterfix.com, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '1rem' }}>Third Party Privacy Policies</h2>
        <p>
          libertyprinterfix.com's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '1rem' }}>Consent</h2>
        <p>
          By using our website, you hereby consent to our Privacy Policy and agree to its terms.
        </p>
      </div>
    </div>
  );
}
