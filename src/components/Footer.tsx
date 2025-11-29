import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold mb-4">PRONA360</div>
            <p className="text-primary-foreground/80 mb-4">
              Platforma më moderne e pasurive të paluajtshme me vizualizim 3D dhe tura virtuale.
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Lidhje të Shpejta</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Ballina
                </Link>
              </li>
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Prona
                </Link>
              </li>
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Vizualizimi 3D
                </Link>
              </li>
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Rreth Nesh
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Shërbime</h3>
            <ul className="space-y-2">
              <li className="text-primary-foreground/80">Tura Virtuale</li>
              <li className="text-primary-foreground/80">Fotografi Profesionale</li>
              <li className="text-primary-foreground/80">Vizualizim 3D</li>
              <li className="text-primary-foreground/80">Konsulencë</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Kontakti</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Phone className="h-4 w-4" />
                +383 44 123 456
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Mail className="h-4 w-4" />
                info@prona360.com
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <MapPin className="h-4 w-4" />
                Prishtinë, Kosovë
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60">
          <p>© 2024 PRONA360. Të gjitha të drejtat e rezervuara.</p>
        </div>
      </div>
    </footer>
  );
};
