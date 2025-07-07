"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Check,
  Star,
  Crown,
  Shield,
  Clock,
  Users,
  FileText,
  BarChart3,
  MessageCircle,
  Calendar,
  ArrowRight,
} from "lucide-react"
import { useState } from "react"

interface ServicePackage {
  id: string
  name: string
  price: string
  period: string
  description: string
  features: string[]
  popular?: boolean
  premium?: boolean
  icon: any
  color: string
  buttonText: string
  buttonAction: () => void
}

export default function ServiceOfferings() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  const packages: ServicePackage[] = [
    {
      id: "starter",
      name: "Starter Assessment",
      price: "Free",
      period: "",
      description: "Get started with a basic business evaluation and personalized recommendations.",
      features: [
        "Basic business assessment questionnaire",
        "Automated report generation (PDF)",
        "Email delivery within 5 minutes",
        "Basic scoring across 5 key areas",
        "General improvement recommendations",
        "Valid for 30 days",
      ],
      icon: FileText,
      color: "border-gray-600 bg-gray-800",
      buttonText: "Generate Free Report",
      buttonAction: () => generateFreeReport(),
    },
    {
      id: "professional",
      name: "Professional Analysis",
      price: "€2,500",
      period: "per assessment",
      description: "Comprehensive business analysis with expert consultation and detailed action plan.",
      features: [
        "In-depth business evaluation (50+ metrics)",
        "Expert analyst review and consultation",
        "Detailed 25-page professional report",
        "Industry benchmarking and comparison",
        "Personalized action plan with timelines",
        "1-hour consultation call with expert",
        "Follow-up support for 3 months",
        "NDA and confidentiality guarantee",
      ],
      popular: true,
      icon: BarChart3,
      color: "border-blue-500 bg-blue-900/20",
      buttonText: "Book Professional Analysis",
      buttonAction: () => bookConsultation("professional"),
    },
    {
      id: "enterprise",
      name: "Enterprise Solution",
      price: "€7,500",
      period: "per engagement",
      description: "Complete business transformation package with ongoing support and implementation guidance.",
      features: [
        "Full enterprise assessment (100+ metrics)",
        "Dedicated senior consultant assignment",
        "Comprehensive 50-page strategic report",
        "Market analysis and competitive intelligence",
        "Implementation roadmap with milestones",
        "Monthly progress reviews (6 months)",
        "Team training and workshops",
        "Priority support and direct access",
        "Custom dashboard and analytics",
        "Quarterly business health checks",
      ],
      premium: true,
      icon: Crown,
      color: "border-purple-500 bg-purple-900/20",
      buttonText: "Contact Enterprise Sales",
      buttonAction: () => contactEnterprise(),
    },
  ]

  const generateFreeReport = async () => {
    try {
      const response = await fetch("/api/generate-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "starter" }),
      })

      if (response.ok) {
        // Show success message
        alert("Your free report is being generated and will be sent to your email within 5 minutes!")
      }
    } catch (error) {
      console.error("Failed to generate report:", error)
    }
  }

  const bookConsultation = (packageType: string) => {
    window.open(`https://cal.com/inomax-ai/consultation?package=${packageType}`, "_blank")
  }

  const contactEnterprise = () => {
    window.location.href = "mailto:enterprise@inomax.ai?subject=Enterprise Solution Inquiry"
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Choose Your Business Assessment Package</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          From free basic assessments to comprehensive enterprise solutions, we have the right package to help your
          business grow and succeed.
        </p>
      </div>

      {/* Service Packages */}
      <div className="grid lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <Card
            key={pkg.id}
            className={`relative ${pkg.color} transition-all duration-300 hover:scale-105 ${
              selectedPackage === pkg.id ? "ring-2 ring-blue-500" : ""
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white border-blue-500 px-4 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}
            {pkg.premium && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-600 text-white border-purple-500 px-4 py-1">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
                <pkg.icon className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl text-white">{pkg.name}</CardTitle>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-white">
                  {pkg.price}
                  {pkg.period && <span className="text-lg font-normal text-gray-400"> {pkg.period}</span>}
                </div>
              </div>
              <p className="text-sm text-gray-300">{pkg.description}</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Separator className="bg-gray-700" />

              <Button
                onClick={pkg.buttonAction}
                className={`w-full ${
                  pkg.id === "starter"
                    ? "bg-gray-600 hover:bg-gray-700 text-white"
                    : pkg.id === "professional"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {pkg.buttonText}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Services */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Additional Services & Support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white">NDA Protection</h4>
              <p className="text-sm text-gray-300">
                All evaluations are protected by signed NDAs ensuring complete confidentiality.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white">Fast Delivery</h4>
              <p className="text-sm text-gray-300">
                Free reports in 5 minutes, professional analyses within 5 business days.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white">Expert Team</h4>
              <p className="text-sm text-gray-300">Our analysts have 15+ years of experience in business consulting.</p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white">Ongoing Support</h4>
              <p className="text-sm text-gray-300">Follow-up support and guidance to help implement recommendations.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">What Our Clients Say</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-gray-300 italic">
                "The professional analysis helped us identify key areas for improvement and provided a clear roadmap for
                growth. We've seen a 25% increase in efficiency since implementing their recommendations."
              </blockquote>
              <div className="text-sm text-gray-400">
                <strong className="text-white">Sarah Chen</strong> - CEO, TechStart Solutions
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-gray-300 italic">
                "The enterprise solution transformed our business operations. The ongoing support and quarterly reviews
                keep us on track and continuously improving."
              </blockquote>
              <div className="text-sm text-gray-400">
                <strong className="text-white">Marcus Weber</strong> - Founder, InnovateCorp
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact CTA */}
      <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-700">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Need a Custom Solution?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Every business is unique. If our standard packages don't fit your specific needs, let's discuss a custom
            solution tailored to your requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => bookConsultation("custom")} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Calendar className="mr-2 w-4 h-4" />
              Schedule Free Consultation
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "mailto:hello@inomax.ai")}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <MessageCircle className="mr-2 w-4 h-4" />
              Contact Us Directly
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
