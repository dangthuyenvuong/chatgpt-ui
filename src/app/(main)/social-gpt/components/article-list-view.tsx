"use client"

import { formatDate } from "../lib/utils"
import type { Article } from "../lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, MoreVertical, Pencil, RefreshCw, Trash2 } from "lucide-react"
import { SocialIcons } from "./social-icons"

interface ArticleListViewProps {
  articles: Article[]
  onViewArticle: (article: Article) => void
}

// Hàm nhóm bài viết theo ngày
function groupArticlesByDate(articles: Article[]): { date: string; articles: Article[] }[] {
  const groups: Record<string, Article[]> = {}

  articles.forEach((article) => {
    const date = new Date(article.createdAt).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    if (!groups[date]) {
      groups[date] = []
    }

    groups[date].push(article)
  })

  return Object.entries(groups)
    .map(([date, articles]) => ({ date, articles }))
    .sort((a, b) => {
      // Sắp xếp theo ngày mới nhất trước
      const dateA = new Date(a.articles[0].createdAt)
      const dateB = new Date(b.articles[0].createdAt)
      return dateB.getTime() - dateA.getTime()
    })
}

export function ArticleListView({ articles, onViewArticle }: ArticleListViewProps) {
  const groupedArticles = groupArticlesByDate(articles)

  const statusColors = {
    published: "bg-green-500",
    draft: "bg-yellow-500",
    archived: "bg-gray-500",
  }

  return (
    <div className="space-y-8">
      {groupedArticles.map((group) => (
        <div key={group.date} className="space-y-2">
          <h3 className="font-medium text-lg sticky top-0 bg-background py-2 z-10">{group.date}</h3>
          <div className="space-y-2 pl-2">
            {group.articles.map((article) => (
              <div
                key={article.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-grow space-y-1 mb-3 sm:mb-0">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${statusColors[article.status as keyof typeof statusColors]}`}
                    />
                    <h4 className="font-medium line-clamp-1">{article.title}</h4>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-1">{article.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>{formatDate(article.createdAt)}</span>
                    <span>•</span>
                    <Badge variant="outline" className="capitalize text-xs">
                      {article.topic}
                    </Badge>
                    <span>•</span>
                    <span>{article.wordCount} từ</span>
                    {article.socialMedia && article.socialMedia.length > 0 && (
                      <>
                        <span>•</span>
                        <SocialIcons socialLinks={article.socialMedia} size="sm" />
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <Button variant="outline" size="sm" onClick={() => onViewArticle(article)}>
                    <Eye className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Xem</span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Mở menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Chỉnh sửa</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        <span>Tạo lại</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Xóa</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Không tìm thấy bài viết nào</p>
        </div>
      )}
    </div>
  )
}

