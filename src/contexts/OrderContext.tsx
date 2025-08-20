'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

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
  createdAt: string;
  updatedAt: string;
}

// Order state interface
interface OrderState {
  orders: Order[];
  isLoading: boolean;
}

// Order actions
type OrderAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ORDERS'; payload: Order[] }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER'; payload: { id: string; updates: Partial<Order> } }
  | { type: 'CLEAR_ORDERS' };

// Order context interface
interface OrderContextType {
  state: OrderState;
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getUserOrders: (userId: string) => Order[];
  getOrderById: (orderId: string) => Order | undefined;
}

// Initial state
const initialState: OrderState = {
  orders: [],
  isLoading: false,
};

// Load orders from localStorage
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
      };
    
    case 'SET_ORDERS':
      return {
        ...state,
        orders: action.payload,
        isLoading: false,
      };
    
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    
    case 'UPDATE_ORDER':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id
            ? { ...order, ...action.payload.updates, updatedAt: new Date().toISOString() }
            : order
        ),
      };
    
    case 'CLEAR_ORDERS':
      return {
        ...state,
        orders: [],
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

  // Save orders to localStorage whenever state changes
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

  // Add new order
  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    dispatch({ type: 'ADD_ORDER', payload: newOrder });
  };

  // Update order status
  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    dispatch({
      type: 'UPDATE_ORDER',
      payload: {
        id: orderId,
        updates: { status },
      },
    });
  };

  // Get orders for specific user
  const getUserOrders = (userId: string): Order[] => {
    return state.orders.filter(order => order.userId === userId);
  };

  // Get order by ID
  const getOrderById = (orderId: string): Order | undefined => {
    return state.orders.find(order => order.id === orderId);
  };

  const value: OrderContextType = {
    state,
    addOrder,
    updateOrderStatus,
    getUserOrders,
    getOrderById,
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
