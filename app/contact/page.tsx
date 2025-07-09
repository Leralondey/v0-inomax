"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  BarChart3,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Calendar,
  Globe,
  Linkedin,
  Twitter,
} from "lucide-react"
import { useState } from "react"
import { submitContactForm } from "./actions"
import { Navigation } from "@/components/navigation"
import LiveChat from "@/components/live-chat"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const result = await submitContactForm(formData)
      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: "Thank you for your message! We'll get back to you within 24 hours.",
        })
        // Reset form
        const form = document.getElementById("contact-form") as HTMLFormElement
        form?.reset()
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Something went wrong. Please try again.",
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-900">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-50 dark:via-gray-100 dark:to-gray-50">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-gray-800 dark:bg-gray-200 text-blue-400 dark:text-blue-600 border-gray-700 dark:border-gray-300">
            Get in Touch
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Contact Our Experts
          </h1>
          <p className="text-xl text-gray-300 dark:text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your business with AI-powered insights? Our team of experts is here to help you unlock
            your company's full potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
            >
              <MessageCircle className="mr-2 w-4 h-4" />
              Start Live Chat
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 dark:border-gray-300 text-gray-300 dark:text-gray-600 hover:bg-gray-800 dark:hover:bg-gray-200 hover:text-white dark:hover:text-gray-900 bg-transparent"
              onClick={() => window.open("https://cal.com/inomax-ai/consultation", "_blank")}
            >
              <Calendar className="mr-2 w-4 h-4" />
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-800 dark:bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-gray-700 dark:bg-white border-gray-600 dark:border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl text-white dark:text-gray-900">Send us a Message</CardTitle>
                <p className="text-gray-300 dark:text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form id="contact-form" action={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-white dark:text-gray-900">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        className="bg-gray-600 dark:bg-gray-50 border-gray-500 dark:border-gray-300 text-white dark:text-gray-900 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-white dark:text-gray-900">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        className="bg-gray-600 dark:bg-gray-50 border-gray-500 dark:border-gray-300 text-white dark:text-gray-900 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white dark:text-gray-900">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="bg-gray-600 dark:bg-gray-50 border-gray-500 dark:border-gray-300 text-white dark:text-gray-900 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company" className="text-white dark:text-gray-900">
                      Company
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      className="bg-gray-600 dark:bg-gray-50 border-gray-500 dark:border-gray-300 text-white dark:text-gray-900 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      placeholder="Your Company Name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-white dark:text-gray-900">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="bg-gray-600 dark:bg-gray-50 border-gray-500 dark:border-gray-300 text-white dark:text-gray-900 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      placeholder="+41 79 123 45 67"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-white dark:text-gray-900">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      required
                      className="bg-gray-600 dark:bg-gray-50 border-gray-500 dark:border-gray-300 text-white dark:text-gray-900 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white dark:text-gray-900">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="bg-gray-600 dark:bg-gray-50 border-gray-500 dark:border-gray-300 text-white dark:text-gray-900 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      placeholder="Tell us about your business needs and how we can help..."
                    />
                  </div>

                  {submitStatus.type && (
                    <div
                      className={`p-4 rounded-lg ${
                        submitStatus.type === "success"
                          ? "bg-green-600 dark:bg-green-100 text-white dark:text-green-800"
                          : "bg-red-600 dark:bg-red-100 text-white dark:text-red-800"
                      }`}
                    >
                      {submitStatus.message}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-white dark:text-gray-900">Get in Touch</h2>
                <p className="text-lg text-gray-300 dark:text-gray-600 mb-8">
                  We're here to help you transform your business with AI-powered insights. Reach out to us through any
                  of the channels below.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="bg-gray-700 dark:bg-white border-gray-600 dark:border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-white dark:text-gray-900">Email Us</h3>
                        <p className="text-gray-300 dark:text-gray-600 mb-2">For general inquiries and support</p>
                        <a href="mailto:info@inomax.ai" className="text-blue-400 dark:text-blue-600 hover:underline">
                          info@inomax.ai
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-700 dark:bg-white border-gray-600 dark:border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-white dark:text-gray-900">Call Us</h3>
                        <p className="text-gray-300 dark:text-gray-600 mb-2">Speak directly with our experts</p>
                        <a href="tel:+41797057037" className="text-blue-400 dark:text-blue-600 hover:underline">
                          +41 79 705 70 37
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-700 dark:bg-white border-gray-600 dark:border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-white dark:text-gray-900">Visit Us</h3>
                        <p className="text-gray-300 dark:text-gray-600 mb-2">Our office in Switzerland</p>
                        <p className="text-gray-300 dark:text-gray-600">
                          Lausanne, Switzerland
                          <br />
                          <span className="text-sm">By appointment only</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-700 dark:bg-white border-gray-600 dark:border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-white dark:text-gray-900">Business Hours</h3>
                        <div className="text-gray-300 dark:text-gray-600 space-y-1">
                          <p>Monday - Friday: 9:00 AM - 6:00 PM CET</p>
                          <p>Saturday: 10:00 AM - 2:00 PM CET</p>
                          <p>Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-white dark:text-gray-900">Follow Us</h3>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-600 dark:border-gray-300 text-gray-300 dark:text-gray-600 hover:bg-gray-600 dark:hover:bg-gray-200 hover:text-white dark:hover:text-gray-900 bg-transparent"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-600 dark:border-gray-300 text-gray-300 dark:text-gray-600 hover:bg-gray-600 dark:hover:bg-gray-200 hover:text-white dark:hover:text-gray-900 bg-transparent"
                  >
                    <Twitter className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-600 dark:border-gray-300 text-gray-300 dark:text-gray-600 hover:bg-gray-600 dark:hover:bg-gray-200 hover:text-white dark:hover:text-gray-900 bg-transparent"
                  >
                    <Globe className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-900 dark:bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white dark:text-gray-900">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-300 dark:text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about our services
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
              <CardHeader>
                <CardTitle className="text-white dark:text-gray-900">How quickly can I get started?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 dark:text-gray-600">
                  You can start your free assessment immediately after signing up. For paid services, we typically begin
                  within 48 hours of confirmation.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
              <CardHeader>
                <CardTitle className="text-white dark:text-gray-900">Is my data secure?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 dark:text-gray-600">
                  Absolutely. All evaluations are accompanied by a signed NDA, and we use enterprise-grade security
                  measures to protect your information.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
              <CardHeader>
                <CardTitle className="text-white dark:text-gray-900">What industries do you serve?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 dark:text-gray-600">
                  We work with startups, SMEs, and enterprises across all industries, with particular expertise in
                  fintech, healthcare, and technology sectors.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
              <CardHeader>
                <CardTitle className="text-white dark:text-gray-900">Do you offer ongoing support?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 dark:text-gray-600">
                  Yes, we provide continuous monitoring and regular progress tracking to ensure your business stays on
                  the optimal growth trajectory.
                </p>
              </CardContent>
            </Card>
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
