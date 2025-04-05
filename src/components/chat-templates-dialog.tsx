"use client"

import { useState, useEffect } from "react"
import { X, Search, Star, Users, Plus, User } from "lucide-react"
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

interface ChatAIAgentsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectId: string
  onSelectTemplate: (templateId: string, projectId: string) => void
}

type SortOption = "newest" | "oldest" | "popular" | "rating"

type ChatAIAgent = {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  avatar: string
  rating: number
  users: number
  createdAt: string
  isOfficial?: boolean
  creator?: string
}

const chatAIAgents: ChatAIAgent[] = [
  {
    id: "1",
    name: "Development Plan",
    description: "This AI agent helps you create a development plan for your project.",
    category: "Development",
    avatar: "/placeholder.svg",
    rating: 4.5,
    users: 1000,
    createdAt: "2021-01-01",
    tags: ["Development", "Project Management"],
    isOfficial: true,
  },
  {
    id: "2",
    name: "Landing Page Builder",
    description: "This AI agent helps you create a landing page for your project.",
    category: "IT",
    avatar: "/placeholder.svg",
    rating: 4.5,
    users: 1000,
    createdAt: "2021-01-01",
    tags: ["Development", "Project Management"],
    creator: "Alex Johnson",
  },
  {
    id: "3",
    name: "Research Paper",
    description: "This AI agent helps you create a research paper for your project.",
    category: "Research",
    avatar: "/placeholder.svg",
    rating: 4.5,
    users: 1000,
    createdAt: "2021-01-01",
    tags: ["Research", "Project Management"],
    isOfficial: true,
  },
  {
    id: "4",
    name: "Bubble chat",
    description: "This AI agent helps you create a bubble chat for your project.",
    category: "IT",
    avatar: "/placeholder.svg",
    rating: 4.5,
    users: 1000,
    createdAt: "2021-01-01",
    tags: ["IT", "Project Management"],
    creator: "Maria Garcia",
  },
  {
    id: "5",
    name: "Email Template",
    description: "This AI agent helps you create an email template for your project.",
    category: "Marketing",
    avatar: "/placeholder.svg",
    rating: 4.5,
    users: 1000,
    createdAt: "2021-01-01",
    tags: ["Marketing", "Project Management"],
    isOfficial: true,
  },
  {
    id: "6",
    name: "Enterprise UI",
    description: "This AI agent helps you create effective content and strategies for your business needs.",
    category: "IT",
    avatar: "/placeholder.svg",
    rating: 4.5,
    users: 1000,
    createdAt: "2021-01-01",
    tags: ["IT", "Project Management"],
    creator: "David Kim",
  },
  {
    id: "7",
    name: "Code Documentation",
    description: "This AI agent helps you create effective content and strategies for your business needs.",
    category: "IT",
    avatar: "/placeholder.svg",
    rating: 4.5,
    users: 1000,
    createdAt: "2021-01-01",
    tags: ["IT", "Project Management"],
    isOfficial: true,
  },
  {
    id: "8",
    name: "Task Management",
    description: "This AI agent helps you create effective content and strategies for your business needs.",
    category: "IT",
    avatar: "/placeholder.svg",
    rating: 4.5,
    users: 1000,
    createdAt: "2021-01-01",
    tags: ["Project Management"],
    creator: "Sarah Wilson",
  },
  {
    id: "9",
    name: "Code Review",
    description: "This AI agent helps you create effective content and strategies for your business needs.",
    category: "IT",
    avatar: "/placeholder.svg",
    rating: 4.5,
    users: 1000,
    createdAt: "2021-01-01",
    tags: ["Project Management"],
    creator: "James Lee",
  },
  {
    id: "10",
    name: "Unitest",
    description: "This AI agent helps you create effective content and strategies for your business needs.",
    category: "IT",
    avatar: "/placeholder.svg",
    rating: 4.5,
    users: 1000,
    createdAt: "2021-01-01",
    tags: ["Project Management"],
    isOfficial: true,
  },
]

// Mock categories
const categories = [
  "All",
  "Content",
  "Social Media",
  "Landing Page",
  "Content",
  "Social Media",
  "E-commerce",
  "Analytics",
  "Customer Support",
  "Development",
]

