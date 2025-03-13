import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ArrowUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import projectData from "@/data/project-data";
import { ImproveAIButton } from "./improve-ai-button";

export function UspSection() {
  const { differentiators, comparison } = projectData.usp;

  return (
    <Card className="cute-card border-amber-200 overflow-visible group relative">
      <ImproveAIButton
        sectionName="Điểm độc đáo (USP)"
        sectionType="usp"
      />
      <CardHeader className="cute-header bg-amber-100 border-amber-200">
        <CardTitle className="flex items-center text-amber-600">
          <div className="bg-white p-2 rounded-full shadow-sm mr-3">
            <Star className="h-5 w-5 text-amber-500" />
          </div>
          Điểm độc đáo (USP)
        </CardTitle>
      </CardHeader>
      <CardContent className="cute-content pt-4">
        <div>
          <h3 className="font-medium text-amber-600 inline-block bg-amber-100 px-4 py-1 rounded-full mb-4">
            Điểm khác biệt
          </h3>
          <ul className="mt-4 space-y-3 grid grid-cols-1 @md:grid-cols-2 gap-4">
            {differentiators.map((item, index) => (
              <li
                key={index}
                className="flex items-start bg-white p-3 rounded-2xl border-2 border-amber-200 shadow-sm"
              >
                <span className="h-6 w-6 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <Star className="h-4 w-4" />
                </span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="font-medium text-amber-600 items-center mb-4 inline-flex bg-amber-100 px-4 py-1 rounded-full">
            <ArrowUpDown className="mr-2 h-4 w-4 text-amber-500" />
            So sánh với đối thủ
          </h3>

          <div className="overflow-x-auto mt-4">
            <Table className="rounded-2xl border-2 border-amber-200 overflow-hidden">
              <TableHeader className="bg-amber-100">
                <TableRow>
                  <TableHead className="w-[150px] text-amber-700">
                    Công cụ
                  </TableHead>
                  <TableHead className="text-amber-700">Điểm mạnh</TableHead>
                  <TableHead className="text-amber-700">Điểm yếu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparison.map((item, index) => (
                  <TableRow
                    key={index}
                    className={
                      index === comparison.length - 1
                        ? "bg-amber-50"
                        : "hover:bg-amber-50"
                    }
                  >
                    <TableCell className="font-medium">{item.tool}</TableCell>
                    <TableCell>{item.strengths}</TableCell>
                    <TableCell>{item.weaknesses}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
