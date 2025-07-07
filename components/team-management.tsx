"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Users,
  UserPlus,
  Mail,
  Send,
  CheckCircle,
  Clock,
  X,
  Building,
  TrendingUp,
  BarChart3,
  Target,
  Lightbulb,
  Shield,
  Cog,
  DollarSign,
  MessageSquare,
  Award,
  Eye,
} from "lucide-react"

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: "invited" | "active" | "pending"
  invitedAt: string
  joinedAt?: string
  avatar?: string
}

interface OrgChartNode {
  id: string
  name: string
  role: string
  department: string
  status: string
  children?: OrgChartNode[]
}

const roleOptions = [
  { value: "ceo", label: "CEO / Founder", icon: Award },
  { value: "cto", label: "CTO / Tech Lead", icon: Cog },
  { value: "cfo", label: "CFO / Finance", icon: DollarSign },
  { value: "cmo", label: "CMO / Marketing", icon: TrendingUp },
  { value: "coo", label: "COO / Operations", icon: Building },
  { value: "head-sales", label: "Head of Sales", icon: Target },
  { value: "head-product", label: "Head of Product", icon: Lightbulb },
  { value: "head-hr", label: "Head of HR", icon: Users },
  { value: "head-security", label: "Head of Security", icon: Shield },
  { value: "manager", label: "Manager", icon: Users },
  { value: "analyst", label: "Business Analyst", icon: BarChart3 },
  { value: "consultant", label: "Consultant", icon: MessageSquare },
  { value: "other", label: "Other", icon: Users },
]

const departmentOptions = [
  "Executive",
  "Technology",
  "Finance",
  "Marketing",
  "Sales",
  "Operations",
  "Product",
  "Human Resources",
  "Security",
  "Other",
]

