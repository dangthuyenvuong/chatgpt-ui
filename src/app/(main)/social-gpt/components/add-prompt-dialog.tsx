"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { SocialPlatform, PromptTone, PromptStatus, WordLimit, Prompt } from "../lib/types"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Facebook, Linkedin, Twitter, AtSign, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Combobox, type ComboboxOption } from "@/components/ui/combobox"

interface AddPromptDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (prompt: {
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
  }) => void
  editingPrompt?: Prompt | null
  availableTags: string[]
  onAddTag: (tag: string) => void
}

export function AddPromptDialog({
  isOpen,
  onClose,
  onSave,
  editingPrompt = null,
  availableTags = [],
  onAddTag,
}: AddPromptDialogProps) {
  const [name, setName] = useState("")
  const [content, setContent] = useState("")
  const [platform, setPlatform] = useState<SocialPlatform>("x")
  const [language, setLanguage] = useState<string>("vi")
  const [status, setStatus] = useState<PromptStatus>("active")
  const [tone, setTone] = useState<PromptTone>("professional")
  const [wordLimit, setWordLimit] = useState<WordLimit>({ min: 50, max: 280 })
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [description, setDescription] = useState("")
  const [activeTab, setActiveTab] = useState("basic")

  // Populate form when editing
  useEffect(() => {
    if (editingPrompt) {
      setName(editingPrompt.name || "")
      setContent(editingPrompt.content || "")
      setPlatform(editingPrompt.platform || "x")
      setLanguage(editingPrompt.language || "vi")
      setStatus(editingPrompt.status || "active")
      setTone(editingPrompt.tone || "professional")
      setWordLimit(editingPrompt.wordLimit || { min: 50, max: 280 })
      setTags(editingPrompt.tags || [])
      setDescription(editingPrompt.description || "")
    }
  }, [editingPrompt])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      id: editingPrompt?.id,
      name,
      content,
      platform,
      language,
      status,
      tone,
      wordLimit,
      tags,
      description,
    })
    resetForm()
  }

  const resetForm = () => {
    setName("")
    setContent("")
    setPlatform("x")
    setLanguage("vi")
    setStatus("active")
    setTone("professional")
    setWordLimit({ min: 50, max: 280 })
    setTags([])
    setTagInput("")
    setDescription("")
    setActiveTab("basic")
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const addTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()])
      if (!availableTags.includes(tag.trim())) {
        onAddTag(tag.trim())
      }
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const renderPlatformIcon = (platform: SocialPlatform) => {
    switch (platform) {
      case "x":
        return <Twitter className="h-4 w-4" />
      case "facebook":
        return <Facebook className="h-4 w-4" />
      case "threads":
        return <AtSign className="h-4 w-4" />
      case "linkedin":
        return <Linkedin className="h-4 w-4" />
    }
  }

  const getMaxWordLimitByPlatform = (platform: SocialPlatform) => {
    switch (platform) {
      case "x":
        return 280
      case "facebook":
        return 500
      case "threads":
        return 500
      case "linkedin":
        return 1300
      default:
        return 280
    }
  }

  const handlePlatformChange = (value: SocialPlatform) => {
    setPlatform(value)
    const maxLimit = getMaxWordLimitByPlatform(value)
    setWordLimit((prev) => ({
      min: prev.min,
      max: Math.min(prev.max, maxLimit),
    }))
  }

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length

  // Convert available tags to options for Combobox
  const tagOptions: ComboboxOption[] = availableTags.map((tag) => ({
    value: tag,
    label: tag,
  }))

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{editingPrompt ? "Chỉnh sửa prompt" : "Thêm prompt mới"}</DialogTitle>
            <DialogDescription>
              {editingPrompt
                ? "Chỉnh sửa prompt cho mạng xã hội."
                : "Tạo prompt mới cho mạng xã hội. Prompt sẽ được sử dụng để tạo nội dung cho bài đăng."}
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
              <TabsTrigger value="advanced">Tùy chỉnh nâng cao</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="platform" className="text-right">
                  Mạng xã hội
                </Label>
                <Select
                  value={platform}
                  onValueChange={(value) => handlePlatformChange(value as SocialPlatform)}
                  required
                >
                  <SelectTrigger id="platform" className="col-span-3">
                    <SelectValue placeholder="Chọn mạng xã hội" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="x" className="flex items-center">
                      <div className="flex items-center">
                        <Twitter className="h-4 w-4 mr-2" />
                        <span>X (Twitter)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="facebook">
                      <div className="flex items-center">
                        <Facebook className="h-4 w-4 mr-2" />
                        <span>Facebook</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="threads">
                      <div className="flex items-center">
                        <AtSign className="h-4 w-4 mr-2" />
                        <span>Threads</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="linkedin">
                      <div className="flex items-center">
                        <Linkedin className="h-4 w-4 mr-2" />
                        <span>LinkedIn</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="language" className="text-right">
                  Ngôn ngữ
                </Label>
                <Select value={language} onValueChange={setLanguage} required>
                  <SelectTrigger id="language" className="col-span-3">
                    <SelectValue placeholder="Chọn ngôn ngữ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vi">Tiếng Việt</SelectItem>
                    <SelectItem value="en">Tiếng Anh</SelectItem>
                    <SelectItem value="fr">Tiếng Pháp</SelectItem>
                    <SelectItem value="de">Tiếng Đức</SelectItem>
                    <SelectItem value="es">Tiếng Tây Ban Nha</SelectItem>
                    <SelectItem value="zh">Tiếng Trung</SelectItem>
                    <SelectItem value="ja">Tiếng Nhật</SelectItem>
                    <SelectItem value="ko">Tiếng Hàn</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Tên prompt
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="col-span-3"
                  placeholder="Nhập tên prompt"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="content" className="text-right pt-2">
                  Nội dung
                </Label>
                <div className="col-span-3 space-y-2">
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Nhập nội dung prompt"
                    rows={5}
                    required
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Số từ: {wordCount}</span>
                    <span>
                      Giới hạn: {wordLimit.min} - {wordLimit.max} từ
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right pt-2">
                  Mô tả
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="col-span-3"
                  placeholder="Mô tả ngắn về mục đích sử dụng của prompt"
                  rows={2}
                />
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4 mt-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Trạng thái
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch
                    id="status"
                    checked={status === "active"}
                    onCheckedChange={(checked) => setStatus(checked ? "active" : "archived")}
                  />
                  <Label htmlFor="status" className="cursor-pointer">
                    {status === "active" ? "Đang hoạt động" : "Đã lưu trữ"}
                  </Label>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tone" className="text-right">
                  Văn phong
                </Label>
                <Select value={tone} onValueChange={(value) => setTone(value as PromptTone)}>
                  <SelectTrigger id="tone" className="col-span-3">
                    <SelectValue placeholder="Chọn văn phong" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">Trang trọng</SelectItem>
                    <SelectItem value="professional">Chuyên nghiệp</SelectItem>
                    <SelectItem value="casual">Thông thường</SelectItem>
                    <SelectItem value="friendly">Thân thiện</SelectItem>
                    <SelectItem value="humorous">Hài hước</SelectItem>
                    <SelectItem value="serious">Nghiêm túc</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Giới hạn từ</Label>
                <div className="col-span-3 space-y-6">
                  <div className="pt-4">
                    <Slider
                      value={[wordLimit.min, wordLimit.max]}
                      min={0}
                      max={getMaxWordLimitByPlatform(platform)}
                      step={10}
                      onValueChange={(value) => setWordLimit({ min: value[0], max: value[1] })}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Tối thiểu: {wordLimit.min} từ</span>
                      <span>Tối đa: {wordLimit.max} từ</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="tags" className="text-right pt-2">
                  Thẻ
                </Label>
                <div className="col-span-3 space-y-2">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Combobox
                        options={tagOptions}
                        onSelect={(value) => addTag(value)}
                        placeholder="Chọn hoặc tạo thẻ mới"
                        emptyText="Không tìm thấy thẻ"
                        createText="Tạo thẻ mới"
                        onCreateOption={addTag}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 rounded-full h-4 w-4 inline-flex items-center justify-center text-xs hover:bg-muted"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {tags.length === 0 && <span className="text-xs text-muted-foreground">Chưa có thẻ nào</span>}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={handleClose}>
              Hủy
            </Button>
            <Button type="submit">{editingPrompt ? "Cập nhật" : "Lưu prompt"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

