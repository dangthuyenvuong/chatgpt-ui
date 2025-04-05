"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import {
  X,
  Check,
  Plus,
  Upload,
  Trash2,
  ExternalLink,
  FileText,
  Calendar,
  Database,
  Eye,
  FileJson,
  FileType,
  FileCode,
  ChevronDown,
  FileUp,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"

interface CreateTemplateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateTemplate: (template: any) => void
}

// Sample suggested tags - in a real app, these would come from your backend
const suggestedTags = [
  "Marketing",
  "SEO",
  "Content",
  "Social Media",
  "Email",
  "Analytics",
  "Planning",
  "Strategy",
  "Branding",
  "Product",
  "Launch",
  "Research",
  "Customer",
  "Feedback",
  "Newsletter",
  "Project",
  "Timeline",
  "Development",
  "Design",
  "UX",
  "UI",
  "Testing",
  "Reporting",
  "Presentation",
]

// Sample categories - in a real app, these would come from your backend
const categories = [
  "Marketing",
  "Content",
  "Development",
  "Design",
  "Analytics",
  "Social Media",
  "Email",
  "Product",
  "Research",
  "Project Management",
  "Customer Support",
  "Sales",
  "Uncategorized",
]

// AI providers and models
const aiProviders = [
  {
    id: "openai",
    name: "OpenAI",
    models: [
      { id: "gpt-4o", name: "GPT-4o" },
      { id: "gpt-4-turbo", name: "GPT-4 Turbo" },
      { id: "gpt-4", name: "GPT-4" },
      { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
    ],
  },
  {
    id: "anthropic",
    name: "Anthropic",
    models: [
      { id: "claude-3-opus", name: "Claude 3 Opus" },
      { id: "claude-3-sonnet", name: "Claude 3 Sonnet" },
      { id: "claude-3-haiku", name: "Claude 3 Haiku" },
      { id: "claude-2", name: "Claude 2" },
    ],
  },
  {
    id: "google",
    name: "Google",
    models: [
      { id: "gemini-pro", name: "Gemini Pro" },
      { id: "gemini-ultra", name: "Gemini Ultra" },
      { id: "gemini-flash", name: "Gemini Flash" },
    ],
  },
  {
    id: "meta",
    name: "Meta",
    models: [
      { id: "llama-3-70b", name: "Llama 3 70B" },
      { id: "llama-3-8b", name: "Llama 3 8B" },
      { id: "llama-2-70b", name: "Llama 2 70B" },
    ],
  },
  {
    id: "mistral",
    name: "Mistral AI",
    models: [
      { id: "mistral-large", name: "Mistral Large" },
      { id: "mistral-medium", name: "Mistral Medium" },
      { id: "mistral-small", name: "Mistral Small" },
    ],
  },
  {
    id: "cohere",
    name: "Cohere",
    models: [
      { id: "command", name: "Command" },
      { id: "command-light", name: "Command Light" },
      { id: "command-r", name: "Command R" },
      { id: "command-r-plus", name: "Command R+" },
    ],
  },
  {
    id: "perplexity",
    name: "Perplexity AI",
    models: [
      { id: "pplx-7b-online", name: "PPLX 7B Online" },
      { id: "pplx-70b-online", name: "PPLX 70B Online" },
      { id: "sonar-small-online", name: "Sonar Small Online" },
      { id: "sonar-medium-online", name: "Sonar Medium Online" },
    ],
  },
  {
    id: "ai21",
    name: "AI21 Labs",
    models: [
      { id: "jamba-1.5-mini", name: "Jamba 1.5 Mini" },
      { id: "jamba-1.5", name: "Jamba 1.5" },
      { id: "jurassic-2", name: "Jurassic-2" },
    ],
  },
]

// Response format options
const responseFormatOptions = ["text", "markdown", "json", "html", "code"]

interface SamplePrompt {
  id: string
  text: string
}

interface TrainingFileInfo {
  name: string
  size: number
  uploadDate: Date
  dataPoints: number
  format: string
  progress: number
  status: "uploading" | "processing" | "complete" | "error"
}

export function CreateTemplateDialog({ open, onOpenChange, onCreateTemplate }: CreateTemplateDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")
  const [openTagsPopover, setOpenTagsPopover] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [inputRef] = useState(useRef<HTMLInputElement>(null))
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Avatar state
  const [avatar, setAvatar] = useState<string | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

  // Sample prompts state
  const [samplePrompts, setSamplePrompts] = useState<SamplePrompt[]>([])
  const [isAddingPrompt, setIsAddingPrompt] = useState(false)

  // AI Model selection state
  const [openModelPopover, setOpenModelPopover] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [selectedProviderName, setSelectedProviderName] = useState<string | null>(null)
  const [selectedModelName, setSelectedModelName] = useState<string | null>(null)

  // Thêm state cho các cài đặt nâng cao
  const [contextLimitCount, setContextLimitCount] = useState(10)
  const [sendAllMessages, setSendAllMessages] = useState(false)
  const [trainingFile, setTrainingFile] = useState<File | null>(null)
  const [trainingFileInfo, setTrainingFileInfo] = useState<TrainingFileInfo | null>(null)
  const [responseFormat, setResponseFormat] = useState("markdown")
  const [responseType, setResponseType] = useState("format") // "format" or "preview"
  const [systemPrompt, setSystemPrompt] = useState("")
  const [activeTab, setActiveTab] = useState("basic")
  const [previewEndpoint, setPreviewEndpoint] = useState("")

  // Thêm state cho JSON data trong function CreateTemplateDialog
  const [jsonData, setJsonData] = useState<string>("")
  const [jsonFile, setJsonFile] = useState<File | null>(null)
  const jsonFileInputRef = useRef<HTMLInputElement>(null)
  const [isJsonValid, setIsJsonValid] = useState<boolean>(false)

  // Thêm state cho temperature
  const [temperature, setTemperature] = useState(0.7)

  // Thêm hàm xử lý upload JSON file
  const handleJsonFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setJsonFile(file)

      // Read file content
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string
          // Try to parse and format JSON
          const parsedJson = JSON.parse(content)
          setJsonData(JSON.stringify(parsedJson, null, 2))
          setIsJsonValid(true)
        } catch (error) {
          // If parsing fails, just set the raw content
          setJsonData((event.target?.result as string) || "")
          setIsJsonValid(false)
          toast({
            title: "Invalid JSON",
            description: "The uploaded file contains invalid JSON.",
            variant: "destructive",
          })
        }
      }
      reader.readAsText(file)
    }
  }

  // Validate JSON when content changes
  const validateJson = (jsonString: string) => {
    try {
      if (!jsonString.trim()) {
        setIsJsonValid(false)
        return false
      }
      JSON.parse(jsonString)
      setIsJsonValid(true)
      return true
    } catch (error) {
      setIsJsonValid(false)
      return false
    }
  }

  // Handle JSON data change
  const handleJsonDataChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setJsonData(newValue)
    validateJson(newValue)
  }

  // Thêm hàm xử lý click vào nút upload JSON
  const handleJsonUploadClick = () => {
    jsonFileInputRef.current?.click()
  }

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (!open) {
      // Reset form after dialog closes
      setTimeout(() => {
        setName("")
        setDescription("")
        setCategory("")
        setSelectedTags([])
        setInputValue("")
        setAvatar(null)
        setAvatarFile(null)
        setSamplePrompts([])
        // Reset advanced settings
        setSelectedProvider(null)
        setSelectedModel(null)
        setSelectedProviderName(null)
        setSelectedModelName(null)
        setSystemPrompt("")
        setContextLimitCount(10)
        setSendAllMessages(false)
        setTrainingFile(null)
        setTrainingFileInfo(null)
        setResponseFormat("markdown")
        setResponseType("format")
        setPreviewEndpoint("")
        setActiveTab("basic")
        setJsonData("")
        setJsonFile(null)
        setIsJsonValid(false)
        setTemperature(0.7)
      }, 300)
    }
  }, [open])

  // Filter tags based on input value
  const filteredTags = suggestedTags
    .filter((tag) => !selectedTags.includes(tag))
    .filter((tag) => tag.toLowerCase().includes(inputValue.toLowerCase()))

  // Filter providers and models based on search
  const filteredProviders = aiProviders.filter((provider) => {
    // Check if provider name matches search
    if (provider.name.toLowerCase().includes(searchValue.toLowerCase())) {
      return true
    }

    // Check if any model in this provider matches search
    return provider.models.some((model) => model.name.toLowerCase().includes(searchValue.toLowerCase()))
  })

  const handleSelectTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag])
    }
    setInputValue("")
    setOpenTagsPopover(false)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  const handleRemoveTag = (tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag))
  }

  const handleSelectModel = (providerId: string, providerName: string, modelId: string, modelName: string) => {
    setSelectedProvider(providerId)
    setSelectedProviderName(providerName)
    setSelectedModel(modelId)
    setSelectedModelName(modelName)
    setOpenModelPopover(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setTrainingFile(file)

      // Simulate file upload and processing
      const fileInfo: TrainingFileInfo = {
        name: file.name,
        size: file.size,
        uploadDate: new Date(),
        dataPoints: Math.floor(Math.random() * 10000) + 1000,
        format: file.name.split(".").pop()?.toUpperCase() || "UNKNOWN",
        progress: 0,
        status: "uploading",
      }

      setTrainingFileInfo(fileInfo)

      // Simulate upload progress
      const interval = setInterval(() => {
        setTrainingFileInfo((prev) => {
          if (!prev) return null

          const newProgress = prev.progress + 10

          if (newProgress >= 100) {
            clearInterval(interval)
            return {
              ...prev,
              progress: 100,
              status: "complete",
            }
          }

          return {
            ...prev,
            progress: newProgress,
            status: newProgress < 50 ? "uploading" : "processing",
          }
        })
      }, 300)
    }
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAvatarFile(file)

      // Create a preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDeletePrompt = (id: string) => {
    setSamplePrompts((prev) => prev.filter((prompt) => prompt.id !== id))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Add custom tag when pressing Enter if it's not empty and not already in the list
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault()
      if (!selectedTags.includes(inputValue.trim())) {
        setSelectedTags((prev) => [...prev, inputValue.trim()])
        setInputValue("")
      }
    }

    // Remove the last tag when pressing Backspace if input is empty
    if (e.key === "Backspace" && inputValue === "" && selectedTags.length > 0) {
      setSelectedTags((prev) => prev.slice(0, -1))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Template name is required",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Create new template object with advanced settings
    const newTemplate = {
      id: `template-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      category: category.trim() || "Uncategorized",
      tags: selectedTags,
      avatar: avatar,
      lastUsed: "Just now",
      isFavorite: false,
      samplePrompts: samplePrompts,
      // Advanced settings
      provider: selectedProvider,
      model: selectedModel,
      temperature: temperature,
      systemPrompt: systemPrompt.trim(),
      contextLimitCount: sendAllMessages ? null : contextLimitCount,
      sendAllMessages,
      trainingFileName: trainingFile ? trainingFile.name : null,
      responseFormat,
      responseType,
      previewEndpoint: responseType === "preview" ? previewEndpoint : null,
      jsonStructuredData: responseType === "preview" ? jsonData : null,
    }

    // Simulate API call
    setTimeout(() => {
      onCreateTemplate(newTemplate)
      setIsSubmitting(false)
      onOpenChange(false)

      toast({
        title: "Template created",
        description: "Your new template has been created successfully",
      })
    }, 500)
  }

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  // Format date
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Get file icon based on format
  const getFileIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case "json":
        return <FileJson className="h-5 w-5" />
      case "txt":
        return <FileText className="h-5 w-5" />
      case "html":
      case "xml":
        return <FileCode className="h-5 w-5" />
      default:
        return <FileType className="h-5 w-5" />
    }
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "text-green-500"
      case "error":
        return "text-red-500"
      case "processing":
        return "text-amber-500"
      default:
        return "text-blue-500"
    }
  }

  // Get display text for model selection button
  const getModelSelectionText = () => {
    if (selectedModelName) {
      return `${selectedProviderName} / ${selectedModelName}`
    }
    return "Select AI Model"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Template</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="response">Response</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 pt-4">
              {/* Template Preview Card */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-start p-4 gap-4">
                    <div className="relative group">
                      <Avatar className="h-16 w-16 cursor-pointer border-2 border-border" onClick={handleAvatarClick}>
                        {avatar ? (
                          <AvatarImage src={avatar} alt={name || "Template"} />
                        ) : (
                          <AvatarFallback className="text-lg bg-primary/10">
                            {name ? getInitials(name) : "AI"}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-full transition-opacity cursor-pointer"
                        onClick={handleAvatarClick}
                      >
                        <Upload className="h-6 w-6 text-white" />
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleAvatarChange}
                        className="hidden"
                        accept="image/*"
                      />
                    </div>

                    <div className="flex-1 space-y-2">
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Template Name"
                        className="text-lg font-medium border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                        required
                      />

                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Template Description"
                        className="min-h-[20px] border-0 p-0 focus-visible:ring-0 resize-none overflow-hidden bg-transparent"
                        rows={1}
                        onInput={(e) => {
                          const target = e.target as HTMLTextAreaElement
                          target.style.height = "auto"
                          target.style.height = `${target.scrollHeight}px`
                        }}
                      />

                      <div className="flex flex-wrap gap-2 items-center">
                        {/* <Select value={category} onValueChange={setCategory}>
                          <SelectTrigger className="h-7 w-auto border-0 bg-secondary text-secondary-foreground px-2 text-xs">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select> */}

                        {selectedTags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="flex items-center gap-1 h-7">
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="rounded-full h-4 w-4 flex items-center justify-center hover:bg-muted-foreground/20"
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove {tag}</span>
                            </button>
                          </Badge>
                        ))}

                        <Popover open={openTagsPopover} onOpenChange={setOpenTagsPopover}>
                          <PopoverTrigger asChild>
                            <Button
                              type="button"
                              variant="secondary"
                              size="sm"
                              className="h-7 px-2"
                              onClick={() => setOpenTagsPopover(true)}
                            >
                              <Plus className="h-3.5 w-3.5 mr-1" />
                              Add Tag
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0 w-[200px]" align="start">
                            <Command>
                              <CommandInput
                                placeholder="Search tags..."
                                value={inputValue}
                                onValueChange={setInputValue}
                                onKeyDown={handleKeyDown}
                                ref={inputRef.current}
                                autoFocus
                              />
                              <CommandList>
                                <CommandEmpty>
                                  {inputValue ? (
                                    <div className="py-3 px-4 text-sm">
                                      <p>No matching tags found.</p>
                                      <p className="text-muted-foreground">Press Enter to create "{inputValue}"</p>
                                    </div>
                                  ) : (
                                    <p className="py-3 px-4 text-sm">No tags found.</p>
                                  )}
                                </CommandEmpty>
                                <CommandGroup>
                                  {filteredTags.map((tag) => (
                                    <CommandItem
                                      key={tag}
                                      value={tag}
                                      onSelect={() => handleSelectTag(tag)}
                                      className="flex items-center justify-between"
                                    >
                                      <span>{tag}</span>
                                      {selectedTags.includes(tag) && <Check className="h-4 w-4" />}
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
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Label htmlFor="systemPrompt">System Prompt</Label>
                <Textarea
                  id="systemPrompt"
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder="Enter system instructions for the AI..."
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  Instructions that define how the AI should behave throughout the conversation.
                </p>
              </div>

              {/* Sample Prompts Section */}
              <div className="space-y-2">
                <Label>Sample Prompts</Label>
                <p className="text-xs text-muted-foreground">
                  Add example prompts to help users understand how to use this template effectively. These prompts will
                  be available as quick-start options.
                </p>

                <div className="space-y-2 mt-2">
                  {samplePrompts.map((prompt, index) => (
                    <div key={prompt.id} className="flex items-center gap-2 p-2 border rounded-md group">
                      <div className="flex-1">
                        <Textarea
                          value={prompt.text}
                          onChange={(e) => {
                            const newText = e.target.value
                            setSamplePrompts((prev) => prev.map((p, i) => (i === index ? { ...p, text: newText } : p)))
                          }}
                          placeholder="Enter a sample prompt..."
                          className="min-h-[20px] border-0 p-0 focus-visible:ring-0 resize-none w-full"
                          rows={1}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement
                            target.style.height = "auto"
                            target.style.height = `${target.scrollHeight}px`
                          }}
                          autoFocus={prompt.text === ""}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive"
                        onClick={() => handleDeletePrompt(prompt.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-center mt-2"
                  onClick={() => {
                    setIsAddingPrompt(true)
                    setSamplePrompts((prev) => [...prev, { id: `prompt-${Date.now()}`, text: "" }])
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Sample Prompt
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4 pt-4 flex flex-col gap-2">
              <div className="space-y-2">
                <Label>AI Model</Label>
                <Popover open={openModelPopover} onOpenChange={setOpenModelPopover} modal>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openModelPopover}
                      className="justify-between w-full"
                    >
                      {getModelSelectionText()}
                      <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-[300px]" align="start">
                    <Command>
                      <CommandInput
                        placeholder="Search models..."
                        value={searchValue}
                        onValueChange={setSearchValue}
                        autoFocus
                      />
                      <CommandList className="max-h-[300px] overflow-auto">
                        <CommandEmpty>No models found</CommandEmpty>
                        {filteredProviders.map((provider, index) => (
                          <React.Fragment key={provider.id}>
                            {index > 0 && <CommandSeparator />}
                            <CommandGroup heading={provider.name}>
                              {provider.models
                                .filter(
                                  (model) =>
                                    searchValue === "" || model.name.toLowerCase().includes(searchValue.toLowerCase()),
                                )
                                .map((model) => (
                                  <CommandItem
                                    key={`${provider.id}-${model.id}`}
                                    value={`${provider.id}-${model.id}`}
                                    onSelect={() => handleSelectModel(provider.id, provider.name, model.id, model.name)}
                                    className="pl-6"
                                  >
                                    {model.name}
                                    {selectedProvider === provider.id && selectedModel === model.id && (
                                      <Check className="h-4 w-4 ml-auto" />
                                    )}
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          </React.Fragment>
                        ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <p className="text-xs text-muted-foreground">
                  Select the AI provider and model that will be used for this template.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Temperature</Label>
                  <span className="text-sm font-medium">{temperature.toFixed(1)}</span>
                </div>
                <div className="pt-2">
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={temperature}
                      onChange={(e) => setTemperature(Number.parseFloat(e.target.value))}
                      className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Precise</span>
                      <span>Balanced</span>
                      <span>Creative</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Controls the randomness of the AI's responses. Lower values make responses more deterministic and
                  focused, while higher values make them more creative and varied.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Context Limit Messages</Label>
                <div className="flex items-center">
                  <div className="mr-4">
                    <Input
                      type="number"
                      min="1"
                      max="100"
                      value={contextLimitCount}
                      onChange={(e) => setContextLimitCount(Number.parseInt(e.target.value) || 10)}
                      disabled={sendAllMessages}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="send-all" checked={sendAllMessages} onCheckedChange={setSendAllMessages} />
                    <Label htmlFor="send-all" className="text-sm cursor-pointer">
                      Send all messages
                    </Label>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Set the number of most recent messages to include in the context window, or send all messages.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="trainingFile">Upload Training File</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="trainingFile"
                    type="file"
                    onChange={handleFileChange}
                    className="flex-1"
                    accept=".txt,.pdf,.doc,.docx,.csv,.json"
                  />
                </div>

                {trainingFileInfo ? (
                  <Card className="mt-2">
                    <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0">
                      <div className="flex items-center space-x-2">
                        {getFileIcon(trainingFileInfo.format)}
                        <div>
                          <h4 className="font-medium text-sm">{trainingFileInfo.name}</h4>
                          <p className="text-xs text-muted-foreground">{formatFileSize(trainingFileInfo.size)}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={getStatusColor(trainingFileInfo.status)}>
                        {trainingFileInfo.status.charAt(0).toUpperCase() + trainingFileInfo.status.slice(1)}
                      </Badge>
                    </CardHeader>

                    <CardContent className="py-2 px-4">
                      <div className="space-y-3">
                        <Progress value={trainingFileInfo.progress} className="h-2" />

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5 mr-1.5" />
                            <span>{formatDate(trainingFileInfo.uploadDate)}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Database className="h-3.5 w-3.5 mr-1.5" />
                            <span>{trainingFileInfo.dataPoints.toLocaleString()} data points</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="py-2 px-4 border-t text-xs text-muted-foreground">
                      {trainingFileInfo.status === "complete"
                        ? "File processed successfully and ready for training"
                        : trainingFileInfo.status === "error"
                          ? "Error processing file. Please try again."
                          : "Processing file. This may take a few minutes..."}
                    </CardFooter>
                  </Card>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Upload files to train your AI with domain-specific knowledge.
                    <a
                      href="https://example.com/file-format-checker"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center ml-1 text-primary hover:underline"
                    >
                      Check file format compatibility <ExternalLink className="h-3 w-3 ml-0.5" />
                    </a>
                  </p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="response" className="space-y-4 pt-4">
              <div className="space-y-4">
                <Label>Response Format</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Card
                    className={`cursor-pointer transition-all hover:border-primary ${responseType === "format" ? "border-2 border-primary bg-primary/5" : "border"}`}
                    onClick={() => setResponseType("format")}
                  >
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Format Response</h3>
                        {responseType === "format" && <Check className="h-4 w-4 text-primary" />}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-xs text-muted-foreground">
                        The AI will respond in a specific format like text, markdown, or JSON.
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer transition-all hover:border-primary ${responseType === "preview" ? "border-2 border-primary bg-primary/5" : "border"}`}
                    onClick={() => setResponseType("preview")}
                  >
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Canvas</h3>
                        {responseType === "preview" && <Check className="h-4 w-4 text-primary" />}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-xs text-muted-foreground">
                        Create interactive visualizations with structured data from the AI.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {responseType === "format" && (
                  <div className="mt-4 space-y-2 p-4 border rounded-md">
                    <Select value={responseFormat} onValueChange={setResponseFormat}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        {responseFormatOptions.map((format) => (
                          <SelectItem key={format} value={format}>
                            {format.charAt(0).toUpperCase() + format.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">The AI will respond in the selected format.</p>
                  </div>
                )}

                {responseType === "preview" && (
                  <div className="mt-4 space-y-4 p-4 border rounded-md">
                    <div className="space-y-2">
                      <Input
                        placeholder="Enter preview endpoint URL"
                        value={previewEndpoint}
                        onChange={(e) => setPreviewEndpoint(e.target.value)}
                      />
                      <div className="flex items-start space-x-2">
                        <p className="text-xs text-muted-foreground">
                          The AI will send structured data to this endpoint for live visualization. You can create
                          interactive dashboards, charts, or custom UIs that update in real-time as the AI generates
                          responses.
                          <a
                            href="https://docs.example.com/canvas-guide"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center ml-1 text-primary hover:underline"
                          >
                            Learn how Canvas works <ExternalLink className="h-3 w-3 ml-0.5" />
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">JSON Structured Data</Label>
                      <div className="flex items-center gap-2 mb-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleJsonUploadClick}
                          className="flex items-center gap-1"
                        >
                          <FileUp className="h-4 w-4" />
                          Upload JSON
                        </Button>
                        <input
                          type="file"
                          ref={jsonFileInputRef}
                          onChange={handleJsonFileChange}
                          className="hidden"
                          accept=".json"
                        />
                        {jsonFile && (
                          <span className="text-xs text-muted-foreground">
                            {jsonFile.name} ({formatFileSize(jsonFile.size)})
                          </span>
                        )}
                      </div>

                      <div className="relative">
                        <Textarea
                          value={jsonData}
                          onChange={handleJsonDataChange}
                          placeholder="Paste your JSON structured data here..."
                          className="font-mono text-sm h-[150px]"
                        />
                        {isJsonValid && jsonData.trim() !== "" && (
                          <div className="absolute bottom-2 right-2">
                            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                              <Check className="h-3 w-3 mr-1" />
                              Validated
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div className="flex items-start space-x-2">
                        <p className="text-xs text-muted-foreground">
                          Provide a sample of the structured data format that will be sent to your endpoint.
                          <a
                            href="https://jsonlint.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center ml-1 text-primary hover:underline"
                          >
                            Validate your JSON structure <ExternalLink className="h-3 w-3 ml-0.5" />
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Template"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

