"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BarChart3, Shield, Lock, Eye, FileText, Mail, Phone } from "lucide-react"
import { Navigation } from "@/components/navigation"
import LiveChat from "@/components/live-chat"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-900">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-50 dark:via-gray-100 dark:to-gray-50">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-gray-800 dark:bg-gray-200 text-blue-400 dark:text-blue-600 border-gray-700 dark:border-gray-300">
            Privacy Policy
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Your Privacy Matters
          </h1>
          <p className="text-xl text-gray-300 dark:text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            At INOMAX.ai, we are committed to protecting your privacy and ensuring the security of your business data.
            This policy explains how we collect, use, and safeguard your information.
          </p>
          <div className="text-sm text-gray-400 dark:text-gray-500">Last updated: January 2024</div>
        </div>
      </section>

      {/* Privacy Overview */}
      <section className="py-16 bg-gray-800 dark:bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-gray-700 dark:bg-white border-gray-600 dark:border-gray-200 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white dark:text-gray-900">Data Protection</h3>
                <p className="text-gray-300 dark:text-gray-600">
                  Enterprise-grade security measures protect your sensitive business information
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-700 dark:bg-white border-gray-600 dark:border-gray-200 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white dark:text-gray-900">Confidentiality</h3>
                <p className="text-gray-300 dark:text-gray-600">
                  All evaluations are accompanied by signed NDAs ensuring complete confidentiality
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-700 dark:bg-white border-gray-600 dark:border-gray-200 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white dark:text-gray-900">Transparency</h3>
                <p className="text-gray-300 dark:text-gray-600">
                  Clear policies on how your data is collected, used, and stored
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 bg-gray-900 dark:bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl text-white dark:text-gray-900">1. Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-white dark:text-gray-900">Personal Information</h4>
                  <p className="text-gray-300 dark:text-gray-600">
                    We collect personal information you provide when creating an account, including name, email address,
                    phone number, and company details.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-white dark:text-gray-900">Business Information</h4>
                  <p className="text-gray-300 dark:text-gray-600">
                    During assessments, we collect business data including financial metrics, operational details, and
                    strategic information necessary for evaluation.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-white dark:text-gray-900">Usage Data</h4>
                  <p className="text-gray-300 dark:text-gray-600">
                    We automatically collect information about how you use our platform, including log data, device
                    information, and interaction patterns.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl text-white dark:text-gray-900">2. How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-white dark:text-gray-900">Service Provision</h4>
                  <p className="text-gray-300 dark:text-gray-600">
                    We use your information to provide business evaluations, generate reports, and deliver our
                    AI-powered insights and recommendations.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-white dark:text-gray-900">Communication</h4>
                  <p className="text-gray-300 dark:text-gray-600">
                    We may contact you regarding your account, service updates, and important notifications related to
                    your assessments.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-white dark:text-gray-900">Improvement</h4>
                  <p className="text-gray-300 dark:text-gray-600">
                    Aggregated and anonymized data helps us improve our AI models and enhance the platform's
                    effectiveness.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl text-white dark:text-gray-900">3. Data Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-white dark:text-gray-900">Encryption</h4>
                  <p className="text-gray-300 dark:text-gray-600">
                    All data is encrypted in transit and at rest using industry-standard AES-256 encryption protocols.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-white dark:text-gray-900">Access Controls</h4>
                  <p className="text-gray-300 dark:text-gray-600">
                    Strict access controls ensure only authorized personnel can access your data, with all access logged
                    and monitored.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-white dark:text-gray-900">Infrastructure</h4>
                  <p className="text-gray-300 dark:text-gray-600">
                    Our infrastructure is hosted on secure, compliant cloud platforms with regular security audits and
                    penetration testing.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl text-white dark:text-gray-900">4. Data Sharing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-white dark:text-gray-900">No Third-Party Sharing</h4>
                  <p className="text-gray-300 dark:text-gray-600">
                    We do not sell, rent, or share your personal or business information with third parties for
                    marketing purposes.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-white dark:text-gray-900">Service Providers</h4>
                  <p className="text-gray-300 dark:text-gray-600">
                    We may share data with trusted service providers who assist in platform operations, all bound by
                    strict confidentiality agreements.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-white dark:text-gray-900">Legal Requirements</h4>
                  <p className="text-gray-300 dark:text-gray-600">
                    We may disclose information when required by law or to protect our rights, users, or the public.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl text-white dark:text-gray-900">5. Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-white dark:text-gray-900">Access and Portability</h4>
                  <p className="text-gray-300 dark:text-gray-600">
                    You have the right to access your data and request a copy in a portable format.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-white dark:text-gray-900">Correction and Deletion</h4>
                  <p className="text-gray-300 dark:text-gray-600">
                    You can request corrections to inaccurate data or deletion of your personal information.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-white dark:text-gray-900">Consent Withdrawal</h4>
                  <p className="text-gray-300 dark:text-gray-600">
                    You may withdraw consent for data processing at any time, subject to legal and contractual
                    obligations.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl text-white dark:text-gray-900">6. Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 dark:text-gray-600">
                  We retain your data only as long as necessary to provide our services and comply with legal
                  obligations. Specifically:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 dark:text-gray-600">
                  <li>Account data is retained while your account is active</li>
                  <li>Assessment data is retained for 7 years for business continuity</li>
                  <li>Usage logs are retained for 2 years for security purposes</li>
                  <li>Marketing data is retained until you unsubscribe</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl text-white dark:text-gray-900">7. International Transfers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 dark:text-gray-600">
                  Your data may be processed in countries outside your residence. We ensure adequate protection through:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 dark:text-gray-600">
                  <li>Standard Contractual Clauses approved by the European Commission</li>
                  <li>Adequacy decisions for data transfers to approved countries</li>
                  <li>Additional safeguards for enhanced protection</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 dark:bg-white border-gray-700 dark:border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl text-white dark:text-gray-900">8. Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 dark:text-gray-600">
                  For questions about this privacy policy or to exercise your rights, contact us:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-400 dark:text-blue-600" />
                    <span className="text-gray-300 dark:text-gray-600">
                      Email:{" "}
                      <a href="mailto:info@inomax.ai" className="text-blue-400 dark:text-blue-600 hover:underline">
                        info@inomax.ai
                      </a>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-400 dark:text-blue-600" />
                    <span className="text-gray-300 dark:text-gray-600">
                      Phone:{" "}
                      <a href="tel:+41797057037" className="text-blue-400 dark:text-blue-600 hover:underline">
                        +41 79 705 70 37
                      </a>
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-blue-400 dark:text-blue-600 mt-0.5" />
                    <span className="text-gray-300 dark:text-gray-600">Address: INOMAX.ai, Lausanne, Switzerland</span>
                  </div>
                </div>
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
