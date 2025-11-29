import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategorySelector } from "@/components/CategorySelector";
import { PropertyGrid } from "@/components/PropertyGrid";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <CategorySelector />
      <PropertyGrid />
      <Footer />
    </div>
  );
};

export default Index;
