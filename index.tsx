import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// CORS and logging
app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use('*', logger(console.log));

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Health check
app.get('/make-server-9c9fcc04/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// User Authentication Routes
app.post('/make-server-9c9fcc04/auth/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    if (!email || !password || !name) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    // Store user profile in KV store
    await kv.set(`user_profile:${data.user.id}`, {
      id: data.user.id,
      email: data.user.email,
      name,
      created_at: new Date().toISOString(),
      preferences: {
        skin_type: null,
        concerns: [],
        newsletter_subscribed: false
      }
    });

    return c.json({ 
      message: 'User created successfully', 
      user: { id: data.user.id, email: data.user.email, name }
    });

  } catch (error) {
    console.log('Signup server error:', error);
    return c.json({ error: 'Internal server error during signup' }, 500);
  }
});

app.post('/make-server-9c9fcc04/auth/profile', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const profile = await kv.get(`user_profile:${user.id}`);
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404);
    }

    return c.json({ profile });

  } catch (error) {
    console.log('Profile fetch error:', error);
    return c.json({ error: 'Internal server error during profile fetch' }, 500);
  }
});

app.put('/make-server-9c9fcc04/auth/profile', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { name, preferences } = await c.req.json();
    
    const currentProfile = await kv.get(`user_profile:${user.id}`);
    if (!currentProfile) {
      return c.json({ error: 'Profile not found' }, 404);
    }

    const updatedProfile = {
      ...currentProfile,
      name: name || currentProfile.name,
      preferences: { ...currentProfile.preferences, ...preferences },
      updated_at: new Date().toISOString()
    };

    await kv.set(`user_profile:${user.id}`, updatedProfile);

    return c.json({ message: 'Profile updated successfully', profile: updatedProfile });

  } catch (error) {
    console.log('Profile update error:', error);
    return c.json({ error: 'Internal server error during profile update' }, 500);
  }
});

// Products Routes
app.get('/make-server-9c9fcc04/products', async (c) => {
  try {
    const category = c.req.query('category');
    const search = c.req.query('search');
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '12');

    let products = await kv.getByPrefix('product:');
    
    // Filter by category
    if (category && category !== 'all') {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    // Search functionality
    if (search) {
      const searchLower = search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.benefits.some((benefit: string) => benefit.toLowerCase().includes(searchLower))
      );
    }

    // Sort by featured, then by created date
    products.sort((a, b) => {
      if (a.featured !== b.featured) {
        return b.featured ? 1 : -1;
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    // Pagination
    const startIndex = (page - 1) * limit;
    const paginatedProducts = products.slice(startIndex, startIndex + limit);

    return c.json({
      products: paginatedProducts,
      total: products.length,
      page,
      totalPages: Math.ceil(products.length / limit)
    });

  } catch (error) {
    console.log('Products fetch error:', error);
    return c.json({ error: 'Internal server error during products fetch' }, 500);
  }
});

app.get('/make-server-9c9fcc04/products/:id', async (c) => {
  try {
    const productId = c.req.param('id');
    const product = await kv.get(`product:${productId}`);

    if (!product) {
      return c.json({ error: 'Product not found' }, 404);
    }

    // Get related products (same category, exclude current product)
    const allProducts = await kv.getByPrefix('product:');
    const relatedProducts = allProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);

    return c.json({ 
      product,
      relatedProducts
    });

  } catch (error) {
    console.log('Product fetch error:', error);
    return c.json({ error: 'Internal server error during product fetch' }, 500);
  }
});

// Shopping Cart Routes
app.get('/make-server-9c9fcc04/cart', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const cart = await kv.get(`cart:${user.id}`) || { items: [], total: 0 };
    return c.json({ cart });

  } catch (error) {
    console.log('Cart fetch error:', error);
    return c.json({ error: 'Internal server error during cart fetch' }, 500);
  }
});

app.post('/make-server-9c9fcc04/cart/add', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { productId, quantity = 1 } = await c.req.json();

    if (!productId) {
      return c.json({ error: 'Product ID is required' }, 400);
    }

    // Get product details
    const product = await kv.get(`product:${productId}`);
    if (!product) {
      return c.json({ error: 'Product not found' }, 404);
    }

    // Get current cart
    const cart = await kv.get(`cart:${user.id}`) || { items: [], total: 0 };

    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex((item: any) => item.productId === productId);

    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity
      });
    }

    // Recalculate total
    cart.total = cart.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    cart.updated_at = new Date().toISOString();

    await kv.set(`cart:${user.id}`, cart);

    return c.json({ message: 'Product added to cart', cart });

  } catch (error) {
    console.log('Add to cart error:', error);
    return c.json({ error: 'Internal server error while adding to cart' }, 500);
  }
});

