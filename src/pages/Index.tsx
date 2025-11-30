import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
// import { CategorySelector } from "@/components/CategorySelector";
import { PropertyGrid } from "@/components/PropertyGrid";
import Testimonials from '@/components/Testimonials';
import InfoBoxes from '@/components/InfoBoxes';
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <PropertyGrid />
      {/* Move category selector lower on the page (below properties) */}
      {/* <CategorySelector /> */}
      <InfoBoxes />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
