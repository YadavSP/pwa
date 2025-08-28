"use client"
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { Filter, SlidersHorizontal } from 'lucide-react';
import { dummyProducts } from '@/data/product';
import { Header } from '@/components/layout/Header';
import { ProductGrid } from '@/components/product/ProductGrid';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'tshirt' | 'jacket'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');

  const filteredProducts = dummyProducts.filter(product => 
    selectedCategory === 'all' || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.reviewCount - a.reviewCount;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Category Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2 overflow-x-auto">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className="whitespace-nowrap"
            >
              All Products
            </Button>
            <Button
              variant={selectedCategory === 'tshirt' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('tshirt')}
              className="whitespace-nowrap"
            >
              T-Shirts
            </Button>
            <Button
              variant={selectedCategory === 'jacket' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('jacket')}
              className="whitespace-nowrap"
            >
              Jackets
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border rounded-md bg-background text-foreground text-sm"
            >
              <option value="popular">Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {sortedProducts.length} results
          </p>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">Free Delivery Available</Badge>
            <Badge variant="secondary">Easy Returns</Badge>
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid products={sortedProducts} />
      </main>
    </div>
  );
};

export default Products;