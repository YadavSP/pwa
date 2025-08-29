// FILE: components/layout/Header.tsx (SIMPLIFIED - NO SEARCH)

"use client";

import { ShoppingBag, User, Package } from 'lucide-react'; // <-- Removed Search icon
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const Header = () => {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cartRaw = localStorage.getItem('cart');
        if (cartRaw) {
          const cart = JSON.parse(cartRaw);
          const totalItems = cart.items.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0);
          setCartItemCount(totalItems);
        } else {
          setCartItemCount(0);
        }
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
        setCartItemCount(0);
      }
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 shadow-sm">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        
        {/* Logo and Animated Gradient Brand Name */}
        <Link href="/Products" className="flex items-center space-x-3">
          <Image
            src="/logo.gif"
            alt="Unbottled Animated Logo"
            width={170}
            height={120}
            unoptimized={true}
            className="rounded-lg h-14 w-auto" // Adjusted for better aspect ratio
          />
          <span className="hidden sm:inline-block text-2xl font-bold
                           bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 
                           text-transparent bg-clip-text animate-gradient">
            Unbottled
          </span>
        </Link>
        
        {/* Action Icons (Search is now gone) */}
        <div className="flex items-center space-x-1">
          <Link href='/Orders' passHref>
            <Button variant="ghost" size="icon" aria-label="My Orders">
              <Package className="h-5 w-5" />
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
    </header>
  );
};