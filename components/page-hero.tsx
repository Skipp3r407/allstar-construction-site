type PageHeroProps = {
  title: string;
  description: string;
};

export function PageHero({ title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#111827] py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,160,23,0.2),_transparent_35%)]" />
      <div className="container-main relative">
        <h1 className="hero-line hero-line-1 max-w-4xl text-3xl font-extrabold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="hero-line hero-line-2 mt-4 max-w-3xl text-gray-200">{description}</p>
      </div>
    </section>
  );
}
