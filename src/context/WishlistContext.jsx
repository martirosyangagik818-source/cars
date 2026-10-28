import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { carListings } from '../data/cars';
import { useListings } from './ListingsContext';

const WishlistContext = createContext();

const STORAGE_KEY = 'autovault_wishlist_ids';

export function WishlistProvider({ children }) {
  const { userListings } = useListings();

  // Load initial wishlist IDs from localStorage
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed.map(String);
      }
    } catch (e) {
      console.error('Failed to parse wishlist from localStorage', e);
    }
    // Default with 1-2 favorites if first time user, or empty array
    return [];
  });

  // Toast state for wishlist actions
  const [toast, setToast] = useState(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlistIds]);

  // Combine static cars and user created listings
  const allCars = useMemo(() => [...userListings, ...carListings], [userListings]);

  // Derive wishlist cars
  const wishlistCars = useMemo(() => {
    return allCars.filter((car) => wishlistIds.includes(String(car.id)));
  }, [allCars, wishlistIds]);

  const isInWishlist = useCallback(
    (carId) => wishlistIds.includes(String(carId)),
    [wishlistIds]
  );

  const showToast = useCallback((message, car, type = 'add') => {
    setToast({ message, car, type, id: Date.now() });
  }, []);

  const dismissToast = useCallback(() => {
    setToast(null);
  }, []);

  const addToWishlist = useCallback(
    (car) => {
      const carId = String(car.id);
      setWishlistIds((prev) => {
        if (prev.includes(carId)) return prev;
        return [carId, ...prev];
      });
      showToast(`Added "${car.title}" to your wishlist`, car, 'add');
    },
    [showToast]
  );

  const removeFromWishlist = useCallback(
    (carId, carTitle = 'Vehicle') => {
      const strId = String(carId);
      setWishlistIds((prev) => prev.filter((id) => id !== strId));
      showToast(`Removed "${carTitle}" from your wishlist`, null, 'remove');
    },
    [showToast]
  );

  const toggleWishlist = useCallback(
    (car) => {
      if (!car) return;
      const strId = String(car.id);
      if (wishlistIds.includes(strId)) {
        removeFromWishlist(strId, car.title);
      } else {
        addToWishlist(car);
      }
    },
    [wishlistIds, addToWishlist, removeFromWishlist]
  );

  const clearWishlist = useCallback(() => {
    setWishlistIds([]);
    showToast('Wishlist cleared', null, 'clear');
  }, [showToast]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistCars,
        wishlistCount: wishlistIds.length,
        isInWishlist,
        toggleWishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        toast,
        dismissToast,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
