import { Link } from 'react-router-dom';
import { Car, Mail, Phone, MapPin } from 'lucide-react';

const Github = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const Twitter = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const Instagram = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

export default function Footer() {
  return (
    <footer id="footer" className="relative border-t border-white/5">
      {/* Gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold">
                <span className="text-white">Auto</span>
                <span className="gradient-text">Vault</span>
              </span>
            </Link>
            <p className="text-surface-200/60 text-sm leading-relaxed mb-6">
              The premium destination for buying and selling luxury vehicles. Trusted by thousands of buyers and certified dealers nationwide.
            </p>
            <div className="flex items-center gap-3">
              {[Github, Twitter, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl glass-light flex items-center justify-center text-surface-200/50 hover:text-primary-400 hover:border-primary-500/30 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Browse Cars', path: '/browse' },
                { name: 'Saved Wishlist', path: '/wishlist' },
                { name: 'Sell Your Car', path: '/sell' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact Us', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-surface-200/60 hover:text-primary-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Categories</h4>
            <ul className="space-y-3">
              {['Sports Cars', 'Sedans', 'SUVs', 'Electric Vehicles', 'Trucks'].map((cat) => (
                <li key={cat}>
                  <Link
                    to="/browse"
                    className="text-sm text-surface-200/60 hover:text-primary-400 transition-colors duration-300"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-surface-200/60">
                <Mail className="w-4 h-4 text-primary-400" />
                hello@autovault.com
              </li>
              <li className="flex items-center gap-3 text-sm text-surface-200/60">
                <Phone className="w-4 h-4 text-primary-400" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-3 text-sm text-surface-200/60">
                <MapPin className="w-4 h-4 text-primary-400" />
                San Francisco, CA
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-surface-200/40">
            © 2024 AutoVault. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-xs text-surface-200/40 hover:text-primary-400 transition-colors"
            >
              Privacy Policy
            </Link>
            {['Terms of Service', 'Cookie Policy'].map((policy) => (
              <a
                key={policy}
                href="#"
                className="text-xs text-surface-200/40 hover:text-primary-400 transition-colors"
              >
                {policy}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
