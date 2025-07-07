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
  Bell,
  CreditCard,
  Target,
  TrendingUp,
  Rocket,
  Building,
  Award,
  Zap,
  Brain,
  ArrowRight,
} from "lucide-react"

// Import components
import PhoneVerifier from "@/components/phone-verifier"
import DocumentManager from "@/components/document-manager"
import SupersetDashboard from "@/components/superset-dashboard"
import ServiceOfferings from "@/components/service-offerings"

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
  })

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")

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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  INOMAX.ai
                </h1>
                <p className="text-sm text-gray-400">Business Intelligence Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-600 text-white border-green-500">
                <CheckCircle className="w-4 h-4 mr-1" />
                Active Account
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <p className="text-gray-300">{profile.jobTitle}</p>
                  <p className="text-sm text-gray-400">{profile.companyName}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Phone className="w-4 h-4" />
                    <span>{profile.phone}</span>
                    {profile.isPhoneVerified && <CheckCircle className="w-4 h-4 text-green-400" />}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {profile.city}, {profile.country}
                    </span>
                  </div>
                  {profile.companyWebsite && (
                    <div className="flex items-center gap-2 text-sm text-gray-300">
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

                <Separator className="my-4 bg-gray-700" />

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Profile Status</span>
                    {profile.isProfileVerified ? (
                      <Badge className="bg-green-600 text-white border-green-500">Verified</Badge>
                    ) : (
                      <Badge variant="outline" className="text-orange-400 border-orange-500">
                        Pending
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Member Since</span>
                    <span className="text-gray-300">Jan 2024</span>
                  </div>
                </div>

                <Separator className="my-4 bg-gray-700" />

                {/* Maturity Level Display */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Maturity Level</span>
                    <Badge className={`${currentMaturityLevel.color} text-white border-0`}>
                      <currentMaturityLevel.icon className="w-3 h-3 mr-1" />
                      {currentMaturityLevel.title}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Score: {profile.maturityScore}/100</span>
                      <span>{Math.round((profile.maturityScore / 100) * 100)}%</span>
                    </div>
                    <Progress value={profile.maturityScore} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-6 bg-gray-800 border-gray-700">
                <TabsTrigger
                  value="profile"
                  className="flex items-center gap-2 data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                >
                  <User className="w-4 h-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="maturity"
                  className="flex items-center gap-2 data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                >
                  <Target className="w-4 h-4" />
                  Maturity
                </TabsTrigger>
                <TabsTrigger
                  value="documents"
                  className="flex items-center gap-2 data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                >
                  <FileText className="w-4 h-4" />
                  Documents
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="flex items-center gap-2 data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                >
                  <BarChart3 className="w-4 h-4" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger
                  value="services"
                  className="flex items-center gap-2 data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                >
                  <CreditCard className="w-4 h-4" />
                  Services
                </TabsTrigger>
                <TabsTrigger
                  value="support"
                  className="flex items-center gap-2 data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                >
                  <HelpCircle className="w-4 h-4" />
                  Support
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-white">Personal Information</CardTitle>
                    <Button
                      variant={isEditing ? "default" : "outline"}
                      onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                      disabled={isSaving}
                      className={
                        isEditing ? "bg-blue-600 hover:bg-blue-700" : "border-gray-600 text-gray-300 hover:bg-gray-700"
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
                        <Label htmlFor="firstName" className="text-gray-300">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          value={profile.firstName}
                          onChange={(e) => setProfile((prev) => ({ ...prev, firstName: e.target.value }))}
                          disabled={!isEditing}
                          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-gray-300">
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          value={profile.lastName}
                          onChange={(e) => setProfile((prev) => ({ ...prev, lastName: e.target.value }))}
                          disabled={!isEditing}
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
                          value={profile.email}
                          onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                          disabled={!isEditing}
                          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-300">
                          Phone Number
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            id="phone"
                            value={profile.phone}
                            onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                            disabled={!isEditing}
                            className="flex-grow bg-gray-700 border-gray-600 text-white placeholder-gray-400"
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
                              className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                            >
                              Verify
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-gray-700" />

                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-white">Company Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="companyName" className="text-gray-300">
                            Company Name *
                          </Label>
                          <Input
                            id="companyName"
                            value={profile.companyName}
                            onChange={(e) => setProfile((prev) => ({ ...prev, companyName: e.target.value }))}
                            disabled={!isEditing}
                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="companyWebsite" className="text-gray-300">
                            Company Website
                          </Label>
                          <Input
                            id="companyWebsite"
                            value={profile.companyWebsite}
                            onChange={(e) => setProfile((prev) => ({ ...prev, companyWebsite: e.target.value }))}
                            disabled={!isEditing}
                            placeholder="https://example.com"
                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="jobTitle" className="text-gray-300">
                            Job Title
                          </Label>
                          <Input
                            id="jobTitle"
                            value={profile.jobTitle}
                            onChange={(e) => setProfile((prev) => ({ ...prev, jobTitle: e.target.value }))}
                            disabled={!isEditing}
                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="industry" className="text-gray-300">
                            Industry
                          </Label>
                          <Select
                            value={profile.industry}
                            onValueChange={(value) => setProfile((prev) => ({ ...prev, industry: value }))}
                            disabled={!isEditing}
                          >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
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
                          <Label htmlFor="companySize" className="text-gray-300">
                            Company Size
                          </Label>
                          <Select
                            value={profile.companySize}
                            onValueChange={(value) => setProfile((prev) => ({ ...prev, companySize: value }))}
                            disabled={!isEditing}
                          >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue placeholder="Select company size" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                              <SelectItem value="1-10">1-10 employees</SelectItem>
                              <SelectItem value="11-50">11-50 employees</SelectItem>
                              <SelectItem value="51-200">51-200 employees</SelectItem>
                              <SelectItem value="201-1000">201-1000 employees</SelectItem>
                              <SelectItem value="1000+">1000+ employees</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country" className="text-gray-300">
                            Country
                          </Label>
                          <Input
                            id="country"
                            value={profile.country}
                            onChange={(e) => setProfile((prev) => ({ ...prev, country: e.target.value }))}
                            disabled={!isEditing}
                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city" className="text-gray-300">
                            City
                          </Label>
                          <Input
                            id="city"
                            value={profile.city}
                            onChange={(e) => setProfile((prev) => ({ ...prev, city: e.target.value }))}
                            disabled={!isEditing}
                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="linkedinProfile" className="text-gray-300">
                            LinkedIn Profile
                          </Label>
                          <Input
                            id="linkedinProfile"
                            value={profile.linkedinProfile}
                            onChange={(e) => setProfile((prev) => ({ ...prev, linkedinProfile: e.target.value }))}
                            disabled={!isEditing}
                            placeholder="https://linkedin.com/in/yourprofile"
                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-gray-300">
                          Professional Bio
                        </Label>
                        <Textarea
                          id="bio"
                          value={profile.bio}
                          onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                          disabled={!isEditing}
                          rows={4}
                          placeholder="Tell us about your professional background and experience..."
                          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
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
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Phone Verification</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <PhoneVerifier />
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Maturity Tab */}
              <TabsContent value="maturity" className="space-y-6">
                {/* Current Maturity Level */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <currentMaturityLevel.icon className="w-6 h-6" />
                      Your Current Maturity Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-white">{currentMaturityLevel.title}</h3>
                          <p className="text-gray-300">{currentMaturityLevel.description}</p>
                        </div>
                        <Badge className={`${currentMaturityLevel.color} text-white border-0 text-lg px-4 py-2`}>
                          Score: {profile.maturityScore}/100
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>Progress</span>
                          <span>{Math.round((profile.maturityScore / 100) * 100)}%</span>
                        </div>
                        <Progress value={profile.maturityScore} className="h-3" />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-white mb-3">Current Characteristics</h4>
                          <ul className="space-y-2">
                            {currentMaturityLevel.characteristics.map((characteristic, index) => (
                              <li key={index} className="flex items-start gap-2 text-gray-300">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{characteristic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-white mb-3">Recommended Next Steps</h4>
                          <ul className="space-y-2">
                            {currentMaturityLevel.nextSteps.map((step, index) => (
                              <li key={index} className="flex items-start gap-2 text-gray-300">
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
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Startup Maturity Framework</CardTitle>
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
                                <h4 className="font-semibold text-white">{level.title}</h4>
                                <p className="text-sm text-gray-300">{level.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-400">Score Range</div>
                              <div className="font-semibold text-white">
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
                    <h3 className="text-xl font-bold text-white mb-2">Ready to Level Up?</h3>
                    <p className="text-gray-300 mb-4">
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
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <MessageCircle className="w-5 h-5" />
                        Live Chat Support
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4">
                        Get instant help from our support team. We're available 24/7 to assist you.
                      </p>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Start Chat</Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Calendar className="w-5 h-5" />
                        Schedule Consultation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4">
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

                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <FileText className="w-5 h-5" />
                        Knowledge Base
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4">Browse our comprehensive guides and documentation.</p>
                      <Button
                        variant="outline"
                        className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                      >
                        Browse Articles
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Mail className="w-5 h-5" />
                        Email Support
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4">Send us an email and we'll get back to you within 24 hours.</p>
                      <Button
                        variant="outline"
                        className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                        onClick={() => (window.location.href = "mailto:support@inomax.ai")}
                      >
                        Send Email
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* FAQ Section */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-b border-gray-700 pb-4">
                        <h4 className="font-medium text-white mb-2">How do I generate my free assessment report?</h4>
                        <p className="text-sm text-gray-300">
                          Navigate to the Services tab and click on "Generate Free Report" in the Starter package. The
                          report will be automatically generated and sent to your email within 5 minutes.
                        </p>
                      </div>
                      <div className="border-b border-gray-700 pb-4">
                        <h4 className="font-medium text-white mb-2">What file types can I upload?</h4>
                        <p className="text-sm text-gray-300">
                          We support PDF, Word documents, Excel spreadsheets, images (JPG, PNG, GIF), and text files.
                          Maximum file size is 100MB per file.
                        </p>
                      </div>
                      <div className="border-b border-gray-700 pb-4">
                        <h4 className="font-medium text-white mb-2">How is my data protected?</h4>
                        <p className="text-sm text-gray-300">
                          All evaluations are accompanied by a signed NDA, ensuring complete confidentiality. Your data
                          is encrypted and stored securely according to Swiss data protection standards.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-2">Can I upgrade my service package?</h4>
                        <p className="text-sm text-gray-300">
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
