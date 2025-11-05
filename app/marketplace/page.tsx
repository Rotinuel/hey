'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Filter, Package, Truck, CreditCard, Star, Store } from 'lucide-react';
// Layout provided by ConditionalLayout

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://addec-backend.onrender.com/api';

interface Product {
  id: string;
  _id?: string;
  vendor: string;
  vendorName?: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  deliveryTime: string;
}

interface Vendor {
  id: string;
  _id?: string;
  name: string;
  category: string;
  rating: number;
  totalProducts: number;
}

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVendor, setSelectedVendor] = useState('All');
  const [cart, setCart] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, vendorsRes] = await Promise.all([
          fetch(`${API_URL}/products`),
          fetch(`${API_URL}/vendors`)
        ]);
        const productsData = await productsRes.json();
        const vendorsData = await vendorsRes.json();
        if (productsData.success && productsData.data) {
          setProducts(productsData.data.map((p: any) => ({ ...p, id: p._id || p.id, vendor: p.vendorName || p.vendor })));
        }
        if (vendorsData.success && vendorsData.data) {
          setVendors(vendorsData.data.map((v: any) => ({ ...v, id: v._id || v.id })));
        }
      } catch (error) {
        console.error('Error fetching marketplace data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = ['All', 'Food & Beverages', 'Fashion & Accessories', 'Arts & Crafts', 'Electronics', 'Books & Media', 'Health & Beauty', 'Home & Decor', 'Sports & Fitness'];

  const fallbackVendors: Vendor[] = [
    { id: '1', name: 'Naija Spice Co.', category: 'Food & Beverages', rating: 4.8, totalProducts: 10 },
    { id: '2', name: 'African Prints Boutique', category: 'Fashion & Accessories', rating: 4.7, totalProducts: 10 },
    { id: '3', name: 'Craft Masters', category: 'Arts & Crafts', rating: 4.9, totalProducts: 10 },
    { id: '4', name: 'Tech Nigeria', category: 'Electronics', rating: 4.6, totalProducts: 10 },
    { id: '5', name: 'Book Lovers Paradise', category: 'Books & Media', rating: 4.8, totalProducts: 10 },
    { id: '6', name: 'Heritage Skincare', category: 'Health & Beauty', rating: 4.9, totalProducts: 10 },
    { id: '7', name: 'Homes & Dreams', category: 'Home & Decor', rating: 4.7, totalProducts: 10 },
    { id: '8', name: 'FitZone Nigeria', category: 'Sports & Fitness', rating: 4.5, totalProducts: 10 },
    { id: '9', name: 'Gadget Hub', category: 'Electronics', rating: 4.6, totalProducts: 10 },
    { id: '10', name: 'Style & Trends', category: 'Fashion & Accessories', rating: 4.8, totalProducts: 10 }
  ];

  const fallbackProducts: Product[] = [
    // Naija Spice Co. - Food & Beverages
    { id: '1', vendor: 'Naija Spice Co.', name: 'Jollof Rice Spice Mix', category: 'Food & Beverages', price: 2500, originalPrice: 3000, image: '/background/background1.png', description: 'Authentic Nigerian jollof rice spice mix', rating: 4.8, reviews: 120, inStock: true, deliveryTime: '2-3 days' },
    { id: '2', vendor: 'Naija Spice Co.', name: 'Curry Powder Mix', category: 'Food & Beverages', price: 1800, image: '/background/background2.png', description: 'Premium curry powder blend', rating: 4.7, reviews: 89, inStock: true, deliveryTime: '2-3 days' },
    { id: '3', vendor: 'Naija Spice Co.', name: 'Yaji (Suya Spice)', category: 'Food & Beverages', price: 2200, image: '/background/background3.png', description: 'Traditional suya spice mix', rating: 4.9, reviews: 156, inStock: true, deliveryTime: '2-3 days' },
    { id: '4', vendor: 'Naija Spice Co.', name: 'Groundnut Cake Mix', category: 'Food & Beverages', price: 3200, image: '/background/background4.png', description: 'Roasted groundnut cake ingredients', rating: 4.6, reviews: 78, inStock: true, deliveryTime: '2-3 days' },
    { id: '5', vendor: 'Naija Spice Co.', name: 'Palm Oil Pure', category: 'Food & Beverages', price: 4500, image: '/background/background5.png', description: '100% pure palm oil', rating: 4.8, reviews: 234, inStock: true, deliveryTime: '2-3 days' },
    { id: '6', vendor: 'Naija Spice Co.', name: 'Vegetable Soup Mix', category: 'Food & Beverages', price: 2800, image: '/background/background6.png', description: 'Complete vegetable soup seasoning', rating: 4.7, reviews: 145, inStock: true, deliveryTime: '2-3 days' },
    { id: '7', vendor: 'Naija Spice Co.', name: 'Pepper Sauce', category: 'Food & Beverages', price: 1500, image: '/background/background1.png', description: 'Hot pepper sauce', rating: 4.9, reviews: 201, inStock: true, deliveryTime: '2-3 days' },
    { id: '8', vendor: 'Naija Spice Co.', name: 'Stock Cubes Variety Pack', category: 'Food & Beverages', price: 3500, image: '/background/background2.png', description: 'Assorted stock cubes', rating: 4.6, reviews: 98, inStock: true, deliveryTime: '2-3 days' },
    { id: '9', vendor: 'Naija Spice Co.', name: 'Dried Fish Package', category: 'Food & Beverages', price: 5200, image: '/background/background3.png', description: 'Premium dried fish', rating: 4.8, reviews: 167, inStock: true, deliveryTime: '2-3 days' },
    { id: '10', vendor: 'Naija Spice Co.', name: 'Ginger & Garlic Paste', category: 'Food & Beverages', price: 2400, image: '/background/background4.png', description: 'Fresh ginger garlic blend', rating: 4.7, reviews: 134, inStock: true, deliveryTime: '2-3 days' },

    // African Prints Boutique - Fashion & Accessories
    { id: '11', vendor: 'African Prints Boutique', name: 'Ankara Fabric Collection', category: 'Fashion & Accessories', price: 15000, image: '/background/background5.png', description: 'Beautiful Ankara fabric collection', rating: 4.7, reviews: 89, inStock: true, deliveryTime: '3-5 days' },
    { id: '12', vendor: 'African Prints Boutique', name: 'Traditional Headwrap Set', category: 'Fashion & Accessories', price: 8500, image: '/background/background6.png', description: 'Premium headwrap collection', rating: 4.8, reviews: 112, inStock: true, deliveryTime: '3-5 days' },
    { id: '13', vendor: 'African Prints Boutique', name: 'Beaded Jewelry Set', category: 'Fashion & Accessories', price: 12500, image: '/background/background1.png', description: 'Handmade beaded jewelry', rating: 4.9, reviews: 145, inStock: true, deliveryTime: '3-5 days' },
    { id: '14', vendor: 'African Prints Boutique', name: 'Aso Oke Cap', category: 'Fashion & Accessories', price: 9800, image: '/background/background2.png', description: 'Traditional cap', rating: 4.6, reviews: 78, inStock: true, deliveryTime: '3-5 days' },
    { id: '15', vendor: 'African Prints Boutique', name: 'African Print Bags', category: 'Fashion & Accessories', price: 11000, image: '/background/background3.png', description: 'Stylish Ankara bags', rating: 4.7, reviews: 134, inStock: true, deliveryTime: '3-5 days' },
    { id: '16', vendor: 'African Prints Boutique', name: 'Traditional Shoes', category: 'Fashion & Accessories', price: 18500, image: '/background/background4.png', description: 'Handmade leather shoes', rating: 4.8, reviews: 98, inStock: true, deliveryTime: '3-5 days' },
    { id: '17', vendor: 'African Prints Boutique', name: 'Wrappers Set', category: 'Fashion & Accessories', price: 22000, image: '/background/background5.png', description: 'Complete wrapper set', rating: 4.9, reviews: 210, inStock: true, deliveryTime: '3-5 days' },
    { id: '18', vendor: 'African Prints Boutique', name: 'Scarves Collection', category: 'Fashion & Accessories', price: 6500, image: '/background/background6.png', description: 'Premium scarves', rating: 4.7, reviews: 156, inStock: true, deliveryTime: '3-5 days' },
    { id: '19', vendor: 'African Prints Boutique', name: 'Belt Collection', category: 'Fashion & Accessories', price: 7500, image: '/background/background1.png', description: 'Leather belts', rating: 4.6, reviews: 89, inStock: true, deliveryTime: '3-5 days' },
    { id: '20', vendor: 'African Prints Boutique', name: 'African Print Wallet', category: 'Fashion & Accessories', price: 5500, image: '/background/background2.png', description: 'Handmade wallet', rating: 4.8, reviews: 112, inStock: true, deliveryTime: '3-5 days' },

    // Craft Masters - Arts & Crafts
    { id: '21', vendor: 'Craft Masters', name: 'Handwoven Baskets Set', category: 'Arts & Crafts', price: 8500, image: '/background/background3.png', description: 'Traditional handwoven baskets', rating: 4.9, reviews: 45, inStock: true, deliveryTime: '5-7 days' },
    { id: '22', vendor: 'Craft Masters', name: 'Wooden Sculptures', category: 'Arts & Crafts', price: 25000, image: '/background/background4.png', description: 'Hand-carved wooden sculptures', rating: 4.8, reviews: 67, inStock: true, deliveryTime: '5-7 days' },
    { id: '23', vendor: 'Craft Masters', name: 'Pottery Collection', category: 'Arts & Crafts', price: 12000, image: '/background/background5.png', description: 'Traditional pottery pieces', rating: 4.7, reviews: 89, inStock: true, deliveryTime: '5-7 days' },
    { id: '24', vendor: 'Craft Masters', name: 'Beaded Wall Art', category: 'Arts & Crafts', price: 15000, image: '/background/background6.png', description: 'Colorful beaded artworks', rating: 4.9, reviews: 56, inStock: true, deliveryTime: '5-7 days' },
    { id: '25', vendor: 'Craft Masters', name: 'Traditional Masks', category: 'Arts & Crafts', price: 18000, image: '/background/background1.png', description: 'Decorative cultural masks', rating: 4.8, reviews: 78, inStock: true, deliveryTime: '5-7 days' },
    { id: '26', vendor: 'Craft Masters', name: 'Handmade Candles', category: 'Arts & Crafts', price: 6500, image: '/background/background2.png', description: 'Scented handmade candles', rating: 4.6, reviews: 134, inStock: true, deliveryTime: '5-7 days' },
    { id: '27', vendor: 'Craft Masters', name: 'Woven Mats Set', category: 'Arts & Crafts', price: 9500, image: '/background/background3.png', description: 'Traditional woven floor mats', rating: 4.7, reviews: 98, inStock: true, deliveryTime: '5-7 days' },
    { id: '28', vendor: 'Craft Masters', name: 'Basket Weaving Kit', category: 'Arts & Crafts', price: 5500, image: '/background/background4.png', description: 'DIY basket making kit', rating: 4.8, reviews: 67, inStock: true, deliveryTime: '5-7 days' },
    { id: '29', vendor: 'Craft Masters', name: 'Calabash Bowls', category: 'Arts & Crafts', price: 11000, image: '/background/background5.png', description: 'Decorative calabash bowls', rating: 4.9, reviews: 145, inStock: true, deliveryTime: '5-7 days' },
    { id: '30', vendor: 'Craft Masters', name: 'Reed Art Pieces', category: 'Arts & Crafts', price: 13500, image: '/background/background6.png', description: 'Beautiful reed artworks', rating: 4.7, reviews: 112, inStock: true, deliveryTime: '5-7 days' },

    // Tech Nigeria - Electronics
    { id: '31', vendor: 'Tech Nigeria', name: 'Power Bank 20000mAh', category: 'Electronics', price: 12000, originalPrice: 15000, image: '/background/background1.png', description: 'High capacity power bank', rating: 4.6, reviews: 234, inStock: true, deliveryTime: '1-2 days' },
    { id: '32', vendor: 'Tech Nigeria', name: 'Wireless Earbuds', category: 'Electronics', price: 8500, image: '/background/background2.png', description: 'Premium wireless earbuds', rating: 4.7, reviews: 189, inStock: true, deliveryTime: '1-2 days' },
    { id: '33', vendor: 'Tech Nigeria', name: 'USB Flash Drive 64GB', category: 'Electronics', price: 3500, image: '/background/background3.png', description: 'High-speed USB drive', rating: 4.8, reviews: 298, inStock: true, deliveryTime: '1-2 days' },
    { id: '34', vendor: 'Tech Nigeria', name: 'Phone Stand Holder', category: 'Electronics', price: 2500, image: '/background/background4.png', description: 'Adjustable phone stand', rating: 4.5, reviews: 156, inStock: true, deliveryTime: '1-2 days' },
    { id: '35', vendor: 'Tech Nigeria', name: 'Bluetooth Speaker', category: 'Electronics', price: 15000, image: '/background/background5.png', description: 'Portable Bluetooth speaker', rating: 4.6, reviews: 201, inStock: true, deliveryTime: '1-2 days' },
    { id: '36', vendor: 'Tech Nigeria', name: 'Phone Case Collection', category: 'Electronics', price: 4500, image: '/background/background6.png', description: 'Protective phone cases', rating: 4.7, reviews: 312, inStock: true, deliveryTime: '1-2 days' },
    { id: '37', vendor: 'Tech Nigeria', name: 'Laptop Bag', category: 'Electronics', price: 8500, image: '/background/background1.png', description: 'Stylish laptop bag', rating: 4.8, reviews: 178, inStock: true, deliveryTime: '1-2 days' },
    { id: '38', vendor: 'Tech Nigeria', name: 'HDMI Cable', category: 'Electronics', price: 3200, image: '/background/background2.png', description: 'High-speed HDMI cable', rating: 4.5, reviews: 234, inStock: true, deliveryTime: '1-2 days' },
    { id: '39', vendor: 'Tech Nigeria', name: 'Wireless Mouse', category: 'Electronics', price: 5500, image: '/background/background3.png', description: 'Ergonomic wireless mouse', rating: 4.6, reviews: 267, inStock: true, deliveryTime: '1-2 days' },
    { id: '40', vendor: 'Tech Nigeria', name: 'Phone Screen Protector', category: 'Electronics', price: 1800, image: '/background/background4.png', description: 'Tempered glass protector', rating: 4.7, reviews: 456, inStock: true, deliveryTime: '1-2 days' },

    // Book Lovers Paradise - Books & Media
    { id: '41', vendor: 'Book Lovers Paradise', name: 'Nigerian Literature Collection', category: 'Books & Media', price: 12500, image: '/background/background5.png', description: 'Bestselling Nigerian literature', rating: 4.8, reviews: 67, inStock: true, deliveryTime: '2-4 days' },
    { id: '42', vendor: 'Book Lovers Paradise', name: 'African History Books', category: 'Books & Media', price: 9800, image: '/background/background6.png', description: 'Comprehensive African history', rating: 4.9, reviews: 89, inStock: true, deliveryTime: '2-4 days' },
    { id: '43', vendor: 'Book Lovers Paradise', name: 'Children\'s Story Books', category: 'Books & Media', price: 4500, image: '/background/background1.png', description: 'Educational children books', rating: 4.7, reviews: 123, inStock: true, deliveryTime: '2-4 days' },
    { id: '44', vendor: 'Book Lovers Paradise', name: 'Nigerian Poetry Anthology', category: 'Books & Media', price: 7500, image: '/background/background2.png', description: 'Contemporary poetry collection', rating: 4.8, reviews: 56, inStock: true, deliveryTime: '2-4 days' },
    { id: '45', vendor: 'Book Lovers Paradise', name: 'Business Strategy Books', category: 'Books & Media', price: 11000, image: '/background/background3.png', description: 'Business development guides', rating: 4.6, reviews: 98, inStock: true, deliveryTime: '2-4 days' },
    { id: '46', vendor: 'Book Lovers Paradise', name: 'Cookbooks Collection', category: 'Books & Media', price: 8500, image: '/background/background4.png', description: 'Traditional recipes', rating: 4.9, reviews: 145, inStock: true, deliveryTime: '2-4 days' },
    { id: '47', vendor: 'Book Lovers Paradise', name: 'Audiobooks Collection', category: 'Books & Media', price: 6500, image: '/background/background5.png', description: 'Popular audiobooks', rating: 4.7, reviews: 178, inStock: true, deliveryTime: '2-4 days' },
    { id: '48', vendor: 'Book Lovers Paradise', name: 'Self-Help Books', category: 'Books & Media', price: 7200, image: '/background/background6.png', description: 'Personal development books', rating: 4.8, reviews: 234, inStock: true, deliveryTime: '2-4 days' },
    { id: '49', vendor: 'Book Lovers Paradise', name: 'Fiction Novels Pack', category: 'Books & Media', price: 9500, image: '/background/background1.png', description: 'Bestselling fiction novels', rating: 4.6, reviews: 156, inStock: true, deliveryTime: '2-4 days' },
    { id: '50', vendor: 'Book Lovers Paradise', name: 'Academic Textbooks', category: 'Books & Media', price: 13500, image: '/background/background2.png', description: 'University textbooks', rating: 4.7, reviews: 89, inStock: true, deliveryTime: '2-4 days' },

    // Heritage Skincare - Health & Beauty
    { id: '51', vendor: 'Heritage Skincare', name: 'Shea Butter Set', category: 'Health & Beauty', price: 5500, image: '/background/background3.png', description: 'Pure organic shea butter', rating: 4.9, reviews: 156, inStock: true, deliveryTime: '2-3 days' },
    { id: '52', vendor: 'Heritage Skincare', name: 'Black Soap', category: 'Health & Beauty', price: 2800, image: '/background/background4.png', description: 'Traditional black soap', rating: 4.8, reviews: 234, inStock: true, deliveryTime: '2-3 days' },
    { id: '53', vendor: 'Heritage Skincare', name: 'Coconut Oil Pure', category: 'Health & Beauty', price: 4200, image: '/background/background5.png', description: '100% pure coconut oil', rating: 4.9, reviews: 201, inStock: true, deliveryTime: '2-3 days' },
    { id: '54', vendor: 'Heritage Skincare', name: 'Hair Growth Oil', category: 'Health & Beauty', price: 6800, image: '/background/background6.png', description: 'Natural hair growth formula', rating: 4.7, reviews: 178, inStock: true, deliveryTime: '2-3 days' },
    { id: '55', vendor: 'Heritage Skincare', name: 'Face Cream', category: 'Health & Beauty', price: 7500, image: '/background/background1.png', description: 'Anti-aging face cream', rating: 4.8, reviews: 145, inStock: true, deliveryTime: '2-3 days' },
    { id: '56', vendor: 'Heritage Skincare', name: 'Body Lotion', category: 'Health & Beauty', price: 4800, image: '/background/background2.png', description: 'Moisturizing body lotion', rating: 4.6, reviews: 267, inStock: true, deliveryTime: '2-3 days' },
    { id: '57', vendor: 'Heritage Skincare', name: 'Lip Balm Set', category: 'Health & Beauty', price: 3200, image: '/background/background3.png', description: 'Natural lip care', rating: 4.9, reviews: 189, inStock: true, deliveryTime: '2-3 days' },
    { id: '58', vendor: 'Heritage Skincare', name: 'Hair Conditioner', category: 'Health & Beauty', price: 5500, image: '/background/background4.png', description: 'Deep conditioning treatment', rating: 4.7, reviews: 156, inStock: true, deliveryTime: '2-3 days' },
    { id: '59', vendor: 'Heritage Skincare', name: 'Face Mask Set', category: 'Health & Beauty', price: 6800, image: '/background/background5.png', description: 'Clay face masks', rating: 4.8, reviews: 134, inStock: true, deliveryTime: '2-3 days' },
    { id: '60', vendor: 'Heritage Skincare', name: 'Scalp Treatment', category: 'Health & Beauty', price: 8500, image: '/background/background6.png', description: 'Scalp revitalizer', rating: 4.9, reviews: 112, inStock: true, deliveryTime: '2-3 days' },

    // Homes & Dreams - Home & Decor
    { id: '61', vendor: 'Homes & Dreams', name: 'African Print Curtains', category: 'Home & Decor', price: 18500, image: '/background/background1.png', description: 'Stylish curtain sets', rating: 4.7, reviews: 98, inStock: true, deliveryTime: '3-5 days' },
    { id: '62', vendor: 'Homes & Dreams', name: 'Throw Pillows Set', category: 'Home & Decor', price: 8500, image: '/background/background2.png', description: 'Decorative pillows', rating: 4.8, reviews: 145, inStock: true, deliveryTime: '3-5 days' },
    { id: '63', vendor: 'Homes & Dreams', name: 'Traditional Lamps', category: 'Home & Decor', price: 12500, image: '/background/background3.png', description: 'Handcrafted lamps', rating: 4.6, reviews: 78, inStock: true, deliveryTime: '3-5 days' },
    { id: '64', vendor: 'Homes & Dreams', name: 'Wall Art Collection', category: 'Home & Decor', price: 15000, image: '/background/background4.png', description: 'Beautiful wall artworks', rating: 4.9, reviews: 112, inStock: true, deliveryTime: '3-5 days' },
    { id: '65', vendor: 'Homes & Dreams', name: 'Rugs & Carpets', category: 'Home & Decor', price: 22000, image: '/background/background5.png', description: 'Premium floor rugs', rating: 4.7, reviews: 89, inStock: true, deliveryTime: '3-5 days' },
    { id: '66', vendor: 'Homes & Dreams', name: 'Vases Collection', category: 'Home & Decor', price: 9800, image: '/background/background6.png', description: 'Decorative vases', rating: 4.8, reviews: 134, inStock: true, deliveryTime: '3-5 days' },
    { id: '67', vendor: 'Homes & Dreams', name: 'Mirrors Set', category: 'Home & Decor', price: 17500, image: '/background/background1.png', description: 'Stylish mirrors', rating: 4.6, reviews: 67, inStock: true, deliveryTime: '3-5 days' },
    { id: '68', vendor: 'Homes & Dreams', name: 'Candle Holders', category: 'Home & Decor', price: 6500, image: '/background/background2.png', description: 'Elegant candle holders', rating: 4.7, reviews: 98, inStock: true, deliveryTime: '3-5 days' },
    { id: '69', vendor: 'Homes & Dreams', name: 'Table Centerpieces', category: 'Home & Decor', price: 11000, image: '/background/background3.png', description: 'Decorative centerpieces', rating: 4.9, reviews: 123, inStock: true, deliveryTime: '3-5 days' },
    { id: '70', vendor: 'Homes & Dreams', name: 'Dining Sets', category: 'Home & Decor', price: 45000, image: '/background/background4.png', description: 'Complete dining sets', rating: 4.8, reviews: 45, inStock: true, deliveryTime: '3-5 days' },

    // FitZone Nigeria - Sports & Fitness
    { id: '71', vendor: 'FitZone Nigeria', name: 'Yoga Mat', category: 'Sports & Fitness', price: 8500, image: '/background/background5.png', description: 'Premium yoga mat', rating: 4.5, reviews: 234, inStock: true, deliveryTime: '2-3 days' },
    { id: '72', vendor: 'FitZone Nigeria', name: 'Dumbbells Set', category: 'Sports & Fitness', price: 25000, image: '/background/background6.png', description: 'Adjustable dumbbells', rating: 4.6, reviews: 156, inStock: true, deliveryTime: '2-3 days' },
    { id: '73', vendor: 'FitZone Nigeria', name: 'Resistance Bands', category: 'Sports & Fitness', price: 5500, image: '/background/background1.png', description: 'Elastic resistance bands', rating: 4.7, reviews: 189, inStock: true, deliveryTime: '2-3 days' },
    { id: '74', vendor: 'FitZone Nigeria', name: 'Jump Rope', category: 'Sports & Fitness', price: 2800, image: '/background/background2.png', description: 'Professional jump rope', rating: 4.8, reviews: 298, inStock: true, deliveryTime: '2-3 days' },
    { id: '75', vendor: 'FitZone Nigeria', name: 'Fitness Tracker', category: 'Sports & Fitness', price: 15000, image: '/background/background3.png', description: 'Smart fitness watch', rating: 4.6, reviews: 267, inStock: true, deliveryTime: '2-3 days' },
    { id: '76', vendor: 'FitZone Nigeria', name: 'Workout Clothes Set', category: 'Sports & Fitness', price: 12500, image: '/background/background4.png', description: 'Activewear collection', rating: 4.7, reviews: 178, inStock: true, deliveryTime: '2-3 days' },
    { id: '77', vendor: 'FitZone Nigeria', name: 'Exercise Ball', category: 'Sports & Fitness', price: 7500, image: '/background/background5.png', description: 'Stability exercise ball', rating: 4.5, reviews: 145, inStock: true, deliveryTime: '2-3 days' },
    { id: '78', vendor: 'FitZone Nigeria', name: 'Water Bottle', category: 'Sports & Fitness', price: 3500, image: '/background/background6.png', description: 'BPA-free water bottle', rating: 4.8, reviews: 312, inStock: true, deliveryTime: '2-3 days' },
    { id: '79', vendor: 'FitZone Nigeria', name: 'Kettlebell Set', category: 'Sports & Fitness', price: 22000, image: '/background/background1.png', description: 'Adjustable kettlebells', rating: 4.6, reviews: 98, inStock: true, deliveryTime: '2-3 days' },
    { id: '80', vendor: 'FitZone Nigeria', name: 'Foam Roller', category: 'Sports & Fitness', price: 6500, image: '/background/background2.png', description: 'Massage foam roller', rating: 4.7, reviews: 167, inStock: true, deliveryTime: '2-3 days' },

    // Gadget Hub - Electronics
    { id: '81', vendor: 'Gadget Hub', name: 'Smart Watch', category: 'Electronics', price: 35000, image: '/background/background3.png', description: 'Advanced smartwatch', rating: 4.6, reviews: 234, inStock: true, deliveryTime: '1-2 days' },
    { id: '82', vendor: 'Gadget Hub', name: 'Phone Gimbal', category: 'Electronics', price: 18500, image: '/background/background4.png', description: 'Stabilization gimbal', rating: 4.7, reviews: 156, inStock: true, deliveryTime: '1-2 days' },
    { id: '83', vendor: 'Gadget Hub', name: 'Wireless Charger', category: 'Electronics', price: 12000, image: '/background/background5.png', description: 'Fast wireless charging', rating: 4.8, reviews: 298, inStock: true, deliveryTime: '1-2 days' },
    { id: '84', vendor: 'Gadget Hub', name: 'Tablet Stand', category: 'Electronics', price: 8500, image: '/background/background6.png', description: 'Adjustable tablet holder', rating: 4.5, reviews: 178, inStock: true, deliveryTime: '1-2 days' },
    { id: '85', vendor: 'Gadget Hub', name: 'Car Phone Mount', category: 'Electronics', price: 6500, image: '/background/background1.png', description: 'Car dashboard mount', rating: 4.7, reviews: 234, inStock: true, deliveryTime: '1-2 days' },
    { id: '86', vendor: 'Gadget Hub', name: 'USB-C Hub', category: 'Electronics', price: 15000, image: '/background/background2.png', description: 'Multi-port USB hub', rating: 4.6, reviews: 145, inStock: true, deliveryTime: '1-2 days' },
    { id: '87', vendor: 'Gadget Hub', name: 'Webcam HD', category: 'Electronics', price: 22000, image: '/background/background3.png', description: 'HD webcam', rating: 4.8, reviews: 189, inStock: true, deliveryTime: '1-2 days' },
    { id: '88', vendor: 'Gadget Hub', name: 'External SSD', category: 'Electronics', price: 45000, image: '/background/background4.png', description: '1TB external SSD', rating: 4.9, reviews: 267, inStock: true, deliveryTime: '1-2 days' },
    { id: '89', vendor: 'Gadget Hub', name: 'Mechanical Keyboard', category: 'Electronics', price: 35000, image: '/background/background5.png', description: 'RGB mechanical keyboard', rating: 4.7, reviews: 312, inStock: true, deliveryTime: '1-2 days' },
    { id: '90', vendor: 'Gadget Hub', name: 'Gaming Mouse', category: 'Electronics', price: 25000, image: '/background/background6.png', description: 'High precision gaming mouse', rating: 4.8, reviews: 445, inStock: true, deliveryTime: '1-2 days' },

    // Style & Trends - Fashion & Accessories
    { id: '91', vendor: 'Style & Trends', name: 'Sun Glasses Collection', category: 'Fashion & Accessories', price: 12000, image: '/background/background1.png', description: 'Premium sunglasses', rating: 4.8, reviews: 234, inStock: true, deliveryTime: '3-5 days' },
    { id: '92', vendor: 'Style & Trends', name: 'Hats & Caps', category: 'Fashion & Accessories', price: 8500, image: '/background/background2.png', description: 'Stylish headwear', rating: 4.7, reviews: 178, inStock: true, deliveryTime: '3-5 days' },
    { id: '93', vendor: 'Style & Trends', name: 'Watches Collection', category: 'Fashion & Accessories', price: 25000, image: '/background/background3.png', description: 'Luxury watches', rating: 4.9, reviews: 156, inStock: true, deliveryTime: '3-5 days' },
    { id: '94', vendor: 'Style & Trends', name: 'Tote Bags', category: 'Fashion & Accessories', price: 9500, image: '/background/background4.png', description: 'Fashionable tote bags', rating: 4.6, reviews: 234, inStock: true, deliveryTime: '3-5 days' },
    { id: '95', vendor: 'Style & Trends', name: 'Sneakers Collection', category: 'Fashion & Accessories', price: 35000, image: '/background/background5.png', description: 'Trendy sneakers', rating: 4.8, reviews: 445, inStock: true, deliveryTime: '3-5 days' },
    { id: '96', vendor: 'Style & Trends', name: 'Jewelry Set', category: 'Fashion & Accessories', price: 18500, image: '/background/background6.png', description: 'Elegant jewelry collection', rating: 4.7, reviews: 189, inStock: true, deliveryTime: '3-5 days' },
    { id: '97', vendor: 'Style & Trends', name: 'Keychains & Charms', category: 'Fashion & Accessories', price: 3500, image: '/background/background1.png', description: 'Decorative accessories', rating: 4.8, reviews: 298, inStock: true, deliveryTime: '3-5 days' },
    { id: '98', vendor: 'Style & Trends', name: 'Backpacks', category: 'Fashion & Accessories', price: 15000, image: '/background/background2.png', description: 'Stylish backpacks', rating: 4.6, reviews: 234, inStock: true, deliveryTime: '3-5 days' },
    { id: '99', vendor: 'Style & Trends', name: 'Sunglasses Case', category: 'Fashion & Accessories', price: 2500, image: '/background/background3.png', description: 'Protective cases', rating: 4.7, reviews: 145, inStock: true, deliveryTime: '3-5 days' },
    { id: '100', vendor: 'Style & Trends', name: 'Handbags Collection', category: 'Fashion & Accessories', price: 28000, image: '/background/background4.png', description: 'Luxury handbags', rating: 4.9, reviews: 178, inStock: true, deliveryTime: '3-5 days' }
  ];

  // Use real data if available, otherwise fallback
  const displayProducts = products.length > 0 ? products : fallbackProducts;
  const displayVendors = vendors.length > 0 ? vendors : fallbackVendors;

  const filteredProducts = displayProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesVendor = selectedVendor === 'All' || product.vendor === selectedVendor;
    return matchesSearch && matchesCategory && matchesVendor;
  });

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header and content */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 pt-32 md:pt-40 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Marketplace
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Shop from our curated vendors. Can&apos;t attend the trade fair? Order online and get items delivered to you!
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Vendor Filter */}
          <div className="flex items-center space-x-2">
            <Store className="w-5 h-5 text-gray-600" />
            <select
              value={selectedVendor}
              onChange={(e) => setSelectedVendor(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="All">All Vendors</option>
              {displayVendors.map(vendor => (
                <option key={vendor.id} value={vendor.name}>{vendor.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                {product.originalPrice && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                    Sale
                  </div>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">{product.vendor}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{product.description}</p>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-green-600">₦{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">₦{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>

                {/* Delivery Info */}
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Truck className="w-4 h-4 mr-2" />
                  <span>Delivery: {product.deliveryTime}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className="flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                  <button className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors">
                    <CreditCard className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No products found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-green-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <Package className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
              <p className="text-green-100">Multiple payment options available</p>
            </div>
            <div>
              <Truck className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-green-100">Get your items delivered safely</p>
            </div>
            <div>
              <CreditCard className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Easy Returns</h3>
              <p className="text-green-100">Hassle-free return policy</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}