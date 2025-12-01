import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProperty } from "@/lib/properties";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Kuula3DViewer } from "@/components/Kuula3DViewer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar,
  Car,
  Home,
  Share2,
  Heart,
  Phone,
  Mail,
  Check,
  Loader2,
  AlertCircle,
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

// Demo properties for when IDs start with "demo-"
const demoProperties: Record<string, any> = {
  "demo-1": {
    id: "demo-1",
    image: property1,
    title: "Apartament Modern në Qendër",
    location: "Prishtinë, Kosovë",
    price: "€120,000",
    beds: 2,
    baths: 2,
    area: 85,
    mediaType: "3d",
    forRent: false,
    description: "Apartament modern në zemër të Prishtinës. Dhomat e gjera, kuzhina moderne dhe pamje të bukura të qytetit. Afër qendrave tregtare dhe transportit publik.",
    gallery: [property1, property2, property3]
  },
  "demo-2": {
    id: "demo-2",
    image: property2,
    title: "Penthouse Luksoz me Pamje",
    location: "Prishtinë, Kosovë",
    price: "€2,500/muaj",
    beds: 3,
    baths: 3,
    area: 150,
    mediaType: "video",
    forRent: true,
    description: "Penthouse ekskluziv me pamje panoramike. Ambientet e rafinuara, tarraca të mëdha dhe komoditete premium.",
    videoUrl: "",
    gallery: [property2, property1, property3]
  },
  "demo-3": {
    id: "demo-3",
    image: property3,
    title: "Shtëpi e Ngrohtë me Oborr",
    location: "Pejë, Kosovë",
    price: "€95,000",
    beds: 2,
    baths: 1,
    area: 70,
    mediaType: "photo",
    forRent: false,
    description: "Shtëpi e rehatshme me oborr privat në një lagje të qetë. I përshtatshëm për familje.",
    gallery: [property3, property1, property2]
  },
  "demo-4": {
    id: "demo-4",
    image: property1,
    title: "Studio i Rehatshëm",
    location: "Prizren, Kosovë",
    price: "€800/muaj",
    beds: 1,
    baths: 1,
    area: 45,
    mediaType: "3d",
    forRent: true,
    description: "Studio praktik, i përshtatshëm për studentë ose profesionistë të rinj. Komplet i mobiluar dhe i pozicionuar mirë.",
    gallery: [property1, property3]
  },
  "demo-5": {
    id: "demo-5",
    image: property2,
    title: "Vilë Luksoze me Pishinë",
    location: "Prishtinë, Kosovë",
    price: "€450,000",
    beds: 5,
    baths: 4,
    area: 320,
    mediaType: "video",
    forRent: false,
    description: "Vilë e jashtëzakonshme me pishinë private, kopshte të mëdha dhe përfundime luksoze. Komfort dhe elegancë në çdo detaj.",
    videoUrl: "",
    gallery: [property2, property1, property3]
  }
};

