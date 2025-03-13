"use client";

import { useState } from "react";
import {
  User,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
  LayoutDashboard,
  KeyRound,
  UserPlus,
  Lock,
  Layout,
  ThumbsUp,
  BarChart3,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SettingsDialog } from "@/components/settings/settings-dialog";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { PricingDialog } from "@/components/pricing-dialog";
import { Badge } from "./ui/badge";
import { ShareDialog } from "./share-dialog";

type HeaderProps = {
  chatTitle?: string | null;
};

export function Header({ chatTitle }: HeaderProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const { state } = useSidebar();
  const isSidebarCollapsed = state === "collapsed";

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-[#212121] text-white px-4 lg:h-16">
      {isSidebarCollapsed && <SidebarTrigger className="h-8 w-8 mr-2" />}

      <div className="top-4 right-4">
        <nav className="flex items-center text-[18px] text-gray-400">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="link"
                className="flex items-center p-0 h-auto text-gray-400 hover:text-primary text-[18px]"
              >
                {chatTitle && (
                  <h1 className="text-lg font-medium truncate max-w-[200px] md:max-w-md">
                    {chatTitle}
                  </h1>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem>
                <span>Mobile App</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <span className="mx-2">/</span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="link"
                className="flex items-center p-0 h-auto text-white text-[18px]"
              >
                <span>Development Plan</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem>
                <Layout className="h-4 w-4 mr-2" />
                <span>Landing Page</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ThumbsUp className="h-4 w-4 mr-2" />
                <span>User Feedback</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BarChart3 className="h-4 w-4 mr-2" />
                <span>Analytics</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Badge
            variant="outline"
            className="ml-2 bg-blue-900/30 text-blue-400 border-blue-800 hover:bg-blue-900/30 flex items-center cursor-pointer"
            onClick={() => setShareDialogOpen(true)}
          >
            <Lock className="h-3 w-3 mr-1" />
            <span className="text-xs font-normal">Private</span>
          </Badge>
        </nav>
      </div>

      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Vương" />
              <AvatarFallback>VN</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Vương Nguyễn</p>
              <p className="text-xs leading-none text-muted-foreground">vuong@example.com</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPricingOpen(true)}>
              <Sparkles className="mr-2 h-4 w-4" />
              <span>Upgrade Plan</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-500/10">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
      {/* 
      <PricingDialog open={pricingOpen} onOpenChange={setPricingOpen} />
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} /> */}
      <ShareDialog open={shareDialogOpen} onOpenChange={setShareDialogOpen} />
    </header>
  );
}
