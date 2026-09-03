import React from "react";

const LAST_UPDATED = "July 16, 2026";

type Section = {
  heading: string;
  body: string[];
};

const sections: Section[] = [
  {
    heading: "Acceptance of Terms",
    body: [
      "Welcome to the website of Carrollton First Methodist Church (“CFMC,” “we,” “us,” or “our”). By accessing or using this website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, please do not use our website.",
    ],
  },
  {
    heading: "Use of the Website",
    body: [
      "You may use this website for lawful, personal, and non-commercial purposes, including learning about our church, ministries, events, and beliefs. You agree not to use the site in any way that could damage, disable, overburden, or impair it, or interfere with any other party’s use of the site.",
    ],
  },
  {
    heading: "Intellectual Property",
    body: [
      "Unless otherwise noted, all content on this website — including text, graphics, logos, images, and design — is the property of Carrollton First Methodist Church or its content providers and is protected by applicable copyright and intellectual property laws. You may view and share content for personal, non-commercial use, but you may not reproduce, distribute, or modify it without our prior written permission.",
    ],
  },
  {
    heading: "Online Giving and Donations",
    body: [
      "Online giving is provided as a convenience and is processed through a trusted third-party provider. By making a donation, you authorize the charge to your selected payment method. Please review your gift details carefully before submitting. If you believe an error has been made, contact us as soon as possible so we can assist you.",
    ],
  },
  {
    heading: "Third-Party Links and Services",
    body: [
      "Our website may include links to third-party websites and services, including our student ministry, preschool, social media pages, online forms, and video content. These links are provided for your convenience. We do not control and are not responsible for the content, policies, or practices of any third-party websites or services.",
    ],
  },
  {
    heading: "Disclaimer",
    body: [
      "This website and its content are provided on an “as is” and “as available” basis without warranties of any kind, either express or implied. While we strive to keep the information on this site accurate and up to date, we make no guarantees regarding its completeness, accuracy, or reliability.",
    ],
  },
  {
    heading: "Limitation of Liability",
    body: [
      "To the fullest extent permitted by law, Carrollton First Methodist Church shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of, or inability to use, this website or any content provided on it.",
    ],
  },
  {
    heading: "Governing Law",
    body: [
      "These Terms of Service are governed by and construed in accordance with the laws of the State of Georgia, without regard to its conflict of law provisions.",
    ],
  },
  {
    heading: "Changes to These Terms",
    body: [
      "We may update these Terms of Service from time to time. Any changes will be posted on this page with an updated effective date. Your continued use of the website after changes are posted constitutes your acceptance of the revised terms.",
    ],
  },
  {
    heading: "Contact Us",
    body: [
      "If you have any questions about these Terms of Service, please contact us:",
      "Carrollton First Methodist Church\n206 Newnan St, Carrollton, GA 30117\n(770) 832-7069\ninfo@carrolltonfirst.com",
    ],
  },
];

export default function Terms() {
  return (
    <div className="bg-church-warm">
      {/* Header */}
      <section className="pt-40 pb-20 px-6 text-white text-center relative bg-church-blue">
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif mb-8">
            Terms of Service
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
