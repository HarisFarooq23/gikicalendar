
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ArrowRight, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/subscribe", label: "Subscribe" },
  { href: "/admin/add-event", label: "Add Event" },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, isModerator, logout } = useAuth();
  const router = useRouter();

  const allNavLinks = [...navLinks];

  const Logo = () => (
     <Link href="/" className="flex items-center">
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
        {allNavLinks.map(({ href, label }) => (
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

  const AuthButtons = ({ inMobileSheet = false }: { inMobileSheet?: boolean }) => {
    if (isLoggedIn) {
      return (
        <Button onClick={logout} variant="outline" className={inMobileSheet ? "w-full" : ""}>
          Logout
          <LogOut className="ml-2 h-4 w-4" />
        </Button>
      );
    }
    return (
     <div className={cn("flex items-center gap-4", inMobileSheet && "w-full flex-col")}>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className={inMobileSheet ? "w-full" : ""}>
                    Sign Up
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => router.push('/signup/user')}>
                    User Signup
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => router.push('/signup/moderator')}>
                    Moderator Signup
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
    )
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
            <div className="md:pl-8">
              <Logo />
            </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
            <NavMenu />
        </div>

        <div className="flex items-center gap-4">
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
                            <SheetClose asChild>
                                <Button variant="ghost" size="icon">
                                    <X className="h-5 w-5" />
                                    <span className="sr-only">Close menu</span>
                                </Button>
                            </SheetClose>
                        </div>
                        <div className="flex flex-col flex-grow justify-between">
                            <NavMenu isMobile={true} />
                            <div className="mt-auto pb-4">
                                <AuthButtons inMobileSheet={true} />
                            </div>
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
