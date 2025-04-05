"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MessageSquare,
  X,
  Sparkles,
  Send,
  Maximize2,
  ImageIcon,
  FileText,
  LinkIcon,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  XIcon,
  Plus,
  Code,
  FileJson,
  FileSpreadsheet,
  FileTextIcon as FileText2,
  Paperclip,
  Reply,
  BarChart3,
  Check,
  CornerUpLeft,
  Copy,
  Edit,
  Trash,
  Forward,
  Settings,
  Moon,
  Sun,
  Trash2,
  RefreshCw,
  Volume2,
  VolumeX,
  ShoppingBag,
  Star,
  Play,
  Pause,
  Music,
  CreditCard,
  Heart,
  Share2,
  Pin,
  Clock,
  Bell,
  Calendar,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// Define message types
type MessageType =
  | "text"
  | "image"
  | "images"
  | "url"
  | "file"
  | "code"
  | "reply"
  | "poll"
  | "product"
  | "productList"
  | "actionList"
  | "audio"
  | "gif"
  | "reminder"
  | "article";

interface MessageReminder {
  title: string;
  date: Date;
  description?: string;
  priority?: "low" | "medium" | "high";
  completed?: boolean;
}

interface MessageFile {
  name: string;
  size: string;
  type: string;
  url: string;
}

interface MessageUrl {
  url: string;
  title?: string;
  description?: string;
  image?: string;
}

interface MessageCode {
  language: string;
  code: string;
}

interface MessageReply {
  originalMessage: {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
  };
  replyText: string;
}

interface MessagePollOption {
  id: string;
  text: string;
  votes: number;
  voters: string[];
}

interface MessagePoll {
  question: string;
  options: MessagePollOption[];
  allowMultipleVotes: boolean;
  totalVotes: number;
}

interface MessageProduct {
  id: string;
  name: string;
  price: string;
  description?: string;
  image?: string;
  url?: string;
  discount?: string;
  rating?: number;
  inStock?: boolean;
}

interface MessageProductList {
  title?: string;
  products: MessageProduct[];
}

interface MessageAction {
  id: string;
  icon: string;
  label: string;
  color?: string;
}

interface MessageActionList {
  title?: string;
  actions: MessageAction[];
}

interface MessageAudio {
  url: string;
  title?: string;
  duration?: string;
  artist?: string;
}

