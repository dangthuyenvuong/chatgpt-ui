import type { SocialMediaLink } from "../lib/types"
import { Facebook, Linkedin, Twitter, AtSign } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SocialIconsProps {
  socialLinks: SocialMediaLink[]
  size?: "sm" | "md" | "lg"
  showStatus?: boolean
}

export function SocialIcons({ socialLinks, size = "md", showStatus = false }: SocialIconsProps) {
  if (!socialLinks || socialLinks.length === 0) {
    return null
  }

  const iconSize = {
    sm: 14,
    md: 16,
    lg: 20,
  }[size]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "posted":
        return "text-green-500"
      case "scheduled":
        return "text-amber-500"
      case "draft":
        return "text-gray-400"
      default:
        return "text-gray-400"
    }
  }

  const renderIcon = (platform: string, status: string) => {
    const statusColor = getStatusColor(status)

    switch (platform) {
      case "x":
        return <Twitter className={statusColor} size={iconSize} />
      case "facebook":
        return <Facebook className={statusColor} size={iconSize} />
      case "threads":
        return <AtSign className={statusColor} size={iconSize} />
      case "linkedin":
        return <Linkedin className={statusColor} size={iconSize} />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "posted":
        return "Đã đăng"
      case "scheduled":
        return "Đã lên lịch"
      case "draft":
        return "Bản nháp"
      default:
        return status
    }
  }

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case "x":
        return "X (Twitter)"
      case "facebook":
        return "Facebook"
      case "threads":
        return "Threads"
      case "linkedin":
        return "LinkedIn"
      default:
        return platform
    }
  }

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        {socialLinks.map((link, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                {renderIcon(link.platform, link.status)}
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>{getPlatformName(link.platform)}</p>
              {showStatus && <p className="text-xs opacity-70">{getStatusText(link.status)}</p>}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}

