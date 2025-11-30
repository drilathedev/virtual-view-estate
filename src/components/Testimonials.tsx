import { Card, CardHeader, CardContent } from '@/components/ui/card';

const samples = [
  {
    id: 't1',
    name: 'Arta Hoxha',
    location: 'Prishtinë',
    quote: 'Shërbim fantastik! Tura 3D më ndihmoi të shoh shtëpinë në çdo detaj para se të vizitoja.',
  },
  {
    id: 't2',
    name: 'Besim Krasniqi',
    location: 'Pejë',
    quote: 'Sapo bleva një pronë falë fotove profesionale — proces i shpejtë dhe transparent.',
  },
  {
    id: 't3',
    name: 'Drita Berisha',
    location: 'Prizren',
    quote: 'Koncepti 3D ishte vendimtar për të parë potencialin e ndërtesës sonë.',
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Dëshmi nga Klientët</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Lexoni përvojat e klientëve tanë që kanë përdorur shërbimet tona.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {samples.map(s => (
            <Card key={s.id} className="p-6">
              <CardHeader className="p-0">
                <div className="font-semibold text-lg">{s.name}</div>
                <div className="text-sm text-muted-foreground">{s.location}</div>
              </CardHeader>
              <CardContent className="p-0 pt-4 text-sm text-muted-foreground">“{s.quote}”</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
