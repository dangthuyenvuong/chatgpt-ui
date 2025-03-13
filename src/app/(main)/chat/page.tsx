import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  FileText,
  Image,
  MessageSquare,
  Lightbulb,
  SendIcon,
  GripVertical,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChatInterface } from "@/components/chat-interface";
import { Header } from "@/components/header";
import type { ChatItem } from "@/components/chat-sidebar";
import { useParams } from "react-router-dom";

type QueryType =
  | "Ý tưởng"
  | "Phát triển chiến dịch marketing"
  | "Viết bài"
  | "Tạo hình ảnh"
  | null;
type ViewMode = "preview" | "code";

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
        content:
          "I need help creating a development plan for my new e-commerce website.",
        isUser: true,
        timestamp: "2:30 PM",
      },
      {
        id: "m2",
        content:
          "I'd be happy to help you create a development plan for your e-commerce website.",
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
        content:
          "Can you help me brainstorm some marketing strategies for my new mobile app?",
        isUser: true,
        timestamp: "11:20 AM",
      },
      {
        id: "m2",
        content:
          "I'd be happy to help you brainstorm marketing strategies for your mobile app!",
        isUser: false,
        timestamp: "11:21 AM",
      },
    ],
  },
  {
    id: "3",
    title: "Product feature brainstorming",
    date: "Yesterday",
    messages: [
      {
        id: "m1",
        content: "I need to add new features to my app. Any suggestions?",
        isUser: true,
        timestamp: "3:45 PM",
      },
      {
        id: "m2",
        content:
          "I'd be glad to help with feature brainstorming. What kind of app do you have, and who is your target audience?",
        isUser: false,
        timestamp: "3:46 PM",
      },
    ],
  },
  {
    id: "project3",
    title: "SaaS Platform",
    date: "Yesterday",
    isProject: true,
    items: [
      {
        id: "project3-plan",
        type: "plan",
        title: "Product Roadmap",
      },
      {
        id: "project3-landing",
        type: "landing",
        title: "Marketing Site",
      },
      {
        id: "project3-feedback",
        type: "feedback",
        title: "Customer Reviews",
      },
      {
        id: "project3-tracking",
        type: "tracking",
        title: "Growth Metrics",
      },
    ],
    messages: [
      {
        id: "m1",
        content:
          "I need help creating a content calendar for my SaaS platform.",
        isUser: true,
        timestamp: "10:15 AM",
      },
      {
        id: "m2",
        content:
          "I can definitely help you create a content calendar for your SaaS platform.",
        isUser: false,
        timestamp: "10:16 AM",
      },
    ],
  },
  {
    id: "5",
    title: "Customer feedback analysis",
    date: "2 days ago",
    messages: [
      {
        id: "m1",
        content:
          "I have a lot of customer feedback data. Can you help me analyze it?",
        isUser: true,
        timestamp: "4:20 PM",
      },
      {
        id: "m2",
        content:
          "I'd be happy to help you analyze your customer feedback data. What format is the data in, and what specific insights are you looking to gain from it?",
        isUser: false,
        timestamp: "4:21 PM",
      },
    ],
  },
];

