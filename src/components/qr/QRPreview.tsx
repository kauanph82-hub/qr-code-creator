import { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Share2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { QRCustomization, FrameStyle } from '@/types/qr';

interface QRPreviewProps {
  value: string;
  customization: QRCustomization;
  onDownload: () => void;
}

export const QRPreview = ({ value, customization, onDownload }: QRPreviewProps) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const handleCopyLink = async () => {
    if (value) {
      await navigator.clipboard.writeText(value);
      toast.success('Link copiado para a área de transferência!');
    }
  };

  const handleShare = async () => {
    if (navigator.share && value) {
      try {
        await navigator.share({
          title: 'QR Code',
          text: 'Confira este QR Code',
          url: value,
        });
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const renderFrame = (frameStyle: FrameStyle) => {
    if (frameStyle === 'none' || !customization.frameText) return null;

    const textStyle = {
      color: customization.frameTextColor || '#ffffff',
      backgroundColor: customization.frameColor || '#000000',
    };

    switch (frameStyle) {
      case 'bottom-text':
        return (
          <div 
            className="absolute -bottom-10 left-0 right-0 py-2 px-4 text-center font-bold text-sm rounded-b-lg"
            style={textStyle}
          >
            {customization.frameText}
          </div>
        );
      case 'top-text':
        return (
          <div 
            className="absolute -top-10 left-0 right-0 py-2 px-4 text-center font-bold text-sm rounded-t-lg"
            style={textStyle}
          >
            {customization.frameText}
          </div>
        );
      case 'full-border':
        return (
          <>
            <div 
              className="absolute -top-10 left-0 right-0 py-2 px-4 text-center font-bold text-sm rounded-t-lg"
              style={textStyle}
            >
              {customization.frameText}
            </div>
            <div 
              className="absolute inset-0 border-4 rounded-lg pointer-events-none"
              style={{ borderColor: customization.frameColor || '#000000' }}
            />
          </>
        );
      case 'banner':
        return (
          <div 
            className="absolute -bottom-12 left-1/2 -translate-x-1/2 py-2 px-6 text-center font-bold text-sm rounded-full whitespace-nowrap shadow-lg"
            style={textStyle}
          >
            {customization.frameText}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* QR Code Display */}
      <div 
        ref={qrRef}
        className="relative p-4"
        style={{ 
          marginTop: customization.frameStyle === 'top-text' || customization.frameStyle === 'full-border' ? '40px' : '0',
          marginBottom: customization.frameStyle === 'bottom-text' || customization.frameStyle === 'full-border' ? '40px' : customization.frameStyle === 'banner' ? '48px' : '0'
        }}
      >
        <div 
          className="p-6 rounded-2xl shadow-2xl relative"
          style={{ backgroundColor: customization.bgColor }}
        >
          {value ? (
            <QRCodeCanvas
              value={value}
              size={220}
              level={customization.errorLevel}
              fgColor={customization.fgColor}
              bgColor={customization.bgColor}
              imageSettings={customization.logoUrl ? {
                src: customization.logoUrl,
                height: customization.logoSize,
                width: customization.logoSize,
                excavate: true,
              } : undefined}
            />
          ) : (
            <div 
              className="w-[220px] h-[220px] flex items-center justify-center border-2 border-dashed rounded-xl"
              style={{ borderColor: customization.fgColor + '40' }}
            >
              <p className="text-sm text-center px-4" style={{ color: customization.fgColor + '80' }}>
                Preencha os dados para gerar seu QR Code
              </p>
            </div>
          )}
          {renderFrame(customization.frameStyle)}
        </div>
      </div>

      {/* Actions */}
      {value && (
        <div className="flex flex-wrap items-center justify-center gap-3 w-full">
          <Button
            onClick={onDownload}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium gap-2 px-6"
          >
            <Download className="w-4 h-4" />
            Baixar PNG
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            className="border-border/50 text-foreground hover:bg-secondary/50 gap-2"
          >
            <Share2 className="w-4 h-4" />
            Compartilhar
          </Button>
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="border-border/50 text-foreground hover:bg-secondary/50 gap-2"
          >
            <Copy className="w-4 h-4" />
            Copiar Link
          </Button>
        </div>
      )}
    </div>
  );
};
