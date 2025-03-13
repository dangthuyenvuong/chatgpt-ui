"use client"

import { useState, useEffect } from "react"
import { Sparkles } from "lucide-react"
import { ImproveAIModal } from "./improve-ai-modal"

interface ImproveAIButtonProps {
  sectionName: string
  sectionType: string
}

export function ImproveAIButton({ sectionName, sectionType }: ImproveAIButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute cursor-pointer top-2 right-2 z-[11] bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-2 py-1 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 flex items-center gap-1 text-xs"
      >
        <Sparkles className="h-4 w-4" />
        Cải thiện với AI
      </button>

      <ImproveAIModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sectionName={sectionName}
        sectionType={sectionType}
      />
    </>
  )
}

