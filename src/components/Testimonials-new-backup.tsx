import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';

const samples = [
  {
    id: 't1',
    name: 'Arta Hoxha',
    location: 'Prishtinë',
    quote: 'Shërbim fantastik! Tura 3D më ndihmoi të shoh shtëpinë në çdo detaj para se të vizitoja.',
    rating: 5,
    avatar: '👩‍💼'
  },
  {
    id: 't2',
    name: 'Besim Krasniqi',
    location: 'Pejë',
    quote: 'Sapo bleva një pronë falë fotove profesionale — proces i shpejtë dhe transparent.',
    rating: 5,
    avatar: '👨‍💼'
  },
  {
    id: 't3',
    name: 'Drita Berisha',
    location: 'Prizren',
    quote: 'Koncepti 3D ishte vendimtar për të parë potencialin e ndërtesës sonë.',
    rating: 5,
    avatar: '👩'
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-semibold mb-2">
            ⭐ Vlerësimet Tona
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Dëshmi nga Klientët</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Lexoni përvojat e klientëve tanë që kanë përdorur shërbimet tona.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {samples.map((s, index) => (
            <Card 
              key={s.id} 
              className="p-8 border-0 shadow-soft hover:shadow-hard transition-all duration-500 hover:-translate-y-2 rounded-2xl bg-white group relative overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote icon background */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="h-20 w-20 text-blue-600" />
              </div>
              
              <CardHeader className="p-0 mb-6 relative z-10">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-3xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {s.avatar}
                </div>
                
                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: s.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Name and location */}
                <div className="font-bold text-xl text-slate-900">{s.name}</div>
                <div className="text-sm text-slate-500 font-medium mt-1">{s.location}</div>
              </CardHeader>
              
              <CardContent className="p-0 relative z-10">
                <p className="text-slate-600 leading-relaxed italic">
                  "{s.quote}"
                </p>
              </CardContent>
              
              {/* Gradient line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
