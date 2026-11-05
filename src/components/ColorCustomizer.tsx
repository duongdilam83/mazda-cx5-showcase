"use client";

import { useState } from "react";
import Image from "next/image";
import { CX5_COLORS } from "@/data/mazda-cx5-data";
import { Check, Sparkles, Palette, Eye } from "lucide-react";

export default function ColorCustomizer() {
  const [selectedColor, setSelectedColor] = useState(CX5_COLORS[0]);

  return (
    <section id="mau-sac" className="py-24 bg-mazda-dark-900 relative overflow-hidden border-t border-white/5">
      {/* Background radial accent glow adapted to current color */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[140px] opacity-25 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: selectedColor.accentHex }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 mb-3">
            <Palette className="w-3.5 h-3.5 text-mazda-red-glow" />
            <span className="text-xs uppercase tracking-widest text-zinc-300 font-semibold font-mono">
              Công Nghệ Sơn Takuminuri
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Bộ Sưu Tập Màu Sơn Độc Bản
          </h2>
          <p className="text-zinc-400 mt-4 text-base sm:text-lg">
            Khám phá 6 gam màu ngoại thất được áp dụng công nghệ sơn thủ công điện tích nhiều lớp,
            tạo chiều sâu tương phản quang học ấn tượng dưới mọi góc độ ánh sáng.
          </p>
        </div>

        {/* Visualizer Frame */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left / Top: Car Image Display */}
            <div className="lg:col-span-8 flex flex-col items-center">
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  key={selectedColor.id}
                  src={selectedColor.imageUrl}
                  alt={selectedColor.name}
                  fill
                  className="object-cover object-center transition-all duration-700 animate-in fade-in zoom-in-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Live color badge overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-xs text-white">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/30"
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                  <span className="font-semibold">{selectedColor.name}</span>
                  <span className="text-zinc-400 font-mono">({selectedColor.code})</span>
                </div>

                <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[11px] text-zinc-300 border border-white/10">
                  <Eye className="w-3.5 h-3.5 text-mazda-red-glow" />
                  <span>Ảnh thực tế góc chụp ngoại thất</span>
                </div>
              </div>
            </div>

            {/* Right: Color Selector Controls & Information */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <div className="mb-6">
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono">
                  Mã màu chính hãng: {selectedColor.code}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1 mb-3">
                  {selectedColor.name}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                  {selectedColor.description}
                </p>
              </div>

              {/* Color Swatches Grid */}
              <div className="mb-8">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-3">
                  Chọn màu xe để trải nghiệm:
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 gap-3">
                  {CX5_COLORS.map((color) => {
                    const isSelected = selectedColor.id === color.id;
                    return (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color)}
                        className={`flex flex-col items-center p-2.5 rounded-xl border transition-all text-center group ${
                          isSelected
                            ? "bg-white/15 border-mazda-red-glow shadow-lg shadow-red-950/40 scale-105"
                            : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
                        }`}
                        title={color.name}
                      >
                        <div className="relative w-8 h-8 rounded-full shadow-inner border border-white/30 flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: color.hex }}>
                          {isSelected && <Check className="w-4 h-4 text-white drop-shadow" />}
                        </div>
                        <span className="text-[11px] text-zinc-300 font-medium mt-1.5 truncate max-w-full">
                          {color.name.split(" ")[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Call to Action for color */}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                <a
                  href="#lai-thu"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-mazda-red to-red-600 hover:from-red-600 hover:to-red-700 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Đăng Ký Xem Màu & Lái Thử</span>
                </a>
                <p className="text-[11px] text-zinc-400 text-center">
                  * Màu xe thực tế có thể thay đổi tùy thuộc vào điều kiện ánh sáng thực địa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
