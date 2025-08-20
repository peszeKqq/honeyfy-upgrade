'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

// User interface
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

// Auth state interface
interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Auth actions
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_ERROR' }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_ERROR' };

// Auth context interface
interface AuthContextType {
  state: AuthState;
  logout: () => void;
}

// Initial state
const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
};

// Convert Firebase user to our User interface
const convertFirebaseUser = (firebaseUser: any): User => {
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email || '',
    name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
    avatar: firebaseUser.photoURL || undefined,
    createdAt: firebaseUser.metadata?.creationTime || new Date().toISOString(),
  };
};

// Auth reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return {
        ...state,
        isLoading: true,
      };
    
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuthenticated: true,
      };
    
    case 'LOGIN_ERROR':
    case 'REGISTER_ERROR':
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    
    default:
      return state;
  }
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Listen to Firebase auth state changes
  useEffect(() => {
    dispatch({ type: 'LOGIN_START' });
    
    if (!auth) {
      // Firebase not initialized, use mock/demo mode
      console.warn('Firebase auth not available - using demo mode');
      dispatch({ type: 'LOGOUT' });
      return;
    }
    
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const user = convertFirebaseUser(firebaseUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    });

    return () => unsubscribe();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      if (auth) {
        await signOut(auth);
        // The onAuthStateChanged listener will handle the state update
      } else {
        // No Firebase, just clear local state
        dispatch({ type: 'LOGOUT' });
      }
    } catch (error) {
      console.error('Error signing out:', error);
      dispatch({ type: 'LOGOUT' });
    }
  };

  const value: AuthContextType = {
    state,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