export function ChatTemplatesDialog({ open, onOpenChange, projectId, onSelectTemplate }: ChatAIAgentsDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("popular")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [aiAgents, setAIAgents] = useState<ChatAIAgent[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Mock data for templates
  useEffect(() => {
    // Simulate API call to fetch templates
    const fetchTemplates = async () => {
      setIsLoading(true)

      // Reduce the simulated network delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Mock data
      const mockAIAgents: ChatAIAgent[] = Array.from({ length: 24 }).map((_, index) => ({
        id: `template-${index + 1}`,
        name: [
          "Marketing Campaign Planner",
          "SEO Content Optimizer",
          "Landing Page Builder",
          "Social Media Calendar",
          "Customer Support Bot",
          "Product Description Generator",
        ][index % 6],
        description: "This AI agent helps you create effective content and strategies for your business needs.",
        category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
        avatar: `/placeholder.svg?height=80&width=80&text=${index + 1}`,
        rating: 3 + Math.random() * 2,
        users: Math.floor(Math.random() * 10000),
        createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
        isOfficial: index % 3 === 0, // Every third item is a system AI agent
      }))

      setAIAgents(chatAIAgents)
      setIsLoading(false)
    }

    if (open) {
      fetchTemplates()
    }
  }, [open, categories])

  // Filter and sort templates
  const filteredAIAgents = aiAgents.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === null || selectedCategory === "All" || template.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const sortedAIAgents = [...filteredAIAgents].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case "popular":
        return b.users - a.users
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  // Format number of users
  const formatUsers = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full w-full flex h-screen p-0 m-0 bg-background text-foreground !border-none">
        <DialogClose className="fixed right-0 top-0 z-10">
          <div
            className="cursor-pointer absolute right-4 top-4 z-10 rounded-full p-2 bg-muted hover:bg-muted/80 transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </div>
        </DialogClose>
        <div className="flex flex-col h-full w-full mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <h2 className="text-xl font-semibold">AI Agents</h2>
              <p className="text-sm text-muted-foreground">Choose an AI agent to add to your project</p>
            </div>
          </div>

          {/* Search and filters */}
          <div className="p-4 border-b space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search AI agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="w-full md:w-64">
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <span className="mr-2">Sort by:</span>
                      <SelectValue placeholder="Sort by" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={
                    selectedCategory === category || (category === "All" && selectedCategory === null)
                      ? "default"
                      : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category === "All" ? null : category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Templates grid */}
          <div className="flex-1 overflow-y-auto p-4">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="border rounded-lg p-4 flex flex-col h-[180px] animate-pulse">
                    <div className="flex items-start gap-4 mb-3">
                      <Skeleton className="h-12 w-12 rounded-md flex-shrink-0" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                    <Skeleton className="h-3 w-full mb-1" />
                    <Skeleton className="h-3 w-full mb-3" />
                    <div className="flex justify-between mt-auto">
                      <Skeleton className="h-3 w-1/4" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : sortedAIAgents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sortedAIAgents.map((template) => (
                  <div
                    key={template.id}
                    className="border rounded-lg p-4 text-left hover:bg-muted/50 transition-colors flex flex-col h-full relative group"
                    onClick={() => onSelectTemplate(template.id, projectId)}
                  >
                    {/* Avatar, name and category in one row */}
                    <div className="flex items-start gap-4 mb-3">
                      {/* Avatar */}
                      <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center text-primary font-medium flex-shrink-0">
                        {template.name.substring(0, 2).toUpperCase()}
                      </div>

                      {/* Name and tags */}
                      <div className="flex-1">
                        <div className="flex items-center flex-wrap">
                          <h3 className="font-medium">{template.name}</h3>
                          {template.isOfficial && (
                            <Badge className="ml-1 text-xs bg-blue-600 hover:bg-blue-700 text-white">Official</Badge>
                          )}
                        </div>

                        {/* Tags moved under name */}
                        <div className="flex flex-wrap gap-1 mt-1">
                          {template.tags &&
                            template.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-grow">{template.description}</p>

                    {/* Rating and users */}
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm">{template.rating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        <span className="text-sm">{formatUsers(template.users)}</span>
                      </div>
                      {template.creator && (
                        <div className="flex items-center text-muted-foreground">
                          <User className="h-4 w-4 mr-1" />
                          <span className="text-sm">{template.creator}</span>
                        </div>
                      )}
                      <Button size="sm" className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <div className="text-center">
                  <p className="mb-2">No AI agents found matching your criteria</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory(null)
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

