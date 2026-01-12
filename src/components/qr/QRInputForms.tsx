import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Link2, FileText, Wifi, User, Mail, 
  MessageCircle, MessageSquare, FileDown, Share2,
  Phone, Building, Globe, MapPin, Briefcase
} from 'lucide-react';
import type { 
  QRType, WifiData, VCardData, EmailData, 
  WhatsAppData, SMSData, SocialData, PDFData 
} from '@/types/qr';

interface QRInputFormsProps {
  activeType: QRType;
  urlInput: string;
  setUrlInput: (value: string) => void;
  textInput: string;
  setTextInput: (value: string) => void;
  wifiData: WifiData;
  setWifiData: (data: WifiData) => void;
  vcardData: VCardData;
  setVcardData: (data: VCardData) => void;
  emailData: EmailData;
  setEmailData: (data: EmailData) => void;
  whatsappData: WhatsAppData;
  setWhatsappData: (data: WhatsAppData) => void;
  smsData: SMSData;
  setSmsData: (data: SMSData) => void;
  socialData: SocialData;
  setSocialData: (data: SocialData) => void;
  pdfData: PDFData;
  setPdfData: (data: PDFData) => void;
}

export const QRInputForms = ({
  activeType,
  urlInput, setUrlInput,
  textInput, setTextInput,
  wifiData, setWifiData,
  vcardData, setVcardData,
  emailData, setEmailData,
  whatsappData, setWhatsappData,
  smsData, setSmsData,
  socialData, setSocialData,
  pdfData, setPdfData,
}: QRInputFormsProps) => {
  const inputClasses = "h-12 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20";
  const textareaClasses = "w-full min-h-[100px] px-4 py-3 bg-secondary/50 border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none";

  return (
    <div className="space-y-4">
      {/* URL */}
      {activeType === 'url' && (
        <div className="relative">
          <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="url"
            placeholder="https://seu-site.com"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className={`${inputClasses} pl-12 h-14`}
          />
        </div>
      )}

      {/* Text */}
      {activeType === 'text' && (
        <div className="relative">
          <FileText className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
          <textarea
            placeholder="Digite qualquer texto que deseja codificar..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className={`${textareaClasses} pl-12`}
            rows={4}
          />
        </div>
      )}

      {/* WiFi */}
      {activeType === 'wifi' && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label className="text-foreground mb-2 block">Nome da Rede (SSID)</Label>
            <div className="relative">
              <Wifi className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Nome da sua rede WiFi"
                value={wifiData.ssid}
                onChange={(e) => setWifiData({ ...wifiData, ssid: e.target.value })}
                className={`${inputClasses} pl-12`}
              />
            </div>
          </div>
          <div>
            <Label className="text-foreground mb-2 block">Senha</Label>
            <Input
              type="password"
              placeholder="Senha da rede"
              value={wifiData.password}
              onChange={(e) => setWifiData({ ...wifiData, password: e.target.value })}
              className={inputClasses}
            />
          </div>
          <div>
            <Label className="text-foreground mb-2 block">Criptografia</Label>
            <Select 
              value={wifiData.encryption} 
              onValueChange={(v) => setWifiData({ ...wifiData, encryption: v as WifiData['encryption'] })}
            >
              <SelectTrigger className={inputClasses}>
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
      )}

      {/* VCard */}
      {activeType === 'vcard' && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label className="text-foreground mb-2 block">Nome</Label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="João"
                value={vcardData.firstName}
                onChange={(e) => setVcardData({ ...vcardData, firstName: e.target.value })}
                className={`${inputClasses} pl-12`}
              />
            </div>
          </div>
          <div>
            <Label className="text-foreground mb-2 block">Sobrenome</Label>
            <Input
              placeholder="Silva"
              value={vcardData.lastName}
              onChange={(e) => setVcardData({ ...vcardData, lastName: e.target.value })}
              className={inputClasses}
            />
          </div>
          <div>
            <Label className="text-foreground mb-2 block">Telefone</Label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="+55 11 99999-9999"
                value={vcardData.phone}
                onChange={(e) => setVcardData({ ...vcardData, phone: e.target.value })}
                className={`${inputClasses} pl-12`}
              />
            </div>
          </div>
          <div>
            <Label className="text-foreground mb-2 block">E-mail</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="joao@email.com"
                value={vcardData.email}
                onChange={(e) => setVcardData({ ...vcardData, email: e.target.value })}
                className={`${inputClasses} pl-12`}
              />
            </div>
          </div>
          <div>
            <Label className="text-foreground mb-2 block">Empresa</Label>
            <div className="relative">
              <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Empresa Ltda"
                value={vcardData.company}
                onChange={(e) => setVcardData({ ...vcardData, company: e.target.value })}
                className={`${inputClasses} pl-12`}
              />
            </div>
          </div>
          <div>
            <Label className="text-foreground mb-2 block">Cargo</Label>
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Gerente de Marketing"
                value={vcardData.title}
                onChange={(e) => setVcardData({ ...vcardData, title: e.target.value })}
                className={`${inputClasses} pl-12`}
              />
            </div>
          </div>
          <div>
            <Label className="text-foreground mb-2 block">Website</Label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="https://site.com"
                value={vcardData.website}
                onChange={(e) => setVcardData({ ...vcardData, website: e.target.value })}
                className={`${inputClasses} pl-12`}
              />
            </div>
          </div>
          <div>
            <Label className="text-foreground mb-2 block">Endereço</Label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Rua Exemplo, 123"
                value={vcardData.address}
                onChange={(e) => setVcardData({ ...vcardData, address: e.target.value })}
                className={`${inputClasses} pl-12`}
              />
            </div>
          </div>
        </div>
      )}

      {/* Email */}
      {activeType === 'email' && (
        <div className="grid gap-4">
          <div>
            <Label className="text-foreground mb-2 block">Destinatário</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="contato@empresa.com"
                value={emailData.to}
                onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
                className={`${inputClasses} pl-12`}
              />
            </div>
          </div>
          <div>
            <Label className="text-foreground mb-2 block">Assunto</Label>
            <Input
              placeholder="Assunto do email"
              value={emailData.subject}
              onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
              className={inputClasses}
            />
          </div>
          <div>
            <Label className="text-foreground mb-2 block">Mensagem</Label>
            <textarea
              placeholder="Corpo do email..."
              value={emailData.body}
              onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
              className={textareaClasses}
            />
          </div>
        </div>
      )}

      {/* WhatsApp */}
      {activeType === 'whatsapp' && (
        <div className="grid gap-4">
          <div>
            <Label className="text-foreground mb-2 block">Número do WhatsApp (com código do país)</Label>
            <div className="relative">
              <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="5511999999999"
                value={whatsappData.phone}
                onChange={(e) => setWhatsappData({ ...whatsappData, phone: e.target.value.replace(/\D/g, '') })}
                className={`${inputClasses} pl-12`}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Apenas números, sem espaços ou caracteres especiais</p>
          </div>
          <div>
            <Label className="text-foreground mb-2 block">Mensagem pré-definida (opcional)</Label>
            <textarea
              placeholder="Olá! Gostaria de mais informações..."
              value={whatsappData.message}
              onChange={(e) => setWhatsappData({ ...whatsappData, message: e.target.value })}
              className={textareaClasses}
            />
          </div>
        </div>
      )}

      {/* SMS */}
      {activeType === 'sms' && (
        <div className="grid gap-4">
          <div>
            <Label className="text-foreground mb-2 block">Número de telefone</Label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="+55 11 99999-9999"
                value={smsData.phone}
                onChange={(e) => setSmsData({ ...smsData, phone: e.target.value })}
                className={`${inputClasses} pl-12`}
              />
            </div>
          </div>
          <div>
            <Label className="text-foreground mb-2 block">Mensagem (opcional)</Label>
            <textarea
              placeholder="Sua mensagem de SMS..."
              value={smsData.message}
              onChange={(e) => setSmsData({ ...smsData, message: e.target.value })}
              className={textareaClasses}
            />
          </div>
        </div>
      )}

      {/* PDF */}
      {activeType === 'pdf' && (
        <div className="grid gap-4">
          <div>
            <Label className="text-foreground mb-2 block">URL do PDF</Label>
            <div className="relative">
              <FileDown className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="url"
                placeholder="https://exemplo.com/documento.pdf"
                value={pdfData.url}
                onChange={(e) => setPdfData({ ...pdfData, url: e.target.value })}
                className={`${inputClasses} pl-12`}
              />
            </div>
          </div>
          <div>
            <Label className="text-foreground mb-2 block">Nome do documento (opcional)</Label>
            <Input
              placeholder="Catálogo de produtos"
              value={pdfData.name}
              onChange={(e) => setPdfData({ ...pdfData, name: e.target.value })}
              className={inputClasses}
            />
          </div>
        </div>
      )}

      {/* Social */}
      {activeType === 'social' && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label className="text-foreground mb-2 block">Rede Social</Label>
            <Select 
              value={socialData.platform} 
              onValueChange={(v) => setSocialData({ ...socialData, platform: v as SocialData['platform'] })}
            >
              <SelectTrigger className={inputClasses}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="twitter">Twitter / X</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Label className="text-foreground mb-2 block">Nome de usuário</Label>
            <div className="relative">
              <Share2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="@seuusuario"
                value={socialData.username}
                onChange={(e) => setSocialData({ ...socialData, username: e.target.value })}
                className={`${inputClasses} pl-12`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
