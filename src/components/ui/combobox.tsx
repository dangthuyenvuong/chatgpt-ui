"use client"

import * as React from "react"
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export type ComboboxOption = {
  value: string
  label: string
}

interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onSelect: (value: string) => void
  placeholder?: string
  emptyText?: string
  createText?: string
  className?: string
  onCreateOption?: (value: string) => void
}

export function Combobox({
  options,
  value,
  onSelect,
  placeholder = "Chọn một tùy chọn",
  emptyText = "Không tìm thấy kết quả.",
  createText = "Tạo mới",
  className,
  onCreateOption,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")

  const selectedOption = React.useMemo(() => options.find((option) => option.value === value), [options, value])

  const handleCreateOption = React.useCallback(() => {
    if (!searchValue) return
    onCreateOption?.(searchValue)
    setSearchValue("")
  }, [searchValue, onCreateOption])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Tìm kiếm..." value={searchValue} onValueChange={setSearchValue} />
          <CommandList>
            <CommandEmpty>
              {emptyText}
              {onCreateOption && (
                <Button variant="ghost" className="mt-2 w-full justify-start" onClick={handleCreateOption}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  {createText} "{searchValue}"
                </Button>
              )}
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onSelect(currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
            {onCreateOption && searchValue && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={handleCreateOption}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    {createText} "{searchValue}"
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

