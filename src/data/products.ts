export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  size: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
  new?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Rose Éternelle",
    brand: "Tréchi",
    price: 185,
    originalPrice: 220,
    image: "https://images.unsplash.com/photo-1594035910387-fea4779426e9?w=500&h=600&fit=crop",
    category: "Women",
    description: "A timeless fragrance capturing the essence of a thousand roses. Elegant, sophisticated, and utterly irresistible.",
    notes: {
      top: ["Bergamot", "Saffron", "Pink Pepper"],
      middle: ["Turkish Rose", "Bulgarian Rose", "Jasmine"],
      base: ["Oud", "Amber", "Vanilla"]
    },
    size: "100ml",
    rating: 4.9,
    reviews: 234,
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "Noir Intense",
    brand: "Tréchi",
    price: 195,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&h=600&fit=crop",
    category: "Men",
    description: "A bold and mysterious scent for the modern gentleman. Dark, seductive, and unforgettable.",
    notes: {
      top: ["Black Pepper", "Cardamom", "Lavender"],
      middle: ["Oud", "Leather", "Tobacco"],
      base: ["Amber", "Patchouli", "Musk"]
    },
    size: "100ml",
    rating: 4.8,
    reviews: 189,
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: "Jardin Secret",
    brand: "Tréchi",
    price: 165,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&h=600&fit=crop",
    category: "Women",
    description: "A fresh and floral escape to a hidden garden. Light, airy, and naturally beautiful.",
    notes: {
      top: ["Green Tea", "Fig", "Citrus"],
      middle: ["Freesia", "Lily", "Peony"],
      base: ["Cedarwood", "White Musk", "Moss"]
    },
    size: "75ml",
    rating: 4.7,
    reviews: 156,
    inStock: true,
    new: true
  },
  {
    id: 4,
    name: "Oceanic Blue",
    brand: "Tréchi",
    price: 145,
    image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=500&h=600&fit=crop",
    category: "Men",
    description: "Dive into the depths of freshness. A marine fragrance that captures the spirit of adventure.",
    notes: {
      top: ["Sea Salt", "Bergamot", "Grapefruit"],
      middle: ["Sage", "Geranium", "Jasmine"],
      base: ["Driftwood", "Amber", "Cedar"]
    },
    size: "100ml",
    rating: 4.6,
    reviews: 201,
    inStock: true
  },
  {
    id: 5,
    name: "Vanilla Orchid",
    brand: "Tréchi",
    price: 175,
    image: "https://images.unsplash.com/photo-1585232561307-356511848571?w=500&h=600&fit=crop",
    category: "Women",
    description: "Warm, creamy vanilla meets delicate orchid. A comforting yet luxurious scent.",
    notes: {
      top: ["Mandarin", "Pear", "Saffron"],
      middle: ["Orchid", "Tuberose", "Heliotrope"],
      base: ["Vanilla", "Tonka Bean", "Sandalwood"]
    },
    size: "100ml",
    rating: 4.9,
    reviews: 312,
    inStock: true,
    featured: true
  },
  {
    id: 6,
    name: "Oud Royal",
    brand: "Tréchi Prestige",
    price: 350,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=600&fit=crop",
    category: "Unisex",
    description: "The pinnacle of luxury. Rare oud blended with precious ingredients for an extraordinary experience.",
    notes: {
      top: ["Saffron", "Rose", "Bergamot"],
      middle: ["Cambodi Oud", "Agarwood", "Incense"],
      base: ["Ambergris", "Musk", "Leather"]
    },
    size: "50ml",
    rating: 5.0,
    reviews: 87,
    inStock: true,
    featured: true
  },
  {
    id: 7,
    name: "Citrus Bloom",
    brand: "Tréchi",
    price: 125,
    image: "https://images.unsplash.com/photo-1615160849325-7c9398d5e6e7?w=500&h=600&fit=crop",
    category: "Women",
    description: "Energizing citrus meets soft florals. Perfect for daytime wear and sunny days.",
    notes: {
      top: ["Lemon", "Orange", "Neroli"],
      middle: ["Orange Blossom", "Jasmine", "Rose"],
      base: ["White Cedar", "Musk", "Amber"]
    },
    size: "75ml",
    rating: 4.5,
    reviews: 143,
    inStock: true,
    new: true
  },
  {
    id: 8,
    name: "Spice Route",
    brand: "Tréchi",
    price: 165,
    image: "https://images.unsplash.com/photo-1519669556878-63bd08be7067?w=500&h=600&fit=crop",
    category: "Men",
    description: "An exotic journey through ancient spice markets. Warm, aromatic, and adventurous.",
    notes: {
      top: ["Cinnamon", "Nutmeg", "Ginger"],
      middle: ["Cumin", "Coriander", "Cardamom"],
      base: ["Sandalwood", "Vetiver", "Amber"]
    },
    size: "100ml",
    rating: 4.7,
    reviews: 178,
    inStock: true
  },
  {
    id: 9,
    name: "Midnight Rose",
    brand: "Tréchi",
    price: 195,
    originalPrice: 230,
    image: "https://images.unsplash.com/photo-1588405764423-72654f0c8a52?w=500&h=600&fit=crop",
    category: "Women",
    description: "A rose that blooms only at midnight. Mysterious, romantic, and utterly captivating.",
    notes: {
      top: ["Black Currant", "Bergamot", "Champagne"],
      middle: ["Dark Rose", "Iris", "Plum"],
      base: ["Patchouli", "Vanilla", "Musk"]
    },
    size: "100ml",
    rating: 4.8,
    reviews: 267,
    inStock: true,
    featured: true
  },
  {
    id: 10,
    name: "Santal Wood",
    brand: "Tréchi",
    price: 185,
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=500&h=600&fit=crop",
    category: "Unisex",
    description: "Pure sandalwood elegance. Minimalist, refined, and effortlessly sophisticated.",
    notes: {
      top: ["Cardamom", "Bergamot", "Fig"],
      middle: ["Sandalwood", "Cedar", "Orris"],
      base: ["Amber", "Musk", "Cashmeran"]
    },
    size: "100ml",
    rating: 4.7,
    reviews: 145,
    inStock: true
  },
  {
    id: 11,
    name: "Aqua Fresca",
    brand: "Tréchi",
    price: 115,
    image: "https://images.unsplash.com/photo-1605618879600-f27c4c1556ae?w=500&h=600&fit=crop",
    category: "Men",
    description: "Crisp, clean, and refreshing. Like a cool breeze on a summer day.",
    notes: {
      top: ["Cucumber", "Mint", "Lime"],
      middle: ["Marine Notes", "Basil", "Geranium"],
      base: ["White Woods", "Musk", "Amber"]
    },
    size: "100ml",
    rating: 4.4,
    reviews: 198,
    inStock: true
  },
  {
    id: 12,
    name: "Amber Elixir",
    brand: "Tréchi Prestige",
    price: 275,
    image: "https://images.unsplash.com/photo-1512777576255-a8d56a6a75c5?w=500&h=600&fit=crop",
    category: "Unisex",
    description: "Liquid gold in a bottle. Rich amber resin blended with rare ingredients.",
    notes: {
      top: ["Orange Blossom", "Saffron", "Pink Pepper"],
      middle: ["Amber", "Labdanum", "Benzoin"],
      base: ["Oud", "Vanilla", "Leather"]
    },
    size: "75ml",
    rating: 4.9,
    reviews: 92,
    inStock: true,
    featured: true
  }
];

export const categories = ["All", "Women", "Men", "Unisex"];

export const brands = ["All", "Tréchi", "Tréchi Prestige"];
