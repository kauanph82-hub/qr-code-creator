import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { QrCode, Loader2, AlertCircle } from 'lucide-react';

const QRRedirect = () => {
  const { shortId } = useParams<{ shortId: string }>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trackAndRedirect = async () => {
      if (!shortId) {
        setError('QR Code não encontrado');
        setLoading(false);
        return;
      }

      try {
        // Get QR code using the security definer function
        const { data: qrData, error: qrError } = await supabase
          .rpc('get_qr_by_short_id', { p_short_id: shortId });

        if (qrError || !qrData || qrData.length === 0) {
          setError('QR Code não encontrado ou inativo');
          setLoading(false);
          return;
        }

        const qrCode = qrData[0];

        // Get device info
        const userAgent = navigator.userAgent;
        const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent);
        const isTablet = /iPad|Tablet/.test(userAgent);
        
        let deviceType = 'desktop';
        if (isMobile && !isTablet) deviceType = 'mobile';
        if (isTablet) deviceType = 'tablet';

        let os = 'Unknown';
        if (/Windows/.test(userAgent)) os = 'Windows';
        else if (/Mac/.test(userAgent)) os = 'MacOS';
        else if (/Linux/.test(userAgent)) os = 'Linux';
        else if (/Android/.test(userAgent)) os = 'Android';
        else if (/iPhone|iPad/.test(userAgent)) os = 'iOS';

        let browser = 'Unknown';
        if (/Chrome/.test(userAgent) && !/Edg/.test(userAgent)) browser = 'Chrome';
        else if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) browser = 'Safari';
        else if (/Firefox/.test(userAgent)) browser = 'Firefox';
        else if (/Edg/.test(userAgent)) browser = 'Edge';

        // Record the scan (without auth - using permissive INSERT policy)
        await supabase.from('scans').insert({
          qr_code_id: qrCode.id,
          device_type: deviceType,
          os,
          browser,
          user_agent: userAgent,
          referrer: document.referrer || null,
        });

        // Get destination URL
        const destinationUrl = qrCode.destination_url || qrCode.content;

        // Redirect to destination
        if (destinationUrl) {
          // Ensure URL has protocol
          let finalUrl = destinationUrl;
          if (!/^https?:\/\//i.test(finalUrl) && !finalUrl.startsWith('mailto:') && !finalUrl.startsWith('tel:')) {
            finalUrl = 'https://' + finalUrl;
          }
          
          window.location.href = finalUrl;
        } else {
          setError('URL de destino não configurada');
          setLoading(false);
        }
      } catch (err) {
        console.error('Error in redirect:', err);
        setError('Erro ao processar QR Code');
        setLoading(false);
      }
    };

    trackAndRedirect();
  }, [shortId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
          <p className="text-muted-foreground">Redirecionando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">QR Code Inválido</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <a 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <QrCode className="w-5 h-5" />
            Criar um QR Code
          </a>
        </div>
      </div>
    );
  }

  return null;
};

export default QRRedirect;
