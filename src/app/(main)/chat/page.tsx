"use client";

import type React from "react";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Search,
  SendIcon,
  Star,
  Users,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  MoreVertical,
  Info,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChatInterface } from "@/components/chat-interface";
import { Header } from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ChatSidebar, type ChatItem } from "@/components/chat-sidebar";
import type { AIAgent } from "@/components/chat-interface";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
// Thêm import CreateTemplateDialog
import { CreateTemplateDialog } from "@/components/create-template-dialog";
// Thêm import AgentInfoDialog vào đầu file:
import { AgentInfoDialog } from "@/components/agent-info-dialog";
import { useNavigate } from "react-router-dom";

type SortOption = "popular" | "rating" | "newest" | "name";
type CategoryOption =
  | "all"
  | "productivity"
  | "coding"
  | "writing"
  | "design"
  | "marketing"
  | "data"
  | "education"
  | "finance"
  | "health";

// Sample prompt templates for each agent type
const agentPromptTemplates: Record<string, string[]> = {
  // System agents
  socialgpt: [
    "Tạo cho tôi 10 bài viết cho trang X",
    "Tạo cho tôi 10 bài viết cho trang facebook",
    "Tạo cho tôi 10 bài viết cho trang linkedin",
    "Tạo cho tôi 10 bài viết cho trang thread",
  ],
  planner: [
    "Lên kế hoạch cho dự án mới của tôi",
    "Lên kế hoạch cho dự án mới của tôi",
    "Lên kế hoạch cho dự án mới của tôi",
    "Lên kế hoạch cho dự án mới của tôi",
    
  ],
  agent1: [
    "Create a project plan for my new website",
    "Help me organize my tasks for the week",
    "I need to schedule a team meeting, what's the best approach?",
    "How can I improve my productivity?",
  ],
  agent2: [
    "Debug this JavaScript function for me",
    "Explain how React hooks work",
    "Help me optimize this SQL query",
    "Write a unit test for this function",
  ],
  agent4: [
    "Analyze this dataset and tell me the key insights",
    "Create a visualization for my sales data",
    "Help me understand these statistical results",
    "What metrics should I track for my business?",
  ],
  agent7: [
    "Create a lesson plan for teaching programming",
    "How can I explain complex concepts to beginners?",
    "Suggest activities for an interactive workshop",
    "What are effective teaching methods for online courses?",
  ],
  agent10: [
    "Help me create a budget for the next quarter",
    "What investment strategies would you recommend?",
    "Explain how to read financial statements",
    "How can I reduce my business expenses?",
  ],

  // Default prompts for community agents by category
  productivity: [
    "Help me organize my workflow",
    "Suggest tools to improve my productivity",
    "Create a template for tracking my goals",
    "How can I manage my time better?",
  ],
  coding: [
    "Review my code and suggest improvements",
    "Explain this programming concept",
    "Help me design this software architecture",
    "What's the best way to implement this feature?",
  ],
  writing: [
    "Help me write a compelling introduction",
    "Edit this paragraph for clarity",
    "Suggest a structure for my article",
    "How can I make my writing more engaging?",
  ],
  design: [
    "Suggest color schemes for my website",
    "What design principles should I follow?",
    "Help me create a user-friendly interface",
    "How can I improve this layout?",
  ],
  marketing: [
    "Create a marketing strategy for my product",
    "Suggest content ideas for social media",
    "How can I improve my email campaigns?",
    "What metrics should I track for my marketing efforts?",
  ],
  data: [
    "Help me interpret these data patterns",
    "What visualization would work best for this data?",
    "Suggest ways to clean this dataset",
    "How can I extract insights from this information?",
  ],
  education: [
    "Create an assessment for this learning objective",
    "Suggest engaging activities for students",
    "How can I make this topic more accessible?",
    "What learning resources would you recommend?",
  ],
  finance: [
    "Explain this financial concept in simple terms",
    "Help me understand investment risks",
    "What factors should I consider for retirement planning?",
    "How can I improve my financial literacy?",
  ],
  health: [
    "Suggest a balanced meal plan",
    "What exercises are good for beginners?",
    "How can I improve my sleep quality?",
    "What are healthy habits to incorporate daily?",
  ],
};

