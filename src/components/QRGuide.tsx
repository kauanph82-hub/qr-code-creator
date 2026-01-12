import { 
  Link2, Wifi, FileText, User, Mail, 
  CheckCircle, Zap, Shield, Smartphone 
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const QRGuide = () => {
  const guides = [
    {
      id: 'url',
      icon: Link2,
      title: 'QR Code para URL',
      subtitle: 'O mais popular e versátil',
      content: `
        O QR Code para URL é a forma mais comum de uso dessa tecnologia. Quando escaneado, ele redireciona automaticamente o usuário para um site, página de destino, perfil de rede social ou qualquer endereço na web.

        **Casos de uso populares:**
        - Links para sites e landing pages
        - Perfis de redes sociais (Instagram, LinkedIn, TikTok)
        - Cardápios digitais de restaurantes
        - Links para download de aplicativos
        - Páginas de produtos em e-commerce

        **Dicas para melhor resultado:**
        - Use encurtadores de URL para códigos mais simples
        - Prefira links HTTPS para maior segurança
        - Teste o QR Code antes de imprimir em larga escala
      `,
      benefits: ['Acesso instantâneo', 'Sem digitação', 'Rastreável com UTM']
    },
    {
      id: 'wifi',
      icon: Wifi,
      title: 'QR Code para WiFi',
      subtitle: 'Conexão automática à rede',
      content: `
        O QR Code para WiFi permite que visitantes conectem-se automaticamente à sua rede sem precisar digitar a senha. Ideal para estabelecimentos comerciais, escritórios e eventos.

        **Onde usar:**
        - Hotéis e pousadas
        - Cafeterias e restaurantes
        - Escritórios e coworkings
        - Eventos e conferências
        - Airbnb e hospedagens

        **Segurança:**
        - Crie uma rede de convidados separada
        - Altere a senha periodicamente
        - O código armazena a senha de forma criptografada
        
        **Tipos de criptografia suportados:**
        - WPA/WPA2 (recomendado)
        - WEP (menos seguro)
        - Sem senha (redes abertas)
      `,
      benefits: ['Sem digitação de senha', 'Conexão em 1 segundo', 'Funciona offline']
    },
    {
      id: 'text',
      icon: FileText,
      title: 'QR Code para Texto',
      subtitle: 'Mensagens e informações livres',
      content: `
        O QR Code de texto puro permite codificar qualquer informação textual que será exibida ao usuário quando escaneada. Diferente do URL, não redireciona para nenhum lugar.

        **Aplicações criativas:**
        - Mensagens secretas e surpresas
        - Instruções de uso de produtos
        - Ingredientes e informações nutricionais
        - Poesias e citações
        - Códigos promocionais e cupons
        - Respostas de jogos e caça ao tesouro

        **Limitações:**
        - Textos muito longos geram QR Codes complexos
        - Recomendado até 300 caracteres para boa leitura
        - Não suporta formatação (negrito, itálico)
      `,
      benefits: ['Funciona 100% offline', 'Não expira nunca', 'Privacidade total']
    },
    {
      id: 'vcard',
      icon: User,
      title: 'QR Code VCard (Contato)',
      subtitle: 'Cartão de visita digital',
      content: `
        O VCard é um formato padrão para troca de informações de contato. Quando escaneado, permite salvar automaticamente um contato completo no celular do usuário.

        **O que pode incluir:**
        - Nome completo
        - Telefone(s)
        - E-mail(s)
        - Empresa e cargo
        - Endereço
        - Website
        - Redes sociais

        **Por que usar:**
        - Substitui cartões de visita impressos
        - Informações sempre atualizadas
        - Sustentável e moderno
        - Networking mais eficiente

        **Onde colocar:**
        - Assinatura de e-mail
        - Crachás e credenciais
        - Stands em feiras
        - Material promocional
      `,
      benefits: ['Salva contato automaticamente', 'Ecológico', 'Profissional']
    },
    {
      id: 'email',
      icon: Mail,
      title: 'QR Code para E-mail',
      subtitle: 'Inicie conversas instantaneamente',
      content: `
        O QR Code de e-mail abre automaticamente o aplicativo de correio do usuário com destinatário, assunto e corpo da mensagem pré-preenchidos.

        **Ideal para:**
        - Suporte ao cliente
        - Formulários de feedback
        - Solicitação de orçamentos
        - Inscrições em newsletters
        - Contato comercial

        **Configurações disponíveis:**
        - Destinatário (obrigatório)
        - Assunto (opcional mas recomendado)
        - Corpo da mensagem (opcional)
        - CC e BCC (em alguns leitores)

        **Dicas:**
        - Mantenha o assunto curto e claro
        - Use templates de mensagem para facilitar
        - Inclua instruções no corpo do e-mail
      `,
      benefits: ['Reduz erros de digitação', 'Aumenta taxa de contato', 'Mensagem padronizada']
    }
  ];

  const generalTips = [
    {
      icon: Zap,
      title: 'Tamanho Ideal',
      description: 'Para impressão, o QR Code deve ter no mínimo 2x2 cm. Para outdoors, calcule 10% da distância de leitura.'
    },
    {
      icon: Shield,
      title: 'Nível de Correção',
      description: 'Use nível H (30%) se for adicionar logo ou imprimir em superfícies irregulares. Nível L é suficiente para telas.'
    },
    {
      icon: Smartphone,
      title: 'Teste Sempre',
      description: 'Teste seu QR Code em pelo menos 3 dispositivos diferentes antes de usar em produção.'
    },
    {
      icon: CheckCircle,
      title: 'Contraste',
      description: 'Mantenha alto contraste entre a cor do código e o fundo. Preto no branco é a combinação mais segura.'
    }
  ];

  return (
    <section className="w-full max-w-4xl mx-auto mt-16 space-y-12">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Guia Completo de <span className="gradient-text">QR Codes</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Aprenda como usar cada tipo de QR Code para maximizar seus resultados em marketing, 
          atendimento e comunicação.
        </p>
      </div>

      {/* Quick Tips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {generalTips.map((tip, index) => (
          <div 
            key={index}
            className="p-5 rounded-xl bg-card/50 border border-border/30 hover:border-primary/30 transition-colors"
          >
            <div className="p-2 w-fit rounded-lg bg-primary/10 mb-3">
              <tip.icon className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">{tip.title}</h4>
            <p className="text-sm text-muted-foreground">{tip.description}</p>
          </div>
        ))}
      </div>

      {/* Detailed Guides */}
      <div className="glass-card p-6 md:p-8">
        <h3 className="text-xl font-semibold text-foreground mb-6">Guia por Tipo de QR Code</h3>
        
        <Accordion type="single" collapsible className="space-y-3">
          {guides.map((guide) => (
            <AccordionItem 
              key={guide.id} 
              value={guide.id}
              className="border border-border/30 rounded-lg px-4 data-[state=open]:bg-secondary/20"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <guide.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{guide.title}</h4>
                    <p className="text-sm text-muted-foreground">{guide.subtitle}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="pl-14 space-y-4">
                  <div className="prose prose-sm prose-invert max-w-none">
                    {guide.content.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-muted-foreground whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {guide.benefits.map((benefit, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* SEO Content */}
      <div className="space-y-8 text-muted-foreground">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-foreground">O que é um QR Code?</h3>
          <p>
            QR Code (Quick Response Code) é um código de barras bidimensional que pode armazenar 
            informações como URLs, textos, contatos e muito mais. Criado em 1994 pela empresa 
            japonesa Denso Wave, o QR Code se tornou uma ferramenta essencial para marketing 
            digital, pagamentos e comunicação.
          </p>
          <p>
            Diferente do código de barras tradicional que armazena apenas números, o QR Code 
            pode conter até 4.296 caracteres alfanuméricos, tornando-o extremamente versátil 
            para diversas aplicações comerciais e pessoais.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-foreground">Vantagens de usar QR Codes</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Acesso instantâneo a informações sem digitação</li>
            <li>Redução de erros humanos ao compartilhar dados</li>
            <li>Experiência interativa para clientes</li>
            <li>Rastreamento e analytics de campanhas</li>
            <li>Custo zero para criar e implementar</li>
            <li>Funciona em qualquer smartphone moderno</li>
            <li>Pode ser impresso ou exibido digitalmente</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-foreground">Como escolher o nível de correção de erro</h3>
          <p>
            O nível de correção de erro determina quanto do QR Code pode estar danificado ou 
            obstruído e ainda assim ser lido corretamente:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Nível L (7%)</strong> - Ideal para telas e ambientes digitais</li>
            <li><strong>Nível M (15%)</strong> - Bom equilíbrio para uso geral</li>
            <li><strong>Nível Q (25%)</strong> - Recomendado para impressão em materiais</li>
            <li><strong>Nível H (30%)</strong> - Essencial quando há logo no centro ou superfícies irregulares</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-foreground">Melhores práticas para QR Codes</h3>
          <p>
            Para garantir que seu QR Code funcione perfeitamente em todas as situações, siga 
            estas recomendações:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>Sempre teste o código antes de imprimir ou publicar</li>
            <li>Mantenha uma margem branca (quiet zone) ao redor do código</li>
            <li>Use cores com alto contraste (mínimo 40% de diferença)</li>
            <li>Evite distorcer ou esticar o QR Code</li>
            <li>Para logos, use nível de correção H</li>
            <li>Adicione uma chamada para ação próxima ao código</li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default QRGuide;