export default function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@company.com",
      role: "ceo",
      department: "Executive",
      status: "active",
      invitedAt: "2024-01-15",
      joinedAt: "2024-01-15",
    },
  ])

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [inviteForm, setInviteForm] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
  })
  const [isInviting, setIsInviting] = useState(false)

  const handleInvite = async () => {
    if (!inviteForm.name || !inviteForm.email || !inviteForm.role || !inviteForm.department) {
      return
    }

    setIsInviting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const newMember: TeamMember = {
        id: Date.now().toString(),
        name: inviteForm.name,
        email: inviteForm.email,
        role: inviteForm.role,
        department: inviteForm.department,
        status: "invited",
        invitedAt: new Date().toISOString().split("T")[0],
      }

      setTeamMembers((prev) => [...prev, newMember])
      setInviteForm({ name: "", email: "", role: "", department: "" })
      setIsInviteModalOpen(false)

      // Show success message
      alert(`Invitation sent to ${inviteForm.name} (${inviteForm.email})`)
    } catch (error) {
      alert("Failed to send invitation. Please try again.")
    } finally {
      setIsInviting(false)
    }
  }

  const removeMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== id))
  }

  const getRoleLabel = (roleValue: string) => {
    return roleOptions.find((role) => role.value === roleValue)?.label || roleValue
  }

  const getRoleIcon = (roleValue: string) => {
    const roleOption = roleOptions.find((role) => role.value === roleValue)
    return roleOption ? roleOption.icon : Users
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600 text-white border-green-500">Active</Badge>
      case "invited":
        return <Badge className="bg-blue-600 text-white border-blue-500">Invited</Badge>
      case "pending":
        return <Badge className="bg-orange-600 text-white border-orange-500">Pending</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Simple org chart representation
  const renderOrgChart = () => {
    const groupedByDepartment = teamMembers.reduce(
      (acc, member) => {
        if (!acc[member.department]) {
          acc[member.department] = []
        }
        acc[member.department].push(member)
        return acc
      },
      {} as Record<string, TeamMember[]>,
    )

    return (
      <div className="space-y-6">
        {Object.entries(groupedByDepartment).map(([department, members]) => (
          <div key={department} className="space-y-3">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <Building className="w-4 h-4" />
              {department}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {members.map((member) => {
                const RoleIcon = getRoleIcon(member.role)
                return (
                  <div
                    key={member.id}
                    className="bg-gray-700 border border-gray-600 rounded-lg p-3 hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <RoleIcon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h5 className="font-medium text-white text-sm">{member.name}</h5>
                          <p className="text-xs text-gray-400">{getRoleLabel(member.role)}</p>
                        </div>
                      </div>
                      {getStatusBadge(member.status)}
                    </div>
                    <p className="text-xs text-gray-300">{member.email}</p>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Team Overview */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5" />
              Team Management
            </CardTitle>
            <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Invite Colleague
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-gray-700 text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">Invite Team Member</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={inviteForm.name}
                      onChange={(e) => setInviteForm((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="John Smith"
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={inviteForm.email}
                      onChange={(e) => setInviteForm((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="john.smith@company.com"
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-gray-300">
                      Role / Function *
                    </Label>
                    <Select
                      value={inviteForm.role}
                      onValueChange={(value) => setInviteForm((prev) => ({ ...prev, role: value }))}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {roleOptions.map((role) => (
                          <SelectItem key={role.value} value={role.value} className="text-white">
                            <div className="flex items-center gap-2">
                              <role.icon className="w-4 h-4" />
                              {role.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-gray-300">
                      Department *
                    </Label>
                    <Select
                      value={inviteForm.department}
                      onValueChange={(value) => setInviteForm((prev) => ({ ...prev, department: value }))}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {departmentOptions.map((dept) => (
                          <SelectItem key={dept} value={dept} className="text-white">
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={handleInvite}
                    disabled={
                      isInviting || !inviteForm.name || !inviteForm.email || !inviteForm.role || !inviteForm.department
                    }
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isInviting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending Invitation...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Invitation
                      </>
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-gray-300">Total Members</span>
              </div>
              <div className="text-2xl font-bold text-white">{teamMembers.length}</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm text-gray-300">Active</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {teamMembers.filter((m) => m.status === "active").length}
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-orange-400" />
                <span className="text-sm text-gray-300">Pending</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {teamMembers.filter((m) => m.status === "invited" || m.status === "pending").length}
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Eye className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-300 mb-2">Multi-Perspective Analysis Benefits</h4>
                <p className="text-sm text-blue-200 mb-3">
                  By inviting colleagues from different functions, you unlock advanced cross-functional analysis that
                  provides:
                </p>
                <ul className="text-sm text-blue-200 space-y-1">
                  <li>
                    • <strong>360° Business View:</strong> Comprehensive insights from all departments
                  </li>
                  <li>
                    • <strong>Role-Specific Recommendations:</strong> Tailored advice for each function
                  </li>
                  <li>
                    • <strong>Cross-Department Synergies:</strong> Identify collaboration opportunities
                  </li>
                  <li>
                    • <strong>Enhanced Report Quality:</strong> More accurate and detailed assessments
                  </li>
                  <li>
                    • <strong>Strategic Alignment:</strong> Ensure all teams work toward common goals
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Organization Chart */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Building className="w-5 h-5" />
            Organization Chart
          </CardTitle>
        </CardHeader>
        <CardContent>{renderOrgChart()}</CardContent>
      </Card>

      {/* Team Members List */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => {
              const RoleIcon = getRoleIcon(member.role)
              return (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <RoleIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{member.name}</h4>
                      <p className="text-sm text-gray-300">{getRoleLabel(member.role)}</p>
                      <p className="text-xs text-gray-400">{member.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">{member.email}</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        {member.status === "active" && member.joinedAt
                          ? `Joined ${member.joinedAt}`
                          : `Invited ${member.invitedAt}`}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(member.status)}
                      {member.status === "invited" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeMember(member.id)}
                          className="border-red-600 text-red-400 hover:bg-red-900/50 bg-transparent"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Impact */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Analysis Impact by Role
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Current Team Coverage</h4>
              {roleOptions
                .filter((role) => teamMembers.some((member) => member.role === role.value))
                .map((role) => {
                  const memberCount = teamMembers.filter((member) => member.role === role.value).length
                  return (
                    <div key={role.value} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <role.icon className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-300">{role.label}</span>
                      </div>
                      <Badge className="bg-blue-600 text-white border-blue-500">{memberCount}</Badge>
                    </div>
                  )
                })}
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Recommended Additions</h4>
              {roleOptions
                .filter((role) => !teamMembers.some((member) => member.role === role.value))
                .slice(0, 5)
                .map((role) => (
                  <div key={role.value} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <role.icon className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-400">{role.label}</span>
                    </div>
                    <Badge variant="outline" className="border-gray-600 text-gray-400">
                      Missing
                    </Badge>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
