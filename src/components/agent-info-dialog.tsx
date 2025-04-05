"use client"

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Calendar, Info, Zap, CheckCircle2, MessageSquare, Copy, ArrowRight, Sparkles } from "lucide-react"
import type { AIAgent } from "@/components/chat-interface"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { useState } from "react"

interface AgentInfoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  agent: AIAgent | null
  onStartChat?: (agentId: string) => void
}

export function AgentInfoDialog({ open, onOpenChange, agent, onStartChat }: AgentInfoDialogProps) {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null)

  if (!agent) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  // Sample capabilities based on agent category
  const getAgentCapabilities = (category: string | undefined) => {
    const commonCapabilities = [
      "Natural language understanding",
      "Context-aware responses",
      "Memory of conversation history",
    ]

    const categoryCapabilities: Record<string, string[]> = {
      productivity: [
        "Task organization and prioritization",
        "Time management suggestions",
        "Project planning assistance",
        "Workflow optimization",
      ],
      coding: [
        "Code review and suggestions",
        "Debugging assistance",
        "Programming language expertise",
        "Software architecture guidance",
      ],
      writing: [
        "Content creation and editing",
        "Grammar and style suggestions",
        "Creative writing assistance",
        "Document formatting",
      ],
      design: [
        "Design principles guidance",
        "Color scheme suggestions",
        "Layout optimization",
        "UI/UX recommendations",
      ],
      marketing: [
        "Marketing strategy development",
        "Content calendar planning",
        "Campaign performance analysis",
        "Target audience insights",
      ],
      data: [
        "Data analysis and visualization",
        "Pattern recognition",
        "Statistical insights",
        "Data cleaning recommendations",
      ],
      education: [
        "Curriculum development",
        "Learning resource suggestions",
        "Assessment creation",
        "Teaching methodology guidance",
      ],
      finance: [
        "Financial planning assistance",
        "Investment strategy suggestions",
        "Budget optimization",
        "Financial literacy education",
      ],
      health: [
        "Wellness plan suggestions",
        "Nutrition guidance",
        "Exercise recommendations",
        "Health tracking assistance",
      ],
    }

    return [
      ...commonCapabilities,
      ...(category && categoryCapabilities[category] ? categoryCapabilities[category] : []),
    ]
  }

  // Sample use cases based on agent category
  const getAgentUseCases = (category: string | undefined) => {
    const categoryUseCases: Record<string, string[]> = {
      productivity: [
        "Creating a weekly schedule",
        "Organizing project tasks",
        "Setting up a productivity system",
        "Managing deadlines",
      ],
      coding: [
        "Debugging a complex function",
        "Learning a new programming language",
        "Optimizing code performance",
        "Understanding design patterns",
      ],
      writing: [
        "Drafting a blog post",
        "Editing a research paper",
        "Creating marketing copy",
        "Developing a content strategy",
      ],
      design: [
        "Selecting a color palette",
        "Improving website layout",
        "Creating accessible designs",
        "Developing a brand identity",
      ],
      marketing: [
        "Planning a social media campaign",
        "Analyzing marketing metrics",
        "Creating email newsletters",
        "Developing customer personas",
      ],
      data: [
        "Analyzing sales trends",
        "Visualizing complex datasets",
        "Extracting insights from user data",
        "Preparing data reports",
      ],
      education: [
        "Creating lesson plans",
        "Developing student assessments",
        "Finding educational resources",
        "Adapting content for different learning styles",
      ],
      finance: [
        "Creating a personal budget",
        "Planning retirement savings",
        "Understanding investment options",
        "Managing business expenses",
      ],
      health: [
        "Developing a meal plan",
        "Creating a workout routine",
        "Tracking health metrics",
        "Building healthy habits",
      ],
    }

    return category && categoryUseCases[category] ? categoryUseCases[category] : []
  }

  const capabilities = getAgentCapabilities(agent.category)
  const useCases = getAgentUseCases(agent.category)

  // Example prompts based on agent category
  const examplePrompts = [
    `Help me create a plan for my ${agent.category || "project"}`,
    `What are the best practices for ${agent.category || "this field"}?`,
    `I need advice on improving my ${agent.category || "workflow"}`,
    `Can you explain how to approach this ${agent.category || "task"}?`,
  ]

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt)
    toast({
      title: "Prompt copied",
      description: "The prompt has been copied to your clipboard.",
    })
  }

  const handleUsePrompt = (prompt: string) => {
    setSelectedPrompt(prompt)
    if (onStartChat) {
      onStartChat(agent.id)
      onOpenChange(false)
      toast({
        title: "Prompt selected",
        description: "The prompt has been added to your message input.",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden rounded-xl">
        <div className="flex flex-col h-full max-h-[85vh]">
          {/* Header with gradient background */}
          <div className="p-6 border-b relative overflow-hidden bg-background">
            {/* Subtle decorative line at top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary/10"></div>

            <div className="flex items-start gap-5 relative z-10">
              {/* Avatar with glow effect */}
              <div className="h-20 w-20 rounded-xl bg-primary/10 flex items-center justify-center text-2xl font-bold relative group border border-border/50">
                <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {agent.name.substring(0, 2).toUpperCase()}
                {agent.isOfficial && (
                  <div className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full p-1 shadow-sm">
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <DialogTitle className="text-2xl font-bold flex items-center gap-2 mb-1">
                  {agent.name}
                  {agent.isOfficial && (
                    <Badge className="bg-blue-600 text-white hover:bg-blue-700 ml-2">Official</Badge>
                  )}
                </DialogTitle>

                <DialogDescription className="text-base text-foreground/90 font-medium">
                  {agent.description}
                </DialogDescription>

                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <div className="flex items-center text-sm font-medium text-muted-foreground">
                    <Star className="h-4 w-4 mr-1.5 text-yellow-500 fill-yellow-500" />
                    <span>{agent.rating}/5</span>
                  </div>

                  <div className="flex items-center text-sm font-medium text-muted-foreground">
                    <Users className="h-4 w-4 mr-1.5" />
                    <span>{(agent.usersCount || 0).toLocaleString()} users</span>
                  </div>

                  {agent.dateAdded && (
                    <div className="flex items-center text-sm font-medium text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1.5" />
                      <span>Added {formatDate(agent.dateAdded)}</span>
                    </div>
                  )}

                  {agent.category && (
                    <Badge variant="outline" className="capitalize font-medium">
                      {agent.category}
                    </Badge>
                  )}
                </div>

                {agent.creator && (
                  <p className="mt-3 text-sm font-medium text-foreground/70 flex items-center">
                    Created by <span className="font-semibold ml-1">{agent.creator}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Tabs content area with scrolling */}
          <div className="flex-1 overflow-y-auto">
            <Tabs defaultValue="about" className="w-full">
              <div className="px-6 py-2 border-b sticky top-0 bg-background z-10">
                <TabsList>
                  <TabsTrigger value="about" className="text-sm">
                    <Info className="h-4 w-4 mr-2" />
                    About
                  </TabsTrigger>
                  <TabsTrigger value="capabilities" className="text-sm">
                    <Zap className="h-4 w-4 mr-2" />
                    Capabilities
                  </TabsTrigger>
                  <TabsTrigger value="examples" className="text-sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Examples
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="about" className="mt-0 space-y-6">
                  <div className="rounded-lg p-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                      <Sparkles className="h-5 w-5 text-primary" />
                      About this AI Agent
                    </h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{agent.description}</p>
                  </div>

                  {useCases.length > 0 && (
                    <div className="rounded-lg p-4 border bg-muted/10">
                      <h3 className="text-lg font-semibold mb-3">Common Use Cases</h3>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {useCases.map((useCase, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 p-2 rounded-md hover:bg-muted/30 transition-colors"
                          >
                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <span className="text-foreground/90">{useCase}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="capabilities" className="mt-0 space-y-6">
                  <div className="rounded-lg p-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                      <Zap className="h-5 w-5 text-primary" />
                      Capabilities
                    </h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      This AI agent has been trained to assist with {agent.category || "various"} tasks and can help you
                      in the following ways:
                    </p>
                  </div>

                  <div className="grid gap-2">
                    {capabilities.map((capability, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-md border-b border-border/40 last:border-0 transition-colors"
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <div>
                          <span className="text-foreground/90 font-medium">{capability}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="examples" className="mt-0 space-y-6">
                  <div className="rounded-lg p-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      Example Prompts
                    </h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      Try these example prompts to get started with {agent.name}:
                    </p>
                  </div>

                  <div className="grid gap-2">
                    {examplePrompts.map((prompt, index) => (
                      <div
                        key={index}
                        className="p-3 bg-muted/10 rounded-md border border-border/50 hover:bg-muted/20 transition-all cursor-pointer group"
                      >
                        <div className="flex justify-between items-start">
                          <p className="font-medium text-foreground/90 group-hover:text-foreground transition-colors">
                            {prompt}
                          </p>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleCopyPrompt(prompt)
                              }}
                            >
                              <Copy className="h-4 w-4" />
                              <span className="sr-only">Copy prompt</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleUsePrompt(prompt)
                              }}
                            >
                              <ArrowRight className="h-4 w-4" />
                              <span className="sr-only">Use prompt</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Footer with action buttons */}
          <div className="p-4 border-t bg-background sticky bottom-0">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {agent.category && <span className="capitalize">{agent.category} AI Assistant</span>}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    if (onStartChat) {
                      onStartChat(agent.id)
                      onOpenChange(false)
                    }
                  }}
                  className="gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Start Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

