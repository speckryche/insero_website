'use client';

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Callout } from './Callout';
import { Comparison } from './Comparison';
import { ArticleCTA } from './ArticleCTA';
import { ArticleFAQ } from './ArticleFAQ';

const components = {
  Callout,
  Comparison,
  CTA: ArticleCTA,
  FAQ: ArticleFAQ,
};

export function MDXRenderer({ source }: { source: MDXRemoteSerializeResult }) {
  return <MDXRemote {...source} components={components} />;
}
