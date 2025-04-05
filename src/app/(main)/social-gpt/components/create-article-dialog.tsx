"use client"

import type React from "react"

import { useState } from "react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Facebook, Linkedin, Twitter, AtSign, Sparkles, ImageIcon, X } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { MediaManagerDialog } from "./media-manager-dialog"

interface CreateArticleDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (article: any) => void
}

export function CreateArticleDialog({ isOpen, onClose, onSave }: CreateArticleDialogProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [topic, setTopic] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [activeTab, setActiveTab] = useState("content")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [isMediaDialogOpen, setIsMediaDialogOpen] = useState(false)
  const [selectedImages, setSelectedImages] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      toast({
        title: "Tiêu đề không được để trống",
        description: "Vui lòng nhập tiêu đề cho bài viết",
        variant: "destructive",
      })
      return
    }

    if (!content.trim()) {
      toast({
        title: "Nội dung không được để trống",
        description: "Vui lòng nhập nội dung cho bài viết",
        variant: "destructive",
      })
      return
    }

    // Tạo đối tượng bài viết mới
    const newArticle = {
      id: `article-${Date.now()}`,
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + "...",
      topic,
      model: "GPT-4", // Giá trị mặc định
      tags,
      images: selectedImages,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "draft",
      wordCount: content.trim().split(/\s+/).length,
      scheduledFor: date ? date.toISOString().split("T")[0] : undefined,
      socialMedia: selectedPlatforms.map((platform) => ({
        platform,
        url: "",
        status: "draft",
      })),
    }

    onSave(newArticle)
    resetForm()

    toast({
      title: "Bài viết đã được tạo",
      description: "Bài viết mới đã được thêm vào danh sách",
    })
  }

  const resetForm = () => {
    setTitle("")
    setContent("")
    setExcerpt("")
    setTopic("")
    setTags([])
    setDate(undefined)
    setActiveTab("content")
    setSelectedPlatforms([])
    setSelectedImages([])
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) => (prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]))
  }

  const generateContent = () => {
    // Trong thực tế, đây sẽ là một API call đến AI service
    toast({
      title: "Đang tạo nội dung...",
      description: "Hệ thống đang sử dụng AI để tạo nội dung cho bài viết của bạn.",
    })

    // Giả lập việc tạo nội dung sau 1.5 giây
    setTimeout(() => {
      const generatedTitle = "Cách AI đang thay đổi ngành công nghiệp nội dung số"
      const generatedContent = `Trí tuệ nhân tạo (AI) đang nhanh chóng trở thành một công cụ không thể thiếu trong ngành công nghiệp nội dung số. Từ việc tạo ra các bài viết, hình ảnh, đến video, AI đang mang đến những khả năng mới mà trước đây chúng ta chưa từng nghĩ tới.

Một trong những lợi ích lớn nhất của AI trong sáng tạo nội dung là khả năng tự động hóa các tác vụ lặp đi lặp lại. Điều này giúp các nhà sáng tạo nội dung tiết kiệm thời gian và tập trung vào các khía cạnh sáng tạo hơn của công việc.

Tuy nhiên, AI không phải là giải pháp cho mọi vấn đề. Nội dung do AI tạo ra thường thiếu đi sự tinh tế và cảm xúc mà con người mang lại. Vì vậy, cách tiếp cận tốt nhất là kết hợp sức mạnh của AI với sự sáng tạo của con người.

Trong tương lai, chúng ta có thể mong đợi sự phát triển hơn nữa của các công cụ AI, giúp quá trình sáng tạo nội dung trở nên dễ dàng và hiệu quả hơn. Tuy nhiên, vai trò của con người trong việc đảm bảo chất lượng và tính xác thực của nội dung sẽ vẫn rất quan trọng.`

      const generatedExcerpt =
        "Khám phá cách trí tuệ nhân tạo đang cách mạng hóa ngành công nghiệp nội dung số và làm thế nào để tận dụng sức mạnh của nó một cách hiệu quả."

      setTitle(generatedTitle)
      setContent(generatedContent)
      setExcerpt(generatedExcerpt)

      toast({
        title: "Đã tạo nội dung thành công",
        description: "Nội dung đã được tạo bởi AI. Bạn có thể chỉnh sửa nếu cần.",
      })
    }, 1500)
  }

  const handleSelectImage = (imageUrl: string) => {
    setSelectedImages([...selectedImages, imageUrl])
  }

  const handleRemoveImage = (imageUrl: string) => {
    setSelectedImages(selectedImages.filter((url) => url !== imageUrl))
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Tạo bài viết mới</DialogTitle>
            <DialogDescription>Tạo bài viết mới bằng cách điền thông tin vào form dưới đây.</DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="content">Nội dung</TabsTrigger>
              <TabsTrigger value="metadata">Thông tin bổ sung</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4 mt-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="title">Tiêu đề</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={generateContent}
                    >
                      <Sparkles className="h-4 w-4" />
                      Tạo nội dung bằng AI
                    </Button>
                  </div>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nhập tiêu đề bài viết"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="content">Nội dung</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => setIsMediaDialogOpen(true)}
                    >
                      <ImageIcon className="h-4 w-4" />
                      Thêm hình ảnh
                    </Button>
                  </div>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Nhập nội dung bài viết"
                    rows={12}
                    required
                  />
                </div>

                {selectedImages.length > 0 && (
                  <div className="grid gap-2">
                    <Label>Hình ảnh đã chọn</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {selectedImages.map((imageUrl, index) => (
                        <div key={index} className="relative group border rounded-md overflow-hidden">
                          <img
                            src={imageUrl || "/placeholder.svg"}
                            alt={`Hình ảnh ${index + 1}`}
                            className="w-full h-32 object-cover"
                          />
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveImage(imageUrl)}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid gap-2">
                  <Label htmlFor="excerpt">Tóm tắt (tùy chọn)</Label>
                  <Textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Nhập tóm tắt ngắn cho bài viết"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    Nếu để trống, tóm tắt sẽ được tạo tự động từ nội dung bài viết.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="metadata" className="space-y-4 mt-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="topic">Chủ đề</Label>
                  <Select value={topic} onValueChange={setTopic}>
                    <SelectTrigger id="topic">
                      <SelectValue placeholder="Chọn chủ đề" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Công nghệ</SelectItem>
                      <SelectItem value="business">Kinh doanh</SelectItem>
                      <SelectItem value="health">Sức khỏe</SelectItem>
                      <SelectItem value="lifestyle">Lối sống</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="productivity">Năng suất</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label>Thẻ</Label>
                  <div className="flex flex-wrap gap-2">
                    {["AI", "Technology", "Business", "Marketing", "Health"].map((tag) => (
                      <Badge
                        key={tag}
                        variant={tags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          if (tags.includes(tag)) {
                            setTags(tags.filter((t) => t !== tag))
                          } else {
                            setTags([...tags, tag])
                          }
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">Click vào thẻ để chọn hoặc bỏ chọn</p>
                </div>

                <div className="grid gap-2">
                  <Label>Ngày đăng</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: vi }) : "Chọn ngày đăng"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <p className="text-xs text-muted-foreground">
                    Nếu không chọn ngày, bài viết sẽ được lưu dưới dạng bản nháp.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="social" className="space-y-4 mt-4">
              <div className="grid gap-4">
                <Label>Chọn nền tảng để đăng bài</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant={selectedPlatforms.includes("x") ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => togglePlatform("x")}
                  >
                    <Twitter className="mr-2 h-4 w-4" />X (Twitter)
                  </Button>
                  <Button
                    type="button"
                    variant={selectedPlatforms.includes("facebook") ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => togglePlatform("facebook")}
                  >
                    <Facebook className="mr-2 h-4 w-4" />
                    Facebook
                  </Button>
                  <Button
                    type="button"
                    variant={selectedPlatforms.includes("linkedin") ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => togglePlatform("linkedin")}
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                  <Button
                    type="button"
                    variant={selectedPlatforms.includes("threads") ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => togglePlatform("threads")}
                  >
                    <AtSign className="mr-2 h-4 w-4" />
                    Threads
                  </Button>
                </div>
                {selectedPlatforms.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Bài viết sẽ được chuẩn bị để đăng trên {selectedPlatforms.length} nền tảng đã chọn.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={handleClose}>
              Hủy
            </Button>
            <Button type="submit">Tạo bài viết</Button>
          </DialogFooter>
        </form>

        <MediaManagerDialog
          isOpen={isMediaDialogOpen}
          onClose={() => setIsMediaDialogOpen(false)}
          onSelectImage={handleSelectImage}
        />
      </DialogContent>
    </Dialog>
  )
}

