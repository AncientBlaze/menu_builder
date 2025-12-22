/* =====================
   Meta
===================== */

export type CurrencyCode = "₨" | "$" | "€";

export interface MenuMeta {
  restaurantName: string;
  tagline?: string;
  address?: string;
  currency: CurrencyCode;
  logoUrl?: string;

  /** Which template this menu is based on */
  templateName?: string;
}

/* =====================
   Theme / Template
===================== */

export type ThemeVariant =
  | "light"
  | "dark"
  | "elegant"
  | "vintage"
  | "bold";

export type FontFamily =
  // Serif (classic / fine dining)
  | "Playfair Display"
  | "Merriweather"
  | "Lora"
  | "Libre Baskerville"
  | "Source Serif 4"
  | "Crimson Pro"

  // Sans (modern / cafés)
  | "Inter"
  | "Poppins"
  | "Roboto"
  | "Montserrat"
  | "Open Sans"
  | "Nunito"
  | "Raleway"

  // Display (bold / street / headings)
  | "Oswald"
  | "DM Sans"
  | "Archivo";



export type LayoutType =
  | "single-column"
  | "two-column";

export type Density =
  | "compact"
  | "comfortable";

export type DividerStyle =
  | "none"
  | "line"
  | "accent";

export type PriceAlignment =
  | "right"
  | "inline";

export interface ThemeConfig {
  /* Visual identity */
  theme: ThemeVariant;
  fontFamily: FontFamily;
  accentColor: string;

  /* Layout & behavior (Template Mode) */
  layout: LayoutType;
  density: Density;
  dividerStyle: DividerStyle;
  priceAlignment: PriceAlignment;
}

/* =====================
   Menu Content
===================== */

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
