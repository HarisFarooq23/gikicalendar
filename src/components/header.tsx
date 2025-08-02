
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, School, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About Us" },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const Logo = () => (
     <Link href="/" className="flex items-center space-x-2">
        <School className="h-8 w-8 text-primary" />
        <span className="font-bold text-3xl whitespace-nowrap">
            <span className="text-foreground">Giki</span>
            <span className="text-primary">Calendar</span>
        </span>
    </Link>
  );

  const NavMenu = ({isMobile = false}: {isMobile?: boolean}) => (
    <nav className={cn(
        "flex items-center gap-6 text-sm font-medium",
        isMobile && "flex-col items-start gap-4 mt-6"
    )}>
        {navLinks.map(({ href, label }) => (
        <Link
            key={href}
            href={href}
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
            className={cn(
            "transition-colors hover:text-primary",
            pathname === href ? "text-primary font-bold" : "text-muted-foreground",
             isMobile && "text-lg"
            )}
        >
            {label}
        </Link>
        ))}
    </nav>
  );

  const AuthButtons = () => (
     <div className="flex items-center gap-4">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>
                    Sign Up
                    <ArrowRight />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href="/signup/user">User Signup</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/signup/moderator">Moderator Signup</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center">
            <Logo />
        </div>

        <div className="hidden md:flex items-center gap-6">
            <NavMenu />
        </div>

        <div className="ml-auto flex items-center gap-4">
            <div className="hidden md:flex">
                <AuthButtons />
            </div>
            
            <div className="md:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between pb-4 border-b">
                        <Logo />
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close menu</span>
                        </Button>
                    </div>
                    <NavMenu isMobile={true} />
                        <div className="mt-auto pb-4">
                        <AuthButtons />
                    </div>
                    </div>
                </SheetContent>
                </Sheet>
            </div>
        </div>
            
      </div>
    </header>
  );
}
