"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, Bot, User, Loader2 } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ProfileChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI Business Assistant. I can help you with AI strategy, implementation guidance, and answer questions about our services. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const predefinedQuestions = [
    "What AI solutions are best for my industry?",
    "How do I calculate ROI for AI implementation?",
    "What's the typical timeline for AI projects?",
    "How do I prepare my team for AI adoption?",
  ]

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(content),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("roi") || input.includes("return")) {
      return "AI ROI typically ranges from 15-25% in the first year. Key factors include: automation savings, productivity gains, and new revenue streams. I can help you create a custom ROI projection based on your specific use case. Would you like to schedule a detailed ROI analysis session?"
    }

    if (input.includes("timeline") || input.includes("time")) {
      return "AI project timelines vary by complexity: Simple automation (2-4 months), Custom ML models (4-8 months), Enterprise AI transformation (6-18 months). The key is starting with a pilot project. Would you like help defining your first AI pilot?"
    }

    if (input.includes("team") || input.includes("training")) {
      return "Successful AI adoption requires team preparation: 1) Executive buy-in, 2) Skills assessment, 3) Training programs, 4) Change management. We offer comprehensive team training programs. Would you like to learn more about our training offerings?"
    }

    if (input.includes("industry") || input.includes("sector")) {
      return "AI applications vary by industry. Common use cases include: Healthcare (diagnostics, patient care), Finance (fraud detection, risk assessment), Manufacturing (predictive maintenance, quality control), Retail (personalization, inventory optimization). What's your industry? I can provide specific recommendations."
    }

    if (input.includes("cost") || input.includes("price")) {
      return "AI implementation costs depend on scope and complexity. We offer flexible pricing: Free assessments, consulting from $299/session, full implementations from $10K-$100K+. Start with our free AI readiness assessment to get accurate cost estimates for your specific needs."
    }

    return "That's a great question! Based on your profile, I'd recommend starting with our AI Readiness Assessment to understand your specific needs. This will help me provide more targeted advice. You can also schedule a consultation with our AI experts for personalized guidance. What specific aspect of AI implementation interests you most?"
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(inputMessage)
    }
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-400" />
          AI Business Assistant
        </CardTitle>
        <CardDescription className="text-slate-400">
          Get instant answers about AI strategy and implementation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Chat Messages */}
        <ScrollArea className="h-80 w-full rounded-lg border border-slate-600 bg-slate-700/50 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === "user" ? "bg-blue-600" : "bg-green-600"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "user" ? "bg-blue-600 text-white" : "bg-slate-600 text-slate-100"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-slate-600 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-slate-300" />
                      <span className="text-sm text-slate-300">Thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Questions */}
        <div className="space-y-2">
          <p className="text-slate-400 text-sm">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {predefinedQuestions.map((question, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-slate-600 bg-slate-700 text-slate-300 text-xs"
                onClick={() => sendMessage(question)}
              >
                {question}
              </Badge>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about AI strategy, implementation, or our services..."
            className="bg-slate-700 border-slate-600 text-white flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={() => sendMessage(inputMessage)}
            disabled={isLoading || !inputMessage.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Powered by AI • Available 24/7</span>
          <Badge variant="secondary" className="bg-green-500/20 text-green-400">
            Online
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
