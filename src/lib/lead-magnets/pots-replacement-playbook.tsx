import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

const green = '#008838';
const charcoal = '#1a2530';
const orange = '#F97316';
const gray = '#475569';
const lightGray = '#f0f4f8';

const s = StyleSheet.create({
  page: { padding: 50, fontFamily: 'Helvetica', fontSize: 10, color: charcoal, position: 'relative' },
  footer: { position: 'absolute', bottom: 30, left: 50, right: 50, flexDirection: 'row', justifyContent: 'space-between', fontSize: 8, color: '#94a3b8' },
  // Cover
  coverPage: { padding: 50, fontFamily: 'Helvetica', justifyContent: 'center', alignItems: 'center', backgroundColor: green },
  coverTitle: { fontSize: 36, fontFamily: 'Helvetica-Bold', color: '#ffffff', textAlign: 'center', marginBottom: 16 },
  coverSubtitle: { fontSize: 14, color: '#ffffff', textAlign: 'center', marginBottom: 40, opacity: 0.85 },
  coverByline: { fontSize: 11, color: '#ffffff', textAlign: 'center', opacity: 0.7 },
  coverFooter: { position: 'absolute', bottom: 40, fontSize: 10, color: '#ffffff', opacity: 0.5 },
  // Content
  h1: { fontSize: 22, fontFamily: 'Helvetica-Bold', color: green, marginBottom: 14, marginTop: 4 },
  h2: { fontSize: 14, fontFamily: 'Helvetica-Bold', color: charcoal, marginTop: 18, marginBottom: 8 },
  p: { fontSize: 10, lineHeight: 1.6, marginBottom: 10, color: gray },
  bullet: { fontSize: 10, lineHeight: 1.6, marginBottom: 4, color: gray, paddingLeft: 16 },
  bold: { fontFamily: 'Helvetica-Bold', color: charcoal },
  callout: { backgroundColor: lightGray, padding: 14, borderRadius: 6, marginVertical: 10, borderLeftWidth: 3, borderLeftColor: green },
  calloutText: { fontSize: 9, lineHeight: 1.5, color: gray },
  divider: { borderBottomWidth: 1, borderBottomColor: '#e2e8ec', marginVertical: 16 },
  // CTA page
  ctaBox: { backgroundColor: green, padding: 30, borderRadius: 8, marginTop: 20 },
  ctaTitle: { fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#ffffff', marginBottom: 10, textAlign: 'center' },
  ctaText: { fontSize: 10, color: '#ffffff', textAlign: 'center', marginBottom: 4, opacity: 0.9 },
});

const Footer = ({ pageNum }: { pageNum: string }) => (
  <View style={s.footer}>
    <Text>Insero, LLC — insero.cloud</Text>
    <Text>{pageNum}</Text>
  </View>
);

export function PotsReplacementPlaybook() {
  return (
    <Document title="The POTS Replacement Playbook" author="Insero" subject="POTS line replacement guide for businesses">

      {/* Cover */}
      <Page size="LETTER" style={s.coverPage}>
        <Text style={{ fontSize: 14, color: '#ffffff', marginBottom: 60, opacity: 0.7 }}>INSERO</Text>
        <Text style={s.coverTitle}>The POTS Replacement{'\n'}Playbook</Text>
        <Text style={s.coverSubtitle}>A practical guide for businesses still on copper phone lines</Text>
        <Text style={s.coverByline}>By Insero — 2026</Text>
        <Text style={s.coverFooter}>insero.cloud</Text>
      </Page>

      {/* Page 2 — Introduction */}
      <Page size="LETTER" style={s.page}>
        <Text style={s.h1}>Introduction</Text>
        <Text style={s.p}>The copper phone lines (POTS) that powered American businesses for a century are being decommissioned. The FCC has freed carriers from the obligation to maintain them, and they're aggressively raising prices and refusing new installs.</Text>
        <Text style={s.p}>If you have any equipment still running on a POTS line, you need a plan. This playbook walks through what to do, in order.</Text>
        <Footer pageNum="2" />
      </Page>

      {/* Page 3 — Step 1 */}
      <Page size="LETTER" style={s.page}>
        <Text style={s.h1}>Step 1: Inventory What You Have</Text>
        <Text style={s.p}>Pull every phone bill from every location. Identify every line that's still running on copper. Common dependencies:</Text>
        {[
          'Fire alarm panel monitoring',
          'Elevator emergency phone',
          'Burglar alarm systems',
          'Fax machines',
          'Paging or intercom systems',
          'Back-of-house phones (kitchen, warehouse, lobby)',
          'Credit card terminals or POS gear',
          'Modems or dial-out backups',
          'Specialty equipment (postage meters, security gates)',
        ].map((item, i) => <Text key={i} style={s.bullet}>•  {item}</Text>)}
        <Text style={[s.p, { marginTop: 10 }]}>Bills don't always say "POTS" — look for charges like "business line," "1FB," "analog line," "key line," or any per-line monthly charge from your local phone company.</Text>
        <Text style={s.h2}>What to document for each line:</Text>
        {['Line number / phone number', 'Location', 'What it\'s actually doing', 'Current monthly cost', 'Carrier and contract end date'].map((item, i) => (
          <Text key={i} style={s.bullet}>•  {item}</Text>
        ))}
        <Footer pageNum="3" />
      </Page>

      {/* Page 4 — Step 2 */}
      <Page size="LETTER" style={s.page}>
        <Text style={s.h1}>Step 2: Prioritize</Text>
        <Text style={s.p}>Not every line replaces on the same timeline. Triage based on:</Text>
        {[
          'Compliance impact (fire alarm, elevator) — these often have regulatory requirements',
          'Pricing trajectory — carriers raise POTS pricing 15–30% per year on average',
          'Business criticality — lines you can\'t operate without come first',
          'Carrier pressure — some carriers are actively forcing migrations',
        ].map((item, i) => <Text key={i} style={s.bullet}>•  {item}</Text>)}
        <Text style={[s.h2, { marginTop: 16 }]}>Recommended order:</Text>
        <Text style={s.bullet}>1.  Compliance-critical lines (fire alarm, elevator) — replace first to avoid AHJ issues</Text>
        <Text style={s.bullet}>2.  Highest-priced lines ({'>'} $200/month) — biggest cost saving</Text>
        <Text style={s.bullet}>3.  Business-critical communications (sales lines, etc.)</Text>
        <Text style={s.bullet}>4.  Specialty equipment and back-of-house phones</Text>
        <Footer pageNum="4" />
      </Page>

      {/* Page 5 — Step 3 */}
      <Page size="LETTER" style={s.page}>
        <Text style={s.h1}>Step 3: Choose the Right Replacement Path</Text>
        <Text style={s.p}>Most replacements use one of these approaches:</Text>
        <Text style={s.h2}>Wireless POTS Replacement</Text>
        <Text style={s.p}>A small device sits where the old POTS line entered the building, with a cellular SIM inside. Your equipment plugs in the same as before. Best for fire alarms, elevators, and standalone analog dial tone needs that can't depend on internet.</Text>
        <Text style={s.h2}>VoIP with ATA (Analog Terminal Adapter)</Text>
        <Text style={s.p}>A small box converts internet-delivered voice into analog dial tone. Best for fax machines, paging systems, and back-of-house phones.</Text>
        <Text style={s.p}>Many newer solutions combine both — VoIP-delivered analog dial tone with cellular backup built in.</Text>
        <View style={s.callout}>
          <Text style={[s.calloutText, { fontFamily: 'Helvetica-Bold', marginBottom: 4 }]}>Compliance Constraints</Text>
          <Text style={s.calloutText}>• Fire alarm panels require UL-listed replacement equipment (UL 864, NFPA 72)</Text>
          <Text style={s.calloutText}>• Elevator emergency phones have ASME A17.1 requirements</Text>
          <Text style={s.calloutText}>• Credit card terminals must remain PCI-compliant</Text>
          <Text style={[s.calloutText, { marginTop: 6 }]}>Get this wrong and your insurance carrier or AHJ can flag the building.</Text>
        </View>
        <Footer pageNum="5" />
      </Page>

      {/* Page 6 — Step 4 */}
      <Page size="LETTER" style={s.page}>
        <Text style={s.h1}>Step 4: Get Real Pricing</Text>
        <Text style={s.p}>Pricing varies, but typical 2026 ranges:</Text>
        <Text style={s.bullet}>•  Wireless POTS replacement: $35–$75 per line per month including equipment</Text>
        <Text style={s.bullet}>•  VoIP with ATA: $15–$30 per line per month</Text>
        <Text style={s.bullet}>•  Hardware: usually bundled into monthly via rental; some vendors charge $80–$300 one-time</Text>
        <Text style={[s.p, { marginTop: 10 }]}>Compare against your current per-line POTS cost. Most businesses see immediate savings, growing larger each year as POTS pricing continues to rise.</Text>
        <Text style={s.h2}>When evaluating quotes, ask:</Text>
        {[
          'Is hardware included or one-time charge?',
          'What\'s the contract term?',
          'Are there early termination fees?',
          'What happens if cellular signal is weak at our address?',
          'Is this equipment UL-listed for fire alarm use? (if applicable)',
          'What\'s the SLA on the replacement service?',
        ].map((item, i) => <Text key={i} style={s.bullet}>•  {item}</Text>)}
        <Footer pageNum="6" />
      </Page>

      {/* Page 7 — Step 5 */}
      <Page size="LETTER" style={s.page}>
        <Text style={s.h1}>Step 5: Execute</Text>
        <Text style={s.h2}>Project timeline rough guidance:</Text>
        <Text style={s.bullet}>•  Single alarm panel swap: 1–2 weeks</Text>
        <Text style={s.bullet}>•  Multi-line single site: 30–60 days</Text>
        <Text style={s.bullet}>•  Multi-location rollout: 2–6 months depending on scope</Text>
        <Text style={s.h2}>Coordination required:</Text>
        {[
          'Your alarm vendor (for fire alarm replacements, they need to sign off)',
          'Building management (for elevator phone replacements)',
          'AHJ (authority having jurisdiction) if compliance-impacted equipment',
          'Your IT team (for any internet-dependent replacements)',
          'Outgoing carrier (number porting if you want to keep the number)',
        ].map((item, i) => <Text key={i} style={s.bullet}>•  {item}</Text>)}
        <Text style={[s.p, { marginTop: 10 }]}>Build in a parallel-run period where possible — keep the old POTS line active for 1–2 weeks after the new replacement is live to catch any issues.</Text>
        <Footer pageNum="7" />
      </Page>

      {/* Page 8 — Common Mistakes */}
      <Page size="LETTER" style={s.page}>
        <Text style={s.h1}>Common Mistakes to Avoid</Text>
        {[
          { num: '1', text: "Waiting for the carrier to force the issue. Forced migrations happen on the carrier's timeline with the carrier's preferred product, which is rarely the best fit or price." },
          { num: '2', text: "Treating all lines the same. Fire alarm and elevator lines have compliance constraints. Fax lines don't. The right replacement varies by use case." },
          { num: '3', text: "Skipping the inventory step. Most businesses have more POTS lines than they realize and miss some during migration." },
          { num: '4', text: "Choosing the cheapest option for compliance-critical lines. Non-UL-listed equipment for fire alarm circuits can void insurance." },
          { num: '5', text: "Forgetting number portability. If you want to keep the phone numbers, port them with the migration — don't wait." },
          { num: '6', text: "Underestimating timeline. POTS replacement projects routinely take 2–3x longer than initial estimates. Plan accordingly." },
        ].map((item, i) => (
          <View key={i} style={{ marginBottom: 10 }}>
            <Text style={s.p}><Text style={s.bold}>{item.num}. </Text>{item.text}</Text>
          </View>
        ))}
        <Footer pageNum="8" />
      </Page>

      {/* Page 9 — When to Bring in Help */}
      <Page size="LETTER" style={s.page}>
        <Text style={s.h1}>When to Bring in Help</Text>
        <Text style={s.p}>This kind of project rewards experience. A good partner:</Text>
        {[
          'Inventories your current lines (often included free)',
          'Identifies compliance constraints before you commit to a path',
          'Gets competing quotes from multiple replacement vendors',
          'Manages the carrier port and replacement install',
          'Stays involved through cutover and post-migration support',
          'Costs you nothing — replacement vendors compensate channel partners directly',
        ].map((item, i) => <Text key={i} style={s.bullet}>•  {item}</Text>)}
        <Text style={[s.p, { marginTop: 10 }]}>This is exactly what we do at Insero. If you want help with your POTS migration, we'd love to talk.</Text>
        <Footer pageNum="9" />
      </Page>

      {/* Page 10 — CTA */}
      <Page size="LETTER" style={s.page}>
        <Text style={s.h1}>Take the Next Step</Text>
        <View style={s.ctaBox}>
          <Text style={s.ctaTitle}>Get a free POTS inventory{'\n'}and replacement quote</Text>
          <Text style={s.ctaText}>Insero, LLC</Text>
          <Text style={s.ctaText}>(844) 252-3185</Text>
          <Text style={s.ctaText}>sales@insero.cloud</Text>
          <Text style={s.ctaText}>insero.cloud</Text>
          <Text style={[s.ctaText, { marginTop: 12, opacity: 0.7, fontSize: 9 }]}>Zero cost to customers — providers compensate us directly</Text>
        </View>
        <Footer pageNum="10" />
      </Page>
    </Document>
  );
}
