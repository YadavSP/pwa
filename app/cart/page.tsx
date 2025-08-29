// FILE: app/cart/page.tsx (CORRECTED LOGIC)

"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// ... (your other imports)
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/Header';
import { ArrowLeft, Trash2, ShoppingCart, Minus, Plus } from 'lucide-react';

interface CartItem {
  productId: string;
  product: { name: string; price: number; images: string[]; brand: string; };
  size: string;
  color: string;
  quantity: number;
}

const CartPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Function to load cart from localStorage
  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');
    setCartItems(cart.items);
  };

  useEffect(() => {
    setIsClient(true);
    loadCart();
  }, []);

  const handleUpdateCart = (updatedItems: CartItem[]) => {
    const newCart = { items: updatedItems };
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCartItems(updatedItems);
  };

  const handleRemoveItem = (compositeKey: string) => {
    const updatedItems = cartItems.filter(item => {
      const itemKey = `${item.productId}-${item.size}-${item.color}`;
      return itemKey !== compositeKey;
    });
    handleUpdateCart(updatedItems);
    toast({ variant: "destructive", title: "Item Removed" });
  };
  
  const handleUpdateQuantity = (compositeKey: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(compositeKey);
      return;
    }
    const updatedItems = cartItems.map(item => {
      const itemKey = `${item.productId}-${item.size}-${item.color}`;
      if (itemKey === compositeKey) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    handleUpdateCart(updatedItems);
  };

  const handlePlaceOrder = () => {
    localStorage.removeItem('cart');
    setCartItems([]);
    toast({ variant: "success", title: "Order Placed!", description: "Thank you for your purchase!" });
    router.push('/Products');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = subtotal > 500 ? 0 : 50;
  const total = subtotal + shippingFee;

  if (!isClient) { /* ... Loading state remains the same ... */ }
  if (cartItems.length === 0) { /* ... Empty cart view remains the same ... */ }

  return (
    <div className="min-h-screen bg-muted/20">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Your Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <ul className="divide-y">
                  {cartItems.map(item => {
                    const compositeKey = `${item.productId}-${item.size}-${item.color}`;
                    return (
                      <li key={compositeKey} className="flex items-start gap-4 p-4">
                        <div className="relative h-24 w-24 overflow-hidden rounded-md border">
                          <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                          <p className="text-sm">Size: {item.size} | Color: {item.color}</p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleUpdateQuantity(compositeKey, item.quantity - 1)}>
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center font-bold">{item.quantity}</span>
                              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleUpdateQuantity(compositeKey, item.quantity + 1)}>
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="font-bold text-lg">₹{item.product.price * item.quantity}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(compositeKey)}>
                          <Trash2 className="h-5 w-5 text-muted-foreground hover:text-destructive" />
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your order before proceeding.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between"><span>Subtotal</span><span className="font-medium">₹{subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Shipping Fee</span><span className="font-medium">{shippingFee === 0 ? "Free" : `₹${shippingFee.toFixed(2)}`}</span></div>
                <Separator />
                <div className="flex justify-between text-lg font-bold"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
              </CardContent>
              <CardFooter>
                <Button onClick={handlePlaceOrder} size="lg" className="w-full text-white font-bold bg-gradient-to-r from-green-500 to-emerald-600 shadow-md hover:from-green-600 hover:to-emerald-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  Place Order
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;