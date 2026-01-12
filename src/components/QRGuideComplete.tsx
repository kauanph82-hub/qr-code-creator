import { 
  QrCode, Scan, Store, Utensils, Ticket, 
  Building2, GraduationCap, Heart, ShoppingBag,
  CheckCircle2, Zap, Shield, Globe, BarChart3, Palette
} from 'lucide-react';

const QRGuideComplete = () => {
  return (
    <div className="max-w-6xl mx-auto mt-20 space-y-16">
      {/* Section 1: How to Create */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Como Criar seu QR Code em 3 Passos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Criar um QR Code profissional nunca foi tão fácil. Siga estes passos simples 
            e tenha seu código pronto em segundos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[
            {
              step: '1',
              title: 'Escolha o Tipo',
              description: 'Selecione entre URL, WiFi, VCard, Email, WhatsApp, SMS, PDF ou Redes Sociais conforme sua necessidade.',
              icon: QrCode,
            },
            {
              step: '2',
              title: 'Preencha os Dados',
              description: 'Insira as informações que deseja codificar. Personalize cores, formato e adicione sua logo.',
              icon: Palette,
            },
            {
              step: '3',
              title: 'Baixe e Use',
              description: 'Clique em "Gerar QR Code" e faça o download em alta qualidade para impressão ou uso digital.',
              icon: Scan,
            },
          ].map((item, index) => (
            <div 
              key={index}
              className="relative p-6 rounded-xl bg-card/50 border border-border/30 hover:border-primary/30 transition-all duration-300"
            >
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                {item.step}
              </div>
              <div className="pt-4">
                <item.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: What is a QR Code */}
      <section className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
            O que é um QR Code?
          </h2>
          <div className="prose prose-lg text-muted-foreground max-w-none">
            <p className="text-lg leading-relaxed mb-4">
              QR Code (Quick Response Code) é um código de barras bidimensional que pode ser 
              escaneado usando a câmera de smartphones e outros dispositivos. Criado em 1994 
              pela empresa japonesa Denso Wave, o QR Code se tornou uma ferramenta essencial 
              para conectar o mundo físico ao digital.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Diferente dos códigos de barras tradicionais que armazenam dados apenas 
              horizontalmente, os QR Codes utilizam padrões verticais e horizontais, 
              permitindo armazenar muito mais informações - até 7.089 caracteres numéricos 
              ou 4.296 caracteres alfanuméricos.
            </p>
            <p className="text-lg leading-relaxed">
              Com a popularização dos smartphones, os QR Codes se tornaram onipresentes em 
              marketing, pagamentos, autenticação, menus de restaurantes, ingressos de eventos 
              e muito mais. Sua versatilidade e facilidade de uso os tornaram indispensáveis 
              no mundo moderno.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Advantages */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Vantagens de Usar QR Codes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra por que milhões de empresas e pessoas usam QR Codes todos os dias.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {[
            {
              icon: Zap,
              title: 'Acesso Instantâneo',
              description: 'Basta apontar a câmera e pronto. Sem digitar URLs longas ou fazer buscas.',
            },
            {
              icon: Shield,
              title: 'Alta Correção de Erro',
              description: 'QR Codes funcionam mesmo com até 30% de dano, garantindo confiabilidade.',
            },
            {
              icon: Globe,
              title: 'Universalmente Compatível',
              description: 'Funciona em qualquer smartphone moderno, sem necessidade de apps especiais.',
            },
            {
              icon: BarChart3,
              title: 'Métricas e Analytics',
              description: 'Acompanhe scans, localizações e dispositivos em tempo real.',
            },
            {
              icon: Palette,
              title: 'Totalmente Personalizável',
              description: 'Adicione cores da sua marca, logos e molduras para destacar seu QR.',
            },
            {
              icon: CheckCircle2,
              title: 'Custo-Benefício',
              description: 'Gratuito para criar e usar. Substitui materiais impressos com informações atualizáveis.',
            },
          ].map((item, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-card/50 border border-border/30 hover:border-primary/30 transition-all duration-300 group"
            >
              <item.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Use Cases */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Onde Usar QR Codes no Seu Negócio
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Inspire-se com casos de uso reais que estão transformando negócios em todo o mundo.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {[
            {
              icon: Store,
              title: 'Varejo',
              uses: ['Promoções exclusivas', 'Informações de produtos', 'Programa de fidelidade', 'Avaliações'],
            },
            {
              icon: Utensils,
              title: 'Restaurantes',
              uses: ['Cardápio digital', 'Pedidos na mesa', 'Pagamento sem contato', 'Reservas'],
            },
            {
              icon: Ticket,
              title: 'Eventos',
              uses: ['Ingressos digitais', 'Check-in rápido', 'Informações do evento', 'Networking'],
            },
            {
              icon: Building2,
              title: 'Escritórios',
              uses: ['WiFi para visitantes', 'Controle de acesso', 'Cartões de visita', 'Documentos'],
            },
            {
              icon: GraduationCap,
              title: 'Educação',
              uses: ['Material didático', 'Presenças', 'Links para aulas', 'Certificados'],
            },
            {
              icon: Heart,
              title: 'Saúde',
              uses: ['Prontuários digitais', 'Agendamentos', 'Instruções de uso', 'Receitas'],
            },
            {
              icon: ShoppingBag,
              title: 'E-commerce',
              uses: ['Rastreamento de pedidos', 'Devoluções fáceis', 'Reviews', 'Cupons'],
            },
            {
              icon: QrCode,
              title: 'Marketing',
              uses: ['Campanhas offline-online', 'Landing pages', 'Redes sociais', 'Promoções'],
            },
          ].map((item, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-card/50 border border-border/30 hover:border-primary/30 transition-all duration-300"
            >
              <item.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-3">{item.title}</h3>
              <ul className="space-y-2">
                {item.uses.map((use, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary/60 flex-shrink-0" />
                    {use}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Types Explained */}
      <section className="p-8 md:p-12 rounded-2xl bg-secondary/30 border border-border/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Tipos de QR Code Disponíveis
          </h2>
          
          <div className="space-y-6">
            {[
              {
                type: 'URL',
                description: 'Direciona para qualquer website, landing page ou loja online. Ideal para campanhas de marketing e materiais impressos.',
              },
              {
                type: 'WiFi',
                description: 'Permite que visitantes se conectem à sua rede WiFi instantaneamente, sem digitar senhas. Perfeito para escritórios, cafés e eventos.',
              },
              {
                type: 'VCard',
                description: 'Compartilhe seu cartão de visita digital com nome, telefone, email, empresa e mais. O contato é salvo diretamente no celular.',
              },
              {
                type: 'E-mail',
                description: 'Abre o app de email com destinatário, assunto e corpo já preenchidos. Facilita contato com suporte ou vendas.',
              },
              {
                type: 'WhatsApp',
                description: 'Inicia uma conversa no WhatsApp com seu número e uma mensagem pré-definida. Ideal para atendimento ao cliente.',
              },
              {
                type: 'SMS',
                description: 'Abre o app de mensagens com número e texto prontos. Útil para confirmações e opt-ins.',
              },
              {
                type: 'PDF',
                description: 'Link direto para documentos PDF como catálogos, menus, manuais e apresentações.',
              },
              {
                type: 'Redes Sociais',
                description: 'Direciona para seus perfis no Instagram, Facebook, LinkedIn, TikTok e YouTube. Aumente seus seguidores facilmente.',
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-4 p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="w-24 flex-shrink-0">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                    {item.type}
                  </span>
                </div>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Pronto para criar seu QR Code?
        </h2>
        <p className="text-muted-foreground mb-6">
          Role para cima e comece agora mesmo. É grátis e leva apenas alguns segundos!
        </p>
        <a 
          href="#top" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <QrCode className="w-5 h-5" />
          Criar QR Code Agora
        </a>
      </section>
    </div>
  );
};

export default QRGuideComplete;
