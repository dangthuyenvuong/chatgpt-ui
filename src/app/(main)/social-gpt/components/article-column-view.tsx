"use client"

import type React from "react"

import { useState } from "react"
import { mockArticles } from "../lib/mock-data"
import type { Article } from "../lib/types"
import { formatDate } from "../lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArticleDetailModal } from "./article-detail-modal"
import { Clock, Edit3, Eye, MoreVertical, PlusCircle, FileText, CheckCircle, Calendar } from "lucide-react"
import { SocialIcons } from "./social-icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

// Thêm prop onCreateArticle vào interface ArticleColumnViewProps
interface ArticleColumnViewProps {
  onViewArticle: (article: Article) => void
  onCreateArticle?: () => void
}

type ColumnType = "unscheduled" | "published" | "today" | "scheduled"

// Cập nhật function signature để nhận prop onCreateArticle
export function ArticleColumnView({ onViewArticle, onCreateArticle }: ArticleColumnViewProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [articles, setArticles] = useState<Article[]>(mockArticles)

  const today = new Date().toISOString().split("T")[0]

  // Phân loại bài viết theo trạng thái
  const unscheduledArticles = articles.filter((article) => !article.scheduledFor && article.status !== "published")
  const publishedArticles = articles.filter((article) => article.status === "published")
  const todayArticles = articles.filter((article) => article.scheduledFor === today && article.status !== "published")
  const scheduledArticles = articles.filter((article) => article.scheduledFor && article.scheduledFor > today)

  // Tạo map để lưu trữ bài viết theo cột
  const columnsMap = {
    unscheduled: unscheduledArticles,
    published: publishedArticles,
    today: todayArticles,
    scheduled: scheduledArticles,
  }

  // Cấu hình sensors cho dnd-kit với khoảng cách tối thiểu để kích hoạt drag
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Yêu cầu di chuyển ít nhất 8px trước khi bắt đầu kéo
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // Thay đổi hàm handleCreateArticle để sử dụng prop onCreateArticle
  const handleCreateArticle = () => {
    if (onCreateArticle) {
      onCreateArticle()
    } else {
      toast({
        title: "Tạo bài viết mới",
        description: "Chức năng tạo bài viết mới sẽ được mở.",
      })
    }
  }

  const handleViewArticle = (article: Article) => {
    setSelectedArticle(article)
    onViewArticle(article)
  }

  // Xử lý khi bắt đầu kéo
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id as string)
  }

  // Xử lý khi kết thúc kéo
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      setActiveId(null)
      return
    }

    // Nếu kéo vào một cột khác
    if (active.id !== over.id) {
      const activeArticleId = active.id as string
      const overContainerId = over.id as string

      // Tìm bài viết được kéo
      const activeArticle = articles.find((article) => article.id === activeArticleId)

      if (!activeArticle) {
        setActiveId(null)
        return
      }

      // Cập nhật trạng thái của bài viết dựa vào cột đích
      const updatedArticles = articles.map((article) => {
        if (article.id === activeArticleId) {
          const updatedArticle = { ...article }

          switch (overContainerId) {
            case "unscheduled":
              updatedArticle.scheduledFor = undefined
              updatedArticle.status = "draft"
              toast({
                title: "Đã chuyển sang Chưa lên lịch",
                description: `Bài viết "${article.title}" đã được chuyển sang trạng thái chưa lên lịch.`,
              })
              break
            case "published":
              updatedArticle.status = "published"
              toast({
                title: "Đã chuyển sang Đã đăng",
                description: `Bài viết "${article.title}" đã được chuyển sang trạng thái đã đăng.`,
              })
              break
            case "today":
              updatedArticle.scheduledFor = today
              updatedArticle.status = "draft"
              toast({
                title: "Đã chuyển sang Hôm nay",
                description: `Bài viết "${article.title}" đã được lên lịch đăng hôm nay.`,
              })
              break
            case "scheduled":
              // Đặt lịch cho ngày mai
              const tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              updatedArticle.scheduledFor = tomorrow.toISOString().split("T")[0]
              updatedArticle.status = "draft"
              toast({
                title: "Đã chuyển sang Đã lên lịch",
                description: `Bài viết "${article.title}" đã được lên lịch đăng vào ngày mai.`,
              })
              break
          }

          return updatedArticle
        }
        return article
      })

      setArticles(updatedArticles)
    }

    setActiveId(null)
  }

  // Component cho mỗi card bài viết có thể kéo thả
  const SortableArticleCard = ({ article, columnType }: { article: Article; columnType: ColumnType }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: article.id })

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    }

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <ArticleCard article={article} columnType={columnType} />
      </div>
    )
  }

  // Component cho mỗi card bài viết
  const ArticleCard = ({ article, columnType }: { article: Article; columnType: ColumnType }) => {
    let badgeClassName = ""

    // Tùy chỉnh style dựa vào loại cột
    switch (columnType) {
      case "unscheduled":
        badgeClassName = "bg-gray-100 text-gray-700 border-gray-200"
        break
      case "published":
        badgeClassName = "bg-green-500/20 text-green-600 border-green-500/30"
        break
      case "today":
        badgeClassName = "bg-primary/20 text-primary border-primary/30 font-medium"
        break
      case "scheduled":
        badgeClassName = "bg-amber-500/20 text-amber-600 border-amber-500/30"
        break
    }

    return (
      <Card className="mb-3 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
        <CardHeader className="p-3 pb-0 flex flex-row justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={badgeClassName}>
                {columnType === "unscheduled" && "Unscheduled"}
                {columnType === "published" && "Published"}
                {columnType === "today" && "Today"}
                {columnType === "scheduled" && article.scheduledFor
                  ? `Scheduled: ${formatDate(article.scheduledFor)}`
                  : "Scheduled"}
              </Badge>
            </div>
            <h3 className="font-medium text-sm line-clamp-2">{article.title}</h3>
          </div>
          <div
            className="z-10"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Mở menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleViewArticle(article)}>
                  <Eye className="mr-2 h-4 w-4" />
                  <span>Xem</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit3 className="mr-2 h-4 w-4" />
                  <span>Chỉnh sửa</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-2">
          <p className="text-muted-foreground text-xs line-clamp-2">{article.excerpt}</p>
          <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{formatDate(article.createdAt)}</span>
            <span>•</span>
            <span>{article.wordCount} từ</span>
          </div>
          {article.socialMedia && article.socialMedia.length > 0 && (
            <div className="mt-2">
              <SocialIcons socialLinks={article.socialMedia} size="sm" />
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  // Component cho mỗi cột
  const Column = ({
    columnType,
    title,
    articles,
    icon,
    bgColor,
    borderColor,
    iconColor,
  }: {
    columnType: ColumnType
    title: string
    articles: Article[]
    icon: React.ReactNode
    bgColor: string
    borderColor: string
    iconColor: string
  }) => (
    <div id={columnType} className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-3 font-medium">
        <div className={`text-${iconColor}`}>{icon}</div>
        <h3>{title}</h3>
        <Badge className="ml-1">{articles.length}</Badge>
      </div>
      <div className={`${bgColor} ${borderColor} rounded-md p-3 flex-grow overflow-y-auto max-h-[calc(100vh-220px)]`}>
        <SortableContext items={articles.map((a) => a.id)} strategy={verticalListSortingStrategy}>
          {articles.length > 0 ? (
            <div className="space-y-3">
              {articles.map((article) => (
                <SortableArticleCard key={article.id} article={article} columnType={columnType} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-4 text-muted-foreground">
              <p className="mb-2">Không có bài viết nào</p>
              {columnType !== "published" && (
                <Button variant="outline" size="sm" onClick={handleCreateArticle}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Tạo bài viết
                </Button>
              )}
            </div>
          )}
        </SortableContext>
      </div>
      {articles.length > 0 && columnType !== "published" && (
        <div className="mt-3 text-center">
          <Button variant="outline" size="sm" onClick={handleCreateArticle}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Tạo bài viết
          </Button>
        </div>
      )}
    </div>
  )

  // Tìm bài viết đang được kéo
  const activeArticle = activeId ? articles.find((article) => article.id === activeId) : null

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full">
          <Column
            columnType="unscheduled"
            title="Chưa lên lịch"
            articles={unscheduledArticles}
            icon={<FileText className="h-4 w-4" />}
            bgColor="bg-gray-50/30"
            borderColor="border border-gray-100"
            iconColor="gray-500"
          />
          <Column
            columnType="published"
            title="Published"
            articles={publishedArticles}
            icon={<CheckCircle className="h-4 w-4" />}
            bgColor="bg-green-50/30"
            borderColor="border border-green-100"
            iconColor="green-500"
          />
          <Column
            columnType="today"
            title="Today"
            articles={todayArticles}
            icon={<Clock className="h-4 w-4" />}
            bgColor="bg-primary/5"
            borderColor="border border-primary/10"
            iconColor="primary"
          />
          <Column
            columnType="scheduled"
            title="Đã lên lịch"
            articles={scheduledArticles}
            icon={<Calendar className="h-4 w-4" />}
            bgColor="bg-amber-50/30"
            borderColor="border border-amber-100"
            iconColor="amber-500"
          />
        </div>

        <DragOverlay>
          {activeArticle && (
            <ArticleCard
              article={activeArticle}
              columnType={
                activeArticle.status === "published"
                  ? "published"
                  : !activeArticle.scheduledFor
                    ? "unscheduled"
                    : activeArticle.scheduledFor === today
                      ? "today"
                      : "scheduled"
              }
            />
          )}
        </DragOverlay>
      </div>

      <ArticleDetailModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </DndContext>
  )
}

