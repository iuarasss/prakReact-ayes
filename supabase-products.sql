-- ============================================================
-- SQL PRODUCTS + SEED DATA
-- Copy-paste dan RUN di Supabase SQL Editor
-- ============================================================

-- BUAT TABLE PRODUCTS (jika belum ada)
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(12, 2) NOT NULL,
    stock INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AKTIFKAN RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- POLICIES (idempotent)
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
DROP POLICY IF EXISTS "Only Admin can modify products" ON public.products;

CREATE POLICY "Anyone can view products"
ON public.products FOR SELECT USING (true);

CREATE POLICY "Only Admin can modify products"
ON public.products FOR ALL USING (public.get_auth_role() = 'Admin');

-- ============================================================
-- SEED DATA (10 menu makanan/minuman)
-- Hanya insert jika tabel masih kosong
-- ============================================================
INSERT INTO public.products (name, description, price, stock)
SELECT * FROM (VALUES
    ('Nasi Goreng Spesial',    'Nasi goreng dengan telur, ayam suwir, dan kerupuk',     35000,  50),
    ('Mie Goreng Jawa',        'Mie goreng khas Jawa dengan bumbu rempah pilihan',       30000,  45),
    ('Ayam Bakar Madu',        'Ayam bakar dengan balutan madu dan kecap manis',         45000,  30),
    ('Sate Ayam (10 tusuk)',   'Sate ayam dengan bumbu kacang dan lontong',              40000,  25),
    ('Gado-Gado',              'Sayuran rebus dengan siraman bumbu kacang dan kerupuk',   28000,  40),
    ('Soto Ayam',              'Soto ayam bening dengan suwiran ayam dan telur rebus',    32000,  35),
    ('Es Teh Manis',           'Teh manis segar dengan es batu',                         8000,   100),
    ('Es Jeruk',               'Jeruk peras segar',                                      10000,  80),
    ('Jus Alpukat',            'Jus alpukat segar dengan susu coklat',                    18000,  60),
    ('Air Mineral',            'Air mineral kemasan 600ml',                               5000,   200)
) AS p(name, description, price, stock)
WHERE NOT EXISTS (SELECT 1 FROM public.products LIMIT 1);
