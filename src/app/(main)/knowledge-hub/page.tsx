"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  Trash2,
  Edit,
  Eye,
  RefreshCw,
  LayoutDashboard,
  Database,
  Globe,
  Bot,
  FileText,
  Clock,
  User,
  Check,
  AlertCircle,
  Clock3,
  FileUp,
  Zap,
  Calendar,
  FileIcon,
  Tag,
  X,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function KnowledgeHubPage() {
  // Thêm state cho phân trang
  const [itemsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("data-training")
  const [activeSourcesTab, setActiveSourcesTab] = useState("sources")
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [tagFilter, setTagFilter] = useState<string[]>([])
  const [typeFilter, setTypeFilter] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [searchTerm, setSearchTerm] = useState("")

  // State cho dialog Add Source
  const [showAddSourceDialog, setShowAddSourceDialog] = useState(false)
  const [showAddDatasetDialog, setShowAddDatasetDialog] = useState(false)

  // State cho tag autocomplete
  const [openTagInput, setOpenTagInput] = useState<string | null>(null)
  const [tagInputValue, setTagInputValue] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Sample data for dashboard stats
  const dashboardStats = [
    { title: "Total Knowledge Sources", value: "12", icon: FileText, change: "+3", period: "this month" },
    { title: "Training Datasets", value: "5", icon: Database, change: "+1", period: "this month" },
    { title: "API Endpoints", value: "8", icon: Globe, change: "+2", period: "this month" },
    { title: "AI Agents", value: "4", icon: Bot, change: "+1", period: "this month" },
  ]

  // Sample data for recent activities
  const recentActivities = [
    {
      id: "1",
      action: "Added new knowledge source",
      item: "Marketing Campaign Guidelines",
      user: "John Doe",
      time: "2 hours ago",
    },
    {
      id: "2",
      action: "Created new dataset",
      item: "Marketing Assistant Dataset",
      user: "Jane Smith",
      time: "5 hours ago",
    },
    {
      id: "3",
      action: "Connected new API endpoint",
      item: "Customer Database API",
      user: "Mike Johnson",
      time: "Yesterday",
    },
    {
      id: "4",
      action: "Trained new AI agent",
      item: "Marketing Specialist Agent",
      user: "Sarah Williams",
      time: "2 days ago",
    },
    {
      id: "5",
      action: "Updated knowledge source",
      item: "Product Specifications",
      user: "David Lee",
      time: "3 days ago",
    },
    {
      id: "6",
      action: "Deleted dataset",
      item: "Outdated Customer Queries",
      user: "Emily Chen",
      time: "4 days ago",
    },
    {
      id: "7",
      action: "Modified API endpoint",
      item: "Inventory Management API",
      user: "Robert Kim",
      time: "5 days ago",
    },
    {
      id: "8",
      action: "Retrained AI agent",
      item: "Technical Support Assistant",
      user: "Lisa Wang",
      time: "1 week ago",
    },
    {
      id: "9",
      action: "Imported knowledge source",
      item: "Competitor Analysis Report",
      user: "James Wilson",
      time: "1 week ago",
    },
    {
      id: "10",
      action: "Shared dataset",
      item: "Customer Feedback Collection",
      user: "Maria Garcia",
      time: "2 weeks ago",
    },
  ]

  // Sample users
  const users = [
    { id: "1", name: "John Doe", email: "john.doe@example.com", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "2", name: "Jane Smith", email: "jane.smith@example.com", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "3", name: "Mike Johnson", email: "mike.johnson@example.com", avatar: "/placeholder.svg?height=32&width=32" },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    { id: "5", name: "David Lee", email: "david.lee@example.com", avatar: "/placeholder.svg?height=32&width=32" },
  ]

  // Sample data for knowledge sources with 10 items and various statuses
  const knowledgeSources = [
    {
      id: "1",
      name: "Product Documentation",
      type: "Document",
      format: "PDF",
      size: "2.4 MB",
      dateAdded: "2023-10-15",
      status: "Processed",
      dataCount: 156,
      tags: ["product", "documentation", "guide"],
      uploadedBy: users[0],
    },
    {
      id: "2",
      name: "Customer Support FAQ",
      type: "Document",
      format: "DOCX",
      size: "1.8 MB",
      dateAdded: "2023-10-10",
      status: "Processed",
      dataCount: 89,
      tags: ["support", "faq", "customer"],
      uploadedBy: users[1],
    },
    {
      id: "3",
      name: "API Documentation",
      type: "Document",
      format: "HTML",
      size: "3.2 MB",
      dateAdded: "2023-10-05",
      status: "Processing",
      dataCount: 124,
      tags: ["api", "technical", "developer"],
      uploadedBy: users[2],
    },
    {
      id: "4",
      name: "Sales Training Materials",
      type: "Document",
      format: "PPTX",
      size: "5.7 MB",
      dateAdded: "2023-09-28",
      status: "Ready",
      dataCount: 78,
      tags: ["sales", "training", "internal"],
      uploadedBy: users[3],
    },
    {
      id: "5",
      name: "Company Website",
      type: "Website",
      format: "URL",
      size: "N/A",
      dateAdded: "2023-09-20",
      status: "Processed",
      dataCount: 215,
      tags: ["website", "public", "marketing"],
      uploadedBy: users[4],
    },
    {
      id: "6",
      name: "Customer Feedback Survey",
      type: "Document",
      format: "XLSX",
      size: "1.2 MB",
      dateAdded: "2023-09-15",
      status: "New",
      dataCount: 42,
      tags: ["feedback", "customer", "survey"],
      uploadedBy: users[0],
    },
    {
      id: "7",
      name: "Product Roadmap",
      type: "Document",
      format: "PDF",
      size: "3.5 MB",
      dateAdded: "2023-09-10",
      status: "Processing",
      dataCount: 67,
      tags: ["product", "roadmap", "internal"],
      uploadedBy: users[1],
    },
    {
      id: "8",
      name: "Competitor Analysis",
      type: "Document",
      format: "DOCX",
      size: "2.1 MB",
      dateAdded: "2023-09-05",
      status: "Ready",
      dataCount: 93,
      tags: ["competitor", "analysis", "market"],
      uploadedBy: users[2],
    },
    {
      id: "9",
      name: "Technical Specifications",
      type: "Document",
      format: "PDF",
      size: "4.3 MB",
      dateAdded: "2023-08-28",
      status: "Processed",
      dataCount: 182,
      tags: ["technical", "specifications", "product"],
      uploadedBy: users[3],
    },
    {
      id: "10",
      name: "User Interviews",
      type: "Audio",
      format: "MP3",
      size: "120 MB",
      dateAdded: "2023-08-20",
      status: "New",
      dataCount: 28,
      tags: ["user", "interviews", "research"],
      uploadedBy: users[4],
    },
  ]

  // Sample data for training datasets with fine-tuning information
  const trainingDatasets = [
    {
      id: "1",
      name: "Customer Support Dataset",
      description: "Training data for customer support AI assistant",
      sources: ["Customer Support FAQ", "Product Documentation"],
      dateCreated: "2023-10-18",
      lastUpdated: "2023-10-20",
      status: "Ready",
      size: "4.2 MB",
      dataCount: 245,
      tags: ["customer", "support", "assistant"],
      uploadedBy: users[0],
      modelType: "GPT-3.5",
      epochs: 3,
      learningRate: "5e-5",
      accuracy: "87%",
      lastFineTuned: "2023-10-22",
    },
    {
      id: "2",
      name: "Developer Documentation Dataset",
      description: "Training data for developer documentation assistant",
      sources: ["API Documentation", "Product Documentation"],
      dateCreated: "2023-10-12",
      lastUpdated: "2023-10-15",
      status: "Ready",
      size: "5.0 MB",
      dataCount: 280,
      tags: ["developer", "documentation", "technical"],
      uploadedBy: users[1],
      modelType: "GPT-4",
      epochs: 2,
      learningRate: "3e-5",
      accuracy: "92%",
      lastFineTuned: "2023-10-16",
    },
    {
      id: "3",
      name: "Sales Assistant Dataset",
      description: "Training data for sales AI assistant",
      sources: ["Sales Training Materials", "Company Website"],
      dateCreated: "2023-10-01",
      lastUpdated: "2023-10-05",
      status: "Processing",
      size: "5.7 MB",
      dataCount: 293,
      tags: ["sales", "assistant", "training"],
      uploadedBy: users[2],
      modelType: "GPT-3.5",
      epochs: 4,
      learningRate: "4e-5",
      accuracy: "In progress",
      lastFineTuned: "In progress",
    },
    {
      id: "4",
      name: "Marketing Campaign Dataset",
      description: "Training data for marketing campaign optimization",
      sources: ["Marketing Campaign Guidelines", "Customer Feedback Survey"],
      dateCreated: "2023-09-25",
      lastUpdated: "2023-09-28",
      status: "Processed",
      size: "3.8 MB",
      dataCount: 176,
      tags: ["marketing", "campaign", "optimization"],
      uploadedBy: users[3],
      modelType: "GPT-3.5",
      epochs: 3,
      learningRate: "5e-5",
      accuracy: "85%",
      lastFineTuned: "2023-09-30",
    },
    {
      id: "5",
      name: "Product Recommendation Dataset",
      description: "Training data for product recommendation engine",
      sources: ["Product Documentation", "Customer Feedback Survey"],
      dateCreated: "2023-09-18",
      lastUpdated: "2023-09-20",
      status: "Ready",
      size: "6.2 MB",
      dataCount: 312,
      tags: ["product", "recommendation", "engine"],
      uploadedBy: users[4],
      modelType: "GPT-4",
      epochs: 2,
      learningRate: "3e-5",
      accuracy: "91%",
      lastFineTuned: "2023-09-22",
    },
    {
      id: "6",
      name: "Technical Support Dataset",
      description: "Training data for technical support chatbot",
      sources: ["Technical Specifications", "API Documentation"],
      dateCreated: "2023-09-10",
      lastUpdated: "2023-09-15",
      status: "New",
      size: "4.5 MB",
      dataCount: 198,
      tags: ["technical", "support", "chatbot"],
      uploadedBy: users[0],
      modelType: "Not selected",
      epochs: 0,
      learningRate: "Not set",
      accuracy: "Not available",
      lastFineTuned: "Not started",
    },
    {
      id: "7",
      name: "Market Analysis Dataset",
      description: "Training data for market trend analysis",
      sources: ["Competitor Analysis", "Sales Training Materials"],
      dateCreated: "2023-09-05",
      lastUpdated: "2023-09-08",
      status: "Processing",
      size: "7.1 MB",
      dataCount: 345,
      tags: ["market", "analysis", "trends"],
      uploadedBy: users[1],
      modelType: "GPT-3.5",
      epochs: 3,
      learningRate: "4e-5",
      accuracy: "In progress",
      lastFineTuned: "In progress",
    },
    {
      id: "8",
      name: "User Behavior Dataset",
      description: "Training data for user behavior prediction",
      sources: ["User Interviews", "Company Website"],
      dateCreated: "2023-08-28",
      lastUpdated: "2023-09-01",
      status: "Processed",
      size: "8.3 MB",
      dataCount: 421,
      tags: ["user", "behavior", "prediction"],
      uploadedBy: users[2],
      modelType: "GPT-4",
      epochs: 2,
      learningRate: "3e-5",
      accuracy: "89%",
      lastFineTuned: "2023-09-03",
    },
    {
      id: "9",
      name: "Product Roadmap Dataset",
      description: "Training data for product development planning",
      sources: ["Product Roadmap", "Technical Specifications"],
      dateCreated: "2023-08-20",
      lastUpdated: "2023-08-25",
      status: "Ready",
      size: "3.9 MB",
      dataCount: 187,
      tags: ["product", "roadmap", "planning"],
      uploadedBy: users[3],
      modelType: "GPT-3.5",
      epochs: 3,
      learningRate: "5e-5",
      accuracy: "86%",
      lastFineTuned: "2023-08-27",
    },
    {
      id: "10",
      name: "Customer Feedback Dataset",
      description: "Training data for sentiment analysis",
      sources: ["Customer Feedback Survey", "User Interviews"],
      dateCreated: "2023-08-15",
      lastUpdated: "2023-08-18",
      status: "New",
      size: "5.2 MB",
      dataCount: 267,
      tags: ["customer", "feedback", "sentiment"],
      uploadedBy: users[4],
      modelType: "Not selected",
      epochs: 0,
      learningRate: "Not set",
      accuracy: "Not available",
      lastFineTuned: "Not started",
    },
  ]

  // Sample data for API endpoints
  const apiEndpoints = [
    {
      id: "1",
      name: "Customer Database API",
      url: "https://api.example.com/customers",
      status: "Active",
      lastSync: "1 hour ago",
      dataPoints: 1250,
    },
    {
      id: "2",
      name: "Product Catalog API",
      url: "https://api.example.com/products",
      status: "Active",
      lastSync: "3 hours ago",
      dataPoints: 850,
    },
    {
      id: "3",
      name: "Sales Analytics API",
      url: "https://api.example.com/sales",
      status: "Inactive",
      lastSync: "2 days ago",
      dataPoints: 3200,
    },
  ]

  // Sample data for AI agents
  const aiAgents = [
    {
      id: "1",
      name: "Customer Support Agent",
      description: "Handles customer inquiries and support tickets",
      datasets: ["Customer Support Dataset"],
      status: "Active",
      lastTrained: "2 days ago",
    },
    {
      id: "2",
      name: "Developer Assistant",
      description: "Provides code examples and technical documentation",
      datasets: ["Developer Documentation Dataset"],
      status: "Active",
      lastTrained: "5 days ago",
    },
    {
      id: "3",
      name: "Sales Assistant",
      description: "Helps with sales inquiries and product recommendations",
      datasets: ["Sales Assistant Dataset"],
      status: "Training",
      lastTrained: "In progress",
    },
  ]

  // Status badge configuration - all solid with white text
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ready":
        return { bgColor: "bg-green-600", icon: Check }
      case "Processed":
        return { bgColor: "bg-blue-600", icon: Check }
      case "Processing":
        return { bgColor: "bg-amber-500", icon: Clock3 }
      case "New":
        return { bgColor: "bg-purple-600", icon: FileUp }
      default:
        return { bgColor: "bg-slate-500", icon: AlertCircle }
    }
  }

  // Get all unique tags
  const allTags = useMemo(() => {
    const sourceTags = knowledgeSources.flatMap((source) => source.tags)
    const datasetTags = trainingDatasets.flatMap((dataset) => dataset.tags || [])
    return Array.from(new Set([...sourceTags, ...datasetTags])).sort()
  }, [knowledgeSources, trainingDatasets])

  // Get all unique types
  const allTypes = useMemo(() => {
    return Array.from(new Set(knowledgeSources.map((source) => source.type))).sort()
  }, [knowledgeSources])

  // Filter and sort functions
  const filteredSources = useMemo(() => {
    let result = [...knowledgeSources]

    // Apply search filter
    if (searchTerm.trim() !== "") {
      const searchLower = searchTerm.toLowerCase()
      result = result.filter(
        (source) =>
          source.name.toLowerCase().includes(searchLower) ||
          source.type.toLowerCase().includes(searchLower) ||
          source.format.toLowerCase().includes(searchLower) ||
          source.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
      )
    }

    // Apply status filter
    if (statusFilter.length > 0) {
      result = result.filter((source) => statusFilter.includes(source.status))
    }

    // Apply tag filter
    if (tagFilter.length > 0) {
      result = result.filter((source) => source.tags.some((tag) => tagFilter.includes(tag)))
    }

    // Apply type filter
    if (typeFilter.length > 0) {
      result = result.filter((source) => typeFilter.includes(source.type))
    }

    // Apply sort
    result.sort((a, b) => {
      const dateA = new Date(a.dateAdded).getTime()
      const dateB = new Date(b.dateAdded).getTime()
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    })

    return result
  }, [knowledgeSources, statusFilter, tagFilter, typeFilter, sortOrder, searchTerm])

  const filteredDatasets = useMemo(() => {
    let result = [...trainingDatasets]

    // Apply search filter
    if (searchTerm.trim() !== "") {
      const searchLower = searchTerm.toLowerCase()
      result = result.filter(
        (dataset) =>
          dataset.name.toLowerCase().includes(searchLower) ||
          dataset.description.toLowerCase().includes(searchLower) ||
          dataset.sources.some((source) => source.toLowerCase().includes(searchLower)) ||
          dataset.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
      )
    }

    // Apply status filter
    if (statusFilter.length > 0) {
      result = result.filter((dataset) => statusFilter.includes(dataset.status))
    }

    // Apply tag filter
    if (tagFilter.length > 0) {
      result = result.filter((dataset) => dataset.tags.some((tag) => tagFilter.includes(tag)))
    }

    // Apply sort
    result.sort((a, b) => {
      const dateA = new Date(a.dateCreated).getTime()
      const dateB = new Date(b.dateCreated).getTime()
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    })

    return result
  }, [trainingDatasets, statusFilter, tagFilter, sortOrder, searchTerm])

  // Toggle status filter
  const toggleStatusFilter = (status: string) => {
    setStatusFilter((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  // Toggle tag filter
  const toggleTagFilter = (tag: string) => {
    setTagFilter((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  // Toggle type filter
  const toggleTypeFilter = (type: string) => {
    setTypeFilter((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
  }

  // Reset filters when changing tabs
  useEffect(() => {
    setStatusFilter([])
    setTagFilter([])
    setTypeFilter([])
    setSearchTerm("")
  }, [activeSourcesTab])

  // Thêm useEffect để reset currentPage khi chuyển tab
  useEffect(() => {
    setCurrentPage(1)
  }, [activeSourcesTab, statusFilter, tagFilter, typeFilter, searchTerm])

  // Add tag to source
  const addTagToSource = (sourceId: string, newTag: string) => {
    // Trong thực tế, đây sẽ là một API call để cập nhật dữ liệu
    // Ở đây chúng ta chỉ cập nhật state local
    const updatedSources = knowledgeSources.map((source) => {
      if (source.id === sourceId && !source.tags.includes(newTag)) {
        return {
          ...source,
          tags: [...source.tags, newTag],
        }
      }
      return source
    })
    // Giả lập cập nhật dữ liệu
    console.log("Updated sources with new tag:", updatedSources)
  }

  // Add tag to dataset
  const addTagToDataset = (datasetId: string, newTag: string) => {
    // Trong thực tế, đây sẽ là một API call để cập nhật dữ liệu
    const updatedDatasets = trainingDatasets.map((dataset) => {
      if (dataset.id === datasetId && !dataset.tags.includes(newTag)) {
        return {
          ...dataset,
          tags: [...dataset.tags, newTag],
        }
      }
      return dataset
    })
    // Giả lập cập nhật dữ liệu
    console.log("Updated datasets with new tag:", updatedDatasets)
  }

  // Handle tag selection
  const handleTagSelect = (id: string, tag: string, type: "source" | "dataset") => {
    if (type === "source") {
      addTagToSource(id, tag)
    } else {
      addTagToDataset(id, tag)
    }
    setOpenTagInput(null)
    setTagInputValue("")
    setSelectedTag(null)
  }

  // Get total active filters count
  const activeFiltersCount = statusFilter.length + tagFilter.length + typeFilter.length

  return (
    <div className="container py-6 bg-background text-foreground">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Knowledge Hub</h1>
          <p className="text-muted-foreground">Manage your AI training data and knowledge sources</p>
        </div>
      </div>

      {/* Sub-menu navigation */}
      <div className="flex items-center space-x-1 mb-6 border-b pb-1">
        <Button
          variant={activeTab === "dashboard" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("dashboard")}
          className="rounded-md"
        >
          <LayoutDashboard className="h-4 w-4 mr-2" />
          Dashboard
        </Button>
        <Button
          variant={activeTab === "data-training" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("data-training")}
          className="rounded-md"
        >
          <Database className="h-4 w-4 mr-2" />
          Data Manager
        </Button>
        <Button
          variant={activeTab === "ai-agent" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("ai-agent")}
          className="rounded-md"
        >
          <Bot className="h-4 w-4 mr-2" />
          AI Agent
        </Button>
      </div>

      {/* Dashboard Tab */}
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {dashboardStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <span className="text-green-500">{stat.change}</span> {stat.period}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Recent Activity Card - Simplified */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions in your knowledge hub</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {recentActivities.map((activity, index) => (
                    <div key={activity.id} className="py-3 flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {activity.action}: {activity.item}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <User className="h-3 w-3" />
                          <span>{activity.user}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                        <Clock className="h-3 w-3" />
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>

            {/* Knowledge Overview Card - Fixed */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Knowledge Overview</CardTitle>
                <CardDescription>Summary of your knowledge sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-sm font-medium">Documents</p>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-sm font-medium">Websites</p>
                      <span className="text-sm font-medium">20%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "20%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-sm font-medium">APIs</p>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View Detailed Analytics
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}

      {/* Data Training Tab */}
      {activeTab === "data-training" && (
        <div className="space-y-6">
          {/* Chuyển sang dạng Tabs thay vì buttons */}
          <Tabs value={activeSourcesTab} onValueChange={setActiveSourcesTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="sources">Knowledge Sources</TabsTrigger>
              <TabsTrigger value="datasets">Fine-tuning Datasets</TabsTrigger>
              <TabsTrigger value="api-endpoints">API Endpoints</TabsTrigger>
            </TabsList>

            {/* Hiển thị filter đã chọn */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-3 text-sm">
                <span className="font-medium">Filter by:</span>

                {statusFilter.length > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">Status:</span>
                    {statusFilter.map((status) => (
                      <Badge key={status} variant="secondary" className="flex items-center gap-1 px-2 py-0">
                        {status}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                          onClick={() => toggleStatusFilter(status)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}

                {typeFilter.length > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">Type:</span>
                    {typeFilter.map((type) => (
                      <Badge key={type} variant="secondary" className="flex items-center gap-1 px-2 py-0">
                        {type}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                          onClick={() => toggleTypeFilter(type)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}

                {tagFilter.length > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">Tags:</span>
                    {tagFilter.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1 px-2 py-0">
                        {tag}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                          onClick={() => toggleTagFilter(tag)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs ml-auto"
                  onClick={() => {
                    setStatusFilter([])
                    setTagFilter([])
                    setTypeFilter([])
                  }}
                >
                  Clear All
                </Button>
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={`Search ${activeSourcesTab === "sources" ? "sources" : "datasets"}...`}
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                {/* Làm button "Add Source" bớt nổi bật */}
                <Button
                  variant="outline"
                  onClick={() =>
                    activeSourcesTab === "sources" ? setShowAddSourceDialog(true) : setShowAddDatasetDialog(true)
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {activeSourcesTab === "sources" ? "Add Source" : "Create Dataset"}
                </Button>

                {/* Improved Filter Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="relative">
                      <Filter className="h-4 w-4" />
                      {activeFiltersCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] flex items-center justify-center text-primary-foreground">
                          {activeFiltersCount}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <div className="p-2">
                      <h4 className="font-medium text-sm mb-2">Status</h4>
                      <div className="space-y-2">
                        {["Ready", "Processed", "Processing", "New"].map((status) => (
                          <div key={status} className="flex items-center space-x-2">
                            <Checkbox
                              id={`status-${status}`}
                              checked={statusFilter.includes(status)}
                              onCheckedChange={() => toggleStatusFilter(status)}
                            />
                            <label
                              htmlFor={`status-${status}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {status}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <DropdownMenuSeparator />

                    <div className="p-2">
                      <h4 className="font-medium text-sm mb-2">Type</h4>
                      <div className="space-y-2">
                        {allTypes.map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                              id={`type-${type}`}
                              checked={typeFilter.includes(type)}
                              onCheckedChange={() => toggleTypeFilter(type)}
                            />
                            <label
                              htmlFor={`type-${type}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <DropdownMenuSeparator />

                    <div className="p-2">
                      <h4 className="font-medium text-sm mb-2">Tags</h4>
                      <ScrollArea className="h-40">
                        <div className="space-y-2 p-1">
                          {allTags.map((tag) => (
                            <div key={tag} className="flex items-center space-x-2">
                              <Checkbox
                                id={`tag-${tag}`}
                                checked={tagFilter.includes(tag)}
                                onCheckedChange={() => toggleTagFilter(tag)}
                              />
                              <label
                                htmlFor={`tag-${tag}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {tag}
                              </label>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>

                    <DropdownMenuSeparator />

                    <div className="p-2 flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setStatusFilter([])
                          setTagFilter([])
                          setTypeFilter([])
                        }}
                        disabled={activeFiltersCount === 0}
                      >
                        Clear All
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          // Close dropdown
                        }}
                      >
                        Apply
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Sort Button */}
                <Button variant="outline" size="icon" onClick={toggleSortOrder} className="relative">
                  <ArrowUpDown className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] flex items-center justify-center text-primary-foreground">
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                </Button>

                {/* View Trash Button */}
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  View Trash
                </Button>
              </div>
            </div>

            <TabsContent value="sources" className="mt-0">
              <div className="space-y-2">
                {filteredSources
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((source, index) => {
                    const statusConfig = getStatusBadge(source.status)
                    return (
                      <Card key={source.id} className="overflow-hidden">
                        <div className="flex">
                          <div className="flex-shrink-0 w-8 bg-muted flex items-center justify-center font-medium border-r">
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </div>
                          <div className="flex-1 p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="font-medium">{source.name}</div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <span className="px-1.5 py-0.5 rounded-sm bg-muted">{source.dataCount} items</span>
                                </div>
                                <div
                                  className={`text-xs text-white px-1.5 py-0.5 rounded-sm flex items-center ${statusConfig.bgColor}`}
                                >
                                  <statusConfig.icon className="h-3 w-3 mr-1" />
                                  {source.status}
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                  <Eye className="h-3 w-3 mr-1" />
                                  View
                                </Button>
                                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                  <Edit className="h-3 w-3 mr-1" />
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 text-xs text-muted-foreground hover:text-destructive"
                                >
                                  <Trash2 className="h-3 w-3 mr-1" />
                                  Move to Trash
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-1 text-xs">
                              <div className="flex items-center text-muted-foreground">
                                <FileIcon className="h-3 w-3 mr-1" />
                                <span>
                                  {source.type} • {source.format} • {source.size}
                                </span>
                              </div>
                              <div className="flex flex-col items-end text-muted-foreground">
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1 opacity-70" />
                                  <span className="opacity-70">Added on {source.dateAdded}</span>
                                </div>
                                <div className="flex items-center mt-0.5">
                                  <User className="h-3 w-3 mr-1 opacity-70" />
                                  <span className="opacity-70">Uploaded by {source.uploadedBy.name}</span>
                                </div>
                              </div>
                            </div>

                            {/* Tags section */}
                            <div className="mt-2 flex flex-wrap items-center gap-1">
                              {source.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs py-0 px-1.5">
                                  {tag}
                                </Badge>
                              ))}

                              <Popover
                                open={openTagInput === source.id}
                                onOpenChange={(open) => {
                                  if (open) {
                                    setOpenTagInput(source.id)
                                  } else {
                                    setOpenTagInput(null)
                                  }
                                  setTagInputValue("")
                                }}
                              >
                                <PopoverTrigger asChild>
                                  <Button variant="secondary" size="sm" className="h-5 px-1 py-0 text-xs">
                                    <Tag className="h-3 w-3 mr-1" />
                                    Add Tag
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-60 p-0" align="start">
                                  <Command>
                                    <CommandInput
                                      placeholder="Search or create tag..."
                                      value={tagInputValue}
                                      onValueChange={setTagInputValue}
                                    />
                                    <CommandList>
                                      <CommandEmpty>
                                        {tagInputValue && (
                                          <div className="py-1.5 px-2 text-sm flex items-center justify-between">
                                            <span>Create tag "{tagInputValue}"</span>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-6 px-2"
                                              onClick={() => handleTagSelect(source.id, tagInputValue, "source")}
                                            >
                                              <Plus className="h-3 w-3 mr-1" />
                                              Create
                                            </Button>
                                          </div>
                                        )}
                                        {!tagInputValue && <span className="py-1.5 px-2 text-sm">No tags found</span>}
                                      </CommandEmpty>
                                      <CommandGroup heading="Existing Tags">
                                        {allTags
                                          .filter((tag) => !source.tags.includes(tag))
                                          .filter((tag) => tag.toLowerCase().includes(tagInputValue.toLowerCase()))
                                          .map((tag) => (
                                            <CommandItem
                                              key={tag}
                                              value={tag}
                                              onSelect={() => handleTagSelect(source.id, tag, "source")}
                                            >
                                              <Tag className="h-3 w-3 mr-2" />
                                              {tag}
                                            </CommandItem>
                                          ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )
                  })}

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {Math.min(filteredSources.length, (currentPage - 1) * itemsPerPage + 1)} to{" "}
                    {Math.min(filteredSources.length, currentPage * itemsPerPage)} of {filteredSources.length} entries
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: Math.ceil(filteredSources.length / itemsPerPage) }, (_, i) => (
                      <Button
                        key={i}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        size="sm"
                        className="w-8 h-8 p-0"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    )).slice(
                      Math.max(0, currentPage - 3),
                      Math.min(Math.ceil(filteredSources.length / itemsPerPage), currentPage + 2),
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredSources.length / itemsPerPage)))
                      }
                      disabled={currentPage === Math.ceil(filteredSources.length / itemsPerPage)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="datasets" className="mt-0">
              <div className="space-y-2">
                {filteredDatasets
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((dataset, index) => {
                    const statusConfig = getStatusBadge(dataset.status)
                    return (
                      <Card key={dataset.id} className="overflow-hidden">
                        <div className="flex">
                          <div className="flex-shrink-0 w-8 bg-muted flex items-center justify-center font-medium border-r">
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </div>
                          <div className="flex-1 p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="font-medium">{dataset.name}</div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <span className="px-1.5 py-0.5 rounded-sm bg-muted">{dataset.dataCount} items</span>
                                </div>
                                <div
                                  className={`text-xs text-white px-1.5 py-0.5 rounded-sm flex items-center ${statusConfig.bgColor}`}
                                >
                                  <statusConfig.icon className="h-3 w-3 mr-1" />
                                  {dataset.status}
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                  <Eye className="h-3 w-3 mr-1" />
                                  View
                                </Button>
                                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                  <RefreshCw className="h-3 w-3 mr-1" />
                                  Fine-tune
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 text-xs text-muted-foreground hover:text-destructive"
                                >
                                  <Trash2 className="h-3 w-3 mr-1" />
                                  Move to Trash
                                </Button>
                              </div>
                            </div>

                            {/* Fine-tuning information */}
                            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                              <div className="flex items-center text-muted-foreground">
                                <FileIcon className="h-3 w-3 mr-1" />
                                <span>
                                  {dataset.size} • {dataset.sources.length} sources
                                </span>
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <Calendar className="h-3 w-3 mr-1 opacity-70" />
                                <span className="opacity-70">Created: {dataset.dateCreated}</span>
                              </div>

                              <div className="flex items-center text-muted-foreground">
                                <Bot className="h-3 w-3 mr-1" />
                                <span>Model: {dataset.modelType}</span>
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <User className="h-3 w-3 mr-1 opacity-70" />
                                <span className="opacity-70">By: {dataset.uploadedBy.name}</span>
                              </div>

                              <div className="flex items-center text-muted-foreground">
                                <Zap className="h-3 w-3 mr-1" />
                                <span>
                                  Epochs: {dataset.epochs} • LR: {dataset.learningRate}
                                </span>
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <Check className="h-3 w-3 mr-1" />
                                <span>Accuracy: {dataset.accuracy}</span>
                              </div>
                            </div>

                            {/* Progress bar for datasets in processing state */}
                            {dataset.status === "Processing" && (
                              <div className="mt-2">
                                <div className="flex justify-between items-center text-xs mb-1">
                                  <span className="text-muted-foreground">Fine-tuning in progress</span>
                                  <span className="text-muted-foreground">65%</span>
                                </div>
                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary rounded-full" style={{ width: "65%" }}></div>
                                </div>
                              </div>
                            )}

                            {/* Tags section */}
                            <div className="mt-2 flex flex-wrap items-center gap-1">
                              {dataset.tags &&
                                dataset.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs py-0 px-1.5">
                                    {tag}
                                  </Badge>
                                ))}

                              <Popover
                                open={openTagInput === dataset.id}
                                onOpenChange={(open) => {
                                  if (open) {
                                    setOpenTagInput(dataset.id)
                                  } else {
                                    setOpenTagInput(null)
                                  }
                                  setTagInputValue("")
                                }}
                              >
                                <PopoverTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-5 px-1 py-0 text-xs">
                                    <Tag className="h-3 w-3 mr-1" />
                                    Add Tag
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-60 p-0" align="start">
                                  <Command>
                                    <CommandInput
                                      placeholder="Search or create tag..."
                                      value={tagInputValue}
                                      onValueChange={setTagInputValue}
                                    />
                                    <CommandList>
                                      <CommandEmpty>
                                        {tagInputValue && (
                                          <div className="py-1.5 px-2 text-sm flex items-center justify-between">
                                            <span>Create tag "{tagInputValue}"</span>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-6 px-2"
                                              onClick={() => handleTagSelect(dataset.id, tagInputValue, "dataset")}
                                            >
                                              <Plus className="h-3 w-3 mr-1" />
                                              Create
                                            </Button>
                                          </div>
                                        )}
                                        {!tagInputValue && <span className="py-1.5 px-2 text-sm">No tags found</span>}
                                      </CommandEmpty>
                                      <CommandGroup heading="Existing Tags">
                                        {allTags
                                          .filter((tag) => !dataset.tags.includes(tag))
                                          .filter((tag) => tag.toLowerCase().includes(tagInputValue.toLowerCase()))
                                          .map((tag) => (
                                            <CommandItem
                                              key={tag}
                                              value={tag}
                                              onSelect={() => handleTagSelect(dataset.id, tag, "dataset")}
                                            >
                                              <Tag className="h-3 w-3 mr-2" />
                                              {tag}
                                            </CommandItem>
                                          ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )
                  })}

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {Math.min(filteredDatasets.length, (currentPage - 1) * itemsPerPage + 1)} to{" "}
                    {Math.min(filteredDatasets.length, currentPage * itemsPerPage)} of {filteredDatasets.length} entries
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: Math.ceil(filteredDatasets.length / itemsPerPage) }, (_, i) => (
                      <Button
                        key={i}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        size="sm"
                        className="w-8 h-8 p-0"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    )).slice(
                      Math.max(0, currentPage - 3),
                      Math.min(Math.ceil(filteredDatasets.length / itemsPerPage), currentPage + 2),
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredDatasets.length / itemsPerPage)))
                      }
                      disabled={currentPage === Math.ceil(filteredDatasets.length / itemsPerPage)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="api-endpoints" className="mt-0">
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search API endpoints..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Plus className="h-4 w-4 mr-2" />
                      Add API Endpoint
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {apiEndpoints.map((endpoint) => (
                    <Card key={endpoint.id} className="bg-card hover:bg-card/80">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{endpoint.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{endpoint.url}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge
                                className={
                                  endpoint.status === "Active"
                                    ? "bg-primary hover:bg-primary/80"
                                    : "text-muted-foreground border-muted-foreground"
                                }
                                variant={endpoint.status === "Active" ? "default" : "outline"}
                              >
                                {endpoint.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {endpoint.dataPoints.toLocaleString()} data points
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Last sync: {endpoint.lastSync}</p>
                            <div className="flex gap-2 mt-2">
                              <Button variant="outline" size="sm">
                                <RefreshCw className="h-3 w-3 mr-1" />
                                Sync
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* AI Agent Tab */}
      {activeTab === "ai-agent" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">AI Agents</h2>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Create New Agent
            </Button>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Your AI Agents</CardTitle>
              <CardDescription className="text-muted-foreground">
                Manage your AI agents trained on your knowledge base
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiAgents.map((agent) => (
                  <Card key={agent.id} className="bg-card hover:bg-card/80">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                            <Bot className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{agent.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{agent.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge
                                className={
                                  agent.status === "Active"
                                    ? "bg-primary hover:bg-primary/80"
                                    : "text-muted-foreground border-muted-foreground"
                                }
                                variant={agent.status === "Active" ? "default" : "outline"}
                              >
                                {agent.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                Datasets: {agent.datasets.join(", ")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Last trained: {agent.lastTrained}</p>
                          <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">
                              <Zap className="h-3 w-3 mr-1" />
                              Test
                            </Button>
                            <Button variant="outline" size="sm">
                              <RefreshCw className="h-3 w-3 mr-1" />
                              Retrain
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Agent Analytics
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Agent Performance</CardTitle>
              <CardDescription className="text-muted-foreground">
                Monitor your AI agents' performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Customer Support Agent</p>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium">85% accuracy</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Developer Assistant</p>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium">78% accuracy</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Sales Assistant</p>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium">65% accuracy</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Detailed Performance
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Add Source Dialog */}
      <Dialog open={showAddSourceDialog} onOpenChange={setShowAddSourceDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Knowledge Source</DialogTitle>
            <DialogDescription>Add a new knowledge source to train your AI models.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" placeholder="Enter source name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select defaultValue="document">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                  <SelectItem value="database">Database</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                File
              </Label>
              <Input id="file" type="file" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea id="description" placeholder="Enter description" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tags" className="text-right">
                Tags
              </Label>
              <Input id="tags" placeholder="Enter tags separated by commas" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddSourceDialog(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Source</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Dataset Dialog */}
      <Dialog open={showAddDatasetDialog} onOpenChange={setShowAddDatasetDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Fine-tuning Dataset</DialogTitle>
            <DialogDescription>Create a new dataset for fine-tuning your AI models.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dataset-name" className="text-right">
                Name
              </Label>
              <Input id="dataset-name" placeholder="Enter dataset name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dataset-description" className="text-right">
                Description
              </Label>
              <Textarea id="dataset-description" placeholder="Enter description" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="model-type" className="text-right">
                Base Model
              </Label>
              <Select defaultValue="gpt-3.5">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="llama-2">Llama 2</SelectItem>
                  <SelectItem value="mistral">Mistral</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="epochs" className="text-right">
                Epochs
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input id="epochs" type="number" min="1" max="10" defaultValue="3" className="w-20" />
                <span className="text-sm text-muted-foreground">Number of training cycles (1-10)</span>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="learning-rate" className="text-right">
                Learning Rate
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Select defaultValue="5e-5">
                  <SelectTrigger className="w-28">
                    <SelectValue placeholder="Select rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1e-5">1e-5</SelectItem>
                    <SelectItem value="3e-5">3e-5</SelectItem>
                    <SelectItem value="5e-5">5e-5</SelectItem>
                    <SelectItem value="8e-5">8e-5</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">Lower values for more precise learning</span>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Sources</Label>
              <div className="col-span-3 border rounded-md p-3 space-y-2">
                {knowledgeSources.slice(0, 3).map((source) => (
                  <div key={source.id} className="flex items-center space-x-2">
                    <Checkbox id={`source-${source.id}`} />
                    <Label htmlFor={`source-${source.id}`} className="text-sm">
                      {source.name}
                    </Label>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-2">
                  <Plus className="h-3 w-3 mr-1" />
                  Select More Sources
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tags" className="text-right">
                Tags
              </Label>
              <Input id="tags" placeholder="Enter tags separated by commas" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDatasetDialog(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Dataset</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

