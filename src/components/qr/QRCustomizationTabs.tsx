import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Frame, Shapes, Image, Palette } from 'lucide-react';
import type { QRCustomization, DotStyle, CornerStyle, FrameStyle } from '@/types/qr';
import { cn } from '@/lib/utils';

interface QRCustomizationTabsProps {
  customization: QRCustomization;
  onChange: (customization: QRCustomization) => void;
}

const dotStyles: { value: DotStyle; label: string; preview: string }[] = [
  { value: 'square', label: 'Quadrado', preview: '■' },
  { value: 'rounded', label: 'Arredondado', preview: '▢' },
  { value: 'dots', label: 'Pontos', preview: '●' },
  { value: 'classy', label: 'Clássico', preview: '◆' },
  { value: 'classy-rounded', label: 'Clássico Arred.', preview: '◇' },
  { value: 'extra-rounded', label: 'Extra Arred.', preview: '○' },
];

const cornerStyles: { value: CornerStyle; label: string }[] = [
  { value: 'square', label: 'Quadrado' },
  { value: 'rounded', label: 'Arredondado' },
  { value: 'extra-rounded', label: 'Extra Arredondado' },
];

const frameStyles: { value: FrameStyle; label: string }[] = [
  { value: 'none', label: 'Sem moldura' },
  { value: 'bottom-text', label: 'Texto inferior' },
  { value: 'top-text', label: 'Texto superior' },
  { value: 'full-border', label: 'Borda completa' },
  { value: 'banner', label: 'Banner' },
];

