"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import {
  Users,
  Database,
  FileText,
  Building2,
  Activity,
  Search,
  Download,
  Trash2,
  Edit,
  Eye,
  UserPlus,
  Settings,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Upload,
  ImageIcon,
  FileSpreadsheet,
  FileType,
  FileIcon,
  X,
  Plus,
  Link,
  Unlink,
} from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  phone?: string
  company: string
  companyId: string
  role: string
  department: string
  status: "active" | "inactive" | "pending"
  lastLogin: string
  createdAt: string
  maturityLevel: number
  documentsCount: number
  teamSize: number
}

interface Company {
  id: string
  name: string
  industry: string
  size: string
  maturityLevel: number
  usersCount: number
  documentsCount: number
  createdAt: string
  lastActivity: string
  associatedUsers: string[]
}

interface FileData {
  id: string
  name: string
  type: string
  size: number
  uploadedBy: string
  uploadedById: string
  uploadedAt: string
  company: string
  companyId: string
  status: "active" | "archived" | "deleted"
}

interface DatabaseStats {
  totalUsers: number
  totalCompanies: number
  totalFiles: number
  totalStorage: number
  activeUsers: number
  newUsersThisMonth: number
  averageMaturityLevel: number
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [files, setFiles] = useState<FileData[]>([])
  const [stats, setStats] = useState<DatabaseStats>({
    totalUsers: 0,
    totalCompanies: 0,
    totalFiles: 0,
    totalStorage: 0,
    activeUsers: 0,
    newUsersThisMonth: 0,
    averageMaturityLevel: 0,
  })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

  // File filtering states
  const [fileFilterUser, setFileFilterUser] = useState<string>("all")
  const [fileFilterCompany, setFileFilterCompany] = useState<string>("all")
  const [fileFilterType, setFileFilterType] = useState<string>("all")

