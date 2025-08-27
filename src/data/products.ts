export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  categories?: string[];
  weight: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  features: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Heather Honey",
    slug: "heather-honey",
    description: "Premium heather honey from the Polish Highlands - a rare and distinctive honey with a strong, aromatic flavor and amber color. Rich in minerals, antioxidants, and natural enzymes. Perfect for tea, baking, and as a natural sweetener. Known for its unique taste and health benefits.",
    price: 16.99,
    image: "/heather-honey.webp",
    category: "Bestseller",
    categories: ["Bestseller", "Premium"],
    weight: "1.2kg",
    inStock: true,
    rating: 4.9,
    reviews: 156,
    features: ["Rare Polish Highland Honey", "Strong Aromatic Flavor", "Rich in Minerals", "Antioxidant Properties"]
  },
  {
    id: "2",
    name: "Acacia Honey",
    slug: "acacia-honey",
    description: "Pure Polish acacia honey with a light, delicate flavor and crystal-clear appearance. Known for its slow crystallization and mild sweetness. Ideal for diabetics, tea lovers, and those who prefer subtle honey flavors. Contains natural enzymes and antibacterial properties.",
    price: 15.99,
    image: "/acacia-honey.webp",
    category: "Premium",
    categories: ["Premium", "Classic"],
    weight: "1.2kg",
    inStock: true,
    rating: 4.8,
    reviews: 203,
    features: ["Polish Acacia Honey", "Light & Delicate", "Slow Crystallization", "Diabetic Friendly"]
  },
  {
    id: "3",
    name: "Rapeseed Honey (Canola Honey)",
    slug: "rapeseed-honey",
    description: "Smooth and creamy Polish rapeseed honey with a mild, pleasant taste and rapid crystallization. Rich in glucose and perfect for spreading on bread, toast, and pastries. Contains natural antioxidants and is a great source of energy. Popular choice for baking and cooking.",
    price: 14.99,
    image: "/canola-honey.webp",
    category: "Classic",
    categories: ["Classic"],
    weight: "1.2kg",
    inStock: true,
    rating: 4.7,
    reviews: 189,
    features: ["Polish Rapeseed Honey", "Creamy Texture", "Mild Flavor", "Perfect for Spreading"]
  },
  {
    id: "4",
    name: "Bee Pollen",
    slug: "bee-pollen",
    description: "Pure Polish bee pollen granules - nature's most complete superfood. Packed with proteins, vitamins, minerals, and antioxidants. Supports immune system, energy levels, and overall wellness. Perfect for smoothies, yogurt, or as a natural supplement. Harvested sustainably from our Polish hives.",
    price: 14.99,
    image: "/beepollen.webp",
    category: "Bestseller",
    categories: ["Bestseller", "Superfood", "Wellness"],
    weight: "500g",
    inStock: true,
    rating: 4.9,
    reviews: 234,
    features: ["Polish Bee Pollen", "Complete Superfood", "Immune Support", "Energy Boost"]
  },
  {
    id: "5",
    name: "Coniferous Honeydew Honey",
    slug: "coniferous-honeydew-honey",
    description: "Unique Polish honeydew honey from coniferous forests with a rich, malty flavor and dark amber color. Produced by bees collecting honeydew from tree sap. High in minerals, especially iron and potassium. Perfect for cooking, marinades, and as a natural sweetener with character.",
    price: 15.99,
    image: "/coniferous-honeydew-honey.webp",
    category: "Premium",
    categories: ["Premium", "Dark Honey"],
    weight: "1.2kg",
    inStock: true,
    rating: 4.6,
    reviews: 98,
    features: ["Polish Forest Honeydew", "Rich Malty Flavor", "High in Minerals", "Unique Taste"]
  },
  {
    id: "6",
    name: "Raspberry Honey",
    slug: "raspberry-honey",
    description: "Delightful Polish raspberry honey with subtle berry notes and a light, fruity aroma. Made from bees foraging on Polish raspberry blossoms. Perfect for desserts, fruit salads, and as a natural sweetener for beverages. Contains natural antioxidants and a unique flavor profile.",
    price: 15.99,
    image: "/raspberry-honey.webp",
    category: "Bestseller",
    categories: ["Bestseller", "Fruit Honey"],
    weight: "1.2kg",
    inStock: true,
    rating: 4.8,
    reviews: 167,
    features: ["Polish Raspberry Honey", "Berry Notes", "Fruity Aroma", "Perfect for Desserts"]
  },
  {
    id: "7",
    name: "Linden Honey",
    slug: "linden-honey",
    description: "Soothing Polish linden honey with a mild, floral taste and calming properties. Traditionally used for relaxation and sleep support. Light amber color with a delicate aroma. Perfect for evening tea, natural remedies, and those seeking a gentle honey experience.",
    price: 14.99,
    image: "/linden-honey.webp",
    category: "Wellness",
    categories: ["Wellness", "Classic"],
    weight: "1.2kg",
    inStock: true,
    rating: 4.7,
    reviews: 145,
    features: ["Polish Linden Honey", "Calming Properties", "Mild Floral Taste", "Sleep Support"]
  },
  {
    id: "8",
    name: "Buckwheat Honey",
    slug: "buckwheat-honey",
    description: "Dark, robust Polish buckwheat honey with a strong, molasses-like flavor and rich mineral content. High in antioxidants and iron. Perfect for strong tea, marinades, and as a natural sweetener with character. Popular among honey connoisseurs for its distinctive taste.",
    price: 14.99,
    image: "/buckwheat-honey.webp",
    category: "Dark Honey",
    categories: ["Dark Honey","Classic"],
    weight: "1.2kg",
    inStock: true,
    rating: 4.5,
    reviews: 112,
    features: ["Polish Buckwheat Honey", "Strong Molasses Flavor", "High in Iron", "Antioxidant Rich"]
  },
  {
    id: "9",
    name: "Goldenrod Honey",
    slug: "goldenrod-honey",
    description: "Bright Polish goldenrod honey with a distinctive, slightly spicy flavor and golden color. Late-season honey with a unique taste profile. Rich in natural enzymes and antioxidants. Perfect for autumn recipes, tea, and as a natural sweetener with character.",
    price: 14.99,
    image: "/goldenrod-honey.webp",
    category: "Classic",
    weight: "1.2kg",
    inStock: true,
    rating: 4.6,
    reviews: 89,
    features: ["Polish Goldenrod Honey", "Distinctive Spicy Flavor", "Late Season Honey", "Natural Enzymes"]
  },
  {
    id: "10",
    name: "Multiflower Honey",
    slug: "multiflower-honey",
    description: "Classic Polish multiflower honey with a balanced, complex flavor from diverse floral sources. Versatile and popular choice for everyday use. Contains a wide range of natural nutrients and enzymes. Perfect for tea, baking, cooking, and as a natural sweetener.",
    price: 12.99,
    originalPrice: 14.99,
    image: "/multiflower-honey.webp",
    category: "SALE!",
    categories: ["SALE!", "Classic"],
    weight: "1.2kg",
    inStock: true,
    rating: 4.8,
    reviews: 278,
    features: ["Polish Multiflower Honey", "Balanced Flavor", "Versatile Use", "Natural Nutrients"]
  }
];

export const categories = [
  "All",
  "Bestseller",
  "Premium",
  "Classic",
  "Superfood",
  "Fruit Honey",
  "Wellness",
  "Dark Honey",
  "SALE!"
];
