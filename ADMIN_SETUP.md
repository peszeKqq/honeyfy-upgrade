# 🔐 Admin Access Setup Guide

This guide will help you set up admin access for your Honeyfy application.

## 🎯 **Quick Setup (Recommended)**

### **Step 1: Configure Your Email**

1. Open `src/lib/admin.ts`
2. Replace `'your-email@gmail.com'` with your actual email address:

```typescript
const ADMIN_EMAILS = [
  'your-actual-email@gmail.com', // Replace this with your email
  'admin@honeyfy.com',           // Add more admin emails as needed
];
```

### **Step 2: Test Admin Access**

1. Sign in with your email address
2. Click on your profile in the header
3. You should see an "Admin Panel" section with:
   - Blog Management
   - Newsletter Management

### **Step 3: Access Admin Pages**

- **Blog Management**: `/admin/blog`
- **Newsletter Management**: `/admin/newsletter`

## 🔧 **Advanced Admin Setup**

### **Option 1: Environment Variables (More Secure)**

Create a more secure admin system using environment variables:

1. **Update `.env.local`**:
```env
# Admin Configuration
NEXT_PUBLIC_ADMIN_EMAILS=your-email@gmail.com,admin@honeyfy.com
```

2. **Update `src/lib/admin.ts`**:
```typescript
const ADMIN_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || [
  'your-email@gmail.com', // Fallback
];
```

### **Option 2: Database-Based Admin System**

For a more scalable solution, store admin status in Firestore:

1. **Create admin collection in Firestore**:
```javascript
// admins collection
{
  email: string,
  role: 'super_admin' | 'content_admin' | 'newsletter_admin',
  createdAt: timestamp,
  isActive: boolean
}
```

2. **Update admin check function**:
```typescript
export async function isAdminFromDB(email: string): Promise<boolean> {
  if (!db || !email) return false;
  
  const adminDoc = await getDoc(doc(db, 'admins', email.toLowerCase()));
  return adminDoc.exists() && adminDoc.data()?.isActive;
}
```

## 🛡️ **Security Best Practices**

### **1. Email Verification**
- Only allow verified emails to be admins
- Use environment variables for sensitive data
- Never commit admin emails to public repositories

### **2. Role-Based Access**
```typescript
// Define specific permissions
export const ADMIN_PERMISSIONS = {
  SUPER_ADMIN: ['all'],
  CONTENT_ADMIN: ['blog:read', 'blog:write', 'blog:delete'],
  NEWSLETTER_ADMIN: ['newsletter:read', 'newsletter:write'],
} as const;
```

### **3. Session Management**
- Implement session timeouts for admin access
- Log admin actions for audit trails
- Use secure authentication methods

## 📋 **Admin Features Available**

### **Blog Management (`/admin/blog`)**
- ✅ Create new blog posts
- ✅ Edit existing posts
- ✅ Publish/unpublish posts
- ✅ Delete posts
- ✅ Manage post metadata (tags, read time, etc.)

### **Newsletter Management (`/admin/newsletter`)**
- ✅ View all subscribers
- ✅ Send newsletter campaigns
- ✅ Track campaign performance
- ✅ Manage subscriber status
- ✅ View campaign history

## 🚀 **Adding New Admin Features**

### **1. Create New Admin Page**
```typescript
// src/app/admin/new-feature/page.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { isAdmin } from '@/lib/admin';

export default function NewAdminFeature() {
  const { state } = useAuth();

  if (!state.user || !isAdmin(state.user.email)) {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <h1>New Admin Feature</h1>
      {/* Your admin content */}
    </div>
  );
}
```

### **2. Add to Navigation**
Update `src/components/UserMenu.tsx` to include new admin links:

```typescript
{isAdmin(state.user.email) && (
  <Link href="/admin/new-feature">
    New Admin Feature
  </Link>
)}
```

## 🔍 **Troubleshooting**

### **Common Issues**

#### **1. Admin Access Not Working**
- Check if your email is correctly added to `ADMIN_EMAILS`
- Ensure you're signed in with the correct email
- Clear browser cache and cookies
- Check browser console for errors

#### **2. Admin Links Not Showing**
- Verify the `isAdmin()` function is working
- Check if user authentication is working
- Ensure the UserMenu component is properly updated

#### **3. Admin Pages Returning 404**
- Verify the admin page files exist in the correct location
- Check Next.js routing configuration
- Ensure the page components are properly exported

### **Debug Steps**

1. **Check Admin Status**:
```typescript
// Add this to any component to debug
console.log('User email:', state.user?.email);
console.log('Is admin:', isAdmin(state.user?.email));
```

2. **Verify Environment Variables**:
```typescript
// Check if environment variables are loaded
console.log('Admin emails:', process.env.NEXT_PUBLIC_ADMIN_EMAILS);
```

3. **Test Admin Function**:
```typescript
// Test the admin function directly
import { isAdmin } from '@/lib/admin';
console.log('Test admin check:', isAdmin('your-email@gmail.com'));
```

## 📞 **Support**

If you encounter issues:

1. **Check the troubleshooting section above**
2. **Verify your email is correctly configured**
3. **Ensure you're signed in with the right account**
4. **Check browser console for errors**
5. **Review the admin configuration in `src/lib/admin.ts`**

## 🎉 **Success Checklist**

- ✅ Your email is added to `ADMIN_EMAILS` in `src/lib/admin.ts`
- ✅ You can sign in with your admin email
- ✅ Admin links appear in the user menu
- ✅ You can access `/admin/blog` and `/admin/newsletter`
- ✅ Admin pages show proper content instead of "Access Denied"

---

**🎯 You're now ready to manage your Honeyfy application!** 

Use the admin panels to:
- Create and manage blog content
- Send newsletters to subscribers
- Monitor subscriber engagement
- Track campaign performance

Your admin access is now fully configured! 🔐✨
