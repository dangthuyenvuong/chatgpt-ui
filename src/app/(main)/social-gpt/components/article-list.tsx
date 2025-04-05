"use client"

import { useState } from "react"
import { ArticleCard } from "./article-card"
import { ArticleListView } from "./article-list-view"
import { ArticleDetailModal } from "./article-detail-modal"
import { ViewToggle } from "./view-toggle"
import { mockArticles } from "../lib/mock-data"
import type { Article } from "../lib/types"

export function ArticleList() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  const today = new Date().toISOString().split("T")[0]

  // Lọc bỏ các bài viết đã đăng hôm nay và đã lên lịch trong tương lai
  const filteredArticles = mockArticles.filter((article) => {
    // Bỏ qua bài viết đã đăng hôm nay
    if (article.scheduledFor === today && article.status === "published") {
      return false
    }

    // Bỏ qua bài viết đã lên lịch trong tương lai
    if (article.scheduledFor && article.scheduledFor > today) {
      return false
    }

    return true
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <ViewToggle view={viewMode} onViewChange={setViewMode} />
      </div>

      {viewMode === "list" ? (
        <ArticleListView articles={filteredArticles} onViewArticle={setSelectedArticle} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} onView={() => setSelectedArticle(article)} />
          ))}
        </div>
      )}

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Không tìm thấy bài viết nào</p>
        </div>
      )}

      <ArticleDetailModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  )
}

