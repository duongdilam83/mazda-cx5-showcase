import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      phone,
      versionName,
      registrationCity,
      downPaymentPercent,
      loanTermYears,
      estimatedMonthlyPayment,
    } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: "Vui lòng nhập đầy đủ họ tên và số điện thoại." },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

    const isConfigured = Boolean(
      supabaseUrl &&
        supabaseAnonKey &&
        !supabaseUrl.includes("your-project-id") &&
        !supabaseAnonKey.includes("your-supabase-anon-key")
    );

    if (!isConfigured) {
      return NextResponse.json({
        success: true,
        isMock: true,
        message: "Yêu cầu báo giá thành công (Chế độ Xem trước)! Tư vấn viên sẽ liên hệ gửi bảng tính chi tiết.",
        data: {
          id: "demo-quote-" + Date.now(),
          full_name: fullName,
          phone,
          version_name: versionName,
        },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase.from("price_quotes").insert([
      {
        full_name: fullName,
        phone,
        version_name: versionName,
        registration_city: registrationCity || "Hà Nội",
        down_payment_percent: downPaymentPercent || 20,
        loan_term_years: loanTermYears || 5,
        estimated_monthly_payment: estimatedMonthlyPayment || null,
        status: "pending",
      },
    ]).select();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: error.message || "Lỗi lưu dữ liệu báo giá vào Supabase" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      isMock: false,
      message: "Yêu cầu báo giá thành công! Bảng tính lăn bánh chi tiết đã được chuyển tiếp đến đại lý.",
      data: data?.[0],
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
