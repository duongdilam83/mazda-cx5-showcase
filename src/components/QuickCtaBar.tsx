"use client";

import { Phone, Calendar, MessageSquare } from "lucide-react";

export default function QuickCtaBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-mazda-dark-950/95 backdrop-blur-lg border-t border-white/10 px-4 py-2.5 sm:hidden shadow-2xl">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        {/* Call button */}
        <a
          href="tel:1900545591"
          className="flex-1 flex flex-col items-center justify-center py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[11px] font-semibold active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4 text-mazda-red-glow mb-0.5" />
          <span>Gọi Hotline</span>
        </a>

        {/* Zalo button */}
        <a
          href="https://zalo.me"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-2 rounded-xl bg-blue-600/15 border border-blue-500/20 text-blue-400 text-[11px] font-semibold active:scale-95 transition-all"
        >
          <MessageSquare className="w-4 h-4 mb-0.5" />
          <span>Chat Zalo</span>
        </a>

        {/* Book Test Drive */}
        <a
          href="#lai-thu"
          className="flex-[1.5] flex items-center justify-center gap-1.5 py-3 rounded-xl bg-gradient-to-r from-mazda-red to-red-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg active:scale-95 transition-all"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Lái Thử Xe</span>
        </a>
      </div>
    </div>
  );
}
