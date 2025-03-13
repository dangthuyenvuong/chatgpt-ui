import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign } from "lucide-react"
import projectData from "@/data/project-data"
import { ImproveAIButton } from "./improve-ai-button"

export function BusinessModelSection() {
  const { type, pricing } = projectData.businessModel

  return (
    <Card className="cute-card border-green-200 overflow-visible group relative">
      <ImproveAIButton sectionName="Mô hình kinh doanh" sectionType="businessModel" />
      <CardHeader className="cute-header bg-green-100 border-green-200">
        <CardTitle className="flex items-center text-green-600">
          <div className="bg-white p-2 rounded-full shadow-sm mr-3">
            <DollarSign className="h-5 w-5 text-green-500" />
          </div>
          Mô hình kinh doanh
        </CardTitle>
      </CardHeader>
      <CardContent className="cute-content pt-4">
        <div className="mb-4">
          <h3 className="font-medium text-green-600 inline-block bg-green-100 px-4 py-1 rounded-full">Loại: {type}</h3>
        </div>

        <div className="grid grid-cols-1 @md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pricing.map((tier, index) => (
            <div
              key={index}
              className={`rounded-2xl p-5 border-2 ${tier.borderColor} ${tier.color} shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="bg-white rounded-full px-3 py-1 inline-block mb-2 shadow-sm">
                <h4 className={`font-semibold ${tier.textColor}`}>{tier.name}</h4>
              </div>
              <div className="mt-2 text-xl font-bold text-gray-700">{tier.price}</div>
              <div className="mt-2 text-gray-600 text-sm">{tier.features}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

