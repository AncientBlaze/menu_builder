export type CurrencyCode = "INR" | "USD" | "EUR";

export type ThemeVariant =
  | "light"
  | "dark"
  | "elegant"
  | "vintage"
  | "bold";

export type FontFamily = "serif" | "sans" | "mono";

export type LayoutType = "single-column" | "two-column";

export interface MenuMeta {
  restaurantName: string;
  tagline?: string;
  address?: string;
  currency: CurrencyCode;
  logoUrl?: string;
}

export interface ThemeConfig {
  theme: ThemeVariant;
  fontFamily: FontFamily;
  layout: LayoutType;
  compactItems: boolean;
  accentColor: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  isVeg: boolean;
}

export interface MenuSection {
  id: string;
  title: string;
  items: MenuItem[];
}

export interface MenuDocument {
  meta: MenuMeta;
  theme: ThemeConfig;
  sections: MenuSection[];
}
