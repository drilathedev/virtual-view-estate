import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PropertyGrid } from '@/components/PropertyGrid';

const Properties = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-20">
        <div className="container-custom space-y-8">
          <div className="text-center py-8">
            <h1 className="text-3xl font-bold">Lista e Pronave</h1>
            <p className="text-muted-foreground">Eksploro të gjitha pronat e disponueshme</p>
          </div>
          <PropertyGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Properties;
