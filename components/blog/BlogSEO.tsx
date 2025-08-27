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

    // Batch DOM operations for better performance
    const metaUpdates: Array<{ name: string; content: string; property?: boolean }> = [];
    
    const queueMetaUpdate = (name: string, content: string, property?: boolean) => {
      metaUpdates.push({ name, content, property });
    };
    
    const applyMetaUpdates = () => {
      const fragment = document.createDocumentFragment();
      
      metaUpdates.forEach(({ name, content, property }) => {
        const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
        let meta = document.querySelector(selector) as HTMLMetaElement;
        
        if (!meta) {
          meta = document.createElement('meta');
          if (property) {
            meta.setAttribute('property', name);
          } else {
            meta.setAttribute('name', name);
          }
          fragment.appendChild(meta);
        }
        
        meta.setAttribute('content', content);
      });
      
      if (fragment.children.length > 0) {
        document.head.appendChild(fragment);
      }
    };

    // Queue all meta tag updates
    queueMetaUpdate('description', description);
    queueMetaUpdate('keywords', tags?.join(', ') || '');
    queueMetaUpdate('og:title', title, true);
    queueMetaUpdate('og:description', description, true);
    queueMetaUpdate('og:type', 'article', true);
    
    if (image) {
      queueMetaUpdate('og:image', image, true);
      queueMetaUpdate('twitter:image', image);
    }
    
    if (url) {
      queueMetaUpdate('og:url', url, true);
    }

    queueMetaUpdate('twitter:card', 'summary_large_image');
    queueMetaUpdate('twitter:title', title);
    queueMetaUpdate('twitter:description', description);

    if (author) {
      queueMetaUpdate('article:author', author, true);
    }
    
    if (publishedAt) {
      queueMetaUpdate('article:published_time', publishedAt, true);
    }
    
    if (category) {
      queueMetaUpdate('article:section', category, true);
    }
    
    // Apply all updates in one batch
    applyMetaUpdates();
    
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