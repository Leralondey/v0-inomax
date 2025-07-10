// in components/login-modal.tsx
"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setIsLoading(false)

    if (result?.ok) {
      onClose(); // Ferme la modale
      router.refresh(); // Rafraîchit la page pour mettre à jour l'état de la session
    } else {
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle>Welcome Back</DialogTitle>
          <DialogDescription>Sign in to access your dashboard.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email-login" className="text-right">Email</Label>
              <Input id="email-login" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3 bg-gray-700 border-gray-600" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password-login" className="text-right">Password</Label>
              <Input id="password-login" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="col-span-3 bg-gray-700 border-gray-600" required />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0">
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}