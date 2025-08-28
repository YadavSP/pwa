// components/product/ProductCard.tsx
"use client"
import { Heart, Star } from 'lucide-react'; // Only import what's needed from lucide-react
import Link from 'next/link'; // Import Link from next/link
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    // The entire card acts as a link to the product detail page
    <Link href={`/product/${product.id}`} className="block"> {/* Added className="block" for proper styling */}
      <Card className="group cursor-pointer border-border/40 hover:shadow-lg transition-all duration-300 hover:border-border h-full flex flex-col"> {/* Added h-full and flex props for consistent card height */}
        <CardContent className="p-0 flex-grow"> {/* flex-grow to make content take available space */}
          <div className="relative overflow-hidden rounded-t-lg">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Discount Badge */}
            {product.discount && (
              <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                {product.discount}% OFF
              </Badge>
            )}

            {/* Wishlist Button - Handle click separately to prevent link navigation */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-background/80 hover:bg-background text-foreground z-10"
              onClick={(e) => {
                e.preventDefault(); // Crucial: Prevent the parent Link from navigating
                e.stopPropagation(); // Crucial: Stop the event from bubbling up
                // Add your wishlist logic here
                console.log('Added to wishlist:', product.name);
              }}
            >
              <Heart className="h-4 w-4" />
            </Button>

            {/* Quick View on Hover - This should NOT be a Link. Make it a simple text or a button for a modal. */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              {/* If you want "Quick View" to do something different (e.g., open a modal), make it a Button */}
              {/* <Button
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Open quick view modal for', product.name);
                }}
              >
                Quick View
              </Button> */}
              {/* Otherwise, if it's just visual, a span is fine. */}
              <span className="text-white font-medium">Quick View</span>
            </div>
          </div>

          <div className="p-4 space-y-2">
            {/* Brand */}
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {product.brand}
            </p>

            {/* Product Name */}
            <h3 
              className="font-medium text-foreground line-clamp-2" // Removed cursor-pointer and hover styles since the whole card is a link
            >
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="text-sm font-medium ml-1">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-foreground">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            {/* Offer Badge */}
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-success border-success/20 bg-success/10">
                Best Price ₹{Math.floor(product.price * 0.9)} with coupon
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};