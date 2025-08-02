"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, AppWindow } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/subscribe", label: "Subscribe" },
  { href: "/about", label: "About Us" },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSignIn = () => setIsAuthenticated(true);
  const handleSignOut = () => setIsAuthenticated(false);

  const Logo = () => (
     <Link href="/" className="flex items-center space-x-2">
        <AppWindow className="h-6 w-6 text-foreground" />
        <span className="font-bold text-lg text-foreground whitespace-nowrap">GikiCalendar</span>
    </Link>
  );

  const NavMenu = () => (
    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        {navLinks.map(({ href, label }) => (
        <Link
            key={href}
            href={href}
            className={cn(
            "transition-colors hover:text-primary",
            pathname === href ? "text-primary" : "text-foreground"
            )}
        >
            {label}
        </Link>
        ))}
    </nav>
  );

  const AuthButtons = () => (
     <div className="flex items-center justify-end space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarImage src="https://placehold.co/40x40.png" alt="User avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
             <Button onClick={handleSignIn} size="sm" variant="outline">
                Sign Up
            </Button>
          )}
        </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-transparent backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Left Section: Logo */}
        <div className="flex-1 flex justify-start">
            <Logo />
        </div>

        {/* Center Section: Navigation */}
        <div className="flex-1 flex justify-center">
            <div className="hidden md:block">
                <NavMenu />
            </div>
            {/* Mobile Burger Menu */}
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
                    <nav className="flex flex-col gap-4 mt-6">
                        {navLinks.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                            "text-lg font-medium transition-colors hover:text-primary",
                            pathname === href ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            {label}
                        </Link>
                        ))}
                    </nav>
                    </div>
                </SheetContent>
                </Sheet>
            </div>
        </div>

        {/* Right Section: Auth */}
        <div className="flex-1 flex justify-end">
            <div className="hidden md:block">
                <AuthButtons />
            </div>
        </div>
      </div>
    </header>
  );
}
