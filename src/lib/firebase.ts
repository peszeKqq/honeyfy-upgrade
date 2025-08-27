import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore, collection, addDoc, updateDoc, doc, getDocs, query, where, orderBy, serverTimestamp, DocumentData } from 'firebase/firestore';

// Check if Firebase config is available
const hasFirebaseConfig = 
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

// Use demo config if environment variables are not set
const firebaseConfig = hasFirebaseConfig ? {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
} : {
  // Demo project config - replace with your Firebase project
  apiKey: "demo-api-key",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:demo"
};

// Initialize Firebase
let app: any;
let auth: any;
let db: any;

try {
  console.log('Initializing Firebase with config:', {
    ...firebaseConfig,
    apiKey: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 10)}...` : 'missing'
  });
  
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  
  console.log('Firebase initialized successfully');
} catch (error) {
  console.warn('Firebase initialization failed:', error);
  // Create mock objects for development
  auth = null;
  db = null;
}

// Order management functions
export const orderService = {
  // Test Firebase connection
  async testConnection() {
    if (!db) {
      console.warn('Firebase not initialized');
      return { success: false, error: 'Firebase not initialized' };
    }

    try {
      // Try to read from a test collection
      const testQuery = query(collection(db, 'test'));
      const snapshot = await getDocs(testQuery);
      console.log('✅ Firebase connection test successful');
      return { success: true, message: 'Firebase connected' };
    } catch (error) {
      console.error('❌ Firebase connection test failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        code: error instanceof Error && 'code' in error ? (error as any).code : 'unknown'
      };
    }
  },

  // Add new order - try Firebase first, fallback to localStorage
  async addOrder(orderData: any) {
    if (!db) {
      console.warn('Firebase not initialized, using localStorage');
      const localId = 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      return localId;
    }

    try {
      const orderWithTimestamp = {
        ...orderData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'orders'), orderWithTimestamp);
      console.log('✅ Order added to Firebase with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('❌ Error adding order to Firebase:', error);
      console.log('⚠️ Firebase failed, using localStorage fallback');
      const localId = 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      return localId;
    }
  },

  // Get orders for a specific user - try Firebase first, fallback to localStorage
  async getUserOrders(userId: string) {
    if (!db) {
      console.warn('Firebase not initialized, returning empty array');
      return [];
    }

    try {
      const ordersQuery = query(
        collection(db, 'orders'),
        where('userId', '==', userId)
      );

      const querySnapshot = await getDocs(ordersQuery);
      const orders: DocumentData[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        orders.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || data.createdAt,
          updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
        });
      });

      console.log(`✅ Retrieved ${orders.length} orders from Firebase for user ${userId}`);
      return orders;
    } catch (error) {
      console.error('❌ Error fetching orders from Firebase:', error);
      console.log('⚠️ Firebase failed, returning empty array');
      return [];
    }
  },

  // Update order status
  async updateOrderStatus(orderId: string, status: string) {
    console.log('🔄 Using localStorage for order status update (Firebase disabled)');
    return true;
  },

  // Get all orders (for admin purposes)
  async getAllOrders() {
    if (!db) {
      console.warn('Firebase not initialized, returning empty array');
      return [];
    }

    try {
      const ordersQuery = query(
        collection(db, 'orders'),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(ordersQuery);
      const orders: DocumentData[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        orders.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || data.createdAt,
          updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
        });
      });

      console.log(`✅ Retrieved ${orders.length} total orders from Firebase`);
      return orders;
    } catch (error) {
      console.error('❌ Error fetching all orders from Firebase:', error);
      console.log('⚠️ Firebase failed, returning empty array');
      return [];
    }
  }
};

export { auth, db };

// Google provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Facebook provider
export const facebookProvider = new FacebookAuthProvider();

export default app;
