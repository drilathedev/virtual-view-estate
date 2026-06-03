import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { PropertyMap } from '@/components/PropertyMap';
import { Property, listProperties } from '@/lib/properties';
import { Loader2, MapPin, Bed, Bath, Search, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

const chips = ['Të gjitha', 'Apartament', 'Shtëpi', 'Vilë', 'Penthouse', 'Tokë'];

export default function PropertiesMap() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('Të gjitha');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setProperties(await listProperties());
      } catch (err) {
        console.error('Error loading properties:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <Header />

      <div className="relative flex-1 overflow-hidden lg:grid lg:grid-cols-[400px_1fr]">
        {/* ---------- Desktop results panel ---------- */}
        <aside className="hidden flex-col overflow-hidden border-r border-border bg-background lg:flex">
          <div className="border-b border-border px-6 py-5">
            <h1 className="font-display text-2xl font-semibold text-foreground">
              {loading ? 'Po ngarkohen…' : `${properties.length} prona në Kosovë`}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">Lëviz hartën ose kliko një çmim për detaje.</p>
            <div className="no-scrollbar -mx-1 mt-4 flex gap-2 overflow-x-auto px-1">
              {chips.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                    active === c ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground/60 hover:bg-secondary/70'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="h-7 w-7 animate-spin text-primary" /></div>
            ) : (
              properties.map((p) => (
                <Link key={p.id} to={`/property/${p.id}`} className="group flex gap-3 rounded-[1.25rem] bg-card p-2.5 shadow-soft transition-shadow hover:shadow-medium">
                  <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-[1rem]">
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute left-1.5 top-1.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-primary backdrop-blur">
                      {p.forRent ? 'Qira' : 'Shitje'}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col py-1">
                    <h3 className="line-clamp-1 text-sm font-bold text-foreground group-hover:text-primary">{p.title}</h3>
                    <div className="mt-1 flex items-center text-xs text-muted-foreground">
                      <MapPin className="mr-1 h-3 w-3 text-primary" />
                      <span className="line-clamp-1">{p.location}</span>
                    </div>
                    <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5 text-[#1a8a8a]" />{p.beds}</span>
                      <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5 text-[#1a8a8a]" />{p.baths}</span>
                      <span className="ml-auto text-sm font-extrabold text-foreground">€{p.price}</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </aside>

        {/* ---------- Map ---------- */}
        <div className="relative h-full">
          {loading ? (
            <div className="flex h-full items-center justify-center"><Loader2 className="h-9 w-9 animate-spin text-primary" /></div>
          ) : (
            <PropertyMap properties={properties} />
          )}

          {/* Mobile floating search + chips */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[1100] p-4 lg:hidden">
            <div className="pointer-events-auto flex items-center gap-2 rounded-2xl bg-card p-2 shadow-hard">
              <div className="flex flex-1 items-center gap-2 px-2.5 py-2">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input placeholder="Kërko zonën..." className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
              </div>
              <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background">
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </div>
            <div className="no-scrollbar pointer-events-auto mt-2.5 flex gap-2 overflow-x-auto">
              {chips.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold shadow-soft transition-colors ${
                    active === c ? 'bg-primary text-white' : 'bg-card text-foreground/70'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile bottom carousel */}
          <div className="absolute inset-x-0 bottom-24 z-[1100] p-4 lg:hidden">
            <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
              {properties.map((p) => (
                <Link key={p.id} to={`/property/${p.id}`} className="w-60 shrink-0 rounded-[1.25rem] bg-card p-2.5 shadow-hard">
                  <div className="relative overflow-hidden rounded-[1rem]">
                    <img src={p.image} alt={p.title} className="h-28 w-full object-cover" />
                    <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-primary backdrop-blur">
                      {p.forRent ? 'Qira' : 'Shitje'}
                    </span>
                  </div>
                  <div className="px-1 pt-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="line-clamp-1 text-sm font-bold text-foreground">{p.title}</h3>
                      <span className="shrink-0 text-sm font-extrabold text-primary">€{p.price}</span>
                    </div>
                    <div className="mt-1 flex items-center text-xs text-muted-foreground">
                      <MapPin className="mr-1 h-3 w-3 text-primary" /><span className="line-clamp-1">{p.location}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
