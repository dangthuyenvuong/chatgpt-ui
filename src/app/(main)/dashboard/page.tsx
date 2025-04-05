"use client";

import { useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell,
  Legend,
  PieChart,
  Pie,
  BarChart,
  Bar,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Zap,
  Brain,
  Clock,
  Star,
  BarChart3,
  ArrowUpRight,
  DollarSign,
  MessageSquare,
  ChevronRight,
  CalendarIcon,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { format, subDays, startOfMonth, startOfYear } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

// Hàm định dạng số lớn - bảo vệ khỏi undefined/null
const formatLargeNumber = (num: number | undefined | null): string => {
  if (num === undefined || num === null) {
    return "0";
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

// Dữ liệu mẫu cho biểu đồ token theo platform
const platformTokenData = [
  { name: "OpenAI", tokens: 1250000 },
  { name: "Anthropic", tokens: 850000 },
  { name: "Cohere", tokens: 450000 },
  { name: "Mistral", tokens: 650000 },
  { name: "Llama", tokens: 350000 },
];

// Dữ liệu mẫu cho AI Agents gần đây
const recentAgents = [
  {
    id: 1,
    name: "Research Assistant",
    avatar: "/placeholder.svg?height=40&width=40",
    lastUsed: "2 giờ trước",
    usageCount: 128,
    cost: 12.45,
  },
  {
    id: 2,
    name: "Code Generator",
    avatar: "/placeholder.svg?height=40&width=40",
    lastUsed: "5 giờ trước",
    usageCount: 95,
    cost: 9.32,
  },
  {
    id: 3,
    name: "Data Analyzer",
    avatar: "/placeholder.svg?height=40&width=40",
    lastUsed: "1 ngày trước",
    usageCount: 76,
    cost: 7.18,
  },
  {
    id: 4,
    name: "Content Writer",
    avatar: "/placeholder.svg?height=40&width=40",
    lastUsed: "2 ngày trước",
    usageCount: 62,
    cost: 5.87,
  },
];

// Dữ liệu mẫu cho AI Agents sử dụng nhiều nhất
const topAgents = [
  {
    id: 1,
    name: "Research Assistant",
    avatar: "/placeholder.svg?height=40&width=40",
    usageCount: 1280,
    cost: 124.5,
  },
  {
    id: 2,
    name: "Code Generator",
    avatar: "/placeholder.svg?height=40&width=40",
    usageCount: 950,
    cost: 93.2,
  },
  {
    id: 3,
    name: "Data Analyzer",
    avatar: "/placeholder.svg?height=40&width=40",
    usageCount: 760,
    cost: 71.8,
  },
  {
    id: 4,
    name: "Content Writer",
    avatar: "/placeholder.svg?height=40&width=40",
    usageCount: 620,
    cost: 58.7,
  },
  {
    id: 5,
    name: "Image Creator",
    avatar: "/placeholder.svg?height=40&width=40",
    usageCount: 580,
    cost: 55.3,
  },
];

// Dữ liệu mẫu cho biểu đồ sử dụng token theo ngày (tách input và output)
const dailyTokenUsageData = [
  { date: "01/03", inputTokens: 32000, outputTokens: 10000 },
  { date: "02/03", inputTokens: 28000, outputTokens: 10000 },
  { date: "03/03", inputTokens: 40000, outputTokens: 15000 },
  { date: "04/03", inputTokens: 35000, outputTokens: 12000 },
  { date: "05/03", inputTokens: 45000, outputTokens: 17000 },
  { date: "06/03", inputTokens: 30000, outputTokens: 11000 },
  { date: "07/03", inputTokens: 27000, outputTokens: 10000 },
  { date: "08/03", inputTokens: 33000, outputTokens: 12000 },
  { date: "09/03", inputTokens: 42000, outputTokens: 17000 },
  { date: "10/03", inputTokens: 52000, outputTokens: 20000 },
  { date: "11/03", inputTokens: 46000, outputTokens: 18000 },
  { date: "12/03", inputTokens: 35000, outputTokens: 13000 },
  { date: "13/03", inputTokens: 38000, outputTokens: 14000 },
  { date: "14/03", inputTokens: 41000, outputTokens: 16000 },
];

// Dữ liệu mẫu mở rộng cho biểu đồ token theo user (thêm nhiều user)
const userTokenData = [
  {
    name: "Alex Nguyen",
    tokens: 980000,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Minh Tran",
    tokens: 750000,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Linh Pham",
    tokens: 620000,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Huy Le",
    tokens: 580000,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Tuan Vu",
    tokens: 450000,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Thao Nguyen",
    tokens: 380000,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Khoa Phan",
    tokens: 320000,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Lan Hoang",
    tokens: 290000,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Binh Tran",
    tokens: 270000,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Huong Dao",
    tokens: 250000,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Thanh Nguyen",
    tokens: 230000,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Duc Le",
    tokens: 210000,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Mai Pham",
    tokens: 190000,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Son Tran",
    tokens: 170000,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Anh Vu",
    tokens: 150000,
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const getColorByIndex = (index: number) => {
  const colors = [
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
    "#84cc16",
    "#f97316",
    "#14b8a6",
  ];
  return colors[index % colors.length];
};

// Danh sách các option thời gian
const timeRangeOptions = [
  { value: "7d", label: "7 ngày qua" },
  { value: "14d", label: "14 ngày qua" },
  { value: "30d", label: "30 ngày qua" },
  { value: "90d", label: "90 ngày qua" },
  { value: "cycle", label: "Từ đầu chu kỳ" },
  { value: "month", label: "Từ đầu tháng" },
  { value: "year", label: "Từ đầu năm" },
];

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("7d");
  const [showPriceDetails, setShowPriceDetails] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [selectedPreset, setSelectedPreset] = useState<string>("7d");

  // Thêm hàm để xử lý việc chọn preset
  const handleSelectPreset = (preset: string) => {
    setSelectedPreset(preset);

    const now = new Date();
    switch (preset) {
      case "7d":
        setDate({
          from: subDays(now, 7),
          to: now,
        });
        break;
      case "14d":
        setDate({
          from: subDays(now, 14),
          to: now,
        });
        break;
      case "30d":
        setDate({
          from: subDays(now, 30),
          to: now,
        });
        break;
      case "90d":
        setDate({
          from: subDays(now, 90),
          to: now,
        });
        break;
      case "cycle":
        // Giả định chu kỳ bắt đầu từ ngày 1 của tháng hiện tại
        setDate({
          from: startOfMonth(now),
          to: now,
        });
        break;
      case "month":
        setDate({
          from: startOfMonth(now),
          to: now,
        });
        break;
      case "year":
        setDate({
          from: startOfYear(now),
          to: now,
        });
        break;
    }
  };

  // Lọc dữ liệu theo khoảng thời gian đã chọn
  const getFilteredData = () => {
    switch (timeRange) {
      case "7d":
        return dailyTokenUsageData.slice(-7);
      case "14d":
        return dailyTokenUsageData.slice(-14);
      case "30d":
        return dailyTokenUsageData;
      default:
        return dailyTokenUsageData.slice(-7);
    }
  };

  // Tạo dữ liệu cho biểu đồ tròn
  const pieChartData = platformTokenData.map((item, index) => ({
    name: item.name,
    value: item.tokens,
    color: getColorByIndex(index),
  }));

  return (
    <div className="p-6 text-white overflow-y-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Tổng quan về việc sử dụng AI của bạn
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal bg-[#333] border-[#444] hover:bg-[#444]",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "dd/MM/yyyy")} -{" "}
                      {format(date.to, "dd/MM/yyyy")}
                    </>
                  ) : (
                    format(date.from, "dd/MM/yyyy")
                  )
                ) : (
                  <span>Chọn khoảng thời gian</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-[#333] border-[#444]"
              align="end"
            >
              <div className="flex">
                {/* Cột bên trái - Các options có sẵn */}
                <div className="border-r border-[#444] p-4 w-[200px]">
                  <h4 className="text-sm font-medium mb-3 text-muted-foreground">
                    Khoảng thời gian
                  </h4>
                  <div className="space-y-2">
                    {timeRangeOptions.map((option) => (
                      <Button
                        key={option.value}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-left h-9",
                          selectedPreset === option.value
                            ? "bg-[#444] text-white"
                            : "text-muted-foreground hover:text-white"
                        )}
                        onClick={() => handleSelectPreset(option.value)}
                      >
                        <span className="flex items-center">
                          {selectedPreset === option.value && (
                            <Check className="mr-2 h-4 w-4" />
                          )}
                          {!selectedPreset.includes(option.value) && (
                            <div className="w-4 mr-2" />
                          )}
                          {option.label}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Cột bên phải - Date range picker */}
                <div className="p-4">
                  <CalendarComponent
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate);
                      if (newDate?.from && newDate?.to) {
                        setSelectedPreset("custom");
                      }
                    }}
                    numberOfMonths={1}
                    className="bg-[#333] text-white"
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <div
            className="flex items-center gap-2 px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-md cursor-pointer hover:bg-[#3a3a3a] transition-colors"
            onClick={() => setShowPriceDetails(true)}
          >
            <DollarSign className="h-4 w-4 text-green-400" />
            <span className="text-primary font-medium">$128.56</span>
            <span className="text-muted-foreground mx-1">•</span>
            <span className="text-muted-foreground">Estimate price</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-1" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {/* Thẻ số lượng user */}
        <Card className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Thành viên Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold">8/12</div>
                  <p className="text-xs text-muted-foreground">
                    Đã sử dụng 66%
                  </p>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <span className="text-blue-400 text-sm font-medium">66%</span>
              </div>
            </div>
            <Progress
              value={66}
              className="h-1 mt-3 bg-gray-700"
              indicatorClassName="bg-blue-500"
            />
          </CardContent>
        </Card>

        {/* Thẻ tổng token tuning */}
        <Card className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Token Tuning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Brain className="mr-2 h-5 w-5 text-purple-400" />
                <div>
                  <div className="text-2xl font-bold">3.2M</div>
                  <p className="text-xs text-muted-foreground">
                    5 models đang quản lý
                  </p>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                <span className="text-purple-400 text-sm font-medium">5</span>
              </div>
            </div>
            <Progress
              value={64}
              className="h-1 mt-3 bg-gray-700"
              indicatorClassName="bg-purple-500"
            />
          </CardContent>
        </Card>

        {/* Thẻ tổng token sử dụng */}
        <Card className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tổng Token Sử Dụng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Zap className="mr-2 h-5 w-5 text-yellow-400" />
                <div>
                  <div className="text-2xl font-bold">5.8M</div>
                  <p className="text-xs text-muted-foreground">Tháng này</p>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <ArrowUpRight className="h-4 w-4 text-green-400" />
              </div>
            </div>
            <Progress
              value={78}
              className="h-1 mt-3 bg-gray-700"
              indicatorClassName="bg-yellow-500"
            />
          </CardContent>
        </Card>

        {/* Thẻ tổng số lượng project */}
        <Card className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tổng Số Project
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-green-400" />
                <div>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">
                    8 đang hoạt động
                  </p>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <span className="text-green-400 text-sm font-medium">8</span>
              </div>
            </div>
            <Progress
              value={33}
              className="h-1 mt-3 bg-gray-700"
              indicatorClassName="bg-green-500"
            />
            <div className="mt-3 flex items-center text-xs text-muted-foreground">
              <MessageSquare className="mr-1 h-3 w-3" />
              <span>156 khung chat đã tạo</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        {/* Biểu đồ token theo platform (chuyển thành biểu đồ tròn) */}
        <Card className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
          <CardHeader>
            <CardTitle className="text-xl">Token Theo Platform</CardTitle>
            <CardDescription className="text-muted-foreground">
              So sánh số lượng token đã sử dụng trên từng AI Platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-100 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    fontSize={12}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    
                    contentStyle={{
                      backgroundColor: "#333",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    }}
                    formatter={(value) => [
                      `${formatLargeNumber(value as number)} tokens`,
                      "Số lượng",
                    ]}
                  />
                  {/* <Legend formatter={(value) => value} /> */}
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Biểu đồ sử dụng token theo ngày (tách input và output) */}
        <Card className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
          <CardHeader>
            <CardTitle className="text-xl">Sử Dụng Token Theo Ngày</CardTitle>
            <CardDescription className="text-muted-foreground">
              Input và output tokens mỗi ngày
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={getFilteredData()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="inputTokenGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#3b82f6"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="outputTokenGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#10b981"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="date" stroke="#888" fontSize={12} />
                  <YAxis
                    stroke="#888"
                    fontSize={12}
                    tickFormatter={formatLargeNumber}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#333",
                      border: "none",
                      borderRadius: "8px",
                    }}
                    formatter={(value, name) => {
                      const label =
                        name === "inputTokens"
                          ? "Input Tokens"
                          : "Output Tokens";
                      return [`${formatLargeNumber(value as number)}`, label];
                    }}
                  />
                  <Legend
                    formatter={(value) => {
                      return value === "inputTokens"
                        ? "Input Tokens"
                        : "Output Tokens";
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="inputTokens"
                    name="inputTokens"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    // fill="url(#inputTokenGradient)"
                    fill="url(#inputTokenGradientt)"
                    stackId="1"
                  />
                  <Area
                    type="monotone"
                    dataKey="outputTokens"
                    name="outputTokens"
                    stroke="#10b981"
                    fillOpacity={1}
                    // fill="url(#outputTokenGradient)"
                    fill="url(#outputTokenGradientt)"
                    stackId="2"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        {/* Biểu đồ token theo user (thay đổi thành biểu đồ cột ngang) */}
        <Card className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
          <CardHeader>
            <CardTitle className="text-xl">
              Số Lượng Token Sử Dụng Theo User
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Thống kê lượng token đã sử dụng bởi từng thành viên
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] overflow-y-auto">
              <ResponsiveContainer
                width="100%"
                height={Math.max(400, userTokenData.length * 50)}
              >
                <BarChart
                  data={userTokenData}
                  layout="vertical"
                  margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#444"
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis
                    type="number"
                    stroke="#888"
                    fontSize={12}
                    tickFormatter={formatLargeNumber}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#888"
                    width={100}
                    tick={{ fill: "#fff" }}
                    className="text-xs"
                    style={{
                      whiteSpace: "nowrap",
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#333",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                      color: "#fff",
                      fontSize: 12,
                    }}
                    formatter={(value) => [
                      `${formatLargeNumber(value as number)} tokens`,
                      "Số lượng",
                    ]}
                  />
                  <Bar
                    dataKey="tokens"
                    name="Tokens"
                    radius={[0, 4, 4, 0]}
                    fill="white"
                  >
                    {userTokenData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getColorByIndex(index)}
                        fontSize={12}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Danh sách AI Agents */}
        <Card className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
          <CardHeader>
            <CardTitle className="text-xl">AI Agents</CardTitle>
            <CardDescription className="text-muted-foreground">
              Danh sách AI Agents đã sử dụng
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="recent">
              <TabsList className="bg-[#333] mb-4">
                <TabsTrigger
                  value="recent"
                  className="data-[state=active]:bg-[#444]"
                >
                  Gần đây
                </TabsTrigger>
                <TabsTrigger
                  value="top"
                  className="data-[state=active]:bg-[#444]"
                >
                  Sử dụng nhiều nhất
                </TabsTrigger>
              </TabsList>
              <TabsContent value="recent" className="h-[340px] overflow-y-auto">
                <div className="space-y-4">
                  {recentAgents.map((agent) => (
                    <div
                      key={agent.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#333] hover:bg-[#3a3a3a] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={agent.avatar} alt={agent.name} />
                          <AvatarFallback>
                            {agent.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{agent.name}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>{agent.lastUsed}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Zap className="mr-1 h-3 w-3 text-yellow-400" />
                          <span>{agent.usageCount} lần</span>
                        </div>
                        <div className="text-xs flex items-center">
                          <DollarSign className="mr-1 h-3 w-3 text-green-400" />
                          <span className="text-green-400">
                            ${agent.cost.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="top" className="h-[340px] overflow-y-auto">
                <div className="space-y-4">
                  {topAgents.map((agent) => (
                    <div
                      key={agent.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#333] hover:bg-[#3a3a3a] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={agent.avatar} alt={agent.name} />
                          <AvatarFallback>
                            {agent.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{agent.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Star className="mr-1 h-3 w-3 text-yellow-400" />
                          <span>{agent.usageCount.toLocaleString()} lần</span>
                        </div>
                        <div className="text-xs flex items-center">
                          <DollarSign className="mr-1 h-3 w-3 text-green-400" />
                          <span className="text-green-400">
                            ${agent.cost.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      {/* Price Details Dialog */}
      <Dialog open={showPriceDetails} onOpenChange={setShowPriceDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Price Breakdown</DialogTitle>
            <DialogDescription>
              Detailed cost information for your current usage
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="font-medium">Token Usage</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Input Tokens:</div>
                <div className="text-right">1,245,678 tokens</div>
                <div className="text-muted-foreground">Output Tokens:</div>
                <div className="text-right">567,890 tokens</div>
                <div className="text-muted-foreground">Rate:</div>
                <div className="text-right">$0.002 / 1K tokens</div>
                <div className="text-muted-foreground font-medium">
                  Subtotal:
                </div>
                <div className="text-right font-medium">$3.63</div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">API Calls</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Total Calls:</div>
                <div className="text-right">12,345 calls</div>
                <div className="text-muted-foreground">Rate:</div>
                <div className="text-right">$0.0001 / call</div>
                <div className="text-muted-foreground font-medium">
                  Subtotal:
                </div>
                <div className="text-right font-medium">$1.23</div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Storage</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Used Storage:</div>
                <div className="text-right">2.5 GB</div>
                <div className="text-muted-foreground">Rate:</div>
                <div className="text-right">$0.023 / GB</div>
                <div className="text-muted-foreground font-medium">
                  Subtotal:
                </div>
                <div className="text-right font-medium">$0.06</div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">Total Estimated Cost:</div>
                <div className="text-right font-semibold">$4.92</div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                This is an estimate based on your current usage patterns. Actual
                billing may vary.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// 35QDJn4llZazagzB
