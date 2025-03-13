import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, AlertTriangle } from "lucide-react";
import projectData from "@/data/project-data";
import { ImproveAIButton } from "./improve-ai-button";

export function CostRisksSection() {
  const { costs, risks } = projectData.costRisks;

  return (
    <Card className="cute-card border-orange-200 overflow-visible group relative">
      <ImproveAIButton sectionName="Chi phí & Rủi ro" sectionType="costRisks" />
      <CardHeader className="cute-header bg-orange-100 border-orange-200">
        <CardTitle className="flex items-center text-orange-600">
          <div className="bg-white p-2 rounded-full shadow-sm mr-3">
            <DollarSign className="h-5 w-5 text-orange-500" />
          </div>
          Chi phí & Rủi ro
        </CardTitle>
      </CardHeader>
      <CardContent className="cute-content pt-4">
        <div className="bg-white rounded-2xl p-5 border-2 border-orange-200 shadow-sm mb-6">
          <h3 className="font-medium text-orange-600  items-center mb-4 inline-flex bg-orange-100 px-4 py-1 rounded-full">
            <DollarSign className="mr-2 h-4 w-4 text-orange-500" />
            Chi phí
          </h3>
          <div className="mt-4 space-y-3">
            {costs.map((cost, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 rounded-xl bg-orange-50 border border-orange-100"
              >
                <span className="flex items-center text-gray-700">
                  <span className="mr-2 text-xl">{cost.icon}</span>
                  {cost.category}
                </span>
                <span className="font-medium text-orange-600 bg-white px-3 py-1 rounded-full border border-orange-200">
                  {cost.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border-2 border-red-200 shadow-sm">
          <h3 className="font-medium text-red-600  items-center mb-4 inline-flex bg-red-100 px-4 py-1 rounded-full">
            <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
            Rủi ro
          </h3>
          <ul className="mt-4 space-y-2">
            {risks.map((risk, index) => (
              <li
                key={index}
                className="flex items-center p-3 rounded-xl bg-red-50 border border-red-100 text-gray-700"
              >
                <span className="h-5 w-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center mr-3 flex-shrink-0">
                  {index + 1}
                </span>
                {risk}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
