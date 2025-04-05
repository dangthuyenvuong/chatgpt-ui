"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  UserPlus,
  Search,
  Plus,
  MoreVertical,
  Pencil,
  Trash2,
  Settings,
  UserCheck,
  UserX,
  Shield,
  FileText,
  Database,
  Code,
  Globe,
  BarChart,
  Download,
} from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Cập nhật type TeamMember để hỗ trợ nhiều team
type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Member";
  avatar: string;
  status: "active" | "pending" | "inactive";
  teamIds: string[]; // Thay đổi từ teamId thành teamIds để hỗ trợ nhiều team
  createdAt: string;
};

type Team = {
  id: string;
  name: string;
  description?: string;
  members: number;
  status: "active" | "inactive";
  permissions?: TeamPermissions;
};

// Thêm type cho quyền của team
type TeamPermissions = {
  canCreateProjects: boolean;
  canInviteMembers: boolean;
  canManageSettings: boolean;
  canAccessApi: boolean;
  canViewAnalytics: boolean;
  canExportData: boolean;
  resourceAccess: {
    files: "none" | "read" | "write" | "admin";
    database: "none" | "read" | "write" | "admin";
    code: "none" | "read" | "write" | "admin";
    api: "none" | "read" | "write" | "admin";
  };
};

// Quyền mặc định cho team mới
const defaultPermissions: TeamPermissions = {
  canCreateProjects: true,
  canInviteMembers: true,
  canManageSettings: false,
  canAccessApi: false,
  canViewAnalytics: true,
  canExportData: false,
  resourceAccess: {
    files: "write",
    database: "read",
    code: "read",
    api: "none",
  },
};

