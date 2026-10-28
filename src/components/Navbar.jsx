import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Car, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Browse Cars', path: '/browse' },
    { name: 'Wishlist', path: '/wishlist', badge: wishlistCount },
    { name: 'Sell Your Car', path: '/sell' },
    { name: 'About', path: '/about' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass py-3 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" id="nav-logo">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              <span className="text-white">Auto</span>
              <span className="gradient-text">Vault</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                id={`nav-${link.name.toLowerCase().replace(/\s/g, '-')}`}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  location.pathname === link.path
                    ? 'text-white bg-white/10'
                    : 'text-surface-200 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{link.name}</span>
                {link.badge > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3">
            <Link
              to="/browse"
              id="nav-search-btn"
              className="p-2.5 rounded-xl text-surface-200 hover:text-white hover:bg-white/10 transition-all duration-300"
              title="Search cars"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Wishlist Quick Action */}
            <Link
              to="/wishlist"
              id="nav-wishlist-btn"
              className="relative p-2.5 rounded-xl text-surface-200 hover:text-white hover:bg-white/10 transition-all duration-300"
              title="View your wishlist"
            >
              <Heart
                className={`w-5 h-5 transition-transform duration-300 hover:scale-110 ${
                  wishlistCount > 0 ? 'text-red-400 fill-red-500/20' : ''
                }`}
              />
              {wishlistCount > 0 && (
                <span className="absolute 0.5 -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg shadow-red-500/50">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/sell"
              id="nav-sell-cta"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white price-gradient hover:opacity-90 transition-all duration-300 glow-primary"
            >
              List Your Car
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              to="/wishlist"
              className="relative p-2 rounded-lg text-surface-200 hover:text-white"
              title="Wishlist"
            >
              <Heart
                className={`w-5 h-5 ${wishlistCount > 0 ? 'text-red-400 fill-red-500/20' : ''}`}
              />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              id="mobile-menu-toggle"
              className="p-2 rounded-lg text-surface-200 hover:text-white hover:bg-white/10 transition-all"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass-light mt-2 mx-4 rounded-2xl p-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                location.pathname === link.path
                  ? 'text-white bg-primary-600/20 border border-primary-500/20'
                  : 'text-surface-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{link.name}</span>
              {link.badge > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              to="/sell"
              className="block w-full text-center px-5 py-3 rounded-xl text-sm font-semibold text-white price-gradient"
            >
              List Your Car
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
