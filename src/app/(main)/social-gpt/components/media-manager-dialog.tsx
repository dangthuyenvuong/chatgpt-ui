"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import {
  Image,
  Upload,
  X,
  Search,
  FolderPlus,
  Folder,
  Tag,
  Calendar,
  ArrowUpDown,
  Plus,
  Info,
  CheckCircle,
  ChevronRight,
  FileImage,
  Check,
  Loader2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mở rộng interface cho mockImages để bao gồm ghi chú
interface MediaImage {
  id: string
  url: string
  name: string
  size: string
  date: string
  folder: string
  tags: string[]
  notes?: string
}

// Interface cho file đang upload
interface UploadingFile {
  id: string
  file: File
  progress: number
  status: "uploading" | "success" | "error"
  url?: string
  previewUrl?: string
}

// Mock data cho thư viện ảnh
const mockImages: MediaImage[] = [
  {
    id: "img1",
    url: "/placeholder.svg?height=200&width=300",
    name: "Image 1.jpg",
    size: "120 KB",
    date: "2024-04-15",
    folder: "General",
    tags: ["banner", "website"],
    notes: "Banner image for website homepage",
  },
  {
    id: "img2",
    url: "/placeholder.svg?height=200&width=300",
    name: "Website banner.png",
    size: "250 KB",
    date: "2024-04-10",
    folder: "Marketing",
    tags: ["banner", "logo"],
    notes: "Banner for Q2/2024 marketing campaign",
  },
  {
    id: "img3",
    url: "/placeholder.svg?height=200&width=300",
    name: "Company logo.png",
    size: "80 KB",
    date: "2024-04-05",
    folder: "Branding",
    tags: ["logo"],
  },
  {
    id: "img4",
    url: "/placeholder.svg?height=200&width=300",
    name: "Product image.jpg",
    size: "180 KB",
    date: "2024-04-01",
    folder: "Products",
    tags: ["product"],
  },
  {
    id: "img5",
    url: "/placeholder.svg?height=200&width=300",
    name: "Background.jpg",
    size: "320 KB",
    date: "2024-03-28",
    folder: "General",
    tags: ["background"],
  },
  {
    id: "img6",
    url: "/placeholder.svg?height=200&width=300",
    name: "Infographic.png",
    size: "420 KB",
    date: "2024-03-20",
    folder: "Marketing",
    tags: ["infographic"],
  },
  {
    id: "img7",
    url: "/placeholder.svg?height=200&width=300",
    name: "Product image 2.jpg",
    size: "150 KB",
    date: "2024-03-15",
    folder: "Products",
    tags: ["product"],
  },
  {
    id: "img8",
    url: "/placeholder.svg?height=200&width=300",
    name: "Advertising banner.jpg",
    size: "280 KB",
    date: "2024-03-10",
    folder: "Marketing",
    tags: ["banner", "advertising"],
  },
]

// Mock data cho folders
const mockFolders = [
  { id: "all", name: "All", count: mockImages.length },
  { id: "general", name: "General", count: mockImages.filter((img) => img.folder === "General").length },
  { id: "marketing", name: "Marketing", count: mockImages.filter((img) => img.folder === "Marketing").length },
  { id: "branding", name: "Branding", count: mockImages.filter((img) => img.folder === "Branding").length },
  { id: "products", name: "Products", count: mockImages.filter((img) => img.folder === "Products").length },
]

// Tạo danh sách tags từ tất cả các hình ảnh
const getAllTags = () => {
  const tagsSet = new Set<string>()
  mockImages.forEach((img) => {
    img.tags.forEach((tag) => tagsSet.add(tag))
  })
  return Array.from(tagsSet).map((tag) => ({
    id: tag,
    name: tag,
    count: mockImages.filter((img) => img.tags.includes(tag)).length,
  }))
}

const mockTags = getAllTags()

// Tính tổng dung lượng
const calculateTotalStorage = () => {
  let total = 0
  mockImages.forEach((img) => {
    const size = Number.parseInt(img.size.replace(" KB", ""))
    total += size
  })
  return total
}

interface MediaManagerDialogProps {
  isOpen: boolean
  onClose: () => void
  onSelectImage: (imageUrl: string) => void
}

