# 🔐 Social Authentication Setup Guide

This guide will help you set up Google and Facebook authentication for your Honeyfy application using Firebase.

## 📋 Prerequisites

- Firebase project already configured
- `.env.local` file with Firebase configuration
- Basic understanding of Firebase Authentication

## 🚀 Step 1: Firebase Console Setup

### 1.1 Enable Authentication Providers

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Authentication** → **Sign-in method**
4. Enable the following providers:
   - **Google** ✅
   - **Facebook** ✅
   - **Email/Password** ✅ (already enabled)

## 🔑 Step 2: Google Authentication Setup

### 2.1 Configure Google Provider

1. In Firebase Console, click on **Google** provider
2. Click **Enable**
3. Add your **Project support email**
4. Click **Save**

### 2.2 Get Google OAuth Client ID (Optional - for custom domain)

If you want to use a custom domain, you'll need to:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to **APIs & Services** → **Credentials**
4. Create an **OAuth 2.0 Client ID**
5. Add your domain to **Authorized JavaScript origins**
6. Add your redirect URI to **Authorized redirect URIs**

**Authorized JavaScript origins:**
```
http://localhost:3000
https://your-domain.com
```

**Authorized redirect URIs:**
```
http://localhost:3000/__/auth/handler
https://your-domain.com/__/auth/handler
```

## 📘 Step 3: Facebook Authentication Setup

### 3.1 Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **Create App**
3. Choose **Consumer** as app type
4. Fill in your app details:
   - **App Name**: Honeyfy (or your preferred name)
   - **App Contact Email**: Your email
   - **Business Account**: Optional
5. Click **Create App**

### 3.2 Configure Facebook App

1. In your Facebook app dashboard, go to **Settings** → **Basic**
2. Note down your **App ID** and **App Secret**
3. Add your domain to **App Domains**:
   ```
   localhost
   your-domain.com
   ```

### 3.3 Add Facebook Login Product

1. In your Facebook app dashboard, click **Add Product**
2. Find **Facebook Login** and click **Set Up**
3. Choose **Web** platform
4. Enter your site URL:
   ```
   http://localhost:3000
   https://your-domain.com
   ```
5. Click **Save and Continue**

### 3.4 Configure Valid OAuth Redirect URIs

1. In Facebook Login settings, go to **Valid OAuth Redirect URIs**
2. Add these URIs:
   ```
   https://your-project-id.firebaseapp.com/__/auth/handler
   http://localhost:3000/__/auth/handler
   ```

### 3.5 Get Facebook App Credentials

1. Go to **Settings** → **Basic**
2. Copy your **App ID** and **App Secret**
3. Keep these secure - you'll need them for Firebase

## 🔧 Step 4: Configure Firebase with Facebook

### 4.1 Add Facebook Provider to Firebase

1. Go back to Firebase Console
2. Navigate to **Authentication** → **Sign-in method**
3. Click on **Facebook** provider
4. Click **Enable**
5. Enter your Facebook **App ID** and **App Secret**
6. Click **Save**

## 🌐 Step 5: Environment Variables

### 5.1 Update .env.local

Add these variables to your `.env.local` file:

```env
# Firebase Configuration (already present)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:your_app_id

# Social Auth Configuration (optional - for custom domains)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_FACEBOOK_APP_ID=your_facebook_app_id
```

## 🧪 Step 6: Testing

### 6.1 Test Google Authentication

1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000/auth/login`
3. Click the **Google** button
4. You should be redirected to Google's OAuth consent screen
5. After successful authentication, you should be redirected to `/dashboard`

### 6.2 Test Facebook Authentication

1. Go to `http://localhost:3000/auth/login`
2. Click the **Facebook** button
3. You should be redirected to Facebook's OAuth consent screen
4. After successful authentication, you should be redirected to `/dashboard`

## 🚨 Troubleshooting

### Common Issues

#### 1. "popup_closed_by_user" Error
- **Cause**: User closed the popup window
- **Solution**: This is normal behavior, just inform users to keep the popup open

#### 2. "auth/unauthorized-domain" Error
- **Cause**: Domain not authorized in Firebase
- **Solution**: Add your domain to Firebase Console → Authentication → Settings → Authorized domains

#### 3. "auth/operation-not-allowed" Error
- **Cause**: Provider not enabled in Firebase
- **Solution**: Enable the provider in Firebase Console → Authentication → Sign-in method

#### 4. Facebook "Invalid OAuth redirect URI" Error
- **Cause**: Redirect URI not configured in Facebook app
- **Solution**: Add the correct redirect URI to Facebook app settings

#### 5. Google "redirect_uri_mismatch" Error
- **Cause**: Redirect URI not configured in Google Cloud Console
- **Solution**: Add the correct redirect URI to Google OAuth client settings

### Debug Steps

1. **Check Browser Console**: Look for authentication errors
2. **Check Firebase Console**: Monitor authentication attempts
3. **Check Network Tab**: Look for failed requests
4. **Verify Environment Variables**: Ensure all Firebase config is correct

## 🔒 Security Best Practices

### 1. Environment Variables
- Never commit `.env.local` to version control
- Use different Firebase projects for development and production
- Rotate API keys regularly

### 2. Domain Restrictions
- Only authorize necessary domains
- Remove unused domains from authorized list
- Use HTTPS in production

### 3. App Verification
- Verify your Facebook app for production use
- Complete Google OAuth consent screen verification
- Add privacy policy and terms of service

## 📱 Production Deployment

### 1. Update Authorized Domains

In Firebase Console → Authentication → Settings → Authorized domains:
```
your-domain.com
www.your-domain.com
```

### 2. Update Facebook App Settings

In Facebook app → Settings → Basic:
```
App Domains: your-domain.com
```

### 3. Update Google OAuth Settings

In Google Cloud Console → Credentials → OAuth 2.0 Client IDs:
```
Authorized JavaScript origins:
https://your-domain.com

Authorized redirect URIs:
https://your-domain.com/__/auth/handler
```

## 🎉 Success!

Once configured, users can:
- Sign in with Google using their Google account
- Sign in with Facebook using their Facebook account
- Sign in with email/password (existing functionality)
- Seamlessly switch between authentication methods

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Firebase documentation
3. Check Facebook Developers documentation
4. Verify all configuration steps were completed

---

**Note**: This setup provides a secure, user-friendly authentication system that follows industry best practices. The social login buttons are already implemented in your login and signup pages! 🍯✨
