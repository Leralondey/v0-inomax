"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Circle, AlertCircle, Trophy } from "lucide-react"
import { useState } from "react"

interface ProgressStep {
  id: string
  title: string
  description: string
  completed: boolean
  required: boolean
  points: number
}

export default function AccountProgress() {
  const [steps, setSteps] = useState<ProgressStep[]>([
    {
      id: "basic-info",
      title: "Basic Information",
      description: "Complete your profile with company details",
      completed: true,
      required: true,
      points: 20,
    },
    {
      id: "phone-verification",
      title: "Phone Verification",
      description: "Verify your phone number for security",
      completed: true,
      required: true,
      points: 15,
    },
    {
      id: "profile-verification",
      title: "Profile Verification",
      description: "Verify your professional profile",
      completed: false,
      required: true,
      points: 25,
    },
    {
      id: "document-upload",
      title: "Document Upload",
      description: "Upload business documents for analysis",
      completed: false,
      required: false,
      points: 20,
    },
    {
      id: "assessment-complete",
      title: "Complete Assessment",
      description: "Finish the business evaluation questionnaire",
      completed: false,
      required: true,
      points: 20,
    },
  ])

  const completedSteps = steps.filter((step) => step.completed).length
  const totalSteps = steps.length
  const completedPoints = steps.filter((step) => step.completed).reduce((sum, step) => sum + step.points, 0)
  const totalPoints = steps.reduce((sum, step) => sum + step.points, 0)
  const progressPercentage = Math.round((completedPoints / totalPoints) * 100)

  const getStepIcon = (step: ProgressStep) => {
    if (step.completed) {
      return <CheckCircle className="w-5 h-5 text-green-400" />
    }
    if (step.required && !step.completed) {
      return <AlertCircle className="w-5 h-5 text-orange-400" />
    }
    return <Circle className="w-5 h-5 text-gray-500" />
  }

  const getNextAction = () => {
    const nextStep = steps.find((step) => !step.completed && step.required)
    if (!nextStep) return null

    const actions = {
      "profile-verification": "Verify Profile",
      "document-upload": "Upload Documents",
      "assessment-complete": "Start Assessment",
    }

    return {
      text: actions[nextStep.id as keyof typeof actions] || "Continue",
      step: nextStep,
    }
  }

  const nextAction = getNextAction()

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-white">Account Completion</CardTitle>
            {progressPercentage === 100 && (
              <Badge className="bg-green-600 text-white border-green-500">
                <Trophy className="w-4 h-4 mr-1" />
                Complete
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-300">
              <span>
                {completedSteps} of {totalSteps} steps completed
              </span>
              <span>{progressPercentage}% complete</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">
                {completedPoints} / {totalPoints} points earned
              </span>
              {progressPercentage === 100 && (
                <span className="text-green-400 font-medium">🎉 All done! You're ready to go!</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Steps List */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Completion Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="flex items-start gap-4 p-4 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex-shrink-0 mt-1">{getStepIcon(step)}</div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-medium ${step.completed ? "text-green-400" : "text-white"}`}>{step.title}</h3>
                    {step.required && (
                      <Badge variant="outline" className="text-xs border-orange-500 text-orange-400">
                        Required
                      </Badge>
                    )}
                    <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                      +{step.points} pts
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-300">{step.description}</p>
                </div>
                {step.completed && <Badge className="bg-green-600 text-white border-green-500">Completed</Badge>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Action */}
      {nextAction && (
        <Card className="border-orange-700 bg-orange-900/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-orange-300 mb-1">Next Step</h3>
                <p className="text-sm text-orange-200">{nextAction.step.description}</p>
              </div>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">{nextAction.text}</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completion Reward */}
      {progressPercentage === 100 && (
        <Card className="border-green-700 bg-green-900/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <Trophy className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <h3 className="font-bold text-green-300 mb-2">Congratulations! 🎉</h3>
              <p className="text-green-200 mb-4">
                Your profile is 100% complete. You now have access to all premium features and can generate
                comprehensive reports.
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">Generate Your First Report</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
