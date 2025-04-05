"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, Bell, Settings, Shield, Globe, Palette, Key, HelpCircle, Save, Moon, Sun, Laptop } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface SettingsDialogProps {
  isOpen: boolean
  onClose: () => void
}

type SettingsTab = "profile" | "notifications" | "appearance" | "security" | "language" | "api" | "advanced" | "help"

export function SettingsDialog({ isOpen, onClose }: SettingsDialogProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile")

  // Profile settings
  const [name, setName] = useState("Nguyễn Văn A")
  const [email, setEmail] = useState("nguyenvana@example.com")
  const [bio, setBio] = useState("AI content creator and marketing specialist")

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [articleReminders, setArticleReminders] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)

  // Appearance settings
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")
  const [reducedMotion, setReducedMotion] = useState(false)
  const [fontSize, setFontSize] = useState("medium")

  // Language settings
  const [language, setLanguage] = useState("en")
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY")

  // Security settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState("30")

  // API settings
  const [apiKey, setApiKey] = useState("sk-••••••••••••••••••••••••")
  const [modelPreference, setModelPreference] = useState("gpt-4o")

  // Advanced settings
  const [debugMode, setDebugMode] = useState(false)
  const [autoSave, setAutoSave] = useState(true)

  const handleSaveSettings = () => {
    // In a real app, this would save settings to a backend
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    })
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Profile Settings</h2>
            <p className="text-sm text-muted-foreground">
              Manage your personal information and how it appears on the platform.
            </p>

            <div className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself"
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">Brief description that will appear on your profile.</p>
              </div>
            </div>
          </div>
        )

      case "notifications":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Notification Settings</h2>
            <p className="text-sm text-muted-foreground">Control how and when you receive notifications.</p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                </div>
                <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="article-reminders">Article Reminders</Label>
                  <p className="text-sm text-muted-foreground">Get reminders about scheduled articles</p>
                </div>
                <Switch id="article-reminders" checked={articleReminders} onCheckedChange={setArticleReminders} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">Receive updates about new features and offers</p>
                </div>
                <Switch id="marketing-emails" checked={marketingEmails} onCheckedChange={setMarketingEmails} />
              </div>
            </div>
          </div>
        )

      case "appearance":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Appearance Settings</h2>
            <p className="text-sm text-muted-foreground">Customize how the application looks and feels.</p>

            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="h-4 w-4 mr-2" />
                    Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="h-4 w-4 mr-2" />
                    Dark
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setTheme("system")}
                  >
                    <Laptop className="h-4 w-4 mr-2" />
                    System
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reduced-motion">Reduced Motion</Label>
                  <p className="text-sm text-muted-foreground">Minimize animations throughout the interface</p>
                </div>
                <Switch id="reduced-motion" checked={reducedMotion} onCheckedChange={setReducedMotion} />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="font-size">Font Size</Label>
                <Select value={fontSize} onValueChange={setFontSize}>
                  <SelectTrigger id="font-size">
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case "language":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Language & Region</h2>
            <p className="text-sm text-muted-foreground">Set your preferred language and regional settings.</p>

            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="vi">Vietnamese</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="date-format">Date Format</Label>
                <Select value={dateFormat} onValueChange={setDateFormat}>
                  <SelectTrigger id="date-format">
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case "security":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Security Settings</h2>
            <p className="text-sm text-muted-foreground">Manage your account security and authentication options.</p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor-auth">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch id="two-factor-auth" checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                  <SelectTrigger id="session-timeout">
                    <SelectValue placeholder="Select timeout duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Automatically log out after period of inactivity</p>
              </div>

              <Separator />

              <Button variant="outline" className="w-full">
                Change Password
              </Button>
            </div>
          </div>
        )

      case "api":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">API Settings</h2>
            <p className="text-sm text-muted-foreground">Manage your API keys and model preferences.</p>

            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="api-key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    type="password"
                    className="flex-1"
                  />
                  <Button variant="outline">Regenerate</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your API key is used to authenticate requests to the AI service.
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="model-preference">Default AI Model</Label>
                <Select value={modelPreference} onValueChange={setModelPreference}>
                  <SelectTrigger id="model-preference">
                    <SelectValue placeholder="Select AI model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                    <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  This model will be used for generating content by default.
                </p>
              </div>
            </div>
          </div>
        )

      case "advanced":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Advanced Settings</h2>
            <p className="text-sm text-muted-foreground">Configure advanced options for power users.</p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="debug-mode">Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">Show additional debugging information</p>
                </div>
                <Switch id="debug-mode" checked={debugMode} onCheckedChange={setDebugMode} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-save">Auto-Save</Label>
                  <p className="text-sm text-muted-foreground">Automatically save changes to articles</p>
                </div>
                <Switch id="auto-save" checked={autoSave} onCheckedChange={setAutoSave} />
              </div>

              <Separator />

              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  Export All Data
                </Button>
                <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                  Clear Cache
                </Button>
              </div>
            </div>
          </div>
        )

      case "help":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Help & Support</h2>
            <p className="text-sm text-muted-foreground">Get help with using the platform and find resources.</p>

            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <h3 className="text-base font-medium">Documentation</h3>
                <p className="text-sm text-muted-foreground">
                  Visit our comprehensive documentation to learn how to use all features.
                </p>
                <Button variant="outline" className="mt-2">
                  View Documentation
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-base font-medium">Contact Support</h3>
                <p className="text-sm text-muted-foreground">Need help? Our support team is ready to assist you.</p>
                <Button variant="outline" className="mt-2">
                  Contact Support
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-base font-medium">Feedback</h3>
                <p className="text-sm text-muted-foreground">We value your feedback to improve our platform.</p>
                <Button variant="outline" className="mt-2">
                  Submit Feedback
                </Button>
              </div>

              <Separator />

              <div className="text-xs text-muted-foreground">
                <p>Version: 1.0.0</p>
                <p>© 2024 AI Article Manager. All rights reserved.</p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] p-0">
        <div className="flex h-[80vh]">
          {/* Left sidebar with menu items */}
          <div className="w-64 border-r bg-muted/40">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-1">
                <Button
                  variant={activeTab === "profile" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>

                <Button
                  variant={activeTab === "notifications" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("notifications")}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>

                <Button
                  variant={activeTab === "appearance" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("appearance")}
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Appearance
                </Button>

                <Button
                  variant={activeTab === "language" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("language")}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Language & Region
                </Button>

                <Button
                  variant={activeTab === "security" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("security")}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Security
                </Button>

                <Button
                  variant={activeTab === "api" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("api")}
                >
                  <Key className="h-4 w-4 mr-2" />
                  API Settings
                </Button>

                <Button
                  variant={activeTab === "advanced" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("advanced")}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Advanced
                </Button>

                <Button
                  variant={activeTab === "help" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("help")}
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help & Support
                </Button>
              </div>
            </ScrollArea>
          </div>

          {/* Right content area */}
          <div className="flex-1 overflow-auto">
            <ScrollArea className="h-full">
              <div className="p-6">{renderTabContent()}</div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSaveSettings}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

