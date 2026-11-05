import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, email, versionInterest, preferredCity, preferredDate, notes } = body;

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
      // Chế độ mô phỏng khi chưa điền API keys
      return NextResponse.json({
        success: true,
        isMock: true,
        message: "Đăng ký thành công (Chế độ Xem trước/Demo)! Để lưu vào Supabase thực tế, vui lòng điền URL và Anon Key trong .env.local",
        data: {
          id: "demo-" + Date.now(),
          full_name: fullName,
          phone,
          email,
          version_interest: versionInterest,
          preferred_city: preferredCity,
          preferred_date: preferredDate,
          created_at: new Date().toISOString(),
        },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase.from("test_drive_bookings").insert([
      {
        full_name: fullName,
        phone,
        email: email || null,
        version_interest: versionInterest || "Mazda CX-5 2.0L Premium Exclusive",
        preferred_city: preferredCity || "Hà Nội",
        preferred_date: preferredDate || null,
        notes: notes || null,
        status: "pending",
      },
    ]).select();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: error.message || "Lỗi lưu dữ liệu vào Supabase" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      isMock: false,
      message: "Đăng ký lái thử thành công! Chuyên viên Mazda sẽ liên hệ quý khách trong ít phút.",
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
