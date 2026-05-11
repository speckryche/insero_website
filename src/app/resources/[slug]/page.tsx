import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { ArrowLeft, CalendarBlank, Clock, User } from '@phosphor-icons/react/dist/ssr';
import { getArticleBySlug, getArticleSlugs, getRelatedArticles } from '@/lib/articles';
import { mdxComponents } from '@/components/mdx';
import { FinalCTA } from '@/components/sections/FinalCTA';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const { frontmatter } = article;
  const ogImage = frontmatter.ogImage || '/og-default.png';

  return {
    title: `${frontmatter.title} | Insero Resources`,
    description: frontmatter.excerpt,
    alternates: { canonical: `https://insero.cloud/resources/${frontmatter.slug}` },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      url: `https://insero.cloud/resources/${frontmatter.slug}`,
      type: 'article',
      publishedTime: frontmatter.date,
      modifiedTime: frontmatter.updated || frontmatter.date,
      authors: [frontmatter.author],
      images: [{ url: ogImage, width: 1200, height: 630, alt: frontmatter.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const { frontmatter, content, readingTime } = article;
  const related = getRelatedArticles(slug, frontmatter.category, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    datePublished: frontmatter.date,
    dateModified: frontmatter.updated || frontmatter.date,
    author: { '@type': 'Person', name: frontmatter.author },
    image: frontmatter.ogImage || 'https://insero.cloud/og-default.png',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://insero.cloud/resources/${frontmatter.slug}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Insero',
      url: 'https://insero.cloud',
    },
  };

  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Article Header */}
      <section className="pt-32 lg:pt-40 pb-12 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-[#008838] hover:text-[#005C28] font-medium mb-8 transition-colors group"
            >
              <ArrowLeft weight="bold" className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Resources
            </Link>

            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-[#E6F5EC] text-[#008838] text-xs font-semibold rounded-full uppercase tracking-wider">
                {frontmatter.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-6 leading-tight">
              {frontmatter.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#64748b]">
              <div className="flex items-center gap-2">
                <User weight="fill" className="w-4 h-4" />
                <span>{frontmatter.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarBlank weight="fill" className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock weight="fill" className="w-4 h-4" />
                <span>{readingTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20 bg-white">
        <div className="container-custom">
          <article className="max-w-3xl mx-auto prose prose-lg prose-slate prose-headings:font-display prose-headings:text-[#1e293b] prose-headings:font-bold prose-a:text-[#008838] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#1e293b] prose-code:text-[#008838] prose-code:bg-[#E6F5EC] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
            <MDXRemote
              source={content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                  ],
                },
              }}
            />
          </article>
        </div>
      </section>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="py-16 bg-[#f8fafb]">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-display font-bold text-[#1e293b] mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.frontmatter.slug}
                    href={`/resources/${r.frontmatter.slug}`}
                    className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <span className="text-xs font-semibold text-[#008838] uppercase tracking-wider">
                      {r.frontmatter.category}
                    </span>
                    <h3 className="font-display font-bold text-[#1e293b] mt-2 mb-2 group-hover:text-[#008838] transition-colors text-sm leading-snug">
                      {r.frontmatter.title}
                    </h3>
                    <p className="text-xs text-[#64748b] line-clamp-2">{r.frontmatter.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <FinalCTA />
    </>
  );
}
