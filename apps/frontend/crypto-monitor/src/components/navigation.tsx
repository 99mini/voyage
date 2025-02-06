"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";

export function Navigation() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
      <div className="container mx-auto flex items-center justify-between px-8 py-4">
        <div className="text-3xl font-bold tracking-tight text-blue-500">CryptoMonitor</div>
        <div className="hidden sm:flex items-center gap-8">
          <Link href="/" className="text-foreground text-sm sm:text-base hover:text-blue-500 transition-colors">
            Home
          </Link>
          <Link href="/analysis" className="text-foreground text-sm sm:text-base hover:text-blue-500 transition-colors">
            Analysis
          </Link>
          <Link href="/services" className="text-foreground text-sm sm:text-base hover:text-blue-500 transition-colors">
            Services
          </Link>
          <Link href="/pricing" className="text-foreground text-sm sm:text-base hover:text-blue-500 transition-colors">
            Pricing
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild className="rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors text-white">
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-lg text-foreground border-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Link href="/mypage">My Page</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-lg text-foreground border-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </nav>
  );
}
