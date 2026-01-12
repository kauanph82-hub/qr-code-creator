import QRGenerator from '@/components/QRGenerator';
import QRGuide from '@/components/QRGuide';
import { QrCode } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="pt-8 pb-4 px-6">
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <QrCode className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-foreground">QR Generator Pro</span>
          </div>
        </header>

        {/* Hero Section */}
        <main className="px-6 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="text-foreground">Crie seu </span>
              <span className="gradient-text">QR Code Profissional</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Gerador completo com personalização de cores, múltiplos tipos de códigos 
              e suporte a logo. Rápido, gratuito e profissional.
            </p>
          </div>

          {/* Generator Card */}
          <QRGenerator />

          {/* Features */}
          <div className="max-w-4xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: '5 Tipos de QR',
                description: 'URL, WiFi, Texto, VCard e E-mail em um só lugar',
              },
              {
                title: 'Personalização',
                description: 'Cores customizadas, níveis de correção e logo central',
              },
              {
                title: 'Alta Qualidade',
                description: 'Download em PNG de alta resolução para impressão',
              },
            ].map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-card/50 border border-border/30 hover:border-primary/30 transition-colors duration-300"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Usage Guide Section */}
          <QRGuide />
        </main>

        {/* Footer */}
        <footer className="py-8 px-6 text-center">
          <p className="text-sm text-muted-foreground">
            Gerador de QR Code Profissional — Gratuito e ilimitado
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
