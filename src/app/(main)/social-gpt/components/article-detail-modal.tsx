"use client"

import type { Article } from "../lib/types"
import { formatDate } from "../lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Pencil, RefreshCw, Trash2 } from "lucide-react"
import { SocialIcons } from "./social-icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ArticleDetailModalProps {
  article: Article | null
  isOpen: boolean
  onClose: () => void
}

export function ArticleDetailModal({ article, isOpen, onClose }: ArticleDetailModalProps) {
  if (!article) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{article.title}</DialogTitle>
          <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-muted-foreground">
            <span>{formatDate(article.createdAt)}</span>
            <span>•</span>
            <Badge variant="outline" className="capitalize">
              {article.topic}
            </Badge>
            <span>•</span>
            <Badge
              variant={
                article.status === "published" ? "success" : article.status === "draft" ? "warning" : "secondary"
              }
              className="capitalize"
            >
              {article.status}
            </Badge>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            <span>Tạo bởi: </span>
            <Badge variant="secondary" className="text-xs">
              {article.model}
            </Badge>
          </div>
        </DialogHeader>

        <Tabs defaultValue="content" className="mt-4">
          <TabsList>
            <TabsTrigger value="content">Nội dung</TabsTrigger>
            <TabsTrigger value="social">
              Social Media
              {article.socialMedia && article.socialMedia.length > 0 && (
                <span className="ml-1 text-xs bg-primary/20 text-primary rounded-full px-1.5">
                  {article.socialMedia.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4 my-4">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              {article.content.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-4 my-4">
            {article.socialMedia && article.socialMedia.length > 0 ? (
              <div className="space-y-4">
                {article.socialMedia.map((social, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <SocialIcons socialLinks={[social]} size="lg" />
                        <span className="font-medium capitalize">{social.platform}</span>
                      </div>
                      <Badge
                        variant={
                          social.status === "posted"
                            ? "success"
                            : social.status === "scheduled"
                              ? "warning"
                              : "secondary"
                        }
                      >
                        {social.status === "posted"
                          ? "Đã đăng"
                          : social.status === "scheduled"
                            ? "Đã lên lịch"
                            : "Bản nháp"}
                      </Badge>
                    </div>
                    {social.scheduledFor && (
                      <div className="text-sm text-muted-foreground mb-2">
                        Lên lịch: {new Date(social.scheduledFor).toLocaleString("vi-VN")}
                      </div>
                    )}
                    <div className="flex justify-between items-center mt-4">
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        Xem bài đăng
                      </a>
                      <Button variant="outline" size="sm">
                        <Pencil className="h-4 w-4 mr-2" />
                        Chỉnh sửa
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Chưa có kênh social media nào được thêm vào bài viết này</p>
                <Button variant="outline" className="mt-4">
                  Thêm kênh social media
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none">
              <Pencil className="mr-2 h-4 w-4" />
              Chỉnh sửa
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-none">
              <RefreshCw className="mr-2 h-4 w-4" />
              Tạo lại
            </Button>
            <Button variant="destructive" className="flex-1 sm:flex-none">
              <Trash2 className="mr-2 h-4 w-4" />
              Xóa
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

