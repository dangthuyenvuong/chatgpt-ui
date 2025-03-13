import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Lightbulb } from "lucide-react";
import projectData from "@/data/project-data";
import { ImproveAIButton } from "./improve-ai-button";

export function ProblemSolutionSection() {
  const { problem, solution } = projectData.problemSolution;

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="cute-card border-red-200 overflow-visible group relative">
        <ImproveAIButton sectionName="Vấn đề" sectionType="problem" />
        <CardHeader className="cute-header bg-red-100 border-red-200">
          <CardTitle className="flex items-center text-red-600">
            <div className="bg-white p-2 rounded-full shadow-sm mr-3">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            Problem
          </CardTitle>
        </CardHeader>
        <CardContent className="cute-content pt-4">
          <p className="text-gray-700">{problem.description}</p>
        </CardContent>
      </Card>

      <Card className="cute-card border-green-200 overflow-visible group relative">
        <ImproveAIButton sectionName="Giải pháp" sectionType="solution" />
        <CardHeader className="cute-header bg-green-100 border-green-200">
          <CardTitle className="flex items-center text-green-600">
            <div className="bg-white p-2 rounded-full shadow-sm mr-3">
              <Lightbulb className="h-5 w-5 text-green-500" />
            </div>
            Solution
          </CardTitle>
        </CardHeader>
        <CardContent className="cute-content pt-4">
          <p className="text-gray-700">{solution.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
