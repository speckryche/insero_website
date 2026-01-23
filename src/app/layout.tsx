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
    default: 'Insero | Cloud & Connectivity Consulting',
    template: '%s | Insero',
  },
  description:
    'Expert cloud and connectivity consulting at zero cost to you. We simplify complexity and help you save money on voice, internet, SD-WAN, and security solutions.',
  keywords: [
    'cloud consulting',
    'connectivity',
    'voice solutions',
    'internet connectivity',
    'SD-WAN',
    'network security',
    'telecom consulting',
    'VoIP',
    'business internet',
    'network redundancy',
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
    title: 'Insero | Cloud & Connectivity Consulting',
    description:
      'Expert guidance at zero cost to you. We\'re paid by carriers, not clients.',
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
    title: 'Insero | Cloud & Connectivity Consulting',
    description:
      'Expert cloud and connectivity consulting at zero cost to you. Voice, internet, SD-WAN, and security solutions.',
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
  logo: `${baseUrl}/logo.png`,
  description:
    'Expert cloud and connectivity consulting. We help businesses find the best voice, internet, SD-WAN, and security solutions at no cost.',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-123-456-7890',
    contactType: 'sales',
    availableLanguage: 'English',
  },
  sameAs: [],
  areaServed: 'US',
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
