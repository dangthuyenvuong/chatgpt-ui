import {
  Bell,
  Globe,
  Link2,
  Lock,
  Settings2,
  SettingsIcon,
  Share,
} from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { useState } from "react";

type ProjectSettingsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chats: ChatItem[];
  selectedChatForSettings: string | null;
};

// Update the ChatItem type to include project items
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

type ShareOption = "private" | "unlisted" | "public";

export function ProjectSettingsDialog({
  open,
  onOpenChange,
  chats,
  selectedChatForSettings,
}: ProjectSettingsDialogProps) {
  const [shareOption, setShareOption] = useState<ShareOption>("private");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0 h-[70vh] max-h-[600px] flex flex-col">
        <div className="flex h-full overflow-hidden">
          <Tabs defaultValue="general" className="flex w-full h-full">
            {/* Sidebar */}
            <div className="w-[200px] bg-[#1a1a1a] text-white p-2 overflow-y-auto">
              <div className="space-y-1">
                <div className="mb-4 py-2">
                  <h2 className="text-lg font-medium pl-3">Settings</h2>
                </div>
                <TabsList className="flex flex-col h-auto items-stretch space-y-1 bg-transparent p-0">
                  <TabsTrigger
                    value="general"
                    className="justify-start px-3 py-2 h-9"
                  >
                    <SettingsIcon className="h-4 w-4 mr-2" />
                    General
                  </TabsTrigger>
                  <TabsTrigger
                    value="sharing"
                    className="justify-start px-3 py-2 h-9"
                  >
                    <Share className="h-4 w-4 mr-2" />
                    Sharing
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="justify-start px-3 py-2 h-9"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="advanced"
                    className="justify-start px-3 py-2 h-9"
                  >
                    <Settings2 className="h-4 w-4 mr-2" />
                    Advanced
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <div className="flex flex-1 bg-[#212121] text-white">
              {/* Content */}
              <div className="w-full overflow-y-auto p-6">
                <TabsContent value="general" className="mt-0 h-full">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">General Settings</h3>
                      <p className="text-sm text-gray-400">
                        Customize your chat experience.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="chat-name">Chat Name</Label>
                        <Input
                          id="chat-name"
                          defaultValue={
                            chats.find((c) => c.id === selectedChatForSettings)
                              ?.title || ""
                          }
                          className="bg-[#2a2a2a]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="chat-description">
                          Project Context & Instructions
                        </Label>
                        <Textarea
                          id="chat-description"
                          placeholder="E.g. Use React, Tailwind CSS, Next.js, etc."
                          className="bg-[#2a2a2a]"
                        />
                        <p className="text-xs text-gray-400">
                          Add any additional context or instructions for the AI to follow.
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="chat-favorite">Favorite</Label>
                          <p className="text-sm text-gray-400">
                            Add this chat to your favorites
                          </p>
                        </div>
                        <Switch id="chat-favorite" />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="sharing" className="mt-0 h-full">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Sharing Settings</h3>
                      <p className="text-sm text-gray-400">
                        Manage who can access this chat.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Visibility</Label>
                        <Select
                          value={shareOption}
                          onValueChange={(value) =>
                            setShareOption(value as ShareOption)
                          }
                        >
                          <SelectTrigger className="w-full bg-[#212121] cursor-pointer hover:bg-secondary">
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#212121]">
                            <SelectItem
                              value="private"
                              className="focus:bg-[#2a2a2a] focus:text-white py-2 cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <Lock className="h-4 w-4 text-blue-400" />
                                <div className="flex flex-col items-start">
                                  <span>Private</span>
                                  <span className="text-xs text-gray-400">
                                    Only you can see this chat
                                  </span>
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="unlisted"
                              className="focus:bg-[#2a2a2a] focus:text-white py-2 cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <Link2 className="h-4 w-4 text-yellow-400" />
                                <div className="flex flex-col items-start">
                                  <span>Unlisted</span>
                                  <span className="text-xs text-gray-400">
                                    Only people with the link can see this chat
                                  </span>
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="public"
                              className="focus:bg-[#2a2a2a] focus:text-white py-2 cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-green-400" />
                                <div className="flex flex-col items-start">
                                  <span>Public</span>
                                  <span className="text-xs text-gray-400">
                                    Anyone can see and interact with this chat
                                  </span>
                                </div>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notifications" className="mt-0 h-full">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">
                        Notification Settings
                      </h3>
                      <p className="text-sm text-gray-400">
                        Manage how you receive notifications for this chat.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications">
                            Email Notifications
                          </Label>
                          <p className="text-sm text-gray-400">
                            Receive email notifications for new messages
                          </p>
                        </div>
                        <Switch id="email-notifications" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-notifications">
                            Push Notifications
                          </Label>
                          <p className="text-sm text-gray-400">
                            Receive push notifications for new messages
                          </p>
                        </div>
                        <Switch id="push-notifications" />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="mt-0 h-full">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Advanced Settings</h3>
                      <p className="text-sm text-gray-400">
                        Configure advanced options for this chat.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="model">AI Model</Label>
                        <Select defaultValue="gpt-4">
                          <SelectTrigger className="bg-[#2a2a2a] border-gray-700">
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gpt-4">GPT-4</SelectItem>
                            <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                            <SelectItem value="claude">Claude</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="temperature">Temperature</Label>
                        <div className="flex items-center gap-2">
                          <Slider
                            defaultValue={[0.7]}
                            max={1}
                            step={0.1}
                            className="flex-1"
                          />
                          <span className="w-12 text-center">0.7</span>
                        </div>
                        <p className="text-xs text-gray-400">
                          Higher values make output more random, lower values
                          make it more deterministic
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="context-length">Context Length</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger className="bg-[#2a2a2a] border-gray-700">
                            <SelectValue placeholder="Select context length" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="short">
                              Short (Last 10 messages)
                            </SelectItem>
                            <SelectItem value="medium">
                              Medium (Last 20 messages)
                            </SelectItem>
                            <SelectItem value="long">
                              Long (Last 50 messages)
                            </SelectItem>
                            <SelectItem value="full">Full History</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
