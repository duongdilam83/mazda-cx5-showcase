# 🚗 Mazda CX-5 Showcase & Booking Landing Page

Trang landing page cao cấp giới thiệu xe **New Mazda CX-5**, tích hợp tính năng **đăng ký lái thử**, **dự toán phí lăn bánh & trả góp ngân hàng trực tuyến**, lưu trữ trực tiếp vào cơ sở dữ liệu **Supabase**, sẵn sàng triển khai 1-click lên **Vercel**.

---

## 🛠 Tech Stack Được Lựa Chọn

| Thành Phần | Công Nghệ Lựa Chọn | Lý Do Lựa Chọn |
| :--- | :--- | :--- |
| **Framework** | **Next.js 15 (App Router) + TypeScript** | Chuẩn công nghiệp số 1 cho Vercel, SEO mạnh mẽ, Server Components, API routes siêu tốc |
| **Styling** | **Tailwind CSS + Glassmorphism** | Giao diện Dark Luxury cao cấp chuẩn nhận diện thương hiệu Mazda KODO Design |
| **Icons & Effects** | **Lucide React + Canvas Confetti** | Icon sắc nét, hiệu ứng pháo hoa khi đăng ký thành công |
| **Database** | **Supabase (PostgreSQL + RLS)** | Miễn phí, realtime, bảo mật phân quyền Row Level Security, có sẵn UI dashboard |
| **Deployment** | **Vercel** | Tích hợp sâu với Next.js, tự động build từ GitHub repository, SSL miễn phí |

---

## 🚀 Hướng Dẫn Nhanh: Kết Nối Supabase (Đang mở sẵn trên Chrome)

### Bước 1: Khởi tạo bảng dữ liệu trên Supabase
1. Trên trình duyệt Chrome, vào tab **Supabase Dashboard** của bạn.
2. Chọn project của bạn -> bấm vào biểu tượng **SQL Editor** ở thanh menu bên trái.
3. Bấm **New query**, mở file `supabase/schema.sql` trong project này, copy toàn bộ nội dung và dán vào.
4. Bấm **Run** để khởi tạo 3 bảng:
   - `test_drive_bookings`: Lưu danh sách khách đăng ký lái thử.
   - `price_quotes`: Lưu yêu cầu báo giá lăn bánh & trả góp.
   - `newsletter_subscribers`: Lưu email nhận tin khuyến mãi.
   *(Đã cấu hình sẵn Row Level Security cho phép khách hàng ẩn danh gửi form).*

### Bước 2: Điền API Keys vào file `.env.local`
1. Tại Supabase Dashboard, vào **Project Settings** -> **Data API**.
2. Copy **Project URL** và **anon / public key**.
3. Mở file `.env.local` trong thư mục gốc và dán vào:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

---

## 💻 Chạy Dự Án Ở Local

```bash
# Chạy môi trường phát triển (Development)
npm run dev
```
Mở trình duyệt truy cập: `http://localhost:3000`

```bash
# Kiểm tra đóng gói sản xuất (Build)
npm run build
```

---

## 🚢 Hướng Dẫn Đẩy Lên GitHub & Deploy Lên Vercel

### 1. Đẩy code lên GitHub (Đang mở sẵn trên Chrome):
1. Trên tab GitHub, tạo một New Repository mới (ví dụ đặt tên là: `mazda-cx5-landing`).
2. Mở terminal tại thư mục này và chạy các lệnh:

```bash
git remote add origin https://github.com/<tai-khoan-cua-ban>/mazda-cx5-landing.git
git branch -M main
git push -u origin main
```

### 2. Triển khai lên Vercel:
1. Truy cập [vercel.com](https://vercel.com) và đăng nhập bằng tài khoản GitHub.
2. Bấm **Add New...** -> **Project** -> Chọn repository `mazda-cx5-landing`.
3. Trong phần **Environment Variables**, thêm 2 biến môi trường:
   - `NEXT_PUBLIC_SUPABASE_URL`: (URL Supabase của bạn)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (Anon key của bạn)
4. Bấm **Deploy**. Trong 60 giây, website Mazda CX-5 của bạn sẽ chính thức online với tên miền `.vercel.app`!

---

## ✨ Các Tính Năng Nổi Bật Trên Trang Landing Page

1. **Hero Section Ấn Tượng**:
   - Tone màu Dark Luxury với ánh sáng đỏ Soul Red Crystal đặc trưng.
   - Huy hiệu Top Safety Pick+, thông số 188 HP, 6.8L/100km, 5 Năm bảo hành.
2. **Bộ Sưu Tập Màu Sơn Độc Bản (Takuminuri)**:
   - Tương tác chuyển đổi mượt mà 6 màu sơn: Đỏ Pha Lê (Soul Red), Xám Ánh Kim (Machine Grey), Trắng Ngọc Trai (Snowflake White), Đen Huyền Bí (Jet Black), Xanh Đậm (Deep Crystal Blue), Vàng Bạch Kim (Platinum Quartz).
3. **Bảng Giá 5 Phiên Bản Mới Nhất**:
   - 2.0L Deluxe (749 tr), 2.0L Luxury (789 tr), 2.0L Premium Active (829 tr), 2.0L Premium Exclusive (869 tr), 2.5L Signature Exclusive AWD (979 tr).
4. **Công Cụ Dự Toán Lăn Bánh & Trả Góp Ngân Hàng**:
   - Tự động tính thuế trước bạ và phí biển số theo Hà Nội (12%), TP.HCM (10%), hoặc Tỉnh khác (10%).
   - Tùy chỉnh tỷ lệ trả trước (20% - 80%) và thời gian vay (1 - 7 năm).
   - Form gửi báo giá trực tiếp vào Supabase.
5. **Form Đăng Ký Lái Thử Kết Nối Supabase**:
   - Chọn ngày hẹn, khu vực showroom, phiên bản xe quan tâm.
   - Hiệu ứng pháo hoa chúc mừng khi đăng ký thành công.
   - Lưu trữ dữ liệu an toàn theo thời gian thực.
6. **Hỏi Đáp (FAQ) & Showroom Toàn Quốc**:
   - Thông tin hệ thống đại lý Hà Nội, TP.HCM, Đà Nẵng, số hotline 24/7.
   - Nút gọi hotline và đặt lịch lái thử nhanh cố định trên điện thoại di động (Sticky CTA bar).