export default function PropertyDetail() {
  const { id } = useParams();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { data: property, isLoading, isError } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      if (!id) throw new Error("No property ID provided");
      
      // Check if it's a demo property
      if (id.startsWith("demo-")) {
        const demoProperty = demoProperties[id];
        if (demoProperty) {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 300));
          return demoProperty;
        }
      }
      
      // Try to fetch from Firestore
      const result = await getProperty(id);
      if (!result) throw new Error("Pronë nuk u gjet");
      return result;
    },
    enabled: !!id,
    retry: 1,
    staleTime: 5000
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Header />
      
      {isLoading ? (
        <div className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto" />
            <p className="text-muted-foreground">Po ngarkohen detajet e pronës…</p>
          </div>
        </div>
      ) : isError || !property ? (
        <div className="pt-16 min-h-screen flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Pronë Nuk U Gjet</h2>
                <p className="text-muted-foreground">
                  Pronë e pa-gjetur ose është hequr.
                </p>
              </div>
              <Button variant="hero" onClick={() => window.history.back()}>
                Go Back
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
      <>
      <main className="pt-16">
        {/* Hero Image Section */}
        <section className="relative bg-muted overflow-hidden">
          {property.mediaType === '3d' && property.kuulaId ? (
            <div className="h-[70vh]">
              <Kuula3DViewer kuulaId={property.kuulaId} title={property.title} />
            </div>
          ) : property.videoUrl && property.mediaType === 'video' ? (
            <video
              src={property.videoUrl}
              className="w-full h-[70vh] object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <div 
              className="relative cursor-pointer group"
              onClick={() => {
                if (property.gallery && property.gallery.length > 0) {
                  setCurrentImageIndex(0);
                  setLightboxOpen(true);
                }
              }}
            >
              <img
                src={(property.gallery && property.gallery.length > 0 ? property.gallery[0] : property.image) || property1}
                alt={property.title}
                className="w-full h-[70vh] object-cover scale-105 hover:scale-100 transition-transform duration-700"
              />
              {property.gallery && property.gallery.length > 0 && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-4 shadow-2xl">
                    <ImageIcon className="h-10 w-10 text-accent" />
                  </div>
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Badge className="bg-accent text-white px-6 py-2 text-base shadow-xl">
                      Shiko {property.gallery.length} Foto
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent pointer-events-none" />
          
          {/* Floating Action Buttons */}
          <div className="absolute top-6 right-6 flex gap-3 animate-fade-in">
            <Button size="icon" variant="secondary" className="rounded-full shadow-xl hover:scale-110 transition-transform backdrop-blur-sm bg-white/90">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full shadow-xl hover:scale-110 transition-transform backdrop-blur-sm bg-white/90">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Property Badge */}
          <div className="absolute top-6 left-6">
            <Badge className={`text-sm px-4 py-2 ${property.forRent ? 'bg-green-500' : 'bg-blue-500'} text-white shadow-xl`}>
              {property.forRent ? '🏠 Me Qira' : '🏘️ Në Shitje'}
            </Badge>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Header */}
                <div className="space-y-6 animate-fade-in">
                  {/* 3D Tour Section - move above description and quick stats */}
                

                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1 space-y-3">
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{property.title}</h1>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-5 w-5 mr-2 text-accent" />
                        <span className="text-lg">{property.location}</span>
                      </div>
                    </div>
                    <div className="text-left lg:text-right space-y-2">
                      <div className="text-4xl lg:text-5xl font-bold gradient-text">
                        {property.price.startsWith('€') ? property.price : `€${property.price}`}
                      </div>
                      {property.forRent && <div className="text-muted-foreground text-lg">për muaj</div>}
                    </div>
                  </div>
{property?.kuulaId && property.mediaType === '3d' && (
  <Card className="shadow-medium hover:shadow-hard transition-shadow p-0 overflow-hidden mt-6">
    <CardHeader className="border-b">
      <CardTitle className="flex items-center gap-2">
        <span className="text-2xl">🎮</span>
        Tur 3D Interaktiv
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <Kuula3DViewer kuulaId={property.kuulaId} title={property.title} />
    </CardContent>
  </Card>
)}
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 py-6 border-y">
                    {property.mediaType !== 'land' && (
                      <>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                            <Bed className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold">{property.beds}</div>
                            <div className="text-xs text-muted-foreground">Dhoma gjumi</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                            <Bath className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold">{property.baths}</div>
                            <div className="text-xs text-muted-foreground">Banjo</div>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Square className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{property.area}</div>
                        <div className="text-xs text-muted-foreground">
                          {property.mediaType === 'land' ? 'Sipërfaqe (Hektarë)' : 'Sipërfaqe (m²)'}
                        </div>
                      </div>
                    </div>
                    {/* <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">2023</div>
                        <div className="text-xs text-muted-foreground">Built Year</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Car className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">2</div>
                        <div className="text-xs text-muted-foreground">Parking</div>
                      </div>
                    </div> */}
                  </div>
                </div>

                {/* Description */}
                <Card className="shadow-medium hover:shadow-hard transition-shadow animate-fade-in" style={{ animationDelay: "0.1s" }}>
                  <CardHeader className="border-b">
                    <CardTitle className="flex items-center gap-2">
                      <Home className="h-6 w-6 text-accent" />
                      Përshkrimi i Pronës
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-base">
                      {property.description && property.description.trim().length > 0
                        ? property.description
                        : 'Nuk ka përshkrim për këtë pronë.'}
                    </p>
                  </CardContent>
                </Card>

                {/* Optional Video Section if separate from hero */}
                {property?.videoUrl && property.mediaType === 'video' && (
                  <Card className="p-4 space-y-2">
                    <h2 className="text-xl font-bold">Video</h2>
                    <video src={property.videoUrl} className="w-full rounded" controls />
                  </Card>
                )}

                {/* ...existing code... */}

                {/* Gallery Section */}
                {property.gallery && property.gallery.length > 0 && (
                  <Card className="shadow-medium hover:shadow-hard transition-shadow">
                    <CardHeader className="border-b">
                          <CardTitle className="flex items-center gap-2">
                            <ImageIcon className="h-6 w-6 text-accent" />
                            Fotot ({property.gallery.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {property.gallery.map((url, idx) => (
                          <div 
                            key={idx} 
                            className="group relative aspect-video overflow-hidden rounded-lg cursor-pointer"
                            onClick={() => {
                              setCurrentImageIndex(idx);
                              setLightboxOpen(true);
                            }}
                          >
                            <img 
                              src={url} 
                              alt={`${property.title} - Foto ${idx + 1}`} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                              <ImageIcon className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Features */}
                <Card className="shadow-medium hover:shadow-hard transition-shadow animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    <CardHeader className="border-b">
                      <CardTitle className="flex items-center gap-2">
                        <Check className="h-6 w-6 text-accent" />
                        Tiparet e Pronës
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {(property.features && property.features.length > 0) ? property.features.map((feature: string, index: number) => (
                        <div 
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <Check className="h-4 w-4 text-accent" />
                          </div>
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      )) : <span className="text-muted-foreground">Nuk ka tipare të listuara për këtë pronë.</span>}
                    </div>
                  </CardContent>
                </Card>
                {/* Lokacioni Card with Google Maps embed */}
                <Card className="p-6 space-y-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                  <h2 className="text-2xl font-bold">Lokacioni</h2>
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center border border-accent/30 shadow-lg">
                    <iframe
                      title="Google Maps"
                      width="100%"
                      height="100%"
                      style={{ border: 0, borderRadius: '12px', minHeight: '220px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
                    />
                  </div>
                </Card>

                {/* ...existing code... */}
              </div>

              {/* Sidebar - Contact Form */}
              <div className="lg:col-span-1">
                <Card className="shadow-medium hover:shadow-hard transition-shadow sticky top-24 animate-scale-in">
                  <CardHeader className="border-b">
                    <CardTitle className="text-lg">Kontakti i Pronës</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Phone className="h-5 w-5 text-accent" />
                        <span className="font-semibold text-base">{property.phone ? property.phone : 'Nuk ka numër të listuar'}</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Mail className="h-5 w-5 text-accent" />
                        <span className="font-semibold text-base">{property.email ? property.email : 'info@prona360.com'}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      </>
      )}

      {/* Image Lightbox Modal */}
      {property && property.gallery && property.gallery.length > 0 && (
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-7xl w-full p-0 bg-black/95 border-none">
            <div className="relative w-full h-[90vh] flex items-center justify-center">
              {/* Close Button */}
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-4 right-4 z-50 text-white hover:bg-white/10"
                onClick={() => setLightboxOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Previous Button */}
              {property.gallery.length > 1 && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute left-4 z-50 text-white hover:bg-white/10 disabled:opacity-30"
                  onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? property.gallery!.length - 1 : prev - 1))}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
              )}

              {/* Image */}
              <img
                src={property.gallery[currentImageIndex]}
                alt={`${property.title} - Foto ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />

              {/* Next Button */}
              {property.gallery.length > 1 && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-4 z-50 text-white hover:bg-white/10 disabled:opacity-30"
                  onClick={() => setCurrentImageIndex((prev) => (prev === property.gallery!.length - 1 ? 0 : prev + 1))}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                {currentImageIndex + 1} / {property.gallery.length}
              </div>

              {/* Thumbnail Strip */}
              {property.gallery.length > 1 && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] pb-2">
                  {property.gallery.map((url, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === currentImageIndex ? 'border-accent scale-110' : 'border-white/30 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={url}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
