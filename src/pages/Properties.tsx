import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PropertyGrid } from '@/components/PropertyGrid';
import { BottomNav } from '@/components/BottomNav';

const Properties = () => {
  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <Header />
      <main className="">
        {/* Page hero */}
        <div className="border-b border-border/70 bg-secondary/40">
          <div className="container-custom py-12 lg:py-16">
            <div className="max-w-2xl space-y-3">
              <span className="chip bg-primary/10 text-primary">Active Listings</span>
              <h1 className="text-foreground">Property Listings</h1>
              <p className="text-muted-foreground">
                Explore all available properties featuring 360° virtual tours, high-resolution videos, and professional architectural photography.
              </p>
            </div>
          </div>
        </div>
        <PropertyGrid showFilters />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Properties;
