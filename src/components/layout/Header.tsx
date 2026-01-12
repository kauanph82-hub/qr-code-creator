import { useState } from 'react';
import { QrCode, Menu, X, LogIn, BarChart3, Settings, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onLoginClick?: () => void;
}

export const Header = ({ onLoginClick }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Gerador', href: '#generator', icon: QrCode },
    { label: 'Métricas', href: '#metrics', icon: BarChart3, badge: 'Pro' },
    { label: 'Preços', href: '#pricing', icon: Crown },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
              <QrCode className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-lg text-foreground">
              QR<span className="text-primary">Pro</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase bg-primary/10 text-primary rounded">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onLoginClick}
              className="hidden sm:flex items-center gap-2 border-border/50"
            >
              <LogIn className="w-4 h-4" />
              Entrar
            </Button>
            <Button 
              size="sm"
              className="hidden sm:flex items-center gap-2 bg-primary hover:bg-primary/90"
            >
              <Crown className="w-4 h-4" />
              Upgrade Pro
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          mobileMenuOpen ? "max-h-80 pb-4" : "max-h-0"
        )}>
          <nav className="flex flex-col gap-1 pt-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              >
                <item.icon className="w-5 h-5" />
                {item.label}
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase bg-primary/10 text-primary rounded">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
            <hr className="my-2 border-border/30" />
            <Button 
              variant="outline" 
              onClick={onLoginClick}
              className="mx-4 justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Entrar com Google
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
