/**
 * Homepage hero. Full-viewport looping video; INZO is inside the footage, so
 * there is no separate INZO image anywhere on the page. All text stays HTML.
 */
export function HomeHero() {
  return (
    <section className="hm-hero" aria-labelledby="hm-hero-title">
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
        <p className="hm-lead">
          Internet, voice and the rest of your tech. We get quotes from every carrier and line them up
          side by side. Free to you, because the carriers pay us.
        </p>
        <a className="hm-btn" href="#get-started">
          Get my side-by-side →
        </a>
        <div className="hm-scrollcue" aria-hidden="true">
          <i />
          Scroll
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
