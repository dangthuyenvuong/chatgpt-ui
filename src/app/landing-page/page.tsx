"use client";

import { Star, Check, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import UserTestimonials from "@/components/landingpage/user-testimonials";
import PricingSection from "@/components/landingpage/pricing-section";
import TrustedByGrid from "@/components/landingpage/trusted-by-grid";
import NewsletterForm from "@/components/landingpage/newsletter-form";
import Footer from "@/components/landingpage/footer";
import ProblemSolution from "@/components/landingpage/problem-solution";
import { Link } from "react-router-dom";
import "./globals.css";

// Define language options with their flags
const languages = [
  {
    code: "en",
    name: "English",
    flag: "🇬🇧",
  },
  {
    code: "fr",
    name: "Français",
    flag: "🇫🇷",
  },
  {
    code: "de",
    name: "Deutsch",
    flag: "🇩🇪",
  },
  {
    code: "es",
    name: "Español",
    flag: "🇪🇸",
  },
  {
    code: "vi",
    name: "Tiếng Việt",
    flag: "🇻🇳",
  },
];

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    // Check for user preference, default to dark mode
    const isDarkMode =
      localStorage.getItem("darkMode") === "false" ? false : true;
    setDarkMode(isDarkMode);

    // Apply dark mode class
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    // In a real app, you would also update i18n settings here
  };

  // Find current language object
  const currentLanguage =
    languages.find((lang) => lang.code === language) || languages[0];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white bg-[url('/grid-pattern.svg')] flex flex-col">
      <header className="w-full max-w-[1800px] mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">
            <span className="font-bold">slop</span>
            <span className="font-normal">design</span>
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <Link
            to="/demo"
            className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300"
          >
            Demo
          </Link>
          <Link
            to="/pricing"
            className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300"
          >
            Pricing
          </Link>

          {/* Language Selector with Flags */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300">
              <span className="mr-1">{currentLanguage.flag}</span>
              {currentLanguage.code.toUpperCase()}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex items-center gap-2 w-full text-left px-4 py-2 text-sm ${language === lang.code ? "bg-gray-100 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dark mode toggle is now hidden */}
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section with Grid Background */}
        <section className="w-full max-w-[2000px] mx-auto px-4 pt-16 pb-24">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-1.5 flex items-center gap-2 text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>5 founders booked a call this week!</span>
              </div>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6">
              We turn <span className="highlight-messy">messy ideas</span> into
              <br />
              beautiful <span className="highlight-products">products</span>
            </h2>

            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">3rd Place</span>
                <div className="flex items-center gap-1">
                  <img
                    src="/placeholder.svg?height=20&width=20"
                    alt="OpenAI logo"
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <span>OpenAI Hackathon</span>
                </div>
              </div>
            </div>

            <p className="text-center text-lg max-w-2xl mx-auto mb-10">
              Helping founders build and launch successful products.
              Specializing in AI, SaaS, and Web3 applications.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link
                to="/book"
                className="flex items-center justify-center gap-2 bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-md hover:bg-black/90 dark:hover:bg-white/90 text-sm font-medium"
              >
                Book a call 1K
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/pricing"
                className="flex items-center justify-center gap-2 text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300"
              >
                See pricing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex justify-center mb-12">
              <Link
                to="/founders"
                className="flex items-center gap-3 hover:opacity-90"
              >
                <div className="flex -space-x-2">
                  <img
                    src="/placeholder.svg?height=48&width=48"
                    alt="Co-founder 1"
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-white dark:border-gray-800"
                  />
                  <img
                    src="/placeholder.svg?height=48&width=48"
                    alt="Co-founder 2"
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-white dark:border-gray-800"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <span>Talk to Jack & Kevin (Co-founders)</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mb-20">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>No meetings required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>2-day turnaround</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Changed background to match hero section */}
        <section className="py-24 bg-white dark:bg-gray-900">
          <div className="w-full max-w-[1800px] mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Powerful <span className="highlight-features">features</span>{" "}
                for your <span className="animated-title">digital product</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                We combine beautiful design with powerful technology to create
                products that users love.
              </p>
            </div>

            <TrustedByGrid />
          </div>
        </section>

        {/* Problem & Solution Section */}
        <ProblemSolution />

        {/* Pricing Section - Changed background to match hero section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="w-full max-w-[2000px] mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Simple, Transparent{" "}
                <span className="highlight-pricing">Pricing</span>
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Choose the plan that fits your needs. All plans include
                unlimited revisions and dedicated support.
              </p>

              <PricingSection />
            </div>
          </div>
        </section>

        {/* User Testimonials Section */}
        <UserTestimonials />

        {/* FAQ Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="w-full max-w-[2000px] mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
              {/* Left Column - Fixed when scrolling */}
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-8">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Find answers to common questions about our services,
                    process, and pricing. If you don't see your question here,
                    feel free to reach out.
                  </p>

                  <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
                    <h3 className="text-lg font-medium mb-4">
                      Still have questions?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Contact us on{" "}
                      <Link
                        to="/twitter"
                        className="text-black dark:text-white hover:underline"
                      >
                        Twitter
                      </Link>{" "}
                      or by{" "}
                      <Link
                        to="mailto:hello@slopdesign.com"
                        className="text-black dark:text-white hover:underline"
                      >
                        email
                      </Link>
                      .
                    </p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-black dark:text-white font-medium hover:underline"
                    >
                      Contact our support team
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column - Questions and Answers */}
              <div className="lg:col-span-8">
                <div className="space-y-6">
                  {/* Question 1 */}
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
                    <button
                      className="w-full flex items-center justify-between py-4 text-left hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      onClick={() => toggleQuestion(0)}
                      aria-expanded={openQuestion === 0}
                    >
                      <span className="text-lg font-medium">
                        What's included in each plan?
                      </span>
                      <span
                        className={`text-2xl transform transition-transform duration-300 ${openQuestion === 0 ? "rotate-45" : ""}`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{ maxHeight: openQuestion === 0 ? "200px" : "0" }}
                    >
                      <div className="pt-2 pb-4 text-gray-600 dark:text-gray-400">
                        Each plan includes the core features like responsive
                        design, SEO optimization, and unlimited revisions.
                        Higher tiers add more pages, custom functionality, and
                        priority support.
                      </div>
                    </div>
                  </div>

                  {/* Question 2 */}
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
                    <button
                      className="w-full flex items-center justify-between py-4 text-left hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      onClick={() => toggleQuestion(1)}
                      aria-expanded={openQuestion === 1}
                    >
                      <span className="text-lg font-medium">
                        How long does a project typically take?
                      </span>
                      <span
                        className={`text-2xl transform transition-transform duration-300 ${openQuestion === 1 ? "rotate-45" : ""}`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{ maxHeight: openQuestion === 1 ? "200px" : "0" }}
                    >
                      <div className="pt-2 pb-4 text-gray-600 dark:text-gray-400">
                        Project timelines vary by complexity. Starter projects
                        typically take 5 days, Professional projects 10 days,
                        and Enterprise projects are custom-scoped based on
                        requirements.
                      </div>
                    </div>
                  </div>

                  {/* Question 3 */}
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
                    <button
                      className="w-full flex items-center justify-between py-4 text-left hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      onClick={() => toggleQuestion(2)}
                      aria-expanded={openQuestion === 2}
                    >
                      <span className="text-lg font-medium">
                        Do you offer ongoing support?
                      </span>
                      <span
                        className={`text-2xl transform transition-transform duration-300 ${openQuestion === 2 ? "rotate-45" : ""}`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{ maxHeight: openQuestion === 2 ? "200px" : "0" }}
                    >
                      <div className="pt-2 pb-4 text-gray-600 dark:text-gray-400">
                        Yes, we provide ongoing support for all our projects.
                        Enterprise plans include 24/7 priority support, while
                        other plans include standard business hours support.
                      </div>
                    </div>
                  </div>

                  {/* Question 4 */}
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
                    <button
                      className="w-full flex items-center justify-between py-4 text-left hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      onClick={() => toggleQuestion(3)}
                      aria-expanded={openQuestion === 3}
                    >
                      <span className="text-lg font-medium">
                        Can I upgrade my plan later?
                      </span>
                      <span
                        className={`text-2xl transform transition-transform duration-300 ${openQuestion === 3 ? "rotate-45" : ""}`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{ maxHeight: openQuestion === 3 ? "200px" : "0" }}
                    >
                      <div className="pt-2 pb-4 text-gray-600 dark:text-gray-400">
                        Yes, you can upgrade your plan at any time. We'll help
                        you transition smoothly and only charge the difference
                        in plan pricing.
                      </div>
                    </div>
                  </div>

                  {/* Question 5 */}
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
                    <button
                      className="w-full flex items-center justify-between py-4 text-left hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      onClick={() => toggleQuestion(4)}
                      aria-expanded={openQuestion === 4}
                    >
                      <span className="text-lg font-medium">
                        What technologies do you use?
                      </span>
                      <span
                        className={`text-2xl transform transition-transform duration-300 ${openQuestion === 4 ? "rotate-45" : ""}`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{ maxHeight: openQuestion === 4 ? "200px" : "0" }}
                    >
                      <div className="pt-2 pb-4 text-gray-600 dark:text-gray-400">
                        We use modern technologies including React, Next.js,
                        TypeScript, and Tailwind CSS. We can also work with your
                        preferred tech stack if needed.
                      </div>
                    </div>
                  </div>

                  {/* Question 6 */}
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
                    <button
                      className="w-full flex items-center justify-between py-4 text-left hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      onClick={() => toggleQuestion(5)}
                      aria-expanded={openQuestion === 5}
                    >
                      <span className="text-lg font-medium">
                        Do you offer refunds?
                      </span>
                      <span
                        className={`text-2xl transform transition-transform duration-300 ${openQuestion === 5 ? "rotate-45" : ""}`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{ maxHeight: openQuestion === 5 ? "200px" : "0" }}
                    >
                      <div className="pt-2 pb-4 text-gray-600 dark:text-gray-400">
                        Yes, we offer a 30-day satisfaction guarantee. If you're
                        not happy with our work, we'll provide a full refund
                        within the first 30 days of your project.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <NewsletterForm />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
