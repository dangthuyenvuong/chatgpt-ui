"use client"

import * as React from "react"
import { X, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

interface TagInputProps {
  selectedTags: string[]
  availableTags: string[]
  onTagsChange: (tags: string[]) => void
  onCreateTag?: (tag: string) => void
  placeholder?: string
}

export function TagInput({
  selectedTags = [],
  availableTags = [],
  onTagsChange,
  onCreateTag,
  placeholder = "Chọn hoặc tạo thẻ mới...",
}: TagInputProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  const handleUnselect = (tag: string) => {
    onTagsChange(selectedTags.filter((s) => s !== tag))
  }

  const handleSelect = (tag: string) => {
    setInputValue("")
    if (selectedTags.includes(tag)) return
    onTagsChange([...selectedTags, tag])
  }

  const handleCreateTag = () => {
    if (!inputValue.trim()) return

    // Thêm tag mới vào danh sách đã chọn
    handleSelect(inputValue)

    // Thông báo cho component cha biết có tag mới được tạo
    if (onCreateTag && !availableTags.includes(inputValue)) {
      onCreateTag(inputValue)
    }
  }

  // Lọc ra các tag chưa được chọn để hiển thị trong dropdown
  const filteredTags = availableTags.filter(
    (tag) => !selectedTags.includes(tag) && tag.toLowerCase().includes(inputValue.toLowerCase()),
  )

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            type="button"
          >
            {placeholder}
            <Plus className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Tìm kiếm thẻ..." value={inputValue} onValueChange={setInputValue} />
            <CommandList>
              <CommandEmpty>
                {inputValue.trim() ? (
                  <div className="py-3 px-2">
                    <p className="text-sm text-muted-foreground mb-2">Không tìm thấy thẻ "{inputValue}"</p>
                    <Button type="button" variant="secondary" size="sm" className="w-full" onClick={handleCreateTag}>
                      <Plus className="mr-2 h-4 w-4" />
                      Tạo thẻ mới "{inputValue}"
                    </Button>
                  </div>
                ) : (
                  <p className="py-6 text-center text-sm">Không có thẻ nào</p>
                )}
              </CommandEmpty>
              <CommandGroup>
                {filteredTags.map((tag) => (
                  <CommandItem
                    key={tag}
                    value={tag}
                    onSelect={() => {
                      handleSelect(tag)
                      setOpen(false)
                    }}
                  >
                    {tag}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            {inputValue.trim() && filteredTags.length > 0 && (
              <div className="p-2 border-t">
                <Button type="button" variant="secondary" size="sm" className="w-full" onClick={handleCreateTag}>
                  <Plus className="mr-2 h-4 w-4" />
                  Tạo thẻ mới "{inputValue}"
                </Button>
              </div>
            )}
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex flex-wrap gap-2">
        {selectedTags.length > 0 ? (
          selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <button
                type="button"
                className="ml-1 rounded-full h-4 w-4 inline-flex items-center justify-center text-xs hover:bg-muted"
                onClick={() => handleUnselect(tag)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))
        ) : (
          <span className="text-xs text-muted-foreground">Chưa có thẻ nào</span>
        )}
      </div>
    </div>
  )
}

