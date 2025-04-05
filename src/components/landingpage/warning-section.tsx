"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const warningCards = [
  {
    id: 1,
    background: "bg-[#FFE8D7]",
    title: 'You enjoy "jumping on a quick call" with sales',
    image: "/placeholder.svg?height=200&width=200",
    description:
      "Sorry, we don't force you to talk to anyone. But you can watch a recorded demo (at your own pace) or request a personalized demo if you like.",
  },
  {
    id: 2,
    background: "bg-[#E3F4E8]",
    title: "You love needlessly wasting company money",
    image: "/placeholder.svg?height=200&width=200",
    description: "We only have usage-based pricing that decreases exponentially with scale.",
  },
  {
    id: 3,
    background: "bg-[#E5E7FF]",
    title: "You'd rather buy before you try",
    image: "/placeholder.svg?height=200&width=200",
    description:
      "We offer a free tier so large that only a fraction of our customers pay us anything. Even worse, we continually try to reduce our pricing.",
  },
  {
    id: 4,
    background: "bg-[#FFE5F4]",
    title: "You think your email is a good trade for that free whitepaper",
    image: "/placeholder.svg?height=200&width=200",
    description: "Please press Ctrl + W now, or ask your network administrator to close your window.",
  },
]

export default function WarningSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === warningCards.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? warningCards.length - 1 : prevIndex - 1))
  }

  return (
    <section className="py-24 relative overflow-hidden bg-[#FAFAFA] dark:bg-gray-900">
      <div className="w-full max-w-[1800px] mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-[#FF4405]">WARNING:</span>{" "}
            <span className="text-black dark:text-white">You'll hate us if...</span>
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
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
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {warningCards.map((card) => (
                <div key={card.id} className="w-full flex-shrink-0 px-4">
                  <div
                    className={`${card.background} rounded-2xl p-8 shadow-lg transform transition-all duration-300 hover:scale-[1.02]`}
                  >
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="w-full md:w-1/2">
                        <h3 className="text-2xl font-bold mb-4 text-black">{card.title}</h3>
                        <p className="text-gray-700 text-lg">{card.description}</p>
                      </div>
                      <div className="w-full md:w-1/2">
                        <Image
                          src={card.image || "/placeholder.svg"}
                          alt={card.title}
                          width={200}
                          height={200}
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {warningCards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-black dark:bg-white w-6" : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

