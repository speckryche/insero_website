import React from 'react';
import fs from 'fs';
import path from 'path';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

/* ═══════════════════════════════════════════════════════
   BRAND COLORS
   ═══════════════════════════════════════════════════════ */
const C = {
  green: '#008838',
  greenDark: '#005C28',
  greenLight: '#1FA855',
  greenTint: '#E6F5EC',
  charcoal: '#1a2530',
  // react-pdf resolves no CSS custom properties, so these have to be literals.
  // This whole block already mirrors globals.css by hand — orange is not a
  // special case. Kept in step with --color-accent-cta so the warning callout
  // looks the same in the PDF as its web counterpart in Callout.tsx.
  orange: '#C95000',
  orangeTint: '#FFF7ED',
  gray: '#475569',
  grayLight: '#f0f4f8',
  grayBorder: '#e2e8ec',
  white: '#ffffff',
  red: '#dc2626',
};

// Read logo as base64 data URI so react-pdf Image can reliably render it
const logoFilePath = path.join(process.cwd(), 'public', 'insero-logo-light-with-tagline-retina.png');
const LOGO_SRC = fs.existsSync(logoFilePath)
  ? `data:image/png;base64,${fs.readFileSync(logoFilePath).toString('base64')}`
  : '';

/* ═══════════════════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════════════════ */
const s = StyleSheet.create({
  page: { padding: 44, fontFamily: 'Helvetica', fontSize: 9.5, color: C.charcoal, position: 'relative' },

  /* Footer */
  footer: { position: 'absolute', bottom: 28, left: 44, right: 44 },
  footerLine: { borderTopWidth: 0.5, borderTopColor: C.grayBorder, marginBottom: 6 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  footerLogo: { width: 60 },
  footerText: { fontSize: 7, color: '#94a3b8' },

  /* Section header bar */
  sectionBar: { backgroundColor: C.green, paddingVertical: 8, paddingHorizontal: 16, marginBottom: 14, borderRadius: 4 },
  sectionBarText: { fontSize: 14, fontFamily: 'Helvetica-Bold', color: C.white },

  /* Step number circle */
  stepCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: C.green, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  stepNum: { fontSize: 13, fontFamily: 'Helvetica-Bold', color: C.white },
  stepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  stepTitle: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: C.charcoal },

  /* Callout boxes */
  callout: { backgroundColor: C.greenTint, borderLeftWidth: 3, borderLeftColor: C.green, padding: 10, borderRadius: 3, marginVertical: 8 },
  calloutWarn: { backgroundColor: C.orangeTint, borderLeftWidth: 3, borderLeftColor: C.orange, padding: 10, borderRadius: 3, marginVertical: 8 },
  calloutText: { fontSize: 8.5, lineHeight: 1.5, color: C.gray },

  /* Typography */
  h2: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: C.charcoal, marginTop: 12, marginBottom: 6 },
  p: { fontSize: 9.5, lineHeight: 1.6, marginBottom: 8, color: C.gray },
  bold: { fontFamily: 'Helvetica-Bold', color: C.charcoal },
  bullet: { fontSize: 9.5, lineHeight: 1.5, marginBottom: 3, color: C.gray, paddingLeft: 14 },
  numberedItem: { fontSize: 9.5, lineHeight: 1.5, marginBottom: 3, color: C.gray, paddingLeft: 6 },

  /* Check / X items */
  checkRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 5 },
  checkIcon: { fontSize: 10, color: C.green, width: 14, marginTop: 1 },
  xIcon: { fontSize: 10, color: C.red, width: 14, marginTop: 1 },
  checkTextWrap: { flexDirection: 'column', flex: 1 },
  checkTitle: { fontSize: 9, lineHeight: 1.5, color: C.gray },
  checkTitleBold: { fontSize: 9, lineHeight: 1.5, fontFamily: 'Helvetica-Bold', color: C.charcoal },
  checkDetail: { fontSize: 8.5, lineHeight: 1.5, color: C.gray, marginTop: 1 },

  /* Comparison table */
  tableRow: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: C.grayBorder },
  tableHeader: { flexDirection: 'row', backgroundColor: C.green, borderRadius: 3 },
  tableHeaderCell: { flex: 1, paddingVertical: 6, paddingHorizontal: 8 },
  tableHeaderText: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: C.white },
  tableCell: { flex: 1, paddingVertical: 5, paddingHorizontal: 8 },
  tableCellText: { fontSize: 8.5, lineHeight: 1.4, color: C.gray },
  tableRowAlt: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: C.grayBorder, backgroundColor: C.grayLight },
});

