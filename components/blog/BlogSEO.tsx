import { useEffect } from 'react';

interface BlogSEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  author?: string;
  publishedAt?: string;
  tags?: string[];
  category?: string;
}

export function BlogSEO({
  title,
  description,
  image,
  url,
  author,
  publishedAt,
  tags,
  category
}: BlogSEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Create or update meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic SEO tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', tags?.join(', ') || '');
    
    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', 'article', true);
    
    if (image) {
      updateMetaTag('og:image', image, true);
    }
    
    if (url) {
      updateMetaTag('og:url', url, true);
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    
    if (image) {
      updateMetaTag('twitter:image', image);
    }

    // Article specific tags
    if (author) {
      updateMetaTag('article:author', author, true);
    }
    
    if (publishedAt) {
      updateMetaTag('article:published_time', publishedAt, true);
    }
    
    if (category) {
      updateMetaTag('article:section', category, true);
    }
    
    if (tags) {
      tags.forEach(tag => {
        const tagMeta = document.createElement('meta');
        tagMeta.setAttribute('property', 'article:tag');
        tagMeta.setAttribute('content', tag);
        document.head.appendChild(tagMeta);
      });
    }

    // JSON-LD structured data
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description: description,
      image: image,
      author: {
        '@type': 'Person',
        name: author
      },
      publisher: {
        '@type': 'Organization',
        name: 'ForAll Herbals',
        logo: {
          '@type': 'ImageObject',
          url: '/logo.png'
        }
      },
      datePublished: publishedAt,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url
      }
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    
    scriptTag.textContent = JSON.stringify(structuredData);

    // Cleanup function
    return () => {
      // Remove article-specific tags on unmount
      const articleTags = document.querySelectorAll('meta[property^="article:"]');
      articleTags.forEach(tag => tag.remove());
    };
  }, [title, description, image, url, author, publishedAt, tags, category]);

  return null;
}