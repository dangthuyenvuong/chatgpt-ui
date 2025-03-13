import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import projectData from "@/data/project-data";
import { ImproveAIButton } from "./improve-ai-button";

export function ProjectEvaluationSection() {
  const { successProbability, points } = projectData.projectEvaluation;

  return (
    <Card className="cute-card border-violet-200 overflow-visible group relative">
      <ImproveAIButton
        sectionName="Đánh giá dự án"
        sectionType="projectEvaluation"
      />
      <CardHeader className="cute-header bg-violet-100 border-violet-200">
        <CardTitle className="flex items-center text-violet-700">
          <div className="bg-white p-2 rounded-full shadow-sm mr-3">
            <LineChart className="h-5 w-5 text-violet-500" />
          </div>
          Đánh giá dự án
        </CardTitle>
      </CardHeader>
      <CardContent className="cute-content pt-4">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-gray-900">Xác suất thành công</h3>
            <span className="font-bold text-violet-700">
              {successProbability}%
            </span>
          </div>
          <Progress
            value={successProbability}
            className="h-2 bg-violet-100"
            // indicatorClassName="bg-violet-600"
          />
          <p className="mt-2 text-sm text-gray-600">
            Nếu tiếp cận đúng đối tượng và tối ưu tính năng theo phản hồi của
            người dùng, dự án có thể thành công.
          </p>
        </div>

        <div className="space-y-6">
          {points.map((point, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
            >
              <h3 className="font-medium text-violet-700 mb-2">
                {point.title}
              </h3>
              <p className="text-gray-700">{point.content}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
