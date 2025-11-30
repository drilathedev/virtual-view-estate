import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-24">
        <div className="container-custom space-y-8">
          <div className="text-center py-10">
            <h1 className="text-3xl font-bold">Shërbimet tona</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">Ne ofrojmë tura virtuale, fotografi profesionale, vizualizim 3D dhe konsulencë për pronarët dhe agjentët.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="font-semibold text-lg">Tura Virtuale</h3>
              <p className="text-sm text-muted-foreground mt-2">Krijim i tureve interaktive 360° për të shfaqur pronën në mënyrën më të mirë.</p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="font-semibold text-lg">Fotografi Profesionale</h3>
              <p className="text-sm text-muted-foreground mt-2">Fotografi të larta për vendosjen e pronave në listimet më të mira.</p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="font-semibold text-lg">Vizualizim 3D</h3>
              <p className="text-sm text-muted-foreground mt-2">Modelime 3D dhe renderime për të ndihmuar blerësit të shohin potencialin e pronës.</p>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
