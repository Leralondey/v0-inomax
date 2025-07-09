"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  BarChart3,
  Search,
  BookOpen,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  Users,
  Settings,
  CreditCard,
  Shield,
  HelpCircle,
  ChevronRight,
  Star,
  Clock,
  CheckCircle,
} from "lucide-react"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import LiveChat from "@/components/live-chat"

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Learn the basics of INOMAX.ai",
      articles: 12,
      color: "blue",
    },
    {
      icon: Users,
      title: "Account Management",
      description: "Manage your profile and settings",
      articles: 8,
      color: "green",
    },
    {
      icon: CreditCard,
      title: "Billing & Pricing",
      description: "Payment, plans, and invoicing",
      articles: 6,
      color: "purple",
    },
    {
      icon: Settings,
      title: "Platform Features",
      description: "Detailed feature explanations",
      articles: 15,
      color: "orange",
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      description: "Data protection and compliance",
      articles: 5,
      color: "red",
    },
    {
      icon: FileText,
      title: "Reports & Analytics",
      description: "Understanding your results",
      articles: 10,
      color: "indigo",
    },
  ]

  const popularArticles = [
    {
      title: "How to complete your first business assessment",
      category: "Getting Started",
      readTime: "5 min read",
      views: "2.1k views",
    },
    {
      title: "Understanding your business evaluation score",
      category: "Reports & Analytics",
      readTime: "8 min read",
      views: "1.8k views",
    },
    {
      title: "Setting up your company profile",
      category: "Account Management",
      readTime: "3 min read",
      views: "1.5k views",
    },
    {
      title: "Upgrading to a paid plan",
      category: "Billing & Pricing",
      readTime: "4 min read",
      views: "1.2k views",
    },
    {
      title: "Data security and confidentiality",
      category: "Security & Privacy",
      readTime: "6 min read",
      views: "980 views",
    },
  ]

  const faqs = [
    {
      question: "How accurate are the AI-powered assessments?",
      answer:
        "Our assessments combine AI analytics with expert human review, achieving over 95% accuracy. The system is continuously trained on thousands of business cases and validated by industry experts.",
    },
    {
      question: "Can I use INOMAX.ai for multiple companies?",
      answer:
        "Yes, you can manage multiple company profiles under one account. Each company gets its own separate assessment and dashboard.",
    },
    {
      question: "How long does it take to complete an assessment?",
      answer:
        "The initial questionnaire takes 15-30 minutes to complete. Results are available immediately for the free tier, while expert-reviewed assessments are delivered within 48-72 hours.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Currently, INOMAX.ai is optimized for web browsers on all devices. A dedicated mobile app is planned for release in Q2 2024.",
    },
    {
      question: "What happens to my data if I cancel my subscription?",
      answer:
        "Your data remains accessible for 90 days after cancellation. You can export all reports and data during this period. After 90 days, data is permanently deleted as per our privacy policy.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-900">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-50 dark:via-gray-100 dark:to-gray-50">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-gray-800 dark:bg-gray-200 text-blue-400 dark:text-blue-600 border-gray-700 dark:border-gray-300">
            Help Center
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            How can we help you?
          </h1>
          <p className="text-xl text-gray-300 dark:text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Find answers to your questions, learn how to use INOMAX.ai effectively, and get the support you need to
            transform your business.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for articles, guides, and FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-300 text-white dark:text-gray-900 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gray-800 dark:bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gray-700 dark:bg-white border-gray-600 dark:border-gray-200 hover:bg-gray-650 dark:hover:bg-gray-50 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white dark:text-gray-900">Live Chat</h3>
                <p className="text-gray-300 dark:text-gray-600 mb-4">Get instant help from our support team</p>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white border-0">Start Chat</Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-700 dark:bg-white border-gray-600 dark:border-gray-200 hover:bg-gray-650 dark:hover:bg-gray-50 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white dark:text-gray-900">Email Support</h3>
                <p className="text-gray-300 dark:text-gray-600 mb-4">Send us a detailed message</p>
                <Button
                  variant="outline"
                  className="border-gray-500 dark:border-gray-300 text-gray-300 dark:text-gray-600 hover:bg-gray-600 dark:hover:bg-gray-200 hover:text-white dark:hover:text-gray-900 bg-transparent"
                >
                  <a href="mailto:info@inomax.ai">Contact Us</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-700 dark:bg-white border-gray-600 dark:border-gray-200 hover:bg-gray-650 dark:hover:bg-gray-50 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white dark:text-gray-900">Phone Support</h3>
                <p className="text-gray-300 dark:text-gray-600 mb-4">Speak with our experts directly</p>
                <Button
                  variant="outline"
                  className="border-gray-500 dark:border-gray-300 text-gray-300 dark:text-gray-600 hover:bg-gray-600 dark:hover:bg-gray-200 hover:text-white dark:hover:text-gray-900 bg-transparent"
                >
                  <a href="tel:+41797057037">Call Now</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-900 dark:bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white dark:text-gray-900">Browse by Category</h2>
            <p className="text-lg text-gray-300 dark:text-gray-600">Find the information you need organized by topic</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200 hover:bg-gray-750 dark:hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 bg-${category.color}-500 rounded-lg flex items-center justify-center flex-shrink-0`}
                    >
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white dark:text-gray-900">{category.title}</h3>
                        <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-white dark:group-hover:text-gray-900 transition-colors" />
                      </div>
                      <p className="text-gray-300 dark:text-gray-600 mb-3">{category.description}</p>
                      <div className="text-sm text-gray-400 dark:text-gray-500">{category.articles} articles</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 bg-gray-800 dark:bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white dark:text-gray-900">Popular Articles</h2>
            <p className="text-lg text-gray-300 dark:text-gray-600">Most viewed articles by our community</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {popularArticles.map((article, index) => (
              <Card
                key={index}
                className="bg-gray-700 dark:bg-white border-gray-600 dark:border-gray-200 hover:bg-gray-650 dark:hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <Badge
                          variant="secondary"
                          className="bg-gray-600 dark:bg-gray-200 text-gray-300 dark:text-gray-600"
                        >
                          {article.category}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-white dark:text-gray-900 group-hover:text-blue-400 dark:group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400 dark:text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </div>
                        <div>{article.views}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-white dark:group-hover:text-gray-900 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-900 dark:bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white dark:text-gray-900">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-300 dark:text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3 text-white dark:text-gray-900">
                    <HelpCircle className="w-5 h-5 text-blue-400 dark:text-blue-600 mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 dark:text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300 dark:text-gray-600">{faq.answer}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Still need help?</h2>
          <p className="text-xl opacity-90 mb-8 text-white">
            Our support team is here to help you succeed with INOMAX.ai
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 border-0">
              <MessageCircle className="mr-2 w-4 h-4" />
              Contact Support
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              Schedule a Call
            </Button>
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
                  <a href="/#features" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="/#pricing" className="hover:text-white transition-colors">
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
                  <a href="/#about" className="hover:text-white transition-colors">
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
    </div>
  )
}
