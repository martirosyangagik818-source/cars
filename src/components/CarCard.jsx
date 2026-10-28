import { Link } from 'react-router-dom';
import { MapPin, Fuel, Gauge, Heart, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';

export default function CarCard({ car, index = 0 }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isLiked = isInWishlist(car.id);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      id={`car-card-${car.id}`}
      className="group card-hover rounded-2xl overflow-hidden glass-light"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image container */}
      <div className="relative h-52 sm:h-56 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-surface-800 shimmer" />
        )}
        <img
          src={car.image}
          alt={`${car.year} ${car.title}`}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {car.badges.map((badge) => (
            <span
              key={badge}
              className="px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider text-white price-gradient shadow-lg"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Like button */}
        <button
          id={`like-btn-${car.id}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(car);
          }}
          aria-label={isLiked ? 'Remove from wishlist' : 'Save to wishlist'}
          title={isLiked ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 z-10 ${
            isLiked
              ? 'bg-red-500 text-white scale-110 shadow-lg shadow-red-500/40'
              : 'glass text-white/70 hover:text-red-400 hover:scale-110'
          }`}
        >
          <Heart className={`w-4 h-4 transition-transform duration-200 ${isLiked ? 'fill-current scale-110' : ''}`} />
        </button>

        {/* Category tag */}
        <div className="absolute bottom-3 left-3">
          <span className="px-3 py-1 rounded-lg text-xs font-medium text-white/80 glass">
            {car.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Year */}
        <div className="mb-3">
          <h3 className="font-display text-lg font-bold text-white group-hover:text-primary-300 transition-colors duration-300">
            {car.title}
          </h3>
          <p className="text-sm text-surface-200/50 mt-0.5">{car.year} · {car.drivetrain}</p>
        </div>

        {/* Specs grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-surface-200/60">
            <Gauge className="w-3.5 h-3.5 text-primary-400" />
            <span>{car.mileage.toLocaleString()} mi</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-surface-200/60">
            <Fuel className="w-3.5 h-3.5 text-accent-400" />
            <span>{car.fuel}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-surface-200/60">
            <MapPin className="w-3.5 h-3.5 text-primary-400" />
            <span className="truncate">{car.location.split(',')[0]}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-display font-bold gradient-text">
              ${car.price.toLocaleString()}
            </p>
          </div>
          <Link
            to={`/car/${car.id}`}
            id={`view-details-${car.id}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-white/5 border border-white/10 hover:border-primary-500/50 hover:bg-primary-600/20 transition-all duration-300 group/btn"
          >
            Details
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
