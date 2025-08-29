'use client';

import { useState } from 'react';
import { getBlogTranslation } from '@/lib/blogTranslations';

interface Comment {
  id: string;
  name: string;
  email: string;
  comment: string;
  date: string;
}

interface CommentsProps {
  locale: string;
  postSlug: string;
}

export default function Comments({ locale, postSlug }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.name || !newComment.email || !newComment.comment) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call - in a real app, this would save to a database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const comment: Comment = {
        id: Date.now().toString(),
        name: newComment.name,
        email: newComment.email,
        comment: newComment.comment,
        date: new Date().toISOString()
      };

      setComments(prev => [comment, ...prev]);
      setNewComment({ name: '', email: '', comment: '' });
      setSubmitStatus('success');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'nl' ? 'nl-NL' : 'pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 font-heading">
        {getBlogTranslation(locale, 'comments')}
      </h3>

      {/* Comment Form */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          {getBlogTranslation(locale, 'addComment')}
        </h4>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                {getBlogTranslation(locale, 'name')}
              </label>
              <input
                type="text"
                id="name"
                value={newComment.name}
                onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                placeholder={getBlogTranslation(locale, 'enterYourName')}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {getBlogTranslation(locale, 'email')}
              </label>
              <input
                type="email"
                id="email"
                value={newComment.email}
                onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                placeholder={getBlogTranslation(locale, 'enterYourEmail')}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              {getBlogTranslation(locale, 'comment')}
            </label>
            <textarea
              id="comment"
              value={newComment.comment}
              onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
              required
              rows={4}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 resize-none"
              placeholder={getBlogTranslation(locale, 'enterYourComment')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{getBlogTranslation(locale, 'submitting')}</span>
                </div>
              ) : (
                getBlogTranslation(locale, 'submitComment')
              )}
            </button>
            
            {submitStatus === 'success' && (
              <p className="text-green-600 text-sm font-medium">
                {getBlogTranslation(locale, 'commentSubmitted')}
              </p>
            )}
            
            {submitStatus === 'error' && (
              <p className="text-red-600 text-sm font-medium">
                {getBlogTranslation(locale, 'commentError')}
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">💬</div>
            <p className="text-gray-600 font-body">
              {getBlogTranslation(locale, 'noComments')}
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 font-semibold">
                    {comment.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h5 className="font-semibold text-gray-900">{comment.name}</h5>
                    <span className="text-gray-500 text-sm">•</span>
                    <span className="text-gray-500 text-sm">{formatDate(comment.date)}</span>
                  </div>
                  
                  <p className="text-gray-700 font-body leading-relaxed">
                    {comment.comment}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
