"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { X, Mail, Phone, User, Building, Chrome, Apple } from "lucide-react"

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  firstName: string
  lastName: string
  companyName: string
  email: string
  phone: string
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  if (!isOpen) return null

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Success - close modal and show success message
      alert("Registration successful! You will receive a confirmation email.")
      onClose()

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        companyName: "",
        email: "",
        phone: "",
      })
    } catch (error) {
      alert("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: "google" | "apple") => {
    setIsLoading(true)

    try {
      // Simulate social login
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate getting user data from social provider
      const mockUserData = {
        firstName: provider === "google" ? "John" : "Jane",
        lastName: provider === "google" ? "Doe" : "Smith",
        email: provider === "google" ? "john.doe@gmail.com" : "jane.smith@icloud.com",
        companyName: "",
        phone: "", // Usually not provided by social login
      }

      setFormData(mockUserData)

      // Show message about completing missing info
      if (!mockUserData.phone) {
        alert("Login successful! Please complete the missing information.")
      }
    } catch (error) {
      alert("Login error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700 max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2 w-8 h-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <X className="w-4 h-4" />
          </Button>
          <CardTitle className="text-center text-white text-xl">Start your free evaluation</CardTitle>
          <p className="text-center text-gray-300 text-sm">
            Create your account to access the complete evaluation of your business
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
              className="w-full bg-white text-gray-900 hover:bg-gray-100 border-0 flex items-center gap-3"
            >
              <Chrome className="w-5 h-5" />
              Continue with Google
            </Button>

            <Button
              onClick={() => handleSocialLogin("apple")}
              disabled={isLoading}
              className="w-full bg-black text-white hover:bg-gray-900 border border-gray-600 flex items-center gap-3"
            >
              <Apple className="w-5 h-5" />
              Continue with Apple
            </Button>
          </div>

          <div className="relative">
            <Separator className="bg-gray-600" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-gray-800 px-3 text-sm text-gray-400">or</span>
            </div>
          </div>

          {/* Manual Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white">
                  First Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    placeholder="John"
                  />
                </div>
                {errors.firstName && <p className="text-red-400 text-xs">{errors.firstName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-white">
                  Last Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    placeholder="Doe"
                  />
                </div>
                {errors.lastName && <p className="text-red-400 text-xs">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-white">
                Company Name <span className="text-gray-400">(optional)</span>
              </Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                  placeholder="My Company Ltd"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email Address *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                  placeholder="john.doe@example.com"
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">
                Phone Number *
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                  placeholder="+41 79 123 45 67"
                />
              </div>
              {errors.phone && <p className="text-red-400 text-xs">{errors.phone}</p>}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 mt-6"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </div>
              ) : (
                "Create my free account"
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-xs text-gray-400">
              By creating an account, you accept our{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                terms of service
              </a>{" "}
              and our{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                privacy policy
              </a>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
