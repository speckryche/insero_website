import { Reveal } from './Reveal';

export function HowWeGetPaid() {
  return (
    <section className="hm-paid" aria-labelledby="hm-paid-title">
      <Reveal className="hm-wrap hm-g">
        <div>
          <div className="hm-eyebrow">The question everyone asks</div>
          <h2 id="hm-paid-title">&ldquo;If I&apos;m not paying you, how do you get paid?&rdquo;</h2>
          <p>
            Carriers pay us a commission when you sign, the same one they&apos;d pay their own sales rep. It
            comes out of their side either way.
          </p>
          <p>
            So going through us doesn&apos;t raise your price. What changes is who&apos;s on your side of the
            table. A carrier rep sells one network. We compare all of them, and we&apos;ll tell you when the
            cheapest option isn&apos;t the right one.
          </p>
        </div>
        <div className="hm-zero">
          <b>$0</b>
          <span>Cost to you</span>
          No fees. No retainer. No obligation.
        </div>
      </Reveal>
    </section>
  );
}

export default HowWeGetPaid;
