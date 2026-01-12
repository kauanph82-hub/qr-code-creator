import { useState, useRef, useCallback } from 'react';
import { QrCode, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QRTypeBar } from './qr/QRTypeBar';
import { QRInputForms } from './qr/QRInputForms';
import { QRCustomizationTabs } from './qr/QRCustomizationTabs';
import { QRPreview } from './qr/QRPreview';
import type { 
  QRType, QRCustomization, WifiData, VCardData, 
  EmailData, WhatsAppData, SMSData, SocialData, PDFData 
} from '@/types/qr';

const defaultCustomization: QRCustomization = {
  fgColor: '#000000',
  bgColor: '#ffffff',
  dotStyle: 'square',
  cornerStyle: 'square',
  errorLevel: 'H',
  logoUrl: '',
  logoSize: 60,
  frameStyle: 'none',
  frameText: '',
  frameColor: '#000000',
  frameTextColor: '#ffffff',
};

const QRGeneratorPro = () => {
  const [activeType, setActiveType] = useState<QRType>('url');
  const [qrValue, setQrValue] = useState('');
  const qrRef = useRef<HTMLDivElement>(null);
  
  // Input states
  const [urlInput, setUrlInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [wifiData, setWifiData] = useState<WifiData>({ ssid: '', password: '', encryption: 'WPA', hidden: false });
  const [vcardData, setVcardData] = useState<VCardData>({ 
    firstName: '', lastName: '', phone: '', email: '', 
    company: '', title: '', website: '', address: '' 
  });
  const [emailData, setEmailData] = useState<EmailData>({ to: '', subject: '', body: '' });
  const [whatsappData, setWhatsappData] = useState<WhatsAppData>({ phone: '', message: '' });
  const [smsData, setSmsData] = useState<SMSData>({ phone: '', message: '' });
  const [socialData, setSocialData] = useState<SocialData>({ platform: 'instagram', username: '' });
  const [pdfData, setPdfData] = useState<PDFData>({ url: '', name: '' });
  
  // Customization state
  const [customization, setCustomization] = useState<QRCustomization>(defaultCustomization);

  const generateQRValue = useCallback((): string => {
    switch (activeType) {
      case 'url':
        return urlInput.trim();
      case 'text':
        return textInput.trim();
      case 'wifi':
        return `WIFI:T:${wifiData.encryption};S:${wifiData.ssid};P:${wifiData.password};H:${wifiData.hidden};;`;
      case 'vcard':
        return `BEGIN:VCARD
VERSION:3.0
N:${vcardData.lastName};${vcardData.firstName}
FN:${vcardData.firstName} ${vcardData.lastName}
TEL:${vcardData.phone}
EMAIL:${vcardData.email}
ORG:${vcardData.company}
TITLE:${vcardData.title}
URL:${vcardData.website}
ADR:${vcardData.address}
END:VCARD`;
      case 'email':
        return `mailto:${emailData.to}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;
      case 'whatsapp':
        const waMessage = whatsappData.message ? `?text=${encodeURIComponent(whatsappData.message)}` : '';
        return `https://wa.me/${whatsappData.phone}${waMessage}`;
      case 'sms':
        const smsBody = smsData.message ? `?body=${encodeURIComponent(smsData.message)}` : '';
        return `sms:${smsData.phone}${smsBody}`;
      case 'pdf':
        return pdfData.url.trim();
      case 'social':
        const socialUrls: Record<string, string> = {
          instagram: `https://instagram.com/${socialData.username.replace('@', '')}`,
          facebook: `https://facebook.com/${socialData.username.replace('@', '')}`,
          twitter: `https://twitter.com/${socialData.username.replace('@', '')}`,
          linkedin: `https://linkedin.com/in/${socialData.username.replace('@', '')}`,
          tiktok: `https://tiktok.com/@${socialData.username.replace('@', '')}`,
          youtube: `https://youtube.com/@${socialData.username.replace('@', '')}`,
        };
        return socialUrls[socialData.platform] || '';
      default:
        return '';
    }
  }, [activeType, urlInput, textInput, wifiData, vcardData, emailData, whatsappData, smsData, pdfData, socialData]);

  const isInputValid = useCallback((): boolean => {
    switch (activeType) {
      case 'url':
        return urlInput.trim().length > 0;
      case 'text':
        return textInput.trim().length > 0;
      case 'wifi':
        return wifiData.ssid.trim().length > 0;
      case 'vcard':
        return vcardData.firstName.trim().length > 0 || vcardData.lastName.trim().length > 0;
      case 'email':
        return emailData.to.trim().length > 0;
      case 'whatsapp':
        return whatsappData.phone.trim().length > 0;
      case 'sms':
        return smsData.phone.trim().length > 0;
      case 'pdf':
        return pdfData.url.trim().length > 0;
      case 'social':
        return socialData.username.trim().length > 0;
      default:
        return false;
    }
  }, [activeType, urlInput, textInput, wifiData, vcardData, emailData, whatsappData, smsData, pdfData, socialData]);

  const handleGenerate = () => {
    const value = generateQRValue();
    if (value) {
      setQrValue(value);
    }
  };

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `qrcode-${activeType}-${Date.now()}.png`;
      link.href = url;
      link.click();
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* AdSense Top Container */}
      <div 
        id="adsense-top" 
        className="w-full min-h-[250px] bg-secondary/20 border border-dashed border-border/50 rounded-xl flex items-center justify-center"
      >
        <span className="text-muted-foreground text-sm">Espaço para anúncio</span>
      </div>

      <div className="glass-card p-6 md:p-10 relative overflow-hidden">
        {/* Glow effect background */}
        <div className="absolute inset-0 opacity-50 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <QrCode className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Gerador de QR Code Profissional</h2>
              <p className="text-sm text-muted-foreground">Crie QR Codes personalizados em segundos</p>
            </div>
          </div>

          {/* QR Type Bar */}
          <div className="mb-8">
            <QRTypeBar activeType={activeType} onTypeChange={setActiveType} />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Inputs and Customization */}
            <div className="space-y-8">
              {/* Input Form */}
              <div className="p-6 bg-secondary/20 rounded-xl border border-border/30">
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Informações do QR Code
                </h3>
                <QRInputForms
                  activeType={activeType}
                  urlInput={urlInput}
                  setUrlInput={setUrlInput}
                  textInput={textInput}
                  setTextInput={setTextInput}
                  wifiData={wifiData}
                  setWifiData={setWifiData}
                  vcardData={vcardData}
                  setVcardData={setVcardData}
                  emailData={emailData}
                  setEmailData={setEmailData}
                  whatsappData={whatsappData}
                  setWhatsappData={setWhatsappData}
                  smsData={smsData}
                  setSmsData={setSmsData}
                  socialData={socialData}
                  setSocialData={setSocialData}
                  pdfData={pdfData}
                  setPdfData={setPdfData}
                />
              </div>

              {/* Customization Tabs */}
              <div className="p-6 bg-secondary/20 rounded-xl border border-border/30">
                <h3 className="text-lg font-medium text-foreground mb-4">Personalização</h3>
                <QRCustomizationTabs 
                  customization={customization} 
                  onChange={setCustomization} 
                />
              </div>

              {/* Generate Button */}
              <Button 
                onClick={handleGenerate}
                disabled={!isInputValid()}
                size="lg"
                className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Gerar QR Code
              </Button>
            </div>

            {/* Right Column - Preview */}
            <div className="lg:sticky lg:top-8">
              <div className="p-6 bg-secondary/20 rounded-xl border border-border/30">
                <h3 className="text-lg font-medium text-foreground mb-6 text-center">
                  Preview em Tempo Real
                </h3>
                
                {/* AdSense Middle Container */}
                <div 
                  id="adsense-middle" 
                  className="w-full min-h-[250px] bg-secondary/30 border border-dashed border-border/50 rounded-xl flex items-center justify-center mb-6"
                >
                  <span className="text-muted-foreground text-sm">Espaço para anúncio</span>
                </div>

                <div ref={qrRef}>
                  <QRPreview 
                    value={qrValue} 
                    customization={customization}
                    onDownload={handleDownload}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRGeneratorPro;
