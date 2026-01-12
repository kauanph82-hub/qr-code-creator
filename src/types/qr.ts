// ===========================================
// QR Generator Pro - Type Definitions
// ===========================================

export type QRType = 
  | 'url' 
  | 'text' 
  | 'wifi' 
  | 'vcard' 
  | 'email' 
  | 'whatsapp' 
  | 'sms' 
  | 'pdf' 
  | 'social';

export type DotStyle = 
  | 'square' 
  | 'rounded' 
  | 'dots' 
  | 'classy' 
  | 'classy-rounded'
  | 'extra-rounded';

export type CornerStyle = 
  | 'square' 
  | 'rounded' 
  | 'extra-rounded';

export type FrameStyle = 
  | 'none' 
  | 'bottom-text' 
  | 'top-text' 
  | 'full-border'
  | 'banner';

export type ErrorLevel = 'L' | 'M' | 'Q' | 'H';

export interface QRCustomization {
  fgColor: string;
  bgColor: string;
  dotStyle: DotStyle;
  cornerStyle: CornerStyle;
  errorLevel: ErrorLevel;
  logoUrl: string;
  logoSize: number;
  frameStyle: FrameStyle;
  frameText: string;
  frameColor: string;
  frameTextColor: string;
}

export interface WifiData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface VCardData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  title: string;
  website: string;
  address: string;
}

export interface EmailData {
  to: string;
  subject: string;
  body: string;
}

export interface WhatsAppData {
  phone: string;
  message: string;
}

export interface SMSData {
  phone: string;
  message: string;
}

export interface SocialData {
  platform: 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'tiktok' | 'youtube';
  username: string;
}

export interface PDFData {
  url: string;
  name: string;
}

// QR Code record from database
export interface QRCodeRecord {
  id: string;
  shortId: string;
  userId?: string;
  type: QRType;
  content: string;
  destinationUrl?: string;
  customization: QRCustomization;
  name?: string;
  isActive: boolean;
  isDynamic: boolean;
  totalScans: number;
  uniqueScans: number;
  lastScanAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Scan analytics
export interface ScanRecord {
  id: string;
  qrCodeId: string;
  ipHash?: string;
  country?: string;
  city?: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  os?: string;
  browser?: string;
  scannedAt: Date;
}

export interface DailyScan {
  date: string;
  totalScans: number;
  uniqueScans: number;
}

export interface DeviceBreakdown {
  deviceType: string;
  count: number;
  percentage: number;
}

export interface CountryBreakdown {
  country: string;
  count: number;
  percentage: number;
}

export interface QRAnalytics {
  totalScans: number;
  uniqueScans: number;
  dailyScans: DailyScan[];
  deviceBreakdown: DeviceBreakdown[];
  countryBreakdown: CountryBreakdown[];
  lastScanAt?: Date;
}

// User
export interface User {
  id: string;
  googleId?: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: Date;
}
