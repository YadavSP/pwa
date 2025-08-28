export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  category: 'tshirt' | 'jacket';
  sizes: string[];
  colors: Array<{
    name: string;
    value: string;
  }>;
  inStock: boolean;
  features?: string[];
}

export interface CartItem {
  productId: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  date: string;
  estimatedDelivery?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}