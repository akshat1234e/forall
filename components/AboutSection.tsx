import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Leaf, Award, Users, Heart } from 'lucide-react';

export function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 lg:py-28 bg-gradient-to-b from-background to-muted/30"
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
            Our Story
          </motion.div>
          
          <motion.h2
            className="mb-6 text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Crafting Natural Beauty Since 2018
          </motion.h2>
          
          <motion.p
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Born from a passion for natural wellness, ForAll Herbals combines ancient herbal wisdom 
            with modern skincare science to create products that nurture your skin naturally.
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-primary mb-6">
              From Garden to Glow
            </h3>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded by botanist Dr. Sarah Chen and dermatologist Dr. Michael Park, 
                ForAll Herbals began in a small laboratory with a simple mission: 
                create effective skincare using only the purest natural ingredients.
              </p>
              
              <p>
                Our journey started when Dr. Chen discovered the remarkable healing 
                properties of rare botanical extracts during her research in sustainable 
                agriculture. Partnering with Dr. Park's expertise in skin health, 
                they developed formulations that deliver real results without compromise.
              </p>
              
              <p>
                Today, we source ingredients from certified organic farms worldwide, 
                ensuring every product meets our strict standards for purity, 
                potency, and sustainability.
              </p>
            </div>
          </motion.div>

          {/* Founder Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWIlMjBzY2llbnRpc3QlMjBib3RhbmljYWwlMjByZXNlYXJjaHxlbnwxfHx8fDE3NTYwNTI4MTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="ForAll Herbals founders in laboratory"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Values Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            {
              icon: Leaf,
              title: "100% Natural",
              description: "Pure botanical ingredients sourced from certified organic farms worldwide"
            },
            {
              icon: Award,
              title: "Science-Backed",
              description: "Formulations developed by dermatologists and tested for efficacy"
            },
            {
              icon: Users,
              title: "Community First",
              description: "Supporting local farmers and sustainable farming practices globally"
            },
            {
              icon: Heart,
              title: "Cruelty-Free",
              description: "Never tested on animals, certified by Leaping Bunny Program"
            }
          ].map((value, index) => (
            <motion.div
              key={value.title}
              className="text-center p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-primary mb-2">{value.title}</h4>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-primary/10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[
            { number: "50K+", label: "Happy Customers" },
            { number: "98%", label: "Satisfaction Rate" },
            { number: "25+", label: "Natural Ingredients" },
            { number: "6", label: "Years of Excellence" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.2 + (index * 0.1) }}
            >
              <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-sm text-muted-foreground geometric-font">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}