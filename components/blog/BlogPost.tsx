import { useState } from 'react';
import { Share2, Heart, MessageCircle, Calendar, User, Tag } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface BlogPost {
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

interface BlogPostProps {
  post: BlogPost;
  onProductClick?: (productId: string) => void;
}

export function BlogPost({ post, onProductClick }: BlogPostProps) {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } else {
        // Fallback for browsers without Web Share API
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Share failed:', error);
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (clipboardError) {
        console.error('Clipboard access failed:', clipboardError);
      }
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">{post.category}</Badge>
          {post.tags.map(tag => (
            <Badge key={tag} variant="outline">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
        
        <h1 className="text-4xl font-bold mb-4 text-primary">{post.title}</h1>
        
        <div className="flex items-center gap-6 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
          <span>{post.readTime} min read</span>
        </div>
      </header>

      <div className="mb-8">
        <img 
          src={post.featuredImage} 
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      <div className="flex items-center justify-between border-t border-b py-4 mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLiked(!liked)}
            className={liked ? 'text-red-500' : ''}
          >
            <Heart className={`w-4 h-4 mr-2 ${liked ? 'fill-current' : ''}`} />
            Like
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Comments
          </Button>
        </div>

        <Button variant="ghost" size="sm" onClick={handleShare}>
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>

      {post.relatedProducts && post.relatedProducts.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Related Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {post.relatedProducts.map(productId => (
              <div 
                key={productId}
                className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onProductClick?.(productId)}
              >
                <div className="h-32 bg-gray-200 rounded mb-2"></div>
                <p className="font-medium">Product {productId}</p>
                <p className="text-sm text-muted-foreground">$29.99</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="bg-secondary/10 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
        <p className="text-muted-foreground mb-4">
          Get the latest skincare tips and exclusive offers delivered to your inbox.
        </p>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-3 py-2 border rounded-md"
          />
          <Button>Subscribe</Button>
        </div>
      </section>

      {showComments && (
        <section className="border-t pt-8">
          <h3 className="text-xl font-semibold mb-4">Comments</h3>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
                <span className="font-medium">Sarah M.</span>
                <span className="text-sm text-muted-foreground">2 days ago</span>
              </div>
              <p>Great article! I've been looking for natural skincare tips like these.</p>
            </div>
          </div>
          
          <div className="mt-6">
            <textarea
              placeholder="Add a comment..."
              className="w-full p-3 border rounded-md resize-none"
              rows={3}
            />
            <Button className="mt-2">Post Comment</Button>
          </div>
        </section>
      )}
    </article>
  );
}