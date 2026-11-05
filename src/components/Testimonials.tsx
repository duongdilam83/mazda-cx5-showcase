"use client";

import Image from "next/image";
import { TESTIMONIALS } from "@/data/mazda-cx5-data";
import { Star, Quote, Award } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-24 bg-mazda-dark-900 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 mb-3">
            <Award className="w-3.5 h-3.5 text-mazda-gold" />
            <span className="text-xs uppercase tracking-widest text-zinc-300 font-semibold font-mono">
              Niềm Tin Từ Hơn 100.000 Khách Hàng
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Khách Hàng Nói Gì Về Mazda CX-5?
          </h2>
          <p className="text-zinc-400 mt-4 text-base sm:text-lg">
            Những chia sẻ chân thực từ các chủ sở hữu Mazda CX-5 sau hàng chục ngàn kilomet lăn bánh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-mazda-dark-850/70 border border-white/10 hover:border-mazda-red/30 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Rating stars & Quote Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-white/10" />
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Owner Info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-white/5">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/20 shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{t.name}</h4>
                  <p className="text-xs text-zinc-400">{t.title}</p>
                  <span className="text-[10px] text-mazda-gold font-mono font-semibold">
                    Đã đi: {t.mileage}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
