"use client"

import { useState } from "react"
import { ArticleFilters } from "./components/article-filters"
import { PageHeader } from "./components/page-header"
import { ArticleColumnView } from "./components/article-column-view"
import { PromptMenu } from "./components/prompt-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateArticleDialog } from "./components/create-article-dialog"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import type { Article } from "./lib/types"
import { toast } from "@/components/ui/use-toast"

export default function SocialGPTPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const handleCreateArticle = () => {
    setIsCreateDialogOpen(true)
  }

  const handleSaveArticle = (article: Article) => {
    // Trong thực tế, đây sẽ là một API call để lưu bài viết
    toast({
      title: "Bài viết đã được tạo",
      description: "Bài viết mới đã được thêm vào danh sách",
    })
    setIsCreateDialogOpen(false)
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <PageHeader />

      <Tabs defaultValue="articles" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="justify-start">
            <TabsTrigger value="articles">Bài viết</TabsTrigger>
            <TabsTrigger value="prompts">Prompt</TabsTrigger>
          </TabsList>

          <Button onClick={handleCreateArticle}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Tạo bài viết mới
          </Button>
        </div>

        <TabsContent value="articles" className="space-y-8">
          <ArticleFilters />
          <ArticleColumnView onViewArticle={setSelectedArticle} onCreateArticle={handleCreateArticle} />
        </TabsContent>

        <TabsContent value="prompts">
          <PromptMenu />
        </TabsContent>
      </Tabs>

      <CreateArticleDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSave={handleSaveArticle}
      />
    </div>
  )
}

