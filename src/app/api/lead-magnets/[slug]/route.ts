import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import React from 'react';
import { PotsReplacementPlaybook } from '@/lib/lead-magnets/pots-replacement-playbook';
import { PotsReplacementOnePager } from '@/lib/lead-magnets/pots-replacement-one-pager';
import { validateToken } from '@/lib/lead-magnets/token';

const GUIDES: Record<string, { title: string; component: () => React.ReactElement }> = {
  'pots-replacement-playbook': {
    title: 'The POTS Replacement Playbook',
    component: () => React.createElement(PotsReplacementPlaybook),
  },
  'pots-replacement-one-pager': {
    title: 'POTS Replacement: One-Page Summary',
    component: () => React.createElement(PotsReplacementOnePager),
  },
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

  // Validate token
  const token = request.nextUrl.searchParams.get('token');
  const email = request.nextUrl.searchParams.get('email');
  if (!token || !email || !validateToken(token, email, slug)) {
    return NextResponse.json({ error: 'Invalid or expired download link' }, { status: 403 });
  }

  // Generate PDF
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfBuffer = await renderToBuffer(guide.component() as any);

  return new NextResponse(new Uint8Array(pdfBuffer), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${slug}.pdf"`,
      'Cache-Control': 'private, max-age=3600',
    },
  });
}
