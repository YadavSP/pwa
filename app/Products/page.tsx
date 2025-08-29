// FILE: app/Products/page.tsx (WITH DARK TOGGLE HIGHLIGHT)

"use client"
import { useState } from 'react';

// Shadcn UI & Lucide Icons
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ListOrdered, Search } from 'lucide-react';

// Your Components & Data
import { dummyProducts } from '@/data/product';
import { Header } from '@/components/layout/Header';
import { ProductGrid } from '@/components/product/ProductGrid';

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const displayedProducts = dummyProducts
    .filter(product => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    })
    .filter(product => {
      return selectedCategory === 'all' || product.category === selectedCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        default: return b.reviewCount - a.reviewCount;
      }
    });

  return (
    <div className="min-h-screen bg-muted/20">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 p-4 rounded-lg border bg-card shadow-sm">
          
          {/* --- CATEGORY TOGGLES (WITH NEW DARK HIGHLIGHT) --- */}
          <ToggleGroup
            type="single"
            value={selectedCategory}
            onValueChange={(value) => { if (value) setSelectedCategory(value) }}
            className="w-full md:w-auto justify-start"
          >
            <ToggleGroupItem 
              value="all" 
              aria-label="Toggle All Products"
              // Using dark background for selected state
              className={selectedCategory === 'all' ? 'bg-foreground text-background' : 'hover:bg-accent hover:text-accent-foreground'}
            >
              All
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="tshirt" 
              aria-label="Toggle T-shirts"
              className={selectedCategory === 'tshirt' ? 'bg-foreground text-background' : 'hover:bg-accent hover:text-accent-foreground'}
            >
              T-Shirts
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="jacket" 
              aria-label="Toggle Jackets"
              className={selectedCategory === 'jacket' ? 'bg-foreground text-background' : 'hover:bg-accent hover:text-accent-foreground'}
            >
              Jackets
            </ToggleGroupItem>
          </ToggleGroup>
          
          <div className="relative w-full md:flex-1 md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 h-10"
            />
          </div>
          
          <div className="w-full md:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto flex items-center gap-2 h-10">
                  <ListOrdered className="h-4 w-4" />
                  Sort by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setSortBy('popular')}>Popularity</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSortBy('rating')}>Highest Rated</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSortBy('price-low')}>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSortBy('price-high')}>Price: High to Low</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </div>

        <div className="flex items-center justify-between mb-4 border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{displayedProducts.length}</span> results
          </p>
          <div className="hidden sm:flex items-center space-x-2">
            <Badge variant="secondary">Free Delivery</Badge>
            <Badge variant="secondary">Easy Returns</Badge>
          </div>
        </div>

        <ProductGrid products={displayedProducts} />
      </main>
    </div>
  );
};

export default ProductsPage;