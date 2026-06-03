import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AboutCollage } from "@/components/AboutCollage";
import { BestValue } from "@/components/BestValue";
import { PropertyGrid } from "@/components/PropertyGrid";
import { FAQ } from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { MobileHome } from "@/components/MobileHome";
import { BottomNav } from "@/components/BottomNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile: app experience */}
      <div className="lg:hidden">
        <MobileHome />
      </div>

      {/* Desktop: full website */}
      <div className="hidden lg:block">
        <Header />
        <Hero />
        <AboutCollage />
        <BestValue />
        <PropertyGrid />
        <FAQ />
        <Testimonials />
        <CTASection />
        <Footer />
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;