// Chuyển đổi các chuỗi trong component MediaManagerDialog
export function MediaManagerDialog({ isOpen, onClose, onSelectImage }: MediaManagerDialogProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFolder, setSelectedFolder] = useState("all")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")
  const [showUploadUI, setShowUploadUI] = useState(false)
  const [selectedImageDetails, setSelectedImageDetails] = useState<MediaImage | null>(null)
  const [imageNotes, setImageNotes] = useState("")
  const [newTag, setNewTag] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [availableTags, setAvailableTags] = useState(mockTags.map((tag) => tag.name))
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([])
  const [selectedUploadedFile, setSelectedUploadedFile] = useState<UploadingFile | null>(null)
  const [uploadedFileName, setUploadedFileName] = useState("")
  const [uploadedFileFolder, setUploadedFileFolder] = useState("General")
  const [uploadedFileTags, setUploadedFileTags] = useState<string[]>([])
  const [uploadedFileNotes, setUploadedFileNotes] = useState("")

  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropAreaRef = useRef<HTMLDivElement>(null)

  // Lọc hình ảnh dựa trên folder, tag và search query
  const filteredImages = mockImages
    .filter((img) => {
      // Lọc theo folder
      if (selectedFolder !== "all" && img.folder.toLowerCase() !== selectedFolder.replace("products", "Products")) {
        return false
      }

      // Lọc theo tag
      if (selectedTag && !img.tags.includes(selectedTag)) {
        return false
      }

      // Lọc theo search query
      if (searchQuery && !img.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Sắp xếp theo ngày
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB
    })

  // Tạo URL preview cho file
  const createPreviewUrl = (file: File): string => {
    return URL.createObjectURL(file)
  }

  // Xử lý khi click vào một hình ảnh
  const handleImageClick = (image: MediaImage) => {
    setSelectedImage(image.url)
    setSelectedImageDetails(image)
    setImageNotes(image.notes || "")
  }

  // Chuyển đổi các thông báo toast và các hàm xử lý
  const handleConfirmSelection = () => {
    if (selectedImage) {
      onSelectImage(selectedImage)
      toast({
        title: "Image selected",
        description: "The image has been added to your article.",
      })
      handleClose()
    } else {
      toast({
        title: "No image selected",
        description: "Please select an image before continuing.",
        variant: "destructive",
      })
    }
  }

  const handleSaveImageDetails = () => {
    if (selectedImageDetails) {
      // Trong thực tế, đây sẽ là một API call để lưu thông tin
      toast({
        title: "Information saved",
        description: "Image information has been updated.",
      })

      // Cập nhật thông tin trong state
      const updatedImages = mockImages.map((img) => {
        if (img.id === selectedImageDetails.id) {
          return {
            ...img,
            notes: imageNotes,
            tags: selectedImageDetails.tags,
          }
        }
        return img
      })

      // Không đóng chi tiết hình ảnh sau khi lưu
    }
  }

  const handleSaveUploadedFile = () => {
    if (selectedUploadedFile) {
      // Trong thực tế, đây sẽ là một API call để lưu thông tin
      toast({
        title: "Information saved",
        description: "Image information has been updated.",
      })

      // Đóng chi tiết file đã upload
      setSelectedUploadedFile(null)
    }
  }

  const handleFinishUploads = () => {
    const successfulUploads = uploadingFiles.filter((file) => file.status === "success")

    if (successfulUploads.length > 0) {
      toast({
        title: "Upload successful",
        description: `${successfulUploads.length} files have been uploaded successfully.`,
      })

      // Trong thực tế, đây sẽ là một API call để lưu thông tin

      // Quay lại thư viện
      setShowUploadUI(false)
      setUploadingFiles([])
      setSelectedUploadedFile(null)
    } else {
      toast({
        title: "No files uploaded",
        description: "Please upload at least one file.",
        variant: "destructive",
      })
    }
  }

  const handleClose = () => {
    setSelectedImage(null)
    setSearchQuery("")
    setSelectedFolder("all")
    setSelectedTag(null)
    setShowUploadUI(false)
    setSelectedImageDetails(null)
    setUploadingFiles([])
    setSelectedUploadedFile(null)
    onClose()
  }

  const handleUploadClick = () => {
    setShowUploadUI(true)
    setUploadingFiles([])
    setSelectedUploadedFile(null)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(Array.from(files))
    }
  }

  const handleFileUpload = (files: File[]) => {
    // Tạo danh sách các file đang upload
    const newUploadingFiles: UploadingFile[] = files.map((file) => ({
      id: `upload-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      file,
      progress: 0,
      status: "uploading",
      previewUrl: createPreviewUrl(file),
    }))

    setUploadingFiles([...uploadingFiles, ...newUploadingFiles])

    // Giả lập quá trình upload
    newUploadingFiles.forEach((uploadingFile) => {
      const totalSteps = 10
      let currentStep = 0

      const interval = setInterval(() => {
        currentStep++
        const progress = Math.round((currentStep / totalSteps) * 100)

        setUploadingFiles((prev) => prev.map((file) => (file.id === uploadingFile.id ? { ...file, progress } : file)))

        if (currentStep === totalSteps) {
          clearInterval(interval)

          // Đánh dấu file đã upload thành công
          setUploadingFiles((prev) =>
            prev.map((file) =>
              file.id === uploadingFile.id
                ? {
                    ...file,
                    status: "success",
                    url: "/placeholder.svg?height=200&width=300",
                    progress: 100,
                  }
                : file,
            ),
          )
        }
      }, 300)
    })
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(Array.from(e.dataTransfer.files))
    }
  }

  const handleFolderClick = (folderId: string) => {
    setSelectedFolder(folderId)
    setSelectedTag(null)
  }

  const handleTagClick = (tagId: string) => {
    setSelectedTag(tagId)
    setSelectedFolder("all")
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
  }

  // Cập nhật hàm handleSaveImageDetails để tự động lưu mà không cần nút lưu

  const handleAddTag = () => {
    if (newTag.trim() && selectedImageDetails) {
      if (!selectedImageDetails.tags.includes(newTag.trim())) {
        const updatedTags = [...selectedImageDetails.tags, newTag.trim()]
        setSelectedImageDetails({
          ...selectedImageDetails,
          tags: updatedTags,
        })

        // Thêm vào danh sách tags nếu chưa có
        if (!availableTags.includes(newTag.trim())) {
          setAvailableTags([...availableTags, newTag.trim()])
        }

        setNewTag("")
      }
    }
  }

  const handleRemoveTag = (tag: string) => {
    if (selectedImageDetails) {
      const updatedTags = selectedImageDetails.tags.filter((t) => t !== tag)
      setSelectedImageDetails({
        ...selectedImageDetails,
        tags: updatedTags,
      })
    }
  }

  const handleUploadedFileClick = (file: UploadingFile) => {
    if (file.status === "success") {
      setSelectedUploadedFile(file)
      setUploadedFileName(file.file.name)
      setUploadedFileFolder("General")
      setUploadedFileTags([])
      setUploadedFileNotes("")
    }
  }

  const handleAddUploadedFileTag = (tag: string) => {
    if (tag.trim() && !uploadedFileTags.includes(tag.trim())) {
      setUploadedFileTags([...uploadedFileTags, tag.trim()])

      // Thêm vào danh sách tags nếu chưa có
      if (!availableTags.includes(tag.trim())) {
        setAvailableTags([...availableTags, tag.trim()])
      }
    }
  }

  const handleRemoveUploadedFileTag = (tag: string) => {
    setUploadedFileTags(uploadedFileTags.filter((t) => t !== tag))
  }

  // Tính toán dung lượng lưu trữ
  const totalStorage = calculateTotalStorage()
  const usedStorage = totalStorage
  const totalStorageGB = 5 // Giả sử tổng dung lượng là 5GB
  const usedPercentage = (usedStorage / (totalStorageGB * 1024)) * 100

  // Xóa URL preview khi component unmount
  useEffect(() => {
    return () => {
      uploadingFiles.forEach((file) => {
        if (file.previewUrl) {
          URL.revokeObjectURL(file.previewUrl)
        }
      })
    }
  }, [uploadingFiles])

  // Chuyển đổi giao diện dialog
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Media Manager</DialogTitle>
          <DialogDescription>Select an image from the library or upload a new one.</DialogDescription>
        </DialogHeader>

        {showUploadUI ? (
          <div className="h-[70vh] flex flex-col">
            {selectedUploadedFile ? (
              <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-1/2 p-4 flex flex-col">
                  <div className="flex items-center mb-4">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedUploadedFile(null)} className="mr-2">
                      <ChevronRight className="h-4 w-4 rotate-180" />
                      <span className="ml-1">Back</span>
                    </Button>
                  </div>
                  <div className="bg-muted rounded-md overflow-hidden flex-grow flex items-center justify-center">
                    <img
                      src={selectedUploadedFile.previewUrl || "/placeholder.svg"}
                      alt={selectedUploadedFile.file.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>

                <div className="w-full md:w-1/2 p-4 border-l flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium">Image Information</h3>
                  </div>

                  <div className="grid gap-4 mb-4">
                    <div>
                      <Label htmlFor="uploaded-file-name" className="mb-1 block">
                        File name
                      </Label>
                      <Input
                        id="uploaded-file-name"
                        value={uploadedFileName}
                        onChange={(e) => setUploadedFileName(e.target.value)}
                        placeholder="Enter file name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="uploaded-file-folder" className="mb-1 block">
                        Folder
                      </Label>
                      <Select value={uploadedFileFolder} onValueChange={setUploadedFileFolder}>
                        <SelectTrigger id="uploaded-file-folder">
                          <SelectValue placeholder="Select folder" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="General">General</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Branding">Branding</SelectItem>
                          <SelectItem value="Products">Products</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="uploaded-file-notes" className="mb-1 block">
                        Notes
                      </Label>
                      <Textarea
                        id="uploaded-file-notes"
                        value={uploadedFileNotes}
                        onChange={(e) => setUploadedFileNotes(e.target.value)}
                        placeholder="Add notes for this image..."
                        className="resize-none"
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label className="mb-1 block">Tags</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {uploadedFileTags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveUploadedFileTag(tag)}
                              className="ml-1 rounded-full h-4 w-4 inline-flex items-center justify-center text-xs hover:bg-muted"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                        {uploadedFileTags.length === 0 && (
                          <span className="text-xs text-muted-foreground">No tags yet</span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Input
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Add new tag..."
                          className="flex-grow"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              handleAddUploadedFileTag(newTag)
                              setNewTag("")
                            }
                          }}
                        />
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => {
                            handleAddUploadedFileTag(newTag)
                            setNewTag("")
                          }}
                          disabled={!newTag.trim()}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {availableTags.length > 0 && (
                        <div className="mt-2">
                          <Label className="text-xs text-muted-foreground mb-1 block">Available tags:</Label>
                          <div className="flex flex-wrap gap-1">
                            {availableTags
                              .filter((tag) => !uploadedFileTags.includes(tag))
                              .slice(0, 8)
                              .map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="cursor-pointer hover:bg-secondary"
                                  onClick={() => handleAddUploadedFileTag(tag)}
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto pt-4 flex justify-end">
                    <Button onClick={handleSaveUploadedFile}>
                      <Check className="h-4 w-4 mr-2" />
                      Save Information
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div
                  ref={dropAreaRef}
                  className={`p-6 flex flex-col items-center justify-center border-2 border-dashed rounded-lg mx-4 mt-4 transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-border"}`}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="text-center max-w-md mx-auto">
                    <div
                      className={`p-3 rounded-full mx-auto mb-3 inline-flex ${isDragging ? "bg-primary/20" : "bg-muted"}`}
                    >
                      <Upload className={`h-6 w-6 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <h3 className="text-base font-medium mb-1">
                      {isDragging ? "Drop files to upload" : "Drag and drop files here"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Supports JPG, PNG, GIF formats. Maximum file size 5MB.
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <Button size="sm" onClick={() => fileInputRef.current?.click()}>
                        <FileImage className="h-4 w-4 mr-2" />
                        Select Files
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileSelect}
                        multiple
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-grow p-4 overflow-auto">
                  <div className="mb-2 flex justify-between items-center">
                    <h3 className="text-sm font-medium">Uploaded Files</h3>
                    <span className="text-xs text-muted-foreground">
                      {uploadingFiles.filter((f) => f.status === "success").length} / {uploadingFiles.length} files
                    </span>
                  </div>

                  {uploadingFiles.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {uploadingFiles.map((file) => (
                        <div
                          key={file.id}
                          className={`
                            border rounded-md overflow-hidden transition-all
                            ${file.status === "success" ? "cursor-pointer hover:border-primary/50" : ""}
                          `}
                          onClick={() => handleUploadedFileClick(file)}
                        >
                          <div className="relative aspect-video bg-muted">
                            {file.previewUrl ? (
                              <img
                                src={file.previewUrl || "/placeholder.svg"}
                                alt={file.file.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <FileImage className="h-8 w-8 text-muted-foreground/50" />
                              </div>
                            )}

                            {file.status === "uploading" && (
                              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                                <Loader2 className="h-6 w-6 animate-spin mb-2" />
                                <span className="text-xs">{file.progress}%</span>
                              </div>
                            )}

                            {file.status === "success" && (
                              <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                                <Check className="h-3 w-3" />
                              </div>
                            )}

                            {file.status === "error" && (
                              <div className="absolute inset-0 bg-red-500/50 flex items-center justify-center text-white">
                                <X className="h-6 w-6" />
                              </div>
                            )}
                          </div>
                          <div className="p-2">
                            <p className="text-sm font-medium truncate">{file.file.name}</p>
                            <div className="flex justify-between items-center">
                              <p className="text-xs text-muted-foreground">{Math.round(file.file.size / 1024)} KB</p>
                              <p className="text-xs text-muted-foreground">
                                {file.status === "success"
                                  ? "Completed"
                                  : file.status === "uploading"
                                    ? "Uploading"
                                    : "Error"}
                              </p>
                            </div>
                            {file.status === "uploading" && <Progress value={file.progress} className="h-1 mt-1" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No files uploaded yet</p>
                    </div>
                  )}
                </div>

                <div className="p-4 border-t mt-auto flex justify-between">
                  <Button variant="outline" onClick={() => setShowUploadUI(false)}>
                    Back to Library
                  </Button>
                  <Button
                    onClick={handleFinishUploads}
                    disabled={uploadingFiles.filter((f) => f.status === "success").length === 0}
                  >
                    Finish Upload
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : selectedImageDetails ? (
          <div className="flex flex-col md:flex-row h-[70vh]">
            <div className="w-full md:w-1/2 p-4 flex flex-col">
              <div className="flex items-center mb-4">
                <Button variant="ghost" size="sm" onClick={() => setSelectedImageDetails(null)} className="mr-2">
                  <ChevronRight className="h-4 w-4 rotate-180" />
                  <span className="ml-1">Back</span>
                </Button>
              </div>
              <div className="bg-muted rounded-md overflow-hidden flex-grow flex items-center justify-center">
                <img
                  src={selectedImageDetails.url || "/placeholder.svg"}
                  alt={selectedImageDetails.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2 p-4 border-l flex flex-col">
              <div className="mb-4">
                <h3 className="text-lg font-medium">{selectedImageDetails.name}</h3>
              </div>

              <div className="grid gap-4 mb-4">
                <div>
                  <Label className="text-sm text-muted-foreground mb-1 block">Information</Label>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Size:</span> {selectedImageDetails.size}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Created:</span>{" "}
                      {new Date(selectedImageDetails.date).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Folder:</span> {selectedImageDetails.folder}
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="image-notes" className="mb-1 block">
                    Notes
                  </Label>
                  <Textarea
                    id="image-notes"
                    value={imageNotes}
                    onChange={(e) => setImageNotes(e.target.value)}
                    placeholder="Add notes for this image..."
                    className="resize-none"
                    rows={4}
                    onBlur={handleSaveImageDetails}
                  />
                </div>

                <div>
                  <Label className="mb-1 block">Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedImageDetails.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 rounded-full h-4 w-4 inline-flex items-center justify-center text-xs hover:bg-muted"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {selectedImageDetails.tags.length === 0 && (
                      <span className="text-xs text-muted-foreground">No tags yet</span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add new tag..."
                      className="flex-grow"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddTag()
                        }
                      }}
                    />
                    <Button type="button" size="sm" onClick={handleAddTag} disabled={!newTag.trim()}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {availableTags.length > 0 && (
                    <div className="mt-2">
                      <Label className="text-xs text-muted-foreground mb-1 block">Available tags:</Label>
                      <div className="flex flex-wrap gap-1">
                        {availableTags
                          .filter((tag) => !selectedImageDetails.tags.includes(tag))
                          .slice(0, 8)
                          .map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="cursor-pointer hover:bg-secondary"
                              onClick={() => {
                                if (selectedImageDetails) {
                                  setSelectedImageDetails({
                                    ...selectedImageDetails,
                                    tags: [...selectedImageDetails.tags, tag],
                                  })
                                  handleSaveImageDetails()
                                }
                              }}
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row h-[70vh]">
            {/* Left column - Folders and Tags */}
            <div className="w-full md:w-1/4 border-r flex flex-col">
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Folders</h3>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <FolderPlus className="h-4 w-4" />
                  </Button>
                </div>

                <ScrollArea className="h-[200px] pr-4">
                  <div className="space-y-1">
                    {mockFolders.map((folder) => (
                      <Button
                        key={folder.id}
                        variant={selectedFolder === folder.id ? "secondary" : "ghost"}
                        className="w-full justify-start text-sm h-8"
                        onClick={() => handleFolderClick(folder.id)}
                      >
                        <Folder className="h-4 w-4 mr-2" />
                        <span className="truncate">{folder.name}</span>
                        <Badge variant="outline" className="ml-auto">
                          {folder.count}
                        </Badge>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <Separator />

              <div className="p-4 flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Tags</h3>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <ScrollArea className="h-[200px] pr-4">
                  <div className="flex flex-wrap gap-2">
                    {mockTags.map((tag) => (
                      <Badge
                        key={tag.id}
                        variant={selectedTag === tag.id ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleTagClick(tag.id)}
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag.name} ({tag.count})
                      </Badge>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="p-4 border-t mt-auto">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Storage</span>
                  <span className="text-xs font-medium">
                    {usedStorage} KB / {totalStorageGB} GB
                  </span>
                </div>
                <Progress value={usedPercentage} className="h-2" />
                <div className="flex justify-end mt-1">
                  <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                    Upgrade
                  </Button>
                </div>
              </div>
            </div>

            {/* Right column - Image list */}
            <div className="w-full md:w-3/4 flex flex-col">
              <div className="p-4 border-b flex justify-between items-center">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search images..." />
                  <Input
                    placeholder="Search images..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={toggleSortOrder}>
                    <Calendar className="h-4 w-4" />
                    <span>Date</span>
                    <ArrowUpDown className="h-3 w-3 ml-1" />
                  </Button>

                  <Button variant="default" size="sm" className="flex items-center gap-1" onClick={handleUploadClick}>
                    <Upload className="h-4 w-4 mr-1" />
                    Upload
                  </Button>
                </div>
              </div>

              <ScrollArea className="flex-grow p-4">
                {filteredImages.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredImages.map((image) => (
                      <div
                        key={image.id}
                        className={`
                          border rounded-md overflow-hidden cursor-pointer transition-all
                          ${selectedImage === image.url ? "ring-2 ring-primary" : "hover:border-primary/50"}
                        `}
                        onClick={() => handleImageClick(image)}
                      >
                        <div className="relative aspect-video bg-muted">
                          <img
                            src={image.url || "/placeholder.svg"}
                            alt={image.name}
                            className="w-full h-full object-cover"
                          />
                          {selectedImage === image.url && (
                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                              <div className="bg-primary text-primary-foreground rounded-full p-1">
                                <CheckCircle className="h-4 w-4" />
                              </div>
                            </div>
                          )}
                          {image.notes && (
                            <div className="absolute bottom-1 right-1 bg-black/60 text-white rounded-full p-1">
                              <Info className="h-3 w-3" />
                            </div>
                          )}
                        </div>
                        <div className="p-2">
                          <p className="text-sm font-medium truncate">{image.name}</p>
                          <div className="flex justify-between items-center">
                            <p className="text-xs text-muted-foreground">{image.size}</p>
                            <p className="text-xs text-muted-foreground">{new Date(image.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-8 text-center text-muted-foreground">
                    <Image className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <p>No images found</p>
                    <Button variant="outline" className="mt-4" onClick={handleUploadClick}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload new image
                    </Button>
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        )}

        <DialogFooter className="p-4 border-t">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleConfirmSelection} disabled={!selectedImage}>
            Select Image
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

