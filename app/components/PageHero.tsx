export default function PageHero({
  eyebrow,
  title,
  italicWord,
  intro,
}: {
  eyebrow: string;
  title: string;
  italicWord?: string;
  intro?: string;
}) {
  return (
    <section className="relative pt-24 sm:pt-26 lg:pt-28 pb-10 sm:pb-12 lg:pb-14 bg-background overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-highlight/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-[10px] uppercase tracking-[0.28em] text-accent font-semibold mb-4 sm:mb-5">
          ✦ {eyebrow}
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium text-foreground leading-[0.98] tracking-tight text-balance max-w-4xl">
          {italicWord ? (
            <>
              {title.split(italicWord)[0]}
              <span className="italic text-accent">{italicWord}</span>
              {title.split(italicWord)[1]}
            </>
          ) : (
            title
          )}
        </h1>
        {intro && (
          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-muted leading-relaxed max-w-2xl">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