// Newsletter Routes
app.post('/make-server-9c9fcc04/newsletter/subscribe', async (c) => {
  try {
    const { email } = await c.req.json();

    if (!email) {
      return c.json({ error: 'Email is required' }, 400);
    }

    // Check if already subscribed
    const existing = await kv.get(`newsletter:${email}`);
    if (existing) {
      return c.json({ message: 'Email already subscribed' });
    }

    // Add to newsletter list
    await kv.set(`newsletter:${email}`, {
      email,
      subscribed_at: new Date().toISOString(),
      status: 'active',
      discount_code: `GLOW15-${Math.random().toString(36).substr(2, 8).toUpperCase()}`
    });

    // Update subscriber count
    const stats = await kv.get('newsletter_stats') || { total_subscribers: 0 };
    stats.total_subscribers += 1;
    await kv.set('newsletter_stats', stats);

    return c.json({ 
      message: 'Successfully subscribed to newsletter',
      discount_code: `GLOW15-${Math.random().toString(36).substr(2, 8).toUpperCase()}`
    });

  } catch (error) {
    console.log('Newsletter subscription error:', error);
    return c.json({ error: 'Internal server error during newsletter subscription' }, 500);
  }
});

// Initialize sample data on first run
app.post('/make-server-9c9fcc04/init-data', async (c) => {
  try {
    // Check if data already exists
    const existingProducts = await kv.getByPrefix('product:');
    if (existingProducts.length > 0) {
      return c.json({ message: 'Data already initialized' });
    }

    // Sample products data
    const sampleProducts = [
      {
        id: 'radiance-serum',
        name: 'Radiance Renewal Serum',
        description: 'Vitamin C infused serum for glowing skin with natural botanicals and antioxidants.',
        price: 89,
        originalPrice: 119,
        category: 'serums',
        images: [
          'https://images.unsplash.com/photo-1666025062728-c33a25e8ee3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwc2tpbmNhcmUlMjBzZXJ1bSUyMGJvdHRsZSUyMGVsZWdhbnQlMjBtaW5pbWFsfGVufDF8fHx8MTc1NjA1MjgxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
        ],
        benefits: ['Anti-aging', 'Brightening', 'Hydrating', 'Antioxidant Protection'],
        ingredients: ['Vitamin C', 'Hyaluronic Acid', 'Rose Hip Oil', 'Green Tea Extract'],
        usage: 'Apply 2-3 drops to clean skin morning and evening. Follow with moisturizer.',
        rating: 4.9,
        reviews: 1247,
        inStock: true,
        featured: true,
        created_at: new Date().toISOString()
      },
      {
        id: 'night-cream',
        name: 'Nourishing Night Cream',
        description: 'Deep moisturizing cream with natural oils for overnight skin repair and hydration.',
        price: 65,
        category: 'moisturizers',
        images: [
          'https://images.unsplash.com/photo-1594813591867-02e797aa4581?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMG1vaXN0dXJpemVyJTIwamFyJTIwZWxlZ2FudHxlbnwxfHx8fDE3NTYwNTI4NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
        ],
        benefits: ['Nourishing', 'Repair', 'Anti-aging', 'Deep Moisturizing'],
        ingredients: ['Shea Butter', 'Jojoba Oil', 'Peptides', 'Chamomile Extract'],
        usage: 'Apply generously to face and neck before bedtime after cleansing.',
        rating: 4.8,
        reviews: 892,
        inStock: true,
        featured: true,
        created_at: new Date().toISOString()
      },
      {
        id: 'botanical-oil',
        name: 'Botanical Face Oil',
        description: 'Lightweight oil blend for all skin types with organic botanicals and essential nutrients.',
        price: 75,
        category: 'oils',
        images: [
          'https://images.unsplash.com/photo-1743309026555-97f545a08490?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwb2lsJTIwYm90dGxlJTIwc2tpbmNhcmV8ZW58MXx8fHwxNzU2MDUyODU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
        ],
        benefits: ['Hydrating', 'Balancing', 'Natural', 'Lightweight'],
        ingredients: ['Rosehip Seed Oil', 'Argan Oil', 'Vitamin E', 'Lavender Oil'],
        usage: 'Use 3-4 drops on damp skin. Can be used morning or evening.',
        rating: 4.7,
        reviews: 634,
        inStock: true,
        featured: true,
        created_at: new Date().toISOString()
      },
      {
        id: 'eye-cream',
        name: 'Gentle Eye Cream',
        description: 'Delicate formula specifically designed for the sensitive eye area with natural ingredients.',
        price: 45,
        category: 'eye-care',
        images: [
          'https://images.unsplash.com/photo-1664530964949-713a3cccad31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleWUlMjBjcmVhbSUyMHNraW5jYXJlJTIwdHViZXxlbnwxfHx8fDE3NTYwNTI4NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
        ],
        benefits: ['Anti-puffiness', 'Firming', 'Gentle', 'Dark Circle Reducing'],
        ingredients: ['Caffeine', 'Cucumber Extract', 'Aloe Vera', 'Vitamin K'],
        usage: 'Gently pat a small amount around the eye area morning and evening.',
        rating: 4.6,
        reviews: 456,
        inStock: true,
        featured: true,
        created_at: new Date().toISOString()
      }
    ];

    // Save products to KV store
    for (const product of sampleProducts) {
      await kv.set(`product:${product.id}`, product);
    }

    return c.json({ 
      message: 'Sample data initialized successfully',
      products_created: sampleProducts.length
    });

  } catch (error) {
    console.log('Data initialization error:', error);
    return c.json({ error: 'Internal server error during data initialization' }, 500);
  }
});

// Start the server
Deno.serve(app.fetch);