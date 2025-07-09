"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Users,
  Building,
  FileText,
  BarChart3,
  Settings,
  AlertTriangle,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Download,
  Search,
  Plus,
  Activity,
  UserCheck,
  UserX,
  Database,
  RefreshCw,
} from "lucide-react"

// Import the Navigation component
import { Navigation } from "@/components/navigation"

interface User {
  id: string
  name: string
  email: string
  company: string
  role: "user" | "admin"
  status: "active" | "inactive" | "pending"
  lastLogin: string
  createdAt: string
  avatar?: string
}

interface Company {
  id: string
  name: string
  website: string
  industry: string
  size: string
  users: number
  status: "active" | "inactive"
  createdAt: string
}

interface Document {
  id: string
  name: string
  type: string
  size: string
  uploadedBy: string
  uploadedAt: string
  status: "processed" | "processing" | "error"
}

interface SystemStats {
  totalUsers: number
  activeUsers: number
  totalCompanies: number
  totalDocuments: number
  storageUsed: string
  monthlyGrowth: number
  systemHealth: "healthy" | "warning" | "critical"
}

// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@techcorp.com",
    company: "TechCorp Inc.",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-15",
    createdAt: "2023-12-01",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@innovate.com",
    company: "Innovate Solutions",
    role: "user",
    status: "active",
    lastLogin: "2024-01-14",
    createdAt: "2023-11-15",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "mbrown@startup.io",
    company: "StartupX",
    role: "user",
    status: "pending",
    lastLogin: "2024-01-10",
    createdAt: "2024-01-05",
  },
]

const mockCompanies: Company[] = [
  {
    id: "1",
    name: "TechCorp Inc.",
    website: "https://techcorp.com",
    industry: "Technology",
    size: "500+ employees",
    users: 25,
    status: "active",
    createdAt: "2023-12-01",
  },
  {
    id: "2",
    name: "Innovate Solutions",
    website: "https://innovate.com",
    industry: "Consulting",
    size: "50-500 employees",
    users: 12,
    status: "active",
    createdAt: "2023-11-15",
  },
]

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Business_Plan_2024.pdf",
    type: "PDF",
    size: "2.5 MB",
    uploadedBy: "John Smith",
    uploadedAt: "2024-01-15",
    status: "processed",
  },
  {
    id: "2",
    name: "Financial_Report_Q4.xlsx",
    type: "Excel",
    size: "1.8 MB",
    uploadedBy: "Sarah Johnson",
    uploadedAt: "2024-01-14",
    status: "processing",
  },
]

