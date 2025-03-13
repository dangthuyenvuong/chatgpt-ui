import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListChecks, Calendar } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import projectData from "@/data/project-data";
import { ImproveAIButton } from "./improve-ai-button";

export function MvpPlanSection() {
  const { features, timeline } = projectData.mvpPlan;

  return (
    <Card className="cute-card border-indigo-200 overflow-visible group relative">
      <ImproveAIButton
        sectionName="Kế hoạch MVP"
        sectionType="mvpPlan"
      />
      <CardHeader className="cute-header bg-indigo-100 border-indigo-200">
        <CardTitle className="flex items-center text-indigo-600">
          <div className="bg-white p-2 rounded-full shadow-sm mr-3">
            <ListChecks className="h-5 w-5 text-indigo-500" />
          </div>
          Kế hoạch MVP
        </CardTitle>
      </CardHeader>
      <CardContent className="cute-content pt-4">
        <div className="grid grid-cols-1 @md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-5 border-2 border-indigo-200 shadow-sm">
            <h3 className="font-medium text-indigo-600 items-center mb-4 inline-flex bg-indigo-100 px-4 py-1 rounded-full">
              <ListChecks className="mr-2 h-4 w-4 text-indigo-500" />
              Tính năng
            </h3>

            <Accordion type="single" collapsible className="w-full">
              {features.map((feature, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b-2 border-indigo-100"
                >
                  <AccordionTrigger className="hover:text-indigo-700 py-3">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-2 text-xs font-bold">
                        {index + 1}
                      </div>
                      {feature.name}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-indigo-50 p-3 rounded-xl mt-1 mb-2">
                    {feature.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="bg-white rounded-2xl p-5 border-2 border-indigo-200 shadow-sm">
            <h3 className="font-medium text-indigo-600 items-center mb-4 inline-flex bg-indigo-100 px-4 py-1 rounded-full">
              <Calendar className="mr-2 h-4 w-4 text-indigo-500" />
              Lộ trình
            </h3>

            <div className="relative">
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-indigo-200"></div>

              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={index} className="relative pl-8">
                    <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full bg-indigo-100 border-2 border-indigo-500 flex items-center justify-center text-xs font-bold text-indigo-700">
                      {index + 1}
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                      <div className="font-medium text-indigo-700">
                        Tuần {index + 1}
                      </div>
                      <div className="text-gray-700 text-sm mt-1">
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
