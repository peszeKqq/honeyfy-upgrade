'use client';

import { motion } from 'framer-motion';

export default function WebwinkelkeurTrustIcons() {
  return (
    <motion.div
      className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <div className="flex flex-col space-y-4">
        {/* Webwinkelkeur Verified Badge */}
        <motion.div
          className="bg-gradient-to-br from-magenta-500 to-pink-600 rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('https://www.webwinkelkeur.nl/', '_blank')}
        >
          <div className="flex flex-col items-center">
            {/* Speech bubble with checkmark */}
            <div className="relative w-12 h-12 mb-2">
              <svg
                className="w-full h-full"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Speech bubble outline */}
                <path
                  d="M8 8C8 5.79086 9.79086 4 12 4H28C30.2091 4 32 5.79086 32 8V20C32 22.2091 30.2091 24 28 24H20L16 28L12 24H8C5.79086 24 4 22.2091 4 20V8C4 5.79086 5.79086 4 8 4Z"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Speech bubble tail */}
                <path
                  d="M16 28L20 24H28C30.2091 24 32 22.2091 32 20V8C32 5.79086 30.2091 4 28 4H12C9.79086 4 8 5.79086 8 8V20C8 22.2091 9.79086 24 12 24H16V28Z"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Checkmark */}
                <path
                  d="M14 16L18 20L26 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-white text-xs font-semibold text-center">
              Verified
            </span>
          </div>
        </motion.div>

        {/* Webwinkelkeur Rating Badge */}
        <motion.div
          className="bg-gradient-to-br from-magenta-500 to-pink-600 rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('https://www.webwinkelkeur.nl/', '_blank')}
        >
          <div className="flex flex-col items-center">
            {/* Speech bubble with rating */}
            <div className="relative w-12 h-12 mb-2">
              <svg
                className="w-full h-full"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Speech bubble outline */}
                <path
                  d="M8 8C8 5.79086 9.79086 4 12 4H28C30.2091 4 32 5.79086 32 8V20C32 22.2091 30.2091 24 28 24H20L16 28L12 24H8C5.79086 24 4 22.2091 4 20V8C4 5.79086 5.79086 4 8 4Z"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Speech bubble tail */}
                <path
                  d="M16 28L20 24H28C30.2091 24 32 22.2091 32 20V8C32 5.79086 30.2091 4 28 4H12C9.79086 4 8 5.79086 8 8V20C8 22.2091 9.79086 24 12 24H16V28Z"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Rating text */}
                <text
                  x="24"
                  y="18"
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="Arial, sans-serif"
                >
                  9,5
                </text>
              </svg>
            </div>
            <span className="text-white text-xs font-semibold text-center">
              Rating
            </span>
          </div>
        </motion.div>

        {/* Trust indicator */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="text-white text-xs font-medium">
            Trusted Store
          </span>
        </motion.div>
      </div>

      {/* Hover tooltip */}
      <motion.div
        className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-black/90 text-white p-3 rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 w-48"
        initial={{ opacity: 0, x: -10 }}
        whileHover={{ opacity: 1, x: 0 }}
      >
        <div className="text-sm">
          <h4 className="font-semibold mb-1">Webwinkelkeur Certified</h4>
          <p className="text-xs text-gray-300">
            Verified online store with excellent customer satisfaction rating
          </p>
        </div>
        <div className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 w-0 h-0 border-l-4 border-l-black/90 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
      </motion.div>
    </motion.div>
  );
}
