import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { Box, Camera, Video, Headphones, ArrowRight, CheckCircle2, ShieldCheck, Zap, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const services = [
  {
    step: '01',
    icon: Box,
    title: '360° Virtual Tours',
    desc: 'Interactive 360° virtual tours allowing buyers to explore every corner of your property remotely anytime.',
    features: [
      'Interactive room navigation & floor transitions',
      'Mobile gyroscope & VR headset compatibility',
      'Hotspot tags for highlight features & appliances',
      'Kuula & Matterport platform integration'
    ],
    color: 'text-primary bg-primary/10',
  },
  {
    step: '02',
    icon: Camera,
    title: 'Professional Photography',
    desc: 'High-resolution architectural photography showcasing the finest highlights and driving buyer engagement.',
    features: [
      'Interior & exterior HDR photography',
      'Twilight & golden hour aesthetic captures',
      'Perspective correction & wide-angle optics',
      'High-resolution delivery for web & print'
    ],
    color: 'text-primary bg-secondary',
  },
  {
    step: '03',
    icon: Video,
    title: '3D Walkthroughs & Video',
    desc: 'Immersive 3D renderings and cinematic video walk-throughs displaying your property\'s full potential.',
    features: [
      'Cinematic 4K property walkthrough video',
      'Social media formatted reels & teasers',
      'Aerial drone footage & exterior fly-throughs',
      '3D schematic floor plan rendering'
    ],
    color: 'text-primary bg-accent/20',
  },
  {
    step: '04',
    icon: Headphones,
    title: 'Real Estate Consulting',
    desc: 'Dedicated advisory for owners, developers, and agents throughout the sale or leasing process.',
    features: [
      'Listing optimization & pricing strategy',
      'Targeted buyer marketing & distribution',
      'Direct inquiry handling & lead screening',
      'End-to-end guidance from listing to closing'
    ],
    color: 'text-primary bg-primary/10',
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <Header />
      <main className="pb-24">
        {/* Hero Section */}
        <div className="border-b border-border/70 bg-secondary/40">
          <div className="container-custom py-14 lg:py-20 text-center space-y-4 max-w-3xl mx-auto">
            <span className="chip bg-primary/10 text-primary border border-primary/20 shadow-sm">What We Offer</span>
            <h1 className="text-foreground">Our Real Estate Services</h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              Combining state-of-the-art virtual technology with local market expertise to present your property at its absolute best.
            </p>
          </div>
        </div>

        {/* Value Highlights Strip */}
        <div className="border-b border-border/60 bg-card py-6">
          <div className="container-custom">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center gap-3">
                <Zap className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-foreground">48-Hour Fast Turnaround</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-foreground">Ultra HD 4K Quality Standards</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-foreground">100% Satisfaction Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Services Cards */}
        <div className="container-custom py-14 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((s) => (
              <div
                key={s.title}
                className="group relative rounded-3xl border border-border/80 bg-card p-8 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-medium hover:border-primary/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${s.color} transition-transform group-hover:scale-105`}>
                      <s.icon className="h-7 w-7" />
                    </div>
                    <span className="font-mono text-sm font-bold text-muted-foreground/60">{s.step}</span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground mb-6">{s.desc}</p>

                  <div className="space-y-2.5 pt-4 border-t border-border/50">
                    {s.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs font-medium text-foreground/80">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link to="/contact">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 font-semibold px-8 h-12 shadow-medium">
                Schedule a Service
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
