import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { carListings, categories, priceRanges } from '../data/cars';
import CarCard from '../components/CarCard';
import { useListings } from '../context/ListingsContext';

export default function BrowsePage() {
  const { userListings } = useListings();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'All';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const allCars = useMemo(() => [...userListings, ...carListings], [userListings]);

  const filteredCars = useMemo(() => {
    let result = [...allCars];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (car) =>
          car.title.toLowerCase().includes(q) ||
          car.category.toLowerCase().includes(q) ||
          car.fuel.toLowerCase().includes(q) ||
          car.location.toLowerCase().includes(q) ||
          car.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((car) => car.category === selectedCategory);
    }

    // Price filter
    const range = priceRanges[selectedPriceRange];
    result = result.filter((car) => car.price >= range.min && car.price <= range.max);

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'mileage':
        result.sort((a, b) => a.mileage - b.mileage);
        break;
      case 'newest':
        result.sort((a, b) => b.year - a.year);
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [searchQuery, selectedCategory, selectedPriceRange, sortBy, allCars]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPriceRange(0);
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'All' || selectedPriceRange !== 0;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-10">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
            Browse <span className="gradient-text">Vehicles</span>
          </h1>
          <p className="text-surface-200/50 text-lg">
            Discover {allCars.length} premium vehicles from verified dealers
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="glass rounded-2xl p-4 sm:p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-200/40" />
              <input
                id="browse-search"
                type="text"
                placeholder="Search make, model, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-surface-800/50 text-white placeholder-surface-200/30 border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/30 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-surface-200/40 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full lg:w-48 pl-4 pr-10 py-3.5 rounded-xl bg-surface-800/50 text-white border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="mileage">Lowest Mileage</option>
                <option value="newest">Newest First</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-200/40 pointer-events-none" />
            </div>

            {/* Filter toggle (mobile) */}
            <button
              id="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-surface-800/50 text-white border border-white/5 hover:border-primary-500/30 transition-all"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Filter row */}
          <div className={`mt-4 lg:block ${showFilters ? 'block' : 'hidden'}`}>
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  id={`filter-cat-${cat.name.toLowerCase()}`}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat.name
                      ? 'text-white price-gradient shadow-lg'
                      : 'text-surface-200/60 bg-surface-800/50 border border-white/5 hover:border-primary-500/30 hover:text-primary-300'
                  }`}
                >
                  {cat.icon} {cat.name} ({cat.count})
                </button>
              ))}
            </div>

            {/* Price range */}
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((range, i) => (
                <button
                  key={range.label}
                  id={`filter-price-${i}`}
                  onClick={() => setSelectedPriceRange(i)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedPriceRange === i
                      ? 'text-white bg-primary-600/30 border border-primary-500/50'
                      : 'text-surface-200/60 bg-surface-800/50 border border-white/5 hover:border-primary-500/30 hover:text-primary-300'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>

            {/* Clear filters */}
            {hasActiveFilters && (
              <button
                id="clear-filters"
                onClick={clearFilters}
                className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Clear All Filters
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-surface-200/50">
            Showing <span className="text-white font-semibold">{filteredCars.length}</span> vehicles
          </p>
        </div>

        {/* Cars grid */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCars.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-surface-800 flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-surface-200/30" />
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-2">No vehicles found</h3>
            <p className="text-surface-200/50 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 rounded-xl font-semibold text-white price-gradient"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
