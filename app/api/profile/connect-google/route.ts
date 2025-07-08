import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 })
    }

    // Simulate Google OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock Google profile data (limited compared to LinkedIn)
    const mockGoogleData = {
      id: "google_789012",
      name: "John Doe",
      email: "john.doe@gmail.com",
      profilePicture: "https://lh3.googleusercontent.com/profile-photo.jpg",
    }

    console.log("🔍 Google connected for user:", userId)

    return NextResponse.json({
      success: true,
      message: "Google connected successfully",
      profileData: mockGoogleData,
    })
  } catch (error) {
    console.error("Google connection error:", error)
    return NextResponse.json({ success: false, error: "Failed to connect Google" }, { status: 500 })
  }
}
