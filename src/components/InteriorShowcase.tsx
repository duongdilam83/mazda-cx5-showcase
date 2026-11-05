"use client";

import Image from "next/image";
import { Volume2, Smartphone, Wind, Compass, Sparkles, Shield } from "lucide-react";

export default function InteriorShowcase() {
  const interiorFeatures = [
    {
      icon: Volume2,
      title: "Hệ Thống 10 Loa Bose®",
      desc: "Trang bị công nghệ âm thanh vòm kỹ thuật số Centerpoint và khử tạp âm AudioPilot mang đến trải nghiệm hòa nhạc đỉnh cao.",
    },
    {
      icon: Smartphone,
      title: "Apple CarPlay Không Dây",
      desc: "Kết nối smartphone mượt mà không cần dây cắm, hỗ trợ sạc không dây chuẩn Qi tiện lợi ngay vị trí bệ tỳ tay trung tâm.",
    },
    {
      icon: Wind,
      title: "Làm Mát & Sưởi Ghế Trước",
      desc: "Hệ thống làm mát lưng ghế với 3 tốc độ gió hút khí thông minh, đem lại sự mát mẻ dễ chịu trong những ngày hè oi bức.",
    },
    {
      icon: Compass,
      title: "Màn Hình Kính Lái HUD Màu",
      desc: "Hiển thị trực quan tốc độ hiện tại, biển báo giao thông và cảnh báo điểm mù ngay trên tầm mắt mà không cần rời mắt khỏi đường.",
    },
    {
      icon: Sparkles,
      title: "Da Nappa & Gỗ Tự Nhiên",
      desc: "Từng đường chỉ khâu thủ công tinh tế trên chất liệu da cao cấp mềm mại, cùng các mảng ốp gỗ tự nhiên sang trọng.",
    },
    {
      icon: Shield,
      title: "Kính Cách Âm 2 Lớp",
      desc: "Cửa kính trước cách âm 2 lớp giảm tối đa tiếng ồn gió và tiếng vọng mặt đường, tạo không gian yên tĩnh thư thái.",
    },
  ];

  return (
    <section className="py-24 bg-mazda-dark-950 relative border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-mazda-red-glow font-mono font-semibold">
            Không Gian Khoang Lái
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mt-2">
            Nội Thất Sang Trọng Đẳng Cấp
          </h2>
          <p className="text-zinc-400 mt-4 text-base sm:text-lg">
            Mọi chi tiết trong khoang cabin Mazda CX-5 đều được chế tác xoay quanh người lái và hành khách,
            mang đến cảm giác thư thái tuyệt đối trên từng hải trình.
          </p>
        </div>

        {/* Big Interior Hero Image */}
        <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-12">
          <Image
            src="https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=1600&auto=format&fit=crop"
            alt="Nội thất Mazda CX-5 sang trọng"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mazda-dark-950 via-transparent to-black/30" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 max-w-lg">
            <span className="text-xs uppercase tracking-widest text-mazda-gold font-mono font-bold">
              Thiết kế lấy con người làm trung tâm (Human-Centric)
            </span>
            <h3 className="text-xl sm:text-3xl font-bold text-white mt-1">
              Sự Hòa Quyện Giữa Nghệ Thuật & Công Nghệ
            </h3>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interiorFeatures.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-mazda-red/30 hover:bg-white/10 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-mazda-red/15 border border-mazda-red/20 flex items-center justify-center text-mazda-red-glow mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{feat.title}</h4>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
