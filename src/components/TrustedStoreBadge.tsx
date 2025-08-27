'use client';

import { motion } from 'framer-motion';

export default function TrustedStoreBadge() {
  return (
    <>
      {/* Desktop Trust Badge */}
      <motion.div
        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
                 <div className="flex flex-col space-y-1">
                     {/* Trusted Store Badge */}
           <motion.div
             className="bg-gradient-to-br from-yellow-500/90 to-orange-500/90 backdrop-blur-sm rounded-lg p-1 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
             whileHover={{ scale: 1.05, y: -2 }}
             whileTap={{ scale: 0.95 }}
           >
             <div className="flex flex-col items-center">
               <div className="relative w-8 h-8 mb-1">
                 <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
                   <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                 </svg>
               </div>
               <span className="text-white text-xs font-semibold text-center">Trusted Store</span>
             </div>
           </motion.div>

           {/* Rating Badge */}
           <motion.div
             className="bg-gradient-to-br from-yellow-500/90 to-orange-500/90 backdrop-blur-sm rounded-lg p-1 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
             whileHover={{ scale: 1.05, y: -2 }}
             whileTap={{ scale: 0.95 }}
           >
             <div className="flex flex-col items-center">
               <div className="relative w-6 h-8 mb-3">
                 <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
                   <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center">
                   <span className="text-white text-l font-bold">9.9</span>
                 </div>
               </div>
             </div>
           </motion.div>
        </div>

        {/* Hover tooltip */}
        <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
            Trusted by our customers
          </div>
        </div>
      </motion.div>

             {/* Mobile Trust Badge */}
       <motion.div
         className="fixed bottom-4 left-4 z-30 lg:hidden"
         initial={{ opacity: 0, y: 50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, delay: 1.5 }}
       >
         <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500/90 to-orange-500/90 backdrop-blur-sm rounded-lg p-1 shadow-lg">
           <div className="w-6 h-6 relative">
             <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
               <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
             </svg>
           </div>
           <div className="text-white text-xs">
             <div className="font-semibold">Trusted Store</div>
             <div className="text-yellow-200">9.8 Rating</div>
           </div>
         </div>
       </motion.div>
    </>
  );
}
