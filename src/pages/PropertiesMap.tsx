import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PropertyMap } from '@/components/PropertyMap';
import { Property, listProperties } from '@/lib/properties';
import { Loader2 } from 'lucide-react';

export default function PropertiesMap() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await listProperties();
        setProperties(data);
      } catch (err) {
        console.error('Error loading properties:', err);
        setError('Nuk u arrit të ngarkohen pronësitë. Ju lutemi provoni përsëri.');
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  return (
    <>
      {/* <Helmet>
        <title>Harta e Pronësive - Virtual View Estate</title>
        <meta
          name="description"
          content="Shikoni të gjitha pronësitë tona në një hartë interaktive. Apartamente, shtëpi dhe tokë në Kosovo."
        />
      </Helmet> */}

      <Header />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          {/* <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Harta e Pronësive</h1>
            <p className="text-xl text-blue-100">
              Zbuloni të gjitha pronësitë tona në hartë. Kliko në çdo marker për më shumë detaje.
            </p>
          </div> */}
        </div>

        {/* Map Container */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: '600px' }}>
            {loading ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Po ngarkohen pronësitë...</p>
                </div>
              </div>
            ) : (
              <PropertyMap properties={properties} />
            )}
          </div>

          {/* Info Section */}
      <div className="mt-12 grid md:grid-cols-3 gap-6 mb-12">
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <h3 className="text-lg font-semibold mb-2">
      Lokacionet Reale
    </h3>
    <p className="text-gray-600 text-sm leading-relaxed">
      Çdo pronësi shfaqet në hartë në lokacionin e saktë gjeografik, pa afërsime ose devijime.
    </p>
  </div>

  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <h3 className="text-lg font-semibold mb-2">
      Grupim Inteligjent
    </h3>
    <p className="text-gray-600 text-sm leading-relaxed">
      Pronësitë e afërta grupohen automatikisht për një pamje më të qartë dhe navigim më të lehtë.
    </p>
  </div>

  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <h3 className="text-lg font-semibold mb-2">
      Detaje të Plota
    </h3>
    <p className="text-gray-600 text-sm leading-relaxed">
      Kliko mbi çdo pronë për të parë informacion të detajuar dhe përshkrim të plotë.
    </p>
  </div>
</div>

        </div>
      </main>

      <Footer />
    </>
  );
}
<style>

</style>