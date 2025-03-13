"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogClose, DialogContent, DialogOverlay } from "@/ui/dialog";

interface ImproveAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionName: string;
  sectionType: string;
}

// Suggestions for different section types
const SUGGESTIONS = {
  problem: [
    "Thêm dữ liệu thống kê về vấn đề này",
    "Mô tả chi tiết hơn về tác động của vấn đề",
    "Thêm ví dụ cụ thể về vấn đề",
    "Phân tích sâu hơn về nguyên nhân của vấn đề",
  ],
  solution: [
    "Thêm chi tiết về cách giải pháp hoạt động",
    "Mô tả lợi ích cụ thể của giải pháp",
    "So sánh với các giải pháp hiện có",
    "Thêm ví dụ về cách người dùng sẽ sử dụng giải pháp",
  ],
  targetAudience: [
    "Thêm thông tin nhân khẩu học chi tiết hơn",
    "Mô tả hành vi người dùng cụ thể",
    "Thêm insight từ nghiên cứu người dùng",
    "Phân tích nhu cầu chưa được đáp ứng",
  ],
  businessModel: [
    "Thêm chi tiết về cấu trúc giá",
    "Phân tích LTV và CAC",
    "Mô tả chiến lược tăng trưởng",
    "Thêm thông tin về kênh doanh thu",
  ],
  marketResearch: [
    "Thêm dữ liệu thị trường cụ thể",
    "Phân tích sâu hơn về đối thủ cạnh tranh",
    "Thêm xu hướng thị trường mới nhất",
    "Phân tích cơ hội thị trường",
  ],
  usp: [
    "Làm rõ hơn về điểm khác biệt",
    "Thêm bằng chứng hỗ trợ cho USP",
    "So sánh chi tiết hơn với đối thủ",
    "Thêm phản hồi của người dùng về USP",
  ],
  marketingStrategy: [
    "Thêm chi tiết về chiến lược tiếp thị",
    "Phân tích ROI cho từng kênh",
    "Thêm ý tưởng nội dung cụ thể",
    "Mô tả chiến dịch quảng cáo",
  ],
  mvpPlan: [
    "Thêm chi tiết về các tính năng",
    "Phân tích ưu tiên tính năng",
    "Thêm thông tin về quy trình phát triển",
    "Mô tả KPI cho MVP",
  ],
  techStack: [
    "Thêm lý do chọn công nghệ này",
    "Phân tích ưu/nhược điểm của stack",
    "Thêm thông tin về khả năng mở rộng",
    "Mô tả kiến trúc kỹ thuật chi tiết hơn",
  ],
  costRisks: [
    "Thêm chi tiết về cấu trúc chi phí",
    "Phân tích rủi ro chi tiết hơn",
    "Thêm chiến lược giảm thiểu rủi ro",
    "Mô tả kế hoạch dự phòng",
  ],
  projectEvaluation: [
    "Thêm KPI cụ thể để đánh giá",
    "Phân tích SWOT chi tiết hơn",
    "Thêm thông tin về điểm hòa vốn",
    "Mô tả các mốc thành công",
  ],
  default: [
    "Thêm chi tiết cụ thể hơn",
    "Bổ sung dữ liệu hỗ trợ",
    "Thêm ví dụ thực tế",
    "Phân tích sâu hơn về chủ đề này",
  ],
};

export function ImproveAIModal({
  isOpen,
  onClose,
  sectionName,
  sectionType,
}: ImproveAIModalProps) {
  const [input, setInput] = useState("");
  const [mounted, setMounted] = useState(false);

  // Get suggestions based on section type
  const suggestions =
    SUGGESTIONS[sectionType as keyof typeof SUGGESTIONS] || SUGGESTIONS.default;

  //   useEffect(() => {
  //     setMounted(true);

  //     // Prevent scrolling when modal is open
  //     if (isOpen) {
  //       document.body.style.overflow = "hidden";
  //     }

  //     return () => {
  //       document.body.style.overflow = "auto";
  //     };
  //   }, [isOpen]);

  //   if (!mounted) return null;
  //   if (!isOpen) return null;

  const handleSuggestionClick = (suggestion: string) => {
    setInput((prev) => (prev ? `${prev}\n\n${suggestion}` : suggestion));
  };

  const handleSubmit = () => {
    // Here you would handle the submission logic
    console.log("Submitting improvement for", sectionName, ":", input);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogOverlay className="backdrop-blur-md" /> */}
      <DialogContent className="sm:max-w-[600px]">
        <DialogClose>
          <button
            // onClick={() => onOpenChange(false)}
            className="cursor-pointer absolute right-2 top-2 z-10 rounded-full p-2 bg-black/20 hover:bg-black/40 transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </DialogClose>
        {/* <button
          // onClick={() => onOpenChange(false)}
          className="cursor-pointer absolute right-4 top-4 z-10 rounded-full p-2 bg-black/20 hover:bg-black/40 transition-colors"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button> */}
        <div className="rounded-2xl w-full max-w-full flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Mô tả cách bạn muốn cải thiện "{sectionName}"
            </h2>
          </div>

          <div className="flex-1 overflow-auto mt-6">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nói cho tôi biết bạn cần thêm gì?"
              className="w-full h-32 p-4 text-lg rounded-xl !shadow-none bg-white/10 resize-none"
            />

            <div className="mt-6">
              <h3 className="mb-3 opacity-50 text-sm">Gợi ý:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <div className="text-left w-full text-sm">{suggestion}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t flex justify-end gap-3 rounded-b-2xl">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-6 py-2 rounded-xl border-none"
            >
              Hủy
            </Button>
            <Button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Sparkles className="h-4 w-4" /> Cải thiện với AI
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
