-- ===========================================
-- QR Generator Pro - Database Schema
-- Compatible with Neon Postgres / Vercel
-- ===========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================================
-- USERS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    google_id VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    avatar_url TEXT,
    plan VARCHAR(50) DEFAULT 'free', -- 'free', 'pro', 'enterprise'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);

-- ===========================================
-- QR CODES TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS qr_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    short_id VARCHAR(10) UNIQUE NOT NULL, -- Short ID for tracking URL (e.g., /q/abc123)
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- QR Code Content
    type VARCHAR(50) NOT NULL, -- 'url', 'wifi', 'text', 'vcard', 'email', 'whatsapp', 'sms', 'pdf', 'social'
    content TEXT NOT NULL, -- The actual content/data encoded
    destination_url TEXT, -- For URL-based QR codes
    
    -- Customization
    fg_color VARCHAR(20) DEFAULT '#000000',
    bg_color VARCHAR(20) DEFAULT '#ffffff',
    dot_style VARCHAR(50) DEFAULT 'square', -- 'square', 'rounded', 'dots', 'classy', 'classy-rounded'
    corner_style VARCHAR(50) DEFAULT 'square',
    error_level CHAR(1) DEFAULT 'H',
    logo_url TEXT,
    logo_size INTEGER DEFAULT 60,
    frame_style VARCHAR(50), -- 'none', 'bottom-text', 'top-text', 'full-border'
    frame_text VARCHAR(100),
    frame_color VARCHAR(20),
    frame_text_color VARCHAR(20),
    
    -- Metadata
    name VARCHAR(255), -- User-friendly name for the QR
    is_active BOOLEAN DEFAULT true,
    is_dynamic BOOLEAN DEFAULT true, -- Dynamic = trackable
    
    -- Stats (denormalized for performance)
    total_scans INTEGER DEFAULT 0,
    unique_scans INTEGER DEFAULT 0,
    last_scan_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_qr_codes_user_id ON qr_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_qr_codes_short_id ON qr_codes(short_id);
CREATE INDEX IF NOT EXISTS idx_qr_codes_type ON qr_codes(type);

-- ===========================================
-- SCANS TABLE (Analytics)
-- ===========================================
CREATE TABLE IF NOT EXISTS scans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    qr_code_id UUID REFERENCES qr_codes(id) ON DELETE CASCADE,
    
    -- Tracking Data
    ip_hash VARCHAR(64), -- Anonymized IP (hashed)
    country VARCHAR(100),
    city VARCHAR(100),
    region VARCHAR(100),
    
    -- Device Info
    device_type VARCHAR(50), -- 'mobile', 'tablet', 'desktop'
    os VARCHAR(100), -- 'iOS', 'Android', 'Windows', 'MacOS', 'Linux'
    browser VARCHAR(100), -- 'Chrome', 'Safari', 'Firefox', etc.
    user_agent TEXT,
    
    -- Referrer
    referrer TEXT,
    
    -- Timestamp
    scanned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_scans_qr_code_id ON scans(qr_code_id);
CREATE INDEX IF NOT EXISTS idx_scans_scanned_at ON scans(scanned_at);
CREATE INDEX IF NOT EXISTS idx_scans_country ON scans(country);
CREATE INDEX IF NOT EXISTS idx_scans_device_type ON scans(device_type);

-- ===========================================
-- SESSIONS TABLE (For tracking unique scans)
-- ===========================================
CREATE TABLE IF NOT EXISTS scan_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    qr_code_id UUID REFERENCES qr_codes(id) ON DELETE CASCADE,
    visitor_hash VARCHAR(64) NOT NULL, -- Hash of IP + User Agent
    first_scan_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_scan_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    scan_count INTEGER DEFAULT 1,
    UNIQUE(qr_code_id, visitor_hash)
);

CREATE INDEX IF NOT EXISTS idx_scan_sessions_qr_code ON scan_sessions(qr_code_id);

-- ===========================================
-- FUNCTIONS
-- ===========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_qr_codes_updated_at BEFORE UPDATE ON qr_codes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment scan counts
CREATE OR REPLACE FUNCTION increment_scan_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE qr_codes 
    SET 
        total_scans = total_scans + 1,
        last_scan_at = NOW()
    WHERE id = NEW.qr_code_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_increment_scan AFTER INSERT ON scans
    FOR EACH ROW EXECUTE FUNCTION increment_scan_count();

-- ===========================================
-- VIEWS FOR ANALYTICS
-- ===========================================

-- Daily scans view
CREATE OR REPLACE VIEW daily_scans AS
SELECT 
    qr_code_id,
    DATE(scanned_at) as scan_date,
    COUNT(*) as total_scans,
    COUNT(DISTINCT ip_hash) as unique_scans
FROM scans
GROUP BY qr_code_id, DATE(scanned_at)
ORDER BY scan_date DESC;

-- Device breakdown view
CREATE OR REPLACE VIEW device_breakdown AS
SELECT 
    qr_code_id,
    device_type,
    os,
    COUNT(*) as scan_count
FROM scans
GROUP BY qr_code_id, device_type, os
ORDER BY scan_count DESC;

-- Country breakdown view
CREATE OR REPLACE VIEW country_breakdown AS
SELECT 
    qr_code_id,
    country,
    COUNT(*) as scan_count
FROM scans
GROUP BY qr_code_id, country
ORDER BY scan_count DESC;
