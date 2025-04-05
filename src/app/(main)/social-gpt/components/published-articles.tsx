"use client"

import { useState } from "react"
import { mockArticles } from "../lib/mock-data"
import type { Article } from "../lib/types"
import { formatDate } from "../lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArticleDetailModal } from "./article-detail-modal"
import { CalendarClock, ChevronDown, ChevronRight, ChevronUp, Clock, Edit3, Eye } from "lucide-react"
import { SocialIcons } from "./social-icons"

export function PublishedArticles() {
  const today = new Date().toISOString().split("T")[0]

  // Lọc bài viết đã đăng (status = published)
  const publishedArticles = mockArticles.filter((article) => article.status === "published")

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (publishedArticles.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-green-500" />
          <h2 className="text-xl font-semibold">Bài viết đã đăng</h2>
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
        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="p-0">
            <div className="divide-y">
              {publishedArticles.map((article) => (
                <div key={article.id} className="p-4 hover:bg-green-500/10 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-500/20 text-green-600 border-green-500/30">
                          Đã đăng
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {article.topic}
                        </Badge>
                      </div>
                      <h3 className="font-medium text-lg">{article.title}</h3>
                      <p className="text-muted-foreground line-clamp-2">{article.excerpt}</p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Đăng lúc: {formatDate(article.createdAt)}</span>
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
                        className="border-green-500/30 text-green-600 hover:bg-green-500/20 hover:text-green-600"
                        onClick={() => setSelectedArticle(article)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Xem chi tiết
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

