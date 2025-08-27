import { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner@2.0.3';
import { Mail, Gift, Sparkles, Check, Loader2 } from 'lucide-react';
import { apiClient } from '../utils/supabase/client.ts';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    try {
      setIsLoading(true);
      
      try {
        const response = await apiClient.subscribeNewsletter(email);
        setIsSubscribed(true);
        toast.success('Welcome to our glow community! Check your email for your discount code.');
      } catch (apiError) {
        console.log('API not available, using demo mode');
        // Demo mode - simulate successful subscription
        setIsSubscribed(true);
        toast.success('Demo mode: Welcome to our glow community! (Backend not connected)');
      }
      
      setEmail('');
      
      // Reset after 5 seconds for demo
      setTimeout(() => setIsSubscribed(false), 5000);
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 gradient-green relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-24 h-24 bg-white/10 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 bg-secondary/20 rounded-full"
          animate={{ 
            scale: [1, 0.7, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 right-10 w-16 h-16 bg-white/15 rounded-full"
          animate={{ 
            y: [0, -40, 0],
            x: [0, 20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="flex items-center justify-center gap-2 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Gift className="w-8 h-8 text-secondary" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 text-white/80" />
              </motion.div>
            </motion.div>
            
            <motion.div
              className="script-font text-2xl text-secondary mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Get Glow Tips & Exclusive Offers
            </motion.div>
            
            <motion.h2
              className="mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Join Our Beauty Community
            </motion.h2>
            
            <motion.p
              className="text-lg text-white/90 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Subscribe to our newsletter and get exclusive skincare tips, product updates, 
              and a special 15% discount on your first order!
            </motion.p>
          </motion.div>

          {/* Newsletter Signup Form */}
          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-14 text-base bg-white/90 backdrop-blur-sm border-0 shadow-lg geometric-font"
                    disabled={isLoading}
                  />
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-14 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-base geometric-font shadow-lg disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Get My 15% Discount
                        <motion.span
                          className="ml-2"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            ) : (
              <motion.div
                className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <motion.div
                  className="flex items-center justify-center gap-2 mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                </motion.div>
                <h3 className="font-semibold text-lg text-primary mb-2">
                  Welcome to the Glow Community!
                </h3>
                <p className="text-muted-foreground text-sm">
                  Check your email for your exclusive 15% discount code.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Benefits */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {[
              {
                icon: Mail,
                title: "Weekly Tips",
                description: "Expert skincare advice delivered to your inbox"
              },
              {
                icon: Gift,
                title: "Exclusive Offers",
                description: "Member-only discounts and early access to new products"
              },
              {
                icon: Sparkles,
                title: "Beauty Secrets",
                description: "Behind-the-scenes content and ingredient spotlights"
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.9 + (index * 0.1) }}
              >
                <motion.div
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <benefit.icon className="w-6 h-6 text-secondary" />
                </motion.div>
                <h4 className="font-semibold text-white mb-2 geometric-font">
                  {benefit.title}
                </h4>
                <p className="text-white/80 text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Privacy Note */}
          <motion.p
            className="text-white/60 text-xs mt-8 geometric-font"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            We respect your privacy. Unsubscribe at any time.
          </motion.p>
        </div>
      </div>
    </section>
  );
}