export default function TeamsPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Vương Nguyễn",
      email: "vuong@example.com",
      role: "Owner",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
      teamIds: ["team-1", "team-2"], // Thành viên này tham gia nhiều team
      createdAt: "2023-10-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Minh Trần",
      email: "minh@example.com",
      role: "Admin",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
      teamIds: ["team-2", "team-3"], // Thành viên này tham gia nhiều team
      createdAt: "2023-11-05T14:20:00Z",
    },
    {
      id: "3",
      name: "Hương Lê",
      email: "huong@example.com",
      role: "Member",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
      teamIds: ["team-1"],
      createdAt: "2023-12-10T09:15:00Z",
    },
    {
      id: "4",
      name: "Thành Phạm",
      email: "thanh@example.com",
      role: "Member",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "pending",
      teamIds: ["team-3"],
      createdAt: "2024-01-20T11:45:00Z",
    },
    {
      id: "5",
      name: "Linh Đặng",
      email: "linh@example.com",
      role: "Member",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
      teamIds: ["team-2", "team-1"], // Thành viên này tham gia nhiều team
      createdAt: "2024-02-08T16:30:00Z",
    },
    {
      id: "6",
      name: "Tuấn Hoàng",
      email: "tuan@example.com",
      role: "Admin",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
      teamIds: ["team-3", "team-1"], // Thành viên này tham gia nhiều team
      createdAt: "2024-03-01T13:10:00Z",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("members");
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [teams, setTeams] = useState<Team[]>([
    {
      id: "team-1",
      name: "Frontend",
      description: "The frontend team",
      members: 5,
      status: "active",
      permissions: defaultPermissions,
    },
    {
      id: "team-2",
      name: "Backend",
      description: "The backend team",
      members: 8,
      status: "active",
      permissions: defaultPermissions,
    },
    {
      id: "team-3",
      name: "Design",
      description: "The design team",
      members: 3,
      status: "inactive",
      permissions: defaultPermissions,
    },
  ]);

  // Dialog states
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [createTeamDialogOpen, setCreateTeamDialogOpen] = useState(false);
  const [editTeamDialogOpen, setEditTeamDialogOpen] = useState(false);
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false);

  // Thêm state cho dialog chi tiết team sau state permissionsDialogOpen
  const [teamDetailDialogOpen, setTeamDetailDialogOpen] = useState(false);
  const [selectedTeamDetail, setSelectedTeamDetail] = useState<Team | null>(
    null
  );

  // Form states
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("Member");
  const [newTeam, setNewTeam] = useState({
    name: "",
    description: "",
    members: [] as { email: string; role: string }[],
    permissions: defaultPermissions,
  });
  const [newTeamMemberEmail, setNewTeamMemberEmail] = useState("");
  const [newTeamMemberRole, setNewTeamMemberRole] = useState("Member");
  const [teamToEdit, setTeamToEdit] = useState<Team | null>(null);
  const [teamToDelete, setTeamToDelete] = useState<Team | null>(null);
  const [teamToManagePermissions, setTeamToManagePermissions] =
    useState<Team | null>(null);

  // Filter and sort states
  const [selectedTeamFilter, setSelectedTeamFilter] = useState<string | null>(
    null
  );
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Filter members
  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());

    // Cập nhật logic lọc theo team để hỗ trợ nhiều team
    const matchesTeam = selectedTeamFilter
      ? member.teamIds.includes(selectedTeamFilter)
      : true;

    return matchesSearch && matchesTeam;
  });

  // Sort members
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  // Pagination
  const paginatedMembers = sortedMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(sortedMembers.length / itemsPerPage);

  // Filter teams based on search query
  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (team.description &&
        team.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Handlers
  const handleInviteMember = () => {
    if (!newMemberEmail.trim()) return;

    // In a real app, this would send an invitation email
    const newMember: TeamMember = {
      id: `${teamMembers.length + 1}`,
      name: newMemberEmail.split("@")[0],
      email: newMemberEmail,
      role: newMemberRole as "Owner" | "Admin" | "Member",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "pending",
      teamIds: ["team-1"], // Mặc định thêm vào team-1
      createdAt: new Date().toISOString(),
    };

    setTeamMembers([...teamMembers, newMember]);
    setNewMemberEmail("");
    setInviteDialogOpen(false);

    toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${newMemberEmail}`,
    });
  };

  const handleCreateTeam = () => {
    if (!newTeam.name.trim()) return;

    // In a real app, this would be an API call
    const newTeamObj: Team = {
      id: `team-${Date.now()}`,
      name: newTeam.name,
      description: newTeam.description,
      members: 0, // Bắt đầu với 0 thành viên
      status: "active",
      permissions: newTeam.permissions, // Thêm quyền cho team mới
    };

    setTeams([...teams, newTeamObj]);

    // Reset form and close dialog
    setNewTeam({
      name: "",
      description: "",
      members: [],
      permissions: defaultPermissions,
    });
    setCreateTeamDialogOpen(false);

    toast({
      title: "Team created",
      description: `Team "${newTeam.name}" has been created successfully`,
    });
  };

  const handleEditTeam = () => {
    if (!teamToEdit) return;

    // Update the team in the list
    setTeams(
      teams.map((team) => (team.id === teamToEdit.id ? teamToEdit : team))
    );

    setEditTeamDialogOpen(false);

    toast({
      title: "Team updated",
      description: `Team "${teamToEdit.name}" has been updated successfully`,
    });
  };

  const handleDeleteTeam = () => {
    if (!teamToDelete) return;

    // Remove the team from the list
    setTeams(teams.filter((team) => team.id !== teamToDelete.id));

    // Cập nhật danh sách thành viên để xóa team đã bị xóa khỏi teamIds
    setTeamMembers(
      teamMembers.map((member) => ({
        ...member,
        teamIds: member.teamIds.filter((id) => id !== teamToDelete.id),
      }))
    );

    setDeleteConfirmDialogOpen(false);

    toast({
      title: "Team deleted",
      description: `Team "${teamToDelete.name}" has been deleted successfully`,
    });
  };

  const handleChangeRole = (
    memberId: string,
    newRole: "Owner" | "Admin" | "Member"
  ) => {
    setTeamMembers(
      teamMembers.map((member) =>
        member.id === memberId ? { ...member, role: newRole } : member
      )
    );

    toast({
      title: "Role updated",
      description: "Member's role has been updated successfully",
    });
  };

  const handleRemoveMember = (memberId: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== memberId));

    toast({
      title: "Member removed",
      description: "Team member has been removed successfully",
    });
  };

  const handleAddMemberToNewTeam = () => {
    if (!newTeamMemberEmail.trim()) return;

    // Check if email already exists in the list
    if (newTeam.members.some((member) => member.email === newTeamMemberEmail)) {
      toast({
        title: "Email already exists",
        description: "This member has already been added to the team",
        variant: "destructive",
      });
      return;
    }

    // Add member to the list
    setNewTeam((prev) => ({
      ...prev,
      members: [
        ...prev.members,
        { email: newTeamMemberEmail, role: newTeamMemberRole },
      ],
    }));

    // Reset form
    setNewTeamMemberEmail("");
  };

  const handleRemoveMemberFromNewTeam = (email: string) => {
    setNewTeam((prev) => ({
      ...prev,
      members: prev.members.filter((member) => member.email !== email),
    }));
  };

  // Hàm xử lý cập nhật quyền cho team
  const handleUpdatePermissions = () => {
    if (!teamToManagePermissions) return;

    // Cập nhật quyền cho team
    setTeams(
      teams.map((team) =>
        team.id === teamToManagePermissions.id
          ? { ...team, permissions: teamToManagePermissions.permissions }
          : team
      )
    );

    setPermissionsDialogOpen(false);

    toast({
      title: "Permissions updated",
      description: `Permissions for team "${teamToManagePermissions.name}" have been updated successfully`,
    });
  };

  // Thêm hàm xử lý khi người dùng click vào card team sau hàm handleManagePermissions
  const handleViewTeamDetail = (team: Team) => {
    setSelectedTeamDetail(team);
    setTeamDetailDialogOpen(true);
  };

  // Hàm xử lý khi người dùng nhấp vào "Manage Permissions"
  const handleManagePermissions = (team: Team) => {
    setTeamToManagePermissions(team);
    setPermissionsDialogOpen(true);
  };

  // Hàm cập nhật quyền truy cập tài nguyên
  const updateResourceAccess = (
    resource: keyof TeamPermissions["resourceAccess"],
    value: "none" | "read" | "write" | "admin"
  ) => {
    if (!teamToManagePermissions) return;

    setTeamToManagePermissions({
      ...teamToManagePermissions,
      permissions: {
        ...teamToManagePermissions.permissions,
        resourceAccess: {
          ...teamToManagePermissions.permissions?.resourceAccess,
          [resource]: value,
        },
      } as TeamPermissions,
    });
  };

  // Hàm cập nhật quyền chung
  const updateGeneralPermission = (
    permission: keyof Omit<TeamPermissions, "resourceAccess">,
    value: boolean
  ) => {
    if (!teamToManagePermissions) return;

    setTeamToManagePermissions({
      ...teamToManagePermissions,
      permissions: {
        ...teamToManagePermissions.permissions,
        [permission]: value,
      } as TeamPermissions,
    });
  };

  return (
    <SidebarProvider>
      <div className="flex-1 flex flex-col h-full w-full bg-background">
        {/* <Header /> */}
        <main className="flex-1 py-8 px-4 md:px-8 lg:px-12 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Teams</h1>
              <p className="text-muted-foreground">
                Manage your teams and team members
              </p>
            </div>

            <Tabs
              defaultValue="members"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="mb-6">
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="teams">Teams</TabsTrigger>
              </TabsList>

              <TabsContent value="members" className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                  <div className="flex flex-col md:flex-row gap-4 md:items-center">
                    <div className="relative w-full md:w-[280px]">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search members..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button
                      onClick={() => setInviteDialogOpen(true)}
                      className="whitespace-nowrap"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Invite Member
                    </Button>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 md:items-center">
                    <div className="w-full md:w-[180px]">
                      <Select
                        value={sortOrder}
                        onValueChange={(value) =>
                          setSortOrder(value as "newest" | "oldest")
                        }
                      >
                        <SelectTrigger id="sort-order">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="oldest">Oldest First</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-full md:w-[180px]">
                      <Select
                        value={selectedTeamFilter || ""}
                        onValueChange={(value) =>
                          setSelectedTeamFilter(value || null)
                        }
                      >
                        <SelectTrigger id="team-filter">
                          <SelectValue placeholder="All Teams" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Teams</SelectItem>
                          {teams.map((team) => (
                            <SelectItem key={team.id} value={team.id}>
                              {team.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left py-3 px-4 font-medium">
                          Member
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Teams
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Role
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Status
                        </th>
                        <th className="text-right py-3 px-4 font-medium">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {paginatedMembers.map((member) => (
                        <tr
                          key={member.id}
                          className="bg-card hover:bg-muted/50"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full overflow-hidden bg-muted">
                                <img
                                  src={member.avatar || "/placeholder.svg"}
                                  alt={member.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-medium">{member.name}</div>
                                <div className="text-muted-foreground text-xs">
                                  {member.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex flex-wrap gap-1">
                              {/* Hiển thị tất cả team mà thành viên tham gia */}
                              {member.teamIds.map((teamId) => {
                                const team = teams.find((t) => t.id === teamId);
                                return team ? (
                                  <Badge
                                    key={teamId}
                                    variant="outline"
                                    className="mr-1 mb-1"
                                  >
                                    {team.name}
                                  </Badge>
                                ) : null;
                              })}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              variant={
                                member.role === "Owner"
                                  ? "default"
                                  : member.role === "Admin"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {member.role}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div
                                className={`h-2 w-2 rounded-full mr-2 ${
                                  member.status === "active"
                                    ? "bg-green-500"
                                    : member.status === "pending"
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                              ></div>
                              <span className="capitalize">
                                {member.status}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleChangeRole(member.id, "Admin")
                                  }
                                >
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  Set as Admin
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleChangeRole(member.id, "Member")
                                  }
                                >
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  Set as Member
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => handleRemoveMember(member.id)}
                                  disabled={member.role === "Owner"}
                                >
                                  <UserX className="h-4 w-4 mr-2" />
                                  Remove Member
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination className="mt-4">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1)
                              setCurrentPage(currentPage - 1);
                          }}
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }).map((_, index) => {
                        const pageNumber = index + 1;

                        // Show first page, last page, current page, and pages around current
                        if (
                          pageNumber === 1 ||
                          pageNumber === totalPages ||
                          (pageNumber >= currentPage - 1 &&
                            pageNumber <= currentPage + 1)
                        ) {
                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCurrentPage(pageNumber);
                                }}
                                isActive={pageNumber === currentPage}
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }

                        // Show ellipsis for skipped pages
                        if (
                          (pageNumber === 2 && currentPage > 3) ||
                          (pageNumber === totalPages - 1 &&
                            currentPage < totalPages - 2)
                        ) {
                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }

                        return null;
                      })}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages)
                              setCurrentPage(currentPage + 1);
                          }}
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </TabsContent>

              <TabsContent value="teams" className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                  <div className="relative w-full md:w-[280px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search teams..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTeams.map((team) => (
                    <Card
                      key={team.id}
                      className="overflow-hidden cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleViewTeamDetail(team)}
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <h3 className="font-semibold text-lg">
                              {team.name}
                            </h3>
                            {team.description && (
                              <p className="text-muted-foreground text-sm line-clamp-2">
                                {team.description}
                              </p>
                            )}
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setTeamToEdit(team);
                                  setEditTeamDialogOpen(true);
                                }}
                              >
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit Team
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleManagePermissions(team);
                                }}
                              >
                                <Shield className="h-4 w-4 mr-2" />
                                Manage Permissions
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setTeamToDelete(team);
                                  setDeleteConfirmDialogOpen(true);
                                }}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Team
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">
                              {team.members} members
                            </span>
                          </div>
                          <Badge
                            variant={
                              team.status === "active" ? "default" : "secondary"
                            }
                          >
                            {team.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Create New Team Card */}
                  <Card
                    className="overflow-hidden border-dashed cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setCreateTeamDialogOpen(true)}
                  >
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full min-h-[160px]">
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Plus className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="font-semibold text-lg">Create New Team</h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        Add a new team to collaborate with others
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {/* Invite Member Dialog */}
        <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="email@example.com"
                  type="email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select value={newMemberRole} onValueChange={setNewMemberRole}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Member">Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Teams</Label>
                <div className="space-y-2">
                  {teams.map((team) => (
                    <div key={team.id} className="flex items-center space-x-2">
                      <Checkbox id={`team-${team.id}`} />
                      <Label
                        htmlFor={`team-${team.id}`}
                        className="text-sm font-normal"
                      >
                        {team.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setInviteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleInviteMember}
                disabled={!newMemberEmail.trim()}
              >
                Send Invitation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create Team Dialog */}
        <Dialog
          open={createTeamDialogOpen}
          onOpenChange={setCreateTeamDialogOpen}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Team Details</TabsTrigger>
                <TabsTrigger value="permissions">Permissions</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="team-name">Team Name</Label>
                  <Input
                    id="team-name"
                    placeholder="Enter team name"
                    value={newTeam.name}
                    onChange={(e) =>
                      setNewTeam({ ...newTeam, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="team-description">Description</Label>
                  <Textarea
                    id="team-description"
                    placeholder="Brief description of your team"
                    value={newTeam.description}
                    onChange={(e) =>
                      setNewTeam({ ...newTeam, description: e.target.value })
                    }
                    className="min-h-[80px]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Initial Members</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Email address"
                      value={newTeamMemberEmail}
                      onChange={(e) => setNewTeamMemberEmail(e.target.value)}
                      className="flex-1"
                    />
                    <Select
                      value={newTeamMemberRole}
                      onValueChange={setNewTeamMemberRole}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Member">Member</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button type="button" onClick={handleAddMemberToNewTeam}>
                      Add
                    </Button>
                  </div>
                  {newTeam.members.length > 0 && (
                    <div className="border rounded-md mt-2">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="text-left py-2 px-3">Email</th>
                            <th className="text-left py-2 px-3">Role</th>
                            <th className="text-right py-2 px-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {newTeam.members.map((member) => (
                            <tr key={member.email}>
                              <td className="py-2 px-3">{member.email}</td>
                              <td className="py-2 px-3">{member.role}</td>
                              <td className="py-2 px-3 text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleRemoveMemberFromNewTeam(member.email)
                                  }
                                  className="h-7 text-red-500 hover:text-red-400 hover:bg-red-500/10"
                                >
                                  Remove
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="permissions" className="space-y-4 py-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">General Permissions</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label
                          htmlFor="create-projects"
                          className="flex items-center gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          <span>Create Projects</span>
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          Allow team members to create new projects within the
                          workspace
                        </p>
                      </div>
                      <Switch
                        id="create-projects"
                        checked={newTeam.permissions.canCreateProjects}
                        onCheckedChange={(checked) =>
                          setNewTeam({
                            ...newTeam,
                            permissions: {
                              ...newTeam.permissions,
                              canCreateProjects: checked,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label
                          htmlFor="invite-members"
                          className="flex items-center gap-2"
                        >
                          <UserPlus className="h-4 w-4" />
                          <span>Invite Members</span>
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          Allow team members to invite new people to join the
                          team
                        </p>
                      </div>
                      <Switch
                        id="invite-members"
                        checked={newTeam.permissions.canInviteMembers}
                        onCheckedChange={(checked) =>
                          setNewTeam({
                            ...newTeam,
                            permissions: {
                              ...newTeam.permissions,
                              canInviteMembers: checked,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label
                          htmlFor="manage-settings"
                          className="flex items-center gap-2"
                        >
                          <Settings className="h-4 w-4" />
                          <span>Manage Settings</span>
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          Allow team members to modify team settings and
                          configurations
                        </p>
                      </div>
                      <Switch
                        id="manage-settings"
                        checked={newTeam.permissions.canManageSettings}
                        onCheckedChange={(checked) =>
                          setNewTeam({
                            ...newTeam,
                            permissions: {
                              ...newTeam.permissions,
                              canManageSettings: checked,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label
                          htmlFor="access-api"
                          className="flex items-center gap-2"
                        >
                          <Code className="h-4 w-4" />
                          <span>Access API</span>
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          Allow team members to use and manage API keys and
                          integrations
                        </p>
                      </div>
                      <Switch
                        id="access-api"
                        checked={newTeam.permissions.canAccessApi}
                        onCheckedChange={(checked) =>
                          setNewTeam({
                            ...newTeam,
                            permissions: {
                              ...newTeam.permissions,
                              canAccessApi: checked,
                            },
                          })
                        }
                      />
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Resource Access</h3>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <span>Files</span>
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              Control access level to files and documents
                            </p>
                          </div>
                          <Select
                            value={newTeam.permissions.resourceAccess.files}
                            onValueChange={(value) =>
                              setNewTeam({
                                ...newTeam,
                                permissions: {
                                  ...newTeam.permissions,
                                  resourceAccess: {
                                    ...newTeam.permissions.resourceAccess,
                                    files: value as
                                      | "none"
                                      | "read"
                                      | "write"
                                      | "admin",
                                  },
                                },
                              })
                            }
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Access" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">No Access</SelectItem>
                              <SelectItem value="read">Read</SelectItem>
                              <SelectItem value="write">Write</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="flex items-center gap-2">
                              <Database className="h-4 w-4" />
                              <span>Database</span>
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              Control access level to database and stored data
                            </p>
                          </div>
                          <Select
                            value={newTeam.permissions.resourceAccess.database}
                            onValueChange={(value) =>
                              setNewTeam({
                                ...newTeam,
                                permissions: {
                                  ...newTeam.permissions,
                                  resourceAccess: {
                                    ...newTeam.permissions.resourceAccess,
                                    database: value as
                                      | "none"
                                      | "read"
                                      | "write"
                                      | "admin",
                                  },
                                },
                              })
                            }
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Access" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">No Access</SelectItem>
                              <SelectItem value="read">Read</SelectItem>
                              <SelectItem value="write">Write</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="flex items-center gap-2">
                              <Code className="h-4 w-4" />
                              <span>Code</span>
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              Control access level to codebase and repositories
                            </p>
                          </div>
                          <Select
                            value={newTeam.permissions.resourceAccess.code}
                            onValueChange={(value) =>
                              setNewTeam({
                                ...newTeam,
                                permissions: {
                                  ...newTeam.permissions,
                                  resourceAccess: {
                                    ...newTeam.permissions.resourceAccess,
                                    code: value as
                                      | "none"
                                      | "read"
                                      | "write"
                                      | "admin",
                                  },
                                },
                              })
                            }
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Access" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">No Access</SelectItem>
                              <SelectItem value="read">Read</SelectItem>
                              <SelectItem value="write">Write</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="flex items-center gap-2">
                              <Globe className="h-4 w-4" />
                              <span>API</span>
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              Control access level to API endpoints and services
                            </p>
                          </div>
                          <Select
                            value={newTeam.permissions.resourceAccess.api}
                            onValueChange={(value) =>
                              setNewTeam({
                                ...newTeam,
                                permissions: {
                                  ...newTeam.permissions,
                                  resourceAccess: {
                                    ...newTeam.permissions.resourceAccess,
                                    api: value as
                                      | "none"
                                      | "read"
                                      | "write"
                                      | "admin",
                                  },
                                },
                              })
                            }
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Access" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">No Access</SelectItem>
                              <SelectItem value="read">Read</SelectItem>
                              <SelectItem value="write">Write</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateTeamDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleCreateTeam}
                disabled={!newTeam.name.trim()}
              >
                Create Team
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Team Dialog */}
        {teamToEdit && (
          <Dialog
            open={editTeamDialogOpen}
            onOpenChange={setEditTeamDialogOpen}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Team</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-team-name">Team Name</Label>
                  <Input
                    id="edit-team-name"
                    value={teamToEdit.name}
                    onChange={(e) =>
                      setTeamToEdit({ ...teamToEdit, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-team-description">Description</Label>
                  <Textarea
                    id="edit-team-description"
                    value={teamToEdit.description || ""}
                    onChange={(e) =>
                      setTeamToEdit({
                        ...teamToEdit,
                        description: e.target.value,
                      })
                    }
                    className="min-h-[80px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditTeamDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={handleEditTeam}
                  disabled={!teamToEdit.name.trim()}
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Delete Confirmation Dialog */}
        {teamToDelete && (
          <Dialog
            open={deleteConfirmDialogOpen}
            onOpenChange={setDeleteConfirmDialogOpen}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delete Team</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p>
                  Are you sure you want to delete the team "{teamToDelete.name}
                  "?
                </p>
                <p className="text-muted-foreground mt-2">
                  This action cannot be undone.
                </p>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDeleteConfirmDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="destructive"
                  onClick={handleDeleteTeam}
                >
                  Delete Team
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Manage Permissions Dialog */}
        {teamToManagePermissions && (
          <Dialog
            open={permissionsDialogOpen}
            onOpenChange={setPermissionsDialogOpen}
          >
            <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>Manage Team Permissions</DialogTitle>
                <DialogDescription>
                  Configure permissions for team "{teamToManagePermissions.name}
                  "
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-[50vh] pr-4">
                <div className="space-y-6 py-4">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">General Permissions</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="perm-create-projects"
                            className="flex items-center gap-2"
                          >
                            <FileText className="h-4 w-4" />
                            <span>Create Projects</span>
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Allow team members to create new projects within the
                            workspace
                          </p>
                        </div>
                        <Switch
                          id="perm-create-projects"
                          checked={
                            teamToManagePermissions.permissions
                              ?.canCreateProjects
                          }
                          onCheckedChange={(checked) =>
                            updateGeneralPermission(
                              "canCreateProjects",
                              checked
                            )
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="perm-invite-members"
                            className="flex items-center gap-2"
                          >
                            <UserPlus className="h-4 w-4" />
                            <span>Invite Members</span>
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Allow team members to invite new people to join the
                            team
                          </p>
                        </div>
                        <Switch
                          id="perm-invite-members"
                          checked={
                            teamToManagePermissions.permissions
                              ?.canInviteMembers
                          }
                          onCheckedChange={(checked) =>
                            updateGeneralPermission("canInviteMembers", checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="perm-manage-settings"
                            className="flex items-center gap-2"
                          >
                            <Settings className="h-4 w-4" />
                            <span>Manage Settings</span>
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Allow team members to modify team settings and
                            configurations
                          </p>
                        </div>
                        <Switch
                          id="perm-manage-settings"
                          checked={
                            teamToManagePermissions.permissions
                              ?.canManageSettings
                          }
                          onCheckedChange={(checked) =>
                            updateGeneralPermission(
                              "canManageSettings",
                              checked
                            )
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="perm-access-api"
                            className="flex items-center gap-2"
                          >
                            <Code className="h-4 w-4" />
                            <span>Access API</span>
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Allow team members to use and manage API keys and
                            integrations
                          </p>
                        </div>
                        <Switch
                          id="perm-access-api"
                          checked={
                            teamToManagePermissions.permissions?.canAccessApi
                          }
                          onCheckedChange={(checked) =>
                            updateGeneralPermission("canAccessApi", checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="perm-view-analytics"
                            className="flex items-center gap-2"
                          >
                            <BarChart className="h-4 w-4" />
                            <span>View Analytics</span>
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Allow team members to access analytics and reporting
                            dashboards
                          </p>
                        </div>
                        <Switch
                          id="perm-view-analytics"
                          checked={
                            teamToManagePermissions.permissions
                              ?.canViewAnalytics
                          }
                          onCheckedChange={(checked) =>
                            updateGeneralPermission("canViewAnalytics", checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="perm-export-data"
                            className="flex items-center gap-2"
                          >
                            <Download className="h-4 w-4" />
                            <span>Export Data</span>
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Allow team members to export data from the platform
                          </p>
                        </div>
                        <Switch
                          id="perm-export-data"
                          checked={
                            teamToManagePermissions.permissions?.canExportData
                          }
                          onCheckedChange={(checked) =>
                            updateGeneralPermission("canExportData", checked)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Resource Access</h3>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <span>Files</span>
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              Control access level to files and documents
                            </p>
                          </div>
                          <Select
                            value={
                              teamToManagePermissions.permissions
                                ?.resourceAccess.files
                            }
                            onValueChange={(value) =>
                              updateResourceAccess(
                                "files",
                                value as "none" | "read" | "write" | "admin"
                              )
                            }
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Access" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">No Access</SelectItem>
                              <SelectItem value="read">Read</SelectItem>
                              <SelectItem value="write">Write</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="flex items-center gap-2">
                              <Database className="h-4 w-4" />
                              <span>Database</span>
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              Control access level to database and stored data
                            </p>
                          </div>
                          <Select
                            value={
                              teamToManagePermissions.permissions
                                ?.resourceAccess.database
                            }
                            onValueChange={(value) =>
                              updateResourceAccess(
                                "database",
                                value as "none" | "read" | "write" | "admin"
                              )
                            }
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Access" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">No Access</SelectItem>
                              <SelectItem value="read">Read</SelectItem>
                              <SelectItem value="write">Write</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="flex items-center gap-2">
                              <Code className="h-4 w-4" />
                              <span>Code</span>
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              Control access level to codebase and repositories
                            </p>
                          </div>
                          <Select
                            value={
                              teamToManagePermissions.permissions
                                ?.resourceAccess.code
                            }
                            onValueChange={(value) =>
                              updateResourceAccess(
                                "code",
                                value as "none" | "read" | "write" | "admin"
                              )
                            }
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Access" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">No Access</SelectItem>
                              <SelectItem value="read">Read</SelectItem>
                              <SelectItem value="write">Write</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="flex items-center gap-2">
                              <Globe className="h-4 w-4" />
                              <span>API</span>
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              Control access level to API endpoints and services
                            </p>
                          </div>
                          <Select
                            value={
                              teamToManagePermissions.permissions
                                ?.resourceAccess.api
                            }
                            onValueChange={(value) =>
                              updateResourceAccess(
                                "api",
                                value as "none" | "read" | "write" | "admin"
                              )
                            }
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Access" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">No Access</SelectItem>
                              <SelectItem value="read">Read</SelectItem>
                              <SelectItem value="write">Write</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPermissionsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" onClick={handleUpdatePermissions}>
                  Save Permissions
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Team Detail Dialog */}
        {selectedTeamDetail && (
          <Dialog
            open={teamDetailDialogOpen}
            onOpenChange={setTeamDetailDialogOpen}
          >
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Team Details</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details">Team Details</TabsTrigger>
                  <TabsTrigger value="permissions">Permissions</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="detail-team-name">Team Name</Label>
                    <Input
                      id="detail-team-name"
                      value={selectedTeamDetail.name}
                      readOnly
                      className="bg-muted/50"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="detail-team-description">Description</Label>
                    <Textarea
                      id="detail-team-description"
                      value={selectedTeamDetail.description || ""}
                      readOnly
                      className="min-h-[80px] bg-muted/50"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Team Members</Label>
                    <div className="border rounded-md p-4 bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Total Members</span>
                        <Badge>{selectedTeamDetail.members}</Badge>
                      </div>
                      <div className="space-y-2 mt-4">
                        {teamMembers
                          .filter((member) =>
                            member.teamIds.includes(selectedTeamDetail.id)
                          )
                          .map((member) => (
                            <div
                              key={member.id}
                              className="flex items-center justify-between py-1 border-b border-muted"
                            >
                              <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-full overflow-hidden bg-muted">
                                  <img
                                    src={member.avatar || "/placeholder.svg"}
                                    alt={member.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium text-sm">
                                    {member.name}
                                  </div>
                                  <div className="text-muted-foreground text-xs">
                                    {member.email}
                                  </div>
                                </div>
                              </div>
                              <Badge
                                variant={
                                  member.role === "Owner"
                                    ? "default"
                                    : member.role === "Admin"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {member.role}
                              </Badge>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="permissions" className="space-y-4 py-4">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">General Permissions</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="detail-create-projects"
                            className="flex items-center gap-2"
                          >
                            <FileText className="h-4 w-4" />
                            <span>Create Projects</span>
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Allow team members to create new projects within the
                            workspace
                          </p>
                        </div>
                        <Switch
                          id="detail-create-projects"
                          checked={
                            selectedTeamDetail.permissions?.canCreateProjects
                          }
                          disabled
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="detail-invite-members"
                            className="flex items-center gap-2"
                          >
                            <UserPlus className="h-4 w-4" />
                            <span>Invite Members</span>
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Allow team members to invite new people to join the
                            team
                          </p>
                        </div>
                        <Switch
                          id="detail-invite-members"
                          checked={
                            selectedTeamDetail.permissions?.canInviteMembers
                          }
                          disabled
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="detail-manage-settings"
                            className="flex items-center gap-2"
                          >
                            <Settings className="h-4 w-4" />
                            <span>Manage Settings</span>
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Allow team members to modify team settings and
                            configurations
                          </p>
                        </div>
                        <Switch
                          id="detail-manage-settings"
                          checked={
                            selectedTeamDetail.permissions?.canManageSettings
                          }
                          disabled
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="detail-access-api"
                            className="flex items-center gap-2"
                          >
                            <Code className="h-4 w-4" />
                            <span>Access API</span>
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Allow team members to use and manage API keys and
                            integrations
                          </p>
                        </div>
                        <Switch
                          id="detail-access-api"
                          checked={selectedTeamDetail.permissions?.canAccessApi}
                          disabled
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="detail-view-analytics"
                            className="flex items-center gap-2"
                          >
                            <BarChart className="h-4 w-4" />
                            <span>View Analytics</span>
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Allow team members to access analytics and reporting
                            dashboards
                          </p>
                        </div>
                        <Switch
                          id="detail-view-analytics"
                          checked={
                            selectedTeamDetail.permissions?.canViewAnalytics
                          }
                          disabled
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="detail-export-data"
                            className="flex items-center gap-2"
                          >
                            <Download className="h-4 w-4" />
                            <span>Export Data</span>
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Allow team members to export data from the platform
                          </p>
                        </div>
                        <Switch
                          id="detail-export-data"
                          checked={
                            selectedTeamDetail.permissions?.canExportData
                          }
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Resource Access</h3>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <span>Files</span>
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              Control access level to files and documents
                            </p>
                          </div>
                          <div className="w-[120px]">
                            <Badge
                              variant="outline"
                              className="w-full justify-center"
                            >
                              {selectedTeamDetail.permissions?.resourceAccess
                                .files === "none"
                                ? "No Access"
                                : selectedTeamDetail.permissions?.resourceAccess
                                      .files === "read"
                                  ? "Read"
                                  : selectedTeamDetail.permissions
                                        ?.resourceAccess.files === "write"
                                    ? "Write"
                                    : "Admin"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="flex items-center gap-2">
                              <Database className="h-4 w-4" />
                              <span>Database</span>
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              Control access level to database and stored data
                            </p>
                          </div>
                          <div className="w-[120px]">
                            <Badge
                              variant="outline"
                              className="w-full justify-center"
                            >
                              {selectedTeamDetail.permissions?.resourceAccess
                                .database === "none"
                                ? "No Access"
                                : selectedTeamDetail.permissions?.resourceAccess
                                      .database === "read"
                                  ? "Read"
                                  : selectedTeamDetail.permissions
                                        ?.resourceAccess.database === "write"
                                    ? "Write"
                                    : "Admin"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="flex items-center gap-2">
                              <Code className="h-4 w-4" />
                              <span>Code</span>
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              Control access level to codebase and repositories
                            </p>
                          </div>
                          <div className="w-[120px]">
                            <Badge
                              variant="outline"
                              className="w-full justify-center"
                            >
                              {selectedTeamDetail.permissions?.resourceAccess
                                .code === "none"
                                ? "No Access"
                                : selectedTeamDetail.permissions?.resourceAccess
                                      .code === "read"
                                  ? "Read"
                                  : selectedTeamDetail.permissions
                                        ?.resourceAccess.code === "write"
                                    ? "Write"
                                    : "Admin"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="flex items-center gap-2">
                              <Globe className="h-4 w-4" />
                              <span>API</span>
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              Control access level to API endpoints and services
                            </p>
                          </div>
                          <div className="w-[120px]">
                            <Badge
                              variant="outline"
                              className="w-full justify-center"
                            >
                              {selectedTeamDetail.permissions?.resourceAccess
                                .api === "none"
                                ? "No Access"
                                : selectedTeamDetail.permissions?.resourceAccess
                                      .api === "read"
                                  ? "Read"
                                  : selectedTeamDetail.permissions
                                        ?.resourceAccess.api === "write"
                                    ? "Write"
                                    : "Admin"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button
                  type="button"
                  onClick={() => setTeamDetailDialogOpen(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </SidebarProvider>
  );
}
