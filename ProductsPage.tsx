import { useState, useEffect } from 'react';
import { ArrowLeft, Leaf, Sparkles, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ProductDetailView } from './ProductDetailView';
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

const products: Product[] = [
  {
    id: '1',
    name: 'Gentle Rose Cleansing Oil',
    category: 'Cleansers',
    description: 'A luxurious cleansing oil infused with organic rose petals and jojoba oil to gently remove makeup while nourishing your skin.',
    image: '',
    ingredients: ['Organic Rose Petals', 'Jojoba Oil', 'Sweet Almond Oil', 'Vitamin E', 'Chamomile Extract'],
    benefits: ['Deep cleansing', 'Hydrating', 'Anti-aging', 'Soothing'],
    howToUse: 'Apply 2-3 pumps to dry skin, massage gently, then rinse with warm water.',
    skinType: ['All skin types', 'Sensitive skin', 'Dry skin']
  },
  {
    id: '2',
    name: 'Brightening Turmeric Face Mask',
    category: 'Masks',
    description: 'An illuminating face mask with turmeric, honey, and clay to brighten and purify your complexion naturally.',
    image: '',
    ingredients: ['Organic Turmeric', 'Raw Honey', 'Bentonite Clay', 'Oatmeal', 'Lemon Essential Oil'],
    benefits: ['Brightening', 'Purifying', 'Anti-inflammatory', 'Gentle exfoliation'],
    howToUse: 'Apply an even layer to clean skin, leave for 15-20 minutes, then rinse with lukewarm water.',
    skinType: ['Normal skin', 'Oily skin', 'Combination skin']
  },
  {
    id: '3',
    name: 'Hydrating Aloe Vera Gel',
    category: 'Moisturizers',
    description: 'Pure aloe vera gel enriched with cucumber extract and hyaluronic acid for instant hydration and cooling relief.',
    image: '',
    ingredients: ['Organic Aloe Vera', 'Cucumber Extract', 'Hyaluronic Acid', 'Green Tea Extract', 'Vitamin B5'],
    benefits: ['Intense hydration', 'Cooling effect', 'Healing', 'Anti-inflammatory'],
    howToUse: 'Apply liberally to clean skin morning and evening. Perfect for after-sun care.',
    skinType: ['All skin types', 'Sensitive skin', 'Sun-damaged skin']
  },
  {
    id: '4',
    name: 'Lavender Night Serum',
    category: 'Serums',
    description: 'A calming night serum with lavender oil, peptides, and botanical extracts to repair and rejuvenate while you sleep.',
    image: '',
    ingredients: ['Lavender Essential Oil', 'Peptide Complex', 'Rosehip Oil', 'Bakuchiol', 'Vitamin C'],
    benefits: ['Anti-aging', 'Calming', 'Skin repair', 'Improved texture'],
    howToUse: 'Apply 3-4 drops to clean skin before bedtime. Gently pat until absorbed.',
    skinType: ['Mature skin', 'All skin types', 'Stressed skin']
  },
  {
    id: '5',
    name: 'Exfoliating Coffee Scrub',
    category: 'Exfoliators',
    description: 'An energizing body scrub with organic coffee grounds, coconut oil, and brown sugar for smooth, radiant skin.',
    image: '',
    ingredients: ['Organic Coffee Grounds', 'Coconut Oil', 'Brown Sugar', 'Vanilla Extract', 'Shea Butter'],
    benefits: ['Exfoliation', 'Cellulite reduction', 'Increased circulation', 'Moisturizing'],
    howToUse: 'Massage onto wet skin in circular motions, focusing on rough areas. Rinse thoroughly.',
    skinType: ['All skin types', 'Body use only']
  },
  {
    id: '6',
    name: 'Vitamin C Brightening Toner',
    category: 'Toners',
    description: 'A refreshing toner with vitamin C, witch hazel, and botanical extracts to balance and brighten your complexion.',
    image: '',
    ingredients: ['Vitamin C', 'Witch Hazel', 'Rose Water', 'Niacinamide', 'Botanical Extracts'],
    benefits: ['Brightening', 'Pore minimizing', 'pH balancing', 'Antioxidant protection'],
    howToUse: 'Apply to cotton pad or spray directly onto clean skin. Follow with serum or moisturizer.',
    skinType: ['Normal skin', 'Oily skin', 'Dull skin']
  }
];

export function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productImages, setProductImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Load product images
    const loadImages = async () => {
      const imageQueries = [
        'rose cleansing oil skincare',
        'turmeric face mask',
        'aloe vera gel skincare',
        'lavender serum bottle',
        'coffee scrub skincare',
        'vitamin c toner'
      ];

      const images: { [key: string]: string } = {};
      
      // For demo purposes, use placeholder images that would work
      imageQueries.forEach((query, index) => {
        images[products[index].id] = `https://images.unsplash.com/photo-${1556228149 + index * 100000}?w=400&h=300&fit=crop&auto=format`;
      });

      setProductImages(images);
    };

    loadImages();
  }, []);

  if (selectedProduct) {
    return (
      <ProductDetailView 
        product={selectedProduct} 
        onBack={() => setSelectedProduct(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-playfair font-semibold">Our Products</h1>
              <p className="text-muted-foreground mt-1">Natural skincare for radiant, healthy skin</p>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['All', 'Cleansers', 'Masks', 'Moisturizers', 'Serums', 'Exfoliators', 'Toners'].map((category) => (
            <Button
              key={category}
              variant={category === 'All' ? 'default' : 'outline'}
              className="rounded-full px-6 py-2 transition-all duration-300 hover:scale-105"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card 
              key={product.id}
              className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 card-3d"
              onClick={() => setSelectedProduct(product)}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="relative overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-organic">
                  <ImageWithFallback
                    src={productImages[product.id] || `https://images.unsplash.com/photo-1556228149-d75713f8a54b?w=400&h=300&fit=crop&auto=format`}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Floating Icons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center float">
                    <Leaf className="w-4 h-4 text-primary" />
                  </div>
                  <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center float" style={{ animationDelay: '0.5s' }}>
                    <Sparkles className="w-4 h-4 text-secondary" />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm line-clamp-2">{product.description}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-playfair font-medium mb-2 group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.skinType.slice(0, 2).map((type) => (
                    <span 
                      key={type}
                      className="inline-block bg-accent/20 text-accent-foreground px-2 py-1 rounded text-xs"
                    >
                      {type}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Heart className="w-4 h-4" />
                    <span>{product.benefits.length} Benefits</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-primary hover:bg-primary/10 transition-colors duration-300"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="rounded-full px-8 py-3 transition-all duration-300 hover:scale-105"
          >
            Load More Products
          </Button>
        </div>
      </div>
    </div>
  );
}