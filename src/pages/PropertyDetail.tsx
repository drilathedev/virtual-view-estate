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

import { useToast } from "@/hooks/use-toast";

const demoProperties: Record<string, any> = {
  "demo-1": { id: "demo-1", image: property1, title: "Modern Apartment in City Center", location: "Pristina, Kosovo", price: "€120,000", beds: 2, baths: 2, area: 85, mediaType: "3d", forRent: false, description: "Modern apartment situated in the heart of Pristina. Features spacious living areas, a contemporary kitchen, and magnificent skyline views. Walking distance to premium shopping, dining, and public transit.", features: ["Balcony", "Private Parking", "Central Heating", "Elevator"], gallery: [property1, property2, property3] },
  "demo-2": { id: "demo-2", image: property2, title: "Luxury Penthouse with Skyline Views", location: "Pristina, Kosovo", price: "€2,500/month", beds: 3, baths: 3, area: 150, mediaType: "video", forRent: true, description: "Exclusive penthouse with breathtaking panoramic vistas. Offers refined interior architecture, expansive wrap-around terraces, and premium designer fittings.", features: ["Terrace", "Panoramic Views", "Air Conditioning", "Secure Garage"], videoUrl: "", gallery: [property2, property1, property3] },
  "demo-3": { id: "demo-3", image: property3, title: "Cozy Family Home with Private Garden", location: "Peja, Kosovo", price: "€95,000", beds: 2, baths: 1, area: 70, mediaType: "photo", forRent: false, description: "Charming and peaceful residence with a private fenced garden in a serene residential neighborhood. Ideal for families seeking comfort and nature.", features: ["Private Yard", "Landscaped Garden", "Storage Basement"], gallery: [property3, property1, property2] },
  "demo-4": { id: "demo-4", image: property1, title: "Comfortable Modern Studio", location: "Prizren, Kosovo", price: "€800/month", beds: 1, baths: 1, area: 45, mediaType: "3d", forRent: true, description: "Functional, well-lit studio perfectly suited for young professionals and digital nomads. Fully furnished and located in a prime neighborhood.", features: ["Fully Furnished", "High-Speed Internet"], gallery: [property1, property3] },
  "demo-5": { id: "demo-5", image: property2, title: "Luxury Villa with Private Swimming Pool", location: "Pristina, Kosovo", price: "€450,000", beds: 5, baths: 4, area: 320, mediaType: "video", forRent: false, description: "Magnificent luxury estate boasting an outdoor swimming pool, manicured gardens, expansive living rooms, and state-of-the-art security.", features: ["Swimming Pool", "Lush Garden", "Multi-car Garage", "Security System"], videoUrl: "", gallery: [property2, property1, property3] },
};

