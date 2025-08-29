import { useState, useEffect } from 'react';
import { BlogListing } from './BlogListing';
import { BlogPost } from './BlogPost';
import { BlogSEO } from './BlogSEO';
import { blogApi } from '../../utils/supabase/backend';
import { Header } from '../Header';
import { Footer } from '../Footer';

interface BlogPostType {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  author: string;
  published_at: string;
  read_time?: number;
  tags?: string[];
  category?: string;
  featured_image?: string;
  seo_title?: string;
  meta_description?: string;
  related_products?: string[];
}

export function BlogPage() {
  const [currentView, setCurrentView] = useState<'listing' | 'post'>('listing');
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      const data = await blogApi.getAll();
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = (slug: string) => {
    setSelectedPost(slug);
    setCurrentView('post');
    window.history.pushState({}, '', `/blog/${slug}`);
  };

  const handleBackToListing = () => {
    setCurrentView('listing');
    setSelectedPost(null);
    window.history.pushState({}, '', '/blog');
  };

  const currentPost = selectedPost ? blogPosts.find(p => p.slug === selectedPost) : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading blog posts...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {currentView === 'listing' ? (
        <>
          <BlogSEO
            title="Natural Skincare Blog - Expert Tips & Guides | ForAll Herbals"
            description="Discover expert skincare tips, ingredient guides, and natural beauty advice from our team of skincare professionals."
            image="/blog/blog-hero.jpg"
            url={`${window.location.origin}/blog`}
          />
          
          <Header onNavigateToProducts={() => {}} />
          
          <main>
            <BlogListing 
              posts={blogPosts} 
              onPostClick={handlePostClick}
            />
          </main>
          
          <Footer />
        </>
      ) : currentPost ? (
        <>
          <BlogSEO
            title={currentPost.seo_title || currentPost.title}
            description={currentPost.meta_description || currentPost.excerpt}
            image={currentPost.featured_image}
            url={`${window.location.origin}/blog/${currentPost.slug}`}
            author={currentPost.author}
            publishedAt={currentPost.published_at}
            tags={currentPost.tags}
            category={currentPost.category}
          />
          
          <Header onNavigateToProducts={() => {}} />
          
          <nav className="bg-muted/50 py-4">
            <div className="max-w-4xl mx-auto px-4">
              <button
                onClick={handleBackToListing}
                className="text-primary hover:underline"
              >
                ← Back to Blog
              </button>
            </div>
          </nav>
          
          <main>
            <BlogPost 
              post={currentPost}
              onProductClick={(productId) => {
                console.log('Navigate to product:', productId);
              }}
            />
          </main>
          
          <Footer />
        </>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <button
              onClick={handleBackToListing}
              className="text-primary hover:underline"
            >
              Return to Blog
            </button>
          </div>
        </div>
      )}
    </div>
  );
}