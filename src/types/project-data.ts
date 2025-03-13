// Định nghĩa các interface cho từng phần dữ liệu

// Thông tin dự án
export interface Project {
  name: string
  description: string
}

// Vấn đề và giải pháp
export interface ProblemSolution {
  problem: {
    description: string
  }
  solution: {
    description: string
  }
}

// Đối tượng mục tiêu
export interface TargetAudience {
  users: string[]
  painPoints: string[]
}

// Mô hình kinh doanh
export interface PricingTier {
  name: string
  price: string
  features: string
  color?: string
  textColor?: string
  borderColor?: string
}

export interface BusinessModel {
  type: string
  pricing: PricingTier[]
}

// Nghiên cứu thị trường
export interface Competitor {
  name: string
  color?: string
}

export interface MarketResearch {
  marketSize: string
  competitors: Competitor[]
  competitiveAdvantage: string
}

// Điểm độc đáo (USP)
export interface ComparisonItem {
  tool: string
  strengths: string
  weaknesses: string
}

export interface USP {
  differentiators: string[]
  comparison: ComparisonItem[]
}

// Chiến lược marketing
export interface MarketingStrategy {
  channels: string[]
  contentSeries: string[]
}

// Kế hoạch MVP
export interface Feature {
  name: string
  description: string
}

export interface TimelineItem {
  week: string
  description: string
}

export interface MVPPlan {
  features: Feature[]
  timeline: TimelineItem[]
}

// Tech stack
export interface TechStackItem {
  category: string
  tech: string
  icon?: string
  color?: string
}

export interface TechStack {
  items: TechStackItem[]
}

// Chi phí và rủi ro
export interface CostItem {
  category: string
  value: string
  icon?: string
}

export interface CostRisks {
  costs: CostItem[]
  risks: string[]
}

// Đánh giá dự án
export interface EvaluationPoint {
  title: string
  content: string
}

export interface ProjectEvaluation {
  successProbability: number
  points: EvaluationPoint[]
}

// Interface tổng hợp cho toàn bộ dữ liệu
export interface ProjectData {
  project: Project
  problemSolution: ProblemSolution
  targetAudience: TargetAudience
  businessModel: BusinessModel
  marketResearch: MarketResearch
  usp: USP
  marketingStrategy: MarketingStrategy
  mvpPlan: MVPPlan
  techStack: TechStack
  costRisks: CostRisks
  projectEvaluation: ProjectEvaluation
}

