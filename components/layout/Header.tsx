"use client";

import { Search, Heart, ShoppingBag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const Header = () => {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    try {
      const ordersRaw = localStorage.getItem('orders');
      if (ordersRaw) {
        const existingOrders = JSON.parse(ordersRaw);
        const totalItems = existingOrders.reduce((acc: any, order: { items: any[]; }) => 
          acc + order.items.reduce((itemAcc, item) => itemAcc + item.quantity, 0), 0);
        setCartItemCount(totalItems);
      }
    } catch (error) {
      console.error("Failed to parse orders from localStorage", error);
    }
  }, []);

  return (
    //  --- HEADER WITH GRADIENT BACKGROUND ---
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 shadow-sm">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center px-4">
        
        {/* --- LOGO AND ANIMATED GRADIENT BRAND NAME --- */}
        <Link href="/Products" className="mr-6 flex items-center space-x-3">
          <Image
            src="/logo.gif"
            alt="Unbottled Animated Logo"
            width={180}
            height={140}
            unoptimized={true}
            className="rounded-lg"
          />
          <span className="hidden sm:inline-block text-2xl font-bold
                           bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 
                           text-transparent bg-clip-text animate-gradient">
            Unbottled
          </span>
        </Link>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Centered Search Bar - Hidden on mobile for a cleaner look */}
          <div className="hidden flex-1 justify-center md:flex">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search for t-shirts, jackets..." 
                className="w-full rounded-full pl-10 border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>

            <Link href='/wishlist' passHref>
              <Button variant="ghost" size="icon" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>

            <Link href='/cart' passHref>
              <Button variant="ghost" size="icon" className="relative" aria-label="Shopping Cart">
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            <Link href='/profile' passHref>
              <Button variant="ghost" size="icon" aria-label="User Profile">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};