// Generate a large sample of AI Agents
const generateSampleAgents = (): AIAgent[] => {
  const categories = [
    "productivity",
    "coding",
    "writing",
    "design",
    "marketing",
    "data",
    "education",
    "finance",
    "health",
  ];

  const systemAgents: AIAgent[] = [
    {
      id: "planner",
      name: "PlannerAI",
      description:
        "An AI assistant specialized in helping with planning tasks, scheduling, and project management.",
      isOfficial: true,
      rating: 4.9,
      usersCount: 8700,
      // category: "coding",
      dateAdded: "2023-09-20",
    },
    {
      id: "socialgpt",
      name: "Social Post AI",
      description:
        "Marketing AI assistant that helps you manage your social post schedule",
      isOfficial: true,
      rating: 4.8,
      usersCount: 12520,
      // category: "productivity",
      dateAdded: "2023-10-15",
      link: "/social-gpt",
    },
    // {
    //   id: "agent2",
    //   name: "CodeGPT",
    //   description:
    //     "An AI assistant specialized in helping with coding tasks, debugging, and software development.",
    //   isOfficial: true,
    //   rating: 4.9,
    //   usersCount: 8700,
    //   category: "coding",
    //   dateAdded: "2023-09-20",
    // },
    // {
    //   id: "agent4",
    //   name: "DataAnalyst",
    //   description:
    //     "An AI assistant that helps analyze data, create visualizations, and extract insights.",
    //   isOfficial: true,
    //   rating: 4.7,
    //   usersCount: 6300,
    //   category: "data",
    //   dateAdded: "2023-11-05",
    // },
    // {
    //   id: "agent7",
    //   name: "EducatorGPT",
    //   description:
    //     "An AI assistant designed to help with teaching, creating educational content, and answering academic questions.",
    //   isOfficial: true,
    //   rating: 4.6,
    //   usersCount: 5800,
    //   category: "education",
    //   dateAdded: "2023-12-10",
    // },
    // {
    //   id: "agent10",
    //   name: "FinanceAdvisor",
    //   description:
    //     "An AI assistant that provides financial advice, budget planning, and investment strategies.",
    //   isOfficial: true,
    //   rating: 4.5,
    //   usersCount: 4200,
    //   category: "finance",
    //   dateAdded: "2024-01-15",
    // },
  ];

  // Generate 45 community agents (50 total with the 5 system agents)
  const communityAgents: AIAgent[] = [];
  const creators = [
    "Jane Smith",
    "Tech Solutions",
    "AI Innovations",
    "Creative Studio",
    "Data Experts",
    "Code Masters",
    "Design Hub",
    "Marketing Pros",
    "Learning Lab",
    "Health Tech",
  ];

  for (let i = 1; i <= 45; i++) {
    const id = `community${i}`;
    const categoryIndex = i % categories.length;
    const creatorIndex = i % creators.length;
    const rating = 3.5 + Math.random() * 1.5; // Random rating between 3.5 and 5.0
    const usersCount = Math.floor(100 + Math.random() * 5000); // Random users between 100 and 5100

    // Generate a date within the last year
    const daysAgo = Math.floor(Math.random() * 365);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    const dateAdded = date.toISOString().split("T")[0];

    communityAgents.push({
      id,
      name: `${categories[categoryIndex].charAt(0).toUpperCase() + categories[categoryIndex].slice(1)}Assistant ${i}`,
      description: `A community-created AI assistant focused on ${categories[categoryIndex]} tasks. Helps users with ${categories[categoryIndex]}-related challenges and provides specialized assistance.`,
      creator: creators[creatorIndex],
      rating: Number.parseFloat(rating.toFixed(1)),
      usersCount,
      // category: categories[categoryIndex],
      dateAdded,
    });
  }

  return [...systemAgents, ...communityAgents];
};

// Sample AI Agents
const sampleAgents: AIAgent[] = generateSampleAgents();