interface MessageGif {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

interface Reaction {
  type: string;
  count: number;
  users: string[];
}

interface MessageArticle {
  title: string;
  content: string;
  excerpt: string;
  author?: string;
  publishDate?: string;
  coverImage?: string;
  readingTime?: string;
  tags?: string[];
}

interface Message {
  id: string;
  type: MessageType;
  text?: string;
  image?: string;
  images?: string[];
  file?: MessageFile;
  url?: MessageUrl;
  code?: MessageCode;
  reply?: MessageReply;
  poll?: MessagePoll;
  product?: MessageProduct;
  productList?: MessageProductList;
  actionList?: MessageActionList;
  audio?: MessageAudio;
  gif?: MessageGif;
  reminder?: MessageReminder;
  article?: MessageArticle;
  reactions?: Record<string, Reaction>;
  isUser: boolean;
  timestamp: Date;
}

// Define reaction types
const reactionTypes = [
  { id: "like", emoji: "👍", label: "Like" },
  { id: "heart", emoji: "❤️", label: "Heart" },
  { id: "laugh", emoji: "😄", label: "Laugh" },
  { id: "wow", emoji: "😮", label: "Wow" },
  { id: "sad", emoji: "😢", label: "Sad" },
  { id: "dislike", emoji: "👎", label: "Dislike" },
];

export function BubbleChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageSet, setCurrentImageSet] = useState<string[]>([]);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
  const [showReactionMenu, setShowReactionMenu] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [fontSize, setFontSize] = useState("normal"); // small, normal, large
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const attachMenuRef = useRef<HTMLDivElement>(null);
  const attachButtonRef = useRef<HTMLButtonElement>(null);
  const settingsMenuRef = useRef<HTMLDivElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const currentUserId = "user-1"; // Simulated current user ID
  const [pinnedMessage, setPinnedMessage] = useState<Message | null>(null);
  const [currentArticle, setCurrentArticle] = useState<MessageArticle | null>(null)
  const [articleViewerOpen, setArticleViewerOpen] = useState(false)
  const [isEditingArticle, setIsEditingArticle] = useState(false)
  const [editedArticle, setEditedArticle] = useState<MessageArticle | null>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Close attach menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        attachMenuRef.current &&
        !attachMenuRef.current.contains(event.target as Node) &&
        attachButtonRef.current &&
        !attachButtonRef.current.contains(event.target as Node)
      ) {
        setShowAttachMenu(false);
      }

      if (
        settingsMenuRef.current &&
        !settingsMenuRef.current.contains(event.target as Node) &&
        settingsButtonRef.current &&
        !settingsButtonRef.current.contains(event.target as Node)
      ) {
        setShowSettingsMenu(false);
      }

      // Close reaction menu when clicking outside
      if (showReactionMenu) {
        setShowReactionMenu(null);
      }

      // Close action menu when clicking outside
      if (activeMessageId) {
        setActiveMessageId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAttachMenu, showSettingsMenu, showReactionMenu, activeMessageId]);

  // Show bubble after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 1000);

    // Show tooltip after bubble appears
    const tooltipTimer = setTimeout(() => {
      if (showBubble && !isOpen) {
        setShowTooltip(true);
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(tooltipTimer);
    };
  }, [showBubble, isOpen]);

  // Hide tooltip after some time
  useEffect(() => {
    if (showTooltip) {
      const hideTimer = setTimeout(() => {
        setShowTooltip(false);
      }, 8000);
      return () => clearTimeout(hideTimer);
    }
  }, [showTooltip]);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = "auto";
      // Set the height to scrollHeight to fit the content
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  // Generate a unique ID for messages
  const generateId = () => {
    return `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  // Add example messages after initial load
  useEffect(() => {
    if (messages.length === 0) {
      // Create timestamps for demo messages
      const now = new Date();

      // First group - AI welcome messages
      const time1 = new Date(now.getTime() - 60000 * 30); // 30 minutes ago
      const time1_1 = new Date(time1.getTime() + 1000); // Same minute
      const time1_2 = new Date(time1.getTime() + 2000); // Same minute

      // Second group - User questions
      const time2 = new Date(now.getTime() - 60000 * 25); // 25 minutes ago
      const time2_1 = new Date(time2.getTime() + 1000); // Same minute
      const time2_2 = new Date(time2.getTime() + 2000); // Same minute

      // Third group - AI responses with images
      const time3 = new Date(now.getTime() - 60000 * 24); // 24 minutes ago
      const time3_1 = new Date(time3.getTime() + 1000); // Same minute
      const time3_2 = new Date(time3.getTime() + 2000); // Same minute

      // Fourth group - User sharing files
      const time4 = new Date(now.getTime() - 60000 * 20); // 20 minutes ago
      const time4_1 = new Date(time4.getTime() + 1000); // Same minute

      // Fifth group - AI responses with code
      const time5 = new Date(now.getTime() - 60000 * 19); // 19 minutes ago
      const time5_1 = new Date(time5.getTime() + 1000); // Same minute
      const time5_2 = new Date(time5.getTime() + 2000); // Same minute

      // Sixth group - User questions about pricing
      const time6 = new Date(now.getTime() - 60000 * 15); // 15 minutes ago

      // Seventh group - AI responses about pricing
      const time7 = new Date(now.getTime() - 60000 * 14); // 14 minutes ago
      const time7_1 = new Date(time7.getTime() + 1000); // Same minute
      const time7_2 = new Date(time7.getTime() + 2000); // Same minute

      // Eighth group - User thanks
      const time8 = new Date(now.getTime() - 60000 * 10); // 10 minutes ago

      // Ninth group - AI final response
      const time9 = new Date(now.getTime() - 60000 * 9); // 9 minutes ago

      // Tenth group - AI poll
      const time10 = new Date(now.getTime() - 60000 * 8); // 8 minutes ago

      // Eleventh group - User reply
      const time11 = new Date(now.getTime() - 60000 * 7); // 7 minutes ago

      // Create messages with IDs
      const msg1 = {
        id: generateId(),
        type: "text" as MessageType,
        text: "Hi there! 👋 Welcome to PlannerAI Assistant. How can I help you today?",
        isUser: false,
        timestamp: time1,
        reactions: {
          like: { type: "like", count: 2, users: ["user-2", "user-3"] },
        },
      };

      const msg2 = {
        id: generateId(),
        type: "text" as MessageType,
        text: "I can help with project planning, task management, and answer questions about our platform.",
        isUser: false,
        timestamp: time1_1,
      };

      const msg3 = {
        id: generateId(),
        type: "text" as MessageType,
        text: "Feel free to ask me anything!",
        isUser: false,
        timestamp: time1_2,
      };

      const msg4 = {
        id: generateId(),
        type: "text" as MessageType,
        text: "Hi! I'm looking for some examples of how to use the platform for project management.",
        isUser: true,
        timestamp: time2,
      };

      const msg5 = {
        id: generateId(),
        type: "text" as MessageType,
        text: "Can you show me some templates or examples?",
        isUser: true,
        timestamp: time2_1,
      };

      const msg6 = {
        id: generateId(),
        type: "text" as MessageType,
        text: "Especially for software development projects.",
        isUser: true,
        timestamp: time2_2,
      };

      const msg7 = {
        id: generateId(),
        type: "text" as MessageType,
        text: "Of course! I'd be happy to show you some examples for software development project management.",
        isUser: false,
        timestamp: time3,
        reactions: {
          heart: { type: "heart", count: 1, users: ["user-1"] },
        },
      };

      const msg8 = {
        id: generateId(),
        type: "image" as MessageType,
        image: "/placeholder.svg?height=300&width=400&text=Project+Dashboard",
        text: "Here's an example of a project dashboard:",
        isUser: false,
        timestamp: time3_1,
      };

      const msg9 = {
        id: generateId(),
        type: "images" as MessageType,
        images: [
          "/placeholder.svg?height=200&width=300&text=Kanban+Board",
          "/placeholder.svg?height=200&width=300&text=Team+Workload",
          "/placeholder.svg?height=200&width=300&text=Gantt+Chart",
        ],
        text: "And here are some different views you can use:",
        isUser: false,
        timestamp: time3_2,
        reactions: {
          wow: { type: "wow", count: 1, users: ["user-1"] },
        },
      };

      const msg10 = {
        id: generateId(),
        type: "text" as MessageType,
        text: "These look great! I have some existing project files. Can I upload them to the platform?",
        isUser: true,
        timestamp: time4,
      };

      const msg11 = {
        id: generateId(),
        type: "file" as MessageType,
        file: {
          name: "project_requirements.pdf",
          size: "2.4 MB",
          type: "pdf",
          url: "#",
        },
        isUser: true,
        timestamp: time4_1,
      };

      const msg12 = {
        id: generateId(),
        type: "text" as MessageType,
        text: "Yes, you can upload your files to the platform. I see you've shared a requirements document. We can also integrate with your development workflow.",
        isUser: false,
        timestamp: time5,
      };

      const msg13 = {
        id: generateId(),
        type: "code" as MessageType,
        code: {
          language: "javascript",
          code: "// Example API integration\nconst plannerAI = require('planner-ai');\n\nasync function syncJiraIssues() {\n  const issues = await jira.getIssues('PROJECT-123');\n  await plannerAI.importTasks(issues, {\n    mapping: {\n      title: 'summary',\n      description: 'description',\n      status: 'status.name'\n    }\n  });\n  console.log('Issues synchronized successfully!');\n}",
        },
        isUser: false,
        timestamp: time5_1,
      };

      const msg14 = {
        id: generateId(),
        type: "text" as MessageType,
        text: "This code snippet shows how you can integrate with Jira to import your existing issues.",
        isUser: false,
        timestamp: time5_2,
      };

      const msg15 = {
        id: generateId(),
        type: "text" as MessageType,
        text: "That's really helpful! What about pricing? Do you have different plans for teams of different sizes?",
        isUser: true,
        timestamp: time6,
      };

      const msg16 = {
        id: generateId(),
        type: "text" as MessageType,
        text: "We offer several pricing tiers to accommodate teams of all sizes:",
        isUser: false,
        timestamp: time7,
      };

      const msg17 = {
        id: generateId(),
        type: "url" as MessageType,
        url: {
          url: "https://example.com/pricing",
          title: "PlannerAI Pricing Plans",
          description:
            "Flexible pricing options for individuals, small teams, and enterprises with advanced features and priority support.",
          image: "/placeholder.svg?height=150&width=300&text=Pricing+Plans",
        },
        isUser: false,
        timestamp: time7_1,
      };

      const msg18 = {
        id: generateId(),
        type: "text" as MessageType,
        text: "The Team plan at $12/user/month is our most popular option for software development teams. It includes all the collaboration features, unlimited projects, and API access.",
        isUser: false,
        timestamp: time7_2,
      };

      const msg19 = {
        id: generateId(),
        type: "text" as MessageType,
        text: "Perfect! Thanks for all the information. I'll discuss with my team and get back to you.",
        isUser: true,
        timestamp: time8,
        reactions: {
          like: { type: "like", count: 1, users: ["user-4"] },
        },
      };

      const msg20 = {
        id: generateId(),
        type: "text" as MessageType,
        text: "You're welcome! Feel free to reach out if you have any other questions. I'm here to help 24/7. Have a great day! 😊",
        isUser: false,
        timestamp: time9,
      };

      // Add a poll message
      const msg21 = {
        id: generateId(),
        type: "poll" as MessageType,
        poll: {
          question: "Which feature would you like to learn more about?",
          options: [
            {
              id: "opt-1",
              text: "Project Templates",
              votes: 3,
              voters: ["user-2", "user-3", "user-4"],
            },
            {
              id: "opt-2",
              text: "Team Collaboration",
              votes: 5,
              voters: ["user-5", "user-6", "user-7", "user-8", "user-9"],
            },
            {
              id: "opt-3",
              text: "API Integration",
              votes: 2,
              voters: ["user-10", "user-11"],
            },
            {
              id: "opt-4",
              text: "Analytics & Reporting",
              votes: 4,
              voters: ["user-12", "user-13", "user-14", "user-15"],
            },
          ],
          allowMultipleVotes: false,
          totalVotes: 14,
        },
        isUser: false,
        timestamp: time10,
      };

      // Add a reply message
      const msg22 = {
        id: generateId(),
        type: "reply" as MessageType,
        reply: {
          originalMessage: {
            id: msg15.id,
            text: msg15.text || "",
            isUser: msg15.isUser,
            timestamp: msg15.timestamp,
          },
          replyText:
            "I'd like to know more about the Enterprise plan. Do you offer custom pricing for larger teams?",
        },
        isUser: true,
        timestamp: time11,
      };

      // Add a product message
      const msg23 = {
        id: generateId(),
        type: "product" as MessageType,
        product: {
          id: "prod-sample-1",
          name: "Smart Watch Pro",
          price: "$299.99",
          description:
            "Track your fitness, receive notifications, and more with this premium smartwatch.",
          image: "/placeholder.svg?height=200&width=200&text=Smart+Watch",
          url: "#",
          discount: "$349.99",
          rating: 4.5,
          inStock: true,
        },
        isUser: false,
        timestamp: new Date(now.getTime() - 60000 * 5), // 5 minutes ago
      };

      // Add example product list message
      const msg24 = {
        id: generateId(),
        type: "productList" as MessageType,
        productList: {
          title: "Recommended Products",
          products: [
            {
              id: "prod-1",
              name: "Wireless Earbuds",
              price: "$89.99",
              description: "True wireless earbuds with noise cancellation",
              image: "/placeholder.svg?height=150&width=150&text=Earbuds",
              url: "#",
              rating: 4.7,
              inStock: true,
            },
            {
              id: "prod-2",
              name: "Smart Speaker",
              price: "$129.99",
              description: "Voice-controlled smart speaker with premium sound",
              image: "/placeholder.svg?height=150&width=150&text=Speaker",
              url: "#",
              rating: 4.5,
              inStock: true,
            },
            {
              id: "prod-3",
              name: "Fitness Tracker",
              price: "$59.99",
              description: "Track your activity, sleep, and more",
              image: "/placeholder.svg?height=150&width=150&text=Tracker",
              url: "#",
              discount: "$79.99",
              rating: 4.3,
              inStock: true,
            },
            {
              id: "prod-4",
              name: "Smartphone Stand",
              price: "$24.99",
              description: "Adjustable stand for smartphones and tablets",
              image: "/placeholder.svg?height=150&width=150&text=Stand",
              url: "#",
              rating: 4.8,
              inStock: false,
            },
          ],
        },
        isUser: false,
        timestamp: new Date(now.getTime() - 60000 * 4), // 4 minutes ago
      };

      // Add example action list message
      const msg25 = {
        id: generateId(),
        type: "actionList" as MessageType,
        text: "What would you like to do next?",
        actionList: {
          actions: [
            {
              id: "action-1",
              icon: "ShoppingCart",
              label: "View Cart",
              color: "blue",
            },
            {
              id: "action-2",
              icon: "CreditCard",
              label: "Checkout",
              color: "green",
            },
            {
              id: "action-3",
              icon: "Heart",
              label: "Save for Later",
              color: "pink",
            },
            { id: "action-4", icon: "Share2", label: "Share", color: "purple" },
          ],
        },
        isUser: false,
        timestamp: new Date(now.getTime() - 60000 * 3), // 3 minutes ago
      };

      // Add example audio message
      const msg26 = {
        id: generateId(),
        type: "audio" as MessageType,
        text: "Check out this new podcast episode:",
        audio: {
          url: "https://example.com/audio-sample.mp3",
          title: "The Future of AI",
          duration: "24:15",
          artist: "Tech Talks",
        },
        isUser: false,
        timestamp: new Date(now.getTime() - 60000 * 2), // 2 minutes ago
      };

      // Add example gif message
      const msg27 = {
        id: generateId(),
        type: "gif" as MessageType,
        gif: {
          url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDd6Y2g1c3k4NXgydWt2ZXJ1cWhtMGxxdWs4aHd1aXFxcnF1YmQxdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7aCTfyhHfLEwGM4o/giphy.gif",
          alt: "Thumbs up animation",
        },
        isUser: true,
        timestamp: new Date(now.getTime() - 60000 * 1), // 1 minute ago
      };

      // Add example reminder message
      const reminderDate = new Date(now.getTime() + 60000 * 60 * 24); // Tomorrow
      const msg28 = {
        id: generateId(),
        type: "reminder" as MessageType,
        reminder: {
          title: "Quarterly Team Review",
          date: reminderDate,
          description:
            "Prepare presentation slides and performance metrics for the quarterly review meeting",
          priority: "high",
          completed: false,
        },
        isUser: false,
        timestamp: new Date(now.getTime() - 60000 * 0.5), // 30 seconds ago
      };

      // Add example article message
      const msg29 = {
        id: generateId(),
        type: "article" as MessageType,
        article: {
          title: "The Future of AI in Everyday Life",
          excerpt:
            "Artificial intelligence is rapidly transforming how we live and work. From smart assistants to autonomous vehicles, AI technologies are becoming increasingly integrated into our daily routines.",
          content:
            "Artificial intelligence is rapidly transforming how we live and work. From smart assistants to autonomous vehicles, AI technologies are becoming increasingly integrated into our daily routines.\n\nIn recent years, we've witnessed remarkable advancements in AI capabilities. Natural language processing has improved to the point where virtual assistants can understand context and nuance in conversations. Computer vision systems can now identify objects and people with greater accuracy than humans in many scenarios. Machine learning algorithms are helping doctors diagnose diseases earlier and with greater precision.\n\nHowever, as AI becomes more prevalent, important questions arise about privacy, security, and the future of work. How do we ensure that AI systems respect user privacy? What safeguards should be in place to prevent misuse of increasingly powerful AI? And how will labor markets adapt as automation capabilities expand?\n\nExperts predict that AI will create more jobs than it eliminates, but the transition may be challenging for many workers. New roles will emerge that require collaboration between humans and AI systems, emphasizing uniquely human skills like creativity, empathy, and complex problem-solving.\n\nFor individuals, the key to thriving in this AI-augmented future will be adaptability and continuous learning. Educational systems will need to evolve to prepare students for a world where working alongside intelligent machines is the norm rather than the exception.\n\nDespite legitimate concerns, the potential benefits of AI are enormous. From addressing climate change to revolutionizing healthcare, AI tools could help solve some of humanity's most pressing challenges. The key will be ensuring these powerful technologies are developed responsibly, with careful consideration of their broader societal impacts.",
          author: "Dr. Sarah Chen",
          publishDate: "March 15, 2023",
          coverImage: "/placeholder.svg?height=400&width=600&text=AI+Future",
          readingTime: "5 min read",
          tags: ["Artificial Intelligence", "Technology", "Future Trends"],
        },
        isUser: false,
        timestamp: new Date(now.getTime() - 60000 * 0.2), // 12 seconds ago
      };

      // Add the new messages to the array
      setMessages([
        msg1,
        msg2,
        msg3,
        msg4,
        msg5,
        msg6,
        msg7,
        msg8,
        msg9,
        msg10,
        msg11,
        msg12,
        msg13,
        msg14,
        msg15,
        msg16,
        msg17,
        msg18,
        msg19,
        msg20,
        msg21,
        msg22,
        msg23,
        msg24,
        msg25,
        msg26,
        msg27,
        msg28,
        msg29,
      ]);
    }
  }, [messages.length]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleSettingsMenu = () => {
    setShowSettingsMenu(!showSettingsMenu);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Thực tế sẽ cần thêm logic để thay đổi theme của ứng dụng
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const changeFontSize = (size: string) => {
    setFontSize(size);
    setShowSettingsMenu(false);
  };

  const clearChatHistory = () => {
    if (confirm("Are you sure you want to clear all chat history?")) {
      setMessages([]);
    }
    setShowSettingsMenu(false);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Detect if input is a URL
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const isUrl = urlRegex.test(inputValue);

      // Add user message
      if (replyingTo) {
        // Send as reply
        setMessages((prev) => [
          ...prev,
          {
            id: generateId(),
            type: "reply",
            reply: {
              originalMessage: {
                id: replyingTo.id,
                text: replyingTo.text || "",
                isUser: replyingTo.isUser,
                timestamp: replyingTo.timestamp,
              },
              replyText: inputValue,
            },
            isUser: true,
            timestamp: new Date(),
          },
        ]);
        setReplyingTo(null);
      } else if (isUrl) {
        const url = inputValue.match(urlRegex)![0];
        setMessages((prev) => [
          ...prev,
          {
            id: generateId(),
            type: "url",
            url: {
              url: url,
              title: "Shared Link",
              description: "Link shared in conversation",
            },
            isUser: true,
            timestamp: new Date(),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: generateId(),
            type: "text",
            text: inputValue,
            isUser: true,
            timestamp: new Date(),
          },
        ]);
      }

      setInputValue("");

      // Simulate AI response after a short delay
      setTimeout(() => {
        const aiResponses = [
          { type: "text", text: "I'd be happy to help with that!" },
          {
            type: "text",
            text: "Great question! Let me find that information for you.",
          },
          {
            type: "text",
            text: "Thanks for reaching out. I'm here to assist you.",
          },
          {
            type: "text",
            text: "I understand what you're looking for. Here's what I can suggest...",
          },
        ];
        const randomResponse =
          aiResponses[Math.floor(Math.random() * aiResponses.length)];
        setMessages((prev) => [
          ...prev,
          {
            id: generateId(),
            ...randomResponse,
            isUser: false,
            timestamp: new Date(),
          },
        ]);
      }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const openImageViewer = (image: string) => {
    setCurrentImage(image);
    setImageViewerOpen(true);
  };

  const openArticleViewer = (article: MessageArticle) => {
    setCurrentArticle(article);
    setArticleViewerOpen(true);
  };

  const handleEditArticle = () => {
    if (currentArticle) {
      setEditedArticle({ ...currentArticle })
      setIsEditingArticle(true)
    }
  }

  const openImageSetViewer = (images: string[], index: number) => {
    setCurrentImageSet(images);
    setCurrentImageIndex(index);
    setCurrentImage(images[index]);
    setImageViewerOpen(true);
  };

  const handleCancelEdit = () => {
    setIsEditingArticle(false)
    setEditedArticle(null)
  }

  const handleSaveArticle = () => {
    if (editedArticle && currentArticle) {
      // Cập nhật article trong danh sách messages
      setMessages((prev) =>
        prev.map((message) => {
          if (message.type === "article" && message.article && message.article === currentArticle) {
            return {
              ...message,
              article: editedArticle,
            }
          }
          return message
        })
      )

      // Cập nhật currentArticle để hiển thị nội dung đã chỉnh sửa
      setCurrentArticle(editedArticle)
      setIsEditingArticle(false)
    }
  }

  const handleArticleInputChange = (field: keyof MessageArticle, value: string) => {
    if (editedArticle) {
      setEditedArticle({
        ...editedArticle,
        [field]: value,
      })
    }
  }

  const nextImage = () => {
    if (currentImageSet.length > 0) {
      const nextIndex = (currentImageIndex + 1) % currentImageSet.length;
      setCurrentImageIndex(nextIndex);
      setCurrentImage(currentImageSet[nextIndex]);
    }
  };

  const prevImage = () => {
    if (currentImageSet.length > 0) {
      const prevIndex =
        (currentImageIndex - 1 + currentImageSet.length) %
        currentImageSet.length;
      setCurrentImageIndex(prevIndex);
      setCurrentImage(currentImageSet[prevIndex]);
    }
  };

  const toggleAttachMenu = () => {
    setShowAttachMenu(!showAttachMenu);
  };

  const handleAttachImage = () => {
    // Simulate image attachment
    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        type: "image",
        image: "/placeholder.svg?height=300&width=400&text=Attached+Image",
        isUser: true,
        timestamp: new Date(),
      },
    ]);
    setShowAttachMenu(false);
  };

  const handleAttachFile = () => {
    // Simulate file attachment
    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        type: "file",
        file: {
          name: "my-document.pdf",
          size: "1.8 MB",
          type: "pdf",
          url: "#",
        },
        isUser: true,
        timestamp: new Date(),
      },
    ]);
    setShowAttachMenu(false);
  };

  const handleAttachUrl = () => {
    // Simulate URL attachment
    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        type: "url",
        url: {
          url: "https://example.org",
          title: "My Shared Link",
          description: "This is a link I wanted to share with you",
          image: "/placeholder.svg?height=150&width=300&text=My+Link+Preview",
        },
        isUser: true,
        timestamp: new Date(),
      },
    ]);
    setShowAttachMenu(false);
  };

  const handleAttachCode = () => {
    // Simulate code attachment
    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        type: "code",
        code: {
          language: "javascript",
          code: "function helloWorld() {\n  console.log('Hello, world!');\n}\n\nhelloWorld();",
        },
        isUser: true,
        timestamp: new Date(),
      },
    ]);
    setShowAttachMenu(false);
  };

  const handleAttachPoll = () => {
    // Simulate poll attachment
    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        type: "poll",
        poll: {
          question: "When should we schedule our next team meeting?",
          options: [
            {
              id: `opt-${Date.now()}-1`,
              text: "Monday 10:00 AM",
              votes: 0,
              voters: [],
            },
            {
              id: `opt-${Date.now()}-2`,
              text: "Tuesday 2:00 PM",
              votes: 0,
              voters: [],
            },
            {
              id: `opt-${Date.now()}-3`,
              text: "Wednesday 11:00 AM",
              votes: 0,
              voters: [],
            },
            {
              id: `opt-${Date.now()}-4`,
              text: "Friday 3:00 PM",
              votes: 0,
              voters: [],
            },
          ],
          allowMultipleVotes: false,
          totalVotes: 0,
        },
        isUser: true,
        timestamp: new Date(),
      },
    ]);
    setShowAttachMenu(false);
  };

  const handleAttachProduct = () => {
    // Simulate product attachment
    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        type: "product",
        product: {
          id: `prod-${Date.now()}`,
          name: "Premium Wireless Headphones",
          price: "$149.99",
          description:
            "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
          image: "/placeholder.svg?height=200&width=200&text=Headphones",
          url: "#",
          discount: "$199.99",
          rating: 4.8,
          inStock: true,
        },
        isUser: true,
        timestamp: new Date(),
      },
    ]);
    setShowAttachMenu(false);
  };

  const handleAttachGif = () => {
    // Simulate GIF attachment
    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        type: "gif",
        gif: {
          url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDd6Y2g1c3k4NXgydWt2ZXJ1cWhtMGxxdWs4aHd1aXFxcnF1YmQxdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7aCTfyhHfLEwGM4o/giphy.gif",
          alt: "Thumbs up animation",
        },
        isUser: true,
        timestamp: new Date(),
      },
    ]);
    setShowAttachMenu(false);
  };

  const handleAttachAudio = () => {
    // Simulate audio attachment
    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        type: "audio",
        audio: {
          url: "https://example.com/audio-sample.mp3",
          title: "Voice Message",
          duration: "0:45",
        },
        isUser: true,
        timestamp: new Date(),
      },
    ]);
    setShowAttachMenu(false);
  };

  const handleAttachReminder = () => {
    // Simulate reminder attachment
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        type: "reminder",
        reminder: {
          title: "Team Meeting",
          date: tomorrow,
          description: "Discuss project progress and next steps",
          priority: "medium",
          completed: false,
        },
        isUser: true,
        timestamp: new Date(),
      },
    ]);
    setShowAttachMenu(false);
  };

  const handleVoteOnPoll = (messageId: string, optionId: string) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (
          message.id === messageId &&
          message.type === "poll" &&
          message.poll
        ) {
          // Check if user already voted on this poll
          const userVotedOptions = message.poll.options.filter((opt) =>
            opt.voters.includes(currentUserId)
          );

          // If multiple votes are not allowed and user already voted, remove previous vote
          if (!message.poll.allowMultipleVotes && userVotedOptions.length > 0) {
            const updatedOptions = message.poll.options.map((opt) => {
              if (opt.voters.includes(currentUserId)) {
                return {
                  ...opt,
                  votes: opt.votes - 1,
                  voters: opt.voters.filter((id) => id !== currentUserId),
                };
              }
              return opt;
            });

            // Add new vote
            return {
              ...message,
              poll: {
                ...message.poll,
                options: updatedOptions.map((opt) =>
                  opt.id === optionId
                    ? {
                        ...opt,
                        votes: opt.votes + 1,
                        voters: [...opt.voters, currentUserId],
                      }
                    : opt
                ),
              },
            };
          } else {
            // Check if user already voted for this specific option
            const alreadyVotedForThisOption = message.poll.options
              .find((opt) => opt.id === optionId)
              ?.voters.includes(currentUserId);

            if (alreadyVotedForThisOption) {
              // Remove vote if already voted for this option
              return {
                ...message,
                poll: {
                  ...message.poll,
                  options: message.poll.options.map((opt) =>
                    opt.id === optionId
                      ? {
                          ...opt,
                          votes: opt.votes - 1,
                          voters: opt.voters.filter(
                            (id) => id !== currentUserId
                          ),
                        }
                      : opt
                  ),
                  totalVotes: message.poll.totalVotes - 1,
                },
              };
            } else {
              // Add new vote
              return {
                ...message,
                poll: {
                  ...message.poll,
                  options: message.poll.options.map((opt) =>
                    opt.id === optionId
                      ? {
                          ...opt,
                          votes: opt.votes + 1,
                          voters: [...opt.voters, currentUserId],
                        }
                      : opt
                  ),
                  totalVotes: message.poll.totalVotes + 1,
                },
              };
            }
          }
        }
        return message;
      })
    );
  };

  const handleReplyToMessage = (message: Message) => {
    setReplyingTo(message);
  };

  const cancelReply = () => {
    setReplyingTo(null);
  };

  const handleMessageAction = (
    messageId: string,
    action: string,
    message: Message
  ) => {
    switch (action) {
      case "reply":
        handleReplyToMessage(message);
        break;
      case "copy":
        if (message.text) {
          navigator.clipboard.writeText(message.text);
        }
        break;
      case "edit":
        // Chỉ cho phép edit tin nhắn của người dùng
        if (message.isUser && message.type === "text") {
          setInputValue(message.text || "");
          // Có thể thêm logic để xóa tin nhắn cũ và thay thế bằng tin nhắn mới
        }
        break;
      case "delete":
        setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
        break;
      case "forward":
        // Giả lập chức năng forward
        if (message.text) {
          setMessages((prev) => [
            ...prev,
            {
              id: generateId(),
              type: "text",
              text: `Forwarded: ${message.text}`,
              isUser: true,
              timestamp: new Date(),
            },
          ]);
        }
        break;
      default:
        break;
    }
    setActiveMessageId(null);
  };

  const handleReaction = (messageId: string, reactionType: string) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.id === messageId) {
          // Create reactions object if it doesn't exist
          const reactions = message.reactions || {};

          // Check if user already reacted with this reaction
          const existingReaction = reactions[reactionType];

          if (
            existingReaction &&
            existingReaction.users.includes(currentUserId)
          ) {
            // Remove user's reaction if they already reacted with this type
            if (existingReaction.count <= 1) {
              // Remove the reaction type if this is the last user
              const { [reactionType]: _, ...restReactions } = reactions;
              return {
                ...message,
                reactions:
                  Object.keys(restReactions).length > 0
                    ? restReactions
                    : undefined,
              };
            } else {
              // Decrease count and remove user from the list
              return {
                ...message,
                reactions: {
                  ...reactions,
                  [reactionType]: {
                    ...existingReaction,
                    count: existingReaction.count - 1,
                    users: existingReaction.users.filter(
                      (id) => id !== currentUserId
                    ),
                  },
                },
              };
            }
          } else {
            // Add new reaction or add user to existing reaction
            return {
              ...message,
              reactions: {
                ...reactions,
                [reactionType]: existingReaction
                  ? {
                      ...existingReaction,
                      count: existingReaction.count + 1,
                      users: [...existingReaction.users, currentUserId],
                    }
                  : { type: reactionType, count: 1, users: [currentUserId] },
              },
            };
          }
        }
        return message;
      })
    );

    setShowReactionMenu(null);
  };

  const handleActionClick = (actionId: string, actionLabel: string) => {
    // Simulate action handling
    console.log(`Action clicked: ${actionLabel} (${actionId})`);

    // Add a message to show the action was clicked
    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        type: "text",
        text: `You selected: ${actionLabel}`,
        isUser: true,
        timestamp: new Date(),
      },
    ]);
  };

  const handlePlayAudio = (audioUrl: string) => {
    if (currentAudio === audioUrl) {
      // Toggle play/pause
      setIsPlaying(!isPlaying);
    } else {
      // Play new audio
      setCurrentAudio(audioUrl);
      setIsPlaying(true);
    }
  };

  // Group messages by sender and minute
  const groupMessages = (messages: Message[]) => {
    const groups: Message[][] = [];
    let currentGroup: Message[] = [];

    messages.forEach((message, index) => {
      const prevMessage = index > 0 ? messages[index - 1] : null;

      // Start a new group if:
      // 1. This is the first message
      // 2. The sender changed
      // 3. The minute changed
      if (
        !prevMessage ||
        prevMessage.isUser !== message.isUser ||
        prevMessage.timestamp.getMinutes() !== message.timestamp.getMinutes() ||
        prevMessage.timestamp.getHours() !== message.timestamp.getHours()
      ) {
        if (currentGroup.length > 0) {
          groups.push(currentGroup);
        }
        currentGroup = [message];
      } else {
        currentGroup.push(message);
      }
    });

    // Add the last group
    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }

    return groups;
  };

  const renderMessageContent = (message: Message) => {
    return (
      <>
        {message.text && <p className="mb-2">{message.text}</p>}

        {message.type === "image" && message.image && (
          <div
            className="mt-1 cursor-pointer"
            onClick={() => openImageViewer(message.image!)}
          >
            <img
              src={message.image || "/placeholder.svg"}
              alt="Shared image"
              className="rounded-md max-h-[150px] w-auto object-cover"
            />
          </div>
        )}

        {message.type === "images" && message.images && (
          <div className="mt-1">
            <div className="grid grid-cols-2 gap-1">
              {message.images.slice(0, 4).map((img, imgIndex) => (
                <div
                  key={imgIndex}
                  className={`relative cursor-pointer ${
                    message.images!.length > 4 && imgIndex === 3
                      ? "relative"
                      : ""
                  }`}
                  onClick={() => openImageSetViewer(message.images!, imgIndex)}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Image ${imgIndex + 1}`}
                    className="rounded-md h-[80px] w-full object-cover"
                  />
                  {message.images!.length > 4 && imgIndex === 3 && (
                    <div className="absolute inset-0 bg-black/60 rounded-md flex items-center justify-center">
                      <span className="text-white font-medium">
                        +{message.images!.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {message.type === "url" && message.url && (
          <div className="mt-1 border border-foreground/20 dark:border-foreground/20 rounded-md overflow-hidden">
            {message.url.image && (
              <img
                src={message.url.image || "/placeholder.svg"}
                alt={message.url.title}
                className="w-full h-[100px] object-cover"
              />
            )}
            <div className="p-2">
              <h4 className="font-medium text-xs">{message.url.title}</h4>
              <p className="text-[10px] text-foreground/70 dark:text-foreground/70 line-clamp-2 mt-1">
                {message.url.description}
              </p>
              <div className="flex items-center mt-2 text-[10px] text-foreground/60 dark:text-foreground/60">
                <LinkIcon className="w-3 h-3 mr-1" />
                <span className="truncate">{message.url.url}</span>
              </div>
              <a
                href={message.url.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center w-full text-[10px] py-1 rounded bg-foreground/5 hover:bg-foreground/10 transition-colors"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Open Link
              </a>
            </div>
          </div>
        )}

        {message.type === "file" && message.file && (
          <div className="mt-1 flex items-center p-2 border border-foreground/20 dark:border-foreground/20 rounded-md">
            <div className="w-8 h-8 rounded bg-foreground/5 flex items-center justify-center mr-2">
              {message.file.type === "pdf" && (
                <FileText className="w-4 h-4 text-foreground/70" />
              )}
              {message.file.type === "json" && (
                <FileJson className="w-4 h-4 text-foreground/70" />
              )}
              {message.file.type === "csv" && (
                <FileSpreadsheet className="w-4 h-4 text-foreground/70" />
              )}
              {message.file.type === "txt" && (
                <FileText2 className="w-4 h-4 text-foreground/70" />
              )}
              {!["pdf", "json", "csv", "txt"].includes(message.file.type) && (
                <Paperclip className="w-4 h-4 text-foreground/70" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-xs truncate">
                {message.file.name}
              </p>
              <p className="text-[10px] text-foreground/70">
                {message.file.size}
              </p>
            </div>
            <a
              href={message.file.url}
              download
              className="ml-2 p-1.5 rounded-full hover:bg-foreground/10 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {message.type === "code" && message.code && (
          <div className="mt-1 rounded-md overflow-hidden border border-foreground/20 dark:border-foreground/20">
            <div className="bg-foreground/5 dark:bg-foreground/10 px-3 py-1 text-[10px] font-medium flex items-center">
              <Code className="w-3.5 h-3.5 mr-1.5" />
              {message.code.language}
            </div>
            <pre className="p-3 text-[10px] overflow-x-auto bg-foreground/[0.03] dark:bg-foreground/[0.05]">
              <code>{message.code.code}</code>
            </pre>
          </div>
        )}

        {message.type === "reply" && message.reply && (
          <div className="mt-1 mb-2">
            <div className="rounded-md p-2 bg-foreground/5 dark:bg-foreground/5 border-l-2 border-foreground/20 dark:border-foreground/20 mb-2">
              <div className="flex items-center gap-1 mb-1">
                <CornerUpLeft className="w-3 h-3 text-foreground/50" />
                <span className="text-[10px] font-medium text-foreground/50">
                  {message.reply.originalMessage.isUser
                    ? "You"
                    : "AI Assistant"}
                </span>
              </div>
              <p className="text-[10px] text-foreground/70 line-clamp-2">
                {message.reply.originalMessage.text}
              </p>
            </div>
            <p>{message.reply.replyText}</p>
          </div>
        )}

        {message.type === "poll" && message.poll && (
          <div className="mt-1 rounded-md overflow-hidden border border-foreground/20 dark:border-foreground/20">
            <div className="bg-foreground/5 dark:bg-foreground/10 px-3 py-2 text-xs font-medium flex items-center">
              <BarChart3 className="w-4 h-4 mr-1.5 text-foreground/70" />
              <span>Poll: {message.poll.question}</span>
            </div>
            <div className="p-3">
              <div className="space-y-2">
                {message.poll.options.map((option) => {
                  const percentage =
                    message.poll.totalVotes > 0
                      ? Math.round(
                          (option.votes / message.poll.totalVotes) * 100
                        )
                      : 0;
                  const hasVoted = option.voters.includes(currentUserId);

                  return (
                    <div key={option.id} className="relative">
                      <button
                        onClick={() => handleVoteOnPoll(message.id, option.id)}
                        className={`w-full text-left p-2 rounded-md text-xs relative z-10 ${
                          hasVoted
                            ? "bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/40"
                            : "hover:bg-foreground/5 dark:hover:bg-foreground/5"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                hasVoted
                                  ? "border-blue-500 bg-blue-500 text-white"
                                  : "border-foreground/30"
                              }`}
                            >
                              {hasVoted && <Check className="w-3 h-3" />}
                            </div>
                            <span>{option.text}</span>
                          </div>
                          <span className="text-foreground/70 text-[10px]">
                            {option.votes}{" "}
                            {option.votes === 1 ? "vote" : "votes"}
                          </span>
                        </div>
                      </button>

                      {/* Progress bar */}
                      <div
                        className="absolute top-0 left-0 h-full bg-foreground/5 dark:bg-foreground/10 rounded-md"
                        style={{ width: `${percentage}%`, maxWidth: "100%" }}
                      />
                    </div>
                  );
                })}
              </div>
              <p className="mt-2 text-[10px] text-foreground/50 text-center">
                {message.poll.totalVotes}{" "}
                {message.poll.totalVotes === 1 ? "vote" : "votes"} •
                {message.poll.allowMultipleVotes
                  ? " Multiple votes allowed"
                  : " One vote per person"}
              </p>
            </div>
          </div>
        )}

        {message.type === "product" && message.product && (
          <div className="mt-1 border border-foreground/20 dark:border-foreground/20 rounded-md overflow-hidden">
            <div className="flex flex-col">
              <div className="relative">
                <img
                  src={message.product.image || "/placeholder.svg"}
                  alt={message.product.name}
                  className="w-full h-[150px] object-cover"
                />
                {message.product.discount && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    Sale
                  </div>
                )}
                {!message.product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-medium text-xs">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h4 className="font-medium text-sm">{message.product.name}</h4>
                <div className="flex items-center mt-1">
                  <span className="font-bold text-sm">
                    {message.product.price}
                  </span>
                  {message.product.discount && (
                    <span className="text-[10px] text-foreground/70 line-through ml-2">
                      {message.product.discount}
                    </span>
                  )}
                </div>
                {message.product.rating && (
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(message.product.rating!)
                            ? "text-yellow-500 fill-yellow-500"
                            : i < message.product.rating!
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-foreground/20"
                        }`}
                      />
                    ))}
                    <span className="text-[10px] text-foreground/70 ml-1">
                      {message.product.rating}
                    </span>
                  </div>
                )}
                <p className="text-[10px] text-foreground/70 line-clamp-2 mt-1">
                  {message.product.description}
                </p>
                <div className="flex gap-2 mt-2">
                  <a
                    href={message.product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center text-[10px] py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                  >
                    <ShoppingBag className="w-3 h-3 mr-1" />
                    {message.product.inStock ? "Buy Now" : "Notify Me"}
                  </a>
                  <button className="px-2 py-1 rounded bg-foreground/5 hover:bg-foreground/10 transition-colors">
                    <ShoppingBag className="w-3.5 h-3.5 text-foreground/70" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {message.type === "productList" && message.productList && (
          <div className="mt-2">
            {message.productList.title && (
              <h4 className="font-medium text-sm mb-2">
                {message.productList.title}
              </h4>
            )}
            <div className="relative">
              <div className="flex overflow-x-auto pb-2 space-x-3 scrollbar-hide">
                {message.productList.products.map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 w-[160px] border border-foreground/20 dark:border-foreground/20 rounded-md overflow-hidden"
                  >
                    <div className="relative h-[100px]">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {product.discount && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                          Sale
                        </div>
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-medium text-xs">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-2">
                      <h5 className="font-medium text-xs truncate">
                        {product.name}
                      </h5>
                      <div className="flex items-center mt-1">
                        <span className="font-bold text-xs">
                          {product.price}
                        </span>
                        {product.discount && (
                          <span className="text-[10px] text-foreground/70 line-through ml-2">
                            {product.discount}
                          </span>
                        )}
                      </div>
                      {product.rating && (
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-2.5 h-2.5 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-500 fill-yellow-500"
                                  : i < product.rating
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-foreground/20"
                              }`}
                            />
                          ))}
                          <span className="text-[10px] text-foreground/70 ml-1">
                            {product.rating}
                          </span>
                        </div>
                      )}
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 flex items-center justify-center w-full text-[10px] py-1 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                      >
                        <ShoppingBag className="w-2.5 h-2.5 mr-1" />
                        {product.inStock ? "View" : "Notify Me"}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {message.type === "actionList" && message.actionList && (
          <div className="mt-2">
            <div className="flex flex-col gap-2">
              {message.actionList.actions.map((action) => {
                // Dynamically get the icon component
                const IconComponent = (() => {
                  switch (action.icon) {
                    case "ShoppingCart":
                      return ShoppingBag;
                    case "CreditCard":
                      return CreditCard;
                    case "Heart":
                      return Heart;
                    case "Share2":
                      return Share2;
                    default:
                      return MessageSquare;
                  }
                })();

                const colorClass = (() => {
                  switch (action.color) {
                    case "blue":
                      return "bg-blue-600 hover:bg-blue-700 text-white";
                    case "green":
                      return "bg-green-600 hover:bg-green-700 text-white";
                    case "red":
                      return "bg-red-600 hover:bg-red-700 text-white";
                    case "yellow":
                      return "bg-yellow-600 hover:bg-yellow-700 text-white";
                    case "purple":
                      return "bg-purple-600 hover:bg-purple-700 text-white";
                    case "pink":
                      return "bg-pink-600 hover:bg-pink-700 text-white";
                    default:
                      return "bg-foreground/10 hover:bg-foreground/20 text-foreground";
                  }
                })();

                return (
                  <button
                    key={action.id}
                    onClick={() => handleActionClick(action.id, action.label)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs ${colorClass} transition-colors w-full`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {message.type === "audio" && message.audio && (
          <div className="mt-2 border border-foreground/20 dark:border-foreground/20 rounded-md overflow-hidden">
            <div className="p-3">
              {message.audio.title && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center">
                    <Music className="w-4 h-4 text-foreground/70" />
                  </div>
                  <div>
                    <h5 className="font-medium text-xs">
                      {message.audio.title}
                    </h5>
                    {message.audio.artist && (
                      <p className="text-[10px] text-foreground/70">
                        {message.audio.artist}
                      </p>
                    )}
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePlayAudio(message.audio!.url)}
                  className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-foreground/20 transition-colors"
                >
                  {currentAudio === message.audio.url && isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </button>
                <div className="flex-1 h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600"
                    style={{
                      width:
                        currentAudio === message.audio.url && isPlaying
                          ? "45%"
                          : "0%",
                    }}
                  ></div>
                </div>
                {message.audio.duration && (
                  <span className="text-[10px] text-foreground/70">
                    {message.audio.duration}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {message.type === "gif" && message.gif && (
          <div
            className="mt-1 cursor-pointer"
            onClick={() => openImageViewer(message.gif!.url)}
          >
            <img
              src={message.gif.url || "/placeholder.svg"}
              alt={message.gif.alt || "GIF"}
              className="rounded-md max-h-[200px] w-auto object-cover"
            />
          </div>
        )}

        {message.type === "reminder" && message.reminder && (
          <div className="mt-2 border border-foreground/20 dark:border-foreground/20 rounded-md overflow-hidden">
            <div className="bg-foreground/5 dark:bg-foreground/10 px-3 py-2 text-xs font-medium flex items-center">
              <Bell className="w-4 h-4 mr-1.5 text-foreground/70" />
              <span>Reminder</span>
              {message.reminder.priority === "high" && (
                <span className="ml-auto px-1.5 py-0.5 text-[10px] bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200 rounded-full">
                  High
                </span>
              )}
              {message.reminder.priority === "medium" && (
                <span className="ml-auto px-1.5 py-0.5 text-[10px] bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 rounded-full">
                  Medium
                </span>
              )}
              {message.reminder.priority === "low" && (
                <span className="ml-auto px-1.5 py-0.5 text-[10px] bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 rounded-full">
                  Low
                </span>
              )}
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">
                  {message.reminder.title}
                </h4>
                <button
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    message.reminder.completed
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                      : "bg-foreground/5 text-foreground/70 hover:bg-foreground/10"
                  }`}
                  onClick={() => {
                    setMessages((prev) =>
                      prev.map((msg) =>
                        msg.id === message.id &&
                        msg.type === "reminder" &&
                        msg.reminder
                          ? {
                              ...msg,
                              reminder: {
                                ...msg.reminder,
                                completed: !msg.reminder.completed,
                              },
                            }
                          : msg
                      )
                    );
                  }}
                >
                  {message.reminder.completed ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Circle className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="flex items-center mt-2 text-xs text-foreground/70">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                <span>
                  {message.reminder.date.toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              {message.reminder.description && (
                <p className="mt-2 text-xs">{message.reminder.description}</p>
              )}
            </div>
          </div>
        )}

        {message.type === "article" && message.article && (
          <div
            className="mt-2 border border-foreground/20 dark:border-foreground/20 rounded-md overflow-hidden cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
            onClick={() => openArticleViewer(message.article!)}
          >
            {message.article.coverImage && (
              <div className="relative h-[120px] w-full overflow-hidden">
                <img
                  src={message.article.coverImage || "/placeholder.svg"}
                  alt={message.article.title}
                  className="w-full h-full object-cover"
                />
                {message.article.readingTime && (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-full">
                    {message.article.readingTime}
                  </div>
                )}
              </div>
            )}
            <div className="p-3">
              <h4 className="font-medium text-sm">{message.article.title}</h4>
              {(message.article.author || message.article.publishDate) && (
                <div className="flex items-center gap-2 mt-1 text-[10px] text-foreground/70">
                  {message.article.author && (
                    <span>{message.article.author}</span>
                  )}
                  {message.article.author && message.article.publishDate && (
                    <span>•</span>
                  )}
                  {message.article.publishDate && (
                    <span>{message.article.publishDate}</span>
                  )}
                </div>
              )}
              <p className="text-xs text-foreground/70 line-clamp-2 mt-1">
                {message.article.excerpt}
              </p>
              {message.article.tags && message.article.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {message.article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-[10px] bg-foreground/5 text-foreground/70 px-1.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex justify-end mt-2">
                <div className="text-[10px] text-blue-600 dark:text-blue-400 flex items-center">
                  Read more <ChevronRight className="w-3 h-3 ml-0.5" />
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const renderReactions = (message: Message) => {
    if (!message.reactions || Object.keys(message.reactions).length === 0)
      return null;

    return (
      <div className="flex gap-1 mt-1">
        {Object.values(message.reactions).map((reaction) => (
          <button
            key={reaction.type}
            onClick={() => handleReaction(message.id, reaction.type)}
            className={`flex items-center px-1.5 py-0.5 rounded-full text-xs ${
              reaction.users.includes(currentUserId)
                ? "bg-blue-100 dark:bg-blue-900/30"
                : "bg-foreground/5 dark:bg-foreground/10 hover:bg-foreground/10 dark:hover:bg-foreground/20"
            }`}
          >
            <span className="mr-1">
              {reactionTypes.find((r) => r.id === reaction.type)?.emoji}
            </span>
            <span className="text-[10px]">{reaction.count}</span>
          </button>
        ))}
      </div>
    );
  };

  const handlePinMessage = (message: Message) => {
    setPinnedMessage(message);
    setActiveMessageId(null);
  };

  const handleUnpinMessage = () => {
    setPinnedMessage(null);
  };

  const renderMessageGroups = () => {
    const messageGroups = groupMessages(messages);

    return messageGroups.map((group, groupIndex) => {
      const isUser = group[0].isUser;
      const lastMessage = group[group.length - 1];

      return (
        <div
          key={groupIndex}
          className={`flex ${isUser ? "justify-end" : "justify-start"} mb-5 group`}
        >
          <div className={`max-w-[85%]`}>
            <div className="flex flex-col gap-1">
              {group.map((message, messageIndex) => {
                const isFirstInGroup = messageIndex === 0;
                const isLastInGroup = messageIndex === group.length - 1;
                const isActive = activeMessageId === message.id;
                const isReactionMenuOpen = showReactionMenu === message.id;

                return (
                  <div
                    id={`msg-${message.id}`}
                    key={messageIndex}
                    className={`rounded-lg ${isExpanded ? "p-3 text-sm" : "p-2 text-xs"} ${
                      isUser
                        ? "bg-blue-700 text-white dark:bg-blue-700 dark:text-white"
                        : "bg-foreground/10 dark:bg-foreground/10"
                    } relative group/message highlight-transition`}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setActiveMessageId(isActive ? null : message.id);
                    }}
                    onClick={() => {
                      if (isActive) {
                        setActiveMessageId(null);
                      }
                    }}
                  >
                    {renderMessageContent(message)}

                    {/* Only show timestamp for the last message in the group */}
                    {isLastInGroup && (
                      <p
                        className={`${isExpanded ? "text-[11px]" : "text-[10px]"} mt-1 ${
                          isUser
                            ? "text-white/70 dark:text-white/70"
                            : "text-foreground/70 dark:text-foreground/70"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    )}

                    {/* Reactions */}
                    {renderReactions(message)}

                    {/* Reaction button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowReactionMenu(
                          isReactionMenuOpen ? null : message.id
                        );
                        setActiveMessageId(null);
                      }}
                      className={`absolute ${isUser ? "left-0" : "right-0"} bottom-1/2 translate-y-1/2 ${
                        isUser
                          ? "-translate-x-full -left-2"
                          : "translate-x-full right-2"
                      } p-1 rounded-full bg-background/80 dark:bg-background/80 opacity-0 group-hover/message:opacity-100 transition-opacity hover:bg-background dark:hover:bg-background`}
                    >
                      <span className="text-[10px]">😊</span>
                    </button>

                    {/* Reply button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReplyToMessage(message);
                      }}
                      className={`absolute ${isUser ? "left-0" : "right-0"} top-1/2 -translate-y-1/2 ${
                        isUser
                          ? "-translate-x-full -left-2"
                          : "translate-x-full right-2"
                      } p-1 rounded-full bg-background/80 dark:bg-background/80 opacity-0 group-hover/message:opacity-100 transition-opacity hover:bg-background dark:hover:bg-background`}
                    >
                      <Reply className="w-3.5 h-3.5 text-foreground/70" />
                    </button>

                    {/* Reaction menu */}
                    {isReactionMenuOpen && (
                      <div
                        className={`absolute z-20 ${isUser ? "right-0 -bottom-10" : "left-0 -bottom-10"} bg-background dark:bg-background shadow-lg rounded-full overflow-hidden border border-foreground/10 dark:border-foreground/10 flex p-1`}
                      >
                        {reactionTypes.map((reaction) => (
                          <button
                            key={reaction.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReaction(message.id, reaction.id);
                            }}
                            className="p-1 hover:bg-foreground/5 rounded-full transition-colors"
                            title={reaction.label}
                          >
                            <span className="text-base">{reaction.emoji}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Action menu */}
                    {isActive && (
                      <div
                        className={`absolute z-20 ${isUser ? "right-0 -top-[150px]" : "left-0 -top-[150px]"} bg-background dark:bg-background shadow-lg rounded-lg overflow-hidden border border-foreground/10 dark:border-foreground/10`}
                      >
                        <div className="py-1">
                          <button
                            onClick={() =>
                              handleMessageAction(message.id, "reply", message)
                            }
                            className="flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-foreground/5 transition-colors text-left"
                          >
                            <Reply className="w-3.5 h-3.5 text-foreground/70" />
                            <span>Reply</span>
                          </button>
                          {message.text && (
                            <button
                              onClick={() =>
                                handleMessageAction(message.id, "copy", message)
                              }
                              className="flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-foreground/5 transition-colors text-left"
                            >
                              <Copy className="w-3.5 h-3.5 text-foreground/70" />
                              <span>Copy</span>
                            </button>
                          )}
                          {message.isUser && message.type === "text" && (
                            <button
                              onClick={() =>
                                handleMessageAction(message.id, "edit", message)
                              }
                              className="flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-foreground/5 transition-colors text-left"
                            >
                              <Edit className="w-3.5 h-3.5 text-foreground/70" />
                              <span>Edit</span>
                            </button>
                          )}
                          <button
                            onClick={() => handlePinMessage(message)}
                            className="flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-foreground/5 transition-colors text-left"
                          >
                            <Pin className="w-3.5 h-3.5 text-foreground/70" />
                            <span>Pin</span>
                          </button>
                          <button
                            onClick={() =>
                              handleMessageAction(message.id, "delete", message)
                            }
                            className="flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-foreground/5 transition-colors text-left text-red-500"
                          >
                            <Trash className="w-3.5 h-3.5 text-red-500" />
                            <span>Delete</span>
                          </button>
                          <button
                            onClick={() =>
                              handleMessageAction(
                                message.id,
                                "forward",
                                message
                              )
                            }
                            className="flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-foreground/5 transition-colors text-left"
                          >
                            <Forward className="w-3.5 h-3.5 text-foreground/70" />
                            <span>Forward</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      {/* Bubble Chat Button */}
      <AnimatePresence>
        {showBubble && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <button
              onClick={toggleChat}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="relative flex items-center justify-center w-12 h-12 rounded-full bg-background dark:bg-background text-foreground dark:text-foreground shadow-lg hover:shadow-gray-400/50 dark:hover:shadow-gray-700/50 transition-all duration-300 hover:scale-105 group overflow-hidden cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 z-10" />
            </button>

            {/* Floating message tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-[56px] right-0 bg-background dark:bg-background p-3 rounded-lg shadow-lg max-w-[350px] w-[300px] text-xs text-foreground dark:text-foreground"
                >
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-foreground dark:text-foreground flex-shrink-0 mt-0.5" />
                    <p>
                      Need help? Chat with our AI assistant! We're here to
                      answer your questions and provide support for all your
                      needs.
                    </p>
                  </div>
                  {/* Triangle pointer */}
                  <div className="absolute w-3 h-3 bg-background dark:bg-background transform rotate-45 bottom-[-6px] right-4"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              width: isExpanded ? "min(90vw, 600px)" : "350px",
              height: isExpanded ? "min(80vh, 650px)" : "500px",
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ ease: "easeOut", duration: 0.2,  }}
            className={`fixed bottom-4 right-4 bg-background dark:bg-background rounded-lg shadow-xl flex flex-col overflow-hidden z-50 ${
              isExpanded ? "sm:w-[600px] sm:h-[650px]" : "sm:w-[350px] sm:h-[500px]"
            } ${fontSize === "small" ? "text-xs" : fontSize === "large" ? "text-base" : ""}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 bg-background dark:bg-background text-foreground dark:text-foreground">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-foreground/10 dark:bg-foreground/10 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-foreground dark:text-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">AI Assistant</h3>
                  <p className="text-[10px] text-foreground/70 dark:text-foreground/70">
                    Online | Typically replies instantly
                  </p>
                </div>
              </div>
              <div className="flex gap-0.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-foreground dark:text-foreground hover:bg-foreground/10 dark:hover:bg-foreground/10"
                  onClick={toggleExpand}
                  title={isExpanded ? "Collapse" : "Expand"}
                >
                  <Maximize2 className="h-3 w-3" />
                </Button>
                <div className="relative">
                  <Button
                    ref={settingsButtonRef}
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-foreground dark:text-foreground hover:bg-foreground/10 dark:hover:bg-foreground/10"
                    onClick={toggleSettingsMenu}
                  >
                    <Settings className="h-3 w-3" />
                  </Button>

                  {/* Settings menu dropdown */}
                  <AnimatePresence>
                    {showSettingsMenu && (
                      <motion.div
                        ref={settingsMenuRef}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-1 bg-background dark:bg-background shadow-lg rounded-lg overflow-hidden z-20 border border-foreground/10 dark:border-foreground/10 w-48"
                      >
                        <div className="py-1">
                          <button
                            onClick={toggleDarkMode}
                            className="flex items-center gap-2 w-full px-3 py-2 text-xs hover:bg-foreground/5 transition-colors text-left"
                          >
                            {isDarkMode ? (
                              <Sun className="w-3.5 h-3.5 text-foreground/70" />
                            ) : (
                              <Moon className="w-3.5 h-3.5 text-foreground/70" />
                            )}
                            <span>
                              {isDarkMode ? "Light Mode" : "Dark Mode"}
                            </span>
                          </button>
                          <button
                            onClick={toggleSound}
                            className="flex items-center gap-2 w-full px-3 py-2 text-xs hover:bg-foreground/5 transition-colors text-left"
                          >
                            {soundEnabled ? (
                              <Volume2 className="w-3.5 h-3.5 text-foreground/70" />
                            ) : (
                              <VolumeX className="w-3.5 h-3.5 text-foreground/70" />
                            )}
                            <span>
                              {soundEnabled ? "Mute Sound" : "Enable Sound"}
                            </span>
                          </button>
                          <div className="px-3 py-2">
                            <p className="text-xs text-foreground/70 mb-1">
                              Font Size
                            </p>
                            <div className="flex gap-1">
                              <button
                                onClick={() => changeFontSize("small")}
                                className={`px-2 py-1 text-xs rounded ${
                                  fontSize === "small"
                                    ? "bg-blue-100 dark:bg-blue-900/30"
                                    : "bg-foreground/5 hover:bg-foreground/10"
                                }`}
                              >
                                Small
                              </button>
                              <button
                                onClick={() => changeFontSize("normal")}
                                className={`px-2 py-1 text-xs rounded ${
                                  fontSize === "normal"
                                    ? "bg-blue-100 dark:bg-blue-900/30"
                                    : "bg-foreground/5 hover:bg-foreground/10"
                                }`}
                              >
                                Normal
                              </button>
                              <button
                                onClick={() => changeFontSize("large")}
                                className={`px-2 py-1 text-xs rounded ${
                                  fontSize === "large"
                                    ? "bg-blue-100 dark:bg-blue-900/30"
                                    : "bg-foreground/5 hover:bg-foreground/10"
                                }`}
                              >
                                Large
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={clearChatHistory}
                            className="flex items-center gap-2 w-full px-3 py-2 text-xs hover:bg-foreground/5 transition-colors text-left text-red-500"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-500" />
                            <span>Clear Chat History</span>
                          </button>
                          <button
                            onClick={() => setShowSettingsMenu(false)}
                            className="flex items-center gap-2 w-full px-3 py-2 text-xs hover:bg-foreground/5 transition-colors text-left"
                          >
                            <RefreshCw className="w-3.5 h-3.5 text-foreground/70" />
                            <span>Refresh Chat</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-foreground dark:text-foreground hover:bg-foreground/10 dark:hover:bg-foreground/10"
                  onClick={toggleChat}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="w-full h-px bg-foreground/10 dark:bg-foreground/10"></div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {/* Pinned Message */}
              {pinnedMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="sticky top-0 z-10 bg-background/95 dark:bg-background/95 backdrop-blur-sm border-l-4 border-blue-500 shadow-sm rounded-md mb-3"
                >
                  <div className="flex items-center justify-between p-2 bg-blue-50/50 dark:bg-blue-900/20 rounded-t-md">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 dark:bg-blue-800 p-1 rounded-full">
                        <Pin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-300" />
                      </div>
                      <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                        Pinned Message
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-blue-700/70 dark:text-blue-300/70 hover:bg-blue-100 dark:hover:bg-blue-800/30"
                      onClick={handleUnpinMessage}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="p-2">
                    <div
                      className={`rounded-md p-2 text-xs ${
                        pinnedMessage.isUser
                          ? "bg-blue-700/10 text-foreground dark:bg-blue-700/10 dark:text-foreground"
                          : "bg-foreground/5 dark:bg-foreground/5"
                      }`}
                    >
                      {pinnedMessage.text ||
                        (pinnedMessage.type === "image"
                          ? "📷 Image"
                          : pinnedMessage.type === "file"
                            ? "📎 File"
                            : pinnedMessage.type === "code"
                              ? "💻 Code"
                              : pinnedMessage.type === "poll"
                                ? "📊 Poll"
                                : pinnedMessage.type === "product"
                                  ? "🛍️ Product"
                                  : pinnedMessage.type === "audio"
                                    ? "🎵 Audio"
                                    : pinnedMessage.type === "reminder"
                                      ? "⏰ Reminder: " +
                                        (pinnedMessage.reminder?.title ||
                                          "Reminder")
                                      : pinnedMessage.type === "gif"
                                        ? "🎞️ GIF"
                                        : "Message")}
                    </div>
                    <div className="flex justify-end mt-1">
                      <button
                        onClick={() => {
                          // Scroll to the original message
                          const messageElement = document.getElementById(
                            `msg-${pinnedMessage.id}`
                          );
                          if (messageElement) {
                            messageElement.scrollIntoView({
                              behavior: "smooth",
                            });
                            // Highlight the message briefly
                            messageElement.classList.add("highlight-message");
                            setTimeout(() => {
                              messageElement.classList.remove(
                                "highlight-message"
                              );
                            }, 2000);
                          }
                        }}
                        className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Jump to message
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
              {renderMessageGroups()}
              <div ref={messagesEndRef} />
            </div>

            <div className="w-full h-px bg-foreground/10 dark:bg-foreground/10"></div>

            {/* Reply indicator */}
            {replyingTo && (
              <div className="px-3 pt-2">
                <div className="flex items-center justify-between bg-foreground/5 dark:bg-foreground/5 rounded-t-md p-2 border-l-2 border-blue-500">
                  <div className="flex items-center gap-1">
                    <Reply className="w-3.5 h-3.5 text-foreground/70" />
                    <span className="text-xs text-foreground/70">
                      Replying to{" "}
                      {replyingTo.isUser ? "yourself" : "AI Assistant"}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 text-foreground/70 hover:bg-foreground/10"
                    onClick={cancelReply}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 pt-0">
              <div className="flex items-center gap-2">
                {/* Attach button outside input */}
                <Button
                  ref={attachButtonRef}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full flex-shrink-0"
                  onClick={toggleAttachMenu}
                >
                  <Plus className="h-4 w-4" />
                </Button>

                {/* Attach menu dropdown */}
                <AnimatePresence>
                  {showAttachMenu && (
                    <motion.div
                      ref={attachMenuRef}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-[60px] left-3 bg-background dark:bg-background shadow-lg rounded-lg overflow-hidden z-20 border border-foreground/10 dark:border-foreground/10"
                    >
                      <div className="py-1">
                        <button
                          onClick={handleAttachImage}
                          className="flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-foreground/5 transition-colors text-left"
                        >
                          <ImageIcon className="w-3.5 h-3.5 text-foreground/70" />
                          <span>Image</span>
                        </button>
                        <button
                          onClick={handleAttachFile}
                          className="flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-foreground/5 transition-colors text-left"
                        >
                          <FileText className="w-3.5 h-3.5 text-foreground/70" />
                          <span>File</span>
                        </button>
                        <button
                          onClick={handleAttachUrl}
                          className="flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-foreground/5 transition-colors text-left"
                        >
                          <LinkIcon className="w-3.5 h-3.5 text-foreground/70" />
                          <span>URL</span>
                        </button>
                        <button
                          onClick={handleAttachCode}
                          className="flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-foreground/5 transition-colors text-left"
                        >
                          <Code className="w-3.5 h-3.5 text-foreground/70" />
                          <span>Code</span>
                        </button>
                        <button
                          onClick={handleAttachPoll}
                          className="flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-foreground/5 transition-colors text-left"
                        >
                          <BarChart3 className="w-3.5 h-3.5 text-foreground/70" />
                          <span>Poll</span>
                        </button>
                        <button
                          onClick={handleAttachProduct}
                          className="flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-foreground/5 transition-colors text-left"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-foreground/70" />
                          <span>Product</span>
                        </button>
                        <button
                          onClick={handleAttachGif}
                          className="flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-foreground/5 transition-colors text-left"
                        >
                          <ImageIcon className="w-3.5 h-3.5 text-foreground/70" />
                          <span>GIF</span>
                        </button>
                        <button
                          onClick={handleAttachAudio}
                          className="flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-foreground/5 transition-colors text-left"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-foreground/70" />
                          <span>Audio</span>
                        </button>
                        <button
                          onClick={handleAttachReminder}
                          className="flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-foreground/5 transition-colors text-left"
                        >
                          <Clock className="w-3.5 h-3.5 text-foreground/70" />
                          <span>Reminder</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Input with send button inside */}
                <div className="relative flex-1">
                  <Textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={
                      replyingTo ? "Type your reply..." : "Type your message..."
                    }
                    className={`min-h-[40px] max-h-[120px] resize-none py-2 pr-10 bg-foreground/5 dark:bg-foreground/5 border-0 focus-visible:ring-1 focus-visible:ring-foreground/20 ${
                      isExpanded ? "text-sm" : "text-xs"
                    } ${replyingTo ? "rounded-t-none" : ""} overflow-hidden`}
                    rows={1}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-foreground/10 hover:bg-foreground/20 disabled:opacity-50 disabled:hover:bg-foreground/10 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5 text-foreground" />
                  </button>
                </div>
              </div>

              <p className="text-[10px] text-foreground/50 dark:text-foreground/50 mt-1.5 text-center">
                Powered by PlannerAI Assistant
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Article Viewer Popup */}
      <AnimatePresence>
        {articleViewerOpen && currentArticle && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => {
            if (!isEditingArticle) {
              setArticleViewerOpen(false)
              setCurrentArticle(null)
            }
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-background dark:bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-background dark:bg-background border-b border-foreground/10 dark:border-foreground/10 p-4 flex justify-between items-center">
                <h3 className="font-bold text-lg">
                  {isEditingArticle ? "Edit Article" : "Article"}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => {
                    setArticleViewerOpen(false)
                    setCurrentArticle(null)
                    setIsEditingArticle(false)
                    setEditedArticle(null)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-4">
                {isEditingArticle && editedArticle ? (
                  <div className="space-y-4">
                    {/* Cover Image URL */}
                    <div>
                      <label className="block text-sm font-medium mb-1">Cover Image URL</label>
                      <input
                        type="text"
                        value={editedArticle.coverImage || ""}
                        onChange={(e) => handleArticleInputChange("coverImage", e.target.value)}
                        className="w-full p-2 border border-foreground/20 dark:border-foreground/20 rounded-md bg-background dark:bg-background"
                      />
                    </div>

                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <input
                        type="text"
                        value={editedArticle.title}
                        onChange={(e) => handleArticleInputChange("title", e.target.value)}
                        className="w-full p-2 border border-foreground/20 dark:border-foreground/20 rounded-md bg-background dark:bg-background"
                      />
                    </div>

                    {/* Author & Publish Date */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Author</label>
                        <input
                          type="text"
                          value={editedArticle.author || ""}
                          onChange={(e) => handleArticleInputChange("author", e.target.value)}
                          className="w-full p-2 border border-foreground/20 dark:border-foreground/20 rounded-md bg-background dark:bg-background"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Publish Date</label>
                        <input
                          type="text"
                          value={editedArticle.publishDate || ""}
                          onChange={(e) => handleArticleInputChange("publishDate", e.target.value)}
                          className="w-full p-2 border border-foreground/20 dark:border-foreground/20 rounded-md bg-background dark:bg-background"
                        />
                      </div>
                    </div>

                    {/* Reading Time & Tags */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Reading Time</label>
                        <input
                          type="text"
                          value={editedArticle.readingTime || ""}
                          onChange={(e) => handleArticleInputChange("readingTime", e.target.value)}
                          className="w-full p-2 border border-foreground/20 dark:border-foreground/20 rounded-md bg-background dark:bg-background"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                        <input
                          type="text"
                          value={editedArticle.tags?.join(", ") || ""}
                          onChange={(e) => {
                            const tagsString = e.target.value;
                            const tagsArray = tagsString.split(",").map(tag => tag.trim()).filter(tag => tag !== "");
                            handleArticleInputChange("tags", tagsArray as any);
                          }}
                          className="w-full p-2 border border-foreground/20 dark:border-foreground/20 rounded-md bg-background dark:bg-background"
                        />
                      </div>
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className="block text-sm font-medium mb-1">Excerpt</label>
                      <textarea
                        value={editedArticle.excerpt}
                        onChange={(e) => handleArticleInputChange("excerpt", e.target.value)}
                        className="w-full p-2 border border-foreground/20 dark:border-foreground/20 rounded-md bg-background dark:bg-background min-h-[80px]"
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <label className="block text-sm font-medium mb-1">Content</label>
                      <textarea
                        value={editedArticle.content}
                        onChange={(e) => handleArticleInputChange("content", e.target.value)}
                        className="w-full p-2 border border-foreground/20 dark:border-foreground/20 rounded-md bg-background dark:bg-background min-h-[200px]"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2 pt-4">
                      <Button variant="outline" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveArticle}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Article View Mode */}
                    {currentArticle.coverImage && (
                      <div className="mb-4">
                        <img
                          src={currentArticle.coverImage || "/placeholder.svg"}
                          alt={currentArticle.title}
                          className="w-full h-[200px] object-cover rounded-lg"
                        />
                      </div>
                    )}

                    <h1 className="text-2xl font-bold mb-2">{currentArticle.title}</h1>

                    <div className="flex flex-wrap items-center gap-2 text-sm text-foreground/70 mb-4">
                      {currentArticle.author && (
                        <span className="font-medium">{currentArticle.author}</span>
                      )}
                      {currentArticle.author && currentArticle.publishDate && (
                        <span>•</span>
                      )}
                      {currentArticle.publishDate && (
                        <span>{currentArticle.publishDate}</span>
                      )}
                      {currentArticle.readingTime && (
                        <>
                          <span>•</span>
                          <span>{currentArticle.readingTime}</span>
                        </>
                      )}
                    </div>

                    {currentArticle.tags && currentArticle.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {currentArticle.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-foreground/5 text-foreground/70 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="prose dark:prose-invert max-w-none">
                      {currentArticle.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">{paragraph}</p>
                      ))}
                    </div>

                    {/* Edit button for user's own articles */}
                    <div className="flex justify-between mt-6 pt-4 border-t border-foreground/10">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setArticleViewerOpen(false)
                          setCurrentArticle(null)
                        }}
                      >
                        Close
                      </Button>
                      
                      {/* Only show edit button if the user is the author */}
                      {currentArticle && (
                        <Button
                          variant="default"
                          onClick={handleEditArticle}
                          className={currentArticle.author === "You" || currentArticle.author === "you" || !currentArticle.author ? "" : "hidden"}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Article
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Image Viewer */}
      <AnimatePresence>
        {imageViewerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <button
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                onClick={() => setImageViewerOpen(false)}
              >
                <XIcon className="w-5 h-5" />
              </button>

              {currentImageSet.length > 1 && (
                <>
                  <button
                    className="absolute left-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    className="absolute right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <img
                src={currentImage || "/placeholder.svg"}
                alt="Enlarged view"
                className="max-w-[90%] max-h-[90vh] object-contain"
              />

              {currentImageSet.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
                  {currentImageSet.map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-white/50"
                    ></div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
