"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Rocket, Brain, Clock, ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import projectData from "@/data/project-data"
import { ImproveAIButton } from "./improve-ai-button"

export function ProjectHeader() {
  const [mounted, setMounted] = useState(false)
  const { name, description } = projectData.project

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative group overflow-hidden rounded-3xl border-2 border-pink-200 shadow-xl bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <ImproveAIButton sectionName="Giới thiệu" sectionType="projectHeader" />
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-pink-200 opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-purple-200 opacity-20"></div>
        <div className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full bg-blue-200 opacity-20"></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 rounded-full bg-yellow-200 opacity-20"></div>

        {/* Animated dots */}
        <div className="absolute top-1/2 left-1/4 w-3 h-3 rounded-full bg-pink-400 opacity-30 animate-pulse"></div>
        <div
          className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-purple-400 opacity-30 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/2 w-4 h-4 rounded-full bg-blue-400 opacity-30 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Hero content */}
        <div className="grid grid-cols-1 @md:grid-cols-2 gap-8 p-8 @md:p-12">
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white px-4 py-1.5 rounded-full text-sm w-fit">
              ✨ SaaS Project
            </Badge>

            <h1 className="text-4xl @md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 mb-4">
              {name}
            </h1>

            <p className="text-lg text-gray-600 mb-6">{description}</p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center bg-white px-3 py-2 rounded-full shadow-sm border border-pink-100">
                <Brain className="h-4 w-4 text-purple-500 mr-2" />
                <span className="text-sm text-gray-700">AI Powered</span>
              </div>
              <div className="flex items-center bg-white px-3 py-2 rounded-full shadow-sm border border-pink-100">
                <Clock className="h-4 w-4 text-blue-500 mr-2" />
                <span className="text-sm text-gray-700">Tiết kiệm thời gian</span>
              </div>
              <div className="flex items-center bg-white px-3 py-2 rounded-full shadow-sm border border-pink-100">
                <Rocket className="h-4 w-4 text-pink-500 mr-2" />
                <span className="text-sm text-gray-700">Tăng tốc startup</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 mb-6"
            >
              <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full px-6 py-6 font-medium w-fit flex items-center group transition-all duration-300 shadow-md hover:shadow-lg">
                Xem chi tiết kế hoạch
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 hover:border-purple-300 rounded-full px-6 py-6 text-lg font-medium text-purple-700 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 w-fit"
              >
                Dùng thử miễn phí
                <Rocket className="h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-2 flex items-center"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-300 to-purple-300 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="ml-4 flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  <span className="font-bold">4.9/5</span> từ 200+ người dùng
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative w-full max-w-md">
              {/* Main illustration */}
              <div className="bg-white rounded-2xl border-2 border-pink-200 shadow-lg p-6 relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>

                <div className="space-y-3">
                  <div className="h-6 bg-pink-100 rounded-md w-3/4"></div>
                  <div className="h-20 bg-purple-100 rounded-md"></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-16 bg-blue-100 rounded-md"></div>
                    <div className="h-16 bg-green-100 rounded-md"></div>
                  </div>
                  <div className="h-10 bg-yellow-100 rounded-md w-1/2"></div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-purple-100 rounded-lg p-2 border border-purple-200 shadow-sm rotate-3">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                </div>
                <div className="absolute -bottom-3 -left-3 bg-pink-100 rounded-lg p-2 border border-pink-200 shadow-sm -rotate-6">
                  <Rocket className="h-5 w-5 text-pink-500" />
                </div>
              </div>

              {/* Background decorative elements */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full opacity-20 blur-xl -z-10"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-200 rounded-full opacity-40 -z-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-200 rounded-full opacity-40 -z-10"></div>
            </div>
          </motion.div>
        </div>

        {/* Bottom banner */}
        <div className="relative z-10 w-full h-12 bg-gradient-to-r from-pink-200/30 via-purple-200/30 to-blue-200/30 backdrop-blur-sm border-t-2 border-pink-200/50 flex items-center justify-center gap-8 px-4 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex gap-8">
            {[
              "Indie Hackers",
              "Startup Founders",
              "Product Managers",
              "Developers",
              "Side Projects",
              "MVP Planning",
              "AI Tools",
              "Project Management",
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-pink-400"></span>
                <span className="text-sm font-medium text-gray-700">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

