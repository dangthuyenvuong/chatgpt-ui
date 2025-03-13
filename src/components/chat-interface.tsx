"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { SendIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatMessage } from "@/components/chat-message"
import type { ChatItem } from "@/components/chat-sidebar"

type ChatInterfaceProps = {
  chat: ChatItem
  message: string
  setMessage: (message: string) => void
  handleSubmit: (e: React.FormEvent) => void
}

export function ChatInterface({ chat, message, setMessage, handleSubmit }: ChatInterfaceProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    adjustTextareaHeight()
  }

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = "auto"
    const newHeight = Math.min(textarea.scrollHeight, 200)
    textarea.style.height = `${newHeight}px`
  }

  // Adjust height when message changes
  useEffect(() => {
    adjustTextareaHeight()
  }, [message])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chat.messages])

  return (
    <div className="flex flex-col h-full w-full bg-background text-sm">
      <div className="flex-1 overflow-y-auto p-4 w-full">
        <div className="max-w-3xl mx-auto w-full">
          <div className="space-y-4 w-full">
            {chat.messages.map((msg) => (
              <ChatMessage key={msg.id} content={msg.content} isUser={msg.isUser} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      <div className="p-4 w-full">
        <div className="max-w-3xl mx-auto w-full">
          <form onSubmit={handleSubmit} className="relative w-full">
            <div className="relative rounded-xl bg-secondary/50 shadow-sm w-full">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleChange}
                placeholder="Message AI Assistant..."
                rows={1}
                className="w-full text-sm resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 pr-12 py-3 px-4 outline-none overflow-y-auto"
                style={{
                  minHeight: "44px",
                  maxHeight: "200px",
                }}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!message.trim()}
                className="absolute bottom-2.5 right-3 h-8 w-8 rounded-full"
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
            {/* <p className="text-xs text-muted-foreground mt-2 text-center">
              PlannerAI có thể mắc lỗi. Hãy kiểm tra các thông tin quan trọng.
            </p> */}
          </form>
        </div>
      </div>
    </div>
  )
}

