import { QrCode, Github, Twitter, Mail, Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { label: 'Gerador de QR Code', href: '#generator' },
      { label: 'QR Code WiFi', href: '#wifi' },
      { label: 'QR Code VCard', href: '#vcard' },
      { label: 'Métricas Pro', href: '#metrics' },
    ],
    resources: [
      { label: 'Como usar QR Codes', href: '#guide' },
      { label: 'API (Em breve)', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Suporte', href: '#' },
    ],
    legal: [
      { label: 'Termos de Uso', href: '/terms' },
      { label: 'Privacidade', href: '/privacy' },
      { label: 'Cookies', href: '/cookies' },
    ],
  };

  return (
    <footer className="border-t border-border/40 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                <QrCode className="w-5 h-5 text-primary" />
              </div>
              <span className="font-bold text-lg text-foreground">
                QR<span className="text-primary">Pro</span>
              </span>
            </a>
            <p className="text-sm text-muted-foreground mb-4">
              Gerador de QR Codes profissional, gratuito e ilimitado. 
              Crie códigos personalizados com métricas avançadas.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="#" 
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contato@qrpro.com" 
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Produto</h4>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Recursos</h4>
            <ul className="space-y-2">
              {links.resources.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} QRPro. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Feito com <Heart className="w-4 h-4 text-red-500 fill-red-500" /> no Brasil
          </p>
        </div>
      </div>
    </footer>
  );
};
