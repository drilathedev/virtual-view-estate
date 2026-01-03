import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from '@/assets/prona360logo.png';

export const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <img src={logo} alt="PRONA360" className="h-10 w-auto object-contain mb-4" />
            <p className="text-slate-300 mb-6 leading-relaxed">
              Platforma më moderne e pasurive të paluajtshme me vizualizim 3D dhe tura virtuale.
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/share/1G9MhN9teb/?mibextid=wwXlfr" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/prona360rks" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:scale-110 transition-all duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Lidhje të Shpejta</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-slate-300 hover:text-blue-400 hover:translate-x-1 transition-all duration-300 inline-block">
                  → Ballina
                </Link>
              <li>
                <Link to="/properties" className="text-slate-300 hover:text-blue-400 hover:translate-x-1 transition-all duration-300 inline-block">
                  → Prona
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-300 hover:text-blue-400 hover:translate-x-1 transition-all duration-300 inline-block">
                  → Vizualizimi 3D
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-blue-400 hover:translate-x-1 transition-all duration-300 inline-block">
                  → Rreth Nesh
                </Link>
              </li>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Shërbime</h3>
            <ul className="space-y-3">
              <li className="text-slate-300 hover:text-cyan-400 transition-colors cursor-default">✓ Tura Virtuale</li>
              <li className="text-slate-300 hover:text-cyan-400 transition-colors cursor-default">✓ Fotografi Profesionale</li>
              <li className="text-slate-300 hover:text-cyan-400 transition-colors cursor-default">✓ Vizualizim 3D</li>
              <li className="text-slate-300 hover:text-cyan-400 transition-colors cursor-default">✓ Konsulencë</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Kontakti</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <span>+383 49 295 636</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="break-all">prona360rks@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>Drenas, Kosovë</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">© 2025 PRONA360. Të gjitha të drejtat e rezervuara.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Politika e Privatësisë</a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Termat & Kushtet</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
