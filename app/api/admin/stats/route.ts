import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // In a real application, you would:
    // 1. Verify admin authentication
    // 2. Query the database for statistics
    // 3. Calculate metrics and aggregations

    const mockStats = {
      totalUsers: 5,
      totalCompanies: 3,
      totalFiles: 6,
      totalStorage: 12288000, // bytes
      activeUsers: 4,
      newUsersThisMonth: 2,
      averageMaturityLevel: 3.0,
      systemHealth: {
        databaseStatus: "healthy",
        apiResponseTime: 45,
        storageUsage: 2.3,
        maxStorage: 10,
        activeConnections: 12,
        storagePercentage: 23,
      },
      recentActivity: [
        {
          time: "2024-01-15T10:30:00Z",
          user: "John Smith",
          action: "Updated company maturity level",
          type: "update",
        },
        {
          time: "2024-01-15T10:25:00Z",
          user: "Sarah Johnson",
          action: "Uploaded new document",
          type: "upload",
        },
        {
          time: "2024-01-15T10:20:00Z",
          user: "Admin",
          action: "Database backup completed",
          type: "system",
        },
        {
          time: "2024-01-15T10:15:00Z",
          user: "Michael Brown",
          action: "Invited new team member",
          type: "invite",
        },
        {
          time: "2024-01-15T10:10:00Z",
          user: "System",
          action: "Automated maturity assessment",
          type: "system",
        },
      ],
    }

    return NextResponse.json(mockStats)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}
