"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Plus,
  Mail,
  UserPlus,
  Building,
  Crown,
  Code,
  DollarSign,
  Megaphone,
  ShoppingCart,
  Headphones,
  Settings,
  Briefcase,
  CheckCircle,
  Clock,
  AlertCircle,
  Trash2,
  Eye,
  TrendingUp,
  Target,
  Lightbulb,
  Network,
} from "lucide-react"

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: "active" | "invited" | "pending"
  invitedAt: string
  joinedAt?: string
}

const roleIcons = {
  CEO: Crown,
  CTO: Code,
  CFO: DollarSign,
  COO: Settings,
  CMO: Megaphone,
  "VP Sales": ShoppingCart,
  "VP Engineering": Code,
  "VP Finance": DollarSign,
  "VP Marketing": Megaphone,
  "Head of Product": Briefcase,
  "Head of HR": Users,
  "Customer Success": Headphones,
}

const departments = [
  "Executive",
  "Technology",
  "Finance",
  "Marketing",
  "Sales",
  "Operations",
  "Human Resources",
  "Customer Success",
  "Product",
  "Other",
]

const roles = [
  "CEO",
  "CTO",
  "CFO",
  "COO",
  "CMO",
  "VP Sales",
  "VP Engineering",
  "VP Finance",
  "VP Marketing",
  "Head of Product",
  "Head of HR",
  "Customer Success",
  "Senior Manager",
  "Manager",
  "Team Lead",
  "Senior Developer",
  "Developer",
  "Analyst",
  "Specialist",
  "Coordinator",
  "Other",
]

