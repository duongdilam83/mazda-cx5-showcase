"use client";

import { useState } from "react";
import Image from "next/image";
import { TECH_HIGHLIGHTS } from "@/data/mazda-cx5-data";
import { Sparkles, Shield, Cpu, Armchair, CheckCircle2 } from "lucide-react";

export default function Highlights() {
  const [activeTab, setActiveTab] = useState(TECH_HIGHLIGHTS[0].id);
  const currentHighlight = TECH_HIGHLIGHTS.find((h) => h.id === activeTab) || TECH_HIGHLIGHTS[0];

  const tabIcons = {
    "kodo-design": Sparkles,
    "skyactiv-performance": Cpu,
    "iactivsense-safety": Shield,
    "interior-comfort": Armchair,
  };

  return (
    <section id="noi-bat" className="py-24 bg-mazda-dark-950 relative overflow-hidden">
      {/* Decorative ambient lights */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-mazda-red/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-mazda-red-glow font-mono font-semibold">
            Đột Phá Kỹ Nghệ Nhật Bản
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mt-2">
            Tinh Hoa Công Nghệ Vượt Trội
          </h2>
          <p className="text-zinc-400 mt-4 text-base sm:text-lg">
            Khám phá 4 trụ cột công nghệ định hình vị thế dẫn đầu của Mazda CX-5 trong phân khúc C-SUV.
          </p>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {TECH_HIGHLIGHTS.map((item) => {
            const Icon = tabIcons[item.id as keyof typeof tabIcons] || Sparkles;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-mazda-red to-red-600 text-white shadow-xl shadow-red-950/50 scale-105"
                    : "bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 hover:border-white/20"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-mazda-red-glow"}`} />
                <span>{item.title.split(" - ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Highlight Content Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          {/* Left Text & Features */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-mono uppercase tracking-widest text-mazda-red-glow font-bold">
              {currentHighlight.tagline}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-2 mb-4 leading-snug">
              {currentHighlight.title}
            </h3>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
              {currentHighlight.description}
            </p>

            {/* Bullet points */}
            <div className="space-y-3 mb-8">
              {currentHighlight.bulletPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-mazda-red-glow shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-200 font-medium">{point}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <a
                href="#lai-thu"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all"
              >
                Trải Nghiệm Thực Tế Ngay
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                key={currentHighlight.id}
                src={currentHighlight.imageUrl}
                alt={currentHighlight.title}
                fill
                className="object-cover object-center animate-in fade-in duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
