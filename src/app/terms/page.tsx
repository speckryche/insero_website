import type { Metadata } from 'next';
import Link from 'next/link';
import { company } from '@/config/company';

export const metadata: Metadata = {
  title: 'Terms of Service | Insero',
  description: 'Terms of Service for Insero - Read our terms and conditions for using our website and services.',
  alternates: {
    canonical: 'https://insero.cloud/terms',
  },
};

export default function TermsOfServicePage() {
  const lastUpdated = 'February 7, 2026';

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      {/* Header */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6" style={{ color: '#ffffff' }}>
              Terms of Service
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
          <div className="max-w-3xl mx-auto prose prose-lg prose-invert">

            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl text-[var(--color-secondary)]">

              <h2 className="text-2xl font-display font-bold mb-4 text-[var(--color-secondary)]">Agreement to Terms</h2>
              <p className="mb-6 text-[var(--color-secondary)]/80">
                These Terms of Service (&quot;Terms&quot;) govern your access to and use of the {company.name} website
                at insero.cloud (&quot;Website&quot;) and our consulting services. By accessing our Website or using
                our services, you agree to be bound by these Terms.
              </p>
              <p className="mb-8 text-[var(--color-secondary)]/80">
                If you do not agree to these Terms, please do not use our Website or services. We reserve
                the right to modify these Terms at any time, and such modifications will be effective
                immediately upon posting.
              </p>

              <h2 className="text-2xl font-display font-bold mb-4 text-[var(--color-secondary)]">Description of Services</h2>
              <p className="mb-6 text-[var(--color-secondary)]/80">
                {company.name} provides cloud and connectivity consulting services, including but not limited to:
              </p>
              <ul className="list-disc pl-6 mb-8 text-[var(--color-secondary)]/80 space-y-2">
                <li>Voice connectivity solutions (VoIP, Cloud PBX, unified communications)</li>
                <li>Internet connectivity consulting and carrier sourcing</li>
                <li>SD-WAN and network redundancy solutions</li>
                <li>Security consulting and solutions</li>
                <li>Technology audits and assessments</li>
              </ul>
              <p className="mb-8 text-[var(--color-secondary)]/80">
                Our consulting services are provided at no cost to the client. We are compensated by our
                carrier and technology partners when you choose to implement solutions through our recommendations.
              </p>

              <h2 className="text-2xl font-display font-bold mb-4 text-[var(--color-secondary)]">Use of Website</h2>
              <p className="mb-4 text-[var(--color-secondary)]/80">
                You agree to use our Website only for lawful purposes and in accordance with these Terms.
                You agree not to:
              </p>
              <ul className="list-disc pl-6 mb-8 text-[var(--color-secondary)]/80 space-y-2">
                <li>Use the Website in any way that violates applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to any part of the Website or its systems</li>
                <li>Use any automated means to access the Website or collect information</li>
                <li>Interfere with or disrupt the Website or servers connected to it</li>
                <li>Transmit any viruses, malware, or other harmful code</li>
                <li>Impersonate any person or entity or misrepresent your affiliation</li>
              </ul>

              <h2 className="text-2xl font-display font-bold mb-4 text-[var(--color-secondary)]">Intellectual Property</h2>
              <p className="mb-8 text-[var(--color-secondary)]/80">
                All content on this Website, including text, graphics, logos, images, and software, is the
                property of {company.name} or its content suppliers and is protected by intellectual property
                laws. You may not reproduce, distribute, modify, or create derivative works from any content
                without our express written permission.
              </p>

              <h2 className="text-2xl font-display font-bold mb-4 text-[var(--color-secondary)]">Consulting Services</h2>
              <p className="mb-4 text-[var(--color-secondary)]/80">
                When engaging our consulting services:
              </p>
              <ul className="list-disc pl-6 mb-8 text-[var(--color-secondary)]/80 space-y-2">
                <li><strong>Recommendations:</strong> Our recommendations are based on information you provide
                and our professional expertise. Final decisions regarding any technology solutions remain yours.</li>
                <li><strong>Third-Party Services:</strong> Any contracts for services are between you and the
                respective carrier or technology provider. We facilitate these relationships but are not a
                party to those agreements.</li>
                <li><strong>Accuracy of Information:</strong> You agree to provide accurate and complete
                information when requesting our services or completing assessments.</li>
                <li><strong>No Guarantee:</strong> While we strive to find the best solutions for your needs,
                we cannot guarantee specific results, savings, or performance outcomes.</li>
              </ul>

              <h2 className="text-2xl font-display font-bold mb-4 text-[var(--color-secondary)]">Disclaimer of Warranties</h2>
              <p className="mb-8 text-[var(--color-secondary)]/80">
                THE WEBSITE AND SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF
                ANY KIND, EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL
                WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE WEBSITE WILL BE UNINTERRUPTED,
                ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
              </p>

              <h2 className="text-2xl font-display font-bold mb-4 text-[var(--color-secondary)]">Limitation of Liability</h2>
              <p className="mb-8 text-[var(--color-secondary)]/80">
                TO THE FULLEST EXTENT PERMITTED BY LAW, {company.name.toUpperCase()} SHALL NOT BE LIABLE FOR ANY
                INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS,
                DATA, OR BUSINESS OPPORTUNITIES, ARISING FROM YOUR USE OF THE WEBSITE OR SERVICES, EVEN IF
                WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL LIABILITY SHALL NOT
                EXCEED THE AMOUNT YOU PAID US, IF ANY, FOR SERVICES IN THE TWELVE MONTHS PRECEDING THE CLAIM.
              </p>

              <h2 className="text-2xl font-display font-bold mb-4 text-[var(--color-secondary)]">Indemnification</h2>
              <p className="mb-8 text-[var(--color-secondary)]/80">
                You agree to indemnify, defend, and hold harmless {company.name}, its officers, directors,
                employees, and agents from any claims, liabilities, damages, losses, or expenses arising
                from your use of the Website or services, your violation of these Terms, or your violation
                of any rights of another party.
              </p>

              <h2 className="text-2xl font-display font-bold mb-4 text-[var(--color-secondary)]">Third-Party Links</h2>
              <p className="mb-8 text-[var(--color-secondary)]/80">
                Our Website may contain links to third-party websites. These links are provided for your
                convenience only. We have no control over and assume no responsibility for the content,
                privacy policies, or practices of third-party websites. Your use of third-party websites
                is at your own risk.
              </p>

              <h2 className="text-2xl font-display font-bold mb-4 text-[var(--color-secondary)]">Governing Law</h2>
              <p className="mb-8 text-[var(--color-secondary)]/80">
                These Terms shall be governed by and construed in accordance with the laws of the State of
                Oregon, without regard to its conflict of law provisions. Any disputes arising from these
                Terms or your use of the Website shall be resolved in the state or federal courts located
                in Oregon.
              </p>

              <h2 className="text-2xl font-display font-bold mb-4 text-[var(--color-secondary)]">Severability</h2>
              <p className="mb-8 text-[var(--color-secondary)]/80">
                If any provision of these Terms is found to be unenforceable or invalid, that provision
                shall be limited or eliminated to the minimum extent necessary, and the remaining provisions
                shall remain in full force and effect.
              </p>

              <h2 className="text-2xl font-display font-bold mb-4 text-[var(--color-secondary)]">Entire Agreement</h2>
              <p className="mb-8 text-[var(--color-secondary)]/80">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you
                and {company.name} regarding your use of the Website and supersede any prior agreements.
              </p>

              <h2 className="text-2xl font-display font-bold mb-4 text-[var(--color-secondary)]">Contact Us</h2>
              <p className="mb-4 text-[var(--color-secondary)]/80">
                If you have any questions about these Terms of Service, please contact us:
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
