import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  Leaf,
  Heart
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="script-font text-2xl mb-4 text-secondary">
              ForAll Herbals
            </h3>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Transforming skin naturally with premium herbal skincare products. 
              Discover the power of nature for radiant, healthy skin.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Youtube, href: '#', label: 'YouTube' }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4 geometric-font">Quick Links</h4>
            <nav className="space-y-2">
              {[
                'About Us',
                'Our Products',
                'Ingredient Guide',
                'Skincare Routine',
                'Customer Reviews',
                'Blog'
              ].map((link, index) => (
                <motion.a
                  key={link}
                  href="#"
                  className="block text-primary-foreground/80 hover:text-secondary transition-colors"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  {link}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Customer Care */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4 geometric-font">Customer Care</h4>
            <nav className="space-y-2">
              {[
                'Contact Us',
                'FAQ',
                'Shipping Info',
                'Returns & Exchanges',
                'Size Guide',
                'Track Your Order'
              ].map((link, index) => (
                <motion.a
                  key={link}
                  href="#"
                  className="block text-primary-foreground/80 hover:text-secondary transition-colors"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  {link}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4 geometric-font">Get in Touch</h4>
            <div className="space-y-3">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-4 h-4 text-secondary flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">
                  hello@forallherbals.com
                </span>
              </motion.div>
              
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">
                  1-800-GLOW-NOW
                </span>
              </motion.div>
              
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-4 h-4 text-secondary flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">
                  123 Beauty Lane, San Francisco, CA 94102
                </span>
              </motion.div>
            </div>

            {/* Certifications */}
            <div className="mt-6">
              <h5 className="font-medium mb-3 text-sm geometric-font">Certified</h5>
              <div className="flex flex-wrap gap-2">
                {[
                  'USDA Organic',
                  'Cruelty-Free',
                  'Vegan'
                ].map((cert, index) => (
                  <motion.div
                    key={cert}
                    className="bg-white/10 rounded-full px-3 py-1 text-xs geometric-font flex items-center gap-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Leaf className="w-3 h-3 text-secondary" />
                    {cert}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <Separator className="bg-white/20 mb-8" />

        {/* Bottom Footer */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-primary-foreground/80">
            <span>© 2024 ForAll Herbals. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-secondary transition-colors">Cookie Policy</a>
            </div>
          </div>

          <motion.div
            className="flex items-center gap-2 text-sm text-primary-foreground/80"
            whileHover={{ scale: 1.05 }}
          >
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-secondary fill-current" />
            </motion.div>
            <span>for beautiful skin</span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}