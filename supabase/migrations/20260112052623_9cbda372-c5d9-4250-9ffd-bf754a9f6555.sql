-- Create public SELECT policy for active QR codes only
-- This allows the redirect functionality to work for anonymous users

CREATE POLICY "Public can read active QR codes"
ON public.qr_codes
FOR SELECT
TO anon, authenticated
USING (is_active = true);