// in components/signup-modal.tsx
"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Chrome, Apple, Linkedin } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
}

// 1. AJOUTER 'password' A L'INTERFACE
interface FormData {
  firstName: string
  lastName: string
  companyName: string
  companyWebsite: string
  email: string
  phone: string
  password: string
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    companyName: "",
    companyWebsite: "",
    email: "",
    phone: "",
    password: "", // 2. AJOUTER 'password' A L'ETAT INITIAL
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (formData.companyWebsite.trim() && !/^https?:\/\/.+\..+/.test(formData.companyWebsite)) {
      newErrors.companyWebsite = "Please enter a valid URL"
    }
    // 3. AJOUTER LA VALIDATION POUR LE MOT DE PASSE
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 4. METTRE A JOUR LA FONCTION 'handleSubmit'
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsLoading(true)
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Registration successful! Please login.");
        onClose();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Something went wrong.'}`);
      }
    } catch (error) {
      alert("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto p-0 sm:max-w-md">
        <Card className="w-full border-0">
          <CardHeader className="text-center">
            <CardTitle>Start your free evaluation</CardTitle>
            <CardDescription>Create your account to access the complete evaluation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Social login buttons (inchangés pour l'instant) */}
            <div className="space-y-3">
              {/* ... vos boutons Google, Apple, etc. ... */}
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* ... vos champs existants ... */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="John" onChange={(e) => handleInputChange("firstName", e.target.value)} />
                    {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
                </div>
                <div className="space-y-1">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Doe" onChange={(e) => handleInputChange("lastName", e.target.value)} />
                    {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input id="companyName" placeholder="My Company Ltd" onChange={(e) => handleInputChange("companyName", e.target.value)} />
                {errors.companyName && <p className="text-xs text-destructive">{errors.companyName}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="companyWebsite">Company Website</Label>
                <Input id="companyWebsite" placeholder="https://mycompany.com" onChange={(e) => handleInputChange("companyWebsite", e.target.value)} />
                {errors.companyWebsite && <p className="text-xs text-destructive">{errors.companyWebsite}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" placeholder="john.doe@company.com" onChange={(e) => handleInputChange("email", e.target.value)} />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>
               <div className="space-y-1">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" placeholder="+41 79 123 45 67" onChange={(e) => handleInputChange("phone", e.target.value)} />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
              </div>

              {/* 5. AJOUTER LE CHAMP MOT DE PASSE AU FORMULAIRE */}
              <div className="space-y-1">
                <Label htmlFor="password">Password *</Label>
                <Input id="password" type="password" onChange={(e) => handleInputChange("password", e.target.value)} />
                {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
              </div>
              
              <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90">
                {isLoading ? "Creating account..." : "Create my free account"}
              </Button>
            </form>
            <p className="px-8 text-center text-xs text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <a href="/terms" className="underline underline-offset-4 hover:text-primary">Terms of Service</a>
              {" "}and{" "}
              <a href="/privacy" className="underline underline-offset-4 hover:text-primary">Privacy Policy</a>.
            </p>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}