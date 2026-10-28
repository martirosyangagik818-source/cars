import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Heart, Share2, MapPin, Fuel, Gauge, Settings,
  Calendar, Palette, Star, Shield, ChevronRight, Zap, Car
} from 'lucide-react';
import { carListings } from '../data/cars';
import { useState } from 'react';
import CarCard from '../components/CarCard';
import { useListings } from '../context/ListingsContext';
import { useWishlist } from '../context/WishlistContext';

export default function CarDetailPage() {
  const { id } = useParams();
  const { userListings } = useListings();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const allCars = [...userListings, ...carListings];
  const car = allCars.find((c) => String(c.id) === id) || carListings.find((c) => c.id === parseInt(id));
  const isLiked = car ? isInWishlist(car.id) : false;
  const [activeTab, setActiveTab] = useState('overview');

  if (!car) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h1 className="text-3xl font-display font-bold text-white mb-4">Vehicle Not Found</h1>
        <Link to="/browse" className="text-primary-400 hover:underline">← Back to Browse</Link>
      </div>
    );
  }

  const similarCars = allCars
    .filter((c) => c.id !== car.id && c.category === car.category)
    .slice(0, 3);

  const specs = [
    { icon: Calendar, label: 'Year', value: car.year },
    { icon: Gauge, label: 'Mileage', value: `${car.mileage.toLocaleString()} mi` },
    { icon: Fuel, label: 'Fuel Type', value: car.fuel },
    { icon: Settings, label: 'Transmission', value: car.transmission },
    { icon: Zap, label: 'Horsepower', value: `${car.horsepower} HP` },
    { icon: Car, label: 'Drivetrain', value: car.drivetrain },
    { icon: Palette, label: 'Color', value: car.color },
    { icon: Settings, label: 'Engine', value: car.engine },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero image */}
      <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <img
          src={car.image}
          alt={`${car.year} ${car.title}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/30 to-transparent" />

        {/* Back button */}
        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <Link
            to="/browse"
            id="back-to-browse"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-white text-sm font-medium hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>

        {/* Action buttons */}
        <div className="absolute top-6 right-4 sm:right-8 z-10 flex items-center gap-2">
          <button
            onClick={() => toggleWishlist(car)}
            id="detail-like-btn"
            title={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
            className={`p-2.5 rounded-xl transition-all duration-300 ${
              isLiked
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/40 scale-105'
                : 'glass text-white/70 hover:text-red-400 hover:scale-105'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button className="p-2.5 rounded-xl glass text-white/70 hover:text-white transition-all">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute bottom-6 left-4 sm:left-8 z-10 flex flex-wrap gap-2">
          {car.badges.map((badge) => (
            <span
              key={badge}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white price-gradient shadow-lg"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title card */}
            <div className="glass rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-primary-400 font-semibold uppercase tracking-wider mb-1">
                    {car.category}
                  </p>
                  <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
                    {car.year} {car.title}
                  </h1>
                  <div className="flex items-center gap-2 mt-2 text-surface-200/50 text-sm">
                    <MapPin className="w-4 h-4" />
                    {car.location}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-display font-bold gradient-text">
                    ${car.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-surface-200/40 mt-1">Excluding taxes & fees</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 p-1 rounded-xl bg-surface-800/50 mb-6">
                {['overview', 'specs', 'description'].map((tab) => (
                  <button
                    key={tab}
                    id={`tab-${tab}`}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium capitalize transition-all duration-300 ${
                      activeTab === tab
                        ? 'text-white bg-primary-600/30 border border-primary-500/30'
                        : 'text-surface-200/50 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {specs.slice(0, 4).map((spec) => (
                    <div key={spec.label} className="p-4 rounded-xl bg-surface-800/30 border border-white/5 text-center">
                      <spec.icon className="w-5 h-5 text-primary-400 mx-auto mb-2" />
                      <p className="text-xs text-surface-200/40 mb-0.5">{spec.label}</p>
                      <p className="text-sm font-semibold text-white">{spec.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {specs.map((spec) => (
                    <div key={spec.label} className="flex items-center gap-4 p-4 rounded-xl bg-surface-800/30 border border-white/5">
                      <div className="w-10 h-10 rounded-xl bg-primary-600/20 flex items-center justify-center flex-shrink-0">
                        <spec.icon className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <p className="text-xs text-surface-200/40">{spec.label}</p>
                        <p className="text-sm font-semibold text-white">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'description' && (
                <div>
                  <p className="text-surface-200/70 leading-relaxed">{car.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller card */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display font-bold text-white mb-4">Seller Information</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg">
                  {car.seller[0]}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{car.seller}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-surface-200/60">{car.sellerRating} rating</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-surface-200/40 mb-6">
                <Shield className="w-4 h-4 text-green-400" />
                Verified Dealer
              </div>

              <div className="space-y-3">
                <button
                  id="contact-seller-btn"
                  className="w-full py-3.5 rounded-xl font-semibold text-white price-gradient hover:opacity-90 transition-all glow-primary"
                >
                  Contact Seller
                </button>
                <button
                  id="detail-wishlist-btn"
                  onClick={() => toggleWishlist(car)}
                  className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                    isLiked
                      ? 'bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30'
                      : 'text-white bg-white/5 border border-white/10 hover:border-red-500/30 hover:bg-red-500/10'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-red-400' : 'text-surface-200'}`} />
                  <span>{isLiked ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
                </button>
                <button className="w-full py-3.5 rounded-xl font-semibold text-white bg-white/5 border border-white/10 hover:border-primary-500/30 hover:bg-primary-600/10 transition-all">
                  Schedule Test Drive
                </button>
              </div>
            </div>

            {/* Price analysis */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display font-bold text-white mb-4">Price Analysis</h3>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20 mb-4">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-green-300 font-semibold">Great Price</p>
                  <p className="text-xs text-surface-200/40">Below market average</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-surface-200/50">Market Average</span>
                  <span className="text-white font-semibold">${(car.price * 1.08).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-surface-200/50">This Vehicle</span>
                  <span className="text-green-400 font-semibold">${car.price.toLocaleString()}</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex justify-between text-sm">
                  <span className="text-surface-200/50">You Save</span>
                  <span className="text-green-400 font-bold">${((car.price * 0.08)).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar cars */}
        {similarCars.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl font-bold text-white">Similar Vehicles</h2>
              <Link
                to="/browse"
                className="flex items-center gap-1.5 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors group"
              >
                View All
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarCars.map((c, i) => (
                <CarCard key={c.id} car={c} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
