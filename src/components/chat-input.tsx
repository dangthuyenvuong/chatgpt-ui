import { Paperclip, SendIcon, Wand2 } from "lucide-react";
import { useRef } from "react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type ChatInputProps = {
  handleSubmit?: (e: React.FormEvent) => void;
  message?: string;
  setMessage?: (message: string) => void;
};

export default function ChatInput({
  handleSubmit,
  message,
  setMessage,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage?.(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, 200);
    textarea.style.height = `${newHeight}px`;
  };

  return (
    <div className="p-4 w-full">
      <div className="max-w-3xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="relative w-full">
          <div className="relative rounded-xl bg-[#303030] shadow-sm">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleChange}
              placeholder="Message AI Assistant..."
              rows={1}
              className="w-full text-sm resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 pr-12 py-3 px-4 outline-none overflow-y-auto"
              style={{
                minHeight: "44px",
                maxHeight: "200px",
              }}
            />
            <div className="flex gap-1 z-10 justify-end items-center pr-2 pb-2">
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="outline"
                    // size="icon"
                    className="h-8 w-8 flex justify-center items-center rounded-full"
                    // onClick={() => setEnhanceDialogOpen(true)}
                    title="Enhance Prompt"
                  >
                    <Wand2 className="h-4 w-4" />
                    <span className="sr-only">Enhance Prompt</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Enhance Prompt</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="outline"
                    className="h-8 w-8 flex justify-center items-center rounded-full"
                    // onClick={() => setAttachDialogOpen(true)}
                    title="Attach File"
                  >
                    <Paperclip className="h-4 w-4" />
                    <span className="sr-only">Attach File</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Attach File</TooltipContent>
              </Tooltip>
              <Button
                type="submit"
                size="icon"
                // disabled={!message.trim()}
                className="h-8 w-8 flex justify-center items-center rounded-full"
              >
                <SendIcon className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
            {/* <Button
              type="submit"
              size="icon"
              disabled={!message?.trim()}
              className="absolute bottom-2.5 right-3 h-8 w-8 rounded-full"
              onClick={(e) => {
                e.preventDefault();
                if (message?.trim()) {
                  handleSubmit?.(e);
                }
              }}
            >
              <SendIcon className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button> */}
          </div>
          {/* <p className="text-xs text-muted-foreground mt-2 text-center">
        PlannerAI có thể mắc lỗi. Hãy kiểm tra các thông tin quan trọng.
      </p> */}
        </form>
      </div>
    </div>
  );
}
