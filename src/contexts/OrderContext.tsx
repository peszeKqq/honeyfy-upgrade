'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { orderService } from '@/lib/firebase';

// Order interface
export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  loyaltyDiscount: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentIntentId?: string;
  shippingAddress: {
    name: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  createdAt: string | Date;
  updatedAt: string | Date;
}

// Order state interface
interface OrderState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
}

// Order actions
type OrderAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ORDERS'; payload: Order[] }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER'; payload: { id: string; updates: Partial<Order> } }
  | { type: 'CLEAR_ORDERS' }
  | { type: 'SET_ERROR'; payload: string | null };

// Order context interface
interface OrderContextType {
  state: OrderState;
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
  getUserOrders: (userId: string) => Order[];
  getOrderById: (orderId: string) => Order | undefined;
  loadUserOrders: (userId: string) => Promise<void>;
  loadAllOrders: () => Promise<void>;
}

// Initial state
const initialState: OrderState = {
  orders: [],
  isLoading: false,
  error: null,
};

// Load orders from localStorage (fallback)
const loadOrdersFromStorage = (): OrderState => {
  if (typeof window === 'undefined') {
    return initialState;
  }
  
  try {
    const savedOrders = localStorage.getItem('honeyfy-orders');
    if (savedOrders) {
      const orders = JSON.parse(savedOrders);
      return {
        orders: orders || [],
        isLoading: false,
        error: null,
      };
    }
  } catch (error) {
    console.error('Error loading orders from localStorage:', error);
  }
  
  return initialState;
};

// Order reducer
function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
        error: null,
      };
    
    case 'SET_ORDERS':
      return {
        ...state,
        orders: action.payload,
        isLoading: false,
        error: null,
      };
    
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders],
        error: null,
      };
    
    case 'UPDATE_ORDER':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id
            ? { ...order, ...action.payload.updates, updatedAt: new Date().toISOString() }
            : order
        ),
        error: null,
      };
    
    case 'CLEAR_ORDERS':
      return {
        ...state,
        orders: [],
        error: null,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    
    default:
      return state;
  }
}

// Create context
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Order provider
export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, initialState, loadOrdersFromStorage);
  const { state: authState } = useAuth();

  // Save orders to localStorage as backup whenever state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('honeyfy-orders', JSON.stringify(state.orders));
    }
  }, [state.orders]);

  // Clear orders when user logs out
  useEffect(() => {
    if (!authState.isAuthenticated) {
      dispatch({ type: 'CLEAR_ORDERS' });
    }
  }, [authState.isAuthenticated]);

  // Load user orders from Firebase
  const loadUserOrders = useCallback(async (userId: string) => {
    if (!userId) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const orders = await orderService.getUserOrders(userId);
      
      // Only use localStorage as fallback if Firebase fails
      if (orders.length === 0) {
        console.log('⚠️ Firebase returned empty orders, checking localStorage...');
        const localStorageOrders = loadOrdersFromStorage();
        if (localStorageOrders.orders.length > 0) {
          dispatch({ type: 'SET_ORDERS', payload: localStorageOrders.orders });
          console.log('✅ Fallback: Loaded orders from localStorage:', localStorageOrders.orders.length);
          return;
        }
      }
      
      dispatch({ type: 'SET_ORDERS', payload: orders as Order[] });
      console.log('✅ Loaded orders from Firebase:', orders.length);
    } catch (error) {
      console.error('❌ Error loading user orders from Firebase:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load orders from Firebase' });
      
      // Fallback to localStorage only on error
      const localStorageOrders = loadOrdersFromStorage();
      if (localStorageOrders.orders.length > 0) {
        dispatch({ type: 'SET_ORDERS', payload: localStorageOrders.orders });
        console.log('✅ Error fallback: Loaded orders from localStorage:', localStorageOrders.orders.length);
      }
    }
  }, [dispatch]);

  // Load all orders from Firebase (for testing when not authenticated)
  const loadAllOrders = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const orders = await orderService.getAllOrders();
      
      if (orders.length === 0) {
        console.log('⚠️ Firebase returned empty orders, checking localStorage...');
        const localStorageOrders = loadOrdersFromStorage();
        if (localStorageOrders.orders.length > 0) {
          dispatch({ type: 'SET_ORDERS', payload: localStorageOrders.orders });
          console.log('✅ Fallback: Loaded orders from localStorage:', localStorageOrders.orders.length);
          return;
        }
      }
      
      dispatch({ type: 'SET_ORDERS', payload: orders as Order[] });
      console.log('✅ Loaded all orders from Firebase:', orders.length);
    } catch (error) {
      console.error('❌ Error loading all orders from Firebase:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load orders from Firebase' });
      
      // Fallback to localStorage only on error
      const localStorageOrders = loadOrdersFromStorage();
      if (localStorageOrders.orders.length > 0) {
        dispatch({ type: 'SET_ORDERS', payload: localStorageOrders.orders });
        console.log('✅ Error fallback: Loaded orders from localStorage:', localStorageOrders.orders.length);
      }
    }
  }, [dispatch]);

  // Add new order to Firebase
  const addOrder = useCallback(async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Add to Firebase
      const orderId = await orderService.addOrder(orderData);
      
      if (orderId) {
        // Create order object with Firebase ID
        const newOrder: Order = {
          ...orderData,
          id: orderId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        dispatch({ type: 'ADD_ORDER', payload: newOrder });
        console.log('✅ Order added successfully to Firebase');
      } else {
        // Fallback to localStorage if Firebase fails
        const fallbackOrder: Order = {
          ...orderData,
          id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        dispatch({ type: 'ADD_ORDER', payload: fallbackOrder });
        console.log('⚠️ Firebase unavailable, order saved to localStorage');
      }
    } catch (error) {
      console.error('Error adding order:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add order' });
      
      // Fallback to localStorage
      const fallbackOrder: Order = {
        ...orderData,
        id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      dispatch({ type: 'ADD_ORDER', payload: fallbackOrder });
    }
  }, [dispatch]);

  // Update order status in Firebase
  const updateOrderStatus = useCallback(async (orderId: string, status: Order['status']) => {
    try {
      // Update in Firebase
      const success = await orderService.updateOrderStatus(orderId, status);
      
      if (success) {
        dispatch({
          type: 'UPDATE_ORDER',
          payload: {
            id: orderId,
            updates: { status },
          },
        });
        console.log('✅ Order status updated in Firebase');
      } else {
        // Fallback to localStorage update
        dispatch({
          type: 'UPDATE_ORDER',
          payload: {
            id: orderId,
            updates: { status },
          },
        });
        console.log('⚠️ Firebase unavailable, status updated in localStorage');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update order status' });
      
      // Fallback to localStorage update
      dispatch({
        type: 'UPDATE_ORDER',
        payload: {
          id: orderId,
          updates: { status },
        },
      });
    }
  }, [dispatch]);

  // Get orders for specific user (from local state)
  const getUserOrders = useCallback((userId: string): Order[] => {
    return state.orders.filter(order => order.userId === userId);
  }, [state.orders]);

  // Get order by ID (from local state)
  const getOrderById = useCallback((orderId: string): Order | undefined => {
    return state.orders.find(order => order.id === orderId);
  }, [state.orders]);

  const value: OrderContextType = {
    state,
    addOrder,
    updateOrderStatus,
    getUserOrders,
    getOrderById,
    loadUserOrders,
    loadAllOrders,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

// Custom hook to use order context
export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
