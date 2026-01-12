-- Remove the overly permissive SELECT policy and replace with a more specific one
DROP POLICY IF EXISTS "Anyone can read QR by short_id" ON public.qr_codes;

-- Create a function to allow reading QR codes by short_id (for redirect)
CREATE OR REPLACE FUNCTION public.get_qr_by_short_id(p_short_id TEXT)
RETURNS TABLE (
    id UUID,
    short_id TEXT,
    type TEXT,
    content TEXT,
    destination_url TEXT,
    is_active BOOLEAN
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT 
        qr_codes.id,
        qr_codes.short_id,
        qr_codes.type,
        qr_codes.content,
        qr_codes.destination_url,
        qr_codes.is_active
    FROM public.qr_codes
    WHERE qr_codes.short_id = p_short_id AND qr_codes.is_active = true
    LIMIT 1;
$$;