import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoBanner from "@/components/home/PromoBanner";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-bg bg-cyber-grid">
      <Hero />

      <Categories />

      {/* Featured Chairs */}
      <FeaturedProducts
        title="أفضل الكراسي تقييماً"
        category="chairs"
      />

      <PromoBanner />

      {/* Featured Desks */}
      <FeaturedProducts
        title="مكاتب المحترفين"
        category="desks"
      />

    </main>
  );
}
