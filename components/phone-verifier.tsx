"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Phone, Shield, CheckCircle, Clock, AlertCircle, Loader2 } from "lucide-react"

interface PhoneVerifierProps {
  initialPhone?: string
  onVerificationComplete?: (phoneNumber: string) => void
}

export default function PhoneVerifier({ initialPhone = "", onVerificationComplete }: PhoneVerifierProps) {
  const [phoneNumber, setPhoneNumber] = useState(initialPhone)
  const [verificationCode, setVerificationCode] = useState("")
  const [step, setStep] = useState<"phone" | "code" | "verified">("phone")
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const { toast } = useToast()

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "")

    // Convert French mobile format
    if (digits.startsWith("06") || digits.startsWith("07")) {
      return `+33${digits.substring(1)}`
    }

    // If already starts with +33, keep it
    if (digits.startsWith("33")) {
      return `+${digits}`
    }

    return value
  }

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^(\+33|0)[1-9](\d{8})$/
    return phoneRegex.test(phone.replace(/\s/g, ""))
  }

  const sendVerificationCode = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid French phone number",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/verify-phone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      })

      const result = await response.json()

      if (result.success) {
        setStep("code")
        setCountdown(60)

        // Start countdown
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)

        toast({
          title: "Verification Code Sent",
          description: "Please check your phone for the verification code",
        })

        // In development, show the code
        if (result.debugCode) {
          toast({
            title: "Development Mode",
            description: `Verification code: ${result.debugCode}`,
          })
        }
      } else {
        throw new Error(result.error || "Failed to send verification code")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send verification code",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const confirmVerificationCode = async () => {
    if (verificationCode.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter the 6-digit verification code",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/confirm-phone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, code: verificationCode }),
      })

      const result = await response.json()

      if (result.success) {
        setStep("verified")
        onVerificationComplete?.(phoneNumber)
        toast({
          title: "Phone Verified",
          description: "Your phone number has been successfully verified",
        })
      } else {
        setAttempts((prev) => prev + 1)
        throw new Error(result.error || "Invalid verification code")
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: error instanceof Error ? error.message : "Invalid verification code",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const resetVerification = () => {
    setStep("phone")
    setVerificationCode("")
    setAttempts(0)
    setCountdown(0)
  }

  const getStatusBadge = () => {
    switch (step) {
      case "verified":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        )
      case "code":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary">
            <AlertCircle className="w-3 h-3 mr-1" />
            Not Verified
          </Badge>
        )
    }
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-green-400" />
            <CardTitle className="text-white">Phone Verification</CardTitle>
          </div>
          {getStatusBadge()}
        </div>
        <CardDescription className="text-slate-400">Verify your phone number to secure your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === "phone" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-slate-300">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="+33 6 12 34 56 78"
              />
              <p className="text-xs text-slate-400">Enter your French mobile number (06... or 07...)</p>
            </div>
            <Button
              onClick={sendVerificationCode}
              disabled={isLoading || !phoneNumber}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Send Verification Code
                </>
              )}
            </Button>
          </div>
        )}

        {step === "code" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="verificationCode" className="text-slate-300">
                Verification Code
              </Label>
              <Input
                id="verificationCode"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="bg-slate-700 border-slate-600 text-white text-center text-lg tracking-widest"
                placeholder="123456"
                maxLength={6}
              />
              <p className="text-xs text-slate-400">Enter the 6-digit code sent to {phoneNumber}</p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={confirmVerificationCode}
                disabled={isLoading || verificationCode.length !== 6}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verify Code
                  </>
                )}
              </Button>
              <Button
                onClick={resetVerification}
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
              >
                Change Number
              </Button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">{attempts > 0 && `${attempts}/3 attempts used`}</span>
              <Button
                onClick={sendVerificationCode}
                disabled={countdown > 0 || isLoading}
                variant="ghost"
                size="sm"
                className="text-blue-400 hover:text-blue-300"
              >
                {countdown > 0 ? `Resend in ${countdown}s` : "Resend Code"}
              </Button>
            </div>
          </div>
        )}

        {step === "verified" && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium">Phone Number Verified!</h3>
              <p className="text-slate-400 text-sm">{phoneNumber}</p>
            </div>
            <Button
              onClick={resetVerification}
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
            >
              Change Number
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
