'use client';

import { useRef } from 'react';
import { usePinProgress, seg, lerp, easeOutCubic } from './usePinProgress';

/** Pinned scene: "You just pick one." fades and scales in. */
export function PickOneLine() {
  const pinRef = useRef<HTMLDivElement>(null);

  usePinProgress(pinRef, (p) => {
    const line = pinRef.current?.querySelector<HTMLElement>('.hm-word');
    if (!line) return;
    const t = seg(p, 0.05, 0.55);
    line.style.opacity = `${t}`;
    line.style.transform = `scale(${lerp(0.7, 1, easeOutCubic(t))})`;
  });

  return (
    <section aria-label="You just pick one.">
      <div ref={pinRef} className="hm-pin hm-pin-line">
        <div className="hm-stage">
          <p className="hm-word">
            <span>
              You just
              <br />
              <em>pick one.</em>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default PickOneLine;
