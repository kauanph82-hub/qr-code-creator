import { useState } from 'react';
import QRGeneratorPro from '@/components/QRGeneratorPro';
import QRGuideComplete from '@/components/QRGuideComplete';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PricingSection } from '@/components/PricingSection';
import { Sparkles } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden" id="top">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
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
        <Header />

        {/* Hero Section */}
        <main className="px-4 sm:px-6 py-12 md:py-20" id="generator">
          <div className="max-w-6xl mx-auto text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Gerador #1 de QR Codes do Brasil
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="text-foreground">Crie </span>
              <span className="gradient-text">QR Codes Profissionais</span>
              <br />
              <span className="text-foreground">com Métricas Avançadas</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Gerador completo com 9 tipos de QR Code, personalização avançada, 
              logo, molduras e analytics em tempo real. Gratuito e ilimitado.
            </p>
          </div>

          {/* Generator Card */}
          <QRGeneratorPro />

          {/* Features Grid */}
          <div className="max-w-6xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: '9 Tipos de QR',
                description: 'URL, WiFi, VCard, E-mail, WhatsApp, SMS, PDF e Redes Sociais',
              },
              {
                title: 'Personalização Total',
                description: 'Cores, formas, logos, molduras e textos customizados',
              },
              {
                title: 'Métricas Pro',
                description: 'Scans, dispositivos, países e gráficos em tempo real',
              },
              {
                title: 'Alta Qualidade',
                description: 'Download em PNG e SVG para impressão profissional',
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
          <div id="guide">
            <QRGuideComplete />
          </div>

          {/* Pricing Section */}
          <PricingSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Index;
