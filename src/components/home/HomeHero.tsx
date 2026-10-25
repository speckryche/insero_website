/**
 * Homepage hero. Full-viewport looping video; INZO is inside the footage, so
 * there is no separate INZO image anywhere on the page. All text stays HTML.
 */
export function HomeHero() {
  return (
    <section className="hm-hero" data-line="start" aria-labelledby="hm-hero-title">
      <video
        className="hm-hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/hero/hero-loop.webm" type="video/webm" />
        <source src="/hero/hero-loop.mp4" type="video/mp4" />
      </video>
      <div className="hm-hero-wash" aria-hidden="true" />
      <div className="hm-hero-copy">
        <h1 id="hm-hero-title">
          You run the business.
          <br />
          <em>We chase the carriers.</em>
        </h1>
        <a className="hm-btn" href="#get-started">
          Let&apos;s Connect <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

export default HomeHero;
