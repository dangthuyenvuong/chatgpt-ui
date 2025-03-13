import { formatAIMessage } from "@/utils/format-message"

type ChatMessageProps = {
  content: string
  isUser: boolean
}

export function ChatMessage({ content, isUser }: ChatMessageProps) {
  if (isUser) {
    return (
      <div className="flex justify-end mb-8">
        <div className="max-w-[80%] text-right">
          <div className="rounded-lg px-4 py-2 bg-[#2b2c2e] text-white">
            <p className="whitespace-pre-wrap">{content}</p>
          </div>
        </div>
      </div>
    )
  }

  // AI message
  return (
    <div className="mb-8 mx-auto max-w-[90%]">
      <div className="text-left">
        <div className="bg-transparent text-foreground prose prose-sm dark:prose-invert max-w-none">
          {formatAIMessage(content)}
        </div>
      </div>
    </div>
  )
}

