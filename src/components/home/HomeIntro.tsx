/* Lead-in to the four pillar cards (spec section.intro). */
export function HomeIntro() {
  return (
    <section className="px-[6vw] pt-[12vh] pb-[2vh] text-center font-display text-[#14202c]">
      <h2 className="text-[clamp(34px,4.2vw,68px)] font-extrabold! leading-[1.05]! tracking-[-.025em] text-[#14202c]!">
        Your tech, in <em className="text-[#1fa64a] not-italic">four simple pieces.</em>
      </h2>
      <p className="mt-[14px] text-[clamp(16px,1.25vw,20px)] text-[#5b6875]">
        Pick one or all four. We get quotes from every carrier for each.
      </p>
    </section>
  );
}

export default HomeIntro;
