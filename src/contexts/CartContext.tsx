'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Product } from '@/data/products';

// Cart item interface
interface CartItem {
  product: Product;
  quantity: number;
}

// Cart state interface
interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

// Cart actions
type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' };

// Load cart from localStorage
const loadCartFromStorage = (): CartState => {
  if (typeof window === 'undefined') {
    return { items: [], isOpen: false };
  }
  
  try {
    const savedCart = localStorage.getItem('honeyfy-cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      return {
        items: parsedCart.items || [],
        isOpen: false, // Always start with cart closed
      };
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  
  return { items: [], isOpen: false };
};

// Initial state
const initialState: CartState = loadCartFromStorage();

// Cart reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        item => item.product.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }],
      };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload),
      };
    }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.product.id !== action.payload.productId),
        };
      }

      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }

    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
      };
    }

    case 'TOGGLE_CART': {
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    }

    case 'CLOSE_CART': {
      return {
        ...state,
        isOpen: false,
      };
    }

    default:
      return state;
  }
}

// Cart context
interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Save cart to localStorage whenever state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('honeyfy-cart', JSON.stringify({
        items: state.items,
        // Don't save isOpen state to localStorage
      }));
    }
  }, [state.items]);

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => {
      const price = item.product.originalPrice || item.product.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const value: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    closeCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
