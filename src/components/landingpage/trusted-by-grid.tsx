"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Define the feature items (text instead of logos)
const featureItems = [
  { id: 1, name: "User" },
  { id: 2, name: "Authentication" },
  { id: 3, name: "Permission" },
  { id: 4, name: "Post" },
  { id: 5, name: "Page" },
  { id: 6, name: "Setting" },
  { id: 7, name: "Media" },
  { id: 8, name: "Comment" },
  { id: 9, name: "Profile" },
  { id: 10, name: "Analytics" },
  { id: 11, name: "Email" },
  { id: 12, name: "Notification" },
  { id: 13, name: "Search" },
  { id: 14, name: "Dashboard" },
  { id: 15, name: "Integration" },
  { id: 16, name: "API" },
]

// Define the feature details that will be shown when an item is clicked
const featureDetails = [
  {
    id: 1,
    title: "User Management",
    description: "Complete user management system with role-based permissions and secure authentication.",
  },
  {
    id: 2,
    title: "Authentication System",
    description: "Secure authentication with multi-factor options, social logins, and password recovery.",
  },
  {
    id: 3,
    title: "Permission Controls",
    description: "Granular permission controls to manage access to features and content.",
  },
  {
    id: 4,
    title: "Content Management",
    description: "Powerful tools for creating, editing, and managing all types of content.",
  },
]

export default function TrustedByGrid() {
  const [activeItem, setActiveItem] = useState<number | null>(null)

  // Find the feature details to display based on the active item
  const getFeatureForItem = (itemId: number) => {
    // Map item IDs to feature details IDs (in a real app, this would be more sophisticated)
    return featureDetails[itemId % featureDetails.length]
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-4 gap-px bg-gray-200 dark:bg-gray-700">
        {/* First row */}
        {featureItems.slice(0, 4).map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
            className={`flex items-center justify-center p-8 ${
              activeItem === item.id
                ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-bold"
                : "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200"
            } transition-colors`}
          >
            <span className="text-lg font-medium">{item.name}</span>
          </button>
        ))}

        {/* Second row */}
        <button
          onClick={() => setActiveItem(activeItem === featureItems[4].id ? null : featureItems[4].id)}
          className={`flex items-center justify-center p-8 ${
            activeItem === featureItems[4].id
              ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-bold"
              : "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200"
          } transition-colors`}
        >
          <span className="text-lg font-medium">{featureItems[4].name}</span>
        </button>

        {/* Center content - spans 2x2 with fixed height */}
        <div
          className="col-span-2 row-span-2 flex items-center justify-center bg-black dark:bg-gray-800 p-8"
          style={{ height: "300px" }}
        >
          <AnimatePresence mode="wait">
            {activeItem ? (
              // Show feature content when an item is clicked
              <motion.div
                key="feature"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center text-white dark:text-white max-w-md"
              >
                <h2 className="text-3xl font-bold mb-4">{getFeatureForItem(activeItem).title}</h2>
                <p className="text-gray-300">{getFeatureForItem(activeItem).description}</p>
              </motion.div>
            ) : (
              // Show default content when no item is clicked
              <motion.div
                key="default"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center text-white dark:text-white"
              >
                <div className="mb-4">
                  <img
                    src="/placeholder.svg?height=60&width=60"
                    alt="Logo"
                    width={60}
                    height={60}
                    className="mx-auto"
                  />
                </div>
                <h2 className="text-3xl font-bold mb-2">Powerful Features</h2>
                <p className="text-2xl font-medium">for your digital product</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => setActiveItem(activeItem === featureItems[5].id ? null : featureItems[5].id)}
          className={`flex items-center justify-center p-8 ${
            activeItem === featureItems[5].id
              ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-bold"
              : "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200"
          } transition-colors`}
        >
          <span className="text-lg font-medium">{featureItems[5].name}</span>
        </button>

        {/* Third row */}
        <button
          onClick={() => setActiveItem(activeItem === featureItems[6].id ? null : featureItems[6].id)}
          className={`flex items-center justify-center p-8 ${
            activeItem === featureItems[6].id
              ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-bold"
              : "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200"
          } transition-colors`}
        >
          <span className="text-lg font-medium">{featureItems[6].name}</span>
        </button>

        <button
          onClick={() => setActiveItem(activeItem === featureItems[7].id ? null : featureItems[7].id)}
          className={`flex items-center justify-center p-8 ${
            activeItem === featureItems[7].id
              ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-bold"
              : "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200"
          } transition-colors`}
        >
          <span className="text-lg font-medium">{featureItems[7].name}</span>
        </button>

        {/* Fourth row */}
        {featureItems.slice(8, 12).map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
            className={`flex items-center justify-center p-8 ${
              activeItem === item.id
                ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-bold"
                : "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200"
            } transition-colors`}
          >
            <span className="text-lg font-medium">{item.name}</span>
          </button>
        ))}

        {/* Fifth row */}
        {featureItems.slice(12, 16).map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
            className={`flex items-center justify-center p-8 ${
              activeItem === item.id
                ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-bold"
                : "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200"
            } transition-colors`}
          >
            <span className="text-lg font-medium">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

