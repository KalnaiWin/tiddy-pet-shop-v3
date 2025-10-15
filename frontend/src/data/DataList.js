import {
  BarChart,
  Blocks,
  Bubbles,
  HeartPlus,
  Megaphone,
  MessageSquare,
  Milk,
  Package,
  SoapDispenserDroplet,
  Truck,
  Users,
} from "lucide-react";

export const IntroduceList = [
  {
    icon: "/assets/plan.png",
    name: ` Thức ăn dinh dưỡng`,
    description:
      "Thức ăn khô, pate, snack và các sản phẩm bổ sung vitamin cho thú cưng.",
  },
  {
    icon: "/assets/collar.png",
    name: "Phụ kiện thời trang",
    description: "Quần áo, vòng cổ, dây dắt, ổ nằm và đồ chơi thông minh.",
  },
  {
    icon: "/assets/bath.png",
    name: "Sản phẩm chăm sóc",
    description:
      "Sữa tắm, lược chải, khử mùi, thuốc trị ve rận và các vật dụng vệ sinh.",
  },
  {
    icon: "/assets/pet-care.png",
    name: "Dịch vụ hỗ trợ",
    description:
      "Tư vấn chăm sóc, gợi ý chế độ ăn uống phù hợp và các chương trình ưu đãi hấp dẫn.",
  },
];

export const InfoShop = [
  {
    icon: "/assets/placeholder.png",
    name: "Địa chỉ: ",
    link: "www/.linktosomwhere",
  },
  {
    icon: "/assets/hours.png",
    name: "Hotline: ",
    link: "www/.linktosomwhere",
  },
  {
    icon: "/assets/internet.png",
    name: "Fanpage: ",
    link: "www/.linktosomwhere",
  },
];

export const NavBarList = [
  {
    name: "Trang chủ",
    link: "/",
  },
  {
    name: "Sản phẩm",
    link: "/product/all",
  },
  {
    name: "Liên lạc",
    link: "/contact",
  },
];

export const CategoryListHomePgae = [
  {
    href: "/images/health.jpeg",
    name: "Chăm sóc sức khoẻ",
    link: "/product/category/health-care",
  },
  {
    href: "/images/beauty.jpg",
    name: "Làm đẹp cho thú cưng",
    link: "/product/category/beauty",
  },
  {
    href: "/images/eatfood.jpg",
    name: "Thức ăn cho thú cưng",
    link: "/product/category/food",
  },
  {
    href: "/images/shower.jpg",
    name: "Vệ sinh cho thú cưng",
    link: "/product/category/hygience",
  },
  {
    href: "/images/accessory.jpg",
    name: "Phụ kiện cho thú cưng",
    link: "/product/category/accessory",
  },
  {
    href: "/images/accessory.jpg",
    name: "Khác",
    link: "/product/category/other",
  },
];

export const NavBarAdminList = [
  {
    icon: BarChart,
    color: "text-indigo-500",
    name: "Thông số chung",
    link: "/dashboard",
  },
  {
    icon: Package,
    color: "text-emerald-500",
    name: "Quản lý sản phẩm",
    link: "/dashboard/product",
  },
  {
    icon: Users,
    color: "text-purple-500",
    name: "Thông tin người dùng",
    link: "/dashboard/user",
  },
  {
    icon: Truck,
    color: "text-orange-500",
    name: "Quá trình giao hàng",
    link: "/dashboard/order",
  },
  {
    icon: MessageSquare,
    color: "text-teal-500",
    name: "Tin nhắn từ khách hàng",
    link: "/dashboard/message",
  },
  {
    icon: Megaphone,
    color: "text-rose-500",
    name: "Quảng cáo",
    link: "/dashboard/advertise",
  },
];

export const TotalCategory = [
  {
    name: "Chăm sóc sức khoẻ",
    link: "health-care",
    icon: HeartPlus,
    color: "#EF4444",
    bg: "bg-[#fab4b4]",
    bg1: "text-[#ff0000]",
  },
  {
    name: "Làm đẹp cho thú cưng",
    link: "beauty",
    icon: Bubbles,
    color: "#EC4899",
    bg: "bg-[#f8b7d8]",
    bg1: "text-[#ff0080]",
  },
  {
    name: "Thức ăn cho thú cưng",
    link: "food",
    icon: Milk,
    color: "#fcc15c",
    bg: "bg-[#fcdaa1]",
    bg1: "text-[#ffa200]",
  },
  {
    name: "Vệ sinh cho thú cưng",
    link: "hygience",
    icon: SoapDispenserDroplet,
    color: "#3B82F6",
    bg: "bg-[#9bc1ff]",
    bg1: "text-[#0062ff]",
  },
  {
    name: "Phụ kiện cho thú cưng",
    link: "accessory",
    icon: Blocks,
    color: "#10B981",
    bg: "bg-[#9fffdf]",
    bg1: "text-[#009966]",
  },
];