const mockStats: SystemStats = {
  totalUsers: 156,
  activeUsers: 142,
  totalCompanies: 45,
  totalDocuments: 1247,
  storageUsed: "15.6 GB",
  monthlyGrowth: 12,
  systemHealth: "healthy",
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [users, setUsers] = useState<User[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [systemStats, setSystemStats] = useState<SystemStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalCompanies: 0,
    totalDocuments: 0,
    storageUsed: "0 GB",
    monthlyGrowth: 0,
    systemHealth: "healthy",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Load data on component mount
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    try {
      // Simulate API loading delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Use mock data
      setUsers(mockUsers)
      setCompanies(mockCompanies)
      setDocuments(mockDocuments)
      setSystemStats(mockStats)
    } catch (error) {
      console.error("Failed to load admin data:", error)
      // Ensure arrays are always set even on error
      setUsers([])
      setCompanies([])
      setDocuments([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleUserAction = async (userId: string, action: "activate" | "deactivate" | "delete") => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: action === "delete" ? "DELETE" : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: action !== "delete" ? JSON.stringify({ action }) : undefined,
      })

      if (response.ok) {
        loadData() // Reload data
      }
    } catch (error) {
      console.error(`Failed to ${action} user:`, error)
    }
  }

  const filteredUsers = Array.isArray(users)
    ? users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.company.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : []

  const filteredCompanies = Array.isArray(companies)
    ? companies.filter(
        (company) =>
          company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.industry.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : []

  const filteredDocuments = Array.isArray(documents)
    ? documents.filter(
        (doc) =>
          doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : []

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-50 text-white dark:text-gray-900">
      {/* Header */}
      <Navigation />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white dark:text-gray-900 mb-2">Administration Dashboard</h1>
          <p className="text-gray-300 dark:text-gray-500">Manage users, companies, documents, and system settings</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
            <TabsTrigger
              value="overview"
              className="flex items-center gap-2 data-[state=active]:bg-gray-700 dark:data-[state=active]:bg-gray-100 text-gray-300 dark:text-gray-500 data-[state=active]:text-white dark:data-[state=active]:text-gray-900"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="flex items-center gap-2 data-[state=active]:bg-gray-700 dark:data-[state=active]:bg-gray-100 text-gray-300 dark:text-gray-500 data-[state=active]:text-white dark:data-[state=active]:text-gray-900"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger
              value="companies"
              className="flex items-center gap-2 data-[state=active]:bg-gray-700 dark:data-[state=active]:bg-gray-100 text-gray-300 dark:text-gray-500 data-[state=active]:text-white dark:data-[state=active]:text-gray-900"
            >
              <Building className="w-4 h-4" />
              <span className="hidden sm:inline">Companies</span>
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="flex items-center gap-2 data-[state=active]:bg-gray-700 dark:data-[state=active]:bg-gray-100 text-gray-300 dark:text-gray-500 data-[state=active]:text-white dark:data-[state=active]:text-gray-900"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex items-center gap-2 data-[state=active]:bg-gray-700 dark:data-[state=active]:bg-gray-100 text-gray-300 dark:text-gray-500 data-[state=active]:text-white dark:data-[state=active]:text-gray-900"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* System Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 dark:text-gray-500">Total Users</p>
                      <p className="text-2xl font-bold text-white dark:text-gray-900">{systemStats.totalUsers}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400">+{systemStats.monthlyGrowth}% this month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 dark:text-gray-500">Active Users</p>
                      <p className="text-2xl font-bold text-white dark:text-gray-900">{systemStats.activeUsers}</p>
                    </div>
                    <UserCheck className="w-8 h-8 text-green-400" />
                  </div>
                  <div className="mt-2">
                    <Progress value={(systemStats.activeUsers / systemStats.totalUsers) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 dark:text-gray-500">Companies</p>
                      <p className="text-2xl font-bold text-white dark:text-gray-900">{systemStats.totalCompanies}</p>
                    </div>
                    <Building className="w-8 h-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 dark:text-gray-500">Storage Used</p>
                      <p className="text-2xl font-bold text-white dark:text-gray-900">{systemStats.storageUsed}</p>
                    </div>
                    <Database className="w-8 h-8 text-orange-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Health */}
            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
              <CardHeader>
                <CardTitle className="text-white dark:text-gray-900 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      systemStats.systemHealth === "healthy"
                        ? "bg-green-400"
                        : systemStats.systemHealth === "warning"
                          ? "bg-yellow-400"
                          : "bg-red-400"
                    }`}
                  ></div>
                  <span className="text-white dark:text-gray-900 capitalize">{systemStats.systemHealth}</span>
                  <Button
                    onClick={loadData}
                    disabled={isLoading}
                    size="sm"
                    variant="outline"
                    className="ml-auto border-gray-600 text-gray-300 dark:text-gray-500 hover:bg-gray-700 dark:hover:bg-gray-200 bg-transparent"
                  >
                    {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                    Refresh
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
              <CardHeader>
                <CardTitle className="text-white dark:text-gray-900">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300 dark:text-gray-500 text-sm">
                      New user registration: john.doe@company.com
                    </span>
                    <span className="text-gray-400 dark:text-gray-400 text-xs ml-auto">2 minutes ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300 dark:text-gray-500 text-sm">
                      Document uploaded: financial_report.pdf
                    </span>
                    <span className="text-gray-400 dark:text-gray-400 text-xs ml-auto">5 minutes ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300 dark:text-gray-500 text-sm">
                      Company profile updated: Tech Innovations SA
                    </span>
                    <span className="text-gray-400 dark:text-gray-400 text-xs ml-auto">10 minutes ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white dark:text-gray-900">User Management</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300 text-white dark:text-gray-900"
                      />
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700 dark:border-gray-200">
                      <TableHead className="text-gray-300 dark:text-gray-500">User</TableHead>
                      <TableHead className="text-gray-300 dark:text-gray-500">Company</TableHead>
                      <TableHead className="text-gray-300 dark:text-gray-500">Role</TableHead>
                      <TableHead className="text-gray-300 dark:text-gray-500">Status</TableHead>
                      <TableHead className="text-gray-300 dark:text-gray-500">Last Login</TableHead>
                      <TableHead className="text-gray-300 dark:text-gray-500">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className="border-gray-700 dark:border-gray-200">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-white dark:text-gray-900">{user.name}</p>
                              <p className="text-sm text-gray-400 dark:text-gray-500">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300 dark:text-gray-500">{user.company}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              user.role === "admin"
                                ? "bg-purple-600 text-white border-purple-500"
                                : "bg-gray-600 text-white border-gray-500"
                            }
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              user.status === "active"
                                ? "bg-green-600 text-white border-green-500"
                                : user.status === "inactive"
                                  ? "bg-red-600 text-white border-red-500"
                                  : "bg-yellow-600 text-white border-yellow-500"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300 dark:text-gray-500">{user.lastLogin}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300">
                              <DropdownMenuItem className="text-white dark:text-gray-900 hover:bg-gray-600 dark:hover:bg-gray-200">
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-white dark:text-gray-900 hover:bg-gray-600 dark:hover:bg-gray-200">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              {user.status === "active" ? (
                                <DropdownMenuItem
                                  onClick={() => handleUserAction(user.id, "deactivate")}
                                  className="text-yellow-400 hover:bg-yellow-900/20"
                                >
                                  <UserX className="w-4 h-4 mr-2" />
                                  Deactivate
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onClick={() => handleUserAction(user.id, "activate")}
                                  className="text-green-400 hover:bg-green-900/20"
                                >
                                  <UserCheck className="w-4 h-4 mr-2" />
                                  Activate
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator className="bg-gray-600 dark:bg-gray-300" />
                              <DropdownMenuItem
                                onClick={() => handleUserAction(user.id, "delete")}
                                className="text-red-400 hover:bg-red-900/20"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Companies Tab */}
          <TabsContent value="companies" className="space-y-6">
            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white dark:text-gray-900">Company Management</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search companies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300 text-white dark:text-gray-900"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700 dark:border-gray-200">
                      <TableHead className="text-gray-300 dark:text-gray-500">Company</TableHead>
                      <TableHead className="text-gray-300 dark:text-gray-500">Industry</TableHead>
                      <TableHead className="text-gray-300 dark:text-gray-500">Size</TableHead>
                      <TableHead className="text-gray-300 dark:text-gray-500">Users</TableHead>
                      <TableHead className="text-gray-300 dark:text-gray-500">Status</TableHead>
                      <TableHead className="text-gray-300 dark:text-gray-500">Created</TableHead>
                      <TableHead className="text-gray-300 dark:text-gray-500">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCompanies.map((company) => (
                      <TableRow key={company.id} className="border-gray-700 dark:border-gray-200">
                        <TableCell>
                          <div>
                            <p className="font-medium text-white dark:text-gray-900">{company.name}</p>
                            <p className="text-sm text-gray-400 dark:text-gray-500">{company.website}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300 dark:text-gray-500">{company.industry}</TableCell>
                        <TableCell className="text-gray-300 dark:text-gray-500">{company.size}</TableCell>
                        <TableCell className="text-gray-300 dark:text-gray-500">{company.users}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              company.status === "active"
                                ? "bg-green-600 text-white border-green-500"
                                : "bg-red-600 text-white border-red-500"
                            }
                          >
                            {company.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300 dark:text-gray-500">{company.createdAt}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300">
                              <DropdownMenuItem className="text-white dark:text-gray-900 hover:bg-gray-600 dark:hover:bg-gray-200">
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-white dark:text-gray-900 hover:bg-gray-600 dark:hover:bg-gray-200">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white dark:text-gray-900">Document Management</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search documents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300 text-white dark:text-gray-900"
                      />
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700 dark:border-gray-200">
                      <TableHead className="text-gray-300 dark:text-gray-500">Document</TableHead>
                      <TableHead className="text-gray-300 dark:text-gray-500">Type</TableHead>
                      <TableHead className="text-gray-300 dark:text-gray-500">Size</TableHead>
                      <TableHead className="text-gray-300 dark:text-gray-500">Uploaded By</TableHead>
                      <TableHead className="text-gray-300 dark:text-gray-500">Status</TableHead>
                      <TableHead className="text-gray-300 dark:text-gray-500">Date</TableHead>
                      <TableHead className="text-gray-300 dark:text-gray-500">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.map((doc) => (
                      <TableRow key={doc.id} className="border-gray-700 dark:border-gray-200">
                        <TableCell className="font-medium text-white dark:text-gray-900">{doc.name}</TableCell>
                        <TableCell className="text-gray-300 dark:text-gray-500">{doc.type}</TableCell>
                        <TableCell className="text-gray-300 dark:text-gray-500">{doc.size}</TableCell>
                        <TableCell className="text-gray-300 dark:text-gray-500">{doc.uploadedBy}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              doc.status === "processed"
                                ? "bg-green-600 text-white border-green-500"
                                : doc.status === "processing"
                                  ? "bg-yellow-600 text-white border-yellow-500"
                                  : "bg-red-600 text-white border-red-500"
                            }
                          >
                            {doc.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300 dark:text-gray-500">{doc.uploadedAt}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300">
                              <DropdownMenuItem className="text-white dark:text-gray-900 hover:bg-gray-600 dark:hover:bg-gray-200">
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-white dark:text-gray-900 hover:bg-gray-600 dark:hover:bg-gray-200">
                                <Eye className="w-4 h-4 mr-2" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-gray-600 dark:bg-gray-300" />
                              <DropdownMenuItem className="text-red-400 hover:bg-red-900/20">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6">
              <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
                <CardHeader>
                  <CardTitle className="text-white dark:text-gray-900">System Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300 dark:text-gray-500">Max File Upload Size</Label>
                      <Select defaultValue="100mb">
                        <SelectTrigger className="bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300 text-white dark:text-gray-900">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300">
                          <SelectItem value="50mb">50 MB</SelectItem>
                          <SelectItem value="100mb">100 MB</SelectItem>
                          <SelectItem value="200mb">200 MB</SelectItem>
                          <SelectItem value="500mb">500 MB</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300 dark:text-gray-500">Session Timeout (minutes)</Label>
                      <Input
                        type="number"
                        defaultValue="60"
                        className="bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300 text-white dark:text-gray-900"
                      />
                    </div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">Save Configuration</Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
                <CardHeader>
                  <CardTitle className="text-white dark:text-gray-900">Email Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300 dark:text-gray-500">SMTP Server</Label>
                      <Input
                        placeholder="smtp.example.com"
                        className="bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300 text-white dark:text-gray-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300 dark:text-gray-500">SMTP Port</Label>
                      <Input
                        type="number"
                        placeholder="587"
                        className="bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300 text-white dark:text-gray-900"
                      />
                    </div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">Test Connection</Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
                <CardHeader>
                  <CardTitle className="text-white dark:text-gray-900 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
                    <h4 className="font-semibold text-red-300 mb-2">Reset System</h4>
                    <p className="text-red-200 text-sm mb-3">
                      This will reset all system settings to default values. This action cannot be undone.
                    </p>
                    <Button
                      variant="outline"
                      className="border-red-600 text-red-400 hover:bg-red-900/20 bg-transparent"
                    >
                      Reset System Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
