import type { Metadata } from 'next';
import Link from 'next/link';
import { company } from '@/config/company';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Insero - Learn how we collect, use, and protect your personal information.',
  openGraph: {
    title: 'Privacy Policy | Insero',
    description: 'Privacy Policy for Insero - Learn how we collect, use, and protect your personal information.',
    url: 'https://insero.cloud/privacy',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Insero - Cloud & Connectivity Consulting' }],
  },
  alternates: {
    canonical: 'https://insero.cloud/privacy',
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'February 7, 2026';

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      {/* Header */}
      {/* The dark fill is painted by the absolutely-positioned .hero-gradient
          below, not by this section, so the header has nothing to detect unless
          the marker is declared here. Without it Header.tsx renders the
          light-background wordmark — black on dark navy. */}
      <section data-dark-hero="true" className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6" style={{ color: '#ffffff' }}>
              Privacy Policy
            </h1>
            <p className="text-xl text-white/70">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto prose prose-lg">

            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl text-[var(--color-secondary)]">

              <h2 className="text-2xl font-display font-bold mb-4 text-[var(--color-secondary)]">Introduction</h2>
              <p className="mb-6 text-[var(--color-secondary)]/80">
                {company.name} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting
                your personal information. This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website at insero.cloud or use our services.
              </p>
              <p className="mb-8 text-[var(--color-secondary)]/80">
                Please read this Privacy Policy carefully. By accessing or using our website, you acknowledge
                that you have read, understood, and agree to be bound by this Privacy Policy.
              </p>

              <h2 className="text-2xl font-display font-bold mb-4 text-[var(--color-secondary)]">Information We Collect</h2>

              <h3 className="text-xl font-semibold mb-3 text-[var(--color-secondary)]">Personal Information You Provide</h3>
              <p className="mb-4 text-[var(--color-secondary)]/80">
                We collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 mb-6 text-[var(--color-secondary)]/80 space-y-2">
                <li>Fill out our contact form or request a consultation</li>
                <li>Complete our technology audit assessment</li>
                <li>Subscribe to our newsletter or communications</li>
                <li>Communicate with us via email, phone, or other means</li>
              </ul>
              <p className="mb-6 text-[var(--color-secondary)]/80">
                This information may include your name, email address, phone number, company name,
                and any other information you choose to provide.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-[var(--color-secondary)]">Automatically Collected Information</h3>
              <p className="mb-8 text-[var(--color-secondary)]/80">
                When you visit our website, we may automatically collect certain information about your
                device and usage, including your IP address, browser type, operating system, referring URLs,
                pages viewed, and the dates and times of your visits. This information helps us improve
                our website and services.
              </p>

              <h2 className="text-2xl font-display font-bold mb-4 text-[var(--color-secondary)]">How We Use Your Information</h2>
              <p className="mb-4 text-[var(--color-secondary)]/80">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mb-8 text-[var(--color-secondary)]/80 space-y-2">
                <li>Respond to your inquiries and provide requested services</li>
                <li>Send you information about our services, promotions, and updates</li>
                <li>Improve our website, products, and services</li>
                <li>Analyze usage patterns and trends</li>
                <li>Protect against fraudulent or unauthorized activity</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-display font-bold mb-4 text-[var(--color-secondary)]">Information Sharing</h2>
              <p className="mb-4 text-[var(--color-secondary)]/80">
                We do not sell, trade, or rent your personal information to third parties. We may share
                your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-8 text-[var(--color-secondary)]/80 space-y-2">
                <li><strong>Service Providers:</strong> We may share information with trusted third-party
                service providers who assist us in operating our website and conducting our business,
                such as email delivery and data hosting services.</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or
                in response to valid legal requests from public authorities.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of
                assets, your information may be transferred as part of that transaction.</li>
              </ul>

              <h2 className="text-2xl font-display font-bold mb-4 text-[var(--color-secondary)]">Data Security</h2>
              <p className="mb-8 text-[var(--color-secondary)]/80">
                We implement appropriate technical and organizational security measures to protect your
                personal information against unauthorized access, alteration, disclosure, or destruction.
                However, no method of transmission over the Internet or electronic storage is 100% secure,
                and we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-display font-bold mb-4 text-[var(--color-secondary)]">Cookies and Tracking Technologies</h2>
              <p className="mb-8 text-[var(--color-secondary)]/80">
                Our website may use cookies and similar tracking technologies to enhance your browsing
                experience and analyze website traffic. You can control cookie settings through your
                browser preferences. Disabling cookies may affect certain features of our website.
              </p>

              <h2 className="text-2xl font-display font-bold mb-4 text-[var(--color-secondary)]">Your Rights and Choices</h2>
              <p className="mb-4 text-[var(--color-secondary)]/80">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 mb-8 text-[var(--color-secondary)]/80 space-y-2">
                <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Opt-Out:</strong> Opt out of receiving marketing communications from us</li>
              </ul>
              <p className="mb-8 text-[var(--color-secondary)]/80">
                To exercise any of these rights, please contact us using the information provided below.
              </p>

              <h2 className="text-2xl font-display font-bold mb-4 text-[var(--color-secondary)]">Third-Party Links</h2>
              <p className="mb-8 text-[var(--color-secondary)]/80">
                Our website may contain links to third-party websites. We are not responsible for the
                privacy practices or content of these external sites. We encourage you to review the
                privacy policies of any third-party sites you visit.
              </p>

              <h2 className="text-2xl font-display font-bold mb-4 text-[var(--color-secondary)]">Children&apos;s Privacy</h2>
              <p className="mb-8 text-[var(--color-secondary)]/80">
                Our website and services are not directed to individuals under the age of 18. We do not
                knowingly collect personal information from children. If we become aware that we have
                collected personal information from a child, we will take steps to delete that information.
              </p>

              <h2 className="text-2xl font-display font-bold mb-4 text-[var(--color-secondary)]">Changes to This Policy</h2>
              <p className="mb-8 text-[var(--color-secondary)]/80">
                We may update this Privacy Policy from time to time to reflect changes in our practices
                or for legal, operational, or regulatory reasons. We will notify you of any material
                changes by posting the updated policy on this page with a new &quot;Last Updated&quot; date.
              </p>

              <h2 className="text-2xl font-display font-bold mb-4 text-[var(--color-secondary)]">Contact Us</h2>
              <p className="mb-4 text-[var(--color-secondary)]/80">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-[var(--color-background)] rounded-xl p-6 text-[var(--color-secondary)]/80">
                <p className="font-semibold text-[var(--color-secondary)]">{company.name}</p>
                <p>{company.location.full}</p>
                <p>Email: <a href={company.emailLink} className="text-[var(--color-primary)] hover:underline">{company.email}</a></p>
                <p>Phone: <a href={company.phoneLink} className="text-[var(--color-primary)] hover:underline">{company.phoneFormatted}</a></p>
              </div>

              <div className="mt-12 pt-8 border-t border-[var(--color-secondary)]/10">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:underline font-medium"
                >
                  &larr; Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