/* ═══════════════════════════════════════════════════════
   REUSABLE COMPONENTS
   ═══════════════════════════════════════════════════════ */
const SectionBar = ({ title }: { title: string }) => (
  <View style={s.sectionBar}><Text style={s.sectionBarText}>{title}</Text></View>
);

const StepHeader = ({ num, title }: { num: string; title: string }) => (
  <View style={s.stepRow}>
    <View style={s.stepCircle}><Text style={s.stepNum}>{num}</Text></View>
    <Text style={s.stepTitle}>{title}</Text>
  </View>
);

const Callout = ({ children }: { children: React.ReactNode }) => (
  <View style={s.callout}><Text style={s.calloutText}>{children}</Text></View>
);

const WarningCallout = ({ children }: { children: React.ReactNode }) => (
  <View style={s.calloutWarn}><Text style={s.calloutText}>{children}</Text></View>
);

const Check = ({ text }: { text: string }) => (
  <View style={s.checkRow}>
    <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: C.green, justifyContent: 'center', alignItems: 'center', marginTop: 1, marginRight: 6 }}>
      <Text style={{ fontSize: 7, color: C.white, fontFamily: 'Helvetica-Bold' }}>{'✓'}</Text>
    </View>
    <View style={s.checkTextWrap}>
      <Text style={s.checkTitle}>{text}</Text>
    </View>
  </View>
);

const XMark = ({ text, detail }: { text: string; detail?: string }) => (
  <View style={[s.checkRow, { marginBottom: detail ? 12 : 5 }]}>
    <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: C.red, justifyContent: 'center', alignItems: 'center', marginTop: 1, marginRight: 6 }}>
      <Text style={{ fontSize: 7, color: C.white, fontFamily: 'Helvetica-Bold' }}>X</Text>
    </View>
    <View style={s.checkTextWrap}>
      <Text style={s.checkTitleBold}>{text}</Text>
      {detail && <Text style={s.checkDetail}>{detail}</Text>}
    </View>
  </View>
);

const Footer = ({ num }: { num: number }) => (
  <View style={s.footer} fixed>
    <View style={s.footerLine} />
    <View style={s.footerRow}>
      <Image src={LOGO_SRC} style={s.footerLogo} />
      <Text style={s.footerText}>{num}</Text>
    </View>
  </View>
);

/* ═══════════════════════════════════════════════════════
   DOCUMENT
   ═══════════════════════════════════════════════════════ */
