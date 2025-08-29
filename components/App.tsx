import { useEffect, useState } from 'react';
import { Toaster } from './ui/sonner';
import { AuthProvider } from './AuthProvider';
import { CartProvider } from './CartProvider';
import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { FeaturedProducts } from './FeaturedProducts';
import { TestimonialsSection } from './TestimonialsSection';
import { BlogPreview } from './BlogPreview';
import { NewsletterSection } from './NewsletterSection';
import { Footer } from './Footer';
import { ProductsPage } from './ProductsPage';
import { BlogPage } from './blog';
import { AdminDashboard } from './admin/AdminDashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'products' | 'blog' | 'admin'>(() => {
    // Initialize state based on current URL
    const path = window.location.pathname;
    if (path === '/admin') return 'admin';
    if (path === '/products') return 'products';
    if (path.startsWith('/blog')) return 'blog';
    return 'home';
  });

  useEffect(() => {
    // Handle URL changes and navigation
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/products') {
        setCurrentPage('products');
      } else if (path.startsWith('/blog')) {
        setCurrentPage('blog');
      } else if (path === '/admin') {
        setCurrentPage('admin');
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

  const navigateToBlog = () => {
    setCurrentPage('blog');
    window.history.pushState({}, '', '/blog');
  };

  if (currentPage === 'admin') {
    return (
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-background">
            <AdminDashboard />
            
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

            {/* About Section */}
            <AboutSection />

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