// Update the sample chat data to include projects with their items
// Replace the sampleChats array with this updated version
const sampleChats: ChatItem[] = [
  {
    id: "project1",
    title: "E-commerce Website",
    date: "Today",
    isProject: true,
    agentId: "agent1",
    items: [
      {
        id: "project1-plan",
        type: "plan",
        title: "Development Plan",
      },
      {
        id: "project1-landing",
        type: "landing",
        title: "Landing Page",
      },
      {
        id: "project1-feedback",
        type: "feedback",
        title: "User Feedback",
      },
      {
        id: "project1-tracking",
        type: "tracking",
        title: "Analytics",
      },
    ],
    messages: [
      {
        id: "m1",
        content:
          "I need help creating a development plan for my new e-commerce website.",
        isUser: true,
        timestamp: "2:30 PM",
      },
      {
        id: "m2",
        content:
          "I'd be happy to help you create a development plan for your e-commerce website.",
        isUser: false,
        timestamp: "2:31 PM",
      },
    ],
  },
  {
    id: "project2",
    title: "Mobile App",
    date: "Today",
    isProject: true,
    agentId: "agent2",
    items: [
      {
        id: "project2-plan",
        type: "plan",
        title: "Development Plan",
      },
      {
        id: "project2-landing",
        type: "landing",
        title: "App Store Page",
      },
      {
        id: "project2-feedback",
        type: "feedback",
        title: "Beta Feedback",
      },
      {
        id: "project2-tracking",
        type: "tracking",
        title: "User Metrics",
      },
    ],
    messages: [
      {
        id: "m1",
        content:
          "Can you help me brainstorm some marketing strategies for my new mobile app?",
        isUser: true,
        timestamp: "11:20 AM",
      },
      {
        id: "m2",
        content:
          "I'd be happy to help you brainstorm marketing strategies for your mobile app!",
        isUser: false,
        timestamp: "11:21 AM",
      },
    ],
  },
  {
    id: "3",
    title: "Product feature brainstorming",
    date: "Yesterday",
    agentId: "community1",
    messages: [
      {
        id: "m1",
        content: "I need to add new features to my app. Any suggestions?",
        isUser: true,
        timestamp: "3:45 PM",
      },
      {
        id: "m2",
        content:
          "I'd be glad to help with feature brainstorming. What kind of app do you have, and who is your target audience?",
        isUser: false,
        timestamp: "3:46 PM",
      },
    ],
  },
  {
    id: "project3",
    title: "SaaS Platform",
    date: "Yesterday",
    isProject: true,
    agentId: "agent1",
    items: [
      {
        id: "project3-plan",
        type: "plan",
        title: "Product Roadmap",
      },
      {
        id: "project3-landing",
        type: "landing",
        title: "Marketing Site",
      },
      {
        id: "project3-feedback",
        type: "feedback",
        title: "Customer Reviews",
      },
      {
        id: "project3-tracking",
        type: "tracking",
        title: "Growth Metrics",
      },
    ],
    messages: [
      {
        id: "m1",
        content:
          "I need help creating a content calendar for my SaaS platform.",
        isUser: true,
        timestamp: "10:15 AM",
      },
      {
        id: "m2",
        content:
          "I can definitely help you create a content calendar for your SaaS platform.",
        isUser: false,
        timestamp: "10:16 AM",
      },
    ],
  },
  {
    id: "5",
    title: "Customer feedback analysis",
    date: "2 days ago",
    agentId: "agent2",
    messages: [
      {
        id: "m1",
        content:
          "I have a lot of customer feedback data. Can you help me analyze it?",
        isUser: true,
        timestamp: "4:20 PM",
      },
      {
        id: "m2",
        content:
          "I'd be happy to help you analyze your customer feedback data. What format is the data in, and what specific insights are you looking to gain from it?",
        isUser: false,
        timestamp: "4:21 PM",
      },
    ],
  },
];