  // Company user association states
  const [showUserAssociation, setShowUserAssociation] = useState(false)
  const [availableUsers, setAvailableUsers] = useState<User[]>([])
  const [selectedUsersForAssociation, setSelectedUsersForAssociation] = useState<string[]>([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      // Simulate API calls - replace with actual API endpoints
      const mockUsers: User[] = [
        {
          id: "1",
          name: "John Smith",
          email: "john.smith@techcorp.com",
          phone: "+1-555-0123",
          company: "TechCorp Inc.",
          companyId: "1",
          role: "CEO",
          department: "Executive",
          status: "active",
          lastLogin: "2024-01-15T10:30:00Z",
          createdAt: "2023-12-01T09:00:00Z",
          maturityLevel: 4,
          documentsCount: 25,
          teamSize: 12,
        },
        {
          id: "2",
          name: "Sarah Johnson",
          email: "sarah.j@innovate.com",
          phone: "+1-555-0124",
          company: "Innovate Solutions",
          companyId: "2",
          role: "CTO",
          department: "Technology",
          status: "active",
          lastLogin: "2024-01-14T16:45:00Z",
          createdAt: "2023-11-15T14:20:00Z",
          maturityLevel: 3,
          documentsCount: 18,
          teamSize: 8,
        },
        {
          id: "3",
          name: "Michael Brown",
          email: "mbrown@startup.io",
          company: "StartupX",
          companyId: "3",
          role: "Founder",
          department: "Executive",
          status: "pending",
          lastLogin: "2024-01-10T08:15:00Z",
          createdAt: "2024-01-05T11:30:00Z",
          maturityLevel: 2,
          documentsCount: 5,
          teamSize: 3,
        },
        {
          id: "4",
          name: "Emily Davis",
          email: "emily.davis@techcorp.com",
          phone: "+1-555-0125",
          company: "TechCorp Inc.",
          companyId: "1",
          role: "VP Engineering",
          department: "Technology",
          status: "active",
          lastLogin: "2024-01-15T09:15:00Z",
          createdAt: "2023-12-15T10:30:00Z",
          maturityLevel: 4,
          documentsCount: 32,
          teamSize: 15,
        },
        {
          id: "5",
          name: "David Wilson",
          email: "david.w@innovate.com",
          company: "Innovate Solutions",
          companyId: "2",
          role: "Product Manager",
          department: "Product",
          status: "active",
          lastLogin: "2024-01-14T14:20:00Z",
          createdAt: "2023-11-20T16:45:00Z",
          maturityLevel: 3,
          documentsCount: 12,
          teamSize: 6,
        },
      ]

      const mockCompanies: Company[] = [
        {
          id: "1",
          name: "TechCorp Inc.",
          industry: "Technology",
          size: "Large (500+ employees)",
          maturityLevel: 4,
          usersCount: 2,
          documentsCount: 156,
          createdAt: "2023-12-01T09:00:00Z",
          lastActivity: "2024-01-15T10:30:00Z",
          associatedUsers: ["1", "4"],
        },
        {
          id: "2",
          name: "Innovate Solutions",
          industry: "Consulting",
          size: "Medium (50-500 employees)",
          maturityLevel: 3,
          usersCount: 2,
          documentsCount: 89,
          createdAt: "2023-11-15T14:20:00Z",
          lastActivity: "2024-01-14T16:45:00Z",
          associatedUsers: ["2", "5"],
        },
        {
          id: "3",
          name: "StartupX",
          industry: "FinTech",
          size: "Small (1-50 employees)",
          maturityLevel: 2,
          usersCount: 1,
          documentsCount: 23,
          createdAt: "2024-01-05T11:30:00Z",
          lastActivity: "2024-01-10T08:15:00Z",
          associatedUsers: ["3"],
        },
      ]

      const mockFiles: FileData[] = [
        {
          id: "1",
          name: "Business_Plan_2024.pdf",
          type: "application/pdf",
          size: 2048576,
          uploadedBy: "John Smith",
          uploadedById: "1",
          uploadedAt: "2024-01-15T09:30:00Z",
          company: "TechCorp Inc.",
          companyId: "1",
          status: "active",
        },
        {
          id: "2",
          name: "Financial_Report_Q4.xlsx",
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          size: 1536000,
          uploadedBy: "Sarah Johnson",
          uploadedById: "2",
          uploadedAt: "2024-01-14T14:20:00Z",
          company: "Innovate Solutions",
          companyId: "2",
          status: "active",
        },
        {
          id: "3",
          name: "Product_Roadmap.png",
          type: "image/png",
          size: 512000,
          uploadedBy: "Michael Brown",
          uploadedById: "3",
          uploadedAt: "2024-01-10T11:45:00Z",
          company: "StartupX",
          companyId: "3",
          status: "active",
        },
        {
          id: "4",
          name: "Technical_Architecture.pdf",
          type: "application/pdf",
          size: 3072000,
          uploadedBy: "Emily Davis",
          uploadedById: "4",
          uploadedAt: "2024-01-15T08:20:00Z",
          company: "TechCorp Inc.",
          companyId: "1",
          status: "active",
        },
        {
          id: "5",
          name: "Market_Analysis.docx",
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          size: 1024000,
          uploadedBy: "David Wilson",
          uploadedById: "5",
          uploadedAt: "2024-01-14T12:30:00Z",
          company: "Innovate Solutions",
          companyId: "2",
          status: "active",
        },
        {
          id: "6",
          name: "Prototype_Screenshots.zip",
          type: "application/zip",
          size: 4096000,
          uploadedBy: "Michael Brown",
          uploadedById: "3",
          uploadedAt: "2024-01-09T16:15:00Z",
          company: "StartupX",
          companyId: "3",
          status: "archived",
        },
      ]

      setUsers(mockUsers)
      setCompanies(mockCompanies)
      setFiles(mockFiles)
      setStats({
        totalUsers: mockUsers.length,
        totalCompanies: mockCompanies.length,
        totalFiles: mockFiles.length,
        totalStorage: mockFiles.reduce((acc, file) => acc + file.size, 0),
        activeUsers: mockUsers.filter((u) => u.status === "active").length,
        newUsersThisMonth: mockUsers.filter((u) => new Date(u.createdAt) > new Date("2024-01-01")).length,
        averageMaturityLevel: mockCompanies.reduce((acc, c) => acc + c.maturityLevel, 0) / mockCompanies.length,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load admin data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateUserMaturityLevel = async (userId: string, newLevel: number) => {
    try {
      // Simulate API call
      setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, maturityLevel: newLevel } : user)))
      toast({
        title: "Success",
        description: "User maturity level updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update maturity level",
        variant: "destructive",
      })
    }
  }

