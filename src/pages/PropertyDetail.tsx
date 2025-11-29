import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Mail
} from "lucide-react";
import property2 from "@/assets/property-2.jpg";

export default function PropertyDetail() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Image Section */}
        <section className="relative h-[60vh] bg-muted">
          <img 
            src={property2} 
            alt="Property" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          
          {/* Floating Action Buttons */}
          <div className="absolute top-6 right-6 flex gap-3">
            <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Header */}
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="mb-3">Penthouse me Pamje Panoramike</h1>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-5 w-5 mr-2" />
                        <span className="text-lg">Prishtinë, Kosovë</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-primary">€2,500</div>
                      <div className="text-muted-foreground">/ muaj</div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex flex-wrap gap-6 py-6 border-y">
                    <div className="flex items-center gap-2">
                      <Bed className="h-5 w-5 text-accent" />
                      <span className="font-semibold">3 Dhoma</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="h-5 w-5 text-accent" />
                      <span className="font-semibold">3 Banjo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Square className="h-5 w-5 text-accent" />
                      <span className="font-semibold">150m²</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-accent" />
                      <span className="font-semibold">2023</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car className="h-5 w-5 text-accent" />
                      <span className="font-semibold">2 Parking</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <Card className="p-6 space-y-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                  <h2 className="text-2xl font-bold">Përshkrimi</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Penthouse i jashtëzakonshëm me pamje panoramike të qytetit. Kjo pronë luksoze ofron një
                    kombinim perfekt të hapësirës, dritës natyrore dhe dizajnit modern. Me 150m² hapësirë jetesore,
                    3 dhoma gjumi, 3 banja dhe 2 vende parkimi, kjo është banesa ideale për ata që kërkojnë luksin
                    dhe komoditetin.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Ndodhur në një nga lagjet më të kërkuara të Prishtinës, kjo pronë ofron akses të lehtë në
                    të gjitha shërbimet urbane, qendra tregtare, restorante dhe institucione arsimore.
                  </p>
                </Card>

                {/* Features */}
                <Card className="p-6 space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <h2 className="text-2xl font-bold">Veçoritë</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      "Ngrohje Qendrore",
                      "Ajër i Kondicionuar",
                      "Ballkon i Madh",
                      "Ashensor",
                      "Internet Fiber",
                      "Siguri 24/7",
                      "Mobiluar",
                      "Paisje Moderne",
                      "Pamje nga Qyteti"
                    ].map((feature, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <Home className="h-4 w-4 text-accent" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
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
                <Card className="p-6 space-y-6 sticky top-24 animate-scale-in">
                  <h3 className="text-xl font-bold">Interesohem për këtë pronë</h3>
                  
                  <form className="space-y-4">
                    <div>
                      <Input placeholder="Emri i plotë" className="h-12" />
                    </div>
                    <div>
                      <Input type="email" placeholder="Email" className="h-12" />
                    </div>
                    <div>
                      <Input type="tel" placeholder="Telefon" className="h-12" />
                    </div>
                    <div>
                      <Textarea 
                        placeholder="Mesazhi juaj..." 
                        className="min-h-[120px]"
                      />
                    </div>
                    <Button variant="hero" size="lg" className="w-full">
                      Dërgo Mesazh
                    </Button>
                  </form>

                  <div className="border-t pt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                        <Phone className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Na telefononi</div>
                        <div className="font-semibold">+383 44 123 456</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                        <Mail className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Dërgo email</div>
                        <div className="font-semibold">info@prona360.com</div>
                      </div>
                    </div>
                  </div>

                  <Button variant="premium" size="lg" className="w-full">
                    Rezervo Turë Virtuale
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