export default function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@company.com",
      role: "CEO",
      department: "Executive",
      status: "active",
      invitedAt: "2024-01-15",
      joinedAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "CTO",
      department: "Technology",
      status: "active",
      invitedAt: "2024-01-20",
      joinedAt: "2024-01-22",
    },
    {
      id: "3",
      name: "Mike Chen",
      email: "mike.chen@company.com",
      role: "CFO",
      department: "Finance",
      status: "invited",
      invitedAt: "2024-01-25",
    },
  ])

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [inviteForm, setInviteForm] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
  })

  const handleInvite = async () => {
    if (!inviteForm.name || !inviteForm.email || !inviteForm.role || !inviteForm.department) {
      return
    }

    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: inviteForm.name,
      email: inviteForm.email,
      role: inviteForm.role,
      department: inviteForm.department,
      status: "pending",
      invitedAt: new Date().toISOString().split("T")[0],
    }

    setTeamMembers((prev) => [...prev, newMember])
    setInviteForm({ name: "", email: "", role: "", department: "" })
    setIsInviteModalOpen(false)

    // Simulate sending invitation email
    console.log("Invitation sent to:", inviteForm.email)
  }

  const handleRemoveMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== id))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "invited":
        return <Clock className="w-4 h-4 text-yellow-400" />
      case "pending":
        return <AlertCircle className="w-4 h-4 text-orange-400" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600 text-white border-green-500">Active</Badge>
      case "invited":
        return <Badge className="bg-yellow-600 text-white border-yellow-500">Invited</Badge>
      case "pending":
        return <Badge className="bg-orange-600 text-white border-orange-500">Pending</Badge>
      default:
        return null
    }
  }

  const groupedMembers = teamMembers.reduce(
    (acc, member) => {
      if (!acc[member.department]) {
        acc[member.department] = []
      }
      acc[member.department].push(member)
      return acc
    },
    {} as Record<string, TeamMember[]>,
  )

  const activeMembers = teamMembers.filter((m) => m.status === "active").length
  const pendingInvites = teamMembers.filter((m) => m.status !== "active").length

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{teamMembers.length}</p>
                <p className="text-sm text-gray-400">Total Members</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{activeMembers}</p>
                <p className="text-sm text-gray-400">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{pendingInvites}</p>
                <p className="text-sm text-gray-400">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{Object.keys(groupedMembers).length}</p>
                <p className="text-sm text-gray-400">Departments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Benefits Section */}
      <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Avantages de l'Approche Collaborative
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Analyse Multi-Perspective à 360°</h4>
                  <p className="text-sm text-gray-300">
                    Chaque fonction apporte sa vision unique, permettant une évaluation complète de votre maturité
                    organisationnelle.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Recommandations Spécifiques par Fonction</h4>
                  <p className="text-sm text-gray-300">
                    Obtenez des conseils personnalisés pour chaque département basés sur leur rôle et responsabilités.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Network className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Identification des Synergies</h4>
                  <p className="text-sm text-gray-300">
                    Découvrez les opportunités de collaboration inter-départements et optimisez vos processus.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Rapports Valorisés</h4>
                  <p className="text-sm text-gray-300">
                    Plus votre équipe est complète, plus nos analyses sont précises et nos recommandations pertinentes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invite Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Organigramme de l'Équipe</h2>
          <p className="text-gray-400">Gérez votre équipe et leurs rôles pour des analyses plus précises</p>
        </div>
        <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <UserPlus className="w-4 h-4 mr-2" />
              Inviter un Collègue
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Inviter un Membre de l'Équipe</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">
                  Nom Complet *
                </Label>
                <Input
                  id="name"
                  value={inviteForm.name}
                  onChange={(e) => setInviteForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Marie Dupont"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email Professionnel *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="marie.dupont@company.com"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-300">
                  Fonction/Rôle *
                </Label>
                <Select
                  value={inviteForm.role}
                  onValueChange={(value) => setInviteForm((prev) => ({ ...prev, role: value }))}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Sélectionner une fonction" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department" className="text-gray-300">
                  Département *
                </Label>
                <Select
                  value={inviteForm.department}
                  onValueChange={(value) => setInviteForm((prev) => ({ ...prev, department: value }))}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Sélectionner un département" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-900/50 border border-blue-700 rounded-lg p-3">
                <p className="text-sm text-blue-200">
                  <strong>Important:</strong> La fonction de votre collègue est cruciale pour générer des analyses
                  croisées et des recommandations personnalisées par département.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleInvite}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={!inviteForm.name || !inviteForm.email || !inviteForm.role || !inviteForm.department}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Envoyer l'Invitation
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                >
                  Annuler
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Team Organization Chart */}
      <div className="space-y-6">
        {Object.entries(groupedMembers).map(([department, members]) => (
          <Card key={department} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building className="w-5 h-5" />
                {department}
                <Badge variant="outline" className="ml-auto text-gray-300 border-gray-600">
                  {members.length} membre{members.length > 1 ? "s" : ""}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {members.map((member) => {
                  const RoleIcon = roleIcons[member.role as keyof typeof roleIcons] || Users
                  return (
                    <div
                      key={member.id}
                      className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <RoleIcon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">{member.name}</h4>
                            <p className="text-sm text-gray-300">{member.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(member.status)}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveMember(member.id)}
                            className="text-gray-400 hover:text-red-400 hover:bg-red-900/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{member.email}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          {getStatusBadge(member.status)}
                          <span className="text-xs text-gray-400">
                            Invité le {new Date(member.invitedAt).toLocaleDateString("fr-FR")}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {teamMembers.length === 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-12 text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Aucun membre d'équipe</h3>
            <p className="text-gray-400 mb-6">
              Commencez à constituer votre équipe pour bénéficier d'analyses plus complètes et personnalisées.
            </p>
            <Button onClick={() => setIsInviteModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Inviter votre premier collègue
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {teamMembers.length > 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Recommandations d'Équipe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!teamMembers.some((m) => m.role.includes("CTO") || m.role.includes("Technology")) && (
                <div className="flex items-start gap-3 p-3 bg-blue-900/30 border border-blue-700 rounded-lg">
                  <Code className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white">Responsable Technique Recommandé</h4>
                    <p className="text-sm text-gray-300">
                      Ajoutez un CTO ou responsable technique pour des analyses technologiques approfondies.
                    </p>
                  </div>
                </div>
              )}

              {!teamMembers.some((m) => m.role.includes("CFO") || m.role.includes("Finance")) && (
                <div className="flex items-start gap-3 p-3 bg-green-900/30 border border-green-700 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white">Responsable Financier Recommandé</h4>
                    <p className="text-sm text-gray-300">
                      Incluez un CFO ou responsable financier pour optimiser vos analyses économiques.
                    </p>
                  </div>
                </div>
              )}

              {!teamMembers.some((m) => m.role.includes("Marketing") || m.role.includes("CMO")) && (
                <div className="flex items-start gap-3 p-3 bg-purple-900/30 border border-purple-700 rounded-lg">
                  <Megaphone className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white">Responsable Marketing Recommandé</h4>
                    <p className="text-sm text-gray-300">
                      Ajoutez un responsable marketing pour des insights sur votre stratégie commerciale.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
