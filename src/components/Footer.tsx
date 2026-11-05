"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Send, CheckCircle2, ShieldCheck } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setStatus(data.message || "Đăng ký nhận tin thành công!");
      setEmail("");
    } catch {
      setStatus("Đăng ký thành công!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-mazda-dark-950 border-t border-white/10 pt-16 pb-24 lg:pb-12 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:border-mazda-red transition-colors">
                <svg viewBox="0 0 100 100" className="w-5 h-5 text-white fill-current">
                  <path d="M50 15 C30 15 15 32 15 50 C15 68 30 85 50 85 C70 85 85 68 85 50 C85 32 70 15 50 15 Z" />
                </svg>
              </div>
              <span className="text-lg font-black tracking-wider text-white uppercase">
                MAZDA <span className="text-mazda-red-glow">CX-5</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-xs leading-relaxed mb-4">
              Website giới thiệu và hỗ trợ lái thử dòng xe Mazda CX-5 chính hãng tại Việt Nam.
              Trải nghiệm chuẩn mực công nghệ SkyActiv và triết lý thiết kế KODO đỉnh cao.
            </p>
            <div className="flex items-center gap-2 text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Bảo hành chính hãng 5 Năm / 150.000 Km</span>
            </div>
          </div>

          {/* Showroom Network */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs font-mono mb-4">
              Hệ Thống Showroom Tiêu Biểu
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-mazda-red-glow shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block">Hà Nội:</strong> Số 68 Lê Văn Lương, Q. Thanh Xuân
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-mazda-red-glow shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block">TP. Hồ Chí Minh:</strong> Số 189 Nguyễn Oanh, P. 10, Q. Gò Vấp
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-mazda-red-glow shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block">Đà Nẵng:</strong> Số 405 Quốc Lộ 1A, Hòa Vang
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Hotline */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs font-mono mb-4">
              Liên Hệ & Hỗ Trợ
            </h4>
            <div className="space-y-3">
              <div>
                <span className="block text-[11px] text-zinc-400">Hotline Tư Vấn 24/7:</span>
                <a href="tel:1900545591" className="text-sm font-bold text-white hover:text-mazda-red-glow transition-colors">
                  1900 54 55 91
                </a>
              </div>
              <div>
                <span className="block text-[11px] text-zinc-400">Hỗ Trợ Kỹ Thuật & Cứu Hộ:</span>
                <a href="tel:0938808000" className="text-sm font-bold text-white hover:text-mazda-red-glow transition-colors">
                  0938 808 000
                </a>
              </div>
              <div>
                <span className="block text-[11px] text-zinc-400">Giờ làm việc:</span>
                <span className="text-zinc-300">08:00 - 20:00 (Tất cả các ngày)</span>
              </div>
            </div>
          </div>

          {/* Newsletter Subscribe */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs font-mono mb-4">
              Đăng Ký Nhận Khuyến Mãi
            </h4>
            <p className="text-zinc-400 text-xs mb-3">
              Nhận thông báo ưu đãi giảm giá phí trước bạ và quà tặng phụ kiện hàng tháng.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Nhập email của bạn..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/15 rounded-l-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-mazda-red"
                />
                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Đăng ký nhận tin"
                  className="px-4 bg-mazda-red hover:bg-red-600 text-white rounded-r-xl transition-colors flex items-center justify-center shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {status && (
                <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{status}</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Credits & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <p>© {new Date().getFullYear()} Mazda CX-5 Showcase. All rights reserved. Sẵn sàng triển khai trên Vercel & Supabase.</p>
          <div className="flex items-center gap-6">
            <a href="#tong-quan" className="hover:text-white transition-colors">Về đầu trang ↑</a>
            <a href="#lai-thu" className="hover:text-white transition-colors">Đặt lịch hẹn</a>
            <a href="#du-toan" className="hover:text-white transition-colors">Dự toán chi phí</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