export default function PropertyDetail() {
  const { id } = useParams();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const { toast } = useToast();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title || "Property Listing",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Property link copied to your clipboard.",
      });
    }
  };

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
        if (!result) throw new Error("Property not found");
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
            <p className="text-muted-foreground">Loading property details…</p>
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
              {error?.message === "SERVICE_UNAVAILABLE" ? "Service Unavailable" : "Property Not Found"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {error?.message === "SERVICE_UNAVAILABLE"
                ? "Please try again later."
                : "The property listing could not be found or has been removed."}
            </p>
            <Link to="/properties">
              <Button className="mt-6 rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90">
                Back to Properties
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
          <ArrowLeft className="h-4 w-4" /> Back to properties
        </Link>

        {/* Title row */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="chip bg-primary/10 text-primary">{property.forRent ? "For Rent" : "For Sale"}</span>
              <span className="chip bg-secondary capitalize text-foreground/70">{property.type || property.mediaType}</span>
            </div>
            <h1 className="font-display text-3xl font-semibold text-foreground lg:text-4xl">{property.title}</h1>
            <div className="mt-2 flex items-center text-muted-foreground">
              <MapPin className="mr-1.5 h-4 w-4 text-primary" />
              {property.location}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              aria-label="Share property"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground/60 transition-colors hover:bg-secondary"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <a href="tel:+38349295636">
              <Button className="h-11 rounded-full bg-primary px-5 font-semibold text-primary-foreground hover:bg-primary/90">
                <Phone className="mr-2 h-4 w-4" /> Call Now
              </Button>
            </a>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          <button onClick={() => openLightbox(0)} className="group relative overflow-hidden rounded-[1.5rem] lg:col-span-2">
            <img src={mainImg} alt={property.title} className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:h-[464px]" />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-primary shadow-soft backdrop-blur">
              <ImageIcon className="h-4 w-4" /> View {gallery.length} photos
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
                  <Spec icon={Bed} value={property.beds} label="Bedrooms" />
                  <Spec icon={Bath} value={property.baths} label="Bathrooms" />
                </>
              )}
              <Spec icon={Square} value={property.area} label={property.mediaType === "land" ? "Hectares" : "m² Area"} />
              <Spec icon={Home} value={property.mediaType === "3d" ? "360° Tour" : property.mediaType === "video" ? "Video" : "Photo"} label="Visualization" />
            </div>

            {/* Description */}
            <div className="rounded-[1.5rem] border border-border bg-card p-7 shadow-soft">
              <h2 className="mb-3 font-display text-xl font-semibold">Property Description</h2>
              <p className="whitespace-pre-line leading-relaxed text-muted-foreground">
                {property.description?.trim() ? property.description : "No description provided for this property."}
              </p>
            </div>

            {/* 3D tour */}
            {property.kuulaId && property.mediaType === "3d" && (
              <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-soft">
                <div className="flex items-center gap-3 border-b border-border p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <Move3d className="h-5 w-5 text-primary" />
                  </span>
                  <div>
                    <div className="font-semibold">360° Virtual Walkthrough</div>
                    <div className="text-sm text-muted-foreground">Explore every room interactively</div>
                  </div>
                </div>
                <div className="h-[420px] md:h-[560px]">
                  <Kuula3DViewer kuulaId={property.kuulaId} title={property.title} />
                </div>
              </div>
            )}

            {/* Video */}
            {property.videoUrl && property.mediaType === "video" && (
              <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card p-3 shadow-soft">
                <video src={property.videoUrl} className="w-full rounded-[1.1rem]" controls />
              </div>
            )}

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div className="rounded-[1.5rem] border border-border bg-card p-7 shadow-soft">
                <h2 className="mb-4 font-display text-xl font-semibold">Property Features &amp; Amenities</h2>
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
            <div className="overflow-hidden rounded-[1.6rem] border border-border/80 bg-card p-6 shadow-soft">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground">Location &amp; Surroundings</h2>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <span>{property.location}</span>
                  </p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/80"
                >
                  <span>Open in Google Maps</span>
                  <Share2 className="h-3 w-3" />
                </a>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-border/50 pt-4">
                <div className="rounded-xl bg-secondary/40 p-3 text-xs">
                  <span className="font-semibold text-foreground block">Prime Location</span>
                  <span className="text-muted-foreground mt-0.5 block">Situated in an established, high-demand neighborhood</span>
                </div>
                <div className="rounded-xl bg-secondary/40 p-3 text-xs">
                  <span className="font-semibold text-foreground block">Convenient Access</span>
                  <span className="text-muted-foreground mt-0.5 block">Close proximity to essential services and transport</span>
                </div>
                <div className="rounded-xl bg-secondary/40 p-3 text-xs">
                  <span className="font-semibold text-foreground block">Verified Address</span>
                  <span className="text-muted-foreground mt-0.5 block">Inspected and confirmed on municipal records</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-5 lg:sticky lg:top-24">
              <div className="rounded-[1.6rem] border border-border/80 bg-card p-7 text-foreground shadow-soft">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <Tag className="h-3.5 w-3.5 text-muted-foreground" /> {property.forRent ? "Monthly Rent" : "Listing Price"}
                  </div>
                  <span className="rounded-full bg-secondary border border-border px-2.5 py-0.5 text-[11px] font-bold text-foreground">
                    Verified
                  </span>
                </div>
                <div className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground">
                  {priceText}
                  {property.forRent && <span className="text-base font-normal text-muted-foreground">/month</span>}
                </div>

                <div className="mt-6 flex flex-col gap-2.5">
                  <a href="tel:+38349295636">
                    <span className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99]">
                      <Phone className="h-4 w-4" /> Schedule a Viewing
                    </span>
                  </a>
                  <a
                    href="https://wa.me/38349295636"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-secondary px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-secondary/80">
                      Message on WhatsApp
                    </span>
                  </a>
                </div>

                <div className="mt-6 border-t border-border/60 pt-4 text-[11px] text-muted-foreground flex items-center justify-between">
                  <span>Direct Agent Support</span>
                  <span>Free Consultation</span>
                </div>
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
  <div className="rounded-[1.4rem] border border-border/80 bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-medium">
    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
      <Icon className="h-5 w-5" />
    </span>
    <div className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground">{value}</div>
    <div className="text-xs font-medium text-muted-foreground mt-0.5">{label}</div>
  </div>
);
