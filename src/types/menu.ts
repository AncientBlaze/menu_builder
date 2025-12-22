/* =====================
   Meta
===================== */

export type CurrencyCode = "₨" | "$" | "€";

export interface MenuMeta {
  restaurantName: string;
  tagline?: string;
  address?: string;
  currency: CurrencyCode;

  /** Which template this menu is based on */
  templateName?: string;
}

/* =====================
   Visuals
===================== */

export type LogoPosition =
  | "top"
  | "bottom"
  | "overlay";

export type LogoAlign =
  | "left"
  | "center"
  | "right";

export type BackgroundType =
  | "none"
  | "image"
  | "animated";

/* ---------------------
   Visual Config
--------------------- */
export interface MenuVisuals {
  logo?: {
    url: string;
    position: "top" | "bottom" | "overlay";
    align: "left" | "center" | "right";
    size: number;

    // NEW (only used if overlay)
    offset?: {
      x: number; // px
      y: number; // px
    };
  };

  background?: {
    type: "none" | "image" | "animated";
    url?: string;
    overlay?: {
      color: string;
      opacity: number;
    };
    exportMode?: {
      freezeAnimation: boolean;
    };
  };
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
  // Serif
  | "Playfair Display"
  | "Merriweather"
  | "Lora"
  | "Libre Baskerville"
  | "Source Serif 4"
  | "Crimson Pro"

  // Sans
  | "Inter"
  | "Poppins"
  | "Roboto"
  | "Montserrat"
  | "Open Sans"
  | "Nunito"
  | "Raleway"

  // Display
  | "Oswald"
  | "DM Sans"
  | "Archivo";

export type LayoutType = "single-column" | "two-column";
export type Density = "compact" | "comfortable";
export type DividerStyle = "none" | "line" | "accent";
export type PriceAlignment = "right" | "inline";

export interface ThemeConfig {
  /* Visual identity */
  theme: ThemeVariant;
  fontFamily: FontFamily;
  accentColor: string;

  /* Layout & behavior */
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

/* =====================
   Root Document
===================== */

export interface MenuDocument {
  meta: MenuMeta;
  theme: ThemeConfig;
  visuals?: MenuVisuals;
  sections: MenuSection[];
}
