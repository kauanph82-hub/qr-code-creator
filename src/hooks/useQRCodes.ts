import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type { QRCustomization, QRType } from '@/types/qr';
import type { Json } from '@/integrations/supabase/types';

interface QRCodeRecord {
  id: string;
  short_id: string;
  type: string;
  content: string;
  destination_url: string | null;
  customization: Partial<QRCustomization>;
  name: string | null;
  is_active: boolean | null;
  is_dynamic: boolean | null;
  total_scans: number | null;
  unique_scans: number | null;
  last_scan_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export const useQRCodes = () => {
  const { user } = useAuth();
  const [qrCodes, setQrCodes] = useState<QRCodeRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchQRCodes = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const mappedData: QRCodeRecord[] = (data || []).map(item => ({
        ...item,
        customization: (item.customization as Partial<QRCustomization>) || {}
      }));
      
      setQrCodes(mappedData);
    } catch (error) {
      console.error('Error fetching QR codes:', error);
      toast.error('Erro ao carregar QR Codes');
    } finally {
      setLoading(false);
    }
  };

  const createQRCode = async (
    type: QRType,
    content: string,
    customization: QRCustomization,
    name?: string,
    destinationUrl?: string
  ) => {
    if (!user) {
      toast.error('Faça login para salvar seus QR Codes');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('qr_codes')
        .insert({
          user_id: user.id,
          type,
          content,
          destination_url: destinationUrl || content,
          customization: customization as unknown as Json,
          name: name || null,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('QR Code salvo com sucesso!');
      await fetchQRCodes();
      
      return {
        ...data,
        customization: (data.customization as Partial<QRCustomization>) || {}
      };
    } catch (error) {
      console.error('Error creating QR code:', error);
      toast.error('Erro ao salvar QR Code');
      return null;
    }
  };

  const deleteQRCode = async (id: string) => {
    try {
      const { error } = await supabase
        .from('qr_codes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('QR Code excluído');
      await fetchQRCodes();
    } catch (error) {
      console.error('Error deleting QR code:', error);
      toast.error('Erro ao excluir QR Code');
    }
  };

  useEffect(() => {
    if (user) {
      fetchQRCodes();
    } else {
      setQrCodes([]);
    }
  }, [user]);

  return {
    qrCodes,
    loading,
    createQRCode,
    deleteQRCode,
    refreshQRCodes: fetchQRCodes,
  };
};
