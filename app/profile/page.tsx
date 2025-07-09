"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  Save,
  CheckCircle,
  AlertCircle,
  Settings,
  FileText,
  BarChart3,
  MessageCircle,
  HelpCircle,
  Shield,
  CreditCard,
  Target,
  TrendingUp,
  Rocket,
  Building,
  Award,
  Zap,
  Brain,
  ArrowRight,
  Users,
  Trash2,
  AlertTriangle,
  Linkedin,
  Chrome,
  Apple,
  Link,
  Unlink,
  RefreshCw,
  GraduationCap,
  Briefcase,
  UserCheck,
} from "lucide-react"

// Import components
import PhoneVerifier from "@/components/phone-verifier"
import DocumentManager from "@/components/document-manager"
import SupersetDashboard from "@/components/superset-dashboard"
import ServiceOfferings from "@/components/service-offerings"
import TeamManagement from "@/components/team-management"
import { Navigation } from "@/components/navigation"

interface SocialConnection {
  provider: "linkedin" | "google" | "apple"
  connected: boolean
  connectedAt?: string
  profileData?: {
    id: string
    name: string
    email: string
    profilePicture?: string
    company?: string
    position?: string
    education?: Array<{
      school: string
      degree: string
      field: string
      startYear: number
      endYear?: number
    }>
    experience?: Array<{
      company: string
      position: string
      startDate: string
      endDate?: string
      current: boolean
    }>
  }
}

interface UserProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  companyName: string
  companyWebsite: string
  jobTitle: string
  industry: string
  companySize: string
  country: string
  city: string
  linkedinProfile: string
  bio: string
  isPhoneVerified: boolean
  isProfileVerified: boolean
  maturityLevel: string
  maturityScore: number
  profilePicture?: string
  socialConnections: {
    linkedin: SocialConnection
    google: SocialConnection
    apple: SocialConnection
  }
  education: Array<{
    school: string
    degree: string
    field: string
    startYear: number
    endYear?: number
  }>
  experience: Array<{
    company: string
    position: string
    startDate: string
    endDate?: string
    current: boolean
  }>
}

interface MaturityLevel {
  level: string
  title: string
  description: string
  color: string
  icon: any
  scoreRange: [number, number]
  characteristics: string[]
  nextSteps: string[]
}

