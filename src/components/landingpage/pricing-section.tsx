"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"
import { Link } from "react-router-dom"

interface PricingFeature {
  name: string
  starter: boolean | string
  professional: boolean | string
  enterprise: boolean | string
}

const pricingFeatures: PricingFeature[] = [
  {
    name: "Landing page design",
    starter: true,
    professional: true,
    enterprise: true,
  },
  {
    name: "Responsive for all devices",
    starter: true,
    professional: true,
    enterprise: true,
  },
  {
    name: "Basic SEO optimization",
    starter: true,
    professional: true,
    enterprise: true,
  },
  {
    name: "Number of pages",
    starter: "1 page",
    professional: "Up to 5 pages",
    enterprise: "10+ pages",
  },
  {
    name: "Custom animations",
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    name: "Revision rounds",
    starter: "2 rounds",
    professional: "4 rounds",
    enterprise: "Unlimited",
  },
  {
    name: "Delivery time",
    starter: "5 days",
    professional: "10 days",
    enterprise: "Custom",
  },
  {
    name: "Content management system",
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    name: "E-commerce functionality",
    starter: false,
    professional: false,
    enterprise: true,
  },
  {
    name: "Custom web application",
    starter: false,
    professional: false,
    enterprise: true,
  },
  {
    name: "Analytics integration",
    starter: "Basic",
    professional: "Advanced",
    enterprise: "Enterprise",
  },
  {
    name: "Support",
    starter: "Email",
    professional: "Email & Chat",
    enterprise: "24/7 Priority",
  },
  {
    name: "Performance optimization",
    starter: "Basic",
    professional: "Advanced",
    enterprise: "Enterprise",
  },
  {
    name: "Domain & hosting setup",
    starter: false,
    professional: true,
    enterprise: true,
  },
]

// Define pricing for both billing options
const pricingOptions = {
  monthly: {
    starter: {
      price: 99,
      unit: "/ month",
    },
    professional: {
      price: 249,
      unit: "/ month",
    },
    enterprise: {
      price: 499,
      unit: "/ month",
    },
  },
  oneTime: {
    starter: {
      price: 999,
      unit: "/ project",
    },
    professional: {
      price: 2499,
      unit: "/ project",
    },
    enterprise: {
      price: 4999,
      unit: "/ project",
    },
  },
}

export default function PricingSection() {
  const [billingOption, setBillingOption] = useState<"monthly" | "oneTime">("oneTime")

  const pricing = pricingOptions[billingOption]

  return (
    <div>
      <div className="flex justify-center mb-16">
        <div className="inline-flex items-center bg-gray-100 dark:bg-gray-700 rounded-full p-1">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              billingOption === "monthly"
                ? "bg-white dark:bg-gray-800 shadow-sm"
                : "hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
            onClick={() => setBillingOption("monthly")}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              billingOption === "oneTime"
                ? "bg-white dark:bg-gray-800 shadow-sm"
                : "hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
            onClick={() => setBillingOption("oneTime")}
          >
            Pay once
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Basic Plan */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-2">Starter</h3>
            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-bold">${pricing.starter.price}</span>
              <span className="text-gray-500 dark:text-gray-400 ml-2">{pricing.starter.unit}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Perfect for startups and small businesses looking to establish their online presence.
            </p>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <div className="font-medium mb-3">What's included:</div>
              <ul className="space-y-3">
                {pricingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    {feature.starter === true ? (
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : feature.starter === false ? (
                      <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    )}
                    <span>
                      {feature.name}
                      {typeof feature.starter === "string" && feature.starter !== "true" && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">({feature.starter})</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              to="/book"
              className="block text-center bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-md hover:bg-black/90 dark:hover:bg-white/90 text-sm font-medium w-full"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Pro Plan - Highlighted */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden relative transition-transform duration-300 hover:-translate-y-2 border-2 border-green-500 dark:border-green-400">
          <div className="absolute top-0 right-0 bg-green-500 dark:bg-green-400 text-white dark:text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
            POPULAR
          </div>
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-2">Professional</h3>
            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-bold">${pricing.professional.price}</span>
              <span className="text-gray-500 dark:text-gray-400 ml-2">{pricing.professional.unit}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Ideal for growing businesses that need a complete web presence with advanced features.
            </p>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <div className="font-medium mb-3">What's included:</div>
              <ul className="space-y-3">
                {pricingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    {feature.professional === true ? (
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : feature.professional === false ? (
                      <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    )}
                    <span>
                      {feature.name}
                      {typeof feature.professional === "string" && feature.professional !== "true" && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">({feature.professional})</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              to="/book"
              className="block text-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md text-sm font-medium w-full transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-2">Enterprise</h3>
            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-bold">${pricing.enterprise.price}</span>
              <span className="text-gray-500 dark:text-gray-400 ml-2">{pricing.enterprise.unit}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              For established businesses requiring complex solutions with custom functionality.
            </p>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <div className="font-medium mb-3">What's included:</div>
              <ul className="space-y-3">
                {pricingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    {feature.enterprise === true ? (
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : feature.enterprise === false ? (
                      <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    )}
                    <span>
                      {feature.name}
                      {typeof feature.enterprise === "string" && feature.enterprise !== "true" && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">({feature.enterprise})</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              to="/book"
              className="block text-center bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-md hover:bg-black/90 dark:hover:bg-white/90 text-sm font-medium w-full"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          All plans include a 30-day satisfaction guarantee. Not sure which plan is right for you?
        </p>
        <Link to="/contact" className="text-green-500 hover:text-green-600 font-medium">
          Schedule a free consultation →
        </Link>
      </div>
    </div>
  )
}

