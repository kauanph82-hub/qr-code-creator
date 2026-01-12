import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, QrCode, Link2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const QRGenerator = () => {
  const [inputValue, setInputValue] = useState('');
  const [qrValue, setQrValue] = useState('');
  const qrRef = useRef<HTMLDivElement>(null);

  const handleGenerate = () => {
    if (inputValue.trim()) {
      setQrValue(inputValue.trim());
    }
  };

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = url;
      link.click();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  };

  return (
    <div className="glass-card p-8 md:p-12 w-full max-w-xl mx-auto relative overflow-hidden">
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
            <h2 className="text-xl font-semibold text-foreground">Gerar QR Code</h2>
            <p className="text-sm text-muted-foreground">Cole seu link ou texto abaixo</p>
          </div>
        </div>

        {/* Input Section */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="https://exemplo.com ou qualquer texto..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-12 h-14 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 input-glow transition-all duration-300"
            />
          </div>
          
          <Button 
            onClick={handleGenerate}
            disabled={!inputValue.trim()}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Gerar QR Code
          </Button>
        </div>

        {/* QR Code Display */}
        {qrValue && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col items-center gap-6">
              <div 
                ref={qrRef}
                className="p-6 bg-foreground rounded-2xl glow-effect animate-float"
              >
                <QRCodeCanvas
                  value={qrValue}
                  size={200}
                  level="H"
                  includeMargin={false}
                  bgColor="#fafafa"
                  fgColor="#0f1419"
                />
              </div>
              
              <div className="text-center space-y-3 w-full">
                <p className="text-sm text-muted-foreground font-mono truncate max-w-full px-4">
                  {qrValue}
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
  );
};

export default QRGenerator;
