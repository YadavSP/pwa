"use client"; // Make sure this is at the very top

import { Search, Heart, ShoppingBag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link'; // Use next/link for client-side navigation
import { useEffect, useState } from 'react'; // Import useEffect and useState

export const Header = () => {
  //const [cartItemCount, setCartItemCount] = useState(0); // Initialize with 0

//   useEffect(() => {
//     // This code only runs on the client side
//     const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
//     const totalItems = existingOrders.reduce((acc: number, order: any) => 
//       acc + order.items.reduce((itemAcc: number, item: any) => itemAcc + item.quantity, 0)
//     , 0);
//     setCartItemCount(totalItems);
//   }, []); // Empty dependency array means this runs once after initial render

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-hover rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-xl text-foreground">StyleStore</span>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search for t-shirts, jackets..." 
                className="pl-10 bg-muted/50"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Search Icon for Mobile */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            <Link href='/wishlist'>
              <Heart className="h-5 w-5" />
            </Link>

            <Link 
              href='/cart'
              className="relative"
            >
              <ShoppingBag className="h-5 w-5" />

              {/* {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )} */}
            </Link>

            <Link href='/profile'>
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search for t-shirts, jackets..." 
              className="pl-10 bg-muted/50"
            />
          </div>
        </div>
      </div>
    </header>
  );
};