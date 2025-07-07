"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Download,
  RefreshCw,
  Filter,
  Eye,
  Share,
  Settings,
} from "lucide-react"

export default function SupersetDashboard() {
  const dashboardMetrics = [
    {
      title: "Revenue Growth",
      value: "€2.4M",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-400",
    },
    {
      title: "Customer Acquisition",
      value: "1,247",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "text-blue-400",
    },
    {
      title: "Market Share",
      value: "23.8%",
      change: "+2.1%",
      trend: "up",
      icon: Target,
      color: "text-purple-400",
    },
    {
      title: "Operational Efficiency",
      value: "87%",
      change: "+5.3%",
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-400",
    },
  ]

  const recentReports = [
    {
      id: 1,
      title: "Q4 2024 Business Performance",
      type: "Quarterly Report",
      date: "2024-01-15",
      status: "completed",
      insights: 47,
    },
    {
      id: 2,
      title: "Market Analysis - Tech Sector",
      type: "Market Research",
      date: "2024-01-10",
      status: "completed",
      insights: 23,
    },
    {
      id: 3,
      title: "Competitive Intelligence",
      type: "Competitor Analysis",
      date: "2024-01-08",
      status: "processing",
      insights: 0,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Business Intelligence Dashboard
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dashboardMetrics.map((metric, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <metric.icon className={`w-5 h-5 ${metric.color}`} />
                  <Badge className="bg-green-600 text-white border-green-500 text-xs">{metric.change}</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                  <p className="text-sm text-gray-300">{metric.title}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400">Interactive chart will be displayed here</p>
                <p className="text-sm text-gray-500">Connected to your business data</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Customer Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Users className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400">Customer analytics dashboard</p>
                <p className="text-sm text-gray-500">Real-time customer insights</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Recent Analysis Reports</CardTitle>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Generate New Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{report.title}</h4>
                    <p className="text-sm text-gray-300">{report.type}</p>
                    <p className="text-xs text-gray-400">Generated on {report.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-300">
                      {report.status === "completed" ? `${report.insights} insights` : "Processing..."}
                    </div>
                    <Badge
                      className={
                        report.status === "completed"
                          ? "bg-green-600 text-white border-green-500"
                          : "bg-orange-600 text-white border-orange-500"
                      }
                    >
                      {report.status === "completed" ? "Ready" : "Processing"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    >
                      <Share className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Business Health Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">87/100</div>
                <p className="text-gray-300">Overall Business Health</p>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Financial Performance</span>
                    <span className="text-white">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Operational Efficiency</span>
                    <span className="text-white">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Market Position</span>
                    <span className="text-white">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Innovation Index</span>
                    <span className="text-white">89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Key Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-blue-900/50 border border-blue-700 rounded-lg">
                <h4 className="font-medium text-blue-300 mb-1">Market Expansion</h4>
                <p className="text-sm text-blue-200">
                  Consider expanding to the German market based on current growth trajectory.
                </p>
              </div>
              <div className="p-3 bg-green-900/50 border border-green-700 rounded-lg">
                <h4 className="font-medium text-green-300 mb-1">Operational Optimization</h4>
                <p className="text-sm text-green-200">
                  Implement automation in customer service to improve efficiency by 15%.
                </p>
              </div>
              <div className="p-3 bg-orange-900/50 border border-orange-700 rounded-lg">
                <h4 className="font-medium text-orange-300 mb-1">Technology Upgrade</h4>
                <p className="text-sm text-orange-200">
                  Upgrade your CRM system to better track customer interactions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
