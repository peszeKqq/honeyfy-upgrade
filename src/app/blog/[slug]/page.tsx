'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blog-posts';
import NewsletterSignup from '@/components/NewsletterSignup';
import StructuredData from '@/components/StructuredData';
import { generateBlogMetaTags, generateBreadcrumbStructuredData } from '@/lib/seo';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  imageUrl?: string;
  tags: string[];
  readTime: number;
  isPublished: boolean;
  slug: string;
  metaDescription: string;
  metaKeywords: string[];
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = params.slug as string;
    const foundPost = blogPosts.find(p => p.slug === slug);
    
    if (foundPost) {
      setPost(foundPost);
      // Get related posts (same tags or category)
      const related = blogPosts
        .filter(p => p.slug !== slug && p.tags.some(tag => foundPost.tags.includes(tag)))
        .slice(0, 3);
      setRelatedPosts(related);
    } else {
      router.push('/blog');
    }
    setLoading(false);
  }, [params.slug, router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  // Generate breadcrumb structured data
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: 'Home', url: 'https://honeyfy.nl' },
    { name: 'Blog', url: 'https://honeyfy.nl/blog' },
    { name: post.title, url: `https://honeyfy.nl/blog/${post.slug}` }
  ]);

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={breadcrumbData} />
      
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
        {/* Breadcrumb */}
        <motion.nav 
          className="container mx-auto px-4 py-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-yellow-600 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-yellow-600 transition-colors">
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium line-clamp-1">{post.title}</li>
          </ol>
        </motion.nav>

        <div className="container mx-auto px-4 py-8">
          {/* Article Header */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Article Meta */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading leading-tight">
                {post.title}
              </h1>
              
              <div className="flex items-center space-x-6 text-gray-600 mb-8">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-600">👤</span>
                  <span>By {post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-600">📅</span>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-600">⏱️</span>
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8">
              <div className="relative h-64 md:h-96 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">🍯</div>
                    <div className="text-yellow-600 text-lg font-medium font-heading">Honeyfy Blog</div>
                    <div className="text-yellow-500 text-sm font-body">Sweet Stories</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
              <div 
                className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:font-body prose-strong:text-yellow-600 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Article Footer */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
              <div className="border-t border-gray-200 pt-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">About the Author</h3>
                    <p className="text-gray-600">{post.author}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Published on {formatDate(post.publishedAt)}</p>
                    <p className="text-sm text-gray-500">{post.readTime} minute read</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Share this article:</span>
                  <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </button>
                  <button className="p-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-16"
            >
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center font-heading">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost, index) => (
                    <motion.article
                      key={relatedPost.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                    >
                      <Link href={`/blog/${relatedPost.slug}`} className="block">
                        <div className="h-32 bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center">
                          <div className="text-3xl group-hover:scale-110 transition-transform duration-300">🍯</div>
                        </div>
                      </Link>
                      
                      <div className="p-6">
                        <div className="flex items-center space-x-2 mb-3">
                          {relatedPost.tags.slice(0, 2).map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 font-heading group-hover:text-yellow-600 transition-colors">
                          {relatedPost.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 font-body">
                          {relatedPost.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{relatedPost.readTime} min read</span>
                          <Link
                            href={`/blog/${relatedPost.slug}`}
                            className="text-yellow-600 hover:text-yellow-700 font-semibold"
                          >
                            Read More →
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {/* Newsletter Signup */}
          <motion.div 
            className="max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <NewsletterSignup />
          </motion.div>

          {/* Back to Blog */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <span>←</span>
              <span>Back to Blog</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
