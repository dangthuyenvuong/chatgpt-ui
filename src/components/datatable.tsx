"use client";

import { useState, useEffect } from "react";
import {
  X,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Định nghĩa kiểu dữ liệu cho người dùng
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
  department: string;
}

// Định nghĩa kiểu dữ liệu cho bộ lọc
interface FilterType {
  id: string;
  field: string;
  operator: string;
  value: string;
}

export default function AdvancedDataTable() {
  // Dữ liệu mẫu
  const sampleUsers: User[] = [
    {
      id: "1",
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      role: "Admin",
      status: "Hoạt động",
      lastActive: "Hôm nay",
      department: "IT",
    },
    {
      id: "2",
      name: "Trần Thị B",
      email: "tranthib@example.com",
      role: "Người dùng",
      status: "Hoạt động",
      lastActive: "Hôm qua",
      department: "Marketing",
    },
    {
      id: "3",
      name: "Lê Văn C",
      email: "levanc@example.com",
      role: "Quản lý",
      status: "Không hoạt động",
      lastActive: "1 tuần trước",
      department: "Nhân sự",
    },
    {
      id: "4",
      name: "Phạm Thị D",
      email: "phamthid@example.com",
      role: "Người dùng",
      status: "Hoạt động",
      lastActive: "Hôm nay",
      department: "Tài chính",
    },
    {
      id: "5",
      name: "Hoàng Văn E",
      email: "hoangvane@example.com",
      role: "Quản lý",
      status: "Hoạt động",
      lastActive: "3 ngày trước",
      department: "IT",
    },
  ];

  // State
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(sampleUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState<FilterType[]>([]);
  const [newFilter, setNewFilter] = useState<FilterType>({
    id: crypto.randomUUID(),
    field: "name",
    operator: "contains",
    value: "",
  });
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User | null;
    direction: "ascending" | "descending" | null;
  }>({
    key: null,
    direction: null,
  });

  // Xử lý tìm kiếm
  useEffect(() => {
    applyFiltersAndSearch();
  }, [searchTerm, filters, users, sortConfig]);

  // Hàm áp dụng bộ lọc và tìm kiếm
  const applyFiltersAndSearch = () => {
    let result = [...users];

    // Áp dụng tìm kiếm
    if (searchTerm) {
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Áp dụng các bộ lọc
    if (filters.length > 0) {
      result = result.filter((user) => {
        return filters.every((filter) => {
          const fieldValue = String(
            user[filter.field as keyof User]
          ).toLowerCase();
          const filterValue = filter.value.toLowerCase();

          switch (filter.operator) {
            case "contains":
              return fieldValue.includes(filterValue);
            case "equals":
              return fieldValue === filterValue;
            case "startsWith":
              return fieldValue.startsWith(filterValue);
            case "endsWith":
              return fieldValue.endsWith(filterValue);
            default:
              return true;
          }
        });
      });
    }

    // Áp dụng sắp xếp
    if (sortConfig.key && sortConfig.direction) {
      result.sort((a, b) => {
        const aValue = String(a[sortConfig.key as keyof User]).toLowerCase();
        const bValue = String(b[sortConfig.key as keyof User]).toLowerCase();

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredUsers(result);
  };

  // Xử lý thêm bộ lọc
  const handleAddFilter = () => {
    if (newFilter.value.trim() !== "") {
      setFilters([...filters, { ...newFilter, id: crypto.randomUUID() }]);
      setNewFilter({
        id: crypto.randomUUID(),
        field: "name",
        operator: "contains",
        value: "",
      });
      setIsFilterDialogOpen(false);
    }
  };

  // Xử lý xóa bộ lọc
  const handleRemoveFilter = (id: string) => {
    setFilters(filters.filter((filter) => filter.id !== id));
  };

  // Xử lý sắp xếp
  const requestSort = (key: keyof User) => {
    let direction: "ascending" | "descending" | null = "ascending";

    if (sortConfig.key === key) {
      if (sortConfig.direction === "ascending") {
        direction = "descending";
      } else if (sortConfig.direction === "descending") {
        direction = null;
      }
    }

    setSortConfig({ key, direction });
  };

  // Hiển thị biểu tượng sắp xếp
  const getSortIcon = (key: keyof User) => {
    if (sortConfig.key !== key) {
      return null;
    }

    return sortConfig.direction === "ascending" ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  // Hiển thị tên trường trong badge
  const getFieldDisplayName = (field: string) => {
    switch (field) {
      case "name":
        return "Tên";
      case "email":
        return "Email";
      case "role":
        return "Vai trò";
      case "status":
        return "Trạng thái";
      case "department":
        return "Phòng ban";
      default:
        return field;
    }
  };

  // Hiển thị tên toán tử trong badge
  const getOperatorDisplayName = (operator: string) => {
    switch (operator) {
      case "contains":
        return "chứa";
      case "equals":
        return "bằng";
      case "startsWith":
        return "bắt đầu với";
      case "endsWith":
        return "kết thúc với";
      default:
        return operator;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Quản lý người dùng</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Thanh tìm kiếm và nút lọc */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm người dùng..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setIsFilterDialogOpen(true)}
          >
            <Filter className="h-4 w-4" />
            Bộ lọc
          </Button>
        </div>

        {/* Hiển thị các bộ lọc đã áp dụng */}
        {filters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {filters.map((filter) => (
              <Badge
                key={filter.id}
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1"
              >
                <span>
                  {getFieldDisplayName(filter.field)}{" "}
                  {getOperatorDisplayName(filter.operator)} "{filter.value}"
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => handleRemoveFilter(filter.id)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Xóa bộ lọc</span>
                </Button>
              </Badge>
            ))}
            {filters.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setFilters([])}
              >
                Xóa tất cả
              </Button>
            )}
          </div>
        )}

        {/* Bảng dữ liệu */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <Checkbox />
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => requestSort("name")}
                >
                  <div className="flex items-center">
                    Tên {getSortIcon("name")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => requestSort("email")}
                >
                  <div className="flex items-center">
                    Email {getSortIcon("email")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => requestSort("role")}
                >
                  <div className="flex items-center">
                    Vai trò {getSortIcon("role")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => requestSort("status")}
                >
                  <div className="flex items-center">
                    Trạng thái {getSortIcon("status")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => requestSort("department")}
                >
                  <div className="flex items-center">
                    Phòng ban {getSortIcon("department")}
                  </div>
                </TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "Hoạt động"
                            ? "success"
                            : "destructive"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Mở menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                          <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Không tìm thấy dữ liệu phù hợp.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Phân trang */}
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button variant="outline" size="sm" disabled>
            Trước
          </Button>
          <Button variant="outline" size="sm" className="px-4">
            1
          </Button>
          <Button variant="outline" size="sm" disabled>
            Sau
          </Button>
        </div>
      </CardContent>

      {/* Dialog bộ lọc */}
      <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Thêm bộ lọc</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="field" className="text-right">
                Trường
              </Label>
              <Select
                value={newFilter.field}
                onValueChange={(value) =>
                  setNewFilter({ ...newFilter, field: value })
                }
              >
                <SelectTrigger id="field" className="col-span-3">
                  <SelectValue placeholder="Chọn trường" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Tên</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="role">Vai trò</SelectItem>
                  <SelectItem value="status">Trạng thái</SelectItem>
                  <SelectItem value="department">Phòng ban</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="operator" className="text-right">
                Toán tử
              </Label>
              <Select
                value={newFilter.operator}
                onValueChange={(value) =>
                  setNewFilter({ ...newFilter, operator: value })
                }
              >
                <SelectTrigger id="operator" className="col-span-3">
                  <SelectValue placeholder="Chọn toán tử" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contains">Chứa</SelectItem>
                  <SelectItem value="equals">Bằng</SelectItem>
                  <SelectItem value="startsWith">Bắt đầu với</SelectItem>
                  <SelectItem value="endsWith">Kết thúc với</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="value" className="text-right">
                Giá trị
              </Label>
              <Input
                id="value"
                value={newFilter.value}
                onChange={(e) =>
                  setNewFilter({ ...newFilter, value: e.target.value })
                }
                className="col-span-3"
              />
            </div>

            {/* Các bộ lọc nhanh cho một số trường */}
            {newFilter.field === "role" && (
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Lựa chọn nhanh</Label>
                <RadioGroup
                  className="col-span-3"
                  value={newFilter.value}
                  onValueChange={(value) =>
                    setNewFilter({ ...newFilter, value, operator: "equals" })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Admin" id="admin" />
                    <Label htmlFor="admin">Admin</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Quản lý" id="manager" />
                    <Label htmlFor="manager">Quản lý</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Người dùng" id="user" />
                    <Label htmlFor="user">Người dùng</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {newFilter.field === "status" && (
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Lựa chọn nhanh</Label>
                <RadioGroup
                  className="col-span-3"
                  value={newFilter.value}
                  onValueChange={(value) =>
                    setNewFilter({ ...newFilter, value, operator: "equals" })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Hoạt động" id="active" />
                    <Label htmlFor="active">Hoạt động</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Không hoạt động" id="inactive" />
                    <Label htmlFor="inactive">Không hoạt động</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsFilterDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button onClick={handleAddFilter}>Áp dụng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
