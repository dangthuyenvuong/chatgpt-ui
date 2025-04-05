"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const userCards = [
  {
    id: 1,
    background: "bg-[#FFE8D7]",
    title: 'You enjoy "jumping on a quick call" with sales',
    image: "/placeholder.svg?height=150&width=150",
    content:
      "Sorry, we don't force you to talk to anyone. But you can watch a recorded demo (at your own pace) or request a personalized demo if you like.",
  },
  {
    id: 2,
    background: "bg-[#E3F4E8]",
    title: "You love needlessly wasting company money",
    image: "/placeholder.svg?height=150&width=150",
    content: "We only have usage-based pricing that decreases exponentially with scale.",
  },
  {
    id: 3,
    background: "bg-[#E5E7FF]",
    title: "You'd rather buy before you try",
    image: "/placeholder.svg?height=150&width=150",
    content:
      "We offer a free tier so large that only a fraction of our customers pay us anything. Even worse, we continually try to reduce our pricing.",
  },
  {
    id: 4,
    background: "bg-[#FFE5F4]",
    title: "You think your email is a good trade for that free whitepaper",
    image: "/placeholder.svg?height=150&width=150",
    content: "Please press Ctrl + W now, or ask your network administrator to close your window.",
  },
  {
    id: 5,
    background: "bg-[#FFF8E0]",
    title: "You prefer to be locked into annual contracts",
    image: "/placeholder.svg?height=150&width=150",
    content: "We believe in earning your business every month. No long-term contracts required.",
  },
  {
    id: 6,
    background: "bg-[#E0F7FF]",
    title: "You want to pay for features you'll never use",
    image: "/placeholder.svg?height=150&width=150",
    content: "Our modular approach means you only pay for what you actually need and use.",
  },
]

export default function UserTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const cardsToShow = 3 // Number of cards to show at once

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + cardsToShow
      return nextIndex >= userCards.length ? 0 : nextIndex
    })
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - cardsToShow
      return nextIndex < 0 ? Math.max(0, userCards.length - cardsToShow) : nextIndex
    })
  }

  // Calculate visible cards
  const visibleCards = []
  for (let i = 0; i < cardsToShow; i++) {
    const index = (currentIndex + i) % userCards.length
    visibleCards.push(userCards[index])
  }

  return (
    <section className="py-24 relative overflow-hidden bg-[#FAFAFA] dark:bg-gray-900">
      <div className="w-full max-w-[1800px] mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black dark:text-white">Users like us</h2>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10">
            {visibleCards.map((card) => (
              <div
                key={card.id}
                className={`${card.background} rounded-xl overflow-hidden shadow-md transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-black">{card.title}</h3>

                  <div className="flex justify-center mb-4">
                    <img
                      src={card.image || "/placeholder.svg"}
                      alt={card.title}
                      width={150}
                      height={150}
                      className="rounded-lg"
                    />
                  </div>

                  <p className="text-gray-700 dark:text-gray-800">{card.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(userCards.length / cardsToShow) }).map((_, index) => {
              const isActive = index === Math.floor(currentIndex / cardsToShow)
              return (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * cardsToShow)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive ? "bg-black dark:bg-white w-6" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`Go to slide group ${index + 1}`}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

