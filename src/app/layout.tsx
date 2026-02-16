import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const baseUrl = 'https://insero.cloud';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Telecom Broker & Connectivity Consultant | Insero',
    template: '%s | Insero',
  },
  description:
    'Vendor-agnostic telecom broker comparing 100+ carriers for voice, internet, SD-WAN, and security. Zero cost to you.',
  keywords: [
    'telecom broker',
    'telecom consultant',
    'telecom brokerage services',
    'vendor agnostic telecom consulting',
    'compare telecom providers for business',
    'telecom cost reduction consultant',
    'cloud consulting',
    'VoIP',
    'business internet',
    'SD-WAN',
    'network security',
  ],
  authors: [{ name: 'Insero' }],
  creator: 'Insero',
  publisher: 'Insero',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Insero',
    title: 'Telecom Broker & Connectivity Consultant | Insero',
    description:
      'Vendor-agnostic telecom broker that compares 100+ carriers. Zero cost to you — we\'re paid by carriers, not clients.',
    images: [
      {
        url: '/og-image.png', // Replace with your 1200x630px PNG image
        width: 1200,
        height: 630,
        alt: 'Insero - Cloud & Connectivity Consulting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Telecom Broker & Connectivity Consultant | Insero',
    description:
      'Vendor-agnostic telecom broker that compares 100+ carriers. Voice, internet, SD-WAN, and security solutions at zero cost to you.',
    images: ['/og-image.png'], // Replace with your 1200x630px PNG image
  },
  alternates: {
    canonical: baseUrl,
  },
};

// JSON-LD Organization Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Insero',
  url: baseUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${baseUrl}/insero-logo-dark.png`,
    width: 200,
    height: 60,
  },
  image: `${baseUrl}/og-image.png`,
  description:
    'Vendor-agnostic telecom broker comparing 100+ carriers to find the best voice, internet, SD-WAN, and security solutions for businesses at zero cost.',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-844-252-3185',
    contactType: 'sales',
    email: 'sales@insero.cloud',
    availableLanguage: 'English',
    areaServed: 'US',
    contactOption: 'TollFree',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Jacksonville',
    addressRegion: 'OR',
    addressCountry: 'US',
  },
  areaServed: {
    '@type': 'Country',
    name: 'US',
  },
  knowsAbout: [
    'Telecom Brokerage',
    'Voice Connectivity',
    'Business Internet',
    'SD-WAN',
    'Network Security',
    'UCaaS',
    'VoIP',
  ],
  serviceType: [
    'Cloud Consulting',
    'Voice Connectivity',
    'Internet Connectivity',
    'SD-WAN Solutions',
    'Network Security',
  ],
};

// JSON-LD WebSite Schema for sitelinks search
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Insero',
  url: baseUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${baseUrl}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
