"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

// Define the feature items
const features = [
  {
    id: 1,
    title: "User Management",
    description: "Complete user management system with role-based permissions and secure authentication.",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    title: "Style System",
    description: "Beautiful, customizable UI components that adapt to your brand identity.",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    title: "Email & SEO",
    description: "Powerful tools for marketing, communication, and search engine optimization.",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    title: "Database",
    description: "Scalable database solutions with powerful querying and management tools.",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    title: "API Integration",
    description: "Seamless integration with third-party services and APIs.",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    title: "Security",
    description: "Enterprise-grade security features to protect your data and users.",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    title: "Performance",
    description: "Optimized for speed with advanced caching and lazy-loading.",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    title: "Analytics",
    description: "Comprehensive analytics and reporting tools for data-driven decisions.",
    icon: "/placeholder.svg?height=40&width=40",
  },
]

export default function RadialFeatures() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null)

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-20">
      {/* Grid Container */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
        {/* First Row */}
        {features.slice(0, 4).map((feature) => (
          <button
            key={feature.id}
            onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
            className={`p-6 rounded-xl transition-all duration-300 ${
              activeFeature === feature.id
                ? "bg-black dark:bg-white text-white dark:text-black"
                : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <Image
                src={feature.icon || "/placeholder.svg"}
                alt={feature.title}
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <h3 className="font-medium">{feature.title}</h3>
            </div>
          </button>
        ))}

        {/* Center Content */}
        <div className="col-span-2 md:col-span-4 relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeFeature ? (
              // Show feature content when active
              <motion.div
                key="feature"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center max-w-2xl mx-auto p-8"
              >
                <h2 className="text-3xl font-bold mb-4">{features.find((f) => f.id === activeFeature)?.title}</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {features.find((f) => f.id === activeFeature)?.description}
                </p>
              </motion.div>
            ) : (
              // Show logo and slogan when no feature is active
              <motion.div
                key="logo"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center"
              >
                <div className="mb-6">
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt="Logo"
                    width={80}
                    height={80}
                    className="mx-auto"
                  />
                </div>
                <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Everything you need to build amazing products
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Second Row */}
        {features.slice(4).map((feature) => (
          <button
            key={feature.id}
            onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
            className={`p-6 rounded-xl transition-all duration-300 ${
              activeFeature === feature.id
                ? "bg-black dark:bg-white text-white dark:text-black"
                : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <Image
                src={feature.icon || "/placeholder.svg"}
                alt={feature.title}
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <h3 className="font-medium">{feature.title}</h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

