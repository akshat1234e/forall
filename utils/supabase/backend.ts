import { supabase } from './client';

// Testimonials API
export const testimonialsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('id, name, age, location, rating, text, image, product, created_at')
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(`Failed to fetch testimonials: ${error.message}`);
    return data || [];
  },

  create: async (testimonial: {
    name: string;
    age?: number;
    location?: string;
    rating: number;
    text: string;
    image?: string;
    product?: string;
  }) => {
    const { data, error } = await supabase
      .from('testimonials')
      .insert([testimonial])
      .select();
    
    if (error) throw new Error(`Failed to create testimonial: ${error.message}`);
    return data?.[0] || null;
  }
};

// Newsletter API
export const newsletterApi = {
  subscribe: async (email: string) => {
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .insert([{ email }])
      .select();
    
    if (error) throw new Error(`Failed to subscribe to newsletter: ${error.message}`);
    return data?.[0] || null;
  },

  getSubscriptions: async () => {
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .select('id, email, subscribed_at, is_active')
      .eq('is_active', true)
      .order('subscribed_at', { ascending: false });
    
    if (error) throw new Error(`Failed to fetch newsletter subscriptions: ${error.message}`);
    return data || [];
  }
};

// Blog API
export const blogApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, content, author, published_at, read_time, tags, category, featured_image, seo_title, meta_description, related_products, is_published, created_at')
      .eq('is_published', true)
      .order('published_at', { ascending: false });
    
    if (error) throw new Error(`Failed to fetch blog posts: ${error.message}`);
    return data || [];
  },

  getBySlug: async (slug: string) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, content, author, published_at, read_time, tags, category, featured_image, seo_title, meta_description, related_products')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();
    
    if (error) throw new Error(`Failed to fetch blog post '${slug}': ${error.message}`);
    return data;
  },

  create: async (post: {
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    author: string;
    read_time?: number;
    tags?: string[];
    category?: string;
    featured_image?: string;
    seo_title?: string;
    meta_description?: string;
    related_products?: string[];
  }) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([post])
      .select();
    
    if (error) throw new Error(`Failed to create blog post: ${error.message}`);
    return data?.[0] || null;
  }
};