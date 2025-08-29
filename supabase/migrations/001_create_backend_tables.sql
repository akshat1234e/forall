-- Create testimonials table
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INTEGER,
  location VARCHAR(100),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  image VARCHAR(500),
  product VARCHAR(200),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create newsletter subscriptions table
CREATE TABLE newsletter_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Create blog posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author VARCHAR(100) NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_time INTEGER,
  tags TEXT[],
  category VARCHAR(50),
  featured_image VARCHAR(500),
  seo_title VARCHAR(200),
  meta_description TEXT,
  related_products TEXT[],
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample testimonials
INSERT INTO testimonials (name, age, location, rating, text, image, product) VALUES
('Sarah Johnson', 32, 'Los Angeles, CA', 5, 'ForAll Herbals completely transformed my skin! The Radiance Renewal Serum gave me the glow I''ve been searching for. After just 4 weeks, my dark spots faded and my skin feels incredibly smooth and hydrated.', 'https://images.unsplash.com/photo-1645388195766-45d19288e2b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwbmF0dXJhbCUyMGJlYXV0eXxlbnwxfHx8fDE3NTYwNTI5MDN8MA&ixlib=rb-4.1.0&q=80&w=1080', 'Radiance Renewal Serum'),
('Maria Rodriguez', 28, 'Miami, FL', 5, 'I''ve tried countless skincare products, but nothing compares to ForAll Herbals. The natural ingredients are so gentle yet effective. My sensitive skin has never looked better, and I love that it''s all organic!', 'https://images.unsplash.com/photo-1710196598824-ca4ca5fefae4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTYwNTI5MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080', 'Nourishing Night Cream'),
('Emily Chen', 35, 'Seattle, WA', 5, 'As someone with mature skin, I was skeptical about trying another brand. But ForAll Herbals exceeded all my expectations! The Botanical Face Oil has reduced my fine lines significantly, and my skin feels 10 years younger.', 'https://images.unsplash.com/photo-1738177111446-5ea95e2c4a5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhhcHB5JTIwcG9ydHJhaXQlMjBuYXR1cmFsfGVufDF8fHx8MTc1NjA1MjkxMHww&ixlib=rb-4.1.0&q=80&w=1080', 'Botanical Face Oil'),
('Jessica Taylor', 26, 'New York, NY', 5, 'The Gentle Eye Cream is a game-changer! My under-eye circles are barely visible now, and the puffiness is completely gone. I wake up looking refreshed every morning. Highly recommend to anyone struggling with tired-looking eyes!', 'https://images.unsplash.com/photo-1645388195766-45d19288e2b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwbmF0dXJhbCUyMGJlYXV0eXxlbnwxfHx8fDE3NTYwNTI5MDN8MA&ixlib=rb-4.1.0&q=80&w=1080', 'Gentle Eye Cream');

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, author, read_time, tags, category, featured_image, seo_title, meta_description, related_products) VALUES
('The Complete Guide to Natural Skincare Ingredients', 'natural-skincare-ingredients-guide', 'Discover the power of natural ingredients and how they can transform your skincare routine for healthier, glowing skin.', '<h2>Understanding Natural Skincare</h2><p>Natural skincare has gained tremendous popularity as people become more conscious about what they put on their skin. Unlike synthetic alternatives, natural ingredients work in harmony with your skin''s natural processes.</p><h3>Key Natural Ingredients</h3><ul><li><strong>Aloe Vera:</strong> Soothes and hydrates irritated skin</li><li><strong>Jojoba Oil:</strong> Mimics skin''s natural sebum for balanced moisture</li><li><strong>Green Tea:</strong> Provides antioxidant protection against free radicals</li><li><strong>Hyaluronic Acid:</strong> Holds up to 1000x its weight in water</li></ul><h3>Building Your Natural Routine</h3><p>Start with a gentle cleanser, follow with a natural toner, apply serum, and finish with moisturizer. Always use SPF during the day.</p>', 'Dr. Sarah Chen', 8, ARRAY['ingredients', 'natural', 'skincare-routine', 'beginner'], 'Education', '/blog/natural-ingredients.jpg', 'Natural Skincare Ingredients Guide - ForAll Herbals', 'Learn about powerful natural skincare ingredients and how to build an effective routine for healthy, glowing skin.', ARRAY['aloe-vera-gel', 'jojoba-oil', 'green-tea-serum']),
('Winter Skincare: Protecting Your Skin in Cold Weather', 'winter-skincare-protection-guide', 'Learn how to adapt your skincare routine for winter months and protect your skin from harsh weather conditions.', '<h2>Why Winter Affects Your Skin</h2><p>Cold air holds less moisture than warm air, leading to dry, flaky, and irritated skin. Indoor heating further strips moisture from the air and your skin.</p><h3>Winter Skincare Essentials</h3><ol><li><strong>Switch to a cream cleanser:</strong> Avoid foaming cleansers that can strip natural oils</li><li><strong>Layer hydrating products:</strong> Use a hydrating serum under your moisturizer</li><li><strong>Don''t skip SPF:</strong> UV rays reflect off snow and can cause damage</li><li><strong>Use a humidifier:</strong> Add moisture back to indoor air</li></ol><h3>Ingredients to Look For</h3><p>Ceramides, hyaluronic acid, glycerin, and natural oils like argan and rosehip are excellent for winter skincare.</p>', 'Emma Rodriguez', 6, ARRAY['winter', 'seasonal', 'dry-skin', 'protection'], 'Seasonal Care', '/blog/winter-skincare.jpg', 'Winter Skincare Guide - Protect Your Skin | ForAll Herbals', 'Essential winter skincare tips to protect and nourish your skin during cold weather months.', ARRAY['winter-moisturizer', 'hydrating-serum', 'gentle-cleanser']);

-- Enable Row Level Security
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public can read published blog posts" ON blog_posts FOR SELECT USING (is_published = true);

-- Create policies for newsletter subscriptions
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view their own subscription" ON newsletter_subscriptions FOR SELECT USING (auth.email() = email);