  const updateCompanyMaturityLevel = async (companyId: string, newLevel: number) => {
    try {
      // Simulate API call
      setCompanies((prev) =>
        prev.map((company) => (company.id === companyId ? { ...company, maturityLevel: newLevel } : company)),
      )
      toast({
        title: "Success",
        description: "Company maturity level updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update company maturity level",
        variant: "destructive",
      })
    }
  }

  const associateUsersToCompany = async (companyId: string, userIds: string[]) => {
    try {
      // Update company with new associated users
      setCompanies((prev) =>
        prev.map((company) =>
          company.id === companyId
            ? {
                ...company,
                associatedUsers: [...new Set([...company.associatedUsers, ...userIds])],
                usersCount: [...new Set([...company.associatedUsers, ...userIds])].length,
              }
            : company,
        ),
      )

      // Update users with new company association
      setUsers((prev) =>
        prev.map((user) =>
          userIds.includes(user.id)
            ? { ...user, companyId, company: companies.find((c) => c.id === companyId)?.name || user.company }
            : user,
        ),
      )

      toast({
        title: "Success",
        description: `${userIds.length} user(s) associated with company successfully`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to associate users with company",
        variant: "destructive",
      })
    }
  }

  const removeUserFromCompany = async (companyId: string, userId: string) => {
    try {
      // Remove user from company
      setCompanies((prev) =>
        prev.map((company) =>
          company.id === companyId
            ? {
                ...company,
                associatedUsers: company.associatedUsers.filter((id) => id !== userId),
                usersCount: company.associatedUsers.filter((id) => id !== userId).length,
              }
            : company,
        ),
      )

      toast({
        title: "Success",
        description: "User removed from company successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove user from company",
        variant: "destructive",
      })
    }
  }

