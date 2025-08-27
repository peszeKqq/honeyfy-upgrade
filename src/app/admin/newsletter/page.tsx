'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, orderBy, getDocs, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Subscriber {
  id: string;
  email: string;
  discountCode: string;
  discountUsed: boolean;
  subscribedAt: any;
  lastEmailSent: any;
  isActive: boolean;
}

interface Campaign {
  id: string;
  type: string;
  subject: string;
  sentAt: any;
  totalSubscribers: number;
  sentCount: number;
  failedCount: number;
}

export default function NewsletterAdmin() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState<'all' | 'custom' | 'limit'>('all');
  const [limitCount, setLimitCount] = useState(100);
  const [showSubscriberList, setShowSubscriberList] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch subscribers
      const subscribersQuery = query(
        collection(db, 'newsletter_subscribers'),
        orderBy('subscribedAt', 'desc')
      );
      const subscribersSnapshot = await getDocs(subscribersQuery);
      const subscribersData = subscribersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Subscriber[];
      setSubscribers(subscribersData);

      // Fetch campaigns
      const campaignsQuery = query(
        collection(db, 'newsletter_campaigns'),
        orderBy('sentAt', 'desc')
      );
      const campaignsSnapshot = await getDocs(campaignsQuery);
      const campaignsData = campaignsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Campaign[];
      setCampaigns(campaignsData);

    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSendNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    setSuccess(null);

    // Determine which subscribers to send to
    let targetSubscribers: string[] = [];
    
    if (selectionMode === 'all') {
      targetSubscribers = subscribers.filter(s => s.isActive).map(s => s.id);
    } else if (selectionMode === 'limit') {
      targetSubscribers = subscribers
        .filter(s => s.isActive)
        .slice(0, limitCount)
        .map(s => s.id);
    } else if (selectionMode === 'custom') {
      targetSubscribers = selectedSubscribers;
    }

    if (targetSubscribers.length === 0) {
      setError('No subscribers selected');
      setSending(false);
      return;
    }

    try {
      const response = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject,
          content,
          type: 'newsletter',
          subscriberIds: targetSubscribers
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send newsletter');
      }

      setSuccess(`Newsletter sent successfully! ${data.stats.sent} emails sent, ${data.stats.failed} failed.`);
      setSubject('');
      setContent('');
      setSelectedSubscribers([]);
      setSelectionMode('all');
      
      // Refresh data
      await fetchData();
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(null), 5000);
      
    } catch (err: any) {
      console.error('Newsletter send error:', err);
      setError(err.message || 'Failed to send newsletter');
    } finally {
      setSending(false);
    }
  };

  const handleSelectAll = () => {
    const activeSubscriberIds = subscribers.filter(s => s.isActive).map(s => s.id);
    setSelectedSubscribers(activeSubscriberIds);
  };

  const handleDeselectAll = () => {
    setSelectedSubscribers([]);
  };

  const handleSubscriberToggle = (subscriberId: string) => {
    setSelectedSubscribers(prev => 
      prev.includes(subscriberId) 
        ? prev.filter(id => id !== subscriberId)
        : [...prev, subscriberId]
    );
  };

  const getSelectedCount = () => {
    if (selectionMode === 'all') {
      return subscribers.filter(s => s.isActive).length;
    } else if (selectionMode === 'limit') {
      return Math.min(limitCount, subscribers.filter(s => s.isActive).length);
    } else {
      return selectedSubscribers.length;
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Never';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading newsletter data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">📧 Newsletter Management</h1>
            <p className="text-gray-600 text-lg">Manage subscribers and send newsletters</p>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4"
            >
              <p className="text-green-700">{success}</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4"
            >
              <p className="text-red-700">{error}</p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Send Newsletter Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Newsletter</h2>
              
              <form onSubmit={handleSendNewsletter}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Subject</label>
                                     <input
                     type="text"
                     value={subject}
                     onChange={(e) => setSubject(e.target.value)}
                     placeholder="Enter email subject"
                     required
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black bg-white"
                   />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Content (HTML)</label>
                                     <textarea
                     value={content}
                     onChange={(e) => setContent(e.target.value)}
                     placeholder="Enter email content (HTML supported)"
                     required
                     rows={8}
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black bg-white"
                   />
                  <p className="text-sm text-gray-500 mt-2">
                    Use {'{{SUBSCRIBER_NAME}}'} and {'{{DISCOUNT_CODE}}'} for personalization
                  </p>
                </div>

                {/* Subscriber Selection */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-3">Recipient Selection</label>
                  
                  <div className="space-y-3">
                    {/* Selection Mode */}
                    <div className="flex flex-wrap gap-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="selectionMode"
                          value="all"
                          checked={selectionMode === 'all'}
                          onChange={(e) => setSelectionMode(e.target.value as 'all')}
                          className="mr-2"
                        />
                                                 <span className="text-sm text-black">All Active ({subscribers.filter(s => s.isActive).length})</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="selectionMode"
                          value="limit"
                          checked={selectionMode === 'limit'}
                          onChange={(e) => setSelectionMode(e.target.value as 'limit')}
                          className="mr-2"
                        />
                                                 <span className="text-sm text-black">Limit to:</span>
                                                 <input
                           type="number"
                           value={limitCount}
                           onChange={(e) => setLimitCount(parseInt(e.target.value) || 100)}
                           min="1"
                           max="1000"
                           className="ml-2 w-20 px-2 py-1 border border-gray-300 rounded text-sm text-black bg-white"
                         />
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="selectionMode"
                          value="custom"
                          checked={selectionMode === 'custom'}
                          onChange={(e) => setSelectionMode(e.target.value as 'custom')}
                          className="mr-2"
                        />
                                                 <span className="text-sm text-black">Custom Selection ({selectedSubscribers.length})</span>
                      </label>
                    </div>

                    {/* Custom Selection Controls */}
                    {selectionMode === 'custom' && (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleSelectAll}
                          className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                        >
                          Select All
                        </button>
                        <button
                          type="button"
                          onClick={handleDeselectAll}
                          className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
                        >
                          Deselect All
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowSubscriberList(!showSubscriberList)}
                          className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                        >
                          {showSubscriberList ? 'Hide' : 'Show'} Subscriber List
                        </button>
                      </div>
                    )}

                    {/* Subscriber List */}
                    {selectionMode === 'custom' && showSubscriberList && (
                      <div className="max-h-48 overflow-y-auto border border-gray-200 rounded p-3 bg-gray-50">
                        {subscribers.filter(s => s.isActive).map((subscriber) => (
                          <label key={subscriber.id} className="flex items-center py-1">
                            <input
                              type="checkbox"
                              checked={selectedSubscribers.includes(subscriber.id)}
                              onChange={() => handleSubscriberToggle(subscriber.id)}
                              className="mr-2"
                            />
                                                         <span className="text-sm text-black">
                               {subscriber.email} 
                               <span className="text-gray-600 ml-2">
                                 ({formatDate(subscriber.subscribedAt)})
                               </span>
                             </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg transition-all duration-300"
                >
                  {sending ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    `Send to ${getSelectedCount()} subscribers`
                  )}
                </button>
              </form>
            </div>

            {/* Subscribers Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Subscribers</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-3xl font-bold text-yellow-600">{subscribers.length}</div>
                  <div className="text-sm text-gray-600">Total Subscribers</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">
                    {subscribers.filter(s => s.isActive).length}
                  </div>
                  <div className="text-sm text-gray-600">Active Subscribers</div>
                </div>
              </div>

              <div className="max-h-64 overflow-y-auto">
                {subscribers.slice(0, 10).map((subscriber) => (
                  <div key={subscriber.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                                         <div>
                       <div className="font-medium text-black">{subscriber.email}</div>
                       <div className="text-sm text-gray-600">
                         Joined: {formatDate(subscriber.subscribedAt)}
                       </div>
                     </div>
                    <div className="text-right">
                      <div className="text-sm font-mono text-yellow-600">{subscriber.discountCode}</div>
                                             <div className="text-xs text-gray-600">
                         {subscriber.discountUsed ? 'Used' : 'Available'}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Campaigns */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Campaigns</h2>
            
            {campaigns.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No campaigns sent yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Subject</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Sent</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Failed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((campaign) => (
                      <tr key={campaign.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {formatDate(campaign.sentAt)}
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-900">
                          {campaign.subject}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {campaign.type}
                        </td>
                        <td className="py-3 px-4 text-sm text-green-600">
                          {campaign.sentCount}
                        </td>
                        <td className="py-3 px-4 text-sm text-red-600">
                          {campaign.failedCount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
