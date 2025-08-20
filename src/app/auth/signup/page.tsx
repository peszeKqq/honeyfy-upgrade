'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '@/lib/firebase';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!auth) {
        setError('Firebase authentication is not configured. Please check your Firebase setup.');
        return;
      }
      
      console.log('Attempting to create user with email:', email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully:', userCredential.user.uid);
      
      // Update user profile with full name
      await updateProfile(userCredential.user, {
        displayName: fullName
      });
      console.log('Profile updated with name:', fullName);

      router.push('/dashboard');
    } catch (err: any) {
      console.error('Signup error:', err);
      
      // Provide more specific error messages
      let errorMessage = 'Signup failed. Please try again.';
      
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Try logging in instead.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please use at least 6 characters.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (err.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid credentials. Please check your Firebase project configuration.';
      } else if (err.code === 'auth/configuration-not-found') {
        errorMessage = 'Firebase authentication is not properly configured. Please check your project settings.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError(null);

    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignUp = async () => {
    setLoading(true);
    setError(null);

    try {
      await signInWithPopup(auth, facebookProvider);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-8">
            <span className="text-3xl">🍯</span>
            <span className="text-2xl font-bold text-gray-900">Honeyfy</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Join Honeyfy! 🍯
          </h2>
          <p className="text-gray-600">
            Create your account and start your sweet journey with premium honey
          </p>
        </div>



        {/* Email Sign Up Form */}
        <form onSubmit={handleEmailSignUp} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900"
              placeholder="Enter password (min. 6 characters)"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:transform-none disabled:shadow-none"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating account...
              </div>
            ) : (
              'Create Account 🍯'
            )}
          </button>
        </form>

        {/* Terms */}
        <p className="text-xs text-gray-500 text-center">
          By creating an account, you agree to our{' '}
          <Link href="/terms" className="text-yellow-600 hover:text-yellow-700">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-yellow-600 hover:text-yellow-700">
            Privacy Policy
          </Link>
        </p>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="text-yellow-600 hover:text-yellow-700 font-medium"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Firebase Setup Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-bold text-blue-800 mb-2">🔧 Firebase Setup Required:</h4>
          <p className="text-sm text-blue-700">
            To use authentication, please follow the instructions in <code>FIREBASE_SETUP.md</code> and add your Firebase keys to <code>.env.local</code>
          </p>
        </div>
      </div>
    </div>
  );
}
