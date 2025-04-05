"use client"

import { Button } from "@/components/ui/button"
import { LayoutGrid, Columns } from "lucide-react"

interface ViewToggleProps {
  view: "grid" | "column"
  onViewChange: (view: "grid" | "column") => void
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center space-x-1 border rounded-md">
      <Button
        variant={view === "grid" ? "default" : "ghost"}
        size="sm"
        className="rounded-r-none"
        onClick={() => onViewChange("grid")}
        aria-label="Chế độ xem lưới"
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        variant={view === "column" ? "default" : "ghost"}
        size="sm"
        className="rounded-l-none"
        onClick={() => onViewChange("column")}
        aria-label="Chế độ xem cột"
      >
        <Columns className="h-4 w-4" />
      </Button>
    </div>
  )
}

