"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MessageCircle, X, Send } from "lucide-react"

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hi there! 👋 How can I help you today?", isUser: false },
  ])
  const [isAnimating, setIsAnimating] = useState(false)

  // Add a pulsing animation effect to draw attention to the chat bubble
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 2000)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    // Add user message
    setMessages([...messages, { text: message, isUser: true }])
    setMessage("")

    // Simulate response after a short delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Thanks for your message! Our team will get back to you soon.",
          isUser: false,
        },
      ])
    }, 1000)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat window */}
      {isOpen && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-80 sm:w-96 mb-4 overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          {/* Chat header */}
          <div className="bg-black dark:bg-gray-900 text-white p-4 flex justify-between items-center">
            <h3 className="font-medium">Chat with us</h3>
            <button
              onClick={toggleChat}
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat messages */}
          <div className="p-4 h-80 overflow-y-auto flex flex-col gap-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.isUser
                    ? "bg-black dark:bg-gray-700 text-white ml-auto rounded-br-none"
                    : "bg-gray-100 dark:bg-gray-600 dark:text-white mr-auto rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Chat input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-700 p-3 flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-400"
              autoFocus
            />
            <button
              type="submit"
              className="bg-black dark:bg-white text-white dark:text-black p-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      {/* Chat bubble button */}
      <button
        onClick={toggleChat}
        className={`bg-black dark:bg-white text-white dark:text-black rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
          isAnimating ? "animate-pulse" : ""
        } ${isOpen ? "scale-90" : "scale-100 hover:scale-105"}`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  )
}

