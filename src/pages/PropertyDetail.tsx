import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProperty } from "@/lib/properties";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { Kuula3DViewer } from "@/components/Kuula3DViewer";
import { PropertyInquiryForm } from "@/components/PropertyInquiryForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import {
  MapPin, Bed, Bath, Square, Home, Check, Loader2, AlertCircle,
  Image as ImageIcon, X, ChevronLeft, ChevronRight, Move3d, ArrowLeft,
  Phone, Share2, Tag,
} from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const demoProperties: Record<string, any> = {
  "demo-1": { id: "demo-1", image: property1, title: "Apartament Modern në Qendër", location: "Prishtinë, Kosovë", price: "€120,000", beds: 2, baths: 2, area: 85, mediaType: "3d", forRent: false, description: "Apartament modern në zemër të Prishtinës. Dhomat e gjera, kuzhina moderne dhe pamje të bukura të qytetit. Afër qendrave tregtare dhe transportit publik.", features: ["Ballkon", "Parking", "Ngrohje qendrore", "Ashensor"], gallery: [property1, property2, property3] },
  "demo-2": { id: "demo-2", image: property2, title: "Penthouse Luksoz me Pamje", location: "Prishtinë, Kosovë", price: "€2,500/muaj", beds: 3, baths: 3, area: 150, mediaType: "video", forRent: true, description: "Penthouse ekskluziv me pamje panoramike. Ambientet e rafinuara, tarraca të mëdha dhe komoditete premium.", features: ["Tarracë", "Pamje panoramike", "Klimë", "Garazh"], videoUrl: "", gallery: [property2, property1, property3] },
  "demo-3": { id: "demo-3", image: property3, title: "Shtëpi e Ngrohtë me Oborr", location: "Pejë, Kosovë", price: "€95,000", beds: 2, baths: 1, area: 70, mediaType: "photo", forRent: false, description: "Shtëpi e rehatshme me oborr privat në një lagje të qetë. I përshtatshëm për familje.", features: ["Oborr", "Kopsht", "Bodrum"], gallery: [property3, property1, property2] },
  "demo-4": { id: "demo-4", image: property1, title: "Studio i Rehatshëm", location: "Prizren, Kosovë", price: "€800/muaj", beds: 1, baths: 1, area: 45, mediaType: "3d", forRent: true, description: "Studio praktik, i përshtatshëm për studentë ose profesionistë të rinj. Komplet i mobiluar dhe i pozicionuar mirë.", features: ["Mobiluar", "Internet"], gallery: [property1, property3] },
  "demo-5": { id: "demo-5", image: property2, title: "Vilë Luksoze me Pishinë", location: "Prishtinë, Kosovë", price: "€450,000", beds: 5, baths: 4, area: 320, mediaType: "video", forRent: false, description: "Vilë e jashtëzakonshme me pishinë private, kopshte të mëdha dhe përfundime luksoze.", features: ["Pishinë", "Kopsht", "Garazh", "Sistem sigurie"], videoUrl: "", gallery: [property2, property1, property3] },
};

