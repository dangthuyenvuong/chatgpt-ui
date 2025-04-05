export type ArticleStatus = "published" | "draft" | "archived"

export type SocialPlatform = "x" | "facebook" | "threads" | "linkedin"

export interface SocialMediaLink {
  platform: SocialPlatform
  url: string
  status: "scheduled" | "posted" | "draft"
  scheduledFor?: string
}

export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  createdAt: string
  updatedAt: string
  status: ArticleStatus
  topic: string
  model: string
  wordCount: number
  scheduledFor?: string
  socialMedia?: SocialMediaLink[]
}

export type PromptStatus = "active" | "archived"
export type PromptTone = "formal" | "casual" | "friendly" | "professional" | "humorous" | "serious"

export interface WordLimit {
  min: number
  max: number
}

export interface Prompt {
  id: string
  name: string
  content: string
  platform: SocialPlatform
  language?: string
  createdAt: string
  updatedAt: string
  status?: PromptStatus
  tone?: PromptTone
  wordLimit?: WordLimit
  tags?: string[]
  description?: string
}

