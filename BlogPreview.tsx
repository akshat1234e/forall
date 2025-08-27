import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Clock, User, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: number;
  author: string;
  publishDate: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Ultimate Morning Skincare Routine for Glowing Skin",
    excerpt: "Discover the perfect morning routine that will leave your skin radiant and protected all day long. Learn about the essential steps and products that make all the difference.",
    image: "https://images.unsplash.com/photo-1636813295906-ae7bdf299931?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHJvdXRpbmUlMjBtb3JuaW5nJTIwbmF0dXJhbHxlbnwxfHx8fDE3NTYwNTI5NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Routine",
    readTime: 5,
    author: "Dr. Sarah Miller",
    publishDate: "Dec 15, 2024"
  },
  {
    id: 2,
    title: "5 Powerful Herbal Ingredients That Transform Your Skin",
    excerpt: "Explore the science behind nature's most potent skincare ingredients. From turmeric to green tea, learn how these botanicals can revolutionize your beauty routine.",
    image: "https://images.unsplash.com/photo-1676803704427-496b1de33baa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjBpbmdyZWRpZW50cyUyMG5hdHVyYWwlMjBza2luY2FyZXxlbnwxfHx8fDE3NTYwNTI5NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Ingredients",
    readTime: 7,
    author: "Emily Chen",
    publishDate: "Dec 12, 2024"
  },
  {
    id: 3,
    title: "How to Apply Skincare Products in the Right Order",
    excerpt: "Maximize the effectiveness of your skincare routine by learning the proper order of application. Get the most out of every product with these expert tips.",
    image: "https://images.unsplash.com/photo-1579801874037-f28c38c7edbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGFwcGx5aW5nJTIwc2tpbmNhcmUlMjBuYXR1cmFsfGVufDF8fHx8MTc1NjA1Mjk2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Tips",
    readTime: 4,
    author: "Maria Rodriguez",
    publishDate: "Dec 10, 2024"
  }
];

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <Card className="group h-full overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-500 card-3d bg-white">
        <CardContent className="p-0">
          {/* Blog Image */}
          <div className="relative overflow-hidden aspect-video">
            <Badge className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground geometric-font">
              {post.category}
            </Badge>
            
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Hover Overlay */}
            <motion.div
              className="absolute inset-0 bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <Button
                size="sm"
                className="bg-white text-primary hover:bg-primary hover:text-white geometric-font"
              >
                Read More
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>

          {/* Blog Content */}
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex items-center justify-between text-xs text-muted-foreground geometric-font">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
              <span>{post.publishDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function BlogPreview() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="py-20 lg:py-28 bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="script-font text-xl text-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Learn & Glow
          </motion.div>
          
          <motion.h2
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Skincare Wisdom
          </motion.h2>
          
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Expert tips, ingredient insights, and skincare routines to help you 
            achieve your best skin naturally.
          </motion.p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 h-auto text-base font-medium geometric-font"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}