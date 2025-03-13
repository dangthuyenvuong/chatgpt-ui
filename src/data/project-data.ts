import type { ProjectData } from "@/types/project-data";

// Dữ liệu dự án AI MVP Planner
const projectData: ProjectData = {
  businessModel: {
    pricing: [
      {
        borderColor: "border-gray-200",
        color: "bg-gray-100",
        features: "Limited number of plan creations",
        name: "Free",
        price: "Free",
        textColor: "text-gray-700",
      },
      {
        borderColor: "border-blue-200",
        color: "bg-blue-100",
        features: "AI-generated plans, export",
        name: "Basic",
        price: "$9/month",
        textColor: "text-blue-700",
      },
      {
        borderColor: "border-purple-200",
        color: "bg-purple-100",
        features: "Teamwork support, Notion/Trello integration",
        name: "Pro",
        price: "$19/month",
        textColor: "text-purple-700",
      },
      {
        borderColor: "border-pink-200",
        color: "bg-pink-100",
        features: "API, custom workflows",
        name: "Enterprise",
        price: "$49/month",
        textColor: "text-pink-700",
      },
    ],
    type: "SaaS - Subscription",
  },
  costRisks: {
    costs: [
      {
        category: "Development Cost",
        icon: "💻",
        value: "$100-$500/month (OpenAI API)",
      },
      {
        category: "Hosting Cost",
        icon: "🌐",
        value: "$50/month",
      },
      {
        category: "Marketing Budget",
        icon: "📣",
        value: "$200-$500/month",
      },
    ],
    risks: [
      "AI may not generate useful plans",
      "Lack of user adoption",
      "Competition from big players",
    ],
  },
  marketResearch: {
    competitiveAdvantage:
      "AI fully automates the MVP planning process, personalizing it based on project type, with a simpler UX/UI than large-scale tools.",
    competitors: [
      {
        color: "bg-blue-100 text-blue-700 border-blue-200",
        name: "Notion",
      },
      {
        color: "bg-indigo-100 text-indigo-700 border-indigo-200",
        name: "Trello",
      },
      {
        color: "bg-purple-100 text-purple-700 border-purple-200",
        name: "ClickUp",
      },
      {
        color: "bg-pink-100 text-pink-700 border-pink-200",
        name: "Motion AI",
      },
    ],
    marketSize:
      "Millions of indie hackers and startup founders launch every year",
  },
  marketingStrategy: {
    channels: [
      "Product Hunt launch",
      "Twitter/X \u0026 Indie Hackers communities",
      "SEO (Blog, YouTube)",
      "Partnerships with Notion, Trello",
    ],
    contentSeries: [
      "The journey of developing AI MVP Planner",
      "How to create an MVP plan in 10 minutes",
      "Common mistakes in MVP development and how to avoid them",
      "Comparison: AI MVP Planner vs. Notion/Trello/Jira",
      "Case study: How startup X used AI to optimize its MVP process",
      "Best practices for optimizing a startup roadmap",
      "MoSCoW method: How to prioritize features effectively",
      "Which AI tool is best for tech startups?",
      "The importance of a roadmap in product development",
      "How AI can help indie hackers work more efficiently",
    ],
  },
  mvpPlan: {
    features: [
      {
        description:
          "Users input their MVP idea for AI analysis and plan suggestions.",
        name: "Enter MVP Idea",
      },
      {
        description:
          "Develops an MVP roadmap in 1-3 months with detailed steps.",
        name: "AI-generated Roadmap",
      },
      {
        description: "Divides the plan into sprints with specific task lists.",
        name: "Sprint-based Tasks",
      },
      {
        description: "AI estimates the time required to complete each task.",
        name: "Completion Time Estimation",
      },
      {
        description:
          "Allows exporting plans to Notion or Trello for easier management.",
        name: "Export to Notion/Trello",
      },
      {
        description:
          "AI suggests features suitable for the specific project type.",
        name: "Feature Suggestions",
      },
      {
        description: "Analyzes and determines the most critical MVP features.",
        name: "Feature Importance Assessment",
      },
      {
        description: "AI predicts the time required to build each feature.",
        name: "Feature Development Time Estimation",
      },
      {
        description:
          "Ranks features based on priority: Must-have, Should-have, Could-have, Won't-have.",
        name: "MoSCoW Prioritization",
      },
    ],
    timeline: [
      {
        week: "week_1",
        description: "Nghiên cứu thị trường, xác định tính năng cốt lõi",
      },
      {
        week: "week_2",
        description: "Xây dựng mô hình AI cơ bản, thiết kế wireframe UI",
      },
      {
        week: "week_3",
        description: "Phát triển hệ thống backend & cơ sở dữ liệu",
      },
      { week: "week_4", description: "Tích hợp AI vào hệ thống lập kế hoạch" },
      {
        week: "week_5",
        description: "Tạo giao diện người dùng MVP, kết nối với backend",
      },
      {
        week: "week_6",
        description: "Tối ưu AI, cải thiện UX/UI dựa trên phản hồi ban đầu",
      },
      {
        week: "week_7",
        description: "Tích hợp xuất kế hoạch ra Notion/Trello",
      },
      {
        week: "week_8",
        description: "Chạy thử nghiệm nội bộ, fix bug, cải tiến hiệu suất",
      },
      { week: "week_9", description: "Ra mắt beta cho người dùng đầu tiên" },
      { week: "week_10", description: "Thu thập phản hồi, tối ưu tính năng" },
      {
        week: "week_11",
        description: "Mở rộng marketing, chuẩn bị Product Hunt launch",
      },
      {
        week: "week_12",
        description: "Ra mắt chính thức, triển khai chiến dịch quảng bá",
      },
    ],
  },
  problemSolution: {
    problem: {
      description:
        "Planning an MVP takes a lot of time and is prone to omissions. Existing tools like Notion, Trello, or Jira require extensive manual customization.",
    },
    solution: {
      description:
        "AI automatically generates an MVP plan in just a few minutes, including a roadmap, sprint-based tasks, estimated completion time, and integration with Notion/Trello.",
    },
  },
  project: {
    description:
      "An AI-powered tool that automatically plans MVP projects, helping indie hackers, startup founders, and developers create roadmaps quickly in just a few minutes.",
    name: "AI MVP Planner",
  },
  targetAudience: {
    painPoints: [
      "Struggles with structured MVP planning",
      "Want to focus on coding/marketing rather than project management",
      "Lack of tools to automate the planning process",
    ],
    users: [
      "Indie hackers",
      "Startup founders",
      "Developers working on side projects",
      "Product managers",
    ],
  },
  techStack: {
    items: [
      {
        category: "Frontend",
        icon: "🎨",
        tech: "Next.js, TailwindCSS",
      },
      {
        category: "Backend",
        icon: "⚙️",
        tech: "Node.js, Express.js",
      },
      {
        category: "Database",
        icon: "💾",
        tech: "PostgreSQL",
      },
      {
        category: "AI Model",
        icon: "🧠",
        tech: "OpenAI GPT-4 API",
      },
      {
        category: "Authentication",
        icon: "🔒",
        tech: "Clerk/Auth0",
      },
      {
        category: "Hosting",
        icon: "☁️",
        tech: "Vercel (Frontend), Railway (Backend)",
      },
    ],
  },
  usp: {
    comparison: [
      {
        strengths: "Flexible, can be used for various project management needs",
        tool: "Notion",
        weaknesses: "Requires manual customization, lacks AI-powered planning",
      },
      {
        strengths: "Intuitive interface, easy drag-and-drop task management",
        tool: "Trello",
        weaknesses: "Lacks detailed planning features, no AI support",
      },
      {
        strengths: "Integrates multiple tools, good for team management",
        tool: "ClickUp",
        weaknesses: "Complex interface, may be overwhelming for small projects",
      },
      {
        strengths: "Uses AI to optimize work schedules",
        tool: "Motion AI",
        weaknesses: "Focuses more on time management than MVP planning",
      },
      {
        strengths:
          "Automatically generates roadmaps, sprints, time estimates, and integrates with Notion/Trello",
        tool: "AI MVP Planner",
        weaknesses:
          "Limited user base, AI algorithms need improvement based on feedback",
      },
    ],
    differentiators: [
      "Fully automated MVP planning process powered by AI",
      "Feature suggestions based on specific project type",
      "Estimates development time for each feature to optimize resources",
      "Prioritization based on the MoSCoW model to decide key features",
      "Direct integration with Notion/Trello for seamless execution",
      "Minimalist, user-friendly interface without complex setup like Trello or Notion",
      "More than just a project management tool—it helps shape MVP development strategy",
    ],
  },
  projectEvaluation: {
    successProbability: 70,
    points: [
      {
        title: "Tiềm năng",
        content:
          "Dự án có tiềm năng lớn do nhu cầu ngày càng tăng về công cụ hỗ trợ startup và indie hackers lập kế hoạch nhanh chóng.",
      },
      {
        title: "Điểm mạnh",
        content:
          "Ứng dụng AI để tự động hóa quá trình lập kế hoạch, tích hợp dễ dàng với Notion/Trello, UX/UI tối giản và trực quan.",
      },
      {
        title: "Thách thức",
        content:
          "Cần thu hút đủ người dùng ban đầu để cải thiện AI, cạnh tranh với các công cụ đã có sẵn trên thị trường.",
      },
      {
        title: "Đánh giá tổng thể",
        content:
          "AI MVP Planner có tiềm năng lớn để trở thành công cụ hữu ích cho các startup và indie hackers. Nếu được marketing tốt và phát triển tính năng phù hợp, nó có thể trở thành một lựa chọn thay thế hiệu quả cho các công cụ quản lý dự án hiện tại.",
      },
    ],
  },
};

export default projectData;
