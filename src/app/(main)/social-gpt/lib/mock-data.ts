import type { Article, Prompt } from "./types"

// Hàm tạo URL mẫu cho các nền tảng xã hội
function generateSocialUrl(platform: string, articleId: string): string {
  switch (platform) {
    case "x":
      return `https://twitter.com/username/status/${articleId}${Math.floor(Math.random() * 1000000)}`
    case "facebook":
      return `https://facebook.com/username/posts/${articleId}${Math.floor(Math.random() * 1000000)}`
    case "threads":
      return `https://threads.net/username/post/${articleId}${Math.floor(Math.random() * 1000000)}`
    case "linkedin":
      return `https://linkedin.com/feed/update/urn:li:activity:${articleId}${Math.floor(Math.random() * 1000000)}`
    default:
      return "#"
  }
}

// Mock data cho prompt
export const mockPrompts: Prompt[] = [
  {
    id: "1",
    name: "Thông báo sản phẩm mới",
    content:
      "Chúng tôi vui mừng thông báo về [Tên sản phẩm] mới! Sản phẩm này sẽ giúp bạn [lợi ích]. Tìm hiểu thêm tại [link].",
    platform: "x",
    createdAt: "2023-05-10T08:30:00Z",
    updatedAt: "2023-05-10T08:30:00Z",
    status: "active",
    tone: "professional",
    wordLimit: { min: 10, max: 280 },
    tags: ["sản phẩm", "thông báo", "marketing"],
    description: "Dùng để thông báo về sản phẩm mới ra mắt",
  },
  {
    id: "2",
    name: "Chia sẻ bài viết blog",
    content:
      "Bài viết mới trên blog của chúng tôi: [Tiêu đề]. Khám phá [tóm tắt ngắn về nội dung]. Đọc ngay tại [link].",
    platform: "x",
    createdAt: "2023-05-15T10:45:00Z",
    updatedAt: "2023-05-15T10:45:00Z",
    status: "active",
    tone: "casual",
    wordLimit: { min: 50, max: 280 },
    tags: ["blog", "content", "chia sẻ"],
    description: "Dùng để chia sẻ bài viết blog mới",
  },
  {
    id: "3",
    name: "Thông báo sự kiện",
    content:
      "Tham gia cùng chúng tôi vào [ngày] cho [tên sự kiện]! Chúng tôi sẽ thảo luận về [chủ đề] và chia sẻ [lợi ích]. Đăng ký tại [link].",
    platform: "facebook",
    createdAt: "2023-06-01T14:20:00Z",
    updatedAt: "2023-06-01T14:20:00Z",
    status: "active",
    tone: "friendly",
    wordLimit: { min: 50, max: 500 },
    tags: ["sự kiện", "webinar", "hội thảo"],
    description: "Dùng để thông báo về sự kiện sắp diễn ra",
  },
  {
    id: "4",
    name: "Chia sẻ mẹo hữu ích",
    content: "Mẹo [chủ đề] #[số]: [Mẹo ngắn gọn]. Bạn đã biết điều này chưa? Chia sẻ mẹo của bạn trong phần bình luận!",
    platform: "facebook",
    createdAt: "2023-06-10T09:15:00Z",
    updatedAt: "2023-06-10T09:15:00Z",
    status: "active",
    tone: "casual",
    wordLimit: { min: 30, max: 300 },
    tags: ["mẹo", "tips", "hữu ích"],
    description: "Dùng để chia sẻ mẹo và thủ thuật hữu ích",
  },
  {
    id: "5",
    name: "Câu hỏi tương tác",
    content: "Hỏi đáp: [Câu hỏi liên quan đến ngành]? Chia sẻ suy nghĩ của bạn dưới đây!",
    platform: "threads",
    createdAt: "2023-07-05T16:30:00Z",
    updatedAt: "2023-07-05T16:30:00Z",
    status: "active",
    tone: "friendly",
    wordLimit: { min: 20, max: 150 },
    tags: ["tương tác", "câu hỏi", "cộng đồng"],
    description: "Dùng để tạo tương tác với người theo dõi",
  },
  {
    id: "6",
    name: "Chia sẻ thành tựu",
    content: "Chúng tôi vui mừng thông báo [thành tựu]! Cảm ơn [người/nhóm] đã giúp chúng tôi đạt được điều này.",
    platform: "linkedin",
    createdAt: "2023-07-20T11:45:00Z",
    updatedAt: "2023-07-20T11:45:00Z",
    status: "active",
    tone: "professional",
    wordLimit: { min: 50, max: 700 },
    tags: ["thành tựu", "công ty", "milestone"],
    description: "Dùng để chia sẻ thành tựu của công ty",
  },
  {
    id: "7",
    name: "Tuyển dụng",
    content:
      "Chúng tôi đang tuyển dụng! Tìm kiếm [vị trí] để tham gia đội ngũ của chúng tôi. Tìm hiểu thêm và ứng tuyển tại [link].",
    platform: "linkedin",
    createdAt: "2023-08-01T13:20:00Z",
    updatedAt: "2023-08-01T13:20:00Z",
    status: "active",
    tone: "professional",
    wordLimit: { min: 100, max: 500 },
    tags: ["tuyển dụng", "việc làm", "career"],
    description: "Dùng để đăng thông tin tuyển dụng",
  },
]

