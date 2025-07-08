import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 })
    }

    // Simulate disconnection process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("🔗 LinkedIn disconnected for user:", userId)

    return NextResponse.json({
      success: true,
      message: "LinkedIn disconnected successfully",
    })
  } catch (error) {
    console.error("LinkedIn disconnection error:", error)
    return NextResponse.json({ success: false, error: "Failed to disconnect LinkedIn" }, { status: 500 })
  }
}
