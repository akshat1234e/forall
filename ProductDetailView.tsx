import { useEffect, useState } from 'react';
import { ArrowLeft, Leaf, Sparkles, Heart, Shield, Zap, Droplets } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  ingredients: string[];
  benefits: string[];
  howToUse: string;
  skinType: string[];
}

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
}

export function ProductDetailView({ product, onBack }: ProductDetailViewProps) {
  const [scrollY, setScrollY] = useState(0);
  const [productImage, setProductImage] = useState<string>('');
  const [heroImage, setHeroImage] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Set product-specific images based on the product
    const getProductImages = () => {
      const imageMap: { [key: string]: { product: string; hero: string } } = {
        '1': {
          product: 'https://images.unsplash.com/photo-1556228149-d75713f8a54b?w=500&h=500&fit=crop&auto=format',
          hero: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&h=800&fit=crop&auto=format'
        },
        '2': {
          product: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop&auto=format',
          hero: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1200&h=800&fit=crop&auto=format'
        },
        '3': {
          product: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=500&h=500&fit=crop&auto=format',
          hero: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1200&h=800&fit=crop&auto=format'
        },
        '4': {
          product: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&h=500&fit=crop&auto=format',
          hero: 'https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?w=1200&h=800&fit=crop&auto=format'
        },
        '5': {
          product: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop&auto=format',
          hero: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop&auto=format'
        },
        '6': {
          product: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop&auto=format',
          hero: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&h=800&fit=crop&auto=format'
        }
      };

      const images = imageMap[product.id] || imageMap['1'];
      setProductImage(images.product);
      setHeroImage(images.hero);
    };

    getProductImages();
  }, [product.id]);

  const parallaxOffset = scrollY * 0.5;
  const imageScale = 1 + scrollY * 0.0005;

  const benefitIcons = {
    'Deep cleansing': Shield,
    'Hydrating': Droplets,
    'Anti-aging': Sparkles,
    'Soothing': Heart,
    'Brightening': Zap,
    'Purifying': Leaf,
    'Anti-inflammatory': Shield,
    'Gentle exfoliation': Sparkles,
    'Intense hydration': Droplets,
    'Cooling effect': Droplets,
    'Healing': Heart,
    'Calming': Heart,
    'Skin repair': Shield,
    'Improved texture': Sparkles,
    'Exfoliation': Sparkles,
    'Cellulite reduction': Zap,
    'Increased circulation': Zap,
    'Moisturizing': Droplets,
    'Pore minimizing': Shield,
    'pH balancing': Shield,
    'Antioxidant protection': Leaf
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="flex items-center gap-2 hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Button>
            <Badge variant="secondary" className="rounded-full">
              {product.category}
            </Badge>
          </div>
        </div>
      </div>

      {/* Hero Section with Parallax */}
      <div className="relative h-screen overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 scale-110"
          style={{
            transform: `translateY(${parallaxOffset}px) scale(${imageScale})`,
          }}
        >
          <div className="w-full h-full bg-gradient-organic" />
          <ImageWithFallback
            src={heroImage}
            alt={`${product.name} background`}
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />

        {/* Floating Product Image */}
        <div 
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            transform: `translate(-50%, calc(-50% + ${parallaxOffset * 0.3}px))`,
          }}
        >
          <div className="relative">
            <div className="w-80 h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-2xl card-3d float">
              <ImageWithFallback
                src={productImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Icons */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center float shadow-lg">
              <Leaf className="w-6 h-6" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center float shadow-lg" style={{ animationDelay: '1s' }}>
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Product Title */}
        <div className="absolute bottom-20 left-0 right-0 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-playfair font-semibold text-foreground mb-4 fade-in-up">
            {product.name}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 fade-in-up" style={{ animationDelay: '0.2s' }}>
            {product.description}
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="relative z-20 bg-background">
        {/* Skin Types */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-playfair font-medium text-center mb-8">Perfect For</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {product.skinType.map((type, index) => (
                <Badge 
                  key={type} 
                  variant="outline" 
                  className="text-lg px-6 py-3 rounded-full fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Ingredients Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-playfair font-medium text-center mb-12">Natural Ingredients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.ingredients.map((ingredient, index) => (
                <Card 
                  key={ingredient}
                  className="p-6 text-center hover:shadow-lg transition-all duration-300 card-3d fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-gradient-peach rounded-full flex items-center justify-center mx-auto mb-4 float">
                    <Leaf className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">{ingredient}</h3>
                  <p className="text-sm text-muted-foreground">
                    Carefully sourced and sustainably harvested for maximum potency
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Benefits Section */}
        <section className="py-16 bg-accent/10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-playfair font-medium text-center mb-12">Key Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.benefits.map((benefit, index) => {
                const IconComponent = benefitIcons[benefit as keyof typeof benefitIcons] || Heart;
                return (
                  <div 
                    key={benefit}
                    className="flex items-center gap-4 p-6 bg-card rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center float">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{benefit}</h3>
                      <p className="text-muted-foreground text-sm">
                        Scientifically proven benefits for healthier skin
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* How to Use Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-playfair font-medium text-center mb-8">How to Use</h2>
            <Card className="p-8 text-center bg-gradient-organic fade-in-up">
              <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 pulse-3d">
                <Droplets className="w-10 h-10" />
              </div>
              <p className="text-lg leading-relaxed">{product.howToUse}</p>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-playfair font-medium mb-4">Experience Natural Beauty</h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of satisfied customers who have transformed their skin with our natural products
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="rounded-full px-8 py-3 hover:scale-105 transition-transform duration-300"
                onClick={onBack}
              >
                Explore More Products
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="rounded-full px-8 py-3 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary hover:scale-105 transition-all duration-300"
              >
                Learn About Our Story
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}