export const QRCustomizationTabs = ({ customization, onChange }: QRCustomizationTabsProps) => {
  const [activeTab, setActiveTab] = useState('colors');

  const updateCustomization = (updates: Partial<QRCustomization>) => {
    onChange({ ...customization, ...updates });
  };

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-secondary/50 mb-6">
          <TabsTrigger value="colors" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Cores</span>
          </TabsTrigger>
          <TabsTrigger value="shape" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Shapes className="w-4 h-4" />
            <span className="hidden sm:inline">Forma</span>
          </TabsTrigger>
          <TabsTrigger value="logo" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Image className="w-4 h-4" />
            <span className="hidden sm:inline">Logo</span>
          </TabsTrigger>
          <TabsTrigger value="frame" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Frame className="w-4 h-4" />
            <span className="hidden sm:inline">Moldura</span>
          </TabsTrigger>
        </TabsList>

        {/* Colors Tab */}
        <TabsContent value="colors" className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <Label className="text-foreground font-medium">Cor do QR Code</Label>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="color"
                    value={customization.fgColor}
                    onChange={(e) => updateCustomization({ fgColor: e.target.value })}
                    className="w-14 h-14 rounded-xl cursor-pointer border-2 border-border/50 bg-transparent"
                  />
                </div>
                <Input
                  value={customization.fgColor}
                  onChange={(e) => updateCustomization({ fgColor: e.target.value })}
                  className="h-12 bg-secondary/50 border-border/50 text-foreground font-mono uppercase"
                  placeholder="#000000"
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-foreground font-medium">Cor de Fundo</Label>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="color"
                    value={customization.bgColor}
                    onChange={(e) => updateCustomization({ bgColor: e.target.value })}
                    className="w-14 h-14 rounded-xl cursor-pointer border-2 border-border/50 bg-transparent"
                  />
                </div>
                <Input
                  value={customization.bgColor}
                  onChange={(e) => updateCustomization({ bgColor: e.target.value })}
                  className="h-12 bg-secondary/50 border-border/50 text-foreground font-mono uppercase"
                  placeholder="#FFFFFF"
                />
              </div>
            </div>
          </div>

          {/* Preset Colors */}
          <div className="space-y-3">
            <Label className="text-foreground font-medium">Cores Rápidas</Label>
            <div className="flex flex-wrap gap-2">
              {[
                { fg: '#000000', bg: '#ffffff', name: 'Clássico' },
                { fg: '#1a1a1a', bg: '#f5f5f5', name: 'Suave' },
                { fg: '#f97316', bg: '#ffffff', name: 'Laranja' },
                { fg: '#3b82f6', bg: '#ffffff', name: 'Azul' },
                { fg: '#10b981', bg: '#ffffff', name: 'Verde' },
                { fg: '#8b5cf6', bg: '#ffffff', name: 'Roxo' },
                { fg: '#ef4444', bg: '#ffffff', name: 'Vermelho' },
                { fg: '#ffffff', bg: '#1a1a1a', name: 'Invertido' },
              ].map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => updateCustomization({ fgColor: preset.fg, bgColor: preset.bg })}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all",
                    customization.fgColor === preset.fg && customization.bgColor === preset.bg
                      ? "border-primary bg-primary/10"
                      : "border-border/50 hover:border-primary/50"
                  )}
                >
                  <div 
                    className="w-5 h-5 rounded border border-border/30"
                    style={{ backgroundColor: preset.bg }}
                  >
                    <div 
                      className="w-3 h-3 m-1 rounded-sm"
                      style={{ backgroundColor: preset.fg }}
                    />
                  </div>
                  <span className="text-sm text-foreground">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Shape Tab */}
        <TabsContent value="shape" className="space-y-6">
          <div className="space-y-4">
            <Label className="text-foreground font-medium">Estilo dos Pontos</Label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {dotStyles.map((style) => (
                <button
                  key={style.value}
                  onClick={() => updateCustomization({ dotStyle: style.value })}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-lg border transition-all",
                    customization.dotStyle === style.value
                      ? "border-primary bg-primary/10"
                      : "border-border/50 hover:border-primary/50"
                  )}
                >
                  <span className="text-2xl">{style.preview}</span>
                  <span className="text-xs text-muted-foreground">{style.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-foreground font-medium">Estilo dos Cantos</Label>
            <div className="grid grid-cols-3 gap-2">
              {cornerStyles.map((style) => (
                <button
                  key={style.value}
                  onClick={() => updateCustomization({ cornerStyle: style.value })}
                  className={cn(
                    "flex items-center justify-center gap-2 p-3 rounded-lg border transition-all",
                    customization.cornerStyle === style.value
                      ? "border-primary bg-primary/10"
                      : "border-border/50 hover:border-primary/50"
                  )}
                >
                  <span className="text-sm text-foreground">{style.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-foreground font-medium">Nível de Correção de Erro</Label>
            <Select 
              value={customization.errorLevel} 
              onValueChange={(v) => updateCustomization({ errorLevel: v as 'L' | 'M' | 'Q' | 'H' })}
            >
              <SelectTrigger className="h-12 bg-secondary/50 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="L">L - Baixo (7%) - Menor tamanho</SelectItem>
                <SelectItem value="M">M - Médio (15%)</SelectItem>
                <SelectItem value="Q">Q - Alto (25%)</SelectItem>
                <SelectItem value="H">H - Máximo (30%) - Ideal para logos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        {/* Logo Tab */}
        <TabsContent value="logo" className="space-y-6">
          <div className="space-y-3">
            <Label className="text-foreground font-medium">URL da Logo</Label>
            <Input
              value={customization.logoUrl}
              onChange={(e) => updateCustomization({ logoUrl: e.target.value })}
              placeholder="https://exemplo.com/logo.png"
              className="h-12 bg-secondary/50 border-border/50 text-foreground"
            />
            <p className="text-xs text-muted-foreground">
              Use uma imagem PNG ou SVG com fundo transparente para melhores resultados.
            </p>
          </div>

          {customization.logoUrl && (
            <div className="space-y-3">
              <Label className="text-foreground font-medium">
                Tamanho da Logo: {customization.logoSize}px
              </Label>
              <Slider
                value={[customization.logoSize]}
                onValueChange={([value]) => updateCustomization({ logoSize: value })}
                min={30}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Pequeno</span>
                <span>Grande</span>
              </div>
            </div>
          )}

          {customization.logoUrl && (
            <div className="p-4 bg-secondary/30 rounded-lg border border-border/30">
              <Label className="text-foreground font-medium mb-3 block">Preview da Logo</Label>
              <div className="flex items-center justify-center p-4 bg-white rounded-lg">
                <img 
                  src={customization.logoUrl} 
                  alt="Logo preview"
                  className="max-w-[100px] max-h-[100px] object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}
        </TabsContent>

        {/* Frame Tab */}
        <TabsContent value="frame" className="space-y-6">
          <div className="space-y-4">
            <Label className="text-foreground font-medium">Estilo da Moldura</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {frameStyles.map((style) => (
                <button
                  key={style.value}
                  onClick={() => updateCustomization({ frameStyle: style.value })}
                  className={cn(
                    "flex items-center justify-center p-3 rounded-lg border transition-all",
                    customization.frameStyle === style.value
                      ? "border-primary bg-primary/10"
                      : "border-border/50 hover:border-primary/50"
                  )}
                >
                  <span className="text-sm text-foreground">{style.label}</span>
                </button>
              ))}
            </div>
          </div>

          {customization.frameStyle !== 'none' && (
            <>
              <div className="space-y-3">
                <Label className="text-foreground font-medium">Texto da Moldura</Label>
                <Input
                  value={customization.frameText}
                  onChange={(e) => updateCustomization({ frameText: e.target.value })}
                  placeholder="SCAN ME"
                  maxLength={20}
                  className="h-12 bg-secondary/50 border-border/50 text-foreground"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-3">
                  <Label className="text-foreground font-medium">Cor da Moldura</Label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={customization.frameColor || '#000000'}
                      onChange={(e) => updateCustomization({ frameColor: e.target.value })}
                      className="w-12 h-12 rounded-lg cursor-pointer border-2 border-border/50"
                    />
                    <Input
                      value={customization.frameColor || '#000000'}
                      onChange={(e) => updateCustomization({ frameColor: e.target.value })}
                      className="h-12 bg-secondary/50 border-border/50 text-foreground font-mono uppercase"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="text-foreground font-medium">Cor do Texto</Label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={customization.frameTextColor || '#ffffff'}
                      onChange={(e) => updateCustomization({ frameTextColor: e.target.value })}
                      className="w-12 h-12 rounded-lg cursor-pointer border-2 border-border/50"
                    />
                    <Input
                      value={customization.frameTextColor || '#ffffff'}
                      onChange={(e) => updateCustomization({ frameTextColor: e.target.value })}
                      className="h-12 bg-secondary/50 border-border/50 text-foreground font-mono uppercase"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
