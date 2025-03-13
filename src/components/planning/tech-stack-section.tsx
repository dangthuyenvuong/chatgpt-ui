import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code } from "lucide-react";
import projectData from "@/data/project-data";
import { ImproveAIButton } from "./improve-ai-button";

export function TechStackSection() {
  const { items } = projectData.techStack;

  return (
    <Card className="cute-card border-cyan-200 overflow-visible group relative">
      <ImproveAIButton sectionName="Công nghệ sử dụng" sectionType="techStack" />
      <CardHeader className="cute-header bg-cyan-100 border-cyan-200">
        <CardTitle className="flex items-center text-cyan-600">
          <div className="bg-white p-2 rounded-full shadow-sm mr-3">
            <Code className="h-5 w-5 text-cyan-500" />
          </div>
          Tech Stack
        </CardTitle>
      </CardHeader>
      <CardContent className="cute-content pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex items-center p-4 rounded-2xl border-2 ${item.color} shadow-sm hover:shadow-md transition-all duration-300`}
            >
              <div className="text-2xl mr-3">{item.icon}</div>
              <div>
                <div className="text-sm font-medium text-gray-500">
                  {item.category}
                </div>
                <div className="mt-1 font-semibold">{item.tech}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
