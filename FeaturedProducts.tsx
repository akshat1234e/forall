import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Leaf, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FeaturedProductsProps {
  onNavigateToProducts?: () => void;
}

export function FeaturedProducts({ onNavigateToProducts }: FeaturedProductsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const products = [
    {
      id: 1,
      name: "Gentle Rose Cleansing Oil",
      description: "Luxurious cleansing oil with organic rose petals and jojoba oil",
      originalPrice: 45.00,
      salePrice: 32.99,
      rating: 4.8,
      reviews: 124,
      badge: "Best Seller",
      image: "rose cleanser skincare"
    },
    {
      id: 2,
      name: "Brightening Turmeric Face Mask",
      description: "Illuminating mask with turmeric, honey, and natural clay",
      originalPrice: 28.00,
      salePrice: 22.99,
      rating: 4.9,
      reviews: 89,
      badge: "New",
      image: "turmeric face mask"
    },
    {
      id: 3,
      name: "Hydrating Aloe Vera Gel",
      description: "Pure aloe vera gel with cucumber extract and hyaluronic acid",
      originalPrice: 24.00,
      salePrice: 18.99,
      rating: 4.7,
      reviews: 156,
      badge: "Sale",
      image: "aloe vera gel skincare"
    },
    {
      id: 4,
      name: "Lavender Night Serum",
      description: "Calming night serum with lavender oil and peptides",
      originalPrice: 55.00,
      salePrice: 42.99,
      rating: 4.9,
      reviews: 78,
      badge: "Premium",
      image: "lavender serum skincare"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, products.length]);

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
    setIsAutoPlaying(false);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    setIsAutoPlaying(false);
  };

  const handleViewAllProducts = () => {
    if (onNavigateToProducts) {
      onNavigateToProducts();
    } else {
      // Fallback
      window.location.href = '/products';
    }
  };

  return (
    <section id="products" className="py-20 bg-background relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-xl float" />
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-primary/10 rounded-full blur-xl float" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">Featured Collection</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-playfair font-semibold mb-6">
            Our Most Loved Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated collection of natural skincare products, 
            loved by thousands of customers worldwide.
          </p>
        </div>

        {/* Product Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border-2 hover:bg-background hover:scale-110 transition-all duration-300"
            onClick={prevProduct}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border-2 hover:bg-background hover:scale-110 transition-all duration-300"
            onClick={nextProduct}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Product Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-16">
            {/* Main Product */}
            <Card className="group relative overflow-hidden bg-gradient-organic border-0 shadow-xl hover:shadow-2xl transition-all duration-500 card-3d">
              <div className="absolute top-4 left-4 z-10">
                <Badge 
                  variant={products[currentIndex].badge === 'Sale' ? 'destructive' : 'secondary'}
                  className="rounded-full"
                >
                  {products[currentIndex].badge}
                </Badge>
              </div>

              <div className="aspect-square relative overflow-hidden">
                <ImageWithFallback
                  src={`https://images.unsplash.com/photo-1556228149-d75713f8a54b?w=500&h=500&fit=crop&auto=format`}
                  alt={products[currentIndex].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Floating Icons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center float">
                    <Leaf className="w-5 h-5 text-primary" />
                  </div>
                  <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center float" style={{ animationDelay: '0.5s' }}>
                    <Sparkles className="w-5 h-5 text-secondary" />
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-6 left-6 right-6">
                    <Button 
                      className="w-full rounded-full bg-white text-black hover:bg-white/90 transition-all duration-300"
                      onClick={handleViewAllProducts}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-playfair font-medium mb-2 group-hover:text-primary transition-colors duration-300">
                  {products[currentIndex].name}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {products[currentIndex].description}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(products[currentIndex].rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {products[currentIndex].rating} ({products[currentIndex].reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">
                      ${products[currentIndex].salePrice}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      ${products[currentIndex].originalPrice}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                    onClick={handleViewAllProducts}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </Card>

            {/* Product Grid */}
            <div className="grid grid-cols-2 gap-4">
              {products.slice(1, 4).map((product, index) => (
                <Card 
                  key={product.id}
                  className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 card-3d"
                  onClick={handleViewAllProducts}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <ImageWithFallback
                      src={`https://images.unsplash.com/photo-${1556228149 + index}?w=300&h=300&fit=crop&auto=format`}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    <div className="absolute top-2 left-2">
                      <Badge 
                        variant={product.badge === 'Sale' ? 'destructive' : 'secondary'}
                        className="text-xs rounded-full"
                      >
                        {product.badge}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="font-medium mb-2 text-sm line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {product.name}
                    </h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-primary font-bold text-sm">
                          ${product.salePrice}
                        </span>
                        <span className="text-xs text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              
              {/* View All Products Card */}
              <Card 
                className="group cursor-pointer overflow-hidden border-2 border-dashed border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300 flex items-center justify-center"
                onClick={handleViewAllProducts}
              >
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                  <h4 className="font-medium text-sm text-primary group-hover:text-primary">
                    View All Products
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    50+ Natural Products
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary w-8' 
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button 
            size="lg" 
            className="rounded-full px-8 py-3 hover:scale-105 transition-transform duration-300"
            onClick={handleViewAllProducts}
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}