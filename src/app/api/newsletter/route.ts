import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Vui lòng nhập địa chỉ email hợp lệ." },
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
        message: "Đăng ký nhận tin thành công! Cảm ơn quý khách.",
      });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { error } = await supabase.from("newsletter_subscribers").upsert([
      {
        email: email.trim().toLowerCase(),
        source: "landing_page_footer",
      },
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Đăng ký nhận tin khuyến mãi thành công!",
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Đã xảy ra lỗi";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
