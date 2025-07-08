"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  Users,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  CheckCircle,
  Send,
} from "lucide-react"
import { useActionState } from "react"
import LiveChat from "@/components/live-chat"
import { submitContactForm, scheduleConsultation } from "./actions"

export default function ContactPage() {
  const [contactState, contactAction, contactPending] = useActionState(submitContactForm, null)
  const [consultationState, consultationAction, consultationPending] = useActionState(scheduleConsultation, null)

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
            <a href="/help-center" className="text-gray-300 hover:text-white transition-colors">
              Help Center
            </a>
            <a href="/contact" className="text-white font-medium">
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
          <Badge className="mb-6 bg-gray-800 text-blue-400 border-gray-700">Get in Touch</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Contact Our Team
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to transform your business? Our experts are here to help you succeed with personalized guidance and
            support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Send Message
              <Send className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
              onClick={() => window.open("https://cal.com/inomax-ai/consultation", "_blank")}
            >
              <Calendar className="mr-2 w-4 h-4" />
              Schedule Call
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-gray-700 border-gray-600 text-center hover:bg-gray-650 transition-colors">
              <CardHeader>
                <MessageCircle className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                <CardTitle className="text-white text-lg">Live Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-3">Instant support available</p>
                <Badge className="bg-green-600 text-white text-xs">Online Now</Badge>
              </CardContent>
            </Card>

            <Card className="bg-gray-700 border-gray-600 text-center hover:bg-gray-650 transition-colors">
              <CardHeader>
                <Phone className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                <CardTitle className="text-white text-lg">Phone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-1">+41 79 705 70 37</p>
                <p className="text-gray-400 text-xs">Mon-Fri 9AM-6PM CET</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-700 border-gray-600 text-center hover:bg-gray-650 transition-colors">
              <CardHeader>
                <Mail className="w-12 h-12 text-green-400 mx-auto mb-2" />
                <CardTitle className="text-white text-lg">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-1">info@inomax.ai</p>
                <p className="text-gray-400 text-xs">Response within 4 hours</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-700 border-gray-600 text-center hover:bg-gray-650 transition-colors">
              <CardHeader>
                <MapPin className="w-12 h-12 text-orange-400 mx-auto mb-2" />
                <CardTitle className="text-white text-lg">Location</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-1">Switzerland</p>
                <p className="text-gray-400 text-xs">Zurich & Geneva</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Forms */}
      <section id="contact-form" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white">Get Started Today</h2>
              <p className="text-lg text-gray-300">Choose how you'd like to connect with our team</p>
            </div>

            <Tabs defaultValue="contact" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800 border-gray-700">
                <TabsTrigger value="contact" className="data-[state=active]:bg-gray-700 text-white">
                  Send Message
                </TabsTrigger>
                <TabsTrigger value="consultation" className="data-[state=active]:bg-gray-700 text-white">
                  Schedule Consultation
                </TabsTrigger>
              </TabsList>

              <TabsContent value="contact" className="mt-8">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      Contact Form
                    </CardTitle>
                    <p className="text-gray-300">Send us a message and we'll get back to you within 24 hours</p>
                  </CardHeader>
                  <CardContent>
                    {contactState?.success ? (
                      <div className="text-center py-8">
                        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                        <p className="text-gray-300">{contactState.message}</p>
                      </div>
                    ) : (
                      <form action={contactAction} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                            <Input
                              name="name"
                              type="text"
                              required
                              className="bg-gray-700 border-gray-600 text-white"
                              placeholder="Your full name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                            <Input
                              name="email"
                              type="email"
                              required
                              className="bg-gray-700 border-gray-600 text-white"
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                            <Input
                              name="company"
                              type="text"
                              className="bg-gray-700 border-gray-600 text-white"
                              placeholder="Your company name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                            <Input
                              name="phone"
                              type="tel"
                              className="bg-gray-700 border-gray-600 text-white"
                              placeholder="+41 XX XXX XX XX"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
                            <Input
                              name="subject"
                              type="text"
                              required
                              className="bg-gray-700 border-gray-600 text-white"
                              placeholder="What can we help you with?"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                            <select
                              name="priority"
                              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                            >
                              <option value="low">Low - General inquiry</option>
                              <option value="medium">Medium - Need assistance</option>
                              <option value="high">High - Urgent matter</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                          <Textarea
                            name="message"
                            required
                            rows={6}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="Tell us more about your business needs, questions, or how we can help you succeed..."
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={contactPending}
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                        >
                          {contactPending ? "Sending..." : "Send Message"}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="consultation" className="mt-8">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Schedule Consultation
                    </CardTitle>
                    <p className="text-gray-300">Book a personalized consultation with our business experts</p>
                  </CardHeader>
                  <CardContent>
                    {consultationState?.success ? (
                      <div className="text-center py-8">
                        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Consultation Scheduled!</h3>
                        <p className="text-gray-300">{consultationState.message}</p>
                      </div>
                    ) : (
                      <form action={consultationAction} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                            <Input
                              name="name"
                              type="text"
                              required
                              className="bg-gray-700 border-gray-600 text-white"
                              placeholder="Your full name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                            <Input
                              name="email"
                              type="email"
                              required
                              className="bg-gray-700 border-gray-600 text-white"
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Company *</label>
                          <Input
                            name="company"
                            type="text"
                            required
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="Your company name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Consultation Type *</label>
                          <select
                            name="consultationType"
                            required
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                          >
                            <option value="">Select consultation type</option>
                            <option value="free">Free Assessment Review (30 min)</option>
                            <option value="advanced">Advanced Strategy Session (60 min)</option>
                            <option value="professional">Professional Consultation (90 min)</option>
                            <option value="executive">Executive Advisory (Custom)</option>
                          </select>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Date *</label>
                            <Input
                              name="preferredDate"
                              type="date"
                              required
                              className="bg-gray-700 border-gray-600 text-white"
                              min={new Date().toISOString().split("T")[0]}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Time *</label>
                            <select
                              name="preferredTime"
                              required
                              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                            >
                              <option value="">Select time</option>
                              <option value="09:00">09:00 AM</option>
                              <option value="10:00">10:00 AM</option>
                              <option value="11:00">11:00 AM</option>
                              <option value="14:00">02:00 PM</option>
                              <option value="15:00">03:00 PM</option>
                              <option value="16:00">04:00 PM</option>
                              <option value="17:00">05:00 PM</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Timezone *</label>
                            <select
                              name="timezone"
                              required
                              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                            >
                              <option value="CET">CET (Central European Time)</option>
                              <option value="EST">EST (Eastern Standard Time)</option>
                              <option value="PST">PST (Pacific Standard Time)</option>
                              <option value="GMT">GMT (Greenwich Mean Time)</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Additional Information</label>
                          <Textarea
                            name="message"
                            rows={4}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="Tell us about your business goals, current challenges, or specific topics you'd like to discuss during the consultation..."
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={consultationPending}
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                        >
                          {consultationPending ? "Scheduling..." : "Schedule Consultation"}
                          <Calendar className="ml-2 w-4 h-4" />
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Why Businesses Trust INOMAX.ai</h2>
            <p className="text-lg text-gray-300">
              Join over 200 companies that have transformed their business with our expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Expert Team</h3>
              <p className="text-gray-300">35+ years of combined experience in business strategy and AI</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Fast Results</h3>
              <p className="text-gray-300">Get actionable insights within hours, not weeks</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Swiss Quality</h3>
              <p className="text-gray-300">Developed with EPFL, supported by Innosuisse</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Global Reach</h3>
              <p className="text-gray-300">Serving businesses worldwide with local expertise</p>
            </div>
          </div>
        </div>
      </section>

      {/* Office Information */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Our Locations</h2>
              <p className="text-gray-300">Based in Switzerland, serving clients globally</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Zurich Office
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span>Monday - Friday: 9:00 AM - 6:00 PM CET</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone className="w-4 h-4" />
                    <span>+41 79 705 70 37</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail className="w-4 h-4" />
                    <span>info@inomax.ai</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Geneva Office
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span>Monday - Friday: 9:00 AM - 6:00 PM CET</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone className="w-4 h-4" />
                    <span>+41 79 705 70 37</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail className="w-4 h-4" />
                    <span>info@inomax.ai</span>
                  </div>
                </CardContent>
              </Card>
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
