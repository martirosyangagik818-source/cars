import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, ChevronRight, Shield, Star, Zap, TrendingUp } from 'lucide-react';
import { carListings, categories, stats } from '../data/cars';
import CarCard from '../components/CarCard';
import { useListings } from '../context/ListingsContext';

function useCountUp(target, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (!startOnView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const num = parseInt(target.replace(/[^0-9]/g, ''));
          const step = num / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= num) {
              current = num;
              clearInterval(timer);
            }
            setCount(Math.floor(current));
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, startOnView]);

  return { count, ref };
}

function StatCard({ stat, index }) {
  const { count, ref } = useCountUp(stat.value);
  const suffix = stat.value.replace(/[0-9,]/g, '');

  return (
    <div
      ref={ref}
      className="text-center p-6 rounded-2xl glass-light animate-fade-in-up"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <p className="text-3xl sm:text-4xl font-display font-bold gradient-text">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-sm text-surface-200/50 mt-1 font-medium">{stat.label}</p>
    </div>
  );
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { userListings } = useListings();
  const featuredCars = carListings.filter((car) => car.featured);
  const allFeaturedCars = [...userListings, ...featuredCars];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-car.jpg"
            alt="Premium sports car"
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
        </div>

        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-600/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-500/15 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in-up">
              <Zap className="w-4 h-4 text-primary-400" />
              <span className="text-xs font-semibold text-primary-300 uppercase tracking-wider">
                #1 Premium Car Marketplace
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Find Your
              <br />
              <span className="gradient-text">Dream Car</span>
              <br />
              Today
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-surface-200/60 max-w-xl mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Explore thousands of premium vehicles from certified dealers. From luxury sedans to high-performance sports cars — your perfect ride awaits.
            </p>

            {/* Search Bar */}
            <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-200/40" />
                  <input
                    id="hero-search"
                    type="text"
                    placeholder="Search by make, model, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl glass text-white placeholder-surface-200/30 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  />
                </div>
                <Link
                  to={`/browse${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`}
                  id="hero-search-btn"
                  className="px-8 py-4 rounded-2xl font-semibold text-white price-gradient hover:opacity-90 transition-all duration-300 glow-primary flex items-center justify-center gap-2"
                >
                  Search
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Quick category pills */}
            <div className="flex flex-wrap gap-2 mt-6 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              {categories.slice(1).map((cat) => (
                <Link
                  key={cat.name}
                  to={`/browse?category=${cat.name}`}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-surface-200/60 border border-white/5 hover:border-primary-500/30 hover:text-primary-300 hover:bg-primary-600/10 transition-all duration-300"
                >
                  {cat.icon} {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-surface-200/30 uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-primary-400/50 to-transparent" />
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section id="featured-cars" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-semibold text-primary-400 uppercase tracking-wider mb-2">Handpicked for you</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Featured Vehicles
              </h2>
            </div>
            <Link
              to="/browse"
              id="view-all-link"
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors group"
            >
              View All
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Cars grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allFeaturedCars.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </div>

          {/* Mobile view all */}
          <div className="mt-8 sm:hidden text-center">
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white price-gradient"
            >
              View All Cars
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-20 animated-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary-400 uppercase tracking-wider mb-2">Why AutoVault</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              The Trusted Way to Buy & Sell Cars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Verified Dealers',
                desc: 'Every dealer is verified and rated by our community. Buy with complete confidence knowing each vehicle has been inspected.',
                color: 'from-primary-500 to-primary-700',
              },
              {
                icon: Star,
                title: 'Premium Quality',
                desc: 'Only the finest vehicles make it to our marketplace. Each listing undergoes a rigorous quality check and authenticity verification.',
                color: 'from-accent-500 to-accent-600',
              },
              {
                icon: TrendingUp,
                title: 'Best Market Prices',
                desc: 'Our AI-powered pricing engine ensures fair market values. Get real-time price comparisons and market trend analysis.',
                color: 'from-primary-400 to-accent-500',
              },
            ].map((feature, i) => (
              <div
                key={feature.title}
                className="p-8 rounded-2xl glass card-hover text-center animate-fade-in-up"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-6`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-sm text-surface-200/50 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 price-gradient opacity-90" />
            <div className="absolute inset-0 bg-[url('/images/hero-car.jpg')] bg-cover bg-center opacity-10" />

            <div className="relative z-10 px-8 sm:px-16 py-16 sm:py-20 text-center">
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-4">
                Ready to Sell Your Car?
              </h2>
              <p className="text-lg text-white/70 max-w-xl mx-auto mb-8">
                List your vehicle on AutoVault and reach thousands of qualified buyers. Free listing, zero hassle.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/sell"
                  id="cta-sell-btn"
                  className="px-8 py-4 rounded-2xl font-semibold text-primary-600 bg-white hover:bg-surface-50 transition-all duration-300 shadow-2xl"
                >
                  List Your Car — Free
                </Link>
                <Link
                  to="/browse"
                  className="px-8 py-4 rounded-2xl font-semibold text-white border-2 border-white/30 hover:bg-white/10 transition-all duration-300"
                >
                  Browse Inventory
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
