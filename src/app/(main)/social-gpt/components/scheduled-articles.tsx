"use client"

import { useState } from "react"
import { mockArticles } from "../lib/mock-data"
import type { Article } from "../lib/types"
import { formatDate } from "../lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArticleDetailModal } from "./article-detail-modal"
import { Calendar, ChevronDown, ChevronRight, ChevronUp, Clock, Edit3, Eye, PlusCircle } from "lucide-react"
import { SocialIcons } from "./social-icons"
import { toast } from "@/components/ui/use-toast"

// Thêm prop onCreateArticle vào component
export function ScheduledArticles({ onCreateArticle }: { onCreateArticle?: () => void }) {
  const today = new Date().toISOString().split("T")[0]

  // Lọc bài viết đã lên lịch trong tương lai (scheduledFor > today)
  const scheduledArticles = mockArticles.filter((article) => {
    if (!article.scheduledFor) return false
    return article.scheduledFor > today
  })

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Cập nhật hàm handleCreateArticle để sử dụng prop onCreateArticle
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

  if (scheduledArticles.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-amber-500" />
          <h2 className="text-xl font-semibold">Đã lên lịch</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            {isCollapsed ? "Mở rộng" : "Thu gọn"}
          </Button>
          <Button variant="link" size="sm" className="text-primary">
            Xem tất cả <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {!isCollapsed && (
        <Card className="border-amber-500/20 bg-amber-500/5">
          <CardContent className="p-0">
            <div className="divide-y">
              {scheduledArticles.map((article) => (
                <div key={article.id} className="p-4 hover:bg-amber-500/10 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-amber-500/20 text-amber-600 border-amber-500/30">
                          Lên lịch: {article.scheduledFor ? formatDate(article.scheduledFor) : ""}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {article.topic}
                        </Badge>
                      </div>
                      <h3 className="font-medium text-lg">{article.title}</h3>
                      <p className="text-muted-foreground line-clamp-2">{article.excerpt}</p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Tạo lúc: {formatDate(article.createdAt)}</span>
                        <span>•</span>
                        <span>{article.wordCount} từ</span>
                        {article.socialMedia && article.socialMedia.length > 0 && (
                          <>
                            <span>•</span>
                            <SocialIcons socialLinks={article.socialMedia} size="sm" showStatus={true} />
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-amber-500/30 text-amber-600 hover:bg-amber-500/20 hover:text-amber-600"
                        onClick={() => setSelectedArticle(article)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Xem trước
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit3 className="h-4 w-4 mr-2" />
                        Chỉnh sửa
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center p-4 border-t border-amber-500/10">
            <Button
              variant="outline"
              className="border-amber-500/30 text-amber-600 hover:bg-amber-500/20 hover:text-amber-600"
              onClick={handleCreateArticle}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Tạo bài viết mới
            </Button>
          </CardFooter>
        </Card>
      )}

      <ArticleDetailModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  )
}

