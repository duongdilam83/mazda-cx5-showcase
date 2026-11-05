"use client";

import { useState } from "react";
import { TECHNICAL_SPECIFICATIONS } from "@/data/mazda-cx5-data";
import { Layers } from "lucide-react";

export default function SpecsTable() {
  const [activeCategory, setActiveCategory] = useState(
    TECHNICAL_SPECIFICATIONS[0].category
  );

  const selectedCategoryData =
    TECHNICAL_SPECIFICATIONS.find((c) => c.category === activeCategory) ||
    TECHNICAL_SPECIFICATIONS[0];

  return (
    <section id="thong-so" className="py-24 bg-mazda-dark-900 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 mb-3">
            <Layers className="w-3.5 h-3.5 text-mazda-red-glow" />
            <span className="text-xs uppercase tracking-widest text-zinc-300 font-semibold font-mono">
              Bảng So Sánh Kỹ Thuật
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Thông Số Kỹ Thuật Chi Tiết
          </h2>
          <p className="text-zinc-400 mt-4 text-base sm:text-lg">
            So sánh chi tiết thông số kích thước, sức mạnh động cơ và các gói trang bị
            giữa các phiên bản Mazda CX-5.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {TECHNICAL_SPECIFICATIONS.map((item) => (
            <button
              key={item.category}
              onClick={() => setActiveCategory(item.category)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === item.category
                  ? "bg-mazda-red text-white shadow-lg shadow-red-950/50"
                  : "bg-white/5 text-zinc-300 border border-white/10 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              {item.category}
            </button>
          ))}
        </div>

        {/* Specifications Table Container */}
        <div className="rounded-3xl border border-white/10 bg-mazda-dark-850 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="py-4 px-6 font-bold text-zinc-400 uppercase tracking-wider w-1/3">
                    Hạng Mục
                  </th>
                  <th className="py-4 px-6 font-bold text-white uppercase tracking-wider">
                    2.0L Deluxe
                  </th>
                  <th className="py-4 px-6 font-bold text-mazda-red-glow uppercase tracking-wider bg-mazda-red/10">
                    2.0L Premium Exclusive ★
                  </th>
                  <th className="py-4 px-6 font-bold text-amber-400 uppercase tracking-wider">
                    2.5L Signature AWD
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {selectedCategoryData.specs.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-6 font-medium text-zinc-200">
                      {row.name}
                    </td>
                    <td className="py-4 px-6 text-zinc-300">
                      {row.deluxe}
                    </td>
                    <td className="py-4 px-6 font-semibold text-white bg-mazda-red/5">
                      {row.premium}
                    </td>
                    <td className="py-4 px-6 font-semibold text-zinc-100">
                      {row.signature}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Download Brochure Link */}
        <div className="mt-8 text-center">
          <a
            href="#lai-thu"
            className="inline-flex items-center gap-2 text-xs font-semibold text-mazda-gold hover:text-white transition-colors"
          >
            <span>Quý khách cần catalog & thông số bản in đầy đủ? Đăng ký nhận ngay tại đây →</span>
          </a>
        </div>
      </div>
    </section>
  );
}
