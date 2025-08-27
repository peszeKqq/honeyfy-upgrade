'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingContactWidget() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsApp = () => {
    const phoneNumber = '31685713773';
    const message = 'Hi! I have a question about your honey products.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    console.log('WhatsApp URL:', whatsappUrl);
    
    // Simple direct approach
    window.location.href = whatsappUrl;
  };

  const handleFacebook = () => {
    const facebookUrl = 'https://www.facebook.com/profile.php?id=100090174670745'
    
    console.log('Facebook URL:', facebookUrl);
    
    // Simple direct approach
    window.location.href = facebookUrl;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
             {/* Main floating button */}
       <motion.button
         onClick={() => setIsExpanded(!isExpanded)}
         className="w-12 h-12 sm:w-auto sm:h-14 bg-gradient-to-r from-yellow-500/90 to-orange-500/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center sm:px-4 gap-2"
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
         initial={{ scale: 0, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{ delay: 1, type: "spring", stiffness: 300 }}
       >
         <motion.div
           animate={{ rotate: isExpanded ? 180 : 0 }}
           transition={{ duration: 0.3 }}
         >
           <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
           </svg>
         </motion.div>
         <span className="hidden sm:inline text-white font-medium text-sm">Quick Contact</span>
       </motion.button>

      {/* Floating contact options */}
      <AnimatePresence>
        {isExpanded && (
          <div className="absolute bottom-16 right-0 space-y-3">
                         {/* WhatsApp */}
             <motion.button
               onClick={(e) => {
                 e.stopPropagation();
                 console.log('WhatsApp button clicked!');
                 handleWhatsApp();
               }}
               className="w-12 h-12 bg-gradient-to-r from-green-500/80 to-green-600/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
               initial={{ scale: 0, opacity: 0, y: 10 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0, opacity: 0, y: 10 }}
               transition={{ delay: 0.05, duration: 0.2, type: "spring", stiffness: 500 }}
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9 }}
             >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              
              {/* Tooltip */}
              <div className="absolute right-14 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Chat on WhatsApp
              </div>
            </motion.button>

                         {/* Facebook */}
             <motion.button
               onClick={(e) => {
                 e.stopPropagation();
                 console.log('Facebook button clicked!');
                 handleFacebook();
               }}
               className="w-12 h-12 bg-gradient-to-r from-blue-500/80 to-blue-600/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
               initial={{ scale: 0, opacity: 0, y: 10 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0, opacity: 0, y: 10 }}
               transition={{ delay: 0.1, duration: 0.2, type: "spring", stiffness: 500 }}
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9 }}
             >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              
              {/* Tooltip */}
              <div className="absolute right-14 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Visit Facebook
              </div>
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      
    </div>
  );
}
