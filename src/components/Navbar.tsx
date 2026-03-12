import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isAuth = location.pathname === '/login' || location.pathname === '/register';

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/submit', label: 'File Complaint' },
    { to: '/track', label: 'Track' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold text-foreground">GrievanceAI</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === l.to ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}>{l.label}</Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {!isAuth && (
            <>
              <Link to="/login"><Button variant="ghost" size="sm">Sign In</Button></Link>
              <Link to="/register"><Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">Register</Button></Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 py-4 md:hidden">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">{l.label}</Link>
          ))}
          <div className="mt-3 flex gap-2">
            <Link to="/login" className="flex-1"><Button variant="outline" size="sm" className="w-full">Sign In</Button></Link>
            <Link to="/register" className="flex-1"><Button size="sm" className="w-full bg-accent text-accent-foreground">Register</Button></Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