const maturityLevels: MaturityLevel[] = [
  {
    level: "ideation",
    title: "Ideation Stage",
    description: "Early concept development and market validation",
    color: "bg-gray-600",
    icon: Brain,
    scoreRange: [0, 20],
    characteristics: [
      "Business idea in development",
      "Market research in progress",
      "No revenue or minimal revenue",
      "Founding team formation",
      "Concept validation needed",
    ],
    nextSteps: [
      "Conduct thorough market research",
      "Validate your business concept",
      "Build a strong founding team",
      "Develop a minimum viable product (MVP)",
      "Create a business plan",
    ],
  },
  {
    level: "startup",
    title: "Startup Stage",
    description: "MVP development and initial market entry",
    color: "bg-red-500",
    icon: Rocket,
    scoreRange: [21, 40],
    characteristics: [
      "MVP developed or in development",
      "Initial customer acquisition",
      "Seed funding or bootstrapping",
      "Core team established",
      "Product-market fit exploration",
    ],
    nextSteps: [
      "Achieve product-market fit",
      "Scale customer acquisition",
      "Optimize business model",
      "Prepare for Series A funding",
      "Build operational processes",
    ],
  },
  {
    level: "growth",
    title: "Growth Stage",
    description: "Scaling operations and expanding market presence",
    color: "bg-orange-500",
    icon: TrendingUp,
    scoreRange: [41, 60],
    characteristics: [
      "Proven product-market fit",
      "Growing customer base",
      "Series A/B funding completed",
      "Expanding team and operations",
      "Revenue growth trajectory",
    ],
    nextSteps: [
      "Scale operations efficiently",
      "Expand to new markets",
      "Develop strategic partnerships",
      "Optimize unit economics",
      "Prepare for later-stage funding",
    ],
  },
  {
    level: "expansion",
    title: "Expansion Stage",
    description: "Market expansion and operational optimization",
    color: "bg-blue-500",
    icon: Building,
    scoreRange: [61, 80],
    characteristics: [
      "Multiple market presence",
      "Established revenue streams",
      "Series B/C funding or profitable",
      "Mature operational processes",
      "Strong market position",
    ],
    nextSteps: [
      "Explore international expansion",
      "Develop new product lines",
      "Consider strategic acquisitions",
      "Optimize for profitability",
      "Prepare for exit strategies",
    ],
  },
  {
    level: "maturity",
    title: "Maturity Stage",
    description: "Established market leader with sustainable growth",
    color: "bg-green-500",
    icon: Award,
    scoreRange: [81, 100],
    characteristics: [
      "Market leadership position",
      "Sustainable profitability",
      "Diversified revenue streams",
      "Strong brand recognition",
      "IPO ready or acquired",
    ],
    nextSteps: [
      "Maintain market leadership",
      "Drive innovation and R&D",
      "Explore new business models",
      "Consider IPO or acquisition",
      "Focus on long-term sustainability",
    ],
  },
]

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "+41 79 123 45 67",
    companyName: "Tech Innovations SA",
    companyWebsite: "https://techinnovations.ch",
    jobTitle: "CEO & Founder",
    industry: "Technology",
    companySize: "11-50",
    country: "Switzerland",
    city: "Zurich",
    linkedinProfile: "https://linkedin.com/in/johndoe",
    bio: "Experienced entrepreneur with 15+ years in technology and business development.",
    isPhoneVerified: true,
    isProfileVerified: false,
    maturityLevel: "growth",
    maturityScore: 55,
    profilePicture: undefined,
    socialConnections: {
      linkedin: { provider: "linkedin", connected: false },
      google: { provider: "google", connected: false },
      apple: { provider: "apple", connected: false },
    },
    education: [],
    experience: [],
  })

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState("")
  const [isConnecting, setIsConnecting] = useState<string | null>(null)

  const currentMaturityLevel =
    maturityLevels.find((level) => level.level === profile.maturityLevel) || maturityLevels[0]

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      })

      if (response.ok) {
        setIsEditing(false)
        // Show success message
      }
    } catch (error) {
      console.error("Failed to save profile:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleVerifyProfile = async () => {
    try {
      const response = await fetch("/api/profile/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profileId: "user123" }),
      })

      if (response.ok) {
        setProfile((prev) => ({ ...prev, isProfileVerified: true }))
      }
    } catch (error) {
      console.error("Failed to verify profile:", error)
    }
  }

  const handleSocialConnect = async (provider: "linkedin" | "google" | "apple") => {
    setIsConnecting(provider)

    try {
      const response = await fetch(`/api/profile/connect-${provider}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: "user123" }),
      })

      const result = await response.json()

      if (result.success) {
        // Update profile with connected social data
        setProfile((prev) => ({
          ...prev,
          socialConnections: {
            ...prev.socialConnections,
            [provider]: {
              provider,
              connected: true,
              connectedAt: new Date().toISOString(),
              profileData: result.profileData,
            },
          },
          // Update profile fields if LinkedIn data is available
          ...(provider === "linkedin" &&
            result.profileData && {
              profilePicture: result.profileData.profilePicture,
              companyName: result.profileData.company || prev.companyName,
              jobTitle: result.profileData.position || prev.jobTitle,
              education: result.profileData.education || prev.education,
              experience: result.profileData.experience || prev.experience,
              isProfileVerified: true, // Auto-verify if LinkedIn is connected
            }),
        }))

        // Show success message
        console.log(`${provider} connected successfully`)
      }
    } catch (error) {
      console.error(`Failed to connect ${provider}:`, error)
    } finally {
      setIsConnecting(null)
    }
  }

  const handleSocialDisconnect = async (provider: "linkedin" | "google" | "apple") => {
    try {
      const response = await fetch(`/api/profile/disconnect-${provider}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: "user123" }),
      })

      if (response.ok) {
        setProfile((prev) => ({
          ...prev,
          socialConnections: {
            ...prev.socialConnections,
            [provider]: {
              provider,
              connected: false,
            },
          },
          // Remove profile picture if LinkedIn is disconnected
          ...(provider === "linkedin" && {
            profilePicture: undefined,
          }),
        }))
      }
    } catch (error) {
      console.error(`Failed to disconnect ${provider}:`, error)
    }
  }

  const handleSyncLinkedInData = async () => {
    if (!profile.socialConnections.linkedin.connected) return

    setIsConnecting("linkedin")

    try {
      const response = await fetch("/api/profile/sync-linkedin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: "user123" }),
      })

      const result = await response.json()

      if (result.success && result.profileData) {
        setProfile((prev) => ({
          ...prev,
          companyName: result.profileData.company || prev.companyName,
          jobTitle: result.profileData.position || prev.jobTitle,
          education: result.profileData.education || prev.education,
          experience: result.profileData.experience || prev.experience,
          profilePicture: result.profileData.profilePicture || prev.profilePicture,
          socialConnections: {
            ...prev.socialConnections,
            linkedin: {
              ...prev.socialConnections.linkedin,
              profileData: result.profileData,
            },
          },
        }))
      }
    } catch (error) {
      console.error("Failed to sync LinkedIn data:", error)
    } finally {
      setIsConnecting(null)
    }
  }

  const handleDeleteAllData = async () => {
    if (deleteConfirmation !== "SUPPRIMER") {
      return
    }

    try {
      const response = await fetch("/api/profile/delete-all-data", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ confirmation: deleteConfirmation }),
      })

      if (response.ok) {
        // Redirect to home page or show success message
        window.location.href = "/"
      }
    } catch (error) {
      console.error("Failed to delete data:", error)
    }
  }

  const getSocialButtonConfig = (provider: "linkedin" | "google" | "apple") => {
    const configs = {
      linkedin: {
        icon: Linkedin,
        color: "bg-[#0077B5] hover:bg-[#005885]",
        label: "LinkedIn",
      },
      google: {
        icon: Chrome,
        color: "bg-white hover:bg-gray-100 text-gray-900",
        label: "Google",
      },
      apple: {
        icon: Apple,
        color: "bg-black hover:bg-gray-900 border border-gray-600",
        label: "Apple",
      },
    }
    return configs[provider]
  }

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-50 text-white dark:text-gray-900">
      {/* Header */}
      <Navigation />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Avatar className="w-20 h-20 mx-auto mb-3">
                    <AvatarImage
                      src={profile.profilePicture || "/placeholder.svg"}
                      alt={`${profile.firstName} ${profile.lastName}`}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xl">
                      {profile.firstName[0]}
                      {profile.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold text-white dark:text-gray-900">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <p className="text-gray-300 dark:text-gray-500">{profile.jobTitle}</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">{profile.companyName}</p>

                  {/* Social Connection Status */}
                  <div className="flex justify-center gap-2 mt-3">
                    {Object.entries(profile.socialConnections).map(([provider, connection]) => {
                      const config = getSocialButtonConfig(provider as "linkedin" | "google" | "apple")
                      return (
                        <div key={provider} className="relative">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              connection.connected ? config.color : "bg-gray-600"
                            }`}
                          >
                            <config.icon className="w-4 h-4" />
                          </div>
                          {connection.connected && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800 dark:border-white"></div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-300 dark:text-gray-500">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300 dark:text-gray-500">
                    <Phone className="w-4 h-4" />
                    <span>{profile.phone}</span>
                    {profile.isPhoneVerified && <CheckCircle className="w-4 h-4 text-green-400" />}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300 dark:text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {profile.city}, {profile.country}
                    </span>
                  </div>
                  {profile.companyWebsite && (
                    <div className="flex items-center gap-2 text-sm text-gray-300 dark:text-gray-500">
                      <Globe className="w-4 h-4" />
                      <a
                        href={profile.companyWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline truncate"
                      >
                        Website
                      </a>
                    </div>
                  )}
                </div>

                <Separator className="my-4 bg-gray-700 dark:bg-gray-200" />

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 dark:text-gray-500">Profile Status</span>
                    {profile.isProfileVerified ? (
                      <Badge className="bg-green-600 text-white border-green-500">Verified</Badge>
                    ) : (
                      <Badge variant="outline" className="text-orange-400 border-orange-500">
                        Pending
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 dark:text-gray-500">Member Since</span>
                    <span className="text-gray-300 dark:text-gray-500">Jan 2024</span>
                  </div>
                </div>

                <Separator className="my-4 bg-gray-700 dark:bg-gray-200" />

                {/* Maturity Level Display */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400 dark:text-gray-500">Maturity Level</span>
                    <Badge className={`${currentMaturityLevel.color} text-white border-0`}>
                      <currentMaturityLevel.icon className="w-3 h-3 mr-1" />
                      {currentMaturityLevel.title}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500">
                      <span>Score: {profile.maturityScore}/100</span>
                      <span>{Math.round((profile.maturityScore / 100) * 100)}%</span>
                    </div>
                    <Progress value={profile.maturityScore} className="h-2" />
                  </div>
                </div>

                <Separator className="my-4 bg-gray-700 dark:bg-gray-200" />

                {/* Data Deletion Section */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-400 dark:text-gray-500">Data Management</h4>
                  <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-red-600 text-red-400 hover:bg-red-900/20 hover:border-red-500 bg-transparent"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete my data
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200 text-white dark:text-gray-900">
                      <DialogHeader>
                        <DialogTitle className="text-red-400 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5" />
                          Delete all data
                        </DialogTitle>
                        <DialogDescription className="text-gray-300 dark:text-gray-500">
                          This action is irreversible and will permanently delete all your data.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
                          <h4 className="font-semibold text-red-300 mb-2">Data that will be deleted:</h4>
                          <ul className="text-sm text-red-200 space-y-1">
                            <li>• Personal and professional profile information</li>
                            <li>• Team data and organizational chart</li>
                            <li>• Uploaded documents and analyses</li>
                            <li>• Report and evaluation history</li>
                            <li>• Account preferences and settings</li>
                            <li>• All browsing and usage data</li>
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="deleteConfirmation" className="text-gray-300 dark:text-gray-500">
                            To confirm, type <strong className="text-red-400">DELETE</strong> below:
                          </Label>
                          <Input
                            id="deleteConfirmation"
                            value={deleteConfirmation}
                            onChange={(e) => setDeleteConfirmation(e.target.value)}
                            placeholder="DELETE"
                            className="bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300 text-white dark:text-gray-900 placeholder-gray-400 dark:placeholder-gray-500"
                          />
                        </div>

                        <div className="flex gap-3 pt-4">
                          <Button
                            onClick={handleDeleteAllData}
                            disabled={deleteConfirmation !== "DELETE"}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete permanently
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsDeleteModalOpen(false)
                              setDeleteConfirmation("")
                            }}
                            className="border-gray-600 text-gray-300 dark:text-gray-500 hover:bg-gray-700 dark:hover:bg-gray-200 bg-transparent"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-7 bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
                <TabsTrigger
                  value="profile"
                  className="flex items-center gap-2 data-[state=active]:bg-gray-700 dark:data-[state=active]:bg-gray-100 text-gray-300 dark:text-gray-500 data-[state=active]:text-white dark:data-[state=active]:text-gray-900"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger
                  value="team"
                  className="flex items-center gap-2 data-[state=active]:bg-gray-700 dark:data-[state=active]:bg-gray-100 text-gray-300 dark:text-gray-500 data-[state=active]:text-white dark:data-[state=active]:text-gray-900"
                >
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Team</span>
                </TabsTrigger>
                <TabsTrigger
                  value="maturity"
                  className="flex items-center gap-2 data-[state=active]:bg-gray-700 dark:data-[state=active]:bg-gray-100 text-gray-300 dark:text-gray-500 data-[state=active]:text-white dark:data-[state=active]:text-gray-900"
                >
                  <Target className="w-4 h-4" />
                  <span className="hidden sm:inline">Maturity</span>
                </TabsTrigger>
                <TabsTrigger
                  value="documents"
                  className="flex items-center gap-2 data-[state=active]:bg-gray-700 dark:data-[state=active]:bg-gray-100 text-gray-300 dark:text-gray-500 data-[state=active]:text-white dark:data-[state=active]:text-gray-900"
                >
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Documents</span>
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="flex items-center gap-2 data-[state=active]:bg-gray-700 dark:data-[state=active]:bg-gray-100 text-gray-300 dark:text-gray-500 data-[state=active]:text-white dark:data-[state=active]:text-gray-900"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Analytics</span>
                </TabsTrigger>
                <TabsTrigger
                  value="services"
                  className="flex items-center gap-2 data-[state=active]:bg-gray-700 dark:data-[state=active]:bg-gray-100 text-gray-300 dark:text-gray-500 data-[state=active]:text-white dark:data-[state=active]:text-gray-900"
                >
                  <CreditCard className="w-4 h-4" />
                  <span className="hidden sm:inline">Services</span>
                </TabsTrigger>
                <TabsTrigger
                  value="support"
                  className="flex items-center gap-2 data-[state=active]:bg-gray-700 dark:data-[state=active]:bg-gray-100 text-gray-300 dark:text-gray-500 data-[state=active]:text-white dark:data-[state=active]:text-gray-900"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Support</span>
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                {/* Social Connections Section */}
                <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-white dark:text-gray-900 flex items-center gap-2">
                      <Link className="w-5 h-5" />
                      Social Connections
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 dark:text-gray-500 text-sm">
                      Connect your social accounts to automatically enrich your profile and validate your professional
                      information.
                    </p>

                    <div className="grid gap-4">
                      {/* LinkedIn Connection */}
                      <div className="flex items-center justify-between p-4 bg-gray-700 dark:bg-gray-100 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#0077B5] rounded-lg flex items-center justify-center">
                            <Linkedin className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white dark:text-gray-900">LinkedIn</h4>
                            <p className="text-sm text-gray-400 dark:text-gray-500">
                              {profile.socialConnections.linkedin.connected
                                ? `Connected on ${new Date(profile.socialConnections.linkedin.connectedAt!).toLocaleDateString("fr-FR")}`
                                : "Sync your professional profile"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {profile.socialConnections.linkedin.connected ? (
                            <>
                              <Button
                                onClick={handleSyncLinkedInData}
                                disabled={isConnecting === "linkedin"}
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                {isConnecting === "linkedin" ? (
                                  <RefreshCw className="w-4 h-4 animate-spin" />
                                ) : (
                                  <RefreshCw className="w-4 h-4" />
                                )}
                              </Button>
                              <Button
                                onClick={() => handleSocialDisconnect("linkedin")}
                                size="sm"
                                variant="outline"
                                className="border-red-600 text-red-400 hover:bg-red-900/20"
                              >
                                <Unlink className="w-4 h-4" />
                              </Button>
                            </>
                          ) : (
                            <Button
                              onClick={() => handleSocialConnect("linkedin")}
                              disabled={isConnecting === "linkedin"}
                              size="sm"
                              className="bg-[#0077B5] hover:bg-[#005885]"
                            >
                              {isConnecting === "linkedin" ? (
                                <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                              ) : (
                                <Link className="w-4 h-4 mr-2" />
                              )}
                              Connect
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Google Connection */}
                      <div className="flex items-center justify-between p-4 bg-gray-700 dark:bg-gray-100 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                            <Chrome className="w-5 h-5 text-gray-900" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white dark:text-gray-900">Google</h4>
                            <p className="text-sm text-gray-400 dark:text-gray-500">
                              {profile.socialConnections.google.connected
                                ? `Connected on ${new Date(profile.socialConnections.google.connectedAt!).toLocaleDateString("fr-FR")}`
                                : "Sync with your Google account"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {profile.socialConnections.google.connected ? (
                            <Button
                              onClick={() => handleSocialDisconnect("google")}
                              size="sm"
                              variant="outline"
                              className="border-red-600 text-red-400 hover:bg-red-900/20"
                            >
                              <Unlink className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleSocialConnect("google")}
                              disabled={isConnecting === "google"}
                              size="sm"
                              className="bg-white hover:bg-gray-100 text-gray-900"
                            >
                              {isConnecting === "google" ? (
                                <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                              ) : (
                                <Link className="w-4 h-4 mr-2" />
                              )}
                              Connect
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Apple Connection */}
                      <div className="flex items-center justify-between p-4 bg-gray-700 dark:bg-gray-100 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center border border-gray-600">
                            <Apple className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white dark:text-gray-900">Apple</h4>
                            <p className="text-sm text-gray-400 dark:text-gray-500">
                              {profile.socialConnections.apple.connected
                                ? `Connected on ${new Date(profile.socialConnections.apple.connectedAt!).toLocaleDateString("fr-FR")}`
                                : "Sync with your Apple ID"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {profile.socialConnections.apple.connected ? (
                            <Button
                              onClick={() => handleSocialDisconnect("apple")}
                              size="sm"
                              variant="outline"
                              className="border-red-600 text-red-400 hover:bg-red-900/20"
                            >
                              <Unlink className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleSocialConnect("apple")}
                              disabled={isConnecting === "apple"}
                              size="sm"
                              className="bg-black hover:bg-gray-900 border border-gray-600"
                            >
                              {isConnecting === "apple" ? (
                                <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                              ) : (
                                <Link className="w-4 h-4 mr-2" />
                              )}
                              Connect
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* LinkedIn Benefits */}
                    {!profile.socialConnections.linkedin.connected && (
                      <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                          <UserCheck className="w-4 h-4" />
                          LinkedIn Connection Benefits
                        </h4>
                        <ul className="text-sm text-blue-200 space-y-1">
                          <li>• Automatic profile picture retrieval</li>
                          <li>• Company affiliation validation</li>
                          <li>• Professional background synchronization</li>
                          <li>• Education level and training import</li>
                          <li>• Colleague company affiliation verification</li>
                          <li>• Automatic profile validation</li>
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Professional Experience Section */}
                {profile.experience.length > 0 && (
                  <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-white dark:text-gray-900 flex items-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        Professional Experience
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {profile.experience.map((exp, index) => (
                          <div key={index} className="border-l-2 border-blue-500 pl-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-white dark:text-gray-900">{exp.position}</h4>
                              {exp.current && <Badge className="bg-green-600 text-white">Current</Badge>}
                            </div>
                            <p className="text-blue-400">{exp.company}</p>
                            <p className="text-sm text-gray-400 dark:text-gray-500">
                              {exp.startDate} - {exp.endDate || "Present"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Education Section */}
                {profile.education.length > 0 && (
                  <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-white dark:text-gray-900 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5" />
                        Education
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {profile.education.map((edu, index) => (
                          <div key={index} className="border-l-2 border-purple-500 pl-4">
                            <h4 className="font-semibold text-white dark:text-gray-900">{edu.degree}</h4>
                            <p className="text-purple-400">{edu.school}</p>
                            <p className="text-sm text-gray-400 dark:text-gray-500">{edu.field}</p>
                            <p className="text-sm text-gray-400 dark:text-gray-500">
                              {edu.startYear} - {edu.endYear || "Ongoing"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-white dark:text-gray-900">Personal Information</CardTitle>
                    <Button
                      variant={isEditing ? "default" : "outline"}
                      onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                      disabled={isSaving}
                      className={
                        isEditing
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "border-gray-600 text-gray-300 dark:text-gray-500 hover:bg-gray-700 dark:hover:bg-gray-200"
                      }
                    >
                      {isSaving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : isEditing ? (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      ) : (
                        <>
                          <Settings className="w-4 h-4 mr-2" />
                          Edit Profile
                        </>
                      )}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-gray-300 dark:text-gray-500">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          value={profile.firstName}
                          onChange={(e) => setProfile((prev) => ({ ...prev, firstName: e.target.value }))}
                          disabled={!isEditing}
                          className="bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300 text-white dark:text-gray-900 placeholder-gray-400 dark:placeholder-gray-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-gray-300 dark:text-gray-500">
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          value={profile.lastName}
                          onChange={(e) => setProfile((prev) => ({ ...prev, lastName: e.target.value }))}
                          disabled={!isEditing}
                          className="bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300 text-white dark:text-gray-900 placeholder-gray-400 dark:placeholder-gray-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300 dark:text-gray-500">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                          disabled={!isEditing}
                          className="bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300 text-white dark:text-gray-900 placeholder-gray-400 dark:placeholder-gray-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-300 dark:text-gray-500">
                          Phone Number
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            id="phone"
                            value={profile.phone}
                            onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                            disabled={!isEditing}
                            className="flex-grow bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300 text-white dark:text-gray-900 placeholder-gray-400 dark:placeholder-gray-500"
                          />
                          {profile.isPhoneVerified ? (
                            <Badge className="bg-green-600 text-white border-green-500 px-3 py-2">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Verified
                            </Badge>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-600 text-gray-300 dark:text-gray-500 hover:bg-gray-700 dark:hover:bg-gray-200 bg-transparent"
                            >
                              Verify
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-gray-700 dark:bg-gray-200" />

                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-white dark:text-gray-900">Company Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="companyName" className="text-gray-300 dark:text-gray-500">
                            Company Name *
                          </Label>
                          <Input
                            id="companyName"
                            value={profile.companyName}
                            onChange={(e) => setProfile((prev) => ({ ...prev, companyName: e.target.value }))}
                            disabled={!isEditing}
                            className="bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300 text-white dark:text-gray-900 placeholder-gray-400 dark:placeholder-gray-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="companyWebsite" className="text-gray-300 dark:text-gray-500">
                            Company Website
                          </Label>
                          <Input
                            id="companyWebsite"
                            value={profile.companyWebsite}
                            onChange={(e) => setProfile((prev) => ({ ...prev, companyWebsite: e.target.value }))}
                            disabled={!isEditing}
                            placeholder="https://example.com"
                            className="bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300 text-white dark:text-gray-900 placeholder-gray-400 dark:placeholder-gray-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="jobTitle" className="text-gray-300 dark:text-gray-500">
                            Job Title
                          </Label>
                          <Input
                            id="jobTitle"
                            value={profile.jobTitle}
                            onChange={(e) => setProfile((prev) => ({ ...prev, jobTitle: e.target.value }))}
                            disabled={!isEditing}
                            className="bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300 text-white dark:text-gray-900 placeholder-gray-400 dark:placeholder-gray-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="industry" className="text-gray-300 dark:text-gray-500">
                            Industry
                          </Label>
                          <Select
                            value={profile.industry}
                            onValueChange={(value) => setProfile((prev) => ({ ...prev, industry: value }))}
                            disabled={!isEditing}
                          >
                            <SelectTrigger className="bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300 text-white dark:text-gray-900">
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300">
                              <SelectItem value="Technology">Technology</SelectItem>
                              <SelectItem value="Finance">Finance</SelectItem>
                              <SelectItem value="Healthcare">Healthcare</SelectItem>
                              <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                              <SelectItem value="Retail">Retail</SelectItem>
                              <SelectItem value="Consulting">Consulting</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="companySize" className="text-gray-300 dark:text-gray-500">
                            Company Size
                          </Label>
                          <Select
                            value={profile.companySize}
                            onValueChange={(value) => setProfile((prev) => ({ ...prev, companySize: value }))}
                            disabled={!isEditing}
                          >
                            <SelectTrigger className="bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300 text-white dark:text-gray-900">
                              <SelectValue placeholder="Select company size" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300">
                              <SelectItem value="1-10">1-10 employees</SelectItem>
                              <SelectItem value="11-50">11-50 employees</SelectItem>
                              <SelectItem value="51-200">51-200 employees</SelectItem>
                              <SelectItem value="201-1000">201-1000 employees</SelectItem>
                              <SelectItem value="1000+">1000+ employees</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country" className="text-gray-300 dark:text-gray-500">
                            Country
                          </Label>
                          <Input
                            id="country"
                            value={profile.country}
                            onChange={(e) => setProfile((prev) => ({ ...prev, country: e.target.value }))}
                            disabled={!isEditing}
                            className="bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300 text-white dark:text-gray-900 placeholder-gray-400 dark:placeholder-gray-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city" className="text-gray-300 dark:text-gray-500">
                            City
                          </Label>
                          <Input
                            id="city"
                            value={profile.city}
                            onChange={(e) => setProfile((prev) => ({ ...prev, city: e.target.value }))}
                            disabled={!isEditing}
                            className="bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300 text-white dark:text-gray-900 placeholder-gray-400 dark:placeholder-gray-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="linkedinProfile" className="text-gray-300 dark:text-gray-500">
                            LinkedIn Profile
                          </Label>
                          <Input
                            id="linkedinProfile"
                            value={profile.linkedinProfile}
                            onChange={(e) => setProfile((prev) => ({ ...prev, linkedinProfile: e.target.value }))}
                            disabled={!isEditing}
                            placeholder="https://linkedin.com/in/yourprofile"
                            className="bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300 text-white dark:text-gray-900 placeholder-gray-400 dark:placeholder-gray-500"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-gray-300 dark:text-gray-500">
                          Professional Bio
                        </Label>
                        <Textarea
                          id="bio"
                          value={profile.bio}
                          onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                          disabled={!isEditing}
                          rows={4}
                          placeholder="Tell us about your professional background and experience..."
                          className="bg-gray-700 dark:bg-gray-100 border-gray-600 dark:border-gray-300 text-white dark:text-gray-900 placeholder-gray-400 dark:placeholder-gray-500"
                        />
                      </div>
                    </div>

                    {!profile.isProfileVerified && (
                      <div className="bg-orange-900/50 border border-orange-700 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-5 h-5 text-orange-400" />
                          <h4 className="font-medium text-orange-300">Profile Verification Required</h4>
                        </div>
                        <p className="text-sm text-orange-200 mb-3">
                          Complete your profile verification to access all premium features and generate comprehensive
                          reports.
                        </p>
                        <Button onClick={handleVerifyProfile} className="bg-orange-600 hover:bg-orange-700 text-white">
                          <Shield className="w-4 h-4 mr-2" />
                          Verify Profile
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Phone Verification Section */}
                {!profile.isPhoneVerified && (
                  <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-white dark:text-gray-900">Phone Verification</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <PhoneVerifier />
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Team Tab */}
              <TabsContent value="team" className="space-y-6">
                <TeamManagement />
              </TabsContent>

              {/* Maturity Tab */}
              <TabsContent value="maturity" className="space-y-6">
                {/* Current Maturity Level */}
                <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-white dark:text-gray-900 flex items-center gap-2">
                      <currentMaturityLevel.icon className="w-6 h-6" />
                      Your Current Maturity Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-white dark:text-gray-900">
                            {currentMaturityLevel.title}
                          </h3>
                          <p className="text-gray-300 dark:text-gray-500">{currentMaturityLevel.description}</p>
                        </div>
                        <Badge className={`${currentMaturityLevel.color} text-white border-0 text-lg px-4 py-2`}>
                          Score: {profile.maturityScore}/100
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-400 dark:text-gray-500">
                          <span>Progress</span>
                          <span>{Math.round((profile.maturityScore / 100) * 100)}%</span>
                        </div>
                        <Progress value={profile.maturityScore} className="h-3" />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-white dark:text-gray-900 mb-3">Current Characteristics</h4>
                          <ul className="space-y-2">
                            {currentMaturityLevel.characteristics.map((characteristic, index) => (
                              <li key={index} className="flex items-start gap-2 text-gray-300 dark:text-gray-500">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{characteristic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-white dark:text-gray-900 mb-3">Recommended Next Steps</h4>
                          <ul className="space-y-2">
                            {currentMaturityLevel.nextSteps.map((step, index) => (
                              <li key={index} className="flex items-start gap-2 text-gray-300 dark:text-gray-500">
                                <ArrowRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* All Maturity Levels Overview */}
                <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-white dark:text-gray-900">Startup Maturity Framework</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {maturityLevels.map((level, index) => (
                        <div
                          key={level.level}
                          className={`p-4 rounded-lg border transition-colors ${
                            level.level === profile.maturityLevel
                              ? "border-blue-500 bg-blue-900/20"
                              : "border-gray-600 bg-gray-700/50"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 ${level.color} rounded-lg flex items-center justify-center`}>
                                <level.icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-white dark:text-gray-900">{level.title}</h4>
                                <p className="text-sm text-gray-300 dark:text-gray-500">{level.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-400 dark:text-gray-500">Score Range</div>
                              <div className="font-semibold text-white dark:text-gray-900">
                                {level.scoreRange[0]}-{level.scoreRange[1]}
                              </div>
                            </div>
                          </div>
                          {level.level === profile.maturityLevel && (
                            <Badge className="bg-blue-600 text-white border-0">Current Level</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Assessment CTA */}
                <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-700">
                  <CardContent className="p-6 text-center">
                    <Zap className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white dark:text-gray-900 mb-2">Ready to Level Up?</h3>
                    <p className="text-gray-300 dark:text-gray-500 mb-4">
                      Take our comprehensive assessment to get personalized recommendations for advancing to the next
                      maturity stage.
                    </p>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0">
                      Start Assessment
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="space-y-6">
                <DocumentManager />
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <SupersetDashboard />
              </TabsContent>

              {/* Services Tab */}
              <TabsContent value="services" className="space-y-6">
                <ServiceOfferings />
              </TabsContent>

              {/* Support Tab */}
              <TabsContent value="support" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white dark:text-gray-900">
                        <MessageCircle className="w-5 h-5" />
                        Live Chat Support
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 dark:text-gray-500 mb-4">
                        Get instant help from our support team. We're available 24/7 to assist you.
                      </p>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Start Chat</Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white dark:text-gray-900">
                        <Calendar className="w-5 h-5" />
                        Schedule Consultation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 dark:text-gray-500 mb-4">
                        Book a free consultation with our business experts to discuss your needs.
                      </p>
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => window.open("https://cal.com/inomax-ai/consultation", "_blank")}
                      >
                        Book Consultation
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white dark:text-gray-900">
                        <FileText className="w-5 h-5" />
                        Knowledge Base
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 dark:text-gray-500 mb-4">
                        Browse our comprehensive guides and documentation.
                      </p>
                      <Button
                        variant="outline"
                        className="w-full border-gray-600 text-gray-300 dark:text-gray-500 hover:bg-gray-700 dark:hover:bg-gray-200 bg-transparent"
                      >
                        Browse Articles
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white dark:text-gray-900">
                        <Mail className="w-5 h-5" />
                        Email Support
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 dark:text-gray-500 mb-4">
                        Send us an email and we'll get back to you within 24 hours.
                      </p>
                      <Button
                        variant="outline"
                        className="w-full border-gray-600 text-gray-300 dark:text-gray-500 hover:bg-gray-700 dark:hover:bg-gray-200 bg-transparent"
                        onClick={() => (window.location.href = "mailto:support@inomax.ai")}
                      >
                        Send Email
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* FAQ Section */}
                <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-white dark:text-gray-900">Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-b border-gray-700 dark:border-gray-200 pb-4">
                        <h4 className="font-medium text-white dark:text-gray-900 mb-2">
                          How do I generate my free assessment report?
                        </h4>
                        <p className="text-sm text-gray-300 dark:text-gray-500">
                          Navigate to the Services tab and click on "Generate Free Report" in the Starter package. The
                          report will be automatically generated and sent to your email within 5 minutes.
                        </p>
                      </div>
                      <div className="border-b border-gray-700 dark:border-gray-200 pb-4">
                        <h4 className="font-medium text-white dark:text-gray-900 mb-2">
                          What file types can I upload?
                        </h4>
                        <p className="text-sm text-gray-300 dark:text-gray-500">
                          We support PDF, Word documents, Excel spreadsheets, images (JPG, PNG, GIF), and text files.
                          Maximum file size is 100MB per file.
                        </p>
                      </div>
                      <div className="border-b border-gray-700 dark:border-gray-200 pb-4">
                        <h4 className="font-medium text-white dark:text-gray-900 mb-2">How is my data protected?</h4>
                        <p className="text-sm text-gray-300 dark:text-gray-500">
                          All evaluations are accompanied by a signed NDA, ensuring complete confidentiality. Your data
                          is encrypted and stored securely according to Swiss data protection standards.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-white dark:text-gray-900 mb-2">
                          Can I upgrade my service package?
                        </h4>
                        <p className="text-sm text-gray-300 dark:text-gray-500">
                          Yes, you can upgrade to any premium package at any time. Contact our support team or book a
                          consultation to discuss the best option for your needs.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
