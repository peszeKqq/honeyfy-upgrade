'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/ProductCard';
import StructuredData from '@/components/StructuredData';
import { generateProductStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo';
import HreflangTagsServer from '@/components/HreflangTagsServer';
import { getTranslatedProduct, getTranslatedCategory } from '@/lib/productTranslations';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentReviewPage, setCurrentReviewPage] = useState(0);

  const product = products.find(p => p.slug === params.slug);
  const translatedProduct = getTranslatedProduct(params.slug as string, 'pl');

  // Generate structured data for SEO
  const productSEO = product ? {
    id: product.id,
    name: translatedProduct?.name || product.name,
    slug: product.slug,
    description: translatedProduct?.description || product.description,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image,
    category: getTranslatedCategory(product.category, 'pl'),
    weight: product.weight,
    rating: product.rating,
    reviews: product.reviews,
    features: translatedProduct?.features || product.features,
    inStock: product.inStock,
  } : null;

  // Generate breadcrumb structured data
  const breadcrumbData = product ? generateBreadcrumbStructuredData([
    { name: 'Strona główna', url: 'http://localhost:3000/pl' },
    { name: 'Produkty', url: 'http://localhost:3000/pl/products' },
    { name: product.name, url: `http://localhost:3000/pl/products/${product.slug}` }
  ]) : null;

     // Original English reviews
   const getProductReviews = (productSlug: string) => {
     const allReviews = {
       'acacia-honey': [
         {
           id: 1,
           name: "Sarah Johnson",
           rating: 5,
           date: "2024-01-15",
           comment: "Absolutely love this acacia honey! It's so light and delicate, perfect for my morning tea. The quality is outstanding!"
         },
         {
           id: 2,
           name: "Michael Chen",
           rating: 4,
           date: "2024-01-14",
           comment: "Very light and smooth acacia honey. Perfect for those who prefer subtle sweetness. Great quality!"
         },
         {
           id: 3,
           name: "Emma Davis",
           rating: 5,
           date: "2024-01-13",
           comment: "This is my go-to honey now. The taste is incredible and it's so versatile. Highly recommend!"
         },
         {
           id: 4,
           name: "David Wilson",
           rating: 5,
           date: "2024-01-12",
           comment: "Premium quality honey with amazing flavor. Worth every penny. Will definitely order again!"
         }
       ]
     };
     return allReviews[productSlug as keyof typeof allReviews] || allReviews['acacia-honey'];
   };

  const reviews = getProductReviews(params.slug as string);
  const relatedProducts = products.filter(p => p.slug !== params.slug).slice(0, 6);

  useEffect(() => {
    if (!product) {
      router.push('/pl/products');
    }
  }, [product, router]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div className="text-center">
          <div className="text-6xl mb-4">🍯</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Produkt Nie Znaleziony</h2>
          <p className="text-gray-600 mb-4">Produkt, którego szukasz, nie istnieje.</p>
          <button
            onClick={() => router.push('/pl/products')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Powrót do Produktów
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
    router.push('/pl/checkout');
  };

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <>
      {productSEO && <StructuredData data={generateProductStructuredData(productSEO)} />}
      {breadcrumbData && <StructuredData data={breadcrumbData} />}
      <HreflangTagsServer pathname={`/pl/products/${product.slug}`} currentLocale="pl" />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-yellow-50 to-orange-50">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <motion.nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <button onClick={() => router.push('/pl')} className="hover:text-yellow-600 transition-colors">
                  Strona główna
                </button>
              </li>
              <li>/</li>
              <li>
                <button onClick={() => router.push('/pl/products')} className="hover:text-yellow-600 transition-colors">
                  Produkty
                </button>
              </li>
              <li>/</li>
              <li className="text-gray-900 font-medium">{product.name}</li>
            </ol>
          </motion.nav>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <motion.div>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="relative h-96 mb-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl overflow-hidden">
                  <Image
                    src={selectedImage === 0 ? `/${product.slug}.webp` : `/${product.slug}2.webp`}
                    alt={`${product.name} - Premium polski miód`}
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={85}
                  />
                </div>
                
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
                            alt={`${product.name} - ${index === 1 ? 'Widok główny' : 'Widok alternatywny'}`}
                            width={80}
                            height={80}
                            className="object-contain w-auto h-auto"
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
            <motion.div className="space-y-8">
                          <div className="text-yellow-600 font-medium">{getTranslatedCategory(product.category, 'pl')}</div>
            <h1 className="text-4xl font-bold text-gray-900">{translatedProduct?.name || product.name}</h1>
            
            <div className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
              {getTranslatedCategory(product.category, 'pl')}
            </div>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < Math.floor(averageRating) ? '★' : '☆'}</span>
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews} opinii)</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">€{product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">€{product.originalPrice.toFixed(2)}</span>
                )}
                {product.originalPrice && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Oszczędź €{(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">{translatedProduct?.description || product.description}</p>

              {/* Features */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Główne Cechy:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {(translatedProduct?.features || product.features).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <label className="font-medium text-gray-900">Ilość:</label>
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
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <motion.button
                  onClick={handleAddToCart}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-4 px-6 rounded-xl font-semibold transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Dodaj do Koszyka
                </motion.button>
                <motion.button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-4 px-6 rounded-xl font-semibold transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Kup Teraz
                </motion.button>
              </div>

              {/* Success Message */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-green-500 text-white p-4 rounded-xl text-center"
                  >
                    ✓ Pomyślnie dodano do koszyka!
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

                     {/* Reviews Section */}
           <motion.section className="mb-16">
             <div className="bg-white rounded-2xl shadow-xl p-8">
                               <h2 className="text-3xl font-bold text-gray-900 mb-8">Opinie Klientów</h2>
               
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
          <motion.section className="mb-16">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Odkryj Więcej</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div className="text-center p-6 border border-gray-200 rounded-xl hover:border-yellow-300 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-2">Wszystkie Produkty Miodowe</h3>
                  <p className="text-gray-600 text-sm mb-4">Przeglądaj naszą kompletną kolekcję premium polskiego miodu</p>
                  <button
                    onClick={() => router.push('/pl/products')}
                    className="text-yellow-600 hover:text-yellow-700 font-medium text-sm"
                  >
                    Zobacz Wszystkie Produkty →
                  </button>
                </motion.div>
                
                <motion.div className="text-center p-6 border border-gray-200 rounded-xl hover:border-yellow-300 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-2">Korzyści z Miodu</h3>
                  <p className="text-gray-600 text-sm mb-4">Dowiedz się o korzyściach zdrowotnych miodu i przepisach</p>
                  <button
                    onClick={() => router.push('/pl/blog')}
                    className="text-yellow-600 hover:text-yellow-700 font-medium text-sm"
                  >
                    Przeczytaj Nasz Blog →
                  </button>
                </motion.div>
                
                <motion.div className="text-center p-6 border border-gray-200 rounded-xl hover:border-yellow-300 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-2">Skontaktuj się z Nami</h3>
                  <p className="text-gray-600 text-sm mb-4">Skontaktuj się z naszymi ekspertami od miodu</p>
                  <button
                    onClick={() => router.push('/pl/contact')}
                    className="text-yellow-600 hover:text-yellow-700 font-medium text-sm"
                  >
                    Skontaktuj się →
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* You May Also Like Section */}
          <motion.section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Może Ci się Spodobać</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                             {relatedProducts.map((relatedProduct, index) => (
                 <motion.div
                   key={`${relatedProduct.id}-pl`}
                   initial={{ opacity: 0, y: 50 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: index * 0.1 }}
                   whileHover={{ y: -10 }}
                 >
                   <ProductCard product={relatedProduct} locale="pl" />
                 </motion.div>
               ))}
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
}
