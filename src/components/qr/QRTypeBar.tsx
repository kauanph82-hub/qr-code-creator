import { 
  Link2, FileText, Wifi, User, Mail, 
  MessageCircle, MessageSquare, FileDown, Share2 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { QRType } from '@/types/qr';

interface QRTypeBarProps {
  activeType: QRType;
  onTypeChange: (type: QRType) => void;
}

const qrTypes: { type: QRType; icon: typeof Link2; label: string }[] = [
  { type: 'url', icon: Link2, label: 'URL' },
  { type: 'text', icon: FileText, label: 'Texto' },
  { type: 'wifi', icon: Wifi, label: 'Wi-Fi' },
  { type: 'vcard', icon: User, label: 'VCard' },
  { type: 'email', icon: Mail, label: 'E-mail' },
  { type: 'whatsapp', icon: MessageCircle, label: 'WhatsApp' },
  { type: 'sms', icon: MessageSquare, label: 'SMS' },
  { type: 'pdf', icon: FileDown, label: 'PDF' },
  { type: 'social', icon: Share2, label: 'Redes' },
];

export const QRTypeBar = ({ activeType, onTypeChange }: QRTypeBarProps) => {
  return (
    <div className="w-full overflow-x-auto pb-2 -mx-2 px-2">
      <div className="flex items-center gap-1 min-w-max bg-secondary/30 p-1.5 rounded-xl border border-border/30">
        {qrTypes.map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              activeType === type
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
