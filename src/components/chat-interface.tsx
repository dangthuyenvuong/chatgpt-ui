"use client"

import type React from "react"

import { useRef, useEffect, useCallback, useState } from "react"
import { SendIcon, RefreshCw, Settings, Info, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatMessage } from "@/components/chat-message"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import type { ChatItem } from "@/components/chat-sidebar"

type ChatInterfaceProps = {
  chat: ChatItem
  message: string
  setMessage: (message: string) => void
  handleSubmit: (e: React.FormEvent) => void
  currentAgent?: AIAgent | null
}

export type AIAgent = {
  id: string
  name: string
  description: string
  isOfficial?: boolean
  creator?: string
  rating?: number
  usersCount?: number
  dateAdded?: string
  link?: string
}

// Sửa lại ChatInterface để đảm bảo các hooks luôn được gọi theo cùng một thứ tự
export function ChatInterface({ chat, message, setMessage, handleSubmit, currentAgent }: ChatInterfaceProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showAgentInfo, setShowAgentInfo] = useState(false)

  // Định nghĩa tất cả hooks trước khi kiểm tra điều kiện
  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = "auto"
    const newHeight = Math.min(textarea.scrollHeight, 200)
    textarea.style.height = `${newHeight}px`
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    adjustTextareaHeight()
  }

  // Adjust height when message changes
  useEffect(() => {
    adjustTextareaHeight()
  }, [message, adjustTextareaHeight])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chat?.messages) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [chat?.messages])

  // Kiểm tra chat sau khi đã định nghĩa tất cả hooks
  const isChatValid = chat && chat.messages && chat.messages.length > 0

  // Mẫu AI Agent nếu không có
  const defaultAgent: AIAgent = currentAgent || {
    id: "default-agent",
    name: "Assistant",
    description: "A helpful AI assistant that can answer your questions and help with various tasks.",
    isOfficial: true,
  }

  return (
    <div className="flex flex-col h-full w-full bg-background">
      {/* AI Agent Header */}
      {defaultAgent && (
        <div className="border-b bg-secondary/20 px-4 py-2">
          <div className="flex items-center justify-between max-w-3xl mx-auto w-full">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center font-medium">
                {defaultAgent.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{defaultAgent.name}</h3>
                  {defaultAgent.isOfficial && <Badge className="bg-blue-600 text-white hover:bg-blue-700">System</Badge>}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {defaultAgent.creator && !defaultAgent.isOfficial && <span>Created by {defaultAgent.creator}</span>}
                  {defaultAgent.rating && (
                    <div className="flex items-center">
                      <span className="mr-1">Rating: {defaultAgent.rating}/5</span>
                      <span>•</span>
                      <span className="ml-1">{defaultAgent.usersCount} users</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setShowAgentInfo(!showAgentInfo)}
                    >
                      <Info className="h-4 w-4" />
                      <span className="sr-only">Agent Info</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Agent Info</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <RefreshCw className="h-4 w-4" />
                      <span className="sr-only">Reset Chat</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reset Chat</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Settings className="h-4 w-4" />
                      <span className="sr-only">Agent Settings</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Agent Settings</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      )}

      {/* Agent Info Panel (collapsible) */}
      {showAgentInfo && defaultAgent && (
        <div className="border-b bg-secondary/10 px-4 py-3">
          <div className="max-w-3xl mx-auto">
            <h4 className="text-sm font-medium mb-1">About this AI Agent</h4>
            <p className="text-sm text-muted-foreground mb-2">{defaultAgent.description}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Was this information helpful?</span>
              <Button variant="outline" size="sm" className="h-7 px-2 gap-1">
                <ThumbsUp className="h-3 w-3" />
                <span>Yes</span>
              </Button>
              <Button variant="outline" size="sm" className="h-7 px-2 gap-1">
                <ThumbsDown className="h-3 w-3" />
                <span>No</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 w-full">
        <div className="max-w-3xl mx-auto w-full">
          {isChatValid ? (
            <div className="space-y-4 w-full">
              {chat.messages.map((msg) => (
                <ChatMessage key={msg.id} content={msg.content} isUser={msg.isUser} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">No chat selected or chat data is unavailable.</p>
            </div>
          )}
        </div>
      </div>

      <div className="border-t p-4 w-full">
        <div className="max-w-3xl mx-auto w-full">
          <form onSubmit={handleSubmit} className="relative w-full">
            <div className="relative rounded-xl bg-secondary/50 shadow-sm w-full">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleChange}
                placeholder="Message AI Assistant..."
                rows={1}
                className="w-full resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 pr-12 py-3 px-4 outline-none overflow-y-auto"
                style={{
                  minHeight: "44px",
                  maxHeight: "200px",
                }}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!message.trim()}
                className="absolute bottom-3 right-3 h-8 w-8 rounded-full"
                onClick={(e) => {
                  e.preventDefault()
                  if (message.trim()) {
                    handleSubmit(e)
                  }
                }}
              >
                <SendIcon className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              PlannerAI có thể mắc lỗi. Hãy kiểm tra các thông tin quan trọng.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