export default function Home() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState<ChatItem[]>(sampleChats);
  const [agents, setAgents] = useState<AIAgent[]>(sampleAgents);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Pagination and filtering states
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("popular");
  const [categoryFilter, setCategoryFilter] = useState<CategoryOption>("all");
  const itemsPerPage = 6;
  // Thêm state để theo dõi các tags đã chọn
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // Thêm state để quản lý dialog trong component Home
  const [showCreateAgentDialog, setShowCreateAgentDialog] = useState(false);
  // Thêm state để quản lý dialog thông tin agent:
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedAgentForInfo, setSelectedAgentForInfo] =
    useState<AIAgent | null>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, 200);
    textarea.style.height = `${newHeight}px`;
  };

  // Adjust height when message changes
  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  const simulateAIResponse = useCallback(
    (chatId: string) => {
      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id === chatId) {
            return {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: `m${chat.messages.length + 2}`,
                  content:
                    "This is a simulated response. In a real application, this would be generated by an AI model based on your message.",
                  isUser: false,
                  timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                },
              ],
            };
          }
          return chat;
        })
      );
    },
    [setChats]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (activeChat) {
      // Add message to existing chat
      const updatedChats = chats.map((chat) => {
        if (chat.id === activeChat) {
          return {
            ...chat,
            messages: [
              ...chat.messages,
              {
                id: `m${chat.messages.length + 1}`,
                content: message,
                isUser: true,
                timestamp: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
            ],
          };
        }
        return chat;
      });
      setChats(updatedChats);

      // Simulate AI response after a short delay
      setTimeout(() => {
        simulateAIResponse(activeChat);
      }, 1000);
    } else {
      // Create a new chat with selected agent or default agent
      const agentId = selectedAgent || "agent1";
      const newChat: ChatItem = {
        id: `${chats.length + 1}`,
        title: message.length > 30 ? message.substring(0, 30) + "..." : message,
        date: "Just now",
        agentId: agentId,
        messages: [
          {
            id: "m1",
            content: message,
            isUser: true,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ],
      };

      setChats([newChat, ...chats]);
      setActiveChat(newChat.id);

      // Simulate AI response after a short delay
      setTimeout(() => {
        simulateAIResponse(newChat.id);
      }, 1000);
    }

    setMessage("");
    setSelectedAgent(null);
  };

  const handleNewChat = () => {
    setActiveChat(null);
    setSelectedAgent(null);
  };

  const startChatWithAgent = useCallback((agentId: string) => {
    setSelectedAgent(agentId);
    // Focus on the textarea
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 100);
  }, []);

  const getCurrentChat = () => {
    return chats.find((chat) => chat.id === activeChat) || null;
  };

  const getCurrentAgent = () => {
    const chat = getCurrentChat();
    if (!chat || !chat.agentId) return null;
    return agents.find((agent) => agent.id === chat.agentId) || null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  // Get prompt templates for the selected agent
  const getPromptTemplates = useCallback(() => {
    if (!selectedAgent) return [];

    const agent = agents.find((a) => a.id === selectedAgent);
    if (!agent) return [];

    // Return agent-specific prompts if available, otherwise return category-based prompts
    return (
      agentPromptTemplates[selectedAgent] ||
      (agent.category ? agentPromptTemplates[agent.category] || [] : [])
    );
  }, [agents, selectedAgent]);

  // Use a prompt template
  const usePromptTemplate = useCallback((prompt: string) => {
    setMessage(prompt);
    // Focus on the textarea
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 100);
  }, []);

  // Filter and sort agents
  const filterAndSortAgents = (agentList: AIAgent[], isSystem: boolean) => {
    // Filter by system/community
    let filteredAgents = agentList.filter((agent) =>
      isSystem ? agent.isOfficial : !agent.isOfficial
    );

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredAgents = filteredAgents.filter(
        (agent) =>
          agent.name.toLowerCase().includes(query) ||
          agent.description.toLowerCase().includes(query) ||
          (agent.creator && agent.creator.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (categoryFilter !== "all") {
      filteredAgents = filteredAgents.filter(
        (agent) => agent.category === categoryFilter
      );
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filteredAgents = filteredAgents.filter((agent) =>
        selectedTags.includes(agent.category || "")
      );
    }

    // Sort agents
    switch (sortOption) {
      case "popular":
        filteredAgents.sort(
          (a, b) => (b.usersCount || 0) - (a.usersCount || 0)
        );
        break;
      case "rating":
        filteredAgents.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
        filteredAgents.sort((a, b) => {
          if (!a.dateAdded || !b.dateAdded) return 0;
          return (
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
          );
        });
        break;
      case "name":
        filteredAgents.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filteredAgents;
  };

  // Get paginated agents
  const getPaginatedAgents = (agentList: AIAgent[], isSystem: boolean) => {
    const filteredAgents = filterAndSortAgents(agentList, isSystem);

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return {
      agents: filteredAgents.slice(startIndex, endIndex),
      totalPages: Math.ceil(filteredAgents.length / itemsPerPage),
      totalAgents: filteredAgents.length,
    };
  };

  const systemAgentsData = getPaginatedAgents(agents, true);
  const communityAgentsData = getPaginatedAgents(agents, false);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Scroll to top of agent list
    const agentListElement = document.getElementById("agent-list");
    if (agentListElement) {
      agentListElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Thay đổi hàm resetFilters để reset cả selectedTags
  const resetFilters = () => {
    setSearchQuery("");
    setSortOption("popular");
    setCategoryFilter("all");
    setSelectedTags([]);
    setCurrentPage(1);
  };

  // Categories for filter
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "productivity", label: "Productivity" },
    { value: "coding", label: "Coding" },
    { value: "writing", label: "Writing" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
    { value: "data", label: "Data Analysis" },
    { value: "education", label: "Education" },
    { value: "finance", label: "Finance" },
    { value: "health", label: "Health" },
  ];

  // Thêm hàm xử lý tạo agent mới
  const handleCreateNewAgent = (newAgent: any) => {
    // Trong thực tế, bạn sẽ thêm agent mới vào state agents
    toast({
      title: "Agent created",
      description: `${newAgent.name} has been created successfully`,
      duration: 3000,
    });
  };

  return (
    <>
      <div className="h-full w-full flex flex-col p-4 md:p-6 lg:p-8 overflow-y-auto">
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-2xl font-medium">
            Good afternoon, Vương. How can I help you today?
          </h1>
          <p className="text-muted-foreground">
            Choose an AI Agent to start a conversation or ask a question below
          </p>
        </div>

        {/* AI Agents Section */}
        <div className="w-full max-w-6xl mx-auto mb-8">
          <Tabs
            defaultValue="system"
            className="w-full"
            onValueChange={() => setCurrentPage(1)}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <h2 className="text-xl font-medium">AI Agents</h2>
              <TabsList className="bg-[#303030]">
                <TabsTrigger value="system">Official</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
                <TabsTrigger value="myagent">My Agent</TabsTrigger>
              </TabsList>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search AI agents..."
                  className="pl-9 bg-[#303030] border-[#404040]"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
                    onClick={() => {
                      setSearchQuery("");
                      setCurrentPage(1);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>

              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="gap-2 bg-[#303030] border-[#404040]"
                    >
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                      {selectedTags.length > 0 && (
                        <Badge className="ml-1 bg-blue-600 text-white">
                          {selectedTags.length}
                        </Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[280px] bg-[#303030] border-[#404040]">
                    <div className="space-y-4">
                      <h4 className="font-medium">Filter by category</h4>
                      <div className="flex flex-wrap gap-2">
                        {categories.slice(1).map((category) => (
                          <Badge
                            key={category.value}
                            variant={
                              selectedTags.includes(category.value)
                                ? "default"
                                : "outline"
                            }
                            className={`cursor-pointer ${
                              selectedTags.includes(category.value)
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-[#404040] hover:bg-[#505050]"
                            }`}
                            onClick={() => {
                              setSelectedTags((prev) =>
                                prev.includes(category.value)
                                  ? prev.filter((t) => t !== category.value)
                                  : [...prev, category.value]
                              );
                              setCurrentPage(1);
                            }}
                          >
                            {category.label}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        // variant="secondary"
                        size="sm"
                        className="w-full mt-2"
                        onClick={resetFilters}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>

                <Select
                  value={sortOption}
                  onValueChange={(value) => {
                    setSortOption(value as SortOption);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[130px] bg-[#303030] border-[#404040]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="system" className="mt-0">
              <div id="agent-list" className="mb-2">
                {systemAgentsData.totalAgents > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {systemAgentsData.agents.map((agent) => (
                        <Card
                          key={agent.id}
                          className="bg-[#303030] border-[#404040] hover:border-blue-600 transition-all cursor-pointer relative group"
                          onClick={() => {
                            startChatWithAgent(agent.id)
                            if(agent.link) {
                              navigate(agent.link);
                            }
                          }}
                        >
                          {/* Add dropdown menu */}
                          <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <DropdownMenu>
                              <DropdownMenuTrigger
                                asChild
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedAgentForInfo(agent);
                                    setInfoDialogOpen(true);
                                  }}
                                >
                                  <Info className="h-4 w-4 mr-2" />
                                  Information
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toast({
                                      title: "Agent added",
                                      description: `${agent.name} has been added to your agents`,
                                      duration: 3000,
                                    });
                                  }}
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add to My Agents
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center font-medium">
                                  {agent.name.substring(0, 2).toUpperCase()}
                                </div>
                                <div>
                                  <CardTitle className="text-base flex items-center gap-2">
                                    {agent.name}
                                    <Badge className="bg-blue-600 text-white hover:bg-blue-700">
                                      Official
                                    </Badge>
                                  </CardTitle>
                                  {agent.category && (
                                    <p className="text-xs text-muted-foreground capitalize">
                                      {agent.category}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <CardDescription className="text-gray-300 line-clamp-2">
                              {agent.description}
                            </CardDescription>
                          </CardContent>
                          <CardFooter className="flex justify-between items-center pt-0">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Star className="h-3 w-3 mr-1 text-yellow-500" />
                              <span>{agent.rating}/5</span>
                              <span className="mx-1">•</span>
                              <Users className="h-3 w-3 mr-1" />
                              <span>
                                {(agent.usersCount || 0).toLocaleString()} users
                              </span>
                            </div>
                            {agent.category && (
                              <Badge
                                variant="outline"
                                className="capitalize bg-[#404040] text-xs"
                              >
                                {agent.category}
                              </Badge>
                            )}
                          </CardFooter>
                        </Card>
                      ))}
                    </div>

                    {/* Pagination */}
                    {systemAgentsData.totalPages > 1 && (
                      <div className="flex justify-center items-center mt-6 gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-[#303030] border-[#404040]"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>

                        <div className="flex items-center gap-1 mx-2">
                          {Array.from(
                            { length: systemAgentsData.totalPages },
                            (_, i) => i + 1
                          ).map((page) => (
                            <Button
                              key={page}
                              variant={
                                currentPage === page ? "default" : "outline"
                              }
                              size="sm"
                              className={`h-8 w-8 ${currentPage === page ? "bg-blue-600" : "bg-[#303030] border-[#404040]"}`}
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </Button>
                          ))}
                        </div>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-[#303030] border-[#404040]"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === systemAgentsData.totalPages}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}

                    <div className="text-center text-sm text-muted-foreground mt-4">
                      Showing {systemAgentsData.agents.length} of{" "}
                      {systemAgentsData.totalAgents} official agents
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Search className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No agents found
                    </h3>
                    <p className="text-muted-foreground max-w-md">
                      No official agents match your search criteria. Try
                      adjusting your filters or search query.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={resetFilters}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="community" className="mt-0">
              <div id="agent-list" className="mb-2">
                {communityAgentsData.totalAgents > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {communityAgentsData.agents.map((agent) => (
                        <Card
                          key={agent.id}
                          className="bg-[#303030] border-[#404040] hover:border-blue-600 transition-all cursor-pointer relative group"
                          onClick={() => startChatWithAgent(agent.id)}
                        >
                          {/* Add dropdown menu */}
                          <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <DropdownMenu>
                              <DropdownMenuTrigger
                                asChild
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedAgentForInfo(agent);
                                    setInfoDialogOpen(true);
                                  }}
                                >
                                  <Info className="h-4 w-4 mr-2" />
                                  Information
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toast({
                                      title: "Agent added",
                                      description: `${agent.name} has been added to your agents`,
                                      duration: 3000,
                                    });
                                  }}
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add to My Agents
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center font-medium">
                                  {agent.name.substring(0, 2).toUpperCase()}
                                </div>
                                <div>
                                  <CardTitle className="text-base">
                                    {agent.name}
                                  </CardTitle>
                                  {agent.creator && (
                                    <p className="text-xs text-muted-foreground">
                                      by {agent.creator}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <CardDescription className="text-gray-300 line-clamp-2">
                              {agent.description}
                            </CardDescription>
                          </CardContent>
                          <CardFooter className="flex justify-between items-center pt-0">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Star className="h-3 w-3 mr-1 text-yellow-500" />
                              <span>{agent.rating}/5</span>
                              <span className="mx-1">•</span>
                              <Users className="h-3 w-3 mr-1" />
                              <span>
                                {(agent.usersCount || 0).toLocaleString()} users
                              </span>
                            </div>
                            {/* {agent.category && (
                              <Badge
                                variant="outline"
                                className="capitalize bg-[#404040] text-xs"
                              >
                                {agent.category}
                              </Badge>
                            )} */}
                          </CardFooter>
                        </Card>
                      ))}
                    </div>

                    {/* Pagination */}
                    {communityAgentsData.totalPages > 1 && (
                      <div className="flex justify-center items-center mt-6 gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-[#303030] border-[#404040]"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>

                        <div className="flex items-center gap-1 mx-2">
                          {Array.from(
                            { length: communityAgentsData.totalPages },
                            (_, i) => i + 1
                          ).map((page) => (
                            <Button
                              key={page}
                              variant={
                                currentPage === page ? "default" : "outline"
                              }
                              size="sm"
                              className={`h-8 w-8 ${currentPage === page ? "bg-blue-600" : "bg-[#303030] border-[#404040]"}`}
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </Button>
                          ))}
                        </div>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-[#303030] border-[#404040]"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={
                            currentPage === communityAgentsData.totalPages
                          }
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}

                    <div className="text-center text-sm text-muted-foreground mt-4">
                      Showing {communityAgentsData.agents.length} of{" "}
                      {communityAgentsData.totalAgents} community agents
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Search className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No agents found
                    </h3>
                    <p className="text-muted-foreground max-w-md">
                      No community agents match your search criteria. Try
                      adjusting your filters or search query.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={resetFilters}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="myagent" className="mt-0">
              <div id="agent-list" className="mb-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Create New Agent Card - Updated to match "My chat template" style */}
                  <div
                    className="flex flex-col border-2 border-dashed border-primary/40 rounded-lg p-4 hover:bg-primary/5 transition-colors cursor-pointer bg-gradient-to-b from-primary/5 to-transparent"
                    onClick={() => setShowCreateAgentDialog(true)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-md bg-primary/20 flex items-center justify-center text-primary">
                        <Plus className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-base">
                          Create New Agent
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Custom AI assistant
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Build your own custom AI agent with specific knowledge and
                      capabilities tailored to your needs.
                    </p>
                    <div className="mt-auto flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        Personalized experience
                      </span>
                      <Badge
                        variant="outline"
                        className="capitalize bg-[#404040] text-xs"
                      >
                        Custom
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Message Input Section */}
        <div className="w-full max-w-3xl mx-auto mt-auto">
          {/* Prompt Templates Section - Only show when an agent is selected */}
          {selectedAgent && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-blue-400" />
                <h3 className="text-sm font-medium">
                  Try asking {agents.find((a) => a.id === selectedAgent)?.name}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {getPromptTemplates().map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start h-auto py-2 px-3 text-left text-sm bg-[#303030] border-[#404040] hover:bg-[#404040]"
                    onClick={() => {
                      setMessage(prompt);
                      // Focus on the textarea
                      setTimeout(() => {
                        if (textareaRef.current) {
                          textareaRef.current.focus();
                        }
                      }, 100);
                    }}
                  >
                    <span className="text-left overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                      {prompt}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          )}
          {selectedAgent && (
            <div className="flex items-center gap-2 my-2 text-xs text-muted-foreground">
              <span>Chatting with:</span>
              <Badge variant="outline" className="bg-[#303030] text-white">
                {agents.find((a) => a.id === selectedAgent)?.name}
                {agents.find((a) => a.id === selectedAgent)?.isOfficial && (
                  <span className="ml-1 text-blue-400">(Official)</span>
                )}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 text-xs p-0"
                onClick={() => setSelectedAgent(null)}
              >
                Cancel
              </Button>
            </div>
          )}
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative rounded-xl bg-[#303030] shadow-sm">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleChange}
                placeholder={
                  selectedAgent
                    ? `Message ${agents.find((a) => a.id === selectedAgent)?.name || "AI Assistant"}...`
                    : "Message AI Assistant..."
                }
                rows={1}
                className="w-full resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 pr-12 py-3 px-4 outline-none overflow-y-auto"
                style={{
                  minHeight: "44px",
                  maxHeight: "200px",
                }}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!message.trim()}
                className="absolute bottom-3 right-3 h-8 w-8 rounded-full"
              >
                <SendIcon className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </form>
        </div>
      </div>

      <CreateTemplateDialog
        open={showCreateAgentDialog}
        onOpenChange={setShowCreateAgentDialog}
        onCreateTemplate={handleCreateNewAgent}
      />
      <AgentInfoDialog
        open={infoDialogOpen}
        onOpenChange={setInfoDialogOpen}
        agent={selectedAgentForInfo}
        onStartChat={startChatWithAgent}
      />
    </>
  );
}
