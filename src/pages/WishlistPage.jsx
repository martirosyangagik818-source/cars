import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart, Trash2, ArrowRight, Sparkles, DollarSign,
  Car, Shield, ArrowUpDown, Search, Share2, Check, ExternalLink
} from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { carListings } from '../data/cars';
import CarCard from '../components/CarCard';

export default function WishlistPage() {
  const { wishlistCars, wishlistCount, clearWishlist, removeFromWishlist } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Suggested cars for empty state
  const recommendedCars = useMemo(() => {
    return carListings.slice(0, 3);
  }, []);

  // Filter and sort wishlist cars
  const filteredCars = useMemo(() => {
    let result = [...wishlistCars];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (car) =>
          car.title.toLowerCase().includes(q) ||
          car.category.toLowerCase().includes(q) ||
          car.location.toLowerCase().includes(q) ||
          car.year.toString().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest-year':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'mileage':
        result.sort((a, b) => a.mileage - b.mileage);
        break;
      case 'recent':
      default:
        // already in order of addition (newest added first)
        break;
    }

    return result;
  }, [wishlistCars, searchQuery, sortBy]);

  // Statistics
  const totalValue = useMemo(() => {
    return wishlistCars.reduce((sum, car) => sum + (Number(car.price) || 0), 0);
  }, [wishlistCars]);

  const avgPrice = useMemo(() => {
    if (wishlistCars.length === 0) return 0;
    return Math.round(totalValue / wishlistCars.length);
  }, [totalValue, wishlistCars.length]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      {/* Background ambient glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 right-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-red-500/20 text-xs font-semibold text-red-400 mb-4">
                <Heart className="w-3.5 h-3.5 fill-current text-red-400" />
                <span>Personal Garage</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                My <span className="gradient-text">Wishlist</span>
              </h1>
              <p className="text-surface-200/60 mt-2 text-sm sm:text-base max-w-xl">
                {wishlistCount > 0
                  ? `You have saved ${wishlistCount} ${wishlistCount === 1 ? 'vehicle' : 'vehicles'} to your personal watchlist.`
                  : 'Keep track of dream cars, compare specs, and follow price updates.'}
              </p>
            </div>

            {/* Quick Actions if items exist */}
            {wishlistCount > 0 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleShare}
                  id="share-wishlist-btn"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-xs font-medium text-surface-200 hover:text-white hover:border-primary-500/30 transition-all"
                  title="Share wishlist"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-semibold">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>Share Wishlist</span>
                    </>
                  )}
                </button>

                {showClearConfirm ? (
                  <div className="flex items-center gap-2 bg-red-950/60 border border-red-500/40 p-1.5 rounded-xl animate-fade-in-up">
                    <span className="text-xs text-red-300 px-2 font-medium">Clear all?</span>
                    <button
                      onClick={() => {
                        clearWishlist();
                        setShowClearConfirm(false);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-all"
                    >
                      Yes, Clear
                    </button>
                    <button
                      onClick={() => setShowClearConfirm(false)}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowClearConfirm(true)}
                    id="clear-wishlist-btn"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-xs font-medium text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Clear All</span>
                  </button>
                )}

                <Link
                  to="/browse"
                  className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white price-gradient hover:opacity-90 transition-all glow-primary"
                >
                  <Car className="w-4 h-4" />
                  <span>Browse More</span>
                </Link>
              </div>
            )}
          </div>

          {/* Stats Bar (when items exist) */}
          {wishlistCount > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="glass-light rounded-2xl p-4 flex items-center gap-3.5 border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-primary-600/20 border border-primary-500/20 flex items-center justify-center text-primary-400">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-surface-200/50 uppercase tracking-wider font-medium">Saved Vehicles</p>
                  <p className="text-xl sm:text-2xl font-display font-bold text-white mt-0.5">
                    {wishlistCount} {wishlistCount === 1 ? 'Car' : 'Cars'}
                  </p>
                </div>
              </div>

              <div className="glass-light rounded-2xl p-4 flex items-center gap-3.5 border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-accent-500/20 border border-accent-500/20 flex items-center justify-center text-accent-400">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-surface-200/50 uppercase tracking-wider font-medium">Total Value</p>
                  <p className="text-xl sm:text-2xl font-display font-bold gradient-text mt-0.5">
                    ${totalValue.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="glass-light rounded-2xl p-4 flex items-center gap-3.5 border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-surface-200/50 uppercase tracking-wider font-medium">Average Price</p>
                  <p className="text-xl sm:text-2xl font-display font-bold text-white mt-0.5">
                    ${avgPrice.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        {wishlistCount === 0 ? (
          /* Empty State */
          <div className="py-12 sm:py-16">
            <div className="max-w-xl mx-auto text-center glass rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-red-500/10 rounded-full blur-2xl" />

              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500/20 to-primary-600/20 border border-red-500/30 mx-auto flex items-center justify-center mb-6 shadow-lg shadow-red-500/10">
                <Heart className="w-10 h-10 text-red-400" />
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                Your Wishlist is Empty
              </h2>
              <p className="text-surface-200/60 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
                Discover our showroom of high-performance and luxury vehicles. Tap the heart icon on any vehicle card to save it here for later.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/browse"
                  id="empty-browse-btn"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm text-white price-gradient hover:opacity-95 transition-all glow-primary flex items-center justify-center gap-2"
                >
                  <Car className="w-4 h-4" />
                  Explore Vehicles
                </Link>
                <Link
                  to="/sell"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm text-white glass hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  Sell Your Car
                </Link>
              </div>
            </div>

            {/* Recommended section below empty state */}
            <div className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Featured Vehicles You Might Like
                  </h3>
                  <p className="text-xs text-surface-200/50 mt-0.5">
                    Click the heart icon on any vehicle to add it to your wishlist
                  </p>
                </div>
                <Link
                  to="/browse"
                  className="flex items-center gap-1.5 text-xs font-semibold text-primary-400 hover:text-primary-300 transition-colors"
                >
                  View All
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedCars.map((car, idx) => (
                  <CarCard key={car.id} car={car} index={idx} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Wishlist Items Present */
          <div>
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 glass-light p-4 rounded-2xl border border-white/5">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-200/40" />
                <input
                  type="text"
                  placeholder="Search saved vehicles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-900/60 border border-white/10 text-white placeholder-surface-200/40 text-sm focus:outline-none focus:border-primary-500/50 transition-all"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-xs text-surface-200/60">
                  <ArrowUpDown className="w-3.5 h-3.5 text-primary-400" />
                  <span>Sort:</span>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-surface-900/60 border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-primary-500/50 transition-all cursor-pointer"
                >
                  <option value="recent">Recently Added</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest-year">Year: Newest</option>
                  <option value="mileage">Lowest Mileage</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            {filteredCars.length === 0 ? (
              <div className="text-center py-12 glass rounded-2xl border border-white/5">
                <Search className="w-8 h-8 text-surface-200/40 mx-auto mb-3" />
                <p className="text-white font-medium">No saved vehicles match "{searchQuery}"</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-3 text-xs text-primary-400 hover:underline"
                >
                  Clear search query
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car, idx) => (
                  <div key={car.id} className="relative group/item">
                    <CarCard car={car} index={idx} />
                    {/* Quick remove pill */}
                    <button
                      onClick={() => removeFromWishlist(car.id, car.title)}
                      className="absolute bottom-5 left-5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium text-red-400/80 hover:text-red-300 bg-surface-900/80 backdrop-blur-md border border-red-500/20 hover:border-red-500/50 transition-all opacity-0 group-hover/item:opacity-100"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3 h-3" />
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
