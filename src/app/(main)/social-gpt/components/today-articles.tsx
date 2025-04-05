"use client"

import { useState } from "react"
import { mockArticles } from "../lib/mock-data"
import type { Article } from "../lib/types"
import { formatDate } from "../lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArticleDetailModal } from "./article-detail-modal"
import { ChevronDown, ChevronRight, ChevronUp, Clock, Edit3, Eye, PlusCircle, Star, CheckCircle } from "lucide-react"
import { SocialIcons } from "./social-icons"
import { toast } from "@/components/ui/use-toast"

// Thêm prop onCreateArticle vào component
export function TodayArticles({ onCreateArticle }: { onCreateArticle?: () => void }) {
  const today = new Date().toISOString().split("T")[0]

  // Lọc bài viết đăng hôm nay (scheduledFor = today)
  const todayArticles = mockArticles.filter(
    (article) => article.scheduledFor === today && article.status !== "published",
  )

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleMarkAsPublished = (articleId: string) => {
    // Trong thực tế, đây sẽ là một API call để cập nhật trạng thái của bài viết
    toast({
      title: "Đã đánh dấu là đã đăng",
      description: "Bài viết đã được chuyển sang trạng thái đã đăng.",
    })
  }

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

  if (todayArticles.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-primary fill-primary" />
          <h2 className="text-xl font-semibold">Bài viết hôm nay</h2>
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
        <Card className="border-primary/30 bg-primary/10 shadow-md">
          <CardContent className="p-0">
            <div className="divide-y divide-primary/10">
              {todayArticles.map((article) => (
                <div key={article.id} className="p-4 hover:bg-primary/15 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30 font-medium">
                          Đăng hôm nay
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
                        className="border-primary/30 text-primary hover:bg-primary/20 hover:text-primary"
                        onClick={() => setSelectedArticle(article)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Xem trước
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit3 className="h-4 w-4 mr-2" />
                        Chỉnh sửa
                      </Button>
                      <Button variant="default" size="sm" onClick={() => handleMarkAsPublished(article.id)}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Đã đăng
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center p-4 border-t border-primary/10">
            <Button
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/20 hover:text-primary"
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

