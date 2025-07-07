import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for verification codes (use Redis in production)
const verificationCodes = new Map<string, { code: string; timestamp: number; attempts: number }>()

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber } = await request.json()

    if (!phoneNumber) {
      return NextResponse.json({ success: false, error: "Phone number is required" }, { status: 400 })
    }

    // Validate phone number format
    const phoneRegex = /^(\+33|0)[1-9](\d{8})$/
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ""))) {
      return NextResponse.json({ success: false, error: "Invalid phone number format" }, { status: 400 })
    }

    // Generate 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString()

    // Store code with timestamp and reset attempts
    verificationCodes.set(phoneNumber, {
      code,
      timestamp: Date.now(),
      attempts: 0,
    })

    // Clean up expired codes (older than 10 minutes)
    const tenMinutesAgo = Date.now() - 10 * 60 * 1000
    for (const [phone, data] of verificationCodes.entries()) {
      if (data.timestamp < tenMinutesAgo) {
        verificationCodes.delete(phone)
      }
    }

    // Simulate SMS sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In development, log the code
    console.log(`📱 Verification code for ${phoneNumber}: ${code}`)

    return NextResponse.json({
      success: true,
      message: "Verification code sent successfully",
      // In development, include the code in response
      ...(process.env.NODE_ENV === "development" && { debugCode: code }),
    })
  } catch (error) {
    console.error("Error sending verification code:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
