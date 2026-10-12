import { Menu, X, Home, ArrowRight, Phone } from "lucide-react";
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/properties', label: 'Properties' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
];

const Logo = ({ light = false }: { light?: boolean }) => (
  <Link to="/" className="group flex items-center gap-2.5">
    <span className={`flex h-9 w-9 items-center justify-center rounded-[0.7rem] ${light ? 'bg-white/15' : 'bg-primary'} transition-transform group-hover:scale-105`}>
      <Home className={`h-[18px] w-[18px] ${light ? 'text-white' : 'text-primary-foreground'}`} strokeWidth={2.4} />
    </span>
    <span className={`font-display text-[1.35rem] font-semibold tracking-tight ${light ? 'text-white' : 'text-foreground'}`}>
      Prona<span className="text-primary">360</span>
    </span>
  </Link>
);

interface HeaderProps {
  overlay?: boolean;
}

export const Header = ({ overlay = false }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll while the full-screen menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const wrap = overlay
    ? 'absolute top-0 left-0 right-0 z-50'
    : 'sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)]';

  return (
    <header className={wrap}>
      <div className="container-custom">
        <div className="flex h-[72px] items-center justify-between gap-6">
          <Logo light={overlay} />

          {/* Center nav — clean underline links */}
          <nav className="hidden items-center gap-9 lg:flex">
            {navItems.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative py-1 text-[0.95rem] font-medium transition-colors ${
                    overlay
                      ? active ? 'text-white' : 'text-white/70 hover:text-white'
                      : active ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className={`absolute -bottom-[5px] left-0 h-[2px] w-full rounded-full ${overlay ? 'bg-white' : 'bg-primary'}`} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link to="/contact" className="hidden sm:block">
              <Button className="h-10 rounded-full bg-primary px-5 text-[0.9rem] font-semibold text-primary-foreground shadow-soft transition-all duration-200 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]">
                List Property
              </Button>
            </Link>
            <button
              className={`flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${overlay ? 'bg-white/15 text-white' : 'bg-secondary text-foreground'}`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Full-screen mobile menu */}
      {open && createPortal(
        <div className="fixed inset-0 z-[3000] flex flex-col bg-background lg:hidden">
          {/* Top bar */}
          <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-border/60 px-5">
            <Logo />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-1 flex-col px-5 pt-4">
            {navItems.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between border-b border-border/60 py-5"
                >
                  <span className={`font-display text-2xl font-semibold tracking-tight ${active ? 'text-primary' : 'text-foreground'}`}>
                    {item.label}
                  </span>
                  <ArrowRight className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
                </Link>
              );
            })}
          </nav>

          {/* Footer actions */}
          <div className="shrink-0 space-y-3 px-5 pb-10 pt-4">
            <Link to="/contact" onClick={() => setOpen(false)}>
              <Button className="h-14 w-full rounded-2xl bg-primary py-4 text-base font-semibold text-primary-foreground hover:bg-primary/90">
                List Property
              </Button>
            </Link>
            <a
              href="tel:+38349295636"
              className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-border py-4 text-base font-semibold text-foreground"
            >
              <Phone className="h-4 w-4 text-primary" />
              Call Us
            </a>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};
