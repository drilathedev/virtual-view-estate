import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { Box, Camera, Video, Headphones, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Box,
    title: '360° Virtual Tours',
    desc: 'Interactive 360° virtual tours allowing buyers to explore every corner of your property remotely anytime.',
    color: 'text-primary bg-primary/10',
  },
  {
    icon: Camera,
    title: 'Professional Photography',
    desc: 'High-resolution architectural photography showcasing the finest highlights and driving buyer engagement.',
    color: 'text-primary bg-secondary',
  },
  {
    icon: Video,
    title: '3D Walkthroughs & Video',
    desc: 'Immersive 3D renderings and cinematic video walk-throughs displaying your property\'s full potential.',
    color: 'text-primary bg-accent/20',
  },
  {
    icon: Headphones,
    title: 'Real Estate Consulting',
    desc: 'Dedicated advisory for owners, developers, and agents throughout the sale or leasing process.',
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
            <span className="chip bg-primary/10 text-primary">What We Offer</span>
            <h1 className="text-foreground">Our Services</h1>
            <p className="text-muted-foreground">
              Combining state-of-the-art virtual technology with local market expertise to present your property at its absolute best.
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
                Contact Us
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
