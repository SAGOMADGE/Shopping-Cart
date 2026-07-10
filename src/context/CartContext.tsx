import {
  createContext,
  useContext,
  useState,
  useEffect,
  type PropsWithChildren,
} from 'react';
import type { CartItem, Product } from '@/types/product';
import { isCart } from '@/validators/cart';

type ToastState = {
  show: boolean;
  message: string;
};

type CartContextValue = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, amount: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  toast: ToastState;
  showNotification: (message: string) => void;
};

const readCartFromStorage = (): CartItem[] => {
  try {
    const saved = localStorage.getItem('cart');
    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);
    return isCart(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const CartContext = createContext<CartContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('Use cart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(readCartFromStorage);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '' });

  const showNotification = (message: string) => {
    setToast({ show: true, message });
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item.id === product.id);

      if (exist) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, amount: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const value: CartContextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    toast,
    showNotification,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
