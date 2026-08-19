'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CalendarBlank, Clock } from '@phosphor-icons/react';

interface ArticleCard {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readingTime: string;
}

const CATEGORIES = [
  'All',
  'Voice',
  'Internet',
  'POTS Replacement',
  'SD-WAN',
  'Security',
  'How We Work',
  'Comparisons',
];

export function ResourcesClient({ articles }: { articles: ArticleCard[] }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  const [featured, ...rest] = filtered;

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-12 justify-center">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
              activeCategory === cat
                ? 'bg-[#008838] text-white'
                : 'bg-white text-[#475569] border border-gray-200 hover:border-[#008838] hover:text-[#008838]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-[#64748b] py-12">No articles in this category yet.</p>
      )}

      {/* Featured Article */}
      {featured && (
        <Link
          href={`/resources/${featured.slug}`}
          className="block bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow mb-12 overflow-hidden group"
        >
          <div className="p-8 lg:p-12">
            <span className="inline-block px-3 py-1 bg-[#E6F5EC] text-[#005C28] text-xs font-semibold rounded-full uppercase tracking-wider mb-4">
              {featured.category}
            </span>
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-[#1e293b] mb-3 group-hover:text-[#008838] transition-colors">
              {featured.title}
            </h2>
            <p className="text-[#475569] mb-4 leading-relaxed">{featured.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-[var(--color-gray-500)]">
              <div className="flex items-center gap-1.5">
                <CalendarBlank weight="fill" className="w-4 h-4" />
                <span>{new Date(featured.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock weight="fill" className="w-4 h-4" />
                <span>{featured.readingTime}</span>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Article Grid */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((article) => (
            <Link
              key={article.slug}
              href={`/resources/${article.slug}`}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden group flex flex-col"
            >
              <div className="p-6 flex flex-col flex-grow">
                <span className="inline-block self-start px-3 py-1 bg-[#E6F5EC] text-[#005C28] text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
                  {article.category}
                </span>
                <h3 className="font-display font-bold text-[#1e293b] mb-2 group-hover:text-[#008838] transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-sm text-[#64748b] mb-4 line-clamp-3 flex-grow">{article.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-[var(--color-gray-500)]">
                  <div className="flex items-center gap-1.5">
                    <CalendarBlank weight="fill" className="w-3.5 h-3.5" />
                    <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock weight="fill" className="w-3.5 h-3.5" />
                    <span>{article.readingTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
