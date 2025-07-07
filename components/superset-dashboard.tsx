"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  PieChart,
  Activity,
  Calendar,
  Download,
  RefreshCw,
  ExternalLink,
  AlertCircle,
  FileText,
} from "lucide-react"

export default function SupersetDashboard() {
  const dashboardStats = [
    {
      title: "Business Score",
      value: "78/100",
      change: "+5.2%",
      trend: "up",
      icon: Target,
      color: "text-blue-400",
    },
    {
      title: "Revenue Growth",
      value: "€2.4M",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-400",
    },
    {
      title: "Team Size",
      value: "47",
      change: "+8 this month",
      trend: "up",
      icon: Users,
      color: "text-purple-400",
    },
    {
      title: "Market Position",
      value: "Strong",
      change: "Improved",
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-400",
    },
  ]

  const recentReports = [
    {
      title: "Q4 2024 Business Assessment",
      date: "2024-12-15",
      type: "Comprehensive",
      status: "completed",
      score: 78,
    },
    {
      title: "Financial Health Check",
      date: "2024-11-28",
      type: "Financial",
      status: "completed",
      score: 82,
    },
    {
      title: "Team & HR Evaluation",
      date: "2024-11-15",
      type: "HR",
      status: "completed",
      score: 75,
    },
    {
      title: "Market Analysis Report",
      date: "2024-10-30",
      type: "Market",
      status: "completed",
      score: 71,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white">Analytics Dashboard</CardTitle>
            <p className="text-gray-400 mt-1">Real-time insights into your business performance</p>
          </div>
          <div className="flex gap-2">
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
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800 border-gray-700">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="financial"
            className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
          >
            Financial
          </TabsTrigger>
          <TabsTrigger
            value="operational"
            className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
          >
            Operational
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
          >
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Business Performance Chart */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Business Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Activity className="w-12 h-12 mx-auto mb-2" />
                    <p>Interactive chart will be displayed here</p>
                    <p className="text-sm">Connected to Apache Superset</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Score Breakdown */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Score Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "Financial Health", score: 85, color: "bg-green-500" },
                    { category: "Team & HR", score: 78, color: "bg-blue-500" },
                    { category: "Operations", score: 82, color: "bg-purple-500" },
                    { category: "Strategy", score: 75, color: "bg-orange-500" },
                    { category: "Risk Management", score: 70, color: "bg-red-500" },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">{item.category}</span>
                        <span className="text-white font-medium">{item.score}/100</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`${item.color} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${item.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Revenue Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <DollarSign className="w-12 h-12 mx-auto mb-2" />
                    <p>Revenue trends and forecasting</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Cash Flow Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                    <p>Cash flow patterns and projections</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="operational" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Team Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Users className="w-12 h-12 mx-auto mb-2" />
                    <p>Team metrics and productivity</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Process Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Target className="w-12 h-12 mx-auto mb-2" />
                    <p>Operational efficiency metrics</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-gray-300" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{report.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {report.date}
                          </span>
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            {report.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-400">Score</div>
                        <div className="font-semibold text-white">{report.score}/100</div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-600 bg-transparent"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Integration Status */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-400" />
            Dashboard Integration Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300">
                Your analytics dashboard is powered by Apache Superset for advanced data visualization and reporting.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Real-time data synchronization ensures you always have the latest insights.
              </p>
            </div>
            <Badge className="bg-green-600 text-white border-green-500">Connected</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
