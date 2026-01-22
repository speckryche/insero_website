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

export const metadata: Metadata = {
  title: 'Insero | Cloud & Connectivity Consulting',
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
  ],
  openGraph: {
    title: 'Insero | Cloud & Connectivity Consulting',
    description:
      'Expert guidance at zero cost to you. We\'re paid by carriers, not clients.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
