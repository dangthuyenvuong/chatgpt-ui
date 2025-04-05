"use client"

import { useState } from "react"
import { Check, Users, Palette, Mail, Database, Code, Shield, Zap } from "lucide-react"

// Define our feature data
const features = [
  {
    id: "users",
    title: "User, Authentication, Permission",
    icon: Users,
    description: "Complete user management system with role-based permissions and secure authentication.",
    benefits: [
      "Multi-factor authentication",
      "Role-based access control",
      "Social login integration",
      "User profile management",
      "Session management",
    ],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "style",
    title: "Style",
    icon: Palette,
    description: "Beautiful, customizable UI components that adapt to your brand identity.",
    benefits: [
      "Responsive design system",
      "Dark/light mode support",
      "Custom theming",
      "Accessible components",
      "Animation library",
    ],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "email-seo",
    title: "Email, SEO",
    icon: Mail,
    description: "Powerful tools for marketing, communication, and search engine optimization.",
    benefits: [
      "Transactional email templates",
      "SEO-optimized page structure",
      "Email campaign management",
      "Analytics integration",
      "Sitemap generation",
    ],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "database",
    title: "Database",
    icon: Database,
    description: "Scalable database solutions with powerful querying and management tools.",
    benefits: [
      "Automatic migrations",
      "Data validation",
      "Relationship management",
      "Query optimization",
      "Backup and recovery",
    ],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "api",
    title: "API Integration",
    icon: Code,
    description: "Seamless integration with third-party services and APIs.",
    benefits: ["RESTful API endpoints", "GraphQL support", "Webhook management", "Rate limiting", "API documentation"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "security",
    title: "Security",
    icon: Shield,
    description: "Enterprise-grade security features to protect your data and users.",
    benefits: ["CSRF protection", "XSS prevention", "SQL injection protection", "Data encryption", "Security auditing"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "performance",
    title: "Performance",
    icon: Zap,
    description: "Optimized for speed with advanced caching and lazy-loading.",
    benefits: [
      "Server-side rendering",
      "Code splitting",
      "Asset optimization",
      "Caching strategies",
      "Performance monitoring",
    ],
    image: "/placeholder.svg?height=300&width=400",
  },
]

export default function FeatureTabs() {
  const [activeFeature, setActiveFeature] = useState(features[0].id)

  // Find the currently active feature
  const currentFeature = features.find((feature) => feature.id === activeFeature) || features[0]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Feature list - left side */}
      <div className="lg:col-span-4 xl:col-span-3">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {features.map((feature) => {
              const isActive = activeFeature === feature.id
              const Icon = feature.icon

              return (
                <li key={feature.id}>
                  <button
                    onClick={() => setActiveFeature(feature.id)}
                    className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${
                      isActive
                        ? "bg-gray-50 dark:bg-gray-700 text-black dark:text-white"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${isActive ? "bg-black dark:bg-white text-white dark:text-black" : "bg-gray-100 dark:bg-gray-600"}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{feature.title}</span>
                    {isActive && (
                      <div className="ml-auto">
                        <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white"></div>
                      </div>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Feature content - right side */}
      <div className="lg:col-span-8 xl:col-span-9">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
            <div>
              <h3 className="text-2xl font-bold mb-4">{currentFeature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{currentFeature.description}</p>

              <ul className="space-y-3">
                {currentFeature.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105">
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={currentFeature.image || "/placeholder.svg"}
                  alt={`${currentFeature.title} illustration`}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

