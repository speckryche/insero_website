import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { validateToken } from '@/lib/lead-magnets/token';

/**
 * Gated collateral. Each guide is a static PDF that deliberately does NOT live
 * in public/ — anything under public/ is fetchable by URL, which would bypass
 * the email gate entirely. Files are read from src/assets/collateral at request
 * time instead.
 *
 * Because that path is built at runtime from process.cwd(), @vercel/nft cannot
 * trace it, so the directory is pinned into the serverless bundle by
 * outputFileTracingIncludes in next.config.ts. Adding a guide here without
 * adding it there yields a 500 in production and a clean 200 locally.
 */
const FIELD_GUIDE = {
  title: 'The POTS Replacement Field Guide',
  file: path.join('src', 'assets', 'collateral', 'pots-replacement-field-guide.pdf'),
  downloadName: 'insero-pots-replacement-field-guide.pdf',
};

const GUIDES: Record<string, { title: string; file: string; downloadName: string }> = {
  'pots-replacement-field-guide': FIELD_GUIDE,
  // NOT DEAD CODE. 'pots-replacement-playbook' is the retired slug this guide
  // shipped under before the rename. It stays registered for two live cases:
  // download links already emailed to visitors (tokens last 7 days, and people
  // keep the mail far longer), and browsers still running a cached client
  // bundle from before the rename, which post the old slug. Both share the one
  // FIELD_GUIDE object above, so the alias cannot drift from the canonical
  // slug — same file, same Content-Disposition filename. Removing this makes
  // those requests 404.
  'pots-replacement-playbook': FIELD_GUIDE,
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const guide = GUIDES[slug];
  if (!guide) {
    return NextResponse.json({ error: 'Guide not found' }, { status: 404 });
  }

  // Validate token. The slug is part of the signed payload, so a token issued
  // for one guide does not open another.
  const token = request.nextUrl.searchParams.get('token');
  const email = request.nextUrl.searchParams.get('email');
  if (!token || !email || !validateToken(token, email, slug)) {
    return NextResponse.json({ error: 'Invalid or expired download link' }, { status: 403 });
  }

  let pdf: Buffer;
  try {
    pdf = await fs.readFile(path.join(process.cwd(), guide.file));
  } catch (err) {
    // A missing file here means the asset did not make it into the deployment,
    // not that the visitor did anything wrong — surface it as a server error.
    console.error(`Lead magnet asset missing for "${slug}":`, err);
    return NextResponse.json({ error: 'Guide is temporarily unavailable' }, { status: 500 });
  }

  return new NextResponse(new Uint8Array(pdf), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${guide.downloadName}"`,
      'Content-Length': String(pdf.byteLength),
      'Cache-Control': 'private, max-age=3600',
    },
  });
}