export function PotsReplacementPlaybook() {
  return (
    <Document title="The POTS Replacement Playbook" author="Insero" subject="POTS line replacement guide">

      {/* ── Page 1: Cover ─────────────────────────────── */}
      <Page size="LETTER" style={{ padding: 0, fontFamily: 'Helvetica', position: 'relative' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 60 }}>
          <Image src={LOGO_SRC} style={{ width: 160, marginBottom: 40 }} />
          <Text style={{ fontSize: 32, fontFamily: 'Helvetica-Bold', color: C.charcoal, textAlign: 'center', marginBottom: 12 }}>
            The POTS Replacement{'\n'}Playbook
          </Text>
          <Text style={{ fontSize: 15, color: C.green, textAlign: 'center', marginBottom: 50 }}>
            A practical guide for businesses still on copper phone lines
          </Text>
          <Text style={{ fontSize: 10, color: C.gray, textAlign: 'center' }}>
            Insero, LLC · 2026 · insero.cloud
          </Text>
        </View>
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 50, backgroundColor: C.green }} />
      </Page>

      {/* ── Page 2: Why This Matters Now ───────────────── */}
      <Page size="LETTER" style={s.page}>
        <SectionBar title="Why This Matters Now" />
        <Text style={s.p}>The copper phone lines (POTS) that powered American businesses for a century are being decommissioned. The FCC freed carriers from the obligation to maintain them, and they're aggressively raising prices and refusing new installs.</Text>
        <Text style={s.p}>If you have any equipment still running on a POTS line — fire alarms, elevators, fax machines, alarm systems, back-of-house phones — you need a plan. This playbook walks through what to do, in order.</Text>

        <WarningCallout>POTS pricing is rising 15–30% per year. New installs are increasingly being refused. Repair times have stretched from days to weeks. The longer you wait, the more expensive your status quo gets.</WarningCallout>

        <Text style={[s.h2, { marginTop: 14 }]}>POTS Today vs. The Trajectory</Text>
        <View style={s.tableHeader}>
          <View style={s.tableHeaderCell}><Text style={s.tableHeaderText}>What POTS Used to Be</Text></View>
          <View style={s.tableHeaderCell}><Text style={s.tableHeaderText}>What POTS Is Now</Text></View>
        </View>
        {[
          ['~$40/month per line', '$100–$300+/month per line'],
          ['Reliable, well-maintained', 'Aging copper, slow repairs'],
          ['Carriers obligated to maintain', 'Carriers actively phasing out'],
          ['Industry standard', 'Approaching end-of-life'],
        ].map((row, i) => (
          <View key={i} style={i % 2 === 0 ? s.tableRow : s.tableRowAlt}>
            <View style={s.tableCell}><Text style={s.tableCellText}>{row[0]}</Text></View>
            <View style={s.tableCell}><Text style={s.tableCellText}>{row[1]}</Text></View>
          </View>
        ))}
        <Footer num={2} />
      </Page>

      {/* ── Page 3: Step 1 Inventory ──────────────────── */}
      <Page size="LETTER" style={s.page}>
        <SectionBar title="Step 1: Inventory What You Have" />
        <StepHeader num="1" title='Find every POTS line you still pay for' />
        <Text style={s.p}>Pull every phone bill from every location. Identify every line still running on copper. Bills don't always say "POTS" — look for charges labeled "business line," "1FB," "analog line," "key line," or any per-line monthly charge from your local phone company.</Text>

        <Text style={s.h2}>Common Dependencies</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <View style={{ width: '50%' }}>
            <Check text="Fire alarm panel monitoring" />
            <Check text="Elevator emergency phone" />
            <Check text="Burglar alarm systems" />
            <Check text="Fax machines" />
            <Check text="Paging or intercom systems" />
          </View>
          <View style={{ width: '50%' }}>
            <Check text="Back-of-house phones" />
            <Check text="Credit card terminals / POS" />
            <Check text="Modems or dial-out backups" />
            <Check text="Specialty equipment" />
          </View>
        </View>

        <Text style={[s.h2, { marginTop: 10 }]}>What to Document for Each Line</Text>
        <Text style={s.numberedItem}>1.  Phone number</Text>
        <Text style={s.numberedItem}>2.  Physical location</Text>
        <Text style={s.numberedItem}>3.  What it's actually connected to</Text>
        <Text style={s.numberedItem}>4.  Current monthly cost</Text>
        <Text style={s.numberedItem}>5.  Carrier and contract end date</Text>

        <Callout>Most businesses find 2–4 more POTS lines than they expected during inventory.</Callout>
        <Footer num={3} />
      </Page>

      {/* ── Page 4: Step 2 & 3 ────────────────────────── */}
      <Page size="LETTER" style={s.page}>
        <SectionBar title="Step 2: Prioritize Your Migration" />
        <StepHeader num="2" title='Not every line moves on the same timeline' />
        <Text style={s.p}>Triage based on compliance impact, pricing trajectory, business criticality, and carrier pressure.</Text>
        <Text style={s.numberedItem}>1.  Compliance-critical lines (fire alarm, elevator) — replace first to avoid AHJ issues</Text>
        <Text style={s.numberedItem}>2.  Highest-priced lines ($200+/month) — biggest savings</Text>
        <Text style={s.numberedItem}>3.  Business-critical communications</Text>
        <Text style={s.numberedItem}>4.  Specialty equipment and back-of-house phones</Text>

        <View style={{ marginTop: 10 }} />
        <SectionBar title="Step 3: Choose Your Replacement Path" />
        <StepHeader num="3" title='Most replacements use one of two approaches' />
        <Text style={s.p}><Text style={s.bold}>Wireless POTS replacement:</Text> A small device sits where the old POTS line entered the building, with a cellular SIM inside. Your equipment plugs in the same as before. Best for fire alarms, elevators, and standalone analog dial tone needs.</Text>
        <Text style={s.p}><Text style={s.bold}>VoIP with ATA:</Text> A small box converts internet-delivered voice into analog dial tone. Best for fax machines, paging systems, and back-of-house phones.</Text>

        <Callout>Modern solutions (like Ooma AirDial — featured later in this guide) combine both — VoIP-delivered analog dial tone with cellular backup built in. Best of both worlds for many use cases.</Callout>

        <WarningCallout>{'Compliance constraints:\n• Fire alarm panels: UL 864, NFPA 72 compliance required\n• Elevator emergency phones: ASME A17.1 requirements\n• Credit card terminals: PCI compliance\nGet this wrong and insurance carriers or AHJ can flag the building.'}</WarningCallout>
        <Footer num={4} />
      </Page>

      {/* ── Page 5: Step 4 & 5 ────────────────────────── */}
      <Page size="LETTER" style={s.page}>
        <SectionBar title="Step 4: Get Real Pricing" />
        <StepHeader num="4" title='What replacement actually costs' />

        <View style={s.tableHeader}>
          <View style={[s.tableHeaderCell, { flex: 1.2 }]}><Text style={s.tableHeaderText}>Solution Type</Text></View>
          <View style={s.tableHeaderCell}><Text style={s.tableHeaderText}>Typical Monthly</Text></View>
          <View style={[s.tableHeaderCell, { flex: 1.3 }]}><Text style={s.tableHeaderText}>What's Usually Included</Text></View>
        </View>
        {[
          ['Wireless POTS replacement', '$35–$75/line', 'Service + equipment rental'],
          ['VoIP with ATA', '$15–$30/line', 'Service only, ATA $80–$300 one-time'],
          ['Combined (e.g., Ooma AirDial)', '$35/line', 'All-in including device'],
        ].map((row, i) => (
          <View key={i} style={i % 2 === 0 ? s.tableRow : s.tableRowAlt}>
            <View style={[s.tableCell, { flex: 1.2 }]}><Text style={s.tableCellText}>{row[0]}</Text></View>
            <View style={s.tableCell}><Text style={s.tableCellText}>{row[1]}</Text></View>
            <View style={[s.tableCell, { flex: 1.3 }]}><Text style={s.tableCellText}>{row[2]}</Text></View>
          </View>
        ))}

        <Text style={s.h2}>Questions to ask every quote</Text>
        <Check text="Is hardware included or one-time charge?" />
        <Check text="Contract term and early termination fees?" />
        <Check text="What if cellular signal is weak at our address?" />
        <Check text="Is equipment UL-listed for fire alarm use? (if applicable)" />
        <Check text="What's the service SLA?" />

        <View style={{ marginTop: 10 }} />
        <SectionBar title="Step 5: Execute the Migration" />
        <StepHeader num="5" title='Plan realistic timelines' />

        <View style={s.tableHeader}>
          <View style={s.tableHeaderCell}><Text style={s.tableHeaderText}>Project Size</Text></View>
          <View style={s.tableHeaderCell}><Text style={s.tableHeaderText}>Realistic Timeline</Text></View>
        </View>
        {[
          ['Single alarm panel swap', '1–2 weeks'],
          ['Multi-line single site', '30–60 days'],
          ['Multi-location rollout', '2–6 months'],
        ].map((row, i) => (
          <View key={i} style={i % 2 === 0 ? s.tableRow : s.tableRowAlt}>
            <View style={s.tableCell}><Text style={s.tableCellText}>{row[0]}</Text></View>
            <View style={s.tableCell}><Text style={s.tableCellText}>{row[1]}</Text></View>
          </View>
        ))}

        <Text style={s.h2}>Coordination required</Text>
        <Check text="Alarm vendor (fire alarm replacements)" />
        <Check text="Building management (elevator phones)" />
        <Check text="AHJ if compliance-impacted equipment" />
        <Check text="Internal IT team" />
        <Check text="Outgoing carrier (number porting)" />

        <Callout>Build in a parallel-run period where possible — keep the old POTS line active for 1–2 weeks after the new replacement is live to catch any issues.</Callout>
        <Footer num={5} />
      </Page>

      {/* ── Page 6: Common Mistakes ───────────────────── */}
      <Page size="LETTER" style={s.page}>
        <SectionBar title="Common Mistakes to Avoid" />
        <XMark text="Waiting for the carrier to force the issue" detail="Forced migrations happen on the carrier's timeline with their preferred product — rarely the best fit or price." />
        <XMark text="Treating all lines the same" detail="Fire alarm and elevator lines have compliance constraints. Fax lines don't. Different lines, different solutions." />
        <XMark text="Skipping the inventory step" detail="Most businesses miss POTS lines during migration. The forgotten ones become emergencies later." />
        <XMark text="Choosing the cheapest option for compliance-critical lines" detail="Non-UL-listed equipment for fire alarm circuits can void insurance." />
        <XMark text="Forgetting number portability" detail="If you want to keep the phone numbers, port them with the migration — don't wait." />
        <XMark text="Underestimating timeline" detail="POTS replacement projects routinely take 2–3x longer than initial estimates. Plan accordingly." />
        <Footer num={6} />
      </Page>

      {/* ── Page 7: Solution Spotlight ─────────────────── */}
      <Page size="LETTER" style={s.page}>
        <SectionBar title="Solution Spotlight: Ooma AirDial" />
        <Text style={[s.p, { marginTop: 4 }]}>After working through dozens of POTS replacement projects, the solution Insero recommends most often is Ooma AirDial. Here's the honest case for it.</Text>

        <Text style={s.h2}>What Ooma AirDial Is</Text>
        <Text style={s.p}>A purpose-built POTS replacement device. Your existing equipment plugs into it the same way it plugged into the old POTS line. It delivers analog dial tone via VoIP — with cellular backup built in.</Text>

        <Text style={s.h2}>Why It Works for Most Situations</Text>
        <Check text="UL 864 listed for fire alarm monitoring (compliance covered)" />
        <Check text="Cellular backup automatically takes over if internet drops" />
        <Check text="One device handles multiple lines — simpler install" />
        <Check text="Predictable flat pricing — no surprise hardware costs" />
        <Check text="Compatible with the equipment you already have" />

        <Text style={[s.h2, { marginTop: 8 }]}>Where It Might Not Be the Fit</Text>
        <XMark text="Locations with weak cellular signal" detail="We check signal strength as part of every quote." />
        <XMark text="Very high-volume voice operations" detail="UCaaS is usually a better fit for desk phones at scale." />

        <Callout>We've deployed Ooma AirDial for dozens of customers and the experience has been consistently solid. If your situation needs a different solution, we'll tell you that too — we work with multiple providers.</Callout>
        <Footer num={7} />
      </Page>

      {/* ── Page 8: CTA ──────────────────────────────── */}
      <Page size="LETTER" style={{ padding: 0, fontFamily: 'Helvetica', position: 'relative' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 60 }}>
          <Image src={LOGO_SRC} style={{ width: 140, marginBottom: 36 }} />
          <Text style={{ fontSize: 24, fontFamily: 'Helvetica-Bold', color: C.charcoal, textAlign: 'center', marginBottom: 8 }}>
            Get a Free POTS Inventory{'\n'}and Replacement Quote
          </Text>
          <Text style={{ fontSize: 12, color: C.green, textAlign: 'center', marginBottom: 30 }}>
            Zero cost to you. Providers compensate us directly.
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 40, marginBottom: 30 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.green, marginBottom: 3 }}>✓</Text>
              <Text style={{ fontSize: 9, color: C.gray, textAlign: 'center' }}>Inventory your{'\n'}current lines</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.green, marginBottom: 3 }}>✓</Text>
              <Text style={{ fontSize: 9, color: C.gray, textAlign: 'center' }}>Get competing quotes{'\n'}from compliant solutions</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.green, marginBottom: 3 }}>✓</Text>
              <Text style={{ fontSize: 9, color: C.gray, textAlign: 'center' }}>Manage the install{'\n'}and number porting</Text>
            </View>
          </View>

          <View style={{ backgroundColor: C.grayLight, borderRadius: 6, padding: 20, width: '80%', alignItems: 'center' }}>
            <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: C.charcoal, marginBottom: 4 }}>insero.cloud/contact</Text>
            <Text style={{ fontSize: 10, color: C.gray, marginBottom: 2 }}>sales@insero.cloud</Text>
            <Text style={{ fontSize: 10, color: C.gray }}>(844) 252-3185</Text>
          </View>

          <Text style={{ fontSize: 9, color: '#94a3b8', textAlign: 'center', marginTop: 30 }}>
            Insero, LLC — insero.cloud
          </Text>
        </View>
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 50, backgroundColor: C.green }} />
      </Page>
    </Document>
  );
}
