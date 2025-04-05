"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic email validation
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    setError(null)

    // Simulate API call
    try {
      // In a real app, you would send the email to your API here
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSubmitted(true)
      setEmail("")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[2000px] mx-auto px-4 py-16 bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay updated with our newsletter</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Join our newsletter to get the latest design trends, product updates, and exclusive offers delivered straight
          to your inbox.
        </p>

        {isSubmitted ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 flex flex-col items-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center mb-4">
              <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Thank you for subscribing!</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We've sent a confirmation email to your inbox. Please check your email to confirm your subscription.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-400"
                  disabled={isLoading}
                />
                {error && <p className="mt-2 text-red-500 text-sm text-left">{error}</p>}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-md hover:bg-black/90 dark:hover:bg-white/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-left">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

