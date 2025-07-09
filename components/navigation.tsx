"use client"

import { Button } from "@/components/ui/button"
import { BarChart3, Menu } from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import SignupModal from "@/components/signup-modal"
import Link from "next/link"

export function Navigation() {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="border-b border-gray-800 dark:border-gray-200 bg-gray-900/95 dark:bg-gray-50/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60 dark:supports-[backdrop-filter]:bg-gray-50/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                INOMAX.ai
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="/#solutions"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Solutions
            </Link>
            <Link
              href="/#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="/help-center"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Help
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <Button
              onClick={() => setIsSignupModalOpen(true)}
              className="hidden md:block bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
            >
              Get Started
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 dark:border-gray-200 bg-gray-900 dark:bg-gray-50">
            <div className="px-4 py-4 space-y-4">
              <Link
                href="/#features"
                className="block text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 transition-colors"
              >
                Features
              </Link>
              <Link
                href="/#solutions"
                className="block text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 transition-colors"
              >
                Solutions
              </Link>
              <Link
                href="/#pricing"
                className="block text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/help-center"
                className="block text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 transition-colors"
              >
                Help
              </Link>
              <Link
                href="/contact"
                className="block text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 transition-colors"
              >
                Contact
              </Link>

              {/* Mobile Profile Section */}
              <Button
                onClick={() => {
                  setIsSignupModalOpen(true)
                  setIsMobileMenuOpen(false)
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </header>

      <SignupModal isOpen={isSignupModalOpen} onClose={() => setIsSignupModalOpen(false)} />
    </>
  )
}
