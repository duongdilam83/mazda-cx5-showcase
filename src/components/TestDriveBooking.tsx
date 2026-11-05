"use client";

import { useState, useId } from "react";
import confetti from "canvas-confetti";
import { CX5_VERSIONS } from "@/data/mazda-cx5-data";
import {
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  ShieldCheck,
  Send,
  Sparkles,
} from "lucide-react";

interface TestDriveBookingProps {
  selectedVersion?: string;
}

export default function TestDriveBooking({
  selectedVersion,
}: TestDriveBookingProps) {
  const fullNameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const versionId = useId();
  const cityId = useId();
  const dateId = useId();
  const notesId = useId();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [versionInterest, setVersionInterest] = useState(
    selectedVersion || "Mazda CX-5 2.0L Premium Exclusive"
  );
  const [preferredCity, setPreferredCity] = useState("Hà Nội");
  const [preferredDate, setPreferredDate] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    success: boolean;
    message: string;
    isMock?: boolean;
    bookingId?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim()) {
      setStatus({
        success: false,
        message: "Vui lòng nhập họ tên và số điện thoại liên hệ.",
      });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/test-drive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          versionInterest,
          preferredCity,
          preferredDate,
          notes: notes.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gửi đăng ký không thành công");
      }

      // Kích hoạt pháo hoa ăn mừng đăng ký thành công
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#b71520", "#ea2626", "#c5a059", "#ffffff"],
        });
      } catch {
        // bỏ qua nếu browser chặn canvas
      }

      setStatus({
        success: true,
        message: result.message,
        isMock: result.isMock,
        bookingId: result.data?.id,
      });

      // Reset form sau khi gửi
      setFullName("");
      setPhone("");
      setEmail("");
      setNotes("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Đã xảy ra lỗi kết nối";
      setStatus({
        success: false,
        message: msg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="lai-thu" className="py-24 bg-mazda-dark-950 relative border-t border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-mazda-red/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Test Drive Value Proposition */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 mb-4 w-fit">
              <Calendar className="w-3.5 h-3.5 text-mazda-red-glow" />
              <span className="text-xs uppercase tracking-widest text-zinc-300 font-semibold font-mono">
                Miễn Phí 100% Trải Nghiệm
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-tight">
              Đăng Ký Lái Thử <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">
                Mazda CX-5
              </span>
            </h2>

            <p className="text-zinc-300 mt-4 text-sm sm:text-base leading-relaxed">
              Hãy cảm nhận trực tiếp khả năng cách âm tĩnh lặng, sức mạnh tăng tốc phấn khích
              và dàn âm thanh 10 loa Bose sống động trước khi đưa ra quyết định.
            </p>

            {/* Test Drive Perks */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <MapPin className="w-5 h-5 text-mazda-red-glow shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Linh Hoạt Điểm Lái Thử</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Trải nghiệm tại hệ thống Showroom Mazda chính hãng hoặc yêu cầu lái thử tận nhà/cơ quan của bạn.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <Clock className="w-5 h-5 text-mazda-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Phản Hồi Siêu Tốc Trong 15 Phút</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Chuyên viên Mazda sẽ gọi điện xác nhận lịch hẹn và chuẩn bị xe đúng phiên bản bạn mong muốn.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Quà Tặng Lưu Niệm Chính Hãng</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Nhận ngay quà tặng kỷ niệm Mazda độc quyền cùng voucher ưu đãi giảm giá phụ kiện khi đến lái thử.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-mazda-dark-900/90 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl relative">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Điền Thông Tin Đặt Lịch
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Dữ liệu được lưu trữ trực tiếp vào cơ sở dữ liệu Supabase an toàn & bảo mật.
                </p>
              </div>

              {/* Status Message */}
              {status && (
                <div
                  className={`p-4 rounded-2xl mb-6 text-sm flex items-start gap-3 border ${
                    status.success
                      ? "bg-emerald-500/10 text-emerald-200 border-emerald-500/30"
                      : "bg-red-500/10 text-red-200 border-red-500/30"
                  }`}
                >
                  {status.success ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold">{status.message}</p>
                    {status.bookingId && (
                      <p className="text-xs opacity-75 font-mono mt-1">
                        Mã đặt lịch: #{status.bookingId.slice(0, 8)}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor={fullNameId} className="block text-xs uppercase font-mono tracking-wider text-zinc-300 font-semibold mb-1.5">
                      Họ và Tên *
                    </label>
                    <input
                      id={fullNameId}
                      type="text"
                      placeholder="Nguyễn Văn A"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-mazda-red"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor={phoneId} className="block text-xs uppercase font-mono tracking-wider text-zinc-300 font-semibold mb-1.5">
                      Số Điện Thoại *
                    </label>
                    <input
                      id={phoneId}
                      type="tel"
                      placeholder="09xx xxx xxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-mazda-red"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label htmlFor={emailId} className="block text-xs uppercase font-mono tracking-wider text-zinc-300 font-semibold mb-1.5">
                      Email (Nhận xác nhận)
                    </label>
                    <input
                      id={emailId}
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-mazda-red"
                    />
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label htmlFor={dateId} className="block text-xs uppercase font-mono tracking-wider text-zinc-300 font-semibold mb-1.5">
                      Ngày Mong Muốn Lái Thử
                    </label>
                    <input
                      id={dateId}
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-mazda-red"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Version Interested */}
                  <div>
                    <label htmlFor={versionId} className="block text-xs uppercase font-mono tracking-wider text-zinc-300 font-semibold mb-1.5">
                      Phiên Bản Quan Tâm
                    </label>
                    <select
                      id={versionId}
                      value={versionInterest}
                      onChange={(e) => setVersionInterest(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-mazda-red"
                    >
                      {CX5_VERSIONS.map((v) => (
                        <option key={v.id} value={v.name} className="bg-mazda-dark-900 text-white">
                          {v.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Showroom City */}
                  <div>
                    <label htmlFor={cityId} className="block text-xs uppercase font-mono tracking-wider text-zinc-300 font-semibold mb-1.5">
                      Khu Vực Lái Thử
                    </label>
                    <select
                      id={cityId}
                      value={preferredCity}
                      onChange={(e) => setPreferredCity(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-mazda-red"
                    >
                      <option value="Hà Nội" className="bg-mazda-dark-900 text-white">Hà Nội</option>
                      <option value="TP. Hồ Chí Minh" className="bg-mazda-dark-900 text-white">TP. Hồ Chí Minh</option>
                      <option value="Đà Nẵng" className="bg-mazda-dark-900 text-white">Đà Nẵng</option>
                      <option value="Hải Phòng" className="bg-mazda-dark-900 text-white">Hải Phòng</option>
                      <option value="Cần Thơ" className="bg-mazda-dark-900 text-white">Cần Thơ</option>
                      <option value="Tỉnh Thành Khác" className="bg-mazda-dark-900 text-white">Tỉnh Thành Khác</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor={notesId} className="block text-xs uppercase font-mono tracking-wider text-zinc-300 font-semibold mb-1.5">
                    Ghi Chú Hoặc Yêu Cầu Riêng (Tùy chọn)
                  </label>
                  <textarea
                    id={notesId}
                    rows={2}
                    placeholder="Ví dụ: Tôi muốn lái thử phiên bản màu Đỏ Soul Red tại nhà vào thứ 7..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-mazda-red"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-mazda-red to-red-600 hover:from-red-600 hover:to-red-700 disabled:opacity-50 text-white font-bold text-sm uppercase tracking-wider shadow-xl shadow-red-950/50 hover:shadow-red-600/40 transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {loading ? "Đang gửi dữ liệu vào Supabase..." : "Xác Nhận Đăng Ký Lái Thử"}
                  </span>
                </button>

                <p className="text-[11px] text-zinc-400 text-center mt-3">
                  Cam kết bảo mật 100% thông tin cá nhân. Thông tin chỉ sử dụng cho mục đích liên hệ lái thử xe Mazda CX-5.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
