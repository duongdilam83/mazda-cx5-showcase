"use client";

import Image from "next/image";
import { ShieldCheck, Fuel, Gauge, Award, ChevronDown, Sparkles, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="tong-quan"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-mazda-dark-950"
    >
      {/* Background ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-mazda-red/20 rounded-full blur-[140px] opacity-70" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-zinc-700/10 rounded-full blur-[120px]" />
        <div className="absolute top-20 right-10 w-80 h-80 bg-red-800/15 rounded-full blur-[100px]" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="flex flex-col items-center text-center">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 hover:border-mazda-red/40 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-mazda-red-glow animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-zinc-300 font-semibold">
              New Mazda CX-5 2025 • Đỉnh Cao Thiết Kế & An Toàn
            </span>
            <Sparkles className="w-3.5 h-3.5 text-mazda-gold" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase max-w-5xl leading-[1.1] mb-6">
            KHẲNG ĐỊNH ĐẲNG CẤP{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-mazda-red-glow to-amber-500">
              SUV THỜI THƯỢNG
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-zinc-300 max-w-3xl font-light mb-8 leading-relaxed">
            Hòa quyện hoàn hảo giữa triết lý điêu khắc KODO mỹ cảm, công nghệ vận hành
            SkyActiv-G bứt phá và hệ thống an toàn chủ động cao cấp i-Activsense chuẩn mực quốc tế.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full sm:w-auto">
            <a
              href="#lai-thu"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-mazda-red to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-sm uppercase tracking-wider shadow-2xl shadow-red-900/50 hover:shadow-red-600/50 transition-all transform hover:-translate-y-0.5"
            >
              <span>Đăng Ký Lái Thử Miễn Phí</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#du-toan"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white font-semibold text-sm tracking-wide transition-all"
            >
              <span>Bảng Giá & Dự Toán Lăn Bánh</span>
            </a>
          </div>

          {/* Car Hero Image Container */}
          <div className="relative w-full max-w-5xl aspect-[16/9] sm:aspect-[21/9] my-2 group">
            {/* Ambient floor glow */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-16 bg-red-700/30 blur-2xl rounded-full" />
            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/80 bg-gradient-to-b from-zinc-900 to-black">
              <Image
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600&auto=format&fit=crop"
                alt="Mazda CX-5 Đỏ Pha Lê Soul Red Crystal"
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mazda-dark-950 via-transparent to-transparent opacity-80" />

              {/* Floating feature pills on image */}
              <div className="absolute bottom-6 left-6 right-6 hidden sm:flex items-center justify-between text-xs text-white/90 backdrop-blur-md bg-black/40 border border-white/10 p-3.5 rounded-2xl">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-mazda-red" />
                  <span className="font-semibold">Màu sơn Soul Red Crystal (46V)</span>
                </div>
                <div className="flex items-center gap-6 text-zinc-300">
                  <span>Mâm hợp kim 19 inch</span>
                  <span>Đèn thích ứng thông minh ALH</span>
                  <span>Âm thanh 10 loa Bose</span>
                </div>
              </div>
            </div>
          </div>

          {/* Specs / Highlights Ticker Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl mt-10">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-center hover:border-mazda-red/30 transition-colors">
              <div className="p-2.5 rounded-xl bg-mazda-red/15 text-mazda-red-glow mb-2">
                <Gauge className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white font-mono">188 HP</span>
              <span className="text-xs text-zinc-400 mt-0.5">Công suất cực đại 2.5L</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-center hover:border-mazda-red/30 transition-colors">
              <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 mb-2">
                <Fuel className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white font-mono">6.8 L</span>
              <span className="text-xs text-zinc-400 mt-0.5">Tiêu thụ / 100km hỗn hợp</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-center hover:border-mazda-red/30 transition-colors">
              <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 mb-2">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white font-mono">5 SAO</span>
              <span className="text-xs text-zinc-400 mt-0.5">Top Safety Pick+ IIHS</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-center hover:border-mazda-red/30 transition-colors">
              <div className="p-2.5 rounded-xl bg-blue-500/15 text-blue-400 mb-2">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white font-mono">5 NĂM</span>
              <span className="text-xs text-zinc-400 mt-0.5">Bảo hành 150.000 km</span>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <a
            href="#mau-sac"
            className="mt-12 inline-flex flex-col items-center text-zinc-400 hover:text-white transition-colors group"
          >
            <span className="text-[11px] uppercase tracking-widest font-mono text-zinc-400 mb-1">
              Khám Phá Sắc Màu
            </span>
            <ChevronDown className="w-5 h-5 text-mazda-red animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
