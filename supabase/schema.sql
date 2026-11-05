-- ==============================================================================
-- MAZDA CX-5 LANDING PAGE - SUPABASE DATABASE SCHEMA
-- Hướng dẫn: Mở Supabase Dashboard > Project của bạn > SQL Editor > Paste & Run
-- ==============================================================================

-- 1. Bảng lưu trữ đăng ký lái thử (Test Drive Bookings)
CREATE TABLE IF NOT EXISTS public.test_drive_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    version_interest TEXT DEFAULT 'Mazda CX-5 2.0L Premium Exclusive',
    preferred_city TEXT DEFAULT 'Hà Nội',
    preferred_date DATE,
    notes TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Bảng lưu trữ yêu cầu báo giá lăn bánh & tư vấn trả góp (Price Quotes)
CREATE TABLE IF NOT EXISTS public.price_quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    version_name TEXT NOT NULL,
    registration_city TEXT DEFAULT 'Hà Nội',
    down_payment_percent INTEGER DEFAULT 20,
    loan_term_years INTEGER DEFAULT 5,
    estimated_monthly_payment NUMERIC,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'consulted', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Bảng đăng ký nhận tin tức khuyến mãi & brochure (Newsletter Subscribers)
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    source TEXT DEFAULT 'landing_page_footer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- THIẾT LẬP BẢO MẬT ROW LEVEL SECURITY (RLS)
-- Cho phép khách hàng vãng lai (anon) gửi thông tin đăng ký (INSERT),
-- và chỉ Admin / Authenticated mới có thể xem (SELECT/UPDATE/DELETE).
-- ==============================================================================

-- Bật RLS
ALTER TABLE public.test_drive_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Policy cho bảng test_drive_bookings
CREATE POLICY "Cho phép khách hàng gửi đăng ký lái thử"
    ON public.test_drive_bookings
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Admin xem danh sách lái thử"
    ON public.test_drive_bookings
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy cho bảng price_quotes
CREATE POLICY "Cho phép khách hàng yêu cầu báo giá"
    ON public.price_quotes
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Admin xem danh sách báo giá"
    ON public.price_quotes
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy cho bảng newsletter_subscribers
CREATE POLICY "Cho phép đăng ký nhận tin khuyến mãi"
    ON public.newsletter_subscribers
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Admin xem danh sách newsletter"
    ON public.newsletter_subscribers
    FOR SELECT
    TO authenticated
    USING (true);

-- ==============================================================================
-- TẠO CHỈ MỤC (INDEXES) TỐI ƯU TRUY VẤN
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_test_drive_created ON public.test_drive_bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_test_drive_phone ON public.test_drive_bookings(phone);
CREATE INDEX IF NOT EXISTS idx_price_quotes_created ON public.price_quotes(created_at DESC);
