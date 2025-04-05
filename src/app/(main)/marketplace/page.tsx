"use client"

import { useState } from "react"
import { Search, Eye } from "lucide-react"
import { Header } from "@/components/header"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Sample project data
const projects = [
  {
    id: 1,
    title: "E-commerce Dashboard",
    image: "/placeholder.svg?height=200&width=300",
    category: "Dashboard",
  },
  {
    id: 2,
    title: "Social Media App",
    image: "/placeholder.svg?height=200&width=300",
    category: "Mobile",
  },
  {
    id: 3,
    title: "Portfolio Website",
    image: "/placeholder.svg?height=200&width=300",
    category: "Website",
  },
  {
    id: 4,
    title: "Task Management Tool",
    image: "/placeholder.svg?height=200&width=300",
    category: "Productivity",
  },
  {
    id: 5,
    title: "Travel Booking Platform",
    image: "/placeholder.svg?height=200&width=300",
    category: "Travel",
  },
  {
    id: 6,
    title: "Recipe Finder App",
    image: "/placeholder.svg?height=200&width=300",
    category: "Food",
  },
  {
    id: 7,
    title: "Fitness Tracker",
    image: "/placeholder.svg?height=200&width=300",
    category: "Health",
  },
  {
    id: 8,
    title: "Learning Management System",
    image: "/placeholder.svg?height=200&width=300",
    category: "Education",
  },
  {
    id: 9,
    title: "Real Estate Listings",
    image: "/placeholder.svg?height=200&width=300",
    category: "Real Estate",
  },
  {
    id: 10,
    title: "Weather Forecast App",
    image: "/placeholder.svg?height=200&width=300",
    category: "Weather",
  },
  {
    id: 11,
    title: "Music Streaming Service",
    image: "/placeholder.svg?height=200&width=300",
    category: "Entertainment",
  },
  {
    id: 12,
    title: "Financial Planning Tool",
    image: "/placeholder.svg?height=200&width=300",
    category: "Finance",
  },
]

// All unique categories
const categories = Array.from(new Set(projects.map((project) => project.category)))

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const itemsPerPage = 8

  // Filter projects based on search query and selected category
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory ? project.category === selectedCategory : true
    return matchesSearch && matchesCategory
  })

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === "newest") {
      return b.id - a.id // Assuming higher ID means newer
    } else if (sortBy === "oldest") {
      return a.id - b.id
    } else if (sortBy === "alphabetical") {
      return a.title.localeCompare(b.title)
    }
    return 0
  })

  // Paginate projects
  const totalPages = Math.ceil(sortedProjects.length / itemsPerPage)
  const paginatedProjects = sortedProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="flex-1 flex flex-col h-full w-full bg-background">
      {/* <Header /> */}
      <main className="flex-1 py-8 px-4 md:px-8 lg:px-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Welcome message */}
          <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
          <p className="text-muted-foreground mb-8">Explore projects, and see reviews from the community.</p>

          {/* Search and filter row */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {paginatedProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-lg overflow-hidden border bg-card transition-all duration-200 hover:shadow-md"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-40 object-cover"
                  />
                  {hoveredProject === project.id && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity">
                      <Button variant="secondary" size="sm" className="gap-2">
                        <Eye className="h-4 w-4" />
                        View Landing Page
                      </Button>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium truncate">{project.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="justify-center">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage > 1) setCurrentPage(currentPage - 1)
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1

                  // Show first page, last page, current page, and pages around current
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            setCurrentPage(pageNumber)
                          }}
                          isActive={pageNumber === currentPage}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  }

                  // Show ellipsis for skipped pages
                  if (
                    (pageNumber === 2 && currentPage > 3) ||
                    (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                  ) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )
                  }

                  return null
                })}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </main>
    </div>
  )
}