export default function Home() {
  const [message, setMessage] = useState("");
  const [selectedType, setSelectedType] = useState<QueryType>(null);
  const [chats, setChats] = useState<ChatItem[]>(sampleChats);
  // const [activeChat, setActiveChat] = useState<string | null>(null);
  const params = useParams<{ chatId: string }>();
  const activeChat = params.chatId;
  const [showPreview, setShowPreview] = useState(true);
  const [mainPanelWidth, setMainPanelWidth] = useState(50); // percentage
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resizingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, 200);
    textarea.style.height = `${newHeight}px`;
  };

  // Adjust height when message changes
  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (activeChat) {
      // Add message to existing chat
      const updatedChats = chats.map((chat) => {
        if (chat.id === activeChat) {
          return {
            ...chat,
            messages: [
              ...chat.messages,
              {
                id: `m${chat.messages.length + 1}`,
                content: message,
                isUser: true,
                timestamp: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
            ],
          };
        }
        return chat;
      });
      setChats(updatedChats);

      // Simulate AI response after a short delay
      setTimeout(() => {
        const updatedChatsWithResponse = updatedChats.map((chat) => {
          if (chat.id === activeChat) {
            return {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: `m${chat.messages.length + 2}`,
                  content:
                    "This is a simulated response. In a real application, this would be generated by an AI model based on your message.",
                  isUser: false,
                  timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                },
              ],
            };
          }
          return chat;
        });
        setChats(updatedChatsWithResponse);
      }, 1000);
    } else {
      // Create a new chat
      const newChat: ChatItem = {
        id: `${chats.length + 1}`,
        title: message.length > 30 ? message.substring(0, 30) + "..." : message,
        date: "Just now",
        messages: [
          {
            id: "m1",
            content: message,
            isUser: true,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ],
      };

      setChats([newChat, ...chats]);
      setActiveChat(newChat.id);

      // Simulate AI response after a short delay
      setTimeout(() => {
        setChats((prevChats) =>
          prevChats.map((chat) => {
            if (chat.id === newChat.id) {
              return {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    id: "m2",
                    content:
                      "This is a simulated response. In a real application, this would be generated by an AI model based on your message.",
                    isUser: false,
                    timestamp: new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                  },
                ],
              };
            }
            return chat;
          })
        );
      }, 1000);
    }

    setMessage("");
  };

  const handleNewChat = () => {
    setActiveChat(null);
  };

  const getCurrentChat = () => {
    return chats.find((chat) => chat.id === activeChat) || null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  // Handle resize functionality
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    resizingRef.current = true;
    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", handleResizeEnd);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none"; // Prevent text selection during resize
  };

  const handleResize = (e: MouseEvent) => {
    if (!resizingRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const mouseX = e.clientX - containerRect.left;

    // Calculate percentage (constrain between 20% and 80%)
    let newMainPanelWidth = (mouseX / containerWidth) * 100;
    newMainPanelWidth = Math.max(20, Math.min(80, newMainPanelWidth));

    setMainPanelWidth(newMainPanelWidth);
  };

  const handleResizeEnd = () => {
    resizingRef.current = false;
    document.removeEventListener("mousemove", handleResize);
    document.removeEventListener("mouseup", handleResizeEnd);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };

  // Clean up event listeners
  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("mouseup", handleResizeEnd);
    };
  }, []);

  const queryTypes = [
    {
      type: "Lặp kế hoạch" as QueryType,
      // icon: <Search className="h-3 w-3 mr-1" />,
    },
    {
      type: "Lên kế hoạch chiến dịch marketing" as QueryType,
      // icon: <Code className="h-3 w-3 mr-1" />,
    },
    {
      type: "Viết bài" as QueryType,
      // icon: <FileText className="h-3 w-3 mr-1" />,
    },
    {
      type: "Tạo hình ảnh" as QueryType,
      // icon: <Image className="h-3 w-3 mr-1" />,
    },
  ];

  return (
    <div className="flex flex-1 w-full overflow-hidden" ref={containerRef}>
      {/* Main Content Area */}
      <div
        className="flex flex-1 flex-col transition-all duration-200"
        // style={{
        //   width: showPreview ? `${mainPanelWidth}%` : "100%",
        // }}
      >
        <Header chatTitle={activeChat ? getCurrentChat()?.title : null} />

        <main className="flex-1 w-full overflow-hidden bg-[#212121] text-white">
          {activeChat ? (
            <ChatInterface
              chat={getCurrentChat()!}
              message={message}
              setMessage={setMessage}
              handleSubmit={handleSubmit}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center p-4 md:p-6 lg:p-8">
              <div className="text-center space-y-6 w-full max-w-md">
                <h1 className="text-2xl font-medium">
                  Good afternoon, Vương. How can I help you today?
                </h1>
                <div className="w-full">
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {queryTypes.map((item) => (
                      <Badge
                        key={item.type}
                        variant={
                          selectedType === item.type ? "default" : "outline"
                        }
                        className={`cursor-pointer flex items-center text-sm ${
                          selectedType === item.type
                            ? "!bg-blue-600 text-white"
                            : "border-gray-500/50 text-white/50 hover:bg-gray-700"
                        }`}
                        onClick={() =>
                          setSelectedType(
                            selectedType === item.type ? null : item.type
                          )
                        }
                      >
                        {/* {item.icon} */}
                        {item.type}
                      </Badge>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} className="relative">
                    <div className="relative rounded-xl bg-[#303030] shadow-sm">
                      <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={handleChange}
                        autoFocus
                        placeholder={
                          "Message AI Assistant..."
                          // selectedType
                          //   ? `Ask me about ${selectedType.toLowerCase()}...`
                          //   : "Message AI Assistant..."
                        }
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
                        className="absolute bottom-2 right-3 h-8 w-8 rounded-full"
                      >
                        <SendIcon className="h-4 w-4" />
                        <span className="sr-only">Send message</span>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      PlannerAI có thể mắc lỗi. Hãy kiểm tra các thông tin quan
                      trọng.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Resize Handle */}
      {/* {showPreview && (
        <div
          className="w-1 hover:w-2 bg-transparent hover:bg-primary/10 cursor-col-resize flex items-center justify-center z-10 transition-all"
          onMouseDown={handleResizeStart}
        >
          <div className="h-8 w-8 flex items-center justify-center">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )} */}

      {/* {showPreview && (
        <div
          className="flex flex-col bg-background"
          style={{ width: `${100 - mainPanelWidth}%` }}
        >
          <div className="flex-1 overflow-hidden">
            <iframe
              src="https://v0.dev"
              className="w-full h-full border-0"
              title="Preview"
              sandbox="allow-same-origin allow-scripts"
            />
          </div>
        </div>
      )} */}
    </div>
  );
}
