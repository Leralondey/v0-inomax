import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for verification codes (use Redis in production)
const verificationCodes = new Map<string, { code: string; timestamp: number; attempts: number }>()

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, code } = await request.json()

    if (!phoneNumber || !code) {
      return NextResponse.json({ success: false, error: "Phone number and code are required" }, { status: 400 })
    }

    const storedData = verificationCodes.get(phoneNumber)

    if (!storedData) {
      return NextResponse.json({ success: false, error: "No verification code found for this number" }, { status: 400 })
    }

    // Check if code is expired (10 minutes)
    const tenMinutesAgo = Date.now() - 10 * 60 * 1000
    if (storedData.timestamp < tenMinutesAgo) {
      verificationCodes.delete(phoneNumber)
      return NextResponse.json({ success: false, error: "Verification code has expired" }, { status: 400 })
    }

    // Check attempts limit
    if (storedData.attempts >= 3) {
      verificationCodes.delete(phoneNumber)
      return NextResponse.json(
        { success: false, error: "Too many failed attempts. Please request a new code." },
        { status: 400 },
      )
    }

    // Verify code
    if (storedData.code !== code) {
      // Increment attempts
      storedData.attempts += 1
      verificationCodes.set(phoneNumber, storedData)

      return NextResponse.json(
        {
          success: false,
          error: `Invalid verification code. ${3 - storedData.attempts} attempts remaining.`,
        },
        { status: 400 },
      )
    }

    // Code is correct, remove from storage
    verificationCodes.delete(phoneNumber)

    console.log(`✅ Phone number verified: ${phoneNumber}`)

    return NextResponse.json({
      success: true,
      message: "Phone number verified successfully",
    })
  } catch (error) {
    console.error("Error confirming verification code:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
