import Image from "next/image";
import ProductsSection from "@/components/ProductsSection";
import VideoBackground from "@/components/VideoBackground";

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
        {/* Optimized Video Background from Envato Elements */}
        <VideoBackground 
          videoSrc="/honey-video.mp4"
          fallbackImage="/honey-fallback.jpg"
        />
        
        {/* Luxury Background Pattern (subtle overlay) */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Hero Section */}
        <main className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo/Brand */}
            <div className="mb-12">
              <h1 className="text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  🍯 Honeyfy
                </span>
              </h1>
              <p className="text-2xl text-yellow-200 font-light tracking-wide">
                Premium Natural Honey from Sustainable Beekeeping
              </p>
            </div>

            {/* Hero Content */}
            <div className="mb-16">
              <h2 className="text-5xl font-bold text-white mb-8">
                Discover Nature's Sweetest Gift
              </h2>
              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Experience the pure taste of natural honey, carefully harvested from our 
                sustainable beekeeping practices. Every jar contains the essence of 
                nature's finest nectar, crafted with luxury and care.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button className="group relative bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 border-2 border-yellow-400">
                  <span className="relative z-10">Shop Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold py-4 px-10 rounded-full transition-all duration-300 hover:shadow-yellow-500/25 transform hover:scale-105">
                  Learn More
                </button>
              </div>
            </div>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
              <div className="group text-center p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">🌿</div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">100% Natural</h3>
                <p className="text-gray-300 leading-relaxed">Pure honey without any additives or preservatives, harvested with care</p>
              </div>
              <div className="group text-center p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">🐝</div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">Sustainable</h3>
                <p className="text-gray-300 leading-relaxed">Ethical beekeeping practices that protect our environment and future</p>
              </div>
              <div className="group text-center p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">🏆</div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">Premium Quality</h3>
                <p className="text-gray-300 leading-relaxed">Carefully selected and tested for the highest luxury standards</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Products Section */}
      <ProductsSection />
    </>
  );
}
