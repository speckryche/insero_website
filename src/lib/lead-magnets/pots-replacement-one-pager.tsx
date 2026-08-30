import React from 'react';
import fs from 'fs';
import path from 'path';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

/* ═══════════════════════════════════════════════════════
   BRAND COLORS
   Mirrors pots-replacement-playbook.tsx so the two pieces
   read as a family. react-pdf resolves no CSS custom
   properties, so these stay literals in both files.
   ═══════════════════════════════════════════════════════ */
const C = {
  green: '#008838',
  greenDark: '#005C28',
  greenLight: '#1FA855',
  greenTint: '#E6F5EC',
  charcoal: '#1a2530',
  orange: '#C95000',
  orangeTint: '#FFF7ED',
  gray: '#475569',
  grayLight: '#f0f4f8',
  grayBorder: '#e2e8ec',
  white: '#ffffff',
};

// Images are base64 data URIs for the same reason the playbook does it:
// react-pdf's Image resolves those reliably, filesystem paths less so.
const asset = (...parts: string[]) => {
  const filePath = path.join(process.cwd(), 'public', ...parts);
  return fs.existsSync(filePath)
    ? `data:image/png;base64,${fs.readFileSync(filePath).toString('base64')}`
    : '';
};

const LOGO_SRC = asset('insero-logo-light-with-tagline-retina.png');
// INZO is decorative brand presence only — nothing on the page refers to him,
// so an empty src (asset missing) degrades to a blank corner, not a broken page.
//
// Deliberately the -pdf derivative, not the full-resolution cutout beside it.
// He prints about an inch wide here, so 400px is already past 300dpi, and the
// base64 inlining above would otherwise put the full 2 MB original into every
// generated PDF. Use inzo-transparent-light.png for anything larger.
const INZO_SRC = asset('images', 'inzo-transparent-light-pdf.png');

/* ═══════════════════════════════════════════════════════
   STYLES
   Type sizes match the playbook. Only padding and margins
   are tightened to land this on a single page.
   ═══════════════════════════════════════════════════════ */
const s = StyleSheet.create({
  // The CTA bar and INZO are absolute + `fixed` — the same idiom the playbook's
  // Footer uses. Without `fixed`, react-pdf counts an absolutely-positioned child
  // toward the flow and breaks to a second page. paddingBottom reserves their space.
  page: {
    paddingTop: 32,
    paddingHorizontal: 44,
    paddingBottom: 114,
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    color: C.charcoal,
    position: 'relative',
  },

  /* Masthead */
  logo: { width: 104, marginBottom: 10 },
  headline: { fontSize: 19, fontFamily: 'Helvetica-Bold', color: C.charcoal, marginBottom: 4 },
  subhead: { fontSize: 11, color: C.green, marginBottom: 10 },

  /* Section header bar — playbook's sectionBar at the same type size,
     with tighter vertical padding. */
  sectionBar: {
    backgroundColor: C.green,
    paddingVertical: 5,
    paddingHorizontal: 16,
    marginBottom: 7,
    marginTop: 8,
    borderRadius: 4,
  },
  sectionBarText: { fontSize: 14, fontFamily: 'Helvetica-Bold', color: C.white },

  /* Dependency checklist */
  checkRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 },
  checkDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: C.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
    marginRight: 6,
  },
  checkGlyph: { fontSize: 7, color: C.white, fontFamily: 'Helvetica-Bold' },
  checkTitle: { fontSize: 9, lineHeight: 1.5, color: C.gray, flex: 1 },

  /* "Why it matters now" */
  reasonRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 3 },
  reasonBar: { width: 3, height: 11, backgroundColor: C.greenLight, marginTop: 2, marginRight: 8, borderRadius: 1 },
  reasonText: { fontSize: 9.5, lineHeight: 1.5, color: C.gray, flex: 1 },

  /* Replacement option boxes — echoes the playbook's table header treatment */
  optionCol: { flex: 1, borderWidth: 0.5, borderColor: C.grayBorder, borderRadius: 3, overflow: 'hidden' },
  optionHead: { backgroundColor: C.green, paddingVertical: 5, paddingHorizontal: 8 },
  optionHeadText: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.white },
  optionBody: { padding: 8, backgroundColor: C.grayLight, flexGrow: 1 },
  optionText: { fontSize: 8.5, lineHeight: 1.45, color: C.gray, marginBottom: 4 },
  optionBest: { fontSize: 8.5, lineHeight: 1.45, fontFamily: 'Helvetica-Bold', color: C.charcoal },

  /* Compliance warning — playbook's calloutWarn */
  calloutWarn: {
    backgroundColor: C.orangeTint,
    borderLeftWidth: 3,
    borderLeftColor: C.orange,
    padding: 8,
    borderRadius: 3,
    marginTop: 7,
  },
  calloutText: { fontSize: 8.5, lineHeight: 1.5, color: C.gray },

  /* Start-here steps — playbook's stepCircle, scaled for a single page */
  stepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  stepCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: C.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 9,
  },
  stepNum: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: C.white },
  stepTitle: { fontSize: 9.5, lineHeight: 1.4, color: C.gray, flex: 1 },

  /* INZO — decorative, lower right, clear of the CTA bar */
  inzo: { position: 'absolute', right: 40, bottom: 104, width: 74 },

  /* CTA bar */
  ctaBar: {
    position: 'absolute',
    left: 44,
    right: 44,
    bottom: 30,
    backgroundColor: C.green,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  ctaHead: { fontSize: 12.5, fontFamily: 'Helvetica-Bold', color: C.white, marginBottom: 3 },
  ctaSub: { fontSize: 9.5, color: C.white, marginBottom: 8 },
  ctaContact: { fontSize: 9.5, fontFamily: 'Helvetica-Bold', color: C.white },
});

