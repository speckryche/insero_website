import Link from 'next/link';
import { Reveal } from './Reveal';

const GUIDES = [
  {
    title: "How a telecom broker actually works (and why it's free)",
    href: '/resources/how-a-telecom-broker-works',
  },
  {
    title: 'POTS lines are going away. Here are your options',
    href: '/resources/pots-line-replacement-options',
  },
  { title: 'Fiber vs cable for business', href: '/resources/fiber-vs-cable-business-internet' },
];

const TOOLS = [
  { title: 'Bandwidth calculator', href: '/tools/bandwidth-calculator' },
  { title: 'POTS replacement cost estimator', href: '/tools/pots-cost-estimator' },
];

export function LearnTeaser() {
  return (
    <section className="hm-learn" aria-labelledby="hm-learn-title">
      <Reveal className="hm-wrap">
        <div className="hm-eyebrow">Learn</div>
        <h2 id="hm-learn-title">Free guides and tools</h2>
        <div className="hm-g">
          {GUIDES.map((g) => (
            <Link className="hm-card" href={g.href} key={g.href}>
              <div className="hm-eyebrow">Guide</div>
              <h3>{g.title}</h3>
            </Link>
          ))}
        </div>
        <div className="hm-tools">
          {TOOLS.map((t) => (
            <Link className="hm-tool" href={t.href} key={t.href}>
              <h3>{t.title}</h3>
              <span aria-hidden="true">Try it →</span>
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export default LearnTeaser;
