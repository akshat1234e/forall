import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { apiClient } from '../utils/supabase/client.ts';
import { useAuth } from './AuthProvider';
import { toast } from 'sonner';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface Cart {
  items: CartItem[];
  total: number;
  updated_at?: string;
}

interface CartContextType {
  cart: Cart;
  loading: boolean;
  itemCount: number;
  addToCart: (productId: string, product: any, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const { user, session } = useAuth();
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);

  // Safely calculate itemCount with fallback
  const itemCount = cart?.items?.reduce((sum, item) => sum + (item?.quantity || 0), 0) || 0;

  useEffect(() => {
    if (user && session) {
      refreshCart();
    } else {
      // Load cart from localStorage for guest users
      const guestCart = localStorage.getItem('forall_herbals_cart');
      if (guestCart) {
        try {
          const parsedCart = JSON.parse(guestCart);
          // Validate the parsed cart structure
          if (parsedCart && typeof parsedCart === 'object' && Array.isArray(parsedCart.items)) {
            setCart(parsedCart);
          } else {
            // Reset to empty cart if invalid structure
            setCart({ items: [], total: 0 });
            localStorage.removeItem('forall_herbals_cart');
          }
        } catch (error) {
          console.error('Error parsing guest cart:', error);
          setCart({ items: [], total: 0 });
          localStorage.removeItem('forall_herbals_cart');
        }
      }
    }
  }, [user, session]);

  const refreshCart = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { cart: serverCart } = await apiClient.getCart();
      // Validate server cart structure
      if (serverCart && typeof serverCart === 'object' && Array.isArray(serverCart.items)) {
        setCart(serverCart);
      } else {
        setCart({ items: [], total: 0 });
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      // Don't show error toast for cart loading failures
      setCart({ items: [], total: 0 });
    } finally {
      setLoading(false);
    }
  };

  const updateGuestCart = (newCart: Cart) => {
    setCart(newCart);
    localStorage.setItem('forall_herbals_cart', JSON.stringify(newCart));
  };

  const addToCart = async (productId: string, product: any, quantity: number = 1) => {
    try {
      if (user && session) {
        // Add to server cart for authenticated users
        const { cart: updatedCart } = await apiClient.addToCart(productId, quantity);
        if (updatedCart && Array.isArray(updatedCart.items)) {
          setCart(updatedCart);
          toast.success(`Added ${product.name} to cart`);
        }
      } else {
        // Update guest cart in localStorage
        const newCart = { ...cart };
        const existingItemIndex = newCart.items.findIndex(item => item.productId === productId);

        if (existingItemIndex >= 0) {
          newCart.items[existingItemIndex].quantity += quantity;
        } else {
          newCart.items.push({
            productId,
            name: product.name,
            price: product.price,
            image: product.images?.[0] || '',
            quantity
          });
        }

        newCart.total = newCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        updateGuestCart(newCart);
        toast.success(`Added ${product.name} to cart`);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      if (user && session) {
        // Remove from server cart (would need a delete endpoint)
        // For now, set quantity to 0
        await updateQuantity(productId, 0);
      } else {
        // Update guest cart
        const newCart = {
          ...cart,
          items: cart.items.filter(item => item.productId !== productId)
        };
        newCart.total = newCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        updateGuestCart(newCart);
        toast.success('Item removed from cart');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      if (quantity === 0) {
        await removeFromCart(productId);
        return;
      }

      if (user && session) {
        // Update server cart (would need an update endpoint)
        // For now, we'll update locally and sync later
        const newCart = { ...cart };
        const itemIndex = newCart.items.findIndex(item => item.productId === productId);
        if (itemIndex >= 0) {
          newCart.items[itemIndex].quantity = quantity;
          newCart.total = newCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          setCart(newCart);
        }
      } else {
        // Update guest cart
        const newCart = { ...cart };
        const itemIndex = newCart.items.findIndex(item => item.productId === productId);
        if (itemIndex >= 0) {
          newCart.items[itemIndex].quantity = quantity;
          newCart.total = newCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          updateGuestCart(newCart);
        }
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update item quantity');
    }
  };

  const clearCart = () => {
    const emptyCart = { items: [], total: 0 };
    setCart(emptyCart);
    if (!user) {
      localStorage.removeItem('forall_herbals_cart');
    }
  };

  const value = {
    cart,
    loading,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    refreshCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}