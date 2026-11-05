"use client";

import { useState } from "react";
import { FAQS } from "@/data/mazda-cx5-data";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-mazda-dark-950 relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-mazda-red-glow" />
            <span className="text-xs uppercase tracking-widest text-zinc-300 font-semibold font-mono">
              Giải Đáp Thắc Mắc
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Câu Hỏi Thường Gặp
          </h2>
          <p className="text-zinc-400 mt-4 text-base">
            Tổng hợp những câu hỏi phổ biến nhất của khách hàng trước khi quyết định chọn mua Mazda CX-5.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-mazda-dark-900 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors hover:bg-white/5"
                >
                  <span className="font-bold text-sm sm:text-base text-white pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-mazda-red-glow shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-zinc-300 leading-relaxed font-light border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
