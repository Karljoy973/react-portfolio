import { Hero } from "@/components/Hero";

export function HomePage() {
  return (
    <>
      <section className="w-[100%] flex" data-testid="home-page">
        <Hero name="Karl" />
      </section>
    </>
  );
}
