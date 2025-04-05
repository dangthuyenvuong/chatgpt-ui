"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function ArticleFilters() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Tìm kiếm bài viết..." className="pl-8" />
        </div>
      </div>
    </div>
  )
}

