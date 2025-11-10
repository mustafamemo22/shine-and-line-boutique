export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  gender: "men" | "women" | "unisex";
  description: string;
  material: string;
  sizes?: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Lumos Stainless Steel Ring",
    price: 49.99,
    image: "/src/assets/product-ring-1.jpg",
    category: "Rings",
    gender: "unisex",
    description: "A polished, scratch-resistant ring available in multiple sizes. Perfect for everyday wear or special occasions.",
    material: "Stainless Steel 316L",
    sizes: ["6", "7", "8", "9", "10", "11"],
  },
  {
    id: "2",
    name: "Elegance Chain Necklace",
    price: 89.99,
    image: "/src/assets/product-necklace-1.jpg",
    category: "Necklaces",
    gender: "women",
    description: "Elegant stainless steel necklace with delicate pendant. Timeless design that complements any outfit.",
    material: "Stainless Steel 316L",
  },
  {
    id: "3",
    name: "Modern Link Bracelet",
    price: 64.99,
    image: "/src/assets/product-bracelet-1.jpg",
    category: "Bracelets",
    gender: "men",
    description: "Contemporary bracelet with modern link design. Durable and stylish for everyday wear.",
    material: "Stainless Steel 316L",
  },
  {
    id: "4",
    name: "Classic Hoop Earrings",
    price: 39.99,
    image: "/src/assets/product-earrings-1.jpg",
    category: "Earrings",
    gender: "women",
    description: "Timeless hoop earrings in polished stainless steel. Lightweight and comfortable for all-day wear.",
    material: "Stainless Steel 316L",
  },
  {
    id: "5",
    name: "Infinity Band Ring",
    price: 54.99,
    image: "/src/assets/product-ring-1.jpg",
    category: "Rings",
    gender: "women",
    description: "Beautiful infinity design symbolizing eternal love. Sleek and comfortable fit.",
    material: "Stainless Steel 316L",
    sizes: ["5", "6", "7", "8", "9"],
  },
  {
    id: "6",
    name: "Statement Chain Necklace",
    price: 99.99,
    image: "/src/assets/product-necklace-1.jpg",
    category: "Necklaces",
    gender: "men",
    description: "Bold chain necklace for a statement look. Premium quality with secure clasp.",
    material: "Stainless Steel 316L",
  },
  {
    id: "7",
    name: "Minimalist Bangle",
    price: 44.99,
    image: "/src/assets/product-bracelet-1.jpg",
    category: "Bracelets",
    gender: "women",
    description: "Simple yet elegant bangle bracelet. Perfect for stacking or wearing alone.",
    material: "Stainless Steel 316L",
  },
  {
    id: "8",
    name: "Stud Earrings Set",
    price: 34.99,
    image: "/src/assets/product-earrings-1.jpg",
    category: "Earrings",
    gender: "women",
    description: "Versatile stud earrings perfect for daily wear. Hypoallergenic and comfortable.",
    material: "Stainless Steel 316L",
  },
];
