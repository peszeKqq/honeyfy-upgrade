'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, where, orderBy, getDocs, addDoc, updateDoc, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { isAdmin } from '@/lib/admin';

interface Comment {
  id: string;
  postId: string;
  author: string;
  authorEmail: string;
  content: string;
  createdAt: any;
  isApproved: boolean;
  isRejected: boolean;
  moderatedBy?: string;
  moderatedAt?: any;
}

interface BlogCommentsProps {
  postId: string;
  postSlug: string;
}

export default function BlogComments({ postId, postSlug }: BlogCommentsProps) {
  const { state } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      if (!db) return;

      const q = query(
        collection(db, 'blog_comments'),
        where('postId', '==', postId),
        where('isApproved', '==', true),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const commentsData: Comment[] = [];
      
      querySnapshot.forEach((doc) => {
        commentsData.push({
          id: doc.id,
          ...doc.data()
        } as Comment);
      });

      setComments(commentsData);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!state.user) {
      setShowLoginPrompt(true);
      return;
    }

    if (!newComment.trim()) return;

    setSubmitting(true);
    
    try {
      if (!db) return;

      const commentData = {
        postId,
        postSlug,
        author: state.user.name || 'Anonymous',
        authorEmail: state.user.email,
        content: newComment.trim(),
        createdAt: serverTimestamp(),
        isApproved: false,
        isRejected: false
      };

      await addDoc(collection(db, 'blog_comments'), commentData);
      
      setNewComment('');
      setShowLoginPrompt(false);
      
      // Show success message
      alert('Comment submitted successfully! It will be reviewed by an admin before appearing.');
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Error submitting comment. Please try again.');
    } finally {
      setSubmitting(false);
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

      fetchComments();
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

      fetchComments();
    } catch (error) {
      console.error('Error rejecting comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    
    try {
      if (!db) return;

      await deleteDoc(doc(db, 'blog_comments', commentId));
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-gray-600">Loading comments...</p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 font-heading">Comments ({comments.length})</h3>
      
      {/* Comment Form */}
             <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
         <h4 className="text-lg font-semibold text-gray-900 mb-4 font-heading">Leave a Comment</h4>
        
        {showLoginPrompt && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-yellow-800">
              Please log in to leave a comment.
            </p>
          </div>
        )}
        
                 <form onSubmit={handleSubmitComment}>
           <textarea
             value={newComment}
             onChange={(e) => setNewComment(e.target.value)}
             placeholder={state.user ? "Share your thoughts..." : "Please log in to comment"}
             disabled={!state.user || submitting}
             rows={4}
             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 resize-none text-black placeholder-gray-500"
           />
          
                     <div className="flex justify-between items-center mt-4">
             <p className="text-sm text-gray-600 font-body">
               {state.user ? `Commenting as ${state.user.name || state.user.email}` : 'Please log in to comment'}
             </p>
            
                         <button
               type="submit"
               disabled={!state.user || !newComment.trim() || submitting}
               className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-body"
             >
               {submitting ? 'Submitting...' : 'Post Comment'}
             </button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="text-center py-8">
          <span className="text-4xl mb-4 block">💬</span>
          <p className="text-gray-600">No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-semibold text-gray-900">{comment.author}</h5>
                  <p className="text-sm text-gray-500">{formatDate(comment.createdAt)}</p>
                </div>
                
                {isAdmin(state.user?.email) && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              
              <p className="text-gray-700 leading-relaxed">{comment.content}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
