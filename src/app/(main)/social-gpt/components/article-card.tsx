"use client"

import { formatDate } from "../lib/utils"
import type { Article } from "../lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, MoreVertical, Pencil, RefreshCw, Trash2 } from "lucide-react"
import { SocialIcons } from "./social-icons"

interface ArticleCardProps {
  article: Article
  onView: () => void
}

export function ArticleCard({ article, onView }: ArticleCardProps) {
  const statusColors = {
    published: "bg-green-500",
    draft: "bg-yellow-500",
    archived: "bg-gray-500",
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg line-clamp-2">{article.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{formatDate(article.createdAt)}</span>
              <span>•</span>
              <Badge variant="outline" className="capitalize">
                {article.topic}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${statusColors[article.status as keyof typeof statusColors]}`} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Mở menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  <span>Xem</span>
                </DropdownMenuItem>
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
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3">{article.excerpt}</p>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {article.wordCount} từ
            </Badge>
            {article.socialMedia && article.socialMedia.length > 0 && (
              <SocialIcons socialLinks={article.socialMedia} size="sm" />
            )}
          </div>
          <Button variant="outline" size="sm" onClick={onView}>
            <Eye className="mr-2 h-4 w-4" />
            Xem chi tiết
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

