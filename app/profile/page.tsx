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
  Save,
  CheckCircle,
  Settings,
  FileText,
  BarChart3,
  HelpCircle,
  CreditCard,
  Target,
  TrendingUp,
  Rocket,
  Building,
  Award,
  Brain,
  Users,
  Trash2,
  AlertTriangle,
  Linkedin,
  Link,
  RefreshCw,
  UserCheck,
} from "lucide-react"
import DocumentManager from "@/components/document-manager"
import SupersetDashboard from "@/components/superset-dashboard"
import ServiceOfferings from "@/components/service-offerings"
import TeamManagement from "@/components/team-management"
import { Navigation } from "@/components/navigation"

// ... (interfaces remain the same)
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
    color: "bg-gray-500",
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
    // ... API call logic
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    setIsEditing(false)
  }

  const handleSocialConnect = async (provider: "linkedin" | "google" | "apple") => {
    setIsConnecting(provider)
    // ... API call logic
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsConnecting(null)
  }

  const handleSocialDisconnect = async (provider: "linkedin" | "google" | "apple") => {
    // ... API call logic
  }

  const handleDeleteAllData = async () => {
    if (deleteConfirmation !== "DELETE") return
    // ... API call logic
  }

  return (
    <div className="bg-background text-foreground">
      <Navigation />
      <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 text-center">
                  <Avatar className="mx-auto mb-3 h-20 w-20">
                    <AvatarImage src={profile.profilePicture || "/placeholder-user.jpg"} alt={profile.firstName} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-purple-500 text-xl font-semibold text-primary-foreground">
                      {profile.firstName?.[0]}
                      {profile.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold text-foreground">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <p className="text-muted-foreground">{profile.jobTitle}</p>
                  <p className="text-sm text-muted-foreground">{profile.companyName}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{profile.phone}</span>
                    {profile.isPhoneVerified && <CheckCircle className="h-4 w-4 text-green-500" />}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {profile.city}, {profile.country}
                    </span>
                  </div>
                  {profile.companyWebsite && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Globe className="h-4 w-4" />
                      <a
                        href={profile.companyWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate text-primary hover:underline"
                      >
                        Website
                      </a>
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Profile Status</span>
                    {profile.isProfileVerified ? (
                      <Badge className="border-transparent bg-green-500 text-primary-foreground">Verified</Badge>
                    ) : (
                      <Badge variant="outline" className="border-orange-500 text-orange-500">
                        Pending
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Member Since</span>
                    <span className="font-medium text-foreground">Jan 2024</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Maturity Level</span>
                    <Badge style={{ backgroundColor: currentMaturityLevel.color }} className="border-0 text-white">
                      <currentMaturityLevel.icon className="mr-1 h-3 w-3" />
                      {currentMaturityLevel.title}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Score: {profile.maturityScore}/100</span>
                      <span>{profile.maturityScore}%</span>
                    </div>
                    <Progress value={profile.maturityScore} className="h-2" />
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Data Management</h4>
                  <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="destructive-outline" size="sm" className="w-full">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete my data
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-destructive">
                          <AlertTriangle className="h-5 w-5" />
                          Delete all data
                        </DialogTitle>
                        <DialogDescription>
                          This action is irreversible and will permanently delete all your data.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4">
                          <h4 className="mb-2 font-semibold text-destructive">Data to be deleted:</h4>
                          <ul className="space-y-1 text-sm text-destructive/80">
                            <li>• Personal and professional profile</li>
                            <li>• Team data and org chart</li>
                            <li>• Uploaded documents and analyses</li>
                            <li>• Report and evaluation history</li>
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="deleteConfirmation">
                            To confirm, type <strong className="text-destructive">DELETE</strong> below:
                          </Label>
                          <Input
                            id="deleteConfirmation"
                            value={deleteConfirmation}
                            onChange={(e) => setDeleteConfirmation(e.target.value.toUpperCase())}
                            placeholder="DELETE"
                          />
                        </div>
                        <div className="flex gap-3 pt-4">
                          <Button
                            onClick={handleDeleteAllData}
                            disabled={deleteConfirmation !== "DELETE"}
                            variant="destructive"
                            className="flex-1"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete permanently
                          </Button>
                          <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 sm:grid-cols-7">
                <TabsTrigger value="profile">
                  <User className="mr-1 h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="team">
                  <Users className="mr-1 h-4 w-4" />
                  <span className="hidden sm:inline">Team</span>
                </TabsTrigger>
                <TabsTrigger value="maturity">
                  <Target className="mr-1 h-4 w-4" />
                  <span className="hidden sm:inline">Maturity</span>
                </TabsTrigger>
                <TabsTrigger value="documents">
                  <FileText className="mr-1 h-4 w-4" />
                  <span className="hidden sm:inline">Documents</span>
                </TabsTrigger>
                <TabsTrigger value="analytics">
                  <BarChart3 className="mr-1 h-4 w-4" />
                  <span className="hidden sm:inline">Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="services">
                  <CreditCard className="mr-1 h-4 w-4" />
                  <span className="hidden sm:inline">Services</span>
                </TabsTrigger>
                <TabsTrigger value="support">
                  <HelpCircle className="mr-1 h-4 w-4" />
                  <span className="hidden sm:inline">Support</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Link className="h-5 w-5" />
                      Social Connections
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">Connect social accounts to enrich your profile.</p>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0077B5]">
                            <Linkedin className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">LinkedIn</h4>
                            <p className="text-sm text-muted-foreground">Sync your professional profile</p>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleSocialConnect("linkedin")}
                          disabled={isConnecting === "linkedin"}
                          size="sm"
                          className="bg-[#0077B5] text-white hover:bg-[#005885]"
                        >
                          <Link className="mr-2 h-4 w-4" />
                          Connect
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 rounded-lg border bg-accent p-4">
                      <h4 className="mb-2 flex items-center gap-2 font-semibold text-accent-foreground">
                        <UserCheck className="h-4 w-4 text-primary" />
                        LinkedIn Benefits
                      </h4>
                      <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                        <li>Automatic profile picture & background sync</li>
                        <li>Company affiliation validation</li>
                        <li>Automatic profile validation</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Personal Information</CardTitle>
                    <Button
                      variant={isEditing ? "default" : "outline"}
                      onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : isEditing ? (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save
                        </>
                      ) : (
                        <>
                          <Settings className="mr-2 h-4 w-4" />
                          Edit
                        </>
                      )}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={profile.firstName}
                          onChange={(e) => setProfile((p) => ({ ...p, firstName: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={profile.lastName}
                          onChange={(e) => setProfile((p) => ({ ...p, lastName: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" type="email" value={profile.email} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="flex gap-2">
                          <Input
                            id="phone"
                            value={profile.phone}
                            onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                            disabled={!isEditing}
                          />
                          <Button variant="outline" size="sm" disabled={profile.isPhoneVerified}>
                            {profile.isPhoneVerified ? "Verified" : "Verify"}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-foreground">Company Information</h3>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="companyName">Company Name *</Label>
                          <Input
                            id="companyName"
                            value={profile.companyName}
                            onChange={(e) => setProfile((p) => ({ ...p, companyName: e.target.value }))}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="companyWebsite">Company Website</Label>
                          <Input
                            id="companyWebsite"
                            value={profile.companyWebsite}
                            onChange={(e) => setProfile((p) => ({ ...p, companyWebsite: e.target.value }))}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="jobTitle">Job Title</Label>
                          <Input
                            id="jobTitle"
                            value={profile.jobTitle}
                            onChange={(e) => setProfile((p) => ({ ...p, jobTitle: e.target.value }))}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="industry">Industry</Label>
                          <Select
                            value={profile.industry}
                            onValueChange={(v) => setProfile((p) => ({ ...p, industry: v }))}
                            disabled={!isEditing}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Technology">Technology</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="companySize">Company Size</Label>
                          <Select
                            value={profile.companySize}
                            onValueChange={(v) => setProfile((p) => ({ ...p, companySize: v }))}
                            disabled={!isEditing}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-10">1-10</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            value={profile.country}
                            onChange={(e) => setProfile((p) => ({ ...p, country: e.target.value }))}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="bio">Professional Bio</Label>
                          <Textarea
                            id="bio"
                            value={profile.bio}
                            onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                            disabled={!isEditing}
                            rows={4}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="team">
                <TeamManagement />
              </TabsContent>
              <TabsContent value="maturity">
                <Card>
                  <CardHeader>
                    <CardTitle>Maturity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Maturity analysis content goes here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="documents">
                <DocumentManager />
              </TabsContent>
              <TabsContent value="analytics">
                <SupersetDashboard />
              </TabsContent>
              <TabsContent value="services">
                <ServiceOfferings />
              </TabsContent>
              <TabsContent value="support">
                <Card>
                  <CardHeader>
                    <CardTitle>Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Support and FAQ content goes here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
