import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone, FileText } from "lucide-react";
import projectData from "@/data/project-data";
import { ImproveAIButton } from "./improve-ai-button";

export function MarketingSection() {
  const { channels, contentSeries } = projectData.marketingStrategy;

  return (
    <Card className="cute-card border-pink-200 overflow-visible group relative">
      <ImproveAIButton
        sectionName="Chiến lược marketing"
        sectionType="marketingStrategy"
      />
      <CardHeader className="cute-header bg-pink-100 border-pink-200">
        <CardTitle className="flex items-center text-pink-600">
          <div className="bg-white p-2 rounded-full shadow-sm mr-3">
            <Megaphone className="h-5 w-5 text-pink-500" />
          </div>
          Chiến lược marketing
        </CardTitle>
      </CardHeader>
      <CardContent className="cute-content pt-4">
        <div className="grid grid-cols-1 @md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-5 border-2 border-pink-200 shadow-sm">
            <h3 className="font-medium text-pink-600 flex items-center mb-4">
              <Megaphone className="mr-2 h-4 w-4 text-pink-500" />
              Kênh marketing
            </h3>
            <ul className="mt-2 space-y-2">
              {channels.map((channel, index) => (
                <li key={index} className="cute-list-item">
                  <span className="cute-list-marker bg-pink-400"></span>
                  <span className="bg-pink-100 px-3 py-1 rounded-full text-pink-700">
                    {channel}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-5 border-2 border-pink-200 shadow-sm">
            <h3 className="font-medium text-pink-600 flex items-center mb-4">
              <FileText className="mr-2 h-4 w-4 text-pink-500" />
              Series nội dung
            </h3>
            <div className="mt-2 grid grid-cols-1 gap-2">
              {contentSeries.map((content, index) => (
                <div
                  key={index}
                  className="p-2 rounded-xl bg-pink-50 border border-pink-100 text-gray-700 text-sm hover:bg-pink-100 transition-colors duration-200"
                >
                  {content}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
