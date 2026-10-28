import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export default function WishlistToast() {
  const { toast, dismissToast } = useWishlist();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      dismissToast();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, dismissToast]);

  if (!toast) return null;

  return (
    <div
      id="wishlist-toast"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-fade-in-up"
    >
      <div className="glass rounded-2xl p-4 shadow-2xl shadow-black/50 border border-primary-500/30 flex items-center gap-3 backdrop-blur-xl bg-surface-900/90">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
          toast.type === 'add'
            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
            : 'bg-surface-800 text-surface-200 border border-white/10'
        }`}>
          {toast.type === 'add' ? (
            <Heart className="w-5 h-5 fill-current text-red-400" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-primary-400" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-400">
            {toast.type === 'add' ? 'Wishlist Updated' : 'Wishlist'}
          </p>
          <p className="text-sm text-white font-medium truncate mt-0.5">
            {toast.message}
          </p>
          {toast.type === 'add' && (
            <Link
              to="/wishlist"
              onClick={dismissToast}
              className="inline-flex items-center gap-1 text-xs text-primary-300 hover:text-white font-semibold mt-1 transition-colors"
            >
              View Wishlist
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>

        <button
          onClick={dismissToast}
          className="p-1 rounded-lg text-surface-200/50 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
