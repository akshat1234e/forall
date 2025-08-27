import { useEffect, useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './components/AuthProvider';
import { CartProvider } from './components/CartProvider';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturedProducts } from './components/FeaturedProducts';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogPreview } from './components/BlogPreview';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { ProductsPage } from './components/ProductsPage';
import { BlogPage } from './components/blog';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'products' | 'blog'>('home');

  useEffect(() => {
    // Handle URL changes and navigation
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/products') {
        setCurrentPage('products');
      } else if (path.startsWith('/blog')) {
        setCurrentPage('blog');
      } else {
        setCurrentPage('home');
      }
    };

    // Set initial page based on URL
    handlePopState();

    // Listen for browser navigation
    window.addEventListener('popstate', handlePopState);

    // Smooth scroll behavior for navigation links
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Add event listeners to all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    // Cleanup event listeners
    return () => {
      window.removeEventListener('popstate', handlePopState);
      navLinks.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  const navigateToProducts = () => {
    setCurrentPage('products');
    window.history.pushState({}, '', '/products');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    window.history.pushState({}, '', '/');
  };

  const navigateToBlog = () => {
    setCurrentPage('blog');
    window.history.pushState({}, '', '/blog');
  };

  if (currentPage === 'blog') {
    return (
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-background">
            <BlogPage />
            
            <Toaster 
              position="top-right"
              toastOptions={{
                style: {
                  background: 'var(--background)',
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)',
                },
              }}
            />
          </div>
        </CartProvider>
      </AuthProvider>
    );
  }

  if (currentPage === 'products') {
    return (
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-background">
            <ProductsPage />
            
            {/* Toast Notifications */}
            <Toaster 
              position="top-right"
              toastOptions={{
                style: {
                  background: 'var(--background)',
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)',
                },
              }}
            />
          </div>
        </CartProvider>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-background">
          {/* Navigation */}
          <Header onNavigateToProducts={navigateToProducts} onNavigateToBlog={navigateToBlog} />

          {/* Main Content */}
          <main>
            {/* Hero Section */}
            <HeroSection />

            {/* Featured Products */}
            <FeaturedProducts onNavigateToProducts={navigateToProducts} />

            {/* Testimonials */}
            <TestimonialsSection />

            {/* Blog Preview */}
            <BlogPreview />

            {/* Newsletter Signup */}
            <NewsletterSection />
          </main>

          {/* Footer */}
          <Footer />

          {/* Toast Notifications */}
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: 'var(--background)',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
              },
            }}
          />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}