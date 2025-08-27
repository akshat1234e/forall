import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  age: number;
  location: string;
  rating: number;
  text: string;
  image: string;
  product: string;
  beforeAfter?: {
    before: string;
    after: string;
  };
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 32,
    location: "Los Angeles, CA",
    rating: 5,
    text: "ForAll Herbals completely transformed my skin! The Radiance Renewal Serum gave me the glow I've been searching for. After just 4 weeks, my dark spots faded and my skin feels incredibly smooth and hydrated.",
    image: "https://images.unsplash.com/photo-1645388195766-45d19288e2b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwbmF0dXJhbCUyMGJlYXV0eXxlbnwxfHx8fDE3NTYwNTI5MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    product: "Radiance Renewal Serum"
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    age: 28,
    location: "Miami, FL",
    rating: 5,
    text: "I've tried countless skincare products, but nothing compares to ForAll Herbals. The natural ingredients are so gentle yet effective. My sensitive skin has never looked better, and I love that it's all organic!",
    image: "https://images.unsplash.com/photo-1710196598824-ca4ca5fefae4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBwb3J0cmFpdCUyMHNraW5jYXJlfGVufDF8fHx8MTc1NjA1MjkwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    product: "Nourishing Night Cream"
  },
  {
    id: 3,
    name: "Emily Chen",
    age: 35,
    location: "Seattle, WA",
    rating: 5,
    text: "As someone with mature skin, I was skeptical about trying another brand. But ForAll Herbals exceeded all my expectations! The Botanical Face Oil has reduced my fine lines significantly, and my skin feels 10 years younger.",
    image: "https://images.unsplash.com/photo-1738177111446-5ea95e2c4a5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhhcHB5JTIwcG9ydHJhaXQlMjBuYXR1cmFsfGVufDF8fHx8MTc1NjA1MjkxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    product: "Botanical Face Oil"
  },
  {
    id: 4,
    name: "Jessica Taylor",
    age: 26,
    location: "New York, NY",
    rating: 5,
    text: "The Gentle Eye Cream is a game-changer! My under-eye circles are barely visible now, and the puffiness is completely gone. I wake up looking refreshed every morning. Highly recommend to anyone struggling with tired-looking eyes!",
    image: "https://images.unsplash.com/photo-1645388195766-45d19288e2b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwbmF0dXJhbCUyMGJlYXV0eXxlbnwxfHx8fDE3NTYwNTI5MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    product: "Gentle Eye Cream"
  }
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 gradient-peach relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 bg-primary/10 rounded-full"
          animate={{ 
            scale: [1, 0.8, 1],
            x: [0, 20, 0],
            y: [0, -10, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-20 w-16 h-16 bg-white/15 rounded-full"
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            Real Results
          </motion.div>
          
          <motion.h2
            className="mb-6 text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            What Our Customers Say
          </motion.h2>
          
          <motion.p
            className="text-lg text-primary/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Join thousands of satisfied customers who have transformed their skin 
            with our natural skincare solutions.
          </motion.p>
        </motion.div>

        {/* Main Testimonial */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
            >
              {/* Customer Photo */}
              <motion.div
                className="flex justify-center lg:justify-start"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative">
                  {/* Decorative Elements */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-2xl" />
                  <div className="absolute -top-6 -right-6 w-12 h-12 bg-white/30 rounded-full backdrop-blur-sm flex items-center justify-center">
                    <Quote className="w-6 h-6 text-primary" />
                  </div>
                  
                  {/* Customer Image */}
                  <motion.div
                    className="relative z-10 w-80 h-80 rounded-full overflow-hidden shadow-2xl card-3d"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ImageWithFallback
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Floating Product Badge */}
                  <motion.div
                    className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-lg"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-sm font-medium text-primary geometric-font">
                      Using: {currentTestimonial.product}
                    </span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Testimonial Content */}
              <motion.div
                className="text-center lg:text-left"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {/* Rating */}
                <div className="flex items-center justify-center lg:justify-start gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 0.6 + (i * 0.1),
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      <Star className="w-6 h-6 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial Text */}
                <motion.blockquote
                  className="text-xl lg:text-2xl text-primary/90 mb-8 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  "{currentTestimonial.text}"
                </motion.blockquote>

                {/* Customer Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <h4 className="font-semibold text-lg text-primary mb-1">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-primary/70 geometric-font">
                    Age {currentTestimonial.age} • {currentTestimonial.location}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Testimonial Navigation */}
        <motion.div
          className="flex justify-center mt-12 space-x-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary w-8' 
                  : 'bg-primary/30 hover:bg-primary/50'
              }`}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>

        {/* Customer Count */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <div className="flex items-center justify-center gap-8 text-primary/80">
            <div className="text-center">
              <div className="text-2xl font-bold">5,000+</div>
              <div className="text-sm geometric-font">Happy Customers</div>
            </div>
            <div className="w-px h-8 bg-primary/30" />
            <div className="text-center">
              <div className="text-2xl font-bold">4.8★</div>
              <div className="text-sm geometric-font">Average Rating</div>
            </div>
            <div className="w-px h-8 bg-primary/30" />
            <div className="text-center">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm geometric-font">Would Recommend</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}