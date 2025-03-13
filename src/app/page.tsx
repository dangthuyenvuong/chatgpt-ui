import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  Code,
  FileText,
  Image,
  MessageSquare,
  Lightbulb,
  SendIcon,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { PricingDialog } from "@/components/pricing-dialog";

type QueryType =
  | "Research"
  | "Code"
  | "Writing"
  | "Image"
  | "Chat"
  | "Ideas"
  | null;

const socialLinks = [
  {
    name: "X",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="h-4 w-4 fill-current"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    href: "https://twitter.com",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin className="h-4 w-4" />,
    href: "https://linkedin.com",
  },
  {
    name: "Discord",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 127.14 96.36"
        className="h-4 w-4 fill-current"
      >
        <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
      </svg>
    ),
    href: "https://discord.com",
  },
];

export default function FormPage() {
  const [message, setMessage] = useState("");
  const [selectedType, setSelectedType] = useState<QueryType>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [pricingOpen, setPricingOpen] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Handle form submission logic here
    console.log("Submitted message:", message);
    console.log("Selected type:", selectedType);

    // Clear the message after submission
    setMessage("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const queryTypes = [
    {
      type: "Development Plan" as QueryType,
    //   icon: <Search className="h-3 w-3 mr-1" />,
    },
    {
      type: "Landing Page" as QueryType,
    //   icon: <Code className="h-3 w-3 mr-1" />,
    },
    {
      type: "User Feedback" as QueryType,
    //   icon: <FileText className="h-3 w-3 mr-1" />,
    },
    {
      type: "Analytics" as QueryType,
    //   icon: <Image className="h-3 w-3 mr-1" />,
    },
    {
      type: "Research" as QueryType,
    //   icon: <MessageSquare className="h-3 w-3 mr-1" />,
    },
    {
      type: "Marketing Plan" as QueryType,
    //   icon: <Lightbulb className="h-3 w-3 mr-1" />,
    },
  ];

  const footerLinks = [
    { name: "Pricing", onClick: () => setPricingOpen(true) },
    // { name: "Enterprise", href: "/enterprise" },
    // { name: "FAQ", href: "/faq" },
    { name: "Terms & Privacy", href: "/terms-privacy" },
  ];

  return (
    <>
      <div className="flex flex-col min-h-screen bg-[#212121] text-white">
        {/* Animated background gradient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="animate-blob-move absolute w-[800px] h-[800px] bg-gradient-to-r from-white/8 to-white/15 rounded-full blur-[80px] opacity-40"></div>
          <div className="animate-blob-move animation-delay-2000 absolute w-[600px] h-[600px] bg-gradient-to-r from-white/10 to-white/8 rounded-full blur-[80px] opacity-30"></div>
          <div className="animate-blob-move animation-delay-4000 absolute w-[500px] h-[500px] bg-gradient-to-r from-white/8 to-white/12 rounded-full blur-[80px] opacity-35"></div>
        </div>
        {/* Logo in top-left corner */}
        <header className="p-4 flex items-center justify-between relative z-10">
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-white"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.29 7 12 12 20.71 7" />
                <line x1="12" y1="22" x2="12" y2="12" />
              </svg>
            </div>
            <span className="font-semibold text-lg">SpaceGPT</span>
          </div>

          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </header>

        {/* Main content with centered form */}
        <main className="flex-1 flex items-center justify-center p-4 md:p-6 lg:p-8">
          <div className="text-center space-y-6 w-full max-w-lg">
            <h1 className="text-4xl font-medium">How can we help you today?</h1>
            <div className="w-full">
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {queryTypes.map((item) => (
                  <Badge
                    key={item.type}
                    variant={selectedType === item.type ? "default" : "outline"}
                    className={`cursor-pointer flex items-center text-sm ${
                      selectedType === item.type
                        ? "!bg-blue-600 text-white"
                        : "border-gray-500/50 text-white/50 hover:bg-gray-700"
                    }`}
                    onClick={() =>
                      setSelectedType(
                        selectedType === item.type ? null : item.type
                      )
                    }
                  >
                    {/* {item.icon} */}
                    {item.type}
                  </Badge>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="relative">
                <div className="relative rounded-xl bg-[#303030] shadow-md">
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={handleChange}
                    autoFocus
                    placeholder={
                      selectedType
                        ? `Ask me about ${selectedType.toLowerCase()}...`
                        : "Message AI Assistant..."
                    }
                    rows={5}
                    className="w-full text-sm resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 pr-12 py-3 px-4 outline-none overflow-y-auto"
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
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Làm dự án của bạn bằng AI
                </p>
              </form>
            </div>
          </div>
        </main>
        {/* Footer links */}
        <footer className="p-3 flex justify-end relative z-10">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href ?? ""}
                onClick={(ev) => {
                  if (link.onClick) {
                    ev.preventDefault();
                    link.onClick();
                  }
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </footer>
      </div>
      <PricingDialog open={pricingOpen} onOpenChange={setPricingOpen} />
    </>
  );
}
