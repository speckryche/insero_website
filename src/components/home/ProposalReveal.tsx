'use client';

import { useRef } from 'react';
import { Logo } from '@/components/ui/Logo';
import { usePinProgress, seg, lerp, easeOutCubic } from './usePinProgress';

/*
 * Pinned scene: a sample proposal tilts up from rotateX(60deg) to flat, its
 * rows slide in one at a time, and the lowest quote is flagged at the end.
 * Timing is the prototype's `prop` function.
 */

// Illustrative numbers only, labelled as such on the card itself.
const ROWS = [
  { carrier: 'Carrier A', type: 'Fiber', speed: '1 Gig', monthly: '$289/mo', install: '$0' },
  { carrier: 'Carrier B', type: 'Fiber', speed: '500 Mbps', monthly: '$199/mo', install: '$0', best: true },
  { carrier: 'Carrier C', type: 'Cable', speed: '1 Gig / 35 up', monthly: '$249/mo', install: '$0' },
  { carrier: 'Carrier D', type: 'Fixed wireless', speed: '200 Mbps', monthly: '$229/mo', install: '$499' },
  { carrier: 'Carrier E', type: 'Dedicated fiber', speed: '500 Mbps', monthly: '$640/mo', install: '$0' },
  { carrier: 'Carrier F', type: '5G backup', speed: '100 Mbps', monthly: '$65/mo', install: '$0' },
];

export function ProposalReveal() {
  const pinRef = useRef<HTMLDivElement>(null);

  usePinProgress(pinRef, (p) => {
    const root = pinRef.current;
    if (!root) return;
    const card = root.querySelector<HTMLElement>('.hm-prop');
    const wrap = root.querySelector<HTMLElement>('.hm-ppw');
    const tt = easeOutCubic(seg(p, 0.05, 0.45));
    if (card) {
      card.style.transform = `translateY(${lerp(25, 0, tt)}vh) rotateX(${lerp(60, 0, tt)}deg) scale(${lerp(0.8, 1, tt)})`;
    }
    if (wrap) wrap.style.opacity = `${seg(p, 0, 0.12)}`;
    root.querySelectorAll('tbody tr').forEach((r, i) => r.classList.toggle('hide', p < 0.45 + i * 0.06));
    root.querySelector('tr[data-best]')?.classList.toggle('best', p > 0.85);
  });

  return (
    <section aria-labelledby="hm-prop-title">
      <div ref={pinRef} className="hm-pin hm-pin-prop">
        <div className="hm-stage">
          <div className="hm-pcap">
            <h2 id="hm-prop-title">
              And you get <em>one side-by-side.</em>
            </h2>
          </div>
          <div className="hm-ppw" style={{ opacity: 0 }}>
            <div className="hm-prop">
              <div className="top">
                <Logo variant="light" alt="Insero" />
                <span className="tag">Sample proposal · illustrative numbers</span>
              </div>
              <div className="h">
                <div className="hm-eyebrow">Internet · 1 site</div>
                <h3>Every Option. One Place.</h3>
              </div>
              <div className="stats">
                <div>
                  Lowest quote<b>$199/mo</b>
                </div>
                <div>
                  Carriers checked<b>12</b>
                </div>
                <div>
                  Quotes received<b>9</b>
                </div>
              </div>
              <div className="tblwrap">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Carrier</th>
                      <th scope="col">Type</th>
                      <th scope="col" className="col-speed">Speed</th>
                      <th scope="col">Monthly</th>
                      <th scope="col" className="col-install">Install</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.map((r) => (
                      <tr key={r.carrier} className="hide" data-best={r.best ? '' : undefined}>
                        <td className="n">{r.carrier}</td>
                        <td>{r.type}</td>
                        <td className="col-speed">{r.speed}</td>
                        <td>{r.monthly}</td>
                        <td className="col-install">{r.install}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="ft">Real proposals name the actual carriers and pricing for your address.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProposalReveal;
