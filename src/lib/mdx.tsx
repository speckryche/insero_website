import { compile, run } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { Callout } from '@/components/mdx/Callout';
import { Comparison } from '@/components/mdx/Comparison';
import { ArticleCTA } from '@/components/mdx/ArticleCTA';
import { ArticleFAQ } from '@/components/mdx/ArticleFAQ';
import { GuideDownload } from '@/components/mdx/GuideDownload';

const components = {
  Callout,
  Comparison,
  CTA: ArticleCTA,
  FAQ: ArticleFAQ,
  GuideDownload,
};

export async function renderMDX(source: string) {
  const compiled = await compile(source, {
    outputFormat: 'function-body',
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
  });

  const { default: MDXContent } = await run(String(compiled), {
    ...runtime,
    baseUrl: import.meta.url,
  });

  return <MDXContent components={components} />;
}
