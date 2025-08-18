export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  weight: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  features: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Wildflower Honey",
    description: "Pure wildflower honey harvested from diverse floral sources. Rich, complex flavor with natural sweetness.",
    price: 12.99,
    originalPrice: 15.99,
    image: "🍯",
    category: "Natural Honey",
    weight: "500g",
    inStock: true,
    rating: 4.8,
    reviews: 127,
    features: ["100% Natural", "No Additives", "Rich Flavor", "Sustainable"]
  },
  {
    id: "2",
    name: "Manuka Honey",
    description: "Premium Manuka honey with high antibacterial properties. Perfect for health-conscious consumers.",
    price: 29.99,
    originalPrice: 34.99,
    image: "🍯",
    category: "Premium Honey",
    weight: "250g",
    inStock: true,
    rating: 4.9,
    reviews: 89,
    features: ["High MGO", "Antibacterial", "Premium Quality", "Health Benefits"]
  },
  {
    id: "3",
    name: "Orange Blossom Honey",
    description: "Delicate orange blossom honey with citrus notes. Perfect for tea and desserts.",
    price: 14.99,
    image: "🍯",
    category: "Flavored Honey",
    weight: "500g",
    inStock: true,
    rating: 4.7,
    reviews: 156,
    features: ["Citrus Notes", "Light Flavor", "Versatile", "Organic"]
  },
  {
    id: "4",
    name: "Raw Forest Honey",
    description: "Unprocessed raw honey from forest sources. Maintains all natural enzymes and nutrients.",
    price: 18.99,
    image: "🍯",
    category: "Raw Honey",
    weight: "500g",
    inStock: true,
    rating: 4.6,
    reviews: 203,
    features: ["Unprocessed", "Natural Enzymes", "Forest Source", "Nutrient Rich"]
  },
  {
    id: "5",
    name: "Lavender Honey",
    description: "Aromatic lavender honey with floral notes. Ideal for relaxation and wellness.",
    price: 16.99,
    image: "🍯",
    category: "Flavored Honey",
    weight: "500g",
    inStock: false,
    rating: 4.8,
    reviews: 67,
    features: ["Lavender Notes", "Relaxing", "Aromatic", "Wellness"]
  },
  {
    id: "6",
    name: "Buckwheat Honey",
    description: "Dark, robust buckwheat honey with strong flavor. Rich in antioxidants and minerals.",
    price: 13.99,
    image: "🍯",
    category: "Natural Honey",
    weight: "500g",
    inStock: true,
    rating: 4.5,
    reviews: 94,
    features: ["Dark Flavor", "Antioxidants", "Mineral Rich", "Robust Taste"]
  }
];

export const categories = [
  "All",
  "Natural Honey",
  "Premium Honey", 
  "Flavored Honey",
  "Raw Honey"
];
