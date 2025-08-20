import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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
let app;
let auth;
let db;

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

export { auth, db };

// Google provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Facebook provider
export const facebookProvider = new FacebookAuthProvider();

export default app;