export default function PropertyDetail() {
  const { id } = useParams();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const { data: property, isLoading, isError, error } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      if (!id) throw new Error("No property ID provided");
      if (id.startsWith("demo-")) {
        const demoProperty = demoProperties[id];
        if (demoProperty) {
          await new Promise((resolve) => setTimeout(resolve, 200));
          return demoProperty;
        }
      }
      try {
        const result = await getProperty(id);
        if (!result) throw new Error("Pronë nuk u gjet");
        return result;
      } catch (err: any) {
        if (err?.code === "permission-denied" || err?.message?.includes("timeout") || err?.message?.includes("network")) {
          throw new Error("SERVICE_UNAVAILABLE");
        }
        throw err;
      }
    },
    enabled: !!id,
    retry: (failureCount, error: any) => (error?.message === "SERVICE_UNAVAILABLE" ? false : failureCount < 2),
    retryDelay: 1000,
    staleTime: 5000,
    gcTime: 10000,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="space-y-4 text-center">
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
            <p className="text-muted-foreground">Po ngarkohen detajet e pronës…</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex min-h-[70vh] items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="text-2xl font-semibold">
              {error?.message === "SERVICE_UNAVAILABLE" ? "Shërbimi Nuk Është i Disponueshëm" : "Pronë Nuk U Gjet"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {error?.message === "SERVICE_UNAVAILABLE"
                ? "Ju lutemi provoni përsëri më vonë."
                : "Pronë e pa-gjetur ose është hequr."}
            </p>
            <Link to="/properties">
              <Button className="mt-6 rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90">
                Kthehu te pronat
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const gallery: string[] = property.gallery && property.gallery.length > 0 ? property.gallery : [property.image];
  const mainImg = gallery[0] || property.image || property1;
  const sideImgs = gallery.slice(1, 3);
  const priceText = property.price?.startsWith("€") ? property.price : `€${property.price}`;
  const openLightbox = (i: number) => { setIdx(i); setLightboxOpen(true); };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <Header />

      <main className="container-custom py-6 lg:py-10">
        {/* Breadcrumb */}
        <Link to="/properties" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Kthehu te pronat
        </Link>

        {/* Title row */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="chip bg-primary/10 text-primary">{property.forRent ? "Me Qira" : "Në Shitje"}</span>
              <span className="chip bg-secondary capitalize text-foreground/70">{property.type || property.mediaType}</span>
            </div>
            <h1 className="font-display text-3xl font-semibold text-foreground lg:text-4xl">{property.title}</h1>
            <div className="mt-2 flex items-center text-muted-foreground">
              <MapPin className="mr-1.5 h-4 w-4 text-primary" />
              {property.location}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground/60 transition-colors hover:bg-secondary">
              <Share2 className="h-4 w-4" />
            </button>
            <a href="tel:+38349295636">
              <Button className="h-11 rounded-full bg-primary px-5 font-semibold text-primary-foreground hover:bg-primary/90">
                <Phone className="mr-2 h-4 w-4" /> Telefono
              </Button>
            </a>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          <button onClick={() => openLightbox(0)} className="group relative overflow-hidden rounded-[1.5rem] lg:col-span-2">
            <img src={mainImg} alt={property.title} className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:h-[464px]" />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-primary shadow-soft backdrop-blur">
              <ImageIcon className="h-4 w-4" /> Shiko {gallery.length} foto
            </span>
          </button>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            {sideImgs.map((src, i) => (
              <button key={i} onClick={() => openLightbox(i + 1)} className="group relative overflow-hidden rounded-[1.5rem]">
                <img src={src} alt={`${property.title} ${i + 2}`} className="h-36 w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:h-[224px]" />
              </button>
            ))}
            {sideImgs.length === 0 && <div className="hidden rounded-[1.5rem] bg-secondary lg:block lg:h-[464px]" />}
          </div>
        </div>

        {/* Content + sidebar */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {/* Specs */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {property.mediaType !== "land" && (
                <>
                  <Spec icon={Bed} value={property.beds} label="Dhoma gjumi" />
                  <Spec icon={Bath} value={property.baths} label="Banjo" />
                </>
              )}
              <Spec icon={Square} value={property.area} label={property.mediaType === "land" ? "Hektarë" : "m² sipërfaqe"} />
              <Spec icon={Home} value={property.mediaType === "3d" ? "360°" : property.mediaType === "video" ? "Video" : "Foto"} label="Vizualizim" />
            </div>

            {/* Description */}
            <div className="rounded-[1.5rem] border border-border bg-card p-7">
              <h2 className="mb-3 font-display text-xl font-semibold">Përshkrimi i pronës</h2>
              <p className="whitespace-pre-line leading-relaxed text-muted-foreground">
                {property.description?.trim() ? property.description : "Nuk ka përshkrim për këtë pronë."}
              </p>
            </div>

            {/* 3D tour */}
            {property.kuulaId && property.mediaType === "3d" && (
              <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card">
                <div className="flex items-center gap-3 border-b border-border p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <Move3d className="h-5 w-5 text-primary" />
                  </span>
                  <div>
                    <div className="font-semibold">Tur Virtual 360°</div>
                    <div className="text-sm text-muted-foreground">Eksploroni pronën në detaje</div>
                  </div>
                </div>
                <div className="h-[420px] md:h-[560px]">
                  <Kuula3DViewer kuulaId={property.kuulaId} title={property.title} />
                </div>
              </div>
            )}

            {/* Video */}
            {property.videoUrl && property.mediaType === "video" && (
              <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card p-3">
                <video src={property.videoUrl} className="w-full rounded-[1.1rem]" controls />
              </div>
            )}

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div className="rounded-[1.5rem] border border-border bg-card p-7">
                <h2 className="mb-4 font-display text-xl font-semibold">Tiparet e pronës</h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {property.features.map((f: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 rounded-2xl bg-secondary/50 px-4 py-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-4 w-4 text-primary" />
                      </span>
                      <span className="text-sm font-medium">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card p-3">
              <div className="overflow-hidden rounded-[1.1rem]">
                <iframe
                  title="Harta"
                  width="100%"
                  height="100%"
                  className="h-72 w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
                />
              </div>
            </div>
          </div>

          {/* Sticky sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-5 lg:sticky lg:top-24">
              <div className="rounded-[1.5rem] bg-leaf p-7 text-white">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Tag className="h-4 w-4" /> {property.forRent ? "Qira mujore" : "Çmimi i shitjes"}
                </div>
                <div className="mt-2 font-display text-4xl font-semibold">
                  {priceText}
                  {property.forRent && <span className="text-base font-normal text-white/70">/muaj</span>}
                </div>
                <a href="tel:+38349295636">
                  <span className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-primary transition-transform hover:scale-[1.02]">
                    <Phone className="h-4 w-4" /> Cakto një vizitë
                  </span>
                </a>
              </div>

              <PropertyInquiryForm propertyId={property.id} propertyTitle={property.title} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="w-full max-w-6xl border-none bg-black/95 p-0">
          <div className="relative flex h-[88vh] w-full items-center justify-center">
            <button onClick={() => setLightboxOpen(false)} className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </button>
            {gallery.length > 1 && (
              <button onClick={() => setIdx((p) => (p === 0 ? gallery.length - 1 : p - 1))} className="absolute left-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}
            <img src={gallery[idx]} alt={`${property.title} ${idx + 1}`} className="max-h-full max-w-full object-contain" />
            {gallery.length > 1 && (
              <button onClick={() => setIdx((p) => (p === gallery.length - 1 ? 0 : p + 1))} className="absolute right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-sm text-white">
              {idx + 1} / {gallery.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const Spec = ({ icon: Icon, value, label }: { icon: any; value: any; label: string }) => (
  <div className="rounded-[1.25rem] border border-border bg-card p-4">
    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
      <Icon className="h-5 w-5 text-primary" />
    </span>
    <div className="mt-3 font-display text-xl font-semibold text-foreground">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </div>
);
