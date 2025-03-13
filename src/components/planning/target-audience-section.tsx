import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target } from "lucide-react";
import projectData from "@/data/project-data";
import { ImproveAIButton } from "./improve-ai-button";

export function TargetAudienceSection() {
  const { users, painPoints } = projectData.targetAudience;

  return (
    <Card className="cute-card border-purple-200 overflow-visible group relative">
      <ImproveAIButton sectionName="Người dùng" sectionType="targetAudience" />
      <CardHeader className="cute-header bg-purple-100 border-purple-200">
        <CardTitle className="flex items-center text-purple-600">
          <div className="bg-white p-2 rounded-full shadow-sm mr-3">
            <Users className="h-5 w-5 text-purple-500" />
          </div>
          Target Audience
        </CardTitle>
      </CardHeader>
      <CardContent className="cute-content pt-4">
        <div>
          <h3 className="font-medium text-purple-600 flex items-center">
            <Users className="mr-2 h-4 w-4 text-purple-500" />
            Users
          </h3>
          <ul className="mt-3 space-y-2">
            {users.map((user, index) => (
              <li key={index} className="cute-list-item">
                <span className="cute-list-marker bg-purple-400"></span>
                <span className="bg-purple-100 px-3 py-1 rounded-full text-purple-700">
                  {user}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="font-medium text-red-600 flex items-center">
            <Target className="mr-2 h-4 w-4 text-red-500" />
            Pain Points
          </h3>
          <ul className="mt-3 space-y-2">
            {painPoints.map((point, index) => (
              <li key={index} className="cute-list-item">
                <span className="cute-list-marker bg-red-400"></span>
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
