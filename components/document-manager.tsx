"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  File,
  CheckCircle,
  AlertCircle,
  Download,
  Eye,
  Trash2,
  FileText,
  ImageIcon,
  FileSpreadsheet,
} from "lucide-react"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  uploadProgress: number
  status: "uploading" | "completed" | "error"
  url?: string
  uploadedAt: Date
}

const MAX_FILE_SIZE = 100 * 1024 * 1024 // 100MB
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/png",
  "image/gif",
  "text/plain",
]

export default function DocumentManager() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return <FileText className="w-5 h-5 text-red-500" />
    if (type.includes("image")) return <ImageIcon className="w-5 h-5 text-blue-500" />
    if (type.includes("sheet") || type.includes("excel")) return <FileSpreadsheet className="w-5 h-5 text-green-500" />
    return <File className="w-5 h-5 text-gray-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return `File size exceeds 100MB limit. Current size: ${formatFileSize(file.size)}`
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `File type not supported: ${file.type}`
    }
    return null
  }

  const generateSecureFileName = (originalName: string): string => {
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = originalName.split(".").pop()
    const baseName = originalName
      .split(".")
      .slice(0, -1)
      .join(".")
      .replace(/[^a-zA-Z0-9]/g, "_")
      .substring(0, 50)
    return `${baseName}_${timestamp}_${randomString}.${extension}`
  }

  const uploadFile = useCallback(async (file: File) => {
    const fileId = Math.random().toString(36).substring(2, 15)
    const secureFileName = generateSecureFileName(file.name)

    const newFile: UploadedFile = {
      id: fileId,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadProgress: 0,
      status: "uploading",
      uploadedAt: new Date(),
    }

    setFiles((prev) => [...prev, newFile])

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("secureFileName", secureFileName)

      const xhr = new XMLHttpRequest()

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100)
          setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, uploadProgress: progress } : f)))
        }
      })

      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText)
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileId ? { ...f, status: "completed", uploadProgress: 100, url: response.url } : f,
            ),
          )

          // Store in localStorage for persistence
          const uploadedFiles = JSON.parse(localStorage.getItem("uploadedFiles") || "[]")
          uploadedFiles.push({
            id: fileId,
            name: file.name,
            size: file.size,
            type: file.type,
            url: response.url,
            uploadedAt: new Date().toISOString(),
          })
          localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles))
        } else {
          throw new Error(`Upload failed with status: ${xhr.status}`)
        }
      })

      xhr.addEventListener("error", () => {
        setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, status: "error" } : f)))
      })

      xhr.open("POST", "/api/upload")
      xhr.send(formData)
    } catch (error) {
      console.error("Upload error:", error)
      setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, status: "error" } : f)))
    }
  }, [])

  const handleFileSelect = useCallback(
    (selectedFiles: FileList | null) => {
      if (!selectedFiles) return

      Array.from(selectedFiles).forEach((file) => {
        const error = validateFile(file)
        if (error) {
          alert(error)
          return
        }
        uploadFile(file)
      })
    },
    [uploadFile],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      handleFileSelect(e.dataTransfer.files)
    },
    [handleFileSelect],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId))

    // Remove from localStorage
    const uploadedFiles = JSON.parse(localStorage.getItem("uploadedFiles") || "[]")
    const updatedFiles = uploadedFiles.filter((f: any) => f.id !== fileId)
    localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles))
  }

  const downloadFile = (file: UploadedFile) => {
    if (file.url) {
      const link = document.createElement("a")
      link.href = file.url
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  // Load files from localStorage on component mount
  useState(() => {
    const savedFiles = JSON.parse(localStorage.getItem("uploadedFiles") || "[]")
    const loadedFiles = savedFiles.map((f: any) => ({
      ...f,
      status: "completed",
      uploadProgress: 100,
      uploadedAt: new Date(f.uploadedAt),
    }))
    setFiles(loadedFiles)
  })

  const completedFiles = files.filter((f) => f.status === "completed")
  const totalSize = completedFiles.reduce((sum, f) => sum + f.size, 0)

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Document Upload
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">Drop files here or click to upload</h3>
            <p className="text-gray-600 mb-4">Support for PDF, Word, Excel, Images, and Text files up to 100MB</p>
            <Button onClick={() => fileInputRef.current?.click()} className="bg-blue-500 hover:bg-blue-600 text-white">
              Choose Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.txt"
              onChange={(e) => handleFileSelect(e.target.files)}
            />
          </div>

          {/* Upload Statistics */}
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{completedFiles.length}</div>
              <div className="text-sm text-gray-600">Files Uploaded</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{formatFileSize(totalSize)}</div>
              <div className="text-sm text-gray-600">Total Size</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">100MB</div>
              <div className="text-sm text-gray-600">Max File Size</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0">{getFileIcon(file.type)}</div>

                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-gray-800 truncate">{file.name}</p>
                      <Badge
                        variant={
                          file.status === "completed"
                            ? "default"
                            : file.status === "error"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {file.status === "completed" && <CheckCircle className="w-3 h-3 mr-1" />}
                        {file.status === "error" && <AlertCircle className="w-3 h-3 mr-1" />}
                        {file.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{formatFileSize(file.size)}</span>
                      <span>{file.uploadedAt.toLocaleDateString()}</span>
                    </div>

                    {file.status === "uploading" && (
                      <div className="mt-2">
                        <Progress value={file.uploadProgress} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">{file.uploadProgress}% uploaded</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {file.status === "completed" && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => downloadFile(file)}>
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeFile(file.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* File Management Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="font-medium text-blue-800 mb-2">📋 File Management Tips</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Files are automatically renamed with secure identifiers</li>
            <li>• All uploads are validated for type and size</li>
            <li>• Files are stored locally and synced with your profile</li>
            <li>• Maximum file size: 100MB per file</li>
            <li>• Supported formats: PDF, Word, Excel, Images, Text</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
