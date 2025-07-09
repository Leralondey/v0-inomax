"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BarChart3, Menu, User, Settings, LogOut, Shield } from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import SignupModal from "@/components/signup-modal"

export function Navigation() {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Simulation de l'état d'authentification - à remplacer par votre logique d'auth
  const [isAuthenticated, setIsAuthenticated] = useState(true) // Changez à false pour tester l'état non connecté
  const [userRole, setUserRole] = useState("admin") // "user" ou "admin"
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john.doe@company.com",
    avatar: "/placeholder.svg?height=32&width=32",
  })

  const handleLogout = () => {
    setIsAuthenticated(false)
    // Logique de déconnexion
  }

  return (
    <>
      <header className="border-b border-gray-800 dark:border-gray-200 bg-gray-900/95 dark:bg-gray-50/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60 dark:supports-[backdrop-filter]:bg-gray-50/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              INOMAX.ai
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/#features"
              className="text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 transition-colors"
            >
              Features
            </a>
            <a
              href="/#solutions"
              className="text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 transition-colors"
            >
              Solutions
            </a>
            <a
              href="/#pricing"
              className="text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 transition-colors"
            >
              Pricing
            </a>
            <a
              href="/#about"
              className="text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 transition-colors"
            >
              About
            </a>
            <a
              href="/help-center"
              className="text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 transition-colors"
            >
              Help
            </a>
            <a
              href="/contact"
              className="text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 transition-colors"
            >
              Contact
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {/* Profile Avatar - Only shown when authenticated */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
                        {userProfile.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200"
                  align="end"
                  forceMount
                >
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-white dark:text-gray-900">{userProfile.name}</p>
                      <p className="w-[200px] truncate text-sm text-gray-300 dark:text-gray-500">{userProfile.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-gray-700 dark:bg-gray-200" />
                  <DropdownMenuItem asChild>
                    <a
                      href="/profile"
                      className="flex items-center text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  {userRole === "admin" && (
                    <DropdownMenuItem asChild>
                      <a
                        href="/admin"
                        className="flex items-center text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100"
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Administration</span>
                      </a>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-gray-700 dark:bg-gray-200" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-400 hover:bg-red-900/20 dark:text-red-600 dark:hover:bg-red-100"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => setIsSignupModalOpen(true)}
                className="hidden md:block bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
              >
                Get Started
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 dark:border-gray-200 bg-gray-900 dark:bg-gray-50">
            <div className="px-4 py-4 space-y-4">
              <a
                href="/#features"
                className="block text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 transition-colors"
              >
                Features
              </a>
              <a
                href="/#solutions"
                className="block text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 transition-colors"
              >
                Solutions
              </a>
              <a
                href="/#pricing"
                className="block text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 transition-colors"
              >
                Pricing
              </a>
              <a
                href="/#about"
                className="block text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 transition-colors"
              >
                About
              </a>
              <a
                href="/help-center"
                className="block text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 transition-colors"
              >
                Help
              </a>
              <a
                href="/contact"
                className="block text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 transition-colors"
              >
                Contact
              </a>

              {/* Mobile Profile Section */}
              {isAuthenticated ? (
                <div className="pt-4 border-t border-gray-800 dark:border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
                        {userProfile.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-white dark:text-gray-900">{userProfile.name}</p>
                      <p className="text-sm text-gray-300 dark:text-gray-500">{userProfile.email}</p>
                    </div>
                  </div>
                  <a
                    href="/profile"
                    className="flex items-center gap-2 text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 transition-colors py-2"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </a>
                  <div className="flex items-center gap-2 text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 transition-colors py-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </div>
                  {userRole === "admin" && (
                    <a
                      href="/admin"
                      className="flex items-center gap-2 text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 transition-colors py-2"
                    >
                      <Shield className="h-4 w-4" />
                      Administration
                    </a>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-400 dark:text-red-600 hover:text-red-300 dark:hover:text-red-700 transition-colors py-2 w-full text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsSignupModalOpen(true)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                >
                  Get Started
                </Button>
              )}
            </div>
          </div>
        )}
      </header>

      <SignupModal isOpen={isSignupModalOpen} onClose={() => setIsSignupModalOpen(false)} />
    </>
  )
}
