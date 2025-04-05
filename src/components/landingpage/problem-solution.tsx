"use client"

import { useState } from "react"
import { ArrowRight, Check, X, ArrowUpRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Define the problems and solutions
const problemSolutions = [
  {
    id: 1,
    problem: "Slow and inefficient development cycles",
    solution: "Streamlined workflows with automated processes that reduce development time by up to 40%",
    icon: "/placeholder.svg?height=64&width=64",
    color: "from-blue-500 to-purple-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    id: 2,
    problem: "Poor user experience leading to high bounce rates",
    solution: "User-centric design approach with continuous testing and optimization for maximum engagement",
    icon: "/placeholder.svg?height=64&width=64",
    color: "from-green-500 to-teal-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    id: 3,
    problem: "Difficulty scaling applications as user base grows",
    solution: "Cloud-native architecture designed for seamless scaling from day one",
    icon: "/placeholder.svg?height=64&width=64",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    id: 4,
    problem: "Security vulnerabilities putting data at risk",
    solution: "Enterprise-grade security protocols with regular audits and updates",
    icon: "/placeholder.svg?height=64&width=64",
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-50 dark:bg-red-900/20",
  },
]

export default function ProblemSolution() {
  const [activeItem, setActiveItem] = useState(1)
  const activeSolution = problemSolutions.find((item) => item.id === activeItem) || problemSolutions[0]

  return (
    <section className="py-24 bg-white dark:bg-gray-900 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] bg-gradient-to-br from-purple-100/30 to-blue-100/20 dark:from-purple-900/10 dark:to-blue-900/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[30%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-tl from-green-100/30 to-teal-100/20 dark:from-green-900/10 dark:to-teal-900/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-[1800px] mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block mb-4">
            <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              Our Approach
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Problems We <span className="highlight-solve">Solve</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            We identify common challenges in digital product development and provide effective solutions that drive
            results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Problems Column */}
          <div className="lg:col-span-5 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <h3 className="text-2xl font-bold flex items-center">
                <X className="w-6 h-6 text-red-500 mr-2" />
                Common Problems
              </h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {problemSolutions.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full text-left p-6 transition-all flex items-center gap-4 ${
                    activeItem === item.id ? "bg-gray-50 dark:bg-gray-700" : "hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                      activeItem === item.id
                        ? "bg-gradient-to-br from-red-500 to-orange-500 text-white"
                        : "bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-300"
                    }`}
                  >
                    <span className="text-xl font-bold">{item.id}</span>
                  </div>
                  <div>
                    <p
                      className={`font-medium text-lg ${activeItem === item.id ? "text-black dark:text-white" : "text-gray-700 dark:text-gray-300"}`}
                    >
                      {item.problem}
                    </p>
                    {activeItem === item.id && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Click to see our solution</p>
                    )}
                  </div>
                  {activeItem === item.id && <ArrowRight className="ml-auto w-5 h-5 text-red-500" />}
                </button>
              ))}
            </div>
          </div>

          {/* Solutions Column */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`h-full rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 ${activeSolution.bgColor}`}
              >
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 flex justify-between items-center">
                  <h3 className="text-2xl font-bold flex items-center">
                    <Check className="w-6 h-6 text-green-500 mr-2" />
                    Our Solution
                  </h3>
                  <span className="text-sm px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                    Problem #{activeItem}
                  </span>
                </div>

                <div className="p-8">
                  <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-8">
                    <div className="flex-shrink-0">
                      <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${activeSolution.color} p-1`}>
                        <div className="w-full h-full bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center">
                          <img
                            src={activeSolution.icon || "/placeholder.svg"}
                            alt={`Solution for ${activeSolution.problem}`}
                            width={64}
                            height={64}
                            className="w-12 h-12"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-500">
                        The Solution
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-xl leading-relaxed">
                        {activeSolution.solution}
                      </p>

                      <div className="mt-8 space-y-4">
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">Key Benefits:</h5>
                        <ul className="space-y-3">
                          {[1, 2, 3].map((i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="mt-1 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                              </div>
                              <span className="text-gray-700 dark:text-gray-300">
                                {i === 1
                                  ? "Increased efficiency and productivity"
                                  : i === 2
                                    ? "Reduced costs and resource requirements"
                                    : "Improved user satisfaction and engagement"}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-6">
                    <div>
                      <span className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Want to learn more?</span>
                      <a
                        href="#"
                        className="inline-flex items-center text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-80 transition-opacity"
                      >
                        See how we implement this solution
                        <ArrowUpRight className="ml-2 w-5 h-5 text-green-500" />
                      </a>
                    </div>

                    <div className="flex gap-2">
                      {problemSolutions.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveItem(item.id)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            activeItem === item.id
                              ? `w-8 bg-gradient-to-r ${item.color}`
                              : "bg-gray-300 dark:bg-gray-600"
                          }`}
                          aria-label={`View solution for problem ${item.id}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

