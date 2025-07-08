import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // In a real application, you would:
    // 1. Verify admin authentication
    // 2. Query the database for companies
    // 3. Apply filters and pagination

    const mockCompanies = [
      {
        id: "1",
        name: "TechCorp Inc.",
        industry: "Technology",
        size: "Large (500+ employees)",
        maturityLevel: 4,
        usersCount: 12,
        documentsCount: 156,
        createdAt: "2023-12-01T09:00:00Z",
        lastActivity: "2024-01-15T10:30:00Z",
      },
      // Add more mock companies as needed
    ]

    return NextResponse.json({ companies: mockCompanies })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch companies" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { companyId, maturityLevel } = body

    // In a real application, you would:
    // 1. Verify admin authentication
    // 2. Validate the maturity level
    // 3. Update the company in the database
    // 4. Update all users in the company
    // 5. Log the admin action

    console.log(`Updating company ${companyId} maturity level to:`, maturityLevel)

    return NextResponse.json({
      success: true,
      message: "Company maturity level updated successfully",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update company maturity level" }, { status: 500 })
  }
}
