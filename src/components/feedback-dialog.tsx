"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

interface FeedbackDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FeedbackDialog({ open, onOpenChange }: FeedbackDialogProps) {
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState<number | null>(null)
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)

  const handleSubmit = () => {
    // In a real app, this would send the feedback to a server
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!",
    })
    setFeedback("")
    setRating(null)
    onOpenChange(false)
  }

  const handleCancel = () => {
    setFeedback("")
    setRating(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Leave Feedback</DialogTitle>
          <DialogDescription>
            We'd love to hear what went well or how we can improve the product experience.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts about PlannerAI..."
            className="min-h-[120px]"
          />
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-6 w-6 cursor-pointer transition-colors ${
                  (hoveredRating !== null ? star <= hoveredRating : star <= (rating || 0))
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(null)}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!feedback.trim() || rating === null}>
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

