"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Check, Copy, Globe, Link, Link2, Lock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ShareOption = "private" | "unlisted" | "public";

export function ShareDialog({ open, onOpenChange }: ShareDialogProps) {
  const [shareOption, setShareOption] = useState<ShareOption>("private");
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    // Giả lập URL chia sẻ
    const shareUrl = `https://plannerai.app/share/${Math.random().toString(36).substring(2, 10)}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      toast({
        title: "Link copied",
        description: "Share link has been copied to clipboard",
      });

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-[#1a1a1a] text-white border-gray-800">
        <DialogHeader>
          <DialogTitle>Share Chat</DialogTitle>
          <p className="text-sm text-gray-400 mb-4">
            Configure who has access to this chat.
          </p>
        </DialogHeader>
        <div className="">
          <Select
            value={shareOption}
            onValueChange={(value) => setShareOption(value as ShareOption)}
          >
            <SelectTrigger className="w-full bg-[#212121] cursor-pointer hover:bg-secondary">
              <SelectValue placeholder="Select visibility" />
            </SelectTrigger>
            <SelectContent className="bg-[#212121]">
              <SelectItem
                value="private"
                className="focus:bg-[#2a2a2a] focus:text-white py-2 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-blue-400" />
                  <div className="flex flex-col items-start">
                    <span>Private</span>
                    <span className="text-xs text-gray-400">
                      Only you can see this chat
                    </span>
                  </div>
                </div>
              </SelectItem>
              <SelectItem
                value="unlisted"
                className="focus:bg-[#2a2a2a] focus:text-white py-2 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-yellow-400" />
                  <div className="flex flex-col items-start">
                    <span>Unlisted</span>
                    <span className="text-xs text-gray-400">
                      Only people with the link can see this chat
                    </span>
                  </div>
                </div>
              </SelectItem>
              <SelectItem
                value="public"
                className="focus:bg-[#2a2a2a] focus:text-white py-2 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-green-400" />
                  <div className="flex flex-col items-start">
                    <span>Public</span>
                    <span className="text-xs text-gray-400">
                      Anyone can see and interact with this chat
                    </span>
                  </div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          {/* <div className="mt-4 p-3 rounded-md bg-[#212121] border border-gray-700">
            {shareOption === "private" && (
              <div className="flex items-start gap-2">
                <Lock className="h-4 w-4 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Private</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Only you can access this chat. This is the default setting for all chats.
                  </p>
                </div>
              </div>
            )}

            {shareOption === "unlisted" && (
              <div className="flex items-start gap-2">
                <Link2 className="h-4 w-4 text-yellow-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Unlisted</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Anyone with the link can view this chat, but it won't be listed publicly.
                  </p>
                </div>
              </div>
            )}

            {shareOption === "public" && (
              <div className="flex items-start gap-2">
                <Globe className="h-4 w-4 text-green-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Public</p>
                  <p className="text-xs text-gray-400 mt-1">
                    This chat will be visible to everyone and may be featured on the explore page.
                  </p>
                </div>
              </div>
            )}
          </div> */}
        </div>
        <DialogFooter className="flex flex-row">
          <Button
            size="sm"
            variant="outline"
            className="gap-2"
            onClick={handleCopyLink}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Link className="h-4 w-4" />
            )}
            {copied ? "Copied" : "Copy Link"}
          </Button>
          <Button size="sm" onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
