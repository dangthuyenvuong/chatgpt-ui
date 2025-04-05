"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  X,
  Menu,
  ChevronDown,
  Plus,
  Image,
  Paperclip,
  Smile,
  ChevronRight,
  Sparkles,
  Brain,
  Bot,
  Stars,
  Settings,
  Moon,
  Globe,
  Bell,
  Trash2,
  HelpCircle,
  Info,
  Save,
  Copy,
  Share,
  FileText,
  Bookmark,
  Send,
  Minimize2,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "./ui/textarea";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface AIModel {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
}

export function ChatBubble() {
  const aiModels: AIModel[] = [
    {
      id: "mvp-planner",
      name: "AI MVP Planner",
      description: "Trợ lý AI",
      icon: <Sparkles className="h-4 w-4 text-purple-500" />,
      bgColor: "bg-purple-100",
    },
    {
      id: "gpt-4",
      name: "GPT-4",
      description: "Mô hình ngôn ngữ lớn",
      icon: <Brain className="h-4 w-4 text-green-500" />,
      bgColor: "bg-green-100",
    },
    {
      id: "claude",
      name: "Claude",
      description: "Trợ lý thông minh",
      icon: <Bot className="h-4 w-4 text-blue-500" />,
      bgColor: "bg-blue-100",
    },
    {
      id: "gemini",
      name: "Gemini",
      description: "AI đa phương thức",
      icon: <Stars className="h-4 w-4 text-amber-500" />,
      bgColor: "bg-amber-100",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Xin chào! Tôi là trợ lý AI của AI MVP Planner. Tôi có thể giúp gì cho bạn?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AIModel>(aiModels[0]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resizingRef = useRef(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, 150);

    console.log(textarea.scrollHeight);
    textarea.style.height = `${newHeight}px`;
  };

  // Adjust height when message changes
  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Cảm ơn bạn đã liên hệ. Đây là phản hồi từ ${selectedModel.name}!`,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleModelChange = (model: AIModel) => {
    setSelectedModel(model);
    // Add a system message about changing the model
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        content: `Bạn đã chuyển sang sử dụng ${model.name}.`,
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div
      className={`${isExpanded ? "fixed inset-0 flex items-center justify-center bg-black/20 z-50" : "fixed bottom-6 right-6 z-50"}`}
    >
      {/* Chat Interface */}
      {isOpen && (
        <div
          className={`
          bg-white flex flex-col rounded-2xl shadow-xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in duration-300 min-h-[400px]
          ${isExpanded ? "w-full max-w-3xl h-[80vh] max-h-[800px]" : "mb-4 w-72 sm:w-80"}
        `}
        >
          {/* Chat Header */}
          <div className="bg-gray-100 pr-2 py-2  flex justify-between items-center border-b border-gray-200">
            {/* Model Selection Dropdown - Fixed to ensure clicking works */}
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="flex items-center gap-1 pl-2">
                  <Avatar
                    className={`h-8 w-8 mr-2 ${selectedModel.bgColor} ring-2 ring-white items-center flex justify-center`}
                  >
                    {selectedModel.icon}
                  </Avatar>
                  <div className="flex flex-col items-start transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <h3 className="font-medium text-xs text-black">
                        {selectedModel.name}
                      </h3>
                      <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
                    </div>
                    <p className="text-xs text-gray-500">
                      {selectedModel.description}
                    </p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-56 bg-white border border-black/10 rounded-md shadow-md text-black"
              >
                {aiModels.map((model) => (
                  <DropdownMenuItem
                    key={model.id}
                    onClick={() => handleModelChange(model)}
                    className="flex items-center gap-2 py-1 px-1 cursor-pointer hover:!bg-secondary/5"
                  >
                    <Avatar
                      className={`h-8 w-8 ${model.bgColor} items-center flex justify-center`}
                    >
                      {model.icon}
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="text-xs text-black">{model.name}</div>
                      <div className="text-xs text-gray-500">
                        {model.description}
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center gap-1 ">
              <Button
                variant="link"
                size="icon"
                onClick={toggleExpand}
                className="h-7 w-7 rounded-full text-gray-500 hover:bg-gray-200"
              >
                {isExpanded ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
              {/* Settings Button with Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="link"
                    size="icon"
                    className="h-7 w-7 rounded-full text-gray-500 hover:bg-gray-200"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-white border border-gray-200 rounded-md shadow-md text-black"
                >
                  <DropdownMenuLabel className="text-xs font-medium text-gray-500 px-3 py-2">
                    Cài đặt trò chuyện
                  </DropdownMenuLabel>

                  {/* First Group */}
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 cursor-pointer">
                      <Moon className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Giao diện</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 cursor-pointer">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Ngôn ngữ</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 cursor-pointer">
                      <Bell className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Thông báo</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  {/* Separator - This is the horizontal line between groups */}
                  <DropdownMenuSeparator className="my-1 bg-gray-200" />

                  {/* Second Group */}
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 cursor-pointer text-red-500">
                      <Trash2 className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Xóa lịch sử trò chuyện</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 cursor-pointer">
                      <HelpCircle className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Trợ giúp</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 cursor-pointer">
                      <Info className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Giới thiệu</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Close Button */}
              <Button
                variant="link"
                size="icon"
                onClick={toggleChat}
                className="h-7 w-7 rounded-full text-gray-500 hover:bg-gray-200"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-72 overflow-y-auto p-3 bg-gray-50 flex-1">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"} chat-message-animation`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.sender === "user"
                      ? "bg-gray-200 text-gray-900 rounded-tr-none"
                      : "bg-white border border-gray-200 text-gray-900 rounded-tl-none"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p
                    className={`text-[10px] mt-1 ${msg.sender === "user" ? "text-gray-500" : "text-gray-400"}`}
                  >
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input - Single line with + dropdown and menu icon */}
          <div className="p-1 border-t border-gray-200 bg-white">
            <div className="flex items-end gap-1 justify-center">
              {/* + Dropdown for actions */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="link"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-48 bg-white border border-gray-200 rounded-md shadow-md text-black"
                >
                  <DropdownMenuItem className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 cursor-pointer">
                    <Image className="h-4 w-4" />
                    <span>Gửi hình ảnh</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 cursor-pointer">
                    <Paperclip className="h-4 w-4" />
                    <span>Đính kèm tệp</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 cursor-pointer">
                    <Smile className="h-4 w-4" />
                    <span>Chèn emoji</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Single line input */}
              <Textarea
                ref={textareaRef}
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                rows={1}
                style={{
                  minHeight: "20px",
                  maxHeight: "200px",
                }}
                placeholder="Nhập tin nhắn..."
                className="bg-black/10 border-none text-black p-2 rounded-2xl flex-1 resize-none !text-xs placeholder:!text-xs"
              />

              {/* Menu button with dropdown instead of direct send */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    value="link"
                    onClick={handleSendMessage}
                    // disabled={!message.trim()}
                    className="rounded-full h-8 w-8 p-0 transition-all duration-300 flex items-center justify-center cursor-pointer"
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-60 bg-white border border-gray-200 rounded-md shadow-md text-black"
                >
                  {/* First Group - Message Actions */}
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 cursor-pointer"
                    >
                      <Send className="h-4 w-4 text-gray-500" />
                      <span className="text-xs">Tóm tắt clip tôi đang xem</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 cursor-pointer">
                      <Save className="h-4 w-4 text-gray-500" />
                      <span className="text-xs">Lưu clip này vào bookmark</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  {/* Separator */}
                  <DropdownMenuSeparator className="my-1 bg-gray-200" />

                  {/* Second Group - Additional Actions */}
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 cursor-pointer">
                      <Copy className="h-4 w-4 text-gray-500" />
                      <span className="text-xs">
                        Tìm kiếm những clip tương tự
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 cursor-pointer">
                      <Share className="h-4 w-4 text-gray-500" />
                      <span className="text-xs">
                        Viết lại kịch bản mới cho clip này
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      )}

      {/* Chat Bubble Button */}
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered && !isOpen && (
          <div className="absolute bottom-full mb-2 right-0 bg-white text-gray-900 px-3 py-1.5 rounded-lg shadow-md border border-gray-200 text-sm whitespace-nowrap animate-in fade-in">
            <div className="flex items-center gap-1.5">
              <span>Trò chuyện với AI</span>
            </div>
            <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-gray-200"></div>
          </div>
        )}

        <button
          onClick={toggleChat}
          className={`flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white shadow-md hover:shadow-lg cursor-pointer ${
            isOpen ? "hidden" : "block"
          }`}
          aria-label="Open chat"
        >
          <MessageCircle className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
