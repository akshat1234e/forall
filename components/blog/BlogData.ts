export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  category: string;
  featuredImage: string;
  seoTitle?: string;
  metaDescription?: string;
  relatedProducts?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Complete Guide to Natural Skincare Ingredients',
    slug: 'natural-skincare-ingredients-guide',
    excerpt: 'Discover the power of natural ingredients and how they can transform your skincare routine for healthier, glowing skin.',
    content: `
      <h2>Understanding Natural Skincare</h2>
      <p>Natural skincare has gained tremendous popularity as people become more conscious about what they put on their skin. Unlike synthetic alternatives, natural ingredients work in harmony with your skin's natural processes.</p>
      
      <h3>Key Natural Ingredients</h3>
      <ul>
        <li><strong>Aloe Vera:</strong> Soothes and hydrates irritated skin</li>
        <li><strong>Jojoba Oil:</strong> Mimics skin's natural sebum for balanced moisture</li>
        <li><strong>Green Tea:</strong> Provides antioxidant protection against free radicals</li>
        <li><strong>Hyaluronic Acid:</strong> Holds up to 1000x its weight in water</li>
      </ul>
      
      <h3>Building Your Natural Routine</h3>
      <p>Start with a gentle cleanser, follow with a natural toner, apply serum, and finish with moisturizer. Always use SPF during the day.</p>
    `,
    author: 'Dr. Sarah Chen',
    publishedAt: '2024-01-15',
    readTime: 8,
    tags: ['ingredients', 'natural', 'skincare-routine', 'beginner'],
    category: 'Education',
    featuredImage: '/blog/natural-ingredients.jpg',
    seoTitle: 'Natural Skincare Ingredients Guide - ForAll Herbals',
    metaDescription: 'Learn about powerful natural skincare ingredients and how to build an effective routine for healthy, glowing skin.',
    relatedProducts: ['aloe-vera-gel', 'jojoba-oil', 'green-tea-serum']
  },
  {
    id: '2',
    title: 'Winter Skincare: Protecting Your Skin in Cold Weather',
    slug: 'winter-skincare-protection-guide',
    excerpt: 'Learn how to adapt your skincare routine for winter months and protect your skin from harsh weather conditions.',
    content: `
      <h2>Why Winter Affects Your Skin</h2>
      <p>Cold air holds less moisture than warm air, leading to dry, flaky, and irritated skin. Indoor heating further strips moisture from the air and your skin.</p>
      
      <h3>Winter Skincare Essentials</h3>
      <ol>
        <li><strong>Switch to a cream cleanser:</strong> Avoid foaming cleansers that can strip natural oils</li>
        <li><strong>Layer hydrating products:</strong> Use a hydrating serum under your moisturizer</li>
        <li><strong>Don't skip SPF:</strong> UV rays reflect off snow and can cause damage</li>
        <li><strong>Use a humidifier:</strong> Add moisture back to indoor air</li>
      </ol>
      
      <h3>Ingredients to Look For</h3>
      <p>Ceramides, hyaluronic acid, glycerin, and natural oils like argan and rosehip are excellent for winter skincare.</p>
    `,
    author: 'Emma Rodriguez',
    publishedAt: '2024-01-10',
    readTime: 6,
    tags: ['winter', 'seasonal', 'dry-skin', 'protection'],
    category: 'Seasonal Care',
    featuredImage: '/blog/winter-skincare.jpg',
    seoTitle: 'Winter Skincare Guide - Protect Your Skin | ForAll Herbals',
    metaDescription: 'Essential winter skincare tips to protect and nourish your skin during cold weather months.',
    relatedProducts: ['winter-moisturizer', 'hydrating-serum', 'gentle-cleanser']
  },
  {
    id: '3',
    title: 'Acne-Prone Skin: Natural Solutions That Actually Work',
    slug: 'natural-acne-solutions-guide',
    excerpt: 'Effective natural treatments for acne-prone skin without harsh chemicals or over-drying ingredients.',
    content: `
      <h2>Understanding Acne-Prone Skin</h2>
      <p>Acne occurs when pores become clogged with oil, dead skin cells, and bacteria. Natural solutions can be just as effective as harsh chemicals without the side effects.</p>
      
      <h3>Natural Acne-Fighting Ingredients</h3>
      <ul>
        <li><strong>Tea Tree Oil:</strong> Natural antibacterial properties</li>
        <li><strong>Salicylic Acid (from Willow Bark):</strong> Gentle exfoliation</li>
        <li><strong>Niacinamide:</strong> Reduces inflammation and oil production</li>
        <li><strong>Clay Masks:</strong> Draw out impurities without over-drying</li>
      </ul>
      
      <h3>The Gentle Approach</h3>
      <p>Avoid over-cleansing and harsh scrubs. Instead, focus on gentle, consistent care that supports your skin's natural healing process.</p>
    `,
    author: 'Dr. Michael Park',
    publishedAt: '2024-01-05',
    readTime: 7,
    tags: ['acne', 'natural-treatment', 'oily-skin', 'tea-tree'],
    category: 'Skin Concerns',
    featuredImage: '/blog/acne-solutions.jpg',
    seoTitle: 'Natural Acne Solutions - Gentle & Effective | ForAll Herbals',
    metaDescription: 'Discover natural, gentle solutions for acne-prone skin that work without harsh chemicals or over-drying.',
    relatedProducts: ['tea-tree-serum', 'clay-mask', 'gentle-exfoliant']
  },
  {
    id: '4',
    title: 'The Science Behind Anti-Aging: What Really Works',
    slug: 'anti-aging-science-guide',
    excerpt: 'Separate fact from fiction in anti-aging skincare with evidence-based ingredients and realistic expectations.',
    content: `
      <h2>The Reality of Aging Skin</h2>
      <p>Skin aging is a natural process influenced by genetics, sun exposure, lifestyle, and environmental factors. While we can't stop aging, we can slow its visible effects.</p>
      
      <h3>Proven Anti-Aging Ingredients</h3>
      <ul>
        <li><strong>Retinoids:</strong> Stimulate cell turnover and collagen production</li>
        <li><strong>Vitamin C:</strong> Antioxidant protection and collagen synthesis</li>
        <li><strong>Peptides:</strong> Signal skin to produce more collagen</li>
        <li><strong>Sunscreen:</strong> The most important anti-aging product</li>
      </ul>
      
      <h3>Building an Anti-Aging Routine</h3>
      <p>Start slowly, be consistent, and have realistic expectations. Results take time, but proper care can significantly improve skin health and appearance.</p>
    `,
    author: 'Dr. Lisa Thompson',
    publishedAt: '2024-01-01',
    readTime: 9,
    tags: ['anti-aging', 'retinoids', 'vitamin-c', 'science'],
    category: 'Anti-Aging',
    featuredImage: '/blog/anti-aging-science.jpg',
    seoTitle: 'Anti-Aging Skincare Science - What Really Works | ForAll Herbals',
    metaDescription: 'Evidence-based guide to anti-aging skincare ingredients and routines that actually deliver results.',
    relatedProducts: ['vitamin-c-serum', 'retinol-cream', 'peptide-moisturizer']
  }
];

export const blogCategories = [
  { id: 'education', name: 'Education', description: 'Learn about skincare fundamentals' },
  { id: 'seasonal-care', name: 'Seasonal Care', description: 'Adapt your routine to the seasons' },
  { id: 'skin-concerns', name: 'Skin Concerns', description: 'Target specific skin issues' },
  { id: 'anti-aging', name: 'Anti-Aging', description: 'Age gracefully with proven methods' },
  { id: 'ingredients', name: 'Ingredients', description: 'Deep dive into skincare ingredients' },
  { id: 'routines', name: 'Routines', description: 'Build effective skincare routines' }
];

export const popularTags = [
  'natural', 'organic', 'sensitive-skin', 'dry-skin', 'oily-skin', 'acne', 
  'anti-aging', 'vitamin-c', 'retinoids', 'sunscreen', 'moisturizer', 
  'cleanser', 'serum', 'ingredients', 'routine', 'beginner'
];