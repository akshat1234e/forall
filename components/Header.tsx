import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, User, Search, Leaf } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useAuth } from './AuthProvider';
import { useCart } from './CartProvider';

interface HeaderProps {
  onNavigateToProducts?: () => void;
  onNavigateToBlog?: () => void;
}

export function Header({ onNavigateToProducts, onNavigateToBlog }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const { itemCount = 0 } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProductsClick = () => {
    if (onNavigateToProducts) {
      onNavigateToProducts();
    } else {
      window.history.pushState({}, '', '/products');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    setIsMenuOpen(false);
  };

  const handleBlogClick = () => {
    if (onNavigateToBlog) {
      onNavigateToBlog();
    } else {
      window.history.pushState({}, '', '/blog');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/90 backdrop-blur-lg border-b border-border shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-peach rounded-full flex items-center justify-center float">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-xl lg:text-2xl font-playfair font-semibold">
              ForAll Herbals
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a 
              href="#home" 
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Home
            </a>
            <button 
              onClick={handleProductsClick}
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Products
            </button>
            <a 
              href="#about" 
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              About
            </a>
            <button 
              onClick={handleBlogClick}
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Blog
            </button>
            <a 
              href="#contact" 
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Contact
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="rounded-full">
              <Search className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="sm" className="rounded-full relative">
              <ShoppingBag className="w-4 h-4" />
              {itemCount > 0 && (
                <Badge 
                  variant="secondary" 
                  className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>

            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Welcome, {user.user_metadata?.name || user.email}
                </span>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" className="rounded-full">
                <User className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border shadow-lg">
            <nav className="container mx-auto px-4 py-6 space-y-4">
              <a 
                href="#home" 
                className="block text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <button 
                onClick={handleProductsClick}
                className="block w-full text-left text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
              >
                Products
              </button>
              <a 
                href="#about" 
                className="block text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <button 
                onClick={handleBlogClick}
                className="block w-full text-left text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
              >
                Blog
              </button>
              <a 
                href="#contact" 
                className="block text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm" className="rounded-full">
                    <Search className="w-4 h-4" />
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="rounded-full relative">
                    <ShoppingBag className="w-4 h-4" />
                    {itemCount > 0 && (
                      <Badge 
                        variant="secondary" 
                        className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs"
                      >
                        {itemCount}
                      </Badge>
                    )}
                  </Button>
                </div>

                {user ? (
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">
                      {user.user_metadata?.name || user.email}
                    </p>
                    <Button variant="ghost" size="sm" onClick={signOut}>
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button variant="ghost" size="sm" className="rounded-full">
                    <User className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}