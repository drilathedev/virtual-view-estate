import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PropertyGrid } from '@/components/PropertyGrid';
import { BottomNav } from '@/components/BottomNav';
import { Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Properties = () => {
  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <Header />
      <main className="">
        {/* Page hero */}
        <div className="border-b border-border/70 bg-secondary/40">
          <div className="container-custom py-12 lg:py-16">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div className="space-y-3">
                <span className="chip bg-primary/10 text-primary">Listime aktive</span>
                <h1 className="text-foreground">Lista e Pronave</h1>
                <p className="max-w-xl text-muted-foreground">
                  Eksploro të gjitha pronat e disponueshme me tura virtuale, video dhe foto profesionale.
                </p>
              </div>
              <Link to="/properties-map">
                <Button variant="outline" className="rounded-full border-2 h-11 font-semibold">
                  <Map className="mr-2 h-4 w-4" />
                  Shiko në Hartë
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <PropertyGrid />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Properties;
