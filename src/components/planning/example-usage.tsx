"use client"

import { useState } from "react"
import projectData from "@/data/project-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ExampleUsage() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

  const sections = [
    { id: "project", label: "Thông tin dự án" },
    { id: "problemSolution", label: "Vấn đề & Giải pháp" },
    { id: "targetAudience", label: "Đối tượng mục tiêu" },
    { id: "businessModel", label: "Mô hình kinh doanh" },
    { id: "marketResearch", label: "Nghiên cứu thị trường" },
    { id: "usp", label: "Điểm độc đáo (USP)" },
    { id: "marketingStrategy", label: "Chiến lược marketing" },
    { id: "mvpPlan", label: "Kế hoạch MVP" },
    { id: "techStack", label: "Tech Stack" },
    { id: "costRisks", label: "Chi phí & Rủi ro" },
    { id: "projectEvaluation", label: "Đánh giá dự án" },
  ]

  const renderSectionData = () => {
    if (!selectedSection) return null

    const data = projectData[selectedSection as keyof typeof projectData]

    return (
      <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200 overflow-auto max-h-96">
        <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
      </div>
    )
  }

  return (
    <Card className="cute-card border-blue-200 overflow-visible">
      <CardHeader className="cute-header bg-blue-100 border-blue-200">
        <CardTitle className="flex items-center text-blue-600">Ví dụ sử dụng TypeScript Data Structure</CardTitle>
      </CardHeader>
      <CardContent className="cute-content pt-4">
        <div>
          <p className="mb-4 text-gray-700">
            Dưới đây là ví dụ về cách truy cập dữ liệu từ cấu trúc TypeScript đã định nghĩa. Chọn một phần để xem dữ
            liệu JSON tương ứng.
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={selectedSection === section.id ? "default" : "outline"}
                className="rounded-full text-sm"
                onClick={() => setSelectedSection(section.id)}
              >
                {section.label}
              </Button>
            ))}
          </div>

          {renderSectionData()}

          <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-2">Cách sử dụng trong code:</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
                {`// Import dữ liệu
import projectData from "@/data/project-data";

// Truy cập thông tin dự án
const projectName = projectData.project.name;
console.log(projectName); // "AI MVP Planner"

// Truy cập danh sách tính năng
const features = projectData.mvpPlan.features;
features.forEach(feature => {
  console.log(\`- \${feature.name}: \${feature.description}\`);
});

// Truy cập thông tin pricing
const pricingTiers = projectData.businessModel.pricing;
const proTier = pricingTiers.find(tier => tier.name === "Pro");
console.log(proTier?.price); // "$19/tháng"`}
              </pre>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

