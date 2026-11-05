"use client";

import { useState, useId } from "react";
import { CX5_VERSIONS } from "@/data/mazda-cx5-data";
import { formatVND } from "@/lib/utils";
import { Calculator, Send, CheckCircle2, AlertCircle, FileText, Sparkles } from "lucide-react";

interface LoanCalculatorProps {
  initialVersionName?: string;
  initialPrice?: number;
}

export default function LoanCalculator({
  initialVersionName,
  initialPrice,
}: LoanCalculatorProps) {
  const versionSelectId = useId();
  const citySelectId = useId();
  const downPaymentRangeId = useId();
  const loanTermRangeId = useId();
  const quoteNameId = useId();
  const quotePhoneId = useId();

  const [selectedVersionName, setSelectedVersionName] = useState<string>(
    initialVersionName || CX5_VERSIONS[3].name
  );
  const currentVersion =
    CX5_VERSIONS.find((v) => v.name === selectedVersionName) || CX5_VERSIONS[3];

  const listedPrice = currentVersion.priceVnd;

  // Khu vực đăng ký
  const [region, setRegion] = useState<"hanoi" | "hcm" | "other">("hanoi");

  // Vay trả góp
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanYears, setLoanYears] = useState<number>(5);

  // Form báo giá
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  // Tính chi phí lăn bánh
  const registrationTaxRate = region === "hanoi" ? 0.12 : 0.1;
  const registrationTax = Math.round(listedPrice * registrationTaxRate);
  const licensePlateFee = region === "other" ? 1000000 : 20000000;
  const inspectionFee = 340000;
  const roadMaintenanceFee = 1560000; // 1 năm cá nhân
  const civilInsuranceFee = 480700; // 5 chỗ không kinh doanh

  const totalFees =
    registrationTax +
    licensePlateFee +
    inspectionFee +
    roadMaintenanceFee +
    civilInsuranceFee;
  const totalOnRoadPrice = listedPrice + totalFees;

  // Tính trả góp
  const loanAmount = Math.round(listedPrice * (1 - downPaymentPercent / 100));
  const totalInitialPayment =
    Math.round((listedPrice * downPaymentPercent) / 100) + totalFees;

  // Ước tính gốc + lãi tháng đầu (lãi suất tạm tính 7.9% / năm)
  const annualInterestRate = 0.079;
  const totalMonths = loanYears * 12;
  const monthlyPrincipal = Math.round(loanAmount / totalMonths);
  const monthlyInterestFirstMonth = Math.round(
    (loanAmount * annualInterestRate) / 12
  );
  const estimatedFirstMonthPayment =
    monthlyPrincipal + monthlyInterestFirstMonth;

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      setSubmitMessage({
        text: "Vui lòng nhập họ tên và số điện thoại liên hệ.",
        isError: true,
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: customerName,
          phone: customerPhone,
          versionName: currentVersion.name,
          registrationCity:
            region === "hanoi"
              ? "Hà Nội"
              : region === "hcm"
              ? "TP. Hồ Chí Minh"
              : "Tỉnh thành khác",
          downPaymentPercent,
          loanTermYears: loanYears,
          estimatedMonthlyPayment: estimatedFirstMonthPayment,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gửi yêu cầu thất bại");

      setSubmitMessage({
        text: data.message || "Yêu cầu báo giá thành công! Tư vấn viên sẽ gửi bảng tính chi tiết.",
        isError: false,
      });
      setCustomerName("");
      setCustomerPhone("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Đã xảy ra lỗi";
      setSubmitMessage({ text: msg, isError: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="du-toan" className="py-24 bg-mazda-dark-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 mb-3">
            <Calculator className="w-3.5 h-3.5 text-mazda-gold" />
            <span className="text-xs uppercase tracking-widest text-zinc-300 font-semibold font-mono">
              Công Cụ Trực Tuyến
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Dự Toán Phí Lăn Bánh & Trả Góp
          </h2>
          <p className="text-zinc-400 mt-4 text-base sm:text-lg">
            Tính toán chính xác mọi khoản thuế phí nhà nước và lịch trả góp ngân hàng hàng tháng
            cho chiếc Mazda CX-5 của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Controls & Configuration */}
          <div className="lg:col-span-7 bg-mazda-dark-900 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            {/* Step 1: Chọn phiên bản */}
            <div className="mb-6">
              <label htmlFor={versionSelectId} className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-semibold">
                1. Chọn phiên bản xe Mazda CX-5
              </label>
              <select
                id={versionSelectId}
                value={selectedVersionName}
                onChange={(e) => setSelectedVersionName(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-mazda-red"
              >
                {CX5_VERSIONS.map((v) => (
                  <option key={v.id} value={v.name} className="bg-mazda-dark-900 text-white">
                    {v.name} — {formatVND(v.priceVnd)}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Chọn khu vực lăn bánh */}
            <div className="mb-8">
              <label htmlFor={citySelectId} className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-semibold">
                2. Nơi đăng ký biển số (Thuế trước bạ & biển số)
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setRegion("hanoi")}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    region === "hanoi"
                      ? "bg-mazda-red text-white border-mazda-red shadow-lg"
                      : "bg-white/5 text-zinc-300 border-white/10 hover:border-white/20"
                  }`}
                >
                  Hà Nội (12%)
                </button>
                <button
                  type="button"
                  onClick={() => setRegion("hcm")}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    region === "hcm"
                      ? "bg-mazda-red text-white border-mazda-red shadow-lg"
                      : "bg-white/5 text-zinc-300 border-white/10 hover:border-white/20"
                  }`}
                >
                  TP. HCM (10%)
                </button>
                <button
                  type="button"
                  onClick={() => setRegion("other")}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    region === "other"
                      ? "bg-mazda-red text-white border-mazda-red shadow-lg"
                      : "bg-white/5 text-zinc-300 border-white/10 hover:border-white/20"
                  }`}
                >
                  Tỉnh Khác (10%)
                </button>
              </div>
            </div>

            {/* Bảng chi tiết lệ phí lăn bánh */}
            <div className="bg-white/5 rounded-2xl p-5 border border-white/5 mb-8">
              <h4 className="text-xs uppercase font-mono text-zinc-400 font-bold mb-3 flex items-center justify-between">
                <span>Chi tiết các khoản phí bắt buộc</span>
                <span className="text-mazda-gold font-sans font-bold">Biển số: {formatVND(licensePlateFee)}</span>
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-zinc-300 py-1 border-b border-white/5">
                  <span>Giá niêm yết xe:</span>
                  <span className="font-semibold text-white">{formatVND(listedPrice)}</span>
                </div>
                <div className="flex justify-between text-zinc-300 py-1 border-b border-white/5">
                  <span>Thuế trước bạ ({registrationTaxRate * 100}%):</span>
                  <span className="font-semibold text-white">{formatVND(registrationTax)}</span>
                </div>
                <div className="flex justify-between text-zinc-300 py-1 border-b border-white/5">
                  <span>Phí cấp biển số:</span>
                  <span className="font-semibold text-white">{formatVND(licensePlateFee)}</span>
                </div>
                <div className="flex justify-between text-zinc-300 py-1 border-b border-white/5">
                  <span>Phí sử dụng đường bộ (1 năm):</span>
                  <span className="font-semibold text-white">{formatVND(roadMaintenanceFee)}</span>
                </div>
                <div className="flex justify-between text-zinc-300 py-1 border-b border-white/5">
                  <span>Bảo hiểm TNDS (1 năm) & Đăng kiểm:</span>
                  <span className="font-semibold text-white">{formatVND(civilInsuranceFee + inspectionFee)}</span>
                </div>
                <div className="flex justify-between text-white font-bold pt-2 text-sm">
                  <span className="text-mazda-red-glow">Tổng giá lăn bánh ước tính:</span>
                  <span className="text-xl font-mono text-mazda-red-glow">{formatVND(totalOnRoadPrice)}</span>
                </div>
              </div>
            </div>

            {/* Step 3: Tính toán trả góp */}
            <div className="border-t border-white/10 pt-6">
              <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-mazda-gold" />
                Dự toán gói vay mua trả góp ngân hàng
              </h4>

              {/* Tỷ lệ trả trước Slider */}
              <div className="mb-5">
                <div className="flex justify-between text-xs mb-1.5">
                  <label htmlFor={downPaymentRangeId} className="text-zinc-300 font-medium">Tỷ lệ trả trước ban đầu:</label>
                  <span className="text-mazda-gold font-bold font-mono">{downPaymentPercent}% ({formatVND(Math.round(listedPrice * downPaymentPercent / 100))})</span>
                </div>
                <input
                  id={downPaymentRangeId}
                  type="range"
                  min="20"
                  max="80"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-mazda-red cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                  <span>Tối thiểu 20%</span>
                  <span>50%</span>
                  <span>Tối đa 80%</span>
                </div>
              </div>

              {/* Thời gian vay Slider */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <label htmlFor={loanTermRangeId} className="text-zinc-300 font-medium">Thời gian vay vốn:</label>
                  <span className="text-mazda-gold font-bold font-mono">{loanYears} Năm ({loanYears * 12} tháng)</span>
                </div>
                <input
                  id={loanTermRangeId}
                  type="range"
                  min="1"
                  max="7"
                  step="1"
                  value={loanYears}
                  onChange={(e) => setLoanYears(Number(e.target.value))}
                  className="w-full accent-mazda-red cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                  <span>1 Năm</span>
                  <span>4 Năm</span>
                  <span>7 Năm (Tối đa)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Loan Summary & Lead Generation Form (Supabase) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Installment Summary Card */}
            <div className="bg-gradient-to-br from-mazda-red-dark via-mazda-dark-850 to-mazda-dark-900 border border-mazda-red/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-mazda-red/20 rounded-full blur-3xl pointer-events-none" />

              <span className="text-xs uppercase tracking-widest text-zinc-300 font-mono font-semibold">
                Bảng Tóm Tắt Trả Góp
              </span>
              <div className="mt-4 mb-6">
                <span className="text-xs text-zinc-300">Gốc + lãi ước tính tháng đầu tiên:</span>
                <div className="text-3xl sm:text-4xl font-black text-white font-mono mt-1">
                  {formatVND(estimatedFirstMonthPayment)}
                  <span className="text-xs text-zinc-400 font-normal ml-2">/ tháng</span>
                </div>
                <span className="text-[11px] text-zinc-400 block mt-1">
                  * Tiền lãi giảm dần theo dư nợ thực tế các tháng tiếp theo.
                </span>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                <div className="flex justify-between text-zinc-200">
                  <span>Số tiền ngân hàng giải ngân:</span>
                  <span className="font-bold text-white font-mono">{formatVND(loanAmount)}</span>
                </div>
                <div className="flex justify-between text-zinc-200">
                  <span>Tiền cần trả ban đầu (Gồm lăn bánh):</span>
                  <span className="font-bold text-mazda-gold font-mono">{formatVND(totalInitialPayment)}</span>
                </div>
                <div className="flex justify-between text-zinc-200">
                  <span>Lãi suất ưu đãi tạm tính:</span>
                  <span className="font-bold text-emerald-400">7.9% / năm</span>
                </div>
              </div>
            </div>

            {/* Send Quote Request Form (Supabase Connected) */}
            <div className="bg-mazda-dark-900 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-mazda-red-glow" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Nhận Bảng Tính Chi Tiết Qua Zalo / Email
                </h3>
              </div>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                Để lại số điện thoại để chuyên viên tư vấn tài chính gửi trọn bộ file Excel tính lãi suất
                và các gói vay ưu đãi từ 5 ngân hàng lớn.
              </p>

              <form onSubmit={handleSubmitQuote} className="space-y-3">
                <div>
                  <label htmlFor={quoteNameId} className="sr-only">Họ và tên quý khách</label>
                  <input
                    id={quoteNameId}
                    type="text"
                    placeholder="Họ và tên quý khách *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-mazda-red"
                  />
                </div>

                <div>
                  <label htmlFor={quotePhoneId} className="sr-only">Số điện thoại / Zalo</label>
                  <input
                    id={quotePhoneId}
                    type="tel"
                    placeholder="Số điện thoại / Zalo *"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-mazda-red"
                  />
                </div>

                {submitMessage && (
                  <div
                    className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                      submitMessage.isError
                        ? "bg-red-500/10 text-red-300 border border-red-500/20"
                        : "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                    }`}
                  >
                    {submitMessage.isError ? (
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    )}
                    <span>{submitMessage.text}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-mazda-red to-red-600 hover:from-red-600 hover:to-red-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Đang gửi yêu cầu..." : "Gửi Bảng Tính Báo Giá"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
