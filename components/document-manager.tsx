"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Upload,
  File,
  FileText,
  ImageIcon,
  Download,
  Trash2,
  Eye,
  Share,
  FolderOpen,
  Plus,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"

interface Document {
  id: string
  name: string
  type: string
  size: string
  uploadDate: string
  status: "processing" | "completed" | "error"
  category: string
  insights?: number
}

export default function DocumentManager() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Business_Plan_2024.pdf",
      type: "pdf",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      status: "completed",
      category: "Strategy",
      insights: 23,
    },
    {
      id: "2",
      name: "Financial_Statements_Q4.xlsx",
      type: "excel",
      size: "1.8 MB",
      uploadDate: "2024-01-14",
      status: "completed",
      category: "Finance",
      insights: 18,
    },
    {
      id: "3",
      name: "Market_Research_Report.docx",
      type: "word",
      size: "3.2 MB",
      uploadDate: "2024-01-13",
      status: "processing",
      category: "Research",
    },
    {
      id: "4",
      name: "Competitor_Analysis.pdf",
      type: "pdf",
      size: "1.5 MB",
      uploadDate: "2024-01-12",
      status: "completed",
      category: "Analysis",
      insights: 15,
    },
  ])

  const [isUploading, setIsUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "Strategy", "Finance", "Research", "Analysis", "Operations", "Marketing"]

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)

    try {
      for (const file of files) {
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (response.ok) {
          const result = await response.json()

          const newDocument: Document = {
            id: Date.now().toString(),
            name: file.name,
            type: file.type.includes("pdf") ? "pdf" : file.type.includes("sheet") ? "excel" : "word",
            size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
            uploadDate: new Date().toISOString().split("T")[0],
            status: "processing",
            category: "Strategy", // Default category
          }

          setDocuments((prev) => [newDocument, ...prev])

          // Simulate processing completion
          setTimeout(() => {
            setDocuments((prev) =>
              prev.map((doc) =>
                doc.id === newDocument.id
                  ? { ...doc, status: "completed" as const, insights: Math.floor(Math.random() * 30) + 5 }
                  : doc,
              ),
            )
          }, 3000)
        }
      }
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setIsUploading(false)
      // Reset input
      event.target.value = ""
    }
  }

  const deleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id))
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-400" />
      case "excel":
        return <File className="w-5 h-5 text-green-400" />
      case "word":
        return <FileText className="w-5 h-5 text-blue-400" />
      default:
        return <ImageIcon className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-600 text-white border-green-500">
            <CheckCircle className="w-3 h-3 mr-1" />
            Processed
          </Badge>
        )
      case "processing":
        return (
          <Badge className="bg-orange-600 text-white border-orange-500">
            <Clock className="w-3 h-3 mr-1" />
            Processing
          </Badge>
        )
      case "error":
        return (
          <Badge className="bg-red-600 text-white border-red-500">
            <AlertCircle className="w-3 h-3 mr-1" />
            Error
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const totalSize = documents.reduce((acc, doc) => {
    const size = Number.parseFloat(doc.size.replace(" MB", ""))
    return acc + size
  }, 0)

  const completedDocuments = documents.filter((doc) => doc.status === "completed").length
  const totalInsights = documents.reduce((acc, doc) => acc + (doc.insights || 0), 0)

  return (
    <div className="space-y-6">
      {/* Document Overview */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FolderOpen className="w-5 h-5" />
            Document Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <File className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-gray-300">Total Documents</span>
              </div>
              <div className="text-2xl font-bold text-white">{documents.length}</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm text-gray-300">Processed</span>
              </div>
              <div className="text-2xl font-bold text-white">{completedDocuments}</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-gray-300">Total Insights</span>
              </div>
              <div className="text-2xl font-bold text-white">{totalInsights}</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Upload className="w-5 h-5 text-orange-400" />
                <span className="text-sm text-gray-300">Storage Used</span>
              </div>
              <div className="text-2xl font-bold text-white">{totalSize.toFixed(1)} MB</div>
            </div>
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Upload Business Documents</h3>
            <p className="text-gray-300 mb-4">
              Drag and drop files here, or click to select files
              <br />
              <span className="text-sm text-gray-400">
                Supported formats: PDF, Word, Excel, PowerPoint (Max 100MB per file)
              </span>
            </p>
            <div className="flex items-center justify-center gap-4">
              <label htmlFor="file-upload">
                <Button
                  as="span"
                  disabled={isUploading}
                  className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Select Files
                    </>
                  )}
                </Button>
              </label>
              <input
                id="file-upload"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document List */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Your Documents</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 w-64"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 text-sm"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredDocuments.map((document) => (
              <div
                key={document.id}
                className="flex items-center justify-between p-4 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">{getFileIcon(document.type)}</div>
                  <div className="flex-grow">
                    <h4 className="font-medium text-white">{document.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <span>{document.size}</span>
                      <span>•</span>
                      <span>Uploaded {document.uploadDate}</span>
                      <span>•</span>
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {document.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    {document.insights && (
                      <div className="text-sm text-blue-400 mb-1">{document.insights} insights extracted</div>
                    )}
                    {getStatusBadge(document.status)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    >
                      <Share className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteDocument(document.id)}
                      className="border-red-600 text-red-400 hover:bg-red-900/50 bg-transparent"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <ImageIcon className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">No documents found</h3>
              <p className="text-gray-500">
                {searchTerm || selectedCategory !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Upload your first document to get started"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Processing Status */}
      {documents.some((doc) => doc.status === "processing") && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Processing Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents
                .filter((doc) => doc.status === "processing")
                .map((document) => (
                  <div key={document.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">{document.name}</span>
                      <span className="text-sm text-orange-400">Processing...</span>
                    </div>
                    <Progress value={65} className="h-2" />
                    <p className="text-xs text-gray-400">
                      Analyzing document structure and extracting business insights...
                    </p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Document Insights */}
      {totalInsights > 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Document Insights Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-3">Key Findings</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-blue-900/50 border border-blue-700 rounded-lg">
                    <p className="text-sm text-blue-200">
                      Financial documents show strong revenue growth of 23% year-over-year
                    </p>
                  </div>
                  <div className="p-3 bg-green-900/50 border border-green-700 rounded-lg">
                    <p className="text-sm text-green-200">
                      Market research indicates significant expansion opportunities in DACH region
                    </p>
                  </div>
                  <div className="p-3 bg-orange-900/50 border border-orange-700 rounded-lg">
                    <p className="text-sm text-orange-200">
                      Operational efficiency could be improved by 15% through automation
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">Recommendations</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-300">
                      Consider expanding sales team to capitalize on market opportunities
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-300">
                      Implement CRM system to improve customer relationship management
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-300">Explore strategic partnerships to accelerate growth</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
