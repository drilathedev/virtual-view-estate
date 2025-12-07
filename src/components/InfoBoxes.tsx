import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, MapPin, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const cities = ['Prishtinë','Prizren','Pejë','Mitrovicë','Gjilan','Ferizaj','Gjakovë'];

const InfoBoxes = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Më shumë opsione kërkimi</h2>
          <p className="text-gray-600">Përdorni opsionet tona të avancuara për të gjetur pronën ideale në Kosovë.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 border border-gray-200 hover:shadow-md transition-shadow rounded-lg">
            <CardHeader className="p-0 mb-3">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Kërkim i Avancuar
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-2">
              <p className="text-gray-600 text-sm leading-relaxed">
                Filtroni rezultatin sipas çmimit, dhomave, sipërfaqes dhe llojit të media (3D, video, foto). Kombinoni kriteret për rezultate më të mira.
              </p>
              <div className="px-3 py-2 bg-blue-50 rounded text-xs text-blue-700">
                P.sh. 3 dhoma, nën 200,000€, tura 3D
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 border border-gray-200 hover:shadow-md transition-shadow rounded-lg">
            <CardHeader className="p-0 mb-3">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-3">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Qytetet kryesore
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-wrap gap-2">
                {cities.map(c => (
                  <Link 
                    key={c} 
                    to={`/properties?city=${encodeURIComponent(c)}`} 
                    className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 text-sm hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 border border-gray-200 hover:shadow-md transition-shadow rounded-lg">
            <CardHeader className="p-0 mb-3">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-3">
                <Filter className="h-6 w-6 text-emerald-600" />
              </div>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Si të kërkoni më mirë
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-gray-600 text-sm leading-relaxed">
                Përdorni operatorë dhe shumë-filtro për të ngushtuar kërkimin (p.sh. sipërfaqe &gt; 80m², çmim &lt; 200000). Shënim: përdorni fjalë kyçe për saktësi.
              </p>
            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  );
};

export default InfoBoxes;
