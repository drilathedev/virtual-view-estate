import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, MapPin, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const cities = ['Prishtinë','Prizren','Pejë','Mitrovicë','Gjilan','Ferizaj','Gjakovë'];

const InfoBoxes = () => {
  return (
    <section className="py-12 bg-gradient-to-t from-background/50 to-transparent">
      <div className="container-custom space-y-8">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">Më shumë opsione kërkimi</h2>
          <p className="text-muted-foreground">Përdorni opsionet tona të avancuara për të gjetur pronën ideale në Kosovë.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <CardHeader className="p-0">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                <Search className="h-5 w-5 text-accent" />
                Kërkim i Avancuar
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 pt-4 text-muted-foreground text-sm">
              Filtroni rezultatin sipas çmimit, dhomave, sipërfaqes dhe llojit të media (3D, video, foto). Kombinoni kriteret për rezultate më të mira.
              <div className="mt-3 text-xs text-muted-foreground/80">P.sh. 3 dhoma, nën 200,000€, tura 3D</div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader className="p-0">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                <MapPin className="h-5 w-5 text-accent" />
                Qytetet kryesore
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 pt-4">
              <div className="flex flex-wrap gap-2">
                {cities.map(c => (
                  <Link key={c} to={`/properties?city=${encodeURIComponent(c)}`} className="px-3 py-1 rounded-full bg-muted/50 text-sm hover:bg-accent hover:text-accent-foreground transition-colors">{c}</Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader className="p-0">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                <Filter className="h-5 w-5 text-accent" />
                Si të kërkoni më mirë
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 pt-4 text-muted-foreground text-sm">
              Përdorni operatorë dhe shumë-filtro për të ngushtuar kërkimin (p.sh. sipërfaqe &gt; 80m², çmim &lt; 200000). Shënim: përdorni fjalë kyçe për saktësi.
            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  );
};

export default InfoBoxes;
