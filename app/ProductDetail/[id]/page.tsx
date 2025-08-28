// app/ProductDetail/[id]/page.tsx
"use client"

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

// Shadcn UI & Lucide Icons - Note the capital letters
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card'; // <-- Must be <Card>, not <card>
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Heart, Star, Shield, Truck, RotateCcw } from 'lucide-react';

// Your Components & Data
import { dummyProducts } from '@/data/product';
import { Header } from '@/components/layout/Header';
import { ProductImageGallery } from '@/components/product/ProductImageGallery';

const ProductDetail = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { toast } = useToast();

  const product = dummyProducts.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Business logic remains the same...
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Selection Required",
        description: "Please select a size and color before placing your order.",
        variant: "destructive"
      });
      return;
    }
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = {
      id: Date.now().toString(),
      items: [{ productId: product.id, product, size: selectedSize, color: selectedColor, quantity: 1 }],
      total: product.price,
      status: 'pending',
      date: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
    localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));
    toast({
      title: "Success!",
      description: "Your order has been placed and is now visible in your Orders page.",
    });
    router.push('/Orders');
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
             <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div>
              <p className="text-sm font-medium text-primary uppercase tracking-wide">{product.brand}</p>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mt-1">{product.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-foreground">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">{product.reviewCount} reviews</span>
              </div>
            </div>

            {/* Correctly capitalized <Card> and <CardContent> */}
            <Card className="bg-card">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-foreground">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">₹{product.originalPrice}</span>
                  )}
                </div>
                {product.discount && (
                  <Badge variant="destructive" className="text-base">
                    {Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}% OFF
                  </Badge>
                )}
                <p className="text-sm text-green-600 font-semibold">Inclusive of all taxes</p>
              </CardContent>
            </Card>

            {/* Correctly capitalized <Card> and <CardContent> */}
            <Card className="bg-card">
              <CardContent className="p-4 space-y-4">
                {/* --- SIZE SELECTION --- */}
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-3">Select Size</h3>
                  <div className="flex flex-wrap justify-start gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-md border h-10 px-4 transition-all duration-200 flex items-center justify-center text-sm font-semibold
                                  ${selectedSize === size
                                    ? 'bg-green-600 text-white border-green-700'
                                    : 'bg-transparent hover:bg-accent hover:text-accent-foreground'
                                  }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <Separator />

                {/* --- COLOR SELECTION --- */}
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-3">Select Color</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200
                                  ${selectedColor === color.name 
                                    ? 'ring-2 ring-offset-2 ring-primary scale-110'
                                    : 'border-muted hover:scale-110'
                                  }`}
                        style={{ backgroundColor: color.value }}
                        aria-label={`Select color ${color.name}`}
                      />
                    ))}
                    {selectedColor && <span className="text-sm text-foreground">{selectedColor}</span>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* --- ACTION BUTTONS --- */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="lg" className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Wishlist
                </Button>
                <Button 
                  onClick={handleAddToCart} 
                  size="lg" 
                  className="w-full text-white font-bold bg-gradient-to-r from-green-500 to-emerald-600 shadow-md hover:from-green-600 hover:to-emerald-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Place Order
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">This is a demo. No payment is required.</p>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-card border"><Truck className="h-6 w-6 mx-auto text-muted-foreground"/><p className="text-xs mt-1">Free Delivery</p></div>
              <div className="p-2 rounded-lg bg-card border"><RotateCcw className="h-6 w-6 mx-auto text-muted-foreground"/><p className="text-xs mt-1">Easy Returns</p></div>
              <div className="p-2 rounded-lg bg-card border"><Shield className="h-6 w-6 mx-auto text-muted-foreground"/><p className="text-xs mt-1">Quality Assured</p></div>
            </div>

            {/* Correctly capitalized Accordion components */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="description"><AccordionTrigger>Description</AccordionTrigger><AccordionContent className="text-muted-foreground">{product.description}</AccordionContent></AccordionItem>
              {product.features && (
                <AccordionItem value="features"><AccordionTrigger>Features</AccordionTrigger><AccordionContent><ul className="list-disc list-inside text-muted-foreground space-y-1">{product.features.map((feature, index) => <li key={index}>{feature}</li>)}</ul></AccordionContent></AccordionItem>
              )}
            </Accordion>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;