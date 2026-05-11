import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  updated?: string;
  category: string;
  author: string;
  ogImage?: string;
}

export interface Article {
  frontmatter: ArticleFrontmatter;
  content: string;
  readingTime: string;
}

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  return {
    frontmatter: {
      title: data.title,
      slug: data.slug || slug,
      excerpt: data.excerpt || '',
      date: data.date,
      updated: data.updated || undefined,
      category: data.category || 'Uncategorized',
      author: data.author || 'Speck Hansen',
      ogImage: data.ogImage || undefined,
    },
    content,
    readingTime: readingTime(content).text,
  };
}

export function getAllArticles(): Article[] {
  const slugs = getArticleSlugs();
  return slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is Article => a !== null)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((a) => a.frontmatter.category === category);
}

export function getRelatedArticles(currentSlug: string, category: string, limit = 3): Article[] {
  return getAllArticles()
    .filter((a) => a.frontmatter.slug !== currentSlug && a.frontmatter.category === category)
    .slice(0, limit);
}

export const CATEGORIES = [
  'Voice',
  'Internet',
  'POTS Replacement',
  'SD-WAN',
  'Security',
  'How We Work',
  'Comparisons',
] as const;
