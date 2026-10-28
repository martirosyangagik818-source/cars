import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ListingsContext = createContext();

const LISTINGS_STORAGE_KEY = 'autovault_user_listings';

export function ListingsProvider({ children }) {
  const [userListings, setUserListings] = useState(() => {
    try {
      const stored = localStorage.getItem(LISTINGS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse user listings from localStorage', e);
    }
    return [];
  });

  // Sync with localStorage whenever listings change
  useEffect(() => {
    try {
      localStorage.setItem(LISTINGS_STORAGE_KEY, JSON.stringify(userListings));
    } catch (e) {
      console.error('Failed to save user listings to localStorage', e);
    }
  }, [userListings]);

  const addListing = useCallback((formData) => {
    const newListing = {
      id: `user-${Date.now()}`,
      title: `${formData.make} ${formData.model}`,
      year: parseInt(formData.year) || new Date().getFullYear(),
      price: parseInt(formData.price) || 0,
      mileage: parseInt(formData.mileage) || 0,
      fuel: formData.fuel || 'Gasoline',
      transmission: formData.transmission || 'Automatic',
      horsepower: parseInt(formData.horsepower) || 0,
      engine: formData.engine || 'N/A',
      drivetrain: formData.drivetrain || 'N/A',
      color: formData.color || 'N/A',
      location: formData.location || 'United States',
      seller: formData.name || 'Private Seller',
      sellerRating: 5.0,
      sellerEmail: formData.email || '',
      sellerPhone: formData.phone || '',
      image: formData.imageUrl || '/images/hero-car.jpg',
      category: formData.category || 'Sedan',
      featured: false,
      badges: ['New Listing', 'Private Seller'],
      description: formData.description || `${formData.year} ${formData.make} ${formData.model} in ${formData.color || 'great'} condition.`,
      isUserListing: true,
      createdAt: new Date().toISOString(),
    };

    setUserListings((prev) => [newListing, ...prev]);
    return newListing;
  }, []);

  const getListingById = useCallback(
    (id) => userListings.find((listing) => listing.id === id),
    [userListings]
  );

  return (
    <ListingsContext.Provider value={{ userListings, addListing, getListingById }}>
      {children}
    </ListingsContext.Provider>
  );
}

export function useListings() {
  const context = useContext(ListingsContext);
  if (!context) {
    throw new Error('useListings must be used within a ListingsProvider');
  }
  return context;
}
