import Image from 'next/image';

/** Homepage hero. INZO appears here and nowhere else on the page. */
export function HomeHero() {
  return (
    <section className="hm-wrap hm-hero" aria-labelledby="hm-hero-title">
      <div>
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
      <Image
        className="hm-inzo"
        src="/inzo/inzo-hero.webp"
        alt="INZO, the Insero robot"
        width={1202}
        height={1600}
        priority
        sizes="(max-width: 819px) 210px, 420px"
      />
    </section>
  );
}

export default HomeHero;
