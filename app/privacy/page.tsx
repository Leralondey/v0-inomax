"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  BarChart3,
  Shield,
  Lock,
  Eye,
  Database,
  FileText,
  CheckCircle,
  AlertTriangle,
  Globe,
  Server,
  UserCheck,
  Settings,
  Mail,
  Phone,
} from "lucide-react"

export default function PrivacyPage() {
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
            <a href="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </a>
            <a href="/privacy" className="text-white font-medium">
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
          <Badge className="mb-6 bg-gray-800 text-green-400 border-gray-700">Swiss Data Protection</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Your privacy and data security are our top priorities. We are fully compliant with GDPR and Swiss Data
            Protection Act, with all data hosted exclusively in Switzerland.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Badge className="bg-green-600 text-white px-4 py-2">GDPR Compliant</Badge>
            <Badge className="bg-blue-600 text-white px-4 py-2">Swiss DPA Compliant</Badge>
            <Badge className="bg-purple-600 text-white px-4 py-2">Swiss Hosted</Badge>
          </div>
        </div>
      </section>

      {/* Key Principles */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Our Privacy Principles</h2>
            <p className="text-lg text-gray-300">
              We are committed to protecting your privacy and maintaining the highest standards of data security
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gray-700 border-gray-600 text-center">
              <CardHeader>
                <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <CardTitle className="text-white">Data Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  All data is encrypted, secured, and hosted exclusively in Swiss data centers
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-700 border-gray-600 text-center">
              <CardHeader>
                <Lock className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <CardTitle className="text-white">No Commercial Use</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Your business data is never used for commercial purposes or shared with third parties
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-700 border-gray-600 text-center">
              <CardHeader>
                <Eye className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <CardTitle className="text-white">Full Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Complete transparency about what data we collect and how it's used</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-700 border-gray-600 text-center">
              <CardHeader>
                <UserCheck className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <CardTitle className="text-white">Your Control</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  You have full control over your data with the right to access, modify, or delete
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Privacy Policy */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {/* Data Collection */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    1. Data Collection and Processing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <div>
                    <h4 className="font-semibold text-white mb-2">What Data We Collect:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Business information provided during assessments</li>
                      <li>Contact details (name, email, phone number)</li>
                      <li>Company information (name, size, industry)</li>
                      <li>Usage data and platform interactions</li>
                      <li>Communication records with our support team</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">How We Use Your Data:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Provide business assessments and recommendations</li>
                      <li>Improve our AI algorithms and platform functionality</li>
                      <li>Communicate with you about our services</li>
                      <li>Provide customer support and technical assistance</li>
                      <li>Comply with legal and regulatory requirements</li>
                    </ul>
                  </div>
                  <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="font-semibold text-green-400">Important Commitment</span>
                    </div>
                    <p className="text-green-300">
                      We never use your business data for commercial purposes, marketing to competitors, or any
                      activities that could compromise your competitive advantage.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Legal Compliance */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    2. Legal Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      GDPR Compliance (EU General Data Protection Regulation):
                    </h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Lawful basis for processing personal data</li>
                      <li>Right to access, rectify, and erase personal data</li>
                      <li>Right to data portability and restriction of processing</li>
                      <li>Data protection by design and by default</li>
                      <li>Regular data protection impact assessments</li>
                      <li>Appointment of Data Protection Officer (DPO)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Swiss Data Protection Act (DPA) Compliance:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Adherence to Swiss federal data protection standards</li>
                      <li>Compliance with cantonal data protection regulations</li>
                      <li>Regular audits by Swiss data protection authorities</li>
                      <li>Implementation of Swiss-specific privacy safeguards</li>
                      <li>Alignment with Swiss Federal Act on Data Protection (FADP)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Data Storage and Security */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Server className="w-5 h-5" />
                    3. Data Storage and Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Swiss Data Hosting:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>All data is stored exclusively in Swiss data centers</li>
                      <li>No data transfer outside of Switzerland without explicit consent</li>
                      <li>Compliance with Swiss banking-level security standards</li>
                      <li>Regular security audits by Swiss cybersecurity firms</li>
                      <li>24/7 monitoring and incident response capabilities</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Security Measures:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>End-to-end encryption for all data transmission</li>
                      <li>AES-256 encryption for data at rest</li>
                      <li>Multi-factor authentication for all accounts</li>
                      <li>Regular penetration testing and vulnerability assessments</li>
                      <li>ISO 27001 certified security management system</li>
                      <li>Secure backup and disaster recovery procedures</li>
                    </ul>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-5 h-5 text-blue-400" />
                      <span className="font-semibold text-blue-400">Swiss Advantage</span>
                    </div>
                    <p className="text-blue-300">
                      Switzerland's strong privacy laws and political neutrality provide an additional layer of
                      protection for your sensitive business data.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Your Rights */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    4. Your Rights and Control
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Data Subject Rights:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>
                        <strong>Right to Access:</strong> Request a copy of all personal data we hold about you
                      </li>
                      <li>
                        <strong>Right to Rectification:</strong> Correct any inaccurate or incomplete data
                      </li>
                      <li>
                        <strong>Right to Erasure:</strong> Request deletion of your personal data ("right to be
                        forgotten")
                      </li>
                      <li>
                        <strong>Right to Portability:</strong> Receive your data in a structured, machine-readable
                        format
                      </li>
                      <li>
                        <strong>Right to Restriction:</strong> Limit how we process your personal data
                      </li>
                      <li>
                        <strong>Right to Object:</strong> Object to processing based on legitimate interests
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">How to Exercise Your Rights:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Access your profile settings to manage your data preferences</li>
                      <li>Use the "Delete All Data" feature for complete data removal</li>
                      <li>Contact our Data Protection Officer at info@inomax.ai</li>
                      <li>Submit requests through our secure contact form</li>
                      <li>Call our privacy hotline: +41 79 705 70 37</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Data Sharing and Third Parties */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    5. Data Sharing and Third Parties
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <div>
                    <h4 className="font-semibold text-white mb-2">We DO NOT Share Your Data With:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Competitors or other businesses in your industry</li>
                      <li>Marketing companies or advertising networks</li>
                      <li>Data brokers or analytics companies</li>
                      <li>Social media platforms for advertising purposes</li>
                      <li>Any entity for commercial exploitation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Limited Data Sharing (Only When Necessary):</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Swiss-based cloud infrastructure providers (with strict data processing agreements)</li>
                      <li>Payment processors for billing purposes (minimal data only)</li>
                      <li>Legal authorities when required by Swiss or EU law</li>
                      <li>Professional advisors bound by confidentiality agreements</li>
                    </ul>
                  </div>
                  <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="w-5 h-5 text-red-400" />
                      <span className="font-semibold text-red-400">Zero Commercial Exploitation</span>
                    </div>
                    <p className="text-red-300">
                      Your business data will never be used for commercial purposes, sold to third parties, or used to
                      benefit competitors. This is our absolute commitment to you.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Cookies and Tracking */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    6. Cookies and Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Essential Cookies:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Authentication and session management</li>
                      <li>Security and fraud prevention</li>
                      <li>Platform functionality and user preferences</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Analytics Cookies (Optional):</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Platform usage statistics (anonymized)</li>
                      <li>Performance monitoring and optimization</li>
                      <li>User experience improvements</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">We DO NOT Use:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Third-party advertising cookies</li>
                      <li>Social media tracking pixels</li>
                      <li>Cross-site tracking technologies</li>
                      <li>Behavioral profiling for marketing</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    7. Contact Our Privacy Team
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Data Protection Officer:</h4>
                    <ul className="list-none space-y-2">
                      <li className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>info@inomax.ai</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>+41 79 705 70 37</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Postal Address:</h4>
                    <p>
                      INOMAX.ai Data Protection Office
                      <br />
                      Switzerland
                      <br />
                      (Specific address provided upon request for privacy reasons)
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Response Time:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Privacy inquiries: Within 24 hours</li>
                      <li>Data access requests: Within 30 days</li>
                      <li>Data deletion requests: Within 72 hours</li>
                      <li>Urgent privacy matters: Within 4 hours</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Updates and Changes */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    8. Policy Updates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <p>
                    This privacy policy was last updated on <strong>January 8, 2025</strong>. We may update this policy
                    from time to time to reflect changes in our practices, technology, legal requirements, or other
                    factors.
                  </p>
                  <div>
                    <h4 className="font-semibold text-white mb-2">How We Notify You of Changes:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Email notification to all registered users</li>
                      <li>Prominent notice on our platform</li>
                      <li>Updated version date at the top of this policy</li>
                      <li>Summary of key changes provided</li>
                    </ul>
                  </div>
                  <p>
                    Continued use of our services after policy updates constitutes acceptance of the revised terms. If
                    you disagree with any changes, you may delete your account and data at any time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Our Certifications & Compliance</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <Badge className="bg-green-600 text-white px-6 py-3 text-lg">
              <Shield className="w-5 h-5 mr-2" />
              GDPR Compliant
            </Badge>
            <Badge className="bg-blue-600 text-white px-6 py-3 text-lg">
              <FileText className="w-5 h-5 mr-2" />
              Swiss DPA Certified
            </Badge>
            <Badge className="bg-purple-600 text-white px-6 py-3 text-lg">
              <Server className="w-5 h-5 mr-2" />
              ISO 27001 Certified
            </Badge>
            <Badge className="bg-orange-600 text-white px-6 py-3 text-lg">
              <Lock className="w-5 h-5 mr-2" />
              Swiss Hosted
            </Badge>
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
                    Privacy Team
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-800" />
          <div className="text-center text-gray-400">
            <p>&copy; 2024 INOMAX.ai. All rights reserved. | Data hosted exclusively in Switzerland</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
