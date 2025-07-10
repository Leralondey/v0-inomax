// in components/navigation.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { BarChart3, Menu } from "lucide-react"

interface NavigationProps {
  onLoginClick: () => void
  onSignupClick: () => void
}

export function Navigation({ onLoginClick, onSignupClick }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data: session, status } = useSession()

  const handleLogout = () => {
    signOut({ callbackUrl: '/' })
  }

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <header className="border-b border-gray-800 dark:border-gray-200 bg-gray-900/95 dark:bg-gray-50/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60 dark:supports-[backdrop-filter]:bg-gray-50/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            INOMAX.ai
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Features</Link>
          <Link href="/#solutions" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Solutions</Link>
          <Link href="/#pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Pricing</Link>
          <Link href="/help-center" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Help</Link>
          <Link href="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Contact</Link>
        </nav>
        
        <div className="flex items-center space-x-2">
          <ThemeToggle />

          <div className="hidden md:flex items-center space-x-4">
            {status === "loading" ? (
              <div className="w-24 h-10 rounded-md bg-gray-700 animate-pulse" />
            ) : session ? (
              <>
                <span className="text-sm text-muted-foreground hidden lg:block">Welcome, {session.user?.name}</span>
                <Button variant="outline" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={onLoginClick}>Login</Button>
                <Button onClick={onSignupClick} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0">
                  Get Started
                </Button>
              </>
            )}
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-800 dark:border-gray-200">
          <div className="px-4 py-4 space-y-4">
            <Link href="/#features" onClick={closeMobileMenu} className="block text-muted-foreground hover:text-foreground">Features</Link>
            <Link href="/#solutions" onClick={closeMobileMenu} className="block text-muted-foreground hover:text-foreground">Solutions</Link>
            <Link href="/#pricing" onClick={closeMobileMenu} className="block text-muted-foreground hover:text-foreground">Pricing</Link>
            <Link href="/help-center" onClick={closeMobileMenu} className="block text-muted-foreground hover:text-foreground">Help</Link>
            <Link href="/contact" onClick={closeMobileMenu} className="block text-muted-foreground hover:text-foreground">Contact</Link>
            
            <div className="border-t border-gray-700 pt-4 mt-4 space-y-2">
              {status === "loading" ? (
                <div className="w-full h-10 rounded-md bg-gray-700 animate-pulse" />
              ) : session ? (
                <>
                  <p className="text-sm text-muted-foreground px-2">Welcome, {session.user?.name}</p>
                  <Button onClick={() => { handleLogout(); closeMobileMenu(); }} className="w-full">Logout</Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => { onLoginClick(); closeMobileMenu(); }} className="w-full">Login</Button>
                  <Button onClick={() => { onSignupClick(); closeMobileMenu(); }} className="w-full bg-gradient-to-r from-blue-500 to-purple-500">Get Started</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}