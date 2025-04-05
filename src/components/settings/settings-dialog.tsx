"use client";

import { useState } from "react";
import {
  CreditCard,
  Puzzle,
  SettingsIcon,
  Sun,
  Moon,
  Monitor,
  Link2,
  X,
  Key,
  EyeOff,
  Eye,
  Plus,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { DialogClose } from "@radix-ui/react-dialog";
import { Input } from "@/ui/input";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: SettingsTab;
}

type SettingsTab =
  | "general"
  | "notifications"
  | "privacy"
  | "billing"
  | "integrations"
  | "help"
  | "aikeys";

interface ApiKey {
  platform: string;
  key: string;
  description: string;
  logo: React.ReactNode;
  color: string;
}

export function SettingsDialog({ open, onOpenChange, defaultTab = "billing" }: SettingsDialogProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>(defaultTab);
  const [language, setLanguage] = useState("english");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [theme, setTheme] = useState("system");
  const [newPlatform, setNewPlatform] = useState({
    platform: "",
    description: "",
    key: "",
  });
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({})
  const [addPlatformOpen, setAddPlatformOpen] = useState(false)

  // API Keys state
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      platform: "OpenAI",
      key: "sk-1234567890abcdefghijklmn",
      description: "API key for ChatGPT and other OpenAI services",
      logo: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.051 6.051 0 0 0 8.7569-2.9001 5.9894 5.9894 0 0 0 3.9977-2.9 6.0557 6.0557 0 0 0-.7475-7.0966 5.9894 5.9894 0 0 0-2.9851-1.2832zM13.2599 22.5983a4.5675 4.5675 0 0 1-2.2517-4.3934l.0377-.2198 7.6368-4.4094.1628.0986a4.5721 4.5721 0 0 1 1.8481 3.8748 4.6175 4.6175 0 0 1-7.4337 5.0492zm-9.6903-3.4877a4.537 4.537 0 0 1-.7475-2.1798 4.6013 4.6013 0 0 1 1.5326-3.0934l.1628-.1318 7.6651 4.4236-.0376.2198a4.6366 4.6366 0 0 1-8.5754.7616zm-.71-10.3884a4.5675 4.5675 0 0 1 2.2517-4.3934 4.6175 4.6175 0 0 1 7.4337 5.0492l-.1628.1986L4.7749 14.044l-.0377-.2198a4.5721 4.5721 0 0 1-1.8481-3.8748zm19.0217 5.0492l-.1628.1317-7.6651-4.4236.0376-.2198a4.5675 4.5675 0 0 1 2.2517-4.3934 4.6175 4.6175 0 0 1 7.4337 5.0492 4.6013 4.6013 0 0 1-1.8951 3.8559zm1.0322-2.4979a4.5721 4.5721 0 0 1-1.8481-3.8748l.0376-.2198 7.6368 4.4094.1628-.0986a4.5675 4.5675 0 0 1 2.2517 4.3934 4.6175 4.6175 0 0 1-7.4337 5.0492l-.1628-.1986-7.6368-4.4094.0376-.2198a4.5721 4.5721 0 0 1 1.8481-3.8748l.1628-.0986 7.6368 4.4094.1628-.0986z"
            fill="white"
          />
        </svg>
      ),
      color: "#10a37f",
    },
    // {
    //   platform: "DeepSeek",
    //   key: "dsk-abcdefghijklmnopqrst",
    //   description: "API key for DeepSeek AI models",
    //   logo: (
    //     <svg
    //       width="24"
    //       height="24"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" fill="white" />
    //       <path d="M12 6L8 8V16L12 18L16 16V8L12 6Z" fill="#1e88e5" />
    //     </svg>
    //   ),
    //   color: "#1e88e5",
    // },
    // {
    //   platform: "Gemini",
    //   key: "",
    //   description: "API key for Google's Gemini models",
    //   logo: (
    //     <svg
    //       width="24"
    //       height="24"
    //       viewBox="0 0 192 192"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path d="M96 8L16 50V142L96 184L176 142V50L96 8Z" fill="white" />
    //       <path
    //         d="M168 54.9V137.1L96 175.1L24 137.1V54.9L96 16.9L168 54.9Z"
    //         fill="#8e44ad"
    //       />
    //       <path d="M96 97L40 66V128L96 159V97Z" fill="white" />
    //       <path d="M96 97L152 66V128L96 159V97Z" fill="white" />
    //     </svg>
    //   ),
    //   color: "#8e44ad",
    // },
  ]);

  // Thêm state mới để theo dõi việc chỉnh sửa key và trạng thái đã lưu
  const [editingKeys, setEditingKeys] = useState<{ [key: string]: string }>({});
  const [savedStates, setSavedStates] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleShowKey = (platform: string) => {
    setShowKeys((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

  const updateKey = (platform: string, newKey: string) => {
    // Lưu key đang chỉnh sửa vào state
    setEditingKeys((prev) => ({
      ...prev,
      [platform]: newKey,
    }));
  };

  // Thêm hàm saveKey để lưu key và xử lý trạng thái đã lưu
  const saveKey = (platform: string) => {
    // Cập nhật key trong danh sách API keys
    setApiKeys((prev) =>
      prev.map((key) =>
        key.platform === platform ? { ...key, key: editingKeys[platform] } : key
      )
    );

    // Đánh dấu là đã lưu
    setSavedStates((prev) => ({
      ...prev,
      [platform]: true,
    }));

    // Sau 3 giây, reset trạng thái đã lưu
    setTimeout(() => {
      setSavedStates((prev) => ({
        ...prev,
        [platform]: false,
      }));
      // Xóa key khỏi danh sách đang chỉnh sửa
      setEditingKeys((prev) => {
        const newState = { ...prev };
        delete newState[platform];
        return newState;
      });
    }, 3000);
  };

  const addNewPlatform = () => {
    if (
      !newPlatform.platform.trim() ||
      !newPlatform.key.trim() ||
      !newPlatform.description.trim()
    )
      return;

    const defaultLogo = <Key className="h-5 w-5 text-white" />;

    setApiKeys((prev) => [
      ...prev,
      {
        ...newPlatform,
        logo: defaultLogo,
        color: "#6366f1", // Màu mặc định
      },
    ]);

    // Reset form and close dialog
    setNewPlatform({
      platform: "",
      description: "",
      key: "",
    });
    setAddPlatformOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px] p-0 h-[70vh] max-h-[600px] flex flex-col">
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <div className="flex h-full overflow-hidden">
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as SettingsTab)}
              className="flex w-full h-full"
            >
              {/* Sidebar */}
              <div className="w-[200px] bg-[#1a1a1a] text-white p-2 overflow-y-auto">
                <div className="space-y-1">
                  <div className="mb-4 py-2">
                    <h2 className="text-lg font-medium pl-3">Settings</h2>
                  </div>
                  <TabsList className="flex flex-col h-auto items-stretch space-y-1 bg-transparent p-0">
                    {/* <TabsTrigger
                      value="general"
                      className="justify-start px-3 py-2 h-9"
                    >
                      <SettingsIcon className="h-4 w-4 mr-2" />
                      General
                    </TabsTrigger> */}
                    <TabsTrigger
                      value="billing"
                      className="justify-start px-3 py-2 h-9"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Billing
                    </TabsTrigger>
                    {/* <TabsTrigger
                      value="integrations"
                      className="justify-start px-3 py-2 h-9"
                    >
                      <Puzzle className="h-4 w-4 mr-2" />
                      Integrations
                    </TabsTrigger> */}
                    <TabsTrigger
                      value="aikeys"
                      className="justify-start px-3 py-2 h-9"
                    >
                      <Key className="h-4 w-4 mr-2" />
                      AI Keys
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <div className="flex flex-1 bg-[#212121] text-white">
                <div className="w-full overflow-y-auto p-6">
                  {/* <TabsContent value="general" className="mt-0 h-full">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium">
                          General Settings
                        </h3>
                        <p className="text-sm text-gray-400">
                          Customize your experience with PlannerAI.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger
                            id="language"
                            className="w-full bg-[#2a2a2a] border-0"
                          >
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">
                              English (US)
                            </SelectItem>
                            <SelectItem value="vietnamese">
                              Tiếng Việt
                            </SelectItem>
                            <SelectItem value="french">Français</SelectItem>
                            <SelectItem value="german">Deutsch</SelectItem>
                            <SelectItem value="spanish">Español</SelectItem>
                            <SelectItem value="japanese">日本語</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-gray-400 mt-1">
                          This will change the language of the user interface.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>Theme</Label>
                        <div className="grid grid-cols-3 gap-4 pt-1">
                          <Card
                            className={`cursor-pointer bg-[#2a2a2a] hover:bg-[#333333] ${theme === "light" ? "ring-2 ring-primary" : ""}`}
                            onClick={() => setTheme("light")}
                          >
                            <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                              <Sun className="h-6 w-6 text-amber-500" />
                              <span className="text-sm font-medium">Light</span>
                            </CardContent>
                          </Card>

                          <Card
                            className={`cursor-pointer bg-[#2a2a2a] hover:bg-[#333333] ${theme === "dark" ? "ring-2 ring-primary" : ""}`}
                            onClick={() => setTheme("dark")}
                          >
                            <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                              <Moon className="h-6 w-6 text-indigo-400" />
                              <span className="text-sm font-medium">Dark</span>
                            </CardContent>
                          </Card>

                          <Card
                            className={`cursor-pointer bg-[#2a2a2a] hover:bg-[#333333] ${theme === "system" ? "ring-2 ring-primary" : ""}`}
                            onClick={() => setTheme("system")}
                          >
                            <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                              <Monitor className="h-6 w-6 text-gray-400" />
                              <span className="text-sm font-medium">
                                System
                              </span>
                            </CardContent>
                          </Card>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                          Choose how PlannerAI looks on your device.
                        </p>
                      </div>
                    </div>
                  </TabsContent> */}

                  <TabsContent value="billing" className="mt-0 h-full">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium">
                          Billing Information
                        </h3>
                        <p className="text-sm text-gray-400">
                          Manage your subscription and payment methods.
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div className="rounded-md bg-[#2a2a2a] p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Free Plan</h4>
                              <p className="text-sm text-gray-400">
                                Basic features for personal use
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              className="border-0"
                              asChild
                            >
                              <Link to="/pricing">Upgrade</Link>
                            </Button>
                          </div>
                        </div>
                        <div className="rounded-md bg-[#2a2a2a] p-4">
                          <h4 className="font-medium mb-2">Payment Methods</h4>
                          <p className="text-sm text-gray-400 mb-4">
                            No payment methods added yet.
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-0"
                          >
                            <CreditCard className="h-4 w-4 mr-2" />
                            Add Payment Method
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* <TabsContent value="integrations" className="mt-0 h-full">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium">Integrations</h3>
                        <p className="text-sm text-gray-400">
                          Connect PlannerAI with your favorite apps and
                          services.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="rounded-md bg-[#2a2a2a] p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                >
                                  <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                  />
                                  <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                  />
                                  <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                  />
                                  <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h4 className="font-medium">Google</h4>
                                <p className="text-sm text-gray-400">
                                  Connect your Google account
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-0"
                            >
                              Connect
                            </Button>
                          </div>
                        </div>

                        <div className="rounded-md bg-[#2a2a2a] p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 23 23"
                                  width="23"
                                  height="23"
                                >
                                  <path fill="#f25022" d="M1 1h10v10H1z" />
                                  <path fill="#00a4ef" d="M1 12h10v10H1z" />
                                  <path fill="#7fba00" d="M12 1h10v10H12z" />
                                  <path fill="#ffb900" d="M12 12h10v10H12z" />
                                </svg>
                              </div>
                              <div>
                                <h4 className="font-medium">Microsoft</h4>
                                <p className="text-sm text-gray-400">
                                  Connect your Microsoft account
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-0"
                            >
                              Connect
                            </Button>
                          </div>
                        </div>

                        <div className="rounded-md bg-[#2a2a2a] p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-[#4A154B] flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width="18"
                                  height="18"
                                >
                                  <path
                                    fill="#fff"
                                    d="M6 15a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2h2v2zm1 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2a2 2 0 0 1-2-2v-5zm2-7a2 2 0 0 1-2-2a2 2 0 0 1 2-2a2 2 0 0 1 2 2v2H9zm0 1a2 2 0 0 1 2 2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2a2 2 0 0 1 2-2h5zm7 2a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2h-2v-2zm-1 0a2 2 0 0 1-2 2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2a2 2 0 0 1 2 2v5zm-2 7a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2v-2h2zm0-1a2 2 0 0 1-2-2a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2a2 2 0 0 1-2-2h-5z"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h4 className="font-medium">Slack</h4>
                                <p className="text-sm text-gray-400">
                                  Connect to your Slack workspace
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-0"
                            >
                              Connect
                            </Button>
                          </div>
                        </div>

                        <div className="rounded-md bg-[#2a2a2a] p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width="20"
                                  height="20"
                                >
                                  <path
                                    fill="#fff"
                                    d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h4 className="font-medium">GitHub</h4>
                                <p className="text-sm text-gray-400">
                                  Connect to your GitHub account
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-0"
                            >
                              Connect
                            </Button>
                          </div>
                        </div>

                        <div className="rounded-md bg-[#2a2a2a] p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
                                <Link2 className="h-5 w-5 text-gray-300" />
                              </div>
                              <div>
                                <h4 className="font-medium">API Access</h4>
                                <p className="text-sm text-gray-400">
                                  Generate API keys for custom integrations
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-0"
                            >
                              Manage
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent> */}
                  <TabsContent value="aikeys" className="mt-0 h-full">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium">
                          AI Platform Keys
                        </h3>
                        <p className="text-sm text-gray-400">
                          Manage your API keys for various AI platforms.
                        </p>
                      </div>

                      <div className="space-y-4">
                        {/* Existing API Keys */}
                        {apiKeys.map((apiKey) => (
                          <div
                            key={apiKey.platform}
                            className="rounded-md bg-[#2a2a2a] p-4"
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div
                                className={`h-10 w-10 rounded-full flex items-center justify-center`}
                                style={{ backgroundColor: apiKey.color }}
                              >
                                {apiKey.logo}
                              </div>
                              <div>
                                <h4 className="font-medium">
                                  {apiKey.platform}
                                </h4>
                                <p className="text-sm text-gray-400">
                                  {apiKey.description}
                                </p>
                              </div>
                            </div>

                            <div className="mt-2 relative">
                              <Input
                                type={
                                  showKeys[apiKey.platform]
                                    ? "text"
                                    : "password"
                                }
                                value={
                                  editingKeys[apiKey.platform] !== undefined
                                    ? editingKeys[apiKey.platform]
                                    : apiKey.key
                                }
                                onChange={(e) =>
                                  updateKey(apiKey.platform, e.target.value)
                                }
                                className="pr-10 bg-[#1e1e1e] border-0 text-sm"
                                placeholder={`Enter your ${apiKey.platform} API key`}
                              />
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                                <button
                                  className="text-gray-400 hover:text-gray-300"
                                  onClick={() => toggleShowKey(apiKey.platform)}
                                >
                                  {showKeys[apiKey.platform] ? (
                                    <EyeOff size={16} />
                                  ) : (
                                    <Eye size={16} />
                                  )}
                                </button>

                                {/* Hiển thị nút Save khi đang chỉnh sửa */}
                                {editingKeys[apiKey.platform] !== undefined &&
                                  editingKeys[apiKey.platform] !==
                                    apiKey.key && (
                                    <button
                                      className="ml-2 bg-primary text-primary-foreground rounded-sm px-2 py-0.5 text-xs font-medium flex items-center"
                                      onClick={() => saveKey(apiKey.platform)}
                                    >
                                      {savedStates[apiKey.platform] ? (
                                        <Check size={12} className="mr-1" />
                                      ) : null}
                                      {savedStates[apiKey.platform]
                                        ? "Saved"
                                        : "Save"}
                                    </button>
                                  )}
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="mt-6">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-0"
                            onClick={() => setAddPlatformOpen(true)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Platform
                          </Button>
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

      <Dialog open={addPlatformOpen} onOpenChange={setAddPlatformOpen}>
        <DialogContent className="sm:max-w-[500px] bg-[#212121] text-white border-0">
          <DialogHeader>
            <DialogTitle>Add New AI Platform</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="platform-name">Platform Name</Label>
              <Input
                id="platform-name"
                value={newPlatform.platform}
                onChange={(e) =>
                  setNewPlatform({ ...newPlatform, platform: e.target.value })
                }
                className="bg-[#2a2a2a] border-0"
                placeholder="e.g. Claude, Anthropic, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="platform-description">Description</Label>
              <Input
                id="platform-description"
                value={newPlatform.description}
                onChange={(e) =>
                  setNewPlatform({
                    ...newPlatform,
                    description: e.target.value,
                  })
                }
                className="bg-[#2a2a2a] border-0"
                placeholder="e.g. API key for Claude AI assistant"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="platform-key">API Key</Label>
              <Input
                id="platform-key"
                type="password"
                value={newPlatform.key}
                onChange={(e) =>
                  setNewPlatform({ ...newPlatform, key: e.target.value })
                }
                className="bg-[#2a2a2a] border-0"
                placeholder="Enter your API key"
              />
            </div>
          </div>

          <DialogFooter className="bg-[#212121]">
            <Button variant="outline" onClick={() => setAddPlatformOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={addNewPlatform}
              disabled={
                !newPlatform.platform ||
                !newPlatform.description ||
                !newPlatform.key
              }
            >
              Add Platform
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
