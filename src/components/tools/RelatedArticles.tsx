import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

interface RelatedArticle {
  href: string;
  category: string;
  title: string;
  description: string;
}

interface RelatedArticlesProps {
  heading?: string;
  articles: RelatedArticle[];
}

export function RelatedArticles({ heading = 'Related reading', articles }: RelatedArticlesProps) {
  return (
    <div className="max-w-3xl mx-auto mt-12">
      <h2 className="font-display font-bold text-xl text-[#1e293b] mb-6">{heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {articles.map((article) => (
          <Link
            key={article.href}
            href={article.href}
            className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#008838]/30 transition-all group"
          >
            <span className="text-xs font-semibold text-[#008838] uppercase tracking-wider">
              {article.category}
            </span>
            <h3 className="font-display font-bold text-[#1e293b] mt-2 mb-2 group-hover:text-[#008838] transition-colors text-sm leading-snug">
              {article.title}
            </h3>
            <p className="text-xs text-[#64748b] leading-relaxed">{article.description}</p>
            <span className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-[#008838]">
              Read the guide
              <ArrowRight weight="bold" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RelatedArticles;
