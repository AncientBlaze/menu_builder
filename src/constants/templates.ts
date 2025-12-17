import { ThemeVariant } from "@/types/menu";

export const TEMPLATES: Record<
  ThemeVariant,
  {
    label: string;
    tooltip: string;
  }
> = {
  light: {
    label: "Light",
    tooltip: "Clean and minimal for modern cafés",
  },
  dark: {
    label: "Dark",
    tooltip: "High-contrast menu for night venues",
  },
  elegant: {
    label: "Elegant",
    tooltip: "Fine-dining, refined typography",
  },
  vintage: {
    label: "Vintage",
    tooltip: "Old-school charm with warm tones",
  },
  bold: {
    label: "Bold",
    tooltip: "Strong contrast for fast-paced menus",
  },
};
