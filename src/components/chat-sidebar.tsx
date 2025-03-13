"use client";

import type React from "react";

import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useRouter } from "next/navigation"
import {
  Plus,
  Sparkles,
  AlertCircle,
  MoreVertical,
  Share,
  Edit,
  Archive,
  Trash2,
  ShoppingBag,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
  User,
  FileText,
  Layout,
  ThumbsUp,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { FeedbackDialog } from "@/components/feedback-dialog";
import { PricingDialog } from "@/components/pricing-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SettingsDialog } from "./settings/settings-dialog";
import { RenameDialog } from "./rename-dialog";

export type ProjectItem = {
  id: string;
  type: "plan" | "landing" | "feedback" | "tracking";
  title: string;
};

export type ChatItem = {
  id: string;
  title: string;
  date: string;
  isProject?: boolean;
  items?: ProjectItem[];
  messages: {
    id: string;
    content: string;
    isUser: boolean;
    timestamp: string;
  }[];
};

type ChatSidebarProps = {
  chats: ChatItem[];
  // activeChat: string | null;
  onChatSelect: (chatId: string) => void;
  // onNewChat: () => void;
};

export function ChatSidebar({
  chats,
  // activeChat,
  onChatSelect,
  // onNewChat,
}: ChatSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredChat, setHoveredChat] = useState<string | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { id: activeChat } = useParams<{ id: string }>();
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState<
    Record<string, boolean>
  >({});
  const [itemToRename, setItemToRename] = useState<{
    id: string;
    name: string;
    type: "chat" | "project" | "projectItem";
  } | null>(null);

  const handleRename = (newName: string) => {
    if (!itemToRename) return;

    if (itemToRename.type === "chat" || itemToRename.type === "project") {
      // Đổi tên chat hoặc project
      // setChats((prevChats) =>
      //   prevChats.map((chat) =>
      //     chat.id === itemToRename.id ? { ...chat, title: newName } : chat
      //   )
      // );
    } else if (itemToRename.type === "projectItem") {
      // Đổi tên project item
      // setChats((prevChats) =>
      //   prevChats.map((chat) => {
      //     if (chat.items) {
      //       const updatedItems = chat.items.map((item) =>
      //         item.id === itemToRename.id ? { ...item, title: newName } : item
      //       );
      //       return { ...chat, items: updatedItems };
      //     }
      //     return chat;
      //   })
      // );
    }

    // Hiển thị thông báo
    toast({
      title: "Renamed successfully",
      description: `Item has been renamed to "${newName}"`,
    });
  };

  const handleDoubleClick = (
    id: string,
    name: string,
    type: "chat" | "project" | "projectItem"
  ) => {
    setItemToRename({ id, name, type });
    setRenameDialogOpen(true);
  };

  const toggleProject = (projectId: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  const handleShareChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    // In a real app, this would generate a shareable link
    toast({
      title: "Chat shared",
      description: "A shareable link has been copied to your clipboard.",
    });
  };

  const handleRenameChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    // In a real app, this would open a rename dialog
    toast({
      title: "Rename chat",
      description: "This would open a dialog to rename the chat.",
    });
  };

  const handleArchiveChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    toast({
      title: "Chat archived",
      description: "The chat has been moved to your archives.",
    });
  };

  const handleDeleteChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    // In a real app, this would show a confirmation dialog
    toast({
      title: "Chat deleted",
      description: "The chat has been permanently deleted.",
      variant: "destructive",
    });
  };

  const navigateToMarketplace = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/marketplace");
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case "plan":
        return <FileText className="h-4 w-4" />;
      case "landing":
        return <Layout className="h-4 w-4" />;
      case "feedback":
        return <ThumbsUp className="h-4 w-4" />;
      case "tracking":
        return <BarChart3 className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <Sidebar className="bg-[#1a1a1a] text-white" collapsible="offcanvas">
      {/* Logo and collapse button row */}
      <div className="flex items-center justify-between px-3 h-14 lg:h-16 border-b">
        <div className="font-semibold text-lg">PlannerAI</div>
        <SidebarTrigger className="h-8 w-8" />
      </div>

      <SidebarHeader className="px-2 py-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button
                variant="outline"
                className="w-full justify-center gap-2 py-2 px-3 text-sm hover:!bg-secondary"
                onClick={() => {
                  navigate("/chat");
                }}
              >
                <Plus size={16} />
                <span>New Chat</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* First Section - Marketplace and Feedback */}
        <div className="px-2 py-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={navigateToMarketplace}
                className={cn(
                  "px-3",
                  location.pathname === "/marketplace"
                    ? "bg-secondary"
                    : "hover:bg-secondary/50"
                )}
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Marketplace</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setFeedbackOpen(true)}
                className="px-3 hover:bg-secondary/50"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Feedback</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        <SidebarSeparator />

        {/* Second Section - Project Chats */}
        <div className="px-2 py-2">
          <h2 className="mb-2 px-3 text-xs font-semibold text-muted-foreground">
            Project
          </h2>
          <SidebarMenu>
            {chats.map((chat) => (
              <SidebarMenuItem
                key={chat.id}
                className="group menu-item"
                onClick={() => {
                  navigate(`/chat/${chat.id}`);
                }}
              >
                <div className="w-full">
                  <button
                    className={cn(
                      "flex items-center w-full text-left px-3 py-2 rounded-md relative gap-2 cursor-pointer",
                      activeChat === chat.id
                        ? "bg-secondary"
                        : "hover:bg-secondary/50"
                    )}
                    // onClick={() => onChatSelect(chat.id)}
                    onClick={() => toggleProject(chat.id)}
                    onMouseEnter={() => setHoveredChat(chat.id)}
                    onMouseLeave={() => setHoveredChat(null)}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      handleDoubleClick(chat.id, chat.title, "projectItem");
                    }}
                  >
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform",
                        expandedProjects[chat.id] ? "rotate-90" : ""
                      )}
                    />
                    <div className="flex-1 truncate">
                      <span className="text-sm">{chat.title}</span>
                    </div>
                    {/* {hoveredChat == null && hoveredChat === chat.id && ( */}

                    {/* )} */}

                    {/* {(hoveredChat === chat.id || activeChat === chat.id) && ( */}
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 p-0 ml-1 opacity-70 hover:opacity-100 invisible group-[.menu-item:hover]:visible"
                        >
                          <MoreVertical size={14} />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem
                          onClick={(e) => handleShareChat(e, chat.id)}
                        >
                          <Share className="mr-2 h-4 w-4" />
                          <span>Chia sẻ</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => handleRenameChat(e, chat.id)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Đổi tên</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => handleArchiveChat(e, chat.id)}
                        >
                          <Archive className="mr-2 h-4 w-4" />
                          <span>Lưu trữ</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={(e) => handleDeleteChat(e, chat.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Xóa</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {/* )} */}
                  </button>
                  {/* Render project items if expanded */}
                  {expandedProjects[chat.id] && (
                    <div className="">
                      {chat.items?.map((item) => (
                        <SidebarMenuItem
                          key={item.id}
                          className="rounded-md hover:bg-secondary/50 pl-6 pr-2 py-1 cursor-pointer"
                          onClick={() => {
                            // When clicking a project item, we need to make sure the parent project is expanded
                            setExpandedProjects((prev) => ({
                              ...prev,
                              [chat.id]: true,
                            }));
                            onChatSelect(item.id);
                          }}
                          onDoubleClick={(e) => {
                            e.stopPropagation();
                            handleDoubleClick(chat.id, chat.title, "project");
                          }}
                        >
                          <SidebarMenuButton
                            className="cursor-pointer"
                            isActive={activeChat === item.id}
                          >
                            {getItemIcon(item.type)}
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  )}
                </div>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>

      <SidebarFooter className="p-2">
        {/* Upgrade Card */}
        <div className="rounded-lg bg-[#252525] p-4">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <h3 className="font-medium">Upgrade to Pro</h3>
          </div>

          <div className="mb-3 py-2 px-3 rounded-md bg-red-500/10 dark:bg-red-900/20 border border-red-800 text-red-400">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p className="text-xs">
                Free users can only use the service once per day
              </p>
            </div>
          </div>

          <p className="mb-2 text-xs text-gray-400">
            Get unlimited chats, priority support, and advanced features.
          </p>
          <Button
            size="sm"
            className="w-full"
            onClick={() => setPricingOpen(true)}
          >
            Upgrade
          </Button>
        </div>
        {/* Account Section - Added below the upgrade card */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="rounded-lg bg-[#252525] p-3 cursor-pointer">
              <Button
                variant="ghost"
                className="w-full p-2 flex items-center justify-start gap-3 hover:bg-transparent"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/vuong-avagtar.jpg" alt="Vương" />
                  <AvatarFallback>VN</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="font-medium text-sm">Vương Đặng</p>
                  <p className="text-xs text-gray-400">vuong@gmail.com</p>
                </div>
              </Button>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-60">
            {/* <DropdownMenuItem className="cursor-pointer hover:!bg-white/10" onClick={() => navigate("/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem> */}
            <DropdownMenuItem
              className="cursor-pointer hover:!bg-white/10"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:!bg-white/10">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-500/10">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>

      {/* Feedback Dialog */}
      <PricingDialog open={pricingOpen} onOpenChange={setPricingOpen} />
      <FeedbackDialog open={feedbackOpen} onOpenChange={setFeedbackOpen} />
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
      {itemToRename && (
        <RenameDialog
          open={renameDialogOpen}
          onOpenChange={setRenameDialogOpen}
          currentName={itemToRename.name}
          onRename={handleRename}
        />
      )}
    </Sidebar>
  );
}
