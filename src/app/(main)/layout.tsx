import { type ReactNode, useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ChatSidebar, type ChatItem } from "@/components/chat-sidebar"

// Sample chat data
const sampleChats: ChatItem[] = [
  {
    id: "project1",
    title: "E-commerce Website",
    date: "Today",
    isProject: true,
    items: [
      {
        id: "project1-plan",
        type: "plan",
        title: "Development Plan",
      },
      {
        id: "project1-landing",
        type: "landing",
        title: "Landing Page",
      },
      {
        id: "project1-feedback",
        type: "feedback",
        title: "User Feedback",
      },
      {
        id: "project1-tracking",
        type: "tracking",
        title: "Analytics",
      },
    ],
    messages: [
      {
        id: "m1",
        content: "I need help creating a development plan for my new e-commerce website.",
        isUser: true,
        timestamp: "2:30 PM",
      },
      {
        id: "m2",
        content: "I'd be happy to help you create a development plan for your e-commerce website.",
        isUser: false,
        timestamp: "2:31 PM",
      },
    ],
  },
  {
    id: "project2",
    title: "Mobile App",
    date: "Today",
    isProject: true,
    items: [
      {
        id: "project2-plan",
        type: "plan",
        title: "Development Plan",
      },
      {
        id: "project2-landing",
        type: "landing",
        title: "App Store Page",
      },
      {
        id: "project2-feedback",
        type: "feedback",
        title: "Beta Feedback",
      },
      {
        id: "project2-tracking",
        type: "tracking",
        title: "User Metrics",
      },
    ],
    messages: [
      {
        id: "m1",
        content: "Can you help me brainstorm some marketing strategies for my new mobile app?",
        isUser: true,
        timestamp: "11:20 AM",
      },
      {
        id: "m2",
        content: "I'd be happy to help you brainstorm marketing strategies for your mobile app!",
        isUser: false,
        timestamp: "11:21 AM",
      },
    ],
  },
]

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [activeChat, setActiveChat] = useState<string | null>(null)

  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId)
  }

  const handleNewChat = () => {
    setActiveChat(null)
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <ChatSidebar
          chats={sampleChats}
          // activeChat={activeChat}
          onChatSelect={handleChatSelect}
          // onNewChat={handleNewChat}
        />
        <div className="flex flex-1 flex-col w-full overflow-auto px-4">{children}</div>
      </div>
    </SidebarProvider>
  )
}

