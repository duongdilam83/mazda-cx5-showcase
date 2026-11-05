"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Calendar, Menu, X, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Tổng Quan", href: "#tong-quan" },
    { label: "Màu Sắc", href: "#mau-sac" },
    { label: "Điểm Nổi Bật", href: "#noi-bat" },
    { label: "Phiên Bản & Giá", href: "#phien-ban" },
    { label: "Dự Toán Lăn Bánh", href: "#du-toan" },
    { label: "Thông Số", href: "#thong-so" },
    { label: "Hỏi Đáp", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-mazda-dark-950/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-3"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/20 group-hover:border-mazda-red transition-colors">
              <svg
                viewBox="0 0 100 100"
                className="w-6 h-6 text-white group-hover:text-mazda-red-glow transition-colors fill-current"
              >
                {/* Mazda Wing Inspired Stylized Mark */}
                <path d="M50 15 C30 15 15 32 15 50 C15 68 30 85 50 85 C70 85 85 68 85 50 C85 32 70 15 50 15 Z M50 22 C65 22 78 35 78 50 C78 65 65 78 50 78 C35 78 22 65 22 50 C22 35 35 22 50 22 Z" />
                <path d="M28 42 C40 38 48 52 50 56 C52 52 60 38 72 42 C64 54 55 68 50 70 C45 68 36 54 28 42 Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider text-white uppercase font-sans">
                MAZDA <span className="text-mazda-red-glow">CX-5</span>
              </span>
              <span className="text-[10px] tracking-widest text-zinc-400 uppercase font-mono">
                Art of SUV
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs uppercase font-medium tracking-wider text-zinc-300 hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-mazda-red hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:1900545591"
              className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold tracking-wide transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-mazda-red-glow" />
              <span>Hotline: 1900 54 55 91</span>
            </a>

            <a
              href="#lai-thu"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-mazda-red to-red-600 hover:from-red-600 hover:to-red-700 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-950/50 hover:shadow-red-700/40 transition-all hover:scale-105"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Đăng Ký Lái Thử</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <a
              href="#lai-thu"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-mazda-red text-white text-xs font-bold uppercase md:hidden"
            >
              Lái Thử
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white rounded-lg bg-white/5 border border-white/10"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden mt-4 pt-4 pb-6 border-t border-white/10 flex flex-col gap-3 bg-mazda-dark-900/95 rounded-2xl p-4 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-top-3 duration-200">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-zinc-200 hover:text-mazda-red-glow py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                href="tel:1900545591"
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white text-sm font-semibold"
              >
                <Phone className="w-4 h-4 text-mazda-red-glow" />
                Hotline: 1900 54 55 91
              </a>
              <a
                href="#lai-thu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-mazda-red text-white text-sm font-bold uppercase tracking-wider shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                Đăng Ký Lái Thử Ngay
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
