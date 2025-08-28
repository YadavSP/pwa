// app/ProductDetail/[id]/page.tsx
"use client" // <--- Keep this at the very top

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { ArrowLeft, Heart, Star, Shield, Truck, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { dummyProducts } from '@/data/product';
import { Header } from '@/components/layout/Header';

import { ProductImageGallery } from '@/components/product/ProductImageGallery';
import { useRouter, useParams } from 'next/navigation'; // <-- Import useParams


// Remove the interface ProductDetailProps as we will use useParams
// interface ProductDetailProps {
//   params: { id: string };
// }

// Modify the component to not accept params as a prop
const ProductDetail = () => { // Removed { params }: ProductDetailProps
  const router = useRouter();
  const params = useParams(); // <-- Use useParams hook
  const id = params.id as string; // <-- Access id from useParams
  const { toast } = useToast();

  const product = dummyProducts.find(p => p.id === id); // Use the id from useParams
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Selection Required",
        description: "Please select size and color before adding to cart.",
        variant: "destructive"
      });
      return;
    }

    // Store order in localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = {
      id: Date.now().toString(),
      items: [{
        productId: product.id,
        product,
        size: selectedSize,
        color: selectedColor,
        quantity: 1
      }],
      total: product.price,
      status: 'pending',
      date: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
    
    localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));
    
    toast({
      title: "Order Placed!",
      description: "Your item has been added to orders. No payment required!",
    });
    
       router.push('/orders');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-2">
              <Badge className="bg-primary text-primary-foreground">
                Mega Price Drop
              </Badge>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {product.brand}
              </p>
              <h1 className="text-2xl font-bold text-foreground">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-foreground">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                {product.discount && (
                  <Badge className="bg-primary text-primary-foreground">
                    ₹{product.originalPrice! - product.price} OFF!
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge className="bg-destructive text-destructive-foreground">
                  MEGA DEAL
                </Badge>
                <span className="text-success font-medium">
                  Get at ₹{Math.floor(product.price * 0.9)}
                </span>
                <Badge variant="outline" className="text-success border-success">
                  Extra ₹{Math.floor(product.price * 0.1)} Off
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground">
                With Coupon + Bank Offer
              </p>
            </div>

            <Separator />

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="font-medium text-foreground">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className="min-w-[3rem]"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <h3 className="font-medium text-foreground">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Button
                    key={color.name}
                    variant={selectedColor === color.name ? "default" : "outline"}
                    onClick={() => setSelectedColor(color.name)}
                    className="gap-2"
                  >
                    <div 
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: color.value }}
                    />
                    {color.name}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="gap-2">
                  <Heart className="h-4 w-4" />
                  Wishlist
                </Button>
                <Button onClick={handleAddToCart} className="gap-2">
                  Place Order
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                No payment required - Order will be placed directly
              </p>
            </div>

            {/* Features */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-success" />
                  <span className="text-sm">Free delivery available</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-success" />
                  <span className="text-sm">Easy returns & exchanges</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-success" />
                  <span className="text-sm">Quality assured</span>
                </div>
              </CardContent>
            </Card>

            {/* Product Features */}
            {product.features && (
              <div className="space-y-3">
                <h3 className="font-medium text-foreground">Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="justify-start">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-medium text-foreground">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;