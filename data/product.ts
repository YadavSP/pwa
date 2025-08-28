import { Product } from '@/types';

export const dummyProducts: Product[] = [
  {
    id: '1',
    name: 'Men Typography Printed T-shirt',
    brand: 'NOBERO',
    price: 499,
    originalPrice: 1499,
    discount: 67,
    rating: 4.2,
    reviewCount: 235,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800',
      'https://images.unsplash.com/photo-1503341338985-95d90d70588d?q=80&w=800',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800'
    ],
    description: 'Premium quality cotton t-shirt with modern typography print. Comfortable fit for everyday wear.',
    category: 'tshirt',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Burgundy', value: '#722F37' },
      { name: 'Black', value: '#000000' },
      { name: 'Navy', value: '#1B1B3A' }
    ],
    inStock: true,
    features: ['100% Cotton', 'Machine Washable', 'Comfortable Fit', 'Durable Print']
  },
  {
    id: '2',
    name: 'Printed Oversized T-shirt',
    brand: 'NOBERO',
    price: 499,
    originalPrice: 1799,
    discount: 72,
    rating: 4.3,
    reviewCount: 225,
    images: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=800',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=800'
    ],
    description: 'Trendy oversized t-shirt with stylish print. Perfect for casual outings and street style.',
    category: 'tshirt',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Light Gray', value: '#D3D3D3' },
      { name: 'White', value: '#FFFFFF' },
      { name: 'Black', value: '#000000' }
    ],
    inStock: true,
    features: ['Oversized Fit', 'Premium Cotton', 'Unique Print', 'Street Style']
  },
  {
    id: '3',
    name: 'Men Round Neck Lounge T-Shirt',
    brand: 'Marks & Spencer',
    price: 1274,
    originalPrice: 1499,
    discount: 15,
    rating: 4.5,
    reviewCount: 156,
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800'
    ],
    description: 'Comfortable lounge t-shirt perfect for relaxation. Made with soft, breathable fabric.',
    category: 'tshirt',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Teal', value: '#008080' },
      { name: 'Navy', value: '#1B1B3A' },
      { name: 'Charcoal', value: '#36454F' }
    ],
    inStock: true,
    features: ['Soft Cotton', 'Comfortable Fit', 'Lounge Wear', 'Breathable']
  },
  {
    id: '4',
    name: 'Men Solid Cotton Polo T-shirt',
    brand: 'Marks & Spencer',
    price: 1274,
    originalPrice: 1499,
    discount: 15,
    rating: 4.6,
    reviewCount: 24,
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800',
      'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?q=80&w=800'
    ],
    description: 'Classic solid cotton polo t-shirt. Versatile and perfect for smart casual occasions.',
    category: 'tshirt',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Light Blue', value: '#87CEEB' },
      { name: 'White', value: '#FFFFFF' },
      { name: 'Navy', value: '#1B1B3A' }
    ],
    inStock: true,
    features: ['100% Cotton', 'Polo Collar', 'Smart Casual', 'Button Closure']
  },
  {
    id: '5',
    name: 'Lightweight Bomber Jacket',
    brand: 'StyleCraft',
    price: 2999,
    originalPrice: 4999,
    discount: 40,
    rating: 4.4,
    reviewCount: 89,
    images: [
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=800',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800'
    ],
    description: 'Stylish lightweight bomber jacket perfect for layering. Modern fit with quality construction.',
    category: 'jacket',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Navy', value: '#1B1B3A' },
      { name: 'Olive', value: '#808000' }
    ],
    inStock: true,
    features: ['Water Resistant', 'Multiple Pockets', 'Ribbed Cuffs', 'Modern Fit']
  },
  {
    id: '6',
    name: 'Denim Casual Jacket',
    brand: 'UrbanEdge',
    price: 1899,
    originalPrice: 2999,
    discount: 37,
    rating: 4.3,
    reviewCount: 127,
    images: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800',
      'https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?q=80&w=800'
    ],
    description: 'Classic denim jacket with modern styling. Versatile piece for casual and semi-formal looks.',
    category: 'jacket',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Classic Blue', value: '#4169E1' },
      { name: 'Dark Wash', value: '#2F4F4F' },
      { name: 'Light Wash', value: '#87CEEB' }
    ],
    inStock: true,
    features: ['Premium Denim', 'Classic Fit', 'Button Closure', 'Chest Pockets']
  }
];