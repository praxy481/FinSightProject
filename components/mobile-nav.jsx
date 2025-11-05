"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

// Accept { children } as a prop
const MobileNav = ({ children }) => {
  return (
    // Only shows on mobile (md:hidden)
    <header className="md:hidden fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <Image
            src={"/logo-1.png"}
            alt="FinSight Logo"
            width={150}
            height={45}
            className="h-10 w-auto object-contain"
          />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="pt-16">
            <nav className="flex flex-col gap-y-4">
              {/* Render the children prop here */}
              {children}
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default MobileNav;