# Firebase Collections Setup Guide

## Required Collections

### 1. Orders Collection
**Collection Name:** `orders`

**Security Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Orders collection
    match /orders/{orderId} {
      // Users can read their own orders
      allow read: if request.auth != null && 
        resource.data.userId == request.auth.uid;
      
      // Users can create their own orders
      allow create: if request.auth != null && 
        request.resource.data.userId == request.auth.uid;
      
      // Users can update their own orders (for status changes)
      allow update: if request.auth != null && 
        resource.data.userId == request.auth.uid;
      
      // Admins can read/write all orders
      allow read, write: if request.auth != null && 
        request.auth.token.email in ['david.masa@hotmail.com'];
    }
    
    // Blog posts collection
    match /blog_posts/{document} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.auth.token.email in ['david.masa@hotmail.com'];
    }
    
    // Blog comments collection
    match /blog_comments/{document} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        request.auth.token.email in ['david.masa@hotmail.com'];
    }
    
    // Products collection
    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.auth.token.email in ['david.masa@hotmail.com'];
    }
    
    // Loyalty points collection
    match /loyalty_points/{document} {
      allow read: if request.auth != null && 
        resource.data.userId == request.auth.uid;
      allow create, update: if request.auth != null && 
        request.resource.data.userId == request.auth.uid;
      allow read, write: if request.auth != null && 
        request.auth.token.email in ['david.masa@hotmail.com'];
    }
    
    // Newsletter subscribers collection
    match /newsletter_subscribers/{document} {
      allow read: if request.auth != null && 
        request.auth.token.email in ['david.masa@hotmail.com'];
      allow create: if true;
    }
    
    // Wholesale orders collection
    match /wholesale_orders/{document} {
      allow read, write: if request.auth != null && 
        request.auth.token.email in ['david.masa@hotmail.com'];
      allow create: if true;
    }
    
    // Default rule - deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Setup Instructions

### Step 1: Access Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `honeyfy-upgrade`
3. Click "Firestore Database" in the left sidebar

### Step 2: Create Collections
1. Click "Start collection" or "Add collection"
2. Create these collections:
   - `orders`
   - `blog_posts`
   - `blog_comments`
   - `products`
   - `loyalty_points`
   - `newsletter_subscribers`
   - `wholesale_orders`

### Step 3: Update Security Rules
1. Click the "Rules" tab
2. Replace the current rules with the rules above
3. Click "Publish"

### Step 4: Test the Setup
1. Go to your orders page: `http://localhost:3002/orders`
2. Click "🧪 Test Firebase" button
3. You should see: "✅ Firebase order system is working!"

## Collection Schemas

### Orders Collection
```javascript
{
  id: "auto-generated",
  userId: "user-auth-uid",
  items: [
    {
      productId: "product-id",
      name: "Product Name",
      price: 29.99,
      quantity: 2,
      image: "product-image-url"
    }
  ],
  subtotal: 59.98,
  shipping: 5.99,
  loyaltyDiscount: 0,
  total: 65.97,
  status: "pending", // pending, processing, shipped, delivered, cancelled
  paymentIntentId: "stripe-payment-intent-id",
  shippingAddress: {
    name: "John Doe",
    email: "john@example.com",
    address: "123 Main St",
    city: "Amsterdam",
    postalCode: "1234 AB",
    country: "Netherlands"
  },
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
```

### Blog Posts Collection
```javascript
{
  id: "auto-generated",
  title: "Blog Post Title",
  slug: "blog-post-slug",
  content: "Blog post content...",
  excerpt: "Short description...",
  author: "David Masa",
  publishedAt: "timestamp",
  image: "blog-image-url",
  tags: ["honey", "health"],
  status: "published" // draft, published
}
```

### Blog Comments Collection
```javascript
{
  id: "auto-generated",
  postId: "blog-post-id",
  userId: "user-auth-uid",
  userName: "User Name",
  userEmail: "user@example.com",
  content: "Comment content...",
  createdAt: "timestamp",
  status: "pending" // pending, approved, rejected
}
```

### Loyalty Points Collection
```javascript
{
  id: "auto-generated",
  userId: "user-auth-uid",
  points: 150,
  totalSpent: 150.00,
  lastUpdated: "timestamp"
}
```

### Newsletter Subscribers Collection
```javascript
{
  id: "auto-generated",
  email: "subscriber@example.com",
  subscribedAt: "timestamp",
  status: "active" // active, unsubscribed
}
```

### Wholesale Orders Collection
```javascript
{
  id: "auto-generated",
  businessName: "Business Name",
  contactName: "Contact Person",
  email: "contact@business.com",
  phone: "+31 6 12345678",
  businessType: "restaurant", // restaurant, retail, wholesale, other
  products: [
    {
      productId: "product-id",
      name: "Product Name",
      quantity: 50,
      price: 25.00
    }
  ],
  totalAmount: 1250.00,
  message: "Additional requirements...",
  status: "pending", // pending, approved, rejected, completed
  createdAt: "timestamp"
}
```

## Security Rules Explanation

### Orders Collection
- **Users can only read/write their own orders** (based on `userId` field)
- **Admins can access all orders** (based on email address)
- **Authentication required** for all operations

### Blog Posts
- **Public read access** (anyone can read blog posts)
- **Admin-only write access** (only you can create/edit posts)

### Blog Comments
- **Public read access** (anyone can read comments)
- **Authenticated users can create** comments
- **Admin-only approval/rejection** of comments

### Loyalty Points
- **Users can only access their own points**
- **Admins can access all points** for management

### Newsletter Subscribers
- **Public subscription** (anyone can subscribe)
- **Admin-only read access** (only you can see subscribers)

### Wholesale Orders
- **Public submission** (anyone can submit wholesale inquiries)
- **Admin-only management** (only you can view/manage orders)

## Testing Your Rules

After applying the rules, test them:

1. **Test as regular user:**
   - Go to `/orders` page
   - Click "🧪 Test Firebase" button
   - Should work if you're logged in

2. **Test as admin:**
   - Log in with your admin email
   - Should have full access to all collections

3. **Test without authentication:**
   - Log out
   - Should be denied access to orders and loyalty points
   - Should still be able to read blog posts and subscribe to newsletter


