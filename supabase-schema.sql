-- ============================================================
-- SUPABASE SCHEMA — IDEMPOTENT (aman dijalankan berkali-kali)
-- Autentikasi, CRUD & Sistem Poin/Tier Member
-- ============================================================

-- ============================================================
-- 1. ENUM (hanya dibuat jika belum ada)
-- ============================================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('Admin', 'Member', 'Guest');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'member_tier') THEN
    CREATE TYPE member_tier AS ENUM ('Bronze', 'Silver', 'Gold');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_status') THEN
    CREATE TYPE order_status AS ENUM ('Pending', 'Completed', 'Cancelled');
  END IF;
END;
$$;

-- ============================================================
-- 2. TABEL (CREATE IF NOT EXISTS)
-- ============================================================

-- PROFILES (Ekstensi dari auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT NOT NULL,
    role user_role DEFAULT 'Member'::user_role NOT NULL,
    points INT DEFAULT 0 NOT NULL,
    tier member_tier DEFAULT 'Bronze'::member_tier NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CUSTOMERS (Manajemen data customer oleh Admin)
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PRODUCTS
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(12, 2) NOT NULL,
    stock INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ORDERS
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    total_amount NUMERIC(12, 2) DEFAULT 0.00 NOT NULL,
    status order_status DEFAULT 'Pending'::order_status NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ORDER ITEMS (Detail item dalam pesanan)
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE RESTRICT NOT NULL,
    quantity INT NOT NULL,
    price NUMERIC(12, 2) NOT NULL
);

-- ============================================================
-- 3. TRIGGER & FUNCTION (DROP IF EXISTS dulu)
-- ============================================================

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_order_status_completed ON public.orders;

-- Auto-create profile saat register (dengan error handling)
-- Jika gagal, user tetap terdaftar — profile dibuat via client fallback
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  BEGIN
    INSERT INTO public.profiles (id, full_name, role, points, tier)
    VALUES (
      new.id,
      COALESCE(new.raw_user_meta_data->>'full_name', 'New Member'),
      'Member'::user_role,
      0,
      'Bronze'::member_tier
    );
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'handle_new_user skipped for %: %', new.id, SQLERRM;
  END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Kalkulasi poin & tier saat order status = 'Completed'
CREATE OR REPLACE FUNCTION public.calculate_points_and_tier()
RETURNS TRIGGER AS $$
DECLARE
    calculated_points INT;
    total_points INT;
    new_tier member_tier;
BEGIN
    IF (NEW.status = 'Completed'::order_status AND OLD.status != 'Completed'::order_status AND NEW.profile_id IS NOT NULL) THEN
        calculated_points := FLOOR(NEW.total_amount / 10000);

        UPDATE public.profiles
        SET points = points + calculated_points
        WHERE id = NEW.profile_id
        RETURNING points INTO total_points;

        IF total_points >= 500 THEN
            new_tier := 'Gold'::member_tier;
        ELSIF total_points >= 100 THEN
            new_tier := 'Silver'::member_tier;
        ELSE
            new_tier := 'Bronze'::member_tier;
        END IF;

        UPDATE public.profiles SET tier = new_tier WHERE id = NEW.profile_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_order_status_completed
  AFTER UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.calculate_points_and_tier();

-- ============================================================
-- 4. ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Helper function untuk mengambil role user
CREATE OR REPLACE FUNCTION public.get_auth_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- POLICIES: profiles (drop dulu supaya bisa recreate)
DROP POLICY IF EXISTS "Users can view their own profile, Admin can view all" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admin can update profiles" ON public.profiles;

CREATE POLICY "Users can view their own profile, Admin can view all"
ON public.profiles FOR SELECT USING (auth.uid() = id OR public.get_auth_role() = 'Admin');

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Admin can update profiles"
ON public.profiles FOR UPDATE USING (public.get_auth_role() = 'Admin');

-- POLICIES: products
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
DROP POLICY IF EXISTS "Only Admin can modify products" ON public.products;

CREATE POLICY "Anyone can view products"
ON public.products FOR SELECT USING (true);

CREATE POLICY "Only Admin can modify products"
ON public.products FOR ALL USING (public.get_auth_role() = 'Admin');

-- POLICIES: customers
DROP POLICY IF EXISTS "Only Admin can access customer data" ON public.customers;

CREATE POLICY "Only Admin can access customer data"
ON public.customers FOR ALL USING (public.get_auth_role() = 'Admin');

-- POLICIES: orders
DROP POLICY IF EXISTS "Admin can view all orders, Members can view their own" ON public.orders;
DROP POLICY IF EXISTS "Admin and Members can create orders" ON public.orders;
DROP POLICY IF EXISTS "Only Admin can update orders" ON public.orders;

CREATE POLICY "Admin can view all orders, Members can view their own"
ON public.orders FOR SELECT USING (public.get_auth_role() = 'Admin' OR auth.uid() = profile_id);

CREATE POLICY "Admin and Members can create orders"
ON public.orders FOR INSERT WITH CHECK (public.get_auth_role() = 'Admin' OR auth.uid() = profile_id);

CREATE POLICY "Only Admin can update orders"
ON public.orders FOR UPDATE USING (public.get_auth_role() = 'Admin');

-- ============================================================
-- 5. RPC FUNCTIONS (bypass RLS via SECURITY DEFINER)
-- ============================================================

-- Membuat atau mengupdate profile (aman dari RLS blocker)
CREATE OR REPLACE FUNCTION public.upsert_profile(
  p_id UUID,
  p_full_name TEXT,
  p_role user_role DEFAULT 'Member',
  p_points INT DEFAULT 0,
  p_tier member_tier DEFAULT 'Bronze'
)
RETURNS SETOF public.profiles
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, points, tier)
  VALUES (p_id, p_full_name, p_role, p_points, p_tier)
  ON CONFLICT (id) DO UPDATE
  SET full_name = EXCLUDED.full_name,
      role = EXCLUDED.role,
      points = EXCLUDED.points,
      tier = EXCLUDED.tier,
      updated_at = NOW()
  RETURNING *;
END;
$$;

GRANT EXECUTE ON FUNCTION public.upsert_profile TO authenticated;
