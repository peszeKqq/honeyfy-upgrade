'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/ProductCard';
import StructuredData from '@/components/StructuredData';
import { generateProductStructuredData, generateBreadcrumbStructuredData, generateProductMetaTags, ProductSEO } from '@/lib/seo';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentReviewPage, setCurrentReviewPage] = useState(0);

  const product = products.find(p => p.slug === params.slug);

  // Generate structured data for SEO
  const productSEO: ProductSEO | null = product ? {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image,
    category: product.category,
    weight: product.weight,
    rating: product.rating,
    reviews: product.reviews,
    features: product.features,
    inStock: product.inStock,
  } : null;

  // Generate breadcrumb structured data
  const breadcrumbData = product ? generateBreadcrumbStructuredData([
    { name: 'Home', url: 'https://honeyfy.nl' },
    { name: 'Products', url: 'https://honeyfy.nl/products' },
    { name: product.name, url: `https://honeyfy.nl/products/${product.slug}` }
  ]) : null;

  // Function to get unique reviews for each product
  const getProductReviews = (productSlug: string) => {
    const allReviews = {
      'heather-honey': [
        {
          id: 1,
          name: "Anna Kowalska",
          rating: 5,
          date: "2024-01-15",
          comment: "Wspaniały wrzosowy miód! Smak jest intensywny i aromatyczny. Idealny do herbaty i jako naturalny słodzik."
        },
        {
          id: 2,
          name: "Sarah Johnson",
          rating: 5,
          date: "2024-01-14",
          comment: "This heather honey is absolutely divine! The flavor is so unique and rich. Perfect for my morning tea."
        },
        {
          id: 3,
          name: "Piotr Nowak",
          rating: 5,
          date: "2024-01-12",
          comment: "Najlepszy miód wrzosowy, jaki kiedykolwiek próbowałem. Jakość jest wyjątkowa, a smak niezapomniany!"
        },
        {
          id: 4,
          name: "Emma Davis",
          rating: 4,
          date: "2024-01-10",
          comment: "Excellent heather honey with a distinctive taste. The texture is perfect and it's great for baking."
        },
        {
          id: 5,
          name: "Jan Kowalczyk",
          rating: 5,
          date: "2024-01-08",
          comment: "Doskonała jakość miodu wrzosowego z Polski. Różnica w smaku jest ogromna w porównaniu z innymi miodami."
        }
      ],
      'acacia-honey': [
        {
          id: 6,
          name: "Maria Wiśniewska",
          rating: 5,
          date: "2024-01-16",
          comment: "Miód akacjowy jest niesamowicie delikatny i słodki. Idealny dla dzieci i osób lubiących łagodne smaki."
        },
        {
          id: 7,
          name: "Michael Chen",
          rating: 4,
          date: "2024-01-14",
          comment: "Very light and smooth acacia honey. Perfect for those who prefer subtle sweetness. Great quality!"
        },
        {
          id: 8,
          name: "Katarzyna Lewandowska",
          rating: 5,
          date: "2024-01-12",
          comment: "Uwielbiam miód akacjowy! Jest taki delikatny i nie krystalizuje się. Polecam wszystkim!"
        },
        {
          id: 9,
          name: "David Wilson",
          rating: 4,
          date: "2024-01-10",
          comment: "Smooth and mild acacia honey. Great for tea and toast. The quality is outstanding."
        },
        {
          id: 10,
          name: "Tomasz Zieliński",
          rating: 5,
          date: "2024-01-08",
          comment: "Najlepszy miód akacjowy z Polski. Smak jest wyjątkowo delikatny i aromatyczny."
        }
      ],
      'rapeseed-honey': [
        {
          id: 11,
          name: "Lisa Brown",
          rating: 4,
          date: "2024-01-17",
          comment: "Great rapeseed honey! It has a unique taste and crystallizes beautifully. Perfect for spreading."
        },
        {
          id: 12,
          name: "Andrzej Nowak",
          rating: 5,
          date: "2024-01-15",
          comment: "Miód rzepakowy jest wyjątkowy! Krystalizuje się szybko i ma wspaniały smak. Polecam!"
        },
        {
          id: 13,
          name: "Jennifer Smith",
          rating: 4,
          date: "2024-01-13",
          comment: "Lovely rapeseed honey with a distinctive flavor. Great texture and perfect for baking."
        },
        {
          id: 14,
          name: "Marek Kowalski",
          rating: 5,
          date: "2024-01-11",
          comment: "Doskonały miód rzepakowy z Polski. Jakość jest najwyższa, a smak niezapomniany."
        },
        {
          id: 15,
          name: "Amanda Johnson",
          rating: 4,
          date: "2024-01-09",
          comment: "Excellent rapeseed honey. The crystallization is perfect and the taste is wonderful."
        }
      ],
      'bee-pollen': [
        {
          id: 16,
          name: "Robert Wiśniewski",
          rating: 5,
          date: "2024-01-18",
          comment: "Pyłek pszczeli jest niesamowity! Daje mi dużo energii i wzmacnia odporność. Polecam!"
        },
        {
          id: 17,
          name: "Sophie Martin",
          rating: 4,
          date: "2024-01-16",
          comment: "Great bee pollen! I add it to my smoothies and feel more energetic throughout the day."
        },
        {
          id: 18,
          name: "Grzegorz Kowalczyk",
          rating: 5,
          date: "2024-01-14",
          comment: "Najlepszy pyłek pszczeli z Polski! Jakość jest wyjątkowa, a efekty zdrowotne widoczne."
        },
        {
          id: 19,
          name: "Rachel Green",
          rating: 4,
          date: "2024-01-12",
          comment: "Excellent bee pollen quality. I use it daily and notice improved energy levels."
        },
        {
          id: 20,
          name: "Dariusz Lewandowski",
          rating: 5,
          date: "2024-01-10",
          comment: "Pyłek pszczeli jest świetny dla zdrowia! Smak jest naturalny i nie jest zbyt intensywny."
        }
      ],
      'coniferous-honeydew-honey': [
        {
          id: 21,
          name: "Monika Nowak",
          rating: 5,
          date: "2024-01-19",
          comment: "Miód spadziowy jest wyjątkowy! Ma intensywny smak i jest bardzo zdrowy. Uwielbiam!"
        },
        {
          id: 22,
          name: "Thomas Anderson",
          rating: 4,
          date: "2024-01-17",
          comment: "Unique honeydew honey with a rich, complex flavor. Very different from regular honey."
        },
        {
          id: 23,
          name: "Agnieszka Kowalska",
          rating: 5,
          date: "2024-01-15",
          comment: "Najlepszy miód spadziowy z Polski! Smak jest intensywny i bardzo charakterystyczny."
        },
        {
          id: 24,
          name: "Christopher Lee",
          rating: 4,
          date: "2024-01-13",
          comment: "Excellent honeydew honey. The flavor is distinctive and it's great for health benefits."
        },
        {
          id: 25,
          name: "Ewa Zielińska",
          rating: 5,
          date: "2024-01-11",
          comment: "Miód spadziowy jest bardzo zdrowy i smaczny. Idealny dla osób ceniących naturalne produkty."
        }
      ],
      'raspberry-honey': [
        {
          id: 26,
          name: "Natalia Wiśniewska",
          rating: 5,
          date: "2024-01-20",
          comment: "Miód malinowy jest przepyszny! Ma delikatny owocowy smak i piękny kolor. Polecam!"
        },
        {
          id: 27,
          name: "Alex Thompson",
          rating: 4,
          date: "2024-01-18",
          comment: "Lovely raspberry honey with a subtle fruity taste. Perfect for desserts and tea."
        },
        {
          id: 28,
          name: "Karolina Nowak",
          rating: 5,
          date: "2024-01-16",
          comment: "Najlepszy miód malinowy z Polski! Smak jest delikatny i bardzo przyjemny."
        },
        {
          id: 29,
          name: "Daniel Brown",
          rating: 4,
          date: "2024-01-14",
          comment: "Great raspberry honey. The flavor is unique and it's perfect for sweetening beverages."
        },
        {
          id: 30,
          name: "Magdalena Kowalczyk",
          rating: 5,
          date: "2024-01-12",
          comment: "Miód malinowy jest wyjątkowy! Idealny do herbaty i jako dodatek do deserów."
        }
      ],
      'linden-honey': [
        {
          id: 31,
          name: "Piotr Zieliński",
          rating: 5,
          date: "2024-01-21",
          comment: "Miód lipowy jest świetny na przeziębienia! Ma wspaniały smak i właściwości lecznicze."
        },
        {
          id: 32,
          name: "Sarah Williams",
          rating: 4,
          date: "2024-01-19",
          comment: "Excellent linden honey. Great for soothing sore throats and it tastes wonderful."
        },
        {
          id: 33,
          name: "Marek Wiśniewski",
          rating: 5,
          date: "2024-01-17",
          comment: "Najlepszy miód lipowy z Polski! Idealny na zimowe wieczory i problemy z gardłem."
        },
        {
          id: 34,
          name: "Emily Davis",
          rating: 4,
          date: "2024-01-15",
          comment: "Great linden honey for colds and flu. The taste is mild and soothing."
        },
        {
          id: 35,
          name: "Tomasz Nowak",
          rating: 5,
          date: "2024-01-13",
          comment: "Miód lipowy jest niezastąpiony w sezonie przeziębień. Smak jest delikatny i leczniczy."
        }
      ],
      'buckwheat-honey': [
        {
          id: 36,
          name: "Anna Lewandowska",
          rating: 5,
          date: "2024-01-22",
          comment: "Miód gryczany jest intensywny i aromatyczny! Ma charakterystyczny smak i jest bardzo zdrowy."
        },
        {
          id: 37,
          name: "James Wilson",
          rating: 4,
          date: "2024-01-20",
          comment: "Strong and distinctive buckwheat honey. Very different from other honeys, but excellent quality."
        },
        {
          id: 38,
          name: "Katarzyna Kowalska",
          rating: 5,
          date: "2024-01-18",
          comment: "Najlepszy miód gryczany z Polski! Smak jest intensywny i bardzo charakterystyczny."
        },
        {
          id: 39,
          name: "Robert Johnson",
          rating: 4,
          date: "2024-01-16",
          comment: "Excellent buckwheat honey with a robust flavor. Perfect for those who like strong tastes."
        },
        {
          id: 40,
          name: "Monika Zielińska",
          rating: 5,
          date: "2024-01-14",
          comment: "Miód gryczany jest wyjątkowy! Ma intensywny smak i jest bardzo zdrowy dla organizmu."
        }
      ],
      'goldenrod-honey': [
        {
          id: 41,
          name: "Grzegorz Nowak",
          rating: 5,
          date: "2024-01-23",
          comment: "Miód nawłociowy jest delikatny i aromatyczny! Ma piękny złoty kolor i wspaniały smak."
        },
        {
          id: 42,
          name: "Lisa Anderson",
          rating: 4,
          date: "2024-01-21",
          comment: "Lovely goldenrod honey with a mild, pleasant taste. Perfect for everyday use."
        },
        {
          id: 43,
          name: "Dariusz Kowalczyk",
          rating: 5,
          date: "2024-01-19",
          comment: "Najlepszy miód nawłociowy z Polski! Smak jest delikatny i bardzo przyjemny."
        },
        {
          id: 44,
          name: "Michael Smith",
          rating: 4,
          date: "2024-01-17",
          comment: "Great goldenrod honey. The flavor is mild and it's perfect for tea and toast."
        },
        {
          id: 45,
          name: "Ewa Wiśniewska",
          rating: 5,
          date: "2024-01-15",
          comment: "Miód nawłociowy jest wyjątkowy! Ma delikatny smak i piękny kolor."
        }
      ],
      'multiflower-honey': [
        {
          id: 46,
          name: "Jan Kowalski",
          rating: 5,
          date: "2024-01-24",
          comment: "Miód wielokwiatowy jest uniwersalny! Ma zrównoważony smak i jest idealny do wszystkiego."
        },
        {
          id: 47,
          name: "Jessica Brown",
          rating: 4,
          date: "2024-01-22",
          comment: "Perfect multiflower honey for everyday use. Balanced flavor and great quality."
        },
        {
          id: 48,
          name: "Andrzej Wiśniewski",
          rating: 5,
          date: "2024-01-20",
          comment: "Najlepszy miód wielokwiatowy z Polski! Uniwersalny smak i doskonała jakość."
        },
        {
          id: 49,
          name: "David Miller",
          rating: 4,
          date: "2024-01-18",
          comment: "Excellent multiflower honey. Versatile and perfect for all uses."
        },
        {
          id: 50,
          name: "Magdalena Nowak",
          rating: 5,
          date: "2024-01-16",
          comment: "Miód wielokwiatowy jest świetny! Ma zrównoważony smak i jest idealny do codziennego użytku."
        }
      ]
    };

    return allReviews[productSlug as keyof typeof allReviews] || allReviews['multiflower-honey'];
  };

  // Get reviews for this specific product
  const reviews = getProductReviews(params.slug as string);

  const relatedProducts = products.filter(p => p.slug !== params.slug).slice(0, 6);

  useEffect(() => {
    if (!product) {
      router.push('/products');
    }
  }, [product, router]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🍯</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/products')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Products
          </button>
        </motion.div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <>
      {/* Structured Data for SEO */}
      {productSEO && (
        <StructuredData data={generateProductStructuredData(productSEO)} />
      )}
      {breadcrumbData && (
        <StructuredData data={breadcrumbData} />
      )}
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-yellow-50 to-orange-50">
        <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.nav 
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <button 
                onClick={() => router.push('/')}
                className="hover:text-yellow-600 transition-colors"
              >
                Home
              </button>
            </li>
            <li>/</li>
            <li>
              <button 
                onClick={() => router.push('/products')}
                className="hover:text-yellow-600 transition-colors"
              >
                Products
              </button>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </motion.nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="relative h-96 mb-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl overflow-hidden">
                <Image
                  src={selectedImage === 0 ? `/${product.slug}.webp` : `/${product.slug}2.webp`}
                  alt={`${product.name} - Premium Polish honey with ${product.category.toLowerCase()} quality`}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={85}
                />
              </div>
              
              {/* Image Gallery - Only 2 images per product */}
              <div className="flex space-x-4">
                {[1, 2].map((index) => {
                  const imageName = product.slug;
                  const imageSrc = index === 1 ? `/${imageName}.webp` : `/${imageName}2.webp`;
                  
                  return (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedImage(index - 1)}
                      className={`w-20 h-20 rounded-lg border-2 overflow-hidden ${
                        selectedImage === index - 1 ? 'border-yellow-500' : 'border-gray-200'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center">
                        <Image
                          src={imageSrc}
                          alt={`${product.name} - ${index === 1 ? 'Main view' : 'Alternative view'} of premium Polish honey`}
                          width={80}
                          height={80}
                          className="object-contain"
                          quality={75}
                        />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Category */}
            <motion.div 
              className="text-yellow-600 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {product.category}
            </motion.div>

            {/* Title */}
            <motion.h1 
              className="text-4xl font-bold text-gray-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {product.name}
            </motion.h1>
            
            {/* Product Category Badge */}
            <motion.div 
              className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              {product.category}
            </motion.div>

            {/* Rating */}
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <motion.span 
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6 + i * 0.1, type: "spring", stiffness: 500 }}
                  >
                    {i < Math.floor(averageRating) ? '★' : '☆'}
                  </motion.span>
                ))}
              </div>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </motion.div>

            {/* Price */}
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <span className="text-3xl font-bold text-gray-900">
                €{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  €{product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.originalPrice && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Save €{(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </motion.div>

            {/* Description */}
            <motion.p 
              className="text-gray-600 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {product.description}
            </motion.p>

            {/* Features */}
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <h3 className="font-semibold text-gray-900">Key Features:</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quantity Selector */}
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <label className="font-medium text-gray-900">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors text-black font-semibold"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300 text-black font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors text-black font-semibold"
                >
                  +
                </button>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <motion.button
                onClick={handleAddToCart}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-4 px-6 rounded-xl font-semibold transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Add to Cart
              </motion.button>
              <motion.button
                onClick={handleBuyNow}
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-4 px-6 rounded-xl font-semibold transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Buy Now
              </motion.button>
            </motion.div>

            {/* Success Message */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-green-500 text-white p-4 rounded-xl text-center"
                >
                  ✓ Added to cart successfully!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {reviews.slice(currentReviewPage * 2, (currentReviewPage + 1) * 2).map((review, index) => (
                <motion.div
                  key={review.id}
                  className="border border-gray-200 rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{review.name}</h3>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{review.comment}</p>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </motion.div>
              ))}
            </div>

            {/* Review Pagination */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(reviews.length / 2) }, (_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrentReviewPage(i)}
                  className={`w-3 h-3 rounded-full ${
                    currentReviewPage === i ? 'bg-yellow-500' : 'bg-gray-300'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* Internal Links Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Discover More</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                className="text-center p-6 border border-gray-200 rounded-xl hover:border-yellow-300 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-semibold text-gray-900 mb-2">All Honey Products</h3>
                <p className="text-gray-600 text-sm mb-4">Browse our complete collection of premium Polish honey</p>
                <button
                  onClick={() => router.push('/products')}
                  className="text-yellow-600 hover:text-yellow-700 font-medium text-sm"
                >
                  View All Products →
                </button>
              </motion.div>
              
              <motion.div
                className="text-center p-6 border border-gray-200 rounded-xl hover:border-yellow-300 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-semibold text-gray-900 mb-2">Honey Benefits</h3>
                <p className="text-gray-600 text-sm mb-4">Learn about honey health benefits and recipes</p>
                <button
                  onClick={() => router.push('/blog')}
                  className="text-yellow-600 hover:text-yellow-700 font-medium text-sm"
                >
                  Read Our Blog →
                </button>
              </motion.div>
              
              <motion.div
                className="text-center p-6 border border-gray-200 rounded-xl hover:border-yellow-300 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-semibold text-gray-900 mb-2">Contact Us</h3>
                <p className="text-gray-600 text-sm mb-4">Get in touch with our honey experts</p>
                <button
                  onClick={() => router.push('/contact')}
                  className="text-yellow-600 hover:text-yellow-700 font-medium text-sm"
                >
                  Get in Touch →
                </button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* You May Also Like Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">You May Also Like</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <ProductCard product={relatedProduct} />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
    </>
  );
}
