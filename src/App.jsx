import { HashRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import CarDetailPage from './pages/CarDetailPage';
import SellPage from './pages/SellPage';
import AboutPage from './pages/AboutPage';
import WishlistPage from './pages/WishlistPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ContactPage from './pages/ContactPage';
import WishlistToast from './components/WishlistToast';
import { ListingsProvider } from './context/ListingsContext';
import { WishlistProvider } from './context/WishlistContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/car/:id" element={<CarDetailPage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <WishlistToast />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ListingsProvider>
        <WishlistProvider>
          <AppLayout />
        </WishlistProvider>
      </ListingsProvider>
    </HashRouter>
  );
}
