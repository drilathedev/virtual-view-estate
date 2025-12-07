import { Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Link } from "react-router-dom";
import logo from '@/assets/prona360logo.png';

export const Header = () => {
    const [open, setOpen] = useState(false);
    const [searchQ, setSearchQ] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
      if (open) inputRef.current?.focus();
    }, [open]);

    useEffect(() => {
      function onKey(e: KeyboardEvent) {
        if (e.key === 'Escape') setOpen(false);
      }
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }, []);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="PRONA360" className="h-10 w-auto object-contain" />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors">
              Ballina
            </Link>
            <Link to="/properties" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors">
              Prona
            </Link>
            <Link to="/services" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors">
              Shërbime
            </Link>
            <Link to="/contact" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors">
              Kontakt
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-gray-100 rounded-md">
              <Search className="h-5 w-5" />
            </Button>
            {/* User login removed — only admin may authenticate via /login */}
            <Link to="/contact">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2">Listo Pronën</Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-gray-100 rounded-md"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(v => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
        {/* Mobile menu overlay */}
        {open && (
          <>
            <div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
              onClick={() => setOpen(false)}
            />
            <div
              className="md:hidden fixed left-0 right-0 top-16 bg-white shadow-lg rounded-b-2xl max-h-[calc(100vh-4rem)] transform transition-all duration-300 ease-in-out z-50 overflow-y-auto"
              style={{ 
                opacity: open ? 1 : 0,
                pointerEvents: open ? 'auto' : 'none',
                transform: open ? 'translateY(0) scaleY(1)' : 'translateY(-8px) scaleY(0.95)',
                transformOrigin: 'top'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="flex flex-col gap-0 p-4">
                <div className="mb-3 pb-3 border-b border-gray-100">
                  <Input
                    ref={inputRef}
                    placeholder="Kërko prona..."
                    className="h-10 border-2 border-gray-200 rounded-lg px-4 focus:border-blue-500 focus:outline-none"
                    value={searchQ}
                    onChange={(e) => setSearchQ(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const q = searchQ.trim();
                        setOpen(false);
                        navigate(q ? `/properties?q=${encodeURIComponent(q)}` : '/properties');
                      }
                    }}
                  />
                </div>
                <Link to="/" onClick={() => setOpen(false)} className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">Ballina</Link>
                <Link to="/properties" onClick={() => setOpen(false)} className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">Prona</Link>
                <Link to="/services" onClick={() => setOpen(false)} className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">Shërbime</Link>
                <Link to="/contact" onClick={() => setOpen(false)} className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">Kontakt</Link>
              </nav>
            </div>
          </>
        )}
    </header>
  );
};
