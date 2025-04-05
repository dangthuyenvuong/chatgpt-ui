"use client"

import type React from "react"

import { useState, useEffect } from "react"
// Cập nhật import để thêm icon User
import {
  Search,
  Star,
  Clock,
  X,
  Compass,
  LayoutGrid,
  List,
  MoreVertical,
  Copy,
  Trash2,
  Edit,
  Plus,
  User,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { ChatTemplatesDialog } from "@/components/chat-templates-dialog"
import { CreateTemplateDialog } from "@/components/create-template-dialog"

type PersonalAIAgentsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectId: string
  onSelectTemplate: (templateId: string, projectId: string) => void
}

type ViewMode = "list" | "grid"

export function PersonalTemplatesDialog({
  open,
  onOpenChange,
  projectId,
  onSelectTemplate,
}: PersonalAIAgentsDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("recent")
  const [aiAgents, setAIAgents] = useState<any[]>([])
  const [aiAgentsDialogOpen, setAIAgentsDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [createAIAgentDialogOpen, setCreateAIAgentDialogOpen] = useState(false)

  // Generate some sample personal templates
  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoading(true)

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Cập nhật dữ liệu mẫu để thêm thông tin creator
      // Trong useEffect, cập nhật personalAIAgents để thêm trường creator
      const personalAIAgents = [
        {
          id: "personal-1",
          name: "My Marketing Plan",
          description: "Custom marketing plan AI agent with my brand guidelines",
          category: "Marketing",
          tags: ["Marketing", "Strategy", "Branding"],
          lastUsed: "2 days ago",
          isFavorite: true,
          isOfficial: false,
          creator: "You",
        },
        {
          id: "personal-2",
          name: "Blog Post Structure",
          description: "My preferred blog post structure with SEO guidelines",
          category: "Content",
          tags: ["Content", "SEO", "Writing"],
          lastUsed: "1 week ago",
          isFavorite: true,
          isOfficial: true,
        },
        {
          id: "personal-3",
          name: "Product Launch Checklist",
          description: "Comprehensive checklist for product launches",
          category: "Product",
          tags: ["Product", "Launch", "Marketing"],
          lastUsed: "3 weeks ago",
          isFavorite: false,
          isOfficial: true,
        },
        {
          id: "personal-4",
          name: "Social Media Calendar",
          description: "Monthly social media content planning AI agent",
          category: "Social Media",
          tags: ["Social Media", "Content", "Planning"],
          lastUsed: "1 month ago",
          isFavorite: false,
          isOfficial: false,
          creator: "Emma Thompson",
        },
        {
          id: "personal-5",
          name: "Customer Survey",
          description: "AI agent for gathering customer feedback",
          category: "Research",
          tags: ["Research", "Customer", "Feedback"],
          lastUsed: "2 months ago",
          isFavorite: false,
          isOfficial: true,
        },
        {
          id: "personal-6",
          name: "Email Newsletter",
          description: "Weekly newsletter AI agent with sections for news, updates, and promotions",
          category: "Email",
          tags: ["Email", "Newsletter", "Marketing"],
          lastUsed: "3 days ago",
          isFavorite: false,
          isOfficial: false,
          creator: "Michael Brown",
        },
        {
          id: "personal-7",
          name: "Project Timeline",
          description: "Project management timeline with milestones and deliverables",
          category: "Project Management",
          tags: ["Project", "Timeline", "Planning"],
          lastUsed: "5 days ago",
          isFavorite: true,
          isOfficial: true,
        },
        {
          id: "personal-8",
          name: "Customer Persona",
          description: "Detailed customer persona AI agent for marketing and product development",
          category: "Marketing",
          tags: ["Marketing", "Customer", "Research"],
          lastUsed: "2 weeks ago",
          isFavorite: false,
          isOfficial: false,
          creator: "You",
        },
      ]

      setAIAgents(personalAIAgents)
      setIsLoading(false)
    }

    if (open) {
      fetchTemplates()
    }
  }, [open])

  // Get all unique tags from templates
  const allTags = Array.from(new Set(aiAgents.flatMap((template) => template.tags))).sort()

  // Filter templates based on search query and selected tags
  const filteredAIAgents = aiAgents.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    // If no tags are selected, show all templates
    // Otherwise, check if the template has at least one of the selected tags
    const matchesTags = selectedTags.length === 0 || template.tags.some((tag: string) => selectedTags.includes(tag))

    return matchesSearch && matchesTags
  })

  // Sort templates based on active tab
  const sortedAIAgents = [...filteredAIAgents].sort((a, b) => {
    if (activeTab === "favorites") {
      return a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1
    }
    // For "recent" tab, we'll use the lastUsed field (in a real app, this would be a date)
    return 0
  })

  const handleSelectTemplate = (templateId: string) => {
    onSelectTemplate(templateId, projectId)
    onOpenChange(false)
  }

  const handleExploreTemplates = () => {
    // Close this dialog and open the main templates dialog
    onOpenChange(false)
    setAIAgentsDialogOpen(true)
  }

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) => {
      // If tag is already selected, remove it
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag)
      }
      // Otherwise, add it to the selection
      return [...prev, tag]
    })
  }

  const handleToggleFavorite = (templateId: string, currentStatus: boolean) => {
    setAIAgents((prev) =>
      prev.map((template) => (template.id === templateId ? { ...template, isFavorite: !currentStatus } : template)),
    )

    toast({
      title: currentStatus ? "Removed from favorites" : "Added to favorites",
      description: "AI agent has been updated",
      duration: 2000,
    })
  }

  const handleDuplicateTemplate = (templateId: string) => {
    const templateToDuplicate = aiAgents.find((t) => t.id === templateId)

    if (templateToDuplicate) {
      const duplicatedTemplate = {
        ...templateToDuplicate,
        id: `${templateToDuplicate.id}-copy-${Date.now()}`,
        name: `${templateToDuplicate.name} (Copy)`,
        lastUsed: "Just now",
        isFavorite: false,
        isOfficial: false, // Duplicated agents are never official agents
      }

      setAIAgents((prev) => [...prev, duplicatedTemplate])

      toast({
        title: "AI agent duplicated",
        description: "A copy has been created",
        duration: 2000,
      })
    }
  }

  const handleDeleteTemplate = (templateId: string) => {
    setAIAgents((prev) => prev.filter((template) => template.id !== templateId))

    toast({
      title: "AI agent deleted",
      description: "The AI agent has been removed",
      duration: 2000,
    })
  }

  const handleEditTemplate = (templateId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    // This would open an edit dialog in a real application
    toast({
      title: "Edit AI agent",
      description: "Edit functionality would open here",
      duration: 2000,
    })
  }

  const handleCreateNewAIAgent = () => {
    setCreateAIAgentDialogOpen(true)
  }

  const handleCreateAIAgent = (newTemplate: any) => {
    setAIAgents((prev) => [newTemplate, ...prev])
  }

  // Render templates based on view mode
  const renderTemplates = (templates: any[]) => {
    if (isLoading) {
      return viewMode === "list" ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-start gap-4 p-4 border rounded-lg">
              <Skeleton className="h-12 w-12 rounded-md" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 flex flex-col">
              <div className="flex items-start gap-4 mb-3">
                <Skeleton className="h-12 w-12 rounded-md flex-shrink-0" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-3 w-full mb-1" />
              <Skeleton className="h-3 w-full mb-3" />
              <Skeleton className="h-3" />
              <Skeleton className="h-3 w-full mb-3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      )
    }

    if (templates.length === 0) {
      return (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">No AI agents found</p>
          {searchQuery || selectedTags.length > 0 ? (
            <div className="flex flex-col items-center gap-2">
              {searchQuery && (
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear search
                </Button>
              )}
              {selectedTags.length > 0 && (
                <Button variant="outline" onClick={() => setSelectedTags([])}>
                  Clear tag filters
                </Button>
              )}
            </div>
          ) : (
            <Button onClick={handleExploreTemplates} className="gap-2">
              <Compass className="h-4 w-4" />
              Explore AI agents
            </Button>
          )}
        </div>
      )
    }

    return viewMode === "list" ? (
      <div className="space-y-4">
        {/* Create New AI Agent Item */}
        <div
          className="flex items-start gap-4 p-4 border-2 border-dashed border-primary/40 rounded-lg w-full text-left hover:bg-primary/5 transition-colors relative group cursor-pointer bg-gradient-to-r from-primary/5 to-transparent"
          onClick={handleCreateNewAIAgent}
        >
          <div className="h-14 w-14 rounded-md bg-primary/20 flex items-center justify-center text-primary shadow-sm">
            <Plus className="h-7 w-7" />
          </div>

          <div className="flex-1 py-1">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">Create New AI Agent</h3>
              </div>
              <p className="text-sm text-muted-foreground">Create a custom AI agent for your projects</p>
            </div>
          </div>
        </div>

        {/* Existing AI Agents */}
        {templates.map((template) => (
          <div
            key={template.id}
            className="flex items-start gap-4 p-4 border rounded-lg w-full text-left hover:bg-muted/50 transition-colors relative group"
          >
            {/* Avatar and content in one row */}
            <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center text-primary font-medium flex-shrink-0">
              {template.name.substring(0, 2).toUpperCase()}
            </div>

            <div className="flex-1 cursor-pointer" onClick={() => handleSelectTemplate(template.id)}>
              <div className="space-y-1">
                {/* Cập nhật badge System trong chế độ list view
                // Tìm đoạn code hiển thị tên và badge trong list view, thay thế bằng: */}
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{template.name}</h3>
                  {template.isOfficial && (
                    <Badge className="ml-1 text-xs bg-blue-600 hover:bg-blue-700 text-white">Official</Badge>
                  )}
                  {/* Edit button next to name */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => handleEditTemplate(template.id, e)}
                  >
                    <Edit className="h-3.5 w-3.5" />
                    <span className="sr-only">Edit AI agent</span>
                  </Button>
                </div>

                {/* Tags moved under name */}
                <div className="flex flex-wrap gap-1 mt-1">
                  {template.tags.slice(0, 3).map((tag: string) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleTagClick(tag)
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{template.description}</p>

                {/* Cập nhật phần hiển thị thông tin ở dưới trong list view
                // Tìm đoạn code hiển thị lastUsed và favorite trong list view, thay thế bằng: */}
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{template.lastUsed}</span>
                  </div>
                  {template.creator && !template.isOfficial && (
                    <div className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      <span>{template.creator}</span>
                    </div>
                  )}
                  {template.isFavorite && (
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-3.5 w-3.5 fill-yellow-400" />
                      <span>Favorite</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Three dots menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => handleToggleFavorite(template.id, template.isFavorite)}
                  className="flex items-center gap-2"
                >
                  <Star className={`h-4 w-4 ${template.isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`} />
                  {template.isFavorite ? "Remove from favorites" : "Add to favorites"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDuplicateTemplate(template.id)}
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="flex items-center gap-2 text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Create New AI Agent Item */}
        <div
          className="border-2 border-dashed border-primary/40 rounded-lg p-5 text-left hover:bg-primary/5 transition-colors flex flex-col h-full relative group cursor-pointer bg-gradient-to-b from-primary/5 to-transparent shadow-sm"
          onClick={handleCreateNewAIAgent}
        >
          <div className="mb-4">
            <div className="h-14 w-14 rounded-md bg-primary/20 flex items-center justify-center text-primary">
              <Plus className="h-7 w-7" />
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-lg">Create New AI Agent</h3>
          </div>
          <p className="text-sm text-muted-foreground flex-grow">Create a custom AI agent for your projects</p>
        </div>

        {templates.map((template) => (
          <div
            key={template.id}
            className="border rounded-lg p-4 text-left hover:bg-muted/50 transition-colors flex flex-col h-full relative group"
          >
            {/* Three dots menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => handleToggleFavorite(template.id, template.isFavorite)}
                  className="flex items-center gap-2"
                >
                  <Star className={`h-4 w-4 ${template.isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`} />
                  {template.isFavorite ? "Remove from favorites" : "Add to favorites"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDuplicateTemplate(template.id)}
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="flex items-center gap-2 text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex-1 flex flex-col cursor-pointer" onClick={() => handleSelectTemplate(template.id)}>
              {/* Avatar and name in one row */}
              <div className="flex items-start gap-4 mb-3">
                <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center text-primary font-medium flex-shrink-0">
                  {template.name.substring(0, 2).toUpperCase()}
                </div>

                {/* Cập nhật badge System trong chế độ grid view
                // Tìm đoạn code hiển thị tên và badge trong grid view, thay thế bằng: */}
                <div className="flex-1">
                  <div className="flex items-center flex-wrap">
                    <h3 className="font-medium">{template.name}</h3>
                    {template.isOfficial && (
                      <Badge className="ml-1 text-xs bg-blue-600 hover:bg-blue-700 text-white">Official</Badge>
                    )}
                  </div>

                  {/* Tags moved under name */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {template.tags.slice(0, 3).map((tag: string) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleTagClick(tag)
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-grow">{template.description}</p>

              {/* Cập nhật phần hiển thị thông tin ở dưới trong grid view
              // Tìm đoạn code hiển thị lastUsed và favorite trong grid view, thay thế bằng: */}
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{template.lastUsed}</span>
                </div>
                {template.creator && !template.isOfficial && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <User className="h-3.5 w-3.5 mr-1" />
                    <span>{template.creator}</span>
                  </div>
                )}
                {template.isFavorite && (
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-yellow-400" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-full h-screen flex flex-col p-0 gap-0 !border-none">
          <DialogClose className="fixed right-0 top-0 z-10">
            <div
              className="cursor-pointer absolute right-4 top-4 z-10 rounded-full p-2 bg-muted hover:bg-muted/80 transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </div>
          </DialogClose>
          <DialogHeader className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl">Your AI Agents</DialogTitle>
                <DialogDescription className="text-sm">
                  Select from your saved AI agents or explore the AI agent marketplace.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <Tabs defaultValue="recent" onValueChange={setActiveTab} className="flex flex-col flex-1 h-1">
            <div className="border-b">
              <div className="flex items-center justify-between px-6 h-12">
                {/* Search and Explore moved here */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search AI agents..."
                      className="pl-8 h-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1 h-7 w-7"
                        onClick={() => setSearchQuery("")}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Clear search</span>
                      </Button>
                    )}
                  </div>
                  <Button onClick={handleExploreTemplates} size="sm" className="gap-2">
                    <Compass className="h-4 w-4" />
                    Explore
                  </Button>
                </div>

                {/* Tabs and view toggle moved to the right */}
                <div className="flex items-center">
                  <TabsList className="justify-start h-12 p-0 bg-transparent">
                    <TabsTrigger
                      value="recent"
                      className="flex items-center gap-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary h-12"
                    >
                      <Clock className="h-4 w-4" />
                      Recent
                    </TabsTrigger>
                    <TabsTrigger
                      value="favorites"
                      className="flex items-center gap-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary h-12"
                    >
                      <Star className="h-4 w-4" />
                      Favorites
                    </TabsTrigger>
                  </TabsList>

                  <ToggleGroup
                    type="single"
                    value={viewMode}
                    onValueChange={(value) => value && setViewMode(value as ViewMode)}
                    className="border-none bg-transparent ml-2"
                  >
                    <ToggleGroupItem value="list" aria-label="List view" className="data-[state=on]:bg-muted">
                      <List className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="grid" aria-label="Grid view" className="data-[state=on]:bg-muted">
                      <LayoutGrid className="h-4 w-4" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
            </div>

            {/* Tags section - title removed */}
            {!isLoading && allTags.length > 0 && (
              <div className="border-b px-6 py-3">
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <ScrollArea className="flex-1">
              <div className="p-6">
                <TabsContent value="recent" className="mt-0">
                  {renderTemplates(sortedAIAgents)}
                </TabsContent>

                <TabsContent value="favorites" className="mt-0">
                  {renderTemplates(sortedAIAgents.filter((template) => template.isFavorite))}
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Main templates dialog that opens when clicking "Explore" */}
      <ChatTemplatesDialog
        open={aiAgentsDialogOpen}
        onOpenChange={setAIAgentsDialogOpen}
        projectId={projectId}
        onSelectTemplate={onSelectTemplate}
      />
      <CreateTemplateDialog
        open={createAIAgentDialogOpen}
        onOpenChange={setCreateAIAgentDialogOpen}
        onCreateTemplate={handleCreateAIAgent}
      />
    </>
  )
}

