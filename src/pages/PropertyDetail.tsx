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
  Image as ImageIcon
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
            <img
              src={property.image || property1}
              alt={property.title}
              className="w-full h-[70vh] object-cover scale-105 hover:scale-100 transition-transform duration-700"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          
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
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1 space-y-3">
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{property.title}</h1>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-5 w-5 mr-2 text-accent" />
                        <span className="text-lg">{property.location}</span>
                      </div>
                    </div>
                    <div className="text-left lg:text-right space-y-2">
                      <div className="text-4xl lg:text-5xl font-bold gradient-text">{property.price}</div>
                      {property.forRent && <div className="text-muted-foreground text-lg">per month</div>}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 py-6 border-y">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Bed className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{property.beds}</div>
                        <div className="text-xs text-muted-foreground">Bedrooms</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Bath className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{property.baths}</div>
                        <div className="text-xs text-muted-foreground">Bathrooms</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Square className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{property.area}</div>
                        <div className="text-xs text-muted-foreground">m² Area</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
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
                    </div>
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

                {/* Optional 3D Tour Section */}
                {property?.kuulaId && property.mediaType === '3d' && (
                  <Card className="shadow-medium hover:shadow-hard transition-shadow p-0 overflow-hidden">
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

                {/* Gallery Section */}
                {property.gallery && property.gallery.length > 0 && (
                  <Card className="shadow-medium hover:shadow-hard transition-shadow">
                    <CardHeader className="border-b">
                          <CardTitle className="flex items-center gap-2">
                            <ImageIcon className="h-6 w-6 text-accent" />
                            Galeri Fotografish ({property.gallery.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {property.gallery.map((url, idx) => (
                          <div key={idx} className="group relative aspect-video overflow-hidden rounded-lg">
                            <img 
                              src={url} 
                              alt={`gallery-${idx}`} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
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
                      {[
                        "Central Heating",
                        "Air Conditioning",
                        "Large Balcony",
                        "Elevator",
                        "Fiber Internet",
                        "24/7 Security",
                        "Furnished",
                        "Modern Appliances",
                        "City View"
                      ].map((feature, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <Check className="h-4 w-4 text-accent" />
                          </div>
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Map Placeholder */}
                <Card className="p-6 space-y-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                  <h2 className="text-2xl font-bold">Lokacioni</h2>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-muted-foreground" />
                  </div>
                </Card>
              </div>

              {/* Sidebar - Contact Form */}
              <div className="lg:col-span-1">
                <Card className="shadow-medium hover:shadow-hard transition-shadow sticky top-24 animate-scale-in">
                  <CardHeader className="border-b">
                    <CardTitle className="text-lg">A jeni të interesuar për këtë pronë?</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                  
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input placeholder="John Doe" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="john@example.com" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone</label>
                      <Input type="tel" placeholder="+383 44 123 456" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message</label>
                      <Textarea 
                        placeholder="Jam i/e interesuar për këtë pronë..." 
                        className="min-h-[100px] resize-none"
                      />
                    </div>
                    <Button variant="hero" size="lg" className="w-full gap-2">
                      <Mail className="h-4 w-4" />
                      Send Message
                    </Button>
                  </form>

                  <div className="border-t pt-6 space-y-3">
                    <p className="text-sm font-medium text-center">Or contact us directly:</p>
                    <a href="tel:+38344123456" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-accent" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs text-muted-foreground">Call us</div>
                        <div className="font-semibold">+383 44 123 456</div>
                      </div>
                    </a>
                    <a href="mailto:info@prona360.com" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-accent" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs text-muted-foreground">Email us</div>
                        <div className="font-semibold text-sm">info@prona360.com</div>
                      </div>
                    </a>
                  </div>

                  {/* <Button variant="premium" size="lg" className="w-full gap-2">
                    <Home className="h-5 w-5" />
                    Schedule Virtual Tour
                  </Button> */}
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
    </div>
  );
}
