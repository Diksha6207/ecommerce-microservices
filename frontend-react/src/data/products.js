const products = [
  // ==================== MEN ====================

  {
    id: 1,
    name: "Oversized Cotton T-Shirt",
    category: "Men",
    type: "T-Shirts",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Relaxed-fit cotton T-shirt designed for everyday comfort and casual styling.",
  },
  {
    id: 2,
    name: "Classic Denim Jacket",
    category: "Men",
    type: "Jackets",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Classic denim jacket with a versatile design for casual everyday outfits.",
  },
  {
    id: 3,
    name: "Straight Fit Jeans",
    category: "Men",
    type: "Jeans",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
    sizes: ["30", "32", "34", "36"],
    description:
      "Comfortable straight-fit jeans with a timeless everyday silhouette.",
  },
  {
    id: 4,
    name: "Casual Cotton Shirt",
    category: "Men",
    type: "Shirts",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Soft cotton casual shirt suitable for everyday and smart-casual looks.",
  },
  {
    id: 5,
    name: "Regular Fit Polo",
    category: "Men",
    type: "T-Shirts",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1625910513413-5fc45e44c5c8?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Clean regular-fit polo shirt with a classic casual appearance.",
  },
  {
    id: 6,
    name: "Relaxed Cargo Pants",
    category: "Men",
    type: "Trousers",
    price: 1799,
    image:
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b3?auto=format&fit=crop&w=800&q=80",
    sizes: ["30", "32", "34", "36"],
    description:
      "Relaxed cargo pants with practical pockets and comfortable styling.",
  },
  {
    id: 7,
    name: "Premium Hoodie",
    category: "Men",
    type: "Hoodies",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Warm premium hoodie designed for comfortable everyday wear.",
  },
  {
    id: 8,
    name: "Linen Casual Shirt",
    category: "Men",
    type: "Shirts",
    price: 1599,
    image:
      "https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Lightweight linen shirt perfect for relaxed and summer outfits.",
  },
  {
    id: 9,
    name: "Slim Fit Chinos",
    category: "Men",
    type: "Trousers",
    price: 1699,
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
    sizes: ["30", "32", "34", "36"],
    description:
      "Modern slim-fit chinos designed for smart casual outfits.",
  },
  {
    id: 10,
    name: "Classic Bomber Jacket",
    category: "Men",
    type: "Jackets",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Classic bomber jacket with a clean silhouette and everyday styling.",
  },
  {
    id: 11,
    name: "Graphic Streetwear Tee",
    category: "Men",
    type: "T-Shirts",
    price: 1099,
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Contemporary graphic T-shirt inspired by modern streetwear.",
  },
  {
    id: 12,
    name: "Winter Knit Sweater",
    category: "Men",
    type: "Sweaters",
    price: 2199,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Soft knit sweater designed to keep you warm during colder days.",
  },
  {
    id: 13,
    name: "Formal Oxford Shirt",
    category: "Men",
    type: "Shirts",
    price: 1799,
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Refined Oxford shirt suitable for office and formal occasions.",
  },
  {
    id: 14,
    name: "Classic Track Jacket",
    category: "Men",
    type: "Jackets",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Lightweight track jacket made for active and casual styling.",
  },
  {
    id: 15,
    name: "Essential Black T-Shirt",
    category: "Men",
    type: "T-Shirts",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f37f4678?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Essential black T-shirt that works effortlessly with everyday outfits.",
  },

  // ==================== WOMEN ====================

  {
    id: 16,
    name: "Floral Summer Dress",
    category: "Women",
    type: "Dresses",
    price: 1599,
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Elegant floral summer dress with a lightweight and comfortable fit.",
  },
  {
    id: 17,
    name: "Everyday Hoodie",
    category: "Women",
    type: "Hoodies",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Comfortable everyday hoodie designed for relaxed styling.",
  },
  {
    id: 18,
    name: "Tailored Women's Blazer",
    category: "Women",
    type: "Blazers",
    price: 2799,
    image:
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=800&q=80",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Tailored blazer designed for polished professional and smart-casual looks.",
  },
  {
    id: 19,
    name: "Ribbed Everyday Top",
    category: "Women",
    type: "Tops",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Minimal ribbed top designed for versatile everyday outfits.",
  },
  {
    id: 20,
    name: "Wide Leg Trousers",
    category: "Women",
    type: "Trousers",
    price: 1699,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Comfortable wide-leg trousers with a modern relaxed silhouette.",
  },
  {
    id: 21,
    name: "Classic Denim Jacket",
    category: "Women",
    type: "Jackets",
    price: 2399,
    image:
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=80",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Versatile denim jacket designed to complement casual outfits.",
  },
  {
    id: 22,
    name: "Satin Evening Dress",
    category: "Women",
    type: "Dresses",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Elegant satin dress created for evening occasions and special events.",
  },
  {
    id: 23,
    name: "Relaxed Cotton Shirt",
    category: "Women",
    type: "Shirts",
    price: 1399,
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=800&q=80",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Relaxed cotton shirt with a clean and comfortable everyday fit.",
  },
  {
    id: 24,
    name: "Pleated Midi Skirt",
    category: "Women",
    type: "Skirts",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d77?auto=format&fit=crop&w=800&q=80",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Flowing pleated midi skirt for elegant everyday styling.",
  },
  {
    id: 25,
    name: "Cropped Knit Sweater",
    category: "Women",
    type: "Sweaters",
    price: 1799,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Soft cropped knit sweater designed for modern layered outfits.",
  },
  {
    id: 26,
    name: "High Rise Straight Jeans",
    category: "Women",
    type: "Jeans",
    price: 1799,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    sizes: ["26", "28", "30", "32"],
    description:
      "High-rise straight jeans with a flattering and comfortable fit.",
  },
  {
    id: 27,
    name: "Minimalist Co-ord Set",
    category: "Women",
    type: "Co-ords",
    price: 2199,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Minimal co-ord set designed for effortless modern styling.",
  },
  {
    id: 28,
    name: "Oversized Casual Tee",
    category: "Women",
    type: "T-Shirts",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Relaxed oversized T-shirt for comfortable casual outfits.",
  },
  {
    id: 29,
    name: "Longline Cardigan",
    category: "Women",
    type: "Cardigans",
    price: 2299,
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Soft longline cardigan suitable for layering throughout the season.",
  },
  {
    id: 30,
    name: "Classic Women's Trench Coat",
    category: "Women",
    type: "Coats",
    price: 3299,
    image:
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Classic trench coat with a sophisticated silhouette for cooler days.",
  },
];

export default products;