"use client";

import { useState } from "react";
import { Database, Check, Copy, ExternalLink, X, ShieldAlert, Sparkles } from "lucide-react";

export default function SupabaseGuideModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copySqlSnippet = () => {
    const sql = `-- Mở Supabase SQL Editor và chạy đoạn mã này:
CREATE TABLE IF NOT EXISTS public.test_drive_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    version_interest TEXT DEFAULT 'Mazda CX-5 2.0L Premium Exclusive',
    preferred_city TEXT DEFAULT 'Hà Nội',
    preferred_date DATE,
    notes TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.price_quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    version_name TEXT NOT NULL,
    registration_city TEXT DEFAULT 'Hà Nội',
    down_payment_percent INTEGER DEFAULT 20,
    loan_term_years INTEGER DEFAULT 5,
    estimated_monthly_payment NUMERIC,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.test_drive_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON public.test_drive_bookings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public quote" ON public.price_quotes FOR INSERT TO anon, authenticated WITH CHECK (true);
`;
    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      {/* Floating Status Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-2xl transition-all hover:scale-105"
        title="Trạng thái kết nối Supabase"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <Database className="w-3.5 h-3.5 text-emerald-400" />
        <span className="hidden sm:inline">Cấu hình Supabase & Vercel</span>
        <span className="sm:hidden">Supabase</span>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-3xl bg-mazda-dark-900 border border-white/15 p-6 sm:p-8 shadow-2xl text-white">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Hướng Dẫn Kết Nối Supabase
                </h3>
                <span className="text-xs text-zinc-400">
                  Dành riêng cho bạn (Đã mở sẵn tab Supabase trên Chrome)
                </span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
              {/* Step 1 */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">1</span>
                    Chạy SQL Schema trong Supabase:
                  </span>
                  <button
                    onClick={copySqlSnippet}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Đã copy SQL!" : "Copy SQL"}</span>
                  </button>
                </div>
                <p className="text-xs text-zinc-400">
                  Mở tab Supabase trên Chrome &gt; chọn Project &gt; <strong>SQL Editor</strong> &gt; Dán đoạn mã vừa copy (hoặc trong file <code>supabase/schema.sql</code>) và bấm <strong>Run</strong>.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <span className="font-bold text-white flex items-center gap-1.5 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">2</span>
                  Lấy API Keys và lưu vào file <code>.env.local</code>:
                </span>
                <p className="text-xs text-zinc-400 mb-2">
                  Vào <strong>Project Settings &gt; Data API</strong> &gt; Copy <strong>Project URL</strong> và <strong>anon / public key</strong>:
                </p>
                <div className="p-2.5 rounded-xl bg-black/60 font-mono text-[11px] text-emerald-300 border border-white/10 space-y-1">
                  <div>NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co</div>
                  <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...</div>
                </div>
              </div>

              {/* Step 3: Deploy to Vercel */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <span className="font-bold text-white flex items-center gap-1.5 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">3</span>
                  Deploy lên Vercel:
                </span>
                <p className="text-xs text-zinc-400">
                  Khi đẩy code lên GitHub và import vào Vercel, chỉ cần thêm 2 biến môi trường trên vào phần <strong>Environment Variables</strong> của Vercel là landing page sẽ hoạt động online 100%!
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-mazda-red hover:bg-red-600 text-white text-xs font-bold uppercase transition-colors"
              >
                Đã hiểu & Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
