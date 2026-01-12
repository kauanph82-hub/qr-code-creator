import { Check, Crown, Zap, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Grátis',
    price: 'R$0',
    period: '/sempre',
    description: 'Perfeito para começar',
    icon: Zap,
    features: [
      'QR Codes ilimitados',
      'Personalização básica de cores',
      'Download em PNG',
      'Suporte a todos os tipos',
      'Com marca d\'água',
    ],
    notIncluded: [
      'Métricas de scans',
      'Logo personalizada',
      'Sem marca d\'água',
      'Suporte prioritário',
    ],
    cta: 'Começar Grátis',
    popular: false,
  },
  {
    name: 'Pro',
    price: 'R$29',
    period: '/mês',
    description: 'Para profissionais e pequenas empresas',
    icon: Crown,
    features: [
      'Tudo do plano Grátis',
      'Métricas de scans em tempo real',
      'Logo personalizada no QR',
      'Sem marca d\'água',
      'Molduras personalizadas',
      'QR Codes dinâmicos (editáveis)',
      'Exportar em SVG',
      'Suporte prioritário',
    ],
    notIncluded: [],
    cta: 'Começar Pro',
    popular: true,
  },
  {
    name: 'Empresas',
    price: 'Sob consulta',
    period: '',
    description: 'Para grandes equipes e empresas',
    icon: Building2,
    features: [
      'Tudo do plano Pro',
      'Usuários ilimitados',
      'API de integração',
      'White-label (sua marca)',
      'Domínio personalizado',
      'Analytics avançado',
      'SLA garantido',
      'Gerente de conta dedicado',
    ],
    notIncluded: [],
    cta: 'Falar com Vendas',
    popular: false,
  },
];

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Planos e Preços
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para suas necessidades. Upgrade ou downgrade a qualquer momento.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative p-6 md:p-8 rounded-2xl border transition-all duration-300",
                plan.popular 
                  ? "bg-primary/5 border-primary/30 shadow-lg shadow-primary/10 scale-105 z-10" 
                  : "bg-card/50 border-border/30 hover:border-primary/20"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <plan.icon className={cn(
                  "w-10 h-10 mb-4",
                  plan.popular ? "text-primary" : "text-muted-foreground"
                )} />
                <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                <p className="text-muted-foreground mt-1">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              <Button 
                className={cn(
                  "w-full mb-6",
                  plan.popular 
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
                    : "bg-secondary hover:bg-secondary/80 text-foreground"
                )}
              >
                {plan.cta}
              </Button>

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
                {plan.notIncluded.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 opacity-50">
                    <Check className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground line-through">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
