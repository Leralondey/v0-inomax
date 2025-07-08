"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  BarChart3,
  Search,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  HelpCircle,
  Shield,
  Settings,
  CreditCard,
  Zap,
  ArrowRight,
} from "lucide-react"
import { useState } from "react"
import LiveChat from "@/components/live-chat"

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [supportForm, setSupportForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "medium",
  })

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle support form submission
    console.log("Support request submitted:", supportForm)
    // Reset form
    setSupportForm({
      name: "",
      email: "",
      subject: "",
      message: "",
      priority: "medium",
    })
  }

  const faqCategories = [
    {
      title: "Getting Started",
      icon: Zap,
      questions: [
        {
          question: "How do I create my first business assessment?",
          answer:
            "To create your first assessment, sign up for a free account, complete your business profile, and then access our comprehensive questionnaire. The assessment covers 10 key business dimensions and takes approximately 15-20 minutes to complete.",
        },
        {
          question: "What information do I need to prepare before starting?",
          answer:
            "Before starting your assessment, gather information about your business finances, team structure, market position, operational processes, and strategic goals. Having recent financial statements and business metrics will help provide more accurate results.",
        },
        {
          question: "How long does it take to get my results?",
          answer:
            "Free assessments provide instant results. Advanced and Professional packages include expert review, which typically takes 2-3 business days. Executive consultations are scheduled based on availability.",
        },
      ],
    },
    {
      title: "Account & Billing",
      icon: CreditCard,
      questions: [
        {
          question: "How can I upgrade my plan?",
          answer:
            "You can upgrade your plan at any time from your profile dashboard. Go to 'Billing & Plans' section and select your desired package. Upgrades take effect immediately.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, MasterCard, American Express), bank transfers, and Swiss payment methods including PostFinance and Twint.",
        },
        {
          question: "Can I get a refund if I'm not satisfied?",
          answer:
            "We offer a 30-day money-back guarantee for all paid plans. If you're not completely satisfied with our service, contact our support team for a full refund.",
        },
      ],
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      questions: [
        {
          question: "How is my business data protected?",
          answer:
            "All data is encrypted in transit and at rest, hosted exclusively in Swiss data centers. We comply with GDPR and Swiss Data Protection Act. Your data is never shared with third parties or used for commercial purposes.",
        },
        {
          question: "Can I delete my account and all data?",
          answer:
            "Yes, you have full control over your data. You can request complete data deletion from your profile settings. This action is irreversible and will permanently remove all your information from our systems.",
        },
        {
          question: "Do you sign NDAs for sensitive business information?",
          answer:
            "Absolutely. All Advanced, Professional, and Executive packages include a signed NDA to ensure complete confidentiality of your business information.",
        },
      ],
    },
    {
      title: "Reports & Analytics",
      icon: BarChart3,
      questions: [
        {
          question: "What's included in my assessment report?",
          answer:
            "Reports include your business maturity score, spider chart analysis across 10 dimensions, personalized recommendations, industry benchmarks, and actionable next steps tailored to your business stage.",
        },
        {
          question: "Can I share my report with investors or partners?",
          answer:
            "Yes, all reports are designed to be investor-ready and can be safely shared. Professional and Executive packages include specially formatted presentations for investor meetings.",
        },
        {
          question: "How often should I update my assessment?",
          answer:
            "We recommend quarterly assessments to track progress and adapt strategies. Our platform allows you to compare results over time to measure improvement and identify trends.",
        },
      ],
    },
    {
      title: "Technical Support",
      icon: Settings,
      questions: [
        {
          question: "I'm having trouble accessing my account",
          answer:
            "If you can't access your account, try resetting your password first. If the issue persists, contact our support team with your registered email address, and we'll help you regain access within 24 hours.",
        },
        {
          question: "The platform is running slowly or not loading",
          answer:
            "Clear your browser cache and cookies, ensure you're using a supported browser (Chrome, Firefox, Safari, Edge), and check your internet connection. If problems persist, contact technical support.",
        },
        {
          question: "Can I use INOMAX.ai on mobile devices?",
          answer:
            "Yes, our platform is fully responsive and works on all devices. For the best experience, we recommend using a tablet or desktop for completing assessments, but you can access reports and dashboards on any device.",
        },
      ],
    },
  ]

  const filteredFAQs = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              INOMAX.ai
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </a>
            <a href="/help-center" className="text-white font-medium">
              Help Center
            </a>
            <a href="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </a>
            <a href="/privacy" className="text-gray-300 hover:text-white transition-colors">
              Privacy
            </a>
          </nav>
          <Button
            onClick={() => (window.location.href = "/profile")}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
          >
            Dashboard
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-gray-800 text-blue-400 border-gray-700">24/7 Support Available</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Help Center
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Find answers to your questions, get support from our experts, and make the most of your INOMAX.ai experience
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for help articles, guides, or FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-4 text-lg bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Quick Help Options */}
      <section className="py-12 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gray-700 border-gray-600 hover:bg-gray-650 transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <MessageCircle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <CardTitle className="text-white">Live Chat Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300 mb-4">Get instant help from our support team</p>
                <Badge className="bg-green-600 text-white">Online Now</Badge>
              </CardContent>
            </Card>

            <Card className="bg-gray-700 border-gray-600 hover:bg-gray-650 transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <Phone className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <CardTitle className="text-white">Schedule a Call</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300 mb-4">Book a consultation with our experts</p>
                <Badge className="bg-purple-600 text-white">Available 9-18 CET</Badge>
              </CardContent>
            </Card>

            <Card className="bg-gray-700 border-gray-600 hover:bg-gray-650 transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <Mail className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <CardTitle className="text-white">Email Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300 mb-4">Send us a detailed message</p>
                <Badge className="bg-green-600 text-white">Response within 4h</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-300">Find quick answers to common questions about INOMAX.ai</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {(searchQuery ? filteredFAQs : faqCategories).map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                </div>

                <Accordion type="single" collapsible className="space-y-2">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`${categoryIndex}-${faqIndex}`}
                      className="bg-gray-800 border-gray-700 rounded-lg px-6"
                    >
                      <AccordionTrigger className="text-white hover:text-blue-400 text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 leading-relaxed">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {searchQuery && filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
              <p className="text-gray-300 mb-6">
                We couldn't find any articles matching "{searchQuery}". Try different keywords or contact our support
                team.
              </p>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">Contact Support</Button>
            </div>
          )}
        </div>
      </section>

      {/* Support Request Form */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-white">Still Need Help?</h2>
              <p className="text-lg text-gray-300">
                Can't find what you're looking for? Our support team is here to help you succeed.
              </p>
            </div>

            <Card className="bg-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Submit a Support Request
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSupportSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                      <Input
                        type="text"
                        required
                        value={supportForm.name}
                        onChange={(e) => setSupportForm({ ...supportForm, name: e.target.value })}
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                      <Input
                        type="email"
                        required
                        value={supportForm.email}
                        onChange={(e) => setSupportForm({ ...supportForm, email: e.target.value })}
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
                    <Input
                      type="text"
                      required
                      value={supportForm.subject}
                      onChange={(e) => setSupportForm({ ...supportForm, subject: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Brief description of your issue"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Priority Level</label>
                    <select
                      value={supportForm.priority}
                      onChange={(e) => setSupportForm({ ...supportForm, priority: e.target.value })}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white"
                    >
                      <option value="low">Low - General question</option>
                      <option value="medium">Medium - Need assistance</option>
                      <option value="high">High - Urgent issue</option>
                      <option value="critical">Critical - System down</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                    <Textarea
                      required
                      rows={6}
                      value={supportForm.message}
                      onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Please describe your issue in detail. Include any error messages, steps you've taken, and what you expected to happen."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                  >
                    Submit Support Request
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Support Hours</h3>
                <p className="text-gray-300 text-sm">
                  Monday - Friday
                  <br />
                  9:00 AM - 6:00 PM CET
                </p>
              </div>
              <div>
                <Mail className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Email Support</h3>
                <p className="text-gray-300 text-sm mb-1">info@inomax.ai</p>
                Response within 4 hours
              </div>
              <div>
                <Phone className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Phone Support</h3>
                <p className="text-gray-300 text-sm">
                  +41 79 705 70 37
                  <br />
                  Available during business hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">INOMAX.ai</span>
              </div>
              <p className="text-gray-400">Transform, Scale, Thrive with AI-powered business evaluations.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Platform</h4>
              <ul className="space-y-2 text-gray-400">
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
                  <a href="/profile" className="hover:text-white transition-colors">
                    Dashboard
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/#about" className="hover:text-white transition-colors">
                    About
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
            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/help-center" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white transition-colors">
                    Contact Support
                  </a>
                </li>
                <li>
                  <a href="mailto:info@inomax.ai" className="hover:text-white transition-colors">
                    Email Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-800" />
          <div className="text-center text-gray-400">
            <p>&copy; 2024 INOMAX.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Live Chat */}
      <LiveChat />
    </div>
  )
}