  const deleteFile = async (fileId: string) => {
    try {
      // Simulate API call
      setFiles((prev) => prev.filter((file) => file.id !== fileId))
      toast({
        title: "Success",
        description: "File deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      })
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.includes("image")) return <ImageIcon className="h-4 w-4" />
    if (type.includes("spreadsheet") || type.includes("excel")) return <FileSpreadsheet className="h-4 w-4" />
    if (type.includes("pdf")) return <FileType className="h-4 w-4" />
    return <FileIcon className="h-4 w-4" />
  }

  const getMaturityLevelColor = (level: number) => {
    if (level >= 4) return "bg-green-500"
    if (level >= 3) return "bg-blue-500"
    if (level >= 2) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getMaturityLevelText = (level: number) => {
    switch (level) {
      case 1:
        return "Initial"
      case 2:
        return "Developing"
      case 3:
        return "Defined"
      case 4:
        return "Managed"
      case 5:
        return "Optimized"
      default:
        return "Unknown"
    }
  }

  const getFilteredFiles = () => {
    return files.filter((file) => {
      const matchesUser = fileFilterUser === "all" || file.uploadedById === fileFilterUser
      const matchesCompany = fileFilterCompany === "all" || file.companyId === fileFilterCompany
      const matchesType = fileFilterType === "all" || file.type.includes(fileFilterType)
      const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesUser && matchesCompany && matchesType && matchesSearch
    })
  }

  const getUniqueFileTypes = () => {
    const types = files.map((file) => {
      if (file.type.includes("image")) return "image"
      if (file.type.includes("pdf")) return "pdf"
      if (file.type.includes("spreadsheet") || file.type.includes("excel")) return "spreadsheet"
      if (file.type.includes("word")) return "document"
      if (file.type.includes("zip")) return "archive"
      return "other"
    })
    return [...new Set(types)]
  }

  const openUserAssociationDialog = (company: Company) => {
    setSelectedCompany(company)
    setAvailableUsers(users.filter((user) => !company.associatedUsers.includes(user.id)))
    setSelectedUsersForAssociation([])
    setShowUserAssociation(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage users, companies, files, and system data</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
              <p className="text-xs text-green-500">+{stats.newUsersThisMonth} this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Companies</CardTitle>
              <Building2 className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalCompanies}</div>
              <p className="text-xs text-gray-400">Avg maturity: {stats.averageMaturityLevel.toFixed(1)}</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Files</CardTitle>
              <FileText className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalFiles}</div>
              <p className="text-xs text-gray-400">{formatFileSize(stats.totalStorage)} total</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Active Users</CardTitle>
              <Activity className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.activeUsers}</div>
              <p className="text-xs text-gray-400">
                {((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}% active
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="users" className="data-[state=active]:bg-blue-600">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="companies" className="data-[state=active]:bg-blue-600">
              <Building2 className="h-4 w-4 mr-2" />
              Companies
            </TabsTrigger>
            <TabsTrigger value="files" className="data-[state=active]:bg-blue-600">
              <FileText className="h-4 w-4 mr-2" />
              Files
            </TabsTrigger>
            <TabsTrigger value="database" className="data-[state=active]:bg-blue-600">
              <Database className="h-4 w-4 mr-2" />
              Database
            </TabsTrigger>
          </TabsList>

          {/* Users Management */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">User Management</CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage user accounts, roles, and maturity levels
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead className="text-gray-400">User</TableHead>
                      <TableHead className="text-gray-400">Company</TableHead>
                      <TableHead className="text-gray-400">Role</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Maturity</TableHead>
                      <TableHead className="text-gray-400">Team Size</TableHead>
                      <TableHead className="text-gray-400">Last Login</TableHead>
                      <TableHead className="text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users
                      .filter(
                        (user) =>
                          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.company.toLowerCase().includes(searchTerm.toLowerCase()),
                      )
                      .map((user) => (
                        <TableRow key={user.id} className="border-gray-800">
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={`/placeholder-user.jpg`} />
                                <AvatarFallback className="bg-gray-700 text-white">
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-white">{user.name}</div>
                                <div className="text-sm text-gray-400">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-white">{user.company}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-gray-600 text-gray-300">
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.status === "active"
                                  ? "default"
                                  : user.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                              className={
                                user.status === "active"
                                  ? "bg-green-600 hover:bg-green-700"
                                  : user.status === "pending"
                                    ? "bg-yellow-600 hover:bg-yellow-700"
                                    : "bg-red-600 hover:bg-red-700"
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${getMaturityLevelColor(user.maturityLevel)}`} />
                              <span className="text-white">{getMaturityLevelText(user.maturityLevel)}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-white">{user.teamSize}</TableCell>
                          <TableCell className="text-gray-400">
                            {new Date(user.lastLogin).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedUser(user)}
                                    className="text-blue-400 hover:text-blue-300 hover:bg-gray-800"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-gray-900 border-gray-800 text-white">
                                  <DialogHeader>
                                    <DialogTitle>Edit User: {user.name}</DialogTitle>
                                    <DialogDescription className="text-gray-400">
                                      Update user information and maturity level
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor="maturity" className="text-gray-300">
                                        Maturity Level
                                      </Label>
                                      <Select
                                        defaultValue={user.maturityLevel.toString()}
                                        onValueChange={(value) =>
                                          updateUserMaturityLevel(user.id, Number.parseInt(value))
                                        }
                                      >
                                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-800 border-gray-700">
                                          <SelectItem value="1">1 - Initial</SelectItem>
                                          <SelectItem value="2">2 - Developing</SelectItem>
                                          <SelectItem value="3">3 - Defined</SelectItem>
                                          <SelectItem value="4">4 - Managed</SelectItem>
                                          <SelectItem value="5">5 - Optimized</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div>
                                      <Label htmlFor="role" className="text-gray-300">
                                        Role
                                      </Label>
                                      <Input
                                        id="role"
                                        defaultValue={user.role}
                                        className="bg-gray-800 border-gray-700 text-white"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="department" className="text-gray-300">
                                        Department
                                      </Label>
                                      <Input
                                        id="department"
                                        defaultValue={user.department}
                                        className="bg-gray-800 border-gray-700 text-white"
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-400 hover:text-green-300 hover:bg-gray-800"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Companies Management */}
          <TabsContent value="companies" className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">Company Management</CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage company profiles, maturity assessments, and user associations
                    </CardDescription>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Building2 className="h-4 w-4 mr-2" />
                    Add Company
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {companies.map((company) => (
                    <Card key={company.id} className="bg-gray-800 border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-white">{company.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span>{company.industry}</span>
                              <span>•</span>
                              <span>{company.size}</span>
                              <span>•</span>
                              <span>{company.usersCount} users</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-400">Maturity Level:</span>
                              <div className={`w-3 h-3 rounded-full ${getMaturityLevelColor(company.maturityLevel)}`} />
                              <span className="text-white font-medium">
                                {getMaturityLevelText(company.maturityLevel)}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openUserAssociationDialog(company)}
                              className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                            >
                              <Link className="h-4 w-4 mr-2" />
                              Manage Users
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedCompany(company)}
                                  className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                                >
                                  <Settings className="h-4 w-4 mr-2" />
                                  Settings
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Manage Company: {company.name}</DialogTitle>
                                  <DialogDescription className="text-gray-400">
                                    Update company information and maturity level
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="company-maturity" className="text-gray-300">
                                        Maturity Level
                                      </Label>
                                      <Select
                                        defaultValue={company.maturityLevel.toString()}
                                        onValueChange={(value) =>
                                          updateCompanyMaturityLevel(company.id, Number.parseInt(value))
                                        }
                                      >
                                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-800 border-gray-700">
                                          <SelectItem value="1">1 - Initial</SelectItem>
                                          <SelectItem value="2">2 - Developing</SelectItem>
                                          <SelectItem value="3">3 - Defined</SelectItem>
                                          <SelectItem value="4">4 - Managed</SelectItem>
                                          <SelectItem value="5">5 - Optimized</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div>
                                      <Label htmlFor="industry" className="text-gray-300">
                                        Industry
                                      </Label>
                                      <Input
                                        id="industry"
                                        defaultValue={company.industry}
                                        className="bg-gray-800 border-gray-700 text-white"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-gray-300">Company Statistics</Label>
                                    <div className="grid grid-cols-3 gap-4 mt-2">
                                      <div className="bg-gray-800 p-3 rounded-lg">
                                        <div className="text-2xl font-bold text-white">{company.usersCount}</div>
                                        <div className="text-sm text-gray-400">Users</div>
                                      </div>
                                      <div className="bg-gray-800 p-3 rounded-lg">
                                        <div className="text-2xl font-bold text-white">{company.documentsCount}</div>
                                        <div className="text-sm text-gray-400">Documents</div>
                                      </div>
                                      <div className="bg-gray-800 p-3 rounded-lg">
                                        <div className="text-2xl font-bold text-white">{company.maturityLevel}</div>
                                        <div className="text-sm text-gray-400">Maturity</div>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-gray-300">Maturity Progress</Label>
                                    <div className="mt-2">
                                      <Progress value={(company.maturityLevel / 5) * 100} className="h-2" />
                                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                                        <span>Initial</span>
                                        <span>Optimized</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                            >
                              <BarChart3 className="h-4 w-4 mr-2" />
                              Analytics
                            </Button>
                          </div>
                        </div>

                        {/* Associated Users */}
                        <div className="mb-4">
                          <Label className="text-gray-300 text-sm">Associated Users</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {company.associatedUsers.map((userId) => {
                              const user = users.find((u) => u.id === userId)
                              return user ? (
                                <div
                                  key={userId}
                                  className="flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded-full"
                                >
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback className="bg-gray-600 text-white text-xs">
                                      {user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-white text-sm">{user.name}</span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeUserFromCompany(company.id, userId)}
                                    className="h-4 w-4 p-0 text-red-400 hover:text-red-300"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              ) : null
                            })}
                            {company.associatedUsers.length === 0 && (
                              <span className="text-gray-400 text-sm">No users associated</span>
                            )}
                          </div>
                        </div>

                        <Separator className="my-4 bg-gray-700" />
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Documents:</span>
                            <span className="ml-2 text-white">{company.documentsCount}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Created:</span>
                            <span className="ml-2 text-white">{new Date(company.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Last Activity:</span>
                            <span className="ml-2 text-white">
                              {new Date(company.lastActivity).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Files Management */}
          <TabsContent value="files" className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">File Management</CardTitle>
                    <CardDescription className="text-gray-400">
                      Monitor and manage uploaded files across all companies and users
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* File Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <Label htmlFor="search-files" className="text-gray-300 text-sm">
                      Search Files
                    </Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="search-files"
                        placeholder="Search files..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="filter-user" className="text-gray-300 text-sm">
                      Filter by User
                    </Label>
                    <Select value={fileFilterUser} onValueChange={setFileFilterUser}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="All Users" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="all">All Users</SelectItem>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="filter-company" className="text-gray-300 text-sm">
                      Filter by Company
                    </Label>
                    <Select value={fileFilterCompany} onValueChange={setFileFilterCompany}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="All Companies" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="all">All Companies</SelectItem>
                        {companies.map((company) => (
                          <SelectItem key={company.id} value={company.id}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="filter-type" className="text-gray-300 text-sm">
                      Filter by Type
                    </Label>
                    <Select value={fileFilterType} onValueChange={setFileFilterType}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="all">All Types</SelectItem>
                        {getUniqueFileTypes().map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Active Filters Display */}
                {(fileFilterUser !== "all" ||
                  fileFilterCompany !== "all" ||
                  fileFilterType !== "all" ||
                  searchTerm) && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-gray-400 text-sm">Active filters:</span>
                    {fileFilterUser !== "all" && (
                      <Badge variant="secondary" className="bg-blue-600 text-white">
                        User: {users.find((u) => u.id === fileFilterUser)?.name}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setFileFilterUser("all")}
                          className="ml-1 h-4 w-4 p-0 text-white hover:text-gray-300"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                    {fileFilterCompany !== "all" && (
                      <Badge variant="secondary" className="bg-purple-600 text-white">
                        Company: {companies.find((c) => c.id === fileFilterCompany)?.name}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setFileFilterCompany("all")}
                          className="ml-1 h-4 w-4 p-0 text-white hover:text-gray-300"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                    {fileFilterType !== "all" && (
                      <Badge variant="secondary" className="bg-green-600 text-white">
                        Type: {fileFilterType.charAt(0).toUpperCase() + fileFilterType.slice(1)}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setFileFilterType("all")}
                          className="ml-1 h-4 w-4 p-0 text-white hover:text-gray-300"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                    {searchTerm && (
                      <Badge variant="secondary" className="bg-orange-600 text-white">
                        Search: {searchTerm}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSearchTerm("")}
                          className="ml-1 h-4 w-4 p-0 text-white hover:text-gray-300"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setFileFilterUser("all")
                        setFileFilterCompany("all")
                        setFileFilterType("all")
                        setSearchTerm("")
                      }}
                      className="text-gray-400 hover:text-white"
                    >
                      Clear all
                    </Button>
                  </div>
                )}

                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead className="text-gray-400">File</TableHead>
                      <TableHead className="text-gray-400">Type</TableHead>
                      <TableHead className="text-gray-400">Size</TableHead>
                      <TableHead className="text-gray-400">Uploaded By</TableHead>
                      <TableHead className="text-gray-400">Company</TableHead>
                      <TableHead className="text-gray-400">Upload Date</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredFiles().map((file) => (
                      <TableRow key={file.id} className="border-gray-800">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            {getFileIcon(file.type)}
                            <span className="text-white font-medium">{file.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-400">{file.type.split("/")[1]?.toUpperCase()}</TableCell>
                        <TableCell className="text-white">{formatFileSize(file.size)}</TableCell>
                        <TableCell className="text-white">{file.uploadedBy}</TableCell>
                        <TableCell className="text-white">{file.company}</TableCell>
                        <TableCell className="text-gray-400">
                          {new Date(file.uploadedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={file.status === "active" ? "default" : "secondary"}
                            className={
                              file.status === "active"
                                ? "bg-green-600 hover:bg-green-700"
                                : file.status === "archived"
                                  ? "bg-yellow-600 hover:bg-yellow-700"
                                  : "bg-gray-600 hover:bg-gray-700"
                            }
                          >
                            {file.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-400 hover:text-blue-300 hover:bg-gray-800"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-400 hover:text-green-300 hover:bg-gray-800"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-400 hover:text-red-300 hover:bg-gray-800"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete File</AlertDialogTitle>
                                  <AlertDialogDescription className="text-gray-400">
                                    Are you sure you want to delete "{file.name}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteFile(file.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {getFilteredFiles().length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No files found matching your filters</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Database Management */}
          <TabsContent value="database" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Database className="h-5 w-5 mr-2" />
                    Database Operations
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Perform database maintenance and operations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh All Data
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Database
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Import Data
                  </Button>
                  <Separator className="bg-gray-700" />
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-300">Danger Zone</h4>
                    <Button variant="destructive" className="w-full bg-red-600 hover:bg-red-700">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Clear All Cache
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    System Health
                  </CardTitle>
                  <CardDescription className="text-gray-400">Monitor system performance and health</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Database Status</span>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-green-500">Healthy</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">API Response Time</span>
                      <span className="text-white">45ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Storage Usage</span>
                      <span className="text-white">2.3GB / 10GB</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Active Connections</span>
                      <span className="text-white">12</span>
                    </div>
                  </div>
                  <Separator className="bg-gray-700" />
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Storage Usage</span>
                      <span className="text-white">23%</span>
                    </div>
                    <Progress value={23} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity Log</CardTitle>
                <CardDescription className="text-gray-400">
                  Monitor recent system activities and user actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {[
                      {
                        time: "2024-01-15 10:30",
                        user: "John Smith",
                        action: "Updated company maturity level",
                        type: "update",
                      },
                      {
                        time: "2024-01-15 10:25",
                        user: "Sarah Johnson",
                        action: "Uploaded new document",
                        type: "upload",
                      },
                      { time: "2024-01-15 10:20", user: "Admin", action: "Database backup completed", type: "system" },
                      {
                        time: "2024-01-15 10:15",
                        user: "Michael Brown",
                        action: "Invited new team member",
                        type: "invite",
                      },
                      {
                        time: "2024-01-15 10:10",
                        user: "System",
                        action: "Automated maturity assessment",
                        type: "system",
                      },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                        <div className="flex-shrink-0">
                          {activity.type === "update" && <Edit className="h-4 w-4 text-blue-500" />}
                          {activity.type === "upload" && <Upload className="h-4 w-4 text-green-500" />}
                          {activity.type === "system" && <Settings className="h-4 w-4 text-purple-500" />}
                          {activity.type === "invite" && <UserPlus className="h-4 w-4 text-orange-500" />}
                        </div>
                        <div className="flex-1">
                          <div className="text-white text-sm">{activity.action}</div>
                          <div className="text-gray-400 text-xs">by {activity.user}</div>
                        </div>
                        <div className="text-gray-400 text-xs">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* User Association Dialog */}
        <Dialog open={showUserAssociation} onOpenChange={setShowUserAssociation}>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Manage Users for {selectedCompany?.name}</DialogTitle>
              <DialogDescription className="text-gray-400">
                Associate or remove users from this company
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {/* Current Associated Users */}
              <div>
                <Label className="text-gray-300">Currently Associated Users</Label>
                <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                  {selectedCompany?.associatedUsers.map((userId) => {
                    const user = users.find((u) => u.id === userId)
                    return user ? (
                      <div key={userId} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback className="bg-gray-600 text-white">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-white font-medium">{user.name}</div>
                            <div className="text-gray-400 text-sm">{user.email}</div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeUserFromCompany(selectedCompany.id, userId)}
                          className="text-red-400 hover:text-red-300 hover:bg-gray-700"
                        >
                          <Unlink className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    ) : null
                  })}
                  {selectedCompany?.associatedUsers.length === 0 && (
                    <div className="text-gray-400 text-center py-4">No users currently associated</div>
                  )}
                </div>
              </div>

              <Separator className="bg-gray-700" />

              {/* Available Users to Associate */}
              <div>
                <Label className="text-gray-300">Available Users</Label>
                <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
                  {availableUsers.map((user) => (
                    <div key={user.id} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                      <Checkbox
                        id={`user-${user.id}`}
                        checked={selectedUsersForAssociation.includes(user.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedUsersForAssociation((prev) => [...prev, user.id])
                          } else {
                            setSelectedUsersForAssociation((prev) => prev.filter((id) => id !== user.id))
                          }
                        }}
                        className="border-gray-600"
                      />
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback className="bg-gray-600 text-white">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-white font-medium">{user.name}</div>
                        <div className="text-gray-400 text-sm">{user.email}</div>
                        <div className="text-gray-400 text-xs">Current: {user.company}</div>
                      </div>
                    </div>
                  ))}
                  {availableUsers.length === 0 && (
                    <div className="text-gray-400 text-center py-4">
                      All users are already associated with companies
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowUserAssociation(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (selectedCompany && selectedUsersForAssociation.length > 0) {
                    associateUsersToCompany(selectedCompany.id, selectedUsersForAssociation)
                    setShowUserAssociation(false)
                  }
                }}
                disabled={selectedUsersForAssociation.length === 0}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Associate {selectedUsersForAssociation.length} User(s)
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
