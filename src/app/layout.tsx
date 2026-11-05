import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "New Mazda CX-5 2025 | Khẳng Định Đẳng Cấp SUV Thời Thượng",
  description:
    "Trải nghiệm New Mazda CX-5 với triết lý thiết kế KODO, động cơ SkyActiv-G tiết kiệm nhiên liệu, gói an toàn chủ động i-Activsense chuẩn 5 sao và âm thanh 10 loa Bose cao cấp. Bảng giá lăn bánh và đăng ký lái thử miễn phí.",
  keywords: [
    "Mazda CX-5",
    "Mazda CX5 2025",
    "Giá xe Mazda CX-5",
    "Lái thử Mazda CX-5",
    "KODO design",
    "SkyActiv-G",
    "i-Activsense",
    "SUV 5 chỗ gầm cao",
  ],
  authors: [{ name: "Mazda Vietnam Showcase" }],
  openGraph: {
    title: "New Mazda CX-5 2025 | Khẳng Định Đẳng Cấp SUV Thời Thượng",
    description:
      "Khám phá các phiên bản New Mazda CX-5 Deluxe, Luxury, Premium và Signature AWD cùng chương trình lái thử miễn phí tận nhà.",
    url: "https://mazdacx5.vercel.app",
    siteName: "Mazda CX-5 Official Showcase",
    images: [
      {
        url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "New Mazda CX-5 Đỏ Pha Lê Soul Red Crystal",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="bg-mazda-dark-950 text-zinc-100 antialiased selection:bg-mazda-red selection:text-white">
        {children}
      </body>
    </html>
  );
}
