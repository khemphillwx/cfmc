import React from "react";

const LAST_UPDATED = "July 16, 2026";

type Section = {
  heading: string;
  body: string[];
};

const sections: Section[] = [
  {
    heading: "Introduction",
    body: [
      "Carrollton First Methodist Church (“CFMC,” “we,” “us,” or “our”) respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains what information we collect through our website, how we use it, and the choices you have.",
      "By using this website, you agree to the collection and use of information in accordance with this policy.",
    ],
  },
  {
    heading: "Information We Collect",
    body: [
      "We collect information that you voluntarily provide to us, such as when you fill out a connect card, contact form, prayer request, event registration, or giving form. This may include your name, email address, phone number, mailing address, and any message or details you choose to share.",
      "We also automatically collect certain technical information when you visit our site, such as your browser type, device information, pages visited, and general usage data. This information helps us understand how our website is used and how we can improve it.",
    ],
  },
  {
    heading: "How We Use Your Information",
    body: [
      "We use the information we collect to respond to your inquiries and requests, to welcome and follow up with guests, to process online giving and event registrations, to communicate with you about church news and ministries, and to maintain and improve our website and services.",
      "We do not sell, rent, or trade your personal information to third parties.",
    ],
  },
  {
    heading: "Cookies and Analytics",
    body: [
      "Our website may use cookies and similar technologies to help the site function properly and to understand how visitors interact with our pages. You can set your browser to refuse cookies or to alert you when cookies are being sent; however, some parts of the site may not function properly without them.",
    ],
  },
  {
    heading: "Third-Party Services",
    body: [
      "Some features of our website rely on trusted third-party services. Connect, serve, and registration forms are hosted through Google Forms; online giving is processed through our giving provider; and video content may be embedded from YouTube. When you use these features, your information is handled in accordance with that provider’s own privacy policy. We encourage you to review the privacy policies of any third-party services you use.",
    ],
  },
  {
    heading: "Links to Other Websites",
    body: [
      "Our website may contain links to external sites that are not operated by us, including our student ministry, preschool, and social media pages. We are not responsible for the content or privacy practices of those websites, and this Privacy Policy does not apply to them.",
    ],
  },
  {
    heading: "Data Security",
    body: [
      "We take reasonable measures to protect the personal information you share with us. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "Children’s Privacy",
    body: [
      "Our website is not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us so we can remove it.",
    ],
  },
  {
    heading: "Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically to stay informed about how we protect your information.",
    ],
  },
  {
    heading: "Contact Us",
    body: [
      "If you have any questions about this Privacy Policy, please contact us:",
      "Carrollton First Methodist Church\n206 Newnan St, Carrollton, GA 30117\n(770) 832-7069\ninfo@carrolltonfirst.com",
    ],
  },
];

export default function Privacy() {
  return (
    <div className="bg-church-warm">
      {/* Header */}
      <section className="pt-40 pb-20 px-6 text-white text-center relative bg-church-blue">
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif mb-8">
            Privacy Policy
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Last updated {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-0">
          {sections.map((section, index) => (
            <div
              key={index}
              className="py-12 border-b border-black/10 last:border-b-0"
            >
              <h2 className="text-2xl md:text-3xl font-serif text-church-blue mb-5">
                {section.heading}
              </h2>
              {section.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-lg text-church-dark/70 leading-relaxed mb-4 last:mb-0 whitespace-pre-line"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
