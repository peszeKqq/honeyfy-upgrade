'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blog-posts';
import NewsletterSignup from '@/components/NewsletterSignup';
import StructuredData from '@/components/StructuredData';
import { generateBlogMetaTags, generateFAQStructuredData } from '@/lib/seo';
import HreflangTagsServer from '@/components/HreflangTagsServer';

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

export default function DutchBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Use static blog posts
    setPosts(blogPosts);
    setLoading(false);
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTag && matchesSearch;
  });

  const allTags = ['all', ...Array.from(new Set(posts.flatMap(post => post.tags)))];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('nl-NL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // FAQ data for structured data
  const faqs = [
    {
      question: "Wat zijn de gezondheidsvoordelen van Poolse honing?",
      answer: "Poolse honing biedt talrijke gezondheidsvoordelen, waaronder ondersteuning van het immuunsysteem, antioxiderende eigenschappen, natuurlijke energieboost, verbetering van de spijsvertering en antibacteriële eigenschappen."
    },
    {
      question: "Hoe verschilt Poolse honing van andere honingsoorten?",
      answer: "Poolse honing onderscheidt zich door traditionele bijenteeltmethoden, een ongerepte natuurlijke omgeving, diverse bloemenbronnen en superieure kwaliteitsstandaarden die generaties lang zijn gehandhaafd."
    },
    {
      question: "Welke honingvariëteit is het beste voor beginners?",
      answer: "Acaciahoning is perfect voor beginners vanwege zijn milde, delicate smaak en lichte kleur. Het kristalliseert ook langzaam en heeft een zachte zoetheid."
    },
    {
      question: "Hoe moet ik honing correct bewaren?",
      answer: "Bewaar honing op een koele, donkere plaats bij kamertemperatuur. Houd containers gesloten om vochtabsorptie te voorkomen en vermijd het gebruik van metalen keukengerei."
    },
    {
      question: "Kan ik honing gebruiken als suikervervanger?",
      answer: "Ja! Honing is een uitstekende natuurlijke suikervervanger. Gebruik 3/4 kop honing voor elke 1 kop suiker en verminder vloeistof met 1/4 kop in recepten."
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Blogberichten laden...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <HreflangTagsServer pathname="/nl/blog" currentLocale="nl" />
      
      {/* Structured Data for SEO */}
      <StructuredData data={generateFAQStructuredData(faqs)} />
      
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
        {/* Hero Section */}
        <div className="py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4 font-heading text-gray-900"
            >
              🍯 Honeyfy Blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto font-body mb-8"
            >
              Ontdek de zoete wereld van honing, van gezondheidsvoordelen tot heerlijke recepten. 
              Leer over Poolse honingtradities, duurzame bijenteelt en natuurlijke wellness.
            </motion.p>
            
            {/* Featured Stats */}
            <motion.div 
              className="flex flex-wrap justify-center gap-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{posts.length}</div>
                <div className="text-sm text-gray-600">Expert Artikelen</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">10+</div>
                <div className="text-sm text-gray-600">Honingvariëteiten</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">100%</div>
                <div className="text-sm text-gray-600">Natuurlijke Poolse Honing</div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Search and Filter */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input
                type="text"
                placeholder="Zoek berichten..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 placeholder-gray-500 font-medium"
              />
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 font-medium"
              >
                {allTags.map(tag => (
                  <option key={tag} value={tag}>
                    {tag === 'all' ? 'Alle Categorieën' : tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Blog Posts Grid */}
          {filteredPosts.length === 0 ? (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-6xl mb-4 block">🍯</span>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 font-heading">Geen berichten gevonden</h3>
              <p className="text-gray-600 font-body">
                {searchTerm || selectedTag !== 'all' 
                  ? 'Probeer je zoekcriteria of filter aan te passen.'
                  : 'Kom binnenkort terug voor nieuwe content!'
                }
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                >
                  <Link href={`/nl/blog/${post.slug}`} className="block">
                    <div className="h-48 overflow-hidden bg-gradient-to-br from-yellow-50 to-orange-50 cursor-pointer relative group">
                      {/* Honey-themed background pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 left-4 text-2xl">🍯</div>
                        <div className="absolute top-8 right-6 text-xl">🐝</div>
                        <div className="absolute bottom-6 left-8 text-lg">🌸</div>
                        <div className="absolute bottom-8 right-4 text-xl">🌿</div>
                      </div>
                      
                      {/* Main content */}
                      <div className="w-full h-full flex items-center justify-center relative z-10">
                        <div className="text-center group-hover:scale-110 transition-transform duration-300">
                          <div className="text-5xl mb-3 block group-hover:rotate-12 transition-transform duration-300">🍯</div>
                          <div className="text-yellow-600 text-sm font-medium font-heading">Honeyfy Blog</div>
                          <div className="text-yellow-500 text-xs mt-1 font-body">Zoete Verhalen</div>
                        </div>
                      </div>
                      
                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </Link>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      {post.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{post.tags.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 font-heading group-hover:text-yellow-600 transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3 font-body">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>Door {post.author}</span>
                      <span>{post.readTime} min leestijd</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {formatDate(post.publishedAt)}
                      </span>
                      <Link
                        href={`/nl/blog/${post.slug}`}
                        className="text-yellow-600 hover:text-yellow-700 font-semibold text-sm group-hover:underline transition-colors"
                      >
                        Lees Meer →
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* Newsletter Signup */}
          <motion.div 
            className="max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <NewsletterSignup />
          </motion.div>

          {/* FAQ Section */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center font-heading">Veelgestelde Vragen</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    className="border-b border-gray-200 pb-6 last:border-b-0"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 font-heading">{faq.question}</h3>
                    <p className="text-gray-600 font-body">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
}
