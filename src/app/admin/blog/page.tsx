'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { collection, query, orderBy, getDocs, doc, updateDoc, deleteDoc, addDoc, serverTimestamp, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { isAdmin } from '@/lib/admin';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: any;
  imageUrl?: string;
  tags: string[];
  readTime: number;
  isPublished: boolean;
  createdAt: any;
  slug: string;
}

export default function AdminBlogPage() {
  const { state } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [pendingComments, setPendingComments] = useState<any[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);

  // Function to generate slug from title
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim()
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  };

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    tags: '',
    readTime: 5,
    isPublished: false
  });

  useEffect(() => {
    if (state.user) {
      fetchPosts();
    }
  }, [state.user]);

  const fetchPosts = async () => {
    try {
      if (!db) {
        console.log('❌ Database not available in fetchPosts');
        return;
      }

      console.log('🔍 Fetching posts from database...');
      const q = query(collection(db, 'blog_posts'), orderBy('createdAt', 'desc'));
      console.log('Query created:', q);
      
      const querySnapshot = await getDocs(q);
      console.log('Query snapshot:', {
        empty: querySnapshot.empty,
        size: querySnapshot.size,
        docs: querySnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
      });
      
      const postsData: BlogPost[] = [];
      
      querySnapshot.forEach((doc) => {
        const postData = {
          id: doc.id,
          ...doc.data()
        } as BlogPost;
        
        console.log('Post data:', postData);
        postsData.push(postData);
      });

      console.log('All posts:', postsData);
      setPosts(postsData);
    } catch (error) {
      console.error('❌ Error fetching posts:', error);
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!db || !state.user) return;

      // Generate slug from title
      const slug = generateSlug(formData.title);
      console.log('Generated slug:', slug);

      const postData = {
        ...formData,
        slug,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        author: state.user.name,
        createdAt: serverTimestamp(),
        isPublished: formData.isPublished,
        publishedAt: formData.isPublished ? serverTimestamp() : null
      };

      console.log('Saving post data:', postData);

      if (editingPost) {
        await updateDoc(doc(db, 'blog_posts', editingPost.id), postData);
      } else {
        await addDoc(collection(db, 'blog_posts'), postData);
      }

      setShowCreateForm(false);
      setEditingPost(null);
      resetForm();
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.imageUrl || '',
      tags: post.tags.join(', '),
      readTime: post.readTime,
      isPublished: post.isPublished
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      if (!db) return;
      await deleteDoc(doc(db, 'blog_posts', postId));
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      if (!db) return;
      await updateDoc(doc(db, 'blog_posts', post.id), {
        isPublished: !post.isPublished,
        publishedAt: !post.isPublished ? serverTimestamp() : null
      });
      fetchPosts();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      imageUrl: '',
      tags: '',
      readTime: 5,
      isPublished: false
    });
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Draft';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const fixExistingPosts = async () => {
    try {
      if (!db) return;
      
      console.log('=== STARTING FIX EXISTING POSTS ===');
      console.log('All posts before fix:', posts.map(p => ({ id: p.id, title: p.title, slug: p.slug, isPublished: p.isPublished })));
      
      const postsWithoutSlugs = posts.filter(post => !post.slug);
      console.log('Posts without slugs:', postsWithoutSlugs);
      
      if (postsWithoutSlugs.length === 0) {
        console.log('No posts need fixing - all posts have slugs!');
        return;
      }
      
      for (const post of postsWithoutSlugs) {
        const slug = generateSlug(post.title);
        console.log(`Adding slug "${slug}" to post "${post.title}" (ID: ${post.id})`);
        
        await updateDoc(doc(db, 'blog_posts', post.id), {
          slug: slug
        });
        console.log(`✅ Successfully updated post ${post.id} with slug: ${slug}`);
      }
      
      console.log('=== FINISHED FIXING POSTS ===');
      console.log('Refreshing posts list...');
      await fetchPosts();
      console.log('Posts refreshed!');
    } catch (error) {
      console.error('Error fixing posts:', error);
    }
  };

  const fetchPendingComments = async () => {
    try {
      if (!db) return;
      
      setCommentsLoading(true);
      const q = query(
        collection(db, 'blog_comments'),
        where('isApproved', '==', false),
        where('isRejected', '==', false),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const commentsData: any[] = [];
      
      querySnapshot.forEach((doc) => {
        commentsData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setPendingComments(commentsData);
    } catch (error) {
      console.error('Error fetching pending comments:', error);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleApproveComment = async (commentId: string) => {
    try {
      if (!db || !state.user) return;
      
      await updateDoc(doc(db, 'blog_comments', commentId), {
        isApproved: true,
        isRejected: false,
        moderatedBy: state.user.email,
        moderatedAt: serverTimestamp()
      });
      
      fetchPendingComments();
    } catch (error) {
      console.error('Error approving comment:', error);
    }
  };

  const handleRejectComment = async (commentId: string) => {
    try {
      if (!db || !state.user) return;
      
      await updateDoc(doc(db, 'blog_comments', commentId), {
        isApproved: false,
        isRejected: true,
        moderatedBy: state.user.email,
        moderatedAt: serverTimestamp()
      });
      
      fetchPendingComments();
    } catch (error) {
      console.error('Error rejecting comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    
    try {
      if (!db) return;
      
      await deleteDoc(doc(db, 'blog_comments', commentId));
      fetchPendingComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (!state.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please log in to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  if (!isAdmin(state.user.email)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Access Required</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
          <p className="text-sm text-gray-500 mt-2">Contact the administrator if you believe this is an error.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
                 {/* Header */}
         <div className="flex justify-between items-center mb-8">
           <div>
             <h1 className="text-3xl font-bold text-gray-900 mb-2">📝 Blog Management</h1>
             <p className="text-gray-600">Manage your blog posts and content</p>
           </div>
           <div className="flex gap-4">
                           <button
                onClick={fixExistingPosts}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm"
              >
                🔧 Fix Slugs
              </button>
              <button
                onClick={() => {
                  console.log('=== CURRENT POSTS STATUS ===');
                  posts.forEach(post => {
                    console.log(`Post: "${post.title}" | Slug: "${post.slug}" | Published: ${post.isPublished}`);
                  });
                }}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm"
              >
                📊 Check Status
              </button>
              <button
                onClick={async () => {
                  console.log('=== TESTING DIRECT DATABASE ACCESS ===');
                  try {
                    if (!db) {
                      console.log('❌ Database not available');
                      return;
                    }
                    
                    // Test query for the specific slug
                    const testSlug = 'miodziki';
                    console.log(`Testing query for slug: "${testSlug}"`);
                    
                    const q = query(
                      collection(db, 'blog_posts'),
                      where('slug', '==', testSlug),
                      where('isPublished', '==', true)
                    );
                    
                    const querySnapshot = await getDocs(q);
                    console.log('Query result:', {
                      empty: querySnapshot.empty,
                      size: querySnapshot.size,
                      docs: querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        title: doc.data().title,
                        slug: doc.data().slug,
                        isPublished: doc.data().isPublished
                      }))
                    });
                  } catch (error) {
                    console.error('❌ Error testing database:', error);
                  }
                }}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm"
              >
                🧪 Test DB
              </button>
              <button
                onClick={async () => {
                  console.log('=== TESTING BLOG POSTS PERMISSIONS ===');
                  try {
                    if (!db) {
                      console.log('❌ Database not available');
                      return;
                    }
                    
                    // Test simple query without filters
                    console.log('Testing simple blog_posts query...');
                    const simpleQuery = query(collection(db, 'blog_posts'));
                    const simpleSnapshot = await getDocs(simpleQuery);
                    console.log('Simple query result:', {
                      empty: simpleSnapshot.empty,
                      size: simpleSnapshot.size,
                      docs: simpleSnapshot.docs.map(doc => ({
                        id: doc.id,
                        title: doc.data().title,
                        slug: doc.data().slug,
                        isPublished: doc.data().isPublished
                      }))
                    });
                    
                    // Test products query to see if it's a general permissions issue
                    console.log('Testing products query...');
                    const productsQuery = query(collection(db, 'products'));
                    const productsSnapshot = await getDocs(productsQuery);
                    console.log('Products query result:', {
                      empty: productsSnapshot.empty,
                      size: productsSnapshot.size
                    });
                    
                  } catch (error) {
                    console.error('❌ Error testing permissions:', error);
                    console.error('Error details:', {
                      code: error.code,
                      message: error.message,
                      stack: error.stack
                    });
                  }
                }}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm"
              >
                🔐 Test Permissions
              </button>
                           <button
                onClick={() => {
                  setShowCreateForm(true);
                  setEditingPost(null);
                  resetForm();
                }}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                + New Post
              </button>
              <button
                onClick={() => {
                  setShowComments(!showComments);
                  if (!showComments) {
                    fetchPendingComments();
                  }
                }}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                💬 Moderate Comments ({pendingComments.length})
              </button>
           </div>
         </div>

        {/* Create/Edit Form */}
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6">
              {editingPost ? 'Edit Post' : 'Create New Post'}
            </h2>
            
                                                 <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title and Image URL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    📝 Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                    placeholder="Enter your blog post title..."
                    className="w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-200 bg-white shadow-sm text-black placeholder-gray-500"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    This will be used to generate the URL slug automatically
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    🖼️ Featured Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-200 bg-white shadow-sm text-black placeholder-gray-500"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Optional: Add a featured image for your post
                  </p>
                </div>
              </div>

              {/* Excerpt */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  📄 Excerpt *
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  required
                  rows={3}
                  placeholder="Write a brief summary of your blog post..."
                  className="w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-200 bg-white shadow-sm resize-none text-black placeholder-gray-500"
                />
                <p className="text-xs text-gray-600 mt-1">
                  This will appear as a preview on the blog listing page
                </p>
              </div>

              {/* Content */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  ✍️ Content *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  required
                  rows={12}
                  placeholder="Write your blog post content here..."
                  className="w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-200 bg-white shadow-sm resize-none text-black placeholder-gray-500"
                />
                <p className="text-xs text-gray-600 mt-1">
                  Write your full blog post content. You can use line breaks for paragraphs.
                </p>
              </div>

              {/* Tags, Read Time, and Publish Settings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    🏷️ Tags
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    placeholder="health, recipes, tips"
                    className="w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-200 bg-white shadow-sm text-black placeholder-gray-500"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Separate tags with commas
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    ⏱️ Read Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.readTime}
                    onChange={(e) => setFormData({...formData, readTime: parseInt(e.target.value)})}
                    min="1"
                    className="w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-200 bg-white shadow-sm text-black"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Estimated reading time for visitors
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    📢 Publish Settings
                  </label>
                  <div className="flex items-center p-3 bg-white rounded-md border border-gray-200">
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                      className="mr-2 h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Publish immediately</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Uncheck to save as draft
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setEditingPost(null);
                    resetForm();
                  }}
                  className="px-6 py-2 text-sm font-semibold border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
                >
                  ❌ Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-semibold bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-md transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  {editingPost ? '💾 Update Post' : '✨ Create Post'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

                 {/* Comment Moderation */}
         {showComments && (
           <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-white rounded-xl shadow-lg p-6 mb-8"
           >
             <h2 className="text-2xl font-bold mb-6">💬 Comment Moderation</h2>
             
             {commentsLoading ? (
               <div className="text-center py-8">
                 <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                 <p className="text-gray-600">Loading pending comments...</p>
               </div>
             ) : pendingComments.length === 0 ? (
               <div className="text-center py-8">
                 <span className="text-4xl mb-4 block">✅</span>
                 <p className="text-gray-600">No pending comments to moderate!</p>
               </div>
             ) : (
               <div className="space-y-4">
                 {pendingComments.map((comment) => (
                   <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
                     <div className="flex justify-between items-start mb-3">
                       <div>
                         <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                         <p className="text-sm text-gray-500">{comment.authorEmail}</p>
                         <p className="text-sm text-gray-500">
                           On post: {posts.find(p => p.id === comment.postId)?.title || 'Unknown Post'}
                         </p>
                         <p className="text-sm text-gray-500">
                           {comment.createdAt?.toDate?.() ? 
                             comment.createdAt.toDate().toLocaleDateString() : 
                             'Unknown date'
                           }
                         </p>
                       </div>
                       <div className="flex space-x-2">
                         <button
                           onClick={() => handleApproveComment(comment.id)}
                           className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded transition-colors"
                         >
                           ✅ Approve
                         </button>
                         <button
                           onClick={() => handleRejectComment(comment.id)}
                           className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition-colors"
                         >
                           ❌ Reject
                         </button>
                         <button
                           onClick={() => handleDeleteComment(comment.id)}
                           className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded transition-colors"
                         >
                           🗑️ Delete
                         </button>
                       </div>
                     </div>
                     <p className="text-gray-700 bg-gray-50 p-3 rounded">{comment.content}</p>
                   </div>
                 ))}
               </div>
             )}
           </motion.div>
         )}

         {/* Posts List */}
         {loading ? (
           <div className="text-center py-12">
             <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
             <p className="text-gray-600">Loading posts...</p>
           </div>
         ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Post
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {post.excerpt}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          post.isPublished 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {post.author}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(post.publishedAt || post.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleEdit(post)}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => togglePublish(post)}
                          className={`${
                            post.isPublished 
                              ? 'text-orange-600 hover:text-orange-900' 
                              : 'text-green-600 hover:text-green-900'
                          }`}
                        >
                          {post.isPublished ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
