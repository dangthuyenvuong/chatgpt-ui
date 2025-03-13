"use client";

import { useState } from "react";
import { Github, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<{
    google: boolean;
    github: boolean;
  }>({
    google: false,
    github: false,
  });

  const handleGoogleLogin = async () => {
    setIsLoading({ ...isLoading, google: true });

    // Simulate authentication delay
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // In a real app, this would redirect to Google OAuth
      window.location.href = "/";
    } catch (error) {
      toast({
        title: "Authentication error",
        description: "Could not authenticate with Google. Please try again.",
        variant: "destructive",
      });
      setIsLoading({ ...isLoading, google: false });
    }
  };

  const handleGithubLogin = async () => {
    setIsLoading({ ...isLoading, github: true });

    // Simulate authentication delay
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // In a real app, this would redirect to GitHub OAuth
      window.location.href = "/";
    } catch (error) {
      toast({
        title: "Authentication error",
        description: "Could not authenticate with GitHub. Please try again.",
        variant: "destructive",
      });
      setIsLoading({ ...isLoading, github: false });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and app name */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12  items-center justify-center rounded-full bg-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-black"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.29 7 12 12 20.71 7" />
              <line x1="12" y1="22" x2="12" y2="12" />
            </svg>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-white">PlannerAI</h1>
          <p className="mt-1 text-sm text-gray-400">
            Your personal AI assistant
          </p>
        </div>

        <Card className="border-0 bg-[#1a1a1a] text-white shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Choose your preferred sign in method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full border-gray-700 bg-[#212121] hover:bg-[#2a2a2a] text-white"
              onClick={handleGoogleLogin}
              disabled={isLoading.google || isLoading.github}
            >
              {isLoading.google ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="mr-2 h-4 w-4"
                >
                  <path
                    fill="#EA4335"
                    d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1272727,9.90909091 L12,9.90909091 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                  />
                </svg>
              )}
              Sign in with Google
            </Button>

            <Button
              variant="outline"
              className="w-full border-gray-700 bg-[#212121] hover:bg-[#2a2a2a] text-white"
              onClick={handleGithubLogin}
              disabled={isLoading.google || isLoading.github}
            >
              {isLoading.github ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Github className="mr-2 h-4 w-4" />
              )}
              Sign in with GitHub
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-gray-400">
              By signing in, you agree to our{" "}
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </div>
          </CardFooter>
        </Card>

        <div className="text-center text-sm text-gray-400">
          Need help?{" "}
          <Link to="/contact" className="text-primary hover:underline">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