/* ═══════════════════════════════════════════════════════
   REUSABLE COMPONENTS
   ═══════════════════════════════════════════════════════ */
const SectionBar = ({ title }: { title: string }) => (
  <View style={s.sectionBar}>
    <Text style={s.sectionBarText}>{title}</Text>
  </View>
);

const Check = ({ text }: { text: string }) => (
  <View style={s.checkRow}>
    <View style={s.checkDot}>
      <Text style={s.checkGlyph}>{'✓'}</Text>
    </View>
    <Text style={s.checkTitle}>{text}</Text>
  </View>
);

const Reason = ({ text }: { text: string }) => (
  <View style={s.reasonRow}>
    <View style={s.reasonBar} />
    <Text style={s.reasonText}>{text}</Text>
  </View>
);

const Option = ({ title, body, best }: { title: string; body: string; best: string }) => (
  <View style={s.optionCol}>
    <View style={s.optionHead}>
      <Text style={s.optionHeadText}>{title}</Text>
    </View>
    <View style={s.optionBody}>
      <Text style={s.optionText}>{body}</Text>
      <Text style={s.optionBest}>{best}</Text>
    </View>
  </View>
);

const Step = ({ num, text }: { num: string; text: string }) => (
  <View style={s.stepRow}>
    <View style={s.stepCircle}>
      <Text style={s.stepNum}>{num}</Text>
    </View>
    <Text style={s.stepTitle}>{text}</Text>
  </View>
);

/* Left column holds the dependency list; the right column is deliberately
   narrower than half so INZO has clear space in the lower right. */
const DEPENDENCIES_LEFT = [
  'Fire alarm panel monitoring',
  'Elevator emergency phone',
  'Burglar alarm systems',
  'Fax machines',
];

const DEPENDENCIES_RIGHT = [
  'Paging or intercom systems',
  'Back-of-house phones',
  'Credit card terminals',
  'Modems and dial-out backups',
];

/* ═══════════════════════════════════════════════════════
   DOCUMENT
   ═══════════════════════════════════════════════════════ */
export function PotsReplacementOnePager() {
  return (
    <Document
      title="POTS Replacement: One-Page Summary"
      author="Insero"
      subject="POTS line replacement leave-behind"
    >
      <Page size="LETTER" style={s.page}>
        {/* ── Masthead ─────────────────────────────────── */}
        <Image src={LOGO_SRC} style={s.logo} />
        <Text style={s.headline}>Your copper phone lines are going away.</Text>
        <Text style={s.subhead}>What to check, and what it costs to replace them.</Text>

        {/* ── What's probably still on copper ──────────── */}
        <SectionBar title="What's probably still on copper" />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '50%', paddingRight: 10 }}>
            {DEPENDENCIES_LEFT.map((d) => (
              <Check key={d} text={d} />
            ))}
          </View>
          <View style={{ width: '50%' }}>
            {DEPENDENCIES_RIGHT.map((d) => (
              <Check key={d} text={d} />
            ))}
          </View>
        </View>

        {/* ── Why it matters now ───────────────────────── */}
        <SectionBar title="Why it matters now" />
        <Reason text="Carriers are no longer obligated to maintain copper." />
        <Reason text="Per-line pricing has climbed well above where it used to sit." />
        <Reason text="New installs are increasingly refused, and repairs take longer." />

        {/* ── What replacement looks like ──────────────── */}
        <SectionBar title="What replacement looks like" />
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Option
            title="Wireless POTS replacement"
            body="A cellular device takes over the line. Your existing equipment plugs in the same way."
            best="Best for fire alarms and elevators."
          />
          <Option
            title="VoIP with ATA"
            body="An adapter converts internet voice back to analog dial tone."
            best="Best for fax, paging, and back-of-house."
          />
        </View>
        <View style={s.calloutWarn}>
          <Text style={s.calloutText}>
            Compliance matters — fire alarm and elevator lines carry UL and ASME requirements
            that not every solution meets.
          </Text>
        </View>

        {/* ── Start here ───────────────────────────────── */}
        <SectionBar title="Start here" />
        <View style={{ width: '74%' }}>
          <Step num="1" text="Inventory every line you still pay for." />
          <Step num="2" text="Prioritize the compliance-critical ones." />
          <Step num="3" text="Get competing quotes before the carrier forces the timeline." />
        </View>

        {/* ── INZO: decorative brand presence ──────────── */}
        {INZO_SRC ? <Image src={INZO_SRC} style={s.inzo} fixed /> : null}

        {/* ── CTA bar ──────────────────────────────────── */}
        <View style={s.ctaBar} fixed>
          <Text style={s.ctaHead}>Free POTS inventory and replacement quote.</Text>
          <Text style={s.ctaSub}>Zero cost to you — providers compensate us directly.</Text>
          <Text style={s.ctaContact}>
            insero.cloud/contact  ·  sales@insero.cloud  ·  (844) 252-3185
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default PotsReplacementOnePager;
