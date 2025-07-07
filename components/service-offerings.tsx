"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  Star,
  Zap,
  Crown,
  Rocket,
  Download,
  Calendar,
  MessageCircle,
  FileText,
  BarChart3,
  Users,
  Shield,
  Clock,
  Target,
  TrendingUp,
} from "lucide-react"

interface ServicePackage {
  id: string
  name: string
  description: string
  price: string
  originalPrice?: string
  icon: any
  color: string
  features: string[]
  limitations?: string[]
  popular?: boolean
  cta: string
  deliveryTime: string
}

export default function ServiceOfferings() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const packages: ServicePackage[] = [
    {
      id: "starter",
      name: "Starter Assessment",
      description: "Perfect for getting started with business intelligence",
      price: "Free",
      icon: FileText,
      color: "bg-gray-600",
      features: [
        "Basic business health assessment",
        "5-page executive summary report",
        "Key performance indicators analysis",
        "Basic recommendations",
        "Email delivery within 24 hours",
      ],
      limitations: ["Limited to basic metrics", "No custom analysis", "Standard template only"],
      cta: "Generate Free Report",
      deliveryTime: "24 hours",
    },
    {
      id: "professional",
      name: "Professional Analysis",
      description: "Comprehensive analysis for growing businesses",
      price: "€299",
      originalPrice: "€399",
      icon: BarChart3,
      color: "bg-blue-600",
      features: [
        "Comprehensive business analysis",
        "15-page detailed report",
        "Market positioning analysis",
        "Competitive intelligence",
        "Financial performance review",
        "Growth opportunity identification",
        "30-minute consultation call",
        "Priority email support",
      ],
      popular: true,
      cta: "Start Professional Analysis",
      deliveryTime: "3-5 business days",
    },
    {
      id: "enterprise",
      name: "Enterprise Intelligence",
      description: "Advanced analytics and strategic consulting",
      price: "€899",
      originalPrice: "€1,199",
      icon: Crown,
      color: "bg-purple-600",
      features: [
        "Full enterprise assessment",
        "30+ page strategic report",
        "Multi-department analysis",
        "Custom KPI dashboard",
        "Quarterly review sessions",
        "Dedicated account manager",
        "Team collaboration tools",
        "Advanced predictive analytics",
        "Implementation roadmap",
        "6-month follow-up support",
      ],
      cta: "Get Enterprise Solution",
      deliveryTime: "1-2 weeks",
    },
    {
      id: "custom",
      name: "Custom Solutions",
      description: "Tailored solutions for unique business needs",
      price: "Contact Us",
      icon: Rocket,
      color: "bg-gradient-to-r from-orange-500 to-red-500",
      features: [
        "Fully customized analysis",
        "Bespoke reporting format",
        "Industry-specific insights",
        "On-site consultation available",
        "Custom integration options",
        "Dedicated project team",
        "Flexible delivery timeline",
        "Ongoing partnership options",
      ],
      cta: "Discuss Custom Needs",
      deliveryTime: "Flexible",
    },
  ]

  const handleGenerateFreeReport = async () => {
    setIsGenerating(true)
    setSelectedPackage("starter")

    try {
      const response = await fetch("/api/generate-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageType: "starter",
          userId: "user123",
        }),
      })

      if (response.ok) {
        const result = await response.json()
        alert("Free report generation started! You will receive an email when it's ready.")
      } else {
        throw new Error("Failed to generate report")
      }
    } catch (error) {
      alert("Failed to generate report. Please try again.")
    } finally {
      setIsGenerating(false)
      setSelectedPackage(null)
    }
  }

  const handlePackageSelection = (packageId: string) => {
    if (packageId === "starter") {
      handleGenerateFreeReport()
    } else if (packageId === "custom") {
      window.open("https://cal.com/inomax-ai/consultation", "_blank")
    } else {
      // Redirect to payment or contact form
      alert(`Selected ${packageId} package. Redirecting to payment...`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Service Overview */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Business Intelligence Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Precise Analysis</h3>
              <p className="text-sm text-gray-300">Data-driven insights tailored to your business needs and industry</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Growth Focused</h3>
              <p className="text-sm text-gray-300">Actionable recommendations to accelerate your business growth</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Confidential</h3>
              <p className="text-sm text-gray-300">All analyses include signed NDA for complete data protection</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Star className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-300 mb-2">Why Choose INOMAX.ai?</h4>
                <ul className="text-sm text-blue-200 space-y-1">
                  <li>
                    • <strong>Swiss Quality:</strong> Precision and reliability in every analysis
                  </li>
                  <li>
                    • <strong>AI-Powered:</strong> Advanced algorithms for deeper insights
                  </li>
                  <li>
                    • <strong>Industry Expertise:</strong> Specialists across multiple sectors
                  </li>
                  <li>
                    • <strong>Proven Results:</strong> 500+ successful business transformations
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Packages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {packages.map((pkg) => (
          <Card
            key={pkg.id}
            className={`bg-gray-800 border-gray-700 relative ${
              pkg.popular ? "ring-2 ring-blue-500" : ""
            } hover:border-gray-600 transition-colors`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white border-blue-500 px-3 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}
            <CardHeader className="text-center">
              <div className={`w-16 h-16 ${pkg.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                <pkg.icon className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-white">{pkg.name}</CardTitle>
              <p className="text-sm text-gray-300">{pkg.description}</p>
              <div className="mt-4">
                <div className="text-3xl font-bold text-white">{pkg.price}</div>
                {pkg.originalPrice && <div className="text-sm text-gray-400 line-through">{pkg.originalPrice}</div>}
                <div className="flex items-center justify-center gap-1 mt-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  {pkg.deliveryTime}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {pkg.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {pkg.limitations && (
                <div className="space-y-2 pt-2 border-t border-gray-700">
                  <p className="text-xs text-gray-400 font-medium">Limitations:</p>
                  {pkg.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-4 h-4 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-gray-500 rounded-full mt-1"></div>
                      </div>
                      <span className="text-xs text-gray-400">{limitation}</span>
                    </div>
                  ))}
                </div>
              )}

              <Button
                onClick={() => handlePackageSelection(pkg.id)}
                disabled={isGenerating && selectedPackage === pkg.id}
                className={`w-full ${
                  pkg.id === "starter"
                    ? "bg-gray-600 hover:bg-gray-700"
                    : pkg.popular
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-purple-600 hover:bg-purple-700"
                } text-white`}
              >
                {isGenerating && selectedPackage === pkg.id ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    {pkg.id === "starter" && <Download className="w-4 h-4 mr-2" />}
                    {pkg.id === "custom" && <Calendar className="w-4 h-4 mr-2" />}
                    {pkg.id !== "starter" && pkg.id !== "custom" && <Zap className="w-4 h-4 mr-2" />}
                    {pkg.cta}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Services */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Additional Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Consultation Services</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="font-medium text-white">Strategy Session</p>
                      <p className="text-sm text-gray-300">60-minute consultation</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">€150</p>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white mt-1"
                      onClick={() => window.open("https://cal.com/inomax-ai/strategy", "_blank")}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="font-medium text-white">Team Workshop</p>
                      <p className="text-sm text-gray-300">Half-day team session</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">€500</p>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white mt-1"
                      onClick={() => window.open("https://cal.com/inomax-ai/workshop", "_blank")}
                    >
                      Schedule
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-white">Support Options</h4>
              <div className="space-y-3">
                <div className="p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-blue-400" />
                    <span className="font-medium text-white">Priority Support</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">24/7 priority email and chat support</p>
                  <p className="text-sm font-semibold text-blue-400">€99/month</p>
                </div>
                <div className="p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span className="font-medium text-white">Monthly Reviews</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">Regular business performance reviews</p>
                  <p className="text-sm font-semibold text-purple-400">€299/month</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Stories */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Success Stories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TS</span>
                </div>
                <div>
                  <p className="font-medium text-white">TechStart AG</p>
                  <p className="text-xs text-gray-400">SaaS Startup</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-3">
                "INOMAX.ai helped us identify key growth opportunities that led to a 40% revenue increase in 6 months."
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>+40% Revenue</span>
                <span>6 months</span>
              </div>
            </div>

            <div className="p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">MH</span>
                </div>
                <div>
                  <p className="font-medium text-white">MedHealth Solutions</p>
                  <p className="text-xs text-gray-400">Healthcare</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-3">
                "The comprehensive analysis revealed operational inefficiencies we never noticed. Saved us €200K
                annually."
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>€200K Saved</span>
                <span>Annual</span>
              </div>
            </div>

            <div className="p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FI</span>
                </div>
                <div>
                  <p className="font-medium text-white">FinanceInnovate</p>
                  <p className="text-xs text-gray-400">Fintech</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-3">
                "Strategic recommendations helped us secure Series A funding of €5M within 3 months of implementation."
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>€5M Funding</span>
                <span>3 months</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
