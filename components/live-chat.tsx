"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MessageCircle, X, Send, User, Bot, Minimize2, Phone, Mail, Globe } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "agent"
  timestamp: Date
}

type Language = "en" | "fr" | "de"

interface Translations {
  [key: string]: {
    [K in Language]: string
  }
}

const translations: Translations = {
  supportTitle: {
    en: "INOMAX.ai Support",
    fr: "Support INOMAX.ai",
    de: "INOMAX.ai Support",
  },
  onlineNow: {
    en: "Online now",
    fr: "En ligne maintenant",
    de: "Jetzt online",
  },
  welcomeMessage: {
    en: "Hello! Welcome to INOMAX.ai. How can I help you today?",
    fr: "Bonjour ! Bienvenue chez INOMAX.ai. Comment puis-je vous aider aujourd'hui ?",
    de: "Hallo! Willkommen bei INOMAX.ai. Wie kann ich Ihnen heute helfen?",
  },
  typePlaceholder: {
    en: "Type your message...",
    fr: "Tapez votre message...",
    de: "Geben Sie Ihre Nachricht ein...",
  },
  quickQuestions: {
    en: "Quick questions:",
    fr: "Questions rapides :",
    de: "Schnelle Fragen:",
  },
  // Quick replies
  tellMePricing: {
    en: "Tell me about pricing",
    fr: "Parlez-moi des tarifs",
    de: "Erzählen Sie mir über die Preise",
  },
  howAssessment: {
    en: "How does the assessment work?",
    fr: "Comment fonctionne l'évaluation ?",
    de: "Wie funktioniert die Bewertung?",
  },
  helpChoosePlan: {
    en: "I need help choosing a plan",
    fr: "J'ai besoin d'aide pour choisir un plan",
    de: "Ich brauche Hilfe bei der Auswahl eines Plans",
  },
  scheduleDemo: {
    en: "Schedule a demo",
    fr: "Planifier une démo",
    de: "Demo planen",
  },
  // Agent responses
  agentResponse1: {
    en: "Thank you for your message! I'll connect you with one of our business experts shortly.",
    fr: "Merci pour votre message ! Je vais vous mettre en contact avec l'un de nos experts métier sous peu.",
    de: "Vielen Dank für Ihre Nachricht! Ich werde Sie in Kürze mit einem unserer Geschäftsexperten verbinden.",
  },
  agentResponse2: {
    en: "Great question! Let me get you the information you need about our AI-powered evaluations.",
    fr: "Excellente question ! Laissez-moi vous donner les informations dont vous avez besoin sur nos évaluations alimentées par l'IA.",
    de: "Großartige Frage! Lassen Sie mich Ihnen die Informationen geben, die Sie über unsere KI-gestützten Bewertungen benötigen.",
  },
  agentResponse3: {
    en: "I'd be happy to help you choose the right service package for your business needs.",
    fr: "Je serais ravi de vous aider à choisir le bon forfait de service pour vos besoins d'entreprise.",
    de: "Gerne helfe ich Ihnen bei der Auswahl des richtigen Service-Pakets für Ihre Geschäftsanforderungen.",
  },
  agentResponse4: {
    en: "That's an excellent point. Our team can provide detailed insights on that topic.",
    fr: "C'est un excellent point. Notre équipe peut fournir des informations détaillées sur ce sujet.",
    de: "Das ist ein ausgezeichneter Punkt. Unser Team kann detaillierte Einblicke zu diesem Thema liefern.",
  },
  agentResponse5: {
    en: "I'll make sure to get you connected with the right specialist for your inquiry.",
    fr: "Je m'assurerai de vous mettre en contact avec le bon spécialiste pour votre demande.",
    de: "Ich werde sicherstellen, dass Sie mit dem richtigen Spezialisten für Ihre Anfrage verbunden werden.",
  },
  // Language names
  english: {
    en: "English",
    fr: "Anglais",
    de: "Englisch",
  },
  french: {
    en: "French",
    fr: "Français",
    de: "Französisch",
  },
  german: {
    en: "German",
    fr: "Allemand",
    de: "Deutsch",
  },
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [language, setLanguage] = useState<Language>("en")
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize welcome message based on language
  useEffect(() => {
    setMessages([
      {
        id: "1",
        text: translations.welcomeMessage[language],
        sender: "agent",
        timestamp: new Date(),
      },
    ])
  }, [language])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getTranslation = (key: string): string => {
    return translations[key]?.[language] || translations[key]?.en || key
  }

  const sendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate agent response in selected language
    setTimeout(() => {
      const responseKeys = ["agentResponse1", "agentResponse2", "agentResponse3", "agentResponse4", "agentResponse5"]

      const randomResponseKey = responseKeys[Math.floor(Math.random() * responseKeys.length)]

      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getTranslation(randomResponseKey),
        sender: "agent",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, agentResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const quickReplies = [
    getTranslation("tellMePricing"),
    getTranslation("howAssessment"),
    getTranslation("helpChoosePlan"),
    getTranslation("scheduleDemo"),
  ]

  const handleQuickReply = (reply: string) => {
    setInputValue(reply)
  }

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    setShowLanguageMenu(false)
    // Save language preference to localStorage
    localStorage.setItem("inomax-chat-language", newLanguage)
  }

  // Load language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("inomax-chat-language") as Language
    if (savedLanguage && ["en", "fr", "de"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: "en", name: getTranslation("english"), flag: "🇺🇸" },
    { code: "fr", name: getTranslation("french"), flag: "🇫🇷" },
    { code: "de", name: getTranslation("german"), flag: "🇩🇪" },
  ]

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 border-0"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card
        className={`w-80 bg-gray-800 border-gray-700 shadow-2xl transition-all duration-300 ${
          isMinimized ? "h-16" : "h-96"
        }`}
      >
        <CardHeader className="pb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-sm">{getTranslation("supportTitle")}</CardTitle>
                <div className="flex items-center gap-1 text-xs opacity-90">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>{getTranslation("onlineNow")}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {/* Language Selector */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="w-8 h-8 p-0 hover:bg-white/20 text-white"
                >
                  <Globe className="w-4 h-4" />
                </Button>
                {showLanguageMenu && (
                  <div className="absolute top-full right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg min-w-[120px] z-10">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-700 transition-colors flex items-center gap-2 ${
                          language === lang.code ? "bg-gray-700 text-blue-400" : "text-gray-300"
                        } ${lang.code === "en" ? "rounded-t-lg" : ""} ${lang.code === "de" ? "rounded-b-lg" : ""}`}
                      >
                        <span className="text-base">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-8 h-8 p-0 hover:bg-white/20 text-white"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 p-0 hover:bg-white/20 text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${
                      message.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === "user" ? "bg-blue-500" : "bg-gray-600"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User className="w-3 h-3 text-white" />
                      ) : (
                        <Bot className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg p-2 text-sm ${
                        message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-100"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-gray-700 rounded-lg p-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <div className="text-xs text-gray-400 mb-2">{getTranslation("quickQuestions")}</div>
                <div className="flex flex-wrap gap-1">
                  {quickReplies.map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs h-6 px-2 bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <Separator className="bg-gray-700" />

            {/* Input Area */}
            <div className="p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={getTranslation("typePlaceholder")}
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-blue-500 hover:bg-blue-600 text-white border-0 px-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Contact Options */}
              <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-gray-700">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Phone className="w-3 h-3" />
                  <span>+41 79 705 70 37</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Mail className="w-3 h-3" />
                  <span>info@inomax.ai</span>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Click outside to close language menu */}
      {showLanguageMenu && <div className="fixed inset-0 z-0" onClick={() => setShowLanguageMenu(false)} />}
    </div>
  )
}
