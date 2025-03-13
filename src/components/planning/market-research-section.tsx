import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users } from "lucide-react";
import projectData from "@/data/project-data";
import { ImproveAIButton } from "./improve-ai-button";

export function MarketResearchSection() {
  const { marketSize, competitors, competitiveAdvantage } =
    projectData.marketResearch;

  return (
    <Card className="cute-card border-blue-200 overflow-visible group relative">
      <ImproveAIButton sectionName="Nghiên cứu thị trường" sectionType="marketResearch" />
      <CardHeader className="cute-header bg-blue-100 border-blue-200">
        <CardTitle className="flex items-center text-blue-600">
          <div className="bg-white p-2 rounded-full shadow-sm mr-3">
            <BarChart3 className="h-5 w-5 text-blue-500" />
          </div>
          Nghiên cứu thị trường
        </CardTitle>
      </CardHeader>
      <CardContent className="cute-content pt-4">
        <div className="grid grid-cols-1 @md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-5 border-2 border-blue-200 shadow-sm">
            <h3 className="font-medium text-blue-600 flex items-center">
              <Users className="mr-2 h-4 w-4 text-blue-500" />
              Quy mô thị trường
            </h3>
            <p className="mt-3 text-gray-700 bg-blue-50 p-3 rounded-xl">
              {marketSize}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border-2 border-blue-200 shadow-sm">
            <h3 className="font-medium text-blue-600">Đối thủ cạnh tranh</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {competitors.map((competitor, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border-2 ${competitor.color}`}
                >
                  {competitor.name}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border-2 border-blue-200 shadow-sm">
            <h3 className="font-medium text-blue-600">Lợi thế cạnh tranh</h3>
            <p className="mt-3 text-gray-700 bg-blue-50 p-3 rounded-xl">
              {competitiveAdvantage}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