// Lấy ngày hiện tại
const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)
const nextWeek = new Date(today)
nextWeek.setDate(nextWeek.getDate() + 7)

// Format các ngày thành chuỗi ISO
const todayStr = today.toISOString().split("T")[0]
const tomorrowStr = tomorrow.toISOString().split("T")[0]
const nextWeekStr = nextWeek.toISOString().split("T")[0]

export const mockArticles: Article[] = [
  // Bài viết đã đăng (published)
  {
    id: "1",
    title: "Trí tuệ nhân tạo và tương lai của công nghệ",
    excerpt:
      "Khám phá cách trí tuệ nhân tạo đang định hình lại tương lai của công nghệ và tác động của nó đến cuộc sống hàng ngày.",
    content: `Trí tuệ nhân tạo (AI) đang nhanh chóng trở thành một trong những công nghệ quan trọng nhất của thời đại chúng ta. Từ trợ lý ảo đến xe tự lái, AI đang thay đổi cách chúng ta tương tác với thế giới xung quanh.

  Một trong những lĩnh vực mà AI đang có tác động lớn nhất là y tế. Các thuật toán học máy giờ đây có thể phân tích hình ảnh y tế với độ chính xác ngang bằng hoặc thậm chí vượt qua các bác sĩ chuyên khoa. Điều này có thể dẫn đến việc chẩn đoán sớm hơn và chính xác hơn cho nhiều bệnh, từ đó cứu sống nhiều người.

  Trong lĩnh vực kinh doanh, AI đang giúp các công ty tự động hóa các tác vụ lặp đi lặp lại, phân tích dữ liệu khách hàng và tối ưu hóa chuỗi cung ứng. Điều này không chỉ giúp tiết kiệm chi phí mà còn cải thiện trải nghiệm khách hàng.

  Tuy nhiên, sự phát triển nhanh chóng của AI cũng đặt ra nhiều câu hỏi về đạo đức và quyền riêng tư. Làm thế nào để chúng ta đảm bảo rằng các hệ thống AI được sử dụng một cách có trách nhiệm? Làm thế nào để chúng ta bảo vệ dữ liệu cá nhân khi ngày càng nhiều quyết định được đưa ra bởi thuật toán?

  Khi chúng ta tiến về phía trước, điều quan trọng là phải cân nhắc cả lợi ích và rủi ro tiềm ẩn của AI. Bằng cách phát triển và triển khai AI một cách có trách nhiệm, chúng ta có thể tận dụng sức mạnh của công nghệ này để tạo ra một tương lai tốt đẹp hơn cho tất cả mọi người.`,
    createdAt: "2023-03-15T10:30:00Z",
    updatedAt: "2023-03-15T14:45:00Z",
    status: "published",
    topic: "technology",
    model: "GPT-4",
    wordCount: 320,
    socialMedia: [
      {
        platform: "x",
        url: generateSocialUrl("x", "1"),
        status: "posted",
        scheduledFor: "2023-03-15T12:00:00Z",
      },
      {
        platform: "facebook",
        url: generateSocialUrl("facebook", "1"),
        status: "posted",
        scheduledFor: "2023-03-15T12:00:00Z",
      },
    ],
  },
  {
    id: "5",
    title: "Xu hướng công nghệ mới nhất năm 2024",
    excerpt: "Tổng quan về các xu hướng công nghệ mới nhất dự kiến sẽ bùng nổ trong năm 2024.",
    content: "Nội dung chi tiết về xu hướng công nghệ 2024...",
    createdAt: "2023-11-20T09:00:00Z",
    updatedAt: "2023-11-20T09:00:00Z",
    status: "published",
    topic: "technology",
    model: "GPT-4",
    wordCount: 900,
    socialMedia: [
      { platform: "x", url: "https://twitter.com/example", status: "posted" },
      { platform: "linkedin", url: "https://linkedin.com/example", status: "posted" },
    ],
  },

  // Bài viết đăng hôm nay
  {
    id: "6",
    title: "Cách tối ưu hóa chiến dịch tiếp thị kỹ thuật số",
    excerpt: "Các chiến lược hiệu quả để tối ưu hóa chiến dịch tiếp thị kỹ thuật số của bạn.",
    content: "Nội dung chi tiết về tối ưu hóa chiến dịch tiếp thị kỹ thuật số...",
    createdAt: "2023-11-25T11:30:00Z",
    updatedAt: "2023-11-25T11:30:00Z",
    status: "draft",
    topic: "marketing",
    model: "GPT-4",
    wordCount: 850,
    scheduledFor: todayStr,
    socialMedia: [
      { platform: "x", url: generateSocialUrl("x", "6"), status: "scheduled", scheduledFor: today.toISOString() },
      {
        platform: "facebook",
        url: generateSocialUrl("facebook", "6"),
        status: "scheduled",
        scheduledFor: today.toISOString(),
      },
    ],
  },
  {
    id: "8",
    title: "10 cách để tăng năng suất làm việc tại nhà",
    excerpt: "Khám phá các phương pháp hiệu quả để tăng năng suất khi làm việc từ xa.",
    content: "Nội dung chi tiết về cách tăng năng suất làm việc tại nhà...",
    createdAt: "2023-11-29T08:45:00Z",
    updatedAt: "2023-11-29T08:45:00Z",
    status: "draft",
    topic: "productivity",
    model: "GPT-4",
    wordCount: 720,
    scheduledFor: todayStr,
    socialMedia: [
      {
        platform: "linkedin",
        url: generateSocialUrl("linkedin", "8"),
        status: "scheduled",
        scheduledFor: today.toISOString(),
      },
    ],
  },

  // Bài viết đã lên lịch
  {
    id: "2",
    title: "Lời khuyên cho doanh nghiệp nhỏ",
    excerpt: "Các lời khuyên hữu ích cho doanh nghiệp nhỏ để phát triển.",
    content: "Nội dung chi tiết về lời khuyên cho doanh nghiệp nhỏ...",
    createdAt: "2023-11-10T14:30:00Z",
    updatedAt: "2023-11-10T14:30:00Z",
    status: "draft",
    topic: "business",
    model: "GPT-3",
    wordCount: 800,
    scheduledFor: tomorrowStr,
    socialMedia: [
      {
        platform: "linkedin",
        url: "https://linkedin.com/example",
        status: "scheduled",
        scheduledFor: tomorrow.toISOString(),
      },
    ],
  },
  {
    id: "3",
    title: "Lợi ích của việc tập thể dục hàng ngày",
    excerpt: "Tìm hiểu về những lợi ích của việc tập thể dục hàng ngày đối với sức khỏe.",
    content: "Nội dung chi tiết về lợi ích của việc tập thể dục...",
    createdAt: "2023-11-05T08:00:00Z",
    updatedAt: "2023-11-05T08:00:00Z",
    status: "draft",
    topic: "health",
    model: "GPT-3",
    wordCount: 500,
    scheduledFor: nextWeekStr,
    socialMedia: [
      {
        platform: "facebook",
        url: "https://facebook.com/example",
        status: "scheduled",
        scheduledFor: nextWeek.toISOString(),
      },
    ],
  },
  {
    id: "7",
    title: "Tương lai của làm việc từ xa",
    excerpt: "Phân tích xu hướng làm việc từ xa và tác động của nó đến tương lai của công việc.",
    content: "Nội dung chi tiết về tương lai của làm việc từ xa...",
    createdAt: "2023-11-28T14:15:00Z",
    updatedAt: "2023-11-28T14:15:00Z",
    status: "draft",
    topic: "business",
    model: "GPT-4",
    wordCount: 780,
    scheduledFor: tomorrowStr,
    socialMedia: [
      {
        platform: "linkedin",
        url: generateSocialUrl("linkedin", "7"),
        status: "scheduled",
        scheduledFor: tomorrow.toISOString(),
      },
      { platform: "x", url: generateSocialUrl("x", "7"), status: "scheduled", scheduledFor: tomorrow.toISOString() },
    ],
  },
]

