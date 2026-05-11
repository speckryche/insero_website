import type { Metadata } from 'next';
import { getAllArticles } from '@/lib/articles';
import { ResourcesClient } from './ResourcesClient';

export const metadata: Metadata = {
  title: 'Resources | Insero',
  description:
    'Guides, comparisons, and expert advice on voice, internet, SD-WAN, and security solutions for your business.',
  alternates: { canonical: 'https://insero.cloud/resources' },
  openGraph: {
    title: 'Resources | Insero',
    description: 'Guides, comparisons, and expert advice on business connectivity.',
    url: 'https://insero.cloud/resources',
  },
};

export default function ResourcesPage() {
  const articles = getAllArticles().map((a) => ({
    slug: a.frontmatter.slug,
    title: a.frontmatter.title,
    excerpt: a.frontmatter.excerpt,
    date: a.frontmatter.date,
    category: a.frontmatter.category,
    readingTime: a.readingTime,
  }));

  return (
    <section className="pt-32 lg:pt-40 pb-24 bg-[#f8fafb] min-h-screen">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-[#1e293b] mb-4">
            Resources
          </h1>
          <p className="text-lg md:text-xl text-[#475569] max-w-2xl mx-auto">
            Guides, comparisons, and expert advice to help you make better technology decisions.
          </p>
        </div>

        <ResourcesClient articles={articles} />
      </div>
    </section>
  );
}
