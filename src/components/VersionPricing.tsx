"use client";

import { CX5_VERSIONS } from "@/data/mazda-cx5-data";
import { formatVND } from "@/lib/utils";
import { Check, Flame, Zap, ArrowRight, Calculator, Calendar } from "lucide-react";

interface VersionPricingProps {
  onSelectVersionForCalculator?: (versionName: string, price: number) => void;
  onSelectVersionForBooking?: (versionName: string) => void;
}

export default function VersionPricing({
  onSelectVersionForCalculator,
  onSelectVersionForBooking,
}: VersionPricingProps) {
  const handleSelectCalculator = (name: string, price: number) => {
    if (onSelectVersionForCalculator) {
      onSelectVersionForCalculator(name, price);
    }
    const el = document.getElementById("du-toan");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectBooking = (name: string) => {
    if (onSelectVersionForBooking) {
      onSelectVersionForBooking(name);
    }
    const el = document.getElementById("lai-thu");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="phien-ban" className="py-24 bg-mazda-dark-900 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-mazda-red-glow font-mono font-semibold">
            Bảng Giá Xe Mazda CX-5 Niêm Yết
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mt-2">
            Các Phiên Bản & Giá Bán Mới Nhất
          </h2>
          <p className="text-zinc-400 mt-4 text-base sm:text-lg">
            Khám phá 5 phiên bản đa dạng phù hợp với từng nhu cầu di chuyển đô thị, công tác
            hay chinh phục mọi cung đường cùng gia đình.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {CX5_VERSIONS.map((version) => {
            const isFeatured = version.recommended;
            return (
              <div
                key={version.id}
                className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? "bg-gradient-to-b from-red-950/40 via-mazda-dark-850 to-mazda-dark-900 border-2 border-mazda-red shadow-2xl shadow-red-950/50 scale-[1.02] z-10"
                    : "bg-mazda-dark-850/80 border border-white/10 hover:border-white/25 hover:bg-mazda-dark-800"
                }`}
              >
                {/* Popular Badge */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-mazda-red to-red-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-lg">
                    <Flame className="w-3.5 h-3.5" />
                    <span>Lựa Chọn Được Yêu Thích Nhất</span>
                  </div>
                )}

                <div>
                  {/* Title & Subtitle */}
                  <div className="mb-4">
                    <span className="text-[11px] uppercase tracking-widest font-mono text-zinc-400">
                      {version.drive}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                      {version.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1.5 min-h-[32px] leading-relaxed">
                      {version.subTitle}
                    </p>
                  </div>

                  {/* Engine Specs Pill */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 mb-5 flex items-center justify-between text-xs text-zinc-300">
                    <div>
                      <span className="block text-[10px] text-zinc-400">Động cơ</span>
                      <span className="font-semibold text-white">{version.power.split(" @")[0]}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] text-zinc-400">Mô-men xoắn</span>
                      <span className="font-semibold text-white">{version.torque.split(" @")[0]}</span>
                    </div>
                  </div>

                  {/* Price Block */}
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <span className="text-[11px] text-zinc-400 uppercase tracking-wider block">
                      Giá niêm yết (Đã bao gồm VAT)
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl font-black text-white font-mono">
                        {formatVND(version.priceVnd)}
                      </span>
                    </div>
                    <span className="text-xs text-emerald-400 mt-1 inline-flex items-center gap-1 font-medium">
                      <Zap className="w-3 h-3" />
                      Trả góp chỉ từ ~{(version.priceVnd * 0.011).toFixed(1)} tr/tháng
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300 block mb-2">
                      Trang bị tiêu biểu:
                    </span>
                    {version.highlightFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                        <Check className="w-4 h-4 text-mazda-red-glow shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex flex-col gap-2.5 pt-4 border-t border-white/5">
                  <button
                    onClick={() => handleSelectCalculator(version.name, version.priceVnd)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors"
                  >
                    <Calculator className="w-3.5 h-3.5 text-mazda-gold" />
                    <span>Dự Toán Phí Lăn Bánh</span>
                  </button>

                  <button
                    onClick={() => handleSelectBooking(version.name)}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md ${
                      isFeatured
                        ? "bg-gradient-to-r from-mazda-red to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Lái Thử Bản Này</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note on Promos */}
        <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-white font-bold text-sm">
              🎁 Chương Trình Ưu Đãi Đặc Quyền Trong Tháng
            </h4>
            <p className="text-xs text-zinc-400 mt-1">
              Tặng gói bảo dưỡng miễn phí 1 năm hoặc 20.000 km, phim cách nhiệt cao cấp, lót sàn chính hãng và hỗ trợ phí trước bạ.
            </p>
          </div>
          <a
            href="#lai-thu"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-mazda-red hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Nhận Báo Giá Ưu Đãi
          </a>
        </div>
      </div>
    </section>
  );
}
