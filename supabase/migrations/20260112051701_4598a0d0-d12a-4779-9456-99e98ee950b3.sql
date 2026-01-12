-- ===========================================
-- PROFILES TABLE (linked to auth.users)
-- ===========================================
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    name TEXT,
    avatar_url TEXT,
    plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ===========================================
-- QR CODES TABLE
-- ===========================================
CREATE TABLE public.qr_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    short_id TEXT UNIQUE NOT NULL DEFAULT substr(md5(random()::text), 1, 8),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- QR Code Content
    type TEXT NOT NULL DEFAULT 'url',
    content TEXT NOT NULL,
    destination_url TEXT,
    
    -- Customization (stored as JSONB)
    customization JSONB DEFAULT '{}',
    
    -- Metadata
    name TEXT,
    is_active BOOLEAN DEFAULT true,
    is_dynamic BOOLEAN DEFAULT true,
    
    -- Stats (denormalized for performance)
    total_scans INTEGER DEFAULT 0,
    unique_scans INTEGER DEFAULT 0,
    last_scan_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.qr_codes ENABLE ROW LEVEL SECURITY;

-- QR Codes policies
CREATE POLICY "Users can view their own QR codes"
ON public.qr_codes FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own QR codes"
ON public.qr_codes FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own QR codes"
ON public.qr_codes FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own QR codes"
ON public.qr_codes FOR DELETE
USING (auth.uid() = user_id);

-- Public can read QR codes by short_id (for redirect)
CREATE POLICY "Anyone can read QR by short_id"
ON public.qr_codes FOR SELECT
USING (true);

-- Indexes
CREATE INDEX idx_qr_codes_user_id ON public.qr_codes(user_id);
CREATE INDEX idx_qr_codes_short_id ON public.qr_codes(short_id);

-- ===========================================
-- SCANS TABLE (Analytics)
-- ===========================================
CREATE TABLE public.scans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    qr_code_id UUID REFERENCES public.qr_codes(id) ON DELETE CASCADE,
    
    -- Tracking Data
    ip_hash TEXT,
    country TEXT,
    city TEXT,
    region TEXT,
    
    -- Device Info
    device_type TEXT,
    os TEXT,
    browser TEXT,
    user_agent TEXT,
    
    -- Referrer
    referrer TEXT,
    
    -- Timestamp
    scanned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;

-- Scans policies - users can view scans for their QR codes
CREATE POLICY "Users can view scans for their QR codes"
ON public.scans FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.qr_codes
        WHERE qr_codes.id = scans.qr_code_id
        AND qr_codes.user_id = auth.uid()
    )
);

-- Allow inserting scans (for tracking - no auth required)
CREATE POLICY "Anyone can insert scans"
ON public.scans FOR INSERT
WITH CHECK (true);

-- Indexes
CREATE INDEX idx_scans_qr_code_id ON public.scans(qr_code_id);
CREATE INDEX idx_scans_scanned_at ON public.scans(scanned_at);

-- ===========================================
-- FUNCTION: Increment scan count
-- ===========================================
CREATE OR REPLACE FUNCTION public.increment_scan_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.qr_codes 
    SET 
        total_scans = total_scans + 1,
        last_scan_at = NOW()
    WHERE id = NEW.qr_code_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trigger_increment_scan 
AFTER INSERT ON public.scans
FOR EACH ROW EXECUTE FUNCTION public.increment_scan_count();

-- ===========================================
-- FUNCTION: Update timestamp
-- ===========================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at 
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_qr_codes_updated_at 
BEFORE UPDATE ON public.qr_codes
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();