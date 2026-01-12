import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { 
  Download, QrCode, Link2, Sparkles, Wifi, User, Mail, 
  FileText, Palette, Shield, Image, ChevronDown 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

type QRType = 'url' | 'wifi' | 'text' | 'vcard' | 'email';
type ErrorLevel = 'L' | 'M' | 'Q' | 'H';

interface VCardData {
  name: string;
  phone: string;
  email: string;
  company: string;
}

interface WifiData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
}

interface EmailData {
  to: string;
  subject: string;
  body: string;
}

const QRGenerator = () => {
  const [activeType, setActiveType] = useState<QRType>('url');
  const [qrValue, setQrValue] = useState('');
  const qrRef = useRef<HTMLDivElement>(null);
  
  // Input states
  const [urlInput, setUrlInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [wifiData, setWifiData] = useState<WifiData>({ ssid: '', password: '', encryption: 'WPA' });
  const [vcardData, setVcardData] = useState<VCardData>({ name: '', phone: '', email: '', company: '' });
  const [emailData, setEmailData] = useState<EmailData>({ to: '', subject: '', body: '' });
  
  // Customization states
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [errorLevel, setErrorLevel] = useState<ErrorLevel>('H');
  const [logoUrl, setLogoUrl] = useState('');
  const [showCustomization, setShowCustomization] = useState(false);

  const generateQRValue = (): string => {
    switch (activeType) {
      case 'url':
        return urlInput.trim();
      case 'text':
        return textInput.trim();
      case 'wifi':
        return `WIFI:T:${wifiData.encryption};S:${wifiData.ssid};P:${wifiData.password};;`;
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nN:${vcardData.name}\nTEL:${vcardData.phone}\nEMAIL:${vcardData.email}\nORG:${vcardData.company}\nEND:VCARD`;
      case 'email':
        return `mailto:${emailData.to}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;
      default:
        return '';
    }
  };

  const isInputValid = (): boolean => {
    switch (activeType) {
      case 'url':
        return urlInput.trim().length > 0;
      case 'text':
        return textInput.trim().length > 0;
      case 'wifi':
        return wifiData.ssid.trim().length > 0;
      case 'vcard':
        return vcardData.name.trim().length > 0;
      case 'email':
        return emailData.to.trim().length > 0;
      default:
        return false;
    }
  };

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
      link.download = `qrcode-${activeType}.png`;
      link.href = url;
      link.click();
    }
  };

  const typeConfig = {
    url: { icon: Link2, label: 'URL', description: 'Link para website' },
    wifi: { icon: Wifi, label: 'WiFi', description: 'Dados de rede' },
    text: { icon: FileText, label: 'Texto', description: 'Texto livre' },
    vcard: { icon: User, label: 'VCard', description: 'Cartão de contato' },
    email: { icon: Mail, label: 'E-mail', description: 'Enviar email' },
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* AdSense Top Container */}
      <div 
        id="adsense-top" 
        className="w-full min-h-[250px] bg-secondary/20 border border-dashed border-border/50 rounded-xl flex items-center justify-center"
      >
        <span className="text-muted-foreground text-sm">Espaço para anúncio</span>
      </div>

      <div className="glass-card p-8 md:p-12 relative overflow-hidden">
        {/* Glow effect background */}
        <div className="absolute inset-0 opacity-50 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <QrCode className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Gerador de QR Code Profissional</h2>
              <p className="text-sm text-muted-foreground">Escolha o tipo e personalize seu código</p>
            </div>
          </div>

          {/* Type Selector Tabs */}
          <Tabs value={activeType} onValueChange={(v) => setActiveType(v as QRType)} className="mb-8">
            <TabsList className="grid w-full grid-cols-5 bg-secondary/50">
              {Object.entries(typeConfig).map(([key, config]) => (
                <TabsTrigger 
                  key={key} 
                  value={key}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
                >
                  <config.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{config.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* URL Tab */}
            <TabsContent value="url" className="space-y-4 mt-6">
              <div className="relative">
                <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="url"
                  placeholder="https://exemplo.com"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="pl-12 h-14 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 input-glow"
                />
              </div>
            </TabsContent>

            {/* WiFi Tab */}
            <TabsContent value="wifi" className="space-y-4 mt-6">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="ssid" className="text-foreground">Nome da Rede (SSID)</Label>
                  <Input
                    id="ssid"
                    placeholder="Nome da sua rede WiFi"
                    value={wifiData.ssid}
                    onChange={(e) => setWifiData({ ...wifiData, ssid: e.target.value })}
                    className="h-12 bg-secondary/50 border-border/50 text-foreground mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-foreground">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Senha da rede"
                    value={wifiData.password}
                    onChange={(e) => setWifiData({ ...wifiData, password: e.target.value })}
                    className="h-12 bg-secondary/50 border-border/50 text-foreground mt-2"
                  />
                </div>
                <div>
                  <Label className="text-foreground">Tipo de Criptografia</Label>
                  <Select value={wifiData.encryption} onValueChange={(v) => setWifiData({ ...wifiData, encryption: v as WifiData['encryption'] })}>
                    <SelectTrigger className="h-12 bg-secondary/50 border-border/50 text-foreground mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="WPA">WPA/WPA2</SelectItem>
                      <SelectItem value="WEP">WEP</SelectItem>
                      <SelectItem value="nopass">Sem senha</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            {/* Text Tab */}
            <TabsContent value="text" className="space-y-4 mt-6">
              <div className="relative">
                <FileText className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                <textarea
                  placeholder="Digite qualquer texto que deseja codificar..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="w-full min-h-[120px] pl-12 pr-4 py-3 bg-secondary/50 border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none"
                />
              </div>
            </TabsContent>

            {/* VCard Tab */}
            <TabsContent value="vcard" className="space-y-4 mt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="vcard-name" className="text-foreground">Nome Completo</Label>
                  <Input
                    id="vcard-name"
                    placeholder="João Silva"
                    value={vcardData.name}
                    onChange={(e) => setVcardData({ ...vcardData, name: e.target.value })}
                    className="h-12 bg-secondary/50 border-border/50 text-foreground mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="vcard-phone" className="text-foreground">Telefone</Label>
                  <Input
                    id="vcard-phone"
                    placeholder="+55 11 99999-9999"
                    value={vcardData.phone}
                    onChange={(e) => setVcardData({ ...vcardData, phone: e.target.value })}
                    className="h-12 bg-secondary/50 border-border/50 text-foreground mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="vcard-email" className="text-foreground">E-mail</Label>
                  <Input
                    id="vcard-email"
                    type="email"
                    placeholder="joao@email.com"
                    value={vcardData.email}
                    onChange={(e) => setVcardData({ ...vcardData, email: e.target.value })}
                    className="h-12 bg-secondary/50 border-border/50 text-foreground mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="vcard-company" className="text-foreground">Empresa</Label>
                  <Input
                    id="vcard-company"
                    placeholder="Empresa Ltda"
                    value={vcardData.company}
                    onChange={(e) => setVcardData({ ...vcardData, company: e.target.value })}
                    className="h-12 bg-secondary/50 border-border/50 text-foreground mt-2"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Email Tab */}
            <TabsContent value="email" className="space-y-4 mt-6">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="email-to" className="text-foreground">Destinatário</Label>
                  <Input
                    id="email-to"
                    type="email"
                    placeholder="contato@empresa.com"
                    value={emailData.to}
                    onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
                    className="h-12 bg-secondary/50 border-border/50 text-foreground mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email-subject" className="text-foreground">Assunto</Label>
                  <Input
                    id="email-subject"
                    placeholder="Assunto do email"
                    value={emailData.subject}
                    onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                    className="h-12 bg-secondary/50 border-border/50 text-foreground mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email-body" className="text-foreground">Mensagem</Label>
                  <textarea
                    id="email-body"
                    placeholder="Corpo do email..."
                    value={emailData.body}
                    onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
                    className="w-full min-h-[100px] px-4 py-3 bg-secondary/50 border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none mt-2"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Customization Panel */}
          <Collapsible open={showCustomization} onOpenChange={setShowCustomization} className="mb-6">
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between border-border/50 text-foreground hover:bg-secondary/50">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Personalização Avançada
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${showCustomization ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 p-4 bg-secondary/30 rounded-lg border border-border/30">
                <div>
                  <Label className="text-foreground flex items-center gap-2">
                    <Palette className="w-4 h-4" /> Cor do Código
                  </Label>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-12 h-12 rounded-lg cursor-pointer border border-border/50"
                    />
                    <Input
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="h-12 bg-secondary/50 border-border/50 text-foreground font-mono"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-foreground flex items-center gap-2">
                    <Palette className="w-4 h-4" /> Cor de Fundo
                  </Label>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-12 h-12 rounded-lg cursor-pointer border border-border/50"
                    />
                    <Input
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="h-12 bg-secondary/50 border-border/50 text-foreground font-mono"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-foreground flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Correção de Erro
                  </Label>
                  <Select value={errorLevel} onValueChange={(v) => setErrorLevel(v as ErrorLevel)}>
                    <SelectTrigger className="h-12 bg-secondary/50 border-border/50 text-foreground mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L">L - Baixo (7%)</SelectItem>
                      <SelectItem value="M">M - Médio (15%)</SelectItem>
                      <SelectItem value="Q">Q - Alto (25%)</SelectItem>
                      <SelectItem value="H">H - Máximo (30%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-foreground flex items-center gap-2">
                    <Image className="w-4 h-4" /> Logo (URL)
                  </Label>
                  <Input
                    placeholder="https://..."
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="h-12 bg-secondary/50 border-border/50 text-foreground mt-2"
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* AdSense Middle Container */}
          <div 
            id="adsense-middle" 
            className="w-full min-h-[250px] bg-secondary/20 border border-dashed border-border/50 rounded-xl flex items-center justify-center mb-6"
          >
            <span className="text-muted-foreground text-sm">Espaço para anúncio</span>
          </div>

          {/* Generate Button */}
          <Button 
            onClick={handleGenerate}
            disabled={!isInputValid()}
            className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed mb-8"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Gerar QR Code
          </Button>

          {/* QR Code Display */}
          {qrValue && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col items-center gap-6">
                <div 
                  ref={qrRef}
                  className="p-6 rounded-2xl glow-effect animate-float relative"
                  style={{ backgroundColor: bgColor }}
                >
                  <QRCodeCanvas
                    value={qrValue}
                    size={220}
                    level={errorLevel}
                    includeMargin={false}
                    bgColor={bgColor}
                    fgColor={fgColor}
                    imageSettings={logoUrl ? {
                      src: logoUrl,
                      height: 50,
                      width: 50,
                      excavate: true,
                    } : undefined}
                  />
                </div>
                
                <div className="text-center space-y-3 w-full">
                  <p className="text-sm text-muted-foreground font-mono truncate max-w-full px-4">
                    {qrValue.length > 60 ? qrValue.substring(0, 60) + '...' : qrValue}
                  </p>
                  
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Baixar PNG
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!qrValue && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-32 h-32 rounded-2xl bg-secondary/30 border border-dashed border-border/50 flex items-center justify-center mb-4">
                <QrCode className="w-12 h-12 text-muted-foreground/50" />
              </div>
              <p className="text-muted-foreground text-sm">
                Seu QR Code aparecerá aqui
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
