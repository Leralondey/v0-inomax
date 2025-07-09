"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  BarChart3,
  Target,
  Users,
  TrendingUp,
  Zap,
  CheckCircle,
  Star,
  ArrowRight,
  Mail,
  Phone,
  Globe,
  Radar,
  PieChart,
  DollarSign,
  Scale,
  Gavel,
  Truck,
  ShoppingCart,
  AlertTriangle,
  Handshake,
  Rocket,
  MessageCircle,
  Brain,
  Settings,
  Shield,
  Clock,
  FileText,
  Repeat,
  Building,
  Briefcase,
  Award,
} from "lucide-react"
import LiveChat from "@/components/live-chat"
import { useState } from "react"
import SignupModal from "@/components/signup-modal"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-900">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-50 dark:via-gray-100 dark:to-gray-50">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-gray-800 dark:bg-gray-200 text-blue-400 dark:text-blue-600 border-gray-700 dark:border-gray-300">
            AI-Powered Business Intelligence
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Discover Your True Business Potential and Attract Investors
          </h1>
          <p className="text-xl text-gray-300 dark:text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            INOMAX.ai delivers AI-powered self-evaluations designed to help startups, scaleups, and SMEs understand
            their company's current standing, full potential, and associated risks at any given moment.
          </p>
          <p className="text-lg text-gray-300 dark:text-gray-600 mb-8 max-w-3xl mx-auto">
            By combining intelligent assessment tools with expert analysis, we empower businesses to drive strategic
            growth, attract investors, secure financing, and significantly reduce the risk of failure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setIsSignupModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
            >
              Get Your Free Assessment Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 dark:border-gray-300 text-gray-300 dark:text-gray-600 hover:bg-gray-800 dark:hover:bg-gray-200 hover:text-white dark:hover:text-gray-900 bg-transparent"
            >
              Watch Demo
            </Button>
          </div>
          <div className="mt-12 text-sm text-gray-400 dark:text-gray-500">Trusted by 200+ Global Companies</div>
        </div>
      </section>

      {/* Why Choose INOMAX.ai */}
      <section className="py-16 bg-gray-800 dark:bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-white dark:text-gray-900">Why Choose INOMAX.ai?</h2>
            <p className="text-lg text-gray-300 dark:text-gray-600 mb-12">
              Our AI-powered platform delivers strategic insights that transform your business decision-making
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-700 dark:bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-blue-400 dark:text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white dark:text-gray-900">Fast & Effective</h3>
                <p className="text-gray-300 dark:text-gray-600">
                  Strategic insights delivered rapidly to accelerate your growth
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-700 dark:bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-purple-400 dark:text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white dark:text-gray-900">Virtual Board Member</h3>
                <p className="text-gray-300 dark:text-gray-600">
                  On-demand AI-powered guidance for strategic decisions anytime, anywhere
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-700 dark:bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-green-400 dark:text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white dark:text-gray-900">Data-driven Clarity</h3>
                <p className="text-gray-300 dark:text-gray-600">
                  Pinpoint exactly where to prioritize your efforts for maximum impact
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-700 dark:bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-blue-400 dark:text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white dark:text-gray-900">Actionable Recommendations</h3>
                <p className="text-gray-300 dark:text-gray-600">
                  Clear, customized next steps tailored to your business needs
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-700 dark:bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-purple-400 dark:text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white dark:text-gray-900">Trusted Methodology</h3>
                <p className="text-gray-300 dark:text-gray-600">
                  Developed with leading Swiss institutions like EPFL, supported by Innosuisse
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-700 dark:bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-400 dark:text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white dark:text-gray-900">Complete Confidentiality</h3>
                <p className="text-gray-300 dark:text-gray-600">
                  Evaluations accompanied by a signed NDA, ensuring data protection
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-16 bg-gray-900 dark:bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white dark:text-gray-900">Core Features</h2>
            <p className="text-lg text-gray-300 dark:text-gray-600 max-w-2xl mx-auto">
              AI-powered analytics combined with expert insights to deliver actionable recommendations, industry
              benchmarks, and customized growth strategies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200 hover:bg-gray-750 dark:hover:bg-gray-50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-gray-700 dark:bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Radar className="w-6 h-6 text-blue-400 dark:text-blue-600" />
                </div>
                <CardTitle className="text-white dark:text-gray-900">Spider Chart Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 dark:text-gray-600">
                  Evaluate your organization across 300+ metrics with our interactive radar chart assessment. Instantly
                  identify strengths and growth opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200 hover:bg-gray-750 dark:hover:bg-gray-50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-gray-700 dark:bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <PieChart className="w-6 h-6 text-purple-400 dark:text-purple-600" />
                </div>
                <CardTitle className="text-white dark:text-gray-900">Self-Evaluation Scoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 dark:text-gray-600">
                  Our data-driven scoring system analyzes your company's key performance metrics, uncovering strengths
                  and growth opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200 hover:bg-gray-750 dark:hover:bg-gray-50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-gray-700 dark:bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Handshake className="w-6 h-6 text-green-400 dark:text-green-600" />
                </div>
                <CardTitle className="text-white dark:text-gray-900">Human-AI Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 dark:text-gray-600">
                  Combines AI analytics with expert insights to deliver smarter, more contextual business decisions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Assessment Categories */}
      <section className="py-16 bg-gray-800 dark:bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white dark:text-gray-900">Assessment Categories</h2>
            <p className="text-lg text-gray-300 dark:text-gray-600">
              Comprehensive evaluation across all critical business dimensions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: DollarSign, title: "Finances", desc: "Capital management and revenue sustainability" },
              { icon: Users, title: "Team & HR", desc: "Workforce capabilities and organizational health" },
              { icon: Star, title: "Reputation", desc: "Brand strength and market credibility" },
              { icon: Scale, title: "Governance", desc: "Leadership oversight and decision framework" },
              { icon: ShoppingCart, title: "Operations", desc: "Sales effectiveness and operational efficiency" },
              { icon: Target, title: "Strategy", desc: "Market position and growth planning" },
              { icon: Gavel, title: "Legal", desc: "Regulatory compliance and risk controls" },
              { icon: Truck, title: "Suppliers", desc: "Supply chain management and vendor relations" },
              { icon: TrendingUp, title: "Market Fit", desc: "Value proposition and market alignment" },
              { icon: AlertTriangle, title: "Risk", desc: "Risk identification and mitigation planning" },
            ].map((category, index) => (
              <Card
                key={index}
                className="text-center bg-gray-700 dark:bg-white border-gray-600 dark:border-gray-200 hover:bg-gray-650 dark:hover:bg-gray-50 transition-colors"
              >
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 bg-gray-600 dark:bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <category.icon className="w-6 h-6 text-blue-400 dark:text-blue-600" />
                  </div>
                  <CardTitle className="text-sm text-white dark:text-gray-900">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-gray-300 dark:text-gray-600">{category.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Solutions */}
      <section id="solutions" className="py-16 bg-gray-900 dark:bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white dark:text-gray-900">Our Solutions</h2>
            <p className="text-lg text-gray-300 dark:text-gray-600 max-w-3xl mx-auto">
              Comprehensive business evaluation tools designed to drive growth and attract investment
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200 hover:bg-gray-750 dark:hover:bg-gray-50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-gray-700 dark:bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-blue-400 dark:text-blue-600" />
                </div>
                <CardTitle className="text-white dark:text-gray-900">Customized Evaluations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 dark:text-gray-600">
                  Tailored assessments for every business stage—from startups to SMEs, providing insights specific to
                  your unique challenges and opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200 hover:bg-gray-750 dark:hover:bg-gray-50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-gray-700 dark:bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Repeat className="w-6 h-6 text-purple-400 dark:text-purple-600" />
                </div>
                <CardTitle className="text-white dark:text-gray-900">Continuous Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 dark:text-gray-600">
                  Regular progress tracking to refine your strategy consistently, ensuring your business stays on the
                  optimal growth trajectory.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200 hover:bg-gray-750 dark:hover:bg-gray-50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-gray-700 dark:bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-green-400 dark:text-green-600" />
                </div>
                <CardTitle className="text-white dark:text-gray-900">Investor-Ready Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 dark:text-gray-600">
                  Professional, clear reports ideal for investor presentations, due diligence, and strategic planning
                  that highlight your business's true potential.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ideal For */}
      <section className="py-16 bg-gray-800 dark:bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white dark:text-gray-900">Ideal For</h2>
            <p className="text-lg text-gray-300 dark:text-gray-600 max-w-3xl mx-auto">
              Our solutions are designed to meet the needs of various stakeholders in the business ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Rocket,
                title: "Startups",
                desc: "Seeking clear fundraising, market-entry strategies, and ongoing evaluations to continuously monitor progress and evolution.",
              },
              {
                icon: Building,
                title: "Banks",
                desc: "Aiming to finance the right companies with precision and confidence based on comprehensive data-driven insights.",
              },
              {
                icon: TrendingUp,
                title: "SMEs",
                desc: "Aiming for structured growth, strategic pivots, turnaround success, or finding financing for growth initiatives.",
              },
              {
                icon: Briefcase,
                title: "Consultants",
                desc: "Requiring rapid, accurate business diagnostics to provide value-added services to their clients.",
              },
              {
                icon: DollarSign,
                title: "Investors & VCs",
                desc: "Seeking to deeply understand businesses before investing, with comprehensive risk and opportunity analysis.",
              },
              {
                icon: Zap,
                title: "Accelerators",
                desc: "Benchmarking and tracking their portfolios to optimize program effectiveness and startup success rates.",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-gray-700 dark:bg-white border-gray-600 dark:border-gray-200 hover:bg-gray-650 dark:hover:bg-gray-50 transition-colors"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gray-600 dark:bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-blue-400 dark:text-blue-600" />
                  </div>
                  <CardTitle className="text-white dark:text-gray-900">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 dark:text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Transformation & AI Integration */}
      <section className="py-16 bg-gray-900 dark:bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
              Specialized Expertise
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-white dark:text-gray-900">
              Digital Transformation & AI Integration
            </h2>
            <p className="text-lg text-gray-300 dark:text-gray-600 max-w-3xl mx-auto">
              Complete guidance in your digital transformation with strategic AI integration to optimize processes,
              improve competitiveness, and prepare your business for the future.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white dark:text-gray-900">Our Integrated Approach</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-700 dark:bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-blue-400 dark:text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-white dark:text-gray-900">Complete Digital Audit</h4>
                    <p className="text-gray-300 dark:text-gray-600">
                      In-depth assessment of your current digital maturity and identification of improvement
                      opportunities
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-700 dark:bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="w-6 h-6 text-purple-400 dark:text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-white dark:text-gray-900">Personalized AI Strategy</h4>
                    <p className="text-gray-300 dark:text-gray-600">
                      Development of an AI roadmap tailored to your specific needs and industry sector
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-700 dark:bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Settings className="w-6 h-6 text-green-400 dark:text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-white dark:text-gray-900">Guided Implementation</h4>
                    <p className="text-gray-300 dark:text-gray-600">
                      Step-by-step support in implementing digital and AI solutions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-700 dark:bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-orange-400 dark:text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-white dark:text-gray-900">Training & Change Management</h4>
                    <p className="text-gray-300 dark:text-gray-600">
                      Team training and change management for successful adoption of new technologies
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 dark:bg-white rounded-2xl p-8 border border-gray-700 dark:border-gray-200">
              <h3 className="text-xl font-bold mb-6 text-center text-white dark:text-gray-900">
                AI Application Domains
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🤖", title: "Process Automation", desc: "RPA & Intelligent Workflows" },
                  { icon: "📊", title: "Predictive Analytics", desc: "Advanced Business Intelligence" },
                  { icon: "💬", title: "Chatbots & Assistants", desc: "Automated Customer Service" },
                  { icon: "🔍", title: "Computer Vision", desc: "Image & Video Analysis" },
                  { icon: "📝", title: "Language Processing", desc: "NLP & Content Generation" },
                  { icon: "🎯", title: "Personalization", desc: "Custom Customer Experience" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="text-center p-4 rounded-lg bg-gray-700 dark:bg-gray-50 hover:bg-gray-600 dark:hover:bg-gray-100 transition-colors"
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h4 className="font-semibold text-sm mb-1 text-white dark:text-gray-900">{item.title}</h4>
                    <p className="text-xs text-gray-300 dark:text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
            >
              Start Your AI Transformation
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 bg-gray-800 dark:bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white dark:text-gray-900">💼 Service Packages</h2>
            <p className="text-lg text-gray-300 dark:text-gray-600">
              Choose the perfect plan for your business growth journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200 hover:border-gray-600 dark:hover:border-gray-300 transition-colors h-full flex flex-col">
              <CardHeader className="pb-2">
                <div className="text-3xl mb-2 text-center">🟢</div>
                <CardTitle className="text-center text-white dark:text-gray-900">Starter</CardTitle>
                <div className="text-center">
                  <span className="text-3xl font-bold text-white dark:text-gray-900">Free</span>
                </div>
                <div className="text-center mt-2">
                  <span className="text-lg text-green-400 dark:text-green-600">
                    🔍 Get started with a quick self-assessment
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <ul className="text-gray-300 dark:text-gray-600 mb-6 space-y-2 flex-grow">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 dark:text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Access to the full business questionnaire</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 dark:text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>General assessment with strategic analysis and recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 dark:text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Instant performance score</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 dark:text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Downloadable basic report</span>
                  </li>
                </ul>
                <Button
                  onClick={() => setIsSignupModalOpen(true)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white border-0 mt-auto"
                >
                  👉 Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 dark:bg-white border-blue-500 relative h-full flex flex-col">
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white border-0">
                Popular
              </Badge>
              <CardHeader className="pb-2">
                <div className="text-3xl mb-2 text-center">🔵</div>
                <CardTitle className="text-center text-white dark:text-gray-900">Advanced</CardTitle>
                <div className="text-center">
                  <span className="text-3xl font-bold text-white dark:text-gray-900">CHF 800.-</span>
                </div>
                <div className="text-center mt-2">
                  <span className="text-lg text-blue-400 dark:text-blue-600">
                    📊 Expert review & actionable insights
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <ul className="text-gray-300 dark:text-gray-600 mb-6 space-y-2 flex-grow">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-400 dark:text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Detailed analysis by our business experts</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-400 dark:text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Tailored recommendations across 10 business dimensions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-400 dark:text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Visual dashboard & PDF report</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-400 dark:text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>60-minute expert session included</span>
                  </li>
                </ul>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white border-0 mt-auto">
                  👉 Choose Plan
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200 hover:border-gray-600 dark:hover:border-gray-300 transition-colors h-full flex flex-col">
              <CardHeader className="pb-2">
                <div className="text-3xl mb-2 text-center">🟠</div>
                <CardTitle className="text-center text-white dark:text-gray-900">Professional</CardTitle>
                <div className="text-center">
                  <span className="text-3xl font-bold text-white dark:text-gray-900">CHF 5000.-</span>
                </div>
                <div className="text-center mt-2">
                  <span className="text-lg text-orange-400 dark:text-orange-600">
                    📈 Strategic growth planning & benchmarking
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <ul className="text-gray-300 dark:text-gray-600 mb-6 space-y-2 flex-grow">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-400 dark:text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Full business valuation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-400 dark:text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Market & competitor analysis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-400 dark:text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Scoring vs. industry benchmarks</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-400 dark:text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>90-minute strategy session</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-400 dark:text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Optional: investor-ready presentation</span>
                  </li>
                </ul>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white border-0 mt-auto">
                  👉 Choose Plan
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200 hover:border-gray-600 dark:hover:border-gray-300 transition-colors h-full flex flex-col">
              <CardHeader className="pb-2">
                <div className="text-3xl mb-2 text-center">🔴</div>
                <CardTitle className="text-center text-white dark:text-gray-900">Executive</CardTitle>
                <div className="text-center">
                  <span className="text-2xl font-bold text-white dark:text-gray-900">CHF 800.-</span>
                  <div className="text-sm text-gray-400 dark:text-gray-500">+ CHF 400/hour</div>
                </div>
                <div className="text-center mt-2">
                  <span className="text-lg text-red-400 dark:text-red-600">
                    🚀 Premium consulting for scalable transformation
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <ul className="text-gray-300 dark:text-gray-600 mb-6 space-y-2 flex-grow">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-red-400 dark:text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>White-label platform access</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-red-400 dark:text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>AI maturity audit & digital roadmap</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-red-400 dark:text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Dedicated advisor for strategic planning</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-red-400 dark:text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Custom assessments & onboarding workshops</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-red-400 dark:text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Ideal for accelerators, VC funds, or consulting firms</span>
                  </li>
                </ul>
                <Button
                  onClick={() => window.open("https://cal.com/inomax-ai/executive-consultation", "_blank")}
                  className="w-full bg-red-500 hover:bg-red-600 text-white border-0 mt-auto"
                >
                  📅 Book a Consultation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How to Get Started */}
      <section className="py-16 bg-gray-900 dark:bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white dark:text-gray-900">
              Start your Strategic Transformation Today
            </h2>
            <p className="text-lg text-gray-300 dark:text-gray-600">
              Join over 200 businesses already leveraging INOMAX.ai
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Visit", desc: "Access inomax.ai", icon: Globe },
              { step: "2", title: "Sign Up", desc: "Create your account with basic business details", icon: Users },
              { step: "3", title: "Select Package", desc: "Choose your preferred service tier", icon: CheckCircle },
              {
                step: "4",
                title: "Start Evaluation",
                desc: "Complete the business assessment questionnaire",
                icon: BarChart3,
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white dark:text-gray-900">{item.title}</h3>
                <p className="text-gray-300 dark:text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
            >
              Get Your Free Assessment Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-800 dark:bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white dark:text-gray-900">Meet the Founder</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FfQUcryhle23gNfqLpWHhJMl2nk7sP.png"
                      alt="Selim Dusi - Founder of Inomax.ai"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-2 text-white dark:text-gray-900">Selim DUSI</h3>
                    <p className="text-lg text-blue-400 dark:text-blue-600 mb-4">
                      Award-winning Entrepreneur | Investor | Strategic Mentor
                    </p>
                    <p className="text-gray-300 dark:text-gray-600 mb-4">
                      Selim Dusi brings over 35 years of expertise in entrepreneurship, corporate governance, and
                      strategic investments. He has founded and led multiple successful ventures, served as an active
                      board member in fintech, AI, and healthcare startups, and received the prestigious Top Mentor
                      Award from MassChallenge.
                    </p>
                    <p className="text-gray-300 dark:text-gray-600 mb-6">
                      Driven by innovation, strategic clarity, and deep market insights, Selim, together with his
                      experienced colleagues, created INOMAX.ai to empower businesses to reach their fullest potential
                      and achieve sustainable success.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex items-center gap-2 text-gray-300 dark:text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>info@inomax.ai</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300 dark:text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>+41 79 705 70 37</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Ready to Transform Your Business?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto text-white">
              Our team is ready to help with any questions. We respond within minutes during business hours.
            </p>
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 border-0">
                <MessageCircle className="mr-2 w-4 h-4" />
                Chat with us
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Schedule a Call
              </Button>
            </div>
            <p className="opacity-75 text-white">Alternatively, email us at info@inomax.ai</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black dark:bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">INOMAX.ai</span>
              </div>
              <p className="text-gray-400 dark:text-gray-300">
                Transform, Scale, Thrive with AI-powered business evaluations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Platform</h4>
              <ul className="space-y-2 text-gray-400 dark:text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-gray-400 dark:text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-gray-400 dark:text-gray-300">
                <li>
                  <a href="/help-center" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-800 dark:bg-gray-700" />
          <div className="text-center text-gray-400 dark:text-gray-300">
            <p>&copy; 2024 INOMAX.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Live Chat */}
      <LiveChat />

      {/* Signup Modal */}
      <SignupModal isOpen={isSignupModalOpen} onClose={() => setIsSignupModalOpen(false)} />
    </div>
  )
}
