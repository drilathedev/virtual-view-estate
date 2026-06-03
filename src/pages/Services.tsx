import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { Box, Camera, Video, Headphones, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Box,
    title: 'Tura Virtuale 360°',
    desc: 'Krijim i tureve interaktive 360° që lejojnë blerësit të eksplorojnë pronën nga çdo cep, në çdo kohë.',
    color: 'text-primary bg-primary/10',
  },
  {
    icon: Camera,
    title: 'Fotografi Profesionale',
    desc: 'Fotografi me cilësi të lartë që theksojnë pikat më të forta të pronës dhe rrisin interesimin.',
    color: 'text-primary bg-secondary',
  },
  {
    icon: Video,
    title: 'Vizualizim 3D & Video',
    desc: 'Modelime 3D dhe video cinematike që ndihmojnë blerësit të shohin potencialin e plotë të pronës.',
    color: 'text-primary bg-accent/20',
  },
  {
    icon: Headphones,
    title: 'Konsulencë',
    desc: 'Mbështetje e dedikuar për pronarë dhe agjentë gjatë gjithë procesit të shitjes ose qirasë.',
    color: 'text-primary bg-primary/10',
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <Header />
      <main className="pb-24">
        <div className="border-b border-border/70 bg-secondary/40">
          <div className="container-custom py-12 lg:py-16 text-center space-y-4 max-w-2xl mx-auto">
            <span className="chip bg-primary/10 text-primary">Çfarë ofrojmë</span>
            <h1 className="text-foreground">Shërbimet tona</h1>
            <p className="text-muted-foreground">
              Bashkojmë teknologjinë e fundit me ekspertizë lokale për të prezantuar pronën tënde në mënyrën më të mirë.
            </p>
          </div>
        </div>

        <div className="container-custom py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="group rounded-3xl border border-border/70 bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-medium"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${s.color} mb-5 transition-transform group-hover:scale-110`}>
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/contact">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 font-semibold px-8 h-12 shadow-glow">
                Na kontakto
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Services;
