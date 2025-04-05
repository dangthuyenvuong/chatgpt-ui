"use client"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { useState, useMemo } from "react"
import { mockPrompts } from "../lib/mock-data"
import type { Prompt, SocialPlatform, PromptStatus, PromptTone, WordLimit } from "../lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddPromptDialog } from "./add-prompt-dialog"
import { Facebook, Linkedin, Twitter, AtSign, Plus, Copy, Pencil, Trash2, Tag, Info } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function PromptMenu() {
  const [prompts, setPrompts] = useState<Prompt[]>(mockPrompts)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<SocialPlatform | "all">("all")
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null)
  const [availableTags, setAvailableTags] = useState<string[]>([])

  // Tạo danh sách các tag có sẵn từ tất cả các prompt
  useMemo(() => {
    const tags = new Set<string>()
    prompts.forEach((prompt) => {
      if (prompt.tags) {
        prompt.tags.forEach((tag) => tags.add(tag))
      }
    })
    setAvailableTags(Array.from(tags))
  }, [prompts])

  // Cập nhật handleSavePrompt để bao gồm language
  const handleSavePrompt = (newPrompt: {
    id?: string
    name: string
    content: string
    platform: SocialPlatform
    language: string
    status: PromptStatus
    tone: PromptTone
    wordLimit: WordLimit
    tags: string[]
    description: string
  }) => {
    if (newPrompt.id) {
      // Cập nhật prompt hiện có
      setPrompts(
        prompts.map((prompt) =>
          prompt.id === newPrompt.id ? { ...prompt, ...newPrompt, updatedAt: new Date().toISOString() } : prompt,
        ),
      )
      toast({
        title: "Prompt đã được cập nhật",
        description: `Prompt "${newPrompt.name}" đã được cập nhật.`,
      })
    } else {
      // Thêm prompt mới
      const prompt: Prompt = {
        id: `prompt-${Date.now()}`,
        ...newPrompt,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setPrompts([...prompts, prompt])
      toast({
        title: "Prompt đã được tạo",
        description: `Prompt "${prompt.name}" đã được thêm vào danh sách.`,
      })
    }
    setIsDialogOpen(false)
    setEditingPrompt(null)
  }

  const handleEditPrompt = (prompt: Prompt) => {
    setEditingPrompt(prompt)
    setIsDialogOpen(true)
  }

  const handleDeletePrompt = (id: string) => {
    setPrompts(prompts.filter((prompt) => prompt.id !== id))
    toast({
      title: "Prompt đã được xóa",
      description: "Prompt đã được xóa khỏi danh sách.",
    })
  }

  const handleCopyPrompt = (content: string) => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Đã sao chép",
      description: "Nội dung prompt đã được sao chép vào clipboard.",
    })
  }

  const handleAddTag = (tag: string) => {
    if (!availableTags.includes(tag)) {
      setAvailableTags([...availableTags, tag])
    }
  }

  const filteredPrompts = activeTab === "all" ? prompts : prompts.filter((prompt) => prompt.platform === activeTab)

  const renderPlatformIcon = (platform: SocialPlatform, size = 16) => {
    switch (platform) {
      case "x":
        return <Twitter size={size} />
      case "facebook":
        return <Facebook size={size} />
      case "threads":
        return <AtSign size={size} />
      case "linkedin":
        return <Linkedin size={size} />
    }
  }

  const getPlatformColor = (platform: SocialPlatform) => {
    switch (platform) {
      case "x":
        return "text-blue-400"
      case "facebook":
        return "text-blue-600"
      case "threads":
        return "text-purple-500"
      case "linkedin":
        return "text-blue-700"
    }
  }

  const getPlatformName = (platform: SocialPlatform) => {
    switch (platform) {
      case "x":
        return "X (Twitter)"
      case "facebook":
        return "Facebook"
      case "threads":
        return "Threads"
      case "linkedin":
        return "LinkedIn"
    }
  }

  const getToneLabel = (tone: PromptTone) => {
    switch (tone) {
      case "formal":
        return "Trang trọng"
      case "professional":
        return "Chuyên nghiệp"
      case "casual":
        return "Thông thường"
      case "friendly":
        return "Thân thiện"
      case "humorous":
        return "Hài hước"
      case "serious":
        return "Nghiêm túc"
      default:
        return tone
    }
  }

  // Thêm hàm getLanguageLabel
  const getLanguageLabel = (language: string) => {
    switch (language) {
      case "vi":
        return "Tiếng Việt"
      case "en":
        return "Tiếng Anh"
      case "fr":
        return "Tiếng Pháp"
      case "de":
        return "Tiếng Đức"
      case "es":
        return "Tiếng Tây Ban Nha"
      case "zh":
        return "Tiếng Trung"
      case "ja":
        return "Tiếng Nhật"
      case "ko":
        return "Tiếng Hàn"
      default:
        return language
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Quản lý Prompt</h2>
        <Button
          onClick={() => {
            setEditingPrompt(null)
            setIsDialogOpen(true)
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm prompt
        </Button>
      </div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as SocialPlatform | "all")}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="x" className="flex items-center gap-1">
            <Twitter className="h-4 w-4" />
            <span>X</span>
          </TabsTrigger>
          <TabsTrigger value="facebook" className="flex items-center gap-1">
            <Facebook className="h-4 w-4" />
            <span>Facebook</span>
          </TabsTrigger>
          <TabsTrigger value="threads" className="flex items-center gap-1">
            <AtSign className="h-4 w-4" />
            <span>Threads</span>
          </TabsTrigger>
          <TabsTrigger value="linkedin" className="flex items-center gap-1">
            <Linkedin className="h-4 w-4" />
            <span>LinkedIn</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPrompts.length > 0 ? (
              filteredPrompts.map((prompt) => (
                <Card key={prompt.id} className={prompt.status === "archived" ? "opacity-70" : ""}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className={getPlatformColor(prompt.platform)}>{renderPlatformIcon(prompt.platform)}</span>
                        <h3 className="font-medium">{prompt.name}</h3>
                        {prompt.status === "archived" && (
                          <Badge variant="outline" className="text-xs">
                            Đã lưu trữ
                          </Badge>
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <span className="sr-only">Mở menu</span>
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                            >
                              <path
                                d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleCopyPrompt(prompt.content)}>
                            <Copy className="mr-2 h-4 w-4" />
                            <span>Sao chép</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditPrompt(prompt)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Chỉnh sửa</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDeletePrompt(prompt.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Xóa</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {activeTab === "all" && (
                      <Badge variant="outline" className="mb-2">
                        {getPlatformName(prompt.platform)}
                      </Badge>
                    )}

                    <p className="text-sm text-muted-foreground mb-3">{prompt.content}</p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {prompt.tone && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="secondary" className="text-xs">
                                {getToneLabel(prompt.tone)}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Văn phong</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}

                      {prompt.language && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="secondary" className="text-xs">
                                {getLanguageLabel(prompt.language)}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Ngôn ngữ</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}

                      {prompt.wordLimit && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="secondary" className="text-xs">
                                {prompt.wordLimit.min}-{prompt.wordLimit.max} từ
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Giới hạn từ</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}

                      {prompt.tags &&
                        prompt.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {tag}
                          </Badge>
                        ))}
                    </div>

                    {prompt.description && (
                      <div className="text-xs text-muted-foreground mb-3 flex items-start gap-1">
                        <Info className="h-3 w-3 mt-0.5 shrink-0" />
                        <span>{prompt.description}</span>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => handleCopyPrompt(prompt.content)}
                      >
                        <Copy className="mr-1 h-3 w-3" />
                        Sao chép
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                <p>Không có prompt nào cho mạng xã hội này</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setEditingPrompt(null)
                    setIsDialogOpen(true)
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm prompt mới
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <AddPromptDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false)
          setEditingPrompt(null)
        }}
        onSave={handleSavePrompt}
        editingPrompt={editingPrompt}
        availableTags={availableTags}
        onAddTag={handleAddTag}
      />
    </div>
  )
}

